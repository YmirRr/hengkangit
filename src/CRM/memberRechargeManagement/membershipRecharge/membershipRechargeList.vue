<template>
    <div class="mem-recharge-list">
         <!--搜索框  -->
         <div class="tipsWrapper">
                <div class="errorTips">
                        <p class="msgDetail">
                            <span :class="validation.hasError('addData.channelId')?'block':'none'">
                                操作渠道第二个{{ validation.firstError('addData.channelId') }},
                            </span>
                            <span :class="validation.hasError('addData.channelTypeId')?'block':'none'">
                                操作渠道第一个{{ validation.firstError('addData.channelTypeId') }},
                            </span>
                        </p>
                </div>
            </div>
        <el-row class="bg-white mb10 border-bottom">
            
            <el-col>
                <div class="bgcolor withbtn mt10 ">
                    <label class="fb">选择会员</label>
                    <div @keyup.enter="search">
                    <el-input placeholder="卡号 手机号" v-model="info"  class="info" @focus="showErrprTips"></el-input>
                    </div>
                    <span class="sure" @click="search">确定</span>
                </div> 
            </el-col>
             <el-col>
                <div class="wrongWrapper">
                    <span>卡号不能为空</span>
                </div>
            </el-col>
        </el-row>
        <!-- 会员信息 -->
        <el-row class="bg-white">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                 <div class="bgcolor mem-info">
                    <label>会员姓名</label>
                   <el-input v-model="memberInfo.memberName" placeholder="- -" readonly></el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>手机号码</label>
                    <el-input v-model="memberInfo.moblie" placeholder="- -" readonly></el-input>
                
                </div>
             </el-col >
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>会员卡号</label>
                    <el-input v-model="memberInfo.cardCode" placeholder="- -" readonly></el-input>
            
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>会员等级</label>
                    <el-input v-model="memberInfo.gradeId_GradeName" placeholder="- -" readonly></el-input>
                  
                </div>
             </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>卡状态</label>
                    <el-input v-model="memberInfo.statusTValue" placeholder="- -" readonly></el-input>
                     
                </div>
           </el-col>
           <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>账户余额</label>
                    <el-input v-model="memberInfo.amount" placeholder="- -" readonly></el-input>
                
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>账户积分</label>
                    <el-input v-model="memberInfo.integral" placeholder="- -" readonly></el-input>
                 
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor mem-info">
                    <label>有效期</label>
                    <el-input v-model="memberInfo.effectiveTime" placeholder="- -" readonly></el-input>
                </div>
            </el-col>
                <div class="bgcolor mem-info mem-tag">
                    <label>会员标签</label>
                    <button>有范</button>
                    <button>时尚</button>
                </div>
               <div class="bgcolor mem-detail">
                    <p @click="goMemberDetail()"  v-show='!ifClick' class="search-member">查看会员资料>></p>
                    <p  v-show='ifClick'>查看会员资料>></p>
                </div>
        </el-row>
         <!-- 充值金额 -->
        <div class="bg-white mt15">
            <el-row>
                <el-col class="mt10" >
                    <label class="racharge-deno">充值金额</label>
                    <el-radio-group v-model="addData.rechargeAmount" @change="rechargeAmountChange">
                        <el-radio-button v-for="item in Denomination" :label="item.denomination" :key="item.id" :value="item.id"></el-radio-button>
                    </el-radio-group>
                    <div class="go-deno" @click="goDenomination" >自定义金额</div>
                    <div class="defined-deno close-tab" v-if="showOrHide==true">
                        <i class="el-icon el-icon-circle-close" @click="hide"></i>
                        <input v-model="rechargeAmount" @blur="sure" class="focus" @keyup.enter="sure"/>
                        <!-- <p class="pt5 pb5" v-if="rechargeAmountVal==''&&addData.presentAmount==''">实际到账--元</p><p class="pt5 pb5"v-else >实际到账 ：{{actualAccount}}元</p> -->
                        <p class="color-red">输入不合法,请输入大于0的数字!</p>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <label class="racharge-deno"></label>
                    <div class="show-recharge mt15">
                            <el-col :span="8" class="pl15" >
                                <p>当前充值金额</p>
                                <el-input v-model="addData.rechargeAmount" readonly></el-input>
                            
                            </el-col>
                            <el-col :span="8">
                                <p>赠送金额</p>
                                 <el-input v-model="addData.presentAmount"  readonly></el-input>
                            </el-col>
                            <el-col :span="8">
                                    <p>本次积分</p>
                                    <el-input v-model="addData.thisIntegral" readonly></el-input>
                            </el-col>
                        </div>
                </el-col>
            </el-row>
            <el-row class="mt10 mb10 pb20">
                <el-col>
                    <label class="racharge-deno">充值活动</label>
                    <el-select v-model="addData.activityId" @change="selectChange" filterable   :filter-method="filterMethod">
                        <el-option v-for="item in actArray" :key="item.activityNo" :label="item.activityName" :value="item.activityNo">
                            <span >{{ item.activityName }}</span>
                            <span >{{ item.activityNo }}</span>
                        </el-option>
                        
                    </el-select>
                </el-col >
            </el-row>
        </div>
        <el-row class="bg-white mt15">
            <el-col>
                <label class="racharge-deno title">活动信息</label>
                <div class="action-message mt15 pl10">
                    <p v-if="ActivityOpt==''">活动名称：--；</p><p v-else>活动名称：{{ActivityOpt}}；</p>
                    <p v-if="addData.presentAmount == ''">赠送金额：--，有效期至：--；</p><p v-else>赠送金额：{{addData.presentAmount}}，有效期至：{{effectiveEnd}}；</p>
                    <p v-if=" presentIntegral === '' ">赠送积分--</p><p v-else>赠送积分：{{presentIntegral}}</p>
                </div>
            </el-col>
            <el-col>
                <div class="bgcolor pt10 channel-type">
                    <label><small>*</small>操作渠道</label>
                    <el-select v-model="addData.channelTypeId" filterable clearable  :filter-method="filterMethod1"
                               @change='getChannelByType(addData.channelTypeId)'
                               placeholder="":class="{redBorder : validation.hasError('addData.channelTypeId')}">
                        <el-option v-for="item in channel" 
                                   :key="item.itemValue" 
                                   :label="item.itemName" 
                                   :value="item.itemValue">
                            <span >{{ item.itemName }}</span>
                            <span >{{ item.itemCode }}</span>
                        </el-option>
                    </el-select>

                    <el-select v-model="addData.channelId" filterable clearable  :filter-method="filterMethod2"
                               placeholder="" :class="{redBorder : validation.hasError('addData.channelId')}"
                               class="channel-style">
                        <el-option v-for="item in shopAr" 
                                   :key="item.id" 
                                   :label="item.channelName" 
                                   :value="item.id"
                                    >
                            <span >{{ item.channelName }}</span>
                            <span >{{ item.channelCode }}</span>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col>
                <div class="bgcolor pt10">
                    <label>营业员</label>
                    <el-select v-model="addData.personnelId" filterable clearable :filter-method="filterMethod3" @change="changePersonValue">
                        <el-option v-for="item in PersonArr" :key="item.id" :label="item.employeeName" :value="item.id">
                            <span >{{ item.employeeName }}</span>
                            <span >{{ item.employeeCode }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor pt10">
                    <label>操作员</label>
                    <el-input disabled v-model="addData.createBy"></el-input>
                </div>
            </el-col>
            <el-col class="mt10 mb15">
                <div class="bgcolor  remark">
                    <label class="racharge-deno">备注</label>
                    <el-input v-model="addData.remark"></el-input>
                </div> 
            </el-col>
        </el-row>
        <el-row class="mem-tag">
             <el-col class="mt10 mb15">
                <div class="bgcolor mem-info button-group">
                    <label></label>
                    <button class="balance1" v-show='!ifSearch'>结算</button>
                    <button class="balance" @click="balance" v-show='ifSearch'>结算</button>
                   
                    <button class="recharge-record" @click="record">充值记录</button>
                </div> 
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogBalanceConfirm" title="POS结账" class="transfer_dialog" width="35%">
            <el-col style="position: relative;">
                <el-row class="dialog-box">
                    <div class="defined-deno dialog-input">
                        <input />
                        <span class="sure">确定</span>             
                    </div>
                </el-row>
                
            </el-col>
             <el-row class="mt30 pay-list">
                <el-col :span="16" class="pt20 pay-list-info">
                    <el-col :span="6" class="pl15">
                        <span>应收</span>
                         <p class="color-green">60</p>
                    </el-col>
                    <el-col :span="6" class="pl15">
                        <span>实收</span>
                        <p class="color-pink">40</p>
                    </el-col>
                    <el-col :span="6" class="pl15">
                        <span>欠</span>
                         <p class="color-orange">20</p>
                    </el-col>
                    <el-col :span="6" class="pl15">
                        <span>找零</span>
                        <p class="color-blue">0</p>
                    </el-col>
                    <div class="pl10 bg-gary">
                        <el-col>
                            <el-col :span="12">现金</el-col>
                            <el-col :span="12">--</el-col>
                        </el-col>
                        <el-col>
                            <el-col :span="12">支付宝</el-col>
                            <el-col :span="12">--</el-col>
                        </el-col>
                        <el-col>
                            <el-col :span="12">微信</el-col>
                            <el-col :span="12">--</el-col>
                        </el-col>
                        <el-col>
                            <el-col :span="12">银行卡</el-col>
                            <el-col :span="12">--</el-col>
                        </el-col>
                     </div>
                    </el-col>
                </el-col>
                <el-col :span="8" class="payment">
                        <el-col class="pb20 pt20">其他支付方式</el-col>
                        <el-col>
                            <el-col :span="8"><i class="iconfont icon-cash"></i><span>现金</span></el-col>
                            <el-col :span="8"><i class="iconfont icon-alipay"></i><span>支付宝</span></el-col>
                            <el-col :span="8"><i class="iconfont icon-wechat"></i><span>微信</span></el-col>
                            <el-col :span="8" class="pt10"><i class="iconfont icon-bankcard"></i><span>银行卡</span></el-col>
                        </el-col>
                    </el-col>
                 </el-col>
                 <el-col :span="12">

                 </el-col>
             </el-row>
            <span slot="footer">
            </span>
        </el-dialog>
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>        
    </div>
</template>
<script>
import dialogBox from '../../../base/dialog/dialog'
import {ADD_BOOKMARK,FILTER_MOTHED} from '../../../common/common.js'
import {GetDateTime,loadSelect} from '../../../common/dom.js'//单页面增删改
import config from '../../../../static/config';
export default {
    
    data () {
      return {
        firstModify:false,
        ifModify:false,
        ifSearch:false,
        ifClick:true,
        radio3: '100',
        radio4: '200',
        radio5: '1000',
        radio6: '500',
        info:'',
        memberInfo:"",
        effectiveEnd:"",//有效期
        Denomination1:[],
        Denomination:[],
        Person:[],//营业员
        ChannelOpt:[],//操作渠道
        presentIntegral:'',//赠送积分
        rechargeAmount:"",//充值金额
        rechargeAmountVal:"",
        memberId:"",//会员的id
        crmActRechrule:[],
        groupId:"",//当前组织
        ActivityOpt:'',//充值活动
        actArr:[],//活动的值
        dialogBalanceConfirm:false,
        addData:{
            "groupId": 0,
            "billNo": "",//单号
            "billTypeId":2,//单据类型
            "rechargeTypeid": 1,//变动类型
            "rechargeSource": 3,//数据来源
            "memberId":0,//会员ID
            "rechargeAmount":0,//充值金额
            "currenctyID": 0,//币种
            "thisIntegral":0,//本次积分
            "activityId":"",//充值活动ID
            "activityName": "",//充值活动
            "presentAmount":0,//赠送金额
            "presentNote": "",//赠送说明
            "rechargeDiscount": 0,//充值折扣
            "ouId": 0,//组织ID
            "channelTypeId": 1,//渠道类型
            "channelId": '',//操作渠道
            "personnelName":"",
            "createBy":window.localStorage.getItem('user_name'),//操作员
            "personnelId":'',//营业员
            "remark": "",//备注
            "rechargeTypes": [
                {
                "billNo": "",//单号
                "payTypeId": 0,//充值结算方式
                "currencyId": 0,//币种
                "payAmount":0//结算金额
                }
            ]
        },
        rechargeAmount1:'',
        actualAccount:"",//实际到账
        showOrHide:false,//自定义面额
        savemeberId:'',
        BookMarkFlag:true,
        statusChangeName:'会员资料',
        statusChangeUrl:'memberInformationDetail',
        statusChangeParam:1,
        statusChangeNameRecord:'充值记录',
        statusChangeUrlRecord:'rechargeRecordList',
          //弹框-----------------------
        dialogCommand:[],//底部按钮组控制组
        dialogVisible:false,
        errorTips:{//对话框 错误提示
            message:'',
            details:'',
        },
        dialogSetting:{
            message:'',//提示信息
            dialogName:'',//对话框名称
            dialogType:'',//对话框类型
        },
        gradeId:"",
        depositAmount:'',//储值多少元
        depositPresentIntegral:"",//换多少积分
        defaultGroupId:'',
        OuId:'',
        channelAr:[],
        shopArByType:[],
        defaultOuId:"",
        filterKey:'',
        filterKey1:'',
        filterKey2:'',
        filterKey3:'',
      }
    },
    created:function(){
        let _this=this;
        _this.loadCurrentUser();//加载grounpId
        // _this.loadDenomination();//加载充值面额
        _this.loadPerson();//加载营业员员
        _this.isdefault(this.$route.params.id);
        _this.getChannel();
    },
     computed:{
       actArray: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.actArr)
      },
      channel:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey1,this.channelAr)
      },
     shopAr:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey2,this.shopArByType)
      },
      PersonArr:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey3,this.Person)
      },
  },
     validators: {
        'addData.channelId': function (value) {//操作渠道
            return this.Validator.value(value).required();
        },
         'addData.channelTypeId': function (value) {//操作渠道
            return this.Validator.value(value).required();
        },
       
     },
    watch:{
         defaultGroupId:{
            handler:function(){
                let self = this;
                if(self.defaultGroupId!=''){
                    self.loadDenomination();
                    if(self.defaultOuId!=''){
                        if(self.shopArByType.length<=0){
                            self.getDefaultChannelByType();
                            
                        }
                    }
                }
            },
            deep:true,
        },
        defaultOuId:{
            handler:function(){
                let self = this;
                if(self.defaultOuId!=''){
                    if(self.defaultGroupId!=''){
                        if(self.shopArByType.length<=0){
                            self.getDefaultChannelByType();
                        }
                    }
                }
            },
            deep:true,
        },
          $route(to){
            let _this=this;
            if(to.params.id!='default'){
                this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberInfo',{memberID:to.params.id}).then(function(res){
                    console.log(res.result)
                    _this.info='';
                    _this.memberInfo=res.result;
                    _this.ifClick=false;
                   
                },function(err){
                    console.log(err)
                })
            }else{
                _this.info='';
                _this.memberInfo='';
            }        
        }
    },
     methods:{
        filterMethod(query){
           this.filterKey=query; 
        },
        filterMethod1(query){
           this.filterKey1=query; 

        },
        filterMethod2(query){
           this.filterKey2=query; 
        },
        filterMethod3(query){
           this.filterKey3=query; 
        },
        changePersonValue(val){
            let obj = {};
            obj = this.PersonArr.find((item)=>{
                return item.id === val;
            });
            this.addData.personnelName = obj.employeeName;
            console.log(this.addData.personnelName)
        },
         rechargeAmountChange(val){
             if(this.memberId!=''){
                this.rechargeAmountVal=val;
                this.rechargeAmount='';
                this.sureAll();
                this.showOrHide=false;
             }else{
                  this.$message({
                    type: 'error',
                    message: '请输入充值会员的卡号或手机号!'
                  
             })
               this.addData.rechargeAmount=0;
             }
             this.showOrHide=false;
             this.rechargeAmount='';
            $(".el-radio-button__orig-radio:checked+.el-radio-button__inner").css({"background-color":"#3cc","color":"#fff"});
            $(".go-deno").css({"background-color":"#fff","color":"#3cc"});
         },
          isdefault(id){
            let _this=this;
            console.log(_this.$route.params.id)
            if(id!='default'){
                _this.ifClick=false;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/Get',{id:_this.$route.params.id}).then(function(res){
                      
                    _this.info='';
                    _this.memberInfo=res.result;
                },function(err){
                    console.log(err)
                })
            }else{
                  _this.ifClick=true;
                 _this.memberInfo='';
                 _this.info='';
            }
        },
        //  ----------------------------加载充值面额----------------------------------------
         loadDenomination:function(){
             let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/DenominationManagement/GetRechargeDenomination",{GroupID:_this.defaultGroupId,Platform:2,Status:1}).then(res => {
                _this.Denomination=res.result;
               
                })
         },
         //---------------------------------加载营业员员----------------------------------------------
         loadPerson:function(){
                let _this=this;
                _this.$axios.gets("/api/services/app/EmployeeManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.Person=res.result.items;
                 }) ;
         },
 //---open---路由切换--------------------------------------
        open(tittle,iconClass,className) {
            this.$notify({
            position: 'bottom-right',
            iconClass:iconClass,
            title: tittle,
            showClose: false,
            duration: 3000,
            customClass:className
            });
        },
          search(){
              if(this.info!=''){
                   this.getDataList();
                   if(this.rechargeAmountVal!=''){
                      this.sureAll();
                   }
                   
              }else{
                   this.$message({
                    type: 'warning',
                    message: '卡号不能为空' 
                });
                //  $('.wrongWrapper').css({display:'block'})
              }
           
          },
          getDataList(){
            let _this=this;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberManagement/GetMemberInfo", {info:_this.info}).then(res => {
            if(res.result.groupId!=0){
                _this.ifClick = false;
                _this.memberInfo=res.result;
                // _this.memberInfo.effectiveEnd=res.result.effectiveEnd.substring(0,11).replace('T',' ');
                _this.memberId=res.result.id;
                _this.savemeberId=res.result.id;
                _this.gradeId=res.result.gradeId;
                _this.defaultGroupId=res.result.groupId;
                _this.OuId=res.result.ouId;
                _this.ifSearch = true;
                if(res.result.effectiveEnd='')
                _this.memberInfo.effectiveTime=res.result.effectiveTime
                if(_this.gradeId!=''){
                     _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberGradeManagement/Get", {ID:_this.gradeId}).then(res => {
                   console.log(res.result.depositAmount,res.result.depositPresentIntegral) ;
                   _this.depositAmount=res.result.depositAmount;
                   _this.depositPresentIntegral=res.result.depositPresentIntegral;
                   _this.ifClick = false;
                 })
                }
                
            }else{
                _this.$message({
                    type: 'warning',
                    message: '用户不存在'
                   
                });
                 _this.memberInfo={};
               
            }
          })
        },
          sureAll(){
              let _this=this;
              let activityParamers={
                 CardCodeOrMobile:parseInt(_this.info),
                 GroupID:_this.addData.groupId,
                 OuId:_this.addData.ouId,
                 Amount:_this.rechargeAmountVal,
                 ChannelID:0,
                 RechargeTime:GetDateTime()
             }
             if(activityParamers.CardCodeOrMobile!=''&&activityParamers.Amount>0){
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/ActivityManagement/GetMemberFillProm",activityParamers).then(res => {
               _this.actArr=res.result;
               _this.crmActRechrule=_this.actArr[0].crmActRechrule;//是一个数组
                let crmActRechrule= _this.crmActRechrule;
                var obj={}
                for(var key in crmActRechrule){ 
                    obj=crmActRechrule[key]
                }  
                 if(_this.addData.activityId == ''){
                    _this.addData.activityId=res.result[0].activityNo;
                     _this.addData.presentAmount=obj.presentAmount;//赠送金额
                    _this.presentIntegral=parseInt(obj.presentIntegral);//赠送积分
                     _this.ActivityOpt=res.result[0].activityName;//活动名称
                     _this.effectiveEnd=res.result[0].effectiveEnd.substring(0,11).replace('T',' ');
                 }
                //  console.log(_this.rechargeAmountVal)
                _this.actualAccount=parseInt(_this.rechargeAmountVal)+parseInt(_this.addData.presentAmount);          
            })
            console.log(_this.addData.rechargeAmount);
                //   积分
            //  _this.$axios.gets("http://192.168.100.107:8092/api/services/app/MemberManagement/GetMemberBonusPoint",{memberID:_this.memberId,amount:_this.addData.rechargeAmount}).then(res => {
            //     console.log(res.result)
            //    _this.addData.thisIntegral=res.result;
            // })
            let a=_this.addData.rechargeAmount;
            let b=_this.depositAmount;
            let c=this.depositPresentIntegral;
            console.log(a,b,c);
            if(b&&c!=''){
                 _this.addData.thisIntegral=Math.round((a/b)*c)
            }else{
                 _this.addData.thisIntegral=0;
            }
           
            console.log( _this.addData.thisIntegral)
            
             }
              
          },
          sure(){
              let _this=this;;
              let  reg = /^[1-9]\d*$/;
              if(reg.test(_this.rechargeAmount)){
              $(".color-red").css("display","none");
              if(_this.memberId!=''){
                    _this.addData.rechargeAmount=_this.rechargeAmount;
                    _this.rechargeAmountVal=_this.addData.rechargeAmount;
                    _this.sureAll();
              }else{
                    _this.rechargeAmount='';
                    _this.$message({
                    type: 'error',
                    message: '请输入充值用户卡号以及充值金额！'
                   
              })}
              }else{
               $(".color-red").css("display","block");
                // _this.rechargeAmount= "";  
                // _this.addData.rechargeAmount=0; 
                // _this.addData.thisIntegral=''
                $(".focus").focus(function(){
                    $(".color-red").css("display","none");
                });
             
              }
           
          },
          //点击自定义充值面额，显示
          goDenomination(){
           this.showOrHide=true;
            $(".el-radio-button__orig-radio:checked+.el-radio-button__inner").css({"background-color":"#fff","color":"#3cc"});
            $(".go-deno").css({"background-color":"#3cc","color":"#fff"});
          },
          //查看会员资料
          goMemberDetail(){
              console.log(this.$route.params.id!='default',  this.ifClick,this.memberId)
            if(this.$route.params.id!='default'){
                  this.ifClick=false;
                  this.statusChangeParam=this.$route.params.id;
                   ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,this.statusChangeParam,this);
              }else if(this.memberId!=''){
                   this.ifClick=false;
                  this.statusChangeParam=this.memberId;
                   ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,this.statusChangeParam,this);
              }
            
          },
          //加载当前用户
         loadCurrentUser:function() {
             let _this=this;
             _this.$axios.gets("/api/services/app/OuManagement/GetWithCurrentUser").then(res => {
             _this.defaultGroupId=res.result.groupId;
             _this.defaultOuId=res.result.id;
         })
         },
         balance(){
             let _this=this;
              $('.tipsWrapper').css({display:'block'});
               _this.$validate().then(function(success){
                if(success){
                    console.log(111)
                     $('.tipsWrapper').css({display:'none'});
                       console.log(_this.addData.groupId,111);
                    _this.addData.memberId=_this.memberId;
                    _this.addData.ouId=_this.defaultOuId;
                    _this.addData.groupId=_this.defaultGroupId;
                  
                    if(_this.addData.rechargeAmount!=''&&_this.addData.memberId!=''){
                        if(_this.addData.activityId==''){
                             _this.addData.activityId=0;
                        }
                        if(_this.addData.personnelId==''){
                             _this.addData.personnelId=0
                        }
                        console.log(_this.addData.personnelId);
                        let a='';
                        for(let i=0;i<_this.addData.rechargeTypes.length;i++){
                            _this.addData.rechargeTypes[i].payAmount=_this.addData.rechargeAmount;
                            a=_this.addData.rechargeTypes[i].payAmount
                                console.log(a);
                        }
                
                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberRechargeManagement/MemberRecharge",_this.addData).then(res => {
                    _this.open('充值成功','el-icon-circle-check','successERP');
                    _this.addData={
                    "groupId": 0,
                    "billNo": "",//单号
                    "billTypeId":2,//单据类型
                    "rechargeTypeid": 1,//变动类型
                    "rechargeSource": 3,//数据来源
                    "memberId":0,//会员ID
                    "rechargeAmount":0,//充值金额
                    "currenctyID": 0,//币种
                    "thisIntegral":0,//本次积分
                    "activityId":"",//充值活动ID
                    "activityName": "",//充值活动
                    "presentAmount":0,//赠送金额
                    "presentNote": "",//赠送说明
                    "rechargeDiscount": 0,//充值折扣
                    "ouId": 0,//组织ID
                    "channelTypeId": 1,//渠道类型
                    "channelId": '',//操作渠道
                    "personnelName":"",
                    "createBy":window.localStorage.getItem('user_name'),//操作员
                    "personnelId":'',//营业员
                    "remark": "",//备注
                    "rechargeTypes": [
                        {
                        "billNo": "",//单号
                        "payTypeId": 0,//充值结算方式
                        "currencyId": 0,//币种
                        "payAmount": 0//结算金额
                        }
                    ]
               }
               _this.memberInfo={};
               _this.info='';
               _this.rechargeAmount='';
               _this.memberId='';
               _this.ifSearch = false;
               _this.ifClick = true;
               _this.validation.reset();
              },function(err){
                _this.addData.activityId='';
                _this.addData.personnelId='';
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
              })}else{
                   _this.addData.activityId='';
                   _this.addData.personnelId='';
                   _this.$message({
                    type: 'warning',
                    message: '请输入充值用户卡号以及充值金额！'
                   
                });
              }
             }
         })
        },
         selectChange(){ 
            let _this=this;
            let activityParamers={
                CardCodeOrMobile:parseInt(_this.info),
                GroupID:_this.addData.groupId,
                OuId:_this.addData.ouId,
                Amount:_this.addData.rechargeAmount,
                ChannelID:0,
                RechargeTime:GetDateTime()
                };
              _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/ActivityManagement/GetMemberFillProm",activityParamers).then(res => {
                  let list = res.result;
                  for(let i = 0;i<list.length;i++){
                    if(_this.addData.activityId==list[i].activityNo){
                        _this.ActivityOpt = list[i].activityName
                        _this.effectiveEnd = list[i].effectiveEnd.substring(0,11).replace('T',' ');
                        _this.presentIntegral = list[i].crmActRechrule[0].presentIntegral
                        _this.addData.presentAmount = list[i].crmActRechrule[0].presentAmount
                        // console.log(_this.presentIntegral)
                    }
                  }
                   _this.actualAccount=parseInt(_this.rechargeAmountVal)+parseInt(_this.addData.presentAmount); 
            }); 
         },
          showErrprTips(e){
                $('.wrongWrapper').css({display:'none'})
        },
        hide(){
           this.showOrHide=false;
        },
        record(){
             ADD_BOOKMARK(this.statusChangeNameRecord,this.statusChangeUrlRecord,this.BookMarkFlag,this.statusChangeParam,this);   
        },
     //   对话框点击------------------------------------------
    dialogClick(parmas){//对话框按钮点击事件
        if(parmas.dialogButton=="确定"){
            if(parmas.dialogName=="saveDialog"){
                this.dialogVisible=false;
            }
        }else if(parmas.dialogButton=="取消"){
            this.dialogVisible=false;
        }
                
            
    },
    getChannel:function(){
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ChannelType'}).then(function(res){
                console.log(res);
                self.channelAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
           //---根据type获取渠道----------
    getChannelByType:function(id){
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{GroupID:self.defaultGroupId,OuID:self.defaultOuId,ChannelType:id}).then(function(res){
                    self.shopArByType = res.result;
              if( res.result==null){
                 self.addData.channelId='';
              }
              
            },function(res){
                console.log('err'+res)
            });
        },
    getDefaultChannelByType:function(){
                let self = this;
                self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{GroupID:self.defaultGroupId,OuID:self.defaultOuId,ChannelType:'1'}).then(function(res){
                    console.log(res)
                    self.shopArByType = res.result;
                },function(res){
                    console.log('err'+res)
                });
            },
    getChannelId:function(){
            let self = this;
           if(self.addData.channelTypeId!=''){
               self.getPromMes(self.addData.channelTypeId);
           }
        },
    getPromMes:function(id){
            let self = this;
            self.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/ActivityManagement/GetMemberRegistProm',{GroupID:self.defaultGroupId,ChannelID:id}).then(function(res){
                    console.log(res)

                },function(res){
                    console.log(res)
                    self.promMes = res.error.message;
                });
        },
          // 关闭对话框
    dialogColse(){
        this.dialogVisible=false;
    },
    },
      components:{
        dialogBox
      }
}
</script>
<style>

.bgcolor.withbtn{
    width: 316px;
}
.bgcolor{
    width: 282px;
}
.mem-recharge-list .bgcolor{
    margin-bottom: 0;
}
.mem-recharge-list .mem-detail p{
    color:#3cc;
    padding-left: 24px;
    margin-right:0;
    cursor: no-drop;
}
.mem-recharge-list .mem-detail .search-member{
  cursor: pointer;
}
.mem-recharge-list .withbtn{
    margin-bottom: 10px;
    
}

.mem-tag{
    width: 100%;
}
.mem-tag button{
    outline: none;
    border: 1px solid #3cc;
    color: #3cc;
    padding: 1px 10px;
    border-radius: 4px;
    margin-right: 5px;
    background-color: #fff;
    line-height: 25px;
}
.bgcolor .fb{
 font-weight: bold;
}
.mem-info span{
 display: inline-block;
 height: 35px;
 line-height: 35px;

}
.bg-white{
    background: white;
    border-radius: 3px;
}
.withbtn .el-input{
    width: calc(100% - 145px)!important;
   
}
.withbtn input{
    padding: 0 10px;
}
.withbtn .el-input__inner{
    border-radius: 2px 0 0 2px!important;
}
.search-tip input{
   width: calc(100% - 60px)!important;
    outline: none;
    border-radius: 2px;
    border: 1px solid rgb(194, 202, 216);
    height: 32px;
    text-indent: 6px;
}

.sure{
    display: inline-block;
    width: 51px;
    background-color: #3cc;
    height: 35px;
    line-height: 35px;
    color: white;
    cursor: pointer;
    text-align: center;
    border-radius: 0 2px;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
   background-color:#3cc;
   border-color: #3cc;
   -webkit-box-shadow: -1px 0 0 0 #3cc
}
.mem-recharge-list .el-radio-button__inner{
    border: 1px solid #3cc;
    width: 108px;
    line-height: 30px;
    color:#3cc;
    font-size:24px;
    border-radius: 4px;
}
.mem-recharge-list .el-radio-button{
    width: 108px;
    height: 54px;
    line-height: 54px;
    margin-right: 10px;
}
.mem-recharge-list .el-radio-button:first-child .el-radio-button__inner{
    border-left:1px solid #3cc;
    border-radius: 4px;
}
.mem-recharge-list .show-recharge{
    width:calc(100% - 150px);
    height: 99px;
    display: inline-block;
    background-color: #FFFBF9;
    border: 1px solid #FEDFE2;
}
.mem-recharge-list .show-recharge p{
    font-size: 18px;
    margin-top: 15px;
}
.mem-recharge-list .add-deno .el-radio-button__inner{
    font-size:20px;
    border-radius: 4px;
}
.mem-recharge-list .show-recharge input{
    color:#F55E6E;
    font-size: 36px;
    border:none;
    background-color:transparent;
}
.mem-recharge-list .racharge-deno{
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    width: 84px;
    height: 35px;
    float: left;
    color: #666666;
    font-size:12px

}
.mem-recharge-list .action-message{
      width:calc(100% - 124px);
      height: 60px;
      background-color: #eef1f5;
      display: inline-block;
      
 } 
.mem-recharge-list .action-message p{
      font-size: 12px;
  }
.mem-recharge-list .racharge-deno.title{
    line-height: 60px;
    height: 60px;
    padding-left: 0
}
.mem-recharge-list .bgcolor.remark{
    width:100%
}
.mem-recharge-list .bgcolor.remark .el-input{
    width: calc(100% - 390px);
}
.mem-recharge-list .mem-info .balance,.mem-recharge-list .mem-info .recharge-record,.mem-recharge-list .mem-info .balance1{
    width: 78px;
    line-height: 37px;
    height: 37px;
    border-radius: 4px;
    cursor: pointer;
    color:#fff;
    background-color:#3cc
}
.mem-recharge-list .mem-info .balance1{
    cursor: no-drop;
}
.mem-recharge-list .mem-info .recharge-record{
    background-color:#fff;
    border:1px solid #3cc;
    line-height: 36px;
    color:#3cc;
}
.bgcolor.button-group{
    height: 38px;
}
.defined-deno{
    font-size: 12px;
    border-radius: 5px;
    display: inline-block;
    height: 56px;
    line-height: 1;
    vertical-align: middle;
}
.close-tab{
    position: relative;
}
.defined-deno .el-icon-circle-close:before{
    color: red;
    position: absolute;
    top:-6px;
    right: -5px;
    cursor: pointer;
}
.defined-deno input{

    outline: none;
    border-radius: 2px;
    border: 1px solid rgb(194, 202, 216);
    height: 32px;
    text-indent: 6px;
}
.defined-deno.dialog-input input{
     width: calc(100% - 98px)!important;
}
.go-deno{
    border: 1px solid #3cc;
    width: 138px;
    color: #3cc;
    font-size: 18px;
    border-radius: 4px;
    display: inline-block;
    height: 54px;
    line-height: 54px;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
}
.mem-recharge-list .bg-white .mem-info .el-input input{
    border:none;
    padding: 0;
}

.mem-recharge-list .dialog-input input,.mem-recharge-list .dialog-input .sure{
    height: 40px;
    line-height:40px; 
}
.mem-recharge-list .dialog-input .sure{
    padding: 0px 20px;
}
.mem-recharge-list .dialog-box{
    padding: 10px;
    background-color: #f2f2f2;
}
.icon-cash{
    color: red;
    font-size:40px !important;
}
.icon-wechat{
 color: green;
 font-size: 40px !important;
}
.icon-alipay{
    color: #39a3dc;
    font-size: 40px !important;
}
.icon-bankcard{
 color: #39a3dc;
 font-size: 40px !important;
}
.payment span{
 display: inline-block;
 color: #ccc;
}
.pay-list-info span{
    font-size: 18px;
}
.pay-list p{
    font-size: 30px;
}
.mem-recharge-list .transfer_dialog .el-dialog__footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 20px;
}
.wrongWrapper{
    display: none;
    padding-left:95px; 
}
.color-red{
    display: none;
}
.wrongWrapper span,.color-red{
    color: red;
    font-size: 10px;
}

.mem-recharge-list .bgcolor.channel-type{
    width: 570px;
}
.mem-recharge-list .show-recharge input::-webkit-input-placeholder{
            color:#F55E6E;;
        }
.mem-recharge-list .show-recharge input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#F55E6E;
        }
.mem-recharge-list .show-recharge input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#F55E6E;
        }
.mem-recharge-list .show-recharge input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#F55E6E;
        }
.mem-recharge-list .channel-type .el-select {
    width: 156px!important;
}
.mem-recharge-list .channel-type .channel-style {
    width: calc(100% - 250px)!important;
}
.mem-recharge-list .channel-type .el-select input{
    width: 100%;
}
/* @media screen and (min-width:1200px) and (max-width:1440px){
   .mem-recharge-list .show-recharge{width:calc(100% - 300px);}
} */
@media screen and (min-width:768px) and (max-width:1190px){
   .mem-recharge-list .show-recharge,.mem-recharge-list .action-message{width:calc(100% - 110px);}
}
@media screen and (min-width:1200px) and (max-width:1440px){
   .mem-recharge-list .show-recharge,.mem-recharge-list .action-message{width:calc(100% - 150px);}
}
@media screen and (min-width:1441px){
   .mem-recharge-list .show-recharge,.mem-recharge-list .action-message{width:70%;}
}
.mem-recharge-list  .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 4px;
}
.mem-recharge-list .block{
    display:inline-block;
}
.mem-recharge-list .channel-type .channel-style .redBorder {
    border-color: #f66;
}
</style>


