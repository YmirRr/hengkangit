<template>
    <div class="supplierClassifyList-wrapper">
        <el-row class="bg-white">
            <!-- 左侧输入框与树形控件 -->
            <el-col :span="5">
                    <!--<el-col class="h48 pl15 pr15" :span="24">-->
                        <!--&lt;!&ndash; <el-autocomplete-->
                        <!--v-model="searchLeft"-->
                        <!--:fetch-suggestions="querySearchAsync"-->
                        <!--class="search_input"-->
                        <!--placeholder="搜索..."-->
                        <!--&gt; &ndash;&gt;-->

                        <!--<el-input-->
                        <!--placeholder="输入关键字进行过滤"-->
                        <!--v-model="filterText"-->
                        <!--class="search_input">-->
                        <!--</el-input>-->
                        <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                        <!--&lt;!&ndash; </el-autocomplete> &ndash;&gt;-->
                    <!--</el-col>-->
                    <el-col :span='24' class="tree-container" >
                        <!-- 树形控件 -->
                         <!-- <el-tree
                            oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"
                            :highlight-current="true"
                            :data="supplierClasTree"
                            :props="defaultProps"
                            node-key="id"
                            :default-expanded-keys="expandId"
                            ref="tree2"
                            :expand-on-click-node="false"
                            :filter-node-method="filterNode"
                            @node-click="nodeClick"
                            class="filter-tree"
                            > -->
                            <vue-scroll :ops="$store.state.option">
                                <!--<el-tree-->
                                <!--:render-content="renderContent_componyTree"-->
                                <!--:highlight-current="true"-->
                                <!--:data="supplierClasTree"-->
                                <!--:props="defaultProps"-->
                                <!--node-key="id"-->
                                <!--:default-expanded-keys="expandId"-->
                                <!--ref="tree"-->
                                <!--:expand-on-click-node="false"-->
                                <!--:filter-node-method="filterNode"-->
                                <!--@node-click="nodeClick"-->
                                <!--&gt;-->
                            <!--</el-tree>-->
                              <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                        </vue-scroll>
                    </el-col>
            </el-col>
            <!-- 右边数据列表 -->
            <el-col :span='19' class="border-left">
                <!-- 按钮组 -->
                <el-row class="h48 pt5 fixed colorWhite">
                  <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                    <!--<button @click="goAdd" class="erp_bt bt_add">-->
                        <!--<div class="btImg">-->
                            <!--<img src="../../../static/image/common/bt_add.png">-->
                        <!--</div>-->
                        <!--<span class="btDetail">新增</span>-->
                    <!--</button>-->
                    <!--<button @click="delSelected" class="erp_bt bt_del">-->
                        <!--<div class="btImg">-->
                            <!--<img src="../../../static/image/common/bt_del.png">-->
                        <!--</div><span class="btDetail">删除</span>-->
                    <!--</button>-->
                    <!--<button class="erp_bt bt_in">-->
                        <!--<div class="btImg">-->
                            <!--<img src="../../../static/image/common/bt_inOut.png">-->
                        <!--</div>-->
                        <!--<span class="btDetail">导入</span>-->
                    <!--</button>-->
                    <!--<button class="erp_bt bt_out">-->
                        <!--<div class="btImg">-->
                            <!--<img src="../../../static/image/common/bt_inOut.png">-->
                        <!--</div>-->
                        <!--<span class="btDetail">导出</span>-->
                    <!--</button>-->
                    <div class="search_input_group">
                        <div class="search_input_wapper">
                            <el-input
                                placeholder="搜索..."
                                class="search_input"
                                v-model="rightKeyword"
                                @change="searchRight"
                                >
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                        <div class="search_button_wrapper" @click="dialogUserDefined = true">
                            <button class="userDefined">
                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                            </button>
                        </div>
                    </div>
                </el-row>
                <!-- 数据列表 -->
                <el-row>
                    <el-col :span='24'>
                        <!--<el-table v-loading="tableLoading" :data="tableData" style="width: 100%" stripe @selection-change="handleSelectionChange" border ref="multipleTable">-->
                            <!--<el-table-column type="selection"></el-table-column>-->
                            <!--<el-table-column prop="classCode" label="供应商分类编码">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button type="text" @click="modify(scope.row)">{{tableData[scope.$index].classCode}}</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="className " label="供应商分类名称">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button type="text"  @click="modify(scope.row)">{{tableData[scope.$index].className }}</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="classParentId_ClassName" label="上级供应商分类">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="remark" label="备注">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="status" label="状态">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<span v-if="scope.row.status=='1'" style="color:#39CA77;">启用</span>-->
                                    <!--<span v-else-if="scope.row.status=='0'" style="color:#FF6666;">停用</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="createdBy" label="创建人"></el-table-column>-->
                            <!--<el-table-column label="创建时间">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-date-picker-->
                                    <!--format="yyyy-MM-dd"-->
                                    <!--value-format="yyyy-MM-dd"-->
                                    <!--v-model="tableData[scope.$index].createdTime"-->
                                    <!--type="datetime"-->
                                    <!--readonly-->
                                    <!--align="center"-->
                                    <!--placeholder=""></el-date-picker>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="操作">-->
                                 <!--<template slot-scope="scope">-->
                                    <!--&lt;!&ndash; <el-button type="text"  @click="modify(scope.row)" >修改</el-button> &ndash;&gt;-->
                                    <!--<el-button type="text"  @click="confirmDelThis(scope.row)" >删除</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                        <!--<el-pagination-->
                        <!--style="margin-top:20px;"-->
                        <!--class="text-right"-->
                        <!--background layout="total,prev, pager, next"-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page="pageIndex"-->
                        <!--:page-size="pageSize"-->
                        <!--:total="totalCount">-->
                        <!--</el-pagination>-->
                      <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command"></Table>
                    </el-col>
                </el-row>
            </el-col>
            <!-- ********************************************** -->
            <!-- dialog是否删除提示(对话框控件) -->
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
            <!-- 数据提交有误的数据提示框 -->
          <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
            <submitError :submitData="submitData"></submitError>
        </el-row>
    </div>
</template>

<script>
    import submitError from '../Common/submitError';
    import Table from '../../base/Table/Table';
    import Tree from '../../base/tree/tree';
    import buttonGroup from '../../base/buttonGroup/buttonGroup';
    import dialogBox from '../../base/dialog/dialog'
    export default {
         name: "supplierClassifyList",
         data(){
             return{
                ContactOwner:2,//  供应商分类参数(获取所有数据时)
                inputId:0,
                // -------树形控件数据
                filterText:'',
                supplierClasTree:[],
                defaultProps:{
                    children: 'childNodes',
                    label: 'className',
                    id: 'id',
                },
               dateabc:'',
               treeEntrySearch:true,//是否包含树节点过滤功能
               treeSuggestSearch:false,//是否包含树节点建议过滤功能
               treeParams:{
                 treeName:'supplierClassifyList',//树节点名称
                 treeApi:'/api/services/app/ContactClassManagement/GetTreeList?Ower=2'//接口地址
               },
                expandId:[],//默认展开树节点
                // --------------列表数据提示框
               httpUrl:{
                 view:'/supplierClassify/supplierClassifyModify/',
                 delete:'/api/services/app/ContactClassManagement/Delete',//行内删除
                 query:'/api/services/app/ContactClassManagement/GetNoteList',//条件查询
               },
               pluginSetting:{
                 hasPagination:true,
                 mutiSelect:true,//多选栏
                 isDisable:true,
               },
               tableModel:'supplierClassifyList',
               queryParams:{
                 Id:0,
                 ContactOwner:2,
                 SearchKey:'',
                 SkipCount:(this.$store.state.supplierClassifyListCurrentPage-1)*this.$store.state.supplierClassifyListEachPage,
                 MaxResultCount:this.$store.state.supplierClassifyListEachPage
               },
               command:[{
                 text:'查看',
                 class:'blue'
               },{
                 text:'删除',
                 class:'blue'
               }],
               column: [{
                 prop: 'classCode',
                 label: '供应商分类编码',
                 controls:'button',
                 required:true,
                 flag:true,//更改标识
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               },{
                 prop: 'className',
                 label: '供应商分类名称',
                 controls:'button',
                 required:true,
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               },{
                 prop: 'classParentId_ClassName',
                 label: '上级供应商分类',
                 controls:'text',
                 required:true,
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               },{
                 prop: 'remark',
                 label: '备注',
                 controls:'text',
                 required:true,
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               },{
                 prop: 'status',
                 label: '状态',
                 controls:'classMapSelect',
                 width:"auto",
                 isDisable:true,
                 sortable:true,
                 dataSource:[],
                 optionsKey:{label:'itemName',value:'itemValue'}
               },{
                 prop: 'createdBy',
                 label: '创建人',
                 controls:'text',
                 required:true,
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               },{
                 prop: 'createdTime',
                 label: '创建时间',
                 controls:'datetime',
                 required:true,
                 width:"auto",
                 isDisable:true,
                 sortable:false,
                 isFix:'',
               }],
               buttonGroup:[{
                 text:'新增',
                 class:'bt_add',
                 icon:'icon-xinzeng',
                 disabled:false,
               },{
                 text:'删除',
                 class:'bt_del',
                 icon:'icon-shanchu',
                 disabled:false,
               },{
                 text:'导入',
                 class:'bt_in',
                 icon:'icon-daoru',
                 disabled:false,
               },{
                 text:'导出',
                 class:'bt_out',
                 icon:'icon-daochu',
                 disabled:false,
               },],
               dialogSetting:{
                 message:'',//提示信息
                 dialogName:'',//对话框名称
                 dialogType:'',//对话框类型
               },
               dialogCommand:[],
               dialogVisible:false,
               delAarry:{//删除数组
                 ids:[]
               },
               errorTips:{//对话框 错误提示
                 message:'',
                 details:'',
               },
               tableData:[],
                dialogUserConfirm:false,//确认提示框是否显示
                multipleSelection: {},//复选框选中数据
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                // row:{},//存储用户点击删除条目数据
                submitData:{//数据提交有误的提示参数
                    submitErrorMessage:false,
                    detail_message_ifShow: false,
                    response: {
                        details: "",
                        message: "",
                        validationErrors: []
                    },
                },

                //------------分页器参数
                pageSize:10, //每页有多少条数据
                totalCount:0,//总共有多少条数据
                totalPage:0,//总页数
                pageIndex:1,//分页的当前页码
                // ------------
                rightKeyword:'',
                tableLoading:false,
                //--------------新增页默认上级地区的参数-----------------
                detailParentId:'',//tree节点点击获取前往detail新增页上级菜单ID
                detailParentName:'',//tree节点点击获取前往detail新增页上级菜单name

             }
         },
         created(){
            this.loadTree();
            this.getDataList();
            this.InitStatus();
         },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods:{
          InitStatus(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
              _this.column[4].dataSource=res.result;
            })
          },
          btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="新增"){
              self.goAdd();
            }else if(btn=="删除"){
              this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
              if(this.SelectionChange.length==0){
                this.$message({
                  type: 'info',
                  message: '请勾选需要更改删除的记录！'
                });
              }else{
                this.dialogSetting.dialogName='delDialog'
                this.dialogSetting.message="确定删除？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
              }
            }else if(btn=="导入"){

            }else if(btn=="导出"){
            }
          },
          getErrorMessage(message,details,validationErrors){//将rsp的值赋值给response对象
            let _this=this;
            _this.submitData.response.message='';
            _this.submitData.response.details='';
            _this.submitData.response.validationErrors=[];
            if(details!=null && details){
              _this.submitData.response.details=details;
            }
            if(message!=null && message){
              _this.submitData.response.message=message;
            }
            if(message!=null && message){
              _this.submitData.response.validationErrors=validationErrors;
            }
          },
          getDataList(){//-----------数据渲染
            let _this=this;
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',{Id:_this.inputId,ContactOwner:_this.ContactOwner,SkipCount:(_this.pageIndex-1)*_this.pageSize,MaxResultCount:_this.pageSize}).then(
              rsp=>{
                _this.tableData=rsp.result.items;
                console.log(rsp.result);
                _this.totalCount=rsp.result.totalCount;
                _this.totalPage=Math.ceil(rsp.result.totalCount/_this.pageSize);
                _this.getHeight();
              },
              rsp=>{
                _this.getHeight();
              }
            )


          },
          getHeight(){
            $(".tree-container").css({
              height:parseInt($('.border-left').css('height'))-48+'px'
            })
            $(".border-left").css({
              height:$('.bg-white').css('height')
            })
          },
          //-----------按钮组功能---------------
          goAdd(){ //增加去详情页(detail)
            // this.$store.state.url = "/supplierClassify/supplierClassifyDetail/default";
            // this.$router.push({ path: this.$store.state.url });

            //  this.$router.push({  name:'supplierClassifyDetail',params: {upParentId:this.upClassId,upClassName:this.upClassName}});
            let _this=this;
            if(typeof(_this.detailParentId)=='number'){
              _this.$store.state.url='/supplierClassify/supplierClassifyDetail/'+_this.detailParentId
              _this.$router.push({path:this.$store.state.url})//点击切换路由

            }else{
              _this.$store.state.url='/supplierClassify/supplierClassifyDetail/default'
              _this.$router.push({path:this.$store.state.url})//点击切换路由
            }
          },
          //------------分页器函数
          handleCurrentChange(val){
            this.pageIndex=val;
            this.getDataList();
          },
          // -------------树形控件
          defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
              && data[0]!=null
              && typeof(data[0][key])!='undefined'
              && data[0][key]!=null
              && data[0][key]!=''){
              return [data[0][key]]
            }
          },
          renderContent_componyTree(h, { node, data, store }){
            if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
              return (
                <span class="el-tree-node__label" data-id={data.id}>
            <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
              {data.className}
            </span>
            );
            }else{
              return (
                <span class="el-tree-node__label" data-id={data.id}>
            <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
              {data.className}
            </span>
            );
            }
          },
          // loadIcon(){//添加文件夹图标
          //     let _this=this;
          //     _this.$nextTick(function () {
          //         $('.preNode').remove();
          //         $('.el-tree-node__label').each(function(){
          //             if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
          //                 $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
          //             }else{
          //                 $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
          //             }
          //         })
          //     })
          // },
          loadTree(){//获取树形控件数据
            let _this=this;
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:2}).then(
              rsp=>{
                // console.log(rsp);
                _this.supplierClasTree=rsp;
                // console.log(_this.supplierClasTree)
                _this.expandId=_this.defauleExpandTree(rsp,'id')
                // _this.loadIcon();
              })
          },
          TreeNodeClick(data){//树节点点击回调
            let _this=this;
            if(data.id){
              _this.dateabc=data.id;
            }else{
              _this.dateabc=data;
            }
            // _this.detailParentId=data.id;//
            // _this.detailParentName=data.moduleName;
            _this.queryParams.Id=_this.dateabc;
            _this.tableLoading=true;
            _this.queryParams.SearchKey='';
            _this.$store.commit('tableLoad_Complete', true);
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',_this.queryParams).then(
              rsp=>{
                _this.$store.commit('Init_Table',rsp.result.items);
                _this.$store.commit('get_RowId',"")//置空修改行id
                _this.$store.commit('tableLoad_Complete', false);
                let totalPage=Math.ceil(rsp.result.totalCount/_this.$store.state.supplierClassifyListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',rsp.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
              },
              rsp=>{
                //_this.getHeight();
              }
            )
          },
          nodeClick(data){//点击树形控件节点时的回调
            let _this=this;
            // console.log(data);
            // _this.inputId=data.id;
            // _this.detailParentName=data.className;
            // _this.detailParentId=data.id;
            // // //     _this.$axios.gets('/api/services/app/ContactClassManagement/GetDataList',{inputId:data.id}).then(
            // //         rsp=>{
            // //         //  console.log(rsp.result);
            // //          _this.tableData=rsp.result.items;
            // //          _this.totalCount=rsp.result.totalCount;
            // //          _this.totalPage=Math.ceil(rsp.result.totalCount/_this.pageSize);
            // //    })
            // _this.getDataList();
            _this.queryParams.Id=data.id;
            _this.$store.commit('tableLoad_Complete', true);
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',_this.queryParams).then(
              rsp=>{
                _this.$store.commit('Init_Table',rsp.result.items);
                _this.$store.commit('get_RowId',"")//置空修改行id
                _this.$store.commit('tableLoad_Complete', false);
                let totalPage=Math.ceil(rsp.result.totalCount/_this.$store.state.supplierClassifyListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',rsp.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
              },
              rsp=>{
                //_this.getHeight();
              }
            )
          },
          getSonNode(data) {//获取树形节点子节点
            let _this=this;
            // console.log(data);
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetDataList',{inputId:data.id}).then(
              rsp=>{
                console.log(rsp);
                //  _this.tableData=rsp.result;
              })
          },
          filterNode(value, data) {//过滤节点
            // console.log(value);
            // console.log(data);
            if (!value) return true;
            return data.className.indexOf(value) !== -1;
            // this.nodeClick(data);
          },
          // ------------- 删除功能
          confirmDelThis(row){//确认单项删除
            let _this=this;
            _this.choseAjax='row'
            _this.row=row;
            _this.dialogUserConfirm=true;
          },
          sureAjax(){
            let _this=this;
            if(_this.choseAjax=='row'){
              _this.delThis()
            }else if(_this.choseAjax=='rows'){
              _this.delRow()
            }
          },
          delThis(row){//单项删除
            let _this=this;
            _this.$axios.deletes('/api/services/app/ContactClassManagement/Delete',{id:_this.row.id})
              .then(
                rsp=>{
                  _this.dialogUserConfirm=false;
                  _this.open('删除成功','el-icon-circle-check','successERP');
                  _this.getDataList();
                  _this.loadTree();
                },rsp=>{
                  _this.dialogUserConfirm=false;
                  if(rsp && rsp!=''){
                    _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                  }
                  _this.submitData.submitErrorMessage=true;
                })
          },
          delSelected(){//确认多项删除
            let _this=this;
            _this.choseAjax='rows'
            if(_this.multipleSelection.ids.length>0){
              _this.dialogUserConfirm=true;
            }
          },
          delRow(){// 按钮删除(批量删除)
            let _this = this;
            // console.log(_this.multipleSelection);
            this.$axios.posts(
              "/api/services/app/ContactClassManagement/BatchDelete",
              _this.multipleSelection
            )
              .then(rsp => {
                _this.dialogUserConfirm=false;
                _this.open('删除成功','el-icon-circle-check','successERP');
                _this.getDataList();
                _this.loadTree();
              },rsp=>{
                _this.dialogUserConfirm=false;
                if(rsp && rsp!=''){
                  _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                }
                _this.submitData.submitErrorMessage=true;
              });
          },
          handleSelectionChange(arr1){
            let _this = this;
            _this.multipleSelection.ids = [];
            for (let val of arr1) {
              _this.multipleSelection.ids.push(val.id);
            }
            // _this.isTrue=false;
            // console.log(_this.multipleSelection);
          },
          // -------------修改
          modify(row){
            // console.log(row.id)
            this.$store.state.url = "/supplierClassify/supplierClassifyModify/" + row.id
            this.$router.push({ path: this.$store.state.url })
          },
          searchRight (){//右边搜索
            let _this=this;
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetSearch',{inputName:_this.rightKeyword}).then(
              rsp=>{
                _this.tableData=rsp.result.items;
                // console.log(rsp.result);
                _this.totalCount=rsp.result.totalCount;
                _this.totalPage=Math.ceil(rsp.result.totalCount/_this.pageSize);
              }
            )

          },
          // -------------

          querySearchAsync(){},

          // -----------------------提示信息
            open(tittle, iconClass, className) {//成功提示框
                this.$notify({
                    position: "bottom-right",
                    iconClass: iconClass,
                    title: tittle,
                    showClose: false,
                    duration: 3000,
                    customClass: className
                });
            },
          dialogClick(parmas){//对话框按钮点击事件
            if(parmas.dialogButton=="确定"){
              if(parmas.dialogName=="delDialog"){
                this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                console.log(this.SelectionChange);
                for(var i in this.SelectionChange){
                  this.delAarry.ids.push(this.SelectionChange[i].id)
                }
                let _this=this;

                //批量删除
                _this.$axios.posts('http://192.168.100.107:8082/api/services/app/ContactClassManagement/BatchDelete',_this.delAarry).then(function(res){
                  // _this.queryParams.CategoryId="";
                  _this.$store.commit('setQueryParams',_this.queryParams)
                  _this.$store.dispatch('InitTable');
                  _this.$store.commit('setTableSelection',[])
                  _this.dialogVisible=false;
                  _this.loadTree();
                  _this.delAarry.ids=[];
                  _this.open('删除成功','el-icon-circle-check','successERP');
                }).catch(function(err){
                  _this.dialogVisible=false;
                  _this.delAarry.ids=[];
                  _this.$message({
                    type: 'warning',
                    message: err.error.message
                  });
                });
              }
            }else if(parmas.dialogButton=="取消"){
              this.dialogVisible=false;
            }
          },
          // 关闭对话框
          dialogColse(){
            this.dialogVisible=false;
          },
        },
      components:{
        buttonGroup,
        Table,
        dialogBox,
        submitError,
        Tree
      }
    }
</script>

 <style scoped>
    .supplierClassifyList-wrapper .tree-container{
        background-color: #fff;
    }
    .colorWhite{
        background-color: #fff;
    }
    .error_tips{
        height: 15px;
        line-height: 15px;
        color: #f66;
    }
    .dialogBtn{
        display: block;
        float: left;
        width: 50%;
        height: 100%;
        background-color: #fff;
        color: #c9c9c9;
        border: none;
        border-top: 1px solid #c9c9c9;
        outline: none;
        cursor: pointer;
    }
    .dialogBtn:focus{
        outline: none;
    }
    .dialog-footer .dialogBtn:first-child{
    border-right: 1px solid #c9c9c9;
    }
    .dialog-footer{
        padding:0;
        height: 50px;
    }
    .dialogBtn:hover{
        color: #6699FF;
    }
    .TreeMenu{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 100px;
    }
    .TreeMenu button{
        display: block;
        width: 100%;
        height: calc(100% / 3);
    }
    .formSearch{
        float: right;
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
    .pl15{
        padding-left: 15px;
    }
    .pr15{
        padding-right: 15px;
    }
    .pt5{
        padding-top: 5px;
    }
    .border-left{
        border-left: 1px solid #E4E4E4;
        min-height: 600px;
    }
</style>
