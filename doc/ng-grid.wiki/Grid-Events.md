ng-grid emits events up the scope to anyone who decides to listen to them:


When Columns are re-ordered you get an array of all the columns in their current state.
```javascript
$scope.$emit('ngGridEventColumns', newColumns);
```

When the grid data source is changed this event is fired letting you know that data was successfully modified.
```javascript
$scope.$emit('ngGridEventData', gridId);
```

When the filter is changed this event is fired.
```javascript
$scope.$emit('ngGridEventFilter', newFilterText);
```

When anyone groups the data 
```javascript
$scope.$emit('ngGridEventGroups', newGroups);
```

When new rows are rendered in the grid: (scrolling fires this a lot)
```javascript
$scope.$emit('ngGridEventRows', newRows);
```

When the user has scrolled to the bottom of the grid this event fires. useful for infinite/server-side scrolling.
```javascript
$scope.$emit('ngGridEventScroll');
```

When sorting happens (see src/classes/column.js) this way you can detect whether or not the column is visible/ what direction it is sorted etc..
```javascript
$scope.$emit('ngGridEventSorted', SortedColumn);
```

## Edit Events
### ngGridEventStartCellEdit
When an editable cell gets focus, this event is broadcast by the ngCellHasFocus directive. Any custom edit templates should either:
* implement ng-input directive which listens for this event 
* listen for this event from a custom directive and put the embedded editor into edit mode.

```javascript
     scope.$on('ngGridEventStartCellEdit', function () {
                elm.focus();
                elm.select();
            });
```

### ngGridEventEndCellEdit
When an editable cell has completed editing, this event should be emitted by the editor directive (ng-input by default).  ngCellHasFocus subscribes to this event and takes steps to stop editing the cell.

Your controller or directive could also listen for this event to take any needed actions when a cell has finished editing.

From an editor directive
```javascript
    angular.element(elm).bind('blur', function () {
                scope.$emit('ngGridEventEndCellEdit');
            });
```