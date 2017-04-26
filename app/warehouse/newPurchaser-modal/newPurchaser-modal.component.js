(function(angular) {
    'use strict';

    function newPurchaserModalModalController($state, $http) {
        var ctrl = this;

        ctrl.init = function() {
            ctrl.phoneNumberArr = [];
            ctrl.purchaserDetail = (ctrl.resolve && ctrl.resolve.details) || {};
            ctrl.showDuplicacyErr = false;
        }

        ctrl.save = function(name, phoneNumber1, phoneNumber2, address, note) {

            var filterName = ctrl.purchaserDetail.filter(function(data) {
                return data.profile.name == name;
            });
            if (filterName.length == 0) {
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
                        if (response && response.data && response.data.result) {
                            ctrl.modalInstance.close({ action: "update", profile: response.data.result.message });
                        } else {
                            alert('Error in response');
                        }
                    })
                    .catch(function(error) {
                        console.log("Error while adding purchaser");
                    })
            } else {
                ctrl.showDuplicacyErr = true;
            }

        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('newPurchaserModal')
        .component('newPurchaserModal', {
            templateUrl: 'warehouse/newPurchaser-modal/newPurchaser-modal.template.html',
            controller: ['$state', '$http', newPurchaserModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
