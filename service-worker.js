if(!self.define){let e,t={};const i=(i,n)=>(i=new URL(i+".js",n).href,t[i]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=t,document.head.appendChild(e)}else e=i,importScripts(i),t()})).then((()=>{let e=t[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(t[o])return;let s={};const l=e=>i(e,o),c={module:{uri:o},exports:s,require:l};t[o]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),s)))}}define(["./workbox-24d5432a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"a97fd4acf5fd238a542d33f97af10586"},{url:"/",revision:"index-20240116050818634"},{url:"about/",revision:"about-20240116050818634"}],{})}));