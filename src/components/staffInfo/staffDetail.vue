 <template>
     <div class="staff-infor-wrapper" style="float:left;background:#fff;width:100%;">
        <div id="bgc">
            <!-- 按钮组 -->
            <div class="btnBd">
                <el-row class="fixed">
                    <el-col :span="24">
                        <button class="erp_bt bt_back" @click="isBack">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_back.png">
                                </div>
                                <span class="btDetail">返回</span>
                        </button>
                        <button class="erp_bt bt_save" @click="save">
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
                        <button class="erp_bt bt_saveAdd" @click="saveAdd">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_saveAdd.png">
                                </div>
                                <span class="btDetail">保存并新增</span>
                        </button>
                        <button class="erp_fb_bt bt_add" :disabled="isTrue">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_add.png">
                                </div>
                                <span class="btDetail">新增</span>
                        </button>
                        <button class="erp_fb_bt bt_del" :disabled="isTrue">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_del.png">
                                </div>
                                <span class="btDetail">删除</span>
                        </button>
                       
                    </el-col>
                </el-row>
            </div>
             <!-- 表单验证错误提示信息 -->
            <el-row>
                <el-col :span="24">
                    <div class="tipsWrapper">
                        <div class="errorTips">
                            <p class="msgDetail">错误提示：
                                <span 
                                :class="{block : !validation.hasError('addData.employeeCode')}">
                                职员编码{{ validation.firstError('addData.employeeCode') }},
                                </span>
                                <span 
                                :class="{block : !validation.hasError('addData.employeeName')}">
                                职员名称{{ validation.firstError('addData.employeeName') }},
                                </span>
                                <span 
                                :class="{block : !validation.hasError('addData.ouId')}">
                                所属组织{{ validation.firstError('addData.ouId') }},
                                </span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- form表单 -->
            <el-row class="staff_detail_form">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>职员编码</label>
                            <el-input @change="isChanged" v-model="addData.employeeCode" class="employeeCode"  :class="{redBorder : validation.hasError('addData.employeeCode')}"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>职员名称</label>
                            <el-input @change="isChanged" v-model="addData.employeeName" class="employeeName"  :class="{redBorder : validation.hasError('addData.employeeName')}"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small>*</small>所属组织</label>
                            <el-select @change="isChanged" class="ouId" :class="{redBorder :           validation.hasError('addData.ouId')}" v-model="addData.ouId" placeholder=""  @focus="showErrTips">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterOu" class="selectSearch">
                                </el-input>
                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" :data="selectTree_ou" :props="selectProps_ou"
                                                node-key="id" default-expand-all ref="tree" :filter-node-method="filterNode_ou"
                                                :expand-on-click-node="false" @node-click="nodeClick_ou"
                                                class="filter-tree">
                                </el-tree>
                                <el-option v-show="false" v-for="item in selectData.ou" :key="item.id" :label="item.ouFullname" :value="item.id" :date="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>    
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                           <label><small></small>手机号码</label>
                            <el-input @change="isChanged" v-model="addData.mobile"></el-input>
                        </div>
                    </div>
                </el-col>
                 <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>部门</label>
                            <el-select @change="isChanged" v-model="addData.deptId">
                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" :data="selectTree_depart" :props="selectProps_depart"
                                        node-key="id" default-expand-all ref="tree2" :filter-node-method="filterNode_Depart"
                                        :expand-on-click-node="false" @node-click="nodeClick_depart"
                                        class="filter-tree">
                                        </el-tree>
                                        <!-- <el-option v-show="false" v-for="item in selectData.depart" :key="item.id" :label="item.name" :value="item.id" :date="item.id">
                                        </el-option> -->
                                        <!-- 用计算属性 -->
                                        <el-option v-show="false"
                                       :key="countDepart.id" 
                                       :label="countDepart.name" 
                                       :value="countDepart.id"
                                       id="staff_confirmSelect"></el-option>
                            </el-select>
                        </div>
                    </div>    
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>性别</label>
                            <el-select @change="isChanged" v-model="addData.sex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>生日</label>
                            <!-- <el-input @change="isChanged" v-model="addData.birthday"></el-input> -->
                            <el-date-picker
                            @change="isChanged" 
                            v-model="addData.birthday"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>所属店铺</label>
                            <el-select @change="isChanged" v-model="addData.ShopId">
                                <el-option v-for="item in selectData.shop" :label="item.shopName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>职员类型</label>
                            <el-checkbox-group @change="isChanged"   v-model="addData.employeeTypeIds">
                                <el-checkbox v-for="item in selectData.staffType"  :label="item.itemValue" :key="item.itemValue">{{item.itemName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>状态</label>
                            <el-select @change="isChanged" v-model="addData.status">
                               <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>备注</label>
                           <el-input @change="isChanged" type="textarea" :rows="5" resize="none" v-model="addData.remark"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- 审计信息 -->
            <auditInfo :auditData='timeData'></auditInfo>
            <!-- ********************************************************** -->
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
            <!-- dialog -->
            <!-- 数据提交有误的数据提示框 -->
            <submitError :submitData="submitData"></submitError> 
        </div>
    </div>
</template>
 <script>
    import auditInfo from '../Common/auditInfo';
    import submitError from '../Common/submitError';
    export default{
        name:'staffDetail',
        data(){
            return { 
                // ----------------提示信息
                timeData:{//审计信息
                    "createdBy":this.$store.state.name,
                    "createdTime": this.GetDateTime(),
                    "modifiedBy": this.$store.state.name,
                    "modifiedTime": this.GetDateTime(),
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
                // -------------增加的数据参数
                addData:{// --------------增加数据
                    "ouId": null,
                    "employeeCode": "",
                    "employeeName": "",
                    "mobile": "",
                    "deptId": null,
                    "sex": null,
                    "birthday": "",
                    "discountStart": 0,
                    "discountEnd": 0,
                    "shopId": null,
                    "remark": "",
                    "employeeTypeIds": [],
                    "status": 1,
                    "id": 0,
                },
                isTrue:false,//是否禁用按钮
                // --------------下拉框树形控件数据
                selectData:{//select下拉框数据
                    ou:[],//组织
                    depart:[],//部门
                    shop:[],//部门
                    Status001:[],//启用状态
                    staffType:[],//启用状态
                },
                ouId:null,
                filterOu:'',
                selectTree_ou:[],
                selectProps_ou: {
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                selectTree_depart:[],
                selectProps_depart: {
                    children: 'children',
                    label: 'name',
                    id:'id'
                },
                departItem:{
                    id:'',
                    name:'',
                },
                // -----------------------------
               
                employeeIdoptions:[//------职员类型--------
                    { label: '1',text: '采购'},
                    { label: '2',text: '业务'}, 
                    { label: '3',text: '仓库'}, 
                    { label: '4',text: '店员'}, 
                ],
                isUpdate:false,
                
                dialogUpdateConfirm:false,
                id:'',
            }                                                        
        },
        validators: {
            'addData.employeeCode': function (value) {//职员编码
                 return this.Validator.value(value).required().maxLength(50)
                    },
            'addData.employeeName': function (value) {//职员名称
                 return this.Validator.value(value).required().maxLength(50)
                    },
            'addData.ouId': function (value) {//所属组织
                return this.Validator.value(value).required().integer();
                    },
        },
        created(){
            this.loadTree();
            this.loadDepartTree();
            // 获取默认数据
            this.getDefault();
            this.getSelectData();// 所属组织下拉选项框
        },
        watch:{
           filterOu(val) {
                this.$refs.tree.filter(val);
                // console.log(val);
                
            },
        },
        computed:{
            countDepart () {
                return this.departItem;
                },
        }, 
        methods: {
            // -------------------默认值
            getDefault(){// ------默认用户所属组织
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(rsp=>{ 
                    // console.log(rsp);
                    _this.addData.ouId=rsp.result.id;
                    _this.ouId=rsp.result.id;
                    _this.getSelectDepart();
                    _this.loadDepartTree();
                });
                this.GetDateTime();//获取当前时间
            },
            GetDateTime() {//获取当前时间
                let date=new Date();
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            },
            // -----------------提示框
            getErrorMessage(message,details,validationErrors){//（数据提交有误详细参数）将rsp的值赋值给response对象 
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
            open(tittle,iconClass,className) {// 成功的提示框提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
            //---------------------------获取下拉框选项数据
            getSelectData(){//获取下拉选项数据
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList').then(function(res){  // 所属组织
                    _this.selectData.ou=res.result;                    
                });
                _this.$axios.gets('/api/services/app/ShopManagement/GetAll').then
                (function(res){  // 店铺
                    _this.selectData.shop=res.result.items;
                    // console.log(res.result.items);
                });
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                _this.selectData.Status001=res.result;// 启用状态
                });
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'employeeType'}).then(function(res){ 
                _this.selectData.staffType=res.result;// 职员类型
                });
                _this.getSelectDepart();//所属部门
            },
            getSelectDepart(){// 获取所属部门下拉框数据
                let _this=this;
                _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId}).then
                (
                    rsp=>{  
                        console.log(rsp.result);
                        _this.selectData.depart=rsp.result;
                    }
                );
            },
            //---------------------------获取树形控件数据
            // 所属组织
            loadTree(){// 加载所属组织树形控件
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList')
                .then(function(res){//组织
                    _this.selectTree_ou=res.result;
                    _this.loadIcon();
                },function(res){
                })
            },
            loadIcon(){//加载文件夹图标
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
            filterNode_ou(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
            },
            nodeClick_ou(data,node,self){//所属组织树形控件的回调
                let _this=this;
                // console.log(data);
                 if (data.id!=_this.addData.ouId) {
                    _this.addData.deptId=null
                }
                _this.ouId=data.id;
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                });
                _this.getSelectDepart();
                _this.loadDepartTree();
            },
            // 所属部门
            loadDepartTree(){// 加载所属部门树形控件
                let _this=this;
                _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId})
                .then(
                    function(res){//部门
                        console.log(res);
                        _this.selectTree_depart=res.result;
                        _this.loadIcon();
                    },
                    function(res){
                    }
                )
            },
            filterNode_Depart(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.deptName.indexOf(value) !== -1;
            },
            nodeClick_depart(data,node,self){//所属部门树形控件的回调
                let _this=this;
                console.log(data);
                // console.log(data.id);
                _this.departItem.id=data.id;
                _this.departItem.name=data.name;
                self.$nextTick(function(){
                    $('#staff_confirmSelect').click()
                })
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //     if($(this).attr('date')==data.id){
                //         $(this).click()
                //     }
                // });
                // _this.getSelectDepart();
                // _this.loadDepartTree();
            },
            // -----------------按钮组功能
            isChanged (){//判断是否修改过信息
                this.isUpdate=true;
            },
            save(){// 保存
                let _this=this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(
                    function (success) {
                        if (success) {
                            $('.tipsWrapper').css({display:'none'})
                            _this.$axios.posts('/api/services/app/EmployeeManagement/Create',_this.addData).then(
                                rsp=>{
                                    console.log(rsp);
                                    
                                    _this.addData.id=rsp.result.id;
                                    _this.$store.state.url='/staff/staffModify/'+rsp.result.id
                                    _this.$router.push({path:_this.$store.state.url})
                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                    _this.isTrue=false;
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
            cancel(){// 取消
                this.isBack();
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
            goBack:function(){//返回
                this.$store.state.url='/staff/staffList/default'
                this.$router.push({path:this.$store.state.url})
            },
            saveAdd(){// 保存并新增
                let _this=this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(
                    function (success) {
                        if (success) {
                            $('.tipsWrapper').css({display:'none'})
                            _this.$axios.posts('/api/services/app/EmployeeManagement/Create',_this.addData).then(
                                rsp=>{
                                    _this.$store.state.url='/staff/staffDetail/default'
                                    _this.$router.push({path:_this.$store.state.url})
                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                    _this.reset();
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
            // -----------------按钮组功能
            reset(){// 重置表单值与表单验证
                    this.addData.employeeCode='';
                    this.addData.employeeName='';
                    this.addData.ouId='';
                    this.addData.mobile='';
                    this.addData.department='';
                    this.addData.sex='';
                    this.addData.birthday='';
                    this.addData.shopName='';
                    this.addData.remark=''; 
                    this.validation.reset();
                    this.getDefault();               
            },
        },
        components:{
            auditInfo,
            submitError,

        },
    }
</script>


 <style scoped>
  .staff-infor-wrapper #bgc  .btnBd .el-row:first-child{
        /* height: 48px; */
        padding: 5px;
        border-bottom: 1px solid #e4e4e4 !important;
        background-color: #fff;
    }
    .block{
        display: none;
    }
    .staff-infor-wrapper{
        position: relative;
    }
    .staff_detail_form{
        /* padding-left: 30%;
        width: 30%; */
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .staff-infor-wrapper .smallBgcolor .el-input{
        width: 100% !important ;
    }
    .staff-infor-wrapper .bgcolor label{
        margin-right: 10px;
    }
    .smallBgcolor .el-input--suffix{
        width: 100% !important ;
    }
    .smallBgcolor .el-input{
        width: 100% !important ;
    }
    .bgcolor{
        overflow:  visible; 
    }
    .smallBgcolor>label {
        line-height: 35px;
    }
</style>




 <style>
    /*设置表单字体与高度*/
    .staff_detail_form .el-select{
        display: block !important ;
    }
    .staff-infor-wrapper .staff_detail_form .redBorder .el-input__inner{
    border-color: #f66;
    }
    .staff-infor-wrapper .staff_detail_form .el-input__inner{
        height: 35px !important;
        font-size:12px;
        border: 1px solid #dcdfe6 ;
    }
    /* 重写表单样式 */
    .staff-infor-wrapper .bgcolor.bgLongWidth label {
        width: 70px;
    }
    .staff-infor-wrapper .bgcolor.bgLongWidth .el-checkbox+.el-checkbox {
        margin-left: 5px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
</style>







