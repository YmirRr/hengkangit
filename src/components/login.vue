<template>
    <el-row class="loginWrapper" id="loginWrapper">
        
        <el-col :xm="24" :sm="12" :md="13" :lg="13" :xl="15" class="leftDiv">
             <el-col :span="24">
                <el-col :span="10" class="ERP" :offset="1">
                    <span>恒康智能云</span>
                </el-col>
            </el-col>
        </el-col>
        <el-col :sm="12" :md="11" :lg="11" :xl="9" type="flex" class="row-bg loginForm" justify="center">
           
            <div class="code">
                 <img src="../../static/image/login/QRcode.png">
            </div>
            
            <el-row type="flex" class="row-bg topr" justify="end">
			  <el-col class="choose"><img src="../../static/image/login/setting.png" alt="设置"><span>设置</span></el-col>
			  <el-col class="choose"><img src="../../static/image/login/language.png" alt="语言"><span>语言</span></el-col>
			</el-row>
            
            <el-col :sm="12" :md="12" :lg="12" :xl="12" :offset="6" class="lgbox">   
            	<el-col class="lgfrom">
                <el-col class="formInput name">
                    <el-input placeholder="用户名" v-model="login.username"></el-input>
                </el-col>
                <el-col class="formInput psw">
                   <el-input placeholder="密码" type="password" @keyup.enter.native='loginAjax' v-model="login.password"></el-input>
                </el-col>
                <el-col class="formInput bt">
                   <button @click="loginAjax">登&nbsp;&nbsp;录</button> 
                </el-col>
                <el-col class="formInput go">
                    <div class="operate">
                        <el-col :span="12" class="remember">
                            <i class="fa fa-check-circle" aria-hidden="true" :class="{check : ischecked}" @click="ischecked = !ischecked"></i>
                            <span @click="ischecked = !ischecked">记住密码</span>
                        </el-col>
                        <el-col :span="12" class="forget"><span @click="goRegister">忘记密码</span></el-col>
                    </div>
                   
                </el-col>
                <el-col class="formInput thirdParty">
                    <div class="thirds">
                        <el-col :span="2" :offset="4">
                            <hr>
                        </el-col>  
                        <el-col :span="12">
                            <span>使用第三方账号登录</span>
                        </el-col> 
                        <el-col :span="2">
                            <hr>
                        </el-col>   
                    </div>    
                </el-col>
                <el-col class="formInput lg">
                    <div class="thirdLogo">
                        <div class="circleLogin weChat" alt="微信"></div>
                        <div class="circleLogin DD" alt="钉钉"></div>
                        <div class="circleLogin QQ" alt="QQ"></div>
                    </div>    
                </el-col>
            	</el-col>
            </el-col>
                <el-col :span="24" class="copyright">
                    <p>版权制作 广州恒康信息科技有限公司</p>
                </el-col>
        </el-col>
    </el-row>
</template>
<script>
export default {
  data(){
      return{
          ischecked:false,
          login:{
              client_id:'HKERP2.0',
              client_secret:'ClientKey',
              grant_type:'password',
              username:'',
              password:'',
          }
      }
  },
  mounted:function(){//设置高度为全屏
    let body=document.getElementsByTagName('body')[0];
    let h=window.innerHeight;
    body.style.height=h+'px';
    window.onresize = function(){
        let height=window.innerHeight;
        body.style.height=height+'px';
    }
  },
  methods:{
      switch(url){
            this.$router.push(url);//点击切换路由
        },
      loginAjax:function(){
          //判断用户名与密码是否为空
        if(this.login.username==''||this.login.password==""){
            this.$message({
                showClose: true,
                message: '请检查用户名、密码是否填写！',
                type: 'error'
                });
        }else{
            let _this=this;
            window.localStorage.setItem('user_name',_this.login.username);
            window.localStorage.setItem('pass_word',_this.login.password);
            //if(表单验证通过)发送ajax
            let data = new FormData();
            data.append('client_id', _this.$store.state.client_id);
            data.append('client_secret', _this.$store.state.client_secret);
            data.append('grant_type', _this.$store.state.grant_type);
            data.append('username',window.localStorage.getItem('user_name'));
            data.append('password',window.localStorage.getItem('pass_word'));
            console.log(data);
            this.$store.dispatch("userLogin",data);
        }
          
      },
      getOuId:function(){//获取组织单元id
        let _this = this;
        //获取当前默认ouid
        _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
            _this.$store.commit('Init_OuId',res.result.id);//设置删除参数为真
            console.log(_this.$store.state.OuId);
        },function(err){
            _this.$message({
                type: 'warning',
                message: err.error.message
            });
        });
    },
    goRegister:function(){
        this.$router.push('/register');//点击切换路由
    }
   },
}
</script>
<style scoped>
	.topr{padding-right: 1.5rem;position: fixed;right: 0px;}
    .loginWrapper .loginForm .lgbox{position: relative;height: 100%;}
    .loginWrapper .loginForm .lgfrom{position:absolute;top:50%;margin-top: -180px;min-width: 288px;}
    .loginWrapper{
        width: 100%;
        height: 100%;
        background-image: url(../../static/image/login/bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .loginWrapper .leftDiv{
        position: relative;
        /*width: 51%;
        float: left;*/
        height: 100%;
        background-image: url(../../static/image/login/product.png);
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center;
    }
    .loginWrapper .loginForm{
        /*float: left;
        width: 49%;*/
        height: 100%;
        background-repeat: no-repeat;
        background-position: right bottom;
        background-color: #0000006e;
        -moz-user-select:none;
        -webkit-user-select:none;
        user-select:none;
        z-index: 99;
        position: relative;
    }
    .loginWrapper .code{
        overflow: hidden;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right bottom;
        background-image: url(../../static/image/login/code.png)
    }
    .loginWrapper .code img{
        position: relative;
        right: 0;
        bottom: 0;
        width: 100%;;
    }
    .loginWrapper .loginForm .choose{
        float: right;
        cursor: pointer;
        margin-top: 2rem!important;
        margin-top: 20px;
        width: auto;
		padding-left: 1rem;
		padding-right: 1rem;
    }
    .loginWrapper .loginForm .choose span{
        font-size: 16px;
        color: #fff;
        font-weight: 400;
        line-height: 15px;
    }
    .loginWrapper .loginForm .choose img{
        vertical-align: sub;
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }
    .loginWrapper .ERP{
        position: relative;
        height: 54px;
        width: 124px;
        background-image: url(../../static/image/login/ERP.png);
        background-repeat: no-repeat;
        background-size: contain;
        margin-top: 2rem!important;
        margin-top:20px;        
    }
    .loginWrapper .ERP span{
        color: #fff;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        right: -30px;
    }
    .loginWrapper .formInput{
        /*position: absolute;*/
       margin-bottom: 1rem!important;
       margin-bottom:18px ;
    }
    /*.loginWrapper .formInput.name{
        bottom: 66%;
    }
    .loginWrapper .formInput.psw{
        bottom: 60%;
    }
    .loginWrapper .formInput.bt{
        bottom: 51%;
    }
    .loginWrapper .formInput.go{
        bottom: 47%;
    }
    .loginWrapper .formInput.thirdParty{
        bottom: 40%;
    }
    .loginWrapper .formInput.lg{
        bottom: 30%;
    }*/
     .loginWrapper .copyright{
        position: absolute;
        bottom: 6%;
    }
    .loginWrapper .formInput .el-input,
    .loginWrapper .formInput button,
    .loginWrapper .operate{
        /*width: 70%;
        left: 15%;*/
        position: relative;
    }

    .loginWrapper .formInput button{
        -webkit-appearance: none;
        background-color: #3cc;
        color: #fff!important;
        border-radius: 4px;
        border: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        width: 100%;
        line-height: 1;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: background-color .2s cubic-bezier(.645,.045,.355,1);
        transition: background-color .2s cubic-bezier(.645,.045,.355,1);
        margin: auto;
        cursor: pointer;
    }
    .loginWrapper .formInput button:hover{
        background-color: #20e4e4;
    }
    .loginWrapper .remember{
        color: #fff;
    }
    .loginWrapper .remember i{
        vertical-align: middle;
        font-size: 20px;
        cursor: pointer;
    }
    .loginWrapper .remember span,.loginWrapper .forget span{
        font-size: 12px;
        cursor: pointer;    
    }
    .loginWrapper .forget{
        color: #fff;
        text-align: right;
    }
    .loginWrapper .check{
       
        color: #20e4e4;
    }
    .loginWrapper .thirdParty{
        color: #fff;
        text-align: center;
    }
    .loginWrapper .thirdParty .thirds{
        /*width: 40%;*/
        position: relative;
        margin: auto;
    }
    .loginWrapper .thirdLogo{
        /*width: 26%;*/
        margin: auto;
        overflow: hidden;
        position: relative;
        min-height: 58px    ;text-align: center;
    }
    .loginWrapper .circleLogin{
        width: 58px;
        height: 58px;
        background-color: #fff;
        border-radius: 50%;
        background-size: 55%;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        display: inline-block;margin: 1rem;
        /*position: absolute;*/
    }
    
    /*.loginWrapper .circleLogin:first-child{
        margin-left: 0;
    }*/
    .weChat{
        background-image: url(../../static/image/login/wechat.png);
        left: 0;
        
    }
    .DD{
        background-image: url(../../static/image/login/DD.png);
        left: calc(50% - 29px);
    }
    .QQ{
        background-image: url(../../static/image/login/QQ.png);
        right: 0;
    }
    .loginWrapper .copyright p{
        font-size: 12px;
        color: #fff;
        text-align: center;
    }
</style>

