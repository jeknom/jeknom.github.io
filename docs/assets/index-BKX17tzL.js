(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{let c=!1;setTimeout(()=>c=!0,3e3);const n=document.getElementById("flashlight");let i=window.innerWidth/2,r=window.innerHeight/2,e=i,t=r;function s(o){o&&(i=o.clientX,r=o.clientY)}function l(){n!==null&&(c&&(e+=(i-e)*.1,t+=(r-t)*.1,n.style.left=`${e}px`,n.style.top=`${t}px`),requestAnimationFrame(l))}l(),document.addEventListener("mousemove",s),document.querySelectorAll("img").forEach(o=>{o.addEventListener("load",()=>o.classList.add("animate-appear")),o.complete&&o.classList.add("animate-appear")});const d=document.getElementById("flashlight-on");if(n===null||d===null){console.error("Flashlight or target not found");return}const u={root:null,rootMargin:"0px",threshold:.1};new IntersectionObserver(function(o){o.forEach(f=>{f.isIntersecting?n.classList.add("visible"):n.classList.remove("visible")})},u).observe(d)});class m extends HTMLElement{connectedCallback(){this.innerHTML=this.getYearsAndMonthsSince(this.innerHTML)}getYearsAndMonthsSince(n){const[i,r,e]=n.split("-").map(Number),t=new Date(e,r-1,i),s=new Date;let l=s.getFullYear()-t.getFullYear(),a=s.getMonth()-t.getMonth();return a<0&&(l--,a+=12),`${l}y ${a}mo`}}customElements.define("time-since",m);
