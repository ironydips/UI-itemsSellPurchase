'use strict';
var baseURL = "http://52.58.120.159:3011/api/";

function SalesPurchaseSubPanelController($state, $http, $timeout, checkoutService, moveItemToSaleService) {
    var ctrl = this;
    ctrl.itemArr = [];

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

        ctrl.itemArr.push(item)
    }

    ctrl.checkout = function() {

        checkoutService.addItems(ctrl.itemArr);
    }


    ctrl.init();
}

angular.module('salesPurchaseSubPanel')
    .component('salesPurchaseSubPanel', {
        templateUrl: 'purchase/purchase-details/purchase-details.template.html',
        controller: ['$state', '$http', '$timeout', 'checkoutService', 'moveItemToSaleService', SalesPurchaseSubPanelController]
    });
