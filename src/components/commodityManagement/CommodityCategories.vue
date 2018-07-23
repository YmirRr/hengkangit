<template>
    <div class="customer-infor-wrapper" style="background:#fff;width:100%;float:left">
        <query :data="querychend" v-on:listquery="querylog" ></query>     
        <div  id="cate">         
            <el-row >
                <el-col :span="24" class="border-left" id="bg-white">
                    <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                     <el-row class="  pb10">
                            <tree :datc="componyTree"></tree>                         
                            <div class="categ">
                            <el-col :span="24" class="" >
                                <div >
                                    
                                    <el-table :data="tableData" border style="width: 100%" class="text-center">
                                    <el-table-column prop="date" label="序号" width="60">
                                        
                                    </el-table-column>
                                     <el-table-column prop="name" label="" width="50">
                                        <template slot-scope="scope">
                                            <el-checkbox  ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="上级类目">
                                    </el-table-column>
                                    <el-table-column prop="address5" label="类目名称">
                                        <template slot-scope="scope">
                                            <el-button type="text"    >{{tableData[scope.$index].address5}}</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address2" label="类目编码">
                                    </el-table-column>
                                   <el-table-column prop="address3" label="状态" width="">
                                    </el-table-column>
                                    <el-table-column prop="address4" label="助记码">
                                    </el-table-column>
                                    
                                     <el-table-column prop="address6" label="服务类" width="">
                                        <template slot-scope="scope">
                                            <el-checkbox  ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address7" label="备注" width="">
                                    </el-table-column>  
                                    <el-table-column prop="address8" label="操作" width="">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="modify(scope.row)"  >查看</el-button>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                                <el-pagination style="margin-top:20px;"  class="text-right"  background layout="total, prev, pager, next"  :page-count="totalPage" >
                                 </el-pagination>  
                                </div>  
                            </el-col> 
                        </div>
                        
                    </el-row>

                </el-col>
            </el-row>  
        </div>   
    </div>     
</template>

<script>
    import Query from '../../base/query/query'
    export default{
        name:'customerInfor',
        data(){
            return {
                querychend:{
                    up:'',
                    demand:[{
                    must: '*',
                    title: '类目编码',
                    place: '1223'                
                },{
                    must: '*',
                    title: '类目名称',
                    place: '1223'                 
                },{
                    must: '*',
                    title: '服务类(虚拟)',
                    options:[{
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
                    }]                
                },{
                    must: '*',
                    title: '状态',
                    options:[{
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
                    }]                
                }]},
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
                                date: '1',
                                name: '1',
                                address: '鞋服',
                                address2: '1',
                                address3: '已提交',
                                address4: '已提交',
                                address5: '女装',
                                address6: '',
                                address7: '改姓可',
                                address8: '查看',
                            }, {
                                date: '2',
                                name: '1',
                                address: '母婴',
                                address2: '2',
                                address3: '不通过',
                                address4: '日期',
                                address5: '奶粉',    
                                address6: '',          
                                address7: '好用',
                                address8: '查看',
                            }, {
                                date: '3',
                                name: '1',
                                address: '美容',
                                address2: '3',
                                address3: '已启用',
                                address4: '手工录入',
                                address5: '身体护理',
                                
                                address6: '',
                                
                                address7: '',
                                address8: '查看',
                            }],

                    componyTree: [{
                        label: '商品类目',
                        children: [{
                            label: '鞋服',  
                        },
                        {
                            label: '母婴',  
                        },
                        {
                        label: '宝宝食品',
                            children: [{
                               label: '儿童玩具',  
                            },
                            {
                               label: '美容',  
                            },
                            {
                               label: '服务',  
                            }] 
                        }],    
                    }],

                    pageIndex:-1,//分页的当前页码
                totalPage:100,//当前分页总数
            }
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            modify(row){
                this.$store.state.url='/commodityleimu/CommodityCategoriesDetails/'+row.address5;
                this.$router.push({path:this.$store.state.url});
            },
            btmlog:function(data){
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="block";
                let ocate= document.getElementById('cate')
                ocate.style.width="calc(100% - 275px)";
            },
            querylog:function(data){
                let _this=this;
                if(data){
                    let ocate= document.getElementById('cate')
                    ocate.style.width="100%";
                    _this.bottonbox.botton.push({
                        class: 'erp_bt bt_auxiliary',
                        imgsrc: '../../../static/image/common/bt_stop.png',
                        text: '查询'
                    })
                }
            }
        },
        watch:{
            
        },
        components:{
            Query,
            Tree
        }
        
    }
</script>

<style scoped>
.bg-white{
    background: white;
    border-radius: 3px;
}
.pb10{
    padding-bottom: 10px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
}
.text-center{
    text-align: center;
}
#cate{
    width: calc(100% - 275px);
    float: left;
}
.categ{
    width: calc(100% - 200px);
    float: left;
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