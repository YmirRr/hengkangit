<template>
    <div class="member-list commodity">
        <el-row class="bg-white">
            
            <el-col class="border-left min-height">
                <el-row class="border-bottom">
                    <el-col :span="15">
                        <div class="btnGroup-box">
                            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>    
                       </div>
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                其他服务<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">会员充值</el-dropdown-item>
                                <el-dropdown-item command="b">会员充次</el-dropdown-item>
                                <el-dropdown-item command="c">等级变更</el-dropdown-item>
                                <el-dropdown-item command="d">会员延期</el-dropdown-item>
                                <el-dropdown-item command="e">状态变更</el-dropdown-item>
                                <el-dropdown-item command="f">修改密码</el-dropdown-item>
                                <el-dropdown-item command="g">会员换卡</el-dropdown-item>
                                <el-dropdown-item command="h">发放卡券</el-dropdown-item>
                                <el-dropdown-item command="i">发送消息</el-dropdown-item>
                                <el-dropdown-item command="j">积分清零</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col> 
                    <el-col :span="9" class="pt5">
                        <div class="search-input-member">
                            <div class="search-wapper" >
                                <input type="text" placeholder="手机号\编号\姓名..." v-model="queryParams.Info" @keyup.enter="searchRight"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                <button class="mem-search-btn" @click="searchRight">搜索</button>
                            </div>
                            <div style="float:right">
                                <div class="search_advance" @click="dialogUserDefined = true">
                                    <button class="userDefined advanced-query" @click="editDialog()">高级查询
                                    </button>
                                </div>
                                <div class="search_advance" @click="dialogUserDefined = true">
                                    <button class="userDefined advanced-query">
                                        <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                    </button>
                                </div>
                            </div>
                        </div>
                    </el-col>    
                </el-row>
                <el-row>
                    <el-col>
                         <!-- <marquee><p class="tips">{{GrowthInfo}}</p></marquee> -->
                         <!-- <p class="tips">{{GrowthInfo}}</p> -->
                         <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogTableVisible" title="高级查询" class="transfer_dialog">
           <el-row >
               <el-col :span="3">
                   <label class="input-label">会员等级</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.GradeId" placeholder="" class="input-entry" :filter-method="filterMethod1">
                        <el-option v-for="item in Grade" :key="item.id" :label="item.gradeName" :value="item.id">
                            <span>{{ item.gradeName }}</span>
                            <span>{{ item.gradeCode }}</span>
                        </el-option>
                    </el-select>
                  
                </el-col>
                 <el-col :span="3">
                    
                   <label class="input-label">服务店铺</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.SvrShopId" placeholder="" class="input-entry" :filter-method="filterMethod2">
                        <el-option v-for="item in SvrShop" :key="item.id" :label="item.shopName" :value="item.id">
                            <span>{{ item.shopName }}</span>
                            <span>{{ item.shopCode }}</span>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                   <label class="input-label">发卡店铺</label>
                </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.ChannelId" placeholder="" class="input-entry" :filter-method="filterMethod3">
                        <el-option v-for="item in CardShop" :key="item.id" :label="item.shopName" :value="item.id">
                            <span>{{ item.shopName }}</span>
                            <span>{{ item.shopCode }}</span>
                        
                        </el-option>
                    </el-select>
                </el-col>
                
           </el-row>
           <el-row class="mt10">
               <el-col :span="3">
                   <label class="input-label">服务人员</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.SvrEmployeeId" placeholder="" class="input-entry" :filter-method="filterMethod4">
                        <el-option v-for="item in SvrEmployee" :key="item.id" :label="item.employeeName" :value="item.id">
                            <span>{{ item.employeeName }}</span>
                            <span>{{ item.employeeCode }}</span>
                        
                        </el-option>
                    </el-select>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">会员状态</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.Status" placeholder="" class="input-entry">
                        <el-option v-for="item in statusC" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                   <label class="input-label">会员生日</label>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                        v-model="queryParams.BirthDay"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1"
                        class="input-entry">
                    </el-date-picker>
                </el-col>
                
           </el-row>
           <el-row class="mt10">
               <el-col :span="3">
                   <label class="input-label">开卡时间</label>
               </el-col>
                <el-col :span="5">
                    <el-date-picker
                        v-model="queryParams.CreatedTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1"
                        class="input-entry">
                    </el-date-picker>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">推荐人员</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.Introducer" placeholder="" class="input-entry">
                        <el-option v-for="item in Introducer" :key="item.id" :label="item.introducer" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                   <label class="input-label">过期时间</label>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                        v-model="queryParams.EffectiveEnd"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1"
                        class="input-entry">
                    </el-date-picker>
                </el-col>
                
            </el-row>
            <el-row class="mt10">
               <el-col :span="3">
                   <label class="input-label">来源</label>
               </el-col>
                <el-col :span="5">
                    <el-select clearable filterable   v-model="queryParams.RegSourceid" placeholder="" class="input-entry">
                        <el-option v-for="item in RegSource" :key="item.itemValue" :label="item.itemName" :value="item.itemName">
                        </el-option>
                    </el-select>
                  
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">绑定微信</label>
               </el-col>
                <el-col :span="5">
                    <el-input class="input-entry"></el-input>
                </el-col>
                <el-col :span="3">
                   <label class="input-label">多久非消费</label>
                </el-col>
                <el-col :span="5">
                    <el-input class="input-entry"></el-input>
                </el-col>
                
            </el-row>
             <el-row class="mt10"> 
               <el-col :span="3">
                   <label class="input-label">累计消费金额</label>
               </el-col>
                <el-col :span="5" class="monetary">
                    <el-input ></el-input>
                    <span>至</span>
                    <el-input></el-input>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">累计积分消费</label>
               </el-col>
                <el-col :span="5" class="monetary">
                    <el-input ></el-input>
                    <span>至</span>
                    <el-input></el-input>
                </el-col>
                
           </el-row>
            <el-row class="mt10">
               <el-col :span="3">
                   <label class="input-label">会员剩余积分</label>
               </el-col>
                <el-col :span="5" class="monetary">
                    <el-input v-model="queryParams.IntegralStart"></el-input>
                    <span>至</span>
                    <el-input v-model="queryParams.IntegralEnd"></el-input>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">会员剩余金额</label>
               </el-col>
                <el-col :span="5" class="monetary">
                    <el-input v-model="queryParams.RemainingStart"></el-input>
                    <span>至</span>
                    <el-input v-model="queryParams.RemainingEnd"></el-input>
                </el-col>
                
           </el-row>
           <el-row class="mt10">
               <el-col :span="3">
                   <label class="input-label">会员卡号</label>
               </el-col>
                <el-col :span="5">
                    <el-input class="input-entry" v-model="queryParams.CardCode"></el-input>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">姓名</label>
               </el-col>
                <el-col :span="5">
                    <el-input class="input-entry" v-model="queryParams.MemberName"></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10 mb10">
               <el-col :span="3">
                   <label class="input-label">手机号码</label>
               </el-col>
                <el-col :span="5">
                    <el-input class="input-entry" v-model="queryParams.Moblie"></el-input>
                </el-col>
                 <el-col :span="3">
                   <label class="input-label">会员生日</label>
               </el-col>
               <el-col :span="5" class="monetary">
                    <el-input v-model="queryParams.BirthDayStart"></el-input>
                    <span>至</span>
                    <el-input  v-model="queryParams.BirthDayEnd"></el-input>
                </el-col>
                
            </el-row>
        <span slot="footer">
            <button class="transfer_footer_btn transfer_confirm" @click="query" >确 认</button>
            <button class="transfer_footer_btn" @click="cancelPush">取 消</button>
        </span>
    </el-dialog>
         <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     
    </div>
</template>

<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Table from '../../../base/Table/Table'
import dialogBox from '../../../base/dialog/dialog'
import {ADD_BOOKMARK,FILTER_MOTHED} from '../../../common/common.js'
import config from '../../../../static/config';
export default {
  name: "memberListDetail",
  data() {
    return {
      url:"http://192.168.100.107:8092",
      ifWidth:true,
      ContactOwner:1,//  客户分类参数(获取所有数据时)
      searchLeft: "",
      statusC: [], //状态
      tableData: [],
      GradeId:[],//会员等级
      SvrShopId:[],//开卡店铺
      SvrEmployeeId:[],//服务人员
      Introducer:[],//推荐人员
      RegSource:[],//注册来源
    //   GrowthInfo:'',
      dialogTableVisible:false,//控制对话框
      multipleSelection: [], //复选框选中数据
      tableLoading: true,
      // 错误信息提示开始
      option: {
        vRail: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        vBar: {
          width: "5px",
          pos: "right",
          background: "#9093994d"
        },
        hRail: {
          height: "0"
        }
      },
      dialogUserConfirm:false,//删除提示
      dialogVisible:false,
      dialogCommand:[],
      // 错误信息提示结束
       response:{
                details:'',
                message:'',
                validationErrors:[],
            },
      info:'',//右上搜索
      tableModel:'memberList',
    //   tableLoading: true,
      errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
      pluginSetting:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
         },
        buttonGroup:[{
        text:'会员注册',
        class:'bt_add',
        icon:'icon-xinzeng',
        disabled:false,
    },{
        text:'导出',
        class:'bt_out',
        icon:'icon-daochu',
        disabled:false,
    }],
    dialogSetting:{
        message:'',//提示信息
        dialogName:'',//对话框名称
        dialogType:'',//对话框类型
      },
      httpUrl:{
            view:'/memberInformation/memberInformationDetail/',//查看详情
            delete:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/Delete',//单条删除
            query:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberList',//条件查询
            routeSetting:{
                routeTab:true,//是否需要打开新的页签
                routeName:'会员资料',//页签名称如：会员资料
                routeUrl:'memberInformationDetail',
            }
            },
        queryParams:{//查询条件参数
                Info:"",//快捷查询手机号\卡号\姓名
                GradeId:"",//会员等级
                SvrShopId:"",//发卡店铺
                ChannelId:"",//服务店铺
                SvrEmployeeId:"",//服务人员
                BirthDay:"",//会员生日
                Status:"",//状态
                CreatedTime:"",//开卡时间
                Introducer:"",//推荐人
                EffectiveEnd:"",//过期时间
                RegSourceid:"",//来源
                CardCode:"",//会员卡号
                MemberName:"",//会员姓名
                Moblie:"",//会员手机号码
                IntegralStart:"",//	会员剩余积分(起)
                IntegralEnd:"",//会员剩余积分(止)
                RemainingStart:"",//会员剩余金额(起)
                RemainingEnd:"",//会员剩余金额(止)
                BirthDayStart:"",//	会员生日(起)
                BirthDayEnd:"",//	会员生日(止)
                IdList:[],//会员ID集合
                SkipCount:(this.$store.state.memberListCurrentPage-1)*this.$store.state.memberListEachPage,
                MaxResultCount:this.$store.state.memberListEachPage,
            },
          column: [{
                    prop: 'regSourceidTValue',
                    label: '来源',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'cardCode',
                    label: '会员卡号',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'statusTValue',
                    label: '卡状态',
                    controls:'button',
                    isDisable:true,
                    sortable:false,
                    }, {
                    prop: 'moblie',
                    label: '手机号码',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },
                     {
                    prop: 'gradeId_GradeName',
                    label: '会员等级',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'birth',
                    label: '会员生日',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },
                     {
                    prop: 'sexTValue',
                    label: '性别',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'amount',
                    label: '账户余额',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },
                    {
                    prop: 'integral',
                    label: '账户积分',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },
                    {
                    prop: 'age',
                    label: '年龄',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'createdTime',
                    label: '创建时间',
                    controls:'datetimer',
                    isDisable:true,
                    sortable:false,
                    width:'160px',
                    },
                     {
                    prop:'channelId_ShopName',
                    label: '注册渠道',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }, 
                    //  {
                    // prop: 'remark',
                    // label: '消费金额',
                    // controls:'text',
                    // isDisable:true,
                    // sortable:false,
                    // },{
                    // prop: 'remark',
                    // label: '消费次数',
                    // controls:'text',
                    // isDisable:true,
                    // sortable:false,
                    // },
                     {
                    prop: 'effectiveTime',
                    label: '失效日期',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'svrShopId_ShopName',
                    label: '服务店铺',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    },{
                    prop: 'svrEmployeeId_EmployeeName',
                    label: '服务人员',
                    controls:'text',
                    isDisable:true,
                    sortable:false,
                    }],
                command:[{
                    text:'查看',
                    class:'green'
                },{
                    text:'删除',
                    class:'blue'
                }],
                delAarry:{
                    ids:[]
                },
                pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
            value1: '',
            value2: '',
            idArray:{
                ids:[]
            },
            detailId:"",
            BookMarkFlag:true,
            statusChangeName:'会员充值',
            statusChangeUrl:'membershipRechargeList',
            statusChangeParam:1,
            statusChangeNameG:'会员换卡',
            statusChangeUrlG:'changeCardDetail',
            statusChangeNameE:'状态变更',
            statusChangeUrlE:'statusChangeDetail',
            statusChangeNameD:'会员延期',
            statusChangeUrlD:'memberDelayDetail',
            statusChangeNameR:'会员注册',
            statusChangeUrlR:'memberRegDetail',
            statusChangeNameL:'等级变更',
            statusChangeUrlL:'levelChangeDetail',
            filterKey:'',
            filterKey2:'',
            filterKey3:'',
            filterKey4:'',
            filterKey5:'',
          
    };
     
  },
  //----------------创建------------------------------
  created: function() {
    let self = this;
    // self.loadGrowthInfo();//获取周期内会员的增长信息
  },
  computed:{
      Grade: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey,this.GradeId)
      },
      SvrShop: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey2,this.SvrShopId)
      },
      CardShop: function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey3,this.SvrShopId)
      },
      SvrEmployee:function () {//下拉数据自定义搜索过滤
          return FILTER_MOTHED(this.filterKey4,this.SvrEmployeeId)
      },
  },
  watch: {
    searchLeft(val) {
      this.$refs.tree.filter(val);
    },

    queryParams:{
        handler:function(val,oldVal){        
        },
        deep:true
    },
  },
  methods: {
       filterMethod1(query){
           this.filterKey=query; 
           
       },
       filterMethod2(query){
             this.filterKey2=query; 
           
       },
       filterMethod3(query){
             this.filterKey3=query; 
           
       },
       filterMethod4(query){
             this.filterKey4=query; 
           
       },
     
       
    //   按钮组事件--------------------------------------------------
        btnClick:function(data){
                if(data=="会员注册"){
                   this.goDetail();
                }else if(data=="删除"){
                    this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                    if(this.SelectionChange.length==0){
                        this.$message({
                            type: 'info',
                            message: '请勾选需要更改删除的记录！'
                        });
                    }else{
                        this.dialogSetting.dialogName='delDialog'
                        this.dialogSetting.message="确定删除？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }        
                }
            },
     cancelPush(){//取消
            let _this=this;
            _this.dialogTableVisible=false;
            // _this.getAllRoleData();
        },
    editDialog(){
            let _this=this;
            _this.dialogTableVisible=true;
            _this.loadStatus();
            _this.loadMemverGrade();//加载会员等级
            _this.loadSvrShop();//加载发卡店铺
            _this.loadSvrEmployee();//加载服务人员
            _this.loadRegSource();//加载来源
            _this.loadIntroducer()//加载推荐人员
        },
        //--------------------------------------------------获取周期内会员增张的信息-----------------
    // loadGrowthInfo:function(){
    //      let self = this;
    //      self.$axios.gets(self.url+"/api/services/app/MemberManagement/GetGrowthInfo").then(function(res) {
    //         self.GrowthInfo = res.result;
    //       },
    //     );
    // },
        // -------------------------------------------加载状态框---------------------------------
    loadStatus: function() {
      //加载状态下拉框
      let self = this;
      self.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "Status001"}).then(function(res) {
            self.statusC = res.result;
          },
        );
    },
    //-----------------------------------------------=加载会员等级------------------------------------------------------
    loadMemverGrade:function(){
        let self = this;
        self.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberGradeManagement/GetMemberGradeList").then(function(res){
          self.GradeId=res.result;
        })
    },
     //-----------------------------------------------=加载发卡店铺------------------------------------------------------
   loadSvrShop:function(){
         let self = this;
        self.$axios.gets("/api/services/app/ShopManagement/GetAll",{SkipCount:0,MaxResultCount:1000000}).then(function(res){
          self.SvrShopId=res.result.items;
        })
   },
    //-----------------------------------------------=加载服务人员------------------------------------------------------
   loadSvrEmployee:function(){
        let self = this;
        self.$axios.gets("api/services/app/EmployeeManagement/GetAll",{SkipCount:0,MaxResultCount:1000000}).then(function(res){
          self.SvrEmployeeId=res.result.items;
          console.log(res.result.items)
        })
   },
   //----------------------------------------------------加载推荐人员---------------------------------------------------
    loadIntroducer:function(){
         let self = this;
         self.$axios.gets(config.base.ip+':'+config.base.crmPort+"/api/services/app/MemberManagement/GetMemberList",{SkipCount:0,MaxResultCount:1000000}).then(function(res){
          self.Introducer=res.result.items;
          console.log(res.result.items)
        })
    },
    //--------------------------------------------------------注册来源-------------------------------
    loadRegSource:function(){
         let self = this;
          self.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "RegSource"}).then(function(res) {
              console.log(res);
            self.RegSource = res.result;
          },
        );
    },
    //-------------------------------------点击对话框确定查询表格数据-------------------------------------
    loadTableParamer(){
        let _this=this;
        _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberList',_this.queryParams).then(function(res){//查询表格数据
        _this.$store.commit('setQueryParams',_this.queryParams)
        _this.$store.commit('Init_Table',res.result.items); 
        let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.memberListEachPage);
        _this.$store.commit('Init_pagination',totalPage) 
        _this.$store.commit('Init_TotalCount',res.result.totalCount);
        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
        _this.dialogTableVisible = false  
         })     
    },
    query(){//条件查询
            let _this=this;
            _this.loadTableParamer();
        },
    // ---------------------------------------获取所有列表数据-----------------
    getDataList() {
      let self = this;
       self.loadTableParamer();
    },
    // ---跳转--------open----------------------------------------------
    goDetail() {
      //点击新增跳转
       ADD_BOOKMARK(this.statusChangeNameR,this.statusChangeUrlR,this.BookMarkFlag,'default',this);
     
    },
    open(tittle, iconClass, className) {
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: className
      });
    },

    //右边搜索框
    searchRight() {
      this.getDataList();
    },
    // --------多项删除--------------
     confirm(){
                let _this=this;
                _this.choseAjax='rows'
                if(_this.multipleSelection.length>0){
                _this.dialogUserConfirm=true;
                }
            },
    getErrorMessage(message,details,validationErrors){
              let self=this;
              self.response.message='';
              self.response.details='';
              self.response.validationErrors=[];
              if(details!=null && details){
                  self.response.details=details;
              }
              if(message!=null && message){
                  self.response.message=message;
              }
              if(message!=null && message){
                  self.response.validationErrors=validationErrors;
              }
          },
        //   对话框点击------------------------------------------
    dialogClick(parmas){//对话框按钮点击事件
        if(parmas.dialogButton=="确定"){
            if(parmas.dialogName=="delDialog"){
                this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                console.log(this.SelectionChange);
                for(var i in this.SelectionChange){
                    this.delAarry.ids.push(this.SelectionChange[i].id)
                }
                let _this=this;
                
                //批量删除
                _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/BatchDelete',_this.delAarry).then(function(res){
                        // _this.queryParams.CategoryId="";
                        _this.$store.commit('setQueryParams',_this.queryParams)
                        _this.$store.dispatch('InitTable');
                        _this.$store.commit('setTableSelection',[])
                        _this.dialogVisible=false;
                        _this.delAarry.ids=[];
                        _this.open('删除成功','el-icon-circle-check','successERP');    
                }).catch(function(err){
                    _this.dialogVisible=false;
                    _this.delAarry.ids=[];
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                });
            }
        }else if(parmas.dialogButton=="取消"){
            this.dialogVisible=false;
        }
                
            
    },
        // 关闭对话框
    dialogColse(){
        this.dialogVisible=false;
    },
    //其他服务
    handleCommand(command) {
        if(command=="a"){//会员充值
         this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                if(this.SelectionChange.length!=0){
                   for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    this.detailId=this.SelectionChange[i].id;
                    console.log(this.idArray.ids,this.detailId)
                   if(this.idArray.ids.length>1){
                       this.$message({
                            type: 'error',
                            message: '该操作只支持单个会员操作!'
                        });
                       this.idArray.ids=[]
                   }else{
                       this.statusChangeParam=this.detailId;
                       ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,this.statusChangeParam,this)
                       this.idArray.ids=[]
                   }
                  
                  
                }else{
                     ADD_BOOKMARK(this.statusChangeName,this.statusChangeUrl,this.BookMarkFlag,'default',this);
                   
            }
        }else if(command=="b"){
            alert("还未开发")
        }else if(command=="c"){
            //levelChangeDetail
            this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                if(this.SelectionChange.length!=0){
                   for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    this.detailId=this.SelectionChange[i].id;
                    console.log(this.idArray.ids,this.detailId)
                   if(this.idArray.ids.length>1){
                       this.$message({
                            type: 'error',
                            message: '该操作只支持单个会员操作!'
                        });
                       this.idArray.ids=[]
                   }else{
                       this.statusChangeParam=this.detailId;
                       ADD_BOOKMARK(this.statusChangeNameL,this.statusChangeUrlL,this.BookMarkFlag,this.statusChangeParam,this)
                       this.idArray.ids=[]
                   }
                }else{
                     ADD_BOOKMARK(this.statusChangeNameL,this.statusChangeUrlL,this.BookMarkFlag,'default',this);
                   
            }
        }else if(command=="g"){//会员换卡
            this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                if(this.SelectionChange.length!=0){
                   for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    this.detailId=this.SelectionChange[i].id;
                    console.log(this.idArray.ids,this.detailId)
                   if(this.idArray.ids.length>1){
                       this.$message({
                            type: 'error',
                            message: '该操作只支持单个会员操作!'
                        });
                       this.idArray.ids=[]
                   }else{
                       this.statusChangeParam=this.detailId;
                       ADD_BOOKMARK(this.statusChangeNameG,this.statusChangeUrlG,this.BookMarkFlag,this.statusChangeParam,this)
                       this.idArray.ids=[]
                   }
                }else{
                     ADD_BOOKMARK(this.statusChangeNameG,this.statusChangeUrlG,this.BookMarkFlag,'default',this);
                   
            }
        }else if(command=="e"){//状态变更
        this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                if(this.SelectionChange.length!=0){
                   for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    this.detailId=this.SelectionChange[i].id;
                    console.log(this.idArray.ids,this.detailId)
                   if(this.idArray.ids.length>1){
                       this.$message({
                            type: 'error',
                            message: '该操作只支持单个会员操作!'
                        });
                       this.idArray.ids=[]
                   }else{
                       this.statusChangeParam=this.detailId;
                       ADD_BOOKMARK(this.statusChangeNameE,this.statusChangeUrlE,this.BookMarkFlag,this.statusChangeParam,this)
                       this.idArray.ids=[]
                   }
                }else{
                     ADD_BOOKMARK(this.statusChangeNameE,this.statusChangeUrlE,this.BookMarkFlag,'default',this);
                   
            }
           
        }else if(command=="d"){//会员延期
          this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
                if(this.SelectionChange.length!=0){
                   for(var i in this.SelectionChange){
                        this.idArray.ids.push(this.SelectionChange[i].id)
                    }
                    this.detailId=this.SelectionChange[i].id;
                    console.log(this.idArray.ids,this.detailId)
                   if(this.idArray.ids.length>1){
                       this.$message({
                            type: 'error',
                            message: '该操作只支持单个会员操作!'
                        });
                       this.idArray.ids=[]
                   }else{
                       this.statusChangeParam=this.detailId;
                       ADD_BOOKMARK(this.statusChangeNameD,this.statusChangeUrlD,this.BookMarkFlag,this.statusChangeParam,this)
                       this.idArray.ids=[]
                   }
                }else{
                     ADD_BOOKMARK(this.statusChangeNameD,this.statusChangeUrlD,this.BookMarkFlag,'default',this);
                   
            }
       
        }else if(command=="f"){
            alert("测试修改密码")
        }else if(command=="h"){
             alert("测试发放卡券")
        } else if(command=="i"){
             alert("测试发送消息")
        }
        else if(command=="j"){
             alert("测试积分清零")
        }
    }       
  },
  components:{
    buttonGroup,
    Table,
    dialogBox,
    }
};
</script>

<style scoped>
.error_tips {
  height: 15px;
  line-height: 15px;
  color: #f66;
}
.dialogBtn{
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    background-color: #fff;
    color: #c9c9c9;
    border: none;
    border-top: 1px solid #c9c9c9;
    outline: none;
    cursor: pointer;
}
.dialogBtn:focus{
    outline: none;
}
.dialog-footer .dialogBtn:first-child{
   border-right: 1px solid #c9c9c9;
}
.dialog-footer{
    padding:0;
    height: 50px;
}
.dialogBtn:hover{
     color: #6699FF;
}
.TreeMenu {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
}
.TreeMenu button {
  display: block;
  width: 100%;
  height: calc(100% / 3);
}
.formSearch {
  float: right;
}
.bg-white {
  background: white;
  border-radius: 3px;
}
.pl5 {
  padding-left: 5px;
}
open {
  display: inline-block;
  width: 49px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #cccccc;
  color: #cccccc;
  text-align: center;
  cursor: pointer;
}


</style>

<style>
.el-input__icon{
    margin-top:-2px;
}
.max-height{
    max-height:450px;
}
.tree-container{
    height: 440px;
}
.tree-container>div{
    height: 93%;
}
.search_button_wrapper{
  /* width: 40%; */
  margin-left: 10px;
  position: relative;
}
.member-list .el-button + .el-button {
  margin-left: 0;
}
.member-list .bCustSearch .el-input__inner {
  height: 30px;
  border-radius: 30px;
}

.member-list .bgcolor {
  margin-bottom: 0;
}
.member-list .cell .el-input__inner {
  border: none;
  text-align: center;
  padding: 0;
}
.member-list .bgw .el-input__inner {
  background-color: white;
}
.member-list .bgg .el-input__inner {
  background-color: #fafafa;
}

.member-list .btnGroup-box{
    float: left;
    border-bottom:none;
}
.member-list .el-dropdown{
    line-height:47px;
    cursor: pointer;
    padding-left:14px;
    font-size:12px
    
}

.member-list .tips{
    color:#F88591;
    font-size:12px;
    padding:8px 10px 10px;
}

.member-list .monetary{
    height: 35px;
}
.member-list .monetary div.el-input input{
 height: 35px;
 border-radius:0;
}
.member-list .monetary .el-input{
    width:42%;
}
.member-list .monetary span{
    padding: 0;
    width: 24px;
    text-align: center;
    background-color: rgb(194, 202, 216);
    height: 100%;
    display: inline-block;
    margin: -5px;
    line-height: 36px;
    font-size: 12px;
}
.el-dropdown-menu__item{
    float: left;
    font-size:12px;
}
.el-dropdown-menu{
    width:320px;
}

</style>
