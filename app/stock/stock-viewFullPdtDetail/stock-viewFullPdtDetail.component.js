(function(angular) {
    'use strict';

    function ViewFullPdtDetailController($state, $http, $uibModal) {
        var ctrl = this;
        ctrl.init = function() {
            ctrl.$state = $state;
            ctrl.$uibModal = $uibModal;
            ctrl.stockDetail = (ctrl.resolve && ctrl.resolve.stockDetails) || {};
            ctrl.itemDetail = ctrl.resolve && ctrl.resolve.itemDetail;
        };

        ctrl.viewFullOrderModal = function(order) {

            ctrl.viewFullOrderPopUp(order);
        };

        ctrl.cancel = function() {

            ctrl.modalInstance.close({ action: "update" });
        };

        ctrl.init();

        ctrl.viewFullOrderPopUp = function(details) {

            var modalInstance = ctrl.$uibModal.open({
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
    }

    angular.module('viewFullPdtDetail')
        .component('viewFullPdtDetail', {
            templateUrl: 'stock/stock-viewFullPdtDetail/stock-viewFullPdtDetail.template.html',
            controller: ['$state', '$http', '$uibModal', ViewFullPdtDetailController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
