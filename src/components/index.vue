<template>
  <div>
    <app-header></app-header>
    <div class="wrapper">
      <app-sidebar></app-sidebar>
      <app-content></app-content>
    </div>   
  </div>
</template>

<script>
import header from './header'
import sidebar from './sidebar'
import content from './content'
import store from '../store'
import axiosMethods from '../axios/index.js' //ajax封装
export default {
  name: 'index',
  components: {
    'app-header':header,
    'app-sidebar':sidebar,
    'app-content':content,
  },
  data(){
      return{
          go:0,
      }
  },
  mounted:function(){
    setInterval(function(){//计时器判断token失效时间
        let time=window.sessionStorage.getItem('TOKEN_FRESHTIME')-1;
        window.sessionStorage.setItem('TOKEN_FRESHTIME',time)
        // console.log(window.sessionStorage.getItem('TOKEN_FRESHTIME'));
        if(window.sessionStorage.getItem('TOKEN_FRESHTIME')<=100){
            let freshData = new FormData();
            freshData.append('client_id', store.state.client_id);
            freshData.append('client_secret', store.state.client_secret);
            freshData.append('grant_type','refresh_token');
            freshData.append('refresh_token',window.sessionStorage.getItem('TOKEN_FRESH_FLAG'));
            axiosMethods.instancePosts('/connect/token',freshData).then(function(res){
                            console.log("刷新"+res.access_token);
                window.sessionStorage.setItem('TOKEN_FRESHTIME',res.expires_in);//刷新时间
                window.sessionStorage.setItem('TOKEN_FRESH_FLAG',res.refresh_token);//刷新标志
                window.sessionStorage.setItem('Token','Bearer '+res.access_token);//新的token值
            });
        }
    }, 1000)
    let _this=this;
      _this.go=document.getElementById('window').offsetWidth;//页签每次移动的长度
      let content=document.getElementById('contents');//设置高度为全屏
      let height=window.innerHeight-123;
      content.style.minHeight=height+'px';
      window.onresize = function(){
        let he=window.innerHeight-123;
        content.style.minHeight=he+'px';
        _this.$store.state.slidbarHeight=$(window).height();

        $('.menu').css({height:_this.$store.state.slidbarHeight-43+'px'}) 
        $('.slid1').each(function(){
            $(this).css({
                height:_this.$store.state.slidbarHeight-93+'px'
            })
        })
        $('.slid2').each(function(x){
            $(this).css({
                height:_this.$store.state.slidbarHeight-93+'px'
            })
            if($(this).height()<$(this).children('.three').length*50){
                $(this).css({width:'470px'})
            }else{
                $(this).css({width:'235px'})
            }
        })
        $('.fixed').css({width:$('.fixed').parent('div').css('width'),})
    }
    $('.fixed').parent('div').css({position:'relative'})
    
      $(window).scroll(function(){
        if($(window).scrollTop()>61+$('.fixed').height()){
           $('.fixed').css({
              position:'fixed',
              top:'93px',
              zIndex:'998',
              backgroundColor:'#ffffff',
              width:$('.fixed').parent('div').css('width'),
              transition: 'width 0s'
            }).next('div').css({marginTop:'47px'})
        }else{
          $('.fixed').css({
            position:'relative',
            top:'0',
            backgroundColor:'#ffffff',
            width:$('.fixed').parent('div').css('width'),
            transition: 'width 0s'
          }).next('div').css({marginTop:0})
        }
      })
  },
}
</script>
<style scoped>
.wrapper{
  padding-top: 50px;
  position: relative;
  overflow: hidden;
}
</style>

