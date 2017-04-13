(function(angular) {


    'use strict';
    var baseURL = "http://52.58.120.159:3011/api/";

    function AddBrandDetailsController($state, $http) {
        var ctrl = this;
        ctrl.brandDetail = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.save = function(varient) {

            var data = {
                brandName: ctrl.brandDetail.brandName,
                variantName: varient
            }

            $http({
                    url: baseURL + "admin/addVariantUnderBrand",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: JSON

                }).then(function(response) {
                    ctrl.modalInstance.close({ action: 'update' });
                })
                .catch(function(error) {
                    console.log("Error while adding brand's varient")
                })

        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
    }

    angular.module('addBrandDetails')
        .component('addBrandDetails', {
            templateUrl: 'admin/addBrandDetails-modal/addBrandDetails-modal.template.html',
            controller: ['$state', '$http', AddBrandDetailsController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
