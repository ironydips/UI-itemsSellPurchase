'use strict';

function viewFullOrderPopUp(details) {

    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'viewFullOrderModal',
        windowClass: 'app-modal-window-large',
        keyboard: false,
        resolve: {
            details: function() {
                return (details || {});
            }
        },
        backdrop: 'static'
    });

    modalInstance.result.then(function(data) {
            //data passed when pop up closed.
            //if (data && data.action == "update");

        }),
        function(err) {
            console.log('Error in customer profile Modal');
            console.log(err);
        }
}

function OrderDetailController($state, $http, $uibModal) {
    var ctrl = this;
    ctrl.$uibModal = $uibModal;
    ctrl.$state = $state;

    ctrl.showOrders = function(todayDate, fromDate) {

        $http({

            url: "order/getAllOrders?fromDate=" + fromDate + "&toDate=" + todayDate,

            method: "GET"
        }).then(function(response) {
            ctrl.orders = response.data.result.message[0];
        }).catch(function(err) {
            console.log("error while getting orders:");
            console.log(err);
        })
    };

    ctrl.viewFullOrderModal = function(order) {

        angular.bind(ctrl, viewFullOrderPopUp, order)();
    }
}

angular.module('orderDetail')
    .component('orderDetail', {
        templateUrl: 'orderDetails/order-detail/order-detail.template.html',
        controller: ['$state', '$http','$uibModal', OrderDetailController]
    });
