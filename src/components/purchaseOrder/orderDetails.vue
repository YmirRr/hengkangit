<template>
    <div class="orderDetail">
        <el-row class="fixed">
            <el-col :span="24">
                <button @click="back" class="erp_bt bt_back"><div class="btImg"><img src="../../../static/image/common/bt_back.png"></div><span class="btDetail">返回</span></button>
                <button class="erp_bt bt_add"><div class="btImg"><img src="../../../static/image/common/bt_add.png"></div><span class="btDetail">新增</span></button>
                <button class="erp_bt bt_save"><div class="btImg"><img src="../../../static/image/common/bt_save.png"></div><span class="btDetail">保存</span></button>
                <button class="erp_bt bt_saveAdd"><div class="btImg"><img src="../../../static/image/common/bt_saveAdd.png"></div><span class="btDetail">保存并新增</span></button>
                <button class="erp_bt bt_print"><div class="btImg"><img src="../../../static/image/common/bt_print.png"></div><span class="btDetail">删行</span></button>
                <button class="erp_bt bt_look bt_width">
                    <div class="btImg"><img src="../../../static/image/common/bt_look.png"></div>
                    <span class="btDetail">审核</span>
                    <div class="btRightImg"><img src="../../../static/image/common/bt_down_right.png"></div>
                </button>
                <button class="erp_bt bt_auxiliary bt_width">
                    <div class="btImg"><img src="../../../static/image/common/bt_auxiliary.png"></div>
                    <span class="btDetail">辅助功能</span>
                    <div class="btRightImg"><img src="../../../static/image/common/bt_down_right.png"></div>
                </button>
                 <div class="sealWapper">
                    <div class="seal">
                        <div class="seal1">
                            <div class="seal2">
                                <div class="seal3">
                                    <span>未送审</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="sealWapper">
                    <div class="seal">
                        <div class="seal1">
                            <div class="seal2">
                                <div class="seal3">
                                    <span>已送审</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="sealWapper">
                    <div class="seal">
                        <div class="seal1">
                            <div class="seal2">
                                <div class="seal3">
                                    <span>已审核</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="sealWapper">
                    <div class="seal">
                        <div class="seal1">
                            <div class="seal2">
                                <div class="seal3">
                                    <span>已作废</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sealWapper">
                    <div class="seal">
                        <div class="seal1">
                            <div class="seal2">
                                <div class="seal3">
                                    <span>已终止</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
                <div class="step_wraper">
                    <span @mouseenter="show = !show" @mouseleave="show = !show" class="upBt">审核日记<i class="el-icon-arrow-down"></i></span>
                    <diV class="triangle" :class="{activeShow : show}"></diV>
                    <div class="detailStep" :class="{activeShow : show}">
                        <div class="ARow">
                            <div class="one messageStep">
                                <div class="leftD">
                                    <p class="tittle">完成</p>
                                    <p class="detail"> </p>
                                </div>
                                <div class="circle"></div>
                                <div class="rightD">
                                    <p class="tittle">09</p>
                                    <p class="detail">2018/01&nbsp;&nbsp;&nbsp;10:05:36</p>
                                </div>
                            </div>
                            <div class="two messageStep">
                                <div class="leftD"></div>
                                <div class="circle"></div>
                                <div class="rightD">
                                    <p class="tittle">提交申请</p>
                                    <p class="detail">填写表单申请</p>
                                </div>
                            </div>
                        </div>

                        <div class="ARow">
                            <div class="one messageStep">
                            <div class="leftD">
                                <p class="tittle">第二审核</p>
                                <p class="detail">审核内容</p>
                            </div>
                            <div class="circle"></div>
                            <div class="rightD">
                                <p class="tittle">08</p>
                                <p class="detail">2018/01&nbsp;&nbsp;&nbsp;12:05:36</p>
                            </div>
                            </div>
                            <div class="two active messageStep">
                                <div class="leftD"></div>
                                <div class="circle"></div>
                                <div class="rightD">
                                    <p class="tittle">正在审批中</p>
                                    <p class="detail"></p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ARow">
                            <div class="one messageStep">
                            <div class="leftD">
                                <p class="tittle">第二审核</p>
                                <p class="detail">审核内容</p>
                            </div>
                            <div class="circle"></div>
                            <div class="rightD">
                                <p class="tittle">07</p>
                                <p class="detail">2018/01&nbsp;&nbsp;&nbsp;12:05:36</p>
                            </div>
                            </div>
                            <div class="two messageStep">
                                <div class="leftD"></div>
                                <div class="circle"></div>
                                <div class="rightD">
                                    <p class="tittle">提交中</p>
                                    <p class="detail"></p>
                                </div>
                            </div>
                        </div>

                        <div class="ARow">
                            <div class="one messageStep">
                            <div class="leftD">
                                <p class="tittle">第二审核</p>
                                <p class="detail">审核内容</p>
                            </div>
                            <div class="circle"></div>
                            <div class="rightD">
                                <p class="tittle">06</p>
                                <p class="detail">2018/01&nbsp;&nbsp;&nbsp;12:05:36</p>
                            </div>
                            </div>
                            <div class="two messageStep">
                                <div class="leftD"></div>
                                <div class="circle"></div>
                                <div class="rightD">
                                    <p class="tittle">提交中</p>
                                    <p class="detail"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
<el-collapse-transition>
    <div v-show="ifShow">
        <el-row>
            <el-col :span="24" class="getPadding">
                <el-col :span="5" class="bgcolor">
                    <label>单号</label>
                    <el-input :disabled="true" v-model="data.num" placeholder="请录入单号"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>手工单号</label>
                    <el-input v-model="data.handmade" placeholder="请录入手工单号"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>仓库</label>
                    <el-input v-model="data.wareHouse" placeholder="请录入仓库"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>交货日期</label>
                    <el-date-picker v-model="data.deliveryData" type="date" placeholder="选择日期"></el-date-picker>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>供应商</label>
                    <el-select v-model="valueSupplier">
                        <el-option v-for="item in supplier" :key="item.valueSupplier" :label="item.label" :value="item.valueSupplier"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>品牌</label>
                    <el-input v-model="data.brand" placeholder="请录入品牌"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>佣金</label>
                    <el-input v-model="data.commission" placeholder="请录入佣金"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>年份</label>
                    <el-date-picker v-model="data.year" type="year" placeholder="请选择年份"></el-date-picker>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label><small>*</small>季节</label>
                    <el-select v-model="valueSeason">
                        <el-option v-for="item in season" :key="item.valueSeason" :label="item.label" :value="item.valueSeason"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>货币</label>
                    <el-input v-model="data.currency" placeholder="请录入货币"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>结算方式</label>
                    <el-input v-model="data.settlement" placeholder="请录入结算方式"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>发运方式</label>
                    <el-input v-model="data.post" placeholder="请录入发运方式"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>采购类型</label>
                    <el-input v-model="data.purchaseType" placeholder="请录入采购类型"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>采购方式</label>
                    <el-input v-model="data.purchaseMethod" placeholder="请录入采购方式"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>PO类型</label>
                    <el-input v-model="data.POType" placeholder="请录入PO类型"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>税率</label>
                    <el-input v-model="data.taxRate" placeholder="请录入税率"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>付款条件</label>
                    <el-input v-model="data.payment" placeholder="请录入付款条件"></el-input>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>工厂订单号</label>
                    <el-input v-model="data.orderNum" placeholder="请录入工厂订单号"></el-input>
                </el-col>
                <el-col :span="10" class="bgcolor moreWidth"><label>备注</label><el-input v-model="data.remarks" placeholder="备注"></el-input></el-col>  
            </el-col>  
        </el-row>
    </div>    
</el-collapse-transition>
        <!-- <el-row class="noPadding">
            <el-col :span="24" class="greyClr">     
                <h4 class="h4 getPadding">其他信息</h4>
            </el-col> 

            <el-col :span="24" class="formData">
                <el-col :span="5" class="bgcolor">
                    <label>金额计算方式</label>
                    <label class="dataLeft">无</label>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>批次定单号</label>
                    <label class="dataLeft">123123</label>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>汇率</label>
                    <label class="dataLeft">1.00</label>
                </el-col>
                <el-col :span="5" class="bgcolor">
                    <label>操作员</label>
                   <label class="dataLeft">3111111</label>
                </el-col>
            </el-col> 
        </el-row> -->

<el-row class="tabPage">  
    <div class="tabZoo">
        <el-col :span="24">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="货品明细" name="detail">
                    <el-col :span="24" class="operationBtn">
                        <button class="erp_bt bt_codeNew"><div class="btImg"><img src="../../../static/image/common/bt_codeNew.png"></div><span class="btDetail">扫码新增</span></button>
                        <button class="erp_bt bt_inputNew"><div class="btImg"><img src="../../../static/image/common/bt_add.png"></div><span class="btDetail">输入新增</span></button>
                        <button class="erp_bt bt_inputNew" @click="addRow"><div class="btImg"><img src="../../../static/image/common/bt_add.png"></div><span class="btDetail">插行</span></button>
                        <button class="erp_bt bt_inputNew" @click="delRow"><div class="btImg"><img src="../../../static/image/common/bt_add.png"></div><span class="btDetail">删行</span></button>
                        <button class="erp_bt bt_in"><div class="btImg"><img src="../../../static/image/common/bt_inOut.png"></div><span class="btDetail">导入</span></button>
                        <button class="erp_bt bt_out bt_width">
                            <div class="btImg"><img src="../../../static/image/common/bt_inOut.png"></div>
                            <span class="btDetail">导出</span>
                            <div class="btRightImg"><img src="../../../static/image/common/bt_down_right.png"></div>
                        </button>
                        <div class="right">
                            <div class="formSearch">
                                <input type="text" class="inputForm" placeholder="编码/名称...">
                                <button>搜索</button>
                            </div>
                            <div class="rightBts">
                                <i class="fa fa-bars first" aria-hidden="true"></i>
                                <i class="fa fa-bars rotate" aria-hidden="true"></i>
                                <span>全屏</span>
                            </div>
                            
                        </div>
                    </el-col>
                    <el-table :data="tableData" stripe border style="width: 100%">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="code" label="货号">
                            <template slot-scope="scope">
                                <input type="text" v-model="tableData[scope.$index].code" class="table_add_td">
                            </template>
                        </el-table-column>
                        <el-table-column prop="size" label="规格">
                            <template slot-scope="scope">
                                <input type="text" v-model="tableData[scope.$index].size" class="table_add_td">
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="数量">
                            <template slot-scope="scope">
                                <input type="text" v-model="tableData[scope.$index].num" class="table_add_td">
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="零售价">
                            <template slot-scope="scope">
                                <input type="text" v-model="tableData[scope.$index].money" class="table_add_td">
                            </template>
                        </el-table-column>
                        <el-table-column prop="volume" label="体积">
                            <template slot-scope="scope">
                                <input type="text" v-model="tableData[scope.$index].volume" class="table_add_td">
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">卡片展示</el-button>
                                <el-button type="text" size="small" @click="delThisRow(scope.$index,scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="10000"
                    class="pagination">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="合同信息" name="info">合同信息</el-tab-pane>
                <el-tab-pane label="其他信息" name="other">
                    <el-col :span="24" class="formData">
                        <el-col :span="5" class="bgcolor">
                            <label>金额计算方式</label>
                            <label class="dataLeft">无</label>
                        </el-col>
                        <el-col :span="5" class="bgcolor">
                            <label>批次定单号</label>
                            <label class="dataLeft">123123</label>
                        </el-col>
                        <el-col :span="5" class="bgcolor">
                            <label>汇率</label>
                            <label class="dataLeft">1.00</label>
                        </el-col>
                        <el-col :span="5" class="bgcolor">
                            <label>操作员</label>
                        <label class="dataLeft">3111111</label>
                        </el-col>
                    </el-col> 
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
 </el-row> 
    </div>
</template>
<script>
    export default({
        data(){
            return{
                x:0,
                ifShow:true,
                show:false,
                activeName:'detail',
                currentPage:4,//分页当前页
                rows:[],
                tableData: [{//表格
                    xid:'1',
                    code: 'A001',
                    size: '红',
                    num: '1',
                    money:'1',
                    volume:'1',
                    },{//表格
                    xid:'2',
                    code: 'A001',
                    size: '红',
                    num: '1',
                    money:'1',
                    volume:'1',
                    },{//表格
                    xid:'3',
                    code: 'A004005006',
                    size: '红',
                    num: '1',
                    money:'1',
                    volume:'1',
                    },{//表格
                    xid:'4',
                    code: 'A004005006',
                    size: '红',
                    num: '1',
                    money:'1',
                    volume:'1',
                }, ],
                data:{
                    num:'PO1711063111111-002',//单号
                    handmade:'1',//手工单号 
                    wareHouse:'',//仓库
                    deliveryData:'',//交货日期
                    brand:'',//品牌
                    commission:'',//佣金
                    year:'2017',//年份
                    season:'秋',//季节
                    currency:'',//货币
                    settlement :'',//结算方式
                    post:'',//发运方式
                    purchaseType:'',//采购类型 
                    purchaseMethod:'',//采购方式 
                    POType:'',//PO类型 
                    taxRate:'',//税率 
                    payment:'',//付款条件 
                    orderNum:'',//工厂订单号 
                    remarks:'',//备注  
                    calculation:'',//金额计算方式 
                    batchNum:'123123',//备批次单号
                    exchangeRate:'1.0',//汇率 
                    billingDate:'2017.11.06',//开单日期 
                    operator:'3111111',//操作员   
                },
                 supplier: [{//供应商
                        valueSupplier:'选项1',
                        label: 'NiKE'
                    }, {
                        valueSupplier:'选项2',
                        label: '安踏'
                    }, {
                        valueSupplier:'选项3',
                        label: '李宁'
                    }],
                season:[{//季节
                        valueSeason:'选项1',
                        label: '春'
                    }, {
                        valueSeason:'选项2',
                        label: '夏'
                    }, {
                        valueSeason:'选项3',
                        label: '秋'
                    },{
                        valueSeason:'选项4',
                        label: '冬'
                    }], 
                valueSupplier:'NiKE',
                valueSeason:'夏',
            }
        },
        methods:{
            handleClick(row) {
                // console.log(row);
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
            },
            back(){
                this.$store.state.url='/order/orderList/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            addRow(){
                let _this=this;
                _this.x++;
                let newRow='newRow'+_this.x;
                _this.rows.newRow={
                    xid:'',
                    code: '',
                    size: '',
                    num: '',
                    money:'',
                    volume:'',
                }
                _this.tableData.unshift(_this.rows.newRow)
            },
            delRow(){
                
            },
            delThisRow(index,row){
                this.tableData.splice(index,1);
            }
        },
    })
</script>
<style>
 .orderDetail{
      font-family: 'microsoft yahei';
      position: relative;
  }
  .orderDetail .step_wraper{
      position: relative;
      float: right;
  }

  .orderDetail .table_add_td{
      text-align: center;
      height: 26px;
      border: none;
  }
  .orderDetail .table_add_td:focus{
      outline: none;
  }
  /* 三角形 */
 
.orderDetail .triangle{
    display: none;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #dedede;
    position: absolute;
    right: -3px;
    top:38px;
    width: 0;
    height: 0;
    z-index: 11;
}

.orderDetail .triangle:after{
    content: '';
     position: absolute;
     top: 1px;
     left: 0;
     margin-left: -14px;
     border-left: 14px solid transparent;
     border-right: 14px solid transparent;
     border-bottom: 14px solid #ffffff;
     position: absolute;
     z-index: 0;
 }
/* 步骤详情 */
 .orderDetail .detailStep{
     display: none;
     border-radius: 5px;
     font-size: 12px;
     position: absolute;
     border: 1px solid  #dedede;
     right: -11px;
     top: 52px;
     z-index: 10;
     width: 300px;
     background-color: #ffffff;
 }

 .orderDetail .detailStep .circle{
     position: absolute;
     border-radius: 50%;
     border: 1px solid #dedede;
     background-color: #fff;
 }  
 .orderDetail .detailStep .one .circle{
     width: 16px;
     height: 16px;
     left: 141px;
     top: 30.5px;
 }
 .orderDetail .detailStep .two .circle{
     height: 10px;
     width: 10px;
     left: 144px;
     top: 30.5px;
 }
 .orderDetail .detailStep .ARow{
     width: 100%;
     height: 150px;;
 }
.orderDetail .detailStep .ARow .messageStep{
    position: relative;
    width: 100%;
    height: 75px;
}
.orderDetail .detailStep .ARow .messageStep .leftD{
    border-right: 1px solid #dedede;
    width: 149.5px;
    height: 75px;
    float: left;
}
.orderDetail .detailStep .ARow .messageStep .rightD{
    width: 149.5px;
    height: 75px;
    float: left;
}

.orderDetail .detailStep .ARow .messageStep .tittle{
    margin-top: 30px;
}
.orderDetail .detailStep .ARow .messageStep .detail{
    color: #a1a1a1;
}
.orderDetail .detailStep .ARow .messageStep .leftD p{
    text-align: right;
    padding-right: 20px;
}
.orderDetail .detailStep .ARow .messageStep .rightD p{
    text-align: left;
    padding-left: 20px;
}
.orderDetail .detailStep .active .circle{
    border: none;
    background-color: #F55E6E;
}
.orderDetail .detailStep .active .rightD p{
    color: #F55E6E;
}
.orderDetail .detailStep .one .rightD .tittle{
    font-family: 'Arial Negreta', 'Arial';
    font-weight: 700;
    font-size: 28px;
    margin-top: 25px;
}
  .orderDetail .activeShow{
      display: block;
  }
/* 已生效 */
.sealWapper{
    position: relative;
    overflow: visible;
    width: 45px;
    height: 40px;
    float: left;
    opacity: 0.5;
}
.seal,
.seal1,
.seal2,
.seal3{
    position: absolute;
    background-repeat:no-repeat;
    background-position:center;
    top:0;
    left: 0;
    width: 45px;
    height: 45px;
}
.seal{
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    top: 0;
    left: 0;
    background-image: url(../../../static/image/u1.png);
}
.seal1{
    background-image: url(../../../static/image/u2.png);
}
.seal2{
    background-image: url(../../../static/image/u3.png);
}
.seal3{
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    background-image: url(../../../static/image/u4.png);
}
.seal3 span{
    font-family: 'microsoft yahei';
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    color: #F55E6E;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 44px;
    color: #FF669B;
    transform: rotate(-90deg) scale(0.8);
    -ms-transform: rotate(-90deg) scale(0.8);
    -webkit-transform: rotate(-90deg) scale(0.8);
    -o-transform: rotate(-90deg) scale(0.8);
    -moz-transform: rotate(-90deg) scale(0.8);
}
/* steps */
.orderDetail .el-steps .el-step__line{
    display: none;
}
.orderDetail .el-steps .el-step__main{
    position: absolute;
    top: 0px;
    left: 42px;
}
.orderDetail .el-steps .el-step__head{
    width: 120px;
}
.orderDetail .el-steps .el-step__title{
    font-size: 12px;
    line-height: 20px;
}
.orderDetail .el-steps .el-step__description{
    padding-right: 0;
}
.orderDetail .el-steps .el-step__icon{
    width: 36px;
    height: 36px;
}

.orderDetail .el-icon-more{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg); 
    margin-top: 9px;
    color: #F55E6E;
    cursor: pointer;
}



.orderDetail .el-row{
     padding:5px 0;
     border-bottom: 1px solid #e4e4e4;
     background-color: #fff;
  }



.orderDetail .companyInfo>.el-col:first-child,
.orderDetail .companyInfo .el-col h4{
    margin-bottom: 15px;
}

.orderDetail .tabZoo{
     overflow: hidden;
     background-color: #fff;
 }

 .orderDetail .getPadding{
     padding: 0 10px;
 }
 .orderDetail .tabZoo .el-tabs__nav-scroll{
     padding:10px;
 }
 .orderDetail .tabZoo .el-tabs__content{
     padding: 0 10px;
     border: 1px solid #e4e4e4;
     width: calc(100% - 40px);
     margin:auto;
     margin-top: 1px;
 }

 .orderDetail .tabZoo .auditInformation{
     margin-top: 15px;
 }
 .orderDetail .tabZoo .auditInformation h4{
     margin-bottom: 15px;
 }

 .orderDetail .operationBtn{
     padding:5px 0;
 }
 /* 分页 */
 .orderDetail .pagination{
     float: right;
 }
.orderDetail .greyClr{
    background-color: #f2f2f2;
    padding-top: 15px;
}
.orderDetail .noPadding{
    padding: 0;
}
.orderDetail .formData{
    padding: 10px;
}
.orderDetail .formData .bgcolor{
    margin-bottom: 0;
}
.orderDetail .dataLeft{
    text-align: left;
}
.orderDetail .h4.getPadding{
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e4e4;
}
.orderDetail .tabPage{
    padding-top: 0;
    width: 100%;
}
.orderDetail .el-tabs__header{
    margin: 0;
}
/* 搜索框 */
.orderDetail .right{
    float: right;
    width: 480px;
    height: 100%;
    margin-right: 20px;
    margin-top: 3px;
}
.orderDetail .right .formSearch{
     float: left;
 }
.orderDetail .right i,.orderDetail .right span{
    line-height: 30px;
    font-size: 12px;
    color: #c9c9c9;
    cursor: pointer;
}
.orderDetail .right i:hover,.orderDetail .right span:hover{
    color: #3cc;
}
.orderDetail .right .rightBts{
    float: right;
}
.orderDetail .right .rotate{
     transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    margin-left: 5px;
    margin-right: 10px;
 }

 .orderDetail .operationBtn .erp_bt:first-child{
     margin-left: 0;
 }
</style>



