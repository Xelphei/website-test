(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();class Ln{constructor(n){this.routes=n,this.contentEl=null,this.isTransitioning=!1}init(n){this.contentEl=n,window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}async resolve(){if(this.isTransitioning)return;this.isTransitioning=!0;const n=window.location.hash||"#/",r=n.replace("#","")||"/",t=this.routes[r]||this.routes["/404"];this.contentEl.classList.add("page-fade-out"),await new Promise(i=>setTimeout(i,300)),this.updateNavState(n),this.closeMobileMenu(),t&&await t(this.contentEl),this.contentEl.classList.remove("page-fade-out"),this.contentEl.classList.add("page-fade-in"),await new Promise(i=>setTimeout(i,300)),this.contentEl.classList.remove("page-fade-in"),this.isTransitioning=!1,window.scrollTo(0,0)}updateNavState(n){document.querySelectorAll("[data-nav-link]").forEach(r=>{const t=r.getAttribute("href");t===n||n===""&&t==="#/"?(r.classList.add("text-white","font-semibold"),r.classList.remove("text-gray-200")):(r.classList.remove("text-white","font-semibold"),r.classList.add("text-gray-200"))})}closeMobileMenu(){const n=document.getElementById("floating-mobile-menu");n&&n.classList.add("hidden")}navigate(n){window.location.hash=n}}/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function He(e){return typeof e>"u"||e===null}function kn(e){return typeof e=="object"&&e!==null}function $n(e){return Array.isArray(e)?e:He(e)?[]:[e]}function Tn(e,n){var r,t,i,o;if(n)for(o=Object.keys(n),r=0,t=o.length;r<t;r+=1)i=o[r],e[i]=n[i];return e}function Sn(e,n){var r="",t;for(t=0;t<n;t+=1)r+=e;return r}function _n(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var Fn=He,In=kn,Mn=$n,On=Sn,Nn=_n,Hn=Tn,w={isNothing:Fn,isObject:In,toArray:Mn,repeat:On,isNegativeZero:Nn,extend:Hn};function De(e,n){var r="",t=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(r+='in "'+e.mark.name+'" '),r+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!n&&e.mark.snippet&&(r+=`

`+e.mark.snippet),t+" "+r):t}function U(e,n){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=n,this.message=De(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}U.prototype=Object.create(Error.prototype);U.prototype.constructor=U;U.prototype.toString=function(n){return this.name+": "+De(this,n)};var C=U;function ne(e,n,r,t,i){var o="",l="",a=Math.floor(i/2)-1;return t-n>a&&(o=" ... ",n=t-a+o.length),r-t>a&&(l=" ...",r=t+a-l.length),{str:o+e.slice(n,r).replace(/\t/g,"→")+l,pos:t-n+o.length}}function re(e,n){return w.repeat(" ",n-e.length)+e}function Dn(e,n){if(n=Object.create(n||null),!e.buffer)return null;n.maxLength||(n.maxLength=79),typeof n.indent!="number"&&(n.indent=1),typeof n.linesBefore!="number"&&(n.linesBefore=3),typeof n.linesAfter!="number"&&(n.linesAfter=2);for(var r=/\r?\n|\r|\0/g,t=[0],i=[],o,l=-1;o=r.exec(e.buffer);)i.push(o.index),t.push(o.index+o[0].length),e.position<=o.index&&l<0&&(l=t.length-2);l<0&&(l=t.length-1);var a="",c,s,u=Math.min(e.line+n.linesAfter,i.length).toString().length,d=n.maxLength-(n.indent+u+3);for(c=1;c<=n.linesBefore&&!(l-c<0);c++)s=ne(e.buffer,t[l-c],i[l-c],e.position-(t[l]-t[l-c]),d),a=w.repeat(" ",n.indent)+re((e.line-c+1).toString(),u)+" | "+s.str+`
`+a;for(s=ne(e.buffer,t[l],i[l],e.position,d),a+=w.repeat(" ",n.indent)+re((e.line+1).toString(),u)+" | "+s.str+`
`,a+=w.repeat("-",n.indent+u+3+s.pos)+`^
`,c=1;c<=n.linesAfter&&!(l+c>=i.length);c++)s=ne(e.buffer,t[l+c],i[l+c],e.position-(t[l]-t[l+c]),d),a+=w.repeat(" ",n.indent)+re((e.line+c+1).toString(),u)+" | "+s.str+`
`;return a.replace(/\n$/,"")}var Bn=Dn,Rn=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],jn=["scalar","sequence","mapping"];function Pn(e){var n={};return e!==null&&Object.keys(e).forEach(function(r){e[r].forEach(function(t){n[String(t)]=r})}),n}function Yn(e,n){if(n=n||{},Object.keys(n).forEach(function(r){if(Rn.indexOf(r)===-1)throw new C('Unknown option "'+r+'" is met in definition of "'+e+'" YAML type.')}),this.options=n,this.tag=e,this.kind=n.kind||null,this.resolve=n.resolve||function(){return!0},this.construct=n.construct||function(r){return r},this.instanceOf=n.instanceOf||null,this.predicate=n.predicate||null,this.represent=n.represent||null,this.representName=n.representName||null,this.defaultStyle=n.defaultStyle||null,this.multi=n.multi||!1,this.styleAliases=Pn(n.styleAliases||null),jn.indexOf(this.kind)===-1)throw new C('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var A=Yn;function ye(e,n){var r=[];return e[n].forEach(function(t){var i=r.length;r.forEach(function(o,l){o.tag===t.tag&&o.kind===t.kind&&o.multi===t.multi&&(i=l)}),r[i]=t}),r}function qn(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},n,r;function t(i){i.multi?(e.multi[i.kind].push(i),e.multi.fallback.push(i)):e[i.kind][i.tag]=e.fallback[i.tag]=i}for(n=0,r=arguments.length;n<r;n+=1)arguments[n].forEach(t);return e}function ae(e){return this.extend(e)}ae.prototype.extend=function(n){var r=[],t=[];if(n instanceof A)t.push(n);else if(Array.isArray(n))t=t.concat(n);else if(n&&(Array.isArray(n.implicit)||Array.isArray(n.explicit)))n.implicit&&(r=r.concat(n.implicit)),n.explicit&&(t=t.concat(n.explicit));else throw new C("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.forEach(function(o){if(!(o instanceof A))throw new C("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new C("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new C("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),t.forEach(function(o){if(!(o instanceof A))throw new C("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var i=Object.create(ae.prototype);return i.implicit=(this.implicit||[]).concat(r),i.explicit=(this.explicit||[]).concat(t),i.compiledImplicit=ye(i,"implicit"),i.compiledExplicit=ye(i,"explicit"),i.compiledTypeMap=qn(i.compiledImplicit,i.compiledExplicit),i};var Be=ae,Re=new A("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),je=new A("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),Pe=new A("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),Ye=new Be({explicit:[Re,je,Pe]});function Un(e){if(e===null)return!0;var n=e.length;return n===1&&e==="~"||n===4&&(e==="null"||e==="Null"||e==="NULL")}function Gn(){return null}function Kn(e){return e===null}var qe=new A("tag:yaml.org,2002:null",{kind:"scalar",resolve:Un,construct:Gn,predicate:Kn,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Wn(e){if(e===null)return!1;var n=e.length;return n===4&&(e==="true"||e==="True"||e==="TRUE")||n===5&&(e==="false"||e==="False"||e==="FALSE")}function Vn(e){return e==="true"||e==="True"||e==="TRUE"}function Qn(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var Ue=new A("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Wn,construct:Vn,predicate:Qn,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function zn(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Xn(e){return 48<=e&&e<=55}function Zn(e){return 48<=e&&e<=57}function Jn(e){if(e===null)return!1;var n=e.length,r=0,t=!1,i;if(!n)return!1;if(i=e[r],(i==="-"||i==="+")&&(i=e[++r]),i==="0"){if(r+1===n)return!0;if(i=e[++r],i==="b"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(i!=="0"&&i!=="1")return!1;t=!0}return t&&i!=="_"}if(i==="x"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!zn(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}if(i==="o"){for(r++;r<n;r++)if(i=e[r],i!=="_"){if(!Xn(e.charCodeAt(r)))return!1;t=!0}return t&&i!=="_"}}if(i==="_")return!1;for(;r<n;r++)if(i=e[r],i!=="_"){if(!Zn(e.charCodeAt(r)))return!1;t=!0}return!(!t||i==="_")}function er(e){var n=e,r=1,t;if(n.indexOf("_")!==-1&&(n=n.replace(/_/g,"")),t=n[0],(t==="-"||t==="+")&&(t==="-"&&(r=-1),n=n.slice(1),t=n[0]),n==="0")return 0;if(t==="0"){if(n[1]==="b")return r*parseInt(n.slice(2),2);if(n[1]==="x")return r*parseInt(n.slice(2),16);if(n[1]==="o")return r*parseInt(n.slice(2),8)}return r*parseInt(n,10)}function nr(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!w.isNegativeZero(e)}var Ge=new A("tag:yaml.org,2002:int",{kind:"scalar",resolve:Jn,construct:er,predicate:nr,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),rr=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function ir(e){return!(e===null||!rr.test(e)||e[e.length-1]==="_")}function tr(e){var n,r;return n=e.replace(/_/g,"").toLowerCase(),r=n[0]==="-"?-1:1,"+-".indexOf(n[0])>=0&&(n=n.slice(1)),n===".inf"?r===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:n===".nan"?NaN:r*parseFloat(n,10)}var or=/^[-+]?[0-9]+e/;function lr(e,n){var r;if(isNaN(e))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(w.isNegativeZero(e))return"-0.0";return r=e.toString(10),or.test(r)?r.replace("e",".e"):r}function ar(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||w.isNegativeZero(e))}var Ke=new A("tag:yaml.org,2002:float",{kind:"scalar",resolve:ir,construct:tr,predicate:ar,represent:lr,defaultStyle:"lowercase"}),We=Ye.extend({implicit:[qe,Ue,Ge,Ke]}),Ve=We,Qe=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),ze=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function cr(e){return e===null?!1:Qe.exec(e)!==null||ze.exec(e)!==null}function sr(e){var n,r,t,i,o,l,a,c=0,s=null,u,d,f;if(n=Qe.exec(e),n===null&&(n=ze.exec(e)),n===null)throw new Error("Date resolve error");if(r=+n[1],t=+n[2]-1,i=+n[3],!n[4])return new Date(Date.UTC(r,t,i));if(o=+n[4],l=+n[5],a=+n[6],n[7]){for(c=n[7].slice(0,3);c.length<3;)c+="0";c=+c}return n[9]&&(u=+n[10],d=+(n[11]||0),s=(u*60+d)*6e4,n[9]==="-"&&(s=-s)),f=new Date(Date.UTC(r,t,i,o,l,a,c)),s&&f.setTime(f.getTime()-s),f}function dr(e){return e.toISOString()}var Xe=new A("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:cr,construct:sr,instanceOf:Date,represent:dr});function ur(e){return e==="<<"||e===null}var Ze=new A("tag:yaml.org,2002:merge",{kind:"scalar",resolve:ur}),pe=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function fr(e){if(e===null)return!1;var n,r,t=0,i=e.length,o=pe;for(r=0;r<i;r++)if(n=o.indexOf(e.charAt(r)),!(n>64)){if(n<0)return!1;t+=6}return t%8===0}function pr(e){var n,r,t=e.replace(/[\r\n=]/g,""),i=t.length,o=pe,l=0,a=[];for(n=0;n<i;n++)n%4===0&&n&&(a.push(l>>16&255),a.push(l>>8&255),a.push(l&255)),l=l<<6|o.indexOf(t.charAt(n));return r=i%4*6,r===0?(a.push(l>>16&255),a.push(l>>8&255),a.push(l&255)):r===18?(a.push(l>>10&255),a.push(l>>2&255)):r===12&&a.push(l>>4&255),new Uint8Array(a)}function mr(e){var n="",r=0,t,i,o=e.length,l=pe;for(t=0;t<o;t++)t%3===0&&t&&(n+=l[r>>18&63],n+=l[r>>12&63],n+=l[r>>6&63],n+=l[r&63]),r=(r<<8)+e[t];return i=o%3,i===0?(n+=l[r>>18&63],n+=l[r>>12&63],n+=l[r>>6&63],n+=l[r&63]):i===2?(n+=l[r>>10&63],n+=l[r>>4&63],n+=l[r<<2&63],n+=l[64]):i===1&&(n+=l[r>>2&63],n+=l[r<<4&63],n+=l[64],n+=l[64]),n}function hr(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var Je=new A("tag:yaml.org,2002:binary",{kind:"scalar",resolve:fr,construct:pr,predicate:hr,represent:mr}),gr=Object.prototype.hasOwnProperty,xr=Object.prototype.toString;function vr(e){if(e===null)return!0;var n=[],r,t,i,o,l,a=e;for(r=0,t=a.length;r<t;r+=1){if(i=a[r],l=!1,xr.call(i)!=="[object Object]")return!1;for(o in i)if(gr.call(i,o))if(!l)l=!0;else return!1;if(!l)return!1;if(n.indexOf(o)===-1)n.push(o);else return!1}return!0}function yr(e){return e!==null?e:[]}var en=new A("tag:yaml.org,2002:omap",{kind:"sequence",resolve:vr,construct:yr}),br=Object.prototype.toString;function wr(e){if(e===null)return!0;var n,r,t,i,o,l=e;for(o=new Array(l.length),n=0,r=l.length;n<r;n+=1){if(t=l[n],br.call(t)!=="[object Object]"||(i=Object.keys(t),i.length!==1))return!1;o[n]=[i[0],t[i[0]]]}return!0}function Ar(e){if(e===null)return[];var n,r,t,i,o,l=e;for(o=new Array(l.length),n=0,r=l.length;n<r;n+=1)t=l[n],i=Object.keys(t),o[n]=[i[0],t[i[0]]];return o}var nn=new A("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:wr,construct:Ar}),Er=Object.prototype.hasOwnProperty;function Cr(e){if(e===null)return!0;var n,r=e;for(n in r)if(Er.call(r,n)&&r[n]!==null)return!1;return!0}function Lr(e){return e!==null?e:{}}var rn=new A("tag:yaml.org,2002:set",{kind:"mapping",resolve:Cr,construct:Lr}),me=Ve.extend({implicit:[Xe,Ze],explicit:[Je,en,nn,rn]}),I=Object.prototype.hasOwnProperty,V=1,tn=2,on=3,Q=4,ie=1,kr=2,be=3,$r=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Tr=/[\x85\u2028\u2029]/,Sr=/[,\[\]\{\}]/,ln=/^(?:!|!!|![a-z\-]+!)$/i,an=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function we(e){return Object.prototype.toString.call(e)}function T(e){return e===10||e===13}function N(e){return e===9||e===32}function L(e){return e===9||e===32||e===10||e===13}function R(e){return e===44||e===91||e===93||e===123||e===125}function _r(e){var n;return 48<=e&&e<=57?e-48:(n=e|32,97<=n&&n<=102?n-97+10:-1)}function Fr(e){return e===120?2:e===117?4:e===85?8:0}function Ir(e){return 48<=e&&e<=57?e-48:-1}function Ae(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function Mr(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function cn(e,n,r){n==="__proto__"?Object.defineProperty(e,n,{configurable:!0,enumerable:!0,writable:!0,value:r}):e[n]=r}var sn=new Array(256),dn=new Array(256);for(var H=0;H<256;H++)sn[H]=Ae(H)?1:0,dn[H]=Ae(H);function Or(e,n){this.input=e,this.filename=n.filename||null,this.schema=n.schema||me,this.onWarning=n.onWarning||null,this.legacy=n.legacy||!1,this.json=n.json||!1,this.listener=n.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function un(e,n){var r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=Bn(r),new C(n,r)}function p(e,n){throw un(e,n)}function z(e,n){e.onWarning&&e.onWarning.call(null,un(e,n))}var Ee={YAML:function(n,r,t){var i,o,l;n.version!==null&&p(n,"duplication of %YAML directive"),t.length!==1&&p(n,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(t[0]),i===null&&p(n,"ill-formed argument of the YAML directive"),o=parseInt(i[1],10),l=parseInt(i[2],10),o!==1&&p(n,"unacceptable YAML version of the document"),n.version=t[0],n.checkLineBreaks=l<2,l!==1&&l!==2&&z(n,"unsupported YAML version of the document")},TAG:function(n,r,t){var i,o;t.length!==2&&p(n,"TAG directive accepts exactly two arguments"),i=t[0],o=t[1],ln.test(i)||p(n,"ill-formed tag handle (first argument) of the TAG directive"),I.call(n.tagMap,i)&&p(n,'there is a previously declared suffix for "'+i+'" tag handle'),an.test(o)||p(n,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{p(n,"tag prefix is malformed: "+o)}n.tagMap[i]=o}};function F(e,n,r,t){var i,o,l,a;if(n<r){if(a=e.input.slice(n,r),t)for(i=0,o=a.length;i<o;i+=1)l=a.charCodeAt(i),l===9||32<=l&&l<=1114111||p(e,"expected valid JSON character");else $r.test(a)&&p(e,"the stream contains non-printable characters");e.result+=a}}function Ce(e,n,r,t){var i,o,l,a;for(w.isObject(r)||p(e,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(r),l=0,a=i.length;l<a;l+=1)o=i[l],I.call(n,o)||(cn(n,o,r[o]),t[o]=!0)}function j(e,n,r,t,i,o,l,a,c){var s,u;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),s=0,u=i.length;s<u;s+=1)Array.isArray(i[s])&&p(e,"nested arrays are not supported inside keys"),typeof i=="object"&&we(i[s])==="[object Object]"&&(i[s]="[object Object]");if(typeof i=="object"&&we(i)==="[object Object]"&&(i="[object Object]"),i=String(i),n===null&&(n={}),t==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(s=0,u=o.length;s<u;s+=1)Ce(e,n,o[s],r);else Ce(e,n,o,r);else!e.json&&!I.call(r,i)&&I.call(n,i)&&(e.line=l||e.line,e.lineStart=a||e.lineStart,e.position=c||e.position,p(e,"duplicated mapping key")),cn(n,i,o),delete r[i];return n}function he(e){var n;n=e.input.charCodeAt(e.position),n===10?e.position++:n===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):p(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function b(e,n,r){for(var t=0,i=e.input.charCodeAt(e.position);i!==0;){for(;N(i);)i===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(n&&i===35)do i=e.input.charCodeAt(++e.position);while(i!==10&&i!==13&&i!==0);if(T(i))for(he(e),i=e.input.charCodeAt(e.position),t++,e.lineIndent=0;i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position);else break}return r!==-1&&t!==0&&e.lineIndent<r&&z(e,"deficient indentation"),t}function ee(e){var n=e.position,r;return r=e.input.charCodeAt(n),!!((r===45||r===46)&&r===e.input.charCodeAt(n+1)&&r===e.input.charCodeAt(n+2)&&(n+=3,r=e.input.charCodeAt(n),r===0||L(r)))}function ge(e,n){n===1?e.result+=" ":n>1&&(e.result+=w.repeat(`
`,n-1))}function Nr(e,n,r){var t,i,o,l,a,c,s,u,d=e.kind,f=e.result,m;if(m=e.input.charCodeAt(e.position),L(m)||R(m)||m===35||m===38||m===42||m===33||m===124||m===62||m===39||m===34||m===37||m===64||m===96||(m===63||m===45)&&(i=e.input.charCodeAt(e.position+1),L(i)||r&&R(i)))return!1;for(e.kind="scalar",e.result="",o=l=e.position,a=!1;m!==0;){if(m===58){if(i=e.input.charCodeAt(e.position+1),L(i)||r&&R(i))break}else if(m===35){if(t=e.input.charCodeAt(e.position-1),L(t))break}else{if(e.position===e.lineStart&&ee(e)||r&&R(m))break;if(T(m))if(c=e.line,s=e.lineStart,u=e.lineIndent,b(e,!1,-1),e.lineIndent>=n){a=!0,m=e.input.charCodeAt(e.position);continue}else{e.position=l,e.line=c,e.lineStart=s,e.lineIndent=u;break}}a&&(F(e,o,l,!1),ge(e,e.line-c),o=l=e.position,a=!1),N(m)||(l=e.position+1),m=e.input.charCodeAt(++e.position)}return F(e,o,l,!1),e.result?!0:(e.kind=d,e.result=f,!1)}function Hr(e,n){var r,t,i;if(r=e.input.charCodeAt(e.position),r!==39)return!1;for(e.kind="scalar",e.result="",e.position++,t=i=e.position;(r=e.input.charCodeAt(e.position))!==0;)if(r===39)if(F(e,t,e.position,!0),r=e.input.charCodeAt(++e.position),r===39)t=e.position,e.position++,i=e.position;else return!0;else T(r)?(F(e,t,i,!0),ge(e,b(e,!1,n)),t=i=e.position):e.position===e.lineStart&&ee(e)?p(e,"unexpected end of the document within a single quoted scalar"):(e.position++,i=e.position);p(e,"unexpected end of the stream within a single quoted scalar")}function Dr(e,n){var r,t,i,o,l,a;if(a=e.input.charCodeAt(e.position),a!==34)return!1;for(e.kind="scalar",e.result="",e.position++,r=t=e.position;(a=e.input.charCodeAt(e.position))!==0;){if(a===34)return F(e,r,e.position,!0),e.position++,!0;if(a===92){if(F(e,r,e.position,!0),a=e.input.charCodeAt(++e.position),T(a))b(e,!1,n);else if(a<256&&sn[a])e.result+=dn[a],e.position++;else if((l=Fr(a))>0){for(i=l,o=0;i>0;i--)a=e.input.charCodeAt(++e.position),(l=_r(a))>=0?o=(o<<4)+l:p(e,"expected hexadecimal character");e.result+=Mr(o),e.position++}else p(e,"unknown escape sequence");r=t=e.position}else T(a)?(F(e,r,t,!0),ge(e,b(e,!1,n)),r=t=e.position):e.position===e.lineStart&&ee(e)?p(e,"unexpected end of the document within a double quoted scalar"):(e.position++,t=e.position)}p(e,"unexpected end of the stream within a double quoted scalar")}function Br(e,n){var r=!0,t,i,o,l=e.tag,a,c=e.anchor,s,u,d,f,m,h=Object.create(null),g,y,k,x;if(x=e.input.charCodeAt(e.position),x===91)u=93,m=!1,a=[];else if(x===123)u=125,m=!0,a={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),x=e.input.charCodeAt(++e.position);x!==0;){if(b(e,!0,n),x=e.input.charCodeAt(e.position),x===u)return e.position++,e.tag=l,e.anchor=c,e.kind=m?"mapping":"sequence",e.result=a,!0;r?x===44&&p(e,"expected the node content, but found ','"):p(e,"missed comma between flow collection entries"),y=g=k=null,d=f=!1,x===63&&(s=e.input.charCodeAt(e.position+1),L(s)&&(d=f=!0,e.position++,b(e,!0,n))),t=e.line,i=e.lineStart,o=e.position,P(e,n,V,!1,!0),y=e.tag,g=e.result,b(e,!0,n),x=e.input.charCodeAt(e.position),(f||e.line===t)&&x===58&&(d=!0,x=e.input.charCodeAt(++e.position),b(e,!0,n),P(e,n,V,!1,!0),k=e.result),m?j(e,a,h,y,g,k,t,i,o):d?a.push(j(e,null,h,y,g,k,t,i,o)):a.push(g),b(e,!0,n),x=e.input.charCodeAt(e.position),x===44?(r=!0,x=e.input.charCodeAt(++e.position)):r=!1}p(e,"unexpected end of the stream within a flow collection")}function Rr(e,n){var r,t,i=ie,o=!1,l=!1,a=n,c=0,s=!1,u,d;if(d=e.input.charCodeAt(e.position),d===124)t=!1;else if(d===62)t=!0;else return!1;for(e.kind="scalar",e.result="";d!==0;)if(d=e.input.charCodeAt(++e.position),d===43||d===45)ie===i?i=d===43?be:kr:p(e,"repeat of a chomping mode identifier");else if((u=Ir(d))>=0)u===0?p(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?p(e,"repeat of an indentation width identifier"):(a=n+u-1,l=!0);else break;if(N(d)){do d=e.input.charCodeAt(++e.position);while(N(d));if(d===35)do d=e.input.charCodeAt(++e.position);while(!T(d)&&d!==0)}for(;d!==0;){for(he(e),e.lineIndent=0,d=e.input.charCodeAt(e.position);(!l||e.lineIndent<a)&&d===32;)e.lineIndent++,d=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>a&&(a=e.lineIndent),T(d)){c++;continue}if(e.lineIndent<a){i===be?e.result+=w.repeat(`
`,o?1+c:c):i===ie&&o&&(e.result+=`
`);break}for(t?N(d)?(s=!0,e.result+=w.repeat(`
`,o?1+c:c)):s?(s=!1,e.result+=w.repeat(`
`,c+1)):c===0?o&&(e.result+=" "):e.result+=w.repeat(`
`,c):e.result+=w.repeat(`
`,o?1+c:c),o=!0,l=!0,c=0,r=e.position;!T(d)&&d!==0;)d=e.input.charCodeAt(++e.position);F(e,r,e.position,!1)}return!0}function Le(e,n){var r,t=e.tag,i=e.anchor,o=[],l,a=!1,c;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),c=e.input.charCodeAt(e.position);c!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,p(e,"tab characters must not be used in indentation")),!(c!==45||(l=e.input.charCodeAt(e.position+1),!L(l))));){if(a=!0,e.position++,b(e,!0,-1)&&e.lineIndent<=n){o.push(null),c=e.input.charCodeAt(e.position);continue}if(r=e.line,P(e,n,on,!1,!0),o.push(e.result),b(e,!0,-1),c=e.input.charCodeAt(e.position),(e.line===r||e.lineIndent>n)&&c!==0)p(e,"bad indentation of a sequence entry");else if(e.lineIndent<n)break}return a?(e.tag=t,e.anchor=i,e.kind="sequence",e.result=o,!0):!1}function jr(e,n,r){var t,i,o,l,a,c,s=e.tag,u=e.anchor,d={},f=Object.create(null),m=null,h=null,g=null,y=!1,k=!1,x;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=d),x=e.input.charCodeAt(e.position);x!==0;){if(!y&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,p(e,"tab characters must not be used in indentation")),t=e.input.charCodeAt(e.position+1),o=e.line,(x===63||x===58)&&L(t))x===63?(y&&(j(e,d,f,m,h,null,l,a,c),m=h=g=null),k=!0,y=!0,i=!0):y?(y=!1,i=!0):p(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,x=t;else{if(l=e.line,a=e.lineStart,c=e.position,!P(e,r,tn,!1,!0))break;if(e.line===o){for(x=e.input.charCodeAt(e.position);N(x);)x=e.input.charCodeAt(++e.position);if(x===58)x=e.input.charCodeAt(++e.position),L(x)||p(e,"a whitespace character is expected after the key-value separator within a block mapping"),y&&(j(e,d,f,m,h,null,l,a,c),m=h=g=null),k=!0,y=!1,i=!1,m=e.tag,h=e.result;else if(k)p(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=s,e.anchor=u,!0}else if(k)p(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=s,e.anchor=u,!0}if((e.line===o||e.lineIndent>n)&&(y&&(l=e.line,a=e.lineStart,c=e.position),P(e,n,Q,!0,i)&&(y?h=e.result:g=e.result),y||(j(e,d,f,m,h,g,l,a,c),m=h=g=null),b(e,!0,-1),x=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>n)&&x!==0)p(e,"bad indentation of a mapping entry");else if(e.lineIndent<n)break}return y&&j(e,d,f,m,h,null,l,a,c),k&&(e.tag=s,e.anchor=u,e.kind="mapping",e.result=d),k}function Pr(e){var n,r=!1,t=!1,i,o,l;if(l=e.input.charCodeAt(e.position),l!==33)return!1;if(e.tag!==null&&p(e,"duplication of a tag property"),l=e.input.charCodeAt(++e.position),l===60?(r=!0,l=e.input.charCodeAt(++e.position)):l===33?(t=!0,i="!!",l=e.input.charCodeAt(++e.position)):i="!",n=e.position,r){do l=e.input.charCodeAt(++e.position);while(l!==0&&l!==62);e.position<e.length?(o=e.input.slice(n,e.position),l=e.input.charCodeAt(++e.position)):p(e,"unexpected end of the stream within a verbatim tag")}else{for(;l!==0&&!L(l);)l===33&&(t?p(e,"tag suffix cannot contain exclamation marks"):(i=e.input.slice(n-1,e.position+1),ln.test(i)||p(e,"named tag handle cannot contain such characters"),t=!0,n=e.position+1)),l=e.input.charCodeAt(++e.position);o=e.input.slice(n,e.position),Sr.test(o)&&p(e,"tag suffix cannot contain flow indicator characters")}o&&!an.test(o)&&p(e,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{p(e,"tag name is malformed: "+o)}return r?e.tag=o:I.call(e.tagMap,i)?e.tag=e.tagMap[i]+o:i==="!"?e.tag="!"+o:i==="!!"?e.tag="tag:yaml.org,2002:"+o:p(e,'undeclared tag handle "'+i+'"'),!0}function Yr(e){var n,r;if(r=e.input.charCodeAt(e.position),r!==38)return!1;for(e.anchor!==null&&p(e,"duplication of an anchor property"),r=e.input.charCodeAt(++e.position),n=e.position;r!==0&&!L(r)&&!R(r);)r=e.input.charCodeAt(++e.position);return e.position===n&&p(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function qr(e){var n,r,t;if(t=e.input.charCodeAt(e.position),t!==42)return!1;for(t=e.input.charCodeAt(++e.position),n=e.position;t!==0&&!L(t)&&!R(t);)t=e.input.charCodeAt(++e.position);return e.position===n&&p(e,"name of an alias node must contain at least one character"),r=e.input.slice(n,e.position),I.call(e.anchorMap,r)||p(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],b(e,!0,-1),!0}function P(e,n,r,t,i){var o,l,a,c=1,s=!1,u=!1,d,f,m,h,g,y;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=l=a=Q===r||on===r,t&&b(e,!0,-1)&&(s=!0,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)),c===1)for(;Pr(e)||Yr(e);)b(e,!0,-1)?(s=!0,a=o,e.lineIndent>n?c=1:e.lineIndent===n?c=0:e.lineIndent<n&&(c=-1)):a=!1;if(a&&(a=s||i),(c===1||Q===r)&&(V===r||tn===r?g=n:g=n+1,y=e.position-e.lineStart,c===1?a&&(Le(e,y)||jr(e,y,g))||Br(e,g)?u=!0:(l&&Rr(e,g)||Hr(e,g)||Dr(e,g)?u=!0:qr(e)?(u=!0,(e.tag!==null||e.anchor!==null)&&p(e,"alias node should not have any properties")):Nr(e,g,V===r)&&(u=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):c===0&&(u=a&&Le(e,y))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&p(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),d=0,f=e.implicitTypes.length;d<f;d+=1)if(h=e.implicitTypes[d],h.resolve(e.result)){e.result=h.construct(e.result),e.tag=h.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(I.call(e.typeMap[e.kind||"fallback"],e.tag))h=e.typeMap[e.kind||"fallback"][e.tag];else for(h=null,m=e.typeMap.multi[e.kind||"fallback"],d=0,f=m.length;d<f;d+=1)if(e.tag.slice(0,m[d].tag.length)===m[d].tag){h=m[d];break}h||p(e,"unknown tag !<"+e.tag+">"),e.result!==null&&h.kind!==e.kind&&p(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+h.kind+'", not "'+e.kind+'"'),h.resolve(e.result,e.tag)?(e.result=h.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):p(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||u}function Ur(e){var n=e.position,r,t,i,o=!1,l;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(l=e.input.charCodeAt(e.position))!==0&&(b(e,!0,-1),l=e.input.charCodeAt(e.position),!(e.lineIndent>0||l!==37));){for(o=!0,l=e.input.charCodeAt(++e.position),r=e.position;l!==0&&!L(l);)l=e.input.charCodeAt(++e.position);for(t=e.input.slice(r,e.position),i=[],t.length<1&&p(e,"directive name must not be less than one character in length");l!==0;){for(;N(l);)l=e.input.charCodeAt(++e.position);if(l===35){do l=e.input.charCodeAt(++e.position);while(l!==0&&!T(l));break}if(T(l))break;for(r=e.position;l!==0&&!L(l);)l=e.input.charCodeAt(++e.position);i.push(e.input.slice(r,e.position))}l!==0&&he(e),I.call(Ee,t)?Ee[t](e,t,i):z(e,'unknown document directive "'+t+'"')}if(b(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,b(e,!0,-1)):o&&p(e,"directives end mark is expected"),P(e,e.lineIndent-1,Q,!1,!0),b(e,!0,-1),e.checkLineBreaks&&Tr.test(e.input.slice(n,e.position))&&z(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&ee(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,b(e,!0,-1));return}if(e.position<e.length-1)p(e,"end of the stream or a document separator is expected");else return}function fn(e,n){e=String(e),n=n||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var r=new Or(e,n),t=e.indexOf("\0");for(t!==-1&&(r.position=t,p(r,"null byte is not allowed in input")),r.input+="\0";r.input.charCodeAt(r.position)===32;)r.lineIndent+=1,r.position+=1;for(;r.position<r.length-1;)Ur(r);return r.documents}function Gr(e,n,r){n!==null&&typeof n=="object"&&typeof r>"u"&&(r=n,n=null);var t=fn(e,r);if(typeof n!="function")return t;for(var i=0,o=t.length;i<o;i+=1)n(t[i])}function Kr(e,n){var r=fn(e,n);if(r.length!==0){if(r.length===1)return r[0];throw new C("expected a single document in the stream, but found more")}}var Wr=Gr,Vr=Kr,pn={loadAll:Wr,load:Vr},mn=Object.prototype.toString,hn=Object.prototype.hasOwnProperty,xe=65279,Qr=9,G=10,zr=13,Xr=32,Zr=33,Jr=34,ce=35,ei=37,ni=38,ri=39,ii=42,gn=44,ti=45,X=58,oi=61,li=62,ai=63,ci=64,xn=91,vn=93,si=96,yn=123,di=124,bn=125,E={};E[0]="\\0";E[7]="\\a";E[8]="\\b";E[9]="\\t";E[10]="\\n";E[11]="\\v";E[12]="\\f";E[13]="\\r";E[27]="\\e";E[34]='\\"';E[92]="\\\\";E[133]="\\N";E[160]="\\_";E[8232]="\\L";E[8233]="\\P";var ui=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],fi=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function pi(e,n){var r,t,i,o,l,a,c;if(n===null)return{};for(r={},t=Object.keys(n),i=0,o=t.length;i<o;i+=1)l=t[i],a=String(n[l]),l.slice(0,2)==="!!"&&(l="tag:yaml.org,2002:"+l.slice(2)),c=e.compiledTypeMap.fallback[l],c&&hn.call(c.styleAliases,a)&&(a=c.styleAliases[a]),r[l]=a;return r}function mi(e){var n,r,t;if(n=e.toString(16).toUpperCase(),e<=255)r="x",t=2;else if(e<=65535)r="u",t=4;else if(e<=4294967295)r="U",t=8;else throw new C("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+r+w.repeat("0",t-n.length)+n}var hi=1,K=2;function gi(e){this.schema=e.schema||me,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=w.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=pi(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?K:hi,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function ke(e,n){for(var r=w.repeat(" ",n),t=0,i=-1,o="",l,a=e.length;t<a;)i=e.indexOf(`
`,t),i===-1?(l=e.slice(t),t=a):(l=e.slice(t,i+1),t=i+1),l.length&&l!==`
`&&(o+=r),o+=l;return o}function se(e,n){return`
`+w.repeat(" ",e.indent*n)}function xi(e,n){var r,t,i;for(r=0,t=e.implicitTypes.length;r<t;r+=1)if(i=e.implicitTypes[r],i.resolve(n))return!0;return!1}function Z(e){return e===Xr||e===Qr}function W(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==xe||65536<=e&&e<=1114111}function $e(e){return W(e)&&e!==xe&&e!==zr&&e!==G}function Te(e,n,r){var t=$e(e),i=t&&!Z(e);return(r?t:t&&e!==gn&&e!==xn&&e!==vn&&e!==yn&&e!==bn)&&e!==ce&&!(n===X&&!i)||$e(n)&&!Z(n)&&e===ce||n===X&&i}function vi(e){return W(e)&&e!==xe&&!Z(e)&&e!==ti&&e!==ai&&e!==X&&e!==gn&&e!==xn&&e!==vn&&e!==yn&&e!==bn&&e!==ce&&e!==ni&&e!==ii&&e!==Zr&&e!==di&&e!==oi&&e!==li&&e!==ri&&e!==Jr&&e!==ei&&e!==ci&&e!==si}function yi(e){return!Z(e)&&e!==X}function Y(e,n){var r=e.charCodeAt(n),t;return r>=55296&&r<=56319&&n+1<e.length&&(t=e.charCodeAt(n+1),t>=56320&&t<=57343)?(r-55296)*1024+t-56320+65536:r}function wn(e){var n=/^\n* /;return n.test(e)}var An=1,de=2,En=3,Cn=4,B=5;function bi(e,n,r,t,i,o,l,a){var c,s=0,u=null,d=!1,f=!1,m=t!==-1,h=-1,g=vi(Y(e,0))&&yi(Y(e,e.length-1));if(n||l)for(c=0;c<e.length;s>=65536?c+=2:c++){if(s=Y(e,c),!W(s))return B;g=g&&Te(s,u,a),u=s}else{for(c=0;c<e.length;s>=65536?c+=2:c++){if(s=Y(e,c),s===G)d=!0,m&&(f=f||c-h-1>t&&e[h+1]!==" ",h=c);else if(!W(s))return B;g=g&&Te(s,u,a),u=s}f=f||m&&c-h-1>t&&e[h+1]!==" "}return!d&&!f?g&&!l&&!i(e)?An:o===K?B:de:r>9&&wn(e)?B:l?o===K?B:de:f?Cn:En}function wi(e,n,r,t,i){e.dump=(function(){if(n.length===0)return e.quotingType===K?'""':"''";if(!e.noCompatMode&&(ui.indexOf(n)!==-1||fi.test(n)))return e.quotingType===K?'"'+n+'"':"'"+n+"'";var o=e.indent*Math.max(1,r),l=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-o),a=t||e.flowLevel>-1&&r>=e.flowLevel;function c(s){return xi(e,s)}switch(bi(n,a,e.indent,l,c,e.quotingType,e.forceQuotes&&!t,i)){case An:return n;case de:return"'"+n.replace(/'/g,"''")+"'";case En:return"|"+Se(n,e.indent)+_e(ke(n,o));case Cn:return">"+Se(n,e.indent)+_e(ke(Ai(n,l),o));case B:return'"'+Ei(n)+'"';default:throw new C("impossible error: invalid scalar style")}})()}function Se(e,n){var r=wn(e)?String(n):"",t=e[e.length-1]===`
`,i=t&&(e[e.length-2]===`
`||e===`
`),o=i?"+":t?"":"-";return r+o+`
`}function _e(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Ai(e,n){for(var r=/(\n+)([^\n]*)/g,t=(function(){var s=e.indexOf(`
`);return s=s!==-1?s:e.length,r.lastIndex=s,Fe(e.slice(0,s),n)})(),i=e[0]===`
`||e[0]===" ",o,l;l=r.exec(e);){var a=l[1],c=l[2];o=c[0]===" ",t+=a+(!i&&!o&&c!==""?`
`:"")+Fe(c,n),i=o}return t}function Fe(e,n){if(e===""||e[0]===" ")return e;for(var r=/ [^ ]/g,t,i=0,o,l=0,a=0,c="";t=r.exec(e);)a=t.index,a-i>n&&(o=l>i?l:a,c+=`
`+e.slice(i,o),i=o+1),l=a;return c+=`
`,e.length-i>n&&l>i?c+=e.slice(i,l)+`
`+e.slice(l+1):c+=e.slice(i),c.slice(1)}function Ei(e){for(var n="",r=0,t,i=0;i<e.length;r>=65536?i+=2:i++)r=Y(e,i),t=E[r],!t&&W(r)?(n+=e[i],r>=65536&&(n+=e[i+1])):n+=t||mi(r);return n}function Ci(e,n,r){var t="",i=e.tag,o,l,a;for(o=0,l=r.length;o<l;o+=1)a=r[o],e.replacer&&(a=e.replacer.call(r,String(o),a)),(_(e,n,a,!1,!1)||typeof a>"u"&&_(e,n,null,!1,!1))&&(t!==""&&(t+=","+(e.condenseFlow?"":" ")),t+=e.dump);e.tag=i,e.dump="["+t+"]"}function Ie(e,n,r,t){var i="",o=e.tag,l,a,c;for(l=0,a=r.length;l<a;l+=1)c=r[l],e.replacer&&(c=e.replacer.call(r,String(l),c)),(_(e,n+1,c,!0,!0,!1,!0)||typeof c>"u"&&_(e,n+1,null,!0,!0,!1,!0))&&((!t||i!=="")&&(i+=se(e,n)),e.dump&&G===e.dump.charCodeAt(0)?i+="-":i+="- ",i+=e.dump);e.tag=o,e.dump=i||"[]"}function Li(e,n,r){var t="",i=e.tag,o=Object.keys(r),l,a,c,s,u;for(l=0,a=o.length;l<a;l+=1)u="",t!==""&&(u+=", "),e.condenseFlow&&(u+='"'),c=o[l],s=r[c],e.replacer&&(s=e.replacer.call(r,c,s)),_(e,n,c,!1,!1)&&(e.dump.length>1024&&(u+="? "),u+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),_(e,n,s,!1,!1)&&(u+=e.dump,t+=u));e.tag=i,e.dump="{"+t+"}"}function ki(e,n,r,t){var i="",o=e.tag,l=Object.keys(r),a,c,s,u,d,f;if(e.sortKeys===!0)l.sort();else if(typeof e.sortKeys=="function")l.sort(e.sortKeys);else if(e.sortKeys)throw new C("sortKeys must be a boolean or a function");for(a=0,c=l.length;a<c;a+=1)f="",(!t||i!=="")&&(f+=se(e,n)),s=l[a],u=r[s],e.replacer&&(u=e.replacer.call(r,s,u)),_(e,n+1,s,!0,!0,!0)&&(d=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,d&&(e.dump&&G===e.dump.charCodeAt(0)?f+="?":f+="? "),f+=e.dump,d&&(f+=se(e,n)),_(e,n+1,u,!0,d)&&(e.dump&&G===e.dump.charCodeAt(0)?f+=":":f+=": ",f+=e.dump,i+=f));e.tag=o,e.dump=i||"{}"}function Me(e,n,r){var t,i,o,l,a,c;for(i=r?e.explicitTypes:e.implicitTypes,o=0,l=i.length;o<l;o+=1)if(a=i[o],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof n=="object"&&n instanceof a.instanceOf)&&(!a.predicate||a.predicate(n))){if(r?a.multi&&a.representName?e.tag=a.representName(n):e.tag=a.tag:e.tag="?",a.represent){if(c=e.styleMap[a.tag]||a.defaultStyle,mn.call(a.represent)==="[object Function]")t=a.represent(n,c);else if(hn.call(a.represent,c))t=a.represent[c](n,c);else throw new C("!<"+a.tag+'> tag resolver accepts not "'+c+'" style');e.dump=t}return!0}return!1}function _(e,n,r,t,i,o,l){e.tag=null,e.dump=r,Me(e,r,!1)||Me(e,r,!0);var a=mn.call(e.dump),c=t,s;t&&(t=e.flowLevel<0||e.flowLevel>n);var u=a==="[object Object]"||a==="[object Array]",d,f;if(u&&(d=e.duplicates.indexOf(r),f=d!==-1),(e.tag!==null&&e.tag!=="?"||f||e.indent!==2&&n>0)&&(i=!1),f&&e.usedDuplicates[d])e.dump="*ref_"+d;else{if(u&&f&&!e.usedDuplicates[d]&&(e.usedDuplicates[d]=!0),a==="[object Object]")t&&Object.keys(e.dump).length!==0?(ki(e,n,e.dump,i),f&&(e.dump="&ref_"+d+e.dump)):(Li(e,n,e.dump),f&&(e.dump="&ref_"+d+" "+e.dump));else if(a==="[object Array]")t&&e.dump.length!==0?(e.noArrayIndent&&!l&&n>0?Ie(e,n-1,e.dump,i):Ie(e,n,e.dump,i),f&&(e.dump="&ref_"+d+e.dump)):(Ci(e,n,e.dump),f&&(e.dump="&ref_"+d+" "+e.dump));else if(a==="[object String]")e.tag!=="?"&&wi(e,e.dump,n,o,c);else{if(a==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new C("unacceptable kind of an object to dump "+a)}e.tag!==null&&e.tag!=="?"&&(s=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?s="!"+s:s.slice(0,18)==="tag:yaml.org,2002:"?s="!!"+s.slice(18):s="!<"+s+">",e.dump=s+" "+e.dump)}return!0}function $i(e,n){var r=[],t=[],i,o;for(ue(e,r,t),i=0,o=t.length;i<o;i+=1)n.duplicates.push(r[t[i]]);n.usedDuplicates=new Array(o)}function ue(e,n,r){var t,i,o;if(e!==null&&typeof e=="object")if(i=n.indexOf(e),i!==-1)r.indexOf(i)===-1&&r.push(i);else if(n.push(e),Array.isArray(e))for(i=0,o=e.length;i<o;i+=1)ue(e[i],n,r);else for(t=Object.keys(e),i=0,o=t.length;i<o;i+=1)ue(e[t[i]],n,r)}function Ti(e,n){n=n||{};var r=new gi(n);r.noRefs||$i(e,r);var t=e;return r.replacer&&(t=r.replacer.call({"":t},"",t)),_(r,0,t,!0,!0)?r.dump+`
`:""}var Si=Ti,_i={dump:Si};function ve(e,n){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}var Fi=A,Ii=Be,Mi=Ye,Oi=We,Ni=Ve,Hi=me,Di=pn.load,Bi=pn.loadAll,Ri=_i.dump,ji=C,Pi={binary:Je,float:Ke,map:Pe,null:qe,pairs:nn,set:rn,timestamp:Xe,bool:Ue,int:Ge,merge:Ze,omap:en,seq:je,str:Re},Yi=ve("safeLoad","load"),qi=ve("safeLoadAll","loadAll"),Ui=ve("safeDump","dump"),Gi={Type:Fi,Schema:Ii,FAILSAFE_SCHEMA:Mi,JSON_SCHEMA:Oi,CORE_SCHEMA:Ni,DEFAULT_SCHEMA:Hi,load:Di,loadAll:Bi,dump:Ri,YAMLException:ji,types:Pi,safeLoad:Yi,safeLoadAll:qi,safeDump:Ui};async function S(e){const r=await(await fetch(e)).text();return Gi.load(r)}async function Ki(e,n,r){const i=(r.heroSelections||[]).map(o=>{const l=o.color||"#18428F";return o.scrollTo?`<a href="#/" data-scroll-to="${o.scrollTo}" class="hero-bar-button" style="background-color: ${l}"><span class="hero-bar-button-inner">${o.label}<span class="hero-bar-arrow"> &rarr;</span></span></a>`:o.path?`<a href="#${o.path}" class="hero-bar-button" style="background-color: ${l}"><span class="hero-bar-button-inner">${o.label}<span class="hero-bar-arrow"> &rarr;</span></span></a>`:`<a href="#/" class="hero-bar-button" style="background-color: ${l}"><span class="hero-bar-button-inner">${o.label}<span class="hero-bar-arrow"> &rarr;</span></span></a>`}).join("");e.innerHTML=`
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
    <section id="about-section" class="home-section bg-white fade-up-section">
      <div class="about-section-container">
        <div id="about-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section id="partners-section" class="home-section fade-up-section" style="background-color: #F8F8F8;">
      <div class="max-w-5xl mx-auto px-4 py-16">
        <h2 class="font-heading text-3xl font-bold text-primary-dark text-center mb-4">Our Partners</h2>
        <div id="partners-content">
          <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
        </div>
      </div>
    </section>
  `,setTimeout(()=>{const o=e.querySelector(".home-hero");o&&o.classList.add("fade-in-active")},50),Wi(e),Vi(n),Qi(n)}function Wi(e){const n=e.querySelectorAll(".fade-up-section"),r=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&(i.target.classList.add("fade-up-visible"),r.unobserve(i.target))})},{threshold:.1});n.forEach(t=>r.observe(t))}async function Vi(e){try{const n=await S(`${e}data/about.yaml`),r=document.getElementById("about-content");if(!r||!n.subsections)return;r.innerHTML=n.subsections.map((t,i)=>{const o=i%2===1,l=t.color||"#18428F",a=t.subtitle?`<p class="font-body text-sm text-primary-cyan font-semibold mb-2">${q(t.subtitle)}</p>`:"";return`
          <div class="about-subsection ${o?"reverse":""}">
            <div class="about-subsection-circle" style="background-color: ${l}"></div>
            <div class="about-subsection-text-box" style="border: 2px solid ${l}">
              <h3 class="font-heading text-2xl font-bold mb-2" style="color: ${l}">${q(t.title)}</h3>
              ${a}
              <p class="font-body text-gray-600 leading-relaxed">${q(t.description)}</p>
            </div>
          </div>
        `}).join("")}catch{const n=document.getElementById("about-content");n&&(n.innerHTML='<p class="text-red-500 font-body">Failed to load content.</p>')}}async function Qi(e){try{const n=await S(`${e}data/partners.yaml`),r=document.getElementById("partners-content");if(!r)return;const t=n.intro?`<p class="font-body text-gray-600 text-center mb-8">${q(n.intro)}</p>`:"",i=(n.partners||[]).map(o=>`<span class="partner-name">${q(o.name)}</span>`).join("");r.innerHTML=`
      ${t}
      <div class="partners-grid">
        ${i}
      </div>
    `}catch{const n=document.getElementById("partners-content");n&&(n.innerHTML='<p class="text-red-500 font-body">Failed to load partners.</p>')}}function q(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function zi(e,n){e.innerHTML=`
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
                alt="${te(i.title)}"
                onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-sm p-4 text-center font-body\\' style=\\'background-color: #E2E1EE\\'>Image unavailable</div>'"
              />
            </div>
            <div class="p-5">
              <p class="font-body text-xs uppercase tracking-wide mb-2" style="color: #B64B28;">${Xi(i.date)}</p>
              <h3 class="font-heading font-semibold text-primary-dark mb-2">${te(i.title)}</h3>
              <p class="font-body text-gray-600 text-sm">${te(i.description)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `}catch{document.getElementById("news-content").innerHTML='<p class="text-red-500 font-body">Failed to load news.</p>'}}function Xi(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function te(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}const Zi="/website-test/",Ji=[{regex:/\[Volunteer\]/i,category:"Volunteer",color:"#00C2F3"},{regex:/\[Meeting\]/i,category:"Meeting",color:"#18428F"},{regex:/\[Social\]/i,category:"Social",color:"#F26524"},{regex:/\[Workshop\]/i,category:"Workshop",color:"#19226D"},{regex:/\[Conference\]/i,category:"Conference",color:"#B64B28"}],et={category:"General",color:"#41434C"};function nt(e){for(const n of Ji)if(n.regex.test(e))return{category:n.category,color:n.color};return et}function rt(e){return e.replace(/\[(Volunteer|Meeting|Social|Workshop|Conference)\]\s*/i,"")}function it(e){if(!e.start.dateTime){const s=e.start.date.split("-"),u=new Date(s[0],s[1]-1,s[2]),d=e.end.date.split("-"),f=new Date(d[0],d[1]-1,d[2]);f.setDate(f.getDate()-1);const m={month:"short",day:"numeric",year:"numeric"},h=u.toLocaleDateString("en-US",m);if(f.getTime()>u.getTime()){const g=f.toLocaleDateString("en-US",m);return{dateStr:`${h} – ${g}`,timeStr:"All Day",isAllDay:!0}}return{dateStr:h,timeStr:"All Day",isAllDay:!0}}const r=new Date(e.start.dateTime),t=new Date(e.end.dateTime),i=r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),o={hour:"numeric",minute:"2-digit"},l=`${r.toLocaleTimeString("en-US",o)} – ${t.toLocaleTimeString("en-US",o)}`,a=r.toDateString(),c=t.toDateString();if(a!==c){const s=t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});return{dateStr:`${i} – ${s}`,timeStr:l,isAllDay:!1}}return{dateStr:i,timeStr:l,isAllDay:!1}}async function tt(e){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-2">Upcoming Events</h1>
      <p class="font-body text-sm text-gray-400 mb-6">Scroll to browse events</p>
      <div id="events-list">
        <div class="text-center py-8 text-gray-400 font-body">Loading events...</div>
      </div>
    </div>
  `;const n=document.getElementById("events-list");try{const r=await fetch(`${Zi}data/events.json`);if(!r.ok){n.innerHTML=`
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
      <div class="timeline-container" id="timeline-scroll-container">
        <div class="timeline-track">
          ${i.map(o=>{const l=o.summary||"Untitled Event",{category:a,color:c}=nt(l),s=rt(l),{dateStr:u,timeStr:d}=it(o),f=o.description?`<p class="font-body text-sm text-gray-500 mt-2 line-clamp-3">${oe(o.description)}</p>`:"";return`
                <div class="timeline-event" style="--event-color: ${c}" onclick="window.location.hash='#/contact'">
                  <div class="timeline-dot"></div>
                  <div class="timeline-card">
                    <span class="timeline-category">${oe(a)}</span>
                    <h3 class="font-heading text-lg font-semibold text-primary-dark mt-1">${oe(s)}</h3>
                    <p class="font-body text-sm text-gray-500 mt-2">${u}</p>
                    <p class="font-body text-sm text-gray-400">${d}</p>
                    ${f}
                    <p class="font-body text-xs mt-3" style="color: var(--event-color)">Click to contact us about this event &rarr;</p>
                  </div>
                </div>
              `}).join("")}
        </div>
      </div>
      ${t.fetchedAt?`<p class="text-center text-xs text-gray-300 mt-4 font-body">Last updated: ${new Date(t.fetchedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p>`:""}
    `,ot()}catch{n.innerHTML=`
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="font-body text-red-800 font-semibold mb-2">Unable to Load Events</p>
        <p class="font-body text-red-600 text-sm">There was an error loading event data. Please try again later.</p>
      </div>
    `}}function ot(){const e=document.getElementById("timeline-scroll-container");if(!e)return;const n=2.5;let r=0,t=null;function i(){e.scrollLeft+=r,r=0,t=null}function o(a){e.scrollWidth<=e.clientWidth||(a.preventDefault(),r+=a.deltaY*n,t||(t=requestAnimationFrame(i)))}e.addEventListener("wheel",o,{passive:!1});const l=new MutationObserver(()=>{document.getElementById("timeline-scroll-container")||(e.removeEventListener("wheel",o),t&&cancelAnimationFrame(t),l.disconnect())});l.observe(document.getElementById("app")||document.body,{childList:!0,subtree:!0})}function oe(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function lt(e,n){e.innerHTML=`
    <div class="max-w-6xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-6">Executive Board</h1>
      <div id="board-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/board.yaml`),t=document.getElementById("board-content"),i=r.current.map(a=>Oe(a,n)).join("");let o="";r.founding&&r.founding.length>0&&(o=`
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-6">Founding Chapter Members</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${r.founding.map(c=>Oe(c,n)).join("")}
          </div>
        </div>
      `);let l="";r.previous&&(l=`
        <div class="mt-12">
          <h2 class="font-heading text-2xl font-semibold text-primary-blue mb-4">Previous Executive Board (${M(r.previous.year)})</h2>
          <div class="bg-white rounded-lg shadow-sm divide-y" style="border: 1px solid #E2E1EE;">
            ${r.previous.members.map(a=>`
              <div class="px-4 py-3 flex items-center justify-between">
                <span class="font-body font-medium text-primary-dark">${M(a.name)}</span>
                <span class="font-body text-gray-500 text-sm">${M(a.title)}</span>
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
    `}catch{document.getElementById("board-content").innerHTML='<p class="text-red-500 font-body">Failed to load board members.</p>'}}function Oe(e,n){const r=e.linkedin?`<a href="${e.linkedin}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="LinkedIn">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>`:"",t=e.website?`<a href="${e.website}" target="_blank" rel="noopener noreferrer" class="board-link-icon" aria-label="Website">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
      </a>`:"";return`
    <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow" style="border: 1px solid #E2E1EE;">
      <div class="aspect-square flex items-center justify-center" style="background-color: #E2E1EE;">
        <img
          src="${n}images/${e.photo}"
          alt="${M(e.name)}"
          class="w-full h-full object-cover"
          onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-6xl font-light font-heading\\' style=\\'color: #18428F;\\'>${e.name.charAt(0)}</div>'"
        />
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-heading font-semibold text-primary-dark">${M(e.name)}</h3>
            ${e.title?`<p class="font-body text-sm font-medium" style="color: #00C2F3;">${M(e.title)}</p>`:""}
          </div>
          <div class="flex gap-2">
            ${r}
            ${t}
          </div>
        </div>
        ${e.bio?`<p class="font-body text-gray-500 text-sm mt-2">${M(e.bio)}</p>`:""}
      </div>
    </div>
  `}function M(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function at(e,n){e.innerHTML=`
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
              alt="${J(i.caption)}"
              onerror="this.style.display='none'"
            />
            <div class="masonry-overlay">
              <p class="text-white text-sm font-medium font-body">${J(i.caption)}</p>
              ${i.date?`<p class="text-gray-300 text-xs mt-1 font-body">${i.date}</p>`:""}
            </div>
          </div>
        `).join("")}
      </div>
    `,t.querySelectorAll("[data-gallery-index]").forEach(i=>{i.addEventListener("click",()=>{const o=parseInt(i.dataset.galleryIndex);ct(r.photos,o,n)})})}catch{document.getElementById("gallery-content").innerHTML='<p class="text-red-500 font-body">Failed to load gallery.</p>'}}function ct(e,n,r){const t=e[n],i=document.createElement("div");i.className="lightbox-overlay",i.innerHTML=`
    <span class="lightbox-close">&times;</span>
    <img src="${r}images/${t.path}" alt="${J(t.caption)}" />
    <div class="lightbox-caption">${J(t.caption)}</div>
  `,i.addEventListener("click",o=>{(o.target===i||o.target.classList.contains("lightbox-close"))&&i.remove()}),document.addEventListener("keydown",function o(l){l.key==="Escape"&&(i.remove(),document.removeEventListener("keydown",o))}),document.body.appendChild(i)}function J(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function st(e,n,r){e.innerHTML=`
    <div class="max-w-4xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <div id="program-item-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const t=await S(`${n}data/programs.yaml`),i=document.getElementById("program-item-content");let o=null,l=null;for(const h of t.programs){for(const g of h.items)if(g.slug===r){o=g,l=h;break}if(o)break}if(!o){i.innerHTML=`
        <div class="text-center py-12">
          <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">Program Not Found</h1>
          <p class="font-body text-gray-500 mb-6">The program you're looking for doesn't exist.</p>
          <a href="#/programs" class="font-body text-primary-cyan hover:text-primary-blue underline">Back to Programs</a>
        </div>
      `;return}const a=o.details?`
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Additional Details</h2>
          <p class="font-body text-gray-600 leading-relaxed">${v(o.details)}</p>
        </div>
      `:"",c=o.volunteer?`
        <div class="program-item-section program-item-callout">
          <h2 class="font-heading text-xl font-bold mb-3" style="color: #00C2F3;">Call for Volunteers</h2>
          <p class="font-body text-gray-600 leading-relaxed">${v(o.volunteer)}</p>
          <a href="#/contact" class="program-item-cta">Get Involved &rarr;</a>
        </div>
      `:"",s=o.links&&o.links.length>0?`
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Links &amp; Resources</h2>
          <ul class="space-y-2">
            ${o.links.map(h=>`<li>
                    <a href="${O(h.url)}" target="_blank" rel="noopener noreferrer" class="program-item-link">
                      ${v(h.label||h.url)} <span class="text-xs">&nearr;</span>
                    </a>
                    ${h.description?`<p class="font-body text-gray-500 text-sm mt-0.5">${v(h.description)}</p>`:""}
                  </li>`).join("")}
          </ul>
        </div>
      `:"",u=o.images&&o.images.length>0?`
        <div class="program-item-section">
          <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Photos</h2>
          <div class="program-item-gallery">
            ${o.images.map(h=>`<div class="program-item-gallery-item">
                    <img src="${n}images/${O(h.src)}" alt="${O(h.alt||"")}" class="rounded-lg w-full h-auto" />
                    ${h.caption?`<p class="font-body text-sm text-gray-500 mt-1">${v(h.caption)}</p>`:""}
                  </div>`).join("")}
          </div>
        </div>
      `:"",d=dt(o.faq),f=ft(o.experiments),m=mt(o.roles);i.innerHTML=`
      <nav class="font-body text-sm text-gray-400 mb-6">
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">Ongoing Programs</a>
        <span class="mx-2">/</span>
        <a href="#/programs" class="text-primary-cyan hover:text-primary-blue">${v(l.title)}</a>
        <span class="mx-2">/</span>
        <span class="text-primary-dark">${v(o.name)}</span>
      </nav>
      <h1 class="font-heading text-3xl font-bold text-primary-dark mb-4">${v(o.name)}</h1>
      <div class="font-body text-gray-600 leading-relaxed text-lg mb-8">
        <p>${v(o.description)}</p>
      </div>
      ${a}
      ${c}
      ${f}
      ${m}
      ${u}
      ${d}
      ${s}
      <div class="border-t pt-6 mt-8" style="border-color: #E2E1EE;">
        <p class="font-body text-gray-500 text-sm">
          This program is part of our <strong>${v(l.title)}</strong> initiative.
          <a href="#/contact" class="text-primary-cyan hover:text-primary-blue underline ml-1">Contact us</a> to learn more or get involved.
        </p>
      </div>
    `,ut(),pt()}catch{const t=document.getElementById("program-item-content");t&&(t.innerHTML='<p class="text-red-500 font-body">Failed to load program details.</p>')}}function dt(e){return!e||e.length===0?"":`
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Frequently Asked Questions</h2>
      <div class="faq-list">
        ${e.map((n,r)=>`
          <div class="faq-item">
            <button class="faq-question" data-faq-index="${r}">
              <span>${v(n.question)}</span>
              <svg class="faq-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="faq-answer" data-faq-answer="${r}">
              <p>${v(n.answer)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function ut(){document.querySelectorAll(".faq-question").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-faq-index"),t=document.querySelector(`.faq-answer[data-faq-answer="${r}"]`),i=n.querySelector(".faq-chevron"),o=t.classList.contains("open");document.querySelectorAll(".faq-answer").forEach(l=>l.classList.remove("open")),document.querySelectorAll(".faq-chevron").forEach(l=>l.classList.remove("open")),o||(t.classList.add("open"),i.classList.add("open"))})})}function ft(e){if(!e||e.length===0)return"";const n=new Set,r=new Set;e.forEach(c=>{c.grade&&n.add(c.grade),c.time&&r.add(c.time)});const t=[...n].map(c=>`<button class="experiment-filter-btn" data-filter-type="grade" data-filter-value="${O(c)}">${v(c)}</button>`).join(""),i=[...r].map(c=>`<button class="experiment-filter-btn" data-filter-type="time" data-filter-value="${O(c)}">${v(c)}</button>`).join(""),l=n.size>0||r.size>0?`
      <div class="experiment-filters">
        <button class="experiment-filter-btn active" data-filter-type="all" data-filter-value="all">All</button>
        ${t}
        ${i}
      </div>
    `:"",a=e.map(c=>{const s=[];c.grade&&s.push(c.grade),c.time&&s.push(c.time);const u=c.steps&&c.steps.length>0?`
          <div class="mt-3">
            <p class="experiment-card-label">Student Steps</p>
            <ol class="experiment-card-steps">
              ${c.steps.map(f=>`<li>${v(f)}</li>`).join("")}
            </ol>
          </div>
        `:"",d=c.teacherNotes?`<div class="experiment-card-notes"><strong>Teacher Notes:</strong> ${v(c.teacherNotes)}</div>`:"";return`
        <div class="experiment-card" data-grade="${O(c.grade||"")}" data-time="${O(c.time||"")}">
          <div class="experiment-card-header">
            <h3 class="experiment-card-title">${v(c.title)}</h3>
            ${s.length>0?`<div class="experiment-card-meta">${s.map(f=>`<span class="experiment-card-tag">${v(f)}</span>`).join("")}</div>`:""}
          </div>
          <div class="experiment-card-body">
            <p>${v(c.description)}</p>
            ${u}
            ${d}
          </div>
        </div>
      `}).join("");return`
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Experiment Cards</h2>
      ${l}
      <div class="experiment-grid">
        ${a}
      </div>
    </div>
  `}function pt(){const e=document.querySelectorAll(".experiment-filter-btn"),n=document.querySelectorAll(".experiment-card");e.length!==0&&e.forEach(r=>{r.addEventListener("click",()=>{e.forEach(o=>o.classList.remove("active")),r.classList.add("active");const t=r.getAttribute("data-filter-type"),i=r.getAttribute("data-filter-value");n.forEach(o=>{t==="all"||o.getAttribute(`data-${t}`)===i?o.classList.remove("hidden-card"):o.classList.add("hidden-card")})})})}function mt(e){return!e||e.length===0?"":`
    <div class="program-item-section">
      <h2 class="font-heading text-xl font-bold text-primary-dark mb-3">Volunteer Roles</h2>
      <div class="role-grid">
        ${e.map(r=>{const t=r.responsibilities&&r.responsibilities.length>0?`
          <div>
            <p class="role-card-section-label">Responsibilities</p>
            <ul class="role-card-list">
              ${r.responsibilities.map(o=>`<li>${v(o)}</li>`).join("")}
            </ul>
          </div>
        `:"",i=r.perks&&r.perks.length>0?`
          <div>
            <p class="role-card-section-label">Perks</p>
            <ul class="role-card-perks">
              ${r.perks.map(o=>`<li>&#10003; ${v(o)}</li>`).join("")}
            </ul>
          </div>
        `:"";return`
        <div class="role-card">
          <div class="role-card-header">
            <h3 class="role-card-title">${v(r.title)}</h3>
          </div>
          <div class="role-card-body">
            ${r.description?`<p class="font-body text-sm text-gray-600 mb-3">${v(r.description)}</p>`:""}
            ${t}
            ${i}
          </div>
        </div>
      `}).join("")}
      </div>
    </div>
  `}function v(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}function O(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ht(e,n){e.innerHTML=`
    <div class="max-w-5xl mx-auto px-4 py-12" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-12">Ongoing Programs</h1>
      <div id="programs-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/programs.yaml`),t=document.getElementById("programs-content");if(!t)return;t.innerHTML=r.programs.map((i,o)=>{const a=i.items.map(c=>{let s="",u="";return c.link?s=c.link:c.scrollTo?(s="#/",u=`data-scroll-to="${c.scrollTo}"`):c.slug&&(s=`#/programs/${c.slug}`),`
              <div class="mb-4">
                <h4 class="font-body font-semibold text-primary-dark">${s?`<a href="${s}" ${u} class="program-item-name-link">${D(c.name)}<span class="program-item-arrow"> &rarr;</span></a>`:`<span class="font-body font-semibold text-primary-dark">${D(c.name)}</span>`}</h4>
                <p class="font-body text-gray-600 text-sm mt-1">${D(c.description)}</p>
              </div>
            `}).join("");return`
          <div class="program-page-card ">
            <div class="program-page-card-image">
              <img
                src="${n}images/${i.image}"
                alt="${D(i.title)}"
                class="program-circle-image"
                onerror="this.style.display='none'"
              />
            </div>
            <div class="program-page-card-content">
              <h2 class="font-heading text-2xl font-bold text-primary-dark mb-2">${D(i.title)}</h2>
              <p class="font-body text-gray-500 mb-4">${D(i.summary)}</p>
              <div class="space-y-2">
                ${a}
              </div>
            </div>
          </div>
          ${o<r.programs.length-1?'<hr class="my-4 border-secondary-light">':""}
        `}).join("")}catch{const r=document.getElementById("programs-content");r&&(r.innerHTML='<p class="text-red-500 font-body">Failed to load programs.</p>')}}function D(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}async function gt(e,n){e.innerHTML=`
    <div class="max-w-3xl mx-auto px-4 py-16" style="margin-top: 60px;">
      <h1 class="font-heading text-3xl font-bold text-primary-dark text-center mb-8">Contact Us</h1>
      <div id="contact-content">
        <div class="text-center py-8 text-gray-400 font-body">Loading...</div>
      </div>
    </div>
  `;try{const r=await S(`${n}data/contact.yaml`),t=document.getElementById("contact-content");if(!t)return;const i="stkayla@gmail.com",o="",l=r.description?`<p class="font-body text-gray-600 mb-8 text-center">${xt(r.description)}</p>`:"";if(!i||i.includes("your-email@example.com")){t.innerHTML=`
        ${l}
        <div class="border border-secondary-light rounded-lg p-6 text-center" style="background-color: #F8F8F8;">
          <p class="font-body text-primary-dark font-semibold mb-2">Contact Form Not Configured</p>
          <p class="font-body text-gray-500 text-sm">
            To display the contact form, add your email address to the
            <code class="bg-secondary-light px-1 rounded">VITE_CONTACT_EMAIL</code> variable in your
            <code class="bg-secondary-light px-1 rounded">.env</code> file.
            See MAINTENANCE.md for setup instructions.
          </p>
        </div>
      `;return}const a=o?`<input type="hidden" name="_cc" value="${Ne(o)}" />`:"";t.innerHTML=`
      ${l}
      <form
        action="https://formsubmit.co/${Ne(i)}"
        method="POST"
        class="contact-form"
        id="contact-form"
      >
        <!-- FormSubmit configuration -->
        <input type="hidden" name="_subject" value="New Contact Form Submission" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" style="display:none" />
        ${a}

        <div class="contact-form-group">
          <label for="name" class="contact-form-label">Name <span class="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="email" class="contact-form-label">Email <span class="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your.email@example.com"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="subject" class="contact-form-label">Subject</label>
          <input
            type="text"
            id="subject"
            name="_subject"
            placeholder="What is this about?"
            class="contact-form-input"
          />
        </div>

        <div class="contact-form-group">
          <label for="message" class="contact-form-label">Message <span class="text-red-500">*</span></label>
          <textarea
            id="message"
            name="message"
            required
            rows="6"
            placeholder="Your message..."
            class="contact-form-textarea"
          ></textarea>
        </div>

        <button type="submit" class="contact-form-button">
          Send Message
        </button>
      </form>
    `}catch{const r=document.getElementById("contact-content");r&&(r.innerHTML='<p class="text-red-500 font-body">Failed to load contact information.</p>')}}function xt(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}function Ne(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const $="/website-test/";let le=null;async function vt(){const e=await S(`${$}data/site.yaml`);le=await S(`${$}data/programs.yaml`),document.title=e.name;const n=document.getElementById("app");n.innerHTML=yt(e,le);const r=document.getElementById("page-content"),t={"/":a=>Ki(a,$,e),"/news":a=>zi(a,$),"/events":a=>tt(a),"/board":a=>lt(a,$),"/gallery":a=>at(a,$),"/programs":a=>ht(a,$),"/contact":a=>gt(a,$),"/404":a=>{a.innerHTML=`
        <div class="text-center py-20">
          <h1 class="font-heading text-4xl font-bold text-primary-dark mb-4">Page Not Found</h1>
          <p class="font-body text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href="#/" class="font-body text-primary-blue hover:text-secondary-navy underline">Go Home</a>
        </div>`}};for(const a of le.programs)for(const c of a.items)c.slug&&!c.link&&!c.scrollTo&&(t[`/programs/${c.slug}`]=s=>st(s,$,c.slug));new Ln(t).init(r);const o=document.getElementById("floating-menu-toggle"),l=document.getElementById("floating-mobile-menu");o&&l&&o.addEventListener("click",()=>{l.classList.toggle("hidden")}),At(),Et(),Ct()}function yt(e,n){var c;const r=e.floatingNav.filter(s=>!s.external),t=e.floatingNav.find(s=>s.external),i=r.map(s=>s.label==="Programs"?bt(s,n):s.scrollTo?`<a href="#/" data-scroll-to="${s.scrollTo}" data-nav-link class="nav-link">${s.label}</a>`:`<a href="#${s.path}" data-nav-link class="nav-link">${s.label}</a>`).join(""),o=t?`<a href="${t.path}" target="_blank" rel="noopener noreferrer" class="nav-link-parent">${t.label}</a>`:"",l=wt(e,n),a=e.socials?e.socials.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="${s.platform}">${s.platform}</a>`).join(" | "):"";return`
    <!-- Top Navigation -->
    <nav id="floating-nav" class="site-nav">
      <div class="nav-inner">
        <a href="#/" class="nav-logo">
          <img src="${$}images/logo.png" alt="${e.name}" class="h-8 w-8 object-contain" onerror="this.style.display='none'" />
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
  `}function bt(e,n){const r=n.programs.map(t=>{const i=t.items.map(o=>o.link?`<a href="${o.link}" class="dropdown-flat-item">${o.name}</a>`:o.scrollTo?`<a href="#/" data-scroll-to="${o.scrollTo}" class="dropdown-flat-item">${o.name}</a>`:`<a href="#/programs/${o.slug}" class="dropdown-flat-item">${o.name}</a>`).join("");return`
        <div class="dropdown-section">
          <div class="dropdown-section-label">${t.title}</div>
          ${i}
        </div>
      `}).join("");return`
    <div class="nav-dropdown-wrapper">
      <a href="#${e.path}" data-nav-link class="nav-link">${e.label}</a>
      <div class="nav-dropdown-flat">
        <a href="#${e.path}" class="dropdown-flat-item dropdown-flat-view-all">View All Programs</a>
        <div class="dropdown-flat-divider"></div>
        ${r}
      </div>
    </div>
  `}function wt(e,n){return e.floatingNav.map(r=>{if(r.external)return`<a href="${r.path}" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 font-body font-bold text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`;if(r.label==="Programs"){const t=n.programs.map(i=>{const o=i.items.map(l=>l.link?`<a href="${l.link}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`:l.scrollTo?`<a href="#/" data-scroll-to="${l.scrollTo}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`:`<a href="#/programs/${l.slug}" class="block px-8 py-1 font-body text-xs text-gray-400 hover:text-white transition-colors">${l.name}</a>`).join("");return`
              <div class="block px-6 py-1 font-body text-sm text-gray-300">${i.title}</div>
              ${o}
            `}).join("");return`
          <a href="#${r.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>
          ${t}
        `}return r.scrollTo?`<a href="#/" data-scroll-to="${r.scrollTo}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`:`<a href="#${r.path}" data-nav-link class="block px-4 py-2 font-body text-gray-200 hover:text-white hover:bg-primary-dark/50 transition-colors">${r.label}</a>`}).join("")}function At(){document.addEventListener("click",e=>{const n=e.target.closest("[data-scroll-to]");if(!n)return;e.preventDefault();const r=n.dataset.scrollTo,t=window.location.hash||"#/",i=t==="#/"||t==="#"||t==="",o=document.getElementById("floating-mobile-menu");o&&o.classList.add("hidden"),i?fe(r):(window.location.hash="#/",setTimeout(()=>fe(r),400))})}function Et(){const e={"#/about":"about-section"};window.addEventListener("hashchange",()=>{const n=window.location.hash,r=e[n];r&&(window.location.hash="#/",setTimeout(()=>fe(r),400))})}function fe(e){var r;const n=document.getElementById(e);if(n){const t=((r=document.getElementById("floating-nav"))==null?void 0:r.offsetHeight)||0,i=n.getBoundingClientRect().top+window.scrollY-t-16;window.scrollTo({top:i,behavior:"smooth"})}}function Ct(){const e=document.getElementById("floating-nav");if(!e)return;let n=!1;function r(){window.scrollY>10?e.classList.add("nav-scrolled"):e.classList.remove("nav-scrolled"),n=!1}window.addEventListener("scroll",()=>{n||(requestAnimationFrame(r),n=!0)}),r()}vt();
