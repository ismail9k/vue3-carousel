import{p as V,v as re,q as ee,x as ie,a3 as se,d as le,u as ce,o as ne,b as de,P as ue,k as pe,c as me,j as h,a as U,G as L}from"./chunks/framework.C0dPuB0P.js";var ge=Object.create,te=Object.defineProperty,he=Object.getOwnPropertyDescriptor,ve=Object.getOwnPropertyNames,fe=Object.getPrototypeOf,ye=Object.prototype.hasOwnProperty,be=(d,g)=>()=>(g||d((g={exports:{}}).exports,g),g.exports),we=(d,g,o,w)=>{if(g&&typeof g=="object"||typeof g=="function")for(let p of ve(g))!ye.call(d,p)&&p!==o&&te(d,p,{get:()=>g[p],enumerable:!(w=he(g,p))||w.enumerable});return d},xe=(d,g,o)=>(o=d!=null?ge(fe(d)):{},we(!d||!d.__esModule?te(o,"default",{value:d,enumerable:!0}):o,d)),Se=be((d,g)=>{var o=function(){var w=String.fromCharCode,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",j={};function z(a,r){if(!j[a]){j[a]={};for(var i=0;i<a.length;i++)j[a][a.charAt(i)]=i}return j[a][r]}var E={compressToBase64:function(a){if(a==null)return"";var r=E._compress(a,6,function(i){return p.charAt(i)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:E._decompress(a.length,32,function(r){return z(p,a.charAt(r))})},compressToUTF16:function(a){return a==null?"":E._compress(a,15,function(r){return w(r+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:E._decompress(a.length,16384,function(r){return a.charCodeAt(r)-32})},compressToUint8Array:function(a){for(var r=E.compress(a),i=new Uint8Array(r.length*2),e=0,t=r.length;e<t;e++){var v=r.charCodeAt(e);i[e*2]=v>>>8,i[e*2+1]=v%256}return i},decompressFromUint8Array:function(a){if(a==null)return E.decompress(a);for(var r=new Array(a.length/2),i=0,e=r.length;i<e;i++)r[i]=a[i*2]*256+a[i*2+1];var t=[];return r.forEach(function(v){t.push(w(v))}),E.decompress(t.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":E._compress(a,6,function(r){return M.charAt(r)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),E._decompress(a.length,32,function(r){return z(M,a.charAt(r))}))},compress:function(a){return E._compress(a,16,function(r){return w(r)})},_compress:function(a,r,i){if(a==null)return"";var e,t,v={},b={},C="",S="",y="",k=2,m=3,u=2,f=[],n=0,c=0,l;for(l=0;l<a.length;l+=1)if(C=a.charAt(l),Object.prototype.hasOwnProperty.call(v,C)||(v[C]=m++,b[C]=!0),S=y+C,Object.prototype.hasOwnProperty.call(v,S))y=S;else{if(Object.prototype.hasOwnProperty.call(b,y)){if(y.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(t=y.charCodeAt(0),e=0;e<8;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1}else{for(t=1,e=0;e<u;e++)n=n<<1|t,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=0;for(t=y.charCodeAt(0),e=0;e<16;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete b[y]}else for(t=v[y],e=0;e<u;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1;k--,k==0&&(k=Math.pow(2,u),u++),v[S]=m++,y=String(C)}if(y!==""){if(Object.prototype.hasOwnProperty.call(b,y)){if(y.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(t=y.charCodeAt(0),e=0;e<8;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1}else{for(t=1,e=0;e<u;e++)n=n<<1|t,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=0;for(t=y.charCodeAt(0),e=0;e<16;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete b[y]}else for(t=v[y],e=0;e<u;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1;k--,k==0&&(k=Math.pow(2,u),u++)}for(t=2,e=0;e<u;e++)n=n<<1|t&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,t=t>>1;for(;;)if(n=n<<1,c==r-1){f.push(i(n));break}else c++;return f.join("")},decompress:function(a){return a==null?"":a==""?null:E._decompress(a.length,32768,function(r){return a.charCodeAt(r)})},_decompress:function(a,r,i){var e=[],t=4,v=4,b=3,C="",S=[],y,k,m,u,f,n,c,l={val:i(0),position:r,index:1};for(y=0;y<3;y+=1)e[y]=y;for(m=0,f=Math.pow(2,2),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;switch(m){case 0:for(m=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;c=w(m);break;case 1:for(m=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;c=w(m);break;case 2:return""}for(e[3]=c,k=c,S.push(c);;){if(l.index>a)return"";for(m=0,f=Math.pow(2,b),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;switch(c=m){case 0:for(m=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;e[v++]=w(m),c=v-1,t--;break;case 1:for(m=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;e[v++]=w(m),c=v-1,t--;break;case 2:return S.join("")}if(t==0&&(t=Math.pow(2,b),b++),e[c])C=e[c];else if(c===v)C=k+k.charAt(0);else return null;S.push(C),e[v++]=k+C.charAt(0),t--,k=C,t==0&&(t=Math.pow(2,b),b++)}}};return E}();typeof g<"u"&&g!=null&&(g.exports=o)});xe(Se());async function H(d,g={}){typeof d=="object"&&!(d instanceof HTMLElement)&&d.view==="headless"&&(g=d,d=null);let{appUrl:o="https://livecodes.io/",params:w={},config:p={},import:M,headless:j,lite:z,loading:E="lazy",template:a,view:r}=g,i=j||r==="headless",e=null;if(typeof d=="string")e=document.querySelector(d);else if(d instanceof HTMLElement)e=d;else if(!(i&&typeof d=="object"))throw new Error("A valid container element is required.");if(!e)if(i)e=document.createElement("div"),q(e),document.body.appendChild(e);else throw new Error(`Cannot find element: "${d}"`);let t;try{t=new URL(o)}catch{throw new Error(`"${o}" is not a valid URL.`)}let v=t.origin;if(typeof w=="object"&&Object.keys(w).forEach(s=>{t.searchParams.set(s,String(w[s]))}),a&&t.searchParams.set("template",a),M&&t.searchParams.set("x",M),i&&t.searchParams.set("headless","true"),z&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof p=="object"&&p.mode==null?p.mode="lite":t.searchParams.set("lite","true")),r&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),typeof p=="object"&&p.view==null&&r!=="headless"?p.view=r:t.searchParams.set("view",r)),typeof p=="string")try{new URL(p),t.searchParams.set("config",p)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else if(typeof p=="object")Object.keys(p).length>0&&t.searchParams.set("config","sdk");else throw new Error('"config" is not a valid URL or configuration object.');t.searchParams.set("embed","true"),t.searchParams.set("loading",i?"eager":E);let b=!1,C="Cannot call API methods after calling `destroy()`.",S=await new Promise(s=>{var x,P,N,O,T,I,R,$,D;if(!e)return;let _=e.dataset.height||e.style.height;if(_&&!i){let J=isNaN(Number(_))?_:_+"px";e.style.height=J}e.dataset.defaultStyles!=="false"&&!i&&((x=e.style).backgroundColor||(x.backgroundColor="#fff"),(P=e.style).border||(P.border="1px solid black"),(N=e.style).borderRadius||(N.borderRadius="8px"),(O=e.style).boxSizing||(O.boxSizing="border-box"),(T=e.style).padding||(T.padding="0"),(I=e.style).width||(I.width="100%"),(R=e.style).height||(R.height=e.style.height||"300px"),e.style.minHeight="200px",e.style.flexGrow="1",($=e.style).overflow||($.overflow="hidden"),(D=e.style).resize||(D.resize="vertical"));let Y="livecodes",X=e.querySelector(`iframe.${Y}`),A=X||document.createElement("iframe");A.classList.add(Y),A.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),A.setAttribute("allowtransparency","true"),A.setAttribute("allowpaymentrequest","true"),A.setAttribute("allowfullscreen","true"),A.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");let ae=E==="eager"?"eager":"lazy";A.setAttribute("loading",ae),i?q(A):(A.style.height="100%",A.style.minHeight="200px",A.style.width="100%",A.style.margin="0",A.style.border="0",A.style.borderRadius=e.style.borderRadius),addEventListener("message",function J(F){var K,Q;F.source!==A.contentWindow||F.origin!==v||((K=F.data)==null?void 0:K.type)!=="livecodes-get-config"||(removeEventListener("message",J),(Q=A.contentWindow)==null||Q.postMessage({type:"livecodes-config",payload:p},v))}),A.onload=()=>{s(A)},A.src=t.href,X||e.appendChild(A)}),y=new Promise(s=>{addEventListener("message",function x(P){var N;P.source!==S.contentWindow||P.origin!==v||((N=P.data)==null?void 0:N.type)!=="livecodes-ready"||(removeEventListener("message",x),s(),y.settled=!0)})}),k=()=>b?Promise.reject(C):new Promise(async s=>{var x;y.settled&&s();let P={type:"livecodes-load"};(x=S.contentWindow)==null||x.postMessage(P,v),await y,s()}),m=(s,x)=>new Promise(async(P,N)=>{var O;if(b)return N(C);await k();let T=oe();addEventListener("message",function I(R){var $,D;if(!(R.source!==S.contentWindow||R.origin!==v||(($=R.data)==null?void 0:$.type)!=="livecodes-api-response"||((D=R.data)==null?void 0:D.id)!==T)&&R.data.method===s){removeEventListener("message",I);let _=R.data.payload;_!=null&&_.error?N(_.error):P(_)}}),(O=S.contentWindow)==null||O.postMessage({method:s,id:T,args:x},v)}),u={},f=["load","ready","code","console","tests","destroy"],n=(s,x)=>{var P;if(b)throw new Error(C);return f.includes(s)?(m("watch",[s]),u[s]||(u[s]=[]),(P=u[s])==null||P.push(x),{remove:()=>{var N,O;u[s]=(N=u[s])==null?void 0:N.filter(T=>T!==x),((O=u[s])==null?void 0:O.length)===0&&m("watch",[s,"unsubscribe"])}}):{remove:()=>{}}},c=s=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[s];addEventListener("message",async s=>{var x,P,N,O;let T=c((P=(x=s.data)==null?void 0:x.type)!=null?P:"");if(s.source!==S.contentWindow||s.origin!==v||!T||!u[T])return;let I=(N=s.data)==null?void 0:N.payload;(O=u[T])==null||O.forEach(R=>{R(I)})});let l=()=>{var s;Object.values(u).forEach(x=>{x.length=0}),(s=S==null?void 0:S.remove)==null||s.call(S),b=!0};E==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((s,x)=>{s.forEach(async P=>{P.isIntersecting&&(await k(),x.unobserve(e))})},{rootMargin:"150px"}).observe(e);function q(s){s.style.position="absolute",s.style.top="0",s.style.visibility="hidden",s.style.opacity="0"}let oe=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>m("run"),format:s=>m("format",[s]),getShareUrl:s=>m("getShareUrl",[s]),getConfig:s=>m("getConfig",[s]),setConfig:s=>m("setConfig",[s]),getCode:()=>m("getCode"),show:(s,x)=>m("show",[s,x]),runTests:()=>m("runTests"),onChange:s=>n("code",s),watch:n,exec:(s,...x)=>m("exec",[s,...x]),destroy:()=>y.settled?m("destroy").then(l):b?Promise.reject(C):(l(),Promise.resolve())}}var Z;globalThis.document&&document.currentScript&&"prefill"in((Z=document.currentScript)==null?void 0:Z.dataset)&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(d=>{let g,o=d.dataset.options;if(o)try{g=JSON.parse(o)}catch{}let w,p=d.dataset.config||d.dataset.prefill;if(p)try{w=JSON.parse(p)}catch{}let M=encodeURIComponent(d.outerHTML);d.innerHTML="",H(d,{import:"dom/"+M,...g,...w?{config:w}:{}})})});var ke={appUrl:String,config:[Object,String],headless:Boolean,import:String,lite:Boolean,loading:String,params:Object,template:String,view:String,height:String},G=d=>JSON.parse(JSON.stringify(d)),Ce={props:ke,emits:["sdkReady"],setup(d,g){let{height:o,...w}=d,p=V(),M=V(o||""),j=V(),{config:z,...E}=w,a=JSON.stringify(z),r=JSON.stringify(E);return re(()=>{p.value&&H(p.value,G(w)).then(i=>{j.value=i,g.emit("sdkReady",i)})}),ee(d,async i=>{var e;if(!p.value||!j.value)return;let{height:t,...v}=i;M.value=t||"";let{config:b,...C}=v;typeof b=="string"&&(b=await fetch(b).then(S=>S.json())),JSON.stringify(C)!==r?(await((e=j.value)==null?void 0:e.destroy()),H(p.value,G(v)).then(S=>{j.value=S,g.emit("sdkReady",S)})):JSON.stringify(b)!==a&&j.value.setConfig(G(b)||{}),a=JSON.stringify(b),r=JSON.stringify(C)}),ie(()=>{var i;(i=j.value)==null||i.destroy()}),()=>{var i,e;return se("div",{ref:p,"data-height":M},((e=(i=g.slots).default)==null?void 0:e.call(i))||"")}}},Ae=Ce;const B=le({__name:"LiveCodes",props:{code:{},styles:{},loading:{},view:{},mode:{},height:{}},setup(d){const g=d,{isDark:o}=ce(),w={title:"Vue3-carousel",theme:o.value?"dark":"light",themeColor:"hsl(220, 14%, 80%)",view:g.view||"result",mode:g.mode||"simple",activeEditor:"script",tools:{status:"none"},style:{language:"css",content:g.styles||""},script:{language:"vue",content:g.code,title:"App.vue"},imports:{vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js","vue3-carousel":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs","vue3-carousel/carousel.css":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css"}};let p;const M=j=>{p=j};return ee(o,()=>{p&&p.setConfig({theme:o.value?"dark":"light"})}),(j,z)=>(ne(),de(pe(Ae),{appUrl:"https://v43.livecodes.io/",config:w,onSdkReady:M,style:ue({height:g.height||"250px"})},null,8,["style"]))}}),je=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const carouselConfig = {
  height: 200,
  itemsToShow: 3.5,
  wrapAround: true,
}
<\/script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;

  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>
`,Ee=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
}
<\/script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Pe=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from '../../dist/carousel.mjs'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
}
<\/script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Ne=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

// Carousel configuration
const config = {
  height: 200,
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    // 400px and up
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    // 500px and up
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
}
<\/script>

<template>
  <!-- Resizable container for testing 'carousel' breakpointMode -->
  <!-- Drag the right edge to adjust the width and see the breakpoints change -->
  <div class="carousel__wrapper">
    <Carousel v-bind="config">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__wrapper {
  resize: horizontal;
  border: 2px dashed gray;
  overflow: auto;
  max-width: 688px;
  padding: 2px;
}
</style>
`,Me=`<script setup>
import '../../dist/carousel.css'
import { ref } from 'vue'
import { Carousel, Slide } from '../../dist/carousel.mjs'

const carouselRef = ref()
const currentSlide = ref(1)

const next = () => carouselRef.value.next()
const prev = () => carouselRef.value.prev()

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
}
<\/script>

<template>
  <Carousel ref="carouselRef" v-model="currentSlide" v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>
  </Carousel>

  <div>
    <button @click="prev">Prev</button>
    <input type="number" min="0" max="9" v-model="currentSlide" />
    <button @click="next">Next</button>
  </div>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Oe=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'
import { ref } from 'vue'

const currentSlide = ref(0)

const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
  height: 320,
}

const thumbnailsConfig = {
  height: 80,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
}

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))
<\/script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="Gallery Image" class="gallery-image" />
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
      <template #default="{ currentIndex, isActive }">
        <div
          :class="['thumbnail', { 'is-active': isActive }]"
          @click="slideTo(currentIndex)"
        >
          <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image" />
        </div>
      </template>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
</style>
`,Te=`<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.mjs'
import '../../dist/carousel.css'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  mouseWheel: true,
  wrapAround: true,
}
<\/script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <div class="carousel__item">
        <img :src="image.url" alt="image" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Re=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from '../../dist/carousel.mjs'

const carouselConfig = {
  dir: 'ttb',
  wrapAround: true,
  itemsToShow: 2,
  snapAlign: 'center',
  height: '400px',
  gap: 5,
}

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))
<\/script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="img in images" :key="img.id">
      <img :src="img.url" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel__slide {
  border-radius: 8px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Ue=`<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  wrapAround: true,
}
<\/script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`;function W(d){return d.replace("../../dist/carousel.css","vue3-carousel/carousel.css").replace("../../dist/carousel.mjs","vue3-carousel")}const _e=W(Pe),Le=W(Ue),Be=W(Re),We=W(Ne),ze=W(Ee),Ie=W(je),$e=W(Me),De=W(Oe),Je=W(Te),Ge=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}'),Fe={name:"examples.md"},He=Object.assign(Fe,{setup(d){return(g,o)=>(ne(),me("div",null,[o[0]||(o[0]=h("h1",{id:"examples",tabindex:"-1"},[U("Examples "),h("a",{class:"header-anchor",href:"#examples","aria-label":'Permalink to "Examples"'},"​")],-1)),o[1]||(o[1]=h("p",null,"This page showcases examples of the carousel component with live demos. Explore different configurations from basic to advanced, and use the provided code samples as starting points for your own implementations.",-1)),o[2]||(o[2]=h("h2",{id:"basic",tabindex:"-1"},[U("Basic "),h("a",{class:"header-anchor",href:"#basic","aria-label":'Permalink to "Basic"'},"​")],-1)),o[3]||(o[3]=h("p",null,"A simple implementation of the carousel with default settings.",-1)),L(B,{code:_e},null,8,["code"]),o[4]||(o[4]=h("h2",{id:"wrap-around",tabindex:"-1"},[U("Wrap Around "),h("a",{class:"header-anchor",href:"#wrap-around","aria-label":'Permalink to "Wrap Around"'},"​")],-1)),o[5]||(o[5]=h("p",null,"Demonstrates a carousel with continuous wrap-around functionality.",-1)),L(B,{code:Le},null,8,["code"]),o[6]||(o[6]=h("h2",{id:"vertical",tabindex:"-1"},[U("Vertical "),h("a",{class:"header-anchor",href:"#vertical","aria-label":'Permalink to "Vertical"'},"​")],-1)),o[7]||(o[7]=h("p",null,"Showcases a vertically scrolling carousel. Adjust the height to better fit your content.",-1)),L(B,{code:Be,height:"475px"},null,8,["code"]),o[8]||(o[8]=h("h2",{id:"breakpoints",tabindex:"-1"},[U("Breakpoints "),h("a",{class:"header-anchor",href:"#breakpoints","aria-label":'Permalink to "Breakpoints"'},"​")],-1)),o[9]||(o[9]=h("p",null,"An example of a responsive carousel with breakpoints for varying screen sizes.",-1)),L(B,{code:We},null,8,["code"]),o[10]||(o[10]=h("h2",{id:"autoplay",tabindex:"-1"},[U("Autoplay "),h("a",{class:"header-anchor",href:"#autoplay","aria-label":'Permalink to "Autoplay"'},"​")],-1)),o[11]||(o[11]=h("p",null,"Illustrates the carousel with autoplay functionality enabled.",-1)),L(B,{code:ze},null,8,["code"]),o[12]||(o[12]=h("h2",{id:"mouse-wheel",tabindex:"-1"},[U("Mouse Wheel "),h("a",{class:"header-anchor",href:"#mouse-wheel","aria-label":'Permalink to "Mouse Wheel"'},"​")],-1)),o[13]||(o[13]=h("p",null,"Demonstrates the carousel with mouse wheel scrolling navigation enabled.",-1)),L(B,{code:Je},null,8,["code"]),o[14]||(o[14]=h("h2",{id:"active-classes",tabindex:"-1"},[U("Active Classes "),h("a",{class:"header-anchor",href:"#active-classes","aria-label":'Permalink to "Active Classes"'},"​")],-1)),o[15]||(o[15]=h("p",null,"An example highlighting active items with custom classes.",-1)),L(B,{code:Ie},null,8,["code"]),o[16]||(o[16]=h("h2",{id:"custom-navigation",tabindex:"-1"},[U("Custom Navigation "),h("a",{class:"header-anchor",href:"#custom-navigation","aria-label":'Permalink to "Custom Navigation"'},"​")],-1)),o[17]||(o[17]=h("p",null,"A demonstration of the carousel with fully customizable navigation controls.",-1)),L(B,{code:$e,height:"260px"},null,8,["code"]),o[18]||(o[18]=h("h2",{id:"gallery",tabindex:"-1"},[U("Gallery "),h("a",{class:"header-anchor",href:"#gallery","aria-label":'Permalink to "Gallery"'},"​")],-1)),o[19]||(o[19]=h("p",null,"Transforms the carousel into a gallery-style component.",-1)),L(B,{code:De,height:"455px"},null,8,["code"])]))}});export{Ge as __pageData,He as default};
