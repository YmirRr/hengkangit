<template>
    <div class="userGroupDetail">
       <el-row class="fixed">
           <div class="btnGroup-box">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
            </div>
        </el-row>
        <el-row class="pt20">  
            <el-col :span="24" class="pt15">
               <div class="bgMarginAuto">
                   <div class="bgcolor bgLongWidth"><label>
                        <small>*</small>用户组编码</label>
                        <el-input 
                        
                        class="userGroupCode" 
                        :class="{redBorder : validation.hasError('addData.userGroupCode')}" 
                        v-model="addData.userGroupCode"></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.userGroupCode') }}</div>
                </div> 
            </el-col>
            <el-col :span="24" >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>用户组名称</label>
                        <el-input 
                        
                        class="userGroupName" 
                        :class="{redBorder : validation.hasError('addData.userGroupName')}" 
                        v-model="addData.userGroupName"></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.userGroupName') }}</div>
                </div>    
            </el-col>
          
            <el-col :span="24">
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>所属组织</label>
                        <el-select clearable filterable  
                        placeholder=""
                        class="ouId" 
                        
                        :class="{redBorder : validation.hasError('addData.ouId')}" 
                        v-model="addData.ouId"
                        >
                            <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search_ou">
                            </el-input>
                            <el-tree
                             :render-content="renderContent_"
                            :data="selectTree_ou"
                            :highlight-current="true"
                            :props="selectProps_ou"
                            node-key="id"
                            default-expand-all
                            ref="tree"
                            :filter-node-method="filterNode_ou"
                            :expand-on-click-node="false"
                            @node-click="nodeClick_ou"
                            >
                            </el-tree>
                            <!-- <el-option v-show="false" :key="item_ou.id" :label="item_ou.ouFullName" :value="item_ou.id">
                            </el-option> -->
                            <el-option v-show="false"  v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.ouId') }}</div>
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
      </el-row>
       <el-row>
           <!-- <auditInfo :auditInformation='auditInformation'></auditInfo> -->
            <el-col :span="22" class="auditInformation getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createdBy" disabled="disabled"></el-input></div>
                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-date-picker 
                        v-model="auditInformation.createdTime" 
                        type="date" 
                        disabled 
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" >
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
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-question"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
      <!-- dialog错误信息提示 -->
        <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">{{response.message}}!</p>
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
        </el-dialog>
        <!-- dialog -->
  </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
import auditInfo from '../../base/auditInfo/auditInfo'
  export default({
    data(){
      return{
        firstModify:false,
        ifModify:false,
         // 错误信息提示开始
        detail_message_ifShow:false,
        errorMessage:false,
        // 错误信息提示结束
        test:'',
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
        addData:{
            "groupId": 1,
            "ouId": "",
            "userGroupCode": "",
            "userGroupName": "",
            "remark": "",
            "status": 1
        },
        auditInformation:{
            createdTime:this.GetDateTime(),//创建时间
            createdBy:this.$store.state.name,//创建人
            modifiedTime:this.GetDateTime(),//修改人
            modifiedBy:this.$store.state.name//修改时间
        },
        selectData:{//select数据
            Status001:[],//启用状态
            ou:[],//组织
        },
        response:{
            details:'',
            message:'',
        },
//----------按钮操作--------------
        choseDoing:'',//存储点击按钮判断信息
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
        isAdd:false,
        changeTimes:0,

      }
    },
     validators: {
      'addData.userGroupCode': function (value) {//地区代码
         return this.Validator.value(value).required().maxLength(50);
      },
      'addData.userGroupName': function (value) {//地区名称
         return this.Validator.value(value).required().maxLength(50);
      },
      'addData.ouId': function (value) {//
          return this.Validator.value(value).required().integer();
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
        _this.getDefault();
        _this.loadTree();  
    },
     watch: {
      search_area(val) {
        this.$refs.tree.filter(val);
      },
      search_ou(val) {
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
    },
    methods: {
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
        filterNode_ou(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
        },
        getDefault(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){ 
            // 默认用户业务组织
            _this.addData={
                "groupId": 1,
                "ouId": res.result.id,
                "userGroupCode": "",
                "userGroupName": "",
                "remark": "",
                "status": 1
            }
            _this.validation.reset();
            })
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
            //     _this.selectData.area=res.result.items;
            //     if(_this.$route.params.id!="default"){
            //         _this.addData.areaParentId=parseInt(_this.$route.params.id.split(',')[0]);
            //     }
            // })
            _this.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){ 
            // 所属组织
                _this.selectData.ou=res.result;
                // if(_this.$route.params.id!="default"){
                //     _this.addData.ouId=parseInt(_this.$route.params.id.split(',')[1]);
                // }
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
      loadTree(){
            let _this=this;
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
                })
            })
        },
      back(row){
          this.$store.state.url='/userGroup/userGroupList/default'
          this.$router.push({path:this.$store.state.url})//点击切换路由
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
                 _this.$axios.posts('/api/services/app/UserGroup/Create',_this.addData)
                .then(function(res){
                    _this.open('保存成功','el-icon-circle-check','successERP');
                    _this.$store.state.url='/userGroup/userGroupModify/'+res.result.id
                    _this.$router.push({path:_this.$store.state.url})//点击切换路由
                },function(res){   
                    if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                    _this.errorMessage=true; 
                })
            }
        });
      },
    nodeClick_ou(data,node,self){
        let _this=this;
        _this.item_ou.id=data.id;
        _this.item_ou.ouFullName=data.ouFullName;
        // _this.$nextTick(function(){
        //     $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
        // })
        $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
            if($(this).attr('date')==data.id){
                $(this).click()
            }
        })
    },
    //-------------按钮操作-----------
        isBack(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogUserConfirm=true;
                _this.choseDoing='back'
            }else{
                _this.back()
            }
        },
        isCancel(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogUserConfirm=true;
                _this.choseDoing='Cancel'
            }
        },
        sureDoing(){
            let _this=this;
            if(_this.choseDoing=='back'){
                _this.back()
                _this.dialogUserConfirm=false;
            }else if(_this.choseDoing=='Cancel'){
                _this.Cancel();
                _this.dialogUserConfirm=false;
            }
        },
        Cancel(){
            let _this=this;
            _this.clearData();
            _this.ifModify=false;
            _this.firstModify=false;
        },
        clearData(){
            let _this=this;
            _this.getDefault()
        },
        saveAdd(){
            let _this=this;
            _this.$validate()
            .then(function (success) {
            if (success) {
                 _this.$axios.posts('/api/services/app/UserGroup/Create',_this.addData)
                .then(function(res){
                    _this.open('保存成功','el-icon-circle-check','successERP');
                    _this.$store.state.url='/userGroup/userGroupDetail/default'
                    _this.$router.push({path:_this.$store.state.url})//点击切换路由
                    _this.Cancel();
                },function(res){   
                    if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)}
                    _this.errorMessage=true; 
                })
            }
        });
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
        }
    },
    components:{
        buttonGroup,
        Table,
        dialogBox,
        Tree,
        auditInfo
        }

})
</script>



<style scoped>
.pt15{
    padding-top: 15px;
}
.userGroupDetail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
  .userGroupDetail .el-row:last-child{
    padding-bottom: 15px;
  }
  .userGroupDetail .bgcolor .isGive{
    display: block;
    float: left;
    height: 100%;
    line-height: 35px;
  }
  .userGroupDetail .el-row {
    background-color: #fff;
}
.userGroupDetail .getPadding{
    padding: 0 10px;
}
h4.h4 {
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    padding-bottom: 15px;
}
</style>

