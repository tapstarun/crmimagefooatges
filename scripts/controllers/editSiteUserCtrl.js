(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('editSiteUserCtrl', editSiteUserCtrl);

    editSiteUserCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','dateFormat','_','$http','$stateParams'];

    function editSiteUserCtrl(CommonService,$rootScope,apiUrl,$scope,dateFormat,_,$http,$stateParams) {
        
        var vm                      =   this;

        vm.formData                 =   {}
	
        $scope.dataLoading          =   false;

		vm.formData.userId=$stateParams.id;
		
		vm.formData.operationType   =   "getUserData";
		
         (function initController() {
            defaultParamSetup();
        })();

        function defaultParamSetup(){            
            vm.formData.apiKey   = $rootScope.globals.currentUser.apiKey;
          //  vm.formData.type     = $rootScope.globals.currentUser.type; 
		
        }


        
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseUserInformatioData(response){  
			
            vm.formData                 = _.extend(vm.formData, response.data[0]);
			//console.log(vm.formData);
            $scope.buttonText           =   "Update Member";
            $scope.dataLoading          = false;  
			$scope.PasswordShow          = false;
        }

        $scope.resetFormToAddUser       =   function(){            
            $scope.buttonText           =   "Add Member";
            vm.formData = {};  
			vm.formData                 =   {
 					add_crm_user:"0",
					add_products:"0",
					transaction:"0",
					
					abandond_cart_list:"0",
					advance_member_search:"0",	

					search_client_information:"0",
					transaction_search:"0",
					sale_n_transactions:"0",
					performa_invoice_search:"0",
					recent_cancelled_transaction:"0",		

					download_facility:"0",
					download_on_behalf:"0",
					low_remaning_credit:"0",
					daily_tasks:"0"
					
		};
            defaultParamSetup();               
        };

        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
        
            vm.formData     = response.data[0];
		 // console.log(vm.formData);
        }

        $scope.UpdateSiteMember = function(){

            CommonService.showHideImage($scope);
            vm.formData.apiKey   = $rootScope.globals.currentUser.apiKey; 
			vm.formData.operationType   =   "updateUser";
            console.log(vm.formData);
            
            CommonService.postData(apiUrl+"SiteMembers.php",vm.formData)
                    .then(function (UpdateData) {
                        if (UpdateData.error==false) {

                                $scope.message  =   "User updated sucessfully";
								$scope.dataLoading          = false;  
                          //  parseData(UpdateData);
                        } 
            });
        };
		
         CommonService.postData(apiUrl+"SiteMembers.php",vm.formData)
            .then(function (crmUserData) {
                if (crmUserData.error==false) {
				//	console.log(crmUserData);
                    parseData(crmUserData);
                } 
        }); 

        $scope.commonService = CommonService;
        $scope.scope         = $scope;   
        
    }
    
})();
