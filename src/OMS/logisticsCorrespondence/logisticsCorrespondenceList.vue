<template>
  <div class="logisticsCorrespondenceList commodity member-list">
    <el-row class="bg-white">
      <el-col :span="5" class="max-height left-box">
        <el-col :span='24' class="tree-container menulist-tree">
            <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
        </el-col>
      </el-col>
      <el-col class="border-left min-height" :span="19">
        <el-col class="marButtom">
          <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
        </el-col>
        <el-col>
          <Table :ifSave="isSave" :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
        </el-col>
      </el-col>
    </el-row>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse="dialogColse"></dialogBox>
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import Table from "../../base/Table/Table";
import dialogBox from "../../base/dialog/dialog";
import Tree from "../../base/tree/tree";
import config from "../../../static/config"
export default {
  name: "logisticsCorrespondenceList",
  components: {
    buttonGroup,
    Table,
    dialogBox,
    Tree
  },
  data() {
    return {
      treeParams: {
        treeName: "logisticsCorrespondenceList", //树节点名称
        treeApi: `${config.base.ip}:${config.base.basicPort}/api/services/app/ContactManagement/GetSupplierTree?input=1` //接口地址
      },
      defaultProps: {
        //tree渲染参数
        children: "childNodes",
        label: "contactName",
        id: "id"
      },
      treeEntrySearch: true, //是否包含树节点输入过滤功能
      treeSuggestSearch: false, //是否包含树节点建议过滤功能
      httpUrl: {
        // 数据列表渲染用到的参数
        query:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/GetSearchData`,
        delete:
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/Delete`
      },
      cancelClick: false, // 是否点击取消按钮
      multipleSelection: [], // 复选框选中数据
      options: [],
      updateId: "",
      queryParams: {
        //查询条件
        logisticsId: "", // 物流公司ID (客户/供应商ID)
        Sorting: "id",
        SkipCount:
          (this.$store.state.logisticsCorrespondenceListCurrentPage - 1) *
          this.$store.state.logisticsCorrespondenceListEachPage, // 跳过第几行数据
        MaxResultCount: this.$store.state.logisticsCorrespondenceListEachPage
      },
      command: [
        {
          // 表示是否需要操作，比如“查看”和删除
          text: "删除",
          class: "blue"
        }
      ],
      tableModel: "logisticsCorrespondenceList", // 数据列表名称（避免混淆）
      pluginSetting: {
        hasPagination: true, // 包含分页栏
        mutiSelect: true, // 多选栏
        isDisable: false // 是否可编辑
      },
      isSave: false, //此参数用户判断用户是否执行保存操作，作为是否进行表格验证的依据
      column: [
        {
          flag: true, //更改标识
          prop: "platformId", // 字段名称(后台返回)-平台名称
          label: "平台", // 表头名称
          required: true,
          controls: "classMapSelect", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: false, // 是否可编辑
          sortable: false, // 是否排序
          dataSource: [],
          optionsKey: {
            label: "itemName",
            value: "itemValue"
          }
        },
        {
          prop: "weblogisticsCode", // 字段名称(后台返回)-平台ID
          label: "平台物流公司", // 表头名称
          required: true,
          controls: "classMapSelect", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: false, // 是否可编辑
          sortable: false, // 是否排序
          dataSource: [],
          optionsKey: {
            label: "itemName",
            value: "itemCode"
          }
        },
        {
          prop: "eorderEnabled", // 字段名称(后台返回)-平台ID
          label: "启用接口取面单", // 表头名称
          controls: "checkbox", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: false, // 是否可编辑
          sortable: false // 是否排序
          // isFix:'', // 是否为固定列,此参数为可选参数
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
          text: "增行",
          class: "bt-increment",
          icon: "icon-zenghang",
          disabled: false
        },
        {
          text: "删行",
          class: "bt_erase",
          icon: "icon-shanhang",
          disabled: false
        },
        {
          text: "保存",
          class: "bt_save",
          icon: "icon-baocun",
          disabled: true
        },
        {
          text: "取消",
          class: "bt_cancel",
          icon: "icon-quxiao",
          disabled: true
        },
        {
          text: "打印",
          class: "bt_print",
          icon: "icon-print",
          disabled: false
        },
        {
          text: "导出",
          class: "bt_out",
          icon: "icon-daochu",
          disabled: false
        }
      ]
    };
  },
  computed: {
    newColArray() {
      //新增数据集合
      if (!this.enableEdit) {
        return this.$store.state[this.tableModel + "NewColArray"];
      } else {
        return [];
      }
    },
    isCancel() {
      if (
        this.$store.state[this.tableModel + "NewColArray"].length > 0 ||
        this.$store.state[this.tableModel + "UpdateColArray"].length > 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    state1() {
      console.log(this.state1);
      this.queryParams.logisticsId = this.state1;
      this.search();
    },
    isUpdate: function(val, oldVal) {
      if (val == true) {
        this.turnPage = $(document)
          .find(".pageActive.is-background .el-pager li.active")
          .html();
      }
    },
    isCancel: function(val, oldVal) {
      //监听是否修改或新增数据
      if (!val) {
        this.buttonGroup[3].disabled = false;
        this.buttonGroup[2].disabled = false;
      } else {
        this.buttonGroup[3].disabled = true;
        this.buttonGroup[2].disabled = true;
      }
    }
  },
  created() {
    let _this = this;
    $(document).on("click", ".pageActive .el-pager>li", function() {
      if (_this.turnPage == false) {
        //$(this).html("12");
        $(this).css("background", "#f4f4f5");
      }
    });
    _this.InitStatus(); //初始化状态枚举表
  },
  mounted: function() {
    // let content1 = document.getElementById("logisticsCorrespondenceList"); //设置高度为全屏
    // let height1 = window.innerHeight - 123;
    // content1.style.minHeight = height1 + "px";
    // content1.style.background = "#ffffff";
  },
  methods: {
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    InitStatus() {
      //获取状态枚举表
      let _this = this;
      _this.$axios // 平台信息
        .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItemTreeByDictName`, {
          dictCode: "OMS_Platform"
        })
        .then(function(res) {
          console.log("平台信息：", res[0].childNodes);
          _this.column[0].dataSource = res[0].childNodes;
        });

      _this.$axios // 平台物流公司
        .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItem`, {
          dictName: "OMS_LogisticsPlatform"
        })
        .then(function(res) {
          console.log("平台物流公司：", res.result);
          _this.column[1].dataSource = res.result;
        });
    },
    goAdd() {
      console.log("增加");
    },
    rowClick(row) {
      //获取行id
      this.updateId = row.id;
    },
    confirm() {
      // 多项删除
      let _this = this;
      _this.choseAjax = "rows";
      if (_this.multipleSelection.length > 0) {
        _this.dialogUserConfirm = true;
      }
    },
    del(parm) {
      console.log(parm);
    },
    btnClick(data) {
      //按钮组件的点击事件
      switch (data) {
        case "增行":
          this.addCol();
          break;
        case "删行":
          this.delBatch();
          break;
        case "取消":
          this.cancel();
          break;
        case "保存":
          this.save();
          break;
        case "打印":
          alert("打印");
          break;
        case "导出":
          this.handleDownload();
          break;
          alert(data);
        default:
          break;
      }
    },
    handleDownload() {
      // 导出功能
      let _this = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../common/excel/Export2Excel.js");
        const tHeader = ["平台", "平台物流名称", "是否启用接口"];
        const filterVal = ["platformName", "weblogisticsCode", "eorderEnabled"];
        const list = _this.$store.state[_this.tableModel + "Table"];
        const data = _this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "物流列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    addCol() {
      // 新增行
      let NEW_COL = {
        //定义新增数据模型
        groupId: 0, // 集团ID
        logisticsId: parseInt(this.queryParams.logisticsId), // 物流供应商ID
        logisticsName: "", // 物流公司名称
        platformName: "", //  平台名称
        platformId: "", // 所属平台ID
        weblogisticsName: "", // 线上物流公司名称
        weblogisticsCode: "", // 线上平台物流公司编码
        eorderEnabled: false // 是否启用启用接口取面单
      };
      let NEW_ARRAY_LENGTH = this.$store.state[this.tableModel + "NewColArray"]
        .length; // 获取新增项length
      if (NEW_ARRAY_LENGTH > 2) {
        this.$message({
          type: "info",
          message: "请先编辑保存新增项"
        });
      } else {
        this.isSave = false;
        this.$store.dispatch("addCol", NEW_COL); //表格行内新增
      }
    },
    /**
     * 根据搜索条件查询列表数据
     * @param_this.queryParams
     * @authoryuhuan 2018/03/30
     */
    async search() {
      let _this = this;
      _this.$store.commit("tableLoad_Complete", true);
      await _this.$axios
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/GetSearchData`,
          _this.queryParams
        )
        .then(function(res) {
          _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
          _this.$store.commit("get_RowId", ""); // 置空修改行id
          let TOTAL_PAGE = Math.ceil(
            res.result.totalCount /
              _this.$store.state.logisticsCorrespondenceListEachPage
          ); // 计算表格总页数
          _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
          _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
          _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
        });
      _this.$store.commit("tableLoad_Complete", false);
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
            let deleteList = [];
            for (let i = 0; i < arry.length; i++) {
              deleteList.push({ id: arry[i] });
            }
            _this.$axios
              .posts(
                `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/CUDAggregate`,
                { deleteList }
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
          this.isSave = false;
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
          message: "请勾选需要更改删除的数据！"
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
    async save() {
      // 保存

      let _this = this;
      let newArray = _this.$store.state[_this.tableModel + "NewColArray"];
      let newArrayLength =
        _this.$store.state[_this.tableModel + "NewColArray"].length;
      let updateArray = _this.$store.state[_this.tableModel + "UpdateColArray"];
      let updateArrayLength =
        _this.$store.state[_this.tableModel + "UpdateColArray"].length;
      let tableData = _this.$store.state[_this.tableModel + "Table"];
      console.log(newArrayLength);
      if (newArrayLength > 0) {
        //新增保存
        _this.isSave = true;
        for (let i in newArray) {
          if (
            _this.SPLICE_SPACE(newArray[i].platformId) == "" ||
            _this.SPLICE_SPACE(newArray[i].weblogisticsCode) == ""
          ) {
            this.$message({
              message: "信息填写不完整！",
              type: "error"
            });
            return;
          }
        }
      }
      if (newArrayLength > 0 || updateArrayLength > 0) {
        for (let i = 0; i < newArrayLength.length; i++) {
          newArrayLength[i].weblogisticsCode = Number(
            newArrayLength[i].weblogisticsCode
          );
        }
        for (let i = 0; i < updateArrayLength.length; i++) {
          updateArrayLength[i].weblogisticsCode = Number(
            updateArrayLength[i].weblogisticsCode
          );
        }
        _this.$store.commit("tableLoad_Complete", true);
        await _this.$axios
          .posts(
            `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsLogisticsMappingManagement/CUDAggregate`,
            {
              createList: newArray,
              updateList: updateArray
            }
          )
          .then(function(res) {
            _this.$store.commit("setAddColArray", []); //置空新增集合
            _this.$store.commit("get_RowId", ""); //置空修改行id
            _this.$store.commit("setUpdateColArray", []); //置空修改集合
            _this.$store.dispatch("InitTable");
            _this.isSave = false;
            _this.open("信息修改成功", "el-icon-circle-check", "successERP");
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
        _this.$store.commit("tableLoad_Complete", false);
      }
    },
    cancel() {
      //数据恢复到初始化状态 取消
      this.dialogSetting.dialogName = "cancelDialog";
      this.dialogSetting.message = "此操作将忽略您的更改，是否继续？";
      this.dialogSetting.dialogType = "confirm";
      this.dialogCommand = [
        { text: "确定", class: "btn-confirm" },
        { text: "取消", class: "btn-cancel" }
      ];
      this.dialogVisible = true;
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    TreeNodeClick(data) {
      //树节点点击回调
      let _this = this;
      _this.tableLoading = true;
      this.queryParams.logisticsId = data.id;
      this.search();
    }
  }
};
</script>
<style scoped>
.border-left {
    width: calc(100% - 290px);
    border-left: 1px solid #E4E4E4;
}
.tree-container {
  height: 450px;
}
.tree-container > div {
  height: 100%;
}
.search_input {
  width: auto;
}
.bg-white {
  background: white;
  border-radius: 3px;
}
.el-tree {
  margin-top: 10px;
  padding: 0 5px;
}
.left-box {
  background: #ffffff;
}
.marButtom {
  padding-bottom: 6px;
  border-bottom: 1px solid #E4E4E4;
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
</style>
<style>
.menu-list .el-button+.el-button{
    margin-left: 0;
}
.menu-list .el-dialog__footer{
    padding:0;
}
.menu-list .areaDialog .bgcolor:first-child{
    margin-top:15px;
}
.menu-list .border-left{
   width: calc(100% - 290px);
   border-left:1px solid #E4E4E4;
}
.menulist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.menulist-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 4px 15px 8px;
}
.menulist-tree .el-input__prefix{
    left: 20px;
}
</style>



