!function(){"use strict";var e={n:function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,{a:o}),o},d:function(t,o){for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.ctEvents,o=e.n(t),r=window.blocksyCustomizerSync;function n(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return l(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function s(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return d(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function u(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function p(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach((function(t){b(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function b(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o().on("ct:header:sync:collect-variable-descriptors",(function(e){e["color-mode-switcher"]=function(e){var t=e.itemId;return a(a({icon_size:{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),variable:"theme-icon-size",responsive:!0,unit:"px"}},(0,r.typographyOption)({id:"color_switch_label_font",selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:[(0,r.getRootSelectorFor)({itemId:t})[0]],operation:"suffix",to_add:".ct-color-switch .ct-label"}))})),{},{header_color_switch_font_color:[{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),variable:"theme-link-initial-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),variable:"theme-link-hover-color",type:"color:hover",responsive:!0}],header_color_switch_icon_color:[{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),variable:"theme-icon-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),variable:"theme-icon-hover-color",type:"color:hover",responsive:!0}],transparent_header_color_switch_font_color:[{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-transparent-row="yes"]'})),variable:"theme-link-initial-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-transparent-row="yes"]'})),variable:"theme-link-hover-color",type:"color:hover",responsive:!0}],transparent_header_color_switch_icon_color:[{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-transparent-row="yes"]'})),variable:"theme-icon-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-transparent-row="yes"]'})),variable:"theme-icon-hover-color",type:"color:hover",responsive:!0}],sticky_header_color_switch_font_color:[{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-sticky*="yes"]'})),variable:"theme-link-initial-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-sticky*="yes"]'})),variable:"theme-link-hover-color",type:"color:hover",responsive:!0}],sticky_header_color_switch_icon_color:[{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-sticky*="yes"]'})),variable:"theme-icon-color",type:"color:default",responsive:!0},{selector:(0,r.assembleSelector)((0,r.mutateSelector)({selector:(0,r.getRootSelectorFor)({itemId:t}),operation:"between",to_add:'[data-sticky*="yes"]'})),variable:"theme-icon-hover-color",type:"color:hover",responsive:!0}],container_margin:{selector:(0,r.assembleSelector)((0,r.getRootSelectorFor)({itemId:t})),type:"spacing",variable:"margin",responsive:!0,important:!0}})}})),o().on("ct:header:sync:item:color-mode-switcher",(function(e){e.values.wishlist_label;var t=e.optionId,o=e.optionValue,l='[data-id="color-mode-switcher"]';"color_switch_icon_state"===t&&(0,r.updateAndSaveEl)(l,(function(e){e.dataset.colorSwitch="yes"===o?"reversed":"normal"})),"dark_mode_label"===t&&((0,r.updateAndSaveEl)(l,(function(e){n(e.querySelectorAll(".ct-label .ct-dark-mode-label")).map((function(e){e.innerHTML=o}))})),(0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),n(e.querySelectorAll(".ct-label .ct-dark-mode-label")).map((function(e){e.innerHTML=o.desktop}))}),{onlyView:"desktop"}),(0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),n(e.querySelectorAll(".ct-label .ct-dark-mode-label")).map((function(e){e.innerHTML=o.mobile}))}),{onlyView:"mobile"})),"light_mode_label"===t&&((0,r.updateAndSaveEl)(l,(function(e){n(e.querySelectorAll(".ct-label .ct-light-mode-label")).map((function(e){e.innerHTML=o}))})),(0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),n(e.querySelectorAll(".ct-label .ct-light-mode-label")).map((function(e){e.innerHTML=o.desktop}))}),{onlyView:"desktop"}),(0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),n(e.querySelectorAll(".ct-label .ct-light-mode-label")).map((function(e){e.innerHTML=o.mobile}))}),{onlyView:"mobile"})),"color_switch_label_visibility"===t&&(0,r.updateAndSaveEl)(l,(function(e){n(e.querySelectorAll(".ct-label")).map((function(e){(0,r.responsiveClassesFor)(o,e)}))})),"color_switch_label_position"===t&&((0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),e.dataset.label=o.desktop}),{onlyView:"desktop"}),(0,r.updateAndSaveEl)(l,(function(e){o.desktop||(o={desktop:o,mobile:o}),e.dataset.label=o.mobile}),{onlyView:"mobile"})),"header_color_switch_visibility"===t&&(0,r.updateAndSaveEl)(l,(function(e){return(0,r.responsiveClassesFor)(a(a({},o),{},{desktop:!0}),e)}))})),o().on("ct:customizer:sync:collect-variable-descriptors",(function(e){e.result=p(p({},e.result),{},{darkColorPalette:function(e){return Object.keys(e).reduce((function(t,o){return[].concat(s(t),[{selector:':root[data-color-mode*="dark"]',variable:e[o].variable?e[o].variable:"theme-palette-color-".concat(o.replace("color","")),type:"color:".concat(o)}])}),[])}})})),o().on("ct:header:sync:item:color-mode-switcher",(function(e){e.itemId;var t=e.optionId,o=e.optionValue;"default_color_mode"===t&&(document.documentElement.dataset.colorMode="system"===o?"os-default":o)}))}();