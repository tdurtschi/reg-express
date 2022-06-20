(function(){"use strict";var e={2769:function(e,t,n){var l=n(9242),r=n(3396);function i(e,t,n,l,i,a){const u=(0,r.up)("RegExpress");return(0,r.wg)(),(0,r.j4)(u,{id:l.currentLevel.id,puzzle:l.currentLevel.puzzle,availableTiles:l.currentLevel.availableTiles,hasNextLevel:l.hasNextLevel,onNextLevel:l.nextLevel},null,8,["id","puzzle","availableTiles","hasNextLevel","onNextLevel"])}var a=n(7139);const u={class:"main"},o={class:"puzzle-tiles-section"},s=["onClick"],c={class:"staging-area border"},v={class:"actions"},d=["disabled"],f=["disabled"],p={class:"border puzzle"},z={key:0,class:"result"},h={key:1,class:"actions"};function g(e,t,n,l,i,g){return(0,r.wg)(),(0,r.iD)("main",u,[(0,r._)("h1",null,"Reg Express - Level "+(0,a.zw)(n.id),1),(0,r.Uk)(" "+(0,a.zw)("1"==n.id?"Choose from the tiles below to craft your solution:":"")+" ",1),(0,r._)("section",o,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.remainingTiles,((t,n)=>((0,r.wg)(),(0,r.iD)("div",{class:"available puzzle-tile",key:n,onClick:n=>e.add(t)},(0,a.zw)(t),9,s)))),128))]),(0,r._)("section",c,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.solutionTiles,(e=>((0,r.wg)(),(0,r.iD)("div",{class:"puzzle-tile",key:e.id},(0,a.zw)(e.char),1)))),128))]),(0,r._)("section",v,[(0,r._)("button",{type:"button",class:"go",onClick:t[0]||(t[0]=(...t)=>e.doPuzzle&&e.doPuzzle(...t)),disabled:e.currentIndex>-1}," Go ",8,d),(0,r._)("button",{type:"button",class:"reset",onClick:t[1]||(t[1]=(...t)=>e.restart&&e.restart(...t)),disabled:e.currentIndex>-1}," Reset ",8,f)]),(0,r._)("div",p,[(0,r._)("div",{class:(0,a.C_)(""+(e.currentIndex<0?"train":"placeholder"))},null,2),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.puzzleTiles,(t=>((0,r.wg)(),(0,r.iD)("div",{class:(0,a.C_)(`puzzle-tile ${e.currentIndex==t.id?"train":""} ${t.highlight?`highlight-${t.highlight}`:""}`),key:t.id},(0,a.zw)(t.id==e.currentIndex?"":t.char),3)))),128)),(0,r._)("div",{class:(0,a.C_)(""+(e.currentIndex>=e.puzzleTiles.length?"train":"finish"))},null,2)]),e.result?((0,r.wg)(),(0,r.iD)("section",z,(0,a.zw)(e.result),1)):(0,r.kq)("",!0),e.result?((0,r.wg)(),(0,r.iD)("section",h,[(0,r._)("button",{type:"button",onClick:t[2]||(t[2]=(...t)=>e.restart&&e.restart(...t))},"Restart"),n.hasNextLevel?((0,r.wg)(),(0,r.iD)("button",{key:0,type:"button",onClick:t[3]||(t[3]=t=>e.$emit("nextLevel"))}," Next Level ")):(0,r.kq)("",!0)])):(0,r.kq)("",!0)])}var b=n(4870),x={name:"RegExpress",props:{puzzle:String,availableTiles:Array,id:String,hasNextLevel:Boolean},setup:e=>{const t=(0,b.iH)(""),n=(0,b.iH)([]),l=(0,r.Fl)((()=>n.value.reduce(((e,t)=>e+t),"")));let{puzzle:i,availableTiles:a}=(0,b.BK)(e);const u=(0,b.iH)(-1),o=(0,b.iH)(a.value.map((e=>e))),s=(0,r.Fl)((()=>{try{const e=new RegExp(`^${l.value}$`);return e.test(i.value)}catch{return!1}})),c=(e,t)=>{for(var n=1;n<=t.length;n++)try{const l=new RegExp(`^${t.substring(0,n)}$`),r=l.test(e);if(r)return!0}catch(l){}return!1},v=(0,r.Fl)((()=>{try{for(var e=i.value.length;e>=0;e--)if(c(i.value.substring(0,e),l.value))return e;return 0}catch{return-1}})),d=(0,r.Fl)((()=>n.value.map(((e,t)=>({char:e,id:t}))))),f=(0,r.Fl)((()=>i.value.split("").map(((e,t)=>({char:e,id:t,highlight:u.value>t?"green":u.value==t?t>v.value-1?"red":"green":""})))));async function p(){for(var e=0;e<=v.value;e++)await new Promise((e=>setTimeout(e,300))),u.value=e;t.value=s.value?"🎉 You won!":v.value<0?"🚨 Invalid Solution!":"🚫 You lose!"}function z(e){const t=o.value.findIndex((t=>t==e));o.value=o.value.filter(((e,n)=>n!=t)),n.value.push(e)}function h(){o.value=a.value,u.value=-1,n.value=[],t.value=""}return(0,r.YP)(i,h),{add:z,doPuzzle:p,solutionTiles:d,result:t,puzzleTiles:f,currentIndex:u,validSubstringLength:v,remainingTiles:o,restart:h}},methods:{}},w=n(89);const y=(0,w.Z)(x,[["render",g],["__scopeId","data-v-38eb473e"]]);var m=y;const k=[{id:"1.1",puzzle:"train",availableTiles:["t","r","a","i","n"]},{id:"1.2",puzzle:"train",availableTiles:["t","r","a","i","[a-z]"]},{id:"1.3",puzzle:"terrain",availableTiles:["t","r","a","i","[a-z]","[a-z]","[a-z]"]},{id:"1.4",puzzle:"forgery",availableTiles:["f","r","o","y","[a-z]","[a-z]","{3}"]},{id:"1.5",puzzle:"froyo rosy",availableTiles:["f","r","o","y",".","[a-z]","[a-z]","{2}","{4}"]},{id:"2",puzzle:"banana",availableTiles:["b","[an]","a","{4}"]}];function T(e){const t=document.location.href.split("level=")[1],n=e.find((e=>e.id==t));return n??e[0]}var _={name:"App",components:{RegExpress:m},data(){return{}},setup(){const e=(0,b.iH)(T(k));return{currentLevel:e,hasNextLevel:(0,r.Fl)((()=>k.findIndex((t=>t.id==e.value.id))<k.length-1)),nextLevel(){const t=k[k.findIndex((t=>t.id==e.value.id))+1].id;document.location.search=`?level=${t}`}}}};const L=(0,w.Z)(_,[["render",i]]);var C=L;(0,l.ri)(C).mount("#app")}},t={};function n(l){var r=t[l];if(void 0!==r)return r.exports;var i=t[l]={exports:{}};return e[l](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,l,r,i){if(!l){var a=1/0;for(c=0;c<e.length;c++){l=e[c][0],r=e[c][1],i=e[c][2];for(var u=!0,o=0;o<l.length;o++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](l[o])}))?l.splice(o--,1):(u=!1,i<a&&(a=i));if(u){e.splice(c--,1);var s=r();void 0!==s&&(t=s)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[l,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var r,i,a=l[0],u=l[1],o=l[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(o)var c=o(n)}for(t&&t(l);s<a.length;s++)i=a[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(c)},l=self["webpackChunkreg_express"]=self["webpackChunkreg_express"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=n.O(void 0,[998],(function(){return n(2769)}));l=n.O(l)})();
//# sourceMappingURL=app.d4ce612d.js.map