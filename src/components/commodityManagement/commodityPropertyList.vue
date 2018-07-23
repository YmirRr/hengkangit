<template>
    <div class="commodityProperty commodity" >
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
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                <label>属性编码</label>
                       </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="smallBgcolor" style="margin-top:20px">
                        <el-input  v-model="search.PropertyCode"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" >
                                <label>属性名称</label>
                       </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="smallBgcolor" >
                        <el-input  v-model="search.PropertyName"></el-input>
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
                            <el-select  v-model="search.ControlType" clearable filterable>
                            <el-option  v-for="item in ControlTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>

                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="bgcolor smallBgcolor" >
                                <label>必填</label>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bgcolor smallBgcolor">
                            <el-select  v-model="search.Required" clearable filterable>
                            <el-option  v-for="item in RequiredOptions" :key="item.value" :label="item.label" :value="item.value">
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
                            <el-select  v-model="search.Status" clearable filterable>
                            <el-option  v-for="item in StatusOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>

                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="height1"></div>
                    </el-col>
                    <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                        <span class="search-btn" style="float:left;margin-left:10px;" @click="query()">查询</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        </div>
        <div id="cp" style="float:left">
        <el-row style="">
            <el-col  class="border-left" :span="24" id="bg-white">
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
                
                <div style="min-width:200px;width:200px;float:left;">
                    <el-col :span='24' class="tree-container pl10 pt10">
                        <el-tree 
                        :data="classTree"  
                        
                        :props="defaultProps"
                        ref="tree"
                        :expand-on-click-node="false"
                        @node-click="TreeNodeClick"
                        :render-content="renderContent_componyTree"
                        v-loading="treeLoading" 
                        :highlight-current="true"
                        node-key="id"
                        :default-expanded-keys="expandId"
                        :filter-node-method="filterNode"
                        ></el-tree>
                    </el-col>
                </div>
                 <el-row class="table-width pt10 pr10 pb10" style="float:left">
                    <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                         <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%" class="text-center">
                            <el-table-column fixed type="selection" label="" width="50">
                            </el-table-column>
                            <el-table-column fixed prop="propertyCode" label="属性编码">
                                <template slot-scope="scope">
                                    <el-button type="text"   @click="modify(scope.row)" >{{tableData[scope.$index].propertyCode}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed prop="propertyName" label="属性名称">
                                <template slot-scope="scope">
                                    <el-button type="text"   @click="modify(scope.row)" >{{tableData[scope.$index].propertyName}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="">
                                <template slot-scope="scope">
                                    <el-button type="text" class="startusing" v-if="tableData[scope.$index].status == 0" >启用</el-button>
                                    <el-button type="text" class="blockup" v-else >停用</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="controlType" label="控件类型">
                            </el-table-column>
                            <el-table-column prop="seq" label="显示顺序">
                            </el-table-column>
                            <el-table-column prop="required" label="必填" width="">
                                <template slot-scope="scope">
                                    <el-checkbox  v-model="tableData[scope.$index].required" disabled></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address7" label="备注" width="">
                            </el-table-column> 
                            <el-table-column fixed="right" prop="address8" label="操作" width="">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="modify(scope.row)"  >查看</el-button>
                                    <el-button v-on:click="handleDel(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    <el-pagination
                     style="margin-top:20px;" 
                     class="text-right" 
                     @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="total, prev, pager, next"  :page-count="totalPage" >
                     </el-pagination>   
                    </el-col> 
                </el-row>

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
                <button class="dialog_footer_bt dialog_font" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font no" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog错误信息提示 -->
        <!-- dialog是否删除提示 -->
        <el-dialog :visible.sync="dialogUserConfirm1" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">该属性树，暂只需支持2级属性</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" style="width:100%;" @click="dialogUserConfirm1 = false;">确 认</button>
            </span>
        </el-dialog>
        <!-- dialog错误信息提示 -->
        <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">数据提交有误!</p>
                </el-col>
                <el-collapse-transition>
                    
                        <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                            <vue-scroll :ops="$store.state.option">
                                <span class="dialog_font">{{response.message}}</span>
                                <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                                <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                            </vue-scroll> 
                        </el-col>
                      
                </el-collapse-transition>   
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">取 消</button>
            </span>
        </el-dialog>   
    </div>
</template>

<script>
import Query from '../../base/query/query'
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
                expandId:[],//默认展开
                dialogUserConfirm1:false,
                treeLoading:false,
                bottonbox:{
                    url: '/commodityProperty/commodityPropertyDetails',
                    Add:true,
                   botton:[{
                    class: 'erp_bt bt_add cacc',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    show:true,
                    detailParentId:'',//tree节点点击获取前往detail新增页上级菜单ID
                    detailParentName:'',//tree节点点击获取前往detail新增页上级菜单name
                    text: '新增',
                    increased: true
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    show:true,
                    text: '删除',
                    increased: true
                },{
                    class: 'erp_bt bt_audit',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    show:true,
                    text: '审核',
                    increased: true
                },{
                    class: 'erp_bt bt_in',
                    imgsrc: '../../../static/image/common/bt_in.png',
                    show:true,
                    text: '导入',
                    increased: true
                },{
                    class: 'erp_bt bt_out',
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    show:true,
                    text: '导出',
                    increased: true
                }]},
                RequiredOptions:[{
                    value: true,
                    label: '必填'
                    }, {
                    value: false,
                    label: '不必填'
                }],
                ControlTypeOptions:[{
                    value: 0,
                    label: '下拉'
                    }, {
                    value: 1,
                    label: '日期'
                    }, {
                    value: 2,
                    label: '手工录入'
                    }, {
                    value: 3,
                    label: '关联档案'
                }],
                StatusOptions:[{
                    value: 0,
                    label: '启用'
                    }, {
                    value: 1,
                    label: '未启用'
                    }],
                search:{
                    PropertyCode:'',
                    PropertyName:'',
                    ControlType:'',
                    Required:'',
                    Status:''
                },
                value: '',
                classTree:  [//类目tree
                    // {areaName:'根目录',id:'0',items:[]},
                ],
                defaultProps: {
                    children:'childNodes',
                    label:'propertyName',
                    id:'id'
                },
                idArray:{
                    ids:[]
                },
                 // 错误信息提示开始
                detail_message_ifShow:false,
                errorMessage:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                // 错误信息提示结束
                choseAjax:'',//存储点击单个删除还是多天删除按钮判断信息
                delarray:[],
                dialogUserConfirm:false,//用户删除保存提示信息
                tableData: [],
                currentPage:1,//分页的当前页码
                eachPage:10,//每页有多少条信息
                totalPage:100,//当前分页总数
                SelectionChange:[],//多选集合
                ifWidth:true,
                tableLoading:true,
                treeLoading:true,
                pageTurning:true,
                pageQuery:false,
                dataId:'',
                rowid: '',
                adddefeated:true,
                Add:true
            }
        },
        created:function(){
            // this.datashop();
            this.loadTableData();
            this.loadTree();
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                 return data.moduleName.indexOf(value) !== -1;
            },
            closeLeft:function(){
                let self = this;
                self.ifWidth = false;
                let obgh=document.getElementById('cp');
                obgh.style.width="100%";
            },
            openLeft:function(){
               let self = this;
               self.ifWidth = true;
               let obgh=document.getElementById('cp');
                obgh.style.width="calc(100% - 340px)";
            },
            modify(row){
                this.$store.state.url='/commodityProperty/commodityPropertyModify/'+row.id;
                this.$router.push({path:this.$store.state.url});
            },
            sureAjax(){
                let _this=this;
                if(_this.choseAjax=='row'){
                    _this.delThis()
                }else if(_this.choseAjax=='rows'){
                    _this.delRow()
                }
            },
            delRow(){
                for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                let _this=this;
                if(_this.idArray.ids.length>0){
                    _this.$axios.posts('/api/services/app/PropertyManagement/BatchDelete',_this.idArray).then(function(res){
                        _this.dialogUserConfirm=false;
                        _this.loadTableData();
                        _this.loadTree();
                        _this.open('删除成功','el-icon-circle-check','successERP'); 
                        _this.bottonbox.botton[0].detailParentId = '';   
                    })         
                }else{
                    _this.dialogUserConfirm=false;
                    _this.errorMessage=true;
                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    _this.open('删除失败','el-icon-error','faildERP');
                    // this.$message({
                    //     type: 'info',
                    //     message: '请勾选需要删除的数据！'
                    // });

                }
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
            btmlog:function(data){
                let _this = this;
                if(data == '删除'){
                    _this.choseAjax = 'rows';
                    _this.dialogUserConfirm=true;
                }else if(data == '新增'){
                    if(_this.adddefeated){
                        if(typeof(_this.bottonbox.botton[0].detailParentId)=='number'){
                            _this.$store.state.url=_this.bottonbox.url +'/'+ _this.bottonbox.botton[0].detailParentId;
                            _this.$router.push({path:_this.$store.state.url})//点击切换路由
                        }else{
                            _this.$store.state.url=`${_this.bottonbox.url}/default`
                            _this.$router.push({path:_this.$store.state.url})//点击切换路由
                        }
                    }else{
                        _this.dialogUserConfirm1 = true;
                    }
                }
            },
            loadTableData(){
                let _this=this;
                _this.tableLoading=true;
                _this.$axios.gets('/api/services/app/PropertyManagement/GetAll',{SkipCount:(_this.currentPage-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){
                    _this.tableData=res.result.items;
                    console.log(res);
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    _this.tableData.sort(compare('seq'));
                    _this.modifyText();
                    console.log(_this.tableData)
                    let countPage=res.result.totalCount;
                    // _this.tableLoading=false;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage); 
                })
                
            },
            delThis(){
                let _this=this;
                this.$axios.deletes('/api/services/app/PropertyManagement/Delete',{Id:_this.rowid}).then(function(res){
                    _this.dialogUserConfirm=false;
                    _this.loadTableData();
                    _this.loadTree();
                    _this.open('删除成功','el-icon-circle-check','successERP');   
                    _this.bottonbox.botton[0].detailParentId = '';           
                },function(res){
                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    _this.dialogUserConfirm=false;
                    _this.errorMessage=true;
                    _this.open('删除失败','el-icon-error','faildERP');
                })
            },
            defauleExpandTree(data,key){
                if(typeof(data[0])!='undefined'
                && data[0]!=null 
                && typeof(data[0][key])!='undefined'
                && data[0][key]!=null
                && data[0][key]!=''){
                    return [data[0][key]]
                }
            },
            loadTree(){//获取tree data
                    let _this=this;
                    _this.treeLoading=true;
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetPropertyTree')
                    .then(function(res){
                        _this.classTree=res;
                        console.log(res)
                        _this.treeLoading=false;
                        _this.expandId=_this.defauleExpandTree(res,'id')
                        // _this.loadIcon();
                },function(res){
                    _this.treeLoading=false;
                })
            },
            TreeNodeClick(data){//树节点点击回调             
                let _this=this;
                _this.tableLoading=true;
                _this.dataId = data;
                _this.bottonbox.botton[0].detailParentId=_this.dataId.id;//
                _this.bottonbox.botton[0].detailParentName=_this.dataId.propertyName;
                _this.$axios.gets('/api/services/app/PropertyManagement/GetListByCondition',{PropertyId:_this.dataId.id,SkipCount:(_this.currentPage-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){                  
                    _this.tableData = res.result.items;
                    _this.modifyText();
                    _this.totalCount=res.result.items.length
                    _this.tableLoading=false;
                    _this.pageQuery = false;
                    _this.pageTurning = false;
                    let arr = '';
                    for(let i=0;i<_this.tableData.length;i++){
                   
                       arr = _this.tableData[i].propertyFullpathId.split('>').length;
                        if(arr > 2 &&  _this.tableData.length == 1){
                            _this.adddefeated = false;
                        }else{
                            _this.adddefeated = true;
                        }
                    }
                    let countPage=res.result.totalCount;
                    // _this.tableLoading=false;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage); 
                },function(res){
                    console.log(res)
                })
            },
            getErrorMessage(message,details,validationErrors){
                let _this=this;
                _this.response.message='';
                _this.response.details='';
                _this.response.validationErrors=[];
                if(details!=null && details){
                    _this.response.details=details;
                }
                if(message!=null && message){
                    _this.response.message=message;
                }
                if(message!=null && message){
                    _this.response.validationErrors=validationErrors;
                }
            },
            handleDel(row,index){//行内删除
                let _this=this;
                _this.choseAjax = 'row';
                _this.dialogUserConfirm=true;
                _this.rowid=row.id;

            },
            handleCurrentChange:function(val){//获取当前页码,分页
                let _this=this;
                _this.currentPage=val;
                
                if(_this.pageTurning){
                    _this.loadTableData();
                }else if(_this.pageQuery){
                    _this.query()
                }else{
                    _this.TreeNodeClick(_this.dataId);   
                }
                
            },
            handleSelectionChange(val){//多选操作
                this.SelectionChange=val;
            },
            datashop(){
                for(var i=0;i<this.tableData.length;i++){
                    this.tableData[i].date=i+1;
                }

            },
            modifyText(){
                let _this=this;
                for(let i=0;i<_this.tableData.length;i++){
                    if(_this.tableData[i].controlType == 0){
                       _this.tableData[i].controlType='下拉' 
                    }else if(_this.tableData[i].controlType == 1){
                       _this.tableData[i].controlType='日期'  
                    }else if(_this.tableData[i].controlType == 2){
                       _this.tableData[i].controlType='手工录入'  
                    }else{
                       _this.tableData[i].controlType='关联档案'  
                    }

                }
            },
            query(){//按条件查询
                let _this=this;
                _this.search.SkipCount = (_this.currentPage-1)*_this.eachPage; 
                _this.search.MaxResultCount = _this.eachPage; 
                _this.$axios.gets('/api/services/app/PropertyManagement/GetListByCondition',_this.search).then(function(res){
                    _this.pageQuery = true;
                    _this.pageTurning = false;
                    _this.tableData = res.result.items; 
                    _this.modifyText();
                    let countPage=res.result.totalCount;
                    // _this.tableLoading=false;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage);                   
                },function(res){
                    console.log(res)
                })
            },
            renderContent_componyTree(h, { node, data, store }){
                if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.propertyName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.propertyName}
                        </span>
                    );
                }
            },
                
                

        },
        components:{
            Query,
            Tree
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
.search-block{
    border-bottom: 1px solid #E4E4E4;
    box-sizing: border-box;
}
.el-tree{
        background-color: transparent;
    }
    .pt10{
        padding-top: 10px;
    }
    .pl10{
        padding-left: 10px;
    }
.ml10{
    margin-left: 10px;
}
.pt10{
    padding-top: 10px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
}
#cp{
    width: calc(100% - 340px);
}
.table-width{
    width: calc(100% - 200px);
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
.fs14{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.349019607843137);
    }
    .fs12{
        font-size: 12px;
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
    .pl15{
        padding-left: 15px;
    }
    .search-btn{
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
    .smallBgcolor .el-select{
        width: 100% !important ;
        margin-left: 10px;   
    }
    .bgcolor label{
        width: 100% !important ;
        margin-right: 0; 
    }
    .smallBgcolor .el-input--suffix{
        width: 100% !important ;
    }
    .smallBgcolor .el-input{
        width: 100% !important ;
        margin-right: 10px;
        margin-left: 10px;
    }
    .bgcolor{
        overflow:  visible; 
    }
    .bg-white{
        background: white;
        border-radius: 3px;
    } 
    .h48{
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #E4E4E4;
    }

</style>

<style>
.no{
        background-color: blue !important;
    }
.commodityProperty .bgcolor{
    width: 100%;
}
.el-checkbox__inner{
    width: 16px ;
    height: 16px ;
    background: #f4f4f5 ;
}
.el-checkbox__inner::after{
    left: 4px ;
    top: -2px ;
}
</style>