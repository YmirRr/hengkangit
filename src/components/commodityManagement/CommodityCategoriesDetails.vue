<template>
    <div class="CommodityCategoriesDetails commodityDetails">
        <el-row class="bg-white">
            <el-col :span='24' class="border-left">
               <!-- <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm> -->
               <div class="btnGroup-box">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
               </div>
               <el-row class="pl10 pr10" style="margin-top:20px">
                    <el-row type="flex" justify="center">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor" >
                                <label ><small>*</small>上级商品类目</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor">
                                <el-select 
                                class="areaParentId" 
                                clearable 
                                v-model="addItem.categoryParentid"
                                placeholder="">
                                <!-- <input type="text" class="selectTree"> -->
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
                                    <el-option v-show="false" :key="count.categoryParentid" :label="count.categoryName" :value="count.categoryParentid"   id="businessDetail_confirmSelect">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <!-- <div class="error_tips">{{ validation.firstError('addItem.categoryParentid') }}</div> -->
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt10">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor" >
                                <label ><small>*</small>商品类目编码</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor" >
                                <el-input :class="{redBorder : validation.hasError('addItem.categoryCode')}"  placeholder="" v-model="addItem.categoryCode"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="error_tips">{{ validation.firstError('addItem.categoryCode') }}</div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt10">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor">
                                    <label ><small>*</small>商品类目名称</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor" >
                            <el-input placeholder="" :class="{redBorder : validation.hasError('addItem.categoryName')}" v-model="addItem.categoryName"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="error_tips">{{ validation.firstError('addItem.categoryName') }}</div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt10">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor">
                                    <label>助记码</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor">
                                <el-input  v-model="addItem.mnemonic" > </el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt10">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor">
                                    <label >状态</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor" >
                            <el-select :class="{redBorder : validation.hasError('addItem.status')}" clearable   v-model="addItem.status" >
                                <el-option v-for="item in StatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="error_tips">{{ validation.firstError('addItem.status') }}</div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center" class="mt10">
                        <el-col :span="2">
                            <div class="bgcolor smallBgcolor">
                                    <label >备注</label>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor" >
                            <el-input placeholder="" v-model="addItem.remark">
                            </el-input>
                            </div>
                        </el-col>
                        <el-col :span="2">
                        </el-col>
                    </el-row> 
                    <el-row type="flex" justify="center" class="mt10">
                        <!-- <el-col :span="2" style="">
                            &nbsp;
                        </el-col> -->
                        <el-col :span="2">
                        </el-col>
                        <el-col :span="3">
                            <div class="bgcolor smallBgcolor">
                                <el-checkbox class="tl" v-model="addItem.isService" >服务类（虚拟）</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="2">
                        </el-col> 
                    </el-row>
                </el-row>
                <el-row class="pl10 pr10 pt10" style="border-top:1px solid #e4e4e4;   ">
                    <el-col :span="24" style="margin-bottom:30px">
                        <h4>审计信息</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <el-col :span="8">
                                <div class="bgcolor smallBgcolor">
                                    <label ><small>*</small>创建人</label>
                               </div>
                            </el-col>
                            <el-col :span="13">
                                <div class="bgcolor smallBgcolor">
                                <el-input :disabled="isDisabled" placeholder="" v-model="addItem.createdBy"></el-input>
                                </div>
                            </el-col>
                        </el-row> 
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <el-col :span="8">
                                <div class="bgcolor smallBgcolor">
                                        <label ><small>*</small>创建时间</label>
                               </div>
                            </el-col>
                            <el-col :span="13">
                                <div class="bgcolor smallBgcolor">
                                    <el-date-picker
                                    v-model="addItem.createdTime"
                                    type="date"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    disabled
                                    placeholder="">
                                    </el-date-picker>
                                    <!-- <el-input
                                    :disabled="isDisabled"
                                    v-model="addItem.createdTime"
                                    placeholder="选择日期时间">
                                    </el-input> -->
                                </div>
                            </el-col>
                        </el-row> 
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <el-col :span="8">
                                <div class="bgcolor smallBgcolor">
                                        <label ><small>*</small>修改人</label>
                               </div>
                            </el-col>
                            <el-col :span="13">
                                <div class="bgcolor smallBgcolor">
                                <el-input :disabled="isDisabled" placeholder="" v-model="addItem.modifiedBy"></el-input>
                                </div>
                            </el-col>
                        </el-row> 
                    </el-col>
                    <el-col :span="6">
                        <el-row>
                            <el-col :span="8">
                                <div class="bgcolor smallBgcolor">
                                        <label ><small>*</small>修改时间</label>
                               </div>
                            </el-col>
                            <el-col :span="13">
                                <div class="bgcolor smallBgcolor" >
                                    <el-date-picker
                                    v-model="addItem.modifiedTime"
                                    type="date"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    disabled
                                    placeholder="">
                                    </el-date-picker>
                                    <!-- <el-input
                                    :disabled="isDisabled"
                                    v-model="addItem.modifiedTime">
                                    </el-input> -->
                                </div>
                            </el-col>
                        </el-row> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>      
    </div>
</template>

<script>
import dialogBox from '../../base/dialog/dialog'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
    export default{
        name:'customerInfor',
        data(){
            return{
                radio:'1',
                options: [{
                    value: '选项1',
                    label: '仓库'
                    }, {
                    value: '选项2',
                    label: '地址'
                    }, {
                    value: '选项3',
                    label: '总部'
                    }, {
                    value: '选项4',
                    label: '总部2'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],
                buttonGroup:[{
                    text:'返回',
                    class:'bt_back',
                    icon:'icon-fanhui',
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
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:true,
                }],
                addItem:{
                    categoryParentid:"",//上级商品类目
                    categoryCode:"",//商品类目编码
                    categoryName:"",//商品类目名称
                    mnemonic:"",//助记码
                    status:1,//状态
                    isService:true,//服务类
                    remark:"",//备注
                    categoryFullpathId:0,//全路径id
                    categoryFullpathName:"默认",//全路径名称
                    createdTime:this.GetDateTime(),//创建时间
                    createdBy:this.$store.state.name,//创建人
                    modifiedTime:this.GetDateTime(),//修改人
                    modifiedBy:this.$store.state.name//修改时间
                },
                isDisabled:true,//审计信息 
                isEdit:true,
                treeQuery:"",
                classTree:[],
                defaultProps: {
                    children:'childNodes',
                    label:'categoryName',
                    id:"id"
                },
                treeNode:{
                    categoryParentid:'',
                    categoryName:'',
                },
                StatusOptions:[{
                    value: 1,
                    label: '启用'
                },{
                    value: 0,
                    label: '未启用'
                }],
                dialogCommand:[],//底部按钮组控制组
                //dialogVisible:false,//对话框是否显示
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
                isUpdate:false,//是否修改
                isAdd:false,
                changeTimes:0,
            }
        },
        created(){
            if(this.$route.params.id=="default"){
                this.isAdd=true;
                this.loadTree();
                this.buttonGroup[1].disabled=true;
            }else{
                this.InitModify();
                this.loadTree();
                //this.buttonGroup[3].disabled=true;
            }
        },
        validators: {
            // 'addItem.categoryParentid': function (value) {//上级商品类目
            //     return this.Validator.value(value).required().maxLength(50);
            // },
            'addItem.categoryCode': function (value) {//商品类目编码
                return this.Validator.value(value).required().maxLength(50);
            },
            'addItem.categoryName': function (value) {//商品类目名称
                return this.Validator.value(value).required().maxLength(50);
            },
            'addItem.mnemonic': function (value) {//助记码
                return this.Validator.value(value).required().maxLength(50);
            },
            'addItem.status': function (value) {//状态
                return this.Validator.value(value).required().maxLength(50);
            },
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
            addItem:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    if(this.changeTimes>=2){
                        this.buttonGroup[3].disabled=false;
                        this.buttonGroup[2].disabled=false;
                    }
                },
                deep:true
            },
            classTree:{
                 handler: function (val, oldVal) {
                },
                deep:true
            }
        },
        methods:{
            //获取当前时间
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
            btnClick(btn){             
                if(btn=="取消"){//取消确认对话框
                    this.dialogSetting.dialogName='cancelDialog'
                    this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }else if(btn=="保存"){
                    this.save();
                }else if(btn=="删除"){//删除确认对话框
                    this.dialogSetting.dialogName='delDialog'
                    this.dialogSetting.message="确定删除？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }else if(btn=="返回"){
                    this.$store.state.url='/commodityleimu/commodityClassHeading/default'
           		    this.$router.push({path:this.$store.state.url})//点击切换路由
                }
            },
            InitModify(){
                let _this=this;
                if(_this.$route.params.id=="default"){
                    return;
                }else{
                    _this.$axios.gets('/api/services/app/CategoryManagement/Get',{Id:_this.$route.params.id}).then(function(res){
                        _this.changeTimes=0;
                        _this.updateId=res.result.id;
                        _this.treeNode.categoryParentid=res.result.categoryParentid;
                        _this.treeNode.categoryName=res.result.categoryParentid_CategoryName ;
                        _this.addItem.categoryParentid=res.result.categoryParentid
                        _this.addItem.categoryCode=res.result.categoryCode;
                        _this.addItem.categoryName=res.result.categoryName;
                        _this.addItem.mnemonic=res.result.mnemonic;
                        _this.addItem.status=res.result.status;
                        _this.addItem.isService=res.result.isService;
                        _this.addItem.remark=res.result.remark;
                        _this.addItem.createdTime=res.result.createdTime;
                        _this.addItem.createdBy=res.result.createdBy;
                        _this.addItem.modifiedTime=res.result.modifiedTime;
                        _this.addItem.modifiedBy=res.result.modifiedBy;
                        //_this.tableData=res.result;                   
                    })
                }
                 
            },
            InitCategoryid(){//设置默认商品类目
                if(this.$route.query.CategoryId==""){
                    this.treeNode.categoryParentid=this.classTree[0].id;
                    this.treeNode.categoryName=this.classTree[0].categoryName;
                    this.addItem.categoryParentid=this.classTree[0].id;
                }else if(this.$route.query.CategoryId!=""){
                    this.treeNode.categoryParentid=this.$route.query.CategoryId;
                    this.treeNode.categoryName=this.$route.query.CategoryName;
                    this.addItem.categoryParentid=this.$route.query.CategoryId;
                }else if(this.$route.params.id=="default"){
                    return
                }
                
            },
            loadTree(){//获取tree data
                    let _this=this;
                    _this.treeLoading=true;
                    _this.$axios.gets('/api/services/app/CategoryManagement/GetCategoryTree')
                    .then(function(res){
                        _this.classTree=res;
                        console.log(res);
                        _this.InitCategoryid();
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
            filterNode(value, data) {
                if (!value) return true;
                return data.categoryName.indexOf(value) !== -1;
            },
            nodeClick(data){
                let _this=this;
                _this.treeNode.categoryParentid=data.id;
                _this.treeNode.categoryName=data.categoryName;
                _this.$nextTick(function(){
                    $('#businessDetail_confirmSelect').click()
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
            InitData(){//数据重置
               // this.addItem.categoryParentid="";
                this.addItem.categoryCode="";
                this.addItem.categoryName="";
                this.addItem.mnemonic="";
                this.addItem.remark="";
            },
            save(){//保存
                let _this=this;
                _this.$validate()
                if(!_this.isAdd){
                    let UPDATE_DATA=_this.addItem;
                    _this.$set(UPDATE_DATA, 'id', _this.updateId);
                    _this.$axios.puts('/api/services/app/CategoryManagement/Update',UPDATE_DATA).then(function(res){
                        _this.validation.reset();
                        _this.isEdit=true;
                        _this.changeTimes=0;
                        _this.buttonGroup[3].disabled=true;//取消按钮
                        _this.buttonGroup[2].disabled=true;//保存按钮
                        _this.open('修改商品类目成功','el-icon-circle-check','successERP'); 
                        return;   
                    }).catch(function(err){
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message="信息提报有误";
                        _this.errorTips.message=err.error.message;
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;
                    }); 
                }else{
                    _this.$axios.posts('/api/services/app/CategoryManagement/Create',_this.addItem).then(function(res){
                        //_this.InitModify();
                        _this.InitCategoryid();
                        _this.InitData();
                        _this.buttonGroup[3].disabled=true;//取消按钮
                        _this.validation.reset();
                        _this.open('保存商品类目成功','el-icon-circle-check','successERP');    
                    }); 
                }
                
            },
            dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"){
                            this.validation.reset();
                            this.isAdd=true;
                            this.InitData();                       
                        }else{
                            this.InitModify();
                        }
                        this.changeTimes=0;
                        this.buttonGroup[2].disabled=true;
                        this.buttonGroup[3].disabled=true;
                        this.dialogVisible=false; 
                    }else if(parmas.dialogName=="delDialog"){//删除确认操作
                        let _this=this;
                        _this.$axios.deletes('/api/services/app/CategoryManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                            _this.$store.state.url='/commodityleimu/commodityClassHeading/default'
                            _this.$router.push({path:_this.$store.state.url})//点击切换路由
                            _this.open('删除成功','el-icon-circle-check','successERP'); 
                            _this.dialogVisible=false; 
                        }).catch(function(err){
                            _this.dialogVisible=false;  
                            _this.$message({
                                type: 'warning',
                                message: err.error.message
                            });
                        }) 
                    }else if(parmas.dialogName=="saveDialog"){//保存报错对话框
                        this.dialogVisible=false
                    }
                }else{
                    this.dialogVisible=false; 
                }
            },
            dialogColse(){
                this.dialogVisible=false;
            },
        },
        components:{
            dialogBox,
            buttonGroup
        }
        
 }   
</script>

<style scoped>
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

.error_tips{
    color: red;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
    width: 100%;
    text-align: left;
    margin-left: 26px
  }

</style>

<style>

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
    top: -2px;
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
.el-input.redBorder .el-input__inner,.el-select.redBorder .el-input__inner{
    border-color:red;
}
</style>