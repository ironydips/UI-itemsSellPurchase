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

                popUpCtrl.onSelectCallback(data.obj)

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
    ctrl.productDetail ={};
    ctrl.total = 0;


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

    }


    ctrl.addProduct = function(seller, price, quantity){

        ctrl.totalPrice = parseInt(quantity) * parseInt(price);
        var obj = {
            sellerName: seller,
            price: price,
            quantity: quantity,
            totalPrice: ctrl.totalPrice
        }
        ctrl.productArr.push(obj);
        ctrl.price = "";
        ctrl.qty = "";
        ctrl.productDetail = {};
        
        // for (var i = 0; i < ctrl.productArr.length; i++) {
        //     var value = 0;
        //     value = value + ctrl.productArr[i].totalPrice;
        //     console.log(value)
        // }
    };

    ctrl.deleteProduct = function(pdt){
        ctrl.productArr.splice(ctrl.productArr.indexOf(pdt), 1)
    }

    ctrl.onSelectCallback = function(item, model) {
            ctrl.purchaserName = item.name;
            ctrl.purchaserAddress = item.address;
            ctrl.purchaserNumber = item.phoneNumber;
            ctrl.purchaserPrevBal = item.prevBal;
        };

        

        ctrl.purchaseDetails = [
            { name: 'Adam', address: 'abc', phoneNumber: 12123, prevBal: 0 },
            { name: 'Amalie', address: 'w', phoneNumber: 4566, prevBal: 110},
            { name: 'Estefanía',address: 'j', phoneNumber: 898, prevBal: 889 },
            { name: 'Adrian', address: 'l', phoneNumber: 89, prevBal: 0 },
            { name: 'Wladimir', address: 'hh', phoneNumber: 543, prevBal: 0 },
            { name: 'Samantha', address: 'ccccfe', phoneNumber: 4545, prevBal: 454 },
            { name: 'Nicole', address: 'ghhg', phoneNumber: 565, prevBal: 64545},
            { name: 'Natasha', address: 'ytty', phoneNumber: 434, prevBal: 433 },
            { name: 'Michael', address: 'rtrt', phoneNumber: 45454, prevBal: 32 },
            { name: 'Nicolás', address: 'fgf', phoneNumber: 4544, prevBal: 0 }
        ];

        
        ctrl.productDetails = [
            { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
            { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
            { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
            { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
            { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
            { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
            { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
            { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia' }
        ];
    ctrl.newPurchaser = function(){
        angular.bind(ctrl, popupView, null)();
    }


    ctrl.init();
}

angular.module('purchaseDetail')
    .component('purchaseDetail', {
        templateUrl: 'warehouse/purchase-details/purchase-details.template.html',
        controller: ['$rootScope', '$scope', '$uibModal', '$state', '$http', '$timeout', 'checkoutService', 'moveItemToSaleService', PurchaseDetailController]
    });
