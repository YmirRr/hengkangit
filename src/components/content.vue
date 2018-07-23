<template>
    <div class="contentWrapper" :class="{contentActive : $store.state.show}">
            <div class="routerContain" :class="{routerActive : $store.state.show}">
                <!-- LODOP打印 -->
                <object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
                    <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 />
                </object>
                <button class="goLeft" @click="left">
                    <!-- <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> -->
                    <img src="../../static/image/content/go.png">
                </button>
                <div class="homePage"> <router-link to="/home">首页</router-link></div>
                <div id="window">
                    <div id="longWidth">
                        <ul id="routerBox">
                            <li v-for="(i,index) in count" :key="index" class="routerBtn addBtn">
                                <!-- <router-link :to="{name:i.url,params:{id:i.params}}">{{i.name}}</router-link> -->
                                <router-link :to="{name:i.url,params:{id:i.id}}">{{i.name}}</router-link>
                                <!-- <router-link :to="{name:i.url,params:{id:'default'},query:{routeID:i.routeID}}">{{i.name}}</router-link> -->
                                <span class="closes" :menuurl="i.url" @click="close" :name="i.name" :index="index">×</span>
                                <!-- <i class="el-icon-error closes" :menuurl="i.url" @click="close" :name="i.name" :index="index"></i> -->
                            </li>
                        </ul>
                    </div>  
                </div>
                <button class="goRight" @click="right">
                    <!-- <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> -->
                    <img src="../../static/image/content/go.png">
                </button>
                <div class="goClose"><span>关闭操作<i class="fa fa-angle-up" aria-hidden="true"></i></span></div>
            </div>    
            <div class="contents" id="contents">
                <div class="whiteBg">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>   
            </div>
    </div>
</template>
<script>
export default {
  name: 'appcontent',
  computed: {
    count () {
      return this.$store.state.slidbarData;//获取最新的页签数组
    }
  },
  data(){
      return{
          x:0,
          go:500,
          n:1,//点击次数
      }
  },
  created(){
      
  },
  methods:{
      right:function(){
        if(!$('#longWidth').is(":animated")){ 
            let left=parseInt($('#longWidth').css('left'))
            let width=document.getElementById('routerBox').offsetWidth;

            if(left-this.go+width<0){
                return false
            }else{
                this.x-=this.go;
                $("#longWidth").animate({left:this.x+'px'},500);
                // document.getElementById('longWidth').style.left= this.x+'px';
            }
        }    
      },
      left:function(){
            if(!$('#longWidth').is(":animated")){ 
                let left=parseInt($('#longWidth').css('left'));
                if(left<0){
                    this.x+=this.go;
                    $("#longWidth").animate({left:this.x+'px'},500);
                    // document.getElementById('longWidth').style.left=this.x+'px';
                }else{
                    return false
                }
            }
        
      },
      close:function(e){
          let nowIndex=e.target.getAttribute('index');//close元素上面绑定的index
          let elClose=document.getElementsByClassName('closes');
          let elA=document.querySelectorAll('.addBtn a');
            if(this.$store.state.slidbarData){
                this.$store.state.temporary=this.$store.state.slidbarData;
            }
          let temporary=this.$store.state.temporary; 
          let index;
          let previousIndex;//
         for(let i=0;i<elClose.length;i++){//获取点击关闭按钮时，点击的多项在元素.close数组里的下标
             if(elClose[i].getAttribute("index")==nowIndex){
                 previousIndex=i-1;
                 index=i;
             }
         }
         if(previousIndex>=0&&this.hasClass(elA[index],'active')){//判断前一个路由按钮index是否存在，判断当前路由按钮是否激活
                 let url=elClose[previousIndex].getAttribute('menuurl');
                 this.$router.push({name:url,params:{id:'default'}})//点击切换路由
         }else if(previousIndex==-1&&this.hasClass(elA[0],'active')){
             this.$router.push({path:'/home'})
         }
         temporary.splice(nowIndex,1);//储存页签数组里删除当前页签
         window.localStorage.setItem('ERP',JSON.stringify(temporary));
         this.$store.commit('slidbarData');


        this.$store.state.routes[e.target.getAttribute('menuurl')].url=this.$store.state.routes[e.target.getAttribute('menuurl')].default;//关闭时取消路由重定向
        // for(let i=0;i<activeRouter.length;i++){
        //     if(activeRouter[i].name==e.target.getAttribute('menuurl')){
        //         activeRouter[i].url=activeRouter[i].default
        //         break;
        //     }
        // }
       
      },
      hasClass:function(obj, cls){
        let obj_class = obj.className,//获取 class 内容.
        obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
        let x = 0;
        for(x in obj_class_lst) {
            if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
            }
        }
        return false;
      }
  }
}
</script>
<style  scoped>
.goLeft,.goRight{
     width: 50px;
     height: 43px;
     border: none;
     outline: none;
     background-color: #C9D1D1;
     color: #797979;
     font-size: 25px;
     cursor: pointer;
}
.goLeft:hover,.goRight:hover{
    color: #33CCCC;
}
.goRight{
    margin-right: 1px;
}  
.homePage{
    height: 100%;
    background-color: #C9D1D1;
}
.homePage a{
    display: block;
    width: 50px;
    text-decoration: none;
    height: 100%;
    font-size: 12px;
    text-align: center;
    line-height: 43px;
    color: #333333;
}
.goClose{
    width: 86px;
    height: 43px;
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: 43px;
    background-color: #C9D1D1;
    cursor: pointer;
}
.goLeft,
.homePage,
#window,
.goRight,
.goClose{
    float: left;
}
.contentWrapper{
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    background-color: #414e61;
    /* width: calc(100% - 235px); */
    padding-left: 235px;
}
.contentActive{
    /* width: calc(100% - 50px); */
    padding-left:50px;
}
.contents{
    padding: 15px 0;
    background-color:#eef1f5;
    width: 100%;
    margin-top: 43px;
}
.whiteBg{
    width:calc(100% - 30px);
    margin-left: 15px;
}
.routerContain{
    position: fixed;
    width: calc(100% - 235px);
    top: 50px;
    font-family: 'microsoft yahei';
    height: 43px;
    background-color: #eef1f5;
    z-index: 999;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
}
.routerActive{
    width: calc(100% - 50px);
}
.routerContain .goLeft img{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
}
#window{
    overflow: hidden;
    position: relative;
    width: calc(100% - 238px);
    height: 100%;
    background-color: #C9D1D1;
    margin-left: 1px;
}
#window #longWidth{
    width: 100000px;
    position: relative;
    /* transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;  */
    left: 0;
}
#window #routerBox{
    left: 0;
    position: absolute;
    height: 100%;
    width: auto;
}
#window #routerBox .routerBtn{
    height: 100%;
    position: relative;
    display: inline-block;
    list-style: none;
}


#window #routerBox .routerBtn .closes{
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 3px;
    right: 0;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    line-height: 12px;
    cursor: pointer;
}
#window #routerBox .routerBtn a{
    position: relative;
    margin-top: 3px;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    margin-right: 0;
    display: block;
    background-color: #C9D1D1;
    color: #333333;
    font-size: 12px;
    text-decoration: none;
}
#window #routerBox .routerBtn a:hover{
	background: rgba(255,255,255,.3);
}
#window #routerBox .routerBtn:hover .closes{
	color: #fff;
    background-color: #f55e6e;
}
#window #routerBox .routerBtn a.active {
    color: #33CCCC;
    background-color: #eef1f5;
}
#window #routerBox .routerBtn a.active+.closes{
    color: #fff;
    background-color: #f55e6e;
}
.homePage a.active{
     color: #33CCCC;
    background-color: #eef1f5;
}

</style>
