<template>
    <div class="specifcationOfGoods commodity" >
        <div id="bgl">
            <el-row class="bg-white">
                <el-col :span="24" class="border-left" id="bg-white">
                    <el-col :span="5" >
                        <!-- <el-col :span="24">
                            <el-button @click="rapidAdd()" type="primary" class="specificationcode rapidAdd">添加商品属性</el-button>
                            <el-button @click="rapidCheck()" type="primary" class="specificationcode">查看</el-button>
                            <el-button @click="rapidDel()" type="primary" class="specificationcode">删除</el-button>
                        </el-col> -->
                        <el-col :span="24">
                            
                        </el-col>
                        <el-col :span='24' class="tree-container specification mt5">
                            <myTree :defaultProps='defaultProps' :treeEntrySearch="treeEntrySearch" :treeSearch='treeSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick" :treeFunction="treeFunction" @operatingTree="operatingTree"></myTree>
                        </el-col>
                    </el-col>
                    <el-col :span="19" >
                        <el-col :span="24" class="bg-white h48">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                        </el-col>
                        <el-col :span="24">
                            <myTable  :methodsUrl="httpUrl" :pluginSetting="pluginSetting"  :cols="column" :queryParams="queryParams"  :tableName="tableModel" :command="command" :ifSave="isSave"></myTable>
                        </el-col>
                    </el-col>
                </el-col>
            </el-row> 
        </div>
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" ></dialogBox>

        <el-dialog :visible="dialogAddCheck" class="dialog_confirm_message delspecifcation" width="25%" title="添加商品规格" >
            <el-col :span="24" style="position: relative;">
                <el-col :span="24" v-for="(item,index) in demand" >
                    <el-row class="mt10" >
                        <el-col :span="6">
                            <label class="input-label"><em>{{item.must}}</em>{{item.title}}</label>
                        </el-col>
                        <el-col :span="15" v-if="!item.options && !item.selectData" >
                            <el-input class="input-entry" :class="item.isSave && isterrace ? 'redBorder' : 'aaa'" v-model="item.value" :disabled="item.disabled"></el-input>
                        </el-col>
                        <el-col :span="15" v-else-if="!item.selectData">
                            <el-select class="input-entry" @change="selectChange(index,item.value)" :class="item.isSave && isterrace ? 'redBorder' : 'aaa'"  clearable v-model="item.value" :disabled="item.disabled">
                                <el-option  v-for="items in item.options" :key="items.value" :label="items.label" :value="items.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="15" v-else :class="item.class" >
                            <el-select  class="input-entry" :class="item.isSave && isterrace ? 'redBorder' : 'aaa'"  clearable v-model="item.value" :disabled="item.disabled">
                                <myTree :defaultProps='defaultProps' :treeSearch='treeSearch' :treeParams='SelectTreeParams' @nodeClick="SelectTreeNodeClick"></myTree>
                                <el-option v-show="false" v-for="item in item.selectData" :key="item.id" :label="item.propertyName" :value="item.id" :date="item.id"  id="businessDetail_confirmSelect"></el-option>
                            </el-select>
                        </el-col>
                        <div class="error_tips_info" v-if="item.must != '' && item.isSave && isterrace">必填</div>
                    </el-row>
                </el-col>
                <el-col :span="15" :offset="6" class="mt10">
                    <el-checkbox v-model="isSystem">系统属性</el-checkbox>
                    <el-checkbox v-model="required">必填</el-checkbox>
                </el-col>
            </el-col>
            <span slot="footer">
                <button  class="dialog_footer_bt dialog_font" @click="terraceSave()" >保存</button>
                <button  class="dialog_footer_bt dialog_font" @click="terraceOff()" >取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import myTable from '../../base/Table/Table'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import myTree from '../../base/tree/tree'
import dialogBox from '../../base/dialog/dialog'
import {addCol,treeclick,GetDateTime,loadSelect,loadData,cancel,dialogOnClick,delBatch,save,handleStatus,treecancel,loadOfSelect} from '../../common/dom.js'//单页面增删改
import {terraceAdd} from '../../common/terrace.js'//平台页面新增
    export default{
        name:'customerInfor',
        data(){
            return {
                treeEntrySearch:true,
                treeFunction:[{text:'添加商品属性'},{text:'查看'},{text:'删除'}],
                demand:[{
                    must:'*',
                    title:'上级属性',
                    disabled:false,
                    value:'',
                    class:'input-entry-option1',
                    selectData:[],
                    isSave:false
                },{
                    must:'*',
                    title:'属性编码',
                    disabled:false,
                    value:'',
                    isSave:false
                },{
                    must:'*',
                    title:'属性名称',
                    disabled:false,
                    value:'',
                    isSave:false
                },{
                    must:'*',
                    title:'控件类型',
                    disabled:false,
                    value:'',
                    options:[{
                        value: 0,
                        label: '下拉'},
                        {value: 1,
                        label: '日期'
                    },{value: 2,
                        label: '手工输入'
                    },{value: 3,
                        label: '关联档案'
                    }],
                    isSave:false
                },{
                    must:'*',
                    title:'数据源',
                    disabled:true,
                    value:0,
                    options:[{
                        value: 0,
                        label: '小明'},
                        {value: 1,
                        label: '小张'
                    }],
                    isSave:false
                },{
                    must:'',
                    title:'显示顺序',
                    disabled:false,
                    value:'',
                    isSave:false
                },{
                    must:'',
                    title:'级联属性',
                    disabled:false,
                    value:'',
                    class:'input-entry-option2',
                    selectData:[],
                    isSave:false
                },{
                    must:'',
                    title:'状态',
                    disabled:true,
                    value:0,
                    options:[{
                        value: 0,
                        label: '停用'},
                        {value: 1,
                        label: '启用'
                    }],
                    isSave:false
                }],
                treeSearch:true,
                dialogAddCheck:false,
                treeParams:{
                    treeName:'commodityPropertyofGoods',//树节点名称
                    treeApi:'/api/services/app/PropertyManagement/GetPropertyTree',//接口地址
                },
                SelectTreeParams:{
                    treeName:'commodityPropertyofGoods',//树节点名称
                    treeApi:'/api/services/app/PropertyManagement/GetPropertyTree',//接口地址
                },
                value:'',
                value1:'',
                searchLeft:'',
                oneItem: 10,
                totalItem: 0,
                httpUrl:{
                    delete:'/api/services/app/PropertyValueManagement/Delete',//行内删除
                    query:'/api/services/app/PropertyValueManagement/GetPropertyId',//条件查询
                }, 
                pluginSetting:{
                    hasPagination:true,
                    mutiSelect:true,//多选栏
                    isDisable:false,
                },
                column: [
                    { prop: 'propertyId', label: '商品属性', controls:'select', width:"auto",isDisable:true,flag:true, sortable:true,dataSource:[],optionsKey:{label:'propertyName',value:'id'}},
                    { prop: 'propertyValueCode',label: '属性值编码', controls:'text', required:true, width:"auto", isDisable:false,sortable:false},
                    { prop: 'propertyValueName', label: '属性值名称',controls:'text', required:true,width:"auto", isDisable:false,sortable:false},
                    { prop: 'remark', label: '备注', controls:'text',width:"auto",isDisable:false, sortable:false},
                    { prop: 'relPropertyValueId', label: '级联属性值',controls:'classMapSelect', required:true,width:"auto", isDisable:false,sortable:false,dataSource:[]},
                    {prop: 'status',label: '状态', controls:'select', width:"auto",isDisable:false, sortable:false, dataSource:[],optionsKey:{label:'itemName',value:'itemValue'} }],
                tableModel:'commodityPropertyofGoods',
                queryParams:{
                    PropertyId:1,
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
                buttonGroup:[{class: 'bt_add',icon: 'icon-xinzeng', disabled:false, text: '新增'},{class: 'bt_del', icon: 'icon-shanchu', disabled:false, text: '删除'},{ class: 'bt_save', icon: 'icon-baocun', disabled:true, text: '保存'},{ class: 'bt_cancel ', icon: 'icon-quxiao', disabled:true, text: '取消', },{ class: 'bt_version', icon: 'icon-qiyong', disabled:false,  text: '启用',},{ class: 'bt_auxiliary', icon: 'icon-tingyong',disabled:false, text: '停用',},{ class: 'bt_out',icon: 'icon-daochu', disabled:false, text: '导出',  }],
                defaultProps: {
                    children:'childNodes',
                    label:'propertyName',
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
                isterrace:false,
                isSystem:false,
                required:false,
                isterraceadd:true,
                isTerraceOff:false,
                isRapidCheck:false,
                isAddamend:false,
                isterraceRemove:false,
                SelectClass:''
            }
        },
        created:function(){
            let _this = this;
            setTimeout(function(){
                _this.loadTableData();
                _this.InitModify();
                _this.loadAndSelect();
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
            demand:{
                handler(newValue, oldValue) {

                    this.isterraceadd = true;
                    if(!this.isRapidCheck){
                        this.isTerraceOff = false;
                        this.isRapidCheck = !this.isRapidCheck;
                    }else{
                        this.isTerraceOff = true;
                    }
                    for(let i=0;i<newValue.length;i++){
                        if(newValue[i].must != ''){
                            if(newValue[i].value.toString().replace(/(^s*)|(s*$)/g, "").length == ''){
                                newValue[i].isSave = true;
                            }else{
                                newValue[i].isSave = false;
                            } 
                        }
                    }
                },
                deep: true
        　　}
        },
        methods:{
            InitModify(){
                let _this = this;
                _this.$axios.gets('/api/services/app/PropertyManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){ 
                    _this.$axios.gets('/api/services/app/PropertyManagement/GetAll',{SkipCount:0,MaxResultCount:res.totalCount}).then(function(res){
                        let arr = [];
                        for(let i=0;i<res.result.items.length;i++){
                            if(res.result.items[i].levelNo !== 3){
                                arr.push(res.result.items[i])
                            }
                        }
                        _this.demand[0].selectData = arr;
                        _this.demand[6].selectData = res.result.items;
                    })
                })
            },
            selectChange(index,value){
                let _this = this;
                if(value == 3){
                    _this.demand[index + 1].disabled = false;
                }   
            },
            operatingTree(text){
                if(text == '添加商品属性'){
                    this.rapidAdd();
                }else if(text == '查看'){
                    this.rapidCheck();
                }else if(text == '删除'){
                    this.rapidDel();
                }
            },
            rapidAdd(){
                let _this = this;
                _this.isRapidCheck = false;
                _this.dialogAddCheck = true;
                _this.isAddamend = false;
                _this.Init('','','','','abc','','',0,false,false);
            },
            rapidCheck(){
                let _this = this;
                if(_this.value1 == ''){
                    delBatch(_this,[],'请点击要查看的节点！','confirm');
                }else{
                    _this.isRapidCheck = false;
                    _this.dialogAddCheck = true;
                    _this.isAddamend = true;
                    _this.Init(_this.value1.propertyParentid,_this.value1.propertyCode,_this.value1.propertyName,_this.value1.controlType,'abc',_this.value1.seq,_this.value1.relPropertyId,_this.value1.status,_this.value1.isSystem,_this.value1.required); 
                }
                
            },
            rapidDel(){
                let _this = this;
                let arr = [];
                if(_this.value1 != ''){
                    arr = [_this.value1]
                }
                _this.isterraceRemove = true;
                delBatch(_this,arr,'请点击需要删除的节点！','confirm');
            },
            Init(a,b,c,d,e,f,g,h,i,j){
                this.demand[0].value = a;
                this.demand[1].value = b;
                this.demand[2].value = c;
                this.demand[3].value = d;
                this.demand[4].value = e;
                this.demand[5].value = f;
                this.demand[6].value = g;
                this.demand[7].value = h;
                this.isSystem = i;
                this.required = j;
            },
            terraceSave(){
                let _this = this;
                _this.isterrace = true;
                let arr = _this.demand;
                for(let i=0;i<arr.length;i++){
                    if(arr[i].must != ''){
                        if(arr[i].value.toString().replace(/(^s*)|(s*$)/g, "").length == ''){
                            arr[i].isSave = true;
                            _this.isterraceadd = false;
                        }else{
                            arr[i].isSave = false;
                        } 
                    }
                }
                if(_this.isterraceadd){

                    let newData = [{groupId:1,propertyParentid: arr[0].value, propertyCode: arr[1].value,propertyName: arr[2].value, controlType: arr[3].value,dataSource: 'abc',seq:parseInt(arr[5].value),relPropertyId:arr[6].value,status:arr[7].value,isSystem:_this.isSystem,required:_this.required,isBottom:false,propertyFullpathId:'string',propertyFullpathId:'1',propertyFullpathName:'1'}];
                    let amendAdd = {createList:[],updateList:[]};
                    if(_this.isAddamend){
                        newData[0].id = _this.value1.id;
                        _this.value1.id = 0;
                        amendAdd.updateList = newData;
                    }else{
                       amendAdd.createList = newData; 
                    }
                    console.log(amendAdd,_this.isSystem,_this.isSystem)
                    setTimeout(function(){
                        terraceAdd(_this,amendAdd,'/api/services/app/PropertyManagement/CUDAggregate').then((res)=>{
                            if(res.success){
                                _this.Init('','','','','abc','','',0,false,false);
                                amendAdd.updateList = [];
                                amendAdd.createList = []; 
                            }
                        })
                    },20) 
                }
            },
            SelectTreeNodeClick(data,node,self){
                let _this = this;
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).click()
                    }
                })
            },
            terraceOff(){
                let _this = this;
                if(_this.isTerraceOff){
                    _this.dialogAddCheck = false;
                }else{
                    _this.dialogAddCheck = false;
                }
            },
            dialogClick(parmas,value){
                let _this = this;
                if(_this.isterraceRemove){
                    dialogOnClick(this,parmas,'/api/services/app/PropertyManagement/Delete',_this.isterraceRemove,_this.value1.id);
                }else{
                    dialogOnClick(this,parmas,'/api/services/app/PropertyValueManagement/BatchDelete');
                }
            },
            btnClick(item){
                let _this = this;
                if(item=="新增"){//新增事件
                    if(_this.queryParams.PropertyId == 0 || _this.value1.levelNo == 2){
                        this.dialogSetting.dialogName='userPrompts'
                        this.dialogSetting.message="最大树形节点和2级节点不允许新增商品规则值，请点击3级树形节点？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }else{
                       _this.thisAddCol(_this); 
                    }
                }else if(item=="删除"){//删除事件
                    _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                    delBatch(_this,_this.SelectionChange,'请勾选需要更改删除的记录！','confirm');
                }else if(item=="保存"){//保存事件
                    save(_this,'/api/services/app/PropertyValueManagement/CUDAggregate');
                }else if(item=="取消"){//取消事件
                    cancel(_this);
                }else if(item=="启用"){
                    handleStatus(_this,1);
                }else if(item=="停用"){
                    handleStatus(_this,0);
                }
            },
            thisAddCol(_this){
                _this.$axios.gets('/api/services/app/PropertyValueManagement/GetPropertyId',{PropertyId:_this.value1.relPropertyId}).then(function(res){
                    console.log()
                    let newcol={ "groupId": 1,propertyId: _this.value1.id, propertyValueCode: "",propertyValueName: "",remark: "",relPropertyValueId:'',"status": 1, "seq": 0,relPropertyValueList:res.result.items};
                    addCol(_this,newcol);
                })
                
                // return
                // addCol(_this,newcol);
            },
            loadTableData(){
                let _this=this;
                loadData(_this,'/api/services/app/PropertyManagement/GetAll').then(function(res){
                    res.forEach(function(item,index){
                        let obj = {};
                        obj.itemName = item.propertyName;
                        obj.itemValue = item.id;
                        _this.column[0].dataSource.push(obj)
                    })
                })
                loadSelect(_this,'/api/services/app/DataDictionary/GetDictItem').then((res)=>{
                    _this.column[5].dataSource = res;
                })
            },
            loadAndSelect(){
                let _this=this;
                _this.$axios.gets('/api/services/app/PropertyValueManagement/GetPropertyId',{PropertyId:1}).then(function(res){
                    console.log(res);
                })
                // loadOfSelect(_this,'/api/services/app/PropertyValueManagement/GetPropertyId',0,'PropertyId').then((res)=>{
                //     res.items.forEach(function(item,index){
                //         let obj = {};
                //         obj.itemName = item.propertyValueName;
                //         obj.itemValue = item.id;
                //         _this.column[4].dataSource.push(obj);
                //     })
                //     console.log(res)
                // })
            },
            TreeNodeClick(data,val){//树节点点击回调
                let _this=this;
                if(data.id == _this.value1.id){
                    return ;
                }else if(!_this.isCancel && _this.isClickTree){
                    _this.value = data;
                    treecancel(_this);
                }else{
                    _this.queryParams.PropertyId = data.id;
                    _this.value1 = data;
                    setTimeout(function(){
                        treeclick(_this,'/api/services/app/PropertyValueManagement/GetPropertyId',data,_this.$store.state.specificationOfGoodsEachPage)
                    },20)     
                }   
            },
        },
        components:{
            buttonGroup,
            myTree,
            myTable,
            dialogBox
        }
    }
</script>

<style scoped>
.h48{height: 48px; line-height: 48px; border-bottom: 1px solid #E4E4E4;}
</style>
<style >
.specifcationOfGoods .rapidAdd{width: 31%;}
.specificationcode{ width: 15%; padding: 10px 0px 10px 12px;text-align: left; border: none; color: #fff; margin-top: 5px; margin-left: 6%;}
.specificationcode{background-color: #3cc;}
.specifcationOfGoods .dialog_confirm_message .el-dialog__footer .dialog_footer_bt:nth-child(2){color:  #c0c4cc;}
.specifcationOfGoods .dialog_confirm_message .el-dialog__footer .dialog_footer_bt:nth-child(1){color:#32D3E3;}
.delspecifcation .input-label{text-indent: 50px;}
.delspecifcation .input-label em{color: red;width: 6px;display: inline-block;text-indent: 0px;}
.redBorder .el-input__inner{    border: 1px solid red;}
</style>