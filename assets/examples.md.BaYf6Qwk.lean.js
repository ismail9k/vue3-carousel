import{p as G,v as ce,q as oe,x as ue,a8 as de,d as pe,u as me,o as ie,b as ge,P as he,k as L,c as ve,a2 as fe,G as U,a3 as F,a4 as W,j as k,a as $,M as Y}from"./chunks/framework.BNubF-Io.js";var ye=Object.create,se=Object.defineProperty,be=Object.getOwnPropertyDescriptor,we=Object.getOwnPropertyNames,xe=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty,ke=(u,g)=>()=>(g||u((g={exports:{}}).exports,g),g.exports),Ce=(u,g,l,b)=>{if(g&&typeof g=="object"||typeof g=="function")for(let p of we(g))!Se.call(u,p)&&p!==l&&se(u,p,{get:()=>g[p],enumerable:!(b=be(g,p))||b.enumerable});return u},Ae=(u,g,l)=>(l=u!=null?ye(xe(u)):{},Ce(!u||!u.__esModule?se(l,"default",{value:u,enumerable:!0}):l,u)),Pe=ke((u,g)=>{var l=function(){var b=String.fromCharCode,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",P={};function I(a,o){if(!P[a]){P[a]={};for(var i=0;i<a.length;i++)P[a][a.charAt(i)]=i}return P[a][o]}var j={compressToBase64:function(a){if(a==null)return"";var o=j._compress(a,6,function(i){return p.charAt(i)});switch(o.length%4){default:case 0:return o;case 1:return o+"===";case 2:return o+"==";case 3:return o+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:j._decompress(a.length,32,function(o){return I(p,a.charAt(o))})},compressToUTF16:function(a){return a==null?"":j._compress(a,15,function(o){return b(o+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:j._decompress(a.length,16384,function(o){return a.charCodeAt(o)-32})},compressToUint8Array:function(a){for(var o=j.compress(a),i=new Uint8Array(o.length*2),e=0,r=o.length;e<r;e++){var h=o.charCodeAt(e);i[e*2]=h>>>8,i[e*2+1]=h%256}return i},decompressFromUint8Array:function(a){if(a==null)return j.decompress(a);for(var o=new Array(a.length/2),i=0,e=o.length;i<e;i++)o[i]=a[i*2]*256+a[i*2+1];var r=[];return o.forEach(function(h){r.push(b(h))}),j.decompress(r.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":j._compress(a,6,function(o){return E.charAt(o)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),j._decompress(a.length,32,function(o){return I(E,a.charAt(o))}))},compress:function(a){return j._compress(a,16,function(o){return b(o)})},_compress:function(a,o,i){if(a==null)return"";var e,r,h={},y={},C="",x="",f="",S=2,m=3,d=2,v=[],t=0,c=0,n;for(n=0;n<a.length;n+=1)if(C=a.charAt(n),Object.prototype.hasOwnProperty.call(h,C)||(h[C]=m++,y[C]=!0),x=f+C,Object.prototype.hasOwnProperty.call(h,x))f=x;else{if(Object.prototype.hasOwnProperty.call(y,f)){if(f.charCodeAt(0)<256){for(e=0;e<d;e++)t=t<<1,c==o-1?(c=0,v.push(i(t)),t=0):c++;for(r=f.charCodeAt(0),e=0;e<8;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}else{for(r=1,e=0;e<d;e++)t=t<<1|r,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=0;for(r=f.charCodeAt(0),e=0;e<16;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}S--,S==0&&(S=Math.pow(2,d),d++),delete y[f]}else for(r=h[f],e=0;e<d;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;S--,S==0&&(S=Math.pow(2,d),d++),h[x]=m++,f=String(C)}if(f!==""){if(Object.prototype.hasOwnProperty.call(y,f)){if(f.charCodeAt(0)<256){for(e=0;e<d;e++)t=t<<1,c==o-1?(c=0,v.push(i(t)),t=0):c++;for(r=f.charCodeAt(0),e=0;e<8;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}else{for(r=1,e=0;e<d;e++)t=t<<1|r,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=0;for(r=f.charCodeAt(0),e=0;e<16;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}S--,S==0&&(S=Math.pow(2,d),d++),delete y[f]}else for(r=h[f],e=0;e<d;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;S--,S==0&&(S=Math.pow(2,d),d++)}for(r=2,e=0;e<d;e++)t=t<<1|r&1,c==o-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;for(;;)if(t=t<<1,c==o-1){v.push(i(t));break}else c++;return v.join("")},decompress:function(a){return a==null?"":a==""?null:j._decompress(a.length,32768,function(o){return a.charCodeAt(o)})},_decompress:function(a,o,i){var e=[],r=4,h=4,y=3,C="",x=[],f,S,m,d,v,t,c,n={val:i(0),position:o,index:1};for(f=0;f<3;f+=1)e[f]=f;for(m=0,v=Math.pow(2,2),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;switch(m){case 0:for(m=0,v=Math.pow(2,8),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;c=b(m);break;case 1:for(m=0,v=Math.pow(2,16),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;c=b(m);break;case 2:return""}for(e[3]=c,S=c,x.push(c);;){if(n.index>a)return"";for(m=0,v=Math.pow(2,y),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;switch(c=m){case 0:for(m=0,v=Math.pow(2,8),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;e[h++]=b(m),c=h-1,r--;break;case 1:for(m=0,v=Math.pow(2,16),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=o,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;e[h++]=b(m),c=h-1,r--;break;case 2:return x.join("")}if(r==0&&(r=Math.pow(2,y),y++),e[c])C=e[c];else if(c===h)C=S+S.charAt(0);else return null;x.push(C),e[h++]=S+C.charAt(0),r--,S=C,r==0&&(r=Math.pow(2,y),y++)}}};return j}();typeof g<"u"&&g!=null&&(g.exports=l)});Ae(Pe());async function K(u,g={}){typeof u=="object"&&!(u instanceof HTMLElement)&&u.view==="headless"&&(g=u,u=null);let{appUrl:l="https://livecodes.io/",params:b={},config:p={},import:E,headless:P,lite:I,loading:j="lazy",template:a,view:o}=g,i=P||o==="headless",e=null;if(typeof u=="string")e=document.querySelector(u);else if(u instanceof HTMLElement)e=u;else if(!(i&&typeof u=="object"))throw new Error("A valid container element is required.");if(!e)if(i)e=document.createElement("div"),Q(e),document.body.appendChild(e);else throw new Error(`Cannot find element: "${u}"`);let r;try{r=new URL(l)}catch{throw new Error(`"${l}" is not a valid URL.`)}let h=r.origin;if(typeof b=="object"&&Object.keys(b).forEach(s=>{r.searchParams.set(s,String(b[s]))}),a&&r.searchParams.set("template",a),E&&r.searchParams.set("x",E),i&&r.searchParams.set("headless","true"),I&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof p=="object"&&p.mode==null?p.mode="lite":r.searchParams.set("lite","true")),o&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),typeof p=="object"&&p.view==null&&o!=="headless"?p.view=o:r.searchParams.set("view",o)),typeof p=="string")try{new URL(p),r.searchParams.set("config",p)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else if(typeof p=="object")Object.keys(p).length>0&&r.searchParams.set("config","sdk");else throw new Error('"config" is not a valid URL or configuration object.');r.searchParams.set("embed","true"),r.searchParams.set("loading",i?"eager":j);let y=!1,C="Cannot call API methods after calling `destroy()`.",x=await new Promise(s=>{var w,N,O,T,_,q,M,J,D;if(!e)return;let R=e.dataset.height||e.style.height;if(R&&!i){let H=isNaN(Number(R))?R:R+"px";e.style.height=H}e.dataset.defaultStyles!=="false"&&!i&&((w=e.style).backgroundColor||(w.backgroundColor="#fff"),(N=e.style).border||(N.border="1px solid black"),(O=e.style).borderRadius||(O.borderRadius="8px"),(T=e.style).boxSizing||(T.boxSizing="border-box"),(_=e.style).padding||(_.padding="0"),(q=e.style).width||(q.width="100%"),(M=e.style).height||(M.height=e.style.height||"300px"),e.style.minHeight="200px",e.style.flexGrow="1",(J=e.style).overflow||(J.overflow="hidden"),(D=e.style).resize||(D.resize="vertical"));let Z="livecodes",ee=e.querySelector(`iframe.${Z}`),A=ee||document.createElement("iframe");A.classList.add(Z),A.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),A.setAttribute("allowtransparency","true"),A.setAttribute("allowpaymentrequest","true"),A.setAttribute("allowfullscreen","true"),A.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");let le=j==="eager"?"eager":"lazy";A.setAttribute("loading",le),i?Q(A):(A.style.height="100%",A.style.minHeight="200px",A.style.width="100%",A.style.margin="0",A.style.border="0",A.style.borderRadius=e.style.borderRadius),addEventListener("message",function H(V){var te,re;V.source!==A.contentWindow||V.origin!==h||((te=V.data)==null?void 0:te.type)!=="livecodes-get-config"||(removeEventListener("message",H),(re=A.contentWindow)==null||re.postMessage({type:"livecodes-config",payload:p},h))}),A.onload=()=>{s(A)},A.src=r.href,ee||e.appendChild(A)}),f=new Promise(s=>{addEventListener("message",function w(N){var O;N.source!==x.contentWindow||N.origin!==h||((O=N.data)==null?void 0:O.type)!=="livecodes-ready"||(removeEventListener("message",w),s(),f.settled=!0)})}),S=()=>y?Promise.reject(C):new Promise(async s=>{var w;f.settled&&s();let N={type:"livecodes-load"};(w=x.contentWindow)==null||w.postMessage(N,h),await f,s()}),m=(s,w)=>new Promise(async(N,O)=>{var T;if(y)return O(C);await S();let _=ne();addEventListener("message",function q(M){var J,D;if(!(M.source!==x.contentWindow||M.origin!==h||((J=M.data)==null?void 0:J.type)!=="livecodes-api-response"||((D=M.data)==null?void 0:D.id)!==_)&&M.data.method===s){removeEventListener("message",q);let R=M.data.payload;R!=null&&R.error?O(R.error):N(R)}}),(T=x.contentWindow)==null||T.postMessage({method:s,id:_,args:w},h)}),d={},v=["load","ready","code","console","tests","destroy"],t=(s,w)=>{var N;if(y)throw new Error(C);return v.includes(s)?(m("watch",[s]),d[s]||(d[s]=[]),(N=d[s])==null||N.push(w),{remove:()=>{var O,T;d[s]=(O=d[s])==null?void 0:O.filter(_=>_!==w),((T=d[s])==null?void 0:T.length)===0&&m("watch",[s,"unsubscribe"])}}):{remove:()=>{}}},c=s=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[s];addEventListener("message",async s=>{var w,N,O,T;let _=c((N=(w=s.data)==null?void 0:w.type)!=null?N:"");if(s.source!==x.contentWindow||s.origin!==h||!_||!d[_])return;let q=(O=s.data)==null?void 0:O.payload;(T=d[_])==null||T.forEach(M=>{M(q)})});let n=()=>{var s;Object.values(d).forEach(w=>{w.length=0}),(s=x==null?void 0:x.remove)==null||s.call(x),y=!0};j==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((s,w)=>{s.forEach(async N=>{N.isIntersecting&&(await S(),w.unobserve(e))})},{rootMargin:"150px"}).observe(e);function Q(s){s.style.position="absolute",s.style.top="0",s.style.visibility="hidden",s.style.opacity="0"}let ne=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>S(),run:()=>m("run"),format:s=>m("format",[s]),getShareUrl:s=>m("getShareUrl",[s]),getConfig:s=>m("getConfig",[s]),setConfig:s=>m("setConfig",[s]),getCode:()=>m("getCode"),show:(s,w)=>m("show",[s,w]),runTests:()=>m("runTests"),onChange:s=>t("code",s),watch:t,exec:(s,...w)=>m("exec",[s,...w]),destroy:()=>f.settled?m("destroy").then(n):y?Promise.reject(C):(n(),Promise.resolve())}}var ae;globalThis.document&&document.currentScript&&"prefill"in((ae=document.currentScript)==null?void 0:ae.dataset)&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(u=>{let g,l=u.dataset.options;if(l)try{g=JSON.parse(l)}catch{}let b,p=u.dataset.config||u.dataset.prefill;if(p)try{b=JSON.parse(p)}catch{}let E=encodeURIComponent(u.outerHTML);u.innerHTML="",K(u,{import:"dom/"+E,...g,...b?{config:b}:{}})})});var je={appUrl:String,config:[Object,String],headless:Boolean,import:String,lite:Boolean,loading:String,params:Object,template:String,view:String,height:String},X=u=>JSON.parse(JSON.stringify(u)),Ne={props:je,emits:["sdkReady"],setup(u,g){let{height:l,...b}=u,p=G(),E=G(l||""),P=G(),{config:I,...j}=b,a=JSON.stringify(I),o=JSON.stringify(j);return ce(()=>{p.value&&K(p.value,X(b)).then(i=>{P.value=i,g.emit("sdkReady",i)})}),oe(u,async i=>{var e;if(!p.value||!P.value)return;let{height:r,...h}=i;E.value=r||"";let{config:y,...C}=h;typeof y=="string"&&(y=await fetch(y).then(x=>x.json())),JSON.stringify(C)!==o?(await((e=P.value)==null?void 0:e.destroy()),K(p.value,X(h)).then(x=>{P.value=x,g.emit("sdkReady",x)})):JSON.stringify(y)!==a&&P.value.setConfig(X(y)||{}),a=JSON.stringify(y),o=JSON.stringify(C)}),ue(()=>{var i;(i=P.value)==null||i.destroy()}),()=>{var i,e;return de("div",{ref:p,"data-height":E},((e=(i=g.slots).default)==null?void 0:e.call(i))||"")}}},Oe=Ne;const z=pe({__name:"LiveCodes",props:{code:{},styles:{},loading:{},view:{},mode:{},height:{}},setup(u){const g=u,{isDark:l}=me(),b={title:"Vue3-carousel",theme:l.value?"dark":"light",themeColor:"hsl(220, 14%, 80%)",view:g.view||"result",mode:g.mode||"simple",activeEditor:"script",tools:{status:"none"},style:{language:"css",content:g.styles||""},script:{language:"vue",content:g.code,title:"App.vue"},imports:{vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js","vue3-carousel":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs","vue3-carousel/carousel.css":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css"}};let p;const E=P=>{p=P};return oe(l,()=>{p&&p.setConfig({theme:l.value?"dark":"light"})}),(P,I)=>(ie(),ge(L(Oe),{appUrl:"https://v42.livecodes.io/",config:b,onSdkReady:E,style:he({height:g.height||"250px"})},null,8,["style"]))}}),B={basic:{code:`
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
};
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
`.trimStart(),styles:`
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
`.trimStart()},wrapAround:{code:`
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  wrapAround: true,
};
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
`.trimStart(),styles:`
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
`.trimStart()},vertical:{code:`
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const carouselConfig = {
  dir: 'ttb',
  wrapAround: true,
  itemsToShow: 2,
  snapAlign: 'center',
  height: '400px',
  gap: 5,
};

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));
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
`.trimStart(),styles:`
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
`.trimStart()},breakpoints:{code:`
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

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
};
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
`.trimStart(),styles:`
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
`.trimStart()},autoplay:{code:`
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
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
`.trimStart(),styles:`
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
`.trimStart()},activeClasses:{code:`
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const carouselConfig = {
  height: 200,
  itemsToShow: 3.5,
  wrapAround: true,
};
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
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition: opacity var(--carousel-transition),
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
`.trimStart(),styles:`
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
`.trimStart()},customNavigation:{code:`
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

const carouselRef = ref();
const currentSlide = ref(1);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
};
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
`.trimStart(),styles:`
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
`.trimStart()},gallery:{code:`
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref } from 'vue';

const currentSlide = ref(0);

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
  height: 320,
};

const thumbnailsConfig = {
  height: 80,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
};

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));
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
`.trimStart(),styles:`
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
`.trimStart()}},_e=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}'),Ee={name:"examples.md"},Me=Object.assign(Ee,{setup(u){return(g,l)=>(ie(),ve("div",null,[l[0]||(l[0]=fe('<h1 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h1><p>If you&#39;re experiencing issues loading the live examples or you&#39;re browsing on a mobile device, visit the <a href="/examples-fallback.html">Fallback Examples Page</a> for a better experience.</p><h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><p>A simple implementation of the carousel with default settings.</p>',4)),U(z,F(W(L(B).basic)),null,16),l[1]||(l[1]=k("h2",{id:"wrap-around",tabindex:"-1"},[$("Wrap Around "),k("a",{class:"header-anchor",href:"#wrap-around","aria-label":'Permalink to "Wrap Around"'},"​")],-1)),l[2]||(l[2]=k("p",null,"Demonstrates a carousel with continuous wrap-around functionality.",-1)),U(z,F(W(L(B).wrapAround)),null,16),l[3]||(l[3]=k("h2",{id:"vertical",tabindex:"-1"},[$("Vertical "),k("a",{class:"header-anchor",href:"#vertical","aria-label":'Permalink to "Vertical"'},"​")],-1)),l[4]||(l[4]=k("p",null,"Showcases a vertically scrolling carousel. Adjust the height to better fit your content.",-1)),U(z,Y(L(B).vertical,{height:"475px"}),null,16),l[5]||(l[5]=k("h2",{id:"breakpoints",tabindex:"-1"},[$("Breakpoints "),k("a",{class:"header-anchor",href:"#breakpoints","aria-label":'Permalink to "Breakpoints"'},"​")],-1)),l[6]||(l[6]=k("p",null,"An example of a responsive carousel with breakpoints for varying screen sizes.",-1)),U(z,F(W(L(B).breakpoints)),null,16),l[7]||(l[7]=k("h2",{id:"autoplay",tabindex:"-1"},[$("Autoplay "),k("a",{class:"header-anchor",href:"#autoplay","aria-label":'Permalink to "Autoplay"'},"​")],-1)),l[8]||(l[8]=k("p",null,"Illustrates the carousel with autoplay functionality enabled.",-1)),U(z,F(W(L(B).autoplay)),null,16),l[9]||(l[9]=k("h2",{id:"active-classes",tabindex:"-1"},[$("Active Classes "),k("a",{class:"header-anchor",href:"#active-classes","aria-label":'Permalink to "Active Classes"'},"​")],-1)),l[10]||(l[10]=k("p",null,"An example highlighting active items with custom classes.",-1)),U(z,F(W(L(B).activeClasses)),null,16),l[11]||(l[11]=k("h2",{id:"custom-navigation",tabindex:"-1"},[$("Custom Navigation "),k("a",{class:"header-anchor",href:"#custom-navigation","aria-label":'Permalink to "Custom Navigation"'},"​")],-1)),l[12]||(l[12]=k("p",null,"A demonstration of the carousel with fully customizable navigation controls.",-1)),U(z,Y(L(B).customNavigation,{height:"260px"}),null,16),l[13]||(l[13]=k("h2",{id:"gallery",tabindex:"-1"},[$("Gallery "),k("a",{class:"header-anchor",href:"#gallery","aria-label":'Permalink to "Gallery"'},"​")],-1)),l[14]||(l[14]=k("p",null,"Transforms the carousel into a gallery-style component.",-1)),U(z,Y(L(B).gallery,{height:"455px"}),null,16)]))}});export{_e as __pageData,Me as default};
