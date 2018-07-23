<template>
    <div class="card-detail">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('allData.couponName')?'block':'none'">
                                券名称{{ validation.firstError('allData.couponName') }},
                        </span>
                        <span :class="allData.couponTypeid=='2'&& validation.hasError('allData.discount')?'block':'none'">
                                消费折扣率{{ validation.firstError('allData.discount')}},
                        </span>
                        <span :class="allData.couponTypeid=='1'&& validation.hasError('allData.denomination')?'block':'none'">
                                卡券面额{{ validation.firstError('allData.denomination')}},
                        </span>    
                        <span :class="maxTimesRadio=='1'&& validation.hasError('maxTimes')?'block':'none'">
                                每人限送{{ validation.firstError('maxTimes')}},
                        </span>      
                        <span :class="allData.applyAllGrade=='0'&& validation.hasError('checkList')?'block':'none'">
                                指定会员等级{{ validation.firstError('allData.applyAllGrade')}},
                        </span>                           
                        <!-- <span :class="radioUse=='2'&& validation.hasError('allData.expdAmount')?'block':'none'">
                                消费金额{{ validation.firstError('allData.expdAmount')}},
                        </span>   
                        <span :class="radioUse=='2'&& validation.hasError('allData.expdQty')?'block':'none'">
                                消费件数{{ validation.firstError('allData.expdQty')}},
                        </span>    -->
                        <span :class="radioTime=='1'&& validation.hasError('chooseDate')?'block':'none'">
                                固定时间{{ validation.firstError('chooseDate')}},
                        </span> 
                        <span :class="radioTime=='2'&& validation.hasError('allData.effectiveDays')?'block':'none'">
                                动态时间{{ validation.firstError('allData.effectiveDays')}},
                        </span>   
                        <span :class="radioStock=='1'&& validation.hasError('stockNum')?'block':'none'">
                                固定值{{ validation.firstError('stockNum')}},
                        </span>              
                    </p>
                </div>
            </div>
            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>券名称</label>
                        <el-input placeholder="" v-model="allData.couponName" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.couponName')}"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>卡券类型</label>
                        <el-radio v-model="allData.couponTypeid" label="1">代金券</el-radio>
                        <el-radio v-model="allData.couponTypeid" label="2">折扣券</el-radio>
                        <!-- <el-radio v-model="allData.couponTypeid" label="3">兑换券</el-radio>
                        <el-radio v-model="allData.couponTypeid" label="4">礼品卡</el-radio> -->
                    </div>
                </el-row>
                <el-row v-if="allData.couponTypeid=='2'">
                    <div class="bgcolor">
                        <label><small>*</small>消费折扣率</label>
                        <el-input placeholder="" v-model="allData.discount" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.discount')&&allData.couponTypeid=='2'}"></el-input>
                    </div>
                </el-row>
                <el-row v-else>
                    <div class="bgcolor">
                        <label><small>*</small>卡券面额</label>
                        <el-input placeholder="" v-model="allData.denomination" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.denomination')&&allData.couponTypeid=='1'}"></el-input>
                    </div>
                </el-row>


                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>限送设置</label>
                        <el-radio v-model="maxTimesRadio" label="0">不限次数</el-radio>
                        <el-radio v-model="maxTimesRadio" label="1">每人限送</el-radio><el-input placeholder="" :disabled="maxTimesRadio!='1'" @focus="showErrprTips" v-model="maxTimes" type="number" min=0 :class="{redBorder : validation.hasError('maxTimes')&&maxTimesRadio=='1'}" @change="maxTimesRadio='1'"></el-input><span class="radio-span">&nbsp;次</span>
                        
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>可用人群</label>
                        <el-radio v-model="allData.applyAllGrade" label="1">全部会员等级</el-radio>
                        <el-radio v-model="allData.applyAllGrade" label="0">指定会员等级</el-radio> 
                        <el-radio v-model="allData.applyAllGrade" label="-1">不限制</el-radio>
                    </div>
                </el-row>
                <el-row v-if="allData.applyAllGrade=='0'">
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-checkbox-group v-model="checkList" :class="{redBorder : validation.hasError('checkList')&&allData.applyAllGrade=='0'}">
                            <el-checkbox v-for="memberLevel in memberLevels" :label="memberLevel" :key="memberLevel"></el-checkbox>
                        </el-checkbox-group>
                    </div>                    
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>使用条件</label>
                        <el-radio v-model="radioUse" label="1">无条件</el-radio>
                        <el-radio v-model="radioUse" label="2">消费金额</el-radio>
                        满&nbsp;<el-input placeholder="" :disabled="radioUse!='2'" v-model="allData.expdAmount" @change="radioUse='2'" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.expdAmount')&&radioUse=='2'}"></el-input><span class="radio-span">&nbsp;元，
                        或消费件数满&nbsp;</span><el-input placeholder="" :disabled="radioUse!='2'" v-model="allData.expdQty" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.expdQty')&&radioUse=='2'}" @change="radioUse='2'"></el-input><span class="radio-span">&nbsp;件</span>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>生效时间</label>
                        <el-radio v-model="radioTime" label="1">固定时间</el-radio>
                            <el-date-picker v-model="chooseDate" :class="{redBorder : validation.hasError('chooseDate')&&radioTime=='1'}"
                            type="daterange" @focus="showErrprTips"
                            range-separator="至" :disabled="radioTime!='1'"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                     

                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-radio v-model="radioTime" label="2">动态时间</el-radio>
                        <span class="radio-span">领取后&nbsp;</span><el-input v-model="allData.effectiveDays" :disabled="radioTime!='2'" @change="radioTime='2'" type="number" min=1 @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.effectiveDays')&&radioTime=='2'}"></el-input><span class="radio-span">&nbsp;天有效。领取当天为第1天。</span>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio same-row">
                        <label><small>*</small>库存数量</label>
                        <el-radio v-model="radioStock" label="0">不限制</el-radio><i class="gray">（没有上限)</i>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-radio v-model="radioStock" label="1">固定值</el-radio>
                        <span class="radio-span">库存&nbsp;</span><el-input v-model="stockNum" :disabled="radioStock!='1'" @change="radioStock='1'" type="number" min=0 @focus="showErrprTips" :class="{redBorder : validation.hasError('stockNum')&&radioStock=='1'}"></el-input><span class="radio-span">&nbsp;张</span>
                    </div>
                </el-row>


                <el-row>
                    <div class="bgcolor bgradio same-row">
                        <label><small>*</small>使用验证</label>
                        <el-radio v-model="allData.verificationModeid" label="0">不验证</el-radio>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio same-row">
                        <label></label>
                        <el-radio v-model="allData.verificationModeid" label="1">验证码</el-radio><i class="gray">微信验证或短信验证</i>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-radio v-model="allData.verificationModeid" label="2">会员验证</el-radio><i class="gray">会员自主设置卡券的启用或停用状态</i>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor long">
                        <label>优惠说明</label>
                        <el-input placeholder="" v-model="allData.explain"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor long">
                        <label>使用须知</label>
                        <el-input placeholder="" v-model="allData.notice"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor long">
                        <label>备注</label>
                        <el-input placeholder="" v-model="allData.remark"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="allData.status"
                                    placeholder="" disabled>
                            <el-option v-for="item in statusAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>    

                    </div>
                </el-row>


                <el-row class="bt1">
                    <div class="bgcolor bgradio bgrow">
                        <label>设置可用商品</label>
                        <el-radio v-model="radioProduct" label="1">全部商品可用</el-radio>
                        <el-radio v-model="radioProduct" label="2">部分商品可用</el-radio>
                    </div>
                </el-row>
                <el-row class="pt5 bb1 bg-white">
                    <div class="bgcolor bgradio bgrow">
                        <label>使用范围</label>
                        <el-radio v-model='useRangeRadio' label="1">不限制</el-radio>
                        <el-radio v-model='useRangeRadio' label="2">指定范围</el-radio>   
                    </div>    
                </el-row>
                <el-row v-if="useRangeRadio=='2'">
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
                            <el-table-column label="组织" width="150">
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
                            <el-table-column label="渠道" class="relative">
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
        <el-dialog :visible.sync="dialogRangeQu"  class="transfer_dialog dialogQu" width="40%">
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
                    <Table :mutilSeletions='mutilSeletions' :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>                    
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
import config from '../../../../static/config'
export default {
    name:'cardModify',
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
            },{
                text:'复制卡券',
                class:'bt_saveAdd',
                disabled:false,
            },{
                text:'审核',
                class:'bt_cancel',
                icon:'icon-shenhe',
                disabled:false,
            },{
                text:'作废',
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
            firstModify:false,
            firstModifyFw:false,
            backCancel:'',//判断信息提示确定的点击事件
            allData:'',
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
                "effectiveDays": '',
                "qty":'',
                "explain": "",
                "notice": "",
                "remark": "",
                "status": 0,
                "applyAllGrade": '1',
                "verificationModeid":'0',
                "applyAllOu": true,
                "applyAllArea": true,
                "applyAllChannel": true,
                "applyAllSku": true
            },
            "couponOus": [],
            "couponGrades": [],
            "couponProducts": []
            },
            radioTime:'1',//生效时间单选框
            radioUse:'1',//使用条件单选框
            checkList:[],
            maxTimesRadio:'0',//限送次数单选框
            maxTimes:'',//限制次数input框
            radioVerify:'',//使用验证单选框
            radioStock:'0',//库存数量单选框
            chooseDate:[],//固定时间
            memberLevels:[],//会员等级
            stockNum:'',//库存张数

            rangeShow:false,
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
            mutilSeletions:{
                key:'shopCode',
                array:[]
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
            radioProduct:'1',//商品单选框
            memberLevel:'',
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
            i:0,
            id:{//作废ID
                "id":[]
            },
            useRangeRadio:'1',//使用范围单选框



        }
        
    },
    validators: {
        'allData.couponName': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'allData.denomination': function (value) {//面额
            if(this.allData.couponTypeid=='1'){
                return this.Validator.value(value).required().integer();
            }
        },
        'allData.discount': function (value) {//折扣
            if(this.allData.couponTypeid=='2'){
                return this.Validator.value(value).required().greaterThan();
            }
        },
        'maxTimes': function (value) {//限送次数
            if(this.maxTimesRadio=='1'){
                return this.Validator.value(value).required().integer();
            }
        },
        'checkList': function (value) {//会员等级
            if(this.allData.applyAllGrade=='0'){
                return this.Validator.value(value).required();
            }
        },
        // 'allData.expdAmount': function (value) {//消费金额
        //     if(this.radioUse=='2'){
        //         return this.Validator.value(value).required();
        //     }
        // },
        // 'allData.expdQty': function (value) {//消费件数
        //     if(this.radioUse=='2'){
        //         return this.Validator.value(value).required().integer();
        //     }
        // },
        'chooseDate': function (value) {//生效天数
            if(this.radioTime=='1'){
                return this.Validator.value(value).required();
            }
        },
        'allData.effectiveDays': function (value) {//生效天数
            if(this.radioTime=='2'){
                return this.Validator.value(value).required().integer().greaterThan(0);
            }
        },
        'stockNum': function (value) {//库存
            if(this.radioStock=='2'){
                return this.Validator.value(value).required().integer();
            }
        },

    },
    created(){
        this.loadData();
        this.loadMemberLevel();
        this.loadOuTreeAll();
        this.getAllOulength();
        this.getAllOplength();
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
                    _this.buttonGroup[8].disabled = true;
                }else{
                    _this.buttonGroup[3].disabled = true;
                    _this.buttonGroup[4].disabled = true;
                    _this.buttonGroup[5].disabled = true;
                    _this.buttonGroup[1].disabled = false;
                    _this.buttonGroup[2].disabled = false;
                    _this.buttonGroup[8].disabled = true;
                }
            },
            deep:true,
        },
        allData:{
            handler:function(val,oldVal){
                let _this = this;

                if(!_this.firstModify){
                    _this.firstModify = !_this.firstModify;
                }else{
                    //卡券类型
                    if(val.couponTypeid=="1"){
                        _this.allData.discount='';
                    }else if(val.couponTypeid=="2"){
                        _this.allData.denomination='';
                    }
                    //可用人群
                    if(val.applyAllGrade!="0"){
                        _this.checkList=[];
                    }
                    console.log(1)
                    _this.ifModify = true;
                }

            },
            deep:true,
        },
        rangeTableData:{
            handler:function(val,oldVal){
                let _this = this;
                if(!_this.firstModifyFw){
                    _this.firstModifyFw = !_this.firstModifyFw;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,            
        },
        useRangeRadio:{
            handler:function(val,oldval){
                let _this = this;
                if(val=='1'){
                    _this.allData.applyAllOu=true;
                    _this.allData.applyAllArea=true;
                    _this.allData.applyAllChannel=true;
                }else{
                    _this.allData.applyAllOu=false;
                    _this.allData.applyAllArea=false;
                    _this.allData.applyAllChannel=false;
                }
            },
            deep:true,        
        },
        //限送设置
        maxTimesRadio:{
            handler:function(val,oldVal){
                let _this = this;
                if(val=='0'){//不限次数
                    _this.maxTimes='';
                }else{
                    _this.allData.maximumTimes=_this.maxTimes;
                }
            },
            deep:true,
        },
        //生效时间
        radioTime:{
             handler:function(val,oldVal){
                let _this = this;
                if(val=='1'){//固定时间
                    _this.allData.effectiveDays='';
                }else{//动态时间
                    _this.chooseDate=[];
                }
            },
            deep:true,           
        },
        //使用条件
        radioUse:{
            handler:function(val,oldVal){
                let _this = this;
                if(val=='1'){
                    _this.allData.expdAmount='';
                    _this.allData.expdQty='';
                }
            },
            deep:true,        
        },
        //库存数量
        radioStock:{
            handler:function(val,oldVal){
                let _this = this;
                if(val=='0'){//不限制
                    _this.stockNum='';
                }else{
                    _this.allData.qty=_this.stockNum;
                }
            },
            deep:true,
        },
        ouSearch(val){
            this.$refs.fptree.filter(val)
        },
        opSearch(val){
            this.$refs.optree.filter(val)
        },
    },
    methods:{
        loadData(){
            let _this=this;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetAllCouponsById',{coupid:_this.$route.params.id}).then(function(res){
                console.log(res)
                _this.allData=res.result;
                //判断限送设置
                if(res.result.maximumLimited){
                    _this.maxTimesRadio='1';
                    _this.maxTimes=_this.allData.maximumTimes;
                }else{
                    _this.maxTimesRadio='0';
                }
                //判断使用条件
                if(res.result.expdImited){
                    _this.radioUse='2';
                }else{
                    _this.radioUse='1'
                }
                //判断生效时间
                if(res.result.effectiveDays==0){
                    _this.radioTime='1';
                    _this.chooseDate.push(res.result.effectiveStart);
                    _this.chooseDate.push(res.result.effectiveEnd);
                    _this.allData.effectiveDays ='';
                }else{
                    _this.radioTime='2';
                }
                //判断库存数量
                if(res.result.expdImited){
                    _this.radioStock='1';
                    _this.stockNum=res.result.qty;
                }else{
                    _this.radioStock='0';
                }
                //判断是否是指定会员等级
                if(res.result.couponGradeapplys.length!=0&&res.result.applyAllGrade=='0'){
                    $.each(res.result.couponGradeapplys,function(i,val){
                        _this.checkList.push(val.memberGradeId_GradeName);
                    })
                }
                //判断是否所有商品
     
                if(res.result.applyAllSku){
                    _this.radioProduct=="1";
                }else{
                   _this.radioProduct=="2";
                }
                //判断是否指定范围
                if(res.result.crmCouponOuapplys.length!=0){
                    _this.useRangeRadio="2";
                    let ss={
                        'areaName':"",
                        'opAreaId':'',
                        'ouName':"",
                        'qudaoNames':"",
                        'id':"",  
                        'id1':'',
                        'id2':'',
                        'id3':''
                    }
                    $.each(res.result.crmCouponOuapplys,function(i,val){
                        _this.rangeTableData.push(ss);
                        _this.rangeTableData[i].ouName=val.ouId_OuName;
                        _this.rangeTableData[i].id1=val.id;
                        _this.rangeTableData[i].areaName=val.crmCouponAreaapplys;
                        if(val.crmCouponAreaapplys.length==0){
                            Vue.set(_this.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                        }
                        _this.rangeTableData[i].qudaoNames=val.crmCouponChannelapplys;
                        _this.rangeTableData[i].id=val.ouId;
                        _this.ouIds.push(val.ouId);
                        
                    })

                }

                //console.log(_this.checkList)

                _this.allData.couponTypeid=_this.allData.couponTypeid+'';
                _this.allData.verificationModeid=_this.allData.verificationModeid+'';
                _this.allData.applyAllGrade=_this.allData.applyAllGrade+'';
                //console.log(_this.chooseDate)


            },function(res){
                console.log('err'+res)
            }); 
            
        },
        loadMemberLevel(){
            let _this=this;
            //获取会员等级
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                console.log(res.result);
                _this.memberLevel=res.result;
                $.each(res.result,function(i,val){
                    _this.memberLevels.push(val.gradeName)
                });
            },function(res){
                console.log('err'+res)
                _this.$message({
                type: "warning",
                message: "会员等级加载失败"
                });  

            });

            //获取状态枚举
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'OrderStatus'}).then(function(res){
                //console.log(res);
                _this.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
        save(saveType){
            let _this=this;
            $('.tipsWrapper').css({display:'block'});
            _this.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    var date=new Date();


                    if(_this.maxTimesRadio=='0'){
                        _this.allData.maximumLimited=false;
                    }else{
                        _this.allData.maximumTimes=_this.maxTimes;
                        _this.allData.maximumLimited=true;
                    }
                    if(_this.radioTime=='1'){
                        _this.allData.effectiveStart=_this.chooseDate[0];
                        _this.allData.effectiveEnd=_this.chooseDate[1];
                        _this.allData.effectiveDays = 0;

                    }else{
                        _this.allData.effectiveStart="";
                        _this.allData.effectiveEnd="";
                    }

                    if(_this.radioUse=='1'){
                        _this.allData.expdImited=false;
                        _this.allData.expdAmount='';
                        _this.allData.expdQty='';                        
                    }else{
                        _this.allData.expdImited=true;
                    }
                    if(_this.radioStock=='0'){
                        _this.allData.qtyImited=false;
                    }else{
                         _this.allData.qty=_this.stockNum;
                    }

                    if(_this.rangeTableData.length!=0){
                        _this.allData.crmCouponOuapplys=[];
                        $.each(_this.rangeTableData,function(i,val){
                            let ou= {
                                    "groupId": 0,
                                    "couponId": 0,
                                    "ouId": '',
                                    'crmCouponAreaapplys':[],
                                    'crmCouponChannelapplys':[],
                                    "id": 0
                                    }
                            _this.allData.crmCouponOuapplys.push(ou);
                            _this.allData.crmCouponOuapplys[i].ouId=val.id;
                            _this.allData.crmCouponOuapplys[i].couponId=_this.allData.id;
                            _this.allData.crmCouponOuapplys[i].crmCouponAreaapplys=val.areaName;                                           
                            _this.allData.crmCouponOuapplys[i].crmCouponChannelapplys=val.qudaoNames;            
                        })
                    }else{
                        _this.useRangeRadio="1";
                    }

                    //是否全部商品
                    if(_this.radioProduct=="1"){
                        _this.allData.applyAllSku = true;
                    }else{
                        _this.allData.applyAllSku = false;
                    }
                    //console.log(_this.rangeTableData,_this.allData)
                    //是否选择指定会员等级
                    if(_this.allData.applyAllGrade=='0'){
                        _this.allData.couponGradeapplys=[];
                        $.each(_this.checkList,function(i,val){
                            $.each(_this.memberLevel,function(index,value){                          
                                if(val==value.gradeName){
                                      let couponGrade= {
                                                "groupId": 0,
                                                "couponId": 0,
                                                "memberGradeId": '',
                                                "id": 0
                                                }
                                    _this.allData.couponGradeapplys.push(couponGrade);
                                    _this.allData.couponGradeapplys[_this.i].memberGradeId=value.id;   
                                    _this.i++;
                                }
                            })
                        })
                    }

                    _this.addData.crmCoupon.id=_this.allData.id;
                    _this.addData.crmCoupon.groupId=_this.allData.groupId;
                    _this.addData.crmCoupon.couponName=_this.allData.couponName;
                    _this.addData.crmCoupon.couponTypeid=_this.allData.couponTypeid;
                    _this.addData.crmCoupon.denomination=_this.allData.denomination;
                    _this.addData.crmCoupon.discount=_this.allData.discount;
                    _this.addData.crmCoupon.maximumTimes=_this.allData.maximumTimes;
                    _this.addData.crmCoupon.expdAmount=_this.allData.expdAmount;
                    _this.addData.crmCoupon.expdQty=_this.allData.expdQty;
                    _this.addData.crmCoupon.effectiveStart=_this.allData.effectiveStart;
                    _this.addData.crmCoupon.effectiveEnd=_this.allData.effectiveEnd;
                    _this.addData.crmCoupon.effectiveDays=_this.allData.effectiveDays;
                    _this.addData.crmCoupon.maximumLimited=_this.allData.maximumLimited;
                    _this.addData.crmCoupon.expdImited=_this.allData.expdImited;
                    _this.addData.crmCoupon.qtyImited=_this.allData.qtyImited;
                    _this.addData.crmCoupon.status=_this.allData.status;
                    _this.addData.crmCoupon.applyAllGrade=_this.allData.applyAllGrade;
                    _this.addData.crmCoupon.verificationModeid=_this.allData.verificationModeid;
                    _this.addData.crmCoupon.applyAllOu=_this.allData.applyAllOu;
                    _this.addData.crmCoupon.applyAllArea=_this.allData.applyAllArea;
                    _this.addData.crmCoupon.applyAllChannel=_this.allData.applyAllChannel;
                    _this.addData.crmCoupon.applyAllSku=_this.allData.applyAllSku;
                    _this.addData.crmCoupon.qty=_this.allData.qty;
                    _this.addData.crmCoupon.explain=_this.allData.explain;
                    _this.addData.crmCoupon.notice=_this.allData.notice;
                    _this.addData.crmCoupon.remark=_this.allData.remark;
                    _this.addData.couponGrades=_this.allData.couponGradeapplys;
                    _this.addData.couponOus=_this.allData.crmCouponOuapplys;

                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/AggregateCreateOrUpdate',_this.addData).then(function(res){
                        _this.open('创建成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            _this.ifModify=false;
                            _this.firstModify=false;
                            console.log(_this.ifModify)
                        }else if(saveType=="saveAdd"){
                            _this.goDetail();
                        }
                        if(_this.allData.couponTypeid=='1'){
                            _this.allData.discount='';
                        }else if(_this.allData.couponTypeid=='2'){
                            _this.allData.denomination='';
                        }

                        if(_this.radioTime=='1'){
                            _this.allData.effectiveDays ='';
                        }
                    },function(err){

                        if(_this.radioTime=='1'){
                            _this.allData.effectiveDays ='';
                        }
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

        //按钮组点击事件---------------------
        btnClick(btn){
            let _this = this;
            if(btn=="返回"){
                _this.isback();
            }else if(btn=="新增"){
                _this.goDetail();
            }else if(btn=="删除"){
                let _this = this;
                _this.dialogSetting.dialogName='delDialog'
                _this.dialogSetting.message="确定删除？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;
            }else if(btn=="保存"){
                _this.save('save')
            }else if(btn=="保存并新增"){
                _this.save('saveAdd')
            }else if(btn=="取消"){
                this.cancel();              
            }else if(btn=="复制卡券"){
            }else if(btn=="审核"){
            }else if(btn=="作废"){
                let _this = this;
                _this.dialogSetting.dialogName='dieDialog'
                _this.dialogSetting.message="确定作废？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;
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
                self.loadData();
                self.firstModify=false;
                self.firstModifyFw=false;
                self.ifModify=false;
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
            this.$store.state.url='/card/cardList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){
            this.$store.state.url='/card/cardDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        addDate:function(date, days) {
                var date = new Date(date);
                date.setDate(date.getDate() + parseInt(days));
                var month = date.getMonth() + 1;
                var day = date.getDate()-1;
                var time = date.getFullYear() + "-" + month + "-" + day
                return time;
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
            // _this.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
            //     console.log(res);
            //     _this.opTreeDataRight = res;
            //     _this.expandop.expandId_dialogOp=_this.defauleExpandTree(res,'id')
            //     console.log(_this.defauleExpandTree(res,'id'))
            // },function(res){
            //     console.log('err'+res)
            // })



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
        delSize(i,row){
            let _this=this;
            //console.log(i,row,_this.rangeTableData);
            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            _this.rangeTableData[_this.index].qudaoNames.splice(i,1);

        },
        dialogSure(){//组织dialog点击确认
            let _this=this;
            _this.ouCheckAll=_this.$refs.fptree.getCheckedNodes();
            if(_this.rangeTableData.length==0){
                 _this.rangeTableData=_this.ouCheckAll;
                $.each(_this.ouCheckAll,function(i,val){
                    Vue.set(_this.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                    Vue.set(_this.rangeTableData[i],'qudaoNames','');
                    Vue.set(_this.ouCheckAll[i],'opAreaId','');
                    Vue.set(_this.ouCheckAll[i],'index',i);
                    _this.ouIds.push(val.id);
                })
                _this.rangeTableData=_this.ouCheckAll;

            }else{
                $.each(_this.ouCheckAll,function(i,val){
                    Vue.set(_this.ouCheckAll[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                    Vue.set(_this.ouCheckAll[i],'opAreaId','');
                    Vue.set(_this.ouCheckAll[i],'qudaoNames','');
                    Vue.set(_this.ouCheckAll[i],'index',i);
                    $.each(_this.rangeTableData,function(index,value){
                        if(value.ouName==val.ouName){
                            val.areaName=value.areaName;
                            val.qudaoNames=value.qudaoNames;
                            val.id1=value.id1;
                        }
                    })
                     _this.ouIds.push(val.id)

                })
                _this.rangeTableData=_this.ouCheckAll;  
      

            }

            _this.dialogRange=false;
            console.log(_this.rangeTableData)
            

        },
        opDialogSure(){//业务地区dialog点击确认
            let _this=this;
            _this.dialogOp=false;
            _this.opCheckAll=_this.$refs.optree.getCheckedNodes();
             _this.areaNames=[];
            for(let i=0;i<_this.opCheckAll.length;i++){
                let areaName={
                        "groupId": 0,
                        "couponId": 0,
                        "ouId": '',
                        "opAreaId": '',
                        "opAreaId_AreaName": "",
                        "id": 0
                    }
                _this.areaNames.push(areaName)
                _this.areaNames[i].opAreaId_AreaName=_this.opCheckAll[i].name;
                _this.areaNames[i].opAreaId=_this.opCheckAll[i].id;
                _this.areaNames[i].ouId=_this.opCheckAll[0].ouId;
                _this.areaNames[i].groupId=_this.allData.groupId;
                _this.areaNames[i].couponId=_this.allData.id;
                //_this.opIds.push(_this.opCheckAll[0].id)
            }
             _this.rangeTableData[_this.index].areaName=_this.areaNames;

            // _this.rangeTableData[_this.index].opAreaId=_this.opCheckAll[0].id;
            _this.dialogRangeOp=false;
            console.log(_this.opCheckAll,_this.areaNames)
            

        },
        quDialogSure(){//渠道dialog点击确认
            let _this=this;
            _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
            console.log(_this.SelectionChange)
            _this.selectData=[];
            $.each(_this.SelectionChange,function(i,val){
                let ss={
                        "id": 0,
                        "groupId": 0,
                        "couponId": 0,
                        "ouId": 0,
                        "opAreaId": 0,
                        "channelTypeid": 0,
                        "channelId_ShopName": "无",
                        "channelTypeidTValue": "",
                        'shopCode':"",
                        "channelId": 0                
                        }
                _this.selectData.push(ss);
                _this.selectData[i].channelId_ShopName=val.shopName;
                _this.selectData[i].channelTypeid=val.shopTypeid;
                _this.selectData[i].channelId=val.id;
                _this.selectData[i].opAreaId=val.opAreaId;
                _this.selectData[i].ouId=val.ouId;
                _this.selectData[i].groupId=_this.allData.groupId;
                _this.selectData[i].couponId=_this.allData.id;
                _this.selectData[i].shopCode=val.shopCode;
            })
            
            _this.rangeTableData[_this.index].qudaoNames=_this.selectData;
            _this.dialogRangeQu=false;
            console.log(_this.selectData,_this.rangeTableData)
        },


        dialogRangeShow(){
            let _this=this;
            _this.dialogRange=true;
            setTimeout(function(){
               _this.$refs.fptree.setCheckedKeys(_this.ouIds);
               _this.isCheckAllOu()
            },200)

        },

        showOpDialog(row){//业务地区弹框按钮
            let _this=this;
            //console.log(row)
            _this.opTreeDataRight=[];
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{ouId:row.id}).then(function(res){
                console.log(res)
                _this.opTreeDataRight = res.result;
                if(res.result==null){
                    _this.dialogRangeOp=true;
                }else{
                    _this.expandop.expandId_dialogOp=_this.defauleExpandTree(res.result,'id');
                    _this.dialogRangeOp=true;
                }
            },function(res){
                console.log('err'+res)
            })

            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            console.log(_this.rangeTableData,_this.rangeTableData[_this.index])
            $.each(_this.rangeTableData[_this.index].areaName,function(j,jal){
                _this.opIds.push(jal.opAreaId)
            })

            console.log(_this.opIds)
            setTimeout(function(){
               _this.$refs.optree.setCheckedKeys(_this.opIds);
            },200)

            console.log(_this.rangeTableData)


            
        },
        showQuDialog(row){//渠道弹框按钮
            let _this=this;
            //console.log(row)
            _this.mutilSeletions.array=[];
            //是否为全部业务地区
            if(row.areaName.length==1 && row.areaName[0].opAreaId_AreaName=="全部业务地区"){
                _this.queryParams.OuId=row.id;
                _this.$axios.posts('/api/services/app/ShopManagement/GetShopsByRange',_this.queryParams).then(function(res){
                    _this.$store.commit('Init_Table',res.result.items);
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.qudaoDialogListEachPage);
                    _this.$store.commit('Init_pagination',totalPage);
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })
           
            }else{
                let OpAreaIdList=[];
                $.each(row.areaName,function(i,val){
                    OpAreaIdList.push(val.opAreaId)
                })
                _this.queryParams.OpAreaIdList=OpAreaIdList;
                _this.$axios.posts('/api/services/app/ShopManagement/GetShopsByRange',_this.queryParams).then(function(res){
                    _this.$store.commit('Init_Table',res.result.items);
                    let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.qudaoDialogListEachPage);
                    _this.$store.commit('Init_pagination',totalPage);
                    _this.$store.commit('Init_TotalCount',res.result.totalCount);
                    _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
                })

            }

            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            if(_this.rangeTableData[ _this.index].qudaoNames.length==0){
                _this.mutilSeletions.array=[];
            }else if(_this.rangeTableData[ _this.index].qudaoNames.length!=0){
                
                $.each(_this.rangeTableData[_this.index].qudaoNames,function(i,val){
                    let mutilSeletion={
                        'shopCode':'',
                        'shopName':''
                    }
                    console.log(val)
                    mutilSeletion.shopCode=val.shopCode;
                    mutilSeletion.shopName=val.channelId_ShopName;
                   _this.mutilSeletions.array.push(mutilSeletion);
                   console.log(_this.mutilSeletions.array)
                })               
            }
            _this.dialogRangeQu=true;

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
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
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
                    this.sureDoing();
                    this.dialogVisible=false;
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }else if(parmas.dialogName=="delDialog"){//删除
                    let _this=this;
                    _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Delete',{id:_this.$route.params.id}).then(function(res){
                        _this.open('删除资料成功','el-icon-circle-check','successERP');
                        _this.back();
                    },function(res){
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message=err.error.message;
                        _this.errorTips.message=res.error.message;
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;

                    }) 
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="dieDialog"){//作废
                    let _this=this;

                    _this.id.id.push(_this.$route.params.id)
                    _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/CancelCouponById',_this.id).then(function(res){
                        _this.open('作废成功','el-icon-circle-check','successERP');
                        _this.back();
                    },function(res){
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message=err.error.message;
                        _this.errorTips.message=res.error.message;
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;

                    }) 
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
.bg-white{
    background-color: white;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.bt1{
    border-top:1px solid #ccc;
}
.card-detail .none{
    display: none;
}
.card-detail .block{
    display: inline-block;
}
.card-detail .bgradio{
    width: calc(100% - 84px);
}
.card-detail .bgradio .el-input{
    display: inline-block;
    width: 80px;
    float: none;
}
.card-detail .bgrow{
    margin-bottom: 0;
}
.card-detail .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.card-detail .bgradio .el-input__inner{
    height: 35px;
}
.card-detail .gray{
    font-size: 12px;
    color: #cccccc;
    display: inline-block;
    height: 35px;
    line-height: 35px;
}
.card-detail .same-row{
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
.card-detail .showGoodsDialog{
    position: absolute;
    right: 20px;
}
.card-detail .sizeNameBtn{
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
.card-detail .sizeNameWrapper{
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
.card-detail .sizeNameWrapper:hover .delSize{
    display: block;
}
.card-detail .sizeNameWrapper .delSize{
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
.card-detail .relative{
    position: relative;
}

</style>
<style>
.card-detail .bgradio .el-radio__label{
    display:inline-block;
}
.card-detail .bgradio .el-input .el-input__inner{
    height: 32px;
}
.card-detail .bgradio .el-radio{
    width:auto;
}
.card-detail .bgcolor .el-date-editor input{
    padding:0;
}
.card-detail .long{
    width: 600px;
}
.card-detail .dialogQu .el-dialog__body{
    height: 300px;
}
.card-detail .transfer_warapper{
    border:none;
}
</style>



