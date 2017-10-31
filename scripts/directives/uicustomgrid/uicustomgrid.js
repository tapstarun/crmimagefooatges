'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:uiGrid
 * @description
 * # uiGridDirective
 */
angular.module('imageCrmApp')
	.directive('uiCustomGrid',function(){
		return {
					templateUrl : 'scripts/directives/uicustomgrid/gridTemplate.html',
					restrict: 'AEC',
					scope: {
					  options : '=',
					},
					link: function(scope, element, attrs) {				

						scope.gridOptions = {
	            			enableRowHeaderSelection  : scope.options.enableRowHeaderSelection ? scope.options.enableRowHeaderSelection : false,
	            			enableCellEdit	: scope.options.enableCellEdit ? scope.options.enableCellEdit : false,
							enableSorting   : scope.options.enableSorting ? scope.options.enableSorting : false,
							columnDefs: scope.options.colDef
						};

						scope.$watch("options",function(newValue,oldValue) {
					        scope.gridOptions = {
	            				data: scope.options.data, //private scoped from options : '=',
							};
					    });
					}
			}
	});


