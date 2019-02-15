/// <reference path="../types.d.ts" />

////////////////////////////////////////
//           ServiceWorker            //
////////////////////////////////////////

const sw: ServiceWorkerGlobalScope = (<any>self);
console.log( 'Service Worker is running.', sw, location );

sw.addEventListener( 'install', ( event ) =>
{
	sw.skipWaiting();
} );

sw.addEventListener( 'push', ( event ) =>
{
	event.waitUntil(
		sw.registration.showNotification( 'Push Received',
		{
			body: 'Push Notification Received',
			tag: 'push-notification-tag',
		} )
	);
} );

sw.addEventListener( 'notificationclick', ( event ) =>
{
	event.notification.close();
}, false );
