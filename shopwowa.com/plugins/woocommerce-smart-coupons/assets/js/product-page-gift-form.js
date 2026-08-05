/**
 * Product Page Gift Form JavaScript
 *
 * Handles the gift certificate receiver form on product pages.
 * Requires wp_localize_script with object 'wcScProductPageGiftForm'.
 *
 * @package woocommerce-smart-coupons
 */

(function() {
	'use strict';

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initProductGiftForm);
	} else {
		initProductGiftForm();
	}

	function initProductGiftForm() {
		const formWrapper = [...document.querySelectorAll('.wc-sc-product-page-gift-form')].find(el => el.offsetParent !== null);
		
		if (!formWrapper) return;

		// Get localized data from PHP.
		const localizedData = (typeof wcScProductPageGiftForm !== 'undefined') ? wcScProductPageGiftForm : {};

		const ajaxUrl = localizedData.ajaxUrl || '';
		const ajaxNonce = localizedData.ajaxNonce || '';
		const datepickerOptions = localizedData.datepickerOptions || {};
		const i18n = localizedData.i18n || {};

		const couponsData = JSON.parse(formWrapper.getAttribute('data-coupons') || '[]');
		const scheduleEnabled = formWrapper.getAttribute('data-schedule-enabled') === 'yes';
		const accordionsContainer = formWrapper.querySelector('#wc_sc_product_gift_form_accordions');
		const defaultAccordionState = formWrapper.getAttribute('data-accordion-state') || 'collapsed';
		const sessionData = JSON.parse(formWrapper.getAttribute('data-session-data') || '{}');
		const productId = parseInt(formWrapper.getAttribute('data-product-id'), 10) || 0;

		// Get currency formatting settings.
		const currencySymbol = formWrapper.getAttribute('data-currency-symbol') || '$';
		const currencyPosition = formWrapper.getAttribute('data-currency-position') || 'left';
		const priceDecimals = parseInt(formWrapper.getAttribute('data-price-decimals'), 10) || 2;
		const priceDecimalSep = formWrapper.getAttribute('data-price-decimal-sep') || '.';
		const priceThousandSep = formWrapper.getAttribute('data-price-thousand-sep') || ',';

		// Find quantity input element (supports various WooCommerce themes).
		let quantityInput = null;

		/**
		 * Find quantity input element.
		 * Tries multiple selectors to support different WooCommerce themes.
		 * @return {HTMLElement|null} Quantity input element or null if not found.
		 */
		const findQuantityInput = function() {
			const quantitySelectors = [
				'input.qty',
				'input[name="quantity"]',
				'form.cart input[type="number"][name*="quantity"]',
				'form.cart .quantity input',
				'.quantity input[type="number"]'
			];
			for (const selector of quantitySelectors) {
				const found = [...document.querySelectorAll(selector)].find(el => el.offsetParent !== null);

				if (found) {
					return found;
				}
			}
			return null;
		};
		quantityInput = findQuantityInput();

		// Get current quantity from input.
		let currentQty = quantityInput && quantityInput.value ? parseInt(quantityInput.value, 10) || 1 : 1;

		/**
		 * Parse field name to extract coupon ID and person index.
		 * @param {string} fieldName - Field name like "gift_receiver_email[12][0]"
		 * @return {Object|null} {couponId, personIndex} or null if invalid
		 */
		const parseFieldName = (fieldName) => {
			const match = fieldName.match(/\[(\d+)\]\[(\d+)\]/);
			return match ? {couponId: parseInt(match[1], 10), personIndex: parseInt(match[2], 10)} : null;
		};

		/**
		 * Collect form data from all fields.
		 * @return {Object} Form data object.
		 */
		const collectFormData = () => {
			const dataObj = {
				wc_sc_schedule_gift_sending: Array.from(formWrapper.querySelectorAll('.wc-sc-person-schedule-toggle')).some(t => t.checked) ? 'yes' : 'no',
				gift_receiver_email: {},
				gift_receiver_message: {},
				gift_sending_date_time: {},
				gift_sending_timestamp: {}
			};

			['gift_receiver_email', 'gift_receiver_message', 'gift_sending_date_time', 'gift_sending_timestamp'].forEach(fieldType => {
				formWrapper.querySelectorAll('.' + fieldType).forEach(input => {
					const parsed = parseFieldName(input.name);
					if (!parsed) return;
					if (!dataObj[fieldType][parsed.couponId]) dataObj[fieldType][parsed.couponId] = {};
					dataObj[fieldType][parsed.couponId][parsed.personIndex] = input.value ? input.value.trim() : '';
				});
			});

			return dataObj;
		};

		/**
		 * Save form data to session via AJAX.
		 * @return {Promise}
		 */
		function saveToSession() {
			return new Promise((resolve, reject) => {

				const dataObj = collectFormData();

				const data = new URLSearchParams();
				data.append('wc_sc_schedule_gift_sending', dataObj.wc_sc_schedule_gift_sending || 'no');

				// Collect all coupon IDs.
				const allCouponIds = new Set([...Object.keys(dataObj.gift_receiver_email), ...Object.keys(dataObj.gift_receiver_message), ...Object.keys(dataObj.gift_sending_date_time), ...Object.keys(dataObj.gift_sending_timestamp)]);

				allCouponIds.forEach(couponIdKey => {
					const couponId = parseInt(couponIdKey, 10);
					if (isNaN(couponId)) return;

					// Get all person indices for this coupon.
					const personIndices = new Set();
					['gift_receiver_email', 'gift_receiver_message', 'gift_sending_date_time', 'gift_sending_timestamp'].forEach(field => {
						if (dataObj[field][couponIdKey]) {
							Object.keys(dataObj[field][couponIdKey]).forEach(idx => personIndices.add(parseInt(idx, 10)));
						}
					});

					// Process each person index.
					personIndices.forEach(personIndex => {
						if (isNaN(personIndex)) return;

						const email = (dataObj.gift_receiver_email[couponIdKey] && dataObj.gift_receiver_email[couponIdKey][personIndex] || '').trim();
						const message = (dataObj.gift_receiver_message[couponIdKey] && dataObj.gift_receiver_message[couponIdKey][personIndex] || '').trim();
						const dateTime = (dataObj.gift_sending_date_time[couponIdKey] && dataObj.gift_sending_date_time[couponIdKey][personIndex] || '').trim();
						const timestamp = (dataObj.gift_sending_timestamp[couponIdKey] && dataObj.gift_sending_timestamp[couponIdKey][personIndex] || '').trim();

						// Only send if email is valid.
						if (email) {
							data.append(`gift_receiver_email[${couponId}][${personIndex}]`, email);
							data.append(`gift_receiver_message[${couponId}][${personIndex}]`, message);
							data.append(`gift_sending_date_time[${couponId}][${personIndex}]`, dateTime);
							data.append(`gift_sending_timestamp[${couponId}][${personIndex}]`, timestamp);
						}
					});
				});

				const formData = new URLSearchParams();
				formData.append('action', 'wc_sc_save_product_page_coupon_receiver_details');
				formData.append('security', ajaxNonce);
				formData.append('product_id', productId);
				formData.append('data', data.toString());

				fetch(ajaxUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: formData.toString()
				}).then(response => {
					if (!response.ok) {
						throw new Error('HTTP error: ' + response.status);
					}
					return response.json();
				}).then(result => {
					if (result.success === 'yes') {
						// Update sessionData with saved data.
						['gift_receiver_email', 'gift_receiver_message', 'gift_sending_date_time', 'gift_sending_timestamp'].forEach(fieldType => {
							if (!sessionData[fieldType]) sessionData[fieldType] = {};
							Object.keys(dataObj[fieldType]).forEach(couponId => {
								if (!sessionData[fieldType][couponId]) sessionData[fieldType][couponId] = {};
								Object.assign(sessionData[fieldType][couponId], dataObj[fieldType][couponId]);
							});
						});

						if (dataObj.wc_sc_schedule_gift_sending) sessionData.wc_sc_schedule_gift_sending = dataObj.wc_sc_schedule_gift_sending;

						resolve(result);
					} else {
						reject(new Error((i18n.sessionSaveFailed || 'Session save failed') + ': ' + (result.message || (i18n.unknownError || 'Unknown error'))));
					}
				}).catch(reject);
			});
		}

		/**
		 * Escape HTML to prevent XSS attacks.
		 * @param {string} text - Text to escape.
		 * @return {string} Escaped HTML string.
		 */
		const escapeHtml = (text) => text ? document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML : '';

		/**
		 * Format amount as currency.
		 * @param {number|string} amount - Amount to format.
		 * @return {string} Formatted price string.
		 */
		function formatPrice(amount) {
			if (!amount || isNaN(amount) || amount <= 0) return '';

			const formatted = parseFloat(amount).toFixed(priceDecimals);
			const parts = formatted.split('.');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, priceThousandSep);
			const priceString = parts.join(priceDecimalSep);

			const positions = {
				'left': currencySymbol + priceString,
				'right': priceString + currencySymbol,
				'left_space': currencySymbol + ' ' + priceString,
				'right_space': priceString + ' ' + currencySymbol
			};

			return '<span class="woocommerce-Price-amount amount"><bdi>' + escapeHtml(positions[currencyPosition] || positions['left']) + '</bdi></span>';
		}

		/**
		 * Get current credit_called amount from input field.
		 * @return {number} Current amount or 0 if not found/invalid.
		 */
		const getCreditCalledAmount = () => {
			const val = document.querySelector('#credit_called')?.value;
			const amount = parseFloat(val);
			return !isNaN(amount) && amount > 0 ? amount : 0;
		};

		let currentVariationAmount = 0;

		jQuery(document).on('found_variation', 'form.variations_form', function (e, variation) {
			currentVariationAmount = parseFloat(variation.display_price) || 0;
		});

		const getVariationAmount = () => currentVariationAmount;

		/**
		 * Update all accordion form titles with new amount from credit_called.
		 * @return {void}
		 */
		function updateAccordionAmounts() {
			const credit = getCreditCalledAmount();
			const creditAmount = credit > 0 ? credit : getVariationAmount();
			
			console.log(creditAmount);
			// Update all gift items in accordions
			const giftItems = formWrapper.querySelectorAll('.wc-sc-gift-item');
			giftItems.forEach(giftItem => {
				const couponId = giftItem.getAttribute('data-coupon-id');
				if (!couponId) return;

				// Find the coupon data
				const coupon = couponsData.find(c => String(c.id) === String(couponId));
				if (!coupon) return;
				
				// Only update if this coupon uses credit_called
				if (!coupon.uses_credit_called) {
					return;
				}
				

				// Find or create the amount div
				let amountDiv = giftItem.querySelector('.amount');
				const emailAmountDiv = giftItem.querySelector('.email_amount');

				if (!emailAmountDiv) return;

				// If credit_called has a valid value, show the amount text.
				if (creditAmount > 0) {
					const formattedAmount = formatPrice(creditAmount);
					
					if (formattedAmount) {
						const amountText = (i18n.send || 'Send') + ' ' + escapeHtml(coupon.formatted_text) + ' ' + (i18n.of || 'of') + ' ' + formattedAmount;

						// Create amount div if it doesn't exist
						if (!amountDiv) {
							amountDiv = document.createElement('div');
							amountDiv.className = 'amount';
							// Insert before the email input
							const emailInput = emailAmountDiv.querySelector('.email');
							if (emailInput) {
								emailAmountDiv.insertBefore(amountDiv, emailInput);
							} else {
								emailAmountDiv.appendChild(amountDiv);
							}
						}

						amountDiv.innerHTML = amountText;
						// Show the amount div if it was hidden
						amountDiv.style.display = '';
					}
				} else {
					// If no valid amount, hide/remove the amount div
					if (amountDiv) {
						amountDiv.innerHTML = '';
						amountDiv.style.display = 'none';
					}
				}
			});
		}

		// Create gift item block for a specific coupon and person index
		function createGiftItem(coupon, personIndex, sessionData = {}, isScheduleEnabled = false) {
			const item = document.createElement('div');
			item.className = 'wc-sc-gift-item';
			item.setAttribute('data-coupon-id', coupon.id);
			item.setAttribute('data-person-index', personIndex);

			// Field names in [coupon_id][person_index] format.
			const emailFieldName = `gift_receiver_email[${coupon.id}][${personIndex}]`;
			const messageFieldName = `gift_receiver_message[${coupon.id}][${personIndex}]`;
			const dateTimeFieldName = `gift_sending_date_time[${coupon.id}][${personIndex}]`;
			const timestampFieldName = `gift_sending_timestamp[${coupon.id}][${personIndex}]`;

			// Get values from session.
			const getValue = (field) => sessionData[field]?.[coupon.id]?.[personIndex] ? escapeHtml(String(sessionData[field][coupon.id][personIndex])) : '';
			const emailValue = getValue('gift_receiver_email');
			const messageValue = getValue('gift_receiver_message');
			const dateTimeValue = getValue('gift_sending_date_time');
			const timestampValue = getValue('gift_sending_timestamp');

			// Build amount text: "Send Store Credit of $20.00"
			let amountText = '';
			if (coupon.uses_credit_called) {
				// Only show text when credit_called has valid amount.
				const credit = getCreditCalledAmount();
				const creditAmount = credit > 0 ? credit : getVariationAmount();

				if (creditAmount > 0) {
					const formattedAmount = formatPrice(creditAmount);
					if (formattedAmount) {
						amountText = (i18n.send || 'Send') + ' ' + escapeHtml(coupon.formatted_text) + ' ' + (i18n.of || 'of') + ' ' + formattedAmount;
					}
				}
			} else {
				// For fixed amount coupons, always show.
				amountText = (i18n.send || 'Send') + ' ' + escapeHtml(coupon.formatted_text) + ' ' + (i18n.of || 'of') + ' ' + coupon.formatted_amount;
			}

			const amountDivHTML = amountText ? `<div class="amount">${amountText}</div>` : '';
			const emailAmountHTML = `<div class="email_amount">
				${amountDivHTML}
				<div class="email"><input class="gift_receiver_email" type="text" placeholder="${i18n.enterRecipientEmail || 'Enter recipient e-mail address'}..." name="${emailFieldName}" value="${emailValue}" /></div>
			</div>`;

			const messageRowHTML = `<div class="message_row">
				<div class="sc_message"><textarea placeholder="${i18n.writeMessage || 'Write a message'}..." class="gift_receiver_message" name="${messageFieldName}" cols="50" rows="5">${messageValue}</textarea></div>
			</div>`;

			let dateTimeHTML = '';
			if (scheduleEnabled) {
				const showDateTime = isScheduleEnabled;
				dateTimeHTML = `<div class="email_sending_date_time_wrapper" style="${showDateTime ? '' : 'display:none;'}">
					<input class="gift_sending_date_time" type="text" placeholder="${i18n.pickDeliveryDateTime || 'Pick a delivery date & time'}..." name="${dateTimeFieldName}" value="${dateTimeValue}" autocomplete="off" style="position: relative; z-index: 99997;"/>
					<input type="hidden" class="gift_sending_timestamp" name="${timestampFieldName}" value="${timestampValue}" />
				</div>`;
			}

			item.innerHTML = `<div class="form_table">${emailAmountHTML}${dateTimeHTML}${messageRowHTML}</div>`;
			return item;
		}

		/**
		 * Create accordion for a person (contains forms for all coupons).
		 * Simple structure: one accordion per person with all coupon forms.
		 * @param {number} personIndex - Person index (0-based).
		 * @param {Object} sessionData - Session data to pre-fill values.
		 * @return {HTMLElement|null} Accordion element or null if error.
		 */
		function createPersonAccordion(personIndex, sessionData = {}) {
			if (!accordionsContainer || !couponsData || couponsData.length === 0) {
				return null;
			}

			// Create accordion container.
			const accordion = document.createElement('div');
			accordion.className = 'wc-sc-gift-accordion';
			accordion.setAttribute('data-person-index', personIndex);

			// Create header with title and toggle.
			const header = document.createElement('div');
			header.className = 'wc-sc-gift-accordion-header';

			// Add schedule toggle if enabled.
			let scheduleToggleHTML = '';
			const isScheduleChecked = sessionData.wc_sc_schedule_gift_sending === 'yes';
			if (scheduleEnabled) {
				scheduleToggleHTML = `<div class="wc-sc-schedule-toggle-wrapper">
				<label class="wc-sc-toggle-check">
					<input type="checkbox" class="wc-sc-toggle-check-input wc-sc-person-schedule-toggle" data-person-index="${personIndex}" ${isScheduleChecked ? 'checked' : ''} />
					<span class="wc-sc-toggle-check-text"></span>
				</label>
			</div>`;
			}

			header.innerHTML = `<span class="wc-sc-accordion-title">${i18n.giftToPerson || 'GIFT to person'} ${personIndex + 1}</span>${scheduleToggleHTML}<span class="accordion-toggle">${defaultAccordionState === 'expanded' ? '−' : '+'}</span>`;

			// Create content area.
			const content = document.createElement('div');
			content.className = 'wc-sc-gift-accordion-content';
			if (defaultAccordionState === 'expanded') {
				content.classList.add('expanded');
			}

			// Create gift item for each coupon.
			couponsData.forEach(coupon => {
				const giftItem = createGiftItem(coupon, personIndex, sessionData, isScheduleChecked);
				if (giftItem) {
					content.appendChild(giftItem);
				}
			});

			// Assemble accordion.
			accordion.appendChild(header);
			accordion.appendChild(content);
			accordionsContainer.appendChild(accordion);

			// Update date/time field visibility based on schedule toggle.
			setTimeout(() => {
				const headerToggle = accordion.querySelector('.wc-sc-person-schedule-toggle');
				if (headerToggle) {
					const dateTimeWrappers = accordion.querySelectorAll('.email_sending_date_time_wrapper');
					dateTimeWrappers.forEach(wrapper => {
						wrapper.style.display = headerToggle.checked ? 'block' : 'none';
					});
				}
			}, 0);

			return accordion;
		}

		const setAccordionState = (accordion, isOpen) => {
			const content = accordion.querySelector('.wc-sc-gift-accordion-content');
			const toggle = accordion.querySelector('.accordion-toggle');
			if (content) content.classList.toggle('expanded', isOpen);
			if (toggle) toggle.textContent = isOpen ? '−' : '+';
		};

		/**
		 * Initialize datepicker for date/time inputs.
		 * @return {void}
		 */
		function initializeDatepickers() {
			const initDatepickers = () => {
				if (typeof jQuery === 'undefined' || !jQuery.fn.datetimepicker) {
					setTimeout(initDatepickers, 100);
					return;
				}

				const setTimestampFromPicker = (dateTimeInput) => {
					let dateObj = null;
					try {
						dateObj = jQuery(dateTimeInput).datetimepicker('getDate');
					} catch (e) {
						dateObj = null;
					}

					const tsInput = dateTimeInput.closest('.form_table')?.querySelector('input.gift_sending_timestamp');
					if (!tsInput) return;

					if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
						tsInput.value = String(Math.floor(dateObj.getTime() / 1000));
					} else {
						tsInput.value = '';
					}
				};

				// Use datepicker options from localized data.
				const options = Object.assign({}, datepickerOptions);
				options.isRTL = (typeof wp !== 'undefined' && wp.i18n && wp.i18n.isRTL) ? wp.i18n.isRTL() : false;
				const existingOnClose = options.onClose;
				options.onClose = function() {
					if (typeof existingOnClose === 'function') {
						existingOnClose.apply(this, arguments);
					}
					setTimestampFromPicker(this);
				};

				formWrapper.querySelectorAll('.gift_sending_date_time:not(.hasDatepicker)').forEach(input => {
					jQuery(input).datetimepicker(options);
					input.addEventListener('change', () => setTimestampFromPicker(input));
					input.addEventListener('blur', () => setTimestampFromPicker(input));
					setTimestampFromPicker(input);
				});
			};

			setTimeout(initDatepickers, 300);
		}

		/**
		 * Render UI based on current quantity.
		 * @return {void}
		 */
		function renderUI() {
			if (!accordionsContainer || currentQty <= 0) return;

			accordionsContainer.innerHTML = '';

			// Create accordion for each person using session data.
			for (let personIndex = 0; personIndex < currentQty; personIndex++) {
				createPersonAccordion(personIndex, sessionData);
			}

			initializeDatepickers();
			setTimeout(updateAccordionAmounts, 100);
		}

		function setupEventListeners() {
			// Listen for credit_called input changes.
			const creditCalledInput = document.querySelector('#credit_called');
			if (creditCalledInput) {
				let creditTimeout;
				const handleCreditChange = () => {
					clearTimeout(creditTimeout);
					creditTimeout = setTimeout(updateAccordionAmounts, 300);
				};

				creditCalledInput.addEventListener('input', handleCreditChange);
				creditCalledInput.addEventListener('change', handleCreditChange);
				setTimeout(updateAccordionAmounts, 500);
			}

			jQuery(document).on('found_variation', 'form.variations_form', function () {
				setTimeout(updateAccordionAmounts, 500);
			});

			// Quantity change handler.
			let quantityChangeTimeout;
			const handleQuantityChange = (newQty) => {
				newQty = parseInt(newQty, 10) || 0;
				if (newQty < 0 || newQty === currentQty) return;

				// Save before changing quantity.
				saveToSession().then(() => {
					const oldQty = currentQty;
					currentQty = newQty;
					if (quantityInput && quantityInput.value != newQty) quantityInput.value = newQty;

					renderUI();

					// Close all, open last if increased.
					const allAccordions = accordionsContainer.querySelectorAll('.wc-sc-gift-accordion');
					allAccordions.forEach(a => setAccordionState(a, false));
					if (newQty > oldQty) {
						const newAccordion = accordionsContainer.querySelector(`.wc-sc-gift-accordion[data-person-index="${newQty - 1}"]`);
						if (newAccordion) setAccordionState(newAccordion, true);
					}

					setTimeout(() => saveToSession().catch(() => {}), 100);
				}).catch(() => {
					// If save fails, still render with new quantity.
					currentQty = newQty;
					renderUI();
				});
			};

			// Attach quantity listeners.
			const attachQuantityListeners = () => {
				if (!quantityInput) quantityInput = findQuantityInput();
				if (!quantityInput) return;

				const quantityChangeHandler = function() {
					clearTimeout(quantityChangeTimeout);
					quantityChangeTimeout = setTimeout(() => handleQuantityChange(this.value), 300);
				};

				quantityInput.addEventListener('change', quantityChangeHandler);
				quantityInput.addEventListener('input', quantityChangeHandler);

				// Listen for +/- buttons.
				document.querySelectorAll('.quantity .plus, .quantity .minus, .bde-quantity-button, .bde-quantity-button, .qty-button').forEach(button => {
					button.addEventListener('click', () => {
						
						if (button.offsetParent === null) {
							return;
						}

						setTimeout(() => {
							const input = findQuantityInput();
							if (input && input.value) {
								quantityInput = input;
								handleQuantityChange(input.value);
							}
						}, 100);
					});
				});
			};

			if (quantityInput) {
				attachQuantityListeners();
			} else {
				setTimeout(attachQuantityListeners, 500);
			}

			// Schedule toggle handler.
			accordionsContainer.addEventListener('change', e => {
				if (!e.target.classList.contains('wc-sc-person-schedule-toggle')) return;

				const isEnabled = e.target.checked;
				sessionData.wc_sc_schedule_gift_sending = Array.from(formWrapper.querySelectorAll('.wc-sc-person-schedule-toggle')).some(t => t.checked) ? 'yes' : 'no';

				// Show/hide date/time fields for this accordion.
				const accordion = e.target.closest('.wc-sc-gift-accordion');
				if (accordion) {
					accordion.querySelectorAll('.email_sending_date_time_wrapper').forEach(wrapper => {
						wrapper.style.display = isEnabled ? 'block' : 'none';
					});
				}

				saveToSession().catch(() => {});
			});

			// Accordion toggle handler.
			accordionsContainer.addEventListener('click', e => {
				if (e.target.closest('.wc-sc-schedule-toggle-wrapper') || e.target.closest('.wc-sc-toggle-check')) return;

				const header = e.target.closest('.wc-sc-gift-accordion-header');
				if (header) {
					const accordion = header.parentElement;
					const isOpen = accordion.querySelector('.wc-sc-gift-accordion-content').classList.contains('expanded');
					setAccordionState(accordion, !isOpen);
				}
			});

			// Save to session on field changes (debounced).
			let saveTimeout;
			const debouncedSave = () => {
				clearTimeout(saveTimeout);
				saveTimeout = setTimeout(() => saveToSession().catch(() => {}), 500);
			};

			formWrapper.addEventListener('blur', e => {
				if (e.target.matches('.gift_receiver_email, .gift_receiver_message, .gift_sending_date_time')) {
					debouncedSave();
				}
			}, true);

			formWrapper.addEventListener('input', e => {
				if (e.target.matches('.gift_receiver_email, .gift_receiver_message, .gift_sending_date_time')) {
					debouncedSave();
				}
			}, true);

			/**
			 * Clear all form fields.
			 * @return {void}
			 */
			const clearProductPageForm = () => {
				formWrapper.querySelectorAll('.gift_receiver_email, .gift_receiver_message, .gift_sending_date_time, .gift_sending_timestamp').forEach(input => input.value = '');
				formWrapper.querySelectorAll('.wc-sc-person-schedule-toggle').forEach(toggle => toggle.checked = false);
				formWrapper.querySelectorAll('.email_sending_date_time_wrapper').forEach(wrapper => wrapper.style.display = 'none');
			};

			// Save to session on form submit.
			const addToCartForm = formWrapper.closest('form.cart');
			if (addToCartForm) {
				addToCartForm.addEventListener('submit', () => {
					const dataObj = collectFormData();

					// Build data string.
					let dataString = 'wc_sc_schedule_gift_sending=' + encodeURIComponent(dataObj.wc_sc_schedule_gift_sending || 'no');
					['gift_receiver_email', 'gift_receiver_message', 'gift_sending_date_time', 'gift_sending_timestamp'].forEach(fieldType => {
						Object.keys(dataObj[fieldType]).forEach(couponId => {
							Object.keys(dataObj[fieldType][couponId]).forEach(personIndex => {
								const value = dataObj[fieldType][couponId][personIndex];
								if (value && value.trim()) {
									dataString += '&' + fieldType + '[' + couponId + '][' + personIndex + ']=' + encodeURIComponent(value.trim());
								}
							});
						});
					});

					// Save to session (synchronous).
					const xhr = new XMLHttpRequest();
					xhr.open('POST', ajaxUrl, false);
					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					xhr.send('action=wc_sc_save_product_page_coupon_receiver_details&security=' + ajaxNonce + '&product_id=' + productId + '&data=' + encodeURIComponent(dataString));
				}, true);

				// Clear form after add to cart.
				let formCleared = false;
				const handleAddedToCart = () => {
					if (formCleared) return;
					clearProductPageForm();
					formCleared = true;
				};

				document.body.addEventListener('added_to_cart', handleAddedToCart);
				if (typeof jQuery !== 'undefined') {
					jQuery(document.body).on('added_to_cart', handleAddedToCart);
				}
			}
		}

		// Initialize.
		if (!quantityInput) quantityInput = findQuantityInput();
		setupEventListeners();
		renderUI();
	}
})();
