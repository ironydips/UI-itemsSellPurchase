(function(angular) {


'use strict';
function AmountPaidModalController($state){
	var ctrl = this;

	ctrl.save = function(){     

	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('amountPaidModalModule')
	.component('amountPaidModalComponent',{
		templateUrl: 'warehouse/confirmOrder-modal/confirmOrder-modal.template.html',
		controller:['$state', AmountPaidModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);