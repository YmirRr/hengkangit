<template>
  <div class="online-list commodity">
    <el-row class="bg-white">

      <el-col :span="5" class="max-height left-box">
        <div class="tree-container">
          <tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></tree>
        </div>
      </el-col>

      <el-col :span='19' class="border-left min-height">
        <el-row class="h48 pr10 fixed btn-background-color">
          <el-col :span="24">
            <div class="btnGroup-box">
              <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
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
    import tree from '../../base/tree/tree'
    import buttonGroup from '../../base/buttonGroup/buttonGroup'
    import Table from '../../base/Table/Table'
    import dialogBox from '../../base/dialog/dialog'
    export default{
        name:"onlineStore",
        mounted() {
          console.log(this.$store.state.onlineStoreListCurrentPage)
        },
        data() {
          return {
            // 树形组件
            onlineTree: [],
            treeParams:{ // 获取树形必要的数据模型配置及接口
              treeName:'onlineStoreList',
              treeApi:'/api/services/app/DataDictionary/GetDictItemTreeByDictName?dictCode=OMS_Platform'
            },
            defaultProps: { // 树形渲染需要的参数
              children: "childNodes",
              label: "itemName",
              id: 'itemValue'
            },
            expandId:[], // 默认展开树节点
            treeEntrySearch:true,
            treeSuggestSearch:false,
            // 按钮组件
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
               text:'审核',
               class:'bt_auxiliary',
               icon:'icon-shenhe',
               disabled:false,
            },{
               text:'反审核',
               class:'bt_saveAdd',
               disabled:false,
            },{
               text:'打印',
               class:'bt_print',
               icon:'icon-print',
               disabled:false,
            },{
               text:'导出',
               class:'bt_out',
               icon:'icon-daochu',
               disabled:false,
            }],
            // 表格组件
            tableData: [],
            ContactOwner: 1,
            totalPage: 0, // 当前分页总数
            oneItem: 10, // 每页有多少条信息
            tableLoading: true,
            detailParentId:'', // tree节点点击获取前往detail新增页上级菜单ID
            detailParentName:'',
            httpUrl: { // 表格内部请求接口的地址
               view:'/onlineStore/onlineModify/',// 行内查看详情
               delete:'http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/DeleteByShopId',// 行内单条删除
               query:'http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch' //数据加载
            },
            tableModel:'onlineStoreList', // 用于区别数据模型名称(store里存放的数据)
            queryParams: { // 请求接口需要传递的参数
              PlatformId: '', // 平台 1淘宝,2京东,3唯品会
              Status: '', // 查询状态 0未送审,1已送审2,已审核,3已退审,4已生效,5已作废,6已终止
              notShowWebShowIdArr: [], // 屏蔽的店铺Id数组
              SkipCount:(this.$store.state.onlineStoreListCurrentPage-1)*this.$store.state.onlineStoreListEachPage,
              MaxResultCount:this.$store.state.onlineStoreListEachPage,
            },
            column: [{
                    prop: 'platformName',// 字段名称
                    label: '平台', // 表头名称
                    controls:'button',// 控件类型
                    isDisable:true,// 是否可编辑
                    sortable:false,// 是否可排序
                    }, {
                    prop: 'shopCode',
                    label: '店铺代码',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'shopName',
                    label: '店铺名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'ouName',
                    label: '业务组织',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'sellerName',
                    label: '卖家昵称',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'openingDate',
                    label: '开店日期',
                    controls:'datetime',
                    isDisable:true,
                    sortable:false,
                },{
                    prop: 'auditedName',
                    label: '状态',
                    controls: "classMapSelect",
                    isDisable:true,
                    sortable:false,
                },{
                    prop: 'checker',
                    label: '审核人',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                }],
            command:[ // 用户配置表格操作栏中功能项
            {
              text:'查看',
              class:'blue',
            },{
              text:'删除',
              class:'blue'
            }],
            delAarry:{
              ids:[]
            },
            pluginSetting: { // 用户表格配置项设置
              hasPagination:true, // 是否包含分页
              mutiSelect:true,  // 是否包含多选栏
              isDisable:true,// 是否可编辑
              isFix:"right"
            },

            // diolog组件
            errorTips:{// 对话框 错误提示
               message:'',
               details:'',
            },
           
            dialogSetting:{ // 对话框基本信息配置
               message:'',// 提示信息
               dialogName:'',// 对话框名称
               dialogType:'',// 对话框类型
            },
            dialogVisible:false, // 用户控制对话框是否可见
            dialogCommand:[], // 用于配置对话框按钮
            };
        },
        methods: {
          // 菜单按钮点击事件
          btnClick: function(data){
             this.$nextTick(()=>{
               if(data=="新增"){
                   if(typeof(this.detailParentId)=='number'){
                       this.$store.state.url='/onlineStore/onlineDetails/'+this.detailParentId
                       this.$router.push({path:this.$store.state.url,query:{itemName:this.detailParentName,itemValue:this.detailParentId}})//点击切换路由
                   }else{
                       this.$store.state.url='/onlineStore/onlineDetails/default'
                       this.$router.push({path:this.$store.state.url})//点击切换路由
                   }
                }else if(data=="删除"){
                  this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                  console.log(this.SelectionChange);
                  if(this.SelectionChange.length==0){
                      this.$message({
                          type: 'info',
                          message: '请勾选需要更改删除的记录！'
                      });
                  }else{
                      this.dialogSetting.dialogName='delDialog'
                      this.dialogSetting.message="确定删除？";
                      this.dialogSetting.dialogType="confirm";
                      this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                      this.dialogVisible=true
                  }
                }else if(data=="审核") {
                      let _this = this;
                      _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                      if(_this.SelectionChange.length==0){
                        this.$message({
                          type: 'warning',
                          message: '请勾选需要审核的项！'
                        });
                      }else if(_this.SelectionChange.length>1){
                        this.$message({
                          type: 'warning',
                          message: '一次只能审核一条！'
                        });
                      }else{
                        for(let i in _this.SelectionChange){
                          _this.checkId=Number(_this.SelectionChange[i].id);
                        }
                        _this.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/Check', {id:_this.checkId}
                        ).then(function(res) {
                          _this.open('审核成功','el-icon-circle-check','successERP');
                          
                        },function(res){
                          _this.dialogVisible = true;
                          _this.dialogSetting.dialogType = "submit";
                          _this.dialogSetting.dialogName = 'cancelDialog';
                          _this.dialogSetting.message = "信息提报有误";
                          _this.errorTips.message = res.error.message;
                          _this.errorTips.details = '';
                          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
                        });
                      }
                }else if(data=="反审核") {
                    let _this=this;
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    if(_this.SelectionChange.length==0){
                      this.$message({
                        type: 'warning',
                        message: '请勾选需要反审核的项！'
                      });
                    }else if(_this.SelectionChange.length>1){
                      this.$message({
                        type: 'warning',
                        message: '一次只能反审核一条！'
                      });
                    }else{
                      for(let i in _this.SelectionChange){
                        _this.againstCheckId=Number(_this.SelectionChange[i].id);
                      }
                      _this.$axios.posts("http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/InsteadCheck", {id:_this.againstCheckId}
                      ).then(function(res) {
                        _this.open('反审核成功','el-icon-circle-check','successERP');
                      },function(res){
                        _this.dialogVisible = true;
                        _this.dialogSetting.dialogType = "submit";
                        _this.dialogSetting.dialogName = 'cancelDialog';
                        _this.dialogSetting.message = "信息提报有误";
                        _this.errorTips.message = res.error.message;
                        _this.errorTips.details = '';
                        _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
                      });
                    }
                }
             });
              
          },
          // 树节点点击回调事件
          TreeNodeClick(data){
              console.log(data)
                let _this=this;
               _this.detailParentId=data.itemValue;
               _this.detailParentName=data.itemName;
               _this.queryParams.PlatformId=data.itemValue;
               _this.queryParams.SkipCount= 0;
               _this.$store.commit('tableLoad_Complete',true);
               if(data.itemValue==0){
                  _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch',_this.queryParams).then(function(res){
                  _this.$store.commit('Init_Table',res.result.items); // 初始化表格
                  let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.onlineListEachPage);
                  _this.$store.commit('Init_pagination',totalPage);  // 总页数
                  _this.$store.commit('tableLoad_Complete',false);  // 关闭加载动画
                  _this.$store.commit('Init_TotalCount',res.result.totalCount);  // 初始化总数
                  _this.$store.commit('setCurrentPage',1); // 当前页数
                })
               }else{
                _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch',{PlatformId:data.itemValue,SkipCount:_this.queryParams.SkipCount,MaxResultCount:_this.queryParams.MaxResultCount}).then(function(res){
                    console.log(res);
                    _this.$store.commit('Init_Table',res.result.items);
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.onlineListEachPage);
                    _this.$store.commit('Init_pagination',totalPage);
                    _this.$store.commit('tableLoad_Complete',false);
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1);
                })
              }
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

          // 关闭对话框
          dialogColse(){
             this.dialogVisible=false;
          },
          // 对话框点击
          dialogClick(parmas){
            let delArray = [];
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    for(var i in this.SelectionChange){
                        delArray.push(this.SelectionChange[i].id)
                    }
                    let _this=this;
                    // 删除
                    _this.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/BatchDelete',{Ids:delArray})
                    .then(function(res){
                        _this.open('删除成功','el-icon-circle-check','successERP');
                        _this.$store.commit('setQueryParams',_this.queryParams)
                        _this.$store.dispatch('InitTable');
                        _this.$store.commit('setTableSelection',[]);
                        delArray = [];
                        _this.dialogVisible=false;
                    },function(res){
                        _this.$message({
                           type: 'warning',
                           message: res.error.message
                        });
                    });
               }else if (parmas.dialogName=="cancelDialog") {
                    this.dialogVisible=false;
               }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }
          },
    },

    // 组件
        components: {
            tree,
            buttonGroup,
            Table,
            dialogBox
        }
    }
</script>
<style scoped>
.online-list .border-left{
   width: calc(100% - 290px);
   border-left: 1px solid #E4E4E4;
}
.bg-white {
   background: white;
   border-radius: 3px;
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
</style>