"use strict";(self.webpackChunkhack_change_2023_client=self.webpackChunkhack_change_2023_client||[]).push([[720],{6056:(e,t,n)=>{n.d(t,{I:()=>k});var r=n(4942),o=n(4925),a=n(7294),c=n(3379),s=n.n(c),l=n(7795),u=n.n(l),i=n(569),d=n.n(i),p=n(3565),f=n.n(p),b=n(9216),h=n.n(b),v=n(4589),g=n.n(v),m=n(6408),y={};y.styleTagTransform=g(),y.setAttributes=f(),y.insert=d().bind(null,"head"),y.domAPI=u(),y.insertStyleElement=h(),s()(m.Z,y);const j=m.Z&&m.Z.locals?m.Z.locals:void 0;var O=n(5893),x=["value","onChange","type","autoFocus","readonly"];function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var k=(0,a.memo)((function(e){var t=(0,a.useRef)(null),n=e.value,c=e.onChange,s=e.type,l=void 0===s?"text":s,u=e.autoFocus,i=e.readonly,d=(0,o.Z)(e,x);return(0,a.useEffect)((function(){var e;u&&(null===(e=t.current)||void 0===e||e.focus())}),[u]),(0,O.jsx)("input",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({ref:t,value:n||"",onChange:function(e){null==c||c(e.target.value)},className:j.Input,type:l,readOnly:i},d))}))},720:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var r=n(885),o=n(9330),a=n(7294),c=n(6056),s=n(9400),l=n(3329),u=n(9250),i=n(2094),d=n(8465),p=n(5401),f=n(5893);const b=function(){(0,a.useEffect)((function(){document.title="Hack&Change 2023"}),[]);var e=(0,u.s0)(),t=(0,p.T)(),n=(0,a.useState)(""),b=(0,r.Z)(n,2),h=b[0],v=b[1],g=(0,a.useState)(""),m=(0,r.Z)(g,2),y=m[0],j=m[1],O=(0,a.useState)(),x=(0,r.Z)(O,2),w=x[0],k=x[1],Z=(0,a.useState)(new WebSocket("ws://localhost:5000")),C=(0,r.Z)(Z,1)[0],S=(0,a.useCallback)((function(n){n.preventDefault(),C.send(JSON.stringify({type:"connection",room:w,username:h,password:y})),t(d._.setUsername(h)),e("".concat(i.h3.chat,"/").concat(w))}),[t,e,y,w,C,h]);return(0,f.jsx)(o.T,{children:(0,f.jsx)(l.g,{maxW:!0,children:(0,f.jsxs)("form",{onSubmit:S,children:[(0,f.jsx)(c.I,{placeholder:"Имя пользователя",value:h,onChange:v}),(0,f.jsx)(c.I,{placeholder:"Пароль",value:y,onChange:j}),(0,f.jsx)(c.I,{placeholder:"ID комнаты",value:w,onChange:k}),(0,f.jsx)(s.z,{type:"submit",children:"Войти"})]})})})}},6408:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(8081),o=n.n(r),a=n(3645),c=n.n(a)()(o());c.push([e.id,".d3816{width:100%;padding:5px 10px;border:none;color:inherit;background:rgba(0,0,0,0);font:var(--font-m);transition:200ms;margin-bottom:5px;border-bottom:2px solid var(--card-bg);outline:none}.d3816:active,.d3816:focus{border-bottom:2px solid var(--inverted-bg-color)}",""]),c.locals={Input:"d3816"};const s=c}}]);