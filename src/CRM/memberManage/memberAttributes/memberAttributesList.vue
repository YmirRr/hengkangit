<template>
    <div class="member-attr-list commodity">
        <el-row class="bg-white h48 fixed">
            <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
            </div>
        </el-row>   
        <el-row class="bg-white">
            <el-col :span="5" class="max-height left-box">
                <el-col :span='24' class="tree-container member-attr-tree">
                     <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                </el-col>   
            </el-col>
            <el-col :span="19" class="border-left">
                <el-row class="mt20">
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label><small>*</small>属性编码</label>
                            <el-input v-model="addData.def_MainTable.defCode" :class="{redBorder : validation.hasError('addData.def_MainTable.defCode')}" ></el-input>                 
                        </div>
                       <div class="error_tips">{{ validation.firstError('addData.def_MainTable.defCode') }}</div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label><small>*</small>属性名称</label>
                            <el-input v-model="addData.def_MainTable.defName" :class="{redBorder : validation.hasError('addData.def_MainTable.defName')}"></el-input>                 
                        </div>
                        <div class="error_tips">{{ validation.firstError('addData.def_MainTable.defName') }}</div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth controlTypes">
                            <label><small>*</small>控件类型</label>
                                <div class="def_MainTable-controlType">
                                    <el-radio v-model="addData.def_MainTable.controlType" v-for="(item,index) in controlType" :label="item.itemValue" border :key="item.itemValue" :value="item.itemValue" @change="controlTypes" >{{item.itemName}}</el-radio>
                                </div>
                                         
                        </div>
                   </div>
                    <div class="marginAuto "v-if="showPullDown">
                        <div class="bgcolor longWidth">
                            <label>&nbsp;</label>
                            <div class="attribute">
                                <el-tag
                                :key="tag.defValueName"
                                v-for="tag in defValueList"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                class="mt10">
                                {{tag.defValueName}}
                                </el-tag>
                                <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="defValueCode"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag mt10" size="small" @click="showInput">+</el-button>      
                            </div>
                               
                        </div>
                   </div>

                    <div class="marginAuto" v-if="showDataSource">
                        <div class="bgcolor longWidth">
                            <label><small>*</small>数据源</label>
                             <el-select  class="dataSource" 
                                    clearable filterable
                                    placeholder=""
                                    v-model="addData.def_MainTable.dataSource"
                                   >
                            <el-option v-for="item in dataSource" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue">
                            </el-option>
                            
                        </el-select>
                        </div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label>显示顺序</label>
                            <el-input v-model="addData.def_MainTable.seq"></el-input>                 
                        </div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label>状态</label>
                            <el-select  class="status" 
                                    clearable filterable
                                    placeholder=""
                                     v-model="addData.def_MainTable.status"
                                   >
                            <el-option v-for="item in status" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue">
                            </el-option>
                            
                        </el-select>
                        </div>
                    </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label>备注</label>
                            <el-input  v-model="addData.def_MainTable.remark"></el-input>                 
                        </div>
                   </div> 
                    <div class="marginAuto require">
                        <div class="bgcolor">
                            <el-checkbox v-model="addData.def_MainTable.required"></el-checkbox>
                            <span class="isGive">必填</span>               
                        </div>
                   </div>
                </el-row> 
               <el-row>
                    <el-col :span="24" class="getPadding">
                        <h4 class="h4 pt5">审计信息</h4>
                        <div>
                            <div class="bgcolor"><label>创建人</label><el-input v-model="auditInfo.createdBy" disabled></el-input></div>
                            <div class="bgcolor">
                                <label>创建时间</label>
                            <el-date-picker
                                        v-model="auditInfo.createdTime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        disabled
                                        placeholder="">
                                </el-date-picker>
                            </div>
                            <div class="bgcolor"><label>修改人</label><el-input  v-model="auditInfo.modifiedBy" disabled></el-input></div>
                            <div class="bgcolor">
                                <label>修改时间</label>
                                    <el-date-picker
                                        v-model="auditInfo.modifiedTime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        disabled
                                        placeholder="">
                                    </el-date-picker>
                            </div>
                        </div>                                  
                    </el-col>
            </el-row>
        </el-col>
    </el-row>
     <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing" @dialogColse="dialogUserConfirm = false"></dialogBox>                                   
  </div>
</template>

<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Tree from '../../../base/tree/tree'
import dialogBox from '../../../base/dialog/dialog'
import {GetDateTime,loadSelect} from '../../../common/dom.js'//单页面增删改
import {terraceAdd} from '../../../common/terrace.js'//单页面增删改
import config from '../../../../static/config';
export default({
    name:'memberAttributesList',
    components:{
        buttonGroup,
        Tree,
        dialogBox,
    },
    
    data() {
        return{
            errorTips:{message:'',detail:''},
            dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
            dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
            defValueList: [],
            inputVisible: false,
            defValueCode: '',
            defaultProps:{
                children:"children",
                label:"defName",
                id:"id"
            },
            ifModify:false,
            firstModify:false,
            treeEntrySearch:true,//是否包含树节点过滤功能
            treeSuggestSearch:false,//是否包含树节点建议过滤功能
            treeParams:{
                treeName:'memberAttributesList',//树节点名称
                treeApi:config.base.ip+':'+config.base.crmPort+'/api/services/app/DefManagement/GetDefTree'
            },
            dataChange:0,//数据修改次数
            buttonGroup:[  { text:'新增', class:'bt_add', icon:'icon-xinzeng',disabled:false, }, { text:'删除',class:'bt_del', icon:'icon-shanchu',disabled:false, },{text:'保存',class:'bt_save', icon:'icon-baocun',disabled:true,},{text:'保存并新增',class:'bt_saveAdd',icon:'icon-baocunxinzeng',disabled:true,},{ text:'取消', class:'bt_cancel', icon:'icon-quxiao', disabled:true, }],
                 //------------------ 新增客户-------------
                addData:{def_MainTable:{"groupId": 0,"defCode": "","defName": "","controlType":2,"required": false,"seq": 1, "remark": "","dataSource":0,"status": 1 ,}, defValue_ChildTable:[],},
                status: [],//状态
                controlType:[],
                dataSource:[{name:0}],
                controltype:"",
                value:'',
                auditInfo:{
                    createdTime:GetDateTime(),//创建时间
                    createdBy:this.$store.state.name,//创建人
                    modifiedTime:GetDateTime(),//修改人
                    modifiedBy:this.$store.state.name//修改时间
                    },
                dialogUserConfirm:false,//信息更改提示控制
                changeTimes:0,
                isterrace: true,
                nodeData:"",
                clearData:'',
                showDataSource:false,
                showPullDown:false,
               

        }
    },
     validators: {
      'addData.def_MainTable.defCode': function (value) {//属性编码
         return this.Validator.value(value).required();
      },
      'addData.def_MainTable.defName': function (value) {//属性名称
         return this.Validator.value(value).required();
      },
    },
    created () {
        let _this=this;
        _this.loadStatus();
        let obj = {id:0}
        setTimeout(function(){
            _this.loadCheckSelect(_this,'member-attr-tree',0);
        },1000)
        
    },
    watch: {
        addData:{
           handler: function (val, oldVal) {
            //    console.log(this.isterrace)
              if(!this.isterrace){     
                this.isterrace = !this.isterrace;
              }else{
                this.dataChange++;
                this.statusbutton(true,true,false,false,false)
              }
          },
          deep:true
        }
    },
    methods:{
            //   按钮组事件--------------------------------------------------
        btnClick:function(data){
           if(data=="删除"){
                 this.isDelPage()
            }else if(data=="保存"){
                 this.save();
            }else if(data=="取消"){
                 this.isCancel();
            }else if(data=="保存并新增"){
                this.saveAdd();
            }else if(data=="新增"){
                this.add();
            }    
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
        // $(".attribute").children("").css({"marginLeft":"10px"})
       },
        loadCheckSelect(_this,selectName,key){
            _this.$nextTick(function () { 
                $('.'+selectName+' .el-tree-node__label').each(function(){
                     if($(this).attr('data-id')==key){
                         console.log(key);
                        //  if()
                        $(this).click()
                        // alert(1);
                    }
                })
            })
        },
        sureDoing(data){
            let _this=this;
            if(data.dialogName=='isCancel'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                    _this.statusbutton(false,false,true,true,true);
                }else if(data.dialogButton=='确定'){
                    _this.dialogUserConfirm=false;
                    _this.statusbutton(false,false,true,true,true);
                    _this.TreeNodeClick(this.nodeData);
                
                }
            }else if(data.dialogName=='isDelPage'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.delPage()
                    _this.dialogUserConfirm=false;
                }
            }else if(data.dialogName=='showErMsgDialog'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.dialogUserConfirm=false;
                }
            }else if(data.dialogName=="clearDialog"){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                    _this.statusbutton(false,false,true,true,true);
                    _this.TreeNodeClick(this.nodeData);
                }else if(data.dialogButton=='确定'){
                    _this.dialogUserConfirm=false;
                    _this.defValueList=[];
                    _this.addData.def_MainTable.defValue_ChildTable=_this.defValueList;
                }
            }
        },
         //加载状态和控件类型下拉框
        loadStatus:function(){
            let _this = this;
             _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "Status001"}).then(function(res){
            _this.status = res.result;
            })
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "ControlType"}).then(function(res){
            _this.controlType = res.result;
            })
        },
        TreeNodeClick(data){//树节点点击回调  
            this.nodeData=data;           
            let _this=this;  
           _this.isterrace=false;
                if(data.id==0){
                    _this.validation.reset();
                    _this.isterrace = false; 
                    _this.clearAddData(); 
                }else{
                     if(_this.buttonGroup[2].disabled==false){
                         _this.isCancel();
                     }
                    // _this.value = data.id;
                    _this.isterrace = false;
                    _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/DefManagement/Get',{Id:data.id}).then(function(res){
                    _this.dataChange=0;
                    _this.defValueList=res.result.defValue_ChildTable
                    _this.addData.def_MainTable={
                            'id':res.result.id,
                            "groupId": res.result.groupId,
                            "defCode": res.result.defCode,//类目ID 
                            "defName":res.result.defName,
                            "controlType": res.result.controlType,
                            "required": res.result.required,
                            "seq": res.result.seq,
                            "remark":res.result.remark,
                            "dataSource": res.result.dataSource,
                            "status": res.result.status,
                            "defValue_ChildTable":_this.defValueList,
                        }
                         if(res.result.controlType==1){
                             _this.showPullDown=true
                         }else{
                            _this.showPullDown=false
                         }
                         console.log(res.result.controlType);
                    _this.auditInfo={//审计信息
                        createdTime:res.result.createdTime,//创建时间
                        createdBy:res.result.createdBy,//创建人
                        modifiedTime:res.result.modifiedTime,//修改人
                        modifiedBy:res.result.modifiedBy//修改时间
                    }
                    },function(res){
                    _this.showErrorMsgDialog(res.error.message,res.error.details);
                    
                    }) 
                }
               
        },
         handleClose(tag) {
                 this.defValueList.splice(this.defValueList.indexOf(tag), 1);
         },
         controlTypes(val){
           if(val==1){
                this.showDataSource=false;
                this.showPullDown=true
           }else if(val==4){
               this.showDataSource=true;
               this.showPullDown=false
           }else{
               this.showDataSource=false;
               this.showPullDown=false;
            if(this.defValueList.length>0){
                this.clearDialog();
            }
           }
         },
      handleInputConfirm() {
        let defValueCode = this.defValueCode;
        let inputNew={
            id: 0,
            groupId: 0,
            defId: 0,
            defValueCode:defValueCode,
            defValueName: defValueCode,
            seq: 0,
            remark: "",
            status: 0
        }
        let arr=[];
        if(this.defValueList.length==0){
            this.defValueList.push(inputNew);
        }else{
            for(let i in this.defValueList){ 
                arr.push(this.defValueList[i].defValueName);
           
        }
         if (arr.indexOf(defValueCode)!=-1){
             this.defValueCode = '';
            this.$message('改属性已经存在');
              return
            }else{
            this.defValueList.push(inputNew);
            }
        }
        this.inputVisible = false;
        this.defValueCode = '';
      },
      save(item){
        let _this=this;
        let modify=false;
        if(_this.addData.def_MainTable.id!=0){
           modify=true;
        }
         console.log(_this.addData.def_MainTable.id,_this.addData)   
            _this.$validate().then(function (success){
            if (success) {
                _this.addData.defValue_ChildTable=_this.defValueList;
                terraceAdd(_this,_this.addData,config.base.ip+':'+config.base.crmPort+'/api/services/app/DefManagement/AggregateCreateOrUpdate').then((res) =>{
                    if(res.success){
                        if(item){
                            _this.validation.reset();
                            _this.clearAddData();
                        }else{
                           _this.statusbutton(false,false,true,true,true)
                            setTimeout(function(){
                                _this.loadCheckSelect(_this,'member-attr-tree',res.result)
                            },500) 
                            if(modify){
                                _this.isterrace=true;
                            }
                       
                        }
                    } 
                })
            }
        });    
      },
      saveAdd(){
        this.save(true);
      },
      add(){
          let _this=this;
         _this.loadCheckSelect(_this,'member-attr-tree',0)
      },
      delPage(){
            let _this=this;
            // console.log(_this.addData.def_MainTable.id)
            if(_this.addData.def_MainTable.id!=undefined){
                _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/DefManagement/Delete',{Id:_this.addData.def_MainTable.id})
                .then(function(res){
                  _this.$store.dispatch('InitTree');
                  _this.clearAddData();
                  _this.validation.reset();
                  _this.isterrace=false;
                    // _this.open('删除成功','el-icon-circle-check','successERP');
                },function(res){
                    _this.showErMsgDialog(res.error.message,res.error.details)
                })
            }else{
                 _this.$message({
                    type: 'info',
                    message: '请勾选需要更改删除的记录！'
            })
           }
        },
        isDelPage(){
            let _this=this;
            _this.dialogSetting.dialogName='isDelPage'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogUserConfirm=true;
        },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message='错误提示'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogUserConfirm=true;
        },
        clearDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='clearDialog'
            _this.dialogSetting.message='此操作会清空数据，是否继续？'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogUserConfirm=true;
        },
         showErrorMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message='此节点是根节点'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogUserConfirm=true;
        },
       isCancel(){
             let _this=this;
            _this.dialogSetting.dialogName='isCancel'
            _this.dialogSetting.message='此操作会忽略你的更改？'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogUserConfirm=true;
        },
        statusbutton(a,b,c,d,e){
            this.buttonGroup[0].disabled = a;
            this.buttonGroup[1].disabled = b;
            this.buttonGroup[2].disabled = c;
            this.buttonGroup[3].disabled = d;
            this.buttonGroup[4].disabled = e;
        },
        clearAddData(){
         let _this=this;
         _this.defValueList=[];
        _this.addData={
            def_MainTable:{
            "groupId": 0,
            "defCode": "",
            "defName": "",
            "controlType":2,
            "required": false,
            "seq": 0,
            "remark": "",
            "dataSource":"",
            "status": 1 ,
            // "defValue_ChildTable":[]
            },
            defValue_ChildTable:_this.defValueList,
        }
        }
    }

})
</script>

<style>
.bg-white{
    background: white;
    border-radius: 3px;
}
.member-attr-list .border-left{
    width: calc(100% - 290px);
    border-left: 1px solid #E4E4E4;
}
.member-attr-list .bgcolor.longWidth{
    margin-right: 0;
    width: 421px;
    height:auto;
    float: left;
  }
  .member-attr-list .bgcolor.longWidth.controlTypes{
      width: 900px;
  }
.marginAuto{
      margin: auto;
      width: 550px;
  }
.member-attr-list .bgcolor.longWidth label{
    width:80px;
    height: 35px;
  }
.member-attr-list .bgcolor.longWidth .el-input{
    width: calc(100% - 90px);
}
.bgcolor.longWidth .el-select{
     width: calc(100% - 90px);
}
.member-attr-list .bgcolor .el-select .el-input {
    width: 100%;
}

.member-attr-list .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.member-attr-list .getPadding{
    padding: 0 10px;
    border-top:1px solid #e4e4e4;
}
.commodity .bgcolor{
    width:250px
}
.commodity .bgcolor>label{
    width:84px;
    /* height: 35px; */
}
.member-attr-list .require .bgcolor>label{
    width:105px
}
.member-attr-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.member-attr-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 4px 15px 8px;
}
.member-attr-tree .el-input__prefix{
    left: 20px;
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
.member-attr-list .controlType{
    width: 38px;
    height: 38px;
    border-radius: 3px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    display: block;
    float: left;
    border-width: 1px;
    border-style: solid;
    /* border: 1px solid #e4e4e4; */
    cursor: pointer;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
    
}
.member-attr-list .controlType:hover{
    border: 1px solid #33cc66;
}


.member-attr-list .controlType .el-checkbox__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.member-attr-list .controlType .el-radio__input {
    position: absolute;
    top: -1px;
    left: 0;
}

.member-attr-list .controlType .el-radio__inner {
    width: 10px;
    height: 10px;
    border-radius: 0;
    border: none;
}
.member-attr-list .controlType .el-radio__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.member-attr-list .controlType .el-radio__input.is-checked .el-radio__inner{
    background-color: #3cc;
}
.member-attr-list .controlType .el-radio__label {
    display: inline;
    padding: 0;
}
.member-attr-list .controlType .el-radio__input.is-checked+.el-radio__label{
    color: #3cc;
}

.el-tag + .el-tag {
    margin-right: 10px;
  }
.el-tag{
      margin-right: 10px;
      /* width: calc(100% - 100px); */
      /* overflow:hidden; */
      /* margin-right:10px */
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0px;
    margin-bottom: 10px;
    background-color: #3cc;
    width: 30px;
  }
  .button-new-tag span{
    margin-left: -6px
    }
  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
.attribute{
    width: calc(100% - 100px);
    display: inline-block;
    border:1px dashed #ccc;
 }
 .attribute input{
     width:calc(100% - 100px)
 }
.error_tips{
      color: red;
      font-size: 12px;
      float: left;
      height: 35px;
      line-height: 35px;
  }
.el-radio.is-bordered.is-checked{
border-color:#3cc;
}
.member-attr-list .el-button{
    background-color:#3cc;
    color:#fff;
    font-size:20px
}
/*.member-attr-list .bgcolor.longWidth .el-radio-group label{
    width: auto;
    height: auto;
}*/
.def_MainTable-controlType .el-radio__label{
    display: inline-block;
}
.member-attr-list .bgcolor.longWidth .def_MainTable-controlType label{
    width: auto;
    height: 40px;
}
.showPullDown{
    display: none;
}
.member-attr-list.input-new-tag.el-input.el-input--small{
  background-color:red;
}
.member-attr-list .input-new-tag.el-input.el-input--small{
  margin-left:15px;
}
</style>



  
