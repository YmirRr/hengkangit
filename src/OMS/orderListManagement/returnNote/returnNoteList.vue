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
        <!--单据号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">单据号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.RtoCode"></el-input>
          </el-col>
        </el-row>
        <!--店铺-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">店铺</label>
          </el-col>
          <el-col :span="15">
            <el-select
               filterable
               clearable
               v-model="queryParams.WebshopId"
              :filter-method="filterMethod"
              placeholder="" class="input-entry">
              <el-option
                v-for="item in WebshopId1"
                :key="item.shopId" :label="item.shopName" :value="item.shopId">
                <span style="float: left">{{item.shopCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--开单时间选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">开单时间</label>
          </el-col>
          <el-col :span="15">
            <div class="bgcolor smallBgcolor" id="billingDate">
              <div class="rangeDate">
                <el-date-picker
                  v-model="billingDateRange"
                  class="dateRange"
                  type="datetimerange"
                  @change="getBillingTime"
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
        <!--生效时间选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">生效时间</label>
          </el-col>
          <el-col :span="15">
            <div class="bgcolor smallBgcolor" id="effectDate">
              <div class="rangeDate">
                <el-date-picker
                  v-model="effectDateRange"
                  class="dateRange"
                  type="datetimerange"
                  @change="getEffectTime"
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
        <!--退货仓-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">退货仓</label>
          </el-col>
          <el-col :span="15">
            <el-select
              clearable
              filterable  v-model="queryParams.ReturnStockId"
              :filter-method="filterStockMethod"
              placeholder="" class="input-entry">
              <el-option
                v-for="item in ReturnStockId1"
                :key="item.id"
                :label="item.stockName"
                :value="item.id">
                <span style="float: left">{{item.stockCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--单据状态-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">单据状态</label>
          </el-col>
          <el-col :span="15">
            <el-select clearable filterable   v-model="queryParams.Status" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.StatusArr" :key="item.id" :label="item.statuName" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--会员卡号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">会员卡号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.MemberCardCode"></el-input>
          </el-col>
        </el-row>
        <!--物流公司-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">物流公司</label>
          </el-col>
          <el-col :span="15">
            <el-select
              filterable
              clearable
              :filter-method="filterlogisticMethod"
              v-model="queryParams.LogisticsId"
              placeholder="" class="input-entry">
              <el-option
                v-for="item in logisticsCompanyArr1"
                :key="item.id"
                :label="item.contactName"
                :value="item.id">
                <span style="float: left">{{item.contactCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contactName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--快递单号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">物流单号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.LogisticsBillCode"></el-input>
          </el-col>
        </el-row>
        <!--买家昵称-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">买家昵称</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.BuyerNickname"></el-input>
          </el-col>
        </el-row>
        <!--买家电话-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">买家电话</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.BuyerPhone"></el-input>
          </el-col>
        </el-row>
        <!--售后单号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">售后单号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.ServiceCode"></el-input>
          </el-col>
        </el-row>
        <!--来源交易号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">来源交易号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.SourceTransCode"></el-input>
          </el-col>
        </el-row>
        <!--来源订单号-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">来源订单号</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.SourceOrderCode"></el-input>
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
    <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
</template>

<script>
  import buttonGroup from '../../../base/buttonGroup/buttonGroup'
  import Table from '../../../base/Table/Table'
  import dialogBox from '../../../base/dialog/dialog'
  import {FILTER_MOTHED} from '../../../common/common.js'
  import config from "../../../../static/config.js";
  // import axios from 'axios'
  export default {
    data() {
      return {
        url:config.base.ip+':'+config.base.basicPort,//8082
        url2:config.base.ip+':'+config.base.omsPort,//8099
        // url:"http://192.168.100.107:8099",//提取公用服务器地址
        ifOpen:false,
        search: "",
        billingDateRange:[],
        effectDateRange:[],
        searchData: {
          OuCode: "", //编码
          Name: "", //名称
          CompanyOuId: "", //所属公司
          AreaId: "", //行政地区
          Status: "", //启用状态
          OuType: "" //组织类型
        },
        selectData: {
          WebshopIdArr:[],//店铺
          ReturnStockIdArr:[],//退货仓
          StatusArr:[{id:0,statuName:"未审核"},{id:1,statuName:"已生效"},{id:2,statuName:"已作废"}],//单据状态
          logisticsCompanyArr:[],//物流公司数组
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
        checkId:'',//选中的id
        againstCheckId:'',//
        Name: "" ,//右上角模糊查询
        tableModel:'returnNoteList',
        buttonGroup:[
          {
          text:'审核',
          class:'bt_in',
          icon:'icon-shenhe',
          disabled:false,
        },{
          text:'反审核',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
            text:'挂起',
            class:'bt_in',
            icon:'',
            disabled:false,
        },{
            text:'解挂',
            class:'bt_in',
            icon:'',
            disabled:false,
        },{
          text:'删除',
          class:'bt_del',
          icon:'icon-shanchu',
          disabled:false,
        },{
          text:'打印',
          class:'bt_print',
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
          view:'/returnNote/returnNoteDetails/',//查看详情路由
          delete:config.base.ip+':'+config.base.omsPort+'/api/services/app/OmsRtoManagement/DeleteOmsWebrto',//单条删除
          query:config.base.ip+':'+config.base.omsPort+'/api/services/app/OmsRtoManagement/GetSearchData',//条件查询
        },
        queryParams:{//查询条件参数
          RtoCode:'', //退货单据号
          WebshopId:'', //网店ID
          CreatedTimeStart:'', //开单日期开始时间
          CreatedTimeEnd:'', //所开单日期结束时间
          EffectiveTimeStart	:'', //生效日期开始时间
          EffectiveTimeEnd:'', //生效日期结束时间
          ReturnStockId:'',//退货仓库ID
          Status:'',//单据状态
          MemberCardCode:'',//会员卡号
          LogisticsId:'',//物流公司ID (客户/供应商ID)
          LogisticsBillCode:'',//物流单号
          BuyerNickname:'',//买家昵称
          BuyerPhone:'',//买家电话
          ServiceCode:'',//售后单号
          SourceTransCode:'',//来源交易号
          SourceOrderCode:'',//来源订单号
          SkipCount:(this.$store.state.returnNoteListCurrentPage-1)*this.$store.state.returnNoteListEachPage,
          MaxResultCount:this.$store.state.returnNoteListEachPage,
        },
        // 列表所有数据只负责显示，不能编辑修改，点击“查看”进入到详情页，可修改的都在那里了
        column: [
          {
          prop:'rtoCode',
          label: '单据号',
          controls:'text',
          isDisable:true,
          sortable:false,
          isFix:true
        },{
          prop:'webshopName',
          label: '店铺',
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'createdTime',
          label: '开单日期',
          controls:'datetime',
          width:"130px",
          isDisable:true,
          sortable:false,
        },{
          prop:'effectiveTime',
          label:'生效日期',
          width:"130px",
          controls:'datetime',
          isDisable:true,
          sortable:false,
        }, {
          prop:'returnStockName',
          label:'退货仓',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'buyerNickname',
          label:'买家昵称',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'buyerPhone',
          label:'买家电话',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        }, {
          prop:'logisticsName',
          label: '物流公司',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:"logisticsBillCode",
          label:'物流单号',
          width:"180px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'serviceCode',
          label: '售后单号',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'sourceTransCode',
          label: '来源交易号',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'sourceOrderCode',
          label: '来源订单',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'payAmount',
          label: '结算金额',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'status',
          label: '单据状态',
          width:"130px",
          isDisable:true,
          sortable:false,
          controls:'classMapSelect',
          dataSource:[],
          optionsKey:{label:'itemName',value:'itemValue'},
        },{
          prop:'returnReason',
          label: '退货原因',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'buyerMsg',
          label: '买家备注',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop:'salerMsg',
          label: '卖家备注',
          width:"130px",
          controls:'text',
          isDisable:true,
          sortable:false,
        }
        ],
        dialogVisible:false,
        dialogCommand:[],
        pluginSetting:{
          hasPagination:true,
          mutiSelect:true,//多选栏
          isDisable:true,
          isFix:'right',
        },
        command:[{
          text:'查看',
          class:'green'
        },{
          text:'删除',
          class:'blue'
        }],
        delAarry:{//删除数组
          ids:[]
        },
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        filterKey:'',
        filterStockKey:'',
        filterlogisticKey:'',
      };
    },
    computed:{
      WebshopId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterKey,this.selectData.WebshopIdArr)
      },
      ReturnStockId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockKey,this.selectData.ReturnStockIdArr)
      },
      logisticsCompanyArr1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterlogisticKey,this.selectData.logisticsCompanyArr)
      },
    },
    created: function() {
      let _this = this;
      _this.getSelectData();
    },

    methods: {
      getSelectData() {
        let _this = this;
        // 店铺
        _this.$axios.gets(_this.url2+"/api/services/app/OmsWebShopManagement/GetAll", {
          SkipCount:0,
          MaxResultCount:999
        }).then(function(res) {
          _this.selectData.WebshopIdArr = res.result.items;
          // _this.WebshopIdArr = res.result;
          console.log(_this.selectData.WebshopIdArr);
        });
        // 退货仓库
        _this.$axios.gets(_this.url+"/api/services/app/StockManagement/GetRepositoryList", {
          defaultOuId:'',
          StockCode:'',
          StockName:'',
          AreaCode:'',
          StockTypeId:'',
          SkipCount: 0,
          MaxResultCount: 10
        }).then(function(res) {
          _this.selectData.ReturnStockIdArr = res.result.items;
          // _this.ReturnStockId = res.result.items;
          console.log( _this.selectData.ReturnStockIdArr);
        });
        // 物流公司下拉
        _this.$axios.gets(_this.url+"/api/services/app/ContactManagement/GetListByConditionSupplier",
          {
            ContactWorkPropertyId:1,
            SkipCount: 0,
            MaxResultCount: 1000
          }).then(function(res) {
          _this.selectData.logisticsCompanyArr = res.result.items;
          // _this.logisticsCompany = res.result.items;
          console.log(_this.selectData.logisticsCompanyArr);
        });

        _this.$axios
          .gets(_this.url+"/api/services/app/UserGroup/GetAll", {
            SkipCount: 0,
            MaxResultCount: 100
          })
          .then(function(res) {
            // 所属用户组
            _this.selectData.userGroupId = res.result.items;
            _this.totalCount = res.result.totalCount;
          });
      },
      filterMethod(query){
        this.filterKey=query;
      },
      filterStockMethod(query){
        this.filterStockKey=query;
      },
      filterlogisticMethod(query){
        this.filterlogisticKey=query;
      },
      getBillingTime(date){
        this.time = date;
        this.billingDateRange=this.time;
        console.log(this. billingDateRange);
      },
      getEffectTime(date){
        this.time = date;
        this.effectDateRange=this.time;
        console.log(this.effectDateRange);
      },
      btnClick:function(data){
        if(data=="挂起"){
          this.suspendRto()
        }else if(data=="解挂"){
          this.relieveSuspendRto()
        }else if(data=="审核"){
          this.checkOrder();
        }else if(data=="反审核"){
          this.againstCheckOrder();
        }else if(data=="删除"){
          this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
          if(this.SelectionChange.length==0){
            this.$message({
              type: 'warning',
              message: '请先勾选需要删除的项！'
            });
          }else{
            this.dialogSetting.dialogName='delDialog';
            this.dialogSetting.message="确定删除？";
            this.dialogSetting.dialogType="confirm";
            this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            this.dialogVisible=true;
          }
        }
      },
      checkOrder(){//审核
        let _this=this;
        _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
        if(_this.SelectionChange.length==0){
          this.$message({
            type: 'warning',
            message: '请勾选需要审核的项！'
          });
        }else if(_this.SelectionChange.length>1){
          this.$message({
            type: 'warning',
            message: '一次只能审核一条！'
          });
        }else{
          for(let i in _this.SelectionChange){
            _this.checkId=_this.SelectionChange[i].id;
          }
          _this.$axios.posts(_this.url2+"/api/services/app/OmsRtoManagement/Check", {id:_this.checkId}
          ).then(function(res) {
            _this.open('审核成功','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'cancelDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }
      },
      againstCheckOrder(){//反审核
        let _this=this;
        _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
        if(_this.SelectionChange.length==0){
          _this.$message({
            type: 'warning',
            message: '请勾选需要反审核的项！'
          });
        }else if(_this.SelectionChange.length>1){
          _this.$message({
            type: 'warning',
            message: '一次只能反审核一条！'
          });
        }else{
          for(let i in _this.SelectionChange){
            _this.againstCheckId=_this.SelectionChange[i].id;
          }
          _this.$axios.posts(_this.url2+"/api/services/app/OmsRtoManagement/InsteadCheck", {id:_this.againstCheckId}
          ).then(function(res) {
            _this.open('反审核成功','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'cancelDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }
      },
      suspendRto(){//挂起
        let _this=this;
        let ids=[];
        let selectedIdArr=_this.$store.state[_this.tableModel+'Selection'];
        selectedIdArr.map((item)=> {
          ids.push(item.id)
        });
        console.log(ids);
        if(ids.length>0){
          _this.$axios.posts(_this.url2+"/api/services/app/OmsRtoManagement/SuspendRto", ids).then(function(res) {
          _this.open('挂起成功！','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'cancelDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }else{
          _this.$message({
            type: 'warning',
            message: '请先勾选！'
          });
        }
      },
      relieveSuspendRto(){//解挂
        let _this=this;
        let ids=[];
        let selectedIdArr=this.$store.state[this.tableModel+'Selection'];
        selectedIdArr.map((item)=> {
          ids.push(item.id)
        });
        if(ids.length>0){
          _this.$axios.posts(_this.url2+"/api/services/app/OmsRtoManagement/RelieveSuspendRto", ids).then(function(res) {
            _this.open('解挂成功！','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'cancelDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }else{
          _this.$message({
            type: 'warning',
            message: '请先勾选！'
          });
        }
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
        console.log(typeof(_this.billingDateRange));
        console.log(typeof(_this.effectDateRange));
        if(!_this.billingDateRange){//时间为空
            if(!_this.effectDateRange){
              _this.queryParams.CreatedTimeStart='';
              _this.queryParams.CreatedTimeEnd='';
              _this.queryParams.EffectiveTimeStart='';
              _this.queryParams.EffectiveTimeEnd='';
              _this.$axios.gets(_this.url2+'/api/services/app/OmsRtoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.returnNoteListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
              })
            }else{
              _this.queryParams.CreatedTimeStart='';
              _this.queryParams.CreatedTimeEnd='';
              _this.queryParams.EffectiveTimeStart=_this.effectDateRange[0];
              _this.queryParams.EffectiveTimeEnd=_this.effectDateRange[1];
              _this.$axios.gets(_this.url2+'/api/services/app/OmsRtoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.returnNoteListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
              })
            }
        }else{
          if(!_this.effectDateRange){
            _this.queryParams.CreatedTimeStart=_this.billingDateRange[0];
            _this.queryParams.CreatedTimeEnd=_this.billingDateRange[1];
            _this.queryParams.EffectiveTimeStart='';
            _this.queryParams.EffectiveTimeEnd='';
            _this.$axios.gets(_this.url2+'/api/services/app/OmsRtoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
              _this.$store.commit('setQueryParams',_this.queryParams);
              _this.$store.commit('Init_Table',res.result.items);
              let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.returnNoteListEachPage);
              _this.$store.commit('Init_pagination',totalPage);
              _this.$store.commit('Init_TotalCount',res.result.totalCount);
              _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
            })
          }else{
            _this.queryParams.CreatedTimeStart=_this.billingDateRange[0];
            _this.queryParams.CreatedTimeEnd=_this.billingDateRange[1];
            _this.queryParams.EffectiveTimeStart=_this.effectDateRange[0];
            _this.queryParams.EffectiveTimeEnd=_this.effectDateRange[1];
            _this.$axios.gets(_this.url2+'/api/services/app/OmsRtoManagement/GetSearchData',_this.queryParams).then(function(res){//查询表格数据
              _this.$store.commit('setQueryParams',_this.queryParams);
              _this.$store.commit('Init_Table',res.result.items);
              let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.returnNoteListEachPage);
              _this.$store.commit('Init_pagination',totalPage);
              _this.$store.commit('Init_TotalCount',res.result.totalCount);
              _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
            })
          }
        }
      },
      goDetail() {//查看详情
        this.$store.state.url = "/returnNote/returnNoteDetails/default";
        this.$router.push({ path: this.$store.state.url }); //点击切换路由
      },
      dialogClick(parmas){//对话框按钮点击事件
        let _this=this;
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="delDialog"){
            _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
            console.log(_this.SelectionChange);
            for(let i in _this.SelectionChange){
              _this.delAarry.ids.push(_this.SelectionChange[i].id)
            }
            //批量删除
            _this.$axios.posts(_this.url2+'/api/services/app/OmsRtoManagement/BatchDeleteOmsWebrto',_this.delAarry).then(function(res){
              _this.$store.commit('setQueryParams',_this.queryParams);
              _this.$store.dispatch('InitTable');
              _this.$store.commit('setTableSelection',[]);
              _this.dialogVisible=false;
              _this.loadTree();
              _this.delAarry.ids=[];
              _this.open('删除成功','el-icon-circle-check','successERP');
            }).catch(function(err){
              _this.dialogVisible=false;
              _this.delAarry.ids=[];
              _this.$message({
                type: 'warning',
                message: err.error.message
              });
            });
          }else if(parmas.dialogName=="cancelDialog"){
            _this.dialogVisible=false;
          }
        }else if(parmas.dialogButton=="取消"){
          this.dialogVisible=false;
        }
      },
      dialogColse(){
        this.dialogVisible=false;
      },
    },
    components:{
      buttonGroup,
      Table,
      dialogBox,
    }
  };
</script>

<style scoped>
  .border-left.rightBox{
    width: calc(100% - 290px);
  }
  .bg-white {
    background: white;
    /* border-radius: 3px; */
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


/*----------------------*/
  .userList .el-button + .el-button {
    margin-left: 0;
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
  #billingDate,#effectDate{
    /*width:181px;*/
  }
  .mt20{
    margin-bottom:20px;
  }
  .el-input__icon{
    line-height:35px;
  }
  /*结束*/
</style>
