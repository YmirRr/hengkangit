 <template>
    <div class="adstrArea-wrapper commodity">
        <el-row class="bg-white">
            <!-- 左侧输入框与树形控件 -->
            <el-col :span="5" class="max-height left-box">
                <el-col :span='24' class="tree-container adlist-tree">
                    <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                </el-col>   
            </el-col>
            
            <!-- 右边数据列表 -->
            <el-col :span='19' class="border-left min-height" id="adminTable">
                <!-- 按钮组 -->
                <el-row class="h48 fixed">
                    <el-col :span="13">
                        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup> 
                    </el-col> 
                   <el-col :span="11">
                    <div class="search-input-group pt5">
                        <div class="search_input_wapper" @keyup.enter="submitSearch">
                            <el-input
                                v-model="SearckKey"
                                placeholder="搜索..."
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
               
                <!-- 数据列表 -->
                <el-row>
                    <el-col :span='24'>
                        <Table :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>
                
            </el-col>
            <!-- ************************************************** -->
            <!-- dialog确认是否删除提示 -->
           
            <!-- dialog -->
            <!-- 数据提交有误的数据提示框 -->
            <!-- <submitError :submitData="submitData"></submitError> -->
        </el-row>
   <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     
    </div>
</template>

 <script>
    // import submitError from '../Common/submitError';
    import buttonGroup from '../../base/buttonGroup/buttonGroup'
    import Table from '../../base/Table/Table'
    import dialogBox from '../../base/dialog/dialog'
    import Tree from '../../base/tree/tree'
    import {terraceAdd} from '../../common/terrace.js'//单页面增删改
    export default {
        name:'adminstrAreaList',
         data(){
            return{
                submitData:{//数据提交有误的提示参数
                    submitErrorMessage:false,
                    detail_message_ifShow: false,
                    response: {
                        details: "",
                        message: "",
                        validationErrors: []
                    },
                },
                treeLoading:false,// 树形控件的动态加载效果
                tableLoading:true,// 表格的动态加载效果
                SearckKey:'',
                SkipCount:0,
                MaxResultCount:10,                
                pageSize:10, //每页有多少条数据
                totalCount:0,//总共有多少条数据
                totalPage:0,//总页数
                pageIndex:1,//分页的当前页码
                tableData:[],
                // --------------------------树形控件数据
                height:'0px',
                adminAreaTree:[],
                defaultProps: {
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                filterText:'',
                nodeId:0,
                expandId:[],//默认展开的树节点
                // 错误信息提示开始
                detail_message_ifShow:false,
                // errorMessage:false,
                // 错误信息提示结束
                //--------------确认删除开始-----------------               
                dialogUserConfirm:false,//用户删除保存提示信息
                row:{},//存储用户点击删除条目数据
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                multipleSelection: {},//复选框选中数据
                //--------------确认删除开始-----------------  
                // selectedIds: {}, //复选框选中数据
                // restaurants:[],
                // isTrue:true,//批量删除键能否点击
                //--------------新增页默认上级地区的参数-----------------

                detailParentId:'',//tree节点点击获取前往detail新增页上级菜单ID
                detailParentName:'',//tree节点点击获取前往detail新增页上级菜单name
                treeEntrySearch:true,//是否包含树节点过滤功能
                treeSuggestSearch:false,//是否包含树节点建议过滤功能
                treeParams:{
                    treeName:'adminstrAreaList',//树节点名称
                    treeApi:'/api/services/app/AdAreaManagement/GetTree'//接口地址
                },
                tableModel:'adminstrAreaList',
                httpUrl:{
                   view:'/adminstrArea/adminstrAreaModify/',//查看详情
                   delete:'/api/services/app/AdAreaManagement/Delete',//单条删除
                   query:'/api/services/app/AdAreaManagement/GetListByCondition',//条件查询
                },
                queryParams:{//查询条件参数
                    NodeId:0,
                    SearckKey:"",
                    SkipCount:(this.$store.state.adminstrAreaListCurrentPage-1)*this.$store.state.adminstrAreaListEachPage,
                    MaxResultCount:this.$store.state.adminstrAreaListEachPage,
                 },
                  column:[{
                    prop:'areaCode',
                    label:'行政地区编码',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'areaName',
                    label:'行政地区名称',
                    controls:'button',
                    isDisable:true,
                    sortable:false,

                    },{
                    prop:'areaParentId_AreaName',
                    label:'上级行政地区',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'remark',
                    label:'备注',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop:'status',
                    label:'状态',
                    controls:'classMapSelect',
                    isDisable:true,
                    sortable:false,
                    dataSource:[],
                    optionsKey:{label:'itemName',value:'itemValue'}
                    }, {
                    prop:'createdBy',
                    label:'创建人',
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
                dialogVisible:false,
                dialogCommand:[],
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:true,
                },
                command:[{
                    text:'查看',
                    class:'blue'
                },{
                    text:'删除',
                    class:'blue'
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
                }],
                delAarry:{//删除数组
                     ids:[]
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
            }
            
        },
        created(){
            //  this.getDataList();
            //  this.loadTree();
             this.InitStatus();
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods:{
            InitStatus(){//获取状态枚举表
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
                    console.log(res)
                    _this.column[4].dataSource=res.result;
                })
            },
            // --------------------------------------按钮点击-----------------
            btnClick:function(data){
            if(data=="新增"){
                this.goAdd();
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
                let name='menuImportFile';//具体菜单页面下的导入模板路由name
                let backRouterName='menuList';//导入模板里面的返回前一页功能需要传入的前一页的路由name
                let id='default';//key
                _this.$store.state.url=name
                _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
                 }
             },
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
            getHeight(){
                 $(".tree-container").css({
                    height:parseInt($('.border-left').css('height'))-48+'px'
                })
                $(".border-left").css({
                    height:$('.bg-white').css('height')
                })
            },
            // ----------树形控件的处理函数开始----------
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
              if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                  return (
                      <span class="el-tree-node__label" data-id={data.id}>
                      <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                          {data.areaName}
                      </span>
                  );
              }else{
                  return (
                      <span class="el-tree-node__label" data-id={data.id}>
                      <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                          {data.areaName}
                      </span>
                  );
              }
            },
            loadTree(){// 获取树形节点
                    let _this=this;
                    _this.treeLoading=true;
                    _this.$axios.gets('/api/services/app/AdAreaManagement/GetTree')
                    .then(function(res){
                            // console.log(res.result);
                            // for(let i in res.result){
                            //     _this.adminAreaTree[0].childItems=res.result;
                            // }
                            // console.log(_this.adminAreaTree);
                           _this.adminAreaTree=res.result
                           _this.expandId=_this.defauleExpandTree(res.result,'id')
                            // _this.loadIcon();
                            _this.treeLoading=false;
                    },function(res){
                        _this.treeLoading=false;
                    })
            },               
                //复选框中选中的数据(用于做批量删除)
                handleSelectionChange: function(arr1) {
                    let _this = this;
                    _this.multipleSelection.ids = [];
                    for (let val of arr1) {
                        _this.multipleSelection.ids.push(val.id);
                    }
                    // _this.isTrue=false;
                    // console.log(_this.multipleSelection);
                },
                nodeClick(data){// 节点被点击时的回调
                    // console.log(data);
                    let _this=this;
                    _this.detailParentName=data.areaName;
                    _this.detailParentId=data.id;
                    _this.tableLoading=true;
                    _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByCondition',{nodeId:data.id,SkipCount:(_this.pageIndex-1)*_this.pageSize,MaxResultCount:_this.pageSize})
                    .then(function(res){
                        // console.log(res.result);
                        _this.tableData=res.result.items;
                        _this.totalCount=res.result.totalCount;
                        _this.totalPage=Math.ceil(res.result.totalCount/_this.pageSize);
                        _this.tableLoading=false;
                        },function(res){
                        _this.tableLoading=false;
                    })
                },
                TreeNodeClick(data){//树节点点击回调   
                    let _this=this;          
                    _this.detailParentName=data.areaName;
                    _this.detailParentId=data.id;
                    _this.queryParams.NodeId=_this.detailParentId;
                    _this.loadTable();
                    // _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByCondition',_this.queryParams).then(function(res){
                    // _this.$store.commit('setQueryParams',_this.queryParams)
                    // _this.$store.commit('Init_Table',res.result.items); 
                    // let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.adminstrAreaListEachPage);
                    // _this.$store.commit('Init_pagination',totalPage) 
                    // _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    // _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                // })
            },
                // 在搜索框输入关键字过滤节点
                filterNode(value, data) {// 在搜索框输入关键字过滤节点
                    if (!value) return true;
                    return data.areaName.indexOf(value) !== -1;
                },
                loadIcon(){// 文件夹图标加载
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
            // createStateFilter(queryString) {
            //     return (state) => {
            //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            leftSearch(){// 左边搜索框
            },
            // ----------分页器的处理函数结束----------
           
            // 按钮增加----去新增详情页(detail)
            goAdd(){ //点击切换路由去添加
                // this.$store.state.url = `/adminstrArea/adminstrAreaDetail/default`;
                // this.$router.push({ path: this.$store.state.url});
                // this.$router.push({  name:'adminstrAreaDetail',params: {upParentId:this.upParentId,upAreaName:this.upAreaName}});
                let _this=this;
                if(typeof(_this.detailParentId)=='number'){
                    _this.$store.state.url='/adminstrArea/adminstrAreaDetail/'+_this.detailParentId
                    _this.$router.push({path:this.$store.state.url})//点击切换路由
                    
                }else{
                    _this.$store.state.url='/adminstrArea/adminstrAreaDetail/default'
                    _this.$router.push({path:this.$store.state.url})//点击切换路由
                }
            },
            
            // （行内按钮查看）查看详情
            modify: function(row) {
                // console.log(row.id)
                this.$store.state.url = "/adminstrArea/adminstrAreaModify/" + row.id
                this.$router.push({ path: this.$store.state.url })
            },
            
            //右边搜索框
            searchRight(){
                // this.getDataList();
            },
            // -----------------------删除功能
            delRow() {// 按钮删除---删除选择项(批量删除)
                    let _this = this;
                    // console.log(_this.multipleSelection);
                    this.$axios
                        .posts(
                        "/api/services/app/AdAreaManagement/BatchDelete",
                        _this.multipleSelection
                        )
                        .then(rsp => {
                            // if (!res.success) {
                            //     _this.open("删除失败", "el-icon-error", "faildERP");
                            // }
                            _this.dialogUserConfirm=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');
                            // _this.getDataList();
                            _this.loadTree();
                        },rsp=>{
                            _this.dialogUserConfirm=false;
                            // console.log(rsp);
                            if(rsp && rsp!=''){ 
                                _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                            }
                            _this.submitData.submitErrorMessage=true;
                        }
                        );
            },
            confirm(){//确认是否多项删除
                let _this=this;
                _this.choseAjax='rows'
                if(_this.multipleSelection.ids.length>0){
                _this.dialogUserConfirm=true;
                }
            },
            confirmDelThis(row){//确认是否单项删除
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
            //------------------加载表格-----------------------
            loadTable(){
                 let _this=this;
                _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByCondition',_this.queryParams).then(function(res){
                    _this.$store.commit('setQueryParams',_this.queryParams)
                    _this.$store.commit('Init_Table',res.result.items); 
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.adminstrAreaListEachPage);
                    _this.$store.commit('Init_pagination',totalPage) 
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1                 
                    });
            },
            // ------------------------右上角搜索-----------------
            submitSearch(){
                let _this=this;
                    _this.queryParams.SearckKey=_this.SearckKey;
                    _this.loadTable();
            
            },
            delThis(){//单项删除
                let _this=this;
                _this.$axios.deletes('/api/services/app/AdAreaManagement/Delete',{id:_this.row.id})
                .then(rsp=>{
                    _this.dialogUserConfirm=false;
                    _this.open('删除成功','el-icon-circle-check','successERP');
                    // _this.getDataList();
                    _this.loadTree();
                },rsp=>{
                    _this.dialogUserConfirm=false;
                    // console.log(rsp);
                    if(rsp && rsp!=''){ 
                        _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                    }
                    _this.submitData.submitErrorMessage=true;
                })
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
                        _this.$axios.posts('/api/services/app/AdAreaManagement/BatchDelete',_this.delAarry).then(function(res){
                                // _this.queryParams.CategoryId="";
                                _this.$store.commit('setQueryParams',_this.queryParams)
                                _this.$store.dispatch('InitTable');
                                _this.$store.commit('setTableSelection',[])
                                _this.dialogVisible=false;
                                _this.$store.dispatch('InitTree');
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
            Tree
        },

    }
</script>

 <style scoped>
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

</style>
<style>
.adstrArea-wrapper .border-left{
   width: calc(100% - 290px);
   border-left:1px solid #E4E4E4;
}
.max-height{
    max-height:450px;
}
.tree-container{
    height: 440px;
}
.tree-container>div{
    height: 90%;
}
.adlist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.adlist-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 4px 15px 8px;
}
.adlist-tree .el-input__prefix{
    left: 20px;
}
</style>



