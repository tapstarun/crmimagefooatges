(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', 'Base64Service'];

    function LoginCtrl($location, AuthenticationService, FlashService, UserService, Base64Service) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;            
            var loggedInUserData = {};
            loggedInUserData.apiKey     = Base64Service.encode(vm.username);   
            loggedInUserData.password   = Base64Service.encode(vm.password);
            
            UserService.CheckUserAuthentication(loggedInUserData)
                    .then(function (fetchedUserDetails) {
                        if (fetchedUserDetails.error==false) {
                            AuthenticationService.SetCredentials(fetchedUserDetails);
                            $location.path('/');
                        } else {
                            FlashService.Error(fetchedUserDetails.error_msg);
                            vm.dataLoading = false;
                        }
                    });
        };
    }
    
})();
