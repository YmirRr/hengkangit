<template>
    <div class="cu-list">
        <el-row class="bg-white">
            <el-col :span='24'>
                <el-row class="pb5 fixed">
                    <el-col :span="10">
                        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                    </el-col>
                    <div class="search_input_group pt10">
                        <div class="search_input_wapper">
                            <el-input
                                placeholder="搜索..."
                                class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                        <div class="search_button_wrapper">
                            <button class="userDefined">
                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                            </button>
                        </div>
                    </div>

                </el-row>

                <el-row class="pb10">
                    <el-col :span="24">
                        <Table  :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command" :ifSave="isSave"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- dialog -->
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>

    </div>
</template>

<script>
import Table from '../../base/Table/Table'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
    export default{
        name:'currencyList',
        data(){
            return {
                allList:[],//所有数据列表
                statusAr:[],//状态下拉框数据

                updateList:[],//修改的数据
                addList:[],//新增的数据
                multipleSelection: [],//复选框选中数据
                idArray:{
                    ids:[]
                },//复选框选中数据id
                SelectionChange:[],
                pageIndex:1,//分页的当前页码
                totalPage:0,//当前分页总数
                total:'',//数据总条数
                page:1,//当前页
                pagex:1,//前一页
                eachPage:10,//一页显示的数量
                x:0,//增行的下标
                rows:[],//增行的数组
                createParams:{
                    "group_id": 1,
                    "currencyCode": "",
                    "currencyName": "",
                    "increment": '',
                    "seq": 0,
                    "status": '',
                    "remark": ""
                },
                redShow:false,//判斷修改过的表格左上角红标
                redIndex:'',
                ar:[],
                turnPage:-1,
                pageFlag:true,
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogVisible:false,
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                dialogCommand:[],//底部按钮组控制组
                httpUrl:{
                    query:'/api/services/app/CurrencyManagement/GetAll',//条件查询
                    delete:'/api/services/app/CurrencyManagement/Delete',//行内删除
                },
                column: [{
                    prop: 'currencyCode',
                    label: '*币种编码',
                    controls:'text',
                    required:true,
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    isFix:''
                    },{
                    prop: 'currencyName',
                    label: '*币种名称',
                    controls:'text',
                    required:true,
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'increment',
                    label: '最小递增额',
                    controls:'text',
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'status',
                    label: '*状态',
                    controls:'classMapSelect',
                    width:"auto",
                    required:true,
                    isDisable:false,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    },{
                    prop: 'remark',
                    label: '备注',
                    controls:'text',
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'createdBy',
                    label: '创建人',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'createdTime',
                    label: '创建时间',
                    controls:'datetime',
                    width:"auto",
                    isDisable:true,
                    sortable:true,
                    }],
                queryParams:{
                    SkipCount:(this.$store.state.currencyListCurrentPage-1)*this.$store.state.currencyListEachPage,
                    MaxResultCount:this.$store.state.currencyListEachPage
                },
                tableModel:'currencyList',
                command:[{
                    text:'删除',
                    class:'blue'
                }],
                isSave:false,
                buttonGroup:[{
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
                    disabled:false,
                },{
                    text:'导入',
                    class:'bt_in',
                    icon:'icon-daoru',
                    disabled:false,
                },{
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
                }],//按钮组
                //---确认删除-----------------
                dialogDelConfirm:false,//用户删除保存提示信息
                //-------------------- ------
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
                who:'',//删除的是谁以及是否是多项删除
                whoId:'',//单项删除的id
                whoIndex:'',//单项删除的index
            }
        },
        created:function(){
            this.loadSelect();
        },
        validators:{
            'allList.currencyCode': function (value) {//币种编码
                return this.Validator.value(value).required();
            },
        },
        components:{
            Table,
            buttonGroup,
            dialogBox
        },
        methods:{

        //---获取下拉数据----------------------------------------------------
            loadSelect:function(){
                let self = this;
                this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    //self.statusAr = res.result;
                    self.column[3].dataSource=res.result
                },function(res){
                    console.log('err'+res)
                })
            },
        //------------------------------------------------------------------

        // ---创建数据，修改数据---------------------------------------------
            save:function(){//点击保存按钮
                let _this=this;
                let newArray=_this.$store.state[_this.tableModel+'NewColArray'];
                let newArrayLength=_this.$store.state[_this.tableModel+'NewColArray'].length;
                let updateArray=_this.$store.state[_this.tableModel+'UpdateColArray'];
                let updateArrayLength=_this.$store.state[_this.tableModel+'UpdateColArray'].length;
                let tableData=_this.$store.state[_this.tableModel+'Table'];
                // 新增保存
                console.log(newArray)
                if(newArrayLength>0){//新增保存
                    _this.isSave=true;
                    for(let i in newArray){
                        if(newArray[i].currencyCode==""||newArray[i].currencyName==""||newArray[i].status==""){
                            this.$message({
                                message: '红色框内为必填项！',
                                type: 'error'
                            });
                            return;
                        }
                    }
                }
                if(newArrayLength>0||updateArrayLength>0){
                      _this.$axios.posts('api/services/app/CurrencyManagement/CUDAggregate',
                        {createList:newArray,updateList:updateArray,deleteList:[]}).then(function(res){
                            _this.$store.commit('setAddColArray',[])//置空新增集合
                            _this.$store.commit('get_RowId',"")//置空修改行id
                            _this.$store.commit('setUpdateColArray',[])//置空修改集合
                            _this.$store.dispatch('InitTable');
                            _this.isSave=false;
                            _this.open('保存货币资料成功','el-icon-circle-check','successERP');
                        }).catch(function(err){
                            _this.dialogSetting.dialogType="submit";
                            _this.dialogSetting.dialogName='saveDialog'
                            _this.dialogSetting.message="信息提报有误";
                            _this.errorTips.message=err.error.message;
                            _this.errorTips.details='';
                            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            _this.dialogVisible=true;
                            _this.isSave=false;
                        })
                }

            },
            addCol:function(){//增行
                let newcol={
                    group_id: 1,
                    currencyCode: "",
                    currencyName: "",
                    increment: 0,
                    seq: 0,
                    status: 1,
                    remark: ""
                }

                let newArrayLength=this.$store.state[this.tableModel+'NewColArray'].length;
                if(newArrayLength>2){
                    this.$message({
                        type: 'info',
                        message: '请先编辑保存新增项'
                    });
                }else{
                    this.isSave=false;
                    this.$store.dispatch('addCol',newcol);//表格行内新增
                }

            },
        //-----------------------------------------------------------------

        // --------------open----------------------------------------------
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
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        btnClick(btn){//按钮组点击事件
            if(btn=="新增"){//新增事件
                this.addCol();
            }else if(btn=="删除"){//删除事件
                this.delBatch();
            }else if(btn=="保存"){//保存事件
                this.save();
            }else if(btn=="取消"){//取消事件
                this.cancel();
            }else if(btn=="启用"){
                this.handleStatus(1);
            }else if(btn=="停用"){
                this.handleStatus(0);
            }
        },

        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
        //---确认删除-------------------------------------------------------
        sureDel:function(){
            let self = this;
            if(self.who == 1){
                if(self.whoId>0){
                    self.$axios.deletes('/api/services/app/CurrencyManagement/Delete',{id:self.whoId}).then(function(res){
                        // console.log(res);
                        self.allList.splice(self.whoIndex,1);
                        self.dialogDelConfirm = false;
                        self.open('删除成功','el-icon-circle-check','successERP');
                        self.loadAllList();
                    },function(res){
                        self.open('删除失败','el-icon-error','faildERP');
                        self.dialogDelConfirm = false;
                        self.errorMessage=true;
                        self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    })
                }else{
                    self.allList.splice(self.whoIndex,1);
                    self.addList.splice(self.whoIndex,1);
                    self.dialogDelConfirm = false;
                    self.open('删除新增行成功','el-icon-circle-check','successERP');
                }
            };

            if(self.who == 2){
                self.$axios.posts('/api/services/app/CurrencyManagement/BatchDelete',self.idArray).then(function(res){
                    self.loadAllList();
                    self.dialogDelConfirm = false;
                    self.open('删除成功','el-icon-circle-check','successERP');
                },function(res){
                    self.open('删除失败','el-icon-error','faildERP');
                    self.dialogDelConfirm = false;
                    self.errorMessage=true;
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                })
            }
        },
        //-----------------------------------------------------------------

        //---行内删除-------------------------------------------------------
        delRow:function(index,row,who){
            let self = this;

            self.who = who;
            self.whoIndex = index;
            self.whoId = row.id;
            self.dialogDelConfirm = true;

        },
        //-----------------------------------------------------------------

        //---多项删除-------------------------------------------------------
        delBatch(){//批量删除
            this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
            if(this.SelectionChange.length==0){
                this.$message({
                    type: 'info',
                    message: '请勾选需要更改删除的记录！'
                });
            }else{
                this.dialogSetting.dialogName='delDialog'
                this.dialogSetting.message="确定删除？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
            }
        },
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    console.log( this.idArray)
                    let _this=this;
                    if(_this.idArray.ids.indexOf(undefined)!=-1){
                            _this.$message({
                                type: 'warning',
                                message: '新增数据请在行内删除'
                            });
                            _this.dialogVisible=false;
                            this.idArray.ids=[];
                            return;
                    }
                    if(_this.idArray.ids.length>0){
                        _this.$axios.posts('/api/services/app/CurrencyManagement/BatchDelete',_this.idArray).then(function(res){
                            _this.$store.dispatch('InitTable');
                            _this.$store.commit('setTableSelection',[])
                            _this.idArray.ids=[];
                            _this.dialogVisible=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');
                        })
                    }
                }else if(parmas.dialogName=="saveDialog"){//保存提交对话框
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){//取消对话框
                    this.isSave=false;
                    this.dialogVisible=false;//关闭对话框
                    this.$store.dispatch('InitTable');
                    this.$store.commit('setAddColArray',[])//置空新增集合
                    this.$store.commit('setUpdateColArray',[])//置空修改增集合
                }
            }else if(parmas.dialogButton=="取消"){
                if(parmas.dialogName=="delDialog"){//多选删除取消操作
                    this.$store.commit('setTableSelection',[])//置空多选
                }
                this.dialogVisible=false;
            }

        },

        delMore:function(num){
            let self = this;
            self.idArray.ids = [];
            for(let i in self.multipleSelection){
                self.idArray.ids.push(self.multipleSelection[i].id)
            }

            if(self.idArray.ids.length>0){
                if(self.idArray.ids.indexOf(undefined)!=-1){
                    self.$message({
                        type: 'warning',
                        message: '新增数据请在行内删除'
                    });
                    return;
                }
                self.dialogDelConfirm = true;
                self.who = num;
            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
        },
        //-----------------------------------------------------------------
        //---错误提示-------------------------------------------------------
        showErrprTips(e){
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').hasClass($(this).attr('name'))){
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
        //-----------------------------------------------------------------
    }
}
</script>

<style scoped>
    .store-data-wrapper{
        width: 100%;
        height: auto;
    }
    .fixed{
        background-color: white;
    }
    .bg-white{
        background: white;
        border-radius: 3px;
    }
    .h48{
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #E4E4E4;
    }
    .mt5{
        margin-top: 5px;
    }
    .pb5{
        padding-bottom: 5px;
    }
    .mt10{
        margin-top: 10px;
    }
    .mt20{
        margin-top: 20px;
    }

    .ml10{
        margin-left: 10px;
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
    .fs14{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.349019607843137);
    }
    .fs12{
        font-size: 12px;
    }
    .border1{
        border: 1px solid #cccccc;
        border-radius: 3px;
    }
    .btn{
        display: inline-block;
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background: rgba(130, 170, 252, 1);
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
    .rbtn{
        display: inline-block;
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background: rgba(242, 242, 242, 1);
        border-radius: 3px;
        cursor: pointer;
    }
    .search-btn{
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        background: #4A6997;
        color: white;
        cursor: pointer;
    }
    .open{
        display: inline-block;
        width: 49px;
        height: 22px;
        line-height: 22px;
        border: 1px solid #cccccc;
        color: #cccccc;
        text-align: center;
        cursor: pointer;
    }
    .text-right{
        text-align: right;
    }
</style>

<style>
.cu-list .bgw .el-input__inner{
    text-align:center;
    border:none;
    padding:0;
    background-color:white;
}
.cu-list .bgg .el-input__inner{
    text-align:center;
    border:none;
    padding:0;
    background-color:#FAFAFA;
}
.cu-list .el-select-dropdown__item{
    text-align:center;
}
</style>
