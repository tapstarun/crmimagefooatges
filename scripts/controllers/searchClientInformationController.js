(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('SearchClientInformationCtrl', SearchClientInformationCtrl);

    SearchClientInformationCtrl.$inject = ['$rootScope', 'apiUrl','CommonService','$scope','$http','$location'];

    function SearchClientInformationCtrl($rootScope, apiUrl,CommonService,$scope,$http,$location){
		
		var vm 	=	this; 
		
		vm.formData= {};
		
		vm.formData.apiKey   =  $rootScope.globals.currentUser.apiKey;
		
		vm.formData.state   =  $rootScope.globals.currentUser.state;
		
		vm.formData.type   =  $rootScope.globals.currentUser.type;	
		
		
        function parseData(response){
       //     console.log(response.data);
            $scope.gridOptions.data = response.data;

             $scope.gridOptions.columnDefs  =  [
                                {field: 'id'},
								{field: 'email'},
                                {field: 'firstname'},
                                
                                {field: 'job_title'},  
								{field: 'business_type'}, 
								{field: 'company'},
                                {field: 'address'},
                              
                                {field: 'phone'},
                                
                                {field: 'opertionType'},
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
		
		
		$scope.advanceUserSearch = function (){
			 $scope.dataLoading = true;
			 $scope.gridOptions ={
				 data:[]
			 };
			
			CommonService.postData(apiUrl+'searchUsers.php',vm.formData)
					.then(function(responseData){
						if (responseData.error==false) {
								parseData(responseData);
						}
					})
			
		}

    }
	
})();
