'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('states',function($http,CommonService,apiUrl,$timeout,$q,_){
    return {
              templateUrl : 'scripts/directives/states/states.html',
              restrict: 'E',
			scope:{
				  statesvalues:'='
				},
              link: function(scope, element, attrs) {     
				scope.statesValues=attrs["statesvalues"];


				
				
                var postData = {};
                postData                = $http.defaults.headers.common.Authorization;   
				
				postData['CountryId']   = 88; /* 88 is used for India */  
				

				
				postData['stateID'] =$http.defaults.headers.common.Authorization.state;	
				
				postData['type'] =$http.defaults.headers.common.Authorization.type;
				
				if(scope.statesValues=="allstates"){
					postData['opertion'] ="All State";
					
				}	
				else{
					if(postData['type']=="ADMIN"){
							postData['opertion'] ="All State";/* 	All State for Particluar country have Partticlur states	 */
						}
					else{
							postData['opertion'] ="Particular State";
						}
				}
                CommonService.postData(apiUrl+"states.php",postData).then(function (fetchData) {
                    if (fetchData.error==false)
                    {
						
                        scope.states = fetchData.states;
                    } 
                });
              }
          }
  });


