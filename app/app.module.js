'use strict';

// Define the `bathwaterApp` module
angular.module('sellPurchaseApp', [
	'ui.router',
	'angular-google-gapi',
	'ngMessages',
	'naif.base64',
	'ui.bootstrap',
	'images-resizer',
	'720kb.datepicker',
	'ngAnimate',
	'ngSanitize', 'ui.select',
	// For Notification
	'ngToast',
	//LightBox Library used as Image Viewer.
	'bootstrapLightbox',
	//Commmon modals
	'viewFullOrderModal',
	'sellPurchaseApp.services',
	'adminLayout',
	'adminPanel',
	'adminSubPanel',
	'adminAddBrandDetails',
	// 'sellPurchase',
	'warehouseSubPanel',
	'purchaseDetail',
	'purchaseCheckout',
	'sellDetail',
	//stock details
	'stockDetail',
	//order details
	'orderSubPanel',
	'orderDetail'
]);
