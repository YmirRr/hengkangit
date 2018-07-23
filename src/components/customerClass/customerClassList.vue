<template>
    <div class="customerclass-list commodity member-list">
        <el-row class="bg-white">
            <el-col :span="5" class="max-height left-box">
                <el-col :span='24' class="tree-container customerlist-tree">
                     <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                </el-col>
            </el-col>
            <el-col :span='19' class="border-left min-height">
                <el-row class="h48 pr10 fixed btn-background-color">
                    <el-col :span="12">
                        <div class="btnGroup-box">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                       </div>
                    </el-col>
                    <el-col :span="12" class="pt5">
                        <div class="search-input-member">
                            <div class="search-wapper">
                                <input type="text" placeholder="搜索" v-model="SearchKey" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                <button class="mem-search-btn" @click="searchRight">搜索</button>
                            </div>
                            <div class="search_advance" @click="dialogUserDefined = true">
                                <button class="userDefined advanced-query">
                                    <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                </button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
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
import {terraceAdd} from '../../common/terrace.js'//单页面增删改
export default {
  name: "customerClass",
  data() {
    return {
      ifWidth:true,
      ContactOwner:1,//  客户分类参数(获取所有数据时)
      searchLeft: "",
      ifCan: true,
      classParentId: [
        {
          //分类类型
          value: "1",
          label: "客户分类"
        },
        {
          value: "2",
          label: "供货商分类"
        }
      ],
      tableData: [],
      customerClassTree: [],
      defaultProps: {
        children: "childNodes",
        label: "className",
        id: "id"
      },
      treeEntrySearch:true,//是否包含树节点过滤功能
      treeSuggestSearch:false,//是否包含树节点建议过滤功能
      treeParams:{
            treeName:'customerClassList',//树节点名称
            treeApi:'/api/services/app/ContactClassManagement/GetTreeList?Ower=1'//接口地址
                },
      InputName: "",
      pageIndex: 0, //分页的当前页码
      totalPage: 0, //当前分页总数
      oneItem: 10, //每页有多少条信息
      multipleSelection: [], //复选框选中数据
      idArray: {
        ids: []
      }, //复选框选中数据id
      page: 1, //当前页
      treeCheck: [],
      isClick: [],
      load: true,
      totalItem: 0, //总共有多少条消息
      tableLoading: true,
      treeLoading: false,
      Sorting: "", //table搜索
      Ower: 1, //树形图的地区分类(1.客户分类.2供货商分类)
      isAdd: true, //判断是增加还是修改
      tittle: "", //模态框tittle
      showParent: true, //上级组织单元是否可选
      expandId:[],//默认展开kehu树节点
      // 错误信息提示开始
      option: {
        vRail: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        vBar: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        hRail: {
          height: "0"
        }
      },
      dialogUserConfirm:false,//删除提示
      detailParentId:'',//tree节点点击获取前往detail新增页上级菜单ID
      detailParentName:'',//tree节点点击获取前往detail新增页上级菜单name
      detail_message_ifShow: false,
      errorMessage: false,
      dialogVisible:false,
      dialogCommand:[],
      dateabc:'',
      // 错误信息提示结束
       response:{
                details:'',
                message:'',
                validationErrors:[],
            },

      selfAr: [] ,//根据id获得树形节点本身
      SearchKey:'',//右上搜索
      tableModel:'customerClassList',
      errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
      pluginSetting:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
                },
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
    }],
    dialogSetting:{
        message:'',//提示信息
        dialogName:'',//对话框名称
        dialogType:'',//对话框类型
                },
      httpUrl:{
                view:'/customerClass/customerClassModify/',//查看详情
                delete:'/api/services/app/ContactClassManagement/Delete',//单条删除
                query:'/api/services/app/ContactClassManagement/GetNoteList',//条件查询
                },
        queryParams:{//查询条件参数
                Id:0,
                ContactOwner:1,
                SearchKey:'',
                SkipCount:(this.$store.state.customerClassListCurrentPage-1)*this.$store.state.customerClassListEachPage,
                MaxResultCount:this.$store.state.customerClassListEachPage,
            },
          column: [{
                    prop: 'classCode',
                    label: '客户分类编码',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'className',
                    label: '客户分类名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'classParentId_ClassName',
                    label: '上级客户分类',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'remark',
                    label: '备注',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'status',
                    label: '状态',
                    controls:'classMapSelect',
                    isDisable:true,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    }, {
                    prop: 'createdBy',
                    label: '创建人',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                  }, {
                    prop: 'createdTime',
                    label: '创建时间',
                    controls:'datetime',
                    isDisable:true,
                    sortable:false,
                }],
        command:[{
            text:'查看',
            class:'green'
        },{
            text:'删除',
            class:'blue'
        }],
        delAarry:{
            ids:[]
          },
    };

  },
  //----------------创建------------------------------
  created: function() {
    let self = this;
    self.InitStatus();//初始化状态枚举表
  },
  // ---------------------验证---------------
  validators: {
    "dialogData.classCode": function(value) {
      //客户分类编码
      return this.Validator.value(value).required().maxLength();
    },
    "dialogData.className": function(value) {
      //客户分类名称
      return this.Validator.value(value).required().maxLength();
    },
    "dialogData.classParentId": function(value) {
      //上级客户分类
      return this.Validator.value(value).integer();
    },
    "dialogData.remark": function(value) {
      //备注
      return this.Validator.value(value).required().maxLength(200);
    }
  },
  watch: {
    searchLeft(val) {
      this.$refs.tree.filter(val);
    },

    queryParams:{
        handler:function(val,oldVal){
        },
        deep:true
    },

  },
  methods: {
    //   按钮组事件--------------------------------------------------
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
                }
        },
        //---------------------------------获取状态枚-举表-----------------------------
        InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    console.log(res)
                    _this.column[4].dataSource=res.result;
                })
                },
    loadTableData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',_this.queryParams).then(function(res){
                _this.$store.commit('setQueryParams',_this.queryParams)
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.customerClassListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
            })
    },
    TreeNodeClick(data){//树节点点击回调
        let _this=this;
            if(data.id){
                _this.dateabc=data.id;
            }else{
                _this.dateabc=data;
            }
            _this.detailParentId=data.id;//
            _this.detailParentName=data.moduleName;
            _this.queryParams.Id=_this.dateabc;
            _this.tableLoading=true;
            _this.queryParams.SearchKey='';
            _this.loadTableData();
    },
    query(){//条件查询
        let _this=this;
        _this.loadTableData();
        },
    // ---------------------------------------获取所有列表数据-----------------
    getDataList() {
            let self = this;
            self.queryParams.SearchKey=self.SearchKey;
            self.$axios.gets("/api/services/app/ContactClassManagement/GetNoteList", {SearchKey:self.SearchKey,ContactOwner:self.ContactOwner,SkipCount: (self.page - 1) * self.oneItem,MaxResultCount: self.oneItem}).then(res => {
            self.$store.commit('setQueryParams',self.queryParams)
            self.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/self.$store.state.customerClassListEachPage);
            self.$store.commit('Init_pagination',totalPage);
            self.$store.commit('Init_TotalCount',res.result.totalCount);
            self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        });
    },



    // ---跳转--------open----------------------------------------------
    goDetail() {
      //点击新增跳转
      let self=this;
      if(typeof(self.detailParentId)=='number'){
          self.$store.state.url='/customerClass/customerClassDetail/'+self.detailParentId
          self.$router.push({path:this.$store.state.url})//点击切换路由

      }else{
          self.$store.state.url='/customerClass/customerClassDetail/default'
          self.$router.push({path:this.$store.state.url})//点击切换路由
      }
    },
// -------------------------------修改--------------------
    goModify: function(id) {
      //点击跳转修改页modify
      this.$store.state.url = "/customerClass/customerClassModify/" + id;
      this.$router.push({ path: this.$store.state.url }); //点击切换路由
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

    //右边搜索框
    searchRight() {
      this.getDataList();
    },
    //---清除数据--------------------------------------------------
    clearAddDate: function() {
      //清除新增数据
      let self = this;
      self.dialogData = {
        //dialog数据
        id: "",
        Ower: 1,
        groupId: "1", //集团ID
        ouId: "1", //组织单元ID
        classCode: "", //部门代码
        className: "", //部门名称
        classParentId: "", //父客户id
        remark: "", //备注
        status: "" //启用状态
      };
    },

    handleSelectionChange(val) {
      //点击复选框选中的数据
      this.multipleSelection = val;
    },
    // --------多项删除--------------
     confirm(){
                let _this=this;
                _this.choseAjax='rows'
                if(_this.multipleSelection.length>0){
                _this.dialogUserConfirm=true;
                }
            },
    getErrorMessage(message,details,validationErrors){
              let self=this;
              self.response.message='';
              self.response.details='';
              self.response.validationErrors=[];
              if(details!=null && details){
                  self.response.details=details;
              }
              if(message!=null && message){
                  self.response.message=message;
              }
              if(message!=null && message){
                  self.response.validationErrors=validationErrors;
              }
          },
        //   对话框点击------------------------------------------
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
                _this.$axios.posts('/api/services/app/ContactClassManagement/BatchDelete',_this.delAarry).then(function(res){
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.dispatch('InitTable');
                    _this.$store.commit('setTableSelection',[])
                    _this.dialogVisible=false;
                    _this.delAarry.ids=[];
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    _this.$store.dispatch('InitTree');

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
    Tree
        }
};
</script>

<style scoped>
.customerclass-list .border-left{
    width: calc(100% - 290px);
    border-left: 1px solid #E4E4E4;
}
.dialog_confirm_message .el-dialog__footer .dialog_footer_bt_long {
    width: 100%;
}
.dialog_confirm_message .el-dialog__footer .dialog_footer_bt_long{
    color: #ccc;
}
.error_tips {
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
.TreeMenu {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
}
.TreeMenu button {
  display: block;
  width: 100%;
  height: calc(100% / 3);
}
.formSearch {
  float: right;
}
.bg-white {
  background: white;
  border-radius: 3px;
}
.pl5 {
  padding-left: 5px;
}
open {
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
/* 客户分类搜索框底部边框 */
.customerlist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.customerlist-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 4px 15px 8px;
}
.customerlist-tree .el-input__prefix{
    left: 20px;
}
.el-input__icon{
    margin-top:-2px;
}
.max-height{
    max-height:450px;
}
.tree-container{
    height: 440px;
}
.tree-container>div{
    height: 93%;
}
.search_button_wrapper{
  width: 20%;
  margin-left: 10px;
  float: left;
  position: relative;
}
.customerclass-list .el-button + .el-button {
  margin-left: 0;
}
.customerclass-list .bCustSearch .el-input__inner {
  height: 30px;
  border-radius: 30px;
}

.customerclass-list .bgcolor {
  margin-bottom: 0;
}
.customerclass-list .cell .el-input__inner {
  border: none;
  text-align: center;
  padding: 0;
}
.customerclass-list .bgw .el-input__inner {
  background-color: white;
}
.customerclass-list .bgg .el-input__inner {
  background-color: #fafafa;
}
</style>
