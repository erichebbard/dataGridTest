import{S as x,i as P,s as C,e as w,b as m,H as T,h as c,o as E,k as h,l as S,m as D,J as G,q as v,a as k,y as O,r as A,c as M,z as I,G as H,A as L,g as N,d as B,B as Y}from"../chunks/index.bd5c734a.js";import{_ as z}from"../chunks/preload-helper.41c905a7.js";function V(i){let r,t,a;return{c(){r=h("div")},l(l){r=S(l,"DIV",{}),D(r).forEach(c)},m(l,d){m(l,r,d),t||(a=G(i[1].call(null,r)),t=!0)},d(l){l&&c(r),t=!1,a()}}}function q(i){let r,t=i[0]&&V(i);return{c(){t&&t.c(),r=w()},l(a){t&&t.l(a),r=w()},m(a,l){t&&t.m(a,l),m(a,r,l)},p(a,[l]){a[0]?t||(t=V(a),t.c(),t.m(r.parentNode,r)):t&&(t.d(1),t=null)},i:T,o:T,d(a){t&&t.d(a),a&&c(r)}}}function J(i,r,t){let{data:a}=r,{columns:l}=r,d=!1,f=!1,y=!1,s;E(()=>{(async()=>{const o=await z(()=>import("../chunks/index.b25c9b93.js"),[],import.meta.url);t(6,s=o.default),t(5,f=!0),t(4,d=!0)})()});function b(o,e,n,u,g,_,F){s.renderers.TextRenderer.apply(this,arguments),parseFloat(_,10)<100&&(e.style.background="red"),console.log(parseFloat(_,10))}function p(o,e,n,u,g,_,F){s.renderers.TextRenderer.apply(this,arguments),!_||_===""||_==="Gigabox"&&(e.style.fontStyle="italic"),e.style.background=""}function R(o){console.log("Good!"),s.renderers.registerRenderer("negativeValueRenderer",p),s.renderers.registerRenderer("priceRenderer",b);try{new s(o,{data:a,columns:l,width:"100%",height:"auto",colHeaders:!0,rowHeaders:!0,colWidths:100,columnSorting:!0,filters:!0,dropdownMenu:!0,manualColumnResize:!0,licenseKey:"non-commercial-and-evaluation",afterSelection(e,n,u,g){this.getCellMeta(u,g).readOnly?this.updateSettings({fillHandle:!1}):this.updateSettings({fillHandle:!0})},cells(e,n){const u={},g=this.instance.getData();return(e===0||g[e]&&g[e][n]==="readOnly")&&(u.readOnly=!0),n===2&&(u.renderer="priceRenderer"),u}})}catch(e){console.log("Handsontable initialization error:",e)}}return i.$$set=o=>{"data"in o&&t(2,a=o.data),"columns"in o&&t(3,l=o.columns)},i.$$.update=()=>{i.$$.dirty&48&&t(0,y=d&&f),i.$$.dirty&64&&s&&console.log(s)},[y,R,a,l,d,f,s]}class K extends x{constructor(r){super(),P(this,r,J,q,C,{data:2,columns:3})}}function U(i){let r,t,a,l,d,f,y,s,b,p,R,o;return l=new K({props:{data:i[0],columns:i[1]}}),{c(){r=h("span"),t=v("Grid is here:"),a=k(),O(l.$$.fragment),d=k(),f=h("br"),y=k(),s=h("br"),b=k(),p=h("div"),R=v("any price below $100 will be highlighted")},l(e){r=S(e,"SPAN",{});var n=D(r);t=A(n,"Grid is here:"),n.forEach(c),a=M(e),I(l.$$.fragment,e),d=M(e),f=S(e,"BR",{}),y=M(e),s=S(e,"BR",{}),b=M(e),p=S(e,"DIV",{});var u=D(p);R=A(u,"any price below $100 will be highlighted"),u.forEach(c)},m(e,n){m(e,r,n),H(r,t),m(e,a,n),L(l,e,n),m(e,d,n),m(e,f,n),m(e,y,n),m(e,s,n),m(e,b,n),m(e,p,n),H(p,R),o=!0},p:T,i(e){o||(N(l.$$.fragment,e),o=!0)},o(e){B(l.$$.fragment,e),o=!1},d(e){e&&c(r),e&&c(a),Y(l,e),e&&c(d),e&&c(f),e&&c(y),e&&c(s),e&&c(b),e&&c(p)}}}function W(i){return[[{brand:"Jetpulse",model:"Racing Socks",price:30,sellDate:"Oct 11, 2023",sellTime:"01:23 AM",inStock:!1},{brand:"Gigabox",model:"HL Mountain Frame",price:1890.9,sellDate:"May 3, 2023",sellTime:"11:27 AM",inStock:!1},{brand:"Camido",model:"Cycling Cap",price:130.1,sellDate:"Mar 27, 2023",sellTime:"03:17 AM",inStock:!0},{brand:"Chatterpoint",model:"Road Tire Tube",price:59,sellDate:"Aug 28, 2023",sellTime:"08:01 AM",inStock:!0},{brand:"Eidel",model:"HL Road Tire",price:279.99,sellDate:"Oct 2, 2023",sellTime:"13:23 AM",inStock:!0}],[{title:"Brand",type:"text",data:"brand",renderer:"negativeValueRenderer"},{title:"Model",type:"text",data:"model",renderer:"negativeValueRenderer"},{title:"Price",type:"numeric",data:"price",numericFormat:{pattern:"$ 0,0.00",culture:"en-US",renderer:"priceRenderer"}},{title:"Date",type:"date",data:"sellDate",dateFormat:"MMM D, YYYY",correctFormat:!0,className:"htRight",renderer:"negativeValueRenderer"},{title:"Time",type:"time",data:"sellTime",timeFormat:"hh:mm A",correctFormat:!0,className:"htRight",renderer:"negativeValueRenderer"},{title:"In stock",type:"checkbox",data:"inStock",className:"htCenter",renderer:"negativeValueRenderer"}]]}class X extends x{constructor(r){super(),P(this,r,W,U,C,{})}}export{X as component};