<template>
  <el-row class="build">
    <el-col>
      <!-- 验证提示信息 -->
      <div class="tipsWrapper mb10">
        <div class="errorTips">
          <p class="msgDetail">错误提示：
            <span :class="{block : !validation.hasError('form.skuQty')}">
              爆款工单SKU数量{{ validation.firstError('form.skuQty') }},
            </span>

            <span :class="{block :!validation.hasError('form.burstingQty')}">
              爆款工单订单数{{ validation.firstError('form.burstingQty') }},
            </span>

            <span :class="{block : !validation.hasError('form.onlyQty')}">
              单件工单订单数{{ validation.firstError('form.onlyQty') }},
            </span>

            <span :class="{block : !validation.hasError('form.doubleQty')}">
              多件工单订单数{{ validation.firstError('form.doubleQty') }},
            </span>
            <span :class="{block : !validation.hasError('form.shopId')}">
              店铺{{ validation.firstError('form.shopId') }},
            </span>
            <span :class="{block : !validation.hasError('form.stockId')}">
              出货仓库{{ validation.firstError('form.stockId') }},
            </span>
          </p>
        </div>
      </div>

      <el-col class="bgGray model">拣货工单模板
        <el-select size="mini" filterable v-model="dataModel" clearable placeholder="选择条件模板">
          <el-option v-for="item in templateList" :key="item.id" :label="item.templateName" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-col>
    <el-col>
      <el-col class="bgwhite">
        <el-col class="workSelsect">
          <span>选择拣货工单</span>
        </el-col>
        <el-col class="choice-style">
          <el-checkbox-group v-model="form.isBursting">
            <el-checkbox label=true>爆款工单</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="form.isOnly">
            <el-checkbox label=true>单件工单</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="form.isDouble">
            <el-checkbox label=true>多件工单</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-row v-if="form.isBursting || form.isOnly || form.isDouble" class="ietmBox">
          <div v-if="form.isBursting">
            <el-col class="Gray">
              <span>爆款工单</span>
              <span class="lightGray">只包含同一种SKU的订单，订单的商品数量可以是一件或多件。同一个SKU的商品数量达到设定的数量才会形成爆款拣货工单</span>
            </el-col>
            <el-col class="intent">
              <el-col class="input-box">
                <small>*</small>
                <span>SKU数量>=</span>
                <el-input size="mini" type="number" @change="showErrprTips" v-model="form.skuQty" :class="{redBorder : validation.hasError('form.skuQty') }" placeholder=""></el-input>
              </el-col>
              <el-col class="input-box">
                <small>*</small>
                <span>订单数</span>
                <el-input size="mini" type="number" @change="showErrprTips" v-model="form.burstingQty" :class="{redBorder : validation.hasError('form.burstingQty') }" placeholder=""></el-input>
              </el-col>
            </el-col>
          </div>
          <div v-if="form.isOnly">
            <el-col class="Gray">
              <span>单件工单</span>
              <span class="lightGray">订单商品数量只有一件的订单，设定的订单数是指每张拣货工单包含的数量
              </span>
            </el-col>
            <el-col class="intent">
              <el-col>
                <small>*</small>
                <span>订单数</span>
                <el-input size="mini" type="number" @change="showErrprTips" v-model="form.onlyQty" :class="{redBorder : validation.hasError('form.onlyQty') }" placeholder=""></el-input>
              </el-col>
            </el-col>
          </div>
          <div v-if="form.isDouble">
            <el-col class="Gray">
              <span>多件工单</span>
              <span class="lightGray">订单商品数量大于一件的订单，设定的订单数是指每张拣货工单包含的数据
              </span>
            </el-col>
            <el-col class="intent">
              <el-col>
                <small>*</small>
                <span>订单数</span>
                <el-input size="mini" type="number" @change="showErrprTips" v-model="form.doubleQty" :class="{redBorder : validation.hasError('form.doubleQty') }" placeholder=""></el-input>
              </el-col>
            </el-col>
          </div>
        </el-row>
      </el-col>
      <el-col class="placeholder"></el-col>
      <el-col class="height-35 workSelsect bgwhite">
        <span>取单条件</span>
      </el-col>
      <el-col class="bgwhite marTop10 inputItem-box getPadding">
        <el-col>
          <div class="bgcolor width266">
            <label>付款时间</label>
            <el-radio-group v-model="form.isAllTime">
              <el-radio :label=true>全部</el-radio>
              <el-radio :label=false>指定时间</el-radio>
            </el-radio-group>
          </div>
          <el-date-picker size="mini" v-if="!form.isAllTime" v-model="time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>店铺</label>
            <el-select size="mini" clearable filterable v-model="form.shopId" @change="setOuid(form.shopId)" placeholder="">
              <el-option v-for="(item,index) in webshop" :key="index" :label="item.shopName" :value="item.shopId">
                <span style="float: right">{{ item.shopName }}</span>
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>物流公司</label>
            <el-select size="mini" clearable filterable v-model="form.logisticsId" placeholder="">
              <el-option v-for="item in weblogistics" :key="item.id" :label="item.weblogisticsName" :value="item.id">
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.contactCode }}</span>
                <span style="float: right">{{ item.contactName }}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>货品条件</label>
            <el-select size="mini" clearable filterable v-model="form.productType" placeholder="">
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>指定SKU</label>
            <el-input size="mini" v-model="form.skuId" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>指定单号</label>
            <el-input size="mini" v-model="form.soCode" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="10" :md="12" :lg="8" :xl="6">
          <div class="bgcolor">
            <label>出货仓库</label>
            <el-select size="mini" clearable filterable @change="showErrprTips" v-model="form.stockId" placeholder="">
              <el-option v-for="(item,index) in webStore.items" :key="index" :label="item.stockName" :value="item.id">
                <span style="float: left">{{ item.stockName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockCode }}</span>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col class="center">
          <el-button size="mini" class="order-query" v-if="!dataModel" type="primary" @click="saveModel">保存条件模板</el-button>
          <el-button size="mini" class="order-query" v-else type="primary" @click="saveModel">更新条件模板</el-button>
          <el-button size="mini" class="order-query" @click="makeWorkOrder">制作拣货工单</el-button>
        </el-col>
      </el-col>

    </el-col>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse="dialogColse"></dialogBox>
    <el-dialog class="addModel" title="新增模板" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form label-width="90px" :model="modelName" ref="modelName">
        <el-form-item label="模板编号" prop="templateCode" :rules="[{ required: true, message: '模板编号不能为空'}]">
          <el-input size="mini" type="age" v-model="modelName.templateCode" placeholder="请输入模板编号"></el-input>
        </el-form-item>
        <el-form-item label="模板名称" prop="templateName" :rules="[{ required: true, message: '模板名称不能为空'}]">
          <el-input size="mini" type="age" v-model="modelName.templateName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" class="order-query" @click="addModel(dataModel)">保 存</el-button>
        <el-button size="mini" class="order-query" @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import dialogBox from "../../base/dialog/dialog";
import config from "../../../static/config";
export default {
  name: "build",
  data() {
    return {
      dialogSetting: {
        //对话框提示信息
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      centerDialogVisible: false, // 点击保存，模板名称对话框
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogVisible: false, //此参数用户控制对话框是否可见
      dialogCommand: [], //底部按钮组控制组
      //时间日期选择
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
      time: "", //时间
      webshop: [], //店铺列表
      weblogistics: [], // 物流公司列表
      webStore: "", //仓库列表
      form: {
        isBursting: false,
        skuQty: "",
        burstingQty: "",
        isOnly: false,
        onlyQty: "",
        isDouble: false,
        doubleQty: "",
        isAllTime: true,
        startTime: "",
        endTime: "",
        shopId: "",
        logisticsId: "",
        productType: "",
        skuId: "",
        soCode: "",
        stockId: ""
      },
      radio2: false,
      input: "",
      modelName: {
        templateName: "",
        templateCode: ""
      },
      dataModel: "",
      templateList: [] // 条件模板
    };
  },

  validators: {
    "form.skuQty": function(value) {
      //爆款工单,SKU数量
      if (this.form.isBursting) {
        return this.Validator.value(value)
          .required()
          .greaterThan(0);
      } else {
        return this.Validator.value(value);
      }
    },
    "form.burstingQty": function(value) {
      //爆款工单,订单数
      if (this.form.isBursting) {
        return this.Validator.value(value)
          .required()
          .greaterThan(1);
      } else {
        return this.Validator.value(value);
      }
    },
    "form.onlyQty": function(value) {
      //单件工单,订单数
      if (this.form.isOnly) {
        return this.Validator.value(value)
          .required()
          .greaterThan(0);
      } else {
        return this.Validator.value(value);
      }
    },
    "form.doubleQty": function(value) {
      //多件工单,订单数
      if (this.form.isDouble) {
        return this.Validator.value(value)
          .required()
          .greaterThan(0);
      } else {
        return this.Validator.value(value);
      }
    },
    "form.shopId": function(value) {
      return this.Validator.value(value).required();
    },
    "form.stockId": function(value) {
      //出货仓库
      return this.Validator.value(value).required();
    }
  },
  created() {
    let _this = this;
    _this.getModel(); // 模板列表
    _this.getSearchWeblogisticsData() //物流信息枚举列表
    // 店铺列表
    _this.$axios
      .gets(
        `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWebShopManagement/GetWebShopBySearch`,
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
  watch: {
    dataModel: function(params) {
      let _this = this;
      if (_this.dataModel) {
        _this.templateList.forEach(item => {
          if (item.id == params) {
            console.log(item);
            _this.form = item.makeWaveDataDto;
            _this.time = [_this.form.startTime, _this.form.endTime];
            _this.modelName.templateName = item.templateName;
            _this.modelName.templateCode = item.templateCode;
            return;
          }
        });
      } else {
        _this.clearForm();
      }
    },
    time: function() {
      if (this.time && typeof this.time[0] != "string") {
        this.form.startTime = this.time[0];
        this.form.endTime = this.time[1];
      }
    }
    // form: {
    //   handler(val, oldVal) {
    //     if (this.form.isBursting) {
    //       this.form.isOnly = true;
    //       this.form.isDouble = true;
    //     }
    //   },
    //   deep: true
    // }
  },
  computed: {},

  methods: {
    showErrprTips(e) {
      // $(".tipsWrapper").css({ display: "block" });
      // this.$validate().then(function(success) {
      //   if (success) {
      //     $(".tipsWrapper").css({ display: "none" });
      //   } else {
      //   }
      // });
    },
    setOuid(parm) {
      let _this = this;
      _this.showErrprTips();
      _this.$axios
        .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/ShopManagement/Get`, { Id: parm })
        .then(function(res) {
          console.log("组织单元ID", res.result.ouId);
          _this.getRepositoryList(res.result.ouId); //重新获取仓库列表，需传入组织单元ID
        });
    },
    getSearchWeblogisticsData(parm) {
      let _this = this;
      console.log("店铺的ID", parm);
      // 线上物流公司
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.basicPort}/api/services/app/ContactManagement/GetListByConditionSupplier`,
          {
            ContactWorkPropertyId: 1,
            SkipCount: 0,
            MaxResultCount: 1000
          }
        )
        .then(function(res) {
          console.log("线上物流公司", res);
          _this.weblogistics = res.result.items;
        });
    },
    getRepositoryList(parm) {
      //获取仓库列表
      let _this = this;
      _this.$axios
        .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/StockManagement/GetRepositoryList`, {
          SkipCount: 0,
          MaxResultCount: 999,
          OuId: parm //组织单元ID
        })
        .then(function(res) {
          console.log("仓库列表", res.result);
          _this.webStore = res.result;
        });
    },
    getModel() {
      let _this = this;
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWaveManagement/GetAllOmsWoTemplate`
        )
        .then(function(res) {
          _this.templateList = res.result.items;
        });
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    dialogClick() {
      this.dialogVisible = false;
    },
    clearForm() {
      //清空数据
      let _this = this;
      _this.form = {
        isBursting: "",
        skuQty: "",
        burstingQty: "",
        isOnly: "",
        onlyQty: "",
        isDouble: "",
        doubleQty: "",
        isAllTime: true,
        startTime: "",
        endTime: "",
        shopId: "",
        logisticsId: "",
        productType: "",
        skuId: "",
        soCode: "",
        stockId: ""
      };
      (_this.modelName.templateCode = ""),
        (_this.modelName.templateName = ""),
        (_this.time = []);
      _this.dataModel = "";
    },
    addModel(parm) {
      let _this = this;
      this.$refs.modelName.validate(valid => {
        if (valid) {
          let id;
          if (parm) {
            id = parm;
          } else {
            id = 0;
          }
          console.log(parm, id);
          _this.$axios
            .posts(
              `${config.base.ip}:${
                config.base.omsPort
              }/api/services/app/OmsWaveManagement/CreateOrUpdateOmsWo`,
              {
                templateCode: _this.modelName.templateCode,
                templateName: _this.modelName.templateName,
                makeWaveDataDto: _this.form,
                id: id
                // status : 0 //状态
              }
            )
            .then(function(res) {
              if (parm) {
                _this.open("修改成功", "el-icon-circle-check", "successERP");
              } else {
                _this.open("增加成功", "el-icon-circle-check", "successERP");
              }
              console.log(res.result.id);
              _this.dataModel = res.result.id;
              // _this.form = {
              //   isBursting: false,
              //   skuQty: "",
              //   burstingQty: "",
              //   isOnly: false,
              //   onlyQty: "",
              //   isDouble: false,
              //   doubleQty: "",
              //   isAllTime: true,
              //   startTime: "",
              //   endTime: "",
              //   shopId: "",
              //   logisticsId: "",
              //   productType: "",
              //   skuId: "",
              //   soCode: "",
              //   stockId: ""
              // };
              _this.centerDialogVisible = false;
              _this.getModel();
            })
            .catch(function(err) {
              console.log(err);
              _this.centerDialogVisible = false;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = "saveDialog";
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = err.error.message;
              _this.errorTips.details = "";
              _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
              _this.dialogVisible = true;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveModel() {
      // 保存模板
      console.log(this.form);
      $(".tipsWrapper").css({ display: "block" });
      let _this = this;
      _this.$validate().then(function(success) {
        if (success) {
          $(".tipsWrapper").css({ display: "none" });
          _this.centerDialogVisible = true;
        } else {
          console.log("错误");
        }
      });
    },
    makeWorkOrder() {
      //制作工单
      let _this = this;
      console.log(_this.form);
      $(".tipsWrapper").css({ display: "block" });
      _this.$validate().then(function(success) {
        if (success) {
          $(".tipsWrapper").css({ display: "none" });
          _this.$axios
            .posts(
              `${config.base.ip}:${
                config.base.omsPort
              }/api/services/app/OmsWaveManagement/MakeWaveData`,
              _this.form
            )
            .then(function(res) {
              console.log("增加成功", res);
              _this.open("制作成功", "el-icon-circle-check", "successERP");
              //进行参数传递
              _this.$emit("changeTab", ["list", res]);
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
      });
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
    onSubmit() {
      console.log("submit!");
    }
  },
  components: {
    dialogBox
  }
};
</script>
<style scoped>
.placeholder {
  height: 15px;
  background: #eef1f5;
}
.bgcolor {
  width: 100%;
  height: 28px;
}
.bgcolor label {
  line-height: 28px;
}
.input-box {
  width: 210px;
}
.el-checkbox-group {
  margin-right: 10px;
}
.choice-style {
  padding: 10px 0px;
  box-sizing: content-box;
}
.intent span {
  min-width: 70px;
}
.width266 {
  width: 266px;
}
.el-checkbox-group {
  display: inline-block;
}
.el-form-item__content {
  /* line-height: 28px; */
}
.bgGray {
  padding: 0 35px;
  box-sizing: border-box;
  background: #eef1f5;
}
.addModel >>> .el-dialog__header {
  height: 25px;
  line-height: 20px;
  text-align: left;
}
.addModel >>> .el-dialog__body >>> label:last-child {
  margin-top: 10px;
  display: inherit;
}
.addModel >>> .el-dialog__footer {
  height: 60px;
  line-height: 30px;
  border-top: 1px solid rgba(228, 228, 228, 1);
  padding-top: 10px;
}
#workorderBuildList .bgwhite {
  padding: 0 35px;
}
.workSelsect {
  line-height: 21px;
  padding: 10px 0px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.el-form-item >>> .el-select,
.el-select >>> .el-input {
  width: 100%;
}
.el-form-item >>> .el-form-item__content {
  width: 70%;
  line-height: 28px;
}
.bgGray >>> .el-input__inner {
  /* background: #eef1f5; */
  padding: 0px 35px;
}
.marTop10 {
  margin-top: 10px;
}
.ietmBox {
  font-size: 12px;
  clear: both;
}
.ietmBox > div {
  margin-bottom: 10px;
  height: 90px;
}
.Gray {
  background: rgba(228, 228, 228, 1);
  height: 28px;
  line-height: 28px;
  text-indent: 20px;
}
.lightGray {
  color: #999999;
}
.intent {
  text-indent: 20px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 10px 0px;
}
.intent >>> .el-input__inner,
.intent >>> .el-input {
  width: 100px !important;
}
.build >>> .el-radio__label {
  display: inline;
}
.bgTop {
  padding-top: 20px;
}
/* .el-form-item__content {
  line-height: 60px;
} */
.el-form-item {
  width: 30%;
  margin-bottom: 10px;
  height: 28px;
}
.el-form-item:nth-child(1) {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 13px;
}
.el-form-item:last-child {
  width: 100%;
  text-align: center;
}
.addModel >>> .el-form-item {
  width: 100%;
  text-align: center;
  text-indent: 5px;
}
.addModel >>> .el-form-item__error {
  padding: 0px;
}
.ietmBox >>> .el-input {
  width: 300px;
}
.el-form--inline >>> .el-form-item__label {
  float: left;
  /* display: inline-block; */
}
.tipsWrapper {
  width: 98%;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
small {
  color: #ff669b;
  margin-right: 2px;
}
.height-35 {
  padding: 10px 35px !important;
}
.model {
  line-height: 28px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.inputItem-box >>> .el-radio-group {
  display: block;
}
.center {
  text-align: center;
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
</style>
<style>
.build .bgcolor .el-input,
.build .bgcolor .el-input input {
  height: 28px;
}
.build .el-input__suffix {
  right: 0px;
}
.build > .addModel .el-dialog__body {
  padding: 10px 27px 10px;
}
.build > .addModel .el-dialog__header {
  padding-top: 10px;
}
.build .model .el-select {
  margin-left: 10px;
}
.build div.el-tabs__nav-scroll {
  padding: 0px 35px !important;
}
.build .bgcolor .el-input__suffix {
  line-height: 28px;
}
.build .el-form-item__label {
  line-height: 28px;
  font-size: 12px;
}
</style>




