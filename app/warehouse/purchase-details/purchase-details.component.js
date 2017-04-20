'use strict';
var baseURL = "http://52.58.120.159:3011/api/";

function popupView(details) {
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
                console.log(data)
                popUpCtrl.onSelectCallback(data)

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
    ctrl.productArr = [];
    ctrl.purchaseDetail = {};
    ctrl.productDetail = {};
    ctrl.totalBill = 0;
    ctrl.totalAmt = 0;
    var totalSum = 0;


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
            }
        });

        $http({
            url: baseURL + "purchaser/getPurchasingRelatedInfo",
            method: "GET",
        }).then(function(response) {
            ctrl.productDetails = response.data.result.message.warehouseItems;
            ctrl.purchaseDetails = response.data.result.message.purchaserInfo;
        }).catch(function(err) {
            console.log("error while getting data in get purchaser info");
            console.log(err);
        })

    }

    $scope.$watch(angular.bind(ctrl, function() {
        return ctrl.paidByShop;
    }), function(value) {

        if (ctrl.paidByShop == undefined) {
            ctrl.paidByShop = 0;
        }
        if (ctrl.paidByPrateek == undefined) {
            ctrl.paidByPrateek = 0;
        }
        if (ctrl.paidByBharat == undefined) {
            ctrl.paidByBharat = 0;
        }

        sumOfPayies(ctrl.paidByShop, ctrl.paidByPrateek, ctrl.paidByBharat);
    });
    $scope.$watch(angular.bind(ctrl, function() {
        return ctrl.paidByPrateek;
    }), function(value) {
        if (ctrl.paidByShop == undefined) {
            ctrl.paidByShop = 0;
        }
        if (ctrl.paidByPrateek == undefined) {
            ctrl.paidByPrateek = 0;
        }
        if (ctrl.paidByBharat == undefined) {
            ctrl.paidByBharat = 0;
        }
        sumOfPayies(ctrl.paidByShop, ctrl.paidByPrateek, ctrl.paidByBharat);
    });
    $scope.$watch(angular.bind(ctrl, function() {
        return ctrl.paidByBharat;
    }), function(value) {
        if (ctrl.paidByShop == undefined) {
            ctrl.paidByShop = 0;
        }
        if (ctrl.paidByPrateek == undefined) {
            ctrl.paidByPrateek = 0;
        }
        if (ctrl.paidByBharat == undefined) {
            ctrl.paidByBharat = 0;
        }
        sumOfPayies(ctrl.paidByShop, ctrl.paidByPrateek, ctrl.paidByBharat);
    });



    ctrl.addProduct = function(seller, price, quantity) {

        
        console.log(ctrl.SelectedItem)


        ctrl.totalPrice = parseInt(quantity) * parseInt(price);
        ctrl.SelectedItem.price = price;
        ctrl.SelectedItem.quantity = quantity;
        ctrl.SelectedItem.totalPrice = ctrl.totalPrice;
        
        ctrl.productArr.push(ctrl.SelectedItem);
        ctrl.price = "";
        ctrl.qty = "";
        ctrl.productDetail = {};

        ctrl.totalBill = ctrl.totalBill + ctrl.totalPrice;

    };

    ctrl.deleteProduct = function(pdt) {

        ctrl.totalBill = ctrl.totalBill - pdt.totalPrice;
        ctrl.productArr.splice(ctrl.productArr.indexOf(pdt), 1)
    }

    ctrl.onSelectCallback = function(item, model) {
        console.log(item)

        ctrl.purchaserName = item.profile.name;
        ctrl.purchaserAddress = item.profile.address;
        ctrl.purchaserNumber1 = item.profile.phone[0];
        ctrl.purchaserNumber2 = item.profile.phone[1];
        ctrl.purchaserPrevBal = item.balance;
        ctrl.totalAmt = ctrl.totalBill + item.balance;
        ctrl.purchaserID = item._id;

    };

    ctrl.newPurchaser = function() {
        angular.bind(ctrl, popupView, null)();
    };

    ctrl.onSelectItem = function(item, model){
        console.log(item)
        ctrl.SelectedItem = item;
    }

    ctrl.placeOrder = function(){

        ctrl.payment = {
            previousBalance: ctrl.purchaserPrevBal,
            totalAmount : ctrl.totalAmt,
            amountPaid: ctrl.amtPaid,
            currentBalance: ctrl.currentBal,
            paidByShop : ctrl.paidByShop,
            paidByPrateek : ctrl.paidByPrateek,
            paidByBharat: ctrl.paidByBharat
        }
        var obj = {
            purchaserID: ctrl.purchaserID,
            Items: ctrl.productArr,
            payment: ctrl.payment 
        }
        
        $http({
                    url: baseURL + "purchaser/placeOrder",
                    method: "POST",
                    data: JSON.stringify(obj),
                    dataType: JSON

                }).then(function(response) {
                    console.log(response)
                })
                .catch(function(error) {
                    console.log("Error while adding brand's varient")
                })
    }

    function sumOfPayies(a, b, c) {
        totalSum = parseInt(a) + parseInt(b) + parseInt(c);
        ctrl.currentBal = ctrl.totalAmt - totalSum;
    }

    ctrl.init();
}

angular.module('purchaseDetail')
    .component('purchaseDetail', {
        templateUrl: 'warehouse/purchase-details/purchase-details.template.html',
        controller: ['$rootScope', '$scope', '$uibModal', '$state', '$http', '$timeout', 'checkoutService', 'moveItemToSaleService', PurchaseDetailController]
    });
