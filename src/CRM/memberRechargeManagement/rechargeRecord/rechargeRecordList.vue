
<template>
    <div class="recharge-record commodity member-list">
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
                        <label class="input-label">会员卡号</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.CardCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">会员姓名</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.MemberName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">手机号码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.Mobile"></el-input>
                    </el-col>
                </el-row>


                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">单号</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.BillNo"></el-input>

                    </el-col>

                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">充值渠道</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.ChannelId" filterable  :filter-method="filterMethod1">
                            <el-option v-for="item in Channel" :key="item.id" :label="item.shopName" :value="item.id">
                                <span>{{ item.shopName }}</span>
                                <span>{{ item.shopCode }}</span>
                         </el-option>
                        </el-select>

                    </el-col>
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">单据类型</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.ChangeType" filterable>
                            <el-option v-for="items in BillOpt" :key="items.id" :label="items.billName" :value="items.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">充值时间</label>
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
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">营业员</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.PersonnelName" filterable :filter-method="filterMethod2">
                            <el-option v-for="item in PersonOpt" :key="item.id" :label="item.employeeName" :value="item.id">
                                <span>{{ item.employeeName }}</span>
                                <span>{{ item.employeeCode }}</span>
                            </el-option>

                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">操作员</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.CreateBy" filterable :filter-method="filterMethod3">
                            <el-option v-for="item in User" :key="item.id" :label="item.displayName" :value="item.id">
                                <span>{{ item.displayName }}</span>
                                <span>{{ item.userCode }}</span>
                            </el-option>
                        </el-select>
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
                                            <input type="text" placeholder="手机号\编号\姓名..." v-model="searchParams.input" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
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
                         <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
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
        this.loadChannelOpt();//加载渠道
        this.loadPerson();//加载营业员
        this.loadUserOpt();//加载操作人员
        this.loadRechargeBillType();//加载单据类型
    },
    watch:{
        ifWidth:function(val,oldval){
            console.log(val,oldval)
        }
    },
    data(){
        return{
            url:"http://192.168.100.107:8092",//提取公用服务器地址
            valueDate:'',
            ChannelOpt:[],//操作渠道
            Person:[],//营业员
            UserOpt:[],//操作人员
            RechargeTime:[],//充值时间
            tableModel:'rechargeRecordList',
            //按钮组
            buttonGroup:[
                {
                    text:'打印',
                    class:'bt_print',
                    icon:'icon-print',
                    disabled:false,
                },
                {
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
            }],
            ifWidth:false,
            ifOpen:false,
            httpUrl:{
                query:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberRechargeManagement/GetALLRechargeDayb',//条件查询
                },
            queryParams:{//查询条件参数
                    CardCode:'',//卡号
                    MemberName: '',//会员名字
                    Mobile:'',//手机号
                    BillNo:'',// 充值单号
                    ChannelId:"",//充值渠道
                    ChangeType:"",//变更类型
                    RechargeTime:'',//充值时间
                    Sorting:"",//排序
                    CreateBy:"",//操作人
                    PersonnelName:"",//营业员
                    RechargeTimeBegin:"",//充值时间开始
                    RechargeTimeEnd:"",//充值时间结束
                    SkipCount:(this.$store.state.rechargeRecordListCurrentPage-1)*this.$store.state.rechargeRecordListEachPage,
                    MaxResultCount:this.$store.state.rechargeRecordListEachPage,
                    },
            searchParams:{
                    input:"",
                    SkipCount:(this.$store.state.rechargeRecordListCurrentPage-1)*this.$store.state.rechargeRecordListEachPage,
                    MaxResultCount:this.$store.state.rechargeRecordListEachPage,
            },
                column: [{
                    prop:'billTypeName',
                    label:'单据类型',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop:'billNo',
                    label:' 单号',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop:'cardCode',
                    label:'会员卡号',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    }, {
                    prop:'memberName',
                    label: '会员姓名',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    }, {
                    prop:'mobile',
                    label: '手机号码',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    width:'130px'
                    },{
                    prop:'orgAmount',
                    label: '上次余额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'rechargeAmount',
                    label: '充值金额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'presentAmount',
                    label: '赠送金额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'amount',
                    label: '本次余额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'channelName',
                    label: '充值渠道',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'rechargeTime',
                    label: '充值时间',
                    controls:'datetimer',
                    isDisable:true,
                    sortable:false,
                    width:'210px'
                    },{
                    prop:'personnelName',
                    label: '营业员',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'cashPay',
                    label: '现金',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'cardPay',
                    label: '银行卡',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'zhifubaoPay',
                    label: '支付宝',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'weixinPay',
                    label: '微信',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'remainPay',
                    label: '储值余额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'kaquanPay',
                    label: '卡券',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'sourceBillNo',
                    label: '关联单号',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }],
                dialogVisible:false,
                dialogCommand:[],
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
                command:[],
                 effectiveStart:"",
                 effectiveEnd:"",
                 BillOpt:[{
                     id:1,
                     billName:'充值'
                 },
                 {
                     id:2,
                     billName:'期初'
                 },
                 {
                     id:3,
                     billName:'红冲'
                 }],
                filterKey1:'',
                filterKey2:'',
                filterKey3:'',
                g:'',

        }
    },
    computed:{
       Channel: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey1,this.ChannelOpt)
      },
       PersonOpt: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey2,this.Person)
      },
       User: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey3,this.UserOpt)
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
            if(btn=="打印"){
              alert("测试打印")
            }else if(btn=="导出"){
                alert("测试导出")
            }
        },
        // handleChannelFilter(val){
        //    console.log(val);
        //    for(let i=0;i<this.ChannelOpt.length;i++){
        //        if(this.ChannelOpt[i].shopCode==val){
        //            console.log(111)
        //        }

        //    }
        // },
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
         //---------------------------------加载营业员员----------------------------------------------
         loadPerson:function(){
                let _this=this;
                _this.$axios.gets("/api/services/app/EmployeeManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.Person=res.result.items;
                console.log(_this.Person)
                 }) ;
         },
         //---------------------------------加载操作渠道------------------------------------------------
         loadChannelOpt:function(){
               let _this=this;
                _this.$axios.gets("/api/services/app/ShopManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.ChannelOpt=res.result.items;
                console.log( _this.ChannelOpt)
              })
         },
         //---------------------------------加载操作人------------------------------------------------
         loadUserOpt:function(){
               let _this=this;
                _this.$axios.gets("/api/services/app/User/GetAll",{SkipCount:0,MaxResultCount:10000}).then(res => {
                _this.UserOpt=res.result.items;
                console.log(_this.UserOpt)
              })
         },
         loadRechargeBillType(){
              let _this=this;
                _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem",{dictName:'rechargeBillType'}).then(res => {
                // _this.UserOpt=res.result.items;
                console.log(res);
              })
         },
         loadTable(){
                let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberRechargeManagement/GetALLRechargeDayb',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams)
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.rechargeRecordListEachPage);
                _this.$store.commit('Init_pagination',totalPage)
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
            })
         },
         //------------------------------------查询-------------------------------------
        query:function(){
            let _this=this;
            console.log(_this.RechargeTime);
            if(_this.RechargeTime==null){
                _this.queryParams.RechargeTimeBegin='';
                _this.queryParams.RechargeTimeEnd=''
            }else if(_this.RechargeTime.length==0){
                _this.queryParams.RechargeTimeBegin=_this.RechargeTime[0];
                 _this.queryParams.RechargeTimeEnd=_this.RechargeTime[1];
            }else{
                 _this.queryParams.RechargeTimeBegin=_this.RechargeTime[0];
                 _this.queryParams.RechargeTimeEnd=_this.RechargeTime[1];
            }
             _this.loadTable();

        },

        //右上角搜索
        getDataList(){
            let _this=this;
          _this.searchParams.input= $.trim(_this.searchParams.input);
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberRechargeManagement/GetALLRechargeDaybByOneCondition',_this.searchParams).then(function(res){//查询表格数据
            _this.$store.commit('setQueryParams',_this.queryParams)
            _this.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.rechargeRecordListEachPage);
            _this.$store.commit('Init_pagination',totalPage)
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        })
        },
        tableFunction(data){
            if(data.button=="打印"){
                alert("测试打印")
            }else if(data.button=="红冲"){
                alert("测试红冲!")
            }
        }
    }
}
</script>
<style scoped>
.bb1{
    border-bottom: 1px solid #E4E4E4;
}
.recharge-record .leftBox{
    width: 290px;
}
.recharge-record .newRight{
    width: 100%;
}
.recharge-record .smallRangeDate{
    height: 35px;
}
.recharge-record .smallRangeDate .el-input__inner{
    height: 35px;
}
.recharge-record .rangeDate{
    width: 181.25px;
}
.recharge-record .f14{
    font-size: 14px;
}
.recharge-record .border-left{
    border-left: 1px solid #E4E4E4;
}
</style>
<style>
.recharge-record .smallRangeDate .el-range-separator{
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
.recharge-record .el-date-editor .el-range__close-icon{
 display: inline-block;
}
.recharge-record .rangeDate input.el-range-input {
    width: calc(50% - 20px);
}
.recharge-record .el-date-editor .el-range__close-icon{
    width:18px;
}
</style>


