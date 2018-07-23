<template>
    <div class="customer-infor-wrapper" style="float:left;background:#fff;width:100%;">
        <query :data="querychend" v-on:listquery="querylog" ></query> 
        <div id="bgk">
            <el-row >
                <el-col :span="24" class="border-left" id="bg-white">
                    <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                     <el-row >
                        <tree :datc="componyTree"></tree>
                        <el-row class="watch pb10">
                            <el-col :span="24" >
                                <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
                                    <el-table-column prop="date" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column type="selection" label="" width="50">
                                    </el-table-column>
                                    <el-table-column prop="address" label="属性编码">
                                    </el-table-column>
                                    <el-table-column prop="address1" label="属性名称">
                                    </el-table-column>
                                    <el-table-column prop="address2" label="备注" width="100">
                                    </el-table-column>
                                    <el-table-column prop="address3" label="级联属性">
                                    </el-table-column>
                                    <el-table-column prop="address4" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="address5" label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small"  >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination style="margin-top:20px;"  class="text-right"  background layout="total, prev, pager, next"  :page-count="totalPage" >
                                 </el-pagination>   
                            </el-col> 
                        </el-row>
                    </el-row>

                </el-col>
            </el-row> 
        </div>  
    </div>
</template>

<script>
import Query from '../../base/query/query'
import Btm from '../../base/btm/btm'
import Tree from '../../base/tree/tree'
    export default{
        name:'customerInfor',
        data(){
            return {
                try:{
                "groupId": 2,
                "stockId": 1,
                "addressId": 8,
                "completeAddress": "str33ing",
                "transportMethodId": 1,
                "contactPerson": "stri55ng",
                "phone": "18200326666",
                "logisticsCompany": "str55ing",
                "isDefault": true,
                "remark": "st54ring"
                },
                querychend:{
                    up:'',
                    demand:[{
                    must: '',
                    title: '属性编码',
                    place: ''                
                },{
                    must: '',
                    title: '属性名称',
                    place: ''                 
                }]},
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
                    bottonbox:{
                    url: '/commodityleimu/CommodityCategoriesDetails',
                   botton:[{
                    class: 'erp_bt bt_add',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增'
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除'
                },{
                    class: 'erp_bt bt_audit',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    text: '审核'
                },{
                    class: 'erp_bt bt_in',
                    imgsrc: '../../../static/image/common/bt_in.png',
                    text: '导入'
                },{
                    class: 'erp_bt bt_out',
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    text: '导出'
                },{
                    class: 'erp_bt bt_version',
                    imgsrc: '../../../static/image/common/bt_start.png',
                    text: '启用'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_stop.png',
                    text: '停用'
                }]},
                value: '',
                tableData: [{
                                 date: '1',
                                 name: '',
                                address: '1',
                                address1: '机洗',
                                address2: '',
                                address3: '1',
                                address4: '已启用',
                                address5: '删行',
                            }, {
                                  date: '2',
                                 name: '',
                                address: '2',
                                address1: '机洗',
                                address2: '',
                                address3: '2',
                                address4: '已启用',
                                address5: '删行',
                            }, {
                                date: '3',
                                 name: '',
                                address: '3',
                                address1: '机洗',
                                address2: '',
                                address3: '3',
                                address4: '已启用',
                                address5: '删行',
                            }],

                    componyTree: [{
                            label: '商品属性',
                            children: [{
                                label: '材质',
                                children: [{
                                    label: '材质',
                                },{
                                    label: '洗涤方式'
                                }],
                            },
                            {
                             label: '款式',
                             children: [{}] 
                            }],     
                        }],

                 pageIndex:-1,//分页的当前页码
              totalPage:100,//当前分页总数
            }
        },
        created:function(){       
            
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            handleSelectionChange(val) {//点击复选框选中的数据
            },
            btmlog:function(data){
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="block";
                let ocate= document.getElementById('bgk')
                ocate.style.width="calc(100% - 275px)";
            },
            querylog:function(data){
                let _this=this;
                if(data){
                    let ocate= document.getElementById('bgk')
                    ocate.style.width="100%";
                    _this.bottonbox.botton.push({
                        class: 'erp_bt bt_auxiliary',
                        imgsrc: '../../../static/image/common/bt_stop.png',
                        text: '查询'
                    })
                }
            },
        },
        components:{
            Query,
            Btm,
            Tree
        }
    }
</script>

<style scoped>
.bg-white{
    background: white;
    border-radius: 3px;
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
.border-left{
    border-left: 1px solid #E4E4E4;
}
#bgk{
    float: left;
    width: calc(100% - 275px);
    background-color: rgb(249,249,249)
}
.watch{
    width: calc(100% - 200px);
    float: left;
    background-color: #fff;
}
</style>

<style>
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    background: #f4f4f5;
}
.el-checkbox__inner::after{
    left: 4px;
    top: -2px;
}
</style>