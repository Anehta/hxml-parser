!function(r){function e(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return r[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var t={};e.m=r,e.c=t,e.d=function(exports,r,t){e.o(exports,r)||Object.defineProperty(exports,r,{configurable:!1,enumerable:!0,get:t})},e.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(t,"a",t),t},e.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},e.p="",e(e.s=0)}([function(r,exports,e){r.exports=e(1)},function(r,exports,e){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=e(2),a=function(r){return r&&r.__esModule?r:{default:r}}(t);exports.default=a.default},function(r,exports,e){"use strict";function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var a=function(){function r(r,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(r,a.key,a)}}return function(e,t,a){return t&&r(e.prototype,t),a&&r(e,a),e}}(),n=e(3),o=function(r){return r&&r.__esModule?r:{default:r}}(n),l=o.default.lex,p=function(){function r(){t(this,r)}return a(r,[{key:"Parser",value:function(r){var e=(0,o.default)().Analysis(r);return e.index=0,e.GetNext=function(){return e[e.index++]},e.GetLast=function(){return e[--e.index]},e.IsEnd=function(){return e.index>=e.length},e.papaWord=[],e.PushPapaWord=function(r){e.papaWord.push(r)},e.PopPapaWord=function(){return e.papaWord.pop()},e.F=function(){var r=e.GetNext();if(null!=r&&r.type==l.lextype.LAB){var t={error:null,label:null,children:null,attribute:null,next:null},a=e.PapaWord();if(null==a.error){var n=e.T();if(null!=n.error)throw n.error,n.error;if(e.PushPapaWord(a.data),t.label=a.data,t.attribute=n,r=e.GetNext(),r.type!=l.lextype.RAB){var o=new Error("PapaParser-Error(line:"+r.line+") : parser can't matched '>'");throw o}var p=e.F();null==p.error?null!=p.label&&(t.children=p):(r=e.GetLast(),r=e.GetLast());var i=e.F();if(null!=i.error)throw i.error;return null!=i.label&&(t.next=i),t}if(e.GetLast(),r=e.GetNext(),r.type==l.lextype.SPRIT){if(a=e.PapaWord(),null!=a.error)throw a.error,a.error;var u=e.PopPapaWord();if(u!=a.data){var d=new Error("PapaParser-Error(line:"+r.line+") : can't matched </"+u+">  current:<"+a.data+">");throw d}if(r=e.GetNext(),r.type!=l.lextype.RAB){var f=new Error("PapaParser-Error(line:"+r.line+") : need matched '>'");throw f}return t}var s=new Error("PapaParser-Error(line:"+r.line+") : need matched </papaword>");throw s}return e.GetLast(),{error:null,label:null,children:[],attribute:[]}},e.PapaWord=function(){var r=e.GetNext();return"papascene"==r.data||"papalayer"==r.data||"papabody"==r.data||"object"==r.data||"ui2d"==r.data||"ui3d"==r.data||"script"==r.data||"dynamic"==r.data?{error:null,data:r.data,type:r.type}:{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser need 'papascene' or 'papalayer' or 'papabody' or 'object' or 'ui2' or 'ui3' or 'script' now："+r.data),data:null,type:null}},e.T=function(){var r=e.GetNext();if(r.type==l.lextype.WORD){var t=r.data;if(r=e.GetNext(),r.type==l.lextype.EUQAL){var a=e.S();if(null==a.error){var n=e.T(),o=null,p=null;a.type&&(o=a.type),a.margin_type&&(p=a.margin_type);var i={error:null,data:[{member:t,data:a.data}]};return o&&(i.data[0].type=o),p&&(i.data[0].margin_type=p),null==n.error?(n.data.length>0&&(i.data=i.data.concat(n.data)),i):{error:i.error}}return{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser need NUMBER or STRING")}}return{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser need '='")}}return e.GetLast(),{error:null,data:[]}},e.S=function(){var r=e.NUMBER();if(null==r.error)return r;if(null!=(r=e.STRING()))return null==r.error?r:{error:r.error};var t=e.GetNext();throw e.GetLast(),new Error("PapaParser-Error(line:"+t.line+") :token error,parser need match string")},e.NUMBER=function(){var r=e.GetNext(),t=!1;if(r.type==l.lextype.MINUS&&(t=!0,r=e.GetNext()),r.type==l.lextype.NUMBER){var a=r.data;return r=e.GetNext(),"px"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"px"}}:"%"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"%"}}:"left"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"left"}}:"right"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"right"}}:"top"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"top"}}:"bottom"==r.data?{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"bottom"}}:(e.GetLast(),{error:null,data:{data:t?-parseFloat(a):parseFloat(a),type:"NUMBER",margin_type:"px"}})}return e.GetLast(),{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser need NUMBER!")}},e.STRING=function(){var r=e.GetNext();if(r.type==l.lextype.QUOTES){if(r=e.GetNext(),r.type==l.lextype.WORD){var t=r.data;return r=e.GetNext(),r.type==l.lextype.QUOTES?{error:null,data:t,type:"STRING"}:{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser can't find matched '\"'")}}return r=e.GetNext(),r.type==l.lextype.QUOTES?{error:null,data:"",type:"STRING"}:{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser need WORD or '\"'")}}if(r.type==l.lextype.SQUOTES){if(r=e.GetNext(),r.type==l.lextype.WORD){var a=r.data;return r=e.GetNext(),r.type==l.lextype.SQUOTES?{error:null,data:a,type:"STRING"}:{error:new Error("PapaParser-Error(line:"+r.line+") : token error,parser can't find matched")}}return r.type==l.lextype.SQUOTES?{error:null,data:"",type:"STRING"}:{error:new Error("PapaParser-Error(line:"+r.line+') : token error ,parser need WORD or "\'"')}}},e.F()}}]),r}();exports.default=p},function(r,exports,e){"use strict";function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function a(r){return"string"==typeof r&&r.constructor==String}function n(r){return r>=65&&r<=90||r>=97&&r<=122||r>255}function o(r){return r>=48&&r<=57}Object.defineProperty(exports,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},p=function(){function r(r,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(r,a.key,a)}}return function(e,t,a){return t&&r(e.prototype,t),a&&r(e,a),e}}(),i={WORD:1,LAB:2,RAB:3,NUMBER:4,COMMA:5,SQUOTES:6,QUOTES:7,OBJECT:8,SCENE:9,LAYER:10,EUQAL:11,SRC:12,SPRIT:13,MINUS:14,UI2:15,UI3:16,SCRIPT:17,DYNAMIC:18},u=function(){function r(){t(this,r),this.lextype=i}return p(r,[{key:"Analysis",value:function(r){if(!a(r))throw new Error("PapaLex-Error: data is "+(void 0===r?"undefined":l(r))+" type that requires string type",10);r=r.replace(/<!--[\s\S]*-->/,"");for(var e=0,t=r.length,p=1,u=[],d="";;){if(e>=t){null!=r[e]&&(d+=r[e],u.push({data:d,line:p}),d="");break}for(;" "==r[e]||""==r[e];)e++;if("-"!=r[e])if("%"!=r[e])if("<"!=r[e])if(">"!=r[e])if("="!=r[e])if(","!=r[e])if("\n"!=r[e]&&"\r"!=r[e])if(n(r.charCodeAt(e)))for(;e<t;){if(!n(r.charCodeAt(e))&&"."!=r[e]&&"_"!=r[e]&&!o(r.charCodeAt(e))){u.push({data:d,line:p}),d="";break}d+=r[e++]}else if(o(r.charCodeAt(e))||"."==r[e])for(var f=0;e<t;)if(o(r.charCodeAt(e)))d+=r[e++];else{if(f>1){e++;continue}if("."!=r[e]){u.push({data:d,line:p}),d="";break}f++,d+=r[e++]}else if('"'==r[e])for(var s=0;;){if(e>=t)throw new Error("PapaLex-Error(line:"+p+'): No matching double "\'" are found');if("\\"!=r[e]){if(2==s){u.push({data:d,line:p}),u.push({data:'"',line:p}),d="";break}'"'!=r[e]?d+=r[e++]:(s++,s<2&&u.push({data:'"',line:p}),e++)}else e++,d+=r[e++]}else if("'"==r[e])for(var y=0;;){if(e>=t)throw new Error("PapaLex-Error(line:"+p+'): No matching double "\'" are found');if("\\"!=r[e]){if(2==y){u.push({data:d,line:p}),u.push({data:"'",line:p}),d="";break}"'"!=r[e]?d+=r[e++]:(y++,y<2&&u.push({data:"'",line:p}),e++)}else e++,d+=r[e++]}else"/"==r[e]?(u.push({data:"/",line:p}),e++):(r[e],e++);else e++,p++;else u.push({data:",",line:p}),e++;else u.push({data:"=",line:p}),e++;else u.push({data:">",line:p}),e++;else u.push({data:"<",line:p}),e++;else u.push({data:"%",line:p}),e++;else u.push({data:"-",line:p}),e++}return u.forEach(function(r){var e=_.toNumber(r.data);isNaN(e)?"<"==r.data?r.type=i.LAB:">"==r.data?r.type=i.RAB:"'"==r.data?r.type=i.SQUOTES:'"'==r.data?r.type=i.QUOTES:"object"==r.data?r.type=i.OBJECT:"papascene"==r.data?r.type=i.SCENE:"papalayer"==r.data?r.type=i.LAYER:"papabody"==r.data?r.type=i.BODY:"="==r.data?r.type=i.EUQAL:","==r.data?r.type=i.COMMA:"/"==r.data?r.type=i.SPRIT:"-"==r.data?r.type=i.MINUS:"ui2d"==r.data?r.type=i.UI2:"ui3d"==r.data?r.type=i.UI3:"script"==r.data?r.type=i.SCRIPT:"dynamic"==r.data?r.type=i.DYNAMIC:r.type=i.WORD:r.type=i.NUMBER}),u}}]),r}();exports.default=u}]);