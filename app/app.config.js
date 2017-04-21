'use strict';

angular.
module('sellPurchaseApp').
config(['$urlRouterProvider', '$stateProvider', 
    function config($urlRouterProvider, $stateProvider) {

        
        // UI-Routing Config
        $urlRouterProvider.otherwise('/warehouse/purchaseDetails');

        $stateProvider
            .state('adminLayout', {
                url: '/admin',
                abstract: true,
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
            .state('adminLayout.addBrandDetails', {
                url: '/addBrandDetails',
                views: {
                    'contentSection@adminLayout': {
                        template: '<admin-add-brand-details></admin-add-brand-details>'
                    }
                }
            })
            .state('warehouse', {
                url: '/warehouse',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@warehouse': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@warehouse': {
                        template: '<warehouse-sub-panel></warehouse-sub-panel>'
                    }
                }
            })
            .state('warehouse.purchaseDetails', {
                url: '/purchaseDetails',
                views: {
                    'contentSection@warehouse': {
                        template: '<purchase-detail></purchase-detail>'
                    }
                }
            })
            .state('warehouse.checkout', {
                url: '/checkout',
                views: {
                    'contentSection@warehouse': {
                        template: '<purchase-checkout></purchase-checkout>'
                    }
                }
            })
            .state('warehouse.sellDetails', {
                url: '/sellDetails',
                views: {
                    'contentSection@warehouse': {
                        template: '<sell-detail></sell-detail>'
                    }
                }
            })
            .state('stock', {
                url: '/stock',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@stock': {
                        template: '<admin-panel></admin-panel>'
                    }
                }
            })
            .state('stock.stockDetail', {
                url: '/stockDetail',
                views: {
                    'contentSection@stock': {
                        template: '<stock-detail></stock-detail>'
                    }
                }
            })
            .state('order', {
                url: '/order',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@order': {
                        template: '<admin-panel></admin-panel>'
                    }
                }
            })
            .state('order.orderDetail', {
                url: '/orderDetail',
                views: {
                    'contentSection@order': {
                        template: '<order-detail></order-detail>'
                    }
                }
            })


            
    }

]);
