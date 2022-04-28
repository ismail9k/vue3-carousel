import{_ as a,c as n,o as s,e as t}from"./app.4ae953de.js";const m='{"title":"Home","description":"A customizable accessible carousel slider optimized for Vue","frontmatter":{"home":true,"actionText":"Getting Started \u2192","actionLink":"/getting-started","features":[{"title":"\u{1F9C1} Vue.js","details":"Optimized to work with Vue 3 framework, not a wrapper for another library."},{"title":"\u267F Accessible","details":"Robust structure and Touch, Keyboard, Mouse Wheel, and Navigation support."},{"title":"\u{1F4F1} Responsive","details":"Responsive breakpoints, to apply custom configurations for each screen size."}],"footer":"MIT Licensed","description":"A customizable accessible carousel slider optimized for Vue","meta":[{"name":"og:title","content":"Vue3-carousel"},{"name":"og:description","content":"A customizable accessible carousel slider optimized for Vue 3"}]},"headers":[{"level":2,"title":"Quick Start","slug":"quick-start"},{"level":3,"title":"Installation","slug":"installation"},{"level":3,"title":"Basic Using","slug":"basic-using"}],"relativePath":"index.md","lastUpdated":1651153903543}',e={},p=t(`<h2 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-hidden="true">#</a></h2><h3 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h3><p>First step is to install it using <code>yarn</code> or <code>npm</code>:</p><div class="language-bash"><pre><code><span class="token function">npm</span> <span class="token function">install</span> vue3-carousel

<span class="token comment"># or use yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> vue3-carousel
</code></pre></div><h3 id="basic-using" tabindex="-1">Basic Using <a class="header-anchor" href="#basic-using" aria-hidden="true">#</a></h3><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>carousel</span> <span class="token attr-name">:items-to-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slide</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide in 10<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      {{ slide }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slide</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#addons</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>navigation</span> <span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pagination</span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>carousel</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes</span>
<span class="token keyword">import</span> <span class="token string">&#39;vue3-carousel/dist/carousel.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Carousel<span class="token punctuation">,</span> Slide<span class="token punctuation">,</span> Pagination<span class="token punctuation">,</span> Navigation <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue3-carousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;App&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Carousel<span class="token punctuation">,</span>
    Slide<span class="token punctuation">,</span>
    Pagination<span class="token punctuation">,</span>
    Navigation<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,6),o=[p];function c(l,i,u,r,k,d){return s(),n("div",null,o)}var h=a(e,[["render",c]]);export{m as __pageData,h as default};
