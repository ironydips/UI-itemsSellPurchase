'use strict';

// Define the `bathwaterApp` module
angular.module('bathwaterApp', [
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
	'adminLayout',
	'adminPanel',
	// 'salesPurchase',
	'salesPurchaseSubPanel',
	'salesPurchaseCheckout'
]);
