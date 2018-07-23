<template>
    <div class="departmentDetail">
        <el-row class="fixed">
            <el-col :span="24" >
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>

        <el-row class="pb10">
            <el-col :span="24" class="pt15">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>所属组织</label>
                        <el-select class="ouId" 
                                   :class="{redBorder : validation.hasError('addData.ouId')}" 
                                   placeholder=""
                                   @change='Modify()'
                                   v-model="addData.ouId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="ouSearch"></el-input>

                            <el-tree :data="ouAr"
                                     :props="selectOuProps"
                                     node-key="id"
                                     :render-content="ouRenderContent"
                                     :default-expanded-keys="ouExpandId"
                                     ref="outree"
                                     :filter-node-method="ouFilterNode"
                                     :expand-on-click-node="false"
                                     @node-click="ouNodeClick"></el-tree> 

                            <el-option v-show="false"
                                       :key="countOu.id" 
                                       :label="countOu.ouFullname" 
                                       :value="countOu.id"
                                       id="ou_confirmSelect"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.ouId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>上级部门</label>
                        <el-select class="deptParentid" 
                                   placeholder=""
                                   @change='Modify()'
                                   v-model="addData.deptParentid">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="parentSearch"></el-input>
                            <el-tree :data="selectParentTree"
                                     :props="selectParentProps"
                                     node-key="id"
                                     :render-content="dpRenderContent"
                                     :default-expanded-keys="dpExpandId"
                                     ref="dptree"
                                     :filter-node-method="dpFilterNode"
                                     :expand-on-click-node="false"
                                     @node-click="nodeClick"></el-tree>

                            <el-option v-show="false"
                                       :key="count.id" 
                                       :label="count.name" 
                                       :value="count.id"
                                       id="businessDetail_confirmSelect"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>部门编码</label>
                        <el-input class="deptCode" 
                                  @change='Modify()'
                                  :class="{redBorder : validation.hasError('addData.deptCode')}" 
                                  v-model="addData.deptCode"></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.deptCode') }}</div>
                </div>    
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>部门名称</label>
                        <el-input  class="deptName"
                                   @change='Modify()' 
                                   :class="{redBorder : validation.hasError('addData.deptName')}" 
                                   v-model="addData.deptName"></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.deptName') }}</div>
                </div>    
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>负责人</label>
                        <el-input class="manager" 
                                  :class="{redBorder : validation.hasError('addData.manager')}"
                                  @change='Modify()' 
                                  v-model="addData.manager"  
                        ></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.manager') }}</div>
                </div>   
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>备注</label>
                        <el-input class="remark" 
                                  :class="{redBorder : validation.hasError('addData.remark')}" 
                                  v-model="addData.remark"
                                  @change='Modify()'
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
                                    :class="{redBorder : validation.hasError('addData.status')}" 
                                    placeholder=""
                                    @change='Modify()'
                                    v-model="addData.status">
                            <el-option v-for="item in status" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.status') }}</div>
                </div>    
            </el-col>
        </el-row>

        <el-row class="ft12 pr10 pt10 br3 bt1 mt10">
            <el-col :span='24' class="pl10 pt10 pb10">
                <span style="color:black;font-size:16px;">审计信息</span>
            </el-col>

            <el-col :span="24" class="pb10">   
                <div>
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="addData.createdBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="addData.createdTime" :disabled="true"></el-input>                      
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="addData.modifiedBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="addData.modifiedTime" :disabled="true"></el-input>                                              
                    </div>
                </div> 
            </el-col>
        </el-row> 


        <!-- dialog数据变动提示 -->
        <!-- <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog> -->
        <!-- dialog -->

        <!-- dialog错误信息提示 -->
        <!-- <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">数据提交有误!</p>
                </el-col>
                <el-collapse-transition>
                    
                        <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                            <vue-scroll :ops="option">
                                <span class="dialog_font">{{response.message}}</span>
                                <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                                <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                            </vue-scroll> 
                        </el-col>
                      
                </el-collapse-transition>   
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">取 消</button>
            </span>
        </el-dialog> -->
        <!-- dialog --> 
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     

    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
    export default({
        components:{
            buttonGroup,
            dialogBox
        },
        data(){
            return{
                ifModify:false,//判断是否修改过
                defaultOuId:'',
                //---所属组织--------
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouFullname:'',
                },
                ouAr:[],//所属组织下拉框
                ouExpandId:[],
                //--------------------
                //---上级部门树--------
                selectParentTree:[],//选择上级部门
                parentSearch:'',//搜索上级部门
                selectParentProps:{
                    children: 'children',
                    label: 'name',
                    id:'id'
                },
                parentItem:{
                    id:'',
                    name:'',
                },
                dpExpandId:[],
                //--------------------

                status: [],
                addData:{
                    "ouId": '',
                    "deptCode": "",
                    "deptName": "",
                    "manager": "",
                    "deptParentid": '',
                    "remark": "",
                    "status": 1,
                    "modifiedBy":'',
                    "modifiedTime":'',
                    "createdBy":'',
                    "createdTime":''
                },

                //---信息修改提示框------------
                dialogUserConfirm:false,//信息更改提示控制
                //----------------------------
                //---错误提示框----------------
                option: {
                    vRail: {
                        width: '5px',
                        pos: 'right',
                        background: "#9093994d",
                    },
                    vBar: {
                        width: '5px',
                        pos: 'right',
                        background: '#9093994d',
                    },
                    hRail: {
                        height: '0',
                    },
                },
                errorMessage:false,
                detail_message_ifShow:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                //-----------------------------
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
                // 新增删除保存保持现状取消
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
                    class:'bt_saveAdd',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'保存并新增',
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:false,
                }],//按钮组
            }
        },
     validators: {
      'addData.ouId': function (value) {//所属组织
         return this.Validator.value(value).required().integer();
      },
    //   'addData.deptParentid': function (value) {//上级部门
    //      return this.Validator.value(value).required().integer();
    //   },
      'addData.deptCode': function (value) {//部门编码
         return this.Validator.value(value).required().maxLength(20);
      },
      'addData.deptName': function (value) {//部门名称
         return this.Validator.value(value).required().maxLength(20);
      },
      'addData.manager': function (value) {//负责人
          return this.Validator.value(value).maxLength(20);
      },
      'addData.remark': function (value) {//备注
          return this.Validator.value(value).maxLength(200);
      },
      'addData.status': function (value) {//状态
         return this.Validator.value(value).required().integer();
      },
    },
    created:function(){
            let self = this;
            self.loadOuTree();
            // self.loadParentTree();
            self.loadStatus();
        },
    computed:{
        countOu () {
            return this.ouItem;
            },
        count () {
            return this.parentItem;
            },
    },  
    watch:{
        ouSearch(val){
            this.$refs.outree.filter(val)
        },
        parentSearch(val){
            this.$refs.dptree.filter(val)
        }
    },
    methods: {
        //---加载数据-------------------------------------------
        loadOuTree:function(){
            let self=this;
            console.log(123)
            self.treeLoading=true;
            self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                console.log(res)
                self.ouAr=res;
                self.ouExpandId=self.defauleExpandTree(res.result,'id');
                self.loadIcon();
            },function(res){
                self.treeLoading=false;
            })

            //获取当前默认ouid
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                //console.log(res);
                self.defaultOuId = res.result.id;
                console.log(self.defaultOuId)
                self.addData.ouId = self.defaultOuId;
                //加载完成拿回下拉的默认值
                self.ouItem.ouFullname = res.result.ouFullname;
                self.ouItem.id =  res.result.id;

                self.loadParentTree(self.defaultOuId)
            },function(res){
                console.log('err'+res)
            });
        },
        loadParentTree(id){
            let self=this;
            self.treeLoading=true;
            self.$axios.gets('api/services/app/DeptManagement/GetAllTree',{OuId:id}).then(function(res){
                self.selectParentTree=res;
                self.dpExpandId=self.defauleExpandTree(res,'id');
                self.loadIcon();
            },function(res){
                self.treeLoading=false;
            })
        },
        loadStatus:function(){//加载状态下拉框
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                console.log(res)
                self.status = res.result;   
            },function(res){
                
            })
        },
        loadIcon(){
            let _this=this;
            _this.$nextTick(function () {
                $('.preNode').remove();   
                $('.el-tree-node__label').each(function(){
                    if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
                        $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
                    }else{
                        $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
                    }
                })
            })
        },
        //-----------------------------------------------------
        
        //---保存新增---------------------------------------------
        Modify:function(){//判断数据是否修改过
            let self = this;
            self.ifModify = true;
            // console.log(self.ifModify)
        },
        save(){
            let self=this;
            if(self.addData.deptParentid==''){    
                self.addData.deptParentid=0
            }
            self.$validate().then(function (success) {
                if (success) {
                    self.$axios.posts('/api/services/app/DeptManagement/Create',self.addData).then(function(res){
                        // console.log(res)
                        self.open('保存成功','el-icon-circle-check','successERP');
                        self.goModify(res.result.id)
                    },function(err){    
                        // self.open('保存失败','el-icon-error','faildERP');
                        // self.errorMessage=true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;

                    })
                }
            });
        },
        saveAdd:function(){
            let self = this;
            self.$validate().then(function (success) {
                if (success) {
                    self.$axios.posts('/api/services/app/DeptManagement/Create',self.addData).then(function(res){
                        // console.log(res)
                        self.open('保存成功','el-icon-circle-check','successERP');
                        self.goDetail();
                    },function(err){    
                        // self.open('保存失败','el-icon-error','faildERP');
                        // self.errorMessage=true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;

                    })
                }
            });
        },
        //-------------------------------------------------------


        //---修改返回提示-----------------------------------------
        isBack(){
            let self=this;
            if(self.ifModify){
                //self.dialogUserConfirm=true;
                // self.choseDoing='back'
                self.dialogSetting.dialogName='backDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
            }else{
                self.back()
            }
        },
        sureDoing:function(){
            let self = this;
            self.back();
        },
        //-------------------------------------------------------
        //------------------------------------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){//
                self.isBack();
            }else if(btn=="新增"){//
                
            }else if(btn=="删除"){//
                
            }else if(btn=="保存"){//
                self.save();
            }else if(btn=="保存并新增"){//
                self.saveAdd();
            }else if(btn=="取消"){
                self.isBack();
            }
        },
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    //this.sureDel();
                }else if(parmas.dialogName=="backDialog"){//返回
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){//保存
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){
                    this.dialogVisible=false;
                    this.sureDoing();
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        }, 
        //---树通用----------------------------------------

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
        back(row){
            this.$store.state.url='/department/departmentList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goModify:function(id){
            // console.log(id)
            this.$store.state.url='/department/departmentModify/'+id
            // this.$store.state.url='/repository/default/repositoryModify/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){//点击新增跳转
            this.$store.state.url='/department/departmentDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        //---------------------------------------------------------
        //---下拉树------------------------------------------------.
        ouFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.ouFullname.indexOf(value) !== -1;
        },
        dpFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.name.indexOf(value) !== -1;
        },
        //---树render-content----------------------------------
        ouRenderContent(h, { node, data, store }){//所属组织
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.ouFullname}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.ouFullname}
                    </span>
                );
            }
        },
        dpRenderContent(h, { node, data, store }){//所属组织
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.name}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.name}
                    </span>
                );
            }
        },

        //---树通用----------------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null 
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },

        ouNodeClick:function(data){
            console.log(data)
            let self = this;
            self.ouItem.id = data.id;
            self.ouItem.ouFullname = data.ouFullname;
            self.loadParentTree(data.id)
            self.$nextTick(function(){
                $('#ou_confirmSelect').click()
            })
        },
        nodeClick:function(data){
            let self = this;
            console.log(data)
            self.parentItem.id = data.id;
            self.parentItem.name = data.name;
            self.$nextTick(function(){
                $('#businessDetail_confirmSelect').click()
            })
        },
        //---------------------------------------------------------

        //---错误提示-------------------------------------------
        showErrprTips(e){
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
        },
        showErrprTipsSelect(e){
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').parent('.el-select').hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
        },
        showErrprTipsRangedate(e){
            $('.tipsWrapper').each(function(){
                if($(e.$el).hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
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
        //------------------------------------------------------
    }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}
.departmentDetail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
 .departmentDetail .el-row{
    background-color: #fff;
  }
 .departmentDetail .el-row:first-child{
   padding: 7px 0;
   border-bottom: 1px solid #e4e4e4;
  }
  .departmentDetail .el-row:last-child{
    padding-bottom: 15px;
  }
  .departmentDetail .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.departmentDetail .bgcolor.longWidth{
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
  .pb10{
      padding-bottom: 10px;
  }
  .departmentDetail .bgcolor.longWidth .el-input,
  .departmentDetail .bgcolor.longWidth .el-textarea,
  .departmentDetail .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .departmentDetail .bgcolor.longWidth label{
    width:80px;
  }
 .departmentDetail .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 } 
 .departmentDetail .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.departmentDetail .bgcolor.longWidth .add{
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
.departmentDetail .bgcolor.longWidth .addRole{
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
.departmentDetail .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.departmentDetail .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.departmentDetail .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
</style>

