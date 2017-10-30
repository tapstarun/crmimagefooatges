(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('OrderInvoiceCtrl', OrderInvoiceCtrl);

	OrderInvoiceCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','$stateParams'];

    function OrderInvoiceCtrl(CommonService,$rootScope,apiUrl,$scope,$stateParams) {
			
		var service={};
		
		var vm = this;
		
		vm.formData = {};
		
		// get invoice id using url
		
		vm.formData.invoiceId=$stateParams.id;
		
		vm.formData.apiKey=$rootScope.globals.currentUser.apiKey;
		
		// get the details of order using invoice id
		CommonService.postData(apiUrl+"orderInvoice.php",vm.formData)
                    .then(function (invoiceData) {
                        if (invoiceData.error == false) {
				           OrderData(invoiceData);
                        }
                    });

            
			function OrderData(orderData){
				$scope.OrderOptions.data=orderData.data;
				
			}
			
 			$scope.OrderOptions = {
                data : []
            };		

	/*		$scope.userOptions = {
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
			 */

		

		
		
    }

	
})();
