!function(t){"use strict";var e=function(t){var e=this;this.init=function(){rey.vars.is_desktop&&(this.product=t,this.product.hasAttribute("data-colspan-loaded")||(this.product.setAttribute("data-colspan-loaded",""),this.product.closest(".--prevent-colspan")||(this.image=this.product.querySelector(".rey-thumbImg"),this.image&&(this.image.hasAttribute("src")?this.run():this.image.addEventListener("load",(()=>{this.run()})),this.grid=this.product.closest("ul.products"),this.getParentWidth(),this.events()))))},this.events=function(){window.addEventListener("resize",rey.util.debounce((()=>{this.getParentWidth()}),500)),rey.hooks.addAction("view_selector/load",(()=>{this.getParentWidth()})),rey.hooks.addAction("view_selector/change_cols",(()=>{this.getParentWidth()}))},this.getParentWidth=function(){this.grid&&this.product.style.setProperty("--grid-width",this.grid.offsetWidth+"px")},this.run=function(){var t=new Image;t.src=this.image.getAttribute("src"),t.addEventListener("load",(function(){e.product.style.setProperty("--aspect-ratio",(this.naturalHeight||1)/(this.naturalWidth||1)||1)}))},this.init()};document.addEventListener("rey-DOMContentLoaded",(function(){document.querySelectorAll("li.product[data-colspan]").forEach((t=>{new e(t)}))})),rey.hooks.addAction("product/loaded",(function(t){t.forEach((t=>{t.hasAttribute("data-colspan")&&new e(t)}))})),rey.hooks.addAction("ajaxfilters/finished",(function(t){t&&t.querySelectorAll("li.product[data-colspan]").forEach((t=>{new e(t)}))})),rey.hooks.addAction("elementor/init",(function(t){t.registerElement({name:"reycore-product-grid.default",cb:function(t){t[0].querySelectorAll("li.product[data-colspan]").forEach((t=>{new e(t)}))}})}))}(jQuery);