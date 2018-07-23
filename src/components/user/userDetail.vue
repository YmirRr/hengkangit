<template>
    <div class="userDetail">
        <el-row  class="fixed">
             <el-col :span="24">
                <div class="btnGroup-box">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                </div>
            </el-col>
        </el-row>
        <el-row class="pt20">
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth"><label>
                        <small>*</small>用户编码</label>
                        <el-input
                        class="userCode"
                        :class="{redBorder : validation.hasError('addData.userCode')}"
                        v-model="addData.userCode"
                        placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.userCode') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>用户名称</label>
                    <el-input
                    class="displayName"
                    :class="{redBorder : validation.hasError('addData.displayName')}"
                    v-model="addData.displayName"
                    placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.displayName') }}</div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>密码</label>
                    <el-input
                    type="password"
                    class="password"
                    :class="{redBorder : validation.hasError('addData.password')}"
                    v-model="addData.password"
                    placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.password') }}</div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>手机号码</label>
                    <el-input
                    class="phoneNumber"
                    :class="{redBorder : validation.hasError('addData.phoneNumber')}"
                    v-model="addData.phoneNumber"
                    placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.phoneNumber') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>邮箱</label>
                    <el-input
                    class="email"
                    :class="{redBorder : validation.hasError('addData.email')}"
                    v-model="addData.email"
                    placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.email') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>所属用户组</label>
                    <el-select clearable filterable
                    class="userGroupId"
                    placeholder=""
                    :class="{redBorder : validation.hasError('addData.userGroupId')}"
                    v-model="addData.userGroupId"
                    :filter-method="filterMethodUserGroup" clearable filterable>
                        <el-option v-for="item in userGroupId" :key="item.id" :label="item.userGroupName" :value="item.id">
                            <span>{{item.userGroupName}}</span>
                            <span>{{item.userGroupCode}}</span>
                        
                        </el-option>
                    </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.userGroupId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label><small>*</small>所属组织</label>
                    <el-select clearable
                    class="ouId"
                    placeholder=""
                    :class="{redBorder : validation.hasError('addData.ouId')}"
                    v-model="addData.ouId">
                        <!-- <el-option v-for="item in selectData.OUType" :key="item.id" :label="item.ouName" :value="item.id">
                        </el-option> -->
                        <el-input
                        placeholder="搜索..."
                        class="selectSearch"
                        v-model="search">
                        </el-input>
                        <el-tree
                         :render-content="renderContent_"
                        :data="selectTree"
                        :highlight-current="true"
                        :props="selectProps"
                        node-key="id"
                        default-expand-all
                        ref="tree"
                        :filter-node-method="filterNode"
                        :expand-on-click-node="false"
                        @node-click="nodeClick"
                        >
                        </el-tree>
                        <!-- <el-option v-show="false" :key="item.id" :label="item.ouName" :value="item.id">
                        </el-option> -->
                        <el-option v-show="false" v-for="item in selectData.OUType" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                            </el-option>
                    </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.ouId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label>身份类型</label>
                    <el-select clearable filterable
                    class="userType"
                    placeholder=""
                    :class="{redBorder : validation.hasError('addData.userType')}"
                    v-model="addData.userType">
                        <el-option v-for="item in selectData.UserType" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                        </el-option>
                        <el-option v-show="false" :label="item_area_no.ouName" :value="item_area_no.id"></el-option>
                    </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.userType') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label>语种</label>
                    <el-select clearable filterable
                    class="languageId"
                    placeholder=""
                    :class="{redBorder : validation.hasError('addData.languageId')}"
                    v-model="addData.languageId"
                    :filter-method="filterMethodLanguage">
                        <el-option v-for="item in languageId" :key="item.id" :label="item.displayName" :value="item.id">
                            <span>{{item.displayName}}</span>
                            <span>{{item.name}}</span>
                        </el-option>
                    </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.languageId') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>有效时间</label>
                        <div class="rangeDate">
                            <el-date-picker
                            v-model="dateRange"
                            class="dateRange"
                            :class="{redBorder : validation.hasError('dateRange')}"
                            type="daterange"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="to"
                            align="center"
                            unlink-panels
                            start-placeholder=""
                            end-placeholder="">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('dateRange') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>状态</label>
                        <el-select clearable filterable
                        class="status"
                        placeholder=""
                        :class="{redBorder : validation.hasError('addData.status')}"
                        v-model="addData.status">
                            <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.status') }}</div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor">
                        <label></label>
                        <el-checkbox v-model="addData.isReg" disabled></el-checkbox>
                        <span class="isGive">是否注册用户</span>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>备注</label>
                        <el-input
                        class="remark"
                        :class="{redBorder : validation.hasError('addData.remark')}"
                        v-model="addData.remark"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        placeholder="">
                        </el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.remark') }}</div>
                </div>
            </el-col>

          <el-col :span="24">
            <div class="bgMarginAuto">
                <div class="bgcolor bgLongWidth">
                    <label>关联角色</label>
                    <div class="addZoo">
                        <a class="add" href="javascript:;" @click="editDialog()">+</a>
                    </div>
                </div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="bgMarginAuto">
                <div class="bgcolor bgLongWidth" style="overflow: visible;">
                    <label>&nbsp;</label>
                    <div class="addZoo">
                        <a class="addRole" :key="x.id"  v-for="x in checkedTable">{{x.displayName}}<i @click="check_push_noCheckThis(x)" class="el-icon-error"></i></a>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="24" class="getPadding">
            <h4 class="h4">审计信息</h4>
            <div>
                <div class="bgcolor"><label>创建人</label><el-input v-model="addData.createdBy" disabled></el-input></div>
                <div class="bgcolor">
                    <label>创建时间</label>
                    <el-input v-model="addData.createdTime" disabled></el-input>

                </div>
                <div class="bgcolor"><label>修改人</label><el-input  v-model="addData.modifiedBy" disabled></el-input></div>
                <div class="bgcolor">
                    <label>修改时间</label>
                <el-input v-model="addData.modifiedTime" disabled></el-input>
                </div>
            </div>
       </el-col>
      </el-row>
      <!-- 关联角色 -->
      <!-- <el-dialog :visible.sync="dialogTableVisible" title="关联角色">
            <el-col :span="24">
                <el-col :span="11">
                        <el-col :span="24">已选</el-col>
                        <el-col :span="24">
                            <el-table
                            :data="checkedTable"
                            border
                            style="width: 100%"
                            stripe
                            @selection-change="checkedSelect"
                            ref="multipleTable">
                                <el-table-column type="selection" fixed="left"></el-table-column>
                                <el-table-column prop="displayName" label="功能"></el-table-column>
                            </el-table>
                        </el-col>
                </el-col>
                <el-col :span="2">
                    <div class="el-transfer__buttons">
                        <el-button :disabled="is_nocheked" @click="noCheck_push_check" type="primary" icon="el-icon-arrow-left"></el-button>
                        <el-button :disabled="is_cheked" @click="check_push_noCheck" type="primary" icon="el-icon-arrow-right"></el-button>
                    </div>
                </el-col>
                <el-col :span="11">
                    <el-col :span="24">可选</el-col>
                    <el-col :span="24">
                        <el-table
                        :data="nocheckedTable"
                        border
                        style="width: 100%"
                        stripe
                        @selection-change="nocheckedSelect"
                        ref="multipleTable">
                            <el-table-column type="selection" fixed="left"></el-table-column>
                            <el-table-column prop="displayName" label="功能"></el-table-column>
                        </el-table>
                    </el-col>
                </el-col>
            <el-col :span="24">
                <el-button>确认</el-button>
                <el-button>取消</el-button>
            </el-col>
        </el-col>
    </el-dialog> -->
      <!-- <el-dialog :visible.sync="dialogTableVisible">
        <template slot="title">
            <span style="float:left;">选取角色</span>
            <div class="double_bt">
                <template v-if="menuCheck">
                    <div class="menu_btn_choose" :class="{menu_btn_active : !menuCheck}" @click="showNodeadd">已选角色</div>
                    <div class="menu_btn_choose" :class="{menu_btn_active : menuCheck}">未选角色</div>
                </template>
                <template v-else>
                    <div class="menu_btn_choose" :class="{menu_btn_active : !menuCheck}">已选角色</div>
                    <div class="menu_btn_choose" :class="{menu_btn_active : menuCheck}" @click="showNodedel">未选角色</div>
                </template>

            </div>
        </template>
        <el-col :span="24">
            <div class="menu_item_wapper menu_item_add">
                <span :key="x.id" class="menu_item" v-for="x in checked"><a class="menu_add" @click="addRole(x)"><i class="el-icon-minus"></i></a>{{x.displayName}}</span>
            </div>
            <div class="menu_item_wapper menu_item_del">
                <span :key="x.id" class="menu_item" v-for="x in nochecked"><a class="menu_add" @click="delRole(x)"><i class="el-icon-plus"></i></a>{{x.displayName}}</span>
            </div>
        </el-col>
    </el-dialog> -->


    <!-- 关联角色 -->
        <el-dialog :visible.sync="dialogTableVisible" title="关联角色" class="transfer_dialog">
            <el-col :span="24">
                <el-col :span="11" class="transfer_warapper">
                        <el-col :span="24" class="transfer_header">
                            <span>已选</span>
                            <div class="transfer_search" @keyup.enter="searchLeftTable">
                               <el-input
                                    placeholder="搜索..."
                                    v-model="searchTableLeft"
                                    class="search_input"
                                    >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="24" class="transfer_table">
                            <el-table
                            :data="showChecked"
                            border
                            style="width: 100%"
                            stripe
                            @selection-change="checkedSelect"
                            ref="multipleTable">
                                <el-table-column type="selection" fixed="left"></el-table-column>
                                <el-table-column prop="roleCode" label="角色编码"></el-table-column>
                                <el-table-column prop="displayName" label="角色名称"></el-table-column>
                                <el-table-column prop="ouName" label="所属组织"></el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="24" class="transfer_footer">
                            <div style="float:right">
                                <span>共{{totalPageLeft}}页</span>
                                <el-button class="el_transfer" :disabled="leftDownBtn" @click="pageDownLeft" type="primary" icon="el-icon-arrow-left" round></el-button>
                                <el-button class="el_transfer" :disabled="leftAddBtn" @click="pageAddLeft" type="primary" icon="el-icon-arrow-right" round></el-button>
                            </div>
                        </el-col>
                </el-col>
                <el-col :span="2" class="transfer_btns">
                    <el-col :span="24" class="transfer_btn_wrapper">
                        <el-button class="el_transfer" :disabled="is_nocheked" @click="noCheck_push_check" type="primary" icon="el-icon-arrow-left" round></el-button>
                        <el-button class="el_transfer" :disabled="is_cheked" @click="check_push_noCheck" type="primary" icon="el-icon-arrow-right" round></el-button>
                    </el-col>
                </el-col>
                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>可选</span>
                        <div class="transfer_search" @keyup.enter="searchRightTable">
                            <el-input
                                placeholder="搜索..."
                                v-model="searchTableRight"
                                class="search_input"
                                >
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="transfer_table">
                        <el-table
                        :data="showNoChecked"
                        border
                        style="width: 100%"
                        stripe
                        @selection-change="nocheckedSelect"
                        ref="multipleTable">
                            <el-table-column type="selection" fixed="left"></el-table-column>
                            <el-table-column prop="roleCode" label="角色编码"></el-table-column>
                            <el-table-column prop="displayName" label="角色名称"></el-table-column>
                            <el-table-column prop="ouName" label="所属组织"></el-table-column>
                        </el-table>

                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <div style="float:right">
                            <span>共{{totalPageRight}}页</span>
                            <el-button class="el_transfer" :disabled="rightDownBtn" @click="pageDownRight" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="rightAddBtn" @click="pageAddRight" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </div>
                    </el-col>
                </el-col>
        </el-col>
        <span slot="footer">
            <button class="transfer_footer_btn transfer_confirm" @click="dialogTableVisible = false">确 认</button>
            <button class="transfer_footer_btn" @click="cancelPush">取 消</button>
        </span>
    </el-dialog>
<dialogBox @dialogColse="dialogUserConfirm = false" :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing"></dialogBox>
  </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
import {FILTER_MOTHED} from '../../common/common.js'
  export default({
    data(){
      return{
        errorTips:{message:'',detail:''},
        dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
        dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
        firstModify:false,
        secondModify:false,
        ifModify:false,
        searchTableLeft:'',//搜索
        searchTableRight:'',//搜索
        search:'',
        selectTree:[
        ],
        item:{
            id:'',
            ouName:''
        },
        item_area_no:{
                id:0,
                ouName:'无'
                },
        selectProps: {
            children: 'children',
            label: 'ouName',
            id:'id'
        },


        dialogTableVisible:false,//控制对话框
        menuCheck:true,//未选功能，已选功能
        check:false,//是否授权

        addData:{
          "userCode": "",
          "displayName": "",
          "phoneNumber": "",
          "email": "",
          "userGroupId": "",
          'password':'',
          "ouId": "",
          "status": 1,
          "userType": '',
          "languageId": 9,
          "isReg": false,
          "remark": "",
          "roleCodes": [],
            createdTime:this.GetDateTime(),//创建时间
            createdBy:this.$store.state.name,//创建人
            modifiedTime:this.GetDateTime(),//修改人
            modifiedBy:this.$store.state.name//修改时间
        },
        dateRange:[],//有效时间
        selectData:{//select数据
            OUType:[],//所属组织
            Status001:[],//启用状态
            UserType:[],//身份类型
            userGroupId:[],//所属用户组
            languageId:[],//语种
        },
        SkipCount:0,
        MaxResultCount:100,
        totalCount:0,


// ------------关联角色dialog-------------
        dialogTableVisible:false,//控制对话框
        checkedTable:[],//已选所有数据
        showChecked:[],//右侧表格展示的数据
        // roleCodesCancel:[],//表格数据，用于取消操作
        nocheckedTable:[],//可选所有数据
        showNoChecked:[],//左侧表格展示的数据
        allRoles:[],//所有数据
        selection_checked: [],//复选框选中数据
        selection_nochecked: [],//复选框选中数据
        is_nocheked:true,//可选
        is_cheked:true,//已选
        LeftWitchPage:"pagination",//分页判断条用函数
        RightWitchPage:"pagination",//分页判断条用函数
//---------left表格-------------
        pageIndexLeft:1,//分页的当前页码
        totalPageLeft:0,//当前分页总数
        oneItemLeft:10,//每页有多少条信息
        searchLeftDatas:[],//左侧搜索之后所有数据，未分页
        pageLeft:1,//当前页
        totalItemLeft:0,//总共有多少条消息
        leftDownBtn:true,//分页按钮是否显示
        leftAddBtn:true,//分页按钮是否显示
 //---------right表格-------------
        totalItemRight:0,//总共有多少条消息
        pageIndexRight:1,//分页的当前页码
        searchRightDatas:[],//右侧搜索之后所有数据，未分页
        totalPageRight:0,//当前分页总数
        oneItemRight:10,//每页有多少条信息
        pageRight:1,//当前页
        rightDownBtn:true,//分页按钮是否显示
        rightAddBtn:true,//分页按钮是否显示

//----------按钮操作--------------
        dialogUserConfirm:false,//信息更改提示控制
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
                }],
                filterKeyLang:'',//语种搜索字
                filterKeyUserGroup:'',//用户组
                 
      }
    },
     validators: {
      'addData.userCode': function (value) {//用户编码
         return this.Validator.value(value).required().maxLength(50)
      },
      'addData.displayName': function (value) {//用户名称
         return this.Validator.value(value).required().maxLength(50);
      },
      'addData.password': function (value) {//密码
         return this.Validator.value(value).required();
      },
      'addData.phoneNumber': function (value) {//手机号码
         return this.Validator.value(value).required().maxLength(20);
      },
      'addData.email': function (value) {//邮箱
         return this.Validator.value(value).required().maxLength(200);
      },
      'addData.userGroupId': function (value) {//所属用户组
         return this.Validator.value(value).required().integer();
      },
      'addData.ouId': function (value) {//所属组织
          return this.Validator.value(value).required().integer();
      },
      'addData.userType': function (value) {//身份类型
         return this.Validator.value(value).integer();
      },
      'addData.languageId': function (value) {//语种
          return this.Validator.value(value).integer();
      },
      'addData.status': function (value) {//状态
         return this.Validator.value(value).integer();
      },
      'addData.remark': function (value) {//备注
         return this.Validator.value(value).maxLength(200);
      },
      'dateRange':function(value){
          return this.Validator.value(value);
      }

    },
    created:function(){
      let _this=this;
      _this.loadTree();
      _this.getSelectData();
      _this.getAllRoleData();
      _this.getDefault();
    },
    watch: {
      search(val) {
        this.$refs.tree.filter(val);
      },
       addData:{
            handler:function(val,oldVal){
                let _this=this;
                if(!_this.firstModify){
                    _this.firstModify=!_this.firstModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        checkedTable:{
            handler:function(val,oldVal){

                let _this=this;
                if(!_this.secondModify){
                    _this.secondModify=!_this.secondModify;
                    // _this.ifModify=true
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
    },
     computed:{
      languageId:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKeyLang,this.selectData.languageId)
      },
      userGroupId:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKeyUserGroup,this.selectData.userGroupId)
      },
  },
    methods: {
         filterMethodLanguage(query){
           this.filterKeyLang=query; 

       },
       filterMethodUserGroup(query){
           this.filterKeyUserGroup=query; 

       },
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){//
                self.isBack();
            }else if(btn=="新增"){//

            }else if(btn=="删除"){//

            }else if(btn=="保存"){//
                self.save();
            }else if(btn=="保存并新增"){//
                self.saveAdd();
            }else if(btn=="取消"){
                self.isBack();
            }
        },
        GetDateTime: function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
    },
        getDefault(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(res);
            // 默认用户业务组织
                // _this.addData={
                //     "userCode": "",
                //     "displayName": "",
                //     "phoneNumber": "",
                //     'password':"",
                //     "email": "",
                //     "userGroupId": "",
                //     "ouId": res.result.id,
                //     "status": 1,
                //     "userType": "",
                //     "languageId":9,
                //     "isReg": false,
                //     "remark": "",
                //     "roleCodes": [],
                //     'createdTime':this.GetDateTime(),//创建时间
                //     'createdBy':this.$store.state.name,//创建人
                //     'modifiedTime':this.GetDateTime(),//修改时间
                //     'modifiedBy':this.$store.state.name//修改人
                // };
                _this.addData.ouId=res.result.id;
                _this.addData.effectiveStart='';
                _this.addData.effectiveEnd='';
                _this.dateRange=[];
            })

        },
        getSelectData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'UserType'}).then(function(res){
            // 身份类型
            _this.selectData.UserType=res.result;
            })
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
            // 启用状态
            _this.selectData.Status001=res.result;
            })
            _this.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){
            // 所属组织
            _this.selectData.OUType=res.result;
            })
             _this.$axios.gets('/api/services/app/Language/GetLanguages').then(function(res){
            // 语种
                _this.selectData.languageId=res.result.items;
            })
            _this.$axios.gets('/api/services/app/UserGroup/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(resp){
            // 所属用户组
            if(resp.result.totalCount>1){
                _this.$axios.gets('/api/services/app/UserGroup/GetAll',{SkipCount:0,MaxResultCount:resp.result.totalCount}).then(function(res){
                    _this.selectData.userGroupId=res.result.items;
                })
            }else{
                _this.selectData.userGroupId=[];
            }

            })
            ///api/services/app/Language/GetLanguages
            _this.$axios.gets('/api/services/app/Language/GetLanguages').then(function(res){
            // 语种
                _this.selectData.languageId=res.result.items;
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
        },
        loadTree(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAllTree')
            .then(function(res){
                _this.selectTree=res;
            },function(res){
            })
        },
        loadIcon(){
            let _this=this;
            _this.$nextTick(function () {
                $('.preNode').remove();
                $('.el-tree-node__label').each(function(){
                    if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
                        $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
                    }else{
                        $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
                    }
                })
            })
        },
        nodeClick(data,node,self){
            let _this=this;
            _this.item.id=data.id;
            _this.item.ouName=data.ouName;
            // _this.$nextTick(function(){
            //     $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
            // })

            $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                if($(this).attr('date')==data.id){
                    $(this).click()
                }
            })
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
      back(row){
          this.$store.state.url='/user/userList/default'
          this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
      },
        saveAdd(){
            let _this=this;
            _this.saves('saveAdd')
        },
        save(){
            let _this=this;
            _this.saves('save')
        },
        saves(type){
            let _this=this;
            _this.$validate()
            .then(function (success) {
                if (success) {
                    let roles=[];
                    $.each(_this.checkedTable,function(index,value){
                        roles.push(value.roleCode)
                    })
                    _this.addData.roleCodes=roles;
                    _this.addData.effectiveStart=_this.dateRange[0];
                    _this.addData.effectiveEnd=_this.dateRange[1];
                    _this.$axios.posts('/api/services/app/User/Create',_this.addData)
                    .then(function(res){
                        if(type=='save'){
                        _this.$store.state.url='/user/userModify/'+res.result.id
                        _this.$router.push({path:_this.$store.state.url})
                        }else if(type=='saveAdd'){
                            _this.clearData();
                            _this.ifModify=false
                        }
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }
            });
        },
         uniqueArray(array1, array2){//求差集
            var result = [];
            for(var i = 0; i < array1.length; i++){
                var item = array1[i];
                var repeat = false;
                for (var j = 0; j < array2.length; j++) {
                    if (array1[i].id == array2[j].id) {//唯一key
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    result.push(item);
                }
            }
            return result;
        },
        editDialog(){
            let _this=this;
            if(!_this.isEdit){
                _this.dialogTableVisible=true;
            }else{
                return false;
            }
        },
        LeftbtnIsShow(){
            let _this=this;
            if(_this.pageLeft>1){
                _this.leftDownBtn=false;
            }else{
                _this.leftDownBtn=true;
            }

            if(_this.totalPageLeft>_this.pageLeft){
                _this.leftAddBtn=false;
            }else{
                _this.leftAddBtn=true;
            }

        },
        RightbtnIsShow(){
            let _this=this;
            if(_this.pageRight>1){
                _this.rightDownBtn=false;
            }else{
                _this.rightDownBtn=true;
            }
            if(_this.totalPageRight>_this.pageRight){
                _this.rightAddBtn=false;
            }else{
                _this.rightAddBtn=true;
            }
        },
        pagination(addData,delData,oneItem,thisPage,LeftOrRight){//数据分页
            //data需要被分页的数据,类型为[{}]
            //addData被添加的数据数据,类型为[{}]
            //delData被移走的数据,类型为[{}]
            //totalItem总共有多少条消息
            //pageIndex分页的当前页码
            //totalPages当前分页总数
            //oneItem每页有多少条信息
            //thisPage当前页

            let _this=this;
            let nowData=[];
            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
            let endIndex=startIndex + oneItem;

            if(LeftOrRight=='right'){
                if(addData.length>0){
                    _this.nocheckedTable=addData.concat(_this.nocheckedTable);
                }
                if(delData.length>0){
                    _this.nocheckedTable=_this.uniqueArray(_this.nocheckedTable,delData);
                }
                if(_this.nocheckedTable.length>0){
                    if(endIndex>_this.nocheckedTable.length){
                        endIndex=_this.nocheckedTable.length;
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        nowData.push(_this.nocheckedTable[startIndex])
                    }
                }
            }else if(LeftOrRight=='left'){
                if(addData.length>0){
                    _this.checkedTable=addData.concat(_this.checkedTable);
                }
                if(delData.length>0){
                    _this.checkedTable=_this.uniqueArray(_this.checkedTable,delData)
                }
                if(_this.checkedTable.length>0){
                    if(endIndex>_this.checkedTable.length){
                        endIndex=_this.checkedTable.length;
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        nowData.push(_this.checkedTable[startIndex])
                    }
                }
            }
            //左侧
            _this.totalItemLeft=_this.checkedTable.length;//左侧总共多少条数据
            _this.totalPageLeft=Math.ceil(_this.totalItemLeft/_this.oneItemLeft);//有多少页
            _this.LeftbtnIsShow()
            //右侧
            _this.totalItemRight=_this.nocheckedTable.length;//右侧总共多少条数据
            _this.totalPageRight=Math.ceil(_this.totalItemRight/_this.oneItemRight);//有多少页
            _this.RightbtnIsShow()


            return nowData
        },
        getAllRoleData(){
            let _this=this;
            _this.checkedTable=[]
            _this.LeftWitchPage="pagination";
            _this.RightWitchPage="pagination";
            _this.$axios.gets('/api/services/app/Role/GetAll',{SkipCount:0,MaxResultCount:1})//获取所有角色
            .then(function(re){
                let totalAll=re.result.totalCount;//获取总共当前关联角色条数
                if(totalAll>0){
                _this.$axios.gets('/api/services/app/Role/GetAll',{SkipCount:0,MaxResultCount:totalAll})//获取所有角色
                .then(function(res){
                    _this.nocheckedTable=[]
                    _this.allRoles=res.result.items;
                    _this.totalItemRight=res.result.totalCount
                        if(_this.checkedTable.length>0){//获取可选角色
                            _this.nocheckedTable=_this.uniqueArray(_this.allRoles,_this.checkedTable)

                            _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')
                            _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left')
                        }else{
                            _this.nocheckedTable=_this.allRoles;
                            _this.showChecked=[];
                            _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')

                        }
                    })
                }
            })
        },
        checkedSelect(val) {//dialogRole选中已选角色
            let _this=this;
            _this.selection_checked = val;
            if(val.length==0){
                _this.is_cheked=true
            }else{
                _this.is_cheked=false
            }
        },
        nocheckedSelect(val) {//dialogRole选中可选角色
            let _this=this;
            _this.selection_nochecked = val;
            if(val.length==0){
                _this.is_nocheked=true
            }else{
                _this.is_nocheked=false
            }
        },
        noCheck_push_check(){//从右往左添加数据
            let _this=this;
            _this.LeftWitchPage="pagination";
            _this.RightWitchPage="pagination";
            _this.showChecked=_this.pagination(_this.selection_nochecked,[],_this.oneItemLeft,_this.pageLeft,'left')
            _this.showNoChecked=_this.pagination([],_this.selection_nochecked,_this.oneItemRight,_this.pageRight,'right')
        },
        check_push_noCheck(){//从左往右添加数据
            let _this=this;
            _this.LeftWitchPage="pagination";
            _this.RightWitchPage="pagination";
            _this.showChecked=_this.pagination([],_this.selection_checked,_this.oneItemLeft,_this.pageLeft,'left')
            _this.showNoChecked=_this.pagination(_this.selection_checked,[],_this.oneItemRight,_this.pageRight,'right')

        },
        check_push_noCheckThis(val){//删除一个关联角色
            let _this=this;
            let json=[val]
            _this.LeftWitchPage="pagination";
            _this.RightWitchPage="pagination";
            _this.checkedTable=_this.uniqueArray(_this.checkedTable,json);
            _this.showNoChecked=_this.pagination(json,[],_this.oneItemRight,_this.pageRight,'right')
            _this.showChecked=_this.pagination([],json,_this.oneItemLeft,_this.pageLeft,'left')

        },
        cancelPush(){//取消
            let _this=this;
            _this.dialogTableVisible=false;
            _this.getAllRoleData();
        },
        pageDownLeft(){//左侧表格向左翻页
            let _this=this;
             if(_this.pageLeft>1){
                _this.pageLeft--
                if(_this.LeftWitchPage=="pagination"){
                    _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left')
                }else if(_this.LeftWitchPage=="searchLeftTable"){
                    _this.showChecked=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).nowData
                    _this.totalItemLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalItem
                    _this.totalPageLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalPage
                }

            }
        },
        pageAddLeft(){//左侧表格向右翻页
            let _this=this;
            if(_this.pageLeft<=_this.totalPageLeft){
                _this.pageLeft++
                if(_this.LeftWitchPage=="pagination"){//穿梭分页
                    _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left');
                }else if(_this.LeftWitchPage=="searchLeftTable"){//搜索分页
                    _this.showChecked=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).nowData
                    _this.totalItemLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalItem
                    _this.totalPageLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalPage
                }
            }
        },
        pageDownRight(){//右侧表格向左翻页
            let _this=this;
            if(_this.pageRight>1){
                _this.pageRight--
                if(_this.RightWitchPage=="pagination"){
                    _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right');
                }else if(_this.RightWitchPage=="searchRightTable"){//搜索分页
                    _this.showNoChecked=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).nowData
                    _this.totalItemRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalItem
                    _this.totalPageRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalPage
                }
            }
        },
        pageAddRight(){//右侧表格向右翻页
            let _this=this;
            if(_this.pageRight<_this.totalPageRight){
                _this.pageRight++
                if(_this.RightWitchPage=="pagination"){
                    _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right');
                }else if(_this.RightWitchPage=="searchRightTable"){//搜索分页
                    _this.showNoChecked=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).nowData
                    _this.totalItemRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalItem
                    _this.totalPageRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalPage
                }
            }
        },
//-------------按钮操作-----------
        isBack(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogSetting.dialogName='isBack'
                _this.dialogSetting.message='确定取消？'
                _this.dialogSetting.dialogType='confirm'
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                _this.dialogUserConfirm=true;
            }else{
                _this.back()
            }
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
        sureDoing(data){
            let _this=this;
            if(data.dialogName=='isBack'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.back()
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

        clearData(){
            let _this=this;
              _this.addData={
                userCode: "",
                password: '',
                displayName: "",
                phoneNumber: "",
                email: "",
                userGroupId: "",
                ouId: "",
                status: 1,
                userType: "",
                languageId: 9,
                isReg: false,
                remark: "",
                roleCodes: [],
            },
            _this.validation.reset();
            _this.getDefault()
            _this.getAllRoleData();
        },
        paginationUserSearch(data,oneItem,thisPage){//数据分页
        //checkAllata分页数据
        //oneItem每页有多少条信息
        //thisPage当前页
            let _this=this;
            let x={}
            let nowData=[];
            // console.log(checkAllata)
            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
            let endIndex=startIndex + oneItem;
                if(data.length>0){
                    if(endIndex>data.length){
                        endIndex=data.length
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        // console.log(data[startIndex])
                        nowData.push(data[startIndex])
                    }
                }
            // _this.ouTotalItem=data.length;//总共多少条数据
            // _this.ouTotalPage=Math.ceil(data.length/oneItem);//有多少页
            x={TotalItem:data.length,TotalPage:Math.ceil(data.length/oneItem),nowData:nowData};
            return x
        },
        searchLeftTable(){
            let _this=this;
            // checkTable
            let newJson=[];
            let patt1 = new RegExp(_this.searchTableLeft);
            $.each(_this.checkedTable,function(index,val){
                let str=val.displayName;
                let result = patt1.test(str);
                if(result){
                    newJson.push(val)
                }
            })
            _this.LeftWitchPage="searchLeftTable";
            _this.searchLeftDatas=newJson;
            _this.showChecked=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).nowData
            _this.totalItemLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalItem
            _this.totalPageLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalPage

        },
        searchRightTable(){
            let _this=this;
            // nocheckTable
            let newJson=[];
            let patt1 = new RegExp(_this.searchTableRight);
            $.each(_this.nocheckedTable,function(index,val){
                let str=val.displayName;
                let result = patt1.test(str);
                if(result){
                    newJson.push(val)
                }
            })
            _this.RightWitchPage="searchRightTable"
            _this.searchRightDatas=newJson;
            _this.showNoChecked=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).nowData
            _this.totalItemRight=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).TotalItem
            _this.totalPageRight=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).TotalPage

        },
         renderContent_(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }
        },
    },
      components:{
        buttonGroup,
        dialogBox,
        Tree
        }

})
</script>



<style scoped>
.userDetail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
 .userDetail .el-row{
    background-color: #fff;
  }

  .userDetail .getPadding {
    padding: 0 10px;
}
  .userDetail .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
/* 头部已选功能，未选功能 */
.double_bt{
    width: 200px;
    height: 30px;
    border: 1px solid #6699FF;
    color: #6699FF;
    background-color: transparent;
    font-size: 12px;
    border-radius: 3px;
    margin: auto;
}
.menu_btn_choose{
    width: 100px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.menu_btn_active{
    background-color: #6699FF;
    color: #fff;

}
.show{
    display: block;
}
.menu_box{
    display: none;
}
.menu_item_wapper{
    display: block;
}
.menu_item_del{
    display: block;
}
.menu_item_add{
    display: none;
}
.load_more{
    text-align: center;
}
.menu_item{
    text-align: center;
    display: block;
    width: 190px;
    height: 60px;
    line-height: 60px;
    font-size: 13px;
    color: #666666;
    position: relative;
    float: left;
    margin-right: 20px;
    border: 1px solid #33CCCC;
    border-radius: 5px;
    background-color: transparent;
    margin-bottom: 15px;
}
.menu_add{
    text-align: center;
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    left: -12.5px;
    top: 16px;
    background-color: #69f;
    color: #fff;
    font-size: 24px;
    border-radius: 50%;
    line-height: 24px;
    cursor: pointer;
}
.menu_add:hover{
    opacity: 0.9;
}


</style>

<style>

.userDetail .el-dialog__body{
  overflow: hidden;
}
</style>
