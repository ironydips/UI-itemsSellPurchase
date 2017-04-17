'use strict';
var baseURL = "http://52.58.120.159:3011/api/";

function SalesPurchaseSubPanelController($state, $http, $timeout, checkoutService, moveItemToSaleService) {
    var ctrl = this;
    ctrl.itemArr = [];
    ctrl.displayCartBtn = true;
    ctrl.itemCount = 0;

    ctrl.init = function() {

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


        for (var i = 0; i < item.variants.length; i++) {

            if (item.variants[i].quantity == undefined || item.variants[i].price == undefined) {
                item.variants[i].quantity = 0;
                item.variants[i].price = 0;
            }
            item.variants[i].totalPrice = parseInt(item.variants[i].quantity) * parseInt(item.variants[i].price);

        }

        ctrl.itemArr.push(item);
        ctrl.itemCount = ctrl.itemArr.length;
        item.enableUpdate = true;

    };
    ctrl.updateCart = function(item) {


        for (var i = 0; i < item.variants.length; i++) {

            item.variants[i].totalPrice = parseInt(item.variants[i].quantity) * parseInt(item.variants[i].price);
        }
    }

    ctrl.checkout = function() {

        ctrl.loader = true;
        var countUp = function() {
            ctrl.loader = false;
            $state.go('salesPurchase.checkout');
        }
        $timeout(countUp, 1000);

        checkoutService.addItems(ctrl.itemArr);

    }


    ctrl.init();
}

angular.module('salesPurchaseSubPanel')
    .component('salesPurchaseSubPanel', {
        templateUrl: 'purchase/purchase-details/purchase-details.template.html',
        controller: ['$state', '$http', '$timeout', 'checkoutService', 'moveItemToSaleService', SalesPurchaseSubPanelController]
    });
