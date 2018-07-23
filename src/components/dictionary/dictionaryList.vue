<template>
    <div class="dic-list commodity">
        <el-row class="bg-white">
            <el-col class="left-box" :span="5">
                <el-col :span='24' class="tree-container dictionarylist-tree">
                    <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeParams='treeParams' @nodeClick="nodeClick"></Tree>
                </el-col>   
            </el-col>
            
            <el-col :span='19' class="border-left">
                <el-row class="h48 pr10 pl5">
                    <div class="fixed">
                        <el-col :span="10">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                        </el-col>

                        <div class="search_input_group pt5">
                            <div class="search_input_wapper" @keyup.enter="submitSearch">
                                <el-input v-model="searchKey"
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
                    </div>

                </el-row>

                <el-row class="data-table">
                    <el-col :span='24'>
                        <Table :mutilSeletions='mutilSeletions' :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command" :ifSave="isSave"></Table>                        
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
import Tree from '../../base/tree/tree'
import dialogBox from '../../base/dialog/dialog'
    export default{
        name:'dictionaryList',
        data(){
            return {
                searchLeft:'',
                valueData:{//创建字典值的参数
                    groupId: 0,
                    dictId: 0,
                    itemName: "",
                    itemCode: "",
                    itemValue: "test",
                    seq: 0,
                    remark: "",
                    status: 0,
                    isSystem: false
                },
                 deptParentid: [{//业务地区分类
                    value:'1',
                    label: '业务地区'
                }, {
                    value:'2',
                    label: '行政地区'
                }],
                status: [],
                SelectionChange:[],
                dialogCommand:[],//底部按钮组控制组
                //dialogVisible:false,//对话框是否显示
                dialogVisible:false,
                searchKey:'',
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                httpUrl:{
                    delete:'/api/services/app/DictItemManagement/Delete',//行内删除
                    query:'/api/services/app/DictItemManagement/GetAll',//条件查询
                },
                queryParams:{
                    SkipCount:(this.$store.state.dictionaryListCurrentPage-1)*this.$store.state.dictionaryListEachPage,
                    MaxResultCount:this.$store.state.dictionaryListEachPage
                }, 
                column: [{
                    prop: 'itemCode',
                    label: '编码',
                    controls:'text',
                    required:true,
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    isFix:''
                    },{
                    prop: 'itemName',
                    label: '名称',
                    controls:'text',
                    required:true,
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'itemValue',
                    label: '值',
                    controls:'text',
                    required:false,
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'dictId_DictName',
                    label: '类型',
                    controls:'text',
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'isSystem',
                    label: '系统默认',
                    controls:'checkbox',
                    width:"auto",
                    isDisable:true,
                    sortable:false
                    },{
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'},
                    },{
                    prop: 'remark',
                    label: '备注',
                    controls:'text',
                    width:"auto",
                    isDisable:false,
                    sortable:false,
                    },{
                    prop: 'createdTime',
                    label: '时间',
                    controls:'datetime',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    }],
                isSave:false,
                enableEdit:false,
                tableModel:'dictionaryList',
                command:[{
                    text:'删除',
                    class:'blue'
                }],
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
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
                }],//按钮组


                tableData:[],
                componyTree:  [
                    // {areaName:'根目录',id:'0',items:[]},
                ], 
                defaultProps: {
                    children: 'children',
                    label: 'dictName',
                    id:'id'
                },
                treeEntrySearch:true,//是否包含树节点过滤功能
                treeParams:{
                    treeName:'dictionaryList',//树节点名称
                    treeApi:'/api/services/app/DictManagement/GetDictionaryTree',//接口地址
                }, 
                TreeContextMenu:[//点击鼠标右键生成菜单
                ],
                pageIndex:0,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                page:1,//当前页
                
                multipleSelection: [],//复选框选中数据
                idArray:{
                    ids:[]
                },//复选框选中数据id
                
                treeCheck:[],
                totalItem:0,//总共有多少条消息
                tableLoading:true,
                treeLoading:false,
                Sorting:'',//table搜索
                dialogFormVisible:false,
                // isAdd:true,//判断是增加还是修改
                tittle:'',//模态框tittle
                x:0,//增行的下标
                rows:[],//增行的数组
                addList:[],//新增上传的数组
                updateList:[],//修改过的数组
                dictId:'',//点击左侧树形保存当前的dictId
                dictId_DictName:'',//点击左侧树形保存当前的dictId_DictName
                ar:[],//判断修改后的红标出现
                pageFlag:true,

                //---确认删除-----------------               
                dialogDelConfirm:false,//用户删除保存提示信息
                //-------------------- ------

            }
        },
        created:function(){       
            this.loadSelect();
        },
        watch: {
            searchLeft(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods:{
            //---数据加载---------------------------------------------------
            // loadTableData(){//表格
            //     let self=this;
            //     self.tableLoading=true;
            //     self.$axios.gets('/api/services/app/DictItemManagement/GetAll',{SkipCount:(self.page-1)*self.oneItem,MaxResultCount:self.oneItem}).then(function(res){ 
            //         console.log(res)
            //         self.tableData = res.result.items;
            //         // console.log(self.tableData)
            //          $.each( self.tableData,function(index,value){//处理时间格式
            //             if(value.createdTime&&value.createdTime!=''){
            //                 let createdTime=value.createdTime.slice(0,value.createdTime.indexOf(".")).replace("T"," ");
            //                 self.tableData[index].createdTime=createdTime;
            //                 // console.log(self.tableData[index].createdTime)
            //             } 
            //         })
            //         self.totalItem=res.result.totalCount
            //         self.totalPage=Math.ceil(res.result.totalCount/self.oneItem);
            //         self.tableLoading=false;
            //         },function(res){
            //         self.tableLoading=false;
            //     })
            // },
            // loadTree(){
            //     let self=this;
            //     self.treeLoading=true;
            //     self.$axios.gets('/api/services/app/DictManagement/GetDictionaryTree').then(function(res){
            //         console.log(res)
            //         self.componyTree=res.result;
            //         // console.log(self.componyTree)
            //         self.treeLoading=false;
            //         self.loadIcon();
            //     },function(res){
            //         self.treeLoading=false;
            //     })
            // },
            loadIcon(){
                let self=this;
                self.$nextTick(function () {
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
            loadSelect:function(){
                let self = this;
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                    console.log(res)
                    self.column[5].dataSource = res.result;     
                    
                },function(res){
                    
                })
            },
            //---------------------------------------------------------------
            btnClick(btn){//按钮组点击事件
                if(btn=="新增"){//新增事件
                    this.addCol();
                }else if(btn=="删除"){//删除事件
                    this.delBatch();
                }else if(btn=="保存"){//保存事件
                    this.saveValue();
                }
            },
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
                            _this.$axios.posts('/api/services/app/DictItemManagement/BatchDelete',_this.idArray).then(function(res){
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
            dialogColse(){//对话框关闭回调事件
                this.dialogVisible=false;
            },  

            //---保存--------------------------------------------------------
            saveValue:function(){//保存值表的修改和新增
            
                let _this=this;
                let newArray=_this.$store.state[_this.tableModel+'NewColArray'];
                let newArrayLength=_this.$store.state[_this.tableModel+'NewColArray'].length;
                let updateArray=_this.$store.state[_this.tableModel+'UpdateColArray'];
                let updateArrayLength=_this.$store.state[_this.tableModel+'UpdateColArray'].length;
                let tableData=_this.$store.state[_this.tableModel+'Table'];
                // 新增保存
                if(newArrayLength>0){//新增保存
                    _this.isSave=true;
                    for(let i in newArray){
                        if(newArray[i].brandCode==""||newArray[i].brandName==""||newArray[i].brandEname==""){
                            this.$message({
                                message: '红色框内为必填项！',
                                type: 'error'
                            });
                            return;
                        }
                    }
                }
                console.log(newArray)
                if(newArrayLength>0||updateArrayLength>0){
                      _this.$axios.posts('/api/services/app/DictItemManagement/CUDAggregate',{createList:newArray,updateList:[],deleteList:[]}).then(function(res){
                            _this.$store.commit('setAddColArray',[])//置空新增集合
                            _this.$store.commit('get_RowId',"")//置空修改行id
                            _this.$store.commit('setUpdateColArray',[])//置空修改集合
                            _this.isSave=false;
                            _this.open('保存字典系统值成功','el-icon-circle-check','successERP');  
                        }).catch(function(err){
                                    //err.status;
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
            //----------------------------------------------------------------
            //---清除数据--------------------------------------------------
            clearAddDate:function(){//清除新增数据
                let self = this;
                self.dialogData={//dialog数据
                    id:'',
                    groupId:'1',//集团ID
                    ouId:'1',//组织单元ID
                    deptCode:'',//部门代码
                    deptName:'',//部门名称
                    director:'',//负责人
                    phone:'',//电话
                    deptParentid:'',//父部门id
                    remark:'',//备注
                    status:'',//启用状态
                }
            },
            //----------------------------------------------------------------
            //---新增系统字典值----------------------------------------------------------
            addCol:function(){//增行
                let self = this;
                if(self.dictId!=''){
                    let newcol={
                        groupId: 1,
                        dictId: self.dictId,
                        itemName: "",
                        itemCode: "",
                        itemValue: '',
                        dictId_DictName:self.dictId_DictName,
                        seq: 0,
                        remark: "",
                        status: 1,
                        isSystem: false,
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
                    // console.log(self.rows)
                }else{
                    self.$message({
                        type: 'info',
                        message: '未选择字典'
                    });
                }
            },
            //---复选框--------------------------------------------
            handleSelectionChange(val) {//点击复选框选中的数据
                this.multipleSelection = val;
            },
            //-----------------------------------------------------

            //---确认删除-------------------------------------------
            sureDel:function(){
                let self = this;
                if(self.who == 1){
                    if(self.whoId>0){
                        self.$axios.deletes('/api/services/app/DictItemManagement/Delete',{id:self.whoId}).then(function(res){
                            
                            self.tableData.splice(self.whoIndex,1);
                            self.dialogDelConfirm = false;
                            self.open('删除成功','el-icon-circle-check','successERP');
                            // self.loadTableData();
                        },function(res){
                            self.open('删除失败','el-icon-error','faildERP');
                            self.dialogDelConfirm = false;
                            self.errorMessage=true;
                            self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        })
                    }else{
                        self.dialogDelConfirm = false;
                        self.tableData.splice(self.whoIndex,1);
                        self.addList.splice(self.whoIndex,1);
                        self.open('删除新增行成功','el-icon-circle-check','successERP');
                    }
                };

                if(self.who == 2){
                    self.$axios.posts('/api/services/app/DictItemManagement/BatchDelete',self.idArray).then(function(res){
                        self.loadTableData();
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
            //-----------------------------------------------------

            //---行内删除-------------------------------------------
            delRow:function(index,row,who){
                let self = this;
                self.who = who;
                self.whoIndex = index;
                self.whoId = row.id;
                self.dialogDelConfirm = true;
            },
            //-----------------------------------------------------

            //---多项删除-------------------------------------------
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
            //-----------------------------------------------------

            //-----------------------------------------------------
            // SimpleSearch(){//简单搜索
            //      let self=this;
            //      self.tableLoading=true;
            //     self.$axios.gets('/api/services/app/OuManagement/SimpleSearch',self.searchData)
            //     .then(function(res){
            //         self.load=false
            //         self.tableData=res.result.basOus;
            //         self.tableLoading=false;
            //     },function(res){
            //         self.tableLoading=false;
            //     })
            // },

            //---open-----路由切换-----------------------------------
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
            //-------------------------------------------------------------
            
            
            //---树形操作-----------------------------------------------
            
            filterNode(value, data) {
                if (!value) return true;
                 return data.dictName.indexOf(value) !== -1;
            },

            nodeClick:function(data){
                let self = this;
                console.log(data)
                self.dictId = data.id;
                self.dictId_DictName = data.dictName;
                if(self.dictId==0){
                    self.$axios.gets('/api/services/app/DictItemManagement/GetAll',{SkipCount:(self.page-1)*self.oneItem,MaxResultCount:self.oneItem}).then(function(res){ 
                        console.log(res)
                        self.$store.state[self.tableModel+'Table'] = res.result.items;
                        },function(res){
                    })
                }else{
                    self.$axios.gets('/api/services/app/DictItemManagement/GetDictId',{DictId:data.id,SkipCount:'0',MaxResultCount:'100'}).then(function(res){ 
                        console.log(res)
                        self.$store.state[self.tableModel+'Table'] = res.result.items;
                        self.$store.state[self.tableModel+'otalCount'] = res.result.totalCount;
                        //self.totalItem=res.result.totalCount;
                    },function(res){
                        self.tableLoading=false;
                    })
                }
                
            },
            //--------------------------------------------------------- 
            
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
        },
        components:{
            Table,
            dialogBox,
            Tree,
            buttonGroup
        },
        mounted:function(){
            let _this=this;
            $(window).scroll(function(){
                if($(window).scrollTop()>61){
                    if(!_this.$store.state.show){
                        let w=$('.fixed').parent().width();
                        $('.fixed').width(w);
                        $('.fixed').css({
                        "position":'fixed',
                        "top":'93px',
                        "z-index":'998'
                        }).next('div').css({marginTop:'47px'})
                    }else{
                        let w=$('.fixed').parent().parent().width();
                        $('.fixed').width(w);
                        $('.fixed').css({
                        position:'fixed',
                        top:'93px',
                        zIndex:'998',
                        transition: 'width 0s'
                        }).next('div').css({marginTop:'47px'})
                    }
                    _this.$store.commit('go1');
                }else{
                    $('.fixed').css({
                        position:'relative',
                        top:'0',
                        transition: 'width 0s'
                    }).next('div').css({marginTop:0})
                    _this.$store.commit('go2');
                }
            })

        },
    }
</script>

<style scoped>
.tree-container{
    height: 450px;
}
.tree-container>div{
    height: 100%;
}
.fixed{
     background-color: #fff;   
}
.error_tips{
    height: 15px;
    line-height: 15px;
    color: #f66;
}
.search_input .el-input__inner{
    padding-left: 30px !important;
}
.dialogBtn{
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    background-color: #fff;
    color: #c9c9c9;
    border: none;
    border-top: 1px solid #c9c9c9;
    outline: none;
    cursor: pointer;
}
.dialogBtn:focus{
    outline: none;
}
.dialog-footer .dialogBtn:first-child{
   border-right: 1px solid #c9c9c9;
}
.dialog-footer{
    padding:0;
    height: 50px;
}
.dialogBtn:hover{
     color: #6699FF;
}
.TreeMenu{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 100px;
}
.TreeMenu button{
    display: block;
    width: 100%;
    height: calc(100% / 3);
}
.formSearch{
    float: right;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.pl5{
    padding-left: 5px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.pr10{
    padding-right: 10px;
}
.pl15{
    padding-left: 15px;
}
.pr15{
    padding-right: 15px;
}
.pt5{
    padding-top: 5px;
}
.border-right{
    border-right: 1px solid #E4E4E4;
    min-height: 380px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    width: calc(100% - 290px);
    min-height: 380px;
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
</style>

<style>
.dic-list .el-button+.el-button{
    margin-left: 0;
}
.dic-list .bAreaSearch .el-input__inner{
    height: 30px;
    border-radius: 30px;
}
/* .bAreaListForm .el-tree-node>.el-tree-node__children{
    overflow: visible!important;
} */
.dic-list .el-dialog__footer{
    padding:0;
}
.dic-list .areaDialog .bgcolor:first-child{
    margin-top:15px;
}
.data-table .el-input__inner{
    height: 28px;
    text-align:center;
    border:none;
}
.dic-list .el-input--suffix .el-input__inner{
    padding:0;
}

.dic-list .bgw .el-input__inner{
    background-color:white;
}
.dic-list .bgg .el-input__inner{
    background-color:#FAFAFA;
}
</style>
<style>
.dictionarylist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.dictionarylist-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 3px 15px 8px;
}
.dictionarylist-tree .el-input__prefix{
    left: 20px;
}
</style>