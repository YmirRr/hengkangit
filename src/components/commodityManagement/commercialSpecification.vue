<template>
    <div class="commercialSpecification commodity" >
        <div id="left-box" class="left-box" >
        <el-row class="bg-white" v-show="ifWidth">
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
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                <label>规格编码</label>
                       </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bgcolor smallBgcolor" style="margin-top:20px">
                        <el-input placeholder="" v-model="searchItem.specCode"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" >
                                <label>规格名称</label>
                       </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bgcolor smallBgcolor" >
                        <el-input placeholder="" v-model="searchItem.specName" ></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" >
                                <label>控件类型</label>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bgcolor smallBgcolor">
                            <el-select  v-model="searchItem.controlType" clearable filterable>
                            <el-option  v-for="item in controlTypeoptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>

                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" >
                                <label>状态</label>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bgcolor smallBgcolor">
                            <el-select  v-model="searchItem.status" clearable filterable>
                            <el-option  v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>

                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="8"><div class="height1"></div></el-col>
                    <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                        <span class="search-btn" style="float:left;margin-left:10px;" @click="search()" >查询</span>
                    </el-col>
                </el-row>
            </el-col>
            </el-row>
        </div>
        <div id="bs" style="float:left;">
            <el-row  >
                <el-col :span="24" class="border-left" id="bg-white">
                    <el-col :span="ifWidth?0:2" class="search-block">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>
                            <span class='open-search'>+</span>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22" > 
                        <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                    </el-col>
                        <el-col :span="24" class="" style="display">
                            <el-table :data="tableData" border @row-click="rowClick" class="text-center" @selection-change="handleSelectionChange">
                                <el-table-column prop="name" type="selection" label="" >
                                </el-table-column>
                                <el-table-column prop="specCode" label="规格编码">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="modify(scope.row)"   >{{tableData[scope.$index].specCode}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="specName" label="规格名称">
                                    <template slot-scope="scope">
                                        <el-button type="text"  @click="modify(scope.row)"  >{{tableData[scope.$index].specName}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="状态" >
                                    <template slot-scope="scope">
                                        <el-button type="text" class="startusing" v-if="tableData[scope.$index].status == 1" >启用</el-button>
                                        <el-button type="text" class="blockup" v-else >停用</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="controlType" label="控件类型">
                                </el-table-column>
                                <el-table-column prop="seq" label="显示顺序">
                                </el-table-column>
                                <!-- <el-table-column prop="isSystem" label="必填" width="">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="tableData[scope.$index].isSystem" disabled="disabled" ></el-checkbox>
                                    </template>
                                </el-table-column> -->
                                <el-table-column prop="address7" label="备注" width="">
                                </el-table-column> 
                                <el-table-column prop="address8" label="操作" width="">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="modify(scope.row)"  >查看</el-button>
                                        <el-button type="text" size="small" @click="handleDel(scope.row,scope.$index)"  >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        

                        <el-pagination
                         style="margin-top:20px;" 
                         class="text-right" 
                         background layout="total, prev, pager, next" 
                         @current-change="handleCurrentChange" :current-page.sync="currentPage"
                         :page-count="totalPage"
                          >
                         </el-pagination> 
                          
                        </el-col>


                </el-col>
            </el-row> 
        </div>
        <!-- dialog是否删除提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">确认删除？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font yes" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font no" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog --> 
    </div>
</template>

<script>
    import Query from '../../base/query/query'
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
                currentPage:1,
                dialogUserConfirm:false,//用户删除保存提示信息
                searchItem:{
                    specCode:'',//规格编码
                    specName:'',//规格名称
                    controlType: '',//控制类型
                    status: '',//状态
                    SkipCount:'',
                    MaxResultCount: ''
                }, 
                bottonbox:{
                    url: '/commercial/commercialSpecificationDetails',
                   botton:[{
                    class: 'erp_bt bt_add',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    increased: true
                },{
                    class: 'erp_bt bt_del',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    increased: true
                },{
                    class: 'erp_bt bt_audit',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    text: '审核',
                    increased: true
                },{
                    class: 'erp_bt bt_in',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_in.png',
                    text: '导入',
                    increased: true
                },{
                    class: 'erp_bt bt_out',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    text: '导出',
                    increased: true
                }]},
                controlTypeoptions:[{
                    value: 0,
                    label: '下拉'
                },{
                    value: 1,
                    label: '手工录入'
                }],
                statusoptions:[{
                    value: 0,
                    label: '启用'
                },{
                    value: 1,
                    label: '停用'
                }],
                isSystemoptions:[{
                    value: true,
                    label: '必填'
                },{
                    value: false,
                    label: '不必填'
                }],
                value: '',
                tableData: [],
                SelectionChange:[],
                pageIndex:-1,//分页的当前页码
                 currentPage:1,//分页的当前页码
                totalPage:100,//当前分页总数
                eachPage:10,//每页有多少条信息
                page:1,//当前页
                updateId:'',
                isData: true,
                hangid:''
            }
        },
        created:function(){    
            this.loadTableData();
        },
        mounted:function(){
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            closeLeft:function(){
                let self = this;
                self.ifWidth = false;
                let obgh=document.getElementById('bs');
                obgh.style.width="100%";
            },
            openLeft:function(){
               let self = this;
               self.ifWidth = true;
               let obgh=document.getElementById('bs');
                obgh.style.width="calc(100% - 340px)";
            },
            btmlog:function(data){
                if(data == '删除'){
                    let _this=this;
                        if(_this.SelectionChange.length==0){
                            _this.$message({
                                type: 'info',
                                message: '请勾选需要删除的记录！'
                            });

                        }else{
                                _this.dialogUserConfirm=true;
                           

                        }
                    }
                },
            
            loadTableData(){
                let _this=this;
                _this.$axios.gets('/api/services/app/SpecManagement/GetAll',{SkipCount:(_this.currentPage-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){
                    _this.tableData=res.result.items;
                    function compare(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                        }
                        _this.tableData.sort(compare('seq'));
                    for(let i=0;i<_this.tableData.length;i++){
                        if(_this.tableData[i].controlType == 0){
                           _this.tableData[i].controlType = '手工录入' 
                        }else{
                            _this.tableData[i].controlType = '下拉'
                        }
                    }
                    let countPage=res.result.totalCount;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage);
                })
            },
            handleCurrentChange:function(val){//获取当前页码,分页

                let _this = this;
                this.currentPage=val;
                if(_this.isData){
                    this.loadTableData();
                }else{
                    this.search(true);
                }
                
                
            },
            sureAjax(){
                let _this=this;
                 let delAarry={
                    "ids":[]
                }
                for(let i in _this.SelectionChange){
                    delAarry.ids.push(_this.SelectionChange[i].id)
                }
                // console.log(delAarry.ids.length)
                if(delAarry.ids.length==1){//单条删除
                    // console.log(delAarry.ids[0])
                    _this.$axios.deletes('/api/services/app/SpecManagement/Delete',{Id:delAarry.ids[0]}).then(function(res){
                        _this.loadTableData();
                        _this.dialogUserConfirm=false;
                        _this.open('删除成功','el-icon-circle-check','successERP');    
                    },function(res){
                                    console.log(res) 
                                    _this.open('删除失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    console.log(res) 
                                })
                }else if(delAarry.ids.length > 1){//批量删除
                    
                     _this.$axios.posts('/api/services/app/SpecManagement/BatchDelete',delAarry).then(function(res){
                        _this.loadTableData();
                        _this.dialogUserConfirm=false;
                        _this.open('删除成功','el-icon-circle-check','successERP');    
                    },function(res){
                                    console.log(res) 
                                    _this.open('删除失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    console.log(res) 
                                })
                }else{
                     _this.$axios.deletes('/api/services/app/SpecManagement/Delete',{Id:_this.hangid}).then(function(res){
                        _this.loadTableData();
                        _this.dialogUserConfirm=false;
                        _this.open('删除成功','el-icon-circle-check','successERP');              
                    },function(res){
                                    console.log(res) 
                                    _this.open('删除失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    console.log(res) 
                                })
                }       
            },
            handleDel(row,index){//行内删除
                this.dialogUserConfirm=true;
                this.hangid=row.id
            },
            search(bue){
                let _this=this;
                _this.isData =false;
                _this.searchItem.SkipCount= (_this.currentPage-1)*_this.eachPage;
                _this.searchItem.MaxResultCount = _this.eachPage;
                _this.$axios.gets('/api/services/app/SpecManagement/GetListByCondition',_this.searchItem).then(function(res){
                    _this.tableData=res.result.items; 
                    for(let i=0;i<_this.tableData.length;i++){
                        
                        if(_this.tableData[i].controlType == 0){
                           _this.tableData[i].controlType = '手工录入' 
                        }else{
                            _this.tableData[i].controlType = '下拉'
                        }
                    }
                    let countPage=res.result.totalCount;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage);                  
                })
            },
            modify(row){//查看编辑
                this.$store.state.url='/commercial/commercialSpecificationDetails/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
            },
            handleSelectionChange(val) {//点击复选框选中的数据
                this.SelectionChange=val;
            },
            rowClick(row){//获取行id
                this.updateId=row.id
            },
            open(tittle,iconClass,className) {//提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
        },
        components:{
            Query
        }
    }
</script>

<style scoped>
.blockup{
    color: rgb(255, 102, 102);
}
.startusing{
    color: rgb(57, 202, 119);
} 
.commercialSpecification .fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
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
.commercialSpecification .fs12{
    font-size: 12px;
}
.commercialSpecification .open{
    display: inline-block;
    width: 49px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #cccccc;
    color: #cccccc;
    text-align: center;
    cursor: pointer;
}
.commercialSpecification .pl15{
    padding-left: 15px;
}
.commercialSpecification .search-btn{
    font-size: 12px;
    display: inline-block;
    width: 87px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: #4A6997;
    color: white;
    cursor: pointer;
}
.commercialSpecification .smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;   
}
.commercialSpecification .bgcolor label{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100% !important ;
    margin-right: 0; 
}
.commercialSpecification .smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.commercialSpecification .smallBgcolor .el-input{
    width: 100% !important ;
    margin-right: 10px;
    margin-left: 10px;
}
.commercialSpecification .bgcolor{
    overflow:  visible; 
}
.commercialSpecification .bg-white{
    background: white;
    border-radius: 3px;
} 
.commercialSpecification .h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.border-left{
    border-left: 1px solid #E4E4E4;
}
#bs{
    width: calc(100% - 340px);
}
</style>

<style>
.commodity .no{
    background-color: blue !important;
}
.commercialSpecification .smallBgcolor .el-input input{
    height: 28px !important;
}
.commercialSpecification .bgcolor{
    width: 100%;
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
</style>