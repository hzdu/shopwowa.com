!function(){"use strict";class t{elements={};options={};vars={rootMargin:"100% 0% 100% 0%",threshold:.995,currentIndex:0,currentItem:0,variationHandlerType:"classic",itemClassSelector:".woocommerce-product-gallery__image",defaultGalleryHTML:"",lastGalleryHTML:"",shortcircut:!1};components={zoom:{}};events={inView:{},goTo:{},resize:[],scroll:[]};debug={app:!1,zoom:!1,observer:!1,thumbIntoView:!1,scrollToItem:!1,galleryReplace:!1,variationEvents:!1};__itemsObserver=null;constructor(t,e){this.options=Object.assign({id:"main",onLightboxOpen:()=>{},onLightboxDestroy:()=>{},directRun:!1,variationForm:null},e),this.elements.gallery=t,this.vars.defaultGalleryHTML=this.vars.lastGalleryHTML=this.elements.gallery.outerHTML,this.options=Object.assign(this.options,JSON.parse(this.elements.gallery.getAttribute("data-params")||"{}")),this.setupMainImage()&&(this.fireEvent("beforeInit",{app:this},document),this.vars.shortcircut||this.onImageLoaded(this.elements.mainImage,this.init.bind(this),0!==this.options.start_index||this.options.directRun))}init(){this.setupMainImage()&&(this.setupDom(),this.setupComponents(),this.setupEvents(),this.setupObserver(),this.afterSetup())}setupMainImage(){if(this.elements.mainImage=this.elements.gallery.querySelector(".woocommerce-product-gallery__image[data-main-item] .wp-post-image"),"SOURCE"===this.elements.mainImage.tagName&&(this.elements.mainImage=this.elements.mainImage.parentElement),this.elements.mainImage)return!0}setupDom(){this.elements.galleryTrack=this.elements.gallery.querySelector(".woocommerce-product-gallery__wrapper"),this.elements.galleryTrack&&(this.elements.galleryItems=this.elements.galleryTrack.querySelectorAll(".woocommerce-product-gallery__image"),this.elements.gallery.classList.remove("--odd","--even"),this.elements.gallery.classList.add(this.vars.count%2?"--odd":"--even"),this.vars.count=this.elements.galleryItems.length,this.vars.isVertical="vertical"===this.options.type,this.vars.isHorizontal="horizontal"===this.options.type,this.vars.isSingular=this.vars.isVertical||this.vars.isHorizontal||!rey.vars.is_desktop)}setupComponents(){this.fireEvent("beforeComponents",{app:this},document),this.components.variations=new h(this),this.components.thumbs=new e(this),this.components.arrows=new i(this),this.components.lightbox=new p(this),this.components.autoHeight=new l(this),this.components.galleryVideos=new m(this),this.components.animateImages=new n(this),this.components.cascadeBullets=new o(this),this.components.counter=new r(this),this.mobileDots()}setupEvents(){var t;this.__debouncedResize=rey.util.debounce((()=>{this.events.resize.forEach((t=>{t.call(this)}))}),500),window.addEventListener("resize",this.__debouncedResize),this.__debouncedScroll=rey.util.debounce((()=>{this.events.scroll.forEach((t=>{t.call(this)}))}),100),window.addEventListener("scroll",this.__debouncedScroll),this.elements.galleryTrack.addEventListener("transitionend",rey.util.debounce((t=>{"height"===t.propertyName&&t.target===this.elements.galleryTrack&&(this.vars.isAnimating=!1)}),100)),this.elements.galleryTrack.addEventListener("scroll",(e=>{clearTimeout(t),t=setTimeout((()=>{this.fireEvent("onScrollStop",{app:this})}),66)}),!1)}removeEvents(){window.removeEventListener("resize",this.__debouncedResize),window.removeEventListener("scroll",this.__debouncedScroll)}update(){this.removeEvents(),this.__itemsObserver&&this.__itemsObserver.disconnect(),this.components.zoom={},Object.keys(this.components).forEach((t=>{void 0!==this.components[t].destroy&&this.components[t].destroy()})),this.init()}getComponent(t){if(void 0!==this.components[t])return this.components[t]}setupObserver(){this.__itemsObserver=rey.frontend.inView({target:this.elements.galleryItems,offset:this.vars.threshold,once:!1,rootMargin:this.vars.rootMargin,name:"pdp_gallery",cb:this.runObserver.bind(this)})}runObserver(t){t.itemIndex=parseInt(t.target.getAttribute("data-index")||0),t.itemImage=t.target.querySelector(".__img"),this.vars.currentItem=t.target,this.vars.currentIndex=t.itemIndex,this.itemIsReady(t)||(Object.values(this.events.inView).forEach((e=>{e.call(this,t)})),this.zoom(t),this.fireEvent("onEntry",{entry:t,app:this}),this.debug.observer&&console.log(":: InView Entry",t))}itemIsReady(t){if(t.itemImage&&(t.itemImage="picture"===t.itemImage.tagName.toLowerCase()?t.itemImage.querySelector("img"):t.itemImage),t.itemImage&&t.itemImage.hasAttribute("data-rey-lazy-src")&&!t.itemImage.hasAttribute("data-lazy-loaded")){return this.onImageLoaded(t.itemImage,(t=>{"picture"===t.itemImage.parentElement.tagName.toLowerCase()&&t.itemImage.parentElement.setAttribute("data-lazy-loaded",""),t.itemImage.setAttribute("data-lazy-loaded",""),t.target.setAttribute("data-image-loaded",""),this.runObserver(t)}).bind(this,t)),t.itemImage.getAttribute("src")||t.itemImage.setAttribute("src",t.itemImage.getAttribute("data-rey-lazy-src")),!0}this.fireEvent("onItemReady",{entry:t,app:this})}onImageLoaded(t,e,s){var i="picture"===t.tagName.toLowerCase()?t.querySelector("img"):t;i.complete&&i.naturalHeight||s?e():i.addEventListener("load",e,{once:!0})}zoom(t){void 0===this.components.zoom[t.itemIndex]&&(this.components.zoom[t.itemIndex]=new a(this,t),this.options.start_index===t.itemIndex&&(this.components.zoomMain=this.components.zoom[this.options.start_index]))}mobileDots(){"thumbs"!==this.options.mobile_gallery_nav&&(this.components.dotsNav=new s({navSelector:".dotsNav",goToCallbacks:{scroll_to_item:(t,e)=>{this.scrollToItem(e)}}},this))}goToItem(t){this.vars.count<=1||void 0!==this.elements.galleryItems[t]&&(this.fireEvent("onTarget",{targetIndex:t,app:this}),Object.keys(this.events.goTo).forEach((e=>{this.events.goTo[e].call(this,this.elements.galleryItems[t],t)})))}toggleActive(t,e){e.forEach((t=>{t.classList.remove("--active")})),e[t],e[t].classList.add("--active")}scrollToItem(t){if(!(t<0)){var e=Math.ceil(this.elements.galleryTrack.clientWidth*t);this.debug.scrollToItem&&console.log(":: ScrollToItem",t,e),this.elements.galleryTrack.scrollTo({behavior:"auto",left:rey.vars.is_rtl?-1*e:e})}}getHeaderOffset(){var t=20;return rey.elements.header&&rey.elements.header.classList.contains("header-pos--fixed")&&(t+=rey.headerHeight),t}setLoading(t){this.elements.gallery.classList.toggle("--loading",!0===t)}isVisible(t){return!!t&&!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}isVariationForm(){if(this.options.variationForm?this.elements.variationForm=this.options.variationForm:this.elements.variationForm=document.querySelector(`form.variations_form[data-product_id="${this.options.product_page_id||0}"]`),this.elements.variationForm)return this.vars.defaultIsVariation=this.elements.gallery.classList.contains("--default-variation-img"),!0}resetDefaultVariation(){this.elements.gallery.classList.remove("--default-variation-img"),this.vars.defaultIsVariation=!1}afterSetup(){this.fireEvent("init",{app:this}),rey.components.pdpGalleries[this.options.id]=this,this.debug.app&&console.log(":: App",this)}fireEvent(t,e,s){var i=document===s?"rey/pdpGallery/":"";(s||this.elements.gallery).dispatchEvent(new CustomEvent(i+t,{detail:e}))}on(){this.elements.gallery.addEventListener(...arguments)}off(){this.elements.gallery.removeEventListener(...arguments)}}class e{scrollSize=null;clientSize=null;prevBtn=null;nextBtn=null;thumbsNavItems=[];constructor(t){if(this.app=t,this.thumbsNav=this.app.elements.gallery.querySelector(".__thumbs-wrapper"),this.thumbsNav&&this.app.isVisible(this.thumbsNav)&&(this.thumbsNavTrack=this.thumbsNav.querySelector(".__thumbs-track"),this.thumbsNavItems=this.thumbsNavTrack.querySelectorAll(".__thumbs-track button[data-index]"),this.thumbsNavItems.length))return this.watchLazyImages(),this.thumbsArrows(),this.thumbsArrowsEvents(),this.bindEvents(),this}bindEvents(){this.thumbsNavItems.forEach((t=>{t.addEventListener(this.app.options.thumb_event||"click",(t=>{t.preventDefault();var e=parseInt(t.currentTarget.getAttribute("data-index")||0);this.app.goToItem(e)}))})),this.app.events.inView.thumbs=t=>{this.app.vars.count>1&&(this.app.toggleActive(t.itemIndex,this.thumbsNavItems),setTimeout((()=>{this.thumbIntoView(t.itemIndex)}),10))},this.app.events.goTo.scroll_to_item=(t,e)=>{this.app.scrollToItem(e)}}watchLazyImages(){if(this.app.options.lazy_images){var t=this.thumbsNav.querySelectorAll("[data-rey-lazy-src]:not([data-lazy-loaded])");t.length&&rey.frontend.inView({target:t,offset:.2,once:!0,rootMargin:"0% 0% 0% 0%",name:"pdp_thumbs_lazy",cb:t=>{t.target.addEventListener("load",(()=>{t.target.parentElement.classList.add("--img-loaded"),t.target.setAttribute("data-lazy-loaded","true")})),t.target.setAttribute("src",t.target.getAttribute("data-rey-lazy-src"))}})}}thumbsArrows(){rey.vars.is_desktop&&(this.needsArrows=this.app.vars.isVertical?this.thumbsNavTrack.scrollHeight>this.thumbsNavTrack.clientHeight:this.thumbsNavTrack.scrollWidth>this.thumbsNavTrack.clientWidth,this.prevBtn=this.thumbsNav.querySelector('.__thumbs-arr button[data-dir="<"]'),this.nextBtn=this.thumbsNav.querySelector('.__thumbs-arr button[data-dir=">"]'),this.getThumbsTrackProps())}thumbsArrowsEvents(){this.prevBtn&&this.nextBtn&&(this.thumbsNav.classList.toggle("--visible-arr",this.needsArrows),this.nextBtn.addEventListener("click",(t=>this.handleArrowClick(t))),this.prevBtn.addEventListener("click",(t=>this.handleArrowClick(t))),this.thumbsNavTrack.addEventListener("scroll",rey.util.debounce((()=>{this.scrollPos=Math.round(this.app.vars.isVertical?this.thumbsNavTrack.scrollTop:rey.vars.is_rtl?-1*this.thumbsNavTrack.scrollLeft:this.thumbsNavTrack.scrollLeft),this.scrollPos+this.clientSize>=this.scrollSize?rey.vars.is_rtl?(this.prevBtn.setAttribute("data-disabled",""),this.nextBtn.removeAttribute("data-disabled")):(this.prevBtn.removeAttribute("data-disabled"),this.nextBtn.setAttribute("data-disabled","")):0===this.scrollPos?rey.vars.is_rtl?(this.prevBtn.removeAttribute("data-disabled"),this.nextBtn.setAttribute("data-disabled","")):(this.prevBtn.setAttribute("data-disabled",""),this.nextBtn.removeAttribute("data-disabled")):(this.prevBtn.removeAttribute("data-disabled"),this.nextBtn.removeAttribute("data-disabled"))}),100)),this.app.events.resize.push((()=>{this.getThumbsTrackProps()})),this.app.elements.galleryTrack.addEventListener("transitionend",rey.util.debounce((t=>{"height"===t.propertyName&&t.target===this.app.elements.galleryTrack&&this.getThumbsTrackProps()}),100)))}thumbIntoView(t){"click"===this.app.options.thumb_event&&requestAnimationFrame((()=>{this.app.debug.thumbIntoView&&console.log(":: ThumbIntoView",t);var e=this.thumbsNavItems[t],s=this.thumbsNavTrack;if(this.app.vars.isVertical&&rey.vars.is_desktop){var i=e.offsetTop-s.offsetTop-s.clientHeight/2+e.clientHeight/2;s.scrollTop=Math.max(0,i)}else{i=e.offsetLeft-s.offsetLeft-s.clientWidth/2+e.clientWidth/2;s.scrollLeft=rey.vars.is_rtl?i:Math.max(0,i)}}))}handleArrowClick(t){if(t.preventDefault(),null===t.currentTarget.getAttribute("data-disabled")){var e=this.app.vars.isVertical?0:this.thumbsNavTrack.clientWidth,s=this.app.vars.isVertical?this.thumbsNavTrack.clientHeight:0;">"===(t.currentTarget.getAttribute("data-dir")||">")?this.thumbsNavTrack.scrollBy(e,s):this.thumbsNavTrack.scrollBy(-e,-s)}}getThumbsTrackProps(){this.scrollSize=Math.round(this.app.vars.isVertical?this.thumbsNavTrack.scrollHeight:this.thumbsNavTrack.scrollWidth),this.clientSize=Math.round(this.app.vars.isVertical?this.thumbsNavTrack.clientHeight:this.thumbsNavTrack.clientWidth)}resetFirstThumb(){this.dirty&&this.updateFirstThumb(this.app.options.product_main_image.thumb[0])}updateFirstThumb(t){t&&this.thumbsNavItems.length&&(this.firstThumb=this.thumbsNavTrack.querySelector(`.__thumbItem[data-index="${this.app.options.start_index}"] .woocommerce-product-gallery__mobile-img`),this.firstThumb&&(this.firstThumb.setAttribute("src",t),this.dirty=!0))}}class s{constructor(t,e){if(this.app=e,this.navOptions=Object.assign({navSelector:".__nav-wrapper",goToCallbacks:[]},t),this.navWrapper=this.app.elements.gallery.querySelector(this.navOptions.navSelector),this.navWrapper&&this.app.isVisible(this.navWrapper))return this.navItems=this.navWrapper.querySelectorAll(".__navItem"),this.events(),this}events(){this.navItems.forEach((t=>{t.addEventListener("click",(t=>{var e=parseInt(t.target.getAttribute("data-index")||0);this.app.goToItem(e)}))})),Object.keys(this.navOptions.goToCallbacks).forEach((t=>{this.app.events.goTo[t]=this.navOptions.goToCallbacks[t]})),this.app.events.inView["dots"+this.navOptions.navSelector]=t=>{this.app.vars.count>1&&this.app.toggleActive(t.itemIndex,this.navItems)}}}class i{constructor(t){this.app=t,this.app.elements.arrWrapper=this.app.elements.gallery.querySelector(".__arr-wrapper"),this.app.elements.arrWrapper&&this.app.isVisible(this.app.elements.arrWrapper)&&this.init()}init(){this.prevBtn=this.app.elements.arrWrapper.querySelector('button[data-dir="<"]'),this.nextBtn=this.app.elements.arrWrapper.querySelector('button[data-dir=">"]'),this.prevBtn&&this.nextBtn&&(this.rewind=this.app.options.loop,this.events())}events(){this.app.events.goTo.scroll_to_item=this.registerGoToCallbacks.bind(this),this.app.events.inView.arrow=this.startEnd.bind(this),this.prevBtn.addEventListener("click",this.handleClick.bind(this)),this.nextBtn.addEventListener("click",this.handleClick.bind(this))}handleClick(t){t.preventDefault();var e=this.app.vars.currentIndex;null===t.currentTarget.getAttribute("data-disabled")&&("<"===(t.currentTarget.getAttribute("data-dir")||"<")?0===this.app.vars.currentIndex?e=this.rewind?this.app.vars.count-1:0:e--:this.app.vars.currentIndex===this.app.vars.count-1?e=this.rewind?0:this.app.vars.count-1:e++,this.app.goToItem(e))}registerGoToCallbacks(t,e){this.app.scrollToItem(e)}startEnd(t){this.app.vars.count>1&&(this.rewind||(t.itemIndex===this.app.vars.count-1?this.nextBtn.setAttribute("data-disabled",""):0===t.itemIndex?this.prevBtn.setAttribute("data-disabled",""):(this.prevBtn.removeAttribute("data-disabled"),this.nextBtn.removeAttribute("data-disabled"))))}}class a{containerWidth=null;containerHeight=null;loadedImage=!1;zoomContainer=null;zoomImage=null;dirty=!1;constructor(t,e){if(this.app=t,this.container=e.target,this.canRun()&&!this.container.querySelector(".rey-zoomContainer")&&(this.image=e.itemImage||this.container.querySelector(".__img"),this.image))return this.largeImageSrc=this.image.getAttribute("data-large_image")||"",this.largeImageWidth=this.image.getAttribute("data-large_image_width")||0,this.container.addEventListener("mouseenter",(()=>{setTimeout((()=>this.init()),500)}),{once:!0}),this}canRun(){if(this.app.options.zoom&&rey.vars.is_desktop&&!this.container.hasAttribute("data-no-zoom"))return!0}init(){this.zoomImageWidth=parseInt(this.largeImageWidth),this.zoomImageWidth&&(this.zoomImageWidth<=this.container.offsetWidth?console.log("Container size equal or larger than Image width."):(this.app.debug.zoom&&console.log(":: Zoom"),this.createContainer(),this.createImage(),this.events()))}resetImage(){this.dirty&&this.updateImage(this.app.options.product_main_image.src[0],this.app.options.product_main_image.src[1])}updateImage(t,e){t&&e&&this.canRun()&&this.zoomImage&&(this.zoomImageWidth=parseInt(e),this.zoomImage.setAttribute("src",t),this.zoomImage.style.width=this.zoomImageWidth+"px",this.dirty=!0,this.app.debug.zoom&&console.log(":: Zoom Update"))}createContainer(){this.zoomContainer=rey.dom.createEl("div",{attributes:{class:"rey-zoomContainer"},appendTo:this.container})}createImage(){this.zoomImage=rey.dom.createEl("img",{attributes:{src:this.largeImageSrc,alt:"",role:"presentation",style:`position: absolute; width: ${this.zoomImageWidth}px; border: none; max-width: none; max-height: none; ${rey.vars.is_rtl?"left:0;":""}`},appendTo:this.zoomContainer})}events(){this.zoomImage.addEventListener("load",(()=>{this.loadedImage=!0,this.zoomImageHeight=this.zoomImage.naturalHeight,this.zoomImage.style.height=this.zoomImageHeight+"px",this.calcProps()}));var t=0,e=0,s=!1,i=!1;this.container.addEventListener("mousemove",(a=>{this.loadedImage&&(a.target.closest(".btn")||(t=a.offsetX,e=a.offsetY,s||(s=!0,window.requestAnimationFrame((()=>{var a=t/this.containerWidth,r=e/this.containerHeight,o=-(this.zoomImageWidth-this.containerWidth)*a,n=-(this.zoomImageHeight-this.containerHeight)*r;this.zoomImage.style.transform=`translate(${o}px, ${n}px)`,s=!1,i||(this.zoomContainer.classList.add("--ready"),i=!0)})))))})),this.app.elements.galleryTrack.addEventListener("transitionend",rey.util.debounce((t=>{"height"===t.propertyName&&t.target===this.app.elements.galleryTrack&&this.loadedImage&&this.calcProps()}),500)),this.app.events.resize.push((()=>{this.loadedImage&&this.calcProps()}))}calcProps(){this.containerWidth=this.container.offsetWidth,this.containerHeight=this.container.offsetHeight}}class r{component=null;constructor(t){if(this.app=t,this.app.vars.isSingular&&(this.app.options.counter,this.app.elements.counter=this.app.elements.gallery.querySelector(".__counter-wrapper"),this.app.elements.counter))return this.app.elements.counterCurrent=this.app.elements.counter.querySelector(".__current"),this.app.elements.counterTotal=this.app.elements.counter.querySelector(".__total"),this.app.elements.counter.classList.add("--visible"),this.events(),this}events(){this.app.events.inView.counter=t=>{this.app.elements.counterCurrent.textContent=t.itemIndex+1}}}class o{component=null;constructor(t){if(this.app=t,rey.vars.is_desktop&&-1!==["cascade","cascade-scattered"].indexOf(this.app.options.type)&&(this.app.vars.rootMargin="0% 0% 0% 0%",this.app.vars.threshold=.4,this.app.options.cascade_bullets&&this.navigation()))return this.navigationDotsData(),this.events(),this.itemScroll(),this}navigation(){if(this.component=new s({navSelector:".cascadeNav",goToCallbacks:{verticallyscroll:t=>{window.scrollTo({behavior:"smooth",top:rey.dom.offset(t).top-this.app.getHeaderOffset()})}}},this.app),this.component.navWrapper)return this.app.components.cascadeNav=this.component,!0}events(){this.app.events.resize.push((()=>{this.navigationDotsData()})),rey.util.imagesLoaded(this.app.elements.gallery,(t=>{this.navigationDotsVisibility()})),this.app.events.scroll.push((()=>{this.navigationDotsVisibility()}))}navigationDotsData(){this.app.vars.galleryBottom=rey.dom.offset(this.app.elements.gallery).top+this.app.elements.gallery.offsetHeight,this.app.vars.navBottom=rey.dom.offset(this.component.navWrapper).top+this.component.navWrapper.offsetHeight}navigationDotsVisibility(){this.component.navWrapper.classList.toggle("--visible",!(window.pageYOffset>this.app.vars.galleryBottom-this.app.vars.navBottom))}itemScroll(){var t=this.component.navWrapper.querySelector(".__navItem-scroll");t&&t.addEventListener("click",(t=>{t.preventDefault(),window.scrollTo({top:this.app.vars.galleryBottom,behavior:"smooth"})}))}}class n{constructor(t){this.app=t,rey.vars.is_desktop&&this.app.elements.gallery.classList.contains("--supports-animated-entry")&&setTimeout(this.setupObserver.bind(this),10)}setupObserver(){rey.frontend.inView({target:this.app.elements.galleryTrack.querySelectorAll(".woocommerce-product-gallery__image .--gallery-img"),cb:this.observeGalleryItems.bind(this),once:!0})}observeGalleryItems(t,e){t.target&&(t.target.classList.add("--animated-in"),t.target.style.transitionDelay=.05*e+"s")}}class h{activeVariation=null;constructor(t){this.app=t,this.app.isVariationForm()&&"classic"===this.app.vars.variationHandlerType&&this.events()}events(){"undefined"!=typeof jQuery&&(jQuery(this.app.elements.variationForm).on("found_variation",this.foundVariation.bind(this)),jQuery(this.app.elements.variationForm).on("reset_data",this.resetData.bind(this)),this.app.elements.variationForm.addEventListener("reycore/woocommerce/found_variation/single",this.singleVariation.bind(this)),this.app.elements.mainImage.addEventListener("load",this.mainImageLoaded.bind(this)))}foundVariation(t,e){if(this.app.debug.variationEvents&&console.log(":: foundVariation (classic)"),this.lastVariation=this.activeVariation,this.activeVariation=e,!this.lastVariation||e.image.src!==this.lastVariation.image.src){var s="picture"===this.app.elements.mainImage.tagName.toLowerCase()?this.app.elements.mainImage.querySelector("img"):this.app.elements.mainImage;s&&e.image.src===s.getAttribute("src")||this.app.setLoading(!0)}}resetData(t,e){this.app.debug.variationEvents&&console.log(":: resetData (classic)"),this.activeVariation&&(this.activeVariation=null)}singleVariation(t){setTimeout((()=>{this.app.debug.variationEvents&&console.log(":: singleVariation (classic)"),rey.jquery.trigger("found_variation",this.app.elements.variationForm,[t.detail.variation])}),1)}mainImageLoaded(){this.app.components.autoHeight.reset(),this.app.vars.currentIndex!==this.app.options.start_index&&this.app.goToItem(this.app.options.start_index),this.zoom=this.app.getComponent("zoomMain"),this.thumbs=this.app.getComponent("thumbs"),this.app.setLoading(!1),this.activeVariation?this.activeVariation&&this.activeVariation.image&&this.activeVariation.image.full_src&&(this.zoom&&this.zoom.updateImage(this.activeVariation.image.full_src,this.activeVariation.image.full_src_w),this.thumbs&&this.thumbs.updateFirstThumb(this.activeVariation.image.gallery_thumbnail_src)):(this.zoom&&this.zoom.resetImage(),this.thumbs&&this.thumbs.resetFirstThumb()),this.app.fireEvent("classicVariation/mainLoaded",{classicVariations:this}),this.app.vars.defaultIsVariation&&(this.app.resetDefaultVariation(),this.app.setLoading(!1))}}class l{imagesHeights={};canRun=!1;offsetDecrease=0;constructor(t){if(this.app=t,this.supported(),!this.canRun)return this.setUnsupported();if(this.app.elements.gallery.classList.contains("--peek-side-mobile")){var e=getComputedStyle(this.app.elements.gallery).getPropertyValue("--item-image-peek");e&&(this.offsetDecrease=parseInt(e))}this.run(),this.events()}supported(){if(this.app.vars.count&&this.app.vars.isSingular){if(rey.vars.is_desktop){if(!this.app.options.autoheight_desktop)return}else if(!this.app.options.autoheight_mobile)return;rey.vars.is_desktop&&this.app.elements.gallery.classList.contains("--main-img-height")||(this.canRun=!0)}}events(){window.addEventListener("rey/window/breakpoint",this.restart.bind(this)),this.app.on("onItemReady",(t=>{this.app.on("onScrollStop",this.run.bind(this),{once:!0})}))}setUnsupported(){this.app.elements.gallery.classList.add("--no-autoheight")}run(){if(!this.canRun)return this.setUnsupported();if(this.target=this.app.elements.galleryItems[this.app.vars.currentIndex],void 0!==this.target)if(void 0===this.imagesHeights[this.app.vars.currentIndex])if(this.target.classList.contains("--inline-video")){var t=this.target.querySelector(".embed-responsive");t&&(this.imagesHeights[this.app.vars.currentIndex]=t.offsetHeight,this.setSize())}else{var e=this.target.querySelector(".__img");e&&this.app.onImageLoaded(e,(()=>{this.imagesHeights[this.app.vars.currentIndex]=(this.app.elements.galleryTrack.offsetWidth-this.offsetDecrease)*(e.naturalHeight/e.naturalWidth),this.setSize()}))}else this.setSize()}setSize(){this.lastHeight!==this.imagesHeights[this.app.vars.currentIndex]&&(this.lastHeight=this.imagesHeights[this.app.vars.currentIndex],this.app.elements.gallery.style.setProperty("--main-height",this.imagesHeights[this.app.vars.currentIndex]+"px"),this.app.elements.gallery.classList.add("--locked"),setTimeout((()=>{this.app.elements.gallery.classList.remove("--locked")}),200))}reset(){this.imagesHeights={}}resetHeight(){this.app.elements.gallery.style.removeProperty("--main-height")}restart(){this.canRun&&(this.reset(),this.resetHeight(),this.run())}destroy(){this.reset()}}class p{assetsLoaded=!1;items=[];statusItems=[];videoIndex=null;constructor(t){this.app=t,this.app.vars.count&&this.init()}init(){this.pswpElement=document.querySelector(".pswp"),this.pswpElement&&(this.options=Object.assign(this.app.options.photoswipe_options||{},{index:0,mainClass:reyParams.js_params.photoswipe_light?"--theme-light":"",preloaderEl:!0,counterEl:!0,fullscreenEl:!1,zoomEl:!1,shareEl:!1,addCaptionHTMLFn:function(t,e){return t.title?(e.children[0].textContent=t.title,!0):(e.children[0].textContent="",!1)}}),this.events())}events(){this.app.elements.galleryItems.forEach(((t,e)=>{this.setupItem(e),t.addEventListener("click",(e=>{if(e.preventDefault(),(e.target.closest("a")||e.target.closest(".__lightbox-btn"))&&(this.app.options.lightbox||t.hasAttribute("data-do-click"))){var s=this.fixIndex(parseInt(t.getAttribute("data-index")||0));this.open(s)}}))})),this.app.on("classicVariation/mainLoaded",(t=>{this.setupItem(0,!0)}))}setupItem(t,e){var s=this.app.elements.galleryItems[t],i=s.querySelector(".__img");if(i){var a=!0;if(s.hasAttribute("data-html-lightbox")){var r=document.getElementById(s.getAttribute("data-html-lightbox")),o=s.getAttribute("data-html-lightbox-type");if(r){"video"===o&&(this.videoIndex=this.items.length);var n={html:r.innerHTML,htmlType:o};e?this.items[t]=n:this.items.push(n)}else a=!1}else if(s.hasAttribute("data-no-lightbox"))a=!1;else{n={alt:i.getAttribute("alt"),src:i.getAttribute("data-large_image"),w:i.getAttribute("data-large_image_width"),h:i.getAttribute("data-large_image_height"),title:this.app.options.lightbox_captions?i.getAttribute("data-caption")||i.getAttribute("title"):""};e?this.items[t]=n:this.items.push(n)}e?this.statusItems[t]=a:this.statusItems.push(a)}}open(t){if(!this.assetsLoaded&&"undefined"!=typeof PS_scripts_styles){var e=this.app.elements.galleryItems[t]&&this.app.elements.galleryItems[t].querySelector(".__img");return e&&e.classList.add("--faded"),this.app.elements.gallery.classList.add("--locked"),void rey.assets.lazyAssets(PS_scripts_styles,(()=>{this.assetsLoaded=!0,setTimeout((()=>{this.open(t),e&&e.classList.remove("--faded"),this.app.elements.gallery.classList.remove("--locked")}),250)}))}this.options.index=parseInt(t),isNaN(this.options.index)||(this.ps=new PhotoSwipe(this.pswpElement,PhotoSwipeUI_Default,this.items,this.options),this.ps.init(),this.app.options.onLightboxOpen.call(this),this.watchVideos(this.ps.container),this.ps.listen("afterChange",this.watchVideos.bind(this)),this.ps.listen("destroy",this.app.options.onLightboxDestroy.bind(this)),this.ps.listen("destroy",(()=>{var t=this.app.elements.galleryItems[this.ps.getCurrentIndex()||0],e=t&&t.querySelector("a");e&&e.focus()})))}watchVideos(t){var e=(t=t||this.ps.currItem.container).querySelector("[data-video]");e&&(e.setAttribute("src",e.getAttribute("data-video")),e.removeAttribute("data-video"))}fixIndex(t){if(this.items.length===this.statusItems.length)return t;for(var e=t,s=0;s<=t;s++)!1===this.statusItems[s]&&e--;return e}destroy(){this.items=[],this.statusItems=[],this.videoIndex=null}}class m{constructor(t){this.app=t,this.addVideoMarkup(),this.events()}events(){this.app.events.inView.videos=t=>{var e=t.target.querySelector(".__video");e&&(e.hasAttribute("data-video")&&!e.hasAttribute("src")&&e.setAttribute("src",e.getAttribute("data-video")),setTimeout((()=>{t.target.setAttribute("data-loaded-video","")}),100))},rey.dom.delegate(document,"click",".rey-singlePlayVideo-summary",(t=>{t.preventDefault(),this.app.components.lightbox.open(this.app.components.lightbox.videoIndex)})),rey.dom.delegate(document,"click",".rey-singlePlayVideo",(t=>{t.preventDefault(),this.app.components.lightbox.open(this.app.components.lightbox.videoIndex)}))}addVideoMarkup(){if(null===this.app.components.lightbox.videoIndex){var t=document.getElementById("lightbox-videoHolder");t&&(this.app.components.lightbox.videoIndex=this.app.components.lightbox.items.length,this.app.components.lightbox.items.push({html:t.innerHTML,htmlType:"video"}),this.app.components.lightbox.statusItems.push(!0))}}}rey.components.pdpGalleries=[],rey.components.pdpGallery=t,jQuery.fn.rey_product_gallery=function(t){return console.error('"rey_product_gallery" is deprecated. Please update your script to the latest Rey version.'),this},rey.hooks.addAction("elementor/init",(function(e){var s=e=>{e[0].querySelectorAll(".woocommerce-product-gallery").forEach((s=>{new t(s,{id:e[0].getAttribute("data-id"),directRun:rey.vars.elementor_edit_mode})}))};e.registerElement({name:"woocommerce-product-images.default",cb:s}),e.registerElement({name:"reycore-woo-pdp-gallery.default",cb:s})})),document.addEventListener("rey-DOMContentLoaded",(function(){document.querySelectorAll(".woocommerce-product-gallery").forEach((e=>{e.closest(".elementor-element")||new t(e)}))}))}();