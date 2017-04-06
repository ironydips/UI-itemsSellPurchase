(function(angular) {
'use strict';

function SalesPurchaseCheckoutController($state, checkoutService) {
	var ctrl = this;
	ctrl.collapse = false;
	ctrl.secondCollapse = true;
	ctrl.ThirdCollapse = true;
	ctrl.getItems = checkoutService.getAddedItems();
	console.log(checkoutService.getAddedItems())

	ctrl.openGenrlInfo = function(){
		ctrl.collapse = true;
		ctrl.secondCollapse = false;
		ctrl.ThirdCollapse = true;
	};
	ctrl.editSelectedItem = function(){
		ctrl.collapse = false;
		ctrl.secondCollapse = true;
		ctrl.ThirdCollapse = true;
	};
	ctrl.editPayment = function(){
		ctrl.collapse = true;
		ctrl.secondCollapse = true;
		ctrl.ThirdCollapse = false;
	};
	ctrl.deleteItem = function (item) {
        ctrl.getItems.splice(ctrl.getItems.indexOf(item), 1);
    }
}

angular.module('salesPurchaseCheckout')
	.component('salesPurchaseCheckout',{
		templateUrl: 'salesPurchase/sales-purchase-checkout/sales-purchase-checkout.template.html',
		controller:['$state','checkoutService', SalesPurchaseCheckoutController]
	});
})(window.angular);