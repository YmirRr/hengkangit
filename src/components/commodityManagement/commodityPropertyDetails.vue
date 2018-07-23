<template>
    <div class="commodityPropertyDetails commodity">
        <el-row class="bg-white">

            <el-col :span='24' class="border-left">
                <el-row class="fixed bg-white" >
                    <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                </el-row>
                
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
                                        v-loading="treeLoading"
                                        :highlight-current="true" 
                                        ref="tree"
                                        :filter-node-method="filterNode"
                                        :expand-on-click-node="false"
                                         @node-click="nodeClick"
                                         :default-expanded-keys="expand.expandId_addDataOu"
                                         :render-content="renderContent_moduleParentId"
                                         
                                        >
                                        </el-tree>

                                        <el-option v-show="false" v-for="item in selectData" :key="item.id" :label="item.propertyName" :value="item.id" :date="item.id"  id="businessDetail_confirmSelect">
                                        </el-option>
                                        
                                    </el-select>
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
                                <el-input placeholder="" @change="isUpdate" :class="{redBorder : validation.hasError('addData.propertyCode')}" v-model="addData.propertyCode" id="coding" ></el-input>
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
                                <el-input placeholder="" @change="isUpdate" :class="{redBorder : validation.hasError('addData.propertyName')}" v-model="addData.propertyName"></el-input>
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
                                <el-input placeholder="" @change="isUpdate" v-model="addData.seq"></el-input>
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
                                    @change="isUpdate" 
                                    v-model="addData.relPropertyId"
                                    placeholder="" :class="{redBorder : validation.hasError('addData.propertyParentid')}">
                                    <el-input
                                        placeholder="搜索..."
                                        class="selectSearch"
                                        v-model="treeQuery">
                                    </el-input>
                                        <el-tree
                                        oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"  
                                        :data="classTree1"
                                        :props="defaultProps"
                                        node-key="id"
                                        ref="tree"
                                        :filter-node-method="filterNode"
                                        :expand-on-click-node="false"
                                         @node-click="nodeClick"
                                         v-loading="treeLoading" 
                                         :highlight-current="true"
                                         :render-content="renderContent_moduleParentId"
                                         :default-expanded-keys="expand.expandId_addDataOu"


                                        >
                                        </el-tree>

                                        <el-option v-show="false" v-for="item in selectData" :key="item.id" :label="item.propertyName" :value="item.id" :date="item.id"  >
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
                                <el-select  v-model="addData.status" @change="isUpdate" :disabled="isDisabled">
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
                classTree:[],
                classTree1:[],
                expand:{
                    expandId_addDataOu:[],//默认下拉树形展开id
                    isHere_addDataOu:false,//是否存在id于树形
                    expandId_dialogOu:[],//默认dialog组织树形展开id
                    expandId_mmenu:[],//默认分配功能树形展开id
                },
                ifWidth:true,
                treeLoading:false,
                treeNode:{
                    id:'',
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
                      propertyParentid:'',
                      relPropertyId: '',
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
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存',
                    show:true,
                    increased: true
                },{ class: 'erp_bt bt_auxiliary cancel',
                    show:true, 
                    increased: true,
                    imgsrc: '../../../static/image/common/u470.png',
                    text: '取消'
                },{
                    class: 'erp_bt bt_save_add',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存并新增',
                    show:true,
                    increased: true
                },{  class: 'erp_bt bt_add after cccc',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    show:true,
                    increased: false
                },{
                    class: 'erp_bt bt_del cccc',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    show:true,
                    increased: false
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    text: '审核',
                    show:true,
                    increased: true
                }]},
                dataSourceOptions:[{
                    value: 0,
                    label: '0'
                },{
                    value: 1,
                    label: '1' 
                }],
                selectData:[],
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
                ifsql:true,
                isDataSource:true,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                increased:false,//新增按钮
                dellet:false,//删除按钮
                savefa:true,//新增保存按钮
                savexiu:false,//修改保存按钮
                abolish:true,//取消按钮
                savefaadd:true,//保存并提交
                aboxiu:false,//修改取消

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
                    this.ifsql = !this.ifsql
                    if(this.$route.params.id != "default" && this.ifsql){
                        if(this.bottonbox.botton[1].text != '保存'){
                            this.bottonbox.botton.splice(1,2,{class: 'erp_bt bt_save amend_save',show:true, imgsrc: '../../../static/image/common/bt_save.png',text: '保存'},{class: 'erp_bt bt_auxiliary cancel',show:true, imgsrc: '../../../static/image/common/u470.png',text: '取消'},{class: 'erp_bt bt_save_add',show:true, imgsrc: '../../../static/image/common/bt_save.png',text: '保存并新增'})
                        }    
                    }
                },
                deep: true
            }
        },
        methods:{
            InitModify(){
                let _this=this;
                if(_this.$route.params.id!="default"){
                    _this.addData.propertyParentid=parseInt(_this.$route.params.id);
                    _this.treeNode.propertyName=_this.$route.params.name;
                    _this.treeNode.id=_this.$route.params.id;
                }
                _this.$axios.gets('/api/services/app/PropertyManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){ 
                    // 菜单
                    _this.selectData=res.result.items;
                })
            },
            defauleExpandTree(model,expandName,response,responseKey,children){
               let _this=this;
                // console.log(model!='');
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
            loadCheckSelect(selectName,key){
                let _this=this;
                _this.$nextTick(function () {
                console.log($('.'+selectName+' .el-tree-node__label').length) 
                    $('.'+selectName+' .el-tree-node__label').each(function(){
                         if($(this).attr('data-id')==key){
                            $(this).click()
                        }
                    })
                })
            },
            loadTree(){//获取tree data
                    let _this=this;
                    _this.treeLoading=true;
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetPropertyTree')
                    .then(function(res){
                        _this.classTree =res;
                        
                        console.log(res)
                        for(let i=0;i<_this.classTree[0].childNodes.length;i++){
                            _this.classTree[0].childNodes[i].childNodes = []
                        }
                        _this.treeLoading=false;
                        // _this.defauleExpandTree('propertyParentid','expandId_addDataOu',res,'id','children')
                        if(_this.expand.expandId_addDataOu<1){
                            _this.expand.expandId_addDataOu=[_this.classTree[0].id]
                        
                        }
                        _this.loadCheckSelect('propertyParentid',_this.addData.propertyParentid)
                },function(res){
                    _this.treeLoading=false;
                })
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetPropertyTree')
                    .then(function(res){
                        _this.classTree1 = res;
                    })
            },
            // loadIcon(){
            //     let _this=this;
            //     _this.$nextTick(function () {
            //         $('.preNode').remove();   
            //         $('.el-tree-node__label').each(function(){
            //             if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
            //                 $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
            //             }else{
            //                 $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
            //             }
            //         })
            //     })
            // },
            GetDateTime: function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var Hours = date.getHours();
                var Seconds = date.getSeconds();
                var Minutes = date.getMinutes();
                function dataTime(a){
                   if (a >= 1 && a <= 9) {
                        a = "0" + a;
                        return a
                    } 
                    return a
                }
                function datahous(a){
                   if (a < 10) {
                        a = "0" + a;
                        return a;
                    } 
                    return a ;
                }
                var currentdate = date.getFullYear() + seperator1 + dataTime(month) + seperator1 + dataTime(strDate) + ' ' + datahous(Hours) + seperator2 + datahous(Minutes) + seperator2 +  datahous(Seconds);
                return currentdate;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.categoryName.indexOf(value) !== -1;
            },
            isUpdate(){
                //判断是否修改过信息
                let _this=this;
                this.bottonbox.botton[0].update=true;   
                if(_this.addData.controlType == 3){
                    _this.isDataSource=false;
                }else{
                   _this.isDataSource=true; 
                }
            },
            nodeClick(data,node,self){
                let _this=this;
                _this.treeNode.id=data.id;
                _this.treeNode.propertyName=data.propertyName;
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                })
            },
            InitData(){//数据重置
                let _this=this;
                _this.addData.propertyName = '';
                _this.addData.propertyCode = '';
                _this.addData.controlType = '';
                // _this.addData.dataSource = '';
                _this.addData.seq = '';
                _this.addData.relPropertyId = '';
                _this.addData.propertyParentid = '';             
            },
            btmlog:function(data){
                let _this=this;
                if(data == '新增保存'){
                    // _this.$validate()
                    _this.$validate()
                    .then(function (success) {
                        if(success){
                           
                            if(_this.addData.seq != ''){
                                _this.addData.seq=parseInt(_this.addData.seq);
                            }else{
                               _this.addData.seq = 0
                            }
                            if(isNaN(_this.addData.seq) ){
                                _this.addData.seq = 0
                                // alert(1)
                            }
                            // console.log(_this.addData.seq == NaN)
                            if(_this.addData.status == ''){
                                _this.addData.status = 0;
                            }
                            if(_this.addData.levelNo ==''){
                               _this.addData.levelNo = 0; 
                            }
                            if(_this.addData.relPropertyId ==''){
                               _this.addData.relPropertyId = 0; 
                            }
                            _this.$axios.posts('/api/services/app/PropertyManagement/Create',_this.addData).then(function(res){
                                // _this.InitModify();
                                _this.open('创建商品属性成功','el-icon-circle-check','successERP'); 
                                _this.$store.state.url='/commodityProperty/commodityPropertyModify/'+res.result.id
                                _this.$router.push({path:_this.$store.state.url})
                                _this.InitModify();
                                
                                _this.bottonbox.botton[0].update=false;
                            },function(res){
                                _this.open('创建商品属性失败','el-icon-error','faildERP');
                                // alert(res)
                                console.log(res)
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                                _this.dialogUserConfirm=false;
                                _this.errorMessage=true;
                                
                            });
                        }
                          
                    }); 
                }else if(data == '新增'){
                    return; 
                }else if(data == '取消'){
                        this.ifsql =false;
                        _this.$store.state.url='/commodityProperty/commodityPropertyList/default';
                         _this.$router.push({path:_this.$store.state.url});
                }else if(data == '删除'){
                    if(_this.dellet){
                        this.dialogUserConfirm = true;
                        $('.bt_del').css('background','#f55e6e');
                    }else{
                        $('.bt_del').css('background','#ccc');
                    }
                }else if(data == '保存并新增'){
                    // console.log(_this.$validate().then(function(success){}))
                    _this.$validate()
                    .then(function (success) {
                        // console.log(success)
                        if(success){
                            if(_this.addData.levelNo != '' && _this.addData.propertyParentid !='' ){
                                _this.addData.levelNo=parseInt(_this.addData.levelNo);
                                _this.addData.propertyParentid=parseInt(_this.addData.propertyParentid);    
                            }
                            if(_this.addData.seq != ''){
                                _this.addData.seq=parseInt(_this.addData.seq);
                            }
                            if(_this.addData.seq == ''){
                               _this.addData.seq = 0;
                            }
                            if(_this.addData.status == ''){
                                _this.addData.status = 0;
                            }
                            if(_this.addData.levelNo ==''){
                               _this.addData.levelNo = 0; 
                            }
                            if(_this.addData.relPropertyId ==''){
                               _this.addData.relPropertyId = 0; 
                            }
                            _this.$axios.posts('/api/services/app/PropertyManagement/Create',_this.addData).then(function(res){                     
                                _this.$store.state.url = `/commodityProperty/commodityPropertyDetails/default`
                                _this.$router.push({path:_this.$store.state.url}); 
                                _this.open('创建商品属性成功','el-icon-circle-check','successERP'); 
                                _this.bottonbox.botton[0].update=false;
                                _this.validation.reset();
                                _this.InitData();
                            },function(res){
                                _this.open('创建失败','el-icon-error','faildERP');
                                // alert(res)
                                console.log(res)
                                // _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                                _this.dialogUserConfirm=false;
                                _this.errorMessage=true;
                                
                            });
                        }
                          
                    });
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
                    _this.savefa=true;//新增保存功能注释
                    _this.savexiu=false;//修改保存功能注释
                    _this.abolish=true;//注释取消按钮
                    _this.savefaadd=true;//注释保存并提交按钮
                    _this.increased=false;//激活新增按钮
                    _this.dellet=false;//激活删除按钮            
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
            renderContent_moduleParentId(h, { node, data, store }){
                if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.propertyName}
                        </span>
                    );
                }else{
                     return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.propertyName}
                        </span>
                    );
                }
            },           
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