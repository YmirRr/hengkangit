<template>
    <div class="specifcationOfGoodsList commodity" >
        <div id="left-box" class="left-box">
        <el-row class="bg-white"  >
            <el-col :span="24">
                <el-col class="h48 pl15 pr15" :span="24">
                    <!-- <el-input
                        placeholder="搜索..."
                        v-model="searchLeft" class="search_input">
                         :fetch-suggestions="querySearchAsync"
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input> -->
                    <!-- <el-autocomplete
                    v-model="searchLeft"
                   
                    class="search_input"
                    placeholder="搜索..."
                    >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-autocomplete> -->
                    <div class="transfer_search" style="width:100%;" >
                        <el-input
                            placeholder="搜索..."
                            v-model="searchTableLeft"
                            class="search_input"
                            >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div> 
                </el-col>
                <el-col :span='24' class="tree-container pl10 pt10">
                    <template>
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(items) in tableTree" :label="items.specName" :key="items.id" :name="items.id.toString()">
                            <el-tree
                                :data="items.classTree1" 
                                :props="defaultProps" 
                                @node-click="handleNodeClick"
                                :expand-on-click-node="false"
                                default-expand-all
                                ref="tree"
                                node-key="id"
                                :filter-node-method="filterNode"
                                :highlight-current="true"
                                >
                            </el-tree>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
                      </el-tabs>
                    </template>
                </el-col>
                
            </el-col>
        </el-row>
        </div>
        <div id="bgz">
        <el-row >
            <el-col :span="24" class="border-left" id="bg-white">
                
                <el-col :span="24">
                    <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                </el-col> 
                
                <el-col :span="24" class=" pb10">
                    <el-table @selection-change="handleSelectionChange" :data="tableData" border style="width: 100%">
                        <el-table-column type="selection" label="" width="60">
                        </el-table-column>
                        <el-table-column prop="specgroupCode" label="规格组编码">
                        </el-table-column>
                        <el-table-column prop="specgroupName" label="规格组名称">
                            <template slot-scope="scope">
                                <el-button type="text"  @click="check(scope.row)" >{{tableData[scope.$index].specgroupName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <el-button type="text" class="startusing" v-if="tableData[scope.$index].status == 1" >启用</el-button>
                                <el-button type="text" class="blockup" v-else >停用</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="categoryId" label="类目">
                            <template slot-scope="scope">
                               <el-select clearable filterable  
                                class="specId"
                                placeholder=""
                                 
                                v-model="scope.row.categoryId" disabled="disabled">
                                    <el-option v-for="item in categoryoptions" :key="item.id" :label="item.categoryName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column prop="address4" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="check(scope.row)" >查看</el-button>
                                <el-button type="text" size="small" @click="handleDel(scope.row,scope.$index)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:20px;" @current-change="handleCurrentChange" :current-page.sync="currentPage"   class="text-right"  background layout="total, prev, pager, next"  :page-count="totalPage" >
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
                <button class="dialog_footer_bt dialog_font" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog --> 
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
                    <p class="dialog_font dialog_body_message">{{response.message}}</p>
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
                <button style="width:100%" class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="errorMessage = false">确 认</button>
            </span>
        </el-dialog>
        <!-- dialog --> 
    </div>
</template>

<script>
import Query from '../../base/query/query'
import Tree from '../../base/tree/tree'
    export default{
        name:'customerInfor',
        data(){
            return {
                search:{
                    PropertyCode:'',
                    PropertyName:'',
                    ControlType:'',
                    Required:'',
                    Status:''
                },
                searchLeft:'',
                activeName: '',
                errorMessage: false,
                detail_message_ifShow:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                dialogUserConfirm:false,//删除提示
                ifWidth:true,
                bottonbox:{
                    url: '/specification/specificationOfGoodsDetails',
                   botton:[{
                    class: 'erp_bt bt_add',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    show:true,
                    increased: true,
                    detailParentId:'',//tree节点点击获取前往detail新增页上级菜单ID
                    detailParentName:'',//tree节点点击获取前往detail新增页上级菜单name
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_out',
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    text: '导出',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_version',
                    imgsrc: '../../../static/image/common/bt_start.png',
                    text: '启用',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_stop.png',
                    show:true,
                    text: '停用',
                    increased: true
                }]},

                value: '',
                tableData: [],//表格数据
                tableTree:[],
                classTree: [],
                defaultProps: {
                    children:'childNodes',
                    label:'specgroupName',
                    id:"id" 
                },
                componyTree:[],
                categoryoptions:[],
                isbanduan:true,
                searchTableLeft:'',
                currentPage:1,//分页的当前页码
                pageIndex:-1,//分页的当前页码
                totalPage:0,//当前分页总数
                hangid:'',
                activeid: '',
                eachPage: 10,
                SelectionChange:'',
                arrbiaoge:[],
                moreamend:{
                    createList:[],
                    updateList:[]
                },
                delAarrycontent:{
                    ids:[]
                }
            }
        },
        created:function(){ 
            let _this=this;
            _this.loadTree(); 
            _this.categorylaber();  
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        watch:{
            searchTableLeft:function(){
                 let _this = this;
                _this.tableData = _this.arrbiaoge;
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft);
                $.each(_this.tableData,function(index,val){
                    let str=val.specgroupName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val);
                        console.log(newJson)
                    }
                })
                _this.tableData = newJson;
                for(let i=0;i<_this.tableTree.length;i++){
                    _this.tableTree[i].classTree1 = newJson;
                }
                _this.loadIcon();
            }
        },
        methods:{
            btmlog:function(data){
                let _this = this;
                if(data == '新增'){

                }else if(data == '删除'){
                    if(_this.SelectionChange.length > 0){
                        _this.dialogUserConfirm = true;
                        // console.log(_this.SelectionChange);
                        for(let i=0;i<_this.SelectionChange.length;i++){
                            for(let j=0;j<_this.delarray.length;j++){
                                if(_this.SelectionChange[i].id == _this.delarray[j].specgroupId){
                                    _this.delAarrycontent.ids.push(_this.delarray[j].id);  
                                }
                            }
                        }
                    }else{
                       _this.$message({
                            type: 'info',
                            message: '请勾选需要删除的数据！'
                        }); 
                    }
                    
                }else if(data == '启用'){
                    if(_this.SelectionChange.length > 0){
                        _this.revisestuate(1);
                    }else{
                       _this.$message({
                            type: 'info',
                            message: '请勾选需要启用的数据！'
                        }); 
                    } 
                }else if(data == '停用'){
                    if(_this.SelectionChange.length > 0){
                        _this.revisestuate(0);
                    }else{
                       _this.$message({
                            type: 'info',
                            message: '请勾选需要停用的数据！'
                        }); 
                    }
                }
            },
            revisestuate(index){
                let _this=this;
                for(let i=0;i<_this.SelectionChange.length;i++){
                    _this.SelectionChange[i].status = index;
                }
                _this.moreamend.updateList = _this.SelectionChange
                _this.$axios.posts('/api/services/app/SpecgroupManagement/CUDAggregate',_this.moreamend).then(function(res){
                    _this.open('修改规格组状态成功','el-icon-circle-check','successERP');
                })
            },
            // searchLeftTable(){
            //     let _this = this;
            //   _this.tableData = _this.arrbiaoge;
            //     let newJson=[];
            //     let patt1 = new RegExp(_this.searchTableLeft);
            //     $.each(_this.tableData,function(index,val){
            //         let str=val.specgroupName;
            //         let result = patt1.test(str);
            //         if(result){
            //             newJson.push(val);
            //             console.log(newJson)
            //         }
            //     })
            //     _this.tableData = newJson;
            //     for(let i=0;i<_this.tableTree.length;i++){
            //         _this.tableTree[i].classTree1 = newJson;
            //     }
            //     _this.loadIcon();
            // },
            loadTree(){
                let _this=this;
                _this.$axios.gets('/api/services/app/SpecManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){
                    let totalCount = res.result.totalCount;
                    if(totalCount > 0){


                        _this.$axios.gets('/api/services/app/SpecManagement/GetAll',{SkipCount:0,MaxResultCount:totalCount}).then(function(res){
                            for(let i=0;i<res.result.items.length;i++){
                                if(res.result.items[i].specgroupEnable == true){

                                    res.result.items[i].classTree1 =[];
                                    _this.tableTree.push(res.result.items[i]);
                                
                                }
                            }
                            // setTimeout(function(){
                                _this.activeName = _this.tableTree[0].id.toString();//激活第一个导航
                                _this.bottonbox.botton[0].detailParentId = _this.tableTree[0].id;//默认新增id为第一个
                                _this.bottonbox.botton[0].detailParentName = _this.tableTree[0].label;
                            // },50) 
                            
                            if(_this.activeid == ''){
                                _this.activeid = parseInt(_this.activeName);
                            }
                            _this.loadTableData(parseInt(_this.activeid));
                        })
                    }
                })
            },
            loadIcon(){
                let _this=this;
                _this.$nextTick(function () {
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
            loadcontent(){
                let _this = this;
                _this.$axios.gets('/api/services/app/SpecgroupContentManagement/GetAll').then(function(res){
                    _this.delarray = res.result.items;
                });
            },
            loadTableData(e){
                let _this=this;
                // _this.$axios.gets('/api/services/app/SpecgroupManagement/GetAll').then(function(res){
                //     console.log(res)
                //     for(let i=0;i<_this.tableTree.length;i++){
                //         _this.tableTree[i].classTree1.splice(0,_this.tableTree[i].classTree1.length)
                //     }
                //     _this.tableData.splice(0,_this.tableData.length);

                //     _this.loadIcon();
                //     for(let i=0;i<_this.tableTree.length;i++){
                //         // _this.tableTree[i].classTree1 = res.result.items
                //         // _this.tableTree[i].classTree1 = res.result.items
                //         for(let j=0;j<res.result.items.length;j++){
                //             if(_this.tableTree[i].id == res.result.items[j].specId){
                //                 _this.tableTree[i].classTree1.push(res.result.items[j]);
                //                 // console.log(_this.tableTree[i].id)
                //                 // _this.tableData.push(res.result.items[j]);  
                //             }
                //             // console.log(res)
                //             if(e == res.result.items[j].specId && _this.isbanduan){
                //                 // console.log(e)
                //                 _this.tableData.push(res.result.items[j]);
                //             }

                //         }
                //         _this.isbanduan = false; 
                //     }
                //     _this.componyTree = res.result.items
                //      _this.loadcontent();  
                // });
                _this.$axios.gets('/api/services/app/SpecgroupManagement/GetListByCondition',{SpecId:e,SkipCount:(_this.currentPage-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){
                    console.log(res)
                    for(let i=0;i<_this.tableTree.length;i++){
                        _this.tableTree[i].classTree1 = res.result.items;
                    }
                    _this.loadIcon();
                    _this.tableData = res.result.items;
                    _this.arrbiaoge = res.result.items;
                    _this.loadcontent();
                    let countPage=res.result.totalCount;
                    // _this.tableLoading=false;
                    _this.totalPage = Math.ceil(countPage/_this.eachPage);  
                })
            },
            categorylaber(){//
                let _this=this;
                _this.$axios.gets('/api/services/app/CategoryManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){
                    console.log(res);
                    let totalCount = res.result.totalCount;
                    if(totalCount>0){
                        _this.$axios.gets('/api/services/app/CategoryManagement/GetAll',{SkipCount:0,MaxResultCount:totalCount}).then(function(res){
                            _this.categoryoptions = res.result.items;
                        })
                    }
                })
            },
            handleSelectionChange(val) {//点击复选框选中的数据
                this.SelectionChange=val;
            },
            handleCurrentChange:function(val){//获取当前页码,分页
                let _this = this;
                this.currentPage=val;
                this.loadTableData(_this.activeid);
            },
            sureAjax(){//按钮删除

                let _this=this;
                let delAarry={
                    "ids":[]
                };
                _this.dialogUserConfirm = false;
                if(_this.hangid != ''){
                    if(_this.delAarrycontent.ids.length > 0){
                        _this.$axios.posts('/api/services/app/SpecgroupContentManagement/BatchDelete',_this.delAarrycontent).then(function(res){
                            _this.open('删除商品规格组内容成功','el-icon-circle-check','successERP');
                            _this.dialogUserConfirm1 = false;
                             _this.$axios.deletes('/api/services/app/SpecgroupManagement/Delete',{Id:_this.hangid}).then(function(res){
                                // console.log(parseInt(_this.activeid))
                                _this.isbanduan = true;
                                _this.loadTableData(parseInt(_this.activeid))
                                
                                _this.dialogUserConfirm=false;
                                _this.open('删除成功','el-icon-circle-check','successERP');              
                            },function(res){
                                console.log(res) 
                                _this.open('删除失败','el-icon-error','faildERP');
                                _this.errorMessage=true;
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                console.log(res) 
                            });
                        },function(res){
                            alert('删除商品规格组失败');
                        })
                    }else{
                        _this.$axios.deletes('/api/services/app/SpecgroupManagement/Delete',{Id:_this.hangid}).then(function(res){
                                // console.log(parseInt(_this.activeid))
                            _this.isbanduan = true;
                            _this.loadTableData(parseInt(_this.activeid))
                            
                            _this.dialogUserConfirm=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');              
                        },function(res){
                            console.log(res) 
                            _this.open('删除失败','el-icon-error','faildERP');
                            _this.errorMessage=true;
                            _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                            console.log(res) 
                        });
                    }    
                 }else{
                    for(let i in _this.SelectionChange){
                        delAarry.ids.push(_this.SelectionChange[i].id)
                    }
                    
                    if(_this.delAarrycontent.ids.length > 0){
                        _this.$axios.posts('/api/services/app/SpecgroupContentManagement/BatchDelete',_this.delAarrycontent).then(function(res){
                            _this.open('删除商品规格组内容成功','el-icon-circle-check','successERP');
                            _this.dialogUserConfirm1 = false;
                            if(delAarry.ids.length==1){//单条删除
                                _this.$axios.deletes('/api/services/app/SpecgroupManagement/Delete',{Id:delAarry.ids[0]}).then(function(res){
                                    _this.isbanduan = true;
                                    _this.loadTableData(_this.activeid)
                                    _this.dialogUserConfirm=false;
                                    _this.open('删除成功','el-icon-circle-check','successERP');    
                                },function(res){
                                    console.log(res) 
                                    _this.open('删除失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors); 
                                })
                            }else if(delAarry.ids.length > 1){//批量删除
                                
                                 _this.$axios.posts('/api/services/app/SpecgroupManagement/BatchDelete',delAarry).then(function(res){
                                    _this.isbanduan = true;
                                    _this.loadTableData(parseInt(_this.activeid))
                                    _this.dialogUserConfirm=false;
                                    _this.open('删除成功','el-icon-circle-check','successERP');    
                                },function(res){
                                    // console.log(res) 
                                    _this.open('删除失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    // console.log(res) 
                                })
                            }
                        },function(res){
                            alert('删除商品规格组失败');
                        })
                    }else{
                        if(delAarry.ids.length==1){//单条删除
                            _this.$axios.deletes('/api/services/app/SpecgroupManagement/Delete',{Id:delAarry.ids[0]}).then(function(res){
                                _this.isbanduan = true;
                                _this.loadTableData(_this.activeid)
                                _this.dialogUserConfirm=false;
                                _this.open('删除成功','el-icon-circle-check','successERP');    
                            },function(res){
                                console.log(res) 
                                _this.open('删除失败','el-icon-error','faildERP');
                                _this.errorMessage=true;
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors); 
                            })
                        }else if(delAarry.ids.length > 1){//批量删除
                            
                             _this.$axios.posts('/api/services/app/SpecgroupManagement/BatchDelete',delAarry).then(function(res){
                                _this.isbanduan = true;
                                _this.loadTableData(parseInt(_this.activeid))
                                _this.dialogUserConfirm=false;
                                _this.open('删除成功','el-icon-circle-check','successERP');    
                            },function(res){
                                // console.log(res) 
                                _this.open('删除失败','el-icon-error','faildERP');
                                _this.errorMessage=true;
                                _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                // console.log(res) 
                            })
                        }
                    }
                 }  
            },
            handleDel(row){//行内删除
                let _this = this;
                this.dialogUserConfirm=true;
                this.hangid=row.id;
                for(let i=0;i<_this.delarray.length;i++){
                    if(row.id == _this.delarray[i].specgroupId){
                        _this.delAarrycontent.ids.push(_this.delarray[i].id);
                    }
                }
                // this.delAarrycontent
            },
            handleClick(tab, event) {
                
                let _this=this;
                let tableTree1=[];
                _this.tableData.splice(0,_this.tableData.length)
                // _this.classTree.splice(0,_this.classTree.length);
                tableTree1 = _this.componyTree;
                _this.isbanduan = true;
               
                _this.bottonbox.botton[0].detailParentId = parseInt(tab.name);
                _this.activeid = parseInt(tab.name)
                 _this.loadTableData(parseInt(tab.name));
                _this.bottonbox.botton[0].detailParentName = tab.label
                // for(let i=0;i<tableTree1.length;i++){
                //     // console.log( tableTree1[i].specId, parseInt(tab.name))
                //     if(tableTree1[i].specId == parseInt(tab.name)){
                        
                //         _this.tableTree[i].classTree1.push(tableTree1[i]);
                //         console.log(_this.tableTree[i].classTree1)
                //     }
                // }
               
                // console.log(tab);
            },
            filterNode(value, data) {
                if (!value) return true;
                 return data.moduleName.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                // console.log(data);
                this.tableData = [];
                this.tableData.push(data);
            },
            check(row){
                this.$store.state.url='/specification/specificationOfGoodsModify/'+row.id;
                this.$router.push({path:this.$store.state.url});
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
        },
        components:{
            Query,
            Tree
        }
    }
</script>

<style scoped>
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
#bgz{
    float: left;
    width: calc(100% - 340px);
    background-color: rgb(249,249,249);
}
.watch{
    float: left;
    width: calc(100% - 200px);
    background-color: #fff;
}
.pr15{
    padding-right: 15px;
} 
.blockup{
    color: rgb(255, 102, 102);
}
.startusing{
    color: rgb(57, 202, 119);
}
</style>

<style>

.specifcationOfGoodsList .el-input--suffix .el-input__inner{
    text-align: center;
    border: none;
    background-color: transparent;
    color:  #444;
}
.specifcationOfGoodsList .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #e4e4e4;
    color: red;
}
.specifcationOfGoodsList .bgcolor{
    width: 100%;
}
</style>