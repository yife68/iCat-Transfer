let lastSayHello="",scrollSelfInfoContentYear="",CACHE_EXPIRATION_TIME=432e5,percentFlag=!1;const CACHE_POST_COVER="post_cover";var meuicat={comments:function(){fetch("/article.json").then((t=>t.json())).then((t=>{Object.keys(t);fetch("https://twikoo.meuicat.com/",{method:"POST",body:JSON.stringify({event:"GET_RECENT_COMMENTS",accessToken:"091e76c30b8bb8bc672808816ceb87e2",includeReply:!0,pageSize:-1}),headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((({data:t})=>{const e=t.length;document.querySelectorAll(".length-num.icat-pc-comment, .length-num.icat-pe-comment, .N_comments").forEach((t=>{t.classList.contains("N_comments")?t.innerText=e+"条评论":t.innerText=e})),console.log("本站Twikoo总评论数:",e)}))}))},toPage:function(){console.log("执行跳转");var t=document.querySelectorAll(".page-number"),e=parseInt(t[t.length-1].innerHTML),n=document.getElementById("toPageText"),o=parseInt(n.value);if(!isNaN(o)&&o>0&&"0"!==(""+o)[0]&&o<=e){var a=1==o?"/":"/page/"+o+"/#content-inner";document.getElementById("toPageButton").href=a}},listenToPageInputPress(){var t=document.getElementById("toPageText"),e=document.getElementById("toPageButton");t&&(t.addEventListener("keydown",(t=>{13===t.keyCode&&(meuicat.toPage(),pjax.loadUrl(e.href))})),t.addEventListener("input",(function(){""===t.value||"0"===t.value?e.classList.remove("haveValue"):e.classList.add("haveValue");var n=document.querySelectorAll(".page-number"),o=+n[n.length-1].innerHTML;+document.getElementById("toPageText").value>o&&(t.value=o)})))},photos:function(t){let e="https://memos.meuicat.com";fetch(t?`${e}/api/v1/memo?creatorId=1&tag=${t}`:`${e}/api/v1/memo?creatorId=1&tag=2023`).then((t=>t.json())).then((t=>{let n="",o=[];t.forEach((t=>{let n=t.content.match(/\!\[.*?\]\(.*?\)/g);n&&(o=o.concat(n)),t.resourceList.length&&t.resourceList.forEach((t=>{t.externalLink?o.push(`![](${t.externalLink})`):o.push(`![](${e}/o/r/${t.id}/${t.publicId}/${t.filename})`)}))})),o&&o.forEach((t=>{let e,o,a=t.replace(/!\[.*?\]\((.*?)\)/g,"$1"),i=t.replace(/!\[(.*?)\]\(.*?\)/g,"$1");-1!=i.indexOf(" ")?(e=i.split(" ")[0],o=i.split(" ")[1]):o=i,n+=`<div class="gallery-photo"><a href="${a}" data-fancybox="gallery" class="fancybox" data-thumb="${a}"><img class="no-lazyload photo-img" loading='lazy' decoding="async" src="${a}"></a>`,o&&(n+=`<span class="photo-title">${o}</span>`),e&&(n+=`<span class="photo-time">${e}</span>`),n+="</div>"})),document.querySelector(".gallery-photos.page").innerHTML=n,imgStatus.watch(".photo-img",(()=>{waterfall(".gallery-photos")})),window.Lately&&Lately.init({target:".photo-time"})})).catch();var n=document.querySelectorAll(".status-bar-item");Array.from(n).forEach((function(t){t.onclick=function(e){var n=document.querySelectorAll(".status-bar-item.selected");return Array.from(n).forEach((function(t){t.classList.remove("selected")})),t.classList.add("selected"),e.stopPropagation(),e.preventDefault(),!1}}))},diffDate:function(t,e=!1){const n=new Date,o=new Date(t),a=n.getTime()-o.getTime(),i=36e5,r=24*i;let c;const l=GLOBAL_CONFIG.date_suffix||{},s=l.day||"天前",d=l.hour||"小时前",m=l.hour||"分钟前";if(e){const t=a/r,e=a/i,n=a/6e4;c=a/2592e6>=1?o.toLocaleDateString().replace(/\//g,"-"):t>=1?parseInt(t)+" "+s:e>=1?parseInt(e)+" "+d:n>=1?parseInt(n)+" "+m:l.just}else c=parseInt(a/r);return c},changeTimeInEssay:function(){document.querySelector("#icat-bber")&&document.querySelectorAll("#icat-bber time").forEach((function(t){var e=t,n=e.getAttribute("datetime");e.innerText=meuicat.diffDate(n,!0),e.style.display="inline"}))},reflashEssayWaterFall:function(){document.querySelector("#waterfall")&&setTimeout((function(){waterfall("#waterfall"),document.getElementById("waterfall").classList.add("show")}),500)},replaceAll:function(t,e,n){return t.split(e).join(n)},commentText:function(t){"undefined"!=t&&"null"!=t||(t="好棒！");var e=document.getElementsByClassName("el-textarea__inner")[0],n=document.createEvent("HTMLEvents");if(e){n.initEvent("input",!0,!0);var o=meuicat.replaceAll(t,"\n","\n> ");e.value="> "+o+"\n\n",e.dispatchEvent(n);var a=document.querySelector("#post-comment").offsetTop;window.scrollTo(0,a-80),e.focus(),e.setSelectionRange(-1,-1),document.getElementById("comment-tips")&&document.getElementById("comment-tips").classList.add("show")}},tagsBarActive:function(){var t=decodeURIComponent(window.location.pathname).match(/\/(tags|categories)\/.*?\//),e=document.querySelector("#category-bar");if(t&&e){var n=t[0].split("/")[2];document.getElementById(n).classList.add("select")}},statusbar:function(t){const e=document.getElementById(t);if(e){const n="category-bar-items"===t?"category-bar-button":"status-bar-button",o=document.getElementById(n),a=e.scrollWidth-e.clientWidth;e.scrollLeft+e.clientWidth>=a-8?e.scrollTo({left:0,behavior:"smooth"}):e.scrollBy({left:e.clientWidth,behavior:"smooth"}),e.addEventListener("scroll",(function(){o.style.transform=e.scrollLeft+e.clientWidth>=a-8?"rotate(180deg)":""}),{once:!0})}},logInfo:function(){console.log(`Welcome to:\n%cMeuiCat V3.3.1:%c https://meuicat.com/update/%c\nThis site has been running stably for %c${Math.round(((new Date).getTime()-new Date("2021/10/15 01:32:00").getTime())/864e5)} %c days`,"border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#0084FF;margin:10px 0","border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;","","color:#0084FF","")},Weixin:function(){/MicroMessenger/i.test(navigator.userAgent)?window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkxNzEyNjYxMw==#wechat_redirect":window.open("/wechatOA/")},wowanimation:function(){wow=new WOW({boxClass:"wow",animateClass:"animation-slide-in",offset:0,mobile:!0,live:!0}),wow.init()},homeplatform:function(){fetch("https://cdn.meuicat.com/gh/yife/platform.json").then((t=>t.json())).then((t=>{document.querySelectorAll("#icat-platform").forEach((e=>{const n=e.parentNode.querySelector(".article-title").getAttribute("href");if(t[n]){let o="";for(const e in t[n]){let a="";switch(e){case"wechat":a="wechat",platformtitle="微信公众号";break;case"jianshu":a="jianshu",platformtitle="简书";break;case"zhihu":a="zhihu",platformtitle="知乎";break;case"juejin":a="juejin",platformtitle="稀土掘金";break;case"yixiaofeng":a="yixiaofeng",platformtitle="开发者博客"}o+=`<a class="${a}" title="该文章已在${platformtitle}中同步更新" href="${t[n][e]}" target="_blank"><i class="iconfont icat-${a}"></i></a>`}e.innerHTML=`<span>本文同步至：</span><div class="platform-box">${o}</div>`}else e.innerHTML='<span title="该文章在博客首发" onclick="pjax.loadUrl(\'/subscribe/\')">博客独享</span>'}))}))},postplatform:function(){fetch("https://cdn.meuicat.com/gh/yife/platform.json").then((t=>t.json())).then((t=>{document.querySelectorAll("#icat-meta-platform").forEach((e=>{const n=window.location.pathname;if(t[n]){let o=[];for(const e in t[n]){let a="",i="",r="";switch(e){case"wechat":a="wechat",i="微信公众号",r="亦小封";break;case"jianshu":a="jianshu",i="简书",r="亦小封";break;case"zhihu":a="zhihu",i="知乎",r="亦封";break;case"juejin":a="juejin",i="稀土掘金",r="亦封";break;case"yixiaofeng":a="yixiaofeng",i="开发者博客",r="亦小封"}o.push(`<a class="${a}" title="ID：${r}" href="${t[n][e]}" target="_blank"><i class="iconfont icat-${a}"></i>${i}</a>`)}if(o.length>0){const t=2===o.length?"&nbsp;、":"，",n=o.join(t);e.innerHTML=`本文将与${n}进行同步更新`}else e.innerHTML='<span title="查看更多更新和订阅细则" onclick="pjax.loadUrl(\'/subscribe/\')">本文由博客首发、独享</span>'}else e.innerHTML='<span title="查看更多更新和订阅细则" onclick="pjax.loadUrl(\'/subscribe/\')">本文由博客首发、独享</span>'}))}))},addScript(t,e,n){if(document.getElementById(t))return n?n():void 0;let o=document.createElement("script");o.src=e,o.id=t,n&&(o.onload=n),document.head.appendChild(o)},getIpInfo:function(){fetch("https://api.qjqq.cn/api/Local").then((t=>t.json())).then((t=>{var e=t.ip,n=t.data.country,o=t.data.prov,a=t.data.city,i=t.data.district,r=t.data.radius,c=Math.floor(r),l=t.data.isp;document.getElementById("userAgentIp").innerHTML=e,document.getElementById("userAgentCountry").innerHTML=n,document.getElementById("userAgentProv").innerHTML=o,document.getElementById("userAgentCity").innerHTML=a,document.getElementById("userAgentDistrict").innerHTML=i,document.getElementById("userAgentRadius").innerHTML=c+"公里",document.getElementById("userAgentISP").innerHTML=l;var s=(new UAParser).getResult();document.getElementById("userAgentOS").innerHTML=s.os.name+" "+s.os.version,document.getElementById("userAgentBrowser").innerHTML=s.browser.name+" "+s.browser.version}))},postai:function(){const t=window.location.pathname;fetch("https://cdn.meuicat.com/gh/yife/abstract.json").then((t=>t.json())).then((e=>{if(t in e){const n=document.createElement("div");n.id="post-ai",n.innerHTML='\n\t\t\t\t<div class="ai-title">\n\t\t\t\t  <a class="ai-title-left" href="/blog/42#Ai文章摘要" title="查看部署" data-pjax-state="">\n\t\t\t\t\t<i class="iconfont icat-Ai-Summary"></i>\n\t\t\t\t\t<div class="ai-title-text">文章摘要</div>\n\t\t\t\t  </a>\n\t\t\t\t  <div class="ai-tag">iCatGPT</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="ai-explanation" style="display: block;">\n\t\t\t\t  加载中...<span class="blinking-cursor"></span>\n\t\t\t\t</div>\n\t\t\t  ';const o=document.querySelector("#post #article-container");o.insertBefore(n,o.firstChild);const a=document.querySelector(".ai-explanation"),i=e[t],r=i.length;let c=0,l=document.querySelector(".blinking-cursor");const s=Math.floor(3*Math.random())+1;setTimeout((()=>{a.innerHTML="",a.appendChild(l);const t=setInterval((()=>{l.parentNode.removeChild(l),a.innerHTML+=i[c],a.appendChild(l),c++,c===r&&(clearInterval(t),l.parentNode.removeChild(l))}),90)}),1e3*s)}})).catch((t=>console.error(t)))},all_tags:function(){document.querySelectorAll("#aside-content .card-tag-cloud").forEach((function(t){t.classList.add("all-tags")}));var t=document.getElementById("more-tags-btn");t&&t.parentNode.removeChild(t)},TagsRandom:function(t){return Math.floor(Math.random()*t)},Tagscolor:function(){const t=document.querySelectorAll("#aside-content .card-tag-cloud a"),e=[];for(;e.length<5;){const n=meuicat.TagsRandom(t.length);e.includes(n)||(e.push(n),t[n].style.color="var(--icat-blue)")}},Introduction:function(){const t=["🤖️ 数码科技爱好者","🔍 分享与热心帮助","🏠 智能家居小能手","🔨 设计开发一条龙","📷 人文摄影的坚定者","🏃 脚踏实地行动派","📚 热爱阅读的书虫迷","🎵 薛之谦八年热爱粉","🏋️‍♀️ 坚韧不拔的健身达人","🍜 走哪吃哪的美食迷","🎮 Minecraft骨灰级玩家","👨‍🍳 一位爱做饭的程序猿"],e=document.getElementById("Introduction");let n=t[Math.floor(Math.random()*t.length)];for(;n===lastSayHello;)n=t[Math.floor(Math.random()*t.length)];e.textContent=n,lastSayHello=n},runtimen:function(){let t=new Date("2021/10/15 00:00:00").getTime(),e=(new Date).getTime(),n=(Math.round((e-t)/1e3)/7884e4).toFixed(2),o=document.getElementById("run-time");o&&(o.innerHTML=`已稳定运行 ${n} 坤年 🏀`),setTimeout(meuicat.runtime,1e3)},fiftyonela:function(){fetch("https://v6-widget.51.la/v6/K05NsEfoZbXF1Nxt/quote.js").then((t=>t.text())).then((t=>{let e=["今日人数","今日访问","昨日人数","昨日访问","本月访问"],n=t.match(/(<\/span><span>).*?(\/span><\/p>)/g);n=n.map((t=>t.replace(/(<\/span><span>)/g,"").replace(/(<\/span><\/p>)/g,"")));let o=document.getElementById("statistic"),a=n[0],i=document.querySelector(".T-box");i&&(i.innerHTML="最近活跃："+a+"&ensp;|&ensp;"+i.innerHTML);for(let t=0;t<n.length;t++){if(!o)return;0!=t&&t!=n.length-1&&(o.innerHTML+='<div><span class="tips">'+e[t-1]+"</span><span id="+e[t-1]+">"+n[t]+"</span></div>")}}))},owoBig:function(){let t=1,e="",n=document.createElement("div"),o=document.querySelector("body");n.id="owo-big",o.appendChild(n),new MutationObserver((a=>{for(let i=0;i<a.length;i++){let r=a[i].addedNodes,c="";2==r.length&&"OwO-body"==r[1].className&&(c=r[1],document.body.clientWidth<=768&&c.addEventListener("contextmenu",(t=>t.preventDefault())),c.onmouseover=a=>{t&&"IMG"==a.target.tagName&&(t=0,e=setTimeout((()=>{let t=3*a.target.clientHeight,e=3*a.target.clientWidth,i=a.x-a.offsetX-(e-a.target.clientWidth)/2,r=a.y-a.offsetY;i+e>o.clientWidth&&(i-=i+e-o.clientWidth+10),i<0&&(i=10),n.style.cssText=`display:flex; height:${t}px; width:${e}px; left:${i}px; top:${r}px;`,n.innerHTML=`<img src="${a.target.src}">`}),300))},c.onmouseout=()=>{n.style.display="none",t=1,clearTimeout(e)})}})).observe(document.getElementById("post-comment"),{subtree:!0,childList:!0})},copyToClipboard:function(t){const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)},ArticleContent:function(){const t=document.querySelector("#article-container");if(!t)return"未能成功获取到内容，请稍后重试！";const e=t.cloneNode(!0),n=e.querySelectorAll(".aplayer, .toggle, .gallery, .highlight"),o=e.querySelector("#post-ai");n.forEach((t=>t.remove())),o&&o.remove();const a=e.innerText.trim().replace(/\n+/g,"\n\n");return console.log("本篇文章内容为：\n\n"+a),meuicat.copyToClipboard(a),"已复制本篇内容~"},swiper(){var t=new Swiper("#RollBox",{passiveListeners:!0,loop:!0,autoplay:{disableOnInteraction:!0,delay:5e3},mousewheel:!0,pagination:{el:".swiper-pagination",clickable:!0}}),e=document.getElementById("Sticky-Posts");null!==e&&(e.onmouseenter=()=>{t.autoplay.stop()},e.onmouseleave=()=>{t.autoplay.start()})},getRandomElementsFromArray:function(t,e){const n=t.length,o=new Set;for(;o.size<e;){const e=Math.floor(Math.random()*n);o.add(t[e])}return Array.from(o)},renderingPosts:function(t){const e=meuicat.getRandomElementsFromArray(t,4).map((t=>`\n\t\t<div class="post_item">\n\t\t\t<a class="post_box" title="${t.title}" href="javascript:void(0)" rel="external nofollow noreferrer" onclick="pjax.loadUrl('${t.link}')">\n\t\t\t\t<div class="post-info">\n\t\t\t\t\t<p class="post-title">\n\t\t\t\t\t\t${t.title}\n\t\t\t\t\t</p>\n\t\t\t\t\t<div class="info-box">\n\t\t\t\t\t\t<span>${t.time}</span>\n\t\t\t\t\t\t<span style="margin: 0 6px">|</span>\n\t\t\t\t\t\t<span>${t.categories}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<p class="post_description">\n\t\t\t\t\t${t.description}\n\t\t\t\t</p>\n\t\t\t</a>\n\t\t</div>`)).join("");document.querySelector(".banner-random>.random-list").innerHTML=e},RandomPosts:function(){var t=sessionStorage.getItem("postsInfo"),e=sessionStorage.getItem("postsInfoTimestamp");t&&e&&Date.now()-e<CACHE_EXPIRATION_TIME?meuicat.renderingPosts(JSON.parse(t)):fetch("/articles-random.json").then((t=>t.json())).then((t=>{sessionStorage.setItem("postsInfo",JSON.stringify(t)),sessionStorage.setItem("postsInfoTimestamp",Date.now()),meuicat.renderingPosts(t)}))},RandomBar:function(t){const e=document.querySelector(".random-list");"prev"===t?e.scrollLeft-=210:"next"===t&&(e.scrollLeft+=210)},MemorialDayDate:function(){var t=new Date,e=("0"+(t.getMonth()+1)).slice(-2),n=("0"+t.getDate()).slice(-2);return["0707","0909","0918","1109","1213"].includes(e+n)},MemorialDay:function(){if(meuicat.MemorialDayDate()){var t=document.documentElement;t.style.filter="grayscale(100%)",t.style.webkitFilter="grayscale(100%)",t.style.MozFilter="grayscale(100%)",t.style.msFilter="grayscale(100%)",t.style.OFilter="grayscale(100%)"}},post_cover:function(){document.documentElement.style.setProperty("--icat-post-bg","var(--icat-blue)");const t=document.querySelector(".icat-post-cover img");if(!t)return void console.error("未找到封面图像src");const e=t.getAttribute("src"),n=JSON.parse(localStorage.getItem("post_cover"))||{};!n[e]||n[e].expiration<Date.now()?meuicat.im2color(e):(document.documentElement.style.setProperty("--icat-post-bg",n[e].color),t.style.setProperty("opacity",".9","important"))},im2color:function(t){const e="https://img2color.meuicat.com/api?img="+encodeURIComponent(t);fetch(e).then((t=>t.json())).then((e=>{const n=e.RGB;document.documentElement.style.setProperty("--icat-post-bg",n);const o=Date.now()+CACHE_EXPIRATION_TIME,a=JSON.parse(localStorage.getItem("post_cover"))||{};a[t]={color:n,expiration:o},localStorage.setItem("post_cover",JSON.stringify(a));const i=document.querySelector(".icat-post-cover img");i&&i.style.setProperty("opacity",".9","important")})).catch((t=>{console.error("获取颜色时出错：",t)}))}};function essayScroll(){const t=(document.documentElement.scrollTop||window.pageYOffset)%document.documentElement.clientHeight;t<=99||(t=99),!percentFlag&&t+100>=document.documentElement.clientHeight&&document.querySelector("#waterfall")?setTimeout((()=>{waterfall("#waterfall")}),500):setTimeout((()=>{document.querySelector("#waterfall")&&waterfall("#waterfall")}),500);const e=window.scrollY+document.documentElement.clientHeight;let n=document.getElementById("post-comment")||document.getElementById("footer");(n.offsetTop+n.offsetHeight/2<e||90<t)&&(percentFlag=!0)}