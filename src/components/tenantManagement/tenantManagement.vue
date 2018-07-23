<template>
    <div class="tenant-management-wrapper commodity" >
        
        <el-row  id="pbu"  class="border-left">
            <el-col :span='24' >
                <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                <el-row class="pt10  table-width" >

                    <el-col :span='24' class="">
                        <el-table :data="tableData" @selection-change="handleSelectionChange"  border style="width: 100%" stripe>
                            <el-table-column type="selection" >
                            </el-table-column>
                            <el-table-column prop="adAreaId" label="租户编码" ></el-table-column>
                            <el-table-column prop="tenantName" label="租户名称">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small"  >{{scope.row.tenantName}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
                            <el-table-column prop="regTime" label="启用年月"></el-table-column>
                            <el-table-column prop="remark" label="行政地区"></el-table-column>
                            <el-table-column prop="status" label="当前状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status=='启用'" style="color:#39CA77;">启用</span>
                                    <span v-else-if="scope.row.status=='停用'" style="color:#FF6666;">停用</span>
                                    <span v-else >冻结</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="see(scope.row)"  >查看</el-button>
                                    <el-button  type="text" size="small" v-on:click="handleDel(scope.row,scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>  
                        <el-pagination style="margin-top:20px;" class="text-right" background layout="total, prev, pager, next"  :page-count="totalPage" ></el-pagination>   
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
                    value: 0,
                    label: '启用'
                    },{
                    value: 2,
                    label: '停用'
                }],
                bottonbox:{
                    url: '/tenant/tenantManagementAdd',
                   botton:[{
                    class: 'erp_bt bt_add',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增'
                },{
                    class: 'erp_bt bt_del',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除'
                },{
                    class: 'erp_bt bt_print',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_modify.png',
                    text: '打印'
                },{
                    class: 'erp_bt bt_excel',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_excel.png',
                    text: 'Excel'
                },{
                    class: 'erp_bt bt_version',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_start.png',
                    text: '启用'
                },{
                    class: 'erp_bt bt_auxiliary',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_stop.png',
                    text: '停用'
                }]},
                value: '',
                SelectionChange:[],
                tableData: [],
                idArray:{
                    ids:[]
                },
                    page:1,//当前页
                    eachPage:10,
                    pageIndex:-1,//分页的当前页码
			        totalPage:100,//当前分页总数
            }
        },
        created:function(){
            let _this=this;
            _this.loadTableData();
            
        },
        mounted:function(){   
            let content1=document.getElementById('pbu');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            handleSelectionChange(val) {//点击复选框选中的数据
                this.SelectionChange=val;   
            },
            Init(){//数据初始化
                this.isCancel=false;
                this.isUpdate=false;
                this.isAdd=false;
                this.updateArray=[];
                this.addArray=[];
                this.updateId="";
            },
            loadTableData(){//表格
                 let _this=this;
                 _this.tableLoading=true;
                _this.$axios.gets('http://192.168.100.107:8085/api/services/app/TenantManagement/GetAll',{SkipCount:(_this.page-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){ 
                    _this.tableData=res.result.items;
                    let countPage=res.result.totalCount;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage);
                    _this.Init();
                    for(let i=0;i<_this.tableData.length;i++){status
                       _this.tableData[i].regTime= _this.tableData[i].regTime.substr(0,7)
                        
                        if(_this.tableData[i].status == 0){
                           _this.tableData[i].status= '启用'
                        }else{
                          _this.tableData[i].status= '停用'  
                        }
                    }
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
            handleDel(row,index){//行内删除
                let _this=this;
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                        _this.$axios.deletes('http://192.168.100.107:8085/api/services/app/TenantManagement/Delete',{Id:row.id}).then(function(res){
                            _this.loadTableData();
                            _this.open('删除成功','el-icon-circle-check','successERP');              
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                });
                
                //this.tableData.splice(index,1);
            },
            see(row){
                this.$store.state.url='/tenant/tenantManagementAdd/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            btmlog:function(data){
                let _this=this;
                if(data=='删除'){
                    for(let i in _this.SelectionChange){
                        _this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    if(this.idArray.ids.length>0){
                        this.$confirm('确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                        }).then(() => {
                            _this.$axios.posts('http://192.168.100.107:8085/api/services/app/TenantManagement/BatchDelete',_this.idArray).then(function(res){
                                _this.loadTableData();
                                _this.open('删除成功','el-icon-circle-check','successERP');    
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                    });
                    }
                }else if(data=='停用' || data=='启用'){
                    let handleArray=[];
                    let nb = null;
                    if(data=='停用'){
                        nb=2;
                    }else{
                        nb=0;
                    }
                    for(let o in this.SelectionChange){
                        this.updateArray.push(this.SelectionChange[o].id)
                        handleArray.push(this.SelectionChange[o].id)
                    }
                    for(let i in handleArray){
                        for(let j in this.tableData){
                            if (handleArray[i]==this.tableData[j].id){
                                this.tableData[j].status=nb;
                            }
                        }
                    }
                    if(_this.updateArray.length==1){//单条修改

                        let updataIndex=-1;
                        for(let i in _this.tableData){
                            if(_this.updateArray[0]==_this.tableData[i].id){
                                updataIndex=i;
                            }
                        }
                        console.log(_this.tableData[updataIndex])
                        _this.$axios.puts('http://192.168.100.107:8085/api/services/app/TenantManagement/Update',_this.tableData[updataIndex]).then(function(res){
                            _this.loadTableData(); 
                        });
                    }
                    // else{//批量修改
                    //     _this.$axios.posts('http://192.168.100.107:8085/api/services/app/TenantManagement/Update',_this.tableData).then(function(res){
                    //         _this.loadTableData();
                    //         // _this.open('保存商品品牌成功','el-icon-circle-check','successERP');    
                    //         _this.isAdd=false
                    //     }); 
                    // }
                }            
            },

        },
        components:{
        }
    }
</script>

<style scoped>
.store-data-wrapper{
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
.search-btn{
    display: inline-block;
    width: 87px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: #4A6997;
    color: white;
    cursor: pointer;
}
.open{
    display: inline-block;
    width: 49px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #cccccc;
    color: #cccccc;
    text-align: center;
    cursor: pointer;
}
</style>

<style>
.tenant-management-wrapper .el-input__inner{
    border: none;
}
/*.tenant-management-wrapper .el-input input{
    border:none;
    height: 30px;
    line-height: 30px;
    padding-left: 0;
}*/
/* 重写checkbox */
/*.tenant-management-wrapper .el-checkbox__inner{
    width: 24px;
    height: 24px;
    border-radius:50% !important; 
}
.tenant-management-wrapper .el-checkbox__inner::after{
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
}*/

/* 重写el-table样式 */
.tenant-management-wrapper .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.tenant-management-wrapper .el-table td{
    padding: 3px 0;
}
.tenant-management-wrapper .el-table__body{
    text-align: center;
}
</style>