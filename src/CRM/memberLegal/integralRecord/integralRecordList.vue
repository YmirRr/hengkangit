
<template>
    <div class="integral-record commodity member-list">
            <el-col class="leftBox" v-show="ifWidth">
                <el-row class="h48 pl10 bb1">
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
                        <label class="input-label">会员卡号</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.CardCode"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">会员姓名</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.MemberName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">手机号码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.Mobile"></el-input>
                    </el-col>
                </el-row>


                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">单号</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.BillNo"></el-input>

                    </el-col>

                </el-row>

                <el-row class="mt10 bgcolor smallBgcolor">
                    <el-col :span="8">
                        <label class="input-label">变动时间</label>
                    </el-col>
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                        <el-date-picker v-model="chooseDate"
                        type="daterange"
                        range-separator="to"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col> 
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label" >来源类型</label>
                    </el-col>
                    <el-col :span="15">
                        <!-- <el-input class="input-entry" v-model="queryParams.OrgType"></el-input> -->
                        <el-select class="input-entry" clearable v-model="queryParams.OrgType">
                            <el-option v-for="item in orgTypeAr" :key="item.id" :label="item.displayName" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">变动类型</label>
                    </el-col>
                    <el-col :span="15">
                        <!-- <el-input class="input-entry" v-model="queryParams.ChangeType"></el-input> -->
                        <el-select class="input-entry" clearable v-model="queryParams.ChangeType">
                            <el-option v-for="item in changeTypeAr" :key="item.itemValue" :label="item.itemName" :value="item.itemValue"></el-option>
                        </el-select>
                    </el-col> 
                </el-row>

                <el-row class="mt10">
                     <el-col :span="8">
                         <label class="input-label">操作员</label>
                     </el-col>
                     <el-col :span="15">
                         <el-select class="input-entry" clearable v-model="queryParams.CreateBy" :filter-method="filterPerMethod" filterable>
                            <el-option
                            v-for="item in perFilter"
                            :key="item.id"
                            :label="item.displayName"
                            :value="item.id">
                            <span style="float: left">{{ item.displayName }}</span>
                            <span style="float: right;">{{ item.userCode }}</span>
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
                            <img src="../../../../static/image/common/search_btn.png">
                            <span class="fs18">查询</span>
                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                        
                    </el-col>

                    <el-col :span='ifWidth?24:22' class="h48">
                        <el-col :span="13">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                        </el-col>
                        <el-col :span="11" class="line-height28 pt5"> 
                            <div class="search-input-member">
                                <div class="search-wapper">
                                    <input type="text" placeholder="会员卡号/姓名/电话号码" v-model="queryParams.QuikInput" @keyup.enter="doSearch"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    <button class="mem-search-btn" @click="doSearch">搜索</button>
                                </div>
                                
                                <div class="search_advance" @click="dialogUserDefined = true">
                                    <button class="userDefined advanced-query">
                                        <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                    </button>
                                </div>
                            </div>
                        </el-col>
                    </el-col>
                    
                    
                </el-row>

                <el-row class="pb10">
                    <el-col :span="24">
                        <Table :methodsUrl="httpUrl" :command="command" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel"></Table>
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
    name:'integralRecordList',
    components:{
        buttonGroup,
        dialogBox,
        Table
    },
    watch:{
        ifWidth:function(val,oldval){
            console.log(val,oldval)
        }
    },
    data(){
        return{
            valueDate:'',
            //按钮组
            buttonGroup:[{
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            }],
            //表格
            column: [{
                prop: 'billNo',
                label: '变动单号',
                controls:'text',
                isDisable:true,
                width:'140px'
                }, {
                prop: 'changeTypeName',
                label: '变动类型',
                controls:'text',
                isDisable:true,
                }, {
                prop: 'cardCode',
                label: '会员卡号',
                controls:'text',
                isDisable:true,
                width:'140px'
                }, {
                prop: 'memberName',
                label: '会员姓名',
                controls:'text',
                isDisable:true,
                width:'120px'
                }, {
                prop: 'mobile',
                label: '手机号码',
                controls:'text',
                isDisable:true,
                width:'140px'
                }, {
                prop: 'integralOrg',
                label: '变动前积分',
                controls:'text',
                width:"100px",
                isDisable:true,
                }, {
                prop: 'integralChg',
                label: '变动积分',
                controls:'text',
                isDisable:true,
                },{
                prop: 'integral',
                label: '变动后积分',
                controls:'text',
                width:"100px",
                isDisable:true,
                },{
                prop: 'channelName',
                label: '变动渠道',
                controls:'text',
                isDisable:true,
                },{
                prop: 'createdTime',
                label: '变动时间',
                controls:'datetime',
                isDisable:true,
                },{
                prop: 'sBillTypeName',
                label: '来源类型',
                controls:'text',
                width:"100px",
                isDisable:true,
                },{
                prop: 'sBillNo',
                label: '来源单号',
                controls:'text',
                width:'200px',
                isDisable:true,
                },{
                prop: 'createBy',
                label: '操作员',
                controls:'text',
                isDisable:true,
                },{
                prop: 'remark',
                label: '备注',
                controls:'text',
                isDisable:true,
                }],
            tableModel:'integralRecordList',
            httpUrl:{
                query:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberIntegralAdjManagerment/GetALLIntegralDayb',//条件查询
            },
            queryParams:{
                CardCode:'',//会员卡号
                MemberName:'',//会员姓名
                Mobile:'',//会员手机
                BillNo:'',//单号
                ChannelId:'',//变动渠道
                ChangeType:'',//变动类型
                OrgType:'',//来源类型
                ChangeTimeBegin:'',//变动时间开始
                ChangeTimeEnd:'',//变动时间结束
                QuikInput:'',//快捷查询
                SkipCount:(this.$store.state.cardListCurrentPage-1)*this.$store.state.cardListEachPage,
                MaxResultCount:this.$store.state.cardListEachPage
            },
            command:[],
            pluginSetting:{
                hasPagination:true,
                mutiSelect:false,//多选栏
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
            chooseDate:[],
            personAr:[],
            orgTypeAr:[
                {displayName:"增加",id:"1"},
                {displayName:"减少",id:"2"}
            ],
            changeTypeAr:[],
            filterPerKey:'',


        }
    },
    created() {
        this.loadRechargeBillType();
        this.getChangeType();
    },
    computed:{
        perFilter: function () {//下拉数据自定义搜索过滤 服务人员
          return FILTER_MOTHED(this.filterPerKey,this.personAr)
        },
    },
    methods:{
        filterPerMethod(query){
            this.filterPerKey=query
        },
        getChangeType(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'IntegralApplyType'}).then(function(res){
                console.log(res)
                _this.changeTypeAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
        btnClick(btn){//按钮组点击事件
            if(btn=="新增用户群"){
               this.$store.state.url='/memberGroup/memberGroupDetail/default'
               this.$router.push({path:this.$store.state.url})//点击切换路由     
            } 
        },   
         loadRechargeBillType(){//加载操作人员
              let _this=this;
            _this.$axios.gets("/api/services/app/User/GetAll",{SkipCount:0,MaxResultCount:10000}).then(res => {
                console.log(res.result.items)
                _this.personAr=res.result.items;
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
            let self = this;
                self.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberIntegralAdjManagerment/GetALLIntegralDayb',self.queryParams).then(function(res){
                    self.$store.commit('Init_Table',res.result.items);
                    let totalPage=Math.ceil(res.result.totalCount/self.$store.state.repositoryListEachPage);
                    self.$store.commit('Init_pagination',totalPage);
                    self.$store.commit('Init_TotalCount',res.result.totalCount);
                    self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })
            
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
    }
}
</script>
<style scoped>
.bb1{
    border-bottom: 1px solid #E4E4E4;
}
.integral-record .leftBox{
    width: 290px;
}
.integral-record .rightBox{
    width: calc(100% - 290px)
}
.integral-record .newRight{
    width: 100%;
}
.integral-record .smallRangeDate{
    height: 35px;
}
.integral-record .smallRangeDate .el-input__inner{
    height: 35px;
}
.integral-record .rangeDate{
    width: 181.25px;
}
.integral-record .f14{
    font-size: 14px;
}
.integral-record .border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 464px;
}
</style>
<style>
.integral-record .smallRangeDate .el-range-separator{
    line-height: 35px;
}
</style>


