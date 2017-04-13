(function(angular) {
'use strict';

function SalesPurchaseCheckoutController($state,$scope, checkoutService) {
	var ctrl = this;
	ctrl.collapse = false;
	ctrl.secondCollapse = true;
	ctrl.ThirdCollapse = true;
	ctrl.getItems = checkoutService.getAddedItems();
	console.log(ctrl.getItems)
	ctrl.details = {};

	ctrl.names = ['A', 'AB', 'B', 'BM', 
	'BN', 'CY', 'CU', 'CM', 'DB', 
	'FI', 'HW', 'OP', 'GH'];

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
	ctrl.editPayment = function(name, mobileNum, address){
		ctrl.userName = name;
		ctrl.mobileNum = mobileNum;
		ctrl.address = address;

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
		templateUrl: 'purchase/purchase-checkout-details/purchase-checkout-details.template.html',
		controller:['$state','$scope','checkoutService', SalesPurchaseCheckoutController]
	});
})(window.angular);