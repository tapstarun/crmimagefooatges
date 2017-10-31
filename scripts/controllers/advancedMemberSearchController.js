(function () {
    'use strict';
    
    angular
        .module('imageCrmApp')
        .controller('AdvancedMemberSearchCtrl', AdvancedMemberSearchCtrl);

    AdvancedMemberSearchCtrl.$inject = ['CommonService','$rootScope','apiUrl','$scope','dateFormat','$location'];

    function AdvancedMemberSearchCtrl(CommonService,$rootScope,apiUrl,$scope,dateFormat,$location) {
        
        var vm  =   this;

        vm.formData = {};
		vm.formData = {
			userSerach:"advanceSearch"
		};

/*         //vm.formData.created_date = moment();


	
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            $scope.gridOptions.data = response.data;

            $scope.gridOptions.columnDefs  =  [
                                {field: 'id'},
								{field: 'username'},
                                {field: 'firstname'},
                                {field: 'lastname'},
                                {field: 'company'},
                                {field: 'country'},
                                {field: 'city'},
                                {field: 'phone'},
                                {field: 'email'},
                                {field: 'zipcode'},
								{
									field:"action",
									cellTemplate:'<button class="btn btn-info btn-circle btn-align-left" ng-click="grid.appScope.editUser(row.entity.id,row.entity.opertionType)"><i class="fa fa-check"></i></button> '
								}
                            ];
            $scope.dataLoading = false;
        }
		$scope.editUser = function(userId,opertionType)
		{
			if(opertionType=="advanceUser"){
				$location.path("/dashboard/editSiteUserCtrl/"+userId);
			}else{
				$location.path("/dashboard/addeditPotentialUserCtrl/"+userId);
			}
			
		}

        $scope.advanceSearch = function(){
            
            $scope.gridOptions = {
                data : []
            };
            
            $scope.dataLoading = true;
            
            vm.formData.apiKey = $rootScope.globals.currentUser.apiKey;
			
		//	console.log(vm.formData);
/*             if(vm.formData.created_date)
                vm.formData.created_date = moment(vm.formData.created_date).format(dateFormat); */
            
            CommonService.postData(apiUrl+"advanceMembers.php",vm.formData)
                    .then(function (searchedData) {
                        if (searchedData.error==false) {
                            parseData(searchedData);
                        } 
            });
        };
		

    }
    
})();
