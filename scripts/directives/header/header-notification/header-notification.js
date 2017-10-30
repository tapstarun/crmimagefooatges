'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('imageCrmApp')
	.directive('headerNotification',function($http){
		return {
			templateUrl:'scripts/directives/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				scope.userDetails = $http.defaults.headers.common.Authorization;
			}
    	}
	});


