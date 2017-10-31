(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('SaleForecastCtrl', SaleForecastCtrl);

    SaleForecastCtrl.$inject = ['$location','$rootScope', 'apiUrl', 'CommonService', '$http'];

    function SaleForecastCtrl($location, $rootScope, apiUrl, CommonService, $http) {
        var vm = this;
      vm.gridOptions = {};

        vm.dataLoading = true;        
         
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            vm.gridOptions.data         = response.data;

            vm.gridOptions.columnDefs   = [
                                {
                                    field: 'dealValue'
                                },
                                {field: 'currency'},
                                {field: 'transactionId'},
                                {field: 'probabilityOfClosing'},
                                {field: 'projectCloseDate'},
                                {field: 'projectCloseYear'},
                                {field: 'createDate'},
                                {
                                    field: 'status'
                                }
                            ];

            vm.dataLoading = false;
        } 

        CommonService.postData(apiUrl+"abandonedCart.php",{apiKey: $rootScope.globals.currentUser.apiKey})
                    .then(function (gridData) {
                        if (gridData.error==false) {
                            parseData(gridData);
                        } });

    
    }    
})();
