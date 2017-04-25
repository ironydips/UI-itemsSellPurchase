(function(angular) {
    'use strict';

    function ViewFullPdtDetailController($state, $http) {
        var ctrl = this;
        ctrl.variantDetail = (ctrl.resolve && ctrl.resolve.details) || {};
        console.log(ctrl.variantDetail)
        ctrl.init = function() {

           ctrl.findDetail();
        };

        ctrl.findDetail = function(){
        	 $http({
                url: "stock/getStockHistory?brandName=" + ctrl.variantDetail.brandName + "&variantName=" + ctrl.variantDetail.variantName,
                method: "GET"
            }).then(function(response) {
                console.log(response)
                ctrl.variantDetails = response.data.result.message;
            }).catch(function(error) {
                console.log("Error while displaying variant detail:");
                console.log(error);
            })
        }

        ctrl.cancel = function() {

            ctrl.modalInstance.close({action : "update"});
        };

        ctrl.init();
    }

    angular.module('viewFullPdtDetail')
        .component('viewFullPdtDetail', {
            templateUrl: 'stock/stock-viewFullPdtDetail/stock-viewFullPdtDetail.template.html',
            controller: ['$state', '$http', ViewFullPdtDetailController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
