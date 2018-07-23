<template>
 <div class="member-group-detail bg-white">
        <el-row class="fixed">
            <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
            </div>
       </el-row>
       <el-row v-for="(item,indd) in memberGroupConfig" v-loading="loading" >
           <el-col>
                <div class="bgcolor bgradio">
                    <label>{{item.infoName}}</label>
                    <div v-if="item.optionTypeid==1" class="radio-align">
                         <el-radio-group v-model="item.crmFlterConfigRadio">
                            <el-radio v-for="items in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value" @change="changeRadio(items,item)">{{items.displayValue}}</el-radio>
                           
                        </el-radio-group>
                    </div>
                    <div v-else-if="item.optionTypeid==2" class="radio-align">
                        <el-checkbox-group v-model="item.crmFlterConfigCheckBox">
                            <el-checkbox v-for="(items,index) in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value"  @change="changeCheck(items,item)">{{items.displayValue}}</el-checkbox>
                        </el-checkbox-group>
                       
                    </div>
                    <div v-else-if="item.optionTypeid==3">
                         <el-date-picker
                            v-model="item.crmFiterConfigInput"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="crmInput(item)">
                        </el-date-picker>
                    </div>
                    <div v-else="item.optionTypeid==4">
                         <el-date-picker
                            v-model="item.crmFiterConfigInputRadio"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="MM-dd"
                            @change="crmInputRadio(item)">
                        </el-date-picker>
                         <el-radio-group v-model="item.crmFiterConfigBirthRadio" >
                            <el-radio v-for="items in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value" @change="radioBirth(items,item)">{{items.displayValue}}</el-radio>
                           
                        </el-radio-group>
                    </div>
                </div>
           </el-col>
       </el-row>
       <div class="fixed-bottom">
       <el-row>
           <el-col :span="13">
                    <h1 class="user-title">用户群组条件设置</h1>
                    <div @click="refreshCharts" class="refresh-icon">
                     <i class="el-icon-refresh" @click="refreshCharts"></i>
                    </div>
                     <el-table  :data="showPageTable" border style="width: 100%" max-height="400">
                            <el-table-column prop="infoName"label="标题"></el-table-column>
                            <el-table-column prop="config"  label="筛选项"></el-table-column>
                            <el-table-column fixed="right" label="操作"  width="120">
                                <template slot-scope="scope">
                                    <el-button
                                    @click.native.prevent="deleteRow(scope.$index,scope.row)"
                                    type="text"
                                    size="small">
                                    移除
                                    </el-button>
                                </template>
                                </el-table-column>
                        </el-table>
            
           </el-col>
           <el-col :span="11" class="pt10">
               <el-row class="f12 right-side">
                    <el-col :span="12">
                        <span>占比情况<span class="member-all-count">按总会员</span></span>
                        <div id="main"></div>
                    </el-col>
                    <el-col :span="12">
                        <span>会员数量</span>
                        <p class="member-count color-3cc">{{queryMember.memberCount}}</p>
                    </el-col>
               </el-row>
               <el-row>
                    <div class="bgcolor">
                             <label><small>*</small>用户组名称</label>
                             <el-input v-model="addData.mbgroupName" :class="{redBorder : validation.hasError('addData.mbgroupName')}"></el-input>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.mbgroupName') }}</div>
               </el-row>
                <el-row>
                    <div class="bgcolor">
                            <label><small>*</small>状态</label>
                            <el-select clearable filterable v-model="addData.status" :class="{redBorder : validation.hasError('addData.status')}">
                               <el-option v-for="item in dataSource" :label="item.itemName" :key="item.itemValue" :value="item.itemValue">
                               </el-option>
                            </el-select>
                    </div>
                    <div class="error_tips">{{ validation.firstError('addData.status') }}</div>
               </el-row>
                <el-row>
                    <div class="bgcolor bgLongWidth">
                            <label>备注</label>
                            <el-input type="textarea" v-model="addData.remark" ></el-input>
                    </div>
               </el-row>
           </el-col>
       </el-row>
       <el-row class="fixed-colum">
           <el-col :span="12"><p class="count-col"></p></el-col>
           <el-col :span="12">
              <el-col :span="6"><span class="line-height40">会员总数<span class="line-height40 color-3cc">{{queryMember.allMemberCount}}</span></span></el-col>
              <el-col :span="6"><span class="line-height40">筛选项</span><span class="line-height40 color-3cc"{{length}}</span></el-col>
              <el-col :span="6"><el-button round class="sureSave" @click="save('save')">确认保存</el-button></el-col>
              <el-col :span="6"><el-button round @click="back">取消</el-button></el-col>
           </el-col>
       </el-row>
    </div>
      <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
 </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import config from '../../../../static/config';
export default({
 name:'memberGroupList',
    components:{
        buttonGroup,
        dialogBox
    },
    watch:{
        ifModify:{
            handler:function(){
                let _this = this;
                if(_this.ifModify == true){
                    _this.buttonGroup[1].disabled = true;
                    _this.buttonGroup[2].disabled = true;
                    _this.buttonGroup[3].disabled = false;
                    _this.buttonGroup[4].disabled = false;
                    _this.buttonGroup[5].disabled = false;
                    
                }else{
                    _this.buttonGroup[3].disabled = true;
                    _this.buttonGroup[4].disabled = true;
                    _this.buttonGroup[5].disabled = true;
                    _this.buttonGroup[1].disabled = false;
                    _this.buttonGroup[2].disabled = false;
                    
                }
            },
            deep:true,
        },
         addData:{
            handler:function(val,oldVal){
                let _this = this;
                if(!_this.firstModify){
                    _this.firstModify = !_this.firstModify;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,
        },
        memberGroupConfig:{
            handler:function(val,oldVal){
                let _this = this;
                if(!_this.firstModifyMg){
                    _this.firstModifyMg = !_this.firstModifyMg;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,            
        },
    },
    data(){
        return{
            //---dialog-------------
            dialogSetting:{
                message:'',//提示信息
                dialogName:'',//对话框名称
                dialogType:'',//对话框类型
            },
            errorTips:{//对话框 错误提示
                message:'',
                details:'',
            },
            ifModify:false,
            firstModify:false,
            firstModifyMg:false,
            dialogVisible:false,
            dialogCommand:[],//底部按钮组控制组
            buttonGroup:[{
                   text:'返回',
                    class:'bt_back',
                    icon:'icon-fanhui',
                    disabled:false,
                },{
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
                    text:'保存',
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:true,
                },{
                    text:'保存并新增',
                    class:'bt_saveAdd',
                    icon:'icon-baocunxinzeng',
                    disabled:true,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:true,
                }],
                changeTimes:0,
                memberGroupConfig:[],//会员分组条件配置
                crmFlterConfigItems:[],//配置项
                ouTableLoading:true,
                showPageTable:[],//展示分页后表格数据
                CheackAll:[],//选中的所有数据
                ouPageIndex:1,//分页的当前页码
                ouTotalPage:0,//当前分页总数
                ouOneItem:10,//每页有多少条信息
                ouPage:1,//当前页
                ouTotalItem:0,//总共有多少条消息
                feiLei1:'',
                temp:[],
                isname:[],
                isbigArr:[],
                dataSource:[],//状态
                configOutPutAndInput:[],
                addData:{
                "mbgroupName": "",
                "remark": "",
                "status":0,
                "configInputPutDtos": [],
                "id": 0
                },
                queryMember:{},
                length:'',
                percentum:'',
                loading:true,
                backCancel:'',//判断信息提示确定的点击事件
        }
    },
    created () {
        this.loadMemberInfo();
        this.loadStatus();
    },
     validators: {
      'addData.mbgroupName': function (value) {
         return this.Validator.value(value).required();
      },
      'addData.status': function (value) {//
         return this.Validator.value(value).required();
      },
    },
    methods:{
         btnClick(btn){
                if(btn=="取消"){//取消确认对话框
                    this.cancel();
                }else if(btn=="保存"){
                    this.save("save");
                }else if(btn=="删除"){//删除确认对话框
                    this.dialogSetting.dialogName='delDialog'
                    this.dialogSetting.message="确定删除？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }else if(btn=="返回"){
                     this.isback();
                }else if(btn="保存并新增"){
                    this.save("saveAdd")
                }
            },
        isback(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogSetting.dialogName='backDialog'
                _this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;
            }else{
                _this.back();
            }
        },
        cancel(){
            let self = this;
            if(self.ifModify){
                //self.dialogUserConfirm=true;
                self.dialogSetting.dialogName='cancelDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.backCancel = 2;
                self.dialogVisible=true;
            }else{
                self.backCancel = 1;
                
            }       
        },
        sureDoing:function(){
            let self = this;
            if(self.backCancel ==1){
                self.back();
            }else if(self.backCancel == 2){
                console.log(self.memberGroupConfig,self.showPageTable)
                self.memberGroupConfig=[];
                self.showPageTable=[];
                self.loadMemberInfo();
                self.ifModify=false;
                self.firstModify=false;
                self.firstModifyMg=false;
            }
        },
         // ----------------------------返回按钮组------------------------
        back(){
            this.$store.state.url='/memberGroup/memberGroupList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){
            this.$store.state.url='/memberGroup/memberGroupDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        loadStatus(){
              let _this=this;
                _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem",{dictName:'Status001'}).then(res => {
                _this.dataSource=res.result;
                // console.log(res);
              })
         },
        loadMemberInfo(){
            let _this=this;
            
             _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmFlterConfigItemManagement/GetCrmFlterConfigOfMember').then(function(res){
            let arr = res.result;
           _this.loading=false;
            for(let i=0;i<arr.length;i++){
                   arr[i].crmFlterConfigCheckBox = [];
                    arr[i].crmFlterConfigRadio = '';
                    arr[i].crmFiterConfigInput="";
                    arr[i].crmFiterConfigInputRadio=[];
                    arr[i].crmFiterConfigBirthRadio='';
            }
            
            _this.memberGroupConfig = arr;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/Get',{id:_this.$route.params.id}).then(function(res){
                console.log(res);
                _this.addData=res.result;
                $.each(_this.memberGroupConfig,function(index,value){
                    $.each(_this.addData.configInputPutDtos,function(i,val){
                        if(value.infoName==val.infoName){
                            if(value.optionTypeid==1){
                                value.crmFlterConfigRadio=val.crmFlterConfigValues[0].value;
                                console.log(value.crmFlterConfigRadio)
                                 _this.showPageTable.push({infoName:val.infoName,infoCode:val.infoCode,config:val.crmFlterConfigValues[0].displayValue,value:value.crmFlterConfigRadio})
                            }else if(value.optionTypeid==2){
                                value.crmFlterConfigCheckBox=[];
                                $.each(val.crmFlterConfigValues,function(j,jal){
                                     _this.showPageTable.push({infoName:val.infoName,infoCode:val.infoCode,config:jal.displayValue,value:jal.value})
                                    value.crmFlterConfigCheckBox.push(jal.value);
                                })
                                 
                            }else if(value.optionTypeid==3){
                                        _this.showPageTable.push({infoName:val.infoName,infoCode:val.infoCode,config:val.crmFlterConfigValues[0].displayValue,value:val.crmFlterConfigValues[0].value.split(",")})
                                        value.crmFiterConfigInput=val.crmFlterConfigValues[0].value.split(",");  
                            }else if(value.optionTypeid==4){
                                        _this.showPageTable.push({infoName:val.infoName,infoCode:val.infoCode,config:val.crmFlterConfigValues[0].displayValue,value:val.crmFlterConfigValues[0].value})
                                        value.crmFiterConfigInputRadio=val.crmFlterConfigValues[0].value.split(",");
                                        value.crmFiterConfigBirthRadio=val.crmFlterConfigValues[0].value;   
                                    }
                        }
                    })
                })
   
              
                _this.queryMember.memberCount=res.result.memberCount;//会员数量
                console.log(_this.queryMember.memberCount)
                _this.queryMember.allMemberCount=res.result.allMemberCount;//会员总数
                _this.percentum=res.result.percentum;
                _this.drawPie();
            },function(res){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;

            })
          })
        },
        //刷新加载图标
        refreshCharts(){
            let _this=this;
            let  map = {};
            let dest = [];             
            for(let i = 0; i < _this.showPageTable.length; i++){
                let ai = _this.showPageTable[i];
                if(!map[ai.infoName]){
                    dest.push({
                        infoName: ai.infoName,
                        infoCode: ai.infoCode,
                        crmFlterConfigValues:[{
                          value:ai.value.toString(),
                          displayValue:ai.config
                        }],
                    });
                    map[ai.infoName] = ai;
                }else{
                    for(let j = 0; j < dest.length; j++){
                        let dj = dest[j];
                        if(dj.infoName == ai.infoName){
                            dj.crmFlterConfigValues.push({
                                value:ai.value.toString(),
                                displayValue:ai.config 
                            });
                            break;
                        }
                    }
                      _this.configOutPutAndInput=dest;
                        let len=0;
                        for(let a=0;a<_this.configOutPutAndInput.length;a++){
                            len+=_this.configOutPutAndInput[a].crmFlterConfigValues.length;
                     
                     }
                      _this.length=len;
                }
            }
          

            
             _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/MemberCount',_this.configOutPutAndInput).then(function(res){
                 _this.queryMember=res.result;
                 _this.drawPie();
                // _this.open('创建成功','el-icon-circle-check','successERP');
            }).catch(function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
            })
        },
        unique(list) {
                let arr = [];
                let b;
                for (let i = 0; i < list.length; i++) {
                    b = false;
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].config == list[i].config&&arr[j].value == list[i].value){
                          b = true;
                        //   break;
                        }
                    }
                    if (!b) {
                        arr.push(list[i]);
                    }
                    this.showPageTable=arr;
                    }
                      return arr;              
             
            },
        //多选框选中
        changeCheck(item,items){
            let _this=this;
            for(let j=(_this.showPageTable.length-1);j>=0;j--){
                if(_this.showPageTable[j].infoName === items.infoName){
                    _this.showPageTable.splice(j,1);
                }
            }
            $.each(items.crmFlterConfigCheckBox,function(index,value){
                $.each(items.crmFlterConfigItems,function(j,jal){
                    if(value == jal.value){
                        _this.showPageTable.push({infoName:items.infoName,infoCode:items.infoCode,config:jal.displayValue,value:value})
                    }
                })
            })  
        },
        //单选
       changeRadio(item,items){
            let _this = this;
            //console.log(item,items)
            for(let j=(_this.showPageTable.length-1);j>=0;j--){
                if(_this.showPageTable[j].infoName === items.infoName){
                    _this.showPageTable.splice(j,1);
                }
            }
            _this.showPageTable.push({infoName:items.infoName,infoCode:items.infoCode,config:item.displayValue,value:item.value})

        },
        //会员生日的单选
        radioBirth(items,item){
             let _this = this;
            console.log(item,items)
            items.crmFiterConfigInputRadio=[];
            for(let j=(_this.showPageTable.length-1);j>=0;j--){
                if(_this.showPageTable[j].infoName === items.infoName){
                    _this.showPageTable.splice(j,1);
                }
            }
            _this.showPageTable.push({infoName:items.infoName,infoCode:items.infoCode,config:item.displayValue,value:item.value})
        },
          //日期输入框
        crmInput(items){
            let _this = this;
            for(let j=(_this.showPageTable.length-1);j>=0;j--){
                if(_this.showPageTable[j].infoName === items.infoName){
                    _this.showPageTable.splice(j,1);
                }
            }
            _this.showPageTable.push({infoName:items.infoName,infoCode:items.infoCode,config:items.crmFiterConfigInput.join(','),value:items.crmFiterConfigInput})
          
        },
        resdatetime:function(resdatetime){
            var time= new Date(resdatetime)
            var month=(time.getMonth()+1)<10? '0'+(time.getMonth()+1):(time.getMonth()+1);
            var day=time.getDate()<10?'0'+time.getDate():time.getDate();
            return month+'-'+day
        },
        //复合类型日期输入框
        crmInputRadio(items){
           let _this = this;
            //console.log(items)
            for(let j=(_this.showPageTable.length-1);j>=0;j--){
                if(_this.showPageTable[j].infoName === items.infoName){
                    _this.showPageTable.splice(j,1);
                }
            }
            let tableDate=items.crmFiterConfigInputRadio;
            tableDate[0]=_this.resdatetime(tableDate[0])
            tableDate[1]=_this.resdatetime(tableDate[1])
            items.crmFiterConfigBirthRadio=tableDate.toString();
            _this.showPageTable.push({infoName:items.infoName,infoCode:items.infoCode,config:items.crmFiterConfigBirthRadio,value:items.crmFiterConfigInputRadio})  
        },
        //删除行
        deleteRow(index, row) {
            let _this=this;
               $.each(_this.memberGroupConfig,function(i,val){
                if(val.infoName==row.infoName){
                    if(val.optionTypeid==1){
                        console.log(12222)
                        val.crmFlterConfigRadio='';
                    }else if(val.optionTypeid==2){
                        $.each(val.crmFlterConfigCheckBox,function(j,jal){
                            if(jal==row.value){
                                val.crmFlterConfigCheckBox.splice(j,1);
                            }
                        })
                    }else if(val.optionTypeid==3){
                        val.crmFiterConfigInput=[];
                    }else if(val.optionTypeid==4){
                         val.crmFiterConfigInputRadio=[];
                         val.crmFiterConfigBirthRadio='';
                    }
                }
            })
             this.showPageTable.splice(index, 1);
           //
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
        save(saveType){  
           let _this=this;
            let  map = {};
            let dest = [];
            for(let i = 0; i < _this.showPageTable.length; i++){
                let ai = _this.showPageTable[i];
                if(!map[ai.infoName]){
                    dest.push({
                        infoName: ai.infoName,
                        infoCode: ai.infoCode,
                        crmFlterConfigValues:[{
                          value:ai.value,
                          displayValue:ai.config
                        }],
                    });
                    map[ai.infoName] = ai;
                }else{
                    for(let j = 0; j < dest.length; j++){
                        let dj = dest[j];
                        if(dj.infoName == ai.infoName){
                           console.log(dj.crmFlterConfigValues);
                            dj.crmFlterConfigValues.push({
                                value:ai.value,
                                displayValue:ai.config 
                            });
                            break;
                        }
                    }
                }
            }
            _this.addData.configInputPutDtos=dest;
            _this.$validate().then(function (success) {
            if (success) {
                console.log( _this.addData);
            _this.$axios.puts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/UpdateCrmMemberGroup',_this.addData).then(function(res){
            _this.open('修改成功','el-icon-circle-check','successERP');
            if(saveType=="save"){
                _this.ifModify=false;
            }else if(saveType=="saveAdd"){
             _this.goDetail();
            }
           }).catch(function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
                  })
                }
            });
        },
     // ---------------对话框去取消------------------------------ -
        dialogCancel(){
                this.dialogSetting.dialogName='cancelDialog'
                this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
            },
        //点击对话框
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                 if(parmas.dialogName=="backDialog"){
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){
                    this.sureDoing();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="delDialog"){//删除确认操作
                    let _this=this;
                    _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                        _this.open('删除成功','el-icon-circle-check','successERP'); 
                        _this.back();
                        _this.dialogVisible=false; 
                    }).catch(function(err){
                        _this.dialogVisible=false;  
                        _this.$message({
                        type: 'warning',
                        message: err.error.message
                })
             })
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }
         }
        },
        //关闭
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
        drawPie(){
            
            let myChart = echarts.init(document.getElementById('main'));
            let percentum=this.percentum.toFixed(2);;
            let option= {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:['#3cc'],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'占比情况',
                    type:'pie',
                    radius : ['50%', '70%'],
                    label:{
                        normal: {
                        show: true,
                        position: 'center',
                        formatter:function(){
                             return percentum+"%"    
                            },
                        textStyle:{
                           fontSize: 15,
                            color:'#00c0ef'
                        }
                     }
                    },
                    data:[
                        {value:percentum , name:'按会员'}
                    ]
                }
            ]
        };
        myChart.setOption(option);
            this.ifModify=false;
            this.firstModify = false;
            this.firstModifyMg=false;                   
    }
    }
})
</script>
<style>
.bg-white{
    background-color:#fff;
}
.member-group-detail .bgradio{
    width:calc(100% - 84px)
}
.member-group-detail .radio-align{
    margin-right: 10px;
    line-height: 35px;
    display: inline-block;
    height: 100%;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal;
    width:80%;
    text-align: left;

}
.member-group-detail .el-icon-refresh{
    font-size:50px;
    color:#3cc;
}
.member-group-detail .el-radio__label{
  display: inline-block;
}
.member-group-detail .bgcolor .el-checkbox {
    width: auto;
    margin-left: 0;
    margin-right: 40px;
}
.member-group-detail .bgcolor.bgradio{
        height: auto;
}

.member-group-detail #main{
    width: 100%;
    height:200px;
}
.member-group-detail .bgcolor{
    width: 90%;
}
.member-group-detail .bgcolor.bgLongWidth label{
    width:84px;
}
.member-group-detail .bgcolor .el-textarea {
    display: inline-block;
    width: calc(100% - 94px);
    float: left;
    font-size: 12px;
}
.member-group-detail .bgcolor .el-textarea textarea{
    min-height: 84px!important;
}
.member-group-detail .fixed-colum{
    border:1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-bottom: 20px;
}
.member-group-detail .count-col{
    height:50px;
}
.member-group-detail .fixed-colum .line-height40{
     line-height: 50px;
     font-size:14px;
}
.member-group-detail .error_tips{
    color: red;
    font-size: 12px;
    float: left;
    height: 35px;
    line-height: 35px;
}
.member-group-detail .fixed-colum .el-button{
    margin-top:5px;
}
.member-group-detail .sureSave{
  background-color:#3cc;
  color:#fff;
}
.member-group-detail .bgcolor .el-date-editor input {
    padding: 0;
}
.member-group-detail .refresh-icon{
    cursor: pointer;
    float: right;
    display: inline-block;
}
.member-group-detail .member-count{
    
    font-size: 49px;
    padding-left: 40px;
    font-weight: bold;
    padding-top: 20px;

}
.member-group-detail .user-title{
    display:inline-block;
    line-height: 50px;
    font-size:14px;
    padding-left:10px;
}
.member-group-detail .right-side span{
    padding-left:40px;
}
.member-group-detail .right-side .member-all-count{
    padding-left:10px;
    color:#C2CAD8;
}
.color-3cc{
    color: #3cc;
}
</style>