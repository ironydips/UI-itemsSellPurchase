(function(angular) {
	"use strict";

	angular.module('sellPurchaseApp.commonModule')
		.filter('YesNo', function(){
			return function(value){
				return value ? 'YES' : 'NO';
			}
		});
		
})(window.angular)