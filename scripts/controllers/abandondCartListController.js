(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('AbandondCartListCtrl', AbandondCartListCtrl);

    AbandondCartListCtrl.$inject = ['uiGridGroupingConstants','$rootScope', 'apiUrl','CommonService','$scope','$http'];

    function AbandondCartListCtrl(uiGridGroupingConstants, $rootScope, apiUrl, CommonService, $scope, $http) {
		
		var vm = {};
		vm.formData={
			status:'pending',
				
		};
		$scope.CountriesData = true; /* this is used for not showing staff to all countries data */
		
		vm.formData.apiKey   =  $rootScope.globals.currentUser.apiKey;
		vm.formData.state   =  $rootScope.globals.currentUser.state;
		
		vm.formData.type   =  $rootScope.globals.currentUser.type;	
		
		vm.formData.Opertaion   ="All Data"; /* This opertaion is used for showing all data to the admin; */ 
		
		if(vm.formData.type !="ADMIN"){
		
			$scope.CountriesData = false;
			 vm.formData.Opertaion="Particular data";
		

		}
		
	$scope.updateRow = function(id){
	console.log(vm.formData);console.log(id);
	if(id==vm.form){
				
	}
	
      };
	  
	  /* this will assign value to the form for particular user */
		$scope.stausvalue =function(status,id){

	 		/* vm.formData.id=id;
			vm.formData.status=status; 
		//	console.log(vm.formData); */
		
			
		}

        $scope.gridOptions = {};

        $scope.dataLoading = true;        
        

		
		/* Get list Data */
		$scope.getListData  = function (){
			console.log(vm.formData);
			CommonService.postData(apiUrl+"abandonedCart.php",vm.formData)
						.then(function (gridData) {
							if (gridData.error==false) {
							  //  console.log(gridData);
								parseData(gridData);
							} 
			}); 
		};		
        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseData(response){
            
            $scope.gridOptions.data         = response.data;
			$scope.rememnaing_items	    	=	response.data.length;
            $scope.gridOptions.columnDefs   = [
                                 {
                                    field: 'created',
                                    type: 'date',
                                    grouping: { groupPriority: 0 }, 
                                    sort: { priority: 0, direction: 'desc' }, 
                                    width: '18%', 
                                    cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
                                    { 
                                        name: 'id',cellTemplate:'<div class="ui-grid-cell-contents ng-binding ng-scope" ng-model="vm.formData.id">{{row.entity.id}}<div>', treeAggregation: { type: uiGridGroupingConstants.aggregation.AVG 
                                    } 
                                }, 
                                {field: 'name'}, 
                               
                                {field: 'user_id'},
								{field: 'price'},
                                {field: 'img_sizes'},
                                {field: 'Product_type'}, 
								{field: 'country'},	

								
                             
                                {
                                    field: 'Status',
									displayName:'value',
									 enableCellEdit: true,
									  
									  editType: 'dropdown',
							/* 	editableCellTemplate: 'ui-grid/dropdownEditor', */
                                   editableCellTemplate:'<div ng-if="row.treeLevel!=0" class="form-group"><select class="form-control" ng-model="vm.formData.status" ng-change="grid.appScope.stausvalue(vm.formData.status,row.entity.id);"><option value="pending">Pending</option><option value="contact_again">Contact Agian later</option><option value="rejected">Rejected</option></select></div>{{vm.formData.status}}',
                                   /* editDropdownOptionsArray: [
											  'male',
											  'female',
											  'other'
											], */
											
									editDropdownOptionsArray: [
									  { id: 0, value: 'male' },
									  { id: 1, value: 'female' },
									  { id: 2, value: 'other' }
									]
								}  ,

								{
                                    field: 'action',
                                    cellTemplate:'<button ng-if="row.treeLevel!=0" class="btn btn-danger btn-xs"  ng-click="grid.appScope.updateRow(row.entity.id)">Update</button>',
									    
	
                                }
                            ];
             $scope.gridOptions.onRegisterApi= function (gridApi) {
                vm.gridApi = gridApi;
				gridApi.edit.on.afterCellEdit($scope,function(rowEntity,colDef,newValue,oldValue){
					console.log(rowEntity);
				});
				 
                //gridApi.selection.selectRow(vm.gridOptions.data[0]);
/* 			   gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
				   console.log('navigation event');
			   }); */
			   console.log(vm.gridApi);
			   //console.log(vm.gridApi.edit.on.afterCellEdit($scope,scope));
            } 

            $scope.dataLoading = false;
        } 

		/* this is initialize when the page load first time. */

	//	$scope.getListData();


		//console.log(vm.formData);
		$scope.$watch('vm.formData.country',function(newValue,oldValue){
		
		
		vm.formData.country   =  newValue;
		
			$scope.getListData();
		});	


	
		$scope.$watch('vm.formData.currentstatus',function(newValue,oldValue){
		vm.formData.currentstatus    =  newValue;
		vm.formData.country   = vm.formData.country;
			$scope.getListData();
		});	
	}


   
	
})();
