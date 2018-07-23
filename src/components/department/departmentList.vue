<template>
    <div class="de-list commodity">
            <el-col class="left-box">
                <el-col :span='24' class="tree-container repositorylist-tree">
                    <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                </el-col>   
            </el-col>
            <el-col class="border-left">
                <el-row class="pr10">
                    <div class="fixed">
                        <el-col :span="10">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
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

                <el-row>
                    <el-col :span='24'>
                        <Table  :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command" :ifSave="isSave"></Table>                          
                    </el-col>
                </el-row>

            </el-col>
        <!-- dialog --> 
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     

    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
    export default{
        name:'customerInfor',
        components:{
            buttonGroup,
            Table,
            dialogBox,
            Tree
        },
        data(){
            return {
                searchLeft:'',
                ifCan:true,
                 deptParentid: [{//业务地区分类
                    value:'1',
                    label: '业务地区'
                }, {
                    value:'2',
                    label: '行政地区'
                }],
                // statusC:[],//状态
                tableData:[],
                //---左侧树形------
                componyTree:  [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id:'id'
                },
                treeEntrySearch:true,//是否包含树节点过滤功能
                treeParams:{
                    treeName:'departmentList',//树节点名称
                    treeApi:'/api/services/app/DeptManagement/GetAllTree',//接口地址
                },                
                expandId:[],
                //----------------
                pageIndex:0,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                multipleSelection: [],//复选框选中数据
                idArray:{
                    ids:[]
                },//复选框选中数据id
                page:1,//当前页
                treeCheck:[],
                isClick:[],
                load:true,
                totalItem:0,//总共有多少条消息
                tableLoading:true,
                treeLoading:false,
                Sorting:'',//table搜索
                AreaType:1,//树形图的地区分类(1.业务地区.2行政地区)
                isAdd:true,//判断是增加还是修改
                tittle:'',//模态框tittle
                showParent:true,//上级组织单元是否可选

                //---确认删除-----------------               
                //dialogDelConfirm:false,//用户删除保存提示信息
                //-------------------- 
                dialogCommand:[],//底部按钮组控制组
                SelectionChange:[],
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
                //---------------------------
                searchKey:'',
                selfAr:[],//根据id获得树形节点本身
                //-------------------
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
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                httpUrl:{
                    delete:'/api/services/app/DeptManagement/Delete',//行内删除
                    query:'/api/services/app/DeptManagement/GetAll',//条件查询
                    view:'/department/departmentModify/'
                },
                queryParams:{
                    SkipCount:(this.$store.state.dictionaryListCurrentPage-1)*this.$store.state.dictionaryListEachPage,
                    MaxResultCount:this.$store.state.dictionaryListEachPage
                }, 
                column: [{
                    prop: 'deptCode',
                    label: '部门编码',
                    controls:'button',
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:''
                    },{
                    prop: 'deptName',
                    label: '部门名称',
                    controls:'button',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'manager',
                    label: '负责人',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'deptParentName',
                    label: '上级部门',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'remark',
                    label: '备注',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false
                    },{
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
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
                    sortable:false,
                    }],
                isSave:false,
                enableEdit:false,
                tableModel:'departmentList',
                command:[{
                    text:'查看',
                    class:'blue'
                },{
                    text:'删除',
                    class:'blue'
                }],



            }
        },
        created:function(){       
            let self = this;
            self.InitStatus();
            //self.loadTableData();
            //self.loadTree();
            self.loadStatus();
        },
        validators: {
            'dialogData.deptCode':function(value){//部门编码
                return this.Validator.value(value).required().maxLength(50)
            },
            'dialogData.deptName':function(value){//部门名称
                return this.Validator.value(value).required().maxLength(50)
            },
            'dialogData.director': function (value) {//负责人
                return this.Validator.value(value).required().maxLength(20);
            },
            'dialogData.phone': function (value) {//电话
                return this.Validator.value(value).required().maxLength(50);
            },
            'dialogData.deptParentid': function (value) {//上级业务地区
                return this.Validator.value(value).required().integer();
            },
            'dialogData.remark': function (value) {//备注
                return this.Validator.value(value).required().maxLength(200);
            },
        }, 
        watch: {
            searchLeft(val) {
                this.$refs.tree.filter(val);
            }
            
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
        methods:{
            
            //---数据加载---------------------------------------------------
            // loadTableData(){//表格
            //     let self=this;
            //     self.tableLoading=true;
            //     self.$axios.gets('/api/services/app/DeptManagement/GetAll',{SkipCount:(self.page-1)*self.oneItem,MaxResultCount:self.oneItem,Sorting:self.Sorting}).then(function(res){ 
            //         //self.tableData = res.result.items;
            //         //console.log(self.tableData)
            //          $.each( self.tableData,function(index,value){//处理时间格式
            //             if(value.createdTime&&value.createdTime!=''){
            //                 let createdTime=value.createdTime.slice(0,value.createdTime.indexOf(".")).replace("T"," ");
            //                 self.tableData[index].createdTime=createdTime;
            //             } 
            //         })
            //         self.totalItem=res.result.totalCount
            //         self.totalPage=Math.ceil(res.result.totalCount/self.oneItem);
            //         self.tableLoading=false;
            //         },function(res){
            //         self.tableLoading=false;
            //     })
            // },
            InitStatus(){//获取状态枚举表
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[5].dataSource=res.result;
                })
            },
            loadTree(){
                let self=this;
                self.treeLoading=true;
                self.$axios.gets('api/services/app/DeptManagement/GetAllTree').then(function(res){
                    console.log(res)
                    self.treeLoading=false;
                    // for(let i in res.result){
                    self.componyTree=res.result
                    self.expandId = self.defauleExpandTree(res.result,'id')
                    // }
                    console.log(self.componyTree)
                    
                    // self.loadIcon();
               },function(res){
                   self.treeLoading=false;
               })
            },
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
            loadStatus:function(){//加载状态下拉框
                let self = this;
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                    self.column[5].dataSource = res.result;       
               },function(res){

               })
            },
            //---------------------------------------------------------------

            //---保存--------------------------------------------------------
            save:function(){
                let self = this;
                self.$validate().then(function(success){
                    if(success){
                        if(self.dialogData.id!=''&&self.dialogData.id!=0){//判断参数id值，为''是新增，其他为创建
                            self.$axios.puts('/api/services/app/DeptManagement/Update',self.dialogData).then(function(res){
                                self.dialogFormVisible=false;
                                self.loadTableData();
                            },function(res){    
                                console.log('error')
                            })
                        }else{
                            self.$axios.posts('/api/services/app/DeptManagement/Create',self.dialogData).then(function(res){
                                self.dialogFormVisible=false;
                                self.loadTableData();
                                self.clearAddDate();
                            },function(res){    
                                console.log('error')
                            })
                        }
                    }
                })
            },
            //----------------------------------------------------------------

            // ---跳转--------open----------------------------------------------
            goDetail(){//点击新增跳转
               this.$store.state.url='/department/departmentDetail/default'
               this.$router.push({path:this.$store.state.url})//点击切换路由
            },

            goModify:function(id){//点击跳转修改页modify
                this.$store.state.url='/department/departmentModify/'+id;
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            
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

            //---修改---------------------------------------------------------
            modify:function(row){
                // console.log(row)
                let self = this;

                
                // id (integer, optional),
                // groupId (integer): 集团ID ,
                // ouId (integer): 组织单元ID ,
                // deptCode (string): 部门代码 ,
                // deptName (string): 部门名称 ,
                // director (string): 负责人 ,
                // phone (string): 电话 ,
                // deptParentid (integer): 父部门id ,
                // remark (string): 备注 ,
                // status (integer): 启用状态

                self.tittle='修改';
                self.dialogFormVisible = true;
                self.dialogData.id = row.id;
                self.dialogData.groupId = row.groupId;
                self.dialogData.ouId = row.ouId;
                self.dialogData.deptCode = row.deptCode;
                self.dialogData.deptName = row.deptName;
                self.dialogData.director = row.director;
                self.dialogData.phone = row.phone;
                self.dialogData.deptParentid = row.deptParentid;
                self.dialogData.status = row.status;
                console.log(self.dialogData)
            },
            //----------------------------------------------------------------
            //---行内删除-----------------------------------------------------
            delRow:function(index,row,who){
                let self = this;
                self.who = who;
                self.whoIndex = index;
                self.whoId = row.id;
                self.dialogDelConfirm = true;
            },
            //---------------------------------------------------------------

            //---多项删除----------------------------------------------------
            delMore:function(num){
                let self = this;
                self.idArray.ids = [];
                for(let i in self.multipleSelection){
                    self.idArray.ids.push(self.multipleSelection[i].id)
                }

                if(self.idArray.ids.length>0){
                    // if(self.idArray.ids.indexOf(undefined)!=-1){
                    //     self.$message({
                    //         type: 'warning',
                    //         message: '新增数据请在行内删除'
                    //     });
                    //     return;
                    // }
                    self.dialogDelConfirm = true;   
                    self.who = num;
                }else{
                    self.$message({
                        type: 'info',
                        message: '请勾选需要删除的数据！'
                    });
                }
            },
            //--------------------------------------------------------------

            //---控制编辑------分页--------------------------------------------
            handleCurrentChange(val) {//页码改变
                 let self=this;
                 self.page=val;
                 if(self.load){
                     self.loadTableData();
                 }
            },
            
            handleSelectionChange(val) {//点击复选框选中的数据
                this.multipleSelection = val;
            },
            //-----------------------
            btnClick(btn){//按钮组点击事件
                let self = this;
                if(btn=="新增"){
                    self.goDetail();
                }else if(btn=="删除"){
                    self.delBatch(2);
                }else if(btn=="导入"){
                    
                }else if(btn=="导出"){
                    
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
                        console.log(this.idArray.ids)
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
                            _this.$axios.posts('/api/services/app/DeptManagement/BatchDelete',_this.idArray).then(function(res){
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


            //---------------------------------------------------------------
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
            //------------------------
            renderContent(h, { node, data, store }){//
                // console.log(data)s
                if(typeof(data.children)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.name}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.name}
                        </span>
                    );
                }
            },
            //------------------------
            //---树形操作-----------------------------------------------
            defauleExpandTree(data,key){
                if(typeof(data[0])!='undefined'
                && data[0]!=null 
                && typeof(data[0][key])!='undefined'
                && data[0][key]!=null
                && data[0][key]!=''){
                    return [data[0][key]]
                }
            },
            // nodeClick:function(data){
            //     let self = this;
            //     self.tableData = [];
            //     console.log(data)

            //     if(data.id){
            //         let flag = false;
            //         self.$axios.gets('/api/services/app/DeptManagement/Get',{id:data.id}).then(function(res){
            //             console.log(res)
            //             self.selfAr = res.result
            //             flag = true;
            //             console.log(self.selfAr)
            //         },function(res){
            //             self.selfAr = [];
            //             flag = false
            //             console.log(1)
            //         })

            //         self.$axios.gets('/api/services/app/DeptManagement/GetAll',{DeptParentid:data.id,SkipCount:0,MaxResultCount:100}).then(function(res){
            //             console.log(res)
            //             self.tableData=res.result.items
            //             if(flag){
            //                 self.tableData.unshift(self.selfAr);
            //             }
                        
            //             self.totalPage=Math.ceil(res.result.totalCount/self.oneItem);
                        
            //         },function(res){
            //             self.treeLoading=false;
            //         })
            //     }else{
            //         self.loadTableData();
            //     }
                
            // },
            TreeNodeClick(data){//树节点点击回调      
                let _this=this; 
                console.log(data)
                if(data.id){
                        _this.$axios.gets('/api/services/app/DeptManagement/GetAll',{DeptParentid:data.id,SkipCount:0,MaxResultCount:100}).then(function(res){      
                            _this.$store.commit('Init_Table',res.result.items);
                            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.departmentListEachPage);
                            _this.$store.commit('Init_pagination',totalPage);
                            _this.$store.commit('Init_TotalCount',res.result.totalCount);
                            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1    
                        })
                }     

            },


            filterNode(value, data) {
                if (!value) return true;
                 return data.name.indexOf(value) !== -1;
            },
            //------------------------------------------------------------------- 
            
            //---表格查询------------------------------------------
            submitSearch(){
                let self=this;
                if(self.searchKey!=''){
                    self.searchTable();
                }else{
                    self.loadTableData();
                }
            },
            // searchTable:function(){
            //     let self = this;
            //     self.$axios.gets('/api/services/app/DeptManagement/GetAll',{DeptName:self.searchKey,SkipCount:'0',MaxResultCount:'10'}).then(function(res){
            //         console.log(res);

            //         self.tableData = res.result.items;
            //         self.total = res.result.totalCount;
            //         self.totalPage = Math.ceil(self.total/self.eachPage)
            //     },function(res){
            //         console.log('err'+res)
            //     })
            // },
            //----------------------------------------------------
        },
    }
</script>

<style scoped>

.de-list .border-left{
    width: calc(100% - 290px);
}

.tree-container{
    height: 450px;
}
.tree-container>div{
    height: 100%;
}

.fixed{
    background-color: white;
}
.error_tips{
    height: 15px;
    line-height: 15px;
    color: #f66;
}
.inline-block-need{
    display: inline-block;
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
.de-list .el-button+.el-button{
    margin-left: 0;
}
.de-list .bAreaSearch .el-input__inner{
    height: 30px;
    border-radius: 30px;
}
/* .bAreaListForm .el-tree-node>.el-tree-node__children{
    overflow: visible!important;
} */
/* .data-wrapper .el-dialog__footer{
    padding:0;
}
.data-wrapper .areaDialog .bgcolor:first-child{
    margin-top:15px;
} */
.de-list .bgcolor{
    margin-bottom: 0
}
.de-list .cell .el-input__inner{
    border:none;
    text-align:center;
    padding:0;
}
.de-list .bgw .el-input__inner{
    background-color:white;
}
.de-list .bgg .el-input__inner{
    background-color:#FAFAFA;
}
</style>
<style>
.de-list .left-box{
    border-right: 1px solid #E4E4E4;
}
.repositorylist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.repositorylist-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 3px 15px 8px;
}
.repositorylist-tree .el-input__prefix{
    left: 20px;
}
</style>
