(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('ClientInfoCtrl', ClientInfoCtrl);

    ClientInfoCtrl.$inject = ['$location','$rootScope', 'apiUrl', 'CommonService', '$http'];

    function ClientInfoCtrl($location, $rootScope, apiUrl, CommonService, $http) {
        
       var clientInfo = this;
	clientInfo.userId="";
	clientInfo.password="";
	clientInfo.firstName="";
	clientInfo.lastName="";
	clientInfo.email="";
	clientInfo.emailVerified="";
	clientInfo.registrationIP = "";
	clientInfo.dateRegister = "";
	clientInfo.lastLogin ="";
	clientInfo.subscribeNewsletter="";
	clientInfo.deactivateAccMgr = "";
	clientInfo.company = "";
	clientInfo.vat = "";
	clientInfo.creditTerm = "";
	clientInfo.street1="";
	clientInfo.street2="";
	clientInfo.city="";
	clientInfo.state="";
	clientInfo.postcode ="";
	clientInfo.phone = "";
	clientInfo.partner="";
	clientInfo.whitelistUser="";
	clientInfo.blacklistUser="";
	clientInfo.checkoutFrozen="";
	clientInfo.allowDwnldCrtficate="";
	clientInfo.enableMultiLogin="";
	clientInfo.prefferedContactEmail = "";
	clientInfo.prefferedContactPhone = "";
	clientInfo.prefferedContactSms = "";
	clientInfo.clientDesc = "";
	clientInfo.editCompany = "";
	clientInfo.selectedIndustry="";
	clientInfo.position="";
	clientInfo.editPhone ="";
	clientInfo.editStreet1="";
	clientInfo.editStreet2="";
	clientInfo.editCity="";
	clientInfo.editPostcode="";
	clientInfo.editState="";
	clientInfo.industries=[];
	clientInfo.deactivated="";

	clientInfo.setInitialValue= function(){
	clientInfo.userId="jhasha";
	clientInfo.password="Devk1992@";
	clientInfo.deactivated="No";
	clientInfo.firstName="Shal";
	clientInfo.lastName="Jha";
	clientInfo.email="jhasha@gmail.com";
	clientInfo.emailVerified="Yes";
	clientInfo.registrationIP = "10.1.99";
	clientInfo.dateRegister = "7-11-2017";
	clientInfo.lastLogin ="7-12-2017 03:52AM";
	clientInfo.subscribeNewsletter="Yes";
	clientInfo.deactivateAccMgr = "Shilpi/Balaji/Dev";
	clientInfo.company = "";
	clientInfo.vat = "";
	clientInfo.creditTerm = "";
	clientInfo.street1="";
	clientInfo.street2="";
	clientInfo.city="";
	clientInfo.state="";
	clientInfo.postcode ="";
	clientInfo.phone = "";
	clientInfo.partner="No";
	clientInfo.whitelistUser="No";
	clientInfo.blacklistUser="No";
	clientInfo.checkoutFrozen="No";
	clientInfo.allowDwnldCrtficate="No";
	clientInfo.enableMultiLogin="No";
	clientInfo.prefferedContactEmail = "Yes";
	clientInfo.prefferedContactPhone = "Yes";
	clientInfo.prefferedContactSms = "No";
	clientInfo.clientDesc = "";
	clientInfo.editCompany = "";
	clientInfo.industries=["Industry 1","Industry2","Industry3"];
	clientInfo.selectedIndustry= "Industry 1";
	clientInfo.position="";
	clientInfo.editPhone ="";
	clientInfo.editStreet1="";
	clientInfo.editStreet2="";
	clientInfo.editCity="";
	clientInfo.editPostcode="";
	clientInfo.editState="";
	
		}
	clientInfo.resetPassword= function(){
	console.log("reset Password");
		}
	clientInfo.changeEmail=function(){
	console.log("change email");
	}
	clientInfo.save=function(){
	console.log("save");}
	clientInfo.selectIndustry = function(selectedIndustry){
	clientInfo.selectedIndustry =selectedIndustry;
	}
	clientInfo.enableEditing= function(){
	console.log("enable editing");}
	
    	clientInfo.setInitialValue();
    }
    
})();
