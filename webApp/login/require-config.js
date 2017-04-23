require.config({
    paths: {
        // jquery: '../bower_lib/jquery',
        bootstrap: '../bower_lib/bootstrap/js/bootstrap',
        underscore: '../bower_lib/underscore',
        angular: '../bower_lib/angular/angular',
        angularRoute: '../bower_lib/angular-route/angular-route',
        i18n: '../bower_lib/requirejs-i18n/i18n',
        text: '../bower_lib/requirejs-text/text',
        // angularResource: '../bower_lib/angular/angular-resource',
        angularGrid: '../bower_lib/ng-grid/ng-grid-2.0.7.debug',
        app : 'js/app'
        // routes: 'js/routes'
        // angularAnimate: '../bower_lib/angular/angular-animate',
        
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        // 'angularResource': ['angular'],
        'angularGrid': ['angular'],
        'bootstrap': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        }
    },
    priority: ["angular"]
/*,
    i18n: {
        locale: 'ja-jp'
    },*/
    // urlArgs: 'v=1.0.0.1'
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";
require(['angular', 'app', 'routes'], function(angular, app, routes) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});

// 手动启动angular，那就不要在html那边加ng-app
// require(['angular',
//          'angular-route',
//          'frontAngularViewApp',
//          'jquery',
//          'controllers/index',
//          'controllers/layout',
//          'controllers/login',
//          'controllers/logout',
//          'controllers/signup',
//          'directives/compare'
// ], function (angular) {
//     debugger;
//     angular.bootstrap(document, ['frontAngularViewApp']);
// });