<template>
  <div class="res-modify">
        <el-row class="bg-white pt10 pb10 bb1 fixed">
            <button class="erp_bt bt_back" @click="back()">
                <div class="btImg">
                <img src="../../../static/image/common/bt_back.png">
                </div>
                <span class="btDetail">返回</span>
            </button>

            <button class="erp_bt bt_save" >
                <div class="btImg">
                <img src="../../../static/image/common/bt_save.png">
                </div>
                <span class="btDetail">保存</span>
            </button>

            <button class="erp_bt bt_cancel">
                <div class="btImg">
                    <img src="../../../static/image/common/bt_cancel.png">
                </div>
                <span class="btDetail">取消</span>
            </button>

            <button class="erp_bt bt_saveAdd">
                <div class="btImg">
                    <img src="../../../static/image/common/bt_saveAdd.png">
                </div>
                <span class="btDetail">保存并新增</span>
            </button>

            <button class="erp_bt bt_add">
                <div class="btImg">
                    <img src="../../../static/image/common/bt_add.png">
                </div>
                <span class="btDetail">新增</span>
            </button>

            <button class="erp_bt bt_del">
                <div class="btImg">
                    <img src="../../../static/image/common/bt_del.png">
                </div>
                <span class="btDetail">删除</span>
            </button>
            <div class="toggle-btn">
                <span >收起</span>
                <i class="el-icon-arrow-up"></i>
            </div>
        </el-row>

        <el-collapse-transition>
            <div class="bb1">
                <el-row class="bg-white ft12 pr10 pt10">
                    <el-col :span="24">
                        <div class="bgcolor">
                            <label><small>*</small>所属组织</label>
                            <el-select v-model='dataItem.OuId'>
                                <el-input placeholder="搜索..."
                                          class="selectSearch"
                                          ></el-input>
                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                        :data="OuArray"
                                        :props="selectOuProps"
                                        node-key="id"
                                        default-expand-all
                                        ref="ouTree"
                                        :expand-on-click-node="false"
                                        @node-click="ouNodeClick"></el-tree> 
                                <el-option v-show="false"
                                           :key="countOu.id" 
                                           :label="countOu.ouName" 
                                           :value="countOu.id"
                                           id="ou_confirmSelect"></el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>编码</label>
                            <el-input placeholder="" class="stockCode"  v-model='dataItem.stockCode'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>名称</label>
                            <el-input placeholder=""  v-model='dataItem.stockName'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>全称</label>
                            <el-input placeholder="" v-model='dataItem.stockFullName'></el-input>
                        </div>
                        <div class="bgcolor">
                            <label>助记码</label>
                            <el-input placeholder="" v-model='dataItem.mnemonic'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>仓库类型</label>
                            <el-select  class="stockTypeId" v-model='dataItem.stockTypeId'></el-select>
                        </div>

                        <div class="bgcolor">
                            <label>业务地区</label>
                            <el-input class="opAreaId" v-model='dataItem.opAreaId'> </el-input>
                        </div>

                        <div class="bgcolor area">
                            <label>行政地区</label>
                            <div class="areaBox">
                                <el-input  class="areaDrop" placeholder="选择省">
                                </el-input>
                                <el-input  class="areaDrop" placeholder="选择市">
                                </el-input>
                                <el-input class="areaDrop" placeholder="选择区">
                                </el-input>
                                <!-- <el-input class="areaEntry" placeholder="街道办地址"></el-input> -->
                            </div>
                        </div>

                        <div class="bgcolor">
                            <label>负责人</label>
                            <el-input placeholder="" class="manager" v-model='dataItem.manager'></el-input>
                        </div>
                        <div class="bgcolor">
                            <label>电话</label>
                            <el-input placeholder="" v-model='dataItem.phone'></el-input>
                        </div>
                        <div class="bgcolor">
                            <label>Email</label>
                            <el-input placeholder="" v-model='dataItem.email'></el-input>
                        </div>
                        <div class="bgcolor">
                            <label>传真</label>
                            <el-input v-model='dataItem.fax'> </el-input>
                        </div>
                        <div class="bgcolor">
                            <label>地址</label>
                            <el-input v-model='dataItem.stockAddress'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>备注</label>
                            <el-input placeholder="" v-model='dataItem.remark'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>状态</label>
                            <el-select class="status" v-model='dataItem.status'>
                                <el-option v-for="item in statusArray" :key="item.itemValue" :value="item.itemValue" :label="item.itemName"></el-option>
                            </el-select>
                        </div>
                    </el-col>    
                </el-row>
            </div>
        </el-collapse-transition>
        <el-row class="ft12 pr10 pt10 br3 bg-white">
            <el-col :span='24' class="pl10 mb10 bb1">
                <span class="header-title">送货信息</span>
            </el-col>

            <el-col :span="24" class="bg-white pl10 mb10">
                <button class="erp_bt bt_add" @click="addRecord()">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">增行</span>
                </button>
                
                <button class="erp_bt bt_del" >
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_del.png">
                    </div>
                    <span class="btDetail">删除</span>
                </button>

                <button class="erp_bt bt_excel">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_excel.png">
                    </div>
                    <span class="btDetail">Excel</span>
                </button>

                <button class="erp_bt bt_auxiliary">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_auxiliary.png">
                    </div>
                    <span class="btDetail">辅助功能</span>
                </button>
            </el-col>
            <el-col>
            <Table :methodsUrl="httpUrl" :cols="column" :HttpParams="HttpParams" :hasPagination="hasPagination" :isDisable='isDisable' :tableName="tableModel" :mutiSelect="mutiSelect"  :command="command"></Table>
            </el-col>
        </el-row>

        <el-row class="ft12 pr10 pt10 br3">
            <el-col :span='24' class="bg-white pl10 pt10 pb10">
                <span style="color:black;font-size:16px;font-weight:bolder;">审计信息</span>
            </el-col>

            <el-col :span="24" class="bg-white pb10">   
                <div>
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="dataItem.createdBy" ></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-date-picker  type="date" placeholder="" disabled="disabled" v-model="dataItem.createdTime" ></el-date-picker>
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="dataItem.modifiedBy" ></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-date-picker type="date" placeholder="" disabled="disabled" v-model="dataItem.modifiedTime" ></el-date-picker>
                    </div>
                </div> 
            </el-col>
        </el-row>
  </div>
</template>

<script>
import Table from '../../base/Table/Table'
    export default{
        name:'repositoryModify',
        data(){
            return{
                changeTimes:0,//数据变化统计
                dataItem:{
                    ouId:'',//所属组织
                    stockCode:'',//仓库编码
                    stockName:'',//仓库名称
                    stockFullName:'',//仓库全称
                    mnemonic:'',//助记码
                    stockTypeId:'',//仓库类型
                    opAreaId_AreaName:'',//业务地区
                    adAreaId:'',//行政地区
                    manager:'',//负责人
                    phone:'',//电话
                    email:'',//邮箱
                    fax:'',//传真
                    stockAddress:'',//仓库地址
                    remark:'',//备注
                    status:'',//状态
                    createdBy:'',//创建人
                    createdTime:'',//创建时间
                    modifiedBy:'',//修改人
                    modifiedTime:'',//修改时间
                },
                subData:[],//从表信息
                httpUrl:{
                    Initial:'/api/services/app/StockAddressManagement/GetAllByStockId',
                    delete:'/api/services/app/StockAddressManagement/Delete',
                },
                column:[{//表格列配置
                        prop: 'contactPerson',
                        label: '联系人',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                        flag:true,//更改标识
                    },{
                        prop: 'moblie',
                        label: '手机',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'phone',
                        label: '电话',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'completeAddress',
                        label: '送货地址',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'transportMethodId',
                        label: '运输方式',
                        controls:'select',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'logisticsCompanyId',
                        label: '物流公司',
                        controls:'select',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                        dataSource:[],
                    },{
                        prop: 'isDefault',
                        label: '默认',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },{
                        prop: 'remark',
                        label: ' 备注',
                        controls:'text',
                        required:true,
                        isFix:"",
                        width:"auto",
                        isDisable:false,
                        sortable:false,
                    },],
                isDisable:false,
                tableModel:'storeHouseModify',
                mutiSelect:true,
                command:[{
                    text:'删除',
                    class:'blue'
                }],
                hasPagination:false,
                HttpParams:{
                    Id:this.$route.params.id
                },
                OuArray:[],//组织单元集合
                statusArray:[],//状态集合
                logisticsArray:[],//物流公司集合
                selectOuProps:{//组织单元树形
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                ouItem:{//组织单元select模拟选择数据
                    id:'',
                    ouName:'',
                },
                //logisticsCompanyDictName:'logisticsCompany'
                
            }
        },
        beforeMount(){
            //this.logisticsArray=this.$store.commit('Init_dataSource',this.logisticsCompanyDictName);
        },
        created(){
            this.loadSelect();
            this.InitModify();
        },
        mounted:function(){
            
        },
        computed:{
            countOu () {
                return this.ouItem;
            },
        },

        watch:{
           
        },  
        methods:{
            back(){
                this.$store.state.url='/storeHouse/storeHouseList/default'
           		this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            InitModify(){//查看详情(获取主表信息)
                let _this=this;
                if(_this.$route.params.id=="default"){
                    return;
                }else{
                    _this.$axios.gets('/api/services/app/StockManagement/Get',{Id:_this.$route.params.id}).then(function(res){
                        _this.dataItem.changeTimes=0;
                        _this.dataItem.ouId=res.result.ouId;//所属组织
                        _this.dataItem.stockCode=res.result.stockCode;//仓库编码
                        _this.dataItem.stockName=res.result.stockName;//仓库名称
                        _this.dataItem.stockFullName=res.result.stockFullName;//仓库全称
                        _this.dataItem.mnemonic=res.result.mnemonic;//助记码
                        _this.dataItem.stockTypeId=res.result.stockTypeId;//仓库类型
                        _this.dataItem.opAreaId_AreaName=res.result.opAreaId_AreaName;//业务地区
                        _this.dataItem.adAreaId=res.result.adAreaId;//行政地区
                        _this.dataItem.manager=res.result.manager;//负责人
                        _this.dataItem.phone=res.result.phone;//电话
                        _this.dataItem.email=res.result.email;//邮箱
                        _this.dataItem.fax=res.result.fax;//传真
                        _this.dataItem.stockAddress=res.result.stockAddress;//仓库地址
                        _this.dataItem.remark=res.result.remark;//备注
                        _this.dataItem.status=res.result.status;//状态
                        _this.dataItem.createdBy=res.result.createdBy;//创建人
                        _this.dataItem.createdTime=res.result.createdTime;//创建时间
                        _this.dataItem.modifiedBy=res.result.modifiedBy;//修改人
                        _this.dataItem.modifiedTime=res.result.modifiedTime;//修改时间
                                       
                    })
                }
                 
            },
            loadSelect:function(){
                let _this = this;
                //所属组织
                _this.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                    _this.OuArray = res.result;
                    _this.loadIcon();
                });              
                //状态
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                    _this.statusArray = res.result;
                });
                 //物流公司
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'logisticsCompany'}).then(function(res){
                    _this.column[5].dataSource=res.result;
                })
            },
            loadIcon(){//树节点图标
                let _this=this;
                _this.$nextTick(function (){
                    $('.preNode').remove();   
                    $('.el-tree-node__label').each(function(){
                        if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
                            $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
                        }else{
                            $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
                        }
                    })
                })
            },
            ouNodeClick:function(data){//组织单元树节点选择
                let _this = this;
                _this.dataItem.opAreaId = '';
                _this.opItem.areaName = '';
                _this.ouItem.id = data.id;
                _this.ouItem.ouName = data.ouName;
                _this.$nextTick(function(){
                    $('#ou_confirmSelect').click()
                })
            },
            addRecord(){//新增行
                let newCol ={
                    id:'',
                    completeAddress: "",
                    stockId: 0,
                    addressId: 0,
                    transportMethodId: '',
                    contactPerson: "",
                    phone: "",
                    moblie: "",
                    logisticsCompanyId: '',
                    isDefault: false,
                    remark: ''
                };
                let newArrayLength=this.$store.state[this.tableModel+'NewColArray'].length;
                if(newArrayLength>2){
                    this.$message({
                        type: 'info',
                        message: '请先编辑保存新增项'
                    });
                }else{
                    this.$store.commit('setIfDel',false)//重置修改参数
                    this.$store.dispatch('addCol',newCol);//表格行内新增
                } 
            }
            
        },
        components:{
            Table
        }
        
    }
</script>

<style scoped>
.res-modify{
    background: #EEF1F5;
    height: auto;
    width: 100%;
}
.bg-white{
    background: white;
}
.pl10{
    padding-left: 10px;
}
.pl40{
    padding-left: 40px;
}
.ml15{
    margin-left: 15px;
}
.ml10{
    margin-left: 10px;
}
.mt10{
    margin-top: 10px;
}
.mt20{
    margin-top: 20px;
}
.mb10{
    margin-bottom: 10px;
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
.ft12{
    font-size: 14px;
}
.btn{
    display: inline-block;
    width: 100%;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: white;
    background: rgba(130, 170, 252, 1);
    cursor: pointer;
}
.br3{
    border-radius: 3px;
}
.h30{
    height: 32px;
    line-height: 30px;
}
.h35{
    height: 35px;
    line-height: 35px;
}
.input-need{
    border:none;
    outline: none;
    width: 100%;
    height: 23px;
    line-height: 23px;
}
.input-bgw{
    background: white;
    text-align: center;
}
.input-bgp{
    background: #FAFAFA;
    text-align: center;
}
.header-title{
    color: #333333;
    font-size: 16px;
    display: inline-block;
    border-bottom: 2px solid rgb(51, 204, 204);
    font-weight: bolder;
    padding: 5px 1px;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.b1{
    border: 1px solid #cccccc;
}
.fr{
    float: right;
}
.toggle-btn{
    cursor: pointer;
    font-size: 12px;
    float: right;
    margin-right: 20px;
    height: 36px;
    line-height: 36px;
}

</style>
<style>
.res-modify .bgw .el-input__inner{
    text-align:center;
    border:none;
    background-color:white;
}
.res-modify .bgp .el-input__inner{
    text-align:center;
    border:none;
    background-color:#FAFAFA;
}
.res-modify .display_block{
    margin-bottom:5px;
}
.res-modify .area{
    width:510px;
    margin-right:0px;
}
.el-select.areaDrop,.el-input.areaEntry{
    width: 136px;
}
.areaDrop input,.areaEntry input{
    border: none!important;
}
.areaDrop .el-input__inner,.areaEntry .el-input__inner{
    height: 32px!important;
}
</style>



