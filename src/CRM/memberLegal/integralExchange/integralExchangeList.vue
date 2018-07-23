<template>
    <div class="integral-exchange-list">
         <!--搜索框  -->
         <div class="tipsWrapper">
                <div class="errorTips">
                        <p class="msgDetail">
                            <span :class="validation.hasError('info')?'block':'none'">
                                会员卡号或手机号{{ validation.firstError('info') }},
                            </span>
                            <span :class="validation.hasError('addData.channelId')?'block':'none'">
                                操作渠道第二个{{ validation.firstError('addData.channelId') }},
                            </span>
                            <span :class="validation.hasError('addData.channelType')?'block':'none'">
                                操作渠道第一个{{ validation.firstError('addData.channelType') }},
                            </span>
                            <span :class="validation.hasError('addData.ouId')?'block':'none'">
                                业务组织{{ validation.firstError('addData.ouId') }}
                            </span>
                        </p>
                </div>
            </div>
        <el-row class="bg-white mb10 border-bottom">
            
            <el-col>
                <div class="bgcolor withbtn mt10 ">
                    <label class="fb">选择会员</label>
                    <div @keyup.enter="search">
                    <el-input placeholder="卡号 手机号" v-model="info"  class="info" @focus="showErrprTips" :class="{redBorder : validation.hasError('info')}"></el-input>
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
          <el-row class="bg-white mt15">
            <el-col>
                <div class="bgcolor pt10">
                    <label><small>*</small>业务组织</label>
                     <el-select clearable filterable :class="{redBorder : validation.hasError('addData.ouId')}" v-model="addData.ouId">
                            <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search_ou">
                            </el-input>
                            <el-tree
                            :render-content="renderContent_"
                            :data="selectTree_ou"
                            :highlight-current="true"
                            :props="selectProps_ou"
                            node-key="id"
                            default-expand-all
                            ref="tree"
                            :filter-node-method="filterNode_ou"
                            :expand-on-click-node="false"
                            @node-click="nodeClick_ou"
                            >
                            </el-tree>
                        
                            <el-option v-show="false"  v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                            </el-option>
                        </el-select>
                </div>
                <div class="bgcolor pt10 channel-type">
                    <label><small>*</small>操作渠道</label>
                    <el-select v-model="addData.channelType" filterable clearable  :filter-method="filterMethod1"
                               @change='getChannelByType(addData.channelType)'
                               placeholder="":class="{redBorder : validation.hasError('addData.channelType')}">
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
                <div class="bgcolor pt10">
                    <label>操作员</label>
                    <el-input disabled v-model="addData.createBy"></el-input>
                </div>
            </el-col>
        </el-row>
         <!-- 积分兑换 -->
        <div class="bg-white mt15">
            <el-row>
                <el-col class="mt10">
                    <label class="racharge-deno title-mes">积分兑换</label>
                    <p class="go-record-exchange" @click="goRecordExchange">查看积分记录</p>
                </el-col>
                <el-col class="pl10">
                    <el-radio-group v-model="radio2" @change="RecordExchange">
                        <el-radio :label="3">卡券</el-radio>
                        <el-radio :label="6">服务</el-radio>
                        <el-radio :label="9">商品</el-radio>
                        <el-radio :label="12">升级</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col>
                    <div class="tabZoo">
                        <el-col :span="24">
                                <div v-for="(item,index) in CardAr" class="Coupon" v-show="radio2==3" @click="CouponBG(index,item)" :class="item.class ? 'greenbg':''">
                                    <div style="height:100%"  >
                                        <p>{{item.couponName}}</p>
                                        <p class="score">需<input v-model="item.integral" :disabled="true"/>积分</p>
                                        <el-input-number @change="handleChange(item.qty,CardAr,index)" v-model="item.qty" :min="1" label="描述文字" size="mini"></el-input-number>
                                        <i @click.stop="cancelCard(index,item.couponName)" class="el-icon-error"></i> 
                                    </div>
                                </div>
                                <div v-for="(item,index) in SvrsAr" class="Coupon" @click="CouponBG(index)" v-bind:class="{ greenbg:index==current}" v-show="radio2==6">
                                    <p>{{item.couponName}}</p>
                                    <p class="score">需<input v-model="item.integral"/>积分</p> 
                                    <el-input-number    v-model="item.qty" @change="handleChange" :min="1" label="描述文字" size="mini"></el-input-number> 
                                </div>
                                <div v-for="(item,index) in SkusAr" class="Coupon" @click="CouponBG(index)" v-bind:class="{ greenbg:index==current}" v-show="radio2==9">
                                    <p>{{item.couponName}}</p>
                                    <p class="score">需<input v-model="item.integral"/>积分</p> 
                                    <el-input-number   v-model="item.qty" @change="handleChange" :min="1" label="描述文字" size="mini"></el-input-number> 
                                </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
      
        <el-row class="mem-tag bg-white integaral-exchange-foot">
            <el-card class="box-card" v-show="ifSelected">
                <div slot="header">
                    <span>已选</span>
                    <i class="el-icon-close" @click="closeList"></i>
                </div>
                <div v-for="(item,index) in selectAr" :key="item.couponId" class="text item">
                   <span>{{item.couponName}}</span>
                   <span class="red">{{item.integral}}积分</span>
                  <el-input-number v-model="item.qty" @change="handleChangeSelect" :min="1" label="描述文字" size="mini"></el-input-number> 
                </div>
            </el-card>
             <el-col class="mt10 mb15">
               
                <div class="bgcolor mem-info button-group">
                    <button class="balance1" v-show='!ifSearch'>兑换</button>
                    <button class="balance" @click="balance" v-show='ifSearch'>兑换</button>
                   
                    <button class="recharge-record1" v-show="!ifSee">查看已选卡券</button>
                    <button class="recharge-record" @click="record" v-show="ifSee">查看已选卡券</button>
                </div>
                <div class="select-card">已选卡券:<span>{{qty}}</span>累计积分<span>{{integral}}</span></div> 
            </el-col>
           
        </el-row>
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
        ifSee:false,//查看已选卡券
        ifClick:true,
        info:'',
        memberInfo:"",
        effectiveEnd:"",//有效期
        ChannelOpt:[],//操作渠道
        memberId:"",//会员的id
        crmActRechrule:[],
        groupId:"",//当前组织
        actArr:[],//活动的值
        addData:{
            "groupId": 0,
            "ouId":'',
            "memberId": 0,
            "channelType":1,
            "channelId": '',
            "createBy": window.localStorage.getItem('user_name'),
            "plantformId": 0,
            "coupons": [
            ],
            "svrs": [
                // {
                // "qty": 0,
                // "groupId": 0,
                // "tacticId": 0,
                // "serviceId": 0,
                // "serviceName": 0,
                // "integral": 0
                // }
            ],
            "skus": [
                // {
                // "qty": 0,
                // "groupId": 0,
                // "tacticId": 0,
                // "skuId": 0,
                // "skuName": 0,
                // "integral": 0
                // }
            ]   },
        savemeberId:'',
        BookMarkFlag:true,
        statusChangeName:'会员资料',
        statusChangeUrl:'memberInformationDetail',
        statusChangeParam:1,
        statusChangeNameRecord:'兑换记录',
        statusChangeUrlRecord:'recordExchangeList',
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
        defaultGroupId:'',
        OuId:'',
        channelAr:[],
        shopArByType:[],
        defaultOuId:"",
        filterKey:'',
        filterKey1:'',
        filterKey2:'',
        filterKey3:'',
        CardAr:[],//卡券数组
        SvrsAr:[],//服务
        SkusAr:[],//商品
        current:0,
        selectTree_ou:[],//业务组织
        selectProps_ou: {
            children: 'children',
            label: 'ouName',
            id:'id',

        },
        search_ou:'',
        selectData:{
          ou:[],//组织  
        },
        item_ou:{
            id:"",
            ouName:""
        },
        radio2:'',
        // loading:true,
        ifSelected:false,
        SelectData:[],//点击的数组
        qty:'',//数量
        integral:'',//积分
        selectAr:[],//已选的卡券
        isccc:true
      }
    },
    created:function(){
        let _this=this;
        _this.loadCurrentUser();//加载grounpId
        _this.isdefault(this.$route.params.id);
        _this.getChannel();
        _this.loadTree();

    },
     computed:{
      channel:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey1,this.channelAr)
      },
     shopAr:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey2,this.shopArByType)
      },
 
  },
     validators: {
        'info': function (value) {//会员卡号或者手机号
            return this.Validator.value(value).required();
        },
        'addData.channelId': function (value) {//操作渠道
            return this.Validator.value(value).required();
        },
         'addData.channelType': function (value) {//操作渠道
            return this.Validator.value(value).required();
        },
         'addData.ouId': function (value) {//操作渠道
            return this.Validator.value(value).required();
        },
       
     },
    watch:{
         defaultGroupId:{
            handler:function(){
                let self = this;
                if(self.defaultGroupId!=''){
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
        },
        search_ou(val) {
        this.$refs.tree.filter(val);
      },
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
         CouponBG(item,val){
             console.log(2)
            if(!this.isccc){
                this.isccc = true;
                return;
            }
            let selectAr=[];
            let qty=[];
            
            let integral=[];
            this.CardAr[item].class =!this.CardAr[item].class;
            console.log(this.CardAr)
            if( this.CardAr.length>0){
            for(let i=0;i<this.CardAr.length;i++){
               if(this.CardAr[i].class==true){
                   selectAr.push(this.CardAr[i]);  
               }
             }
            }
           if(selectAr.length!=0){
            for(let j=0;j<selectAr.length;j++){
                qty.push(selectAr[j].qty)
                integral.push(selectAr[j].integral*selectAr[j].qty)
                }
           }
           if(qty.length!=0){
            this.qty=eval(qty.join('+'));

           }else{
               this.qty=0 
           }
           
           if(integral.length!=0){
            this.integral=eval(integral.join('+'));
           }else{
                this.integral=0  
           }
          this.selectAr=selectAr;
          console.log(this.selectAr);
        },
        handleChange(a,b,c,d) {
            if(b[c].class){
                this.isccc = false;
                let sum = 0;
                let sum1 = 0;
                for(let i=0;i<b.length;i++){
                    if(b[i].class){
                        sum = sum + b[i].qty
                        sum1 = sum1 + b[i].qty* b[i].integral
                    }
                }
                    this.qty = sum
                    this.integral = sum1
            }
           
            // this.integral=integral*qty; 
        },
        handleChangeSelect(value){
            console.log( this.selectAr);
            let num=[];
            let inte=[];
           if(this.selectAr.length!=0){
            for(let j=0;j<this.selectAr.length;j++){
                num.push(this.selectAr[j].qty)
                inte.push(this.selectAr[j].integral*this.selectAr[j].qty)
                }
           }
           if(num.length!=0){
              num=eval(num.join('+'));

           }else{
            num=0 
           }
           
           if(num.length!=0){
            inte=eval(inte.join('+'));
           }else{
                this.inte=0  
           }
          this.integral=inte;
          this.qty=num;
        },
        //关闭已选
        closeList(){
            this.ifSelected=false;
        },
        //删除卡券
        cancelCard:function(index,name){
            let self = this;
            self.CardAr.splice(index,1);
           for(let i=0;i<self.selectAr.length;i++){
               if(self.selectAr[i].couponName==name){
                   self.selectAr.splice(i,1);
               }
              
           }
           if(self.selectAr.length==0){
               self.qty=0;
               self.integral=0;
           }else{
                let num=[];
                let inte=[];
               for(let j=0;j<self.selectAr.length;j++){
                        num.push(this.selectAr[j].qty)
                        inte.push(this.selectAr[j].integral*this.selectAr[j].qty)
                }
                if(num.length!=0){
                    num=eval(num.join('+'));

                }else{
                    num=0 
                }
                
                if(num.length!=0){
                    inte=eval(inte.join('+'));
                }else{
                    this.inte=0  
                }
                this.integral=inte;
                this.qty=num;
                }
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
                   
              }else{
                   this.$message({
                    type: 'warning',
                    message: '卡号不能为空' 
                });
              }
           
          },
          getDataList(){
            let _this=this;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberManagement/GetMemberInfo", {info:_this.info}).then(res => {
            if(res.result.groupId!=0){
                _this.ifClick = false;
                _this.memberInfo=res.result;
                _this.memberId=res.result.id;
                _this.savemeberId=res.result.id;
                _this.defaultGroupId=res.result.groupId;
                _this.OuId=res.result.ouId;
                _this.ifSearch = true;
                _this.ifSee=true;
                _this.memberInfo.effectiveTime=res.result.effectiveTime
            }else{
                _this.$message({
                    type: 'warning',
                    message: '用户不存在'
                   
                });
                 _this.memberInfo={};
               
            }
          })
        },
        RecordExchange(val){
            let _this=this;
            $('.tipsWrapper').css({display:'block'});
            _this.$validate().then(function (success){
           if (success) {
             $('.tipsWrapper').css({display:'none'});
           if(_this.memberId!=''){
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/CrmIntegralExchtacticManagement/GetExchtaticCanUse", {MemberID:_this.memberId,OuId:_this.addData.ouId,ChannelId:_this.addData.channelId}).then(res => {
                if(res.result.coupons.length>0&&val=='3'){
                    let greenbg1=false;
                    _this.CardAr=[];
                    for(let i=0;i<res.result.coupons.length;i++){
                        let obj = {couponId:res.result.coupons[i].couponId,couponName:res.result.coupons[i].couponName,groupId:res.result.coupons[i].groupId,integral:res.result.coupons[i].integral,qty:1,tacticId:res.result.coupons[i].tacticId,class:false}
                        _this.CardAr.push(obj)

                    }
                    // _this.loading=false;
                }else if(res.result.svrs.length>0&&val=='6'){
                    console.log(_this.CardAr);
                    _this.SvrsAr=res.result.svrs;
                    // _this.loading=false;
                }else if(res.result.skus.length>0&&val=='9'){
                     _this.CardAr=[]
                    _this.SkusAr=res.result.skus;
                    // _this.loading=false;
                }else if(val!='6'){
                    _this.$message({message: '暂无此活动!',type: 'warning'});
                }else if(val!='9'){
                    _this.$message({message: '暂无此活动!',type: 'warning'});
                }else if(val!='3'){
                    _this.$message({message: '暂无此活动!',type: 'warning'});
                }
           },function(res){
                _this.showErMsgDialog(res.error.message,res.error.details)
           })
           }
          }else{
              _this.radio2=0;
              console.log( _this.radio2)
          }
        })
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
        goRecordExchange(){
             ADD_BOOKMARK(this.statusChangeNameRecord,this.statusChangeUrlRecord,this.BookMarkFlag,this.statusChangeParam,this);   
          },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message=message
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogVisible=true;
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
                     $('.tipsWrapper').css({display:'none'});
                    _this.addData.memberId=_this.memberId;
                    _this.addData.groupId=_this.defaultGroupId;
                    for(let i=0;i<_this.selectAr.length;i++){
                       delete _this.selectAr[i].class
                    }
                    _this.addData.coupons=_this.selectAr;
                    if( _this.addData.coupons.length!=0){
                            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+"/api/services/app/CrmIntegralExchtacticManagement/IntegralExchange",_this.addData).then(res => {
                            _this.open('积分兑换成功','el-icon-circle-check','successERP');  
                            _this.memberInfo={};
                            _this.info='';
                            _this.memberId='';
                            _this.addData={
                                "groupId": 0,
                                "ouId":'',
                                "memberId": 0,
                                "channelType":1,
                                "channelId": '',
                                "createBy": window.localStorage.getItem('user_name'),
                                "plantformId": 0,
                                "coupons": [],
                                "svrs": [],
                                "skus": []},
                            _this.CardAr=[];
                            _this.selectAr=[];
                            _this.qty='';
                            _this.integral='';
                            _this.ifSearch = false;
                            _this.ifSee=false;
                            _this.ifClick = true;
                            _this.validation.reset();
                         },function(err){
                            _this.dialogSetting.dialogType="submit";
                            _this.dialogSetting.dialogName='saveDialog'
                            _this.dialogSetting.message=err.error.message;
                            _this.errorTips.message=err.error.message;
                            _this.errorTips.details='';
                            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            _this.dialogVisible=true;
                        })
                    }else{
                         _this.$message({message: '请选择卡券活动!',type: 'warning'});
                    }
              }
            })
         },
         showErrprTips(e){
                $('.wrongWrapper').css({display:'none'})
        },
        //查看已选卡券
        record(){
            this.ifSelected=true;
        },
     //   对话框点击------------------------------------------
    dialogClick(parmas){//对话框按钮点击事件
        if(parmas.dialogButton=="确定"){
            if(parmas.dialogName=="saveDialog"){
                this.dialogVisible=false;
            }else if(parmas.dialogName=="showErMsgDialog"){
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
           if(self.addData.channelType!=''){
               self.getPromMes(self.addData.channelType);
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
    loadTree(){
            let _this=this;
            //组织
             _this.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                _this.selectTree_ou=res;
            },function(res){
            })
              _this.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){ 
                _this.selectData.ou=res.result;
            })
        },
      renderContent_(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }
        },
     filterNode_ou(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
    },
    nodeClick_ou(data,node,self){
        let _this=this;
        console.log(data.id,data.ouFullName)
        _this.item_ou.id=data.id;
        _this.item_ou.ouFullName=data.ouFullName;
        $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
            if($(this).attr('date')==data.id){
                $(this).click()
            }
        })
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
.integral-exchange-list .bgcolor{
    margin-bottom: 0;
}
.integral-exchange-list .mem-detail p{
    color:#3cc;
    padding-left: 24px;
    margin-right:0;
    cursor: no-drop;
}
.go-record-exchange{
    color:#3cc;
    cursor:pointer;
    font-size:12px;
    line-height: 35px;
}
.integral-exchange-list .mem-detail .search-member{
  cursor: pointer;
}
.integral-exchange-list .withbtn{
    margin-bottom: 10px;
    
}
.integral-exchange-list .racharge-deno.title-mes {
    display: inline-block;
    font-size: 18px;
    font-weight: bolder;
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

.integral-exchange-list .add-deno .el-radio-button__inner{
    font-size:20px;
    border-radius: 4px;
}

.integral-exchange-list .racharge-deno{
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
.integral-exchange-list .racharge-deno.title{
    line-height: 60px;
    height: 60px;
    padding-left: 0
}
.integral-exchange-list .bgcolor.remark{
    width:100%
}
.integral-exchange-list .bgcolor.remark .el-input{
    width: calc(100% - 390px);
}
.integral-exchange-list .mem-info .balance,.integral-exchange-list .mem-info .recharge-record,.integral-exchange-list .mem-info .recharge-record1,.integral-exchange-list .mem-info .balance1{
    width: 78px;
    line-height: 37px;
    height: 37px;
    border-radius: 4px;
    cursor: pointer;
    color:#fff;
    background-color:#3cc
}


.integral-exchange-list .mem-info .balance1{
    cursor: no-drop;
}
.integral-exchange-list .mem-info .recharge-record1{
    cursor: no-drop;
}
.integral-exchange-list .mem-info .recharge-record,.integral-exchange-list .mem-info .recharge-record1{
    background-color:#fff;
    border:1px solid #3cc;
    line-height: 36px;
    color:#3cc;
    width: 102px;
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
.integral-exchange-list .bg-white .mem-info .el-input input{
    border:none;
    padding: 0;
}
.wrongWrapper{
    display: none;
    padding-left:95px; 
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
.color-red{
    display: none;
}
.wrongWrapper span,.color-red{
    color: red;
    font-size: 10px;
}

.integral-exchange-list .bgcolor.channel-type{
    width: 570px;
}
.integral-exchange-list .channel-type .el-select {
    width: 156px!important;
}
.integral-exchange-list .channel-type .channel-style {
    width: calc(100% - 300px)!important;
}
.integral-exchange-list .channel-type .el-select input{
    width: 100%;
}
.integral-exchange-list  .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 4px;
}
.integral-exchange-list .block{
    display:inline-block;
}
.integral-exchange-list .channel-type .channel-style .redBorder {
    border-color: #f66;
}
.integral-exchange-list .Coupon{
     width:139px;
    height: 78px;
    float: left;
    margin:15px;
    padding:10px;
    border-radius:3px;
    cursor: pointer;
    border:1px solid rgba(51, 204, 204, 1);
    position: relative;
}
.integral-exchange-list .Coupon p{
    font-size:14px;
    height:40px;

}
.integral-exchange-list .Coupon .score{
    font-size: 12px;
    line-height: 50px;
    float: left;
}
.integral-exchange-list .Coupon .score input{
    width:36px;
    height: 18px;
    font-size:12px;
    color:red;
    border:1px solid #ccc;
    outline:none;
    border-radius:3px;
    text-align:center;   
}
.greenbg{
    background-color:#00CACA;
    color:#fff;
}
.integral-exchange-list .tabZoo .el-input-number--mini {
    width: 50px;
    line-height: 18px;
    margin-top: 15px;
    display: inline-block;
    }
.integral-exchange-list .tabZoo .el-input-number--mini .el-input-number__decrease, .integral-exchange-list .el-input-number--mini .el-input-number__increase{
    width:12px;
}
.integral-exchange-list .tabZoo .el-input-number .el-input {
    display: inline-block;
}
.integral-exchange-list .tabZoo .el-input--mini .el-input__inner {
    height: 20px;
}

.integral-exchange-list .tabZoo .el-input-number--mini .el-input__inner {
    padding-left: 10px;
    padding-right: 10px;
}
.integral-exchange-list .el-radio__label{
    display: inline-block;
}
.integral-exchange-list .tabZoo{
    min-height: 300px;
}
.integral-exchange-list .bgcolor.mem-info.button-group{
    width: 300px;
    float: right;
}
.integral-exchange-list .mem-tag .select-card{
    display: inline-block;
    font-size: 12px;
    color:rgb(194, 202, 216);
    width: 300px;
    float: right;
    height: 38px;
    line-height: 38px;
}
.integral-exchange-list .mem-tag .select-card span{
    color:red;
    padding: 0 10px;
}
.integral-exchange-list .item {
    margin-bottom: 18px;
  }

 .integral-exchange-list .box-card {
    position: absolute;
    width: 100%;
    top: -289px;
    right: 0px;
    z-index:999;
  }
 .integral-exchange-list .integaral-exchange-foot{
     position: relative;
 }
 .integral-exchange-list .el-icon-close{
     float: right;
     font-size:20px;
     cursor: pointer;
 }
 .integral-exchange-list .Coupon .el-icon-error{
    position: absolute;
    right: -4px;
    top: -4px;
    color: #f66;
    cursor: pointer;
}
 .integral-exchange-list .box-card .red{
     color: #f66;
     font-size:12px;
 }
 .integral-exchange-list .box-card .el-input-number--mini{
    float: right;
}
</style>



