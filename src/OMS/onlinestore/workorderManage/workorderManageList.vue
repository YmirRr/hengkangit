<template>
  <div class="res-list">
    <el-row class="bg-white">
      <el-col>
        <el-row class="pb10">
          <el-col :span="24">
              <el-row>
                 <el-col :xs="24" :sm="8">
                   <div class="bgcolor smallBgcolor">
                  <label>仓库</label>
                  <el-select
                    v-model="queryParams.StockId"
                    ref="select"
                    @change="changeSelect"
                    :class="{'demo-select': isMore}"
                    :filter-method="filterStockMethod"
                    multiple filterable placeholder="请选择">
                    <el-option
                      class="demo-option"
                      v-for="item in ReturnStockIdArr1"
                      :key="item.id"
                      :label="item.stockName"
                      :value="item.id">
                      <span style="float: left">{{ item.stockCode}}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockName}}</span>
                    </el-option>
                  </el-select>

                  <!--仓库下拉-->
                  <!--<div v-show="innerVisible1" class="selectWavuenuber1">-->
                    <!--<el-row style="width:100%">-->
                      <!--<div class="search_box">-->
                        <!--<el-input v-model="chooseReturnStockId" placeholder="搜索仓库代码或名称" @change="submitSearch" class="search_input">-->
                          <!--<i slot="suffix" style="line-height: 31px;" class="el-input__icon el-icon-search" @click="submitSearch"></i>-->
                        <!--</el-input>-->
                      <!--</div>-->
                    <!--</el-row>-->
                    <!--<el-row class="search_box">-->
                      <!--<el-radio-group v-model="choice1" @change="toggleData">-->
                        <!--<el-radio class="box" label="全选">全选</el-radio>-->
                        <!--<el-radio class="box" label="查看已选">查看已选</el-radio>-->
                        <!--<el-radio class="box" label="查看未选">查看未选</el-radio>-->
                      <!--</el-radio-group>-->
                    <!--</el-row>-->
                    <!--<el-row class="totalnumber">-->
                      <!--<span>共{{ReturnStockId.length}}条数据</span>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                      <!--<el-table max-height="350"-->
                                <!--ref="multipleTable"-->
                                <!--:row-key="getRowKeys"-->
                                <!--@selection-change="handleSelectionChange"-->
                                <!--:data="ReturnStockId"-->
                                <!--style="width: 100%">-->
                        <!--<el-table-column type="selection" :reserve-selection="true" width="55">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="stockCode" label="代码">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="stockName" label="名称">-->
                        <!--</el-table-column>-->
                      <!--</el-table>-->
                    <!--</el-row>-->
                    <!--<div slot="footer" class="dialog-footer buttonGroup">-->
                      <!--<el-button type="primary" @click="chooseStock">确 定</el-button>-->
                      <!--<el-button @click="innerVisible1 = false">取 消</el-button>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
                  </el-col>
                  <el-col :xs="24" :sm="8">
                    <div class="bgcolor smallBgcolor">
                  <label>波次号</label>
                  <el-select
                    @change="getCode"
                    v-model="queryParams.WaveCode"
                    filterable multiple placeholder="请选择">
                    <el-option
                      v-for="item in waveNumnerList"
                      :key="item.id"
                      :label="item.billCode"
                      :value="item.billCode">
                    </el-option>
                  </el-select>

                  <!--波次下拉-->
                  <!--<div v-show="innerVisible" class="selectWavuenuber">-->
                      <!--<el-row style="width:100%">-->
                        <!--<div class="search_box">-->
                          <!--<el-input v-model="searchKey" placeholder="搜索波次号" @change="submitSearch" class="search_input">-->
                            <!--<i slot="suffix" style="line-height: 31px;" class="el-input__icon el-icon-search" @click="submitSearch"></i>-->
                          <!--</el-input>-->
                        <!--</div>-->
                      <!--</el-row>-->
                      <!--<el-row class="search_box">-->
                        <!--<el-radio-group v-model="choice" @change="toggleData1">-->
                          <!--<el-radio class="box" label="全选">全选</el-radio>-->
                          <!--<el-radio class="box" label="查看已选">查看已选</el-radio>-->
                          <!--<el-radio class="box" label="查看未选">查看未选</el-radio>-->
                        <!--</el-radio-group>-->
                      <!--</el-row>-->
                      <!--<el-row class="totalnumber">-->
                        <!--<span>共{{waveNumnerList.length}}条数据</span>-->
                      <!--</el-row>-->
                      <!--<el-row>-->
                        <!--<el-table max-height="350" ref="multipleTable" :row-key="getRowKeys"-->
                                  <!--@selection-change="handleSelectionChange1"-->
                                  <!--:data="waveNumnerList" style="width: 100%">-->
                          <!--&lt;!&ndash;<el-table-column type="selection" :reserve-selection="true" width="55">&ndash;&gt;-->
                          <!--<el-table-column type="selection" width="55">-->

                          <!--</el-table-column>-->
                          <!--<el-table-column prop="waveCode" label="波次号">-->
                          <!--</el-table-column>-->
                        <!--</el-table>-->
                      <!--</el-row>-->
                      <!--<div slot="footer" class="dialog-footer buttonGroup">-->
                        <!--<el-button type="primary" @click="choosewaveNumner">确 定</el-button>-->
                        <!--<el-button @click="innerVisible = false">取 消</el-button>-->
                      <!--</div>-->
                  <!--</div>-->
                </div>
                  </el-col>
                  <el-col :xs="24" :sm="8">
                    <div class="bgcolor smallBgcolor">
                  <label>工单单号</label>
                  <el-input  v-model="queryParams.WoCode"  placeholder="请输入"></el-input>
                </div>
                  </el-col>
                  <el-col :xs="24" :sm="8">
                    <div class="bgcolor smallBgcolor">
                  <label>工单类型</label>
                  <el-select v-model="queryParams.WoTypeid" placeholder="请选择">
                    <el-option
                      v-for="item in WorkOrderType"
                      :key="item.itemValue"
                      :label="item.itemName"
                      :value="item.itemValue">
                    </el-option>
                  </el-select>
                </div>
                  </el-col>
                  <el-col :xs="24" :sm="8">
                      <div class="bgcolor smallBgcolor">
                  <label>工单状态</label>
                  <el-select v-model="queryParams.PickingStatus" placeholder="请选择">
                    <el-option
                      v-for="item in WorkOrderStatus"
                      :key="item.itemValue"
                      :label="item.itemName"
                      :value="item.itemValue">
                    </el-option>
                  </el-select>
                </div>
                  </el-col>
                  <el-col :xs="24" :sm="8">
                      <div class="bgcolor">
                        <label>制作时间</label>
                        <el-date-picker
                          v-model="madeTime"
                          type="datetimerange"
                          align="right"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          unlink-panels range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions2">
                        </el-date-picker>
                      </div>
                  </el-col>
              </el-row>
          </el-col>
          <el-col :span="24" class="searchBtn">
            <span class="search-btn" @click="query">查询</span>
          </el-col>
        </el-row>
        <el-row class="pb10">
          <el-col :span="24">
            <el-row>
              <el-col :span="24" class="tableContainer">
                <el-row class="h48 fixed">
                  <el-col :span="24">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                  </el-col>
                </el-row>
                <!--任务领用-->
                <el-dialog title="任务领用" :visible.sync="dialogFormVisible">
                  <el-row :span="24">
                    <el-col  :xs="24" :sm="12">
                      <div class="bgcolor">
                        <label class="workOrderLabel">拣货工单号</label>
                        <el-input v-model="woCode" class="resetWocode"></el-input>
                      </div>
                    </el-col>
                    <el-col   :xs="24" :sm="12">
                      <div class="bgcolor">
                        <label class="workOrderLabel">拣货人</label>
                        <el-select v-model="picker" placeholder="请选择拣货人" @change="selectGet">
                          <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                  </el-row>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="taskReceive">确 定</el-button>
                    <el-button @click="dialogFormVisible=false" class="cancelButton">取 消</el-button>
                  </div>
                </el-dialog>
                <div class="leftTable">
                    <span class="tableSpan">拣货工单</span>
                    <button class="userDefined">
                          <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                    </button>
                  <ScrollTable :scrollBasicSetting='scrollBasicSetting' :scrollTableData="scrollTableData" @scrollLoadMore="scrollLoadMore" @handleSelectionChange="handleSelectionChange" @rowClick="rowClick"></ScrollTable>
                </div>
                <div class="rightTable">
                  <span class="tableSpan">出货单</span>
                  <button class="userDefined">
                    <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                  </button>
                  <ScrollTable :scrollBasicSetting='scrollBasicSettingb' :scrollTableData='scrollTableDatab' @scrollLoadMore="scrollLoadMore"></ScrollTable>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- dialog错误信息提示 -->
    <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->
  </div>
</template>
<script>
  import ScrollTable from '../../base/scrollTable/scrollTable'
  import buttonGroup from '../../base/buttonGroup/buttonGroup'
  import dialogBox from '../../base/dialog/dialog'
  import {FILTER_MOTHED} from '../../common/common.js'
  // import config from '../../../static/config'
  import axios from 'axios'
  export default{
    name:'repositoryList',
    data(){
      return{
        options: [
          {//拣货人假数据
          id: '1',
          name: '帝释天'
        }, {
          id: '2',
          name: '秦始皇'
        }, {
          id: '3',
          name: '高渐离'
        }, {
          id: '4',
          name: '扫地僧'
        }, {
          id: '5',
          name: '南院大王'
        }],
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
        madeTime: [],
        isMore:false,
        isMore1:false,
        innerVisible:false,//波次弹窗
        innerVisible1:false,//仓库弹窗
        dialogFormVisible:false,//任务领用
        detailId:'',//点击某一行的id
        ids:[],//要删除的工单id数组
        code:[],//
        woCode:'',//某一条数据的工单号
        picker:'',//某一条数据的拣货人
        selectData:[],//选中的表格数据
        StockIdArr:[],//选中的仓库Id
        StockIdArr1:[],//赋值的选中的仓库Id
        ReturnStockIdArr:[],//仓库表
        ReturnStockId1:[],//仓库表1
        chooseReturnStockId:[],//选中仓库的id
        chooseReturnStockName:[],//选中的名字
        stockTotal:'',//仓库数据总条数
        multipleSelection:[],//选中的仓库
        waveNumnerList:[],//波次表
        url:"http://192.168.100.107:8099",//提取公用服务器地址
        // 下拉
        WorkOrderType:[],//工单类型下拉
        WorkOrderStatus:[],//工单状态下拉
        // ---------------------------------------------------------
        scrollBasicSetting:{
          tableName:'test',//ref名称
          mutiSelect:true,//是否有多选，布尔值
          tableCols:[
            {//表格列名
            prop: 'woCode',
            label: '拣货工单号',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'billCode',
            label: '波次号',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'time',//暂时没有这个字段，先用拣货开始时间
            label: '制作时间',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'soCount',
            label: '订单数',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'qty',
            label: '货品数',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'pickingStart',
            label: '拣货开始时间',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'pickingEnd',
            label: '拣货完成时间',
            sortable:true,//改列是否包含排序功能
          },{
            prop: 'picker',
            label: '拣货人'
          },{
            prop: 'brandName',
            label: '拣货人职位'
          },{
            prop: 'pickingStatus',
            label: '波次状态',
            filterArray:[
              {
                text:'未确认',
                value:'未确认'
              }, {
                text:'已确认',
                value:'已确认'
            }],//过滤条件,筛选功能
            filtermethod: function (value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }//筛选事件的固定方法
          },{
            prop: 'woTypeName',
            label: '工单类型',
            filterArray:[
                {
                  text:'单件',
                  value:'单件'
                }, {
                  text:'多件',
                  value:'多件'
                }, {
                  text:'爆款',
                  value:'爆款'
            }],//过滤条件,筛选功能
            filtermethod: function (value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }//筛选事件的固定方法
          },{
            prop: 'status',
            label: '工单状态',
            filterArray:[
                {
                  text:'未领取',
                  value:'未领取'
                }, {
                  text:'已领取',
                  value:'已领取'
                },{
                  text:'已完成',
                  value:'已完成'
            }],//过滤条件,筛选功能
            filtermethod: function (value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }//筛选事件的固定方法
          }
          ],
          // tablePreFix:'storeList',
          scrollLoading:true,
          totalCount:0,
          currentPage:1,
        },
        scrollTableRender:{
          HttpParams:{
            StockId:[],//仓库ID
            WaveCode:[],//波次编码
            BillCode:'',//工单号
            WoTypeid:'',//工单类型ID
            PickingStatus:'',//拣货状态
            PickingStart:'',//拣货开始时间
            CreatedTimeStart:'',//制作开始时间
            CreatedTTimeEnd:'',//制作结束时间
            Sorting:'',
            SkipCount:0,
            MaxResultCount:10
          },
          //拣货单列表
          httpUrl:'http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetOmsWoRelationData',
        },
        // scrollLoading:true,//加载动画是否显示，布尔值
        scrollTableCurrentPage:1,//默认值 1，当前页码
        scrollTableDataTotalCount:0,//默认值0,数据的总条数
        scrollTableData:[],
        scrollBasicSettingb:{
          tableName:'testb',//ref名称
          // mutiSelect:true,
          tableCols:[
            {//表格列名
              prop: 'dnCode',
              label: '出货单号',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'soCode',
              label: '订单号',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'seq',
              label: '货号',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'skuName',
              label: '货品名称',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'formatName',
              label: '尺码',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'qty',
              label: '数量',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'binLocation',
              label: '拣货储位',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'waybillCode',//缺的是物流单号。货号
              label: '运单号',
              sortable:true,//改列是否包含排序功能
            },{
              prop: 'pickingStatus',
              label: '拣货状态',
              filterArray:[
                {
                  text:'未完成',
                  value:'未完成'
                }, {
                  text:'已完成',
                  value:'已完成'
                }],//过滤条件,筛选功能
              filtermethod: function (value, row, column) {
                const property = column['property'];
                return row[property] === value;
              }//筛选事件的固定方法
            }
          ],
          // tablePreFix:'storeLists',
          scrollLoading:false,
          totalCount:0,
          currentPage:1,
        },
        scrollTableRenderb:{
          HttpParams:{
            WoId:'',//拣货单ID
            DnId:'',//仓库ID
            Sorting:'',//排序
            SkipCount:0,
            MaxResultCount:10,
          },
          httpUrl:'http://192.168.100.107:8099/api/services/app/OmsWaveManagement/GetOmsDnRelationData',
        },
        scrollTableCurrentPageb:1,
        scrollTableDatab:[],
        scrollTableDataTotalCountb:0,
        ifWidth:true,
        tableModel:'workorderManage',//数据模型名称标志
        isDisable:true,//表格是否可编辑
        mutiSelect:false,//表格是否可多选
        queryParams:{
          StockId:[],//仓库ID
          WaveCode:[],//波次编码
          BillCode:'',//工单号
          WoTypeid:'',//工单类型ID
          PickingStatus:'',//拣货状态
          PickingStart:'',//拣货开始时间
          CreatedTimeStart:'',//制作开始时间
          CreatedTimeEnd:'',//制作结束时间
          Sorting:'',//排序方式
          SkipCount:(this.$store.state.workorderManageListCurrentPage-1)*this.$store.state.workorderManageListEachPage,
          MaxResultCount:this.$store.state.workorderManageListEachPage
        },
        buttonGroup:[
          {
            text:'打印拣货工单',
            class:'bt_print',
            icon:'icon-print',
            disabled:false,
          },{
            text:'删除工单',
            class:'bt_del',
            icon:'icon-shanchu',
            disabled:false,
          },{
            text:'获取快递单号',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'确认波次',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'领用任务',
            class:'bt_in',
            icon:'',
            disabled:false,
          }
        ],
        httpUrl:{//请求接口地址
          // Initial:'/api/services/app/StockManagement/GetRepositoryList',
          // delete:'/api/services/app/StockManagement/Delete'
        },
        HttpParams:{//初始化参数
          OuId:this.$store.state.OuId,
          SkipCount:(this.$store.state.workorderManageListCurrentPage-1)*this.$store.state.workorderManageListEachPage,
          MaxResultCount:this.$store.state.workorderManageListEachPage
        },
        hasPagination:true,
        areaArray:[],
        dialogSetting:{
          message:'',//提示信息
          dialogName:'',//对话框名称
          dialogType:'',//对话框类型
        },
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        dialogVisible:false,
        dialogCommand:[],//对话框按钮组控制组
        filterStockKey:'',
        // filterWaveCodeKey:'',
      }
    },
    mounted(){

    },
    created(){
      this.getWorkOrder();
      this.loadSelect();
      // this.scrollBasicSettingb.scrollLoading=false;
    },
    computed:{
      // ReturnStockId: function() {
      //   if (this.choice1 == "全选") {
      //     alert(11)
      //     return this.ReturnStockId;
      //   } else if (this.choice1 == "查看已选") {
      //     alert(22)
      //     console.log(this.multipleSelection);
      //     this.ReturnStockId= this.multipleSelection;
      //   } else if (this.choice1 == "查看未选") {
      //     alert(33)
      //   }
      // }
      ReturnStockIdArr1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockKey,this.ReturnStockIdArr)
      },
      // waveNumnerList1: function () {//下拉数据自定义搜索过滤
      //   return FILTER_MOTHED(this.filterWaveCodeKey,this.waveNumnerListArr)
      // },
    },
    watch: {},
    methods:{
      scrollLoadMore(tableName){
        let Setting='';
        let Render='';
        let Tabledata='';
        if(tableName=="test"){
          Setting="scrollBasicSetting";
          Render="scrollTableRender";
          Tabledata='scrollTableData';
          this.loadMoreSetting(Setting,Render,Tabledata);
        }else if(tableName=="testb"){
          Setting="scrollBasicSettingb";
          Render="scrollTableRenderb";
          Tabledata='scrollTableDatab';
          this.loadMoreSetting(Setting,Render,Tabledata);
        }
      },
      loadMoreSetting(Setting,Render,Tabledata){
        this[Setting].scrollLoading=true;
        let eachPage=10;
        this[Setting].currentPage++;
        this[Render].HttpParams.SkipCount=0;
        this[Render].HttpParams.MaxResultCount=eachPage*this[Setting].currentPage;
        if(this[Render].HttpParams.MaxResultCount>this[Setting].totalCount&&this[Setting].totalCount<eachPage*(this[Setting].currentPage-1) ){
          this[Setting].scrollLoading=false;
          this.$message({
            message: '没有更多的数据了！',
            type: 'success'
          });
        }else{
          let _this=this;
          _this.$axios.gets(this[Render].httpUrl,_this[Render].HttpParams).then(function(res){
            _this[Tabledata]=res.result.items;
            _this[Setting].totalCount=res.result.totalCount;
            _this[Setting].scrollLoading=false;
          })
        }
      },
      loadSelect(){
        let _this=this;
        // 仓库
        _this.$axios.gets("/api/services/app/StockManagement/GetRepositoryList", {
          defaultOuId:'',
          StockCode:'',
          StockName:'',
          AreaCode:'',
          StockTypeId:'',
          SkipCount: 0,
          MaxResultCount: 10
        }).then(function(res) {
          _this.ReturnStockIdArr = res.result.items;
          _this.stockTotal=res.result.totalCount;
          console.log(_this.ReturnStockIdArr);
        });
        // 波次号
        _this.innerVisible=!_this.innerVisible;
        _this.$axios.gets(_this.url+'/api/services/app/OmsWaveManagement/GetOmsWaveData',
          {
            Sorting:'',
            SkipCount:0,
            MaxResultCount:1000
          }).then(function(res){
          console.log(res);
          _this.waveNumnerList=res.result.items;
        });
        console.log(_this.waveNumnerList);
        //工单类型
        _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_WorkOrderType"
        }).then(function(res) {
          _this.WorkOrderType = res.result;
          console.log(_this.WorkOrderType);
        });
        //工单状态
        _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_WorkOrderStatus"
        }).then(function(res) {
          _this.WorkOrderStatus = res.result;
          console.log(_this.WorkOrderStatus);
        });
      },
      changeSelect(val) {//多选横着显示
        console.log(val);
        this.StockIdArr=val;
        let arr=[];
        console.log(this.StockIdArr);
        this.StockIdArr.forEach((item)=>{
          console.log(item);
          arr.push(item);
        });
        console.log(arr);
        this.StockIdArr1=arr;
        console.log(this.StockIdArr1);
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

      handleSelectionChange(val){
        console.log(val);//val为选中的表格数据 array
        this.selectData = val;
        let ids = [];
        let woCode='';
        let picker='';
        this.selectData.map((item)=> {
          ids.push(item.id);
          woCode=item.woCode;
          picker=item.picker;
        });
        this.ids=ids;
        this.woCode=woCode;
        this.picker=picker;
        console.log(this.ids);
        console.log(this.woCode);
        console.log(this.picker);
      },
      getCode(val){
        let _this=this;
        console.log(val);
        _this.code=val;
      },
      filterStockMethod(query){//搜索代码和名称--仓库
        this.filterStockKey=query;
      },
      // filterWaveCodeMethod(query){//搜索代码和名称--波次号
      //   this.filterWaveCodeKey=query;
      // },
      selectGet(vId){//获取拣货人名字
        console.log(vId);
        let obj = {};
        obj = this.options.find((item)=>{//这里的options就是上面遍历的数据源
          return item.id === vId;//筛选出匹配数据
        });
        this.picker=obj.name;
        console.log(obj.name);
      },
      btnClick(data){
        let _this=this;
        if(data=="删除工单"){
          _this.delete();
        }else if(data=="领用任务"){
          if(_this.selectData.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选！"
            });
          }else if(_this.selectData.length>=2){
            _this.$message({
              type: 'warning',
              message: "一次只能领用单条！"
            });
          }else{
            _this.task();
          }
        }
      },
      task(){//任务领用
        let _this=this;
        _this.dialogFormVisible=true;
      },
      taskReceive(){//任务领用弹出确定按钮
        let _this=this;
        _this.dialogFormVisible=false;
        _this.$axios.posts(_this.url+"/api/services/app/OmsWaveManagement/ArrangePicker", {
          picker:_this.picker,
          billCode: _this.woCode
        }).then(function(res) {
          _this.open('任务领用成功！','el-icon-circle-check','successERP');
           _this.getWorkOrder();
        },function (res) {
            console.log(res);
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = 'saveDialog';
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = res.error.message;
          _this.errorTips.details = '';
          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      delete(){//删除工单
        let _this=this;
        console.log(_this.selectData.length);
        if(_this.selectData.length==0){
          _this.$message({
            type: 'warning',
            message: "请先勾选！"
          });
        }else{
          let _this = this;
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType="confirm";
          _this.dialogSetting.dialogName='delDialog';
          _this.dialogSetting.message="确定删除？";
          _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        }
      },
      dialogClick(parmas){//对话框点击事件
        let _this = this;
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="delDialog"){//删除对话框
            _this.$axios.posts(_this.url+'/api/services/app/OmsWaveManagement/BatchDeleteWo',{woIds:_this.ids}).then(function(res){
              _this.open('删除成功','el-icon-circle-check','successERP');
              _this.dialogVisible=false;
              _this.getWorkOrder();
            },function(res){
              _this.dialogSetting.dialogType="confirm";
              _this.dialogSetting.dialogName='delErrDialog';
              _this.dialogSetting.message="删除失败!"+res.error.message;
              _this.errorTips.message=res.error.message;
              _this.errorTips.details='';
              _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
            })
          }else if(parmas.dialogName=="cancelDialog"){//取消
            _this.dialogVisible=false;
          }else if(parmas.dialogName=="delErrDialog"){//
            _this.dialogVisible=false;
          }
        }else if(parmas.dialogButton=="取消"){
          _this.dialogVisible=false;
        }
      },
      dialogColse(){//对话框关闭回调事件
        this.dialogVisible=false;
      },
      // getwoveNumber(){//波次号
      //   let _this=this;
      //   _this.innerVisible=!_this.innerVisible;
      //   _this.$axios.gets(_this.url+'/api/services/app/OmsWaveManagement/GetOmsWaveData',
      //     {
      //       Sorting:'',
      //       SkipCount:0,
      //       MaxResultCount:1000
      //     }).then(function(res){
      //     console.log(res);
      //     _this.waveNumnerList=res.result.items;
      //     _this.waveNumnerList1=res.result.items;
      //   });
      //   console.log(_this.multipleSelection);
      // },
      // getwareHouse(){//仓库
      //   let _this=this;
      //   _this.innerVisible1=!_this.innerVisible1;
      //   _this.$axios.gets("/api/services/app/StockManagement/GetRepositoryList", {
      //     defaultOuId:'',
      //     StockCode:'',
      //     StockName:'',
      //     AreaCode:'',
      //     StockTypeId:'',
      //     SkipCount: 0,
      //     MaxResultCount: 10
      //   }).then(function(res) {
      //     _this.ReturnStockId = res.result.items;
      //     _this.ReturnStockId1 = res.result.items;
      //     _this.stockTotal=res.result.totalCount;
      //     console.log(res.result.items);
      //   });
      // },
      // toggleData(val){
      //   let _this=this;
      //   console.log(val);
      //   if (val == "全选") {//全部数据
      //     _this.ReturnStockId=_this.ReturnStockId1;
      //     _this.multipleSelection=[];
      //     console.log(_this.multipleSelection);
      //   } else if (val == "查看已选") {//选中的
      //     console.log(_this.multipleSelection);
      //     _this.ReturnStockId=_this.multipleSelection;
      //   } else if (val == "查看未选") {//全部的-选中的
      //
      //   }
      // },
      // toggleData1(val){
      //   let _this=this;
      //   console.log(val);
      //   if (val == "全选") {//全部数据
      //     _this.waveNumnerList=_this.waveNumnerList1;
      //     _this.multipleSelection1=[];
      //     console.log(_this.multipleSelection1);
      //   } else if (val == "查看已选") {//选中的
      //     console.log(_this.multipleSelection1);
      //     _this.waveNumnerList=_this.multipleSelection1;
      //   } else if (val == "查看未选") {//全部的-选中的
      //
      //   }
      // },
      // chooseStock(){//仓库确定按钮
      //   let _this=this;
      //   // _this.multipleSelection//选中的数组
      //   for(let i in _this.multipleSelection){
      //     console.log(_this.multipleSelection[i].id);
      //     _this.chooseReturnStockId=[1,2,3,4];
      //     _this.chooseReturnStockName=['张三','李四','王五','赵柳'];
      //   }
      // },
      // choosewaveNumner(){//波次号确定按钮
      //     let _this=this;
      //     _this.waveCode=[];
      //     for(let k in _this.multipleSelection1){
      //       _this.waveCode.push(_this.multipleSelection1[k].waveCode);
      //     }
      //     _this.queryParams.waveCode=_this.waveCode;
      //     console.log(_this.queryParams.waveCode);
      //     _this.innerVisible=false;
      // },
      // handleSelectionChange:function(val) {//点击仓库列表选中的数据
      // let _this = this;
      // _this.multipleSelection = val;
      // console.log(val);
      // },
      // handleSelectionChange1(val){//点击波次号列表选中的数据
      //   let _this = this;
      //   _this.multipleSelection1 = val;
      //   console.log(val);
      // },
      getRowKeys(){},
      // handleSelectionChange(){},
      submitSearch(){},
      getWorkOrder(){//初始化拣货单表格赋值
        let _this=this;
        _this.scrollBasicSetting.scrollLoading=true;
        _this.$axios.gets(_this.scrollTableRender.httpUrl,_this.scrollTableRender.HttpParams).then(function(res){
          _this.scrollBasicSetting.scrollLoading=false;
          _this.scrollTableData=res.result.items;
          _this.scrollTableDataTotalCount=res.result.totalCount;
          console.log( _this.scrollTableData);
          console.log(_this.scrollTableDataTotalCount);
          _this.scrollBasicSetting.scrollLoading=false;
          _this.scrollBasicSetting.totalCount=res.result.totalCount;
        })
      },
      getWorkOrderDetail(){//根据id右边表显示
        let _this=this;
        _this.scrollBasicSettingb.scrollLoading=true;
        _this.$axios.gets(_this.scrollTableRenderb.httpUrl,_this.scrollTableRenderb.HttpParams).then(function(res){
          _this.scrollBasicSettingb.scrollLoading=false;
          _this.scrollTableDatab=res.result.items;
          _this.scrollTableDataTotalCountb=res.result.totalCount;
          _this.scrollBasicSettingb.totalCount=res.result.totalCount;
          console.log( _this.scrollTableDatab);
          console.log(_this.scrollTableDataTotalCountb);
          if( _this.scrollTableDatab.length==0){
            _this.scrollBasicSettingb.scrollLoading=false;
          }
        })
      },
      rowClick(row){//单行点击加载详情
        console.log(row.id);
        this.detailId=row.id;
        this.scrollTableRenderb.HttpParams.WoId=row.id;//拣货单ID
        this.getWorkOrderDetail();
      },
      query(){//根据条件查询数据
        let _this=this;
        console.log(typeof(_this.madeTime));
        if(_this.madeTime.length==0) {
          _this.queryParams.CreatedTimeStart= '';
          _this.queryParams.CreatedTimeEnd= '';
          axios.get(_this.url + '/api/services/app/OmsWaveManagement/GetOmsWoRelationData',
            {
              params: {
                StockId: _this.queryParams.StockId,//仓库ID
                WaveCode: _this.queryParams.WaveCode,//波次编码
                BillCode: _this.queryParams.BillCode,//工单号
                WoTypeid: _this.queryParams.WoTypeid,//工单类型ID
                PickingStatus: _this.queryParams.PickingStatus,//拣货状态
                PickingStart: _this.queryParams.PickingStart,//拣货开始时间
                CreatedTimeStart: _this.queryParams.CreatedTimeStart,//制作开始时间
                CreatedTimeEnd: _this.queryParams.CreatedTimeEnd,//制作结束时间
                Sorting: '',//排序方式
                SkipCount: (_this.$store.state.workorderManageListCurrentPage - 1) * _this.$store.state.workorderManageListEachPage,
                MaxResultCount: _this.$store.state.workorderManageListEachPage
              },
              paramsSerializer: function (params) {
                const StockId = params.StockId.map(_ => `StockId=${_}`).join('&');
                const WaveCode = params.WaveCode.map(_ => `WaveCode=${_}`).join('&');
                return `${StockId}&${WaveCode}&BillCode=` + params.BillCode + `&WoTypeid=` + params.WoTypeid + `&Sorting=` + params.Sorting + `&PickingStatus=` + params.PickingStatus + `&PickingStart=` + params.PickingStart + `&CreatedTimeStart=` + params.CreatedTimeStart + `&CreatedTimeEnd=` + params.CreatedTimeEnd + `&Sorting=` + params.Sorting + `&SkipCount=` + params.SkipCount + `&MaxResultCount=` + params.MaxResultCount;
              },
            }
          ).then(function (res) {
            console.log(res.data.result.items);
            _this.scrollTableData=res.data.result.items;

            _this.scrollTableDataTotalCount=res.data.result.totalCount;
            console.log( _this.scrollTableData);
            console.log(_this.scrollTableDataTotalCount);
            _this.scrollBasicSetting.scrollLoading=false;
            _this.scrollBasicSetting.totalCount=res.data.result.totalCount;

            // _this.$store.commit('Init_Table',res.data.result.items);//传递table数据
            // let totalPage=Math.ceil(res.data.result.totalCount/_this.$store.state.workorderManageListEachPage);
            // _this.$store.commit('Init_pagination',totalPage);//设置总分页
            // _this.$store.commit('Init_TotalCount',res.data.result.totalCount);//设置总条数
            // _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
          });
        }else{
          _this.queryParams.CreatedTimeStart = _this.madeTime[0];
          _this.queryParams.CreatedTimeEnd = _this.madeTime[1];
          axios.get(_this.url + '/api/services/app/OmsWaveManagement/GetOmsWoRelationData',
            {
              params: {
                StockId: _this.queryParams.StockId,//仓库ID
                WaveCode: _this.queryParams.WaveCode,//波次编码
                BillCode: _this.queryParams.BillCode,//工单号
                WoTypeid: _this.queryParams.WoTypeid,//工单类型ID
                PickingStatus: _this.queryParams.PickingStatus,//拣货状态
                PickingStart: _this.queryParams.PickingStart,//拣货开始时间
                CreatedTimeStart: _this.queryParams.CreatedTimeStart,//制作开始时间
                CreatedTimeEnd: _this.queryParams.CreatedTimeEnd,//制作结束时间
                Sorting: '',//排序方式
                SkipCount: (_this.$store.state.workorderManageListCurrentPage - 1) * _this.$store.state.workorderManageListEachPage,
                MaxResultCount: _this.$store.state.workorderManageListEachPage
              },
              paramsSerializer: function (params) {
                const StockId = params.StockId.map(_ => `StockId=${_}`).join('&');
                const WaveCode = params.WaveCode.map(_ => `WaveCode=${_}`).join('&');
                return `${StockId}&${WaveCode}&BillCode=` + params.BillCode + `&WoTypeid=` + params.WoTypeid + `&Sorting=` + params.Sorting + `&PickingStart=` + params.PickingStart + `&CreatedTimeStart=` + params.CreatedTimeStart + `&CreatedTimeEnd=` + params.CreatedTimeEnd + `&Sorting=` + params.Sorting + `&SkipCount=` + params.SkipCount + `&MaxResultCount=` + params.MaxResultCount;
              },
            }
          ).then(function (res) {
            console.log(res.data.result.items);
            _this.scrollTableData=res.data.result.items;

            _this.scrollTableDataTotalCount=res.data.result.totalCount;
            console.log( _this.scrollTableData);
            console.log(_this.scrollTableDataTotalCount);
            _this.scrollBasicSetting.scrollLoading=false;
            _this.scrollBasicSetting.totalCount=res.data.result.totalCount;
            // _this.$store.commit('Init_Table',res.data.result.items);//传递table数据
            // let totalPage=Math.ceil(res.data.result.totalCount/_this.$store.state.workorderManageListEachPage);
            // _this.$store.commit('Init_pagination',totalPage);//设置总分页
            // _this.$store.commit('Init_TotalCount',res.data.result.totalCount);//设置总条数
            // _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
          });
        }
      },
      //-------------------------------------------------------
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
      closeLeft:function(){
        let self = this;
        self.ifWidth = false;
      },
      openLeft:function(){
        let self = this;
        self.ifWidth = true;
      },
    },
    components:{
      buttonGroup,
      ScrollTable,
      dialogBox
    }
  }
</script>

<style scoped>
  .res-list{
    width: 100%;
    height: 100%;
    background:#EEF1F5;
  }

  .w0{
    width: 0;
  }

  .w20{
    width: 20%;
  }
  .w80{
    width: 80%;
  }
  w100{
    width: 100%;
  }

  .bg-white{
    background:white;
    border-radius: 3px;
    font-size: 14px;
  }
  .ml10{
    margin-left: 10px;
  }
  .mr10{
    margin-right: 10px;
  }
  .mt10{
    margin-top: 10px;
  }
  .pt5{
    padding-top: 5px;
  }
  .pt10{
    padding-top: 10px;
  }
  .pl10{
    padding-left: 10px;
  }
  .pl15{
    padding-left: 15px;
  }
  .btn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background:rgba(130, 170, 252, 1);
    border-radius: 3px;
    color: white;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .rbtn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background:rgba(242, 242, 242, 1);
    border-radius: 3px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .input-need{
    outline: none;
    border:none;
    width: 100%;
  }
  input:-ms-input-placeholder{
    color: rgba(0, 0, 0, 0.349019607843137);
  }

  input::-webkit-input-placeholder{
    color: rgba(0, 0, 0, 0.349019607843137);
  }
  .h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
  }
  .fs12{
    font-size: 12px;
  }
  .border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 380px;
  }

</style>
<style>
  .res-list .open-search{
    background-image: url(../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
  }
  .res-list .cell .el-input__inner{
    border:none;
    text-align:center;
    padding:0;
  }
  .res-list .bgw .el-input__inner{
    background-color:white;
  }
  .res-list .bgg .el-input__inner{
    background-color:#FAFAFA;
  }
  .res-list .bAreaSearch .el-input__inner{
    height: 30px;
    border-radius: 30px;
  }
  .res-list .el-table .cell{
    font-size:12px;
  }
  .bgcolor{
    height: 35px;
    font-size: 12px;
    margin-top: 10px;
    width: 100%;
    float: left;
    margin-right: 5px;
   }
  .bgcolor1{
    height: 35px;
    font-size: 12px;
    margin-top: 10px;
    width: 100%;
    float: left;
    margin-right: 5px;
  }
  .smallBgcolor{
    margin-bottom:0;
  }
  .searchBtn{
    text-align: center;
    margin:10px 0;
  }
  .leftTable{
    margin-right:1%;
    border-right:1px solid #ebeef5;
  }
  .contents[data-v-ff98478e]{
    background-color:#fff;
  }
  .leftTable,.rightTable{
    float:left;
    width:49%;
    overflow: hidden;
  }
  .pb10 {
    margin-bottom: 0;
  }
  .tableContainer{
    border-top:1px solid #ebeef5;
    overflow: hidden;
  }
  .tableContainer span.tableSpan{
    display:inline-block;
    float:left;
    margin:15px 0 0 10px;
    font-size:14px;
  }
  .userDefined{
    float:right;
    width:65px;
    height:30px;
    margin:10px 10px 10px 0;
  }
  .bgcolor1>label {
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    width: 84px;
    height: 100%;
    float: left;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal;
  }

  /*父级*/
  div.waveNumber,div.wareHouse{
    position:relative;
  }
  .selectWavuenuber,.selectWavuenuber1{
    z-index:1000 !important;
    background: #fff;
    top: 36px;
    left: 94px;
    position: absolute;
    width:264px;
    border:1px solid #ccc;
  }
  .bgcolor .el-date-editor input{
    padding:0;
  }
  .el-date-editor{
    height:35px;
    /*width: calc(100% - 94px);*/
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width: calc(100% - 94px);
  }


  .el-radio__label{
    display:inline-block;
  }
  .el-radio__label{
    padding:0;
  }
  .search_box{
    width:100%;
    overflow: hidden;
  }
  .search_input{
    width:90% !important;
    margin:0 5%;
    height:28px!important;
    margin-top:10px;
  }
  .bgcolor  .search_input input{
    height:28px!important;
  }
  .el-radio-group{
    width:90%;
    margin: 0 5%;
    margin-top:10px;
  }
  .el-radio{
    margin-left:10px;
  }
  .el-radio+.el-radio{
    margin-left:16px;
  }
  .bgcolor .el-input__suffix {
    line-height: 28px;
  }
  .totalnumber{
    line-height:24px;
  }
  .totalnumber span{
    margin-left:15px;
  }
  div.buttonGroup{
    padding:10px 0;
    text-align:center;
  }
  .search_box .search_input .el-input__inner{
    height:28px!important;
  }
  .el-button{
    padding:9px 20px;
  }
  .el-input__inner{
    height:35px!important;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    position: absolute;
    right: 14px;
    font-family: element-icons;
    content: "\E611";
    font-size: 12px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-select-dropdown__item {
    font-size: 14px;
    padding: 0 43px 0 15px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
  }
  .resetWocode{
    width:217px;
  }
  .dialog-footer{
    text-align: center;
    padding-bottom: 15px;
  }
  .el-select__tags{
    height:35px;
    margin:0 5px;
    width:100%;
    max-width: 87%!important;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-select__tags>span{
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-button+.el-button{
    margin-left:20px;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:calc(100% - 94px);
  }
</style>

