!function(e){"use strict";var t=function(){if(reyParams.js_params.cart_update_by_qty){var t,a=e('.woocommerce-cart-form [name="update_cart"]');a.length&&e(".woocommerce-cart-form").on("change keyup mouseup","input.qty, select.qty",(function(){"undefined"!==t&&clearTimeout(t),""!=e(this).val()&&(t=setTimeout((function(){a.trigger("click")}),reyParams.js_params.cart_update_threshold))}))}else e('button[name="update_cart"]').show()};e(document.body).on("added_to_cart removed_from_cart wc_fragments_refreshed updated_wc_div wc_fragments_loaded",(function(e){t()})),document.addEventListener("rey-DOMContentLoaded",(function(e){t()}))}(jQuery);