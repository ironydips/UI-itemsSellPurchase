(function(angular) {
'use strict';

function SalesPurchaseController($state, $uibModal, DriverService) {
	var ctrl = this;
}

angular.module('salesPurchase')
	.component('salesPurchase',{
		templateUrl: 'salesPurchase/salesPurchase.template.html',
		controller:['$state', SalesPurchaseController]
	});
})(window.angular);