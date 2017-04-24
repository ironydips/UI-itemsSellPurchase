(function(angular) {
    'use strict';

    function ViewFullOrderModalController($state, $http) {
        var ctrl = this;
        ctrl.orderDetails = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.init = function() {

            ctrl.showAddress = false;
            ctrl.showPhone = false;

            var data = {
                orderID: ctrl.orderDetails.orderID,
                isPurchaser: ctrl.orderDetails.isPurchaser
            }

            $http({
                    url: "order/getOrderDetails",
                    method: "POST",
                    data: JSON.stringify(data),


                }).then(function(response) {

                    ctrl.placedOrderDetail = response.data.result.message[0];
                    if(ctrl.placedOrderDetail.purchaser_info[0].address){
                        ctrl.showAddress= true;
                    }
                    switch (ctrl.placedOrderDetail.purchaser_info[0].phone) {
                        case 0:
                            ctrl.purchaserNumber1 = "";
                            ctrl.purchaserNumber2 = "";
                            ctrl.showPhone = false;
                            break;
                        case 1:
                            ctrl.purchaserNumber1 = item.profile.phone[0];
                            ctrl.purchaserNumber2 = "";
                            ctrl.showPhone = true;
                            break;
                        case 2:
                            ctrl.purchaserNumber1 = item.profile.phone[0] + ",";
                            ctrl.purchaserNumber2 = item.profile.phone[1];
                            ctrl.showPhone = true;
                            
                            break;

                    }
                })
                .catch(function(error) {

                });


        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('viewFullOrderModal')
        .component('viewFullOrderModal', {
            templateUrl: 'commonModals/viewFull-order-modal/viewFull-order-modal.template.html',
            controller: ['$state', '$http', ViewFullOrderModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
