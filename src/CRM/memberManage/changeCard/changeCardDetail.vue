<template>
    <div class="change-card bg-pray">
        <el-row class="bg-white">
            <el-col :span="24" class="section-one">
                <div class="bgcolor mt10 search-wrapper">
                    <label class="search-title">选择会员</label>
                    <el-input v-model="searchText" 
                              placeholder="卡号，手机号"
                              @keyup.native.enter='doSearch'></el-input>
                    <span class="sure-btn" @click="doSearch">确定</span>
                </div>
            </el-col>
            
            <el-col :span="24">
                <div class="wrongWrapper">
                    <span>卡号不存在 / 手机号不存在 / 格式错误</span>
                </div>
            </el-col>
        </el-row>

        <el-row class="bg-white mt20 pt10 mem-mes">
            <el-col :span='24' class="title-wrapper">
                <div class="title-log"> </div>
                <div class="title-mes">
                    <span>会员信息</span>
                </div>
            </el-col>

            <el-col :span="24" class="mt20">
                <div class="bgcolor">
                    <label class="show-title">会员姓名:</label>
                    <el-input v-model="allData.memberName" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">手机号码:</label>
                    <el-input v-model="allData.moblie" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">会员卡号:</label>
                    <el-input v-model="allData.cardCode" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">会员等级:</label>

                    <el-input v-model="allData.gradeId_GradeName" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">卡状态:</label>
                    <el-input v-model="allData.statusTValue" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">账户余额:</label>
                    <el-input v-model="allData.amount" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">账户积分:</label>
                    <el-input v-model="allData.integral" 
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">有效期:</label>
                    <el-input v-model="allData.effectiveEnd" 
                            placeholder="--"></el-input>
                            <!-- allData.memberGradeValid  -->
                </div>
            </el-col>

            <el-col :span="24" class="label-wrapper">
                <div class="bgcolor">
                    <label class="show-title">会员标签:</label>
                    <span class="member-label">无敌</span>
                    <span class="member-label">牛逼</span>
                    <span class="member-label">碉堡</span>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="go-member-detail">
                    <span>查看会员资料>></span>
                </div>
            </el-col>
        </el-row>

        <el-row class="bg-white mt20 pt10">
            <el-col :span='24' class="title-wrapper">
                <div class="title-log"> </div>
                <div class="title-mes">
                    <span>换卡信息</span>
                </div>
            </el-col>

            <el-col :span='24'>
                <div class="bgcolor changeType mt10">
                    <label>验证方式</label>
                    <el-radio v-model="radio" label="1" class="typeChoose">密码</el-radio>
                    <el-radio v-model="radio" label="2" class="typeChoose">验证码</el-radio>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area" v-show='radio==1'>
                <div class="bgcolor edit-remark">
                    <label><small>*</small>原卡密码:</label>
                    <el-input v-model="createParams.orgPwd" 
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area" v-show='radio==2'>
                <div class="bgcolor edit-remark">
                    <label><small>*</small>验证码:</label>
                    <el-input v-model="createParams.remark" 
                              placeholder="" class="test-code"></el-input>
                    <span class="test-code-span">发送验证码到手机()</span>
                </div>
            </el-col>
               
            
            <el-col :span="24" class="edit-area">
                <div class="bgcolor edit-remark">
                    <label><small>*</small>新卡卡号:</label>
                    <el-input v-model="createParams.cardCode" 
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor edit-remark">
                    <label><small>*</small>新卡密码:</label>
                    <el-input v-model="createParams.pwd" 
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor edit-remark">
                    <label><small>*</small>确认密码:</label>
                    <el-input v-model="createParams.pwd" 
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor edit-remark">
                    <label>备注:</label>
                    <el-input v-model="createParams.remark" 
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor">
                    <label><small>*</small>业务组织:</label>
                    <el-select v-model="theOuId"
                               filterable
                               clearable
                               placeholder="">
                        <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="ouSearch"></el-input>
                        <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                :data="ouAr"
                                :props="selectOuProps"
                                node-key="id"
                                ref="outree"
                                :default-expanded-keys="ouExpandId"
                                :filter-node-method="ouFilterNode"
                                :render-content="renderContentOu"
                                highlight-current
                                :expand-on-click-node="false"
                                @node-click="ouNodeClick"></el-tree>
                        <el-option v-show="false"
                                    :key="countOu.id" 
                                    :label="countOu.ouFullname" 
                                    :value="countOu.id"
                                    id="ou_confirmSelect"></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor edit-remark">
                    <label><small>*</small>操作渠道:</label>
                    <el-select v-model="channelTypeId"
                               filterable
                               clearable
                               placeholder="">
                        <el-option v-for="item in channelAr" 
                                   :key="item.itemValue" 
                                   :label="item.itemName" 
                                   :value="item.itemValue"></el-option>
                    </el-select>

                    <el-select v-model="createParams.channelId"
                               placeholder=""
                               filterable 
                               :filter-method="filterMethod"
                               clearable
                               class="channel-style">
                        <el-option v-for="item in shopArByType" 
                                   :key="item.id" 
                                   :label="item.channelName" 
                                   :value="item.id">
                                   <span>{{ item.channelName }}</span>
                                   <span>{{ item.channelCode }}</span></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="24" class="edit-area">
                <div class="bgcolor">
                    <label>操作员:</label>
                    <el-input v-model="createParams.createBy" 
                              disabled
                              placeholder=""></el-input>
                </div>
            </el-col>

            <el-col :span='24'>
                <div>
                    <span v-show='!ifSearch' class="cant-save">确定</span>
                    <span v-show="ifSearch" class="sure-save" @click="save">确定</span>
                </div>
            </el-col>

        </el-row>

        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    </div>
</template>

<script>
import dialogBox from '../../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../../common/common.js'
    export default{
        name:'changeCardDetail',
        components:{
            dialogBox
        },
        created:function(){
            let self = this; 
            self.getSelect();
        },
        computed:{
            shopArByType: function () {//下拉数据自定义搜索过滤
                return FILTER_MOTHED(this.filterKey,this.shopArByTypeEx)
            },
            countOu () {
                return this.ouItem;
            },
        },
        watch:{
            $route(to){
                let self = this;
                self.ifDoSearch();
            },
            theOuId:{
                handler:function(){
                    let self = this;
                    self.getChannelByType(self.channelTypeId);
                    self.createParams.ouId = self.theOuId;
                },
                deep:true,
            },
            channelTypeId:{
                handler:function(){
                    let self = this;
                    self.createParams.channelTypeId = self.channelTypeId;
                    self.getChannelByType(self.channelTypeId);
                },
                deep:true,
            },
        },
        data(){
            return{
                //----------------------
                createParams:{
                    "groupId": '',
                    "ouId": '',
                    "memberId": '',
                    "channelTypeId": 1,
                    "channelId": '',
                    "cardCodeOrg": "",
                    "orgPwd": "",
                    "cardCode": "",
                    "pwd": "",
                    "checkType": '',
                    "remark": "",
                    "createBy": this.$store.state.name
                },
                //----------------------
                ifSearch:false,
                searchText:'',
                radio:'1',
                allData:'',
                levelAr:[],
                statusAr:[],//
                roadAr:[],
                personAr:[],
                channelAr:[],
                shopArByTypeEx:[],
                defaultGroupId:'',
                defaultOuId:'',
                filterKey:'',

                channelTypeId:1,
                theOuId:'',
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouFullname:'',
                },
                ouAr:[],//业务组织下拉
                ouExpandId:[],//默认打开第一个树节点
                //---dialog-----------
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogVisible:false,
                dialogCommand:[],//底部按钮组控制组
            }
        },
        methods:{
            ifDoSearch:function(){
                let self = this;
                // console.log(1239)
                console.log(self.$route.params.id)
                if(self.$route.params.id!='default'){
                   
                    self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberManagement/GetMemberInfo',{memberID:self.$route.params.id}).then(function(res){
                        console.log(res)
                        if(res.result.id == '0'){
                            $('.wrongWrapper').css({display:'block'})
                        }else{
                            $('.wrongWrapper').css({display:'none'})
                            self.ifSearch = true;
                            self.allData = res.result;
                            self.allData.effectiveEnd = self.allData.effectiveEnd.split('T')[0];
                            
                            self.createParams.groupId = res.result.groupId;
                            self.createParams.ouId = res.result.ouId;
                            self.createParams.memberId = res.result.id;
                            self.createParams.statusOrg = res.result.status;
                            self.createParams.cardCodeOrg = res.result.cardCode;

                            self.defaultGroupId = res.result.groupId;
                        }
                        
                    },function(res){
                        console.log('err'+res)
                    });
                }
            },
            doSearch:function(){
                let self = this;
                self.allData = '';
                if(self.searchText == ''){
                    $('.wrongWrapper').css({display:'block'})
                }else{
                    self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberManagement/GetMemberInfo',{info:self.searchText}).then(function(res){
                        console.log(res)
                        if(res.result.id == 0){
                            $('.wrongWrapper').css({display:'block'})
                        }else{
                            $('.wrongWrapper').css({display:'none'})
                            self.ifSearch = true;
                            self.allData = res.result;
                            self.allData.effectiveEnd = self.allData.effectiveEnd.split('T')[0];
                            
                            self.createParams.groupId = res.result.groupId;
                            self.createParams.ouId = res.result.ouId;
                            self.createParams.memberId = res.result.id;
                            self.createParams.statusOrg = res.result.status;
                            self.createParams.cardCodeOrg = res.result.cardCode;

                            self.defaultGroupId = res.result.groupId;
                        }
                        
                    },function(res){
                        console.log('err'+res)
                    });
                }
                
            },
            getSelect:function(){
                let self = this;
                self.getOuTree();
                self.getMemberLevel();
                self.getStatus();
                self.getChannel();
                self.getPerson();
            },
            getOuTree:function(){
                //组织
                let self = this;
                self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                    console.log(res);
                    self.ouAr = res;
                    self.ouExpandId=self.defauleExpandTree(res.result,'id')
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                });
            },
            getMemberLevel:function(){//会员等级
                let self = this;
                self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetAll').then(function(res){
                    console.log(res)
                    self.levelAr = res.result.items;
                },function(res){
                    console.log('err'+res)
                });
            },
            getStatus:function(){
                let self = this;
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'MemberStatus'}).then(function(res){
                    console.log(res);
                    self.statusAr = res.result;
                },function(res){
                    console.log('err'+res)
                });
            },
            getChannel:function(){
                let self = this;
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ChannelType'}).then(function(res){
                    console.log(res);
                    self.channelAr = res.result;
                },function(res){
                    console.log('err'+res)
                });
            },
            //---根据type获取渠道----------
            getChannelByType:function(id){
                let self = this;
                self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{ChannelType:id,OuId:self.theOuId}).then(function(res){
                    console.log(res)
                    self.shopArByTypeEx = res.result;
                },function(res){
                    console.log('err'+res)
                });
            },
            getPerson:function(){//获取职员
                let self = this;
                self.$axios.gets('/api/services/app/EmployeeManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                    // console.log(res);
                    self.personAr = res.result.items
                },function(res){
                    console.log('err'+res)
                })
            },
            save:function(){
                let self = this;
                self.createParams.checkType = self.radio;
                self.$axios.posts('http://192.168.100.107:8092/api/services/app/MemberRelevantManagement/MemberCardChange',self.createParams).then(function(res){
                    console.log(res)
                    self.open('换卡成功','el-icon-circle-check','successERP');
                    self.initData();
                },function(res){
                    console.log('err'+res)
                    self.dialogSetting.dialogType="submit";
                    self.dialogSetting.dialogName='saveDialog'
                    self.dialogSetting.message=res.error.message;
                    self.errorTips.message=res.error.details;
                    self.errorTips.details='';
                    self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                    self.dialogVisible=true;
                });
            },
            //---下拉筛选------------------
            filterMethod(query){
                this.filterKey=query; 
            },
            //------------------------------
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
            //---dialog-----------------------------------
            dialogClick(parmas){
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="backDialog"){//保存提交对话框
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="saveDialog"){
                        this.dialogVisible=false;
                    }
                }else if(parmas.dialogButton=="取消"){
                    this.dialogVisible=false;
                }

            },
            dialogColse(){//对话框关闭回调事件
                this.dialogVisible=false;
            },
            //---提示错误-------------------------------------------
            showErrprTips(e){
                $('.wrongWrapper').css({display:'none'})
            },
            //---init----------------------------------------------
            initData:function(){
                let self = this;
                self.createParams = {
                    "groupId": '',
                    "ouId": '',
                    "memberId": '',
                    "channelTypeId": 1,
                    "channelId": '',
                    "cardCodeOrg": "",
                    "orgPwd": "",
                    "cardCode": "",
                    "pwd": "",
                    "checkType": '',
                    "remark": "",
                    "createBy": ""
                };
                self.radio = 1;
                self.allData = '';
                self.defaultGroupId = '';
                self.ifSearch = false;

            },
            //---------------------------------------------

            ouFilterNode(value,data){
                if (!value) return true;
                    return data.ouFullname.indexOf(value) !== -1;
            },
            renderContentOu(h, { node, data, store }){//所属组织
                if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouFullname}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouFullname}
                        </span>
                    );
                }
            },
            ouNodeClick:function(data){
                let self = this;

                self.ouItem.id = data.id;
                self.ouItem.ouFullname = data.ouFullname;
                self.$nextTick(function(){
                    $('#ou_confirmSelect').click()
                    console.log(123)
                })
                
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
        },
    }
</script>

<style>
.bg-white{
    background: white;
}
.bg-pray{
    background: #f2f2f2;
}
.change-card .search-wrapper{
    
    width: 310px!important;
}
.change-card .search-title{
    font-weight: bolder;
}
.change-card .sure-btn{
    display: inline-block;
    width: 60px;
    height: 35px;
    line-height: 35px;
    background:#3cc;
    color: white;
    text-align: center;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}
.change-card .bgcolor .el-input {
    display: block;
    width: calc(100% - 154px);
    height: 35px;
    float: left;
    font-size: 12px;
    border:none!important;
}
.change-card .search-wrapper .el-input__inner{
    border-radius: 4px 0 0 4px!important;
}
.change-card .show-title{
    color:#999999;
}
.change-card .label-wrapper .bgcolor{
    width:100%!important;
}
.change-card .member-label{
    width: 43px;
    height: 28px;
    line-height: 28px;
    border:1px solid #3cc;
    text-align:center;
    display: inline-block;
    color: #3cc;
    border-radius: 3px;
    margin-left: 10px;
}
.change-card .go-member-detail{
    color: #3cc;
    font-size: 12px;
    margin-left: 34px;
    cursor: pointer;
}
.change-card .changeType{
    width: 325px!important;
}
.change-card .el-radio__label{
    display: inline-block;
}
    
.change-card .edit-area .bgcolor .el-input{
     width: calc(100% - 94px)!important;
}
.change-card .edit-area .el-select{
    width: 156px!important;
}
.change-card .edit-area .channel-style{
    width: calc(100% - 250px)!important;
}
.change-card .edit-area .el-select .el-input{
    width: 100%!important;
}
.change-card .edit-area .el-select input{
    width: 100%!important;
}
.change-card .edit-remark{
    width: 600px;
}
.change-card .typeChoose{
    text-align: left;
    margin-right: 0px;
}
.title-wrapper{
    position: relative;
    padding-left: 65px;
}
.title-log{
    width: 5px;
    height: 24px;
    background: #3cc;
    display: inline-block;
    position: absolute;
    left: 36px;
    top: 0;
}
.title-mes{
    display: inline-block;
    font-size: 18px;
    font-weight: bolder;
}
.change-card .mem-mes .bgcolor .el-input input {
    border: none;
    background: none;
}
.change-card .changeType{
    width: 325px!important;
}
.sure-save{
    width: 78px;
    height: 38px;
    display: inline-block;
    background: #3cc;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    line-height: 38px;
    margin-left: 50px;
    color: white;
    font-size: 12px;
    margin-top: 30px;
    margin-bottom: 20px;
}
.cant-save{
    width: 78px;
    height: 38px;
    display: inline-block;
    background: #3cc;
    border-radius: 3px;
    cursor: no-drop;
    text-align: center;
    line-height: 38px;
    margin-left: 50px;
    color: white;
    font-size: 12px;
    margin-top: 30px;
    margin-bottom: 20px;
}
.change-card .edit-area .bgcolor .test-code{
    width: 220px!important;
}
.test-code-span{
    display: inline-block;
    border:1px solid #3cc;
    border-radius: 3px;
    margin-left: 10px;
    height: 33px;
    line-height: 33px;
    width: 274px;
    text-align: center;
    color: #3cc;
}
.wrongWrapper{
    display: none;
    padding-left:95px; 
}

.wrongWrapper span{
    color: red;
    font-size: 10px;
}
.section-one .bgcolor{
    margin-bottom: 10px;
}
</style>
