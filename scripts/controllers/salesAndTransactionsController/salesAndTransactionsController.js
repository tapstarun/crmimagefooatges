(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('SalesAndTransacCtrl', SalesAndTransacCtrl);

    SalesAndTransacCtrl.$inject = ['$location','$rootScope', 'apiUrl', 'CommonService', '$http'];

    function SalesAndTransacCtrl($location, $rootScope, apiUrl, CommonService, $http) {
        
        var vm = this;

        vm.dataLoading = true;
	
         var setAllInactive = function() {
        angular.forEach($scope.workspaces, function(workspace) {
            workspace.active = false;
        });
    };
 
 vm.selectedTemplate='';   
 vm.tabs =
    [
        { id: 1, name: "CLIENT INFO", active:true,template:"views/salesAndTransactions/clientInfo.html" },
        { id: 2, name: "INVOICES", active:false,template:"views/salesAndTransactions/invoice.html" },
	{ id: 3, name: "STATISTICS", active:false,template:"views/salesAndTransactions/statistics.html" },
	{ id: 4, name: "SALE FORECAST", active:false,template:"views/salesAndTransactions/saleForecast.html" }
    ];
 vm.selectTab = function(id){
	for( var i=0;i<vm.tabs.length;i++){
	if(id ==vm.tabs[i].id){
	vm.selectedTemplate = vm.tabs[i].template}
	}
}
    
    }
    
})();
