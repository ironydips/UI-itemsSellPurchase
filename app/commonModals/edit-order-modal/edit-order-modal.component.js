(function(angular) {
    'use strict';

//--------------------------CONTROLLER START-----------------------------------------

    function EditOrderModalController($state, $http) {
        var ctrl = this;

        ctrl.init = function() {

            ctrl.productDetail = (ctrl.resolve && ctrl.resolve.details) || {};
            ctrl.selectedProduct = { productInfo: '', price: 0, quantity: 0 };

            $http({
                url: "purchaser/getPurchasingRelatedInfo",
                method: "GET",
            }).then(function(response) {
                if (response.data && response.data.result && response.data.result.message) {
                    ctrl.allProductsInfo = response.data.result.message.warehouseItems;
                }
            }).catch(function(err) {
                console.log("error while getting data in get purchaser info");
                console.log(err);
            })

        };

        ctrl.addProduct = function() {

            //calculate total price
            ctrl.selectedProduct.totalPrice = parseToNumber(ctrl.selectedProduct.price) * parseToNumber(ctrl.selectedProduct.qty);
            // push to array
            ctrl.productDetail.order_items.push(angular.copy(ctrl.selectedProduct));

            // initialise selected product
            ctrl.selectedProduct = { productInfo: '', price: 0, quantity: 0 };


        };

        ctrl.deleteProduct = function(index) {

            ctrl.productDetail.order_items.splice(index, 1);
        };

        ctrl.editProduct = function(index) {

            // assign to selected product
            ctrl.selectedProduct = angular.copy(ctrl.productDetail.order_items[index]);
            //remove from existing array.
            ctrl.deleteProduct(index);
        };
        ctrl.onSelectItem = function(item, model) {

            // Add 2 properties to selected item.
            item.quantity = 0;
            item.price =0 ;
            
            ctrl.selectedProduct = angular.copy(item);
        }

        ctrl.cancelBtn = function() {

            ctrl.modalInstance.close({ action: 'update' });
        };

        ctrl.init();

   //-------------------------------CONTROLLER END-----------------------------------     
    }

    angular.module('editOrderModalModule')
        .component('editOrderModalComponent', {
            templateUrl: 'commonModals/edit-order-modal/edit-order-modal.template.html',
            controller: ['$state', '$http', EditOrderModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
