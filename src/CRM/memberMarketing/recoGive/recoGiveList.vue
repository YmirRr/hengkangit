
<template>
    <div class="reco-give commodity">
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
                        <label class="input-label">活动代码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ActivityNo"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">活动名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" placeholder="" v-model="queryParams.ActivityName"></el-input>
                    </el-col>
                </el-row>

                <el-row class="mt10 bgcolor smallBgcolor">
                    <el-col :span="8">
                        <label class="input-label">变动时间</label>
                    </el-col>
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                        <el-date-picker v-model="chooseDate"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"></el-date-picker>
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
                        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                        <!-- <div class="search_input_group inline-block-need">
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
                        </div> -->
                    </el-col>
                    
                    
                </el-row>

                <el-row class="pb10">
                    <el-col :span="24">
                        <el-tabs v-model="activeName" class="tabZoo" @tab-click='query'>
                            <el-tab-pane label="全部活动" name="allAc" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="未审核" name="unaudited" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="未开始" name="noBegin" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="进行中" name="doing" class="getPadding" style="z-index:-100">
                                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :command="command" :cols="column" :tableName="tableModel" ></Table>
                            </el-tab-pane>
                            <el-tab-pane label="已失效" name="outDate" class="getPadding" style="z-index:-100">
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
export default {
    name:'recoGiveList',
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
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            }],
            //表格
            column: [{
                prop: 'activityNo',
                label: '活动代码',
                controls:'button',
                flag:true,//更改标识
                isDisable:true,
                }, {
                prop: 'activityName',
                label: '活动名称',
                controls:'text',
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
                prop: 'statusName',
                label: '活动状态',
                controls:'text',
                isDisable:true,
                }],
            tableModel:'recoGiveList',
            httpUrl:{
                view:'/recoGive/recoGiveModify/',
                delete:'http://192.168.100.107:8092/api/services/app/ActivityManagement/Delete',
                query:'http://192.168.100.107:8092/api/services/app/ActivityManagement/GetActivitys',
            },
            queryParams:{
                ActivityTypeid:5,//活动类型
                ActivityNo:'',//活动编码
                ActivityName:'',//活动名称
                Status:'',
                EffectiveStart:'',
                EffectiveEnd:'',
                SkipCount:(this.$store.state.recoGiveListCurrentPage-1)*this.$store.state.recoGiveListEachPage,
                MaxResultCount:this.$store.state.recoGiveListEachPage
            },
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
            chooseDate:[],
            idArray:{
                ids:[]
            },


        }
    },
    methods:{
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="新增"){
                self.goDetail();
            };
            if(btn=="删除"){
                self.dialogSetting.dialogName='delDialog'
                self.dialogSetting.message="确定删除？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
            }
        },  
        goDetail(){//点击新增跳转
            this.$store.state.url='/recoGive/recoGiveDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
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
        doSearch:function(){//根据条件查找信息
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/ActivityManagement/GetActivitys',self.queryParams).then(function(res){
                console.log(res)
                self.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/self.$store.state.recoGiveListEachPage);
                self.$store.commit('Init_pagination',totalPage);
                self.$store.commit('Init_TotalCount',res.result.totalCount);
                self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
            })
            
        },
        query(res){
            let _this=this;
            if(res.index==0){
                _this.queryParams.status='14';
                _this.$store.state.recoGiveListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==1){
                _this.queryParams.status='15';
                _this.$store.state.recoGiveListLoading=true;    
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==2){
                _this.queryParams.status='16';
                _this.$store.state.recoGiveListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==3){
                _this.queryParams.status='18';
                _this.$store.state.recoGiveListLoading=true;
                _this.$store.commit('setQueryParams',_this.queryParams);
                _this.$store.dispatch('InitTable');
            }else if(res.index==4){
                _this.queryParams.status='17';
                _this.$store.state.recoGiveListLoading=true;
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
                        _this.$axios.posts('http://192.168.100.107:8092/api/services/app/ActivityManagement/BatchDelete',_this.idArray).then(function(res){
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
.br1{
    border-right: 1px solid #E4E4E4;
}
.reco-give .leftBox{
    width: 290px;
}
.reco-give .rightBox{
    width: calc(100% - 290px);
    min-height: 339px;
    /* border-left: 1px solid #E4E4E4; */
}
.reco-give .newRight{
    width: 100%;
}
.reco-give .smallRangeDate{
    height: 35px;
}
.reco-give .smallRangeDate .el-input__inner{
    height: 35px;
}
.reco-give .rangeDate{
    width: 181.25px;
}
.reco-give .f14{
    font-size: 14px;
}
.reco-give .border-left{
    border-left: 1px solid #E4E4E4;
}
</style>
<style>
.reco-give .smallRangeDate .el-range-separator{
    line-height: 35px;
}
</style>