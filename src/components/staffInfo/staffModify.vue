<template>
     <div class="staff-modify-wrapper" style="float:left;background:#fff;width:100%;">
        <div id="bgc">
            <div class="btnBd">
                <el-row class="fixed">
                    <!-- 按钮组 -->
                    <el-col :span="24">
                        <button class="erp_bt bt_back" @click="isBack">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_back.png">
                                </div>
                                <span class="btDetail">返回</span>
                        </button>
                        <button class="erp_bt bt_save" @click="save" :disabled="!update" :class="{erp_fb_bt:!update}">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_save.png">
                                </div>
                                <span class="btDetail">保存</span>
                        </button>
                        <button class="erp_bt bt_cancel" :disabled="!update" @click="cancel" :class="{erp_fb_bt:!update}">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_cancel.png">
                                </div>
                                <span class="btDetail">取消</span>
                        </button>
                        <button @click="saveAdd" class="erp_bt bt_saveAdd" :disabled="!update" :class="{erp_fb_bt:!update}">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_saveAdd.png">
                                </div>
                                <span class="btDetail">保存并新增</span>
                        </button>
                        <button class="erp_bt bt_add" :disabled="update" :class="{erp_fb_bt:update}" @click="goAdd">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_add.png">
                                </div>
                                <span class="btDetail">新增</span>
                        </button>
                        <button class="erp_bt bt_del" :disabled="update" @click="confirmDelThis" :class="{erp_fb_bt:update}">
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
	        <!-- 表单 -->
            <el-row class="staff_modify_form">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>职员编码</label>
                            <el-input v-model="addData.employeeCode"  class="employeeCode"  :class="{redBorder : validation.hasError('addData.employeeCode')}"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>职员名称</label>
                            <el-input v-model="addData.employeeName"  class="employeeName"  :class="{redBorder : validation.hasError('addData.employeeName')}"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small>*</small>所属组织</label>
                            <el-select class="ouId"  :class="{redBorder :           validation.hasError('addData.ouId')}" v-model="addData.ouId" placeholder=""  @focus="showErrTips">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterOu" class="selectSearch">
                                </el-input>
                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" :data="selectTree_ou" :props="selectProps_ou"
                                                node-key="id" default-expand-all ref="tree2" :filter-node-method="filterNode_ou"
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
                            <el-input v-model="addData.mobile" ></el-input>
                        </div>
                    </div>
                </el-col>
                 <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>部门</label>
                            <el-select  v-model="addData.deptId">
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
                            <el-select v-model="addData.sex">
                                <el-option v-for="item in selectData.sexType" :label="item.itemName" :key="item.itemValue" :value="item.itemValue"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>生日</label>
                            <!-- <el-input v-model="addData.birthday" ></el-input> -->
                            <el-date-picker
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
                            <el-select  v-model="addData.shopId">
                                <el-option v-for="item in selectData.shopType" :label="item.shopName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>职员类型</label>
                            <el-checkbox-group    v-model="addData.employeeTypeIds">
                                <el-checkbox v-for="item in selectData.StaffType"  :label="item.itemValue" :key="item.itemValue">{{item.itemName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label><small></small>状态</label>
                            <el-select  v-model="addData.status">
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
                           <el-input  type="textarea" :rows="5" resize="none" v-model="addData.remark"></el-input>
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
            <!-- dialog删除 -->
            <!-- 数据提交有误的数据提示框 -->
            <submitError :submitData="submitData"></submitError> 
        </div>
    </div>
</template>
 <script>
    import auditInfo from '../Common/auditInfo';
    import submitError from '../Common/submitError';
    export default {
        name: "staffDetail",
        data() {
            return {
                timeData:{//审计信息
                    "createdBy":'',
                    "createdTime": '',
                    "modifiedBy": '',
                    "modifiedTime": '',
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
                addData: { //更新数据需要的参数-----表单数据
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
                    "status": null,
                    "employeeTypeIds": [],
                    "id":null,
                },
                // --------------下拉框树形控件数据
                ouId:null,
                selectData:{//select下拉框数据
                    ou:[],//组织
                    depart:[],//部门
                    shopType:[],//店铺
                    StaffType:[],//职员类型
                    sexType:[],//性别类型
                },
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
                // ------------------提示框数据
                dialogUpdateConfirm:false,//信息更改提示控制
                dialogDeleteConfirm:false,//删除信息提示控制
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                btnValue:'',//存储点击返回还是修改按钮判断信息

                firstModify:false,//进入页面数据改变一次
                update: false, //判断是否更改
                
                // employeeType: [//------职员类型--------
                //     // { label: 1, text: "采购" },
                //     // { label: 2, text: "业务" },
                //     // { label: 3, text: "仓库" },
                //     // { label: 4, text: "店员" }
                // ],
               
            };
        },
        validators: {// 验证器
            "addData.employeeCode": function(value) {//职员编码
                return this.Validator.value(value).required().maxLength(50);
            },
            "addData.employeeName": function(value) {//职员名称
                return this.Validator.value(value).required().maxLength(50);
            },
            "addData.ouId": function(value) {//所属组织
                return this.Validator.value(value).required().integer();
            }
        },
        created: function() {
            this.getDataList();
            this.getSelectData();
            this.loadTree();
            // this.loadDepartTree();
        },
        watch: {
            addData:{
                handler: function (val, oldVal) {
                    let _this = this;
                    if(!_this.firstModify){
                        _this.firstModify = !_this.firstModify;
                    }else{
                        _this.update = true;
                    }
                },
                deep: true,
            }

        },
        computed:{
            countDepart () {
                return this.departItem;
            },
        }, 
        methods: {
            // -------------------------提示信息
            showErrTips(e) {// 表单错误提示信息
                $('.tipsWrapper').css({display:'none'});
            },
            getErrorMessage(message,details,validationErrors){//（数据提交有误详细信息）将rsp的值赋值给response对象 
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
            open(tittle, iconClass, className) {// 成功的提示框
                this.$notify({
                    position: "bottom-right",
                    iconClass: iconClass,
                    title: tittle,
                    showClose: false,
                    duration: 3000,
                    customClass: className
                });
            },
            getDataList() {// 获取数据渲染
                    let _this = this;
                    _this.$axios.gets("/api/services/app/EmployeeManagement/Get",
                    {id: this.$route.params.id}).then(rsp => {
                        console.log(rsp.result);
                        for (let val of rsp.result.employeeTypes) {
                            // console.log(val.employeeTypeid,val.employeeTypeidTValue);
                            _this.addData.employeeTypeIds.push(val.employeeTypeid);
                            // console.log(_this.addData.employeeTypeIds);
                        }
                        _this.addData.employeeCode=rsp.result.employeeCode;
                        _this.addData.employeeName=rsp.result.employeeName;
                        _this.addData.ouId=rsp.result.ouId;
                        _this.addData.mobile=rsp.result.mobile;
                        if (rsp.result.deptId!=0) {
                            _this.addData.deptId=rsp.result.deptId
                        }
                        if (rsp.result.sex==0) {
                           _this.addData.sex=null;
                        }else{
                            _this.addData.sex=rsp.result.sex;
                        }
                        
                        if (rsp.result.birthday.indexOf('3000'==0)) {
                            _this.addData.birthday=null;
                        }else{
                            _this.addData.birthday=rsp.result.birthday;
                        }

                        if (rsp.result.shopId!=0) {
                           _this.addData.shopId=rsp.result.shopId;
                        }
                        _this.addData.status=rsp.result.status;
                        _this.addData.remark=rsp.result.remark;
                        _this.addData.id=rsp.result.id;
                        // ------审计信息数据
                        _this.timeData.createdBy=rsp.result.createdBy;
                        _this.timeData.createdTime=rsp.result.createdTime;
                        _this.timeData.modifiedBy=rsp.result.modifiedBy;
                        _this.timeData.modifiedTime=rsp.result.modifiedTime;
                        // -------组织（公司）的默认部门
                        _this.ouId=rsp.result.ouId;
                        console.log(rsp.result.ouId);
                        
                        _this.loadDepartTree();
                        _this.getSelectDepart();
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
                            _this.selectData.shopType=res.result.items;
                            // console.log(res.result.items);
                        });
                        _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                        _this.selectData.Status001=res.result;// 启用状态
                        });
                        _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'employeeType'}).then(function(res){ 
                        _this.selectData.StaffType=res.result;// 职员类型
                        // console.log(res.result);
                        });
                        _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'sex'}).then(function(res){ 
                        _this.selectData.sexType=res.result;// 性别
                        // console.log(res.result);
                        });
                        _this.getSelectDepart();
            },
            getSelectDepart(){// 获取所属部门下拉框数据
                    let _this=this;
                    _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId}).then
                    (
                        rsp=>{  
                            // console.log(rsp.result);
                             _this.selectData.depart=rsp.result;
                        }
                    );
            },
            //---------------------------获取树形控件数据
            loadTree(){// 加载所属组织树形控件
                        let _this=this;
                        _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList')
                        .then(function(res){//组织
                            _this.selectTree_ou=res.result;
                            _this.loadIcon();
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
            filterNode_ou(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.ouFullname.indexOf(value) !== -1;
            },
            nodeClick_ou(data,node,self){//所属组织树形控件的回调
                let _this=this;
                // console.log('12212');
                // console.log(data);
                // console.log(data.id);
                if (data.id!=_this.addData.ouId) {
                    _this.addData.deptId=null
                }
                _this.ouId=data.id;
                // console.log(_this.ouId);
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                });
                _this.getSelectDepart();
                _this.loadDepartTree();
            },
            // --------------------------------------
            loadDepartTree(){// 加载所属部门树形控件
                        let _this=this;
                        _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId})
                        .then(function(res){//部门
                            console.log(res);
                            _this.selectTree_depart=res.result;
                            _this.loadIcon();
                        },function(res){
                        })
            },
            filterNode_Depart(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.deptName.indexOf(value) !== -1;
            },
            nodeClick_depart(data,node,self){//所属部门树形控件的回调
                let _this=this;
                // console.log(data);
                // console.log(data.id);
                _this.departItem.id=data.id;
                _this.departItem.name=data.name;
                self.$nextTick(function(){
                    $('#staff_confirmSelect').click()
                })
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //     if($(this).attr('date')==data.id){
                //          $(this).click()
                //     }
                // });
                       
            },
            // --------------------------------按钮组功能
            // --------------返回功能
             goBack: function() {//返回
                this.$store.state.url = "/staff/staffList/default";
                this.$router.push({ path: this.$store.state.url });
            },
            isBack(){//判断是返回还是取消
                let _this=this;
                _this.btnValue='toBack';
                if(_this.update){
                    _this.dialogUpdateConfirm=true;
                }else{
                    _this.goBack()
                }
            },
            sureDoing(){
                        let _this=this;
                        if (_this.btnValue=='toBack') {
                            _this.goBack();
                        }else{
                            _this.dialogUpdateConfirm=false;
                            _this.getDataList();
                            _this.btnValue='';
                            _this.update=false;
                            this.firstModify=false;
                        }
                        
            },
            isUpdate() {//判断是否修改过信息
                this.update = true;
            },
            cancel() {// 取消
                        let _this=this;
                        _this.btnValue='isCancel';                        
                        if(_this.update){
                            _this.dialogUpdateConfirm=true;
                        }
            },
            // --------------删除-----------
            confirmDelThis(){//确认单项删除
                        let _this=this;
                        _this.choseAjax='row';
                        _this.dialogDeleteConfirm=true;
            },
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
                        _this.$axios
                        .deletes("/api/services/app/EmployeeManagement/Delete",
                        { id:_this.$route.params.id })
                        .then(rsp => {
                            _this.dialogDeleteConfirm=false;
                            _this.open("删除成功", "el-icon-circle-check", "successERP");
                            _this.goBack();
                        });
            },
            // --------------删除-----------
            goAdd(){//新增
                this.$store.state.url = "/staff/staffDetail/default";
                this.$router.push({ path: this.$store.state.url });
            },
            save() {// 保存修改的数据
                let _this = this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(function(success) {
                    if (success) {
                        $('.tipsWrapper').css({display:'none'})
                        if (_this.update) {
                            _this.$axios.puts("/api/services/app/EmployeeManagement/Update",_this.addData)
                                .then(
                                    rsp => {
                                    _this.open("修改成功", "el-icon-circle-check", "successERP");
                                    _this.update = false;
                                    },
                                    rsp => {
                                        if(rsp && rsp!=''){ 
                                            _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                        }
                                        _this.submitData.submitErrorMessage=true;
                                    }
                                );
                            } else {
                                _this.open("没有需要保存的项目", "el-icon-warning", "noticERP");
                            }
                        }
                });
            },
            saveAdd() {// 保存修改的数据---保存并新增
                let _this = this;
                $('.tipsWrapper').css({display:'block'})
                    _this.$validate().then(function(success) {
                    if (success) {
                        $('.tipsWrapper').css({display:'none'})
                        if (_this.update) {_this.$axios.puts( "/api/services/app/EmployeeManagement/Update",_this.addData)
                        .then(
                            rsp => {
                                _this.open("修改成功", "el-icon-circle-check", "successERP");
                                _this.update = false;
                                _this.goAdd();
                            },
                            rsp => {
                                if(rsp && rsp!=''){ 
                                    _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                }
                                _this.submitData.submitErrorMessage=true;
                            }
                        );
                        } else {
                            _this.open("没有需要保存的项目", "el-icon-warning", "noticERP");
                        }
                    }
                });
            },
        },
        components:{
            auditInfo,
            submitError,

        },
    };
</script>

 <style scope>
    .staff_modify_form {
        /* padding-left: 30%;  */
        /* width: 30%; */
        padding-bottom: 20px;
        padding-top: 20px;
        margin: auto;
    }
    .pl {
        padding-left: 20%;
    }
    .pt {
        padding-top: 10px;
    }
    .fs {
        font-size: 12px;
    }
    .staff-modify-wrapper .el-select {
        display: block;
    }
    .staff-modify-wrapper #bgc .btnBd .el-row:first-child{
        /* height: 48px; */
        padding: 5px;
        border-bottom: 1px solid #e4e4e4 !important;
        background-color: #fff;
    }
    /* .staff-modify-wrapper .btnBd {
        width: 100%;
        border-bottom: 1px solid #e4e4e4;
        padding: 5px;
    } */
    .bgcolor {
        overflow: visible;
    }
    .staff_modify_form .checkPt {
        padding-top: 5px;
    }
</style>
 <style>
    .staff-modify-wrapper .staff_modify_form .redBorder .el-input__inner{
    border-color: #f66;
    }
    .staff-modify-wrapper .staff_modify_form .el-input__inner {
    border: 1px solid #dcdfe6 ;
    height: 35px !important;
    }
    .staff-modify-wrapper .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
    /* width: 100%; */
    }
    /* 重写表单样式 */
    .staff-modify-wrapper .bgcolor.bgLongWidth label {
        width: 70px;
    }
    .staff-modify-wrapper .bgcolor.bgLongWidth .el-checkbox+.el-checkbox {
        margin-left: 5px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
</style>


