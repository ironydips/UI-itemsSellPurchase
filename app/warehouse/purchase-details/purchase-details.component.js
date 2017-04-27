'use strict';

//------------------------------Controller Start----------------------------------
function PurchaseDetailController($rootScope, $scope, $location, $anchorScroll, $state, $uibModal, $http, $timeout, ngToast, checkoutService, moveItemToSaleService) {
    var ctrl = this;

    ctrl.init = function() {

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
                return parseFloat(ctrl.totalBill) + parseFloat(ctrl.selectedPurchaser.balance);
            },
            set(val){
                console.log(val)
            }
        });

        Object.defineProperty(ctrl, 'currentBal', {
            get() {
                return parseFloat(ctrl.totalAmt) - parseFloat(ctrl.amtPaid);
            }
        });

        Object.defineProperty(ctrl, 'totalBill', {
            get(){
                return ctrl.productArr.reduce(function(accumulator, value){
                    return accumulator + value.totalPrice
                }, 0);
            }
        });
    };

    ctrl.initValues = function() {
        ctrl.itemCount = 0;
        ctrl.productArr = [];
        ctrl.productDetail = {};
        ctrl.paidByShop = 0;
        ctrl.paidByPrateek = 0;
        ctrl.paidByBharat = 0;
        ctrl.selectedPurchaser = { balance: 0, profile: { name: '' } };
        ctrl.selectedProduct = {productInfo: '', price: 0, qty: 0 };
    };

    ctrl.addProduct = function() {

        ctrl.selectedProduct.totalPrice = ctrl.selectedProduct.price * ctrl.selectedProduct.qty;
        
        //delete existing product
        //ctrl.deleteProduct(ctrl.selectedProduct);

        // push to array
        ctrl.productArr.push(angular.copy(ctrl.selectedProduct));

        // initialise selected product
        ctrl.selectedProduct = {productInfo: '', price: 0, qty: 0 };
        

    };

    ctrl.deleteProduct = function(index) {
        // var productInfoArray = ctrl.productArr.map(function(data){
        //     return data.productInfo;
        // });

        // if(productInfoArray.indexOf(product.productInfo) > -1){
        //     ctrl.productArr.splice(productInfoArray.indexOf(product.productInfo), 1)
        // }

        ctrl.productArr.splice(index, 1);
    };

    ctrl.editProduct = function(index) {

        // assign to selected product
        ctrl.selectedProduct = angular.copy(ctrl.productArr[index]);

        //remove from existing array.
        ctrl.deleteProduct(index);
    }

    ctrl.onSelectCallback = function(item, model) {

        ctrl.selectedPurchaser = item;
    };

    ctrl.newPurchaser = function() {
        ctrl.newSellerPopup(ctrl.purchaseDetails);
    };

    ctrl.onSelectItem = function(item, model) {

        // Add 2 properties to selected item.
        item.qty = 0;
        item.price = 0;

        ctrl.selectedProduct = angular.copy(item);
    }

    ctrl.placeOrder = function() {

        ctrl.loader = true;

        ctrl.payment = {
            previousBalance: ctrl.selectedPurchaser.balance,
            totalAmount: ctrl.totalAmt,
            amountPaid: ctrl.amtPaid,
            currentBalance: ctrl.currentBal,
            paidByShop: ctrl.paidByShop,
            paidByPrateek: ctrl.paidByPrateek,
            paidByBharat: ctrl.paidByBharat
        }
        var obj = {
            purchaser: { id: ctrl.selectedPurchaser._id, name: ctrl.selectedPurchaser.profile.name },
            Items: ctrl.productArr,
            payment: ctrl.payment
        }
        debugger;
        $http({
                url: "purchaser/placeOrder",
                method: "POST",
                data: JSON.stringify(obj),
                dataType: JSON

            }).then(function(response) {
                ctrl.initValues();
                ctrl.orderDetail = response.data.result.message;
                ctrl.loader = false;
                ctrl.viewFullOrderPopUp(ctrl.orderDetail);
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

    };

    ctrl.init();

    //------------------ Pop-up implementations----------------------------------

    //Order Pop up
    ctrl.viewFullOrderPopUp = function viewFullOrderPopUp(details) {

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
                if (data && data.action == 'update') {
                    ctrl.$state.reload();
                };

            }),
            function(err) {
                console.log('Error in view-Full-Order-Modal');
                console.log(err);
            }
    }

    ctrl.viewAmtPaidModal = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'amountPaidModalComponent',
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
                // if (data && data.action == 'update') {
                //     ctrl.$state.reload();
                // };

            }),
            function(err) {
                console.log('Error in view-Full-Order-Modal');
                console.log(err);
            }
    }

    //New Seller Pop up
    ctrl.newSellerPopup = function newSellerPopup(details) {
        var modalInstance = ctrl.$uibModal.open({
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
                if (data && data.action == 'update' && data.profile) {
                    ctrl.purchaseDetails.push(data.profile);
                    ctrl.selectedPurchaser = data.profile;
                }
            }),
            function(err) {
                console.log('Error in new-Purchase detail modal');
                console.log(err);
            }
    }

}

//----------------------------Controller END ---------------------------------------


//----------------------------Module START-------------------------------------------
angular.module('purchaseDetail')
    .component('purchaseDetail', {
        templateUrl: 'warehouse/purchase-details/purchase-details.template.html',
        controller: ['$rootScope', '$scope', '$location', '$anchorScroll', '$state', '$uibModal', '$http', '$timeout', 'ngToast', 'checkoutService', 'moveItemToSaleService', PurchaseDetailController]
    });
//----------------------------Module END---------------------------------------------
