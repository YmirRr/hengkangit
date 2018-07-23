<template>
    <div class="goods-data-wrapper">
        <el-row class="pt10 pl10 pb10">
            <el-col :span='2'>
                <span style="font-weight:bolder">基础信息</span>
            </el-col>
            <el-col :span="20">
                <el-row>
                    <el-col :span='5' class="bg-white ml10 h30 pl10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">客户分类</span>
                            </el-col>
                            <el-col :span="15">
                                <input class="input-need" type="text" placeholder="PO959894848"/>
                            </el-col>
                        </el-row>                    
                    </el-col>

                    <el-col :span='5' class="bg-white ml10 h30 pl10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">所属组织</span>
                            </el-col>
                            <el-col :span="15">
                                <input class="input-need" type="text" placeholder="请录入所属组织"/>
                            </el-col>
                        </el-row>                    
                    </el-col>

                    <el-col :span='5' class="bg-white ml10 h30 pl10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">行政地区</span>
                            </el-col>
                            <el-col :span="15">
                                <el-select v-model="value" placeholder="请选择行政地区">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>                    
                    </el-col>

                    <el-col :span='5' class="bg-white ml10 h30 pl10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">业务地区</span>
                            </el-col>
                            <el-col :span="15">
                                <el-select v-model="value" placeholder="无">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>                    
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span='5' class="bg-white ml10 h30 pl10 mt10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">编码</span>
                            </el-col>
                            <el-col :span="15">
                                <input class="input-need" type="text" placeholder="PO-959894848"/>
                            </el-col>
                        </el-row>                    
                    </el-col>

                    <el-col :span='5' class="bg-white ml10 h30 pl10 mt10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">名称</span>
                            </el-col>
                            <el-col :span="15">
                                <input class="input-need" type="text" placeholder="请录入手工单号"/>
                            </el-col>
                        </el-row>                    
                    </el-col>

                    <el-col :span='5' class="bg-white ml10 h30 pl10 mt10">
                        <el-row>
                            <el-col :span="8">
                                <span class="fs14">客户性质</span>
                            </el-col>
                            <el-col :span="15">
                                <el-select v-model="value" placeholder="请选择客户性质">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>                    
                    </el-col>
                </el-row>

                <el-row class="mt20">
                    <el-col :span='2' class="ml10">
                        <span class="btn">新增</span>
                    </el-col>

                    <el-col :span='2' class="ml10">
                        <span class="btn">查询</span>
                    </el-col>

                    <el-col :span='2' class="ml10">
                        <span class="btn">打印</span>
                    </el-col>

                    <el-col :span='2' class="ml10">
                        <span class="btn">Excel</span>
                    </el-col>

                    <el-col :span='2' class="ml10">
                        <span class="btn">辅助功能</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="bg-white pl10 pt10 pr10 pb10">
            <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%" stripe>
                    <el-table-column prop="organization" label="所属组织" ></el-table-column>
                    <el-table-column prop="customerCode" label="客户编码" ></el-table-column>
                    <el-table-column prop="customerName" label="客户名称"></el-table-column>
                    <el-table-column prop="customerCall" label="客户简称"></el-table-column>
                    <el-table-column prop="customerClass" label="客户分类"></el-table-column>
                    <el-table-column prop="customerNature" label="客户性质"></el-table-column>
                    <el-table-column prop="customerType" label="客户类型"></el-table-column>
                    <el-table-column prop="supply" label="供应"></el-table-column>     
                    <el-table-column prop="money" label="对应财务组织"></el-table-column>
                    <el-table-column prop="ifAllow" label="允许使用">
                        <template slot-scope="scope">
                            <el-checkbox v-model="tableData[scope.$index].ifAllow" ></el-checkbox>
                        </template>
                    </el-table-column>
              </el-table> 
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default{
        name:'goodsData',
        data(){
            return{
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
				organization: '组织',
				customerCode: '客户编码',
				customerName: '客户名称',
                customerCall:'客户简称',
                customerClass:'客户分类',
                customerNature:'客户性质',
                customerType:'客户类型',
                supply:'供应',
                money:'对应财务组织',
                ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}, {
				    organization: '组织',
                    customerCode: '客户编码',
                    customerName: '客户名称',
                    customerCall:'客户简称',
                    customerClass:'客户分类',
                    customerNature:'客户性质',
                    customerType:'客户类型',
                    supply:'供应',
                    money:'对应财务组织',
                    ifAllow:true,
				}],

            }
        },
    }
</script>

<style scoped>
.goods-data-wrapper{
    width: 100%;
    height: auto;
    background: rgba(238, 241, 245, 1);
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
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
.pt10{
    padding-top: 10px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.h30{
    height: 32px;
    line-height: 32px;
}
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
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
</style>

<style>
.goods-data-wrapper .el-input input{
    border:none;
    height: 30px;
    line-height: 30px;
    padding-left: 0;
}
/* 重写checkbox */
.goods-data-wrapper .el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius:50% !important; 
}
.goods-data-wrapper .el-checkbox__inner::after{
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
.goods-data-wrapper .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.goods-data-wrapper .el-table td{
    padding: 3px 0;
}
.goods-data-wrapper .el-table__body{
    text-align: center;
}
</style>
