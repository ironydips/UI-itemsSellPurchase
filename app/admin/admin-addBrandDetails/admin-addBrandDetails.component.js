(function(angular) {

    'use strict';

    

    

//--------------------------------Controller Start------------------------------------

    function AdminAddBrandController($state, $http, $uibModal, moveItemToSaleService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.brandArr = [];

        ctrl.init = function() {

            $http({
                    url: "admin/getBrandInfo",
                    method: "GET",

                }).then(function(response) {
                    ctrl.brandArr = response.data.result.message;
                })
                .catch(function(error) {

                });
        }

        ctrl.addBrand = function() {

            ctrl.openAddBrandPopUp(null);
        }
        ctrl.showBrand = function(brand) {

            ctrl.brandArr.push({ "brandName": brand, "varients": [] });

        };
        ctrl.showVarient = function(item, varient) {

            item.varients.push(varient);

        };

        ctrl.setBrandDetails = function(brandName, item) {

            ctrl.openBrandDetailPopUp(item);
        }
        ctrl.moveToSale = function() {
            moveItemToSaleService.addItemsToSale(ctrl.brandArr);
        }

        ctrl.init();

//--------------------------------Controller End------------------------------------


//--------------------------------Pop-UP Implementation Start-----------------------------

    ctrl.openAddBrandPopUp = function openAddBrandPopUp(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'addBrandModalComponent',
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

                    // popUpCtrl.showBrand(data.getBrand);
                    ctrl.init();

                }

            }),
            function(err) {
                console.log('Error in add-brand Modal');
                console.log(err);
            }
    };

    ctrl.openBrandDetailPopUp = function openBrandDetailPopUp(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'addBrandDetailsComponent',
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

                    // popUpCtrl.showVarient(data.brandObj, data.getVarient);
                    ctrl.init();
                }

            }),
            function(err) {
                console.log('Error in add-brand Modal');
                console.log(err);
            }
    }


//--------------------------------Pop-UP Implementation End-----------------------------

    }

    angular.module('adminBrandDetailsModule')
        .component('adminAddBrandDetailsComponent', {
            templateUrl: 'admin/admin-addBrandDetails/admin-addBrandDetails.template.html',
            controller: ['$state', '$http', '$uibModal', 'moveItemToSaleService', AdminAddBrandController]
        });

})(window.angular);
