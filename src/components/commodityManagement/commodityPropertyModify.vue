<template>
    <div class="commodityPropertyDetails commodity">
        <el-row class="bg-white">

            <el-col :span='24' class="border-left">
                <div class="fixed bg-white">
                   <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm> 
                </div>
                
                <el-row class="pl10 pr10">
                    <el-col :span="24" style="margin-top:20px">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor">
                                        <label ><small>*</small>上级属性</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="bgcolor smallBgcolor">
                                    <el-select 
                                    class="propertyParentid" 
                                    v-model="addData.propertyParentid"
                                    placeholder="" :class="{redBorder : validation.hasError('addData.propertyParentid')}">
                                    <el-input
                                        placeholder="搜索..."
                                        class="selectSearch"
                                        v-model="treeQuery">
                                    </el-input>
                                        <el-tree
                                        oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"  
                                        :data="classTree"
                                        :props="defaultProps"
                                        node-key="id"
                                        default-expand-all
                                        ref="tree"
                                        :filter-node-method="filterNode"
                                        :expand-on-click-node="false"
                                         @node-click="nodeClick"
                                        >
                                        </el-tree>

                                        <el-option v-show="false" v-for="item in selectData" :key="item.id" :label="item.propertyName" :value="item.id" :date="item.id"  id="businessDetail_confirmSelect">
                                        </el-option>
                                        
                                    </el-select>
                                    <!-- <el-select 
                                    class="propertyParentid"
                                    @change="isUpdate" 
                                    v-model="addData.propertyParentid"
                                    placeholder="" :class="{redBorder : validation.hasError('addData.propertyParentid')}">
                                    <el-input
                                        placeholder="搜索..."
                                        class="selectSearch"
                                        v-model="treeQuery">
                                    </el-input>
                                        <el-tree
                                        oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                        :data="classTree"
                                        :props="defaultProps"
                                        node-key="id"
                                        default-expand-all
                                        ref="tree"
                                        :filter-node-method="filterNode"
                                        :expand-on-click-node="false"
                                         @node-click="nodeClick"
                                        >
                                        </el-tree>
                                        <el-option v-show="false" :key="count.propertyParentid" :label="count.propertyName" :value="count.propertyParentid"   id="businessDetail_confirmSelect">
                                        </el-option>
                                    </el-select> -->
                                </div>
                            </el-col>
                            <el-col :span="3"><div class="error_tips_info">{{ validation.firstError('addData.propertyParentid') }}</div></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>属性编码</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder=""  :class="{redBorder : validation.hasError('addData.propertyCode')}" v-model="addData.propertyCode" id="coding" ></el-input>
                                </div>
                            </el-col>
                            <el-col :span="3"><div class="error_tips_info">{{ validation.firstError('addData.propertyCode') }}</div></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                       <label> <small>*</small>属性名称</label>
                               </div>
                            </el-col>
                            <el-col :span="5" id="name">
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder=""  :class="{redBorder : validation.hasError('addData.propertyName')}" v-model="addData.propertyName"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="3"><div class="error_tips_info">{{ validation.firstError('addData.propertyName') }}</div></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>控件类型</label>
                               </div>
                            </el-col>
                            <el-col :span="5" id="type">
                                <div class="bgcolor smallBgcolor" >
                                    <el-select v-model="addData.controlType" @change="isUpdate" :class="{redBorder : validation.hasError('addData.controlType')}">
                                    <el-option  v-for="item in ControlTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="3"><div class="error_tips_info">{{ validation.firstError('addData.controlType') }}</div></el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="pl10  pr10">
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>数据源</label>
                               </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="smallBgcolor bgcolor" >
                                <!-- <el-input placeholder="" v-model="addData.dataSource" @change="isUpdate" :class="{redBorder : validation.hasError('addData.dataSource')}"></el-input>-->
                                <el-select  v-model="addData.dataSource" :disabled="isDataSource">
                                    <el-option  v-for="item in dataSourceOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                </el-select>
                                </div> 
                                
                            </el-col>
                            <!-- <el-col :span="3"><div class="error_tips_info">{{ validation.firstError('addData.dataSource') }}</div></el-col> -->
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label>显示顺序</label>
                               </div>
                            </el-col>
                            <el-col :span="5" id="order">
                                <div class="smallBgcolor" >
                                <el-input placeholder=""  v-model="addData.seq"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label>级联属性</label>
                               </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="smallBgcolor bgcolor" >
                                <!-- <el-input placeholder="" @change="isUpdate" v-model="addData.levelNo"></el-input> -->
                                <!-- <el-select v-model="addData.controlType" >
                                    <el-option  v-for="item in ControlTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                </el-select> -->
                                <el-select 
                                class="propertyParentid" 
                                v-model="addData.relPropertyId"
                                placeholder="" >
                                <el-input
                                    placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="treeQuery">
                                </el-input>
                                    <el-tree
                                    oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"  
                                    :data="classTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    default-expand-all
                                    ref="tree"
                                    :filter-node-method="filterNode"
                                    :expand-on-click-node="false"
                                     @node-click="nodeClick"
                                    >
                                    </el-tree>

                                    <el-option v-show="false" v-for="item in selectData" :key="item.id" :label="item.propertyName" :value="item.id" :date="item.id"  id="businessDetail_confirmSelect">
                                    </el-option>
                                    
                                </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>状态</label>
                           </div>
                        </el-col>
                        <el-col :span="5" id="state">
                            <div class="bgcolor smallBgcolor" >
                                <el-select  v-model="addData.status" :disabled="isDisabled">
                                <el-option  v-for="item in StatusOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row class="pl10 pr10">
                    <el-col :span="9">
                        <div class="height1"></div>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6" class="Systemcheckbox mt10">
                        <el-checkbox  v-model="addData.isSystem" label="1">系统属性</el-checkbox>       
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6" class="mt10">
                            <el-checkbox v-model="addData.required" label="2">必填</el-checkbox>  
                    </el-col>
                </el-row>
                <el-row class="pl10 pr10 pt10  " style="border-top:1px solid #e4e4e4;   ">
                    <el-col :span="24" style="margin-bottom:30px;">
                        <h4>审计信息</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>创建人</label>
                           </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="" :disabled="isDisabled" v-model="addData.createdBy"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>创建时间</label>
                           </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="" :disabled="isDisabled" v-model="addData.createdTime" type="data"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>修改人</label>
                           </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="" :disabled="isDisabled" v-model="addData.modifiedBy"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>修改时间</label>
                           </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="" :disabled="isDisabled" v-model="addData.modifiedTime"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        
        <!-- dialog错误信息提示 -->
        <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
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
                            <vue-scroll :ops="$store.state.option">
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
        </el-dialog>
        <!-- dialog -->
        <!-- dialog是否删除提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
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
                <button class="dialog_footer_bt dialog_font yes" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font no" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog --> 
        <!-- dialog数据变动提示 -->
        <el-dialog :visible.sync="dialogUserConfirmoff" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-question"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirmoff = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
    </div>
</template>

<script>
import Textbox from '../../base/textbox/textbox'
    export default{
        name:'customerInfor',
        data(){
            return{

                 // 错误信息提示开始
                detail_message_ifShow:false,
                errorMessage:false,
                // 错误信息提示结束
                dialogUserConfirm:false,//用户删除保存提示信息
                dialogUserConfirmoff:false,
                classTree:[],
                ifWidth:true,
                treeNode:{
                    propertyParentid:'',
                    propertyName:'',
                },
                defaultProps: {
                    children:'childNodes',
                    label:'propertyName',
                    id:"id"
                },
                treeQuery:"",
                radio:'1',
                addData:{//键子对
                      levelNo: '',
                      propertyParentid:'',
                      relPropertyId: 0,
                      isBottom: true,
                      propertyCode: "",
                      propertyName: "",
                      propertyFullpathId: "0",
                      propertyFullpathName: "默认",
                      controlType: '',
                      required: false,
                      isSystem: false,
                      seq:'',
                      dataSource: 0,
                      status: 1,
                    createdTime:this.GetDateTime(),//创建时间
                    createdBy:this.$store.state.name,//创建人
                    modifiedTime:this.GetDateTime(),//修改人
                    modifiedBy:this.$store.state.name//修改时间
                    
                },
                isDisabled:true,//审计信息
                bottonbox:{
                    url: '/commodityProperty/commodityPropertyList',
                   botton:[{
                    class: 'erp_bt bt_back',
                    imgsrc: '../../../static/image/common/bt_back.png',
                    update:false,
                    text: '返回',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_save ',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存',
                    show:true,
                    increased: false
                },{ class: 'erp_bt bt_auxiliary cancel ',
                    show:true, 
                    increased: false,
                    imgsrc: '../../../static/image/common/u470.png',
                    text: '取消'
                },{
                    class: 'erp_bt bt_save_add ',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存并新增',
                    increased: false,
                    show:true,
                },{  class: 'erp_bt bt_add after',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    text: '审核',
                    show:true,
                    increased: true
                }]},
                selectData:[],
                dataSourceOptions:[{
                    value: 0,
                    label: '0'
                },{
                    value: 1,
                    label: '1' 
                }],
                ControlTypeOptions:[{
                    value: 0,
                    label: '下拉'
                },{
                    value: 1,
                    label: '日期'
                },{
                    value: 2,
                    label: '手工录入'
                },{
                    value: 3,
                    label: '关联档案'
                }],
                StatusOptions:[{
                    value: 0,
                    label: '启用'
                },{
                    value: 1,
                    label: '未启用'
                }],
                value: '',
                ifsql:false,
                isDataSource:true,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                dellet:true,//删除按钮
                savexiu:false,//修改保存按钮
                savefaadd:false,//保存并提交
                aboxiu:false,//修改取消
                increased:true//新增按钮
            }
        },
        validators: {
          'addData.propertyParentid': function (value) {//上级属性
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.propertyCode': function (value) {//属性编码
             return this.Validator.value(value).required().maxLength(50);
          },
          'addData.propertyName': function (value) {//属性名称
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.controlType': function (value) {//控件类型
             return this.Validator.value(value).required().maxLength(20)
          },
          'addData.dataSource': function (value) {//数据源
             return this.Validator.value(value).required().integer()
          },
        },
        created:function(){
            let _this=this;
            _this.InitModify();
            this.loadTree();
            if(this.$route.params.id !="default"){
               
            }else{
                
            }
        },
        computed:{
            count () {
                return this.treeNode;
            },
        },
        watch: {
            treeQuery(val) {
                this.$refs.tree.filter(val);
            },
            addData:{
                handler:function(){
                    let _this=this;
                    if(!_this.ifsql){
                        _this.ifsql = !_this.ifsql; 
                    }else{
                        _this.isbotton(true,true,true,false,false)
                        _this.savexiu = true;//修改保存功能注释
                        _this.aboxiu = true;//注释修改取消按钮
                        _this.savefaadd = true;//注释保存并提交按钮
                        _this.increased = false;//激活新增按钮
                        _this.dellet = false;//激活删除按钮
                    }
                    
                },
                deep: true
            }
        },
        methods:{
            InitModify(){
                let _this=this;
                if(_this.$route.params.id=="default"){
                    return;
                }else{
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){ 
                        // 菜单
                        _this.selectData=res.result.items;
                    })
                    _this.$axios.gets('/api/services/app/PropertyManagement/Get',{Id:_this.$route.params.id}).then(function(res){
                        // _this.updateId=res.result.id;
                        console.log(res);
                        _this.treeNode.propertyParentid=res.result.propertyParentid;
                        _this.treeNode.propertyName=res.result.propertyParentName;
                          _this.addData.levelNo=res.result.levelNo,
                          _this.addData.propertyParentName = res.result.propertyName;
                          _this.addData.propertyParentid=res.result.propertyParentid,
                          _this.addData.relPropertyId= res.result.relPropertyId,
                          _this.addData.isBottom= res.result.isBottom,
                          _this.addData.propertyCode= res.result.propertyCode,
                          _this.addData.propertyName= res.result.propertyName,
                          _this.addData.propertyFullpathId= res.result.propertyFullpathId,
                          _this.addData.propertyFullpathName= res.result.propertyFullpathName,
                          _this.addData.controlType= res.result.controlType,
                          _this.addData.required= res.result.required,
                          _this.addData.isSystem= res.result.isSystem,
                          _this.addData.seq=res.result.seq,
                          _this.addData.dataSource= res.result.dataSource,
                          _this.addData.status= res.result.status
                          _this.addData.id= res.result.id
                          _this.addData.createdTime=res.result.createdTime.substring(0,19).replace('T', ' ');//创建时间
                          _this.addData.createdBy=res.result.createdBy;//创建人
                          _this.addData.modifiedTime=res.result.modifiedTime.substring(0,19).replace('T', ' ');//修改人
                          _this.addData.modifiedBy=res.result.modifiedBy//修改时间
                    })
                }
                 
            },
            sureDoing(){//取消

            },
            loadTree(){//获取tree data
                    let _this=this;
                    _this.treeLoading=true;
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetPropertyTree')
                    .then(function(res){
                        _this.classTree=res
                        _this.loadIcon();
                        _this.treeLoading=false;
                },function(res){
                    _this.treeLoading=false;
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
            GetDateTime: function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.categoryName.indexOf(value) !== -1;
            },
            isUpdate(){
                //判断是否修改过信息
                let _this=this;
                if(_this.addData.controlType == 3){
                    _this.isDataSource=false;
                }else{
                   _this.isDataSource=true; 
                }
            },
            nodeClick(data,node,self){
                let _this=this;
                // _this.treeNode.propertyParentid=data.propertyParentid;
                // _this.treeNode.propertyName=data.propertyName;
                // _this.$nextTick(function(){
                //     $('#businessDetail_confirmSelect').click()
                // })
                _this.treeNode.id=data.id;
                _this.treeNode.propertyName=data.propertyName;
                // _this.$nextTick(function(){
                //     $('#businessDetail_confirmSelect').click()
                // })
                console.log(_this.treeNode.id)
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                })
            },
            InitData(){//数据重置
                this.addData.propertyParentid="";//上级商品属性类目
                this.addData.propertyCode="";//商品属性编码
                this.addData.propertyName="";//商品属性名称
                this.addData.controlType="";//控件类型
                this.addData.dataSource="";//数据源
                this.addData.seq="";//显示顺序
                this.addData.levelNo="";//级联属性
                this.addData.status="";//状态
                this.addData.isSystem="";//系统属性
                this.addData.required="";//是否必填
            },
            btmlog:function(data){
                let _this=this;
                if(data == '新增保存'){
                    if(_this.savexiu){

                        _this.$validate()
                        .then(function(){
                            _this.addData.modifiedBy='admin';
                          _this.addData.createdBy='admin';
                          _this.addData.levelNo=parseInt(_this.addData.levelNo);
                            _this.addData.propertyParentid=parseInt(_this.addData.propertyParentid);
                            _this.addData.seq=parseInt(_this.addData.seq);
                            console.log(_this.addData)
                          _this.$axios.puts('/api/services/app/PropertyManagement/Update',_this.addData).then(function(res){
                                // _this.$store.state.url='/tenant/tenantManagement/'+res.result.id;
                                // _this.$router.push({path:_this.$store.state.url})//点击切换路由
                                _this.open('保存成功','el-icon-circle-check','successERP');
                                _this.ifsql = false;
                                _this.isbotton(false,false,false,true,true)
                                _this.savexiu = false;//修改保存功能注释
                                _this.aboxiu = false;//注释修改取消按钮
                                _this.savefaadd = false;//注释保存并提交按钮
                                _this.increased = true;//激活新增按钮
                                _this.dellet = true;//激活删除按钮
                                _this.bottonbox.botton[0].update=false; 
                            },function(){
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                                _this.dialogUserConfirm=false;
                                _this.errorMessage=true;
                                _this.open('保存失败','el-icon-error','faildERP');
                            });
                        })
                      
                    }
                }else if(data == '新增'){
                    if(_this.increased){
                        this.$store.state.url=`/commodityProperty/commodityPropertyDetails/default`
                        this.$router.push({path:this.$store.state.url});
                    }  
                }else if(data == '取消'){
                   if(_this.aboxiu){
                        _this.InitModify();
                        _this.ifsql = false;
                        _this.isbotton(false,false,false,true,true)
                        _this.savexiu = false;//修改保存功能注释
                        _this.aboxiu = false;//注释修改取消按钮
                        _this.savefaadd = false;//注释保存并提交按钮
                        _this.increased = true;//激活新增按钮
                        _this.dellet = true;//激活删除按钮
                        _this.bottonbox.botton[0].update=false; 
                   } 
                }else if(data == '删除'){
                    if(_this.dellet){
                        this.dialogUserConfirm = true;
                    }
                }else if(data == '保存并新增'){
                    if(_this.savefaadd){
                        _this.$validate()
                        .then(function(){
                            _this.addData.modifiedBy='admin';
                            _this.addData.createdBy='admin';
                            _this.addData.levelNo=parseInt(_this.addData.levelNo);
                            _this.addData.propertyParentid=parseInt(_this.addData.propertyParentid);
                            _this.addData.seq=parseInt(_this.addData.seq);
                            console.log(_this.addData)
                            _this.$axios.puts('http://192.168.100.107:8085/api/services/app/PropertyManagement/Update',_this.addData).then(function(res){
                                // _this.$store.state.url='/tenant/tenantManagement/'+res.result.id;
                                // _this.$router.push({path:_this.$store.state.url})//点击切换路由
                                _this.open('保存成功','el-icon-circle-check','successERP');
                                // _this.InitData();
                                // _this.validation.reset();
                                _this.$store.state.url=`/commodityProperty/commodityPropertyDetails/default`
                                _this.$router.push({path:_this.$store.state.url});
                                _this.bottonbox.botton[0].update=false; 
                            },function(){
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                                _this.dialogUserConfirm=false;
                                _this.errorMessage=true;
                                _this.open('保存失败','el-icon-error','faildERP');
                            });
                        })       
                    }
                }
            },
            sureAjax(){
                let _this=this;
                _this.$axios.deletes('/api/services/app/PropertyManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                    // _this.loadTableData();
                    _this.dialogUserConfirm=false;
                    _this.InitData();
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    _this.$store.state.url=`/commodityProperty/commodityPropertyDetails/default`
                    _this.$router.push({path:_this.$store.state.url});            
                })
            },
            open(tittle,iconClass,className) {//提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
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
            isbotton(a,b,c,d,e){
                let _this = this;
                _this.bottonbox.botton[1].increased = a;
                _this.bottonbox.botton[2].increased = b;
                _this.bottonbox.botton[3].increased = c;
                _this.bottonbox.botton[4].increased = d;
                _this.bottonbox.botton[5].increased = e; 
            }           
        },
        components:{
        }
        
 }   
</script>

<style scoped>
.Systemcheckbox{
    margin-left: 10px;
    margin-bottom: 30px;   
}
.mt10{
   margin-top: 10px; 
}
.smallBgcolor .el-select{
        width: 100% !important ;
        margin-left: 10px;
    }
    .bgcolor label{
        width: 100% !important ;
        margin-right: 0; 
    }
    .smallBgcolor .el-input--suffix{
        width: 100% !important ;
    }
    .smallBgcolor .el-input{
        width: 100% !important ;
        margin-left: 10px;
    }
    .input-need{
        outline: none;
        border:none;
        width: 100%;
        height: 28px;
    }
    .bgcolor{
        overflow:  visible; 
    }
.bg-white{
    background: white;
    border-radius: 3px;
}
.pl10{
    padding-left: 10px;
}
.pt10{
    padding-top: 10px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
</style>

<style>
.commodityPropertyDetails .smallBgcolor .el-input input{
    height: 33px !important;
}
.commodityPropertyDetails .bgcolor{
    width: 100%; 
}
.error_tips_info{
    text-indent: 30px;
}
/* 重写checkbox */
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius:50% !important; 
}
.el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 11px;
    left: 4px;
    position: absolute;
    top: -1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 6px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}
</style>