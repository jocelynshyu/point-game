(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bed3474"],{"1cdb":function(t,e,a){},"504c":function(t,e,a){},"55d8":function(t,e,a){"use strict";var r=a("840f"),n=a.n(r);n.a},"5fe9":function(t,e,a){"use strict";var r=a("ee09"),n=a.n(r);n.a},"60ff":function(t,e,a){"use strict";var r=a("1cdb"),n=a.n(r);n.a},"840f":function(t,e,a){},ace7:function(t,e,a){"use strict";var r=a("504c"),n=a.n(r);n.a},d37d:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",[t.detail.id?a("ProfileCard",{attrs:{player:t.detail}}):t._e(),a("ul",t._l(t.records,function(e,r){return a("Record",{key:r,attrs:{record:e,me:t.detail.id}})}),1)],1)},n=[],s=a("30f5"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[a("div",{staticClass:"avatar"},[a("Avatar",{attrs:{player:t.player}})],1),a("div",{staticClass:"info"},[a("h3",{staticClass:"name"},[t._v(t._s(t.player.name))]),a("p",{staticClass:"line"},[t._v("目前積分 "),a("span",{staticClass:"point"},[t._v(t._s(t.player.point))])])])])},i=[],o=a("df3a"),l={components:{Avatar:o["a"]},props:["player"]},d=l,u=(a("55d8"),a("2877")),p=Object(u["a"])(d,c,i,!1,null,"7a8fe89b",null),f=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"record"},[a("RecordTeam",{attrs:{team:t.record.winners,me:t.me}}),a("div",{staticClass:"points"},[a("span",{staticClass:"point"},[t._v(t._s(t.record.winner_score))]),a("span",[t._v(" : ")]),a("span",{staticClass:"point"},[t._v(t._s(t.record.loser_score))])]),a("RecordTeam",{attrs:{team:t.record.losers,me:t.me}})],1)},v=[],_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"team"},t._l(t.team,function(e){return a("router-link",{key:e.id,staticClass:"link",class:{cyan:t.me===e.id},attrs:{to:{name:"player",params:{id:e.id}}}},[t._v(t._s(e.name))])}),1)},h=[],b={props:["team","me"]},w=b,C=(a("ace7"),Object(u["a"])(w,_,h,!1,null,"5a5bc62f",null)),y=C.exports,D={components:{RecordTeam:y},props:["record","me"]},k=D,O=(a("60ff"),Object(u["a"])(k,m,v,!1,null,"78aa883d",null)),g=O.exports,j={components:{ProfileCard:f,Record:g},data:function(){return{detail:{},records:[]}},methods:{updateData:function(t,e){var a=t||JSON.parse(localStorage.getItem(e));a&&(this[e]=a)},getNewData:function(){var t=this,e=this.$route.params.id;Object(s["b"])(e).then(function(e){return t.updateData(e,"detail")}),Object(s["c"])(e).then(function(e){return t.updateData(e,"records")})}},mounted:function(){window.localStorage&&(this.updateData(null,"detail"),this.updateData(null,"records")),this.getNewData()},watch:{$route:function(t,e){t.params.id!==e.params.id&&this.getNewData()}}},$=j,R=(a("5fe9"),Object(u["a"])($,r,n,!1,null,"03744cfc",null));e["default"]=R.exports},ee09:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7bed3474.69724b80.js.map