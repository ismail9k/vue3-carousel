import{d as X,h as f,p as _,a9 as we,q as re,s as be,v as je,$ as ot,aa as se,X as Ve,ab as rt,a8 as y,N as Q,ac as st,x as ut,z as ct,ad as dt,ae as vt}from"./framework.DN0YaC_7.js";/**
 * Vue 3 Carousel 0.14.0
 * (c) 2025
 * @license MIT
 */const ze=["viewport","carousel"],J={"bottom-to-top":"btt","left-to-right":"ltr","right-to-left":"rtl","top-to-bottom":"ttb"},Fe=["ltr","left-to-right","rtl","right-to-left","ttb","top-to-bottom","btt","bottom-to-top"],ft={ariaGallery:"Gallery",ariaNavigateToPage:"Navigate to page {slideNumber}",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",iconArrowDown:"Arrow pointing downwards",iconArrowLeft:"Arrow pointing to the left",iconArrowRight:"Arrow pointing to the right",iconArrowUp:"Arrow pointing upwards",itemXofY:"Item {currentSlide} of {slidesCount}"};Object.values(J);const Ue=["slide","fade"],$e=["center","start","end","center-even","center-odd"],w={autoplay:0,breakpointMode:ze[0],breakpoints:void 0,dir:Fe[0],enabled:!0,gap:0,height:"auto",i18n:ft,ignoreAnimations:!1,itemsToScroll:1,itemsToShow:1,modelValue:0,mouseDrag:!0,pauseAutoplayOnHover:!1,preventExcessiveDragging:!1,slideEffect:Ue[0],snapAlign:$e[0],touchDrag:!0,transition:300,wrapAround:!1},P=Symbol("carousel"),gt=e=>{const n=we([]),a=o=>{o!==void 0?n.slice(o).forEach((i,d)=>{var u;(u=i.exposed)===null||u===void 0||u.setIndex(o+d)}):n.forEach((i,d)=>{var u;(u=i.exposed)===null||u===void 0||u.setIndex(d)})};return{cleanup:()=>{n.splice(0,n.length)},getSlides:()=>n,registerSlide:(o,i)=>{if(!o||o.props.isClone)return;const d=i??n.length;n.splice(d,0,o),a(d),e("slide-registered",{slide:o,index:d})},unregisterSlide:o=>{const i=n.indexOf(o);i!==-1&&(e("slide-unregistered",{slide:o,index:i}),n.splice(i,1),a(i))}}};function mt(e){return e.length===0?0:e.reduce((a,o)=>a+o,0)/e.length}function Le({slides:e,position:n,toShow:a}){const o=[],i=n==="before",d=i?-a:0,u=i?0:a;if(e.length<=0)return o;for(let v=d;v<u;v++){const x={index:i?v:v+e.length,isClone:!0,id:void 0,key:`clone-${n}-${v}`},S=e[(v%e.length+e.length)%e.length].vnode,b=dt(S,x);b.el=null,o.push(b)}return o}const pt='a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';function Re(e){if(!e.el||!(e.el instanceof Element))return;const n=e.el.querySelectorAll(pt);for(const a of n)a instanceof HTMLElement&&!a.hasAttribute("disabled")&&a.getAttribute("aria-hidden")!=="true"&&a.setAttribute("tabindex","-1")}function ht(e,n){return Object.keys(e).filter(a=>!n.includes(a)).reduce((a,o)=>(a[o]=e[o],a),{})}function bt(e){const{isVertical:n,isReversed:a,dragged:o,effectiveSlideSize:i}=e,d=n?o.y:o.x;if(d===0)return 0;const u=Math.round(d/i);return a?u:-u}function D({val:e,max:n,min:a}){return n<a?e:Math.min(Math.max(e,isNaN(a)?e:a),isNaN(n)?e:n)}function St(e){const{transform:n}=window.getComputedStyle(e);return n.split(/[(,)]/).slice(1,-1).map(a=>parseFloat(a))}function wt(e){let n=1,a=1;return e.forEach(o=>{const i=St(o);i.length===6&&(n/=i[0],a/=i[3])}),{widthMultiplier:n,heightMultiplier:a}}function xt(e,n){switch(e){case"start":return 0;case"center":case"center-odd":return(n-1)/2;case"center-even":return(n-2)/2;case"end":return n-1;default:return 0}}function yt(e,n,a){switch(e){case"start":return 0;case"center":case"center-odd":return(a-n)/2;case"center-even":return a/2-n;case"end":return a-n;default:return 0}}function xe({slideSize:e,viewportSize:n,align:a,itemsToShow:o}){return o!==void 0?xt(a,o):e!==void 0&&n!==void 0?yt(a,e,n):0}function Xe(e="",n={}){return Object.entries(n).reduce((a,[o,i])=>a.replace(`{${o}}`,String(i)),e)}function Ye({val:e,max:n,min:a=0}){const o=n-a+1;return((e-a)%o+o)%o+a}function Se(e,n=0){let a=!1,o=0,i=null;function d(...u){if(a)return;a=!0;const v=()=>{i=requestAnimationFrame(p=>{p-o>n?(o=p,e(...u),a=!1):v()})};v()}return d.cancel=()=>{i&&(cancelAnimationFrame(i),i=null,a=!1)},d}function ue(e,n="px"){if(!(e==null||e===""))return typeof e=="number"||parseFloat(e).toString()===e?`${e}${n}`:e}const At=X({name:"CarouselAria",setup(){const e=Q(P);return e?()=>y("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},Xe(e.config.i18n.itemXofY,{currentSlide:e.currentSlide+1,slidesCount:e.slidesCount})):()=>""}}),Tt={autoplay:{default:w.autoplay,type:Number},breakpoints:{default:w.breakpoints,type:Object},breakpointMode:{default:w.breakpointMode,validator(e){return ze.includes(e)}},enabled:{default:w.enabled,type:Boolean},gap:{default:w.gap,type:Number},height:{default:w.height,type:[Number,String]},ignoreAnimations:{default:!1,type:[Array,Boolean,String]},itemsToScroll:{default:w.itemsToScroll,type:Number},itemsToShow:{default:w.itemsToShow,type:[Number,String]},i18n:{default:w.i18n,type:Object},modelValue:{default:void 0,type:Number},mouseDrag:{default:w.mouseDrag,type:Boolean},touchDrag:{default:w.touchDrag,type:Boolean},pauseAutoplayOnHover:{default:w.pauseAutoplayOnHover,type:Boolean},preventExcessiveDragging:{default:!1,type:Boolean,validator(e,n){return e&&n.wrapAround&&console.warn('[vue3-carousel]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.'),!0}},snapAlign:{default:w.snapAlign,validator(e){return $e.includes(e)}},slideEffect:{type:String,default:w.slideEffect,validator(e){return Ue.includes(e)}},transition:{default:w.transition,type:Number},dir:{type:String,default:w.dir,validator(e,n){if(!Fe.includes(e))return!1;const a=e in J?J[e]:e;return["ttb","btt"].includes(a)&&(!n.height||n.height==="auto")&&console.warn(`[vue3-carousel]: The dir "${e}" is not supported with height "auto".`),!0}},wrapAround:{default:w.wrapAround,type:Boolean},clamp:{type:Boolean}},It=X({name:"VueCarousel",props:Tt,emits:["before-init","drag","init","loop","slide-end","slide-registered","slide-start","slide-unregistered","update:modelValue"],setup(e,{slots:n,emit:a,expose:o}){var i;const d=gt(a),u=d.getSlides(),v=f(()=>u.length),p=_(null),x=_(null),S=_(0),b=f(()=>Object.assign(Object.assign(Object.assign({},w),ht(e,["breakpoints","modelValue"])),{i18n:Object.assign(Object.assign({},w.i18n),e.i18n)})),l=we(Object.assign({},b.value)),m=_((i=e.modelValue)!==null&&i!==void 0?i:0),h=_(m.value);re(m,t=>h.value=t);const N=_(0),Ge=f(()=>Math.ceil((v.value-1)/2)),j=f(()=>v.value-1),V=f(()=>0);let z=null,ce=null,Y=null;const Z=f(()=>S.value+l.gap),G=f(()=>{const t=l.dir||"ltr";return t in J?J[t]:t}),F=f(()=>["rtl","btt"].includes(G.value)),M=f(()=>["ttb","btt"].includes(G.value)),L=f(()=>l.itemsToShow==="auto"),A=f(()=>M.value?"height":"width");function H(){var t;if(!ne.value)return;const r=(b.value.breakpointMode==="carousel"?(t=p.value)===null||t===void 0?void 0:t.getBoundingClientRect().width:typeof window<"u"?window.innerWidth:0)||0,s=Object.keys(e.breakpoints||{}).map(g=>Number(g)).sort((g,T)=>+T-+g),c={};s.some(g=>r>=g?(Object.assign(c,e.breakpoints[g]),c.i18n&&Object.assign(c.i18n,b.value.i18n,e.breakpoints[g].i18n),!0):!1),Object.assign(l,b.value,c),L.value||(l.itemsToShow=D({val:Number(l.itemsToShow),max:e.clamp?v.value:1/0,min:1}))}const He=Se(()=>{H(),te(),R()}),ee=we(new Set),C=_([]);function qe({widthMultiplier:t,heightMultiplier:r}){C.value=u.map(s=>{var c;const g=(c=s.exposed)===null||c===void 0?void 0:c.getBoundingRect();return{width:g.width*t,height:g.height*r}})}const q=_({width:0,height:0});function We({widthMultiplier:t,heightMultiplier:r}){var s;const c=((s=x.value)===null||s===void 0?void 0:s.getBoundingClientRect())||{width:0,height:0};q.value={width:c.width*t,height:c.height*r}}function R(){if(!x.value)return;const t=wt(ee);if(We(t),qe(t),L.value)S.value=mt(C.value.map(r=>r[A.value]));else{const r=Number(l.itemsToShow),s=(r-1)*l.gap;S.value=(q.value[A.value]-s)/r}}function te(){!l.wrapAround&&v.value>0&&(m.value=D({val:m.value,max:j.value,min:V.value}))}const de=f(()=>typeof e.ignoreAnimations=="string"?e.ignoreAnimations.split(","):Array.isArray(e.ignoreAnimations)?e.ignoreAnimations:e.ignoreAnimations?!1:[]);be(()=>te()),be(()=>{R()});let U;const Ae=t=>{const r=t.target;if(!(!(r!=null&&r.contains(p.value))||Array.isArray(de.value)&&de.value.includes(t.animationName))&&(ee.add(r),!U)){const s=()=>{U=requestAnimationFrame(()=>{R(),s()})};s()}},Te=t=>{const r=t.target;r&&ee.delete(r),U&&ee.size===0&&(cancelAnimationFrame(U),R())},ne=_(!1);typeof document<"u"&&be(()=>{ne.value&&de.value!==!1?(document.addEventListener("animationstart",Ae),document.addEventListener("animationend",Te)):(document.removeEventListener("animationstart",Ae),document.removeEventListener("animationend",Te))}),je(()=>{ne.value=!0,H(),Ie(),p.value&&(Y=new ResizeObserver(He),Y.observe(p.value)),a("init")}),ot(()=>{ne.value=!1,d.cleanup(),ce&&clearTimeout(ce),U&&cancelAnimationFrame(U),z&&clearInterval(z),Y&&(Y.disconnect(),Y=null),typeof document<"u"&&Ne(),p.value&&(p.value.removeEventListener("transitionend",R),p.value.removeEventListener("animationiteration",R))});let k=!1;const ae={x:0,y:0},O=se({x:0,y:0}),ie=_(!1),ve=_(!1),Ke=()=>{ie.value=!0},Je=()=>{ie.value=!1},_e=Se(t=>{if(!t.ctrlKey)switch(t.key){case"ArrowLeft":case"ArrowUp":M.value===t.key.endsWith("Up")&&(F.value?W(!0):le(!0));break;case"ArrowRight":case"ArrowDown":M.value===t.key.endsWith("Down")&&(F.value?le(!0):W(!0));break}},200),Qe=()=>{document.addEventListener("keydown",_e)},Ne=()=>{document.removeEventListener("keydown",_e)};function Ce(t){const r=t.target.tagName;if(["INPUT","TEXTAREA","SELECT"].includes(r)||B.value||(k=t.type==="touchstart",!k&&(t.preventDefault(),t.button!==0)))return;ae.x="touches"in t?t.touches[0].clientX:t.clientX,ae.y="touches"in t?t.touches[0].clientY:t.clientY;const s=k?"touchmove":"mousemove",c=k?"touchend":"mouseup";document.addEventListener(s,fe,{passive:!1}),document.addEventListener(c,Ee,{passive:!0})}const fe=Se(t=>{ve.value=!0;const r="touches"in t?t.touches[0].clientX:t.clientX,s="touches"in t?t.touches[0].clientY:t.clientY;O.x=r-ae.x,O.y=s-ae.y;const c=bt({isVertical:M.value,isReversed:F.value,dragged:O,effectiveSlideSize:Z.value});h.value=l.wrapAround?m.value+c:D({val:m.value+c,max:j.value,min:V.value}),a("drag",{deltaX:O.x,deltaY:O.y})});function Ee(){if(fe.cancel(),h.value!==m.value&&!k){const s=c=>{c.preventDefault(),window.removeEventListener("click",s)};window.addEventListener("click",s)}$(h.value),O.x=0,O.y=0,ve.value=!1;const t=k?"touchmove":"mousemove",r=k?"touchend":"mouseup";document.removeEventListener(t,fe),document.removeEventListener(r,Ee)}function Ie(){!l.autoplay||l.autoplay<=0||(z=setInterval(()=>{l.pauseAutoplayOnHover&&ie.value||W()},l.autoplay))}function Oe(){z&&(clearInterval(z),z=null)}function ge(){Oe(),Ie()}const B=_(!1);function $(t,r=!1){if(!r&&B.value)return;let s=t,c=t;N.value=m.value,l.wrapAround?c=Ye({val:s,max:j.value,min:V.value}):s=D({val:s,max:j.value,min:V.value}),a("slide-start",{slidingToIndex:t,currentSlideIndex:m.value,prevSlideIndex:N.value,slidesCount:v.value}),Oe(),B.value=!0,m.value=s,c!==s&&De.pause(),a("update:modelValue",c),ce=setTimeout(()=>{l.wrapAround&&c!==s&&(De.resume(),m.value=c,a("loop",{currentSlideIndex:m.value,slidingToIndex:t})),a("slide-end",{currentSlideIndex:m.value,prevSlideIndex:N.value,slidesCount:v.value}),B.value=!1,ge()},l.transition)}function W(t=!1){$(m.value+l.itemsToScroll,t)}function le(t=!1){$(m.value-l.itemsToScroll,t)}function Ze(){H(),te(),R(),ge()}re(()=>[b.value,e.breakpoints],()=>H(),{deep:!0}),re(()=>e.autoplay,()=>ge());const De=re(()=>e.modelValue,t=>{t!==m.value&&$(Number(t),!0)});a("before-init");const K=f(()=>{if(!l.wrapAround)return{before:0,after:0};if(L.value)return{before:u.length,after:u.length};const t=Number(l.itemsToShow),r=Math.ceil(t+(l.itemsToScroll-1)),s=r-h.value,c=r-(v.value-(h.value+1));return{before:Math.max(0,s),after:Math.max(0,c)}}),me=f(()=>K.value.before?L.value?C.value.slice(-1*K.value.before).reduce((t,r)=>t+r[A.value]+l.gap,0)*-1:K.value.before*Z.value*-1:0),pe=f(()=>{var t;if(L.value){const r=(m.value%u.length+u.length)%u.length;return xe({slideSize:(t=C.value[r])===null||t===void 0?void 0:t[A.value],viewportSize:q.value[A.value],align:l.snapAlign})}return xe({align:l.snapAlign,itemsToShow:+l.itemsToShow})}),oe=f(()=>{let t=0;if(L.value){if(m.value<0?t=C.value.slice(m.value).reduce((r,s)=>r+s[A.value]+l.gap,0)*-1:t=C.value.slice(0,m.value).reduce((r,s)=>r+s[A.value]+l.gap,0),t-=pe.value,!l.wrapAround){const r=C.value.reduce((s,c)=>s+c[A.value]+l.gap,0)-q.value[A.value]-l.gap;t=D({val:t,max:r,min:0})}}else{let r=m.value-pe.value;l.wrapAround||(r=D({val:r,max:v.value-+l.itemsToShow,min:0})),t=r*Z.value}return t*(F.value?1:-1)}),et=f(()=>{var t,r;if(!L.value){const g=m.value-pe.value;return l.wrapAround?{min:Math.floor(g),max:Math.ceil(g+Number(l.itemsToShow)-1)}:{min:Math.floor(D({val:g,max:v.value-Number(l.itemsToShow),min:0})),max:Math.ceil(D({val:g+Number(l.itemsToShow)-1,max:v.value-1,min:0}))}}let s=0;{let g=0,T=0-K.value.before;const E=Math.abs(oe.value+me.value);for(;g<=E;){const I=(T%u.length+u.length)%u.length;g+=((t=C.value[I])===null||t===void 0?void 0:t[A.value])+l.gap,T++}s=T-1}let c=0;{let g=s,T=0;for(g<0?T=C.value.slice(0,g).reduce((E,I)=>E+I[A.value]+l.gap,0)-Math.abs(oe.value+me.value):T=C.value.slice(0,g).reduce((E,I)=>E+I[A.value]+l.gap,0)-Math.abs(oe.value);T<q.value[A.value];){const E=(g%u.length+u.length)%u.length;T+=((r=C.value[E])===null||r===void 0?void 0:r[A.value])+l.gap,g++}c=g-1}return{min:Math.floor(s),max:Math.ceil(c)}}),tt=f(()=>{if(l.slideEffect==="fade")return;const t=M.value?"Y":"X",r=M.value?O.y:O.x;let s=oe.value+r;if(!l.wrapAround&&l.preventExcessiveDragging){let c=0;L.value?c=C.value.reduce((E,I)=>E+I[A.value],0):c=(v.value-Number(l.itemsToShow))*Z.value;const g=F.value?0:-1*c,T=F.value?c:0;s=D({val:s,min:g,max:T})}return`translate${t}(${s}px)`}),nt=f(()=>({"--vc-transition-duration":B.value?ue(l.transition,"ms"):void 0,"--vc-slide-gap":ue(l.gap),"--vc-carousel-height":ue(l.height),"--vc-cloned-offset":ue(me.value)})),Me=se({activeSlide:h,config:l,currentSlide:m,isSliding:B,isVertical:M,maxSlide:j,minSlide:V,nav:{slideTo:$,next:W,prev:le},normalizedDir:G,slideRegistry:d,slideSize:S,slides:u,slidesCount:v,viewport:x,visibleRange:et});Ve(P,Me);const he=se({config:l,currentSlide:m,maxSlide:j,middleSlide:Ge,minSlide:V,slideSize:S,slidesCount:v});return o(se(Object.assign({data:he,next:W,prev:le,restartCarousel:Ze,slideTo:$,updateBreakpointsConfig:H,updateSlideSize:R,updateSlidesData:te},rt(Me)))),()=>{var t;const r=n.default||n.slides,s=(r==null?void 0:r(he))||[],{before:c,after:g}=K.value,T=Le({slides:u,position:"before",toShow:c}),E=Le({slides:u,position:"after",toShow:g}),I=[...T,...s,...E];if(!l.enabled||!I.length)return y("section",{ref:p,class:["carousel","is-disabled"]},I);const at=((t=n.addons)===null||t===void 0?void 0:t.call(n,he))||[],it=y("ol",{class:"carousel__track",style:{transform:tt.value},onMousedownCapture:l.mouseDrag?Ce:null,onTouchstartPassiveCapture:l.touchDrag?Ce:null},I),lt=y("div",{class:"carousel__viewport",ref:x},it);return y("section",{ref:p,class:["carousel",`is-${G.value}`,`is-effect-${l.slideEffect}`,{"is-vertical":M.value,"is-sliding":B.value,"is-dragging":ve.value,"is-hover":ie.value}],dir:G.value,style:nt.value,"aria-label":l.i18n.ariaGallery,tabindex:"0",onFocus:Qe,onBlur:Ne,onMouseenter:Ke,onMouseleave:Je},[lt,at,y(At)])}}});var ye;(function(e){e.arrowDown="arrowDown",e.arrowLeft="arrowLeft",e.arrowRight="arrowRight",e.arrowUp="arrowUp"})(ye||(ye={}));const ke=e=>`icon${e.charAt(0).toUpperCase()+e.slice(1)}`,_t={arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"};function Nt(e){return e in ye}const Be=e=>e&&Nt(e),Pe=X({props:{name:{type:String,required:!0,validator:Be},title:{type:String,default:e=>e.name?w.i18n[ke(e.name)]:""}},setup(e){const n=Q(P,null);return()=>{const a=e.name;if(!a||!Be(a))return;const o=_t[a],i=y("path",{d:o}),d=(n==null?void 0:n.config.i18n[ke(a)])||e.title,u=y("title",d);return y("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":d},[u,i])}}}),Ot=X({name:"CarouselNavigation",inheritAttrs:!1,props:{carousel:{type:Object}},setup(e,{slots:n,attrs:a}){let o=Q(P,null);const{next:i,prev:d}=n,u=()=>({btt:"arrowDown",ltr:"arrowLeft",rtl:"arrowRight",ttb:"arrowUp"})[o.normalizedDir],v=()=>({btt:"arrowUp",ltr:"arrowRight",rtl:"arrowLeft",ttb:"arrowDown"})[o.normalizedDir],p=f(()=>!o.config.wrapAround&&o.currentSlide<=o.minSlide),x=f(()=>!o.config.wrapAround&&o.currentSlide>=o.maxSlide);return()=>{if(e.carousel&&(o=e.carousel),!o)return console.warn("[vue3-carousel]: A carousel component must be provided for the navigation component to display"),"";const{i18n:S}=o.config,b=y("button",Object.assign(Object.assign({type:"button",disabled:p.value,"aria-label":S.ariaPreviousSlide,title:S.ariaPreviousSlide,onClick:o.nav.prev},a),{class:["carousel__prev",{"carousel__prev--disabled":p.value},a.class]}),(d==null?void 0:d())||y(Pe,{name:u()})),l=y("button",Object.assign(Object.assign({type:"button",disabled:x.value,"aria-label":S.ariaNextSlide,title:S.ariaNextSlide,onClick:o.nav.next},a),{class:["carousel__next",{"carousel__next--disabled":x.value},a.class]}),(i==null?void 0:i())||y(Pe,{name:v()}));return[b,l]}}}),Dt=X({name:"CarouselPagination",props:{disableOnClick:{type:Boolean},paginateByItemsToShow:{type:Boolean},carousel:{type:Object}},setup(e){let n=Q(P,null);const a=f(()=>n.config.itemsToShow),o=f(()=>xe({align:n.config.snapAlign,itemsToShow:a.value})),i=f(()=>e.paginateByItemsToShow&&a.value>1),d=f(()=>Math.ceil((n.activeSlide-o.value)/a.value)),u=f(()=>Math.ceil(n.slidesCount/a.value)),v=p=>Ye(i.value?{val:d.value,max:u.value-1,min:0}:{val:n.activeSlide,max:n.maxSlide,min:n.minSlide})===p;return()=>{var p,x;if(e.carousel&&(n=e.carousel),!n)return console.warn("[vue3-carousel]: A carousel component must be provided for the pagination component to display"),"";const S=[];for(let b=i.value?0:n.minSlide;b<=(i.value?u.value-1:n.maxSlide);b++){const l=Xe(n.config.i18n[i.value?"ariaNavigateToPage":"ariaNavigateToSlide"],{slideNumber:b+1}),m=v(b),h=y("button",{type:"button",class:{"carousel__pagination-button":!0,"carousel__pagination-button--active":m},"aria-label":l,"aria-pressed":m,"aria-controls":(x=(p=n.slides[b])===null||p===void 0?void 0:p.exposed)===null||x===void 0?void 0:x.id,title:l,disabled:e.disableOnClick,onClick:()=>n.nav.slideTo(i.value?Math.floor(b*+n.config.itemsToShow+o.value):b)}),N=y("li",{class:"carousel__pagination-item",key:b},h);S.push(N)}return y("ol",{class:"carousel__pagination"},S)}}}),Mt=X({name:"CarouselSlide",props:{id:{type:String,default:e=>e.isClone?void 0:st()},index:{type:Number,default:void 0},isClone:{type:Boolean,default:!1}},setup(e,{attrs:n,slots:a,expose:o}){const i=Q(P);if(Ve(P,void 0),!i)return()=>"";const d=_(e.index),u=h=>{d.value=h},v=vt(),p=()=>{const h=v.vnode.el;return h?h.getBoundingClientRect():{width:0,height:0}};o({id:e.id,setIndex:u,getBoundingRect:p});const x=f(()=>d.value===i.activeSlide),S=f(()=>d.value===i.activeSlide-1),b=f(()=>d.value===i.activeSlide+1),l=f(()=>d.value>=i.visibleRange.min&&d.value<=i.visibleRange.max),m=f(()=>{if(i.config.itemsToShow==="auto")return;const h=i.config.itemsToShow,N=i.config.gap>0&&h>1?`calc(${100/h}% - ${i.config.gap*(h-1)/h}px)`:`${100/h}%`;return i.isVertical?{height:N}:{width:N}});return i.slideRegistry.registerSlide(v,e.index),ut(()=>{i.slideRegistry.unregisterSlide(v)}),e.isClone&&(je(()=>{Re(v.vnode)}),ct(()=>{Re(v.vnode)})),()=>{var h,N;return i.config.enabled?y("li",{style:[n.style,Object.assign({},m.value)],class:{carousel__slide:!0,"carousel__slide--clone":e.isClone,"carousel__slide--visible":l.value,"carousel__slide--active":x.value,"carousel__slide--prev":S.value,"carousel__slide--next":b.value,"carousel__slide--sliding":i.isSliding},onFocusin:()=>{i.viewport&&(i.viewport.scrollLeft=0),i.nav.slideTo(d.value)},id:e.isClone?void 0:e.id,"aria-hidden":e.isClone||void 0},(N=a.default)===null||N===void 0?void 0:N.call(a,{currentIndex:d.value,isActive:x.value,isClone:e.isClone,isPrev:S.value,isNext:b.value,isSliding:i.isSliding,isVisible:l.value})):(h=a.default)===null||h===void 0?void 0:h.call(a)}}});export{It as C,Ot as N,Dt as P,Mt as S};
