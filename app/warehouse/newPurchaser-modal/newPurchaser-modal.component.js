(function(angular) {
    'use strict';

    function newPurchaserModalModalController($state, $http) {
        var ctrl = this;
        ctrl.phoneNumberArr = [];

        ctrl.save = function(name, phoneNumber1, phoneNumber2, address, note) {

        	ctrl.phoneNumberArr.push(phoneNumber1, phoneNumber2);
            var data = {
                name: name,
                number1: phoneNumber1,
                number2: phoneNumber2,
                address: address,
                notes: note
            }
            	
            $http({
                    url: "purchaser/addPurchaser",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: JSON

                }).then(function(response) {
                    console.log(response)
                    data.phone = ctrl.phoneNumberArr;
                    ctrl.modalInstance.close({ action: "update", profile: data });
                })
                .catch(function(error) {
                    console.log("Error while adding brand's varient")
                })


        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
    }

    angular.module('newPurchaserModal')
        .component('newPurchaserModal', {
            templateUrl: 'warehouse/newPurchaser-modal/newPurchaser-modal.template.html',
            controller: ['$state','$http', newPurchaserModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
