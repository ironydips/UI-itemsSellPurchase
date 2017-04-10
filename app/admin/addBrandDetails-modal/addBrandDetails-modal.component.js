(function(angular) {


    'use strict';

    function AddBrandDetailsController($state) {
        var ctrl = this;
        ctrl.brand = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.save = function(varient) {

            ctrl.modalInstance.close({ action: 'update', brandObj: ctrl.brand, getVarient: varient });
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
    }

    angular.module('addBrandDetails')
        .component('addBrandDetails', {
            templateUrl: 'admin/addBrandDetails-modal/addBrandDetails-modal.template.html',
            controller: ['$state', AddBrandDetailsController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
