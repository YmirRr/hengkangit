<template>
    <div class="reg-give">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <el-row class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <!-- <span :class="validation.hasError('allData.crmCoupon.couponName')?'block':'none'">
                                券名称{{ validation.firstError('allData.crmCoupon.couponName') }},
                        </span>
                        <span :class="allData.crmCoupon.couponTypeid=='2'&& validation.hasError('allData.crmCoupon.discount')?'block':'none'">
                                消费折扣率{{ validation.firstError('allData.crmCoupon.discount')}},
                        </span>
                        <span :class="allData.crmCoupon.couponTypeid=='1'&& validation.hasError('allData.crmCoupon.denomination')?'block':'none'">
                                卡券面额{{ validation.firstError('allData.crmCoupon.denomination')}},
                        </span>    
                        <span :class="maxTimesRadio=='1'&& validation.hasError('maxTimes')?'block':'none'">
                                每人限送{{ validation.firstError('maxTimes')}},
                        </span>      
                        <span :class="allData.crmCoupon.applyAllGrade=='0'&& validation.hasError('checkList')?'block':'none'">
                                指定会员等级{{ validation.firstError('allData.crmCoupon.applyAllGrade')}},
                        </span>                           
                        <span :class="radioUse=='2'&& validation.hasError('allData.crmCoupon.expdAmount')?'block':'none'">
                                消费金额{{ validation.firstError('allData.crmCoupon.expdAmount')}},
                        </span>   
                        <span :class="radioUse=='2'&& validation.hasError('allData.crmCoupon.expdQty')?'block':'none'">
                                消费件数{{ validation.firstError('allData.crmCoupon.expdQty')}},
                        </span>   
                        <span :class="radioTime=='1'&& validation.hasError('chooseDate')?'block':'none'">
                                固定时间{{ validation.firstError('chooseDate')}},
                        </span> 
                        <span :class="radioTime=='2'&& validation.hasError('allData.crmCoupon.effectiveStartdays')?'block':'none'">
                                动态时间{{ validation.firstError('allData.crmCoupon.effectiveStartdays')}},
                        </span>   
                        <span :class="radioStock=='1'&& validation.hasError('stockNum')?'block':'none'">
                                固定值{{ validation.firstError('stockNum')}},
                        </span>    -->
                    </p>
                </div>
            </div>
            <el-col class="mt10 mb10">
                <el-row>
                    <div class="bgcolor long">
                        <label>活动类型</label>
                        <el-input placeholder="" v-model="proType" disabled :class="{redBorder : validation.hasError('allData.crmCoupon.couponName')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor long">
                        <label><small>*</small>活动编码</label>
                        <el-input placeholder="" v-model="allData.activityNo" :class="{redBorder : validation.hasError('allData.crmCoupon.couponName')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor long">
                        <label><small>*</small>活动名称</label>
                        <el-input placeholder="" v-model="allData.activityName" :class="{redBorder : validation.hasError('allData.crmCoupon.couponName')}"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>生效时间</label>
                        <el-date-picker v-model="chooseDate" 
                                        :class="{redBorder : validation.hasError('chooseDate')&&radioTime=='1'}"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        @change="testl"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
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

                <el-row>
                    <div class="bgcolor long">
                        <label>备注</label>
                        <el-input placeholder="" v-model="allData.remark"></el-input>
                    </div>
                </el-row>



                <el-row class="bt1">
                    <div class="bgcolor bgradio">
                        <label><small>*</small>赠送规则</label>
                        <el-radio v-model="isSendSuccess" label="1">注册成功</el-radio>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label></label>
                        <el-radio v-model="isSendSuccess" label="2">注册信息完成率</el-radio>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor input-per">
                        <label>&nbsp;</label>
                        <el-input placeholder="" v-model="blankText" disabled v-if='isSendSuccess==1'></el-input>
                        <el-input placeholder="" v-model="allData.crmActRegrule.infoPerfectRatio" v-if='isSendSuccess==2' min='0' max="100"></el-input>
                        <span>%</span>
                    </div>
                </el-row>

                <el-row class="tips">
                    <span>温馨提示：注册信息完成率是指用户在注册信息时完成注册信息的百分比</span>
                </el-row>

                <el-row class="bt1 pt10">
                    <div class="bgcolor bgradio">
                        <label><small>*</small>赠送方式</label>
                        <el-checkbox v-model="sendChecked">送积分</el-checkbox>
                        <el-input placeholder="请输入赠送的积分值" v-model="allData.crmActRegrule.presentIntegral"></el-input>
                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label>&nbsp;</label>
                        <el-checkbox v-model="sendChecked1">送储值</el-checkbox>
                        <el-input placeholder="请输入赠送的储值金额" v-model="allData.crmActRegrule.presentAmount"></el-input>，
                        <el-input placeholder="有效天数" v-model="allData.crmActRegrule.presentAmount"></el-input>

                    </div>
                </el-row>

                <el-row>
                    <div class="bgcolor bgradio">
                        <label>&nbsp;</label>
                        <el-checkbox v-model="allData.crmActRegrule.presentGiftcard">送卡券</el-checkbox>
                        <span class="h35">若添加卡券从这里</span>
                        <span class="h35 open-dialog" @click="addNewCard">新增卡券</span>
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
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue">
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
            proType:'注册送礼',
            ifModify:false,
            checked:'',
            allData:'',//拿回的数据
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
            
   
            
            //-----------------------------
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
            
            backId:'',
            memberLevel:'',//全部会员等级
            i:0,

            isSendSuccess:'',//注册成功单元
            infoPerfectRatio:'',//注册完成百分比
            blankText:'',//显示空
            sendChecked:false,
            sendChecked1:false,
            cardTypeId:'',//卡券类型
            cardNum:'',//赠送卡券数量
            sendCardAr:[],//显示在灰框内的数组
            getSendCardAr:[],//获取到的卡券数组
            cardTypeAr:[],//卡券种类

        }
        
    },
    validators: {
        'allData.crmCoupon.couponName': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'allData.crmCoupon.denomination': function (value) {//面额
            if(this.allData.crmCoupon.couponTypeid=='1'){
                return this.Validator.value(value).required();
            }
        },
        'allData.crmCoupon.discount': function (value) {//折扣
            if(this.allData.crmCoupon.couponTypeid=='2'){
                return this.Validator.value(value).required();
            }
        },
        'maxTimes': function (value) {//限送次数
            if(this.maxTimesRadio=='1'){
                return this.Validator.value(value).required();
            }
        },
        'checkList': function (value) {//会员等级
            if(this.allData.crmCoupon.applyAllGrade=='0'){
                return this.Validator.value(value).required();
            }
        },
        // 'allData.crmCoupon.expdAmount': function (value) {//消费金额
        //     if(this.radioUse=='2'){
        //         return this.Validator.value(value).required();
        //     }
        // },
        // 'allData.crmCoupon.expdQty': function (value) {//消费件数
        //     if(this.radioUse=='2'){
        //         return this.Validator.value(value).required();
        //     }
        // },
        'chooseDate': function (value) {//生效天数
            if(this.radioTime=='1'){
                return this.Validator.value(value).required();
            }
        },
        // 'allData.crmCoupon.effectiveStartdays': function (value) {//生效天数
        //     if(this.radioTime=='2'){
        //         return this.Validator.value(value).required();
        //     }
        // },
        'stockNum': function (value) {//库存
            if(this.radioStock=='2'){
                return this.Validator.value(value).required();
            }
        },

    },       
    created(){
        this.loadMemberLevel();
        this.loadModify();
        this.loadOuTreeAll();
        this.getAllOulength();
        this.getAllOplength();
        this.getCardType();
    },
    watch:{
        allData:{
            handler:function(val,oldVal){
                 this.ifModify = true;
            },
            deep:true,
        },

        maxTimesRadio:{
            handler:function(){
                let self = this;
                if(self.maxTimesRadio==0){
                    self.allData.crmCoupon.maximumTimes=0;
                    self.maxTimes='';
                }else{
                    self.allData.crmCoupon.maximumTimes=self.maxTimes;
                }
            },
            deep:true,
        },
        radioStock:{
            handler:function(){
                let self = this;
                if(self.radioStock==0){
                    self.allData.crmCoupon.qty=0;
                    self.stockNum='';
                }else{
                    self.allData.crmCoupon.qty=self.stockNum;
                }
            },
            deep:true,
        },

    },
    methods:{
        testl:function(){
            let self = this;
            console.log(self.chooseDate)
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
        //---获取信息-----------------------
        loadModify:function(){
            let self = this;
            if(self.$route.params.id!='default'){
                self.$axios.gets('http://192.168.100.107:8092/api/services/app/ActivityManagement/Get',{Id:self.$route.params.id}).then(function(res){
                    console.log(res)
                    self.allData = res.result;

                    self.chooseDate[0] = self.allData.effectiveStart.split('T')[0];
                    self.chooseDate[1] = self.allData.effectiveEnd.split('T')[0];
                    
                    self.infoPerfectRatio = self.allData.crmActRegrule.infoPerfectRatio;
                    console.log(self.allData.crmActRegrule.infoPerfectRatio>0)
                    if(self.allData.crmActRegrule.infoPerfectRatio>0){
                        self.isSendSuccess = '2';
                    }else{
                        self.isSendSuccess = '1';
                    }


                    if(self.allData.crmActRegrule.presentAmount>0){
                        self.sendChecked1 = true;
                    }
                    
                    self.getSendCardAr = self.allData.crmActRegrule.crmActGiftCards;
                    for(let i in self.getSendCardAr){
                        //根据卡券id查询卡券
                        self.$axios.gets('http://192.168.100.107:8092/api/services/app/CouponManagement/GetAllCouponsById',{coupid:self.getSendCardAr[i].giftcardId}).then(function(res){
                            self.sendCardAr.push({
                                cardname:res.result.couponName,
                                cardnumber:self.getSendCardAr[i].qty,
                                cardId:self.getSendCardAr[i].giftcardId,
                            });
                        },function(res){
                            console.log('err'+res)
                            
                        });
                    };
                    if(self.allData.crmActOuapplys.length>0){
                        let x = {
                            'areaName':"",
                            'opAreaId':'',
                            'ouName':"",
                            'qudaoNames':"",
                            'id':"",  
                            'id1':'',
                            'id2':'',
                            'id3':''
                        }; 
                        console.log(self.allData.crmActOuapplys)
                        $.each(self.allData.crmActOuapplys,function(i,val){
                            
                            self.rangeTableData.push(x);
                            self.rangeTableData[i].ouName=val.ouId_OuName;
                            self.rangeTableData[i].id1=val.id;
                            self.rangeTableData[i].areaName=val.crmActAreaapplys;
                            // if(val.crmActAreaapplys.length==0){
                            //     Vue.set(self.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                            // }
                            self.rangeTableData[i].qudaoNames=val.crmCouponChannelapplys;
                            self.rangeTableData[i].id=val.ouId;
                            self.ouIds.push(val.ouId);
                        })
                        console.log(self.rangeTableData)
                    }
                    
                    
                },function(res){
                    console.log('err'+res)
                    
                });
            };
            
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
            let self=this;
            $('.tipsWrapper').css({display:'block'});
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});

                    self.$axios.posts('http://192.168.100.107:8092/api/services/app/ActivityManagement/CreateMemberRegisterRule',self.createParams).then(function(res){
                        self.open('创建成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            self.backId = res.result;
                            self.goModify(self.backId);

                        }else if(saveType=="saveAdd"){
                            
                            // self.validation.reset();

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
            })
            //console.log(self.allData,self.checkList)
            //console.log(self.rangeTableData)
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
            if(self.rangeTableData.length==0){
                 self.rangeTableData=self.ouCheckAll;
                $.each(self.ouCheckAll,function(i,val){
                    Vue.set(self.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                    Vue.set(self.rangeTableData[i],'qudaoNames','');
                    Vue.set(self.ouCheckAll[i],'opAreaId','');
                    Vue.set(self.ouCheckAll[i],'index',i);
                    self.ouIds.push(val.id);
                })
                self.rangeTableData=self.ouCheckAll;

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
            console.log(self.rangeTableData)
            

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
            //console.log(row)
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
            let x = [];
            let cardname = '';
            let cardnumber = self.cardNum;
            for(let i in self.cardTypeAr){
                if(self.cardTypeId == self.cardTypeAr[i].itemValue){
                    cardname = self.cardTypeAr[i].itemName;
                }
            }
            self.sendCardAr.push({cardname,cardnumber});
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
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CouponType'}).then(function(res){
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
.reg-give .bgradio{
    width: calc(100% - 84px);
}
.reg-give .bgradio .el-input{
    display: inline-block;
    width: 157px;
    height: 35px;
    float: none;
}

.reg-give .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.reg-give .bgradio .el-input__inner{
    height: 35px;
}
.reg-give .gray{
    font-size: 12px;
    color: #cccccc;
    display: inline-block;
    height: 35px;
    line-height: 35px;
}
.reg-give .same-row{
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
.reg-give .showGoodsDialog{
    position: absolute;
    right: 20px;
}
.reg-give .sizeNameBtn{
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
.reg-give .sizeNameWrapper{
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
.reg-give .sizeNameWrapper:hover .delSize{
    display: block;
}
.reg-give .sizeNameWrapper .delSize{
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
.reg-give .relative{
    position: relative;
}
</style>

<style>
.reg-give .bgradio .el-radio__label{
    display:inline-block;
}
.reg-give .bgradio .el-input .el-input__inner{
    height: 35px;
}
.reg-give .bgradio .el-radio{
    width:auto;
}
.reg-give .bgcolor .el-date-editor input{
    padding:0px;
}
.reg-give .long{
    width: 445px;
}
.reg-give .input-per .el-input{
    width:calc(100% - 154px)
}
.reg-give .tips{
    padding-left:94px;
    font-size:12px;
    color:#999DA6;
}
.reg-give .input-per span{
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


