<template>
    <div class="card-send">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <el-tabs v-model="activeName" class="tabZoo" @tab-click='query'>
                <el-tab-pane label="全部卡券" name="allCards" class="getPadding" style="z-index:-100">
                    <el-table :data="tableDataCard" border style="width: 100%" v-loading="tableLoading" class="normalTable"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" label="" width="50"></el-table-column>
                        <el-table-column label="名称" >
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="btnView(scope.row)">{{scope.row.taskName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="生效时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="状态"> </el-table-column>
                        <el-table-column prop="numberofDistribution" label="发放数量"> </el-table-column>
                        <el-table-column prop="numberofWriteoffs" label="核销数量"> </el-table-column>
                        <el-table-column prop="writeoffRate" label="核销率"> </el-table-column>
                        <el-table-column label="操作" width="260"> 
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" class="blue" @click="btnView(scope.row)">查看</el-button>
                                <el-button  type="text" size="small" class="blue">编辑</el-button>
                                <el-button  type="text" size="small" class="blue" @click="btnDel(scope.row)">删除</el-button>
                                <el-button  type="text" size="small" class="blue" @click="cancelCard(scope.row)">作废</el-button>
                                <el-button  type="text" size="small" class="blue">预计发放统计</el-button>
                                <el-button  type="text" size="small" class="blue">投放明细</el-button>
                            </template>                            
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="cardHandleCurrentChange"
                                    :current-page="cardPageIndex"
                                    :page-size="cardOneItem"
                                    :total="cardTotalItem"></el-pagination>                
                </el-tab-pane>
                <el-tab-pane label="未审核" name="unaudited" class="getPadding" style="z-index:-100">
                    <el-table :data="tableDataCard" border style="width: 100%" class="normalTable" v-loading="tableLoading"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" label="" width="50"></el-table-column>
                        <el-table-column label="名称"> 
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="btnView(scope.row)">{{scope.row.taskName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="生效时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="状态"> </el-table-column>
                        <el-table-column prop="numberofDistribution" label="发放数量"> </el-table-column>
                        <el-table-column prop="numberofWriteoffs" label="核销数量"> </el-table-column>
                        <el-table-column prop="writeoffRate" label="核销率"> </el-table-column>
                        <el-table-column label="操作" width="260"> 
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" class="blue" @click="btnView(scope.row)">查看</el-button>
                                <el-button  type="text" size="small" class="blue">编辑</el-button>
                                <el-button  type="text" size="small" class="blue" @click="btnDel(scope.row)">删除</el-button>
                                <el-button  type="text" size="small" class="blue" @click="cancelCard(scope.row)">作废</el-button>
                                <el-button  type="text" size="small" class="blue">预计发放统计</el-button>
                                <el-button  type="text" size="small" class="blue">投放明细</el-button>
                            </template>                            
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="cardHandleCurrentChange"
                                    :current-page="cardPageIndex"
                                    :page-size="cardOneItem"
                                    :total="cardTotalItem"></el-pagination>      

                </el-tab-pane>
                <el-tab-pane label="未开始" name="noBegin" class="getPadding" style="z-index:-100">
                    <el-table :data="tableDataCard" border style="width: 100%" class="normalTable" v-loading="tableLoading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" label="" width="50"></el-table-column>
                        <el-table-column label="名称">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="btnView(scope.row)">{{scope.row.taskName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="生效时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="状态"> </el-table-column>
                        <el-table-column prop="numberofDistribution" label="发放数量"> </el-table-column>
                        <el-table-column prop="numberofWriteoffs" label="核销数量"> </el-table-column>
                        <el-table-column prop="writeoffRate" label="核销率"> </el-table-column>
                        <el-table-column label="操作" width="260"> 
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" class="blue" @click="btnView(scope.row)">查看</el-button>
                                <el-button  type="text" size="small" class="blue">编辑</el-button>
                                <el-button  type="text" size="small" class="blue" @click="btnDel(scope.row)">删除</el-button>
                                <el-button  type="text" size="small" class="blue" @click="cancelCard(scope.row)">作废</el-button>
                                <el-button  type="text" size="small" class="blue">预计发放统计</el-button>
                                <el-button  type="text" size="small" class="blue">投放明细</el-button>
                            </template>                            
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="cardHandleCurrentChange"
                                    :current-page="cardPageIndex"
                                    :page-size="cardOneItem"
                                    :total="cardTotalItem"></el-pagination>      

                </el-tab-pane>
                <el-tab-pane label="进行中" name="doing" class="getPadding" style="z-index:-100">
                    <el-table :data="tableDataCard" border style="width: 100%" class="normalTable" v-loading="tableLoading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" label="" width="50"></el-table-column>
                        <el-table-column label="名称">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="btnView(scope.row)">{{scope.row.taskName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="生效时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="状态"> </el-table-column>
                        <el-table-column prop="numberofDistribution" label="发放数量"> </el-table-column>
                        <el-table-column prop="numberofWriteoffs" label="核销数量"> </el-table-column>
                        <el-table-column prop="writeoffRate" label="核销率"> </el-table-column>
                        <el-table-column label="操作" width="260"> 
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" class="blue" @click="btnView(scope.row)">查看</el-button>
                                <el-button  type="text" size="small" class="blue">编辑</el-button>
                                <el-button  type="text" size="small" class="blue" @click="btnDel(scope.row)">删除</el-button>
                                <el-button  type="text" size="small" class="blue" @click="cancelCard(scope.row)">作废</el-button>
                                <el-button  type="text" size="small" class="blue">预计发放统计</el-button>
                                <el-button  type="text" size="small" class="blue">投放明细</el-button>
                            </template>                            
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="cardHandleCurrentChange"
                                    :current-page="cardPageIndex"
                                    :page-size="cardOneItem"
                                    :total="cardTotalItem"></el-pagination>      

                </el-tab-pane>
                <el-tab-pane label="已失效" name="outDate" class="getPadding" style="z-index:-100">
                    <el-table :data="tableDataCard" border style="width: 100%"  class="normalTable" v-loading="tableLoading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" label="" width="50"></el-table-column>
                        <el-table-column label="名称"> 
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="btnView(scope.row)">{{scope.row.taskName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="生效时间"> </el-table-column>
                        <el-table-column prop="statusTValue" label="状态"> </el-table-column>
                        <el-table-column prop="numberofDistribution" label="发放数量"> </el-table-column>
                        <el-table-column prop="numberofWriteoffs" label="核销数量"> </el-table-column>
                        <el-table-column prop="writeoffRate" label="核销率"> </el-table-column>
                        <el-table-column label="操作" width="260"> 
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" class="blue" @click="btnView(scope.row)">查看</el-button>
                                <el-button  type="text" size="small" class="blue">编辑</el-button>
                                <el-button  type="text" size="small" class="blue" @click="btnDel(scope.row)">删除</el-button>
                                <el-button  type="text" size="small" class="blue" @click="cancelCard(scope.row)">作废</el-button>
                                <el-button  type="text" size="small" class="blue">预计发放统计</el-button>
                                <el-button  type="text" size="small" class="blue">投放明细</el-button>
                            </template>                            
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;"
                                    class="text-right"
                                    background layout="total,prev, pager, next,jumper"
                                    @current-change="cardHandleCurrentChange"
                                    :current-page="cardPageIndex"
                                    :page-size="cardOneItem"
                                    :total="cardTotalItem"></el-pagination>      

                </el-tab-pane>

            </el-tabs>
        </el-row>
        <!-- 发放记录弹框 -->

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
    name:'cardSendList',
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
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
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
        //卡券发送表格
        tableLoading:true,
        cardPageIndex:1,//分页的当前页码
        cardTotalPage:0,//当前分页总数
        cardOneItem:10,//每页有多少条信息
        cardPage:1,//当前页
        cardTotalItem:0,//总共有多少条消息
        tableDataCard:[],
        queryParamsCardSend:{
            QueryType:'',//状态
            SkipCount:'',
            MaxResultCount:'',
        },
        multipleSelection:[],//多选
        indexTab:'',
        idArray:{
        "id": []
        },//删除的ID
        CancelCardById:{//操作栏作废
            "id":[]
        },
        indexId:'',//行删除Id

        }
    },
    created(){
        this.loadCardSendList("14");
    },
    methods:{
        loadCardSendList(type){
            let _this=this;
             _this.tableLoading=true;
            _this.queryParamsCardSend.QueryType=type;
            _this.queryParamsCardSend.SkipCount=(_this.cardPage-1)*_this.cardOneItem;
            _this.queryParamsCardSend.MaxResultCount=_this.cardOneItem;
             _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetIssueDetailedByQuerytype',_this.queryParamsCardSend).then(function(res){
               if(res.result){
                    _this.tableDataCard=res.result.items;
                    _this.cardTotalItem=res.result.totalCount;
                    _this.cardTotalPage=res.result.totalCount%_this.cardOneItem==0?(res.result.totalCount%_this.cardOneItem):Math.ceil(res.result.totalCount%_this.cardOneItem);
               }else{
                   _this.tableDataCard=res.result;  
               }
               _this.tableLoading=false;
                console.log(_this.tableDataCard)
                 
             },function(err){
                 console.log(err)
             })

             
        },
        //按钮组点击事件---------------------
        btnClick(btn){
            let _this = this;
            if(btn=="新增"){
                this.$store.state.url='/cardSend/cardSendDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            }else if(btn=="删除"){
                this.delBatch();
            }else if(btn=="审核"){
               
            }else if(btn=="导出"){
      
            }
        },
        query(res){
            let _this=this;
            if(res.index==0){
                 _this.loadCardSendList("14");
                 _this.indexTab=0;
            }else if(res.index==1){
                 _this.loadCardSendList("15");
                 _this.indexTab=1;
            }else if(res.index==2){
                 _this.loadCardSendList("16");
                 _this.indexTab=2;
            }else if(res.index==3){
                 _this.loadCardSendList("18");
                 _this.indexTab=3;
            }else if(res.index==4){
                 _this.loadCardSendList("17");
                 _this.indexTab=4;
            }
        },
        cardHandleCurrentChange(val){
            let _this = this;
            if(_this.indexTab==0){
                _this.queryParamsCardSend.QueryType='14';
            }else if(_this.indexTab==1){
                _this.queryParamsCardSend.QueryType='15';
            }else if(_this.indexTab==2){
                _this.queryParamsCardSend.QueryType='16';
            }else if(_this.indexTab==3){
                _this.queryParamsCardSend.QueryType='18';
            }else if(_this.indexTab==4){
                _this.queryParamsCardSend.QueryType='17';
            }
            _this.queryParamsCardSend.SkipCount=(val-1)*_this.cardOneItem;
            _this.queryParamsCardSend.MaxResultCount=_this.cardOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetIssueDetailedByQuerytype',_this.queryParamsCardSend).then(function(res){
                _this.tableDataCard=res.result.items;
                _this.cardTotalItem=res.result.totalCount;
                _this.cardTotalPage=res.result.totalCount%_this.cardOneItem==0?(res.result.totalCount%_this.cardOneItem):Math.ceil(res.result.totalCount%_this.cardOneItem);
            },function(res){
                console.log('err'+res)
            })
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
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        btnView(row){
            this.$store.state.url="/cardSend/cardSendModify/"+row.id
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        btnDel(row){//行删除
        //console.log(row)
            this.indexId=row.id;
            this.dialogSetting.dialogName='delOneDialog'
            this.dialogSetting.message="确定删除？";
            this.dialogSetting.dialogType="confirm";
            this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            this.dialogVisible=true;
        },
        cancelCard(row){//行作废
            this.dialogSetting.dialogName='cancelOneDialog'
            this.dialogSetting.message="确定删除？";
            this.dialogSetting.dialogType="confirm";
            this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            this.dialogVisible=true; 
        },


        //批量删除------------------------------------
        delBatch(){
    
            if(this.multipleSelection.length==0){
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


        //弹框----------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    let _this=this;
                    for(var i in _this.multipleSelection){
                        _this.idArray.id.push(_this.multipleSelection[i].id)
                    }
                    if(_this.idArray.id.length>0){
                        _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/BatchDelete',_this.idArray).then(function(res){
                            _this.idArray.id=[];
                            _this.dialogVisible=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');    
                        },function(err){
                            _this.$message({
                            type: "warning",
                            message: err.error.message
                            });    
                            _this.dialogVisible=false; 
                        })
                    }
                }else if(parmas.dialogName=="delOneDialog"){//行内删除
                    let _this=this;
                    _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/DeleteIssue',{ Id:_this.indexId }).then(function(res){
                        _this.open("删除成功", "el-icon-circle-check", "successERP");
                        if(_this.indexTab==0){
                            _this.loadCardSendList("14");
                        }else if(_this.indexTab==1){
                            _this.loadCardSendList("15");
                        }else if(_this.indexTab==2){
                            _this.loadCardSendList("16");
                        }else if(_this.indexTab==3){
                            _this.loadCardSendList("18");
                        }else if(_this.indexTab==4){
                            _this.loadCardSendList("17");
                        }
                        _this.dialogVisible=false; 
                    },function(err){
                        _this.$message({
                        type: "warning",
                        message: err.error.message
                        });      
                        _this.dialogVisible=false;       
                    })                
                }else if(parmas.dialogName=="cancelOneDialog"){//行内作废
                    let _this=this;
                    _this.CancelCardById.id.push(row.id);
                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/BatchAbolishIssue',_this.CancelCardById).then(function(res){
                        _this.CancelCardById.id=[];
                        _this.open('作废成功','el-icon-circle-check','successERP');    
                    },function(err){
                        _this.$message({
                        type: "warning",
                        message: err.error.message
                        });      
                        _this.dialogVisible=false;       
                    })                
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

