'use strict';

function SalesPurchaseSubPanelController($state) {
    var ctrl = this;
}

angular.module('stockDetail')
    .component('stockDetail', {
        templateUrl: 'stock/stock-detail/stock-detail.template.html',
        controller: ['$state', SalesPurchaseSubPanelController]
    });
