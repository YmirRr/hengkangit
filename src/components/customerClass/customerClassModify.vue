<template>
    <div class="customerClassModify">
        <el-row class="fixed">
            <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
            </div>
        </el-row>

        <el-row class="pt20">
            <el-col :span="24">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>上级客户分类</label>
                        <el-select class="classParentId" 
                                   clearable
                                   :class="{redBorder : validation.hasError('customerClassData.classParentId')}" 
                                   placeholder=""            
                                   @change='Modify'
                                   v-model="customerClassData.classParentId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="parentSearch">
                             </el-input>
                             
                            <el-tree :default-expanded-keys="expand.expandId_addDataOu"
                                     :data="selectParentTree"
                                     :highlight-current="true"
                                     :props="selectParentProps"
                                     node-key="id"  
                                     ref="tree"
                                     :filter-node-method="filterNode"
                                     :expand-on-click-node="false"
                                     :render-content="renderContent_moduleParentId"
                                     @node-click="nodeClick">
                            </el-tree>
                            <el-option v-show="false"
                                       :key="parentItem.id" 
                                       :label="parentItem.className" 
                                       :value="parentItem.id"
                                       >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('customerClassData.classParentId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>客户分类编码</label>
                        <el-input class="classCode" 
                                  placeholder=""
                                  @change='Modify'
                                  :class="{redBorder : validation.hasError('customerClassData.classCode')}" 
                                  v-model="customerClassData.classCode"></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('customerClassData.classCode') }}</div>
                </div>    
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>客户分类名称</label>
                        <el-input  class="className"
                                   :class="{redBorder : validation.hasError('customerClassData.className')}" 
                                   v-model="customerClassData.className"
                                   placeholder=""
                                   @change='Modify'>
                         </el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('customerClassData.className') }}</div>
                </div>    
            </el-col>
     
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>备注</label>
                        <el-input class="remark"
                                  :class="{redBorder : validation.hasError('customerClassData.remark')}" 
                                  v-model="customerClassData.remark"
                                  type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4}"
                                  @change='Modify'></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('customerClassData.remark') }}</div>
                </div>       
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>状态</label>
                        <el-select  class="status"
                                     clearable filterable
                                    :class="{redBorder : validation.hasError('customerClassData.status')}" 
                                    placeholder=""
                                    v-model="customerClassData.status">
                            <el-option v-for="item in status" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue"
                                       @change='Modify'>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('customerClassData.status') }}</div>
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
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
export default {
  created: function() {
  },
  mounted:function(){
    let self = this;
    self.loadData();
    self.loadParentTree();
    self.loadStatus();
    },
  computed: {
  },
  watch: {
    parentSearch(val) {
      this.$refs.tree.filter(val);
    },
      customerClassData:{
          handler: function (val, oldVal) {
              this.changeTimes++
              if(this.changeTimes>=2){
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
  data() {
    return {
      ifModify: false, //判断是否修改过
      firstModify:false,//进入页面数据改变一次
      //---上级客户树--------
      selectParentTree: [], //选择上级客户分类
      parentSearch: "", //搜索上级客户分类
      selectParentProps: {
        children: "childNodes",
        label: "className",
        id: "id"
      },
      parentItem: {
        id: "",
        className: ""
      },
      //--------------------
      status: [],
      customerClassData: {
        id: "",
        groupId: 1,
        classCode: "",
        className: "",
        classParentId: "",
        classParentId_ClassName:"",
        remark: "",
        status: "",
      },
      //---确认删除-----------------
      dialogDelConfirm: false, //用户删除保存提示信息
      //---信息修改提示框------------
      dialogUserConfirm: false, //信息更改提示控制
      option: {
        vRail: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        vBar: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        hRail: {
          height: "0"
        }
      },
      errorMessage: false,
      response: {
        details: "",
        message: "",
        validationErrors: []
      },
      //审计信息
      auditInfo:{
          createdBy:"",
          createdTime:"",
          modifiedBy:"",
          modifiedTime:"",
       },
       expand:{
            expandId_addDataOu:[],//默认下拉树形展开id
            isHere_addDataOu:false,//是否存在id于树形
            expandId_dialogOu:[],//默认dialog组织树形展开id
            expandId_mmenu:[],//默认分配功能树形展开id
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
                //dialogVisible:false,//对话框是否显示
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
                isUpdate:false,//是否修改
                isAdd:false,
                changeTimes:0,
    };
  },
  validators: {
    "customerClassData.classParentId": function(value) {
      //上级客户分类
      return this.Validator.value(value) .integer();
    },
    "customerClassData.classCode": function(value) {
      //客户分类编码
      return this.Validator.value(value).required().maxLength(20);
    },
    "customerClassData.className": function(value) {
      //客户分类名称
      return this.Validator.value(value).required().maxLength(20);
    },
    "customerClassData.status": function(value) {
      //状态
      return this.Validator.value(value).required().integer();
    }
  },
  methods: {
     btnClick(btn){             
                if(btn=="取消"){//取消确认对话框
                    if(this.$route.params.id=="default"&&this.changeTimes<2){//新增操作
                        this.back();
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
                  console.log(this.changeTimes);
                    if(this.$route.params.id!=="default"&&this.changeTimes<2){//新增操作
                       this.back();
                    }else if(this.$route.params.id!=="default"&&this.changeTimes>2){
                       this.back();
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
    //---加载数据---------------------------------------------
    loadData: function() {
      //根据id加载信息
      let self = this;
      if (self.$route.params.id != "default") {
            self.firstModify = false;
            self.$axios.gets("/api/services/app/ContactClassManagement/Get", {id: self.$route.params.id}).then(function(res) {
            self.customerClassData = res.result;
            self.parentItem.id = res.result.classParentId;
            self.parentItem.className =  res.result.classParentId_ClassName;
            self.auditInfo={
                    createdBy:res.result.createdBy,
                    createdTime:res.result.createdTime,
                    modifiedBy:res.result.modifiedBy,
                    modifiedTime:res.result.modifiedTime,
                }
          });
          self.$axios.gets("api/services/app/ContactClassManagement/GetTreeList",{Ower:1}).then(function(res) {
             self.selectParentTree = res;
             self.defauleExpandTree('classParentId','expandId_addDataOu',res,'id','children')
                if(self.expand.expandId_addDataOu<1){
                    self.expand.expandId_addDataOu=[self.selectParentTree[0].id]
                   
                }
            self.loadCheckSelect('classParentId',self.customerClassData.classParentId);
          },
          function(res) {
          }
        );
      }
    },
    defauleExpandTree(model,expandName,response,responseKey,children){
            let _this=this;
            if(model!=''){//model为树形下拉默认值，即渲染数据。如果存在，递归tree
                $.each(response,function(index,val){
                    if(val[responseKey]!==_this.customerClassData[model]){
                        _this.expand[expandName]=[_this.customerClassData[model]]
                    }else{
                        $.each(val[children],function(index1,val1){
                            if(val1[responseKey]==_this.customerClassData[model]){
                                _this.expand[expandName]=[_this.customerClassData[model]]
                            }else{
                                _this.defauleExpandTree(model,expandName,val1[children],responseKey,children)
                            }
                        })
                    }
                })
            }else{
                 $.each(response,function(index,value){
                    if(index==0){
                        if(typeof(value)!='undefined'&&value!=null&&value[responseKey]!=null&&value[responseKey]!=''&&typeof(value[responseKey])!='undefined'){
                            _this.expand[expandName]=[value[responseKey]]
                        }
                        
                    }
                })
   
            }
        },
    loadParentTree() {
      let self = this;
      self.treeLoading = true;
      self.$axios
        .gets("api/services/app/ContactClassManagement/GetTreeList",{Ower:1})
        .then(
          function(res) {
             self.selectParentTree = res;
             self.defauleExpandTree('classParentId','expandId_addDataOu',res,'id','children')
                if(self.expand.expandId_addDataOu<1){
                    self.expand.expandId_addDataOu=[self.selectParentTree[0].id]
                   
                }
               
            self.loadCheckSelect('classParentId',self.customerClassData.classParentId);
          },
          function(res) {
          }
        );
    },
    loadStatus: function() {
      //加载状态下拉框
      let self = this;
      self.$axios.gets("/api/services/app/DataDictionary/GetDictItem", { dictName: "Status001"}).then(function(res) {
            self.status = res.result;
          },
          function(res) {}
        );
    },
      loadCheckSelect(selectName,key){
          let _this=this;
          _this.$nextTick(function () { 
              $('.'+selectName+' .el-tree-node__label').each(function(){
                    if($(this).attr('data-id')==key){
                      $(this).click()
                  }
              })
          })
      },
    //-------------------------------------------------------
    //---树--------------------------------------------------
    filterNode(value, data) {
      // console.log(data)
      if (!value) return true;
      return data.className.indexOf(value) !== -1;
    },
    nodeClick(data,node,self) {
      let _this = this;
      _this.parentItem.id = data.id;
      _this.parentItem.className = data.className;
      self.$nextTick(function() {
        $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
      });
    },
    //---保存新增---------------------------------------------
    Modify: function() {
      //判断数据是否修改过
      let self = this;
      self.ifModify = true;
    },
    //------------------保存修改---------------------------
    save() {                                                                                                                                                                                                                                                                                                                                                                                                                               
      let self = this;
        self.customerClassData.id = self.$route.params.id;
        self.$validate().then(function(success) {
          if (success) {self.$axios.puts("/api/services/app/ContactClassManagement/Update", self.customerClassData).then(function(res) {
             self.auditInfo={
                      createdBy:res.result.createdBy,
                      createdTime:res.result.createdTime,
                      modifiedBy:res.result.modifiedBy,
                      modifiedTime:res.result.modifiedTime,
              }
             self.open("修改成功", "el-icon-circle-check", "successERP");
                // 修改成功，点返回不弹出对话框
                self.ifModify = false;
                self.buttonGroup[1].disabled=false;//新增按钮
                self.buttonGroup[2].disabled=false;//删除按钮
                self.buttonGroup[3].disabled=true;//保存按钮
                self.buttonGroup[4].disabled=true;//保存并新增按钮
                self.buttonGroup[5].disabled=true;//取消按钮
                self.changeTimes=1;       
            },function(res) {
                   if(res && res!=''){ 
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    }
                    self.dialogUserConfirm=false;
                    self.errorMessage=true;
                }
              );
          }
        });
    },
    //----------------保存修改并新增---------------------
    saveAdd: function() {
      let self = this;
      if ((self.ifModify = true)) {
        self.customerClassData.id = self.$route.params.id;
        self.$validate().then(function(success) {
          if (success) {
            self.$axios.puts("/api/services/app/ContactClassManagement/Update", self.customerClassData).then(function(res) {
                  self.ifModify = false;
                  self.goDetail();
                  self.open("修改成功", "el-icon-circle-check", "successERP");
            },function(res) {
                  if(res && res!=''){ 
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    }
                    self.dialogUserConfirm=false;
                    self.errorMessage=true;
                }
              );
          }
        });
      }
    },
    //---确认删除--------------------------------------------
    sureDel: function() {
      let self = this;
      self.$axios.deletes("/api/services/app/ContactClassManagement/Delete", {id: self.$route.params.id}).then(function(res) {
            self.open("删除客户成功", "el-icon-circle-check", "successERP");
            self.back();
            self.dialogDelConfirm = false;
          }, function(res) {
              self.dialogDelConfirm = false;
              self.errorMessage = true;
              self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
          }
        );
    },
   
    //---open---路由切换--------------------------------------
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
    back(){
      this.$store.state.url = "/customerClass/customerClassList/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    goModify: function(id) {
      this.$store.state.url = "/customerClass/customerClassModify/" + id;
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    goDetail() {
      //点击新增跳转
      this.$store.state.url = "/customerClass/customerClassDetail/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
        getErrorMessage(message,details,validationErrors){
                let self=this;
                self.response.message='';
                self.response.details='';
                self.response.validationErrors=[];
                if(details!=null && details){
                    self.response.details=details;
                }
                if(message!=null && message){
                    self.response.message=message;
                }
                if(message!=null && message){
                    self.response.validationErrors=validationErrors;
                }
            },
          renderContent_moduleParentId(h, { node, data, store }){
            if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }else{
                  return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }
    },
    dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"){
                            this.validation.reset();                 
                            this.goDetail()
                        }else{
                            this.loadData();
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
                        _this.$axios.deletes('/api/services/app/ContactClassManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                            _this.open('删除成功','el-icon-circle-check','successERP'); 
                            _this.back();
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
                          this.back();
                    }
                }else{
                    this.dialogVisible=false; 
                }
            },
            dialogColse(){
                this.dialogVisible=false;
            },
    //------------------------------------------------------
  },
  components:{
    buttonGroup,
    Table,
    dialogBox,
    Tree
        }
};
</script>



<style scoped>
.pt15 {
  padding-top: 15px;
}
.customerClassModify .errorTips {
  margin-bottom: 10px;
  margin-top: -10px;
}
.customerClassModify .el-row {
    background-color: #fff;
}
.el-select-dropdown__list{
  background-color: #fff;
}
.dialog_confirm_message .el-dialog__footer .dialog_footer_bt_long {
    width: 100%;
}
.dialog_confirm_message .el-dialog__footer .dialog_footer_bt_long{
    color: #ccc;
}
.customerClassModify .getPadding {
    padding: 0 10px;
}
.customerClassModify .el-row:last-child {
  padding-bottom: 15px;
}
.customerClassModify .bgcolor .isGive {
  display: block;
  float: left;
  height: 100%;
  line-height: 35px;
}
.customerClassModify .bgcolor.longWidth {
  margin-right: 0;
  width: 421px;
  height: auto;
  float: left;
}
.marginAuto {
  margin: auto;
  width: 550px;
}
.error_tips {
  color: red;
  font-size: 12px;
  float: left;
  height: 35px;
  line-height: 35px;
}
.customerClassModify .bgcolor.longWidth .el-input,
.customerClassModify .bgcolor.longWidth .el-textarea,
.customerClassModify .bgcolor.longWidth .el-select {
  width: calc(100% - 90px);
}
.customerClassModify .bgcolor.longWidth label {
  width: 80px;
}
.customerClassModify .bgcolor.longWidth .el-textarea {
  font-size: 12px;
}
.customerClassModify .bgcolor.longWidth .addZoo {
  float: left;
  width: calc(100% - 82px);
}
.customerClassModify .bgcolor.longWidth .add {
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
.customerClassModify .bgcolor.longWidth .addRole {
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
.customerClassModify .bgcolor.longWidth .add:hover {
  background-color: #354052;
}
.customerClassModify .bgcolor.longWidth .addRole i {
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.customerClassModify .bgcolor.longWidth .addRole:hover i {
  color: #f66;
}
</style>
<style>
.customerClassModify .el-input__inner {
  height: 35px !important;
}
</style>


