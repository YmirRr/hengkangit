<template>
  <el-row class="listBox">
    <el-row type="flex" justify="space-between" class="bgGray">
      <div>
        <div class="fl">波次号：
          <span class="waveCode_bg">{{listData ? listData.result.billCode : ""}}</span>
        </div>
        <div class="fl">波次状态：
          <span class="status_bg">{{listData ? (listData.result.status == 0 ? '停用' : '启用'): ""}}</span>
        </div>
      </div>
      <div>
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
      </div>
    </el-row>
    <el-col class="contentBox">
      <el-col>
        <el-col :span="8" class="scroTableBox_a">
          <div class="pd-10">爆款工单(主表)</div>
          <ScrollTable :scrollBasicSetting='scrollBasicSetting_Bursting' :mutilSeletions='mutilSeletions_Bursting' :scrollTableData="scrollTableData_Bursting" @handlerSelect="handlerSelect" @scrollLoadMore="scrollLoadMore('Bursting')" @handleSelectionChange="handleSelectionChange_Bursting"></ScrollTable>
        </el-col>
        <el-col :span="8" class="scroTableBox_b">
          <div class="pd-10">单件工单(主表)</div>
          <!-- <ScrollTable :scrollBasicSetting='scrollBasicSetting_only' :mutilSeletions='mutilSeletions_only' :scrollTableData="scrollTableData_only"  @handlerSelect="handlerSelect"  @scrollLoadMore="scrollLoadMore('only')" @handleSelectionChange="handleSelectionChange_only"></ScrollTable> -->
          <ScrollTable :scrollBasicSetting='scrollBasicSetting_Bursting' :mutilSeletions='mutilSeletions_only' :scrollTableData="scrollTableData_Bursting" @handlerSelect="handlerSelect" @scrollLoadMore="scrollLoadMore('Bursting')" @handleSelectionChange="handleSelectionChange_only"></ScrollTable>

        </el-col>
        <el-col :span="8" class="scroTableBox_c">
          <div class="pd-10">多件工单(主表)</div>
          <!-- <ScrollTable :scrollBasicSetting='scrollBasicSetting_double' :mutilSeletions='mutilSeletions_double' :scrollTableData="scrollTableData_double"  @handlerSelect="handlerSelect"  @scrollLoadMore="scrollLoadMore('double')" @handleSelectionChange="handleSelectionChange_double"></ScrollTable> -->
          <ScrollTable :scrollBasicSetting='scrollBasicSetting_Bursting' :mutilSeletions='mutilSeletions_double' :scrollTableData="scrollTableData_Bursting" @handlerSelect="handlerSelect" @scrollLoadMore="scrollLoadMore('Bursting')" @handleSelectionChange="handleSelectionChange_double"></ScrollTable>

        </el-col>
      </el-col>
      <el-col class="tableBox">
        <div class="pd-10">工单明细表（从表）</div>
        <el-table stripe border height="300" :data="tableData" style="width: 100%">
          <el-table-column prop="dnCode" label="工单号">
          </el-table-column>
          <el-table-column prop="soCode" label="订单号">
          </el-table-column>
          <el-table-column prop="sowingCode" label="播种号">
          </el-table-column>
          <el-table-column prop="skuCode" label="商品编码">
          </el-table-column>
          <el-table-column prop="formatName" label="规格">
          </el-table-column>
          <el-table-column prop="barCode" label="条码">
          </el-table-column>
          <el-table-column prop="qty" label="数量">
          </el-table-column>
          <el-table-column prop="address" label="拣货诸位">
          </el-table-column>
        </el-table>
      </el-col>
    </el-col>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse="dialogColse"></dialogBox>
  </el-row>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import Table from "../../base/Table/Table";
import dialogBox from "../../base/dialog/dialog";
import ScrollTable from "../../base/scrollTable/scrollTable";
import { Alert } from "element-ui";
import axios from "axios";
import config from "../../../static/config";
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {
      mutilSeletions_Bursting: {
        key: "id",
        array: []
      },
      mutilSeletions_only: {
        key: "id",
        array: []
      },
      mutilSeletions_double: {
        key: "id",
        array: []
      },
      tableData: [], // 从表表单数据
      dataArr: {
        // 从表获取数据ID存放
        Bursting: [],
        only: [],
        double: []
      },
      dialogSetting: {
        //对话框提示信息
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogVisible: false, //此参数用户控制对话框是否可见
      dialogCommand: [], //底部按钮组控制组
      // 可滚动加载组件_Bursting
      scrollBasicSetting_Bursting: {
        tableName: "Bursting", //ref名称
        mutiSelect: true,
        scrollTableCurrentPage_Bursting: 1,
        scrollTableDataTotalCount_Bursting: 0,
        tableCols: [
          {
            //表格列名
            prop: "billCode",
            label: "工单号",
            sortable: false
          },
          {
            prop: "brandName",
            label: "条码",
            sortable: false
          },
          {
            prop: "soCount",
            label: "订单数量",
            sortable: false
          },
          {
            prop: "qty",
            label: "货品数量",
            sortable: false
          }
        ],
        scrollLoading: false, //是否显示加载动画
        totalCount: 0, //默认值0,数据的总条数
        currentPage: 1 //默认值 1，当前页码
      },
      scrollTableRender_Bursting: {
        HttpParams: {
          WaveId: "", // 波次ID
          SkipCount: 0,
          MaxResultCount: 10
        },
        httpUrl:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetBurstingOrder`
      },
      scrollTableData_Bursting: [],

      // 可滚动加载组件_only
      scrollBasicSetting_only: {
        tableName: "only", //ref名称
        mutiSelect: true,
        scrollTableCurrentPage_only: 1,
        scrollTableDataTotalCount_only: 0,
        tableCols: [
          {
            //表格列名
            prop: "billCode",
            label: "工单号",
            sortable: false
          },
          {
            prop: "soCount",
            label: "订单数量",
            sortable: false
          },
          {
            prop: "qty",
            label: "货品数量",
            sortable: false
          }
        ],
        scrollLoading: false, //是否显示加载动画
        totalCount: 0, //默认值0,数据的总条数
        currentPage: 1 //默认值 1，当前页码
      },
      scrollTableRender_only: {
        HttpParams: {
          WaveId: "", // 波次ID
          SkipCount: 0,
          MaxResultCount: 10
        },
        httpUrl:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetOnlyOrder`
      },
      scrollTableData_only: [],

      // 可滚动加载组件_double
      scrollBasicSetting_double: {
        tableName: "double", //ref名称
        mutiSelect: true,
        scrollTableCurrentPage_double: 1,
        scrollTableDataTotalCount_double: 0,
        tableCols: [
          {
            //表格列名
            prop: "billCode",
            label: "工单号",
            sortable: false
          },
          {
            prop: "soCount",
            label: "订单数量",
            sortable: false
          },
          {
            prop: "qty",
            label: "货品数量",
            sortable: false
          }
        ],
        scrollLoading: false, //是否显示加载动画
        totalCount: 0, //默认值0,数据的总条数
        currentPage: 1 //默认值 1，当前页码
      },
      scrollTableRender_double: {
        HttpParams: {
          WaveId: "", // 波次ID
          SkipCount: 0,
          MaxResultCount: 10
        },
        httpUrl:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetDoubleOrder`
      },
      scrollTableData_double: [],

      buttonGroup: [
        //按钮组设置
        {
          text: "确认工单",
          class: "bt_add",
          // icon: "icon-baocunxinzeng",
          disabled: false
        },
        {
          text: "预览",
          class: "bt_del",
          // icon: "icon-shenhe",
          disabled: true
        },
        {
          text: "打印",
          class: "bt_print",
          // icon: "icon-print",
          disabled: true
        },
        {
          text: "取消",
          class: "bt_out",
          // icon: "icon-quxiao",
          disabled: false
        }
      ]
    };
  },
  created() {
    this.getData(16); //测试用
  },
  watch: {
    listData: function(param) {
      if (this.listData) {
        this.getData(this.listData.result.id); //波次ID
      }
    }
  },
  methods: {
    handleSelectionChange_Bursting(val) {
      let arr = [];
      val.forEach(row => {
        arr.push(row.id);
      });
      this.dataArr.Bursting = arr;
      this.search();
    },
    handleSelectionChange_only(val) {
      let arr = [];
      val.forEach(row => {
        arr.push(row.id);
      });
      this.dataArr.only = arr;
      this.search();
    },
    handleSelectionChange_double(val) {
      let arr = [];
      val.forEach(row => {
        arr.push(row.id);
      });
      this.dataArr.double = arr;
      this.search();
    },
    handlerSelect(parm) {
      // this.mutilSeletions_only.array = parm;
      // this.mutilSeletions_double.array = parm;
      // this.mutilSeletions_Bursting.array = parm;
    },
    search(parm) {
      // 获取从表数据
      let _this = this;
      let arr = [
        ...new Set([
          ..._this.dataArr.Bursting,
          ..._this.dataArr.only,
          ..._this.dataArr.double
        ])
      ];
      let data = [];
      if(arr.length == 0){
        _this.tableData = []
        return;
      }
      axios
        .get(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetOmsDnRelationData`,
          {
            params: {
              WoId: arr,
              SkipCount: 0,
              MaxResultCount: 999
            },
            paramsSerializer: function(params) {
              const yourNewParams = params.WoId.map(_ => `WoId=${_}`).join("&");
              return `${yourNewParams}&SkipCount=0&MaxResultCount=999`;
            }
          }
        )
        .then(function(response) {
          _this.tableData = response.data.result.items;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    dialogClick(parmas) {
      let _this = this;
      if (parmas.dialogButton == "确定") {
        if (parmas.dialogName == "delDialog") {
          _this.buttonGroup[1].disabled = true;
          _this.buttonGroup[2].disabled = true;
          _this.$axios //获取爆款工单列表数据
            .posts(
              `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/CancelWoOrder`,
              {
                waveId: _this.listData.result.id
              }
            )
            .then(function(res) {
              _this.open("取消工单成功", "el-icon-circle-check", "successERP");
              this.dialogVisible = false;
              _this.$emit("changeTab", ["build", _this.listData]);
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
        }
      } else if (parmas.dialogButton == "取消") {
        this.dialogVisible = false;
      }
    },
    open(tittle, iconClass, className) {
      //提示框
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: className
      });
    },
    btnClick(data) {
      let _this = this;
      if (data == "确认工单") {
        _this.buttonGroup[1].disabled = false;
        _this.buttonGroup[2].disabled = false;
        _this.$emit("changeTab", ["build", _this.listData]);
        // 若是点击了取消，再次点击确认？？？？？
        _this.open("确认工单成功", "el-icon-circle-check", "successERP");
      } else if (data == "取消") {
        this.dialogSetting.dialogName = "delDialog";
        this.dialogSetting.message = "确定取消？";
        this.dialogSetting.dialogType = "confirm";
        this.dialogCommand = [
          { text: "确定", class: "btn-confirm" },
          { text: "取消", class: "btn-cancel" }
        ];
        this.dialogVisible = true;
      }
    },
    // 初始化数据
    getData(parm) {
      let _this = this;
      _this.$axios //获取爆款工单列表数据
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetBurstingOrder`,
          {
            SkipCount: 0,
            MaxResultCount: 10,
            WaveId: parm // 波次ID
          }
        )
        .then(function(res) {
          console.log("获取爆款工单列表数据", res);
          _this.scrollTableData_Bursting = res.result.items;
          _this.scrollBasicSetting_Bursting.totalCount = res.result.totalCount;
          _this.scrollBasicSetting_Bursting.scrollLoading = false;
        });
      _this.$axios //获取单件工单列表数据
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetOnlyOrder`,
          {
            SkipCount: 0,
            MaxResultCount: 10,
            WaveId: parm // 波次ID
          }
        )
        .then(function(res) {
          console.log("获取单件工单列表数据", res);
          _this.scrollTableData_only = res.result.items;
          _this.scrollTableData_only.totalCount = res.result.totalCount;
          _this.scrollBasicSetting_only.scrollLoading = false;
        });
      _this.$axios //获取爆款工单列表数据
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetDoubleOrder`,
          {
            SkipCount: 0,
            MaxResultCount: 10,
            WaveId: parm // 波次ID
          }
        )
        .then(function(res) {
          console.log("获取多件工单列表数据", res);
          _this.scrollTableData_double = res.result.items;
          _this.scrollTableData_double.totalCount = res.result.totalCount;
          _this.scrollBasicSetting_double.scrollLoading = false;
        });
    },
    scrollLoadMore(tableName) {
      //滚动加载
      let Setting = "";
      let Render = "";
      let Tabledata = "";
      if (tableName == "Bursting") {
        Setting = "scrollBasicSetting_Bursting";
        Render = "scrollTableRender_Bursting";
        Tabledata = "scrollTableData_Bursting";
        this.loadMoreSetting(Setting, Render, Tabledata);
      } else if (tableName == "only") {
        Setting = "scrollBasicSetting_only";
        Render = "scrollTableRender_only";
        Tabledata = "scrollTableData_only";
        this.loadMoreSetting(Setting, Render, Tabledata);
      } else if (tableName == "double") {
        Setting = "scrollBasicSetting_double";
        Render = "scrollTableRender_double";
        Tabledata = "scrollTableData_double";
        this.loadMoreSetting(Setting, Render, Tabledata);
      }
    },
    loadMoreSetting(Setting, Render, Tabledata) {
      this[Setting].scrollLoading = true;
      let eachPage = 10;
      this[Setting].currentPage++;
      this[Render].HttpParams.SkipCount = 0;
      this[Render].HttpParams.MaxResultCount =
        eachPage * this[Setting].currentPage;
      if (
        this[Render].HttpParams.MaxResultCount > this[Setting].totalCount &&
        this[Setting].totalCount < eachPage * (this[Setting].currentPage - 1)
      ) {
        this[Setting].scrollLoading = false;
        this.$message({
          message: "没有更多的数据了！",
          type: "success"
        });
      } else {
        let _this = this;
        _this.$axios
          .gets(this[Render].httpUrl, _this[Render].HttpParams)
          .then(function(res) {
            _this[Tabledata] = res.result.items;
            _this[Setting].totalCount = res.result.totalCount;
            _this[Setting].scrollLoading = false;
          });
      }
    }
  },
  components: {
    buttonGroup,
    Table,
    dialogBox,
    ScrollTable
  }
};
</script>
<style scoped>
.waveCode_bg {
  color: #999999;
  font-family: "microsoft yahei";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
.status_bg {
  color: #f55e6e;
  font-family: "microsoft yahei";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
.pt5 {
  float: right;
  /* padding-top: 12px; */
}
.fl {
  float: left;
  margin-right: 10px;
  line-height: 40px;
}
.scroTableBox_a {
  padding-right: 10px;
}
.scroTableBox_b {
  padding: 0 5px;
}
.scroTableBox_c {
  padding-left: 10px;
}
.bgGray {
  padding: 5px 20px 10px;
  box-sizing: border-box;
  background: #eef1f5;
}
.contentBox {
  padding: 0 20px;
  box-sizing: border-box;
}
.tableBox {
  border-top: 1px solid rgba(228, 228, 228, 1);
  margin-top: 20px;
}
.height-48 {
  line-height: 48px;
}
.pd-10 {
  padding: 10px 0px;
}
</style>

