/**
 * Smart Coupon Countdown Timer
 *
 * @package WooCommerce Smart Coupons
 */

document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	/**
	 * Smart Coupon Countdown Timer Handler
	 */
	var WCSmartCouponCountdown = {

		/**
		 * Initialize
		 */
		init: function() {
			this.bindCountdowns();
		},

		/**
		 * Bind countdown timers
		 */
		bindCountdowns: function() {

			var timers = document.querySelectorAll('.sc-smart-coupon-countdown');
			if (!timers.length) {
				return;
			}

			timers.forEach(function(timer) {
				var expiry = parseInt(timer.getAttribute('data-expiry'), 10);
				if (!expiry) {
					return;
				}

				/**
				 * Update countdown timer display
				 */
				function updateTimer() {
					var now = new Date().getTime();
					var distance = expiry - now;

					// Handle expiry
					if (distance <= 0) {
						timer.style.display = 'none';

						var expiredText = timer.nextElementSibling;
						if (expiredText && expiredText.classList.contains('sc-expired-text')) {
							expiredText.style.display = 'block';
						}
						return;
					}

					// Calculate remaining time
					var days    = Math.floor(distance / (1000 * 60 * 60 * 24));
					var hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((distance % (1000 * 60)) / 1000);

					// Update DOM elements
					var d = timer.querySelector('.sc-timer-days');
					var h = timer.querySelector('.sc-timer-hours');
					var m = timer.querySelector('.sc-timer-minutes');
					var s = timer.querySelector('.sc-timer-seconds');

					if (d) d.textContent = String(days).padStart(2, '0');
					if (h) h.textContent = String(hours).padStart(2, '0');
					if (m) m.textContent = String(minutes).padStart(2, '0');
					if (s) s.textContent = String(seconds).padStart(2, '0');

					// Continue updating using requestAnimationFrame
					requestAnimationFrame(updateTimer);
				}

				updateTimer();
			});
		}
	};

	// Initialize countdown handler
	WCSmartCouponCountdown.init();
});
