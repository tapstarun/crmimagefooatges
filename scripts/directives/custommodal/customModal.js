'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
    .directive('modalDialog',function(){
        return {
                    templateUrl : 'scripts/directives/custommodal/customModal.html',
                    scope: {
                      show: '='
                    },
                    replace: true, // Replace with the template below
                    transclude: true, // we want to insert custom content inside the directive
                    link: function(scope, element, attrs) {
                      scope.dialogStyle = {};
                      if (attrs.width)
                        scope.dialogStyle.width = attrs.width;
                      if (attrs.height)
                        scope.dialogStyle.height = attrs.height;
                      scope.hideModal = function() {
                        scope.show = false;
                      };
                    }
            }
    });


