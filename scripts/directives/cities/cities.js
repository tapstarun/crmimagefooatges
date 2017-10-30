'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('cities',function($http,CommonService,apiUrl,$timeout,$q,_,$rootScope){
    return {
              templateUrl : 'scripts/directives/cities/cities.html',
              restrict: 'E',
              link: function(scope, element, attrs) {       
                var postData = {};
                postData                = $http.defaults.headers.common.Authorization;	
				postData['stateId']		= $rootScope.globals.currentUser.state;               
                CommonService.postData(apiUrl+"cities.php",postData).then(function (fetchData) {
                    if (fetchData.error==false)
                    {
                        scope.options = fetchData.cities;
                    } 
                });
              }
          }
  });


