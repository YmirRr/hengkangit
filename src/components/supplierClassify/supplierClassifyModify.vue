<template>
    <div class="supClasModify-wrapper">
         <!-- 按钮组 -->
        <el-row class="fixed">
            <el-col :span="24">
                <button  @click="isBack" class="erp_bt bt_back">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_back.png">
                    </div>
                    <span class="btDetail">返回</span>
                </button>

                <button @click="save" class="erp_bt bt_save" :class="{erp_fb_bt:!update}"  :disabled="!update">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_save.png">
                    </div>
                    <span class="btDetail">保存</span>
                </button>

                <button @click="isCancel" class="erp_bt bt_cancel" :class="{erp_fb_bt:!update}"  :disabled="!update">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_cancel.png">
                    </div>
                    <span class="btDetail">取消</span>
                </button>

                <button @click="saveAdd" class="erp_bt bt_saveAdd" :class="{erp_fb_bt:!update}"  :disabled="!update">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_saveAdd.png">
                    </div>
                    <span class="btDetail">保存并新增</span>
                </button>

                <button  @click="add" class="erp_bt bt_add" :class="{erp_fb_bt:update}" :disabled="update">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">新增</span>
                </button>
               
               <button @click="confirmDelThis" :class="{erp_fb_bt:update}" class="erp_bt bt_del" :disabled="update">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_del.png">
                         </div>
                        <span class="btDetail">删除</span>
                </button>

                <!-- <button class="erp_bt bt_auxiliary bt_width">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_auxiliary.png">
                    </div>
                    <span class="btDetail">辅助功能</span>
                    <div class="btRightImg">
                        <img src="../../../static/image/common/bt_down_right.png">
                    </div>
                </button> -->
            </el-col>
        </el-row>
        <!-- 表单验证的错误提示信息 -->
        <el-row>
            <el-col :span="24">
                <div class="tipsWrapper">
                    <div class="errorTips">
                        <p class="msgDetail">错误提示：
                            <!-- <span :class="{block : !validation.hasError('addData.classParentId')}">
                                上级供应商分类{{ validation.firstError('addData.classParentId') }},
                            </span> -->
                            <span :class="{block : !validation.hasError('addData.classCode')}">
                                供应商分类编码{{ validation.firstError('addData.classCode') }},
                            </span>
                            <span :class="{block : !validation.hasError('addData.className')}">
                                供应商分类名称{{ validation.firstError('addData.className') }},
                            </span>
                            <span :class="{block : !validation.hasError('addData.status')}">
                                状态{{ validation.firstError('addData.status') }},
                            </span>
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row>
            <div class="supClasModify-form-wrapper pt15">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <!-- <label><small>*</small>上级供应商分类</label> -->
                            <label><small></small>上级供应商分类</label>
                            <el-select clearable  filterable  
                            class="classParentId"
                            placeholder=""
                            v-model="addData.classParentId"
                            @change="isUpdate"
                            @focus="showErrTips"
                            :class="{redBorder : validation.hasError('addData.classParentId')}">
                                <!-- 树形控件 -->
                                <!-- <el-tree
                                    oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                    :highlight-current="true"
                                    :data="supplierClasTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    default-expand-all
                                    ref="tree"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick"
                                    > -->
                                    <el-input
                                    placeholder="输入关键字进行过滤"
                                    v-model="filterText" 
                                    class="selectSearch">
                                    </el-input>
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    <el-tree
                                    :render-content="renderContent_componyTree"
                                    :highlight-current="true"
                                    :data="supplierClasTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    :default-expanded-keys="expandId"
                                    ref="tree"
                                    :filter-node-method="filterNode"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick"
                                    >
                                </el-tree>
                                <!-- <el-option v-show="false" :key="count.Id" :label="count.className" :value="count.Id"   id="supClaDetail_confirmSelect">
                                </el-option> -->
                                <!-- <el-option v-show="false"  v-for="item in selectData.upSupplierClass" :key="item.id" :label="item.className" :value="item.id" :date="item.id">
                                </el-option> -->
                                <el-option v-show="false" :key="treeNode.Id" :label="treeNode.className" :value="treeNode.Id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>供应商分类编码</label>
                            <el-input
                            @change="isUpdate" 
                            class="classCode" 
                            v-model="addData.classCode"
                            @focus="showErrTips"
                            :class="{redBorder : validation.hasError('addData.classCode')}"></el-input>
                        </div>
                    </div>
                </el-col>                 
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>供应商分类名称</label>
                            <el-input 
                            class="className" 
                            @change="isUpdate"
                            v-model="addData.className"
                            @focus="showErrTips"
                            :class="{redBorder : validation.hasError('addData.className')}"></el-input>
                        </div>
                    </div>
                </el-col>
                 <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label>备注</label>
                            <el-input
                            @change="isUpdate"
                            class="remark" 
                            v-model="addData.remark"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            >
                            </el-input>
                        </div>
                    </div>
                </el-col>
                 <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small>*</small>状态</label>
                            <el-select filterable  
                            class="status" 
                            @focus="showErrTips"
                            @change="isUpdate"
                            placeholder=""
                            v-model="addData.status"
                            :class="{redBorder : validation.hasError('addData.status')}"
                            >
                                 <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <!-- <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>创建人</label>
                            <el-input 
                            :disabled="isDisabled"
                            v-model="addData.createdBy">
                            </el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>创建时间</label>
                            <el-date-picker
                            type="date"
                            :disabled="isDisabled"
                            v-model="addData.createdTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col> -->
               
            </div>
        </el-row>
        <!-- ***************************************************** -->
	    <!-- <el-row>
            <el-col>
                <div class="errTipsWrapper" name="classParentId">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.classParentId')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.classParentId') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="classCode">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.classCode')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.classCode') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="className">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.className')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.className') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="status">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.status')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.status') }}</p>
                      </div>
                    </div>
                </el-col>
        </el-row> -->
        <!-- dialog数据变动提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            <!--  -->
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
        <!-- 审计信息 -->
        <auditInfo :auditData='timeData'></auditInfo>
        <!-- 数据提交有误的数据提示框 -->
        <submitError :submitData="submitData"></submitError>
        <!-- dialog是否删除提示(对话框控件) -->
        <el-dialog :visible.sync="dialogDeleteConfirm" class="dialog_confirm_message" width="25%">
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
                <button class="dialog_footer_bt dialog_font" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogDeleteConfirm = false">取 消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import auditInfo from '../Common/auditInfo';
    import submitError from '../Common/submitError';
    export default {
        name: "supplierClassifyModify",
        data(){
             return{
                timeData:{//审计信息
                    "createdBy" :'',
                    "createdTime"  : '',
                    "modifiedBy"  : '',
                    "modifiedTime"  : '',
                },
                submitData:{//数据提交有误提示框参数
                    submitErrorMessage:false,
                    detail_message_ifShow: false,
                    response: {
                        details: "",
                        message: "",
                        validationErrors: []
                    },
                }, 
                // ----------------是否确认删除提示框
                // message:'确认删除吗？',
                // dialogVisible:false,
                // ------------------是否确认删除提示框

                isDisabled:true,//是否禁用创建人与创建时间               
                //  isTrue:true,//禁用保存键  
                update:false, //判断是否修改过
                firstModify:false,//进入页面数据改变一次           
                // 表单增加参数
                addData:{
                    "id":0,
                    "groupId": 0,
                    "contactOwner": 2,
                    "levelNo": 0,
                    "classParentId": '',
                    "classCode": "",
                    "className": "",
                    "classFullname": "string",
                    "classFullPathId": "string",
                    "classFullPathName": "string",
                    "mnemonic": "string",
                    "seq": 0,
                    "status": 1,
                    "remark": "",
                    "createdBy" :'',
                    "createdTime"  :'',
                },
                //  下拉框的选项数据
                selectData:{
                    Status001:[],//启用状态
                    upSupplierClass:[],// 上级供应商分类
                },
                treeNode:{
                    Id:'',
                    className:'',
                },
                // -------树形控件数据
                expandId:[],//默认展开树节点
                filterText:'',//过滤节点的关键字
                supplierClasTree:[],
                defaultProps: {
                    children: 'childNodes',
                    label: 'className',
                    id: 'id',
                },
                // ------------------提示框数据
                dialogUserConfirm:false,//信息更改提示控制
                dialogDeleteConfirm:false,//是否确认删除提示框

             }
        },
        watch: {
            addData:{
                handler: function (val, oldVal) {
                    let _this = this;
                    if(!_this.firstModify){
                        _this.firstModify = !_this.firstModify;
                    }else{
                        _this.update = true;
                        // _this.update = !_this.update;
                    }
                },
                deep: true,
            },
            filterText(val) {
                this.$refs.tree.filter(val);
            },

        },
        created(){
            this.getSelectData();
            this.loadTree();
            this.getDataList();
        },
        validators: {
            // 'addData.classParentId': function (value) {//上级供应商分类
            //     return this.Validator.value(value).required().maxLength(50)
            // },
            'addData.classCode': function (value) {//供应商分类编码
                return this.Validator.value(value).required().maxLength(50)
            },
            'addData.className': function (value) {//供应商分类名称
                return this.Validator.value(value).required().maxLength(50)
            },
            'addData.status': function (value) {//状态
                return this.Validator.value(value).required().integer();
            },
        },
        // computed:{
        //     count () {
        //         return this.treeNode;
        //         },
        // },
        methods:{
            getDataList() {//获取默认数据渲染
                let _this = this;
                _this.$axios
                    .gets("/api/services/app/ContactClassManagement/Get", {
                    id: this.$route.params.id
                    })
                    .then(rsp => {
                        // console.log(rsp.result);
                        // _this.treeNode.Id=rsp.result.classParentId;
                        _this.addData=rsp.result;                       
                        // if (rsp.result.classParentId==0) {
                        //     _this.selectData.upSupplierClass.className='无'
                        // }
                        // --------审计信息数据
                        _this.timeData.createdBy=rsp.result.createdBy;
                        _this.timeData.createdTime=rsp.result.createdTime;
                        _this.timeData.modifiedBy=rsp.result.modifiedBy;
                        _this.timeData.modifiedTime=rsp.result.modifiedTime;

                        _this.treeNode.Id=rsp.result.classParentId;
                        _this.treeNode.className=rsp.result.classParentId_ClassName;
                    });
            },
            // -------------------------提示框
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
            showErrTips(e){// 表单错误提示信息
                $('.tipsWrapper').css({display:'none'});
            },
            getErrorMessage(message,details,validationErrors){//将rsp的值赋值给response对象 
                let _this=this;
                _this.submitData.response.message='';
                _this.submitData.response.details='';
                _this.submitData.response.validationErrors=[];
                if(details!=null && details){
                    _this.submitData.response.details=details;
                }
                if(message!=null && message){
                    _this.submitData.response.message=message;
                }
                if(message!=null && message){
                    _this.submitData.response.validationErrors=validationErrors;
                }
            },
            //---------------获取下拉框选项数据 
            getSelectData(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                    // 启用状态
                    _this.selectData.Status001=res.result;
                });
                _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',{Id:0,ContactOwner:2,SkipCount:0,MaxResultCount:100}).then(function(res){ 
                    // 上级供应商分类
                    _this.selectData.upSupplierClass=res.result.items;
                    // console.log(res.result.items);
                    
                });
            },
            //--------------------------------------按钮组功能 
            //---------------返回 ------------
            goback() {//返回
                 this.$store.state.url = "/supplierClassify/supplierClassifyList/default";
                this.$router.push({ path: this.$store.state.url });
            },
            isBack(){
                let _this=this;
                _this.btnValue='toBack';
                if(_this.update){
                    _this.dialogUserConfirm=true;
                    // _this.choseDoing='back'
                }else{
                    _this.goback()
                }
            },
            sureDoing:function(){
                let _this=this;
                if (_this.btnValue=='toBack') {
                    _this.goback();
                    _this.dialogUserConfirm=false;
                }else if (_this.btnValue=='Cancel'){
                    _this.dialogUserConfirm=false;
                    _this.Cancel();
                }
            },
            isUpdate() {//判断是否修改过信息
                this.update = true;
                // this.isTrue=false;
                // console.log(this.isDisable);
            },
            Cancel(){// 取消
                this.validation.reset();
                this.getDataList();
                this.firstModify=false;
                this.update=false;
                // console.log("quxiao123");
                // console.log(this.update);
                
                // let _this=this;
                // _this.btnValue='Cancel';
                // if(_this.update){
                //     _this.dialogUserConfirm=true;
                // }
            },
            isCancel(){// 确认是否取消
                let _this=this;
                if(_this.update){
                    // console.log(_this.update);
                    _this.dialogUserConfirm=true;
                    _this.btnValue='Cancel';
                }else{
                    _this.Cancel();
                }
            },
            // --------------删除-----------
            confirmDelThis(){//确认单项删除
                let _this=this;
                _this.choseAjax='row';
                _this.dialogDeleteConfirm=true;
                // _this.dialogVisible=true;
                // console.log(_this.dialogVisible);
            },
            // noDel(){//取消删除
            //     _this.dialogVisible=false;
            // },
            sureAjax(){
                let _this=this;
                if(_this.choseAjax=='row'){
                    _this.delThis()
                }else if(_this.choseAjax=='rows'){
                    _this.delSelected()
                }
            },
            delThis(){// 删除删除
                let _this=this;
                console.log(_this.$route.params.id);
                
                // console.log(_this.$route.params.id);
                _this.$axios
                .deletes("/api/services/app/ContactClassManagement/Delete",
                { id:_this.$route.params.id })
                .then(rsp => {
                    console.log(rsp.success);
                    
                    _this.dialogDeleteConfirm=false;
                    _this.open("删除成功", "el-icon-circle-check", "successERP");
                    _this.goback();
                });
            },
            // --------------删除完-----------



            // ---------------------------------------------------------
            add(){ //新增
                this.$store.state.url = "/supplierClassify/supplierClassifyDetail/default";
                this.$router.push({ path: this.$store.state.url });
            },
           
            save() {// 保存
                let _this=this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(
                    function (success) { 
                        if (success){
                            $('.tipsWrapper').css({display:'none'});
                            _this.$axios.puts('/api/services/app/ContactClassManagement/Update',_this.addData).then(
                                rsp=>{
                                    _this.open('保存成功','el-icon-circle-check','successERP'); 
                                    // _this.isTrue=true;
                                    _this.update=false;
                                },
                                rsp=>{   
                                    // _this.open('保存失败','el-icon-error','faildERP');
                                    if(rsp && rsp!=''){ 
                                        _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                    }
                                    _this.submitData.submitErrorMessage=true;
                                }
                            )
                        }
                    }
                )
            },
            saveAdd(){ // 保存并新增
                let _this=this;
                    _this.$validate().then(
                        function (success) {
                            if (success) {
                                _this.$axios.posts('/api/services/app/ContactClassManagement/Update',_this.addData).then(
                                                rsp=>{               
                                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                                    _this.add();
                                                },
                                                rsp=>{
                                                    // _this.open('保存失败','el-icon-error','faildERP');
                                                     if(rsp && rsp!=''){ 
                                                        _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                                    }
                                                    _this.submitData.submitErrorMessage=true;
                                                }
                                )
                            }
                        }
                    );
            },
            // ----------树形控件相关----------
            // loadIcon(){//添加文件夹图标
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
            defauleExpandTree(data,key){
                if(typeof(data[0])!='undefined'
                && data[0]!=null 
                && typeof(data[0][key])!='undefined'
                && data[0][key]!=null
                && data[0][key]!=''){
                    return [data[0][key]]
                }
            },
            renderContent_componyTree(h, { node, data, store }){
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
            loadCheckSelect(selectName,key){//默认选中节点
                let _this=this;
                // console.log(selectName,key)
                _this.$nextTick(function () { 
                    // console.log($('.'+selectName+' .el-tree-node__label'))
                $('.'+selectName+' .el-tree-node__label').each(function(){
                    if($(this).attr('data-id') == key){
                            $(this).click()
                            // console.log(1)
                        }
                    })
                })
            },
            loadTree(){//获取树形控件数据
                let _this=this;
                _this.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:2}).then(
                    rsp=>{
                    // console.log(rsp);
                     _this.supplierClasTree=rsp;
                    //  _this.selectData.upSupplierClass=rsp;
                    // console.log(_this.supplierClasTree)
                    // _this.loadIcon();
                    _this.expandId=_this.defauleExpandTree(rsp,'id')
                    _this.loadCheckSelect('classParentId',_this.addData.classParentId)
               })
            },
            nodeClick(data,node,self) {//点击树形控件节点时的回调
                let _this=this;
                if (_this.addData.id==data.id) {
                        alert("上级供应商不能为供应商本身")
                }else{
                        _this.treeNode.Id=data.id;
                        _this.treeNode.className=data.className;
                }
                self.$nextTick(function() {
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                });
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //         if($(this).attr('date')==data.id){
                //             $(this).click()
                //         }
                //     })


                //    let _this=this;
                //     //  console.log(data);
                //     _this.treeNode.Id=data.id;
                //     _this.treeNode.className=data.className;
                //     _this.$nextTick(function(){
                //         $('#supClaDetail_confirmSelect').click()
                //     })
            },
            filterNode(value, data) {//过滤节点
                // console.log(value);
                // console.log(data);
                if (!value) return true;
                return data.className.indexOf(value) !== -1;
                // this.nodeClick(data);
            },
            // 重新验证并设置值
            reset(){
                this.addData.classParentId='';
                this.addData.classCode='';
                this.addData.className='';
                this.addData.remark=''; 
                this.validation.reset();               
            },
            
        },
        components:{
            auditInfo,
            submitError,
        },
        
    }
</script>

 <style scoped>
    .supClasModify-wrapper{
        background-color: #fff;
    }
    .pt15{
        padding-top: 15px;
    }
    .supClasModify-wrapper{
        background-color: #fff;
    }
    .supClasModify-wrapper .el-row:first-child{
        padding: 7px 0;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
    }
    .supClasModify-wrapper .el-row:last-child{
        padding-bottom: 15px;
    }
    
</style>

 <style>
    /* 重新设置表单宽度 */
    .supClasModify-wrapper .bgcolor.bgLongWidth label{
            width: 100px;
    }
    .supClasModify-wrapper  .bgcolor.bgLongWidth .el-input,
    .supClasModify-wrapper  .bgcolor.bgLongWidth .rangeDate, 
    .bgcolor.bgLongWidth .el-textarea,
    .supClasModify-wrapper  .bgcolor.bgLongWidth .el-select{
        width: calc(100% - 110px);
        }
    /* .supClasModify-wrapper  .bgcolor.bgLongWidth .el-select{
        width: 100%;
        } */
.supClasModify-wrapper  .bgcolor.bgLongWidth .el-select .el-input{
        width:100%;
}
</style>