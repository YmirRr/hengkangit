
<template>
    <div class="record-exchange commodity member-list">
         <el-row class="bg-white">
            <el-col class="left-box" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">会员/手机号码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.CardCodeOrMobile"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">会员等级</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.GradeId" filterable  :filter-method="filterMethod1"> 
                            <el-option v-for="item in Grade" :key="item.id" :label="item.gradeName" :value="item.id">
                                <span>{{ item.gradeName }}</span>
                                <span>{{ item.gradeCode }}</span>
                         </el-option>
                        </el-select>
                   
                    </el-col> 
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换渠道</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.ChannelId" filterable  :filter-method="filterMethod2"> 
                            <el-option v-for="item in Channel" :key="item.id" :label="item.shopName" :value="item.id">
                                <span>{{ item.shopName }}</span>
                                <span>{{ item.shopCode }}</span>
                         </el-option>
                        </el-select>
                   
                    </el-col> 
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换平台</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.PlatformId" filterable>
                            <el-option v-for="items in BillOpt" :key="items.id" :label="items.billName" :value="items.id">
                            </el-option>
                        </el-select>
                    </el-col> 
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换类型</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.ExchTypeid" filterable> 
                            <el-option v-for="item in ExchType" :key="item.id" :label="item.itemName" :value="item.id">
                               
                         </el-option>
                        </el-select>
                   
                    </el-col> 
                </el-row>
                
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.MemberName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换时间</label>
                    </el-col>
                    <el-col class="rangeDate smallRangeDate" :span="15" clearable >                        
                       <el-date-picker
                            class="dateRange"
                            type="daterange"
                            range-separator="to"
                            align="center"
                            unlink-panels
                            start-placeholder=""
                            v-model="RechargeTime"
                            end-placeholder=""
                          >
                            </el-date-picker>
                    </el-col> 
                </el-row>
                 <el-row class="mt20">
                        <el-col :span="8">
                            <div class="height1"></div>
                        </el-col>
                        <el-col :span="14">
                            <span class="search-btn" @click="query">查询</span>
                        </el-col>
                </el-row>
            </el-col>
            <el-col class="border-left" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span='2' class="search-block br"  v-show="!ifWidth">
                        <div @click="openLeft">
                            <img src="../../../../static/image/common/search_btn.png">
                            <span class="fs18">查询</span>
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                    </el-col>
                    <el-col :span='ifWidth?24:22'>
                            <el-row>
                                <el-col :span="13">
                                    <div class="btnGroup-box">
                                         <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                                    </div>
                                </el-col> 
                                <el-col :span="11" class="line-height28 pt5"> 
                                    <div class="search-input-member">
                                        <div class="search-wapper">
                                            <input type="text" placeholder="手机号\编号\姓名..." v-model="searchParams.QuikInput" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                            <button class="mem-search-btn" @click="searchRight">搜索</button>
                                        </div>
                                        
                                        <div class="search_advance" @click="dialogUserDefined = true">
                                            <button class="userDefined advanced-query">
                                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                            </button>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                    </el-col>
                </el-row>
                <el-row class="pb10">
                    <el-col :span="24">
                         <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- dialog -->  
       

    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Table from '../../../base/Table/Table'
import {FILTER_MOTHED} from '../../../common/common.js'
import config from '../../../../static/config';
export default {
    name:'memberGroupList',
    components:{
        buttonGroup,
        Table
    },
    created () {
        this.loadMemberGrade();//加载等级
        this.loadChannelOpt();//加载兑换渠道
        // this.loadPlatformOpt();//加载平台
        // this.loadExchType();//加载兑换类型
    },
    watch:{
        ifWidth:function(val,oldval){
            console.log(val,oldval)
        }
    },
    data(){
        return{
           
            valueDate:'',
            GradeOpt:[],//等级
            ChannelOpt:[],//渠道
            RechargeTime:[],//充值时间
            tableModel:'recordExchangeList',
            //按钮组
            buttonGroup:[
                {
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
            }],
            ifWidth:false,
            ifOpen:false,
            httpUrl:{
                query:config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetIntegralExchangeRecorde',//条件查询
                },
            queryParams:{//查询条件参数
                    CardCodeOrMobile:'',//会员卡号或者手机号码
                    ChannelId:"",//兑换渠道ID
                    GradeId:"",//会员等级
                    PlatformId:"",//兑换平台 0线上 1 线下
                    ExchTypeid:'',//兑换类型 1为卡券兑换,2商品兑换,3 服务兑换,4升级兑换
                    ExchName:"",//兑换名称
                    CreateTimeBegin	:"",//兑换时间开始
                    CreateTimeEnd:"",//兑换时间结束
                    CreateTimeEnd:"",//充值时间结束
                    Sorting:'',
                    QueryType:1,
                    SkipCount:(this.$store.state.recordExchangeListCurrentPage-1)*this.$store.state.recordExchangeListEachPage,
                    MaxResultCount:this.$store.state.recordExchangeListEachPage,
                    },
            searchParams:{
                    QuikInput:"",
                    QueryType:2,
                    SkipCount:(this.$store.state.recordExchangeListCurrentPage-1)*this.$store.state.recordExchangeListEachPage,
                    MaxResultCount:this.$store.state.recordExchangeListEachPage,
            },
                column: [{
                    prop:'exchCode',
                    label:'兑换单号',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop:'cardCode',
                    label:'会员卡号',
                    controls:'text',
                    isDisable:true,
                    sortable:false, 
                    },{
                    prop:'mobile',
                    label:'手机号码',
                    controls:'text',
                    isDisable:true,
                    sortable:false, 
                    }, {
                    prop:'memberName',
                    label:'姓名',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    }, {
                    prop:'exchTypeName',
                    label: '兑换类型',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    }, {
                    prop:'exchName',
                    label: '兑换名称',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    },{
                    prop:'exchQty',
                    label: '兑换数量',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'integral',
                    label: '消耗积分',
                    controls:'text',
                    isDisable:true,
                    sortable:false, 
                    }, {
                    prop: 'presentAmount',
                    label: '兑换渠道',
                    controls:'text',
                    isDisable:true,
                    sortable:false, 
                    },{
                    prop:'platformName',
                    label: '兑换平台',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'tacticName',
                    label: '规则名称',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'createdTime',
                    label: '兑换时间',
                    controls:'datetimer',
                    isDisable:true,
                    sortable:false,
                    width:'180px'
                    }],
                dialogVisible:false,
                dialogCommand:[],
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
                 effectiveStart:"",
                 effectiveEnd:"",
                 //兑换平台
                 BillOpt:[{
                     id:0,
                     billName:'线上'                  
                 },
                 {
                     id:1,
                     billName:'线下'
                 }],
                 //兑换类型
                 ExchType:[{
                     id:1,
                     itemName:'卡券兑换'
                 },
                 {
                     id:2,
                     itemName:'商品兑换'
                 },{
                     id:3,
                     itemName:'服务兑换'
                 },
                 {
                     id:4,
                     itemName:'升级兑换'
                 }],
                filterKey1:'',
                filterKey2:'',
                command:[],

        }
    },
    computed:{
       Grade: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey1,this.GradeOpt)
      },
      Channel: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey2,this.ChannelOpt)
      },
    },
    methods:{
        filterMethod1(query){
           this.filterKey1=query; 
        
       },
       filterMethod2(query){
           this.filterKey2=query; 
        
       },
        filterMethod3(query){
           this.filterKey3=query; 
        
       },
        btnClick(btn){//按钮组点击事件
            if(btn=="导出"){
              alert("测试导出")   
            }
        },
        //---左侧搜索展开----------------------------------------------------
        closeLeft(){
            this.ifWidth = false;
            this.ifOpen = false;
        },
        openLeft(){
            this.ifWidth = true;
            this.ifOpen = true;
        },
        searchRight() {
            this.getDataList();
        },
         //---------------------------------加载会员等级----------------------------------------------
         loadMemberGrade:function(){
                let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberGradeManagement/GetMemberGradeList").then(res => {
                _this.GradeOpt=res.result;
                }) ;
         },
         //---------------------------------加载兑换渠道------------------------------------------------
         loadChannelOpt:function(){
               let _this=this;
                _this.$axios.gets("/api/services/app/ShopManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.ChannelOpt=res.result.items;
              })
         },
         loadTable(){
                let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetIntegralExchangeRecorde',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams)
                _this.$store.commit('Init_Table',res.result.items); 
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.recordExchangeListEachPage);
                _this.$store.commit('Init_pagination',totalPage) 
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1            
            })     
         },
         //------------------------------------查询-------------------------------------
        query:function(){
            let _this=this;
            if(_this.RechargeTime==null){
                _this.queryParams.CreateTimeBegin='';
                _this.queryParams.CreateTimeEnd=''
            }else if(_this.RechargeTime.length==0){
                _this.queryParams.CreateTimeBegin=_this.RechargeTime[0];
                 _this.queryParams.CreateTimeEnd=_this.RechargeTime[1];
            }else{
                 _this.queryParams.CreateTimeBegin=_this.RechargeTime[0];
                 _this.queryParams.CreateTimeEnd=_this.RechargeTime[1];
            }
             _this.loadTable();
            
        },

        //右上角搜索
        getDataList(){
            let _this=this;
          _this.searchParams.QuikInput= $.trim(_this.searchParams.QuikInput                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetIntegralExchangeRecorde',_this.searchParams).then(function(res){//查询表格数据
            _this.$store.commit('setQueryParams',_this.queryParams)
            _this.$store.commit('Init_Table',res.result.items); 
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.rechargeRecordListEachPage);
            _this.$store.commit('Init_pagination',totalPage) 
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1            
        }) 
        }
    }
}
</script>
<style scoped>
.bb1{
    border-bottom: 1px solid #E4E4E4;
}
.record-exchange .leftBox{
    width: 290px;
}
.record-exchange .newRight{
    width: 100%;
}
.record-exchange .smallRangeDate{
    height: 35px;
}
.record-exchange .smallRangeDate .el-input__inner{
    height: 35px;
}
.record-exchange .rangeDate{
    width: 181.25px;
}
.record-exchange .f14{
    font-size: 14px;
}
.record-exchange .border-left{
    border-left: 1px solid #E4E4E4;
}
</style>
<style>
.record-exchange .smallRangeDate .el-range-separator{
    line-height: 35px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.border-left.rightBox{
    width: calc(100% - 290px);
}
.line-height28{
    line-height:28px;
}
.record-exchange .el-date-editor .el-range__close-icon{
 display: inline-block;
}
.record-exchange .rangeDate input.el-range-input {
    width: calc(50% - 20px);
}
.record-exchange .el-date-editor .el-range__close-icon{
    width:18px;
}
</style>


