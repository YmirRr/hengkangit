<template>
<div class="member-group-data">
    <el-row class="fixed bg-white" >
        <div class="btnGroup-box">
            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
        </div>
    </el-row>
    <el-row class="bg-white pt10"> 
       <el-col :span='24' class="title-wrapper">
            <div class="title-log"> </div>
            <div class="title-mes">
                <span>用户群信息</span>
            </div>
        </el-col>
    </el-row>
    <el-row  class="bg-white">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
                <label class="show-title">用户群名称:</label>
                <el-input  placeholder="--"></el-input>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
                <label class="show-title">性别:</label>
                <el-input  placeholder="--"></el-input>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
             <div class="bgcolor">
                    <label class="show-title">会员等级:</label>
                    <el-input  placeholder="--"></el-input>
                </div>
         </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                    <label class="show-title">账户余额:</label>
                    <el-input  placeholder="--"></el-input>
                </div>
          </el-col>
           <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                 <div class="bgcolor">
                    <label class="show-title">消费金额:</label>
                    <el-input placeholder="--"></el-input>
                </div>
           </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                    <label class="show-title">用户群描述:</label>
                    <el-input placeholder="--"></el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <div class="bgcolor">
                    <label class="show-title">年龄:</label>
                    <el-input  placeholder="--"></el-input>
                </div>
             </el-col>
             <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                   <div class="bgcolor">
                        <label class="show-title">会员积分:</label>
                        <el-input  placeholder="--"></el-input>
                    </div>
             </el-col>  
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="go-member-detail">
                    <span>编辑用户群体名称>></span>
                </div>
            </el-col> 
    </el-row>
    <el-row class="bg-white pt10"> 
       <el-col :span='24' class="title-wrapper">
            <div class="title-log"> </div>
            <div class="title-mes">
                <span>数据分析</span>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'

export default {
    components:{
        buttonGroup,
    },
    created () {
        
    },
    data(){
        return{
            buttonGroup:[{
                text:'返回',
                class:'bt_back',
                icon:'icon-fanhui',
                disabled:false,
            },{
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            }],
        }
    },
    methods:{
        btnClick(btn){
            if(btn=="返回"){
                this.back();
            }else if(btn="导出"){
            }
        },
        back(){
           this.$store.state.url='/memberGroup/memberGroupList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由 
        }
    }
}
</script>
<style>
.bg-white{
    background-color:#fff;
}
.member-group-data .bgcolor .el-input__inner{
    border:none!important;
}
.member-group-data .title-wrapper{
    position: relative;
    padding-left: 20px;
}
.member-group-data .title-log{
    width: 5px;
    height: 24px;
    background: #3cc;
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 0;
}
.member-group-data .title-mes{
    display: inline-block;
    font-size: 18px;
    font-weight: bolder;
}
.member-group-data .go-member-detail{
    color: #3cc;
    font-size: 12px;
    margin-left: 22px;
    cursor: pointer;
}
</style>