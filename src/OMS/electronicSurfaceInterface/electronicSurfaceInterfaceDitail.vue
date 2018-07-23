<template>
  <div>
    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
      <i v-if="true" class="el-icon-success"></i>
      <i v-else class="el-icon-error"></i>
    <dialogBox @dialogColse="dialogUserConfirm = false" :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing"></dialogBox>
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import dialogBox from "../../base/dialog/dialog";
export default {
  name: "electronicSurfaceInterfaceDitail",
  data() {
    return {
      // 弹框相关配置
      dialogUserConfirm: false, //信息更改提示控制
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      dialogSetting: {
        message: "确定取消？",
        dialogName: "isBack",
        dialogType: "confirm"
      },
      dialogCommand: [], //底部按钮组控制组
      buttonGroup: [
        {
          text: "返回",
          class: "bt_back",
          icon: "icon-fanhui",
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
        }
      ],
      item: {
        id: ""
      }
    };
  },
  methods: {
    back() {
      this.$store.state.url =
        "/electronicSurfaceInterface/electronicSurfaceInterfaceList/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    isBack() {
      let _this = this;
      if (_this.ifModify) {
        _this.dialogSetting.dialogName = "isBack";
        _this.dialogSetting.message = "确定取消？";
        _this.dialogSetting.dialogType = "confirm";
        _this.dialogCommand = [
          { text: "确定", class: "btn-confirm" },
          { text: "取消", class: "btn-cancel" }
        ];
        _this.dialogUserConfirm = true;
      } else {
        _this.back();
      }
    },
    sureDoing(data) {
      let _this = this;
      if (data.dialogName == "isBack") {
        if (data.dialogButton == "取消") {
          _this.dialogUserConfirm = false;
        } else if (data.dialogButton == "确定") {
          _this.back();
          _this.dialogUserConfirm = false;
        }
      } else if (data.dialogName == "showErMsgDialog") {
        if (data.dialogButton == "取消") {
          _this.dialogUserConfirm = false;
        } else if (data.dialogButton == "确定") {
          _this.dialogUserConfirm = false;
        }
      }
    },
    btnClick(btn) {
      //按钮组点击事件
      let self = this;
      if (btn == "返回") {
        self.isBack();
      } else if (btn == "保存") {
      } else if (btn == "取消") {
        self.isBack();
      }
    },
    async getSelectData() {
      let _this = this;
      if (_this.$route.params.id != "default") {
        console.log(_this.$route.params.id);
        // _this.item.moduleName = _this.$route.params.name;
        _this.item.id = _this.$route.params.id;
        let data = await _this.$axios
          .gets(
            "http://192.168.100.107:8099/api/services/app/OmsEorderApiManagement/GetDataById",
            { ID: _this.item.id }
          )
          .then(function(res) {
            return res;
          });
        console.log(data.result);
        if(data.result.logisticsPlatformName == '淘宝菜鸟'){

        }else if(data.result.logisticsPlatformName == '顺丰快递'){

        }else if(data.result.logisticsPlatformName == '京东面单'){

        }
      }
    }
  },
  created() {
    let _this = this;
    _this.getSelectData();
  },
  components: {
    buttonGroup,
    dialogBox
  }
};
</script>

