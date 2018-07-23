<template>
    <div class="rulecode-modify">
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
                        <el-select clearable filterable :class="{redBorder : validation.hasError('addData.billType')}"v-model="addData.billType" :filter-method="filterMethod">
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
                        <el-input class="rulenName" 
                                 
                                  v-model="addData.rulenName">
                        </el-input>
                    </div>
                  
                </div>    
            </el-col>
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>状态</label>
                        <el-select class="status"
                                     clearable filterable
                                     :class="{redBorder : validation.hasError('addData.status')}"
                                    placeholder=""
                                    v-model="addData.status">
                            <el-option v-for="item in status" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue"
                                      >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.status') }}</div>
                </div>    
            </el-col>
            <el-col :span="24" class="bg-gray">
                <div class="marginAuto">
                    <div class="longWidth">
                        <label>编码前缀设置</label> 
                        <span class="red-color">此项为必选项</span>
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
                        <el-checkbox v-model="addData.includeOu"></el-checkbox>
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
                            <el-checkbox label="年" v-model="addData.includeYear"></el-checkbox>
                            <el-checkbox label="月" v-model="addData.includeMonth"></el-checkbox>
                            <el-checkbox label="日" v-model="addData.includDay"></el-checkbox>
                    </div>
                </div>    
            </el-col>
             <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth mt15">
                        <label>最短流水号</label>
                        <el-input class="codeLen" v-model="addData.codeLen" :class="{redBorder : validation.hasError('addData.codeLen')}" >
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
                        <span class="red-color">前缀&nbsp;&nbsp;- &nbsp;&nbsp;业务组织 &nbsp;&nbsp;-&nbsp;&nbsp;年月日&nbsp;&nbsp;-&nbsp;&nbsp;流水号</span><br/>   
                        <label>&nbsp;&nbsp;</label><span class="red-color">HK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bsgj&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20180502&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;001</span>               
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
import {FILTER_MOTHED} from '../../common/common.js'
    export default({
        data(){
            return{
                //------------------ 新增客户-------------
                addData:{         
                    "billType": 0,
                    "rulenName": "",
                    "codeLen": 3,
                    "ruleCode": '',
                    "includeYear": false,
                    "includeMonth": false,
                    "includDay": false,
                    "status": "",
                    "includeOu":false,
                    "id": ""
                    },

                selectData:{//select数据
                        Status001:[],//启用状态
                        BillType:[],//客户分类
                    },
                auditInfo:{
                        createdBy:"",
                        createdTime:"",
                        modifiedBy:"",
                        modifiedTime:"",
                    },
                ifModify: false, //判断是否修改过
                choseDoing:'',//存储点击按钮判断信息
                dialogUserConfirm:false,//信息更改提示控制
                update:false,
                firstModify:false,
                treeLoading: false,
                errorMessage:false,//错误信息提示
                detail_message_ifShow:false,
                isAddNew:'',//判断点击的是保存还是保存新增
                response:{
                    details:'',
                    message:'',
                },
              status:[],
              buttonGroup:[{
                    text:'返回',
                    class:'bt_back',
                    icon:'icon-fanhui',
                    disabled:false,
                },{
                    text:'新增',
                    class:'bt_add',
                    icon:'icon-xinzeng',
                    disabled:false,
                },{
                    text:'删除',
                    class:'bt_del',
                    icon:'icon-shanchu',
                    disabled:false,
                },{
                    text:'保存',
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:true,
                },{
                    text:'保存并新增',
                    class:'bt_saveAdd',
                    icon:'icon-baocunxinzeng',
                    disabled:true,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:true,
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
                filterKey:''

            }
        },
     validators: {
      'addData.codeLen': function (value) {//上级客户分类，父id
           return this.Validator.value(value).integer().custom(function () {
            if (value<3) {
                return '必须是大于3整数'
            }
          });
      },
       'addData.status':function (value) {
         return this.Validator.value(value).required();
      },
       'addData.billType':function (value) {
         return this.Validator.value(value).required();
      },
       'addData.ruleCode':function (value) {
         return this.Validator.value(value).required();
      }

    },
    // 创建-------
    created:function(){
            let self = this;
            self.loadStatus();
            self.getModifyData();//根据id获取数据
            self.getSelectData();
            
        },
    computed:{
       BillType1: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.selectData.BillType)
      },
   },
    watch: {
        parentSearch(val) {
           this.$refs.tree.filter(val);
        },
        addData:{
            handler: function (val, oldVal) {
                this.changeTimes++
                console.log(this.changeTimes)
                if(this.changeTimes>1){
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
         filterMethod(query){
           this.filterKey=query; 
       },
        getSelectData(){
            let _this=this;
           //单据类型下拉列表
           _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "BillType"}).then(function(res){ 
            // 客户分类
            _this.selectData.BillType=res.result;
           
            })
        },
        loadStatus: function() {
      //加载状态下拉框
         let self = this;
         self.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "Status001"}).then(function(res) {
            self.status = res.result;
          },
          function(res) {}
        );
    },
        getModifyData(){
            let _this=this;
             _this.$axios.gets('/api/services/app/BasBillcodeRuleManagement/Get',{Id:_this.$route.params.id})
            .then(function(res){
                _this.auditInfo={//审计信息
                    createdBy:res.result.createdBy,
                    createdTime:res.result.createdTime,
                    modifiedBy:res.result.modifiedBy,
                    modifiedTime:res.result.modifiedTime,
                }
                _this.addData=res.result;
                },function(res){
            })
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
                     if(this.$route.params.id!=="default"&&this.changeTimes<2){//新增操作
                        this.$store.state.url='/ruleCode/ruleCodeList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else if(this.$route.params.id!=="default"&&this.changeTimes>2){
                        this.$store.state.url='/ruleCode/ruleCodeList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else{
                       this.dialogSetting.dialogName='backDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }
                }else if(btn=="保存并新增"){
                   this.saveAdd();
                }else if(btn=="新增"){
                  this.goDetail();
                }
            },

        //---保存---------------------------------------------
           save(){
            let self=this; 
                self.$validate().then(function (success) {
                if (success) {
                   self.$axios.puts('/api/services/app/BasBillcodeRuleManagement/Update',self.addData).then(function(res){  
                        self.auditInfo={//审计信息
                        createdBy:res.result.createdBy,
                        createdTime:res.result.createdTime,
                        modifiedBy:res.result.modifiedBy,
                        modifiedTime:res.result.modifiedTime,
                        
                       } 
                        self.open('保存成功','el-icon-circle-check','successERP');
                        self.dialogUserConfirm=false;
                        self.ifModify=false;
                        self.buttonGroup[1].disabled=false;//新增按钮
                        self.buttonGroup[2].disabled=false;//删除按钮
                        self.buttonGroup[3].disabled=true;//保存按钮
                        self.buttonGroup[4].disabled=true;//保存并新增按钮
                        self.buttonGroup[5].disabled=true;//取消按钮 
                        self.changeTimes=1;
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
                }
            });
        },
        saveAdd:function(){
            let self = this;
            if ((self.ifModify = true)) {
            self.addData.id = self.$route.params.id;
            self.$validate().then(function (success) {
                if (success) {
                    self.$axios.puts('/api/services/app/BasBillcodeRuleManagement/Update',self.addData).then(function(res){  
                          self.open('保存成功','el-icon-circle-check','successERP');
                          self.clearData();
                          self.validation.reset();
                          self.update=false;
                          self.goDetail();
                         console.log(self.firstModify)
                    },function(res){    
                        if(res && res!=''){ 
                        self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                        self.dialogUserConfirm=false;
                        self.errorMessage=true;
                    })
                }
             });
      }
    },
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
        goDetail(){//点击新增跳转
            this.$store.state.url='/ruleCode/ruleCodeDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // 清除数据-------------------------
         clearData(){
          let self=this;
            self.addData={
                "billType": 0,
                "rulenName": "",
                "codeLen": 3,
                "ruleCode": '',
                "includeYear": false,
                "includeMonth": false,
                "includDay": false,
                "includeOu":false,
                "id": 0
            }
            self.validation.reset(); 
        },
         dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"){  
                          this.validation.reset();                 
                          this.goDetail()
                        }else{
                            this.getModifyData();
                        }
                        this.changeTimes=0;
                        this.buttonGroup[1].disabled=false;//新增按钮
                        this.buttonGroup[2].disabled=false;//删除按钮
                        this.buttonGroup[3].disabled=true;//保存按钮
                        this.buttonGroup[4].disabled=true;//保存并新增按钮
                        this.buttonGroup[5].disabled=true;//取消按钮
                        this.dialogVisible=false; 
                    }else if(parmas.dialogName=="delDialog"){//删除确认操作
                        let _this=this;
                        _this.$axios.deletes('/api/services/app/BasBillcodeRuleManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
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
                    }else if(parmas.dialogName=="backDialog"){//返回主页面对话框
                         this.$store.state.url='/ruleCode/ruleCodeList/default'
                         this.$router.push({path:this.$store.state.url})//点击切换路由
                    }
                }else{
                    this.dialogVisible=false; 
                }
            },
            dialogColse(){
                this.dialogVisible=false;
            },
    },
     components:{
        buttonGroup,
        dialogBox,
        }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}

.rulecode-modify  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
.rulecode-modify .getPadding {
    padding: 0 10px;
}
 .rulecode-modify .el-row{
    background-color: #fff;
 }

 .rulecode-modify .el-row:last-child {
  padding-bottom: 15px;

 }
.el-tree-node__children{
  background-color: #fff;
}
  .rulecode-modify .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.rulecode-modify .bgcolor.longWidth{
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
  .rulecode-modify .bgcolor.longWidth .el-input,
  .rulecode-modify .bgcolor.longWidth .el-textarea,
  .rulecode-modify .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .rulecode-modify .bgcolor.longWidth label{
    width:80px;
  }
 .rulecode-modify .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 } 
 .rulecode-modify .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.rulecode-modify .bgcolor.longWidth .add{
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
.rulecode-modify .bgcolor.longWidth .addRole{
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
.rulecode-modify .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.rulecode-modify .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.rulecode-modify .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
.rulecode-modify .bg-gray{
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
.rulecode-modify .bgcolor.longWidth .codeLen{
    width: calc(100% - 350px)
}
.rulecode-modify .bgcolor.longWidth .ruleCode{
    width: calc(100% - 320px)
}
.unit{
    margin-left: 10px;
    line-height: 35px;
    width: 84px;
    height: 100%;

}
.rulecode-modify .longWidth .el-checkbox{
    width:20px;
}
.rulecode-modify .red-color{
    color: #f00;
    line-height: 35px;
}
/* .rulecode-modify .business span{
    line-height: 30px;
    
} */
</style>
<style>

</style>

