 <template>
    <div class="supClasDetail-wrapper">
         <!-- 按钮组 -->
        <el-row class="fixed">
            <el-col :span="24">
                <button @click="isBack" class="erp_bt bt_back">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_back.png">
                    </div>
                    <span class="btDetail">返回</span>
                </button>                
                <button @click="save" class="erp_bt bt_save">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_save.png">
                    </div>
                    <span class="btDetail">保存</span>
                </button>
                <button class="erp_bt bt_cancel" @click="cancel">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_cancel.png">
                    </div>
                    <span class="btDetail">取消</span>
                </button>
                <button @click="saveAdd" class="erp_bt bt_saveAdd">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_saveAdd.png">
                    </div>
                    <span class="btDetail">保存并新增</span>
                </button>
                <button class="erp_fb_bt bt_add">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">新增</span>
                </button>
                <button class="erp_fb_bt bt_del">
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
        <!-- 表单 -->
        <el-row>
            <div class="supClasDetail-form-wrapper pt15">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <!-- <label><small>*</small>上级供应商分类</label> -->
                            <label><small></small>上级供应商分类</label>
                            <el-select clearable filterable  
                            class="classParentId"
                            @change="isChanged"
                            @focus="showErrTips"
                            placeholder=""
                            v-model="addData.classParentId"
                            >
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
                                <!-- <el-option v-for="item in selectData.upSupplierClass" :key="item.id" :label="item.className" :value="item.id">
                                </el-option> -->
                                <!-- <el-option v-show="false" :key="count.Id" :label="count.className" :value="count.Id"   id="supClaDetail_confirmSelect">
                                </el-option> -->
                                <el-option v-show="false"  v-for="item in selectData.upSupplierClass" :key="item.id" :label="item.className" :value="item.id" :date="item.id">
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
                            @change="isChanged"
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
                            @change="isChanged"
                            class="className" 
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
                            class="remark" 
                            @change="isChanged"
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
                            placeholder=""
                            @focus="showErrTips"
                            @change="isChanged"
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
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col> -->
               
            </div>
        </el-row>
        <!-- ********************************************** -->
        <!-- dialog数据变动提示(是否忽略更改) -->
        <el-dialog :visible.sync="dialogUpdateConfirm" class="dialog_confirm_message" width="25%">
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
                    <button class="dialog_footer_bt dialog_font" @click="dialogUpdateConfirm = false">取 消</button>
                </span>
        </el-dialog>
        <!-- 审计信息 -->
        <auditInfo :auditData='timeData'></auditInfo>  
        <!-- 数据提交有误的数据提示框 -->
        <submitError :submitData="submitData"></submitError>  

    </div>
</template>

 <script>
    import auditInfo from '../Common/auditInfo';
    import submitError from '../Common/submitError';
    export default {
        name: "supplierClassifyDetail",
        data(){
             return{
                isDisabled:true,//是否禁用创建人与创建时间               
                isAdd:true,//是否禁用增加键                              
                addData:{ // 表单增加参数
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
                },  
                timeData:{//审计信息参数
                    "createdBy" :this.$store.state.name,
                    "createdTime"  : this.GetDateTime(),
                    "modifiedBy"  : this.$store.state.name,
                    "modifiedTime"  : this.GetDateTime(),
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
                selectData:{ //  下拉框的选项数据
                    Status001:[],//启用状态
                    upSupplierClass:[],// 上级供应商分类
                },
                 // --------------------树形控件数据
                 expandId:[],//默认展开树节点
                 filterText:'',//过滤节点的关键字
                 supplierClasTree:[],
                 defaultProps: {
                    children: 'childNodes',
                    label: 'className',
                    id: 'id',
                },
                treeNode:{
                    Id:'',
                    className:'999999',
                },
                // ----------提示框信息
                dialogUpdateConfirm:false,
                isUpdate:false,
             }
        },
        created(){
            this.getSelectData();
            this.loadTree();
            this.getDefault();
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
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods:{
            getDefault(){// 获取默认值
                let _this=this;
                if(_this.$route.params.id!="default"){
                    _this.addData.classParentId=parseInt(_this.$route.params.id);
                    // _this.treeNode.className = '999999';
                    // _this.treeNode.Id=_this.$route.params.id;
                    // console.log(_this.$route.params.name)
                    // alert(1)
                }
                // console.log(this.$route.params);
                // _this.$axios.gets('/api/services/app/ContactClassManagement/Get',{Id:_this.$route.params.upParentId}).then(
                //     rsp=>{
                //         // console.log("数据呢");
                //         _this.treeNode.className=rsp.result.className;
                //         _this.treeNode.Id=rsp.result.id;
                //         console.log(_this.treeNode.Id);
                //         console.log(_this.treeNode.className);
                //     }

                // )
                // _this.addData.classParentId=_this.$route.params.upParentId;
               
                // _this.treeNode.Id=_this.$route.params.upParentId;
                // console.log(_this.treeNode.className);
                // console.log(_this.treeNode.Id);

                _this.GetDateTime();//获取当前时间
            },
            GetDateTime() {//获取当前时间
                let date=new Date();
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            },          
            // ------------------------提示框
            open(tittle,iconClass,className) {//成功的提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                    });
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
            showErrTips(e){// 表单错误提示信息
                $('.tipsWrapper').css({display:'none'});
            },
            getSelectData(){ //---------------获取下拉框选项数据 
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
            //---------------按钮组功能 
            goback() {//返回
                this.$store.state.url = "/supplierClassify/supplierClassifyList/default";
                this.$router.push({ path: this.$store.state.url });
            },
            // add(){ //新增
            //     this.reset();
            //     // _this.isDisabled=true;
            // },
            save() {// 保存
                let _this=this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(
                    function (success) { 
                        if (success){
                        $('.tipsWrapper').css({display:'none'});
                            _this.$axios.posts('/api/services/app/ContactClassManagement/Create',_this.addData).then(
                                rsp=>{
                                    _this.addData.id=rsp.result.id;
                                    _this.$store.state.url='/supplierClassify/supplierClassifyModify/'+rsp.result.id
                                    _this.$router.push({path:_this.$store.state.url})
                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                    
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
                    $('.tipsWrapper').css({display:'block'})
                    _this.$validate().then(
                        function (success) {
                            if (success) {
                                $('.tipsWrapper').css({display:'none'});
                                _this.$axios.posts('/api/services/app/ContactClassManagement/Create',_this.addData).then(
                                                rsp=>{
                                                    _this.reset();
                                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                                    _this.isUpdate=false;
                                                },
                                                rsp=>{
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
            // -----------------取消与返回功能
            isChanged (){//判断是否修改过信息
                this.isUpdate=true;
            },
            cancel(){// 取消
                this.isBack();
            },
            goBack() { // 返回
                this.$store.state.url = "/supplierClassify/supplierClassifyList/default";
                this.$router.push({ path: this.$store.state.url });
            },
            isBack(){//是否返回
                let _this=this;
                if(_this.isUpdate){
                    _this.dialogUpdateConfirm=true;
                }else{
                    _this.goBack();
                }
            },
            sureDoing(){
                this.goBack();
            },
            // -----------------取消与返回功能完
            // ----------树形控件相关----------
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
            loadTree(){//获取树形控件数据
                let _this=this;
                _this.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:2}).then(
                    rsp=>{
                    // console.log(rsp);
                     _this.supplierClasTree=rsp;
                    // console.log(_this.supplierClasTree)
                    // _this.loadIcon();
                    _this.expandId=_this.defauleExpandTree(rsp,'id')
                    _this.loadCheckSelect('classParentId',_this.addData.classParentId)
               })
            },
            filterNode(value, data) {//过滤节点
                // console.log(value);
                // console.log(data);
                if (!value) return true;
                return data.className.indexOf(value) !== -1;
                // this.nodeClick(data);
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
            nodeClick(data,node,self) {//点击树形控件节点时的回调
                 let _this=this;
                //  console.log(data);
                // console.log(self.$el);
                  $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                })
                //  console.log(data);
                // _this.treeNode.Id=data.id;
                // _this.treeNode.className=data.className;
                // _this.$nextTick(function(){
                //     $('#supClaDetail_confirmSelect').click()
                // });
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
    .supClasDetail-wrapper{
        background-color: #fff;
    }
    .pt15{
        padding-top: 15px;
    }
    .supClasDetail-wrapper{
        background-color: #fff;
    }
    .supClasDetail-wrapper .el-row:first-child{
        padding: 7px 0;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
    }
    .supClasDetail-wrapper .el-row:last-child{
        padding-bottom: 15px;
    }
    
</style>

 <style>
    /* 重新设置表单宽度 */
    .supClasDetail-wrapper .bgcolor.bgLongWidth label{
            width: 100px;
    }
    .supClasDetail-wrapper .bgcolor.bgLongWidth .el-input,
    .supClasDetail-wrapper .bgcolor.bgLongWidth .rangeDate, 
    .bgcolor.bgLongWidth .el-textarea,
    .supClasDetail-wrapper .bgcolor.bgLongWidth .el-select{
        width: calc(100% - 110px);
        }
    /* .supClasDetail-wrapper .bgcolor.bgLongWidth .el-select{
        width: 100%;
        } */
    .supClasDetail-wrapper .bgcolor.bgLongWidth .el-select .el-input{
            width:100%;
    }

</style>
