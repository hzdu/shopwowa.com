!function(t){"use strict";var e=function(e){var a=this;this.selectors={swatch_list:".rey-swatchList",swatch_item:".rey-swatchList-item",attr_data_selector:"data-attribute_name",attr_data_prefix:"attribute_",reset_link:".rey-resetVariations"},this.el={},this.supports={},this.cache={},this.swatchLists=[],this.init=function(){rey.util.alreadyLoaded(e.$form[0])||(this.el.$form=e.$form,this.el.$product=this.el.$form.closest(".product"),this.supports.titles_update=!rey.vars.is_desktop,this.el.$catalogWrapper=t(".rey-productVariations2",this.el.$product),this.supports.is_catalog=this.el.$product.is("li")&&this.el.$catalogWrapper.length,this.supports.catalog_all=this.supports.is_catalog&&this.el.$catalogWrapper.hasClass("--all-attr"),this.supports.redirect_pdp=this.supports.is_catalog&&!this.supports.catalog_all&&this.el.$catalogWrapper.hasClass("--redirect-pdp"),e.$attributeFields.length||(e.$attributeFields=t("select[data-attribute_name]",this.el.$form)),this.el.$updatableLists=t("select.--update",this.el.$form),this.supports.pdp_single_gallery_update=this.el.$product.hasClass("--swatch-update-gallery")&&1===this.el.$updatableLists.length&&e.$attributeFields.length>this.el.$updatableLists.length,e.$attributeFields.each((function(t,e){Object.create(a.swatchList).init(e)})),this.supports.is_catalog&&this.initCatalog(),this.catalogHandleAjaxThreshold(),this.pdpHandleAjaxTreshold(),this.checkSelected(),this.checkDisabled(),this.changeVariableProductImageOnFilter(),this.events(),this.el.$form.addClass("--init"))},this.events=function(){t(this.selectors.swatch_item,this.el.$form).on("click",(function(t){t.preventDefault()})),this.el.$form.on("reycore/woocommerce/swatch_change",(function(s,i,r){var l=i.$select.val(),o=a.matchVariation(l,i.attributeName);if(a.supports.pdp_single_gallery_update&&""===l&&a.el.$updatableLists[0].getAttribute("data-attribute_name")!==i.attributeName&&(o=!1),a.updateCatalog(o),a.toggleResetLink(),a.updateUrl(i,r),a.supports.pdp_single_gallery_update){if(e.useAjax&&!o&&i.$select.hasClass("--update")){var c=e,n={};return c.xhr&&c.xhr.abort(),a.el.$form.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),n[i.attributeName]=i.$select.val(),n.product_id=parseInt(a.el.$form.data("product_id"),10),n.custom_data=a.el.$form.data("custom_data"),void(c.xhr=t.ajax({url:wc_add_to_cart_variation_params.wc_ajax_url.toString().replace("%%endpoint%%","get_variation"),type:"POST",data:n,success:function(t){a.fireSingleVariation(t)},complete:function(){a.el.$form.unblock()}}))}a.fireSingleVariation(o)}})),this.el.$form.on("woocommerce_update_variation_values",(function(t){a.checkDisabled()})),this.el.$form.on("found_variation",(function(t,e){a.catalogAtcText.update(e),a.catalogStockBadge.update(e),a.setAjaxVariationsDisabled(e)})),this.el.$form.on("reset_data",((t,e)=>{if(a.catalogAtcText.update(),a.catalogStockBadge.update(),!e&&a.lastClickedItemListRow&&!a.lastClickedItemListRow.querySelector("select[data-attribute_name]").value){var s=a.lastClickedItemListRow.querySelector("th.label .__name");s&&(s.textContent="")}})),rey.dom.delegate(document,"click",this.selectors.reset_link,(t=>{t.preventDefault(),this.el.$form.find(t.initiator).length&&(e.$attributeFields.val("").trigger("change"),this.el.$form.trigger("reset_data",[!0]),this.el.$form[0].querySelectorAll("th.label .__name").forEach((t=>{t.textContent=""})))})),rey.hooks.addAction("ajaxfilters/finished",(function(t){a.changeVariableProductImageOnFilter(t)}))},this.fireSingleVariation=function(e){if(e){var a=t("select[data-attribute_name]",this.el.$form);a.filter((function(t,e){return""!==e.value&&null!==e.value&&!1!==e.value})).length!==a.length&&(this.el.$form.trigger("reycore/woocommerce/found_variation/single",[e]),this.el.$form[0].dispatchEvent(new CustomEvent("reycore/woocommerce/found_variation/single",{detail:{variation:e}})))}else this.el.$form[0].dispatchEvent(new CustomEvent("reycore/woocommerce/found_variation/single_not_found"))},this.checkSelected=function(){var t="undefined"!=typeof chosenAttributes?chosenAttributes:e.getChosenAttributes(),s=t.data;if(this.toggleResetLink(),t.count&&t.count===t.chosenCount){var i=e.findMatchingVariations(e.variationData,s).shift();a.updateCatalog(i),a.catalogAtcText.update(i),a.catalogStockBadge.update(i)}},this.checkDisabled=function(){e.useAjax&&!this.supports.is_catalog||t.each(this.swatchLists,(function(t,e){a.checkDisabledItem(e)}))},this.checkDisabledItem=function(e){t(a.selectors.swatch_item,e).addClass("--disabled"),t(e).prev("select").find("option").each((function(){var s=t(a.selectors.swatch_item+'[data-term-slug="'+this.getAttribute("value")+'"]',e);this.hasAttribute("disabled")||s.removeClass("--disabled"),s.removeClass("--out-of-stock"),this.classList.contains("in-stock")||s.addClass("--out-of-stock")}))},this.pdpHandleAjaxTreshold=function(){},this.setAjaxVariationsDisabled=function(t){!a.supports.is_catalog&&e.useAjax&&a.__pdp_ajax_variations_data},this.toggleResetLink=function(){t(this.selectors.reset_link).toggleClass("--hidden",!(e.getChosenAttributes().chosenCount>0))},this.updateUrl=function(t,e){if(!t.$select.hasClass("--update-url"))return;const a=new URL(window.location.href);e?a.searchParams.set(t.attributeName,e):a.searchParams.delete(t.attributeName),history.pushState({},"",a.toString())},this.swatchList={init:function(e){this.$select=t(e),this.attributeName=this.$select.attr(a.selectors.attr_data_selector),this.attributeId=this.attributeName.replace(a.selectors.attr_data_prefix,""),this.$swatchList=t(a.selectors.swatch_list,a.el.$form).filter("["+a.selectors.attr_data_selector+'="'+this.attributeName+'"]'),this.preInit(),this.$swatchList.length&&(a.swatchLists.push(this.$swatchList),this.$swatchItems=t(a.selectors.swatch_item,this.$swatchList),this.$swatchItems.length&&(this.singleTriggerSwatchChange(),this.events()))},preInit:function(){var e=this;a.el.$product.hasClass("rey-swatches--show-selected--name")?a.supports.titles_update="name":a.el.$product.hasClass("rey-swatches--show-selected--desc")&&(a.supports.titles_update="desc"),a.supports.titles_update&&(this.$label=t('label[for="'+this.attributeId+'"]',a.el.$form),this.updateTitles(),this.$select.on("change",(function(t){a.supports.titles_update&&e.updateTitles()}))),this.$select.on("change",(function(t){a.el.$form.trigger("reycore/woocommerce/swatch_change",[e,t.target.value])})),a.el.$form.trigger("reycore/woocommerce/swatch/preinit")},singleTriggerSwatchChange:function(){if(a.supports.pdp_single_gallery_update&&this.$select.hasClass("--update")){var t=this.$select.val();""!==t&&setTimeout((()=>{a.el.$form.trigger("reycore/woocommerce/swatch_change",[this,t])}),10)}},events:function(){var t=this;this.$swatchItems.on("click",((t,e)=>{t.preventDefault();var s=t.currentTarget,i=s.getAttribute("data-term-slug");if(!a.supports.redirect_pdp||e){if(a.lastClickedItemListRow=s.closest("tr"),!this.$swatchList.hasClass("--deselection-clear")&&s.classList.contains("--selected")&&!e)return s.classList.remove("--selected"),s.setAttribute("aria-checked","false"),void this.$select.val("").trigger("change").find('option[value=""]').prop("selected",!1);this.$swatchItems.removeClass("--selected").attr("aria-checked","false"),s.classList.add("--selected"),s.setAttribute("aria-checked","true"),a.supports.pdp_single_gallery_update&&(window.reySwatchesPreventResetData=!0),this.$select.val(i).trigger("change").find('option[value="'+i+'"]').prop("selected",!0)}else{var r=a.el.$form.attr("action"),l=-1!==r.indexOf("?")?"&":"?";window.location=r+l+"attribute_"+s.getAttribute("data-attribute-name")+"="+i}})),this.$select.on("change",(function(e){e.target.value||t.$swatchItems.removeClass("--selected").attr("aria-checked","false")}))},updateTitles:function(){var e="",s=this.$select.next(".rey-swatchList").find(".--selected");s.length&&("name"===a.supports.titles_update?e=s.attr("aria-label"):"desc"===a.supports.titles_update&&(e=s.attr("data-description")||s.attr("aria-label")),this.$label.nextAll(".__name").remove(),t('<span class="__name">'+e+"</span>").insertAfter(this.$label))}},this.catalogHandleAjaxThreshold=function(){this.supports.is_catalog&&e.useAjax&&this.el.$catalogWrapper.hasClass("--ajax")},this.initCatalog=function(){this.catalogGallery.init(),this.catalogPrice.init(),this.catalogUrl.init(),this.catalogAtcText.init(),this.catalogStockBadge.init(),this.catalog_is_init=!0},this.lastSelectedVariation=null,this.updateCatalog=function(t){this.catalog_is_init&&this.supports.is_catalog&&t&&(this.catalogGallery.update(t),this.catalogPrice.update(t),this.catalogUrl.update(t))},this.catalogGallery={is_init:!1,init:function(){if(t("select[data-attribute_name]",a.el.$form).length){var e=!1;if(t.each(["--stretch-image-contain","--stretch-image-images","--stretch-image-cover"],(function(t,s){a.el.$product.hasClass(s)&&(e=!0)})),!e){if(this.vars={product_gallery:t(".rey-productThumbnail",a.el.$product),second_class:"--extraImg-second",slideshow_class:"--extraImg-slideshow"},this.vars.cached_gallery=this.vars.product_gallery.html(),this.vars.is_active_second=a.el.$product.hasClass(this.vars.second_class),this.vars.$slideshow=t(".splide",this.vars.product_gallery),this.vars.is_active_slideshow=a.el.$product.hasClass(this.vars.slideshow_class)&&this.vars.$slideshow.length,this.vars.can_change_slideshow=!1,this.vars.is_active_slideshow){var s='<a href="{{link}}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link varImage --var-hidden"><img src="" class="rey-thumbImg img--1" alt=""></a>',i=t(".woocommerce-LoopProduct-link",this.vars.product_gallery).first().attr("href");if(i||(i=t(".splide__slide",this.vars.product_gallery).first().attr("href")),i){s=s.replace("{{link}}",i),this.vars.can_change_slideshow=!0;var r=t(".varImage",this.vars.product_gallery);r.length?this.vars.$slideshow_var=r:this.vars.$slideshow_var=t(s).appendTo(this.vars.product_gallery)}}this.refreshVars(),this.is_init=!0}}},refreshVars:function(){this.vars.product_gallery=t(".rey-productThumbnail",a.el.$product),this.vars.$second_image=t(".rey-productThumbnail__second",this.vars.product_gallery),this.vars.is_active_slideshow?this.vars.thumb_img=t(".varImage img",this.vars.product_gallery):this.vars.thumb_img=t(".rey-thumbImg",this.vars.product_gallery).first()},update:function(t){this.is_init&&(t?t&&t.image&&t.image.thumb_src&&t.image.thumb_src.length>1&&this.vars.thumb_img.attr("src")!==t.image.thumb_src&&(this.vars.is_active_second?(a.el.$product.removeClass(this.vars.second_class),this.vars.$second_image.remove()):this.vars.is_active_slideshow&&(this.vars.$slideshow_var.removeClass("--var-hidden"),this.vars.$slideshow.addClass("--var-hidden")),this.vars.thumb_img.attr({src:t.image.thumb_src,height:t.image.thumb_src_h,width:t.image.thumb_src_w,title:t.image.title,"data-caption":t.image.caption,alt:t.image.alt,srcset:"",sizes:""})):this.deselect(t))},deselect:function(){if(this.vars.is_active_slideshow)return this.vars.$slideshow_var.addClass("--var-hidden"),void this.vars.$slideshow.removeClass("--var-hidden");this.vars.product_gallery.html(this.vars.cached_gallery),this.refreshVars(),this.vars.is_active_second&&a.el.$product.addClass(this.vars.second_class)}},this.catalogPrice={init:function(){(a.supports.catalog_all||reyParams.updateCatalogPriceSingleAttribute)&&(this.$price=t(".price",a.el.$product),this.$price.length&&(this.initialHtml=this.$price[0].innerHTML))},update:function(e){this.initialHtml&&(e?e.price_html&&this.$price.html(t(e.price_html).html()):this.$price.html(this.initialHtml))}},this.catalogUrl={hasAtc:!0,init:function(){this.$atcBtn=t("a[data-product_id]",a.el.$product),(this.$atcBtn.length||(this.hasAtc=!1,this.$atcBtn=t(".woocommerce-loop-product__link",a.el.$product),this.$atcBtn.length))&&(this.url=this.$atcBtn.attr("href"))},update:function(s){if(this.url)if(s){var i=this.url;e.$attributeFields.each((function(e,s){var r=t(s),l=r.attr(a.selectors.attr_data_selector),o=r.val();o&&(i=a.addUrlParameter(i,l,o))})),""!==i&&(this.$atcBtn.attr("href",i),this.hasAtc&&t(".woocommerce-loop-product__link",a.el.$product).attr("href",i))}else this.$atcBtn.attr("href",this.url)}},this.catalogAtcText={init:function(){a.supports.catalog_all&&(this.$atcBtn=t(".add_to_cart_button.product_type_variable[data-product_id]",a.el.$product),this.$atcBtn.length&&(this.$atcBtnInner=t(".__text",this.$atcBtn),this.initialText=this.$atcBtn.text(),this.initialAriaLabel=this.$atcBtn.attr("aria-label"),this.productId=this.$atcBtn.attr("data-product_id"),this.activeText=a.el.$form.attr("data-atc-text"),this.loopQty=this.$atcBtn.closest(".rey-loopQty"),this.dataAttributes={variation_id:""},e.$attributeFields.each((function(e,s){var i=t(s).attr(a.selectors.attr_data_selector);a.catalogAtcText.dataAttributes[i]=""}))))},update:function(e){if(this.initialText&&this.activeText&&this.productId){var s={};if(!e)return s={"aria-label":this.initialAriaLabel},t.each(this.dataAttributes,(function(t,e){s["data-"+t]=""})),this.$atcBtn.removeClass("ajax_add_to_cart").attr(s),this.$atcBtnInner.text(this.initialText),void this.loopQty.removeClass("--visible");s={"aria-label":this.activeText},t.each(this.dataAttributes,(function(i,r){var l;"variation_id"===i?(l=e.variation_id,a.catalogAtcText.$atcBtn.attr("data-product_id",e.variation_id)):l=t('select[name="'+i+'"]',a.el.$form).val(),s["data-"+i]=l})),this.$atcBtn.addClass("ajax_add_to_cart").attr(s),this.$atcBtnInner.text(this.activeText),this.loopQty.addClass("--visible")}}},this.catalogStockBadge={$badges:null,init:function(){this.getBadges()},getBadges:function(){this.$badges=t("[data-status][data-variation-id]",a.el.$product)},update:function(t){this.$badges||this.getBadges(),this.$badges&&this.$badges.length&&(this.$badges.removeClass("--active"),t?.is_in_stock?this.$badges.filter(`[data-status="${t.stock_status}"][data-variation-id="${t.variation_id}"]`).addClass("--active"):this.$badges.filter(`[data-status="outofstock"][data-variation-id="${t.variation_id}"]`).addClass("--active"))}},this.changeVariableProductImageOnFilter=function(e){e=e||t(".reyajfilter-before-products ul.products"),t(a.selectors.swatch_list,e).each((function(e,a){var s=t(a),i=s.attr("data-attribute_name");if(i){var r=t('.reyajfilter-layered-nav[data-taxonomy="'+i.replace("attribute_","")+'"] li.chosen > a');if(r.length){var l=r.first().attr("data-slug")||"";if(l){var o=t('[data-term-slug="'+l+'"]',s);o.length&&setTimeout((function(){o.trigger("click",[!0])}),100)}}}}))},this.addUrlParameter=function(t,e,a,s){null!=t&&0!=t.length||(t=document.location.href);var i=t.split("?"),r="";if(i.length>1)for(var l=i[1].split("&"),o=0;o<l.length;o++){var c=l[o].split("=");s&&c[0]==e||(""==r?r="?":r+="&",r+=c[0]+"="+c[1])}return""==r?r="?":r+="&",r+=e+"="+a,i[0]+r},this.matchVariation=function(a,s){var i=!1;return t.each(e.variationData,(function(t,e){"attributes"in e&&s in e.attributes&&e.attributes[s]===a&&(i=e)})),i},this.init()},a=function(e){void 0!==t.fn.wc_variation_form&&t(".variations_form",e).each((function(){t(this).wc_variation_form()}))};t(document).on("wc_variation_form",".variations_form",(function(t,a){new e(a)})),rey.hooks.addAction("ajaxfilters/finished",(function(t){a(t)})),rey.hooks.addAction("product/loaded",(function(t){a(t)})),document.addEventListener("rey-DOMContentLoaded",(function(e){const a=document.querySelectorAll(".variations_form.--catalog");a.length&&"undefined"!=typeof rey&&rey.frontend.inView({target:a,cb:function(e){t(e.target).wc_variation_form()},once:!0})}))}(jQuery);