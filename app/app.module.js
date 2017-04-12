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
	'ngSanitize',
	// For Notification
	'ngToast',
	//LightBox Library used as Image Viewer.
	'bootstrapLightbox',
	'sellPurchaseApp.services',
	'adminLayout',
	'adminPanel',
	'adminAddBrandDetails',
	// 'salesPurchase',
	'salesPurchaseSubPanel',
	'salesPurchaseCheckout',
	//stock details
	'stockDetail'
]);
