__Creating Plugins__
***

Example of a plugin as a function:
```javascript
myFuncPlugin = function(){
    var self = this;
    self.someVar1 = "Hello";
    self.someVar2 = "World";
    //@new child scope of the Grid scope for you to create watches or whatever you want.
    //@gridInstance = instance of the grid object where the plugin is initialized.
    self.init = function(childScope, gridInstance){
        //initialize plugin vars and functions here.
    };
};
var pluginInstance = new myFuncPlugin();
```
Or you can use a json notation:
```javascript
myJsonPlugin = {
    someVar1: "Foo",
    someVar2: "Bar",
    //@new child scope of the Grid scope for you to create watches or whatever you want.
    //@gridInstance = instance of the grid object where the plugin is initialized.
    init: function(childScope, gridInstance){
        //initialize plugin vars and functions here.
    }
};
```
An example of a column reordering plugin can be found [here](https://github.com/timothyswt/ng-grid/blob/master/plugins/ng-grid-reorderable.js)

__Registering plugins__
***
To register a plugin you need to pass it to the ng-grid directive as part of the options object:
```javascript
function userController($scope) {
    var self = this;
    self.pluginOne = new myFuncPlugin();
    self.pluginTwo = myJsonPlugin;
    self.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = { data : self.myData,
                           plugins: [ self.pluginOne, self.pluginTwo ]};
}
```