<template>

   <ul class="slidUl menu" v-loading="this.$store.state.menuLoading" element-loading-background="rgba(0, 0, 0, 0)" :class="{menuActive : $store.state.show}">
        <li class="one">
            <span class="menuIcon"><img src="../../static/image/siderbar/版本动态.png" alt="版本动态"></span>
            <a class="oneA" href="javascript:;">版本动态</a>
            <span class="versionInfo" :class="{infoActive : $store.state.show}">升级信息</span>
        </li>
       <vue-scroll :ops="ops">
            <!-- <li class="one" @mouseenter="enter1">
                <span class="menuIcon"><img src="../../static/image/siderbar/常用功能.png"></span>
                <a class="oneA" href="javascript:;">系统管理</a>
                <ul class="slidUl slid1">
                    <vue-scroll :ops="ops">
                        <li class="two" v-for="i in secondLevel1" @mouseenter="enter2">
                            <a href="javascript:;">{{i.name}}</a>
                            <diV class="triangle"></diV> 
                            <ul class="slidUl slid2" >
                                <vue-scroll :ops="ops">
                                    <li class="three" v-for="it in i.thirdInfo">
                                        <a href="javascript:;" :menuUrl="it.address" :menuname="it.name" @click="storageData">{{it.name}}</a>
                                    </li>
                                </vue-scroll> 
                            </ul>
                        </li>
                    </vue-scroll> 
                </ul>
            </li> -->
            <li class="one" v-for="item in sideBarMenu" :menuId="item.id" :key="item.id" @mouseenter="enter1" v-if="item.status==1">
                <span class="menuIcon" :moduleParentId="item.moduleParentId" :menuname="item.moduleName" :menuUrl="item.url"><i :class="item.ico" style="color:#fff"></i></span>
                <a class="oneA" href="javascript:;" :moduleParentId="item.moduleParentId" :menuname="item.moduleName" :menuUrl="item.url">{{item.moduleName}}</a>
                <ul class="slidUl slid1 trans">
                    <vue-scroll :key="item.id" :ops="ops">
                        <li class="two" v-for="i in item.childNodes" :key="i.id"  @mouseenter="enter2" v-if="i.status==1">
                            <!-- <span class="menuIcon" :moduleParentId="item.moduleParentId" :menuname="item.moduleName" :menuUrl="item.url" @click="storageData"><i :class="i.ico"></i></span> -->
                            <a href="javascript:;" @click="storageData(i.childNodes,$event)" :moduleParentId="i.moduleParentId" :menuname="i.moduleName" :menuUrl="i.url">{{i.moduleName}}</a>
                            <diV class="triangle"></diV>
                            <ul class="slidUl slid2 trans" v-show="i.childNodes.length>0" >
                                <vue-scroll :key="i.id" :ops="ops">
                                    <li class="three" v-for="it in i.childNodes" :key="it.id" v-if="it.status==1">
                                        <!-- <span class="menuIcon" :moduleParentId="item.moduleParentId" :menuname="item.moduleName" :menuUrl="item.url" @click="storageData"><i :class="i.ico"></i></span> -->
                                        <a href="javascript:;" :menuId="it.id" :moduleParentId="it.moduleParentId" :menuUrl="it.url" :menuname="it.moduleName" @click="storageData(0,$event)">{{it.moduleName}}</a>
                                    </li>
                                </vue-scroll> 
                            </ul>
                        </li>
                    </vue-scroll>     
                </ul>
            </li>
        </vue-scroll> 
    </ul>

</template>
<script>
import {ADD_BOOKMARK} from '../common/common.js'
// import func from './vue-temp/vue-editor-bridge.js';
export default {
  name: 'appsiderbar',
  data(){
    return{
         ops: {
            vRail: {
                width: '0'
            },
            hRail: {
                height: '0',
            },
            },
            ids:[],
            childNodes:[],//菜单数据
            userName:window.localStorage.getItem('user_name')
        }
        
    },
    computed:{
        sideBarMenu(){
            return this.$store.state.sideBarMenu;
        },
    },
    created:function(){
        // if(this.sideBarMenu.length==0){
        //     this.$store.dispatch('InitMenu');
        // }
        this.$store.commit('Init_menu', []);
        this.$store.commit('menu_loading', true);
        this.$store.dispatch('InitMenu');
    },
    mounted:function(){
        let _this=this;
        _this.$store.state.slidbarHeight=$(window).height();
        $('.menu').css({height:_this.$store.state.slidbarHeight-43+'px'})
        // if($('.menu').height()<$('.menu').children('.one').length*50){
        //     $('.menu').css({overflowY:'scroll'})
        // }else{
        //     $('.menu').css({overflowY:'hidden'})
        // }
    },
    methods:{
        enter1:function(){
            let _this=this;     
             $('.slid1').each(function(){
                $(this).css({
                    "height":_this.$store.state.slidbarHeight-93+'px'
                })
            })
        },
        enter2: function(){
            let _this=this;
            $('.slid2').each(function(x){
                $(this).css({
                    height:_this.$store.state.slidbarHeight-93+'px'
                })
                if($(this).height()<$(this).children('.vueScroll').children('.vueScrollPanel').children('.scrollContent').children('li.three').length*50){
                    $(this).css({width:'470px'})
                }else{
                    $(this).css({width:'235px'})
                }
            })
        },
        switch(){
            this.$router.push({name:this.$store.state.url,params:{id:'default'}})//点击切换路由
        },
        uniqueArray(array1, array2){//求差集
            var result = [];
            for(var i = 0; i < array1.length; i++){
                var item = array1[i];
                var repeat = false;
                for (var j = 0; j < array2.length; j++) {
                    if (array1[i].id == array2[j].id) {//唯一key
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            return result;
        },
        storageData(childNodes,event){
            if(childNodes.length>0){
                return
            }else{
                let _this=this;
                if(event.target.getAttribute("menuurl")&&event.target.getAttribute("menuurl")!=''){
                    var flag=false;
                    if(_this.$store.state.slidbarData){
                        _this.$store.state.temporary=_this.$store.state.slidbarData;
                    }
                    var temporary=_this.$store.state.temporary;
                    var name=event.target.getAttribute("menuname");
                    var menuUrl=event.target.getAttribute("menuurl");
                    var param='default'
                    ADD_BOOKMARK(name,menuUrl,flag,param,_this);
                }
            }
            
        }     
    }
}
</script>

<style  scoped>

.slidUl{
    font-family: 'microsoft yahei';
    width: 235px;
    height: auto;
    background-color: #354052;
    visibility:hidden;
}
.slidUl:not(.slid2){
    /* transition: width 0.5s;
    -moz-transition: width 0.5s;
    -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;  */
}
.menuIcon{
    display: block;
    width: 50px;
    height: 50px;
    float: left;
    text-align: center;
    cursor: pointer;
    transition: background 0.5s;
    -moz-transition: background 0.5s;
    -webkit-transition: background 0.5s;
    -o-transition: background 0.5s; 
}

.menuIcon img{
    max-width: 20px;
    max-height: 20px;
    margin: 0 auto;
    vertical-align: middle;
}
.menu{
    visibility:visible;
    width: 235px;
    top: 50px;
    z-index:1000;
    left: 0;
    position: fixed;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s; 
}
.menuActive{
    width: 50px;
}
.menuActive .slid1{
    left: 50px;
}
.menuActive .slid1 .slid2{
    left: 285px;
}

.slid1{
    transition: left 0.5s;
    -moz-transition: left 0.5s;
    -webkit-transition: left 0.5s;
    -o-transition: left 0.5s; 
    left: 235px;
    background-color: #415c84;
    position: fixed;
    top:93px;
    visibility:hidden;
    /* opacity: 0; */
}
.slid2{
    transition: left 0.5s;
    -moz-transition: left 0.5s;
    -webkit-transition: left 0.5s;
    -o-transition: left 0.5s;
    cursor: pointer;
    left: 470px;
    position: fixed;
    top:93px;
    visibility:hidden;
}
.trans{
   -webkit-transition:all 0.5s ease;
   -moz-transition:all 0.5s ease;
   -o-transition:all 0.5s ease;
   -ms-transition:all 0.5s ease;
   transition:all 0.5s ease;
}
.menu li{
    list-style: none; 
    width: 100%;
    height: 50px;
    text-align: left;
    line-height: 46px;
    position: relative;
}
.menu .one{
    transition: border-bottom 0.5s;
    -moz-transition: border-bottom 0.5s;
    -webkit-transition: border-bottom 0.5s;
    -o-transition: border-bottom 0.5s;
    border-bottom:1px solid #26344b; 
}
.menuActive .one{
    border-bottom:none; 
}
.one:first-child{
    height: 43px;
}
.one:first-child .menuIcon{
    height: 43px;
}
.one:first-child .menuIcon img{
    max-width: 26px;
    max-height: 21px;
}
.one .versionInfo{
    z-index: 9999;
    font-size: 12px;
    color: #fff;
    background-color:#f66;
    display: block;
    position: absolute;
    width: 60px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    top: 5px;
    left: 150px;
    overflow: hidden;
    cursor: pointer;
     transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
}

.infoActive{
    left: 26px!important;
    width: 30px!important;
}
.menu .one:hover{
    background: #415c84;
    /* box-shadow: 0 4px 0 #3b4758; */
}
.menu .one:hover>a{
    color: #33cbcb;
}
    
.menu .two{
    position: relative;
}
.slid1 li a{
    display: block;
    height: 100%;
    width:calc(100% - 20px);
    padding-left: 20px;
    font-size: 12px;
    color: #c3cee0;
    text-decoration: none;
}
.oneA{
    color: #c3cee0;
    text-decoration: none;
    font-size: 12px;
    display: block;
    width:calc(100% - 50px);
    height: 100%; 
    padding-left: 0;
    float: left;
    overflow: hidden;
}
.menu li:hover{
    text-decoration: none;
}
  
.menu li.one:hover .slid1{
    /* opacity: 1; */
    /* display: block; */
    visibility:visible!important;
}
.menu li.two:hover>a{
    color: #33cbcb;
}
.menu li.two:hover .slid2{
    /* display: block; */
    width: 235px;
    visibility:visible!important;
}
.menu li.two:hover .slid2 li{
    width: 235px;
    float: left;
}
.menu li.three:hover>a{
    color: #33cbcb;
}


/* 三角形 */
.menu .two:hover .triangle{
    display: block;
}
.triangle{
    display: none;
    position: absolute;
    right: 0;
    top:calc(50% - 10px);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid #354052;
    border-bottom: 10px solid transparent;
}
.menuActive .menu_active .menuIcon{
  background-color: #3cc;
}
/* .menu::-webkit-scrollbar {
    display: none;
    width:10px;
    height:10px;
}
.menu::-webkit-scrollbar-button    {
    background-color:#354052;
}
.menu::-webkit-scrollbar-track     {
    background:#354052;
}
.menu::-webkit-scrollbar-thumb{
    background:#000;
    border-radius:4px;
}
.menu::-webkit-scrollbar-corner {
    background:#354052;
}
.menu::-webkit-scrollbar-resizer  {
    background:#354052;
}

.slid1::-webkit-scrollbar {
    display: none;
    width:10px;
    height:10px;
}
.slid1::-webkit-scrollbar-button    {
    background-color:#354052;
}
.slid1::-webkit-scrollbar-track     {
    background:#354052;
}
.slid1::-webkit-scrollbar-thumb{
    background:#000;
    border-radius:4px;
}
.slid1::-webkit-scrollbar-corner {
    background:#354052;
}
.slid1::-webkit-scrollbar-resizer  {
    background:#354052;
}

.slid2::-webkit-scrollbar {
    display: none;
    width:10px;
    height:10px;
}
.slid2::-webkit-scrollbar-button    {
    background-color:#354052;
}
.slid2::-webkit-scrollbar-track     {
    background:#354052;
}
.slid2::-webkit-scrollbar-thumb{
    background:#000;
    border-radius:4px;
}
.slid2::-webkit-scrollbar-corner {
    background:#354052;
}
.slid2::-webkit-scrollbar-resizer  {
    background:#354052;
} */
</style>
