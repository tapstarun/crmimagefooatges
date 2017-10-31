(function () {
    'use strict';
	
	angular
        .module('imageCrmApp')
        .controller('DailyTasksCtrl', DailyTasksCtrl);

    DailyTasksCtrl.$inject = ['$location'];

    function DailyTasksCtrl($location) {
		
		var vm 	=	this; 
        vm.myData = [
            {
                "uid": "--",
                "country": "--",
                "state": "--",
                "expiryDate": "--",
				"action": "--"
            }
        ];
		
		vm.myDataSecond = [
            {
                "uid": "sandeep123",
                "country": "IN",
                "state": "Haryana",
                "expiryDate": "2017-05-06 23:59:59",
				"action": "Dimiss"
            },
            {
                "uid": "kap12",
                "country": "IN",
                "state": "UP",
                "expiryDate": "2017-08-09 23:59:59",
				"action": "Active"
            },
        ];
		
		vm.firstOptions = {
            data: vm.myData,
			colDef: [
                  {field: 'uid'},
                  {field: 'country'},
				  {field: 'state'},
				  {field: 'expiryDate'},
				  {field: 'action'},
            ]
        };
		
		vm.secondOptions = {
            data: vm.myDataSecond,
			colDef: [
                  {field: 'uid'},
                  {field: 'country'},
				  {field: 'state'},
				  {field: 'expiryDate'},
				  {field: 'action'},
            ]
        };
    }
	
})();
