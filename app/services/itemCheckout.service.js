(function(angular) {
    "use strict";

    function CheckoutServiceHandler($http) {


        var itemAdded;

        function addItems(itemArr) {
            itemAdded = angular.copy(itemArr);
        };

        function getAddedItems() {
            return itemAdded;
        };

        return {
            addItems: addItems,
            getAddedItems: getAddedItems,
        }
    }

    angular.module('sellPurchaseApp.services')
        .factory('checkoutService', ['$http', CheckoutServiceHandler]);

})(window.angular);
