!function(t){"use strict";var i=function(){var i=this;this.mobileStart,this.windowHeight,this.mobileEnd,this.startPoint,this.finishPoint,this.cartTop,this.cartHeight,this.__sticked=!1,this.satcOpen=!1,this.init=function(){if(this.$productCartForm=t(".rey-siteContent form.cart"),this.$productCartForm.length||(this.$productCartForm=t(".rey-siteContent .summary.entry-summary"),this.$productCartForm.length)){if(this.$satcWrapper=t(".rey-stickyAtc"),this.$satcBtn=t(".single_add_to_cart_button",this.$satcWrapper),this.satcOpenBtn=document.querySelector(".rey-stickyAtc .rey-satc-openBtn"),this.$satc__VariationsForm=t(".variations_form",this.$satcWrapper),this.mobileFromTop=this.$satcWrapper.is("[data-mobile-from-top]"),this.$productSummary=t(".rey-productSummary"),!t('.wccf_product_field[data-wccf-quantity-based="1"]').length)return this.$satc__VariationsForm.addClass("--prevent-scroll-to-gallery"),this.events(),this;this.$satcWrapper.remove()}},this.events=function(){rey.util.imagesLoaded(this.$satcWrapper,(function(){i.getData()})),t(window).on("resize",rey.util.debounce((function(){i.getData()}),500)),t(window).on("scroll",(function(){var t,s=window.pageYOffset;if(rey.vars.is_mobile){var r=s<=i.mobileStart-i.windowHeight,e=s>=i.mobileEnd;t=i.mobileFromTop&&r||e}else t=s>=i.startPoint,i.finishPoint&&(t=s>=i.startPoint&&s<i.finishPoint);t?i.__sticked||(i.$satcWrapper.addClass("--visible"),i.__sticked=!0):i.__sticked&&(i.$satcWrapper.removeClass("--visible"),i.satcOpenBtn&&i.satcOpenBtn.classList.remove("--visible"),i.__sticked=!1)})).trigger("scroll"),this.satcOpenBtn&&this.satcOpenBtn.addEventListener("click",(t=>{t.preventDefault(),window.scrollTo({top:(this.cartTop?this.cartTop:this.$productCartForm.offset().top)-30,behavior:"smooth"})}))},this.getData=function(){this.startPoint=this.getPoint("data-start-point"),this.finishPoint=this.getPoint("data-finish-point"),!1===this.startPoint&&(this.cartTop=this.$productCartForm.offset().top,this.cartHeight=this.$productCartForm.height(),rey.elements.body.classList.contains("--fixed-summary")&&this.$productSummary.length?this.startPoint=this.$productSummary.height()-400:this.startPoint=this.cartTop+this.cartHeight),this.windowHeight=t(window).height(),this.mobileStart=this.$productCartForm.offset().top,this.mobileEnd=this.$productCartForm.offset().top+this.$productCartForm.height()},this.getPoint=function(i){i=i||"data-finish-point";var s=!1,r=this.$satcWrapper.attr(i)||"";if(""!==r)if(isNaN(r)){var e=t(r);e.length&&(s=e.offset().top-e.height())}else s=parseInt(r);return!1!==s&&s},this.init()};document.addEventListener("rey-DOMContentLoaded",(function(t){new i}))}(jQuery);