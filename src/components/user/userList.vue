<template>
    <div class="userList commodity">
        <el-row class="bg-white">
             <el-col class="left-box" v-show="ifWidth">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <img src="../../../static/image/common/search_btn.png" class="closeLeft">
                        <span class="f14">查询</span>
                    </el-col>
                    <el-col :span="2" :offset="4">
                        <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">用户编码</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" v-model="queryParams.UserCode"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">用户名称</label>
                    </el-col>
                    <el-col :span="15">
                        <el-input class="input-entry" v-model="queryParams.DisplayName"></el-input>
                    </el-col>
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">用户组</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select  v-model="queryParams.UserGroupId" placeholder="" class="input-entry" :filter-method="filterMethod" clearable filterable>
                        <el-option v-for="item in userGroupId" :key="item.id" :label="item.userGroupName" :value="item.id">
                            <span>{{item.userGroupName}}</span>
                            <span>{{item.userGroupCode}}</span>
                        
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
                 <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">所属组织</label>
                    </el-col>
                    <el-col :span="15">
                       <el-select clearable v-model="queryParams.OuId" placeholder="" class="input-entry">
                        <el-input
                        placeholder="搜索..."
                        class="selectSearch"
                        v-model="search">
                        </el-input>
                        <el-tree
                         :render-content="renderContent_selectTree"
                         :default-expanded-keys="expandId"
                        :data="selectTree"
                        :highlight-current="true"
                        :props="selectProps"
                        node-key="id"
                        ref="tree"
                        :filter-node-method="filterNode"
                        :expand-on-click-node="false"
                        @node-click="nodeClick"
                        >
                        </el-tree>
                        <el-option v-show="false" v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">身份类型</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select clearable filterable   v-model="queryParams.UserType" placeholder="" class="input-entry" filterable>
                        <el-option v-for="item in selectData.UserType" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                        </el-option>
                       </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">语种</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select clearable filterable   v-model="queryParams.LanguageId" placeholder="" class="input-entry" :filter-method="filterMethod1">
                        <el-option v-for="item in languageId" :key="item.id" :label="item.displayName" :value="item.id">
                            <span>{{item.displayName}}</span>
                            <span>{{item.name}}</span>
                        </el-option>
                       </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">关联角色</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select clearable filterable   v-model="queryParams.RoleId" placeholder="" class="input-entry" :filter-method="filterMethodRole">
                        <el-option v-for="item in roles" :key="item.id" :label="item.displayName" :value="item.id">
                            <span>{{item.displayName}}</span>
                            <span>{{item.roleCode}}</span>
                        </el-option>
                       </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="8">
                        <label class="input-label">状态</label>
                    </el-col>
                    <el-col :span="15">
                        <el-select clearable filterable   v-model="queryParams.Status" placeholder="" class="input-entry">
                         <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                        </el-option>
                       </el-select>
                    </el-col>
                </el-row>
                <el-row class="mt20">
                        <el-col :span="8">
                            <div class="height1"></div>
                        </el-col>
                        <el-col :span="14">
                            <span class="search-btn" @click="SimpleSearchClick">查询</span>
                        </el-col>
                </el-row>
            </el-col>

            <el-col class="border-left min-height" :class="ifOpen?'rightBox':'newRight'">
                <el-row class="h48">
                    <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
                        <div @click="openLeft">
                            <img src="../../../static/image/common/search_btn.png">
                            <span>查询</span>

                            <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
                        </div>
                    </el-col>
                    <el-col :span="ifWidth?24:22" class="bg-white">
                      <el-row class="h48 pr10">
                            <el-col :span="13" class="fixed">
                                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                            </el-col>
                            <el-col :span="11">
                                   <div class="search-input-group pt5">
                                      <div class="search_input_wapper" @keyup.enter="submitSearch">
                                          <el-input
                                              placeholder="搜索..."
                                              v-model="Name"
                                              class="search_input">
                                              <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                          </el-input>
                                      </div>
                                      <div class="search_button_wrapper" @click="dialogUserDefined = true">
                                          <button class="userDefined">
                                              <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                          </button>
                                      </div>
                                  </div>
                            </el-col>
                       </el-row>
                    </el-col>
                </el-row>
                <!-- dialog -->
                <el-dialog :visible.sync="dialogUserDefined" class="dialogUserDefined">
                    <template slot="title">
                        <span>自定义<small>(设置显示字段)</small></span>
                    </template>
                     <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        stripe
                        ref="multipleTable">
                            <el-table-column label="序号">
                                 <template slot-scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="field" label="字段"></el-table-column>
                            <el-table-column prop="field" label="操作">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="tableData[scope.$index].value"
                                        active-color="#13ce66">
                                    </el-switch>
                                </template>
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary">确 定</el-button>
                            <el-button>取 消</el-button>
                        </span>
                </el-dialog>

                <el-row>
                    <el-col :span='24'>
                         <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
           <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
import {FILTER_MOTHED} from '../../common/common.js'
export default {
  data() {
    return {
      ifOpen:false,
      search: "",
      selectTree: [],
      item: {
        id: "",
        ouName: ""
      },
      expandId: [],
      selectProps: {
        children: "children",
        label: "ouName",
        id: "id"
      },
      searchData: {
        OuCode: "", //编码
        Name: "", //名称
        CompanyOuId: "", //所属公司
        AreaId: "", //行政地区
        Status: "", //启用状态
        OuType: "" //组织类型
      },
      selectData: {
        UserType: [], //身份类型
        Status001: [], //状态
        userGroupId: [], //用户组
        languageId: [], //语种
        roles: [], //角色
        ou: [] //组织
      },
      tableData: [],
      pageIndex: 1, //分页的当前页码
      totalPage: 0, //当前分页总数
      oneItem: 10, //每页有多少条信息
      page: 1, //当前页
      totalItem: 0, //总共有多少条消息
      treeCheck: [],
      isClick: [],
      load: "loadTableData",
      ifWidth: false,
      dialogUserDefined: false, //dialog
      response: {
        details: "",
        message: "",
        validationErrors: []
      },
      Name: "" ,//右上角模糊查询
      tableModel:'userList',
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
          },{
              text:'启用',
              class:'bt_start',
              icon:'icon-qiyong',
              disabled:false,
          },{
              text:'停用',
              class:'bt_stop',
              icon:'icon-tingyong',
              disabled:false,
          }],
              dialogSetting:{
              message:'',//提示信息
              dialogName:'',//对话框名称
              dialogType:'',//对话框类型
          },
          httpUrl:{
              view:'/user/userModify/',//查看详情
              delete:'/api/services/app/User/Delete',//单条删除
              query:'/api/services/app/User/GetAll',//条件查询
          },
          queryParams:{//查询条件参数
              UserGroupId:'', //用户编码
              UserCode:'', //用户名称
              DisplayName:'', //用户组
              OuId:'', //所属组织
              UserType:'', //身份类型
              LanguageId:'', //语种
              AuthType:'',//身份类型
              Status:'',//状态
              RoleId:'',//关联角色
              SkipCount:(this.$store.state.userListCurrentPage-1)*this.$store.state.userListEachPage,
              MaxResultCount:this.$store.state.userListEachPage,
              },
          column: [{
              prop:'userCode',
              label: '用户编码',
              controls:'button',
              isDisable:true,
              sortable:false,
              isFix:'',
              },{
              prop:'displayName',
              label: '用户名称',
              controls:'button',
              isDisable:true,
              sortable:false,
              },{
              prop:'phoneNumber',
              label: '手机号',
              controls:'text',
              width:"130px",
              isDisable:true,
              sortable:false,
              },{
              prop:'userGroupId_UserGroupName',
              label:'所属用户组',
              width:"130px",
              controls:'text',
              isDisable:true,
              sortable:false,
              }, {
              prop:'ouId_OuName',
              label:'所属组织',
              width:"130px",
              controls:'text',
              isDisable:true,
              sortable:false,
              },{
              prop:'userTypeTValue',
              label:'身份类型',
              width:"130px",
              controls:'text',
              isDisable:true,
              sortable:false,
              },{
              prop:'languageId_DisplayName',
              label:'语种',
              width:"130px",
              controls:'text',
              isDisable:true,
              sortable:false,
              }, {
              prop:'status',
              label: '状态',
              width:"130px",
              controls:'classMapSelect',
              isDisable:true,
              dataSource:[],
              optionsKey:{label:'itemName',value:'itemValue'},
              sortable:false,
              },{
              prop:"effectiveTime",
              label:'有效日期',
              width:"180px",
              controls:'text',
              isDisable:true,
              sortable:false,
              },{
              prop:'roleString',
              label: '关联角色',
              width:"130px",
              controls:'text',
              isDisable:true,
              sortable:false,
              }],
              dialogVisible:false,
              dialogCommand:[],
              pluginSetting:{
                  hasPagination:true,
                  mutiSelect:true,//多选栏
                  isDisable:true,
              },
              command:[{
                  text:'查看',
                  class:'green'
              },{
                  text:'删除',
                  class:'blue'
              }],
                delAarry:{//删除数组
                ids:[]
              },
              errorTips:{//对话框 错误提示
                  message:'',
                  details:'',
              },
               filterKey:'',
               filterKeyLang:'',//语种搜索字
               filterKeyRole:'',
    };
  },
  created: function() {
    let _this = this;
    _this.loadTree();
    _this.getSelectData();
    _this.InitStatus();//加载状态
  },
  watch: {
    search(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed:{
     userGroupId: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.selectData.userGroupId)
      },
      languageId:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKeyLang,this.selectData.languageId)
      },
       roles:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKeyRole,this.selectData.roles)
      }
  },
  methods: {
       filterMethod(query){
           this.filterKey=query; 

       },
       filterMethod1(query){
           this.filterKeyLang=query; 

       },
       filterMethodRole(query){
           this.filterKeyRole=query; 

       },
      InitStatus(){//获取状态枚举表
          let _this=this;
          _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
              console.log(res)
              _this.column[7].dataSource=res.result;
          })
        },
      btnClick:function(data){
        if(data=="新增"){
            this.goDetail();
        }else if(data=="删除"){
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
        }else if(data=="导入"){
            let _this=this;
            let name='userImportFile';//具体菜单页面下的导入模板路由name
            let backRouterName=_this.$route.name;//导入模板里面的返回前一页功能需要传入的前一页的路由name
            let redirectedName='user';//获取菜单模块id时需要传菜单的路由name，也就是父级路由name
            let id='default';//key
            _this.$axios.gets('/api/services/app/ModuleManagement/GetByUrl',{Url:redirectedName})
            .then(function(res){
                id=res.result.id;
                _this.$store.state.url=name
                _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
            })
        }
       },
    getSelectData() {
      let _this = this;
      _this.$axios
        .gets("/api/services/app/DataDictionary/GetDictItem", {
          dictName: "UserType"
        })
        .then(function(res) {
          // 身份类型
          _this.selectData.UserType = res.result;
        });
      _this.$axios
        .gets("/api/services/app/DataDictionary/GetDictItem", {
          dictName: "Status001"
        })
        .then(function(res) {
          // 启用状态
          _this.selectData.Status001 = res.result;
        });
      _this.$axios
        .gets("/api/services/app/UserGroup/GetAll", {
          SkipCount: 0,
          MaxResultCount: 100
        })
        .then(function(res) {
          // 所属用户组
          _this.selectData.userGroupId = res.result.items;
          _this.totalCount = res.result.totalCount;
        });
      _this.$axios
        .gets("/api/services/app/Language/GetLanguages")
        .then(function(res) {
          // 语种
          _this.selectData.languageId = res.result.items;
          console.log(res.result)
        });
      _this.$axios
        .gets("/api/services/app/Role/GetAll", {
          SkipCount: 0,
          MaxResultCount: 100
        })
        .then(function(res) {
          // 语种
          _this.selectData.roles = res.result.items;
        });
      _this.$axios
        .gets("/api/services/app/OuManagement/GetOuParentList")
        .then(function(res) {
          // 所属组织
          _this.selectData.ou = res.result;
        });
    },
    closeLeft: function() {
      let self = this;
      self.ifWidth = false;
      self.ifOpen = false;
    },
    openLeft: function() {
      let self = this;
      self.ifWidth = true;
      self.ifOpen = true;
    },
    open(tittle, iconClass, className) {
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: className
      });
    },
    SimpleSearchClick() {
      let _this = this;
        _this.$axios.gets('/api/services/app/User/GetAll',_this.queryParams).then(function(res){//查询表格数据
          _this.$store.commit('setQueryParams',_this.queryParams)
          _this.$store.commit('Init_Table',res.result.items);
          let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.userListEachPage);
          _this.$store.commit('Init_pagination',totalPage)
          _this.$store.commit('Init_TotalCount',res.result.totalCount);
          _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
      })
    },
    goDetail() {
      this.$store.state.url = "/user/userDetail/default";
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.ouName.indexOf(value) !== -1;
    },
    defauleExpandTree(data, key) {
      if (
        typeof data[0] != "undefined" &&
        data[0] != null &&
        typeof data[0][key] != "undefined" &&
        data[0][key] != null &&
        data[0][key] != ""
      ) {
        return [data[0][key]];
      }
    },
    loadTree() {
      let _this = this;
      _this.$axios.gets("/api/services/app/OuManagement/GetAllTree").then(
        function(res) {
          _this.selectTree = res;
          _this.expandId = _this.defauleExpandTree(res, "id");
        },
        function(res) {}
      );
    },
    nodeClick(data, node, self) {
      let _this = this;
      _this.item.id = data.id;
      _this.item.ouName = data.ouName;
      $(self.$el)
        .parents(".el-select-dropdown__list")
        .children(".el-select-dropdown__item")
        .each(function(index) {
          if ($(this).attr("date") == data.id) {
            $(this).click();
          }
        });
    },
    submitSearch() {
      let _this = this;
      _this.queryParams.DisplayName=_this.Name;
      _this.$axios.gets('/api/services/app/User/GetAll', {DisplayName:_this.Name,SkipCount: (_this.page - 1) * _this.oneItem,MaxResultCount: _this.oneItem}).then(function(res){//查询表格数据
          _this.$store.commit('setQueryParams',_this.queryParams)
          _this.$store.commit('Init_Table',res.result.items);
          let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.userListEachPage);
          _this.$store.commit('Init_pagination',totalPage)
          _this.$store.commit('Init_TotalCount',res.result.totalCount);
          _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
      })
    },
    renderContent_selectTree(h, { node, data, store }) {
      if (
        typeof data.children != "undefined" &&
        data.children != null &&
        data.children.length > 0
      ) {
        return (
          <span class="el-tree-node__label" data-id={data.id}>
            <i
              aria-hidden="true"
              class="preNode fa fa-folder-open"
              style="color:#f1c40f;margin-right:5px"
            />
            {data.ouName}
          </span>
        );
      } else {
        return (
          <span class="el-tree-node__label" data-id={data.id}>
            <i
              class="preNode fa fa-file"
              aria-hidden="true"
              style="color:#f1c40f;margin-right:5px"
            />
            {data.ouName}
          </span>
        );
      }
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
                  _this.$axios.posts('http://192.168.100.107:8082/api/services/app/User/BatchDelete',_this.delAarry).then(function(res){
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
     dialogColse(){
          this.dialogVisible=false;
            },
        },
    components:{
        buttonGroup,
        Table,
        dialogBox,
        Tree
    }
};
</script>

<style scoped>
.border-left.rightBox{
    width: calc(100% - 290px);
}
.bg-white {
  background: white;
  /* border-radius: 3px; */
}
.h48 {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e4e4e4;
}
.pl15 {
  padding-left: 15px;
}
.pt5 {
  padding-top: 5px;
}
.fs12 {
  font-size: 12px;
}
.border-left {
  border-left: 1px solid #e4e4e4;
}
.btn {
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
.open-search {
  background-image: url(../../../static/image/common/btn-circle.png);
  background-repeat: no-repeat;
  background-position: center;
  color: #e3e3e3;
  font-size: 12px;
  width: 19px;
  float: right;
  margin-right: 10px;
}
</style>

<style>
.userList .el-button + .el-button {
  margin-left: 0;
}

</style>
