(this.webpackJsonpflightpath=this.webpackJsonpflightpath||[]).push([[0],{17:function(t,e,n){},22:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),a=n(12),o=n.n(a),c=(n(17),n(3)),u=n(5),f=n.n(u),s=n(7),d=n(4),l=n(1),h=n(2),p={curvy:function(t,e,n,r,i){if(e.y>n.y){var a=e;e=n,n=a}var o=e.x>n.x?-6:6;t.lineWidth=i,t.strokeStyle=r,t.beginPath(),t.moveTo(e.x,e.y),Math.abs(e.y-n.y)>8&&Math.abs(e.x-n.x)>8&&(t.lineTo(e.x,(e.y+n.y)/2-6),t.arcTo(e.x,(e.y+n.y)/2,e.x+o,(e.y+n.y)/2,6),t.lineTo(n.x-o,(e.y+n.y)/2),t.arcTo(n.x,(e.y+n.y)/2,n.x,(e.y+n.y)/2+6,6),t.stroke()),t.lineTo(n.x,n.y),t.stroke()},angular:function(t,e,n,r,i){if(e.y<n.y){var a=e;e=n,n=a}t.lineWidth=i,t.strokeStyle=r,t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(e.x,e.y+1*(n.y-e.y)/4),t.lineTo(n.x,e.y+3*(n.y-e.y)/4),t.lineTo(n.x,n.y),t.stroke()}},b=function(t,e,n){return[[t,e,n,"#270000",10],[t,e,n,"#d90082",3],[t,e,n,"white",1.5]]},v=function(t,e,n){return[[t,e,n,"#080808",10],[t,e,n,"#222",3],[t,e,n,"#444",1]]},y=function(t,e,n){return[[t,e,n,"#111",10],[t,e,n,"#666",3],[t,e,n,"#fff",1]]};var m=function(t){return{x:t.getBoundingClientRect().left+document.documentElement.scrollLeft,y:t.getBoundingClientRect().top+document.documentElement.scrollTop}};function j(t){var e=t.nodes,n=t.dimensions,i=Object(r.useRef)(null);return Object(r.useEffect)((function(){var t=i.current;if(t){var n=t.getContext("2d");if(n){n.fillStyle="black",n.fillRect(0,0,t.width,t.height);var r=[];e.reverse().forEach((function(t){if(t.requires){var e=document.querySelector('[data-id="'.concat(t.id,'"]'));t.requires.map((function(t){return document.querySelector('[data-id="'.concat(t,'"]'))})).forEach((function(t){if(e&&t){var i=m(e);i.x=i.x+t.offsetWidth/2,i.y=i.y+t.offsetHeight/2;var a=m(t);a.x+=e.offsetWidth/2,a.y+=e.offsetHeight/2,"true"===t.getAttribute("data-active")?r.push(b(n,a,i)):"true"===e.getAttribute("data-active")&&"true"===t.getAttribute("data-assigned")?r.push(y(n,a,i)):r.push(v(n,a,i))}}))}})),function(t){for(var e=0;;){var n=t.map((function(t){return t[e]})).filter((function(t){return t}));if(!n.length)break;n.forEach((function(t){return p.angular.apply(p,Object(l.a)(t))})),e+=1}}(r)}}}),[i,e]),Object(h.a)("canvas",{ref:i,width:"".concat(n.x,"px"),height:"".concat(n.y,"px")})}var O=n(8);function g(t,e){var n=Object(c.a)({"api.token":document.phabricatorApiKey},x(e));return new Promise((function(e){var r;null===(r=document)||void 0===r||r.corsBypass({method:"POST",url:"https://".concat(document.phabricatorURL,"/api/").concat(t),headers:{"Content-Type":"application/x-www-form-urlencoded"},anonymous:!0,data:Object.entries(n).map((function(t){var e=Object(d.a)(t,2),n=e[0],r=e[1];return"".concat(encodeURIComponent(n),"=").concat(encodeURIComponent(r))})).join("&"),onload:function(t){console.log(t.responseText),e(JSON.parse(t.responseText))}})}))}function x(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"object"===typeof t?Object.assign.apply(Object,[{}].concat(Object(l.a)(Object.entries(t).map((function(t){var n=Object(d.a)(t,2),r=n[0];return x(n[1],e?"".concat(e,"[").concat(r,"]"):r)})).flat()))):Object(O.a)({},e,t)}function w(t,e){if(void 0===t.depth){var n=t.requires.map((function(t){return e[t]})).filter((function(t){return t}));if(!n.length)return t.depth=0,t.children=0,void(t.active=t.closed);n.forEach((function(t){return w(t,e)})),t.depth=Math.max.apply(Math,Object(l.a)(n.map((function(t){return t.depth}))))+1,t.children=n.map((function(t){return t.children})).reduce((function(t,e){return t+e}),n.length),t.active=n.some((function(t){return t.active}))}}var k=function(){var t,e={x:window.innerWidth,y:2e3},n=Math.floor(e.x/180)-1;n%2===0&&(n+=1);var i=Object(r.useState)(!1),a=Object(d.a)(i,2),o=a[0],u=a[1];Object(r.useEffect)((function(){var t=function(t){(t.ctrlKey||t.metaKey)&&"e"===t.key&&u((function(t){return!t}))};return document.addEventListener("keydown",t),function(){return document.removeEventListener("keydown",t)}}),[]);var p=Object(r.useState)(),b=Object(d.a)(p,2),v=b[0],y=b[1],m=Object(r.useState)([]),O=Object(d.a)(m,2),x=O[0],k=O[1],E=function(){var t=Object(s.a)(f.a.mark((function t(){var e,n,r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y(void 0),t.next=3,g("maniphest.search",{queryKey:"bYI2MjPZzE5c"});case 3:e=t.sent,n=e.result.data,r=n[Math.floor(Math.random()*n.length)],k([]),y(r.phid);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),T=function(){var t=Object(s.a)(f.a.mark((function t(e){var n,r,i;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y(void 0),t.next=3,g("maniphest.search",{constraints:{ids:[e.slice(2)]}});case 3:n=t.sent,r=n.result.data,i=r[Math.floor(Math.random()*r.length)],k([]),y(i.phid);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();Object(r.useEffect)((function(){window.location.hash?setTimeout((function(){return T(window.location.hash)}),1e3):setTimeout(E,1e3),document.addEventListener("hashchange",(function(){return T(window.location.hash)}))}),[]),Object(r.useEffect)((function(){function t(t){return e.apply(this,arguments)}function e(){return(e=Object(s.a)(f.a.mark((function t(e){var n,r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("maniphest.query",{phids:e});case 2:n=t.sent,r=n.result,k((function(t){return[].concat(Object(l.a)(t),Object(l.a)(Object.values(r).filter((function(e){return!t.find((function(t){return t.id===e.phid}))})).map((function(t){return{title:r[t.phid].title,id:t.phid,owner:t.ownerPHID,requires:t.dependsOnTaskPHIDs||[],closed:t.isClosed}}))))}));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}if(v)if(x.length){var n=[].concat(Object(l.a)(x.map((function(t){return t.requires})).flat()),[v]).filter((function(t){return!x.find((function(e){return t.includes(e.id)}))}));if(!n.length)return;t(n)}else document.corsBypass?t([v]):setTimeout((function(){return t([v])}),1e3)}),[x,v]);var q=Object(r.useState)({}),M=Object(d.a)(q,2),S=M[0],C=M[1];Object(r.useEffect)((function(){function t(){return(t=Object(s.a)(f.a.mark((function t(e){var n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g("user.query",{phids:e});case 2:n=t.sent,C((function(t){return Object(c.a)(Object(c.a)({},t),Object.fromEntries(Object.values(n.result).map((function(t){return[t.phid,t]}))))}));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var e=x.map((function(t){return t.owner})).filter((function(t){return!(!t||S[t])}));e.length&&function(e){t.apply(this,arguments)}(e)}),[x,S]);var B=[],P=Object.fromEntries(x.map((function(t){return[t.id,Object(c.a)(Object(c.a)({},t),{},{requiredBy:[]})]})));if(x.length&&v&&P[v]){!function(t,e){t.forEach((function(t){t.requires.forEach((function(n){var r,i;return null===(r=e[n])||void 0===r||null===(i=r.requiredBy)||void 0===i?void 0:i.push(t.id)}))}))}(x,P),w(P[v],P);var A=function(t,e){return void 0===t||void 0===e?0:e-t},I=Object.keys(P).filter((function(t){return t!==v})).map((function(t){return P[t]})).sort((function(t,e){return A(t.depth,e.depth)||A(t.children,e.children)||A(+!!t.active,+!!e.active)})),R=Math.floor(n/2);B=[{node:P[v],y:0,x:R}];for(var W=function(){var t=I[0];console.log({node:t}),I=I.slice(1);for(var e=B.filter((function(e){return t.requiredBy.includes(e.node.id)})),r=0,i=e.map((function(t){return Object(c.a)(Object(c.a)({},t),{},{y:t.y+1,reset:0,initialX:t.x})})),a=function(){if(!i.length)throw new Error;var e=i.filter((function(t){return!B.find((function(e){return e.x===t.x&&e.y===t.y}))}));if(e.length){if(B.push({x:e[0].x,y:e[0].y,node:t}),e[0].node.id!==v){var a=B.find((function(t){return t.node.id===e[0].node.id})),o=B.filter((function(t){return a.y===t.y})),u=[].concat(Object(l.a)(a.node.requiredBy),Object(l.a)(a.node.requires)).map((function(t){return B.find((function(e){return e.node.id===t}))})).filter((function(t){return t})),f=[].concat(Object(l.a)(Array.from(new Array(n).keys()).filter((function(t){return!o.some((function(e){return e.x===t}))}))),[a.x]).map((function(t){return{value:t,score:u.map((function(e){return Math.abs(((null===e||void 0===e?void 0:e.x)||0)-t)})).reduce((function(t,e){return t+e}),0)}})).sort((function(t,e){return t.score-e.score}));console.log(f),a.x=f[0].value}return"break"}r++,i=i.map((function(t){var e=r-t.reset,i=t.x+(e%2?e:-e),a=t.y,o=t.reset;return(i<0||i>=n)&&(o=r-1,a++,(i=t.initialX+1)>=n&&(o++,i-=2)),Object(c.a)(Object(c.a)({},t),{},{x:i,y:a,reset:o})}))};;){if("break"===a())break}var o=function(t,e){var n=[],r=[];return t.forEach((function(t){e(t)?n.push(t):r.push(t)})),[n,r]}(I,(function(e){return t.requires.includes(e.id)})),u=Object(d.a)(o,2),f=u[0],s=u[1];I=[].concat(Object(l.a)(f),Object(l.a)(s))};I.length;)W()}return e.y=Math.max(150*Math.max.apply(Math,Object(l.a)(B.map((function(t){return t.y}))))+235,window.innerHeight),Object(h.a)("div",{style:{color:"white"}},Object(h.a)(j,{nodes:x,dimensions:e}),Object(h.a)("div",{style:{position:"absolute",top:16,left:e.x/2,transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}},Object(h.a)("img",{src:x.length&&v?"/freelancer-neon.svg":"/freelancer-neon-off.svg",alt:"Freelancer Enterprise",onClick:function(){o||E()}}),Object(h.a)("div",null,v?null===(t=P[v])||void 0===t?void 0:t.title:null)),B.map((function(t,r){var i=t.node,a=t.x,o=t.y;return Object(h.a)("div",{style:{position:"absolute",left:(e.x-180*n)/2+180*(a+.5),top:170+150*o,fontSize:12,transform:"translateX(-50%) translateY(-50%)",display:"flex"}},Object(h.a)("div",{"data-id":i.id,"data-active":i.active,"data-assigned":!!i.owner,style:Object(c.a)(Object(c.a)({minWidth:32,minHeight:32,borderColor:"#fa5f9b",borderRadius:18,borderWidth:2,borderStyle:"solid",margin:"auto",visibility:r?"initial":"hidden"},i.active?{}:{filter:"grayscale(1) brightness(0.6)"}),i.owner&&S[i.owner]&&S[i.owner].image?{background:"url(".concat(S[i.owner].image,")"),backgroundSize:"cover"}:{background:"black"})}),i.id!==v?Object(h.a)("div",{style:{background:"rgba(0, 0, 0, 0.3)",margin:4,maxWidth:100,textAlign:"center"}},i.title):null)})))},E=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),r(t),i(t),a(t),o(t)}))};o.a.render(Object(h.a)(i.a.StrictMode,null,Object(h.a)(k,null)),document.getElementById("root")),E()}},[[22,1,2]]]);
//# sourceMappingURL=main.7824b0b9.chunk.js.map