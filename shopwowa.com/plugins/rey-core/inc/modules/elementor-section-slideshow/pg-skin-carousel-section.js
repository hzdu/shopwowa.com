!function(e){"use strict";var t=function(t){var o=e(".reyEl-productGrid",t),n=e("> .splide",o),i=t.closest(".elementor-section.elementor-top-section");if(n.length&&e("ul.products li.product",n).length){var s=JSON.parse(o.attr("data-carousel-section-settings")||"{}"),a={type:"slide",perPage:1,autoplay:s.autoplay&&s.autoplaySpeed?parseInt(s.autoplaySpeed):0,gap:0,rewind:!0,arrows:!1,pagination:!1,speed:void 0!==s.animationDuration?parseInt(s.animationDuration):400},r=i.children(".rey-section-slideshow");if(r.length)if(JSON.parse(r.attr("data-rey-slideshow-settings")||"{}").mobile,!!rey.vars.is_desktop)return void rey.hooks.addAction("rey/slider",((t,o)=>{r[0].isEqualNode(t.element)&&(rey.components.slider({element:n[0],config:a,customPagination:s.customPagination,cb:function(e){e.on("move",(function(e){o.length<e+1||o.go(e)}))}}),e(s.customPagination).addClass("--visible"))}));if(rey.frontend.inView({target:n[0],cb:e=>{rey.components.slider({element:e.target,config:a,delay:1e3,customPagination:s.customPagination})},once:!0}),!r.length){var l=e("#tmpl-slideshow-tpl-"+t.attr("data-id"),t).removeClass("rey-section-slideshow--template").addClass("rey-section-slideshow").prependTo(i),d=Object.assign({},a);d.type="fade",rey.hooks.addAction("rey/slider",((e,t)=>{n[0].isEqualNode(e.element)&&rey.components.slider({element:l[0],config:d,cb:function(e){t.on("move",(function(t){e.go(t)}))}})}))}}};rey.hooks.addAction("elementor/init",(function(e){e.registerElement({name:"reycore-product-grid.carousel-section",cb:t})}))}(jQuery);