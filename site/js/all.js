/*!
  * Bootstrap v5.0.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@popperjs/core")):"function"==typeof define&&define.amd?define(["@popperjs/core"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e(t.Popper)}(this,(function(t){"use strict";function e(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(s){if("default"!==s){var i=Object.getOwnPropertyDescriptor(t,s);Object.defineProperty(e,s,i.get?i:{enumerable:!0,get:function(){return t[s]}})}})),e.default=t,Object.freeze(e)}var s=e(t);const i={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter(t=>t.matches(e)),parents(t,e){const s=[];let i=t.parentNode;for(;i&&i.nodeType===Node.ELEMENT_NODE&&3!==i.nodeType;)i.matches(e)&&s.push(i),i=i.parentNode;return s},prev(t,e){let s=t.previousElementSibling;for(;s;){if(s.matches(e))return[s];s=s.previousElementSibling}return[]},next(t,e){let s=t.nextElementSibling;for(;s;){if(s.matches(e))return[s];s=s.nextElementSibling}return[]}},n=t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t},o=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let s=t.getAttribute("href");if(!s||!s.includes("#")&&!s.startsWith("."))return null;s.includes("#")&&!s.startsWith("#")&&(s="#"+s.split("#")[1]),e=s&&"#"!==s?s.trim():null}return e},r=t=>{const e=o(t);return e&&document.querySelector(e)?e:null},a=t=>{const e=o(t);return e?document.querySelector(e):null},l=t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:s}=window.getComputedStyle(t);const i=Number.parseFloat(e),n=Number.parseFloat(s);return i||n?(e=e.split(",")[0],s=s.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(s))):0},c=t=>{t.dispatchEvent(new Event("transitionend"))},h=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),d=t=>h(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?i.findOne(t):null,u=(t,e)=>{let s=!1;const i=e+5;t.addEventListener("transitionend",(function e(){s=!0,t.removeEventListener("transitionend",e)})),setTimeout(()=>{s||c(t)},i)},g=(t,e,s)=>{Object.keys(s).forEach(i=>{const n=s[i],o=e[i],r=o&&h(o)?"element":null==(a=o)?""+a:{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();var a;if(!new RegExp(n).test(r))throw new TypeError(`${t.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`)})},f=t=>{if(!t)return!1;if(t.style&&t.parentNode&&t.parentNode.style){const e=getComputedStyle(t),s=getComputedStyle(t.parentNode);return"none"!==e.display&&"none"!==s.display&&"hidden"!==e.visibility}return!1},p=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),m=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?m(t.parentNode):null},_=()=>{},b=t=>t.offsetHeight,v=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},y=()=>"rtl"===document.documentElement.dir,w=t=>{var e;e=()=>{const e=v();if(e){const s=t.NAME,i=e.fn[s];e.fn[s]=t.jQueryInterface,e.fn[s].Constructor=t,e.fn[s].noConflict=()=>(e.fn[s]=i,t.jQueryInterface)}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()},E=t=>{"function"==typeof t&&t()},T=new Map;var A={set(t,e,s){T.has(t)||T.set(t,new Map);const i=T.get(t);i.has(e)||0===i.size?i.set(e,s):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`)},get:(t,e)=>T.has(t)&&T.get(t).get(e)||null,remove(t,e){if(!T.has(t))return;const s=T.get(t);s.delete(e),0===s.size&&T.delete(t)}};const k=/[^.]*(?=\..*)\.|.*/,L=/\..*/,C=/::\d+$/,D={};let N=1;const S={mouseenter:"mouseover",mouseleave:"mouseout"},O=/^(mouseenter|mouseleave)/i,I=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function x(t,e){return e&&`${e}::${N++}`||t.uidEvent||N++}function j(t){const e=x(t);return t.uidEvent=e,D[e]=D[e]||{},D[e]}function P(t,e,s=null){const i=Object.keys(t);for(let n=0,o=i.length;n<o;n++){const o=t[i[n]];if(o.originalHandler===e&&o.delegationSelector===s)return o}return null}function M(t,e,s){const i="string"==typeof e,n=i?s:e;let o=B(t);return I.has(o)||(o=t),[i,n,o]}function H(t,e,s,i,n){if("string"!=typeof e||!t)return;if(s||(s=i,i=null),O.test(e)){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};i?i=t(i):s=t(s)}const[o,r,a]=M(e,s,i),l=j(t),c=l[a]||(l[a]={}),h=P(c,r,o?s:null);if(h)return void(h.oneOff=h.oneOff&&n);const d=x(r,e.replace(k,"")),u=o?function(t,e,s){return function i(n){const o=t.querySelectorAll(e);for(let{target:r}=n;r&&r!==this;r=r.parentNode)for(let a=o.length;a--;)if(o[a]===r)return n.delegateTarget=r,i.oneOff&&$.off(t,n.type,e,s),s.apply(r,[n]);return null}}(t,s,i):function(t,e){return function s(i){return i.delegateTarget=t,s.oneOff&&$.off(t,i.type,e),e.apply(t,[i])}}(t,s);u.delegationSelector=o?s:null,u.originalHandler=r,u.oneOff=n,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function R(t,e,s,i,n){const o=P(e[s],i,n);o&&(t.removeEventListener(s,o,Boolean(n)),delete e[s][o.uidEvent])}function B(t){return t=t.replace(L,""),S[t]||t}const $={on(t,e,s,i){H(t,e,s,i,!1)},one(t,e,s,i){H(t,e,s,i,!0)},off(t,e,s,i){if("string"!=typeof e||!t)return;const[n,o,r]=M(e,s,i),a=r!==e,l=j(t),c=e.startsWith(".");if(void 0!==o){if(!l||!l[r])return;return void R(t,l,r,o,n?s:null)}c&&Object.keys(l).forEach(s=>{!function(t,e,s,i){const n=e[s]||{};Object.keys(n).forEach(o=>{if(o.includes(i)){const i=n[o];R(t,e,s,i.originalHandler,i.delegationSelector)}})}(t,l,s,e.slice(1))});const h=l[r]||{};Object.keys(h).forEach(s=>{const i=s.replace(C,"");if(!a||e.includes(i)){const e=h[s];R(t,l,r,e.originalHandler,e.delegationSelector)}})},trigger(t,e,s){if("string"!=typeof e||!t)return null;const i=v(),n=B(e),o=e!==n,r=I.has(n);let a,l=!0,c=!0,h=!1,d=null;return o&&i&&(a=i.Event(e,s),i(t).trigger(a),l=!a.isPropagationStopped(),c=!a.isImmediatePropagationStopped(),h=a.isDefaultPrevented()),r?(d=document.createEvent("HTMLEvents"),d.initEvent(n,l,!0)):d=new CustomEvent(e,{bubbles:l,cancelable:!0}),void 0!==s&&Object.keys(s).forEach(t=>{Object.defineProperty(d,t,{get:()=>s[t]})}),h&&d.preventDefault(),c&&t.dispatchEvent(d),d.defaultPrevented&&void 0!==a&&a.preventDefault(),d}};class z{constructor(t){(t=d(t))&&(this._element=t,A.set(this._element,this.constructor.DATA_KEY,this))}dispose(){A.remove(this._element,this.constructor.DATA_KEY),$.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach(t=>{this[t]=null})}_queueCallback(t,e,s=!0){if(!s)return void E(t);const i=l(e);$.one(e,"transitionend",()=>E(t)),u(e,i)}static getInstance(t){return A.get(t,this.DATA_KEY)}static get VERSION(){return"5.0.1"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return"bs."+this.NAME}static get EVENT_KEY(){return"."+this.DATA_KEY}}class U extends z{static get NAME(){return"alert"}close(t){const e=t?this._getRootElement(t):this._element,s=this._triggerCloseEvent(e);null===s||s.defaultPrevented||this._removeElement(e)}_getRootElement(t){return a(t)||t.closest(".alert")}_triggerCloseEvent(t){return $.trigger(t,"close.bs.alert")}_removeElement(t){t.classList.remove("show");const e=t.classList.contains("fade");this._queueCallback(()=>this._destroyElement(t),t,e)}_destroyElement(t){t.parentNode&&t.parentNode.removeChild(t),$.trigger(t,"closed.bs.alert")}static jQueryInterface(t){return this.each((function(){let e=A.get(this,"bs.alert");e||(e=new U(this)),"close"===t&&e[t](this)}))}static handleDismiss(t){return function(e){e&&e.preventDefault(),t.close(this)}}}$.on(document,"click.bs.alert.data-api",'[data-bs-dismiss="alert"]',U.handleDismiss(new U)),w(U);class q extends z{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){let e=A.get(this,"bs.button");e||(e=new q(this)),"toggle"===t&&e[t]()}))}}function F(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function W(t){return t.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}$.on(document,"click.bs.button.data-api",'[data-bs-toggle="button"]',t=>{t.preventDefault();const e=t.target.closest('[data-bs-toggle="button"]');let s=A.get(e,"bs.button");s||(s=new q(e)),s.toggle()}),w(q);const K={setDataAttribute(t,e,s){t.setAttribute("data-bs-"+W(e),s)},removeDataAttribute(t,e){t.removeAttribute("data-bs-"+W(e))},getDataAttributes(t){if(!t)return{};const e={};return Object.keys(t.dataset).filter(t=>t.startsWith("bs")).forEach(s=>{let i=s.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=F(t.dataset[s])}),e},getDataAttribute:(t,e)=>F(t.getAttribute("data-bs-"+W(e))),offset(t){const e=t.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},position:t=>({top:t.offsetTop,left:t.offsetLeft})},V={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},Q={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},X="next",Y="prev",G="left",Z="right";class J extends z{constructor(t,e){super(t),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._indicatorsElement=i.findOne(".carousel-indicators",this._element),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent),this._addEventListeners()}static get Default(){return V}static get NAME(){return"carousel"}next(){this._isSliding||this._slide(X)}nextWhenVisible(){!document.hidden&&f(this._element)&&this.next()}prev(){this._isSliding||this._slide(Y)}pause(t){t||(this._isPaused=!0),i.findOne(".carousel-item-next, .carousel-item-prev",this._element)&&(c(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}cycle(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))}to(t){this._activeElement=i.findOne(".active.carousel-item",this._element);const e=this._getItemIndex(this._activeElement);if(t>this._items.length-1||t<0)return;if(this._isSliding)return void $.one(this._element,"slid.bs.carousel",()=>this.to(t));if(e===t)return this.pause(),void this.cycle();const s=t>e?X:Y;this._slide(s,this._items[t])}_getConfig(t){return t={...V,...t},g("carousel",t,Q),t}_handleSwipe(){const t=Math.abs(this.touchDeltaX);if(t<=40)return;const e=t/this.touchDeltaX;this.touchDeltaX=0,e&&this._slide(e>0?Z:G)}_addEventListeners(){this._config.keyboard&&$.on(this._element,"keydown.bs.carousel",t=>this._keydown(t)),"hover"===this._config.pause&&($.on(this._element,"mouseenter.bs.carousel",t=>this.pause(t)),$.on(this._element,"mouseleave.bs.carousel",t=>this.cycle(t))),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()}_addTouchEventListeners(){const t=t=>{!this._pointerEvent||"pen"!==t.pointerType&&"touch"!==t.pointerType?this._pointerEvent||(this.touchStartX=t.touches[0].clientX):this.touchStartX=t.clientX},e=t=>{this.touchDeltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this.touchStartX},s=t=>{!this._pointerEvent||"pen"!==t.pointerType&&"touch"!==t.pointerType||(this.touchDeltaX=t.clientX-this.touchStartX),this._handleSwipe(),"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(t=>this.cycle(t),500+this._config.interval))};i.find(".carousel-item img",this._element).forEach(t=>{$.on(t,"dragstart.bs.carousel",t=>t.preventDefault())}),this._pointerEvent?($.on(this._element,"pointerdown.bs.carousel",e=>t(e)),$.on(this._element,"pointerup.bs.carousel",t=>s(t)),this._element.classList.add("pointer-event")):($.on(this._element,"touchstart.bs.carousel",e=>t(e)),$.on(this._element,"touchmove.bs.carousel",t=>e(t)),$.on(this._element,"touchend.bs.carousel",t=>s(t)))}_keydown(t){/input|textarea/i.test(t.target.tagName)||("ArrowLeft"===t.key?(t.preventDefault(),this._slide(Z)):"ArrowRight"===t.key&&(t.preventDefault(),this._slide(G)))}_getItemIndex(t){return this._items=t&&t.parentNode?i.find(".carousel-item",t.parentNode):[],this._items.indexOf(t)}_getItemByOrder(t,e){const s=t===X,i=t===Y,n=this._getItemIndex(e),o=this._items.length-1;if((i&&0===n||s&&n===o)&&!this._config.wrap)return e;const r=(n+(i?-1:1))%this._items.length;return-1===r?this._items[this._items.length-1]:this._items[r]}_triggerSlideEvent(t,e){const s=this._getItemIndex(t),n=this._getItemIndex(i.findOne(".active.carousel-item",this._element));return $.trigger(this._element,"slide.bs.carousel",{relatedTarget:t,direction:e,from:n,to:s})}_setActiveIndicatorElement(t){if(this._indicatorsElement){const e=i.findOne(".active",this._indicatorsElement);e.classList.remove("active"),e.removeAttribute("aria-current");const s=i.find("[data-bs-target]",this._indicatorsElement);for(let e=0;e<s.length;e++)if(Number.parseInt(s[e].getAttribute("data-bs-slide-to"),10)===this._getItemIndex(t)){s[e].classList.add("active"),s[e].setAttribute("aria-current","true");break}}}_updateInterval(){const t=this._activeElement||i.findOne(".active.carousel-item",this._element);if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}_slide(t,e){const s=this._directionToOrder(t),n=i.findOne(".active.carousel-item",this._element),o=this._getItemIndex(n),r=e||this._getItemByOrder(s,n),a=this._getItemIndex(r),l=Boolean(this._interval),c=s===X,h=c?"carousel-item-start":"carousel-item-end",d=c?"carousel-item-next":"carousel-item-prev",u=this._orderToDirection(s);if(r&&r.classList.contains("active"))return void(this._isSliding=!1);if(this._triggerSlideEvent(r,u).defaultPrevented)return;if(!n||!r)return;this._isSliding=!0,l&&this.pause(),this._setActiveIndicatorElement(r),this._activeElement=r;const g=()=>{$.trigger(this._element,"slid.bs.carousel",{relatedTarget:r,direction:u,from:o,to:a})};if(this._element.classList.contains("slide")){r.classList.add(d),b(r),n.classList.add(h),r.classList.add(h);const t=()=>{r.classList.remove(h,d),r.classList.add("active"),n.classList.remove("active",d,h),this._isSliding=!1,setTimeout(g,0)};this._queueCallback(t,n,!0)}else n.classList.remove("active"),r.classList.add("active"),this._isSliding=!1,g();l&&this.cycle()}_directionToOrder(t){return[Z,G].includes(t)?y()?t===G?Y:X:t===G?X:Y:t}_orderToDirection(t){return[X,Y].includes(t)?y()?t===Y?G:Z:t===Y?Z:G:t}static carouselInterface(t,e){let s=A.get(t,"bs.carousel"),i={...V,...K.getDataAttributes(t)};"object"==typeof e&&(i={...i,...e});const n="string"==typeof e?e:i.slide;if(s||(s=new J(t,i)),"number"==typeof e)s.to(e);else if("string"==typeof n){if(void 0===s[n])throw new TypeError(`No method named "${n}"`);s[n]()}else i.interval&&i.ride&&(s.pause(),s.cycle())}static jQueryInterface(t){return this.each((function(){J.carouselInterface(this,t)}))}static dataApiClickHandler(t){const e=a(this);if(!e||!e.classList.contains("carousel"))return;const s={...K.getDataAttributes(e),...K.getDataAttributes(this)},i=this.getAttribute("data-bs-slide-to");i&&(s.interval=!1),J.carouselInterface(e,s),i&&A.get(e,"bs.carousel").to(i),t.preventDefault()}}$.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",J.dataApiClickHandler),$.on(window,"load.bs.carousel.data-api",()=>{const t=i.find('[data-bs-ride="carousel"]');for(let e=0,s=t.length;e<s;e++)J.carouselInterface(t[e],A.get(t[e],"bs.carousel"))}),w(J);const tt={toggle:!0,parent:""},et={toggle:"boolean",parent:"(string|element)"};class st extends z{constructor(t,e){super(t),this._isTransitioning=!1,this._config=this._getConfig(e),this._triggerArray=i.find(`[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`);const s=i.find('[data-bs-toggle="collapse"]');for(let t=0,e=s.length;t<e;t++){const e=s[t],n=r(e),o=i.find(n).filter(t=>t===this._element);null!==n&&o.length&&(this._selector=n,this._triggerArray.push(e))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}static get Default(){return tt}static get NAME(){return"collapse"}toggle(){this._element.classList.contains("show")?this.hide():this.show()}show(){if(this._isTransitioning||this._element.classList.contains("show"))return;let t,e;this._parent&&(t=i.find(".show, .collapsing",this._parent).filter(t=>"string"==typeof this._config.parent?t.getAttribute("data-bs-parent")===this._config.parent:t.classList.contains("collapse")),0===t.length&&(t=null));const s=i.findOne(this._selector);if(t){const i=t.find(t=>s!==t);if(e=i?A.get(i,"bs.collapse"):null,e&&e._isTransitioning)return}if($.trigger(this._element,"show.bs.collapse").defaultPrevented)return;t&&t.forEach(t=>{s!==t&&st.collapseInterface(t,"hide"),e||A.set(t,"bs.collapse",null)});const n=this._getDimension();this._element.classList.remove("collapse"),this._element.classList.add("collapsing"),this._element.style[n]=0,this._triggerArray.length&&this._triggerArray.forEach(t=>{t.classList.remove("collapsed"),t.setAttribute("aria-expanded",!0)}),this.setTransitioning(!0);const o="scroll"+(n[0].toUpperCase()+n.slice(1));this._queueCallback(()=>{this._element.classList.remove("collapsing"),this._element.classList.add("collapse","show"),this._element.style[n]="",this.setTransitioning(!1),$.trigger(this._element,"shown.bs.collapse")},this._element,!0),this._element.style[n]=this._element[o]+"px"}hide(){if(this._isTransitioning||!this._element.classList.contains("show"))return;if($.trigger(this._element,"hide.bs.collapse").defaultPrevented)return;const t=this._getDimension();this._element.style[t]=this._element.getBoundingClientRect()[t]+"px",b(this._element),this._element.classList.add("collapsing"),this._element.classList.remove("collapse","show");const e=this._triggerArray.length;if(e>0)for(let t=0;t<e;t++){const e=this._triggerArray[t],s=a(e);s&&!s.classList.contains("show")&&(e.classList.add("collapsed"),e.setAttribute("aria-expanded",!1))}this.setTransitioning(!0),this._element.style[t]="",this._queueCallback(()=>{this.setTransitioning(!1),this._element.classList.remove("collapsing"),this._element.classList.add("collapse"),$.trigger(this._element,"hidden.bs.collapse")},this._element,!0)}setTransitioning(t){this._isTransitioning=t}_getConfig(t){return(t={...tt,...t}).toggle=Boolean(t.toggle),g("collapse",t,et),t}_getDimension(){return this._element.classList.contains("width")?"width":"height"}_getParent(){let{parent:t}=this._config;t=d(t);const e=`[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;return i.find(e,t).forEach(t=>{const e=a(t);this._addAriaAndCollapsedClass(e,[t])}),t}_addAriaAndCollapsedClass(t,e){if(!t||!e.length)return;const s=t.classList.contains("show");e.forEach(t=>{s?t.classList.remove("collapsed"):t.classList.add("collapsed"),t.setAttribute("aria-expanded",s)})}static collapseInterface(t,e){let s=A.get(t,"bs.collapse");const i={...tt,...K.getDataAttributes(t),..."object"==typeof e&&e?e:{}};if(!s&&i.toggle&&"string"==typeof e&&/show|hide/.test(e)&&(i.toggle=!1),s||(s=new st(t,i)),"string"==typeof e){if(void 0===s[e])throw new TypeError(`No method named "${e}"`);s[e]()}}static jQueryInterface(t){return this.each((function(){st.collapseInterface(this,t)}))}}$.on(document,"click.bs.collapse.data-api",'[data-bs-toggle="collapse"]',(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const e=K.getDataAttributes(this),s=r(this);i.find(s).forEach(t=>{const s=A.get(t,"bs.collapse");let i;s?(null===s._parent&&"string"==typeof e.parent&&(s._config.parent=e.parent,s._parent=s._getParent()),i="toggle"):i=e,st.collapseInterface(t,i)})})),w(st);const it=new RegExp("ArrowUp|ArrowDown|Escape"),nt=y()?"top-end":"top-start",ot=y()?"top-start":"top-end",rt=y()?"bottom-end":"bottom-start",at=y()?"bottom-start":"bottom-end",lt=y()?"left-start":"right-start",ct=y()?"right-start":"left-start",ht={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},dt={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"};class ut extends z{constructor(t,e){super(t),this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}static get Default(){return ht}static get DefaultType(){return dt}static get NAME(){return"dropdown"}toggle(){p(this._element)||(this._element.classList.contains("show")?this.hide():this.show())}show(){if(p(this._element)||this._menu.classList.contains("show"))return;const t=ut.getParentFromElement(this._element),e={relatedTarget:this._element};if(!$.trigger(this._element,"show.bs.dropdown",e).defaultPrevented){if(this._inNavbar)K.setDataAttribute(this._menu,"popper","none");else{if(void 0===s)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=t:h(this._config.reference)?e=d(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const i=this._getPopperConfig(),n=i.modifiers.find(t=>"applyStyles"===t.name&&!1===t.enabled);this._popper=s.createPopper(e,this._menu,i),n&&K.setDataAttribute(this._menu,"popper","static")}"ontouchstart"in document.documentElement&&!t.closest(".navbar-nav")&&[].concat(...document.body.children).forEach(t=>$.on(t,"mouseover",_)),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle("show"),this._element.classList.toggle("show"),$.trigger(this._element,"shown.bs.dropdown",e)}}hide(){if(p(this._element)||!this._menu.classList.contains("show"))return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_addEventListeners(){$.on(this._element,"click.bs.dropdown",t=>{t.preventDefault(),this.toggle()})}_completeHide(t){$.trigger(this._element,"hide.bs.dropdown",t).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>$.off(t,"mouseover",_)),this._popper&&this._popper.destroy(),this._menu.classList.remove("show"),this._element.classList.remove("show"),this._element.setAttribute("aria-expanded","false"),K.removeDataAttribute(this._menu,"popper"),$.trigger(this._element,"hidden.bs.dropdown",t))}_getConfig(t){if(t={...this.constructor.Default,...K.getDataAttributes(this._element),...t},g("dropdown",t,this.constructor.DefaultType),"object"==typeof t.reference&&!h(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError("dropdown".toUpperCase()+': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');return t}_getMenuElement(){return i.next(this._element,".dropdown-menu")[0]}_getPlacement(){const t=this._element.parentNode;if(t.classList.contains("dropend"))return lt;if(t.classList.contains("dropstart"))return ct;const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?ot:nt:e?at:rt}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return"static"===this._config.display&&(t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,..."function"==typeof this._config.popperConfig?this._config.popperConfig(t):this._config.popperConfig}}_selectMenuItem(t){const e=i.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(f);if(!e.length)return;let s=e.indexOf(t.target);"ArrowUp"===t.key&&s>0&&s--,"ArrowDown"===t.key&&s<e.length-1&&s++,s=-1===s?0:s,e[s].focus()}static dropdownInterface(t,e){let s=A.get(t,"bs.dropdown");if(s||(s=new ut(t,"object"==typeof e?e:null)),"string"==typeof e){if(void 0===s[e])throw new TypeError(`No method named "${e}"`);s[e]()}}static jQueryInterface(t){return this.each((function(){ut.dropdownInterface(this,t)}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return;const e=i.find('[data-bs-toggle="dropdown"]');for(let s=0,i=e.length;s<i;s++){const i=A.get(e[s],"bs.dropdown");if(!i||!1===i._config.autoClose)continue;if(!i._element.classList.contains("show"))continue;const n={relatedTarget:i._element};if(t){const e=t.composedPath(),s=e.includes(i._menu);if(e.includes(i._element)||"inside"===i._config.autoClose&&!s||"outside"===i._config.autoClose&&s)continue;if(i._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;"click"===t.type&&(n.clickEvent=t)}i._completeHide(n)}}static getParentFromElement(t){return a(t)||t.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?"Space"===t.key||"Escape"!==t.key&&("ArrowDown"!==t.key&&"ArrowUp"!==t.key||t.target.closest(".dropdown-menu")):!it.test(t.key))return;const e=this.classList.contains("show");if(!e&&"Escape"===t.key)return;if(t.preventDefault(),t.stopPropagation(),p(this))return;const s=()=>this.matches('[data-bs-toggle="dropdown"]')?this:i.prev(this,'[data-bs-toggle="dropdown"]')[0];if("Escape"===t.key)return s().focus(),void ut.clearMenus();e||"ArrowUp"!==t.key&&"ArrowDown"!==t.key?e&&"Space"!==t.key?ut.getInstance(s())._selectMenuItem(t):ut.clearMenus():s().click()}}$.on(document,"keydown.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',ut.dataApiKeydownHandler),$.on(document,"keydown.bs.dropdown.data-api",".dropdown-menu",ut.dataApiKeydownHandler),$.on(document,"click.bs.dropdown.data-api",ut.clearMenus),$.on(document,"keyup.bs.dropdown.data-api",ut.clearMenus),$.on(document,"click.bs.dropdown.data-api",'[data-bs-toggle="dropdown"]',(function(t){t.preventDefault(),ut.dropdownInterface(this)})),w(ut);const gt=()=>{const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)},ft=(t=gt())=>{pt(),mt("body","paddingRight",e=>e+t),mt(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top","paddingRight",e=>e+t),mt(".sticky-top","marginRight",e=>e-t)},pt=()=>{const t=document.body.style.overflow;t&&K.setDataAttribute(document.body,"overflow",t),document.body.style.overflow="hidden"},mt=(t,e,s)=>{const n=gt();i.find(t).forEach(t=>{if(t!==document.body&&window.innerWidth>t.clientWidth+n)return;const i=t.style[e],o=window.getComputedStyle(t)[e];K.setDataAttribute(t,e,i),t.style[e]=s(Number.parseFloat(o))+"px"})},_t=()=>{bt("body","overflow"),bt("body","paddingRight"),bt(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top","paddingRight"),bt(".sticky-top","marginRight")},bt=(t,e)=>{i.find(t).forEach(t=>{const s=K.getDataAttribute(t,e);void 0===s?t.style.removeProperty(e):(K.removeDataAttribute(t,e),t.style[e]=s)})},vt={isVisible:!0,isAnimated:!1,rootElement:document.body,clickCallback:null},yt={isVisible:"boolean",isAnimated:"boolean",rootElement:"element",clickCallback:"(function|null)"};class wt{constructor(t){this._config=this._getConfig(t),this._isAppended=!1,this._element=null}show(t){this._config.isVisible?(this._append(),this._config.isAnimated&&b(this._getElement()),this._getElement().classList.add("show"),this._emulateAnimation(()=>{E(t)})):E(t)}hide(t){this._config.isVisible?(this._getElement().classList.remove("show"),this._emulateAnimation(()=>{this.dispose(),E(t)})):E(t)}_getElement(){if(!this._element){const t=document.createElement("div");t.className="modal-backdrop",this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_getConfig(t){return(t={...vt,..."object"==typeof t?t:{}}).rootElement=t.rootElement||document.body,g("backdrop",t,yt),t}_append(){this._isAppended||(this._config.rootElement.appendChild(this._getElement()),$.on(this._getElement(),"mousedown.bs.backdrop",()=>{E(this._config.clickCallback)}),this._isAppended=!0)}dispose(){this._isAppended&&($.off(this._element,"mousedown.bs.backdrop"),this._getElement().parentNode.removeChild(this._element),this._isAppended=!1)}_emulateAnimation(t){if(!this._config.isAnimated)return void E(t);const e=l(this._getElement());$.one(this._getElement(),"transitionend",()=>E(t)),u(this._getElement(),e)}}const Et={backdrop:!0,keyboard:!0,focus:!0},Tt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"};class At extends z{constructor(t,e){super(t),this._config=this._getConfig(e),this._dialog=i.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._isShown=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1}static get Default(){return Et}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){if(this._isShown||this._isTransitioning)return;this._isAnimated()&&(this._isTransitioning=!0);const e=$.trigger(this._element,"show.bs.modal",{relatedTarget:t});this._isShown||e.defaultPrevented||(this._isShown=!0,ft(),document.body.classList.add("modal-open"),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),$.on(this._element,"click.dismiss.bs.modal",'[data-bs-dismiss="modal"]',t=>this.hide(t)),$.on(this._dialog,"mousedown.dismiss.bs.modal",()=>{$.one(this._element,"mouseup.dismiss.bs.modal",t=>{t.target===this._element&&(this._ignoreBackdropClick=!0)})}),this._showBackdrop(()=>this._showElement(t)))}hide(t){if(t&&t.preventDefault(),!this._isShown||this._isTransitioning)return;if($.trigger(this._element,"hide.bs.modal").defaultPrevented)return;this._isShown=!1;const e=this._isAnimated();e&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),$.off(document,"focusin.bs.modal"),this._element.classList.remove("show"),$.off(this._element,"click.dismiss.bs.modal"),$.off(this._dialog,"mousedown.dismiss.bs.modal"),this._queueCallback(()=>this._hideModal(),this._element,e)}dispose(){[window,this._dialog].forEach(t=>$.off(t,".bs.modal")),this._backdrop.dispose(),super.dispose(),$.off(document,"focusin.bs.modal")}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new wt({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_getConfig(t){return t={...Et,...K.getDataAttributes(this._element),...t},g("modal",t,Tt),t}_showElement(t){const e=this._isAnimated(),s=i.findOne(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,s&&(s.scrollTop=0),e&&b(this._element),this._element.classList.add("show"),this._config.focus&&this._enforceFocus(),this._queueCallback(()=>{this._config.focus&&this._element.focus(),this._isTransitioning=!1,$.trigger(this._element,"shown.bs.modal",{relatedTarget:t})},this._dialog,e)}_enforceFocus(){$.off(document,"focusin.bs.modal"),$.on(document,"focusin.bs.modal",t=>{document===t.target||this._element===t.target||this._element.contains(t.target)||this._element.focus()})}_setEscapeEvent(){this._isShown?$.on(this._element,"keydown.dismiss.bs.modal",t=>{this._config.keyboard&&"Escape"===t.key?(t.preventDefault(),this.hide()):this._config.keyboard||"Escape"!==t.key||this._triggerBackdropTransition()}):$.off(this._element,"keydown.dismiss.bs.modal")}_setResizeEvent(){this._isShown?$.on(window,"resize.bs.modal",()=>this._adjustDialog()):$.off(window,"resize.bs.modal")}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove("modal-open"),this._resetAdjustments(),_t(),$.trigger(this._element,"hidden.bs.modal")})}_showBackdrop(t){$.on(this._element,"click.dismiss.bs.modal",t=>{this._ignoreBackdropClick?this._ignoreBackdropClick=!1:t.target===t.currentTarget&&(!0===this._config.backdrop?this.hide():"static"===this._config.backdrop&&this._triggerBackdropTransition())}),this._backdrop.show(t)}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if($.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight;t||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static");const e=l(this._dialog);$.off(this._element,"transitionend"),$.one(this._element,"transitionend",()=>{this._element.classList.remove("modal-static"),t||($.one(this._element,"transitionend",()=>{this._element.style.overflowY=""}),u(this._element,e))}),u(this._element,e),this._element.focus()}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=gt(),s=e>0;(!s&&t&&!y()||s&&!t&&y())&&(this._element.style.paddingLeft=e+"px"),(s&&!t&&!y()||!s&&t&&y())&&(this._element.style.paddingRight=e+"px")}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const s=At.getInstance(this)||new At(this,"object"==typeof t?t:{});if("string"==typeof t){if(void 0===s[t])throw new TypeError(`No method named "${t}"`);s[t](e)}}))}}$.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){const e=a(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),$.one(e,"show.bs.modal",t=>{t.defaultPrevented||$.one(e,"hidden.bs.modal",()=>{f(this)&&this.focus()})}),(At.getInstance(e)||new At(e)).toggle(this)})),w(At);const kt={backdrop:!0,keyboard:!0,scroll:!1},Lt={backdrop:"boolean",keyboard:"boolean",scroll:"boolean"};class Ct extends z{constructor(t,e){super(t),this._config=this._getConfig(e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._addEventListeners()}static get NAME(){return"offcanvas"}static get Default(){return kt}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||$.trigger(this._element,"show.bs.offcanvas",{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._element.style.visibility="visible",this._backdrop.show(),this._config.scroll||(ft(),this._enforceFocusOnElement(this._element)),this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add("show"),this._queueCallback(()=>{$.trigger(this._element,"shown.bs.offcanvas",{relatedTarget:t})},this._element,!0))}hide(){this._isShown&&($.trigger(this._element,"hide.bs.offcanvas").defaultPrevented||($.off(document,"focusin.bs.offcanvas"),this._element.blur(),this._isShown=!1,this._element.classList.remove("show"),this._backdrop.hide(),this._queueCallback(()=>{this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._element.style.visibility="hidden",this._config.scroll||_t(),$.trigger(this._element,"hidden.bs.offcanvas")},this._element,!0)))}dispose(){this._backdrop.dispose(),super.dispose(),$.off(document,"focusin.bs.offcanvas")}_getConfig(t){return t={...kt,...K.getDataAttributes(this._element),..."object"==typeof t?t:{}},g("offcanvas",t,Lt),t}_initializeBackDrop(){return new wt({isVisible:this._config.backdrop,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:()=>this.hide()})}_enforceFocusOnElement(t){$.off(document,"focusin.bs.offcanvas"),$.on(document,"focusin.bs.offcanvas",e=>{document===e.target||t===e.target||t.contains(e.target)||t.focus()}),t.focus()}_addEventListeners(){$.on(this._element,"click.dismiss.bs.offcanvas",'[data-bs-dismiss="offcanvas"]',()=>this.hide()),$.on(this._element,"keydown.dismiss.bs.offcanvas",t=>{this._config.keyboard&&"Escape"===t.key&&this.hide()})}static jQueryInterface(t){return this.each((function(){const e=A.get(this,"bs.offcanvas")||new Ct(this,"object"==typeof t?t:{});if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}$.on(document,"click.bs.offcanvas.data-api",'[data-bs-toggle="offcanvas"]',(function(t){const e=a(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),p(this))return;$.one(e,"hidden.bs.offcanvas",()=>{f(this)&&this.focus()});const s=i.findOne(".offcanvas.show");s&&s!==e&&Ct.getInstance(s).hide(),(A.get(e,"bs.offcanvas")||new Ct(e)).toggle(this)})),$.on(window,"load.bs.offcanvas.data-api",()=>{i.find(".offcanvas.show").forEach(t=>(A.get(t,"bs.offcanvas")||new Ct(t)).show())}),w(Ct);const Dt=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Nt=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,St=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,Ot=(t,e)=>{const s=t.nodeName.toLowerCase();if(e.includes(s))return!Dt.has(s)||Boolean(Nt.test(t.nodeValue)||St.test(t.nodeValue));const i=e.filter(t=>t instanceof RegExp);for(let t=0,e=i.length;t<e;t++)if(i[t].test(s))return!0;return!1};function It(t,e,s){if(!t.length)return t;if(s&&"function"==typeof s)return s(t);const i=(new window.DOMParser).parseFromString(t,"text/html"),n=Object.keys(e),o=[].concat(...i.body.querySelectorAll("*"));for(let t=0,s=o.length;t<s;t++){const s=o[t],i=s.nodeName.toLowerCase();if(!n.includes(i)){s.parentNode.removeChild(s);continue}const r=[].concat(...s.attributes),a=[].concat(e["*"]||[],e[i]||[]);r.forEach(t=>{Ot(t,a)||s.removeAttribute(t.nodeName)})}return i.body.innerHTML}const xt=new RegExp("(^|\\s)bs-tooltip\\S+","g"),jt=new Set(["sanitize","allowList","sanitizeFn"]),Pt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(array|string|function)",container:"(string|element|boolean)",fallbackPlacements:"array",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object|function)"},Mt={AUTO:"auto",TOP:"top",RIGHT:y()?"left":"right",BOTTOM:"bottom",LEFT:y()?"right":"left"},Ht={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:[0,0],container:!1,fallbackPlacements:["top","right","bottom","left"],boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:{"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},popperConfig:null},Rt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"};class Bt extends z{constructor(t,e){if(void 0===s)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this._config=this._getConfig(e),this.tip=null,this._setListeners()}static get Default(){return Ht}static get NAME(){return"tooltip"}static get Event(){return Rt}static get DefaultType(){return Pt}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(t){if(this._isEnabled)if(t){const e=this._initializeOnDelegatedTarget(t);e._activeTrigger.click=!e._activeTrigger.click,e._isWithActiveTrigger()?e._enter(null,e):e._leave(null,e)}else{if(this.getTipElement().classList.contains("show"))return void this._leave(null,this);this._enter(null,this)}}dispose(){clearTimeout(this._timeout),$.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.tip&&this.tip.parentNode&&this.tip.parentNode.removeChild(this.tip),this._popper&&this._popper.destroy(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this.isWithContent()||!this._isEnabled)return;const t=$.trigger(this._element,this.constructor.Event.SHOW),e=m(this._element),i=null===e?this._element.ownerDocument.documentElement.contains(this._element):e.contains(this._element);if(t.defaultPrevented||!i)return;const o=this.getTipElement(),r=n(this.constructor.NAME);o.setAttribute("id",r),this._element.setAttribute("aria-describedby",r),this.setContent(),this._config.animation&&o.classList.add("fade");const a="function"==typeof this._config.placement?this._config.placement.call(this,o,this._element):this._config.placement,l=this._getAttachment(a);this._addAttachmentClass(l);const{container:c}=this._config;A.set(o,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||(c.appendChild(o),$.trigger(this._element,this.constructor.Event.INSERTED)),this._popper?this._popper.update():this._popper=s.createPopper(this._element,o,this._getPopperConfig(l)),o.classList.add("show");const h="function"==typeof this._config.customClass?this._config.customClass():this._config.customClass;h&&o.classList.add(...h.split(" ")),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>{$.on(t,"mouseover",_)});const d=this.tip.classList.contains("fade");this._queueCallback(()=>{const t=this._hoverState;this._hoverState=null,$.trigger(this._element,this.constructor.Event.SHOWN),"out"===t&&this._leave(null,this)},this.tip,d)}hide(){if(!this._popper)return;const t=this.getTipElement();if($.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented)return;t.classList.remove("show"),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach(t=>$.off(t,"mouseover",_)),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1;const e=this.tip.classList.contains("fade");this._queueCallback(()=>{this._isWithActiveTrigger()||("show"!==this._hoverState&&t.parentNode&&t.parentNode.removeChild(t),this._cleanTipClass(),this._element.removeAttribute("aria-describedby"),$.trigger(this._element,this.constructor.Event.HIDDEN),this._popper&&(this._popper.destroy(),this._popper=null))},this.tip,e),this._hoverState=""}update(){null!==this._popper&&this._popper.update()}isWithContent(){return Boolean(this.getTitle())}getTipElement(){if(this.tip)return this.tip;const t=document.createElement("div");return t.innerHTML=this._config.template,this.tip=t.children[0],this.tip}setContent(){const t=this.getTipElement();this.setElementContent(i.findOne(".tooltip-inner",t),this.getTitle()),t.classList.remove("fade","show")}setElementContent(t,e){if(null!==t)return h(e)?(e=d(e),void(this._config.html?e.parentNode!==t&&(t.innerHTML="",t.appendChild(e)):t.textContent=e.textContent)):void(this._config.html?(this._config.sanitize&&(e=It(e,this._config.allowList,this._config.sanitizeFn)),t.innerHTML=e):t.textContent=e)}getTitle(){let t=this._element.getAttribute("data-bs-original-title");return t||(t="function"==typeof this._config.title?this._config.title.call(this._element):this._config.title),t}updateAttachment(t){return"right"===t?"end":"left"===t?"start":t}_initializeOnDelegatedTarget(t,e){const s=this.constructor.DATA_KEY;return(e=e||A.get(t.delegateTarget,s))||(e=new this.constructor(t.delegateTarget,this._getDelegateConfig()),A.set(t.delegateTarget,s,e)),e}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map(t=>Number.parseInt(t,10)):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:t=>this._handlePopperPlacementChange(t)}],onFirstUpdate:t=>{t.options.placement!==t.placement&&this._handlePopperPlacementChange(t)}};return{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_addAttachmentClass(t){this.getTipElement().classList.add("bs-tooltip-"+this.updateAttachment(t))}_getAttachment(t){return Mt[t.toUpperCase()]}_setListeners(){this._config.trigger.split(" ").forEach(t=>{if("click"===t)$.on(this._element,this.constructor.Event.CLICK,this._config.selector,t=>this.toggle(t));else if("manual"!==t){const e="hover"===t?this.constructor.Event.MOUSEENTER:this.constructor.Event.FOCUSIN,s="hover"===t?this.constructor.Event.MOUSELEAVE:this.constructor.Event.FOCUSOUT;$.on(this._element,e,this._config.selector,t=>this._enter(t)),$.on(this._element,s,this._config.selector,t=>this._leave(t))}}),this._hideModalHandler=()=>{this._element&&this.hide()},$.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this._config.selector?this._config={...this._config,trigger:"manual",selector:""}:this._fixTitle()}_fixTitle(){const t=this._element.getAttribute("title"),e=typeof this._element.getAttribute("data-bs-original-title");(t||"string"!==e)&&(this._element.setAttribute("data-bs-original-title",t||""),!t||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",t),this._element.setAttribute("title",""))}_enter(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),e.getTipElement().classList.contains("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e._config.delay&&e._config.delay.show?e._timeout=setTimeout(()=>{"show"===e._hoverState&&e.show()},e._config.delay.show):e.show())}_leave(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=e._element.contains(t.relatedTarget)),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e._config.delay&&e._config.delay.hide?e._timeout=setTimeout(()=>{"out"===e._hoverState&&e.hide()},e._config.delay.hide):e.hide())}_isWithActiveTrigger(){for(const t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1}_getConfig(t){const e=K.getDataAttributes(this._element);return Object.keys(e).forEach(t=>{jt.has(t)&&delete e[t]}),(t={...this.constructor.Default,...e,..."object"==typeof t&&t?t:{}}).container=!1===t.container?document.body:d(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),g("tooltip",t,this.constructor.DefaultType),t.sanitize&&(t.template=It(t.template,t.allowList,t.sanitizeFn)),t}_getDelegateConfig(){const t={};if(this._config)for(const e in this._config)this.constructor.Default[e]!==this._config[e]&&(t[e]=this._config[e]);return t}_cleanTipClass(){const t=this.getTipElement(),e=t.getAttribute("class").match(xt);null!==e&&e.length>0&&e.map(t=>t.trim()).forEach(e=>t.classList.remove(e))}_handlePopperPlacementChange(t){const{state:e}=t;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))}static jQueryInterface(t){return this.each((function(){let e=A.get(this,"bs.tooltip");const s="object"==typeof t&&t;if((e||!/dispose|hide/.test(t))&&(e||(e=new Bt(this,s)),"string"==typeof t)){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}w(Bt);const $t=new RegExp("(^|\\s)bs-popover\\S+","g"),zt={...Bt.Default,placement:"right",offset:[0,8],trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'},Ut={...Bt.DefaultType,content:"(string|element|function)"},qt={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"};class Ft extends Bt{static get Default(){return zt}static get NAME(){return"popover"}static get Event(){return qt}static get DefaultType(){return Ut}isWithContent(){return this.getTitle()||this._getContent()}setContent(){const t=this.getTipElement();this.setElementContent(i.findOne(".popover-header",t),this.getTitle());let e=this._getContent();"function"==typeof e&&(e=e.call(this._element)),this.setElementContent(i.findOne(".popover-body",t),e),t.classList.remove("fade","show")}_addAttachmentClass(t){this.getTipElement().classList.add("bs-popover-"+this.updateAttachment(t))}_getContent(){return this._element.getAttribute("data-bs-content")||this._config.content}_cleanTipClass(){const t=this.getTipElement(),e=t.getAttribute("class").match($t);null!==e&&e.length>0&&e.map(t=>t.trim()).forEach(e=>t.classList.remove(e))}static jQueryInterface(t){return this.each((function(){let e=A.get(this,"bs.popover");const s="object"==typeof t?t:null;if((e||!/dispose|hide/.test(t))&&(e||(e=new Ft(this,s),A.set(this,"bs.popover",e)),"string"==typeof t)){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}w(Ft);const Wt={offset:10,method:"auto",target:""},Kt={offset:"number",method:"string",target:"(string|element)"};class Vt extends z{constructor(t,e){super(t),this._scrollElement="BODY"===this._element.tagName?window:this._element,this._config=this._getConfig(e),this._selector=`${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,$.on(this._scrollElement,"scroll.bs.scrollspy",()=>this._process()),this.refresh(),this._process()}static get Default(){return Wt}static get NAME(){return"scrollspy"}refresh(){const t=this._scrollElement===this._scrollElement.window?"offset":"position",e="auto"===this._config.method?t:this._config.method,s="position"===e?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),i.find(this._selector).map(t=>{const n=r(t),o=n?i.findOne(n):null;if(o){const t=o.getBoundingClientRect();if(t.width||t.height)return[K[e](o).top+s,n]}return null}).filter(t=>t).sort((t,e)=>t[0]-e[0]).forEach(t=>{this._offsets.push(t[0]),this._targets.push(t[1])})}dispose(){$.off(this._scrollElement,".bs.scrollspy"),super.dispose()}_getConfig(t){if("string"!=typeof(t={...Wt,...K.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}}).target&&h(t.target)){let{id:e}=t.target;e||(e=n("scrollspy"),t.target.id=e),t.target="#"+e}return g("scrollspy",t,Kt),t}_getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}_getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}_getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}_process(){const t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),s=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=s){const t=this._targets[this._targets.length-1];this._activeTarget!==t&&this._activate(t)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(let e=this._offsets.length;e--;)this._activeTarget!==this._targets[e]&&t>=this._offsets[e]&&(void 0===this._offsets[e+1]||t<this._offsets[e+1])&&this._activate(this._targets[e])}}_activate(t){this._activeTarget=t,this._clear();const e=this._selector.split(",").map(e=>`${e}[data-bs-target="${t}"],${e}[href="${t}"]`),s=i.findOne(e.join(","));s.classList.contains("dropdown-item")?(i.findOne(".dropdown-toggle",s.closest(".dropdown")).classList.add("active"),s.classList.add("active")):(s.classList.add("active"),i.parents(s,".nav, .list-group").forEach(t=>{i.prev(t,".nav-link, .list-group-item").forEach(t=>t.classList.add("active")),i.prev(t,".nav-item").forEach(t=>{i.children(t,".nav-link").forEach(t=>t.classList.add("active"))})})),$.trigger(this._scrollElement,"activate.bs.scrollspy",{relatedTarget:t})}_clear(){i.find(this._selector).filter(t=>t.classList.contains("active")).forEach(t=>t.classList.remove("active"))}static jQueryInterface(t){return this.each((function(){const e=Vt.getInstance(this)||new Vt(this,"object"==typeof t?t:{});if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}$.on(window,"load.bs.scrollspy.data-api",()=>{i.find('[data-bs-spy="scroll"]').forEach(t=>new Vt(t))}),w(Vt);class Qt extends z{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains("active"))return;let t;const e=a(this._element),s=this._element.closest(".nav, .list-group");if(s){const e="UL"===s.nodeName||"OL"===s.nodeName?":scope > li > .active":".active";t=i.find(e,s),t=t[t.length-1]}const n=t?$.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null;if($.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==n&&n.defaultPrevented)return;this._activate(this._element,s);const o=()=>{$.trigger(t,"hidden.bs.tab",{relatedTarget:this._element}),$.trigger(this._element,"shown.bs.tab",{relatedTarget:t})};e?this._activate(e,e.parentNode,o):o()}_activate(t,e,s){const n=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?i.children(e,".active"):i.find(":scope > li > .active",e))[0],o=s&&n&&n.classList.contains("fade"),r=()=>this._transitionComplete(t,n,s);n&&o?(n.classList.remove("show"),this._queueCallback(r,t,!0)):r()}_transitionComplete(t,e,s){if(e){e.classList.remove("active");const t=i.findOne(":scope > .dropdown-menu .active",e.parentNode);t&&t.classList.remove("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}t.classList.add("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),b(t),t.classList.contains("fade")&&t.classList.add("show");let n=t.parentNode;if(n&&"LI"===n.nodeName&&(n=n.parentNode),n&&n.classList.contains("dropdown-menu")){const e=t.closest(".dropdown");e&&i.find(".dropdown-toggle",e).forEach(t=>t.classList.add("active")),t.setAttribute("aria-expanded",!0)}s&&s()}static jQueryInterface(t){return this.each((function(){const e=A.get(this,"bs.tab")||new Qt(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}$.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),p(this)||(A.get(this,"bs.tab")||new Qt(this)).show()})),w(Qt);const Xt={animation:"boolean",autohide:"boolean",delay:"number"},Yt={animation:!0,autohide:!0,delay:5e3};class Gt extends z{constructor(t,e){super(t),this._config=this._getConfig(e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get DefaultType(){return Xt}static get Default(){return Yt}static get NAME(){return"toast"}show(){$.trigger(this._element,"show.bs.toast").defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove("hide"),b(this._element),this._element.classList.add("showing"),this._queueCallback(()=>{this._element.classList.remove("showing"),this._element.classList.add("show"),$.trigger(this._element,"shown.bs.toast"),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){this._element.classList.contains("show")&&($.trigger(this._element,"hide.bs.toast").defaultPrevented||(this._element.classList.remove("show"),this._queueCallback(()=>{this._element.classList.add("hide"),$.trigger(this._element,"hidden.bs.toast")},this._element,this._config.animation)))}dispose(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),super.dispose()}_getConfig(t){return t={...Yt,...K.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}},g("toast",t,this.constructor.DefaultType),t}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const s=t.relatedTarget;this._element===s||this._element.contains(s)||this._maybeScheduleHide()}_setListeners(){$.on(this._element,"click.dismiss.bs.toast",'[data-bs-dismiss="toast"]',()=>this.hide()),$.on(this._element,"mouseover.bs.toast",t=>this._onInteraction(t,!0)),$.on(this._element,"mouseout.bs.toast",t=>this._onInteraction(t,!1)),$.on(this._element,"focusin.bs.toast",t=>this._onInteraction(t,!0)),$.on(this._element,"focusout.bs.toast",t=>this._onInteraction(t,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){let e=A.get(this,"bs.toast");if(e||(e=new Gt(this,"object"==typeof t&&t)),"string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return w(Gt),{Alert:U,Button:q,Carousel:J,Collapse:st,Dropdown:ut,Modal:At,Offcanvas:Ct,Popover:Ft,ScrollSpy:Vt,Tab:Qt,Toast:Gt,Tooltip:Bt}}));
//# sourceMappingURL=bootstrap.min.js.map

function chatsHeaderDiv()
{
    var s = getMobile() ?

    `
    <div style="min-height: 50px; background-color: #ffffff;">
        <div>
            <span style="float:left; padding:5px;">
                <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/logo.png></a> 
                <b>

                    <blah>Conversations</blah>

                </b> 
            </span>
            <span style="float:right; padding:5px;">
                <img onclick="newchat();" style="cursor: pointer" src=images/newchat.png height=30>
                <img onclick="invitation();" style="cursor: pointer" src=images/invitation.png height=30>
                <img onclick="edit();" style="cursor: pointer"src=images/edit.png height=30>
            </span>
        </div>

    </div>
    `

    :

    `
    <div style="min-height: 50px; background-color: #ffffff;">
        <div>
            <span style="float:left; padding:5px;">
                <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/logo.png></a> 
                <b>

                    <blah>Conversations</blah>

                </b> 
            </span>
            <span style="float:right; padding:5px;">
                <img onclick="newchat();" style="cursor: pointer" src=images/newchat.png height=30>
                <img onclick="invitation();" style="cursor: pointer" src=images/invitation.png height=30>
            </span>
        </div>
    </div>
    `

    ;
    return s;
}
function chatsPage()
{
	var s =
	`
    <div id=chats>
        <div style="width:100%;" id=chats-header></div>
        <div style="width:100%;" id=chats-list></div>
    </div>
   	`;
   	return s;
}function communityPage()
{
    var s = getMobile() ?


     ` not used  `

    :

    `
    <style>

        .t1
        {
            width:20%;
            background-color: #ffffff;
        }

        .t2
        {
            width:75%;
            background-color: #ffffff;
        }
        
    </style>

    <div>
        <table style="width: 100%; height: 100%;">
            <tr>
                <td style="padding:4px;" class=t1>
                    <div id=chats-header>
                    </div>
                </td>
                <td style="padding:4px;" class=t2>
                    <div id=conversation-header>
                    </div>
                </td>
            </tr>
            <tr style="height: 80%;">
                <td class=t1>
                    <div id=chats-list>
                    </div>
                </td>
                <td class=t2>
                    <div id=messages-list>
                    </div>
                </td>
            </tr>
            <tr>
                <td class=t1>
                    <div id=chats-footer>
                    </div>
                </td>
                <td class=t2>
                    <div id=conversation-footer style="width:600px; background-color: #eeeeee;">
                        <div style="float:left; padding:15px; width:500px;">
                            <textarea rows=1 placeholder="<blah>Type your message ...</blah>" id=msg></textarea>
                        </div>
                        <img src=images/send.png style="height:50px;" onclick="messageBoxSend();">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    `

    ;

    return s;
}
function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
    <div style="display: flex; justify-content: center; align-items: center; color: black; background-color: #ffffff; width: 100%;">
        <img onclick="backButton();" height=30 style="padding: 10px;float:left; cursor: pointer;" src=images/barrow.png>

        &nbsp;&nbsp;

        <img height=30 src=$$picurl$$ style="border-radius: 50%;">

        &nbsp;&nbsp;

        <div style="flex-grow: 1;">
            <b>$$name$$</b> 
            <span style="font-size: 10px;">

                <blah>active</blah>

                $$time$$
            </span>
        </div>

        <span style="float:right; padding:5px;">
            <img onclick="newchat();" style="cursor: pointer" src=images/newchat.png height=30>
            <img onclick="invitation();" style="cursor: pointer" src=images/invitation.png height=30>
            <img onclick="edit();" style="cursor: pointer"src=images/edit.png height=30>
        </span>
    </div>
    `

    :

    `
    <div style="float:left; align:center; color: black; cursor: pointer; background-color: #ffffff;">
        <div style="margin: 0 10px;">
            <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
        </div>

        <div style="font-size:12;">
            <span>
                <blah>Chatting with</blah>

                <b>$$name$$</b>
                <br>

                <blah>active</blah>

                $$time$$
            </span>
        </div>
    </div>

     <div style="float:right; align:center;">
        <img style="cursor: pointer; align:center; border-radius: 50%;  padding: 0px;" $$click$$ src=$$local$$ height=30 width=30>

        <div style="font-size:12; text-align: center; color: black;">
            $$signed in as$$ <b>$$localusername$$<b>
        </div>
    </div>
    `

    ;
    return s;
}
function conversationPage()
{
	var s =
	`
    <div id=conversation>
        <div id=conversation-header style="height: 10%;">
        </div>          
        <div id=messages-list style="overflow: auto; height: 80%;">
        </div>
        <div id=conversation-footer style="background-color: #eeeeee;">
            <div style="float:left; padding:15px;">
                <textarea rows=1 placeholder="<blah>Type your message ...</blah>" id=msg></textarea>
            </div>
            <img src=images/send.png style="height:50px;" onclick="messageBoxSend();">
        </div>
    </div>
	`;
	return s;
}function createPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">
            <div class="login-page">
                <div id=form class="form">
                    <div class="login-form">
                        <input id=username type="text" placeholder=

                            "<blah>Your username</blah>"

                        />
                        <div id=usernameerror></div>

                        <input id=email type="text" placeholder=

                            "<blah>Your email address</blah>"

                        />
                        <div id=emailerror></div>

                        <input id=p1 type="password" placeholder=

                            "<blah>Your new password</blah>"

                        />
                        <div id=p1error></div>

                        <span id=language></span>
                        <div class=smalltext id=languageerror></div>
                        <br>

                        <img src="./images/default.png" height=50 id=previewimage style="cursor:hand;" onclick="document.getElementById('chooser').style.display = 'block';">
                        
                        <div>
                            <div onclick="document.getElementById('chooser').style.display = 'block';">
                                <p>
                                    <a style="cursor:hand;">

                                        <blah>Upload a profile photo</blah>

                                    </a>
                                </p>
                            </div>
                            <div id=chooser style="display: none;">
                                <input id=file-upload type="file"/>
                            </div>
                        </div>

                        <button onclick="processAccount(true);">

                            <blah>Create account</blah>

                        </button>
                        <p class="message">

                            <blah>Already registered?</blah>

                            <a style="cursor:hand;" onclick="changePage('login');">

                                <blah>Login</blah>

                            </a>
                        </p>

                        <p class="message">

                            <blah>By creating an account, you agree to Comprendo.chat's</blah>

                            <a style="cursor:hand;" onclick="changePage('terms');">
                                
                                <u><blah>terms and conditions.</blah></u>

                            </a>
                        </p>
                    </div>
                </div>
            </div>
	`
    ;
	return s;
}




function editPage()
{
	var s =
	`
    <link rel="stylesheet" href="forms.css">

    <div class="login-page">
        <div id=form class="form">
            <div class="login-form">

                <h4 id=username size=50>&nbsp;</h4>

                <input id=email type="text"/>
                <div id=emailerror></div>

                <input id=p1 type="password" placeholder=

                    "<blah>Your new password</blah>"
                
                />
                <div id=p1error></div>

                <span id=language></span>
                <div class=smalltext id=languageerror></div>
                <br>

                <img src="./images/default.png" height=50 id=previewimage style="cursor:hand;" onclick="document.getElementById('chooser').style.display = 'block';">

                <div>
                    <div onclick="document.getElementById('chooser').style.display = 'block';">
                        <p>
                            <a style="cursor:hand;">

                                <blah>Upload a profile photo</blah>

                            </a>
                        </p>
                    </div>
                    <div id=chooser style="display: none;">
                        <input id=file-upload type="file"/>
                    </div>
                </div>

                <button onclick="processAccount(false);">

                    <blah>Update account</blah>

                </button>
                <br><br>

                <button onclick="logout();">

                    <blah>Logout</blah>

                </button>
                <br><br>

                <button onclick="cancelEdit();">

                    <blah>Cancel</blah>

                </button>
            </div>
        </div>
    </div>

    <script>

        function onclick()
        {   
            document.getElementById("form").animate({height: "toggle", opacity: "toggle"}, "slow");
        }

    </script>

	`
    ;
	return s;
}function changePassPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">

            <div class="login-page">
              <div id=form class="form">
                <div class="login-form">

                    <h4 id=username placeholder=

                        "<blah>Username</blah>" 

                    size=50>
                        &nbsp;
                    </h4>

                    <input id=p1 type="password" placeholder=

                        "<blah>your new password</blah>"
                    />

                    <div id=p1error></div>

                    <button onclick="newPassword();">

                        <blah>change password</blah>

                    </button>
                    <br><br>
               
                </div>
              </div>
            </div>
	`
    ;
	return s;
}var languages = 

[ 
"<blah>English</blah>","en",
"<blah>Español</blah>","es",
"<blah>Français</blah>","fr",
"<blah>Italiano</blah>","it",
"<blah>中文普通话</blah>","zh",
"<blah>Русский</blah>","ru",
"<blah>Afrikaans</blah>","af",
"<blah>Albanian</blah>","sq",
"<blah>Amharic</blah>","am",
"<blah>Arabic</blah>","ar",
"<blah>Armenian</blah>","hy",
"<blah>Azerbaijani</blah>","az",
"<blah>Basque</blah>","eu",
"<blah>Belarusian</blah>","be",
"<blah>Bengali</blah>","bn",
"<blah>Bosnian</blah>","bs",
"<blah>Bulgarian</blah>","bg",
"<blah>Catalan</blah>","ca",
"<blah>Cebuano</blah>","ceb",
"<blah>Chinese (Simplified)</blah>","zh",
"<blah>Chinese (Traditional)</blah>","zh-TW",
"<blah>Corsican</blah>","co",
"<blah>Croatian</blah>","hr",
"<blah>Czech</blah>","cs",
"<blah>Danish</blah>","da",
"<blah>Dutch</blah>","nl",
"<blah>English</blah>","en",
"<blah>Esperanto</blah>","eo",
"<blah>Estonian</blah>","et",
"<blah>Finnish</blah>","fi",
"<blah>French</blah>","fr",
"<blah>Frisian</blah>","fy",
"<blah>Galician</blah>","gl",
"<blah>Georgian</blah>","ka",
"<blah>German</blah>","de",
"<blah>Greek</blah>","el",
"<blah>Gujarati</blah>","gu",
"<blah>Haitian Creole</blah>","ht",
"<blah>Hausa</blah>","ha",
"<blah>Hawaiian</blah>","haw",
"<blah>Hebrew</blah>","he",
"<blah>Hindi</blah>","hi",
"<blah>Hmong</blah>","hmn",
"<blah>Hungarian</blah>","hu",
"<blah>Icelandic</blah>","is",
"<blah>Igbo</blah>","ig",
"<blah>Indonesian</blah>","id",
"<blah>Irish</blah>","ga",
"<blah>Italian</blah>","it",
"<blah>Japanese</blah>","ja",
"<blah>Javanese</blah>","jv",
"<blah>Kannada</blah>","kn",
"<blah>Kazakh</blah>","kk",
"<blah>Khmer</blah>","km",
"<blah>Kinyarwanda</blah>","rw",
"<blah>Korean</blah>","ko",
"<blah>Kurdish</blah>","ku",
"<blah>Kyrgyz</blah>","ky",
"<blah>Lao</blah>","lo",
"<blah>Latin</blah>","la",
"<blah>Latvian</blah>","lv",
"<blah>Lithuanian</blah>","lt",
"<blah>Luxembourgish</blah>","lb",
"<blah>Macedonian</blah>","mk",
"<blah>Malagasy</blah>","mg",
"<blah>Malay</blah>","ms",
"<blah>Malayalam</blah>","ml",
"<blah>Maltese</blah>","mt",
"<blah>Maori</blah>","mi",
"<blah>Marathi</blah>","mr",
"<blah>Mongolian</blah>","mn",
"<blah>Myanmar (Burmese)</blah>","my",
"<blah>Nepali</blah>","ne",
"<blah>Norwegian</blah>","no",
"<blah>Nyanja (Chichewa)</blah>","ny",
"<blah>Odia (Oriya)</blah>","or",
"<blah>Pashto</blah>","ps",
"<blah>Persian</blah>","fa",
"<blah>Polish</blah>","pl",
"<blah>Portuguese</blah>","pt",
"<blah>Punjabi</blah>","pa",
"<blah>Romanian</blah>","ro",
"<blah>Russian</blah>","ru",
"<blah>Samoan</blah>","sm",
"<blah>Scots Gaelic</blah>","gd",
"<blah>Serbian</blah>","sr",
"<blah>Sesotho</blah>","st",
"<blah>Shona</blah>","sn",
"<blah>Sindhi</blah>","sd",
"<blah>Sinhala</blah>","si",
"<blah>Slovak</blah>","sk",
"<blah>Slovenian</blah>","sl",
"<blah>Somali</blah>","so",
"<blah>Spanish</blah>","es",
"<blah>Sundanese</blah>","su",
"<blah>Swahili</blah>","sw",
"<blah>Swedish</blah>","sv",
"<blah>Tagalog</blah>","tl",
"<blah>Tajik</blah>","tg",
"<blah>Tamil</blah>","ta",
"<blah>Tatar</blah>","tt",
"<blah>Telugu</blah>","te",
"<blah>Thai</blah>","th",
"<blah>Turkish</blah>","tr",
"<blah>Turkmen</blah>","tk",
"<blah>Ukrainian</blah>","uk",
"<blah>Urdu</blah>","ur",
"<blah>Uyghur</blah>","ug",
"<blah>Uzbek</blah>","uz",
"<blah>Vietnamese</blah>","vi",
"<blah>Welsh</blah>","cy",
"<blah>Xhosa</blah>","xh",
"<blah>Yiddish</blah>","yi",
"<blah>Yoruba</blah>","yo",
"<blah>Zulu</blah>","zu"
];function loginPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder=

                "<blah>Username or email address</blah>"

              />
              <input id=password type="password" placeholder=

                "<blah>Password</blah>"

              />

              <div id=emailerror></div>
              <div id=passworderror></div>

              <button onclick="login();">

                <blah>login</blah>

              </button>

              <p class="message">

                <blah>Not registered?</blah>

              <a style="cursor:hand;" onclick="changePage('create');">

                <blah>Create an account</blah>

              </a></p>

              <p class="message">

                <blah>Forgot your password?</blah>

                <a style="cursor:hand;" onclick="changePage('reset');">

                  <blah>Reset your password</blah>

                </a>

              </p>
            </div>
          </div>
        </div>
            
    `;
    return s; 
}function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        <div style="clear:both; float:left; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px; margin: 5px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:left; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px; margin: 5px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    ;
    return s;
}
function messageDisplayedRight()
{
    var s = getMobile() ?

    `
         <div style="clear:both; float:right; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>
                
                <div style="padding: 15px; margin: 5px; border-radius: 10px; background-color: blue; color: white;">
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:right; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>
                <div style="padding: 15px; margin: 5px; border-radius: 10px; background-color: blue; color: white;">
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    ;

    return s;
}
function pageHeaderDiv()
{
    var s = 
    
    `
    <div style="padding-top: 10px; padding-right: 10px;padding-bottom: 10px;padding-left: 10px;">
        <a href=base.html><img style="float:left; cursor: pointer;" src=assets/images/malt-logo.svg height=40></a> 
        <img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=$$picurl$$ height=40>
    </div>
    `

    ;
    return s;
}function resetPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder=

                  "<blah>username or email address</blah>"

              />

                <div id=emailerror></div>

                <button onclick="reset();">

                  <blah>Reset</blah>

                </button>

              <p class="message">

                <blah>Not registered?</blah>

                <a style="cursor:hand;" onclick="changePage('create');">

                  <blah>Create an account</blah>

                </a>
              </p>

            </div>
          </div>
        </div>
            
    `;
    return s; 
}function singleChatSummary()
{
    var s = getMobile() ?

    `
   <div onclick=$$click$$ style="font-size: 12px;" class=summarybox>

        <div style="width: 80px; float: left;">
                
            <div style="position: relative; height:60px; width:60px;">
                <img style="border-radius: 50%; width: 60px; height: 60px;" src=$$picurl$$>
                <img src=images/$$color$$.png style="position: absolute; bottom: 0px; right: 0px;">
            </div>
           
        </div>
        
        <div style="flex-grow: 1;">
            <span>
                <b>$$name$$</b>
            </span>
            <br>
                $$msg$$
            <br>
            <span>
                $$time$$
            </span>
        </div> 
    
    </div>
    
    <br>
    `

    :

    `
    <div onclick=$$click$$ style="font-size: 12px;" class=summarybox>

        <div style="width: 80px; float: left;">
                
            <div style="position: relative; height:60px; width:60px;">
                <img style="border-radius: 50%; width: 60px; height: 60px;" src=$$picurl$$>
                <img src=images/$$color$$.png style="position: absolute; bottom: 0px; right: 0px;">
            </div>
           
        </div>
        
        <div style="flex-grow: 1;">
            <span>
                <b>$$name$$</b>
            </span>
            <br>
                $$msg$$
            <br>
            <span>
                $$time$$
            </span>
        </div> 
    
    </div>
    
    <br>
    `

    ;
    return s;
}
function supportPage()
{
    // should have a back button

    var s =
    `
        <div>
            <img src="assets/images/malt-logo.svg">
        </div>
        <h1><blah>Help</blah></h1>
    `;
    return s;
}function termsPage()
{
    // should have a back button

    var s =
    `
    <p style="margin-left:15%; margin-right:15%;">
	Terms and Conditions<br><br>
	Welcome to MALT.CHAT<br><br>
	February 20, 2021<br><br>
	These terms and conditions outline the rules and regulations for the use of MALT.CHAT, located at malt.chat.<br><br>
	By accessing this website we assume you accept these terms and conditions. Do not continue to use MALT.CHAT if you do not agree to take all of the terms and conditions stated on this page.<br><br>
	The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of the United States. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.<br><br>
	Cookies<br><br>
	We employ the use of cookies. By accessing MALT.CHAT, you agreed to use cookies in agreement with the MALT.CHAT's Privacy Policy.<br><br>
	Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. <br><br>
	License<br><br>
	Unless otherwise stated, MALT.CHAT and/or its licensors own the intellectual property rights for all material on MALT.CHAT. All intellectual property rights are reserved. You may access this from MALT.CHAT for your own personal use subjected to restrictions set in these terms and conditions.<br><br>
	You must not:<br><br>
	Republish material from MALT.CHAT<br><br>
	Sell, rent or sub-license material from MALT.CHAT<br><br>
	Reproduce, duplicate or copy material from MALT.CHAT<br><br>
	Redistribute content from MALT.CHAT<br><br>
	This Agreement shall begin on the date hereof.<br><br>
	This website offer an opportunity for users to exchange messages. MALT.CHAT does not filter, edit, publish or review Messages prior to their presence on the website. Messages do not reflect the views and opinions of MALT.CHAT, its agents and/or affiliates. Messages reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, MALT.CHAT shall not be liable for the Messages or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Messages on this website.<br><br>
	You warrant and represent that:<br><br>
	You are entitled to post the Messages on our website and have all necessary licenses and consents to do so;<br><br>
	The Messages do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;<br><br>
	The Messages do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy.<br>
	You are responsible for any activity that occurs under your username.<br><br>
	You are responsible for keeping your password secure.<br><br>
	You must not abuse, harass, threaten, impersonate or intimidate other MALT.CHAT users.<br><br>
	You may not use the MALT.CHAT service for any illegal or unauthorised purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.<br><br>
	You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles, links (“Content”) that you submit, post, and display on the MALT.CHAT service.<br><br>
	You must not modify, adapt or hack MALT.CHAT or modify another website so as to falsely imply that it is associated with MALT.CHAT.<br><br>
	You must not access MALT.CHATs private API by any other means other than the MALT.CHAT application itself.<br><br>
	You must not crawl, scrape, or otherwise cache any content from MALT.CHAT including but not limited to user profiles and photos.<br><br>
	You must not create or submit unwanted email or comments to any MALT.CHAT members (“Spam”).<br><br>
	You must not use web URLs in your name without prior written consent from MALT.CHAT.<br><br>
	You must not transmit any worms or viruses or any code of a destructive nature.<br><br>
	You must not, in the use of MALT.CHAT, violate any laws in your jurisdiction (including but not limited to copyright laws).<br><br>
	Violation of any of these agreements will result in the termination of your MALT.CHAT account. While MALT.CHAT prohibits such conduct and content on its site, you understand and agree that MALT.CHAT cannot be responsible for the Content posted on its web site and you nonetheless may be exposed to such materials and that you use the MALT.CHAT service at your own risk.<br><br>
	No use of MALT.CHAT's logo or other artwork will be allowed for linking absent a trademark license agreement.<br><br>
	iFrames<br><br>
	Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.<br><br>
	Content Liability<br><br>
	We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.<br><br>
	Reservation of Rights<br><br>
	We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.<br><br>
	Removal of links from our website<br><br>
	If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br><br>
	We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.<br><br>
	Disclaimer<br><br>
	To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. 
	<br><br>
	The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br><br>
	As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.<br><br>

	MALT.CHAT will not be liable to you for any modification, suspension, or discontinuation of the Messenger Services, or the loss of any Content.<br><br>

	We reserve the right to modify or terminate the Messenger service for any reason, without notice at any time.<br><br>
	We reserve the right to alter these Terms of Use at any time. We may or may not inform you about changed Terms so check back from time to time.<br><br>
	We reserve the right to refuse service to anyone for any reason at any time.<br><br>
	We reserve the right to force forfeiture of any username that becomes inactive, violates trademark, or may mislead other users.<br><br>
	We may, but have no obligation to, remove Content and accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Use.<br><br>
	We reserve the right to reclaim usernames on behalf of businesses or individuals that hold legal claim or trademark on those usernames.<br><br>
	<br><br>
	Privacy Policy
	<br><br>
	Your privacy is important to us. It is MALT.CHAT's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, https://malt.chat, and other sites we own and operate.
	<br><br>
	This policy is effective as of 20 February 2021 and was last updated on 20 February 2021.
	<br><br>
	Information We Collect
	Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.
	<br><br>
	Log Data
	When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter.
	<br><br>
	Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.
	<br><br>
	Personal Information
	We may ask for personal information which may include one or more of the following:
	<br><br>
	Email
	<br><br>
	Legitimate Reasons for Processing Your Personal Information
	We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.
	<br><br>
	Collection and Use of Information
	We may collect personal information from you when you do any of the following on our website:
	<br><br>
	Use a mobile device or web browser to access our content
	Contact us via email, social media, or on any similar technologies
	When you mention us on social media
	We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
	<br><br>
	We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
	<br><br>
	to enable you to access and use our website, associated applications, and associated social media platforms
	Please be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources.
	<br><br>
	Security of Your Personal Information
	When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use, or modification.
	<br><br>
	Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach.
	<br><br>
	You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.
	<br><br>
	How Long We Keep Your Personal Information
	We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you.
	<br><br>
	However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.
	<br><br>
	Children’s Privacy
	We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
	<br><br>
	International Transfers of Personal Information
	The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.
	<br><br>
	Your Rights and Controlling Your Personal Information
	You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.
	<br><br>
	If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.
	<br><br>
	If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity.
	<br><br>
	If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.
	<br><br>
	If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
	<br><br>
	Use of Cookies
	We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
	<br><br>
	Limits of Our Policy
	Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
	<br><br>
	Changes to This Policy
	At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.
	<br><br>
	If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.
	<br><br>
	Contact Us
	For any questions or concerns regarding your privacy, you may contact us using the following details:
	<br><br>
	Harold Squid
	<br><br>
	hxsquid@gmail.com
	<br><br>
`;
    return s;
}
function newchatModal()
{
    var s = getMobile() ?

    `
    <style>
    .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    
    xxxoverflow: auto; /* Enable scroll if needed */
    
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
    background-color: #ffffff;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 70%; /* Could be more or less, depending on screen size */
    }

    .close {
    color: #aaa;
    float: right;
    font-size: 16px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }

    </style>

	<div id="myModal" class="modal">
  
        <div class="modal-content">
          
            <div>
                <b>$$header$$</b>
            </div>
            <br>

            <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>
            <br><br>

            <div style="height:50px;">
                <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">

                    <blah>Cancel</blah>

                </button>
                <button style="padding:10px;margin:10px;" $$okclick$$ class="close">

                    <blah>OK</blah>

                </button>
            </div>
        </div>
    </div>

    `

    :


    `
    <style>
    .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
    background-color: #ffffff;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 35%; /* Could be more or less, depending on screen size */
    }

    .close {
    color: #aaa;
    float: right;
    font-size: 16px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }
    </style>

    <div id="myModal" class="modal">
        <div class="modal-content">
            <div>
                <b>$$header$$</b>
            </div>
            <br>

            <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>

            <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">

                <blah>Cancel</blah>

            </button>
            <button style="padding:10px;margin:10px;" $$okclick$$ class="close">

                <blah>OK</blah>

            </button>
        </div>
    </div>
    `

    ;
    return s;
}
    var DefaultProfilePic = "/images/default.png";
    var users = [];
    var messages = [];
    var mobile = /Mobi|Android/i.test(navigator.userAgent);
    var socket = null;

    var messageBeingTranslated;
    var imageChanged;
    var isCreating;

    var remoteUsername;

    var pageMode = 99;
    var currentToken = null;
    var CommunityPageRefreshStarted = false;

    // pageMode values
    // 0 = edit/create
    // 1 = community
    // 2 = chats
    // 3 = conversation

    var debug = false;
    var NoChangePassword = "**********";

    // readystate

    var Connecting = 0;
    var Open = 1;
    var Closing = 2;
    var Closed = 3;

    var RestartTimeout = 3000;
    var RefreshTimeout = 5000;
    var initTime = 0;
    var Secure = true;
    var DomainName = "comprendo.chat";

    // where to go up on receiving a 2 type response to a 1 type request

    var pendingHandler;
    var message2send;

    // last user list

    var lastListlen = 0;
    var languageSelected = "en";

    function localInput(t)
    {
        var text = cleanedString(t);

        messageBeingTranslated = text;

        var tolang = findRemoteUser().language;
        var fromlang = findLocalUser().language;

        if (fromlang == tolang)
            completeTranslation(text);
        else
            requestTranslation(tolang, fromlang, text);
    }

    function remoteMessage(t)
    {
        var status = (document.hidden ? 3 : 4);

        var messages = false;
        var updatePage = true;

        var obj = null;

        try
        {
            obj = JSON.parse(t);
        }
        catch (exception)
        {
            
        }

        // must have type

        if (obj == null || obj.type == null)
        {
            log("*** invalid message received: " + t);
            return;
        }
        else if (obj.type == "history")
        {
            receiveHistoryJson(obj, status);
            pageUpdate(true);
            return;
        }
        else if (obj.type == "ack")
        {
            var m = makeMessageJson(obj.messages[0]);

            // bug ****** / false
            log("receive ack for " + m.message + " local = " + m.localSender);

            m.localSender = true;
            addMessage(m, true);

            pageUpdate(true);
            return;
        }
        else if (obj.type == "message")
        {
            var m = makeMessageJson(obj.messages[0]);
            log("receive message " + m.message + " local = " + m.localSender);

            m.localSender = false;
            addMessage(m, false);

            sendAck(m.mid, status);

            pageUpdate(true);
            return;
        }
        else  if (obj.type == "users")
        {
            if (receiveUsersJson(obj, t.length))
                pageUpdate(false);

            return;
        }
        else if (obj.type == "invite")
        {
             // todo make better notification boxes

            if (obj.response == "ok")
                alert("<blah>The invitation email was sent successfully.</blah>");
            else
                alert("<blah>There was an error while trying to send the invitation email.</blah>");

            document.getElementById("search").style.visibilityState = "hidden";
            return;
        }
        else if (obj.type == "reset")
        {
            log("reset response: " + obj.response);
            
            return;
        }
        else if (obj.type == "find")
        {
            var json = obj.users;

            if (json.length == 0)
                alert("<blah>That username was not found.</blah>");
            else
            {
                var user = addOrUpdateUser(json[0]); 
                talk(user.username);
            }

            return;
        }
        else if (obj.type == "error")
        {
            logError("***************************** received logout condition: " + t);
            
            //if (parts[0].indexOf("xinvalidSigninMessage") >= 0 || 
            //    parts[0].indexOf("xuserNotFoundByToken") >= 0 ||
            //    parts[0].indexOf("xlogoutPreviousConnectionInSameConversation") >= 0)
            
            logout();

            return;
        }
        else if (obj.type == "checkusername")
        {
            var r = obj.response;
            checkusernameresponse(r);
            return;
        }
        else if (obj.type == "checkemail")
        {
            var r = obj.response;
            checkemailresponse(r);
            return;
        }
        else if (obj.type == "checklogin")
        {
            var r = obj.response;
            checkloginresponse(r);
            return;
        }
        else
        {
            log("*** invalid message received: " + t);
            return;
        }

        // escape all input
        // ...... t = t.replace("<", "V");
        


        if (updatePage)
            pageUpdate(messages);
    }

    function statusUpdate()
    {
        if (document.hidden)
            return;

        for (var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            if (message.status != 4 && !message.localSender)
            {
                message.status = 4;
                sendAck(message.mid, 4);
            }
        }
    }

    function edit()
    {
        imageChanged = false;
        changePage("edit");

        // todo not ready until server sends full local user info
    }

    function languageSelect()
    {
        var languageElement = get("languageselect");
        var n = languageElement.options[languageElement.selectedIndex].value.trim();
        //if (n != languageSelected)
        {
            languageSelected = n;
            console.log("chose language " + languageSelected);
            loadHomePage(languageSelected);
        }
    }
    
    function languagePop(rsp)
    {
        var s = "<select style='width:270px;' " + (rsp ? "onchange='languageSelect()'" : "") + " id=languageselect class=language select-css>";

        s += "<option value='' class=lng><blah>Choose your language</blah></option>";

        for (var i = 0; i < languages.length; i = i + 2)
            s += "<option value=" + languages[i + 1] + " class=lng>" + languages[i] + "</option>"

        s += "</select>";
        
        return s;
    }

    function logout()
    {
        localStorage.setItem("token", null);
        sendSignOutMessage();
        changePage("login");
    }

    function changePage(url)
    {
        log("go to " + url + " with token " + currentToken);

        if (url == "login") 
        {
            loginStart();
        }
        else if (url == "edit") 
        {
            makeBody(editPage());
            pageMode = 0;
            accountStart(false);
        }
        else if (url == "create") 
        {
            makeBody(createPage());
            pageMode = 0;  
            accountStart(true);
        }
        else if (url == "changepassword")
        {
            currentToken = getUrlVars("token");
            signin(currentToken);

            // this waits until we know the local user info

            waitForLocalUser();
        }
        else if (url == "community") 
        {
            makeBody(communityPage());
            pageMode = 1;
            remoteUsername = null;
        }
        else if (url == "chats") 
        {
            makeBody(chatsPage());
            pageMode = 2;
            remoteUsername = null;
        }
        else if (url == "conversation") 
        {
            makeBody(conversationPage());
            log("start conversation with " + remoteUsername);
            pageMode = 3;
        }
        else if (url == "support") 
        {
            makeBody(supportPage());
        }
        else if (url == "reset") 
        {
            makeBody(resetPage());
        }
        else if (url == "terms") 
        {
            makeBody(termsPage());
        }
    }

    function waitForLocalUser()
    {
        var local = findLocalUser();

        if (local == null)
        {
            setTimeout(waitForLocalUser, 50);
        }
        else
        {
            makeBody(changePassPage());
            pageMode = 0;  
            changePass();
        }
    }

    function chatsHeader()
    {
        var p = document.getElementById("chats-header");
        if (p != null)
            setInnerHTML(p, chatsHeaderDiv());
    }

    function makebox(user, msg, time, isdummy)
    {
        // make the box representing a single chat

        var box = singleChatSummary();
        
        var tsa = Date.now() - user.lastActivityTime;
        
        var color;

        if (tsa <          3 * 60 * 1000) 
            color = "green";
        else if (tsa <    15 * 60 * 1000) 
            color = "yellow";
        else
            color = "red";

        var picfile = picturefile(user);

        var click = "\"talk('" + user.username + "')\"";
        
        box = replaceAll(box, "$$color$$", color);
        box = replaceAll(box, "$$picurl$$", picfile);
        box = replaceAll(box, "$$click$$", click);

        var uname = user.username;
        if (uname.length > 7) uname = uname.substring(0, 7) + "..";

        box = replaceAll(box, "$$name$$", uname);

        if (isdummy)
        {
            box = replaceAll(box, "$$msg$$", "<blah>NEW!</blah>");
            box = replaceAll(box, "$$time$$", "");
        }
        else
        {
            box = replaceAll(box, "$$msg$$", msg);
            box = replaceAll(box, "$$time$$", time);
        }
        
        //box = replaceAll(box, "$$bkgcolor$$", bkgcolor);

        return box;
    }

    function pageUpdate(msg)
    {
        if (pageMode == 0)
        {
            //log("page update with mode 0");
        }
        else if (pageMode == 1)
        {
            log("update community");
            ChatsUpdate();

            if (remoteUsername == null)
            {
                var ru = defaultConversationUsername();
                if (ru == null)
                {
                    logError("*** cannot connect yet - no default conversation");
                }
                else
                {
                    remoteUsername = ru;

                    log("current default remoteUsername " + remoteUsername);

                    connect(currentToken, ru);
                }
            }
            else
            {
                log("current remoteUsername " + remoteUsername);
            }

            if (msg)
                ConversationUpdate();
        }
        else if (pageMode == 2)
        {
            if (debug) log("update chat only");
            ChatsUpdate();
        }
        else if (pageMode == 3)
        {
            if (debug) log("update conversation only");
            ConversationUpdate();
        }
        else
        {
            logError("*** CommunityUpdate with invalid page mode " + pageMode);
        }
    }

    function ChatsUpdate()
    {
        var luser = findLocalUser();

        if (luser.username == "support1")
        {
            ChatsUpdate1();
            return;
        }

        var t = "";

        var gu = sortedUsersExceptLocal();

        log("ChatsUpdate with " + gu.length + " users");

        for (var i = 0; i < gu.length; ++i)
        {
            var u = gu[i];
 
            if (u.lastMessage == "null")
            {
                t += makebox(u, "", "", false);
            }
            else
            {
                var ts = "(" + timeDisplayStringFromUnixTime(u.lastMessageId.substring(0, u.lastMessageId.length - 10)) +")";

                // todo might need to use translation !!!!!!!!!!!!!!!!!!!!!

                var unread = false;

                if (findLocalUser().username != u.lastMessageSender)
                    if (u.lastStatus != "4")
                    {
                        log("unread message: " + u.lastMessage + " status " + u.lastStatus + " from " + u.lastMessageSender);
                        unread = true;
                    }

                var b1 = unread ? "<b><i>" : "";
                var b2 = unread ? "</b></i>" : "";

                var lm = u.lastMessage;
                if (lm.length > 18)
                    lm = lm.substring(0, 18) + "..";

                var m = b1 + u.lastMessageSender + ": " + lm + b2;

                t += makebox(u, m, ts, u.lastMessage == "dummy");
            }
        }

        setInnerHTML(document.getElementById("chats-list"), t);

        chatsHeader();
    }

    function ConversationUpdate()
    {
        log("ConversationUpdate ...");

        var ru = findRemoteUser();

        if (ru == null)
        {
            logError("*** cannot make conversation header with null user");
        }
        else
        {
            var luser = findLocalUser();

            if (!getMobile())
                log("make conversation header for " + luser.username + " with local pic " + getLocalPic());

            var div = conversationHeaderDiv();


            div = replaceAll(div, "$$picurl$$", picturefile(ru));
            div = replaceAll(div, "$$local$$", getLocalPic());

            div = replaceAll(div, "$$localusername$$", luser.username);

            div = replaceAll(div, "$$name$$", ru.username);
            div = replaceAll(div, "$$time$$", tds(ru.lastActivityTime));

            div = replaceAll(div, "$$click$$", "onclick=\"edit();\"");

            var p = document.getElementById("conversation-header");

            if (p != null)
                setInnerHTML(p, div);
        }

        var s = "";

        for (var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            var time = timeString(message);

            if (message.localSender)
                s += rmsg(message.message, message.translation, message.status, getLocalPic(), time);
            else
                s += lmsg(message.translation, message.message, message.status, getRemotePic(), time);
        }

        var ml = document.getElementById("messages-list");

        setInnerHTML(ml, s);

        ml.scrollTop = ml.scrollHeight;
    }

    function talk(p)
    {
        log("begin conversation with " + p);

        remoteUsername = p;

        connect(currentToken, p);

        if (mobile)
            changePage("conversation");
    }

    function defaultConversationUsername()
    {
        var gu = sortedUsersExceptLocal();

        if (debug) log("defaultConversationUsername, "  + gu.length + " users")

        if (gu.length > 0)
        {
            if (debug) log("defaultConversationUsername " + gu[0].username);
            return gu[0].username;
        }
        else
        {
            logError("*** defaultConversationUsername, there are no users with whom to start conversation");
            return null;
        }
    }

    function CommunityPageRefresh()
    {
        log("refresh " + pageMode);
        
        if (pageMode >= 1 && pageMode <= 3)
            sendRefreshRequest();
    }

    // put on left side
    function lmsg(msg, translation, status, pic, time)
    {
        var m = messageDisplayedLeft();

        m = replaceAll(m, "$$pic$$", pic);
        m = replaceAll(m, "$$time$$", time);

        m = replaceAll(m, "$$msg$$", msg);
        m = replaceAll(m, "$$translation$$", translation);

        return m;
    }

    // put on right side
    function rmsg(msg, translation, status, pic, time)
    {
        var statusMessage =                 "<blah>sent</blah>";
        if (status == 3) statusMessage =    "<blah>delivered</blah>";
        if (status == 4) statusMessage =    "<blah>message was read</blah>";
        
        var m = messageDisplayedRight();

        m = replaceAll(m, "$$pic$$", pic);
        //m = replaceAll(m, "$$status$$", statusMessage);
        m = replaceAll(m, "$$time$$", time + ", " + statusMessage);

        m = replaceAll(m, "$$msg$$", msg);
        m = replaceAll(m, "$$translation$$", translation);

        return m;
    }

    function messageBoxSend()
    {
        var textarea = document.getElementById("msg");

        localInput(textarea.value);
        ConversationUpdate();
        textarea.value = "";
    }

    /*
    function chatSettings()
    {
        alert("not available yet");
    }
    */
   
    function backButton()
    {
        changePage(getCommunityStartPage());
        ChatsUpdate();
        //sendRefreshRequest();
    }

    function createduser(r)
    {
        currentToken = r.responseText;
        
        signin(currentToken);
        changePage(getCommunityStartPage());
    }

    function editeduser(r)
    {
        currentToken = r.responseText;

        sendSignOutMessage();
        signin(currentToken);

        sendRefreshRequest();
        changePage(getCommunityStartPage());
    }

    function cancelEdit()
    {
        lastListlen = 0;
        changePage(getCommunityStartPage());
        sendRefreshRequest();
    }

    function getCommunityStartPage()
    {
        if (mobile)
            return "chats";
        else
            return "community";
    }

    function checkboxclicked()
    {
        var pcheck = true;
        if (document.getElementById("pcheck") != null)
            pcheck = document.getElementById("pcheck").checked;
        document.getElementById("p1").disabled = !pcheck;
        log("checkbox enabled = " + !pcheck);
    }

    function keyUpHandler(event) 
    {
        var field = event.target;

        if (field.id != "msg") return;

        var value = htmlEncode(field.value);

        if (event.code == 'Enter')
        {
            field.value = "";
            field.blur();
        }

        field.style.height = 'inherit';
        var fieldheight = getFieldHeight(field);
        field.style.height = fieldheight + 'px';

        var footer = document.getElementById("conversation-footer");

        footer.style.height = 'inherit';
        var footerheight = getFieldHeight(footer);

        ////////////////////////////////
        // this ia a bug fix for iphone

        footerheight = fieldheight + 30;

        ////////////////////////////////

        footer.style.height = footerheight + 'px';

        log("field: " + fieldheight + " footer: " + footerheight);

        if (event.code == 'Enter')
        {
            localInput(value);
            ConversationUpdate();
        }
    }

    function showString(s)
    {
        log(s);
        var t = "";
        for (var i = 0; i < s.length; ++i) t += s.charCodeAt(i) + "-";
        log(t);
    }

    function htmlEncode(s)
    {
        // remove cr/lf

        var t = "";
        for (var i = 0; i < s.length; ++i) 
            if (s.charCodeAt(i) != 10 && s.charCodeAt(i) != 13) t += s[i];

        s = t;

        s = s.replace("&", "&amp;");
        s = s.replace(">", "&gt;");
        s = s.replace("<", "&lt;");

        s = s.replace("\`", "&#96;");
        s = s.replace("\"", "&quot;");
        s = s.replace("\'", "&apos;");
        
        return s;
    }
    
    function getFieldHeight(field)
    {
        var computed = window.getComputedStyle(field);

        var height = 

            parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        //log("clientheight: " + field.getBoundingClientRect().height);

        return height;
    }

    /// new stuff


    function ChatsUpdate1()
    {
        var t = "<table style='width:100%'>";

        var gu = sortedUsersExceptLocal();

        log("ChatsUpdate1 with " + gu.length + " users");

        var Cols = 3;

        for (var i = 0; i < gu.length; ++i)
        {
            if ((i % Cols) == 0)
                t += "<tr>";

            var u = gu[i];
 
             /*
            if (u.lastMessage == "null")
            {
                //t += makebox(u, "", "", false);
            }
            else
            {
               
                var ts = "(" + timeDisplayStringFromUnixTime(u.lastMessageId.substring(0, u.lastMessageId.length - 10)) +")";

                // todo might need to use translation !!!!!!!!!!!!!!!!!!!!!

                var unread = false;

                if (findLocalUser().username != u.lastMessageSender)
                    if (u.lastStatus != "4")
                    {
                        log("unread message: " + u.lastMessage + " status " + u.lastStatus + " from " + u.lastMessageSender);
                        unread = true;
                    }

                var b1 = unread ? "<b><i>" : "";
                var b2 = unread ? "</b></i>" : "";

                var lm = u.lastMessage;
                if (lm.length > 18)
                    lm = lm.substring(0, 18) + "..";

                var m = b1 + u.lastMessageSender + ": " + lm + b2;

                t += makebox(u, m, ts, u.lastMessage == "dummy");
                
            }
            */

            t += "<td style='width:30%; overflow:hidden;'>";


            var un = u.username;
            if (un.length > 10) un = un.substring(0, 10) + "..";


            var picfile = picturefile(u);
            t += 

                un + 
                "<br>" +
                "<img height=50 src=" + 
                    picfile +
                ">" +
                "<br>";





            t += "</td>";

            if ((i % Cols) == 2)
                t += "</tr>";
        }

        t += "</table>";

        setInnerHTML(document.getElementById("chats-list"), t);

        chatsHeader();
    }

    function makeBody(c)
    {
        c = convertText(c);
        var body = document.getElementsByTagName("BODY")[0];
        body.innerHTML = c;
    }

    function setInnerHTML(e, c)
    {
        c = convertText(c);
        e.innerHTML = c;
    }

    function convertText(c)
    {
        while (true)
        {
            var k = c.indexOf("$$", k);
            // if no more $$----$$ then return
            if (k < 0)
                break;
            var l = c.indexOf("$$", k + 1);
            if (l < 0)
            {
                log("no matching $$ " + c);
                break;
            }
            var z = c.substring(k + 2, l).toUpperCase();
            c = c.substring(0, k) + z + c.substring(l + 2, c.length);
        }
        return c;
    }

    ////////////////////////////////////////////////////////////////////

    function run()
    {
        console.log("start/run");
        initWebSocket();
    }



    function login()
    {
        var email = get("email").value.trim();
        var password = get("password").value.trim();

        // if errors back to same page
        
        var stop = false;

        if (debug) log("login " + email + ", " + password);

        if (email == null || email == (""))
        {
            stop = true;
            get("emailerror").innerText = 

                "<blah>please enter your username or email address</blah>"

            ;
        } 
        else if (password== null || password == (""))
        {
            stop = true;
            get("passworderror").innerText = 

                "<blah>please enter your password</blah>"

            ;
        }

        if (stop)
            return;

        sendCheckRequest(
            { 
                type: "checklogin", 
                emailorusername: email, 
                password: password 
            });

        pendingHandler = checkloginresponse;
    }

    function checkloginresponse(r)
    {
        var email = get("email").value.trim();
        var password = get("password").value.trim();

        // invaliduser / invalidpassword / token

        log("checkloginresponse: " +  r);

        var token = r;

        currentToken = token;

        if (token.startsWith("invalid"))
        {
            inputError("emailerror", 

                "<blah>Sorry, that email / username and password aren't correct</blah>"

            );
            return;
        }

        localStorage.setItem("token", token);
        
        signin(currentToken);
        changePage(getCommunityStartPage());
    }

    function loginStart()
    {
        pageMode = 99;

        var token = localStorage.getItem("token");

        // if token is invalid then the return message will be invalidSignIn or 
        // similar ... receiving that message will trigger the app to return to login

        if (token != null && token != "null" && token != "")
        {
            currentToken = token;

            signin(currentToken);
            changePage(getCommunityStartPage());

            return;
        }

        makeBody(loginPage());

        get("email").addEventListener("onfocus", function(){ allclear(); });
        get("password").addEventListener("onfocus", function(){ allclear(); });
    }

    function processAccountCreate()
    {
        processAccount(true);
    }

    function processAccountEdit()
    {
        processAccount(false);
    }

    function processAccount(creating)
    {
        var pcheck = true;

        isCreating = creating;

        var username = null;

        if (get("username").value != null)
            username = get("username").value.trim();

        var email = get("email").value.trim();
        var password1 = get("p1").value.trim();

        if (!creating)
            if (password1 == "")
                password1 = NoChangePassword; 

        log("password value is [" + password1 + "]");

        var language = null;
        var languageElement = get("languageselect");

        if (languageElement != null)
        {
            var k = languageElement.selectedIndex;
            
            //log("language index " + k);

            language = languageElement.options[k].value
            if (languageElement.selectedIndex == 0)
                language = null;
        }

        // if errors back to same page

        var stop = false;

        if (creating && (username == null || username == ("") || username.length < 3))
        {
            stop = true;
            inputError("usernameerror", 

                "<blah>username should have at least 3 characters</blah>"

            );
        } 
        else if (creating && (username.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("usernameerror", 

                "<blah>username cannot contain space characters</blah>"

            );
        } 
        else if (email.indexOf("@") < 0 || email.indexOf(" ") >= 0)
        {
            stop = true;
            inputError("emailerror", 

                "<blah>please enter a valid email address</blah>"

            );
        } 
        else if (pcheck && (password1 == null || password1 == ("") || password1.length < 8 || password1.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("p1error", 

                "<blah>password should have at least 8 characters</blah>"

            );
        } 
        else if (language == null || language == ("") || language.length < 2)
        {
            stop = true;
            inputError("languageerror", 

                "<blah>please choose a language</blah>"

            );
        }

        if (stop)
            return;

        if (creating)
        {
            sendCheckRequest(
                { 
                    type: "checkusername", 
                    username: username 
                });

            pendingHandler = checkusernameresponse;
        }
        else 
        {
            var local = findLocalUser();

            if (local == null) 
            {
                if (debug) log("local user is " + local);
                return;
            }

            if (debug) log("local username=" + local.username + " picture file=" + picturefile(local) + " local=" + local);

            if (email != local.email)
            {
                sendCheckRequest(
                    {
                        type: "checkemail", 
                        email: email 
                    });

                pendingHandler = checkemailresponse;
            }
            else
            {
                continueUpload();
            }
        }
    }

    function checkusernameresponse(r)
    {
        log("checkusername response " + r);

        if (r == "dup")
        {
            inputError("usernameerror", 

                "<blah>that username is already taken, please choose another</blah>"

            );
            return;
        }

        var email = get("email").value.trim();
        sendCheckRequest(
            {
                type: "checkemail", 
                email: email 
            });

        pendingHandler = checkemailresponse;
    }

    function checkemailresponse(r)
    {
        log("checkemail response " + r); 

        if (r == "dup")
        {
            inputError("emailerror", 

                "<blah>that email already has an account, please choose another</blah>"

            );
            return;
        }

        continueUpload();
    }

    function continueUpload()
    {
        var username;

        if (get("username").value != null && get("username").value != "")
            username = get("username").value.trim();
        else
            username = get("username").innerText;

        log("continueUpload for " + username + " username tag = " + get("username").tagName + " creating = " + isCreating);

        var email =     get("email").value.trim();
        var password1 = get("p1").value.trim();

        var language = "en";
        var languageElement = get("languageselect");
        language = languageElement.options[languageElement.selectedIndex].value.trim();
        
        var imageSrc = get("previewimage").src;

        // ??? todo how is this working

        if (get("username").tagName == "H4")
        {
            log("password value is [" + password1 + "]");

            if (password1 == "")
                password1 = NoChangePassword; 

            log("password value is [" + password1 + "]");
        }

        // logic for changed picture

        var picurl2send = "0";
        
        if (isCreating)
        {
            if (imageChanged)
                picurl2send = "1";
        }
        else
        {
             var local = findLocalUser();

            if (local == null)
            {
                log("!!!!!!!! cannot get current picurl -- no local user");
                if (imageChanged)
                    picurl2send = "1";
            }
            else
            {
                var lp = local.picurl;
        
                if (imageChanged)
                {
                    if (lp == "0")
                        picurl2send = "1";
                    else if (lp == "1")
                        picurl2send = "2";
                    else if (lp == "2")
                        picurl2send = "1";
                }
                else
                    picurl2send = lp;
            }
        }

        var userdata = ["username", username, "email", email, "password", password1, "language", language, "picurl", picurl2send];

        log(userdata);

        var v = getUrlVars("invite");

        log("invite is " + v);

        if (v != null && v != "")
        {
            userdata.push("invite");
            userdata.push(v);
        }

        log(userdata);

        if (isCreating)
            upload(userdata, createduser, imageSrc, null);
        else
            upload(userdata, editeduser, imageSrc, currentToken);
    }

    function accountStart(creating)
    {
        log("create/edit with token " + currentToken);

        var username =  get("username");
        var email =     get("email");

        var password1 = get("p1");
        var languageElement = get("language");
        
        var fileupload = document.getElementById("file-upload");
        
        if (fileupload != null)
        {
            fileupload.addEventListener("change", function () 
            {
                changeImage(this);
            });
        }

        setInnerHTML(languageElement, languagePop(false));

        pageMode = 99;

        if (!creating)
         {
            pageMode = 0; 

            var local = findLocalUser();

            if (local == null)
            {
                log("cannot edit -- no local user");
                return;
            }

            log("Edit update ... render the page header for " + local.username + " picture file = " + picturefile(local));

            var languageElement = get("language");

            get("username").innerText = local.username;
            get("email").value = local.email;
            get("previewimage").src = picturefile(local);

            var e = document.getElementById("languageselect");
            for (var i = 0; i < e.options.length; i++) 
            {
               if (e.options[i].value == local.language) 
               {
                    e.options[i].selected = true;
                    break;
               }
            }
        }
    }

    function upload(userdata, callback, imageSrc, token)
    {
        var formData = new FormData();
        
        if (imageChanged)
        {
            formData.append("image", imageSrc);
        }

        for (var i = 0; i < userdata.length; i = i + 2)
        {
            formData.append(userdata[i], userdata[i + 1]);
            if (debug) log(userdata[i] + "=" + userdata[i + 1]);
        }

        var ajax = new XMLHttpRequest();

        if (token == null)
        {
            ajax.open("POST", serverRequest("/createuser"));
        }
        else
        {
            var params = "token=" + token;
            var encodedMessage = encodeURI(params);
            var page = serverRequest("/edituser?") + encodedMessage;

            if (debug) log("upload to " + page);

            ajax.open("POST", page);
        }
        
        ajax.onload = function (e)
        {
            callback(ajax);
        }

        ajax.onreadystatechange = function(e) 
        {
            if (ajax.readyState === 4) 
            {
                if (debug) 
                    if (ajax.status === 200) 
                        log("post request successful");
                    else
                        log("post request error: " + ajax.status);
            }
        }

        // ajax.upload.onprogress = function (e) {};

        ajax.send(formData);

        log("uploaded data");
    }

    function inputError(n, t)
    {
        var f = ["usernameerror", "emailerror", "p1error", "p2error", "languageerror"];
        for (var i = 0; i < f.length; ++i)
            if (get(f[i]) != null)
                    get(f[i]).innerText = "";
        log("inputerror set " + n + " with " + t);
        if (get(n) != null)
            get(n).innerText = t;
    }

    function allclear()
    {
        log("clear");
        clear("usernameerror");
        clear("emailerror");
        clear("p1error");
        //clear("p1error");
        //clear("p2error");
        clear("languageerror");
    }

    function changeImage(input)
    {
        var reader;
        imageChanged = true;

        if (debug) log("image changed");

        if (input.files && input.files[0]) 
        {
            reader = new FileReader();

            reader.onload = 
                function (e) 
                {
                    get("previewimage").setAttribute("src", e.target.result);
                }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function reset()
    {
        var email = get("email").value.trim();
        sendResetRequest(email);
        changePage("login");
    }

    function changePass()
    {
        log("change password with token " + currentToken);

        pageMode = 0; 

        var local = findLocalUser();

        if (local == null)
        {
            log("cannot change password -- no local user");
            return;
        }

        var username =  get("username");
        get("username").innerText = local.username;

        pageMode = 99;
    }

    function newPassword()
    {
        var p = get("p1").value.trim();
        log("new password " + p);

        changePassword(p);
        logout();
        loadHomePage(languageSelected);
    }

    function loadHomePage(l)
    {
        window.location.href = Protocol() + Domain() + "/index.html?language=" + l;
    }

    function makeUser(json)
    {
        var user = {};

        user.picurl =                       json.picurl;
        user.username =                     json.username
        user.lastActivityTime =             parseInt(json.lastActivityTime);
        user.language =                     json.language;
        user.remote =                       json.remote == "true";
        user.local =                        json.local == "true";
        user.lastMessage =                  json.lastMessage;
        user.lastTranslation =              json.lastTranslation;
        user.lastMessageId =                json.lastMessageId;
        user.lastStatus =                   json.lastStatus;
        user.lastMessageSender =            json.lastMessageSender;  
        user.email =                        json.email;

        return user;
    }

    function allUsers()
    {
        for (var i = 0; i < users.length; ++i) displayUserInfo(users[i]);
    }

    function displayUserInfo(user)
    {
        log("----- user info:");
        log("picurl:                            " + user.picurl);
        log("username:                          " + user.username);
        log("lastActivityTime:                  " + user.lastActivityTime);
        log("language:                          " + user.language);
        log("is this remote user:               " + user.remote);
        log("is this local user:                " + user.local);
        log("lastMessage:                       " + user.lastMessage);
        log("lastTranslation:                   " + user.lastTranslation);
        log("lastMessageId:                     " + user.lastMessageId);
        log("lastStatus:                        " + user.lastStatus);
        log("lastMessageSender:                 " + user.lastMessageSender);
        log("email:                             " + user.email);
        log("-----")
    }

    function picturefile(user)
    {
        if (user.picurl == "1")
            return imageRequest("/images/" + user.username + ".png"); 
        else if (user.picurl == "2")
            return imageRequest("/images/" + user.username + "2.png"); 
        else
            return defaultPic();

    }

    function defaultPic()
    {
        return imageRequest(DefaultProfilePic);
    }

    //function picturepath(username)
    //{
    //    return imageRequest("/images/" + username + ".png"); 
    //}

    function addOrUpdateUser(json)
    {
        var newuser = makeUser(json);
        
        //displayUserInfo(newuser);

        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.username == newuser.username)
            {
                users.splice(i, 1, newuser);
                //log("updated user: " + newuser.username);
                return newuser;
            }
        }

        users.push(newuser);
        //log("added user: " + newuser.username);
        return newuser;
    }

    function receiveUsersJson(json, len)
    {
        var updatePage = false;

        // todo  ---------------- also for F need to get the user returned
         
        if (lastListlen != len)
            updatePage = true;
        else if (Math.random() < 0.1)
            updatePage = true;

        // try updating on every refresh

        updatePage = true;
            
        lastListlen = len;

        json = json.users;

        for (var i = 0; i < json.length; ++i)
            addOrUpdateUser(json[i]); 

        if (debug)
        {
            log("--------------------------------------------");
            allUsers();
            log("--------------------------------------------");
        }

        log("received " + json.length + " users");

        return updatePage;
    }

    function findLocalUser()
    {
        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.local)
                return u;
        }
        return null;
    }

    function findRemoteUser()
    {
        if (debug) log("find remote user with id " + remoteUsername);

        if (debug) log("---all users");
        if (debug) for (var i = 0; i < users.length; ++i) log(i + " " + users[i].username + " is remote = " + users[i].remote);
        if (debug) log("---end users");

        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.username == remoteUsername)
            {
                if (debug) log("findremoteuser returns");
                if (debug) displayUserInfo(u);
                return u;
            }
        }

        if (debug) log("findremoteuser returns null");
        return null;
    }

    function getLocalPic()
    {
        if (findLocalUser() != null)
            return picturefile(findLocalUser());
        else
            return defaultPic();
    }

    function getRemotePic()
    {
        if (findRemoteUser() != null)
            return picturefile(findRemoteUser());
        else
            return defaultPic();
    }

    function sortedUsersExceptLocal()
    {
        var gu = [];
        
        for (var i = 0; i < users.length; ++i) 
            if (!users[i].local)
                gu.push(users[i]);

        var k = 0;

        while (true)
        {
            // find latest

            var max = 0;
            var index = -1;

            for (var i = k; i < gu.length; ++i)
            {
                var time;

                if (gu[i].lastMessage != "null")
                    time = parseInt(gu[i].lastMessageId.substring(0, gu[i].lastMessageId.length - 10));
                else
                    time = 2000000000;

                if (time > max || index < 0)
                {
                    max = time;
                    index = i;
                }
            }

            if (index < 0)
                break;

            if (index != k)
            {
                var h = gu[index];
                gu[index] = gu[k];
                gu[k] = h;
            }
            
            k++;
        }

        return gu;
    }
    
    function onopen(event)
    {
        log("websocket opened");
        whenOpened();
    }

    function onerror(error)
    {
        var s = "null socket";

        if (socket != null)
            s = readyString();

        log("socket error: " + error + ", " + s);

        // todo we should restart everything
    }

    function onclose(event)
    {
        var s = "null socket";

        if (socket != null)
            s = readyString();

        log("websocket connection closed, code = " + event.code + ", reason = " + event.reason + ", " + s + ", wait the restart timeout ...");
    }

    function onmessage(event)
    {
        log("\n--- new message");
        log("Message received: " +  truncate(event.data, 30));
        remoteMessage(event.data);
    }

    function initWebSocket()
    {
        var waitTime = new Date().getTime() - initTime;

        if (socket == null)
        {
            log("initWebSocket - socket is null");
            iws();
        }
        else if (socket.readyState == Closed)
        {
            log("initWebSocket - socket is Closed -- restart");
            iws();
        }
        else if (socket.readyState == Open)
        {
            //log("initWebSocket - " + readyString());
        }
        else if (socket.readyState == Connecting || socket.readyState == Closing)
        {
            if (waitTime > RestartTimeout)
            {
                // close then wait

                log("initWebSocket - timeout exceeded -  closing");
                socket.close();
                initTime = new Date().getTime();
            }
            else
            {
                log("initWebSocket - already " + readyString() + " ... waiting " + waitTime);
            }
        }

        setTimeout(initWebSocket, RestartTimeout / 10);
    }

    function iws()
    {
        log("------------------ beging iws- " + readyString());
        initTime = new Date().getTime();

        var ep = WebSocketProtocol() + Domain() + ":8887/";

        socket = new WebSocket(ep);

        log("initWebSocket - created new websocket, " + readyString());

        socket.onopen = onopen;
        socket.onclose = onclose;
        socket.onerror = onerror;

        socket.onmessage = onmessage;
    }
    
    function connect(currentToken, ru)
    {
        messages = [];
        users = [];
        lastListlen = 0;
        
        sendConnectMessage(currentToken, ru);
    }

    function sendConnectMessage(token, username)
    {
        if (username == null || username == "undefined") 
        {
            logError("*** trying to send connect message with null user");
            return;
        }

        //var msg = "C" + separator + token + separator + u;

        var m = JSON.stringify(
            {
                type: "connect",
                token: token,
                username: username
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

    function signin(currentToken)
    {
        messages = [];
        users = [];
        sendSignInMessage(currentToken);
    }

    function sendSignInMessage(token)
    {
        var m = JSON.stringify(
            {
                type: "signin",
                token: token,
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

    // if closed and reopened this must be changed

    function whenOpened()
    {
        if (!CommunityPageRefreshStarted) setInterval(CommunityPageRefresh, RefreshTimeout);
        CommunityPageRefreshStarted = true;

        document.addEventListener("visibilitychange", 
            function() 
            {
                statusUpdate();
            });

        document.addEventListener('keyup', keyUpHandler);

         if (getUrlVars("a") == "create")
            changePage("create");
        else if (getUrlVars("a") == "reset")
            changePage("changepassword");
        else
            changePage("login");
    }

    function socketsend(msg)
    {
        message2send = msg;
        socketsender();
    }

    function socketsender()
    {
        if (socket == null)
        {
            logError("*** cannot send - socket is null");
            return;
        }
        else if (socket.readyState != Open)
        {
            setTimeout(socketsender, 50);
            if (debug) log("wait till socket open");
            return;
        }

        socket.send(message2send);

        log("*** msg sent via websocket: " + message2send);
    }

    function makeMessageJson(json)
    {
        var m = {};

        m.mid =                 json.mid;
        m.message =             json.message;
        m.translation =         json.translation;
        m.localSender =         json.localSender == "true";
        m.status =              parseInt(json.status);

        log("make message: " + m.mid + ", " + m.message + ", " + m.translation + ", " + m.localSender + ", " + m.status);

        return m;
    }
    
    function makeMessage(id, msg, tr, lg, s)
    {
        var m = {};

        m.mid = id;
        m.message = msg;
        m.translation = tr;
        m.localSender = lg;
        m.status = parseInt(s);

        return m;
    }
    
    function addMessage(msg, mustExist)
    {
        var replaced = false;

        for (var i = 0; i < messages.length; ++i)
        {
            if (messages[i].mid == msg.mid)
            {
                messages.splice(i, 1, msg);
                replaced = true;
                break;
            }
        }

        if (!replaced)
        {
            if (mustExist)
            {
                logError("*** cannot find message: " + msg);
                return;
            }

            messages.push(msg);
            if (debug) log("Added message: " + msg.mid + " " + msg.message + " " + msg.status);
        }
    }
    
    function receiveHistoryJson(json, status)
    {
        json = json.messages;

        for (var i = 0; i < json.length; ++i)
        {
            if (json[i].mid != "0")
            {
                var m = makeMessageJson(json[i], false);
                addMessage(m);

                if (!m.localSender && m.status != 4 && status == 4)
                    sendAck(m.mid, status);
            }
        }
    }

    function requestTranslation(tolang, fromlang, text) //, callback)
    {
        var base = "https://translation.googleapis.com/language/translate/v2?";
        var params = "target=" + tolang + "&source=" + fromlang + 
        "&key=" + "AIzaSyC3" +
                "1GV2BJqC" +
                "IoXCM6Nj" +
                "OtLohY-l" +
                "WV1bQ3Q" + "=&q=" + text; // key 

        pageRequest(base, params, recieveTranslation);

        // todo set a timeout in case the translation doesnt return
    }

    function parseTranslationResponse(r)
    {
        var search = "\"translatedText\": \"";
        var k = r.indexOf(search);

        if (k >= 0)
        {
            r = r.substring(k + search.length);
            k = r.indexOf("\"");
            if (k > 0)
            {
                return r.substring(0, k);
            }
        }

        return null;
    }

    function recieveTranslation(r)
    {
        var translateResponse = r.responseText;

        if (debug) log("received translation response " + translateResponse);

        var translation;
        if (translateResponse == null)
        {
            translation = "-unknown response from translator-";
        } 
        else
        {
            // now pull out the translated text

            translation = parseTranslationResponse(translateResponse);
            if (translation == null)
                translation = "-unknown response from translator-";
        }

        completeTranslation(translation);
    }
    
    function pageRequest(url, params, processfunction)
    {
        var encodedMessage = encodeURI(params);
        url = url + encodedMessage;

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send(null);

        log("page request for " + url);

        request.onload =
        function (e)
        {
            processfunction(request);
        }
    }

    function completeTranslation(translation)
    {
        var mid = id();

        var m = JSON.stringify(
            {
                type: "message",
                message: messageBeingTranslated,
                translation: translation,
                mid: mid
            });

        var status;
        try
        {
            socketsend(m);
            status = 1;
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message);
            status = -1;
        }

        var msg = makeMessage(mid, messageBeingTranslated, translation, true, status);
                
        addMessage(msg, false);

        pageUpdate(true);
    }



    function sendCheckRequest(obj)
    {
        var m = JSON.stringify(obj);

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending request to server: " + err.message);
        }
    }

    function sendRefreshRequest()
    {
        var m = JSON.stringify(
            {
                type: "refresh"
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending refresh request to server: " + err.message);
        }
    }

    function sendResetRequest(email)
    {
        var m = JSON.stringify(
            {
                type: "reset",
                email: email
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending reset request to server: " + err.message);
        }
    }

    function changePassword(newpassword)
    {
        var m = JSON.stringify(
            {
                type: "changepassword",
                token: currentToken,
                password: newpassword
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending changepassword request to server: " + err.message);
        }
    }

    function searchUsers(token, username)
    {
        //var m = "F" + separator + t + separator + s;

        var m = JSON.stringify(
            {
                type: "find",
                token: token,
                username: username
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending search request to server: " + err.message);
        }
    }

    function inviteUser(email)
    {
        //var m = "I" + separator + email + separator;

        var m = JSON.stringify(
            {
                type: "invite",
                email: email,
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending invite request to server: " + err.message);
        }
    }

    function setLanguage(lan)
    {
        //var m = "I" + separator + email + separator;

        var m = JSON.stringify(
            {
                type: "language",
                language: lan,
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending language to server: " + err.message);
        }
    }

    function sendSignOutMessage()
    {
        //var msg = "s" + separator;

        var m = JSON.stringify(
            {
                type: "signout",
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

     function sendAck(mid, status)
    {
        //var m = "A" + separator + id + separator + status;

        var m = JSON.stringify(
            {
                type: "ack",
                status: status + "",
                mid: mid
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending ack to server: " + err.message);
        }
    }

    function getMobile()
    {
        return mobile;
    }

    function readyString()
    {
        if (socket == null) return "Socket null";
        var n = socket.readyState
        var s = "readyState = ";
        if (n == 0) return s + "Connecting";
        if (n == 1) return s + "Open";
        if (n == 2) return s + "Closing";
        if (n == 3) return s + "Closed";
        return "readyState unknown";
    }

    function serverRequest(s)
    {
        return Protocol() + Domain() + s;
    }

    function imageRequest(s)
    {
        return Protocol() + Domain() + s;
    }

    function htmlRequest(s)
    {
        return "." + s;
    }

    function Protocol() 
    { 
        if (Secure)
            return "https://"; 
        else
            return "http://"; 
    }

    function Domain() 
    { 
        return DomainName;
    }

    function WebSocketProtocol()
    {
        if (Secure)
            return "wss://";
        else
            return "ws://";
    }

    function getUrlVars(s)
    {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        if (vars[s] != null)
          return decodeURI(vars[s]);
        else
          return null;
    }

    function id()
    {
        var d = new Date();
        var n = d.getTime();

        n = n + "";
        for (var i = 0; i < 10; ++i)
            n += Math.floor(Math.random() * 10) + "";

        return n;
    }


    function log(s)
    {
        var d = new Date();
        console.log(d + ": " + s);
    }

    function get(s)
    {
        return document.getElementById(s);
    }

    function clear(n)
    {
        get(n).innerText = "";
    }

    function timeDisplayStringFromUnixTime(t)
    {
        var time = parseInt(t);
        return tds(time);
    }

    function tds(time)
    {
        time = Date.now() - time;
        time = time / 1000;

        if (time < 1)
        {
            return "just now";
        }

        var timelens = [60, 60, 24, 30];

        for (var i = 0; i < timelens.length; ++i)
        {
            if (time < timelens[i])
                return maketimestring(i, time);
            time = time / timelens[i];
        }

        return maketimestring(i, timelens.length);


        /*
        if (time < 60)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "second" + end;
        }
        time = time / 60;

        if (time < 60)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "minute" + end;
        }
        time = time / 60;

        if (time < 24)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "hour" + end;
        }
        time = time / 24;

        if (time < 30)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "day" + end;
        }
        time = time / 30;

        if (Math.floor(time) > 1) end = "s";
        units = "month" + end;
        */
    }

    function maketimestring(i, time)
    {
        var units = "";
        var t = Math.floor(time);
        if (t > 1)
            units = timestrings[5 + i];
        else
            units = timestrings[i];
        return t + " " + units + " <blah>previously</blah>";
    }

    var timestrings =   [   
                        "<blah>second</blah>", 
                        "<blah>minute</blah>", 
                        "<blah>hour</blah>", 
                        "<blah>day</blah>", 
                        "<blah>month</blah>", 

                        "<blah>seconds</blah>", 
                        "<blah>minutes</blah>", 
                        "<blah>hours</blah>", 
                        "<blah>days</blah>", 
                        "<blah>months</blah>"
                        ];
    /*
    function t2(t, s)
    {
        t = Math.floor(t);
        if (t == 1)
            return t + " " + s + " ago";
        else
            return t + " " + s + "s ago";
    }
    */
    
    function replaceAll(base, find, rep)
    {
        while (base.indexOf(find) >= 0)
        {
            base = base.replace(find, rep);
        }
        return base;
    }

    function timeString(m)
    {
        return timeDisplayStringFromUnixTime(m.mid.substring(0, m.mid.length - 10));
    }

    function cleanedString(t)
    {
        var x = t;

        t = t.trim();
        t = t.replace("\n", " ");

        if (x != t)
            log("original message: " + x + " corrected message: " + t);

        return t;
    }

    function truncate(s, n)
    {
        if (s.length < n)
            return s;
        else
            return s.substring(0, n) + " ...";
    } 

    function logError(s)
    {
        log(s);
    }
   
    function reportError(s)
    {
        log(s);
    }


    function popModal(t, p1, p2, p3)
    {
        var r = newchatModal();

        r = replaceAll(r, "$$header$$", t);

        r = replaceAll(r, "$$okclick$$", p1);

        r = replaceAll(r, "$$cancelclick$$", p2);

        r = replaceAll(r, "$$placeholder$$", p3);

        var modal = document.getElementById("myModal");

        if (modal != null)
            modal.remove();

        var body = document.getElementsByTagName("BODY")[0];
        body.innerHTML += r;
        
        modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    function closeModalReturnValue()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        var textarea = document.getElementById("txa");
        var r = textarea.value;
        return r;
    }

    function newchat()
    {
        log("newchat");
        popModal(

            "<blah>Search for a user</blah>", 

            "onclick='searchForNewChat();'", "onclick='xModal();'", 

            "<blah>username or email address</blah>"

            );
    }

    function searchForNewChat()
    {
        var r = closeModalReturnValue();
        searchUsers(currentToken, r);
    }

    function invitation()
    {
        log("invitation");
        popModal(

            "<blah>Send an invitation</blah>", 

            "onclick='sendInvitation();'", "onclick='xModal();'", 

            "<blah>email address</blah>"

            );
    }

    function sendInvitation()
    {
        var r = closeModalReturnValue();
        inviteUser(r);
    }

    function xModal()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function help()
    {
        talk("support");
    }
