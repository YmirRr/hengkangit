<template>
    <div class="supplier-list commodity">
            <el-col class="leftBox" v-show="ifWidth">
                <el-row class="h48 pl10">
                    <el-col :span="18" class="btn-for-search">
                        <img src="../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="fs18">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                         <label class="input-label">供应商分类</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry"
                                placeholder=""
                                clearable
                                v-model="queryParams.ContactClassId">
                            <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="cuSearch"></el-input>

                            <el-tree :data="cuAr"
                                    :props="selectCuProps"
                                    node-key="id"
                                    ref="khtree"
                                    :default-expanded-keys="expandId"
                                    :filter-node-method="khFilterNode"
                                    @node-click="cuNodeClick"
                                    :render-content="renderContentKh"
                                    :expand-on-click-node="false"
                                    highlight-current></el-tree>

                            <el-option v-show="false"
                                    :key="countCu.id"
                                    :label="countCu.className"
                                    :value="countCu.id"
                                    id="cu_confirmSelect"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">所属组织</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry"
                                placeholder=""
                                clearable
                                v-model="queryParams.OuId">
                            <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="ouSearch"></el-input>

                            <el-tree :data="ouAr"
                                    :props="selectOuProps"
                                    :default-expanded-keys="expandZhId"
                                    node-key="id"
                                    ref="zhtree"
                                    highlight-current
                                    :render-content="renderContentZh"
                                    :filter-node-method="zhFilterNode"
                                    :expand-on-click-node="false"
                                    @node-click="ouNodeClick"></el-tree>
                            <el-option v-show="false"
                                    :key="countOu.id"
                                    :label="countOu.ouFullname"
                                    :value="countOu.id"
                                    id="ou_confirmSelect"></el-option>
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
                                    :props="selectAdProps"
                                    node-key="id"
                                    ref="adtree"
                                    :default-expanded-keys="expandAdId"
                                    :filter-node-method="adFilterNode"
                                    :expand-on-click-node="false"
                                    :render-content="renderContentAd"
                                    highlight-current
                                    @node-click="adNodeClick"></el-tree>
                            <el-option v-show="false"
                                    :key="countAd.id"
                                    :label="countAd.areaName"
                                    :value="countAd.id"
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
                                     :props="selectOpProps"
                                     node-key="id"
                                     ref="opTree"
                                     :default-expanded-keys="expandOpId"
                                     :filter-node-method="opFilterNode"
                                     :render-content="renderContentOp"
                                     :expand-on-click-node="false"
                                     highlight-current
                                     @node-click="opNodeClick"></el-tree>
                            <el-option v-show="false"
                                       :key="countOp.id"
                                       :label="countOp.name"
                                       :value="countOp.id"
                                       id="op_confirmSelect"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">编码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ContactCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ContactName"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">供应商性质</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" v-model="queryParams.ContactWorkPropertyId" placeholder="" clearable>
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
                        <span class="search-btn" @click="doSearch">查询</span>
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

        <!-- dialog错误信息提示 -->
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse="dialogColse" ></dialogBox>
        <!-- <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">数据提交有误!</p>
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
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">取 消</button>
            </span>
        </el-dialog> -->
    <!-- dialog -->

    </div>
</template>

<script>
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
    export default{
        name:'supplierList',
        components:{
            Table,
            dialogBox,
            buttonGroup
        },
        data(){
            return {
                ifOpen:false,
                searchKey:'',
                allList:[],//所有数据列表

                //---供应商分类树形下拉-----
                cuSearch:'',
                selectCuProps:{
                    children: 'childNodes',
                    label: 'className',
                    id:'id'
                },
                cuItem:{
                    id:'',
                    className:'',
                },
                cuAr:[],//供应商分类下拉框
                expandId:[],//默认打开第一个树形节点
                //-----------------------
                //---所属组织树形下拉-----
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouFullname:'',
                },
                ouAr:[],//所属组织下拉框
                expandZhId:[],
                //-----------------------
                //---行政地区树形下拉-----
                adSearch:'',//树形搜索框的
                selectAdProps:{
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                adItem:{
                    id:'',
                    areaName:'',
                },
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
                opItem:{
                    id:'',
                    name:'',
                },
                opAr:[],//业务地区下拉框
                expandOpId:[],
                //-----------------------
                propertyAr:'',//供应商性质下拉框

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
                who:'',//删除的是谁以及是否是多项删除
                whoId:'',//单项删除的id
                whoIndex:'',//单项删除的index
                //---按钮组件--------------------------
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
                }],
                //---表格组件--------------------------
                httpUrl:{
                    view:'/supplier/supplierModify/',
                    delete:'/api/services/app/ContactManagement/Delete',//行内删除
                    query:'/api/services/app/ContactManagement/GetListByConditionSupplier',//条件查询
                },
                tableModel:'supplierList',
                tableData:[],
                SelectionChange:[],
                column: [{
                    prop: 'ouId_OuName',
                    label: '所属组织',
                    controls:'text',
                    required:true,
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'contactCode',
                    label: '供应商编码',
                    controls:'button',
                    required:true,
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'contactName',
                    label: '供应商名称',
                    controls:'button',
                    required:true,
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop: 'contactFullName',
                    label: '供应商全称',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'contactClassId_ClassName',
                    label: '供应商类型',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'contactWorkPropertyIdTValue',
                    label: '供应商性质',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'isSupplier',
                    label: '客户',
                    controls:'checkbox',
                    width:"auto",
                    isDisable:true,
                    sortable:true,
                    },{
                    prop: 'ficaOuId_OuName',
                    label: '对应财务组织',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    width:"auto",
                    isDisable:true,
                    sortable:true,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
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
                        ContactClassId:'',//供应商分类
                        OuId:'',//所属组织
                        AdAreaId:'',//行政地区
                        OpAreaId:'',//业务地区
                        ContactWorkPropertyId:'',//供应商性质
                        ContactCode:'',//编码
                        ContactName:'',//名称
                        SkipCount:(this.$store.state.supplierListCurrentPage-1)*this.$store.state.supplierListEachPage,
                        MaxResultCount:this.$store.state.supplierListEachPage
                    }, 
                    //     SkipCount:(this.$store.state.shopListCurrentPage-1)*this.$store.state.shopListEachPage,
                    //     MaxResultCount:this.$store.state.shopListEachPage
                    // },
                //---dialog--------------------------
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
            }
        },
        created:function(){
            // this.loadAllList();
            this.InitStatus();
            this.loadSelect();

        },
        watch:{
            cuSearch(val){
                this.$refs.khtree.filter(val)
            },
            ouSearch(val){
                this.$refs.zhtree.filter(val)
            },
            opSearch(val){
                this.$refs.opTree.filter(val)
            },
            adSearch(val){
                this.$refs.adtree.filter(val)
            }

        },
        computed:{
            countCu () {
                return this.cuItem;
            },
            countOu () {
                return this.ouItem;
            },
            countAd () {
                return this.adItem;
            },
            countOp () {
                return this.opItem;
            },
        },
        methods:{
        //---获取数据-------------------------------------------------------
            InitStatus(){//获取状态枚举表
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[8].dataSource=res.result;
                })
            },
            // loadAllList:function(){//获取所有列表数据
            //     let self = this;
            //     this.$axios.gets('/api/services/app/ContactManagement/GetListByCondition',{SkipCount:(self.page-1)*self.eachPage,MaxResultCount:self.eachPage}).then(function(res){
            //         console.log(res);
            //         self.allList = res.result.items;
            //         self.total = res.result.totalCount;
            //         self.totalPage = Math.ceil(self.total/self.eachPage)
            //     },function(res){
            //         console.log('err'+res)
            //     })
            // },
        //------------------------------------------------------------------

        //---下拉的数据------------------------------------------------------
            loadSelect:function(){
                let self = this;
                //供应商分类

                self.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:1}).then(function(res){
                    self.cuAr = res;
                    self.expandId=self.defauleExpandTree(res,'id')
                    // console.log(self.expandId)
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
                //所属组织
                self.$axios.gets('/api/services/app/OuManagement/GetAllTree',{AreaType:1}).then(function(res){
                    //console.log(res);
                    self.ouAr = res;
                    self.expandZhId=self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
                //行政地区
                self.$axios.gets('/api/services/app/AdAreaManagement/GetTree').then(function(res){
                    // console.log(res);
                    self.adAr = res;
                    self.expandAdId=self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
                //业务地区
                self.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
                    console.log(res);
                    self.opAr = res;
                    self.expandOpId=self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
                //供应商性质
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerWorkProperty'}).then(function(res){
                    // console.log(res);
                    self.propertyAr = res.result;
                },function(res){
                    console.log('err'+res)
                })
            },
        //------------------------------------------------------------------

        // ---跳转--------open----------------------------------------------
            goDetail(){//点击新增跳转
               this.$store.state.url='/supplier/supplierDetail/default'
               this.$router.push({path:this.$store.state.url})//点击切换路由
            },

            goModify:function(id){//点击跳转修改页modify
                // this.$store.state.url='/customer/customerModify/default'
                this.$store.state.url='/supplier/supplierModify/'+id;
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

        //---左侧查询-------------------------------------------------------
        doSearch:function(){
            let self = this;
            // self.queryParams.ContactClassId = 0;
            // self.queryParams.OuId = 0;
            // self.queryParams.AdAreaId = 0;
            // self.queryParams.OpAreaId = 0;
            // self.queryParams.ContactWorkPropertyId = 0;
            self.$axios.gets('/api/services/app/ContactManagement/GetListByConditionSupplier',self.queryParams).then(function(res){
                console.log(res)
                self.$store.commit('Init_Table',res.result.items);
                self.$store.commit('get_RowId',"")//置空修改行id
                let totalPage=Math.ceil(res.result.totalCount/self.$store.state.customerListEachPage);
                self.$store.commit('Init_pagination',totalPage);
                self.$store.commit('Init_TotalCount',res.result.totalCount);
                self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1

            },function(res){
                console.log('err'+res)
            })
        },
        //-------------------------------------------------

        //---确认删除----------------------------------------
        sureDel:function(){
            let self = this;
            if(self.who == 1){
                self.$axios.deletes('/api/services/app/ContactManagement/Delete',{id:self.whoId}).then(function(res){

                    self.allList.splice(self.whoIndex,1);
                    self.dialogDelConfirm = false;
                    self.open('删除成功','el-icon-circle-check','successERP');
                },function(res){
                    self.dialogDelConfirm = false;
                    self.errorMessage=true;
                    self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                })
            }

            if(self.who == 2){
                // console.log(self.idArray)
                self.$axios.posts('/api/services/app/ContactManagement/BatchDelete',self.idArray).then(function(res){
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

        //---行内删除---------------------------------------
        delRow:function(index,row,who){
            let self = this;
            // console.log(row)
            self.who = who;
            self.whoIndex = index;
            self.whoId = row.id;
            self.dialogDelConfirm = true;
        },
        //-------------------------------------------------

        //---批量删除--------------------------------------
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
        //-------------------------------------------------

        //---控制修改及分页--------------------------------------------------
        // confirmDel(row) {
        //     let self = this;
        //     this.$confirm('确定删除?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //     center: true
        //     }).then(() => {
        //         self.delThis(row);
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },
        // delThis:function(row){//删除选中的项
        //     let self=this;
        //     self.$axios.deletes('/api/services/app/ContactManagement/Delete',{id:row.id}).then(function(res){
        //         self.open('删除成功','el-icon-circle-check','successERP');
        //         self.loadAllList();
        //     },function(res){
        //         self.errorMessage=true;
        //         self.open('删除失败','el-icon-error','faildERP')
        //         self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //     })
        // },
        // delRow(){//批量删除
        //     let self=this;
        //     for(let i in self.multipleSelection){
        //         self.idArray.ids.push(self.multipleSelection[i].id)
        //     }
        //     if(self.idArray.ids.indexOf(undefined)!=-1){
        //         self.$message({
        //             type: 'warning',
        //             message: '新增数据请在行内删除'
        //         });
        //         return;
        //     }
        //     if(self.idArray.ids.length>0){
        //         self.$confirm('确定删除?', '提示', {
        //             confirmButtonText: '确定',
        //             cancelButtonText: '取消',
        //             type: 'warning',
        //             center: true
        //             }).then(() => {
        //                 self.$axios.posts('/api/services/app/ContactManagement/BatchDelete',self.idArray).then(function(res){
        //                     self.loadAllList();
        //                     self.open('删除成功','el-icon-circle-check','successERP');
        //                 },function(res){
        //                     self.errorMessage=true;
        //                     self.open('删除失败','el-icon-error','faildERP')
        //                     self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //                 })
        //             }).catch(() => {
        //                 self.$message({
        //                     type: 'info',
        //                     message: '已取消删除'
        //                 });
        //         });
        //     }else{
        //         self.$message({
        //             type: 'info',
        //             message: '请勾选需要删除的数据！'
        //         });
        //     }
        // },
        // handleSelectionChange:function(val){//点击复选框选中的数据
        //     this.multipleSelection = val;
        // },
        // handleCurrentChange:function(val){//获取当前页码
        //     this.pageIndex=val;
        // },
        // handleCurrentChange:function(val){//获取当前页码
        //     this.pageIndex=val;
        //     console.log(val)
        //     this.page = val;
        //     this.loadAllList();
        // },
        //------------------------------------------------------------------

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

        //---树-------------------------------------------------------------
        // loadIcon(){
        //     let _this=this;
        //     _this.$nextTick(function () {
        //         $('.preNode').remove();
        //         $('.el-tree-node__label').each(function(){
        //             if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
        //                 $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
        //             }else{
        //                 $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
        //             }
        //         })
        //     })
        // },
        khFilterNode(value,data){//供应商分类搜索过滤
            if (!value) return true;
                return data.className.indexOf(value) !== -1;
        },
        zhFilterNode(value,data){//所属组织搜索过滤
            if (!value) return true;
                return data.ouFullname.indexOf(value) !== -1;
        },
        adFilterNode(value,data){//行政地区搜索过滤
            if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
        },
        opFilterNode(value,data){//业务地区搜索过滤
            if (!value) return true;
                return data.name.indexOf(value) !== -1;
        },
        cuNodeClick:function(data){
            console.log(data)
            let self = this;
            self.cuItem.id = data.id;
            self.cuItem.className = data.className;
            self.$nextTick(function(){
                $('#cu_confirmSelect').click()
            })
        },
        ouNodeClick:function(data){
            let self = this;
            self.ouItem.id = data.id;
            self.ouItem.ouFullname = data.ouFullname;
            self.$nextTick(function(){
                $('#ou_confirmSelect').click()
            })
            self.queryOu = data.id
        },
        adNodeClick:function(data){
            let self = this;
            self.adItem.id = data.id;
            self.adItem.areaName = data.areaName;
            self.$nextTick(function(){
                $('#ad_confirmSelect').click()
            })
        },
        opNodeClick:function(data){
            let self = this;
            self.opItem.id = data.id;
            self.opItem.name = data.name;
            self.$nextTick(function(){
                $('#op_confirmSelect').click()
            })
        },
        //-----------------------------------------------------

        //---树render-content----------------------------------
        renderContentKh(h, { node, data, store }){//供应商分类
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }
        },
        renderContentZh(h, { node, data, store }){//所属组织
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.ouFullname}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.ouFullname}
                    </span>
                );
            }
        },
        renderContentAd(h, { node, data, store }){//行政地区
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
        renderContentOp(h, { node, data, store }){//业务地区
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
        //------------------------------------------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="新增"){
                self.goDetail();
            }else if(btn=="删除"){
                self.delMore(2)
            }else if(btn=="辅助功能"){

            }else if(btn=="打印"){
            }
        },
        //---树通用----------------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },
        //-----------------------------------------------------
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
                        _this.$axios.posts('/api/services/app/BrandManagement/BatchDelete',_this.idArray).then(function(res){
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
.supplier-list{
    width: 100%;
    height: auto;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.supplier-list .leftBox{
    min-width: 290px;
    width: 290px;
}
.input-need{
    outline: none;
    border:none;
    width: 90%;
    height: 28px;
}
.supplier-list .rightBox{
    width: calc(100% - 290px)
}
.supplier-list .newRight{
    width: 100%;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt5{
    margin-top: 5px;
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
.mb10{
  margin-bottom: 10px;
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
.supplier-list .inline-block-need{
    display: inline-block;
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
.cp{
    cursor: pointer;
}
.tc{
    text-align: center;
}
.br1{
    border-right: 1px solid #cccccc;
}
</style>

<style>
.supplier-list .el-table .cell{
    font-size:12px;
}
</style>
