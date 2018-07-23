<template>
  <div class="inventoryStrategyList">
    <!-- button组 -->
    <el-row>
      <el-col :span="24" class="fixed bg-white bb1">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
      </el-col>
    </el-row>
    <el-row class="getPadding">
      <!-- 验证提示信息开始 -->
      <div class="tipsWrapper mb10">
        <div class="errorTips">
          <p class="msgDetail">错误提示：
            <span :class="{block : !validation.hasError('tactic.tacticCode')}">
              编码{{ validation.firstError('tactic.tacticCode') }},
            </span>
            <span :class="{block : !validation.hasError('tactic.tacticName')}">
              名称{{ validation.firstError('tactic.tacticName') }},
            </span>
            <span :class="{block : !validation.hasError('tactic.shopId')}">
              店铺{{ validation.firstError('tactic.shopId') }},
            </span>
            <span :class="{block : !validation.hasError('tactic.status')}">
              启用状态{{ validation.firstError('tactic.status') }},
            </span>
            <span :class="{block : !validation.hasError('freqDto.repeatMinute')}">
              同步周期{{ validation.firstError('freqDto.repeatMinute') }},
            </span>
            <span :class="{block : !validation.hasError('freqDto.repeatModeid')}">
              执行时间{{ validation.firstError('freqDto.repeatModeid') }},
            </span>
            <span :class="{block : !validation.hasError('time')}">
              执行开始/结束时间{{ validation.firstError('time') }},
            </span>
            <span :class="{block : !validation.hasError('time2')}">
              同步虚拟库存开始/结束时间{{ validation.firstError('time2') }},
            </span>
          </p>
        </div>
      </div>
      <!-- 验证提示信息结束 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <label class="maring-10">代码
          </label>
          <el-input size="mini" @input="showErrprTips" :class="{redBorder : validation.hasError('tactic.tacticCode') }" v-model="tactic.tacticCode"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="maring-10">名称
          </label>
          <el-input size="mini" @input="showErrprTips" :class="{redBorder : validation.hasError('tactic.tacticName') }" v-model="tactic.tacticName"></el-input>
        </el-col>
        <el-col :span="6">
          <label class="maring-10">店铺
          </label>
          <el-select clearable size="mini" @change="getStoreList(tactic.shopId)" :class="{redBorder : validation.hasError('tactic.shopId') }" v-model="tactic.shopId">
            <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
              <span style="float: left">{{ item.shopName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="maring-10">状态
          </label>
          <el-select clearable size="mini" @change="showErrprTips" :class="{redBorder : validation.hasError('tactic.status') }" v-model="tactic.status">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="wh34">
          <label class="maring-10">备注</label>
        </el-col>
        <el-col class="textareaBox">
          <el-input type="textarea" :rows="4" v-model="tactic.remark"></el-input>
        </el-col>
      </el-row>
    </el-row>
    <!-- 规则设置 -->
    <el-row class="getPadding">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white bb1 licensing">
            <div class="getPadding tittle">规则设置</div>
          </el-col>
        </el-row>
        <el-row>
          <label class="wpdl-120">是否自动同步
          </label>
          <el-radio v-model="tactic.repeatEnabled" :label="false">不自动同步</el-radio>
          <el-radio v-model="tactic.repeatEnabled" :label="true">自动同步</el-radio>
          <label class="pl-10" v-if="tactic.repeatEnabled">同步周期(分钟)</label>
          <el-input size="mini" v-if="tactic.repeatEnabled" @change="showErrprTips" :class="{redBorder : validation.hasError('freqDto.repeatMinute') }" v-model="freqDto.repeatMinute"></el-input>
        </el-row>
        <el-row v-if="tactic.repeatEnabled">
          <label class="wpdl-120">执行时间
          </label>
          <el-select size="mini" @change="showErrprTips" :class="{redBorder : validation.hasError('freqDto.repeatModeid') }" v-model="freqDto.repeatModeid">
            <el-option label="全部时间" :value="0"></el-option>
            <el-option label="指定时间执行" :value="1"></el-option>
            <el-option label="指定时间不执行" :value="2"></el-option>
          </el-select>
          <el-date-picker class="ml10" size="mini" v-if="freqDto.repeatModeid != 0" @change="showErrprTips" :class="{redBorder : validation.hasError('time') }" :picker-options="pickerOptions2" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-row>
        <el-row>
          <label class="wpdl-120">执行条件
          </label>
          <el-checkbox v-model="freqDto.syncOnlyOnline" label="仅同步线上出售中商品"></el-checkbox>
          <el-checkbox v-model="freqDto.syncOnlyChangedL" label="实时同步线下库存变化商品"></el-checkbox>
          <el-checkbox v-model="freqDto.syncPerStock" label="按仓同步"></el-checkbox>
        </el-row>
        <el-row class="flex">
          <label class="wpdl-120">仓库同步比例设置:</label>
          <el-table border height="200" :data="stockList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChangeA">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="stockCode" label="仓库代码">
            </el-table-column>
            <el-table-column prop="stockName" label="仓库名称">
            </el-table-column>
            <el-table-column label="同步比例">
              <template slot-scope="scope">
                <el-input type="number" max="100" min="0" class="noEdit" v-model="scope.row.invRate"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="blue" @click="deleteOnlyOneA(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="btnBox">
          <el-button class="order-query" size="small" @click="warehouseChoose">选仓</el-button>
          <el-button class="order-query" @click="deleteMoreA" size="small">删除</el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 第三栏 -->
    <el-row class="getPadding">
      <h4 class="h4 bb1 tittle">商品范围设置</h4>
      <el-row>
        <label class="wpdl-120">执行条件
        </label>
        <el-radio v-model="tactic.skuSelectTypeid" :label="0">全部商品</el-radio>
        <el-radio v-model="tactic.skuSelectTypeid" :label="1">指定商品</el-radio>
        <el-radio v-model="tactic.skuSelectTypeid" :label="2">指定商品条件</el-radio>
      </el-row>
      <el-row v-if="tactic.skuSelectTypeid == 1">
        <el-col class="flex">
          <label class="wpdl-120"></label>
          <el-table border height="250" :data="skuselectList" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="skuCode" label="商品编码">
              <template slot-scope="scope">
                <div @click="chooseProduct(scope.$index,scope.row)">
                  <input class="input-need" :class="[scope.$index%2==0?'input-bgw':'input-bgp']" v-model="scope.row.skuId" type="text" @change="handleBankChange(scope.$index,scope.row)" />
                  <img class="abimg2" src="../../../static/image/common/search_btn.png" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="skuName" label="商品名称">
            </el-table-column>
            <el-table-column prop="brandName" label="品牌">
            </el-table-column>
            <el-table-column prop="sKU" label="SKU">
            </el-table-column>
            <el-table-column prop="specValueName" label="规格">
            </el-table-column>
            <el-table-column label="同步比例">
              <template slot-scope="scope">
                <input class="input-need" type="number" min="0" max="100" v-model="scope.row.invRate"></input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="blue">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="btnBox">
          <el-button @click="addskuselectList" class="order-query" size="small" type="primary">增行</el-button>
          <el-button class="order-query" size="small">删除</el-button>
          <el-button class="order-query" size="small">导入</el-button>
          <el-button class="order-query" size="small">导出模板</el-button>
          <el-button class="order-query" size="small">导出商品</el-button>
        </el-col>
      </el-row>
      <el-row v-if="tactic.skuSelectTypeid == 2">
        <el-col class="flex">
          <label class="wpdl-120"></label>
          <el-table border :data="skufilterList" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="商品条件">
            </el-table-column>
            <el-table-column prop="id" label="同步比例">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="blue">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="btnBox">
          <el-button class="order-query" size="small" type="primary">增行</el-button>
          <el-button class="order-query" size="small">删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <label class="wpdl-120">是否同步虚拟库存
        </label>
        <el-radio v-model="tactic.virtualInvEnabled" :label="false">不同步</el-radio>
        <el-radio v-model="tactic.virtualInvEnabled" :label="true">同步</el-radio>
      </el-row>
      <el-row v-if="tactic.virtualInvEnabled" class="height-220">
        <label class="wpdl-120">执行时间
        </label>
        <el-date-picker size="mini" v-model="time2" @change="showErrprTips" :class="{redBorder : validation.hasError('time2') }" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
        <el-row class="flex">
          <label class="wpdl-120"></label>
          <el-table border :data="virtualList" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="商品编码">
            </el-table-column>
            <el-table-column prop="id" label="商品名称">
            </el-table-column>
            <el-table-column prop="ids" label="品牌">
            </el-table-column>
            <el-table-column prop="name" label="SKU">
            </el-table-column>
            <el-table-column prop="id" label="规格">
            </el-table-column>
            <el-table-column prop="qty" label="虚拟库存数量">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="blue">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-col class="btnBox">
          <el-button class="order-query" size="small" type="primary">增行</el-button>
          <el-button class="order-query" size="small">删除</el-button>
          <el-button class="order-query" size="small">导入</el-button>
          <el-button class="order-query" size="small">导出模板</el-button>
          <el-button class="order-query" size="small">导出商品</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!-- 仓库选择弹出框 -->
    <el-dialog class="diaBox-A" title="选择仓库" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">
      <el-col>
        <el-col class="store-seasrch" :span="10">
          <span>业务组织</span>
          <el-select v-model="workOrganization" clearable placeholder="请选择">
            <el-option label="test1" :value="1"></el-option>
            <el-option label="test2" :value="12"></el-option>
          </el-select>
        </el-col>
        <el-col class="store-seasrch" :span="10">
          <span>行政地区</span>
          <el-select v-model="administrativeAreas" clearable placeholder="请选择">
            <el-option label="test1" :value="1"></el-option>
            <el-option label="test2" :value="12"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="11" class="transfer_warapper">
          <el-col :span="24" class="transfer_header">
            <span>已选</span>
            <div class="transfer_search" @keyup.enter="searchLeftTable">
              <el-input placeholder="搜索仓库名..." v-model="searchTableLeft" class="search_input">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="24" class="transfer_table">
            <el-table height="250" :data="showChecked" border style="width: 100%" stripe @selection-change="checkedSelect" ref="multipleTableL">
              <el-table-column type="selection" fixed="left"></el-table-column>
              <el-table-column prop="ouId" label="业务组织"></el-table-column>
              <el-table-column prop="adAreaId" label="行政地区"></el-table-column>
              <el-table-column prop="stockName" label="仓库"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" class="transfer_footer">
            <div style="float:right">
              <span>共{{totalPageLeft}}页</span>
              <el-button class="el_transfer" :disabled="leftDownBtn" @click="pageDownLeft" type="primary" icon="el-icon-arrow-left" round></el-button>
              <el-button class="el_transfer" :disabled="leftAddBtn" @click="pageAddLeft" type="primary" icon="el-icon-arrow-right" round></el-button>
            </div>
          </el-col>
        </el-col>
        <el-col :span="2" class="transfer_btns">
          <el-col :span="24" class="transfer_btn_wrapper">
            <el-button class="el_transfer" :disabled="is_nocheked" @click="noCheck_push_check" type="primary" icon="el-icon-arrow-left" round></el-button>
            <el-button class="el_transfer" :disabled="is_cheked" @click="check_push_noCheck" type="primary" icon="el-icon-arrow-right" round></el-button>
          </el-col>
        </el-col>
        <el-col :span="11" class="transfer_warapper">
          <el-col :span="24" class="transfer_header">
            <span>可选</span>
            <div class="transfer_search" @keyup.enter="searchRightTable">
              <el-input placeholder="搜索仓库名..." v-model="searchTableRight" class="search_input">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </el-col>
          <el-col :span="24" class="transfer_table">
            <el-table height="250" :data="showNoChecked" border style="width: 100%" stripe @selection-change="nocheckedSelect" ref="multipleTableR">
              <el-table-column type="selection" fixed="left"></el-table-column>
              <el-table-column prop="ouId" label="业务组织"></el-table-column>
              <el-table-column prop="adAreaId" label="行政地区"></el-table-column>
              <el-table-column prop="stockName" label="仓库"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" class="transfer_footer">
            <div style="float:right">
              <span>共{{totalPageRight}}页</span>
              <el-button class="el_transfer" :disabled="rightDownBtn" @click="pageDownRight" type="primary" icon="el-icon-arrow-left" round></el-button>
              <el-button class="el_transfer" :disabled="rightAddBtn" @click="pageAddRight" type="primary" icon="el-icon-arrow-right" round></el-button>
            </div>
          </el-col>
        </el-col>
      </el-col>
      <span slot="footer">
        <button class="transfer_footer_btn transfer_confirm" @click="dialogVisible2 = false">确 认</button>
        <button class="transfer_footer_btn" @click="cancelPush">取 消</button>
      </span>

    </el-dialog>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- 点击sku弹出的dialog -->
    <SearchGoods v-on:childByValue="childByValue" v-bind:SearchGoods1="SearchGoods1"></SearchGoods>
    <!-- 点击sku弹出的dialog结束 -->
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import dialogBox from "../../base/dialog/dialog";
import config from "../../../static/config";
import SearchGoods from "../../base/SearchGoods/SearchGoods";
export default {
  name: "inventoryStrategyList",
  data() {
    return {
      SearchGoods1: false, //sku弹框开光
      multipleSelectionA: [], //仓库同步比例设置，当前选中数据
      //穿梭框组件相关配置
      dialogVisible2: false,
      searchTableLeft: "", //搜索
      searchTableRight: "", //搜索
      workOrganization: "", //仓库选择，业务组织
      administrativeAreas: "", //仓库选择，行政地区
      checkedTable: [], //已选所有数据
      showChecked: [], //右侧表格展示的数据
      // roleCodesCancel:[],//表格数据，用于取消操作
      nocheckedTable: [], //可选所有数据
      showNoChecked: [], //左侧表格展示的数据
      allRoles: [], //所有数据
      selection_checked: [], //复选框选中数据
      selection_nochecked: [], //复选框选中数据
      is_nocheked: true, //可选
      is_cheked: true, //已选
      LeftWitchPage: "pagination", //分页判断条用函数
      RightWitchPage: "pagination", //分页判断条用函数
      //---------left表格-------------
      pageIndexLeft: 1, //分页的当前页码
      totalPageLeft: 0, //当前分页总数
      oneItemLeft: 10, //每页有多少条信息
      searchLeftDatas: [], //左侧搜索之后所有数据，未分页
      pageLeft: 1, //当前页
      totalItemLeft: 0, //总共有多少条消息
      leftDownBtn: true, //分页按钮是否显示
      leftAddBtn: true, //分页按钮是否显示
      //---------right表格-------------
      totalItemRight: 0, //总共有多少条消息
      pageIndexRight: 1, //分页的当前页码
      searchRightDatas: [], //右侧搜索之后所有数据，未分页
      totalPageRight: 0, //当前分页总数
      oneItemRight: 10, //每页有多少条信息
      pageRight: 1, //当前页
      rightDownBtn: true, //分页按钮是否显示
      rightAddBtn: true, //分页按钮是否显示

      webshop: [], // 店铺枚举列表
      Status: [], //状态值枚举列表
      time: [], // 规则设置执行时间
      time2: [], // 商品范围执行时间

      tactic: {
        tacticCode: "", // 策略编码
        tacticName: "", //策略名称
        shopId: "", // 店铺ID
        status: "", //启用状态
        remark: "", // 备注
        repeatEnabled: false, // 是否自动同步
        syncOnlyOnline: false, //仅同步线上出售中的商品
        syncOnlyChangedL: false, // 实时同步线下库存变化商品
        syncPerStock: false, //按仓库同步
        skuSelectTypeid: 0, //商品范围-执行条件
        virtualInvEnabled: true, // 是否同步虚拟库存
        virtualInvSyncstart: "", // 同步虚拟库存开始时间
        virtualInvSyncend: "" // 同步虚拟库存结束时间
      },
      freqDto: {
        repeatMinute: "", //同步周期(必填)
        repeatModeid: 0, // 执行时间(必填)
        repeatStart: "", //开始时间
        repeatEnd: "" // 结束时间
      },
      stockList: [], //仓库同步比例
      skufilterList: [], //指定商品条件
      virtualList: [], //虚拟库存
      skuselectList: [], //指定商品
      buttonGroup: [
        {
          text: "返回",
          class: "bt_back",
          icon: "icon-fanhui",
          disabled: false
        },
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
          text: "审核",
          class: "bt_print",
          icon: "icon-shenhe",
          disabled: false
        },
        {
          text: "取消审核",
          class: "bt_print",
          // icon: "icon-shenhe",
          disabled: false
        },
        {
          text: "作废",
          class: "bt_end",
          icon: "icon-tingyong",
          disabled: false
        },
        {
          text: "运用",
          class: "bt_start",
          icon: "icon-qiyong",
          disabled: false
        }
      ],
      dialogSetting: {
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogVisible: false,
      dialogCommand: [], //底部按钮组控制组
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
  watch: {
    checkedTable: function(params) {
      this.stockList = this.checkedTable;
    },
    time: function() {
      if (this.time) {
        if (typeof this.time[0] != "string") {
          this.freqDto.repeatStart = this.time[0];
          this.freqDto.repeatEnd = this.time[1];
        }
      }
    },
    time2: function() {
      if (this.time2) {
        if (typeof this.time2[0] != "string") {
          this.tactic.virtualInvSyncstart = this.time2[0];
          this.tactic.virtualInvSyncend = this.time2[1];
        }
      }
    }
  },
  mounted: function() {
    let content1 = document.getElementsByClassName("inventoryStrategyList"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1[0].style.minHeight = height1 + "px";
    content1[0].style.background = "#ffffff";
  },
  methods: {
    addskuselectList() {
      //指定商品增行操作
      this.skuselectList.push({
        skuCode: "",
        skuName: "",
        brandName: "",
        sKU: "",
        specValueName: "",
        invRate: ""
      });
      console.log("A", this.skuselectList);
    },
    chooseProduct(index, row) {
      this.SearchGoods1 = true;
    },
    childByValue(childValue) {
      //选取商品中选中的数据
      if (childValue.length == 0) {
        this.$message({
          type: "warning",
          message: "请先勾选！"
        });
      } else if (childValue === "跳转") {
        ADD_BOOKMARK("商品档案", "goodsFilesDetail", true, "default", this);
      } else {
        this.SearchGoods1 = false;
        console.log(childValue);
        childValue.forEach(item => {
          let itemObj = {};
          itemObj.groupId = item.groupId; //集团id
          itemObj.rtoId = item.groupId; //对应退货单ID--- ,
          itemObj.skuId = item.groupId; //SKUID--- ,
          itemObj.skuCode = item.productCode; //商品编码 ,
          itemObj.skuName = item.productName; //商品名称 ,
          itemObj.qty = item.groupId; //数量----- ,
          itemObj.retailPrice = item.retailPrice; //零售价
          itemObj.discount = item.discount; //折扣 ,
          itemObj.payPrice = item.groupId; //结算价---- ,
          itemObj.payamount = item.groupId; //结算额---- ,
          itemObj.webshopTransCode = item.groupId; //交易号---- ,
          itemObj.id = item.id;
          this.tableDetail.push(itemObj);
        });
        console.log(this.tableDetail);
      }
      console.log(this.tableDetail.length);
    },
    handleBankChange() {
      console.log("handleBankChange");
    },
    warehouseChoose() {
      //仓库选择
      this.dialogVisible2 = true;
    },
    handleSelectionChangeA(val) {
      this.multipleSelectionA = val;
    },
    deleteOnlyOneA(val) {
      //仓库同步比例设置，行内单条删除
      for (let i in this.checkedTable) {
        if (this.checkedTable[i].id == val.id) {
          console.log(this.checkedTable[i]);
          this.$refs.multipleTableL.toggleRowSelection(this.checkedTable[i]);
          this.check_push_noCheck();
          return;
        }
      }
    },
    deleteMoreA() {
      if (this.multipleSelectionA.length < 1) {
        this.$message({
          message: "当前没有选中任何数据!",
          type: "warning"
        });
        return;
      }
      let arr = [];
      this.multipleSelectionA.forEach(row => {
        for (let i in this.checkedTable) {
          if (row.id == this.checkedTable[i].id) {
            arr.push(this.checkedTable[i]);
          }
        }
      });
      arr.forEach(row => {
        this.$refs.multipleTableL.toggleRowSelection(row);
      });
      this.check_push_noCheck();
    },
    getStoreList(shopId) {
      let _this = this;
      _this.$axios
        .gets("/api/services/app/ShopManagement/Get", { Id: shopId })
        .then(function(res) {
          console.log("组织单元ID", res.result.ouId);
          _this.getAllRoleData(res.result.ouId);
        });
    },
    cancelPush() {
      //取消
      let _this = this;
      _this.dialogVisible2 = false;
      _this.getAllRoleData();
    },
    getAllRoleData(ouId) {
      let _this = this;
      _this.checkedTable = [];
      _this.LeftWitchPage = "pagination";
      _this.RightWitchPage = "pagination";
      _this.$axios
        .gets("/api/services/app/StockManagement/GetRepositoryList", {
          SkipCount: 0,
          MaxResultCount: 1,
          ouId
        }) //获取所有角色
        .then(function(re) {
          let totalAll = re.result.totalCount; //获取总共当前关联角色条数
          if (totalAll > 0) {
            _this.$axios
              .gets("/api/services/app/StockManagement/GetRepositoryList", {
                SkipCount: 0,
                MaxResultCount: totalAll,
                AreaCode: _this.administrativeAreas, // 业务地区
                ouId
              }) //获取所有角色
              .then(function(res) {
                _this.nocheckedTable = [];
                _this.allRoles = res.result.items;
                _this.totalItemRight = res.result.totalCount;
                if (_this.checkedTable.length > 0) {
                  //获取可选角色
                  _this.nocheckedTable = _this.uniqueArray(
                    _this.allRoles,
                    _this.checkedTable
                  );

                  _this.showNoChecked = _this.pagination(
                    [],
                    [],
                    _this.oneItemRight,
                    _this.pageRight,
                    "right"
                  );
                  _this.showChecked = _this.pagination(
                    [],
                    [],
                    _this.oneItemLeft,
                    _this.pageLeft,
                    "left"
                  );
                } else {
                  _this.nocheckedTable = _this.allRoles;
                  _this.showChecked = [];
                  _this.showNoChecked = _this.pagination(
                    [],
                    [],
                    _this.oneItemRight,
                    _this.pageRight,
                    "right"
                  );
                }
              });
          }
        });
    },
    searchLeftTable() {
      let _this = this;
      // checkTable
      let newJson = [];
      let patt1 = new RegExp(_this.searchTableLeft);
      $.each(_this.checkedTable, function(index, val) {
        let str = val.stockName;
        let result = patt1.test(str);
        if (result) {
          console.log(result);
          newJson.push(val);
        }
      });
      _this.LeftWitchPage = "searchLeftTable";
      _this.searchLeftDatas = newJson;
      _this.showChecked = _this.paginationUserSearch(
        newJson,
        _this.oneItemLeft,
        _this.pageLeft
      ).nowData;
      _this.totalItemLeft = _this.paginationUserSearch(
        newJson,
        _this.oneItemLeft,
        _this.pageLeft
      ).TotalItem;
      _this.totalPageLeft = _this.paginationUserSearch(
        newJson,
        _this.oneItemLeft,
        _this.pageLeft
      ).TotalPage;
    },
    searchRightTable() {
      let _this = this;
      // nocheckTable
      let newJson = [];
      let patt1 = new RegExp(_this.searchTableRight);
      $.each(_this.nocheckedTable, function(index, val) {
        let str = val.stockName;
        let result = patt1.test(str);
        if (result) {
          newJson.push(val);
        }
      });
      _this.RightWitchPage = "searchRightTable";
      _this.searchRightDatas = newJson;
      _this.showNoChecked = _this.paginationUserSearch(
        newJson,
        _this.oneItemRight,
        _this.pageRight
      ).nowData;
      _this.totalItemRight = _this.paginationUserSearch(
        newJson,
        _this.oneItemRight,
        _this.pageRight
      ).TotalItem;
      _this.totalPageRight = _this.paginationUserSearch(
        newJson,
        _this.oneItemRight,
        _this.pageRight
      ).TotalPage;
    },
    checkedSelect(val) {
      //dialogRole选中已选角色
      let _this = this;
      _this.selection_checked = val;
      if (val.length == 0) {
        _this.is_cheked = true;
      } else {
        _this.is_cheked = false;
      }
    },
    nocheckedSelect(val) {
      //dialogRole选中可选角色
      let _this = this;
      _this.selection_nochecked = val;
      if (val.length == 0) {
        _this.is_nocheked = true;
      } else {
        _this.is_nocheked = false;
      }
    },
    noCheck_push_check() {
      //从右往左添加数据
      let _this = this;
      _this.LeftWitchPage = "pagination";
      _this.RightWitchPage = "pagination";
      _this.showChecked = _this.pagination(
        _this.selection_nochecked,
        [],
        _this.oneItemLeft,
        _this.pageLeft,
        "left"
      );
      _this.showNoChecked = _this.pagination(
        [],
        _this.selection_nochecked,
        _this.oneItemRight,
        _this.pageRight,
        "right"
      );
    },
    check_push_noCheck() {
      //从左往右添加数据
      let _this = this;
      _this.LeftWitchPage = "pagination";
      _this.RightWitchPage = "pagination";
      _this.showChecked = _this.pagination(
        [],
        _this.selection_checked,
        _this.oneItemLeft,
        _this.pageLeft,
        "left"
      );
      _this.showNoChecked = _this.pagination(
        _this.selection_checked,
        [],
        _this.oneItemRight,
        _this.pageRight,
        "right"
      );
    },
    pageDownLeft() {
      //左侧表格向左翻页
      let _this = this;
      if (_this.pageLeft > 1) {
        _this.pageLeft--;
        if (_this.LeftWitchPage == "pagination") {
          _this.showChecked = _this.pagination(
            [],
            [],
            _this.oneItemLeft,
            _this.pageLeft,
            "left"
          );
        } else if (_this.LeftWitchPage == "searchLeftTable") {
          _this.showChecked = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).nowData;
          _this.totalItemLeft = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).TotalItem;
          _this.totalPageLeft = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).TotalPage;
        }
      }
    },
    pageAddLeft() {
      //左侧表格向右翻页
      let _this = this;
      if (_this.pageLeft <= _this.totalPageLeft) {
        _this.pageLeft++;
        if (_this.LeftWitchPage == "pagination") {
          //穿梭分页
          _this.showChecked = _this.pagination(
            [],
            [],
            _this.oneItemLeft,
            _this.pageLeft,
            "left"
          );
        } else if (_this.LeftWitchPage == "searchLeftTable") {
          //搜索分页
          _this.showChecked = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).nowData;
          _this.totalItemLeft = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).TotalItem;
          _this.totalPageLeft = _this.paginationUserSearch(
            _this.searchLeftDatas,
            _this.oneItemLeft,
            _this.pageLeft
          ).TotalPage;
        }
      }
    },
    pageDownRight() {
      //右侧表格向左翻页
      let _this = this;
      if (_this.pageRight > 1) {
        _this.pageRight--;
        if (_this.RightWitchPage == "pagination") {
          _this.showNoChecked = _this.pagination(
            [],
            [],
            _this.oneItemRight,
            _this.pageRight,
            "right"
          );
        } else if (_this.RightWitchPage == "searchRightTable") {
          //搜索分页
          _this.showNoChecked = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).nowData;
          _this.totalItemRight = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).TotalItem;
          _this.totalPageRight = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).TotalPage;
        }
      }
    },
    paginationUserSearch(data, oneItem, thisPage) {
      //数据分页
      //checkAllata分页数据
      //oneItem每页有多少条信息
      //thisPage当前页
      let _this = this;
      let x = {};
      let nowData = [];
      // console.log(checkAllata)
      let startIndex = (thisPage - 1) * oneItem; //起始数据所在位置
      let endIndex = startIndex + oneItem;
      if (data.length > 0) {
        if (endIndex > data.length) {
          endIndex = data.length;
        }
        for (startIndex; startIndex < endIndex; startIndex++) {
          //获取当前页展示的oneItem条数据
          // console.log(data[startIndex])
          nowData.push(data[startIndex]);
        }
      }
      // _this.ouTotalItem=data.length;//总共多少条数据
      // _this.ouTotalPage=Math.ceil(data.length/oneItem);//有多少页
      x = {
        TotalItem: data.length,
        TotalPage: Math.ceil(data.length / oneItem),
        nowData: nowData
      };
      return x;
    },
    pageAddRight() {
      //右侧表格向右翻页
      let _this = this;
      if (_this.pageRight < _this.totalPageRight) {
        _this.pageRight++;
        if (_this.RightWitchPage == "pagination") {
          _this.showNoChecked = _this.pagination(
            [],
            [],
            _this.oneItemRight,
            _this.pageRight,
            "right"
          );
        } else if (_this.RightWitchPage == "searchRightTable") {
          //搜索分页
          _this.showNoChecked = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).nowData;
          _this.totalItemRight = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).TotalItem;
          _this.totalPageRight = _this.paginationUserSearch(
            _this.searchRightDatas,
            _this.oneItemRight,
            _this.pageRight
          ).TotalPage;
        }
      }
    },
    pagination(addData, delData, oneItem, thisPage, LeftOrRight) {
      //数据分页
      //data需要被分页的数据,类型为[{}]
      //addData被添加的数据数据,类型为[{}]
      //delData被移走的数据,类型为[{}]
      //totalItem总共有多少条消息
      //pageIndex分页的当前页码
      //totalPages当前分页总数
      //oneItem每页有多少条信息
      //thisPage当前页

      let _this = this;
      let nowData = [];
      let startIndex = (thisPage - 1) * oneItem; //起始数据所在位置
      let endIndex = startIndex + oneItem;

      if (LeftOrRight == "right") {
        if (addData.length > 0) {
          _this.nocheckedTable = addData.concat(_this.nocheckedTable);
        }
        if (delData.length > 0) {
          _this.nocheckedTable = _this.uniqueArray(
            _this.nocheckedTable,
            delData
          );
        }
        if (_this.nocheckedTable.length > 0) {
          if (endIndex > _this.nocheckedTable.length) {
            endIndex = _this.nocheckedTable.length;
          }
          for (startIndex; startIndex < endIndex; startIndex++) {
            //获取当前页展示的oneItem条数据
            nowData.push(_this.nocheckedTable[startIndex]);
          }
        }
      } else if (LeftOrRight == "left") {
        if (addData.length > 0) {
          _this.checkedTable = addData.concat(_this.checkedTable);
        }
        if (delData.length > 0) {
          _this.checkedTable = _this.uniqueArray(_this.checkedTable, delData);
        }
        if (_this.checkedTable.length > 0) {
          if (endIndex > _this.checkedTable.length) {
            endIndex = _this.checkedTable.length;
          }
          for (startIndex; startIndex < endIndex; startIndex++) {
            //获取当前页展示的oneItem条数据
            nowData.push(_this.checkedTable[startIndex]);
          }
        }
      }
      //左侧
      _this.totalItemLeft = _this.checkedTable.length; //左侧总共多少条数据
      _this.totalPageLeft = Math.ceil(_this.totalItemLeft / _this.oneItemLeft); //有多少页
      _this.LeftbtnIsShow();
      //右侧
      _this.totalItemRight = _this.nocheckedTable.length; //右侧总共多少条数据
      _this.totalPageRight = Math.ceil(
        _this.totalItemRight / _this.oneItemRight
      ); //有多少页
      _this.RightbtnIsShow();

      return nowData;
    },
    uniqueArray(array1, array2) {
      //求差集
      var result = [];
      for (var i = 0; i < array1.length; i++) {
        var item = array1[i];
        var repeat = false;
        for (var j = 0; j < array2.length; j++) {
          if (array1[i].id == array2[j].id) {
            //唯一key
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          result.push(item);
        }
      }
      return result;
    },
    RightbtnIsShow() {
      let _this = this;
      if (_this.pageRight > 1) {
        _this.rightDownBtn = false;
      } else {
        _this.rightDownBtn = true;
      }
      if (_this.totalPageRight > _this.pageRight) {
        _this.rightAddBtn = false;
      } else {
        _this.rightAddBtn = true;
      }
    },
    LeftbtnIsShow() {
      let _this = this;
      if (_this.pageLeft > 1) {
        _this.leftDownBtn = false;
      } else {
        _this.leftDownBtn = true;
      }

      if (_this.totalPageLeft > _this.pageLeft) {
        _this.leftAddBtn = false;
      } else {
        _this.leftAddBtn = true;
      }
    },
    handleClose(done) {
      done();
    },
    // 按钮组点击事件
    btnClick: function(btn) {
      let _this = this;
      if (btn == "新增") {
        $(".tipsWrapper").css({ display: "block" });
        this.$validate().then(function(success) {
          if (success) {
            console.log({
              tactic: _this.tactic,
              freqDto: _this.freqDto,
              stockList: _this.stockList,
              skufilterList: _this.skufilterList,
              skuselectList: _this.skuselectList,
              virtualList: _this.virtualList
            });
            $(".tipsWrapper").css({ display: "none" });
            _this.$axios // 测试
              .posts(
                `${config.base.ip}:${
                  config.base.omsPort
                }/api/services/app/OmsInvTacticManagement/CreateOmsTactic`,
                {
                  tactic: _this.tactic,
                  freqDto: _this.freqDto,
                  stockList: _this.stockList,
                  skufilterList: _this.skufilterList,
                  skuselectList: _this.skuselectList,
                  virtualList: _this.virtualList
                }
              )
              .then(function(res) {
                _this.open("新增成功", "el-icon-circle-check", "successERP");
              })
              .catch(function(err) {
                console.log(err);
                _this.dialogSetting.dialogType = "submit";
                _this.dialogSetting.dialogName = "saveDialog";
                _this.dialogSetting.message = "信息提报有误";
                _this.errorTips.message = err.error.message;
                _this.errorTips.details = "";
                _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
                _this.dialogVisible = true;
              });
          } else {
          }
        });
      } else if (btn == "返回") {
        this.goList();
      } else if (btn == "删除") {
      } else if (btn == "保存") {
      } else if (btn == "取消") {
      } else if (btn == "审核") {
      } else if (btn == "取消审核") {
      } else if (btn == "作废") {
      } else if (btn == "启用") {
      }
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
    goList() {
      this.$store.state.url =
        "/inventoryStrategy/inventoryStrategyList/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    open: function(tittle, iconClass, itemName) {
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: itemName
      });
    },
    showErrprTips(e) {
      $(".tipsWrapper").css({ display: "block" });
      this.$validate().then(function(success) {
        if (success) {
          $(".tipsWrapper").css({ display: "none" });
        } else {
        }
      });
    }
  },
  created() {
    let _this = this;
    let id = this.$router.currentRoute.params.id;
    if (id != "default") {
      this.$axios
        .gets(
          `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsInvTacticManagement/GetOmsInvTacticById`,
          {
            id
          }
        )
        .then(function(res) {
          _this.freqDto = res.result.freqDto;
          _this.skufilterList = res.result.skufilterList;
          _this.skuselectList = res.result.skuselectList;
          _this.stockList = res.result.stockList;
          _this.tactic = res.result.tactic;
          _this.virtualList = res.result.virtualList;
          if (res.result.freqDto.repeatModeid != 0) {
            _this.time = [
              res.result.freqDto.repeatStart,
              res.result.freqDto.repeatEnd
            ]; // 规则设置执行时间
          }
          if (res.result.tactic.virtualInvEnabled) {
            _this.time2 = [
              res.result.tactic.virtualInvSyncstart,
              res.result.tactic.virtualInvSyncend
            ]; // 商品范围执行时间
          }
          _this.getStoreList(res.result.tactic.shopId);
        });
    }
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
    //状态值
    _this.$axios
      .gets("/api/services/app/DataDictionary/GetDictItem", {
        dictName: "status001"
      })
      .then(function(res) {
        console.log("状态值列表：", res);
        _this.Status = res.result;
      });
    // ******************  分割线  *************************
  },
  components: {
    buttonGroup,
    dialogBox,
    SearchGoods
  },
  validators: {
    "tactic.tacticCode": function(value) {
      //策略编码
      return this.Validator.value(value).required();
    },
    "tactic.tacticName": function(value) {
      // 策略名称
      return this.Validator.value(value).required();
    },
    "tactic.shopId": function(value) {
      // 目标店铺Id
      return this.Validator.value(value).required();
    },
    "tactic.status": function(value) {
      // 启用状态
      return this.Validator.value(value).required();
    },
    "freqDto.repeatMinute": function(value) {
      //同步周期
      if (this.tactic.repeatEnabled) {
        return this.Validator.value(value).required();
      } else {
        return this.Validator.value(value);
      }
    },
    "freqDto.repeatModeid": function(value) {
      //执行时间
      if (this.tactic.repeatEnabled) {
        return this.Validator.value(value).required();
      } else {
        return this.Validator.value(value);
      }
    },
    time: function(value) {
      //开始/结束时间
      if (this.freqDto.repeatModeid != 0) {
        return this.Validator.value(value).required();
      } else {
        return this.Validator.value(value);
      }
    },
    time2: function(value) {
      //开始/结束时间
      if (this.tactic.virtualInvEnabled) {
        return this.Validator.value(value).required();
      } else {
        return this.Validator.value(value);
      }
    }
  }
};
</script>
<style scoped>
* {
  font-size: 12px;
}
.tittle {
  font-size: 16px;
}
.ml10 {
  margin-left: 10px;
}
.el-range-editor .el-range-input {
  top: 0;
}
.wh34 {
  width: 34px;
}
.store-seasrch {
  margin-right: 10px;
  margin-bottom: 10px;
}
.store-seasrch > sapn {
  width: 48px;
}
.store-seasrch > .el-select {
  margin-left: 10px;
  width: calc(100% - 68px);
}
.height-220 {
  height: 220px;
}
.bg-white {
  background: white;
}
.bb1 {
  border-bottom: 1px solid #cccccc;
}
.pl-10 {
  margin-left: 10px;
}
/*收起*/
.inventoryStrategyList .inline-block-need {
  display: inline-block;
}
.inventoryStrategyList .el-row {
  margin-top: 10px;
  background-color: #fff;
}
.inventoryStrategyList .el-row:last-child {
  border-bottom: none;
}
.inventoryStrategyList >>> .getPadding {
  padding: 0px 10px 10px;
}
.inventoryStrategyList .tabZoo {
  overflow: hidden;
  background-color: #fff;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.wpdl-120 {
  width: 120px;
  text-align: right;
  margin-right: 10px;
}
.order-query {
  background-color: #00c9c9;
  color: white;
  border: none;
  /* width: 100px; */
  height: 28px;
  margin-bottom: 10px;
  cursor: pointer;
}
.blue {
  border: none;
  background: transparent;
}
.btnBox {
  margin-left: 130px;
  margin-top: 10px;
}
.el-checkbox {
  margin-right: 10px;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.el-radio {
  margin-right: 10px;
}
.el-range-editor {
  margin-right: 10px;
}
.el-range-editor.el-input__inner {
  padding: 0px;
}

.el-col-6 {
  display: flex;
}
.el-input,
.el-select {
  flex-grow: 1;
  /* padding-left: 10px; */
  width: auto;
}
.maring-10 {
  margin-right: 10px;
}
.inventoryStrategyList >>> label {
  display: inline-block;
  line-height: 28px;
  text-align: right;
  color: #606266;
  font-family: "microsoft yahei";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
.width-90 {
  display: flex;
}
.width-90 >>> .el-input {
  flex-grow: 1;
}
.inventoryStrategyList >>> .el-radio__label {
  display: inline-block;
}
.checkbox-group {
  display: inline-block;
}
::-webkit-scrollbar {
  display: none;
}
.h4 {
  margin-top: 10px;
}
.tabZoo .el-input {
  width: 65px;
}
.input-need{
  width: 80%;
}
.abimg2{
    position: relative;
    top: 7px;
}
.inventoryStrategyList table .noEdit.is-disabled .el-input__inner {
  color: #606266;
  background: #fff;
}
</style>
<style>
.inventoryStrategyList .el-input__inner {
  height: 28px;
}
.inventoryStrategyList table .noEdit.is-disabled .el-input__inner {
  color: #606266;
  background: #fff;
}
.inventoryStrategyList .textareaBox {
  width: calc(50% - 45px);
}
.inventoryStrategyList .diaBox-A .el-dialog__body {
  padding-top: 10px !important;
}
.inventoryStrategyList .diaBox-A .el-dialog__footer {
  text-align: center;
  padding-bottom: 10px;
}
</style>

