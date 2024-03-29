
(function($){
	$(document).ready(function () {
		function fcf_shipping_fields_conditions() {
			$.each(fcf_shipping_conditions, function (index, value) {
				var match = false;
				var conditional_logic_shipping_fields_operator = value.conditional_logic_shipping_fields_operator;
				if (conditional_logic_shipping_fields_operator === 'and') {
					match = true;
				}
				var fcf_shipping_rules = value.conditional_logic_shipping_fields_rules;
				if (fcf_shipping_rules.length !== 0) {
					$.each(fcf_shipping_rules, function conditional_logic_shipping_fields_rules(index_rule, value_rule) {
						var fcf_selected_shipping_method = value_rule.value;
						var fcf_selected_shipping_method_no_zone = value_rule.no_zone_value;

						var validate_action = function () {
							var field_value = '';
							var user_chosen_shipping_method = '';
							var conditional_logic_fields_rules_value = '';
							var conditional_logic_fields = '';
							var fields_conditional_logic_action = '';
							if ( $('input[name^="shipping_method"]').is(':radio')) {
								$.each($('input[name^="shipping_method"]:checked'), function(){
									user_chosen_shipping_method = $(this).val();
								});
							} else {
								if ( $('input[name="shipping_method[0]"]').length ) {
									user_chosen_shipping_method = $('input[name="shipping_method[0]"]').val();
								}
							}

							$.each(fcf_conditions, function (fields_index, fields_value) {
								conditional_logic_fields = fields_value.conditional_logic_fields;
								fields_conditional_logic_action = fields_value.conditional_logic_fields_action;

								$.each( fields_value.conditional_logic_fields_rules, function(index_rule,value_rule){
									conditional_logic_fields_rules_value = value_rule.value;
									field_value = conditional_logic_fields_fields(value_rule);
								});
							});

							if (user_chosen_shipping_method.toLowerCase().indexOf(':fallback') >= 0) {
								user_chosen_shipping_method = user_chosen_shipping_method.split(':fallback')[0];
							}

							if (fcf_selected_shipping_method_no_zone !== undefined) {
								if (user_chosen_shipping_method.toLowerCase().indexOf(fcf_selected_shipping_method_no_zone) >= 0){
									match = conditional_logic_shipping_fields_operator_value( conditional_logic_shipping_fields_operator, match,true);
								} else {
									match = conditional_logic_shipping_fields_operator_value( conditional_logic_shipping_fields_operator, match, false);
								}
							}

							if (fcf_selected_shipping_method !== undefined){
								if ( user_chosen_shipping_method.match(fcf_selected_shipping_method) ) {
									match = conditional_logic_shipping_fields_operator_value( conditional_logic_shipping_fields_operator, match,true);
								}
								else {
									match = conditional_logic_shipping_fields_operator_value( conditional_logic_shipping_fields_operator, match, false);
								}
							}

							var hidden = conditional_logic_shipping_fields_show_or_hide(
								conditional_logic_fields, conditional_logic_fields_rules_value,
								field_value, fields_conditional_logic_action, value, match);

							var fcf_field_to_hide = $('#' + index + '_field');
							let is_field_required = $(fcf_field_to_hide).hasClass('validate-required') || $(fcf_field_to_hide).hasClass('had-validate-required');
							if (hidden) {
								$(fcf_field_to_hide).hide();
								$(fcf_field_to_hide).removeClass('validate-required');
								$(fcf_field_to_hide).find('input,textarea,select').attr('disabled', true);
								$(fcf_field_to_hide).addClass('fcf-hidden-field');
								if (is_field_required) {
									$(fcf_field_to_hide).addClass('had-validate-required');
								}
							} else {
								$(fcf_field_to_hide).show();
								$(fcf_field_to_hide).find('input,textarea,select').attr('disabled', false);
								$(fcf_field_to_hide).removeClass('fcf-hidden-field');
								if (is_field_required) {
									$(fcf_field_to_hide).addClass('validate-required');
								}
							}
						}

						validate_action();

					});
				}

			});
		}

		function conditional_logic_shipping_fields_operator_value(value, match, shipping_method_matched = false) {
			if (shipping_method_matched === true && value === 'or') {
				return true;
			}
			if (shipping_method_matched !== true && value === 'and') {
				return false;
			}

			return match = match || false; // convert to bool
		}

		function conditional_logic_fields_fields(value_rule) {
			return fcf_field_value(value_rule.field);
		}

		function conditional_logic_shipping_fields_show_or_hide(
			conditional_logic_fields, conditional_logic_fields_rules_value,
			field_value, fields_conditional_logic_action, value, match) {

			var hidden = true;
			if (conditional_logic_fields_rules_value === field_value  && fields_conditional_logic_action === 'hide' ) {
					if (value.conditional_logic_shipping_fields_action === 'hide') {
						hidden = match;
					}
				}

				if (conditional_logic_fields_rules_value === field_value  && fields_conditional_logic_action === 'show' ) {
					if (value.conditional_logic_shipping_fields_action === 'show') {
						hidden = !match;
					}
				}

				if (value.conditional_logic_shipping_fields_action === 'hide' ) {
					hidden = match;
				}
				if (value.conditional_logic_shipping_fields_action === 'show' ) {
					hidden = !match;
				}


			return hidden;
		}

		$(document).on('change', 'input', function () {
			fcf_shipping_fields_conditions();
		});
		$('body').on('updated_checkout', function () {
			fcf_shipping_fields_conditions();
		});

		fcf_shipping_fields_conditions();
	});

})(jQuery);
