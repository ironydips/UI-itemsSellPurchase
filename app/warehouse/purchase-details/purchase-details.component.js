'use strict';

function newSellerPopup(details) {
    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'newPurchaserModal',
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
                popUpCtrl.onSelectCallback(data)

            }
        }),
        function(err) {
            console.log('Error in new-Purchase detail modal');
            console.log(err);
        }
}

/*jshint validthis: true */
function viewFullOrderPopUp(details) {

    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
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
            debugger;
            if (data && data.action == 'update') {
                debugger;
                popUpCtrl.$state.reload();
            };

        }),
        function(err) {
            console.log('Error in view-Full-Order-Modal');
            console.log(err);
        }
}

function PurchaseDetailController($rootScope, $scope, $state, $uibModal, $http, $timeout, ngToast, checkoutService, moveItemToSaleService) {
    var ctrl = this;

    ctrl.init = function() {
        debugger;

        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.itemArr = [];
        ctrl.displayCartBtn = true;

        ctrl.initValues();
        var totalSum = 0;

        $http({
            url: "purchaser/getPurchasingRelatedInfo",
            method: "GET",
        }).then(function(response) {
            if (response.data && response.data.result && response.data.result.message) {
                ctrl.productDetails = response.data.result.message.warehouseItems;
                ctrl.purchaseDetails = response.data.result.message.purchaserInfo;
            }
        }).catch(function(err) {
            console.log("error while getting data in get purchaser info");
            console.log(err);
        })


        // ES5 style property definition.
        Object.defineProperty(ctrl, 'amtPaid', {
            get() {
                return parseFloat(ctrl.paidByShop) + parseFloat(ctrl.paidByPrateek) + parseFloat(ctrl.paidByBharat);
            }
        });

        Object.defineProperty(ctrl, 'totalAmt', {
            get() {
                return parseFloat(ctrl.totalBill) + parseFloat(ctrl.purchaserPrevBal);
            }
        });

        Object.defineProperty(ctrl, 'currentBal', {
            get() {
                return parseFloat(ctrl.totalAmt) - parseFloat(ctrl.amtPaid);
            }
        });

    };

    ctrl.initValues = function() {
        ctrl.itemCount = 0;
        ctrl.productArr = [];
        ctrl.purchaseDetail = {};
        ctrl.productDetail = {};
        ctrl.totalBill = 0;
        ctrl.purchaserPrevBal = 0;
        ctrl.paidByShop = 0;
        ctrl.paidByPrateek = 0;
        ctrl.paidByBharat = 0;
        ctrl.price = 0;
        ctrl.qty = 0;
        ctrl.disablePlaceOrder = true;
        ctrl.purchaserName = "";
        ctrl.purchaserAddress = "";
        ctrl.purchaserNumber1 = "";
        ctrl.purchaserNumber2 = "";
        ctrl.showPhone = false;
        ctrl.showName = false;
        ctrl.showAddress = false;

    }

    ctrl.addProduct = function(seller, price, quantity) {

        ctrl.totalPrice = parseInt(quantity) * parseInt(price);
        ctrl.SelectedItem.price = price;
        ctrl.SelectedItem.quantity = quantity;
        ctrl.SelectedItem.totalPrice = ctrl.totalPrice;
        ctrl.items = angular.copy(ctrl.SelectedItem)
        ctrl.productArr.push(ctrl.items);
        ctrl.price = 0;
        ctrl.qty = 0;
        ctrl.productDetail = {};
        ctrl.totalBill = ctrl.totalBill + ctrl.totalPrice;

    };

    ctrl.deleteProduct = function(pdt) {

        ctrl.totalBill = ctrl.totalBill - pdt.totalPrice;
        ctrl.productArr.splice(ctrl.productArr.indexOf(pdt), 1)
    }

    ctrl.onSelectCallback = function(item, model) {

        ctrl.disablePlaceOrder = false;

        switch (item.profile.phone.length) {
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
                ctrl.purchaserNumber1 = item.profile.phone[0];
                ctrl.purchaserNumber2 = item.profile.phone[1];
                ctrl.showPhone = true;
                break;

        }
        if (item.profile.name != "") {
            ctrl.purchaserName = item.profile.name;
            ctrl.showName = true;
        }
        if (item.profile.address != "") {
            ctrl.purchaserAddress = item.profile.address;
            ctrl.showAddress = true;
        }

        ctrl.purchaserPrevBal = item.balance || 0;
        ctrl.purchaserID = item._id;

    };

    ctrl.newPurchaser = function() {
        angular.bind(ctrl, newSellerPopup, null)();
    };

    ctrl.onSelectItem = function(item, model) {

        ctrl.SelectedItem = item;
    }

    ctrl.placeOrder = function() {

        ctrl.loader = true;

        ctrl.payment = {
            previousBalance: ctrl.purchaserPrevBal,
            totalAmount: ctrl.totalAmt,
            amountPaid: ctrl.amtPaid,
            currentBalance: ctrl.currentBal,
            paidByShop: ctrl.paidByShop,
            paidByPrateek: ctrl.paidByPrateek,
            paidByBharat: ctrl.paidByBharat
        }
        var obj = {
            purchaser: { id: ctrl.purchaserID, name: ctrl.purchaserName },
            Items: ctrl.productArr,
            payment: ctrl.payment
        }

        $http({
                url: "purchaser/placeOrder",
                method: "POST",
                data: JSON.stringify(obj),
                dataType: JSON

            }).then(function(response) {
                ctrl.initValues();
                ctrl.orderDetail = response.data.result.message;
                ctrl.loader = false;
                angular.bind(ctrl, viewFullOrderPopUp, ctrl.orderDetail)();
                ngToast.create({

                    className: 'success',
                    horizontalPosition: 'center',
                    dismissButton: true,
                    timeout: 1200,
                    content: '<h4>Order Placed Successfully</h4>'
                });

            })
            .catch(function(error) {
                ngToast.create({

                    className: 'warning',
                    horizontalPosition: 'center',
                    dismissButton: true,
                    timeout: 1200,
                    content: '<h4>Error while placing order</h4>'
                });
                console.log("Error while placing order:")
                console.log(error)
            })

    }

    ctrl.init();
}

angular.module('purchaseDetail')
    .component('purchaseDetail', {
        templateUrl: 'warehouse/purchase-details/purchase-details.template.html',
        controller: ['$rootScope', '$scope', '$state', '$uibModal', '$http', '$timeout', 'ngToast', 'checkoutService', 'moveItemToSaleService', PurchaseDetailController]
    });
