<template>
  <div class="res-list">
      <el-row class="bg-white">
            <el-col :span="ifWidth?5:0" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18" class="btn-for-search">
                        <img src="../../../static/image/common/search_btn.png">
                        <span>查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <span class="fs12 search_info_open" @click="closeLeft">-</span>
                    </el-col>
                </el-row>
                <el-row class="mt10"> 
                    <div class="bgcolor smallBgcolor">
                        <label>{{$t('message.WareHouse.WareHouseCode')}}</label>
                        <el-input placeholder="" v-model="queryParams.StockCode"></el-input>
                    </div> 
                </el-row>
                <el-row>
                    <div class="bgcolor smallBgcolor">
                        <label>{{$t('message.WareHouse.WareHouseName')}}</label>
                        <el-input placeholder="" v-model="queryParams.StockName"></el-input>
                    </div> 
                </el-row>
                <el-row>
                    <div class="bgcolor smallBgcolor">
                        <label>业务地区</label>
                        <el-select v-model="queryParams.AreaCode">
                            
                        </el-select>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor smallBgcolor">
                        <label>{{$t('message.WareHouse.WareHouseType')}}</label>
                        <el-select v-model="queryParams.StockTypeId">
                            <el-option v-for="item in stockType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </div>
                </el-row>
                <el-row style="text-align:center;">
                    <div class="bgcolor smallBgcolor">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                语言切换<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="cn">中文</el-dropdown-item>
                                <el-dropdown-item command="en">英文</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-row>
                <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" >
                        <el-input v-model="name"></el-input>
                        <div class="message">{{ validation.firstError('name') }}</div>
                    </el-form-item>
                    <el-form-item label="活动编号" >
                        <el-input v-model="code"></el-input>
                        <div class="message">{{ validation.firstError('code') }}</div>
                    </el-form-item>
                </el-form>
                <el-button @click='submit()'>提交</el-button>
                <el-button @click='addRule()'>添加规则</el-button>
            </el-col>
            <el-col :span="ifWidth?19:24" class="border-left">
                <el-row class="h48">
                    <el-col :span='2' class="search-block"  v-show="!ifWidth">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <span class='open-search'>+</span>
                        </div>
                        
                    </el-col>

                    <el-col :span="22" class="pt5">
                        <button class="erp_bt bt_add" @click="add();">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail">新增</span>
                        </button>

                        <button  class="erp_bt bt_del">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_del.png">
                            </div>
                            <span class="btDetail">删除</span>
                        </button>

                        <button class="erp_bt bt_excel">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_excel.png">
                            </div>
                            <span class="btDetail">Excel</span>
                        </button>

                        <button class="erp_bt bt_auxiliary">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_auxiliary.png">
                            </div>
                            <span class="btDetail">辅助功能</span>
                        </button>
                        <div class="search_input_group">
                        <div class="search_input_wapper" >
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
                    </el-col>
                    
                </el-row>
                <el-row class="pb10">
                    <el-col :span="24">
                        <el-select v-model="value6"  filterable :filter-method="filterMethod" multiple clearable placeholder="请选择">
                            <el-option
                            v-for="item in citiesFilter"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span>{{ item.label }}</span>
                            <span>{{ item.value }}</span>
                            </el-option>
                        </el-select>
                        <ScrollTable @handleSelect='handleSelect' :scrollBasicSetting='scrollBasicSetting' :mutilSeletions='mutilSeletions' :scrollTableData="scrollTableData" @scrollLoadMore="scrollLoadMore" @handleSelectionChange="handleSelectionChange"></ScrollTable>
                        <ScrollTable :scrollBasicSetting='scrollBasicSettingb' :mutilSeletions='mutilSeletionb' :scrollTableData='scrollTableDatab' @scrollLoadMore="scrollLoadMore"></ScrollTable>
                        <!-- <el-table
                        :data="tableData"
                        ref="print"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                        </el-table> -->
                        <my-component :is='component' ref='print' v-show='show' :head='head' :body='body'></my-component>
                        <el-button @click='tableChecked()'>选中1</el-button>
                        <el-button @click='tableCheckedChange()'>选中2</el-button>
                        <el-button @click='printPdf()'>打印</el-button>
                        <!-- <Table :methodsUrl="httpUrl" :hasPagination="hasPagination" :cols="column" :HttpParams="HttpParams" :queryParams="queryParams" :isDisable='isDisable' :tableName="tableModel" :mutiSelect="mutiSelect"  :command="command"></Table> -->
                    </el-col>
                </el-row>
            </el-col>   
        </el-row>
  </div>
</template>
<script>
// import Table from '../../base/Table/Table'
import {getLodop} from '../../common/LodopFuncs'
import ScrollTable from '../../base/scrollTable/scrollTable'
import treeVue from '../../base/tree/tree.vue'
import {FILTER_MOTHED} from '../../common/common.js'
    export default{
        name:'repositoryList',
        data(){
            return{
                name:'',
                code:'',
                show:false,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                scrollBasicSetting:{
                    tableName:'test',//ref名称
                    mutiSelect:true,
                    tableCols:[{//表格列名
                        prop: 'brandCode',
                        label: '品牌编码',
                        sortable:true,
                        filterArray:[],
                        filtermethod: function (value, row, column) {
                            const property = column['property'];
                            return row[property] === value;
                        }
                        },{
                        prop: 'brandName',
                        label: '品牌名称',
                        sortable:false,
                    }],
                    scrollLoading:true,
                    totalCount:0,
                    currentPage:1,
                },
                scrollTableRender:{
                    HttpParams:{
                        BrandCode:'',//品牌编码
                        BrandName:'',//品牌名称
                        BrandEname:'',//品牌名称(英文)
                        Status:'',//状态
                        SkipCount:0,
                        MaxResultCount:10
                    },
                    httpUrl:'/api/services/app/BrandManagement/GetListByCondition',
                },
                scrollTableCurrentPage:1,
                scrollTableDataTotalCount:0,
                scrollTableData:[],
                scrollBasicSettingb:{
                    tableName:'testb',//ref名称
                    mutiSelect:true,
                    tableCols:[{//表格列名
                        prop: 'categoryCode',
                        label: '类目编码'
                        },{
                        prop: 'categoryName',
                        label: '类目名称'
                    }],
                    scrollLoading:true,
                    totalCount:0,
                    currentPage:1,
                },
                scrollTableRenderb:{
                    HttpParams:{
                        CategoryId:'',
                        CategoryCode:'',
                        CategoryName:'',
                        IsService:'',
                        Status:'',
                        SkipCount:0,
                        MaxResultCount:10,
                        },
                    httpUrl:'/api/services/app/CategoryManagement/GetListByCondition',
                },
                scrollTableCurrentPageb:1,
                scrollTableDatab:[],
                scrollTableDataTotalCountb:0,
                ifWidth:true,
                tableModel:'storeHouse',//数据模型名称标志
                isDisable:true,//表格是否可编辑
                mutiSelect:false,//表格是否可多选
                command:[{//操作栏按钮配置
                    text:'查看',
                    class:'green'
                },{
                    text:'删除',
                    class:'blue'
                }],
                httpUrl:{//请求接口地址
                    Initial:'/api/services/app/StockManagement/GetRepositoryList',
                    view:'/storeHouse/storeHouseModify/',
                    delete:'/api/services/app/StockManagement/Delete'
                },
                HttpParams:{//初始化参数
                    OuId:this.$store.state.OuId,
                    SkipCount:(this.$store.state.storeHouseCurrentPage-1)*this.$store.state.storeHouseEachPage,
                    MaxResultCount:this.$store.state.storeHouseEachPage
                },
                column:[{//表格列配置
                        prop: 'ouId_OuName',
                        label: '所属组织',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'stockCode',
                        label: '仓库编码',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'stockName',
                        label: '仓库名称',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'stockFullName',
                        label: '仓库全称',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'stockTypeId',
                        label: '仓库类型',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'opAreaId_AreaName',
                        label: '业务地区',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'stockAddress',
                        label: '地址',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'manager',
                        label: '负责人',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'status',
                        label: '状态',
                        controls:'select',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                        dataSource:[{
                            value: 1,
                            label: '启用'
                        },{
                            value: 0,
                            label: '禁用'
                        }]
                }],
                hasPagination:true,
                queryParams:{
                    OuId:this.$store.state.OuId,//组织单元ID
                    StockCode:'',//仓库编码
                    StockName:'',//仓库名称
                    AreaCode:'',//业务地区
                    StockTypeId:'',//仓库类型
                    Sorting:'',//排序方式
                    SkipCount:(this.$store.state.storeHouseCurrentPage-1)*this.$store.state.storeHouseEachPage,
                    MaxResultCount:this.$store.state.storeHouseEachPage
                },
                stockType:[{//仓库类型
                    value:0,
                    label: '仓库'
                    }, {
                    value:1,
                    label: '店铺'
                }],
                areaArray:[],
                mutilSeletions:{
                    key:'brandCode',
                    array:[]
                },
                mutilSeletionb:{
                    key:'categoryCode',
                    array:[]
                },
                cities: [{
                    value: 'Beijing',
                    label: '北京'
                    }, {
                    value: 'Shanghai',
                    label: '上海'
                    }, {
                    value: 'Nanjing',
                    label: '南京'
                    }, {
                    value: 'Chengdu',
                    label: '成都'
                    }, {
                    value: 'Shenzhen',
                    label: '深圳'
                    }, {
                    value: 'Guangzhou',
                    label: '广州'
                }],
                value6:[],
                filterKey:'',
                component:'',
                head:[{
                    name:'姓名',
                    prop:'name',
                },{
                    name:'年龄',
                    prop:'age'
                },{
                    name:'性别',
                    prop:'sex'
                },{
                    name:'地址',
                    prop:'address'
                },{
                    name:'电话',
                    prop:'phone'
                },{
                    name:'email',
                    prop:'email'
                }],
                body:[{
                    name:'大胖',
                    age:10,
                    sex:'男',
                    address:'上海市普陀区金沙江路 1518 弄',
                    phone:19082340982,
                    email:'12345@163.com'
                },{
                    name:'二妞',
                    age:15,
                    sex:'女',
                    address:'上海市普陀区金沙江路 1518 弄',
                    phone:19082340982,
                    email:'12345@163.com'
                }],
                rule:'',
                ruleTips:'',
                required:true,
            }
        },
        mounted(){
            
        },
        validators: {
            name: function(value) {
                if(this.required){
                    return this.Validator.value(value).required().regex(this.rule, this.ruleTips);
                }else{
                    return this.Validator.value(value).regex(this.rule, this.ruleTips)
                }
                
            },
            code: function(value) {
                return this.Validator.value(value).required().digit();
            }
        },
        created(){
            this.getBrand();
            this.getCategory();
            this.scrollBasicSetting.tableCols[0].filterArray=[{text:'CHEE',value:'CHEE'}]
        },
        computed:{
           citiesFilter: function () {//下拉数据自定义搜索过滤
                return FILTER_MOTHED(this.filterKey,this.cities)
            },
        }, 
        watch: {
         
        },
        methods:{
            submit(){
                this.$validate().then(function(success){
                    if(success){
                        alert("成功");
                    }
                    
                })
            },
            addRule(){
                this.rule='^[A-Za-z]*$',
                this.ruleTips='必须为a-z的字母'
            },
            handleSelect(row){
                alert(row);
            },
            tableChecked(){
                this.mutilSeletions.array=[{'brandCode':'CHEE','brandName':'千百惠'},{'brandCode':'ONE ONLY','brandName':'独一无二'}]
            },
            tableCheckedChange(){
                this.mutilSeletionb.array=[{'categoryCode':'CG001','categoryName':'商品类目'}]
            },
            filterMethod(query){
                this.filterKey=query 
            },
            printPdf() {
                this.$nextTick(()=>{
                    this.component='my-component';
                    if(typeof(this.$refs.print)=='undefined'){
                        this.$message({
                            message: '正在生成打印模版，请重试！',
                            type: 'info'
                        });
                    }else{
                        // .el-table__header,.el-table__body,.el-table{width:auto!important}
                        let style="<style>table,td,th{border:1px solid #000;border-collapse:collapse;text-align:center;white-space:nowrap;}td,th{padding:3px 5px;font-size:12px}</style>"
                        let html=style+"<body>"+this.$refs.print.$el.innerHTML+"</body>";
                        let  LODOP = getLodop();
                        LODOP.PRINT_INITA(0,0,1891,937,"")
                        LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
                        LODOP.SET_SHOW_MODE("HIDE_GROUND_LOCK",1); //隐藏纸钉按钮
                        LODOP.ADD_PRINT_TABLE(55,85,800,800, html);   
                        LODOP.PRINT_DESIGN();
                    }
                    
                },1000)
            },
            scrollLoadMore(tableName){
                let Setting='';
                let Render='';
                let Tabledata='';
               if(tableName=="test"){
                   Setting="scrollBasicSetting";
                   Render="scrollTableRender";
                   Tabledata='scrollTableData'
                   this.loadMoreSetting(Setting,Render,Tabledata);
               }else if(tableName=="testb"){
                   Setting="scrollBasicSettingb";
                   Render="scrollTableRenderb";
                   Tabledata='scrollTableDatab'
                   this.loadMoreSetting(Setting,Render,Tabledata);
               }
            },
            loadMoreSetting(Setting,Render,Tabledata){
                this[Setting].scrollLoading=true;    
                let eachPage=10;
                this[Setting].currentPage++;
                this[Render].HttpParams.SkipCount=0;
                this[Render].HttpParams.MaxResultCount=eachPage*this[Setting].currentPage;
                if(this[Render].HttpParams.MaxResultCount>this[Setting].totalCount&&this[Setting].totalCount<eachPage*(this[Setting].currentPage-1) ){
                    this[Setting].scrollLoading=false;    
                    this.$message({
                        message: '没有更多的数据了！',
                        type: 'success'
                    });
                }else{
                    let _this=this;
                    _this.$axios.gets(this[Render].httpUrl,_this[Render].HttpParams).then(function(res){;
                        _this[Tabledata]=res.result.items;
                        _this[Setting].totalCount=res.result.totalCount;  
                        _this[Setting].scrollLoading=false;    
                    })
                }
            },
            add(){//新增页面跳转
                this.$store.state.url='/storeHouse/storeHouseModify/default'
           		this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            getBrand(){//初始化表格赋值
               let _this=this;
                _this.$axios.gets(this.scrollTableRender.httpUrl,_this.scrollTableRender.HttpParams).then(function(res){;
                       _this.scrollTableData=res.result.items;
                       _this.scrollBasicSetting.totalCount=res.result.totalCount;  
                       _this.scrollBasicSetting.scrollLoading=false;    
                })
            },
            getCategory(){
                let _this=this;
                _this.$axios.gets(this.scrollTableRenderb.httpUrl,_this.scrollTableRenderb.HttpParams).then(function(res){;
                       _this.scrollTableDatab=res.result.items;
                       _this.scrollBasicSettingb.totalCount=res.result.totalCount;  
                       _this.scrollBasicSettingb.scrollLoading=false;          
                })
            },
            query(){//根据条件查询数据
                let _this=this;
                _this.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',_this.queryParams).then(function(res){;
                        _this.$store.commit('Init_Table',res.result.items);//传递table数据
                        let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.storeHouseEachPage);
                        _this.$store.commit('Init_pagination',totalPage);//设置总分页
                        _this.$store.commit('Init_TotalCount',res.result.totalCount);//设置总条数
                        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })
            },
            handleCommand(command){
                if(command=='en'){
                    let array={
                            WareHouseCode:'WareHouseCode',
                            WareHouseName:'WareHouseName',
                            WareHouseType:'WareHouseType',
                    };
                    this.$store.commit('set_langEn',array);//传递table数据
                }
                this.$i18n.locale=command
                window.sessionStorage.setItem('lang',command)
                //this.$store.commit('set_lang',command);
            },
            handleSelectionChange(val){
                console.log(val);//val为选中的表格数据 array
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
            },
            openLeft:function(){
                let self = this;
                self.ifWidth = true;
            },
            //---树------------------------------------------
            filterNode(value, data) {
                console.log(value)
                console.log(data)
                if (!value) return true;
                    return data.areaName.indexOf(value) !== -1;
            },
           
        },
        components:{
            //Table,
            ScrollTable,
            'my-component': function(resolve){
                require(['../../base/printTable/printTable'], resolve)                
            }
        }
    }
</script>

<style scoped>
.res-list{
    width: 100%;
    height: 100%;
    background:#EEF1F5;
}

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
<style id='print'>
.print table,.print table tr th, .print table tr td {text-align: center;border:1px solid #0094ff; }
.print table{text-align: center; border-collapse: collapse; padding:2px;}
</style>

