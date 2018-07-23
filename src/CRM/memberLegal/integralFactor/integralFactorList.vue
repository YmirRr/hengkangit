
<template>
    <div class="integral-factor commodity member-list">
            <el-col class="leftBox" v-show="ifWidth">
                <el-row class="h48 pl10 br1 bb1">
                    <el-col :span="18" class="btn-for-search">
                        <img src="../../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4" class="mt10">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">活动代码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.TacticCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">活动名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.TacticName"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">渠道</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select  v-model="queryParams.ChannelId" filterable :filter-method="filterShopMethod" clearable>
                            <el-option
                            v-for="item in shopFilter"
                            :key="item.id"
                            :label="item.shopName"
                            :value="item.id">
                            <span style="float: left">{{ item.channelName }}</span>
                            <span style="float: right;">{{ item.channelCode }}</span>
                            </el-option>
                        </el-select>
                    </el-col>

                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">活动类型</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select  v-model="queryParams.ApplyTypeid">
                            <el-option
                            v-for="item in ApplyAr"
                            :key="item.id"
                            :label="item.itemName"
                            :value="item.id">
                            </el-option>
                        </el-select>

                    </el-col>

                </el-row>
                <el-row class="mt10 bgcolor smallBgcolor">
                    <el-col :span="8">
                        <label class="input-label">变动时间</label>
                    </el-col>
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                        <el-date-picker  v-model="chooseDate"
                        type="daterange"
                        range-separator="至">
                        </el-date-picker>
                    </el-col> 

                </el-row>
  

                <el-row class="mt30 tc">
                    <div class="bgcolor smallBgcolor">
                        <span class="search-btn" @click="doSearch">查询</span>
                    </div>
                </el-row>
            </el-col>
            <el-col class="border-left" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span='2' class="search-block br1"  v-show="!ifWidth">
                        <div @click="openLeft" class="h48">
                            <img src="../../../../static/image/common/search_btn.png">
                            <span class="fs18">查询</span>
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                        
                    </el-col>

                    <el-col :span='ifWidth?24:22' class="h48">

                        <el-col :span="15">
                            <span class="position">
                                <button class="erp_bt bt_add" @click="ifshow=!ifshow">
                                    <div class="btImg">
                                        <img src="../../../../static/image/common/bt_add.png">
                                    </div>
                                    <span class="btDetail">新增</span>
                                </button>
                                <ul class="other-content" v-show="ifshow">
                                    <li @click="goBirth">会员生日</li>
                                    <li @click="goMember">会员日</li>
                                    <li @click="goDay">节假日</li>
                                    <li @click="goCommodity">特殊商品</li>
                                </ul>
                            </span>
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                        </el-col>
                        <el-col :span="9" class="pt5">
                            <div class="search-input-member">
                                <div class="search-wapper">
                                    <input type="text" placeholder="活动代码\名称"  @keyup="doSearch" v-model="queryParams.Info"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
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
                    </el-col>
                    
                    
                </el-row>

                <el-row class="pb10">
                    <el-col :span="24">
                        <el-tabs v-model="activeName" class="tabZoo" @tab-click='query'>
                            <el-tab-pane label="全部活动" name="allAc" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="未开始" name="unaudited" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="进行中" name="noBegin" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="已结束" name="doing" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="已停用" name="outDate" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>

                        </el-tabs>

                    </el-col>
                </el-row>

            </el-col>
        <!-- dialog -->  
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>        
    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Table from '../../../base/Table/Table'
import dialogBox from '../../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../../common/common.js'
import config from '../../../../static/config'
export default {
    name:'integralFactorList',
    components:{
        buttonGroup,
        dialogBox,
        Table
    },
    watch:{
        ifWidth:function(val,oldval){
            console.log(val,oldval)
        },
        chooseDate:function(val,oldval){
            let _this=this;
            _this.queryParams.EffectiveStart=val[0];
            _this.queryParams.EffectiveEnd=val[1];
        },
    },
    data(){
        return{
            valueDate:'',
            ifshow:false,
            //按钮组
            buttonGroup:[{
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
                text:'反审核',
                class:'bt_saveAdd',
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
            //表格
            column: [{
                prop: 'tacticCode',
                label: '活动代码',
                controls:'button',
                flag:true,//更改标识
                isDisable:true,
                }, {
                prop: 'tacticName',
                label: '活动名称',
                controls:'button',
                isDisable:true,
                }, {
                prop: 'effectiveStart',
                label: '开始日期',
                controls:'datetime',
                isDisable:true,
                }, {
                prop: 'effectiveEnd',
                label: '结束日期',
                controls:'datetime',
                isDisable:true,
                }, {
                prop: 'tacticTypeidTValue',
                label: '活动类型',
                controls:'text',
                isDisable:true,
                }, {
                prop: 'statusTValue',
                label: '活动状态',
                controls:'text',
                isDisable:true,
                }],
            tableModel:'integralFactorList',
            httpUrl:{
                view:{//多详情页面的跳转
                    routes:[{routeName:'会员生日',routeUrl:'/integralFactor/integralBirthModify/'},
                            {routeName:'会员日',routeUrl:'/integralFactor/integralMemberModify/'},
                            {routeName:'节假日',routeUrl:'/integralFactor/integralHolidayModify/'},
                            {routeName:'特殊商品',routeUrl:'/integralFactor/integralCommodityModify/'}],//需要跳转的路由数组
                    key:'tacticTypeidTValue'//判断字段
                },
                delete:config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/Delete',//行内删除
                query:config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/GetListByCondition',
            },
            queryParams:{
                Info:'',//编码或名称
                TacticCode:'',//编码
                TacticName:'',//名称
                ChannelId:'',//渠道
                ApplyTypeid:'',//类型
                EffectiveStart:'',//时间开始
                EffectiveEnd:'',//时间结束
                Status:'14',
                SkipCount:(this.$store.state.integralFactorListCurrentPage-1)*this.$store.state.integralFactorListEachPage,
                MaxResultCount:this.$store.state.integralFactorListEachPage
            },
            chooseDate:[],
            command:[{
                text:'查看',
                class:'blue'
            },{
                text:'删除',
                class:'blue'
            }],
            pluginSetting:{
                hasPagination:true,
                mutiSelect:true,//多选栏
                isDisable:true,
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
            ifWidth:false,
            ifOpen:false,
            activeName:'allAc',
            idArray:{
                ids:[]
            },
            ApplyAr:[],//活动类型
            ids:{//多选操作栏勾选 作废
                "id":[]
            },
            filterShopKey:'',//店铺过滤输入条件
            channelAr:[],//店铺数据
            defaultGroupId:'',//默认groupId
            defaultOuId:'',//默认ouid


        }
    },
    created(){
        this.loadData();
    },
    computed:{
     shopFilter: function () {//下拉数据自定义搜索过滤 店铺
     console.log(FILTER_MOTHED(this.filterShopKey,this.channelAr))
          return FILTER_MOTHED(this.filterShopKey,this.channelAr)
      },
    },
    methods:{
        filterShopMethod(query){
            this.filterShopKey=query
        },
        loadData(){
            let _this=this;
            //获取店铺
            _this.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{GroupID:_this.defaultGroupId,OuID:_this.defaultOuId,ChannelType:'1'}).then(function(res){
                console.log(res)
                _this.channelAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'IntegralTacticType'}).then(function(res){
                console.log(res)
                _this.ApplyAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //获取groupId
            _this.$axios.gets('/api/services/app/GroupManagement/Get').then(function(res){
                // console.log(res)
                _this.defaultGroupId = res.result.id;
            },function(res){
                console.log('err'+res)
            });
            //获取ouId
            _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(res)
                _this.defaultOuId = res.result.id;
            },function(res){
                console.log('err'+res)
            });
        },
        btnClick(btn){//按钮组点击事件
            if(btn=="删除"){
                this.dialogSetting.dialogName='delDialog'
                this.dialogSetting.message="确定删除？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
                
            }else if(btn=="作废"){
                this.cancelBatch();
            }
        },   
        goBirth(){
            this.$store.state.url='/integralFactor/integralFactorBirth/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goMember(){
            this.$store.state.url='/integralFactor/integralFactorMember/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDay(){
            this.$store.state.url='/integralFactor/integralFactorHoliday/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goCommodity(){
            this.$store.state.url='/integralFactor/integralFactorCommodity/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
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
        cancelCoupon:function(id){//多倍积分作废
            let _this=this;
            console.log(id)
            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/Cancel',id).then(function(res){
                _this.$store.dispatch('InitTable');
                _this.open('作废成功','el-icon-circle-check','successERP');    
            },function(err){
                console.log(err)
            })  
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
        doSearch:function(){//根据条件查找仓库信息
            let _this = this;
            console.log(_this.queryParams)
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/GetListByCondition',_this.queryParams).then(function(res){
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.repositoryListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
            })
            
        },
        query(res){
            let _this=this;
            if(res.index==0){
                _this.queryParams.Status='14';
                _this.$store.state.integralFactorListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==1){
                _this.queryParams.Status='15';
                _this.$store.state.integralFactorListLoading=true;    
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==2){
                _this.queryParams.Status='16';
                _this.$store.state.integralFactorListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==3){
                _this.queryParams.Status='18';
                _this.$store.state.integralFactorListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==4){
                _this.queryParams.Status='17';
                _this.$store.state.integralFactorListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
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
                        _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/BatchDelete',_this.idArray).then(function(res){
                            _this.$store.dispatch('InitTable');
                            _this.$store.commit('setTableSelection',[])
                            _this.idArray.ids=[];
                            _this.dialogVisible=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');    
                        })
                    }
                }else if(parmas.dialogName=="saveDialog"){//保存提交对话框
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){//作废
                    let _this=this;
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    for(var i in _this.SelectionChange){
                        _this.ids.id.push(_this.SelectionChange[i].id)
                    }
                    _this.cancelCoupon(_this.ids);  
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
    }
}
</script>
<style scoped>
.br1{
    border-right: 1px solid #E4E4E4;
}
.bb1{
    border-bottom: 1px solid #E4E4E4;
}
.integral-factor .leftBox{
    width: 290px;
}
.integral-factor .rightBox{
    width: calc(100% - 290px);
    min-height: 339px;
}
.integral-factor .newRight{
    width: 100%;
}
.integral-factor .smallRangeDate{
    height: 35px;
}
.integral-factor .smallRangeDate .el-input__inner{
    height: 35px;
}
.integral-factor .rangeDate{
    width: 181.25px;
}
.integral-factor .f14{
    font-size: 14px;
}
.integral-factor .border-left{
    border-left: 1px solid #E4E4E4;
}
.integral-factor .position{
    position: relative;
}
.integral-factor .position .bt_add{
    margin-top: 5px;
}
.integral-factor .position .erp_bt{
    margin-right: 0;
}
/* .integral-factor .position .erp_bt .btDetail{
    padding-left: 15px;
} */
.integral-factor  .other-content{
    width: 68px;
    position: absolute;
    right: 0px;
    top:44px;   
    background-color: white;
    z-index: 100;
}
.integral-factor .other-content li{
    width: 68px;
    display: inline-block;
    text-align: center;
    line-height: 38px;
    height: 38px;
    color: white;
    background-color: #3cc;
    font-size: 14px;
    margin-bottom: 2px;
    cursor: pointer;
}
.integral-factor .other-content li:hover{
    background-color: #169bd5;
}


</style>
<style>
.integral-factor .smallRangeDate .el-range-separator{
    line-height: 35px;
}
</style>