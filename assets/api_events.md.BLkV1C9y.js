import{_ as i,c as s,o as a,a3 as e}from"./chunks/framework.CKFXWU_d.js";const g=JSON.parse('{"title":"Events","description":"","frontmatter":{},"headers":[],"relativePath":"api/events.md","filePath":"api/events.md"}'),n={name:"api/events.md"},t=e(`<h1 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h1><p>Events provides more flexibility to intercept carousel navigation changes</p><h2 id="how-to-use-events" tabindex="-1">How To Use Events <a class="header-anchor" href="#how-to-use-events" aria-label="Permalink to &quot;How To Use Events&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">Carousel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  @init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;handleInit&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  @slide-start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;handleSlideStart&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">Carousel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      handleInit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;created&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      handleSlideStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;slide-start&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="before-init" tabindex="-1"><code>@before-init</code> <a class="header-anchor" href="#before-init" aria-label="Permalink to &quot;\`@before-init\`&quot;">​</a></h2><p>Triggers before the carousel initialized</p><h2 id="init" tabindex="-1"><code>@init</code> <a class="header-anchor" href="#init" aria-label="Permalink to &quot;\`@init\`&quot;">​</a></h2><p>Triggers once the carousel is mounted and completely initialized</p><h2 id="slide-start" tabindex="-1"><code>@slide-start</code> <a class="header-anchor" href="#slide-start" aria-label="Permalink to &quot;\`@slide-start\`&quot;">​</a></h2><p>Triggers at the binging of sliding function. it emits the following data:</p><ul><li><code>slidingToIndex</code></li><li><code>currentSlideIndex</code></li><li><code>prevSlideIndex</code></li><li><code>slidesCount</code></li></ul><h2 id="slide-end" tabindex="-1"><code>@slide-end</code> <a class="header-anchor" href="#slide-end" aria-label="Permalink to &quot;\`@slide-end\`&quot;">​</a></h2><p>Triggers after finishing of sliding function and the current slide has been update. it emits the following data:</p><ul><li><code>currentSlideIndex</code></li><li><code>prevSlideIndex</code></li><li><code>slidesCount</code></li></ul><h2 id="loop" tabindex="-1"><code>@loop</code> <a class="header-anchor" href="#loop" aria-label="Permalink to &quot;\`@loop\`&quot;">​</a></h2><p>Triggers after the carousel is going to loop over, only on <code>wrap-around</code> mode. it emits the following data:</p><ul><li><code>slidingToIndex</code></li><li><code>currentSlideIndex</code></li></ul>`,17),l=[t];function h(p,d,o,r,k,E){return a(),s("div",null,l)}const u=i(n,[["render",h]]);export{g as __pageData,u as default};
