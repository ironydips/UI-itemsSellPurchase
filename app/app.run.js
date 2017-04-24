'use strict';

angular.module('sellPurchaseApp')
.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$state = toState.name;
    });
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //         //var isDirty = purchaseform.$dirty;
    //         console.log(isDirty)

    //         if (isDirty && toState.name != 'warehouse.checkout') {
    //             var isConfirm = confirm('You have unsaved changes, go back?');

    //             if (!isConfirm) {
    //                 event.preventDefault();
    //             }
    //         }
    //     });
}]);
