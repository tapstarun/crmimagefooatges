(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .factory('UserPlanService', UserPlanService);

    UserPlanService.$inject = ['$rootScope','$http','CommonService','apiUrl'];
    function UserPlanService($http, $rootScope,CommonService,apiUrl) {
        var userservice = {};

        userservice.GetUserPlansDetails      = GetUserPlansDetails;
		
        return userservice;

        function GetUserPlansDetails(UserData) {

				//send data to the server for User plans
				
			return CommonService.postData(apiUrl+"userPlans.php",UserData);

        }


    }    

})();