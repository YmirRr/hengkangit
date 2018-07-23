<template>
    <div class="card-list member-list">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="15">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
            <el-col :span="9" class="pt5">
                <div class="search-input-member">
                    <div class="search-wapper">
                        <input type="text" placeholder="名称\卡类型"  @keyup="doSearch" v-model="queryParams.QueryStr"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        <button class="mem-search-btn" @click="doSearch">搜索</button>
                    </div>
                    <div style="float:right">
                        <div class="search_advance">
                            <button class="userDefined advanced-query">
                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                            </button>
                        </div>
                    </div>
                </div>
            </el-col>  

        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <el-tabs v-model="activeName" class="tabZoo" @tab-click='query'>
                <el-tab-pane label="全部卡券" name="allCards" class="getPadding" style="z-index:-100">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" @tableFunction='tableFunction' :tableName="tableModel" :command="command"></Table>
                </el-tab-pane>
                <el-tab-pane label="未审核" name="unaudited" class="getPadding" style="z-index:-100">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
                </el-tab-pane>
                <el-tab-pane label="未开始" name="noBegin" class="getPadding" style="z-index:-100">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
                </el-tab-pane>
                <el-tab-pane label="进行中" name="doing" class="getPadding" style="z-index:-100">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
                </el-tab-pane>
                <el-tab-pane label="已失效" name="outDate" class="getPadding" style="z-index:-100">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
                </el-tab-pane>

            </el-tabs>
        </el-row>
        <!-- 发放记录弹框 -->
        <el-dialog :visible.sync="dialogRecord"  class="transfer_dialog dialogOu" width="70%">
            <span slot="title">
                <span>发放记录</span>
            </span>
            <el-col :span="24" slot="title">
                <buttonGroup :buttonGroup="buttonGroupRecord" @btnClick='btnClickRecord' class="pt20"></buttonGroup>
            </el-col>
            <el-col :span="24" class="transfer_warapper">
                <el-col :span="24" class="transfer_table">
                    <el-table :data="cardRecordTableData" border style="width: 100%"  @selection-change="handleSelectionChange" v-loading="tableLoading" class="normalTable">
                        <el-table-column type="selection" label="" width="50">
                        </el-table-column>
                        <el-table-column prop="couponId_CouponName" label="卡券名称"> </el-table-column>
                        <el-table-column prop="couponId_CouponTypeidTValue" label="卡类型"> </el-table-column>
                        <el-table-column prop="couponId_DenominationOrDiscountStr" label="面额/折扣率"> </el-table-column>
                        <el-table-column prop="activityName" label="营销活动"> </el-table-column>
                        <el-table-column prop="memberId_CardCode" label="会员卡号"> </el-table-column>
                        <el-table-column prop="memberId_Phone" label="手机号"> </el-table-column>
                        <el-table-column prop="couponCode" label="卡券编码"> </el-table-column>
                        <el-table-column prop="issueShopId_ShopName" label="发放店铺"> </el-table-column>
                        <el-table-column prop="issueTime" label="发放时间"> </el-table-column>
                        <el-table-column prop="usageTime" label="使用时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="卡券状态"> </el-table-column>
                    </el-table>

                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="reHandleCurrentChange"
                                    :current-page="rePageIndex"
                                    :page-size="reOneItem"
                                    :total="reTotalItem"></el-pagination>                
                
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="dialogRecord=false">确 认</button>
                <button class="transfer_footer_btn transfer_confirm" @click="dialogRecord=false">取 消</button>
            </span>
        </el-dialog>

      <!-- dialog -->  
      <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>        



    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import Table from '../../../base/Table/Table'
import config from '../../../../static/config'
export default {
    name:'cardList',
    data(){
        return{
            //按钮组-----------------------
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
                class:'bt_save',
                icon:'icon-shenhe',
                disabled:false,
            },{
                text:'作废',
                class:'bt_saveAdd',
                disabled:false,
            },{
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            }],
            buttonGroupRecord:[{
                text:'制券',
                class:'bt_save',
                icon:'icon-shenhe',
                disabled:false,
            },{
                text:'导入券号',
                class:'bt_saveAdd',
                disabled:false,
            },{
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            }],
        column: [{
            prop: 'couponName',
            label: '卡券名称',
            controls:'button',
            flag:true,//更改标识
            isDisable:true,
            }, {
            prop: 'couponTypeid',
            label: '卡类型',
            controls:'select',
            isDisable:true,
            dataSource:[],
            optionsKey:{label:'itemName',value:'itemValue'}
            }, {
            prop: 'denominationOrDiscountStr',
            label: '面额/折扣率',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'qtyStr',
            label: '库存数量',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'numberofDistribution',
            label: '发放数量',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'numberofWriteoffs',
            label: '核销数量',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'writeoffRate',
            label: '核销率',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'effectiveTimeStr',
            label: '生效时间',
            controls:'text',
            width:'200px',
            isDisable:true,
            }
            , {
            prop: 'statusTValue',
            label: '状态',
            controls:'text',
            isDisable:true,
            }
            ],
        tableModel:'cardList',
        httpUrl:{
            view:'/card/cardModify/',
            delete:config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Delete',//行内删除
            query:config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetAllCouponsByQuery',//条件查询
        },
        queryParams:{
            QueryType:'14',
            QueryStr:'',
            SkipCount:(this.$store.state.cardListCurrentPage-1)*this.$store.state.cardListEachPage,
            MaxResultCount:this.$store.state.cardListEachPage
        },

        pluginSetting:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
            width:'300'
        },
        command:[{
            text:'查看发放记录',
            class:'blue'
        },{
            text:'作废',
            class:'blue'
        },{
            text:'删除',
            class:'blue'
        },{
            text:'查看',
            class:'blue'
        }],
        //发放记录表格
        cardRecordTableData:[],
        rePageIndex:1,//分页的当前页码
        reTotalPage:0,//当前分页总数
        reOneItem:10,//每页有多少条信息
        rePage:1,//当前页
        reTotalItem:0,//总共有多少条消息
        tableLoading:true,
        queryParamsRecord:{
            CouponId:'',
            SkipCount:'',
            MaxResultCount:''
        },
        pluginSettingRecord:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
           
        },
        commandRecord:[{
            text:'延期',
            class:'blue'
        },{
            text:'作废',
            class:'blue'
        },{
            text:'变动记录',
            class:'blue'
        }],


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
        activeName:'allCards',
        idArray:{
            "ids": []
        },
        CancelCouponById:{//操作栏作废
            "id":[]
        },
        CancelCouponByIds:{//多选作废
            "id":[]
        },
        dialogRecord:false,//查看发放记录弹框

        }
    },
    created(){
        this.loadStatus();
    },
    methods:{
        loadStatus(){
            let _this=this;
             _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OrderStatus'}).then(function(res){
                 console.log(res)
                 _this.column[8].dataSource=res.result;
             },function(err){
                 console.log(err)
             })
             _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CouponType'}).then(function(res){
                 _this.column[1].dataSource=res.result;
             },function(err){
                 console.log(err)
             })
             
        },
        //按钮组点击事件---------------------
        btnClick(btn){
            let _this = this;
            if(btn=="新增"){
                this.$store.state.url='/card/cardDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            }else if(btn=="删除"){
                this.delBatch();
            }else if(btn=="审核"){
               
            }else if(btn=="作废"){
                this.cancelBatch()
            }else if(btn=="导出"){
      
            }
        },
        btnClickRecord(btn){
            let _this = this;
            if(btn=="制券"){
           
            }else if(btn=="导入券号"){
           
            }else if(btn=="导出"){
      
            }           
        },
        //根据卡类型或名称搜索
        doSearch:function(){
            let _this = this;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetAllCouponsByQuery',_this.queryParams).then(function(res){
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.cardListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
            })
            
        },
        query(res){
            let _this=this;
            if(res.index==0){
                _this.queryParams.QueryType='14';
                _this.$store.state.cardListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==1){
                _this.queryParams.QueryType='15';
                _this.$store.state.cardListLoading=true;    
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==2){
                _this.queryParams.QueryType='16';
                _this.$store.state.cardListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==3){
                _this.queryParams.QueryType='18';
                _this.$store.state.cardListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==4){
                _this.queryParams.QueryType='17';
                _this.$store.state.cardListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
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
        cancelCoupon:function(id){//卡券作废
            let _this=this;
            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/CancelCouponByIds',id).then(function(res){
                _this.$store.dispatch('InitTable');
                _this.open('作废成功','el-icon-circle-check','successERP');    

            },function(err){
                console.log(err)
            })  
        },
        tableFunction(data){
            let _this=this;
            console.log(data)
            if(data.button=='查看发放记录'){
                _this.dialogRecord=true;
                _this.queryParamsRecord.CouponId=data.row.id;
                _this.queryParamsRecord.SkipCount=(_this.rePage-1)*_this.reOneItem;
                _this.queryParamsRecord.MaxResultCount=_this.reOneItem;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Get_CouponReceive_Record',_this.queryParamsRecord).then(function(res){
                    _this.cardRecordTableData=res.result.items;
                    _this.reTotalItem=res.result.totalCount;
                    _this.reTotalPage=res.result.totalCount%_this.reOneItem==0?(res.result.totalCount%_this.reOneItem):Math.ceil(res.result.totalCount%_this.reOneItem);
                    _this.tableLoading=false;
                },function(res){
                    console.log('err'+res)
                })


            }else if(data.button=='作废'){
                _this.dialogSetting.dialogName='cancelOneDialog'
                _this.dialogSetting.message="确定作废？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;

                _this.CancelCouponById.id.push(data.row.id)
               
            }
        },
        reHandleCurrentChange(val){//发放记录表格分页
            let _this=this;
            _this.queryParamsRecord.SkipCount=(val-1)*_this.reOneItem;
            _this.queryParamsRecord.MaxResultCount=_this.reOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Get_CouponReceive_Record',_this.queryParamsCoupon).then(function(res){
                _this.cardRecordTableData=res.result.items;
                _this.reTotalItem=res.result.totalCount;
                _this.reTotalPage=res.result.totalCount%_this.reOneItem==0?(res.result.totalCount%_this.reOneItem):Math.ceil(res.result.totalCount%_this.reOneItem);
            },function(res){
                console.log('err'+res)
            })
        },
        handleSelectionChange(cards){//发放记录表格多选
            console.log(cards)
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
        cancelBatch(){
            this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
            if(this.SelectionChange.length==0){
                this.$message({
                    type: 'info',
                    message: '请勾选需要作废的记录！'
                });
            }else{
                this.dialogSetting.dialogName='cancelDialog'
                this.dialogSetting.message="确定作废？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
            }              
        },

        //弹框----------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    let _this=this;
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    for(var i in _this.SelectionChange){
                        _this.idArray.ids.push(_this.SelectionChange[i].id)
                    }
                    console.log(_this.idArray)
                    if(_this.idArray.ids.length>0){
                        _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/BatchDelete',_this.idArray).then(function(res){
                            _this.$store.dispatch('InitTable');
                            _this.$store.commit('setTableSelection',[])
                            _this.idArray.ids=[];
                            _this.dialogVisible=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');    
                        },function(res){
                            console.log(res)
                        })
                    }
                }else if(parmas.dialogName=="cancelDialog"){//作废勾选多选
                    let _this=this;
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    for(var i in _this.SelectionChange){
                        _this.CancelCouponByIds.id.push(_this.SelectionChange[i].id)
                    }
                    console.log(this.SelectionChange,)
                    _this.cancelCoupon(_this.CancelCouponByIds);  
                    _this.dialogVisible=false;                
                }else if(parmas.dialogName=="cancelOneDialog"){//单行操作栏作废
                    let _this=this;
                    _this.cancelCoupon(_this.CancelCouponById);
                    _this.dialogVisible=false;            
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


    },
    components:{
        Table,
        dialogBox,
        buttonGroup
    }
    
}
</script>

<style>
.card-list.el-dialog__body{
    padding: 10px 20px;
}
.card-list .el-dialog__body{
    overflow: auto;
}

</style>
