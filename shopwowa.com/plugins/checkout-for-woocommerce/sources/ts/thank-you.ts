import { cfwDomReady }        from './_functions';
import StorePolicyModals      from './frontend/Components/StorePolicyModals';
import DataService            from './frontend/Services/DataService';
import MapEmbedService        from './frontend/Services/MapEmbedService';
import cfwGetWPHooks          from './functions/cfwGetWPHooks';

class ThankYou {
    constructor() {
        new StorePolicyModals();
        const map_embed_service = new MapEmbedService();

        cfwDomReady( () => {
            map_embed_service.setMapEmbedHandlers();

            jQuery( '.status-step-selected' ).prevAll().addClass( 'status-step-selected' );

            // Init runtime params
            DataService.initRunTimeParams();

            jQuery( '#cfw-mobile-cart-header' ).on( 'click', ( e ) => {
                e.preventDefault();
                jQuery( '#cfw-cart-summary-content' ).slideToggle( 300 );
                jQuery( '#cfw-expand-cart' ).toggleClass( 'active' );
            } );

            jQuery( window ).on( 'load', () => {
                jQuery( '#wpadminbar' ).appendTo( 'html' );

                // Remove the animation blocker
                jQuery( document.body ).removeClass( 'cfw-preload' );
            } );

            ( window as any ).cfwGetWPHooks = cfwGetWPHooks;
        } );
    }
}

new ThankYou();
