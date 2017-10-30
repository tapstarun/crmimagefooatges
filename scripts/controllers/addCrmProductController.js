(function () {
    'use strict';

    angular
        .module('imageCrmApp')
        .controller('AddCrmProductCtrl', AddCrmProductCtrl);

    AddCrmProductCtrl.$inject = ['CommonService', '$rootScope', 'apiUrl', '$scope', 'dateFormat', '_', '$http', 'Base64Service'];

    function AddCrmProductCtrl(CommonService, $rootScope, apiUrl, $scope, dateFormat, _, $http, Base64Service) {

        var vm = this;

        vm.formData = {};

        $scope.gridOptions = {};

        $scope.dataLoading = true;

        vm.formData.operationType = "get";

        $scope.buttonText = "Add Product";

        $scope.modalShown = false;

        $scope.toggleModal = function (rowId) {
            vm.formData.id = rowId;
            $scope.modalShown = !$scope.modalShown;
        };

        (function initController() {
            defaultParamSetup();
        })();

        function defaultParamSetup() {
            vm.formData.apiKey = $rootScope.globals.currentUser.apiKey;
            vm.formData.type = $rootScope.globals.currentUser.type;
        }

        /*This method is used to select grid selected row data and fill into the control fields.*/
        $scope.editProduct = function (rowId) {
            vm.formData.id = rowId;
            $http.defaults.headers.common.Authorization.id = rowId;
            vm.formData.operationType = "getProductInformation";
            CommonService.postData(apiUrl + "crmProducts.php", vm.formData)
                    .then(function (editProductData) {
                        if (editProductData.error == false) {
                            parseProductInformatioData(editProductData);
                        }
                    });
        };

        /*This method is used to delete grid selected row data from the database table with a popup of confirmation.*/
        $scope.deleteProduct = function (rowId) {
            $scope.dataLoading = true;
            vm.formData.operationType = "deleteProduct";
            CommonService.postData(apiUrl + "crmProducts.php", vm.formData)
                    .then(function (gridData) {
                        if (gridData.error == false) {
                            vm.formData.id = "";
                            $scope.modalShown = !$scope.modalShown;
                            $scope.message = "Product Deleted Sucessfully";
                            parseData(gridData);
                        }
                    });
        };



        $scope.dummyArray = [];
        $scope.dummyArray[0] = "";
        $scope.dummyArray[1] = "";


        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e, x) {

            $scope.files = [];
            $scope.$apply(function () {




                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    var str1 = e.files[0].type;
                    // var str2 = e.files[1].file.type;
                    if (str1.match("image/") && x == 0) {
                        $scope.files.push(e.files[i]);
                        $scope.dummyArray[x] = e.files[i];
                        $scope.checkIMage = true;
                    }
                    else if (str1.match("audio/") && x == 1) {
                        $scope.files.push(e.files[i]);
                        $scope.dummyArray[x] = e.files[i];
                        $scope.checkAudio = true;
                    }

                    else {
                        alert('invalid extension!');
                    }
                }


            });
        };

        // NOW UPLOAD THE FILES.
        //$scope.uploadFiles = function () {


        //    if ($scope.MovieName != "" && $scope.Language != null && $scope.Country != null && $scope.AudioFor != "" && $scope.Frequency != "") {
        //        if ($scope.checkAudio == true && $scope.checkIMage == true) {
        //            document.getElementById('customForm').style.cursor = 'wait';
        //            $scope.bar = true;
        //            //FILL FormData WITH FILE DETAILS.
        //            var data = new FormData();

        //            for (var i in $scope.dummyArray) {
        //                data.append("uploadedFile", $scope.dummyArray[i]);
        //            }



        //            // ADD LISTENERS.
        //            var objXhr = new XMLHttpRequest();
        //            objXhr.addEventListener("progress", updateProgress, false);
        //            objXhr.addEventListener("load", transferComplete, false);

        //            var aHeaders = {
        //                'fileName': $scope.MovieName,
        //                'language': $scope.Language,
        //                'location': $scope.Country,
        //                'description': $scope.Description,
        //                'frequency': $scope.Frequency,
        //                'audiofor': $scope.AudioFor
        //            };



        //            // SEND FILE DETAILS TO THE API.
        //            objXhr.open("POST", "service/brocaService/uploadFile");
        //            for (var t in aHeaders) {
        //                objXhr.setRequestHeader(t, aHeaders[t]);
        //            }

        //            // objXhr.setRequestHeader("fileName","barish.mp3");
        //            //document.getElementById("myProgress").style.display= "block";
        //            // move();
        //            objXhr.send(data);


        //            $scope.MovieName = "";
        //            $scope.Language = null;
        //            $scope.Country = null;
        //            $scope.Description = "";
        //            $scope.checkAudio = false;
        //            $scope.checkIMage = false;
        //            $scope.Frequency = null;
        //            $scope.AudioFor = null;
        //        }
        //        else {
        //            alert("Please select correct Image/Audio file!!");
        //        }
        //    }
        //    else {
        //        alert("Please fill all mandatary fields!!");
        //    }

        //}




        /*This method is used to UPLOAD FILE.*/
        $scope.uploadFile = function () {
            var file = $scope.dummyArray[0];
            console.log('file is ');
            console.dir(file);

            var uploadUrl = apiUrl + "crmProducts.php";
            var text = $scope.dummyArray[0].name;
            $scope.uploadFileToUrl(file, uploadUrl, text);
        };



        $scope.uploadFileToUrl = function (file, uploadUrl, name) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('name', name);

            CommonService.postData(apiUrl + "crmProducts.php", fd)
                  .then(function (addUpdateProduct) {
                      if (addUpdateProduct.error == false) {
                          if (vm.formData.operationType == "updateProduct") {
                              $scope.message = "Product updated sucessfully";
                          }
                          else {
                              $scope.message = "Product added sucessfully";
                          }
                          parseData(addUpdateProduct);
                      }
                  });


            //$http.post(uploadUrl, fd, {
            //    transformRequest: angular.identity,
            //    headers: { 'Content-Type': undefined, 'Process-Data': false }
            //})
            //.success(function () {
            //    console.log("Success");
            //})
            //.error(function () {
            //    console.log("Success");
            //});
        }

        /*This method is callback when we are dealing with asynchronus http calls.*/
        function parseProductInformatioData(response) {
            vm.formData = _.extend(vm.formData, response.data[0]);
            $scope.buttonText = "Update Product";
            $scope.dataLoading = false;
        }

        $scope.resetFormToAddProduct = function () {
            $scope.buttonText = "Add Product";
            vm.formData = {};
            defaultParamSetup();
        };

        /*This method is used set up the Grid on Page Load Event.*/
        function parseData(response) {

            $scope.gridOptions.data = response.data;

            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
            };

            $scope.gridOptions.columnDefs = [
                                { field: 'name' },
                                { field: 'keywords' },
                                { field: 'price' },
                                { field: 'active' },
                                {
                                    field: 'action',
                                    cellTemplate: '<button class="btn btn-info btn-circle btn-align-left" ng-click="grid.appScope.editProduct(row.entity.id)"><i class="fa fa-check"></i></button> <button class="btn btn-warning btn-circle" ng-click="grid.appScope.toggleModal(row.entity.id)"><i class="fa fa-times"></i></button>'
                                }
            ];

            $scope.dataLoading = false;
            $scope.resetFormToAddProduct();
        }

        $scope.addUpdateProduct = function () {
            // $scope.uploadFile();
            var file = $scope.dummyArray[0];
            console.log('file is ');
           console.dir(file);

           // var uploadUrl = apiUrl + "crmProducts.php";
            var text = $scope.dummyArray[0].name;
           console.log('name of file  ' + name);
           vm.formData.product_image = text;
           console.log(vm.formData.product_image);

           vm.formData.files = file;
            // vm.formData.append('name', name);

           
            CommonService.showHideImage($scope);

            if (vm.formData.id) {
                vm.formData.operationType = "updateProduct";
            }
            else {
                vm.formData.operationType = "set";
            }

            if (vm.formData.password) {
                vm.formData.password = Base64Service.encode(vm.formData.password);
            }

           /* CommonService.postData(apiUrl+"crmProducts.php",vm.formData)
                    .then(function (addUpdateProduct) {
                        if (addUpdateProduct.error == false) {
                            if (vm.formData.operationType == "updateProduct") {
                                $scope.message = "Product updated sucessfully";
                            }
                            else {
                                $scope.message = "Product added sucessfully";
                            }
                            parseData(addUpdateProduct);
                        }
                    });*/



            $http.post(apiUrl + "crmProducts.php", vm.formData,
           {
               transformRequest: angular.identity,
               headers: { 'Content-Type': undefined, 'Process-Data': false }
           }).success(function (response) {
               //alert(response);
               //$scope.select();
           });


        };




        
       
   




        CommonService.postData(apiUrl + "crmProducts.php", vm.formData)
            .then(function (crmProductData) {
                if (crmProductData.error == false) {
                    parseData(crmProductData);
                }
            });

        $scope.commonService = CommonService;
        $scope.scope = $scope;
    }

})();
