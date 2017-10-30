(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('InvoiceCtrl', InvoiceCtrl);

    InvoiceCtrl.$inject = ['$location','$rootScope', 'apiUrl', 'CommonService', '$http'];

    function InvoiceCtrl($location, $rootScope, apiUrl, CommonService, $http) {
        
       var invoiceCtrl = this;
	invoiceCtrl.usableCreditBalance="";
	invoiceCtrl.expiredCredits="";
	invoiceCtrl.crptCreditBalance="";
	invoiceCtrl.usableSubscriptionBalance="";
	invoiceCtrl.subscriptionStatus="";
	invoiceCtrl.autoRenewable="";
	invoiceCtrl.subscriptionDiscount="";
	invoiceCtrl.usableDLSlots="";
	invoiceCtrl.dwnlsPckAutoRenewable="";

	invoiceCtrl.getInvoiceInitialValue= function(){
	invoiceCtrl.usableCreditBalance=0;
	invoiceCtrl.expiredCredits=0;
	invoiceCtrl.crptCreditBalance="";
	invoiceCtrl.usableSubscriptionBalance=0;
	invoiceCtrl.subscriptionStatus="";
	invoiceCtrl.autoRenewable="No";
	invoiceCtrl.subscriptionDiscount="10.00";
	invoiceCtrl.usableDLSlots=0;
	invoiceCtrl.dwnlsPckAutoRenewable="No";
	invoiceCtrl.fromMonthList=["Oct","Nov","Dec"];
	invoiceCtrl.selectedfromMonth=invoiceCtrl.fromMonthList[0];
	invoiceCtrl.fromYearList=["2016"];
	invoiceCtrl.selectedfromYear=invoiceCtrl.fromYearList[0];
	invoiceCtrl.toMonthList=["Nov","Dec","Jan"];
	invoiceCtrl.selectedToMonth=invoiceCtrl.toMonthList[0];

	invoiceCtrl.toYearList=["2016","2017"];
	invoiceCtrl.selectedtoYear=invoiceCtrl.toYearList[0];
	}
	invoiceCtrl.credit=function(){
	console.log("credit");
	}
      invoiceCtrl.gridOptions = {};

        invoiceCtrl.dataLoading = true;        
         
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            invoiceCtrl.gridOptions.data = response.data;

            invoiceCtrl.gridOptions.columnDefs   = [
                                {
                                    field: 'proforma'
                                },
                                {field: 'date'},
                                {field: 'slots'},
                                {field: 'price'},
                                {field: 'status'},
                                {field: 'control'}
                               
                            ];

            invoiceCtrl.dataLoading = false;

    
    }
invoiceCtrl.getInvoiceInitialValue();
}
    
})();
