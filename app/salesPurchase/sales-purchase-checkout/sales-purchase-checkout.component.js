(function(angular) {
'use strict';

function SalesPurchaseCheckoutController($state) {
	var ctrl = this;
}

angular.module('salesPurchaseCheckout')
	.component('salesPurchaseCheckout',{
		templateUrl: 'salesPurchase/sales-purchase-checkout/sales-purchase-checkout.template.html',
		controller:['$state', SalesPurchaseCheckoutController]
	});
})(window.angular);