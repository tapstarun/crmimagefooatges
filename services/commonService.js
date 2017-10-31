(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .factory('CommonService', CommonService);

    CommonService.$inject = ['$http','$window','_','uiGridConstants'];
    function CommonService($http,$window,_,uiGridConstants) {

        var service = {};

        service.postData    = postData;
        
        service.getData     = getData;

        service.checkElementLength  =   checkElementLength;
        
        service.showHideImage       =   showHideImage;

        service.toggleFiltering     =   toggleFiltering;

        return service;

        function postData(postUrl,data) {
			//console.log(postUrl);
			console.log($http.post(postUrl, data));
            return $http.post(postUrl, data).then(handleSuccess, handleError('Error creating user'));
        }
        
        function getData(getUrl) {
            return $http.get(getUrl).then(handleSuccess, handleError('Error creating user'));
        }

        function checkElementLength(objectToCheck,elementId){            
            var result = _.has(objectToCheck,elementId);            
            if(result && objectToCheck[elementId]){
                result = false;
            }
            else
            {
                result = true;
            }
            return result;            
        }

        function toggleFiltering(scope){
            scope.gridOptions.enableFiltering = !scope.gridOptions.enableFiltering;
            scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN);
            return true;
        }

        function showHideImage(scopeVar){
            scopeVar.dataLoading = true;
            scopeVar.gridOptions = {};
            return true;
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
