<template>
    <div class="header">
            <div class="menuBtn" @click="showSide">
                <img class="bar_1" src="../../static/image/header/bar.png" alt="">
                <img class="bar_2" src="../../static/image/header/bar.png" alt="">
                <img class="bar_3" src="../../static/image/header/bar.png" alt="">
                <!-- <i class="fa fa-bars" aria-hidden="true"></i> -->
            </div>
            <div class="pageLogo">
                <a href="">
                <img src="../../static/image/login/ERP.png" alt="HKERP">
                <span>恒康智能云</span>
                </a> 
            </div>
            <!-- 搜索框 -->
            <el-autocomplete class="search" popper-class="my-autocomplete" v-model="state3" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                <i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconClick"> </i>
                <template slot-scope="restaurants">
                    <div class="name">{{ restaurants.item.value }}</div>
                    <span class="addr">{{ restaurants.item.address }}</span>
                </template>
            </el-autocomplete>
            <ul class="userInfo">
                <li class="icon">
                    <a href="javascript:;"><i class="fa fa-question-circle"></i></a>
                </li>
                <li class="icon">
                    <a href="javascript:;"><i class="fa fa-commenting-o"></i><span class="num">79</span></a>
                </li>
                <li class="user">
                    <div class="imgWrap"><img src="../assets/logo.png" alt=""></div>
                    <div class="username">
                        <span>{{loginName}}<i class="fa fa-angle-down"></i></span>   
                        <ul class="box trans">
                            <li><a @click="cancellation">注销</a></li>
                            <li><a>数据统计表</a></li>
                        </ul>     
                    </div>
                    
                </li>
            </ul>
    </div>
</template>
<script>
export default {
  name: 'appheader',
  data(){
      return{
        filterText: '',
        show:false,
        data:['系统管理','数据管理','人资管理','财务管理'],
        restaurants: [],
        state3: '',
        loginName:window.localStorage.getItem('user_name')
      }
  },
  computed: {
    username () {
      return this.$store.state.name;//获取最新的页签数组
    }
  },
   methods: {
       showSide(){
           this.$store.commit('go');
           if(this.$store.state.fixed){
               
               if(this.$store.state.show){
                //    alert(this.$store.state.show)
                    $('.fixed').css({
                        position:'fixed',
                        top:'93px',
                        zIndex:'999',
                        width:'calc(100% - 80px)',
                        transition: 'width 0.5s'
                    })
               }else{
                   $('.fixed').css({
                        position:'fixed',
                        top:'93px',
                        zIndex:'999',
                        width:'calc(100% - 265px)',
                        transition: 'width 0.5s'
                    })
               }
               
           }else{
                $('.fixed').css({
                    position:'relative',
                    top:'0',
                    width:'100%',
                    transition: 'width 0s'
                })
           }
       },
       cancellation(){
        window.sessionStorage.removeItem('_ERP');
        window.localStorage.removeItem('ERP');
        this.$store.state.name='';
        this.$store.state.accessToken='';
        this.$store.state.url='';
        this.$store.state.temporaryLogin=[];
        this.$store.state.temporary=[];
        this.$store.commit('username');
        this.$store.commit('slidbarData');
        this.$router.push({path:'/login'});
       },
        querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" }
       
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
   },
   mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
<style >
.header{
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: rgba(53, 64, 82, 1);
    z-index: 1000;
}
.header .pageLogo{
    float: left;
    width: 193px;
    height: 100%;
    position: relative;
   
}
.header .pageLogo a{
    position: relative;
    width: 70px;
    cursor: pointer;
    height: 31px;
    margin-top: 10px;
    margin-left: 15px;
    display: block;
    color: #fff;
    text-align: center;
    text-decoration: none;  
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';    
}
.header .pageLogo a img{
    width: 100%;
    height: 100%;
}
.header .pageLogo a span{
    font-size: 12px;
    position: absolute;
    right: -43px;
    bottom: -2px;
}
.header .pageLogo a:hover,.header .pageLogo a:focus{
    text-decoration: none;
}        
.menuBtn{
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    float: left;
    background-color: rgba(65, 78, 97, 1);
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 28px;
    box-shadow: 1px 1px 1px #0000005c;
}
.menuBtn img{
    position: absolute;
    left: calc(50% - 15px);
}
.menuBtn img.bar_1{
    top:29%;
}
.menuBtn img.bar_2{
    top:50%;
}
.menuBtn img.bar_3{
     top:69%;
}
/* .menuBtn:hover{
    opacity: 1;
    filter: alpha(opacity=100);
} */

/* 搜索框 */
.header .search{
    width: 340px;
    height: 40px;
    float: left;
    margin-top: 5px;
    border-radius: 40px;
    overflow: visible;
    position: relative;
}

.header .search .el-input__inner{
    height: 40px;
    border-radius: 20px;
    background: #26344b;
    border: 0;
}
.my-autocomplete li {
    line-height: normal;
    padding: 7px;
}
.my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
}
.my-autocomplete .addr {
    font-size: 12px;
    color: #b4b4b4;
}

.highlighted .addr {
    color: #ddd;
}
/*  */
.userInfo{
float: right;
width: 360px;
height: 100%;
}
.userInfo>li{
    float: left;
    list-style: none;
    width: 50px;
    height: 100%;
    position: relative;
}

.userInfo>li.icon i{
    color: #fff;
}
.userInfo>li.user .username:hover .box{
    visibility: visible
}
.userInfo>li.user .username .box{
   width: 200px;
   position: absolute;
   list-style: none;
   right: 0;
   top: 50px; 
   visibility: hidden;
}
.trans{
   -webkit-transition:all 0.5s ease;
   -moz-transition:all 0.5s ease;
   -o-transition:all 0.5s ease;
   -ms-transition:all 0.5s ease;
   transition:all 0.5s ease;
}
.userInfo>li.user .username .box li a{
    display: block;
    font-size: 13px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    background-color: #fff;
    border-top: 1px solid #80808021;
}
.userInfo>li.user .username .box li:first-child a{
    border-top: none;
}
.userInfo>li.user .username .box li a:hover{
    background-color: #f2f2f2;
}
.userInfo>li.user{
    width: 120px;
    margin-left: 50px;
}
.userInfo>li.user .username{
    position: relative;
    cursor: pointer;
    float: left;
    height: 100%;
    width: calc(100% - 44px);
    text-align: center;
    overflow: visible;
}
.userInfo>li.user .username span{
    line-height: 50px;
    font-size: 13px;
    color: #fff;
}
.userInfo>li.user .username span i{
    font-size: 14px;
}
.userInfo>li.user .username span i{
    margin-left: 10px;
    color: grey;
}
.userInfo>li.user .imgWrap{
    float: left;
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
    background-color: #fff;
    margin-top: 3px;
}
.userInfo>li.user .imgWrap img{
    width: 100%;
    height: 100%;
}
.userInfo>li>a{
    display: block;
    width: 100%;
    height: 100%;
    color: #000;
    text-decoration: none;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    
}
.num{
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    top: 5px;
    right:0 ;
    color: #fff;
    border-radius: 50%;
    background-color:#33CCCC; 
}



</style>
