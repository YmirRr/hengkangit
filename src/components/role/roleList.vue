<template>
    <div class="roleList commodity">
        <el-row class="bg-white">
            <el-col class="left-box" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../static/image/common/search_btn.png"  class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                           <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">角色编码</label>
                        </el-col>
                        <el-col :span="15">
                            <el-input class="input-entry" v-model="queryParams.roleCode"></el-input>
                        </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">角色名称</label>
                        </el-col>
                        <el-col :span="15">
                            <el-input class="input-entry" v-model="queryParams.displayName"></el-input>
                        </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">所属组织</label>
                        </el-col>
                        <el-col :span="15">
                           <el-select clearable  v-model="queryParams.OuId" placeholder="" class="input-entry">
                                <el-input
                                placeholder="搜索..."
                                class="selectSearch"
                                v-model="search">
                                </el-input>
                                <el-tree
                                :render-content="renderContent_selectTree"
                                :default-expanded-keys="expandId"
                                :data="selectTree"
                                :highlight-current="true"
                                :props="selectProps"
                                node-key="id"
                                ref="tree"
                                :filter-node-method="filterNode"
                                :expand-on-click-node="false"
                                @node-click="nodeClick"
                                >
                                </el-tree>
                                <el-option v-show="false" :key="item.id" :label="item.ouName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                </el-row>
                 <el-row class="mt20">
                        <el-col :span="8">
                            <div class="height1"></div>
                        </el-col>
                        <el-col :span="14">
                            <span class="search-btn" @click="query">查询</span>
                        </el-col>
                </el-row>
             
            </el-col>

            <el-col class="border-left min-height" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <!-- <span class='open-search'>+</span> -->
                             <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22">
                           <el-col :span="12">
                                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup> 
                            </el-col> 
                        <el-col :span="12">     
                        <div class="search-input-group pt5">
                            <div class="search_input_wapper"  @keyup.enter="submitSearch">
                                <el-input
                                    placeholder="搜索..."
                                    v-model="Name"
                                    class="search_input">
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                            <div class="search_button_wrapper" @click="dialogUserDefined = true">
                                <button class="userDefined" >
                                    <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                </button>
                            </div>
                        </div>
                    </el-col>
                </el-col>   
                </el-row>
                <!-- dialog -->
                <el-dialog :visible.sync="dialogUserDefined" class="dialogUserDefined">
                    <template slot="title">
                        <span>自定义<small>(设置显示字段)</small></span>
                    </template>
                     <el-table
                        :data="tableData" 
                        border 
                        style="width: 100%" 
                        stripe 
                        ref="multipleTable">
                            <el-table-column label="序号" fixed="left">
                                 <template slot-scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="field" label="字段" fixed="left"></el-table-column>
                            <el-table-column prop="field" label="操作" fixed="left">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="tableData[scope.$index].value"
                                        active-color="#13ce66">
                                    </el-switch>
                                </template>
                            </el-table-column>
                        </el-table>   
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary">确 定</el-button>
                            <el-button>取 消</el-button>
                        </span>
                </el-dialog>
                <!-- dialog -->
                <el-row>
                    <el-col :span='24'>
                        <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
         <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     
    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
    export default{
        data(){
            return {
                ifOpen:false,
                 // 错误信息提示开始
                detail_message_ifShow:false,
                errorMessage:false,
                // 错误信息提示结束
//--------------确认删除开始-----------------               
                dialogUserConfirm:false,//用户删除保存提示信息
                row:{},//存储用户点击删除条目数据
                choseAjax:'',//存储点击单个删除还是多天删除按钮判断信息
                multipleSelection: [],//复选框选中数据
                idArray: {
                    ids: []
                },
//--------------确认删除开始-----------------    
                search:'',
                selectTree:[
                ],
                item:{
                    id:'',
                    ouName:'',
                },
                expandId:[],
                selectProps: {
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },


                tableLoading:false,
                searchData:{
                    OuCode: "",//编码
                    Name: "",//名称
                    CompanyOuId:'',//所属公司
                    AreaId: '',//行政地区
                    Status: '',//启用状态
                    OuType: '',//组织类型
                },
                searchDataClick:{},
                tableSearchData:{},
                
                tableData:[],

                pageIndex:1,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                page:1,//当前页
                treeCheck:[],
                isClick:[],
                load:'loadTableData',
                totalItem:0,//总共有多少条消息
                ifWidth:false,
                dialogUserDefined:false,//dialog

                response:{
                details:'',
                message:'',
                validationErrors:[],
                },
                Name:'',//右上角模糊查询
                tableModel:"roleList",
                dialogVisible:false,
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                dialogCommand:[],
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
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
                },{
                    text:'启用',
                    class:'bt_start',
                    icon:'icon-qiyong',
                    disabled:false,
                },{
                    text:'停用',
                    class:'bt_stop',
                    icon:'icon-tingyong',
                    disabled:false,
                }],
                 httpUrl:{
                   view:'/role/roleModify/',//查看详情
                   delete:'/api/services/app/Role/Delete',//单条删除
                   query:'/api/services/app/Role/GetAll',//条件查询
                },
                queryParams:{//查询条件参数
                    roleCode:'',//
                    displayName : '',//
                    OuId:'',//
                    SkipCount:(this.$store.state.roleListCurrentPage-1)*this.$store.state.roleListEachPage,
                    MaxResultCount:this.$store.state.roleListEachPage,
                    },
                column: [{
                            prop: 'roleCode',
                            label: '角色编码',
                            controls:'button',
                            isDisable:true,
                            sortable:false,
                            isFix:'',
                            }, {
                            prop: 'displayName',
                            label: '角色名称',
                            controls:'button',
                            isDisable:true,
                            sortable:false,
                            }, {
                            prop: 'ouName',
                            label: '所属组织',
                            controls:'text',
                            isDisable:true,
                            sortable:false,
                            }, {
                            prop: 'status',
                            label: '状态',
                            controls:'classMapSelect',
                            isDisable:true,
                            sortable:false,
                            dataSource:[],
                            optionsKey:{label:'itemName',value:'itemValue'}
                            },{
                            prop: 'createdTime',
                            label: '创建时间',
                            controls:'datetime',
                            isDisable:true,
                            sortable:false,
                        }],
                            dialogVisible:false,
                            dialogCommand:[],
                            pluginSetting:{
                                hasPagination:true,
                                mutiSelect:true,//多选栏
                                isDisable:true,
                            },
                            command:[{
                                text:'查看',
                                class:'green'
                            },{
                                text:'删除',
                                class:'blue'
                            }],
                             delAarry:{
                                ids:[]
                            },
            }
        },
        watch: {
            search(val) {
                this.$refs.tree.filter(val);
            }
        }, 
        mounted () {
            // let content1=document.getElementById('bg-white');//设置高度为全屏
            // let height1=window.innerHeight-123;
            // content1.style.minHeight=height1+'px';
        },
        created:function(){       
                let _this=this;
                _this.InitStatus();
                _this.loadTree();
                _this.loadTableData();
             },
        methods:{
            query(){
                let _this=this;
                _this.$axios.gets('/api/services/app/Role/GetAll',_this.queryParams).then(function(res){//查询表格数据
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.roleListEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                   
            })
            },
            InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[3].dataSource=res.result;
                })
            },
              btnClick:function(data){
                if(data=="新增"){
                   this.goDetail();
                }else if(data=="删除"){
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
                }else if(data=="导入"){
                    let _this=this;
                    let name='roleImportFile';//具体菜单页面下的导入模板路由name
                    let backRouterName=_this.$route.name;//导入模板里面的返回前一页功能需要传入的前一页的路由name
                    let redirectedName='role';//获取菜单模块id时需要传菜单的路由name，也就是父级路由name
                    let id='default';//key
                    _this.$axios.gets('/api/services/app/ModuleManagement/GetByUrl',{Url:redirectedName})
                    .then(function(res){
                        id=res.result.id;
                        _this.$store.state.url=name
                        _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
                    })
                }
            },
            closeLeft:function(){
               let self = this;
               self.ifWidth = false;
                self.ifOpen = false;
           },
           openLeft:function(){
               let self = this;
               self.ifWidth = true;
               self.ifOpen = true;
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
            loadTableData(){//表格
                let _this=this;
                _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},'loadTableData')
            },
            ajaxTable(data,event){
                 let _this=this;
                _this.tableLoading=true
                _this.$axios.gets('/api/services/app/Role/GetAll',data).then(function(res){ 
                    _this.load=event;
                    _this.tableData=res.result.items;
                    _this.totalItem=res.result.totalCount
                    _this.totalPage=Math.ceil(res.result.totalCount/_this.oneItem);
                    _this.tableLoading=false;
                  
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
            },
            defauleExpandTree(data,key){
                if(typeof(data[0])!='undefined'
                && data[0]!=null 
                && typeof(data[0][key])!='undefined'
                && data[0][key]!=null
                && data[0][key]!=''){
                    return [data[0][key]]
                }
            },
            loadTree(){
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetAllTree')
                .then(function(res){
                    _this.selectTree=res;
                    _this.expandId=_this.defauleExpandTree(res,'id')
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
            nodeClick(data,node,self){
                let _this=this;
                _this.item.id=data.id;
                _this.item.ouName=data.ouName;
                _this.$nextTick(function(){
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                })
                    
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //     if($(this).attr('date')==data.id){
                //         $(this).click()
                //     }
                // })
            },
            handleCurrentChange(val) {//页码改变
                 let _this=this;
                 _this.page=val;
                 if(_this.load=="loadTableData"){
                     _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"loadTableData")
                 }else if(_this.load=="SimpleSearch"){
                     _this.SimpleSearch();
                 }else if(_this.load=="submitSearch"){
                       _this.ajaxTable({DisplayName:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
                 }
            },
            SimpleSearchClick(){
                let _this=this;                
                 _this.searchDataClick={
                    roleCode:_this.searchData.roleCode,//
                    displayName: _this.searchData.displayName,//
                    ouId: _this.searchData.ouId,//
                    status: _this.searchData.status,
                    sorting:'',
                }
                _this.page=1;
                _this.SimpleSearch();
            },
            SimpleSearch(){//简单搜索
                 let _this=this;
                 _this.tableLoading=true;
                 _this.searchDataClick.SkipCount=(_this.page-1)*_this.oneItem;
                 _this.searchDataClick.MaxResultCount=_this.oneItem;

                // _this.ajaxTable(_this.searchDataClick,"SimpleSearch")
            },
            goDetail(){
                this.$store.state.url='/role/roleDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
             handleSelectionChange(val) {//点击复选框选中的数据
                this.multipleSelection = val;
            },
            confirm(){//多项删除
                let _this=this;
                _this.choseAjax='rows'
                if(_this.multipleSelection.length>0){
                _this.dialogUserConfirm=true;
                }
            },
            confirmDelThis(row){//单项删除
                let _this=this;
                _this.choseAjax='row'
                _this.row=row;
                _this.dialogUserConfirm=true;
            },
            sureAjax(){
                let _this=this;
                if(_this.choseAjax=='row'){
                    _this.delThis()
                }else if(_this.choseAjax=='rows'){
                    _this.delRow()
                }
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
            delThis(){//删除行
                let _this=this;
                _this.$axios.deletes('/api/services/app/Role/Delete',{id:_this.row.id})
                .then(function(res){
                     _this.dialogUserConfirm=false;
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    _this.loadTableData();
                },function(res){
                    if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                     _this.dialogUserConfirm=false;
                      _this.errorMessage=true;
                })
            },
            delRow(){
                let _this=this;
                for (let i in _this.multipleSelection) {
                    _this.idArray.ids.push(_this.multipleSelection[i].id);
                }
                if(_this.idArray.ids.length > 0){
                _this.$axios.posts('/api/services/app/Role/BatchDelete',_this.idArray )
                .then(function(res){
                    _this.open('删除成功','el-icon-circle-check','successERP');
                        _this.loadTableData();
                        _this.loadTree();
                        _this.idArray = {
                            ids: [],
                        };
                        _this.dialogUserConfirm=false;
                },function(res){
                    if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                    _this.errorMessage=true;
                    _this.dialogUserConfirm=false;
                     _this.idArray = {
                    ids: [],
                  };
                })
                }
            },
            see(row){
                this.$store.state.url='/role/roleModify/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
             submitSearch(){
                let _this=this;
                // _this.page=1
                // _this.ajaxTable({displayName:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
                 _this.$axios.gets('/api/services/app/Role/GetAll',{displayName:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem}).then(function(res){ 
                     
                        _this.$store.commit('Init_Table',res.result.items);
                        let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.roleListEachPage);
                        _this.$store.commit('Init_pagination',totalPage);
                        _this.$store.commit('Init_TotalCount',res.result.totalCount);
                        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })
            },
            renderContent_selectTree(h, { node, data, store }){
                if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }
            },
             dialogClick(parmas){//对话框按钮点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="delDialog"){
                        this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                        console.log(this.SelectionChange);
                        for(var i in this.SelectionChange){
                            this.delAarry.ids.push(this.SelectionChange[i].id)
                        }
                        let _this=this;
                        
                        //批量删除
                        _this.$axios.posts('http://192.168.100.107:8082/api/services/app/Role/BatchDelete',_this.delAarry).then(function(res){
                                // _this.queryParams.CategoryId="";
                                _this.$store.commit('setQueryParams',_this.queryParams)
                                _this.$store.dispatch('InitTable');
                                _this.$store.commit('setTableSelection',[])
                                _this.dialogVisible=false;
                                _this.loadTree();
                                _this.delAarry.ids=[];
                                _this.open('删除成功','el-icon-circle-check','successERP');    
                        }).catch(function(err){
                            _this.dialogVisible=false;
                            _this.delAarry.ids=[];
                            _this.$message({
                                type: 'warning',
                                message: err.error.message
                            });
                        });
                    }
                }else if(parmas.dialogButton=="取消"){
                    this.dialogVisible=false;
                }        
            },
        // 关闭对话框
         dialogColse(){
                this.dialogVisible=false;
            }, 
            
        },
        components:{
            buttonGroup,
            Table,
            dialogBox,
            Tree
        }
    }
</script>

<style scoped>
.border-left.rightBox{
    width: calc(100% - 290px);
}
.border-left.newRight{
    width: 100%;
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
.pl15{
    padding-left: 15px;
}
.pt5{
    padding-top: 5px;
}
.fs12{
    font-size: 12px;
}
.border-left{
    border-left: 1px solid #E4E4E4;

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
.open-search{
    background-image: url(../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
} 
</style>

<style>
.roleList .el-button+.el-button{
    margin-left: 0;
}

</style>