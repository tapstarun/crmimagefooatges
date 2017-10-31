(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('TransactionSearchCtrl', TransactionSearchCtrl);

    TransactionSearchCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','dateFormat'];

    function TransactionSearchCtrl(CommonService,$rootScope,apiUrl,$scope,dateFormat) {
		
		var vm 	=	this;

        vm.formData = {};

        vm.formData.fromDate = moment(new Date()).format(dateFormat);

        vm.formData.toDate = moment(new Date()).format(dateFormat);
        
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            $scope.gridOptions.data = response.data;

            $scope.gridOptions.columnDefs  =  [
                                {field: 'username'},
                                {field: 'txn_id'},
                                {field: 'order_total'},
                                {field: 'order_date'},
                                {field: 'order_status'}
                            ];
            $scope.dataLoading = false;
        }

        $scope.transactionSearch = function(){ 
            
            $scope.gridOptions = {
                data : []
            };
            
            $scope.dataLoading = true;
            
            vm.formData.apiKey = $rootScope.globals.currentUser.apiKey;
            
            if(vm.formData.fromDate)
                vm.formData.fromDate = moment(vm.formData.fromDate).format(dateFormat);

            if(vm.formData.toDate)
                vm.formData.toDate = moment(vm.formData.toDate).format(dateFormat);

            CommonService.postData(apiUrl+"transactionsSearch.php",vm.formData)
                    .then(function (searchedData) {
                        if (searchedData.error==false) {
                            parseData(searchedData);
                        } 
            });
        };
    }
	
})();
