!function(){"use strict";var t=function(t,e){var o=this;this.tabs=[],this.currentIndex=0,this.count=0,this.init=function(){if(this.root=t,this.tabsID=e,t.classList.contains("e-con"))this.tabs=rey.dom.children(t,".e-con");else{var o=rey.dom.children(t,".elementor-container");if(!o.length)return;var n=rey.dom.children(o[0],".elementor-row");n.length?this.tabs=rey.dom.children(n[0],".elementor-column"):this.tabs=rey.dom.children(o[0],".elementor-column")}if(this.tabs.length)return this.tabs.forEach(((t,e)=>{t.setAttribute("data-tab",e)})),this.count=this.tabs.length,t.classList.add("--tabs-loaded"),rey.hooks.doAction("tabs/loaded",this),this.goTo(),this.events(),this},this.events=function(){rey.hooks.addAction("tabs/goto",(function(t,e){t===o.tabsID&&o.goTo(e)}))},this.goToPrevious=function(){var t=this.currentIndex;this.currentIndex||(t=this.count),--t,this.goTo(t)},this.goToNext=function(){var t=++this.currentIndex%this.count;this.goTo(t)},this.goTo=function(t){t=rey.util.getNumber(t)||0,o.tabs.forEach(((t,e)=>{t.classList.remove("--active-tab")})),void 0!==o.tabs[t]?(o.tabs[t].classList.add("--active-tab"),o.currentIndex=t,rey.hooks.doAction("tabs/changed/"+o.tabsID,t,o.tabs[t],o)):console.log("Couldn't find tab.")},this.init()},e=function(e){void 0===rey.components.tabs&&(rey.components.tabs={}),e&&rey.validation.isJQuery(e)&&(e=e[0]),(e||document).querySelectorAll('.rey-tabs-section[data-tabs-id]:not([data-tabs-id=""])').forEach((e=>{var o=e.getAttribute("data-tabs-id");e.closest(".rey-mainNavigation--mobile")&&(o+="-mobile-mega"),rey.components.tabs[o]=new t(e,o)}))};document.addEventListener("rey-DOMContentLoaded",(function(){e()})),rey.hooks.addAction("elementor/content/lazy_loaded",(function(t){e(t)}))}();