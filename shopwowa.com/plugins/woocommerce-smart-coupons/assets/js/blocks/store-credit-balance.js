/**
 * Smart Coupons Show Store Credit Balance Block Page.
 *
 * @package WooCommerce Smart Coupons
 */
( function () {
	'use strict';

	if ( ! window.WC_SC_Store_Credit_Balance ) {
		return;
	}

	const LABEL_FMT = WC_SC_Store_Credit_Balance.i18n.balance_label;

	let balanceCache = {};

	/**
	 * Get Store Credit balance data from cart extensions.
	 *
	 * @return {Array} Balance data array.
	 */
	function getBalanceDataFromCart() {
		const store = window.wp?.data?.select( 'wc/store/cart' );
		if ( ! store ) {
			return [];
		}

		const cartData = store.getCartData();
		if ( ! cartData || ! cartData.extensions ) {
			return [];
		}

		const extensions = cartData.extensions;
		if (
			! extensions[ 'wc-sc-block-store-credit-balance' ] ||
			typeof extensions[ 'wc-sc-block-store-credit-balance' ] !== 'object'
		) {
			return [];
		}

		return extensions[ 'wc-sc-block-store-credit-balance' ];
	}

	/**
	 * Format coupon label with balance information (plain text, no HTML).
	 *
	 * @param {Object} coupon Coupon object.
	 * @return {string} Formatted label.
	 */
	function formatLabel( coupon ) {
		const balance = balanceCache[ coupon.code ];

		if ( ! balance ) {
			return coupon.label || coupon.code;
		}

		const remainingText = balance?.plain?.remaining || '';
		const totalText = balance?.plain?.total || '';

		if ( ! remainingText || ! totalText ) {
			return coupon.label || coupon.code;
		}

		const balanceText = LABEL_FMT
			.replace( /%1\$s/g, remainingText )
			.replace( /%2\$s/g, totalText );

		return ( coupon.label || coupon.code ) + ' ( ' + balanceText + ' )';
	}

	/**
	 * Update balance cache from cart extensions data.
	 */
	function updateBalanceCache() {
		const balanceData = getBalanceDataFromCart();

		// Normalize array data into an object keyed by coupon_code for fast lookup.
		if ( Array.isArray( balanceData ) ) {
			balanceCache = balanceData.reduce( ( acc, item ) => {
				if ( item && item.coupon_code ) {
					acc[ item.coupon_code ] = item;
				}
				return acc;
			}, {} );
			return;
		}

		balanceCache = {};
	}

	/**
	 * Register checkout filters (ONLY ONCE).
	 */
	function registerFilters() {

		if ( ! window.wc || ! window.wc.blocksCheckout ) {
			return;
		}

		const { registerCheckoutFilters } = window.wc.blocksCheckout;

		registerCheckoutFilters( 'wc-sc-block-store-credit-balance', {
			coupons: ( coupons ) => {
				if ( ! Array.isArray( coupons ) ) {
					return coupons;
				}

				// Update cache from latest cart data.
				updateBalanceCache();

				return coupons.map( ( coupon ) => {
					if (
						coupon?.code &&
						coupon.discount_type === 'smart_coupon' &&
						balanceCache[ coupon.code ]
					) {
						return {
							...coupon,
							label: formatLabel( coupon ),
						};
					}
					return coupon;
				} );
			},
		} );
	}

	/**
	 * Initialize Store Credit balance display.
	 */
	function init() {
		registerFilters();
	}

	// Initialize when DOM is ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
