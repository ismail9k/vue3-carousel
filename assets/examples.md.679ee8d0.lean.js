import{C as v,S as f,N as b,P as S,E as P}from"./chunks/ExampleBasic.a8eb37ab.js";import{d as h,_ as d,o as r,y as q,z as o,D as s,C as n,c as F,K as A,x as D,t as u,F as y,B as $,a1 as N,a2 as w,a3 as V,a4 as I,N as C}from"./chunks/framework.76cc3df8.js";const G=h({name:"WrapAround",components:{Carousel:v,Slide:f,Navigation:b}}),R={class:"carousel__item"};function W(l,e,m,_,g,E){const t=s("Slide"),c=s("Navigation"),p=s("Carousel");return r(),q(p,{"items-to-show":2.5,"wrap-around":!0},{addons:o(()=>[n(c)]),default:o(()=>[(r(),F(y,null,A(10,a=>n(t,{key:a},{default:o(()=>[D("div",R,u(a),1)]),_:2},1024)),64))]),_:1},8,["items-to-show"])}const L=d(G,[["render",W]]),Y=h({name:"Breakpoints",components:{Carousel:v,Slide:f,Navigation:b},data:()=>({settings:{itemsToShow:1,snapAlign:"center"},breakpoints:{700:{itemsToShow:3.5,snapAlign:"center"},1024:{itemsToShow:5,snapAlign:"start"}}})}),z={class:"carousel__item"};function U(l,e,m,_,g,E){const t=s("Slide"),c=s("Navigation"),p=s("Carousel");return r(),q(p,$(l.settings,{breakpoints:l.breakpoints}),{addons:o(()=>[n(c)]),default:o(()=>[(r(),F(y,null,A(10,a=>n(t,{key:a},{default:o(()=>[D("div",z,u(a),1)]),_:2},1024)),64))]),_:1},16,["breakpoints"])}const Z=d(Y,[["render",U]]),X=h({name:"ExamplePagination",components:{Carousel:v,Slide:f,Navigation:b,Pagination:S},data:()=>({settings:{itemsToShow:1,snapAlign:"center"}})}),j={class:"carousel__item"};function J(l,e,m,_,g,E){const t=s("Slide"),c=s("Pagination"),p=s("Navigation"),a=s("Carousel");return r(),q(a,N(w(l.settings)),{addons:o(()=>[n(c),n(p)]),default:o(()=>[(r(),F(y,null,A(10,i=>n(t,{key:i},{default:o(()=>[D("div",j,u(i),1)]),_:2},1024)),64))]),_:1},16)}const K=d(X,[["render",J]]),M=h({name:"Autoplay",components:{Carousel:v,Slide:f,Pagination:S}}),O={class:"carousel__item"};function H(l,e,m,_,g,E){const t=s("Slide"),c=s("Pagination"),p=s("Carousel");return r(),q(p,{autoplay:2e3,"wrap-around":!0,"pause-autoplay-on-hover":""},{addons:o(()=>[n(c)]),default:o(()=>[(r(),F(y,null,A(10,a=>n(t,{key:a},{default:o(()=>[D("div",O,u(a),1)]),_:2},1024)),64))]),_:1})}const Q=d(M,[["render",H]]);const ss=h({name:"Basic",components:{Carousel:v,Slide:f,Pagination:S,Navigation:b}}),ns={class:"carousel__item"};function as(l,e,m,_,g,E){const t=s("Slide"),c=s("Navigation"),p=s("Pagination"),a=s("Carousel");return r(),q(a,{id:"activeClasses",itemsToShow:3.95,wrapAround:!0,transition:500},{addons:o(()=>[n(c),n(p)]),default:o(()=>[(r(),F(y,null,A(10,i=>n(t,{key:i},{default:o(()=>[D("div",ns,u(i),1)]),_:2},1024)),64))]),_:1},8,["itemsToShow"])}const ls=d(ss,[["render",as]]),ps=h({name:"CustomNavigation",components:{Carousel:v,Slide:f,Navigation:b},data:()=>({currentSlide:0}),methods:{next(){this.$refs.carousel.next()},prev(){this.$refs.carousel.prev()}}}),os={class:"carousel__item"};function es(l,e,m,_,g,E){const t=s("Slide"),c=s("Navigation"),p=s("Carousel");return r(),F(y,null,[n(p,{ref:"carousel",modelValue:l.currentSlide,"onUpdate:modelValue":e[0]||(e[0]=a=>l.currentSlide=a),snapAlign:"start"},{addons:o(()=>[n(c)]),default:o(()=>[(r(),F(y,null,A(10,a=>n(t,{key:a},{default:o(()=>[D("div",os,u(a-1),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),D("div",null,[D("button",{onClick:e[1]||(e[1]=(...a)=>l.prev&&l.prev(...a))},"Prev"),V(D("input",{type:"number",min:"0",max:"9","onUpdate:modelValue":e[2]||(e[2]=a=>l.currentSlide=a)},null,512),[[I,l.currentSlide]]),D("button",{onClick:e[3]||(e[3]=(...a)=>l.next&&l.next(...a))},"Next")])],64)}const ts=d(ps,[["render",es]]),cs=h({name:"Basic",components:{Carousel:v,Slide:f,Pagination:S,Navigation:b}}),rs={class:"carousel__item"};function Ds(l,e,m,_,g,E){const t=s("Slide"),c=s("Navigation"),p=s("Pagination"),a=s("Carousel");return r(),q(a,{i18n:{ariaNextSlide:"Zur nächsten Slide",ariaPreviousSlide:"Zur vorherigen Slide",ariaNavigateToSlide:"Springe zu Slide {slideNumber}",ariaGallery:"Galerie",itemXofY:"Slide {currentSlide} von {slidesCount}",iconArrowUp:"Pfeil nach oben",iconArrowDown:"Pfeil nach unten",iconArrowRight:"Pfeil nach rechts",iconArrowLeft:"Pfeil nach links"}},{addons:o(()=>[n(c),n(p)]),default:o(()=>[(r(),F(y,null,A(10,i=>n(t,{key:i},{default:o(()=>[D("div",rs,u(i),1)]),_:2},1024)),64))]),_:1})}const Fs=d(cs,[["render",Ds]]);const ys=h({name:"WrapAround",components:{Carousel:v,Slide:f},data:()=>({currentSlide:0}),methods:{slideTo(l){this.currentSlide=l}}}),is={class:"carousel__item"},Cs=["onClick"];function As(l,e,m,_,g,E){const t=s("Slide"),c=s("Carousel");return r(),F(y,null,[n(c,{id:"gallery","items-to-show":1,"wrap-around":!1,modelValue:l.currentSlide,"onUpdate:modelValue":e[0]||(e[0]=p=>l.currentSlide=p)},{default:o(()=>[(r(),F(y,null,A(10,p=>n(t,{key:p},{default:o(()=>[D("div",is,u(p),1)]),_:2},1024)),64))]),_:1},8,["modelValue"]),n(c,{id:"thumbnails","items-to-show":4,"wrap-around":!0,modelValue:l.currentSlide,"onUpdate:modelValue":e[1]||(e[1]=p=>l.currentSlide=p),ref:"carousel"},{default:o(()=>[(r(),F(y,null,A(10,p=>n(t,{key:p},{default:o(()=>[D("div",{class:"carousel__item",onClick:a=>l.slideTo(p-1)},u(p),9,Cs)]),_:2},1024)),64))]),_:1},8,["modelValue"])],64)}const us=d(ys,[["render",As]]);const ds={components:{ExampleBasic:P,ExampleWrapAround:L,ExampleBreakpoints:Z,ExampleAutoplay:Q,ExamplePagination:K,ExampleActiveClasses:ls,ExampleCustomNavigation:ts,ExampleCustomLabels:Fs,ExampleGallery:us}},Bs=JSON.parse('{"title":"Examples","description":"","frontmatter":{},"headers":[],"relativePath":"examples.md"}'),ms=C("",2),_s=C("",2),gs=C("",2),Es=C("",2),vs=C("",2),fs=C("",2),hs=C("",2),bs=C("",2),qs=C("",2),Ss=C("",1);function xs(l,e,m,_,g,E){const t=s("ExampleBasic"),c=s("ExampleWrapAround"),p=s("ExampleBreakpoints"),a=s("ExamplePagination"),i=s("ExampleAutoplay"),x=s("ExampleActiveClasses"),k=s("ExampleCustomNavigation"),T=s("ExampleCustomLabels"),B=s("ExampleGallery");return r(),F("div",null,[ms,n(t),_s,n(c),gs,n(p),Es,n(a),vs,n(i),fs,n(x),hs,n(k),bs,n(T),qs,n(B),Ss])}const Ps=d(ds,[["render",xs]]);export{Bs as __pageData,Ps as default};