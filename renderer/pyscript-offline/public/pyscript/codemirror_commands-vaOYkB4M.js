import{Annotation as e,Facet as t,EditorSelection as n,Text as r,findClusterBreak as o,countColumn as l,combineConfig as s,StateField as a,Transaction as i,ChangeSet as c,ChangeDesc as f,StateEffect as u,CharCategory as h}from"./codemirror_state-1d1uncXx.js";import{E as m,D as d}from"./codemirror_view-aIuSN42d.js";import{q as p,r as g,u as y,v,s as A,w as k,b as w,i as S}from"./codemirror_language-CJQIaKtn.js";const D=e=>{let{state:t}=e,n=t.doc.lineAt(t.selection.main.from),r=I(e.state,n.from);return r.line?M(e):!!r.block&&T(e)};function x(e,t){return({state:n,dispatch:r})=>{if(n.readOnly)return!1;let o=e(t,n);return!!o&&(r(n.update(o)),!0)}}const M=x(L,0),B=x(L,1),C=x(L,2),E=x(R,0),O=x(R,1),b=x(R,2),T=x(((e,t)=>R(e,t,function(e){let t=[];for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from),o=n.to<=r.to?r:e.doc.lineAt(n.to);o.from>r.from&&o.from==n.to&&(o=n.to==r.to+1?r:e.doc.lineAt(n.to-1));let l=t.length-1;l>=0&&t[l].to>r.from?t[l].to=o.to:t.push({from:r.from+/^\s*/.exec(r.text)[0].length,to:o.to})}return t}(t))),0);function I(e,t){let n=e.languageDataAt("commentTokens",t);return n.length?n[0]:{}}const V=50;function R(e,t,n=t.selection.ranges){let r=n.map((e=>I(t,e.from).block));if(!r.every((e=>e)))return null;let o=n.map(((e,n)=>function(e,{open:t,close:n},r,o){let l,s,a=e.sliceDoc(r-V,r),i=e.sliceDoc(o,o+V),c=/\s*$/.exec(a)[0].length,f=/^\s*/.exec(i)[0].length,u=a.length-c;if(a.slice(u-t.length,u)==t&&i.slice(f,f+n.length)==n)return{open:{pos:r-c,margin:c&&1},close:{pos:o+f,margin:f&&1}};o-r<=2*V?l=s=e.sliceDoc(r,o):(l=e.sliceDoc(r,r+V),s=e.sliceDoc(o-V,o));let h=/^\s*/.exec(l)[0].length,m=/\s*$/.exec(s)[0].length,d=s.length-m-n.length;return l.slice(h,h+t.length)==t&&s.slice(d,d+n.length)==n?{open:{pos:r+h+t.length,margin:/\s/.test(l.charAt(h+t.length))?1:0},close:{pos:o-m-n.length,margin:/\s/.test(s.charAt(d-1))?1:0}}:null}(t,r[n],e.from,e.to)));if(2!=e&&!o.every((e=>e)))return{changes:t.changes(n.map(((e,t)=>o[t]?[]:[{from:e.from,insert:r[t].open+" "},{from:e.to,insert:" "+r[t].close}])))};if(1!=e&&o.some((e=>e))){let e=[];for(let t,n=0;n<o.length;n++)if(t=o[n]){let o=r[n],{open:l,close:s}=t;e.push({from:l.pos-o.open.length,to:l.pos+l.margin},{from:s.pos-s.margin,to:s.pos+o.close.length})}return{changes:e}}return null}function L(e,t,n=t.selection.ranges){let r=[],o=-1;for(let{from:e,to:l}of n){let n=r.length,s=1e9,a=I(t,e).line;if(a){for(let n=e;n<=l;){let i=t.doc.lineAt(n);if(i.from>o&&(e==l||l>i.from)){o=i.from;let e=/^\s*/.exec(i.text)[0].length,t=e==i.length,n=i.text.slice(e,e+a.length)==a?e:-1;e<i.text.length&&e<s&&(s=e),r.push({line:i,comment:n,token:a,indent:e,empty:t,single:!1})}n=i.to+1}if(s<1e9)for(let e=n;e<r.length;e++)r[e].indent<r[e].line.text.length&&(r[e].indent=s);r.length==n+1&&(r[n].single=!0)}}if(2!=e&&r.some((e=>e.comment<0&&(!e.empty||e.single)))){let e=[];for(let{line:t,token:n,indent:o,empty:l,single:s}of r)!s&&l||e.push({from:t.from+o,insert:n+" "});let n=t.changes(e);return{changes:n,selection:t.selection.map(n,1)}}if(1!=e&&r.some((e=>e.comment>=0))){let e=[];for(let{line:t,comment:n,token:o}of r)if(n>=0){let r=t.from+n,l=r+o.length;" "==t.text[l-t.from]&&l++,e.push({from:r,to:l})}return{changes:e}}return null}const J=e.define(),N=e.define(),H=t.define(),U=t.define({combine:e=>s(e,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,r)=>e(n,r)||t(n,r)})}),z=a.define({create:()=>ae.empty,update(e,t){let n=t.state.facet(U),r=t.annotation(J);if(r){let o=X.fromTransaction(t,r.selection),l=r.side,s=0==l?e.undone:e.done;return s=o?Y(s,s.length,n.minDepth,o):ne(s,t.startState.selection),new ae(0==l?r.rest:s,0==l?s:r.rest)}let o=t.annotation(N);if("full"!=o&&"before"!=o||(e=e.isolate()),!1===t.annotation(i.addToHistory))return t.changes.empty?e:e.addMapping(t.changes.desc);let l=X.fromTransaction(t),s=t.annotation(i.time),a=t.annotation(i.userEvent);return l?e=e.addChanges(l,s,a,n,t):t.selection&&(e=e.addSelection(t.startState.selection,s,a,n.newGroupDelay)),"full"!=o&&"after"!=o||(e=e.isolate()),e},toJSON:e=>({done:e.done.map((e=>e.toJSON())),undone:e.undone.map((e=>e.toJSON()))}),fromJSON:e=>new ae(e.done.map(X.fromJSON),e.undone.map(X.fromJSON))});function j(e={}){return[z,U.of(e),m.domEventHandlers({beforeinput(e,t){let n="historyUndo"==e.inputType?P:"historyRedo"==e.inputType?W:null;return!!n&&(e.preventDefault(),n(t))}})]}const q=z;function G(e,t){return function({state:n,dispatch:r}){if(!t&&n.readOnly)return!1;let o=n.field(z,!1);if(!o)return!1;let l=o.pop(e,n,t);return!!l&&(r(l),!0)}}const P=G(0,!1),W=G(1,!1),$=G(0,!0),_=G(1,!0);function F(e){return function(t){let n=t.field(z,!1);if(!n)return 0;let r=0==e?n.done:n.undone;return r.length-(r.length&&!r[0].changes?1:0)}}const K=F(0),Q=F(1);class X{constructor(e,t,n,r,o){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=r,this.selectionsAfter=o}setSelAfter(e){return new X(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:null===(e=this.changes)||void 0===e?void 0:e.toJSON(),mapped:null===(t=this.mapped)||void 0===t?void 0:t.toJSON(),startSelection:null===(n=this.startSelection)||void 0===n?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map((e=>e.toJSON()))}}static fromJSON(e){return new X(e.changes&&c.fromJSON(e.changes),[],e.mapped&&f.fromJSON(e.mapped),e.startSelection&&n.fromJSON(e.startSelection),e.selectionsAfter.map(n.fromJSON))}static fromTransaction(e,t){let n=ee;for(let t of e.startState.facet(H)){let r=t(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new X(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,ee)}static selection(e){return new X(void 0,ee,void 0,void 0,e)}}function Y(e,t,n,r){let o=t+1>n+20?t-n-1:0,l=e.slice(o,t);return l.push(r),l}function Z(e,t){return e.length?t.length?e.concat(t):e:t}const ee=[],te=200;function ne(e,t){if(e.length){let n=e[e.length-1],r=n.selectionsAfter.slice(Math.max(0,n.selectionsAfter.length-te));return r.length&&r[r.length-1].eq(t)?e:(r.push(t),Y(e,e.length-1,1e9,n.setSelAfter(r)))}return[X.selection([t])]}function re(e){let t=e[e.length-1],n=e.slice();return n[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1)),n}function oe(e,t){if(!e.length)return e;let n=e.length,r=ee;for(;n;){let o=le(e[n-1],t,r);if(o.changes&&!o.changes.empty||o.effects.length){let t=e.slice(0,n);return t[n-1]=o,t}t=o.mapped,n--,r=o.selectionsAfter}return r.length?[X.selection(r)]:ee}function le(e,t,n){let r=Z(e.selectionsAfter.length?e.selectionsAfter.map((e=>e.map(t))):ee,n);if(!e.changes)return X.selection(r);let o=e.changes.map(t),l=t.mapDesc(e.changes,!0),s=e.mapped?e.mapped.composeDesc(l):l;return new X(o,u.mapEffects(e.effects,t),s,e.startSelection.map(l),r)}const se=/^(input\.type|delete)($|\.)/;class ae{constructor(e,t,n=0,r=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=r}isolate(){return this.prevTime?new ae(this.done,this.undone):this}addChanges(e,t,n,r,o){let l=this.done,s=l[l.length-1];return l=s&&s.changes&&!s.changes.empty&&e.changes&&(!n||se.test(n))&&(!s.selectionsAfter.length&&t-this.prevTime<r.newGroupDelay&&r.joinToEvent(o,function(e,t){let n=[],r=!1;return e.iterChangedRanges(((e,t)=>n.push(e,t))),t.iterChangedRanges(((e,t,o,l)=>{for(let e=0;e<n.length;){let t=n[e++],s=n[e++];l>=t&&o<=s&&(r=!0)}})),r}(s.changes,e.changes))||"input.type.compose"==n)?Y(l,l.length-1,r.minDepth,new X(e.changes.compose(s.changes),Z(u.mapEffects(e.effects,s.changes),s.effects),s.mapped,s.startSelection,ee)):Y(l,l.length,r.minDepth,e),new ae(l,ee,t,n)}addSelection(e,t,n,r){let o=this.done.length?this.done[this.done.length-1].selectionsAfter:ee;return o.length>0&&t-this.prevTime<r&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&(l=o[o.length-1],s=e,l.ranges.length==s.ranges.length&&0===l.ranges.filter(((e,t)=>e.empty!=s.ranges[t].empty)).length)?this:new ae(ne(this.done,e),this.undone,t,n);var l,s}addMapping(e){return new ae(oe(this.done,e),oe(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let r=0==e?this.done:this.undone;if(0==r.length)return null;let o=r[r.length-1],l=o.selectionsAfter[0]||t.selection;if(n&&o.selectionsAfter.length)return t.update({selection:o.selectionsAfter[o.selectionsAfter.length-1],annotations:J.of({side:e,rest:re(r),selection:l}),userEvent:0==e?"select.undo":"select.redo",scrollIntoView:!0});if(o.changes){let n=1==r.length?ee:r.slice(0,r.length-1);return o.mapped&&(n=oe(n,o.mapped)),t.update({changes:o.changes,selection:o.startSelection,effects:o.effects,annotations:J.of({side:e,rest:n,selection:l}),filter:!1,userEvent:0==e?"undo":"redo",scrollIntoView:!0})}return null}}ae.empty=new ae(ee,ee);const ie=[{key:"Mod-z",run:P,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:W,preventDefault:!0},{linux:"Ctrl-Shift-z",run:W,preventDefault:!0},{key:"Mod-u",run:$,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:_,preventDefault:!0}];function ce(e,t){return n.create(e.ranges.map(t),e.mainIndex)}function fe(e,t){return e.update({selection:t,scrollIntoView:!0,userEvent:"select"})}function ue({state:e,dispatch:t},n){let r=ce(e.selection,n);return!r.eq(e.selection,!0)&&(t(fe(e,r)),!0)}function he(e,t){return n.cursor(t?e.to:e.from)}function me(e,t){return ue(e,(n=>n.empty?e.moveByChar(n,t):he(n,t)))}function de(e){return e.textDirectionAt(e.state.selection.main.head)==d.LTR}const pe=e=>me(e,!de(e)),ge=e=>me(e,de(e)),ye=e=>me(e,!0),ve=e=>me(e,!1);function Ae(e,t,r){let l=t.head,s=e.doc.lineAt(l);return l=l==(r?s.to:s.from)?r?Math.min(e.doc.length,s.to+1):Math.max(0,s.from-1):s.from+o(s.text,l-s.from,r),n.cursor(l,r?-1:1)}function ke(e,t){return ue(e,(n=>n.empty?Ae(e.state,n,t):he(n,t)))}const we=e=>ke(e,!0),Se=e=>ke(e,!1);function De(e,t){return ue(e,(n=>n.empty?e.moveByGroup(n,t):he(n,t)))}const xe=e=>De(e,!de(e)),Me=e=>De(e,de(e)),Be=e=>De(e,!0),Ce=e=>De(e,!1),Ee="undefined"!=typeof Intl&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function Oe(e,t,r){let o=e.state.charCategorizer(t.from),l=h.Space,s=t.from,a=0,i=!1,c=!1,f=!1,u=t=>{if(i)return!1;s+=r?t.length:-t.length;let n,u=o(t);if(u==h.Word&&t.charCodeAt(0)<128&&/[\W_]/.test(t)&&(u=-1),l==h.Space&&(l=u),l!=u)return!1;if(l==h.Word)if(t.toLowerCase()==t){if(!r&&c)return!1;f=!0}else if(f){if(r)return!1;i=!0}else{if(c&&r&&o(n=e.state.sliceDoc(s,s+1))==h.Word&&n.toLowerCase()==n)return!1;c=!0}return a++,!0},m=e.moveByChar(t,r,(e=>(u(e),u)));if(Ee&&l==h.Word&&m.from==t.from+a*(r?1:-1)){let o=Math.min(t.head,m.head),l=Math.max(t.head,m.head),s=e.state.sliceDoc(o,l);if(s.length>1&&/[\u4E00-\uffff]/.test(s)){let e=Array.from(Ee.segment(s));if(e.length>1)return r?n.cursor(t.head+e[1].index,-1):n.cursor(m.head+e[e.length-1].index,1)}}return m}function be(e,t){return ue(e,(n=>n.empty?Oe(e,n,t):he(n,t)))}const Te=e=>be(e,!0),Ie=e=>be(e,!1);function Ve(e,t,n){if(t.type.prop(n))return!0;let r=t.to-t.from;return r&&(r>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function Re(e,t,r){let o,l,s=A(e).resolveInner(t.head),a=r?w.closedBy:w.openedBy;for(let n=t.head;;){let t=r?s.childAfter(n):s.childBefore(n);if(!t)break;Ve(e,t,a)?s=t:n=r?t.to:t.from}return l=s.type.prop(a)&&(o=r?v(e,s.from,1):v(e,s.to,-1))&&o.matched?r?o.end.to:o.end.from:r?s.to:s.from,n.cursor(l,r?-1:1)}const Le=e=>ue(e,(t=>Re(e.state,t,!de(e)))),Je=e=>ue(e,(t=>Re(e.state,t,de(e))));function Ne(e,t){return ue(e,(n=>{if(!n.empty)return he(n,t);let r=e.moveVertically(n,t);return r.head!=n.head?r:e.moveToLineBoundary(n,t)}))}const He=e=>Ne(e,!1),Ue=e=>Ne(e,!0);function ze(e){let t,n=e.scrollDOM.clientHeight<e.scrollDOM.scrollHeight-2,r=0,o=0;if(n){for(let t of e.state.facet(m.scrollMargins)){let n=t(e);(null==n?void 0:n.top)&&(r=Math.max(null==n?void 0:n.top,r)),(null==n?void 0:n.bottom)&&(o=Math.max(null==n?void 0:n.bottom,o))}t=e.scrollDOM.clientHeight-r-o}else t=(e.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:r,marginBottom:o,selfScroll:n,height:Math.max(e.defaultLineHeight,t-5)}}function je(e,t){let n,r=ze(e),{state:o}=e,l=ce(o.selection,(n=>n.empty?e.moveVertically(n,t,r.height):he(n,t)));if(l.eq(o.selection))return!1;if(r.selfScroll){let t=e.coordsAtPos(o.selection.main.head),s=e.scrollDOM.getBoundingClientRect(),a=s.top+r.marginTop,i=s.bottom-r.marginBottom;t&&t.top>a&&t.bottom<i&&(n=m.scrollIntoView(l.main.head,{y:"start",yMargin:t.top-a}))}return e.dispatch(fe(o,l),{effects:n}),!0}const qe=e=>je(e,!1),Ge=e=>je(e,!0);function Pe(e,t,r){let o=e.lineBlockAt(t.head),l=e.moveToLineBoundary(t,r);if(l.head==t.head&&l.head!=(r?o.to:o.from)&&(l=e.moveToLineBoundary(t,r,!1)),!r&&l.head==o.from&&o.length){let r=/^\s*/.exec(e.state.sliceDoc(o.from,Math.min(o.from+100,o.to)))[0].length;r&&t.head!=o.from+r&&(l=n.cursor(o.from+r))}return l}const We=e=>ue(e,(t=>Pe(e,t,!0))),$e=e=>ue(e,(t=>Pe(e,t,!1))),_e=e=>ue(e,(t=>Pe(e,t,!de(e)))),Fe=e=>ue(e,(t=>Pe(e,t,de(e)))),Ke=e=>ue(e,(t=>n.cursor(e.lineBlockAt(t.head).from,1))),Qe=e=>ue(e,(t=>n.cursor(e.lineBlockAt(t.head).to,-1)));function Xe(e,t,r){let o=!1,l=ce(e.selection,(t=>{let l=v(e,t.head,-1)||v(e,t.head,1)||t.head>0&&v(e,t.head-1,1)||t.head<e.doc.length&&v(e,t.head+1,-1);if(!l||!l.end)return t;o=!0;let s=l.start.from==t.head?l.end.to:l.end.from;return r?n.range(t.anchor,s):n.cursor(s)}));return!!o&&(t(fe(e,l)),!0)}const Ye=({state:e,dispatch:t})=>Xe(e,t,!1),Ze=({state:e,dispatch:t})=>Xe(e,t,!0);function et(e,t){let r=ce(e.state.selection,(e=>{let r=t(e);return n.range(e.anchor,r.head,r.goalColumn,r.bidiLevel||void 0)}));return!r.eq(e.state.selection)&&(e.dispatch(fe(e.state,r)),!0)}function tt(e,t){return et(e,(n=>e.moveByChar(n,t)))}const nt=e=>tt(e,!de(e)),rt=e=>tt(e,de(e)),ot=e=>tt(e,!0),lt=e=>tt(e,!1),st=e=>et(e,(t=>Ae(e.state,t,!0))),at=e=>et(e,(t=>Ae(e.state,t,!1)));function it(e,t){return et(e,(n=>e.moveByGroup(n,t)))}const ct=e=>it(e,!de(e)),ft=e=>it(e,de(e)),ut=e=>it(e,!0),ht=e=>it(e,!1);function mt(e,t){return et(e,(n=>Oe(e,n,t)))}const dt=e=>mt(e,!0),pt=e=>mt(e,!1),gt=e=>et(e,(t=>Re(e.state,t,!de(e)))),yt=e=>et(e,(t=>Re(e.state,t,de(e))));function vt(e,t){return et(e,(n=>e.moveVertically(n,t)))}const At=e=>vt(e,!1),kt=e=>vt(e,!0);function wt(e,t){return et(e,(n=>e.moveVertically(n,t,ze(e).height)))}const St=e=>wt(e,!1),Dt=e=>wt(e,!0),xt=e=>et(e,(t=>Pe(e,t,!0))),Mt=e=>et(e,(t=>Pe(e,t,!1))),Bt=e=>et(e,(t=>Pe(e,t,!de(e)))),Ct=e=>et(e,(t=>Pe(e,t,de(e)))),Et=e=>et(e,(t=>n.cursor(e.lineBlockAt(t.head).from))),Ot=e=>et(e,(t=>n.cursor(e.lineBlockAt(t.head).to))),bt=({state:e,dispatch:t})=>(t(fe(e,{anchor:0})),!0),Tt=({state:e,dispatch:t})=>(t(fe(e,{anchor:e.doc.length})),!0),It=({state:e,dispatch:t})=>(t(fe(e,{anchor:e.selection.main.anchor,head:0})),!0),Vt=({state:e,dispatch:t})=>(t(fe(e,{anchor:e.selection.main.anchor,head:e.doc.length})),!0),Rt=({state:e,dispatch:t})=>(t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:"select"})),!0),Lt=({state:e,dispatch:t})=>{let r=en(e).map((({from:t,to:r})=>n.range(t,Math.min(r+1,e.doc.length))));return t(e.update({selection:n.create(r),userEvent:"select"})),!0},Jt=({state:e,dispatch:t})=>{let r=ce(e.selection,(t=>{let r=A(e),o=r.resolveStack(t.from,1);if(t.empty){let e=r.resolveStack(t.from,-1);e.node.from>=o.node.from&&e.node.to<=o.node.to&&(o=e)}for(let e=o;e;e=e.next){let{node:r}=e;if((r.from<t.from&&r.to>=t.to||r.to>t.to&&r.from<=t.from)&&e.next)return n.range(r.to,r.from)}return t}));return!r.eq(e.selection)&&(t(fe(e,r)),!0)},Nt=({state:e,dispatch:t})=>{let r=e.selection,o=null;return r.ranges.length>1?o=n.create([r.main]):r.main.empty||(o=n.create([n.cursor(r.main.head)])),!!o&&(t(fe(e,o)),!0)};function Ht(e,t){if(e.state.readOnly)return!1;let r="delete.selection",{state:o}=e,l=o.changeByRange((o=>{let{from:l,to:s}=o;if(l==s){let n=t(o);n<l?(r="delete.backward",n=Ut(e,n,!1)):n>l&&(r="delete.forward",n=Ut(e,n,!0)),l=Math.min(l,n),s=Math.max(s,n)}else l=Ut(e,l,!1),s=Ut(e,s,!0);return l==s?{range:o}:{changes:{from:l,to:s},range:n.cursor(l,l<o.head?-1:1)}}));return!l.changes.empty&&(e.dispatch(o.update(l,{scrollIntoView:!0,userEvent:r,effects:"delete.selection"==r?m.announce.of(o.phrase("Selection deleted")):void 0})),!0)}function Ut(e,t,n){if(e instanceof m)for(let r of e.state.facet(m.atomicRanges).map((t=>t(e))))r.between(t,t,((e,r)=>{e<t&&r>t&&(t=n?r:e)}));return t}const zt=(e,t,n)=>Ht(e,(r=>{let s,a,i=r.from,{state:c}=e,f=c.doc.lineAt(i);if(n&&!t&&i>f.from&&i<f.from+200&&!/[^ \t]/.test(s=f.text.slice(0,i-f.from))){if("\t"==s[s.length-1])return i-1;let e=l(s,c.tabSize)%k(c)||k(c);for(let t=0;t<e&&" "==s[s.length-1-t];t++)i--;a=i}else a=o(f.text,i-f.from,t,t)+f.from,a==i&&f.number!=(t?c.doc.lines:1)?a+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(f.text.slice(a-f.from,i-f.from))&&(a=o(f.text,a-f.from,!1,!1)+f.from);return a})),jt=e=>zt(e,!1,!0),qt=e=>zt(e,!1,!1),Gt=e=>zt(e,!0,!1),Pt=(e,t)=>Ht(e,(n=>{let r=n.head,{state:l}=e,s=l.doc.lineAt(r),a=l.charCategorizer(r);for(let e=null;;){if(r==(t?s.to:s.from)){r==n.head&&s.number!=(t?l.doc.lines:1)&&(r+=t?1:-1);break}let i=o(s.text,r-s.from,t)+s.from,c=s.text.slice(Math.min(r,i)-s.from,Math.max(r,i)-s.from),f=a(c);if(null!=e&&f!=e)break;" "==c&&r==n.head||(e=f),r=i}return r})),Wt=e=>Pt(e,!1),$t=e=>Pt(e,!0),_t=e=>Ht(e,(t=>{let n=e.lineBlockAt(t.head).to;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)})),Ft=e=>Ht(e,(t=>{let n=e.lineBlockAt(t.head).from;return t.head>n?n:Math.max(0,t.head-1)})),Kt=e=>Ht(e,(t=>{let n=e.moveToLineBoundary(t,!1).head;return t.head>n?n:Math.max(0,t.head-1)})),Qt=e=>Ht(e,(t=>{let n=e.moveToLineBoundary(t,!0).head;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)})),Xt=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=[];for(let t=0,r="",o=e.doc.iter();;){if(o.next(),o.lineBreak||o.done){let e=r.search(/\s+$/);if(e>-1&&n.push({from:t-(r.length-e),to:t}),o.done)break;r=""}else r=o.value;t+=o.value.length}return!!n.length&&(t(e.update({changes:n,userEvent:"delete"})),!0)},Yt=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let o=e.changeByRange((e=>({changes:{from:e.from,to:e.to,insert:r.of(["",""])},range:n.cursor(e.from)})));return t(e.update(o,{scrollIntoView:!0,userEvent:"input"})),!0},Zt=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let r=e.changeByRange((t=>{if(!t.empty||0==t.from||t.from==e.doc.length)return{range:t};let r=t.from,l=e.doc.lineAt(r),s=r==l.from?r-1:o(l.text,r-l.from,!1)+l.from,a=r==l.to?r+1:o(l.text,r-l.from,!0)+l.from;return{changes:{from:s,to:a,insert:e.doc.slice(r,a).append(e.doc.slice(s,r))},range:n.cursor(a)}}));return!r.changes.empty&&(t(e.update(r,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function en(e){let t=[],n=-1;for(let r of e.selection.ranges){let o=e.doc.lineAt(r.from),l=e.doc.lineAt(r.to);if(r.empty||r.to!=l.from||(l=e.doc.lineAt(r.to-1)),n>=o.number){let e=t[t.length-1];e.to=l.to,e.ranges.push(r)}else t.push({from:o.from,to:l.to,ranges:[r]});n=l.number+1}return t}function tn(e,t,r){if(e.readOnly)return!1;let o=[],l=[];for(let t of en(e)){if(r?t.to==e.doc.length:0==t.from)continue;let s=e.doc.lineAt(r?t.to+1:t.from-1),a=s.length+1;if(r){o.push({from:t.to,to:s.to},{from:t.from,insert:s.text+e.lineBreak});for(let r of t.ranges)l.push(n.range(Math.min(e.doc.length,r.anchor+a),Math.min(e.doc.length,r.head+a)))}else{o.push({from:s.from,to:t.from},{from:t.to,insert:e.lineBreak+s.text});for(let e of t.ranges)l.push(n.range(e.anchor-a,e.head-a))}}return!!o.length&&(t(e.update({changes:o,scrollIntoView:!0,selection:n.create(l,e.selection.mainIndex),userEvent:"move.line"})),!0)}const nn=({state:e,dispatch:t})=>tn(e,t,!1),rn=({state:e,dispatch:t})=>tn(e,t,!0);function on(e,t,n){if(e.readOnly)return!1;let r=[];for(let t of en(e))n?r.push({from:t.from,insert:e.doc.slice(t.from,t.to)+e.lineBreak}):r.push({from:t.to,insert:e.lineBreak+e.doc.slice(t.from,t.to)});return t(e.update({changes:r,scrollIntoView:!0,userEvent:"input.copyline"})),!0}const ln=({state:e,dispatch:t})=>on(e,t,!1),sn=({state:e,dispatch:t})=>on(e,t,!0),an=e=>{if(e.state.readOnly)return!1;let{state:t}=e,n=t.changes(en(t).map((({from:e,to:n})=>(e>0?e--:n<t.doc.length&&n++,{from:e,to:n})))),r=ce(t.selection,(t=>{let n;if(e.lineWrapping){let r=e.lineBlockAt(t.head),o=e.coordsAtPos(t.head,t.assoc||1);o&&(n=r.bottom+e.documentTop-o.bottom+e.defaultLineHeight/2)}return e.moveVertically(t,!0,n)})).map(n);return e.dispatch({changes:n,selection:r,scrollIntoView:!0,userEvent:"delete.line"}),!0},cn=({state:e,dispatch:t})=>(t(e.update(e.replaceSelection(e.lineBreak),{scrollIntoView:!0,userEvent:"input"})),!0),fn=({state:e,dispatch:t})=>(t(e.update(e.changeByRange((t=>{let r=/^\s*/.exec(e.doc.lineAt(t.from).text)[0];return{changes:{from:t.from,to:t.to,insert:e.lineBreak+r},range:n.cursor(t.from+r.length+1)}})),{scrollIntoView:!0,userEvent:"input"})),!0);const un=mn(!1),hn=mn(!0);function mn(e){return({state:t,dispatch:o})=>{if(t.readOnly)return!1;let s=t.changeByRange((o=>{let{from:s,to:a}=o,i=t.doc.lineAt(s),c=!e&&s==a&&function(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let n,r=A(e).resolveInner(t),o=r.childBefore(t),l=r.childAfter(t);return o&&l&&o.to<=t&&l.from>=t&&(n=o.type.prop(w.closedBy))&&n.indexOf(l.name)>-1&&e.doc.lineAt(o.to).from==e.doc.lineAt(l.from).from&&!/\S/.test(e.sliceDoc(o.to,l.from))?{from:o.to,to:l.from}:null}(t,s);e&&(s=a=(a<=i.to?i:t.doc.lineAt(a)).to);let f=new p(t,{simulateBreak:s,simulateDoubleBreak:!!c}),u=g(f,s);for(null==u&&(u=l(/^\s*/.exec(t.doc.lineAt(s).text)[0],t.tabSize));a<i.to&&/\s/.test(i.text[a-i.from]);)a++;c?({from:s,to:a}=c):s>i.from&&s<i.from+100&&!/\S/.test(i.text.slice(0,s))&&(s=i.from);let h=["",y(t,u)];return c&&h.push(y(t,f.lineIndent(i.from,-1))),{changes:{from:s,to:a,insert:r.of(h)},range:n.cursor(s+1+h[1].length)}}));return o(t.update(s,{scrollIntoView:!0,userEvent:"input"})),!0}}function dn(e,t){let r=-1;return e.changeByRange((o=>{let l=[];for(let n=o.from;n<=o.to;){let s=e.doc.lineAt(n);s.number>r&&(o.empty||o.to>s.from)&&(t(s,l,o),r=s.number),n=s.to+1}let s=e.changes(l);return{changes:l,range:n.range(s.mapPos(o.anchor,1),s.mapPos(o.head,1))}}))}const pn=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=Object.create(null),r=new p(e,{overrideIndentation:e=>{let t=n[e];return null==t?-1:t}}),o=dn(e,((t,o,l)=>{let s=g(r,t.from);if(null==s)return;/\S/.test(t.text)||(s=0);let a=/^\s*/.exec(t.text)[0],i=y(e,s);(a!=i||l.from<t.from+a.length)&&(n[t.from]=s,o.push({from:t.from,to:t.from+a.length,insert:i}))}));return o.changes.empty||t(e.update(o,{userEvent:"indent"})),!0},gn=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(dn(e,((t,n)=>{n.push({from:t.from,insert:e.facet(S)})})),{userEvent:"input.indent"})),!0),yn=({state:e,dispatch:t})=>!e.readOnly&&(t(e.update(dn(e,((t,n)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let o=l(r,e.tabSize),s=0,a=y(e,Math.max(0,o-k(e)));for(;s<r.length&&s<a.length&&r.charCodeAt(s)==a.charCodeAt(s);)s++;n.push({from:t.from+s,to:t.from+r.length,insert:a.slice(s)})})),{userEvent:"delete.dedent"})),!0),vn=e=>(e.setTabFocusMode(),!0),An=e=>(e.setTabFocusMode(2e3),!0),kn=({state:e,dispatch:t})=>e.selection.ranges.some((e=>!e.empty))?gn({state:e,dispatch:t}):(t(e.update(e.replaceSelection("\t"),{scrollIntoView:!0,userEvent:"input"})),!0),wn=[{key:"Ctrl-b",run:pe,shift:nt,preventDefault:!0},{key:"Ctrl-f",run:ge,shift:rt},{key:"Ctrl-p",run:He,shift:At},{key:"Ctrl-n",run:Ue,shift:kt},{key:"Ctrl-a",run:Ke,shift:Et},{key:"Ctrl-e",run:Qe,shift:Ot},{key:"Ctrl-d",run:Gt},{key:"Ctrl-h",run:jt},{key:"Ctrl-k",run:_t},{key:"Ctrl-Alt-h",run:Wt},{key:"Ctrl-o",run:Yt},{key:"Ctrl-t",run:Zt},{key:"Ctrl-v",run:Ge}],Sn=[{key:"ArrowLeft",run:pe,shift:nt,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:xe,shift:ct,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:_e,shift:Bt,preventDefault:!0},{key:"ArrowRight",run:ge,shift:rt,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:Me,shift:ft,preventDefault:!0},{mac:"Cmd-ArrowRight",run:Fe,shift:Ct,preventDefault:!0},{key:"ArrowUp",run:He,shift:At,preventDefault:!0},{mac:"Cmd-ArrowUp",run:bt,shift:It},{mac:"Ctrl-ArrowUp",run:qe,shift:St},{key:"ArrowDown",run:Ue,shift:kt,preventDefault:!0},{mac:"Cmd-ArrowDown",run:Tt,shift:Vt},{mac:"Ctrl-ArrowDown",run:Ge,shift:Dt},{key:"PageUp",run:qe,shift:St},{key:"PageDown",run:Ge,shift:Dt},{key:"Home",run:$e,shift:Mt,preventDefault:!0},{key:"Mod-Home",run:bt,shift:It},{key:"End",run:We,shift:xt,preventDefault:!0},{key:"Mod-End",run:Tt,shift:Vt},{key:"Enter",run:un,shift:un},{key:"Mod-a",run:Rt},{key:"Backspace",run:jt,shift:jt},{key:"Delete",run:Gt},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Wt},{key:"Mod-Delete",mac:"Alt-Delete",run:$t},{mac:"Mod-Backspace",run:Kt},{mac:"Mod-Delete",run:Qt}].concat(wn.map((e=>({mac:e.key,run:e.run,shift:e.shift})))),Dn=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:Le,shift:gt},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Je,shift:yt},{key:"Alt-ArrowUp",run:nn},{key:"Shift-Alt-ArrowUp",run:ln},{key:"Alt-ArrowDown",run:rn},{key:"Shift-Alt-ArrowDown",run:sn},{key:"Escape",run:Nt},{key:"Mod-Enter",run:hn},{key:"Alt-l",mac:"Ctrl-l",run:Lt},{key:"Mod-i",run:Jt,preventDefault:!0},{key:"Mod-[",run:yn},{key:"Mod-]",run:gn},{key:"Mod-Alt-\\",run:pn},{key:"Shift-Mod-k",run:an},{key:"Shift-Mod-\\",run:Ye},{key:"Mod-/",run:D},{key:"Alt-A",run:E},{key:"Ctrl-m",mac:"Shift-Alt-m",run:vn}].concat(Sn),xn={key:"Tab",run:gn,shift:yn};export{O as blockComment,b as blockUncomment,sn as copyLineDown,ln as copyLineUp,ve as cursorCharBackward,Se as cursorCharBackwardLogical,ye as cursorCharForward,we as cursorCharForwardLogical,pe as cursorCharLeft,ge as cursorCharRight,Tt as cursorDocEnd,bt as cursorDocStart,Ce as cursorGroupBackward,Be as cursorGroupForward,xe as cursorGroupLeft,Me as cursorGroupRight,$e as cursorLineBoundaryBackward,We as cursorLineBoundaryForward,_e as cursorLineBoundaryLeft,Fe as cursorLineBoundaryRight,Ue as cursorLineDown,Qe as cursorLineEnd,Ke as cursorLineStart,He as cursorLineUp,Ye as cursorMatchingBracket,Ge as cursorPageDown,qe as cursorPageUp,Ie as cursorSubwordBackward,Te as cursorSubwordForward,Le as cursorSyntaxLeft,Je as cursorSyntaxRight,Dn as defaultKeymap,jt as deleteCharBackward,qt as deleteCharBackwardStrict,Gt as deleteCharForward,Wt as deleteGroupBackward,$t as deleteGroupForward,an as deleteLine,Kt as deleteLineBoundaryBackward,Qt as deleteLineBoundaryForward,_t as deleteToLineEnd,Ft as deleteToLineStart,Xt as deleteTrailingWhitespace,wn as emacsStyleKeymap,j as history,q as historyField,ie as historyKeymap,yn as indentLess,gn as indentMore,pn as indentSelection,xn as indentWithTab,hn as insertBlankLine,cn as insertNewline,un as insertNewlineAndIndent,fn as insertNewlineKeepIndent,kn as insertTab,H as invertedEffects,N as isolateHistory,B as lineComment,C as lineUncomment,rn as moveLineDown,nn as moveLineUp,W as redo,Q as redoDepth,_ as redoSelection,Rt as selectAll,lt as selectCharBackward,at as selectCharBackwardLogical,ot as selectCharForward,st as selectCharForwardLogical,nt as selectCharLeft,rt as selectCharRight,Vt as selectDocEnd,It as selectDocStart,ht as selectGroupBackward,ut as selectGroupForward,ct as selectGroupLeft,ft as selectGroupRight,Lt as selectLine,Mt as selectLineBoundaryBackward,xt as selectLineBoundaryForward,Bt as selectLineBoundaryLeft,Ct as selectLineBoundaryRight,kt as selectLineDown,Ot as selectLineEnd,Et as selectLineStart,At as selectLineUp,Ze as selectMatchingBracket,Dt as selectPageDown,St as selectPageUp,Jt as selectParentSyntax,pt as selectSubwordBackward,dt as selectSubwordForward,gt as selectSyntaxLeft,yt as selectSyntaxRight,Nt as simplifySelection,Yt as splitLine,Sn as standardKeymap,An as temporarilySetTabFocusMode,E as toggleBlockComment,T as toggleBlockCommentByLine,D as toggleComment,M as toggleLineComment,vn as toggleTabFocusMode,Zt as transposeChars,P as undo,K as undoDepth,$ as undoSelection};
//# sourceMappingURL=codemirror_commands-vaOYkB4M.js.map
