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
            console.log('Error in view-Full-Order-Modal');
            console.log(err);
        }
}

function OrderDetailController($state, $http, $timeout, $uibModal) {
    var ctrl = this;


    ctrl.init = function() {

        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.noDataMsg = false;
        var date;
        var d = new Date();
        var month = (d.getMonth() + 1);
        var day = d.getDate();
        var year = d.getFullYear();

        if (month < 10) {
            date = year + "-" + "0" + month + "-" + day;
        } else {
            date = year + "-" + month + "-" + day;
        }

        ctrl.fromDate = date;
        ctrl.todayDate = date;
        ctrl.showOrders(date, date);
    }

    ctrl.showOrders = function(todayDate, fromDate) {

        ctrl.loader = true;

        $http({

            url: "order/getAllOrders?fromDate=" + fromDate + "&toDate=" + todayDate,

            method: "GET"
        }).then(function(response) {
            if (response.data.result.message[0].length == 0) {
                ctrl.noDataMsg = true;

                $timeout(function() {
                    ctrl.loader = false;
                }, 500);

            }
            ctrl.orders = response.data.result.message[0];
            if(ctrl.orders){
                ctrl.orders.forEach(function(data){
                    data.date = new Date(data.date);
                });
            }
            $timeout(function() {
                ctrl.loader = false;
            }, 500);
            
        }).catch(function(err) {
            console.log("error while getting orders:");
            console.log(err);
        })
    };

    ctrl.viewFullOrderModal = function(order) {

        angular.bind(ctrl, viewFullOrderPopUp, order.orderID)();
    };

    ctrl.init();
}

angular.module('orderDetail')
    .component('orderDetail', {
        templateUrl: 'orderDetails/order-detail/order-detail.template.html',
        controller: ['$state', '$http', '$timeout', '$uibModal', OrderDetailController]
    });
