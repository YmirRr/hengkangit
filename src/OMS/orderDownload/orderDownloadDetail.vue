<template>
  <div class="orderDownloadDetail">
    <!-- button组 -->
    <el-row>
      <el-col :span="24" class="fixed bg-white bb1">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
      </el-col>
    </el-row>
    <el-row class="getPadding">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>交易号
          </label>
          <el-input v-model="form.transCode" disabled></el-input>
        </el-col>
        <el-col :span="6">
          <label>下单时间
          </label>
          <el-input v-model="form.orderCreatedTime" disabled></el-input>
        </el-col>
        <el-col :span="6">
          <label>金额
          </label>
          <el-input v-model="form.amount" disabled></el-input>
        </el-col>
        <el-col :span="6">
          <label>交易状态
          </label>
          <el-input v-model="form.transStatus" disabled></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>收货人姓名
          </label>
          <el-input v-model="form.consigneeName" disabled></el-input>
        </el-col>
        <el-col :span="6">
          <label>收货人电话
          </label>
          <el-input v-model="form.consigneePhone" disabled></el-input>
        </el-col>
      </el-row>
      <el-row class="width-90">
        <label>收货人地址</label>
        <el-input v-model="form.consigneeAddress" disabled></el-input>
      </el-row>
      <el-row class="width-90">
        <label>买家备注</label>
        <el-input v-model="form.buyerNote" disabled></el-input>
      </el-row>
      <el-row class="width-90">
        <label>卖家备注</label>
        <el-input v-model="form.salerNote" disabled></el-input>
      </el-row>
    </el-row>
    <!-- 商品明细 -->
    <el-row class="getPadding">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white bb1 licensing">
            <div class="getPadding">商品明细</div>
          </el-col>
        </el-row>
        <el-table :data="form.inventoriesList" border style="width: 100%">
          <el-table-column label="商品编码" prop="productCode"></el-table-column>
          <el-table-column label="商品名称" prop="productName"></el-table-column>
          <el-table-column label="结算价" prop="payPrice"></el-table-column>
          <el-table-column label="数量" prop="qty"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 审计信息 -->
    <!-- <el-row class="getPadding">
        <h4 class="h4 bb1">审计信息</h4>
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <label>创建人
              </label>
              <el-input v-model="form.createdBy" disabled></el-input>
            </el-col>
            <el-col :span="6">
              <label>创建时间
              </label>
              <el-input v-model="form.orderCreatedTime" disabled></el-input>
            </el-col>
            <el-col :span="6">
              <label>修改人
              </label>
              <el-input v-model="form.modifiedBy" disabled></el-input>
            </el-col>
            <el-col :span="6">
              <label>修改时间
              </label>
              <el-input v-model="form.modifiedTime" disabled></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label>审核人</label>
              <el-input disabled></el-input>
            </el-col>
            <el-col :span="6">
              <label>审核时间
              </label>
              <el-input disabled></el-input>
            </el-col>
          </el-row>
        </div>
      </el-row> -->
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import dialogBox from "../../base/dialog/dialog";
import config from "../../../static/config";
export default {
  name: "orderDownloadDetail",
  data() {
    return {
      form: {
        transCode: "", //交易号
        orderCreatedTime: "", // 下单时间
        amount: "", //金额
        transStatus: "", //交易状态
        consigneeName: "", //收货人姓名
        consigneePhone: "", //收货人电话
        consigneeAddress: "", //收货人地址
        buyerNote: "", //买家备注
        salerNote: "", //卖家备注
        createdBy: "", //创建人
        createdTime: "", //创建时间
        modifiedBy: "", //修改人
        modifiedTime: "", //修改时间
        inventoriesList: [] //商品明细
      },
      buttonGroup: [
        {
          text: "返回",
          class: "bt_back",
          icon: "icon-fanhui",
          disabled: false
        },
        {
          text: "转单",
          class: "bt_in",
          // icon: "icon-fanhui",
          disabled: false
        },
        {
          text: "删除",
          class: "bt_del",
          icon: "icon-shanchu",
          disabled: false
        },
        {
          text: "导出",
          class: "bt_out",
          icon: "icon-daochu",
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
      dialogCommand: [] //底部按钮组控制组
    };
  },
  methods: {
    // 按钮组点击事件
    btnClick: function(btn) {
      let _this = this;
      console.log(_this.form);
      if (btn == "转单") {
        _this.$axios
          .posts(
            `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWebPendingOrderManagement/OmsDownOrderStateDto`,
            [
              {
                Id: this.$router.currentRoute.params.id,
                GroupId: _this.form.groupId,
                OuId: _this.form.ouId,
                CreatedBy: _this.$store.state.name
              }
            ]
          )
          .then(function(res) {
            _this.open("转单成功", "el-icon-circle-check", "successERP");
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
      } else if (btn == "返回") {
        this.goList();
      } else if (btn == "删除") {
        this.dialogSetting.dialogName = "delDialog";
        this.dialogSetting.message = "确定删除？";
        this.dialogSetting.dialogType = "confirm";
        this.dialogCommand = [
          { text: "确定", class: "btn-confirm" },
          { text: "取消", class: "btn-cancel" }
        ];
        this.dialogVisible = true;
      } else if (btn == "导出") {
      }
    },
    dialogClick(parmas) {
      let _this = this;
      if (parmas.dialogButton == "确定") {
        if (parmas.dialogName == "delDialog") {
          _this.$axios
            .deletes(
              `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWebPendingOrderManagement/DeleteDownOrder`,
              { id: this.$router.currentRoute.params.id }
            )
            .then(function(res) {
              console.log(res);
              _this.open("删除成功", "el-icon-circle-check", "successERP");
              _this.dialogVisible = false;
              _this.goList();
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
        } else {
          this.dialogVisible = false;
        }
      } else if (parmas.dialogButton == "取消") {
        this.dialogVisible = false;
      }
    },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    goList() {
      this.$store.state.url = "/orderDownload/orderDownloadList/default";
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
    }
  },
  created() {
    let _this = this;
    let id = this.$router.currentRoute.params.id;
    this.$axios
      .gets(
        `${config.base.ip}:${config.base.omsPort}/api/services/app/OmsWebPendingOrderManagement/GetDownOredrDtl`,
        {
          Id: id
        }
      )
      .then(function(res) {
        console.log(res);
        if (res.result) {
          _this.form = res.result;
        }
      }).catch(function(err) {
        this.$message.error('数据获取失败');
      });
  },
  mounted: function() {
    let content1 = document.getElementsByClassName("orderDownloadDetail"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1[0].style.minHeight = height1 + "px";
    content1[0].style.background = "#ffffff";
  },
  components: {
    buttonGroup,
    dialogBox
  }
};
</script>
<style scoped>
.orderDownloadDetail >>> .erp_bt {
  width: 70px;
}
.bg-white {
  background: white;
}
.bb1 {
  border-bottom: 1px solid #cccccc;
}
/*收起*/
.orderDownloadDetail .inline-block-need {
  display: inline-block;
}
.orderDownloadDetail .el-row {
  margin-top: 10px;
  background-color: #fff;
}
.orderDownloadDetail .el-row:last-child {
  border-bottom: none;
}
.orderDownloadDetail >>> .getPadding {
  padding: 0px 10px 10px;
}
.orderDownloadDetail .tabZoo {
  overflow: hidden;
  background-color: #fff;
}

.orderDownloadDetail .tabZoo .erp_bt:first-child {
  margin-left: 10px;
}
.el-col-6 {
  display: flex;
}
.el-input {
  flex-grow: 1;
  padding-left: 10px;
  width: auto;
}
.orderDownloadDetail >>> .el-input__inner {
  height: 28px;
}
.orderDownloadDetail >>> label {
  display: inline-block;
  width: 100px !important;
  line-height: 28px;
  text-align: right;
  color: #606266;
  font-family: "microsoft yahei";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
.width-90 {
  display: flex;
  width: 50%;
  padding-right: 10px;
}
.width-90 >>> .el-input {
  flex-grow: 1;
}
</style>
