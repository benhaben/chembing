__Builtin sorting__
***
We tried to make ng-grid do as good a job as sorting your data as possible by inspecting the data and attempting to "guess" what kind of data you have. All you have to do is click the header to sort! or shift+ click a header to do multi-column sorting! If you want to disable the feature you have two options:

1. Turn off sorting on the entire grid:
```javascript
    $scope.gridOptions = { data : myData,
                           enableSorting: false};
```
2. Turn off sorting on a column by column basis (see [Defining Columns](https://github.com/timothyswt/ng-grid/wiki/Defining-Columns))

If you have a custom sorting algorithm you can specify that in a column definition:
```javascript
    var srirachaSauce = 1;
    var myAwesomeSortFn(a,b){
        if (a == b) return 0;
        if (a < b) return -1;
        return srirachaSauce;
    };
    $scope.gridOptions = { data : myData,
                           columnDefs: [{ field: 'firstName', displayName: 'First Name', width: "*"},
                                        { field: 'lastName', displayName: 'Last Name', width: "*": sortFn: myAwesomeSortFn },
                                        { field: 'age', cellClass: 'ageCell', headerClass: 'ageHeader', width "**"}]
    };
```