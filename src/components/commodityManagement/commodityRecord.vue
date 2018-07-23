<template>
    <div class="customer-infor-wrapper commodity" style="float:left;background:#fff;width:100%">
        <div id="left-box" class="left-box">
            <el-row class="bg-white"  v-show="ifWidth">
                <el-col :span="24">
                    <el-row class="h48 pl15">
                        <el-col :span="18">
                            <img src="../../../static/image/common/search_btn.png" class="closeLeft" >
                            <span>查询</span>
                        </el-col>
                        <el-col :span="2" :offset="4">
                            <span class="fs12 search_info_open" @click="closeLeft">-</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>商品编码</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>商品名称</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" >
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>助记码</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" >
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>上市时间(起)</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" >
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>上市时间(终)</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" >
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>状态</label>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                    <el-option  >
                                    </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>品牌</label>
                           </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="smallBgcolor" >
                            <el-input placeholder="请录入单号" v-model="value"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="bgcolor smallBgcolor" >
                                    <label>状态</label>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  >
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <div class="height1"></div>
                        </el-col>
                        <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                            <span class="search-btn" style="float:left;margin-left:10px;" @click="query()">查询</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>     
        <div id="bgv">
            <el-row >
                <el-col :span="24" class="border-left" id="bg-white">
                    <el-col :span="ifWidth?0:2" class="search-block">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <span class='open-search'>+</span>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22">
                        <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                    </el-col> 
                    
                        <el-col :span="24">
                             <el-table @selection-change="handleSelectionChange" :data="tableData" border style="width: 100%">
                                <el-table-column prop="date" label="序号" width="60">
                                </el-table-column>
                                <el-table-column type="selection" prop="name" label="" width="50">
                                </el-table-column>
                                <el-table-column prop="address" label="商品编码">
                                </el-table-column>
                                <el-table-column prop="address1" label="商品名称">
                                    <template slot-scope="scope">
                                        <el-button type="text"   >{{tableData[scope.$index].address1}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="address2" label="状态" width="100">
                                </el-table-column>
                                <el-table-column prop="address3" label="助记码">
                                </el-table-column>
                                <el-table-column prop="address4" label="商品条码">
                                </el-table-column>
                                <el-table-column prop="address5" label="品牌" >
                                </el-table-column>
                                <el-table-column prop="address6" label="类目" >
                                </el-table-column>
                                <el-table-column prop="address7" label="上市日期" width="100">
                                </el-table-column>
                                <el-table-column prop="address8" label="操作" >
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small"  >查看</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-row>
                                <el-col :span='10'>
                                    <span style="display:inline-block;margin-top:20px;">记录 40，当前第 1 页，共 4 页</span>
                                </el-col>
                                <el-col :span='14'>
                                    <el-pagination style="margin-top:20px;" class="text-right" background layout="total, prev, pager, next"  :page-count="totalPage" ></el-pagination>
                                </el-col>
                            </el-row> 
                            
                        </el-col>
                    

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Query from '../../base/query/query'
import Btm from '../../base/btm/btm'
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
                ifWidth:true,
                querychend:{
                    up:'',
                    demand:[{
                    must: '',
                    title: '商品编码',
                    place: ''                
                },{
                    must: '',
                    title: '商品名称',
                    place: ''                 
                },{
                    must: '',
                    title: '助记码',
                    place: ''                
                },{
                    must: '',
                    title: '上市时间(起)',
                    place: ''                 
                },{
                    must: '',
                    title: '上市时间(终)',
                    place: ''                 
                },{
                    must: '',
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
                },{
                    must: '',
                    title: '品牌',
                    place: ''                 
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
                    url: '/Record/commodityRecordDetails',
                   botton:[{
                    class: 'erp_bt bt_add',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    show:true,
                    text: '新增'
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    show:true,
                    text: '删除'
                },{
                    class: 'erp_bt bt_audit',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    show:true,
                    text: '审核'
                },{
                    class: 'erp_bt bt_in',
                    imgsrc: '../../../static/image/common/bt_in.png',
                    show:true,
                    text: '导入'
                },{
                    class: 'erp_bt bt_out',
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    show:true,
                    text: '导出'
                },{
                    class: 'erp_bt bt_version',
                    imgsrc: '../../../static/image/common/bt_start.png',
                    show:true,
                    text: '启用'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_stop.png',
                    show:true,
                    text: '停用'
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
                value: '',
                tableData: [{
                                 date: '1',
                                 name: '',
                                address: '1',
                                address1: '苹果',
                                address2: '已提交',
                                address3: '',
                                address4: '1',
                                address5: '红富士',
                                address6: '水果',
                                address7: '2017.02.02',
                                address8: '查看',
                            }, {
                                  date: '2',
                                 name: '',
                                address: '2',
                                address1: '栗子',
                                address2: '不通过',
                                address3: '',
                                address4: '2',
                                address5: '红富士',
                                address6: '水果',
                                address7: '2017.02.02',
                                address8: '查看',
                            }, {
                                 date: '3',
                                 name: '',
                                address: '3',
                                address1: '梨子',
                                address2: '已反审',
                                address3: '',
                                address4: '3',
                                address5: '红富士',
                                address6: '水果',
                                address7: '2017.02.02',
                                address8: '查看',
                            }, {
                                 date: '4',
                                 name: '',
                                address: '4',
                                address1: '桃子',
                                address2: '已反审',
                                address3: '',
                                address4: '4',
                                address5: '红富士',
                                address6: '水果',
                                address7: '2017.02.02',
                                address8: '查看',
                        }],

                    pageIndex:-1,//分页的当前页码
			        totalPage:20,//当前分页总数
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
            closeLeft:function(){
                let self = this;
                self.ifWidth = false;
                let obgh=document.getElementById('bgv');
                obgh.style.width="100%";
            },
            openLeft:function(){
               let self = this;
               self.ifWidth = true;
               let obgh=document.getElementById('bgv');
                obgh.style.width="calc(100% - 340px)";
            },
            btmlog:function(data){
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="block";
                let ocate= document.getElementById('bgv')
                ocate.style.width="calc(100% - 275px)";
            },
            querylog:function(data){
                let _this=this;
                if(data){
                    let ocate= document.getElementById('bgv')
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
        }
    }
</script>

<style scoped>
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.open-search{
    background-image: url(../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
}
.pl15{
    padding-left: 15px;
}
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
</style>

<style>
#bgv{
    width: calc(100% - 340px);
    float: left;
}
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    background: #f4f4f5;
}
.el-checkbox__inner::after{
    left: 4px;
    top: -2px;
}
.bgcolor{
    width: 100%;
}

</style>