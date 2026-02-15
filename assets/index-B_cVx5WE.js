(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();class En{constructor(n){this.routes=n,this.contentEl=null,this.isTransitioning=!1}init(n){this.contentEl=n,window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}async resolve(){if(this.isTransitioning)return;this.isTransitioning=!0;const n=window.location.hash||"#/",r=n.replace("#","")||"/",t=this.routes[r]||this.routes["/404"],i=window.__skipFadeTransition===!0;window.__skipFadeTransition=!1,i||(this.contentEl.classList.add("page-fade-out"),await new Promise(o=>setTimeout(o,300))),this.updateNavState(n),this.closeMobileMenu(),t&&await t(this.contentEl),i?this.contentEl.classList.remove("page-fade-out","page-fade-in"):(this.contentEl.classList.remove("page-fade-out"),this.contentEl.classList.add("page-fade-in"),await new Promise(o=>setTimeout(o,300)),this.contentEl.classList.remove("page-fade-in")),this.isTransitioning=!1,window.scrollTo(0,0)}updateNavState(n){document.querySelectorAll("[data-nav-link]").forEach(r=>{const t=r.getAttribute("href");t===n||n===""&&t==="#/"?(r.classList.add("text-white","font-semibold"),r.classList.remove("text-gray-200")):(r.classList.remove("text-white","font-semibold"),r.classList.add("text-gray-200"))})}closeMobileMenu(){const n=document.getElementById("floating-mobile-menu");n&&n.classList.add("hidden")}navigate(n){window.location.hash=n}}/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function Oe(e){return typeof e>"u"||e===null}function Cn(e){return typeof e=="object"&&e!==null}function Tn(e){return Array.isArray(e)?e:Oe(e)?[]:[e]}function kn(e,n){var r,t,i,o;if(n)for(o=Object.keys(n),r=0,t=o.length;r<t;r+=1)i=o[r],e[i]=n[i];return e}function Ln(e,n){var r="",t;for(t=0;t<n;t+=1)r+=e;return r}function Sn(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var _n=Oe,Fn=Cn,$n=Tn,In=Ln,Mn=Sn,On=kn,b={isNothing:_n,isObject:Fn,toArray:$n,repeat:In,isNegativeZero:Mn,extend:On};function Ne(e,n){var r="",t=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(r+='in "'+e.mark.name+'" '),r+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(r+=`

`+e.mark.snippet),t+" "+r):t}function U(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=Ne(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}U.prototype=Object.create(Error.prototype);U.prototype.constructor=U;U.prototype.toString=function(n){return this.name+": "+Ne(this,n)};var E=U;function ee(e,n,r,t,i){var o="",l="",a=Math.floor(i/2)-1;return t-n>a&&(o=" ... ",n=t-a+o.length),r-t>a&&(l=" ...",r=t+a-l.length),{str:o+e.slice(n,r).replace(/\t/g,"→")+l,pos:t-n+o.length}}function ne(e,n){return b.repeat(" ",n-e.length)+e}function Nn(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var r=/\r?\n|\r|\0/g,t=[0],i=[],o,l=-1;o=r.exec(e.buffer);)i.push(o.index),t.push(o.index+o[0].length),e.position<=o.index&&l<0&&(l=t.length-2);l<0&&(l=t.length-1);var a="",c,s,d=Math.min(e.line+n.linesAfter,i.length).toString().length,u=n.maxLength-(n.indent+d+3);for(c=1;c<=n.linesBefore&&!(l-c<0);c++)s=ee(e.buffer,t[l-c],i[l-c],e.position-(t[l]-t[l-c]),u),a=b.repeat(" ",n.indent)+ne((e.line-c+1).toString(),d)+" | "+s.str+`
`+a;for(s=ee(e.buffer,t[l],i[l],e.position,u),a+=b.repeat(" ",n.indent)+ne((e.line+1).toString(),d)+" | "+s.str+`
`,a+=b.repeat("-",n.indent+d+3+s.pos)+`^
`,c=1;c<=n.linesAfter&&!(l+c>=i.length);c++)s=ee(e.buffer,t[l+c],i[l+c],e.position-(t[l]-t[l+c]),u),a+=b.repeat(" ",n.indent)+ne((e.line+c+1).toString(),d)+" | "+s.str+`
`;return a.replace(/\n$/,"")}var Dn=Nn,Hn=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Bn=["scalar","sequence","mapping"];function Rn(e){var n={};return e!==null&&Object.keys(e).forEach(function(r){e[r].forEach(function(t){n[String(t)]=r})}),n}function Pn(e,n){if(n=n||{},Object.keys(n).forEach(function(r){if(Hn.indexOf(r)===-1)throw new E('Unknown option "'+r+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(r){return r},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=Rn(n.styleAliases||null),Bn.indexOf(this.kind)===-1)throw new E('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var w=Pn;function ve(e,n){var r=[];return e[n].forEach(function(t){var i=r.length;r.forEach(function(o,l){o.tag===t.tag&&o.kind===t.kind&&o.multi===t.multi&&(i=l)}),r[i]=t}),r}function jn(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,r;function t(i){i.multi?(e.multi[i.kind].push(i),e.multi.fallback.push(i)):e[i.kind][i.tag]=e.fallback[i.tag]=i}for(n=0,r=arguments.length;n<r;n+=1)arguments[n].forEach(t);return e}function le(e){return this.extend(e)}le.prototype.extend=function(n){var r=[],t=[];if(n instanceof w)t.push(n);else if(Array.isArray(n))t=t.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(r=r.concat(n.implicit)),n.explicit&&(t=t.concat(n.explicit));else throw new E("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.forEach(function(o){if(!(o instanceof w))throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new E("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new E("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),t.forEach(function(o){if(!(o instanceof w))throw new E("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var i=Object.create(le.prototype);return i.implicit=(this.implicit||[]).concat(r),i.explicit=(this.explicit||[]).concat(t),i.compiledImplicit=ve(i,"implicit"),i.compiledExplicit=ve(i,"explicit"),i.compiledTypeMap=jn(i.compiledImplicit,i.compiledExplicit),i};var De=le,He=new w("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),Be=new w("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),Re=new w("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),Pe=new De({explicit:[He,Be,Re]});function Yn(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function Un(){return null}function qn(e){return e===null}var je=new w("tag:yaml.org,2002:null",{kind:"scalar",resolve:Yn,construct:Un,predicate:qn,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Gn(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function Kn(e){return e==="true"||e==="True"||e==="TRUE"}function Wn(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var Ye=new w("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Gn,construct:Kn,predicate:Wn,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Vn(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Qn(e){return 48<=e&&e<=55}function Xn(e){return 48<=e&&e<=57}function zn(e){if(e===null)return!1;var n=e.length,r=0,t=!1,i;if(!n)return!1;if(i=e[r],(i==="-"||i==="+")&&(i=e[++r]),i==="0"){if(r+1===n)return!0;if(i=e[++r],i==="b"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(i!=="0"&&i!=="1")return!1;t=!0}return t&&i!=="_"}if(i==="x"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!Vn(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}if(i==="o"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!Qn(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}}if(i==="_")return!1;for(;r<n;r++)if(i=e[r],i!=="_"){if(!Xn(e.charCodeAt(r)))return!1;t=!0}return!(!t||i==="_")}function Zn(e){var n=e,r=1,t;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),t=n[0],(t==="-"||t==="+")&&(t==="-"&&(r=-1),n=n.slice(1),t=n[0]),n==="0")return 0;if(t==="0"){if(n[1]==="b")return r*parseInt(n.slice(2),2);if(n[1]==="x")return r*parseInt(n.slice(2),16);if(n[1]==="o")return r*parseInt(n.slice(2),8)}return r*parseInt(n,10)}function Jn(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!b.isNegativeZero(e)}var Ue=new w("tag:yaml.org,2002:int",{kind:"scalar",resolve:zn,construct:Zn,predicate:Jn,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),er=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function nr(e){return!(e===null||!er.test(e)||e[e.length-1]==="_")}function rr(e){var n,r;return n=e.replace(/_/g,"").toLowerCase(),r=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?r===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:r*parseFloat(n,10)}var ir=/^[-+]?[0-9]+e/;function tr(e,n){var r;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(b.isNegativeZero(e))return"-0.0";return r=e.toString(10),ir.test(r)?r.replace("e",".e"):r}function or(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||b.isNegativeZero(e))}var qe=new w("tag:yaml.org,2002:float",{kind:"scalar",resolve:nr,construct:rr,predicate:or,represent:tr,defaultStyle:"lowercase"}),Ge=Pe.extend({implicit:[je,Ye,Ue,qe]}),Ke=Ge,We=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Ve=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function lr(e){return e===null?!1:We.exec(e)!==null||Ve.exec(e)!==null}function ar(e){var n,r,t,i,o,l,a,c=0,s=null,d,u,p;if(n=We.exec(e),n===null&&(n=Ve.exec(e)),n===null)throw new Error("Date resolve error");if(r=+n[1],t=+n[2]-1,i=+n[3],!n[4])return new Date(Date.UTC(r,t,i));if(o=+n[4],l=+n[5],a=+n[6],n[7]){for(c=n[7].slice(0,3);c.length<3;)c+="0";c=+c}return n[9]&&(d=+n[10],u=+(n[11]||0),s=(d*60+u)*6e4,n[9]==="-"&&(s=-s)),p=new Date(Date.UTC(r,t,i,o,l,a,c)),s&&p.setTime(p.getTime()-s),p}function cr(e){return e.toISOString()}var Qe=new w("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:lr,construct:ar,instanceOf:Date,represent:cr});function sr(e){return e==="<<"||e===null}var Xe=new w("tag:yaml.org,2002:merge",{kind:"scalar",resolve:sr}),fe=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function ur(e){if(e===null)return!1;var n,r,t=0,i=e.length,o=fe;for(r=0;r<i;r++)if(n=o.indexOf(e.charAt(r)),!(n>64)){if(n<0)return!1;t+=6}return t%8===0}function dr(e){var n,r,t=e.replace(/[\r\n=]/g,""),i=t.length,o=fe,l=0,a=[];for(n=0;n<i;n++)n%4===0&&n&&(a.push(l>>16&255),a.push(l>>8&255),a.push(l&255)),l=l<<6|o.indexOf(t.charAt(n));return r=i%4*6,r===0?(a.push(l>>16&255),a.push(l>>8&255),a.push(l&255)):r===18?(a.push(l>>10&255),a.push(l>>2&255)):r===12&&a.push(l>>4&255),new Uint8Array(a)}function fr(e){var n="",r=0,t,i,o=e.length,l=fe;for(t=0;t<o;t++)t%3===0&&t&&(n+=l[r>>18&63],n+=l[r>>12&63],n+=l[r>>6&63],n+=l[r&63]),r=(r<<8)+e[t];return i=o%3,i===0?(n+=l[r>>18&63],n+=l[r>>12&63],n+=l[r>>6&63],n+=l[r&63]):i===2?(n+=l[r>>10&63],n+=l[r>>4&63],n+=l[r<<2&63],n+=l[64]):i===1&&(n+=l[r>>2&63],n+=l[r<<4&63],n+=l[64],n+=l[64]),n}function pr(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var ze=new w("tag:yaml.org,2002:binary",{kind:"scalar",resolve:ur,construct:dr,predicate:pr,represent:fr}),hr=Object.prototype.hasOwnProperty,mr=Object.prototype.toString;function gr(e){if(e===null)return!0;var n=[],r,t,i,o,l,a=e;for(r=0,t=a.length;r<t;r+=1){if(i=a[r],l=!1,mr.call(i)!=="[object Object]")return!1;for(o in i)if(hr.call(i,o))if(!l)l=!0;else return!1;if(!l)return!1;if(n.indexOf(o)===-1)n.push(o);else return!1}return!0}function xr(e){return e!==null?e:[]}var Ze=new w("tag:yaml.org,2002:omap",{kind:"sequence",resolve:gr,construct:xr}),vr=Object.prototype.toString;function yr(e){if(e===null)return!0;var n,r,t,i,o,l=e;for(o=new Array(l.length),n=0,r=l.length;n<r;n+=1){if(t=l[n],vr.call(t)!=="[object Object]"||(i=Object.keys(t),i.length!==1))return!1;o[n]=[i[0],t[i[0]]]}return!0}function br(e){if(e===null)return[];var n,r,t,i,o,l=e;for(o=new Array(l.length),n=0,r=l.length;n<r;n+=1)t=l[n],i=Object.keys(t),o[n]=[i[0],t[i[0]]];return o}var Je=new w("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:yr,construct:br}),wr=Object.prototype.hasOwnProperty;function Ar(e){if(e===null)return!0;var n,r=e;for(n in r)if(wr.call(r,n)&&r[n]!==null)return!1;return!0}function Er(e){return e!==null?e:{}}var en=new w("tag:yaml.org,2002:set",{kind:"mapping",resolve:Ar,construct:Er}),pe=Ke.extend({implicit:[Qe,Xe],explicit:[ze,Ze,Je,en]}),$=Object.prototype.hasOwnProperty,W=1,nn=2,rn=3,V=4,re=1,Cr=2,ye=3,Tr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,kr=/[\x85\u2028\u2029]/,Lr=/[,\[\]\{\}]/,tn=/^(?:!|!!|![a-z\-]+!)$/i,on=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function be(e){return Object.prototype.toString.call(e)}function L(e){return e===10||e===13}function M(e){return e===9||e===32}function C(e){return e===9||e===32||e===10||e===13}function H(e){return e===44||e===91||e===93||e===123||e===125}function Sr(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function _r(e){return e===120?2:e===117?4:e===85?8:0}function Fr(e){return 48<=e&&e<=57?e-48:-1}function we(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function $r(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function ln(e,n,r){n==="__proto__"?Object.defineProperty(e,n,{configurable:!0,enumerable:!0,writable:!0,value:r}):e[n]=r}var an=new Array(256),cn=new Array(256);for(var O=0;O<256;O++)an[O]=we(O)?1:0,cn[O]=we(O);function Ir(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||pe,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function sn(e,n){var r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=Dn(r),new E(n,r)}function f(e,n){throw sn(e,n)}function Q(e,n){e.onWarning&&e.onWarning.call(null,sn(e,n))}var Ae={YAML:function(n,r,t){var i,o,l;n.version!==null&&f(n,"duplication of %YAML directive"),t.length!==1&&f(n,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(t[0]),i===null&&f(n,"ill-formed argument of the YAML directive"),o=parseInt(i[1],10),l=parseInt(i[2],10),o!==1&&f(n,"unacceptable YAML version of the document"),n.version=t[0],n.checkLineBreaks=l<2,l!==1&&l!==2&&Q(n,"unsupported YAML version of the document")},TAG:function(n,r,t){var i,o;t.length!==2&&f(n,"TAG directive accepts exactly two arguments"),i=t[0],o=t[1],tn.test(i)||f(n,"ill-formed tag handle (first argument) of the TAG directive"),$.call(n.tagMap,i)&&f(n,'there is a previously declared suffix for "'+i+'" tag handle'),on.test(o)||f(n,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{f(n,"tag prefix is malformed: "+o)}n.tagMap[i]=o}};function F(e,n,r,t){var i,o,l,a;if(n<r){if(a=e.input.slice(n,r),t)for(i=0,o=a.length;i<o;i+=1)l=a.charCodeAt(i),l===9||32<=l&&l<=1114111||f(e,"expected valid JSON character");else Tr.test(a)&&f(e,"the stream contains non-printable characters");e.result+=a}}function Ee(e,n,r,t){var i,o,l,a;for(b.isObject(r)||f(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(r),l=0,a=i.length;l<a;l+=1)o=i[l],$.call(n,o)||(ln(n,o,r[o]),t[o]=!0)}function B(e,n,r,t,i,o,l,a,c){var s,d;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),s=0,d=i.length;s<d;s+=1)Array.isArray(i[s])&&f(e,"nested arrays are not supported inside keys"),typeof i=="object"&&be(i[s])==="[object Object]"&&(i[s]="[object Object]");if(typeof i=="object"&&be(i)==="[object Object]"&&(i="[object Object]"),i=String(i),n===null&&(n={}),t==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(s=0,d=o.length;s<d;s+=1)Ee(e,n,o[s],r);else Ee(e,n,o,r);else!e.json&&!$.call(r,i)&&$.call(n,i)&&(e.line=l||e.line,e.lineStart=a||e.lineStart,e.position=c||e.position,f(e,"duplicated mapping key")),ln(n,i,o),delete r[i];return n}function he(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):f(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function y(e,n,r){for(var t=0,i=e.input.charCodeAt(e.position);i!==0;){for(;M(i);)i===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(n&&i===35)do i=e.input.charCodeAt(++e.position);while(i!==10&&i!==13&&i!==0);if(L(i))for(he(e),i=e.input.charCodeAt(e.position),t++,e.lineIndent=0;i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position);else break}return r!==-1&&t!==0&&e.lineIndent<r&&Q(e,"deficient indentation"),t}function J(e){var n=e.position,r;return r=e.input.charCodeAt(n),!!((r===45||r===46)&&r===e.input.charCodeAt(n+1)&&r===e.input.charCodeAt(n+2)&&(n+=3,r=e.input.charCodeAt(n),r===0||C(r)))}function me(e,n){n===1?e.result+=" ":n>1&&(e.result+=b.repeat(`
`,n-1))}function Mr(e,n,r){var t,i,o,l,a,c,s,d,u=e.kind,p=e.result,h;if(h=e.input.charCodeAt(e.position),C(h)||H(h)||h===35||h===38||h===42||h===33||h===124||h===62||h===39||h===34||h===37||h===64||h===96||(h===63||h===45)&&(i=e.input.charCodeAt(e.position+1),C(i)||r&&H(i)))return!1;for(e.kind="scalar",e.result="",o=l=e.position,a=!1;h!==0;){if(h===58){if(i=e.input.charCodeAt(e.position+1),C(i)||r&&H(i))break}else if(h===35){if(t=e.input.charCodeAt(e.position-1),C(t))break}else{if(e.position===e.lineStart&&J(e)||r&&H(h))break;if(L(h))if(c=e.line,s=e.lineStart,d=e.lineIndent,y(e,!1,-1),e.lineIndent>=n){a=!0,h=e.input.charCodeAt(e.position);continue}else{e.position=l,e.line=c,e.lineStart=s,e.lineIndent=d;break}}a&&(F(e,o,l,!1),me(e,e.line-c),o=l=e.position,a=!1),M(h)||(l=e.position+1),h=e.input.charCodeAt(++e.position)}return F(e,o,l,!1),e.result?!0:(e.kind=u,e.result=p,!1)}function Or(e,n){var r,t,i;if(r=e.input.charCodeAt(e.position),r!==39)return!1;for(e.kind="scalar",e.result="",e.position++,t=i=e.position;(r=e.input.charCodeAt(e.position))!==0;)if(r===39)if(F(e,t,e.position,!0),r=e.input.charCodeAt(++e.position),r===39)t=e.position,e.position++,i=e.position;else return!0;else L(r)?(F(e,t,i,!0),me(e,y(e,!1,n)),t=i=e.position):e.position===e.lineStart&&J(e)?f(e,"unexpected end of the document within a single quoted scalar"):(e.position++,i=e.position);f(e,"unexpected end of the stream within a single quoted scalar")}function Nr(e,n){var r,t,i,o,l,a;if(a=e.input.charCodeAt(e.position),a!==34)return!1;for(e.kind="scalar",e.result="",e.position++,r=t=e.position;(a=e.input.charCodeAt(e.position))!==0;){if(a===34)return F(e,r,e.position,!0),e.position++,!0;if(a===92){if(F(e,r,e.position,!0),a=e.input.charCodeAt(++e.position),L(a))y(e,!1,n);else if(a<256&&an[a])e.result+=cn[a],e.position++;else if((l=_r(a))>0){for(i=l,o=0;i>0;i--)a=e.input.charCodeAt(++e.position),(l=Sr(a))>=0?o=(o<<4)+l:f(e,"expected hexadecimal character");e.result+=$r(o),e.position++}else f(e,"unknown escape sequence");r=t=e.position}else L(a)?(F(e,r,t,!0),me(e,y(e,!1,n)),r=t=e.position):e.position===e.lineStart&&J(e)?f(e,"unexpected end of the document within a double quoted scalar"):(e.position++,t=e.position)}f(e,"unexpected end of the stream within a double quoted scalar")}function Dr(e,n){var r=!0,t,i,o,l=e.tag,a,c=e.anchor,s,d,u,p,h,m=Object.create(null),x,v,T,g;if(g=e.input.charCodeAt(e.position),g===91)d=93,h=!1,a=[];else if(g===123)d=125,h=!0,a={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),g=e.input.charCodeAt(++e.position);g!==0;){if(y(e,!0,n),g=e.input.charCodeAt(e.position),g===d)return e.position++,e.tag=l,e.anchor=c,e.kind=h?"mapping":"sequence",e.result=a,!0;r?g===44&&f(e,"expected the node content, but found ','"):f(e,"missed comma between flow collection entries"),v=x=T=null,u=p=!1,g===63&&(s=e.input.charCodeAt(e.position+1),C(s)&&(u=p=!0,e.position++,y(e,!0,n))),t=e.line,i=e.lineStart,o=e.position,R(e,n,W,!1,!0),v=e.tag,x=e.result,y(e,!0,n),g=e.input.charCodeAt(e.position),(p||e.line===t)&&g===58&&(u=!0,g=e.input.charCodeAt(++e.position),y(e,!0,n),R(e,n,W,!1,!0),T=e.result),h?B(e,a,m,v,x,T,t,i,o):u?a.push(B(e,null,m,v,x,T,t,i,o)):a.push(x),y(e,!0,n),g=e.input.charCodeAt(e.position),g===44?(r=!0,g=e.input.charCodeAt(++e.position)):r=!1}f(e,"unexpected end of the stream within a flow collection")}function Hr(e,n){var r,t,i=re,o=!1,l=!1,a=n,c=0,s=!1,d,u;if(u=e.input.charCodeAt(e.position),u===124)t=!1;else if(u===62)t=!0;else return!1;for(e.kind="scalar",e.result="";u!==0;)if(u=e.input.charCodeAt(++e.position),u===43||u===45)re===i?i=u===43?ye:Cr:f(e,"repeat of a chomping mode identifier");else if((d=Fr(u))>=0)d===0?f(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?f(e,"repeat of an indentation width identifier"):(a=n+d-1,l=!0);else break;if(M(u)){do u=e.input.charCodeAt(++e.position);while(M(u));if(u===35)do u=e.input.charCodeAt(++e.position);while(!L(u)&&u!==0)}for(;u!==0;){for(he(e),e.lineIndent=0,u=e.input.charCodeAt(e.position);(!l||e.lineIndent<a)&&u===32;)e.lineIndent++,u=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>a&&(a=e.lineIndent),L(u)){c++;continue}if(e.lineIndent<a){i===ye?e.result+=b.repeat(`
`,o?1+c:c):i===re&&o&&(e.result+=`
`);break}for(t?M(u)?(s=!0,e.result+=b.repeat(`
`,o?1+c:c)):s?(s=!1,e.result+=b.repeat(`
`,c+1)):c===0?o&&(e.result+=" "):e.result+=b.repeat(`
`,c):e.result+=b.repeat(`
`,o?1+c:c),o=!0,l=!0,c=0,r=e.position;!L(u)&&u!==0;)u=e.input.charCodeAt(++e.position);F(e,r,e.position,!1)}return!0}function Ce(e,n){var r,t=e.tag,i=e.anchor,o=[],l,a=!1,c;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),c=e.input.charCodeAt(e.position);c!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,f(e,"tab characters must not be used in indentation")),!(c!==45||(l=e.input.charCodeAt(e.position+1),!C(l))));){if(a=!0,e.position++,y(e,!0,-1)&&e.lineIndent<=n){o.push(null),c=e.input.charCodeAt(e.position);continue}if(r=e.line,R(e,n,rn,!1,!0),o.push(e.result),y(e,!0,-1),c=e.input.charCodeAt(e.position),(e.line===r||e.lineIndent>n)&&c!==0)f(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return a?(e.tag=t,e.anchor=i,e.kind="sequence",e.result=o,!0):!1}function Br(e,n,r){var t,i,o,l,a,c,s=e.tag,d=e.anchor,u={},p=Object.create(null),h=null,m=null,x=null,v=!1,T=!1,g;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=u),g=e.input.charCodeAt(e.position);g!==0;){if(!v&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,f(e,"tab characters must not be used in indentation")),t=e.input.charCodeAt(e.position+1),o=e.line,(g===63||g===58)&&C(t))g===63?(v&&(B(e,u,p,h,m,null,l,a,c),h=m=x=null),T=!0,v=!0,i=!0):v?(v=!1,i=!0):f(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,g=t;else{if(l=e.line,a=e.lineStart,c=e.position,!R(e,r,nn,!1,!0))break;if(e.line===o){for(g=e.input.charCodeAt(e.position);M(g);)g=e.input.charCodeAt(++e.position);if(g===58)g=e.input.charCodeAt(++e.position),C(g)||f(e,"a whitespace character is expected after the key-value separator within a block mapping"),v&&(B(e,u,p,h,m,null,l,a,c),h=m=x=null),T=!0,v=!1,i=!1,h=e.tag,m=e.result;else if(T)f(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=s,e.anchor=d,!0}else if(T)f(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=s,e.anchor=d,!0}if((e.line===o||e.lineIndent>n)&&(v&&(l=e.line,a=e.lineStart,c=e.position),R(e,n,V,!0,i)&&(v?m=e.result:x=e.result),v||(B(e,u,p,h,m,x,l,a,c),h=m=x=null),y(e,!0,-1),g=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>n)&&g!==0)f(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return v&&B(e,u,p,h,m,null,l,a,c),T&&(e.tag=s,e.anchor=d,e.kind="mapping",e.result=u),T}function Rr(e){var n,r=!1,t=!1,i,o,l;if(l=e.input.charCodeAt(e.position),l!==33)return!1;if(e.tag!==null&&f(e,"duplication of a tag property"),l=e.input.charCodeAt(++e.position),l===60?(r=!0,l=e.input.charCodeAt(++e.position)):l===33?(t=!0,i="!!",l=e.input.charCodeAt(++e.position)):i="!",n=e.position,r){do l=e.input.charCodeAt(++e.position);while(l!==0&&l!==62);e.position<e.length?(o=e.input.slice(n,e.position),l=e.input.charCodeAt(++e.position)):f(e,"unexpected end of the stream within a verbatim tag")}else{for(;l!==0&&!C(l);)l===33&&(t?f(e,"tag suffix cannot contain exclamation marks"):(i=e.input.slice(n-1,e.position+1),tn.test(i)||f(e,"named tag handle cannot contain such characters"),t=!0,n=e.position+1)),l=e.input.charCodeAt(++e.position);o=e.input.slice(n,e.position),Lr.test(o)&&f(e,"tag suffix cannot contain flow indicator characters")}o&&!on.test(o)&&f(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{f(e,"tag name is malformed: "+o)}return r?e.tag=o:$.call(e.tagMap,i)?e.tag=e.tagMap[i]+o:i==="!"?e.tag="!"+o:i==="!!"?e.tag="tag:yaml.org,2002:"+o:f(e,'undeclared tag handle "'+i+'"'),!0}function Pr(e){var n,r;if(r=e.input.charCodeAt(e.position),r!==38)return!1;for(e.anchor!==null&&f(e,"duplication of an anchor property"),r=e.input.charCodeAt(++e.position),n=e.position;r!==0&&!C(r)&&!H(r);)r=e.input.charCodeAt(++e.position);return e.position===n&&f(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function jr(e){var n,r,t;if(t=e.input.charCodeAt(e.position),t!==42)return!1;for(t=e.input.charCodeAt(++e.position),n=e.position;t!==0&&!C(t)&&!H(t);)t=e.input.charCodeAt(++e.position);return e.position===n&&f(e,"name of an alias node must contain at least one character"),r=e.input.slice(n,e.position),$.call(e.anchorMap,r)||f(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],y(e,!0,-1),!0}function R(e,n,r,t,i){var o,l,a,c=1,s=!1,d=!1,u,p,h,m,x,v;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=l=a=V===r||rn===r,t&&y(e,!0,-1)&&(s=!0,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)),c===1)for(;Rr(e)||Pr(e);)y(e,!0,-1)?(s=!0,a=o,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)):a=!1;if(a&&(a=s||i),(c===1||V===r)&&(W===r||nn===r?x=n:x=n+1,v=e.position-e.lineStart,c===1?a&&(Ce(e,v)||Br(e,v,x))||Dr(e,x)?d=!0:(l&&Hr(e,x)||Or(e,x)||Nr(e,x)?d=!0:jr(e)?(d=!0,(e.tag!==null||e.anchor!==null)&&f(e,"alias node should not have any properties")):Mr(e,x,W===r)&&(d=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):c===0&&(d=a&&Ce(e,v))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&f(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),u=0,p=e.implicitTypes.length;u<p;u+=1)if(m=e.implicitTypes[u],m.resolve(e.result)){e.result=m.construct(e.result),e.tag=m.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if($.call(e.typeMap[e.kind||"fallback"],e.tag))m=e.typeMap[e.kind||"fallback"][e.tag];else for(m=null,h=e.typeMap.multi[e.kind||"fallback"],u=0,p=h.length;u<p;u+=1)if(e.tag.slice(0,h[u].tag.length)===h[u].tag){m=h[u];break}m||f(e,"unknown tag !<"+e.tag+">"),e.result!==null&&m.kind!==e.kind&&f(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+m.kind+'", not "'+e.kind+'"'),m.resolve(e.result,e.tag)?(e.result=m.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):f(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||d}function Yr(e){var n=e.position,r,t,i,o=!1,l;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(l=e.input.charCodeAt(e.position))!==0&&(y(e,!0,-1),l=e.input.charCodeAt(e.position),!(e.lineIndent>0||l!==37));){for(o=!0,l=e.input.charCodeAt(++e.position),r=e.position;l!==0&&!C(l);)l=e.input.charCodeAt(++e.position);for(t=e.input.slice(r,e.position),i=[],t.length<1&&f(e,"directive name must not be less than one character in length");l!==0;){for(;M(l);)l=e.input.charCodeAt(++e.position);if(l===35){do l=e.input.charCodeAt(++e.position);while(l!==0&&!L(l));break}if(L(l))break;for(r=e.position;l!==0&&!C(l);)l=e.input.charCodeAt(++e.position);i.push(e.input.slice(r,e.position))}l!==0&&he(e),$.call(Ae,t)?Ae[t](e,t,i):Q(e,'unknown document directive "'+t+'"')}if(y(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,y(e,!0,-1)):o&&f(e,"directives end mark is expected"),R(e,e.lineIndent-1,V,!1,!0),y(e,!0,-1),e.checkLineBreaks&&kr.test(e.input.slice(n,e.position))&&Q(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&J(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,y(e,!0,-1));return}if(e.position<e.length-1)f(e,"end of the stream or a document separator is expected");else return}function un(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var r=new Ir(e,n),t=e.indexOf("\0");for(t!==-1&&(r.position=t,f(r,"null byte is not allowed in input")),r.input+="\0";r.input.charCodeAt(r.position)===32;)r.lineIndent+=1,r.position+=1;for(;r.position<r.length-1;)Yr(r);return r.documents}function Ur(e,n,r){n!==null&&typeof n=="object"&&typeof r>"u"&&(r=n,n=null);var t=un(e,r);if(typeof n!="function")return t;for(var i=0,o=t.length;i<o;i+=1)n(t[i])}function qr(e,n){var r=un(e,n);if(r.length!==0){if(r.length===1)return r[0];throw new E("expected a single document in the stream, but found more")}}var Gr=Ur,Kr=qr,dn={loadAll:Gr,load:Kr},fn=Object.prototype.toString,pn=Object.prototype.hasOwnProperty,ge=65279,Wr=9,q=10,Vr=13,Qr=32,Xr=33,zr=34,ae=35,Zr=37,Jr=38,ei=39,ni=42,hn=44,ri=45,X=58,ii=61,ti=62,oi=63,li=64,mn=91,gn=93,ai=96,xn=123,ci=124,vn=125,A={};A[0]="\\0";A[7]="\\a";A[8]="\\b";A[9]="\\t";A[10]="\\n";A[11]="\\v";A[12]="\\f";A[13]="\\r";A[27]="\\e";A[34]='\\"';A[92]="\\\\";A[133]="\\N";A[160]="\\_";A[8232]="\\L";A[8233]="\\P";var si=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],ui=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function di(e,n){var r,t,i,o,l,a,c;if(n===null)return{};for(r={},t=Object.keys(n),i=0,o=t.length;i<o;i+=1)l=t[i],a=String(n[l]),l.slice(0,2)==="!!"&&(l="tag:yaml.org,2002:"+l.slice(2)),c=e.compiledTypeMap.fallback[l],c&&pn.call(c.styleAliases,a)&&(a=c.styleAliases[a]),r[l]=a;return r}function fi(e){var n,r,t;if(n=e.toString(16).toUpperCase(),e<=255)r="x",t=2;else if(e<=65535)r="u",t=4;else if(e<=4294967295)r="U",t=8;else throw new E("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+r+b.repeat("0",t-n.length)+n}var pi=1,G=2;function hi(e){this.schema=e.schema||pe,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=b.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=di(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?G:pi,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Te(e,n){for(var r=b.repeat(" ",n),t=0,i=-1,o="",l,a=e.length;t<a;)i=e.indexOf(`
`,t),i===-1?(l=e.slice(t),t=a):(l=e.slice(t,i+1),t=i+1),l.length&&l!==`
`&&(o+=r),o+=l;return o}function ce(e,n){return`
`+b.repeat(" ",e.indent*n)}function mi(e,n){var r,t,i;for(r=0,t=e.implicitTypes.length;r<t;r+=1)if(i=e.implicitTypes[r],i.resolve(n))return!0;return!1}function z(e){return e===Qr||e===Wr}function K(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==ge||65536<=e&&e<=1114111}function ke(e){return K(e)&&e!==ge&&e!==Vr&&e!==q}function Le(e,n,r){var t=ke(e),i=t&&!z(e);return(r?t:t&&e!==hn&&e!==mn&&e!==gn&&e!==xn&&e!==vn)&&e!==ae&&!(n===X&&!i)||ke(n)&&!z(n)&&e===ae||n===X&&i}function gi(e){return K(e)&&e!==ge&&!z(e)&&e!==ri&&e!==oi&&e!==X&&e!==hn&&e!==mn&&e!==gn&&e!==xn&&e!==vn&&e!==ae&&e!==Jr&&e!==ni&&e!==Xr&&e!==ci&&e!==ii&&e!==ti&&e!==ei&&e!==zr&&e!==Zr&&e!==li&&e!==ai}function xi(e){return!z(e)&&e!==X}function j(e,n){var r=e.charCodeAt(n),t;return r>=55296&&r<=56319&&n+1<e.length&&(t=e.charCodeAt(n+1),t>=56320&&t<=57343)?(r-55296)*1024+t-56320+65536:r}function yn(e){var n=/^\n* /;return n.test(e)}var bn=1,se=2,wn=3,An=4,D=5;function vi(e,n,r,t,i,o,l,a){var c,s=0,d=null,u=!1,p=!1,h=t!==-1,m=-1,x=gi(j(e,0))&&xi(j(e,e.length-1));if(n||l)for(c=0;c<e.length;s>=65536?c+=2:c++){if(s=j(e,c),!K(s))return D;x=x&&Le(s,d,a),d=s}else{for(c=0;c<e.length;s>=65536?c+=2:c++){if(s=j(e,c),s===q)u=!0,h&&(p=p||c-m-1>t&&e[m+1]!==" ",m=c);else if(!K(s))return D;x=x&&Le(s,d,a),d=s}p=p||h&&c-m-1>t&&e[m+1]!==" "}return!u&&!p?x&&!l&&!i(e)?bn:o===G?D:se:r>9&&yn(e)?D:l?o===G?D:se:p?An:wn}function yi(e,n,r,t,i){e.dump=(function(){if(n.length===0)return e.quotingType===G?'""':"''";if(!e.noCompatMode&&(si.indexOf(n)!==-1||ui.test(n)))return e.quotingType===G?'"'+n+'"':"'"+n+"'";var o=e.indent*Math.max(1,r),l=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),a=t||e.flowLevel>-1&&r>=e.flowLevel;function c(s){return mi(e,s)}switch(vi(n,a,e.indent,l,c,e.quotingType,e.forceQuotes&&!t,i)){case bn:return n;case se:return"'"+n.replace(/'/g,"''")+"'";case wn:return"|"+Se(n,e.indent)+_e(Te(n,o));case An:return">"+Se(n,e.indent)+_e(Te(bi(n,l),o));case D:return'"'+wi(n)+'"';default:throw new E("impossible error: invalid scalar style")}})()}function Se(e,n){var r=yn(e)?String(n):"",t=e[e.length-1]===`
`,i=t&&(e[e.length-2]===`
`||e===`
`),o=i?"+":t?"":"-";return r+o+`
`}function _e(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function bi(e,n){for(var r=/(\n+)([^\n]*)/g,t=(function(){var s=e.indexOf(`
`);return s=s!==-1?s:e.length,r.lastIndex=s,Fe(e.slice(0,s),n)})(),i=e[0]===`
`||e[0]===" ",o,l;l=r.exec(e);){var a=l[1],c=l[2];o=c[0]===" ",t+=a+(!i&&!o&&c!==""?`
`:"")+Fe(c,n),i=o}return t}function Fe(e,n){if(e===""||e[0]===" ")return e;for(var r=/ [^ ]/g,t,i=0,o,l=0,a=0,c="";t=r.exec(e);)a=t.index,a-i>n&&(o=l>i?l:a,c+=`
`+e.slice(i,o),i=o+1),l=a;return c+=`
`,e.length-i>n&&l>i?c+=e.slice(i,l)+`
`+e.slice(l+1):c+=e.slice(i),c.slice(1)}function wi(e){for(var n="",r=0,t,i=0;i<e.length;r>=65536?i+=2:i++)r=j(e,i),t=A[r],!t&&K(r)?(n+=e[i],r>=65536&&(n+=e[i+1])):n+=t||fi(r);return n}function Ai(e,n,r){var t="",i=e.tag,o,l,a;for(o=0,l=r.length;o<l;o+=1)a=r[o],e.replacer&&(a=e.replacer.call(r,String(o),a)),(_(e,n,a,!1,!1)||typeof a>"u"&&_(e,n,null,!1,!1))&&(t!==""&&(t+=","+(e.condenseFlow?"":" ")),t+=e.dump);e.tag=i,e.dump="["+t+"]"}function $e(e,n,r,t){var i="",o=e.tag,l,a,c;for(l=0,a=r.length;l<a;l+=1)c=r[l],e.replacer&&(c=e.replacer.call(r,String(l),c)),(_(e,n+1,c,!0,!0,!1,!0)||typeof c>"u"&&_(e,n+1,null,!0,!0,!1,!0))&&((!t||i!=="")&&(i+=ce(e,n)),e.dump&&q===e.dump.charCodeAt(0)?i+="-":i+="- ",i+=e.dump);e.tag=o,e.dump=i||"[]"}function Ei(e,n,r){var t="",i=e.tag,o=Object.keys(r),l,a,c,s,d;for(l=0,a=o.length;l<a;l+=1)d="",t!==""&&(d+=", "),e.condenseFlow&&(d+='"'),c=o[l],s=r[c],e.replacer&&(s=e.replacer.call(r,c,s)),_(e,n,c,!1,!1)&&(e.dump.length>1024&&(d+="? "),d+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),_(e,n,s,!1,!1)&&(d+=e.dump,t+=d));e.tag=i,e.dump="{"+t+"}"}function Ci(e,n,r,t){var i="",o=e.tag,l=Object.keys(r),a,c,s,d,u,p;if(e.sortKeys===!0)l.sort();else if(typeof e.sortKeys=="function")l.sort(e.sortKeys);else if(e.sortKeys)throw new E("sortKeys must be a boolean or a function");for(a=0,c=l.length;a<c;a+=1)p="",(!t||i!=="")&&(p+=ce(e,n)),s=l[a],d=r[s],e.replacer&&(d=e.replacer.call(r,s,d)),_(e,n+1,s,!0,!0,!0)&&(u=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,u&&(e.dump&&q===e.dump.charCodeAt(0)?p+="?":p+="? "),p+=e.dump,u&&(p+=ce(e,n)),_(e,n+1,d,!0,u)&&(e.dump&&q===e.dump.charCodeAt(0)?p+=":":p+=": ",p+=e.dump,i+=p));e.tag=o,e.dump=i||"{}"}function Ie(e,n,r){var t,i,o,l,a,c;for(i=r?e.explicitTypes:e.implicitTypes,o=0,l=i.length;o<l;o+=1)if(a=i[o],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof n=="object"&&n instanceof a.instanceOf)&&(!a.predicate||a.predicate(n))){if(r?a.multi&&a.representName?e.tag=a.representName(n):e.tag=a.tag:e.tag="?",a.represent){if(c=e.styleMap[a.tag]||a.defaultStyle,fn.call(a.represent)==="[object Function]")t=a.represent(n,c);else if(pn.call(a.represent,c))t=a.represent[c](n,c);else throw new E("!<"+a.tag+'> tag resolver accepts not "'+c+'" style');e.dump=t}return!0}return!1}function _(e,n,r,t,i,o,l){e.tag=null,e.dump=r,Ie(e,r,!1)||Ie(e,r,!0);var a=fn.call(e.dump),c=t,s;t&&(t=e.flowLevel<0||e.flowLevel>n);var d=a==="[object Object]"||a==="[object Array]",u,p;if(d&&(u=e.duplicates.indexOf(r),p=u!==-1),(e.tag!==null&&e.tag!=="?"||p||e.indent!==2&&n>0)&&(i=!1),p&&e.usedDuplicates[u])e.dump="*ref_"+u;else{if(d&&p&&!e.usedDuplicates[u]&&(e.usedDuplicates[u]=!0),a==="[object Object]")t&&Object.keys(e.dump).length!==0?(Ci(e,n,e.dump,i),p&&(e.dump="&ref_"+u+e.dump)):(Ei(e,n,e.dump),p&&(e.dump="&ref_"+u+" "+e.dump));else if(a==="[object Array]")t&&e.dump.length!==0?(e.noArrayIndent&&!l&&n>0?$e(e,n-1,e.dump,i):$e(e,n,e.dump,i),p&&(e.dump="&ref_"+u+e.dump)):(Ai(e,n,e.dump),p&&(e.dump="&ref_"+u+" "+e.dump));else if(a==="[object String]")e.tag!=="?"&&yi(e,e.dump,n,o,c);else{if(a==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new E("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(s=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?s="!"+s:s.slice(0,18)==="tag:yaml.org,2002:"?s="!!"+s.slice(18):s="!<"+s+">",e.dump=s+" "+e.dump)}return!0}function Ti(e,n){var r=[],t=[],i,o;for(ue(e,r,t),i=0,o=t.length;i<o;i+=1)n.duplicates.push(r[t[i]]);n.usedDuplicates=new Array(o)}function ue(e,n,r){var t,i,o;if(e!==null&&typeof e=="object")if(i=n.indexOf(e),i!==-1)r.indexOf(i)===-1&&r.push(i);else if(n.push(e),Array.isArray(e))for(i=0,o=e.length;i<o;i+=1)ue(e[i],n,r);else for(t=Object.keys(e),i=0,o=t.length;i<o;i+=1)ue(e[t[i]],n,r)}function ki(e,n){n=n||{};var r=new hi(n);r.noRefs||Ti(e,r);var t=e;return r.replacer&&(t=r.replacer.call({"":t},"",t)),_(r,0,t,!0,!0)?r.dump+`
`:""}var Li=ki,Si={dump:Li};function xe(e,n){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}var _i=w,Fi=De,$i=Pe,Ii=Ge,Mi=Ke,Oi=pe,Ni=dn.load,Di=dn.loadAll,Hi=Si.dump,Bi=E,Ri={binary:ze,float:qe,map:Re,null:je,pairs:Je,set:en,timestamp:Qe,bool:Ye,int:Ue,merge:Xe,omap:Ze,seq:Be,str:He},Pi=xe("safeLoad","load"),ji=xe("safeLoadAll","loadAll"),Yi=xe("safeDump","dump"),Ui={Type:_i,Schema:Fi,FAILSAFE_SCHEMA:$i,JSON_SCHEMA:Ii,CORE_SCHEMA:Mi,DEFAULT_SCHEMA:Oi,load:Ni,loadAll:Di,dump:Hi,YAMLException:Bi,types:Ri,safeLoad:Pi,safeLoadAll:ji,safeDump:Yi};async function S(e){const r=await(await fetch(e)).text();return Ui.load(r)}async function qi(e,n,r){const i=(r.heroSelections||[]).map(o=>{const l=o.color||"#18428F";return o.scrollTo?`<a href="#/" data-scroll-to="${o.scrollTo}" class="hero-bar-button gradient-text-hover" style="background-color: ${l}">${o.label}</a>`:o.path?`<a href="#${o.path}" class="hero-bar-button gradient-text-hover" data-circle-expand style="background-color: ${l}">${o.label}</a>`:`<a href="#/" class="hero-bar-button gradient-text-hover" style="background-color: ${l}">${o.label}</a>`}).join("");e.innerHTML=`
    <!-- Hero Section (half page) -->
    <div class="home-hero" style="background-image: url('${n}images/hero-bg.jpg')">
      <div class="home-hero-overlay"></div>
      <div class="home-hero-content">
        <h1 class="home-hero-title">${r.name}</h1>
      </div>
      <div class="hero-button-bar">
        ${i}
      </div>
    </div>

    <!-- About Section (5 subsections with color circles) -->
    <section id="about-section" class="home-section bg-white">
      <div class="about-section-container">
        <div id="about-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section id="partners-section" class="home-section" style="background-color: #F8F8F8;">
      <div class="max-w-5xl mx-auto px-4 py-16">
        <h2 class="font-heading text-3xl font-bold text-primary-dark text-center mb-4">Our Partners</h2>
        <div id="partners-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>
  `,setTimeout(()=>{const o=e.querySelector(".home-hero");o&&o.classList.add("fade-in-active")},50),Gi(e),Ki(n),Wi(n)}function Gi(e){e.querySelectorAll("[data-circle-expand]").forEach(n=>{n.addEventListener("click",r=>{r.preventDefault();const t=n.getAttribute("href"),i=n.getBoundingClientRect(),o=i.left+i.width/2,l=i.top+i.height/2,c=Math.max(Math.hypot(o,l),Math.hypot(window.innerWidth-o,l),Math.hypot(o,window.innerHeight-l),Math.hypot(window.innerWidth-o,window.innerHeight-l))*2,s=document.createElement("div");s.className="circle-expand-overlay",s.style.cssText=`
        left: ${o-c/2}px;
        top: ${l-c/2}px;
        width: ${c}px;
        height: ${c}px;
      `,document.body.appendChild(s),window.__skipFadeTransition=!0,window.location.hash=t,s.addEventListener("animationend",()=>s.remove())})})}async function Ki(e){try{const n=await S(`${e}data/about.yaml`),r=document.getElementById("about-content");if(!r||!n.subsections)return;r.innerHTML=n.subsections.map((t,i)=>{const o=i%2===1,l=t.color||"#18428F",a=t.subtitle?`<p class="font-body text-sm text-primary-cyan font-semibold mb-2">${Y(t.subtitle)}</p>`:"";return`
          <div class="about-subsection ${o?"reverse":""}">
            <div class="about-subsection-circle" style="background-color: ${l}"></div>
            <div class="about-subsection-text-box" style="border: 2px solid ${l}">
              <h3 class="font-heading text-2xl font-bold mb-2" style="color: ${l}">${Y(t.title)}</h3>
              ${a}
              <p class="font-body text-gray-600 leading-relaxed">${Y(t.description)}</p>
            </div>
          </div>
        `}).join("")}catch{const n=document.getElementById("about-content");n&&(n.innerHTML='<p class="text-red-500 font-body">Failed to load content.</p>')}}async function Wi(e){try{const n=await S(`${e}data/partners.yaml`),r=document.getElementById("partners-content");if(!r)return;const t=n.intro?`<p class="font-body text-gray-600 text-center mb-8">${Y(n.intro)}</p>`:"",i=(n.partners||[]).map(o=>`<span class="partner-name">${Y(o.name)}</span>`).join("");r.innerHTML=`
      ${t}
      <div class="partners-grid">
        ${i}
      </div>
    `}catch{const n=document.getElementById("partners-content");n&&(n.innerHTML='<p class="text-red-500 font-body">Failed to load partners.</p>')}}function Y(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function Vi(e,n){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-8">Chapter News</h1>
      <div id="news-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/news.yaml`),t=document.getElementById("news-content");if(!r.newsItems||r.newsItems.length===0){t.innerHTML='<p class="font-body text-gray-500 text-center py-8">No news available yet. Check back soon!</p>';return}t.innerHTML=`
      <div class="news-grid">
        ${r.newsItems.map(i=>`
          <div class="news-card">
            <div class="news-card-image">
              <img
                src="${n}images/${i.image}"
                alt="${ie(i.title)}"
                onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-sm p-4 text-center font-body\\' style=\\'background-color: #E2E1EE\\'>Image unavailable</div>'"
              />
            </div>
            <div class="p-5">
              <p class="font-body text-xs uppercase tracking-wide mb-2" style="color: #B64B28;">${Qi(i.date)}</p>
              <h3 class="font-heading font-semibold text-primary-dark mb-2">${ie(i.title)}</h3>
              <p class="font-body text-gray-600 text-sm">${ie(i.description)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `}catch{document.getElementById("news-content").innerHTML='<p class="text-red-500 font-body">Failed to load news.</p>'}}function Qi(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function ie(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}const Xi="/website-test/",zi=[{regex:/\[Volunteer\]/i,category:"Volunteer",color:"#18428F"},{regex:/\[Meeting\]/i,category:"Meeting",color:"#00C2F3"},{regex:/\[Social\]/i,category:"Social",color:"#F26524"},{regex:/\[Workshop\]/i,category:"Workshop",color:"#19226D"},{regex:/\[Conference\]/i,category:"Conference",color:"#B64B28"}],Zi={category:"General",color:"#41434C"};function Ji(e){for(const n of zi)if(n.regex.test(e))return{category:n.category,color:n.color};return Zi}function et(e){return e.replace(/\[(Volunteer|Meeting|Social|Workshop|Conference)\]\s*/i,"")}function nt(e){if(!e.start.dateTime){const s=e.start.date.split("-"),d=new Date(s[0],s[1]-1,s[2]),u=e.end.date.split("-"),p=new Date(u[0],u[1]-1,u[2]);p.setDate(p.getDate()-1);const h={month:"short",day:"numeric",year:"numeric"},m=d.toLocaleDateString("en-US",h);if(p.getTime()>d.getTime()){const x=p.toLocaleDateString("en-US",h);return{dateStr:`${m} – ${x}`,timeStr:"All Day",isAllDay:!0}}return{dateStr:m,timeStr:"All Day",isAllDay:!0}}const r=new Date(e.start.dateTime),t=new Date(e.end.dateTime),i=r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),o={hour:"numeric",minute:"2-digit"},l=`${r.toLocaleTimeString("en-US",o)} – ${t.toLocaleTimeString("en-US",o)}`,a=r.toDateString(),c=t.toDateString();if(a!==c){const s=t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return{dateStr:`${i} – ${s}`,timeStr:l,isAllDay:!1}}return{dateStr:i,timeStr:l,isAllDay:!1}}async function rt(e){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-8">Upcoming Events</h1>
      <div id="events-list">
        <div class="text-center py-8 text-gray-400 font-body">Loading events...</div>
      </div>
    </div>
  `;const n=document.getElementById("events-list");try{const r=await fetch(`${Xi}data/events.json`);if(!r.ok){n.innerHTML=`
        <div class="rounded-lg p-6 text-center" style="background-color: #F8F8F8; border: 1px solid #E2E1EE;">
          <p class="font-body text-primary-dark font-semibold mb-2">Events Not Available</p>
          <p class="font-body text-gray-500 text-sm">
            Event data has not been generated yet. Run
            <code class="px-1 rounded" style="background-color: #E2E1EE;">npm run fetch-events</code>
            or push to main to trigger a build.
          </p>
        </div>
      `;return}const t=await r.json();if(!t.events||t.events.length===0){n.innerHTML=`
        <div class="text-center py-8">
          <p class="font-body text-gray-500">No upcoming events at this time. Check back soon!</p>
        </div>
      `;return}const i=t.events;n.innerHTML=`
      <div class="timeline-container">
        <div class="timeline-track">
          ${i.map(o=>{const l=o.summary||"Untitled Event",{category:a,color:c}=Ji(l),s=et(l),{dateStr:d,timeStr:u,isAllDay:p}=nt(o),h=o.description?`<p class="font-body text-sm text-gray-500 mt-2 line-clamp-2">${te(o.description)}</p>`:"";return`
                <div class="timeline-event" style="--event-color: ${c}" onclick="window.location.hash='#/contact'">
                  <div class="timeline-dot"></div>
                  <div class="timeline-card">
                    <span class="timeline-category">${te(a)}</span>
                    <h3 class="font-heading font-semibold text-primary-dark mt-1">${te(s)}</h3>
                    <p class="font-body text-sm text-gray-500 mt-1">${d}</p>
                    <p class="font-body text-sm text-gray-400">${u}</p>
                    ${h}
                    <p class="font-body text-xs mt-2" style="color: var(--event-color)">Click to contact us about this event</p>
                  </div>
                </div>
              `}).join("")}
        </div>
      </div>
      <p class="text-center text-sm text-gray-400 mt-4 font-body">Scroll horizontally to see more events &rarr;</p>
      ${t.fetchedAt?`<p class="text-center text-xs text-gray-300 mt-2 font-body">Last updated: ${new Date(t.fetchedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p>`:""}
    `}catch{n.innerHTML=`
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="font-body text-red-800 font-semibold mb-2">Unable to Load Events</p>
        <p class="font-body text-red-600 text-sm">There was an error loading event data. Please try again later.</p>
      </div>
    `}}function te(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function it(e,n){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-6">Executive Board</h1>
      <div id="board-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/board.yaml`),t=document.getElementById("board-content"),i=r.current.map(a=>Me(a,n)).join("");let o="";r.founding&&r.founding.length>0&&(o=`
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-6">Founding Chapter Members</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${r.founding.map(c=>Me(c,n)).join("")}
          </div>
        </div>
      `);let l="";r.previous&&(l=`
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-4">Previous Executive Board (${I(r.previous.year)})</h2>
          <div class="bg-white rounded-lg shadow-sm divide-y" style="border: 1px solid #E2E1EE;">
            ${r.previous.members.map(a=>`
              <div class="px-4 py-3 flex items-center justify-between">
                <span class="font-body font-medium text-primary-dark">${I(a.name)}</span>
                <span class="font-body text-gray-500 text-sm">${I(a.title)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `),t.innerHTML=`
      <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-6">Current Board</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${i}
      </div>
      ${o}
      ${l}
    `}catch{document.getElementById("board-content").innerHTML='<p class="text-red-500 font-body">Failed to load board members.</p>'}}function Me(e,n){const r=e.linkedin?`<a href="${e.linkedin}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="LinkedIn">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>`:"",t=e.website?`<a href="${e.website}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="Website">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
      </a>`:"";return`
    <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" style="border: 1px solid #E2E1EE;">
      <div class="aspect-square flex items-center justify-center" style="background-color: #E2E1EE;">
        <img
          src="${n}images/${e.photo}"
          alt="${I(e.name)}"
          class="w-full h-full object-cover"
          onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-6xl font-light font-heading\\' style=\\'color: #18428F;\\'>${e.name.charAt(0)}</div>'"
        />
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-heading font-semibold text-primary-dark">${I(e.name)}</h3>
            ${e.title?`<p class="font-body text-sm font-medium" style="color: #00C2F3;">${I(e.title)}</p>`:""}
          </div>
          <div class="flex gap-2">
            ${r}
            ${t}
          </div>
        </div>
        ${e.bio?`<p class="font-body text-gray-500 text-sm mt-2">${I(e.bio)}</p>`:""}
      </div>
    </div>
  `}function I(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function tt(e,n){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-6">Photo Gallery</h1>
      <div id="gallery-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/gallery.yaml`),t=document.getElementById("gallery-content");if(!r.photos||r.photos.length===0){t.innerHTML='<p class="font-body text-gray-500 text-center py-8">No photos available yet.</p>';return}t.innerHTML=`
      <div class="masonry-grid">
        ${r.photos.map((i,o)=>`
          <div class="masonry-item cursor-pointer" data-gallery-index="${o}">
            <img
              src="${n}images/${i.path}"
              alt="${Z(i.caption)}"
              onerror="this.style.display='none'"
            />
            <div class="masonry-overlay">
              <p class="text-white text-sm font-medium font-body">${Z(i.caption)}</p>
              ${i.date?`<p class="text-gray-300 text-xs mt-1 font-body">${i.date}</p>`:""}
            </div>
          </div>
        `).join("")}
      </div>
    `,t.querySelectorAll("[data-gallery-index]").forEach(i=>{i.addEventListener("click",()=>{const o=parseInt(i.dataset.galleryIndex);ot(r.photos,o,n)})})}catch{document.getElementById("gallery-content").innerHTML='<p class="text-red-500 font-body">Failed to load gallery.</p>'}}function ot(e,n,r){const t=e[n],i=document.createElement("div");i.className="lightbox-overlay",i.innerHTML=`
    <span class="lightbox-close">&times;</span>
    <img src="${r}images/${t.path}" alt="${Z(t.caption)}" />
    <div class="lightbox-caption">${Z(t.caption)}</div>
  `,i.addEventListener("click",o=>{(o.target===i||o.target.classList.contains("lightbox-close"))&&i.remove()}),document.addEventListener("keydown",function o(l){l.key==="Escape"&&(i.remove(),document.removeEventListener("keydown",o))}),document.body.appendChild(i)}function Z(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function lt(e,n,r){e.innerHTML=`
    <div class="max-w-4xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <div id="program-item-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const t=await S(`${n}data/programs.yaml`),i=document.getElementById("program-item-content");let o=null,l=null;for(const a of t.programs){for(const c of a.items)if(c.slug===r){o=c,l=a;break}if(o)break}if(!o){i.innerHTML=`
        <div class="text-center py-12">
          <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">Program Not Found</h1>
          <p class="font-body text-gray-500 mb-6">The program you're looking for doesn't exist.</p>
          <a href="#/programs" class="font-body text-primary-cyan hover:text-primary-blue underline">Back to Programs</a>
        </div>
      `;return}i.innerHTML=`
      <nav class="font-body text-sm text-gray-400 mb-6">
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">Ongoing Programs</a>
        <span class="mx-2">/</span>
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">${P(l.title)}</a>
        <span class="mx-2">/</span>
        <span class="text-primary-dark">${P(o.name)}</span>
      </nav>
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">${P(o.name)}</h1>
      <div class="font-body text-gray-600 leading-relaxed text-lg mb-8">
        <p>${P(o.description)}</p>
      </div>
      <div class="border-t pt-6 mt-8" style="border-color: #E2E1EE;">
        <p class="font-body text-gray-500 text-sm">
          This program is part of our <strong>${P(l.title)}</strong> initiative.
          <a href="#/contact" class="text-primary-cyan hover:text-primary-blue underline ml-1">Contact us</a> to learn more or get involved.
        </p>
      </div>
    `}catch{const t=document.getElementById("program-item-content");t&&(t.innerHTML='<p class="text-red-500 font-body">Failed to load program details.</p>')}}function P(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function at(e,n){e.innerHTML=`
    <div class="max-w-5xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-12">Ongoing Programs</h1>
      <div id="programs-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/programs.yaml`),t=document.getElementById("programs-content");if(!t)return;t.innerHTML=r.programs.map((i,o)=>{const l=o%2===1,a=i.items.map(c=>{let s="",d="";return c.link?s=c.link:c.scrollTo?(s="#/",d=`data-scroll-to="${c.scrollTo}"`):c.slug&&(s=`#/programs/${c.slug}`),`
              <div class="mb-4">
                <h4 class="font-body font-semibold text-primary-dark">${s?`<a href="${s}" ${d} class="program-item-name-link">${N(c.name)}<span class="program-item-arrow"> &rarr;</span></a>`:`<span class="font-body font-semibold text-primary-dark">${N(c.name)}</span>`}</h4>
                <p class="font-body text-gray-600 text-sm mt-1">${N(c.description)}</p>
              </div>
            `}).join("");return`
          <div class="program-page-card ${l?"reverse":""}">
            <div class="program-page-card-image">
              <img
                src="${n}images/${i.image}"
                alt="${N(i.title)}"
                class="program-circle-image"
                onerror="this.style.display='none'"
              />
            </div>
            <div class="program-page-card-content">
              <h2 class="font-heading text-2xl font-bold text-primary-dark mb-2">${N(i.title)}</h2>
              <p class="font-body text-gray-500 mb-4">${N(i.summary)}</p>
              <div class="space-y-2">
                ${a}
              </div>
            </div>
          </div>
          ${o<r.programs.length-1?'<hr class="my-4 border-secondary-light">':""}
        `}).join("")}catch{const r=document.getElementById("programs-content");r&&(r.innerHTML='<p class="text-red-500 font-body">Failed to load programs.</p>')}}function N(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function ct(e,n){e.innerHTML=`
    <div class="max-w-4xl mx-auto px-4 py-16" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-8">Contact Us</h1>
      <div id="contact-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/contact.yaml`),t=document.getElementById("contact-content");if(!t)return;const i="https://docs.google.com/forms/d/e/1FAIpQLSegzppXQ_TB9Pk50epXR_uFKdXY9guNzy05o45u357XP99b8w/viewform?embedded=true",o=r.description?`<p class="font-body text-gray-600 mb-8 text-center">${st(r.description)}</p>`:"",l=i&&!i.includes("YOUR_FORM_ID")?`
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <iframe
          src="${i}"
          width="100%"
          height="800"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="w-full"
          title="Contact Form"
        >Loading form...</iframe>
      </div>
    `:`
      <div class="border border-secondary-light rounded-lg p-6 text-center" style="background-color: #F8F8F8;">
        <p class="font-body text-primary-dark font-semibold mb-2">Contact Form Not Configured</p>
        <p class="font-body text-gray-500 text-sm">
          To display the contact form, add your Google Form embed URL to your
          <code class="bg-secondary-light px-1 rounded">.env</code> file.
          See MAINTENANCE.md for setup instructions.
        </p>
      </div>
    `;t.innerHTML=o+l}catch{const r=document.getElementById("contact-content");r&&(r.innerHTML='<p class="text-red-500 font-body">Failed to load contact information.</p>')}}function st(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}const k="/website-test/";let oe=null;async function ut(){const e=await S(`${k}data/site.yaml`);oe=await S(`${k}data/programs.yaml`),document.title=e.name;const n=document.getElementById("app");n.innerHTML=dt(e,oe);const r=document.getElementById("page-content"),t={"/":a=>qi(a,k,e),"/news":a=>Vi(a,k),"/events":a=>rt(a),"/board":a=>it(a,k),"/gallery":a=>tt(a,k),"/programs":a=>at(a,k),"/contact":a=>ct(a,k),"/404":a=>{a.innerHTML=`
        <div class="text-center py-20">
          <h1 class="font-heading text-4xl font-bold text-primary-dark mb-4">Page Not Found</h1>
          <p class="font-body text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href="#/" class="font-body text-primary-blue hover:text-secondary-navy underline">Go Home</a>
        </div>`}};for(const a of oe.programs)for(const c of a.items)c.slug&&!c.link&&!c.scrollTo&&(t[`/programs/${c.slug}`]=s=>lt(s,k,c.slug));new En(t).init(r);const o=document.getElementById("floating-menu-toggle"),l=document.getElementById("floating-mobile-menu");o&&l&&o.addEventListener("click",()=>{l.classList.toggle("hidden")}),ht(),mt(),gt()}function dt(e,n){var c;const r=e.floatingNav.filter(s=>!s.external),t=e.floatingNav.find(s=>s.external),i=r.map(s=>s.label==="Programs"?ft(s,n):s.scrollTo?`<a href="#/" data-scroll-to="${s.scrollTo}" data-nav-link class="nav-link">${s.label}</a>`:`<a href="#${s.path}" data-nav-link class="nav-link">${s.label}</a>`).join(""),o=t?`<a href="${t.path}" target="_blank" rel="noopener noreferrer" class="nav-link-parent">${t.label}</a>`:"",l=pt(e,n),a=e.socials?e.socials.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="${s.platform}">${s.platform}</a>`).join(" | "):"";return`
    <!-- Top Navigation -->
    <nav id="floating-nav" class="site-nav">
      <div class="nav-inner">
        <a href="#/" class="nav-logo">
          <img src="${k}images/logo.png" alt="${e.name}" class="h-8 w-8 object-contain" onerror="this.style.display='none'" />
          <span class="font-body text-white font-bold text-lg">OPC</span>
        </a>
        <div class="nav-center">
          ${i}
        </div>
        <div class="nav-right">
          ${o}
        </div>
        <button id="floating-menu-toggle" class="lg:hidden p-2 text-gray-200 hover:text-white" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div id="floating-mobile-menu" class="hidden lg:hidden border-t border-primary-dark/30">
        ${l}
      </div>
    </nav>

    <!-- Main Content -->
    <main id="page-content" class="flex-1 w-full">
      <div class="text-center py-12">
        <div class="animate-pulse text-gray-400 font-body">Loading...</div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary-dark text-gray-300 mt-auto">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="font-heading font-semibold text-white">${e.name}</p>
            <p class="font-body text-sm">${((c=e.footer)==null?void 0:c.tagline)||""}</p>
          </div>
          ${a?`<div class="font-body text-sm">${a}</div>`:""}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-600 text-center text-sm text-gray-400 font-body">
          &copy; ${new Date().getFullYear()} ${e.name}. All rights reserved.
        </div>
      </div>
    </footer>
  `}function ft(e,n){const r=n.programs.map(t=>{const i=t.items.map(o=>o.link?`<a href="${o.link}" class="dropdown-sub-item">${o.name}</a>`:o.scrollTo?`<a href="#/" data-scroll-to="${o.scrollTo}" class="dropdown-sub-item">${o.name}</a>`:`<a href="#/programs/${o.slug}" class="dropdown-sub-item">${o.name}</a>`).join("");return`
        <div class="dropdown-bucket">
          <div class="dropdown-bucket-label">${t.title}</div>
          <div class="dropdown-sub-menu">
            ${i}
          </div>
        </div>
      `}).join("");return`
    <div class="nav-dropdown-wrapper">
      <a href="#${e.path}" data-nav-link class="nav-link">${e.label}</a>
      <div class="nav-dropdown">
        ${r}
      </div>
    </div>
  `}function pt(e,n){return e.floatingNav.map(r=>{if(r.external)return`<a href="${r.path}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 font-body font-bold text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`;if(r.label==="Programs"){const t=n.programs.map(i=>{const o=i.items.map(l=>l.link?`<a href="${l.link}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`:l.scrollTo?`<a href="#/" data-scroll-to="${l.scrollTo}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`:`<a href="#/programs/${l.slug}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`).join("");return`
              <div class="block px-6 py-1 font-body text-sm text-gray-300">${i.title}</div>
              ${o}
            `}).join("");return`
          <a href="#${r.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>
          ${t}
        `}return r.scrollTo?`<a href="#/" data-scroll-to="${r.scrollTo}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`:`<a href="#${r.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`}).join("")}function ht(){document.addEventListener("click",e=>{const n=e.target.closest("[data-scroll-to]");if(!n)return;e.preventDefault();const r=n.dataset.scrollTo,t=window.location.hash||"#/",i=t==="#/"||t==="#"||t==="",o=document.getElementById("floating-mobile-menu");o&&o.classList.add("hidden"),i?de(r):(window.location.hash="#/",setTimeout(()=>de(r),400))})}function mt(){const e={"#/about":"about-section"};window.addEventListener("hashchange",()=>{const n=window.location.hash,r=e[n];r&&(window.location.hash="#/",setTimeout(()=>de(r),400))})}function de(e){var r;const n=document.getElementById(e);if(n){const t=((r=document.getElementById("floating-nav"))==null?void 0:r.offsetHeight)||0,i=n.getBoundingClientRect().top+window.scrollY-t-16;window.scrollTo({top:i,behavior:"smooth"})}}function gt(){const e=document.getElementById("floating-nav");if(!e)return;let n=!1;function r(){window.scrollY>10?e.classList.add("nav-scrolled"):e.classList.remove("nav-scrolled"),n=!1}window.addEventListener("scroll",()=>{n||(requestAnimationFrame(r),n=!0)}),r()}ut();
