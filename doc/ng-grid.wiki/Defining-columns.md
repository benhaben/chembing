__Column Definition Options__
***
Customizable options with default values:
* ```width: 60```
* ```minWidth: 50```
* ```maxWidth: 9000```
* ```visible: true```
* ```field: "foo"``` Can also be a property path on your data model. "foo.bar.myField", "Name.First", etc..
* ```displayName: "Pretty Foo"```
* ```sortable: true```
* ```resizable: true```
* ```groupable: true``` allows the column to be grouped with drag and drop, but has no effect on gridOptions.groups
* ```pinnable: true``` allows the column to be pinned when enablePinning is set to true
* ```editableCellTemplate: true``` the template to use while editing
* ```enableCellEdit: true``` allows the cell to use an edit template when focused (grid option enableCellSelection must be enabled)
* ```sortFn: function(a,b){return a > b}``` (see [Sorting and Filtering](https://github.com/timothyswt/ng-grid/wiki/Sorting-and-Filtering))
* ```cellTemplate: ""```(see [Templating](https://github.com/timothyswt/ng-grid/wiki/Templating))
* ```cellClass: "userDefinedCSSClass"```
* ```headerClass: "userDefinedCSSClass"```
* ```headerCellTemplate: ""``` (see [Templating](https://github.com/timothyswt/ng-grid/wiki/Templating))
* ```cellFilter``` string name for filter to use on the cell ('currency', 'date', etc..)
* ```aggLabelFilter``` string name for filter to use on the aggregate label ('currency', 'date', etc..) defaults to cellFilter if not set.

An example of defining the columns of a grid looks like:

```javascript
$scope.gridOptions = { data: myDataSource, 
                       columnDefs: [{ field: 'firstName', displayName: 'First Name', width: 90 },
                                    { field: 'lastName', displayName: 'Last Name', width: 80 },
                                    { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader' }]
```
Width can also be defined in percentages (20%, 30%), in weighted *s, or "auto" (which sizes the column based on data length) (much like WPF/Silverlight)/ note: "auto" only works in single page apps currently because the re-size happens on "document.ready". Still working on improving that.
example:
```javascript
$scope.gridOptions = { data: myDataSource, 
                       columnDefs: [{ field: 'firstName', displayName: 'First Name', width: "*", resizable: false},
                                    { field: 'lastName', displayName: 'First Name', width: "20%" },
                                    { field: 'address', displayName: 'Last Name', width: "auto" },
                                    { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader', width: "**"}]
```
If the div bound to the ng-grid is 400px wide then having 4 total *s would make each star worth 100px each. Column 1 would be 100px wide, Column 2: 100px, and Column 3: 200px. This is always rounded down. In the event that you have a grid 1000px wide with two columns and 3 total stars you would have 1 pixel remaining and each * worth 333 pixels

The widths are calculated in the following order:
* Pre-defined width (`width: 50`)
* Asterisks (`width: "**"`) Rounded down
* Percentages (`width: "33%"`) Rounded down
* Auto-width based on represented data length

Special note on percentages:

You can go over 100% of grid width, this is intended. If you have a grid 1000px wide with 4 columns, You can specify each column to be 50% width. This will result in each column being 500px wide and the Viewport overflowing as intended.
***
you can also pass the string name of the scope object that contains the column definitions like this:
```javascript
    $scope.myDefs = [{ field: 'firstName', displayName: 'First Name', width: "*", resizable: false},
                     { field: 'lastName', displayName: 'Last Name', width: "20%" },
                     { field: 'address', displayName: 'Address', width: "auto" },
                     { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader', width: "**"}];
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: 'myDefs'
    };
```
That allows you to push/pop/splice/reassign column definitions and the changes will be reflected in the grid.