/*!
	autosize 4.0.2
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.autosize=n.exports}}(this,(function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),l="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(l)&&(l=0),d()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){if(0!==e.scrollHeight){var t=o(e),n=document.documentElement&&document.documentElement.scrollTop;e.style.height="",e.style.height=e.scrollHeight+l+"px",u=e.clientWidth,t.forEach((function(e){e.node.scrollTop=e.scrollTop})),n&&(document.documentElement.scrollTop=n)}}function d(){r();var t=Math.round(parseFloat(e.style.height)),o=window.getComputedStyle(e,null),i="content-box"===o.boxSizing?Math.round(parseFloat(o.height)):e.offsetHeight;if(i<t?"hidden"===o.overflowY&&(n("scroll"),r(),i="content-box"===o.boxSizing?Math.round(parseFloat(window.getComputedStyle(e,null).height)):e.offsetHeight):"hidden"!==o.overflowY&&(n("hidden"),r(),i="content-box"===o.boxSizing?Math.round(parseFloat(window.getComputedStyle(e,null).height)):e.offsetHeight),a!==i){a=i;var d=s("autosize:resized");try{e.dispatchEvent(d)}catch(e){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var l=null,u=null,a=null,c=function t(){e.clientWidth!==u&&d()},f=function(t){window.removeEventListener("resize",c,!1),e.removeEventListener("input",d,!1),e.removeEventListener("keyup",d,!1),e.removeEventListener("autosize:destroy",f,!1),e.removeEventListener("autosize:update",d,!1),Object.keys(t).forEach((function(n){e.style[n]=t[n]})),i.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",f,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",d,!1),window.addEventListener("resize",c,!1),e.addEventListener("input",d,!1),e.addEventListener("autosize:update",d,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:f,update:d}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:(d=[],l=[],{has:function e(t){return d.indexOf(t)>-1},get:function e(t){return l[d.indexOf(t)]},set:function e(t,n){-1===d.indexOf(t)&&(d.push(t),l.push(n))},delete:function e(t){var n=d.indexOf(t);n>-1&&(d.splice(n,1),l.splice(n,1))}}),d,l,s=function e(t){return new Event(t,{bubbles:!0})};try{new Event("test")}catch(e){s=function e(t){var n=document.createEvent("Event");return n.initEvent(t,!0,!1),n}}var u=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?((u=function e(t){return t}).destroy=function(e){return e},u.update=function(e){return e}):((u=function e(t,o){return t&&Array.prototype.forEach.call(t.length?t:[t],(function(e){return n(e,o)})),t}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},u.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.default=u,e.exports=t.default}));