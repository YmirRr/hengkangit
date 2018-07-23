<template>
    <div class="specifcationOfGoods commodity" >
        <div id="bgl">
            <el-row class="bg-white">
                <el-col :span="24" class="border-left" id="bg-white">
                    <el-col :span="5" >
                        <el-col :span='24' class="tree-container specification mt5">
                            <Tree :defaultProps='defaultProps' :treeSearch='treeSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                        </el-col>
                    </el-col>
                    <el-col :span="19" >
                        <el-col :span="24" class="bg-white h48">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                        </el-col>
                        <el-col :span="24">
                            <myTable  :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams"  :tableName="tableModel" :command="command" :ifSave="isSave"></myTable>
                            <!-- <button @click="abbcc()">调用组件</button> -->
                        </el-col>
                    </el-col>
                </el-col>
            </el-row> 
        </div>
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand' @dialogColse='dialogColse'  @dialogClick="dialogClick" ></dialogBox>

        <SearchGoods v-on:childByValue="childByValue" v-bind:SearchGoods1="SearchGoods1"></SearchGoods>
    </div>
</template>

<script>
import myTable from '../../base/myTable/myTable'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Tree from '../../base/tree/tree'
import dialogBox from '../../base/dialog/dialog'
import SearchGoods from '../../base/SearchGoods/SearchGoods'
import {addCol,treeclick,GetDateTime,loadSelect,loadData,cancel,dialogOnClick,delBatch,save,handleStatus,treecancel} from '../../common/dom.js'
import {ADD_BOOKMARK} from '../../common/common.js'
    export default{
        name:'customerInfor',
        data(){
            return {
                treeSearch:true,
                treeParams:{
                    treeName:'specificationOfGoods',//树节点名称
                    treeApi:'/api/services/app/SpecManagement/GetSpecTree',//接口地址
                },
                value:'',
                value1:'',
                searchLeft:'',
                oneItem: 10,
                totalItem: 0,
                httpUrl:{
                    delete:'/api/services/app/SpecgroupManagement/Delet',//行内删除
                    query:'/api/services/app/SpecValueManagement/GetSpecId',//条件查询
                }, 
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                column: [{ prop: 'specId', label: '商品规格',flag:true,controls:'select', width:"auto",isDisable:true, sortable:true,dataSource:[],optionsKey:{label:'specName',value:'id'}},{ prop: 'specValueCode',label: '规格值编码', controls:'text', required:true, width:"auto", isDisable:false,sortable:false, },{ prop: 'specValueName', label: '规格值名称',controls:'text', required:true,width:"auto", isDisable:false,sortable:false,},{ prop: 'remark', label: '备注', controls:'text',width:"auto",isDisable:false, sortable:false,},{prop: 'status',label: '状态', controls:'select', width:"auto",isDisable:false, sortable:false, dataSource:[],optionsKey:{label:'itemName',value:'itemValue'} },{prop: 'createdBy', label: '创建人', controls:'text', width:"auto", isDisable:true, sortable:false, },{ prop: 'createdTime', label: '创建时间', controls:'datetime',width:"auto", isDisable:true, sortable:true, },{prop: 'modifiedBy',label: '修改人',controls:'text', width:"auto",isDisable:true,sortable:false, },{ prop: 'modifiedTime',label: '修改时间',controls:'datetime',width:"auto",isDisable:true, sortable:true,}],
                tableModel:'specificationOfGoods',
                queryParams:{
                    SpecId:0,
                    SkipCount:(this.$store.state.commodityBrandCurrentPage-1)*this.$store.state.commodityBrandEachPage,
                    MaxResultCount:this.$store.state.commodityBrandEachPage
                },
                command:[{
                    text:'删除',
                    class:'blue'
                }], 
                isSave:false,
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogVisible:false,
                dialogCommand:[],//底部按钮组控制组
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                searchItem:{
                    specCode:'',//规格编码
                    specName:'',//规格名称
                    controlType: '',//控制类型
                    status:'',//状态
                },
                selectData:{
                    userGroupId:[]
                }, 
                buttonGroup:[{class: 'bt_add',icon: 'icon-xinzeng', disabled:false, text: '新增'},{class: 'bt_del', icon: 'icon-shanchu', disabled:false, text: '删除'},{ class: 'bt_save', icon: 'icon-baocun', disabled:true, text: '保存'},{ class: 'bt_cancel ', icon: 'icon-quxiao', disabled:true, text: '取消', },{ class: 'bt_version', icon: 'icon-qiyong', disabled:false,  text: '启用',},{ class: 'bt_auxiliary', icon: 'icon-tingyong',disabled:false, text: '停用',},{ class: 'bt_out',icon: 'icon-daochu', disabled:false, text: '导出',  }],
                defaultProps: {
                    children:'children',
                    label:'specName',
                    id:'id'
                },

                idArray:{
                    ids:[]
                },
                addData1:{//修改保存接口
                    createList:[],
                    updateList:[]
                },
                SelectionChange:[],
                isClickTree:true,
                SearchGoods1:false
            }
        },
        created:function(){
            let _this = this;
            setTimeout(function(){
                _this.loadTableData();
            },20);    
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        computed:{
            isCancel(){
                if(this.$store.state[this.tableModel+'NewColArray'].length>0||this.$store.state[this.tableModel+'UpdateColArray'].length>0 ){
                    return false
                }else{
                    return true
                }
            },
            transferSelected(){
                return this.$store.state[this.transferName+'SelectedTable']
            },
        },
        watch:{
            isCancel:function(val,oldVal){//监听是否修改或新增数据
                
                console.log(this.$store.state[this.tableModel+'Selection'].length)
                if(!val){
                    this.buttonGroup[0].disabled=false;
                    this.buttonGroup[1].disabled=true;
                    this.buttonGroup[2].disabled=false;
                    this.buttonGroup[3].disabled=false;
                }else{
                    this.buttonGroup[0].disabled=false;
                    this.buttonGroup[1].disabled=false;
                    this.buttonGroup[2].disabled=true;
                    this.buttonGroup[3].disabled=true;
                }
            },
            transferSelected:{
                handler:function(val,oldVal){
                    console.log(val);
                },
                deep:true
            } 
        },
        methods:{
            abbcc(){
                this.SearchGoods1 = true;
            },
            dialogClick(parmas){
                dialogOnClick(this,parmas,'/api/services/app/SpecValueManagement/BatchDelete');
            },
            childByValue(childValue){
                this.SearchGoods1 = false;
                if(childValue === '跳转'){
                    ADD_BOOKMARK('商品档案','goodsFilesDetail',true,'default',this)
                }
                console.log(childValue)
            },
            btnClick(item){
                let _this = this;
                if(item=="新增"){//新增事件
                    if(_this.queryParams.SpecId == 0){
                        this.dialogSetting.dialogName='userPrompts'
                        // this.dialogSetting.message="最大树形节点不允许新增商品规则值，请点击其他树形节点？";
                        this.dialogSetting.message="请选中相应的商品规格，才能进行商品规则值的新增！";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }else{
                       _this.thisAddCol(_this); 
                    }
                }else if(item=="删除"){//删除事件
                    delBatch(_this);
                }else if(item=="保存"){//保存事件
                    save(_this,'/api/services/app/SpecValueManagement/CUDAggregate');
                }else if(item=="取消"){//取消事件
                    cancel(_this);
                }else if(item=="启用"){
                    handleStatus(_this,1);
                }else if(item=="停用"){
                    handleStatus(_this,0);
                }
            },
            thisAddCol(_this){
                let newcol={ "groupId": 1,"specId": _this.value1.id, "specValueCode": "","specValueName": "", "seq": 0,"status": 1,"remark": "","createdBy":_this.$store.state.name,"createdTime":GetDateTime(), modifiedBy:_this.$store.state.name,modifiedTime:GetDateTime()};
                addCol(_this,newcol);
            },
            loadTableData(){
                let _this=this;
                loadData(_this,'/api/services/app/SpecManagement/GetAll').then(function(res){
                    res.forEach(function(item,index){
                        let obj = {};
                        obj.itemName = item.specName;
                        obj.itemValue = item.id;
                        _this.column[0].dataSource.push(obj)
                    })
                })
                loadSelect(_this,'/api/services/app/DataDictionary/GetDictItem').then((res)=>{
                    _this.column[4].dataSource = res;
                })
            },
            TreeNodeClick(data,val){//树节点点击回调
                let _this=this;
                if(data.id == _this.value1.id){
                    return ;
                }else if(!_this.isCancel && _this.isClickTree){
                    _this.value = data;
                    treecancel(_this);
                }else{
                    _this.queryParams.SpecId = data.id;
                    _this.value1 = data;
                    setTimeout(function(){
                        treeclick(_this,'/api/services/app/SpecValueManagement/GetSpecId',data,_this.$store.state.specificationOfGoodsEachPage)
                    },20)     
                }   
            },
            dialogColse(){//对话框关闭回调事件
                this.dialogVisible=false;
            },
        },
        components:{
            buttonGroup,
            Tree,
            myTable,
            dialogBox,
            SearchGoods
        }
    }
</script>

<style scoped>
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
</style>

<style>
#bg-white .el-input.is-disabled .el-input__inner{
    background-color: transparent;
    color: rgb(57, 202, 119);
}
</style>