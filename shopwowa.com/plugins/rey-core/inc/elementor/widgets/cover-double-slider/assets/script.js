!function(){"use strict";var i=function(i){this.activeSlide=0,this.totalSlides=0,this.settings={},this.isAnimating=!1,this.isForward=!0,this.interval=!1,this.videosHelper=!1,this.timeline=[],this.activeCssClass="--active",this.init=function(){this.scope=i,this.wrapper=this.scope.querySelector(".rey-coverDoubleSlider"),rey.util.alreadyLoaded(this.wrapper)||(this.slidesContainer=this.scope.querySelector(".cDbSlider-slides"),this.slides=this.scope.querySelectorAll(".cDbSlider-slideItem"),this.prevArrow=this.scope.querySelector(".cDbSlider-navPrev"),this.nextArrow=this.scope.querySelector(".cDbSlider-navNext"),this.bullets=this.scope.querySelectorAll(".cDbSlider-navBullets button"),this.isOdd=this.wrapper.classList.contains("--odd"),this.totalSlides=this.slides.length,this.slidesToScroll=rey.vars.is_mobile?1:2,this.totalSlides<2||(this.settings=Object.assign({autoplay:!1,autoplayDuration:5e3,transitionDuration:500,easing:"easeInOutCubic"},JSON.parse(this.wrapper.getAttribute("data-slider-settings")||"{}")),this.getSideDiff(),this.addTimeline(),this.addVideoSupport(),this.activateSlider(),this.events()))},this.events=function(){this.nextArrow&&this.nextArrow.addEventListener("click",(i=>{i.preventDefault(),this.goToNext()})),this.prevArrow&&this.prevArrow.addEventListener("click",(i=>{i.preventDefault(),this.goToPrev()})),this.bullets.forEach((i=>{i.addEventListener("click",(i=>{if(i.preventDefault(),!this.isAnimating){this.getSlidesToScroll(),this.isForward=!0;var t=parseInt(i.currentTarget.getAttribute("data-index"));t!==this.activeSlide&&(t<this.activeSlide&&(this.isForward=!1),this.animateTo(t))}}))})),document.addEventListener("keyup",(i=>{var t=i.keyCode||i.which;37===t?this.goToPrev():39===t&&this.goToNext()})),this.slidesContainer.addEventListener("swr",(i=>{this.goToPrev()})),this.slidesContainer.addEventListener("swl",(i=>{this.goToNext()})),document.addEventListener("resize",rey.util.debounce((()=>{this.getSideDiff(),rey.vars.is_mobile&&(this.slidesToScroll=1)}),600))},this.getSideDiff=function(){this.wrapper.style.setProperty("--side-spacing-width",this.wrapper.offsetWidth+"px")},this.getSlidesToScroll=function(){if(rey.vars.is_mobile)this.slidesToScroll=1;else{var i=this.activeSlide+this.slidesToScroll;this.isForward||(i=this.activeSlide-this.slidesToScroll)<0&&(i=this.totalSlides-1),this.isOdd&&this.slides[i].classList.contains("--single")?this.slidesToScroll=1:this.slidesToScroll=2}},this.addVideoSupport=function(){void 0!==rey.components.videoHelper&&(this.videosHelper=rey.components.videoHelper({containers:this.slides}),this.videosHelper.init())},this.activateSlider=function(){this.wrapper.classList.remove("--loading"),this.animateTo(),this.autoplay()},this.isEven=function(i){return i%2==0},this.addTimeline=function(){var i;for(i=0;i<this.totalSlides;i++){var t=this.slides[i],s=this.isEven(i);this.timeline[i]=anime.timeline({autoplay:!1,easing:this.settings.easing,duration:this.settings.transitionDuration,delay:s?0:1!==this.slidesToScroll?100:0}),this.timeline[i].add({targets:t,scaleY:[0,1]});var e=t.querySelector(".cDbSlider-slideItem-bgCurtain");e&&this.timeline[i].add({targets:e,scaleY:[1,0]}),this.timeline[i].add({targets:t.querySelectorAll("img, picture"),scale:[1.1,1]},"-="+this.settings.transitionDuration)}},this.autoplay=function(){this.settings.autoplay&&(this.interval=setInterval((()=>{this.goToNext()}),parseInt(this.settings.autoplayDuration)+this.settings.transitionDuration))},this.resetAutoplay=function(){this.settings.autoplay&&this.interval&&(clearInterval(this.interval),this.autoplay())},this.animateTo=function(i){this.resetAutoplay(),i=void 0===i?this.activeSlide:i,this.slides.forEach((i=>{i.style.opacity=0,i.style.zIndex="",i.classList.remove(this.activeCssClass)})),this.onAnimationStart=()=>{this.isAnimating=!0;var t={opacity:1,transform:"",zIndex:1},s="";this.isForward?s="--fwd":this.isForward||(s="--bwd"),this.slides.forEach(((e,l)=>{e.classList.remove("--fwd","--bwd"),l===i&&(Object.keys(t).forEach((i=>{e.style[i]=t[i]})),e.classList.remove(s)),2===this.slidesToScroll&&l===i+1&&(Object.keys(t).forEach((i=>{e.style[i]=t[i]})),e.classList.add(s))}))},this.onAnimationEnd=()=>{this.bullets.forEach(((t,s)=>{t.classList.remove(this.activeCssClass),s===i&&t.classList.add(this.activeCssClass)})),setTimeout((()=>{this.slides.forEach(((t,s)=>{s===i&&t.classList.add(this.activeCssClass),setTimeout((()=>{2===this.slidesToScroll&&s===i+1&&t.classList.add(this.activeCssClass)}),150)}));var t=[i,i+1];1===this.slidesToScroll&&(t=i),this.videosHelper&&this.videosHelper.changeState(t,"play"),this.activeSlide=i,this.isAnimating=!1}),1.5*this.settings.transitionDuration)},this.timeline.length&&void 0!==this.timeline[i]&&(this.timeline[i].play(),this.timeline[i].begin=this.onAnimationStart(),1===this.slidesToScroll&&(this.timeline[i].complete=this.onAnimationEnd()),2===this.slidesToScroll&&void 0!==this.timeline[i+1]&&(this.timeline[i+1].play(),this.timeline[i+1].complete=this.onAnimationEnd()))},this.goToNext=function(){if(!this.isAnimating){this.isForward=!0;var i=this.activeSlide+this.slidesToScroll;i>this.totalSlides-1&&(i=0,this.activeSlide=i),this.getSlidesToScroll(),this.animateTo(i)}},this.goToPrev=function(){if(!this.isAnimating){this.isForward=!1,this.getSlidesToScroll();var i=this.activeSlide-this.slidesToScroll;rey.vars.is_desktop||2!==this.totalSlides||0!==this.activeSlide?i<0&&(i=this.totalSlides-(this.isOdd?1:2)):i=1,this.animateTo(i)}},this.init()},t=()=>{document.querySelectorAll(".elementor-widget-reycore-cover-double-slider").forEach((t=>{new i(t)}))};document.addEventListener("DOMContentLoaded",(()=>{"undefined"!=typeof rey?t():console.error("`rey` is undefined so this script will not run.")})),document.addEventListener("rey/preloader/loaded",(function(){t()})),rey.hooks.addAction("elementor/init",(function(t){t.registerElement({name:"reycore-cover-double-slider.default",cb:function(t){new i(t[0])}})}))}();