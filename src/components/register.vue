<template>
<div>
  <button @click="goLogin">注册</button>
  <div style="overflow:hidden">
  <!-- 按钮 应用请更改图片相对路径 详情参考 -->
  <button  plain @click="open8" class="erp_bt bt_add"><div class="btImg"><img src="../../static/image/common/bt_add.png"></div><span class="btDetail">新增</span></button>
  <button class="erp_bt bt_out"><div class="btImg"><img src="../../static/image/common/bt_inOut.png"></div><span class="btDetail">导出</span></button>
  <button class="erp_bt bt_in"><div class="btImg"><img src="../../static/image/common/bt_inOut.png"></div><span class="btDetail">导入</span></button>
  <button class="erp_bt bt_del"><div class="btImg"><img src="../../static/image/common/bt_del.png"></div><span class="btDetail">删除</span></button>
  <button class="erp_bt bt_modify"><div class="btImg"><img src="../../static/image/common/bt_modify.png"></div><span class="btDetail">修改</span></button>
  <button class="erp_bt bt_version"><div class="btImg"><img src="../../static/image/common/bt_version.png"></div><span class="btDetail">生成版本</span></button>
  <button class="erp_bt bt_auxiliary"><div class="btImg"><img src="../../static/image/common/bt_auxiliary.png"></div><span class="btDetail">辅助功能</span></button>
  <button class="erp_bt bt_auxiliary bt_width">
    <div class="btImg"><img src="../../static/image/common/bt_auxiliary.png"></div>
    <span class="btDetail">辅助功能</span>
    <div class="btRightImg"><img src="../../static/image/common/bt_down_right.png"></div>
  </button>
  <button class="erp_bt bt_look"><div class="btImg"><img src="../../static/image/common/bt_look.png"></div><span class="btDetail">审核</span></button>
  <button class="erp_bt bt_look bt_width">
    <div class="btImg"><img src="../../static/image/common/bt_look.png"></div>
    <span class="btDetail">审核</span>
    <div class="btRightImg"><img src="../../static/image/common/bt_down_right.png"></div>
  </button>
  <button class="erp_bt bt_circulation"><div class="btImg"><img src="../../static/image/common/bt_circulation.png"></div><span class="btDetail">流转</span></button>
  <button class="erp_bt bt_inputNew"><div class="btImg"><img src="../../static/image/common/bt_add.png"></div><span class="btDetail">输入新增</span></button>
  <button class="erp_bt bt_end"><div class="btImg"><img src="../../static/image/common/bt_end.png"></div><span class="btDetail">终止</span></button>
  <button class="erp_bt bt_codeNew"><div class="btImg"><img src="../../static/image/common/bt_codeNew.png"></div><span class="btDetail">扫码新增</span></button>
  <button class="erp_bt bt_back"><div class="btImg"><img src="../../static/image/common/bt_back.png"></div><span class="btDetail">返回</span></button>
  <button class="erp_bt bt_excel"><div class="btImg"><img src="../../static/image/common/bt_excel.png"></div><span class="btDetail">Excel</span></button>
  <button class="erp_bt bt_start"><div class="btImg"><img src="../../static/image/common/bt_start.png"></div><span class="btDetail">启用</span></button>
  <button class="erp_bt bt_stop"><div class="btImg"><img src="../../static/image/common/bt_stop.png"></div><span class="btDetail">停用</span></button>
  <button class="erp_bt bt_save"><div class="btImg"><img src="../../static/image/common/bt_save.png"></div><span class="btDetail">保存</span></button>
  <button class="erp_bt bt_saveAdd"><div class="btImg"><img src="../../static/image/common/bt_saveAdd.png"></div><span class="btDetail">保存并新增</span></button>
  <button class="erp_bt bt_cancel"><div class="btImg"><img src="../../static/image/common/bt_cancel.png"></div><span class="btDetail">取消</span></button>
  <button class="erp_bt bt_print"><div class="btImg"><img src="../../static/image/common/bt_print.png"></div><span class="btDetail">打印</span></button>

  <!-- 小的圆按钮 -->
  <div class="smallBt bt_add"><img src="../../static/image/common/bt_add.png"></div>
  <div class="smallBt bt_out"><img src="../../static/image/common/bt_inOut.png"></div>
  <div class="smallBt bt_in"><img src="../../static/image/common/bt_inOut.png"></div>
  <div class="smallBt bt_del"><img src="../../static/image/common/bt_del.png"></div>
  <div class="smallBt bt_modify"><img src="../../static/image/common/bt_modify.png"></div>
  <div class="smallBt bt_version"><img src="../../static/image/common/bt_version.png"></div>
  <div class="smallBt bt_auxiliary"><img src="../../static/image/common/bt_auxiliary.png"></div>
  <div class="smallBt bt_look"><img src="../../static/image/common/bt_look.png"></div>
  <div class="smallBt bt_circulation"><img src="../../static/image/common/bt_circulation.png"></div>
  <div class="smallBt bt_inputNew"><img src="../../static/image/common/bt_add.png"></div>
  <div class="smallBt bt_end"><img src="../../static/image/common/bt_end.png"></div>
  <div class="smallBt bt_codeNew"><img src="../../static/image/common/bt_codeNew.png"></div>
  <div class="smallBt bt_back"><img src="../../static/image/common/bt_back.png"></div>
  <div class="smallBt bt_excel"><img src="../../static/image/common/bt_excel.png"></div>
  <div class="smallBt bt_start"><img src="../../static/image/common/bt_start.png"></div>
  <div class="smallBt bt_stop"><img src="../../static/image/common/bt_stop.png"></div>
  <div class="smallBt bt_save"><img src="../../static/image/common/bt_save.png"></div>
  <div class="smallBt bt_saveAdd"><img src="../../static/image/common/bt_saveAdd.png"></div>
  <div class="smallBt bt_cancel"><img src="../../static/image/common/bt_cancel.png"></div>
  <div class="smallBt bt_print"><img src="../../static/image/common/bt_print.png"></div>

  <!-- 搜索 新增 确定 按钮 -->
  <button class="formBt greenColor">
    <span class="words">搜索</span>
    <span class="words hidding"><i class="el-icon-loading"></i></span>
  </button>
  <button class="formBt redColor">
    <span class="words">新增</span>
    <span class="words hidding"><i class="el-icon-loading"></i></span>
  </button>
  <button class="formBt blueColor">
    <span class="words">确定</span>
    <span class="words hidding"><i class="el-icon-loading"></i></span>
  </button>
<!-- 背景透明 按钮  -->
  <button class="headBtn">保存</button>
  </div>
  <!-- 表单提示信息 -->
  <div class="errorTips">
      <p class="msgDetail">错误提示：名称不能为特殊字符</p>
      <div class="closeMsg"><i class="fa fa-times" aria-hidden="true"></i></div>
  </div>

  <!-- 搜索 -->
  <div class="formSearch">
    <input type="text" class="inputForm">
    <button>搜索</button>
  </div>
<div class="rangeDate">
    <el-date-picker
    v-model="valueDate"
    type="daterange"
    range-separator="to"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
    </el-date-picker>
</div>

<el-col :span="24">
    <el-col class="stepItem" :span="8">
        <div class="stepCircle">1</div>
        <div class="stepMsg">
            <p>&nbsp;&nbsp;Step1</p>
            <p>&nbsp;&nbsp;新增报表信息</p>
        </div>
    </el-col>
    <el-col class="stepItem" :span="8">
        <div class="stepCircle stepActive">2</div>
        <div class="stepMsg">
            <p>&nbsp;&nbsp;Step2</p>
            <p>&nbsp;&nbsp;提交审核</p>
        </div>
    </el-col>
    <el-col class="stepItem" :span="8">
        <div class="stepCircle">3</div>
        <div class="stepMsg">
            <p>&nbsp;&nbsp;Step3</p>
            <p>&nbsp;&nbsp;完成</p>
        </div>
    </el-col>
</el-col>

</div>
  
</template>
<script>
export default {
  data(){
    return{
      valueDate:'',
    }
  },
  created () {
    let _this=this;
    _this.$axios.gets('/AbpScripts/GetScripts')
          .then(function (res) {
                //成功之后处理逻辑
                // console.log(res);
                }) 
  },
  methods:{
    open8() {
        this.$notify({
          title: '自定义位置',
          position: 'bottom-right',
          iconClass:'fa fa-check',
          title: 'Info',
          showClose: true,
          duration: 0,
        });
      },
       switch(url){
            this.$router.push({path:url})//点击切换路由
        },
      goLogin:function(){
          //this.switch('/login');
          var _this=this;
          //if(表单验证通过)发送ajax
          _this.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{
    
                    OuId:'1',
                    Draw:'1',
                    Start:'2',
                    Length:'5',
                    Order:'',
                    MaxResultCount:'3',
                    SkipCount:'3',
                    Sorting:'2'

          })
          .then(function (res) {
                //成功之后处理逻辑
                console.log(res);
                
                },function (res) {
                //失败之后处理逻辑
                // alert('用户名或密码错误')
                console.log(res);
            }) 
       
      }
  }
}
</script>
<style>


</style>
