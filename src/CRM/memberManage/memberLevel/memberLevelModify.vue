<template>
    <div class="memberLevel-detail">
        <el-row class="bb1 pb5 bg-white">
            <el-col :span="24">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        </el-row>

        <el-row class="bb1 pb10 bg-white">
            <div class="tipsWrapper">
                <div class="errorTips">
                    <p class="msgDetail">
                        <span :class="{block : !validation.hasError('allData.gradeCode')}">
                                编码{{ validation.firstError('allData.gradeCode') }},
                        </span>
                        <span :class="{block : !validation.hasError('allData.gradeName')}">
                                等级名称{{ validation.firstError('allData.gradeName') }},
                        </span>
                        <span :class="{block : !validation.hasError('memberGradeValidTValue')}">
                                有效期{{ validation.firstError('memberGradeValidTValue') }},
                        </span>
                        <span :class="{block : !validation.hasError('addData.memberGrade_MainTable.memberLevelid')}">
                                级别{{ validation.firstError('addData.memberGrade_MainTable.memberLevelid') }},
                        </span>
                        <span :class="{block : !validation.hasError('allData.discount')}">
                                消费折扣{{ validation.firstError('allData.discount') }},
                        </span>
                        <span :class="{block : !validation.hasError('allData.expdAmount')}">
                                消费金额{{ validation.firstError('allData.expdAmount')}},
                        </span>
                        <span :class="{block : !validation.hasError('allData.expdPresentIntegral')}">
                                消费兑换积分{{ validation.firstError('allData.expdPresentIntegral') }},
                        </span>
                        <span :class="{block : !validation.hasError('allData.depositAmount')}">
                                储值金额{{ validation.firstError('allData.depositAmount') }},
                        </span>
                        <span :class="{block : !validation.hasError('allData.depositPresentIntegral')}">
                                储值兑换积分{{ validation.firstError('allData.depositPresentIntegral') }}
                        </span>

                    </p>
                </div>
            </div>

            <el-col class="left-box mt10">

                <el-row class="member-level-bgcolor">
                    <div class="bgcolor">
                        <label><small>*</small>编码</label>
                        <el-input @focus="showErrprTips" placeholder="" v-model="allData.gradeCode" :class="{redBorder : validation.hasError('allData.gradeCode')}"></el-input>
                    </div>
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="bgcolor">
                        <label><small>*</small>等级名称</label>
                        <el-input @focus="showErrprTips" placeholder="" v-model="allData.gradeName" :class="{redBorder : validation.hasError('allData.gradeName')}"></el-input>
                    </div>
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="bgcolor bgcolor-select">
                        <label><small>*</small>有效期</label>

                        <el-select v-model="allData.memberGradeValid" 
                                    class="inline-block-need card-id"
                                    placeholder="" @change="setValid">
                            <el-option v-for="item in idAr" 
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>
                        <el-input v-model="memberGradeValidTValue" @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.gradeName')}"
                                  placeholder=""
                                  class="card-input"></el-input>
                    </div>    
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="bgcolor">
                        <label><small>*</small>级别</label>
                        <el-select v-model="allData.memberLevelid"
                        @focus="showErrprTips" :class="{redBorder : validation.hasError('allData.memberLevelid')}" clearable 
                                    placeholder="">
                            <el-option v-for="item in levelAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>                    
                    </div>
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="bgcolor">
                        <label><small>*</small>消费折扣</label>
                        <el-input placeholder="" @focus="showErrprTips" v-model="allData.discount" type="number" step="0.1" min="0" max="1" :class="{redBorder : validation.hasError('allData.discount')}"></el-input>
                    </div>
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="bgcolor">
                        <label>状态</label>
                        <el-select v-model="allData.status" clearable 
                                    placeholder="">
                            <el-option v-for="item in statusAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>                    
                    </div>                     
                </el-row>
                <el-row class="member-level-bgcolor">
                    <div class="remark bgcolor">
                        <label>备注</label>
                        <el-input placeholder="" v-model="allData.remark"></el-input>
                    </div>             
                </el-row>




                <el-row>
                    <el-col :span="12" :offset="1">
                        <el-checkbox v-model="allData.updownEnable">允许升降级</el-checkbox>
                        <el-checkbox v-model="allData.isDefault">注册默认等级</el-checkbox>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="upload-avatar mt10">
                <div class="upload_img">
                    <div class="upload_body">
                        <div class="upload_body_center">
                            <img v-if="url" class="upload_showImg" :src="url" @click="fileClick">
                            <i v-else class="el-icon-plus avatar-uploader-icon"  @click="fileClick"></i>

                        </div>
                    </div>

                    <input  name="file"
                            accept="image/png, image/jpeg, image/jpg" 
                            @change="uploadpic($event)" 
                            type="file" 
                            class="upload_file" 
                            style="display: none"/>
                </div>

            </el-col>
        </el-row>

        <el-row class="bb1 bg-white integral">
            <el-col :span="24">
                <div class="integral-row">
                    <label>积分规则</label>
                    <div class="left">消费&nbsp;<el-input type="number" min=0 @focus="showErrprTips" v-model="allData.expdAmount" :class="{redBorder : validation.hasError('allData.expdAmount')}"></el-input>&nbsp;元
                    &nbsp;&nbsp;换&nbsp;<el-input @focus="showErrprTips" type="number" min=0 v-model="allData.expdPresentIntegral" :class="{redBorder : validation.hasError('allData.expdPresentIntegral')}"></el-input>&nbsp;积分</div>
                </div>  
            </el-col>
             <el-col :span="24">
                <div class="integral-row">
                    <label></label>
                    储值&nbsp;<el-input @focus="showErrprTips" type="number" min=0 v-model="allData.depositAmount" :class="{redBorder : validation.hasError('allData.depositAmount')}"></el-input>&nbsp;元
                    &nbsp;&nbsp;换&nbsp;<el-input @focus="showErrprTips" type="number" min=0 v-model="allData.depositPresentIntegral" :class="{redBorder : validation.hasError('allData.depositPresentIntegral')}"></el-input>&nbsp;积分
                </div>  
            </el-col> 
        </el-row>

        <el-row class="pt5 bb1 bg-white">
            <div class="bgcolor row" style="width:500px;">
                <label>使用范围</label>
                <el-radio v-model='radio' label="1">不限制</el-radio>
                <el-radio v-model='radio' label="2">指定范围</el-radio>   
            </div>    
        </el-row>
        <el-row class="mt10" v-show="rangeShow">
            <el-col :span="24" class="bt1 pt5 bg-white">
                <span class="border-green">使用范围</span>
                <button class="erp_bt bt_add"  @click="dialogRangeShow">
                    <div class="btImg">
                        <img src="../../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">选取</span>
                </button>
                <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>

            </el-col>
            <el-col :span="24" v-show="ifShow" class="bg-white pr10 pl10">
                <el-table :data="rangeTableData" border style="width: 100%" stripe>
                    <el-table-column label="组织" width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.ouName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="业务地区"  class="relative">
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
                <span>选取渠道 </span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input"
                            v-model="queryParams.shopName"
                            @keyup="searchQu"
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




        <el-row class="mt10 bt1 pl10  bg-white">  
            <el-col :span="22" class="auditInformation getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="allData.createdBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input :disabled="true" v-model="allData.createdTime"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="allData.modifiedBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input :disabled="true" v-model="allData.modifiedTime"></el-input>                       
                    </div>
                    
                </div>                                  
            </el-col>
        </el-row>

        <!-- dialog注册默认等级验证 -->
        <el-dialog :visible.sync="dialogifDefaultConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">已存在注册默认等级是否需重新设置?</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="ifDefaultSure">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="ifDefaultCancel">取 消</button>
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
import Vue from 'vue';
import config from '../../../../static/config';
export default {
    name:'customerInfor',
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
            radio:"1",
            dialogRange:false,//使用组织弹框
            dialogRangeOp:false,//业务地区弹框
            imageUrl: '',
            setTimeShow:false,
            valid:'',//有效期
            allData:'',
            modifyData:{
            'memberGrade_MainTable':{},
            'ouapply_ChildTable':[]
            },
            backCancel:'',//判断信息提示确定的点击事件
            rangeShow:false,
            ifShow:true,
            statusAr:[],//状态枚举
            levelAr:[],//级别枚举
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
            dialogifDefaultConfirm:false,//验证注册默认等级弹框
            otherModifyData:{//前一个注册默认等级保存数据
            'memberGrade_MainTable':{},
            'ouapply_ChildTable':[]
            },
            otherAllData:[],//前一个注册默认等级数据
            idAr:[{itemName:'永久有效',itemValue:0},{itemName:'月',itemValue:2}],
            memberGradeValidTValue:'',//有效期值



          
        }
    },
    created(){
        this.loadData();
        this.loadOuTreeAll();
        this.getAllOulength();
        this.getAllOplength();
    },
    validators: {
        'allData.gradeCode': function (value) {
            return this.Validator.value(value).required();
        },
        'allData.gradeName': function (value) {
            return this.Validator.value(value).required();
        },
        'memberGradeValidTValue': function (value) {
            if(this.allData.memberGradeValid=='0'){
                return this.Validator.value(value).required();
            }else if(this.allData.memberGradeValid=='2'){
                return this.Validator.value(value).required().integer();
            }           
        },
        'allData.memberLevelid': function (value) {
            return this.Validator.value(value).required();
        },
        'allData.discount': function (value) {
            return this.Validator.value(value).required().maxLength(8).lessThanOrEqualTo(1).greaterThanOrEqualTo(0);
        },
        'allData.expdAmount': function (value) {
            return this.Validator.value(value).required().integer();
        },
        'allData.expdPresentIntegral': function (value) {
            return this.Validator.value(value).required().integer();
        },
        'allData.depositAmount': function (value) {
            return this.Validator.value(value).required().integer();
        },
        'allData.depositPresentIntegral': function (value) {
            return this.Validator.value(value).required().integer();
        },

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
        allData:{
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
        rangeTableData:{
            handler:function(val,oldVal){
                let _this = this;
                if(!_this.firstModifyFw&&oldVal.length!=0){
                    _this.firstModifyFw = !_this.firstModifyFw;
                }else{
                    _this.ifModify = true;
                }
            },
            deep:true,            
        },
        radio:{
            handler:function(val,oldVal){
                let _this = this;
                if(val=='2'){
                    _this.rangeShow = true;
                }else{
                    _this.rangeShow = false;
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
        //---获取数据--------------------------------------------
        loadData:function(){
            let _this = this;
            if(_this.$route.params.id!='default'){
                _this.firstModify = false;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/Get',{id:_this.$route.params.id}).then(function(res){
                    console.log(res.result)
                    _this.allData=res.result;
                    _this.url=_this.allData.ico;
                    if(_this.allData.memberGradeValid=='0'){
                        _this.memberGradeValidTValue ='——永久有效——';
                        //_this.valid='—不限制—';
                    }else{
                        _this.memberGradeValidTValue=_this.allData.effectiveValue;
                    }
                    //判断是否有等级
                    if(res.result.memberLevelid==0){
                        _this.allData.memberLevelid='';
                    }
                    //判断是否指定范围
                    if(res.result.ouapply_ChildTable.length!=0){
                        _this.radio='2';
                        _this.rangeShow=true;

                        $.each(res.result.ouapply_ChildTable,function(i,val){
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
                            _this.rangeTableData.push(ss);
                            _this.rangeTableData[i].ouName=val.ouId_OuName;
                            _this.rangeTableData[i].id1=val.id;
                            _this.rangeTableData[i].areaName=val.areaapply_ChildTable;
                            if(val.areaapply_ChildTable.length==0){
                                Vue.set(_this.rangeTableData[i],'areaName',[{"opAreaId_AreaName":"全部业务地区"}]);
                            }
                            _this.rangeTableData[i].qudaoNames=val.channelapply_ChildTable;
                            _this.rangeTableData[i].id=val.ouId;
                            _this.ouIds.push(val.ouId);
                            
                        })

                    }
                    console.log(_this.rangeTableData)
                    //审计信息时间
                    _this.allData.createdTime=_this.resdatetime(new Date(_this.allData.createdTime));
                    _this.allData.modifiedTime=_this.resdatetime(new Date(_this.allData.modifiedTime));
                    //console.log(_this.allData)
                    _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                        //console.log(res);
                        _this.statusAr = res.result;
                    },function(res){
                        console.log('err'+res)
                    });
                    _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Memberlevel'}).then(function(res){
                        //console.log(res);
                        _this.levelAr = res.result;
                    },function(res){
                        console.log('err'+res)
                    });

                })        

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
        searchQu:function(){
            let _this = this;
            _this.$axios.gets('/api/services/app/ShopManagement/GetAll',_this.queryParams).then(function(res){
                _this.$store.commit('Init_Table',res.result.items);
                let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.qudaoDialogListEachPage);
                _this.$store.commit('Init_pagination',totalPage);
                _this.$store.commit('Init_TotalCount',res.result.totalCount);
                _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
            })
        
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
                        "gradeId": 0,
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
                _this.areaNames[i].gradeId=_this.allData.gradeId;
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
                        "gradeId": 0,
                        "ouId": 0,
                        "opAreaId": 0,
                        "channelTypeid": 0,
                        "channelId_ShopName": "无",
                        'shopCode':"",
                        "channelId": 0                
                        }
                _this.selectData.push(ss);
                _this.selectData[i].channelId_ShopName=val.shopName;
                _this.selectData[i].channelTypeid=val.shopTypeid;
                _this.selectData[i].channelId=val.id;
                _this.selectData[i].opAreaId=val.opAreaId
                _this.selectData[i].ouId=val.ouId
                _this.selectData[i].groupId=_this.allData.groupId
                _this.selectData[i].gradeId=_this.allData.gradeId
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
            console.log(row)
            _this.opTreeDataRight=[];
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{ouId:row.id}).then(function(res){
                //console.log(res)
                _this.opTreeDataRight = res.result;
                if(res.result.length!=0){
                    _this.expandop.expandId_dialogOp=_this.defauleExpandTree(res.result,'id'); 
                }
               
            },function(res){
                console.log('err'+res)
            })
            _this.dialogRangeOp=true;
            $.each(_this.rangeTableData,function(i,val){
                if(val.id==row.id){
                    _this.index=i;
                }
            })
            if(_this.opTreeDataRight.length!=0){
            
                $.each(_this.rangeTableData[_this.index].areaName,function(j,jal){
                    _this.opIds.push(jal.opAreaId)
                })

                console.log(_this.opIds)
                setTimeout(function(){
                _this.$refs.optree.setCheckedKeys(_this.opIds);
                },200)
            }


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
                    mutilSeletion.shopCode=val.shopCode;
                    mutilSeletion.shopName=val.channelId_ShopName;
                   _this.mutilSeletions.array.push(mutilSeletion);
                   //console.log(_this.mutilSeletions.array)
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

        //---头像上传------------------
        uploadpic(e){
            var _this = this
            if($(e.target).val()!=''){
                let file = e.target.files[0]
                /* eslint-disable no-undef */
                let param = new FormData()  // 创建form对象
                param.append('files', file)  // 通过append向form对象添加数据
                param.append('chunk', '0') // 添加form表单中其他数据
                // console.log(1)
            _this.$axios.loadImg('/Home/UploadImage', param)
                .then(response => {
                    if(response.result.length==1){
                        let isSuccess=response.result[0]['isSuccess'];
                        if(isSuccess){
                        let imagePath=response.result[0]['imagePath'];
                        let getBaseURL=_this.$axios.getBaseURL();
                        _this.url=getBaseURL+imagePath
                        console.log(_this.url)
                        }else{
                            alert('上传失败')
                        }
                    }else{
                        alert('上传失败')
                    }
                    $(e.target).val('')
                },response => {
                    console.log(response)
                    alert('上传失败')
                    $(e.target).val('')
                })
            }
        },
        fileClick(e) {
            $(e.target).parents('.upload_img').find('.upload_file').click()
        },
        fileDel(e) {
            // $(e.target).parents('.upload_img').find('input').val('')
            this.url="";

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
   
        //按钮组点击事件---------------------
        btnClick(btn){
            let self = this;
            if(btn=="返回"){
                self.isBack();
            }else if(btn=="新增"){
                self.$store.state.url='/memberLevel/memberLevelDetail/default'
                self.$router.push({path:self.$store.state.url})//点击切换路由
            }else if(btn=="删除"){
                let _this = this;
                _this.dialogSetting.dialogName='delDialog'
                _this.dialogSetting.message="确定删除？";
                _this.dialogSetting.dialogType="confirm";
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                _this.dialogVisible=true;
            }else if(btn=="保存"){
                self.save("save");
            }else if(btn=="保存并新增"){
                self.saveAdd();
            }else if(btn=="取消"){
                self.cancel();
            }
        },
        //---保存数据--------------------------------------------------       
        save:function(saveType){//点击保存创建客户资料
            let _this = this;
            $('.tipsWrapper').css({display:'block'});
            _this.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    //验证注册默认等级唯一
                    if(_this.allData.isDefault==true){
                        _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/GetDefaultMemberGrade').then(function(res){
                            _this.otherAllData=res.result;
                            if(res.result != null && _this.$route.params.id!=res.result.id){
                                console.log(_this.otherAllData)
                                _this.otherModifyData.memberGrade_MainTable.id=_this.otherAllData.id;
                                _this.otherModifyData.memberGrade_MainTable.groupId=_this.otherAllData.groupId;
                                _this.otherModifyData.memberGrade_MainTable.gradeCode=_this.otherAllData.gradeCode;
                                _this.otherModifyData.memberGrade_MainTable.gradeName=_this.otherAllData.gradeName;
                                _this.otherModifyData.memberGrade_MainTable.memberLevelid=_this.otherAllData.memberLevelid;
                                _this.otherModifyData.memberGrade_MainTable.memberGradeValid=_this.otherAllData.memberGradeValid;
                                _this.otherModifyData.memberGrade_MainTable.effectiveValue  =_this.otherAllData.effectiveValue;
                                _this.otherModifyData.memberGrade_MainTable.ico=_this.otherAllData.ico;
                                _this.otherModifyData.memberGrade_MainTable.expdAmount=_this.otherAllData.expdAmount;
                                _this.otherModifyData.memberGrade_MainTable.expdPresentIntegral =_this.otherAllData.expdPresentIntegral;
                                _this.otherModifyData.memberGrade_MainTable.depositAmount  =_this.otherAllData.depositAmount;
                                _this.otherModifyData.memberGrade_MainTable.depositPresentIntegral  =_this.otherAllData.depositPresentIntegral;
                                _this.otherModifyData.memberGrade_MainTable.discount=_this.otherAllData.discount;
                                _this.otherModifyData.memberGrade_MainTable.updownEnable=_this.otherAllData.updownEnable;
                                _this.otherModifyData.memberGrade_MainTable.isDefault=false;
                                _this.otherModifyData.memberGrade_MainTable.applyAllOu=_this.otherAllData.applyAllOu;
                                _this.otherModifyData.memberGrade_MainTable.applyAllArea=_this.otherAllData.applyAllArea;
                                _this.otherModifyData.memberGrade_MainTable.applyAllChannel=_this.otherAllData.applyAllChannel;
                                _this.otherModifyData.memberGrade_MainTable.status=_this.otherAllData.status;
                                _this.otherModifyData.memberGrade_MainTable.remark=_this.otherAllData.remark;
                                _this.otherModifyData.memberGrade_MainTable.createdBy=_this.otherAllData.createdBy;
                                _this.otherModifyData.memberGrade_MainTable.createdTime=_this.otherAllData.createdTime;
                                _this.otherModifyData.memberGrade_MainTable.modifiedBy=_this.otherAllData.modifiedBy;
                                _this.otherModifyData.memberGrade_MainTable.modifiedTime=_this.otherAllData.modifiedTime;
                                if(_this.otherAllData.ouapply_ChildTable==null){
                                    _this.otherModifyData.ouapply_ChildTable=[];
                                }else{
                                    _this.otherModifyData.ouapply_ChildTable=_this.otherAllData.ouapply_ChildTable;
                                }

                                _this.dialogifDefaultConfirm=true;
                            }else{
                                _this.saveData(saveType);
                            }
                        },function(err){
                            console.log(err);
                             _this.saveData(saveType);
                        });                    
                        
                    
                    }else{
                        _this.saveData(saveType);
                    }
                }
            })

        },
        saveData(saveType){
            let _this=this;
            console.log(saveType)
            //根据有效期设定有效开始时间和结束时间
            // var date=new Date();
            // if(_this.allData.memberGradeValid=='2'){
            //     _this.allData.effectiveStart=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            //     var month=date.getMonth()+parseInt(_this.allData.memberGradeValidTValue)+1; 
            //     var endyear='';
            //     if(month<12){
            //         _this.allData.effectiveEnd =date.getFullYear()+'-'+month+'-'+date.getDate()
            //     }else{
            //         endyear=date.getFullYear()+Math.floor(month/12);
            //         _this.allData.effectiveEnd =endyear+'-'+(month%12)+'-'+date.getDate()
            //     }
                    
            // }else{
            //     _this.allData.effectiveStart=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            //     _this.allData.effectiveEnd ='9999-12-31';
            // }

            _this.allData.ouapply_ChildTable=[];
            console.log( _this.allData,_this.rangeTableData)
            if(_this.rangeTableData.length!=0){
                $.each(_this.rangeTableData,function(i,val){
                    let oudata={
                            "id": 0,
                            "groupId": 0,
                            "gradeId": 0,
                            "ouId": 0,
                            "areaapply_ChildTable": [],
                            "channelapply_ChildTable": []
                            }
                    _this.allData.ouapply_ChildTable.push(oudata);   
                    _this.allData.ouapply_ChildTable[i].ouId_OuName=val.ouName;                      
                    _this.allData.ouapply_ChildTable[i].ouId=val.id;                      
                    _this.allData.ouapply_ChildTable[i].id=0;  
                    _this.allData.ouapply_ChildTable[i].groupId=_this.allData.groupId;  
                    _this.allData.ouapply_ChildTable[i].gradeId=_this.allData.id;  
                    
                    _this.allData.ouapply_ChildTable[i].areaapply_ChildTable=val.areaName;                      
                                
                    _this.allData.ouapply_ChildTable[i].channelapply_ChildTable=val.qudaoNames;   
                    
                })
            }else{
                _this.radio="1";
            }
            _this.modifyData.memberGrade_MainTable.id=_this.allData.id;
            _this.modifyData.memberGrade_MainTable.groupId=_this.allData.groupId;
            _this.modifyData.memberGrade_MainTable.gradeCode=_this.allData.gradeCode;
            _this.modifyData.memberGrade_MainTable.gradeName=_this.allData.gradeName;
            _this.modifyData.memberGrade_MainTable.memberLevelid=_this.allData.memberLevelid;
            _this.modifyData.memberGrade_MainTable.memberGradeValid=_this.allData.memberGradeValid;

            if(_this.radio=='1'){
                _this.modifyData.memberGrade_MainTable.applyAllOu=true;
                _this.modifyData.memberGrade_MainTable.applyAllArea=true;
                _this.modifyData.memberGrade_MainTable.applyAllChannel=true;
            }else{
                _this.modifyData.memberGrade_MainTable.applyAllOu=false;
                _this.modifyData.memberGrade_MainTable.applyAllArea=false;
                _this.modifyData.memberGrade_MainTable.applyAllChannel=false;
            }

            if(_this.allData.memberGradeValid=='2'){
                _this.modifyData.memberGrade_MainTable.effectiveValue =_this.memberGradeValidTValue;
            }else{
                _this.modifyData.memberGrade_MainTable.effectiveValue =0;
            }
            _this.modifyData.memberGrade_MainTable.ico=_this.url;
            _this.modifyData.memberGrade_MainTable.expdAmount=_this.allData.expdAmount;
            _this.modifyData.memberGrade_MainTable.expdPresentIntegral =_this.allData.expdPresentIntegral;
            _this.modifyData.memberGrade_MainTable.depositAmount  =_this.allData.depositAmount;
            _this.modifyData.memberGrade_MainTable.depositPresentIntegral  =_this.allData.depositPresentIntegral;            
            _this.modifyData.memberGrade_MainTable.discount=_this.allData.discount;
            _this.modifyData.memberGrade_MainTable.updownEnable=_this.allData.updownEnable;
            _this.modifyData.memberGrade_MainTable.isDefault=_this.allData.isDefault;
            _this.modifyData.memberGrade_MainTable.applyAllOu=_this.allData.applyAllOu;
            _this.modifyData.memberGrade_MainTable.applyAllArea=_this.allData.applyAllArea;
            _this.modifyData.memberGrade_MainTable.applyAllChannel=_this.allData.applyAllChannel;
            _this.modifyData.memberGrade_MainTable.status=_this.allData.status;
            _this.modifyData.memberGrade_MainTable.remark=_this.allData.remark;
            _this.modifyData.memberGrade_MainTable.createdBy=_this.allData.createdBy;
            _this.modifyData.memberGrade_MainTable.createdTime=_this.allData.createdTime;
            _this.modifyData.memberGrade_MainTable.modifiedBy=_this.allData.modifiedBy;
            _this.modifyData.memberGrade_MainTable.modifiedTime=_this.allData.modifiedTime;
            _this.modifyData.ouapply_ChildTable=_this.allData.ouapply_ChildTable;

            console.log(_this.modifyData)
            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/AggregateCreateOrUpdate',_this.modifyData).then(function(res){
            
                if(saveType=="saveadd"){
                    _this.$store.state.url='/memberLevel/memberLevelDetail/default'
                    _this.$router.push({path:_this.$store.state.url})
                }else if(saveType=="save"){
                    _this.ifModify=false;
                }
                _this.open('创建成功','el-icon-circle-check','successERP');
            },function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
                $('.tipsWrapper').css({display:'none'});
            });


        },
        resdatetime:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
        },   
        saveAdd(){
            this.save("saveadd")
        },
        //--------------------------------------------—
        isBack(){
            let self=this;
            if(self.ifModify){
                //self.dialogUserConfirm=true;
                self.dialogSetting.dialogName='backDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
            }else{
                self.back()
            }
            
        },
        back(){
            this.$store.state.url='/memberLevel/memberLevelList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
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
            }       
        },
        sureDoing:function(){
            let self = this;
            if(self.backCancel ==1){
                self.back();
            }else if(self.backCancel == 2){
                self.loadData();
                self.ifModify = false;
            }
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            //const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        setTime(){
            this.setTimeShow=!this.setTimeShow;
        },
        setValid(){
            let _this=this;

            if( _this.allData.memberGradeValid=='0'){
                _this.memberGradeValidTValue ='——永久有效——';
        
            }else if(_this.allData.memberGradeValid=='2'){
                _this.memberGradeValidTValue = '';
                
            }


        },
        //-----------------------------注册默认等级唯一性弹框--------
        ifDefaultCancel(){
            this.dialogifDefaultConfirm=false;
            this.allData.isDefault=false;
        },
        ifDefaultSure(){
            let _this=this;
            //确认替换注册默认等级，重新保存之前设定的注册默认等级
            console.log(_this.otherModifyData)
            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/AggregateCreateOrUpdate',_this.otherModifyData).then(function(res){
                _this.saveData();
                _this.dialogifDefaultConfirm=false;
            },function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
                _this.dialogifDefaultConfirm=false;

            });

        },
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
        },
        //------------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="backDialog"){//返回
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){//保存
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){//取消
                    this.sureDoing();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="delDialog"){//删除
                    let _this=this;
                    _this.$axios.deletes(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/Delete',{id:_this.$route.params.id}).then(function(res){
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
                    _this.dialogVisible=false;
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
.bg-white{
    background-color: white;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.bt1{
    border-top:1px solid #ccc;
}
.row{
    margin-bottom:0;
}
.back-icon .el-input{
    display:table;
}
.back-icon{
    position: relative;
    overflow: inherit;
}
.back-icon .iconfont{
    color:#dcdcdc;
    font-size:20px !important;
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
.avatar-uploader-icon{
    width:126px;
    height:170px;
}
.upload-avatar{
    width:220px;
}
.left-box{
    width: calc(100% - 220px)
}
.left-box .bgcolor{
    width:300px;
}
.left-box .remark{
    width:605px;
}
.upload-icon{
    height:30px;
    width:30px;
    border:1px solid #dcdcdc;
    border-radius:15px;
    text-align:center;
    line-height:30px;
    margin-right:20px;
}
.upload-icon .iconfont{
    color:#dcdcdc;
    font-size:20px !important;
}
.upload-right{
    float:right;
    height:176px;
}
.avatar-uploader{
    width:130px;
    float:left;
}
.select-content{
    width:204px;
    position: absolute;
    top:36px;
    right: 0;
    z-index: 100;
    background-color: white;  
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
    border-left: 1px solid #dcdcdc;
}
.select-content p{
    height: 36px;
    line-height: 36px;
    padding-left: 8px;
    background-color: #dcdcdc;
}
.select-content .f9{
    color: #999;
    background-color: white;
}
.select-content .month-num{
    width: 76px;
    margin-left: 10px;
    margin-right: 6px;
    text-align: center;
    color:#606266;
    font-size: 12px;
    height: 24px;
}
.select-content div{
    line-height: 36px;
}
.select-content .sign{
    display:inline-block;
    padding:0 6px;
}
.select-content .sign:hover{
    color: rgb(245, 94, 110);
}

.transfer_table, .transfer_btns{
    height: auto;
}
.memberLevel-detail .sizeNameBtn{
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
.memberLevel-detail .sizeNameWrapper{
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
.memberLevel-detail .sizeNameWrapper:hover .delSize{
    display: block;
}
.memberLevel-detail .sizeNameWrapper .delSize{
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
.memberLevel-detail .relative{
    position: relative;
}
.memberLevel-detail .showGoodsDialog{
    position: absolute;
    right: 20px;
    top: 10px;
}

.memberLevel-detail .upload_showImg{
    width: 126px;
    height: 170px;
}
.memberLevel-detail  .upload_body_center{
    width: 126px;
    height: 170px; 
    border: 1px solid #dcdcdc;
}


.member-level-bgcolor .bgcolor{
    width: 400px;
}



</style>
<style>
.el-radio__label{
    display:inline-block;
}
.avatar-uploader .el-upload{
   
    border:1px solid #d9d9d9;
    background-color:rgba(242, 242, 242, 1);
    border-radius:0;
}
.back-icon .el-input-group__append, .el-input-group__prepend{
    background-color: white;
    padding:0 10px;
}

.memberLevel-detail .bgcolor-select{
    height: 35px;
    font-size: 12px;
    margin-bottom: 15px;
    width: 60%;
    float: left;
    overflow: hidden;
    margin-right: 5px
}
.memberLevel-detail .bgcolor-select>label{
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    width: 84px;
    height: 100%;
    float: left;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal;
}
.memberLevel-detail .bgcolor-select .road .el-input{
    width: 205px;
}
.memberLevel-detail .bgcolor-select .road .el-input input{
    height: 35px;
    font-size: 12px;
}
.memberLevel-detail .bgcolor-select .card-id{
    width: 110px;
}
.memberLevel-detail .bgcolor-select .card-id .el-input input{
    height: 33px;
    font-size: 12px;
}
.memberLevel-detail .bgcolor-select .card-input{
    width:calc(100% - 204px);
}
.memberLevel-detail .bgcolor-select .card-input input{
    height: 33px;
    font-size: 12px;
}
.memberLevel-detail .bgcolor-select .add-input input{
    height: 35px;
    font-size: 12px;
}
.memberLevel-detail .integral{
    padding:10px 0;
}
.memberLevel-detail .integral .integral-row{
    font-size:12px;
    height: 40px;
    padding:5px 0;
}
.memberLevel-detail .integral .integral-row .el-input__inner{
    width: 100px;
    height: 35px;
    
}
.memberLevel-detail .integral .integral-row>label{
    margin-right:10px;
    text-align:right;
    line-height:35px;
    display: block;
    float: left;
    height: 35px;
    width:84px;
    font-family:'microsoft yahei';
    color:#333;  
}
.memberLevel-detail .integral .integral-row .left{
    float: left;
    width:calc(100% - 94px);
}
.memberLevel-detail .integral .integral-row .el-input{
    width:100px;
}
.memberLevel-detail .el-dialog__body .checkBoxOuUser{
    margin:6px 10px;
} 
.memberLevel-detail .el-dialog__body .checkBoxOuUser .square_el{
    margin-left:13px;
} 
</style>

