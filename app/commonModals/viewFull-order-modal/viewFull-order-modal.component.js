(function(angular) {
    'use strict';

    function ViewFullOrderModalController($state, $http) {
        var ctrl = this;
        
        ctrl.init = function() {

            ctrl.orderID = (ctrl.resolve && ctrl.resolve.details) || {};
            ctrl.showAddress = false;
            ctrl.showPhone = false;

            var data = {
                orderID: ctrl.orderID,
                isPurchaser: true
            }

            $http({
                    url: "order/getOrderDetails",
                    method: "POST",
                    data: JSON.stringify(data),


                }).then(function(response) {
                    if (response.data.result.message.length >= 0) {
                        ctrl.placedOrderDetail = response.data.result.message[0];
                        if (ctrl.placedOrderDetail.purchaser_info[0].profile.address) {
                            ctrl.showAddress = true;
                        }
                        switch (ctrl.placedOrderDetail.purchaser_info[0].profile.phone.length) {
                            case 0:
                                ctrl.purchaserNumber1 = "";
                                ctrl.purchaserNumber2 = "";
                                ctrl.showPhone = false;
                                break;
                            case 1:
                                ctrl.purchaserNumber1 = ctrl.placedOrderDetail.purchaser_info[0].profile.phone[0];
                                ctrl.purchaserNumber2 = "";
                                ctrl.showPhone = true;
                                break;
                            case 2:
                                ctrl.purchaserNumber1 = ctrl.placedOrderDetail.purchaser_info[0].profile.phone[0] + ",";
                                ctrl.purchaserNumber2 = ctrl.placedOrderDetail.purchaser_info[0].profile.phone[1];
                                ctrl.showPhone = true;

                                break;

                        }
                    }else{
                        debugger;
                    }

                })
                .catch(function(error) {

                });


        };

        ctrl.cancelBtn = function() {

            ctrl.modalInstance.close({ action: 'update'});
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
