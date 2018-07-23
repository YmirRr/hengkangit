<template>
  <div class="shippingOrder-list">
    <!-- 查询条件 -->
    <el-row class="bg-white pt10">
      <el-col :span="24" class="getPadding">
        <!-- 订单单号 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor">
              <label>订单单号</label>
              <el-input v-model="createShippingOrderParams.SoCode"
                        placeholder=""
                        @focus="showErrprTips"
                        @change='Modify()'
                        class="shopName">
              </el-input>
            </div>
        </el-col>
        <!-- 订单单号 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor">
              <label>出货单号</label>
              <el-input v-model="createShippingOrderParams.DnCode"
                        placeholder=""
                        @change='Modify()'
                        >
              </el-input>
            </div>
        </el-col>
            <!-- 运单号 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor">
              <label>运单号</label>
              <el-input v-model="createShippingOrderParams.waybillCode"
                        placeholder=""
                        @change='Modify()'
                        class="shopName">
              </el-input>
            </div>
        </el-col>
            <!-- 拣货工单号 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor">
              <label>拣货工单号</label>
              <el-input v-model="createShippingOrderParams.woCode"
                        placeholder=""
                        @focus="showErrprTips"
                        @change='Modify()'
                        class="shopName">
              </el-input>
            </div>
        </el-col>
            <!-- 仓库 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor shippingOrder-input">
              <label>仓库</label>
              <el-select v-model="createShippingOrderParams.StockIds"  filterable :filter-method="filterStock" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in ReturnStockArrFilter"
                  :key="item.id"
                  :label="item.stockName"
                  :value="item.id">
                  <span>{{ item.stockCode }}</span>
                  <span style="margin-right:30px">{{ item.stockName }}</span>
                </el-option>
              </el-select>
            </div>
        </el-col>
        <el-col :xs="24" :sm="8">
            <!-- 物流公司 -->
            <div class="bgcolor shippingOrder-input">
              <label>物流公司</label>
              <el-select v-model="createShippingOrderParams.LogisticsIds"  filterable :filter-method="filterMethod" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in logisticsArrFilter"
                  :key="item.itemValue"
                  :label="item.itemName"
                  :value="item.itemValue">
                  <span>{{ item.itemCode }}</span>
                  <span style="margin-right:30px">{{ item.itemName }}</span>
                </el-option>
              </el-select>
            </div>
        </el-col>
            <!-- 拣货人 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor shippingOrder-input">
              <label>拣货人</label>
              <el-select v-model="createShippingOrderParams.Pickers"  filterable :filter-method="filterPicker" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in PickerArrFilter"
                  :key="item.id"
                  :label="item.employeeName"
                  :value="item.employeeName">
                  <span>{{ item.employeeCode }}</span>
                  <span style="margin-right:30px">{{ item.employeeName }}</span>
                </el-option>
              </el-select>
            </div>
        </el-col>
            <!-- 复核人 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor shippingOrder-input">
              <label>复核人</label>
              <el-select v-model="createShippingOrderParams.Reviews"  filterable :filter-method="filterReview" multiple clearable placeholder="请选择">
                <el-option
                  v-for="item in ReviewArrFilter"
                  :key="item.id"
                  :label="item.employeeName"
                  :value="item.employeeName">
                  <span>{{ item.employeeCode }}</span>
                  <span style="margin-right:30px">{{ item.employeeName }}</span>
                </el-option>
              </el-select>
            </div>
        </el-col>
            <!-- 复核时间 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor date-style">
              <label>复核时间</label>
              <el-date-picker
                v-model="ReviewTime"
                type="datetimerange"
                :picker-options="pickerOptions2"
                @change="getReviewTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
        </el-col>

            <!-- 制作时间 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor date-style">
              <label>制作时间</label>
              <el-date-picker
                v-model="CreatedTime"
                type="datetimerange"
                :picker-options="pickerOptions2"
                @change="getCreatedTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
        </el-col>
            <!-- 拣货时间 -->
        <el-col :xs="24" :sm="8">
            <div class="bgcolor date-style">
              <label>拣货时间</label>
              <el-date-picker
                v-model="PickingTime"
                type="datetimerange"
                :picker-options="pickerOptions2"
                @change="getPickingTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
        </el-col>
      </el-col>

      <el-col :span="24" class="getPadding query-btn">
        <button class="order-query" @click="SearchClick">查询</button>
      </el-col>
    </el-row>
    <!-- 出货单 -->
    <el-row class="bg-white pt10 mt10">
      <el-col :span="24" class="getPadding">
        <el-col :span="24" class="bg-white h48">
          <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
          <div class="search_button_wrapper">
            <button class="userDefined">
              <i class="fa fa-cogs" aria-hidden="true"></i>自定义
            </button>
          </div>
        </el-col>
        <el-col :span="24" class="Order-overflow">
            <Table  @tableRowClick="tableRowClick"  :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="shippingParams"  :tableName="tableModel" :ifSave="isSave" :command="command"></Table>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="bg-white pt10 mt10">
      <el-col :span="24" class="getPadding">
        <el-col :span="24" class="bg-white h48">
          <span>明细表</span>
          <div class="search_button_wrapper">
            <button class="userDefined">
              <i class="fa fa-cogs" aria-hidden="true"></i>自定义
            </button>
          </div>
        </el-col>
        <el-col :span="24" class="Order-overflow">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="soCode" label="订单号" width="100" sortable></el-table-column>
            <el-table-column prop="skuCode" label="商品编码" width="100" sortable></el-table-column>
            <el-table-column prop="skuName" label="商品名称" width="100" sortable></el-table-column>
            <el-table-column prop="formatName" label="规格" width="100" sortable></el-table-column>
            <el-table-column prop="skuId" label="SKU" sortable></el-table-column>
            <el-table-column prop="qty" label="数量" sortable></el-table-column>
            <el-table-column prop="binLocation" label="拣货储位" sortable></el-table-column>
            <el-table-column prop="pickingStatusName"
                             label="拣货状态"
                             :filters="[{ text: '未拣货', value: '未拣货' }, { text: '拣货完成', value: '拣货完成'}]"
                             :filter-method="filterTag"
                             filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '未拣货' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.pickingStatusName}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-col>
    </el-row>
    <!-- dialog数据变动提示 -->
    <el-dialog :visible.sync="dialogUpdateConfirm" class="dialog_confirm_message" width="25%">
      <template slot="title">
        <span class="dialog_font">提示</span>
      </template>
      <el-col :span="24" style="position: relative;">
        <el-col :span="24">
          <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
          <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
        </el-col>
      </el-col>
      <!--  -->
        <span slot="footer">
            <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
            <button class="dialog_footer_bt dialog_font" @click="dialogUpdateConfirm = false">取 消</button>
        </span>
    </el-dialog>
    <!-- dialog -->

    <!-- dialog错误信息提示 -->
    <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
      <template slot="title">
        <span class="dialog_font">提示</span>
      </template>
      <el-col :span="24" class="detail_message_btnWapper">
        <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
      </el-col>
      <el-col :span="24" style="position: relative;">
        <el-col :span="24">
          <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
          <p class="dialog_font dialog_body_message">数据提交有误!</p>
        </el-col>
        <el-collapse-transition>
          <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
            <vue-scroll :ops="option">
              <span class="dialog_font">{{response.message}}</span>
              <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
              <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
            </vue-scroll>
          </el-col>

        </el-collapse-transition>
      </el-col>
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">取 消</button>
            </span>
    </el-dialog>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->
  </div>
</template>
<script>
    import buttonGroup from '../../../base/buttonGroup/buttonGroup'
    import dialogBox from '../../../base/dialog/dialog'
    import Table from '../../../base/Table/Table'
    import {FILTER_MOTHED} from '../../../common/common.js'
    import axios from 'axios'
    export default{
        data(){
            return{
              value5: '',
              isMore:false,
              isMore1:false,
              pickerOptions2: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              },
              httpUrl: {
               query:'http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetDnOrder' //出货单明细
              },
              // 用于区别数据模型名称(store里存放的数据)
              tableModel:'shippingOrderManagementList',
              // 请求接口需要传递的参数
              shippingParams:{
                SkipCount:(this.$store.state.shippingOrderManagementListCurrentPage-1)*this.$store.state.shippingOrderManagementListEachPage,
                MaxResultCount:this.$store.state.shippingOrderManagementListEachPage,
              },
              queryParams: {
                WoId:[],
                DnId:[],
                SkipCount:(this.$store.state.shippingOrderManagementListCurrentPage-1)*this.$store.state.shippingOrderManagementListEachPage,
                MaxResultCount:this.$store.state.shippingOrderManagementListEachPage,
              },
              column: [{
                      prop: 'soCode',// 字段名称
                      label: '订单号', // 表头名称
                      controls:'text',// 控件类型
                      isDisable:true,// 是否可编辑
                      sortable:true,// 是否可排序
                      width:'100px',
                      isFix:true
                      }, {
                      prop: 'dnCode',
                      label: '出货单号',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'100px',
                      isFix:true
                      },{
                      prop: 'waybillCode',
                      label: '运单号',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'100px'
                      },{
                      prop: 'woCode',
                      label: '拣货工单号',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'100px'
                      },{
                      prop: 'sowingCode',
                      label: '播种号',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'100px'
                      },{
                      prop: 'logisticsCode',
                      label: '物流公司代码',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      width:'120px'
                      },{
                      prop: 'logisticsName',
                      label: '物流公司',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      },{
                      prop: 'shopName',
                      label: '店铺',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      },{
                      prop: 'pickingTime',
                      label: '拣货时间',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'160px'
                      },{
                      prop: 'picker',
                      label: '拣货人',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      width:'120px'
                      },{
                      prop: 'pickerPosition',
                      label: '拣货人职位',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'120px'
                      },{
                      prop: 'deliveryStatus',
                      label: '出货状态',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      },{
                      prop: 'reviewTime',
                      label: '复核时间',
                      controls:'text',
                      isDisable:true,
                      sortable:true,
                      width:'160px'
                      },{
                      prop: 'review',
                      label: '复核人',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      width:'120px'
                      },{
                      prop: 'reviewPosition',
                      label: '复核职位',
                      controls:'text',
                      isDisable:true,
                      sortable:false,
                      width:'120px'
                      }],

              // 用户配置表格操作栏中功能项
              command:[],
              filterKey:'',
              filterStockKey:'',
              filterPickerKey:'',
              filterReviewKey:'',
              delAarry:{
                ids:[]
              },
              // 用户表格配置项设置
              pluginSetting: {
                hasPagination:false, // 是否包含分页
                mutiSelect:true,  // 是否包含多选栏
                isDisable:true // 是否可编辑
              },
              isSave:false,
              defaultOuId:'',// 默认ouid
              tableData:[],
              ReturnStockId:[],//仓库表
              ReturnStockId1:[],//仓库表1
              chooseReturnStockId:[],//选中仓库的id
              logisticsIdArr:[],//物流下拉
              EmployeeArr:[],//拣货人/复核人下拉
              licensingShow:true,
              addressShow:true,
              ifModify:false,// 判断信息是否修改过
              search:'',
              update:false,
              activeName: 'contact',// tabs标签页默认激活name
              createShippingOrderParams:{
                  'SoCode':"",//销售定号
                  'DnCode':"",//出货单号
                  'WaybillCode': "", // 运单号
                  'WoCode': "", // 拣货工单号
                  'StockIds': [], // 仓库Id
                  "LogisticsIds":[], //物流公司代码
                  'Pickers': [], // 拣货人
                  'Reviews':[],// 复核人
                  'StartReviewTime': "", // 复核开始时间
                  'EndReviewTime': "", // 复核结束时间
                  'StartCreatedTime': "", // 制作开始时间
                  'EndCreatedTime': "", // 制作结束时间
                  'StartPickingTime': "", // 拣货开始时间
                  'EndPickingTime': "", // 拣货结束时间
                  SkipCount:(this.$store.state.shippingOrderManagementListCurrentPage-1)*this.$store.state.shippingOrderManagementListEachPage,
                  MaxResultCount:this.$store.state.shippingOrderManagementListEachPage
              },
              // 对话框
              dialogSetting:{
                  message:'',// 提示信息
                  dialogName:'',// 对话框名称
                  dialogType:'',// 对话框类型
              },
              // 展开详情后具体错误提示信息
              errorTips:{message:'',detail:''},
              dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
              errorTips:{
                message:'',// 报错信息
                details:'',// 报错详情信息
              },
              dialogVisible:false, // 控制对话框是否可见
              dialogCommand:[],// 底部按钮组控制组
              dialogDelConfirm:false,// 用户删除保存提示信息
              dialogUserConfirm:false,// 信息更改提示控制
              delId:0,
              interfaceText:false, //接口测试
              dialogUpdateConfirm:false,
              ReviewTime:[],//复核时间
              CreatedTime:[],//制作时间
              PickingTime:[],//拣货时间
              delArr:[],
              //--- 错误提示框 ----------------
              option: {
                  vRail: {
                      width: '5px',
                      pos: 'right',
                      background: "#9093994d",
                  },
                  vBar: {
                      width: '5px',
                      pos: 'right',
                      background: '#9093994d',
                  },
                  hRail: {
                      height: '0',
                  },
              },
              errorMessage:false,
              detail_message_ifShow:false,
              isUpdate:false,
              changeTimes:0,
              response:{
                  details:'',
                  message:'',
                  validationErrors:[],
              },
              buttonGroup:[{
                 text:'打印出货单',
                 class:'bt_print',
                 icon:'icon-print',
                 disabled:false
              },{
                 text:'删除出货单',
                 class:'bt_del',
                 icon:'icon-shanchu',
                 disabled:false,
              }],
              A:false,
              B:false,
              C:false,
           }
        },
        computed:{
            // 下拉过滤物流公司
            logisticsArrFilter: function () {//下拉数据自定义搜索过滤
                return FILTER_MOTHED(this.filterKey,this.logisticsIdArr)
            },
            // 下拉过滤拣货人
            PickerArrFilter: function () {//下拉数据自定义搜索过滤
                return FILTER_MOTHED(this.filterPickerKey,this.EmployeeArr)
            },
            // 下拉过滤复核人
            ReviewArrFilter: function () {//下拉数据自定义搜索过滤
                return FILTER_MOTHED(this.filterReviewKey,this.EmployeeArr)
            },
            ReturnStockArrFilter: function () {
                return FILTER_MOTHED(this.filterStockKey,this.ReturnStockId)
            },
            // 业务组织
            countOu () {
                return this.ouItem;
            },
            // 平台
            countPl () {
                return this.plItem;
            },
        },
        components:{
            buttonGroup,
            dialogBox,
            Table
        },
        created () {
            let self=this;
            // 加载下拉
            self.loadSelect();
            //初始化出货单明细
            // setTimeout(function () {
            //    self.GetOmsDnRelationData();
            // },1500)
        },
        methods: {
          filterMethod(query){
            this.filterKey=query;
          },
          filterStock(query) {
            this.filterStockKey = query;
          },
          filterPicker(query) {
            this.filterPickerKey = query;
          },
          filterReview(query) {
            this.filterReviewKey = query;
          },
          showErrprTips(e){
             $('.tipsWrapper').css({display:'none'})
          },
          // 点击出货单 显示对应的明细表
          tableRowClick(row){
              let _this=this;
              let searchArr = [];
              searchArr.push(row.woId)
              _this.queryParams.WoId = searchArr;
              axios
                .get('http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetOmsDnRelationData',
                {
                    params:{
                        WoId:_this.queryParams.WoId,
                        SkipCount:0,
                        MaxResultCount:999
                    },
                    paramsSerializer: function(params) {
                      const WoId = params.WoId.map(_=>`WoId=${_}`).join("&");
                      return `${WoId}&SkipCount=`+params.SkipCount+`&MaxResultCount=`+params.MaxResultCount;
                    },
                }).then(function (res) {
                  console.log(res)
                    _this.tableData = res.data.result.items
                }).catch(function(err){
                    console.log(err)
              })
          },
          filterTag(value, row) {
            return row.pickingStatusName === value;
          },
          getReviewTime(date){
            this.ReviewTime=date;
          },
          getCreatedTime(date){
            this.CreatedTime=date;
          },
          getPickingTime(date){
            this.PickingTime=date;
          },
          SearchClick() {//输入条件查询
                let _this = this;
                //制作时间
                _this.createShippingOrderParams.StartCreatedTime=_this.CreatedTime[0];
                _this.createShippingOrderParams.EndCreatedTime=_this.CreatedTime[1];
                //复核时间
                _this.createShippingOrderParams.StartReviewTime=_this.ReviewTime[0];
                _this.createShippingOrderParams.EndReviewTime=_this.ReviewTime[1];

                //拣货时间
                _this.createShippingOrderParams.StartPickingTime=_this.PickingTime[0];
                _this.createShippingOrderParams.EndPickingTime=_this.PickingTime[1];
                console.log(_this.createShippingOrderParams)
                // 制作时间
                if(_this.createShippingOrderParams.StartCreatedTime==undefined || _this.createShippingOrderParams.StartCreatedTime=="") {
                    _this.createShippingOrderParams.StartCreatedTime = "";
                }
                if(_this.createShippingOrderParams.EndCreatedTime==undefined || _this.createShippingOrderParams.EndCreatedTime=="") {
                    _this.createShippingOrderParams.EndCreatedTime = "";
                }
                // 复核时间
                if(_this.createShippingOrderParams.StartReviewTime==undefined || _this.createShippingOrderParams.StartReviewTime=="") {
                    _this.createShippingOrderParams.StartReviewTime = "";
                }
                if(_this.createShippingOrderParams.EndReviewTime==undefined || _this.createShippingOrderParams.EndReviewTime=="") {
                    _this.createShippingOrderParams.EndReviewTime = "";
                }
                // 拣货时间
                if(_this.createShippingOrderParams.StartPickingTime==undefined || _this.createShippingOrderParams.StartPickingTime=="") {
                    _this.createShippingOrderParams.StartPickingTime = "";
                }
                if(_this.createShippingOrderParams.EndPickingTime==undefined || _this.createShippingOrderParams.EndPickingTime=="") {
                    _this.createShippingOrderParams.EndPickingTime = "";
                }
              /*  _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetDnOrder',_this.createShippingOrderParams).then(function(res){//查询表格数据
                  _this.$store.commit('Init_Table',res.result.items);
                  let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.commodityCorrespondenceListEachPage);
                  _this.$store.commit('Init_pagination',totalPage);
                  _this.$store.commit('Init_TotalCount',res.result.totalCount);
                  _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
                })*/
                axios
                  .get('http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetDnOrder',
                  {
                      params:{
                          SoCode:_this.createShippingOrderParams.SoCode,
                          DnCode:_this.createShippingOrderParams.DnCode,//出货单号
                          WaybillCode:_this.createShippingOrderParams.WaybillCode, // 运单号
                          WoCode:_this.createShippingOrderParams.WoCode, // 拣货工单号
                          StockIds: _this.createShippingOrderParams.StockIds, // 仓库Id
                          LogisticsIds:_this.createShippingOrderParams.LogisticsIds, //物流公司代码
                          Pickers: _this.createShippingOrderParams.Pickers, // 拣货人
                          Reviews:_this.createShippingOrderParams.Reviews,// 复核人
                          StartReviewTime: _this.createShippingOrderParams.StartReviewTime, // 复核开始时间
                          EndReviewTime: _this.createShippingOrderParams.EndReviewTime, // 复核结束时间
                          StartCreatedTime:_this.createShippingOrderParams.StartCreatedTime, // 制作开始时间
                          EndCreatedTime: _this.createShippingOrderParams.EndCreatedTime, // 制作结束时间
                          StartPickingTime: _this.createShippingOrderParams.StartPickingTime, // 拣货开始时间
                          EndPickingTime: _this.createShippingOrderParams.EndPickingTime, // 拣货结束时间
                          SkipCount:(_this.$store.state.shippingOrderManagementListCurrentPage-1)*_this.$store.state.shippingOrderManagementListEachPage,
                          MaxResultCount:_this.$store.state.shippingOrderManagementListEachPage
                      },
                      paramsSerializer: function(params) {
                        const yourNewParams = params.StockIds.map(_=>`StockIds=${_}`).join("&");
                        const LogisticsIds = params.LogisticsIds.map(_=>`LogisticsIds=${_}`).join("&");
                        const Pickers = params.Pickers.map(_=>`Pickers=${_}`).join("&");
                        const Reviews = params.Reviews.map(_=>`Reviews=${_}`).join("&");
                        return `${yourNewParams}&${LogisticsIds}&${Pickers}&${Reviews}&SkipCount=`+params.SkipCount+`&MaxResultCount=`+params.MaxResultCount+`&SoCode=`+params.SoCode+`&DnCode=`+params.DnCode+`&WaybillCode=`+params.WaybillCode+`&WoCode=`+params.WoCode+`&StartReviewTime=`+params.StartReviewTime+`&EndReviewTime=`+params.EndReviewTime+`&StartCreatedTime=`+params.StartCreatedTime+`&EndCreatedTime=`+params.EndCreatedTime+`&StartPickingTime=`+params.StartPickingTime+`&EndPickingTime=`+params.EndPickingTime;
                      },
                  }).then(function (res) {
                      console.log(res.data.result)
                      _this.$store.commit('Init_Table',res.data.result.items);
                      let totalPage=Math.ceil(res.data.result.totalCount/_this.$store.state.shippingOrderManagementListEachPage);
                      _this.$store.commit('Init_pagination',totalPage);
                      _this.$store.commit('Init_TotalCount',res.data.result.totalCount);
                      _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
                  })

          },

         // 出货单明细表格初始化
          // GetOmsDnRelationData: function() {
          //      let _this=this;
          //        _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetOmsDnRelationData',_this.queryParams)
          //        .then(function(res){
          //         console.log("init",res)
          //           for(let i = 0; i < res.result.items.length; i++) {
          //             let obj = {
          //               soCode:"",
          //               skuCode:"",
          //               skuName:"",
          //               formatName:"",
          //               skuId:"",
          //               qty:"",
          //               binLocation:"",
          //               pickingStatus:0,
          //               pickingStatusName:'',
          //             }
          //             obj=res.result.items[i]
          //             _this.tableData.push(obj);
          //           }
          //       },function(res){
          //          console.log("err"+res);
          //       })

          // },
          // 按钮组点击事件
          btnClick:function (btn) {
              if(btn=="删除出货单") {
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    console.log(this.SelectionChange);
                    if(this.SelectionChange.length==0){
                        this.$message({
                            type: 'info',
                            message: '请勾选需要更改删除的记录！'
                        });
                    }else{
                        this.dialogSetting.dialogName='delDialog'
                        this.dialogSetting.message="确定删除？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                        this.dialogVisible=true
                    }
              }
          },
          Modify:function(){// 判断主表是否修改过
              this.isUpdate=true;
          },
          isBack(){//是否返回
              let _this=this;
              if(_this.isUpdate){
                  _this.dialogUpdateConfirm=true;
              }else{
                  _this.goList();
              }
          },
          loadSelect:function(){
              let _this = this;
              // 仓库
              _this.$axios.gets("/api/services/app/StockManagement/GetRepositoryList", {
                  defaultOuId:'',
                  StockCode:'',
                  StockName:'',
                  AreaCode:'',
                  StockTypeId:'',
                  SkipCount: 0,
                  MaxResultCount: 999
              }).then(function(res) {
                  console.log(res)
                  _this.ReturnStockId = res.result.items;
                  _this.stockTotal=res.result.totalCount;
                  console.log(_this.ReturnStockId);
              });
              // 物流公司
              _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem?dictName=OMS_LogisticsPlatform").then(function(res) {
                 _this.logisticsIdArr = res.result;
              });
              // 拣货人/复核人
              _this.$axios.gets("/api/services/app/EmployeeManagement/GetEmployeeList",{Type:0}).then(function(res) {
                 _this.EmployeeArr = res.result;
              });
          },
          changeSelect() {//多选横着显示
              this.$nextTick(function () {
                let [$span, tags, Len] = [this.$refs.select.$refs.tags.children[0].childNodes, [], 0];
                for (let i = 0, len = $span.length; i < len; i++) {
                  console.log($span[i].innerText);
                  if ($span[i].className.indexOf('leave') > -1) {
                    tags.slice(i, 1);
                  } else {
                    tags.push($span[i]);
                    console.log(tags);
                  }
                }
                for (let i = 0, len = tags.length; i < len; i++) {
                  Len += tags[i].offsetWidth;
                }
                this.isMore = Len > 144 ? true : false;
              });
          },
          // 创建时间
          GetDateTime: function () {
              var date = new Date();
              var seperator1 = "-";
              var seperator2 = ":";
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                  + " " + date.getHours() + seperator2 + date.getMinutes()
                  + seperator2 + date.getSeconds();
              return currentdate;
          },
          dialogClick(parmas){
            let delArray = [];
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    console.log(this.SelectionChange);
                    for(let i in this.SelectionChange){
                        delArray.push(this.SelectionChange[i].id)
                    }
                    let _this=this;
                    // 删除
                    _this.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWaveManagement/BatchDeleteDnOrder',{Ids:delArray})
                    .then(function(res){
                        _this.open('删除成功','el-icon-circle-check','successERP');
                        _this.$store.commit('setQueryParams',_this.shippingParams)
                        _this.$store.dispatch('InitTable');
                        _this.$store.commit('setTableSelection',[]);
                        delArray = [];
                        _this.dialogVisible=false;
                    },function(res){
                        _this.$message({
                           type: 'warning',
                           message: res.error.message
                        });
                    });
               }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }
          },
        // 对话框关闭回调事件
        dialogColse(){
            this.dialogVisible=false;
        },
        getErrorMessage(message,details,validationErrors){
            let _this=this;
            _this.response.message='';
            _this.response.details='';
            _this.response.validationErrors=[];
            if(details!=null && details){
                _this.response.details=details;
            }
            if(message!=null && message){
                _this.response.message=message;
            }
            if(message!=null && message){
                _this.response.validationErrors=validationErrors;
            }
        },
        ouDialogSure(){//dialog点击确认
            let _this=this;
            _this.dialogOu=false;
            // console.log(_this.$refs.tree.getCheckedKeys())
            _this.ouCheckAll=_this.$refs.tree.getCheckedNodes();
            _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
            // console.log(_this.ouCheckAll)
        },
        sureDoing:function(){
            let self = this;
            self.$store.state.url='/onlineStore/onlineModify/default'
            self.$router.push({path:this.$store.state.url})//点击切换路由
        },
        open:function(tittle,iconClass,itemName) {
            this.$notify({
            position: 'bottom-right',
            iconClass:iconClass,
            title: tittle,
            showClose: false,
            duration: 3000,
            customClass:itemName
            });
        },
        handleCityFilter:function(val) {
            console.log(val)
        },
        handleSelectionChange(val) {
             this.delArr = val;
             console.log(this.delArr);
        },
        handleSelectionChange2:function(val){// 点击复选框选中的数据
            this.multipleSelectionAdd = val;
        },
        handleSelectionChange3:function(val){// 点击复选框选中的数据
            this.multipleSelectionOu = val;
        }
      }
    }
</script>
<style scoped>
    .bgcolor {
        width:100%;
    }
    .date-style .el-input__icon{
        width:16px;
    }
    .bgcolor.date-style{
        overflow:hidden;
    }
    .order-query {
        background-color: #00c9c9;
        color: white;
        border:none;
        width:120px;
        height:35px;
        margin-bottom:10px;
        cursor:pointer;
    }
    .query-btn {
        text-align:center;
    }

    .search_button_wrapper {
        float:right;
        margin-right:10px;
        width:7%;
    }
    .bg-white{
        background: white;
    }
    /*收起*/
    .shippingOrder-list .upBt{
        font-size: 12px;
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .shippingOrder-list .upBt i{
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        color:#cacaca;
        margin-left: 5px;
    }
    .shippingOrder-list .inline-block-need{
        display: inline-block;
    }
    .date-style .el-input__inner {
        width:calc(100% - 94px);
        border:1px solid rgb(194, 202, 216) !important;
    }
    .shippingOrder-list .upBt i.rotate{
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
    }

    .shippingOrder-list  .errorTips{
        margin-bottom: 10px;
    }
    .shippingOrder-list .el-row:first-child{
        padding:5px 0;
    }
    .shippingOrder-list .el-row{
        padding:15px 0;
        background-color: #fff;
    }
    .shippingOrder-list .el-row:last-child{
        border-bottom:none;
    }

    .shippingOrder-list .tabZoo{
        overflow: hidden;
        background-color: #fff;
    }
    .shippingOrder-list  .getPadding,.tabZoo .el-tabs__nav-scroll{
        padding: 0 10px;
    }
    .shippingOrder-list .tabZoo .erp_bt:first-child{
        margin-left: 0;
    }
    .shippingOrder-list .nopadding{
        padding-top: 0;
    }
    .shippingOrder-list .el-table th {
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        text-align: left;
        padding: 5px 0;
        text-align: center;
        background-color: #ececec;
    }
    .shippingOrder-list .el-table td{
        padding: 3px 0;
    }
    .shippingOrder-list .el-table__body{
        text-align: center;
    }
    .shippingOrder-list .el-table .cell{
        padding-left:0px;
        padding-right:0px;
    }
    .shippingOrder-list .el-input__inner{
        height:35px !important;
        line-height:33px;
        /* order-color:white !important; */
    }
    .shippingOrder-list .all-table .el-input__inner{
        height:35px !important;
        text-align: center !important;
    }
</style>
<style>
     .date-style .el-date-editor input {
        padding:0px 7px;
     }
     .shippingOrder-input .el-input__inner {
        height:35px !important;
        z-index:8889;
      }
     .Order-overflow .el-table{
        height:240px !important;
        overflow:auto !important;
        width: 100%;
     }
     .Order-overflow .el-table__row:hover{
        cursor:pointer;
     }
     .Order-overflow .is-scroll-left {
        min-height:195px;
      }
      .Order-overflow .el-table__body-wrapper {
        min-height:195px;
      }
     .date-style .el-range-input {
        width:35% !important;
     }
     .shippingOrder-input .el-select__tags{
       height:35px;
       margin:0 5px;
       width:100%;
       max-width: 87%!important;
       overflow: hidden;
       white-space: nowrap;
     }
     .shippingOrder-input .el-select__tags>span{
       position: absolute;
       overflow: hidden;
       white-space: nowrap;
     }
</style>
