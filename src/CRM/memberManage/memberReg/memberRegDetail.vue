<template>
    <div class="member-reg-detail">
        <el-row>
            <el-col :span="24" class="fixed bg-white bb1 pb5">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                <div class="inline-block-need mt5 bl1 pl10 ml10">
                    <div class="inline-block-need b1 member-pay-btn">
                        <img class="member-img" src="../../../../static/image/common/img_money.png"/>
                        <span class="fs12 inline-block-need ml5 mt5">会员充值</span>
                    </div>
                    <div class="inline-block-need b1 member-pay-btn ml5">
                        <img class="member-img" src="../../../../static/image/common/img_coin.png"/>
                        <span class="fs12 inline-block-need ml5 mt5">会员充次</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row class="bg-white pt10">
            <el-col :span="20">
                <div class="tipsWrapper mb10">
                    <div class="errorTips">
                        <p class="msgDetail">错误提示：
                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.cardCode')}">
                                会员卡号{{ validation.firstError('createParams.crmMember_MainTable.cardCode') }},
                            </span>

                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.memberName')}">
                                会员姓名{{ validation.firstError('createParams.crmMember_MainTable.memberName') }},
                            </span>

                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.gradeId')}">
                                会员等级{{ validation.firstError('createParams.crmMember_MainTable.gradeId') }},
                            </span>

                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.moblie')}">
                                手机号码{{ validation.firstError('createParams.crmMember_MainTable.moblie') }},
                            </span>

                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.channelTypeid')}">
                                渠道类型{{ validation.firstError('createParams.crmMember_MainTable.channelTypeid') }},
                            </span>

                            <span :class="{block : !validation.hasError('createParams.crmMember_MainTable.channelId')}">
                                注册渠道{{ validation.firstError('createParams.crmMember_MainTable.channelId') }},
                            </span>

                            <span :class="{block : !validation.hasError('pwd1')}">
                                密码{{ validation.firstError('pwd1') }},
                            </span>
                        </p>
                    </div>
                </div>

                <div class="bgcolor">
                    <label><small>*</small>会员卡号</label>
                    <el-input v-model="createParams.crmMember_MainTable.cardCode"
                              placeholder=""
                              :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.cardCode')}"></el-input>
                </div>

                <div class="bgcolor">
                    <label><small>*</small>会员姓名</label>
                    <el-input v-model="createParams.crmMember_MainTable.memberName"
                              placeholder=""
                              :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.memberName')}"></el-input>
                </div>

                <div class="bgcolor">
                    <label><small>*</small>会员等级</label>
                    <el-select v-model="createParams.crmMember_MainTable.gradeId"
                               placeholder=""
                               clearable
                               filterable
                               @change="changeLevel(createParams.crmMember_MainTable.gradeId)"
                               :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.gradeId')}">
                        <el-option v-for="item in levelAr"
                                   :key="item.id"
                                   :label="item.gradeName"
                                   :value="item.id"></el-option>
                    </el-select>
                </div>

                <div class="bgcolor">
                    <label><small>*</small>手机号码</label>
                    <el-input v-model="createParams.crmMember_MainTable.moblie"
                              placeholder=""
                              :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.moblie')}"></el-input>
                </div>

                <div class="bgcolor withbtn">
                    <label>手机验证码</label>
                    <el-input v-model="test1"
                              placeholder="10分钟内有效"></el-input>
                    <span class="send-code">发验证码</span>
                </div>

                <div class="bgcolor">
                    <label>有效日期</label>
                    <el-input v-model="memberGradeValid"
                              disabled
                              placeholder=""></el-input>
                </div>

                <div class="bgcolor">
                    <label>会员密码</label>
                    <el-input v-model="pwd"
                            placeholder=""
                            type="password"
                            :class="{redBorder : validation.hasError('pwd')}"></el-input>
                </div>

                <div class="bgcolor">
                    <label>确认密码</label>
                    <el-input v-model="pwd1"
                            placeholder=""
                            type="password"
                            :class="{redBorder : validation.hasError('pwd1')}"></el-input>
                </div>

                <div class="bgcolor withbtn with-test">
                    <label>推荐人</label>
                    <el-input v-model="createParams.crmMember_MainTable.introducer"
                              placeholder=""></el-input>
                    <span @click="getRefMes" :class="{'nike':ifStyle,'tebu':!ifStyle}">{{testText}}</span>
                
                    <span class="recommend-text">{{refBackMes}}</span>
                </div>

                <div class="bgcolor-select">
                    <label><small>*</small>注册渠道</label>

                    <el-select v-model="createParams.crmMember_MainTable.channelTypeid"
                                class="inline-block-need road"
                                clearable
                                filterable
                                :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.channelTypeid')}"
                                @change='getChannelByType(createParams.crmMember_MainTable.channelTypeid)'
                                placeholder="">
                        <el-option v-for="item in channelAr"
                                :key="item.itemValue"
                                :label="item.itemName"
                                :value="item.itemValue"></el-option>
                    </el-select>

                    <el-select v-model="createParams.crmMember_MainTable.channelId"
                               :class="{redBorder : validation.hasError('createParams.crmMember_MainTable.channelId')}"
                               class="inline-block-need road"
                               clearable
                               filterable
                               :filter-method='filterMethod'
                               @change="getChannelId"
                               placeholder="">
                        <el-option v-for="item in shopArByType"
                                :key="item.id"
                                :label="item.channelName"
                                :value="item.id">
                                <span>{{ item.channelName }}</span>
                                <span>{{ item.channelCode }}</span>
                                </el-option>
                    </el-select>
                </div>

                <div class="bgcolor">
                    <label>服务店铺</label>
                    <el-select v-model="svrShopId"
                               clearable
                               filterable
                               :filter-method='filterMethod'
                               placeholder="">
                        <el-option v-for="item in shopArByType1"
                                :key="item.id"
                                :label="item.channelName"
                                :value="item.id">
                                <span>{{ item.channelName }}</span>
                                <span>{{ item.channelCode }}</span></el-option>
                    </el-select>
                </div>

                <div class="bgcolor">
                    <label>服务人员</label>
                    <el-select v-model="svrEmployeeId"
                               clearable
                               filterable
                               :filter-method='filterMethod'
                               placeholder="">
                        <el-option v-for="item in personAr"
                                :key="item.id"
                                :label="item.employeeName"
                                :value="item.id">
                                <span>{{ item.employeeName }}</span>
                                <span>{{ item.employeeCode }}</span>
                                </el-option>
                    </el-select>
                </div>

                <div class="bgcolor-mes">
                    <label>注册赠送</label>
                    <span>{{promMes}}</span>
                </div>
            </el-col>

            <el-col :span="3" class="pl10">
                <!-- <div class="head-img">
                    <img src="../../../../static/image/common/add_avatar.png"/>
                </div> -->
                <div class="upload_img">
                    <!-- 删除图片 -->
                    <!-- <div class="upload_delImg_wrapper" v-if="data.chooseImg" @click="fileDel($event)">
                        <img  class="upload_delImg" src="../../../../static/image/goodsFiles/del.png">
                    </div> -->

                    <div class="upload_body">
                    <!-- 上传区域 -->
                        <div class="upload_body_center">
                            <!-- <div class="upload_addZoo"  @click="fileClick">+</div>../../../../static/image/common/ -->
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

        <el-row class="bg-white mt20">
            <div class="tabZoo inline-block-need">
                <el-col :span="24">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="其他信息" name="otherMes" class="getPadding bg-white" style="z-index:-10"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>

            <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
        </el-row>

        <el-row class="bg-white">
            <el-collapse-transition>
                <div v-show="ifShow">
                    <div class="bgcolor pr-wrapper">
                        <label>会员生日</label>
                        <el-date-picker type="date" v-model="dateMes" value-format="yyyy-MM-dd"></el-date-picker>
                        <input v-model="birthYear" placeholder="" class="date-input"/>
                        <input v-model="birthMonth" placeholder="" class="date-input1"/>
                        <input v-model="birthDay" placeholder="" class="date-input2"/>
                    </div>

                    <div class="bgcolor">
                        <label>年龄</label>
                        <el-input v-model="age"
                                placeholder=""></el-input>
                    </div>

                    <div class="bgcolor">
                        <span class="member-sex">会员性别</span>
                        <el-checkbox v-model="isMan">男</el-checkbox>
                        <el-checkbox v-model="isWoman">女</el-checkbox>
                    </div>

                    <div class="bgcolor-select">
                        <label>证件号码</label>
                        <el-select v-model="idcardTypeid"
                                    clearable
                                    class="inline-block-need card-id"
                                    placeholder="">
                            <el-option v-for="item in idAr"
                                    :key="item.itemValue"
                                    :label="item.itemName"
                                    :value="item.itemValue"></el-option>
                        </el-select>
                        <el-input v-model="createParams.crmMember_MainTable.idcardNo"
                                  placeholder=""
                                  class="card-input"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>QQ</label>
                        <el-input v-model="createParams.crmMember_MainTable.qq"
                                  placeholder=""></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>电话</label>
                        <el-input v-model="createParams.crmMember_MainTable.phone"
                                  placeholder=""></el-input>
                    </div>

                    <div class="bgcolor-select">
                        <label>地址</label>
                        <el-select v-model="createParams.crmMember_MainTable.adAreaLevel1"
                                    class="inline-block-need member-add"
                                    clearable
                                    filterable
                                    @change="changePro(createParams.crmMember_MainTable.adAreaLevel1)"
                                    placeholder="">
                            <el-option v-for="item in proAr"
                                      :key="item.id"
                                      :label="item.areaName"
                                      :value="item.id">
                                      <span>{{ item.areaName }}</span>
                                      <span>{{ item.areaCode }}</span></el-option>
                        </el-select>

                        <el-select v-model="createParams.crmMember_MainTable.adAreaLevel2"
                                    class="inline-block-need member-add"
                                    clearable
                                    filterable
                                    @change="changeCity(createParams.crmMember_MainTable.adAreaLevel2)"
                                    placeholder="">
                            <el-option v-for="item in cityAr"
                                    :key="item.id"
                                    :label="item.areaName"
                                    :value="item.id">
                                    <span>{{ item.areaName }}</span>
                                    <span>{{ item.areaCode }}</span></el-option>
                        </el-select>

                        <el-select v-model="createParams.crmMember_MainTable.adAreaLevel3"
                                    class="inline-block-need member-add"
                                    clearable
                                    filterable
                                    placeholder="">
                            <el-option v-for="item in areaAr"
                                    :key="item.id"
                                    :label="item.areaName"
                                    :value="item.id">
                                    <span>{{ item.areaName }}</span>
                                    <span>{{ item.areaCode }}</span></el-option>
                        </el-select>

                        <el-input v-model="createParams.crmMember_MainTable.address"
                                placeholder=""
                                class="add-input"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>邮箱</label>
                        <el-input v-model="createParams.crmMember_MainTable.email"
                                placeholder=""></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>备注</label>
                        <el-input v-model="createParams.crmMember_MainTable.remark"
                                placeholder=""
                                ></el-input>
                    </div>
                </div>
            </el-collapse-transition>
        </el-row>

        <el-row class="bg-white mt20">
            <div class="tabZoo inline-block-need">
                <el-col :span="24">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="自定义信息" name="selfMes" class="getPadding bg-white" style="z-index:-10"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>

            <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
        </el-row>

        <el-row class="bg-white">
            <el-collapse-transition>
                <div v-show="ifShow">
                    <div class="bgcolor" v-for="item in sonTableModel" :key="item.defValueCode">
                        <label> {{item.name}}</label>
                        <el-select v-model="item.defValueCode"
                                    class="inline-block-need member-add"
                                    v-if='item.control == 1'
                                    @change="fuck"
                                    placeholder="">
                            <el-option v-for="items in item.children"
                                    :key="items.id"
                                    :label="items.defValueName"
                                    :value="items.id"></el-option>
                        </el-select>

                        <el-date-picker v-model="item.defValueCode"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        v-if="item.control == 2"></el-date-picker>

                        <el-input v-model="item.defValueCode"
                                    placeholder=""
                                    v-if="item.control == 3"></el-input>
                    </div>
                </div>
            </el-collapse-transition>
        </el-row>


        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    </div>
</template>

<script>
import Vue from 'vue'
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../../common/common.js'
export default{
    name:'memberRegDetail',
    components:{
        buttonGroup,
        dialogBox
    },
    created:function(){
        let self = this; 
        self.getGroupId();
        self.getOuId();
        self.getMes();
        
        console.log(self.defaultGroupId)
        setTimeout(function(){
            $('.pr-wrapper .el-input__prefix').click(function(e){
                $(this).prev('input').focus()
            });

            $('.nike').hover(function(){
                self.testText = '验证'
            },function(){
                if(self.ifNull){
                    self.testText = '×'
                }else{
                    self.testText = '✓'
                }
            });
            self.getSonTable();
        },100);

    },
    computed:{
        shopArByType: function () {//下拉数据自定义搜索过滤
            return FILTER_MOTHED(this.filterKey,this.shopArByTypeEx)
        },
        shopArByType1: function () {//下拉数据自定义搜索过滤
            return FILTER_MOTHED(this.filterKey,this.shopArByTypeEx1)
        },
        personAr: function () {//下拉数据自定义搜索过滤
            return FILTER_MOTHED(this.filterKey,this.personArEx)
        },
    },
    validators:{
        'createParams.crmMember_MainTable.cardCode': function (value) {//会员卡号
            return this.Validator.value(value).required();
        },
        'createParams.crmMember_MainTable.memberName': function (value) {//会员名称
            return this.Validator.value(value).required();
        },
        'createParams.crmMember_MainTable.gradeId': function (value) {//会员等级
            return this.Validator.value(value).required();
        },
        'createParams.crmMember_MainTable.moblie': function (value) {//手机号码
            return this.Validator.value(value).required().maxLength(20);
        },
        'createParams.crmMember_MainTable.channelTypeid': function (value) {//渠道類型
            return this.Validator.value(value).required();
        },
        'createParams.crmMember_MainTable.channelId': function (value) {//渠道
            return this.Validator.value(value).required();
        },
        'pwd1,pwd': function (pwd1,pwd) {//密码
            if(this.validation.isTouched('pwd1')){
                return this.Validator.value(pwd1).match(pwd);
            }
            
        },
    },
    watch:{
        defaultOuId:{
            handler:function(){
                let self = this;
                if(self.defaultOuId!=''){
                        if(self.shopArByTypeEx.length<=0){
                            self.getDefaultChannelByType();
                        };
                        if(self.shopArByTypeEx1.length<=0){
                            self.getDefaultChannelByType();
                        }
                }
            },
            deep:true,
        },
        isMan:{
            handler:function(){
                let self = this;
                if(self.isMan == false){
                    self.isWoman = true;
                }else{
                    self.isWoman = false;
                }
            },
            deep:true,
        },
        isWoman:{
            handler:function(){
                let self = this;
                if(self.isWoman == false){
                    self.isMan = true;
                }else{
                    self.isMan = false;
                }
            },
            deep:true,
        },
        dateMes:{
            handler:function(){
                let self = this;
                self.dateMes.split('-')
                let newAr = [];
                newAr = self.dateMes.split('-')
                console.log(newAr)
                self.birthYear = newAr[0];
                self.birthMonth = newAr[1];
                self.birthDay = newAr[2];
            },
            deep:true,
        },
        birthYear:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.birthYear =self.birthYear;
                self.birthYearAr = self.birthYear.split('');
                let now = new Date();
                let nowYear = now.getFullYear();
                console.log(parseInt(self.birthYear)>parseInt(nowYear))
                if(parseInt(self.birthYear)>parseInt(nowYear)){
                    self.birthYear = '';
                }else{
                    if(self.birthYearAr.length == 4){
                        $('.date-input1').focus();
                    };
                }
                

            },
            deep:true,
        },
        birthMonth:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.birthMonth = self.birthMonth;
                self.birthMonthAr = self.birthMonth.split('');
                if(parseInt(self.birthMonth)>12){
                    self.birthMonth = '';
                }
                if(self.birthMonthAr.length == 2){
                    $('.date-input2').focus();
                }
            },
            deep:true,
        },
        birthDay:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.birthDay = self.birthDay;
                self.birthDayAr = self.birthDay.split('');
                if(parseInt(self.birthMonth) == 2){
                    if(parseInt(self.birthDay)>28){
                        self.birthDay = '';
                    }
                }else{
                    if(parseInt(self.birthDay)>31){
                        self.birthDay = '';
                    }
                }
            },
            deep:true,
        },
        birthYearAr:{
            handler:function(){
                let self = this;
                if(self.birthYearAr.length>0 && self.birthMonth.length>0 && self.birthDay.length>0){
                    let x= '';
                    if(self.birthYearAr.length == 2){
                        x = self.birthYearAr[0]+self.birthYearAr[1];
                        let now = '';
                        let nowYear= '';
                        now = new Date();
                        nowYear = now.getFullYear();
                        console.log(parseInt(nowYear)+'-'+parseInt(x))
                        self.age = parseInt(nowYear) - 2000 + 100 - parseInt(x);
                    }
                    if(self.birthYearAr.length == 4){
                        x= self.birthYearAr[0]+self.birthYearAr[1]+self.birthYearAr[2]+self.birthYearAr[3];
                        let now = new Date();
                        let nowYear = now.getFullYear();
                        self.age = parseInt(nowYear) - parseInt(x);
                    }
                }
            },
            deep:true,
        },
        birthMonthAr:{
            handler:function(){
                let self = this;
                if(self.birthYearAr.length>0 && self.birthMonth.length>0 && self.birthDay.length>0){
                    let x= '';
                    if(self.birthYearAr.length == 2){
                        x = self.birthYearAr[0]+self.birthYearAr[1];
                        let now = '';
                        let nowYear= '';
                        now = new Date();
                        nowYear = now.getFullYear();
                        console.log(parseInt(nowYear)+'-'+parseInt(x))
                        self.age = parseInt(nowYear) - 2000 + 100 - parseInt(x);
                    }
                    if(self.birthYearAr.length == 4){
                        x= self.birthYearAr[0]+self.birthYearAr[1]+self.birthYearAr[2]+self.birthYearAr[3];
                        let now = new Date();
                        let nowYear = now.getFullYear();
                        self.age = parseInt(nowYear) - parseInt(x);
                    }
                }
            },
            deep:true,
        },
        birthDayAr:{
            handler:function(){
                let self = this;
                if(self.birthYearAr.length>0 && self.birthMonth.length>0 && self.birthDay.length>0){
                    let x= '';
                    if(self.birthYearAr.length == 2){
                        x = self.birthYearAr[0]+self.birthYearAr[1];
                        let now = '';
                        let nowYear= '';
                        now = new Date();
                        nowYear = now.getFullYear();
                        console.log(parseInt(nowYear)+'-'+parseInt(x))
                        self.age = parseInt(nowYear) - 2000 + 100 - parseInt(x);
                    }
                    if(self.birthYearAr.length == 4){
                        x= self.birthYearAr[0]+self.birthYearAr[1]+self.birthYearAr[2]+self.birthYearAr[3];
                        let now = new Date();
                        let nowYear = now.getFullYear();
                        console.log(nowYear+'-'+'x')
                        self.age = parseInt(nowYear) - parseInt(x);
                    }
                }
            },
            deep:true,
        },
        age:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.birthDay = self.age;
                self.createParams.crmMember_MainTable.age = self.age;
            },
            deep:true,
        },
        pwd:{
            handler:function(){
                let self = this;
                if(self.pwd == self.pwd1){
                    self.createParams.crmMember_MainTable.pwd = self.pwd;
                    self.pwdTest = '1';
                }else{
                    self.createParams.crmMember_MainTable.pwd = '';
                    self.pwdTest = '';
                }
                // if(self.pwd!=''&&self.pwd1!=''){
                //     if
                // }
            },
            deep:true,
        },
        pwd1:{
            handler:function(){
                let self = this;
                if(self.pwd == self.pwd1){
                    self.createParams.crmMember_MainTable.pwd = self.pwd;
                    self.pwdTest = '1';
                }else{
                    self.createParams.crmMember_MainTable.pwd = '';
                    self.pwdTest = '';
                }
            },
            deep:true,
        },
        svrShopId:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.svrShopId = self.svrShopId;
            },
            deep:true,
        },
        svrEmployeeId:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.svrEmployeeId = self.svrEmployeeId;
            },
            deep:true,
        },
        idcardTypeid:{
            handler:function(){
                let self = this;
                self.createParams.crmMember_MainTable.idcardTypeid = self.idcardTypeid;
            },
            deep:true,
        },
        memberGradeValid:{
            handler:function(){
                let self = this;
                if(self.memberGradeValid == '永久有效'){
                    self.createParams.crmMember_MainTable.memberGradeValid = 0;
                    self.createParams.crmMember_MainTable.effectiveEnd = '9999-12-31';
                    console.log(self.createParams.crmMember_MainTable.memberGradeValid)
                }else{
                    self.createParams.crmMember_MainTable.memberGradeValid = 1;
                    console.log(self.createParams.crmMember_MainTable.memberGradeValid)
                    self.createParams.crmMember_MainTable.effectiveEnd = self.memberGradeValid;
                }
            },
            deep:true,
        },
    },
    data(){
        return {
            test:'test',
            test1:'',
            test2:[{
                key:1
            },{
                key:2
            }],
            //---按钮------------
            buttonGroup:[{
                text:'新增',
                class:'bt_add',
                icon:'icon-xinzeng',
                disabled:true,
            },{
                text:'保存',
                class:'bt_saveAdd',
                icon:'icon-baocun',
                disabled:false,
            },{
                text:'保存并新增',
                class:'bt_save',
                icon:'icon-baocun',
                disabled:false,
            },{
                text:'取消',
                class:'bt_cancel',
                icon:'icon-quxiao',
                disabled:false,
            }],
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
            //-------------------
            activeName:'otherMes',
            ifShow:true,
            //---下拉数据--------
            levelAr:[],//会员等级
            channelAr:[],//注册渠道
            shopArByTypeEx:[],//根据渠道类型获得的渠道
            shopArByTypeEx1:[],//根据渠道类型获得的渠道
            shopAr:[],//服务店铺
            personArEx:[],//备用服务职员数组
            idAr:[],//证件类型
            proAr:[],//省下拉框
            cityAr:[],//市下拉框
            areaAr:[],//区下拉框
            //---创建参数--------
            createParams:{
                "crmMember_MainTable": {
                    "id": 0,
                    "groupId": '',
                    "memberName": "",
                    "cardCode": "",
                    "moblie": "",
                    "birthTypeid": 1,
                    "birthYear": '',
                    "birthMonth": '',
                    "birthDay": '',
                    "age": '',
                    "gradeId": '',
                    "pwd": "",
                    "memberGradeValid": 0,
                    "effectiveStart": "",
                    "effectiveEnd": "",
                    "channelTypeid": 1,
                    "channelId": '',
                    "ouId": '',
                    "svrShopId": '',
                    "svrEmployeeId": '',
                    "sex": '',
                    "idcardTypeid": '',
                    "idcardNo": "",
                    "phone": "",
                    "qq": "",
                    "email": "",
                    "adAreaLevel1": "",
                    "adAreaLevel2": "",
                    "adAreaLevel3": "",
                    "address": "",
                    "introducer": "",
                    "regSourceid": 1,
                    "portraitUrl": "",
                    "remark": "",
                    "status": 1
                },
                "crmMemberDef_ChildTable": [
                    // {
                    // "id": 0,
                    // "groupId": 0,
                    // "memberId": 0,
                    // "defId": 0,
                    // "defValueCode": "string",
                    // "defValueName": "string"
                    // }
                ]
            },
            //-------------------
            // calendarL:false,//农历
            // calendarG:true,//公历
            isMan:true,
            isWoman:false,
            ifStyle:true,//判断验证按钮颜色
            ifNull:false,//判断返回的验证数据是否为空
            dateMes:'',//初始选择的日期
            proId:'',
            cityId:'',
            areaId:'',
            refBackMes:'',//推荐人返回信息
            url:'',
            testText:'✓',
            sonTable:[],
            sonTableModel:[],
            defaultGroupId:'',//默认groupId
            defaultOuId:'',//默认ouid
            defaultMemberLevelId:'',//默认会员id
            promMes:'',
            birthYear:'',
            birthMonth:'',
            birthDay:'',
            age:'',
            svrShopId:'',
            svrEmployeeId:'',
            idcardTypeid:'',
            memberGradeValid:'',//有效期
            someTime:'',
            birthYearAr:[],//年分割后的数组
            birthMonthAr:[],//月分割后的数组
            birthDayAr:[],//日分割后的数组
            pwd:'',//会员密码
            pwd1:'',//确认密码
            pwdTest:'',//密码相同验证
            filterKey:'',
        }
    },


    methods:{
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){//
                // self.isBack();
            }else if(btn=="新增"){//

            }else if(btn=="删除"){//

            }else if(btn=="保存"){//
                self.save();
            }else if(btn=="保存并新增"){//
                self.saveAdd();
            }else if(btn=="取消"){
                self.cancel();
            }
        },
        //---下拉数据--------------------------
        getMes:function(){//获取下拉数据
            let self = this;
            self.getMemberLevel();
            self.getDefaultMemberLevel();
            self.getChannel();
            self.getShop();
            self.getPerson();
            self.getIdType();
            self.getPro();
            
        },
        getMemberLevel:function(){//会员等级
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetMemberGradeList').then(function(res){
                console.log(res)
                self.levelAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        getDefaultMemberLevel:function(){//获取默认会员等级
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetDefaultMemberGrade').then(function(res){
                console.log(res)
                self.changeLevel(res.result.id);
                self.defaultMemberLevelId = res.result.id;
                self.createParams.crmMember_MainTable.gradeId = self.defaultMemberLevelId;
            },function(res){
                console.log('err'+res)
            });
        },
        getChannel:function(){//注册渠道
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ChannelType'}).then(function(res){
                // console.log(res);
                self.channelAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        getShop:function(){//获取店铺
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                // console.log(res);
                self.shopAr = res.result.items;
            },function(res){
                console.log('err'+res)
            })
        },
        getPerson:function(){//获取职员
            let self = this;
            self.$axios.gets('/api/services/app/EmployeeManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                console.log(res);
                self.personArEx = res.result.items;
            },function(res){
                console.log('err'+res)
            })
        },
        getIdType:function(){//证件类型
            let self = this;
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'IDType'}).then(function(res){
                // console.log(res);
                self.idAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        getPro:function(){//获取省
            let self = this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                console.log(res)
                self.proAr = res.result;

            },function(res){
                console.log('err'+res)
            });
        },
        getSonTable:function(){
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/DefManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                console.log(res)
                self.sonTable = res.result.items;
                // console.log(self.sonTable)
                for(let i in self.sonTable){
                    // self.sonTableModel[i] = {
                    //     'id':0,
                    //     'groupId':self.sonTable[i].groupId,
                    //     'memberId':0,
                    //     'defId':self.sonTable[i].id,
                    //     'defValueCode':'',
                    //     'defValueName':self.sonTable[i].defName,
                    //     'name':self.sonTable[i].defName,
                    //     'control':self.sonTable[i].controlType,
                    //     'children':self.sonTable[i].defValue_ChildTable,
                    // }
                    let item= {
                        'id':0,
                        'groupId':self.sonTable[i].groupId,
                        'memberId':0,
                        'defId':self.sonTable[i].id,
                        'defValueCode':'',
                        'defValueName':self.sonTable[i].defName,
                        'name':self.sonTable[i].defName,
                        'control':self.sonTable[i].controlType,
                        'children':self.sonTable[i].defValue_ChildTable,
                    }
                    self.sonTableModel.push(item);

                }
                console.log(self.sonTableModel)


            },function(res){
                console.log('err'+res)
            });
        },
        getGroupId:function(){
            let self = this;
            self.$axios.gets('/api/services/app/GroupManagement/Get').then(function(res){
                // console.log(res)
                self.defaultGroupId = res.result.id;
            },function(res){
                console.log('err'+res)
            });
        },
        getOuId:function(){
            let self = this;
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(res)
                self.defaultOuId = res.result.id;
            },function(res){
                console.log('err'+res)
            });
        },
        getChannelId:function(){
            let self = this;
           console.log(self.createParams.crmMember_MainTable.channelTypeid)
           if(self.createParams.crmMember_MainTable.channelTypeid!=''){
               self.getPromMes(self.createParams.crmMember_MainTable.channelTypeid);
           }
        }, 
        getDefaultChannelByType:function(){
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{OuID:self.defaultOuId,ChannelType:'1'}).then(function(res){
                console.log(res)
                self.shopArByTypeEx = res.result;
                self.shopArByTypeEx1 = res.result;
                
            },function(res){
                console.log('err'+res)
            });
        },
        getPromMes:function(id){
            let self = this;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/ActivityManagement/GetMemberRegistProm',{GroupID:self.defaultGroupId,ChannelID:id}).then(function(res){
                    console.log(res)

                },function(res){
                    console.log(res)
                    self.promMes = res.error.message;
                });
        },
        //---表单验证-------------------
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
        },
        showErrprTipsSelect(e){
            $('.tipsWrapper').css({display:'none'})
        },
        showErrprTipsRangedate(e){
            $('.tipsWrapper').css({display:'none'})
        },
        showErrprTipsTextArea(e){
            $('.tipsWrapper').css({display:'none'})
        },
        //---保存-----------------------
        save:function(){
            let self = this;
            $('.tipsWrapper').css({display:'block'})
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    self.createParams.crmMember_MainTable.groupId = self.defaultGroupId;
                    self.createParams.crmMember_MainTable.ouId = self.defaultOuId;
                    if(self.isWoman == true){
                        self.createParams.crmMember_MainTable.sex = 2;
                    }else if(self.isMan == true){
                        self.createParams.crmMember_MainTable.sex = 1;
                    }
                    // if(self.calendarL)
                    self.createParams.crmMember_MainTable.portraitUrl = self.url;
                    if(self.birthDay == ''){
                        self.createParams.crmMember_MainTable.birthDay = 0;
                    }
                    if(self.birthMonth == ''){
                        self.createParams.crmMember_MainTable.birthMonth = 0;
                    }
                    if(self.birthYear == ''){
                        self.createParams.crmMember_MainTable.birthYear = 0;
                    }
                    if(self.age == ''){
                        self.createParams.crmMember_MainTable.age = 0;
                    }
                    if(self.svrShopId == ''){
                        self.createParams.crmMember_MainTable.svrShopId = 0;
                    }
                    if(self.svrEmployeeId == ''){
                        self.createParams.crmMember_MainTable.svrEmployeeId = 0;
                    }
                    if(self.idcardTypeid == ''){
                        self.createParams.crmMember_MainTable.idcardTypeid = 0;
                    }

                    self.createParams.crmMemberDef_ChildTable = self.sonTableModel;
                    self.$axios.posts('http://192.168.100.107:8092/api/services/app/MemberManagement/AggregateCreateOrUpdate',self.createParams).then(function(res){
                        console.log(res)
                        self.open('保存会员成功','el-icon-circle-check','successERP');
                        self.initData();
                    },function(res){
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message=res.error.message;
                        self.errorTips.message=res.error.details;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    });

                }
            })
        },
        saveAdd:function(){
            let self = this;
            self.save();
            self.initData();
        },
        //---选择地址-------------------
        changePro:function(id){//省
            let self = this;
            console.log(id)
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:id}).then(function(res){
                self.cityAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        changeCity:function(id){//市
            let self = this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:id}).then(function(res){
                self.areaAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        changeArea:function(){//区

        },
        //---推荐人信息----------------
        getRefMes:function(){
            let self = this;
            self.ifTest1 = false;
            self.ifTest = false;
            self.ifTest2 = false;
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberManagement/GetIntroducer',{info:self.createParams.crmMember_MainTable.introducer}).then(function(res){
                console.log(res)
                self.refBackMes = res.result;
                if(self.refBackMes == ''){
                    self.ifNull = true;
                    self.ifStyle = false;
                }else{
                    self.ifNull = false;
                    self.ifStyle = true;
                }
            },function(res){

            });
        },
        //---根据type获取渠道----------
        getChannelByType:function(id){
            let self = this;
            self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{OuID:self.defaultOuId,ChannelType:id}).then(function(res){
                console.log(res)
                self.shopArByTypeEx = res.result;
                self.shopArByTypeEx1 = res.result;
                // self.shopArByTypeEx= res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        //---切换会员等级--------------
        changeLevel:function(id){
            let self = this;
            console.log(id)
            self.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/Get',{Id:id}).then(function(res){
                console.log(res)
                // self.createParams.crmMember_MainTable.effectiveEnd = res.result.effectiveEnd;
                self.createParams.crmMember_MainTable.effectiveStart = res.result.effectiveStart;
                self.memberGradeValid = res.result.effectiveEnd;
                

            },function(res){

            });
        },
        getEndDate:function(){
            let self = this;
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
        
        //---下拉筛选------------------
            filterMethod(query){
                this.filterKey=query; 
            },
        //------------------------------
        //---open------------------------------------
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
        //---取消--------------------------------------
        cancel:function(){
            let self = this;
            self.initData();
            $('.tipsWrapper').css({display:'none'});

        },
        fuck:function(){
            let self = this;
            console.log('123')
            console.log(self.sonTableModel)
            // self.someTime = self.sonTableModel
        },
        //---init--------------------------------------
        initData:function(){
            let self = this;
            self.createParams = {
                "crmMember_MainTable": {
                    "id": 0,
                    "groupId": '',
                    "memberName": "",
                    "cardCode": "",
                    "moblie": "",
                    "birthTypeid": 1,
                    "birthYear": '',
                    "birthMonth": '',
                    "birthDay": '',
                    "age": '',
                    "gradeId": self.defaultMemberLevelId,
                    "pwd": "",
                    "memberGradeValid": '',
                    "effectiveStart": "",
                    "effectiveEnd": "",
                    "channelTypeid": '',
                    "channelId": '',
                    "ouId": '',
                    "svrShopId": '',
                    "svrEmployeeId": '',
                    "sex": '',
                    "idcardTypeid": '',
                    "idcardNo": "",
                    "phone": "",
                    "qq": "",
                    "email": "",
                    "adAreaLevel1": "",
                    "adAreaLevel2": "",
                    "adAreaLevel3": "",
                    "address": "",
                    "introducer": "",
                    "regSourceid": 1,
                    "portraitUrl": "",
                    "remark": "",
                    "status": '1'
                },
                "crmMemberDef_ChildTable": [
                    // {
                    // "id": 0,
                    // "groupId": 0,
                    // "memberId": 0,
                    // "defId": 0,
                    // "defValueCode": "string",
                    // "defValueName": "string"
                    // }
                ]
            };
            self.isMan = true;
            self.isWoman = false;
            self.ifStyle = true;//判断验证按钮颜色
            self.ifNull = false;//判断返回的验证数据是否为空
            self.dateMes = '';//初始选择的日期
            self.proId = '';
            self.cityId = '';
            self.areaId = '';
            self.refBackMes = '';//推荐人返回信息
            self.url = '';
            self.testText = '✓';
            self.sonTable = [];
            self.sonTableModel = [];
            self.defaultGroupId = '';//默认groupId
            self.defaultOuId = '';//默认ouid
            self.promMes = '';
            self.birthYear = '';
            self.birthMonth = '';
            self.birthDay = '';
            self.age = '';
            self.svrShopId = '';
            self.svrEmployeeId = '';
            self.idcardTypeid = '';
            self.memberGradeValid = '';//有效期
        },

    }
}
</script>

<style>
.bg-white{
    background: white;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.bl1{
    border-left: 1px solid #cccccc;
}
.member-reg-detail .inline-block-need{
    display: inline-block;
    float: left;
}
.h46{
    height: 46px;
    line-height: 46px;
}
.fs12{
    font-size: 12px;
}
.b1{
    border: 1px solid #cccccc;
    border-radius: 3px;
}
.member-wrapper{
    padding-left: 10px;
    margin-left: 10px;
}
.pl10{
    padding-left: 10px;
}
.ml10{
    margin-left: 10px;
}
.ml5{
    margin-left: 5px;
}
.mt20{
    margin-top: 20px;
}
.ml100{
    margin-left: 100px;
}
.pb5{
    padding-bottom: 5px;
}
.pt10{
    padding-top: 10px;
}
.member-pay-btn{
    padding: 4px 8px;
    cursor: pointer;
}
.with-test{
    width: 504px!important;
}
.withbtn .el-input{
    width: 105px!important;
    float: left;
}
.withbtn input{
    padding: 0 10px;
}
.withbtn .el-input__inner{
    border-radius: 2px!important;
}
.send-code{
    display: inline-block;
    width: 51px;
    background-color: #3cc;
    height: 35px;
    line-height: 35px;
    color: white;
    cursor: pointer;
}
.nike{
    display: inline-block;
    width: 51px;
    float: left;
    background-color: #3cc;
    height: 35px;
    line-height: 35px;
    color: white;
    cursor: pointer;
    text-align: center;
}
.tebu{
    display: inline-block;
    width: 51px;
    float: left;
    background-color: #cccccc;
    height: 35px;
    line-height: 35px;
    color: white;
    cursor: pointer;
    text-align: center;
}
.recommend-text{
    display: inline-block;
    line-height: 33px;
    width: 221px;
    height: 33px;
    padding-left: 15px;
    margin-left: 15px;
    background-color: #FFFBF9;
    border: 1px solid #FEDFE2;
    float: left;
}
.bgcolor-select{
    height: 35px;
    font-size: 12px;
    margin-bottom: 10px;
    /* width: 250px; */
    float: left;
    overflow: hidden;
    margin-right: 5px
}
.bgcolor-select>label{
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
.bgcolor-select>label small{
    color: #FF669B;
    margin-right: 2px;
}
.bgcolor-select .road .el-input{
    width: 205px;
}
.bgcolor-select .road .el-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .card-id{
    width: 75px;
}
.bgcolor-select .card-id .el-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .card-input{
    width:335px;
}
.bgcolor-select .card-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .member-add{
    width: 78px;
}
.bgcolor-select .member-add .el-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .add-input{
    width:176px;
}
.bgcolor-select .add-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-mes{
    height: 35px;
    font-size: 12px;
    margin-bottom: 15px;
    /* width: 250px; */
    float: left;
    overflow: hidden;
    margin-right: 5px

}
.bgcolor-mes>label{
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
.bgcolor-mes span{
    display: inline-block;
    line-height: 33px;
    height: 33px;
    padding-left: 15px;
    background-color: #FFFBF9;
    border: 1px solid #FEDFE2;
    width: 394px;
}
.member-reg-detail .tabZoo{
    overflow: hidden;
    background-color: #fff;
}
.member-reg-detail  .getPadding,.tabZoo .el-tabs__nav-scroll{
    padding: 0 10px;
    background-color: white;
}
.member-reg-detail .tabZoo .auditInformation{
    margin-top: 15px;
}

.member-reg-detail .tabZoo .erp_bt:first-child{
    margin-left: 0;
}
.member-reg-detail .nopadding{
    padding-top: 0;
}
.member-reg-detail .tabZoo .el-tabs__active-bar{
    width: 63px!important;
}
.member-sex{
    display: block;
    float: left;
    height: 35px;
    line-height: 35px;
    margin-right: 10px;
    text-align: right;
    width:84px;
}
.pr-wrapper{
    position: relative;
}
/* .pr-wrapper .date-input input{
    height: 25px!important;
} */
.date-input{
    position: absolute;
    left: 100px;
    z-index: 400 !important;
    width: 35px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 5px;
}
.date-input1{
    position: absolute;
    left: 140px;
    z-index: 400 !important;
    width: 30px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 5px;
    margin-left: 5px;
}
.date-input2{
    position: absolute;
    left: 180px;
    z-index: 400 !important;
    width: 30px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 5px;
    margin-left: 5px;
}
.member-img{
    width: 25px;
    height: 25px;
    display: inline-block;
    float: left;
}
.remark-input{
    width: 500px!important;
}
.pr-wrapper .el-date-editor input{
    padding: 5px 76px;
}
.bgcolor-select .el-input__inner{
    padding: 0 7px!important;
}
.member-reg-detail .upload_showImg{
    width: 126px;
    height: 170px;
    border:1px solid #cccccc;
}
.member-reg-detail .avatar-uploader-icon{
    width: 126px;
    height: 170px;
    border:1px solid #cccccc;
}
.bgcolor-select .redBorder .el-input__inner {
    border-color: #f66;
}
</style>

