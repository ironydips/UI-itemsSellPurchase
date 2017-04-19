(function(angular) {
'use strict';

function newPurchaserModalModalController($state) {
	var ctrl = this;

	ctrl.save = function(name, phoneNumber, address, note){                  
		var obj = {
            name: name,
            phoneNumber: phoneNumber,
            address: address,
            prevBal : 0
        }
        ctrl.modalInstance.close({action: "update", obj: obj});
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('newPurchaserModal')
	.component('newPurchaserModal',{
		templateUrl: 'warehouse/newPurchaser-modal/newPurchaser-modal.template.html',
		controller:['$state', newPurchaserModalModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);