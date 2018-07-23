<template>
    <div class="OuListForm commodity">
            <el-col class="left-box" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../static/image/common/search_btn.png" class="closeLeft"> 
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                         <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">组织类型</label>
                    </el-col>
                    <el-col :span="15">
                         <el-select clearable filterable v-model="queryParams.OuType" placeholder=""class="input-entry">
                            <el-option v-for="item in selectData.OUType" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">编码</label>
                        </el-col>
                        <el-col :span="15">
                            <el-input class="input-entry" v-model="queryParams.OuCode"></el-input>
                        </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">名称</label>
                        </el-col>
                        <el-col :span="15">
                            <el-input class="input-entry" v-model="queryParams.Name"></el-input>
                        </el-col>
                </el-row>
                 <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">所属公司</label>
                        </el-col>
                        <el-col :span="15">
                            <el-select class="companyOuId input-entry"
                                clearable filterable
                                v-model="queryParams.companyOuId" placeholder="">
                                    <el-input
                                    placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="search">
                                    </el-input>
                                    <el-tree
                                    :render-content="renderContent_companyOuId"
                                    :default-expanded-keys="expand_companyOuId"
                                    :data="selectTreeCompany"
                                    :props="selectPropsCompany"
                                    :highlight-current="true"
                                    node-key="id"
                                    ref="tree"
                                    :filter-node-method="filterNode_company"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick_company"
                                    >
                                    </el-tree>
                                    <el-option v-show="false" :key="item.id" :label="item.ouFullname" :value="item.id">
                                    </el-option>
                            </el-select>
                        </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">行政地区</label>
                        </el-col>
                        <el-col :span="15">
                            <el-select clearable v-model="queryParams.AreaId" placeholder=""class="input-entry">
                                <el-input
                                    placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="search_area">
                                </el-input>
                                    <el-tree
                                    :render-content="renderContent_AreaId"
                                    :default-expanded-keys="expand_AreaId"
                                    :data="selectTree_area"
                                    :props="selectProps_area"
                                    :highlight-current="true"
                                    node-key="id"
                                    ref="tree"
                                    :filter-node-method="filterNode_area"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick_area"
                                    >
                                    </el-tree>
                                    <el-option v-show="false" :key="item.id" :label="item.areaName" :value="item.id"></el-option>
                                    
                            </el-select>
                        </el-col>
                </el-row>
                <el-row class="mt10">
                        <el-col :span="8">
                            <label class="input-label">启用状态</label>
                        </el-col>
                        <el-col :span="15">
                          <el-select clearable filterable   v-model="queryParams.Status" placeholder="" class="input-entry">
                               <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
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
            <el-col class="border-left" :class="ifOpen?'rightBox':'newRight'">
                 <el-row>
                    <!-- <el-col :span="ifWidth?4:3" class="transfer_fixed" v-loading="treeLoading" id="ouListTree">
                        <vue-scroll :ops="$store.state.option">
                        <el-tree 
                        :render-content="renderContent_Ou"
                        :default-expanded-keys="expand_Ou"
                        :data="componyTree"
                        :props="defaultProps"
                        :highlight-current="true"
                        node-key="id"
                        :expand-on-click-node="false"
                        @node-click="nodeClick">
                        </el-tree>
                        </vue-scroll>
                    </el-col> -->
                    <el-col :span="ifWidth?4:3" class="tree-container mt10">
                         <!-- <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree> -->
                         <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                    </el-col>
             <el-col :span="ifWidth ? 20:21" >
                <el-row class="h48">
                    <el-col :span="ifWidth?0:2" class="search-block" :class="[{bl:!ifWidth,br:!ifWidth}]">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <!-- <span class='open-search'>+</span> -->
                             <i class="iconfont icon-gray icon-jiahao f18 fr" ></i>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22">
                        <el-row>
                            <el-col :span="13">
                                <div class="btnGroup-box" :class="{bl:ifWidth}">
                                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                                </div>
                            </el-col>
                            <el-col :span="11">
                                <div class="search-input-group pt5">
                                    <div class="search_input_wapper" @keyup.enter="submitSearch">
                                        <el-input
                                            placeholder="搜索..."
                                            v-model="Name"
                                            class="search_input">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </div>
                                    <div class="search_button_wrapper" @click="dialogUserDefined = true">
                                        <button class="userDefined">
                                            <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                        </button>
                                    </div>
                                </div>
                            </el-col> 
                        </el-row>
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
                            <el-table-column label="序号">
                                 <template slot-scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="field" label="字段"></el-table-column>
                            <el-table-column prop="field" label="操作">
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
                        <!-- <el-table 
                        v-loading="tableLoading"
                        :data="tableData" 
                        border 
                        style="width: 100%" 
                        @selection-change="handleSelectionChange" 
                        ref="multipleTable">
                            <el-table-column type="selection" fixed></el-table-column>
                            <el-table-column prop="ouCode" label="编码" fixed>
                                <template slot-scope="scope">
                                    <el-button type="text"  @click="modify(scope.row)">{{tableData[scope.$index].ouCode}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ouName" label="名称" fixed>
                                <template slot-scope="scope">
                                    <el-button type="text"  @click="modify(scope.row)">{{tableData[scope.$index].ouName}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ouFullname" label="全称"></el-table-column>
                            <el-table-column prop="ouParentName" label="上级业务单元"></el-table-column>
                            <el-table-column prop="companyOuName" label="所属公司"></el-table-column>
                            <el-table-column prop="baseCurrencyName" label="本位币种"></el-table-column>
                            <el-table-column prop="basAccperiodContent" label="启用年月" width="160">
                            </el-table-column>
                            <el-table-column prop="statusTValue" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.statusTValue=='启用'" style="color:#39CA77;">{{scope.row.statusTValue}}</span>
                                    <span v-else-if="scope.row.statusTValue=='停用'" style="color:#FF6666;">{{scope.row.statusTValue}}</span>
                                    <span v-else>{{scope.row.statusTValue}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="公司">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.cop" disabled></el-checkbox>
                                   
                                </template>
                            </el-table-column>
                            <el-table-column label="业务">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.business" disabled></el-checkbox>
                                   
                                </template>
                            </el-table-column>
                            <el-table-column label="财务">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.finace" disabled></el-checkbox>
                               
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                 <template slot-scope="scope">
                                    <el-button type="text"  @click="confirmDelThis(scope.row)" >删除</el-button>
                                    <el-button type="text"  @click="modify(scope.row)" >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        style="margin-top:20px;" 
                        class="text-right" 
                        background layout="total,prev, pager, next,jumper" 
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-size="oneItem"
                        :total="totalItem">
                        </el-pagination>    -->
                          <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
    </el-col>
    <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick"></dialogBox>       
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
            search:"",
            errorMessage:false,
            // 错误信息提示结束      
//--------------确认删除开始-----------------               
                dialogUserConfirm:false,//用户删除保存提示信息
                row:{},//存储用户点击删除条目数据
                choseAjax:'',//存储点击单个删除还是多天删除按钮判断信息
                multipleSelection: [],//复选框选中数据
                   idArray: {
                    ids: []
                }, //复选框选中数据id
//--------------确认删除开始-----------------     
                expand_AreaId:[],        
                search_area:'',
                selectTree_area:[
                ],
                selectTreeCompany:[],//公司树
                item:{
                    id:"",
                    areaName:"",
                },
                selectProps_area: {
                    children: 'childItems',
                    label: 'name',
                    id:'id'
                },
                expand_companyOuId:[],      
                 selectPropsCompany:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                   },

                tableLoading:false,
                treeLoading:false,
                searchData:{
                    OuCode: "",//编码
                    Name: "",//名称
                    companyOuId:'',//所属公司
                    AreaId: '',//行政地区
                    Status: '',//启用状态
                    OuType: '',//组织类型
                },
                selectData:{//select数据
                    OUType:[],//组织类型
                    Status001:[],//启用状态
                    companys:[],//所属公司
                    // area:[],//业务地区
                },
                searchDataClick:{},
                tableSearchData:{},
               
                tableData:[],
                expand_Ou:[],
                componyTree:  [

                ],
                defaultProps: {
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                treeSuggestSearch:false,//是否包含树节点建议过滤功能
                treeEntrySearch:false,//是否包含树节点输入过滤功能
                treeParams:{
                    treeName:'OuManageList',//树节点名称
                    treeApi:'/api/services/app/OuManagement/GetAllTree',//接口地址
                },
                pageIndex:1,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                page:1,//当前页
                treeCheck:[],
                isClick:[],
                load:"loadTableData",
                totalItem:0,//总共有多少条消息
                ifWidth:false,
                dialogUserDefined:false,//dialog
                height:'0px',

                detailParentId:'',//tree节点点击获取前往detail新增页上级业务地区ID
                detailParentName:'',//tree节点点击获取前往detail新增页上级业务地区name
                response:{
                    details:'',
                    message:'',
                },
                Name:'',//右上角模糊查询
                httpUrl:{
                   //Initial:'/api/services/app/CategoryManagement/GetAll',//数据初始化
                   view:'/OuManage/OuManageModify/',//查看详情
                   delete:'/api/services/app/OuManagement/Delete',//单条删除
                   query:'/api/services/app/OuManagement/GetAll',//条件查询
                },
                 queryParams:{//查询条件参数
                    OuCode: "",//编码
                    Name: "",//名称
                    companyOuId:'',//所属公司
                    AreaId: '',//行政地区
                    Status: '',//启用状态
                    OuType: '',//组织类型
                    OuParentid:"",//上级组织id
                    SkipCount:(this.$store.state.OuManageListCurrentPage-1)*this.$store.state.OuManageListEachPage,
                    MaxResultCount:this.$store.state.OuManageListEachPage,
                },
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
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
                    text:'打印',
                    class:'bt_print',
                    icon:'icon-print',
                    disabled:false,
                },{
                    text:'导出',
                    class:'bt_out',
                    icon:'icon-daochu',
                    disabled:false,
                },{
                    text:'辅助功能',
                    class:'bt_auxiliary',
                    icon:'icon-fuzhugongneng',
                    disabled:false,
                }],
                tableModel:'OuManageList',
                column:[{
                    prop: 'ouCode',
                    label: '编码',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'ouName',
                    label: '名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'ouFullname',
                    label: '全称',
                    width:'120px',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'ouParentName',
                    label: '上级业务单元',
                    width:'120px',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'companyOuName',
                    label: '所属公司',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'baseCurrencyName',
                    label: '本位币种',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'basAccperiodContent',
                    label: '启用年月',
                    controls:'text',
                    width:'120px',
                    isDisable:true,
                    sortable:false,
                    },
                    {
                    prop: 'status',
                    label: '状态',
                    width:'120px',
                    controls:'classMapSelect',
                    isDisable:true,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    }, {
                    prop: 'isCompany',
                    label: '公司',
                    controls:'checkbox',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'isBusiness',
                    label: '业务',
                    controls:'checkbox',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'isFinance',
                    label: '财务',
                    controls:'checkbox',
                    isDisable:true,
                    sortable:false,
                    }],
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
        created:function(){       
                let _this=this;
                _this.InitStatus();
                _this.getSelectData();
                _this.loadTableData();
                _this.loadTree();
                _this.loadTreeCompany();
                
             },
         watch: {
            search_area(val) {
                this.$refs.tree.filter(val);
            },
            search(val) {
             this.$refs.tree.filter(val);
            
            },
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
                    let w=$('.fixed').parent().width();
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
             InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[7].dataSource=res.result;
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
                }
            },
            getSelectData(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OUType'}).then(function(res){ 
                    // 组织类型
                    _this.selectData.OUType=res.result;
                    })
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                    // 启用状态
                    _this.selectData.Status001=res.result;
                    //  _this.column[3].dataSource=res.result;
                    })
                 _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList').then(function(res){ 
                // 公司
                    _this.selectData.companys=res.result;
                })    
                // _this.$axios.gets('/api/services/app/AreaManagement/GetAll').then(function(res){ 
                // // 业务地区
                // _this.selectData.area=res.result.items;
                // })
            },
            filterNode_area(value, data) {
                if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
            },
            filterNode_company(value, data) {
               if (!value) return true;
               return data.ouFullname.indexOf(value) !== -1;
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
                _this.page=1
                _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"loadTableData")
            },
            ajaxTable(data,event){
                 let _this=this;
                _this.tableLoading=true
                _this.$axios.gets('/api/services/app/OuManagement/GetAll',data).then(function(res){ 
                    // console.log(res);
                    _this.load=event;
                    _this.tableData=res.result.items;
                    $.each(_this.tableData,function(index,val){
                        let finace=false;
                        let business=false;
                        let cop=false;
                        $.each(val.basOuTypes,function(x,value){
                            if(value.ouType==3){
                                finace=true;
                            }
                            if(value.ouType==2){
                                business=true;
                            }
                            if(value.ouType==1){
                                cop=true
                            }
                        })
                        val.finace=finace;
                        val.business=business;
                        val.cop=cop;
                    })
                    _this.totalItem=res.result.totalCount
                    _this.totalPage=Math.ceil(res.result.totalCount/_this.oneItem);
                    _this.tableLoading=false;
                    },function(res){
                    _this.tableLoading=false;
                })
            },
            loadTree(){
                let _this=this;
            //     _this.treeLoading=true;
            //     _this.$axios.gets('/api/services/app/OuManagement/GetAllTree')
            //     .then(function(res){
            //         // console.log(res);
            //         _this.componyTree=res.result;
            //         _this.treeLoading=false;
            //         _this.expand_Ou=_this.defauleExpandTree(res.result,'id')
            //    },function(res){
            //        _this.treeLoading=false;
            //    })
               //地区
                _this.$axios.gets('/api/services/app/OpAreaManagement/GetTree')
                .then(function(res){
                    _this.selectTree_area=res;
                    _this.expand_AreaId=_this.defauleExpandTree(res,'id')
                },function(res){
                })
                // //公司
                // _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:1})
                //     .then(function(res){
                //         console.log(res);
                //         _this.selectTreeCompany=res.result;
                //     },function(res){
                //     })
            },
                loadTreeCompany(){
                let _this=this;
                _this.treeLoading=true;
                _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:1})
                .then(function(res){
                     console.log(res)
                    _this.selectTreeCompany=res.result;
                    _this.expand_companyOuId=_this.defauleExpandTree(res.result,'id')
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
            handleCurrentChange(val) {//页码改变
                 let _this=this;
                 _this.page=val;
                 if(_this.load=="loadTableData"){
                     _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"loadTableData")
                 }else if(_this.load=="SimpleSearch"){
                     _this.SimpleSearch();
                 }else if(_this.load=="submitSearch"){
                       _this.ajaxTable({Name:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
                 }else if(_this.load=="nodeClick"){
                     _this.ajaxTable({OuParentid:_this.detailParentId,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem})
                 }
            },
            query(){//条件查询
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetAll',_this.queryParams).then(function(res){//查询表格数据
                    // _this.queryParams.CategoryId="";
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.OuManageListEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1                       
                });
                _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{//查询树形数据
                    OuType:_this.queryParams.OuType,
                    OuCode:_this.queryParams.OuCode,
                    CompanyOuId:_this.queryParams.CompanyOuId,
                    AreaId:_this.queryParams.AreaId,
                    Name:_this.queryParams.Name,
                    OuParentid:_this.queryParams.OuParentid,
                    Status:_this.queryParams.Status
                }).then(function(res){
                    _this.$store.commit('Init_Tree',res.result);
                }).catch(function(err){
                });
            },
            SimpleSearchClick(){
                let _this=this;
                 _this.searchDataClick={
                    OuCode:_this.searchData.OuCode,//编码
                    Name: _this.searchData.Name,//名称
                    companyOuId:_this.searchData.companyOuId,//所属公司
                    AreaId: _this.searchData.AreaId,//行政地区
                    Status: _this.searchData.Status,//启用状态
                    OuType: _this.searchData.OuType,//组织类型
                }
                _this.page=1
                _this.SimpleSearch();
            },
            SimpleSearch(){//简单搜索
                 let _this=this;
                 _this.searchDataClick.SkipCount=(_this.page-1)*_this.oneItem;
                 _this.searchDataClick.MaxResultCount=_this.oneItem;
                 _this.ajaxTable(_this.searchDataClick,"SimpleSearch")
            },
            goDetail(){
                let _this=this;
                if(typeof(_this.detailParentId)=='number'){
                    _this.$store.state.url='/OuManage/OuManageDetail/'+_this.detailParentId
                    _this.$router.push({path:this.$store.state.url})//点击切换路由
                }else{
                    _this.$store.state.url='/OuManage/OuManageDetail/default'
                    _this.$router.push({path:this.$store.state.url})//点击切换路由
                }
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
                _this.$axios.deletes('/api/services/app/OuManagement/Delete',{id:_this.row.id})
                .then(function(res){
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    _this.loadTableData();
                    _this.loadTree();
                    _this.dialogUserConfirm=false;
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
                _this.$axios.posts('api/services/app/OuManagement/BatchDelete',_this.idArray )
                .then(function(res){
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    if(_this.load){
                        _this.loadTableData();
                    }else{
                        _this.SimpleSearch();
                    }
                    _this.loadTree()
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
            // nodeClick(data){
            //      let _this=this;
            //      _this.detailParentId=data.id;
            //      _this.detailParentName=data.ouFullname;
            //      _this.page=1
            //      _this.ajaxTable({OuParentid:_this.detailParentId,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem})
                 
            // },
            TreeNodeClick(data){//树节点点击回调            
                let _this=this;
                _this.detailParentId=data.id;
                _this.detailParentName=data.ouFullname;
                _this.queryParams.OuParentid=_this.detailParentId;
                _this.tableLoading=true;
                _this.$axios.gets('/api/services/app/OuManagement/GetAll',_this.queryParams).then(function(res){                     
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.OuManageListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1    
                    })
            },
            nodeClick_area(data,node,self){
                let _this=this;
                _this.item.id=data.id;
                _this.item.areaName=data.name;
                _this.$nextTick(function(){
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                })
                
            },
            // 点击所属公司节点
             nodeClick_company(data,node,self){
                let _this=this;
                _this.item.id=data.id;
                _this.item.ouFullname=data.ouFullname;
                _this.$nextTick(function(){
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                })
                
            },
            modify(row){
                this.$store.state.url='/OuManage/OuManageModify/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
            },
            submitSearch(){
                let _this=this;
                 _this.$axios.gets('/api/services/app/OuManagement/GetAll',{Name:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem}).then(function(res){            
                        _this.$store.commit('Init_Table',res.result.items);
                        let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.OuManageListEachPage);
                        _this.$store.commit('Init_pagination',totalPage);
                        _this.$store.commit('Init_TotalCount',res.result.totalCount);
                        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })
                // _this.page=1
                //  _this.ajaxTable({Name:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
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
            renderContent_companyOuId(h, { node, data, store }){
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
            renderContent_AreaId(h, { node, data, store }){
                if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
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
            // renderContent_Ou(h, { node, data, store }){
            //     if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
            //         return (
            //             <span class="el-tree-node__label" data-id={data.id}>
            //             <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
            //                 {data.ouName}
            //             </span>
            //         );
            //     }else{
            //         return (
            //             <span class="el-tree-node__label" data-id={data.id}>
            //             <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
            //                 {data.ouName}
            //             </span>
            //         );
            //     }
            // },
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
                        _this.$axios.posts('/api/services/app/OuManagement/BatchDelete',_this.delAarry).then(function(res){
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
.fixed{
    background-color: white;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.border-left.rightBox{
    width: calc(100% - 290px)
}
.border-left.newRight{
    width: 100%;
}
.tree-container{
    height: 450px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt20{
    margin-top: 20px;
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
.OuListForm .el-button+.el-button{
    margin-left: 0;
}
.tree-container{
    height: 450px;
}
.tree-container>div{
    height: 100%;
}
</style>