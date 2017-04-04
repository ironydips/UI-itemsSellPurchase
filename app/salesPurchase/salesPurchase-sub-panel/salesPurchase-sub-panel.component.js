'use strict';

function SalesPurchaseSubPanelController($state) {
	var ctrl = this;
	ctrl.selectedItem = {};
	ctrl.itemArr = [];
	
	ctrl.setBtnValue = function(value){
		ctrl.valueSet = value;
	};	

	ctrl.quickAdd = function(brand, price,qty){
		
		var obj = {
			"brand" : brand,
			"price": price,
			"qty" : qty,
			"size" : ctrl.valueSet
		}
		console.log(obj)
		ctrl.selectedItem = {};

		// if (ctrl.itemArr.indexOf(obj) == -1) {
		// 	ctrl.itemArr.push(obj);
		//    console.log(ctrl.itemArr)
		//    var index = arr.indexOf(item);
		// console.log(index)
		// }
		
	}
}

angular.module('salesPurchaseSubPanel')
.component('salesPurchaseSubPanel',{
	templateUrl: 'salesPurchase/salesPurchase-sub-panel/salesPurchase-sub-panel.template.html',
	controller:['$state', SalesPurchaseSubPanelController]
});