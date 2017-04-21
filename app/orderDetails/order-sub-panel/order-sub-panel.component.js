(function(angular) {

'use strict';

function OrderSubPanelController($state) {
	var ctrl = this;
}

angular.module('orderSubPanel')
.component('orderSubPanel',{
	templateUrl: 'orderDetails/order-sub-panel/order-sub-panel.template.html',
	controller:['$state', OrderSubPanelController]
});

})(window.angular);