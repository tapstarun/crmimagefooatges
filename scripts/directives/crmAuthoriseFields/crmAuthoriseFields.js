'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('crmAuthoriseFields',function($http,CommonService,apiUrl,$timeout,$q,_){
    return {
              templateUrl : 'scripts/directives/crmAuthoriseFields/crmAuthoriseFields.html',
              restrict: 'E',


          }
  });


