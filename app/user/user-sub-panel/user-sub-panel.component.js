(function(angular) {

'use strict';

function UserSubPanelController($state) {
	var ctrl = this;
}

angular.module('userSubPanel')
.component('userSubPanel',{
	templateUrl: 'user/user-sub-panel/user-sub-panel.template.html',
	controller:['$state', UserSubPanelController]
});

})(window.angular);