<template>
    <div class="reco-detail">
        <el-row class="bb1 pb5 bg-white fixed">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('createParams.activityNo')?'block':'none'">
                                活动编码{{ validation.firstError('createParams.activityNo') }},
                        </span>
                        <span :class="validation.hasError('createParams.activityName')?'block':'none'">
                                活动名称{{ validation.firstError('createParams.activityName')}},
                        </span>                            
                        <span :class="validation.hasError('chooseDate')?'block':'none'">
                                生效时间{{ validation.firstError('chooseDate')}},
                        </span>   
                        <span :class="validation.hasError('checkSendType')?'block':'none'">
                                赠送规则{{ validation.firstError('checkSendType')}},
                        </span>   
                        <span :class="validation.hasError('checkIfSend')?'block':'none'">
                                赠送方式{{ validation.firstError('checkIfSend')}},
                        </span>
                    </p>
                </div>
            </div>
            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor long">
                        <label>活动类型</label>
                        <el-input placeholder="" v-model="proType" disabled></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor long">
                        <label><small>*</small>活动编码</label>
                        <el-input placeholder="" v-model="createParams.activityNo" :class="{redBorder : validation.hasError('createParams.activityNo')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor long">
                        <label><small>*</small>活动名称</label>
                        <el-input placeholder="" v-model="createParams.activityName" :class="{redBorder : validation.hasError('createParams.activityName')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>生效时间</label>
                        <el-date-picker v-model="chooseDate" :class="{redBorder : validation.hasError('chooseDate')}"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="createParams.status"
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
                        <el-input placeholder="" v-model="createParams.remark"></el-input>
                    </div>
                </el-row>



                <el-row class="bt1">
                    <div class="bgcolor bgradio">
                        <label><small>*</small>赠送规则</label>
                        <el-radio v-model="isSendSuccess" label="1">推荐注册</el-radio>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-radio v-model="isSendSuccess" label="2">推荐消费</el-radio>
                    </div>
                </el-row>

                <!-- <el-row>
                    <div class="bgcolor input-per">
                        <label>&nbsp;</label>
                        <el-input placeholder="" v-model="blankText" type="number" disabled v-if='isSendSuccess==1' min="0"></el-input>
                        <el-input placeholder="" v-model="infoPerfectRatio" type="number" v-if='isSendSuccess==2' min="0" max="100"></el-input>
                        <el-input placeholder="" v-model="createParams.crmActRegrule.infoPerfectRatio" type="number" v-show='false'></el-input>
                        <span>%</span>
                    </div>
                </el-row>

                <el-row class="tips">
                    <span>温馨提示：注册信息完成率是指用户在注册信息时完成注册信息的百分比</span>
                </el-row> -->

                <el-row class="bt1 pt10">
                    <div class="bgcolor bgradio">
                        <label><small>*</small>赠送方式</label>
                        <el-checkbox v-model="sendChecked">送积分</el-checkbox>
                        <el-input placeholder="请输入赠送的积分值" v-model="createParams.crmActRegrule.presentIntegral" min="0" type="number" v-show="sendChecked"></el-input>
                        <el-input placeholder="" v-model="blankText" v-show="!sendChecked" disabled></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label>&nbsp;</label>
                        <el-checkbox v-model="sendChecked1">送储值</el-checkbox>
                        <el-input placeholder="请输入赠送的储值金额" v-model="createParams.crmActRegrule.presentAmount" min="0" type="number" v-show="sendChecked1"></el-input>
                        <el-input placeholder="" v-model="blankText" disabled v-show="!sendChecked1"></el-input>有效天数
                        <el-input placeholder="" v-model="addData.crmCoupon.remark" type="number" min="0" v-show="sendChecked1"></el-input>
                        <el-input placeholder="" v-model="blankText" disabled v-show="!sendChecked1"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label>&nbsp;</label>
                        <el-checkbox v-model="createParams.crmActRegrule.presentGiftcard">送卡券</el-checkbox>
                        <span class="h35">若添加卡券从这里</span>
                        <span class="h35 open-dialog" @click="addNewCard" v-show="createParams.crmActRegrule.presentGiftcard">新增卡券</span>
                        <span class="h35" v-show="!createParams.crmActRegrule.presentGiftcard">新增卡券</span>
                    </div>
                </el-row>

                <el-row v-show="sendCardAr.length>0">
                    <div class="show-section">
                        <div class="card-section">
                            <span v-for='(item,index) in sendCardAr' class="mb10">{{item.cardname}}&nbsp;&nbsp;{{item.cardnumber}}张
                                <i @click="cancelCard(index)" class="el-icon-error"></i>
                            </span>
                        </div>
                        
                    </div>
                </el-row>

                <el-row class="mt10">
                    <el-col :span="24" class="bt1 pt5 bg-white">
                        <span class="border-green">使用范围</span>
                        <button class="erp_bt bt_add"  @click="dialogRangeShow">
                            <div class="btImg">
                                <img src="../../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail">选取</span>
                        </button>
                    </el-col>
                    <el-col :span="24" v-show="ifShow" class="bg-white pr10 pl10">
                        <el-table :data="rangeTableData" border style="width: 100%" stripe>
                            <el-table-column label="范围" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.ouName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="业务地区">
                                <template slot-scope="scope">
                                    <span v-for="(i,index) in scope.row.areaName" :key="index" class="sizeNameWrapper">
                                        <span>{{i.opAreaId_AreaName}}</span>
                                    </span>
                                    <button class="showGoodsDialog" @click="showOpDialog(scope.row)">···</button>                            
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺" class="relative">
                                <template slot-scope="scope">
                                    <span v-for="(i,index) in scope.row.qudaoNames" :key="index" class="sizeNameWrapper">
                                        <span class="delSize" @click="delSize(index,scope.row)">×</span>
                                        <span class="sizeNameBtn">{{i.channelId_ShopName}}</span>
                                    </span>
                                    <button class="showGoodsDialog" @click="showQuDialog(scope.row)">···</button>                            
                                </template>
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
        <!-- 新增卡券弹窗 -->
        <el-dialog :visible.sync='dialogAdd' class="transfer_dialog dialogOu" width="20%">
            <span slot="title">
                <span>新增卡券</span>
            </span>

            <el-row class="text-wrapper">
                <el-col :span="24" class="add-common">
                    <label>卡券类型</label>
                    <el-select clearable  
                                placeholder=""
                                v-model="cardTypeId">
                        <el-option v-for="item in cardTypeAr" 
                                    :key="item.id" 
                                    :label="item.couponName" 
                                    :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="add-text">没有想要的卡券类型么？从这里</span>
                    <span class="add-text1">新增</span>
                </el-col>

                <el-col :span="24" class="add-common add-num-section mt10">
                    <label>送券数</label>
                    <el-input placeholder="" v-model="cardNum"></el-input>
                    <span>张</span>
                </el-col>

                <el-col :span="24" class="add-footer">
                    <span class="footer-sure" @click="addCard">确定</span>
                    <span class="footer-cancel" @click="addCancel">取消</span>
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 使用组织弹框 -->
        <el-dialog :visible.sync="dialogRange"  class="transfer_dialog dialogOu" width="30%">
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
                <button class="transfer_footer_btn" @click="dialogRange = false">取 消</button>
            </span>
        </el-dialog>

        <!-- 业务地区弹框 -->
        <el-dialog :visible.sync="dialogRangeOp"  class="transfer_dialog dialogOu" width="30%">
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
                <button class="transfer_footer_btn" @click="dialogRangeOp = false">取 消</button>
            </span>
        </el-dialog>
        <!-- 渠道弹框 -->
        <el-dialog :visible.sync="dialogRangeQu"  class="transfer_dialog dialogOu" width="40%">
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
                <el-col :span="24" class="checkBoxOuUser">
                    <el-checkbox @change="CheckAllTreeQu" v-model="checkAllQu" class="square_el"></el-checkbox><span>全选</span>
                    <el-checkbox @change="showCheckTreeQu" v-model="showCheckQu" class="square_el"></el-checkbox><span>查看已选</span>
                </el-col>
                <el-col :span="24" class="transfer_table">
                    <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>                    
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="quDialogSure">确 认</button>
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
export default {
    data(){
        return{
            proType:'推荐有礼',
            ifModify:false,
            sendChecked:true,
            sendChecked1:true,
            defaultGroupId:'',
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
            //---------------------------
            createParams:{
                "crmActFreq":null,
                //  {
                //     "groupId": '',
                //     "activityId": 0,
                //     "perYear": true,
                //     "selectYear": "",
                //     "perMonth": true,
                //     "selectMonth": "",
                //     "perWeek": true,
                //     "selectWeek": "",
                //     "perBirthday": true,
                //     "selectBirthDay": "string",
                //     "selectBirthWeek": "string",
                //     "selectBirthMonth": "string",
                //     "id": 0
                // },
                "crmActGradeapplys": [
                    // {
                    // "groupId": '',
                    // "activityId": '',
                    // "memberGradeId": '',
                    // "id": 0
                    // }
                ],
                "crmActRegrule": {
                    "groupId": '',
                    "activityId": 0,
                    "regComplete": true,
                    "infoPerfectRatio": '0',
                    "presentAmount": '',
                    "presentIntegral": '',
                    "presentGiftcard": true,
                    "crmActGiftCards": [
                        // {
                        //     "groupId": '',
                        //     "activityTypeid": '',
                        //     "activityId": '',
                        //     "activityRuleId": '',
                        //     "activityRuleDtlid": '',
                        //     "giftcardId": '',
                        //     "qty": '',
                        //     "id": 0
                        // }
                    ],
                    "id": 0
                },
                "groupId": '',
                "activityTypeid": 1,
                "activityNo": "",
                "activityName": "",
                "effectiveStart": "",
                "effectiveEnd": "",
                "remark": "",
                "status": 0,
                "applyAllGrade": true,
                "applyAllOu": true,
                "applyAllArea": true,
                "applyAllchannel": true,
                "crmActOuapplys": [//使用范围(组织) ,
                    // {
                    // "groupId": '',
                    // "activityId": '',
                    // "ouId": '',
                    // "id": ''
                    // }
                ],
                "crmActAreaapplys": [// 使用范围(业务地区) 
                    // {
                    // "groupId": '',
                    // "activityId": '',
                    // "ouId": '',
                    // "opAreaId": '',
                    // "id": ''
                    // }
                ],
                "crmActChannelapplys": [//使用范围(渠道) 
                    // {
                    // "groupId": '',
                    // "activityId": '',
                    // "ouId": '',
                    // "opAreaId": '',
                    // "channelId": '',
                    // "id": ''
                    // }
                ],
                "createdBy": this.$store.state.name,
                "createdTime": "",
                "modifiedBy": this.$store.state.name,
                "modifiedTime": "",
                "isDeleted": false,
                "deletedBy": this.$store.state.name,
                "deletedTime": "",
                "id": 0
            },
            //-----------------------------
            cardTypeId:'',//卡券类型
            cardNum:'',//赠送卡券数量
            sendCardAr:[],//显示在灰框内的数组
            cardTypeAr:[],//卡券种类
            infoPerfectRatio:'0',//注册完成百分比
            blankText:'',
            ifSendType:true,
            checkSendType:'1',//验证赠送规则
            checkIfSend:'',//验证赠送方式

            //-----------------------------
            addData:{
                "crmCoupon": {
                    "id": 0,
                    "groupId": 0,
                    "couponName": "",
                    "couponTypeid": '1',
                    "denomination": '',
                    "discount": '',
                    "maximumTimes": '',
                    "expdAmount": '',
                    "expdQty": '',
                    "effectiveStart": "",
                    "effectiveEnd": "",
                    "effectiveStartdays": '',
                    "qty": '',
                    "explain": "",
                    "notice": "",
                    "remark": "",
                    "status": 0,
                    "applyAllGrade": '1',
                    "VerificationModeid":'0',
                    "applyAllOu": false,
                    "applyAllArea": false,
                    "applyAllChannel": false,
                    "applyAllSku": false
                },
                "couponOus": [],
                "couponGrades": [],
                "couponProducts": []
            },
        
            chooseDate:'',//固定时间
            memberLevels:[],//会员等级

            rangeShow:false,
            dialogAdd:false,
            dialogRange:false,
            dialogRangeOp:false,
            ifShow:true,
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
            areaNames:'',
            rangeTableData:[],//使用范围数据
            index:'',//当前选中行
            dialogRangeQu:false,//渠道弹框
            checkAllQu:false,//使用组织查看全选
            showCheckQu:false,//使用组织查看已选
            quCheckAll:'',

            //渠道弹框列表
            column: [{
                prop: 'shopWorkPropertyidTValue',
                label: '渠道类型',
                controls:'text',
                flag:false,//更改标识
                isDisable:true,
                }, {
                prop: 'shopCode',
                label: '渠道编码',
                controls:'text',
                isDisable:true,
                }, {
                prop: 'shopName',
                label: '渠道名称',
                controls:'text',
                isDisable:true,
                },],
            tableModel:'qudaoDialogList',
            httpUrl:{
                query:'/api/services/app/ShopManagement/GetAll',//条件查询
            },
            queryParams:{
                OpAreaId:'',//业务地区
                SkipCount:(this.$store.state.qudaoDialogListCurrentPage-1)*this.$store.state.qudaoDialogListEachPage,
                MaxResultCount:this.$store.state.qudaoDialogListEachPage
            }, 
            pluginSetting:{
                hasPagination:true,
                mutiSelect:true,//多选栏
                isDisable:true,
            },
            command:[],
            ouIds:[],//组织已有数据树形勾选
            opIds:[],//业务地区已有数据树形勾选
            allOuLength:'',//组织总数
            allOpLength:'',//业务地区总数
            selectData:[],
            url:'',//图片路径
            ouSearch:'',//组织树形搜索
            opSearch:'',//业务地区树形搜索
            statusAr:[],//状态枚举
            
            isSendSuccess:'1',//注册成功单选
            backId:'',
            memberLevel:'',//全部会员等级
            i:0,



        }
        
    },
    validators: {
        'createParams.activityNo': function (value) {//活动编码checkIfSend
            return this.Validator.value(value).required();
        },
        'createParams.activityName': function (value) {//活动名称
            return this.Validator.value(value).required();
        },
        'chooseDate': function (value) {//生效时间
            return this.Validator.value(value).required();
        },
        'checkSendType': function (value) {//赠送规则
            return this.Validator.value(value).required();
        },
        'checkIfSend': function (value) {//赠送方式
            return this.Validator.value(value).required();
        },

    },       
    created(){
        let self = this;
        self.getDefaultGroupId();
        self.loadMemberLevel();
        self.loadOuTreeAll();
        self.getAllOulength();
        self.getAllOplength();
        self.getCardType();
    },
    watch:{
        addData:{
            handler:function(val,oldVal){
                 this.ifModify = true;
            },
            deep:true,
        },
        
        infoPerfectRatio:{
            handler:function(){
                let self = this;
                self.createParams.crmActRegrule.infoPerfectRatio = self.infoPerfectRatio;
                if(self.infoPerfectRatio>0){
                    self.checkSendType = 1;
                }
            },
            deep:true,
        },
        isSendSuccess:{
            handler:function(){
                let self = this;
                self.createParams.crmActRegrule.infoPerfectRatio = '0';
                self.infoPerfectRatio = '0';
                if(self.isSendSuccess == '1'){
                    self.createParams.crmActRegrule.regComplete = true;
                    self.checkSendType = 1;
                }else if(self.isSendSuccess == '2'){
                    self.createParams.crmActRegrule.regComplete = false;
                    if(self.createParams.crmActRegrule.infoPerfectRatio == '0'){
                        self.checkSendType = '';
                    }else{
                        self.checkSendType = 1;
                    }
                }
                console.log(self.isSendSuccess+'-'+self.checkSendType)
            },
            deep:true,
        },
        createParams:{
            handler:function(){
                let self = this;
                if(self.createParams.crmActRegrule.presentAmount!=''||self.createParams.crmActRegrule.presentIntegral!=''||self.sendCardAr.length>0){
                    // self.ifSendType = true;
                    self.checkIfSend = 1;
                }else{
                    self.checkIfSend = '';
                }
            },
            deep:true,
        },
    },
    methods:{
        getDefaultGroupId:function(){
            let self = this;
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(12312312312)
                // console.log(res)
                self.defaultGroupId = res.result.groupId;

                self.createParams.groupId = self.defaultGroupId;
                // self.createParams.crmActFreq.groupId = self.defaultGroupId;
                
            },function(res){

            })
        },

        loadMemberLevel(){//获取会员等级
            let self=this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                console.log(res.result);
                self.memberLevel=res.result;
                $.each(res.result,function(i,val){
                    self.memberLevels.push(val.gradeName)
                });
            },function(res){
                console.log('err'+res)
            });

            //获取状态枚举
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status003'}).then(function(res){
                //console.log(res);
                self.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
        //按钮组点击事件---------------------
        btnClick(btn){
            let self = this;
            if(btn=="返回"){
                self.isback();
            }else if(btn=="新增"){
                
            }else if(btn=="删除"){

            }else if(btn=="保存"){
                self.save("save")
            }else if(btn=="保存并新增"){
                self.save("saveAdd")
            }else if(btn=="取消"){
                self.isback();
            }else if(btn=="复制卡券"){
            }else if(btn=="审核"){
            }else if(btn=="作废"){
            }
        },
        isback(){
            let self=this;
            if(self.ifModify){
                self.dialogSetting.dialogName='backDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
            }else{
                self.back();
            }
        },
        back(){
            this.$store.state.url='/regGive/regGiveList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由    
        },
        save(saveType){
            let self = this;
            console.log(self.checkSendType+'-'+'')
            $('.tipsWrapper').css({display:'block'});
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    console.log()
                    let nowDate = new Date();
                    let year = nowDate.getFullYear();
                    let month = nowDate.getMonth();
                    let day = nowDate.getDate();
                    let lastTime = '';

                    lastTime = year + '-' + month + '-'+ day;
                    console.log(lastTime)
                    self.createParams.createdTime = lastTime;
                    self.createParams.modifiedTime = lastTime;

                    self.createParams.effectiveStart = self.chooseDate[0];
                    self.createParams.effectiveEnd = self.chooseDate[1];
                    
                    // self.createParams.crmActFreq.groupId = self.defaultGroupId;
                    self.createParams.crmActRegrule.groupId = self.defaultGroupId;
                    let x = [];
                    for(let i in self.ouCheckAll){
                        x.push({
                            groupId:self.ouCheckAll[i].groupId,
                            activityId:0,
                            ouId:self.ouCheckAll[i].id,
                            id:0,
                        })
                    }
                    self.createParams.crmActOuapplys = x;

                    let y = [];
                    for(let i in self.opCheckAll){
                        y.push({
                            groupId:self.opCheckAll[i].groupId,
                            activityId:0,
                            ouId:self.opCheckAll[i].ouId,
                            opAreaId:self.opCheckAll[i].id,
                            id:0,
                        })
                    }
                    self.createParams.crmActAreaapplys = y;

                    let z = [];
                    for(let i in self.SelectionChange){
                        z.push({
                            groupId:self.SelectionChange[i].groupId,
                            activityId:0,
                            ouId:self.SelectionChange[i].ouId,
                            opAreaId:self.SelectionChange[i].opAreaId,
                            channelId:self.SelectionChange[i].id,
                            id:0,
                        })
                    }

                    console.log(self.sendCardAr)
                    for(let i in self.sendCardAr){
                        self.createParams.crmActRegrule.crmActGiftCards.push({
                            groupId:self.defaultGroupId,
                            activityTypeid:1,
                            activityId:0,
                            activityRuleId:0,
                            activityRuleDtlid:0,
                            giftcardId:self.sendCardAr[i].cardId,
                            // giftcardId:self.sendCardAr[i].
                            qty:self.sendCardAr[i].cardnumber,
                            id:0,
                        })
                    }
                    if(x){
                        self.$axios.posts('http://192.168.100.107:8092/api/services/app/ActivityManagement/CreateMemberIntroRule',self.createParams).then(function(res){
                            console.log(res)
                            self.open('创建成功','el-icon-circle-check','successERP');
                            if(saveType=="save"){
                                self.backId = res.result;
                                self.goModify(self.backId);

                            }else if(saveType=="saveAdd"){
                                self.createParams = {
                                    "crmActFreq": null,
                                    // {
                                    //     "groupId": 0,
                                    //     "activityId": 0,
                                    //     "perYear": true,
                                    //     "selectYear": "",
                                    //     "perMonth": true,
                                    //     "selectMonth": "",
                                    //     "perWeek": true,
                                    //     "selectWeek": "",
                                    //     "perBirthday": true,
                                    //     "selectBirthDay": "",
                                    //     "selectBirthWeek": "string",
                                    //     "selectBirthMonth": "string",
                                    //     "id": 0
                                    // },
                                    "crmActGradeapplys": [],
                                    "crmActRegrule": {
                                        "groupId": '',
                                        "activityId":0,
                                        "regComplete": true,
                                        "infoPerfectRatio": '0',
                                        "presentAmount": '',
                                        "presentIntegral": '',
                                        "presentGiftcard": true,
                                        "crmActGiftCards": [],
                                        "id": 0
                                    },
                                    "groupId": 0,
                                    "activityTypeid": 1,
                                    "activityNo": "",
                                    "activityName": "",
                                    "effectiveStart": "",
                                    "effectiveEnd": "",
                                    "remark": "",
                                    "status": '',
                                    "applyAllGrade": true,
                                    "applyAllOu": true,
                                    "applyAllArea": true,
                                    "applyAllchannel": true,
                                    "crmActOuapplys": [],
                                    "crmActAreaapplys": [],
                                    "crmActChannelapplys": [],
                                    "createdBy": this.$store.state.name,
                                    "createdTime": "",
                                    "modifiedBy": "",
                                    "modifiedTime": "",
                                    "isDeleted": false,
                                    "deletedBy": "",
                                    "deletedTime": "",
                                    "id": 0
                                };
                                self.cardNum = '',//赠送卡券数量
                                self.sendCardAr = [],//显示在灰框内的数组
                                self.chooseDate='';//固定时间
                                self.memberLevels=[];//会员等级
                                self.validation.reset();

                            }
                        },function(err){
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=err.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;
                        })
                    }else if(y){
                         self.$axios.posts('http://192.168.100.107:8092/api/services/app/ActivityManagement/CreateMemberIntroSaleRule',self.createParams).then(function(res){
                            console.log(res)
                            self.open('创建成功','el-icon-circle-check','successERP');
                            if(saveType=="save"){
                                self.backId = res.result;
                                self.goModify(self.backId);

                            }else if(saveType=="saveAdd"){
                                self.createParams = {
                                    "crmActFreq": null,
                                    // {
                                    //     "groupId": 0,
                                    //     "activityId": 0,
                                    //     "perYear": true,
                                    //     "selectYear": "",
                                    //     "perMonth": true,
                                    //     "selectMonth": "",
                                    //     "perWeek": true,
                                    //     "selectWeek": "",
                                    //     "perBirthday": true,
                                    //     "selectBirthDay": "",
                                    //     "selectBirthWeek": "string",
                                    //     "selectBirthMonth": "string",
                                    //     "id": 0
                                    // },
                                    "crmActGradeapplys": [],
                                    "crmActRegrule": {
                                        "groupId": '',
                                        "activityId":0,
                                        "regComplete": true,
                                        "infoPerfectRatio": '0',
                                        "presentAmount": '',
                                        "presentIntegral": '',
                                        "presentGiftcard": true,
                                        "crmActGiftCards": [],
                                        "id": 0
                                    },
                                    "groupId": 0,
                                    "activityTypeid": 1,
                                    "activityNo": "",
                                    "activityName": "",
                                    "effectiveStart": "",
                                    "effectiveEnd": "",
                                    "remark": "",
                                    "status": '',
                                    "applyAllGrade": true,
                                    "applyAllOu": true,
                                    "applyAllArea": true,
                                    "applyAllchannel": true,
                                    "crmActOuapplys": [],
                                    "crmActAreaapplys": [],
                                    "crmActChannelapplys": [],
                                    "createdBy": this.$store.state.name,
                                    "createdTime": "",
                                    "modifiedBy": "",
                                    "modifiedTime": "",
                                    "isDeleted": false,
                                    "deletedBy": "",
                                    "deletedTime": "",
                                    "id": 0
                                };
                                self.cardNum = '',//赠送卡券数量
                                self.sendCardAr = [],//显示在灰框内的数组
                                self.chooseDate='';//固定时间
                                self.memberLevels=[];//会员等级
                                self.validation.reset();

                            }
                        },function(err){
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=err.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;
                        })
                    }

                    

                }
            })
            
        },
    
        addDate:function(date, days) {
                var date = new Date(date);
                date.setDate(date.getDate() + parseInt(days));
                var month = date.getMonth() + 1;
                var day = date.getDate()-1;
                var time = date.getFullYear() + "-" + month + "-" + day;
                return time;
        },
        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            this.$store.state.url='/regGive/regGiveModify/'+id;
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        loadOuTreeAll(){
            let self=this;
            //组织
            self.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType').then(function(res){
                console.log(res)
                self.ouTreeDataRight=res.result;
                self.expand.expandId_dialogOu=self.defauleExpandTree(res.result,'id')
            },function(res){

            })
        },
        getAllOulength(){
            let self=this;
            self.$axios.gets('/api/services/app/OuManagement/GetAll',{SkipCount:0,MaxResultCount:100})
            .then(function(res){
                self.allOuLength=res.result.totalCount
                //console.log(res)
            })
        },
        getAllOplength(){
            let self=this;
            self.$axios.gets('/api/services/app/OpAreaManagement/GetAll',{SkipCount:0,MaxResultCount:100})
            .then(function(res){
                self.allOpLength=res.result.totalCount
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
            let self=this;
            console.log(data)
            self.addOu=data.id;
        },
        opNodeClickRight(data){//右侧树形节点点击
            let self=this;
            console.log(data)
            self.addOu=data.id;
        },

        isCheckAllOu(){//是否全选
            let self=this;
            if(self.$refs.fptree.getCheckedNodes().length==self.allOuLength){
                self.checkAllOu=true
            }else{
                self.checkAllOu=false
            }
        },
        isCheckAllOp(){//是否全选
            let self=this;
            // if(self.$refs.optree.getCheckedNodes().length==self.allOpLength){
            //     self.checkAllOp=true
            // }else{
            //     self.checkAllOp=false
            // }
        },

        CheckAllTree(){//组织全选
            let self=this;
            let topNode=[];
            if(self.checkAllOu){
                self.$refs.fptree.setCheckedNodes(self.ouTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                self.$refs.fptree.setCheckedNodes([])
                setTimeout(function(){
                    if(self.showCheck){
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
            let self=this;
            if(self.checkAllOp){
                console.log(self.checkAllOp)
                self.$refs.optree.setCheckedNodes(self.opTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                console.log(self.checkAllOp)
                self.$refs.optree.setCheckedNodes([])
                setTimeout(function(){
                    if(self.showCheck){
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
            let self=this;
            if(self.showCheck){
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
            let self=this;
            if(self.showCheckOp){
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
        delSize(i,row){
            let self=this;
            //console.log(i,row,self.rangeTableData);
            $.each(self.rangeTableData,function(i,val){
                if(val.id==row.id){
                    self.index=i;
                }
            })
            self.rangeTableData[self.index].qudaoNames.splice(i,1);

        },
        dialogSure(){//组织dialog点击确认
            let self=this;
            self.ouCheckAll=self.$refs.fptree.getCheckedNodes();
            console.log(self.ouCheckAll)
            if(self.rangeTableData.length==0){
                 self.rangeTableData=self.ouCheckAll;
                $.each(self.ouCheckAll,function(i,val){
                    Vue.set(self.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                    Vue.set(self.rangeTableData[i],'qudaoNames','');
                    Vue.set(self.ouCheckAll[i],'opAreaId','');
                    Vue.set(self.ouCheckAll[i],'index',i);
                    self.ouIds.push(val.id);
                })
                self.rangeTableData = self.ouCheckAll;

            }else{
                $.each(self.ouCheckAll,function(i,val){
                    Vue.set(self.ouCheckAll[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                    Vue.set(self.ouCheckAll[i],'opAreaId','');
                    Vue.set(self.ouCheckAll[i],'qudaoNames','');
                    Vue.set(self.ouCheckAll[i],'index',i);
                    $.each(self.rangeTableData,function(index,value){
                        if(value.ouName==val.ouName){
                            val.areaName=value.areaName;
                            val.qudaoNames=value.qudaoNames;
                            val.id1=value.id1;
                        }
                    })
                     self.ouIds.push(val.id)

                })
                self.rangeTableData=self.ouCheckAll;  
      

            }

            self.dialogRange=false;
            

        },
        opDialogSure(){//业务地区dialog点击确认
            let self=this;
            self.dialogOp=false;
            self.opCheckAll=self.$refs.optree.getCheckedNodes();
            self.areaNames=[];
            for(let i=0;i<self.opCheckAll.length;i++){
                let areaName={
                        "groupId": 0,
                        "couponId": 0,
                        "ouId": '',
                        "opAreaId": '',
                        "opAreaId_AreaName": "",
                        "id": 0
                    }
                self.areaNames.push(areaName)
                self.areaNames[i].opAreaId_AreaName=self.opCheckAll[i].name;
                self.areaNames[i].opAreaId=self.opCheckAll[i].id;
                self.areaNames[i].ouId=self.opCheckAll[0].ouId;
            }
             self.rangeTableData[self.index].areaName=self.areaNames;
             self.$refs.optree.setCheckedNodes(self.opCheckAll);

            // self.rangeTableData[self.index].opAreaId=self.opCheckAll[0].id;
            self.dialogRangeOp=false;
            console.log(self.opCheckAll,self.areaNames)
            

        },
        quDialogSure(){//渠道dialog点击确认
            let self=this;
            self.SelectionChange= self.$store.state[self.tableModel+'Selection'];
            console.log(self.SelectionChange)
            self.selectData=[];
            $.each(self.SelectionChange,function(i,val){
                let ss={
                        "id": 0,
                        "groupId": 0,
                        "couponId": 0,
                        "ouId": 0,
                        "opAreaId": 0,
                        "channelTypeid": 0,
                        "channelId_ShopName": "",
                        "channelTypeidTValue": "",
                        "channelId": 0                
                        }
                self.selectData.push(ss);
                self.selectData[i].channelId_ShopName=val.shopName;
                self.selectData[i].channelTypeidTValue=val.shopName;
                self.selectData[i].channelId=val.id;
                self.selectData[i].channelTypeid=val.shopTypeid;
                self.selectData[i].opAreaId=val.opAreaId
                self.selectData[i].ouId=val.ouId
            })
            
            self.rangeTableData[self.index].qudaoNames=self.selectData;
            self.dialogRangeQu=false;
            console.log(self.selectData,self.rangeTableData)
        },

        dialogRangeShow(){
            let self=this;
            self.dialogRange=true;
            setTimeout(function(){
               self.$refs.fptree.setCheckedKeys(self.ouIds);
               self.isCheckAllOu()
            },200)

        },

        showOpDialog(row){//业务地区弹框按钮
            let self=this;
            console.log(row)
            self.opTreeDataRight=[];
            self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{ouId:row.id}).then(function(res){
                console.log(res)
                self.opTreeDataRight = res.result;
                if(res.result==null){
                    self.dialogRangeOp=true;
                }else{
                    self.expandop.expandId_dialogOp=self.defauleExpandTree(res.result,'id');
                    self.dialogRangeOp=true;
                }
            },function(res){
                console.log('err'+res)
            })

            $.each(self.rangeTableData,function(i,val){
                if(val.id==row.id){
                    self.index=i;
                }
            })
            console.log(self.rangeTableData,self.rangeTableData[self.index])
            $.each(self.rangeTableData[self.index].areaName,function(j,jal){
                self.opIds.push(jal.opAreaId)
            })

            console.log(self.opIds)
            setTimeout(function(){
               self.$refs.optree.setCheckedKeys(self.opIds);
            },200)

            console.log(self.rangeTableData)


            
        },
        showQuDialog(row){//渠道弹框按钮
            let self=this;
            console.log(row)
            $.each(self.rangeTableData,function(i,val){
                if(val.id==row.id){
                    self.index=i;
                }
            })
            // console.log(row,self.rangeTableData,self.index)


            self.dialogRangeQu=true;
        },

        delCheckOu(row){//删除表格数据
            let self=this;
            let indexs=null;
            console.log(self.rangeTableData,row.id)
            $.each(self.rangeTableData,function(index,val){
                if(val.id==row.id){
                    indexs=index;

                }
            })
            if(indexs!=null){
                self.rangeTableData.splice(indexs,1);
            }
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
        addCard:function(){//确认添加卡券
            let self = this;
            self.dialogAdd = false;
            let cardname = '';
            let cardnumber = self.cardNum;
            let cardId = '';
            console.log(self.cardTypeAr)
            for(let i in self.cardTypeAr){
                if(self.cardTypeId == self.cardTypeAr[i].id){
                    cardname = self.cardTypeAr[i].couponName;
                    cardId = self.cardTypeAr[i].id;
                }
            }
            self.sendCardAr.push({cardname,cardnumber,cardId});
            console.log(self.sendCardAr)
        },
        cancelCard:function(index){
            let self = this;
            self.sendCardAr.splice(index,1);
        },
        addCancel:function(){
            let self = this;
            self.dialogAdd = false;
        },
        addNewCard:function(){
            let self = this;
            self.dialogAdd = true;
            console.log(self.dialogAdd)
        },
        getCardType:function(){
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/CouponManagement/Get_Coupon_library').then(function(res){
                console.log(res)
                self.cardTypeAr = res.result;
            })
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
.reco-detail .bgradio{
    width: calc(100% - 84px);
}
.reco-detail .bgradio .el-input{
    display: inline-block;
    width: 157px;
    height: 35px;
    float: none;
}

.reco-detail .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.reco-detail .bgradio .el-input__inner{
    height: 35px;
}
.reco-detail .gray{
    font-size: 12px;
    color: #cccccc;
    display: inline-block;
    height: 35px;
    line-height: 35px;
}
.reco-detail .same-row{
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
.reco-detail .showGoodsDialog{
    position: absolute;
    right: 20px;
}
.reco-detail .sizeNameBtn{
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
.reco-detail .sizeNameWrapper{
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
.reco-detail .sizeNameWrapper:hover .delSize{
    display: block;
}
.reco-detail .sizeNameWrapper .delSize{
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
.reco-detail .relative{
    position: relative;
}
</style>

<style>
.reco-detail .bgradio .el-radio__label{
    display:inline-block;
}
.reco-detail .bgradio .el-input .el-input__inner{
    height: 35px;
}
.reco-detail .bgradio .el-radio{
    width:auto;
}
.reco-detail .bgcolor .el-date-editor input{
    padding:0px;
}
.reco-detail .long{
    width: 445px;
}
.reco-detail .input-per .el-input{
    width:calc(100% - 154px)
}
.reco-detail .tips{
    padding-left:94px;
    font-size:12px;
    color:#999DA6;
}
.reco-detail .input-per span{
    font-size:24px;
    color:#333333;
} 
.show-section{
    width: 100%;
    /* margin-right: 100px; */
}
.card-section{
    width:calc(100% - 200px);
    padding: 15px;
    border:1px solid #cccccc;
    margin-left: 95px;
}
.card-section span{
    display: inline-block;
    width: 132px;
    height: 35px;
    background:#e4e4e4;
    border-radius: 2px;
    position: relative;
    font-size: 12px;
    text-align: center;
    line-height: 35px;
    margin-right: 30px;
}
.card-section i{
    position: absolute;
    right: -4px;
    top: -4px;
    color: #f66;
    cursor: pointer;
}
.h35{
    display: inline-block;
    height: 35px;
    line-height:35px;
}
.open-dialog{
    cursor: pointer;
    color:#33CCCC;
}
.add-text{
    font-size:12px;
    display: inline-block;
    color:#999DA6;
    margin-left:20%;
}
.add-text1{
    font-size:12px;
    display: inline-block;
    color:#33CCCC;
    cursor: pointer;
}
.add-num-section .el-input{
    width:106px;
}
.add-common label{
    width:20%;
    display: inline-block;
    text-align:right;
}
.add-footer{
    text-align:center;
    margin-top:30px;
    margin-bottom:30px;
}
.add-footer .footer-sure{
    display: inline-block;
    width:93px;
    height:30px;
    line-height:30px;
    background:#33CCCC;
    color:white;
    border-radius:3px;
    cursor: pointer;
}
.add-footer .footer-cancel{
    display: inline-block;
    width:93px;
    height:30px;
    line-height:30px;
    background-color:rgba(242, 242, 242, 1);
    border-radius:3px;
    cursor: pointer;
}
</style>


