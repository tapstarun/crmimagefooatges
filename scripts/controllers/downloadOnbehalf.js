(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('DownloadOnbehalfCtrl', DownloadOnbehalfCtrl);

	DownloadOnbehalfCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','UserPlanService','$window','$location'];

    function DownloadOnbehalfCtrl(CommonService,$rootScope,apiUrl,$scope,UserPlanService,$window,$location) {
		
		var vm 	=	this;

        vm.formData = {};

        
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){

			
            $scope.productOptions.data = response.data;
			vm.formData.product_type = response.data[0].type;  
           
		   $scope.dataLoading = false;
        }   


		function userParseData(response){
					
            $scope.userOptions.data = response.data;  

        }
            
			$scope.productOptions = {
                data : []
            };		

			$scope.userOptions = {
                data : []
            };
			
        $scope.productSearch = function(){ 

            $scope.dataLoading = true;
            
            vm.formData.apiKey = $rootScope.globals.currentUser.apiKey;

             CommonService.postData(apiUrl+"productDownloadOnBehalf.php",vm.formData)
                    .then(function (getData) {
						  if (getData.error==false) {
                            parseData(getData);
                        } 
            }); 
			
			// get data of user details
			
 			UserPlanService.GetUserPlansDetails(vm.formData)
					.then(function (plans){
						if(plans.error==false){
						
							userParseData(plans);
						
						}
					});  
			
        };
		
		$scope.buyProductOnBehalf = function(){
			 $scope.dataLoading = true;
			
			//console.log(vm.formData);
			CommonService.postData(apiUrl+"makeAInvoice.php",vm.formData)
                    .then(function (getData) {
 						  if (getData.error==false) {
                     
						order_invoice(getData.data[0].id);
                      $scope.dataLoading = false;
					 } 
					
            });
	
		}
		
		function order_invoice(invoiceId){
			$location.path("/dashboard/orderInvoice/"+invoiceId);
		}
		
		
    }

	
})();
