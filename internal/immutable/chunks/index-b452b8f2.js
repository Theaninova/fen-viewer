function j(){}function H(t,e){for(const n in e)t[n]=e[n];return t}function I(t){return t&&typeof t=="object"&&typeof t.then=="function"}function T(t){return t()}function M(){return Object.create(null)}function g(t){t.forEach(T)}function W(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function G(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return j;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function dt(t,e,n){t.$$.on_destroy.push(J(e,n))}function _t(t,e,n,r){if(t){const c=B(t,e,n,r);return t[0](c)}}function B(t,e,n,r){return t[1]&&r?H(n.ctx.slice(),t[1](r(e))):n.ctx}function ht(t,e,n,r){if(t[2]&&r){const c=t[2](r(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const l=[],u=Math.max(e.dirty.length,c.length);for(let s=0;s<u;s+=1)l[s]=e.dirty[s]|c[s];return l}return e.dirty|c}return e.dirty}function mt(t,e,n,r,c,l){if(c){const u=B(e,n,r,l);t.p(u,c)}}function pt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function yt(t){return t==null?"":t}let v=!1;function K(){v=!0}function Q(){v=!1}function R(t,e,n,r){for(;t<e;){const c=t+(e-t>>1);n(c)<=r?t=c+1:e=c}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let c=0;for(let i=0;i<e.length;i++){const o=e[i].claim_order,f=(c>0&&e[n[c]].claim_order<=o?c+1:R(1,c,_=>e[n[_]].claim_order,o))-1;r[i]=n[f]+1;const a=f+1;n[a]=i,c=Math.max(a,c)}const l=[],u=[];let s=e.length-1;for(let i=n[c]+1;i!=0;i=r[i-1]){for(l.push(e[i-1]);s>=i;s--)u.push(e[s]);s--}for(;s>=0;s--)u.push(e[s]);l.reverse(),u.sort((i,o)=>i.claim_order-o.claim_order);for(let i=0,o=0;i<u.length;i++){for(;o<l.length&&u[i].claim_order>=l[o].claim_order;)o++;const f=o<l.length?l[o]:null;t.insertBefore(u[i],f)}}function V(t,e){if(v){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){v&&!n?V(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function X(t){t.parentNode.removeChild(t)}function bt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function Z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function C(t){return document.createTextNode(t)}function xt(){return C(" ")}function $t(){return C("")}function vt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function kt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function wt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function tt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,r,c=!1){et(t);const l=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c||(t.claim_info.last_index=u),s}}for(let u=t.claim_info.last_index-1;u>=0;u--){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,s}}return r()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function O(t,e,n,r){return D(t,c=>c.nodeName===e,c=>{const l=[];for(let u=0;u<c.attributes.length;u++){const s=c.attributes[u];n[s.name]||l.push(s.name)}l.forEach(u=>c.removeAttribute(u))},()=>r(e))}function Et(t,e,n){return O(t,e,n,Y)}function jt(t,e,n){return O(t,e,n,Z)}function nt(t,e){return D(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>C(e),!0)}function Ct(t){return nt(t," ")}function Nt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function St(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function At(t,e,n){t.classList[n?"add":"remove"](e)}function rt(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const c=document.createEvent("CustomEvent");return c.initCustomEvent(t,n,r,e),c}let y;function d(t){y=t}function m(){if(!y)throw new Error("Function called outside component initialization");return y}function Mt(t){m().$$.on_mount.push(t)}function Lt(t){m().$$.after_update.push(t)}function Pt(){const t=m();return(e,n,{cancelable:r=!1}={})=>{const c=t.$$.callbacks[e];if(c){const l=rt(e,n,{cancelable:r});return c.slice().forEach(u=>{u.call(t,l)}),!l.defaultPrevented}return!0}}function Tt(t,e){return m().$$.context.set(t,e),e}function Bt(t){return m().$$.context.get(t)}const p=[],L=[],x=[],P=[],q=Promise.resolve();let w=!1;function z(){w||(w=!0,q.then(N))}function Dt(){return z(),q}function E(t){x.push(t)}const k=new Set;let b=0;function N(){const t=y;do{for(;b<p.length;){const e=p[b];b++,d(e),ct(e.$$)}for(d(null),p.length=0,b=0;L.length;)L.pop()();for(let e=0;e<x.length;e+=1){const n=x[e];k.has(n)||(k.add(n),n())}x.length=0}while(p.length);for(;P.length;)P.pop()();w=!1,k.clear(),d(t)}function ct(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const $=new Set;let h;function it(){h={r:0,c:[],p:h}}function ut(){h.r||g(h.c),h=h.p}function F(t,e){t&&t.i&&($.delete(t),t.i(e))}function lt(t,e,n,r){if(t&&t.o){if($.has(t))return;$.add(t),h.c.push(()=>{$.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function Ot(t,e){const n=e.token={};function r(c,l,u,s){if(e.token!==n)return;e.resolved=s;let i=e.ctx;u!==void 0&&(i=i.slice(),i[u]=s);const o=c&&(e.current=c)(i);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==l&&a&&(it(),lt(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),ut())}):e.block.d(1),o.c(),F(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[l]=o),f&&N()}if(I(t)){const c=m();if(t.then(l=>{d(c),r(e.then,1,e.value,l),d(null)},l=>{if(d(c),r(e.catch,2,e.error,l),d(null),!e.hasCatch)throw l}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function qt(t,e,n){const r=e.slice(),{resolved:c}=t;t.current===t.then&&(r[t.value]=c),t.current===t.catch&&(r[t.error]=c),t.block.p(r,n)}function zt(t,e){const n={},r={},c={$$scope:1};let l=t.length;for(;l--;){const u=t[l],s=e[l];if(s){for(const i in u)i in s||(r[i]=1);for(const i in s)c[i]||(n[i]=s[i],c[i]=1);t[l]=s}else for(const i in u)c[i]=1}for(const u in r)u in n||(n[u]=void 0);return n}function Ft(t){return typeof t=="object"&&t!==null?t:{}}function Ht(t){t&&t.c()}function It(t,e){t&&t.l(e)}function st(t,e,n,r){const{fragment:c,on_mount:l,on_destroy:u,after_update:s}=t.$$;c&&c.m(e,n),r||E(()=>{const i=l.map(T).filter(W);u?u.push(...i):g(i),t.$$.on_mount=[]}),s.forEach(E)}function ot(t,e){const n=t.$$;n.fragment!==null&&(g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(p.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Wt(t,e,n,r,c,l,u,s=[-1]){const i=y;d(t);const o=t.$$={fragment:null,ctx:null,props:l,update:j,not_equal:c,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:M(),dirty:s,skip_bound:!1,root:e.target||i.$$.root};u&&u(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,_,...S)=>{const A=S.length?S[0]:_;return o.ctx&&c(o.ctx[a],o.ctx[a]=A)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](A),f&&at(t,a)),_}):[],o.update(),f=!0,g(o.before_update),o.fragment=r?r(o.ctx):!1,e.target){if(e.hydrate){K();const a=tt(e.target);o.fragment&&o.fragment.l(a),a.forEach(X)}else o.fragment&&o.fragment.c();e.intro&&F(t.$$.fragment),st(t,e.target,e.anchor,e.customElement),Q(),N()}d(i)}class Gt{$destroy(){ot(this,1),this.$destroy=j}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!G(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{zt as A,Ft as B,ot as C,H as D,Dt as E,_t as F,mt as G,pt as H,ht as I,V as J,vt as K,kt as L,g as M,Pt as N,L as O,Z as P,jt as Q,bt as R,Gt as S,At as T,Bt as U,dt as V,Ot as W,qt as X,yt as Y,W as Z,tt as a,wt as b,Et as c,X as d,Y as e,St as f,gt as g,nt as h,Wt as i,Nt as j,xt as k,$t as l,Ct as m,j as n,it as o,lt as p,ut as q,F as r,ft as s,C as t,Tt as u,Lt as v,Mt as w,Ht as x,It as y,st as z};
