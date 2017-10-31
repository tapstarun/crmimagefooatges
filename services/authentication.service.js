(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'Base64Service'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, Base64Service) {
        var service = {};

        service.SetCredentials      = SetCredentials;
        service.ClearCredentials    = ClearCredentials;

        return service;

        function SetCredentials(loggedInUserDetails) {
	//console.log(loggedInUserDetails);
            $rootScope.globals = {
                currentUser: {
                    apiKey      : Base64Service.encode(loggedInUserDetails.username),
                    firstName   : loggedInUserDetails.firstname,
                    lastName    : loggedInUserDetails.lastname,
                    type        : loggedInUserDetails.type,
					state       : loggedInUserDetails.state,               

					add_crm_user      : loggedInUserDetails.add_crm_user,
                    add_products   : loggedInUserDetails.add_products,
                    transaction    : loggedInUserDetails.transaction,
                    abandond_cart_list        : loggedInUserDetails.abandond_cart_list,
					advance_member_search       : loggedInUserDetails.advance_member_search,		

					search_client_information      : loggedInUserDetails.search_client_information,
                    transaction_search   : loggedInUserDetails.transaction_search,
                    sale_n_transactions    : loggedInUserDetails.sale_n_transactions,
                    performa_invoice_search        : loggedInUserDetails.performa_invoice_search,
					recent_cancelled_transaction       : loggedInUserDetails.recent_cancelled_transaction,
					download_facility       : loggedInUserDetails.download_facility,
					download_on_behalf       : loggedInUserDetails.download_on_behalf,
					low_remaning_credit       : loggedInUserDetails.low_remaning_credit,
					daily_tasks       : loggedInUserDetails.daily_tasks,
					add_potential_user       : loggedInUserDetails.add_potential_user,	
					clientResigestred_list       : loggedInUserDetails.clientResigestred_list,
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = $rootScope.globals;
        }
    }    

})();