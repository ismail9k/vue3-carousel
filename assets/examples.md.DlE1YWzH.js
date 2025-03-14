import{p as G,v as ce,q as ae,x as ue,a9 as de,d as pe,u as me,o as ie,b as ge,P as he,k as R,c as ve,a2 as fe,G as U,a3 as D,a4 as J,j as y,a as I,M as Y}from"./chunks/framework.CKsG0j0T.js";var be=Object.create,se=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,we=Object.getOwnPropertyNames,xe=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty,ke=(u,g)=>()=>(g||u((g={exports:{}}).exports,g),g.exports),Ce=(u,g,l,w)=>{if(g&&typeof g=="object"||typeof g=="function")for(let p of we(g))!Se.call(u,p)&&p!==l&&se(u,p,{get:()=>g[p],enumerable:!(w=ye(g,p))||w.enumerable});return u},Ae=(u,g,l)=>(l=u!=null?be(xe(u)):{},Ce(!u||!u.__esModule?se(l,"default",{value:u,enumerable:!0}):l,u)),Pe=ke((u,g)=>{var l=function(){var w=String.fromCharCode,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",T="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",P={};function $(o,a){if(!P[o]){P[o]={};for(var i=0;i<o.length;i++)P[o][o.charAt(i)]=i}return P[o][a]}var j={compressToBase64:function(o){if(o==null)return"";var a=j._compress(o,6,function(i){return p.charAt(i)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(o){return o==null?"":o==""?null:j._decompress(o.length,32,function(a){return $(p,o.charAt(a))})},compressToUTF16:function(o){return o==null?"":j._compress(o,15,function(a){return w(a+32)})+" "},decompressFromUTF16:function(o){return o==null?"":o==""?null:j._decompress(o.length,16384,function(a){return o.charCodeAt(a)-32})},compressToUint8Array:function(o){for(var a=j.compress(o),i=new Uint8Array(a.length*2),e=0,r=a.length;e<r;e++){var h=a.charCodeAt(e);i[e*2]=h>>>8,i[e*2+1]=h%256}return i},decompressFromUint8Array:function(o){if(o==null)return j.decompress(o);for(var a=new Array(o.length/2),i=0,e=a.length;i<e;i++)a[i]=o[i*2]*256+o[i*2+1];var r=[];return a.forEach(function(h){r.push(w(h))}),j.decompress(r.join(""))},compressToEncodedURIComponent:function(o){return o==null?"":j._compress(o,6,function(a){return T.charAt(a)})},decompressFromEncodedURIComponent:function(o){return o==null?"":o==""?null:(o=o.replace(/ /g,"+"),j._decompress(o.length,32,function(a){return $(T,o.charAt(a))}))},compress:function(o){return j._compress(o,16,function(a){return w(a)})},_compress:function(o,a,i){if(o==null)return"";var e,r,h={},b={},C="",S="",f="",k=2,m=3,d=2,v=[],t=0,c=0,n;for(n=0;n<o.length;n+=1)if(C=o.charAt(n),Object.prototype.hasOwnProperty.call(h,C)||(h[C]=m++,b[C]=!0),S=f+C,Object.prototype.hasOwnProperty.call(h,S))f=S;else{if(Object.prototype.hasOwnProperty.call(b,f)){if(f.charCodeAt(0)<256){for(e=0;e<d;e++)t=t<<1,c==a-1?(c=0,v.push(i(t)),t=0):c++;for(r=f.charCodeAt(0),e=0;e<8;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}else{for(r=1,e=0;e<d;e++)t=t<<1|r,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=0;for(r=f.charCodeAt(0),e=0;e<16;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}k--,k==0&&(k=Math.pow(2,d),d++),delete b[f]}else for(r=h[f],e=0;e<d;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;k--,k==0&&(k=Math.pow(2,d),d++),h[S]=m++,f=String(C)}if(f!==""){if(Object.prototype.hasOwnProperty.call(b,f)){if(f.charCodeAt(0)<256){for(e=0;e<d;e++)t=t<<1,c==a-1?(c=0,v.push(i(t)),t=0):c++;for(r=f.charCodeAt(0),e=0;e<8;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}else{for(r=1,e=0;e<d;e++)t=t<<1|r,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=0;for(r=f.charCodeAt(0),e=0;e<16;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1}k--,k==0&&(k=Math.pow(2,d),d++),delete b[f]}else for(r=h[f],e=0;e<d;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;k--,k==0&&(k=Math.pow(2,d),d++)}for(r=2,e=0;e<d;e++)t=t<<1|r&1,c==a-1?(c=0,v.push(i(t)),t=0):c++,r=r>>1;for(;;)if(t=t<<1,c==a-1){v.push(i(t));break}else c++;return v.join("")},decompress:function(o){return o==null?"":o==""?null:j._decompress(o.length,32768,function(a){return o.charCodeAt(a)})},_decompress:function(o,a,i){var e=[],r=4,h=4,b=3,C="",S=[],f,k,m,d,v,t,c,n={val:i(0),position:a,index:1};for(f=0;f<3;f+=1)e[f]=f;for(m=0,v=Math.pow(2,2),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;switch(m){case 0:for(m=0,v=Math.pow(2,8),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;c=w(m);break;case 1:for(m=0,v=Math.pow(2,16),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;c=w(m);break;case 2:return""}for(e[3]=c,k=c,S.push(c);;){if(n.index>o)return"";for(m=0,v=Math.pow(2,b),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;switch(c=m){case 0:for(m=0,v=Math.pow(2,8),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;e[h++]=w(m),c=h-1,r--;break;case 1:for(m=0,v=Math.pow(2,16),t=1;t!=v;)d=n.val&n.position,n.position>>=1,n.position==0&&(n.position=a,n.val=i(n.index++)),m|=(d>0?1:0)*t,t<<=1;e[h++]=w(m),c=h-1,r--;break;case 2:return S.join("")}if(r==0&&(r=Math.pow(2,b),b++),e[c])C=e[c];else if(c===h)C=k+k.charAt(0);else return null;S.push(C),e[h++]=k+C.charAt(0),r--,k=C,r==0&&(r=Math.pow(2,b),b++)}}};return j}();typeof g<"u"&&g!=null&&(g.exports=l)});Ae(Pe());async function K(u,g={}){typeof u=="object"&&!(u instanceof HTMLElement)&&u.view==="headless"&&(g=u,u=null);let{appUrl:l="https://livecodes.io/",params:w={},config:p={},import:T,headless:P,lite:$,loading:j="lazy",template:o,view:a}=g,i=P||a==="headless",e=null;if(typeof u=="string")e=document.querySelector(u);else if(u instanceof HTMLElement)e=u;else if(!(i&&typeof u=="object"))throw new Error("A valid container element is required.");if(!e)if(i)e=document.createElement("div"),Q(e),document.body.appendChild(e);else throw new Error(`Cannot find element: "${u}"`);let r;try{r=new URL(l)}catch{throw new Error(`"${l}" is not a valid URL.`)}let h=r.origin;if(typeof w=="object"&&Object.keys(w).forEach(s=>{r.searchParams.set(s,String(w[s]))}),o&&r.searchParams.set("template",o),T&&r.searchParams.set("x",T),i&&r.searchParams.set("headless","true"),$&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof p=="object"&&p.mode==null?p.mode="lite":r.searchParams.set("lite","true")),a&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),typeof p=="object"&&p.view==null&&a!=="headless"?p.view=a:r.searchParams.set("view",a)),typeof p=="string")try{new URL(p),r.searchParams.set("config",p)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else if(typeof p=="object")Object.keys(p).length>0&&r.searchParams.set("config","sdk");else throw new Error('"config" is not a valid URL or configuration object.');r.searchParams.set("embed","true"),r.searchParams.set("loading",i?"eager":j);let b=!1,C="Cannot call API methods after calling `destroy()`.",S=await new Promise(s=>{var x,N,O,E,M,q,_,F,W;if(!e)return;let L=e.dataset.height||e.style.height;if(L&&!i){let H=isNaN(Number(L))?L:L+"px";e.style.height=H}e.dataset.defaultStyles!=="false"&&!i&&((x=e.style).backgroundColor||(x.backgroundColor="#fff"),(N=e.style).border||(N.border="1px solid black"),(O=e.style).borderRadius||(O.borderRadius="8px"),(E=e.style).boxSizing||(E.boxSizing="border-box"),(M=e.style).padding||(M.padding="0"),(q=e.style).width||(q.width="100%"),(_=e.style).height||(_.height=e.style.height||"300px"),e.style.minHeight="200px",e.style.flexGrow="1",(F=e.style).overflow||(F.overflow="hidden"),(W=e.style).resize||(W.resize="vertical"));let Z="livecodes",ee=e.querySelector(`iframe.${Z}`),A=ee||document.createElement("iframe");A.classList.add(Z),A.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),A.setAttribute("allowtransparency","true"),A.setAttribute("allowpaymentrequest","true"),A.setAttribute("allowfullscreen","true"),A.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");let ne=j==="eager"?"eager":"lazy";A.setAttribute("loading",ne),i?Q(A):(A.style.height="100%",A.style.minHeight="200px",A.style.width="100%",A.style.margin="0",A.style.border="0",A.style.borderRadius=e.style.borderRadius),addEventListener("message",function H(V){var te,re;V.source!==A.contentWindow||V.origin!==h||((te=V.data)==null?void 0:te.type)!=="livecodes-get-config"||(removeEventListener("message",H),(re=A.contentWindow)==null||re.postMessage({type:"livecodes-config",payload:p},h))}),A.onload=()=>{s(A)},A.src=r.href,ee||e.appendChild(A)}),f=new Promise(s=>{addEventListener("message",function x(N){var O;N.source!==S.contentWindow||N.origin!==h||((O=N.data)==null?void 0:O.type)!=="livecodes-ready"||(removeEventListener("message",x),s(),f.settled=!0)})}),k=()=>b?Promise.reject(C):new Promise(async s=>{var x;f.settled&&s();let N={type:"livecodes-load"};(x=S.contentWindow)==null||x.postMessage(N,h),await f,s()}),m=(s,x)=>new Promise(async(N,O)=>{var E;if(b)return O(C);await k();let M=le();addEventListener("message",function q(_){var F,W;if(!(_.source!==S.contentWindow||_.origin!==h||((F=_.data)==null?void 0:F.type)!=="livecodes-api-response"||((W=_.data)==null?void 0:W.id)!==M)&&_.data.method===s){removeEventListener("message",q);let L=_.data.payload;L!=null&&L.error?O(L.error):N(L)}}),(E=S.contentWindow)==null||E.postMessage({method:s,id:M,args:x},h)}),d={},v=["load","ready","code","console","tests","destroy"],t=(s,x)=>{var N;if(b)throw new Error(C);return v.includes(s)?(m("watch",[s]),d[s]||(d[s]=[]),(N=d[s])==null||N.push(x),{remove:()=>{var O,E;d[s]=(O=d[s])==null?void 0:O.filter(M=>M!==x),((E=d[s])==null?void 0:E.length)===0&&m("watch",[s,"unsubscribe"])}}):{remove:()=>{}}},c=s=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[s];addEventListener("message",async s=>{var x,N,O,E;let M=c((N=(x=s.data)==null?void 0:x.type)!=null?N:"");if(s.source!==S.contentWindow||s.origin!==h||!M||!d[M])return;let q=(O=s.data)==null?void 0:O.payload;(E=d[M])==null||E.forEach(_=>{_(q)})});let n=()=>{var s;Object.values(d).forEach(x=>{x.length=0}),(s=S==null?void 0:S.remove)==null||s.call(S),b=!0};j==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((s,x)=>{s.forEach(async N=>{N.isIntersecting&&(await k(),x.unobserve(e))})},{rootMargin:"150px"}).observe(e);function Q(s){s.style.position="absolute",s.style.top="0",s.style.visibility="hidden",s.style.opacity="0"}let le=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>m("run"),format:s=>m("format",[s]),getShareUrl:s=>m("getShareUrl",[s]),getConfig:s=>m("getConfig",[s]),setConfig:s=>m("setConfig",[s]),getCode:()=>m("getCode"),show:(s,x)=>m("show",[s,x]),runTests:()=>m("runTests"),onChange:s=>t("code",s),watch:t,exec:(s,...x)=>m("exec",[s,...x]),destroy:()=>f.settled?m("destroy").then(n):b?Promise.reject(C):(n(),Promise.resolve())}}var oe;globalThis.document&&document.currentScript&&"prefill"in((oe=document.currentScript)==null?void 0:oe.dataset)&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(u=>{let g,l=u.dataset.options;if(l)try{g=JSON.parse(l)}catch{}let w,p=u.dataset.config||u.dataset.prefill;if(p)try{w=JSON.parse(p)}catch{}let T=encodeURIComponent(u.outerHTML);u.innerHTML="",K(u,{import:"dom/"+T,...g,...w?{config:w}:{}})})});var je={appUrl:String,config:[Object,String],headless:Boolean,import:String,lite:Boolean,loading:String,params:Object,template:String,view:String,height:String},X=u=>JSON.parse(JSON.stringify(u)),Ne={props:je,emits:["sdkReady"],setup(u,g){let{height:l,...w}=u,p=G(),T=G(l||""),P=G(),{config:$,...j}=w,o=JSON.stringify($),a=JSON.stringify(j);return ce(()=>{p.value&&K(p.value,X(w)).then(i=>{P.value=i,g.emit("sdkReady",i)})}),ae(u,async i=>{var e;if(!p.value||!P.value)return;let{height:r,...h}=i;T.value=r||"";let{config:b,...C}=h;typeof b=="string"&&(b=await fetch(b).then(S=>S.json())),JSON.stringify(C)!==a?(await((e=P.value)==null?void 0:e.destroy()),K(p.value,X(h)).then(S=>{P.value=S,g.emit("sdkReady",S)})):JSON.stringify(b)!==o&&P.value.setConfig(X(b)||{}),o=JSON.stringify(b),a=JSON.stringify(C)}),ue(()=>{var i;(i=P.value)==null||i.destroy()}),()=>{var i,e;return de("div",{ref:p,"data-height":T},((e=(i=g.slots).default)==null?void 0:e.call(i))||"")}}},Oe=Ne;const z=pe({__name:"LiveCodes",props:{code:{},styles:{},loading:{},view:{},mode:{},height:{}},setup(u){const g=u,{isDark:l}=me(),w={title:"Vue3-carousel",theme:l.value?"dark":"light",themeColor:"hsl(220, 14%, 80%)",view:g.view||"result",mode:g.mode||"simple",activeEditor:"script",tools:{status:"none"},style:{language:"css",content:g.styles||""},script:{language:"vue",content:g.code,title:"App.vue"},imports:{vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js","vue3-carousel":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs","vue3-carousel/carousel.css":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css"}};let p;const T=P=>{p=P};return ae(l,()=>{p&&p.setConfig({theme:l.value?"dark":"light"})}),(P,$)=>(ie(),ge(R(Oe),{appUrl:"https://v42.livecodes.io/",config:w,onSdkReady:T,style:he({height:g.height||"250px"})},null,8,["style"]))}}),B={basic:{code:`
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
`.trimStart()},mouseScroll:{code:`
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { ref } from 'vue';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const threshold = ref(30);

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  mouseScroll: true,
  mouseScrollThreshold: threshold.value,
  wrapAround: true,
};

function updateThreshold(event) {
  threshold.value = Number(event.target.value);
  config.mouseScrollThreshold = threshold.value;
}
<\/script>

<template>
  <div class="example-container">
    <h3>Mouse Scroll Navigation</h3>
    <p>Scroll your mouse wheel over the carousel to navigate through slides</p>
    
    <div class="threshold-control">
      <label for="threshold">Mouse Scroll Threshold: {{ threshold }}</label>
      <input 
        id="threshold" 
        type="range" 
        min="10" 
        max="100" 
        step="10" 
        v-model="threshold"
        @input="updateThreshold"
      />
      <small>Higher values require more scrolling (less sensitive)</small>
    </div>
    
    <Carousel v-bind="config">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>
`.trimStart(),styles:`
:root {
  background-color: #242424;
}

.example-container {
  color: white;
  text-align: center;
}

.threshold-control {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

input[type="range"] {
  width: 200px;
}

small {
  color: #888;
  font-size: 0.8em;
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
`.trimStart()}},Me=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}'),Te={name:"examples.md"},_e=Object.assign(Te,{setup(u){return(g,l)=>(ie(),ve("div",null,[l[0]||(l[0]=fe('<h1 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h1><p>If you&#39;re experiencing issues loading the live examples or you&#39;re browsing on a mobile device, visit the <a href="/examples-fallback.html">Fallback Examples Page</a> for a better experience.</p><h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><p>A simple implementation of the carousel with default settings.</p>',4)),U(z,D(J(R(B).basic)),null,16),l[1]||(l[1]=y("h2",{id:"wrap-around",tabindex:"-1"},[I("Wrap Around "),y("a",{class:"header-anchor",href:"#wrap-around","aria-label":'Permalink to "Wrap Around"'},"​")],-1)),l[2]||(l[2]=y("p",null,"Demonstrates a carousel with continuous wrap-around functionality.",-1)),U(z,D(J(R(B).wrapAround)),null,16),l[3]||(l[3]=y("h2",{id:"vertical",tabindex:"-1"},[I("Vertical "),y("a",{class:"header-anchor",href:"#vertical","aria-label":'Permalink to "Vertical"'},"​")],-1)),l[4]||(l[4]=y("p",null,"Showcases a vertically scrolling carousel. Adjust the height to better fit your content.",-1)),U(z,Y(R(B).vertical,{height:"475px"}),null,16),l[5]||(l[5]=y("h2",{id:"breakpoints",tabindex:"-1"},[I("Breakpoints "),y("a",{class:"header-anchor",href:"#breakpoints","aria-label":'Permalink to "Breakpoints"'},"​")],-1)),l[6]||(l[6]=y("p",null,"An example of a responsive carousel with breakpoints for varying screen sizes.",-1)),U(z,D(J(R(B).breakpoints)),null,16),l[7]||(l[7]=y("h2",{id:"autoplay",tabindex:"-1"},[I("Autoplay "),y("a",{class:"header-anchor",href:"#autoplay","aria-label":'Permalink to "Autoplay"'},"​")],-1)),l[8]||(l[8]=y("p",null,"Illustrates the carousel with autoplay functionality enabled.",-1)),U(z,D(J(R(B).autoplay)),null,16),l[9]||(l[9]=y("h2",{id:"mouse-scroll",tabindex:"-1"},[I("Mouse Scroll "),y("a",{class:"header-anchor",href:"#mouse-scroll","aria-label":'Permalink to "Mouse Scroll"'},"​")],-1)),l[10]||(l[10]=y("p",null,"Demonstrates the carousel with mouse wheel scrolling navigation enabled.",-1)),U(z,D(J(R(B).mouseScroll)),null,16),l[11]||(l[11]=y("h2",{id:"active-classes",tabindex:"-1"},[I("Active Classes "),y("a",{class:"header-anchor",href:"#active-classes","aria-label":'Permalink to "Active Classes"'},"​")],-1)),l[12]||(l[12]=y("p",null,"An example highlighting active items with custom classes.",-1)),U(z,D(J(R(B).activeClasses)),null,16),l[13]||(l[13]=y("h2",{id:"custom-navigation",tabindex:"-1"},[I("Custom Navigation "),y("a",{class:"header-anchor",href:"#custom-navigation","aria-label":'Permalink to "Custom Navigation"'},"​")],-1)),l[14]||(l[14]=y("p",null,"A demonstration of the carousel with fully customizable navigation controls.",-1)),U(z,Y(R(B).customNavigation,{height:"260px"}),null,16),l[15]||(l[15]=y("h2",{id:"gallery",tabindex:"-1"},[I("Gallery "),y("a",{class:"header-anchor",href:"#gallery","aria-label":'Permalink to "Gallery"'},"​")],-1)),l[16]||(l[16]=y("p",null,"Transforms the carousel into a gallery-style component.",-1)),U(z,Y(R(B).gallery,{height:"455px"}),null,16)]))}});export{Me as __pageData,_e as default};
