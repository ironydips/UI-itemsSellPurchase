(function(angular) {

    'use strict';

    function openAddBrandPopUp(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'addBrandModal',
            windowClass: 'app-modal-window-small',
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
                if (data && data.action == 'update') {

                    popUpCtrl.showBrand(data.getBrand);

                }

            }),
            function(err) {
                console.log('Error in add-brand Modal');
                console.log(err);
            }
    }

    function openBrandDetailPopUp(details) {
        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'addBrandDetails',
            windowClass: 'app-modal-window-small',
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
                if (data && data.action == 'update') {

                    popUpCtrl.showVarient(data.brandObj, data.getVarient);

                }

            }),
            function(err) {
                console.log('Error in add-brand Modal');
                console.log(err);
            }
    }

    function AdminAddBrandController($state, $uibModal, moveItemToSaleService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.brandArr = [];

        ctrl.addBrand = function() {
            angular.bind(ctrl, openAddBrandPopUp, null)();
        }
        ctrl.showBrand = function(brand) {

            ctrl.brandArr.push({ "brand": brand, "varients": [] });

        };
        ctrl.showVarient = function(item, varient) {

            item.varients.push(varient);

        };

        ctrl.setBrandDetails = function(brandName, item) {

            angular.bind(ctrl, openBrandDetailPopUp, item)();
        }
        ctrl.moveToSale = function(){
        	moveItemToSaleService.addItemsToSale(ctrl.brandArr);
        }
    }

    angular.module('adminAddBrandDetails')
        .component('adminAddBrandDetails', {
            templateUrl: 'admin/admin-addBrandDetails/admin-addBrandDetails.template.html',
            controller: ['$state', '$uibModal','moveItemToSaleService', AdminAddBrandController]
        });

})(window.angular);
