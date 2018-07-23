 <template>
    <div class="admstr-modify-wrapper">
       <!-- 按钮组 -->
        <el-row class="fixed">
            <el-col :span="24">
                <button @click="isBack" class="erp_bt bt_back">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_back.png">
                    </div>
                    <span class="btDetail">返回</span>
                </button>

                <button @click="save" :class="{erp_fb_bt:!update}" class="erp_bt bt_save"  :disabled="!update">
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
               
                <button @click="saveAdd" class="erp_bt bt_saveAdd" :class="{erp_fb_bt:!update}" :disabled="!update">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_saveAdd.png">
                    </div>
                    <span class="btDetail">保存并新增</span>
                </button>

               <button @click="goAdd" class="erp_bt bt_add" 
               :class="{erp_fb_bt:update}" :disabled="update">
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
            </el-col>
        </el-row>
	        <!-- <el-row>
                <el-col>
                    <div class="errTipsWrapper" name="areaParentId">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.areaParentId')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.areaParentId') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="areaCode">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.areaCode')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.areaCode') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="areaName">
                        <div class="errorTips" :class="{block : !validation.hasError('addData.areaName')}">
                            <p class="msgDetail">错误提示：{{ validation.firstError('addData.areaName') }}</p>
                        </div>
                    </div>
                    <div class="errTipsWrapper" name="status">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.status')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.status') }}</p>
                      </div>
                    </div>
                </el-col>
            </el-row> -->
        <!-- 表单验证的错误提示信息 -->
        <el-row>
            <el-col :span="24">
                <div class="tipsWrapper">
                    <div class="errorTips">
                        <p class="msgDetail">错误提示：
                            <!-- <span :class="{block : !validation.hasError('addData.areaParentId')}">
                                上级地区{{ validation.firstError('addData.areaParentId') }},
                            </span> -->
                            <span :class="{block : !validation.hasError('addData.areaCode')}">
                                地区编码{{ validation.firstError('addData.areaCode') }},
                            </span>
                            <span :class="{block : !validation.hasError('addData.areaName')}">
                                地区名称{{ validation.firstError('addData.areaName') }},
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
            <div class="admstr-form-wrapper pt15">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small></small>上级地区</label>
                            <el-select @change="isUpdate" filterable  
                            :class="{redBorder : validation.hasError('addData.areaParentId')}"
                            class="areaParentId" 
                            placeholder=""
                            v-model="addData.areaParentId"  @focus="showErrTips">
                                <el-input
                                    placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="filterText">
                                </el-input>
                                <!-- <el-tree
                                    oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                    :highlight-current="true"
                                    :data="adminAreaTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    default-expand-all
                                    ref="tree"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick"
                                    > -->
                                <el-tree
                                    :render-content="renderContent_componyTree"
                                    :highlight-current="true"
                                    :data="adminAreaTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    :default-expanded-keys="expandId"
                                    ref="tree2"
                                    :expand-on-click-node="false"
                                    :filter-node-method="filterNode"
                                    @node-click="nodeClick"
                                    >
                                </el-tree>
                                <!-- <el-option v-show="false" :key="count.Id" :label="count.areaName" :value="count.Id"   id="adminStrModify_confirmSelect">
                                </el-option> -->
                                <el-option v-show="false" :key="treeNode.Id" :label="treeNode.areaName" :value="treeNode.Id"   id="adminStrModify_confirmSelect">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>                 
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>地区编码</label>
                            <el-input @change="isUpdate" 
                            class="areaCode" 
                            :class="{redBorder : validation.hasError('addData.areaCode')}"
                            v-model="addData.areaCode"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>地区名称</label>
                            <el-input 
                            class="areaName"
                            @change="isUpdate" 
                            :class="{redBorder : validation.hasError('addData.areaName')}"
                            v-model="addData.areaName"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label>备注</label>
                            <el-input
                            class="remark" 
                            @change="isUpdate"
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
                            @change="isUpdate"
                            class="status" 
                            placeholder=""
                            :class="{redBorder : validation.hasError('addData.status')}"
                            v-model="addData.status"  @focus="showErrTips">
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
                            disabled
                            v-model="addData.createdBy"
                            ></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>创建时间</label>
                            <el-date-picker
                            type="date"
                            disabled
                            v-model="addData.createdTime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                </el-col> -->
            </div>
        </el-row>
        <!-- 审计信息 -->
        <auditInfo :auditData='timeData'></auditInfo>
        <!-- ********************************************************** -->
        
        <!-- dialog数据变动提示(是否忽略更改) -->
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
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
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
        <!-- dialog错误信息提示(数据提交错误) -->
        <el-dialog :visible.sync="submitErrorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">{{response.message}}!</p>
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
                <button class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="submitErrorMessage = false" style="width:100%">确 认</button>
                <!-- <button class="dialog_footer_bt dialog_font" @click="submitErrorMessage = false">取 消</button> -->
            </span>
        </el-dialog>
        <!-- dialog --> 
    </div>
</template>

<script>
    import auditInfo from '../Common/auditInfo';
    export default {
        name:'adminstrAreaModify',
        data() {
            return {
                timeData:{//审计信息
                    "createdBy" :'',
                    "createdTime"  : '',
                    "modifiedBy"  : '',
                    "modifiedTime"  : '',
                },
                // isDisable:false,
                update:false, //判断是否修改过
                firstModify:false,//进入页面数据改变一次
                addData:{// 修改数据列表
                    "groupId": 0,
                    "levelNo": 0,
                    "areaParentId": '',
                    "areaCode": "",
                    "areaName": "",
                    "areaFullName": "string",
                    "areaFullPathId": "string",
                    "areaFullPathName": "string",
                    "isSystem": true,
                    "status": '',
                    "remark": "",
                    "createdBy":"",
                    "createdTime":"",
                },
                selectData:{
                    Status001:[],//启用状态
                },
                // ------------------树形控件数据
                adminAreaTree:[],
                defaultProps: {
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                treeNode:{
                    Id:'',
                    areaName:'',
                },
                expandId:[],//默认展开的树节点
                filterText:'',//节点过滤关键字
                // -----------------------------------
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                btnValue:'',//存储点击返回还是修改按钮判断信息
                // ------------------提示框数据
                dialogUserConfirm:false,//信息更改提示控制
                dialogDeleteConfirm:false,//删除信息提示控制
                submitErrorMessage:false,//数据提交有误提示框控制
                detail_message_ifShow: false,
                response: {
                    details: "",
                    message: "",
                    validationErrors: []
                },
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
            }
        },
        created() {
            this.getSelectData();
            this.getDataList();
            this.loadTree();
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
            },
            filterText(val) {
                this.$refs.tree2.filter(val);
            },

        },
        validators: {
            // 'addData.areaParentId': function (value) {//上级地区
            //     return this.Validator.value(value).required().maxLength(50)
            //                 },
            'addData.areaCode': function (value) {//地区编码
                return this.Validator.value(value).required().maxLength(50)
                            },
            'addData.areaName': function (value) {//地区名称
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
        methods: {
            getDataList(){// 获取数据渲染
                let _this = this;
                _this.$axios
                    .gets("/api/services/app/AdAreaManagement/Get", {id:this.$route.params.id})
                    .then(rsp => {
                        // console.log(rsp.result);
                        _this.addData=rsp.result;
                        // _this.addData.areaParentId = rsp.result.areaParentId;
                        // ------------审计信息
                        _this.timeData.createdBy=rsp.result.createdBy;
                        _this.timeData.createdTime=rsp.result.createdTime;
                        _this.timeData.modifiedBy=rsp.result.modifiedBy;
                        _this.timeData.modifiedTime=rsp.result.modifiedTime;

                            _this.treeNode.Id=rsp.result.areaParentId;
                            _this.treeNode.areaName=rsp.result.areaParentId_AreaName;
                        // if (rsp.result.areaParentId==0) {
                        //     console.log("hahah123");
                            
                        //     _this.treeNode.Id=rsp.result.id;
                        //     _this.treeNode.areaName='';
                        // }else{
                        //     _this.$axios.gets("/api/services/app/AdAreaManagement/Get",
                        //     {id: rsp.result.areaParentId})
                        //     .then(
                        //         rsp=>{
                        //             // console.log(rsp.result);
                        //             _this.treeNode.Id=rsp.result.id;
                        //             _this.treeNode.areaName=rsp.result.areaName;
                        //         }
                        //     )
                        // }

                       
                    });
            },
            //------------- 提示框
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
            showErrTips(e){// 表单错误提示信息
                $('.tipsWrapper').css({display:'none'});
            },
            getErrorMessage(message,details,validationErrors){//将rsp的值赋值给response对象 
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
            // ----------------------------按钮组功能
            // ------------返回----------- 
            goback() {// 返回
                this.$store.state.url = "/adminstrArea/adminstrAreaList/default";
                this.$router.push({ path: this.$store.state.url });
            },
            isBack(){
                let _this=this;
                _this.btnValue='toBack';
                if(_this.update){
                    _this.dialogUserConfirm=true;
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
                // let _this=this;
                // if (_this.btnValue=='toBack') {
                //     _this.goback();
                // }else{
                //     _this.dialogUserConfirm=false;
                //     _this.getDataList();
                //     _this.btnValue='';
                //     _this.update=false;
                // }
            },
            isUpdate() {//判断是否修改过信息
                this.update = true;
                // this.isDisable=true;
                // console.log(this.isDisable);
            },
            Cancel(){// 取消
                this.validation.reset();
                this.getDataList();
                this.firstModify=false;
                this.update=false;
                // let _this=this;
                // _this.btnValue='isCancel';
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
                .deletes("/api/services/app/AdAreaManagement/Delete",
                { id:_this.$route.params.id })
                .then(rsp => {
                    _this.dialogDeleteConfirm=false;
                    _this.open("删除成功", "el-icon-circle-check", "successERP");
                    _this.goback();
                },rsp => {
                    _this.dialogDeleteConfirm=false;
                    if(rsp && rsp!=''){ 
                        _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                    }
                    _this.submitErrorMessage=true;
                },
                );
            },
            // --------------删除完-----------
           
            goAdd(){// 去新增
                //点击切换路由去添加
                this.$store.state.url = "/adminstrArea/adminstrAreaDetail/default";
                this.$router.push({ path: this.$store.state.url });
            },
            save() {// 保存
                let _this=this;
                $('.tipsWrapper').css({display:'block'})
                _this.$validate().then(
                    function (success) { 
                        if (success){
                            $('.tipsWrapper').css({display:'none'});
                            if(_this.update){
                                _this.$axios.puts('/api/services/app/AdAreaManagement/Update',_this.addData)
                                .then(
                                    rsp=>{
                                            _this.open('修改成功','el-icon-circle-check','successERP');
                                             _this.update = false;
                                    },
                                    rsp=>{   
                                            // _this.open('修改失败','el-icon-error','faildERP');
                                            // console.log(rsp);
                                            if(rsp && rsp!=''){ 
                                                _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                                }
                                                // _this.dialogUserConfirm=false;
                                                _this.submitErrorMessage=true;
                                        }
                                )
                            }
                        

                        }
                    }
                )
            
            },
            saveAdd() {// 保存并新增
                let _this=this;
                // console.log('123');
                _this.$validate().then(
                    function (success) { 
                        if (success){
                            if(_this.update){
                                _this.$axios.puts('/api/services/app/AdAreaManagement/Update',_this.addData)
                                .then(
                                    rsp=>{
                                                _this.open('修改成功','el-icon-circle-check','successERP');
                                                _this.goAdd();
                                            },
                                    rsp=>{   
                                                _this.open('修改失败','el-icon-error','faildERP');
                                        }
                                )
                            }
                        

                        }
                    }
                )
            },
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
                if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.areaName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.areaName}
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
            filterNode(value, data) {// 在搜索框输入关键字过滤节点
                if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
            },
            loadTree(){// 获取树形节点
                let _this=this;
                // _this.treeLoading=true;
                _this.$axios.gets('/api/services/app/AdAreaManagement/GetTree')
                    .then(function(res){
                // console.log(res.result);
                        _this.adminAreaTree=res;
                        _this.expandId=_this.defauleExpandTree(res,'id')
                        _this.loadCheckSelect('areaParentId',_this.addData.areaParentId)
                        // _this.loadIcon();
                        //  _this.treeLoading=false;
                            },function(res){
                                // _this.treeLoading=false;
                    })
            }, 
            loadIcon(){// 文件夹图标加载
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
            nodeClick(data,node,self){// 节点被点击时的回调
                let _this=this;
                if (_this.addData.id==data.id) {
                    alert("上级地区不能为地区本身")
                }else{
                    _this.treeNode.Id=data.id;
                    _this.treeNode.areaName=data.areaName;
                }
                    //  console.log(data);
               
                // _this.$nextTick(function(){
                //         $('#adminStrModify_confirmSelect').click()
                // })
                self.$nextTick(function() {
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                });
            },
            getSelectData(){// 获取下拉框数据
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                _this.selectData.Status001=res.result;// 启用状态
                })
            },
            reset(){// 重新验证并设置值
                // console.log("123zt");
                this.addData.areaParentId='';
                this.addData.areaCode='';
                this.addData.areaName='';
                this.addData.status='';
                this.addData.remark=''; 
                this.validation.reset();               
            },

        },
        components:{
            auditInfo,
        },
    };
</script>

<style scoped>
    .pt15{
        padding-top: 15px;
    }
    .admstr-modify-wrapper{
        background-color: #fff;
    }
    .admstr-modify-wrapper .el-row:first-child{
        padding: 7px 0;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
    }
    .admstr-modify-wrapper .el-row:last-child{
        padding-bottom: 15px;
    }
</style>
 <style>
    .admstr-modify-wrapperr .admstr-form-wrapper .bgcolor.bgLongWidth .el-textarea{
        width: calc(100% - 90px);
    }
</style>