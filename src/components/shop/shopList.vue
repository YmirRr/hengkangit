<template>
    <div class="shop-list">
        <el-row class="bg-white">
            <el-col class="leftBox" v-show="ifWidth">
                <el-row class="h48 pl10">
                    <el-col :span="18" class="btn-for-search">
                        <img src="../../../static/image/common/search_btn.png">
                        <span>查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18 cp"  @click="closeLeft"></i>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">所属组织</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry" placeholder="" clearable v-model="queryParams.OuId">
                            <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="ouSearch"></el-input>

                            <el-tree :data="ouAr"
                                    :default-expanded-keys="expandId"
                                    :props="selectOuProps"
                                    :highlight-current="true"
                                    node-key="id"
                                    :render-content="renderContentOu"
                                    ref="ouTree"
                                    :filter-node-method="ouFilterNode"
                                    :expand-on-click-node="false"
                                    @node-click="ouNodeClick"></el-tree>
                            <el-option v-show="false" 
                                    v-for="item in ouSelectAr" 
                                    :key="item.id" 
                                    :label="item.ouName" 
                                    :value="item.id" 
                                    :date="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">行政地区</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry" 
                                   placeholder=""
                                   clearable
                                   v-model="queryParams.AdAreaId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="adSearch"></el-input>

                            <el-tree :data="adAr"
                                     :default-expanded-keys="expandAdId"
                                     :props="selectAdProps"
                                     node-key="id"
                                     :render-content="renderContentAd"
                                     ref="adTree"
                                     :filter-node-method="adFilterNode"
                                     highlight-current
                                     :expand-on-click-node="false"
                                     @node-click="adNodeClick"></el-tree>
                            <el-option v-show="false"
                                       v-for="item in adItem"
                                       :key="item.id" 
                                       :label="item.areaName" 
                                       :value="item.id"
                                       id="ad_confirmSelect"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">业务地区</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry"
                                   placeholder=""
                                   clearable
                                   v-model="queryParams.OpAreaId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="opSearch"></el-input>

                            <el-tree :data="opAr"
                                     :default-expanded-keys="expandOpId"
                                     :props="selectOpProps"
                                     node-key="id"
                                     :render-content="renderContentOp"
                                     highlight-current
                                     ref="opTree"
                                     :filter-node-method="opFilterNode"
                                     :expand-on-click-node="false"
                                     @node-click="opNodeClick"></el-tree>
                            <el-option v-show="false"
                                       v-for="item in opItem"
                                       :key="item.id" 
                                       :label="item.ouName" 
                                       :value="item.id"
                                       id="op_confirmSelect"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">编码</label>
                    </el-col>

                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ShopCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">名称</label>
                    </el-col>

                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ShopName"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">店铺性质</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" v-model="queryParams.ShopWorkPropertyid" placeholder="" clearable>
                            <el-option v-for="item in propertyAr"
                                        :key="item.itemValue"
                                        :label="item.itemName"
                                        :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </el-col> 
                </el-row>

                <el-row class="mt10 tc">
                    <div class="bgcolor smallBgcolor">
                        <span class="search-btn" @click='doSearch'>查询</span>
                    </div>
                </el-row>
            </el-col>
            <el-col class="border-left" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span='2' class="search-block br1"  v-show="!ifWidth">
                        <div @click="openLeft" class="h48">
                            <img src="../../../static/image/common/search_btn.png">
                            <span class="fs18">查询</span>
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                        
                    </el-col>
                
                    <el-col :span='ifWidth?24:22' class="h48">
                        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>

                        <div class="search_input_group inline-block-need">
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
                    </el-col>
                </el-row>


                <el-row class="pb10">
                    <el-col :span="24">
                        <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- dialog是否删除提示 -->
        <el-dialog :visible.sync="dialogDelConfirm" class="dialog_confirm_message" width="25%">
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
                <button class="dialog_footer_bt dialog_font" @click="sureDel">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogDelConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->  
        
    </div>
</template>

<script>
import Table from '../../base/Table/Table'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
    export default{
        name:'shopList',
        components:{
            Table,
            buttonGroup,
            dialogBox
        },
        data(){
            return {
                ifOpen:false,
                allList:[],//所有数据列表
                
                //---所属组织树形下拉-----
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                ouAr:[],//所属组织树形下拉框
                ouSelectAr:[],//选择下拉
                expandId:[],
                //-----------------------
                //---行政地区树形下拉-----
                adSearch:'',//树形搜索框的
                selectAdProps:{
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                adItem:[{
                    id:'',
                    areaName:'',
                }],
                adAr:[],//行政地区下拉框
                expandAdId:[],
                //-----------------------
                //---业务地区树形下拉-----
                opSearch:'',//树形搜索框的
                selectOpProps:{
                    children: 'childItems',
                    label: 'name',
                    id:'id'
                },
                opItem:[{
                    id:'',
                    ouName:'',
                }],
                opAr:[],//业务地区下拉框
                expandOpId:[],
                //-----------------------
                propertyAr:'',//客户性质下拉框

                pageIndex:-1,//分页的当前页码
                totalPage:0,//当前分页总数
                total:'',//数据总条数
                page:1,//当前页
                eachPage:10,//一页显示的数量
                multipleSelection: [],//复选框选中数据
                idArray:{
                    ids:[]
                },//复选框选中数据id
                ifWidth:false,//控制左侧搜索展开
                //---确认删除-----------------               
                dialogDelConfirm:false,//用户删除保存提示信息
                //-------------------- 
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
                //-----------------------------
                who:'',//删除的是谁以及是否是多项删除
                whoId:'',//单项删除的id
                whoIndex:'',//单项删除的index
                //----------------------------
                searchKey:'',
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
                    text:'辅助功能',
                    class:'bt_auxiliary',
                    icon:'icon-daochu',
                    disabled:false,
                },{
                    text:'打印',
                    class:'bt_print',
                    icon:'icon-print',
                    disabled:false,
                }],//按钮组
                //---------------------
                httpUrl:{
                    view:'/shop/shopModify/',
                    delete:'/api/services/app/ShopManagement/Delete',//行内删除
                    query:'/api/services/app/ShopManagement/GetAll',//条件查询
                },
                tableModel:'shopList',
                tableData:[],
                SelectionChange:[],
                column: [{
                    prop: 'ouName',
                    label: '所属组织',
                    controls:'text',
                    required:true,
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'shopCode',
                    label: '店铺编码',
                    controls:'button',
                    required:true,
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'shopName',
                    label: '店铺名称',
                    controls:'button',
                    required:true,
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'shopFullname',
                    label: '店铺全称',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'shopWorkPropertyidTValue',
                    label: '店铺性质',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'opAreaFullName',
                    label: '业务地区',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'stockFullname',
                    label: '对应仓库',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:true,
                    },{
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    width:"auto",
                    isDisable:false,
                    sortable:true,
                    dataSource:[],
                    optionsKey:{
                        label:'itemName',
                        value:'itemValue'
                    }
                    }],

                    pluginSetting:{
                        hasPagination:true,
                        mutiSelect:true,//多选栏
                        isDisable:true,
                    },

                    command:[{
                        text:'查看',
                        class:'blue'
                    },{
                        text:'删除',
                        class:'blue'
                    }],

                    queryParams:{
                        OuId:'',//所属组织
                        ShopTypeid:'',
                        AdAreaId:'',//行政地区
                        OpAreaId:'',//业务地区
                        ShopCode:'',//店铺编码
                        ShopName:'',//店铺名称
                        ShopWorkPropertyid:'',//店铺性质
                        SkipCount:(this.$store.state.shopListCurrentPage-1)*this.$store.state.shopListEachPage,
                        MaxResultCount:this.$store.state.shopListEachPage
                    }, 
                //---dialog-------------
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogVisible:false,
                dialogCommand:[],//底部按钮组控制组
                SelectionChange:[],
            }
        },
        created:function(){
            // this.loadAllList();
            this.loadSelect();
            this.InitStatus();
        },
        watch:{
            ouSearch(val){
                this.$refs.ouTree.filter(val)
            },
            adSearch(val){
                this.$refs.adTree.filter(val)
            },
            opSearch(val){
                this.$refs.opTree.filter(val)
            }
        },
        methods:{
        //---获取数据-------------------------------------------------------
            loadAllList:function(){//获取所有列表数据
                let self = this;
                this.$axios.gets('/api/services/app/ShopManagement/GetAll',{SkipCount:(self.page-1)*self.eachPage,MaxResultCount:self.eachPage}).then(function(res){
                    console.log(res);
                    self.allList = res.result.items;
                    self.total = res.result.items.length;
                    self.totalPage = Math.ceil(self.total/self.eachPage)
                },function(res){
                    console.log('err'+res)
                })
            },
        //------------------------------------------------------------------

        //---下拉的数据------------------------------------------------------
            InitStatus(){//获取状态枚举表
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[7].dataSource=res.result;
                })
            },
            loadSelect:function(){
                let self = this;
                //所属组织
                self.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){ 
                    self.ouSelectAr = res.result;
                })
                self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                    console.log(res);
                    self.ouAr = res;
                    self.expandId=self.defauleExpandTree(res,'id')
                },function(res){
                    console.log('err'+res)
                });
                //行政地区
                self.$axios.gets('/api/services/app/AdAreaManagement/GetTree').then(function(res){
                    // console.log(res);
                    self.adAr = res;
                    // console.log(self.adAr)
                    self.expandAdId = self.defauleExpandTree(res,'id')
                },function(res){
                    console.log('err'+res)
                })
                //业务地区
                self.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
                    console.log(res);
                    self.opAr = res;
                    self.expandOpId = self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
                //店铺性质
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ShopWorkProperty'}).then(function(res){
                    // console.log(res);
                    self.propertyAr = res.result;
                },function(res){
                    console.log('err'+res)
                });
            },
        //------------------------------------------------------------------

        // ---跳转--------open----------------------------------------------
            goDetail(){//点击新增跳转
               this.$store.state.url='/shop/shopDetail/default'
               this.$router.push({path:this.$store.state.url})//点击切换路由
            },

            // goModify:function(id){//点击跳转修改页modify
            //     // this.$store.state.url='/customer/customerModify/default'
            //     this.$store.state.url='/shop/shopModify/'+id;
            //     this.$router.push({path:this.$store.state.url})//点击切换路由
            // },
            
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

        //---左侧查询-------------------------------------------------------
        doSearch:function(){
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetAll',self.queryParams).then(function(res){
                self.$store.commit('Init_Table',res.result.items);
                self.$store.commit('get_RowId',"")//置空修改行id
                let totalPage=Math.ceil(res.result.totalCount/self.$store.state.commodityBrandEachPage);
                self.$store.commit('Init_pagination',totalPage);
                self.$store.commit('Init_TotalCount',res.result.totalCount);
                self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1 
                
            },function(res){
                console.log('err'+res)
            })
            console.log(self.$store.state.Init_Table)
        },
        //-------------------------------------------------

        //---确认删除----------------------------------------
        sureDel:function(){
            let self = this;
            if(self.who == 1){
                self.$axios.deletes('/api/services/app/ShopManagement/Delete',{id:self.whoId}).then(function(res){
                    
                    self.allList.splice(self.whoIndex,1);
                    self.dialogDelConfirm = false;
                    self.open('删除成功','el-icon-circle-check','successERP');
                },function(res){
                    self.dialogDelConfirm = false;
                    self.errorMessage=true;
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                })
            };

            if(self.who == 2){
                // console.log(self.idArray)
                self.$axios.posts('/api/services/app/ShopManagement/BatchDelete',self.idArray).then(function(res){
                    self.loadAllList();
                    self.dialogDelConfirm = false;
                    self.open('删除成功','el-icon-circle-check','successERP');    
                },function(res){
                    self.dialogDelConfirm = false;
                    self.errorMessage=true;
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                })
            }
        },
        //--------------------------------------------------


        //---批量删除--------------------------------------
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
        //-------------------------------------------------

        //---左侧搜索展开----------------------------------------------------
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
        //------------------------------------------------------------------

        //-----------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="新增"){
                self.goDetail();
            }else if(btn=="删除"){
                self.delBatch();
            }else if(btn=="辅助功能"){
                 
            }else if(btn=="打印"){
                console.log(this.$store.state.shopListTable)
            }
        },

        //---树通用----------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null 
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },
        //-------------------------------------------------

        //---树筛选----------------------------------------
        ouFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
        },
        adFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
        },
        opFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
        },
        //-------------------------------------------------

        //---树点击----------------------------------------
        ouNodeClick:function(data,node,self){
            let _this = this;
            // _this.ouItem.id = data.id;
            // _this.ouItem.ouName = data.ouName;
            $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                if($(this).attr('date')==data.id){
                    $(this).click()
                }
            })
        },
        adNodeClick:function(data){
            console.log(data)
            let self = this;
            self.adItem[0].id = data.id;
            self.adItem[0].areaName = data.areaName;
            // console.log(self.adItem)
            self.$nextTick(function(){
                $('#ad_confirmSelect').click()
            })
        },
        opNodeClick:function(data){
            let self = this;
            console.log(data)
            self.opItem[0].id = data.id;
            self.opItem[0].ouName = data.ouName;
            // self.queryOp = data.id;
            self.$nextTick(function(){
                $('#op_confirmSelect').click()
            })
        },
        //-------------------------------------------------
        
        //---树render-content------------------------------
        renderContentOu(h, { node, data, store }){//所属组织
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
        renderContentAd(h, { node, data, store }){//行政地区
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
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
        renderContentOp(h, { node, data, store }){//业务地区
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
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
        //------------------------------------------------

        //---获取错误信息---------------------------------------
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
        //-----------------------------------------------------

        //---表格查询------------------------------------------
        submitSearch(){
            let self=this;
            if(self.searchKey!=''){
                self.searchTable();
            }else{
                self.loadAllList();
            }
        },
        searchTable:function(){
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetAll',{ShopName:self.searchKey,SkipCount:'0',MaxResultCount:'10'}).then(function(res){
                console.log(res);

                self.allList = res.result.items;
                self.total = res.result.items.length;
                self.totalPage = Math.ceil(self.total/self.eachPage)
            },function(res){
                console.log('err'+res)
            })
        },
        //----------------------------------------------------
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
                        _this.$axios.posts('/api/services/app/ShopManagement/BatchDelete',_this.idArray).then(function(res){
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
    }
}
</script>

<style scoped>
.shop-list{
    width: 100%;
    height: auto;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.shop-list .leftBox{
    min-width: 290px;
    width: 290px;
}
.shop-list .rightBox{
    width: calc(100% - 290px)
}
.shop-list .newRight{
    width: 100%;
}
.shop-list .inline-block-need{
    display: inline-block;
}
.input-need{
    outline: none;
    border:none;
    width: 90%;
    height: 28px;
}
.shop-list .h48{
    height: 48px !important;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
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
.tc{
    text-align: center;
}
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.fs12{
    font-size: 12px;
}
.fs18{
    font-size: 18px;
}
.border1{
    border: 1px solid #cccccc;
    border-radius: 3px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 400px;
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

.text-right{
    text-align: right;
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
.shop-list .search_input span{
    height: 25px;
}
.shop-list .el-input__prefix .el-icon-search{
    height: 20px;
}
.cp{
    cursor: pointer;
}
.br1{
    border-right: 1px solid #cccccc;
}
.mt5{
    margin-top: 5px;
}
</style>

<style>

</style>