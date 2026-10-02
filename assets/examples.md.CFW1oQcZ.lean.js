import{p as V,v as re,q as ee,x as ie,af as se,d as le,u as ce,o as ne,b as de,P as ue,k as pe,c as me,j as h,a as U,G as _}from"./chunks/framework.6uqSfbGU.js";var ge=Object.create,te=Object.defineProperty,he=Object.getOwnPropertyDescriptor,ve=Object.getOwnPropertyNames,fe=Object.getPrototypeOf,be=Object.prototype.hasOwnProperty,ye=(d,g)=>()=>(g||d((g={exports:{}}).exports,g),g.exports),we=(d,g,t,w)=>{if(g&&typeof g=="object"||typeof g=="function")for(let p of ve(g))!be.call(d,p)&&p!==t&&te(d,p,{get:()=>g[p],enumerable:!(w=he(g,p))||w.enumerable});return d},xe=(d,g,t)=>(t=d!=null?ge(fe(d)):{},we(!d||!d.__esModule?te(t,"default",{value:d,enumerable:!0}):t,d)),Se=ye((d,g)=>{var t=function(){var w=String.fromCharCode,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",j={};function z(a,r){if(!j[a]){j[a]={};for(var i=0;i<a.length;i++)j[a][a.charAt(i)]=i}return j[a][r]}var E={compressToBase64:function(a){if(a==null)return"";var r=E._compress(a,6,function(i){return p.charAt(i)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:E._decompress(a.length,32,function(r){return z(p,a.charAt(r))})},compressToUTF16:function(a){return a==null?"":E._compress(a,15,function(r){return w(r+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:E._decompress(a.length,16384,function(r){return a.charCodeAt(r)-32})},compressToUint8Array:function(a){for(var r=E.compress(a),i=new Uint8Array(r.length*2),e=0,o=r.length;e<o;e++){var v=r.charCodeAt(e);i[e*2]=v>>>8,i[e*2+1]=v%256}return i},decompressFromUint8Array:function(a){if(a==null)return E.decompress(a);for(var r=new Array(a.length/2),i=0,e=r.length;i<e;i++)r[i]=a[i*2]*256+a[i*2+1];var o=[];return r.forEach(function(v){o.push(w(v))}),E.decompress(o.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":E._compress(a,6,function(r){return M.charAt(r)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),E._decompress(a.length,32,function(r){return z(M,a.charAt(r))}))},compress:function(a){return E._compress(a,16,function(r){return w(r)})},_compress:function(a,r,i){if(a==null)return"";var e,o,v={},y={},C="",S="",b="",k=2,m=3,u=2,f=[],n=0,c=0,l;for(l=0;l<a.length;l+=1)if(C=a.charAt(l),Object.prototype.hasOwnProperty.call(v,C)||(v[C]=m++,y[C]=!0),S=b+C,Object.prototype.hasOwnProperty.call(v,S))b=S;else{if(Object.prototype.hasOwnProperty.call(y,b)){if(b.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(o=b.charCodeAt(0),e=0;e<8;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}else{for(o=1,e=0;e<u;e++)n=n<<1|o,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=0;for(o=b.charCodeAt(0),e=0;e<16;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete y[b]}else for(o=v[b],e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;k--,k==0&&(k=Math.pow(2,u),u++),v[S]=m++,b=String(C)}if(b!==""){if(Object.prototype.hasOwnProperty.call(y,b)){if(b.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(o=b.charCodeAt(0),e=0;e<8;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}else{for(o=1,e=0;e<u;e++)n=n<<1|o,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=0;for(o=b.charCodeAt(0),e=0;e<16;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete y[b]}else for(o=v[b],e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;k--,k==0&&(k=Math.pow(2,u),u++)}for(o=2,e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;for(;;)if(n=n<<1,c==r-1){f.push(i(n));break}else c++;return f.join("")},decompress:function(a){return a==null?"":a==""?null:E._decompress(a.length,32768,function(r){return a.charCodeAt(r)})},_decompress:function(a,r,i){var e=[],o=4,v=4,y=3,C="",S=[],b,k,m,u,f,n,c,l={val:i(0),position:r,index:1};for(b=0;b<3;b+=1)e[b]=b;for(m=0,f=Math.pow(2,2),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;switch(m){case 0:for(m=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;c=w(m);break;case 1:for(m=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;c=w(m);break;case 2:return""}for(e[3]=c,k=c,S.push(c);;){if(l.index>a)return"";for(m=0,f=Math.pow(2,y),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;switch(c=m){case 0:for(m=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;e[v++]=w(m),c=v-1,o--;break;case 1:for(m=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),m|=(u>0?1:0)*n,n<<=1;e[v++]=w(m),c=v-1,o--;break;case 2:return S.join("")}if(o==0&&(o=Math.pow(2,y),y++),e[c])C=e[c];else if(c===v)C=k+k.charAt(0);else return null;S.push(C),e[v++]=k+C.charAt(0),o--,k=C,o==0&&(o=Math.pow(2,y),y++)}}};return E}();typeof g<"u"&&g!=null&&(g.exports=t)});xe(Se());async function H(d,g={}){typeof d=="object"&&!(d instanceof HTMLElement)&&d.view==="headless"&&(g=d,d=null);let{appUrl:t="https://livecodes.io/",params:w={},config:p={},import:M,headless:j,lite:z,loading:E="lazy",template:a,view:r}=g,i=j||r==="headless",e=null;if(typeof d=="string")e=document.querySelector(d);else if(d instanceof HTMLElement)e=d;else if(!(i&&typeof d=="object"))throw new Error("A valid container element is required.");if(!e)if(i)e=document.createElement("div"),q(e),document.body.appendChild(e);else throw new Error(`Cannot find element: "${d}"`);let o;try{o=new URL(t)}catch{throw new Error(`"${t}" is not a valid URL.`)}let v=o.origin;if(typeof w=="object"&&Object.keys(w).forEach(s=>{o.searchParams.set(s,String(w[s]))}),a&&o.searchParams.set("template",a),M&&o.searchParams.set("x",M),i&&o.searchParams.set("headless","true"),z&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof p=="object"&&p.mode==null?p.mode="lite":o.searchParams.set("lite","true")),r&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),typeof p=="object"&&p.view==null&&r!=="headless"?p.view=r:o.searchParams.set("view",r)),typeof p=="string")try{new URL(p),o.searchParams.set("config",p)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else if(typeof p=="object")Object.keys(p).length>0&&o.searchParams.set("config","sdk");else throw new Error('"config" is not a valid URL or configuration object.');o.searchParams.set("embed","true"),o.searchParams.set("loading",i?"eager":E);let y=!1,C="Cannot call API methods after calling `destroy()`.",S=await new Promise(s=>{var x,P,N,O,T,I,R,$,D;if(!e)return;let W=e.dataset.height||e.style.height;if(W&&!i){let J=isNaN(Number(W))?W:W+"px";e.style.height=J}e.dataset.defaultStyles!=="false"&&!i&&((x=e.style).backgroundColor||(x.backgroundColor="#fff"),(P=e.style).border||(P.border="1px solid black"),(N=e.style).borderRadius||(N.borderRadius="8px"),(O=e.style).boxSizing||(O.boxSizing="border-box"),(T=e.style).padding||(T.padding="0"),(I=e.style).width||(I.width="100%"),(R=e.style).height||(R.height=e.style.height||"300px"),e.style.minHeight="200px",e.style.flexGrow="1",($=e.style).overflow||($.overflow="hidden"),(D=e.style).resize||(D.resize="vertical"));let Y="livecodes",X=e.querySelector(`iframe.${Y}`),A=X||document.createElement("iframe");A.classList.add(Y),A.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),A.setAttribute("allowtransparency","true"),A.setAttribute("allowpaymentrequest","true"),A.setAttribute("allowfullscreen","true"),A.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");let ae=E==="eager"?"eager":"lazy";A.setAttribute("loading",ae),i?q(A):(A.style.height="100%",A.style.minHeight="200px",A.style.width="100%",A.style.margin="0",A.style.border="0",A.style.borderRadius=e.style.borderRadius),addEventListener("message",function J(F){var K,Q;F.source!==A.contentWindow||F.origin!==v||((K=F.data)==null?void 0:K.type)!=="livecodes-get-config"||(removeEventListener("message",J),(Q=A.contentWindow)==null||Q.postMessage({type:"livecodes-config",payload:p},v))}),A.onload=()=>{s(A)},A.src=o.href,X||e.appendChild(A)}),b=new Promise(s=>{addEventListener("message",function x(P){var N;P.source!==S.contentWindow||P.origin!==v||((N=P.data)==null?void 0:N.type)!=="livecodes-ready"||(removeEventListener("message",x),s(),b.settled=!0)})}),k=()=>y?Promise.reject(C):new Promise(async s=>{var x;b.settled&&s();let P={type:"livecodes-load"};(x=S.contentWindow)==null||x.postMessage(P,v),await b,s()}),m=(s,x)=>new Promise(async(P,N)=>{var O;if(y)return N(C);await k();let T=oe();addEventListener("message",function I(R){var $,D;if(!(R.source!==S.contentWindow||R.origin!==v||(($=R.data)==null?void 0:$.type)!=="livecodes-api-response"||((D=R.data)==null?void 0:D.id)!==T)&&R.data.method===s){removeEventListener("message",I);let W=R.data.payload;W!=null&&W.error?N(W.error):P(W)}}),(O=S.contentWindow)==null||O.postMessage({method:s,id:T,args:x},v)}),u={},f=["load","ready","code","console","tests","destroy"],n=(s,x)=>{var P;if(y)throw new Error(C);return f.includes(s)?(m("watch",[s]),u[s]||(u[s]=[]),(P=u[s])==null||P.push(x),{remove:()=>{var N,O;u[s]=(N=u[s])==null?void 0:N.filter(T=>T!==x),((O=u[s])==null?void 0:O.length)===0&&m("watch",[s,"unsubscribe"])}}):{remove:()=>{}}},c=s=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[s];addEventListener("message",async s=>{var x,P,N,O;let T=c((P=(x=s.data)==null?void 0:x.type)!=null?P:"");if(s.source!==S.contentWindow||s.origin!==v||!T||!u[T])return;let I=(N=s.data)==null?void 0:N.payload;(O=u[T])==null||O.forEach(R=>{R(I)})});let l=()=>{var s;Object.values(u).forEach(x=>{x.length=0}),(s=S==null?void 0:S.remove)==null||s.call(S),y=!0};E==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((s,x)=>{s.forEach(async P=>{P.isIntersecting&&(await k(),x.unobserve(e))})},{rootMargin:"150px"}).observe(e);function q(s){s.style.position="absolute",s.style.top="0",s.style.visibility="hidden",s.style.opacity="0"}let oe=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>m("run"),format:s=>m("format",[s]),getShareUrl:s=>m("getShareUrl",[s]),getConfig:s=>m("getConfig",[s]),setConfig:s=>m("setConfig",[s]),getCode:()=>m("getCode"),show:(s,x)=>m("show",[s,x]),runTests:()=>m("runTests"),onChange:s=>n("code",s),watch:n,exec:(s,...x)=>m("exec",[s,...x]),destroy:()=>b.settled?m("destroy").then(l):y?Promise.reject(C):(l(),Promise.resolve())}}var Z;globalThis.document&&document.currentScript&&"prefill"in((Z=document.currentScript)==null?void 0:Z.dataset)&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(d=>{let g,t=d.dataset.options;if(t)try{g=JSON.parse(t)}catch{}let w,p=d.dataset.config||d.dataset.prefill;if(p)try{w=JSON.parse(p)}catch{}let M=encodeURIComponent(d.outerHTML);d.innerHTML="",H(d,{import:"dom/"+M,...g,...w?{config:w}:{}})})});var ke={appUrl:String,config:[Object,String],headless:Boolean,import:String,lite:Boolean,loading:String,params:Object,template:String,view:String,height:String},G=d=>JSON.parse(JSON.stringify(d)),Ce={props:ke,emits:["sdkReady"],setup(d,g){let{height:t,...w}=d,p=V(),M=V(t||""),j=V(),{config:z,...E}=w,a=JSON.stringify(z),r=JSON.stringify(E);return re(()=>{p.value&&H(p.value,G(w)).then(i=>{j.value=i,g.emit("sdkReady",i)})}),ee(d,async i=>{var e;if(!p.value||!j.value)return;let{height:o,...v}=i;M.value=o||"";let{config:y,...C}=v;typeof y=="string"&&(y=await fetch(y).then(S=>S.json())),JSON.stringify(C)!==r?(await((e=j.value)==null?void 0:e.destroy()),H(p.value,G(v)).then(S=>{j.value=S,g.emit("sdkReady",S)})):JSON.stringify(y)!==a&&j.value.setConfig(G(y)||{}),a=JSON.stringify(y),r=JSON.stringify(C)}),ie(()=>{var i;(i=j.value)==null||i.destroy()}),()=>{var i,e;return se("div",{ref:p,"data-height":M},((e=(i=g.slots).default)==null?void 0:e.call(i))||"")}}},Ae=Ce;const L=le({__name:"LiveCodes",props:{code:{},styles:{},loading:{},view:{},mode:{},height:{}},setup(d){const g=d,{isDark:t}=ce(),w={title:"Vue3-carousel",theme:t.value?"dark":"light",themeColor:"hsl(220, 14%, 80%)",view:g.view||"result",mode:g.mode||"simple",activeEditor:"script",tools:{status:"none"},style:{language:"css",content:g.styles||""},script:{language:"vue",content:g.code,title:"App.vue"},imports:{vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js","vue3-carousel":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs","vue3-carousel/carousel.css":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css"}};let p;const M=j=>{p=j};return ee(t,()=>{p&&p.setConfig({theme:t.value?"dark":"light"})}),(j,z)=>(ne(),de(pe(Ae),{appUrl:"https://v43.livecodes.io/",config:w,onSdkReady:M,style:ue({height:g.height||"250px"})},null,8,["style"]))}}),je=`<script setup>
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
  nativeCss: true,
  itemsToShow: 2.5,
  gap: 10,
  snapAlign: 'start',
}
<\/script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
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

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: #3b3f5c;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
`,Ue=`<script setup>
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
`,_e=`<script setup>
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
`;function B(d){return d.replace("../../dist/carousel.css","vue3-carousel/carousel.css").replace("../../dist/carousel.mjs","vue3-carousel")}const Le=B(Pe),Be=B(_e),We=B(Ue),ze=B(Ne),Ie=B(Ee),$e=B(je),De=B(Me),Je=B(Oe),Fe=B(Te),Ve=B(Re),qe=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}'),Ge={name:"examples.md"},Ye=Object.assign(Ge,{setup(d){return(g,t)=>(ne(),me("div",null,[t[0]||(t[0]=h("h1",{id:"examples",tabindex:"-1"},[U("Examples "),h("a",{class:"header-anchor",href:"#examples","aria-label":'Permalink to "Examples"'},"​")],-1)),t[1]||(t[1]=h("p",null,"This page showcases examples of the carousel component with live demos. Explore different configurations from basic to advanced, and use the provided code samples as starting points for your own implementations.",-1)),t[2]||(t[2]=h("h2",{id:"basic",tabindex:"-1"},[U("Basic "),h("a",{class:"header-anchor",href:"#basic","aria-label":'Permalink to "Basic"'},"​")],-1)),t[3]||(t[3]=h("p",null,"A simple implementation of the carousel with default settings.",-1)),_(L,{code:Le},null,8,["code"]),t[4]||(t[4]=h("h2",{id:"wrap-around",tabindex:"-1"},[U("Wrap Around "),h("a",{class:"header-anchor",href:"#wrap-around","aria-label":'Permalink to "Wrap Around"'},"​")],-1)),t[5]||(t[5]=h("p",null,"Demonstrates a carousel with continuous wrap-around functionality.",-1)),_(L,{code:Be},null,8,["code"]),t[6]||(t[6]=h("h2",{id:"vertical",tabindex:"-1"},[U("Vertical "),h("a",{class:"header-anchor",href:"#vertical","aria-label":'Permalink to "Vertical"'},"​")],-1)),t[7]||(t[7]=h("p",null,"Showcases a vertically scrolling carousel. Adjust the height to better fit your content.",-1)),_(L,{code:We,height:"475px"},null,8,["code"]),t[8]||(t[8]=h("h2",{id:"breakpoints",tabindex:"-1"},[U("Breakpoints "),h("a",{class:"header-anchor",href:"#breakpoints","aria-label":'Permalink to "Breakpoints"'},"​")],-1)),t[9]||(t[9]=h("p",null,"An example of a responsive carousel with breakpoints for varying screen sizes.",-1)),_(L,{code:ze},null,8,["code"]),t[10]||(t[10]=h("h2",{id:"autoplay",tabindex:"-1"},[U("Autoplay "),h("a",{class:"header-anchor",href:"#autoplay","aria-label":'Permalink to "Autoplay"'},"​")],-1)),t[11]||(t[11]=h("p",null,"Illustrates the carousel with autoplay functionality enabled.",-1)),_(L,{code:Ie},null,8,["code"]),t[12]||(t[12]=h("h2",{id:"mouse-wheel",tabindex:"-1"},[U("Mouse Wheel "),h("a",{class:"header-anchor",href:"#mouse-wheel","aria-label":'Permalink to "Mouse Wheel"'},"​")],-1)),t[13]||(t[13]=h("p",null,"Demonstrates the carousel with mouse wheel scrolling navigation enabled.",-1)),_(L,{code:Fe},null,8,["code"]),t[14]||(t[14]=h("h2",{id:"native-css",tabindex:"-1"},[U("Native CSS "),h("a",{class:"header-anchor",href:"#native-css","aria-label":'Permalink to "Native CSS"'},"​")],-1)),t[15]||(t[15]=h("p",null,"A scroll-snap carousel driven by the browser, with the regular navigation and pagination on top.",-1)),_(L,{code:Ve},null,8,["code"]),t[16]||(t[16]=h("h2",{id:"active-classes",tabindex:"-1"},[U("Active Classes "),h("a",{class:"header-anchor",href:"#active-classes","aria-label":'Permalink to "Active Classes"'},"​")],-1)),t[17]||(t[17]=h("p",null,"An example highlighting active items with custom classes.",-1)),_(L,{code:$e},null,8,["code"]),t[18]||(t[18]=h("h2",{id:"custom-navigation",tabindex:"-1"},[U("Custom Navigation "),h("a",{class:"header-anchor",href:"#custom-navigation","aria-label":'Permalink to "Custom Navigation"'},"​")],-1)),t[19]||(t[19]=h("p",null,"A demonstration of the carousel with fully customizable navigation controls.",-1)),_(L,{code:De,height:"260px"},null,8,["code"]),t[20]||(t[20]=h("h2",{id:"gallery",tabindex:"-1"},[U("Gallery "),h("a",{class:"header-anchor",href:"#gallery","aria-label":'Permalink to "Gallery"'},"​")],-1)),t[21]||(t[21]=h("p",null,"Transforms the carousel into a gallery-style component.",-1)),_(L,{code:Je,height:"455px"},null,8,["code"])]))}});export{qe as __pageData,Ye as default};
