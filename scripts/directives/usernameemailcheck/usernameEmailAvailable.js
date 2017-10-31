'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('usernameEmailAvailable',function($http,CommonService,apiUrl,$timeout,$q,_){
    return {
              restrict: 'AE',
              require: 'ngModel',
              link: function(scope, elm, attr, model) {            
                elm.bind('keydown keypress mousedown', function() {
                  model.$asyncValidators.usernameEmailExists = function() { 
                      var postData = {};
                      postData                = $http.defaults.headers.common.Authorization;
                      postData.checkParam     = model.$viewValue;
                      postData.operationType  = "getUsernameEmail";
                                             
                      return CommonService.postData(apiUrl+"crmMember.php",postData).then(function (fetchData) {
                          if (fetchData.error==false)
                          {
                             model.$setValidity('usernameExists', fetchData.data);
                          } 
                      });
                  };
                });            
              }
      }
  });


