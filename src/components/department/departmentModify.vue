<template>
    <div class="departmentModify">
        <el-row class="fixed">
            <el-col :span="24" class="bg-white">
                <!-- <button @click="isBack" class="erp_bt bt_back">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_back.png">
                    </div>
                    <span class="btDetail">返回</span>
                </button>

                <button class="erp_bt bt_save" :class="{erp_fb_bt:!ifModify}"  @click="save">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_save.png">
                    </div>
                    <span class="btDetail">保存</span>
                </button>

                <button class="erp_bt bt_cancel" :disabled='!ifModify' :class="{erp_fb_bt:!ifModify}" @click="Cancel">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_cancel.png">
                    </div>
                    <span class="btDetail">取消</span>
                </button>

                <button class="erp_bt bt_saveAdd" :class="{erp_fb_bt:!ifModify}" @click='saveAdd'>
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_saveAdd.png">
                    </div>
                    <span class="btDetail">保存并新增</span>
                </button>

                <button class="erp_bt bt_add" @click="goDetail" v-show="!ifModify">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">新增</span>
                </button>

                <button class="erp_bt bt_add" v-show="ifModify" :class="{erp_fb_bt:ifModify}" >
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">新增</span>
                </button>

                <button class="erp_bt bt_del" @click="delModify" v-show="!ifModify">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_del.png">
                    </div>
                    <span class="btDetail">删除</span>
                </button>
                
                <button class="erp_bt bt_del" v-show="ifModify" :class="{erp_fb_bt:ifModify}">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_del.png">
                    </div>
                    <span class="btDetail">删除</span>
                </button> -->

                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>

                
            </el-col>
        </el-row>

        <el-row class="pb10">
            <el-col :span="24" class="pt15">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>所属组织</label>
                        <el-select class="ouId" 
                                   :class="{redBorder : validation.hasError('departmentData.ouId')}" 
                                   placeholder=""
                                   @change='Modify()'
                                   v-model="departmentData.ouId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="ouSearch"></el-input>

                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                     :data="ouTree"
                                     :props="ouProps"
                                     node-key="id"
                                     ref="ouTree"
                                     :filter-node-method="ouFilterNode"
                                     :default-expanded-keys="ouExpandId"
                                     :expand-on-click-node="false"
                                     :render-content="ouRenderContent"
                                     highlight-current
                                     @node-click="ouNodeClick"></el-tree>            

                            <el-option v-show="false"
                                       :key="countOu.id" 
                                       :label="countOu.ouName" 
                                       :value="countOu.id"
                                       id="ou_confirmSelect"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.ouId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
               <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>上级部门</label>
                        <el-select class="deptParentid" 
                                   placeholder=""
                                   @change='Modify()'
                                   v-model="deptParent">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="parentSearch"></el-input>

                            <el-tree :data="selectParentTree"
                                     :props="selectParentProps"
                                     node-key="id"
                                     ref="dpTree"
                                     :filter-node-method="dpFilterNode"
                                     highlight-current
                                     :render-content="dpRenderContent"
                                     :default-expanded-keys="dpExpandId"
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
                                  placeholder=""
                                  @change='Modify()'
                                  :class="{redBorder : validation.hasError('departmentData.deptCode')}" 
                                  v-model="departmentData.deptCode"></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.deptCode') }}</div>
                </div>    
            </el-col>

            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>部门名称</label>
                        <el-input  class="deptName"
                                   :class="{redBorder : validation.hasError('departmentData.deptName')}" 
                                   v-model="departmentData.deptName"
                                   placeholder=""
                                   @change='Modify()'></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.deptName') }}</div>
                </div>    
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>负责人</label>
                        <el-input class="manager" 
                                  :class="{redBorder : validation.hasError('departmentData.manager')}" 
                                  v-model="departmentData.manager"
                                  @change='Modify()'
                                  placeholder=""></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.manager') }}</div>
                </div>   
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label>备注</label>
                        <el-input class="remark"
                                  :class="{redBorder : validation.hasError('departmentData.remark')}" 
                                  v-model="departmentData.remark"
                                  type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4}"
                                  @change='Modify()'></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.remark') }}</div>
                </div>       
            </el-col>
            
            <el-col :span="24">
                <div class="marginAuto">
                    <div class="bgcolor longWidth">
                        <label><small>*</small>状态</label>
                        <el-select  class="status"
                                    :class="{redBorder : validation.hasError('departmentData.status')}" 
                                    placeholder=""
                                    v-model="departmentData.status">
                            <el-option v-for="item in status" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('departmentData.status') }}</div>
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
                        <el-input placeholder="" disabled="disabled" v-model="departmentData.createdBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="departmentData.createdTime" :disabled="true"></el-input>                      
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="departmentData.modifiedBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="departmentData.modifiedTime" :disabled="true"></el-input>                                              
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

        <!-- dialog是否删除提示 -->
        <!-- <el-dialog :visible.sync="dialogDelConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">确认删除？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDel">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogDelConfirm = false">取 消</button>
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
        name:'departmentModify',
        components:{
            buttonGroup,
            dialogBox
        },
        created:function(){
            let self = this;
            self.loadData();
            self.loadOuTree();
            self.loadStatus();
            //self.loadParentTree();      
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
                this.$refs.ouTree.filter(val)
            },
            parentSearch(val){
                this.$refs.dpTree.filter(val)
            },
            departmentData:{
                handler: function (val, oldVal) {
                    let self = this;
                    if(!self.firstModify){
                        self.firstModify = !self.firstModify;
                    }else{
                        self.ifModify = true;
                    }
                },
                deep: true,
            },
            ifModify:{
                handler:function(){
                    let self = this;
                    if(self.ifModify == true){
                        self.buttonGroup[3].disabled = false;
                        self.buttonGroup[4].disabled = false;
                        self.buttonGroup[5].disabled = false;
                        self.buttonGroup[1].disabled = true;
                        self.buttonGroup[2].disabled = true;
                    }else{
                        self.buttonGroup[3].disabled = true;
                        self.buttonGroup[4].disabled = true;
                        self.buttonGroup[5].disabled = true;
                        self.buttonGroup[1].disabled = false;
                        self.buttonGroup[2].disabled = false;
                    }
                },
                deep:true,
            },
        },  
        data(){
            return{
                firstModify:false,
                ifModify:false,//判断是否修改过
                // isEdit:true,//判断是否要修改
                defaultOuId:'',
                backCancel:'',
                //---组织单元树--------
                ouTree:[],
                ouSearch:'',
                ouProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouName:'',
                },
                ouExpandId:[],
                //--------------------
                //---上级部门树--------
                selectParentTree:[],//选择上级部门
                parentSearch:'',//搜索上级部门
                deptParent:'',
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
                departmentData:{
                    "id": '',
                    "groupId": 1,
                    "ouId": '',
                    "deptCode": "",
                    "deptName": "",
                    "manager": "",
                    "deptParentid": '',
                    "remark": "",
                    "status": '',
                    "modifiedBy":'',
                    "modifiedTime":'',
                    "createdBy":'',
                    "createdTime":''
                },

                
                //---确认删除-----------------               
                dialogDelConfirm:false,//用户删除保存提示信息
                //--------------------  

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
                }],//按钮组
            }
        },
     validators: {
      'departmentData.ouId': function (value) {//所属组织
         return this.Validator.value(value).required().integer();
      },
    //   'departmentData.deptParentid': function (value) {//上级部门
    //      return this.Validator.value(value).required().integer();
    //   },
      'departmentData.deptCode': function (value) {//部门编码
         return this.Validator.value(value).required().maxLength(20);
      },
      'departmentData.deptName': function (value) {//部门名称
         return this.Validator.value(value).required().maxLength(20);
      },
      'departmentData.manager': function (value) {//负责人
          return this.Validator.value(value).maxLength(20);
      },
      'departmentData.remark': function (value) {//备注
          return this.Validator.value(value).maxLength(200);
      },
      'departmentData.status': function (value) {//状态
         return this.Validator.value(value).required().integer();
      },
    },
    methods: {
        //---加载数据---------------------------------------------
        loadData:function(){//根据id加载信息
            let self = this;
            if(self.$route.params.id!='default'){
                self.$axios.gets('/api/services/app/DeptManagement/Get',{id:self.$route.params.id}).then(function(res){  
                    console.log(res)      
                    if(res.result.deptParentid==0){
                        self.deptParent='';
                    }else{
                        self.deptParent=res.result.deptParentid;
                    }         
                    self.departmentData = res.result;
                    self.ouItem.id = self.departmentData.ouId;
                    self.ouItem.ouName = self.departmentData.ouFullname;
                    self.parentItem.id = self.departmentData.deptParentid;
                    self.parentItem.name = self.departmentData.deptParentName;
                    self.departmentData.createdTime=self.resdatetime(new Date(self.departmentData.createdTime));
                    self.departmentData.modifiedTime=self.resdatetime(new Date(self.departmentData.modifiedTime));
                    self.firstModify = false;
                    
                });
            }

        },
        resdatetime:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
        },  
        loadOuTree:function(){
            let self=this;
            self.treeLoading=true;
            self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                console.log(res)
                self.ouTree=res;
                self.ouExpandId=self.defauleExpandTree(res.result,'id')
                self.loadIcon();
            },function(res){
                self.treeLoading=false;
            })
            //获取当前默认ouid
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(res);
                self.defaultOuId = res.result.id;
                //console.log(self.defaultOuId)
                self.loadParentTree(self.defaultOuId)
            },function(res){
                console.log('err'+res)
            });

        },
        loadParentTree(id){
            let self=this;
            self.treeLoading=true;
            self.$axios.gets('api/services/app/DeptManagement/GetAllTree',{ouId:id}).then(function(res){
                console.log(res)
                self.selectParentTree=res;
                self.dpExpandId=self.defauleExpandTree(res.result,'id')          
                self.loadIcon();
            },function(res){
                self.treeLoading=false;
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
        loadStatus:function(){//加载状态下拉框
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                console.log(res)
                
            self.status = res.result;      
                
            },function(res){
                
            })
        },
        //-------------------------------------------------------

        //---树--------------------------------------------------
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
            let self = this;
            self.ouItem.id = data.id;
            self.ouItem.ouName = data.ouFullname;
            self.loadParentTree(data.id)
            self.$nextTick(function(){
                $('#ou_confirmSelect').click()
            })
        },
        nodeClick:function(data){
            console.log(data)
            let self = this;
            self.parentItem.id = data.id;
            self.parentItem.name = data.name;
            self.$nextTick(function(){
                $('#businessDetail_confirmSelect').click()
            })
        },
        //-------------------------------------------------------
        //---保存新增---------------------------------------------
        Modify:function(){//判断数据是否修改过
            let self = this;
            self.ifModify = true;
            // console.log(self.ifModify)
        },
        save(){//保存修改
            let self=this;
            if(self.ifModify){
                self.departmentData.id = self.$route.params.id;
                    if(self.deptParent==''){
                        self.departmentData.deptParentid=0;
                    }else{
                        self.departmentData.deptParentid=self.deptParent;
                    }     
                    self.$validate().then(function (success) {
                        if (success) {
                            self.$axios.puts('/api/services/app/DeptManagement/Update',self.departmentData).then(function(res){
                                // console.log(res)
                                self.ifModify = false;
                                self.open('修改成功','el-icon-circle-check','successERP');
                                 self.departmentData.deptParentid='';
                            },function(err){    
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
            }
        },
        saveAdd:function(){//保存修改并新增
            let self=this;
            if(self.deptParent==''){
                self.departmentData.deptParentid=0;
            }else{
                self.departmentData.deptParentid=self.deptParent;
            }   
            if(self.ifModify){
                self.departmentData.id = self.$route.params.id;
                    self.$validate().then(function (success) {
                        if (success) {
                            self.$axios.puts('/api/services/app/DeptManagement/Update',self.departmentData).then(function(res){
                                // console.log(res)
                                self.ifModify = false;
                                self.goDetail();
                                self.open('修改成功','el-icon-circle-check','successERP');
                                self.departmentData.deptParentid='';
                            },function(err){    
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
            }
        },
        //-------------------------------------------------------

        //---确认删除--------------------------------------------
        sureDel:function(){
            let self = this;
            self.$axios.deletes('/api/services/app/DeptManagement/Delete',{id:self.$route.params.id}).then(function(res){
                self.open('删除部门成功','el-icon-circle-check','successERP');
                self.back();
                //self.dialogDelConfirm = false;
            },function(err){
                // self.open('删除部门失败','el-icon-error','faildERP');
                // self.dialogDelConfirm = false;
                // self.errorMessage = true;
                // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                self.dialogSetting.dialogType="submit";
                self.dialogSetting.dialogName='saveDialog'
                self.dialogSetting.message="信息提报有误";
                self.errorTips.message=err.error.message;
                self.errorTips.details='';
                self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                self.dialogVisible=true;

            }) 
        },
        //------------------------------------------------------

        //---顶部删除按钮-----------------------------------------
        delModify:function(){
            this.dialogSetting.dialogName='delDialog'
            this.dialogSetting.message="确定删除？";
            this.dialogSetting.dialogType="confirm";
            this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            this.dialogVisible=true;
        },
        //-------------------------------------------------------

        //---修改返回提示-----------------------------------------
        isBack(){
            let self=this;
            if(self.ifModify){
                self.dialogSetting.dialogName='backDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
                self.backCancel = 1;
                // self.choseDoing='back'
            }else{
                self.back()
            }
        },
        sureDoing:function(){
            let self = this;
            if(self.backCancel == 1){
                self.back();
            }else if(self.backCancel == 2){
                self.loadData();
                self.ifModify = false;
                self.dialogUserConfirm = false;
            }
            
        },
        //-------------------------------------------------------

        //---控制是否可编辑---------------------------------------
              
        Cancel(){
            let self = this;
            if(self.ifModify){
                this.dialogSetting.dialogName='cancelDialog'
                this.dialogSetting.message="此操作将忽略您的更改，是否继续";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
                self.backCancel = 2;
                $('.tipsWrapper').css({display:'none'})
            }

            //self.dialogUserConfirm = true;
            //self.backCancel = 2;
            // self.ifModify = false;
            // self.loadData();
                
            $('.tipsWrapper').css({display:'none'})
        },
        //-------------------------------------------------------

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
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){
                self.isBack();
            }else if(btn=="新增"){
                self.goDetail();
            }else if(btn=="删除"){
                self.delModify()
            }else if(btn=="保存"){
                self.save();
            }else if(btn=="保存并新增"){
                self.saveAdd();
            }else if(btn=="取消"){
                self.Cancel();
            }
        },
        //------------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    this.sureDel();
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

    }

})
</script>

<style scoped>
.pt15{
    padding-top: 15px;
}
.departmentModify  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
 .departmentModify .el-row{
    background-color: #fff;
  }
 .departmentModify .el-row:first-child{
   border-bottom: 1px solid #e4e4e4;
  }
  .departmentModify .el-row:last-child{
    padding-bottom: 15px;
  }
  .departmentModify .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.departmentModify .bgcolor.longWidth{
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
  .departmentModify .bgcolor.longWidth .el-input,
  .departmentModify .bgcolor.longWidth .el-textarea,
  .departmentModify .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .departmentModify .bgcolor.longWidth label{
    width:80px;
  }
 .departmentModify .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 } 
 .departmentModify .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.departmentModify .bgcolor.longWidth .add{
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
.departmentModify .bgcolor.longWidth .addRole{
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
.departmentModify .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.departmentModify .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.departmentModify .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
</style>
<style>
.departmentModify .el-input__inner{
    height:35px !important;
}

.departmentModify .h48{
    height: 48px;
    line-height: 48px;
}
.mt5{
    margin-top: 5px;
}
.mb10{
    margin-bottom: 10px;
}
.mt10{
    margin-top: 10px;
}
.mt20{
    margin-top: 20px;
}

.ml20{
    margin-left: 20px;
}
.pl10{
    padding-left: 10px;
}
.pl15{
    padding-left: 15px;
}
.pt10{
    padding-top: 10px;
}
.pt5{
    padding-top: 5px;
}
.pt20{
    padding-top: 20px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.h30{
    height: 30px;
    line-height: 30px;
}
.bt1{
    border-top:1px solid #e4e4e4;
}
</style>




