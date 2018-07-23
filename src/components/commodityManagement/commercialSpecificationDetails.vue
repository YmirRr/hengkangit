<template>
    <div class="commercialSpecificationDetails commodity">
        <el-row class="bg-white">
            <el-col :span='24' class="border-left">
                <div class="fixed bg-white">
                    <btm :date="bottonbox" v-on:listbtm="btmlog"></btm>
                </div>
                    <el-row class="pl10 pr10">
                        <el-col :span="24" style="margin-top:20px">
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>规格编码</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" 
                                :class="{redBorder : validation.hasError('addData.specCode')}"
                                 @change="isUpdate" v-model="addData.specCode"  ></el-input>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.specCode') }}</div>
                        </el-col>
                    </el-row>    
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>规格名称</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" 
                                :class="{redBorder : validation.hasError('addData.specName')}"
                                 v-model="addData.specName" @change="isUpdate"  ></el-input>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.specName') }}</div>
                        </el-col>
                    </el-row>  
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>控件类型</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                    <el-select v-model="addData.controlType" 
                                    :class="{redBorder : validation.hasError('addData.controlType')}"
                                     @change="isUpdate" >
                                    <el-option  v-for="item in ControlTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                    </el-select>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.controlType') }}</div>
                        </el-col>
                    </el-row>  
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small></small>显示顺序</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" v-model="addData.seq" @change="isUpdate" ></el-input>
                                </div>
                            </el-col>
                        </el-col>
                    </el-row>  
                    <el-row class="pl10 pr10">
                        <el-col :span="24">
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small></small>状态</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <!-- <el-input placeholder=""  v-model="addData.status" ></el-input> -->
                                    <el-select v-model="addData.status" @change="isUpdate" :disabled="isDisabled">
                                        <el-option  v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>

                                    </el-select>
                                </div>
                            </el-col>
                        </el-col>
                    </el-row>  
                    <el-row class="pl10 pr10">
                        <el-col :xl="9" :lg="9" :md="4" :sm="5" :xs="6" style="margin-left:106px">               
                            <div class="bgcolor smallBgcolor">
                                <el-checkbox v-model="addData.specgroupEnable" @change="isUpdate">启用规格组</el-checkbox>
                            </div>
                        </el-col>
                        <!-- <el-col :xl="2" :lg="2" :md="4" :sm="5" :xs="6">
                            <div class="bgcolor smallBgcolor">
                                <el-checkbox  >必填</el-checkbox>
                            </div>
                        </el-col> -->
                    </el-row>
                <el-row class="pl10 pr10 pt10" style="border-top:1px solid #e4e4e4;   ">
                    <el-col :span="24" style="margin-bottom:40px;">
                        <h4>审计信息</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>创建人</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.createdBy" :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>创建时间</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.createdTime"  :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>修改人</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.modifiedBy" :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>修改时间</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.modifiedTime" :disabled="isDisabled" ></el-input>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- dialog是否删除提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">确认删除？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font yes" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font no" @click="dialogUserConfirm = false">取 消</button>
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
                    <p class="dialog_font dialog_body_message">数据提交有误!</p>
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
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="errorMessage = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
        
    </div>
</template>

<script>
import Textbox from '../../base/textbox/textbox' 
    export default{
        name:'customerInfor',
        data(){
            return{
                radio:'1',
                isDisabled: true,
                ControlTypeOptions:[{
                    value: 0,
                    label: '下拉'},
                    {value: 1,
                    label: '手工录入'
                }],
                statusOptions:[{
                    value: 0,
                    label: '停用'},
                    {value: 1,
                    label: '启用'
                }],
                options: [{
                    value: '选项1',
                    label: '仓库'
                    }, {
                    value: '选项2',
                    label: '地址'
                    }, {
                    value: '选项3',
                    label: '总部'
                    }, {
                    value: '选项4',
                    label: '总部2'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],
                bottonbox:{
                    url: '/commercial/commercialSpecification',
                   botton:[{
                    class: 'erp_bt bt_back',
                    show:true,
                    update: false,
                    imgsrc: '../../../static/image/common/bt_back.png',
                    text: '返回',
                    increased: true
                },{
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    show:true,
                    text: '保存',
                    increased: true
                },{ class: 'erp_bt bt_auxiliary cancel',
                    show:true, 
                    imgsrc: '../../../static/image/common/u470.png',
                    text: '取消',
                    increased: true
                },{
                    class: 'erp_bt bt_save_add',
                    imgsrc: '../../../static/image/common/bt_save_add.png',
                    show:true,
                    text: '保存并新增',
                    increased: true
                },{  class: 'erp_bt bt_add after',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    show:true,
                    increased: false
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    show:true,
                    increased: false
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    show:true,
                    text: '审核',
                    increased: true
                }]},
                addData:{//键子对
                    groupId: 1,
                    specCode: "",
                    specName: "",
                    controlType: '',
                    specgroupEnable: false,
                    seq: '',
                    status: 1,
                    createdTime:this.GetDateTime(),//创建时间
                    createdBy:this.$store.state.name,//创建人
                    modifiedTime:this.GetDateTime(),//修改人
                    modifiedBy:this.$store.state.name//修改时间
                    
                },
                value: '',
                errorMessage:false,
                detail_message_ifShow:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                all:{
                    createList:[],
                    updateList:[],
                },
                dialogUserConfirm:false,
                preserve:true,//保存状态控制
                preserve1:false,//修改保存状态控制
                preserveAdd:true,//保存新增状态控制
                abolish:true,//取消状态控制
                Add:false,//新增状态控制
                del:false//删除状态控制
            }
        },
         validators: {
          'addData.specCode': function (value) {//规格编码
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.specName': function (value) {//用户编码
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.controlType': function (value) {//用户编码
             return this.Validator.value(value).required().maxLength(50)
          },
        },
        created:function(){
            let _this=this;
            _this.InitModify();
            if(this.$route.params.id !="default"){
                _this.statusBotton(false,false,false,true,true);
                _this.statusBottontwo(false,false,false,false,true,true);

            }
        },
        methods:{
            InitModify(){
                let _this=this;
                if(_this.$route.params.id=="default"){
                    return;
                }else{
                    _this.$axios.gets('/api/services/app/SpecManagement/Get',{Id:_this.$route.params.id}).then(function(res){
                        console.log(res);
                        _this.addData.groupId = res.result.groupId;
                        _this.addData.specCode = res.result.specCode;
                        _this.addData.specName = res.result.specName;
                        _this.addData.controlType = res.result.controlType;
                        _this.addData.isSystem = res.result.isSystem;
                        _this.addData.seq = res.result.seq;
                        _this.addData.status = res.result.status;
                        _this.addData.specgroupEnable = res.result.specgroupEnable;
                        _this.addData.createdBy = res.result.createdBy;//创建人
                        _this.addData.createdTime = res.result.createdTime.substring(0,19).replace('T', ' ');//创建时间
                        _this.addData.modifiedBy = res.result.modifiedBy;//修改人
                        _this.addData.modifiedTime = res.result.modifiedTime.substring(0,19).replace('T', ' ');//修改时间
                    })
                }
                 
            },
            btmlog:function(data){
                let _this=this;
                if(data == '新增保存' || data == '保存并新增'){
                    if(data == '新增保存'){
                    if(_this.preserve){//新建保存
                        _this.$validate().then(function(success){
                            if(success){
                                if(_this.addData.seq != '' && parseInt(_this.addData.seq) != NaN){
                                    _this.addData.seq=parseInt(_this.addData.seq);
                                }else{
                                    _this.addData.seq = 0;
                                }
                                _this.$axios.posts('/api/services/app/SpecManagement/Create',_this.addData).then(function(res){
                                    _this.statusBotton(false,false,false,true,true);
                                    _this.statusBottontwo(false,false,false,false,true,true);
                                    _this.bottonbox.botton[0].update = false;
                                    _this.$store.state.url=`/commercial/commercialSpecificationModify/${res.result.id}`;
                                    _this.$router.push({path:_this.$store.state.url});
                                    _this.open('创建商品类目成功','el-icon-circle-check','successERP');    
                                },function(res){
                                    _this.open('创建商品类目失败','el-icon-error','faildERP');
                                    console.log(res)
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors); 
                                });
                            }
                        })
                    }

                    if(_this.preserve1){//修改保存
                       _this.$validate().then(function(success){
                            if(success){
                                if(_this.addData.seq != '' && parseInt(_this.addData.seq) != NaN){
                                    _this.addData.seq=parseInt(_this.addData.seq);
                                }else{
                                    _this.addData.seq = 0;
                                }
                                _this.addData.id = _this.$route.params.id
                                // _this.all.updateList = _this.addData;
                                console.log( _this.addData)
                                _this.$axios.puts('/api/services/app/SpecManagement/Update', _this.addData).then(function(res){
                                    _this.statusBotton(false,false,false,true,true);
                                    _this.statusBottontwo(false,false,false,false,true,true);
                                    _this.bottonbox.botton[0].update = false;
                                    _this.open('保存商品类目成功','el-icon-circle-check','successERP');    
                                },function(res){
                                    console.log(res) 
                                    _this.open('保存商品类目失败','el-icon-error','faildERP');
                                    _this.errorMessage=true;
                                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    console.log(res) 
                                });
                            }
                        }) 
                    }
                }
                    if(data == '保存并新增'){
                        if(_this.preserveAdd && _this.preserve1 == false){
                            _this.$validate().then(function(success){
                                if(success){
                                    if(_this.addData.seq != '' && parseInt(_this.addData.seq) != NaN){
                                        _this.addData.seq=parseInt(_this.addData.seq);
                                    }else{
                                        _this.addData.seq = 0;
                                    }
                                    _this.$axios.posts('/api/services/app/SpecManagement/Create',_this.addData).then(function(res){
                                        _this.statusBotton(false,false,false,true,true);
                                        _this.statusBottontwo(false,false,false,false,true,true);
                                        _this.bottonbox.botton[0].update = false;
                                        _this.$store.state.url='/commercial/commercialSpecificationModify/default'
                                        _this.$router.push({path:_this.$store.state.url})//点击切换路由OuManage
                                        _this.open('创建商品类目成功','el-icon-circle-check','successERP');    
                                    },function(res){
                                        _this.open('创建商品类目失败','el-icon-error','faildERP');
                                        console.log(res) 
                                        _this.errorMessage=true;
                                        _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    });
                                }
                            })           
                        }
                        if(_this.preserve1){//修改保存
                            _this.$validate().then(function(success){
                                if(success){
                                    if(_this.addData.seq != '' && parseInt(_this.addData.seq) != NaN){
                                        _this.addData.seq=parseInt(_this.addData.seq);
                                    }else{
                                        _this.addData.seq = 0;
                                    }
                                    _this.addData.id = _this.$route.params.id
                                    console.log(_this.addData)
                                    _this.$axios.puts('/api/services/app/SpecManagement/Update',_this.addData).then(function(res){
                                        _this.statusBotton(false,false,false,true,true);
                                        _this.statusBottontwo(false,false,false,false,true,true);
                                        _this.bottonbox.botton[0].update = false;
                                        _this.$store.state.url='/commercial/commercialSpecificationModify/default'
                                        _this.$router.push({path:_this.$store.state.url})//点击切换路由OuManage
                                        _this.open('保存商品类目成功','el-icon-circle-check','successERP');    
                                    },function(res){
                                        _this.open('保存商品类目失败','el-icon-error','faildERP');
                                        console.log(res) 
                                        _this.errorMessage=true;
                                        _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                                    });
                                }
                            }) 
                    }
                    }

                }
                if(data == '新增'){
                    if(_this.Add){
                        _this.bottonbox.botton[0].update=false;
                        _this.$store.state.url='/commercial/commercialSpecificationModify/default'
                        _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
                    }  
                }
                if(data == '删除'){
                    if(_this.del){
                        _this.dialogUserConfirm=true;
                    }     
                }
                if(data == '取消'){

                    if(!_this.preserve1){
                        _this.$store.state.url='/commercial/commercialSpecification/default'
                        _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage 
                    }
                    if(_this.preserve1){
                        _this.InitModify();
                        _this.statusBotton(false,false,false,true,true);
                        _this.statusBottontwo(false,false,false,false,true,true);
                        _this.bottonbox.botton[0].update = false;
                    }
                }
            },
            GetDateTime: function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var Hours = date.getHours();
                var Seconds = date.getSeconds();
                var Minutes = date.getMinutes();
                function dataTime(a){
                   if (a >= 1 && a <= 9) {
                        a = "0" + a;
                        return a
                    } 
                    return a
                }
                function datahous(a){
                   if (a < 10) {
                        a = "0" + a;
                        return a;
                    } 
                    return a ;
                }
                var currentdate = date.getFullYear() + seperator1 + dataTime(month) + seperator1 + dataTime(strDate) + ' ' + datahous(Hours) + seperator2 + datahous(Minutes) + seperator2 +  datahous(Seconds);
                return currentdate;
            },
            isUpdate(){
                this.bottonbox.botton[0].update=true; 
                if(this.$route.params.id !="default"){
                    this.statusBotton(true,true,true,false,false);
                    this.statusBottontwo(false,true,true,true,false,false);
                }
            },
            sureAjax(){
                let _this=this;
                _this.$axios.deletes('/api/services/app/SpecManagement/Delete',{Id:_this.$route.params.id}).then(function(res){
                    _this.dialogUserConfirm=false;
                    _this.bottonbox.botton[0].update=false;
                    _this.open('删除成功','el-icon-circle-check','successERP'); 
                    _this.$store.state.url='/commercial/commercialSpecificationDetails/default'
                    _this.$router.push({path:_this.$store.state.url})             
                },function(res){
                    _this.errorMessage=true;
                    _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors);
                    _this.open('删除失败','el-icon-error','faildERP');
                })
            },
            open(tittle,iconClass,className) {//提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
            statusBotton(a,b,c,d,e){//改变按钮状态
                this.bottonbox.botton[1].increased = a;
                this.bottonbox.botton[2].increased = b;
                this.bottonbox.botton[3].increased = c;
                this.bottonbox.botton[4].increased = d;
                this.bottonbox.botton[5].increased = e;
            },
            statusBottontwo(a,b,c,d,f,g){
                this.preserve = a,//保存状态控制
                this.preserve1 = b,//修改保存状态控制
                this.preserveAdd = c,//保存新增状态控制
                this.abolish = d,//取消状态控制
                this.Add = f,//新增状态控制
                this.del = g//删除状态控制
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
        },
        components:{
            Textbox
        }
        
 }   
</script>

<style scoped>
.commodity{
    font-size: 12px;
}
h4{
    font-size: 18px;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.pl10{
    padding-left: 10px;
}
.pt10{
    padding-top: 10px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;
}
.bgcolor label{
    width: 100% !important ;
    margin-right: 0; 
}
.smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.smallBgcolor .el-input{
    width: 100% !important ;
    margin-left: 10px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
}
.bgcolor{
    overflow:  visible; 
}
.error_tips_info{
    margin-left: 17px;
}
</style>

<style>
.commercialSpecificationDetails .smallBgcolor .el-input input{
    height: 33px!important;
}
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    background: #f4f4f5;
}
.el-checkbox__inner::after{
    left: 4px;
    top: -2px;
}
.commodity .bgcolor{
    width: 100%; 
}
</style>