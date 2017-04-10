(function(angular) {


    'use strict';

    function AddBrandModalController($state) {
        var ctrl = this;
        ctrl.brand = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.save = function(brand) {
        	
            ctrl.modalInstance.close({ action: 'update', getBrand: brand });
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
    }

    angular.module('addBrandModal')
        .component('addBrandModal', {
            templateUrl: 'admin/addBrand-modal/addBrand-modal.template.html',
            controller: ['$state', AddBrandModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
