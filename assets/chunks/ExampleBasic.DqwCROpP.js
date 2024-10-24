import{d as X,s as c,a7 as T,Y as x,h as A,y as ke,R as Ce,z as Ne,v as K,a8 as me,a9 as h,N as m,F as Se,_ as Me,D as V,o as ge,b as Ee,w as Q,I as Z,c as Oe,E as Le,j as je,t as Ie}from"./framework.CKFXWU_d.js";/**
 * Vue 3 Carousel 0.4.0
 * (c) 2024
 * @license MIT
 */const v={itemsToShow:1,itemsToScroll:1,modelValue:0,transition:300,autoplay:0,snapAlign:"center",wrapAround:!1,throttle:16,pauseAutoplayOnHover:!1,mouseDrag:!0,touchDrag:!0,dir:"ltr",breakpoints:void 0,i18n:{ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaGallery:"Gallery",itemXofY:"Item {currentSlide} of {slidesCount}",iconArrowUp:"Arrow pointing upwards",iconArrowDown:"Arrow pointing downwards",iconArrowRight:"Arrow pointing to the right",iconArrowLeft:"Arrow pointing to the left"}},he={itemsToShow:{default:v.itemsToShow,type:Number},itemsToScroll:{default:v.itemsToScroll,type:Number},wrapAround:{default:v.wrapAround,type:Boolean},throttle:{default:v.throttle,type:Number},snapAlign:{default:v.snapAlign,validator(e){return["start","end","center","center-even","center-odd"].includes(e)}},transition:{default:v.transition,type:Number},breakpoints:{default:v.breakpoints,type:Object},autoplay:{default:v.autoplay,type:Number},pauseAutoplayOnHover:{default:v.pauseAutoplayOnHover,type:Boolean},modelValue:{default:void 0,type:Number},mouseDrag:{default:v.mouseDrag,type:Boolean},touchDrag:{default:v.touchDrag,type:Boolean},dir:{default:v.dir,validator(e){return["rtl","ltr"].includes(e)}},i18n:{default:v.i18n,type:Object},settings:{default(){return{}},type:Object}};function De({config:e,slidesCount:n}){const{snapAlign:t,wrapAround:l,itemsToShow:r=1}=e;if(l)return Math.max(n-1,0);let i;switch(t){case"start":i=n-r;break;case"end":i=n-1;break;case"center":case"center-odd":i=n-Math.ceil((r-.5)/2);break;case"center-even":i=n-Math.ceil(r/2);break;default:i=0;break}return Math.max(i,0)}function Be({config:e,slidesCount:n}){const{wrapAround:t,snapAlign:l,itemsToShow:r=1}=e;let i=0;if(t||r>n)return i;switch(l){case"start":i=0;break;case"end":i=r-1;break;case"center":case"center-odd":i=Math.floor((r-1)/2);break;case"center-even":i=Math.floor((r-2)/2);break;default:i=0;break}return i}function ee({val:e,max:n,min:t}){return n<t?e:Math.min(Math.max(e,t),n)}function Pe({config:e,currentSlide:n,slidesCount:t}){const{snapAlign:l,wrapAround:r,itemsToShow:i=1}=e;let f=n;switch(l){case"center":case"center-odd":f-=(i-1)/2;break;case"center-even":f-=(i-2)/2;break;case"end":f-=i-1;break}return r?f:ee({val:f,max:t-i,min:0})}function be(e){return e?e.reduce((n,t)=>{var l;return t.type===Se?[...n,...be(t.children)]:((l=t.type)===null||l===void 0?void 0:l.name)==="CarouselSlide"?[...n,t]:n},[]):[]}function $({val:e,max:n,min:t=0}){return e>n?$({val:e-(n+1),max:n,min:t}):e<t?$({val:e+(n+1),max:n,min:t}):e}function Re(e,n){let t;return n?function(...l){const r=this;t||(e.apply(r,l),t=!0,setTimeout(()=>t=!1,n))}:e}function Ve(e,n){let t;return function(...l){t&&clearTimeout(t),t=setTimeout(()=>{e(...l),t=null},n)}}function we(e="",n={}){return Object.entries(n).reduce((t,[l,r])=>t.replace(`{${l}}`,String(r)),e)}var $e=X({name:"ARIA",setup(){const e=m("config",T(Object.assign({},v))),n=m("currentSlide",c(0)),t=m("slidesCount",c(0));return()=>h("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},we(e.i18n.itemXofY,{currentSlide:n.value+1,slidesCount:t.value}))}}),Xe=X({name:"Carousel",props:he,setup(e,{slots:n,emit:t,expose:l}){var r;const i=c(null),f=c([]),u=c(0),d=c(0),o=T(Object.assign({},v)),s=c((r=e.modelValue)!==null&&r!==void 0?r:0),_=c(0),E=c(0),b=c(0),k=c(0);let y=null,z=null;x("config",o),x("slidesCount",d),x("currentSlide",s),x("maxSlide",b),x("minSlide",k),x("slideWidth",u);const ae=A(()=>Object.assign({},e.breakpoints)),xe=A(()=>Object.assign(Object.assign(Object.assign({},v),e),{i18n:Object.assign(Object.assign({},v.i18n),e.i18n),breakpoints:void 0}));function j(){const a=Object.keys(ae.value||{}).map(p=>Number(p)).sort((p,w)=>+w-+p);let g=Object.assign({},xe.value);a.some(p=>{const w=window.matchMedia(`(min-width: ${p}px)`).matches;return w&&(g=Object.assign(Object.assign({},g),ae.value[p])),w}),_e(g)}function _e(a){Object.entries(a).forEach(([g,p])=>o[g]=p)}const oe=Ve(()=>{j(),I(),O()},16);function O(){if(!i.value)return;const a=i.value.getBoundingClientRect();u.value=a.width/o.itemsToShow}function I(){d.value<=0||(E.value=Math.ceil((d.value-1)/2),b.value=De({config:o,slidesCount:d.value}),k.value=Be({config:o,slidesCount:d.value}),o.wrapAround||(s.value=ee({val:s.value,max:b.value,min:k.value})))}ke(()=>{Ce(()=>O()),setTimeout(()=>O(),1e3),j(),se(),window.addEventListener("resize",oe,{passive:!0}),t("init")}),Ne(()=>{z&&clearTimeout(z),y&&clearInterval(y),window.removeEventListener("resize",oe,{passive:!0})});let S=!1;const D={x:0,y:0},B={x:0,y:0},C=T({x:0,y:0}),P=c(!1),Y=c(!1),ye=()=>{P.value=!0},Ae=()=>{P.value=!1};function ie(a){["INPUT","TEXTAREA","SELECT"].includes(a.target.tagName)||(S=a.type==="touchstart",S||a.preventDefault(),!(!S&&a.button!==0||N.value)&&(D.x=S?a.touches[0].clientX:a.clientX,D.y=S?a.touches[0].clientY:a.clientY,document.addEventListener(S?"touchmove":"mousemove",le),document.addEventListener(S?"touchend":"mouseup",re)))}const le=Re(a=>{Y.value=!0,B.x=S?a.touches[0].clientX:a.clientX,B.y=S?a.touches[0].clientY:a.clientY;const g=B.x-D.x,p=B.y-D.y;C.y=p,C.x=g},o.throttle);function re(){const a=o.dir==="rtl"?-1:1,g=Math.sign(C.x)*.4,p=Math.round(C.x/u.value+g)*a;if(p&&!S){const w=F=>{F.preventDefault(),window.removeEventListener("click",w)};window.addEventListener("click",w)}M(s.value-p),C.x=0,C.y=0,Y.value=!1,document.removeEventListener(S?"touchmove":"mousemove",le),document.removeEventListener(S?"touchend":"mouseup",re)}function se(){!o.autoplay||o.autoplay<=0||(y=setInterval(()=>{o.pauseAutoplayOnHover&&P.value||R()},o.autoplay))}function ue(){y&&(clearInterval(y),y=null),se()}const N=c(!1);function M(a){const g=o.wrapAround?a:ee({val:a,max:b.value,min:k.value});s.value===g||N.value||(t("slide-start",{slidingToIndex:a,currentSlideIndex:s.value,prevSlideIndex:_.value,slidesCount:d.value}),N.value=!0,_.value=s.value,s.value=g,z=setTimeout(()=>{if(o.wrapAround){const p=$({val:g,max:b.value,min:0});p!==s.value&&(s.value=p,t("loop",{currentSlideIndex:s.value,slidingToIndex:a}))}t("update:modelValue",s.value),t("slide-end",{currentSlideIndex:s.value,prevSlideIndex:_.value,slidesCount:d.value}),N.value=!1,ue()},o.transition))}function R(){M(s.value+o.itemsToScroll)}function U(){M(s.value-o.itemsToScroll)}const ce={slideTo:M,next:R,prev:U};x("nav",ce),x("isSliding",N);const de=A(()=>Pe({config:o,currentSlide:s.value,slidesCount:d.value}));x("slidesToScroll",de);const Te=A(()=>{const a=o.dir==="rtl"?-1:1,g=de.value*u.value*a;return{transform:`translateX(${C.x-g}px)`,transition:`${N.value?o.transition:0}ms`,margin:o.wrapAround?`0 -${d.value*u.value}px`:"",width:"100%"}});function ve(){j(),I(),O(),ue()}Object.keys(he).forEach(a=>{["modelValue"].includes(a)||K(()=>e[a],ve)}),K(()=>e.modelValue,a=>{a!==s.value&&M(Number(a))}),K(d,I),t("before-init");const fe={config:o,slidesCount:d,slideWidth:u,next:R,prev:U,slideTo:M,currentSlide:s,maxSlide:b,minSlide:k,middleSlide:E};l({updateBreakpointsConfigs:j,updateSlidesData:I,updateSlideWidth:O,restartCarousel:ve,slideTo:M,next:R,prev:U,nav:ce,data:fe});const H=n.default||n.slides,W=n.addons,pe=T(fe);return()=>{const a=be(H==null?void 0:H(pe)),g=(W==null?void 0:W(pe))||[];a.forEach((G,q)=>G.props.index=q);let p=a;if(o.wrapAround){const G=a.map((J,L)=>me(J,{index:-a.length+L,isClone:!0,key:`clone-before-${L}`})),q=a.map((J,L)=>me(J,{index:a.length+L,isClone:!0,key:`clone-after-${L}`}));p=[...G,...a,...q]}f.value=a,d.value=Math.max(a.length,1);const w=h("ol",{class:"carousel__track",style:Te.value,onMousedownCapture:o.mouseDrag?ie:null,onTouchstartPassiveCapture:o.touchDrag?ie:null},p),F=h("div",{class:"carousel__viewport"},w);return h("section",{ref:i,class:{carousel:!0,"is-sliding":N.value,"is-dragging":Y.value,"is-hover":P.value,"carousel--rtl":o.dir==="rtl"},dir:o.dir,"aria-label":o.i18n.ariaGallery,tabindex:"0",onMouseenter:ye,onMouseleave:Ae},[F,g,h($e)])}}}),te;(function(e){e.arrowUp="arrowUp",e.arrowDown="arrowDown",e.arrowRight="arrowRight",e.arrowLeft="arrowLeft"})(te||(te={}));const ze={arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"};function Ye(e){return e in te}const ne=e=>{const n=m("config",T(Object.assign({},v))),t=String(e.name),l=`icon${t.charAt(0).toUpperCase()+t.slice(1)}`;if(!t||typeof t!="string"||!Ye(t))return;const r=ze[t],i=h("path",{d:r}),f=n.i18n[l]||e.title||t,u=h("title",f);return h("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":f},[u,i])};ne.props={name:String,title:String};const Ue=(e,{slots:n,attrs:t})=>{const{next:l,prev:r}=n||{},i=m("config",T(Object.assign({},v))),f=m("maxSlide",c(1)),u=m("minSlide",c(1)),d=m("currentSlide",c(1)),o=m("nav",{}),{dir:s,wrapAround:_,i18n:E}=i,b=s==="rtl",k=h("button",{type:"button",class:["carousel__prev",!_&&d.value<=u.value&&"carousel__prev--disabled",t==null?void 0:t.class],"aria-label":E.ariaPreviousSlide,onClick:o.prev},(r==null?void 0:r())||h(ne,{name:b?"arrowRight":"arrowLeft"})),y=h("button",{type:"button",class:["carousel__next",!_&&d.value>=f.value&&"carousel__next--disabled",t==null?void 0:t.class],"aria-label":E.ariaNextSlide,onClick:o.next},(l==null?void 0:l())||h(ne,{name:b?"arrowLeft":"arrowRight"}));return[k,y]},He=()=>{const e=m("config",T(Object.assign({},v))),n=m("maxSlide",c(1)),t=m("minSlide",c(1)),l=m("currentSlide",c(1)),r=m("nav",{}),i=u=>$({val:l.value,max:n.value,min:0})===u,f=[];for(let u=t.value;u<n.value+1;u++){const d=h("button",{type:"button",class:{"carousel__pagination-button":!0,"carousel__pagination-button--active":i(u)},"aria-label":we(e.i18n.ariaNavigateToSlide,{slideNumber:u+1}),onClick:()=>r.slideTo(u)}),o=h("li",{class:"carousel__pagination-item",key:u},d);f.push(o)}return h("ol",{class:"carousel__pagination"},f)};var We=X({name:"CarouselSlide",props:{index:{type:Number,default:1},isClone:{type:Boolean,default:!1}},setup(e,{slots:n}){const t=m("config",T(Object.assign({},v))),l=m("currentSlide",c(0)),r=m("slidesToScroll",c(0)),i=m("isSliding",c(!1)),f=A(()=>e.index===l.value),u=A(()=>e.index===l.value-1),d=A(()=>e.index===l.value+1),o=A(()=>{const s=Math.floor(r.value),_=Math.ceil(r.value+t.itemsToShow-1);return e.index>=s&&e.index<=_});return()=>{var s;return h("li",{style:{width:`${100/t.itemsToShow}%`},class:{carousel__slide:!0,"carousel__slide--clone":e.isClone,"carousel__slide--visible":o.value,"carousel__slide--active":f.value,"carousel__slide--prev":u.value,"carousel__slide--next":d.value,"carousel__slide--sliding":i.value},"aria-hidden":!o.value},(s=n.default)===null||s===void 0?void 0:s.call(n,{isActive:f.value,isClone:e.isClone,isPrev:u.value,isNext:d.value,isSliding:i.value,isVisible:o.value}))}}});const Fe=X({name:"Basic",components:{Carousel:Xe,Slide:We,Pagination:He,Navigation:Ue}}),Ge={class:"carousel__item"};function qe(e,n,t,l,r,i){const f=V("Slide"),u=V("Navigation"),d=V("Pagination"),o=V("Carousel");return ge(),Ee(o,null,{addons:Q(()=>[Z(u),Z(d)]),default:Q(()=>[(ge(),Oe(Se,null,Le(10,s=>Z(f,{key:s},{default:Q(()=>[je("div",Ge,Ie(s),1)]),_:2},1024)),64))]),_:1})}const Ke=Me(Fe,[["render",qe]]);export{Xe as C,Ke as E,Ue as N,He as P,We as S};
