<template>
    <div class="member-information">
        <el-row class="row">
            <el-col :span="24">
                <div class="bgcolor">
                    <label class="search-title">选择会员</label>
                    <el-input placeholder="卡号、手机号" v-model="num"></el-input>
                </div>
                <el-button class="sure-btn" @click="sureSearch">确定</el-button>
                <span @click="ifShowOther = !ifShowOther" class="upBt other-btn">其他服务<i class="el-icon-arrow-down"></i></span>
                <ul class="other-content" v-show="ifShowOther">
                    <li>会员充值</li>
                    <li>会员充次</li>
                    <li>等级变更</li>
                    <li>会员延期</li>
                    <li>状态变更</li>
                    <li>修改密码</li>
                    <li>会员换卡</li>
                    <li>发送卡券</li>
                    <li>发送信息</li>
                    <li>积分清零</li>
                </ul>
            </el-col>
            <el-col :span="24">
                <div class="wrongWrapper">
                    <span>卡号不存在 / 手机号不存在 / 格式错误</span>
                </div>
            </el-col>
        </el-row>
        <el-row class="bb1 pb5 bg-white bg-pray" v-show="ifShow">
            <el-col class="left-box">
                <div class="bgcolor">
                    <label class="show-title">会员卡号:</label>
                    <el-input v-model="showParams.cardCode" readonly
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">会员姓名:</label>
                    <el-input v-model="showParams.memberName" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">会员等级:</label>
                    <el-input v-model="showParams.gradeId_GradeName" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">手机号码:</label>
                    <el-input v-model="showParams.moblie" readonly
                            placeholder="--"></el-input>
                </div>


                <div class="bgcolor">
                    <label class="show-title">卡状态:</label>
                    <el-input v-model="showParams.statusTValue" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">有效日期:</label>
                    <el-input v-model="showParams.effectiveTime" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">账户余额:</label>
                    <el-input v-model="showParams.amount" readonly
                            placeholder="--"></el-input>
                </div>

                <div class="bgcolor">
                    <label class="show-title">账户积分:</label>
                    <el-input v-model="showParams.integral" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">推荐人:</label>
                    <el-input v-model="showParams.introducer" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">注册渠道:</label>
                    <el-input v-model="showParams.channelTypeidTValue" readonly
                            placeholder="--"></el-input>
                </div>
                <div class="bgcolor">
                    <label class="show-title">最后消费时间:</label>
                    <el-input v-model="showParams.ExpendLasttime" readonly
                            placeholder="--"></el-input>
                </div>
                <el-col class="left-box">
                    <div class="bgcolor bgcolor-member-label">
                        <label class="show-title">会员标签:</label>
                        <span class="member-label" v-for="tag in memberTags" :key="tag.id">{{tag.tagName}}</span>
                        <span class="member-label member-label-btn" @click="memberLabelDialog=true">+</span>
                    </div>

                </el-col>

                <el-dialog title="请输入需要添加的会员标签" :visible.sync="memberLabelDialog">
                    <el-input></el-input>
                    <div slot="footer" class="dialog-footer" style="text-align:center;margin-bottom:10px;">
                        <el-button @click="memberLabelDialog = false">取 消</el-button>
                        <el-button type="primary" @click="addTag">确 定</el-button>
                    </div>
                </el-dialog>

            </el-col>
            <el-col class="upload-avatar mt10">
                <div class="upload_img">
                    <div class="upload_body">
                        <div class="upload_body_center">
                            <img v-if="createParams.portraitUrl" class="upload_showImg" :src="createParams.portraitUrl" @click="fileClick">
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


        <el-row class="bb1 pb5 bg-white mt10">
            <div class="tabZoo inline-block-need">

            <el-col :span="24">
                <el-tabs v-model="activeName">
                        <el-tab-pane label="基础信息" name="base" class="getPadding" style="z-index:-10">
                            <el-row>
                            <el-col :span="24">
                                <div class="bgcolor">
                                    <label>会员姓名</label>
                                    <el-input v-model="createParams.memberName" placeholder=""></el-input>
                                </div>
                                <div class="bgcolor">
                                    <label>手机</label>
                                    <el-input v-model="createParams.moblie" placeholder=""></el-input>
                                </div>
                                <div class="bgcolor withbtn">
                                    <label>手机验证码</label>
                                    <el-input placeholder="10分钟内有效"></el-input>
                                    <span class="send-code">发验证码</span>
                                </div>
                                <div class="bgcolor pr-wrapper">
                                    <label>会员生日</label> 
                                    <el-date-picker type="date" v-model="dateMes" value-format="yyyy-MM-dd"></el-date-picker>
                                    <input v-model="birthYear"  placeholder="" class="date-input"/>
                                    <input v-model="birthMonth" placeholder="" class="date-input1"/>
                                    <input v-model="birthDay" placeholder="" class="date-input2"/>
                                </div>
                                <div class="bgcolor">
                                    <label>年龄</label>
                                    <el-input v-model="createParams.age" placeholder=""></el-input>
                                </div>


                                <div class="bgcolor">
                                    <label class="member-sex">会员性别</label>
                                    <el-checkbox v-model="isMan">男</el-checkbox>
                                    <el-checkbox v-model="isWoman">女</el-checkbox>
                                </div>
                                <!-- <div class="bgcolor ml84 calendar">
                                    <el-checkbox v-model="solar">公历</el-checkbox>
                                    <el-checkbox v-model="lunar">农历</el-checkbox>
                                </div> -->
                                <div class="bgcolor">
                                    <label>电话</label>
                                    <el-input v-model="createParams.phone" placeholder=""></el-input>
                                </div>
                                <div class="bgcolor-select">
                                    <label>证件号码</label>
                                    <el-select v-model="createParams.idcardTypeid" clearable
                                                class="inline-block-need card-id"
                                                placeholder="">
                                        <el-option v-for="item in idAr"
                                                :key="item.itemValue"
                                                :label="item.itemName"
                                                :value="item.itemValue"></el-option>
                                    </el-select>
                                    <el-input v-model="createParams.idcardNo" placeholder=""
                                            class="card-input"></el-input>
                                </div>
                                    <div class="bgcolor">
                                        <label>邮箱</label>
                                        <el-input v-model="createParams.email" placeholder=""></el-input>
                                    </div>
                                <div class="bgcolor-select">
                                    <label>地址</label>
                                    <el-select v-model="createParams.adAreaLevel1" clearable
                                                class="inline-block-need member-add"
                                                @change="changePro(createParams.adAreaLevel1)"
                                                placeholder="">
                                        <el-option v-for="item in proAr"
                                                :key="item.id"
                                                :label="item.areaName"
                                                :value="item.id"></el-option>
                                    </el-select>

                                    <el-select v-model="createParams.adAreaLevel2" clearable
                                                class="inline-block-need member-add"
                                                @change="changeCity(createParams.adAreaLevel2)"
                                                placeholder="">
                                        <el-option v-for="item in cityAr"
                                                :key="item.id"
                                                :label="item.areaName"
                                                :value="item.id"></el-option>
                                    </el-select>

                                    <el-select v-model="createParams.adAreaLevel3" clearable
                                                class="inline-block-need member-add"
                                                placeholder="">
                                        <el-option v-for="item in areaAr"
                                                :key="item.id"
                                                :label="item.areaName"
                                                :value="item.id"></el-option>
                                    </el-select>

                                    <el-input v-model="createParams.address" placeholder=""
                                            class="add-input"></el-input>
                                </div>
                                <div class="bgcolor">
                                    <label>服务店铺</label>
                                    <el-select  v-model="svrShopId_ShopName" :filter-method="filterShopMethod" clearable filterable>
                                        <el-option
                                        v-for="item in shopFilter"
                                        :key="item.id"
                                        :label="item.channelName"
                                        :value="item.id">
                                        <span style="float: left">{{ item.channelName }}</span>
                                        <span style="float: right;">{{ item.channelCode }}</span>
                                        </el-option>
                                    </el-select>

                                </div>

                                <div class="bgcolor">
                                    <label>服务人员</label>

                                    <el-select  v-model="svrEmployeeId_EmployeeName" :filter-method="filterPerMethod" clearable filterable>
                                        <el-option
                                        v-for="item in perFilter"
                                        :key="item.id"
                                        :label="item.employeeName"
                                        :value="item.id">
                                        <span style="float: left">{{ item.employeeName }}</span>
                                        <span style="float: right;">{{ item.employeeCode }}</span>
                                        </el-option>
                                    </el-select>
                                </div>

                                <div class="bgcolor">
                                    <label>QQ</label>
                                    <el-input v-model="createParams.qq" placeholder=""></el-input>
                                </div>
                                <!-- <div class="bgcolor">
                                    <label>微信</label>
                                    <el-input disabled placeholder=""></el-input>
                                </div> -->
                            </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="bgcolor remark">
                                        <label>备注</label>
                                        <el-input v-model="createParams.remark" placeholder=""></el-input>
                                    </div>

                                </el-col>
                            </el-row>

                            <el-row class="bg-white mt20">
                                <div class="tabZoo inline-block-need">
                                    <el-col :span="24">
                                        <el-tabs v-model="activeSelfName">
                                            <el-tab-pane label="自定义信息" name="selfMes" class="getPadding bg-white" style="z-index:-10"></el-tab-pane>
                                        </el-tabs>
                                    </el-col>
                                </div>
                                <!-- <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span> -->
                            </el-row>
                            <el-row class="bg-white">
                                <el-collapse-transition>
                                    <div v-show="ifShow">
                                        <div class="bgcolor" v-for="item in sonTableModel" :key="item.id">
                                            <label> {{item.name}}</label>
                                            <el-select v-model="item.defValueCode" clearable
                                                        class="inline-block-need member-add"
                                                        v-if='item.control == 1'
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

                        </el-tab-pane>
                        <!-- <el-tab-pane label="会员计次" name="count" class="getPadding" style="z-index:-100">

                        </el-tab-pane> -->
                        <el-tab-pane label="会员行为" name="action" class="getPadding gray" style="z-index:-100">
                            <div style="height:340px;width:100%;background-color:#f5f5f5;">
                                <div id='myChart' class="chart" style="height:300px;width:400px"></div>
                                <div id='myChartPieOne' class="chart" style="height:300px;width:250px"></div>
                                <div id='myChartPieTwo' class="chart" style="height:300px;width:250px"></div>
                                <div class="chart" style="height:300px;width:250px">
                                    <p>客单价</p>
                                    <p class="strong">¥333333</p>
                                </div>
                                <div class="chart" style="height:300px;width:250px">
                                    <p>平均折扣</p>
                                    <p class="strong">60%</p>
                                </div>

                            </div>

                        </el-tab-pane>
                        <el-tab-pane label="记录查询" name="search" class="getPadding" style="z-index:-100">
                            <el-tabs v-model="searchActiveName" tab-position="left" class="left-pane" @tab-click='seeRecord'>
                                    <el-tab-pane label="消费记录" name="cast" class="getPadding" style="z-index:-10">
                                        <el-table :data="tableDataExpand" border style="width: 100%"  v-loading="extableLoading" class="normalTable">
                                            <el-table-column prop="billNo" label="单号"> </el-table-column>
                                            <el-table-column prop="billTypeidTValue" label="单据类型"> </el-table-column>
                                            <el-table-column prop="billTime" label="单据时间"> </el-table-column>
                                            <el-table-column prop="skuId_SkuName" label="商品名称"> </el-table-column>
                                            <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
                                            <el-table-column prop="discount" label="折扣"> </el-table-column>
                                            <el-table-column prop="price" label="结算单价"> </el-table-column>
                                            <el-table-column prop="payamount" label="销售金额"> </el-table-column>
                                            <el-table-column prop="channelTypeidTValue" label="渠道"> </el-table-column>
                                            <el-table-column prop="personnelName" label="营业员"> </el-table-column>
                                            <el-table-column prop="remark" label="备注"> </el-table-column>
                                        </el-table>
                                        <el-pagination style="margin-top:20px;"
                                                        class="text-right"
                                                        background layout="total,prev, pager, next,jumper"
                                                        @current-change="exHandleCurrentChange"
                                                        :current-page="exPageIndex"
                                                        :page-size="exOneItem"
                                                        :total="exTotalItem"></el-pagination>
                                    </el-tab-pane>
                                    <el-tab-pane label="充值记录" name="recharge" class="getPadding" style="z-index:-100">
                                        <el-table :data="tableDataRecharge" border style="width: 100%"  v-loading="retableLoading" class="normalTable">
                                            <el-table-column prop="billNo" label="交易单号"> </el-table-column>
                                            <el-table-column prop="rechargeTime" label="交易日期"> </el-table-column>
                                            <el-table-column prop="rechargeTypeName" label="变动类型"> </el-table-column>
                                            <el-table-column prop="orgAmount" label="变动前金额"> </el-table-column>
                                            <el-table-column prop="rechargeAmount" label="充值金额"> </el-table-column>
                                            <el-table-column prop="presentAmount" label="赠送金额"> </el-table-column>
                                            <el-table-column prop="amount" label="变动后金额"> </el-table-column>
                                            <el-table-column prop="channelName" label="渠道"> </el-table-column>
                                            <el-table-column prop="createBy" label="操作员"> </el-table-column>
                                        </el-table>
                                        <el-pagination style="margin-top:20px;"
                                                        class="text-right"
                                                        background layout="total,prev, pager, next,jumper"
                                                        @current-change="reHandleCurrentChange"
                                                        :current-page="rePageIndex"
                                                        :page-size="reOneItem"
                                                        :total="reTotalItem"></el-pagination>

                                    </el-tab-pane>
                                    <!-- <el-tab-pane label="充次记录" name="Recording" class="getPadding" style="z-index:-100">

                                    </el-tab-pane> -->
                                    <el-tab-pane label="积分记录" name="integral" class="getPadding" style="z-index:-100">
                                        <el-table :data="tableDataIntergral" border style="width: 100%"  v-loading="intableLoading">
                                            <el-table-column prop="billNo" label="交易单号"> </el-table-column>
                                            <el-table-column prop="createdTime" label="交易日期"> </el-table-column>
                                            <el-table-column prop="changeTypeName" label="变动类型"> </el-table-column>
                                            <el-table-column prop="integralOrg" label="变动前积分"> </el-table-column>
                                            <el-table-column prop="integralChg" label="变动积分"> </el-table-column>
                                            <el-table-column prop="integral" label="变动后积分"> </el-table-column>
                                            <el-table-column prop="channelName" label="渠道"> </el-table-column>
                                            <el-table-column prop="createBy" label="操作员"> </el-table-column>
                                        </el-table>
                                        <el-pagination style="margin-top:20px;"
                                                        class="text-right"
                                                        background layout="total,prev, pager, next,jumper"
                                                        @current-change="inHandleCurrentChange"
                                                        :current-page="inPageIndex"
                                                        :page-size="inOneItem"
                                                        :total="inTotalItem"></el-pagination>

                                    </el-tab-pane>
                                    <el-tab-pane label="卡券记录" name="card" class="getPadding" style="z-index:-100">
                                        <el-table :data="tableDataCoupon" border style="width: 100%"  v-loading="coutableLoading">
                                            <el-table-column prop="couponCode" label="卡券号"> </el-table-column>
                                            <el-table-column prop="activityName" label="卡券名称"> </el-table-column>
                                            <el-table-column prop="couponId_CouponName" label="卡券类型"> </el-table-column>
                                            <el-table-column prop="couponId_Denomination" label="发放日期"> </el-table-column>
                                            <el-table-column prop="effectiveStart" label="开始日期"> </el-table-column>
                                            <el-table-column prop="effectiveEnd" label="结束日期"> </el-table-column>
                                            <el-table-column prop="couponStatusTValue" label="当前状态"> </el-table-column>
                                            <el-table-column prop="issueShopId_ShopName" label="发送店铺"> </el-table-column>
                                        </el-table>
                                        <el-pagination style="margin-top:20px;"
                                                        class="text-right"
                                                        background layout="total,prev, pager, next,jumper"
                                                        @current-change="couHandleCurrentChange"
                                                        :current-page="couPageIndex"
                                                        :page-size="couOneItem"
                                                        :total="couTotalItem"></el-pagination>

                                    </el-tab-pane>
                                    <el-tab-pane label="兑换记录" name="exchange" class="getPadding" style="z-index:-100">

                                        <el-table :data="tableDataExchange" border style="width: 100%"  v-loading="ectableLoading">
                                            <el-table-column prop="createdTime" label="兑换日期"> </el-table-column>
                                            <el-table-column prop="exchTypeName" label="兑换类型"> </el-table-column>
                                            <el-table-column prop="exchName" label="兑换项目"> </el-table-column>
                                            <el-table-column prop="channelName" label="兑换渠道"> </el-table-column>
                                            <el-table-column prop="integral" label="使用积分"> </el-table-column>
                                        </el-table>
                                        <el-pagination style="margin-top:20px;"
                                                        class="text-right"
                                                        background layout="total,prev, pager, next,jumper"
                                                        @current-change="ecHandleCurrentChange"
                                                        :current-page="ecPageIndex"
                                                        :page-size="ecOneItem"
                                                        :total="ecTotalItem"></el-pagination>

                                    </el-tab-pane>
                                    <el-tab-pane label="互动记录" name="Interactive" class="getPadding" style="z-index:-100">

                                    </el-tab-pane>
                                    <el-tab-pane label="会员提成" name="Membership" class="getPadding" style="z-index:-100">

                                    </el-tab-pane>
                            </el-tabs>

                        </el-tab-pane>
                        <el-tab-pane label="绑定信息" name="mes" class="getPadding" style="z-index:-100">
                            <el-checkbox-group v-model="checkboxGroup" size="medium">
                            <el-checkbox-button v-for="bindmode in bindModes" :label="bindmode" :key="bindmode">{{bindmode}}</el-checkbox-button>
                            </el-checkbox-group>

                        </el-tab-pane>

                </el-tabs>
            </el-col>
            </div>

        </el-row>

        <el-row class="mt10 bt1 pl10  bg-white">
            <el-col :span="22" class="auditInformation getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="createParams.createdBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input :disabled="true" v-model="createParams.createdTime"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="createParams.modifiedBy"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input :disabled="true" v-model="createParams.modifiedTime"></el-input>
                    </div>

                </div>
            </el-col>
        </el-row>
        <el-row class="mt20 center">
            <span>
                <el-button class="sure-btn save-btn" @click="save()">保 存</el-button>
                <el-button class="sure-btn cancel-btn" @click="cancel()">取 消</el-button>
            </span>
        </el-row>


      <!-- dialog -->
      <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>

    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import Table from '../../../base/Table/Table'
import {FILTER_MOTHED} from '../../../common/common.js'
import config from '../../../../static/config';
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
    data(){
        return{
            test1:'',
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
            activeName:'base',
            //---创建参数--------
            num:'',
            createParams:{
                "id": 0,
                "groupId": 0,
                "memberName":"",
                "cardCode":"",
                "moblie":"",
                "birthTypeid": "",
                "birthYear": "",
                "birthMonth": "",
                "birthDay": "",
                "age": "",
                "gradeId": "",
                "pwd": "",
                "memberGradeValid": "",
                "effectiveStart": "2018-07-18T06:58:47.287Z",
                "effectiveEnd": "2018-07-18T06:58:47.287Z",
                "channelTypeid": 1,
                "channelId":"",
                "ouId":"",
                "svrShopId": "",
                "svrEmployeeId":"",
                "sex": "",
                "idcardTypeid":"",
                "idcardNo":"",
                "phone":"",
                "qq":"",
                "email":"",
                "adAreaLevel1":"",
                "adAreaLevel2":"",
                "adAreaLevel3":"",
                "address": "",
                "introducer":"",
                "regSourceid":"",
                "portraitUrl":"",
                "remark": "",
                "status": ""

            },
            //展现的参数
            showParams:{
                // groupId: '',
                // memberName:'',
                // cardCode:'',
                // moblie:'' ,
                // birthTypeid:'',
                // birthYear:'',
                // birthMonth:'',
                // birthDay:'',
                // age:'',
                // gradeId:'',
                // pwd:'',
                // memberGradeValid:'',
                // effectiveStart:'',
                // effectiveEnd:'',
                // channelTypeid:'',
                // channelId:'',
                // ouId:'',
                // svrShopId:'',
                // svrEmployeeId:'',
                // sex:'',
                // idcardTypeid:'',
                // idcardNo:'',
                // phone:'',
                // qq:'',
                // email:'',
                // adAreaLevel1:'',
                // adAreaLevel2:'',
                // adAreaLevel3:'',
                // address:'',
                // introducer:'',
                // regSourceid:'',
                // portraitUrl:'',
                // remark:'',
                // status:''
            },

            activeSelfName:'selfMes',
            dateMes:'',//初始选择的日期
            isMan:true,
            isWoman:false,
            solar:false,
            lunar:true,
            shopAr:[],//服务店铺
            filterShopKey:'',//过滤后的服务店铺
            personAr:[],//服务职员
            filterPerKey:'',//过滤后的服务人员
            idAr:[],//证件类型
            proAr:[],//省下拉框
            cityAr:[],//市下拉框
            areaAr:[],//区下拉框
            searchActiveName:"cast",
            ifShow:true,//基础资料
            ifShowOther:false,
            memberLabelDialog:false,//会员标签弹框
            modifyParams:{
                crmMember_MainTable:'',
                crmMemberDef_ChildTable:[]
            },
            bindModes:['微信','钉钉','QQ'],
            checkboxGroup:['微信'],
            sonTableModel:[],//自定义信息数据

            //消费记录表格
            exPageIndex:1,//分页的当前页码
            exTotalPage:0,//当前分页总数
            exOneItem:10,//每页有多少条信息
            exPage:1,//当前页
            exTotalItem:0,//总共有多少条消息
            tableDataExpand:[],
            queryParamsExpend:{
                MemberId:'',//编码或名称
                SkipCount:'',
                MaxResultCount:'',
            },
            //充值记录表格
            tableDataRecharge:[],
            rePageIndex:1,//分页的当前页码
            reTotalPage:0,//当前分页总数
            reOneItem:10,//每页有多少条信息
            rePage:1,//当前页
            reTotalItem:0,//总共有多少条消息
            queryParamsRecharge:{
                MemberId:'',//编码或名称
                GroupID:'',
                SkipCount:'',
                MaxResultCount:''
            },
            //积分记录表格
            tableDataIntergral:[],
            inPageIndex:1,//分页的当前页码
            inTotalPage:0,//当前分页总数
            inOneItem:10,//每页有多少条信息
            inPage:1,//当前页
            inTotalItem:0,//总共有多少条消息
            queryParamsIntergral:{
                MemberId:'',
                SkipCount:"",
                MaxResultCount:""
            },
            //卡券记录表格
            tableDataCoupon:[],
            couPageIndex:1,//分页的当前页码
            couTotalPage:0,//当前分页总数
            couOneItem:10,//每页有多少条信息
            couPage:1,//当前页
            couTotalItem:0,//总共有多少条消息
            queryParamsCoupon:{
                MemberId:'',//编码或名称
                SkipCount:'',
                MaxResultCount:''
            },
            //兑换记录表格
            tableDataExchange:[],
            ecPageIndex:1,//分页的当前页码
            ecTotalPage:0,//当前分页总数
            ecOneItem:10,//每页有多少条信息
            ecPage:1,//当前页
            ecTotalItem:0,//总共有多少条消息
            queryParamsExchange:{
                QueryType:'3',
                MemberId:'',
                SkipCount:'',
                MaxResultCount:''
            },

            cardCode:'',
            id:'',
            memberTags:[],//会员标签
            extableLoading:true,//消费记录加载
            retableLoading:true,//充值记录加载
            intableLoading:true,//积分记录加载
            coutableLoading:true,//卡券记录加载
            ectableLoading:true,//兑换记录加载
            birthYear:'',
            birthMonth:'',
            birthDay:'',            
            birthYearAr:[],//年分割后的数组
            birthMonthAr:[],//月分割后的数组
            birthDayAr:[],//日分割后的数组
            svrShopId_ShopName:'',
            svrEmployeeId_EmployeeName:'',
            defaultOuId:'',


        }
    },
    watch:{
        defaultOuId:{
            handler:function(){
                let self = this;
                if(self.defaultOuId!=''){
                    self.getShop();
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
        solar:{
            handler:function(){
                let self = this;
                if(self.solar == false){
                    self.lunar = true;
                }else{
                    self.lunar = false;
                }
            },
            deep:true,
        },
        lunar:{
            handler:function(){
                let self = this;
                if(self.lunar == false){
                    self.solar = true;
                }else{
                    self.solar = false;
                }
            },
            deep:true,
        },

        dateMes:{
            handler:function(){
                let self = this;
                // console.log(self.dateMes)
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


        $route(to){
            let _this=this;
            // console.log(to)
            if(to.params.id!='default'&&to.params.id!=undefined){
                this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberInfo',{memberID:to.params.id}).then(function(res){
                    console.log(res.result)
                    _this.num='';
                    _this.createParams=res.result;
                    _this.showParams=_this.cloneObj(res.result);
                    _this.showParams.effectiveEnd=_this.resdate(new Date(_this.showParams.effectiveEnd));
                    _this.createParams.createdTime=_this.resdatetime(new Date(_this.createParams.createdTime));
                    _this.createParams.modifiedTime=_this.resdatetime(new Date(_this.createParams.modifiedTime));
                    if(_this.createParams.idcardTypeid==0){
                        _this.createParams.idcardTypeid='';
                    }
                },function(err){
                    console.log(err)
                })
                this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmTagManagement/GetTagsByTagId',{tagId:to.params.id}).then(function(res){
                    console.log(res.result)
                    _this.memberTags=res.result;
                },function(err){
                    console.log(err)
                })

            }else{
                this.createParams='';
                this.showParams='';
                this.num='';
            }
        }


    },
    created:function(){
        this.getId(this.$route.params.id)
        this.getCurrentUser();
        this.getPerson();
        this.getIdType();
        this.getPro();
        this.getSonTable();
        this.loadTable();
        
        setTimeout(function(){
            $('.pr-wrapper .el-input__prefix').click(function(e){
                $(this).prev('input').focus()
            });

        },100);

    },
    mounted() {
        this.drawLine();
    },
    computed:{
        
     shopFilter: function () {//下拉数据自定义搜索过滤 店铺
     console.log(this.shopAr,FILTER_MOTHED(this.filterShopKey,this.shopAr))
          return FILTER_MOTHED(this.filterShopKey,this.shopAr)
      },
     perFilter: function () {//下拉数据自定义搜索过滤 服务人员
          return FILTER_MOTHED(this.filterPerKey,this.personAr)
      },


    },
    methods:{
        filterShopMethod(query){
            this.filterShopKey=query
        },
        filterPerMethod(query){
            this.filterPerKey=query
        },
        getId(id) {
            let _this=this;
            if(id!='default'&&id!=undefined){
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberInfo',{memberID:id}).then(function(res){
                    console.log(res.result)
                    _this.num='';
                    _this.createParams=res.result;
                    _this.showParams=_this.cloneObj(res.result);
                    _this.showParams.effectiveEnd=_this.resdate(new Date(_this.showParams.effectiveEnd));
                    _this.createParams.createdTime=_this.resdatetime(new Date(_this.createParams.createdTime));
                    _this.createParams.modifiedTime=_this.resdatetime(new Date(_this.createParams.modifiedTime));
                    if(_this.createParams.idcardTypeid==0){
                        _this.createParams.idcardTypeid='';
                    }
                },function(err){
                    console.log(err)
                })
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmTagManagement/GetTagsByTagId',{tagId:id}).then(function(res){
                    console.log(res.result)
                    _this.memberTags=res.result;
                },function(err){
                    console.log(err)
                })

            }else{
                _this.createParams='';
                _this.showParams='';
                _this.num='';
            }

        },
        getCurrentUser:function(){
            let self = this;
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                console.log(res)
                self.defaultOuId = res.result.id;
                self.queryParamsRecharge.GroupID=res.result.groupId;
            },function(res){
                console.log('err'+res)
            });
        },
        getShop(){
            let self=this;
            //获取店铺
            self.$axios.gets('/api/services/app/ShopManagement/GetChannelsByType',{OuID:self.defaultOuId,ChannelType:self.createParams.channelTypeid}).then(function(res){
                console.log(res)
                self.shopAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        addTag(){//添加标签
            let _this = this;

            _this.memberLabelDialog = false;
        },
        loadTable(){
            let _this = this;
            _this.extableLoading=true;
            _this.queryParamsExpend.MemberId=_this.createParams.id;
            _this.queryParamsExpend.SkipCount=(_this.exPage-1)*_this.exOneItem;
            _this.queryParamsExpend.MaxResultCount=_this.exOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmRecordExpendManagement/GetMemberExpendList',_this.queryParamsExpend).then(function(res){
                _this.tableDataExpand=res.result.items;
                _this.exTotalItem=res.result.totalCount;
                _this.exTotalPage=res.result.totalCount%_this.exOneItem==0?(res.result.totalCount%_this.exOneItem):Math.ceil(res.result.totalCount%_this.exOneItem);
                _this.extableLoading=false;
            },function(res){
                console.log('err'+res)
                _this.extableLoading=false;
            })
        },
        exHandleCurrentChange(val){
            let _this = this;
            _this.queryParamsExpend.MemberId=_this.createParams.id;
            _this.queryParamsExpend.SkipCount=(val-1)*_this.exOneItem;
            _this.queryParamsExpend.MaxResultCount=_this.exOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmRecordExpendManagement/GetMemberExpendList',_this.queryParamsExpend).then(function(res){
                _this.tableDataExpand=res.result.items;
                _this.exTotalItem=res.result.totalCount;
                _this.exTotalPage=res.result.totalCount%_this.exOneItem==0?(res.result.totalCount%_this.exOneItem):Math.ceil(res.result.totalCount%_this.exOneItem);
            },function(res){
                console.log('err'+res)
            })
        },
        reHandleCurrentChange(val){
            let _this=this;
            _this.queryParamsRecharge.MemberId=_this.createParams.id;
            _this.queryParamsRecharge.SkipCount=(val-1)*_this.reOneItem;
            _this.queryParamsRecharge.MaxResultCount=_this.reOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberRechargeManagement/GetRechargeDayb',_this.queryParamsRecharge).then(function(res){
                console.log(res)
                _this.tableDataRecharge=res.result.items;
                _this.reTotalItem=res.result.totalCount;
                _this.reTotalPage=res.result.totalCount%_this.reOneItem==0?(res.result.totalCount%_this.reOneItem):Math.ceil(res.result.totalCount%_this.reOneItem);
            },function(res){
                console.log('err'+res)
            })
        },
        inHandleCurrentChange(val){
            let _this=this;
            _this.queryParamsIntergral.MemberId=_this.createParams.id;
            _this.queryParamsIntergral.SkipCount=(val-1)*_this.inOneItem;
            _this.queryParamsIntergral.MaxResultCount=_this.inOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberIntegralAdjManagerment/GetIntegralDayb',_this.queryParamsIntergral).then(function(res){
                //console.log(res)
                _this.tableDataIntergral=res.result.items;
                _this.inTotalItem=res.result.totalCount;
                _this.inTotalPage=res.result.totalCount%_this.inOneItem==0?(res.result.totalCount%_this.inOneItem):Math.ceil(res.result.totalCount%_this.inOneItem);
            },function(res){
                console.log('err'+res)
            })

        },
        couHandleCurrentChange(val){
            _this.queryParamsCoupon.MemberId=_this.createParams.id;
            _this.queryParamsCoupon.SkipCount=(val-1)*_this.couOneItem;
            _this.queryParamsCoupon.MaxResultCount=_this.couOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetCouponReceiveRecordByMemberId',_this.queryParamsCoupon).then(function(res){
                _this.tableDataCoupon=res.result.items;
                _this.couTotalItem=res.result.totalCount;
                _this.couTotalPage=res.result.totalCount%_this.couOneItem==0?(res.result.totalCount%_this.couOneItem):Math.ceil(res.result.totalCount%_this.couOneItem);
            },function(res){
                console.log('err'+res)
            })
        },
        ecHandleCurrentChange(val){
            _this.queryParamsExchange.MemberId=_this.createParams.id;
            _this.queryParamsExchange.SkipCount=(_this.couPage-1)*_this.ecOneItem;
            _this.queryParamsExchange.MaxResultCount=_this.ecOneItem;
            _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetIntegralExchangeRecorde',_this.queryParamsExchange).then(function(res){
                _this.tableDataExchange=res.result.items;
                _this.ecTotalItem=res.result.totalCount;
                _this.ecTotalPage=res.result.totalCount%_this.ecOneItem==0?(res.result.totalCount%_this.ecOneItem):Math.ceil(res.result.totalCount%_this.ecOneItem);
            },function(res){
                console.log('err'+res)
            })
        },
        seeRecord(res){
            let _this=this;
            if(res.index==0){
                _this.loadTable();
            }else if(res.index==1){
                _this.retableLoading=true;
                _this.queryParamsRecharge.MemberId=_this.createParams.id;
                _this.queryParamsRecharge.SkipCount=(_this.rePage-1)*_this.reOneItem;
                _this.queryParamsRecharge.MaxResultCount=_this.reOneItem;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberRechargeManagement/GetRechargeDayb',_this.queryParamsRecharge).then(function(res){
                    console.log(res)
                    _this.tableDataRecharge=res.result.items;
                    _this.reTotalItem=res.result.totalCount;
                    _this.reTotalPage=res.result.totalCount%_this.reOneItem==0?(res.result.totalCount%_this.reOneItem):Math.ceil(res.result.totalCount%_this.reOneItem);
                    _this.retableLoading=false;
                },function(res){
                    console.log('err'+res);
                    _this.retableLoading=false;
                })
            }else if(res.index==2){
                 _this.intableLoading=true;
                _this.queryParamsIntergral.MemberId=_this.createParams.id;
                _this.queryParamsIntergral.SkipCount=(_this.inPage-1)*_this.inOneItem;
                _this.queryParamsIntergral.MaxResultCount=_this.inOneItem;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberIntegralAdjManagerment/GetIntegralDayb',_this.queryParamsIntergral).then(function(res){
                   //console.log(res)
                   _this.tableDataIntergral=res.result.items;
                    _this.inTotalItem=res.result.totalCount;
                    _this.inTotalPage=res.result.totalCount%_this.inOneItem==0?(res.result.totalCount%_this.inOneItem):Math.ceil(res.result.totalCount%_this.inOneItem);
                    _this.intableLoading=false;
                },function(res){
                    console.log('err'+res);
                    _this.intableLoading=false;
                })
            }else if(res.index==3){
                 _this.coutableLoading=true;
                _this.queryParamsCoupon.MemberId=_this.createParams.id;
                _this.queryParamsCoupon.SkipCount=(_this.couPage-1)*_this.couOneItem;
                _this.queryParamsCoupon.MaxResultCount=_this.couOneItem;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CouponManagement/GetCouponReceiveRecordByMemberId',_this.queryParamsCoupon).then(function(res){
                    _this.tableDataCoupon=res.result.items;
                    _this.couTotalItem=res.result.totalCount;
                    _this.couTotalPage=res.result.totalCount%_this.couOneItem==0?(res.result.totalCount%_this.couOneItem):Math.ceil(res.result.totalCount%_this.couOneItem);
                     _this.coutableLoading=false;
                },function(res){
                    console.log('err'+res);
                    _this.coutableLoading=false;
                })
            }else if(res.index==4){
                _this.ectableLoading=true;
                _this.queryParamsExchange.MemberId=_this.createParams.id;
                _this.queryParamsExchange.SkipCount=(_this.couPage-1)*_this.ecOneItem;
                _this.queryParamsExchange.MaxResultCount=_this.ecOneItem;
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/CrmIntegralExchtacticManagement/GetIntegralExchangeRecorde',_this.queryParamsExchange).then(function(res){
                    _this.ectableLoading=false;
                    _this.tableDataExchange=res.result.items;
                    _this.ecTotalItem=res.result.totalCount;
                    _this.ecTotalPage=res.result.totalCount%_this.ecOneItem==0?(res.result.totalCount%_this.ecOneItem):Math.ceil(res.result.totalCount%_this.ecOneItem);
                },function(res){
                    console.log('err'+res)
                    _this.ectableLoading=false;
                })
            }
        },
        getSonTable:function(){
            let self = this;
            self.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/DefManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                console.log(res)
                self.sonTable = res.result.items;
                // console.log(self.sonTable)
                for(let i in self.sonTable){
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
        drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChartLine = echarts.init(document.getElementById('myChart'));
        let myChartPieOne = echarts.init(document.getElementById('myChartPieOne'));
        let myChartPieTwo = echarts.init(document.getElementById('myChartPieTwo'));
        let optionLine = {
            title: {
                show:true,
                text: '金额',
                textStyle:{
                    color:'#a5a5a5'
                }

            },
            tooltip: {
                trigger: 'axis'
            },
            color:['#5c9cd5','#ed7d31','#a5a5a5'],
            legend: {
                data:['消费金额','连带率','消费次数'],
                x: 'center',
                y: 'bottom',
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '8%',
                top:'8%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月','2月','3月','4月','5月','6月','7月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'消费金额',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'连带率',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'消费次数',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },

            ]
        }

        let optionPieOne = {
            title : {
                text: '品牌占比',
                x:'center',
                textStyle:{
                    color:'#a5a5a5'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            color:['#5c9cd5','#ed7d31'],
            legend: {
                orient: 'horizontal',
                x:'center',
                y:'90%',
                data: ['耐克','阿迪达斯']
            },

            series : [
                {
                    name: '品牌占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'耐克'},
                        {value:310, name:'阿迪达斯'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal : {
                                label : {
                                    show : false   //隐藏标示文字
                                },
                                labelLine : {
                                    show : false   //隐藏标示线
                                }
                            }

                    }
                }
            ]
        };

        let optionPieTwo = {
            title : {
                text: '类别占比',
                x:'center',
                textStyle:{
                    color:'#a5a5a5'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            color:['#5c9cd5','#ed7d31'],
            legend: {
                orient: 'horizontal',
                x:'center',
                y:'90%',
                data: ['裤子','衣服']
            },

            series : [
                {
                    name: '类别占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'裤子'},
                        {value:310, name:'衣服'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal : {
                                label : {
                                    show : false   //隐藏标示文字
                                },
                                labelLine : {
                                    show : false   //隐藏标示线
                                }
                            }

                    }
                }
            ]
        };
        // 绘制图表
        myChartLine.setOption(optionLine);
        myChartPieOne.setOption(optionPieOne);
        myChartPieTwo.setOption(optionPieTwo);
        },

        cancel(){
            let self = this;
            self.showParams='';
            self.createParams='';

        },
        getPerson:function(){//获取职员
            let self = this;
            self.$axios.gets('/api/services/app/EmployeeManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                console.log(res);
                self.personAr = res.result.items
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
        sureSearch(){
            let _this=this;
            if(_this.num!=''){
                _this.$axios.gets(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/GetMemberInfo',{info:_this.num}).then(function(res){
                    //console.log(res.result)
                    if(res.result.id == 0){
                        $('.wrongWrapper').css({display:'block'})
                    }else{
                        $('.wrongWrapper').css({display:'none'});
                        _this.cardCode=res.result.cardCode;
                        _this.id=res.result.id;
                        _this.createParams=res.result;
                        _this.showParams=_this.cloneObj(res.result);
                        //审计信息时间
                        _this.showParams.effectiveEnd=_this.resdate(new Date(_this.showParams.effectiveEnd));
                        _this.createParams.createdTime=_this.resdatetime(new Date(_this.createParams.createdTime));
                        _this.createParams.modifiedTime=_this.resdatetime(new Date(_this.createParams.modifiedTime));
                        if(_this.createParams.idcardTypeid==0){
                            _this.createParams.idcardTypeid='';
                        }
                    }
                },function(res){
                    console.log('err'+res)
                });
            }else{
                $('.wrongWrapper').css({display:'block'})
            }

        },
        cloneObj:function(obj){
            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if(window.JSON){
                str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
                }
            }
            return newobj;
        },

        save(){
            let _this=this;
            console.log(_this.createParams)
            _this.createParams.birthYear=_this.birthYear;
            _this.createParams.birthMonth=_this.birthMonth;
            _this.createParams.birthDay=_this.birthDay;
            _this.createParams.svrShopId_ShopName=_this.svrShopId_ShopName;
            _this.createParams.svrEmployeeId_EmployeeName=_this.svrEmployeeId_EmployeeName;
            _this.modifyParams.crmMember_MainTable=_this.createParams;
            _this.modifyParams.crmMemberDef_ChildTable = _this.sonTableModel;
            _this.$axios.posts(config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberManagement/AggregateCreateOrUpdate',_this.modifyParams).then(function(res){
                _this.open('创建成功','el-icon-circle-check','successERP');
            },function(err){
                _this.dialogSetting.dialogType="submit";
                _this.dialogSetting.dialogName='saveDialog'
                _this.dialogSetting.message=err.error.message;
                _this.errorTips.message=err.error.message;
                _this.errorTips.details='';
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                _this.dialogVisible=true;
            });

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
        resdatetime:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
        },
        resdate:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate();
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
                        _this.createParams.portraitUrl=getBaseURL+imagePath
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
            this.createParams.portraitUrl="";

        },


        //------------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="saveDialog"){//保存
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){//取消
                    this.dialogVisible=false;
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
.sure-btn{
    background-color: #33cccc;
    border: 1px solid #33cccc;
    height: 34px;
    line-height: 0.8;
    color: white;
}
.member-information .center{
    text-align: center;
}
.member-information .row{
    padding-top:10px;
}
.withbtn .el-input{
    width: calc(100% - 145px)!important;
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
.member-information .bgcolor{
    width: 280px;
}
.ml84{
    margin-left: 84px;
}
.member-information .calendar{
    width: 196px;
}

.member-information .bgcolor-select{
    height: 35px;
    font-size: 12px;
    margin-bottom: 10px;
    /* width: 250px; */
    float: left;
    overflow: hidden;
    margin-right: 5px
}
.member-information .bgcolor-select>label{
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
.member-information .bgcolor-select>label small{
    color: #FF669B;
    margin-right: 2px;
}
.member-information .bgcolor-select .road .el-input{
    width: 205px;
}
.member-information .bgcolor-select .road .el-input input{
    height: 35px;
    font-size: 12px;
}
.member-information .bgcolor-select .card-id{
    width: 120px;
}
.member-information .bgcolor-select .card-id .el-input input{
    height: 35px;
    font-size: 12px;
}
.member-information .bgcolor-select .card-input{
    width:352px;
}
.bgcolor-select .card-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .member-add{
    width: 85px;
}
.bgcolor-select .member-add .el-input input{
    height: 35px;
    font-size: 12px;
}
.bgcolor-select .add-input{
    width:217px;
}
.bgcolor-select .add-input input{
    height: 35px;
    font-size: 12px;
}
.member-information .inline-block-need{
    display: inline-block;
    float: left;
}
.member-information .tabZoo{
    width: 100%;
}
.member-information .left-pane .el-tabs__item.is-active{
    background: white;
}
.member-information .relative{
    position: relative;
}
.member-information .other-content{
    width: 240px;
    position: absolute;
    right: 0;
    top:52px;
    background-color: white;
    padding: 10px;
    z-index: 1000;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.member-information .other-content li{
    display: inline-block;
    padding:5px;
    margin: 5px;
    font-size: 14px;
    border-radius: 4px;
}
.member-information .other-content li:hover{
    color: #3cc;
    background-color: #f2f2f2;
}
.pr-wrapper{
    position: relative;
}

.date-input{
    position: absolute;
    left: 100px;
    z-index: 400 !important;
    width: 44px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 10px;
    font-size: 12px;
}
.date-input1{
    position: absolute;
    left: 154px;
    z-index: 400 !important;
    width: 30px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 10px;
    margin-left: 5px;
}
.date-input2{
    position: absolute;
    left: 199px;
    z-index: 400 !important;
    width: 30px!important;
    height: 25px!important;
    border:none;
    margin-top: 5px;
    outline: none;
    background-color: #F9F9F9;
    padding-left: 10px;
    margin-left: 5px;
}
.left-box{
    width: calc(100% - 220px)
}
.upload-avatar{
    width:220px;
}
.member-information .upload_body_center{
    width: 126px;
    height: 170px;
    border: 1px solid #dcdcdc;
}
.avatar-uploader-icon{
    width:126px;
    height:170px;
}
.member-information .upload_showImg{
    width: 126px;
    height: 170px;
}
.wrongWrapper{
    display: none;
    padding-left:95px;
}

.wrongWrapper span{
    color: red;
    font-size: 10px;
}

.member-information .save-btn,.cancel-btn{
    padding: 0 40px;
}
.member-information .cancel-btn{
    background-color:  #dcdcdc;
    color: #8291A8;
    border: 1px solid  #dcdcdc;
    margin-left: 40px;
}
.member-information .chart{
    float: left;
    background-color: white;
    height: 300px;
    margin: 20px 5px;
}



.member-information .search-title{
    font-weight: bolder;
}

/* .member-information .bgcolor .el-input {
    display: block;
    width: calc(100% - 154px);
    height: 35px;
    float: left;
    font-size: 12px;
} */

.member-information .show-title{
    color:#999999;
}
.member-information .bg-pray .bgcolor .el-input{
    width: calc(100% - 94px)!important;
}

.member-information .label-wrapper .bgcolor{
    width:100%!important;
}
.member-information .member-label{
    width: 45px;
    height: 30px;
    line-height: 30px;
    text-align:center;
    background: white;
    display: inline-block;
    color: #3cc;
    border:1px solid #3cc;
    border-radius: 3px;
    margin-left: 10px;
}
.member-label-btn{
    background: #3cc;
    color: white;
    cursor: pointer;
}
.bgcolor-member-label{
    width: 100%!important;
}
.member-information .gray .el-tabs__content{
    background-color: #f5f5f5;
}
.member-information .chart p{
    text-align: center;
    line-height: 30px;
}
.member-information .strong{
    color: #5b9bd5;
    font-size: 40px;
    font-style: normal;
    width: 250px;
    margin: 0 5px;
    word-break: break-all;
    word-wrap:break-word;
    padding-top: 100px;
    text-align: center;
}
.member-information .el-checkbox-button{
    margin:10px;
}

</style>
<style>
.member-information .el-dialog__wrapper .el-dialog{
    width: 400px;
}
.member-information .tabZoo .el-tabs__nav-scroll{
    background-color: white;
    margin-left:10px! important;
}
.member-information .left-pane .el-tabs__nav-scroll{
    background-color: #e4e4e4;
    margin-left:0;
}
.member-information .left-pane .el-tabs__active-bar{
    height: 0!important;
}
.member-information .left-pane .el-tabs__item.is-active{
    background-color:white;
}

.member-information .left-pane .el-tabs__item:hover{
    background-color:white;
}
.member-information .bgcolor-select .el-input__inner{
    height: 35px;
}
.pr-wrapper .el-date-editor input{
    padding: 5px 90px;
}
.member-information .bg-pray .bgcolor .el-input input{
    border:none;
    background:none;
}
.member-information .el-checkbox-button.is-focus .el-checkbox-button__inner{
    border-color:#dcdfe6;
}
.member-information .el-checkbox-button .el-checkbox-button__inner{
    border-radius:5px;
    border-left:1px solid #dcdfe6;
}
.member-information .el-checkbox-button .el-checkbox-button__inner:hover{
    color:#3cc;
}
.member-information .el-checkbox-button.is-checked .el-checkbox-button__inner{
    background: white;
    color: #33cccc;
    border: 1px solid #3cc;
    box-shadow:0px 0 0 0 #33cccc;
    -webkit-box-shadow:0px 0 0 0 #33cccc;
}
</style>

