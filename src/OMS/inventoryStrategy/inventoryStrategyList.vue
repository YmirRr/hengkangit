<template>
  <div id="inventoryStrategyList">
    <el-row class="bg">
      <el-col class="marButtom">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
        <div class="search_input_group inline-block-need">
        <div class="search_input_wapper">
          <el-input v-model="SearchStr" placeholder="搜索..." @keyup.native.enter="submitSearch" class="search_input">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="submitSearch"></i>
          </el-input>
        </div>
      </div>
      </el-col>
      <el-col>
        <Table :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
      </el-col>
    </el-row>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse="dialogColse"></dialogBox>
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import Table from "../../base/Table/Table";
import dialogBox from "../../base/dialog/dialog";
import config from "../../../static/config"
export default {
  name: "inventoryStrategyList",
  components: {
    buttonGroup,
    Table,
    dialogBox
  },
  data() {
    return {
      SearchStr:"", //首页模糊查询参数
      httpUrl: {
        // 数据列表渲染用到的参数
        view:'/inventoryStrategy/inventoryStrategyDitail/',
        query:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsInvTacticManagement/GetSearchTacticData`,
        delete:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsInvTacticManagement/Delete`
      },
      multipleSelection: [], // 复选框选中数据
      options: [],
      queryParams: {
        //查询条件
        Search: "", // 模糊查询条件
        SkipCount:
          (this.$store.state.inventoryStrategyListCurrentPage - 1) *
          this.$store.state.inventoryStrategyListEachPage, // 跳过第几行数据
        MaxResultCount: this.$store.state.inventoryStrategyListEachPage
      },
      command: [
        {
          text: "查看",
          class: "blue"
        },
        {
          text: "删除",
          class: "blue"
        }
      ],
      tableModel: "inventoryStrategyList", // 数据列表名称（避免混淆）
      pluginSetting: {
        hasPagination: true, // 包含分页栏
        mutiSelect: true, // 多选栏
        isDisable: true // 是否可编辑
      },
      column: [
        {
          prop: "tacticCode", // 字段名称(后台返回)-平台名称
          label: "代码", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false, // 是否排序
        },{
          prop: "tacticName", // 字段名称(后台返回)-平台名称
          label: "名称", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false, // 是否排序
        },{
          prop: "status", // 字段名称(后台返回)-平台名称
          label: "状态", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false, // 是否排序
        },{
          prop: "remark", // 字段名称(后台返回)-平台名称
          label: "备注", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false, // 是否排序
        }
      ],
      SelectionChange: [],
      addArray: [], //新增集合
      idArray: {
        ids: []
      },
      enableEdit: false,
      tableData: [],
      updateArray: [], //修改行集合
      defaultProps: {
        children: "children",
        label: "dictName",
        id: "id"
      },
      dialogCommand: [], //底部按钮组控制组
      dialogVisible: false,
      isUpdate: false, //是否进行修改
      isAdd: false, //是否新增
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogSetting: {
        //对话框提示信息
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      restaurants: [],
      state1: "",
      buttonGroup: [
        //按钮组设置
        {
          text: "新增",
          class: "bt_add",
          icon: "icon-xinzeng",
          disabled: false
        },
        {
          text: "删除",
          class: "bt_del",
          icon: "icon-shanchu",
          disabled: false
        },
        {
          text: "作废",
          class: "bt_end",
          icon: "icon-tingyong",
          disabled: false
        },
        {
          text: "审核",
          class: "bt_print",
          icon: "icon-shenhe",
          disabled: false
        }
      ]
    };
  },
  created() {
    let _this = this;
    $(document).on("click", ".pageActive .el-pager>li", function() {
      if (_this.turnPage == false) {
        $(this).css("background", "#f4f4f5");
      }
    });
  },
  mounted: function() {
    let content1 = document.getElementById("inventoryStrategyList"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1.style.minHeight = height1 + "px";
    content1.style.background = "#ffffff";
  },
  methods: {
    submitSearch(){
      let _this = this;
      _this.queryParams.Search = _this.SearchStr;
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsInvTacticManagement/GetSearchTacticData`,
          _this.queryParams
        )
        .then(function(res) {
          _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
          let TOTAL_PAGE = Math.ceil(
            res.result.totalCount /
              _this.$store.state.electronicSurfaceInterfaceListEachPage
          ); // 计算表格总页数
          _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
          _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
          _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
        });
    },
    btnClick(data) {
      //按钮组件的点击事件
      switch (data) {
        case "新增":
          this.goList()
          break;
        case "删除":
          this.delBatch();
          break;
        case "作废":
          this.cancellation()
          break;
        case "审核":
          this.audit()
          break;
        default:
          break;
      }
    },
    audit(){ //审核

    },
    cancellation(){ //作废

    },
    goList() {
      this.$store.state.url = "/inventoryStrategy/inventoryStrategyDitail/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    search() {
      let _this = this;
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/GetSearchData`,
          _this.queryParams
        )
        .then(function(res) {
          _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
          _this.$store.commit("get_RowId", ""); // 置空修改行id
          let TOTAL_PAGE = Math.ceil(
            res.result.totalCount /
              _this.$store.state.inventoryStrategyListEachPage
          ); // 计算表格总页数
          _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
          _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
          _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
        });
    },
    dialogClick(parmas) {
      if (parmas.dialogButton == "确定") {
        if (parmas.dialogName == "delDialog") {
          //删除对话框
          this.SelectionChange = this.$store.state[
            this.tableModel + "Selection"
          ];
          for (var i in this.SelectionChange) {
            this.idArray.ids.push(this.SelectionChange[i].id);
          }
          let _this = this;
          if (_this.idArray.ids.indexOf(undefined) != -1) {
            _this.$message({
              type: "warning",
              message: "新增数据请在行内删除"
            });
            _this.dialogVisible = false;
            this.idArray.ids = [];
            return;
          }
          if (_this.idArray.ids.length > 0) {
            console.log("删除", _this.idArray.ids);
            let arry = _this.idArray.ids;
            _this.$axios
              .posts(
                `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsInvTacticManagement/BatchDelete`,
                { ids:arry }
              )
              .then(function(res) {
                _this.$store.dispatch("InitTable");
                _this.$store.commit("setTableSelection", []);
                _this.idArray.ids = [];
                _this.dialogVisible = false;
                _this.open("删除成功", "el-icon-circle-check", "successERP");
              });
          }
        } else if (parmas.dialogName == "saveDialog") {
          //保存提交对话框
          this.dialogVisible = false;
        } else if (parmas.dialogName == "cancelDialog") {
          //取消对话框
          this.dialogVisible = false; //关闭对话框
          this.$store.dispatch("InitTable");
          this.$store.commit("setAddColArray", []); //置空新增集合
          this.$store.commit("setUpdateColArray", []); //置空修改增集合
        }
      } else if (parmas.dialogButton == "取消") {
        if (parmas.dialogName == "delDialog") {
          //多选删除取消操作
          this.$store.commit("setTableSelection", []); //置空多选
        }
        this.dialogVisible = false;
      }
    },
    delBatch() {
      //批量删除
      this.SelectionChange = this.$store.state[this.tableModel + "Selection"];
      if (this.SelectionChange.length == 0) {
        this.$message({
          type: "info",
          message: "请勾选需要更改删除的记录！"
        });
      } else {
        this.dialogSetting.dialogName = "delDialog";
        this.dialogSetting.message = "确定删除？";
        this.dialogSetting.dialogType = "confirm";
        this.dialogCommand = [
          { text: "确定", class: "btn-confirm" },
          { text: "取消", class: "btn-cancel" }
        ];
        this.dialogVisible = true;
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
    SPLICE_SPACE(STRING) {
      return String(STRING).replace(/(^\s*)|(\s*$)/g, "");
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
.bg-white {
  background: white;
  border-radius: 3px;
}
.marButtom {
  margin-bottom: 10px;
}
.bg {
  background: white;
}
.input-need {
  outline: none;
  border: none;
  width: 100%;
  height: 28px;
  text-align: center;
}
.h48 {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e4e4e4;
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
.border-left {
  border-left: 1px solid #e4e4e4;
}
.fs12 {
  font-size: 12px;
}
.search-btn {
  display: inline-block;
  width: 87px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  background: #4a6997;
  color: white;
  cursor: pointer;
}
.open {
  display: inline-block;
  width: 49px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #cccccc;
  color: #cccccc;
  text-align: center;
  cursor: pointer;
}
.update-icon {
  position: absolute;
  left: -55px;
  top: 0px;
}
.Highlight {
  background: #4a6997;
}
.border-left.rightBox {
  width: calc(100% - 290px);
}
.border-left.newRight {
  width: 100%;
}
.search_input_group{
  margin-top: 5px;
}
</style>

