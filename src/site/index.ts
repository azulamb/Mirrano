/// <reference path="./Page.ts" />

function BrowserCheck()
{
	// This browser can use fetch
	if ( typeof fetch !== 'function' ) { return false; }

	// This browser can use <temolate>
	if ( !( 'content' in document.createElement( 'template' ) ) ) { return false; }

	// This browser can use CSS Custom properties
	var style = document.createElement('style').style;
	style.setProperty( '--test', '0' );
	if ( style.getPropertyValue( '--test' ) !== '0' ){ return false; }

	// ServiceWorker?
	if ( !( 'serviceWorker' in navigator ) ) { return false; }

	// This browser is modern.
	return true;
}

document.addEventListener( 'DOMContentLoaded', () =>
{
	// Legacy Browser.
	if ( !BrowserCheck() ) { return; }

	// Modern browser.
	(<HTMLElement>document.getElementById( 'legacy' )).style.display = 'none';

	PageTop.Init();
	PageConfig.Init();
	PageList.Init();

	navigator.serviceWorker.register( './sw.js' ).then( ( register ) =>
	{
		return register.pushManager.subscribe( { userVisibleOnly: true } );
	} ).then( ( result ) =>
	{
		console.log( result );
		console.log( result.endpoint );
	} ).catch( ( error ) => { console.error( error ); } );
} );
