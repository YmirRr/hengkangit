<template>
    <div class="orderList">
        <el-row class="bg-white">
            <el-col :span="5">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <i class="el-icon-search"></i>
                        <span>查询</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="fs12 open">+ 展开</span>
                    </el-col>
                </el-row>
                <div class="mt20 bgcolor smallBgcolor"><label>单号</label><el-input placeholder="请录入单号"></el-input></div>
                <div class="bgcolor smallBgcolor">
                    <label>客户分类</label>
                    <el-select  v-model="value">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label>所属组织</label>
                    <el-input placeholder="所属组织"></el-input>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label>行政地区</label>
                    <el-input placeholder="行政地区"></el-input>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label>业务地区</label>
                    <el-input placeholder="业务地区"></el-input>
                </div>
               
                <div class="bgcolor smallBgcolor">
                    <label>编码</label>
                    <el-input placeholder="编码"></el-input>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label>名称</label>
                    <el-select  v-model="value">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label>客户性质</label>
                    <el-select  v-model="value">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor smallBgcolor">
                    <label></label>
                    <span class="search-btn">查询</span>
                </div>
            </el-col>

            <el-col :span='19' class="border-left">
                <el-row class="h48 pt5">
                    <button class="erp_bt bt_add" @click="newAdd"><div class="btImg"><img src="../../../static/image/common/bt_add.png"></div><span class="btDetail">新增</span></button>
                    <button class="erp_bt bt_excel"><div class="btImg"><img src="../../../static/image/common/bt_excel.png"></div><span class="btDetail">Excel</span></button>
                    <button class="erp_bt bt_del"><div class="btImg"><img src="../../../static/image/common/bt_del.png"></div><span class="btDetail">删除</span></button>
                    <button class="erp_bt bt_auxiliary bt_width">
                        <div class="btImg"><img src="../../../static/image/common/bt_auxiliary.png"></div>
                        <span class="btDetail">辅助功能</span>
                        <div class="btRightImg"><img src="../../../static/image/common/bt_down_right.png"></div>
                    </button>
                    <button class="erp_bt bt_print"><div class="btImg"><img src="../../../static/image/common/bt_print.png"></div><span class="btDetail">打印</span></button>
                </el-row>

                <el-row class="pl10 pt10 pr10 pb10">
                   

                    <el-col :span='24'>
                        <el-table :data="tableData" border style="width: 100%" stripe>
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="code" label="所属组织" class="code"></el-table-column>
                            <el-table-column prop="handCode" label="客户编码"></el-table-column>
                            <el-table-column prop="startDate" label="客户名称"></el-table-column>
                            <el-table-column prop="supply" label="客户简称"></el-table-column>
                            <el-table-column prop="store" label="客户类型"></el-table-column>
                            <el-table-column prop="total" label="客户性质"></el-table-column>
                            <el-table-column prop="money" label="供应..."></el-table-column>
                            <el-table-column prop="giveDate" label="对应财务组织"></el-table-column>
                            <el-table-column prop="type" label="允许使用"></el-table-column>
                        </el-table>  
                        <el-pagination style="margin-top:20px;" class="text-right" background layout="total, prev, pager, next"  :page-count="totalPage"></el-pagination>   
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        
    </div>
</template>

<script>
    export default{
        name:'customerInfor',
        data(){
            return {
                valueDate:'',
                options: [{
                    value: '选项1',
                    label: '仓库'
                    }, {
                    value: '选项2',
                    label: '地址'
                    }, {
                    value: '选项3',
                    label: '总部'
                    }, {
                    value: '选项4',
                    label: '总部2'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],

                value: '',
                tableData: [{
                    ifAction:true,
                    code: 'A001',
                    handCode: '未审核',
                    startDate: '2017.11.03',
                    supply: '哈哈',
                    store:'深圳1',
                    total:'10000',
                    money:'500000',
                    giveDate:'2015.12.30',
                    type:'A01',
                    number:'00100201',
                    status:'启用',
                    create:'张三',
                    examine:'李四',
                    lookTime:'2018.1.1',
                    }],

                    pageIndex:-1,//分页的当前页码
			        totalPage:20,//当前分页总数
            }
        },
        methods:{
            test:function(){
                this.$axios.posts('/api/services/app/StockAddressManagement/Create',this.try)
                .then(function(res){
                console.log(res);
            },function(res){
                console.log('err:'+res)
            })
            },
            newAdd(){
                this.$store.state.url='/order/orderDetails/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            }
           

        },
    }
</script>

<style scoped>

.orderList{
    width: 100%;
    height: auto;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
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
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.fs12{
    font-size: 12px;
}
.border1{
    border: 1px solid #999999;
    border-radius: 3px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 455px;
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
</style>

<style>



.orderList .open{
    display: inline-block;
    width: 49px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #cccccc;
    color: #cccccc;
    text-align: center;
    cursor: pointer;
}
/* 重写checkbox */
.orderList .el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius:50% !important; 
}
.orderList .el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 11px;
    left: 6px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 6px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}

/* 重写el-table样式 */
.orderList .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.orderList .el-table td{
    padding: 3px 0;
}
.orderList .el-table__body{
    text-align: center;
}
.orderList .el-table__body .el-table__row .el-table_1_column_2 .cell{
    color:#33CCCC;
}


</style>