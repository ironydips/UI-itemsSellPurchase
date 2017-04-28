(function(angular) {

    'use strict';

    function UserSellerController($state) {
        var ctrl = this;

    }

    angular.module('userSellerDetails')
        .component('userSellerDetails', {
            templateUrl: 'user/user-seller-details/user-seller-details.template.html',
            controller: ['$state', UserSellerController]
        });

})(window.angular);
