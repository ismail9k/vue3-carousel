import{_ as a,c as i,a2 as s,o as t}from"./chunks/framework.e-bAZrdY.js";const c=JSON.parse('{"title":"Methods","description":"","frontmatter":{},"headers":[],"relativePath":"api/methods.md","filePath":"api/methods.md"}'),l={name:"api/methods.md"};function n(d,e,h,r,o,p){return t(),i("div",null,e[0]||(e[0]=[s(`<h1 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h1><p>To use the API methods, add a reference to the carousel element and then call methods from that reference.</p><p>Example:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">Carousel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;myCarousel&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; ... &lt;/</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">Carousel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> myCarousel</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Methods are available in this reference</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myCarousel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myCarousel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">updateSlideSize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><h2 id="next" tabindex="-1">next() <a class="header-anchor" href="#next" aria-label="Permalink to &quot;next()&quot;">​</a></h2><p>Slide to the next slide</p><h2 id="prev" tabindex="-1">prev() <a class="header-anchor" href="#prev" aria-label="Permalink to &quot;prev()&quot;">​</a></h2><p>Slide to the previous slide</p><h2 id="restartcarousel" tabindex="-1">restartCarousel() <a class="header-anchor" href="#restartcarousel" aria-label="Permalink to &quot;restartCarousel()&quot;">​</a></h2><p>Restart the carousel settings and data, internally it calls:</p><ul><li><code>resetAutoplay</code></li><li><code>updateBreakpointsConfig</code></li><li><code>updateSlidesData</code></li><li><code>updateSlideSize</code></li></ul><h2 id="slideto-index-number-skiptransition-false" tabindex="-1">slideTo(index: number, skipTransition = false) <a class="header-anchor" href="#slideto-index-number-skiptransition-false" aria-label="Permalink to &quot;slideTo(index: number, skipTransition = false)&quot;">​</a></h2><p>Slide to specific slide index</p><h2 id="updatebreakpointsconfig" tabindex="-1">updateBreakpointsConfig() <a class="header-anchor" href="#updatebreakpointsconfig" aria-label="Permalink to &quot;updateBreakpointsConfig()&quot;">​</a></h2><p>Update the current carousel config based on <code>breakpoints</code> settings and screen width</p><h2 id="updateslidesize" tabindex="-1">updateSlideSize() <a class="header-anchor" href="#updateslidesize" aria-label="Permalink to &quot;updateSlideSize()&quot;">​</a></h2><p>Update <code>slideSize</code> value based on <code>itemsToShow</code>, <code>dir</code> and the current carousel width/height</p><h2 id="updateslidesdata" tabindex="-1">updateSlidesData() <a class="header-anchor" href="#updateslidesdata" aria-label="Permalink to &quot;updateSlidesData()&quot;">​</a></h2><p>Update all the slide related date includes:</p><ul><li><code>currentSlideIndex</code></li><li><code>maxSlide</code></li><li><code>middleSlide</code></li><li><code>minSlide</code></li></ul>`,21)]))}const u=a(l,[["render",n]]);export{c as __pageData,u as default};
