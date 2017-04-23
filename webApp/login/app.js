angular.module('frontAngularViewApp', ['ngRoute', 'ngGrid'])
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'login/partials/index.html'
    }).
    when('/login', {
        templateUrl: 'login/partials/login.html',
        controller: 'loginController'
    }).
    when('/search', {
        templateUrl: 'login/partials/search.html',
        controller: 'searchController'
    }).
    when('/logout', {
        templateUrl: 'login/partials/logout.html',
        controller: 'logout'
    }).
    when('/signup', {
        templateUrl: 'login/partials/signup.html',
        controller: 'singnup'
    }).
    otherwise({
        redirectTo: '/'
    });

    // $locationProvider.html5Mode(true);
}]);