'use strict';

function SalesPurchaseSubPanelController($state, $timeout, checkoutService) {
    var ctrl = this;
    ctrl.selectedItem = {};
    ctrl.itemArr = [];
    ctrl.itemCount = 0;

    ctrl.setBtnValue = function(value, index) {

        ctrl.valueSet = value;
    };

    ctrl.quickAdd = function(brand, price, qty) {

        ctrl.loader = true;

        var obj = {
            "imageUrl": "https://pizzaonline.dominos.co.in/themes/OLO_v2.1/images/deal/p-1.jpg",
            "brand": brand,
            "price": price,
            "qty": qty,
            "size": ctrl.valueSet
        }
        console.log(obj)
        ctrl.selectedItem = {};
        ctrl.valueSet = "";


        // for (var i = 0; i <= ctrl.itemArr.length; i++) {
    //     if (ctrl.itemArr.length == 0 || ctrl.itemArr[i].brand != obj.brand) {
    //         ctrl.itemArr.push(obj);
    //         console.log(ctrl.itemArr)
    //     } else {
    //         console.log("not in the list")
    //     }
    // }

        ctrl.itemArr.push(obj);
        checkoutService.addItems(ctrl.itemArr);



        var countUp = function() {
            ctrl.itemCount = ctrl.itemArr.length;
            ctrl.loader = false;
        }
        $timeout(countUp, 1000);
        if (ctrl.itemCount > 0) {
            //ctrl.loader = false;
        }

        // if (ctrl.itemArr.indexOf(obj) == -1) {
        // 	ctrl.itemArr.push(obj);
        //    console.log(ctrl.itemArr)
        //    var index = arr.indexOf(item);
        // console.log(index)
        // }

    }
}

angular.module('salesPurchaseSubPanel')
    .component('salesPurchaseSubPanel', {
        templateUrl: 'salesPurchase/salesPurchase-sub-panel/salesPurchase-sub-panel.template.html',
        controller: ['$state', '$timeout','checkoutService', SalesPurchaseSubPanelController]
    });
