<template>
  <div class="userList commodity">
    <el-row class="bg-white">
      <el-col class="left-box" v-show="ifWidth">
        <!--点击左上角查询展开或收起-->
        <el-row class="h48 pl15">
          <el-col :span="18">
            <img src="../../../static/image/common/search_btn.png" class="closeLeft">
            <span class="f14">查询</span>
          </el-col>
          <el-col :span="2" :offset="4">
            <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
          </el-col>
        </el-row>
        <!--店铺下拉选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">店铺</label>
          </el-col>
          <el-col :span="15">
            <el-select  filterable
                        clearable
                        :filter-method="filterMethod"
                        v-model="queryParams.WebshopId"
                        placeholder="" class="input-entry">
              <el-option
                v-for="item in WebshopId1"
                :key="item.shopId"
                :label="item.shopName"
                :value="item.shopId">
                <span style="float: left">{{item.shopCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--品牌下拉选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">品牌</label>
          </el-col>
          <el-col :span="15">
            <el-select  filterable
                        clearable
                        v-model="queryParams.BrandId"
                        :filter-method="filterBrandIdMethod"
                        placeholder="" class="input-entry">
              <el-option v-for="item in BrandId1" :key="item.id" :label="item.brandName" :value="item.id">
                <span style="float: left">{{item.brandCode}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.brandName}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--SKU填写-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">SKU</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.OnlineSkuId"></el-input>
          </el-col>
        </el-row>
        <!--新增时间选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">新增时间</label>
          </el-col>
          <el-col :span="15">
            <div class="bgcolor smallBgcolor">
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
        <!--宝贝ID填写-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">宝贝ID</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.OnlineProductId"></el-input>
          </el-col>
        </el-row>
        <!--宝贝名称填写-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">宝贝名称</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.OnlineProductName"></el-input>
          </el-col>
        </el-row>
        <!--商家编码填写-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">商家编码</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="queryParams.OnlineSkuCode"></el-input>
          </el-col>
        </el-row>
        <!--宝贝状态下拉选择-->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">宝贝状态</label>
          </el-col>
          <el-col :span="15">
            <el-select  filterable clearable v-model="queryParams.OnlineProductStatus" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">宝贝关联</label>
          </el-col>
          <el-col :span="15">
            <el-select  filterable clearable v-model="queryParams.IsMapping" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.relevance" :key="item.relative" :label="item.label" :value="item.relative">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--查询按钮点击-->
        <el-row class="mt20 searchButton">
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
          <!--默认左边没有展开的条件查询结构-->
          <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
            <div @click="openLeft">
              <img src="../../../static/image/common/search_btn.png">
              <span>查询</span>
              <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
            </div>
          </el-col>
          <!--右边内容（按钮组和列表）-->
          <el-col :span="ifWidth?24:22" class="bg-white">
            <el-row class="h48 pr10">
              <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 点击下载网店宝贝弹出的dialog -->
        <el-dialog :visible.sync="dialogUserDefined" class="dialogUserDefined">
          <template slot="title">
            <i>|</i><span>选择下载店铺</span>
          </template>
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width:100%"
            stripe
            @selection-change="handleSelectionChange"
            ref="multipleTable">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="sellerName" label="卖家昵称"></el-table-column>
            <el-table-column prop="shopCode" label="网店代码"></el-table-column>
            <el-table-column prop="shopName" label="网店名称"></el-table-column>
            <el-table-column prop="platformId" label="平台类型" :formatter="dateFormat"></el-table-column>
          </el-table>
          <!--时间选择 -->
          <el-row class="mt10">
            <el-col :span="4">
              <label class="input-label timeTitle"><i>|</i>时间选择</label>
            </el-col>
            <el-col :span="20">
              <div class="bgcolor smallBgcolor">
                <div class="rangeDate">
                  <el-date-picker
                    v-model="timeAxis"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="—"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </div>
              </div>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitDownload">确 定</el-button>
            <el-button class="cancelDialog" @click="cancelDialog">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 点击下载网店宝贝弹出的dialog结束 -->
        <!--列表组件-->
        <el-row>
          <el-col :span='24'>
            <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" :ifSave="isSave"></Table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
</template>
<script>
  import buttonGroup from '../../base/buttonGroup/buttonGroup';
  import Table from '../../base/Table/Table';
  import dialogBox from '../../base/dialog/dialog';
  import {FILTER_MOTHED} from '../../common/common.js';
  import config from "../../../static/config.js";
  export default {
    data() {
      return {
        loading: true,
        url:config.base.ip+':'+config.base.basicPort,//8082
        url2:config.base.ip+':'+config.base.omsPort,//8099
        // url:"http://192.168.100.107:8099",//提取公用服务器地址
        ifOpen:false,//控制左边查询展开或收起，默认收起
        allData:[],//所有数据
        search: "",
        searchData: {
          SKU: "", //SKU
          goodsID:"",//宝贝ID
          goodsName:"",//宝贝名称
          merchantCode:'',//商家编码
          Status: "", //启用状态
        },
        dateRange:[],//新增时间,
        pickerOptions2: {//下载店铺宝贝时间选择的时间轴配置
          shortcuts: [{
            text: '近3个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
            {
              text: '近1个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近15天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '近3天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '近1天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '近2小时',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1/12);
                picker.$emit('pick', [start, end]);
              }
            },
          ]
        },
        timeAxis:[],//下载店铺宝贝dialog选择时间轴数组，
        tableData: [],//下载店铺宝贝表格数据(选择要下载的店铺列表)
        selectData: {//条件查询下拉数据
          WebshopIdArr:[],//店铺
          BrandIdArr:[],//品牌（因无数据接口，目前写死）
          Status001:[],//宝贝状态
          relevance: [{relative:true,label: '已关联'},{relative:false, label: '未关联'}],//宝贝关联
        },
        pageIndex: 1, //分页的当前页码
        totalPage: 0, //当前分页总数
        oneItem: 10, //每页有多少条信息
        page: 1, //当前页
        totalItem: 0, //总共有多少条消息
        load: "loadTableData",
        ifWidth: false,
        updateArray:[],//修改的数据
        updateArraylength:'',
        isSave:false,
        dialogUserDefined: false, //下载店铺宝贝dialog
        tableModel:'commodityCorrespondenceList',//表格模型
        buttonGroup:[//按钮组设置
          {
            text:'下载网店宝贝',
            class:'bt_in',
            icon:'',
            disabled:false,
          }, {
            text:'导入商家编码',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'同步库存',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'同步零售价',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'同步商家编码',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'保存修改',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'打印',
            class:'bt_print',
            icon:'icon-print',
            disabled:false,
          },{
            text:'导出',
            class:'bt_out',
            icon:'icon-daochu',
            disabled:false,
          }],
        dialogSetting:{//对话框提示信息
          message:'',//提示信息
          dialogName:'',//对话框名称
          dialogType:'',//对话框类型
        },
        dialogVisible:false,
        dialogCommand:[],
        httpUrl:{
          query:config.base.ip+":"+config.base.omsPort+'/api/services/app/OmsProductMappingManagement/GetData',//条件查询
        },
        queryParams:{//查询条件参数
          WebshopId:'', //店铺
          BrandId:'',//品牌
          OnlineSkuId:'', //SKU
          CreatedTimeStart:'', //开始时间
          CreatedTimeEnd:'', //结束时间
          OnlineProductId:'', //宝贝ID
          OnlineProductName:'',//宝贝名称
          OnlineSkuCode:'', //商家编码
          OnlineProductStatus:'',//宝贝状态
          IsMapping:'',//宝贝关联
          SkipCount:(this.$store.state.commodityCorrespondenceListCurrentPage-1)*this.$store.state.commodityCorrespondenceListEachPage,
          MaxResultCount:this.$store.state.commodityCorrespondenceListEachPage,
        },
        column: [
          {
            prop:'webshopId',//字段名称(后台返回)
            label: '店铺',//表头名称
            controls:'text',//控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
            isDisable:true,//是否可编辑
            sortable:false,//是否排序
            isFix:true//是否为固定列,此参数为可选参数
          },{
            prop:'sellerName',//后台暂时给不了这个字段
            label: '卖家昵称',
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'onlineProductId',
            label: '宝贝ID',
            controls:'text',
            width:"130px",
            isDisable:true,
            sortable:false,
          },{
            prop:'onlineSkuId',
            label:'单位库存ID',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop:'onlineProductName',
            label:'宝贝名称',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'onlineBrandName',
            label:'品牌',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop:'onlineSkuCode',
            label:'商家编码',
            width:"130px",
            controls:'text',
            required:true,
            isDisable:false,
            sortable:false,
          },{
            prop:'onlinePrice',
            label: '电商售价',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop:'onlineProductStatusStr',
            label: '宝贝状态',
            width:"130px",
            controls:'classMapSelect',
            isDisable:true,
            dataSource:[],
            optionsKey:{label:'itemName',value:'itemValue'},
            sortable:false,
          }, {
            prop:'isMappingStr',
            label: '宝贝关联',
            width:"130px",
            controls:'classMapSelect',
            dataSource:[],
            optionsKey:{label:'itemName',value:'itemValue'},
            isDisable:true,
            sortable:false,
          }, {
            prop:'skuId',
            label: 'SKU',
            width:"130px",
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop:"modifiedTime",
            label:'修改时间',
            width:"180px",
            isDisable:true,
            sortable:false,
            controls:'datetime'
          }, {
            prop:'createdTime',
            label: '新增时间',
            width:"130px",
            isDisable:true,
            sortable:false,
            controls:'datetime',
            isFix:"right"
          }],
        command:[],//表示是否需要操作，比如“查看”和删除
        pluginSetting:{
          hasPagination:true,
          mutiSelect:true,//多选栏
          isDisable:false,
        },
        syncAarry:{//同步商品编码选中数组的id
          ProductIdArr:[]
        },
        multipleSelection: '',//选中要下载店铺;
        multipleSelectionIds:[],//选中的店铺id数组
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        changeTimes:0,
        isUpdate:false,//是否进行修改
        filterKey:'',
        filterBrandIdKey:'',
      };
    },
    created: function() {
      let _this = this;
      _this.getSelectData();
    },
    computed:{
      WebshopId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterKey,this.selectData.WebshopIdArr)
      },
      BrandId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterBrandIdKey,this.selectData.BrandIdArr)
      },
    },
    watch: {},
    methods: {
      getSelectData() {//初始化加载
        let _this = this;
        // _this.buttonGroup[5].disabled = true;//保存按钮
        _this.$axios.gets(_this.url2+"/api/services/app/OmsWebShopManagement/GetAll", {
          SkipCount:0,
          MaxResultCount:999
        }).then(function(res) {
          // 店铺
          _this.selectData.WebshopIdArr = res.result.items;
          _this.tableData=_this.selectData.WebshopIdArr;
          console.log(res.result.items);
        });
        //品牌
        _this.$axios.gets(_this.url+'/api/services/app/BrandManagement/GetListByCondition',
          {BrandCode:'', BrandName:'', BrandEname:'', Status:'', Sorting:'', SkipCount:0, MaxResultCount:1000}
        ).then(function(res){
          console.log(res);
          _this.selectData.BrandIdArr = res.result.items;
          console.log( _this.selectData.BrandIdArr);
        },function(res){
          console.log('err'+res)
        });
        _this.$axios.gets(_this.url+"/api/services/app/DataDictionary/GetDictItem", {dictName: "Status001"
        }).then(function(res) {
          // 启用状态
          _this.selectData.Status001 = res.result;
          console.log(_this.selectData.Status001);
        });
      },
      filterMethod(query){//搜索代码和名称--店铺
        this.filterKey=query;
      },
      filterBrandIdMethod(query){//搜索代码和名称--品牌
        this.filterBrandIdKey=query;
      },
      dateFormat(row, column){
        switch(row.platformId){
          case 1:
            return "淘宝";
          case 2:
            return "京东";
          case 3:
            return "唯品会";
        }
      },
      getTime(date){
        this.time = date;
        this.dateRange=this.time;
        console.log(this.dateRange);
      },
      handleSelectionChange(val) {//保存下载表格选中店铺信息
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        let ids = [];
        this.multipleSelection.map((item)=> {
          ids.push(item.id)
        });
        this.multipleSelectionIds=ids;
        console.log(ids);
      },
      btnClick:function(data){

        if(data=="下载网店宝贝"){
          let _this=this;
          _this.dialogUserDefined=true;
          _this.onlineStore();
        }else if(data=="导入商家编码"){
        }else if(data=="同步库存"){
        }else if(data=="同步零售价"){
        }else if(data=="保存修改"){
          let _this=this;
          let updateArray=_this.$store.state[_this.tableModel+'UpdateColArray'];
          let updateArrayLength=_this.$store.state[_this.tableModel+'UpdateColArray'].length;
          console.log(updateArray);
          console.log(updateArrayLength);
          if(updateArrayLength>0){
            _this.$axios.puts(_this.url2+'/api/services/app/OmsProductMappingManagement/UpdateSkuCode',
              {skuCodeList: updateArray}
            ).then(function(res){
              _this.isSave=false;
              _this.$store.commit('get_RowId',"");//置空修改行id
              _this.$store.commit('setUpdateColArray',[]);//置空修改集合
              _this.$store.dispatch('InitTable');
              _this.open('保存修改商品编码成功！','el-icon-circle-check','successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="同步商家编码"){
          let _this=this;
          _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
          console.log(_this.SelectionChange);
          if(_this.SelectionChange.length==0){
            _this.$message({
              type: 'warning',
              message: '请勾选需要更改同步商家编码的记录！'
            });
          }else{
            _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
            console.log(_this.SelectionChange[0].id);
            for(let i in _this.SelectionChange){
              _this.syncAarry.ProductIdArr.push(_this.SelectionChange[i].id)
            }
            console.log(_this.syncAarry.ProductIdArr);
            //同步商品编码
            _this.$axios.posts(_this.url2+'/api/services/app/OmsProductMappingManagement/ProductSkuCodesUpdate',
              _this.syncAarry.ProductIdArr
            ).then(function(res){
              if(res.success){
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
                _this.$store.commit('setTableSelection',[]);
                _this.dialogVisible=false;
                _this.syncAarry.ProductIdArr=[];
                _this.getSelectData();
                _this.open('同步商品编码成功！','el-icon-circle-check','successERP');
              }
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="打印"){
        }else if(data=="导出"){
        }
      },
      onlineStore(){//店铺资料列表
        let _this = this;
        _this.$axios.gets(_this.url2+"/api/services/app/OmsWebShopManagement/GetWebShopBySearch", {
          PlatformId:'',
          notShowWebShowIdArr:[],
          Sorting:'',
          SkipCount:0,
          MaxResultCount:10000
        }).then(function(res) {
          // 店铺
          _this.loading=false;
          _this.onlineStore = res.result.items;
          _this.tableData=_this.onlineStore;
          if(_this.tableData.platformId==1){
            _this.platformName='淘宝';
          }else if(_this.tableData.platformId==2){
            _this.platformName="京东";
          }else if(_this.tableData.platformId==3){
            _this.platformName="唯品会";
          }
          console.log( _this.onlineStore);
        });
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
      cancelDialog(){
        let self = this;
        self.dialogUserDefined=false;
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
      SimpleSearchClick() {//输入条件查询
        let _this = this;
        console.log(_this.queryParams);
        console.log(typeof(_this.dateRange));
        if(!_this.dateRange){//时间为空
          _this.queryParams.CreatedTimeStart='';
          _this.queryParams.CreatedTimeEnd='';
          _this.$axios.gets(_this.url2+'/api/services/app/OmsProductMappingManagement/GetData',_this.queryParams).then(function(res){//查询表格数据
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.commodityCorrespondenceListEachPage);
            _this.$store.commit('Init_pagination',totalPage);
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
          })
        }else{//时间不为空
          _this.queryParams.CreatedTimeStart=_this.dateRange[0];
          _this.queryParams.CreatedTimeEnd=_this.dateRange[1];
          console.log(_this.queryParams);
          _this.$axios.gets(_this.url2+'/api/services/app/OmsProductMappingManagement/GetData',_this.queryParams).then(function(res){//查询表格数据
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.commodityCorrespondenceListEachPage);
            _this.$store.commit('Init_pagination',totalPage);
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
          })
        }
      },
      submitDownload(){//下载宝贝店铺
        let _this=this;
        console.log(_this.timeAxis);
        console.log(_this.tableData);
        if(_this.multipleSelection.length==0) {
          _this.$message({
            type: 'warning',
            message: '请勾选需要下载的店铺！'
          });
          return;
        }else if(_this.timeAxis.length==0){
          _this.$message({
            type: 'warning',
            message: '请先选择时间！'
          });
          return;
        }else{
          for(let i in _this.multipleSelectionIds){
            _this.$axios.posts(
              _this.url2+'/api/services/app/OmsProductMappingManagement/DLWebShopOLProductData', {
                ShopId:_this.multipleSelectionIds[i],
                StartTime:_this.timeAxis[0],
                EndTime:_this.timeAxis[1]
              }).then(function(res){
              if(res.result=="Success"&&res.success==true){
                _this.dialogUserDefined=false;
                _this.open('审核成功','el-icon-circle-check','successERP');

              }
            },function(res){
              _this.dialogUserDefined=false;
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }
      },
      dialogClick(parmas){//对话框按钮点击事件
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="syncDialog"){
          }else if(parmas.dialogName=="sureDialog"){
            this.dialogVisible=false;
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
      dialogBox
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
    background-image: url(../../../static/image/common/btn-circle.png);
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
    width:100%!important;
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
  .userList .el-button + .el-button {
    margin-left: 20px;
  }
  .dialog-footer{
    text-align:center;
    margin-bottom:20px;
  }
  .el-button{
    padding:9px 20px;
  }
  div.el-dialog__body{
    padding:20px 20px!important;
  }
  .searchButton{
    margin-bottom:20px;
  }
  .el-pagination{
    margin-bottom:20px;
  }
  .el-table{
    max-height:313px;
    overflow-y: auto;
  }
  .smallBgcolor{
    margin-top:0!important;
  }
  /*结束*/
</style>


