function soliloquyIsMobile(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}function soliloquyYouTubeVids(e,t,i,s,o,n,l){n("#"+o).show().css({display:"block","z-index":"1210"}),player=l,YT.Player&&void 0===soliloquy_youtube[t]&&(soliloquy_youtube[t]=new YT.Player(o,{videoId:t,playerVars:e,events:{onStateChange:soliloquyYouTubeOnStateChange}}))}function soliloquyYouTubeOnStateChange(e){var t=jQuery(e.target.getIframe()).data("soliloquy-slider-id");e.data!==YT.PlayerState.PAUSED&&e.data!==YT.PlayerState.ENDED||soliloquy_slider[t]&&soliloquy_slider[t].getSetting("auto")&&soliloquy_slider[t].startAuto(),e.data!==YT.PlayerState.PLAYING&&e.data!==YT.PlayerState.BUFFERING||soliloquy_slider[t]&&soliloquy_slider[t].stopAuto()}function soliloquyVimeoVids(e,t,i,s,o,n){n("#"+o).show().css({display:"block","z-index":"1210"});var l={};n.each(n("#"+o)[0].attributes,function(e,t){l[t.nodeName]=t.nodeValue}),e.player_id=o,l.src="//player.vimeo.com/video/"+t+"?"+n.param(e),l.frameborder=0,n("#"+o).replaceWith(function(){return n("<iframe />",l).append(n(this).contents())}),soliloquy_vimeo[t]=new Vimeo.Player(n("#"+o)[0],{transparent:!1});var a=n("#"+o).data("soliloquy-slider-id");soliloquy_vimeo[t].on("play",function(){soliloquy_slider[a]&&soliloquy_slider[a].stopAuto()}),soliloquy_vimeo[t].on("pause",function(){soliloquy_slider[a].getSetting("auto")&&soliloquy_slider[a].startAuto()}),soliloquy_vimeo[t].on("ended",function(){soliloquy_slider[a].getSetting("auto")&&soliloquy_slider[a].startAuto()})}function soliloquyVimeoSliderPause(e){var t=jQuery("#"+e).data("soliloquy-slider-id");soliloquy_slider[t]&&soliloquy_slider[t].stopAuto()}function soliloquyVimeoSliderStart(e){var t=jQuery("#"+e).data("soliloquy-slider-id");soliloquy_slider[t]&&soliloquy_slider[t].getSetting("auto")&&soliloquy_slider[t].startAuto()}function soliloquyWistiaVids(e,t,i,s,o,n){if(n("#"+o).show().css({display:"block","z-index":"1210"}),wistiaEmbeds){var l={};n.each(n("#"+o)[0].attributes,function(e,t){l[t.nodeName]=t.nodeValue}),e.container=o,l.src="//fast.wistia.net/embed/iframe/"+t+"?"+n.param(e),l.frameborder=0,n("#"+o).replaceWith(function(){return n("<iframe />",l).addClass("wistia_embed").append(n(this).contents())}),wistiaEmbeds.onFind(function(e){t===e.hashedId()&&(soliloquy_wistia[t]=e,soliloquy_wistia[t].bind("play",function(){var e=n(this.container).data("soliloquy-slider-id");soliloquy_slider[e]&&soliloquy_slider[e].stopAuto()}),soliloquy_wistia[t].bind("pause",function(){var e=n(this.container).data("soliloquy-slider-id");soliloquy_slider[e]&&soliloquy_slider[e].getSetting("auto")&&soliloquy_slider[e].startAuto()}),soliloquy_wistia[t].bind("end",function(){var e=n(this.container).data("soliloquy-slider-id");soliloquy_slider[e]&&soliloquy_slider[e].getSetting("auto")&&soliloquy_slider[e].startAuto()}),e.play())})}}function soliloquyLocalVids(e,t,i,s,o,n){n("#"+o).show().css({display:"block","z-index":"1210"}),n(".soliloquy-id-"+t+" .soliloquy-video-icon").hide();var l={};n.each(n("#"+o)[0].attributes,function(e,t){l[t.nodeName]=t.nodeValue});var a=[];1===e.playpause&&a.push("playpause"),1===e.progress&&a.push("progress"),1===e.current&&a.push("current"),1===e.duration&&a.push("duration"),1===e.volume&&a.push("volume"),1===e.fullscreen&&a.push("fullscreen"),soliloquy_local[t]=n("video#"+o).mediaelementplayer({features:a,success:function(t,i,s){1==e.autoplay&&t.play()},error:function(e,t,i){}})}function soliloquyInitManually(){jQuery(document).ready(function($){var soliloquy_sliders=[];$(".soliloquy-outer-container[data-soliloquy-loaded='0']").each(function(){soliloquy_sliders.push($(".soliloquy-container",$(this)).attr("id").replace(/^\D+/g,""))}),soliloquy_sliders.length>0&&$.post(soliloquy_ajax.ajax,{action:"soliloquy_init_sliders",ajax_nonce:soliloquy_ajax.ajax_nonce,ids:soliloquy_sliders},function(response){"-1"!==response&&"0"!==response&&eval(response)})})}!function(e,t,i,s){var o={keyboard:!1,mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,captionSpeed:0,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"soliloquy-wrapper",ariaLive:!0,ariaHidden:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){return!0},onSlideBefore:function(){return!0},onSlideAfter:function(){return!0},onSlideNext:function(){return!0},onSlidePrev:function(){return!0},onSliderResize:function(){return!0},onAutoChange:function(){return!0}};e.fn.soliloquy=function(s){if(0===this.length)return this;if(this.length>1)return this.each(function(){e(this).soliloquy(s)}),this;var n={},l=this,a=e(t).width(),r=e(t).height();if(!e(l).data("soliloquy")){var d=function(){e(l).data("soliloquy")||(n.settings=e.extend({},o,s),n.settings.slideWidth=parseInt(n.settings.slideWidth),n.children=l.children(n.settings.slideSelector),n.children.length<n.settings.minSlides&&(n.settings.minSlides=n.children.length),n.children.length<n.settings.maxSlides&&(n.settings.maxSlides=n.children.length),n.settings.randomStart&&(n.settings.startSlide=Math.floor(Math.random()*n.children.length)),n.active={index:n.settings.startSlide},n.carousel=n.settings.minSlides>1||n.settings.maxSlides>1,n.carousel&&(n.settings.preloadImages="all"),n.minThreshold=n.settings.minSlides*n.settings.slideWidth+(n.settings.minSlides-1)*n.settings.slideMargin,n.maxThreshold=n.settings.maxSlides*n.settings.slideWidth+(n.settings.maxSlides-1)*n.settings.slideMargin,n.working=!1,n.controls={},n.interval=null,n.animProp="vertical"==n.settings.mode?"top":"left",n.usingCSS=n.settings.useCSS&&"fade"!=n.settings.mode&&function(){var e=i.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var s in t)if(void 0!==e.style[t[s]])return n.cssPrefix=t[s].replace("Perspective","").toLowerCase(),n.animProp="-"+n.cssPrefix+"-transform",!0;return!1}(),"vertical"==n.settings.mode&&(n.settings.maxSlides=n.settings.minSlides),l.data("origStyle",l.attr("style")),l.children(n.settings.slideSelector).each(function(){e(this).data("origStyle",e(this).attr("style"))}),c())},c=function(){l.wrap('<div class="'+n.settings.wrapperClass+'"><div class="soliloquy-viewport"></div></div>'),n.viewport=l.parent(),n.settings.ariaLive&&!n.settings.ticker&&n.viewport.attr("aria-live","polite"),n.loader=e('<div class="soliloquy-loading" />'),n.viewport.prepend(n.loader),l.css({width:"horizontal"==n.settings.mode?100*n.children.length+215+"%":"auto",position:"relative"}),n.usingCSS&&n.settings.easing?l.css("-"+n.cssPrefix+"-transition-timing-function",n.settings.easing):n.settings.easing||(n.settings.easing="swing");f();n.viewport.css({width:"100%",position:"relative"}),"fade"!=n.settings.mode&&n.viewport.css({overflow:"hidden"}),n.viewport.parent().css({maxWidth:h()}),n.settings.pager||n.viewport.parent().css({margin:"0 auto 0px"}),n.children.css({float:"left",listStyle:"none",position:"relative"}),n.children.css("width",v()),"horizontal"==n.settings.mode&&n.settings.slideMargin>0&&n.children.css("marginRight",n.settings.slideMargin),"vertical"==n.settings.mode&&n.settings.slideMargin>0&&n.children.css("marginBottom",n.settings.slideMargin),"fade"==n.settings.mode&&(n.children.css({zIndex:0,display:"none",marginRight:"-100%",width:"100%"}),n.children.eq(n.settings.startSlide).css({zIndex:n.settings.slideZIndex,display:"block"})),n.controls.el=e('<div class="soliloquy-controls" />'),n.settings.captions&&k(),n.active.last=n.settings.startSlide==m()-1;var t=n.children.eq(n.settings.startSlide);"all"==n.settings.preloadImages&&(t=n.children),n.settings.ticker?n.settings.pager=!1:(n.settings.pager&&b(),n.settings.controls&&q(),n.settings.auto&&n.settings.autoControls&&C(),(n.settings.controls||n.settings.autoControls||n.settings.pager)&&n.viewport.after(n.controls.el)),u(t,g)},u=function(t,i){var s=t.find('img:not([src=""]), iframe').length,o=0;0!==s?t.find('img:not([src=""]), iframe').each(function(){e(this).on("load error",function(){++o===s&&i()}).each(function(){this.complete&&e(this).trigger("load")})}):i()},g=function(){if(n.settings.infiniteLoop&&"fade"!=n.settings.mode&&!n.settings.ticker&&n.children.length>1){var i="vertical"==n.settings.mode?n.settings.minSlides:n.settings.maxSlides,s=n.children.slice(0,i).clone(!0).addClass("soliloquy-clone"),o=n.children.slice(-i).clone(!0).addClass("soliloquy-clone");l.append(s).prepend(o),n.settings.ariaHidden&&(s.attr("aria-hidden",!0),o.attr("aria-hidden",!0))}n.loader.remove(),x(),"vertical"==n.settings.mode&&(n.settings.adaptiveHeight=!0),n.viewport.height(p()),l.redrawSlider(),n.settings.onSliderLoad(n.active.index),n.initialized=!0,n.settings.responsive&&e(t).bind("resize",X),n.settings.auto&&n.settings.autoStart&&(m()>1||n.settings.autoSlideForOnePage)&&H(),n.settings.ticker&&L(),n.settings.pager&&_(n.settings.startSlide),n.settings.controls&&A(),n.settings.touchEnabled&&!n.settings.ticker&&Y(),n.settings.keyboard&&!n.settings.ticker&&e("body").on("keydown",function(t){if(!e(".soliloquybox-overlay").is(":visible")&&"textarea"!=t.target.type&&"input"!=t.target.type)return 39==t.keyCode?(T(t),!1):37==t.keyCode?(P(t),!1):void 0})},p=function(){var t=0,i=e();if("vertical"==n.settings.mode||n.settings.adaptiveHeight)if(n.carousel){var s=1==n.settings.moveSlides?n.active.index:n.active.index*y();i=n.children.eq(s);for(var o=1;o<=n.settings.maxSlides-1;o++)i=s+o>=n.children.length?i.add(n.children.eq(o-1)):i.add(n.children.eq(s+o))}else i=n.children.eq(n.active.index);else i=n.children;return"vertical"==n.settings.mode?(i.each(function(i){t+=e(this).outerHeight()}),n.settings.slideMargin>0&&(t+=n.settings.slideMargin*(n.settings.minSlides-1))):t=Math.max.apply(Math,i.map(function(){return e(this).outerHeight(!1)}).get()),"border-box"==n.viewport.css("box-sizing")?t+=parseFloat(n.viewport.css("padding-top"))+parseFloat(n.viewport.css("padding-bottom"))+parseFloat(n.viewport.css("border-top-width"))+parseFloat(n.viewport.css("border-bottom-width")):"padding-box"==n.viewport.css("box-sizing")&&(t+=parseFloat(n.viewport.css("padding-top"))+parseFloat(n.viewport.css("padding-bottom"))),t},h=function(){var e="100%";return n.settings.slideWidth>0&&(e="horizontal"==n.settings.mode?n.settings.maxSlides*n.settings.slideWidth+(n.settings.maxSlides-1)*n.settings.slideMargin:n.settings.slideWidth),"fade"==n.settings.mode?"100%":e},v=function(){var e=n.settings.slideWidth,t=n.viewport.width();return 0===n.settings.slideWidth||n.settings.slideWidth>t&&!n.carousel||"vertical"===n.settings.mode?e=t:n.settings.maxSlides>1&&"horizontal"===n.settings.mode&&(t>n.maxThreshold||t<n.minThreshold&&(e=(t-n.settings.slideMargin*(n.settings.minSlides-1))/n.settings.minSlides)),"fade"==n.settings.mode?"100%":e},f=function(){var e=1;if("horizontal"===n.settings.mode&&n.settings.slideWidth>0)if(n.viewport.width()<n.minThreshold)e=n.settings.minSlides;else if(n.viewport.width()>n.maxThreshold)e=n.settings.maxSlides;else{var t=n.children.first().width()+n.settings.slideMargin;e=Math.floor((n.viewport.width()+n.settings.slideMargin)/t)}else"vertical"===n.settings.mode&&(e=n.settings.minSlides);return e},m=function(){var e=0;if(n.settings.moveSlides>0)if(n.settings.infiniteLoop)e=Math.ceil(n.children.length/y());else for(var t=0,i=0;t<n.children.length;)++e,t=i+f(),i+=n.settings.moveSlides<=f()?n.settings.moveSlides:f();else e=Math.ceil(n.children.length/f());return e},y=function(){return n.settings.moveSlides>0&&n.settings.moveSlides<=f()?n.settings.moveSlides:f()},x=function(){if(n.children.length>n.settings.maxSlides&&n.active.last&&!n.settings.infiniteLoop){if("horizontal"===n.settings.mode){var e=n.children.last(),t=e.position();w(-(t.left-(n.viewport.width()-e.outerWidth())),"reset",0)}else if("vertical"===n.settings.mode){var i=n.children.length-n.settings.minSlides;t=n.children.eq(i).position();w(-t.top,"reset",0)}}else if(n.settings.infiniteLoop){s=n.active.index*y(),t=n.children.eq(s).position();n.active.index===m()-1&&(n.active.last=!0),void 0!=t&&("horizontal"===n.settings.mode&&n.children.length<=1?(t.left=n.active.index*n.children.eq(s).outerWidth(!0),w(-t.left,"reset",0)):"horizontal"!==n.settings.mode||n.carousel?"vertical"===n.settings.mode?(t.top=(n.active.index+1)*n.children.eq(s).outerHeight(!0),w(-t.top,"reset",0)):n.carousel&&"horizontal"===n.settings.mode&&n.settings.infiniteLoop&&(t.left=(n.active.index+1)*n.children.eq(s).outerWidth(!0),w(-t.left*n.settings.maxSlides,"reset",0)):(t.left=(n.active.index+1)*n.children.eq(s).outerWidth(!0),w(-t.left,"reset",0)))}else{var s=n.active.index,t=n.children.eq(s).position();n.active.index===m()-1&&(n.active.last=!0),void 0!=t&&("horizontal"!==n.settings.mode||n.carousel?"vertical"===n.settings.mode&&(t.top=n.active.index*n.children.eq(s).outerHeight(!0),w(-t.top,"reset",0)):(t.left=n.active.index*n.children.eq(s).outerWidth(!0),w(-t.left,"reset",0)))}},w=function(e,t,i,s){if(n.usingCSS){var o="vertical"===n.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";l.css("-"+n.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"===t?(l.css(n.animProp,o),l.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){l.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),I()})):"reset"===t?l.css(n.animProp,o):"ticker"===t&&(l.css("-"+n.cssPrefix+"-transition-timing-function","linear"),l.css(n.animProp,o),l.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){l.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),w(s.resetValue,"reset",0),W()}))}else{var a={};a[n.animProp]=e,"slide"===t?l.animate(a,i,n.settings.easing,function(){I()}):"reset"===t?l.css(n.animProp,e):"ticker"===t&&l.animate(a,speed,"linear",function(){w(s.resetValue,"reset",0),W()})}},S=function(){for(var t="",i=m(),s=0;s<i;s++){var o="";n.settings.buildPager&&e.isFunction(n.settings.buildPager)?(o=n.settings.buildPager(s),n.pagerEl.addClass("soliloquy-custom-pager")):(o=s+1,n.pagerEl.addClass("soliloquy-default-pager")),t+='<div class="soliloquy-pager-item"><a href="" data-slide-index="'+s+'" class="soliloquy-pager-link" tabindex="0"><span>'+o+"</span></a></div>"}n.pagerEl.html(t)},b=function(){n.settings.pagerCustom?n.pagerEl=e(n.settings.pagerCustom):n.pagerEl=e('<div class="soliloquy-pager" />'),n.settings.pagerSelector?e(n.settings.pagerSelector).html(n.pagerEl):n.controls.el.addClass("soliloquy-has-pager").append(n.pagerEl),n.settings.pagerCustom||S(),n.pagerEl.on("click","a",M)},q=function(){n.controls.next=e('<a class="soliloquy-next" role="button" href="" tabindex="0"><span>'+n.settings.nextText+"</span></a>"),n.controls.prev=e('<a class="soliloquy-prev" role="button" href="" tabindex="0"><span>'+n.settings.prevText+"</span></a>"),n.controls.next.bind("click",T),n.controls.prev.bind("click",P),n.settings.nextSelector&&e(n.settings.nextSelector).append(n.controls.next),n.settings.prevSelector&&e(n.settings.prevSelector).append(n.controls.prev),n.settings.nextSelector||n.settings.prevSelector||(n.controls.directionEl=e('<div class="soliloquy-controls-direction" />'),n.controls.directionEl.append(n.controls.prev).append(n.controls.next),n.controls.el.addClass("soliloquy-has-controls-direction").append(n.controls.directionEl))},C=function(){n.controls.start=e('<div class="soliloquy-controls-auto-item"><a class="soliloquy-start" href="" aria-label="play" tabindex="0"><span>'+n.settings.startText+"</span></a></div>"),n.controls.stop=e('<div class="soliloquy-controls-auto-item"><a class="soliloquy-stop" href="" aria-label="pause" tabindex="0"><span>'+n.settings.stopText+"</span></a></div>"),n.controls.autoEl=e('<div class="soliloquy-controls-auto" />'),n.controls.autoEl.on("click",".soliloquy-start",E),n.controls.autoEl.on("click",".soliloquy-stop",z),n.settings.autoControlsCombine?n.controls.autoEl.append(n.controls.start):n.controls.autoEl.append(n.controls.start).append(n.controls.stop),n.settings.autoControlsSelector?e(n.settings.autoControlsSelector).html(n.controls.autoEl):n.controls.el.addClass("soliloquy-has-controls-auto").append(n.controls.autoEl),D(n.settings.autoStart?"stop":"start")},k=function(){n.children.each(function(t){var i=e(this).find("img:first").attr("title");void 0!=i&&(""+i).length&&e(this).append('<div class="soliloquy-caption"><span>'+i+"</span></div>")})},T=function(e){n.settings.auto&&l.stopAuto(),l.goToNextSlide(),e.preventDefault()},P=function(e){n.settings.auto&&l.stopAuto(),l.goToPrevSlide(),e.preventDefault()},E=function(e){l.startAuto(),e.preventDefault()},z=function(e){l.stopAuto(),e.preventDefault()},M=function(t){n.settings.auto&&l.stopAuto();var i=e(t.currentTarget);if(void 0!==i.attr("data-slide-index")){var s=parseInt(i.attr("data-slide-index"));s!=n.active.index&&l.goToSlide(s),t.preventDefault()}},_=function(t){var i=n.children.length;if("short"===n.settings.pagerType)return n.settings.maxSlides>1&&(i=Math.ceil(n.children.length/n.settings.maxSlides)),void n.pagerEl.html(t+1+n.settings.pagerShortSeparator+i);n.pagerEl.find("a").removeClass("active"),n.pagerEl.each(function(i,s){e(s).find("a").eq(t).addClass("active")})},I=function(){if(n.settings.infiniteLoop){var e="";0===n.active.index?e=n.children.eq(0).position():n.active.index==m()-1&&n.carousel?e=n.children.eq((m()-1)*y()).position():n.active.index==n.children.length-1&&(e=n.children.eq(n.children.length-1).position()),e&&("horizontal"===n.settings.mode?w(-e.left,"reset",0):"vertical"===n.settings.mode&&w(-e.top,"reset",0))}n.working=!1,"fade"==n.settings.mode&&n.viewport.css({overflow:""}),n.settings.onSlideAfter(n.children.eq(n.active.index),n.oldIndex,n.active.index)},D=function(e){n.settings.autoControlsCombine?n.controls.autoEl&&n.controls.autoEl.html(n.controls[e]):(n.controls.autoEl.find("a").removeClass("active"),n.controls.autoEl.find("a:not(.soliloquy-"+e+")").addClass("active"))},A=function(){1==m()?(n.controls.prev.addClass("disabled"),n.controls.next.addClass("disabled")):!n.settings.infiniteLoop&&n.settings.hideControlOnEnd&&(0==n.active.index?(n.controls.prev.addClass("disabled"),n.controls.next.removeClass("disabled")):n.active.index==m()-1?(n.controls.next.addClass("disabled"),n.controls.prev.removeClass("disabled")):(n.controls.prev.removeClass("disabled"),n.controls.next.removeClass("disabled")))},H=function(){if(n.settings.autoDelay>0)setTimeout(l.startAuto,n.settings.autoDelay);else l.startAuto();n.settings.autoHover&&l.hover(function(){n.interval&&(l.stopAuto(!0),n.autoPaused=!0)},function(){n.autoPaused&&(l.startAuto(!0),n.autoPaused=null)})},L=function(){var t=0;if("next"==n.settings.autoDirection)l.append(n.children.clone().addClass("soliloquy-clone"));else{l.prepend(n.children.clone().addClass("soliloquy-clone"));var i=n.children.first().position();t="horizontal"==n.settings.mode?-i.left:-i.top}w(t,"reset",0),n.settings.pager=!1,n.settings.controls=!1,n.settings.autoControls=!1,n.settings.tickerHover&&!n.usingCSS&&n.viewport.hover(function(){l.stop()},function(){var t=0;n.children.each(function(i){t+="horizontal"==n.settings.mode?e(this).outerWidth(!0):e(this).outerHeight(!0)});var i=n.settings.speed/t,s="horizontal"==n.settings.mode?"left":"top",o=i*(t-Math.abs(parseInt(l.css(s))));W(o)}),W()},W=function(e){speed=e||n.settings.speed;var t={left:0,top:0},i={left:0,top:0};"next"==n.settings.autoDirection?t=l.find(".soliloquy-clone").first().position():i=n.children.first().position();var s="horizontal"==n.settings.mode?-t.left:-t.top,o="horizontal"==n.settings.mode?-i.left:-i.top;w(s,"ticker",speed,{resetValue:o})},Y=function(){n.touch={start:{x:0,y:0},end:{x:0,y:0}},n.viewport.on("touchstart pointerdown",j),n.viewport.on("click",".soliloquy-slider a",function(e){n.viewport.hasClass("click-disabled")&&(e.preventDefault(),n.viewport.removeClass("click-disabled"))})},j=function(t){if(!e(t.target).is("a")&&("touchstart"===t.type||0===t.button))if(n.controls.el.addClass("disabled"),n.working)n.controls.el.removeClass("disabled");else{n.touch.originalPos=l.position();var i=t.originalEvent,s=void 0!==i.changedTouches?i.changedTouches:[i];if("function"==typeof PointerEvent&&void 0===i.pointerId)return;n.touch.start.x=s[0].pageX,n.touch.start.y=s[0].pageY,n.viewport.get(0).setPointerCapture&&(n.pointerId=i.pointerId,n.viewport.get(0).setPointerCapture(n.pointerId)),n.originalClickTarget=i.originalTarget||i.target,n.originalClickButton=i.button,n.originalClickButtons=i.buttons,n.originalEventType=i.type,n.hasMove=!1,n.viewport.on("touchmove pointermove",N),n.viewport.on("touchend pointerup",V),n.viewport.on("pointercancel",O)}},O=function(e){e.preventDefault(),w(n.touch.originalPos.left,"reset",0),n.controls.el.removeClass("disabled"),n.viewport.off("pointercancel",O),n.viewport.off("touchmove pointermove",N),n.viewport.off("touchend pointerup",V),n.viewport.get(0).releasePointerCapture&&n.viewport.get(0).releasePointerCapture(n.pointerId)},N=function(e){var t=e.originalEvent,i=void 0!==t.changedTouches?t.changedTouches:[t],s=Math.abs(i[0].pageX-n.touch.start.x),o=Math.abs(i[0].pageY-n.touch.start.y),l=0,a=0;n.hasMove=!0,3*s>o&&n.settings.preventDefaultSwipeX?e.preventDefault():3*o>s&&n.settings.preventDefaultSwipeY&&e.hasOwnProperty("cancelable")&&e.cancelable&&e.preventDefault(),"touchmove"!==e.type&&e.hasOwnProperty("cancelable")&&e.cancelable&&e.preventDefault(),"fade"!==n.settings.mode&&n.settings.oneToOneTouch&&("horizontal"===n.settings.mode?(a=i[0].pageX-n.touch.start.x,l=n.touch.originalPos.left+a):(a=i[0].pageY-n.touch.start.y,l=n.touch.originalPos.top+a),w(l,"reset",0))},V=function(t){t.preventDefault(),n.viewport.off("touchmove pointermove",N),n.controls.el.removeClass("disabled");var i=t.originalEvent,s=void 0!==i.changedTouches?i.changedTouches:[i],o=0,a=0;n.touch.end.x=s[0].pageX,n.touch.end.y=s[0].pageY,"fade"===n.settings.mode?(a=Math.abs(n.touch.start.x-n.touch.end.x))>=n.settings.swipeThreshold&&(n.touch.start.x>n.touch.end.x?l.goToNextSlide():l.goToPrevSlide(),l.stopAuto()):("horizontal"===n.settings.mode?(a=n.touch.end.x-n.touch.start.x,o=n.touch.originalPos.left):(a=n.touch.end.y-n.touch.start.y,o=n.touch.originalPos.top),!n.settings.infiniteLoop&&(0===n.active.index&&a>0||n.active.last&&a<0)?w(o,"reset",200):Math.abs(a)>=n.settings.swipeThreshold?(a<0?l.goToNextSlide():l.goToPrevSlide(),l.stopAuto()):w(o,"reset",200)),n.viewport.off("touchend pointerup",V),n.viewport.get(0).releasePointerCapture&&n.viewport.get(0).releasePointerCapture(n.pointerId),!1!==n.hasMove||0!==n.originalClickButton&&"touchstart"!==n.originalEventType||e(n.originalClickTarget).trigger({type:"click",button:n.originalClickButton,buttons:n.originalClickButtons})},X=function(i){if(n.initialized){var s=e(t).width(),o=e(t).height();a==s&&r==o||(a=s,r=o,l.redrawSlider(),n.settings.onSliderResize.call(l,n.active.index))}},F=function(e){var t=f();n.settings.ariaHidden&&!n.settings.ticker&&(n.children.attr("aria-hidden","true"),n.children.slice(e,e+t).attr("aria-hidden","false"))};return l.goToSlide=function(t,i){if(!n.working&&n.active.index!=t){if(n.working=!0,n.oldIndex=n.active.index,t<0?n.active.index=m()-1:t>=m()?n.active.index=0:n.active.index=t,n.settings.onSlideBefore(n.children.eq(n.active.index),n.oldIndex,n.active.index,n.children.eq(n.oldIndex)),"next"==i?n.settings.onSlideNext(n.children.eq(n.active.index),n.oldIndex,n.active.index):"prev"==i&&n.settings.onSlidePrev(n.children.eq(n.active.index),n.oldIndex,n.active.index),n.active.last=n.active.index>=m()-1,n.settings.pager&&_(n.active.index),n.settings.controls&&A(),"fade"==n.settings.mode)n.viewport.css({overflow:"hidden"}),n.settings.adaptiveHeight&&n.viewport.height()!=p()&&n.viewport.animate({height:p()},n.settings.adaptiveHeightSpeed),n.children.filter(":visible").fadeOut(n.settings.speed).css({zIndex:0}),n.children.eq(n.active.index).css("zIndex",n.settings.slideZIndex+1).fadeIn(n.settings.speed,function(){e(this).css("zIndex",n.settings.slideZIndex),I()});else{n.settings.adaptiveHeight&&n.viewport.height()!=p()&&n.viewport.animate({height:p()},n.settings.adaptiveHeightSpeed);var s=0,o={left:0,top:0};if(!n.settings.infiniteLoop&&n.carousel&&n.active.last)if("horizontal"==n.settings.mode){o=(r=n.children.eq(n.children.length-1)).position(),s=n.viewport.width()-r.outerWidth()}else{var a=n.children.length-n.settings.minSlides;o=n.children.eq(a).position()}else if(n.carousel&&n.active.last&&"prev"==i){var r,d=1==n.settings.moveSlides?n.settings.maxSlides-y():(m()-1)*y()-(n.children.length-n.settings.maxSlides);o=(r=l.children(".soliloquy-clone").eq(d)).position()}else if("next"==i&&0==n.active.index)o=l.find("> .soliloquy-clone").eq(n.settings.maxSlides).position(),n.active.last=!1;else if(t>=0){var c=t*y();o=n.children.eq(c).position()}if(void 0!==o){var u="horizontal"==n.settings.mode?-(o.left-s):-o.top;w(u,"slide",n.settings.speed)}}n.settings.ariaHidden&&F(n.active.index*y())}},l.goToNextSlide=function(){if(!e(".soliloquybox-overlay").is(":visible")&&(n.settings.infiniteLoop||!n.active.last)){var t=parseInt(n.active.index)+1;l.goToSlide(t,"next")}},l.goToPrevSlide=function(){if(!e(".soliloquybox-overlay").is(":visible")&&(n.settings.infiniteLoop||0!=n.active.index)){var t=parseInt(n.active.index)-1;l.goToSlide(t,"prev")}},l.startAuto=function(e){n.interval||(n.interval=setInterval(function(){"next"==n.settings.autoDirection?l.goToNextSlide():l.goToPrevSlide()},n.settings.pause),n.settings.autoControls&&1!=e&&D("stop"))},l.stopAuto=function(e){n.interval&&(clearInterval(n.interval),n.interval=null,n.settings.autoControls&&1!=e&&D("start"))},l.getCurrentSlide=function(){return n.active.index},l.getCurrentSlideElement=function(){return n.children.eq(n.active.index)},l.getSlideCount=function(){return n.children.length},l.redrawSlider=function(){n.children.add(l.find(".soliloquy-clone")).width(v()),n.viewport.css("height",p()),n.settings.ticker||x(),n.active.last&&(n.active.index=m()-1),n.active.index>=m()&&(n.active.last=!0),n.settings.pager&&!n.settings.pagerCustom&&(S(),_(n.active.index)),n.settings.ariaHidden&&F(n.active.index*y())},l.destroySlider=function(){n.initialized&&(n.initialized=!1,e(".soliloquy-clone",this).remove(),n.children.each(function(){void 0!==e(this).data("origStyle")?e(this).attr("style",e(this).data("origStyle")):e(this).removeAttr("style")}),void 0!==e(this).data("origStyle")?this.attr("style",e(this).data("origStyle")):e(this).removeAttr("style"),e(this).unwrap().unwrap(),n.controls.el&&n.controls.el.remove(),n.controls.next&&n.controls.next.remove(),n.controls.prev&&n.controls.prev.remove(),n.pagerEl&&n.settings.controls&&n.pagerEl.remove(),e(".soliloquy-caption",this).remove(),n.controls.autoEl&&n.controls.autoEl.remove(),clearInterval(n.interval),n.settings.responsive&&e(t).unbind("resize",X))},l.reloadSlider=function(e){void 0!==e&&(s=e),l.destroySlider(),d()},l.getSetting=function(e){return!!n.settings[e]&&n.settings[e]},d(),this}}}(jQuery,window,document),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){var t,i,s=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],o="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],n=Array.prototype.slice;if(e.event.fixHooks)for(var l=s.length;l;)e.event.fixHooks[s[--l]]=e.event.mouseHooks;var a=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var t=o.length;t;)this.addEventListener(o[--t],r,!1);else this.onmousewheel=r;e.data(this,"mousewheel-line-height",a.getLineHeight(this)),e.data(this,"mousewheel-page-height",a.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var t=o.length;t;)this.removeEventListener(o[--t],r,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var i=e(t),s=i["offsetParent"in e.fn?"offsetParent":"parent"]();return s.length||(s=e("body")),parseInt(s.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};function r(s){var o,l=s||window.event,r=n.call(arguments,1),u=0,g=0,p=0,h=0,v=0;if((s=e.event.fix(l)).type="mousewheel","detail"in l&&(p=-1*l.detail),"wheelDelta"in l&&(p=l.wheelDelta),"wheelDeltaY"in l&&(p=l.wheelDeltaY),"wheelDeltaX"in l&&(g=-1*l.wheelDeltaX),"axis"in l&&l.axis===l.HORIZONTAL_AXIS&&(g=-1*p,p=0),u=0===p?g:p,"deltaY"in l&&(u=p=-1*l.deltaY),"deltaX"in l&&(g=l.deltaX,0===p&&(u=-1*g)),0!==p||0!==g){if(1===l.deltaMode){var f=e.data(this,"mousewheel-line-height");u*=f,p*=f,g*=f}else if(2===l.deltaMode){var m=e.data(this,"mousewheel-page-height");u*=m,p*=m,g*=m}if(o=Math.max(Math.abs(p),Math.abs(g)),(!i||o<i)&&(i=o,c(l,o)&&(i/=40)),c(l,o)&&(u/=40,g/=40,p/=40),u=Math[u>=1?"floor":"ceil"](u/i),g=Math[g>=1?"floor":"ceil"](g/i),p=Math[p>=1?"floor":"ceil"](p/i),a.settings.normalizeOffset&&this.getBoundingClientRect){var y=this.getBoundingClientRect();h=s.clientX-y.left,v=s.clientY-y.top}return s.deltaX=g,s.deltaY=p,s.deltaFactor=i,s.offsetX=h,s.offsetY=v,s.deltaMode=0,r.unshift(s,u,g,p),t&&clearTimeout(t),t=setTimeout(d,200),(e.event.dispatch||e.event.handle).apply(this,r)}}function d(){i=null}function c(e,t){return a.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});