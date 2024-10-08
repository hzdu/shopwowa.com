function pysTagTemplateSelection(tag, container){
    // here we are finding option element of tag and
    // if it has property 'locked' we will add class 'locked-tag'
    // to be able to style element in select
    var $option = jQuery('.pys-tags-pysselect2 option[value="'+tag.id+'"]');
    if ($option.attr('locked')){
        jQuery(container).addClass('locked-tag');
        tag.locked = true;
    }
    return tag.text;
}
jQuery(document).ready(function(c){function n(e){var t=c("#"+e.data("target"));e.val()===e.data("value")?t.removeClass("form-control-hidden"):t.addClass("form-control-hidden")}function e(){"price"===c('input[name="pys[core][woo_event_value]"]:checked').val()?c(".woo-event-value-option").hide():c(".woo-event-value-option").show()}function t(){"price"===c('input[name="pys[core][edd_event_value]"]:checked').val()?c(".edd-event-value-option").hide():c(".edd-event-value-option").show()}function a(){var e=c("#pys_event_trigger_type").val(),t="#"+e+"_panel";c(".event_triggers_panel").hide(),c(t).show(),"page_visit"===e?c("#url_filter_panel").hide():c("#url_filter_panel").show();var n=c(t),a=n.data("trigger_type");0==c(".event_trigger",n).length-1&&s(n,a)}function s(e,t){var n=c(".event_trigger",e),a=c(n[0]).clone(!0),s=c(n[n.length-1]).data("trigger_id")+1,i="pys[event]["+t+"_triggers]["+s+"]";a.data("trigger_id",s),c("select",a).attr("name",i+"[rule]"),c("input",a).attr("name",i+"[value]"),a.css("display","block"),a.insertBefore(c(".insert-marker",e))}function i(){"page_visit"===c("#pys_event_trigger_type").val()?c(".event-delay").css("display","flex"):c(".event-delay").css("display","none"); "number_page_visit"===c("#pys_event_trigger_type").val()?c(".triger_number_page_visit").css("display","flex"):c(".triger_number_page_visit").css("display","none")}function o(){c("#pys_event_facebook_enabled").is(":checked")?c("#facebook_panel").show():c("#facebook_panel").hide()}function _(){"CustomEvent"===c("#pys_event_facebook_event_type").val()?c(".facebook-custom-event-type").css("visibility","visible"):c(".facebook-custom-event-type").css("visibility","hidden")}function r(){c("#pys_event_facebook_params_enabled").is(":checked")?c("#facebook_params_panel").show():c("#facebook_params_panel").hide()}function p(){var e=c("#pys_event_facebook_event_type").val();c("#facebook_params_panel").removeClass().addClass(e)}function l(){"custom"===c("#pys_event_facebook_params_currency").val()?c(".facebook-custom-currency").css("visibility","visible"):c(".facebook-custom-currency").css("visibility","hidden")}function v(){c("#pys_event_pinterest_enabled").is(":checked")?c("#pinterest_panel").show():c("#pinterest_panel").hide()}function d(){"CustomEvent"===c("#pys_event_pinterest_event_type").val()?c(".pinterest-custom-event-type").css("visibility","visible"):c(".pinterest-custom-event-type").css("visibility","hidden")}function u(){c("#pys_event_pinterest_params_enabled").is(":checked")?c("#pinterest_params_panel").show():c("#pinterest_params_panel").hide()}function m(){var e=c("#pys_event_pinterest_event_type").val();c("#pinterest_params_panel").removeClass().addClass(e)}function y(){"custom"===c("#pys_event_pinterest_params_currency").val()?c(".pinterest-custom-currency").css("visibility","visible"):c(".pinterest-custom-currency").css("visibility","hidden")}function g(){c("#pys_event_ga_enabled").is(":checked")?c("#analytics_panel").show():c("#analytics_panel").hide()}function h(){c("#pys_event_google_ads_enabled").is(":checked")?c("#google_ads_panel").show():c("#google_ads_panel").hide()}function b(){"_custom"===c("#pys_event_google_ads_event_action").val()?c("#pys_event_google_ads_custom_event_action").css("visibility","visible"):c("#pys_event_google_ads_custom_event_action").css("visibility","hidden")}function k(){c("#pys_event_bing_enabled").is(":checked")?c("#bing_panel").show():c("#bing_panel").hide()}c(function(){c('[data-toggle="pys-popover"]').popover({container:"#pys",html:!0,content:function(){return c("#pys-"+c(this).data("popover_id")).html()}})}),c(".pys-pysselect2").each(function(){c(this).pysselect2({placeholder: c(this).data("placeholder")})}),c(".pys-tags-pysselect2").pysselect2({tags:!0,tokenSeparators:[","," "],templateSelection:pysTagTemplateSelection}).on('pysselect2:unselecting', function(e){if($(e.params.args.data.element).attr('locked')) { e.preventDefault(); }}),c("select.controls-visibility").on("change",function(e){n(c(this))}).each(function(e,t){n(c(t))}),c(".card-collapse").on('click',function(){var e=c(this).closest(".card").children(".card-body");e.hasClass("show")?e.hide().removeClass("show"):e.show().addClass("show")}),c(".collapse-control .custom-switch-input").on('change',function(){var e=c(this),t=c("."+e.data("target"));0<t.length&&(e.prop("checked")?t.show():t.hide())}).trigger("change"),e(),c('input[name="pys[core][woo_event_value]"]').on('change',function(){e()}),t(),c('input[name="pys[core][edd_event_value]"]').on('change',function(){t()}),c("#pys_select_all_events").on('change',function(){c(this).prop("checked")?c(".pys-select-event").prop("checked","checked"):c(".pys-select-event").prop("checked",!1)}),i(),a(),c("#pys_event_trigger_type").on('change',function(){i(),a()}),c(".add-event-trigger").on('click',function(){var e=c(this).closest(".event_triggers_panel"),t=e.data("trigger_type");s(e,t)}),c(".add-url-filter").on('click',function(){s(c(this).closest(".event_triggers_panel"),"url_filter")}),c(".remove-row").on('click',function(e){c(this).closest(".row.event_trigger, .row.facebook-custom-param, .row.pinterest-custom-param, .row.google_ads-custom-param").remove()}),o(),_(),r(),p(),l(),c("#pys_event_facebook_enabled").on('click',function(){o()}),c("#pys_event_facebook_event_type").on('change',function(){_(),p()}),c("#pys_event_facebook_params_enabled").on('click',function(){r()}),c("#pys_event_facebook_params_currency").on('change',function(){l()}),c(".add-facebook-parameter").on('click',function(){var e=c("#facebook_params_panel"),t=c(".facebook-custom-param",e),n=c(t[0]).clone(!0),a=c(t[t.length-1]).data("param_id")+1,s="pys[event][facebook_custom_params]["+a+"]";n.data("param_id",a),c("input.custom-param-name",n).attr("name",s+"[name]"),c("input.custom-param-value",n).attr("name",s+"[value]"),n.css("display","flex"),n.insertBefore(c(".insert-marker",e))}),v(),d(),u(),m(),y(),c("#pys_event_pinterest_enabled").on('click',function(){v()}),c("#pys_event_pinterest_event_type").on('change',function(){d(),m()}),c("#pys_event_pinterest_params_enabled").on('click',function(){u()}),c("#pys_event_pinterest_params_currency").on('change',function(){y()}),c(".add-pinterest-parameter").on('click',function(){var e=c("#pinterest_params_panel"),t=c(".pinterest-custom-param",e),n=c(t[0]).clone(!0),a=c(t[t.length-1]).data("param_id")+1,s="pys[event][pinterest_custom_params]["+a+"]";n.data("param_id",a),c("input.custom-param-name",n).attr("name",s+"[name]"),c("input.custom-param-value",n).attr("name",s+"[value]"),n.css("display","flex"),n.insertBefore(c(".insert-marker",e))}),g(),c("#pys_event_ga_enabled").on('click',function(){g()}),h(),b(),c("#pys_event_google_ads_enabled").on('click',function(){h()}),c("#pys_event_google_ads_event_action").on('change',function(){b()}),c(".add-google_ads-parameter").on('click',function(){var e=c("#google_ads_params_panel"),t=c(".google_ads-custom-param",e),n=c(t[0]).clone(!0),a=c(t[t.length-1]).data("param_id")+1,s="pys[event][google_ads_custom_params]["+a+"]";n.data("param_id",a),c("input.custom-param-name",n).attr("name",s+"[name]"),c("input.custom-param-value",n).attr("name",s+"[value]"),n.css("display","flex"),n.insertBefore(c(".insert-marker",e))}),k(),c("#pys_event_bing_enabled").on('click',function(){k()})});


jQuery( document ).ready(function($) {
    function enable_merged_ga(){
        $("#pys_event_ga_ads_enabled").is(":checked")?$("#merged_analytics_panel").show():$("#merged_analytics_panel").hide()
    }
    enable_merged_ga();
    $("#pys_event_ga_ads_enabled").on('click',function(){enable_merged_ga()})


    function check_custom_action_merged(){
        "_custom"===$("#pys_event_ga_ads_event_action").val() ? $("#pys_event_ga_ads_custom_event_action").css("visibility","visible"):$("#pys_event_ga_ads_custom_event_action").css("visibility","hidden")
    }

    checkStepActive();
    calculateStepsNums();

    $('.woo_initiate_checkout_enabled input[type="checkbox"]').on('change',function() {
        checkStepActive()
    });
    $('.checkout_progress input[type="checkbox"]').on('change',function () {
        calculateStepsNums();
    });

    function calculateStepsNums() {
        var step = 2;
        $('.checkout_progress').each(function (index,value) {
            if($(value).find("input:checked").length > 0) {
                $(value).find(".step").text("STEP "+step+": ");
                step++;
            } else {
                $(value).find(".step").text("");
            }
        });
    }

    function checkStepActive() {
        if($('.woo_initiate_checkout_enabled input[type="checkbox"]').is(':checked')) {
            $('.checkout_progress .custom-switch').removeClass("disabled");
            $('.checkout_progress input[type="checkbox"]').removeAttr("disabled");
            $('.woo_initiate_checkout_enabled .step').text("STEP 1:");
        } else {
            $('.checkout_progress input').prop('checked',false);
            $('.checkout_progress .custom-switch').addClass("disabled");
            $('.checkout_progress input[type="checkbox"]').attr("disabled","disabled");
            $('.woo_initiate_checkout_enabled .step').text("");
        }
        calculateStepsNums();
    }
    updatePurchaseFDPValue($("#pys_facebook_fdp_purchase_event_fire"));
    $("#pys_facebook_fdp_purchase_event_fire").on('change',function () {

        updatePurchaseFDPValue(this);
    });

    updateAddToCartFDPValue($("#pys_facebook_fdp_add_to_cart_event_fire"));
    $("#pys_facebook_fdp_add_to_cart_event_fire").on('change',function () {

        updateAddToCartFDPValue(this);
    });
    updatePostEventFields();
    $("#pys_event_trigger_type").on('change',function(){
        updatePostEventFields();
    });

    $(document).on('change', '.event_trigger select[name^="pys[event][number_page_visit_triggers]"]', function() {
        if ($(this).val() === 'any') {
            $(this).closest('.event_trigger').find('.trigger_url').hide();
        }
        else {
            $(this).closest('.event_trigger').find('.trigger_url').show();
        }
    });

    $(".action_old,.action_g4,.action_merged_g4").on('change',function () {
        var value = $(this).val();
        $(".ga-param-list, .ga-ads-param-list").html("");

        for(i=0;i<ga_fields.length;i++){
            if(ga_fields[i].name == value) {
                ga_fields[i].fields.forEach(function(el){
                    $(".ga-param-list").append('<div class="row mb-3 ga_param">\n' +
                            '<label class="col-5 control-label">'+el+'</label>' +
                            '<div class="col-4">' +
                                '<input type="text" name="pys[event][ga_params]['+el+']" class="form-control">' +
                            '</div>' +
                        ' </div>');
                    $(".ga-ads-param-list").append('<div class="row mb-3 ga_ads_param">\n' +
                        '<label class="col-5 control-label">'+el+'</label>' +
                        '<div class="col-4">' +
                        '<input type="text" name="pys[event][ga_ads_params]['+el+']" class="form-control">' +
                        '</div>' +
                        ' </div>');
                });
                break;
            }
        }

        if($('option:selected', this).attr('group') == "Retail/Ecommerce") {
            $(".ga_woo_info").attr('style',"display: block");
        } else {
            $(".ga_woo_info").attr('style',"display: none");
        }
        updateGAActionSelector();
    })

    if($(".action_merged_g4").length > 0) {
        var value = $('.action_merged_g4').val();
        if($(".ga-ads-param-list .ga_ads_param").length == 0) {
            for(i=0;i<ga_fields.length;i++){
                if(ga_fields[i].name == value) {
                    ga_fields[i].fields.forEach(function(el){
                        $(".ga-ads-param-list").append('<div class="row mb-3 ga_ads_param">\n' +
                            '<label class="col-5 control-label">'+el+'</label>' +
                            '<div class="col-4">' +
                            '<input type="text" name="pys[event][ga_ads_params]['+el+']" class="form-control">' +
                            '</div>' +
                            ' </div>');
                    });
                    break;
                }
            }
        };



        if($('option:selected', this).attr('group') == "Retail/Ecommerce") {
            $(".ga_woo_info").attr('style',"display: block");
        } else {
            $(".ga_woo_info").attr('style',"display: none");
        }
        updateGAActionSelector();
    };

    function updateGAActionSelector() {
        if($('.action_g4').length > 0) {
            if($('.action_old').val() === "_custom" || $('.action_old').val() === "CustomEvent") {
                $('#ga-custom-action_old').css('display','block')
            } else {
                $('#ga-custom-action_old').css('display','none')
            }
            if($('.action_g4').val() === "_custom" || $('.action_g4').val() === "CustomEvent") {
                $('#ga-custom-action_g4').css('display','block');
            } else {
                $('#ga-custom-action_g4').css('display','none')
            }
        }
        if($('.action_merged_g4').length > 0) {
            if($('.action_merged_g4').val() === "_custom" || $('.action_merged_g4').val() === "CustomEvent") {
                $('#ga-ads-custom-action_g4').css('display','block');
            } else {
                $('#ga-ads-custom-action_g4').css('display','none')
            }
        }

    }

    $('.ga-custom-param-list').on("click",'.ga-custom-param .remove-row',function(){
       $(this).parents('.ga-custom-param').remove();
    });

    $('.add-ga-custom-parameter').on('click',function(){
        var index = $(".ga-custom-param-list .ga-custom-param").length + 1;
        $(".ga-custom-param-list").append('<div class="row mt-3 ga-custom-param" data-param_id="'+index+'">' +
            '<div class="col">' +
                '<div class="row">' +
                    '<div class="col-1"></div>' +
                        '<div class="col-4">' +
                            '<input type="text" placeholder="Enter name" class="form-control custom-param-name"' +
                                ' name="pys[event][ga_custom_params]['+index+'][name]"' +
                                ' value="">' +
                        '</div>' +
                        '<div class="col-4">' +
                            '<input type="text" placeholder="Enter value" class="form-control custom-param-value"' +
                                ' name="pys[event][ga_custom_params]['+index+'][value]"' +
                                ' value="">' +
                        '</div>' +
                        '<div class="col-2">' +
                            '<button type="button" class="btn btn-sm remove-row">' +
                                '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    });

    $('.add-ga-ads-custom-parameter').on('click',function(){
        var index = $(".ga-ads-custom-param-list .ga-ads-custom-param").length + 1;
        $(".ga-ads-custom-param-list").append('<div class="row mt-3 ga-ads-custom-param" data-param_id="'+index+'">' +
            '<div class="col">' +
            '<div class="row">' +
            '<div class="col-1"></div>' +
            '<div class="col-4">' +
            '<input type="text" placeholder="Enter name" class="form-control custom-param-name"' +
            ' name="pys[event][ga_ads_custom_params]['+index+'][name]"' +
            ' value="">' +
            '</div>' +
            '<div class="col-4">' +
            '<input type="text" placeholder="Enter value" class="form-control custom-param-value"' +
            ' name="pys[event][ga_ads_custom_params]['+index+'][value]"' +
            ' value="">' +
            '</div>' +
            '<div class="col-2">' +
            '<button type="button" class="btn btn-sm remove-row">' +
            '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
    });

    $("#import_events_file").on('change',function(){
        var fd = new FormData();
        fd.append("_wpnonce",$("#import_events_file_nonce").val());
        fd.append("action","pys_import_events");
        fd.append($(this).attr("name"), $(this).prop('files')[0]);

        $.ajax({
            url: ajaxurl,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                if(data.success) {
                    location.reload();
                } else {
                    alert(data.data)
                }

            },error:function (data) {
                console.log(data);
            }
        });
    });



    function updatePostEventFields() {
        const arr_form_trigger = ["CF7", "fluentform", "formidable", "forminator", "gravity", "ninjaform", "wpforms", "wsform"];
        $("#fire_event_once").show();
        $(".triger_number_page_visit").css("display","none");
        if($("#pys_event_trigger_type").val() == "post_type") {
            $(".event-delay").css("display","flex");
            $(".triger_post_type").show();
            $("#url_filter_panel").hide();
            $(".post_type_error").show();
        } else if($("#pys_event_trigger_type").val() == "number_page_visit") {
            $(".triger_number_page_visit").css("display","flex");
            $("#url_filter_panel").hide();
            $(".post_type_error").hide();
            $(".triger_post_type").hide();
            $("#fire_event_once").hide();
        } else if($.inArray($("#pys_event_trigger_type").val(), arr_form_trigger) != -1) {
            $("#url_filter_panel").hide();
            $(".post_type_error").hide();
            $(".triger_post_type").hide();
        }
        else{
            $(".post_type_error").hide();
            $(".triger_post_type").hide();
        }
    }
    function updateAddToCartFDPValue(input) {
        if($(input).val() == "scroll_pos") {
            $("#fdp_add_to_cart_event_fire_scroll_block").show();
            $("#pys_facebook_fdp_add_to_cart_event_fire_css").hide()
        } else  if($(input).val() == "css_click") {
            $("#fdp_add_to_cart_event_fire_scroll_block").hide();
            $("#pys_facebook_fdp_add_to_cart_event_fire_css").show()
        } else {
            $("#fdp_add_to_cart_event_fire_scroll_block").hide();
            $("#pys_facebook_fdp_add_to_cart_event_fire_css").hide()
        }
    }
    function updatePurchaseFDPValue(input) {
        if($(input).val() == "scroll_pos") {
            $("#fdp_purchase_event_fire_scroll_block").show();
            $("#pys_facebook_fdp_purchase_event_fire_css").hide()
        } else  if($(input).val() == "css_click") {
            $("#fdp_purchase_event_fire_scroll_block").hide();
            $("#pys_facebook_fdp_purchase_event_fire_css").show()
        } else {
            $("#fdp_purchase_event_fire_scroll_block").hide();
            $("#pys_facebook_fdp_purchase_event_fire_css").hide()
        }
    }
    function updateGAFields() {
        var allValues = $("#pys_ga_pixel_id_event option").map(function() {
            return $(this).val();
        }).get();
        var selectedValues = $("#pys_ga_pixel_id_event").val();

        var hasAWElement = selectedValues && (selectedValues.some(value => value.startsWith('AW')) || (selectedValues.includes('all') && allValues.some(value => value.startsWith('AW'))));
        if (hasAWElement) {
            $('.conversion_label').css('display', 'flex');
        } else {
            $('.conversion_label').hide();
        }

    }
    if($("#pys_ga_pixel_id_event").length >0) {
        $("#pys_ga_pixel_id_event").on('change',function () {
            updateGAFields()
        })
        updateGAFields();
    }

    function updateGAADSFields() {
        var allValues = $("#pys_ga_ads_pixel_id_event option").map(function() {
            return $(this).val();
        }).get();
        var selectedValues = $("#pys_ga_ads_pixel_id_event").val();

        var hasAWElement = selectedValues && (selectedValues.some(value => value.startsWith('AW')) || (selectedValues.includes('all') && allValues.some(value => value.startsWith('AW'))));
        if (hasAWElement) {
            $('.conversion_label').css('display', 'flex');
        } else {
            $('.conversion_label').hide();
        }

    }
    if($("#pys_ga_ads_pixel_id_event").length >0) {
        $("#pys_ga_ads_pixel_id_event").on('change',function () {
            updateGAADSFields()
        })
        updateGAADSFields();
    }


    $(document).on('change','.ga_tracking_id,#pys_ga_tracking_id_0',function(){
        let text = 'We identified this tag as a Google Analytics Universal property.'
        if($(this).val().indexOf('G') === 0) {
            text = 'We identified this tag as a GA4 property.';
        }
        $(this).next().text(text);
    });

    function renderField(data,wrapClass="row mb-3",labelClass="col-5 control-label") {
        if(data.type === "input") {
            return '<div class="'+wrapClass+'">' +
                '<label class="'+labelClass+'">'+data.label+'</label>' +
                '<div class="col-4">' +
                '<input type="text" name="'+data.name+'" value="" placeholder="" class="form-control">' +
                '</div></div>';
        }
    }

    /**
     * TikTok Edit Event
     */
    if($('#pys_event_tiktok_event_type').length > 0) {
        $('#pys_event_tiktok_event_type').on('change',function(){
            updateTikTokEventParamsFrom()
        })

        $('#pys_event_tiktok_params_enabled').on('change',function(){
            updateTiktokParamFormVisibility()
        })

        if($('#pys_event_tiktok_event_type').val() === 'CustomEvent') {
            $('.tiktok-custom-event-type').css('display','block')
        } else {
            $('.tiktok-custom-event-type').css('display','none')
        }
        updateTiktokParamFormVisibility();

        $('.tiktok-custom-param-list').on("click",'.tiktok-custom-param .remove-row',function(){
            $(this).parents('.tiktok-custom-param').remove();
        });

        $('.add-tiktok-custom-parameter').on('click',function(){
            var index = $(".tiktok-custom-param-list .tiktok-custom-param").length + 1;
            $(".tiktok-custom-param-list").append('<div class="row mt-3 tiktok-custom-param" data-param_id="'+index+'">' +
                '<div class="col">' +
                '<div class="row">' +
                '<div class="col-1"></div>' +
                '<div class="col-4">' +
                '<input type="text" placeholder="Enter name" class="form-control custom-param-name"' +
                ' name="pys[event][tiktok_custom_params]['+index+'][name]"' +
                ' value="">' +
                '</div>' +
                '<div class="col-4">' +
                '<input type="text" placeholder="Enter value" class="form-control custom-param-value"' +
                ' name="pys[event][tiktok_custom_params]['+index+'][value]"' +
                ' value="">' +
                '</div>' +
                '<div class="col-2">' +
                '<button type="button" class="btn btn-sm remove-row">' +
                '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        });
    }

    function updateTikTokEventParamsFrom() {
        let $select = $('#pys_event_tiktok_event_type');
        if($select.length === 0) return;
        let $panel = $('#tiktok_params_panel .standard');
        let $custom = $('.tiktok-custom-event-type');

        $panel.html('')
        if($select.val() === 'CustomEvent') {
            $custom.css('display','block')
        } else {
            $custom.css('display','none')
            let fields = $select.find(":selected").data('fields')
            fields.forEach(function (item) {
                $panel.append(renderField(item))
            })
        }
    }

    function updateTiktokParamFormVisibility() {
        if($('#pys_event_tiktok_params_enabled:checked').length > 0) {
            $('#tiktok_params_panel').css('display','block')
        } else {
            $('#tiktok_params_panel').css('display','none')
        }
    }
    
    function updateTikTokPanelVisibility() {
        if($("#pys_event_tiktok_enabled").is(":checked")) {
            $("#tiktok_panel").show()
        }
        else {
            $("#tiktok_panel").hide()
        }
    }
    updateTikTokPanelVisibility()
    $("#pys_event_tiktok_enabled").on('click',function(){updateTikTokPanelVisibility()})


    $("select.pys_hidden_content").each(function (el) {
        hideShowHiddenData($(this))
    })

    $("select.pys_hidden_content").on("change",function () {
        hideShowHiddenData($(this))
    })

    function hideShowHiddenData($elSwitch) {
        var point = $elSwitch.data("hidden");
        var value = $elSwitch.val();

        $(point).each(function(){
            if($(this).data("hide_value") === value) {
                $(this).show();
                console.log("show",$(this))
            } else {
                $(this).hide()
                console.log("hide",$(this))
            }
        })



    }
    $("#pys_core_automatic_events_enabled").on("change",function () {
        var $headSwitch = $(this).parents(".card-header").find(".card-collapse")
        var $body = $(this).parents(".card").children(".card-body")
        if($(this).is(':checked')) {
            $headSwitch.css("display","block")
        } else {
            $body.removeClass("show")
            $body.css("display","none")
            $headSwitch.css("display","none")
        }

    })

    $("#pys .copy_text").on("click",function () {

        navigator.clipboard.writeText($(this).text());
    })

    $("#pys .pys_utm_builder .utm, #pys .pys_utm_builder .site_url").on("input",function () {

        updateBuilderUrl()
    })

    function updateBuilderUrl() {
        let utms = ""
        let urls =  $("#pys .pys_utm_builder .site_url").val()
        $("#pys .pys_utm_builder .utm").each(function () {
            if($(this).val() != "") {
                if(utms === "") {
                    utms = $(this).data('type')+"="+$(this).val()
                }else {
                    utms += "&"+$(this).data('type')+"="+$(this).val()
                }
            }
        })
        if(utms!="") {
            utms = "?"+utms
        }
        $("#pys .build_utms_with_url").text(urls+utms)
        $("#pys .build_utms").text(utms)
    }

    updateBuilderUrl()
    $body = $('body');
    $body.on('change','.plate #pys_ga_use_server_api',function () {
        if(this.checked == '1') {
            $(this).parents('.plate').find('#pys_ga_server_access_api_token_0').removeAttr('disabled')
        }
        else {
            $(this).parents('.plate').find('#pys_ga_server_access_api_token_0').attr('disabled', 'disabled')
        }
    })
});


