import{a as m,S as p,i as a}from"./assets/vendor-LvtvrCkc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const h="53608703-aa0418faf5290c51b47c4c69e",y="https://pixabay.com/api/";function g(n){return m.get(y,{params:{key:h,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(()=>{throw new Error("Error")})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),L=new p(".gallery a");function b(n){const t=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:r,views:i,comments:f,downloads:d})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${o}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${r}</p>
        <p>Views: ${i}</p>
        <p>Comments: ${f}</p>
        <p>Downloads: ${d}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",t),L.refresh()}function q(){c.innerHTML=""}function S(){l.classList.remove("hidden")}function v(){l.classList.add("hidden")}const u=document.querySelector(".form"),w=u.querySelector('input[name="search-text"]');u.addEventListener("submit",function(n){n.preventDefault();const t=w.value.trim();if(!t){a.warning({title:"Warning",message:"Please enter a search query!"});return}q(),S(),g(t).then(o=>{if(!o.hits||o.hits.length===0){a.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}b(o.hits)}).catch(o=>{a.error({title:"Error",message:o.message})}).finally(()=>{v()})});
//# sourceMappingURL=index.js.map
