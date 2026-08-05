function decodeLocalizedText(text) {
	const value = String(text || '');

	if (-1 === value.indexOf('&')) {
		return value;
	}

	const textarea = document.createElement('textarea');
	textarea.innerHTML = value;
	return textarea.value;
}

function getI18nValue(key) {
	if (window.scPresetData && window.scPresetData.i18n && typeof window.scPresetData.i18n[key] !== 'undefined') {
		return decodeLocalizedText(window.scPresetData.i18n[key]);
	}

	if (window.scBogoData && window.scBogoData.i18n && typeof window.scBogoData.i18n[key] !== 'undefined') {
		return decodeLocalizedText(window.scBogoData.i18n[key]);
	}

	return '';
}

function replaceI18nPlaceholder(text, value) {
	return String(text || '').replace('%s', value);
}

document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('scBogoModal') || document.getElementById('scCouponPresetModal');
	const modalBody = document.getElementById('scPresetModalBody') || (modal ? modal.querySelector('.sc-modal-content') : null);
	const templateRoot = document.getElementById('scPresetTemplates');
	const resultBox = document.getElementById('scBogoResult') || document.getElementById('scPresetResult');
	const prevButton = document.getElementById('scStepPrev');
	const nextButton = document.getElementById('scStepNext');
	const generateButton = document.getElementById('scGenerateBogo');

	if (!modal || !modalBody || !resultBox || !prevButton || !nextButton || !generateButton) {
		return;
	}

	let currentPreset = 'bogo';
	let currentStep = 1;
	let totalSteps = 1;
	let isGenerating = false;
	let bogoCouponGenerated = false;
	let resultHighlightTimer = null;
	let sellGiftCardState = getDefaultSellGiftCardState();
	const modalScrollArea = modal.querySelector('.sc-modal-scroll');

	function resetModalScroll() {
		modal.scrollTop = 0;

		if (modalScrollArea) {
			modalScrollArea.scrollTop = 0;
		}
	}

	document.addEventListener('click', function (event) {
		const trigger = getClosest(event.target, '[data-sc-open-preset]');

		if (trigger || event.target.id === 'scOpenBogoPopup') {
			const presetKey = trigger ? String(trigger.getAttribute('data-sc-preset') || '').trim() : 'bogo';
			openModal(presetKey || 'bogo');
			return;
		}

		if ('sell_gift_card' === currentPreset && handleSellGiftCardClick(event)) {
			return;
		}

		if (event.target.classList.contains('sc-close')) {
			closeModal();
			return;
		}

		if (event.target.id === 'scStepNext') {
			goNext();
			return;
		}

		if (event.target.id === 'scStepPrev') {
			goPrevious();
			return;
		}

		if (event.target.id === 'scGenerateBogo') {
			handleGenerate();
		}
	});

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeModal();
		}
	});

	function openModal(presetKey) {
		currentPreset = presetKey;
		bogoCouponGenerated = false;
		loadPresetTemplate(currentPreset);
		currentStep = 1;
		updateWizard();
		resetResultState();
		document.body.classList.add('sc-preset-popup-open');
		document.documentElement.classList.add('sc-preset-popup-open');
		modal.style.display = 'flex';
		resetModalScroll();
	}

	// Allow external UI triggers (for example, preset dropdowns) to open the modal reliably.
	window.scOpenPresetModal = openModal;

	function closeModal() {
		document.body.classList.remove('sc-preset-popup-open');
		document.documentElement.classList.remove('sc-preset-popup-open');
		modal.style.display = 'none';
	}

	function loadPresetTemplate(presetKey) {
		if (!templateRoot) {
			return;
		}

		const templateNode = templateRoot.querySelector('[data-sc-preset-template="' + escapeSelectorValue(presetKey) + '"]');

		if (!templateNode) {
			showError(getI18nValue('coupon_failed'));
			return;
		}

		modalBody.innerHTML = templateNode.innerHTML;
		delete modalBody.dataset.scBogoDirtyListeners;

		const stepPanels = Array.from(modalBody.querySelectorAll('.sc-step-panel'));
		totalSteps = stepPanels.length > 0 ? stepPanels.length : 1;

		initProductSearchFields(modalBody);
		initModalSelectFields(modalBody);
		initCustomModalSelectFields(modalBody);
		initBogoValidationClearListeners(modalBody);
		initBogoDiscountAmountLimits(modalBody);
		initAutoApplyVisibility(modalBody);
		initBuyProductQuantityRestrictions(modalBody);
		initSellGiftCardPreset(modalBody);
		initBogoGenerateChangeListeners(modalBody);
	}

	function goNext() {
		if ('sell_gift_card' === currentPreset && handleSellGiftCardNext()) {
			return;
		}

		if (!validateStep(currentStep)) {
			return;
		}

		if (currentStep < totalSteps) {
			currentStep += 1;
			resetResultState();
			updateWizard();
		}
	}

	function goPrevious() {
		if ('sell_gift_card' === currentPreset && handleSellGiftCardPrevious()) {
			return;
		}

		if (currentStep > 1) {
			currentStep -= 1;
			resetResultState();
			updateWizard();
		}
	}

	function updateWizard() {
		const stepPanels = Array.from(modalBody.querySelectorAll('.sc-step-panel'));
		const stepItems = Array.from(modalBody.querySelectorAll('.sc-stepper-item'));

		stepPanels.forEach(function (panel) {
			const step = parseInt(panel.getAttribute('data-step'), 10);
			panel.classList.toggle('is-active', step === currentStep);
		});

		stepItems.forEach(function (item) {
			const step = parseInt(item.getAttribute('data-step'), 10);
			item.classList.toggle('is-active', step === currentStep);
			item.classList.toggle('is-done', step < currentStep);
		});

		if ('sell_gift_card' === currentPreset) {
			if (2 === currentStep && sellGiftCardState.result) {
				renderSellGiftCardSuccess(sellGiftCardState.result);
			}
			updateSellGiftCardActions();
			resetModalScroll();
			return;
		}

		prevButton.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
		nextButton.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
		generateButton.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
		updateBogoGenerateButtonState();
		resetModalScroll();
	}

	function updateBogoGenerateButtonState() {
		if ('bogo' !== currentPreset || isGenerating) {
			return;
		}

		generateButton.disabled = bogoCouponGenerated;
		generateButton.textContent = bogoCouponGenerated
			? getI18nValue('coupon_generated_button')
			: getI18nValue('generate_button');
	}

	function markBogoPresetDirty() {
		if ('bogo' !== currentPreset || !bogoCouponGenerated) {
			return;
		}

		bogoCouponGenerated = false;
		updateBogoGenerateButtonState();
		resetResultState();
	}

	function validateStep(step) {
		if ('sell_gift_card' === currentPreset) {
			return validateSellGiftCardStep(step);
		}

		if ('bogo' !== currentPreset) {
			return true;
		}

		if (1 === step) {
			const buyProductField = modalBody.querySelector('#sc_buy_product_id');
			if (!buyProductField || getSelectedValues(buyProductField).length < 1) {
				showError(getI18nValue('select_buy_product'));
				return false;
			}
		}

		if (2 === step) {
			const getProductField = modalBody.querySelector('#sc_product_id');
			if (!getProductField || getSelectedValues(getProductField).length < 1) {
				showError(getI18nValue('select_get_product'));
				return false;
			}

			const discountAmountField = modalBody.querySelector('#sc_discount_amount');
			const discountTypeField = modalBody.querySelector('#sc_discount_type');
			const discountType = discountTypeField ? String(discountTypeField.value || '').trim() : '';
			const discountAmount = discountAmountField ? Number(discountAmountField.value) : NaN;

			if ('percent' === discountType && (Number.isNaN(discountAmount) || discountAmount < 0 || discountAmount > 100)) {
				showError(getI18nValue('valid_percent_discount'));
				return false;
			}
		}

		return true;
	}

	function handleGenerate() {
		if ('sell_gift_card' === currentPreset) {
			handleSellGiftCardGenerate();
			return;
		}

		if (isGenerating || bogoCouponGenerated || !validateStep(totalSteps)) {
			return;
		}

		isGenerating = true;
		generateButton.disabled = true;
		generateButton.textContent = getI18nValue('generate_in_progress');
		resultBox.innerHTML = escapeHtml(getI18nValue('generating_coupon'));
		resultBox.className = 'sc-bogo-result is-info';

		const codeField = modalBody.querySelector('#sc_bogo_code');

		createCouponWithPreset(
			{
				code: codeField ? String(codeField.value).trim() : '',
				discount_type: 'fixed_product',
				amount: '0'
			},
			function () {
				return buildPresetPayload(currentPreset, modalBody);
			}
		)
			.then(function (response) {
				resultBox.className = 'sc-bogo-result is-success';
				resultBox.innerHTML =
					'<p><strong>' +
					escapeHtml(getI18nValue('coupon_created')) +
					'</strong> <span class="sc-bogo-result__code">' +
					escapeHtml(response.code || '') +
					'</span>' +
					'</p>';
				highlightGeneratedCoupon();
				bogoCouponGenerated = true;
			})
			.catch(function (error) {
				showError(error && error.message ? error.message : getI18nValue('coupon_failed'));
			})
			.finally(function () {
				isGenerating = false;
				updateBogoGenerateButtonState();
			});
	}

	function showError(message) {
		resultBox.className = 'sc-bogo-result is-error';
		resultBox.innerHTML = '<p>' + escapeHtml(message) + '</p>';
		resultBox.style.display = '';
		resultBox.setAttribute('role', 'alert');

		window.requestAnimationFrame(function () {
			if (modalScrollArea) {
				modalScrollArea.scrollTop = modalScrollArea.scrollHeight;
				return;
			}

			const footer = modal.querySelector('.sc-modal-footer');

			if (footer) {
				footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}

			modal.scrollTop = modal.scrollHeight;
		});
	}

	function resetResultState() {
		if (resultHighlightTimer) {
			window.clearTimeout(resultHighlightTimer);
			resultHighlightTimer = null;
		}
		resultBox.className = 'sc-bogo-result';
		resultBox.innerHTML = '';
		resultBox.style.display = '';
		resultBox.removeAttribute('role');
	}

	function tryClearValidationError() {
		if (!resultBox.classList.contains('is-error') || 'bogo' !== currentPreset) {
			return;
		}

		if (1 === currentStep) {
			const buyProductField = modalBody.querySelector('#sc_buy_product_id');

			if (buyProductField && getSelectedValues(buyProductField).length >= 1) {
				resetResultState();
			}

			return;
		}

		if (2 === currentStep) {
			const getProductField = modalBody.querySelector('#sc_product_id');
			const discountAmountField = modalBody.querySelector('#sc_discount_amount');
			const discountTypeField = modalBody.querySelector('#sc_discount_type');
			const discountType = discountTypeField ? String(discountTypeField.value || '').trim() : '';
			const discountAmount = discountAmountField ? Number(discountAmountField.value) : NaN;
			const hasValidGiftProducts = getProductField && getSelectedValues(getProductField).length >= 1;
			const hasValidPercentDiscount = 'percent' !== discountType || (!Number.isNaN(discountAmount) && discountAmount >= 0 && discountAmount <= 100);

			if (hasValidGiftProducts && hasValidPercentDiscount) {
				resetResultState();
			}

			return;
		}
	}

	function initBogoValidationClearListeners(scopeNode) {
		const root = scopeNode || modalBody;

		if (!root) {
			return;
		}

		if (window.jQuery) {
			const $ = window.jQuery;
			const $buyField = $('#sc_buy_product_id', root);
			const $getField = $('#sc_product_id', root);

			$buyField.add($getField).on('select2:select select2:unselect select2:clear change', tryClearValidationError);
		}

		const discountAmountField = root.querySelector('#sc_discount_amount');

		if (discountAmountField) {
			discountAmountField.addEventListener('input', tryClearValidationError);
			discountAmountField.addEventListener('change', tryClearValidationError);
		}
	}

	function initBogoDiscountAmountLimits(scopeNode) {
		const root = scopeNode || modalBody;

		if (!root) {
			return;
		}

		const discountAmountField = root.querySelector('#sc_discount_amount');
		const discountTypeField = root.querySelector('#sc_discount_type');

		if (!discountAmountField || !discountTypeField) {
			return;
		}

		const applyDiscountAmountLimits = function () {
			const isPercent = 'percent' === String(discountTypeField.value || '').trim();

			if (isPercent) {
				discountAmountField.setAttribute('max', '100');
				discountAmountField.setAttribute('step', '0.01');

				const currentValue = Number(discountAmountField.value);

				if ('' !== String(discountAmountField.value || '').trim() && Number.isFinite(currentValue) && currentValue > 100) {
					discountAmountField.value = '100';
				}
			} else {
				discountAmountField.removeAttribute('max');
			}
		};

		const clampDiscountAmount = function () {
			if ('percent' !== String(discountTypeField.value || '').trim()) {
				return;
			}

			const currentValue = Number(discountAmountField.value);

			if ('' === String(discountAmountField.value || '').trim() || !Number.isFinite(currentValue)) {
				return;
			}

			if (currentValue > 100) {
				discountAmountField.value = '100';
			} else if (currentValue < 0) {
				discountAmountField.value = '0';
			}
		};

		discountTypeField.addEventListener('change', applyDiscountAmountLimits);
		discountAmountField.addEventListener('input', clampDiscountAmount);
		discountAmountField.addEventListener('change', clampDiscountAmount);
		applyDiscountAmountLimits();
	}

	function initBogoGenerateChangeListeners(scopeNode) {
		const root = scopeNode || modalBody;

		if (!root || root.dataset.scBogoDirtyListeners) {
			return;
		}

		root.dataset.scBogoDirtyListeners = '1';

		const markDirty = function () {
			markBogoPresetDirty();
		};

		const fieldSelectors = [
			'#sc_buy_product_id',
			'#sc_product_id',
			'#sc_quantity',
			'#sc_discount_amount',
			'#sc_discount_type',
			'#wc_sc_no_of_selectable_product',
			'#sc_bogo_code',
			'#wc_sc_auto_apply_coupon'
		];

		fieldSelectors.forEach(function (selector) {
			const field = root.querySelector(selector);

			if (!field) {
				return;
			}

			field.addEventListener('input', markDirty);
			field.addEventListener('change', markDirty);
		});

		const restrictionRows = root.querySelector('#sc_product_qty_restrictions_rows');

		if (restrictionRows) {
			restrictionRows.addEventListener('input', markDirty);
			restrictionRows.addEventListener('change', markDirty);
		}

		if (window.jQuery) {
			const $ = window.jQuery;
			$('#sc_buy_product_id, #sc_product_id', root).on('select2:select select2:unselect select2:clear change', markDirty);
		}
	}

	function highlightGeneratedCoupon() {
		resultBox.classList.add('is-highlighted');
		resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

		if (resultHighlightTimer) {
			window.clearTimeout(resultHighlightTimer);
		}

		resultHighlightTimer = window.setTimeout(function () {
			resultBox.classList.remove('is-highlighted');
			resultHighlightTimer = null;
		}, 2600);
	}

	function initProductSearchFields(scopeNode) {
		if (!window.jQuery) {
			return;
		}

		const $ = window.jQuery;
		const $scope = scopeNode ? $(scopeNode) : $(document);
		const $fields = $scope.find('.select2_search_products_coupons');

		if ($fields.length < 1) {
			return;
		}

		$fields.each(function () {
			const $field = $(this);
			const fieldElement = $field.get(0);
			if ($field.data('select2') || $field.data('selectWoo')) {
				return;
			}

			if (fieldElement && fieldElement.style && 'none' === fieldElement.style.display) {
				fieldElement.style.display = '';
			}

			$field.removeClass('select2-hidden-accessible');
			$field.removeAttr('data-select2-id');
			$field.removeAttr('aria-hidden');
			$field.removeAttr('tabindex');
			$field.next('.select2, .select2-container').remove();

			const selectArgs = {
				allowClear: !!$field.data('allow_clear'),
				placeholder: $field.data('placeholder') || '',
				minimumInputLength: parseInt($field.data('minimum_input_length'), 10) || 3,
				dropdownParent: $(modal),
				escapeMarkup: function (markup) {
					return markup;
				},
				ajax: {
					url: (window.wc_enhanced_select_params && window.wc_enhanced_select_params.ajax_url) || window.ajaxurl,
					dataType: 'json',
					delay: 250,
					data: function (params) {
						return {
							term: params.term,
							action: $field.data('action') || 'woocommerce_json_search_products_and_variations',
							security: $field.data('security') || ''
						};
					},
					processResults: function (data) {
						const terms = [];
						if (data) {
							Object.keys(data).forEach(function (id) {
								terms.push({ id: id, text: data[id] });
							});
						}
						return { results: terms };
					},
					cache: true
				}
			};

			if (true === $field.data('multiple') || $field.prop('multiple')) {
				selectArgs.multiple = true;
			}

			if (window.wc_enhanced_select_params) {
				selectArgs.language = {
					noResults: function () {
						return window.wc_enhanced_select_params.i18n_no_matches;
					},
					errorLoading: function () {
						return window.wc_enhanced_select_params.i18n_ajax_error;
					},
					inputTooShort: function (args) {
						const remainingChars = args.minimum - args.input.length;
						if (1 === remainingChars) {
							return window.wc_enhanced_select_params.i18n_input_too_short_1;
						}
						return window.wc_enhanced_select_params.i18n_input_too_short_n.replace('%qty%', remainingChars);
					},
					inputTooLong: function (args) {
						const overChars = args.input.length - args.maximum;
						if (1 === overChars) {
							return window.wc_enhanced_select_params.i18n_input_too_long_1;
						}
						return window.wc_enhanced_select_params.i18n_input_too_long_n.replace('%qty%', overChars);
					},
					maximumSelected: function (args) {
						if (1 === args.maximum) {
							return window.wc_enhanced_select_params.i18n_selection_too_long_1;
						}
						return window.wc_enhanced_select_params.i18n_selection_too_long_n.replace('%qty%', args.maximum);
					},
					loadingMore: function () {
						return window.wc_enhanced_select_params.i18n_load_more;
					},
					searching: function () {
						return window.wc_enhanced_select_params.i18n_searching;
					}
				};
			}

			if ('function' === typeof $field.selectWoo) {
				$field.selectWoo(selectArgs);
			} else if ('function' === typeof $field.select2) {
				$field.select2(selectArgs);
			} else {
				return;
			}
		});
	}

	function getModalDropdownParent() {
		if (!window.jQuery) {
			return null;
		}

		return window.jQuery(document.body);
	}

	function destroyModalSelectField($field) {
		if (!$field || !window.jQuery) {
			return;
		}

		if ($field.data('select2')) {
			try {
				$field.select2('destroy');
			} catch (e) {
				// Ignore destroy errors from stale Select2 instances.
			}
		}

		if ($field.data('selectWoo') && 'function' === typeof $field.selectWoo) {
			try {
				$field.selectWoo('destroy');
			} catch (e) {
				// Ignore destroy errors from stale SelectWoo instances.
			}
		}

		$field.removeClass('select2-hidden-accessible');
		$field.removeAttr('data-select2-id');
		$field.removeAttr('aria-hidden');
		$field.removeAttr('tabindex');
		$field.next('.select2, .select2-container').remove();
	}

	function initModalSelectFields(scopeNode) {
		if (!window.jQuery) {
			return;
		}

		const $ = window.jQuery;
		const $scope = scopeNode ? $(scopeNode) : $(document);
		const $fields = $scope.find('select').not('.select2_search_products_coupons').not('.sc-custom-modal-select');
		const $dropdownParent = getModalDropdownParent();

		if (!$dropdownParent) {
			return;
		}

		$scope.find('.sc-custom-modal-select').each(function () {
			destroyModalSelectField(window.jQuery(this));
		});

		if ($fields.length < 1) {
			return;
		}

		$fields.each(function () {
			const $field = $(this);

			destroyModalSelectField($field);

			const selectArgs = {
				allowClear: false,
				minimumResultsForSearch: Infinity,
				dropdownParent: $dropdownParent,
				dropdownCssClass: 'sc-preset-select2-dropdown',
				width: '100%'
			};

			if ('function' === typeof $field.selectWoo) {
				$field.selectWoo(selectArgs);
			} else if ('function' === typeof $field.select2) {
				$field.select2(selectArgs);
			}
		});
	}

	function getClosest(element, selector) {
		if (!element) {
			return null;
		}

		if ('function' === typeof element.closest) {
			return element.closest(selector);
		}

		if (window.jQuery && element.nodeType) {
			const matched = window.jQuery(element).closest(selector);
			return matched.length > 0 ? matched.get(0) : null;
		}

		return null;
	}

	function initAutoApplyVisibility(scopeNode) {
		const root = scopeNode || modalBody;
		if (!root) {
			return;
		}

		const discountTypeField = root.querySelector('#sc_bogo_discount_type');
		const autoApplyRow = root.querySelector('#sc_auto_apply_row');
		const autoApplyField = root.querySelector('#wc_sc_auto_apply_coupon');

		if (!discountTypeField || !autoApplyRow || !autoApplyField) {
			return;
		}

		const toggleAutoApply = function () {
			const isSmartCoupon = 'smart_coupon' === String(discountTypeField.value || '').trim();

			if (isSmartCoupon) {
				autoApplyRow.style.display = 'none';
				autoApplyField.checked = false;
				return;
			}

			autoApplyRow.style.display = '';
		};

		discountTypeField.addEventListener('change', toggleAutoApply);
		toggleAutoApply();
	}

	function initBuyProductQuantityRestrictions(scopeNode) {
		const root = scopeNode || modalBody;
		if (!root) {
			return;
		}

		const buyProductField = root.querySelector('#sc_buy_product_id');
		let wrapper = root.querySelector('#sc_product_qty_restrictions_field');
		let rowsContainer = root.querySelector('#sc_product_qty_restrictions_rows');

		if (!buyProductField) {
			return;
		}

		// Fallback: build the restrictions UI from JS in case older cached template markup is loaded.
		if (!wrapper || !rowsContainer) {
			const buyProductFieldWrapper = buyProductField.closest('.sc-field');
			if (!buyProductFieldWrapper || !buyProductFieldWrapper.parentNode) {
				return;
			}

			wrapper = document.createElement('div');
			wrapper.className = 'sc-field sc-full-width sc-buy-qty-restrictions-wrap';
			wrapper.id = 'sc_product_qty_restrictions_field';
			wrapper.style.display = 'none';
			wrapper.innerHTML =
				'<label class="sc-product-qty-restrictions__label">' +
				'<span>' + escapeHtml(getI18nValue('buy_product_qty_restrictions')) + '</span>' +
				'</label>' +
				'<div class="sc-product-qty-restrictions__panel">' +
				'<div class="sc-product-qty-restrictions__head">' +
				'<span>' + escapeHtml(getI18nValue('product')) + '</span><span>' + escapeHtml(getI18nValue('min')) + '</span><span>' + escapeHtml(getI18nValue('max')) + '</span>' +
				'</div>' +
				'<div id="sc_product_qty_restrictions_rows" class="sc-product-qty-restrictions__rows"></div>' +
				'</div>';

			buyProductFieldWrapper.parentNode.appendChild(wrapper);
			rowsContainer = wrapper.querySelector('#sc_product_qty_restrictions_rows');
		}

		const getSelectedProductIds = function () {
			const ids = [];

			getSelectedValues(buyProductField).forEach(function (id) {
				if (ids.indexOf(id) < 0) {
					ids.push(id);
				}
			});

			if (window.jQuery) {
				try {
					const $field = window.jQuery(buyProductField);
					const selectedData = $field.select2 ? $field.select2('data') : [];
					if (Array.isArray(selectedData)) {
						selectedData.forEach(function (item) {
							if (!item || typeof item.id === 'undefined') {
								return;
							}
							const id = String(item.id).trim();
							if ('' !== id && ids.indexOf(id) < 0) {
								ids.push(id);
							}
						});
					}
				} catch (e) {
					// Ignore Select2 access issues and continue with available values.
				}
			}

			return ids;
		};

		const getSelectedProductMap = function () {
			const map = {};
			const selectedIds = getSelectedProductIds();

			if (buyProductField.selectedOptions && buyProductField.selectedOptions.length > 0) {
				Array.from(buyProductField.selectedOptions).forEach(function (option) {
					const id = String(option.value || '').trim();
					if ('' !== id) {
						map[id] = String(option.text || option.innerText || '').trim();
					}
				});
			}

			if (window.jQuery) {
				try {
					const $field = window.jQuery(buyProductField);
					const selectedData = $field.select2 ? $field.select2('data') : [];
					if (Array.isArray(selectedData)) {
						selectedData.forEach(function (item) {
							if (!item || typeof item.id === 'undefined') {
								return;
							}

							const id = String(item.id).trim();
							if ('' !== id && !map[id]) {
								map[id] = String(item.text || '').trim();
							}
						});
					}
				} catch (e) {
					// Ignore select2 access errors and use fallback product labels.
				}
			}

			selectedIds.forEach(function (id) {
				if (!map[id]) {
					map[id] = replaceI18nPlaceholder(getI18nValue('product_number'), id);
				}
			});

			return map;
		};

		const readExistingValues = function () {
			const values = {};
			const existingRows = Array.from(rowsContainer.querySelectorAll('.sc-product-qty-row'));

			existingRows.forEach(function (row) {
				const productId = String(row.getAttribute('data-product-id') || '').trim();
				if ('' === productId) {
					return;
				}

				const minField = row.querySelector('.sc-product-qty-min');
				const maxField = row.querySelector('.sc-product-qty-max');

				values[productId] = {
					min: minField ? String(minField.value || '').trim() : '',
					max: maxField ? String(maxField.value || '').trim() : ''
				};
			});

			return values;
		};

		const renderRows = function () {
			const selectedIds = getSelectedProductIds();
			const labelsById = getSelectedProductMap();
			const existingValues = readExistingValues();

			rowsContainer.innerHTML = '';

			if (selectedIds.length < 1) {
				wrapper.style.display = 'none';
				return;
			}

			selectedIds.forEach(function (productId, index) {
				const row = document.createElement('div');
				row.className = 'sc-product-qty-row';
				row.setAttribute('data-product-id', productId);

				const productLabel = document.createElement('span');
				productLabel.className = 'sc-product-qty-product';
				productLabel.textContent = labelsById[productId] || replaceI18nPlaceholder(getI18nValue('product_number'), productId);

				const minField = document.createElement('input');
				minField.type = 'number';
				minField.min = '0';
				minField.className = 'sc-product-qty-min';
				minField.value = existingValues[productId] ? existingValues[productId].min : '';

				const maxField = document.createElement('input');
				maxField.type = 'number';
				maxField.min = '0';
				maxField.className = 'sc-product-qty-max';
				maxField.value = existingValues[productId] ? existingValues[productId].max : '';

				row.appendChild(productLabel);
				row.appendChild(minField);
				row.appendChild(maxField);

				rowsContainer.appendChild(row);

				if (index < selectedIds.length - 1) {
					const divider = document.createElement('div');
					divider.className = 'sc-product-qty-divider';
					divider.setAttribute('aria-hidden', 'true');
					divider.innerHTML = '<span>' + escapeHtml(getI18nValue('or')) + '</span>';
					rowsContainer.appendChild(divider);
				}
			});

			wrapper.style.display = '';
		};

		buyProductField.addEventListener('change', renderRows);
		buyProductField.addEventListener('input', renderRows);

		if (window.jQuery) {
			const $buyProductField = window.jQuery(buyProductField);
			$buyProductField.on('select2:select select2:unselect select2:clear change', renderRows);
			window.jQuery(document).on('select2:select select2:unselect select2:clear', '#sc_buy_product_id', renderRows);
		}

		renderRows();
		setTimeout(renderRows, 100);
		setTimeout(renderRows, 400);
	}

	function getDefaultSellGiftCardState() {
		return {
			pricingType: 'custom',
			result: null
		};
	}

	function initSellGiftCardPreset(scopeNode) {
		const root = scopeNode || modalBody;
		const presetRoot = root ? root.querySelector('[data-sc-preset="sell_gift_card"]') : null;

		if (!presetRoot) {
			return;
		}

		sellGiftCardState = getDefaultSellGiftCardState();
		initSellGiftCardMediaUploader(presetRoot);
		initSellGiftCardLivePreview(presetRoot);
		updateSellGiftCardPricingType();
		updateSellGiftCardPreviews();
	}

	function handleSellGiftCardClick(event) {
		const publishProduct = getClosest(event.target, '[data-sgc-publish-product]');
		if (publishProduct) {
			event.preventDefault();
			publishSellGiftCardProduct(publishProduct);
			return true;
		}

		return false;
	}

	function handleSellGiftCardNext() {
		return false;
	}

	function handleSellGiftCardPrevious() {
		if (2 === currentStep) {
			currentStep = 1;
			resetResultState();
			updateWizard();
			return true;
		}

		return false;
	}

	function updateSellGiftCardActions() {
		modalBody.classList.toggle('is-sgc-success-step', 2 === currentStep);
		resultBox.style.display = currentStep === 2 ? 'none' : '';
		prevButton.style.visibility = 'hidden';
		prevButton.textContent = getI18nValue('previous');
		nextButton.style.display = 'none';
		generateButton.textContent = getSellGiftCardLabeledText('sgc_create_button');
		generateButton.style.display = currentStep === 1 ? 'inline-flex' : 'none';

		if (2 === currentStep) {
			generateButton.style.display = 'none';
		}

		updateSellGiftCardHeader();
	}

	function updateSellGiftCardHeader() {
		const title = modalBody.querySelector('.sc-wizard-header h2');
		const subtitle = modalBody.querySelector('.sc-wizard-header p');

		if (!title || !subtitle) {
			return;
		}

		const titleText = getSellGiftCardTitle();

		if (2 === currentStep) {
			title.textContent = getI18nValue('sgc_almost_done_title');
			subtitle.textContent = getI18nValue('sgc_subtitle_done');
			return;
		}

		title.textContent = toPopupTitleCase(titleText);
		subtitle.textContent = getSellGiftCardPluralLabeledText('sgc_subtitle');
	}

	function validateSellGiftCardStep(step) {
		if (1 !== step) {
			return true;
		}

		const pricingType = getSellGiftCardPricingType();

		if ('fixed' === pricingType) {
			const amountField = modalBody.querySelector('#sc_sgc_fixed_amount');
			if (!amountField || '' === String(amountField.value || '').trim() || Number(amountField.value) < 0) {
				showError(getSellGiftCardLabeledText('sgc_amount'));
				return false;
			}
			return true;
		}

		if ('variable' === pricingType) {
			if (getSellGiftCardVariationRows().length < 1) {
				showError(getI18nValue('sgc_amounts'));
				return false;
			}
			return true;
		}

		if (['custom', 'fixed', 'variable'].indexOf(pricingType) < 0) {
			showError(getSellGiftCardLabeledText('sgc_product_type'));
			return false;
		}

		return true;
	}

	function initCustomModalSelectFields(scopeNode) {
		const root = scopeNode || modalBody;

		if (!root) {
			return;
		}

		root.querySelectorAll('select.sc-custom-modal-select').forEach(function (select) {
			initCustomModalSelectDropdown(select);
		});
	}

	function initCustomModalSelectDropdown(select) {
		if (!select || '1' === select.dataset.scCustomSelect) {
			return;
		}

		const field = select.closest('.sc-field');

		if (!field) {
			return;
		}

		const label = select.id ? field.querySelector('label[for="' + escapeSelectorValue(select.id) + '"]') : null;
		const wrapper = document.createElement('div');
		const triggerId = select.id ? select.id + '_trigger' : 'sc_custom_select_trigger_' + String(Date.now());
		let outsideClickHandler = null;
		let focusedOptionIndex = -1;

		wrapper.className = 'sc-custom-select';
		select.parentNode.insertBefore(wrapper, select);
		wrapper.appendChild(select);

		select.classList.add('sc-custom-select-native');
		select.tabIndex = -1;
		select.setAttribute('aria-hidden', 'true');

		const trigger = document.createElement('button');
		trigger.type = 'button';
		trigger.id = triggerId;
		trigger.className = 'sc-custom-select-trigger';
		trigger.setAttribute('aria-haspopup', 'listbox');
		trigger.setAttribute('aria-expanded', 'false');

		if (label) {
			if (!label.id) {
				label.id = select.id + '_label';
			}

			label.setAttribute('for', triggerId);
			trigger.setAttribute('aria-labelledby', label.id);
		}

		const valueEl = document.createElement('span');
		valueEl.className = 'sc-custom-select-value';

		const iconEl = document.createElement('span');
		iconEl.className = 'sc-custom-select-icon';
		iconEl.setAttribute('aria-hidden', 'true');

		trigger.appendChild(valueEl);
		trigger.appendChild(iconEl);

		const menu = document.createElement('ul');
		menu.className = 'sc-custom-select-menu';
		menu.setAttribute('role', 'listbox');
		menu.hidden = true;

		if (label) {
			menu.setAttribute('aria-labelledby', label.id);
		}

		Array.from(select.options).forEach(function (option) {
			const item = document.createElement('li');
			item.className = 'sc-custom-select-option';
			item.setAttribute('role', 'option');
			item.dataset.value = option.value;
			item.textContent = option.textContent;
			menu.appendChild(item);
		});

		wrapper.appendChild(trigger);
		wrapper.appendChild(menu);

		function getOptionItems() {
			return Array.from(menu.querySelectorAll('.sc-custom-select-option'));
		}

		function syncCustomModalSelectDropdown() {
			const selected = select.options[select.selectedIndex];
			valueEl.textContent = selected ? selected.textContent : '';

			getOptionItems().forEach(function (item) {
				const isSelected = item.dataset.value === select.value;
				item.classList.toggle('is-selected', isSelected);
				item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
			});
		}

		function setFocusedOption(index) {
			const items = getOptionItems();
			focusedOptionIndex = index;

			items.forEach(function (item, itemIndex) {
				item.classList.toggle('is-focused', itemIndex === focusedOptionIndex);
			});
		}

		function closeMenu() {
			wrapper.classList.remove('is-open');
			trigger.setAttribute('aria-expanded', 'false');
			menu.hidden = true;
			setFocusedOption(-1);

			if (outsideClickHandler) {
				document.removeEventListener('click', outsideClickHandler);
				outsideClickHandler = null;
			}
		}

		function openMenu() {
			const items = getOptionItems();
			const selectedIndex = items.findIndex(function (item) {
				return item.dataset.value === select.value;
			});

			wrapper.classList.add('is-open');
			trigger.setAttribute('aria-expanded', 'true');
			menu.hidden = false;
			setFocusedOption(selectedIndex >= 0 ? selectedIndex : 0);

			outsideClickHandler = function (event) {
				if (!wrapper.contains(event.target)) {
					closeMenu();
				}
			};

			document.addEventListener('click', outsideClickHandler);
		}

		function toggleMenu() {
			if (wrapper.classList.contains('is-open')) {
				closeMenu();
				return;
			}

			openMenu();
		}

		function selectValue(value) {
			select.value = value;
			syncCustomModalSelectDropdown();
			closeMenu();
			trigger.focus();
			select.dispatchEvent(new Event('change', { bubbles: true }));
		}

		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			toggleMenu();
		});

		trigger.addEventListener('keydown', function (event) {
			const items = getOptionItems();

			if ('ArrowDown' === event.key) {
				event.preventDefault();

				if (!wrapper.classList.contains('is-open')) {
					openMenu();
					return;
				}

				const nextIndex = focusedOptionIndex < items.length - 1 ? focusedOptionIndex + 1 : 0;
				setFocusedOption(nextIndex);
				return;
			}

			if ('ArrowUp' === event.key) {
				event.preventDefault();

				if (!wrapper.classList.contains('is-open')) {
					openMenu();
					return;
				}

				const prevIndex = focusedOptionIndex > 0 ? focusedOptionIndex - 1 : items.length - 1;
				setFocusedOption(prevIndex);
				return;
			}

			if ('Enter' === event.key || ' ' === event.key) {
				event.preventDefault();

				if (!wrapper.classList.contains('is-open')) {
					openMenu();
					return;
				}

				if (focusedOptionIndex >= 0 && items[focusedOptionIndex]) {
					selectValue(items[focusedOptionIndex].dataset.value);
				}
				return;
			}

			if ('Escape' === event.key) {
				event.preventDefault();
				closeMenu();
			}
		});

		menu.addEventListener('click', function (event) {
			const option = getClosest(event.target, '.sc-custom-select-option');

			if (option) {
				selectValue(option.dataset.value);
			}
		});

		menu.addEventListener('mousemove', function (event) {
			const option = getClosest(event.target, '.sc-custom-select-option');

			if (!option) {
				return;
			}

			const items = getOptionItems();
			const hoverIndex = items.indexOf(option);

			if (hoverIndex >= 0) {
				setFocusedOption(hoverIndex);
			}
		});

		if (label) {
			label.addEventListener('click', function () {
				window.requestAnimationFrame(function () {
					if (!wrapper.classList.contains('is-open')) {
						openMenu();
					}
				});
			});
		}

		select.dataset.scCustomSelect = '1';
		syncCustomModalSelectDropdown();
	}

	function initSellGiftCardLivePreview(root) {
		Array.from(root.querySelectorAll('input, select')).forEach(function (field) {
			field.addEventListener('input', updateSellGiftCardPreviews);
			field.addEventListener('change', updateSellGiftCardPreviews);
		});

		const pricingTypeField = root.querySelector('#sc_sgc_pricing_type');
		if (pricingTypeField) {
			pricingTypeField.addEventListener('change', function () {
				updateSellGiftCardPricingType();
				updateSellGiftCardPreviews();
			});
		}
	}

	function initSellGiftCardMediaUploader(root) {
		Array.from(root.querySelectorAll('[data-sgc-image-button]')).forEach(function (button) {
			button.addEventListener('click', function (event) {
				event.preventDefault();

				if (!window.wp || !window.wp.media) {
					return;
				}

				const wrapper = button.closest('.sc-field');
				const imageField = wrapper ? wrapper.querySelector('[data-sgc-image-id]') : null;
				const mediaFrame = window.wp.media({
					title: getSellGiftCardLabeledText('sgc_choose_image'),
					button: { text: getI18nValue('sgc_use_this_image') },
					multiple: false
				});

				mediaFrame.on('select', function () {
					const attachment = mediaFrame.state().get('selection').first().toJSON();
					if (imageField && attachment && attachment.id) {
						imageField.value = String(attachment.id);
					}
					if (attachment && attachment.url) {
						button.textContent = getI18nValue('sgc_image_selected');
						button.setAttribute('data-sgc-image-url', attachment.url);
					}
					updateSellGiftCardPreviews();
				});

				mediaFrame.open();
			});
		});
	}

	function updateSellGiftCardPreviews() {
		updateSellGiftCardPricingType();
		renderSellGiftCardPreview();
	}

	function renderSellGiftCardPreview() {
		const target = modalBody.querySelector('[data-sgc-preview="gift-card"]');
		if (!target) {
			return;
		}

		const pricingType = getSellGiftCardPricingType();
		const isVariable = 'variable' === pricingType;
		const label = getSellGiftCardLabel();
		const name = getFieldValue('#sc_sgc_product_name') || getSellGiftCardLabel();
		const variations = isVariable ? getSellGiftCardVariationRows() : [];
		const values = isVariable ? variations.map(function (variation) { return variation.label; }) : [];
		const prices = isVariable ? variations.map(function (variation) { return variation.price; }) : [getSellGiftCardAmount()];
		const imageUrl = getSellGiftCardSelectedImageUrl('#sc_sgc_image_id');
		const priceText = 'custom' === pricingType ? formatCurrencyAmount(0) : (isVariable ? formatAmountRange(prices) : formatCurrencyAmount(prices[0]));
		const chips = isVariable
			? '<div class="sc-sgc-chip-row">' + values.map(function (value) { return '<span>' + escapeHtml(formatAttributeValue(value)) + '</span>'; }).join('') + '</div>'
			: '';

		target.innerHTML =
			'<div class="sc-sgc-gift-art"' + (imageUrl ? ' style="background-image:url(' + escapeHtml(imageUrl) + ')"' : '') + '><span>' + escapeHtml(label.toUpperCase()) + '</span></div>' +
			'<h4>' + escapeHtml(name) + '</h4>' +
			'<strong>' + escapeHtml(priceText) + '</strong>' +
			chips;
	}

	function renderSellGiftCardVariationsPreview() {
		return;
	}

	function renderSellGiftCardReview() {
		const target = modalBody.querySelector('[data-sgc-review]');
		if (!target) {
			return;
		}

		const payload = buildSellGiftCardPayload();
		const isVariable = 'variable' === payload.product_type;
		const name = payload.product_name;
		const variations = isVariable ? payload.variations : [];
		const amountMarkup = isVariable
			? variations.map(function (variation) { return '<span class="sc-sgc-chip">' + escapeHtml(formatAttributeValue(variation.label) + ' - ' + formatCurrencyAmount(variation.price)) + '</span>'; }).join('')
			: '<strong>' + escapeHtml(formatCurrencyAmount(payload.amount)) + '</strong>';
		const typeLabel = getSellGiftCardPricingTypeLabel(payload.pricing_type);

		target.innerHTML =
			'<div class="sc-sgc-review-card"><span class="sc-sgc-mini-icon">+</span><h4>' + escapeHtml(getI18nValue('sgc_review_product')) + '</h4><p>' + escapeHtml(getI18nValue('sgc_review_product_name')) + '<br><strong>' + escapeHtml(name || getSellGiftCardLabel()) + '</strong></p><p>' + escapeHtml(getI18nValue('sgc_review_product_type')) + '<br><strong>' + escapeHtml(isVariable ? getI18nValue('sgc_review_variable_product') : getI18nValue('sgc_review_simple_product')) + '</strong></p></div>' +
			'<div class="sc-sgc-review-card"><span class="sc-sgc-mini-icon sc-sgc-mini-icon--purple">V</span><h4>' + escapeHtml(getI18nValue('sgc_review_type_amounts')) + '</h4><p>' + escapeHtml(getI18nValue('sgc_review_type')) + '<br><strong>' + escapeHtml(typeLabel) + '</strong></p><div class="sc-sgc-chip-row">' + amountMarkup + '</div>' + (isVariable ? '<p>' + escapeHtml(getI18nValue('sgc_review_total_variations')) + '<br><strong>' + escapeHtml(String(variations.length)) + '</strong></p>' : '') + '</div>' +
			'<div class="sc-sgc-review-card"><span class="sc-sgc-mini-icon">%</span><h4>' + escapeHtml(getI18nValue('sgc_review_coupons')) + '</h4><p>' + escapeHtml(getI18nValue('sgc_review_coupon_type')) + '<br><strong>' + escapeHtml(getSellGiftCardLabel()) + '</strong></p><p>' + escapeHtml(getI18nValue('sgc_review_coupon_amount')) + '<br><strong>' + escapeHtml(formatCurrencyAmount(0)) + '</strong></p><p>' + escapeHtml(getI18nValue('sgc_review_assignment')) + '<br><strong>' + escapeHtml(getI18nValue('sgc_review_linked_automatically')) + '</strong></p></div>';
	}

	function handleSellGiftCardGenerate() {
		if (isGenerating || !validateSellGiftCardStep(1)) {
			return;
		}

		isGenerating = true;
		generateButton.disabled = true;
		generateButton.textContent = getSellGiftCardLabeledText('sgc_creating');
		resultBox.innerHTML = escapeHtml(getSellGiftCardLabeledText('sgc_creating'));
		resultBox.className = 'sc-bogo-result is-info';

		createSellGiftCardPreset(buildSellGiftCardPayload())
			.then(function (response) {
				sellGiftCardState.result = response;
				renderSellGiftCardSuccess(response);
				currentStep = 2;
				resetResultState();
				updateWizard();
			})
			.catch(function (error) {
				showError(error && error.message ? error.message : getI18nValue('sgc_failed'));
			})
			.finally(function () {
				isGenerating = false;
				generateButton.disabled = false;
				generateButton.textContent = getSellGiftCardLabeledText('sgc_create_button');
			});
	}

	function createSellGiftCardPreset(payload) {
		const presetData = window.scPresetData || window.scBogoData;

		if (!presetData || !presetData.rest_url || !presetData.rest_nonce) {
			return Promise.reject(new Error(getI18nValue('coupon_api_unavailable')));
		}

		return fetch(presetData.rest_url + 'wc/v3/sc/sell-gift-card-preset', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'X-WP-Nonce': presetData.rest_nonce
			},
			body: JSON.stringify(cleanPayload(payload))
		}).then(handleApiResponse);
	}

	function buildSellGiftCardPayload() {
		const pricingType = getSellGiftCardPricingType();

		if ('variable' === pricingType) {
			return {
				pricing_type: pricingType,
				product_type: 'variable',
				product_name: getFieldValue('#sc_sgc_product_name') || getSellGiftCardLabel(),
				attribute_name: getFieldValue('#sc_sgc_attribute_name') || getI18nValue('sgc_default_attribute_name'),
				variations: getSellGiftCardVariationRows(),
				image_id: getFieldValue('#sc_sgc_image_id')
			};
		}

		return {
			pricing_type: pricingType,
			product_type: 'simple',
			product_name: getFieldValue('#sc_sgc_product_name') || getSellGiftCardLabel(),
			amount: getSellGiftCardAmount(),
			image_id: getFieldValue('#sc_sgc_image_id')
		};
	}

	function isSellGiftCardProductPublished(response) {
		return response && 'publish' === response.status;
	}

	function getSellGiftCardProductLink(response) {
		if (isSellGiftCardProductPublished(response)) {
			return {
				url: response.view_url || '',
				label: getI18nValue('sgc_view_product')
			};
		}

		return {
			url: (response && response.preview_url) || (response && response.view_url) || '',
			label: getI18nValue('sgc_preview_product')
		};
	}

	function renderSellGiftCardActions(response) {
		const actions = modalBody.querySelector('[data-sgc-success-actions]');

		if (!actions) {
			return;
		}

		const isPublished = isSellGiftCardProductPublished(response);
		const productLink = getSellGiftCardProductLink(response);
		let html = '';

		if (productLink.url) {
			html += '<a class="button" href="' + escapeHtml(productLink.url) + '" target="_blank">' + escapeHtml(productLink.label) + '</a>';
		}

		if (response && response.id && !isPublished) {
			html += '<button type="button" class="button button-primary" data-sgc-publish-product="' + escapeHtml(response.id) + '">' + escapeHtml(getI18nValue('sgc_publish_product')) + '</button>';
		} else if (response && response.id && isPublished) {
			html += '<button type="button" class="button button-primary" disabled aria-disabled="true">' + escapeHtml(getI18nValue('sgc_published')) + '</button>';
		}

		actions.innerHTML = html;
	}

	function renderSellGiftCardSuccess(response) {
		const successRoot = modalBody.querySelector('[data-sgc-success]');
		const summary = modalBody.querySelector('[data-sgc-success-summary]');
		const successDescription = successRoot ? successRoot.querySelector('p') : null;
		const firstCoupon = response && Array.isArray(response.coupons) && response.coupons.length ? response.coupons[0] : null;
		const productName = response && response.name ? response.name : getSellGiftCardLabel();
		const productType = getSellGiftCardPricingTypeLabel(getSellGiftCardPricingType());
		const variations = response && Array.isArray(response.variations) && response.variations.length
			? response.variations.map(function (variation) { return formatCurrencyAmount(variation.price); }).join(' | ')
			: formatCurrencyAmount(response && response.price ? response.price : getSellGiftCardAmount());
		let productValue = escapeHtml(productName);
		let couponValue = '';

		if (successDescription) {
			successDescription.textContent = getI18nValue('sgc_success_description');
		}

		if (response && response.edit_url) {
			productValue += ' - <a class="sc-sgc-success-inline-link" href="' + escapeHtml(response.edit_url) + '" target="_blank">' + escapeHtml(getI18nValue('sgc_edit_product')) + '</a>';
		}

		if (firstCoupon && firstCoupon.edit_url) {
			couponValue = '<a class="sc-sgc-success-inline-link" href="' + escapeHtml(firstCoupon.edit_url) + '" target="_blank">' + escapeHtml(getI18nValue('sgc_edit_coupon')) + '</a>';
		}

		if (summary) {
			summary.innerHTML =
				'<dl><dt>' + escapeHtml(getI18nValue('sgc_review_product')) + '</dt><dd>' + productValue + '</dd><dt>' + escapeHtml(getI18nValue('sgc_review_type')) + '</dt><dd>' + escapeHtml(productType) + '</dd><dt>' + escapeHtml(getI18nValue('sgc_success_amount')) + '</dt><dd>' + escapeHtml(variations) + '</dd><dt>' + escapeHtml(getI18nValue('sgc_review_coupon_label')) + '</dt><dd>' + couponValue + '</dd></dl>';
		}

		renderSellGiftCardActions(response);
	}

	function publishSellGiftCardProduct(button) {
		const productId = String(button.getAttribute('data-sgc-publish-product') || '').trim();
		const presetData = window.scPresetData || window.scBogoData;

		if (!productId || !presetData || !presetData.rest_url || !presetData.rest_nonce) {
			return;
		}

		button.disabled = true;
		button.textContent = getI18nValue('sgc_publishing');

		fetch(presetData.rest_url + 'wc/v3/sc/sell-gift-card-product/' + encodeURIComponent(productId) + '/publish', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'X-WP-Nonce': presetData.rest_nonce
			}
		}).then(handleApiResponse)
			.then(function (response) {
				if (sellGiftCardState.result) {
					sellGiftCardState.result.status = response.status || 'publish';
					sellGiftCardState.result.view_url = response.view_url || sellGiftCardState.result.view_url;
					sellGiftCardState.result.preview_url = response.preview_url || sellGiftCardState.result.preview_url;
					response = Object.assign({}, sellGiftCardState.result, response, {
						coupons: sellGiftCardState.result.coupons || response.coupons || []
					});
				}
				renderSellGiftCardActions(response);
			})
			.catch(function (error) {
				button.disabled = false;
				button.textContent = getI18nValue('sgc_publish_product');
				resultBox.style.display = '';
				showError(error && error.message ? error.message : getI18nValue('sgc_publish_failed'));
			});
	}

	function getFieldValue(selector) {
		const field = modalBody ? modalBody.querySelector(selector) : null;
		return field ? String(field.value || '').trim() : '';
	}

	function getCheckedValue(name) {
		const field = modalBody ? modalBody.querySelector('input[name="' + escapeSelectorValue(name) + '"]:checked') : null;
		return field ? String(field.value || '').trim() : '';
	}

	function parseSellGiftCardAttributeValues(value) {
		return String(value || '')
			.split(/[|,\n]+/)
			.map(function (item) {
				return String(item || '').trim();
			})
			.filter(function (item, index, list) {
				return '' !== item && list.indexOf(item) === index;
			});
	}

	function getSellGiftCardVariationRows() {
		return parseSellGiftCardAttributeValues(getFieldValue('#sc_sgc_variable_amounts')).map(function (amount) {
			return {
				label: amount,
				price: getDefaultVariationPrice(amount)
			};
		}).filter(function (variation) {
			return variation.label && '' !== variation.price && Number(variation.price) >= 0;
		});
	}

	function getDefaultVariationPrice(value) {
		const numericValue = String(value || '').replace(/[^0-9.]/g, '').trim();
		return '' !== numericValue && Number(numericValue) >= 0 ? numericValue : '';
	}

	function getVariationPriceForLabel(label) {
		return '';
	}

	function getPresetData() {
		return window.scPresetData || window.scBogoData || {};
	}

	function getSellGiftCardLabel() {
		const presetData = getPresetData();
		const label = String(presetData.store_credit_singular_label || getI18nValue('sgc_default_label') || '').trim();

		return label;
	}

	function getSellGiftCardLabeledText(key) {
		return replaceI18nPlaceholder(getI18nValue(key), getSellGiftCardLabelLower());
	}

	function getSellGiftCardPluralLabel() {
		const presetData = getPresetData();
		const label = String(presetData.store_credit_plural_label || getI18nValue('sgc_default_plural_label') || '').trim();

		return label;
	}

	function getSellGiftCardPluralLabelLower() {
		return getSellGiftCardPluralLabel().toLowerCase();
	}

	function getSellGiftCardPluralLabeledText(key) {
		return replaceI18nPlaceholder(getI18nValue(key), getSellGiftCardPluralLabelLower());
	}

	function getSellGiftCardLabelLower() {
		return getSellGiftCardLabel().toLowerCase();
	}

	function toPopupTitleCase(text) {
		return String(text || '').replace(/\S+/g, function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		});
	}

	function getSellGiftCardTitle() {
		const presetData = getPresetData();
		const title = String(presetData.sell_gift_card_title || '').trim();

		if (title) {
			return title;
		}

		const presetRoot = modalBody ? modalBody.querySelector('[data-sc-preset="sell_gift_card"]') : null;
		const titleNode = presetRoot ? presetRoot.querySelector('.sc-wizard-header h2') : null;

		if (titleNode) {
			const domTitle = String(titleNode.textContent || '').trim();

			if (domTitle) {
				return domTitle;
			}
		}

		return toPopupTitleCase('Sell ' + getSellGiftCardLabel());
	}

	function getSellGiftCardPricingType() {
		const field = modalBody ? modalBody.querySelector('#sc_sgc_pricing_type') : null;
		return field ? String(field.value || 'custom').trim() : 'custom';
	}

	function getSellGiftCardPricingTypeLabel(type) {
		const field = modalBody ? modalBody.querySelector('#sc_sgc_pricing_type') : null;

		if (field) {
			const option = field.querySelector('option[value="' + escapeSelectorValue(type) + '"]');

			if (option) {
				return String(option.textContent || '').trim();
			}
		}

		if ('fixed' === type) {
			return getSellGiftCardLabeledText('sgc_pricing_type_fixed');
		}

		if ('variable' === type) {
			return getI18nValue('sgc_pricing_type_variable');
		}

		return getI18nValue('sgc_pricing_type_custom');
	}

	function getSellGiftCardAmount() {
		const pricingType = getSellGiftCardPricingType();
		if ('fixed' === pricingType) {
			return getFieldValue('#sc_sgc_fixed_amount');
		}
		return '0';
	}

	function updateSellGiftCardPricingType() {
		const pricingType = getSellGiftCardPricingType();
		const fixedFields = modalBody ? Array.from(modalBody.querySelectorAll('[data-sgc-fixed-field]')) : [];
		const variableFields = modalBody ? Array.from(modalBody.querySelectorAll('[data-sgc-variable-field]')) : [];

		fixedFields.forEach(function (field) {
			field.style.display = 'fixed' === pricingType ? 'flex' : 'none';
		});
		variableFields.forEach(function (field) {
			field.style.display = 'variable' === pricingType ? 'flex' : 'none';
		});

		sellGiftCardState.pricingType = pricingType;
	}

	function formatCurrencyAmount(amount) {
		const numberAmount = Number(amount);
		const displayAmount = Number.isFinite(numberAmount) ? numberAmount.toLocaleString() : String(amount || '0');
		return getWooCurrencySymbol() + displayAmount;
	}

	function formatAttributeValue(value) {
		const numericValue = Number(value);
		return Number.isFinite(numericValue) && '' !== String(value || '').trim() ? formatCurrencyAmount(value) : String(value || '');
	}

	function formatAmountRange(amounts) {
		if (!Array.isArray(amounts) || amounts.length < 1) {
			return '';
		}

		const numericAmounts = amounts.map(Number).filter(Number.isFinite);
		if (numericAmounts.length < 1) {
			return '';
		}

		return formatCurrencyAmount(Math.min.apply(null, numericAmounts)) + ' - ' + formatCurrencyAmount(Math.max.apply(null, numericAmounts));
	}

	function getWooCurrencySymbol() {
		if (window.woocommerce_admin_meta_boxes && window.woocommerce_admin_meta_boxes.currency_format_symbol) {
			return String(window.woocommerce_admin_meta_boxes.currency_format_symbol);
		}

		return '$';
	}

	function getSellGiftCardSelectedImageUrl(imageSelector) {
		const imageField = modalBody.querySelector(imageSelector);
		if (!imageField) {
			return '';
		}

		const wrapper = imageField.closest('.sc-field');
		const button = wrapper ? wrapper.querySelector('[data-sgc-image-button]') : null;
		return button ? String(button.getAttribute('data-sgc-image-url') || '') : '';
	}
});

function createCouponWithPreset(couponData, presetBuilder) {
	return createCoupon(couponData).then(function (couponResponse) {
		if (!couponResponse.id) {
			throw new Error(couponResponse.message || getI18nValue('coupon_failed'));
		}

		const presetData = presetBuilder();
		return applyPreset(couponResponse.id, presetData);
	});
}

function createCoupon(data) {
	const presetData = window.scPresetData || window.scBogoData;

	if (!presetData || !presetData.rest_url || !presetData.rest_nonce) {
		return Promise.reject(new Error(getI18nValue('coupon_api_unavailable')));
	}

	return fetch(presetData.rest_url + 'wc/v3/sc/coupons', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'X-WP-Nonce': presetData.rest_nonce
		},
		body: JSON.stringify(cleanPayload(data))
	}).then(handleApiResponse);
}

function applyPreset(couponId, presetData) {
	const localizedData = window.scPresetData || window.scBogoData;

	if (!localizedData || !localizedData.rest_url || !localizedData.rest_nonce) {
		return Promise.reject(new Error(getI18nValue('coupon_api_unavailable')));
	}

	return fetch(localizedData.rest_url + 'wc/v3/coupons/' + couponId, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': localizedData.rest_nonce
		},
		body: JSON.stringify(cleanPayload(presetData))
	}).then(handleApiResponse);
}

function cleanPayload(data) {
	return Object.fromEntries(
		Object.entries(data).filter(function ([key, value]) {
			return value !== undefined && value !== null && value !== '';
		})
	);
}

function buildPresetPayload(presetKey, scopeNode) {
	if ('bogo' !== presetKey) {
		return {};
	}

	return buildBogoPreset(scopeNode);
}

function buildBogoPreset(scopeNode) {
	const root = scopeNode || document;
	const buyProductSelect = root.querySelector('#sc_buy_product_id');
	const productSelect = root.querySelector('#sc_product_id');

	const buyProductIds = getNumericSelectedValues(buyProductSelect);
	const productIds = getNumericSelectedValues(productSelect);

	const quantityField = root.querySelector('#sc_quantity');
	const discountAmountField = root.querySelector('#sc_discount_amount');
	const discountTypeField = root.querySelector('#sc_discount_type');
	const selectableProductsField = root.querySelector('#wc_sc_no_of_selectable_product');
	const autoApplyField = root.querySelector('#wc_sc_auto_apply_coupon');
	const productQuantityRestrictions = buildProductQuantityRestrictions(root, buyProductIds);

	return {
		product_ids: buyProductIds,
		wc_sc_add_product_ids: productIds,
		wc_sc_add_product_qty: quantityField ? quantityField.value : '',
		wc_sc_product_discount_amount: discountAmountField ? discountAmountField.value : '',
		wc_sc_product_discount_type: discountTypeField ? discountTypeField.value : '',
		wc_sc_no_of_selectable_product: selectableProductsField && selectableProductsField.checked ? 'yes' : 'no',
		wc_sc_auto_apply_coupon: autoApplyField && autoApplyField.checked && 'smart_coupon' !== (discountTypeField ? String(discountTypeField.value || '').trim() : '') ? 'yes' : 'no',
		wc_sc_product_quantity_restrictions: productQuantityRestrictions
	};
}

function buildProductQuantityRestrictions(rootNode, buyProductIds) {
	const root = rootNode || document;
	const restrictionRows = Array.from(root.querySelectorAll('#sc_product_qty_restrictions_rows .sc-product-qty-row'));
	const allowedIds = Array.isArray(buyProductIds)
		? buyProductIds
				.map(function (id) {
					return parseInt(id, 10);
				})
				.filter(function (id) {
					return Number.isFinite(id);
				})
		: [];

	if (restrictionRows.length < 1 || allowedIds.length < 1) {
		return undefined;
	}

	const productValues = {};

	restrictionRows.forEach(function (row) {
		const productId = parseInt(row.getAttribute('data-product-id') || '', 10);

		if (!Number.isFinite(productId) || allowedIds.indexOf(productId) < 0) {
			return;
		}

		const minField = row.querySelector('.sc-product-qty-min');
		const maxField = row.querySelector('.sc-product-qty-max');

		productValues[String(productId)] = {
			min: minField ? String(minField.value || '').trim() : '',
			max: maxField ? String(maxField.value || '').trim() : ''
		};
	});

	if (Object.keys(productValues).length < 1) {
		return undefined;
	}

	return {
		values: {
			product: productValues,
			product_category: {},
			cart: { min: '', max: '' }
		},
		type: 'product',
		condition: 'any'
	};
}

function getSelectedValues(selectElement) {
	if (!selectElement) {
		return [];
	}

	if (selectElement.selectedOptions && selectElement.selectedOptions.length > 0) {
		return Array.from(selectElement.selectedOptions)
			.map(function (option) {
				return String(option.value || '').trim();
			})
			.filter(function (value) {
				return '' !== value;
			});
	}

	const value = String(selectElement.value || '').trim();

	if ('' === value) {
		if (window.jQuery) {
			const $element = window.jQuery(selectElement);
			const jQueryValue = $element.val();

			if (Array.isArray(jQueryValue) && jQueryValue.length > 0) {
				return jQueryValue
					.map(function (item) {
						return String(item || '').trim();
					})
					.filter(function (item) {
						return '' !== item;
					});
			}

			try {
				const select2Data = $element.select2 ? $element.select2('data') : [];
				if (Array.isArray(select2Data) && select2Data.length > 0) {
					return select2Data
						.map(function (item) {
							return String(item && item.id ? item.id : '').trim();
						})
						.filter(function (item) {
							return '' !== item;
						});
				}
			} catch (e) {
				// Ignore Select2 access issues and return empty array fallback.
			}
		}

		return [];
	}

	return value
		.split(',')
		.map(function (item) {
			return String(item).trim();
		})
		.filter(function (item) {
			return '' !== item;
		});
}

function getNumericSelectedValues(selectElement) {
	return getSelectedValues(selectElement)
		.map(function (value) {
			return parseInt(value, 10);
		})
		.filter(function (id) {
			return Number.isFinite(id);
		});
}

function handleApiResponse(response) {
	if (!response.ok) {
		return response.text().then(function (body) {
			let error;

			try {
				error = JSON.parse(body);
			} catch (e) {
				error = { message: body };
			}

			throw new Error(error.message || getI18nValue('woocommerce_api_error'));
		});
	}

	return response.json();
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function escapeSelectorValue(value) {
	if (window.CSS && 'function' === typeof window.CSS.escape) {
		return window.CSS.escape(String(value));
	}

	return String(value).replace(/"/g, '\\"');
}
