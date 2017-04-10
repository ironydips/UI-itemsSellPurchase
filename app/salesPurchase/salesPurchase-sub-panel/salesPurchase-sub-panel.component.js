'use strict';

function SalesPurchaseSubPanelController($state, $timeout, checkoutService, moveItemToSaleService) {
    var ctrl = this;
    ctrl.selectedItem = {};
    ctrl.itemArr = [];
    ctrl.itemCount = 0;
    ctrl.message = false;
    ctrl.getItemDetails = moveItemToSaleService.ItemsToSale();
    console.log(ctrl.getItemDetails)

    ctrl.init = function() {

        ctrl.getItemArr = checkoutService.getAddedItems();
        if (ctrl.getItemArr != undefined) {
            //  		ctrl.itemArr = checkoutService.getAddedItems();
            // console.log(ctrl.itemArr)
            console.log("getItems")
            console.log(ctrl.getItems)

        }


    }

    ctrl.setBtnValue = function(value) {

        ctrl.valueSet = value;
    };

    ctrl.quickAdd = function(brand, price, qty, index) {

        if (price == undefined && qty == undefined && ctrl.valueSet == undefined) {

            ctrl.message = index;

        } else {

            //ctrl.message = false;
            ctrl.loader = true;
            var totalPrice = parseInt(price) * parseInt(qty);

            var obj = {
                "imageUrl": "https://s3.amazonaws.com/bathwater.images.dev/1483463499380.jpg",
                "brand": brand,
                "price": price,
                "qty": qty,
                "size": ctrl.valueSet,
                "totalPrice": totalPrice
            }
            ctrl.selectedItem = {};
            ctrl.valueSet = "";
            if (ctrl.itemArr.length <= 0) {

                ctrl.itemArr.push(obj);

            } else {

                var itemSet = ctrl.itemArr.filter(function(el) {
                    return (el.brand === brand);

                });
                console.log(itemSet)
                if (itemSet.length == 0) {
                    ctrl.itemArr.push(obj);
                    // checkoutService.addItems(ctrl.itemArr);
                } else {
                    //ctrl.getItems = checkoutService.getAddedItems();
                    // var itemSet = ctrl.itemArr.filter(function(el) {
                    //     return (el.brand === brand);

                    // });

                    angular.forEach(ctrl.itemArr, function(item, index) {
                        if (item.brand === brand) {
                            if (item.size != obj.size) {
                                ctrl.itemArr[index].size = obj.size;
                            }
                            if (item.qty != obj.qty) {
                                ctrl.itemArr[index].qty = parseInt(ctrl.itemArr[index].qty) + parseInt(obj.qty);
                            }
                            if (item.price != obj.price) {
                                ctrl.itemArr[index].price = parseInt(ctrl.itemArr[index].price) + parseInt(obj.price);
                            }
                            if (item.totalPrice != obj.totalPrice) {
                                ctrl.itemArr[index].totalPrice = parseInt(ctrl.itemArr[index].totalPrice) + parseInt(obj.totalPrice);
                            }
                            // checkoutService.addItems(ctrl.itemArr);

                        }
                    });
                    // angular.forEach(ctrl.getItems, function(item, index) {
                    //     if (item.brand === brand) {
                    //     	if(item.size != obj.size){
                    //     		ctrl.getItems[index].size = obj.size;
                    //     	}
                    //     	if(item.qty != obj.qty){
                    //     		ctrl.getItems[index].qty = obj.qty;
                    //     	}
                    //     	if(item.price != obj.price){
                    //     		ctrl.getItems[index].qty = obj.qty;
                    //     	}
                    //     	if(item.totalPrice != obj.totalPrice){
                    //     		ctrl.getItems[index].price = ctrl.getItems[index].price + obj.price;
                    //     	}
                    //         console.log(ctrl.getItems);
                    //         checkoutService.addItems(ctrl.getItems);
                    //         // ctrl.itemArr[index].qty = obj.qty;
                    //         // ctrl.itemArr[index].price = ctrl.itemArr[index].price + obj.price;
                    //        // ctrl.itemArr[index].size = obj.size;

                    //     }
                    // });
                }
            }


            $timeout(countUp, 1000);

            function countUp() {
                ctrl.itemCount = ctrl.itemArr.length;
                ctrl.loader = false;
            }
        }


    };

    ctrl.checkout = function() {
        checkoutService.addItems(ctrl.itemArr);
        console.log(ctrl.itemArr)
    }


    ctrl.init();
}

angular.module('salesPurchaseSubPanel')
    .component('salesPurchaseSubPanel', {
        templateUrl: 'salesPurchase/salesPurchase-sub-panel/salesPurchase-sub-panel.template.html',
        controller: ['$state', '$timeout', 'checkoutService','moveItemToSaleService', SalesPurchaseSubPanelController]
    });
