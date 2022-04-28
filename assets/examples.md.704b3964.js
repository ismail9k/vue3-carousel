import{C as y,S as f,N as b,P as A,E as $}from"./ExampleBasic.ef91bb92.js";import{f as h,_ as k,r as n,o as c,u as x,v as s,b as a,c as r,x as w,F as q,a as C,t as S,e as u}from"./app.4ae953de.js";const P=h({name:"WrapAround",components:{Carousel:y,Slide:f,Navigation:b}}),N={class:"carousel__item"};function B(l,g,d,m,_,v){const p=n("Slide"),o=n("Navigation"),e=n("Carousel");return c(),x(e,{"items-to-show":2.5,"wrap-around":!0},{addons:s(()=>[a(o)]),default:s(()=>[(c(),r(q,null,w(10,t=>a(p,{key:t},{default:s(()=>[C("div",N,S(t),1)]),_:2},1024)),64))]),_:1},8,["items-to-show"])}var V=k(P,[["render",B]]);const I=h({name:"Breakpoints",components:{Carousel:y,Slide:f,Navigation:b},data:()=>({settings:{itemsToShow:1,snapAlign:"center"},breakpoints:{700:{itemsToShow:3.5,snapAlign:"center"},1024:{itemsToShow:5,snapAlign:"start"}}})}),j={class:"carousel__item"};function D(l,g,d,m,_,v){const p=n("Slide"),o=n("Navigation"),e=n("Carousel");return c(),x(e,{settings:l.settings,breakpoints:l.breakpoints},{addons:s(()=>[a(o)]),default:s(()=>[(c(),r(q,null,w(10,t=>a(p,{key:t},{default:s(()=>[C("div",j,S(t),1)]),_:2},1024)),64))]),_:1},8,["settings","breakpoints"])}var H=k(I,[["render",D]]);const R=h({name:"HiddenArrows",components:{Carousel:y,Slide:f,Navigation:b}}),W={class:"carousel__item"};function z(l,g,d,m,_,v){const p=n("Slide"),o=n("Navigation"),e=n("Carousel");return c(),x(e,{"items-to-show":3,id:"hideArrowsExample"},{addons:s(()=>[a(o)]),default:s(()=>[(c(),r(q,null,w(10,t=>a(p,{key:t},{default:s(()=>[C("div",W,S(t),1)]),_:2},1024)),64))]),_:1})}var F=k(R,[["render",z]]);const L=h({name:"ExamplePagination",components:{Carousel:y,Slide:f,Navigation:b,Pagination:A},data:()=>({settings:{itemsToShow:1,snapAlign:"center"}})}),U={class:"carousel__item"};function Y(l,g,d,m,_,v){const p=n("Slide"),o=n("Pagination"),e=n("Navigation"),t=n("Carousel");return c(),x(t,{settings:l.settings},{addons:s(()=>[a(o),a(e)]),default:s(()=>[(c(),r(q,null,w(11,i=>a(p,{key:i},{default:s(()=>[C("div",U,S(i),1)]),_:2},1024)),64))]),_:1},8,["settings"])}var G=k(L,[["render",Y]]);const J=h({name:"Autoplay",components:{Carousel:y,Slide:f,Pagination:A}}),K={class:"carousel__item"};function M(l,g,d,m,_,v){const p=n("Slide"),o=n("Pagination"),e=n("Carousel");return c(),x(e,{autoplay:2e3,"wrap-around":!0,"pause-autoplay-on-hover":""},{addons:s(()=>[a(o)]),default:s(()=>[(c(),r(q,null,w(10,t=>a(p,{key:t},{default:s(()=>[C("div",K,S(t),1)]),_:2},1024)),64))]),_:1})}var O=k(J,[["render",M]]);const Q=h({name:"Basic",components:{Carousel:y,Slide:f,Pagination:A,Navigation:b}}),X={class:"carousel__item"};function Z(l,g,d,m,_,v){const p=n("Slide"),o=n("Navigation"),e=n("Pagination"),t=n("Carousel");return c(),x(t,{itemsToShow:3.95,wrapAround:!0},{addons:s(()=>[a(o),a(e)]),default:s(()=>[(c(),r(q,null,w(10,i=>a(p,{key:i},{default:s(()=>[C("div",X,S(i),1)]),_:2},1024)),64))]),_:1},8,["itemsToShow"])}var nn=k(Q,[["render",Z],["__scopeId","data-v-6c4850b8"]]);const an={components:{ExampleBasic:$,ExampleWrapAround:V,ExampleBreakpoints:H,ExampleHiddenArrows:F,ExampleAutoplay:O,ExamplePagination:G,ExampleActiveClasses:nn}},dn='{"title":"Examples","description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic Example","slug":"basic-example"},{"level":2,"title":"Wrap Around","slug":"wrap-around"},{"level":2,"title":"Breakpoints","slug":"breakpoints"},{"level":2,"title":"HiddenArrows","slug":"hiddenarrows"},{"level":2,"title":"Pagination","slug":"pagination"},{"level":2,"title":"Autoplay Example","slug":"autoplay-example"},{"level":2,"title":"Active Classes","slug":"active-classes"}],"relativePath":"examples.md","lastUpdated":1651153903542}',sn=u('<h1 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h1><h2 id="basic-example" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBasic.vue" target="_blank" rel="noopener noreferrer">Basic Example</a> <a class="header-anchor" href="#basic-example" aria-hidden="true">#</a></h2>',2),tn=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
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
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Basic&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--vc-clr-primary<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span>  <span class="token function">var</span><span class="token punctuation">(</span>--vc-clr-white<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
</code></pre></div><h2 id="wrap-around" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleWrapAround.vue" target="_blank" rel="noopener noreferrer">Wrap Around</a> <a class="header-anchor" href="#wrap-around" aria-hidden="true">#</a></h2>`,2),pn=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
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
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;WrapAround&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="breakpoints" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBreakpoints.vue" target="_blank" rel="noopener noreferrer">Breakpoints</a> <a class="header-anchor" href="#breakpoints" aria-hidden="true">#</a></h2>`,2),on=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
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
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

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
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="hiddenarrows" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleHiddenArrows.vue" target="_blank" rel="noopener noreferrer">HiddenArrows</a> <a class="header-anchor" href="#hiddenarrows" aria-hidden="true">#</a></h2>`,2),en=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Breakpoints&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.carousel__prev--in-active,
.carousel__next--in-active</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="pagination" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleBreakpoints.vue" target="_blank" rel="noopener noreferrer">Pagination</a> <a class="header-anchor" href="#pagination" aria-hidden="true">#</a></h2>`,2),cn=u(`<div class="language-vue"><pre><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:settings</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>settings<span class="token punctuation">&#39;</span></span> <span class="token attr-name">:breakpoints</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>breakpoints<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>slide in 10<span class="token punctuation">&#39;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>slide<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>carousel__item<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Pagination</span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navigation</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Navigation<span class="token punctuation">,</span> Slide<span class="token punctuation">,</span> Pagination <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>
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
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="autoplay-example" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleAutoplay.vue" target="_blank" rel="noopener noreferrer">Autoplay Example</a> <a class="header-anchor" href="#autoplay-example" aria-hidden="true">#</a></h2>`,2),ln=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
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
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Autoplay&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="active-classes" tabindex="-1"><a href="https://github.com/ismail9k/vue3-carousel/blob/master/docs/examples/ExampleActiveClasses.vue" target="_blank" rel="noopener noreferrer">Active Classes</a> <a class="header-anchor" href="#active-classes" aria-hidden="true">#</a></h2>`,2),un=u(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Carousel</span> <span class="token attr-name">:itemsToShow</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3.95<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:wrapAround</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>carousel__item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ slide }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Slide</span><span class="token punctuation">&gt;</span></span>

    ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Slide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Autoplay&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.carousel__slide &gt; .carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0.5<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 0.5s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.carousel__slide--visible &gt; .carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.carousel__slide--next &gt; .carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span> <span class="token function">translate</span><span class="token punctuation">(</span>-10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.carousel__slide--prev &gt; .carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span> <span class="token function">translate</span><span class="token punctuation">(</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.carousel__slide--active &gt; .carousel__item</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>

</code></pre></div>`,1);function kn(l,g,d,m,_,v){const p=n("ExampleBasic"),o=n("ExampleWrapAround"),e=n("ExampleBreakpoints"),t=n("ExampleHiddenArrows"),i=n("ExamplePagination"),T=n("ExampleAutoplay"),E=n("ExampleActiveClasses");return c(),r("div",null,[sn,a(p),tn,a(o),pn,a(e),on,a(t),en,a(i),cn,a(T),ln,a(E),un])}var mn=k(an,[["render",kn]]);export{dn as __pageData,mn as default};
