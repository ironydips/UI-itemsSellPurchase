'use strict';
var baseURL = "http://52.58.120.159:3011/api/";

function popup(details) {
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

function PurchaseDetailController($rootScope, $scope, $uibModal, $state, $http, $timeout, checkoutService, moveItemToSaleService) {
    var ctrl = this;
    ctrl.$uibModal = $uibModal;
    ctrl.$state = $state;
    ctrl.itemArr = [];
    ctrl.displayCartBtn = true;
    ctrl.itemCount = 0;

    ctrl.init = function() {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // $timeout(function(){
            //     isDirty = ctrl.purchaseform.$dirty;

            //   });

            var isDirty = ctrl.purchaseform.$dirty;

            if (isDirty && toState.name != 'warehouse.checkout') {
                var isConfirm = confirm('You have unsaved changes, go back?');

                if (!isConfirm) {
                    event.preventDefault();
                }

                //angular.bind(ctrl, popup, null)();
            }
        });


        $http({
                url: baseURL + "admin/getBrandInfo",
                method: "GET",

            }).then(function(response) {
                ctrl.getItemDetails = response.data.result.message;
            })
            .catch(function(error) {

            });
    }

    ctrl.addToCart = function(item) {

        item.enableUpdate = false;

        for (var i = 0; i < item.variants.length; i++) {

            if (item.variants[i].price == undefined && item.variants[i].quantity == undefined) {
                ctrl.itemCount = ctrl.itemArr.length;
            } else {

                ctrl.loader = true;
                item.variants[i].totalPrice = parseInt(item.variants[i].quantity) * parseInt(item.variants[i].price);
                if (ctrl.itemArr.length <= 0) {

                    ctrl.itemArr.push(item);
                    item.enableUpdate = true;
                    console.log(ctrl.itemArr);
                    ctrl.itemCount = ctrl.itemArr.length;

                } else {

                    var itemSet = ctrl.itemArr.filter(function(el) {
                        return (el.brandName === item.brandName);

                    });
                    if (itemSet.length == 0) {
                        ctrl.itemArr.push(item);
                        item.enableUpdate = true;
                        ctrl.itemCount = ctrl.itemArr.length;
                        //checkoutService.addItems(ctrl.itemArr);
                        console.log(ctrl.itemArr);
                    } else {
                        item.enableUpdate = true;
                        console.log(ctrl.itemArr)
                    }
                };

                var countUp = function() {
                    ctrl.loader = false;

                }
                $timeout(countUp, 1000);
            }
        }
    };

    ctrl.checkout = function() {

        // for (var i = 0; i < ctrl.itemArr.length; i++) {
        //     for (var j = 0; j < ctrl.itemArr[i].variants.length; j++) {
        //         console.log(ctrl.itemArr[i].variants[j].totalPrice)
        //         if (ctrl.itemArr[i].variants[j].price == undefined || ctrl.itemArr[i].variants[j].price == undefined) {
        //             console.log(ctrl.itemArr[i].variants[j])
        //         }
        //         if (ctrl.itemArr[i].variants[j].price == undefined && ctrl.itemArr[i].variants[j].price == undefined) {
        //             console.log(ctrl.itemArr[i].variants[j])
        //         }
        //     }
        // }

        checkoutService.addItems(ctrl.itemArr);
        $state.go('warehouse.checkout');
    }


    ctrl.init();
}

angular.module('purchaseDetail')
    .component('purchaseDetail', {
        templateUrl: 'warehouse/purchase-details/purchase-details.template.html',
        controller: ['$rootScope', '$scope', '$uibModal', '$state', '$http', '$timeout', 'checkoutService', 'moveItemToSaleService', PurchaseDetailController]
    });
