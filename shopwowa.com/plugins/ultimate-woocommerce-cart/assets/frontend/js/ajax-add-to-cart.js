(function ($) {

    $(document).on('click', '.single_add_to_cart_button:not(.disabled)', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $(document.body).trigger('wc_fragment_refresh');
            $(document).find('.uwcc-toggle-button.uwcc-open-on-add-to-cart').trigger('click');
        }, 2000);
    });

    $.fn.serializeArrayAll = function () {
        var rCRLF = /\r?\n/g;
        return this.map(function () {
            return this.elements ? jQuery.makeArray(this.elements) : this;
        }).map(function (i, elem) {
            var val = jQuery(this).val();
            if (val == null) {
                return val == null
                //next 2 lines of code look if it is a checkbox and set the value to blank 
                //if it is unchecked
            } else if (this.type == "checkbox" && this.checked === false) {
                return {name: this.name, value: this.checked ? this.value : ''}
                //next lines are kept from default jQuery implementation and 
                //default to all checkboxes = on
            } else {
                return jQuery.isArray(val) ?
                        jQuery.map(val, function (val, i) {
                            return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                        }) :
                        {name: elem.name, value: val.replace(rCRLF, "\r\n")};
            }
        }).get();
    };


    $(document).on('click', '.single_add_to_cart_button:not(.disabled)', function (e) {
        e.preventDefault();

        var atcButon = $(this),
                atcForm = atcButon.closest('form.cart'),
                data = atcForm.find('input:not([name="product_id"]), select, button, textarea').serializeArrayAll() || 0;

        $.each(data, function (i, item) {
            if (item.name == 'add-to-cart') {
                item.name = 'product_id';
                item.value = atcForm.find('input[name=variation_id]').val() || atcButon.val();
            }
        });

        $(document.body).trigger('adding_to_cart', [atcButon, data]);

        $.ajax({
            type: 'POST',
            url: woocommerce_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
            data: data,
            beforeSend: function (response) {
                atcButon.removeClass('added').addClass('loading');
            },
            complete: function (response) {
                atcButon.addClass('added').removeClass('loading');
            },
            success: function (response) {
                if (response.error && response.product_url) {
                    atcForm.submit();
                    return;
                }

                $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, atcButon]);

                if ($('.uwcc-cart-popup-inner-section-checkout').hasClass('uwcc-active')) {
                    $('.uwcc-cart-popup-inner-section-cart').addClass('uwcc-active');
                    $('.uwcc-cart-popup-inner-section-checkout').removeClass('uwcc-active');
                }
            }
        });

        return false;
    });
})(jQuery);