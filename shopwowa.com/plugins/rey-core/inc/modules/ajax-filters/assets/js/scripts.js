!function(e){"use strict";var t={widgets:{},$widgets:{},closePanel:!0,init:function(){"undefined"!=typeof reyajaxfilter_params&&(e(".reyajfilter-ajax-term-filter, .reyajfilter-ajax-meta-filter, .reyajfilter-price-filter-widget--slider, .reyajfilter-search-filter-widget").each((function(a,r){t.widgets[a]=e(r).attr("id"),t.$widgets[a]=e(r)})),this.$shopLoopContainer=e(reyajaxfilter_params.shop_loop_container),this.$shopLoopEmptyContainer=e(reyajaxfilter_params.not_found_container),this.getApplyFilterBtn(),this.applyFilterBtnID=this.applyFilterBtn.parent().attr("id")||"",this.isApplyFilterEnabled=this.applyFilterBtn.length,this.activeSearchTerm="",this.applyFilterBtnID&&(t.widgets[Object.keys(t.widgets).length]=this.applyFilterBtnID),!rey.vars.is_desktop&&document.querySelector(".reyajfilter-before-products .filters-top-sidebar.--supports-mobile")&&(reyajaxfilter_params.panel_keep_open=!1),this.events(),this.dropDownFilter(),this.initScrollbarContainer(),this.initOrder(),this.priceSlider(),this.rangeSlider(),this.stickyActiveFilter(),this.alphabeticMenu(),this.accordionItems(),this.changeVariableProductImage(),this.stickyTopFilter(),this.fixPaginationNoSiteUrl())},getApplyFilterBtn:function(){this.applyFilterBtn=e(".js-rey-applyFilters-btn"),this.applyFilterBtn.removeClass("--loading")},setHistory:function(e){e.replace("?reynotemplate=1",""),e.replace("&reynotemplate=1",""),history.pushState({},"",e)},beforeUpdate:function(t){var a=[],r=0;if(this.$shopLoopContainer.length?a=this.$shopLoopContainer:this.$shopLoopEmptyContainer.length&&(a=this.$shopLoopEmptyContainer),a.length&&("default"===reyajaxfilter_params.animation_type||1==t)&&void 0!==reyajaxfilter_params.scroll_to_top&&(1==reyajaxfilter_params.scroll_to_top||1==t)){var i;i=void 0!==reyajaxfilter_params.scroll_to_top_offset?parseInt(reyajaxfilter_params.scroll_to_top_offset):100;var n=a.offset().top,l=e(".filters-top-sidebar");"grid"!==reyajaxfilter_params.scroll_to_top_from&&(n=0),l.length&&!l.hasClass("--supports-mobile")&&(n=l.offset().top),(r=n-i)<0&&(r=0),e("html, body").animate({scrollTop:r},400)}},filterProducts:function(a,r){var i,n=this;if(!this.isApplyFilterEnabled||a){rey.hooks.doAction("ajaxfilters/started",this),this.beforeUpdate(r);var l="",s=-1!==window.location.href.indexOf("?")?"&":"?";if(-1!==window.location.href.indexOf("?")&&-1!==window.location.href.indexOf("&"))s="&";!reyajaxfilter_params.minimal_tpl||e("div.rey-postList").length||e("body.elementor-page").length||e(".elementor.elementor-location-archive").length||(l=s+"reynotemplate=1"),this._request_main=e.get(window.location.href+l,(function(a){this._request_main=!1;var r=e(a),i=r.find(reyajaxfilter_params.shop_loop_container),l=r.find(reyajaxfilter_params.not_found_container);e.each(n.widgets,(function(t,a){var i=r.find("#"+a),n=e(i).attr("class");e("#"+a).attr("class",n),e("#"+a).html(i.html())})),e.each(reyajaxfilter_params.extra_containers,(function(t,a){var i=e(a,r);if(!i.length&&r.length&&r.filter((function(t,r){e(r).is(a)&&(i=e(r))})),i.length){var n=e(a).html(i.html());document.dispatchEvent(new CustomEvent("reycore/ajaxfilters/extra_content",{detail:{scope:n[0]}})),".rey-pageCover"===a&&rey.hooks.doAction("elementor/content/lazy_loaded",n[0])}}));var s=!1;if(reyajaxfilter_params.shop_loop_container==reyajaxfilter_params.not_found_container?s=e(reyajaxfilter_params.shop_loop_container).html(i.html()):e(reyajaxfilter_params.not_found_container).length?i.length?s=e(reyajaxfilter_params.not_found_container).html(i.html()):l.length&&(s=e(reyajaxfilter_params.not_found_container).html(l.html())):e(reyajaxfilter_params.shop_loop_container).length&&(i.length?s=e(reyajaxfilter_params.shop_loop_container).html(i.html()):l.length&&(s=e(reyajaxfilter_params.shop_loop_container).html(l.html()))),e("li.product.is-animated-entry").css({visibility:"",opacity:""}),n.getApplyFilterBtn(),n.initOrder(),n.dropDownFilter(),n.initScrollbarContainer(),n.stickyActiveFilter(),n.topActiveFilter(r),n.alphabeticMenu(),n.accordionItems(),n.changeVariableProductImage(s),n.priceSlider(),n.rangeSlider(),n.fixPaginationNoSiteUrl(),s.length){var o=s[0];rey.elements.body.classList.remove("--is-filtering"),reyajaxfilter_params.panel_keep_open||t.closePanel&&rey.frontend.panels.closeActive(),t.closePanel=!0,t.handleAssets(o,(()=>{rey.hooks.doAction("refresh_general_html",o),rey.hooks.doAction("animate_items",o.querySelectorAll("li.product")),rey.hooks.doAction("ajaxfilters/finished",o,n.widgets),document.dispatchEvent(new CustomEvent("reycore/ajaxfilters/end",{detail:{scope:o}})),rey.jquery.addEventListener("reycore/ajaxfilters/finished",(function(e,t){t.length&&rey.hooks.doAction("ajaxfilters/finished",t[0])}))}))}else console.log("Empty content!")}))}else reyajaxfilter_params.apply_live_results&&(this.applyFilterBtn.addClass("--loading"),e(".rey-applyFilters-btnText",this.applyFilterBtn).removeAttr("data-count"),i&&i.abort(),i=rey.ajax.request("filter_get_applied_products",{data:{url:window.location.href},cb:function(t){t.success&&(n.applyFilterBtn.removeClass("--loading"),e(".rey-applyFilters-btnText",n.applyFilterBtn).attr("data-count",t.data)),i=!1}}))},handleAssets:function(e,t){var a=e.querySelector("div[data-loop-assets]"),r=void 0!==t;if(a){var i=JSON.parse(a.getAttribute("data-loop-assets")||"{}");i.styles&&i.scripts?rey.assets.lazyAssets(i,t):r&&t()}else r&&t()},fixPaginationNoSiteUrl:function(){e(".reyajfilter-before-products .rey-pagination a").each((function(t,a){"page/1/"===e(a).attr("href")&&e(a).attr("href",reyajaxfilter_params.page_url)}))},fixPagination:function(){var e,t=window.location.href,a=rey.util.getUrlVars(t);return(e=parseInt(t.replace(/.+\/page\/([0-9]+)+/,"$1")))?e>1&&(t=t.replace(/page\/([0-9]+)/,"page/1")):void 0!==a.paged?(e=parseInt(a.paged))>1&&(t=t.replace("paged="+e,"paged=1")):void 0!==a["product-page"]&&(e=parseInt(a["product-page"]))>1&&(t=t.replace("product-page="+e,"product-page=1")),t},updateQueryStringParameter:function(e,t,a,r){void 0===a&&(a=!0),this.isApplyFilterEnabled&&this.applyFilterBtn.removeClass("--disabled"),void 0===r&&(r=this.fixPagination());var i=rey.elements.body.classList.contains("single-product");i&&(r=reyajaxfilter_params.shop_page);var n,l=new RegExp("([?&])"+e+"=.*?(&|$)","i"),s=-1!==r.indexOf("?")?"&":"?";if(n=r.match(l)?t?r.replace(l,"$1"+e+"="+t+"$2"):this.removeQueryStringParameter(e,r):r+s+e+"="+t,!i)return!0===a?this.setHistory(n):n;window.location=n},updateQueryStringParameters:function(t,a,r){void 0===a&&(a=!0),this.isApplyFilterEnabled&&this.applyFilterBtn.removeClass("--disabled"),void 0===r&&(r=this.fixPagination());var i,n=this;return e.each(t,(function(e,t){i=n.updateQueryStringParameter(t.key,t.value,!1,i||r)})),!0===a?this.setHistory(i):i},removeQueryStringParameter:function(t,a){var r,i;void 0===a&&(a=this.fixPagination()),this.isApplyFilterEnabled&&this.applyFilterBtn.removeClass("--disabled");var n=function(e){var t=r||a,n=rey.util.getUrlVars(t),l=Object.keys(n).length,s="?",o=t.indexOf(s),c=t.indexOf(e);if(l>1){n=(r=c-o>1?t.replace("&"+e+"="+n[e],""):t.replace(e+"="+n[e]+"&","")).split(s);i=s+n[1]}else i=t.replace(s+e+"="+n[e],"")};return"object"==typeof t?(e.each(t,(function(e,t){n(t)})),i):(n(t),i)},removeURLParameter:function(e,t){var a=e.split("?");if(a.length>=2){for(var r=a.shift(),i=a.join("?"),n=encodeURIComponent(t)+"=",l=i.split(/[&;]/g),s=l.length;s-- >0;)-1!==l[s].lastIndexOf(n,0)&&l.splice(s,1);e=r+"?"+l.join("&")}return e},singleFilter:function(e,t){var a,r=rey.util.getUrlVars();a=void 0!==r[e]&&r[e]==t?this.removeQueryStringParameter(e):this.updateQueryStringParameter(e,t,!1),this.setHistory(a)},makeParameters:function(e,t,a){var r,i,n=!1;if(void 0!==(r=void 0!==a?rey.util.getUrlVars(a):rey.util.getUrlVars())[e]){var l=r[e],s=l.split(",");if(l.length>0){var o=jQuery.inArray(t,s);o>=0?(s.splice(o,1),0==s.length&&(n=!0)):s.push(t),i=s.length>1?s.join(","):s}else i=t}else i=t;if(0==n)this.updateQueryStringParameter(e,i);else{var c=this.removeQueryStringParameter(e);this.setHistory(c)}},confirmEnding:function(e,t){return e.substr(-t.length)===t},replaceCategory:function(t){t=e.extend({url:"",redirect:!1,filter_out:[],params:{}},t);var a=this,r=window.location.href;t.filter_out&&e.each(t.filter_out,(function(e,t){r=a.removeURLParameter(r,t)}));var i=r.slice(0,r.indexOf("?"));i+="/"!==i.substr(-1)?"/":"";var n=r.replace(i,t.url);this.confirmEnding(n,"?")&&(n=n.slice(0,-1)),Object.keys(t.params).length&&(n=this.updateQueryStringParameter(t.params.key,t.params.value,!1,n)),t.redirect?window.location=n:(this.setHistory(n),this.filterProducts())},initOrder:function(){var t=this;void 0!==reyajaxfilter_params.sorting_control&&reyajaxfilter_params.sorting_control.length&&1==reyajaxfilter_params.sorting_control&&e(reyajaxfilter_params.shop_loop_container).find(".woocommerce-ordering").each((function(a){e(this).on("submit",(function(e){e.preventDefault()})),e(this).on("change","select.orderby",(function(a){a.preventDefault();var r=e(this).val();t.updateQueryStringParameter("orderby",r),t.filterProducts(!0)}))}))},dropDownFilter:function(){var t=this;e(".reyajfilter-select2").each((function(a,r){var i=e(r),n="select2-reyStyles",l=i.is('[data-checkboxes="true"]'),s={templateResult:t.formatState,minimumResultsForSearch:-1,allowClear:!0,containerCssClass:n,dropdownCssClass:n,dropdownParent:e(this).parent(),dropdownAutoWidth:!0,placeholder:i.attr("data-placeholder")||"Choose",dir:rey.vars.is_rtl?"rtl":"ltr"};i.is('[data-search="true"]')&&(s.minimumResultsForSearch=parseInt(reyajaxfilter_params.dd_search_threshold)),l&&(s.containerCssClass+=" --checkboxes",s.dropdownCssClass+=" --checkboxes"),t.isApplyFilterEnabled&&(s.closeOnSelect=!1),i.is("[data-ddcss]")&&(s.dropdownAutoWidth=!1,s.dropdownCss=JSON.parse(i.attr("data-ddcss")||"{}")),i.hasClass("reyajfilter-select2-single")?i.select2(s):i.hasClass("reyajfilter-select2-multiple")&&(l?(s.templateSelection=function(e,t){return s.placeholder?s.placeholder:"Selected "+e.length+" of "+t},i.select2MultiCheckboxes(s)):i.select2(s))})),e(".select2-dropdown").css("display","none")},initScrollbarContainer:function(t){var a=t||e(document);e(".reyajfilter-layered-nav[data-height]",a).each((function(t,a){var r=e(a),i=e(".reyajfilter-layered-navInner",r),n=r.attr("data-height")||0;if(e(".reyajfilter-layered-list",i).height()<parseFloat(n))return i.css("height",""),void e(".reyajfilter-customHeight-all",r).hide();i.css("height",n),e(".reyajfilter-customHeight-all",r).show(),i.length&&"undefined"!=typeof SimpleScrollbar&&SimpleScrollbar.initEl(i[0])}))},rangeSlider:function(){var a=this;"undefined"!=typeof noUiSlider&&e(".reyajfilter-range-slider").each((function(r,i){var n=e(i),l=n.attr("data-key"),s=parseFloat(n.attr("data-min")),o=parseFloat(n.attr("data-max")),c=parseFloat(n.attr("data-set-min")),d=parseFloat(n.attr("data-set-max")),p=parseFloat(n.attr("data-step")||1);if(c||(c=s),d||(d=o),c!==d){var f={min:s,max:o},h=n.attr("data-range");if(h){var u=h.split(",");e.each(u,(function(e,t){}))}var y={start:[c,d],step:p,connect:!0,tooltips:!0,format:wNumb({decimals:2}),range:f};noUiSlider.create(i,y),i.noUiSlider.on("change",(function(e,r){t.closePanel=!1;rey.util.getUrlVars();if(r){var i=parseFloat(e[r]),n="max-range-"+l;if(i==o){var c=a.removeQueryStringParameter(n);a.setHistory(c)}else a.updateQueryStringParameter(n,i)}else{var d=parseFloat(e[r]);n="min-range-"+l;if(d==s){c=a.removeQueryStringParameter(n);a.setHistory(c)}else a.updateQueryStringParameter(n,d)}a.filterProducts()}))}else n.closest(".reyajfilter-range-filter-wrapper").hide()}))},priceSlider:function(){var a=this;e(".reyajfilter-price-filter-wrapper .noUi-extended").each((function(r,i){var n=e(i);if(n.length&&"undefined"!=typeof noUiSlider){var l=parseInt(n.attr("data-min")),s=parseInt(n.attr("data-max")),o=parseInt(n.attr("data-set-min")),c=parseInt(n.attr("data-set-max"));if(o||(o=l),c||(c=s),o===c)return void n.closest(".reyajfilter-price-filter-widget").hide();var d=n.attr("data-before"),p=n.attr("data-after"),f=parseInt(n.attr("data-margin")||10);void 0!==i.noUiSlider&&i.noUiSlider.destroy(),noUiSlider.create(i,{start:[o,c],step:parseInt(reyajaxfilter_params.slider_step||1),connect:!0,margin:f,tooltips:!0,format:wNumb({decimals:0,prefix:d||"",suffix:p||""}),range:{min:l,max:s}});var h=function(e,t){var a=parseInt(e[1]-e[0]),r=t||r,i=a>=r&&a<=2*r;n.toggleClass("--tt-threshold",i)};h([o,c]),i.noUiSlider.on("slide",(function(e){h(e,this.options.margin)})),i.noUiSlider.on("change",(function(e,r){t.closePanel=!1;rey.util.getUrlVars();if(r){var i=parseInt(e[r].replace(/^\D+/g,"")),n="max-price";if(i==s){var o=a.removeQueryStringParameter(n);a.setHistory(o)}else a.updateQueryStringParameter(n,i)}else{var c=parseInt(e[r].replace(/^\D+/g,""));n="min-price";if(c==l){o=a.removeQueryStringParameter(n);a.setHistory(o)}else a.updateQueryStringParameter(n,c)}a.filterProducts()}))}}))},handlePriceSelect2:function(t){var a=e(t.target),r=a.val(),i=e('option[value="'+r+'"]',a),n=[{key:i.attr("data-key-min")||"min-price",val:i.attr("data-value-min")},{key:i.attr("data-key-max")||"max-price",val:i.attr("data-value-max")}],l=this;e.each(n,(function(e,t){if(r)l.updateQueryStringParameter(t.key,t.val);else{var a=l.removeQueryStringParameter(t.key);l.setHistory(a)}})),this.filterProducts()},handleDefaultSelect2:function(t){var a=e(t.target).attr("name"),r=e(t.target).val();if(r)r=r.toString(),this.updateQueryStringParameter(a,r);else{var i=this.removeQueryStringParameter(a);this.setHistory(i)}this.filterProducts()},handleRangePoints:function(t){var a,r=e(t),i=r.attr("data-key-min"),n=r.attr("data-value-min"),l=r.attr("data-key-max"),s=r.attr("data-value-max"),o=r.parent(),c=o.hasClass("chosen");this.isApplyFilterEnabled&&(c?o.removeClass("chosen"):(e("li",r.closest(".reyajfilter-layered-nav")).removeClass("chosen"),o.addClass("chosen"))),c?""==(a=this.removeQueryStringParameter([i,l]))&&(a=window.location.href.split("?")[0]):a=this.updateQueryStringParameters([{key:i,value:n},{key:l,value:s}],!1),a&&this.setHistory(a),this.filterProducts()},formatState:function(t){if(void 0!==t.loading)return t.text;var a="",r=e(t.element);if(r.is("[data-depth]")){var i=r.attr("data-depth");i&&(a+='<span class="__depth __depth--'+i+'"></span>')}if(r.parent("select").is("[data-checkboxes]")&&"true"==r.parent("select").attr("data-checkboxes")&&(a+='<span class="__checkbox"></span>'),a+='<span class="__text">'+t.text+"</span>",r.is("[data-count]")){var n=r.attr("data-count");n&&(a+='<span class="__count">'+n+"</span>")}return e(a)},stickyActiveFilter:function(){if(reyajaxfilter_params.apply_filter_fixed&&rey.vars.is_desktop){var t=this.applyFilterBtn.closest(".rey-sidebar.shop-sidebar");this.applyFilterBtn.closest(".rey-filterPanel");if(t.length){var a,r,i,n,l=e(".rey-applyFilters-btn-wrapper",t),s=function(){a=e(window).height(),n=t.offset().top,i=n+t.height(),r=t.height(),l.css("width",l.width())},o=function(){var e=window.pageYOffset,t=r>a&&a+e<i&&n<e+a;l.toggleClass("--sticky",t)};s(),o(),e(window).on("resize",rey.util.debounce((function(){s(),o()}),400)),e(window).on("scroll",o)}}},topActiveFilter:function(t){e(".rey-filterTop-head",document).html(e(".rey-filterTop-head",t).html())},alphabeticMenu:function(){e.each(this.$widgets,(function(t,a){var r,i=e(".reyajfilter-alphabetic",a),n=[];i.length&&(e("li[data-letter]",a).each((function(t,a){n.push(e(this).attr("data-letter"))})),r=n.filter((function(e,t,a){return a.indexOf(e)===t})).sort(),e.each(r,(function(t,a){e('<span data-letter="'+a+'">'+a+"</span>").appendTo(i)})))}))},accordionItems:function(){e(".reyajfilter-layered-nav.--accordion").each((function(t,a){var r=e(a);e(".__toggle",r).each((function(t,a){var r=e(a);r.next("a").is("[data-prevent-collapse]")||r.parent("li").hasClass("chosen")||(r.addClass("--collapsed"),r.nextAll("ul.children").addClass("--hidden"))})),e(".chosen",r).each((function(t,a){var r=e(a).parents("ul");r.siblings(".__toggle").removeClass("--collapsed"),r.removeClass("--hidden")})),e(document).trigger("reycore/ajaxfilters/accordion_loaded",[r.parent()])}))},stickyTopFilter:function(){if(rey.vars.is_desktop){var t=e(".filters-top-sidebar.rey-filterSidebar.--sticky");if(t.length){var a=t.offset().top,r=function(){t.toggleClass("--is-sticked",window.pageYOffset>a)};r(),e(window).on("scroll",rey.util.debounce((function(e){r()}),50)),e(window).on("resize",rey.util.debounce((function(e){a=t.offset().top}),500))}}},changeVariableProductImage:function(t){t=t||e(".reyajfilter-before-products ul.products"),e("li.product .rey-productVariations",t).each((function(t,a){var r=e(a),i=r.attr("data-attribute-name");if(i){var n=e('.reyajfilter-layered-nav[data-taxonomy="'+i.replace("attribute_","")+'"] li.chosen > a');if(n.length){var l=n.first().attr("data-slug")||"";if(l){var s=e('span[data-slug="'+l+'"]',r);s.length&&setTimeout((function(){s.parent("li").trigger("click")}),100)}}}})),e("li.product .wvs-archive-variation-wrapper",t).each((function(t,a){var r=e("li:first-child > select",a),i=r.attr("data-attribute_name");if(i){var n=e('.reyajfilter-layered-nav[data-taxonomy="'+i.replace("attribute_","")+'"] li.chosen > a');if(n.length){var l=n.first().attr("data-slug")||"";if(l){var s=r.next("ul.variable-items-wrapper");e('li[data-value="'+l+'"]',s).trigger("click"),r.val(l).trigger("change").trigger("click").trigger("focusin"),s.trigger("wvs-selected-item",[l,r,e(a)])}}}}))},events:function(){var t,a,r=this;if(rey.hooks.addAction("toggle_sidepanel",(function(e,t){e&&"filter-panel"===t.config.name&&r.stickyActiveFilter()})),e(document).on("input keyup",'.reyajfilter-search-filter input[type="search"]',(function(a){var i=e(this);clearTimeout(t),t=setTimeout((function(){r._request_main&&r._request_main.abort();var e=i.val(),t=i.attr("data-key");if(""!==e&&e.length>=3)""!=r.activeSearchTerm&&r.activeSearchTerm==e||r.updateQueryStringParameter(t,e);else{var a=r.removeQueryStringParameter(t);r.setHistory(a)}r.activeSearchTerm=e,r.isApplyFilterEnabled||r.filterProducts()}),400)})),e(document).on("click",".reyajfilter-ajax-term-filter li a:not([data-prevent-filter])",(function(t){t.preventDefault();var a=e(this),i=a.parent(),n=a.closest(".reyajfilter-layered-nav");if(!a.hasClass("js-reset-filter"))if(n.hasClass("--range-points"))r.handleRangePoints(this);else{a.closest("ul");var l=a.attr("data-key"),s=a.attr({id:"data-value",slug:"data-slug"}[n.attr("data-vtype")||"id"]),o=a.attr("data-multiple-filter"),c=i.hasClass("chosen");if(a.is('[data-to-shop="1"]')){var d=n.attr("data-shop");if(d)return void(window.location=d)}var p=a.prevAll(".__toggle"),f=e(t.target);if(!p.length||f.is("span.__checkbox")){var h=!1;r.isApplyFilterEnabled&&(h=n.hasClass("--apply-multiple"),o||h?i.toggleClass("chosen"):c?i.removeClass("chosen"):(e("li",n).removeClass("chosen"),i.addClass("chosen"))),a.is('[data-jump="1"]')?r.replaceCategory({url:a.attr("href"),filter_out:["product-cato","product-cata"]}):(o||h?r.makeParameters(l,s):r.singleFilter(l,s),r.filterProducts())}else p.trigger("click")}})),e(document).on("click",".reyajfilter-ajax-term-filter .reyajfilter-backBtn a",(function(t){t.preventDefault();var a=e(this),i=a.attr("data-key"),n=a.attr({id:"data-value",slug:"data-slug"}[a.attr("data-vtype")]);a.attr("data-shop")?(r.singleFilter(i,n),r.filterProducts()):r.replaceCategory({url:a.attr("href"),filter_out:["product-cato","product-cata",i]})})),e(".reyajfilter-ajax-meta-filter").on("click","li a",(function(t){t.preventDefault();var a=e(this),i=a.parent(),n=(a.closest(".reyajfilter-layered-nav"),a.closest("ul")),l=a.attr("data-key"),s=a.attr("data-value"),o=a.attr("data-multiple-filter"),c=i.hasClass("chosen");r.isApplyFilterEnabled&&(1==o?i.toggleClass("chosen"):c?i.removeClass("chosen"):(n.children().removeClass("chosen"),i.addClass("chosen"))),1==o?r.makeParameters(l,s):r.singleFilter(l,s),r.filterProducts()})),reyajaxfilter_params.pagination_container.length>0){var i=reyajaxfilter_params.pagination_container+" a";e(document).on("click",i,(function(t){t.preventDefault();var a=e(this).attr("href");r.setHistory(a),r.filterProducts(!0,!0)}))}window.addEventListener("popstate",(t=>{rey.vars.is_mobile&&reyajaxfilter_params.prevent_mobile_popstate||"#"!=document.location.href.substring(document.location.href.length-1)&&(document.location.href.split("#").length>1||e(reyajaxfilter_params.shop_loop_container).length&&r.filterProducts())})),e(document).on("click",".reyajfilter-active-filters a:not(.reset)",(function(t){t.preventDefault();var a=e(this),i=a.attr("data-key"),n=a.attr("data-value");if(void 0===n){var l=r.removeQueryStringParameter(i);r.setHistory(l)}else r.makeParameters(i,n);r.filterProducts(!0)})),e(document).on("click",".reyajfilter-active-filters a.reset, .js-reset-filter, .js-rey-filter-reset",(function(t){t.preventDefault();var a=e(this).attr("data-location");r.setHistory(a),r.filterProducts(!0)})),e(document).on("change",'.js-reyajfilter-check-filter input[type="checkbox"], .js-reyajfilter-check-filter input[type="radio"]',(function(t){t.preventDefault();var a=e(this),i=a.attr("data-key"),n=a.val();if(a.prop("checked"))r.updateQueryStringParameter(i,n);else{var l=r.removeQueryStringParameter(i);r.setHistory(l)}r.filterProducts()})),e(document).on("change",".reyajfilter-select2",(function(t){t.preventDefault(),e(this).hasClass("reyajfilter-select2--prices")?r.handlePriceSelect2(t):r.handleDefaultSelect2(t)})),e(document).on("click",".js-rey-applyFilters-btn",(function(t){t.preventDefault(),e(this).addClass("--disabled"),r.filterProducts(!0)})),e(document).on("click",".reyajfilter-layered-nav[data-height] .reyajfilter-customHeight-all",(function(t){t.preventDefault();var a=e(this).closest(".reyajfilter-layered-nav"),r=a.find(".reyajfilter-layered-navInner");if(a.hasClass("--reset-height"))return r.css("height",a.attr("data-height")),void a.removeClass("--reset-height");r.css("height",""),a.addClass("--reset-height")})),e(document).on("input",".js-reyajfilter-searchbox input",rey.util.debounce((function(t){t.preventDefault();var a=e(this).closest(".widget").find(".reyajfilter-layered-list"),r=e("li > a",a),i=new RegExp(t.target.value,"gi");r.parent().addClass("--hidden"),r.filter((function(){var t=e(this).closest("li").attr("data-rey-tooltip");return e(this).text().match(i)||(t?t.match(i):"")})).parents("li").removeClass("--hidden")}),400)),e(document).on("click",".reyajfilter-dp-clear[data-key]",(function(t){t.preventDefault();var a=e(this),i=a.attr("data-key");if(i){if(a.css("opacity",.7),a.closest(".reyajfilter-dp").css("pointer-events","none"),-1!==i.indexOf(","))var n=i.split(","),l=r.removeQueryStringParameter(n);else l=r.removeQueryStringParameter(i);r.setHistory(l),r.filterProducts()}})),e(document).on("submit","form.reyajfilter-price-filter--custom",(function(t){t.preventDefault();var a=e(this);r.isApplyFilterEnabled||a.css({"pointer-events":"none",opacity:.7});var i=r.updateQueryStringParameters([{key:"min-price",value:e('input[name="min-price"]',a).val()},{key:"max-price",value:e('input[name="max-price"]',a).val()}],!1);i&&(r.setHistory(i),r.filterProducts())})),e(document).on("click",".reyajfilter-alphabetic span",(function(t){t.preventDefault();var a=e(this),i=a.parent(),n=a.attr("data-letter")||"",l=i.nextAll(".reyajfilter-layered-nav").find("li[data-letter]");if(a.hasClass("reyajfilter-alphabetic-all"))return i.children().removeClass("--active"),a.addClass("--active"),l.removeClass("--hidden"),void r.initScrollbarContainer(i);i.children().removeClass("--active"),a.addClass("--active"),l.addClass("--hidden");var s=l.filter('[data-letter="'+n+'"]');s.removeClass("--hidden"),s.parents("li[data-letter]").removeClass("--hidden"),r.initScrollbarContainer(i)})),rey.hooks.addAction("ajaxfilters/started",(function(){var t=e(reyajaxfilter_params.shop_loop_container);t.hasClass("--anim-default")&&e("li.product",t).animate({visibility:"hidden",opacity:0},30),rey.elements.body.classList.add("--is-filtering")})),e(document).on("click",".reyajfilter-layered-nav.--accordion .__toggle",(function(t){t.preventDefault(),e(this).toggleClass("--collapsed"),e(this).nextAll("ul.children").toggleClass("--hidden")})),rey.hooks.addAction("sidebars/toggle_widget",(function(e,t,a){a&&r.initScrollbarContainer(t)})),rey.hooks.addAction("toggle_sidepanel",(function(e,t){!a&&e&&(r.initScrollbarContainer(t.panel),a=!0)}))}};document.addEventListener("rey-DOMContentLoaded",(function(e){t.init()}))}(jQuery);