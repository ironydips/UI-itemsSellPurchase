(function(angular) {

'use strict';

function AdminPanelController($state) {
	var ctrl = this;
	console.log($state.current)
}

angular.module('adminPanel')
.component('adminPanel',{
	templateUrl: 'admin/admin-panel/admin-panel.template.html',
	controller:['$state', AdminPanelController]
});

})(window.angular);