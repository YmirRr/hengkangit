<template>
    <div class="convertibility-strategy-detail">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>
        <div class="bb1 pt10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="validation.hasError('addData.tacticName')?'block':'none'">
                                名称{{ validation.firstError('addData.tacticName') }},
                        </span>
                        <span :class="validation.hasError('addData.tacticCode')?'block':'none'">
                                代码{{ validation.firstError('addData.tacticCode') }},
                        </span> 
                        <span :class="validation.hasError('chooseDate')?'block':'none'">
                                生效时间{{ validation.firstError('chooseDate')}},
                        </span> 
                        <span :class="radio=='addData.exchtacticGrades'&& validation.hasError('checkList')?'block':'none'">
                                指定会员等级{{ validation.firstError('addData.exchtacticGrades')}},
                        </span>  
                    </p>
                </div>
            </div>
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>名称</label>
                        <el-input placeholder="" v-model="addData.tacticName" :class="{redBorder : validation.hasError('addData.tacticName')}"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor">
                        <label><small>*</small>代码</label>
                        <el-input placeholder="" v-model="addData.tacticCode" :class="{redBorder : validation.hasError('addData.tacticCode')}"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>生效时间</label>
                        <div class="smallRangeDate">     
                            <el-date-picker
                                    class="dateRange"
                                    v-model="chooseDate"
                                    type="daterange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss" 
                                    range-separator="to"
                                    align="center"
                                    unlink-panels
                                    start-placeholder=""
                                    end-placeholder=""
                                    :class="{redBorder : validation.hasError('chooseDate')}">
                                   
                                </el-date-picker> 
                        </div>   
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>可用等级</label>
                        <el-radio v-model="radio" label="addData.applyAllGrade">全部会员等级</el-radio>
                        <el-radio v-model="radio" label="addData.exchtacticGrades">指定会员等级</el-radio>
                    </div>
                </el-row>

                <el-row v-if="radio=='addData.exchtacticGrades'">
                     <div class="bgcolor bgradio">
                        <label></label>
                        <el-checkbox-group v-model="checkList" :class="{redBorder : validation.hasError('checkList')&&radio=='addData.exchtacticGrades'}">
                            <el-checkbox v-for="memberLevel in memberLevels" :label="memberLevel" :key="memberLevel" :value="memberLevel"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor bgradio">
                        <label><small>*</small>兑换种类</label>
                            <el-checkbox label="卡券" v-model="addData.exchCouponEnabled"></el-checkbox>
                            <el-checkbox label="服务" v-model="addData.exchServiceEnabled"></el-checkbox>
                            <el-checkbox label="商品" v-model="addData.exchProductEnabled"></el-checkbox>
                           
                    </div>
                </el-row>
                
                <el-row>
                    <div class="bgcolor long">
                        <label>备注</label>
                        <el-input placeholder="" v-model="addData.remark"></el-input>
                    </div>
                </el-row>
                <el-row>
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="addData.status" placeholder="" disabled>
                            <el-option v-for="item in statusAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue">
                            </el-option>
                        </el-select>    
                    </div>
                </el-row> 
            </div>
                 <el-row class="nopadding bg-white" id="Card" v-show="addData.exchCouponEnabled">  
                    <div class="tabZoo" >
                        <el-col :span="24">
                            <div class="coupon-title"><span class="header-title">卡券</span>
                            <span class="showBtn" @click="attrShow = !attrShow"> 收起<i class="el-icon-arrow-down" :class="{rotate : !attrShow}"></i></span></div> 
                               <div v-show="attrShow" >
                                <div v-for="(item,index) in CardAr" class="Coupon" @click="CouponBG(index)" v-bind:class="{ greenbg:index==current}" v-show="CardAr.length>0">
                                    <p>{{item.couponName}}</p>
                                    <p class="score">需<input v-model="item.couponTypeidTValue"/>积分</p>  
                                       <i @click="cancelCard(index)" class="el-icon-error"></i> 
                                </div>
                                <div class="add-coupon" @click="addCoupon">
                                    <p>添加卡券</p>
                                    <p></p>  
                                </div>
                            </div>
                            </el-col>
                    </div>
                </el-row>
                <el-row class="nopadding bg-white" id="Service" v-show="addData.exchServiceEnabled">  
                    <div class="tabZoo" >
                        <el-col :span="24">
                            <div class="coupon-title"><span class="header-title">服务</span>
                            <span class="showBtn" @click="attrShowSer = !attrShowSer"> 收起<i class="el-icon-arrow-down" :class="{rotate : !attrShow}"></i></span></div> 
                            <div v-show="attrShowSer">
                                暂时不开发服务
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-row class="nopadding bg-white" id="Good" v-show="addData.exchProductEnabled">  
                     <div class="tabZoo">
                        <el-col :span="24">
                             <div class="coupon-title"><span class="header-title">商品</span>
                            <span class="showBtn" @click="attrShowGood = !attrShowGood"> 收起<i class="el-icon-arrow-down" :class="{rotate : !attrShow}"></i></span></div> 
                            <div v-show="attrShowGood">
                                <p>暂时不开发商品</p>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-dialog :visible.sync="dialogCouponVisible" width="60%" class="dialog-coupon">
                    <el-row>
                        <el-col :span="1">兑换</el-col>
                        <el-col :span="5">
                            <el-select v-model="couponId">
                                <el-option v-for="(item,index) in Coupon" :label="item.couponName" :key="item.id" :value="item.id" >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col  :span="1">,</el-col>
                        <el-col :span="2">
                            <el-input disabled v-model="one"></el-input>
                        </el-col>
                        <el-col :span="2">张,需要</el-col>
                        <el-col :span="2">
                            <el-input v-model="integralInput" type="number"></el-input>
                        </el-col>
                        <el-col :span="1"> 分</el-col>
                        <el-col :span="2"><el-button type="primary" plain @click="sure">确定</el-button></el-col>
                        <el-col :span="8">若兑换卡券类型不足，请点<a @click="CardDetail">此处</a>添加</el-col>
                    </el-row>
                    
                    </el-dialog>
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
        <!-- 使用组织弹框 -->
        <el-dialog :visible.sync="dialogRange"  class="transfer_dialog dialogOu" width="30%">
            <span slot="title">
                <span>所有组织</span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input">
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
import {ADD_BOOKMARK} from '../../../common/common.js'
import config from '../../../../static/config';
import Vue from 'vue'

export default {
    name:"convertibilityStrategyDetail",
    data(){
        return{
            BookMarkFlag:true,
            statusChangeParam:1,
            statusChangeName:'卡券库',
            statusChangeUrl:'cardDetail',
            dialogCouponVisible:false,
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
            secondModify:false,
            thirdModify:false,
            firstModifyRadio:false,
            addData:{
                "groupId": 0,//集团ID 
                "tacticCode": "",//策略编码 
                "tacticName": "",//策略名称
                "effectiveStart": "",// 有效开始时间 
                "effectiveEnd": "",// 有效结束时间 
                "applyAllGrade":true,//使用范围(是否所有会员等级)
                "exchtacticGrades": [],
                "applyAllOu": true,//使用范围(是否所有组织)
                "exchtacticOus": [],
                "applyAllArea": true,//使用范围(是否所有业务地区)
                "applyAllchannel": true,// 使用范围(是否所有渠道)
                "exchCouponEnabled": true,//是否兑换卡券
                "exchtacticCoupons": [
                ],
                "exchServiceEnabled": false,//是否兑换服务 ,
                "exchtacticSvrs": [
                    {
                    "groupId": 0,
                    "tacticId": 0,
                    "serviceId": 0,//服务ID(对应商品SKUID) ,
                    "integral": 0,
                    "isDeleted": false,
                    "id": 0
                    }
                ],
                "exchProductEnabled":false,//是否兑换商品 ,
                "exchtacticPros": [
                    {
                    "groupId": 0,
                    "tacticId": 0,
                    "skuId": 0,
                    "integral": 0,
                    "isDeleted": false,
                    "id": 0
                    }
                ],
                "status": 0,
                "remark": "",
                "id": 0,
                "isDeleted":false
                },
          
            checkList:[],
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
            backId:'',
            memberLevel:'',//全部会员等级
            i:0,
            attrShow:true,
            attrShowSer:true,
            attrShowGood:true,
            Coupon:[],//卡券,
            one:1,
            //--------------------------------
            Denomination:[],
            couponId:'',//卡券id
            integral:"",//积分
            integralInput:"",//弹出框输入的积分
            radio:'addData.applyAllGrade',
            backId:'',
            current:0,
            changeTimes:0,
            changeTime:0,
            CardAr:[],
            groupId:"",
            ifModifyCard:false,
            ifModifyCheck:false,
            ischeck:[]
        }
        
    },
    validators: {
        'addData.tacticName': function (value) {//名称
            return this.Validator.value(value).required();
        },
        'addData.tacticCode': function (value) {//面额
                return this.Validator.value(value).required();
        },
        // 'maxTimes': function (value) {//限送次数
        //     if(this.maxTimesRadio=='1'){
        //         return this.Validator.value(value).required();
        //     }
        // },
        'checkList': function (value) {//会员等级
            if(this.radio=='addData.exchtacticGrades'){
                return this.Validator.value(value).required();
            }
        },
        'chooseDate': function (value) {//生效时间
                return this.Validator.value(value).required();
        },
        'stockNum': function (value) {//库存
            if(this.radioStock=='2'){
                return this.Validator.value(value).required();
            }
        },

    },       
    created(){
        this.loadData();
        this.loadMemberLevel();//获取会员等级
        this.loadCoupon();//获取卡券
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
                }else{
                    _this.buttonGroup[1].disabled = false;
                    _this.buttonGroup[2].disabled = false;
                    _this.buttonGroup[3].disabled = true;
                    _this.buttonGroup[4].disabled = true;
                    _this.buttonGroup[5].disabled = true;
                }
             }
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
        //卡券
        CardAr:{
             handler:function(val,oldVal){
                let _this = this;
                if(!_this.ifModifyCard){
                    _this.ifModifyCard = !_this.ifModifyCard;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,
        },
        //会员等级
        checkList:{
              handler:function(val,oldVal){
                let _this = this;
                if(!_this.ifModifyCheck){
                    _this.ifModifyCheck = !_this.ifModifyCheck;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,
        },
        //范围
        rangeTableData:{
              handler:function(val,oldVal){
                let _this=this;
                if(!_this.secondModify){ 
                    _this.secondModify=!_this.secondModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        //会员等级
        radio:{
            handler:function(val,oldVal){
                let _this=this;
                if(!_this.thirdModify){ 
                    _this.thirdModify=!_this.thirdModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,

        }

    },
    methods:{
        loadMemberLevel(){
            let _this=this;
            //获取会员等级
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                // console.log(res.result);
                _this.memberLevel=res.result;
                console.log(_this.memberLevel)
                $.each(res.result,function(i,val){
                    _this.memberLevels.push(val.gradeName)
                });
            },function(res){
                console.log('err'+res)
            });

            //获取状态枚举
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'orderStatus'}).then(function(res){
                _this.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
         loadData(){
            let _this=this;
           _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetExchById',{ID:_this.$route.params.id}).then(function(res){
                _this.addData=res.result;
                _this.groupId=res.result.groupId;
                _this.chooseDate.push(res.result.effectiveStart);
                _this.chooseDate.push(res.result.effectiveEnd);
                console.log(_this.addData)
                let c=res.result.exchtacticCoupons;
            
                //选择卡券
               if(res.result.exchtacticCoupons!=null&&res.result.exchCouponEnabled==true){
                for(let i=0;i<c.length;i++){
                    let obj = {couponTypeidTValue:'',couponId:'',couponName:''}
                  obj.couponTypeidTValue=c[i].integral;
                  obj.couponId=c[i].couponId;
                  obj.couponName=c[i].couponName
                  obj.id = c[i].id
                   _this.CardAr.push(obj);
                }
               }
                 //判断是否是指定会员等级
                 _this.ischeck = res.result.exchtacticGrades;
                if(res.result.exchtacticGrades!=null&&res.result.applyAllGrade==false){
                     _this.radio='addData.exchtacticGrades',
                    $.each(res.result.exchtacticGrades,function(i,val){
                       _this.checkList.push(val.memberGradeName);
                    }) }
                    //   console.log( _this.checkList,res.result.exchtacticGrades)       
                 //判断是否指定范围
                // if(res.result.exchtacticOus.length!=0){
                //     let ss={
                //         'areaName':"",
                //         'opAreaId':'',
                //         'ouName':"",
                //         'qudaoNames':"",
                //         'id':"",  
                //         'id1':'',
                //         'id2':'',
                //         'id3':''
                //     }
                //     $.each(res.result.exchtacticOus,function(i,val){
                //         _this.rangeTableData.push(ss);
                //         _this.rangeTableData[i].ouName=val.ouId_OuName;
                //         _this.rangeTableData[i].id1=val.id;
                //         _this.rangeTableData[i].areaName=val.crmCouponAreaapplys;
                //         if(val.crmCouponAreaapplys.length==0){
                //             Vue.set(_this.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                //         }
                //         _this.rangeTableData[i].qudaoNames=val.crmCouponChannelapplys;
                //         _this.rangeTableData[i].id=val.ouId;
                //         _this.ouIds.push(val.ouId);
                        
                //     })

                // }
               
                // console.log( _this.changeTimes)
                // _this.thirdModify=false;
           },function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;            
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
           })
        },
        CouponBG(index){
            this.current=index;
        },
        addCoupon(){
           this.dialogCouponVisible=true;
        },
        cancelCard:function(index){
            let self = this;
            self.CardAr.splice(index,1);
        },
        sure(){
          let couponName='';
          let couponTypeidTValue;
          let couponId='';
          console.log(this.Coupon)
            for(let i in this.Coupon){
                if(this.couponId==this.Coupon[i].id){
                    console.log(111)
                    couponName = this.Coupon[i].couponName;
                    couponId = this.Coupon[i].id;
                    // couponTypeidTValue=this.Coupon[i].couponTypeidTValue
                    couponTypeidTValue= this.integralInput;
                }
                      
            }
            // console.log(this.CardAr)
            if(this.CardAr.length === 0){
                this.CardAr.push({couponName:couponName,couponTypeidTValue:couponTypeidTValue,couponId:couponId,id:''});
            }else{
                console.log(this.CardAr)
                for(let i=0;i<this.CardAr.length;i++){
                    if(this.CardAr[i].couponName == couponName){
                        this.CardAr[i].couponTypeidTValue = couponTypeidTValue;
                        this.dialogCouponVisible=false;  
                        return;
                    }
                }
                this.CardAr.push({couponName:couponName,couponTypeidTValue:couponTypeidTValue,couponId:couponId,id:''})
             }
                this.dialogCouponVisible=false;
           
        },
        CardDetail(){
            // this.statusChangeParam=this.memberId;
           ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,this.statusChangeParam,this);
            this.dialogCouponVisible=false;
            
        },
        //按钮组点击事件---------------------
        btnClick(btn){
            let _this = this;
            if(btn=="返回"){
                _this.isback();
            }else if(btn=="新增"){
                _this.goDetail();
            }else if(btn=="删除"){   
                _this.isDelPage();
            }else if(btn=="保存"){
                _this.save("save")
            }else if(btn=="保存并新增"){
                _this.save("saveAdd")
            }else if(btn=="取消"){
                _this.isCancel();
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
        isCancel(){
             let _this=this;
            if(_this.ifModify){
                _this.dialogSetting.dialogName='cancelDialog'
                _this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;
            }else{
                _this.back();
            }
           
        },
        back(){
            this.$store.state.url='/convertibilityStrategy/convertibilityStrategyList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由    
        },
        loadCoupon(){
            let _this=this;
            //获取卡券
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/Get_Coupon_library').then(function(res){
                console.log(res.result);
                _this.Coupon=res.result;
                // console.log(_this.Coupon)
            },function(res){
                console.log('err'+res)
            });
        },
        save(saveType){
            let _this=this;
            $('.tipsWrapper').css({display:'block'});
             _this.$validate().then(function(success){
                if(success){
                    // alert(22)
                    $('.tipsWrapper').css({display:'none'});
                        _this.addData.effectiveStart=_this.chooseDate[0];
                        _this.addData.effectiveEnd=_this.chooseDate[1];
                 //选择指定会员等级
                    if(_this.radio=='addData.exchtacticGrades'){
                       _this.addData.exchtacticGrades=[]; 
                        for(let j=0;j<_this.checkList.length;j++){
                            let isa = true;
                            if(_this.ischeck!=null){
                                for(let i=0;i<_this.ischeck.length;i++){
                                if(_this.checkList[j] == _this.ischeck[i].memberGradeName){
                                    isa = false
                                }
                            }
                               if(isa){//新增会员数据
                                for(let k=0;k<_this.memberLevel.length;k++){
                                    if(_this.checkList[j] == _this.memberLevel[k].gradeName){
                                        let couponGrade= {
                                            "groupId": 0,
                                            "tacticId": _this.addData.id,
                                            "memberGradeId": _this.memberLevel[k].id,
                                            "memberGradeName":_this.checkList[j],
                                            "id": 0
                                        }
                                       _this.addData.exchtacticGrades.push(couponGrade); 
                                    }
                                }
                            }
                              for(let i=0;i<_this.ischeck.length;i++){
                                let isb = true;
                                for(let j=0;j<_this.checkList.length;j++){
                                    if(_this.checkList[j] == _this.ischeck[i].memberGradeName){
                                        isb = false
                                    }
                                }
                                if(!isb){//删除会员数据
                                _this.addData.exchtacticGrades.push(_this.ischeck[i]); 
                                
                                }
                            }
                        }else{
                            $.each(_this.checkList,function(i,val){
                            $.each(_this.memberLevel,function(index,value){ 
                                console.log(_this.memberLevel,)                         
                                if(val==value.gradeName){
                                      let couponGrade= {
                                                "groupId": 0,
                                                "tacticId": _this.addData.id,
                                                "memberGradeId": '',
                                                "memberGradeName":'',
                                                "id": 0
                                                }
                                    _this.addData.exchtacticGrades.push(couponGrade);
                                    _this.addData.exchtacticGrades[_this.i].memberGradeId=value.id;
                                    _this.addData.exchtacticGrades[_this.i].memberGradeName=value.gradeName;   
                                    _this.i++;
                                }
                            })
                          })
                        }

                        }
                        _this.addData.applyAllGrade=false;
                    }
                    if(_this.radio=='addData.applyAllGrade'){
                         _this.addData.applyAllGrade=true;
                        _this.addData.exchtacticGrades=[]; 
                    }
                  if(_this.addData.exchCouponEnabled){
                      
                      let arr1 = [];
                      for(let i=0;i<_this.CardAr.length;i++){
                          if(_this.CardAr[i].id != ''){
                            let obj1 = {groupId:_this.groupId,
                            tacticId: _this.addData.id,
                            isDeleted:false,
                            couponId:_this.CardAr[i].couponId,
                            integral:_this.CardAr[i].couponTypeidTValue,
                            id:_this.CardAr[i].id
                            }
                            arr1.push(obj1)
                          }else{
                             let obj2 = {groupId:_this.groupId,
                            tacticId: _this.addData.id,
                            isDeleted:false,
                            couponId:_this.CardAr[i].couponId,
                            integral:_this.CardAr[i].couponTypeidTValue} 
                            arr1.push(obj2)
                          }
                      }
                      _this.addData.exchtacticCoupons = arr1;
                    //   _this.addData.exchtacticCoupons = arr;
                    console.log(_this.addData.exchtacticGrades)
                    // return;
                       _this.$axios.puts(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/Update',_this.addData).then(function(res){
                        _this.open('修改成功','el-icon-circle-check','successERP');
                        if(saveType=="save"){
                            _this.changeTimes=false;
                            _this.buttonGroup[1].disabled = false;
                            _this.buttonGroup[2].disabled = false;
                            _this.buttonGroup[3].disabled = true;
                            _this.buttonGroup[4].disabled = true;
                            _this.buttonGroup[5].disabled = true;
                        }else if(saveType=="saveAdd"){
                          _this.goDetail();
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
                    // alert(223)
                    
                 

              }
                   
            })
           
        },
        //---跳转修改页------------------------------------------------
        goDetail:function(id){//点击跳转修改页modify
            this.$store.state.url='/convertibilityStrategy/convertibilityStrategyDetail/';
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        loadOuTreeAll(){
            let _this=this;
            //组织
            _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType')
            .then(function(res){
                // console.log(res)
                _this.ouTreeDataRight=res.result;
                _this.expand.expandId_dialogOu=_this.defauleExpandTree(res.result,'id')
            },function(res){
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
                // console.log(res)
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
            _this.secondModify=false;
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
            }
             _this.rangeTableData[_this.index].areaName=_this.areaNames;
             _this.$refs.optree.setCheckedNodes(_this.opCheckAll);

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
                        "channelId_ShopName": "",
                        "channelTypeidTValue": "",
                        "channelId": 0                
                        }
                _this.selectData.push(ss);
                _this.selectData[i].channelId_ShopName=val.shopName;
                _this.selectData[i].channelTypeidTValue=val.shopName;
                _this.selectData[i].channelId=val.id;
                _this.selectData[i].channelTypeid=val.shopTypeid;
                _this.selectData[i].opAreaId=val.opAreaId
                _this.selectData[i].ouId=val.ouId
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
            console.log(row)
            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            // console.log(row,_this.rangeTableData,_this.index)


            _this.dialogRangeQu=true;
        },

        delCheckOu(row){//删除表格数据
            let _this=this;
            let indexs=null;
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
         isDelPage(){
            let _this=this;
            _this.dialogSetting.dialogName='isDelPage'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogVisible=true;
        },
          showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message='错误提示'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogVisible=true;
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
                    this.Cancel();
                    this.dialogVisible=false;
                    
                }else if(parmas.dialogName=="isDelPage"){
                    this.delPage();
                    this.dialogVisible=false;
                    
                }else if(parmas.dialogName=="showErMsgDialog"){
                    this.dialogVisible=false;
                    
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
        Cancel(){
            // this.addData={},
            this.chooseDate=[],
            this.CardAr.length=0;
            this.validation.reset();
            this.loadData();
            this.ifModify=false;
        },
        delPage(){
             let _this=this;
            _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/Delete',{ID:_this.$route.params.id}).then(function(res){
                 _this.open('删除成功','el-icon-circle-check','successERP');
                _this.dialogVisible=false;
                _this.back();
            },function(res){
                _this.showErMsgDialog(res.error.message,res.error.details)
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
.convertibility-strategy-detail .bgradio{
    width: calc(100% - 84px);
}
.convertibility-strategy-detail .bgradio .el-input{
    display: inline-block;
    width: 80px;
    float: none;
}

.convertibility-strategy-detail .bgradio .radio-span{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}
.convertibility-strategy-detail .gray{
    font-size: 12px;
    color: #cccccc;
    display: inline-block;
    height: 35px;
    line-height: 35px;
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
.convertibility-strategy-detail .showGoodsDialog{
    position: absolute;
    right: 20px;
}
.convertibility-strategy-detail .sizeNameBtn{
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
.convertibility-strategy-detail .sizeNameWrapper{
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
.convertibility-strategy-detail .sizeNameWrapper:hover .delSize{
    display: block;
}
.convertibility-strategy-detail .sizeNameWrapper .delSize{
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
.convertibility-strategy-detail .relative{
    position: relative;
}

</style>
<style>
.convertibility-strategy-detail .bgradio .el-radio__label{
    display:inline-block;
}
.convertibility-strategy-detail .bgradio .el-input .el-input__inner{
    height: 32px;
}
.convertibility-strategy-detail .bgradio .el-radio{
    width:auto;
}
.convertibility-strategy-detail .bgcolor .el-date-editor input{
    padding:0;
}
.convertibility-strategy-detail .long{
    width: 520px;
}
.convertibility-strategy-detail .el-range-separator{
    background-color:rgb(194, 202, 216)
}
.convertibility-strategy-detail .smallRangeDate{
    height: 35px;
}
.convertibility-strategy-detail .smallRangeDate .el-input__inner{
    height: 35px;
}
.convertibility-strategy-detail .smallRangeDate .el-range-separator{
    line-height: 35px;
}
.convertibility-strategy-detail .el-range-editor.el-input__inner{
    padding:0;
}
.convertibility-strategy-detail .el-date-editor .el-range__icon {
    padding-left:5px
}
.convertibility-strategy-detail .tabZoo .el-tabs__item{
    color:#303133;
}
.convertibility-strategy-detail .tabZoo .el-tabs__nav-scroll{
    background-color:#fff;
}
.convertibility-strategy-detail .header-title{
    font-size: 16px;
    border-bottom: 3px solid #00CACA;
    padding: 5px 1px;
    float: left;
    text-indent:10px;
    line-height:30px;
}
.convertibility-strategy-detail .showBtn{
    float:right;
    cursor: pointer;
    font-size: 12px;
    padding-top: 10px;
}
.convertibility-strategy-detail .showBtn,.convertibility-strategy-detail .header-title{
     display: inline-block;
     background-color:#fff;
}
.convertibility-strategy-detail  .coupon-title{
   height: 42px;
   border:1px solid #f2f2f2;
}
.convertibility-strategy-detail .Coupon{
    border:1px solid rgba(51, 204, 204, 1);
    position: relative;
}
.convertibility-strategy-detail .Coupon ,.add-coupon{
    width:139px;
    height: 78px;
    float: left;
    margin:15px;
    padding:10px;
    border-radius:3px;
    cursor: pointer;

}
.convertibility-strategy-detail .add-coupon{
     border:1px solid #ccc;
     line-height:76px;
     text-align:center;
    background-color: rgba(242, 242, 242, 1);
    
}
.convertibility-strategy-detail .Coupon p{
    font-size:14px;
     height: 40px;
}
.convertibility-strategy-detail .Coupon .score{
       font-size:12px;
       line-height:50px;
       text-align:right; 
}
.convertibility-strategy-detail .Coupon .score input{
    width:30px;
    height: 10px;
    font-size:12px;
    color:red;
    border:1px solid #ccc;
    outline:none;
    
}
.convertibility-strategy-detail .dialog-coupon .el-dialog{
    border-radius:0px;
}
.convertibility-strategy-detail .dialog-coupon .el-dialog__header{
    border:none;
}
.convertibility-strategy-detail .dialog-coupon a{
    color:#33CCCC;
    cursor: pointer;
}
.convertibility-strategy-detail .dialog-coupon [class*=el-col-]{
    line-height:40px;
    text-align:center;
}
.convertibility-strategy-detail .Coupon i {
    position: absolute;
    right: -4px;
    top: -4px;
    color: #f66;
    cursor: pointer;
}
.greenbg{
    background-color:#00CACA;
    color:#fff;
}
</style>





