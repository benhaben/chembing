'use strict';

/* Controllers */

angular.module('frontAngularViewApp').controller('loginController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
	$scope.user = {
		name: '',
		password: '',
		rememberMe: null
	};

	$scope.login = function() {
		$http.post('/login', $scope.user).success(function(data) {
			if (data.err) {
				$scope.err = data.err;
				alert(data.err);
			}
			alert(data.success);

			$location.path("/search");
		});
	};
}]);
