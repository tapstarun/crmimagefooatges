'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('stateswithcites',function($http,CommonService,apiUrl,$timeout,$q,_){
    return {
              templateUrl : 'scripts/directives/stateswithcites/stateswithcites.html',
              restrict: 'E',

              link: function(scope, element, attrs) {     

				scope.changeCities = function(stateName) {
				 var postStateData = {};
                postStateData                = $http.defaults.headers.common.Authorization;   
				
				postStateData['stateName'] =stateName;	

				
					CommonService.postData(apiUrl+"stateswithcites.php",postStateData).then(function (fetchData) {
					
					 if (fetchData.error==false)
						{
							
							scope.cities = fetchData.cities;
						} 
					});

				}
				
				
                var postData = {};
                postData                = $http.defaults.headers.common.Authorization;   
				
				postData['CountryId']   = 88; /* 88 is used for India */  
				

				
				postData['stateID'] =$http.defaults.headers.common.Authorization.state;	
				
				postData['type'] =$http.defaults.headers.common.Authorization.type;

					if(postData['type']=="ADMIN")
					{
							postData['opertion'] ="All State";/* 	All State for Particluar country have Partticlur states	 */
					}
					else{
							postData['opertion'] ="Particular State";
						}
                CommonService.postData(apiUrl+"states.php",postData).then(function (fetchData) {
                    if (fetchData.error==false)
                    {
						//console.log(fetchData.states);
                        scope.states = fetchData.states;
						
                    } 
                });
              }
          }
  });


