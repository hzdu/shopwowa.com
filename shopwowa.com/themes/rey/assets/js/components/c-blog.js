!function(){"use strict";var t=function(){this.blogColumnsMasonry=!1,this.init=function(){this.blogColumns(),this.toggleComments(),rey.hooks.addAction("post/loaded",(t=>{this.blogColumns(t)}))},this.toggleComments=function(){document.querySelectorAll(".js-toggle-target").forEach((t=>{t.addEventListener("click",(function(o){o.preventDefault();var e=t.getAttribute("data-target");if(e){var n=document.querySelectorAll(e);n.length&&(t.classList.contains("--toggled")?(t.classList.remove("--toggled"),t.style.display="block",rey.animation.slideUp(n[0],400)):(t.classList.add("--toggled"),rey.animation.slideDown(n[0],400)))}}))}))},this.blogColumns=function(t){var o=document.querySelectorAll(".rey-siteMain[class*='blog--columns-']:not(.blog--columns-1) .rey-postList");o.length&&(rey.vars.is_mobile||(jQuery&&void 0===jQuery.fn.masonry?rey.log({script:"masonry"}):rey.util.imagesLoaded(o,(()=>{this.blogColumnsMasonry?this.blogColumnsMasonry.masonry("appended",t):(this.blogColumnsMasonry=jQuery(o).masonry({itemSelector:".rey-postItem",percentPosition:!0,transitionDuration:0,isInitLayout:!1,originLeft:!rey.vars.is_rtl}),this.blogColumnsMasonry.masonry())}))))},this.init()};document.addEventListener("rey-DOMContentLoaded",(function(){new t}))}();