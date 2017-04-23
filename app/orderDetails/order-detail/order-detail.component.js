'use strict';

function OrderDetailController($state, $http) {
    var ctrl = this;

    ctrl.showOrders = function(todayDate, fromDate) {

    	$http({

    		url: "order/getAllOrders?fromDate=" + fromDate +"&toDate=" + todayDate,

    		method: "GET"
    	}).then(function(response){
    		ctrl.orders = response.data.result.message[0];
    	}).catch(function(err){
    		console.log("error while getting orders:");
    		console.log(err);
    	})
    }
}

angular.module('orderDetail')
    .component('orderDetail', {
        templateUrl: 'orderDetails/order-detail/order-detail.template.html',
        controller: ['$state','$http', OrderDetailController]
    });
