<template>
    <div class="upgrade-give">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('createParams.activityNo')?'block':'none'">
                                编码{{ validation.firstError('createParams.activityNo') }},
                        </span>
                        <span :class="validation.hasError('createParams.activityName')?'block':'none'">
                                名称{{ validation.firstError('createParams.activityName') }},
                        </span>
                        <span :class="validation.hasError('chooseDate')?'block':'none'">
                                生效时间{{ validation.firstError('chooseDate')}},
                        </span>           
                    </p>
                </div>
            </div>
            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor bglong">
                        <label>活动类型</label>
                        <el-input placeholder="" v-model="actType" disabled></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bglong">
                        <label><small>*</small>活动编码</label>
                        <el-input placeholder="" v-model="allData.activityNo" :class="{redBorder : validation.hasError('addData.integralTactic_MainTable.tacticCode')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bglong">
                        <label><small>*</small>活动名称</label>
                        <el-input placeholder="" v-model="allData.activityName" :class="{redBorder : validation.hasError('addData.integralTactic_MainTable.tacticName')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor nopadding short">
                    <label><small>*</small>生效时间</label>
     
                    <el-col class="rangeDate smallRangeDate" :span="15">                        
                        <el-date-picker  v-model="chooseDate" :class="{redBorder : validation.hasError('chooseDate')}"
                        type="daterange"
                        range-separator="至">
                        </el-date-picker>
                    </el-col> 
                    </div>
                </el-row>



                <el-row>
                    <div class="bgcolor nopadding">
                        <label></label>
                        <el-checkbox v-model="checkeByCircle">按周期重复</el-checkbox>
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
                            <td class="bg-gray"><el-radio v-model="radio" label="1" :disabled="!checkeByCircle">每年</el-radio></td>
                            
                            <td>
                                <el-input placeholder="请输入月日" class="input" v-model="allData.crmActFreq.selectYear" :disabled="radio!='1'"></el-input>
                                <span class="gray">勾选每年则以当前年份为计算周期，不同日期以逗号隔开，例如“ 8-3,10-4,12-5 ”，表示8月3日，10月4日，12月5日</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="2" :disabled="!checkeByCircle">每月</el-radio></td>
                            <td>
                                <el-input placeholder="请输入日" class="input" v-model="allData.crmActFreq.selectMonth" :disabled="radio!='2'"></el-input>
                                <span class="gray">勾选每月则以当前月份为计算周期，不同日期以逗号隔开，例如“ 3,4,5 ”，表示每月3日，4日，5日</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="3" :disabled="!checkeByCircle">每周</el-radio></td>
                            <td>
                                <el-radio-group v-model="allData.crmActFreq.selectWeek" :disabled="radio!='3'">
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
                        <tr>
                            <td class="bg-gray"><el-radio v-model="radio" label="4" :disabled="!checkeByCircle">生日</el-radio></td>
                            <td>
                                <el-radio v-model="birthText" label="1" :disabled="radio!='4'">生日当天</el-radio>
                                <el-radio v-model="birthText" label="2" :disabled="radio!='4'">生日当周</el-radio>
                                <el-radio v-model="birthText" label="3" :disabled="radio!='4'">生日当月</el-radio>
                            </td>
                        </tr>
                    </table>
                </el-row>
                <el-row class="mt20">
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="allData.status"
                                    placeholder="" 
                                    disabled>
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
                        <el-input placeholder="" v-model="allData.remark"></el-input>
                    </div>
                </el-row>

                <el-row class="bt1">
                    <div class="bgcolor bgradio">
                        <label><small>*</small>会员等级范围</label>
                        <el-radio v-model="levelRadio" label="1">全部会员等级</el-radio>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label>&nbsp;</label>
                        <el-radio v-model="levelRadio" label="2">指定会员等级</el-radio>
                    </div>
                </el-row>

                <el-row v-show="levelRadio == 2">
                    <div class="bgcolor bgvip bgradio">
                        <label>&nbsp;</label>
                        <div class="vip-check">
                            <el-checkbox v-model="gradeCheckList[index].if" v-for="(item,index) in memberLevel">{{item.gradeName}}</el-checkbox>
                            <!-- <el-checkbox v-model="checked">VIP</el-checkbox> -->
                        </div>
                    </div>
                </el-row>

                <el-row class="bt1">
                    <div class="bgcolor discount-type">
                        <label><small>*</small>优惠方式</label>
                        <div class="discount-type-wrapper">
                            <span>当赠送方式还没有新增时，可以从这里添加</span>
                            <span class="add-discount" @click="addTable">新增优惠</span>
                        </div>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgtable">
                        <label>&nbsp;</label>
                        <div class="table-wrapper">
                            <table>
                                <tr>
                                    <th class="recharge-th">层级</th>
                                    <th class="recharge-th">优惠条件</th>
                                    <th class="recharge-th">优惠内容</th>
                                    <th class="recharge-th">操作</th>
                                </tr>
                                <tr class="" v-for="(item,i) in allTableData">
                                    <td class="td-1 tc">{{i+1}}</td>
                                    <td class="td-2 tc">
                                        <span>充值满</span>
                                        <el-input placeholder="" type="number" min="0" class="recharge-input" v-model="item.rechargeAmount"></el-input>
                                        <span>元</span>
                                    </td>
                                    <td class="td-3">
                                        <div>
                                            <el-checkbox v-model="tableIntCheckList[i].ifCheck">送积分</el-checkbox>
                                            <el-input placeholder="请输入赠送的积分值" v-model="item.presentIntegral" min="0" type="number" v-if="tableIntCheckList[i].ifCheck" class="table-input"></el-input>
                                            <el-input placeholder="" v-model="blankText" v-else disabled class="table-input"></el-input>
                                        </div>

                                        <div>
                                            <el-checkbox v-model="tableMoneyCheckList[i].ifCheck">送储值</el-checkbox>
                                            <el-input placeholder="请输入赠送的储值金额" v-model="item.presentAmount" min="0" type="number" v-show="tableMoneyCheckList[i].ifCheck" class="table-input"></el-input>
                                            <el-input placeholder="" v-model="blankText" disabled v-show="!tableMoneyCheckList[i].ifCheck" class="table-input"></el-input>有效天数
                                            <el-input placeholder="" v-model="blankText" type="number" min="0" v-show="tableMoneyCheckList[i].ifCheck" class="table-input"></el-input>
                                            <el-input placeholder="" v-model="blankText" disabled v-show="!tableMoneyCheckList[i].ifCheck" class="table-input"></el-input>
                                        </div>

                                        <div>
                                            <el-checkbox v-model="item.presentGiftcard">送卡券</el-checkbox>
                                            <span class="h35">若添加卡券从这里</span>
                                            <span class="h35 open-dialog" @click="addNewCard(i)">新增卡券</span>
                                        </div>

                                        <div>
                                            <div class="card-section">
                                                <span v-for='items in item.crmActGiftCards' class="mb10">{{items.giftcardName}}&nbsp;&nbsp;{{items.qty}}张
                                                    <i @click="cancelCard(i,index)" class="el-icon-error"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="td-4 tc cp">
                                        <span @click="delTable(i)">删除</span>
                                    </td>
                                </tr>
                            </table>
                            
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
                                    <span v-for="(i,index) in scope.row.crmActAreaapplys" :key="index" class="sizeNameWrapper">
                                        <span>{{i.opAreaName}}</span>
                                    </span>
                                    <button class="showGoodsDialog" @click="showOpDialog(scope.row)">···</button>                            
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺" class="relative">
                                <template slot-scope="scope">
                                    <span v-for="(i,index) in scope.row.crmActChannelapplys" :key="index" class="sizeNameWrapper">
                                        <span class="delSize" @click="delSize(index,scope.row)">×</span>
                                        <span class="sizeNameBtn">{{i.channelName}}</span>
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
                        <el-input placeholder="搜索..."
                                  class="search_input">
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
    name:'integralFactorCommodity',
    data(){
        return{
            test:'',
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
            chooseDate:[],
            allData:'',
            //---params-----------------
            createParams:{
                "crmActRechrule": [
                    {
                    "groupId": 1,
                    "activityId": 0,
                    "rechargeAmount": '',
                    "presentAmount": '',
                    "presentIntegral": '',
                    "presentGiftcard": true,
                    "crmActGiftCards": [
                        // {
                        // "groupId": '',
                        // "activityTypeid": 4,
                        // "activityId": 0,
                        // "activityRuleId": 0,
                        // "activityRuleDtlid": 0,
                        // "giftcardId": '',
                        // "qty": '',
                        // "id": 0
                        // }
                    ],
                    "id": 0
                    }
                ],
                "groupId": 1,
                "activityTypeid": 4,
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
                "crmActFreq": {
                    "groupId": 1,
                    "activityId": 0,
                    "perYear": true,
                    "selectYear": "",
                    "perMonth": true,
                    "selectMonth": "",
                    "perWeek": true,
                    "selectWeek": "",
                    "perBirthday": true,
                    "selectBirthDay": "",
                    "selectBirthWeek": "",
                    "selectBirthMonth": "",
                    "id": 0
                },
                "crmActGradeapplys": [
                    {
                    "groupId":1,
                    "activityId": 0,
                    "memberGradeId": 0,
                    "id": 0
                    }
                ],
                "crmActOuapplys": [
                    // {
                    // "groupId": 1,
                    // "activityId": 0,
                    // "ouId": '',
                    // "ouName": "",
                    // "crmActAreaapplys": [
                    //     {
                    //     "groupId": 1,
                    //     "activityId": 0,
                    //     "ouId": '',
                    //     "ouName": "",
                    //     "opAreaId": '',
                    //     "opAreaName": "",
                    //     "id": 0
                    //     }
                    // ],
                    // "crmActChannelapplys": [
                    //     {
                    //     "groupId": 1,
                    //     "activityId": 4,
                    //     "ouId": '',
                    //     "ouName": "",
                    //     "opAreaId": '',
                    //     "opAreaName": "",
                    //     "channelId": '',
                    //     "channelName": "",
                    //     "id": 0
                    //     }
                    // ],
                    // "id": 0
                    // }
                ],
                "createdBy": this.$store.state.name,
                "createdTime": "",
                "modifiedBy": this.$store.state.name,
                "modifiedTime": "",
                "isDeleted": false,
                "deletedBy": this.$store.state.name,
                "deletedTime": '',
                "id": 0
            },
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
            ifModify:false,
            backId:'',
            ifShow:true,
            checked:false,
            radio:'',//按周期选择单选框
            birthText:'',
            //----------------------------
            actType:'升级有礼',
            sendChecked:true,
            sendChecked1:true,
            blankText:'',
            dialogAdd:false,
            cardTypeId:'',//卡券id
            cardTypeAr:[],//卡券种类数组
            thisIndex:'',//当前操作行的index
            allTableData:[],//table所有数据
            allCardAr:[],//table内的所有赠送卡券数组
            memberLevel:[],
            cardNum:'',//添加的卡券数量
            statusAr:[],//状态枚举
            checkeByCircle:false,
            range:'',
            levelRadio:'1',
            gradeCheckList:[],
            tableIntCheckList:[],//表格内送积分的check
            tableMoneyCheckList:[],//表格内送储值的check
            //---使用范围-----------------
            rangeShow:false,
            dialogAdd:false,
            dialogRange:false,//组织弹框
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


        }
    },
    validators: {
        'addData.integralTactic_MainTable.tacticCode': function (value) {//编码
            return this.Validator.value(value).required();
        },
        'addData.integralTactic_MainTable.tacticCode': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'chooseDate': function (value) {//生效时间
            return this.Validator.value(value).required();      
        },
    },    
    created(){
        let self = this;
        self.loadStatus();
        self.loadData();
        self.getCardType();
        self.loadOuTreeAll();
        self.getAllOulength();
        self.getAllOplength();
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
        loadData:function(){
            let self = this;
            if(self.$route.params.id!='default'){
                self.$axios.gets('http://192.168.100.107:8092/api/services/app/ActivityManagement/Get',{Id:self.$route.params.id}).then(function(res){
                    console.log(res)
                    self.allData = res.result;

                    self.chooseDate[0] = self.allData.effectiveStart.split('T')[0];
                    self.chooseDate[1] = self.allData.effectiveEnd.split('T')[0];
                    if(self.allData.crmActFreq.perYear == true||
                       self.allData.crmActFreq.perMonth == true||
                       self.allData.crmActFreq.perWeek == true||
                       self.allData.crmActFreq.perBirthday == true){
                           self.checkeByCircle = true;
                    };
                    if(self.allData.crmActFreq.perYear == true){
                        self.radio = '1';
                    }else if(self.allData.crmActFreq.perMonth == true){
                        self.radio = '2';
                    }else if(self.allData.crmActFreq.perWeek == true){
                        self.radio = '3';
                    }else if(self.allData.crmActFreq.perBirthday == true){
                        self.radio = '4';
                    };
                    // console.log(self.radio)
                    if(self.radio == '4'){
                        if(self.allData.crmActFreq.selectBirthDay == true){
                            self.birthText = '1';
                        }else if(self.allData.crmActFreq.selectBirthMonth == true){
                            self.birthText = '3';
                        }else if(self.allData.crmActFreq.selectBirthWeek == true){
                            self.birthText = '2';
                        }
                    };

                    if(self.allData.applyAllGrade == true){
                        self.levelRadio = '1';
                    }else{
                        self.levelRadio = '2';
                    };
                    self.allTableData = self.allData.crmActRechrule;
                    console.log(self.allTableData)
                    for(let i in self.allTableData){
                        self.tableIntCheckList.push({//判断送积分的选项框
                            ifCheck:false,
                        });
                        self.tableMoneyCheckList.push({
                            ifCheck:false,
                        });
                        if(self.allTableData[i].presentIntegral>0){
                            self.tableIntCheckList[i].ifCheck = true;
                        }else{
                            self.tableIntCheckList[i].ifCheck = false;
                        };
                        if(self.allTableData[i].presentAmount>0){
                            self.tableMoneyCheckList[i].ifCheck = true;
                        }else{
                            self.tableMoneyCheckList[i].ifCheck = false;
                        }
                        
                    }
                    
                    //使用范围
                    self.rangeTableData = self.allData.crmActOuapplys;
                    // console.log(self.radio+'-'+self.birthText)
                    for(let i in self.allData.crmActGradeapplys){
                        if(self.allData.crmActGradeapplys[i].memberGradeId == self.memberLevel[i].id){
                            self.gradeCheckList[i].if = true;
                        }
                    };
                    
                    
                    
                },function(res){
                    console.log('err'+res)
                    
                });
            }
        },
        loadStatus(){
            let self=this;
            //获取状态枚举
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OrderStatus'}).then(function(res){
                console.log(res);
                self.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //获取会员等级
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                console.log(res.result);
                self.memberLevel=res.result;
                for(let i in self.memberLevel){
                    self.gradeCheckList.push({
                        if:false,
                    })
                }
                
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
            }else if(btn=="复制活动"){
            }else if(btn=="审核"){
            }else if(btn=="反审核"){
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
            this.$store.state.url='/rechargeGive/rechargeGiveList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由    
        },
        save(saveType){
            let self=this;
            // $('.tipsWrapper').css({display:'block'});
            // self.$validate().then(function(success){
                    if(self.radio=="1"){
                        self.createParams.crmActFreq.perYear =true; 
                    }else if(self.radio=="2"){
                        self.createParams.crmActFreq.perMonth =true; 
                    }else if(self.radio=="3"){
                        self.createParams.crmActFreq.perWeek=true; 
                    }else if(self.radio=='4'){
                        self.createParams.crmActFreq.perBirthday=true; 
                        if(self.range=="1"){
                            self.createParams.crmActFreq.selectBirthDay=true; 
                        }else if(self.range=="2"){
                            self.createParams.crmActFreq.selectBirthWeek=true; 
                        }else if(self.range=="3"){
                            self.createParams.crmActFreq.selectBirthMonth=true; 
                        }
                    }
                    self.createParams.effectiveStart=self.chooseDate[0];
                    self.createParams.effectiveEnd=self.chooseDate[1];
                    if(self.levelRadio == 1){
                        self.createParams.applyAllGrade = true;
                    }else if(self.levelRadio == 2){
                        self.createParams.applyAllGrade = false;
                    }
                    
                    if(self.birthText == 1){
                        self.createParams.crmActFreq.selectBirthDay = true;
                        self.createParams.crmActFreq.selectBirthWeek = false;
                        self.createParams.crmActFreq.selectBirthMonth = false;
                    }else if(self.birthText == 2){
                        self.createParams.crmActFreq.selectBirthWeek = true;
                        self.createParams.crmActFreq.selectBirthDay = false;
                        self.createParams.crmActFreq.selectBirthMonth = false;
                    }else if(self.birthText == 3){
                        self.createParams.crmActFreq.selectBirthMonth = true;
                        self.createParams.crmActFreq.selectBirthDay = false;
                        self.createParams.crmActFreq.selectBirthWeek = false;
                    }else{
                        self.createParams.crmActFreq.selectBirthDay = false;
                        self.createParams.crmActFreq.selectBirthWeek = false;
                        self.createParams.crmActFreq.selectBirthMonth = false;
                    }
                    console.log(self.allCardAr)
                    console.log(self.allTableData)
                    
                    for(let i in self.allCardAr){
                        for(let j in self.allCardAr[i].B){
                            self.allTableData[i].crmActGiftCards.push({
                                "groupId": 1,
                                "activityTypeid": 4,
                                "activityId": 0,
                                "activityRuleId": 0,
                                "activityRuleDtlid": 0,
                                "giftcardId": '',
                                "qty": '',
                                "id": 0
                            })
                            self.allTableData[i].crmActGiftCards[j].giftcardId = self.allCardAr[i].B[j].cardId;
                            self.allTableData[i].crmActGiftCards[j].qty = self.allCardAr[i].B[j].cardnumber;
                        }
                    }
                    self.createParams.crmActRechrule = self.allTableData;
                    console.log(self.rangeTableData)
                    console.log(self.createParams.crmActOuapplys)
                    for(let i in self.rangeTableData){
                        self.createParams.crmActOuapplys.push({
                            "groupId": 1,
                            "activityId": 0,
                            "ouId": '',
                            "ouName": "",
                            "crmActAreaapplys": [
                                // {
                                // "groupId": 1,
                                // "activityId": 0,
                                // "ouId": '',
                                // "ouName": "",
                                // "opAreaId": '',
                                // "opAreaName": "",
                                // "id": 0
                                // }
                            ],
                            "crmActChannelapplys": [
                                // {
                                // "groupId": 1,
                                // "activityId": 4,
                                // "ouId": '',
                                // "ouName": "",
                                // "opAreaId": '',
                                // "opAreaName": "",
                                // "channelId": '',
                                // "channelName": "",
                                // "id": 0
                                // }
                            ],
                            "id": 0
                        });
                        self.createParams.crmActOuapplys[i].ouId = self.rangeTableData[i].id;
                        self.createParams.crmActOuapplys[i].ouName = self.rangeTableData[i].ouName;
                        for(let j in self.rangeTableData[i].areaName){
                            self.createParams.crmActOuapplys[i].crmActAreaapplys.push({
                                "groupId": 1,
                                "activityId": 0,
                                "ouId": '',
                                "ouName": "",
                                "opAreaId": '',
                                "opAreaName": "",
                                "id": 0
                            })
                            self.createParams.crmActOuapplys[i].crmActAreaapplys[j].opAreaId = self.rangeTableData[i].areaName[j].opAreaId;
                            self.createParams.crmActOuapplys[i].crmActAreaapplys[j].opAreaName = self.rangeTableData[i].areaName[j].opAreaName;
                            self.createParams.crmActOuapplys[i].crmActAreaapplys[j].ouId = self.rangeTableData[i].id;
                            self.createParams.crmActOuapplys[i].crmActAreaapplys[j].ouName = self.rangeTableData[i].ouName;
                        };
                        for(let u in self.rangeTableData[i].qudaoNames){
                            self.createParams.crmActOuapplys[i].crmActChannelapplys.push({
                                "groupId": 1,
                                "activityId": 2,
                                "ouId": '',
                                "ouName": "",
                                "opAreaId": '',
                                "opAreaName": "",
                                "channelId": '',
                                "channelName": "",
                                "id": 0
                            })
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].channelId = self.rangeTableData[i].qudaoNames[u].channelId;
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].channelName = self.rangeTableData[i].qudaoNames[u].channelName;
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].ouId = self.rangeTableData[i].qudaoNames[u].ouId;
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].ouName = self.rangeTableData[i].qudaoNames[u].ouName;
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].opAreaId = self.rangeTableData[i].qudaoNames[u].opAreaId;
                            self.createParams.crmActOuapplys[i].crmActChannelapplys[u].opAreaName = self.rangeTableData[i].qudaoNames[u].opAreaName;
                        };
                        
                        let now = new Date();
                        self.createParams.createdTime = now;
                        self.createParams.modifiedTime = now;
                        self.createParams.deletedTime = now;
                    };

                // if(success){
                    self.$axios.posts('http://192.168.100.107:8092/api/services/app/ActivityManagement/UpdateMemberUpGradeRule',self.createParams).then(function(res){
                        self.open('创建成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            self.goModify();

                        }else if(saveType=="saveAdd"){


                        }
                    },function(err){
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message=err.error.message;
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    })

                // }
            // })
        },




        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            this.$store.state.url='/rechargeGive/rechargeGiveModify/'+id;
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
        addNewCard:function(i){
            let self = this;
            self.dialogAdd = true;
            self.thisIndex = i;
            console.log(i)
        },
        addTable:function(){
            let self = this;
            self.allTableData.push({
                "groupId": 1,
                "activityId": 0,
                "rechargeAmount": '1',
                "presentAmount": '1',
                "presentIntegral": '1',
                "presentGiftcard": true,
                'sendChecked':true,
                'sendChecked1':true,
                "crmActGiftCards": [
                    // {
                    // "groupId": 1,
                    // "activityTypeid": 4,
                    // "activityId": 0,
                    // "activityRuleId": 0,
                    // "activityRuleDtlid": 0,
                    // "giftcardId": '',
                    // "qty": '',
                    // "id": 0
                    // }
                ],
                "id": 0
            });
            self.allCardAr.push({
               B:[]
            })
            console.log(self.allTableData)
            console.log(self.allCardAr)
        },
        cancelCard:function(i,index){
            let self = this;
            self.allCardAr[i].B.splice(index,1);
            
        },
        delTable:function(index){
            let self = this;
            self.allTableData.splice(index,1);
            self.allCardAr.splice(index,1);
        },
        addCard:function(){
            let self = this;
            // console.log(self.allCardAr)
            self.dialogAdd = false;
            let cardname = '';
            let cardnumber = self.cardNum;
            let cardId = '';
            let Ar = [];
            for(let i in self.cardTypeAr){
                if(self.cardTypeId == self.cardTypeAr[i].id){//当绑定的券id和数组里的id相同时
                    cardname = self.cardTypeAr[i].couponName;
                    cardId = self.cardTypeAr[i].id;
                }
            };
            // self.allCardAr[self.thisIndex].B.push({cardname,cardnumber,cardId});

            // console.log(self.thisIndex)
            // console.log(self.allCardAr)
            
            self.allTableData[self.thisIndex].crmActGiftCards.push({
                activityId:0,
                activityRuleId:0,
                activityRuleDtlid:0,
                activityTypeid:2,
                giftcardId:cardId,
                giftcardName:cardname,
                groupId:1,
                id:0,
                qty:cardnumber,
            })
        },
        addCancel:function(){
            let self = this;
            self.dialogAdd = false;
        },
        getCardType:function(){
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/CouponManagement/Get_Coupon_library').then(function(res){
                // console.log(res)
                self.cardTypeAr = res.result;
            })
        },
        //---使用范围--------------------------
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

            // console.log(self.opIds)
            setTimeout(function(){
               self.$refs.optree.setCheckedKeys(self.opIds);
            },200)
        },
        showQuDialog(row){//渠道弹框按钮
            let self=this;
            // console.log(row)
            $.each(self.rangeTableData,function(i,val){
                if(val.id==row.id){
                    self.index=i;
                }
            });
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
            };
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
                        'activityId':0,
                        "ouId": '',
                        'ouName':'',
                        "opAreaId": '',
                        "opAreaName": "",
                        "id": 0
                    }
                self.areaNames.push(areaName)
                self.areaNames[i].opAreaName=self.opCheckAll[i].name;
                self.areaNames[i].opAreaId=self.opCheckAll[i].id;
                self.areaNames[i].ouId=self.opCheckAll[0].ouId;
            }
             self.rangeTableData[self.index].areaName=self.areaNames;
             self.$refs.optree.setCheckedNodes(self.opCheckAll);

            // self.rangeTableData[self.index].opAreaId=self.opCheckAll[0].id;
            self.dialogRangeOp=false;
            // console.log(self.opCheckAll,self.areaNames)
            console.log(self.rangeTableData)

        },
        quDialogSure(){//渠道dialog点击确认
            let self=this;
            self.SelectionChange= self.$store.state[self.tableModel+'Selection'];
            console.log(self.SelectionChange)
            self.selectData=[];
            $.each(self.SelectionChange,function(i,val){
                
                let ss={
                        "id": 0,
                        "groupId": 1,
                        'activityId':0,
                        "ouId": '',
                        "ouName": "",
                        "opAreaId": 0,
                        "opAreaName": "",
                        "channelName": "",
                        "channelId": 0                
                        }
                self.selectData.push(ss);
                self.selectData[i].channelName=val.shopName;
                self.selectData[i].channelId=val.id;
                self.selectData[i].opAreaId=val.opAreaId;
                self.selectData[i].opAreaName=val.opAreaFullName;
                self.selectData[i].ouId=val.ouId;
                self.selectData[i].ouName = val.ouFullnam;
            })
            
            self.rangeTableData[self.index].qudaoNames=self.selectData;
            self.dialogRangeQu=false;
            console.log(self.selectData,self.rangeTableData)
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
    },
    components:{
        buttonGroup,
        dialogBox,
        Table
    }
}
</script>
<style scoped>
.upgrade-give .erp_bt{
    height:24px;
}
.upgrade-give .erp_bt .btDetail{
    line-height:24px;
}
.upgrade-give .erp_bt .btImg img{
    top:-4px;
}
.upgrade-give .erp_bt{
    padding:0 6px;
    margin-top:8px;
}
.upgrade-give .erp_bt .btDetail{
    padding-left:10px;
}
.upgrade-give .gray{
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    color: #cccccc;
    margin-left: 10px;
}
.upgrade-give .sizeNameBtn{
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
.upgrade-give .sizeNameWrapper{
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
.upgrade-give .sizeNameWrapper:hover .delSize{
    display: block;
}
.upgrade-give .sizeNameWrapper .delSize{
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
.upgrade-give .long{
    width: 600px;
}
.upgrade-give .short{
    width: 400px;
}
.upgrade-give .nopadding{
    padding: 0;
    margin: 0;
}
.upgrade-give .nopadding .gray{
    padding: 0;
    margin: 0;
}
.upgrade-give .input{
    width: 120px;
    height: 35px;
    line-height: 35px;
}
.upgrade-give .input .el-input__inner{
    height: 35px;
    line-height: 35px;
}
.upgrade-give .week-table .el-radio__label{
    display: block;
}
.upgrade-give .week-table{
    border-collapse: collapse;
    margin-left: 94px;
    width:calc(100% - 94px);
}
.upgrade-give .week-table td{
    border:1px solid rgb(194, 202, 216);
    padding: 4px 6px;
    height: 35px;
}
.upgrade-give .bg-gray{
    background-color: #ececec;
}
.upgrade-give .bglong{
    width:400px!important;
}
.upgrade-give .bgvip{
    height: 43px!important;
}
.upgrade-give .vip-check{
    width:calc(100% - 100px);
    float: left;
    height: 40px;
    line-height: 40px;
    background-color: #ececec;
    border: 1px dotted #cccccc;
    border-radius: 3px;
    padding-left:4px;
}
.upgrade-give .discount-type{
    width:calc(100% - 84px);
}
.upgrade-give .discount-type-wrapper{
    float: left;
    height: 35px;
    line-height: 35px;
}
.upgrade-give .add-discount{
    color: #33CCCC;
    cursor: pointer;
}
.upgrade-give .bgtable{
    /* width:calc(100% - 84px); */
    margin-right: 5px;
    margin-left: 94px;
    /* width: 100%; */
}
.upgrade-give .table-wrapper{
    float: left;
    width: calc(100% - 84px);
    /* height: auto!important; */
}
.upgrade-give .table-wrapper table{
    border:1px solid #e9e9e9;
    width: 100%;
    font-size: 12px;
}

</style>

<style>
.upgrade-give .week-table .el-radio__label{
    display: inline-block;
}
.upgrade-give .input .el-input__inner{
    height: 35px;
    line-height: 35px;
}
.upgrade-give .smallRangeDate .el-input__inner{
    height: 35px;
}
.upgrade-give .el-radio-button, .el-radio-button__inner{
    margin-right:6px;
    border-radius:4px;  
}
.upgrade-give .el-radio-button__inner{
    border:1px solid #dcdfe6;
}
.upgrade-give .el-radio-button:first-child .el-radio-button__inner{
    border-radius:4px;
}
.upgrade-give .el-radio-button:last-child .el-radio-button__inner{
    border-radius:4px;
}
.upgrade-give .smallRangeDate .el-range-separator{
    height: 35px;
}
.upgrade-give .bg-white{
    background-color: white;
}
.upgrade-give .bb1{
    border-bottom: 1px solid #cccccc;
}
.upgrade-give .bt1{
    border-top:1px solid #ccc;
}
.upgrade-give .none{
    display: none;
}
.upgrade-give .block{
    display: inline-block;
}
.upgrade-give .bgradio{
    width: calc(100% - 84px);
}
.upgrade-give .bgradio .el-input{
    display: inline-block;
    width: 80px;
    float: none;
}

.upgrade-give .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.upgrade-give .bgradio .el-input__inner{
    height: 35px;
}

.upgrade-give .bgradio .el-radio__label{
    display:inline-block;
}
.upgrade-give .bgradio .el-input .el-input__inner{
    height: 32px;
}
.upgrade-give .bgradio .el-radio{
    width:auto;
}
.upgrade-give  .border-green{
    border-bottom:2px solid rgb(51, 204, 204);
    float:left;
    height:34px;
    line-height:34px;
    margin-right:10px;   
    margin-left:10px;
}
.upgrade-give .smallRangeDate .el-range-separator{
    line-height:35px;
}
.upgrade-give .recharge-input{
    display: inline-block;
    width:80px;
}
.upgrade-give .recharge-th{
    text-align:center;
}
.upgrade-give .recharge-input .el-input__inner{
    width: 80px;
    height: 35px;
}
.upgrade-give .td-1{
    width:10%;
    vertical-align:middle;
}
.upgrade-give .td-2{
    width:20%;
    vertical-align:middle;
}
.upgrade-give .td-3{
    width:55%;
}
.upgrade-give .td-4{
    width:15%;
    vertical-align:middle;
}
.tc{
    text-align:center;
}
.cp{
    cursor: pointer;
}
.table-wrapper table{
    border:1px solid rgb(194, 202, 216);
    border-collapse:collapse;
}
.table-wrapper th,.table-wrapper td{
    border:1px solid rgb(194, 202, 216);
    padding:4px 6px;
}
.upgrade-give .table-input{
    width:157px;
    height:35px;
}
.upgrade-give .table-input .el-input__inner{
    width:157px;
    height:35px;
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
.upgrade-give table .el-input__inner{
    border:1px solid #dcdfe6;
}
.add-common label{
    width:20%;
    display: inline-block;
    text-align:right;
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
.card-section{
    width:calc(100% - 100px);
    padding: 15px;
    border:1px solid #cccccc;
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
.upgrade-give .showGoodsDialog{
    position: absolute;
    right: 20px;
    top: 10px;
}
</style>