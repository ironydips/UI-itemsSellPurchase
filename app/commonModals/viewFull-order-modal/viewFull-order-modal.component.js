(function(angular) {
        'use strict';

        //-------------------CONTROLLER START------------------------------------------
        function ViewFullOrderModalController($state, $http, $uibModal) {
            var ctrl = this;

            ctrl.init = function() {

                ctrl.$uibModal = $uibModal;
                ctrl.$state = $state;
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
                            ctrl.placedOrderDetail.billAmt = ctrl.placedOrderDetail.totalAmount - ctrl.placedOrderDetail.previousBalance;
                            console.log(ctrl.placedOrderDetail)
                            ctrl.placedOrderDetail.order_items.forEach(function(data) {
                            data.productInfo = data.brandName +"-"+data.variantName;
                            data.totalPrice = data.price * data.quantity;
                        });
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
                        } else {
                            debugger;
                        }

                    })
                    .catch(function(error) {

                    });


            };

            ctrl.cancelBtn = function() {

                ctrl.modalInstance.close({ action: 'update' });
            };

            ctrl.edit = function(items) {
                console.log(items)

                ctrl.editPopUP(angular.copy(items));
            }

            ctrl.init();

            //----------------------CONTROLLER END--------------------------------------------

            //-----------------------POP UP IMPLEMENTATION START------------------------------

            ctrl.editPopUP = function(details) {

                var modalInstance = ctrl.$uibModal.open({
                    component: 'editOrderModalComponent',
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
                        console.log('Error in edit-OrderDetail-Modal');
                        console.log(err);
                    }
            }

        //-----------------------POP UP IMPLEMENTATION END---------------------------------


    }

    angular.module('viewFullOrderModal')
    .component('viewFullOrderModal', {
        templateUrl: 'commonModals/viewFull-order-modal/viewFull-order-modal.template.html',
        controller: ['$state', '$http','$uibModal', ViewFullOrderModalController],
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });
})(window.angular);
