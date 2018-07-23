<template>
  <div class="customerClassDetail">
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
                       clearable filterable
                       :class="{redBorder : validation.hasError('addData.classParentId')}"
                       placeholder=""
                       v-model="addData.classParentId">
              <el-input placeholder="搜索..."
                        class="selectSearch"
                        v-model="parentSearch">
              </el-input>
              <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"
                       :data="selectParentTree"
                       v-loading="treeLoading"
                       :highlight-current="true"
                       :render-content="renderContent_moduleParentId"
                       :props="selectParentProps"
                       node-key="id"
                       ref="tree"
                       :filter-node-method="filterNode"
                       :default-expanded-keys="expand.expandId_addDataOu"
                       :expand-on-click-node="false"
                       @node-click="nodeClick"
              >
              </el-tree>

              <el-option  v-show="false" v-for="item in selectData.customerClass" :key="item.id" :label="item.className" :value="item.id" :date="item.id"></el-option>
            </el-select>
          </div>
          <div class="error_tips">{{ validation.firstError('addData.classParentId') }}</div>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="marginAuto">
          <div class="bgcolor longWidth">
            <label><small>*</small>客户分类编码</label>
            <el-input class="classCode"
                      :class="{redBorder : validation.hasError('addData.classCode')}"
                      v-model="addData.classCode">
            </el-input>
          </div>
          <div class="error_tips">{{ validation.firstError('addData.classCode') }}</div>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="marginAuto">
          <div class="bgcolor longWidth">
            <label><small>*</small>客户分类名称</label>
            <el-input  class="className"
                       :class="{redBorder : validation.hasError('addData.className')}"
                       v-model="addData.className"></el-input>
          </div>
          <div class="error_tips">{{ validation.firstError('addData.className') }}</div>
        </div>
      </el-col>

      <el-col :span="24">
        <div class="marginAuto">
          <div class="bgcolor longWidth">
            <label>备注</label>
            <el-input class="remark"
                      :class="{redBorder : validation.hasError('addData.remark')}"
                      v-model="addData.remark"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 4}">
            </el-input>
          </div>
          <div class="error_tips">{{ validation.firstError('addData.remark') }}</div>
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
import {GetDateTime} from '../../common/dom.js'//单页面增删改
    export default({
        data(){
            return{
                //---上级客户树--------
                selectParentTree:[],//选择上级客户
                parentSearch:'',//搜索上级客户
                selectParentProps:{
                    children: 'childNodes',
                    label: 'className',
                    id:'id'
                },
                parentItem:{
                    id:'',
                    className:'',
                },
                expandId:[],//默认展开kehu树节点
                status: [],//状态
                //------------------ 新增客户-------------
                addData:{
                    "groupId": 0,
                    "contactOwner": 1,
                    "classParentId": '',
                    "classCode": "",
                    "className": "",
                    "classFullname": "1",
                    "classFullPathId": "",
                    "classFullPathName": "",
                    "seq": 0,
                    "status": 1,
                    "remark": "",
                    "mnemonic": "1",

                    },
                    selectData:{//select数据
                        Status001:[],//启用状态
                        customerClass:[],//客户分类
                    },
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
                treeLoading: false,
                errorMessage:false,//错误信息提示
                detail_message_ifShow:false,
                isAddNew:'',//判断点击的是保存还是保存新增
                response:{
                    details:'',
                    message:'',
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
                isAdd:false,
                changeTimes:0,

            }
        },
     validators: {
      'addData.classParentId': function (value) {//上级客户分类，父id
         return this.Validator.value(value).integer();
      },
      'addData.classCode': function (value) {//客户分类编码
         return this.Validator.value(value).required().maxLength(20);
      },
      'addData.className': function (value) {//客户分类名称
         return this.Validator.value(value).required().maxLength(20);
      },
      'addData.remark': function (value) {//备注
          return this.Validator.value(value).maxLength(200);
      },
      'addData.status': function (value) {//状态
         return this.Validator.value(value).required().integer();
      },
    },
    // 创建-------
    created:function(){
            let self = this;
            self.loadParentTree();
            self.loadStatus();
            self.getDefault();
            self.getSelectData();
        },
    watch: {
        parentSearch(val) {
           this.$refs.tree.filter(val);
        },
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
          btnClick(btn){
                if(btn=="取消"){//取消确认对话框
                    if((this.$route.params.id!="default"&&this.changeTimes<2)||(this.$route.params.id=="default"&&this.changeTimes<1)){//新增操作
                        // this.$store.state.url='/customerClass/customerClassList/default'
                           // this.$router.push({path:this.$store.state.url})//点击切换路由
                           this.back();
                    }else{
                          this.dialogCancel();
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
                            this.back();
                     }else{
                            this.dialogCancel();
                     }
                }else if(btn="保存并新增"){
                   this.saveAdd();
                }
            },
            //对话框去取消
            dialogCancel(){
                this.dialogSetting.dialogName='cancelDialog'
                this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
            },
        getSelectData(){
            let _this=this;
           _this.$axios.gets('api/services/app/ContactClassManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){
            // 客户分类
            _this.selectData.customerClass=res.result.items;

            })
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
          defauleExpandTree(model,expandName,response,responseKey,children){
               let _this=this;
            if(model!=''){//model为树形下拉默认值，即渲染数据。如果存在，递归tree
                $.each(response,function(index,val){
                    if(val[responseKey]!==_this.addData[model]){
                        _this.expand[expandName]=[_this.addData[model]]
                    }else{
                        $.each(val[children],function(index1,val1){
                            if(val1[responseKey]==_this.addData[model]){
                                _this.expand[expandName]=[_this.addData[model]]
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
        //---加载数据上级商品树-------------------------------------------
        loadParentTree(){
            let self=this;
            self.treeLoading=true;
            self.$axios.gets('api/services/app/ContactClassManagement/GetTreeList',{Ower:1}).then(function(res){
                console.log(res)
                self.selectParentTree=res;
                self.treeLoading = false;
                self.defauleExpandTree('classParentId','expandId_addDataOu',res,'id','children')
                    if(self.expand.expandId_addDataOu<1){
                        self.expand.expandId_addDataOu=[self.selectParentTree[0].id]

                    }
                self.loadCheckSelect('classParentId',self.addData.classParentId)
            },function(res){
                self.treeLoading=false;

            })
        },
        getDefault(){
            let self=this;
            if(self.$route.params.id!="default"){
                self.addData.classParentId=parseInt(self.$route.params.id);
                self.parentItem.className = '111111';
                self.parentItem.id=self.$route.params.id;
            }
        },
        //加载状态下拉框
        loadStatus:function(){
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                // console.log(res)
            self.status = res.result;
            },function(res){

            })
        },
        //---保存---------------------------------------------
           save(){
            let self=this;
                self.$validate().then(function (success) {
                if (success) {
                   self.$axios.posts('/api/services/app/ContactClassManagement/Create',self.addData).then(function(res){
                        self.addData.id=res.result.id;
                        self.goModify(res.result.id)
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
                }
            });
        },
        // ------------------------------保存并新增---------------------------------------
        saveAdd:function(){
            let self = this;
            self.$validate().then(function (success) {
                if (success) {
                    self.$axios.posts('/api/services/app/ContactClassManagement/Create',self.addData).then(function(res){
                            self.addData.id=res.result.id;
                            self.open('保存成功','el-icon-circle-check','successERP');
                            self.goDetail();
                            self.clearData();
                            self.validation.reset();
                            self.update=false;
                    },function(res){
                        if(res && res!=''){
                        self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                        self.dialogUserConfirm=false;
                        self.errorMessage=true;
                    })
                }
            });
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
        // ----------------------------返回按钮组------------------------
        back(){
            this.$store.state.url='/customerClass/customerClassList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // ---------------------------------点击保存--------------------
        goModify:function(id){
            this.$store.state.url='/customerClass/customerClassModify/'+id
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // ---------------------------点击新增--------------------------
        goDetail(){//点击新增跳转
            this.$store.state.url='/customerClass/customerClassDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // 清除数据-------------------------
         clearData(){
          let self=this;
            self.addData={
                "groupId": 0,
                "contactOwner": 1,
                "classParentId": '',
                "classCode": "",
                "className": "",
                "classFullname": "1",
                "classFullPathId": "",
                "classFullPathName": "",
                "seq": 0,
                "status": 1,
                "remark": "",
                "mnemonic": "1",
            }
            self.validation.reset();
        },
        //---下拉树------------------------------------------------.
        filterNode(value, data) {
            // console.log(data)
            if (!value) return true;
                return data.className.indexOf(value) !== -1;
        },
        // -------------------------点击树形---------------------------------------
        nodeClick:function(data,node,self){
            let _this = this;
            _this.parentItem.id = data.id;
            _this.parentItem.className = data.className;
            $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                if($(this).attr('date')==data.id){
                    $(this).click()
                }
            })
             $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,})
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
        // -----------------------------------对话框-----------------------------------------
         dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"||this.$route.params.id=="self.detailParentId"||this.changeTimes>0){
                            this.changeTimes=0;
                            this.$store.state.url='/customerClass/customerClassList/default'
                            this.$router.push({path:this.$store.state.url})//点击切换路由
                        }else{
                            this.getDefault();
                        }
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="delDialog"){//删除确认操作
                        let _this=this;
                        _this.$axios.deletes('/api/services/app/ContactClassManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                            _this.back();
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
    },
     components:{
        buttonGroup,
        Table,
        dialogBox,
        Tree
        }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}

.customerClassDetail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
.customerClassDetail .getPadding {
    padding: 0 10px;
}
 .customerClassDetail .el-row{
    background-color: #fff;
 }

 .customerClassDetail .el-row:last-child {
  padding-bottom: 15px;

 }
.el-tree-node__children{
  background-color: #fff;
}
  .customerClassDetail .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.customerClassDetail .bgcolor.longWidth{
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
  .customerClassDetail .bgcolor.longWidth .el-input,
  .customerClassDetail .bgcolor.longWidth .el-textarea,
  .customerClassDetail .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .customerClassDetail .bgcolor.longWidth label{
    width:80px;
  }
 .customerClassDetail .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 }
 .customerClassDetail .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.customerClassDetail .bgcolor.longWidth .add{
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
.customerClassDetail .bgcolor.longWidth .addRole{
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
.customerClassDetail .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.customerClassDetail .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.customerClassDetail .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
</style>

