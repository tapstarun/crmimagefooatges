(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('TransacCtrl', TransacCtrl);

    TransacCtrl.$inject = ['$location','$rootScope', 'apiUrl', 'CommonService', '$http'];

    function TransacCtrl($location, $rootScope, apiUrl, CommonService, $http) {
        
        var vm = this;

        vm.dataLoading = true;

        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
			
            vm.gridOptions = {
                data    :  [response.data],
                colDef  :  [
                                {field: 'id'},
                                {field: 'txn_id'},
                                {field: 'order_total'},
                                {field: 'order_date'},
                                {field: 'order_status'},
                                {field: 'username'}
                            ]

            };
            vm.dataLoading = false;
        }              

        /*This method actually loading the data from service.*/
        function loadData() {

            CommonService.postData(apiUrl+"transactions.php",$rootScope.globals.currentUser)
                    .then(function (gridData) {
						
						if (gridData.error==false) {

								parseData(gridData);

						}						
            });
        };
        
        loadData();
    }
    
})();
