/**
 * Created by yin on 14-2-22.
 */
angular.module('searchApp.directives', [], function($compileProvider){
    $compileProvider.directive('searchDirective', function($compile) {
        return {
//            template: '<div>Hi searchDirective</div>',
            templateUrl: 'view/partials/search.html',
            replace: true,
            transclude: false,
            restrict: 'A',
            scope: false,
            link: function( scope, element, attrs ) {


            }
        };
    });
});
