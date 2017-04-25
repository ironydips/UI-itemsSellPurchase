// var array = {};
// response.data.result.message.forEach(function(data){
// 	Object.keys(array).indexOf(data.brandName) == -1 ? array[data.brandName] = [data] : array[data.brandName].push(data);
// })

'use strict';

function viewFullPdtDetail(details) {

    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'viewFullPdtDetail',
        windowClass: 'app-modal-window-large',
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
            if (data && data.action == "update") {
                popUpCtrl.init();
            }

        }),
        function(err) {
            console.log('Error in new-Purchase detail modal');
            console.log(err);
        }
}

function StockController($state, $http, $uibModal) {
    var ctrl = this;


    ctrl.init = function() {
        ctrl.array = {};
        ctrl.$state = $state;
        ctrl.$uibModal = $uibModal;

        $http({
            url: "stock/getCurrentStockInfo",
            method: "GET"
        }).then(function(response) {
            console.log(response);
            ctrl.brandArr = response.data.result.message;

            response.data.result.message.forEach(function(data) {
                Object.keys(ctrl.array).indexOf(data.brandName) == -1 ? ctrl.array[data.brandName] = [data] : ctrl.array[data.brandName].push(data);
            });

        }).catch(function(error) {
            console.log("Error while getting stock data:");
            console.log(error);
        });
    };

    ctrl.viewFullDetail = function(item) {
        angular.bind(ctrl, viewFullPdtDetail, item)();
    }

    ctrl.init();
}

angular.module('stockDetail')
    .component('stockDetail', {
        templateUrl: 'stock/stock-detail/stock-detail.template.html',
        controller: ['$state', '$http', '$uibModal', StockController]
    });
