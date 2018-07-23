<template>
  <div class="auditStrategyList commodity">
    <el-row class="bg-white">
      <!-- 左边 -->
      <el-col class="left-box" v-show="ifWidth">
        <el-row class="h48 pl15">
          <el-col :span="18">
            <img src="../../../../static/image/common/search_btn.png"  class="closeLeft">
            <span class="f14">查询</span>
          </el-col>
          <el-col :span="2" :offset="4">
            <i class="iconfont icon-gray icon-jianhao f18"  @click="closeLeft"></i>
          </el-col>
        </el-row>
        <!-- 代码 -->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">代码</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="AuditStrategyParams.TacticCode"></el-input>
          </el-col>
        </el-row>
        <!-- 名称 -->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">名称</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="AuditStrategyParams.TacticName"></el-input>
          </el-col>
        </el-row>
        <!-- 状态 -->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">状态</label>
          </el-col>
          <el-col :span="15">
            <el-select clearable filterable   v-model="AuditStrategyParams.Status" placeholder="" class="input-entry">
              <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row class="mt10">
          <el-col :span="8">
            <label class="input-label">备注</label>
          </el-col>
          <el-col :span="15">
            <el-input class="input-entry" v-model="AuditStrategyParams.Remark"></el-input>
          </el-col>
        </el-row>
        <!-- 查询按钮 -->
        <el-row class="mt20">
          <el-col :span="8">
            <div class="height1"></div>
          </el-col>
          <el-col :span="14">
            <span class="search-btn" @click="SimpleSearchClick">查询</span>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右边button组和table表格-->
      <el-col class="border-left min-height" :class="ifOpen?'rightBox':'newRight'">
        <el-row class="h48">
          <el-col :span="ifWidth?0:2" class="search-block" :class="[{br:!ifWidth}]">
            <div @click="openLeft">
              <img src="../../../../static/image/common/search_btn.png">
              <span>查询</span>
              <!-- <span class='open-search'>+</span> -->
              <i class="iconfont icon-gray icon-jiahao f18 fr mr5" ></i>
            </div>
          </el-col>
          <el-col :span="ifWidth?24:22">
            <el-col :span="24">
              <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
            </el-col>
          </el-col>
        </el-row>
        <!-- 表格 -->
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
    import buttonGroup from '../../../base/buttonGroup/buttonGroup'
    import Table from '../../../base/Table/Table'
    import dialogBox from '../../../base/dialog/dialog'
    export default{
        data(){
            return {
                AuditStrategyParams:{//查询条件参数
                  TacticCode:'',
                  TacticName:'',
                  Status:'',
                  Remark:'',
                  Sorting:'',
                  SkipCount:(this.$store.state.auditStrategyListCurrentPage-1)*this.$store.state.auditStrategyListEachPage,
                  MaxResultCount:this.$store.state.auditStrategyListEachPage,
                },
               selectData: {//条件查询下拉数据
                  Status001:[],//宝贝状态
                },
                ifOpen:false,
//--------------确认删除开始-----------------
                search:'',
                tableLoading:false,
                tableData:[],
                pageIndex:1,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                page:1,//当前页
                load:'loadTableData',
                totalItem:0,//总共有多少条消息
                ifWidth:false,
                dialogUserDefined:false,//dialog

                response:{
                  details:'',
                  message:'',
                  validationErrors:[],
                },
                tableModel:"auditStrategyList",
                dialogVisible:false,
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                dialogCommand:[],
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
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
                    text:'审核',
                    class:'bt_auxiliary',
                    icon:'icon-shenhe',
                    disabled:false,

                }],
                 httpUrl:{
                   view:'/auditStrategy/auditStrategyModify/',//查看详情
                   delete:'http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/DeleteTacticById',//单条删除
                   query:'http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/GetAll',//条件查询
                },
                queryParams:{//查询条件参数
                    SkipCount:(this.$store.state.logisticsStrategyListCurrentPage-1)*this.$store.state.logisticsStrategyListEachPage,
                    MaxResultCount:this.$store.state.logisticsStrategyListEachPage,
                    },
                column: [{
                            prop: 'tacticCode',
                            label: '代码',
                            controls:'text',
                            isDisable:true,
                            sortable:false,
                            isFix:'',
                            }, {
                            prop: 'tacticName',
                            label: '名称',
                            controls:'text',
                            isDisable:true,
                            sortable:false,
                            }, {
                            prop: 'status',
                            label: '状态',
                            controls:'text',
                            isDisable:true,
                            sortable:false,
                            }, {
                            prop: 'remark',
                            label: '备注',
                            controls:'text',
                            isDisable:true,
                            sortable:false,
                            dataSource:[],
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
                             delAarry:[],
                             delObj:{},


            }
        },
        created:function(){
                let _this=this;
                // 表格内下拉数据配置
                _this.InitStatus();
                // 初始化表格
                _this.loadTableData();
                // 初始化状态下拉框
                _this.getSelectData();
             },
        methods:{
            // 表格内下拉数据配置
            InitStatus(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    _this.column[3].dataSource=res.result;
                })
            },
            // 初始化状态下拉框
            getSelectData() {
                  let _this = this;
                  _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "Status001"
                    }).then(function(res) {
                    _this.selectData.Status001 = res.result;
                    console.log(_this.selectData.Status001);
                  });
            },
            // btn组点击
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
              }else if(data=="审核"){

              }
            },
            closeLeft:function(){
               let self = this;
               self.ifWidth = false;
               self.ifOpen = false;
            },
            openLeft:function(){
               let self = this;
               self.ifWidth = true;
               self.ifOpen = true;
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
            loadTableData(){//表格
                let _this=this;
                _this.ajaxTable({SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem},'loadTableData')
            },
            ajaxTable(data,event){
                 let _this=this;
                _this.tableLoading=true
                _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/GetAll',data).then(function(res){
                    _this.load=event;
                    _this.tableData=res.result.items;
                    _this.totalItem=res.result.totalCount
                    _this.totalPage=Math.ceil(res.result.totalCount/_this.oneItem);
                    _this.tableLoading=false;

                })
            },
            SimpleSearchClick() {//输入条件查询
                  let _this = this;
                  _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/GetSearchData',_this.AuditStrategyParams).then(function(res){//查询表格数据
                    _this.$store.commit('setQueryParams',_this.AuditStrategyParams);
                    _this.$store.commit('Init_Table',res.result.items);
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.logisticsStrategyListEachPage);
                    _this.$store.commit('Init_pagination',totalPage);
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
                  })
            },
            // 点击新增跳转路由
            goDetail(){
                this.$store.state.url='/auditStrategy/auditStrategyDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
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

             dialogClick(parmas){//对话框按钮点击事件
                if(parmas.dialogButton=="确定"){
                    let _this=this;
                    let delArray = [];
                    if(parmas.dialogName=="delDialog"){
                    //this.del_ThisData()
                        _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                        console.log(_this.SelectionChange);
                        for(var i in _this.SelectionChange){
                            delArray.push(_this.SelectionChange[i].id)
                        }
                        console.log(delArray)
                        //批量删除
                        _this.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/BatchDeleteTacticByIdArr',
                        {Ids:delArray}
                        ).then(function(res){
                                // _this.queryParams.CategoryId="";
                                _this.open('删除成功','el-icon-circle-check','successERP');
                                _this.$store.commit('setQueryParams',_this.queryParams)
                                _this.$store.dispatch('InitTable');
                                _this.$store.commit('setTableSelection',[])
                                _this.dialogVisible=false;
                                //_this.loadTree();

                        }).catch(function(err){
                            _this.dialogVisible=false;
                            _this.delArray=[];
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
    }
</script>
<style scoped>
.border-left.rightBox{
    width: calc(100% - 290px);
}
.border-left.newRight{
    width: 100%;
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
.open-search{
    background-image: url(../../../../static/image/common/btn-circle.png);
    background-repeat: no-repeat;
    background-position: center;
    color: #E3E3E3;
    font-size: 12px;
    width: 19px;
    float: right;
    margin-right: 10px;
}
</style>

<style>
.auditStrategyList .el-button+.el-button{
    margin-left: 0;
}
</style>
