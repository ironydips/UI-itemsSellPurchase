'use strict';

angular.module('sellPurchaseApp')
.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$state = toState.name;
    });
}]);
