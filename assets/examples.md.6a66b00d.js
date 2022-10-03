import{C as f,S as h,P as T,N as b,E as P}from"./ExampleGallery.5f5d1318.js";import{d as x,_ as m,G as n,o as u,k as w,I as t,A as s,b as r,z as S,F as d,g as i,t as C,a0 as N,Y as g}from"./plugin-vue_export-helper.b27dad8f.js";import{v as V}from"./framework.4a819da6.js";const B=x({name:"Basic",components:{Carousel:f,Slide:h,Pagination:T,Navigation:b}}),I={class:"carousel__item"};function D(p,o,_,v,y,q){const e=n("Slide"),c=n("Navigation"),l=n("Pagination"),a=n("Carousel");return u(),w(a,null,{addons:t(()=>[s(c),s(l)]),default:t(()=>[(u(),r(d,null,S(10,k=>s(e,{key:k},{default:t(()=>[i("div",I,C(k),1)]),_:2},1024)),64))]),_:1})}var R=m(B,[["render",D]]);const j=x({name:"WrapAround",components:{Carousel:f,Slide:h,Navigation:b}}),G={class:"carousel__item"};function W(p,o,_,v,y,q){const e=n("Slide"),c=n("Navigation"),l=n("Carousel");return u(),w(l,{"items-to-show":2.5,"wrap-around":!0},{addons:t(()=>[s(c)]),default:t(()=>[(u(),r(d,null,S(10,a=>s(e,{key:a},{default:t(()=>[i("div",G,C(a),1)]),_:2},1024)),64))]),_:1},8,["items-to-show"])}var Y=m(j,[["render",W]]);const z=x({name:"Breakpoints",components:{Carousel:f,Slide:h,Navigation:b},data:()=>({settings:{itemsToShow:1,snapAlign:"center"},breakpoints:{700:{itemsToShow:3.5,snapAlign:"center"},1024:{itemsToShow:5,snapAlign:"start"}}})}),U={class:"carousel__item"};function F(p,o,_,v,y,q){const e=n("Slide"),c=n("Navigation"),l=n("Carousel");return u(),w(l,{settings:p.settings,breakpoints:p.breakpoints},{addons:t(()=>[s(c)]),default:t(()=>[(u(),r(d,null,S(10,a=>s(e,{key:a},{default:t(()=>[i("div",U,C(a),1)]),_:2},1024)),64))]),_:1},8,["settings","breakpoints"])}var L=m(z,[["render",F]]);const M=x({name:"ExamplePagination",components:{Carousel:f,Slide:h,Navigation:b,Pagination:T},data:()=>({settings:{itemsToShow:1,snapAlign:"center"}})}),H={class:"carousel__item"};function J(p,o,_,v,y,q){const e=n("Slide"),c=n("Pagination"),l=n("Navigation"),a=n("Carousel");return u(),w(a,{settings:p.settings},{addons:t(()=>[s(c),s(l)]),default:t(()=>[(u(),r(d,null,S(10,k=>s(e,{key:k},{default:t(()=>[i("div",H,C(k),1)]),_:2},1024)),64))]),_:1},8,["settings"])}var K=m(M,[["render",J]]);const O=x({name:"Autoplay",components:{Carousel:f,Slide:h,Pagination:T}}),Q={class:"carousel__item"};function X(p,o,_,v,y,q){const e=n("Slide"),c=n("Pagination"),l=n("Carousel");return u(),w(l,{autoplay:2e3,"wrap-around":!0,"pause-autoplay-on-hover":""},{addons:t(()=>[s(c)]),default:t(()=>[(u(),r(d,null,S(10,a=>s(e,{key:a},{default:t(()=>[i("div",Q,C(a),1)]),_:2},1024)),64))]),_:1})}var Z=m(O,[["render",X]]);const nn=x({name:"Basic",components:{Carousel:f,Slide:h,Pagination:T,Navigation:b}}),an={class:"carousel__item"};function sn(p,o,_,v,y,q){const e=n("Slide"),c=n("Navigation"),l=n("Pagination"),a=n("Carousel");return u(),w(a,{id:"activeClasses",itemsToShow:3.95,wrapAround:!0,transition:500},{addons:t(()=>[s(c),s(l)]),default:t(()=>[(u(),r(d,null,S(10,k=>s(e,{key:k},{default:t(()=>[i("div",an,C(k),1)]),_:2},1024)),64))]),_:1},8,["itemsToShow"])}var tn=m(nn,[["render",sn]]);const pn=x({name:"CustomNavigation",components:{Carousel:f,Slide:h,Navigation:b},data:()=>({currentSlide:0}),methods:{next(){this.$refs.carousel.next()},prev(){this.$refs.carousel.prev()}}}),on={class:"carousel__item"};function en(p,o,_,v,y,q){const e=n("Slide"),c=n("Navigation"),l=n("Carousel");return u(),r(d,null,[s(l,{ref:"carousel",modelValue:p.currentSlide,"onUpdate:modelValue":o[0]||(o[0]=a=>p.currentSlide=a),snapAlign:"start"},{addons:t(()=>[s(c)]),default:t(()=>[(u(),r(d,null,S(10,a=>s(e,{key:a},{default:t(()=>[i("div",on,C(a-1),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),i("div",null,[i("button",{onClick:o[1]||(o[1]=(...a)=>p.prev&&p.prev(...a))},"Prev"),N(i("input",{type:"number",min:"0",max:"9","onUpdate:modelValue":o[2]||(o[2]=a=>p.currentSlide=a)},null,512),[[V,p.currentSlide]]),i("button",{onClick:o[3]||(o[3]=(...a)=>p.next&&p.next(...a))},"Next")])],64)}var cn=m(pn,[["render",en]]);const ln={components:{ExampleBasic:R,ExampleWrapAround:Y,ExampleBreakpoints:L,ExampleAutoplay:Z,ExamplePagination:K,ExampleActiveClasses:tn,ExampleCustomNavigation:cn,ExampleGallery:P}},Sn='{"title":"Examples","description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic Example","slug":"basic-example"},{"level":2,"title":"Wrap Around","slug":"wrap-around"},{"level":2,"title":"Breakpoints","slug":"breakpoints"},{"level":2,"title":"Pagination","slug":"pagination"},{"level":2,"title":"Autoplay Example","slug":"autoplay-example"},{"level":2,"title":"Active Classes","slug":"active-classes"},{"level":2,"title":"Custom Navigation","slug":"custom-navigation"},{"level":2,"title":"Gallery","slug":"gallery"}],"relativePath":"examples.md","lastUpdated":1664785625863}',un=g('<h1 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h1><h2 id="basic-example" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBasic.vue" target="_blank" rel="noopener noreferrer">Basic Example</a> <a class="header-anchor" href="#basic-example" aria-hidden="true">#</a></h2>',2),kn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Pagination</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Basic&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--vc-clr-primary<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--vc-clr-white<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__prev,
.carousel__next</span> <span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> content-box<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 5px solid white<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="wrap-around" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleWrapAround.vue" target="_blank" rel="noopener noreferrer">Wrap Around</a> <a class="header-anchor" href="#wrap-around" aria-hidden="true">#</a></h2>`,2),rn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:items-to-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2.5<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:wrap-around</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;WrapAround&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="breakpoints" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBreakpoints.vue" target="_blank" rel="noopener noreferrer">Breakpoints</a> <a class="header-anchor" href="#breakpoints" aria-hidden="true">#</a></h2>`,2),gn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:settings</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>settings<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:breakpoints</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>breakpoints<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Breakpoints&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// carousel settings</span>
    <span class="token literal-property property">settings</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// breakpoints are mobile first</span>
    <span class="token comment">// any settings not specified will fallback to the carousel settings</span>
    <span class="token literal-property property">breakpoints</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 700px and up</span>
      <span class="token number">700</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">3.5</span><span class="token punctuation">,</span>
        <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 1024 and up</span>
      <span class="token number">1024</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
        <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;start&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="pagination" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBreakpoints.vue" target="_blank" rel="noopener noreferrer">Pagination</a> <a class="header-anchor" href="#pagination" aria-hidden="true">#</a></h2>`,2),dn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:settings</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>settings<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:breakpoints</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>breakpoints<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Pagination</span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide<span class="token punctuation">,</span> Pagination <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ExamplePagination&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Pagination<span class="token punctuation">,</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// carousel settings</span>
    <span class="token literal-property property">settings</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// breakpoints are mobile first</span>
    <span class="token comment">// any settings not specified will fallback to the carousel settings</span>
    <span class="token literal-property property">breakpoints</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 700px and up</span>
      <span class="token number">700</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">3.5</span><span class="token punctuation">,</span>
        <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 1024 and up</span>
      <span class="token number">1024</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">itemsToShow</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
        <span class="token literal-property property">snapAlign</span><span class="token operator">:</span> <span class="token string">&#39;start&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="autoplay-example" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleAutoplay.vue" target="_blank" rel="noopener noreferrer">Autoplay Example</a> <a class="header-anchor" href="#autoplay-example" aria-hidden="true">#</a></h2>`,2),mn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:autoplay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2000<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:wrap-around</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Pagination</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Autoplay&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="active-classes" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleActiveClasses.vue" target="_blank" rel="noopener noreferrer">Active Classes</a> <a class="header-anchor" href="#active-classes" aria-hidden="true">#</a></h2>`,2),_n=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:itemsToShow</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3.95<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:wrapAround</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:transition</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>500<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Autoplay&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.carousel__slide</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__viewport</span> <span class="token punctuation">{</span>
  <span class="token property">perspective</span><span class="token punctuation">:</span> 2000px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__track</span> <span class="token punctuation">{</span>
  <span class="token property">transform-style</span><span class="token punctuation">:</span> preserve-3d<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide--sliding</span> <span class="token punctuation">{</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.5s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0.9<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>-20deg<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide--active ~ .carousel__slide</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>20deg<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide--prev</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>-10deg<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.95<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide--next</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>10deg<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.95<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.carousel__slide--active</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="custom-navigation" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleCustomNavigation.vue" target="_blank" rel="noopener noreferrer">Custom Navigation</a> <a class="header-anchor" href="#custom-navigation" aria-hidden="true">#</a></h2>`,2),vn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentSlide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide - 1 }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>next<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Next<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>number<span class="token punctuation">&quot;</span></span> <span class="token attr-name">min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0<span class="token punctuation">&quot;</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>9<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentSlide<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>prev<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Prev<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="gallery" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleGallery.vue" target="_blank" rel="noopener noreferrer">Gallery</a> <a class="header-anchor" href="#gallery" aria-hidden="true">#</a></h2>`,2),yn=g(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>gallery<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:items-to-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:wrap-around</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentSlide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span>
    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>thumbnails<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:items-to-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>4<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:wrap-around</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>currentSlide<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slideTo(slide - 1)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Gallery&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">currentSlide</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">slideTo</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>currentSlide <span class="token operator">=</span> val
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1);function qn(p,o,_,v,y,q){const e=n("ExampleBasic"),c=n("ExampleWrapAround"),l=n("ExampleBreakpoints"),a=n("ExamplePagination"),k=n("ExampleAutoplay"),A=n("ExampleActiveClasses"),$=n("ExampleCustomNavigation"),E=n("ExampleGallery");return u(),r("div",null,[un,s(e),kn,s(c),rn,s(l),gn,s(a),dn,s(k),mn,s(A),_n,s($),vn,s(E),yn])}var Cn=m(ln,[["render",qn]]);export{Sn as __pageData,Cn as default};
