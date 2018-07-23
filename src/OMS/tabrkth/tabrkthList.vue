<template>
  <div class="tabrkthList">
    <el-row class="bg-white pt10">
      <el-col :md="24" :lg="24" :xl="24" class="getPadding">
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>退货编号</label>
            <el-input size="mini" v-model="form.BillCode "></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>退货仓库</label>
            <el-select size="mini" v-model="form.ReturnStockId" filterable :filter-method="filterStock" multiple clearable placeholder="">
              <el-option v-for="item in ReturnStockArrFilter" :key="item.id" :label="item.stockName" :value="item.id">
                <span>{{ item.stockCode }}</span>
                <span style="margin-right:30px">{{ item.stockName }}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>创建日期</label>
            <el-date-picker size="mini" type="datetimerange" v-model="time" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>确认状态</label>
            <el-select size="mini" v-model="form.IsInbound" placeholder="">
              <el-option label="已确认" :value="true">
              </el-option>
              <el-option label="未确认" :value="false">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>物流单号</label>
            <el-input size="mini" v-model="form.LogisticsBillCode"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>店铺</label>
            <el-select size="mini" v-model="form.ShopId" filterable :filter-method="filterShopId" multiple clearable placeholder="请选择">
              <el-option v-for="item in ReturnShopIdArrFilter" :key="item.id" :label="item.shopName" :value="item.shopId">
                <span>{{ item.shopCode }}</span>
                <span style="margin-right:30px">{{ item.shopName }}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>买家昵称</label>
            <el-input size="mini" v-model="form.BuyerNickname"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>电话</label>
            <el-input size="mini" v-model="form.BuyerPhone"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>来源交易号</label>
            <el-input size="mini" v-model="form.SourceTransCode"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>来源订单号</label>
            <el-input size="mini" v-model="form.SourceOrderCode"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>商品编码</label>
            <el-input size="mini" v-model="form.ProductCode"></el-input>
          </div>
        </el-col>

        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>SKU条码</label>
            <el-input size="mini" v-model="form.SkuCode"></el-input>
          </div>
        </el-col>
      </el-col>
      <el-col class="text-center mt10">
        <button class="order-query" @click="reset">重置</button>
        <button class="order-query" @click="search">查询</button>
      </el-col>
      <el-col class="mt10 bbt1">
        <el-col class="mt20 pl20 pr20">
          <el-table v-loading="isLoadingA" border height="300" ref="multipleTable" :data="tableData" highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="billCode" label="退货单号">
              <template slot-scope="scope">
                <span>{{scope.row.billCode}}</span>
                <img v-show="tableDataUpdateIdArray.indexOf(scope.row.id)>=0" class="update-icon" src="../../../static/image/content/redremind.png" />
              </template>
            </el-table-column>
            <el-table-column label="创建日期">
              <template slot-scope="scope">
                <span>{{scope.row.createdTime ? scope.row.createdTime.split("T")[0] : ""}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生效日期">
              <template slot-scope="scope">
                <span>{{scope.row.effectiveTime ? scope.row.effectiveTime.split("T")[0] : ""}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shopName" label="店铺">
            </el-table-column>
            <el-table-column prop="outStockName" label="出货仓">
            </el-table-column>
            <el-table-column prop="returnStockName" label="退货仓">
            </el-table-column>
            <el-table-column prop="buyerNickname" label="买家昵称">
            </el-table-column>
            <el-table-column prop="buyerPhone" label="电话">
            </el-table-column>
            <el-table-column label="物流公司">
              <template slot-scope="scope">
                <el-select :disabled="form.IsInbound ? true : false" @change="changeVaule(scope.row)" @blur="upDateList" v-model="scope.row.logisticsName" placeholder="">
                  <el-option label="测试" value=1></el-option>
                  <el-option label="测试2" value=2></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="物流单号">
              <template slot-scope="scope">
                <el-input :disabled="form.IsInbound ? true : false" @input="changeVaule2(scope.row)" @blur="upDateList" class="noEdit" v-model="scope.row.logisticsBillCode"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="rtoInboundCreatedBy" label="入库确认人">
            </el-table-column>
            <el-table-column label="入库确认时间">
              <template slot-scope="scope">
                <span>{{ scope.row.rtoInboundCreatedTime ? scope.row.rtoInboundCreatedTime.split("T")[0] : ""}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="mt20 pl20 pr20">
          <el-col class="mb10 titlle">明细表</el-col>
          <el-col>
            <el-table v-loading="isLoadingB" border height="300" :data="tableDataDetail" style="width: 100%">
              <el-table-column prop="seq" label="序号" width="150">
              </el-table-column>
              <el-table-column label="来源交易号">
                <template slot-scope="scope">
                  <span>{{scope.row.sourceTransCode}}</span>
                  <img v-show="tableDataUpdateDetailIdArray.indexOf(scope.row.seq)>=0" class="update2-icon" src="../../../static/image/content/redremind.png" />
                </template>
              </el-table-column>
              <el-table-column prop="productCode" label="商品编码">
              </el-table-column>
              <el-table-column prop="skuCode" label="SKU">
              </el-table-column>
              <el-table-column prop="specName" label="规格">
              </el-table-column>
              <el-table-column prop="qty" label="数量">
              </el-table-column>
              <el-table-column label="实际入库数量">
                <template slot-scope="scope">
                  <el-input :disabled="form.IsInbound ? true : false" @input="changeVauleDetail(scope.row)" @blur="saveUpDate" class="noEdit" v-model="scope.row.inboundQty"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col class="mt20 mb10 tr">
            <span class="fz12">已选记录数:&nbsp;&nbsp;&nbsp;&nbsp;{{length}}</span>
            <button class="order-query" @click="inventory">确认入库</button>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
</template>

<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import dialogBox from "../../base/dialog/dialog";
import Table from "../../base/Table/Table";
import config from "../../../static/config"
import { FILTER_MOTHED } from "../../common/common.js";
export default {
  name: "tabrkthList",
  data() {
    return {
      isLoadingB:false, //第一次表格加载显示
      isLoadingA:false, //第二个表格加载显示
      multipleSelection: [], //多行选中数据
      filterStockKey: "",
      filterShopIdKey: "",
      ReturnStockId: "", //退货仓库列表
      webshop: "", //店铺列表
      tableData3: [],
      isSave: false,
      isUpdate: false, //是否进行修改
      tableData: [],
      curItem: {}, // 当前选中行
      tableDataUpdateArray: [], //表格一修改的数据
      tableDataDetail: [], // 明细列表
      tableDataUpDetaildateArray: [], // 明细修改数据
      SelectionChange: [],
      updateArray: [], //修改行集合
      enableEdit: false,
      isAdd: false, //是否新增
      addArray: [], //新增集合
      tableModel: "tabrkthList", // 数据列表名称（避免混淆）
      //查询条件
      time: [], //创建日期
      form: {
        // BillCode: "", //退货单据号
        // ReturnStockId: "", //退货仓库ID
        // CreatedTimeStart: "", //创建开始日期
        // CreatedTimeEnd: "", //创建结束日期
        IsInbound: true //确认状态
        // LogisticsBillCode: "", // 物流单号
        // ShopId: "", //店铺
        // BuyerNickname: "", //买家昵称
        // BuyerPhone: "", //电话
        // SourceTransCode: "", //来源交易号
        // SourceOrderCode: "", //来源订单号
        // ProductCode: "", //商品编码
        // SkuCode: "" //SKU条码
      },
      tableData: [], //表格数据
      multipleSelection: [], // 选中数据
      dialogCommand: [], //底部按钮组控制组
      dialogVisible: false,
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogSetting: {
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      errorMessage: false,
      response: {
        details: "",
        message: "",
        validationErrors: []
      }
    };
  },
  created() {
    let _this = this;
    _this.$axios
      .gets(
        `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/GetSearchData`,
        {
          IsInbound: true,
          SkipCount: 0,
          MaxResultCount: 999
        }
      )
      .then(function(res) {
        console.log(res);
        _this.tableData = [].concat(res.result.items);
      });
    // 仓库
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/StockManagement/GetRepositoryList`, {
        defaultOuId: "",
        StockCode: "",
        StockName: "",
        AreaCode: "",
        StockTypeId: "",
        SkipCount: 0,
        MaxResultCount: 999
      })
      .then(function(res) {
        _this.ReturnStockId = res.result.items;
      });
    // 店铺列表
    _this.$axios
      .gets(
        `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsWebShopManagement/GetWebShopBySearch`,
        {
          SkipCount: 0,
          Status: 2,
          MaxResultCount: 999
        }
      )
      .then(function(res) {
        console.log("店铺列表:", res);
        _this.webshop = res.result.items;
      });
  },
  computed: {
    isInbound:function (param) {
      return this.form.IsInbound;
     },
    length: function(params) {
      return this.multipleSelection.length;
    },
    ReturnStockArrFilter: function() {
      return FILTER_MOTHED(this.filterStockKey, this.ReturnStockId);
    },
    ReturnShopIdArrFilter: function() {
      return FILTER_MOTHED(this.filterShopIdKey, this.webshop);
    },
    tableDataUpdateIdArray: function(params) {
      let arr = [];
      this.tableDataUpdateArray.forEach(row => {
        arr.push(row.id);
      });
      return arr;
    },
    tableDataUpdateDetailIdArray: function(params) {
      let arr = [];
      this.tableDataUpDetaildateArray.forEach(row => {
        arr.push(row.seq);
      });
      return arr;
    }
  },
  methods: {
    saveUpDate() {
      //明细修改，失去焦点的时候进行保存
      let _this = this;
      if (this.tableDataUpDetaildateArray.length <= 0) {
        return;
      }
      _this.$axios
        .puts(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/UpdateOmsRto`,
          [
            {
              updateRtoDto: {
                ...this.curItem
              },
              updateRtoDtlDtoList: this.tableDataDetail
            }
          ]
        )
        .then(function(res) {
          _this.tableDataUpDetaildateArray = [];
          _this.open("修改成功", "el-icon-circle-check", "successERP");
        })
        .catch(function(err) {
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = "saveDialog";
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = err.error.message;
          _this.errorTips.details = "";
          _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
          _this.dialogVisible = true;
        });
    },
    reset() {
      // 重置按钮
      this.time = [];
      this.form = {
        BillCode: "", //退货单据号
        ReturnStockId: [], //退货仓库ID
        CreatedTimeStart: "", //创建开始日期
        CreatedTimeEnd: "", //创建结束日期
        IsInbound: true, //确认状态
        LogisticsBillCode: "", // 物流单号
        ShopId: [], //店铺
        BuyerNickname: "", //买家昵称
        BuyerPhone: "", //电话
        SourceTransCode: "", //来源交易号
        SourceOrderCode: "", //来源订单号
        ProductCode: "", //商品编码
        SkuCode: "" //SKU条码
      };
      this.curItem = {};
      this.tableDataDetail = [];
    },
    filterStock(query) {
      this.filterStockKey = query;
    },
    filterShopId(query) {
      this.filterShopIdKey = query;
    },
    dialogClick(parmas) {
      if (parmas.dialogButton == "确定") {
        this.dialogVisible = false;
      } else if (parmas.dialogButton == "取消") {
        this.dialogVisible = false;
      }
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    //点击查询事件
    search() {
      let _this = this;
      _this.isLoadingA = true
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/GetSearchData`,
          {
            ..._this.form,
            SkipCount: 0,
            MaxResultCount: 999
          }
        )
        .then(function(res) {
          _this.isLoadingA = false
          _this.tableData = [].concat(res.result.items);
          _this.tableDataUpdateArray = [];
        });
    },
    inventory() {
      let _this = this;
      if (this.form.IsInbound) {
        _this.$message({
          message: "当前所有数据已经入库",
          type: "warning"
        });
        return;
      }
      if (_this.multipleSelection.length < 1) {
        _this.$message({
          message: "当前没有选择任何数据",
          type: "warning"
        });
        return;
      }
      let arr = [];
      this.multipleSelection.forEach(row => {
        arr.push(row.id);
      });
      console.log(arr);
      _this.$axios
        .posts(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/CreateOmsRtoInbound`,
          arr
        )
        .then(function(res) {
          _this.open("入库成功", "el-icon-circle-check", "successERP");
          _this.search();
        })
        .catch(function(err) {
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = "saveDialog";
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = err.error.message;
          _this.errorTips.details = "";
          _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
          _this.dialogVisible = true;
          _this.isSave = false;
        });
    },
    handleCurrentChange: function(val) {
      //表格一选中行方法调用
      let _this = this;
      if(!val){
        return;
      }
      _this.curItem = val;
      _this.isLoadingB = true;
      try {
        _this.$axios
          .gets(
            `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/GetDetailsById`,
            {
              id: val.id
            }
          )
          .then(function(res) {
            _this.tableDataDetail = res.result.items;
            _this.isLoadingB = false;
          });
      } catch (error) {}
      _this.tableDataUpDetaildateArray = [];
    },
    handleSelectionChange(val) {
      //选中多行数据调用
      this.multipleSelection = val;
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
    upDateList() {
      let _this = this;
      if (_this.tableDataUpdateArray.length <= 0) {
        return;
      }
      _this.$axios
        .puts(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsRtoInboundManagement/UpdateOmsRto`,
          [
            {
              updateRtoDto: {
                ...this.curItem
              },
              updateRtoDtlDtoList: this.tableDataDetail
            }
          ]
        )
        .then(function(res) {
          _this.tableDataUpdateArray = [];
          _this.open("修改成功", "el-icon-circle-check", "successERP");
        })
        .catch(function(err) {
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = "saveDialog";
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = err.error.message;
          _this.errorTips.details = "";
          _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
          _this.dialogVisible = true;
        });
    },
    changeVaule2(val) {
      //编辑表格数据1
      let _this = this;
      let count = 0;
      _this.tableDataUpdateArray.forEach(row => {
        if (row.id == val.id) {
          row = val;
        } else {
          count++;
        }
      });
      if (count == _this.tableDataUpdateArray.length) {
        _this.tableDataUpdateArray.push(val);
      }
    },
    changeVaule(val) {
      //编辑表格数据1
      let _this = this;
      let count = 0;
      _this.tableDataUpdateArray.forEach(row => {
        if (row.id == val.id) {
          row = val;
        } else {
          count++;
        }
      });
      if (count == _this.tableDataUpdateArray.length) {
        _this.tableDataUpdateArray.push(val);
      }
      this.upDateList();
    },
    changeVauleDetail(val) {
      // 编辑表格数据2
      let _this = this;
      let count = 0;
      _this.tableDataUpDetaildateArray.forEach(row => {
        if (row.seq == val.seq) {
          row = val;
        } else {
          count++;
        }
      });
      if (count == _this.tableDataUpDetaildateArray.length) {
        _this.tableDataUpDetaildateArray.push(val);
      }
      console.log("这是表格明细修改的数据", _this.tableDataUpDetaildateArray);
    }
  },
  watch: {
    isInbound:function(params) {
      this.tableDataDetail = [];
      this.isLoadingB = false;
      this.search()
    },
    time: function() {
      if (this.time) {
        if (typeof this.time == "object") {
          try {
            this.form.CreatedTimeStart = this.time[0];
            this.form.CreatedTimeEnd = this.time[1];
          } catch (error) {}
        }
      } else {
        this.form.CreatedTimeStart = "";
        this.form.CreatedTimeEnd = "";
      }
    },
    form: {
      //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      handler: function(curval, oldVal) {
        this.curItem = {};
        this.tableDataDetail = [];
      },
      deep: true
    },
  },
  components: {
    dialogBox
  }
};
</script>

<style scoped>
* {
  font-size: 12px;
}
table .el-date-editor.el-input {
  width: 100%;
}
.curImage {
  position: relative;
  top: 5px;
  cursor: pointer;
}
.update-icon {
  position: absolute;
  left: -50px;
  top: 2px;
}
.update2-icon {
  position: absolute;
  left: -150px;
  top: 2px;
}
.el-table th {
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  text-align: left;
  padding: 5px 0;
  text-align: center;
  background-color: #ececec;
}
table .el-input--prefix .el-input__inner {
  border: none;
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
}
table .el-input__icon {
  display: none;
}
/* 表格内编辑下拉框样式重构 */
table .el-input__inner {
  height: 28px;
  text-align: center;
  border: none;
}
.titlle {
  font-size: 16px;
}
label {
  line-height: 28px;
}
.order-query {
  background-color: #00c9c9;
  color: white;
  border: none;
  width: 100px;
  height: 28px;
  margin-bottom: 10px;
  cursor: pointer;
}
.bgcolor {
  width: 100%;
  height: 28px;
}
.el-date-editor {
  width: calc(100% - 94px);
}
.tabrkthList >>> .el-range-input {
  padding: 0px !important;
}
.text-center {
  text-align: center;
}
.tabrkthList {
  background: #eef1f5;
  height: auto;
  width: 100%;
}
.bg-white {
  background: white;
}
.pl20 {
  padding-left: 20px;
}
.pl40 {
  padding-left: 40px;
}
.ml15 {
  margin-left: 15px;
}
.fz12 {
  font-size: 12px;
  margin-right: 10px;
}
.ml10 {
  margin-left: 10px;
}
.mt10 {
  margin-top: 10px;
}
.mt20 {
  margin-top: 20px;
}
.mb10 {
  margin-bottom: 10px;
}
.pt5 {
  padding-top: 5px;
}
.pb5 {
  padding-bottom: 5px;
}
.pt10 {
  padding-top: 10px;
}
.pb10 {
  padding-bottom: 10px;
}
.pr20 {
  padding-right: 20px;
}
.ft12 {
  font-size: 12px;
}
.tr {
  text-align: right;
}
.h30 {
  height: 32px;
  line-height: 30px;
}
.h20 {
  height: 20px;
  line-height: 20px;
}
.input-need {
  border: none;
  outline: none;
  width: 100%;
  height: 23px;
  line-height: 23px;
}
.input-bgw {
  background: white;
  text-align: center;
}
.input-bgp {
  background: #fafafa;
  text-align: center;
}
.bb1 {
  border-bottom: 1px solid #cccccc;
}
.bbt1 {
  border-top: 1px solid #cccccc;
}
.b1 {
  border: 1px solid #cccccc;
}
.fr {
  float: right;
}
.toggle-btn {
  cursor: pointer;
  font-size: 12px;
  float: right;
  margin-right: 20px;
  height: 36px;
  line-height: 36px;
}
input:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.349019607843137);
}

input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.349019607843137);
}
</style>
<style>
.tabrkthList table .el-input__inner {
  border: none !important;
  height: 28px;
  text-align: center;
}
.tabrkthList table .noEdit.is-disabled .el-input__inner {
  color: #606266;
  background: #fff;
}
.tabrkthList .el-select {
  height: 28px;
}
.tabrkthList .el-select__tags {
  height: 28px;
  overflow: hidden;
  white-space: nowrap;
}
.tabrkthList .tabZoo .auditInformation {
  margin-top: 15px;
}
.tabrkthList .getPadding,
.tabZoo .el-tabs__nav-scroll {
  padding: 0 20px;
}
.tabrkthList .bgw .el-input__inner {
  text-align: center;
  border: none;
  background-color: white;
}
.tabrkthList .bgp .el-input__inner {
  text-align: center;
  border: none;
  background-color: #fafafa;
}
.tabrkthList .errorTips {
  margin-bottom: 10px;
}
.tabrkthList .el-input__inner {
  height: 28px !important;
}
.tabrkthList .el-tag {
  margin: 0;
}
.tabrkthList .el-select__tags > span {
  height: 28px;
  line-height: 28px;
}
</style>


