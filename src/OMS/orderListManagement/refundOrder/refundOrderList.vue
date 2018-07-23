<template>
  <div class="userList commodity">
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

        <!--下拉选择店铺-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">店铺</label>
          </el-col>
          <el-col :span="15">
            <el-select
              filterable
              clearable
              :filter-method="filterMethod"
              v-model="queryParams.WebshopId"
              placeholder="" class="input-entry">
              <el-option v-for="item in WebshopId1"
                         :key="item.shopId" :label="item.shopName" :value="item.shopId">
                <span style="float: left">{{item.shopCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--下拉选择退款类型-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">退款类型</label>
          </el-col>
          <el-col :span="15">
            <el-select clearable filterable   v-model="queryParams.RefundTypeId" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.RefundTypeId" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--下拉选择退款状态-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">退款状态</label>
          </el-col>
          <el-col :span="15">
            <el-select clearable filterable   v-model="queryParams.RefundStatus" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.RefundStatus" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--填写售后单号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">售后单号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.ServiceCode"></el-input>
          </el-col>
        </el-row>
        <!--填写退款编号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">退款编号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.RfoCode"></el-input>
          </el-col>
        </el-row>
        <!--填写网店交易号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">网店交易号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.WebshopTransCode"></el-input>
          </el-col>
        </el-row>
        <!--退款金额-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">退款金额</label>
          </el-col>
          <el-col :span="15">
            <!--<el-input class="input-entry" v-model="queryParams.DisplayName"></el-input>-->
            <!--<div class="rangeDate">-->
            <!--<input type="text" class="el-range-input">-->
            <!--<span>至</span>-->
            <!--<input type="text" class="el-range-input">-->
            <!--</div>-->
            <div id="rangMoney" class="el-date-editor el-range-editor el-input__inner dateRange el-date-editor--daterange">
              <input  class="el-range-input moneyMin"  v-model="queryParams.RefundAmountMin" placeholder="最小金额">
              <span class="el-range-separator">至</span>
              <input  class="el-range-input moneyMax"  v-model="queryParams.RefundAmountMax" placeholder="最大金额">
            </div>
          </el-col>
        </el-row>
        <!--申请时间选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">申请时间</label>
          </el-col>
          <el-col :span="15">
            <div>
              <div class="rangeDate">
                <el-date-picker
                  v-model="dateRange"
                  class="dateRange"
                  type="datetimerange"
                  @change="getTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>


        <el-row class="mt20">
          <el-col :span="8">
            <div class="height1"></div>
          </el-col>
          <el-col :span="14">
            <span class="search-btn" @click="SimpleSearchClick">查询</span>
          </el-col>
        </el-row>
      </el-col>

      <el-col class="border-left min-height" :class="ifOpen?'rightBox':'newRight'">
        <el-row class="h48">
          <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
            <div @click="openLeft">
              <img src="../../../../static/image/common/search_btn.png">
              <span>查询</span>

              <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
            </div>
          </el-col>
          <el-col :span="ifWidth?24:22" class="bg-white">
            <el-row class="h48 pr10">
              <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--<dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>-->
  </div>
</template>

<script>
  import buttonGroup from '../../../base/buttonGroup/buttonGroup'
  import Table from '../../../base/Table/Table'
  import {FILTER_MOTHED} from '../../../common/common.js'
  import config from "../../../../static/config.js";
  // import config from '../../../../static/config'
  // import dialogBox from '../../../base/dialog/dialog'
  // import Tree from '../../../base/tree/tree'
  export default {
    data() {
      return {
        url:config.base.ip+':'+config.base.basicPort,//8082
        url2:config.base.ip+':'+config.base.omsPort,//8099
        // url:"http://192.168.100.107:8099",
        ifOpen:false,
        search: "",
        selectTree: [],
        item: {
          id: "",
          ouName: ""
        },
        dateRange:[],//申请时间
        expandId: [],
        selectProps: {
          children: "children",
          label: "ouName",
          id: "id"
        },
        searchData: {
          OuCode: "", //编码
          Name: "", //名称
          CompanyOuId: "", //所属公司
          AreaId: "", //行政地区
          Status: "", //启用状态
          OuType: "" //组织类型
        },
        selectData: {
          WebshopIdArr: [], //店铺
          RefundTypeId: [], //退款类型
          RefundStatus: [], //退款状态
        },
        tableData: [],
        pageIndex: 1, //分页的当前页码
        totalPage: 0, //当前分页总数
        oneItem: 10, //每页有多少条信息
        page: 1, //当前页
        totalItem: 0, //总共有多少条消息
        treeCheck: [],
        isClick: [],
        load: "loadTableData",
        ifWidth: false,
        dialogUserDefined: false, //dialog
        response: {
          details: "",
          message: "",
          validationErrors: []
        },
        Name: "" ,//右上角模糊查询
        // tableModel:'userList',
        tableModel:'refundOrderList',
        buttonGroup:[
          {
          text:'打印',
          class:'bt_in',
          icon:'icon-daoru',
          disabled:false,
        },{
          text:'导出',
          class:'bt_out',
          icon:'icon-daochu',
          disabled:false,
        }],
        dialogSetting:{
          message:'',//提示信息
          dialogName:'',//对话框名称
          dialogType:'',//对话框类型
        },
        httpUrl:{
          // view:'/user/userModify/',//查看详情
          // delete:'/api/services/app/User/Delete',//单条删除
          query:config.base.ip+':'+config.base.omsPort+'/api/services/app/OmsRfoManagement/GetSearchData',//条件查询
        },
        queryParams:{//查询条件参数
          WebshopId:'', //网店ID
          RefundTypeId:'', //退款类型ID
          RefundStatus:'', //退款状态
          ServiceCode:'', //售后单号
          RfoCode:'', //退款单据号
          WebshopTransCode:'', //网店交易号
          RefundAmountMin:'',//退款金额最小值
          RefundAmountMax:'',//退款金额最小值
          RequestDateStart:'',//申请开始时间
          RequestDateEnd:'',//申请结束时间
          SkipCount:(this.$store.state.refundOrderListCurrentPage-1)*this.$store.state.refundOrderListEachPage,
          MaxResultCount:this.$store.state.refundOrderListEachPage,
        },
        column: [
          {
            prop:'shopName',
            label: '店铺',
            controls:'text',
            isDisable:true,
            sortable:false,
            isFix:'left',
          },{
            prop:'refundTypeName',
            label: '退款类型',
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'refundStatusName',
            label: '退款状态',
            controls:'text',
            width:"130px",
            isDisable:true,
            sortable:false,
          },{
            prop:'serviceCode',
            label:'售后单号',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop:'rfoCode',
            label:'退款编号',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'webshopTransCode',
            label:'网店交易号',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'refundAmount',
            label:'退款金额',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop:'requestDate',
            label: '申请时间',
            width:"130px",
            controls:'datetime',
            isDisable:true,
            sortable:false,

          },{
            prop:"skuId",
            label:'SKU',
            width:"180px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'buyerNickname',
            label: '买家昵称',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'refundReason',
            label: '退款原因',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'webshopSubtransCode',
            label: '网店子交易号',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'skuStatusName',
            label: '货品状态',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'qty',
            label: '数量',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'onlineSkuId',
            label: '线上商品ID',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'refundExplain',
            label: '退款说明',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'transStatusName',
            label: '交易状态',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'onlinePrice',
            label: '线上单价',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'buyerPhone',
            label: '买家手机',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'buyerMobile',
            label: '买家电话',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },
          //   {
          //   prop:'roleString',
          //   label: '买家姓名',
          //   width:"130px",
          //   controls:'text',
          //   isDisable:true,
          //   sortable:false,
          // },
          {
            prop:'downloadTime',
            label: '下载时间',
            width:"130px",
            controls:'datetime',
            isDisable:true,
            sortable:false,
          },{
            prop:'createdRto',
            label: '是否生成退换货单',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'uncreatedRtoReason',
            label: '生成失败原因',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'logisticsBillCode',
            label: '物流单号',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'logisticsId',
            label: '物流公司',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'remark',
            label: '备注',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
            isFix:'right',
          }
        ],
        dialogVisible:false,
        dialogCommand:[],
        pluginSetting:{
          hasPagination:true,
          mutiSelect:true,//多选栏
          isDisable:true,
        },
        command:[],
        delAarry:{//删除数组
          ids:[]
        },
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        filterKey:'',
      };
    },
    created: function() {
      let _this = this;
      _this.getSelectData();

    },
    watch: {

    },
    computed:{
      WebshopId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterKey,this.selectData.WebshopIdArr)
      },
    },
    methods: {
      getTime(date){
        this.time = date;
        this.dateRange=this.time;
        console.log(this.dateRange);
      },
      btnClick:function(data){
        if(data=="打印"){}else if(data=="导出"){}
      },
      getSelectData() {
        let _this = this;
        // 店铺
        _this.$axios.gets(_this.url2+"/api/services/app/OmsWebShopManagement/GetAll", {
          SkipCount:0,
          MaxResultCount:999
        }).then(function(res) {
          _this.selectData.WebshopIdArr = res.result.items;

        });
        //类型
        _this.$axios.gets(_this.url+"/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_RefundType"
        }).then(function(res) {
          _this.selectData.RefundTypeId = res.result;
          console.log(_this.selectData.RefundTypeId);
        });
      // 退款状态
        _this.$axios.gets(_this.url+"/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_RefundStatus"
        }).then(function(res) {
          _this.selectData.RefundStatus = res.result;
          console.log(_this.selectData.RefundStatus);
        });
      },
      filterMethod(query){
        this.filterKey=query;
      },
      closeLeft: function() {
        let self = this;
        self.ifWidth = false;
        self.ifOpen = false;
      },
      openLeft: function() {
        let self = this;
        self.ifWidth = true;
        self.ifOpen = true;
      },
      open(tittle, iconClass, className) {
        this.$notify({
          position: "bottom-right",
          iconClass: iconClass,
          title: tittle,
          showClose: false,
          duration: 3000,
          customClass: className
        });
      },
      SimpleSearchClick() {//条件搜索
        let _this = this;
        console.log(typeof(_this.dateRange));
        if(!_this.dateRange){
          _this.queryParams.RequestDateStart='';
              _this.queryParams.RequestDateEnd='';
              _this.$axios.gets(_this.url2+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
          })
        }else{
              _this.queryParams.RequestDateStart=_this.dateRange[0];
              _this.queryParams.RequestDateEnd=_this.dateRange[1];
              _this.$axios.gets(_this.url2+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
              })
        }
        // let reg=/^[-+]?\d+$/;
        // if(_this.queryParams.RefundAmountMin==''||_this.queryParams.RefundAmountMax==''){
        //   if(!_this.dateRange){
        //     _this.queryParams.RequestDateStart='';
        //     _this.queryParams.RequestDateEnd='';
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }else{
        //     _this.queryParams.RequestDateStart=_this.dateRange[0];
        //     _this.queryParams.RequestDateEnd=_this.dateRange[1];
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }
        // }else if(!reg.test(_this.queryParams.RefundAmountMin)||!reg.test(_this.queryParams.RefundAmountMax)){
        //   _this.$message({
        //     type: 'warning',
        //     message: "金额只能填写大于0的纯数字"
        //   });
        //   return;
        // }else{
        //   if(!_this.dateRange){
        //     _this.queryParams.RequestDateStart='';
        //     _this.queryParams.RequestDateEnd='';
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }else{
        //     _this.queryParams.RequestDateStart=_this.dateRange[0];
        //     _this.queryParams.RequestDateEnd=_this.dateRange[1];
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }
        // }
        // if(parseInt(_this.queryParams.RefundAmountMin)>parseInt(_this.queryParams.RefundAmountMax)){
        //   _this.$message({
        //     type: 'warning',
        //     message: "最小金额只能小于等于最大金额"
        //   });
        //   return;
        // }else{
        //   if(!_this.dateRange){
        //     _this.queryParams.RequestDateStart='';
        //     _this.queryParams.RequestDateEnd='';
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }else{
        //     _this.queryParams.RequestDateStart=_this.dateRange[0];
        //     _this.queryParams.RequestDateEnd=_this.dateRange[1];
        //     _this.$axios.gets(_this.url+'/api/services/app/OmsRfoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
        //       _this.$store.commit('setQueryParams',_this.queryParams);
        //       _this.$store.commit('Init_Table',res.result.items);
        //       let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.refundOrderListEachPage);
        //       _this.$store.commit('Init_pagination',totalPage);
        //       _this.$store.commit('Init_TotalCount',res.result.totalCount);
        //       _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        //     })
        //   }
        // }
      },
    },
    components:{
      buttonGroup,
      Table
    }
  };
</script>

<style scoped>
  .border-left.rightBox{
    width: calc(100% - 290px);
  }
  .bg-white {
    background: white;
  }
  .h48 {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #e4e4e4;
  }
  .pl15 {
    padding-left: 15px;
  }
  .pt5 {
    padding-top: 5px;
  }
  .fs12 {
    font-size: 12px;
  }
  .border-left {
    border-left: 1px solid #e4e4e4;
  }
  .btn {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: rgba(130, 170, 252, 1);
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  .open-search {
    background-image: url(../../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #e3e3e3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
  }
  /*新加*/
  .mt10{
    height:35px;
  }
  .commodity .bgcolor{
    margin-bottom:0;
  }
  .rangeDate{
    width:100%;
  }
  .rangeDate .el-input__inner{
    border-color:#dcdfe6;
    width:100%;
  }
  .rangeDate .el-input__inner:hover{
    border-color: #c0c4cc;
  }
  .timeTitle{
    font-size:14px;
    text-indent: 0;
  }
  .dialogUserDefined i{
    color:#33CCCC;
    margin-right:10px;
  }
  .el-dialog__body{
    padding:30px 15px;
  }
  #rangMoney{
    width:100%;
    height:35px;
    padding:0
  }
  #rangMoney .el-range-separator{
    padding:0;
    width:20px;
    background-color: rgb(194, 202, 216);
    height: 100%;
    display: inline-block;
    margin: 0;
    line-height: 35px;
    font-size: 12px;
  }
  #rangMoney .moneyMin,#rangMoney .moneyMax{
    /*width: calc(50% - 10px);*/
    width: calc(50% - 15px);
    top: -1px;
    height: 31px;
    position: relative;
    margin: 0;
    padding: 0;
    font-size: 12px;
    border-radius: 5px;
  }
  .userList .el-button + .el-button {
    margin-left: 0;
  }
  .mt20{
    margin-bottom:20px;
  }
  /*结束*/
</style>


