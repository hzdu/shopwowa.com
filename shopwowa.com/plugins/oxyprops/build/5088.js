"use strict";(globalThis.webpackChunkoxyprops=globalThis.webpackChunkoxyprops||[]).push([[5088],{5088:(e,n,t)=>{t.r(n),t.d(n,{OxygenBasicsMenuItems:()=>o});const o={name:"Basics",values:[]};[{tag:"section",niceName:"Section",element:"ct_section",initiallyHidden:!0},{tag:"div",niceName:"Div",element:"ct_div_block",initiallyHidden:!0},{tag:"div",niceName:"InnerContent",element:"ct_inner_content",initiallyHidden:!0},{tag:"div",niceName:"Columns",element:"ct_new_columns",initiallyHidden:!1},{tag:"h1",niceName:"Heading 1",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h1"}}},{tag:"h2",niceName:"Heading 2",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h2"}}},{tag:"h3",niceName:"Heading 3",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h3"}}},{tag:"h4",niceName:"Heading 4",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h4"}}},{tag:"h5",niceName:"Heading 5",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h5"}}},{tag:"h6",niceName:"Heading 6",element:"ct_headline",initiallyHidden:!0,options:{ct_content:"Double-click this headline to edit the text.",original:{tag:"h6"}}},{tag:"p",niceName:"Text",element:"ct_text_block",initiallyHidden:!0,options:{ct_content:"This is a block of text. Double-click this text to edit it.",original:{tag:"p"}}},{tag:"div",niceName:"Rich Text",element:"oxy_rich_text",initiallyHidden:!1,options:{ct_content:"This is a block of Rich Text. Double-click this text to edit it."}},{tag:"a",niceName:"Int. Link",element:"ct_link_text",initiallyHidden:!1,options:{ct_content:"Double-click to edit link text.",original:{target:"_self"}}},{tag:"a",niceName:"Ext. Link",element:"ct_link_text",initiallyHidden:!0,options:{ct_content:"Double-click to edit link text.",original:{rel:"noopener noreferrer nofollow",target:"_blank"}}},{tag:"a",niceName:"Int. LnkWrp",element:"ct_link",initiallyHidden:!0,options:{original:{target:"_self"}}},{tag:"a",niceName:"Ext. LnkWrp",element:"ct_link",initiallyHidden:!0,options:{original:{rel:"noopener noreferrer nofollow",target:"_blank"}}},{tag:"a",niceName:"Button",element:"ct_link_button",initiallyHidden:!0,options:{ct_content:"Double-click to edit button text."}},{tag:"a",niceName:"Skip Link",element:"ct_link_text",initiallyHidden:!0,options:{original:{url:"#main",url_encoded:"true"},classes:["oxel-skiplink"],activeselector:"oxel-skiplink",ct_content:"Skip to Content"}},{tag:"a",niceName:"Dropdown Button",element:"ct_div_block",initiallyHidden:!0,options:{classes:["oxel_dropdown_buttonv2"],activeselector:"oxel_dropdown_buttonv2"},children:[{name:"ct_code_block",options:{original:{"code-css":"body.ng-scope .oxel_dropdown_buttonv2__submenu--hidden {\n display: initial;\n opacity: 1;\n pointer-events: initial;\n}\n\n.oxel_dropdown_buttonv2_trigger {\n\tborder-style: none;\n}","code-js":"document.querySelectorAll( '.oxel_dropdown_buttonv2__trigger' ).forEach( button => {\n\t\n\tif( window.angular ) return;\n\t\n\tbutton.addEventListener( 'click', e => {\n\t\t\n\t\tlet thisButton = e.target.closest( '.oxel_dropdown_buttonv2__trigger' );\n\t\tlet thisButtonExpanded = thisButton.getAttribute( 'aria-expanded' );\n\t\t\n\t\t// Close all other submenus.\n\t\tdocument.querySelectorAll( '.oxel_dropdown_buttonv2__submenu' ).forEach( submenu => {\n\t\t\t\n\t\t\tif( submenu != thisButton?.nextElementSibling ) {\n\t\t\t\n\t\t\t\tsubmenu.classList.add( 'oxel_dropdown_buttonv2__submenu--hidden' );\n\t\t\t   \n\t\t\t}\n\t\t\t\n\t\t})\n\t\t\n\t\tthisButton?.nextElementSibling.classList.toggle( 'oxel_dropdown_buttonv2__submenu--hidden' );\n\t\t\n\t\tif( thisButtonExpanded == 'true' ) {\n\t\t\tthisButton.setAttribute( 'aria-expanded', 'false' );\n\t\t} else {\n\t\t\tthisButton.setAttribute( 'aria-expanded', 'true' );\n\t\t}\n\t\t\n\t})\n\t\n})\n\n// Handle keyboard events and focus management.\ndocument.querySelectorAll( '.oxel_dropdown_buttonv2' ).forEach( dropdown => {\n\t\t\t   \n\tif( window.angular ) return;\n\n\tdropdown.addEventListener( 'keyup', e => {\n\t\t\n\t\tif( ( e.key == \"Escape\" || e.keyCode == 27 ) && !e.target.classList.contains( 'oxel_dropdown_buttonv2__trigger' ) ) {\n\t\t\t\n\t\t\tdropdown.querySelector( '.oxel_dropdown_buttonv2__trigger' ).focus();\n\t\t\tdropdown.querySelector( '.oxel_dropdown_buttonv2__submenu' ).classList.add( 'oxel_dropdown_buttonv2__submenu--hidden' );\n\n\t\t}\n\t\t\n\t\tif( ( e.key == \"Space\" || e.keyCode == 32 || e.key == \"Enter\" || e.keyCode == 13 ) && e.target.classList.contains( 'oxel_dropdown_buttonv2__trigger' ) ) {\n\t\t\t\n\t\t\tdropdown.querySelector( '.oxel_dropdown_buttonv2__submenulabel' ).focus();\n\t\t\n\t\t}\n\n\t})\n\n})\n\t\n// Close all dropdown button submenus when clicking outside.\ndocument.addEventListener('pointerdown', e => {\n\t\t\t   \n\t    if( window.angular ) return;\n\t\t\n\t\tif( !e.target.closest( '.oxel_dropdown_buttonv2' ) ) {\n\t\t\n\t\t\tdocument.querySelectorAll( '.oxel_dropdown_buttonv2__submenu' ).forEach( submenu => {\n\t\t\n\t\t\t\tsubmenu.classList.add( 'oxel_dropdown_buttonv2__submenu--hidden' );\n\t\t\n\t\t\t})\n\t\t\n\t\t}\n\n})","code-php":"\x3c!-- --\x3e"},nicename:"Dropdown Button Code",ct_content:""}},{name:"ct_div_block",options:{nicename:"Trigger",classes:["oxel_dropdown_buttonv2__trigger"],original:{useCustomTag:"true",tag:"button","custom-attributes":[{name:"aria-label",value:"Dropdown button, click to expand options"},{name:"aria-haspopup",value:"true"},{name:"aria-expanded",value:"false"}]}},children:[{name:"ct_text_block",options:{classes:["oxel_dropdown_buttonv2__label"],nicename:"Label",original:{useCustomTag:"true",tag:"span"},ct_content:"Actions<br>"}},{name:"ct_div_block",options:{original:{useCustomTag:"true",tag:"span"},classes:["oxel_dropdown_buttonv2__symbol"],nicename:"Icon",ct_content:""}}]},{name:"ct_div_block",options:{classes:["oxel_dropdown_buttonv2__submenu","oxel_dropdown_buttonv2__submenu--hidden"],nicename:"Submenu",original:{useCustomTag:"true",tag:"ul"}},children:[{name:"ct_div_block",options:{original:{useCustomTag:"true",tag:"li"},nicename:"SubButton",classes:["oxel_dropdown_buttonv2__submenubutton"]},children:[{name:"ct_link_text",options:{classes:["oxel_dropdown_buttonv2__submenulabel"],original:{target:"",url_encoded:"true",url:"#"},ct_content:"Log In",nicename:"Text Link"}}]},{name:"ct_div_block",options:{original:{useCustomTag:"true",tag:"li"},nicename:"SubButton",classes:["oxel_dropdown_buttonv2__submenubutton"]},children:[{name:"ct_link_text",options:{classes:["oxel_dropdown_buttonv2__submenulabel"],original:{target:"",url_encoded:"true",url:"#"},ct_content:"Sign Up",nicename:"Text Link"}}]},{name:"ct_div_block",options:{original:{useCustomTag:"true",tag:"li"},nicename:"SubButton",classes:["oxel_dropdown_buttonv2__submenubutton"]},children:[{name:"ct_link_text",options:{classes:["oxel_dropdown_buttonv2__submenulabel"],original:{url:"#",target:"",url_encoded:"true"},ct_content:"Contact Me",nicename:"Text Link"}}]}]}]},{tag:"a",niceName:"Icon Button",element:"ct_div_block",initiallyHidden:!0,options:{classes:["oxel_icon_button__container"],activeselector:"oxel_icon_button__container",original:{"custom-attributes":[{name:"role",value:"button"}]}},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-home"},classes:["oxel_icon_button_icon"],activeselector:"oxel_icon_button_icon",ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_icon_button_text"],activeselector:"oxel_icon_button_text",ct_content:"Home",nicename:"Text"}}]},{tag:"img",niceName:"Image",initiallyHidden:!1,element:"ct_image",options:{original:{image_type:"1",attachment_size:"full",src:"//picsum.photos/1600/900?random={{randomInt}}","null-unit":"undefined"}}},{tag:"div",niceName:"Video",initiallyHidden:!0,element:"ct_video",options:{original:{src:"https://youtu.be/DvSUdxq4Tzw",embed_src:"https://www.youtube.com/embed/DvSUdxq4Tzw"}}},{tag:"div",niceName:"Icon",initiallyHidden:!1,element:"ct_fancy_icon",options:{original:{"icon-id":"Lineariconsicon-home"},nicename:"Icon"}},{tag:"div",niceName:"H Divider",initiallyHidden:!0,element:"ct_div_block",options:{original:{"flex-direction":"row",display:"flex","align-items":"center","justify-content":"center","text-align":"center"},activeselector:"oxel_horizontal_divider",classes:["oxel_horizontal_divider"]},children:[{name:"ct_code_block",options:{original:{"code-php":"\x3c!-- --\x3e","code-css":".oxel_horizontal_divider__line {\nflex-grow: 1;\n}"},nicename:"Left Line",classes:["oxel_horizontal_divider__line"],ct_content:""}},{name:"ct_fancy_icon",options:{original:{"icon-background-color":"color(1456)","icon-padding":"8","icon-id":"FontAwesomeicon-dot-circle-o","icon-style":"3","margin-left":"16","margin-right":"16"},classes:["oxel_horizontal_divider__icon"],nicename:"Center Element",ct_content:""}},{name:"ct_code_block",options:{original:{"code-php":"\x3c!-- --\x3e"},nicename:"Right Line",classes:["oxel_horizontal_divider__line"],ct_content:""}}]},{tag:"div",niceName:"Icon List",initiallyHidden:!0,element:"ct_div_block",options:{classes:["oxel_iconlist"],activeselector:"oxel_iconlist",nicename:"Icon List"},children:[{name:"ct_div_block",options:{classes:["oxel_iconlist__row"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"A super simple icon list element.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row","oxel_iconlist__row--dark"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"It has several list items you can easily edit.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"Delete rows you don't need.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row","oxel_iconlist__row--dark"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"Duplicate existing rows to add more.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"Change the icons per row.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row","oxel_iconlist__row--dark"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"Change the icon padding to adjust the left spacing.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"Classes for easy editing.",nicename:"Text"}}]},{name:"ct_div_block",options:{classes:["oxel_iconlist__row","oxel_iconlist__row--dark"],nicename:"Row"},children:[{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-check"},classes:["oxel_iconlist__row__icon"],ct_content:"",nicename:"Icon"}},{name:"ct_text_block",options:{classes:["oxel_iconlist__row__label"],ct_content:"List anything with fancy icons.",nicename:"Text"}}]}]},{tag:"div",niceName:"Scroll Img",initiallyHidden:!0,element:"ct_div_block",options:{original:{"background-image":"//picsum.photos/1000/3000?random={{randomInt}}","undefined-unit":"undefined"},classes:["oxel_scrollingImage__container"],activeselector:!1,nicename:"Hover Scrolling Image"},children:[{name:"ct_code_block",options:{original:{"code-php":"\x3c!-- --\x3e","code-css":".oxel_scrollingImage__container:hover .oxel_scrollingImage__container__icon {\n  opacity: 0;\n  transform: translateY(100px);\n}"},nicename:"Hover Scrolling Image Code",ct_content:""}},{name:"ct_fancy_icon",options:{original:{"icon-id":"FontAwesomeicon-angle-double-down"},classes:["oxel_scrollingImage__container__icon"],nicename:"Hover Scrolling Image Icon",ct_content:""}}]}].forEach((e=>{var n,t,i,c;o.values.push({initiallyHidden:null!==(n=e.initiallyHidden)&&void 0!==n&&n,display:null!==(t=e.niceName)&&void 0!==t?t:"Div",value:{name:null!==(i=e.element)&&void 0!==i?i:"ct_div_block",options:{nicename:null!==(c=`<${e.tag}> ${e.niceName}`)&&void 0!==c?c:"Div",original:{}},depth:1}}),e.options&&(o.values[o.values.length-1].value.options={...o.values[o.values.length-1].value.options,...e.options}),e.children&&(o.values[o.values.length-1].value.children={...o.values[o.values.length-1].value.children,...e.children})}))}}]);