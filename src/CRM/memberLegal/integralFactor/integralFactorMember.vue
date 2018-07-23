<template>
    <div class="integral-birth">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('addData.integralTactic_MainTable.tacticCode')?'block':'none'">
                                编码{{ validation.firstError('addData.integralTactic_MainTable.tacticCode') }},
                        </span>
                        <span :class="validation.hasError('addData.integralTactic_MainTable.tacticName')?'block':'none'">
                                名称{{ validation.firstError('addData.integralTactic_MainTable.tacticName') }},
                        </span>
                        <span :class="validation.hasError('chooseDate')?'block':'none'">
                                生效时间{{ validation.firstError('chooseDate')}},
                        </span>           
                    </p>
                </div>
            </div>
            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>编码</label>
                        <el-input placeholder="" v-model="addData.integralTactic_MainTable.tacticCode"  @change="Modify" @focus="showErrprTips" :class="{redBorder : validation.hasError('addData.integralTactic_MainTable.tacticName')}"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>名称</label>
                        <el-input placeholder="" v-model="addData.integralTactic_MainTable.tacticName"  @change="Modify" @focus="showErrprTips" :class="{redBorder : validation.hasError('addData.integralTactic_MainTable.tacticCode')}"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor nopadding short">
                    <label><small>*</small>生效时间</label>
     
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                        <el-date-picker  v-model="chooseDate" :class="{redBorder : validation.hasError('chooseDate')}" @change="Modify" @focus="showErrprTips"
                        type="daterange"
                        range-separator="至">
                        </el-date-picker>
                    </el-col> 
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor nopadding">
                        <label></label>
                        <el-checkbox v-model="checked" @change="Modify">按周期重复</el-checkbox>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor long nopadding">
                        <label></label>
                        <span class="gray">默认情况下不启用周期重复；若勾选时可进行选择周期设置</span>
                    </div>
                </el-row>
                <el-row>     
                    <table class="week-table">
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="1" :disabled="!checked" @change="Modify">每年</el-radio></td>
                            <td>
                                <el-input placeholder="请输入月日" class="input" v-model="addData.freq_ChildTable[0].selectYear" :disabled="radio!='1'"></el-input>
                                <span class="gray">勾选每年则以当前年份为计算周期，不同日期以逗号隔开，例如“ 8-3,10-4,12-5 ”，表示8月3日，10月4日，12月5日</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="2" :disabled="!checked" @change="Modify">每月</el-radio></td>
                            <td>
                                <el-input placeholder="请输入日" class="input" v-model="addData.freq_ChildTable[0].selectMonth" :disabled="radio!='2'"></el-input>
                                <span class="gray">勾选每月则以当前月份为计算周期，不同日期以逗号隔开，例如“ 3,4,5 ”，表示每月3日，4日，5日</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="3" :disabled="!checked" @change="Modify">每周</el-radio></td>
                            <td>
                                <el-radio-group v-model="addData.freq_ChildTable[0].selectWeek" :disabled="radio!='3'">
                                    <el-radio-button label="周一"></el-radio-button>
                                    <el-radio-button label="周二"></el-radio-button>
                                    <el-radio-button label="周三"></el-radio-button>
                                    <el-radio-button label="周四"></el-radio-button>
                                    <el-radio-button label="周五"></el-radio-button>
                                    <el-radio-button label="周六"></el-radio-button>
                                    <el-radio-button label="周日"></el-radio-button>
                                </el-radio-group>
                            </td>
                        </tr>
                    </table>
                </el-row>
                <el-row class="mt20">
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="addData.integralTactic_MainTable.status"
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
                        <el-input placeholder="" v-model="addData.integralTactic_MainTable.remark"  @change="Modify"></el-input>
                    </div>
                </el-row>

                <el-row class="bt1">
                    <div class="bgcolor bgradio bgrow">
                        <label><small>*</small>会员等级范围</label>
                        <el-radio v-model="addData.integralTactic_MainTable.applyTypeid" label="1" @change="changeRange">按业务组织</el-radio>
                        <el-radio v-model="addData.integralTactic_MainTable.applyTypeid" label="2" @change="changeRange">按业务地区</el-radio>
                        <el-radio v-model="addData.integralTactic_MainTable.applyTypeid" label="3" @change="changeRange">按渠道</el-radio>
                    </div>
                </el-row>
                <el-row>
                    <el-col :span="24" class="bt1 pt5 bg-white">
                        <span class="border-green">设置等级范围</span>
                        <button class="erp_bt bt_add"  @click="dialogRangeShow">
                            <div class="btImg">
                                <img src="../../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail">选取</span>
                        </button>
                        <span class="gray" v-if="addData.integralTactic_MainTable.applyTypeid=='1'">(按组织)</span>
                        <span class="gray" v-else-if="addData.integralTactic_MainTable.applyTypeid=='2'">(按业务地区)</span>
                        <span class="gray" v-else-if="addData.integralTactic_MainTable.applyTypeid=='3'">(按渠道)</span>

                    </el-col>
                    <el-col :span="24" v-show="ifShow" class="bg-white pr10 pl10">
                        <el-table :data="rangeTableData" border style="width: 100%" stripe >
                            <el-table-column label="组织" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.ouName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="业务地区" v-if="addData.integralTactic_MainTable.applyTypeid=='2'||addData.integralTactic_MainTable.applyTypeid=='3'">
                                <template slot-scope="scope">
                                    <span>{{scope.row.opAreaId_AreaName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="渠道" class="relative"  v-if="addData.integralTactic_MainTable.applyTypeid=='3'">
                                <template slot-scope="scope">
                                    <span>{{scope.row.channelId_ShopName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="多倍积分">
                                <el-table-column v-for="(member,index) in memberLevel" :label="member.gradeName" :key="member.id">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.multiple_ChildTable[index].multiple" @focus="level(member,index,scope.row)"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label='操作'>
                                <template slot-scope="scope" >
                                    <el-button type="text" @click="delCheckOu(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table> 
                    </el-col>
                </el-row>      
            </el-col>
        </el-row>

        <!-- 使用组织弹框 -->
        <el-dialog :visible.sync="oudialog"  class="transfer_dialog dialogOu" width="30%">
            <span slot="title">
                <span>所有组织</span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input"
                            v-model="ouSearch"
                            >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </div>
            </span>
            <el-col :span="24" class="transfer_warapper">
                <el-col :span="24" class="checkBoxOuUser">
                    <el-checkbox @change="CheckAllTree" v-model="checkAllOu" class="square_el"></el-checkbox><span>全选</span>
                    <el-checkbox @change="showCheckTree" v-model="showCheck" class="square_el"></el-checkbox><span>查看已选</span>
                </el-col>
                <el-col :span="24" class="transfer_table">
                    <vue-scroll :ops="$store.state.option">
                        <el-tree
                        :render-content="renderContent_ouTreeDataRight"
                        :default-expanded-keys="expand.expandId_dialogOu"
                        :data="ouTreeDataRight"
                        show-checkbox
                        :highlight-current="true"
                        node-key="id"
                        ref="fptree"
                        :filter-node-method="filterNode"
                        @node-click="ouNodeClickRight"
                        @check-change="isCheckAllOu"
                        :expand-on-click-node="false"
                        :props="ouDefaultPropsRight">
                        </el-tree>
                    </vue-scroll>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="dialogSure">确 认</button>
                <button class="transfer_footer_btn" @click="oudialog = false">取 消</button>
            </span>
        </el-dialog>
        <!-- 业务地区弹框 -->
        <el-dialog :visible.sync="opdialog"  class="transfer_dialog dialogOu" width="30%">
            <span slot="title">
                <span>业务地区</span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input"
                            v-model="opSearch"
                            >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </div>
            </span>
            <el-col :span="24" class="transfer_warapper">
                <el-col :span="24" class="checkBoxOuUser">
                    <el-checkbox @change="CheckAllTreeOp" v-model="checkAllOp" class="square_el"></el-checkbox><span>全选</span>
                    <el-checkbox @change="showCheckTreeOp" v-model="showCheckOp" class="square_el"></el-checkbox><span>查看已选</span>
                </el-col>
                <el-col :span="24" class="transfer_table">
                    <vue-scroll :ops="$store.state.option">
                        <el-tree
                        :render-content="renderContent_opTreeDataRight"
                        :default-expanded-keys="expandop.expandId_dialogOp"
                        :data="opTreeDataRight"
                        show-checkbox
                        :highlight-current="true"
                        node-key="id"
                        ref="optree"
                        :filter-node-method="opfilterNode"
                        @node-click="opNodeClickRight"
                        @check-change="isCheckAllOp"
                        :expand-on-click-node="false"
                        :props="opDefaultPropsRight">
                        </el-tree>
                    </vue-scroll>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="opDialogSure">确 认</button>
                <button class="transfer_footer_btn" @click="opdialog = false">取 消</button>
            </span>
        </el-dialog>
        <!-- 渠道弹框 -->
        <el-dialog :visible.sync="qudialog"  class="transfer_dialog dialogQu" width="50%">
            <span slot="title">
                <span>选取渠道</span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input"
                            >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </div>
            </span>
            <el-col :span="24" class="transfer_warapper">
                <el-col :span="24" class="transfer_table">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>                    
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="quDialogSure">确 认</button>
                <button class="transfer_footer_btn" @click="qudialog = false">取 消</button>
            </span>
        </el-dialog>

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
    name:'integralFactorBirth',
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
                disabled:true,
            },{
                text:'审核',
                class:'bt_cancel',
                icon:'icon-shenhe',
                disabled:true,
            },{
                text:'反审核',
                class:'bt_saveAdd',
                disabled:true,
            },{
                text:'作废',
                class:'bt_saveAdd',
                disabled:true,
            }],
            addData:{
                "integralTactic_MainTable": {
                    "id": 0,
                    "groupId": 0,
                    "tacticCode": "",
                    "tacticName": "",
                    "tacticTypeid": "2",
                    "effectiveStart": "",
                    "effectiveEnd": "",
                    "applyTypeid": "1",
                    "status": 0,
                    "remark": ""
                },
                "freq_ChildTable": [
                    {
                    "groupId": 0,
                    "tacticId": 0,
                    "perYear": false,
                    "selectYear": "",
                    "perMonth": false,
                    "selectMonth": "",
                    "perWeek": false,
                    "selectWeek": "",
                    "perBirthday": false,
                    "selectBirthDay": false,
                    "selectBirthWeek": false,
                    "selectBirthMonth": false,
                    "id": 0
                    }
                ],
                "ouapply_ChildTable":[],
                "areaapply_ChildTable":[],
                "chlapply_ChildTable": []
            },
            chooseDate:'',

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
            statusAr:[],//状态
            backId:'',
            dialogRange:false,//组织弹框
            rangeTableData:[],//使用范围数据
            dialogRangeOp:false,
            ifShow:true,
            checked:false,
            radio:'',//按周期选择单选框
            ouTreeDataRight:[],//使用组织的树形组织
            expand:{
                expandId_dialogOu:[],//默认dialog组织树形展开id
            },
            ouDefaultPropsRight:{
                children: 'children',
                label: 'ouName',
                id:'id'
            },
            checkAllOu:false,//使用组织查看全选
            showCheck:false,//使用组织查看已选
            ouCheckAll:'',
            opTreeDataRight:[],//业务地区的树形组织
            expandop:{
                expandId_dialogOp:[],//默认dialog业务地区树形展开id
            },
            opDefaultPropsRight:{
                children: 'childItems',
                label: 'name',
                id:'id'
            },
            opCheckAll:'',
            checkAllOp:false,//业务地区查看全选
            showCheckOp:false,//业务地区查看已选
            index:'',//当前选中行
            dialogRangeQu:false,//渠道弹框
            checkAllQu:false,//使用组织查看全选
            showCheckQu:false,//使用组织查看已选
            quCheckAll:'',
            ouSearch:'',//组织树形搜索
            opSearch:'',//业务地区树形搜索
            //渠道的选取表格
            column: [{
                prop: 'ouName',
                label: '组织',
                controls:'text',
                flag:false,//更改标识
                isDisable:true,
                }, {
                prop: 'opAreaFullName',
                label: '业务地区',
                controls:'text',
                isDisable:true,
                }, {
                prop: 'shopName',
                label: '渠道',
                controls:'text',
                isDisable:true,
                },],
            tableModel:'qudaoDialogList',
            httpUrl:{
                query:'/api/services/app/ShopManagement/GetAll',//条件查询
            },
            queryParams:{
                OuId:this.$store.state.ouId,
                OpAreaId:'',//业务地区
                ShopName:'',
                SkipCount:(this.$store.state.qudaoDialogListCurrentPage-1)*this.$store.state.qudaoDialogListEachPage,
                MaxResultCount:this.$store.state.qudaoDialogListEachPage
            }, 
            pluginSetting:{
                hasPagination:true,
                mutiSelect:true,//多选栏
                isDisable:true,
            },
            command:[],
            ouIds:[],
            memberLevel:[],//会员等级数据
            nowOuid:'',
            nowOuName:'',
            opIds:[],
            range:'1',
            oudialog:false,
            opdialog:false,
            qudialog:false

        }
    },
    validators: {
        'addData.integralTactic_MainTable.tacticCode': function (value) {//编码
            return this.Validator.value(value).required();
        },
        'addData.integralTactic_MainTable.tacticName': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'chooseDate': function (value) {//生效时间
            return this.Validator.value(value).required();      
        },
    },    
    created(){
        this.loadStatus();
        this.loadOuTreeAll();
    },
    watch:{
        ouSearch(val){
            this.$refs.fptree.filter(val)
        },
        opSearch(val){
            this.$refs.optree.filter(val)
        },
    },
    methods:{
        loadStatus(){
            let _this=this;
            //获取状态枚举
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OrderStatus'}).then(function(res){
                console.log(res);
                _this.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //获取会员等级
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                console.log(res.result);
                _this.memberLevel=res.result;

            },function(res){
                console.log('err'+res)
            });

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
            }else if(btn=="复制活动"){
            }else if(btn=="审核"){
            }else if(btn=="反审核"){
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
            this.$store.state.url='/integralFactor/integralFactorList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由    
        },
        save(saveType){
            let _this=this;
            $('.tipsWrapper').css({display:'block'});
            _this.$validate().then(function(success){
                $('.tipsWrapper').css({display:'none'});
                console.log(_this.rangeTableData);
                if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
                    $.each(_this.rangeTableData,function(i,val){
                        let ou={
                            "groupId": 0,
                            "tacticId": 0,
                            "ouId": 0,
                            "ouId_OuName": "string",
                            "multiple_ChildTable": [],
                            "id": 0
                        }
                        _this.addData.ouapply_ChildTable.push(ou);
                        _this.addData.ouapply_ChildTable[i].ouId = val.id;
                        _this.addData.ouapply_ChildTable[i].ouId_OuName = val.ouName;
                        _this.addData.ouapply_ChildTable[i].multiple_ChildTable = val.multiple_ChildTable;
                    })
                }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
                    $.each(_this.rangeTableData,function(i,val){

                        let op={
                            "groupId": 0,
                            "tacticId": 0,
                            "ouId": 0,
                            "opAreaId": 0,
                            "ouId_OuName": "string",
                            "opAreaId_AreaName": "string",
                            "multiple_ChildTable": [],
                            "id": 0
                        }
                        _this.addData.areaapply_ChildTable.push(op);
                        _this.addData.areaapply_ChildTable[i].ouId = val.ouId;
                        _this.addData.areaapply_ChildTable[i].opAreaId = val.opAreaId;
                        _this.addData.areaapply_ChildTable[i].ouId_OuName = val.ouId_OuName;
                        _this.addData.areaapply_ChildTable[i].opAreaId_AreaName = val.opAreaId_AreaName;
                        _this.addData.areaapply_ChildTable[i].multiple_ChildTable = val.multiple_ChildTable;
                        
                    })

                     _this.addData.chlapply_ChildTable=[];
                }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
                    $.each(_this.rangeTableData,function(i,val){
                        let qu=    {
                                "groupId": 0,
                                "tacticId": 0,
                                "ouId": 0,
                                "opAreaId": 0,
                                "channelTypeId": 0,
                                "channelId": 0,
                                "ouId_OuName": "string",
                                "opAreaId_AreaName": "string",
                                "channelId_ShopName": "string",
                                "multiple_ChildTable": [],
                                "id": 0
                            }
                        _this.addData.chlapply_ChildTable.push(qu);
                        _this.addData.chlapply_ChildTable[i].ouId = val.ouId;
                        _this.addData.chlapply_ChildTable[i].opAreaId = val.opAreaId;
                        _this.addData.chlapply_ChildTable[i].ouId_OuName = val.ouName;
                        _this.addData.chlapply_ChildTable[i].opAreaId_AreaName = val.opAreaId_AreaName;
                        _this.addData.chlapply_ChildTable[i].multiple_ChildTable = val.multiple_ChildTable;
                        _this.addData.chlapply_ChildTable[i].channelTypeId = val.shopTypeid;
                        _this.addData.chlapply_ChildTable[i].channelId = val.id;
                        _this.addData.chlapply_ChildTable[i].channelId_ShopName = val.channelId_ShopName;
                    })


                }

                if(success){
                    if(_this.radio=="1"){
                        _this.addData.freq_ChildTable[0].perYear =true; 
                    }else if(_this.radio=="2"){
                        _this.addData.freq_ChildTable[0].perMonth =true; 
                    }else if(_this.radio=="3"){
                        _this.addData.freq_ChildTable[0].perWeek=true; 
                    }
                    _this.addData.integralTactic_MainTable.effectiveStart=_this.chooseDate[0];
                    _this.addData.integralTactic_MainTable.effectiveEnd=_this.chooseDate[1];

                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralTacticManagement/AggregateCreateOrUpdate',_this.addData).then(function(res){
                        _this.open('创建成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            _this.backId = res.result;
                            _this.goModify(_this.backId);
                        }else if(saveType=="saveAdd"){
                            _this.addData={
                                        "integralTactic_MainTable": {
                                            "id": 0,
                                            "groupId": 0,
                                            "tacticCode": "",
                                            "tacticName": "",
                                            "tacticTypeid": "2",
                                            "effectiveStart": "",
                                            "effectiveEnd": "",
                                            "applyTypeid": "1",
                                            "status": 0,
                                            "remark": ""
                                        },
                                        "freq_ChildTable": [
                                            {
                                            "groupId": 0,
                                            "tacticId": 0,
                                            "perYear": false,
                                            "selectYear": "",
                                            "perMonth": false,
                                            "selectMonth": "",
                                            "perWeek": false,
                                            "selectWeek": "",
                                            "perBirthday": false,
                                            "selectBirthDay": false,
                                            "selectBirthWeek": false,
                                            "selectBirthMonth": false,
                                            "id": 0
                                            }
                                        ],
                                        "ouapply_ChildTable":[],
                                        "areaapply_ChildTable":[],
                                        "chlapply_ChildTable": []
                                    }

                            _this.rangeTableData=[];  
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
                    })

                }
            })
        },
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
        },
        //---判断是否有修改过的内容---------------------------
        Modify:function(){//判断主表是否修改过
            this.ifModify = true;
        },
        //----组织使用范围---------------------------------------
        changeRange(){
            this.ifModify = true;
            this.rangeTableData=[];
        },
        dialogRangeShow(){
            let _this=this;
            
            if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
                if(_this.ouIds.length!=0){
                    setTimeout(function(){
                    _this.$refs.fptree.setCheckedKeys(_this.ouIds);
                    },200)                
                }
                _this.oudialog=true;
            }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
                if(_this.opIds.length!=0){
                    setTimeout(function(){
                    _this.$refs.optree.setCheckedKeys(_this.opIds);
                    },200)
                }
                _this.opdialog=true;
            }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
                _this.qudialog=true;
            }

        },

        showQuDialog(row){//渠道弹框按钮
            let _this=this;
            //console.log(row)
            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            // console.log(row,_this.rangeTableData,_this.index)


            _this.dialogRangeQu=true;
        },
        level(member,index,row){
            //console.log(row)
            // let _this=this;
            // $.each(_this.rangeTableData,function(i,val){
            //     val.multiple_ChildTable[index].gradeId=member.id;
            //     val.multiple_ChildTable[index].gradeId_GradeName=member.gradeName;
            //     if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
            //         val.multiple_ChildTable[index].applyTypeid=1;
            //         val.multiple_ChildTable[index].applyId=row.id;
            //     }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
            //         val.multiple_ChildTable[index].applyTypeid=2;
            //         val.multiple_ChildTable[index].applyId=row.opAreaId;
            //     }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
            //         val.multiple_ChildTable[index].applyTypeid=3;
            //         val.multiple_ChildTable[index].applyId=row.id;
            //     }
            // })
            //console.log(member,index)
        },
        dialogSure(){//组织dialog点击确认
            let _this=this;
            _this.ouCheckAll=_this.$refs.fptree.getCheckedNodes();
           
            _this.rangeTableData=_this.ouCheckAll;
            console.log(_this.ouCheckAll)
            _this.ouIds=[];
            $.each(_this.ouCheckAll,function(i,val){
                _this.ouIds.push(val.id)
                Vue.set(_this.rangeTableData[i],'multiple_ChildTable',[]);
                $.each(_this.memberLevel,function(index,value){
                    let level={
                        "groupId": 0,
                        "tacticId": 0,
                        "applyTypeid": 0,
                        "applyId": 0,
                        "gradeId": 0,
                        "multiple": 0,
                        "gradeId_GradeName": "string",
                        "id": 0
                    }
                    _this.rangeTableData[i].multiple_ChildTable.push(level);
                })
                 _this.rangeTableData[i].multiple_ChildTable.length=_this.memberLevel.length;

            })
            $.each(_this.ouCheckAll,function(i,val){
                for(let i=0;i<_this.memberLevel.length;i++){
                    val.multiple_ChildTable[i].gradeId=_this.memberLevel[i].id;
                    val.multiple_ChildTable[i].gradeId_GradeName=_this.memberLevel[i].gradeName;
                    if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
                        val.multiple_ChildTable[i].applyTypeid=1;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
                        val.multiple_ChildTable[i].applyTypeid=2;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
                        val.multiple_ChildTable[i].applyTypeid=3;
                    }            
                }


            })


            _this.rangeTableData=_this.ouCheckAll;
            _this.oudialog=false;            
            //console.log(_this.rangeTableData,_this.memberLevel)
        },

        opDialogSure(){//业务地区dialog点击确认
            let _this=this;
            _this.dialogOp=false;
            _this.opCheckAll=_this.$refs.optree.getCheckedNodes();
            _this.rangeTableData=_this.opCheckAll;
            _this.opIds=[];
            for(let i=0;i<_this.opCheckAll.length;i++){
                _this.opIds.push(_this.opCheckAll[i].id);
                Vue.set(_this.rangeTableData[i],'ouName',_this.opCheckAll[i].ouId_OuName);
                Vue.set(_this.rangeTableData[i],'opAreaId',_this.opCheckAll[i].id);
                Vue.set(_this.rangeTableData[i],'opAreaId_AreaName',_this.opCheckAll[i].areaName);
                Vue.set(_this.rangeTableData[i],'multiple_ChildTable',[]);
                $.each(_this.memberLevel,function(index,value){
                    let level={
                        "groupId": 0,
                        "tacticId": 0,
                        "applyTypeid": 0,
                        "applyId": 0,
                        "gradeId": 0,
                        "multiple": 0,
                        "gradeId_GradeName": "string",
                        "id": 0
                    }
                    _this.rangeTableData[i].multiple_ChildTable.push(level)
                })
                 _this.rangeTableData[i].multiple_ChildTable.length=_this.memberLevel.length;

            }
            $.each(_this.rangeTableData,function(i,val){
                for(let i=0;i<_this.memberLevel.length;i++){
                    val.multiple_ChildTable[i].gradeId=_this.memberLevel[i].id;
                    val.multiple_ChildTable[i].gradeId_GradeName=_this.memberLevel[i].gradeName;
                    if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
                        val.multiple_ChildTable[i].applyTypeid=1;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
                        val.multiple_ChildTable[i].applyTypeid=2;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
                        val.multiple_ChildTable[i].applyTypeid=3;
                    }            
                }


            })
             _this.$refs.optree.setCheckedNodes(_this.opCheckAll);

            _this.opdialog=false;
            //console.log(_this.rangeTableData,_this.opCheckAll)      
        },
        quDialogSure(){//渠道dialog点击确认
            let _this=this;
            _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
            //console.log(_this.SelectionChange)
            _this.rangeTableData=_this.SelectionChange;
            $.each(_this.SelectionChange,function(i,val){
                Vue.set(_this.rangeTableData[i],'opAreaId_AreaName',val.opAreaFullName);
                Vue.set(_this.rangeTableData[i],'channelId_ShopName',val.shopName);
                Vue.set(_this.rangeTableData[i],'multiple_ChildTable',[]);
                $.each(_this.memberLevel,function(index,value){
                    let level={
                        "groupId": 0,
                        "tacticId": 0,
                        "applyTypeid": 0,
                        "applyId": 0,
                        "gradeId": 0,
                        "multiple": 0,
                        "gradeId_GradeName": "string",
                        "id": 0
                    }
                    _this.rangeTableData[i].multiple_ChildTable.push(level)
                })
                 _this.rangeTableData[i].multiple_ChildTable.length=_this.memberLevel.length;
            })
            $.each(_this.rangeTableData,function(i,val){
                for(let i=0;i<_this.memberLevel.length;i++){
                    val.multiple_ChildTable[i].gradeId=_this.memberLevel[i].id;
                    val.multiple_ChildTable[i].gradeId_GradeName=_this.memberLevel[i].gradeName;
                    if(_this.addData.integralTactic_MainTable.applyTypeid=="1"){
                        val.multiple_ChildTable[i].applyTypeid=1;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="2"){
                        val.multiple_ChildTable[i].applyTypeid=2;
                    }else if(_this.addData.integralTactic_MainTable.applyTypeid=="3"){
                        val.multiple_ChildTable[i].applyTypeid=3;
                    }            
                }
            })


            _this.qudialog=false;
            //console.log(_this.rangeTableData)
        },
        delCheckOu(row){//删除表格数据
            let _this=this;
            let indexs=null;
            console.log(_this.rangeTableData,row.id)
            $.each(_this.rangeTableData,function(index,val){
                if(val.id==row.id){
                    indexs=index;

                }
            })
            if(indexs!=null){
                _this.rangeTableData.splice(indexs,1);
            }
        }, 
        loadOuTreeAll(){
            let _this=this;
            //组织
            _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType')
            .then(function(res){
                console.log(res)
                _this.ouTreeDataRight=res.result;
                _this.expand.expandId_dialogOu=_this.defauleExpandTree(res.result,'id')
            },function(res){
            })
            //业务地区
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
                console.log(res);
                _this.opTreeDataRight = res;
                _this.expandop.expandId_dialogOp=_this.defauleExpandTree(res,'id')
                console.log(_this.defauleExpandTree(res,'id'))
            },function(res){
                console.log('err'+res)
            })



        },
        getAllOulength(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{SkipCount:0,MaxResultCount:100})
            .then(function(res){
                _this.allOuLength=res.result.totalCount
                //console.log(res)
            })
        },
        getAllOplength(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetAll',{SkipCount:0,MaxResultCount:100})
            .then(function(res){
                _this.allOpLength=res.result.totalCount
                console.log(res)
            })
        },



        //使用组织弹框树形
        renderContent_ouTreeDataRight(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }
        },  
        //业务地区弹框树形
        renderContent_opTreeDataRight(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.name}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.name}
                        </span>
                    );
                }
        },  

            
        filterNode(value, data) {
            // console.log(data)
            if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
        },
        opfilterNode(value, data) {
            // console.log(data)
            if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
        },

        ouNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            console.log(data)
            _this.addOu=data.id;
        },
        opNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            console.log(data)
            _this.addOu=data.id;
        },

        isCheckAllOu(){//是否全选
            let _this=this;
            if(_this.$refs.fptree.getCheckedNodes().length==_this.allOuLength){
                _this.checkAllOu=true
            }else{
                _this.checkAllOu=false
            }
        },
        isCheckAllOp(){//是否全选
            let _this=this;
            // if(_this.$refs.optree.getCheckedNodes().length==_this.allOpLength){
            //     _this.checkAllOp=true
            // }else{
            //     _this.checkAllOp=false
            // }
        },

        CheckAllTree(){//组织全选
            let _this=this;
            let topNode=[];
            if(_this.checkAllOu){
                _this.$refs.fptree.setCheckedNodes(_this.ouTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                _this.$refs.fptree.setCheckedNodes([])
                setTimeout(function(){
                    if(_this.showCheck){
                        $('.el-checkbox__input').each(function(){
                            if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
                                $(this).parents('.el-tree-node__content').css('display','none')
                            }
                        })
                    }
                },100)
            }
            
        },
        CheckAllTreeOp(){//业务地区全选
            let _this=this;
            if(_this.checkAllOp){
                console.log(_this.checkAllOp)
                _this.$refs.optree.setCheckedNodes(_this.opTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                console.log(_this.checkAllOp)
                _this.$refs.optree.setCheckedNodes([])
                setTimeout(function(){
                    if(_this.showCheck){
                        $('.el-checkbox__input').each(function(){
                            if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
                                $(this).parents('.el-tree-node__content').css('display','none')
                            }
                        })
                    }
                },100)
            }
            
        },
        CheckAllTreeQu(){

        },
        
        showCheckTree(){//组织查看已选
            let _this=this;
            if(_this.showCheck){
                $('.el-checkbox__input').each(function(){
                    if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
                        $(this).parents('.el-tree-node__content').css('display','none')
                    }
                })
            }else{
                $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }
            
        },
        showCheckTreeOp(){//业务地区查看已选
            let _this=this;
            if(_this.showCheckOp){
                $('.el-checkbox__input').each(function(){
                    if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
                        $(this).parents('.el-tree-node__content').css('display','none')
                    }
                })
            }else{
                $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }
            
        },
        showCheckTreeQu(){//渠道查看已选

        },
        //---树通用----------------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null 
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },




        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            this.$store.state.url='/integralFactor/integralMemberModify/'+id;
            this.$router.push({path:this.$store.state.url})//点击切换路由
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
.integral-birth .erp_bt{
    height:24px;
}
.integral-birth .erp_bt .btDetail{
    line-height:24px;
}
.integral-birth .erp_bt .btImg img{
    top:-4px;
}
.integral-birth .erp_bt{
    padding:0 6px;
    margin-top:8px;
}
.integral-birth .erp_bt .btDetail{
    padding-left:10px;
}
.integral-birth .gray{
    float: left;
    display:block;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    color: #cccccc;
    margin-left: 10px;
}
.integral-birth .sizeNameBtn{
    display: block;
    width: 59px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    background-color: #e4e4e4;
    position: relative;
    border-radius: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.integral-birth .sizeNameWrapper{
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
    width: 59px;
    height: 22px;
    margin-right: 10px;
    float: left;
    position: relative;
    cursor: pointer;
}
.integral-birth .sizeNameWrapper:hover .delSize{
    display: block;
}
.integral-birth .sizeNameWrapper .delSize{
    display: none;
    width: 12px;
    height: 12px;
    position: absolute;
    top: -3px;
    right: -3px;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    line-height: 12px;
    cursor: pointer;
    border-radius: 50%;
    color: #fff;
    background-color: #f55e6e;
    z-index: 2;
}
.integral-birth .long{
    width: 600px;
}
.integral-birth .short{
    width: 400px;
}
.integral-birth .nopadding{
    padding: 0;
    margin: 0;
}
.integral-birth .nopadding .gray{
    padding: 0;
    margin: 0;
}
.integral-birth .input{
    width: 120px;
    float: left;
    height: 35px;
    line-height: 35px;
}
.integral-birth .input .el-input__inner{
    height: 35px;
    line-height: 35px;
    border: 1px solid rgb(194, 202, 216);
}
.integral-birth .week-table .el-radio__label{
    display: block;
}
.integral-birth .week-table{
    border-collapse: collapse;
    margin-left: 94px;
    width:calc(100% - 94px);
}
.integral-birth .week-table td{
    border:1px solid rgb(194, 202, 216);
    padding: 4px 6px;
}
.integral-birth .bg-gray{
    background-color: #ececec;
}
</style>

<style>
.integral-birth .week-table .el-radio__label{
    display: inline-block;
}
.integral-birth .input .el-input__inner{
    height: 35px;
    line-height: 35px;
}
.integral-birth .smallRangeDate .el-input__inner{
    height: 35px;
}
.integral-birth .el-radio-button, .el-radio-button__inner{
    margin-right:6px;
    border-radius:4px;  
}
.integral-birth .el-radio-button__inner{
    border:1px solid #dcdfe6;
}
.integral-birth .el-radio-button:first-child .el-radio-button__inner{
    border-radius:4px;
}
.integral-birth .el-radio-button:last-child .el-radio-button__inner{
    border-radius:4px;
}
.integral-birth .smallRangeDate .el-range-separator{
    height: 35px;
}
.integral-birth .bg-white{
    background-color: white;
}
.integral-birth .bb1{
    border-bottom: 1px solid #cccccc;
}
.integral-birth .bt1{
    border-top:1px solid #ccc;
}
.integral-birth .none{
    display: none;
}
.integral-birth .block{
    display: inline-block;
}
.integral-birth .bgradio{
    width: calc(100% - 84px);
}
.integral-birth .bgradio .el-input{
    display: inline-block;
    width: 80px;
    float: none;
}

.integral-birth .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.integral-birth .bgradio .el-input__inner{
    height: 35px;
}

.integral-birth .bgradio .el-radio__label{
    display:inline-block;
}
.integral-birth .bgradio .el-input .el-input__inner{
    height: 32px;
}
.integral-birth .bgradio .el-radio{
    width:auto;
}
.integral-birth  .border-green{
    border-bottom:2px solid rgb(51, 204, 204);
    float:left;
    height:34px;
    line-height:34px;
    margin-right:10px;   
    margin-left:10px;
}
.integral-birth .smallRangeDate .el-range-separator{
    line-height:35px;
}
.integral-birth .bgrow{
    margin-bottom: 0;
}
.integral-birth .dialogQu .el-dialog__body{
    height: 300px;
}
</style>