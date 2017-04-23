ng-grid is a datagrid similar to koGrid or slickGrid. It is a high-performant datagrid using virtualization for rendering rows and really shines when you have lots of rows. 
_Dependencies:_
* angular.js
* jQuery

## Basic Setup:
_index.html_
```html
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ng-grid.css" /> 
    <script type="text/javascript" src="../lib/angular.js"></script>
    <script type="text/javascript" src="../lib/jquery.min.js"></script>
    <script type="text/javascript" src="../ng-grid.js"></script>
    <script type="text/javascript" src="main.js"></script>
</head>
<body ng-app="MyGridApp" ng-controller="bodyController">
    <div ng-grid="gridOptions">
    </div>
</body>
</html>
```
_main.js:_
```javascript

var app = angular.module('MyGridApp', ['ngGrid']);

app.controller('bodyController', ['$scope', function($scope) {
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = { data : 'myData' };// $scope.myData is also acceptable but will not update properly. OK to use the object if you don't care about updating the data in the grid.
}]);
```

Check out the [Configuration Options page](Configuration-Options) for an explanation of options.