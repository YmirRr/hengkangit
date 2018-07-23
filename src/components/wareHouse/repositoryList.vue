<template>
  <div class="res-list commodity">
      <el-row class="bg-white">
            <el-col class="left-box" :span="ifWidth?5:0" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                        <!-- <span class="fs12 search_info_open" @click="closeLeft">-</span> -->
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">编号</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.StockCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">名称</label>
                    </el-col>

                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model='queryParams.StockName'></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">业务地区</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry" placeholder=""
                                   clearable
                                   v-model="queryParams.StockTypeId">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="opSearch"></el-input>

                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"
                                     :data="opAr"
                                     :props="selectOpProps"
                                     node-key="id"
                                     :default-expanded-keys="expandOpId"
                                     :render-content="renderContentOp"
                                     ref="optree"
                                     :filter-node-method="opFilterNode"
                                     :expand-on-click-node="false"
                                     highlight-current
                                     @node-click="opNodeClick"></el-tree>
                            <el-option v-show="false"
                                       :key="countOp.id"
                                       :label="countOp.areaName"
                                       :value="countOp.id"
                                       id="op_confirmSelect"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">仓库类型</label>
                    </el-col>

                    <el-col :span="15">
                        <el-select class="input-entry" v-model="queryParams.searchType" placeholder="" clearable>
                            <el-option v-for="item in stockType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt20">
                    <el-col :span="8">
                        <div class="height1"></div>
                    </el-col>
                    <el-col :span="14">
                        <span class="search-btn" @click="searchList">查询</span>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="ifWidth?19:24" class="border-left" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <div class="fixed">
                        <el-col :span='2' class="search-block"  v-show="!ifWidth">
                            <div @click="openLeft">
                                <img src="../../../static/image/common/search_btn.png">
                                <span class="f14">查询</span>
                                <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                                <!-- <span class='open-search'>+</span> -->
                            </div>

                        </el-col>

                        <el-col :span="ifWidth?24:22">
                            <el-col :span="10">
                                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                            </el-col>
                            <div class="search_input_group pt5">
                                <div class="search_input_wapper" @keyup.enter="submitSearch">
                                    <el-input
                                        v-model="SearchKey"
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
import Query from '../../base/query/query'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
export default{
        name:'repositoryList',

        created:function(){
            this.getOuId();
            this.loadSelect();

        },
        computed:{
            countOp () {
                return this.opItem;
            },
        },
        watch: {
            opSearch(val) {
                this.$refs.optree.filter(val);
            }
        },
        methods:{
            //---获取数据------------------------------------------
            getOuId:function(){
                let self = this;

                //获取当前默认ouid
                self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                    console.log(res);
                    self.queryParams.defaultOuId = res.result.id;

                    self.loadSelect();
                    //self.getAllList(self.defaultOuId);
                },function(res){
                    console.log('err'+res)
                });
            },

            loadSelect:function(){
                let self = this;
                //业务地区
                self.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
                    console.log(res);
                    self.opAr = res;
                    self.expandOpId=self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
            },
            //----------------------------------------------------
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
            //---条件查找------------------------------------------
            searchList:function(){//根据条件查找仓库信息
                let self = this;
                    self.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',self.queryParams).then(function(res){
                        self.$store.commit('Init_Table',res.result.items);
                        let totalPage=Math.ceil(res.result.totalCount/self.$store.state.repositoryListEachPage);
                        self.$store.commit('Init_pagination',totalPage);
                        self.$store.commit('Init_TotalCount',res.result.totalCount);
                        self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
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
                            _this.$axios.posts('/api/services/app/StockManagement/BatchDelete',_this.idArray).then(function(res){
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
            //---表格编辑------------------------------------------
            handleEdit:function(index){//表格内编辑操作
                this.isEdit=index;//当选中行的索引值与列表中索引值相同，则编辑！
                console.log(index)
            },

            handleSelectionChange(val) {//点击复选框选中的数据
                this.multipleSelection = val;
            },

            handleCurrentChange:function(val){//获取当前页码
                this.pageIndex=val;
                console.log(val)
                this.page = val;
                this.getAllList();
            },
            //---------------------------------------------------
            btnClick(btn){//按钮组点击事件
                if(btn=="新增"){//新增事件
                    this.goDetail();
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
            //-------------------------------------------------


            //---跳转----------------------------------------------
            goDetail(){
                this.$store.state.url='/repository/repositoryData/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            goModify:function(id){
                console.log(id)
                this.$store.state.url='/repository/repositoryModify/'+id
                // this.$store.state.url='/repository/default/repositoryModify/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            //-------------------------------------------------------
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
            closeLeft:function(){
                let self = this;
                self.ifWidth = false;
                self.ifOpen = false;
            },
            openLeft:function(){
                let self = this;
                self.ifWidth = true;
                self.ifOpen=true;
            },
            //---树------------------------------------------
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
                console.log(value)
                console.log(data)
                if (!value) return true;
                    return data.areaName.indexOf(value) !== -1;
            },
            opFilterNode(value, data) {
                if (!value) return true;
                    return data.name.indexOf(value) !== -1;
            },
            opNodeClick:function(data){
                console.log(data)
                let self = this;
                self.opItem.id = data.id;
                self.opItem.areaName = data.name;
                self.searchArea = data.id;
                self.$nextTick(function(){
                    $('#op_confirmSelect').click()
                })
            },
            submitSearch(){
                let _this=this;
                _this.page=1
                alert(_this.SearchKey)
                //  _this.ajaxTable({SearchKey:_this.SearchKey,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},"submitSearch");
            }
            //-----------------------------------------------
        },

        data(){
            return{
                ifOpen:true,
                SearchKey:'',//模糊查询
                //defaultOuId:'',//默认ouid
                allList:[],//获取所有的列表数据
                total:'',//数据总条数
                multipleSelection: [],//复选框选中数据
                idArray:{
                    ids:[]
                },//复选框选中数据id

                pageIndex:0,//分页的当前页码
			    totalPage:0,//当前分页总数
                page:1,//当前页
                eachPage:10,//一页显示的数量



                stockTypeId:'',//左侧搜索框的仓库类型值
                ifWidth:false,

                //---业务地区树形下拉-----
                opSearch:'',//树形搜索框的
                selectOpProps:{
                    children: 'childItems',
                    label: 'name',
                    id:'id'
                },
                opItem:{
                    id:'',
                    areaName:'',
                },
                opAr:[],//业务地区下拉框
                expandOpId:[],
                //-----------------------

                // dataSource: [{
                //     value:"",
                //     label: '全部'
                //     }, {
                //     value: 0,
                //     label: '禁用'
                //     }, {
                //     value: 1,
                //     label: '启用'
                //  }],
                stockType:[{
                    value:0,
                    label: '仓库'
                    }, {
                    value:1,
                    label: '店铺'
                }],

                //---确认删除-----------------
                dialogDelConfirm:false,//用户删除保存提示信息
                //--------------------
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
                    text:'Excel',
                    class:'bt_excel',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'辅助功能',
                    class:'bt_auxiliary',
                    icon:'icon-fuzhugongneng',
                    disabled:false,
                }],//按钮组
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                httpUrl:{
                    delete:'/api/services/app/StockManagement/Delete',//行内删除
                    query:'/api/services/app/StockManagement/GetRepositoryList',//条件查询
                    view:'/repository/repositoryModify/'
                },
                queryParams:{
                    defaultOuId:'',
                    StockCode:'',//查询编号
                    StockName:'',//查询名称
                    AreaCode:'',//查询业务地区
                    StockTypeId:'',//仓库类型
                    SkipCount:(this.$store.state.repositoryListCurrentPage-1)*this.$store.state.repositoryListEachPage,
                    MaxResultCount:this.$store.state.repositoryListEachPage
                },
                column: [{
                    prop: 'ouId_OuName',
                    label: '所属组织',
                    controls:'text',
                    flag:true,//更改标识
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    isFix:''
                    },{
                    prop: 'stockCode',
                    label: '仓库编码',
                    controls:'button',
                    width:"auto",
                    sortable:false,
                    },{
                    prop: 'stockName',
                    label: '仓库名称',
                    controls:'button',
                    width:"auto",
                    sortable:false,
                    },{
                    prop: 'stockFullName',
                    label: '仓库全称',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'stockTypeId',
                    label: '仓库类型',
                    controls:'select',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    dataSource:[{
                    itemValue:0,
                    itemName: '仓库'
                    }, {
                    itemValue:1,
                    itemName: '店铺'
                    }],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    },{
                    prop: 'opAreaId_AreaName',
                    label: '业务地区',
                    controls:'text',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'stockAddress',
                    label: '地址',
                    controls:'text',
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
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    width:"auto",
                    isDisable:true,
                    sortable:false,
                    dataSource:[{
                        itemValue:"",
                        itemName: '全部'
                        }, {
                        itemValue: 0,
                        itemName: '禁用'
                        }, {
                        itemValue: 1,
                        itemName: '启用'
                    }],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    }

                    ],
                isSave:false,
                enableEdit:false,
                tableModel:'repositoryList',
                command:[{
                    text:'查看',
                    class:'blue'
                },{
                    text:'删除',
                    class:'blue'
                }],


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
        components:{
            Table,
            dialogBox,
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
.res-list{
    width: 100%;
    height: 100%;
    background:#EEF1F5;
}
/* .res-list .rightBox{
    width: calc(100% - 290px)
} */
.w0{
    width: 0px;
}

.w20{
    width: 20%;
}
.w80{
    width: 80%;
}
w100{
    width: 100%;
}

.bg-white{
    background:white;
    border-radius: 3px;
    font-size: 14px;
}
.fixed{
    background-color: white;
}
.ml10{
    margin-left: 10px;
}
.mr10{
    margin-right: 10px;
}
.mt10{
    margin-top: 10px;
}
.pt5{
    padding-top: 5px;
}
.pt10{
    padding-top: 10px;
}
.pl10{
    padding-left: 10px;
}
.pl15{
    padding-left: 15px;
}
.btn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background:rgba(130, 170, 252, 1);
    border-radius: 3px;
    color: white;
    width: 100%;
    text-align: center;
    cursor: pointer;
}
.rbtn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background:rgba(242, 242, 242, 1);
    border-radius: 3px;
    width: 100%;
    text-align: center;
    cursor: pointer;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
}
input:-ms-input-placeholder{
    color: rgba(0, 0, 0, 0.349019607843137);
}

input::-webkit-input-placeholder{
    color: rgba(0, 0, 0, 0.349019607843137);
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.fs12{
    font-size: 12px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 380px;
}
</style>

<style>
.res-list .open-search{
    background-image: url(../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
}
.res-list .cell .el-input__inner{
    border:none;
    text-align:center;
    padding:0;
}
.res-list .bgw .el-input__inner{
    background-color:white;
}
.res-list .bgg .el-input__inner{
    background-color:#FAFAFA;
}
.res-list .bAreaSearch .el-input__inner{
    height: 30px;
    border-radius: 30px;
}
.res-list .el-table .cell{
    font-size:12px;
}
</style>
