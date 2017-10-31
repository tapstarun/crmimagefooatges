'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
  .directive('countryWithStatesWithCites',function($http,CommonService,apiUrl,$timeout,$q,_,$stateParams){
    return {
              templateUrl : 'scripts/directives/countryWithStatesWithCites/countryWithStatesWithCites.html',
              restrict: 'E',
			  
              link: function(scope, element, attrs) {     

			  
				scope.requiredfields=attrs['requiredfields'];

				scope.changecountry = function(countryName) {
				
					 var postCountryData = {};
					postCountryData                = $http.defaults.headers.common.Authorization;   
					
					postCountryData['countryName'] =countryName;
					postCountryData['opertion'] ="All States";	

					
					CommonService.postData(apiUrl+"countryWithStates.php",postCountryData).then(function (fetchData) {
						
						 if (fetchData.error==false)
							{
								
								scope.states = fetchData.states;
								scope.cities = [];
							} 
						});

				}		

				scope.changeStates = function(stateName) {
					var postStateData = {};
					postStateData                = $http.defaults.headers.common.Authorization;   
					
					postStateData['id'] =$stateParams.id;
					
					postStateData['stateName'] =stateName;	
					 postStateData['opertion'] ="All Cities"; 
					
					CommonService.postData(apiUrl+"countryWithStates.php",postStateData).then(function (fetchData) {
						
						 if (fetchData.error==false)
							{
								
								scope.cities = fetchData.cities;
							} 
						});  

				}
			
				
                var postData = {};
                postData['apiKey']                = $http.defaults.headers.common.Authorization.apiKey;   
				
			
				postData['opertion'] ="All Country";

                CommonService.postData(apiUrl+"countryWithStates.php",postData).then(function (fetchData) {
                    if (fetchData.error==false)
                    {
						//console.log(fetchData.states);
                        scope.country = fetchData.country;


                    } 
                });

				/* It watch the steps of form if it will change then the value will change it will something like ng-load and ng-chnage  */
		 		scope.$watch ('vm.formData.country',function (newValue,oldValue){

					scope.changecountry(newValue);

				});  
			
		 	 scope.$watch ('vm.formData.state', function (newValue,oldValue){
					scope.changeStates(newValue);
				}); 
			
              }
          }
  });


