<template>
    <div class="roleList commodity">
        <el-row class="bg-white">
            <el-col class="left-box" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">商品编码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" v-model="queryParams.ProductCode" placeholder=""></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">商品名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" v-model="queryParams.ProductName" placeholder=""></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">上市时间(起)</label>
                    </el-col>
                    <el-col :span="15">
                       <el-date-picker
                       class="input-entry"
                       v-model="queryParams.SaleDateStart"
                       format="yyyy.MM.dd"
                       type="date" 
                       align="center"></el-date-picker>
                       </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">上市时间(终)</label>
                    </el-col>
                    <el-col :span="15">
                        <el-date-picker
                        class="input-entry"
                        v-model="queryParams.SaleDateEnd"
                        format="yyyy.MM.dd"
                        type="date" 
                        align="center"></el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">类目</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable filterable   v-model="queryParams.CategoryId" placeholder="">
                       <el-input
                       
                        placeholder="搜索..."
                        class="selectSearch"
                        v-model="search_categoryId">
                        </el-input>
                        <el-tree
                        :default-expanded-keys="expand_categoryId"
                        :render-content="renderContent_categoryId"
                        :data="selectTree_categoryId"
                        :highlight-current="true"
                        :props="selectProps_categoryId"
                        node-key="id"
                        ref="tree"
                        :filter-node-method="filterNode_categoryId"
                        :expand-on-click-node="false"
                        @node-click="nodeClick_categoryId"
                        >
                        </el-tree>
                        <el-option class="select_tree_option" :key="item_categoryId.id" :label="item_categoryId.categoryName" :value="item_categoryId.id">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">品牌</label>
                    </el-col>
                    <el-col :span="15">
                       <el-select class="input-entry" clearable filterable   v-model="queryParams.BrandId" placeholder="" :filter-method="filterMethod">
                        <el-option v-for="item in brand" :key="item.id" :label="item.brandName" :value="item.id">
                            <span>{{item.brandName}}</span>
                            <span>{{item.brandCode}}</span>
                        </el-option>
                      </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">状态</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable filterable   v-model="queryParams.Status" placeholder="">
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
                            <span class="search-btn" @click="SimpleSearchClick">查询</span>
                        </el-col>
                </el-row>
            </el-col>

            <el-col class="border-left min-height" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48 ">
                    <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
                        <div @click="openLeft">
                            <img src="../../../../static/image/common/search_btn.png">
                            <span>查询</span>
                       
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22" class='bg-white'>
                        <el-row class="h48 pr10 fixed">
                            <el-col :span="12">
                                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup> 
                                <!-- <button @click="goDetail" class="erp_bt bt_add"><div class="btImg"><img src="../../../../static/image/common/bt_add.png"></div><span class="btDetail">新增</span></button>
                                <button @click="confirm" class="erp_bt bt_del"><div class="btImg"><img src="../../../../static/image/common/bt_del.png"></div><span class="btDetail">删除</span></button>
                                <button class="erp_bt bt_in"><div class="btImg"><img src="../../../../static/image/common/bt_inOut.png"></div><span class="btDetail">导入</span></button>
                                <button class="erp_bt bt_out bt_width">
                                    <div class="btImg"><img src="../../../../static/image/common/bt_inOut.png"></div>
                                    <span class="btDetail">导出</span>
                                    <div class="btRightImg"><img src="../../../../static/image/common/bt_down_right.png"></div>
                                </button>
                                <button class="erp_bt bt_start"><div class="btImg"><img src="../../../../static/image/common/bt_start.png"></div><span class="btDetail">启用</span></button>
                                <button class="erp_bt bt_stop"><div class="btImg"><img src="../../../../static/image/common/bt_stop.png"></div><span class="btDetail">停用</span></button>    -->
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
                       
                        <Table :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- dialog是否删除提示 -->
        <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureAjax" @dialogColse='dialogColse'></dialogBox>
        <!-- <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-question"></i></p>
                    <p class="dialog_font dialog_body_message">确认删除？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog> -->
        <!-- dialog -->
       <!-- dialog错误信息提示 -->
        <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">信息提报有误!</p>
                </el-col>
                <el-collapse-transition>
                    <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                        <vue-scroll :ops="$store.state.option">
                            <span class="dialog_font">{{response.message}}</span>
                            <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                            <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                        </vue-scroll> 
                    </el-col>
                </el-collapse-transition>   
            </el-col>
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="errorMessage = false">确 认</button>
            </span>
        </el-dialog>
        <!-- dialog -->
    </div>
</template>

<script>
    import buttonGroup from '../../../base/buttonGroup/buttonGroup'
    import dialogBox from '../../../base/dialog/dialog'
    import Table from '../../../base/Table/Table'
    import {FILTER_MOTHED} from '../../../common/common.js'
    export default{
        components:{
            buttonGroup,
            dialogBox,
            Table,
        },
        data(){
            return {
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
        errorTips:{message:'',detail:''},
        dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
        dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
        tableModel:"goodsFilesList",
        httpUrl:{
                view:'/goodsFiles/goodsFilesModify/',//查看详情
                delete:'/api/services/app/ProductManagement/Delete',//单条删除
                query:'/api/services/app/ProductManagement/GetListByCondition',//条件查询
            },
        queryParams:{//查询条件参数
                ProductCode:"",
                ProductName:"",
                SaleDateStart:"",	
                SaleDateEnd:"",	
                CategoryId:"",	
                BrandId:"",	
                Status:"",	
                SkipCount:(this.$store.state.goodsFilesListCurrentPage-1)*this.$store.state.goodsFilesListEachPage,
                MaxResultCount:this.$store.state.goodsFilesListEachPage,
                },
        column: [{
                prop: 'productCode',
                label: '商品编码',
                controls:'button',
                isDisable:true,
                sortable:false,
                isFix:'',
                }, {
                prop: 'productName',
                label: '商品名称',
                controls:'button',
                isDisable:true,
                sortable:false,
                },{
                prop: 'status',
                label: '状态',
                controls:'classMapSelect',
                isDisable:true,
                sortable:false,
                dataSource:[],
                optionsKey:{label:'itemName',value:'itemValue'}
                },
                {
                prop: 'barcode',
                label: '商品条码',
                controls:'text',
                isDisable:true,
                sortable:false,
                }, 
                 {
                prop: 'brandId_BrandName',
                label: '品牌',
                controls:'text',
                isDisable:true,
                sortable:false,
                }, 
                {
                prop: 'categoryId_CategoryName',
                label: '类目',
                controls:'text',
                isDisable:true,
                sortable:false,
                }, {
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
                 // 错误信息提示开始
                detail_message_ifShow:false,
                errorMessage:false,
                // 错误信息提示结束
//--------------确认删除开始-----------------               
                dialogUserConfirm:false,//用户删除保存提示信息
                row:{},//存储用户点击删除条目数据
                multipleSelection: [],//复选框选中数据
//--------------确认删除开始-----------------    
                search_categoryId:'',//类目树搜索
                selectTree_categoryId:[],//类目树数据
                selectProps_categoryId: {//类目树默认属性
                    children: 'childNodes',
                    label: 'categoryName',
                    id:'id'
                },
                expand_categoryId:[],////类目树默认展开节点id
                item_categoryId:{//类目树选中节点
                    id:'',
                    categoryName:''
                },
                tableLoading:false,
                searchData:{
                    ProductCode: "",//编码
                    ProductName: "",//名称
                    SaleDateStart:'',//上市时间(始)
                    SaleDateEnd: '',//上市时间(终)
                    CategoryId: '',//类目
                    BrandId: '',//品牌
                    Status: '',//启用状态
                    // OuType: '',//材质
                    // OuType: '',//款式
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
                ifOpen:false,
                dialogUserDefined:false,//dialog

                response:{
                details:'',
                message:'',
                validationErrors:[],
                },
                Name:'',//右上角模糊查询
                selectData:{//select数据
                    Status001:[],//启用状态
                    brand:[],//商品品牌
                },
                 filterKey:'',
            }
        },
        watch: {
            search_categoryId(val) {
                this.$refs.tree.filter(val);
            },
        },  
        created:function(){       
                let _this=this;
                _this.loadTree_categoryId();
                _this.loadTableData();
                _this.getSelectData();
                _this.InitStatus();
             },
          computed:{
                brand: function () {//下拉数据自定义搜索过滤
                    return FILTER_MOTHED(this.filterKey,this.selectData.brand)
                },
        },
        methods:{
             filterMethod(query){
                this.filterKey=query; 

            },
            btnClick:function(data){
                if(data=="新增"){
                    this.goDetail();
                }else if(data=="删除"){
                    this.confirm()
                    // this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    // if(this.SelectionChange.length==0){
                    //     this.$message({
                    //         type: 'info',
                    //         message: '请勾选需要更改删除的记录！'
                    //     });
                    // }else{
                    //     this.dialogSetting.dialogName='delDialog'
                    //     this.dialogSetting.message="确定删除？";
                    //     this.dialogSetting.dialogType="confirm";
                    //     this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    //     this.dialogVisible=true;
                    // }        
                }else if(data=="导入"){
                    let _this=this;
                    let name='goodsFilesImportFile';//具体菜单页面下的导入模板路由name
                    let backRouterName=_this.$route.name;//导入模板里面的返回前一页功能需要传入的前一页的路由name
                    let redirectedName='goodsFiles';//获取菜单模块id时需要传菜单的路由name，也就是父级路由name
                    let id='default';//key
                    _this.$axios.gets('/api/services/app/ModuleManagement/GetByUrl',{Url:redirectedName})
                    .then(function(res){
                        id=res.result.id;
                        _this.$store.state.url=name
                        _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
                    })
                }
            },
            InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[2].dataSource=res.result;
                })
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
            getSelectData(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                    // 启用状态
                    _this.selectData.Status001=res.result;
                })
                _this.$axios.gets('/api/services/app/BrandManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){ 
                    // 商品品牌
                    
                    if(res.result.totalCount==0){
                        _this.selectData.brand=[]
                    }else{
                        _this.$axios.gets('/api/services/app/BrandManagement/GetAll',{SkipCount:0,MaxResultCount:res.result.totalCount})
                        .then(function(response){
                            _this.selectData.brand=response.result.items;
                            console.log(_this.selectData.brand)
                        })
                    }
                    
                })
            },
            loadTableData(){//表格
                let _this=this;
                _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},'loadTableData')
            },
            ajaxTable(data,event){
                 let _this=this;
                _this.tableLoading=true
                _this.$axios.gets('/api/services/app/ProductManagement/GetListByCondition',data).then(function(res){ 
                    _this.load=event;
                    _this.tableData=res.result.items;
                    _this.totalItem=res.result.totalCount
                    _this.totalPage=Math.ceil(res.result.totalCount/_this.oneItem);
                    _this.tableLoading=false;
                    },function(res){
                    _this.tableLoading=false;
                })
            },
            filterNode_categoryId(value, data) {
                if (!value) return true;
                return data.categoryName.indexOf(value) !== -1;
            },
            loadTree_categoryId(){
                let _this=this;
                _this.$axios.gets('/api/services/app/CategoryManagement/GetCategoryTree')
                .then(function(res){
                    _this.selectTree_categoryId=res;
                    _this.expand_categoryId=_this.defauleExpandTree(res,'id')
                },function(res){
                })
            },
            nodeClick_categoryId(data,node,self){
                let _this=this;
                _this.item_categoryId.id=data.id;
                _this.item_categoryId.categoryName=data.categoryName;
                _this.$nextTick(function(){
                    // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,}).click();
                })
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                // if($(this).attr('date')==data.id){
                //     $(this).click()
                // }
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
                       _this.ajaxTable({ProductName:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
                 }
            },
            SimpleSearchClick(){
                let _this=this;
                 _this.$axios.gets('/api/services/app/ProductManagement/GetListByCondition',_this.queryParams).then(function(res){//查询表格数据
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.goodsFilesListEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                 })
                //  _this.searchDataClick={
                //     ProductCode:_this.searchData.ProductCode,//
                //     ProductName: _this.searchData.ProductName,//
                //     SaleDateStart: _this.searchData.SaleDateStart,//
                //     SaleDateEnd: _this.searchData.SaleDateEnd,
                //     CategoryId:_this.searchData.CategoryId,
                //     BrandId:_this.searchData.BrandId,
                //     Status:_this.searchData.Status,
                // }
                // _this.page=1;
                // _this.SimpleSearch();
            },
            SimpleSearch(){//简单搜索
                 let _this=this;
                 _this.tableLoading=true;
                 _this.searchDataClick.SkipCount=(_this.page-1)*_this.oneItem;
                 _this.searchDataClick.MaxResultCount=_this.oneItem;
                _this.ajaxTable(_this.searchDataClick,"SimpleSearch")
            },
            goDetail(){
                this.$store.state.url='/goodsFiles/goodsFilesDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
             setTableSelection(val) {//点击复选框选中的数据
             console.log(this.multipleSelection);
                this.multipleSelection = val;
            },
            confirm(){//多项删除
                let _this=this;
                _this.multipleSelection= _this.$store.state[_this.tableModel+'Selection'];
                console.log(_this.multipleSelection.length)
                if(_this.multipleSelection.length==0){
                     _this.$message({
                        type: 'info',
                        message: '请勾选需要更改删除的记录！'
                    });
                    
                }else{
                    _this.dialogSetting.dialogName='rows'
                    _this.dialogSetting.message="确定删除？";
                    _this.dialogSetting.dialogType="confirm";
                    _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    _this.dialogUserConfirm=true;
                }
            },
            confirmDelThis(row){//单项删除
                let _this=this;
                _this.row=row;
                _this.dialogSetting.dialogName='row'
                _this.dialogSetting.message="确定删除？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogUserConfirm=true;
            },
            sureAjax(data){
                let _this=this;
                if(data.dialogName=='row'){
                    if(data.dialogButton=='取消'){
                        _this.dialogUserConfirm=false;
                    }else if(data.dialogButton=='确定'){
                        _this.delThis()
                        _this.dialogUserConfirm=false;
                    }
                }else if(data.dialogName=='rows'){
                    if(data.dialogButton=='取消'){
                        _this.dialogUserConfirm=false;
                    }else if(data.dialogButton=='确定'){
                        _this.delRow()
                        _this.dialogUserConfirm=false;
                    }
                }else if(data.dialogName=='showErMsgDialog'){
                    if(data.dialogButton=='取消'){
                        _this.dialogUserConfirm=false;
                    }else if(data.dialogButton=='确定'){
                        _this.dialogUserConfirm=false;
                    }
                }
                
            },
            showErMsgDialog(message,detail){
                 let _this=this;
                _this.dialogSetting.dialogName='showErMsgDialog'
                _this.dialogSetting.message='错误提示'
                _this.dialogSetting.dialogType='submit'
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
                _this.errorTips.message=message
                _this.errorTips.details=detail
                _this.dialogUserConfirm=true;
            },
            
            delThis(){//删除行
                let _this=this;
                _this.$axios.deletes('/api/services/app/ProductManagement/Delete',{id:_this.row.id})
                .then(function(res){
                     _this.dialogUserConfirm=false;
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    _this.loadTableData();
                },function(res){
                    _this.showErMsgDialog(res.error.message,res.error.details)
                })
            },
            delRow(){
                let _this=this;
                let data={
                    "createList": [],
                    "updateList": [],
                    "deleteList": _this.multipleSelection
                }
                _this.$axios.posts('/api/services/app/ProductManagement/CUDAggregate',data)
                .then(function(res){
                     _this.dialogUserConfirm=false;
                    _this.open('删除成功','el-icon-circle-check','successERP');
                        _this.loadTableData();
                },function(res){
                    _this.showErMsgDialog(res.error.message,res.error.details)
                })
            },
            see(row){
                this.$store.state.url='/goodsFiles/goodsFilesModify/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
             submitSearch(){
                let _this=this;
                _this.queryParams.ProductName=_this.Name;
                _this.$axios.gets('/api/services/app/ProductManagement/GetListByCondition',_this.queryParams).then(function(res){ 
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.goodsFilesListEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1            
                })
                // _this.page=1
                // _this.ajaxTable({ProductName:_this.Name,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
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
            renderContent_categoryId(h, { node, data, store }){
                if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.categoryName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.categoryName}
                        </span>
                    );
                }
            },
            dialogColse(){
                this.dialogUserConfirm=false;
            }, 
            
        },
    }
</script>

<style scoped>
.border-left.rightBox{
    width: calc(100% - 290px);
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
.mt20{
    margin-top: 10px;
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
    min-height: 438px;
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
    background-image: url(../../../../static/image/common/btn-circle.png);
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