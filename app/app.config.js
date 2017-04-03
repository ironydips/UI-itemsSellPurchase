'use strict';

angular.
module('bathwaterApp').
config(['$urlRouterProvider', '$stateProvider', 
    function config($urlRouterProvider, $stateProvider) {

        
        // UI-Routing Config
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('adminLayout', {
                url: '/admin',
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@adminLayout': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@adminLayout': {
                        template: '<admin-sub-panel></admin-sub-panel>'
                    }
                }
            })
            .state('salesPurchase', {
                url: '/salesPurchase',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@salesPurchase': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@salesPurchase': {
                        template: '<sales-purchase-sub-panel></sales-purchase-sub-panel>'
                    }
                }
            })
            .state('salesPurchase.salesPurchaseDetails', {
                url: '/salesPurchaseDetails',
                views: {
                    'contentSection@salesPurchase': {
                        template: '<sales-purchase-details></sales-purchase-details>'
                    }
                }
            })

            
    }

]);
