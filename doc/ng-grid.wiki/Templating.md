__Row Templates__
***
Default Row Template:
```html
// passed in as a string
    <div ng-style="{ 'cursor': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>
```
Example:
```javascript
    $scope.gridOptions = {
        data: self.myData,
        rowTemplate: '<div ng-style="{\\'cursor\\': row.cursor, \\'z-index\\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>'
 };
```
That way you can add some styling!

Default header template:
```html
<div ng-style="{ height: col.headerRowHeight }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngHeaderCell" ng-header-cell></div>
```

__Cell Templates__
***
Default Cell Template:
```html
<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>
```
Example:
```javascript
    $scope.gridOptions = {
        data: self.myData,
        columnDefs: [{ field: 'firstName', displayName: 'First Name', width: 90, cellTemplate: '<div>{{row.entity[col.field]}}</div>' },
                     { field: 'lastName', displayName: 'Last Name', width: 80 },
                     { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader' } ]
 };
```

__Editable Cell Templates__
***
It is possible to make the cells editable, and you can even define your own template for the editor.

Default Editable Cell Template:
```html
<input ng-class="'colt' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" />
```
Example ('number' style input for the age column):
```javascript
    $scope.gridOptions = {
        data: self.myData,
        enableCellEditOnFocus: true, //enables the editor on a single click, if you use enableCellEdit: true you would have to doubleclick
        columnDefs: [{ field: 'firstName', displayName: 'First Name', width: 90 },
                     { field: 'lastName', displayName: 'Last Name', width: 80 },
                     { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader', 
                       editableCellTemplate: '<input type="number" ng-class="'colt' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" />' } ]
 };
```

When editing a cell, the ng-cell-has-focus directive will broadcast a message named **ngGridEventStartCellEdit** to let all children know that you can now give yourself focus. When the editable cell template is done with editing (usually on a blur event) you need to emit **ngGridEventEndCellEdit** to let ng-cell-has-focus know that you are done editing and it will then show the non-editable cell template. The reasoning for this is (good quote): "Now I can wrap my input elements in divs/spans, whatever and control exactly what element's blur triggers the end edit" - @swalters. 

If you search for the 'ngInput' directive in ng-rgid's source code, you will find that that is exactly what this directive implements for input elements. So if you need to create your own 'cell editor', you could create your own directive that would listen to and emit the right events, to make your component work as expected.

An example (used for ng-input directive):

```
scope.$on( 'ngGridEventStartCellEdit', function () { elm.focus(); } ); //focus the input element on 'start cell edit'
angular.element( elm ).bind( 'blur', function () { scope.$emit( 'ngGridEventEndCellEdit' ); } ); //when leaving the input element, emit the 'end cell edit' event
```

__Header Cell Templates__
***
Default Header Cell Template:
```html
<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{'cursor': col.cursor}" ng-class="{ 'ngSorted': !noSortVisible }">
    <div ng-click="col.sort($event)" ng-class="'colt' + col.index" class="ngHeaderText">{{col.displayName}}</div>
    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>
    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>
    <div class="ngSortPriority">{{col.sortPriority}}</div>
    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div>
</div>
<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>
```
Example:
```javascript
var myHeaderCellTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">'+
                               '<div ng-click="col.sort($event)" ng-class="'colt' + col.index" class="ngHeaderText">{{col.displayName}}</div>'+
                               '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'+
                               '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'+
                               '<div class="ngSortPriority">{{col.sortPriority}}</div>'+
                             '</div>'+
                             '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
$scope.gridOptions = {
        data: self.myData,
        columnDefs: [{ field: 'firstName', displayName: 'First Name', width: 90, headerCellTemplate: myHeaderCellTemplate },
                     { field: 'lastName', displayName: 'Last Name', width: 80 },
                     { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader' ]
 };
```