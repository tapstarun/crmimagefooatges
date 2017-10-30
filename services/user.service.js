(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'apiUrl'];
    function UserService($http, apiUrl) {

        var service = {};

        service.CheckUserAuthentication = CheckUserAuthentication;

        return service;

        function CheckUserAuthentication(userDetails) {
		//	console.log($http.post(apiUrl+'login.php', userDetails));
            return $http.post(apiUrl+'login.php', userDetails).then(handleSuccess, handleError('Error creating user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
