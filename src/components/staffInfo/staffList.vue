<template>
    <div class="staffList-wrapper" style="float:left;background:#fff;width:100%;">
        <el-col  :span="ifWidth?5:0" v-show="ifWidth">
            <el-row class="bg_White" id="left-box">
                    <el-col>
                        <el-row class="h48 topSearch">
                            <el-col :span="18" class="pl10 btn-for-search">
                                <img src="../../../static/image/common/search_btn.png">
                                <span class="topSearch">查询</span>
                            </el-col>
                            <el-col :span="2" :offset="4" style="padding-right:10px">
                                <div class="circle" @click="closeLeft"><span class="circleContent">-</span></div>
                            </el-col>
                        </el-row>
                        <div style="margin-top:20px" class="formWrap">
                           <el-form ref="form" :model="queryParams" label-width="80px" size="mini">
                                <el-form-item label="职员编码">
                                    <el-input v-model="queryParams.EmployeeCode"></el-input>
                                </el-form-item>
                                <el-form-item label="职员名称">
                                    <el-input v-model="queryParams.EmployeeName"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="所属组织"> -->
                                    <!-- <el-select v-model="formList.OuId"> -->
                                        <!-- <el-input
                                        placeholder="输入关键字进行过滤"
                                        v-model="filterOu"
                                        class="selectSearch">
                                        </el-input> -->
                                        <!-- <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" :data="selectTree_ou" :props="selectProps_ou"
                                        node-key="id" default-expand-all ref="tree2" :filter-node-method="filterNode_ou"
                                        :expand-on-click-node="false" @node-click="nodeClick_ou"
                                        class="filter-tree"> -->
                                        <!-- <el-tree
                                        :highlight-current="true"
                                        :data="selectTree_ou"
                                        :props="selectProps_ou"
                                        node-key="id"
                                        ref="tree"
                                        :expand-on-click-node="false"
                                        :filter-node-method="filterNode_ou"
                                        @node-click="nodeClick_ou"
                                        >
                                        </el-tree>
                                        <el-option v-show="false" v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="部门">
                                    <el-select v-model="queryParams.DeptId">
                                        <el-input
                                        placeholder="输入关键字进行过滤"
                                        v-model="filterDepart"
                                        class="selectSearch">
                                        </el-input>
                                        <!-- <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" :data="selectTree_depart" :props="selectProps_depart"
                                        node-key="id" default-expand-all ref="tree2" :filter-node-method="filterNode_Depart"
                                        :expand-on-click-node="false" @node-click="nodeClick_depart"
                                        class="filter-tree"> -->
                                        <el-tree
                                        :highlight-current="true"
                                        :data="selectTree_depart" :props="selectProps_depart"
                                        node-key="id"
                                        ref="tree"
                                        default-expand-all
                                        :expand-on-click-node="false"
                                        :filter-node-method="filterNode_Depart"
                                        @node-click="nodeClick_depart"
                                        >
                                        </el-tree>
                                        <!-- <el-option v-show="false" v-for="item in selectData.depart" :key="item.id" :label="item.name" :value="item.id" :date="item.id">
                                        </el-option> -->
                                        <!-- 用计算属性 -->
                                        <el-option v-show="false"
                                       :key="countDepart.id"
                                       :label="countDepart.name"
                                       :value="countDepart.id"
                                       id="staff_confirmSelect"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属店铺">
                                    <el-select v-model="queryParams.ShopId">
                                        <el-option v-for="item in selectData.shop" :label="item.shopName" :value="item.id" :key="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                          </el-form>
                        </div>
                        <el-row>
                            <el-col :span="8">&nbsp;</el-col>
                            <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                                <span class="search-btn" @click="search"  style="float:left;margin-left:10px;">查询</span>
                            </el-col>
                        </el-row>
                    </el-col>
            </el-row>
        </el-col>
        <el-col :span="ifWidth?19:24">
            <div id="bgc">
                <el-row class="h48" >
                    <div>
                        <el-col :span='2' class="search-block"  v-show="!ifWidth">
                            <div @click="openLeft">
                                <img src="../../../static/image/common/search_btn.png">
                                <span>查询</span>
                                <span @click="openLeft">+</span>
                            </div>
                            <!-- <div  style="display:inline-block;margin-left:2px;font-size:16px;" @click="openLeft">
                                <span>查询</span>
                            </div>
                            <div style="display:inline-block" class="out-img" @click="openLeft">
                                <span>+</span>
                            </div> -->
                        </el-col>

                        <el-col :span="22" class="border-left">
                            <el-row>
                                <!-- 按钮组 -->
                            <div>
                                <el-col :span="17" class="pt5">
                                  <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                                </el-col>
                                <div>
                                    <el-col :span="5">
                                        <div class="search-input">
                                            <el-input placeholder="输入职员编码或姓名" prefix-icon="el-icon-search"
                                            v-model="searchContent" @change="searchTable">
                                            </el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="1" class="defineBtn">
                                        <el-button round size="mini" icon="el-icon-setting" disabled>自定义</el-button>
                                    </el-col>
                                </div>
                            </div>

                            </el-row>
                        </el-col>
                    </div>
                </el-row>
                <!-- 列表 -->
                <el-row class="pb10 tableWrapper">
                    <div id="bg-white" style="background-color: rgba(251, 252, 253, 1);">
                      <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command"></Table>
                        <!--<el-table  :data="allList" border style="width: 100%"  @selection-change="handleSelectionChange"  stripe>-->
                            <!--<el-table-column type="selection" width="50">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="employeeCode" label="职员编码" fixed >-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button type="text" size="small" @click="checkDetail(scope.row)">{{allList[scope.$index].employeeCode}}</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="employeeName" label="职员名称"  fixed >-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button type="text" size="small" @click="checkDetail(scope.row)">{{allList[scope.$index].employeeName}}</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="ouFullname" label="业务组织"  >-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="mobile" label="手机号码" >-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="deptName" label="所属部门">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="sexTValue" label="性别">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="生日">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-date-picker-->
                                        <!--format="yyyy-MM-dd"-->
                                        <!--value-format="yyyy-MM-dd"-->
                                        <!--v-model="allList[scope.$index].birthday"-->
                                        <!--type="datetime"-->
                                        <!--readonly-->
                                        <!--align="center"-->
                                        <!--placeholder=""></el-date-picker>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="employeeTypes" label="职员类型" >-->
                                <!--<template slot-scope="scope">-->
                                      <!--<el-button type="text" size="small" v-for="item in scope.row.employeeTypes" :key="item.employeeTypeid">{{item.employeeTypeidTValue}}</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="shopName" label="所属店铺">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column prop="status" label="状态">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<span v-if="scope.row.status=='1'" style="color:#39CA77;">启用</span>-->
                                    <!--<span v-else-if="scope.row.status=='0'" style="color:#FF6666;">停用</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="操作"  fixed="right">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button @click="checkDetail(scope.row)" type="text" size="small">查看</el-button>-->
                                    <!--<el-button type="text" size="small" @click="confirmDelThis(scope.row)">删除</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                            <!--&lt;!&ndash; 分页器 &ndash;&gt;-->
                            <!--&lt;!&ndash; <div class="fenyeqi">-->
                                <!--<el-row :gutter="24">-->
                                    <!--<el-col  :offset="12">-->
                                        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">-->
                                        <!--</el-pagination>-->
                                    <!--</el-col>-->
                                <!--</el-row>-->
                            <!--</div>   &ndash;&gt;-->
                            <!--<el-row class="fenyeqi">-->
                                <!--<el-col :span="18">-->
                                     <!--<p>共<span class="colorRed">{{totalCount}}</span>条，当前第<span class="colorRed">{{pageIndex}}</span>页，共<span class="colorRed">{{totalPage}}</span>页，每页行数<button class="bgC">{{page_size}}</button>，第<button class="bgC">{{pageIndex}}</button>页 </p>-->
                                <!--</el-col>-->
                                <!--<el-col :span="6">-->
                                    <!--<el-pagination  background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="page_size" layout=" prev, pager, next" :total="totalCount">-->
                                        <!--</el-pagination>-->

                                <!--</el-col>-->

                            <!--</el-row>-->
                         </div>
                </el-row>
            </div>
        </el-col>
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
      <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    </div>
</template>

<script>
  import Table from '../../base/Table/Table'
  import buttonGroup from '../../base/buttonGroup/buttonGroup'
  import dialogBox from '../../base/dialog/dialog'
    export default {
        name: "staffList",
      components:{
        Table,
        buttonGroup,
        dialogBox
      },
        data() {
            return {
              errorTips:{//对话框 错误提示
                message:'',
                details:'',
              },
              dialogSetting:{
                message:'',//提示信息
                dialogName:'',//对话框名称
                dialogType:'',//对话框类型
              },
              dialogVisible:false,
              dialogCommand:[],
              delAarry:{//删除数组
                ids:[]
              },
              httpUrl:{
                view:'/staff/staffModify/',
                delete:'/api/services/app/EmployeeManagement/Delete',//行内删除
                query:'/api/services/app/EmployeeManagement/GetAll',//条件查询
              },
              pluginSetting:{
                hasPagination:true,
                mutiSelect:true,//多选栏
                isDisable:true,
              },
              queryParams:{
                EmployeeCode:'',
                EmployeeName:'',
                OuId:'',
                DeptId:'',
                ShopId:'',
                SkipCount:(this.$store.state.staffListCurrentPage-1)*this.$store.state.staffListEachPage,
                MaxResultCount:this.$store.state.staffListEachPage
              },
              tableModel:'staffList',
              command:[{
                text:'查看',
                class:'blue'
              },{
                text:'删除',
                class:'blue'
              }],
              column: [
                {
                prop: 'employeeCode',
                label: '职员编码',
                controls:'button',
                required:true,
                width:"auto",
                isDisable:true,
                sortable:false,
                isFix:'',
              },
                {
                prop: 'employeeName',
                label: '职员名称',
                controls:'button',
                required:true,
                width:"auto",
                isDisable:true,
                sortable:false,
                isFix:'',
              },
                {
                prop: 'employeeOus',
                label: '业务组织',
                  controls:'text',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              },
                {
                prop: 'mobile',
                label: '手机号码',
                  controls:'text',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              },
                {
                prop: 'employeeDepts',
                label: '所属部门',
                  controls:'text',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              },
                {
                prop: 'sexTValue',
                label: '性别',
                  controls:'text',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              },
                {
                prop: 'birthday',
                label: '生日',
                  controls:'datetime',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              }
              /*{
                prop: 'employeeTypes',
                label: '职员类型',
                controls:'text',
                width:"auto",
                isDisable:true,
                sortable:false,
              }*/,
                {
                prop: 'employeeShops',
                label: '所属店铺',
                  controls:'text',
                  required:true,
                  width:"auto",
                  isDisable:true,
                  sortable:false,
                  isFix:'',
              }
              /*,{
                prop: 'status',
                label: '状态',
                controls:'text',
                required:true,
                width:"auto",
                isDisable:true,
                sortable:false,
                isFix:'',
              }*/],
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
                text:'辅助功能',
                class:'bt_auxiliary',
                icon:'icon-daochu',
                disabled:false,
              },{
                text:'Excel',
                class:'bt_excel',
                icon:'icon-excel',
                disabled:false,
              },{
                text:'打印',
                class:'bt_print',
                icon:'icon-print',
                disabled:false,
              }],
                // -------------左边查询数据
                ouId:null,
                // expandId_depart:[],//默认展开的树节点
                selectData:{//select下拉框数据
                    ou:[],//组织
                    depart:[],//部门
                    shop:[],//部门
                },
                //------------------------- 组织树形控件
                filterOu:'',//节点过滤关键字---组织
                // expandId_ou:[],//默认展开的树节点
                selectTree_ou:[],
                selectProps_ou: {
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                filterDepart:'',
                selectTree_depart:[],
                selectProps_depart: {
                    children: 'children',
                    label: 'name',
                    id:'id'
                },
                departItem:{
                    id:'',
                    name:'',
                },
                allList: [], //所有数据
                //--------------确认删除开始-----------------
                dialogUserConfirm:false,//用户删除保存提示信息
                row:{},//存储用户点击删除条目数据
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                selectedIds: {}, //复选框选中数据
                //--------------确认删除开始-----------------



                formList:{//查询所需的查询字符串
                    EmployeeCode:'',
                    EmployeeName:'',
                    OuId:'',
                    DeptId:'',
                    ShopId:'',
                },
                isTrue:true,//批量删除键能否点击
                totalCount: 0,
                searchContent: "",
                info: {
                    up: "",
                    demand: [
                    { must: "", title: "职员编码", place: "" },
                    {
                        must: "",
                        title: "职员名称",
                        options: [
                        { value: "选项1", label: "仓库" },
                        { value: "选项2", label: "地址" },
                        { value: "选项3", label: "总部" },
                        { value: "选项4", label: "总部2" },
                        { value: "选项5", label: "北京烤鸭" }
                        ],
                        place: ""
                    },
                    {
                        must: "",
                        title: "业务组织",
                        options: [
                        { value: "选项1", label: "仓库" },
                        { value: "选项2", label: "地址" },
                        { value: "选项3", label: "总部" },
                        { value: "选项4", label: "总部2" },
                        { value: "选项5", label: "北京烤鸭" }
                        ]
                    },
                    {
                        must: "",
                        title: "部门",
                        options: [
                        { value: "选项1", label: "仓库" },
                        { value: "选项2", label: "地址" },
                        { value: "选项3", label: "总部" },
                        { value: "选项4", label: "总部2" },
                        { value: "选项5", label: "北京烤鸭" }
                        ]
                    },
                    {
                        must: "",
                        title: "店铺",
                        options: [
                        { value: "选项1", label: "仓库" },
                        { value: "选项2", label: "地址" },
                        { value: "选项3", label: "总部" },
                        { value: "选项4", label: "总部2" },
                        { value: "选项5", label: "北京烤鸭" }
                        ]
                    }
                    ]
                },

                tableData: [],
                ifWidth: true, //控制左侧搜索展开
                pageIndex: 1, //分页的当前页码
                totalPage: 0, //当前分页总数
                page_size: 10, //每页有多少条信息

            };
        },
        created: function() {
            this.getAllList();
            this.getSelectData();// 所属组织下拉选项框
            this.loadTree();// 组织树形控件
            this.loadDepartTree();// 部门树形控件
        },
        watch: {
            // filterOu(val) {
            //     this.$refs.tree.filter(val);
            // },
            filterDepart(val) {
                this.$refs.tree.filter(val);
            },
        },
        computed:{
            countDepart () {
                return this.departItem;
                },
        },
        methods: {
          // 关闭对话框
          dialogColse(){
            this.dialogVisible=false;
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
                _this.$axios.posts('http://192.168.100.107:8082/api/services/app/EmployeeManagement/BatchDelete',_this.delAarry).then(function(res){
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
            }
          },
            getAllList() {// 获取所有数据
                let _this = this;
                _this.$axios.gets("/api/services/app/EmployeeManagement/GetAll",
                {SkipCount: (_this.pageIndex - 1) * _this.page_size,
                    MaxResultCount: _this.page_size})
                    .then(rsp => {
                        // console.log(rsp.result.items);
                        _this.allList = rsp.result.items;
                        // _this.allList.employeeTypes = rsp.result.items;
                        // for (let val of rsp.result.items) {
                        //     console.log(val);
                        // }

                        // let staffTypes=[];//转换职员类型的数据类型


                        _this.totalCount = rsp.result.totalCount;
                        _this.totalPage=Math.ceil(rsp.result.totalCount/_this.page_size);
                        // console.log(_this.allList);
                        // console.log(rsp.result.items);
                    });
            },
            open(tittle, iconClass, className) {// 提示信息
                this.$notify({
                    position: "bottom-right",
                    iconClass: iconClass,
                    title: tittle,
                    showClose: false,
                    duration: 3000,
                    customClass: className
                });
            },
            //---------------------------获取下拉框选项数据
            getSelectData(){//获取下拉选项数据
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList').then(function(res){  // 所属组织--获取组织单元为公司类型的列表
                    // console.log(res);
                    _this.selectData.ou=res.result;
                    // console.log( _this.selectData.ou);
                });
                _this.$axios.gets('/api/services/app/ShopManagement/GetAll').then
                (function(res){  // 店铺
                    _this.selectData.shop=res.result.items;
                    // console.log(res.result.items);
                });
                _this.getSelectDepart();
            },
            getSelectDepart(){// 获取所属部门下拉框数据
                let _this=this;
                _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId}).then
                // _this.$axios.gets('/api/services/app/DeptManagement/GetAll',{DeptParentid:_this.ouId,SkipCount:0,MaxResultCount:100}).then
                (
                    rsp=>{
                        // console.log(rsp.result);
                        _this.selectData.depart=rsp.result;
                    }
                );
            },
            //---------------------------获取树形控件数据
            // defauleExpandTree(data,key){
            //     if(typeof(data[0])!='undefined'
            //     && data[0]!=null
            //     && typeof(data[0][key])!='undefined'
            //     && data[0][key]!=null
            //     && data[0][key]!=''){
            //         return [data[0][key]]
            //     }
            // },
            // renderContent_componyTreeOU(h, { node, data, store }){
            //   if(typeof(data.childNode)!='undefined' && data.childNode!=null && data.childNode.length>0){
            //       return (
            //           <span class="el-tree-node__label" data-id={data.id}>
            //           <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
            //               {data.ouName}
            //           </span>
            //       );
            //   }else{
            //       return (
            //           <span class="el-tree-node__label" data-id={data.id}>
            //           <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
            //               {data.ouName}
            //           </span>
            //       );
            //   }
            // },
            loadTree(){// 加载所属组织树形控件
                let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/GetCompanyOuList')
                .then(function(res){//组织
                // console.log(res.result);
                    _this.selectTree_ou=res.result;
                    // _this.expandId_ou=_this.renderContent_componyTreeOU(res.result,'id')
                    _this.loadIcon();
                },function(res){
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
            filterNode_ou(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
            },
            nodeClick_ou(data,node,self){//所属组织树形控件的回调
                let _this=this;
                // console.log(data);
                // console.log(data.id);
                _this.ouId=data.id;
                // console.log(_this.ouId);
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                });
                _this.getSelectDepart();
                _this.loadDepartTree();
            },
            // --------------------------------------
            loadDepartTree(){// 加载所属部门树形控件
                let _this=this;
                _this.$axios.gets('/api/services/app/DeptManagement/GetAllTree',{OuId:_this.ouId})
                .then(function(res){//部门
                    console.log(res,"111111111111111111111");
                    _this.selectTree_depart=res;
                    _this.loadIcon();
                },function(res){
                })
            },
            filterNode_Depart(value, data) {//根据关键字过滤节点
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            nodeClick_depart(data,node,self){//所属部门树形控件的回调
                let _this=this;
                // console.log(data);
                // console.log(data.id);

                _this.departItem.id=data.id;
                _this.departItem.name=data.name;
                self.$nextTick(function(){
                    $('#staff_confirmSelect').click()
                })

                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //     if($(this).attr('date')==data.id){
                //         $(this).click()
                //     }
                // });
            },
            // 左侧搜索展开--------------------------------
            closeLeft: function() {
                let self = this;
                self.ifWidth = false;
            },
            openLeft: function() {
                let self = this;
                self.ifWidth = true;
            },
            // ------------------------------------------
            search() {// 左边查询按钮
              let self = this;
              self.$axios.gets('/api/services/app/EmployeeManagement/GetAll',self.queryParams).then(function(res){
                console.log(res)
                self.$store.commit('Init_Table',res.result.items);
                self.$store.commit('get_RowId',"")//置空修改行id
                let totalPage=Math.ceil(res.result.totalCount/self.$store.state.supplierListEachPage);
                self.$store.commit('Init_pagination',totalPage);
                self.$store.commit('Init_TotalCount',res.result.totalCount);
                self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1

              },function(res){
                console.log('err'+res)
              })
            },
            searchTable(){// 右边搜索框
                let _this=this;
                this.$axios.gets('/api/services/app/EmployeeManagement/GetAll',{
                  QuickSearch:_this.searchContent,
                  SkipCount:(this.$store.state.staffListCurrentPage-1)*this.$store.state.staffListEachPage,
                  MaxResultCount:this.$store.state.staffListEachPage}).then(
                    rsp=>{
                      _this.$store.commit('Init_Table',rsp.result.items);
                      _this.$store.commit('get_RowId',"")//置空修改行id
                      let totalPage=Math.ceil(rsp.result.totalCount/_this.$store.state.supplierListEachPage);
                      _this.$store.commit('Init_pagination',totalPage);
                      _this.$store.commit('Init_TotalCount',rsp.result.totalCount);
                      _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1

                    }
                )
            },
            // ------------------------------------按钮组功能
            handleSelectionChange: function(arr1) {// 复选框中选中的数据(用于做批量删除)
                let _this = this;
                _this.selectedIds.ids = [];
                for (let val of arr1) {
                    _this.selectedIds.ids.push(val.id);
                }
                _this.isTrue=false;
                // console.log(_this.selectedIds);
            },
          goAdd: function() {// 增加
                this.$store.state.url = "/staff/staffDetail/default";
                this.$router.push({ path: this.$store.state.url });
            },
            // -------------------------------------删除
            sureAjax(){
                let _this=this;
                if(_this.choseAjax=='row'){
                    _this.delRow()
                }else if(_this.choseAjax=='rows'){
                    _this.delSelected()
                }
            },
            delRow(row) {// 单项删除
                let _this=this;
                this.$axios
                    .deletes("/api/services/app/EmployeeManagement/Delete", { id:_this.row.id })
                    .then(rsp => {
                    _this.dialogUserConfirm=false;
                    this.getAllList();
                    this.open("删除成功", "el-icon-circle-check", "successERP");
                    });
            },
            confirmDelThis(row) {// 确认是否删除本条数据
                let _this=this;
                _this.choseAjax='row'
                _this.row=row;
                _this.dialogUserConfirm=true;
            },
            confirmDelSelected() {// 确认是否多项删除
                let _this=this;
                _this.choseAjax='rows'
                if(_this.selectedIds.ids.length>0){
                _this.dialogUserConfirm=true;
                }
            },
            delSelected() {//多项删除
                let _this = this;
                this.$axios
                    .posts(
                    "/api/services/app/EmployeeManagement/BatchDelete",
                    _this.selectedIds
                    )
                    .then(res => {
                    if (!res.success) {
                    _this.dialogUserConfirm=false;
                        _this.open("删除失败", "el-icon-error", "faildERP");
                    }
                    _this.dialogUserConfirm=false;
                    _this.open("删除成功", "el-icon-circle-check", "successERP");
                    this.getAllList();
                    });
            },
            // -------------------------删除完-------
            checkDetail: function(row) {//查看--去修改页
                this.$store.state.url = "/staff/staffModify/" + row.id
                this.$router.push({ path: this.$store.state.url })
            },
            // --------------------------------分页器处理函数
            handleSizeChange(val) {// 每页数据条数改变
                // console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.getAllList();
            },
            handleCurrentChange(val) { // 当前页改变
                this.pageIndex = val;
                this.getAllList();
            }
        },
        mounted: function() {
            let content1 = document.getElementById("bg-white"); //设置高度为全屏
            let height1 = window.innerHeight - 123;
            content1.style.minHeight = height1 + "px";
        }
    };
</script>

 <style scoped>
    .colorWhite{
        background-color: #fff;
    }
    .bg_White {
        background: white;
        border-radius: 3px;
    }
    .lh48 {
        line-height: 48px;
    }
    .topSearch {
    font-size: 18px;
    }
    .topSearch .pl10 {
    padding-left: 10px;
    }

    .circle {
    display: inline-block;
    height: 15px;
    width: 15px;
    font-weight: 900;
    color: rgb(161, 161, 161);
    border: 1px solid rgb(194, 202, 216);
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    float: right;
    margin-top: 16px;
    cursor: pointer;
    }
    .formWrap {
        width: 80%;
        padding-left: 20px;
    }
    .staffList-wrapper .el-select {
        display:block;
        height: 30px;
    }
    .h48 {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #e4e4e4;
    }
    .pt5 {
    padding-top: 5px;
    }

    .search-btn {
    font-size: 12px;
    display: inline-block;
    width: 87px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: #4a6997;
    color: white;
    cursor: pointer;
    }
    .defineBtn{
    padding-left: 20px;
    }
    .pb10 {
    padding-bottom: 10px;
    }

    .border-left {
    border-left: 1px solid #e4e4e4;
    }
    .circleContent {
    display: inline-block;
    position: absolute;
    top: 4%;
    left: 25%;
    height: 1px;
    width: 1px;
    line-height: 10px;
    }
    .fenyeqi{
        margin-top:10px;
        padding-left: 10px;
        font-size: 12px;
    }
    .colorRed{
        color:red ;
    }
    .bgC{
        background-color: #fff;
        color: #000;
        border: 1px solid #ccc;
        width: 30px;
        border-radius: 3px;

    }

</style>

 <style>
    .staffList-wrapper .el-input--prefix .el-input__inner {
        padding-left: 30px;
        border-radius: 30px;
        border-color:rgb(194, 202, 216);
        height: 30px;
    }
    .staffList-wrapper .el-icon-search:before {
    content: "\E619";
    font-size: 18px;
    font-weight: 900;
    color: rgb(83, 84, 86);
    }
    .staffList-wrapper  {
        border: 1px solid #dcdfe6 !important;
    }
    .staffList-wrapper .el-form-item__label{
        font-size: 12px;
        color: #000;
    }
    .staffList-wrapper  .el-table th>.cell{
        color: #000;
        font-size: 12px;
    }
    .staffList-wrapper .tableWrapper .el-input--prefix .el-input__inner{
        border: none !important;
        padding: 0px;
    }
</style>

