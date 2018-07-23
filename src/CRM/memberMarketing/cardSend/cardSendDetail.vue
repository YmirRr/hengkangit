<template>
    <div class="cardsend-detail">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('addData.crmCouponIssue_Main.taskName')?'block':'none'">
                                名称{{ validation.firstError('addData.crmCouponIssue_Main.taskName') }},
                        </span>

                        <span :class="addData.crmCouponIssue_Main.executeModeid=='1'&& validation.hasError('addData.crmCouponIssue_Main.executeTime')?'block':'none'">
                                固定时间{{ validation.firstError('addData.crmCouponIssue_Main.executeTime')}},
                        </span>  
                        <span :class="addData.crmCouponIssue_Main.executeModeid=='2'&& validation.hasError('chooseDate')?'block':'none'">
                                重复时间{{ validation.firstError('chooseDate')}},
                        </span>  
                        <span :class="validation.hasError('couponId')?'block':'none'">
                                发送卡券类型{{ validation.firstError('couponId')}},
                        </span>  

                        <span :class="validation.hasError('qty')?'block':'none'">
                                每人限领{{ validation.firstError('qty')}},
                        </span>  
                    </p>
                </div>
            </div>

            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>名称</label>
                        <el-input placeholder="" v-model="addData.crmCouponIssue_Main.taskName" @focus="showErrprTips" @change="Modify()" :class="{redBorder : validation.hasError('addData.crmCouponIssue_Main.taskName')}"></el-input>
                    </div>
                </el-row>


                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>生效时间</label>
                        <el-radio v-model="addData.crmCouponIssue_Main.executeModeid" label="0" @change="Modify()">立即生效</el-radio>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio datetime">
                        <label></label>
                        <el-radio v-model="addData.crmCouponIssue_Main.executeModeid" label="1" @change="Modify()">固定时间</el-radio>
                            <el-date-picker :disabled="addData.crmCouponIssue_Main.executeModeid!='1'"
                            v-model="addData.crmCouponIssue_Main.executeTime" class="date"
                            :class="{redBorder : validation.hasError('addData.crmCouponIssue_Main.executeTime')}"
                            type="datetime">
                            </el-date-picker>发送卡券
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio datetime">
                        <label></label>
                        <el-radio v-model="addData.crmCouponIssue_Main.executeModeid" label="2" @change="Modify()">重复时间</el-radio>
                        <el-col :span="12" class="rangeDate smallRangeDate">
                        <el-date-picker  v-model="chooseDate" @focus="showErrprTips" @change="Modify" 
                        :disabled="addData.crmCouponIssue_Main.executeModeid!='2'"
                        :class="{redBorder : validation.hasError('chooseDate')}"
                        type="daterange"
                        range-separator="至">
                        </el-date-picker>
                        </el-col>
                        <el-select v-model="addData.crmCouponIssue_Main.repeatModeid" clearable :disabled="addData.crmCouponIssue_Main.executeModeid!='2'">
                            <el-option v-for="item in time"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select> 
                         <el-time-picker :disabled="addData.crmCouponIssue_Main.executeModeid!='2'"
                            v-model="addData.crmCouponIssue_Main.repeatTime"
                            arrow-control class="date"
                            placeholder="时：分：秒">
                        </el-time-picker>发送卡券

                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>发送卡券</label>
                        <el-select v-model="couponId" clearable
                                    placeholder="" :class="{redBorder : validation.hasError('couponId')}">
                            <el-option v-for="item in ableCard"  
                                    :key="item.id" 
                                    :label="item.couponName" 
                                    :value="item.id"></el-option>
                        </el-select>      
                        每人限领&nbsp;&nbsp;<el-input @change="Modify()" v-model="qty" :class="{redBorder : validation.hasError('qty')}"></el-input>
                    </div>
                </el-row>
                <el-row v-for="(listItem,index) in addCards" :key="listItem.cardId">
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-select v-model="listItem.cardId" clearable
                                    placeholder="" >
                            <el-option v-for="item in ableCard"  
                                    :key="item.id" 
                                    :label="item.couponName" 
                                    :value="item.id"></el-option>
                        </el-select>      
                        每人限领&nbsp;&nbsp;<el-input @change="Modify()" v-model="listItem.cardNum"></el-input>
                        <span class="del-card" @click="delCard(index)">x</span>
                    </div>
                </el-row>      
                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <span class="add-card" @click="addCard">+新增卡券</span>
                    </div>
                </el-row>          

                <el-row>
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="addData.crmCouponIssue_Main.status"
                                    placeholder="" disabled>
                            <el-option v-for="item in statusAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>    

                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor long">
                        <label>备注</label>
                        <el-input placeholder="" v-model="addData.crmCouponIssue_Main.remark" @change="Modify()"></el-input>
                    </div>
                </el-row>


            </el-col>


        </el-row>
        <el-row class="bg-white mt20">
            <div class="tabZoo inline-block-need">
                <el-col :span="24">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="适用人群" name="fitPer" class="getPadding bg-white" style="z-index:-10"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>
            <el-radio v-model="memGroup" label="1" @change="Modify()" class="tabRadio">按会员分组</el-radio>
            <el-radio v-model="memGroup" label="2" @change="Modify()" class="tabRadio">按条件筛选</el-radio>
            <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>

        </el-row>
        <el-row class="bg-white pb20" >
            <el-col :span="24" class="_right_body" v-show="memGroup=='1'">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox class="show_size" v-for="(item,index) in userGroup" :key="index" :label="item.mbgroupName" border></el-checkbox>
                </el-checkbox-group>
            </el-col>
            <el-col :span="24" v-show="memGroup=='2'">
                <el-row v-for="(item,indd) in memberGroupConfig" :key="item.indd">
                    <el-col>
                            <div class="bgcolor bgradio member-group">
                                <label>{{item.infoName}}</label>
                                <div v-if="item.optionTypeid==1" class="radio-align">
                                    <el-radio-group v-model="item.crmFlterConfigRadio">
                                        <el-radio v-for="items in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value" @change="changeRadio(items.value,item.infoName,item.infoCode,items.displayValue,item.crmFlterConfigRadio,indd)">{{items.displayValue}}</el-radio>
                                    
                                    </el-radio-group>
                                </div>
                                <div v-else-if="item.optionTypeid==2" class="radio-align config-checkbox">
                                    <el-checkbox-group v-model="item.crmFlterConfigCheckBox">
                                        <el-checkbox v-for="items in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value"  @change="changeCheck(items.value,item.infoName,item.infoCode,items.displayValue,item.crmFlterConfigCheckBox,indd)">{{items.displayValue}}</el-checkbox>
                                    </el-checkbox-group>
                                
                                </div>
                                <div v-else-if="item.optionTypeid==3" class="rangeDate smallRangeDate">
                                    <el-date-picker
                                        v-model="item.crmFiterConfigInput"
                                        type="daterange"
                                        range-separator="至"
                                        value-format="yyyy-MM-dd"
                                        @change="crmInput(item.infoName,item.infoCode,item.crmFiterConfigInput,indd)">
                                    </el-date-picker>
                                </div>
                                <div v-else-if="item.optionTypeid==4">
                                    <div class="rangeDate smallRangeDate">
                                        <el-date-picker
                                            v-model="item.crmFiterConfigInputRadio"
                                            type="daterange"
                                            range-separator="至"
                                            format="MM-dd"
                                            @change="crmInputRadio(item.infoName,item.infoCode,item.crmFiterConfigInputRadio,indd)">
                                        </el-date-picker>                                    
                                    </div>
                                    <el-radio-group v-model="item.crmFiterConfigBirthRadio" >
                                        <el-radio v-for="items in item.crmFlterConfigItems" :label="items.value" :key="items.value" :value="items.value" @change="radioBirth(items.value,item.infoName,item.infoCode,items.displayValue,item.crmFiterConfigBirthRadio,indd)">{{items.displayValue}}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                    </el-col>



                </el-row>

                <el-row>

                    <el-col :span="24">
                                <h1 class="user-title">用户群组条件设置</h1>
                                <el-table  :data="showPageTable" border style="width: 100%" max-height="400">
                                        <el-table-column prop="infoName" label="标题"></el-table-column>
                                        <el-table-column prop="config"  label="筛选项"></el-table-column>
                                        <el-table-column fixed="right" label="操作"  width="120">
                                            <template slot-scope="scope">
                                                <el-button
                                                @click.native.prevent="deleteRow(scope.$index,showPageTable)"
                                                type="text"
                                                size="small">
                                                移除
                                                </el-button>
                                            </template>
                                            </el-table-column>
                                    </el-table>
                        
                    </el-col>

                </el-row>

                <el-row class="fixed-colum">
                    <el-col :span="12"><p class="count-col"></p></el-col>
                    <el-col :span="12">
                        <el-col :span="6"><span class="line-height40">会员总数<span class="line-height40 color-3cc">{{queryMember.allMemberCount}}</span></span></el-col>
                        <el-col :span="6"><span class="line-height40">筛选项<span class="line-height40 color-3cc">{{length}}</span></span></el-col>
                        <el-col :span="6"><el-button round class="sureSave" @click="refreshData">确认</el-button></el-col>
                    </el-col>
                </el-row>


            </el-col>
            
        </el-row>



      <!-- dialog -->  
      <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>        


    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import Table from '../../../base/Table/Table'
import Vue from 'vue'
import config from '../../../../static/config'
export default {
    name:'cardSendDetail',
    data(){
        return{
            //按钮组-----------------------
            buttonGroup:[{
                text:'返回',
                class:'bt_back',
                icon:'icon-fanhui',
                disabled:false,
            },{
                text:'新增',
                class:'bt_add',
                icon:'icon-xinzeng',
                disabled:true,
            },{
                text:'删除',
                class:'bt_del',
                icon:'icon-shanchu',
                disabled:true,
            },{
                text:'保存',
                class:'bt_save',
                icon:'icon-baocun',
                disabled:false,
            },{
                text:'保存并新增',
                class:'bt_saveAdd',
                icon:'icon-baocunxinzeng',
                disabled:false,
            },{
                text:'取消',
                class:'bt_cancel',
                icon:'icon-quxiao',
                disabled:false,
            },{
                text:'复制活动',
                class:'bt_saveAdd',
                disabled:false,
            },{
                text:'审核',
                class:'bt_cancel',
                icon:'icon-shenhe',
                disabled:false,
            },{
                text:'预计发放统计',
                class:'bt_saveAdd',
                disabled:false,
            }],
            //弹框-----------------------
            dialogCommand:[],//底部按钮组控制组
            dialogVisible:false,
            errorTips:{//对话框 错误提示
                message:'',
                details:'',
            },
            dialogSetting:{
                message:'',//提示信息
                dialogName:'',//对话框名称
                dialogType:'',//对话框类型
            },
            ifModify:false,
            addData:{
                "crmCouponIssue_Main": {
                    "groupId": 0,
                    "taskName": "",
                    "executeModeid": "0",
                    "executeTime": "",
                    "repeatStart": "",
                    "repeatEnd": "",
                    "repeatModeid": "",
                    "repeatValue": "",
                    "repeatTime": "",
                    "remark": "",
                    "applyMbgroup": true,
                    "applyFilte": true,
                    "status": 0,
                    "isExecuted": false,//默认不执行
                    "repeatModeidTValue": "",
                    "effectiveTimeStr": "",
                    "statusTValue": "",
                    "id": 0
                },
                "crmCouponIssueItems_Children": [
                    {
                    "groupId": 0,
                    "taskId": 0,
                    "couponId": '',
                    "qty": '',
                    "couponId_CouponName": "",
                    "id": 0
                    }
                ],
                "issueFilter_Children": [],
                "issueMbgroups_Children": []
            },
            time:[
                {itemName:"每天",itemValue:4},
                {itemName:"每月",itemValue:2},
            ],
            chooseDate:[],//选择重复时期范围
            backId:'',//保存后返回Id
            ableCard:[],//可用卡券
            addCards:[],//新增卡券
            statusAr:[],
            activeName:"fitPer",
            ifShow:true,
            userGroup:[],//用户分组
            memGroup:"1",//适用人群单选框
            checkList:[],//选择的会员分组

            memberGroupConfig:[],//会员分组条件配置
            crmFlterConfigItems:[],//配置项
            ouTableLoading:true,
            showPageTable:[],//展示分页后表格数据

   
            isname:[],
          
            dataSource:[],//状态
            configOutPutAndInput:[],

            queryMember:'',
            length:'',
            couponId:'',
            qty:'',




        }
        
    },
    validators: {
        'addData.crmCouponIssue_Main.taskName': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'addData.crmCouponIssue_Main.executeTime': function (value) {//固定时间
            if(this.addData.crmCouponIssue_Main.executeModeid=='1'){
                return this.Validator.value(value).required();
            }
        },
        'chooseDate': function (value) {//重复时间
            if(this.addData.crmCouponIssue_Main.executeModeid=='2'){
                return this.Validator.value(value).required();
            }
        },
        'couponId': function (value) {//发送卡券
                return this.Validator.value(value).required();
        },

        'qty': function (value) {//发送卡券
                return this.Validator.value(value).required();
        },
    },       
    created(){
        this.loadAbelCard();
        this.loadFilter();
    },
    watch:{
       
    },
    methods:{
        loadAbelCard(){
            //获取可用卡券
            let _this=this;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Get_Coupon_library').then(function(res){
                console.log(res)
                _this.ableCard=res.result;
            },function(err){
                _this.$message({
                type: "warning",
                message: err.error.message
                });              
            });    
            //获取状态枚举
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OrderStatus'}).then(function(res){
                //console.log(res);
                _this.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //加载用户组
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){
                console.log(res.result.items)
                _this.userGroup=res.result.items;   
            },function(res){
                console.log('err'+res)
            });
            //加载状态
            _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem",{dictName:'Status001'}).then(res => {
                _this.dataSource=res.result;
                console.log(res);
            })
            
        },
        loadFilter(){
            let _this=this;
            //加载筛选条件
             _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmFlterConfigItemManagement/GetCrmFlterConfigOfMember').then(function(res){
                let arr = res.result;
                for(let i=0;i<arr.length;i++){
                    arr[i].crmFlterConfigCheckBox = [];
                    arr[i].crmFlterConfigRadio = arr[i].infoCode;
                    arr[i].crmFiterConfigInput='';
                    arr[i].crmFiterConfigInputRadio='';
                    arr[i].crmFiterConfigBirthRadio='';
                }
                arr[0].sex="1";

                console.log(arr[0].crmFlterConfigRadio) 
                console.log(arr)
                _this.memberGroupConfig = arr;
            },function(res){
                

            })

        },
        //刷新加载数据
        refreshData(){
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
            _this.configOutPutAndInput=dest;
            let len=0;
            for(let a=0;a<_this.configOutPutAndInput.length;a++){
                len+=_this.configOutPutAndInput[a].crmFlterConfigValues.length;
            }
            console.log(len,111111111111111111111)
           _this.length=len;
           console.log( _this.configOutPutAndInput)
             _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmMemberGroupManagement/MemberCount',_this.configOutPutAndInput).then(function(res){
                 _this.queryMember=res.result;
                // _this.open('创建成功','el-icon-circle-check','successERP');
            }).catch(function(err){
                console.log(err)
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
            })
        },

        //多选框选中
        changeCheck(val,label,infoCode,displayValue,a,index){
            let _this=this;
            console.log(val,label,infoCode,displayValue,a,index);
            let is = true;
            for(let j=0;j<this.isname.length;j++){
                if(this.isname[j].name === label && this.isname[j].arra.length > a.length){//数据要被删除
                    is = false;
                    for(let i=0;i<this.showPageTable.length;i++){
                        if(this.showPageTable[i].value == val && this.showPageTable[i].infoName == label){
                            this.showPageTable.splice(i,1);
                        }
                    }

                    this.isname[j].arra = a;
                }else if(this.isname[j].name === label && this.isname[j].arra.length < a.length){
                    is = false;
                    this.isname[j].arra = a;
                     this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
                }
            }
            if(is){
                this.isname.push({name:label,arra:a})
                this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
            }
           console.log(this.showPageTable)    
        },
        //单选
        changeRadio(val,label,infoCode,displayValue,a,index){
            console.log(val,label,infoCode,displayValue,a,index)
            let is = true;
            for(let j=0;j<this.isname.length;j++){
                console.log(12333)
                if(this.isname[j].name === label){//数据要被删除
                    is = true;
                    for(let i=0;i<this.showPageTable.length;i++){
                        console.log(this.showPageTable[i].value == val)
                        if(this.showPageTable[i].value != val && this.showPageTable[i].infoName == label){
                            this.showPageTable.splice(i,1);

                        }
                    }

                    this.isname[j].arra = a;
                }else if(this.isname[j].name === label && this.isname[j].arra.length < a.length){
                    is = false;
                    this.isname[j].arra = a;
                    this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
                }
            }
            if(is){
                this.isname.push({name:label,arra:a})
                this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
            }
        },
        //会员生日的单选
        radioBirth(val,label,infoCode,displayValue,a,index,input){
            this.memberGroupConfig[index].crmFiterConfigInputRadio='';
            console.log(val,label,infoCode,displayValue,a,index,input)
           
            let is = true;
            for(let j=0;j<this.isname.length;j++){
                console.log(12333)
                if(this.isname[j].name === label){//数据要被删除
                    is = true;
                    for(let i=0;i<this.showPageTable.length;i++){
                        console.log(this.showPageTable[i].value == val)
                        if(this.showPageTable[i].value != val && this.showPageTable[i].infoName == label){
                            this.showPageTable.splice(i,1);

                        }
                    }

                    this.isname[j].arra = a;
                }else if(this.isname[j].name === label && this.isname[j].arra.length < a.length){
                    is = false;
                    this.isname[j].arra = a;
                    this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
                }
            }
            if(is){
                this.isname.push({name:label,arra:a})
                this.showPageTable.push({value:val,infoName:label,infoCode:infoCode,config:displayValue,index:index})
            }
        },
          //日期输入框
        crmInput(infoName,infoCode,val,index){
            console.log(infoName,infoCode,val,index);
            let is = true;
            if(this.val==null){
                for(let i=0;i<this.showPageTable.length;i++){
                    console.log(this.showPageTable[i].value,val);
                    if(val==null&& this.showPageTable[i].infoName == infoName){
                        this.showPageTable.splice(i,1);
                    }
                }
            }else{
                val=val.join(",");
                for(let j=0;j<this.isname.length;j++){
                if(this.isname[j].name === infoName && this.isname[j].arra.length!= val){//数据要被删除
                    is = false;
                    for(let i=0;i<this.showPageTable.length;i++){
                        console.log(this.showPageTable[i].value,val);
                        if(this.showPageTable[i].value == val && this.showPageTable[i].infoName == infoName){
                            this.showPageTable.splice(i,1);
                        }
                    }

                    this.isname[j].arra = val;
                }
            }
            }
          
            if(is){
                this.isname.push({name:infoName,arra:val});
                console.log(val);
                if(val!=null){
                    val=val.join(",");
                    this.showPageTable.push({value:val,infoName:infoName,infoCode:infoCode,config:val,index:index})
                }
                
            }
             console.log(this.showPageTable) 
        },
        resdatetime:function(resdatetime){
            var time= new Date(resdatetime)
            var month=(time.getMonth()+1)<10? '0'+(time.getMonth()+1):(time.getMonth()+1);
            var day=time.getDate()<10?'0'+time.getDate():time.getDate();
            return month+'-'+day
        },
        //复合类型日期输入框
        crmInputRadio(infoName,infoCode,val,index){
            let is = true;
            if(this.val==null){
                for(let i=0;i<this.showPageTable.length;i++){
                    console.log(this.showPageTable[i].value,val);
                    if(val==null&& this.showPageTable[i].infoName == infoName){
                        this.showPageTable.splice(i,1);
                    }
                }
            }else{
                val[0]=this.resdatetime(val[0]);
                val[1]=this.resdatetime(val[1]);
                val=val.toString();
                for(let j=0;j<this.isname.length;j++){
                if(this.isname[j].name === infoName && this.isname[j].arra.length!= val){//数据要被删除
                    is = false;
                    for(let i=0;i<this.showPageTable.length;i++){
                        console.log(this.showPageTable[i].value,val);
                        if(this.showPageTable[i].value == val && this.showPageTable[i].infoName == infoName){
                            this.showPageTable.splice(i,1);
                        }
                    }

                    this.isname[j].arra = val;
                }else if(this.isname[j].name === infoName && this.isname[j].arra.length < val){
                    is = false;
                    this.isname[j].arra =val;
                    this.showPageTable.push({value:val,infoName:infoName,infoCode:infoCode,config:val,index:index})
                }
            }
            }
          
            if(is){
                val[0]=this.resdatetime(val[0]);
                val[1]=this.resdatetime(val[1]);
                val=val.toString();
                this.isname.push({name:infoName,arra:val});
                if(val!=null){
                    //val=val.join(",");
                    this.showPageTable.push({value:val,infoName:infoName,infoCode:infoCode,config:val,index:index})
                }
                
            }   
        },
        //删除行
        deleteRow(index, rows) {
            let index1 = this.showPageTable[index].index;
            //多选
            for(let i=0;i<this.memberGroupConfig[index1].crmFlterConfigCheckBox.length;i++){
                if(this.memberGroupConfig[index1].crmFlterConfigCheckBox[i] == this.showPageTable[index].value){
                    console.log( this.memberGroupConfig[index1].crmFlterConfigCheckBox)
                    this.memberGroupConfig[index1].crmFlterConfigCheckBox.splice(i,1)
                }  
            }
            //日期输入框
            for(let i=0;i<this.memberGroupConfig[index1].crmFiterConfigInput.length;i++){
              if(this.memberGroupConfig[index1].crmFiterConfigInput[i] != this.showPageTable[index].value){
                    this.memberGroupConfig[index1].crmFiterConfigInput.splice(i,1);
                }  
            }
            //复合类型的单选
              if(this.memberGroupConfig[index1].crmFiterConfigBirthRadio == this.showPageTable[index].value){
                    this.memberGroupConfig[index1].crmFiterConfigBirthRadio='';
                }  
            //复合类型的输入框
             for(let i=0;i<this.memberGroupConfig[index1].crmFiterConfigInputRadio.length;i++){
              if(this.memberGroupConfig[index1].crmFiterConfigInputRadio[i] != this.showPageTable[index].value){
                    this.memberGroupConfig[index1].crmFiterConfigInputRadio.splice(i,1);
                }  
            }
            //单选
             if(this.memberGroupConfig[index1].crmFlterConfigRadio == this.showPageTable[index].value){
                    this.memberGroupConfig[index1].crmFlterConfigRadio='';
                }  
            console.log(index)
             this.showPageTable.splice(index, 1);
           //
         },

        addCard(){//点击新增发送卡券
            let card={
                "cardId":'',
                'cardNum':''
            }
            this.addCards.push(card);
        },
        delCard(index){//点击删除发送卡券
            this.addCards.splice(index,1)
        console.log(index)

        },
        //按钮组点击事件---------------------
        btnClick(btn){
            let _this = this;
            if(btn=="返回"){
                _this.isback();
            }else if(btn=="新增"){
                
            }else if(btn=="删除"){

            }else if(btn=="保存"){
                _this.save("save")
            }else if(btn=="保存并新增"){
                _this.save("saveAdd")
            }else if(btn=="取消"){
                _this.isback();
            }else if(btn=="复制卡券"){
            }else if(btn=="审核"){
            }else if(btn=="作废"){
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
        back(){
            this.$store.state.url='/cardSend/cardSendList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由    
        },
        save(saveType){
            let _this=this;
            $('.tipsWrapper').css({display:'block'});
            _this.$validate().then(function(success){
                $('.tipsWrapper').css({display:'none'});
                _this.addData.crmCouponIssue_Main.repeatStart=_this.chooseDate[0];
                _this.addData.crmCouponIssue_Main.repeatEnd=_this.chooseDate[1];
                if(_this.memGroup=="1"){//按会员分组
                    _this.addData.crmCouponIssue_Main.applyMbgroup=true;
                    _this.addData.crmCouponIssue_Main.applyFilte=false;
                }else{//按条件筛选
                    _this.addData.crmCouponIssue_Main.applyMbgroup=false;
                    _this.addData.crmCouponIssue_Main.applyFilte=true;

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
                            console.log(ai.value)
                            map[ai.infoName] = ai;
                        }else{
                            for(let j = 0; j < dest.length; j++){
                                let dj = dest[j];
                                if(dj.infoName == ai.infoName){
                                console.log(dj.crmFlterConfigValues);
                                    dj.crmFlterConfigValues.push({
                                        value:ai.value.toString(),
                                        displayValue:ai.config 
                                    });
                                    break;
                                }
                            }
                        }
                    }
                    _this.addData.issueFilter_Children=dest;
                }
                //发送卡券
                _this.addData.crmCouponIssueItems_Children[0].couponId=_this.couponId;
                _this.addData.crmCouponIssueItems_Children[0].qty=_this.qty;
                if(_this.addData.crmCouponIssueItems_Children.length>1){
                    _this.addData.crmCouponIssueItems_Children.splice(1,(_this.addData.crmCouponIssueItems_Children.length-1))
                }
                if(_this.addCards.length!=0){
                    $.each(_this.addCards,function(i,val){
                        let coupon={
                                "groupId": 0,
                                "taskId": 0,
                                "couponId": 0,
                                "qty": 0,
                                "couponId_CouponName": "",
                                "id": 0
                            }
                        _this.addData.crmCouponIssueItems_Children.push(coupon);
                        _this.addData.crmCouponIssueItems_Children[i+1].couponId=val.cardId;
                        _this.addData.crmCouponIssueItems_Children[i+1].qty=val.cardNum;
                    })                    
                }

                _this.addData.issueMbgroups_Children=[];
                if(_this.checkList.length!=0){
                    console.log(_this.checkList)
                
                    $.each(_this.checkList,function(i,val){
                        let mem={
                            "groupId": 0,
                            "taskId": 0,
                            "mbgroupId": 0,
                            "mbgroupId_MbgroupName": "",
                            "mbgroupId_MbgroupCode": "",
                            "id": 0
                        }
                        _this.addData.issueMbgroups_Children.push(mem);
                        $.each(_this.userGroup,function(index,value){
                            if(val==value.mbgroupName){
                                _this.addData.issueMbgroups_Children[i].mbgroupId=value.id;
                            }
                        })
                    })
                }

                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    console.log(_this.addData)
                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/CreateAndUpdateIssue',_this.addData).then(function(res){
                        _this.open('创建成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            _this.backId = res.result;
                            _this.goModify(_this.backId);
                        }else if(saveType=="saveAdd"){
                            _this.addData = {
                                "crmCouponIssue_Main": {
                                    "groupId": 0,
                                    "taskName": "",
                                    "executeModeid": "0",
                                    "executeTime": "",
                                    "repeatStart": "",
                                    "repeatEnd": "",
                                    "repeatModeid": "",
                                    "repeatValue": "",
                                    "repeatTime": "",
                                    "remark": "",
                                    "applyMbgroup": true,
                                    "applyFilte": true,
                                    "status": 0,
                                    "isExecuted": false,//默认不执行
                                    "repeatModeidTValue": "",
                                    "effectiveTimeStr": "",
                                    "statusTValue": "",
                                    "id": 0
                                },
                                "crmCouponIssueItems_Children": [
                                    {
                                    "groupId": 0,
                                    "taskId": 0,
                                    "couponId": '',
                                    "qty": '',
                                    "couponId_CouponName": "",
                                    "id": 0
                                    }
                                ],
                                "issueFilter_Children": [],
                                "issueMbgroups_Children": []
                            }
                            _this.checkList=[];
                            _this.loadFilter();
                            _this.validation.reset();
                        }
                    },function(err){
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message=err.error.message;
                        _this.errorTips.message=err.error.message;
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;
                        $('.tipsWrapper').css({display:'none'});
                    })

                }
            })

        },

        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            this.$store.state.url='/cardSend/cardSendModify/'+id;
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        //---判断是否有修改过的内容---------------------------
        Modify:function(){//判断主表是否修改过
            this.ifModify = true;
        },
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
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
   

        //------------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                 if(parmas.dialogName=="backDialog"){
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){
                    this.back();
                    this.dialogVisible=false;
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },


    },
    components:{
        buttonGroup,
        dialogBox,
        Table
    }
}
</script>
<style scoped>
.block{
    display: inline-block;
}
.none{
    display: none;
}
.bg-white{
    background-color: white;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.bt1{
    border-top:1px solid #ccc;
}
.color-3cc{
    color: #3cc;
}
.cardsend-detail .bgradio{
    width: calc(100% - 84px);
}
.cardsend-detail .bgradio .el-input{
    display: inline-block;
    width: 160px;
    float: none;
    margin-right: 10px;
}
.cardsend-detail .bgradio .el-select{
    width: 160px;
    margin-right: 10px;
}
.cardsend-detail .bgradio .rangeDate{
    width: 320px;
    margin-right: 10px;
}
.cardsend-detail .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.cardsend-detail .bgradio .el-input__inner{
    height: 32px;
}
.cardsend-detail .gray{
    font-size: 12px;
    color: #cccccc;
    display: inline-block;
    height: 35px;
    line-height: 35px;
}
.cardsend-detail .bgrow{
    margin-bottom: 0;
}
.cardsend-detail .same-row{
    margin-bottom:0px;
}
.border-green{
    border-bottom:2px solid rgb(51, 204, 204);
    float:left;
    height:34px;
    line-height:34px;
    margin-right:10px;   
    margin-left:10px;
}
.erp_bt{
    height:24px;
}
.erp_bt .btDetail{
    line-height:24px;
}
.erp_bt .btImg img{
    top:-4px;
}
.erp_bt{
    padding:0 6px;
    margin-top:8px;
}
.erp_bt .btDetail{
    padding-left:10px;
}


.cardsend-detail .relative{
    position: relative;
}
.cardsend-detail .add-card{
    color: rgb(51, 204, 204);
    cursor: pointer;
}
.cardsend-detail .del-card{
    display:inline-block;
    border: 1px solid rgb(51, 204, 204);
    width: 20px;
    height: 20px;
    border-radius: 10px;
    font-size: 14px;
    color: rgb(51, 204, 204);
    cursor: pointer;
    text-align: center;
}
.cardsend-detail .fixed-colum{
    border:1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-bottom: 20px;
}
.cardsend-detail .count-col{
    height:50px;
}
.cardsend-detail .fixed-colum .line-height40{
     line-height: 50px;
     font-size:14px;
}
.cardsend-detail .fixed-colum .el-button{
    margin-top:5px;
}
</style>
<style>
.cardsend-detail .smallRangeDate .el-input__inner{
    height: 32px;
}

.cardsend-detail .smallRangeDate .el-range-separator{
    height: 30px;
    line-height:30px;
}
.cardsend-detail .bgradio .el-radio__label{
    display:inline-block;
    font-size:12px;
}
.cardsend-detail .bgradio .el-input .el-input__inner{
    height: 32px!important;
}
.cardsend-detail .bgradio .el-radio{
    width:auto;
}
/* .cardsend-detail .bgcolor .el-date-editor input{
    padding:0;
} */
.cardsend-detail .long{
    width: 600px;
}
.cardsend-detail .dialogQu .el-dialog__body{
    height: 300px;
}
.cardsend-detail .transfer_warapper{
    border:none;
}
.cardsend-detail .inline-block-need{
    display: inline-block;
    float: left;
}
.cardsend-detail .tabZoo{
    overflow: hidden;
    background-color: #fff;
}
.cardsend-detail .getPadding,.tabZoo .el-tabs__nav-scroll{
    padding: 0 10px;
    background-color: white;
}
.cardsend-detail .tabZoo .auditInformation{
    margin-top: 15px;
}

.cardsend-detail .tabZoo .erp_bt:first-child{
    margin-left: 0;
}
.cardsend-detail .nopadding{
    padding-top: 0;
}
.cardsend-detail .tabZoo .el-tabs__active-bar{
    width: 63px!important;
}
.cardsend-detail .tabRadio .el-radio__label{
    display: inline;
}
.cardsend-detail .tabRadio{
    padding-top:20px;
}

.cardsend-detail .config-checkbox .el-radio-group{
    margin-top:8px;
}
.cardsend-detail .show_size{
    height: 45px;
    border-radius: 3px;
    text-align: center;
    line-height: 45px;
    font-size: 12px;
    display: block;
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    border-width: 1px;
    border-style: solid;
    /* border: 1px solid #e4e4e4; */
    cursor: pointer;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 16px;
}
.cardsend-detail .show_size.addSize{
    background-color: #e4e4e4;
}
.cardsend-detail .show_size.addSize .x,
.cardsend-detail .show_size.addSize .y{
    display: block;
    background: #999999;
    position: absolute;
    width: 1px;
    height:23px;
    left: 50%;
    top: 8px;
}
.cardsend-detail .show_size .y{
    transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -moz-transform:rotate(90deg); 
}
.cardsend-detail .show_size.addSize{
    font-size: 40px;
}
.cardsend-detail .show_size i.fa-check-square{
    position: absolute;
    color: ##33CCCC;
    top: -1px;
    left: -1px;
}
.cardsend-detail .show_size:hover{
    border: 1px solid #33CCCC;
}
 .cardsend-detail .show_size .el-checkbox__input{
    position: absolute;
    top: -1px;
    left: 0;
 }
 .cardsend-detail .show_size .el-checkbox__inner{
     width: 10px;
     height: 10px;
     border-radius: 0;
     border: none;
     
 }
 .cardsend-detail .show_size .el-checkbox__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.cardsend-detail .show_size .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #33CCCC;
}
.cardsend-detail .show_size .el-checkbox__label{
    display: inline;
    padding: 0;
}
.cardsend-detail .show_size .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #33CCCC;
}
.cardsend-detail .show_size.el-checkbox.is-bordered.is-checked{
    border-color:#33CCCC;
}
.cardsend-detail .el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left:20px;
}

.cardsend-detail .radio-align{
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
.cardsend-detail .member-group .el-input__inner{
    height:34px;
}
.cardsend-detail .member-group{
    height:auto;
}
.cardsend-detail .bgcolor .el-date-editor .el-input__prefix{
    left: -3px;
    right: auto;
}
.cardsend-detail .bgcolor .el-input__prefix i{
    height: 32px;
    line-height:32px;
}
.cardsend-detail .el-input__icon{
    line-height: 32px;
}
.cardsend-detail .date input{
    padding:0 20px;
}
.cardsend-detail .bgcolor .el-checkbox{
    margin-right:30px;
}
.cardsend-detail .datetime .el-input{
    width:170px;    
}
.cardsend-detail .el-select .el-input{
    width:160px;
}
</style>