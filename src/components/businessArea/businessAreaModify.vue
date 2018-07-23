<template>
    <div class="businessAreaModify">
        <el-row  class="fixed">
             <div class="btnGroup-box">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
             </div>
        </el-row>
        <el-row class="pt20">
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>所属组织</label>
                        <el-select clearable  
                         
                        @change="changeOuId"
                        class="ouId" 
                        :class="{redBorder : validation.hasError('addData.ouId')}" 
                        v-model="addData.ouId"
                        placeholder=""
                        >
                            <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search_ou">
                            </el-input>
                            <el-tree
                             
                            :data="selectTree_ou"
                            :highlight-current="true"
                            :props="selectProps_ou"
                            node-key="id"
                            default-expand-all
                            ref="tree"
                            :filter-node-method="filterNode_ou"
                            :expand-on-click-node="false"
                            @node-click="nodeClick_ou"
                            :render-content="renderContent_ouId"
                            >
                            </el-tree>
                            <!-- <el-option class="select_tree_option" :key="item_ou.id" :label="item_ou.ouName" :value="item_ou.id" :date="item_ou.id">
                            </el-option> -->
                            <el-option class="select_tree_option" v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.ouId') }}</div>
                </div>    
            </el-col>

            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>上级业务地区</label>
                        <el-select clearable  
                         
                        
                        class="areaParentId" 
                        :class="{redBorder : validation.hasError('addData.areaParentId')}" 
                        placeholder=""
                        v-model="addData.areaParentId">
                        <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search_area">
                        </el-input>
                            <el-tree
                             
                            :data="selectTree_area"
                            :highlight-current="true"
                            :props="selectProps_area"
                            node-key="id"
                            default-expand-all
                            ref="area_tree"
                            :filter-node-method="filterNode_area"
                            :expand-on-click-node="false"
                            @node-click="nodeClick_area"
                            :render-content="renderContent_areaParentId"
                            >
                            </el-tree>
                            <el-option class="select_tree_option" :key="item_area.id" :label="item_area.areaName" :value="item_area.id" :date="item_area.id">
                            </el-option>
                            <!-- <el-option class="select_tree_option" v-for="item in selectData.area" :key="item.id" :label="item.areaName" :value="item.id" :date="item.id">
                            </el-option> -->
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.areaParentId') }}</div>
                </div>   
            </el-col>
            
            <el-col :span="24">
               <div class="bgMarginAuto">
                   <div class="bgcolor bgLongWidth"><label>
                        <small>*</small>业务地区编码</label>
                        <el-input 
                         
                        
                        class="areaCode" 
                        :class="{redBorder : validation.hasError('addData.areaCode')}" 
                        v-model="addData.areaCode"></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.areaCode') }}</div>
                </div> 
                
                
            </el-col>
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>业务地区名称</label>
                        <el-input 
                         
                        
                        class="areaName" 
                        :class="{redBorder : validation.hasError('addData.areaName')}" 
                        v-model="addData.areaName"></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.areaName') }}</div>
                </div>    
            </el-col>
            
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>负责人</label>
                        <el-input 
                         
                        
                        class="manager" 
                        :class="{redBorder : validation.hasError('addData.manager')}" 
                        v-model="addData.manager"  
                        ></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.manager') }}</div>
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
                        :autosize="{ minRows: 4, maxRows: 4}"
                        >
                        </el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.remark') }}</div>
                </div>       
            </el-col>
            
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>状态</label>
                        <el-select clearable filterable  
                         
                        
                        class="status" 
                        :class="{redBorder : validation.hasError('addData.status')}" 
                        placeholder=""
                        v-model="addData.status">
                            <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.status') }}</div>
                </div>    
            </el-col>
            
           <el-col :span="24" class="auditInformation getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createdBy" disabled="disabled"></el-input></div>
                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-date-picker 
                        v-model="auditInformation.createdTime" 
                        type="date" 
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        disabled>
                        </el-date-picker>
                    </div>
                    <div class="bgcolor"><label>修改人</label><el-input v-model="auditInformation.modifiedBy" disabled="disabled"></el-input></div>
                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-date-picker 
                        v-model="auditInformation.modifiedTime" 
                        type="date" 
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        disabled>
                        </el-date-picker>
                    </div>
                </div>                                  
            </el-col>
      </el-row>
      <!-- dialog数据变动提示 -->
        <!-- <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-question"></i></p>
                    <p class="dialog_font dialog_body_message">{{title}}</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog> -->
        <!-- dialog -->
      <!-- dialog错误信息提示 -->
        <!-- <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">信息提报有误!</p>
                </el-col>
                <el-collapse-transition>
                    <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                        <vue-scroll :ops="$store.state.option">
                            <span class="dialog_font">{{response.message}}</span>
                            <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                            <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                        </vue-scroll> 
                    </el-col>
                </el-collapse-transition>   
            </el-col>
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="errorMessage = false">确 认</button>
            </span>
        </el-dialog> -->
        <!-- dialog -->
         <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>      
  </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
  export default({
    data(){
      return{
        saveSuccess:false,
        firstModify:false,
        ifModify:false,
        title:'',
    // 错误信息提示开始
        detail_message_ifShow:false,
        errorMessage:false,
    // 错误信息提示结束
       

        search_ou:'',
        item_ou:{
            id:"",
            ouName:""
        },
        selectTree_ou:[
        ],
        selectProps_ou: {
            children: 'children',
            label: 'ouName',
            id:'id'
        },

        search_area:'',
        item_area:{
            id:"",
            areaName:""
        },
        item_area_no:{
            id:0,
            ouName:"无"
        },
        selectTree_area:[
        ],
        selectProps_area: {
            children: 'childItems',
            label: 'name',
            id:'id'
        },
      auditInformation:{//审计信息
            createdBy:"",
            createdTime:"",
            modifiedBy:"",
            modifiedTime:"",
            },

        info:{//创建人，创建时间
            createdBy:'',
            createdTime:''
        },
        AreaType:1,//树形图的地区分类(1.业务地区.2行政地区)
        addData:{
        "groupId": 1,
        "areaType": 1,
        "areaParentId": '',
        "areaCode": "",
        "areaName": "",
        "areaFullName": "string",
        "areaFullPathId": "string",
        "areaFullPathName": "string",
        "manager": "",
        "status": '',
        "remark": ""
        },
        selectData:{//select数据
            Status001:[],//启用状态
            UserType:[],//身份类型
            userGroupId:[],//所属用户组
            languageId:[],//语种
            // area:[],//上级业务地区
            ou:[],//组织
        },
        dialogUserConfirm:false,//信息更改提示控制
        choseDoing:'',//存储点击按钮判断信息
        response:{
            details:'',
            message:'',
        },
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
                dialogCommand:[],//底部按钮组控制组
                //dialogVisible:false,//对话框是否显示
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
                isUpdate:false,//是否修改
                isAdd:false,
                changeTimes:0,
      }
    },
    validators: {
        //    'addData.areaType': function (value) {//地区分类
    //      return this.Validator.value(value).required().integer()
    //   },
        'addData.areaCode': function (value) {//地区代码
            return this.Validator.value(value).required().maxLength(50)
        },
        'addData.areaName': function (value) {//地区名称
            return this.Validator.value(value).required().maxLength(50);
        },
    //   'addData.areaFullName': function (value) {//地区全称
    //      return this.Validator.value(value).required().maxLength(200);
    //   },
    //   'addData.areaFullPathId': function (value) {//全路径ID
    //      return this.Validator.value(value).required().maxLength(1000);
    //   },
    //   'addData.areaFullPathName': function (value) {//全路径名称
    //      return this.Validator.value(value).required().maxLength(1000);
    //   },
        'addData.manager': function (value) {//负责人
            return this.Validator.value(value).maxLength(20);
        },
        'addData.ouId': function (value) {//
            return this.Validator.value(value).required().integer();
        },
        'addData.areaParentId': function (value) {//上级业务地区
            return this.Validator.value(value).integer();
        },
        'addData.status': function (value) {//启用状态
            return this.Validator.value(value).required().integer();
        },
        'addData.remark': function (value) {//备注
            return this.Validator.value(value).maxLength(200);
        },
    }, 
    created () {
        let _this=this;
        _this.getSelectData();
        _this.loadTree();  
        _this.getData()
    },
    watch: {
        search_area(val) {
            this.$refs.area_tree.filter(val);
        },
        search_ou(val) {
            this.$refs.tree.filter(val);
        },
        // addData:{
        //     handler:function(val,oldVal){
        //         let _this=this;
        //         if(!_this.saveSuccess){
        //             if(!_this.firstModify){
        //                 _this.firstModify=!_this.firstModify;
        //             }else{
        //                 _this.ifModify=true
        //             }
        //         }else{
        //              _this.ifModify=true;
        //         }
        //     },
        //     deep:true,
        //   }
         addData:{
             handler: function (val, oldVal) {
              this.changeTimes++
              if(this.changeTimes>=2){
                  this.buttonGroup[1].disabled=true;
                  this.buttonGroup[2].disabled=true;
                  this.buttonGroup[3].disabled=false;
                  this.buttonGroup[4].disabled=false;
                  this.buttonGroup[5].disabled=false;
              }
          },
          deep:true
      },
     },
    methods: {
         btnClick(btn){             
                if(btn=="取消"){//取消确认对话框
                    if(this.$route.params.id=="default"&&this.changeTimes<2){//新增操作
                        this.$store.state.url='/businessArea/businessAreaList/default'
           		        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else{
                        this.dialogSetting.dialogName='cancelDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }
                }else if(btn=="保存"){
                    this.save();
                }else if(btn=="删除"){//删除确认对话框
                    this.dialogSetting.dialogName='delDialog'
                    this.dialogSetting.message="确定删除？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }else if(btn=="返回"){
                    console.log(this.changeTimes)
                    if(this.$route.params.id!=="default"&&this.changeTimes<2){//新增操作
                        this.$store.state.url='/businessArea/businessAreaList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else if(this.$route.params.id!=="default"&&this.changeTimes>2){
                        this.$store.state.url='/businessArea/businessAreaList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                    }else{
                        this.dialogSetting.dialogName='backDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                    }
                }else if(btn="保存并新增"){
                   this.saveAdd();
                }
         },
        getSelectData(){
            let _this=this;
            // _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'UserType'}).then(function(res){ 
            // // 身份类型
            // _this.selectData.UserType=res.result;
            // })
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
            // 启用状态
            _this.selectData.Status001=res.result;
            })
            // _this.$axios.gets('/api/services/app/AreaManagement/GetAll').then(function(res){ 
            // // 业务地区
            // _this.selectData.area=res.result.items;
            // })
            _this.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){ 
            // 所属组织
            _this.selectData.ou=res.result;
            })
            // _this.$axios.gets('/api/services/app/UserGroup/GetAll',{SkipCount:_this.SkipCount,MaxResultCount:_this.MaxResultCount}).then(function(res){ 
            // // 所属用户组
            //     _this.selectData.userGroupId=res.result.items;
            //     _this.totalCount=res.result.totalCount;
            // })
            // ///api/services/app/Language/GetLanguages
            // _this.$axios.gets('/api/services/app/Language/GetLanguages').then(function(res){ 
            // // 语种
            //     _this.selectData.languageId=res.result.items;
            // })
        },
        changeOuId(){
            let _this=this;
            _this.getAreaTree(_this.addData.ouId)
             _this.addData.areaParentId="";
            //  _this.item_area.id=0;
            //  _this.item_area.areaName='无'
        },
        getAreaTree(OuId){
            let _this=this;
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:OuId})
            .then(function(res){
                if(res.result==null || res.result==[]){
                    _this.selectTree_area=[]
                }else{
                    _this.selectTree_area=res.result;
                }
                
            },function(res){
            })
        },
        getData(){
            let _this=this;
             _this.$axios.gets('/api/services/app/OpAreaManagement/Get',{id:_this.$route.params.id})
            .then(function(res){
                _this.addData={
                    "id": res.result.id,
                    "groupId":  res.result.groupId,
                    "ouId":  res.result.ouId,
                    "areaType": res.result.areaType,
                    "areaParentId":  res.result.areaParentId,
                    "areaCode":  res.result.areaCode,
                    "areaName":  res.result.areaName,
                    "areaFullName":  res.result.areaFullName,
                    "areaFullPathId": res.result.areaFullPathId,
                    "areaFullPathName":  res.result.areaFullPathName,
                    "manager":  res.result.manager,
                    "status":  res.result.status,
                    "remark":  res.result.remark
                    }
                 _this.auditInformation={//审计信息
                    createdBy:res.result.createdBy,
                    createdTime:res.result.createdTime,
                    modifiedBy:res.result.modifiedBy,
                    modifiedTime:res.result.modifiedTime,
                } 
                 _this.item_ou.id=res.result.ouId;
                 _this.item_ou.ouName=res.result.ouName;
                _this.item_area.id=res.result.areaParentId;
                _this.item_area.areaName=res.result.areaParentId_AreaName;
                _this.getAreaTree(res.result.ouId)
                // _this.loadTree('ouId',res.result.ouId);  
                _this.saveSuccess=false;
                _this.firstModify=false;
                _this.ifModify=false;
            },function(res){    

            })  
        },
         filterNode_ou(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
        },
        filterNode_area(value, data) {
            if (!value) return true;
            return data.areaName.indexOf(value) !== -1;
        },
        showErrprTips(e){
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
        },
        showErrprTipsSelect(e){
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').parent('.el-select').hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
        },
        showErrprTipsRangedate(e){
            $('.tipsWrapper').each(function(){
                if($(e.$el).hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
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
        isBack(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogUserConfirm=true;
                _this.title='此操作将忽略您的更改，是否继续？'
                _this.choseDoing='back'
            }else{
                _this.back()
            }
        },
        isCancel(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogUserConfirm=true;
                _this.title='此操作将忽略您的更改，是否继续？'
                _this.choseDoing='Cancel'
            }
        },
        isDeleteThis(){
            let _this=this;
            _this.dialogUserConfirm=true;
            _this.title='确认删除？'
            _this.choseDoing='deleteThis'

        },
        sureDoing(){
            let _this=this;
            if(_this.choseDoing=='back'){
                _this.back()
                _this.dialogUserConfirm=false;
            }else if(_this.choseDoing=='Cancel'){
                _this.Cancel();
                _this.dialogUserConfirm=false;
            }else if(_this.choseDoing=='deleteThis'){
                _this.deleteThis();
                _this.dialogUserConfirm=false;
            }
        },
        back(row){
            this.$store.state.url='/businessArea/businessAreaList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
        },
        Cancel(){
                this.validation.reset();
                this.getData();
                this.firstModify=false;
                this.ifModify=false;
        },
        getErrorMessage(message,details,validationErrors){
            let _this=this;
            _this.response.message='';
            _this.response.details='';
            _this.response.validationErrors=[];
            if(details!=null && details){
                _this.response.details=details;
            }
            if(message!=null && message){
                _this.response.message=message;
            }
            if(message!=null && message){
                _this.response.validationErrors=validationErrors;
            }
        },
        save(){
            let _this=this;
            _this.$validate()
            .then(function (success) {
                if (success) {
                    _this.$axios.puts('/api/services/app/OpAreaManagement/Update',_this.addData)
                    .then(function(res){
                          _this.auditInformation={//审计信息
                            createdBy:res.result.createdBy,
                            createdTime:res.result.createdTime,
                            modifiedBy:res.result.modifiedBy,
                            modifiedTime:res.result.modifiedTime,
                        }
                        _this.open('保存成功','el-icon-circle-check','successERP');
                         _this.saveSuccess=true;
                        _this.firstModify=false;
                        _this.ifModify=false;
                        _this.buttonGroup[1].disabled=false;//新增按钮
                        _this.buttonGroup[2].disabled=false;//删除按钮
                        _this.buttonGroup[3].disabled=true;//保存按钮
                        _this.buttonGroup[4].disabled=true;//保存并新增按钮
                        _this.buttonGroup[5].disabled=true;//取消按钮
                        _this.changeTimes=1;
                        
                    },function(res){
                        if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                        _this.errorMessage=true;
                    })
                }
            });
        
        },
        add(){
            let _this=this;
            _this.$store.state.url='/businessArea/businessAreaDetail/default';
            _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
        },
        deleteThis(){
             let _this=this;
            _this.$axios.deletes('/api/services/app/OpAreaManagement/Delete',{id:_this.$route.params.id})
            .then(function(res){
                _this.dialogUserConfirm=false;
                _this.open('删除成功','el-icon-circle-check','successERP');
                _this.back();
            },function(res){
                if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                _this.dialogUserConfirm=false;
                _this.errorMessage=true;
            })
        },
        saveAdd(){
            let _this=this;
            
            _this.$validate()
            .then(function (success) {
                if (success) {
                    _this.$axios.puts('/api/services/app/OpAreaManagement/Update',_this.addData)
                    .then(function(res){
                        _this.add()
                        _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
                    },function(res){
                        if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                        _this.errorMessage=true;
                    })
                }
            });
        },
        loadTree(){
           let _this=this;
            //地区
            // _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:_this.addData.OuId})
            // .then(function(res){
            //     _this.selectTree_area=res.result;
            // },function(res){
            // })
            //组织
             _this.$axios.gets('/api/services/app/OuManagement/GetAllTree')
            .then(function(res){
                _this.selectTree_ou=res;
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
                    // if($(this).attr('data-id')==key){ 
                    //     $(this).click()
                    // }
                })
            })
        },
        nodeClick_ou(data,node,self){
            let _this=this;
            // _this.item_ou.id=data.id;
            // _this.item_ou.ouName=data.ouName;
            // _this.$nextTick(function(){
        //     $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({
            //     top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top + 26,
            // }).click();
        // })
            $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                if($(this).attr('date')==data.id){
                    $(this).css({
                        top:$(self.$el).offset().top - $(self.$el).parents('.el-select-dropdown__list').offset().top + 26,
                    }).click()
                }
            })
        },
        nodeClick_area(data,node,self){
            let _this=this;
            //  console.log(data.id)
            // console.log(_this.addData)
            if(_this.addData.id==data.id){
                alert("上级业务地区不能为业务地区本身")
            }else{
                _this.item_area.id=data.id;
                _this.item_area.areaName=data.areaName;
                _this.$nextTick(function(){
                    $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({
                        top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top + 26,
                    }).click();
                })
                //  $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                //     if($(this).attr('date')==data.id){
                //         $(this).css({
                            //     top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,
                            // }).click()
                //     }
                // })
            }
        },
        renderContent_ouId(h, { node, data, store }){
             if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
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
        renderContent_areaParentId(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.areaName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.areaName}
                        </span>
                    );
                }
        },
          dialogClick(parmas){//对话框点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
                        if(this.$route.params.id=="default"){
                            this.validation.reset();                 
                            this.$store.state.url='/businessArea/businessAreaList/default'
                            this.$router.push({path:this.$store.state.url})//点击切换路由
                        }else{
                            this.getData();
                        }
                        this.changeTimes=0;
                        this.buttonGroup[1].disabled=false;
                        this.buttonGroup[2].disabled=false;
                        this.buttonGroup[3].disabled=true;
                        this.buttonGroup[5].disabled=true;
                        this.buttonGroup[4].disabled=true;
                        this.dialogVisible=false; 
                    }else if(parmas.dialogName=="delDialog"){//删除确认操作
                        let _this=this;
                        _this.$axios.deletes('/api/services/app/OpAreaManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                            _this.$store.state.url='/businessArea/businessAreaList/default'
                            _this.$router.push({path:_this.$store.state.url})//点击切换路由
                            _this.open('删除成功','el-icon-circle-check','successERP'); 
                            _this.dialogVisible=false; 
                        }).catch(function(err){
                            _this.dialogVisible=false;  
                            _this.$message({
                                type: 'warning',
                                message: err.error.message
                            });
                        }) 
                    }else if(parmas.dialogName=="saveDialog"){//保存报错对话框
                        this.dialogVisible=false
                    }else if(parmas.dialogName=="backDialog"){//返回主页面对话框
                         this.$store.state.url='/businessArea/businessAreaList/default'
                         this.$router.push({path:this.$store.state.url})//点击切换路由
                    }
                }else{
                    this.dialogVisible=false; 
                }
            },
            dialogColse(){
                this.dialogVisible=false;
            },
       },
        components:{
            buttonGroup,
            Table,
            dialogBox,
            Tree
    }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}
.businessAreaModify  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
 .businessAreaModify .el-row{
    background-color: #fff;
  }
.businessAreaModify  .getPadding{
     padding: 0 10px;
 }
  .businessAreaModify .el-row:last-child{
    padding-bottom: 15px;
  }
  .businessAreaModify .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
.businessAreaModify .bgcolor.longWidth{
    margin-right: 0;
    width: 421px;
    height:auto;
    float: left;
  }
  .marginAuto{
      margin: auto;
      width: 550px;
  }
  .error_tips{
      color: red;
      font-size: 12px;
      float: left;
      height: 35px;
      line-height: 35px;
  }
  .businessAreaModify .bgcolor.longWidth .el-input,
  .businessAreaModify .bgcolor.longWidth .el-textarea,
  .businessAreaModify .bgcolor.longWidth .el-select{
      width: calc(100% - 90px)
  }
  .businessAreaModify .bgcolor.longWidth label{
    width:80px;
  }
 .businessAreaModify .bgcolor.longWidth .el-textarea{
   font-size: 12px;
 } 
 .businessAreaModify .bgcolor.longWidth .addZoo{
   float: left;
   width: calc(100% - 82px)
 }
.businessAreaModify .bgcolor.longWidth .add{
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 3px;
    background-color: #c7c7c7;
    color: #fff;
    text-align: center;
    line-height: 35px;
    text-decoration: none;
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
}
.businessAreaModify .bgcolor.longWidth .addRole{
  text-align: center;
  line-height: 35px;
  display: inline-block;
  width: 66px;
  height: 35px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.businessAreaModify .bgcolor.longWidth .add:hover{
    background-color: #354052;
}
.businessAreaModify .bgcolor.longWidth .addRole i{
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
}
.businessAreaModify .bgcolor.longWidth .addRole:hover i{
  color:#f66;
}
</style>

<style>
  .businessAreaModify .bgcolor .el-select .el-input input{
    height: 35px!important;
    }
  </style>