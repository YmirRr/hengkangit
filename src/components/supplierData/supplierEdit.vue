<template>
    <el-container class="supplierEdit bg-white">
        <el-main>
            <el-tabs tab-position="left" class="supplier-tab">
                <el-tab-pane label="用户管理">
                    <el-main class="user-panle">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="审计信息" name="1">
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>供应商代码</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>供应商全称</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>供应商简称</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>外文名称</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>行政地区</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>企业类型</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>内部公司</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>供应商性质</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>企业性质</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>联系人</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>供应商分类</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>电话</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>传真</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>业务地区</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>电话号码</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>税务登记号</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>采购员</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>发票地址</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>发票类型</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>邮政编码</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>E-mail</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>发票单价</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>网址</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>付款条件</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>营业执照</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>法人代表</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>备注</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>保险比例</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>审核人</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>审核时间</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>陆运</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>修改时间</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>往来核算科目</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>低级供应商</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>建档人</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>往来核算分类</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>税率</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>机税方式</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>国别代码</template>
                                        </el-input>
                                    </el-col>
                                    <el-col :xs="12" :sm="6" :md="6" :lg="5">
                                        <el-input placeholder="恒康科技" v-model="input3" size="medium">
                                            <template slot="prepend"><label class="required-area">*</label>国别名称</template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                                <!-- checkbox -->
                                <el-row>
                                    <el-checkbox v-model="checked">同时为客户</el-checkbox>
                                    <el-checkbox v-model="checked">允许使用</el-checkbox>
                                    <el-checkbox v-model="checked">代采供应商</el-checkbox>
                                </el-row>
                                <!-- 按钮组 -->
                                <el-row class="text-center">
                                    <el-button type="primary">保存</el-button>
                                    <el-button type="primary">保存并新增</el-button>
                                    <el-button>取消</el-button>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </el-main>
                </el-tab-pane>
                <el-tab-pane label="结算货币">
                    <el-main class="Settlement-panle">
                        <el-row>
                            <el-button class="fl" size="small" type="primary">添加</el-button>
                            <el-col class="fr" :xs="10" :sm="8" :md="6" :lg="5" >
                                <el-input size='medium' placeholder="编码/名称" v-model="input4">
                                    <template slot="append">搜索</template>
                                </el-input>
                            </el-col >      
                        </el-row>
                        <el-table :data="tableData" border style="width: 100%" class="text-center">
                            <el-table-column prop="date" label="日期" width="180"></el-table-column>
                            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                            <el-table-column prop="address" label="地址">
                                <template slot-scope="scope">
                                    <el-input :readonly="scope.$index!=isEdit" v-on:blur="finishEdit(scope.$index)"  v-model="tableData[scope.$index].address"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="是否允许" width="180">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="tableData[scope.$index].ifAllow" ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button  v-on:click="handleEdit(scope.$index)" type="text" size="small">修改</el-button>
                                    <el-button v-on:click="handleDelete(scope.$index)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="mt-10">
                            <span class='fl'>第1-2项,共4项</span>
                            <el-pagination class="fr" background layout="prev, pager, next" :total="1000"></el-pagination>
                        </el-row>
                        <el-row class="text-center">
                            <el-button type="primary">保存</el-button>
                            <el-button type="primary">保存并新增</el-button>
                            <el-button>取消</el-button>
                        </el-row>
                    </el-main>
                </el-tab-pane>
                <el-tab-pane label="发运方式">角色管理</el-tab-pane>
                <el-tab-pane label="经营品牌">定时任务补偿</el-tab-pane>
                <el-tab-pane label="送货地址">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>

export default {
  name: 'supplierEdit',
   data () {
    return {
        input3:'',
        activeNames: ['1'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          ifAllow:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          ifAllow:false,
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          ifAllow:false,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          ifAllow:false,
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        isEdit:-1,
    }
   },
   methods:{
       handleEdit:function(index){
           this.isEdit=index;
           let id = this.$route.params.id;
           console.log(id);
       },
       finishEdit:function(index){
           this.isEdit=-1;
       },
       handleDelete:function(index){
           this.tableData.splice(index,1);
       },
   }
}
</script>
<style>
.mt-10{
    margin-top: 10px;
}
.fl{float: left}
.fr{float: right}
.text-center{
  text-align: center;
}
.bg-white{
  background: #fff;
}
.supplierEdit .el-col{
   margin-bottom: 20px;
}
.user-panle{
    padding: 0 20px;
}
.supplier-tab .el-input__inner{
    border: 1px solid #dcdfe6;
    border-left: none;
    border-radius: 0px;
}
.supplierEdit .el-tabs__item {
    text-align: center;
}
.supplierEdit .el-tabs__item.is-active {
    background: #409EFF;
    color: #fff;
}
.supplierEdit .el-tabs__nav-scroll{
    overflow: hidden;
    padding-right: 50px;
}
.user-panle .el-input-group__prepend {
    border-right: 0;
    background: #fff;
}
/* 结算货币 分块*/
.Settlement-panle .el-input__inner{
    border-left:1px solid #dcdfe6;
}
/* 分页样式 */
.el-pagination.is-background .btn-next, 
.el-pagination.is-background .btn-prev, 
.el-pagination.is-background .el-pager li{
    border-radius: 50%;
    font-size: 12px;
    font-weight: normal;
}
/* checkbox样式 */
.el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 1;
    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.el-checkbox__inner::after {
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
    width: 5px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms, -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.el-input__inner[readonly]{
    border: none;
}
</style>
