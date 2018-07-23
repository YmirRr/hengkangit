<template>
    <div class="recharget-deno-list commodity">
        <el-row class="bg-white h48 fixed">
            <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
            </div>
        </el-row>   
        <el-row class="bg-white">
            <el-col :span="5" class="max-height left-box">
                <el-col :span='24' class="tree-container recharge-tree">
                     <Tree :defaultProps='defaultProps' :treeEntrySearch='treeEntrySearch' :treeSuggestSearch='treeSuggestSearch' :treeParams='treeParams' @nodeClick="TreeNodeClick"></Tree>
                </el-col>   
            </el-col>
            <el-col :span="19" class="border-left">
                <el-row class="mt20">
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label><small>*</small>充值面额值</label>
                            <el-input v-model="addData.denomination" :class="{redBorder : validation.hasError('addData.denomination')}"></el-input>                 
                        </div>
                        <div class="error_tips">{{ validation.firstError('addData.denomination') }}</div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth controlTypes">
                            <label>线上平台</label>
                                <div class="def_MainTable-rechargetPlatform">
                                    <el-radio v-model="addData.rechargetPlatform" v-for="(item,index) in rechargetPlatform" :label="item.itemValue" border :value="item.itemValue" :key="item.itemValue">{{item.itemName}}</el-radio>
                                   
                                </div>              
                        </div>
                   </div>
                    <div class="marginAuto">
                        <div class="bgcolor longWidth">
                            <label>状态</label>
                            <el-select  class="status" 
                                    clearable filterable
                                    placeholder=""
                                     v-model="addData.status"
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
                            <el-input  
                            type="textarea"
                            v-model="addData.remark"
                            :autosize="{ minRows: 4, maxRows: 10}">
                            </el-input>                 
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
import {terraceAdd,terraceUpdate} from '../../../common/terrace.js'//单页面增删改
import config from '../../../../static/config';
export default({
    name:'rechargeDenominationList',
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
                label:"denomination",
                id:"id"
            },
            ifModify:false,
            firstModify:false,
            treeEntrySearch:true,//是否包含树节点过滤功能
            treeSuggestSearch:false,//是否包含树节点建议过滤功能
            groupId:"",
            treeParams:{
                treeName:'rechargeDenominationList',//树节点名称
                treeApi:config.base.ip+':'+config.base.crmPort+'/api/services/app/DenominationManagement/GetDenominations?GroupId=1'
            },
            dataChange:0,//数据修改次数
            buttonGroup:[  { text:'新增', class:'bt_add', icon:'icon-xinzeng',disabled:false, }, { text:'删除',class:'bt_del', icon:'icon-shanchu',disabled:false, },{text:'保存',class:'bt_save', icon:'icon-baocun',disabled:true,},{text:'保存并新增',class:'bt_saveAdd',icon:'icon-baocunxinzeng',disabled:true,},{ text:'取消', class:'bt_cancel', icon:'icon-quxiao', disabled:true, }],
                 //------------------ 新增客户-------------
            auditInfo:{
                createdTime:GetDateTime(),//创建时间
                createdBy:this.$store.state.name,//创建人
                modifiedTime:GetDateTime(),//修改人
                modifiedBy:this.$store.state.name//修改时间
                    },
            addData:{
                'groupId':0,
                'denomination':'',
                'rechargetPlatform':0,
                'status':1,
                'remark':'',
              },
                status: [],//状态
                rechargetPlatform:[],
                controltype:"",
                value:'',
                dialogUserConfirm:false,//信息更改提示控制
                changeTimes:0,
                isterrace: true,
                nodeData:"",

        }
    },
     validators: {
      'addData.denomination': function (value) {//属性编码
         return this.Validator.value(value).required();
      },
    },
    created () {
        let _this=this;
        _this.loadSelect();
        _this.loadCurrentUser();
        let obj = {id:0}
        setTimeout(function(){
            _this.loadCheckSelect(_this,'recharge-tree',0);
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
       },
       loadCurrentUser(){
             let _this=this;
             _this.$axios.gets("/api/services/app/OuManagement/GetWithCurrentUser").then(res => {
             _this.groupId=res.result.groupId;
             })
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
            }
        },
         //加载状态和控件类型下拉框
            loadSelect(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "Status001"}).then(function(res){
                    _this.status=res.result;
                });
               _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName: "RechargePlatform"}).then(function(res){
                   _this.rechargetPlatform=res.result;
                });
        },
        TreeNodeClick(data){//树节点点击回调  
            this.nodeData=data;           
            let _this=this;  
            console.log('_this.value',_this.value,'data.id',data.id)  ;
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
                    _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/DenominationManagement/Get',{Id:data.id}).then(function(res){
                       
                    _this.dataChange=0;
                    _this.addData=res.result;
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
      save(item){
        let _this=this;
        let modify=false;
        if(_this.addData.id!=undefined){
           modify=true;
             _this.$validate().then(function (success){
            if (success) {  
                terraceUpdate(_this,_this.addData,config.base.ip+':'+config.base.crmPort+'/api/services/app/DenominationManagement/Update').then((res) =>{
                    // console.log(res.result,111111111111111111111111111111111111)
                    if(res.success){
                        if(item){
                            _this.validation.reset();
                            _this.clearAddData();
                        }else{
                           _this.statusbutton(false,false,true,true,true)
                            setTimeout(function(){
                                _this.loadCheckSelect(_this,'recharge-tree',res.result.id)
                            },500) 
                            if(modify){
                                _this.isterrace=true;
                            }
                       
                        }
                    } 
                })
            }
        }); 
        }else{
            modify=true;
             _this.$validate().then(function (success){
            if (success) {
                let a=parseInt(_this.addData.denomination);
                console.log(typeof(a));
                terraceAdd(_this,_this.addData,config.base.ip+':'+config.base.crmPort+'/api/services/app/DenominationManagement/Create').then((res) =>{
                    // console.log(_this.addData);
                    if(res.success){
                        if(item){
                            _this.validation.reset();
                            _this.clearAddData();
                        }else{
                          
                           _this.statusbutton(false,false,true,true,true)
                           console.log(res.result)
                            setTimeout(function(){
                                _this.loadCheckSelect(_this,'recharge-tree',res.result.id)
                            },500) 
                            if(modify){
                                _this.isterrace=true;
                            }
                       
                        }
                    } 
                },(res)=>{
                   console.log(12333)
                    
            })
            }
        }); 
        }    
      },
      saveAdd(){
        this.save(true);
      },
      add(){
          let _this=this;
         _this.loadCheckSelect(_this,'recharge-tree',0)
      },
      delPage(){
            let _this=this;
            // console.log(_this.addData.def_MainTable.id)
            if(_this.addData.id!=undefined){
                _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/DenominationManagement/Delete',{Id:_this.addData.id})
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
         ERRAYTwo(_this,text,type,val,det){
            _this.dialogSetting.dialogName = 'showErMsgDialog'
            _this.dialogSetting.message = text;
            _this.dialogSetting.dialogType = type;
            _this.errorTips.message =  val;
            _this.errorTips.details = det;
            _this.dialogCommand = [{text:'确定',class:'btn-cancel'}];
            _this.dialogVisible = true;
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
        _this.addData={
            "groupId":0,
            "denomination":'',
            "rechargetPlatform":0,
            "status":1,
            "remark":""
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
.recharget-deno-list .border-left{
    width: calc(100% - 290px);
    border-left: 1px solid #E4E4E4;
}
.recharget-deno-list .bgcolor.longWidth{
    margin-right: 0;
    width: 421px;
    height:auto;
    float: left;
  }
  .recharget-deno-list .bgcolor.longWidth.controlTypes{
      width: 900px;
  }
.marginAuto{
      margin: auto;
      width: 550px;
  }
.recharget-deno-list .bgcolor.longWidth label{
    width:80px;
    height: 35px;
  }
.recharget-deno-list .bgcolor.longWidth .el-input{
    width: calc(100% - 90px);
}
.bgcolor.longWidth .el-select{
     width: calc(100% - 90px);
}
.recharget-deno-list .bgcolor .el-select .el-input {
    width: 100%;
}
.recharget-deno-list .getPadding{
    padding: 0 10px;
    border-top:1px solid #e4e4e4;
}
.commodity .bgcolor{
    width:250px
}
.commodity .bgcolor>label{
    width:84px;
}
.recharge-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
}
.recharge-tree .el-input__inner{
    width: calc(100% - 30px);
    margin: 4px 15px 8px;
}
.recharge-tree .el-input__prefix{
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
.recharget-deno-list .rechargetPlatform{
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
.recharget-deno-list .rechargetPlatform:hover{
    border: 1px solid #33cc66;
}


.recharget-deno-list .rechargetPlatform .el-checkbox__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.recharget-deno-list .rechargetPlatform .el-radio__input {
    position: absolute;
    top: -1px;
    left: 0;
}

.recharget-deno-list .rechargetPlatform .el-radio__inner {
    width: 10px;
    height: 10px;
    border-radius: 0;
    border: none;
}
.recharget-deno-list .rechargetPlatform .el-radio__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.recharget-deno-list .rechargetPlatform .el-radio__input.is-checked .el-radio__inner{
    background-color: #3cc;
}
.recharget-deno-list .rechargetPlatform .el-radio__label {
    display: inline;
    padding: 0;
}
.recharget-deno-list .rechargetPlatform .el-radio__input.is-checked+.el-radio__label{
    color: #3cc;
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
.recharget-deno-list .el-button{
    background-color:#3cc;
    color:#fff;
    font-size:20px
}
.def_MainTable-rechargetPlatform .el-radio__label{
    display: inline-block;
}
.recharget-deno-list .bgcolor.longWidth .def_MainTable-rechargetPlatform label{
    width: auto;
    height: 40px;
}
.recharget-deno-list .bgcolor.longWidth .el-textarea{
    width: calc(100% - 90px);
}
</style>



  
