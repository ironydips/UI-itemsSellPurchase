'use strict';

function SalesPurchaseSubPanelController($state) {
	var ctrl = this;
}

angular.module('salesPurchaseSubPanel')
.component('salesPurchaseSubPanel',{
	templateUrl: 'salesPurchase/salesPurchase-sub-panel/salesPurchase-sub-panel.template.html',
	controller:['$state', SalesPurchaseSubPanelController]
});