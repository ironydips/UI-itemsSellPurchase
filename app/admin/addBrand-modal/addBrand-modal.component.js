(function(angular) {

    'use strict';

    var baseURL = "http://52.58.120.159:3011/api/"

    function AddBrandModalController($state, $http) {
        var ctrl = this;
        ctrl.brandDetail = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.save = function(brand) {

            var data = {
                brandName: brand
            }

            $http({
                    url: baseURL + "admin/addBrand",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: JSON

                }).then(function(response) {
                    debugger;
                    ctrl.modalInstance.close({ action: 'update'});
                })
                .catch(function(error) {
                    console.log("Error while adding brand")
                })
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
    }

    angular.module('addBrandModal')
        .component('addBrandModal', {
            templateUrl: 'admin/addBrand-modal/addBrand-modal.template.html',
            controller: ['$state', '$http', AddBrandModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
