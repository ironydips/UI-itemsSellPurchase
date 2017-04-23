'use strict';

function popup(details) {
    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'addBrandModal',
        windowClass: 'app-modal-window-small',
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
            if (data && data.action == 'update') {

                // popUpCtrl.showBrand(data.getBrand);
                popUpCtrl.init();

            }

        }),
        function(err) {
            console.log('Error in add-brand Modal');
            console.log(err);
        }
}

function SellDetailController($rootScope, $scope, $uibModal, $state, $http, $timeout, checkoutService, moveItemToSaleService) {
    var ctrl = this;
}

angular.module('sellDetail')
    .component('sellDetail', {
        templateUrl: 'warehouse/sell-details/sell-details.template.html',
        controller: [SellDetailController]
    });
