<template>
  <div class="orderDownloadList commodity member-list">
    <el-row class="bg-white">
      <el-col :span="5" class="tree-box max-height">
        <el-col :span='24' class="tree-container menulist-tree">
          <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
        </el-col>
      </el-col>
      <el-col :span='19' class="border-left min-height">
        <el-col class="h48">
          <el-col :span="24">
            <div class="btnGroup-box">
              <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
            </div>
          </el-col>
        </el-col>
        <el-col>
          <el-tabs v-model="activeName" class="tabZoo">
            <el-tab-pane label="转单" name="transferOfOrder" class="getPadding">
              <el-row>
                <el-col>
                  <el-form label-position="left" label-width="70px" :inline="true" :model="queryParams">
                    <el-form-item label="业务组织">
                      <el-select v-model="queryParams.ouId" placeholder="业务组织">
                        <el-input placeholder="搜索..." class="selectSearch" v-model="ouSearch"></el-input>
                        <el-tree :data="ouAr" :props="selectOuProps" node-key="id" ref="outree" highlight-current :default-expanded-keys="ouExpandId" :render-content="renderContentOu" :filter-node-method="filterNode" :expand-on-click-node="false" @node-click="ouNodeClick">
                        </el-tree>
                        <el-option v-show="false" v-for="item in ouSelectAr" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="店铺">
                      <el-select clearable filterable v-model="queryParams.ShopId" placeholder="店铺">
                        <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
                          <span style="float: left">{{ item.shopCode }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="平台">
                      <el-select clearable v-model="queryParams.PlatformId" placeholder="平台">
                        <el-option v-for="item in PlatformList" :key="item.id" :label="item.itemName" :value="item.itemValue">
                          <span style="float: left">{{ item.itemCode }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.itemName}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="交易号">
                      <el-input v-model="queryParams.TransCode" placeholder="交易号"></el-input>
                    </el-form-item>
                    <el-form-item label="买家昵称">
                      <el-input v-model="queryParams.BuyerNick" placeholder="买家昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="交易状态">
                      <el-select clearable filterable v-model="queryParams.TransStatus" placeholder="交易状态">
                        <el-option v-for="item in TransStatus" :key="item.itemValue" :label="item.itemName" :value="item.itemValue"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="下单时间">
                      <el-date-picker v-model="time" size="mini" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="order-query" @click="search">查询</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col>
                  <Table v-if="activeName == 'transferOfOrder'" @tableFunction="tableFunction" :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel"></Table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="待下载" name="toDownload" class="getPadding">
              <el-row>
                <el-form label-position="left" label-width="70px" :inline="true" :model="queryParams">
                  <el-form-item label="业务组织">
                    <el-select clearable v-model="queryParams.ouId" placeholder="业务组织">
                      <el-input placeholder="搜索..." class="selectSearch" v-model="ouSearch"></el-input>
                      <el-tree :data="ouAr" :props="selectOuProps" node-key="id" ref="outree" highlight-current :default-expanded-keys="ouExpandId" :render-content="renderContentOu" :filter-node-method="filterNode" :expand-on-click-node="false" @node-click="ouNodeClick">
                      </el-tree>
                      <el-option v-show="false" v-for="item in ouSelectAr" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="店铺">
                    <el-select clearable filterable v-model="queryParams.ShopId" placeholder="店铺">
                      <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
                        <span style="float: left">{{ item.shopCode }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="平台">
                    <el-select clearable v-model="queryParams.PlatformId" placeholder="平台">
                      <el-option v-for="item in PlatformList" :key="item.id" :label="item.itemName" :value="item.itemValue">
                        <span style="float: left">{{ item.itemCode }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.itemName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="交易号">
                    <el-input v-model="queryParams.TransCode" placeholder="交易号"></el-input>
                  </el-form-item>
                  <el-form-item label="买家昵称">
                    <el-input v-model="queryParams.BuyerNick" placeholder="买家昵称"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="order-query" @click="search">查询</el-button>
                  </el-form-item>
                </el-form>
                <Table v-if="activeName == 'toDownload'" @tableFunction="tableFunction" :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel"></Table>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>
    </el-row>
    <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
</template>
<script>
import Tree from "../../base/tree/tree";
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import Table from "../../base/Table/Table";
import dialogBox from "../../base/dialog/dialog";
import config from "../../../static/config";
export default {
  name: "orderDownloadList",
  created() {
    let _this = this;
    // api 获取上级业务单元的列表
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/OuManagement/GetOuParentList`)
      .then(function(res) {
        console.log(res);
        _this.ouSelectAr = res.result;
      });
    // api 获取完整树状数据
    _this.$axios.gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/OuManagement/GetAllTree`).then(
      function(res) {
        _this.ouAr = res;
        _this.expandId = _this.defauleExpandTree(res.result, "id");
      },
      function(res) {
        console.log("err" + res);
      }
    );
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
    // 平台列表
    _this.$axios
      .gets("api/services/app/DataDictionary/GetDictItemTreeByDictName", {
        dictCode: "OMS_Platform"
      })
      .then(function(res) {
        _this.PlatformList = res[0].childNodes;
      });
    // 交易状态枚举列表 TransStatus
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItem`, {
        dictName: "OMS_TransStatus"
      })
      .then(function(res) {
        console.log(res);
        _this.TransStatus = res.result;
      });
  },
  watch: {
    time: function() {
      if (this.time) {
        if (typeof this.time == "object") {
          this.queryParams.OrderCreatedTimeStat = this.time[0];
          this.queryParams.OrderCreatedTimeEnd = this.time[1];
        }
      } else {
        this.queryParams.OrderCreatedTimeStat = "";
        this.queryParams.OrderCreatedTimeEnd = "";
      }
    },
    activeName: function(params) {
      let _this = this;
      if (this.activeName == "transferOfOrder") {
        _this.httpUrl = {
          view: "/orderDownload/orderDownloadDetail/", // 行内查看详情
          delete: `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsWebPendingOrderManagement/DeleteDownOrder`, // 单条删除
          query: `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsWebPendingOrderManagement/GetDownOrder` //数据加载
        };
        _this.column = [
          {
            prop: "transCode", // 字段名称
            label: "交易号", // 表头名称
            controls: "text", // 控件类型
            isDisable: true, // 是否可编辑
            sortable: false // 是否可排序
          },
          {
            prop: "createdTime",
            label: "下载时间",
            controls: "text",
            width: "auto",
            isDisable: true,
            sortable: false
          },
          {
            prop: "buyerNick",
            label: "买家昵称",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "consignee",
            label: "收货人姓名",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "shopId",
            label: "店铺",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "platformId",
            label: "平台",
            controls: "datetime",
            isDisable: true,
            sortable: false
          },
          {
            prop: "status",
            label: "数量",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "sellerMobile",
            label: "金额",
            controls: "text",
            isDisable: true,
            sortable: false
          }
        ];
        _this.command = [
          {
            text: "查看",
            class: "blue"
          },
          {
            text: "转单",
            class: "blue"
          },
          {
            text: "删除",
            class: "blue"
          }
        ];
        _this.buttonGroup[0].text = "转单";
      } else if (this.activeName == "toDownload") {
        _this.httpUrl = {
          delete: `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsWebPendingOrderManagement/DeleteOrderpool`, // 单条删除
          query: `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsWebPendingOrderManagement/GetOrderpool` //数据加载
        };
        _this.command = [
          {
            text: "下载",
            class: "blue"
          },
          {
            text: "删除",
            class: "blue"
          }
        ];
        _this.column = [
          {
            prop: "transCode", // 字段名称
            label: "交易号", // 表头名称
            controls: "text", // 控件类型
            isDisable: true, // 是否可编辑
            sortable: false // 是否可排序
          },
          {
            prop: "createdTime",
            label: "下载时间",
            controls: "text",
            width: "auto",
            isDisable: true,
            sortable: false
          },
          {
            prop: "buyerNick",
            label: "买家昵称",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "consignee",
            label: "收货人姓名",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "shopId",
            label: "店铺",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "platformId",
            label: "平台",
            controls: "datetime",
            isDisable: true,
            sortable: false
          },
          {
            prop: "transStatus",
            label: "交易状态",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "countRepeatDown",
            label: "重试次数",
            controls: "text",
            isDisable: true,
            sortable: false
          },
          {
            prop: "remark",
            label: "失败原因",
            controls: "text",
            isDisable: true,
            sortable: false
          }
        ];
        _this.buttonGroup[0].text = "下载";
      }
      _this.$store.state.orderDownloadListLoading = true;
      _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
      _this.$store.commit("setEachPage", 10); // 设置每页显示条数10
      _this.queryParams = {
        TransStatus: "", //交易状态
        OrderCreatedTimeStat: "", // 开始时间
        OrderCreatedTimeEnd: "", // 结束时间
        ShopId: "", // 店铺ID
        TransCode: "", // 交易号
        BuyerNick: "", // 买家昵称
        OuId: "", // 业务组织
        PlatformId: "", // 平台
        SkipCount:
          (this.$store.state.orderDownloadListCurrentPage - 1) *
          this.$store.state.orderDownloadListEachPage,
        MaxResultCount: this.$store.state.orderDownloadListEachPage
      };
      _this.$store.commit("setQueryParams", _this.queryParams);
      _this.$store.commit("setQueryApi", _this.httpUrl.query);
      _this.$store.commit("setTableSelection", []);
      _this.$store.dispatch("InitTable");
    }
  },
  data() {
    return {
      ouSearch: "", // 单元组织搜索
      ouAr: [],
      ouExpandId: [], // 默认展开第一个树节点
      ouSelectAr: [],
      ouItem: {
        id: "",
        ouFullname: ""
      },
      plItem: {
        id: "",
        itemName: ""
      },
      selectOuProps: {
        children: "childNodes",
        label: "moduleName",
        id: "id"
      },
      SelectionChange: [], // 表格选中数据
      webshop: "", //店铺枚举列表
      PlatformList: "", // 平台枚举列表
      TransStatus: [], //交易状态枚举列表
      time: "",
      activeName: "transferOfOrder",
      // 树形组件说明
      onlineTree: [],
      // 获取树形必要的数据模型配置及接口
      treeParams: {
        treeName: "orderDownloadList",
        treeApi:
          `${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItemTreeByDictName?dictCode=OMS_Platform`
      },
      // 树形渲染需要的参数
      defaultProps: {
        children: "childNodes",
        label: "itemName",
        id: "itemValue"
      },
      expandId: [], // 默认展开树节点
      treeEntrySearch: true,
      treeSuggestSearch: false,
      // 按钮组件使用说明
      buttonGroup: [
        {
          text: "转单",
          class: "bt_add",
          // icon: "icon-xinzeng",
          disabled: false
        },
        {
          text: "删除",
          class: "bt_del",
          icon: "icon-shanchu",
          disabled: false
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
      ],
      // 表格组件使用说明
      tableData: [],
      ContactOwner: 1,
      totalPage: 0, // 当前分页总数
      oneItem: 10, // 每页有多少条信息
      tableLoading: true,
      detailParentId: "", // tree节点点击获取前往detail新增页上级菜单ID
      detailParentName: "",
      // 表格内部请求接口的地址
      httpUrl: {
        view: "/orderDownload/orderDownloadDetail/", // 行内查看详情
        delete: `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsWebPendingOrderManagement/DeleteDownOrder`, // 单条删除
        query: `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsWebPendingOrderManagement/GetDownOrder` //数据加载
      },
      // 用于区别数据模型名称(store里存放的数据)
      tableModel: "orderDownloadList",
      // 请求接口需要传递的参数
      queryParams: {
        TransStatus: "", //交易状态
        OrderCreatedTimeStat: "", // 开始时间
        OrderCreatedTimeEnd: "", // 结束时间
        ShopId: "", // 店铺ID
        TransCode: "", // 交易号
        BuyerNick: "", // 买家昵称
        OuId: "", // 业务组织
        PlatformId: "", // 平台
        SkipCount:
          (this.$store.state.orderDownloadListCurrentPage - 1) *
          this.$store.state.orderDownloadListEachPage,
        MaxResultCount: this.$store.state.orderDownloadListEachPage
      },
      column: [
        {
          prop: "transCode", // 字段名称
          label: "交易号", // 表头名称
          controls: "text", // 控件类型
          width: "auto",
          isDisable: true, // 是否可编辑
          sortable: false // 是否可排序
        },
        {
          prop: "createdTime",
          label: "下载时间",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "buyerNick",
          label: "买家昵称",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "consignee",
          label: "收货人姓名",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "shopId",
          label: "店铺",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "platformId",
          label: "平台",
          width: "auto",
          controls: "datetime",
          isDisable: true,
          sortable: false
        },
        {
          prop: "status",
          width: "auto",
          label: "数量",
          controls: "text",
          isDisable: true,
          sortable: false
        },
        {
          prop: "sellerMobile",
          label: "金额",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        }
      ],
      // 用户配置表格操作栏中功能项
      command: [
        {
          text: "查看",
          class: "blue"
        },
        {
          text: "转单",
          class: "blue"
        },
        {
          text: "删除",
          class: "blue"
        }
      ],
      delAarry: {
        ids: []
      },
      // 用户表格配置项设置
      pluginSetting: {
        hasPagination: true, // 是否包含分页
        mutiSelect: true, // 是否包含多选栏
        isDisable: true // 是否可编辑
        // isFix: "right"
      },
      // diolog组件使用说明
      errorTips: {
        // 对话框 错误提示
        message: "",
        details: ""
      },
      // 对话框基本信息配置
      dialogSetting: {
        message: "", // 提示信息
        dialogName: "", // 对话框名称
        dialogType: "" // 对话框类型
      },
      // 用户控制对话框是否可见
      dialogVisible: false,
      // 用于配置对话框按钮
      dialogCommand: [],
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
      }
    };
  },
  methods: {
    async search() {
      let _this = this;
      _this.$store.commit("tableLoad_Complete", true);
      if (this.activeName == "transferOfOrder") {
        await _this.$axios
          .gets(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/GetDownOrder`,
            _this.queryParams
          )
          .then(function(res) {
            console.log(res.result.items);
            _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
            let TOTAL_PAGE = Math.ceil(
              res.result.totalCount /
                _this.$store.state.electronicSurfaceInterfaceListEachPage
            ); // 计算表格总页数
            _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
            _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
            _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
          });
        _this.$store.commit("tableLoad_Complete", false);
      } else {
        await _this.$axios
          .gets(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/GetOrderpool`,
            _this.queryParams
          )
          .then(function(res) {
            console.log(res.result.items);
            _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
            let TOTAL_PAGE = Math.ceil(
              res.result.totalCount /
                _this.$store.state.electronicSurfaceInterfaceListEachPage
            ); // 计算表格总页数
            _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
            _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
            _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
          });
        _this.$store.commit("tableLoad_Complete", false);
      }
    },
    tableFunction(data) {
      let _this = this;
      if (data.button == "转单") {
        _this.$axios
          .posts(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/OmsDownOrderStateDto`,
            [
              {
                Id: data.row.id,
                GroupId: data.row.groupId,
                OuId: data.row.ouId,
                CreatedBy: _this.$store.state.name
              }
            ]
          )
          .then(function(res) {
            _this.open("转单成功", "el-icon-circle-check", "successERP");
          })
          .catch(function(err) {
            _this.centerDialogVisible = false;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = "saveDialog";
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = err.error.message;
            _this.errorTips.details = "";
            _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
            _this.dialogVisible = true;
          });
      } else if (data.button == "下载") {
        // this.open("下载成功", "el-icon-circle-check", "successERP");
      }
    },
    // 菜单按钮点击事件
    btnClick: function(data) {
      let _this = this;
      if (data == "转单") {
        this.SelectionChange = this.$store.state[this.tableModel + "Selection"];
        if (this.SelectionChange.length < 1) {
          _this.$message({
            message: "当前没有选中任何数据！",
            type: "warning"
          });
          return;
        }
        let arr = [];
        this.SelectionChange.forEach(row => {
          arr.push({
            Id: row.id,
            GroupId: row.groupId,
            OuId: row.ouId,
            CreatedBy: row.createdBy
          });
        });
        console.log(arr);
        _this.$axios
          .posts(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/OmsDownOrderStateDto`,
            arr
          )
          .then(function(res) {
            _this.open("转单成功", "el-icon-circle-check", "successERP");
          })
          .catch(function(err) {
            _this.centerDialogVisible = false;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = "saveDialog";
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = err.error.message;
            _this.errorTips.details = "";
            _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
            _this.dialogVisible = true;
          });
      } else if (data == "删除") {
        this.SelectionChange = this.$store.state[this.tableModel + "Selection"];
        if (this.SelectionChange.length == 0) {
          this.$message({
            type: "info",
            message: "请勾选需要删除的数据！"
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
      } else if (data == "打印") {
      } else if (data == "导出") {
      }
    },
    // 树节点点击回调事件
    TreeNodeClick(data) {
      if (data.itemValue != 0) {
        this.queryParams.PlatformId = data.itemValue;
        this.search();
      } else {
        this.queryParams.PlatformId = "";
        this.search();
      }
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
    // 关闭对话框
    dialogColse() {
      this.dialogVisible = false;
    },
    // 对话框点击
    dialogClick(parmas) {
      let _this = this;
      let delArray = [];
      if (parmas.dialogButton == "确定") {
        if (parmas.dialogName == "delDialog") {
          this.SelectionChange = this.$store.state[
            this.tableModel + "Selection"
          ];
          for (var i in this.SelectionChange) {
            delArray.push(this.SelectionChange[i].id);
          }
          let api = "";
          if (_this.activeName == "transferOfOrder") {
            api = `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/BatchDeleteDeleteDownOrderAll`;
          } else if (_this.activeName == "toDownload") {
            api = `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsWebPendingOrderManagement/BatchDeleteDeleteOrderpoolAll`;
          }
          // 删除
          console.log(delArray);
          _this.$axios
            .posts(api, { ids: delArray })
            .then(function(res) {
              console.log(res);
              _this.open("删除成功", "el-icon-circle-check", "successERP");
              _this.$store.commit("setQueryParams", _this.queryParams);
              _this.$store.dispatch("InitTable");
              _this.$store.commit("setTableSelection", []);
              delArray = [];
              _this.dialogVisible = false;
            })
            .catch(function(err) {
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = "saveDialog";
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = err.error.message;
              _this.errorTips.details = "";
              _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
            });
        } else if (parmas.dialogName == "saveDialog") {
          _this.dialogVisible = false;
        }
      } else if (parmas.dialogButton == "取消") {
        this.dialogVisible = false;
      }
    },
    // 业务组织 树点击
    ouNodeClick: function(data, node, self) {
      let _this = this;
      _this.ouItem.id = data.id;
      _this.ouItem.ouFullname = data.ouFullname;
      _this.$nextTick(function() {
        $("#ou_confirmSelect").click();
      });
      $(self.$el)
        .parents(".el-select-dropdown__list")
        .children(".el-select-dropdown__item")
        .each(function(index) {
          if ($(this).attr("date") == data.id) {
            $(this).click();
          }
        });
    },
    renderContentOu(h, { node, data, store }) {
      //所属组织
      if (
        typeof data.children != "undefined" &&
        data.children != null &&
        data.children.length > 0
      ) {
        return (
          <span class="el-tree-node__label" data-id={data.id}>
            <i
              aria-hidden="true"
              class="preNode fa fa-folder-open"
              style="color:#f1c40f;margin-right:5px"
            />
            {data.ouFullname}
          </span>
        );
      } else {
        return (
          <span class="el-tree-node__label" data-id={data.id}>
            <i
              class="preNode fa fa-file"
              aria-hidden="true"
              style="color:#f1c40f;margin-right:5px"
            />
            {data.ouFullname}
          </span>
        );
      }
    },
    filterNode(value, data) {
      console.log(data);
      console.log(value);
      if (!value) return true;
      return data.ouName.indexOf(value) !== -1;
    },
    defauleExpandTree(data, key) {
      /*if(typeof(data[0])!='undefined'
                  && data[0]!=null
                  && typeof(data[0][key])!='undefined'
                  && data[0][key]!=null
                  && data[0][key]!=''){
                      return [data[0][key]]
                  }*/
    }
  },
  mounted: function() {
    let content1 = document.getElementsByClassName("orderDownloadList"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1[0].style.minHeight = height1 + "px";
    content1[0].style.background = "#ffffff";
  },
  components: {
    Tree,
    buttonGroup,
    Table,
    dialogBox
  }
};
</script>
<style scoped>
* {
  font-size: 12px;
}
.tree-box {
  max-width: 290px;
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
.order-query >>> span {
  position: relative;
  top: -3px;
}
.orderDownloadList >>> .btnGroup-box {
  margin: 0px;
  border: none;
  border-bottom: 1px solid #e4e4e4;
  /* border-left: 1px solid #e4e4e4; */
  height: 45px;
}
.el-form {
  margin: 0px 0px 10px;
}
.el-form-item {
  margin-top: 10px;
  margin-bottom: 0px;
  /* width: 22%; */
  width: 300px;
  text-align: right;
}
.el-select {
  width: 100%;
}
.el-form-item >>> .el-form-item__content {
  width: 70%;
  line-height: 28px;
}
.el-form-item >>> .el-form-item__label {
  line-height: 28px;
  font-size: 12px;
}
.el-date-editor {
  width: 100%;
  overflow: hidden;
}
.orderDownloadList >>> .el-tabs__header {
  margin: 0px;
}
.orderDownloadList >>> .el-tabs__item {
  text-align: center;
}
.orderDownloadList >>> .el-tabs__nav {
  margin-left: 10px;
}
.pr10 {
  border-bottom: 1px solid #e4e4e4;
}
.orderDownloadList >>> .erp_bt {
  width: 70px;
}
.el-range-editor.el-input__inner {
  padding: 0;
}
.orderDownloadList >>> .el-input__inner {
  height: 28px;
}
.orderDownloadList >>> .el-range-input {
  font-size: 12px;
}
.orderDownloadList >>> .vueScrollPanel {
  overflow: auto !important;
}
.h48 {
  height: 46px;
}
</style>
<style>
.left-box {
  background: #ffffff;
}
.menu-list .el-button + .el-button {
  margin-left: 0;
}
.menu-list .el-dialog__footer {
  padding: 0;
}
.menu-list .areaDialog .bgcolor:first-child {
  margin-top: 15px;
}
.orderDownloadList .border-left {
  width: calc(100% - 290px);
  border-left: 1px solid #e4e4e4;
}
.menulist-tree .search_input {
  border-bottom: 1px solid #e4e4e4 !important;
}
.menulist-tree .el-input__inner {
  width: calc(100% - 30px);
  margin: 4px 15px 8px;
}
.menulist-tree .el-input__prefix {
  left: 20px;
}
.max-height {
  max-height: 450px;
}
</style>


