<template>
    <div class="rulecode-list commodity member-list">
        <el-row class="bg-white"> 
            <el-col  class="min-height">
                <el-row class="h48 pr10 fixed btn-background-color">
                    <el-col :span="14">
                        <div class="btnGroup-box">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                       </div>
                    </el-col> 
                    <el-col :span="10" class="pt5">
                        <div class="search-input-member">
                            <div class="search-wapper">
                                <input type="text" placeholder="搜索" v-model="RulenName" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
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

export default {
  name: "customerClass",
  data() {
    return {
      ifWidth:true,
      searchLeft: "",
      ifCan: true,
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
      isAdd: true, //判断是增加还是修改
      tittle: "", //模态框tittle
      tableData: [],
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
      RulenName:'',//右上搜索
      tableModel:'ruleCodeList',
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
                   view:'/ruleCode/ruleCodeModify/',//查看详情
                   delete:'/api/services/app/BasBillcodeRuleManagement/Delete',//单条删除
                   query:'/api/services/app/BasBillcodeRuleManagement/GetAll',//条件查询
                },
        queryParams:{//查询条件参数
                RulenName:"",
                SkipCount:(this.$store.state.ruleCodeListCurrentPage-1)*this.$store.state.ruleCodeListEachPage,
                MaxResultCount:this.$store.state.ruleCodeListEachPage,
            },
          column:[{
                    prop:'billTypeTValue',
                    label:'单据类型',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'rulenName',
                    label: '规则名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'billcodeRulePrefix',
                    label: '编码前缀',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'example',
                    label: '示例',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'codeLen',
                    label: '最短流水号',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'status',
                    label:'状态',
                    controls:'classMapSelect',
                    isDisable:true,
                    sortable:true,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
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
    self.InitStatus();
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

        // -------------------------------------------加载状态框---------------------------------
    InitStatus(){
        let _this=this;
        _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
            console.log(res.result)
            _this.column[5].dataSource=res.result;
        })
        },

    query(){//条件查询
            let _this=this;
            _this.$axios.gets('/api/services/app/ContactClassManagement/GetNoteList',_this.queryParams).then(function(res){//查询表格数据
                _this.$store.commit('setQueryParams',_this.queryParams)
                _this.$store.commit('Init_Table',res.result.items); 
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.ruleCodeListEachPage);
                _this.$store.commit('Init_pagination',totalPage) 
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1                       
            })
        },



    // ---跳转--------open----------------------------------------------
    goDetail() {
      //点击新增跳转
      let self=this;
      self.$store.state.url='/ruleCode/ruleCodeDetail/default'
      self.$router.push({path:this.$store.state.url})//点击切换路由

    },
// -------------------------------修改--------------------
    goModify: function(id) {
      //点击跳转修改页modify
      this.$store.state.url = "/ruleCode/ruleCodeModify/" + id;
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
        let _this=this;
        _this.queryParams.RulenName=_this.RulenName;
       _this.$axios.gets('/api/services/app/BasBillcodeRuleManagement/GetAll',_this.queryParams).then(function(res){            
            _this.$store.commit('setQueryParams',_this.queryParams)
            _this.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.ruleCodeListEachPage);
            _this.$store.commit('Init_pagination',totalPage);
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
         })
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
                _this.$axios.posts('http://192.168.100.107:8082/api/services/app/BasBillcodeRuleManagement/BatchDelete',_this.delAarry).then(function(res){
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
    }
};
</script>

<style scoped>
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
.rulecode-list .el-button + .el-button {
  margin-left: 0;
}
.rulecode-list .bCustSearch .el-input__inner {
  height: 30px;
  border-radius: 30px;
}

.rulecode-list .bgcolor {
  margin-bottom: 0;
}
.rulecode-list .cell .el-input__inner {
  border: none;
  text-align: center;
  padding: 0;
}
.rulecode-list .bgw .el-input__inner {
  background-color: white;
}
.rulecode-list .bgg .el-input__inner {
  background-color: #fafafa;
}
.rulecode-list .pt10{
  padding-top:15px
}
</style>
