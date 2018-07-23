<template>
    <div class="rulecode-detail">
        <el-row class="fixed">
           <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
            </div>
        </el-row>

        <el-row class="pt20">
            <el-col :span="24">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>单据类型</label>
                        <el-select clearable filterable
                            class="billType"
                            placeholder="请选择"
                            :filter-method="filterMethod"
                            :class="{redBorder : validation.hasError('addData.billType')}"
                            v-model="addData.billType">
                           <el-option v-for="item in BillType1" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                               <span>{{item.itemName}}</span>
                               <span>{{item.itemCode}}</span>
                           </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.billType') }}</div>
                </div>
            </el-col>

            <el-col :span="24" >
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>规则名称</label>
                        <el-input class="ruleName"
                                  :class="{redBorder : validation.hasError('addData.ruleName')}"
                                  v-model="addData.ruleName">
                        </el-input>
                    </div>
                     <div class="error_tips">{{ validation.firstError('addData.ruleName') }}</div>
                </div>
            </el-col>
           <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>状态</label>
                        <el-select  class="status"
                                    clearable filterable
                                    :class="{redBorder : validation.hasError('addData.status')}"
                                    placeholder=""
                                    v-model="addData.status">
                            <el-option v-for="item in status"
                                       :key="item.itemValue"
                                       :label="item.itemName"
                                       :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.status') }}</div>
                </div>
            </el-col>
            <el-col :span="24" class="bg-gray">
                <div class="marginAuto">
                    <div class="longWidth">
                        <label class="tipsWrapper">编码前缀设置</label>
                        <span class="red-color h35">此项为必选项</span>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor">
                        <label><small>*</small>前缀</label>
                        <el-input class="ruleCode"
                                  v-model="addData.ruleCode"
                                   :class="{redBorder : validation.hasError('addData.ruleCode')}">
                        </el-input>
                    </div>
                <div class="error_tips">{{ validation.firstError('addData.ruleCode') }}</div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="marginAuto business">
                    <div class="longWidth">
                        <label>业务组织</label>
                        <el-checkbox v-model="addData.includeOu" @change="checked()"></el-checkbox>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="marginAuto business">
                    <div class="longWidth">
                        <label>&nbsp;&nbsp;</label>
                        <span class="font-color">勾选业务组织，当前编码归属当前账号所组织</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="border-bottom">
                <div class="marginAuto Times">
                    <div class="longWidth">
                        <label>时间</label>
                            <el-checkbox label="年" v-model="addData.includeYear" @change="getYear()"></el-checkbox>
                            <el-checkbox label="月" v-model="addData.includeMonth" @change="getMonth()"></el-checkbox>
                            <el-checkbox label="日" v-model="addData.includDay" @change="getDay()"></el-checkbox>
                    </div>
                </div>
            </el-col>
             <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth mt15">
                        <label>最短流水号</label>
                        <el-input class="codeLen" v-model="addData.codeLen">
                        </el-input>
                        <span class="unit">位</span>
                    </div>
                      <div class="error_tips">{{ validation.firstError('addData.codeLen') }}</div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="marginAuto business">
                    <div class="longWidth">
                        <label>&nbsp;&nbsp;</label>
                        <span class="font-color">温馨提示：默认带出编码最小长度，即最小长度为3位</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="marginAuto business">
                    <div class="longWidth">
                        <label>范例</label>
                        <el-col :span="4" class="red-color">
                            <span>前缀</span><br/>
                            <span v-if="addData.ruleCode!=''">{{addData.ruleCode}}</span>
                            <span v-else>HK</span>
                        </el-col>
                         <el-col :span="4" class="red-color">
                            <span>业务组织</span><br/>
                            <span v-if="addData.includeOu==false">bjhk</span>
                            <span v-else>{{ouCode}}</span>
                        </el-col>
                         <el-col :span="4" class="red-color">
                            <span>年月日</span><br/>
                            <span v-if="addData.includeYear==true&&addData.includeMonth==false&&addData.includDay==false">{{includeYear}}</span>
                            <span v-else-if="addData.includeMonth==true&&addData.includeYear==false&&addData.includDay==false">{{includeMonth}}</span>
                            <span v-else-if="addData.includeMonth&&addData.includeYear==true&&addData.includDay==false">{{currentdate}}</span>
                            <span v-else-if="addData.includeMonth&&addData.includeYear&&addData.includDay==true">{{currentdateFull}}</span>
                            <span v-else-if="addData.includeYear==true&&addData.includeMonth==false&&addData.includDay==true">{{includeYearDay}}</span>
                            <span v-else-if="addData.includeYear==false&&addData.includeMonth==false&&addData.includDay==true">{{includDay}}</span>
                            <span v-else-if="addData.includeYear==false&&addData.includeMonth==true&&addData.includDay==true">{{includMonDay}}</span>
                            <span v-else-if="addData.includeYear==false&&addData.includeMonth==false&&addData.includDay==false">20180502</span>
                        </el-col>
                         <el-col :span="4" class="red-color">
                            <span>流水号</span><br/>
                            <span>001</span>
                        </el-col>
                    </div>



                </div>
            </el-col>
      </el-row>
      <el-row>
    <el-col :span="24" class="getPadding">
        <h4 class="h4">审计信息</h4>
        <div>
            <div class="bgcolor"><label>创建人</label><el-input v-model="auditInfo.createdBy" disabled></el-input></div>
            <div class="bgcolor">
                <label>创建时间</label>
               <el-date-picker
                          v-model="auditInfo.createdTime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date"
                          disabled
                          placeholder="">
                </el-date-picker>
            </div>
            <div class="bgcolor"><label>修改人</label><el-input  v-model="auditInfo.modifiedBy" disabled></el-input></div>
            <div class="bgcolor">
                <label>修改时间</label>
                    <el-date-picker
                          v-model="auditInfo.modifiedTime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date"
                          disabled
                          placeholder="">
                    </el-date-picker>
            </div>
        </div>
    </el-col>
</el-row>
 <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
  </div>
  </template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
import {GetDateTime} from '../../common/dom.js'//单页面增删改
import {FILTER_MOTHED} from '../../common/common.js'
    export default({
        data(){
            return{
                //------------------ 新增客户-------------
                status: [],//状态
                addData:{
                    "billType": '',
                    "ruleName": "",
                    "codeLen": 3,
                    "ruleCode": '',
                    "includeOu":false,
                    "includeYear": false,
                    "includeMonth": false,
                    "includDay": false,
                    "id": 0,
                    "status": 1,
                    },

                 selectData:{//select数据
                        Status001:[],//启用状态
                       
                    },
                BillType:[],//单据类型
                auditInfo:{
                        createdTime:GetDateTime(),//创建时间
                        createdBy:this.$store.state.name,//创建人
                        modifiedTime:GetDateTime(),//修改人
                        modifiedBy:this.$store.state.name//修改时间
                    },
                choseDoing:'',//存储点击按钮判断信息
                dialogUserConfirm:false,//信息更改提示控制
                update:false,
                firstModify:false,
                errorMessage:false,//错误信息提示
                detail_message_ifShow:false,
                isAddNew:'',//判断点击的是保存还是保存新增
                ifShow:false,//是否显示
                response:{
                    details:'',
                    message:'',
                },
              buttonGroup:[{
                    text:'返回',
                    class:'bt_back',
                    icon:'icon-fanhui',
                    disabled:false,
                },{
                    text:'新增',
                    class:'bt_add',
                    icon:'icon-xinzeng',
                    disabled:true,
                },{
                    text:'删除',
                    class:'bt_del',
                    icon:'icon-shanchu',
                    disabled:true,
                },{
                    text:'保存',
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'保存并新增',
                    class:'bt_saveAdd',
                    icon:'icon-baocunxinzeng',
                    disabled:false,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:false,
                }],
                dialogCommand:[],//底部按钮组控制组
                dialogVisible:false,
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                isAdd:false,
                changeTimes:0,
                ouCode:"",//组织代码
                includeYear:"",//当前年
                includeMonth:"",
                includDay:"",
                currentdate:"",
                currentdateFull:"",
                includeYearDay:"",
                includMonDay:"",
                filterKey:''

            }
        },
     validators: {
      'addData.billType': function (value) {//单据类型
         return this.Validator.value(value).required();
      },
       'addData.ruleCode': function (value) {//单据类型
         return this.Validator.value(value).required();
      },
     'addData.codeLen': function (value) {//排序
         return this.Validator.value(value).integer().custom(function () {
            if (value<3) {
                return '必须是大于3整数'
            }
        });
      },
      'addData.status':function (value) {
         return this.Validator.value(value).required();
      },

    },
    // 创建-------
    created:function(){
            let self = this;
            self.getSelectData();
        },
    computed:{
       BillType1: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.BillType)
      },
  },
    watch: {
        addData:{
            handler: function (val, oldVal) {
                this.changeTimes++
                if(this.changeTimes>=1){
                    this.buttonGroup[1].disabled=true;
                    this.buttonGroup[2].disabled=true;
                    this.buttonGroup[3].disabled=false;
                    this.buttonGroup[4].disabled=false;
                    this.buttonGroup[5].disabled=false;
                }
        },
        deep:true
     },
    },
    methods: {
        checked(){
              let _this=this;
               _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // 单据类型
                _this.ouCode=res.result.ouCode
                _this.ifShow=true;
                console.log(res)
               })
           },
           //年份
           getYear() {
            let _this=this;
            var date = new Date();
            _this.includeYear = date.getFullYear()
          },

          btnClick(btn){
                if(btn=="取消"){//取消确认对话框
                    if((this.$route.params.id!="default"&&this.changeTimes<2)||(this.$route.params.id=="default"&&this.changeTimes<1)){//新增操作
                        this.$store.state.url='/ruleCode/ruleCodeList/default'
           		        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else{
                        this.dialogSetting.dialogName='cancelDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }
                }else if(btn=="保存"){
                    this.save();
                }else if(btn=="删除"){//删除确认对话框
                    this.dialogSetting.dialogName='delDialog'
                    this.dialogSetting.message="确定删除？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }else if(btn=="返回"){
                     if((this.$route.params.id!="default"&&this.changeTimes<2)||(this.$route.params.id=="default"&&this.changeTimes<1)){//新增操作
                       this.$store.state.url='/ruleCode/ruleCodeList/default'
                       this.$router.push({path:this.$store.state.url})//点击切换路由
                     }else{
                        this.dialogSetting.dialogName='cancelDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                     }
                }else if(btn=="保存并新增"){
                   this.saveAdd();
                }
            },
            getSelectData(){
                let _this=this;
               _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "BillType"}).then(function(res){
                // 单据类型
                _this.BillType=res.result;
                });
                // 状态下拉框
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                _this.status = res.result;
                },function(res){

                })
            },
        //---保存---------------------------------------------
        save(){
            let self=this;
                self.$validate().then(function(success) {
                if (success&&(self.addData.ruleCode != '' || self.addData.includeOu == true || self.addData.includeYear ==true|| self.addData.includeMonth ==true|| self.addData.includDay ==true)) {
                   self.$axios.posts('/api/services/app/BasBillcodeRuleManagement/Create',self.addData).then(function(res){
                        self.addData.id=res.result.id;
                        self.$store.state.url='/ruleCode/ruleCodeModify/'+res.result.id
                        self.$router.push({path:self.$store.state.url})
                        self.open('保存成功','el-icon-circle-check','successERP');
                        self.dialogUserConfirm=false;
                   }).catch(function(err){
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message=err.error.message;
                            self.errorTips.message=err.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;
                            self.isSave=false;
                    })
                }else{
                    $('.tipsWrapper').css({color:'red'})
                }
            });
        },
        saveAdd:function(){
            let self = this;
            self.$validate().then(function (success) {
                // console.log(success);
                if (success) {
                    self.$axios.posts('/api/services/app/BasBillcodeRuleManagement/Create',self.addData).then(function(res){
                         self.addData.id=res.result.id;
                         self.$store.state.url='/ruleCode/ruleCodeDetail/default'
                         self.$router.push({path:self.$store.state.url})
                         self.open('保存成功','el-icon-circle-check','successERP');
                          self.clearData();
                          self.validation.reset();
                          self.update=false;
                        //   self.firstModify=true;
                         console.log(self.firstModify)
                    },function(res){
                        // self.open('保存失败','el-icon-error','faildERP');
                        if(res && res!=''){
                        self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                        self.dialogUserConfirm=false;
                        self.errorMessage=true;
                    })
                }
            });
        },
        //----------------------------------------/api/services/app/User/Create---------------
        //---open---路由切换--------------------------------------
        open(tittle,iconClass,className) {
            this.$notify({
            position: 'bottom-right',
            iconClass:iconClass,
            title: tittle,
            showClose: false,
            duration: 3000,
            customClass:className
            });
        },
        // ----------------------------按钮组------------------------
        back(row){
            this.$store.state.url='/ruleCode/ruleCodeList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        sureDoing(){
            let self=this;
            if(self.choseDoing=='back'){
                self.back()
                self.dialogUserConfirm=false;
            }else if(self.choseDoing=='Cancel'){
                self.Cancel();
                self.dialogUserConfirm=false;
            }
            },
        Cancel(){
            let self=this;
            self.clearData();
            // self.update=false;
        },
        goModify:function(id){
            // console.log(id)
            this.$store.state.url='/ruleCode/ruleCodeModify/'+id
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){//点击新增跳转
            this.$store.state.url='/ruleCode/ruleCodeDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // 清除数据-------------------------
         clearData(){
          let self=this;
            self.addData={
                "billType": '',
                "ruleName": "",
                "codeLen": 3,
                "ruleCode": '',
                "includeOu":false,
                "includeYear": false,
                "includeMonth": false,
                "includDay": false,
                "id": 0,
                "status": 1,
            }
            self.validation.reset();
        },
         getErrorMessage(message,details,validationErrors){
            let _this=this;
            _this.response.message='';
            _this.response.details='';
            _this.response.validationErrors=[];
            if(details!=null && details){
                _this.response.details=details;
            }
            if(message!=null && message){
                _this.response.message=message;
            }
            if(message!=null && message){
                _this.response.validationErrors=validationErrors;
            }
        },
         dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"||this.$route.params.id=="self.detailParentId"||this.changeTimes>0){
                            this.changeTimes=0;
                            this.$store.state.url='/ruleCode/ruleCodeList/default'
                            this.$router.push({path:this.$store.state.url})//点击切换路由
                        }else{
                            // this.getDefault();
                        }
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="delDialog"){//删除确认操作
                        let _this=this;
                        _this.$axios.deletes('/api/services/app/ContactClassManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                            _this.$store.state.url='/ruleCode/ruleCodeList/default'
                            _this.$router.push({path:_this.$store.state.url})//点击切换路由
                            _this.open('删除成功','el-icon-circle-check','successERP');
                            _this.dialogVisible=false;
                        }).catch(function(err){
                            _this.dialogVisible=false;
                            _this.$message({
                                type: 'warning',
                                message: err.error.message
                            });
                        })
                    }else if(parmas.dialogName=="saveDialog"){//保存报错对话框
                        this.dialogVisible=false
                    }
                }else{
                    this.dialogVisible=false;
                }
            },
            dialogColse(){
                this.dialogVisible=false;
            },
             //月份
           getMonth() {
            let _this=this;
            var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            _this.includeMonth=month;
            _this.includDay=strDate;
            _this.currentdate = date.getFullYear()+ month
            console.log(_this.includeMonth)
            // return currentdate;
          },
          //天数
          getDay(){
             let _this=this;
            var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            _this.includeMonth=month;
            _this.includDay=strDate;
             _this.currentdateFull = date.getFullYear()+ month+strDate
             _this.includMonDay=month+strDate
            _this.includeYearDay = date.getFullYear()+strDate
        },
        filterMethod(query){
           this.filterKey=query; 
           console.log(this.filterKey)
       },
    },
     components:{
        dialogBox,
        buttonGroup
        }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}

.rulecode-detail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
.rulecode-detail .getPadding {
    padding: 0 10px;
}
 .rulecode-detail .el-row{
    background-color: #fff;
 }

 .rulecode-detail .el-row:last-child {
  padding-bottom: 15px;

 }
.el-tree-node__children{
  background-color: #fff;
}
  .rulecode-detail .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.rulecode-detail .bgcolor.longWidth{
    margin-right: 0;
    width: 421px;
    height:auto;
    float: left;
  }
  .marginAuto{
      margin: auto;
      width: 550px;
  }
  .error_tips{
      color: red;
      font-size: 12px;
      float: left;
      height: 35px;
      line-height: 35px;
  }
  .h35{
      line-height: 35px;
  }
  .rulecode-detail .bgcolor.longWidth .el-input,
  .rulecode-detail .bgcolor.longWidth .el-textarea,
  .rulecode-detail .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .rulecode-detail .bgcolor.longWidth label{
    width:80px;
  }
 .rulecode-detail .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 }
 .rulecode-detail .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.rulecode-detail .bgcolor.longWidth .add{
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 3px;
    background-color: #c7c7c7;
    color: #fff;
    text-align: center;
    line-height: 35px;
    text-decoration: none;
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
}
.rulecode-detail .bgcolor.longWidth .addRole{
  text-align: center;
  line-height: 35px;
  display: inline-block;
  width: 66px;
  height: 35px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.rulecode-detail .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.rulecode-detail .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.rulecode-detail .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
.rulecode-detail .bg-gray{
    background-color: #f2f2f2;
    margin-bottom: 15px;
}

.bg-gray .marginAuto{
    font-size:12px;

}
.bg-gray .longWidth{
    margin-right: 0;
    width: 421px;
    height: auto;
    float: left;
}
.bg-gray .longWidth label,.Times .longWidth label,.business .longWidth label{
    width: 80px;
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    height: 100%;
    float: left;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: bold;
    font-style: normal;
}
.Times .longWidth label,.business .longWidth label,.business span
{

    font-weight: 400;
    /* font-style: normal; */
    font-size: 12px
}
.business .longWidth label{
    height: 30px;
}
.el-radio,.el-checkbox{
    text-align: left;
}
.rulecode-detail .bgcolor.longWidth .codeLen{
    width: calc(100% - 350px)
}
.rulecode-detail .bgcolor.longWidth .ruleCode{
    width: calc(100% - 320px)
}
.unit{
    margin-left: 10px;
    line-height: 35px;
    width: 84px;
    height: 100%;

}
.rulecode-detail .longWidth .el-checkbox{
    width:20px;
}
.rulecode-detail .red-color{
    color: #f00;

}

/* .rulecode-detail .business span{
    line-height: 30px;

} */
</style>
<style>

</style>

