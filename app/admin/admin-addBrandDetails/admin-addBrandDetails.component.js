(function(angular) {

    'use strict';
    var baseURL = "http://52.58.120.159:3011/api/";

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

                    // popUpCtrl.showBrand(data.getBrand);
                    popUpCtrl.init();

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

                    // popUpCtrl.showVarient(data.brandObj, data.getVarient);
                    popUpCtrl.init();
                }

            }),
            function(err) {
                console.log('Error in add-brand Modal');
                console.log(err);
            }
    }

    function AdminAddBrandController($state, $http, $uibModal, moveItemToSaleService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.brandArr = [];

        ctrl.init = function() {

            $http({
                    url: baseURL + "admin/getBrandInfo",
                    method: "GET",

                }).then(function(response) {
                    ctrl.brandArr = response.data.result.message;
                })
                .catch(function(error) {

                });
        }

        ctrl.addBrand = function() {
            angular.bind(ctrl, openAddBrandPopUp, null)();
        }
        ctrl.showBrand = function(brand) {

            ctrl.brandArr.push({ "brandName": brand, "varients": [] });

        };
        ctrl.showVarient = function(item, varient) {
            console.log(item, varient);
            item.varients.push(varient);

        };

        ctrl.setBrandDetails = function(brandName, item) {


            angular.bind(ctrl, openBrandDetailPopUp, item)();
        }
        ctrl.moveToSale = function() {
            moveItemToSaleService.addItemsToSale(ctrl.brandArr);
        }

        ctrl.init();
    }

    angular.module('adminAddBrandDetails')
        .component('adminAddBrandDetails', {
            templateUrl: 'admin/admin-addBrandDetails/admin-addBrandDetails.template.html',
            controller: ['$state', '$http', '$uibModal', 'moveItemToSaleService', AdminAddBrandController]
        });

})(window.angular);
