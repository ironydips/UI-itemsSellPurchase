(function(angular) {
    'use strict';

    function PurchaseCheckoutController($state, $scope, checkoutService) {
        var ctrl = this;
        ctrl.collapse = false;
        ctrl.secondCollapse = true;
        ctrl.ThirdCollapse = true;
        ctrl.getItems = checkoutService.getAddedItems();
        console.log(ctrl.getItems)
        ctrl.details = {};

        ctrl.names = ['A', 'AB', 'B', 'BM',
            'BN', 'CY', 'CU', 'CM', 'DB',
            'FI', 'HW', 'OP', 'GH'
        ];

        ctrl.openGenrlInfo = function() {
            ctrl.collapse = true;
            ctrl.secondCollapse = false;
            ctrl.ThirdCollapse = true;
        };
        ctrl.editSelectedItem = function() {
            ctrl.collapse = false;
            ctrl.secondCollapse = true;
            ctrl.ThirdCollapse = true;
        };
        ctrl.editPayment = function(name, mobileNum, address) {
            ctrl.userName = name;
            ctrl.mobileNum = mobileNum;
            ctrl.address = address;

            ctrl.collapse = true;
            ctrl.secondCollapse = true;
            ctrl.ThirdCollapse = false;
        };
        ctrl.deleteItem = function(item) {
            ctrl.getItems.splice(ctrl.getItems.indexOf(item), 1);
        };
        ctrl.counter = 0;
        
    }

    angular.module('purchaseCheckout')
        .component('purchaseCheckout', {
            templateUrl: 'warehouse/purchase-checkout-details/purchase-checkout-details.template.html',
            controller: ['$state', '$scope', 'checkoutService', PurchaseCheckoutController]
        });
})(window.angular);
