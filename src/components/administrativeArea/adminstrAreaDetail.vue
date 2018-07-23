<template>
    <div class="admstr-wrapper">
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
                <!-- <button class="erp_bt bt_auxiliary bt_width">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_auxiliary.png">
                    </div>
                    <span class="btDetail">辅助功能</span>
                    <div class="btRightImg">
                        <img src="../../../static/image/common/bt_down_right.png">
                    </div>
                </button> -->
                <button  class="erp_fb_bt bt_add">
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
            </el-col>
        </el-row>
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
        <!-- 表单 -->
        <el-row>
            <div class="admstr-form-wrapper pt15">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small></small>上级地区</label>
                            <el-select filterable 
                            clearable 
                            @change="isChanged"
                            :class="{redBorder : validation.hasError('addData.areaParentId')}"
                            class="areaParentId" 
                            placeholder=""
                            v-model="addData.areaParentId"
                            @focus="showErrTips">
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
                                <!-- <el-option v-show="false" :key="item.id" :label="item.areaName" :value="item.id" >
                                </el-option> -->
                                 <!-- <el-option v-show="false" :key="count.Id" :label="count.areaName" :value="count.Id"   id="adminStrDetail_confirmSelect">
                                </el-option> -->
                                 <el-option  v-show="false"  v-for="item in selectData.upAdminArea" :key="item.id" :label="item.areaName" :value="item.id" :date="item.id">
                                 </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>                 
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>地区编码</label>
                            <el-input 
                            @change="isChanged"
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
                            @change="isChanged"
                            class="areaName" 
                            :class="{redBorder : validation.hasError('addData.areaName')}"
                            v-model="addData.areaName"  @focus="showErrTips"></el-input>
                        </div>
                    </div>
                </el-col>
                <!-- <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>负责人</label>
                            <el-input 
                            class="areaCode" 
                            v-model="addData.areaCode"></el-input>
                        </div>
                    </div>
                </el-col> -->
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label>备注</label>
                            <el-input
                            @change="isChanged"
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
                            @change="isChanged"
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
        <!-- ********************************************** -->
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
    name: "adminstrAreaDetail",
    data() {
        return {
            addData:{// 新增数据列表
                "groupId": 0,
                "levelNo": 0,
                "areaParentId": '',
                "areaCode": "",
                "areaName": "",
                "areaFullName": "string",
                "areaFullPathId": "string",
                "areaFullPathName": "string",
                "isSystem": true,
                "status": 1,
                "remark": "",
                "createdBy" :this.$store.state.name,
                "createdTime"  : this.GetDateTime(),
            },
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
            selectData:{
                Status001:[],//启用状态
                upAdminArea:[],//上级行政地区
            },
            // -------------------------树形控件数据
            adminAreaTree:[{
                    areaName:'行政地区',
                    childItems:[],
                }],
                defaultProps: {
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
            treeNode:{
                    Id:'',
                    areaName:'15155',
            },
            filterText:'',//节点过滤关键字
            expandId:[],//默认展开的树节点
            // ----------提示框信息
            dialogUpdateConfirm:false,
            isUpdate:false,
            
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    created() {
        this.getSelectData();
        this.loadTree();
        this.getDefault();
    },
    validators: {
        // 'addData.areaParentId': function (value) {//上级地区
        //     return this.Validator.value(value).required().maxLength(50)
        // },
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
    //         count () {
    //             return this.treeNode;
    //             },
    // },
    
    methods: { 
        // 成功的提示框
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
        showErrTips(e){// 错误提示信息
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
        GetDateTime() {//获取当前时间
            let date=new Date();
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        isChanged (){//判断是否修改过信息
            this.isUpdate=true;
        },
        // -----------------按钮组功能
        // -----------------取消与返回功能
        cancel(){// 取消
            this.isBack();
        },
        goBack() { // 返回
            this.$store.state.url = "/adminstrArea/adminstrAreaList/default";
            this.$router.push({ path: this.$store.state.url });
        },
        isBack(){//是否返回
            let _this=this;
            if(_this.isUpdate){
                // console.log(_this.isUpdate);
                _this.dialogUpdateConfirm=true;
            }else{
                _this.goBack();
            }
        },
        sureDoing(){
            this.goBack();
        },
        // -----------------取消与返回功能完
        save() {// 保存
            let _this=this;
            $('.tipsWrapper').css({display:'block'})
            _this.$validate().then(
                function (success) { 
                    if (success){
                        $('.tipsWrapper').css({display:'none'});
                        _this.$axios.posts('/api/services/app/AdAreaManagement/Create',_this.addData)
                            .then(
                                rsp=>{
                                    // console.log(rsp.result);
                                    _this.addData.id=rsp.result.id;
                                    _this.$store.state.url='/adminstrArea/adminstrAreaModify/'+rsp.result.id
                                    _this.$router.push({path:_this.$store.state.url})
                                    _this.open('保存成功','el-icon-circle-check','successERP');
                                    // _this.isUpdate=false;
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
        saveAdd() {// 保存并新增
            let _this=this;
            $('.tipsWrapper').css({display:'block'})
                    _this.$validate().then(
                        function (success) {
                            if (success) {
                                $('.tipsWrapper').css({display:'none'});
                                _this.$axios.posts('/api/services/app/AdAreaManagement/Create',_this.addData).then(
                                    rsp=>{
                                        _this.addData.id=rsp.result.id;
                                        _this.$store.state.url='/adminstrArea/adminstrAreaDetail/default'
                                        _this.$router.push({path:_this.$store.state.url})
                                        _this.open('保存成功','el-icon-circle-check','successERP');
                                        _this.reset();
                                        _this.isUpdate=false;
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
        loadTree(){// 获取树形节点
            let _this=this;
            // _this.treeLoading=true;
            _this.$axios.gets('/api/services/app/AdAreaManagement/GetTree')
                .then(function(res){
                    // console.log(res.result);
                    // _this.adminAreaTree=res.result;
                    // for(let i in res.result){
                    //             _this.adminAreaTree[0].childItems=res.result;
                    //         }
                    // _this.loadIcon();
                    _this.adminAreaTree=res;
                    _this.expandId=_this.defauleExpandTree(res,'id');
                    _this.loadCheckSelect('areaParentId',_this.addData.areaParentId)
                    // console.log(_this.addData.areaParentId);
                    // console.log(_this.adminAreaTree);
                    //  _this.treeLoading=false;
                },function(res){
                    // _this.treeLoading=false;
                })
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
        // renderContent_moduleParentId(h, { node, data, store }){
        //     if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
        //         return (
        //             <span class="el-tree-node__label" data-id={data.id}>
        //             <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
        //                 {data.className}
        //             </span>
        //         );
        //     }else{
        //          return (
        //             <span class="el-tree-node__label" data-id={data.id}>
        //             <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
        //                 {data.className}
        //             </span>
        //         );
        //     }
        // },
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
                //  console.log(data);
                // _this.treeNode.Id=data.id;
                // _this.treeNode.areaName=data.areaName;
                // _this.$nextTick(function(){
                //     $('#adminStrDetail_confirmSelect').click()
                // })
                
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                })
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,})

        },
        getDefault(){// 获取上级地区默认值
            let _this=this;
            // if (this.$route.params.upAreaName=='default') {
            //      _this.treeNode.areaName='';
            // }else{
            //      _this.treeNode.areaName=this.$route.params.upAreaName;

            // }
            if(_this.$route.params.id!="default"){
                _this.addData.areaParentId=parseInt(_this.$route.params.id);
                // _this.treeNode.areaName = '15155';
                // _this.treeNode.Id=_this.$route.params.id;
                // console.log(_this.$route.params.name)
                // alert(1)
            }
           



            this.GetDateTime();//获取当前时间
        },
        getSelectData(){ // 获取下拉框数据
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
            // 启用状态
            // console.log(res.result);            
             _this.selectData.Status001=res.result;
            });
            _this.$axios.gets('/api/services/app/AdAreaManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){ 
            // 上级地区
            // console.log(res.result.items);            
             _this.selectData.upAdminArea=res.result.items;
            });

        },
        reset(){ // 重新验证并设置值
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
        submitError,

    },
};
</script>

 <style scoped>
    .pt15{
        padding-top: 15px;
    }
    .admstr-wrapper{
        background-color: #fff;
    }
    .admstr-wrapper .el-row:first-child{
        padding: 7px 0;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
    }
    .admstr-wrapper .el-row:last-child{
        padding-bottom: 15px;
    }
</style>
 <style>
 .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #f0f7ff;
}
</style>
