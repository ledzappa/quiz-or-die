(this["webpackJsonpquiz-or-die"]=this["webpackJsonpquiz-or-die"]||[]).push([[0],{41:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),s=n.n(r),a=n(29),i=n.n(a),o=(n(39),n(40),n(41),n(4)),u=n(3),l=n(9),j=n(17),d=n(73),b=n(30),h=n(10),O=n.n(h),f={getCategories:function(){return O.a.get("mocks/categories.json")},getPlayerDescriptionWords:function(){return O.a.get("mocks/playerDescriptionWords.json")},getQuestions:function(){return O.a.get("mocks/questions.json")},getRoundAndRoundThemes:function(){return O.a.get("mocks/roundAndRound.json")},addQuestion:function(e){return O.a.post("/api/questions",e)}},m=(n(61),n(33));n(62);function p(e){var t=e.players,n=e.setPlayers,s=Object(r.useState)(""),a=Object(u.a)(s,2),i=a[0],l=a[1],j=Object(r.useState)([]),b=Object(u.a)(j,2),h=b[0],O=b[1],p=Object(d.d)();Object(r.useEffect)((function(){f.getPlayerDescriptionWords().then((function(e){return O(e.data)}))}),[]);var x=function(e){n([].concat(Object(m.a)(t),[{name:e,description:v(),points:0,isPlayersTurn:!1,perks:{freedomOfChoice:0,doubleUp:0}}])),l("")},g=function(){!function(){var e=Math.floor(Math.random()*t.length);n(t.map((function(t,n){return e===n?Object(o.a)(Object(o.a)({},t),{},{isPlayersTurn:!0}):t})))}(),p.push("/show-turn")},v=function(){var e=h.nouns.length,t=Math.floor(Math.random()*e),n=h.nouns[t],c=h.adjectives.length,r=Math.floor(Math.random()*c),s=h.adjectives[r];return"The ".concat(s," ").concat(n)};return Object(c.jsx)("div",{className:"row justify-content-center",children:Object(c.jsxs)("div",{className:"col-12 col-sm-6 col-lg-6 col-xl-4",children:[Object(c.jsx)("h1",{children:"Add players"}),Object(c.jsx)("label",{children:"Name:"}),Object(c.jsxs)("div",{className:"input-group mb-3",children:[Object(c.jsx)("input",{type:"text",className:"form-control",value:i,onKeyPress:function(e){return"Enter"===e.key&&x(i)},onChange:function(e){return t=e.target.value,l(t);var t}}),Object(c.jsx)("button",{className:"btn btn-primary",onClick:function(){return x(i)},children:"Add"})]}),t.map((function(e,r){return Object(c.jsxs)("div",{className:"added-player",onClick:function(){return function(e){n(t.filter((function(t,n){return e!==n})))}(r)},children:[r+1,"."," ",Object(c.jsx)("span",{className:"font-weight-bold text-uppercase",children:e.name})," ","- ",e.description]},r)})),Object(c.jsx)("hr",{}),Object(c.jsx)("button",{className:"btn btn-primary",onClick:function(){return g()},disabled:t.length<2,children:"Start Game!"})]})})}var x=n(8);function g(e){var t=e.categories,n=Object(r.useState)({category:"",question:"",answer:""}),s=Object(u.a)(n,2),a=s[0],i=s[1],l=Object(r.useState)(!1),j=Object(u.a)(l,2),d=j[0],b=j[1];Object(r.useEffect)((function(){b(O(a))}),[a]);var h=function(e){var t=e.name,n=e.value;i(Object(o.a)(Object(o.a)({},a),{},Object(x.a)({},t,n)))},O=function(e){var t=e.category,n=e.question,c=e.answer;return console.log(c),0!==t.length&&(!(n.length<10)&&0!==c.length)};return Object(c.jsx)("div",{className:"row justify-content-center",children:Object(c.jsxs)("div",{className:"col-12 col-sm-8 col-md-6",children:[Object(c.jsx)("h1",{children:"Submit question"}),Object(c.jsx)("p",{children:"Select a category and fill out the form in order to submit a question. Your question will be reviewed by an administrator before it gets added to the app. Thanks for making the game better! <3"}),Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Category"}),Object(c.jsx)("select",{className:"form-control",name:"category",onChange:function(e){return h(e.target)},children:t.map((function(e,t){return Object(c.jsx)("option",{value:e.id,children:e.name},t)}))})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Question"}),Object(c.jsx)("textarea",{onChange:function(e){return h(e.target)},className:"form-control",name:"question",value:a.question,rows:"2"})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{children:"Answer"}),Object(c.jsx)("input",{onChange:function(e){return h(e.target)},className:"form-control",name:"answer",value:a.answer})]}),Object(c.jsx)("hr",{}),Object(c.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){return console.log(a),void f.addQuestion(a).then((function(){return console.log("usccess")})).catch((function(){return console.log("error")}))},disabled:!d,children:"Submit question"})]})]})})}function v(){var e=Object(d.d)();return Object(c.jsxs)("div",{className:"text-center",children:[Object(c.jsx)("h1",{children:"Quizmageddon"}),Object(c.jsx)("p",{children:"Welcome to quizmageddon - the best quiz game ever created by men. Start the game by adding players!"}),Object(c.jsx)("button",{className:"btn btn-primary",onClick:function(){return e.push("/add-players")},children:"Add players"}),Object(c.jsx)("button",{className:"btn btn-outline-light",onClick:function(){return e.push("/add-question")},children:"Add question"})]})}var y=n(32),N=(n(67),[{id:"double-up",name:"Double up!",description:"You get 2 points for a correct answer on the next question!",icon:"angle-double-up"},{id:"freedom-of-choice",name:"Freedom of choice!",description:"Chose your category for the next 3 rounds!"}]),w=[{id:"robin-hood",name:"Robin Hood",description:"The one with the mosts points generously donates two points to the one with the least points"},{id:"change-direction",name:"Direction change!",description:"The direction changes after this turn.",icon:"sync"},{id:"landmine",name:"Landmine!",description:"BOOM! Everyone loses 1 point"}];function k(e){var t=e.setDirection,n=e.setPlayers,s=e.players,a=Object(r.useState)({}),i=Object(u.a)(a,2),l=i[0],j=i[1],b=Object(d.d)();Object(r.useEffect)((function(){h()}),[]);var h=function(){var e=Math.random()<1?N:w,t=Math.floor(e.length*Math.random());j(e[t]),f(e[t].id)},O=function(e,t){n(s.map((function(n){return n.isPlayersTurn?Object(o.a)(Object(o.a)({},n),{},{perks:Object(o.a)(Object(o.a)({},n.perks),{},Object(x.a)({},e,t))}):n})))},f=function(e){switch(e){case"change-direction":t();break;case"freedom-of-choice":O("freedomOfChoice",3);break;case"double-up":O("doubleUp",1)}};return Object(c.jsx)("div",{id:l.id,className:"perk-wrapper text-center",children:Object(c.jsxs)("div",{className:"pb-5 w-100",children:[Object(c.jsx)("div",{className:"perk-icon animate__animated animate__rotateIn",children:Object(c.jsx)(y.a,{icon:l.icon})}),Object(c.jsx)("h1",{children:l.name}),Object(c.jsx)("p",{children:l.description}),Object(c.jsx)("button",{className:"btn btn-outline-light",onClick:function(){return b.push("/select-category")},children:"Continue"})]})})}function C(e){var t=e.currentQuestion,n=e.updatePlayerPoints,s=Object(r.useState)(!1),a=Object(u.a)(s,2),i=a[0],o=a[1],l=Object(r.useState)(30),j=Object(u.a)(l,2),b=j[0],h=j[1],O=Object(r.useState)(null),f=Object(u.a)(O,2),m=f[0],p=f[1],x=Object(d.d)();Object(r.useEffect)((function(){g()}),[b,i]);var g=function(){i?clearTimeout(m):p(setTimeout((function(){b>0?h(b-1):(v(),clearTimeout(m))}),1e3))},v=function(){setTimeout((function(){return x.push("/scoreboard")}),2e3)};return Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"mb-4",children:[Object(c.jsx)("h1",{className:"text-capitalize",children:t.category}),Object(c.jsx)("p",{children:t.question})]}),i?Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"font-weight-bold",children:"Answer:"}),Object(c.jsx)("p",{children:t.answer}),Object(c.jsx)("hr",{}),Object(c.jsx)("div",{className:"mb-3",children:"Did you get it?"}),Object(c.jsxs)("div",{className:"row",children:[Object(c.jsx)("div",{className:"col-6",children:Object(c.jsx)("button",{className:"btn btn-success w-100 p-3",onClick:function(){return n(),void x.push("/scoreboard")},children:"YES"})}),Object(c.jsx)("div",{className:"col-6",children:Object(c.jsx)("button",{className:"btn btn-danger w-100 p-3",onClick:function(){x.push("/scoreboard")},children:"NO"})})]})]}):b>0?Object(c.jsxs)("div",{className:"text-center",children:[Object(c.jsx)("h1",{className:"mb-4",children:b}),Object(c.jsx)("button",{className:"btn btn-secondary w-100 p-3",onClick:function(){o(!0)},children:"Show answer"})]}):"Whops! You ran out of time!"]})}n(68);function P(e){var t,n,s=e.themes,a=e.players,i=Object(r.useState)({}),l=Object(u.a)(i,2),j=l[0],b=l[1],h=Object(r.useState)(!1),O=Object(u.a)(h,2),f=O[0],m=O[1],p=Object(r.useState)(!1),x=Object(u.a)(p,2),g=x[0],v=x[1],y=Object(r.useState)(10),N=Object(u.a)(y,2),w=N[0],k=N[1],C=Object(r.useState)(null),P=Object(u.a)(C,2),T=P[0],S=P[1],q=Object(r.useState)(""),M=Object(u.a)(q,2),E=M[0],A=M[1],D=Object(r.useState)(a),I=Object(u.a)(D,2),Q=I[0],_=I[1],z=Object(d.d)();Object(r.useEffect)((function(){b(s[Math.floor(s.length*Math.random())]),A(R())}),[]),Object(r.useEffect)((function(){g&&F()}),[w]);var R=function(){var e="abcdefghijklmnoprstuvy".split("");return e[Math.floor(Math.random()*e.length)]},F=function(){S(setTimeout((function(){w>1?k(w-1):L(!0)}),1e3))},L=function(e){clearTimeout(T);var t=Q.filter((function(t){return!e||!t.isPlayersTurn}));1===t.length&&setTimeout((function(){return z.push("/scoreboard")}),3e3);var n=t.findIndex((function(e){return e.isPlayersTurn})),c=n===t.length-1?0:n+1;_(t.map((function(e,t){return Object(o.a)(Object(o.a)({},e),{},{isPlayersTurn:c===t})}))),t.length>1&&k(10)};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Round and round!"}),Object(c.jsx)("p",{children:"It's round and round time! Everyone gets 10 seconds to come up with an answer for a given theme, for example \"Movies from the 90s\". Tap the screen once you've told your answer and the turn will go over to the next player. The player that remains gets 3 points!"}),Object(c.jsx)("p",{}),Object(c.jsx)("button",{className:"btn btn-outline-light",onClick:function(){m(!0)},children:"Show theme and begin!"}),f&&Object(c.jsxs)("div",{className:"theme-wrapper",children:[Object(c.jsxs)("h3",{children:[j.description," ",j.randomizeLetter&&Object(c.jsx)("span",{className:"font-weight-bold",children:E.toLocaleUpperCase()})]}),Object(c.jsx)("hr",{}),g?Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:Q.length>1?null===(t=Q.filter((function(e){return e.isPlayersTurn}))[0])||void 0===t?void 0:t.name:(null===(n=Q[0])||void 0===n?void 0:n.name)+" wins!"}),Object(c.jsx)("h3",{children:w}),Object(c.jsx)("button",{className:"btn btn-outline-light w-100 p-4 mt-4",onClick:function(){return L(!1)},disabled:!(w<10),children:"NEXT"})]}):Object(c.jsx)("button",{className:"btn btn-outline-light",onClick:function(){return v(!0),void F()},children:"Start!"})]})]})}function T(e){var t=e.players,n=e.setPlayers,r=e.direction,s=Object(d.d)(),a=function(e,t){var n=e.findIndex((function(e){return e.isPlayersTurn})),c=0===n,r=n===e.length-1;return 1===t?r?0:n+t:c?e.length-1:n+t},i=function(e,t){return e.map((function(e,n){return Object(o.a)(Object(o.a)({},e),{},{isPlayersTurn:t===n})}))},u=function(e){return e.map((function(e){return e.isPlayersTurn?Object(o.a)(Object(o.a)({},e),{},{perks:Object.keys(e.perks).reduce((function(t,n){return e.perks[n]>0?Object(o.a)(Object(o.a)({},t),{},Object(x.a)({},n,e.perks[n]-1)):t}),Object(o.a)({},e.perks))}):e}))};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Scoreboard:"}),Object(c.jsx)("table",{className:"table text-white",children:Object(c.jsx)("tbody",{children:t.map((function(e,t){return Object(c.jsxs)("tr",{className:e.isPlayersTurn?"animate__animated animate__flash":"",children:[Object(c.jsx)("td",{children:e.name}),Object(c.jsxs)("td",{className:"text-right",children:[e.points,"p"]})]},t)}))})}),Object(c.jsx)("button",{onClick:function(){return function(){var e=a(t,r),c=i(t,e);c=u(c),n(c),s.push("/show-turn")}()},className:"btn btn-primary",children:"Next round!"})]})}n(69);function S(e){var t=e.currentPlayer,n=e.setCurrentCategory,s=e.categories,a=e.play,i=Object(r.useState)({name:""}),o=Object(u.a)(i,2),l=o[0],j=o[1],b=Object(d.d)();Object(r.useEffect)((function(){s.length>0&&0===t.perks.freedomOfChoice&&h()}),[s]);var h=function(){var e,t=0,c=setInterval((function(){for(var r=Math.floor(Math.random()*s.length);r===e;)r=Math.floor(Math.random()*s.length);j(s[r]),e=r,15===++t&&(clearInterval(c),n(l),setTimeout((function(){return b.push("/question")}),2e3)),a()}),200)};return Object(c.jsxs)("div",{className:"text-center",children:[Object(c.jsxs)("div",{className:"mb-4",children:[Object(c.jsx)("h1",{className:"mb-0 text-uppercase",children:t.name}),Object(c.jsxs)("div",{children:['"',t.description,'"']}),Object(c.jsx)("div",{children:t.perks.freedomOfChoice})]}),Object(c.jsx)("div",{className:"row",children:s.map((function(e,r){return Object(c.jsx)("div",{className:"col-6 p-0",children:Object(c.jsx)("div",{onClick:function(){return c=e,void(t.perks.freedomOfChoice>0&&(n(c),b.push("/question")));var c},className:"category text-center "+e.cssClass+(e.name===(null===l||void 0===l?void 0:l.name)?" active":""),children:e.name})},r)}))})]})}n(70);function q(e){var t=e.currentPlayer,n=Object(d.d)();Object(r.useEffect)((function(){setTimeout((function(){return s()}),3e3)}),[]);var s=function(){var e=Math.random();console.log(e),n.push(e<.2?"/perks":e<.4?"/round-and-round":"/select-category")};return Object(c.jsx)("div",{className:"show-turn-wrapper",children:Object(c.jsxs)("div",{className:"w-100",children:[Object(c.jsx)("h1",{className:"text-uppercase",children:t.name}),Object(c.jsxs)("h3",{children:['"',t.description,'"']}),Object(c.jsx)("hr",{}),Object(c.jsx)("h2",{children:"You're next!"})]})})}var M=n.p+"static/media/robots.8d72ac60.mp3";l.b.add(j.b,j.a);var E=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],s=t[1],a=Object(r.useState)({}),i=Object(u.a)(a,2),l=i[0],j=i[1],h=Object(r.useState)([]),O=Object(u.a)(h,2),m=O[0],x=O[1],y=Object(r.useState)({}),N=Object(u.a)(y,2),w=N[0],E=N[1],A=Object(r.useState)({}),D=Object(u.a)(A,2),I=D[0],Q=D[1],_=Object(r.useState)(1),z=Object(u.a)(_,2),R=z[0],F=z[1],L=Object(b.a)(M,{volume:.25}),W=Object(u.a)(L,1)[0];return Object(r.useEffect)((function(){f.getCategories().then((function(e){x(e.data.categories)})),f.getQuestions().then((function(e){j(e.data.questions)})),f.getRoundAndRoundThemes().then((function(e){Q(e.data.themes)}))}),[]),Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(d.a,{children:Object(c.jsxs)(d.c,{children:[Object(c.jsx)(d.b,{exact:!0,path:"/",children:Object(c.jsx)(v,{})}),Object(c.jsx)(d.b,{path:"/add-players",children:Object(c.jsx)(p,{players:n,setPlayers:function(e){return s(e)}})}),Object(c.jsx)(d.b,{path:"/show-turn",children:Object(c.jsx)(q,{currentPlayer:n.filter((function(e){return e.isPlayersTurn}))[0]})}),Object(c.jsx)(d.b,{path:"/perks",children:Object(c.jsx)(k,{players:n,setDirection:function(){return F(-1*R)},setPlayers:function(e){return s(e)}})}),Object(c.jsx)(d.b,{path:"/round-and-round",children:Object(c.jsx)(P,{players:n,themes:I,setPlayers:function(e){return s(e)}})}),Object(c.jsx)(d.b,{path:"/select-category",children:Object(c.jsx)(S,{currentPlayer:n.filter((function(e){return e.isPlayersTurn}))[0],categories:m,play:W,setCurrentCategory:function(e){!function(e){var t=l[e].length,n=Math.floor(Math.random()*t),c=l[e][n];E(Object(o.a)(Object(o.a)({},c),{},{category:e}))}("movies")}})}),Object(c.jsx)(d.b,{path:"/question",children:Object(c.jsx)(C,{currentPlayer:n.filter((function(e){return e.isPlayersTurn}))[0],currentQuestion:w,updatePlayerPoints:function(){s(n.map((function(e){return e.isPlayersTurn?Object(o.a)(Object(o.a)({},e),{},{points:e.points+(e.perks.doubleUp>0?2:1)}):e})))}})}),Object(c.jsx)(d.b,{path:"/scoreboard",children:Object(c.jsx)(T,{players:n,setPlayers:function(e){return s(e)},direction:R})}),Object(c.jsx)(d.b,{path:"/add-question",children:Object(c.jsx)(g,{categories:m})})]})})})},A=function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,74)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};i.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),A()}},[[71,1,2]]]);
//# sourceMappingURL=main.a27c2b33.chunk.js.map