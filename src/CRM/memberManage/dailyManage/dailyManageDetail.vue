<template>
    <div class="daily-manage">
        <el-row>
            <el-col :span="24">
                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>会员提现</span>
                </div>
            
                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>会员充值</span>
                </div>
            
                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>会员充次</span>
                </div>
            
                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>积分兑换</span>
                </div>

                <div class="each-block" @click="goMemberDelay">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>会员延期</span>
                </div>

                <div class="each-block" @click="goChangeCard">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>会员换卡</span>
                </div>

                <div class="each-block" @click="goStatusChange">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>状态变更</span>
                </div>

                <div class="each-block" @click="goLevelChange">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>等级变更</span>
                </div>

                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>修改密码</span>
                </div>

                <div class="each-block">
                    <img class='each-img' src="../../../../static/image/common/dailyImg.png"/>
                    <span class='each-span'>重置密码</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
   import {ADD_BOOKMARK} from '../../../common/common.js'
    export default{
        name:'dailyManageDetail',
        created:function(){

        },
        data(){
           return{
               BookMarkFlag:true,
               statusChangeName:'状态变更',
               statusChangeUrl:'statusChangeDetail',
               statusChangeParam:'default',
               memberDelayName:'会员延期',
               memberDelayUrl:'memberDelayDetail',
               memberDelayParam:'default',
               levelChangeName:'等级变更',
               levelChangeUrl:'levelChangeDetail',
               levelChangeParam:'default',
               changeCardName:'会员换卡',
               changeCardUrl:'changeCardDetail',
               changeCardParam:'default',
               
           } 
        },
        methods:{
            
            goStatusChange:function(){
                let self = this;
                ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,this.statusChangeParam,this);
                //self.$store.state.url='/statusChange/statusChangeDetail/default'
                //self.$router.push({path:this.$store.state.url})//点击切换路由
            },
            goMemberDelay:function(){
                let self = this;
                ADD_BOOKMARK(this.memberDelayName,this.memberDelayUrl,this.BookMarkFlag,this.memberDelayParam,this);
                // self.$store.state.url='/memberDelay/memberDelayDetail/default'
                // self.$router.push({path:this.$store.state.url})//点击切换路由
            },
            goLevelChange:function(){
                let self = this;
                ADD_BOOKMARK(this.levelChangeName,this.levelChangeUrl,this.BookMarkFlag,this.levelChangeParam,this);
                // self.$store.state.url='/levelChange/levelChangeDetail/default'
                // self.$router.push({path:this.$store.state.url})//点击切换路由
            },
            goChangeCard:function(){
                let self = this;
                ADD_BOOKMARK(this.changeCardName,this.changeCardUrl,this.BookMarkFlag,this.changeCardParam,this);
                // self.$store.state.url='/changeCard/changeCardDetail/default'
                // self.$router.push({path:this.$store.state.url})//点击切换路由
            },
        },
    }
</script>

<style>
.daily-manage{
    background: white;
}
.each-block{
    width: 237px;
    height: 133px;
    border:1px solid #cccccc;
    cursor: pointer;
    text-align: center;
    line-height: 133px;
    margin:20px;
    display: inline-block;
    font-size: 12px;
    position: relative;
}
.block-need{
    display:block;
}
.each-img{
    width: 36px;
    height: 24px;
    position: absolute;
    left: 100px;
    top: 55px;
}
.each-span{
    display: inline-block;
    width: 48px;
    height: 16px;
    position: absolute;
    left: 95px;
    top: 25px;
}
</style>
