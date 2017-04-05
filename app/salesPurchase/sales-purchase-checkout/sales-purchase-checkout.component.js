(function(angular) {
'use strict';

function SalesPurchaseCheckoutController($state, checkoutService) {
	var ctrl = this;
	console.log(checkoutService.getAddedItems())
}

angular.module('salesPurchaseCheckout')
	.component('salesPurchaseCheckout',{
		templateUrl: 'salesPurchase/sales-purchase-checkout/sales-purchase-checkout.template.html',
		controller:['$state','checkoutService', SalesPurchaseCheckoutController]
	});
})(window.angular);