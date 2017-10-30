(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('AbandondCartListCtrl', AbandondCartListCtrl);

    AbandondCartListCtrl.$inject = ['uiGridGroupingConstants','$rootScope', 'apiUrl','CommonService','$scope','$http'];

    function AbandondCartListCtrl(uiGridGroupingConstants, $rootScope, apiUrl, CommonService, $scope, $http) {
		
		var vm = {};
		vm.formData={
			status:'pending' 
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
		
		$scope.showMe = function(id,data){
			
// $scope.$digest();
 console.log(data);
        };

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
                                        name: 'id', treeAggregation: { type: uiGridGroupingConstants.aggregation.AVG 
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
									/* displayName:'value', */
									 enableCellEdit: true,
									  
									  editType: 'dropdown',
								editableCellTemplate: 'ui-grid/dropdownEditor',
                                   cellTemplate:'<div ng-if="row.treeLevel!=0" class="form-group"><select class="form-control" ng-model="vm.formData.status" append-to-body="true"><option value="pending">Pending</option><option value="contact_again">Contact Agian later</option><option value="rejected">Rejected</option></select></div>{{vm.formData.status}}'
                                }  ,

								{
                                    field: 'action',
                                //    cellTemplate:'<button ng-if="row.treeLevel!=0" class="btn btn-danger btn-xs"  ng-click="grid.appScope.showMe(row.entity.id,vm.formData.status)">Update</button>'
	
                                }
                            ];
             $scope.gridOptions.onRegisterApi= function (gridApi) {
                vm.gridApi = gridApi;
                //gridApi.selection.selectRow(vm.gridOptions.data[0]);
   gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
       console.log('navigation event');
   });
            } 
/*  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
   // $scope.gridApi.grid.modifyRows($scope.gridOptions.data);
    $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
    var rows = $scope.gridApi.selection.getSelectedRows();
    
    //aravind's code to get the selected row elements is as below
    gridApi.selection.on.rowSelectionChanged($scope,function(row){
    var msg = 'row selected ' + row.isSelected;
    vm.formData.status=row.entity.status;
    
    
    
  });
}  */
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
