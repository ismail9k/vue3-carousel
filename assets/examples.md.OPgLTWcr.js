import{p as F,v as re,q as ee,x as ie,af as se,d as le,u as ce,o as ne,b as de,P as ue,k as pe,c as me,j as p,a as O,G as L}from"./chunks/framework.6uqSfbGU.js";var ge=Object.create,te=Object.defineProperty,he=Object.getOwnPropertyDescriptor,ve=Object.getOwnPropertyNames,fe=Object.getPrototypeOf,be=Object.prototype.hasOwnProperty,ye=(d,h)=>()=>(h||d((h={exports:{}}).exports,h),h.exports),we=(d,h,t,w)=>{if(h&&typeof h=="object"||typeof h=="function")for(let m of ve(h))!be.call(d,m)&&m!==t&&te(d,m,{get:()=>h[m],enumerable:!(w=he(h,m))||w.enumerable});return d},xe=(d,h,t)=>(t=d!=null?ge(fe(d)):{},we(!d||!d.__esModule?te(t,"default",{value:d,enumerable:!0}):t,d)),Se=ye((d,h)=>{var t=function(){var w=String.fromCharCode,m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",j={};function q(a,r){if(!j[a]){j[a]={};for(var i=0;i<a.length;i++)j[a][a.charAt(i)]=i}return j[a][r]}var E={compressToBase64:function(a){if(a==null)return"";var r=E._compress(a,6,function(i){return m.charAt(i)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:E._decompress(a.length,32,function(r){return q(m,a.charAt(r))})},compressToUTF16:function(a){return a==null?"":E._compress(a,15,function(r){return w(r+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:E._decompress(a.length,16384,function(r){return a.charCodeAt(r)-32})},compressToUint8Array:function(a){for(var r=E.compress(a),i=new Uint8Array(r.length*2),e=0,o=r.length;e<o;e++){var v=r.charCodeAt(e);i[e*2]=v>>>8,i[e*2+1]=v%256}return i},decompressFromUint8Array:function(a){if(a==null)return E.decompress(a);for(var r=new Array(a.length/2),i=0,e=r.length;i<e;i++)r[i]=a[i*2]*256+a[i*2+1];var o=[];return r.forEach(function(v){o.push(w(v))}),E.decompress(o.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":E._compress(a,6,function(r){return M.charAt(r)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),E._decompress(a.length,32,function(r){return q(M,a.charAt(r))}))},compress:function(a){return E._compress(a,16,function(r){return w(r)})},_compress:function(a,r,i){if(a==null)return"";var e,o,v={},y={},C="",S="",b="",k=2,g=3,u=2,f=[],n=0,c=0,l;for(l=0;l<a.length;l+=1)if(C=a.charAt(l),Object.prototype.hasOwnProperty.call(v,C)||(v[C]=g++,y[C]=!0),S=b+C,Object.prototype.hasOwnProperty.call(v,S))b=S;else{if(Object.prototype.hasOwnProperty.call(y,b)){if(b.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(o=b.charCodeAt(0),e=0;e<8;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}else{for(o=1,e=0;e<u;e++)n=n<<1|o,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=0;for(o=b.charCodeAt(0),e=0;e<16;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete y[b]}else for(o=v[b],e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;k--,k==0&&(k=Math.pow(2,u),u++),v[S]=g++,b=String(C)}if(b!==""){if(Object.prototype.hasOwnProperty.call(y,b)){if(b.charCodeAt(0)<256){for(e=0;e<u;e++)n=n<<1,c==r-1?(c=0,f.push(i(n)),n=0):c++;for(o=b.charCodeAt(0),e=0;e<8;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}else{for(o=1,e=0;e<u;e++)n=n<<1|o,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=0;for(o=b.charCodeAt(0),e=0;e<16;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1}k--,k==0&&(k=Math.pow(2,u),u++),delete y[b]}else for(o=v[b],e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;k--,k==0&&(k=Math.pow(2,u),u++)}for(o=2,e=0;e<u;e++)n=n<<1|o&1,c==r-1?(c=0,f.push(i(n)),n=0):c++,o=o>>1;for(;;)if(n=n<<1,c==r-1){f.push(i(n));break}else c++;return f.join("")},decompress:function(a){return a==null?"":a==""?null:E._decompress(a.length,32768,function(r){return a.charCodeAt(r)})},_decompress:function(a,r,i){var e=[],o=4,v=4,y=3,C="",S=[],b,k,g,u,f,n,c,l={val:i(0),position:r,index:1};for(b=0;b<3;b+=1)e[b]=b;for(g=0,f=Math.pow(2,2),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;switch(g){case 0:for(g=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;c=w(g);break;case 1:for(g=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;c=w(g);break;case 2:return""}for(e[3]=c,k=c,S.push(c);;){if(l.index>a)return"";for(g=0,f=Math.pow(2,y),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;switch(c=g){case 0:for(g=0,f=Math.pow(2,8),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;e[v++]=w(g),c=v-1,o--;break;case 1:for(g=0,f=Math.pow(2,16),n=1;n!=f;)u=l.val&l.position,l.position>>=1,l.position==0&&(l.position=r,l.val=i(l.index++)),g|=(u>0?1:0)*n,n<<=1;e[v++]=w(g),c=v-1,o--;break;case 2:return S.join("")}if(o==0&&(o=Math.pow(2,y),y++),e[c])C=e[c];else if(c===v)C=k+k.charAt(0);else return null;S.push(C),e[v++]=k+C.charAt(0),o--,k=C,o==0&&(o=Math.pow(2,y),y++)}}};return E}();typeof h<"u"&&h!=null&&(h.exports=t)});xe(Se());async function V(d,h={}){typeof d=="object"&&!(d instanceof HTMLElement)&&d.view==="headless"&&(h=d,d=null);let{appUrl:t="https://livecodes.io/",params:w={},config:m={},import:M,headless:j,lite:q,loading:E="lazy",template:a,view:r}=h,i=j||r==="headless",e=null;if(typeof d=="string")e=document.querySelector(d);else if(d instanceof HTMLElement)e=d;else if(!(i&&typeof d=="object"))throw new Error("A valid container element is required.");if(!e)if(i)e=document.createElement("div"),G(e),document.body.appendChild(e);else throw new Error(`Cannot find element: "${d}"`);let o;try{o=new URL(t)}catch{throw new Error(`"${t}" is not a valid URL.`)}let v=o.origin;if(typeof w=="object"&&Object.keys(w).forEach(s=>{o.searchParams.set(s,String(w[s]))}),a&&o.searchParams.set("template",a),M&&o.searchParams.set("x",M),i&&o.searchParams.set("headless","true"),q&&(console.warn(`Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`),typeof m=="object"&&m.mode==null?m.mode="lite":o.searchParams.set("lite","true")),r&&(console.warn('Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".'),typeof m=="object"&&m.view==null&&r!=="headless"?m.view=r:o.searchParams.set("view",r)),typeof m=="string")try{new URL(m),o.searchParams.set("config",m)}catch{throw new Error('"config" is not a valid URL or configuration object.')}else if(typeof m=="object")Object.keys(m).length>0&&o.searchParams.set("config","sdk");else throw new Error('"config" is not a valid URL or configuration object.');o.searchParams.set("embed","true"),o.searchParams.set("loading",i?"eager":E);let y=!1,C="Cannot call API methods after calling `destroy()`.",S=await new Promise(s=>{var x,P,N,T,R,z,U,$,I;if(!e)return;let W=e.dataset.height||e.style.height;if(W&&!i){let D=isNaN(Number(W))?W:W+"px";e.style.height=D}e.dataset.defaultStyles!=="false"&&!i&&((x=e.style).backgroundColor||(x.backgroundColor="#fff"),(P=e.style).border||(P.border="1px solid black"),(N=e.style).borderRadius||(N.borderRadius="8px"),(T=e.style).boxSizing||(T.boxSizing="border-box"),(R=e.style).padding||(R.padding="0"),(z=e.style).width||(z.width="100%"),(U=e.style).height||(U.height=e.style.height||"300px"),e.style.minHeight="200px",e.style.flexGrow="1",($=e.style).overflow||($.overflow="hidden"),(I=e.style).resize||(I.resize="vertical"));let Y="livecodes",X=e.querySelector(`iframe.${Y}`),A=X||document.createElement("iframe");A.classList.add(Y),A.setAttribute("allow","accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"),A.setAttribute("allowtransparency","true"),A.setAttribute("allowpaymentrequest","true"),A.setAttribute("allowfullscreen","true"),A.setAttribute("sandbox","allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts");let ae=E==="eager"?"eager":"lazy";A.setAttribute("loading",ae),i?G(A):(A.style.height="100%",A.style.minHeight="200px",A.style.width="100%",A.style.margin="0",A.style.border="0",A.style.borderRadius=e.style.borderRadius),addEventListener("message",function D(J){var K,Q;J.source!==A.contentWindow||J.origin!==v||((K=J.data)==null?void 0:K.type)!=="livecodes-get-config"||(removeEventListener("message",D),(Q=A.contentWindow)==null||Q.postMessage({type:"livecodes-config",payload:m},v))}),A.onload=()=>{s(A)},A.src=o.href,X||e.appendChild(A)}),b=new Promise(s=>{addEventListener("message",function x(P){var N;P.source!==S.contentWindow||P.origin!==v||((N=P.data)==null?void 0:N.type)!=="livecodes-ready"||(removeEventListener("message",x),s(),b.settled=!0)})}),k=()=>y?Promise.reject(C):new Promise(async s=>{var x;b.settled&&s();let P={type:"livecodes-load"};(x=S.contentWindow)==null||x.postMessage(P,v),await b,s()}),g=(s,x)=>new Promise(async(P,N)=>{var T;if(y)return N(C);await k();let R=oe();addEventListener("message",function z(U){var $,I;if(!(U.source!==S.contentWindow||U.origin!==v||(($=U.data)==null?void 0:$.type)!=="livecodes-api-response"||((I=U.data)==null?void 0:I.id)!==R)&&U.data.method===s){removeEventListener("message",z);let W=U.data.payload;W!=null&&W.error?N(W.error):P(W)}}),(T=S.contentWindow)==null||T.postMessage({method:s,id:R,args:x},v)}),u={},f=["load","ready","code","console","tests","destroy"],n=(s,x)=>{var P;if(y)throw new Error(C);return f.includes(s)?(g("watch",[s]),u[s]||(u[s]=[]),(P=u[s])==null||P.push(x),{remove:()=>{var N,T;u[s]=(N=u[s])==null?void 0:N.filter(R=>R!==x),((T=u[s])==null?void 0:T.length)===0&&g("watch",[s,"unsubscribe"])}}):{remove:()=>{}}},c=s=>({"livecodes-app-loaded":"load","livecodes-ready":"ready","livecodes-change":"code","livecodes-console":"console","livecodes-test-results":"tests","livecodes-destroy":"destroy"})[s];addEventListener("message",async s=>{var x,P,N,T;let R=c((P=(x=s.data)==null?void 0:x.type)!=null?P:"");if(s.source!==S.contentWindow||s.origin!==v||!R||!u[R])return;let z=(N=s.data)==null?void 0:N.payload;(T=u[R])==null||T.forEach(U=>{U(z)})});let l=()=>{var s;Object.values(u).forEach(x=>{x.length=0}),(s=S==null?void 0:S.remove)==null||s.call(S),y=!0};E==="lazy"&&"IntersectionObserver"in window&&new IntersectionObserver((s,x)=>{s.forEach(async P=>{P.isIntersecting&&(await k(),x.unobserve(e))})},{rootMargin:"150px"}).observe(e);function G(s){s.style.position="absolute",s.style.top="0",s.style.visibility="hidden",s.style.opacity="0"}let oe=()=>(String(Math.random())+Date.now().toFixed()).replace("0.","");return{load:()=>k(),run:()=>g("run"),format:s=>g("format",[s]),getShareUrl:s=>g("getShareUrl",[s]),getConfig:s=>g("getConfig",[s]),setConfig:s=>g("setConfig",[s]),getCode:()=>g("getCode"),show:(s,x)=>g("show",[s,x]),runTests:()=>g("runTests"),onChange:s=>n("code",s),watch:n,exec:(s,...x)=>g("exec",[s,...x]),destroy:()=>b.settled?g("destroy").then(l):y?Promise.reject(C):(l(),Promise.resolve())}}var Z;globalThis.document&&document.currentScript&&"prefill"in((Z=document.currentScript)==null?void 0:Z.dataset)&&window.addEventListener("load",()=>{document.querySelectorAll(".livecodes").forEach(d=>{let h,t=d.dataset.options;if(t)try{h=JSON.parse(t)}catch{}let w,m=d.dataset.config||d.dataset.prefill;if(m)try{w=JSON.parse(m)}catch{}let M=encodeURIComponent(d.outerHTML);d.innerHTML="",V(d,{import:"dom/"+M,...h,...w?{config:w}:{}})})});var ke={appUrl:String,config:[Object,String],headless:Boolean,import:String,lite:Boolean,loading:String,params:Object,template:String,view:String,height:String},H=d=>JSON.parse(JSON.stringify(d)),Ce={props:ke,emits:["sdkReady"],setup(d,h){let{height:t,...w}=d,m=F(),M=F(t||""),j=F(),{config:q,...E}=w,a=JSON.stringify(q),r=JSON.stringify(E);return re(()=>{m.value&&V(m.value,H(w)).then(i=>{j.value=i,h.emit("sdkReady",i)})}),ee(d,async i=>{var e;if(!m.value||!j.value)return;let{height:o,...v}=i;M.value=o||"";let{config:y,...C}=v;typeof y=="string"&&(y=await fetch(y).then(S=>S.json())),JSON.stringify(C)!==r?(await((e=j.value)==null?void 0:e.destroy()),V(m.value,H(v)).then(S=>{j.value=S,h.emit("sdkReady",S)})):JSON.stringify(y)!==a&&j.value.setConfig(H(y)||{}),a=JSON.stringify(y),r=JSON.stringify(C)}),ie(()=>{var i;(i=j.value)==null||i.destroy()}),()=>{var i,e;return se("div",{ref:m,"data-height":M},((e=(i=h.slots).default)==null?void 0:e.call(i))||"")}}},Ae=Ce;const _=le({__name:"LiveCodes",props:{code:{},styles:{},loading:{},view:{},mode:{},height:{}},setup(d){const h=d,{isDark:t}=ce(),w={title:"Vue3-carousel",theme:t.value?"dark":"light",themeColor:"hsl(220, 14%, 80%)",view:h.view||"result",mode:h.mode||"simple",activeEditor:"script",tools:{status:"none"},style:{language:"css",content:h.styles||""},script:{language:"vue",content:h.code,title:"App.vue"},imports:{vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js","vue3-carousel":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs","vue3-carousel/carousel.css":"https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css"}};let m;const M=j=>{m=j};return ee(t,()=>{m&&m.setConfig({theme:t.value?"dark":"light"})}),(j,q)=>(ne(),de(pe(Ae),{appUrl:"https://v43.livecodes.io/",config:w,onSdkReady:M,style:ue({height:h.height||"250px"})},null,8,["style"]))}}),je=`<script setup>
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
import '../../dist/carousel.css'
import { Carousel, Slide } from '../../dist/carousel.mjs'

const images = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/seed/\${Math.random()}/800/600\`,
}))

const config = {
  height: 160,
  itemsToShow: 3,
  gap: 10,
  marquee: true,
  marqueeSpeed: 60,
  pauseAutoplayOnHover: true,
}
<\/script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
`,Re=`<script setup>
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
`,Ue=`<script setup>
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
`,Le=`<script setup>
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
`;function B(d){return d.replace("../../dist/carousel.css","vue3-carousel/carousel.css").replace("../../dist/carousel.mjs","vue3-carousel")}const Be=B(Pe),We=B(_e),qe=B(Le),ze=B(Ne),$e=B(Ee),Ie=B(je),De=B(Me),Je=B(Oe),Fe=B(Re),He=B(Te),Ve=B(Ue),Xe=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md","filePath":"examples.md"}'),Ge={name:"examples.md"},Ke=Object.assign(Ge,{setup(d){return(h,t)=>(ne(),me("div",null,[t[0]||(t[0]=p("h1",{id:"examples",tabindex:"-1"},[O("Examples "),p("a",{class:"header-anchor",href:"#examples","aria-label":'Permalink to "Examples"'},"​")],-1)),t[1]||(t[1]=p("p",null,"This page showcases examples of the carousel component with live demos. Explore different configurations from basic to advanced, and use the provided code samples as starting points for your own implementations.",-1)),t[2]||(t[2]=p("h2",{id:"basic",tabindex:"-1"},[O("Basic "),p("a",{class:"header-anchor",href:"#basic","aria-label":'Permalink to "Basic"'},"​")],-1)),t[3]||(t[3]=p("p",null,"A simple implementation of the carousel with default settings.",-1)),L(_,{code:Be},null,8,["code"]),t[4]||(t[4]=p("h2",{id:"wrap-around",tabindex:"-1"},[O("Wrap Around "),p("a",{class:"header-anchor",href:"#wrap-around","aria-label":'Permalink to "Wrap Around"'},"​")],-1)),t[5]||(t[5]=p("p",null,"Demonstrates a carousel with continuous wrap-around functionality.",-1)),L(_,{code:We},null,8,["code"]),t[6]||(t[6]=p("h2",{id:"vertical",tabindex:"-1"},[O("Vertical "),p("a",{class:"header-anchor",href:"#vertical","aria-label":'Permalink to "Vertical"'},"​")],-1)),t[7]||(t[7]=p("p",null,"Showcases a vertically scrolling carousel. Adjust the height to better fit your content.",-1)),L(_,{code:qe,height:"475px"},null,8,["code"]),t[8]||(t[8]=p("h2",{id:"breakpoints",tabindex:"-1"},[O("Breakpoints "),p("a",{class:"header-anchor",href:"#breakpoints","aria-label":'Permalink to "Breakpoints"'},"​")],-1)),t[9]||(t[9]=p("p",null,"An example of a responsive carousel with breakpoints for varying screen sizes.",-1)),L(_,{code:ze},null,8,["code"]),t[10]||(t[10]=p("h2",{id:"autoplay",tabindex:"-1"},[O("Autoplay "),p("a",{class:"header-anchor",href:"#autoplay","aria-label":'Permalink to "Autoplay"'},"​")],-1)),t[11]||(t[11]=p("p",null,"Illustrates the carousel with autoplay functionality enabled.",-1)),L(_,{code:$e},null,8,["code"]),t[12]||(t[12]=p("h2",{id:"marquee",tabindex:"-1"},[O("Marquee "),p("a",{class:"header-anchor",href:"#marquee","aria-label":'Permalink to "Marquee"'},"​")],-1)),t[13]||(t[13]=p("p",null,"Scrolls the slides continuously at a constant speed, pausing on hover.",-1)),L(_,{code:He},null,8,["code"]),t[14]||(t[14]=p("h2",{id:"mouse-wheel",tabindex:"-1"},[O("Mouse Wheel "),p("a",{class:"header-anchor",href:"#mouse-wheel","aria-label":'Permalink to "Mouse Wheel"'},"​")],-1)),t[15]||(t[15]=p("p",null,"Demonstrates the carousel with mouse wheel scrolling navigation enabled.",-1)),L(_,{code:Fe},null,8,["code"]),t[16]||(t[16]=p("h2",{id:"native-css",tabindex:"-1"},[O("Native CSS "),p("a",{class:"header-anchor",href:"#native-css","aria-label":'Permalink to "Native CSS"'},"​")],-1)),t[17]||(t[17]=p("p",null,"A scroll-snap carousel driven by the browser, with the regular navigation and pagination on top.",-1)),L(_,{code:Ve},null,8,["code"]),t[18]||(t[18]=p("h2",{id:"active-classes",tabindex:"-1"},[O("Active Classes "),p("a",{class:"header-anchor",href:"#active-classes","aria-label":'Permalink to "Active Classes"'},"​")],-1)),t[19]||(t[19]=p("p",null,"An example highlighting active items with custom classes.",-1)),L(_,{code:Ie},null,8,["code"]),t[20]||(t[20]=p("h2",{id:"custom-navigation",tabindex:"-1"},[O("Custom Navigation "),p("a",{class:"header-anchor",href:"#custom-navigation","aria-label":'Permalink to "Custom Navigation"'},"​")],-1)),t[21]||(t[21]=p("p",null,"A demonstration of the carousel with fully customizable navigation controls.",-1)),L(_,{code:De,height:"260px"},null,8,["code"]),t[22]||(t[22]=p("h2",{id:"gallery",tabindex:"-1"},[O("Gallery "),p("a",{class:"header-anchor",href:"#gallery","aria-label":'Permalink to "Gallery"'},"​")],-1)),t[23]||(t[23]=p("p",null,"Transforms the carousel into a gallery-style component.",-1)),L(_,{code:Je,height:"455px"},null,8,["code"])]))}});export{Xe as __pageData,Ke as default};
