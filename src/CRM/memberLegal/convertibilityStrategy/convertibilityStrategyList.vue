
<template>
    <div class="convertibility-strategy commodity member-list">
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
                        <label class="input-label">名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder=""v-model="queryParams.TacticName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">生效时间</label>
                    </el-col>
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                       <el-date-picker
                            class="dateRange"
                            type="daterange"
                            range-separator="to"
                            align="center"
                            unlink-panels
                            start-placeholder=""
                            end-placeholder=""
                            v-model="EffectiveTime">
                            </el-date-picker>
                    </el-col> 
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">兑换种类</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.ExchTypes" filterable>
                            <el-option v-for="item in TypeOpt" :label="item.itemName" :key="item.itemValue" :value="item.itemValue">
                                <!-- <span>{{item.itemName}}</span>
                                <span>{{item.itemCode}}</span> -->
                            </el-option>
                        </el-select>
                    </el-col> 
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">可用等级</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" clearable v-model="queryParams.GradeIds" filterable :filter-method="filterMethod">
                            
                            <el-option v-for=" item in User" :label="item.gradeName" :key="item.id" :value="item.id">
                                <span>{{item.gradeName}}</span>
                                <span>{{item.gradeCode}}</span>
                            </el-option>
                        </el-select>
                    </el-col> 
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">状态</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select class="input-entry" v-model="queryParams.Status" clearable filterable>
                            <el-option v-for=" item in dataSource" :label="item.itemName" :key="item.itemValue" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </el-col> 
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">备注</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.Remark"></el-input>
                    </el-col>

                </el-row>
                 <el-row class="mt20">
                        <el-col :span="8">
                            <div class="height1"></div>
                        </el-col>
                        <el-col :span="14">
                            <span class="search-btn" @click="queryTab">查询</span>
                        </el-col>
                </el-row>
            </el-col>
            <el-col class="border-left" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span='2' class="search-block br"  v-show="!ifWidth">
                        <div @click="openLeft">
                            <img src="../../../../static/image/common/search_btn.png">
                            <span class="fs18">查询</span>
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                    </el-col>
                    <el-col :span='ifWidth?24:22'>
                            <el-row>
                                <el-col :span="13">
                                    <div class="btnGroup-box">
                                         <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                                    </div>
                                </el-col> 
                                <el-col :span="11" class="line-height28 pt5"> 
                                    <div class="search-input-member">
                                        <div class="search-wapper">
                                            <input type="text"  v-model="searchParams.QuikInput" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                            <button class="mem-search-btn" @click="searchRight">搜索</button>
                                        </div>
                                        
                                        <div class="search_advance" @click="dialogUserDefined = true">
                                            <button class="userDefined advanced-query">
                                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                            </button>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                    </el-col>
                </el-row>
                <el-row class="pb10">
                    <el-col :span="24">
                        <el-tabs v-model="activeName" class="tabZoo" @tab-click='query'>
                            <el-tab-pane label="全部活动" name="allAc" class="getPadding" style="z-index:-100">
                                <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
                            </el-tab-pane>
                            <el-tab-pane label="未审核" name="unaudited" class="getPadding" style="z-index:-100">
                                 <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
                            </el-tab-pane>
                            <el-tab-pane label="未开始" name="noBegin" class="getPadding" style="z-index:-100">
                                 <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
                            </el-tab-pane>
                            <el-tab-pane label="进行中" name="doing" class="getPadding" style="z-index:-100">
                                <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
                            </el-tab-pane>
                            <el-tab-pane label="已失效" name="outDate" class="getPadding" style="z-index:-100">
                                 <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command" @tableFunction='tableFunction'></Table>
                            </el-tab-pane>

                        </el-tabs>
                        
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- dialog -->  
       <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox> 
    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Table from '../../../base/Table/Table'
import dialogBox from '../../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../../common/common.js'
import config from '../../../../static/config';
export default {
    name:'convertibilityStrategy',
    components:{
        buttonGroup,
        Table,
        dialogBox,
    },
    created () {
        this.loadChannelOpt();//加载渠道
        this.loadPerson();//加载营业员
        this.loadUserOpt();//加载会员等级
        this.loadStatus();//加载单据类型
    },
    watch:{
        ifWidth:function(val,oldval){
            console.log(val,oldval)
        }
    },
    computed:{
       User: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.UserOpt)
      }
    },
    data(){
        return{
            url:"http://192.168.100.107:8092",//提取公用服务器地址
            valueDate:'',
            dataSource:[],
            tableModel:'convertibilityStrategyList',
            //按钮组
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
               text:'审核',
               class:'bt_auxiliary',
               icon:'icon-shenhe',
               disabled:false,
            },{
               text:'反审核',
               class:'bt_saveAdd',
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
            }],
            ifWidth:false,
            ifOpen:false,
            httpUrl:{
                view:'/convertibilityStrategy/convertibilityStrategyModify/',
                delete:config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/Delete',//行内删除
                query:config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetList',//条件查询,
                },
            queryParams:{//查询条件参数
                    GroupID:1,//集团id
                    TacticName: '',//名字
                    EffectiveTimeBegin:'',//
                    EffectiveTimeEnd:'',// 
                    GradeIds:"",//可用等级
                    ExchTypes:"",//兑换种类
                    Status:'',//充值时间
                    Status2:'',
                    Remark:"",//排序
                    QuikInput:'',
                    Sorting:'',
                    SkipCount:(this.$store.state.convertibilityStrategyListCurrentPage-1)*this.$store.state.convertibilityStrategyListEachPage,
                    MaxResultCount:this.$store.state.convertibilityStrategyListEachPage,
                    },
            searchParams:{
                    GroupID:1,
                    QuikInput:"",
                    SkipCount:(this.$store.state.convertibilityStrategyListCurrentPage-1)*this.$store.state.convertibilityStrategyListEachPage,
                    MaxResultCount:this.$store.state.convertibilityStrategyListEachPage,
            },
            //名称  生效时间  可用等级  兑换种类  状态
                column: [{
                    prop:'tacticName',
                    label:'名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop:'tacticCode',
                    label:' 代码',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    },{
                    prop:'effectiveTime',
                    label:'生效时间',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    isFix:'',
                    }, {
                    prop:'gradesName',
                    label:'可用等级',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop:'exchType',
                    label: '兑换种类',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop:'statusName',
                    label: '状态',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    // dataSource:[],
                    }],
                dialogVisible:false,
                dialogCommand:[],

                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
               dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                command:[{
                    text:'查看',
                    class:'green'
                },{
                    text:'删除',
                    class:'blue'
                },{
                    text:"兑换明细",
                    class:"blue" 

                }],
                 effectiveStart:"",
                 effectiveEnd:"",
                 activeName:'allAc',
                 EffectiveTime:[],//有效时间
                 dataSource:[],//状态
                 UserOpt:[],//会员等级
                 idArray:{
                     ids:[]
                },
              
                TypeOpt:[
                    {
                        itemCode:'Card',
                        itemName:"卡券",
                        itemValue:1,
                    }, {
                        itemCode:'Services',
                        itemName:"服务",
                        itemValue:2,
                    },
                     {
                        itemCode:'Goods',
                        itemName:"商品",
                        itemValue:3,
                    },
                     {
                        itemCode:'upGrade',
                        itemName:"升级",
                        itemValue:4,
                    }
                ],
                filterKey:''
        }
    },
    methods:{
        btnClick(btn){//按钮组点击事件
            if(btn=="新增"){
              this.goDetail();
            }else if(btn=="删除"){
                this.delBatch();
            }else if(btn=="审核"){
             
            }else if(btn=="反审核"){
               
            }else if(btn=="打印"){
                
            }else if(btn=="导出"){
               
            }
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
        //---左侧搜索展开----------------------------------------------------
        closeLeft(){
            this.ifWidth = false;
            this.ifOpen = false;
        },
        openLeft(){
            this.ifWidth = true;
            this.ifOpen = true;
        },
        searchRight() {
            this.getDataList();
            
        },
        goDetail(){
            this.$store.state.url='/convertibilityStrategy/convertibilityStrategyDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
         //---------------------------------加载营业员员----------------------------------------------
         loadPerson:function(){
                let _this=this;
                _this.$axios.gets("/api/services/app/EmployeeManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.Person=res.result.items;
                 }) ;
         },
         //---------------------------------加载操作渠道------------------------------------------------
         loadChannelOpt:function(){
               let _this=this;
                _this.$axios.gets("/api/services/app/ShopManagement/GetAll",{SkipCount:0,MaxResultCount:1000}).then(res => {
                _this.ChannelOpt=res.result.items;
              })
         },
         //---------------------------------加载会员等级------------------------------------------------
         loadUserOpt:function(){
               let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberGradeManagement/GetMemberGradeList",{SkipCount:0,MaxResultCount:10000}).then(res => {
                _this.UserOpt=res.result;
              })
         },
         loadStatus(){
              let _this=this;
                _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem",{dictName:'OrderStatus'}).then(res => {
                _this.dataSource=res.result;
                _this.column[5].dataSource=res.result;
                console.log(res);
              })
         },
         loadTable(){
                let _this=this;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetList',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams)
                _this.$store.commit('Init_Table',res.result.items); 
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.convertibilityStrategyListEachPage);
                _this.$store.commit('Init_pagination',totalPage) 
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1            
            })     
         },
         //------------------------------------查询-------------------------------------
        queryTab:function(){
            let _this=this;
            if(_this.EffectiveTime==null){
                _this.queryParams.EffectiveTimeBegin='';
                _this.queryParams.EffectiveTimeEnd=''
            }else if(_this.EffectiveTime.length=0){
                 _this.queryParams.EffectiveTimeBegin='';
                _this.queryParams.EffectiveTimeEnd=''
            }else{
                 _this.queryParams.EffectiveTimeBegin=_this.EffectiveTime[0];
                 _this.queryParams.EffectiveTimeEnd=_this.EffectiveTime[1];
            }
            // console.log(_this.effectiveStart,_this.effectiveEnd)
             _this.loadTable();
            
        },
              //批量删除------------------------------------
        delBatch(){
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
        query(res){
        let _this=this;
        console.log(res,11111)
        if(res.index==0){
            console.log(1111);
            _this.queryParams.Status2='';
            _this.$store.state.convertibilityStrategyListLoading=true;
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.dispatch('InitTable');
        }else if(res.index==1){
            _this.queryParams.Status2='A';
            _this.$store.state.convertibilityStrategyListLoading=true;    
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.dispatch('InitTable');
        }else if(res.index==2){
            _this.queryParams.Status2='B';
            _this.$store.state.convertibilityStrategyListLoading=true;
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.dispatch('InitTable');
        }else if(res.index==3){
            _this.queryParams.Status2='C';
            _this.$store.state.convertibilityStrategyListLoading=true;
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.dispatch('InitTable');
        }else if(res.index==4){
            _this.queryParams.Status2='D';
            _this.$store.state.convertibilityStrategyListLoading=true;
            _this.$store.commit('setQueryParams',_this.queryParams);
            _this.$store.dispatch('InitTable');
        }
        },
        //右上角搜索
        getDataList(){
            let _this=this;
             _this.searchParams.QuikInput= $.trim(_this.searchParams.QuikInput);
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetList',_this.searchParams).then(function(res){//查询表格数据
            _this.$store.commit('setQueryParams',_this.queryParams)
            _this.$store.commit('Init_Table',res.result.items); 
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.convertibilityStrategyListEachPage);
            _this.$store.commit('Init_pagination',totalPage) 
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1            
        })       
        },
        tableFunction(data){
            if(data.button=="打印"){
                alert("测试打印")
            }else if(data.button=="红冲"){
                alert("测试红冲!")
            }
        },
       dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    let _this=this;
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    for(var i in _this.SelectionChange){
                        _this.idArray.ids.push(_this.SelectionChange[i].id)
                    }
                        _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/BatchDelete',_this.idArray).then(function(res){
                            _this.$store.commit('setQueryParams',_this.queryParams)
                            _this.$store.dispatch('InitTable');
                            _this.$store.commit('setTableSelection',[])
                            _this.idArray.ids=[];
                            _this.dialogVisible=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');    
                        }).catch(function(err){
                            _this.dialogVisible=false;
                            _this.idArray.ids=[];
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
         dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
        filterMethod(query){
           this.filterKey=query; 
       },
    }
}
</script>
<style scoped>
.bb1{
    border-bottom: 1px solid #E4E4E4;
}
.convertibility-strategy .leftBox{
    width: 290px;
}
.convertibility-strategy .newRight{
    width: 100%;
}
.convertibility-strategy .smallRangeDate{
    height: 35px;
}
.convertibility-strategy .smallRangeDate .el-input__inner{
    height: 35px;
}
.convertibility-strategy .rangeDate{
    width: 181.25px;
}
.convertibility-strategy .f14{
    font-size: 14px;
}
.convertibility-strategy .border-left{
    border-left: 1px solid #E4E4E4;
}
</style>
<style>
.convertibility-strategy .smallRangeDate .el-range-separator{
    line-height: 35px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.border-left.rightBox{
    width: calc(100% - 290px);
}
.line-height28{
    line-height:28px;
}
.convertibility-strategy .el-tabs__header{
    margin:0;

}
.convertibility-strategy  .el-date-editor .el-range__close-icon{
 display: inline-block;
}
.convertibility-strategy .el-tabs--top .el-tabs__item:nth-child(2){
    padding-left:10px
}
.convertibility-strategy .rangeDate input.el-range-input{
     width: calc(50% - 20px);
}
.convertibility-strategy .el-date-editor .el-range__close-icon{
    width:18px;
}
</style>


