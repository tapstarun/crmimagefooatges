(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('addeditPotentialUserCtrl', addeditPotentialUserCtrl);

    addeditPotentialUserCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','dateFormat','_','$http','Base64Service','$stateParams'];

    function addeditPotentialUserCtrl(CommonService,$rootScope,apiUrl,$scope,dateFormat,_,$http,Base64Service,$stateParams) {
        
        var vm                      =   this;

        vm.formData                 =   {  };
	
        $scope.gridOptions          =   {};

        $scope.dataLoading          =   true;

        vm.formData.operationType   =   "get";

        $scope.buttonText           =   "Add Member";

        $scope.modalShown           =   false;
        
        $scope.toggleModal = function(rowId) {
            vm.formData.id              =   rowId;
            $scope.modalShown = !$scope.modalShown;
        };

        
		vm.formData.id              =$stateParams.id;
		


         (function initController() {
            defaultParamSetup();
        })();

        function defaultParamSetup(){            
            vm.formData.apiKey   = $rootScope.globals.currentUser.apiKey;
          //  vm.formData.type     = $rootScope.globals.currentUser.type; 
		
        }


        $scope.editUser = function(rowId){
            vm.formData.id = rowId;
            $http.defaults.headers.common.Authorization.id = rowId;
            vm.formData.operationType   =   "get";
            CommonService.postData(apiUrl+"addeditPotentialUser.php",vm.formData)
                    .then(function (editUserData) {
                        if(editUserData.error==false) {
							
                            parseUserInformatioData(editUserData);
                        } 
            });
        };

        $scope.deleteUser = function(rowId){
            $scope.dataLoading          =   true;
            vm.formData.operationType   =   "deleteUser";
            CommonService.postData(apiUrl+"addeditPotentialUser.php",vm.formData)
                    .then(function (gridData) {
                        if (gridData.error==false) {
                            vm.formData.id              =   "";
                            $scope.modalShown   = !$scope.modalShown;
                            $scope.message      = "User Deleted Sucessfully";   
                            parseData(gridData);
                        } 
            });
        };


        
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseUserInformatioData(response){  
			
            vm.formData                 = _.extend(vm.formData, response.data[0]);
			//console.log(vm.formData);
            $scope.buttonText           =   "Update Member";
            $scope.dataLoading          = false;  
			
        }

        $scope.resetFormToAddUser       =   function(){            
            $scope.buttonText           =   "Add Member";
            vm.formData = {};  
	
            defaultParamSetup();               
        };

        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            $scope.gridOptions.data     = response.data;
		
            $scope.gridOptions.onRegisterApi = function(gridApi){
              $scope.gridApi = gridApi;
            };
            
            $scope.gridOptions.columnDefs  =  [
                                {field: 'email',enableFiltering:true},
                                {field: 'firstname'},
                                {field: 'lastname'},
                                {field: 'job_title'},
                                {field: 'business_type'},
                                {field: 'company'},
								{field: 'phone'},
								{field: 'state'},
								
                                {
                                    field: 'action',
                                    cellTemplate:'<button class="btn btn-info btn-circle btn-align-left" ng-click="grid.appScope.editUser(row.entity.id)"><i class="fa fa-check"></i></button> <button class="btn btn-warning btn-circle" ng-click="grid.appScope.toggleModal(row.entity.id)"><i class="fa fa-times"></i></button>'
                                }
                            ];

            $scope.dataLoading = false;

            $scope.resetFormToAddUser();
        }

        $scope.addUpdatepotentialMember = function(){

         
			
            if(vm.formData.id){
                vm.formData.operationType   =   "updateUser";
            }
            else{
                vm.formData.operationType   =   "set";
            }
          
          
            CommonService.postData(apiUrl+"addeditPotentialUser.php",vm.formData)
                    .then(function (addUpdateData) {
						
                        if (addUpdateData.error==false) {
							
                            if(vm.formData.operationType=="updateUser"){
                                $scope.message  =   "User updated sucessfully";
							//	$scope.dataLoading = false;
						
                            }
                            else
                            {
                                $scope.message  =   "User added sucessfully";
							
                            }
							//console.log(addUpdateData);
                            parseData(addUpdateData);
                        } 
            });
        };
		
		if(vm.formData.id){
			
			 CommonService.postData(apiUrl+"addeditPotentialUser.php",vm.formData)
				.then(function (potentialUserData) {
					if (potentialUserData.error==false) {
				
					parseUserInformatioData(potentialUserData);
					} 
			}); 
		}else{
			
			 CommonService.postData(apiUrl+"addeditPotentialUser.php",vm.formData)
				.then(function (potentialUserData) {
					
					if (potentialUserData.error==false) {
				
					parseData(potentialUserData);
					} 
			}); 
			
		}
		
        $scope.commonService = CommonService;
        $scope.scope         = $scope;   
        
    }
    
})();
