'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('countries',function($http,CommonService,apiUrl,$timeout,$q,_){
    return {
              templateUrl : 'scripts/directives/countries/countries.html',
              restrict: 'E',
              link: function(scope, element, attrs) {       
                var postData = {};
                postData                = $http.defaults.headers.common.Authorization;                
                CommonService.postData(apiUrl+"countries.php",postData).then(function (fetchData) {
                    if (fetchData.error==false)
                    {
                        scope.options = fetchData.countries;
                    } 
                });
              }
          }
  });


