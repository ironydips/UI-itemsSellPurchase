(function(angular) {
    "use strict";

    function MoveItemToSaleServiceHandler() {


        var brandDetail;

        function addItemsToSale(brandDetailArr) {

            brandDetail = angular.copy(brandDetailArr);
        };

        function ItemsToSale() {
            return brandDetail;
        };

        return {
            addItemsToSale: addItemsToSale,
            ItemsToSale: ItemsToSale,
        }
    }

    angular.module('sellPurchaseApp.services')
        .factory('moveItemToSaleService', [MoveItemToSaleServiceHandler]);

})(window.angular);
