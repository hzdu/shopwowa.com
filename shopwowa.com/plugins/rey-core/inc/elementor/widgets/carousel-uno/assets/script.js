!function(e){"use strict";var n=function(n){if(rey.vars.is_edit_mode||!n.hasClass("--init")){n.addClass("--init");var t=n[0],a=e(".rey-carouselUno",n),o=e(".splide",n),i=e(".cUno-slide",o),s=e(".cUno-caption",a),r=e(".cUno-nav",a),c=JSON.parse(a.attr("data-slider-settings")||"{}");if(!c.sync){var d={type:c.type,autoplay:c.autoplay,interval:parseInt(c.interval),speed:parseInt(c.speed),pauseOnHover:c.pauseOnHover,rewind:!0,perPage:1,gap:0,arrows:!1,pagination:!1};if(void 0!==rey.components.videoHelper){var l=rey.components.videoHelper({containers:t.querySelectorAll(".cUno-slide")});l.init()}var u=function(n,t){var a=e("video",i.eq(n));a.length&&a[0][t]()};rey.hooks.addAction("rey/slider",((n,t)=>{if(o[0].isEqualNode(n.element)){if(c.syncId){var i=e("."+c.syncId);if(i.length){var d=JSON.parse(i.closest(".rey-carouselUno").attr("data-slider-settings")||"{}"),p=rey.components.slider({element:i[0],config:{type:d.type,speed:parseInt(d.speed),rewind:!0,perPage:1,gap:0,arrows:!1,pagination:!1}});t.sync(p.slider).mount()}}t.on("mounted",(function(){a.removeClass("--loading").addClass("--init"),"outside"===c.contentPosition&&s.eq(0).addClass("--active"),u(0,"play"),l&&l.changeState(0,"play")})),t.on("move",(function(n,t){"outside"===c.contentPosition&&(s.removeClass("--active"),s.eq(n).addClass("--active")),r.length&&r.each((function(t,a){e(a).children("button").removeClass("--active"),e(a).children("button").eq(n).addClass("--active")})),u(t,"pause"),l&&l.changeState(t,"")})),t.on("moved",(function(e){u(e,"play"),l&&l.changeState(e,"play")}))}})),rey.frontend.inView({target:o[0],cb:e=>{rey.components.slider({element:e.target,config:d,customArrows:c.customArrows,customPagination:c.customPagination,animateHeight:c.animateHeight,mount:!c.syncId})},once:!0})}}};document.addEventListener("rey/preloader/loaded",(function(){e(".elementor-widget-reycore-carousel-uno").each((function(t,a){new n(e(a))}))})),rey.hooks.addAction("elementor/init",(function(e){e.registerElement({name:"reycore-carousel-uno.default",cb:function(e){new n(e)}})}))}(jQuery);