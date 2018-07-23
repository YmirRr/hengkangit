<template>
    <div class="tenant-manager-wrapper commodityDetails">
        <el-row class="bg-white tenant">
            <el-col :span='24'>
                <btm class="fixed" :date="bottonbox" v-on:listbtm="btmlog"> </btm>
                <el-row>
                  <el-col :span="24">
                    <div class="tipsWrapper">
                      <div class="errorTips">
                        <p class="msgDetail">错误提示：
                          <span 
                            :class="{block : !validation.hasError('addData.adAreaId')}">
                            租户编码{{ validation.firstError('addData.adAreaId') }},
                          </span>
                          <span 
                            :class="{block : !validation.hasError('addData.tenantName')}">
                            租户名称{{ validation.firstError('addData.tenantName') }},
                          </span>
                          <span 
                            :class="{block : !validation.hasError('addData.phoneNumber')}">
                            手机号{{ validation.firstError('addData.phoneNumber') }},
                          </span>
                          <span 
                            :class="{block : !validation.hasError('addData.status')}">
                            状态{{ validation.firstError('addData.status') }},
                          </span>
                          <span 
                            :class="{block : !validation.hasError('addData.remark')}">
                            行政区域{{ validation.firstError('addData.remark') }},
                          </span>
                          <span 
                            :class="{block : !validation.hasError('addData.contactAddress')}">
                            地址{{ validation.firstError('addData.contactAddress') }},
                          </span>
                        </p>
                      </div>
                    </div>        
                    <!-- <div class="tipsWrapper" name="adAreaId">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.adAreaId')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.adAreaId') }}</p>
                      </div>
                    </div>
                    <div class="tipsWrapper" name="tenantName">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.tenantName')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.tenantName') }}</p>
                      </div>
                    </div>
                    <div class="tipsWrapper" name="phoneNumber">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.phoneNumber')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.phoneNumber') }}</p>
                      </div>
                    </div>
                    <div class="tipsWrapper" name="status">
                      <div class="errorTips" :class="{block : !validation.hasError('addData.status')}">
                          <p class="msgDetail">错误提示：{{ validation.firstError('addData.status') }}</p>
                      </div>
                    </div> -->
                  </el-col>
                </el-row>
                <div>
                    <el-row  class="pl10 pr10" style="margin-top:20px">
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small>*</small>租户编码</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-input v-model="addData.adAreaId" placeholder="" 
                                class="adAreaId" 
                                @focus="showErrprTips"
                                :class="{redBorder : validation.hasError('addData.adAreaId')}" 
                                :disabled="read"
                                 ></el-input>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small>*</small>租户名称</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-input  placeholder="" 
                                class="tenantName" 
                                @focus="showErrprTips"
                                :disabled="read"
                                :class="{redBorder : validation.hasError('addData.tenantName')}"
                                 v-model="addData.tenantName" ></el-input>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small>*</small>手机号</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-input  placeholder=""
                                class="phoneNumber" 
                                @focus="showErrprTips"
                                :disabled="read"
                                :class="{redBorder : validation.hasError('addData.phoneNumber')}"
                                 v-model="addData.phoneNumber" ></el-input>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small></small>注册时间</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                              <el-date-picker 
                                class="regtime datepicker"   
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" 
                                v-model="addData.regTime" 
                                type="date" 
                                placeholder="" disabled=""></el-date-picker>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small></small>行政区域</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                             <div class="bgcolor smallBgcolor">
                                <el-select  v-model="addData.remark" :disabled="read" 
                                @focus="showErrprTips"
                                :class="{redBorder : validation.hasError('addData.remark')}"
                                >
                                <el-option v-for="item in options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                </el-option>
                                </el-select>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label><small>*</small>状态</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select
                                class="status" 
                                @focus="showErrprTips"
                                :class="{redBorder : validation.hasError('addData.status')}"
                                :disabled="read"
                                  v-model="addData.status" >
                                <el-option v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                </el-option>
                                </el-select>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label>地址</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-input :disabled="read" 
                                @focus="showErrprTips"
                                :class="{redBorder : validation.hasError('addData.contactAddress')}"
                                 placeholder="" v-model="addData.contactAddress" ></el-input>
                            </div>
                        </el-col>  
                      </el-col>
                      <el-col :span="6" >
                        <el-col :span="7" >
                          <div class="bgcolor smallBgcolor">
                              <label>备注</label>
                          </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-input  placeholder="" :disabled="read" ></el-input>
                            </div>
                        </el-col>  
                      </el-col>
                    </el-row>  
                </div>
                <el-row><el-col :span="24" class="ml10"><h4 class="ml10"> 集团信息</h4></el-col></el-row>
                <el-row  class="pl10 pr10" style="margin-top:20px">
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>集团编码</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" disabled=""  ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>集团名称</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" disabled=""  ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>本位币种</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" disabled="" ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>会计制度</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" disabled=""  ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>启用年月</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-date-picker 
                                class="regtime datepicker"   
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" 
                                v-model="addData.regTime" 
                                type="date" 
                                placeholder="" disabled=""></el-date-picker>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>状态</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-select v-model="abc"  disabled="">
                              <el-option v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                              </el-option>
                              </el-select>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>收费</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" :disabled="read" ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                    <el-col :span="6" >
                      <el-col :span="7" >
                        <div class="bgcolor smallBgcolor">
                            <label>用户数</label>
                        </div>
                      </el-col>
                      <el-col :span="14">
                          <div class="bgcolor smallBgcolor">
                              <el-input  placeholder="" :disabled="read" ></el-input>
                          </div>
                      </el-col>  
                    </el-col>
                  </el-row>  
                 <el-row class="bm-pd10 mt10" style=" background: rgb(249,249,249);">
                   
                    <template>
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="功能" name="first">
                            <btm :date="bottonbox1" v-on:listbtm="btmlog"> </btm>
                            <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                                <el-col :span="24">
                                    <el-table :data="tableData1" @selection-change="handleSelectionChange" border style="width: 100%">
                                    <el-table-column type="selection" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="sequenceNumber" label="" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="子系统">
                                    </el-table-column>
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="数据类型">
                                    </el-table-column>
                                    <el-table-column prop="startUsing1" label="开单库配置">
                                    </el-table-column>
                                    <el-table-column prop="startUsing2" label="查询库配置">
                                    </el-table-column>
                                    <el-table-column prop="startUsing3" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="startUsing4" label="备注">
                                    </el-table-column>
                                    <el-table-column prop="startUsing5" label="操作" width="60">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click=""  >删除</el-button>
                                        </template>
                                    </el-table-column>
                                  </el-table>    
                                </el-col>
                            </el-row>
                            <btm :date="bottonbox2" v-on:listbtm="btmlog"> </btm>
                            <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                                <el-col :span="24">
                                    <el-table :data="tableData1" @selection-change="handleSelectionChange" border style="width: 100%">
                                    <el-table-column type="selection" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="sequenceNumber" label="" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="功能模块">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="用户时间">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="失效时间">
                                    </el-table-column>
                                    <el-table-column prop="startUsing5" label="操作" width="60">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click=""  >删除</el-button>
                                        </template>
                                    </el-table-column>
                                  </el-table>    
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="商品" name="second">
                            <tree :datc="componyTree"></tree>
                            <el-row class="table-width" style="float:left">
                                <el-col :span="24">
                                    <h4 class="h4-title">商品属性</h4>
                                    <el-table :data="tableData1" @selection-change="handleSelectionChange" border style="width: 100%">
                                    <el-table-column type="selection" label="" width="60">
                                    </el-table-column>
                                    <el-table-column prop="sequenceNumber" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="属性编码">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="属性名称">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="启用">
                                    </el-table-column>
                                    <el-table-column prop="startUsing5" label="操作" width="60">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click=""  >删除</el-button>
                                        </template>
                                    </el-table-column>
                                  </el-table>
                                  <h4 class="h4-title">商品规格</h4>
                                    <el-table :data="tableData1" @selection-change="handleSelectionChange" border style="width: 100%">
                                    <el-table-column type="selection" label="" width="60">
                                    </el-table-column>
                                    <el-table-column prop="sequenceNumber" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="编码">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="名称">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="启用">
                                    </el-table-column>
                                    <el-table-column prop="startUsing5" label="操作" width="60">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click=""  >删除</el-button>
                                        </template>
                                    </el-table-column>
                                  </el-table>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <!--  -->
                        <el-tab-pane label="业务组织及用户" name="fourth">
                            <el-collapse-transition> 
                                <div v-show="ifShow2"> 
                                    <el-row class="pl10 pt10 pr10 pb10" style=" background: rgb(249,249,249);">
                                        <el-col :span="24">
                                            <h4 class="h4-title">业务组织</h4>
                                            <el-table :data="tableData4" @selection-change="handleSelectionChange" border style="width: 100%">
                                            <el-table-column type="selection" label="" width="60">
                                            </el-table-column>
                                            <el-table-column prop="sequenceNumber" label="" width="60">
                                            </el-table-column>
                                            <el-table-column prop="sequenceNumber" label="组织编码" >
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="组织名称">
                                            </el-table-column>
                                            <el-table-column prop="startUsing" label="公司">
                                            </el-table-column>
                                            <el-table-column prop="startUsing1" label="业务">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="财务">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="备注">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" size="small" @click=""  >删除</el-button>
                                                </template>
                                            </el-table-column>
                                            </el-table>
                                            <h4 class="h4-title">商品规格</h4>
                                            <el-table :data="tableData4" @selection-change="handleSelectionChange" border style="width: 100%">
                                            <el-table-column type="selection" label="" width="60">
                                            </el-table-column>
                                            <el-table-column prop="sequenceNumber" label="序号" width="60">
                                            </el-table-column>
                                            <el-table-column prop="sequenceNumber" label="姓名" >
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="手机">
                                            </el-table-column>
                                            <el-table-column prop="startUsing" label="绑定类型">
                                            </el-table-column>
                                            <el-table-column prop="startUsing1" label="注册用户">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="备注">
                                            </el-table-column>
                                            <el-table-column prop="startUsing2" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" size="small" @click=""  >删除</el-button>
                                                </template>
                                            </el-table-column>
                                            </el-table>    
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-collapse-transition>
                        </el-tab-pane>

                      </el-tabs>
                    </template>
                </el-row>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import Textbox from '../../base/textbox/textbox'
    export default{
        name:'userList',
        data(){
            return {
                    abc:'',
                    read:false,
                    componyTree: [{
                        id:'1',
                        label: '商品规格组',
                        children: [{
                            label: '颜色',
                            },
                            {
                             label: '尺码',
                             children: [{
                            
                            label: '男服',
                            
                            
                            },{label: '女服'}] 
                            }],
                        }],
                 tableData1: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '20171012',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '红',
                      startUsing2: 'X',
                      startUsing3: '件',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '20171013',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '红',
                      startUsing2: 'M',
                      startUsing3: '件',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '20171112',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '绿',
                      startUsing2: 'X',
                      startUsing3: '箱',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    },{
                      sequenceNumber: '4',
                      AttributeEncoding: '20171113',
                      attributeName: '',
                      startUsing: '',
                      startUsing1: '绿',
                      startUsing2: 'M',
                      startUsing3: '箱',
                      startUsing4: '',
                      startUsing5: '',
                      startUsing6: '',
                      startUsing7: '',
                      startUsing8: '',
                      startUsing9: '',
                      startUsing10: '',
                    },], 
                    tableData4: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '20171012',
                      attributeName: '20171012',
                      startUsing: '20171012',
                      startUsing1: '20171012',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '20171013',
                      attributeName: '20171013',
                      startUsing: '20171013',
                      startUsing1: '20171013',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '20171112',
                      attributeName: '20171112',
                      startUsing: '20171112',
                      startUsing1: '20171112',
                      startUsing2: '',
                    }, {
                      sequenceNumber: '4',
                      AttributeEncoding: '20171113',
                      attributeName: '20171113',
                      startUsing: '20171113',
                      startUsing1: '20171113',
                      startUsing2: '',
                    }],
                    
                activeName: 'second',
                try:{
                "groupId": 2,
                "stockId": 1,
                "addressId": 8,
                "completeAddress": "str33ing",
                "transportMethodId": 1,
                "contactPerson": "stri55ng",
                "phone": "18200326666",
                "logisticsCompany": "str55ing",
                "isDefault": true,
                "remark": "st54ring"
                },
                addData:{//post需要的键子对
                    tenantCode: "string",//可租借的
                    tenantName: "",//租户名称
                    phoneNumber: "",//电话
                    password: "123456",//密码
                    regTime: this.GetDateTime(),//启用年月
                    adAreaId: null,//id
                    contactAddress: "",//地址
                    remark: "",//
                    status: null,//状态
                    id: 0//id
                },
                options1:[{
                  value: '中国',
                  label: '中国'
                  }, {
                  value: '台湾',
                  label: '台湾'
                  }, {
                  value: '香港',
                  label: '香港'
                }],
                options:[{
                  value: 0,
                  label: '启用'
                  },{
                  value: 2,
                  label: '停用'
                }],
                options2:[{
                  value: 0,
                  label: '启用'
                  },{
                  value: 2,
                  label: '停用'
                }],
                ifShow2:true,
                bottonbox:{
                    url: '/tenant/tenantManagement',
                   botton:[{
                    class: 'erp_bt bt_back',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_back.png',
                    text: '返回'
                },{
                    class: 'erp_bt bt_add',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增'
                },{
                    class: 'erp_bt bt_save',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存'
                },{
                    class: 'erp_bt bt_excel',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_excel.png',
                    text: 'Excel'
                },{
                    class: 'erp_bt bt_print',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_modify.png',
                    text: '打印'
                },{
                    class: 'erp_bt bt_save',
                    show:true,
                    imgsrc: false,
                    text: '注册集团'
                }]},
                bottonbox1:{
                    url: '/tenant/tenantManagementAdd',
                   botton:[{
                    class: 'erp_bt bt_save',
                    show:true,
                    imgsrc: '../../../static/image/common/increment.png',
                    text: '增行'
                },{
                    class: 'erp_bt bt_interposition',
                    show:true,
                    imgsrc: '../../../static/image/common/interposition.png',
                    text: '插行'
                },{
                    class: 'erp_bt bt_eraseline',
                    show:true,
                    imgsrc: '../../../static/image/common/eraseline.png',
                    text: '删行'
                },{
                    class: 'erp_bt bt_excel',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_excel.png',
                    text: 'Excel'
                },{
                    class: 'erp_bt bt_auxiliary',
                    show:true,
                    imgsrc: '../../../static/image/common/bt_auxiliary.png',
                    text: '辅助功能'
                }]},
                bottonbox2:{
                    url: '/tenant/tenantManagementAdd',
                   botton:[{
                    class: 'erp_bt bt_excel',
                    show:true,
                    imgsrc: false,
                    text: '功能增补'
                },{
                    class: 'erp_bt bt_auxiliary',
                    show:true,
                    imgsrc: false,
                    text: '功能延期'
                }]},
                // value: '',
                addArray1:[],
                    pageIndex:-1,//分页的当前页码
			        totalPage:20,//当前分页总数
            }
        },
        validators: {
          'addData.adAreaId': function (value) {//租户编码
             return this.Validator.value(value).required().integer()
          },
          'addData.tenantName': function (value) {//租户名称
             return this.Validator.value(value).required().maxLength(20);
          },
          'addData.phoneNumber': function (value) {//手机号码
             return this.Validator.value(value).required().maxLength(20);
          },
          'addData.status': function (value) {//状态
             return this.Validator.value(value).required().maxLength(20);
          },
          'addData.remark': function (value) {//区域
             return this.Validator.value(value).required().maxLength(20);
          },
          'addData.contactAddress': function (value) {//状态
             return this.Validator.value(value).required().maxLength(50);
          },
        },
        created:function(){
            let _this=this;
            _this.loadData();
        },
        methods:{
            showErrprTips(e){
              let _this=this;
              $('.tipsWrapper').each(function(){
               
                if($(e.target).parent('.el-input').hasClass($(this).attr('name'))){
                }else{
                    $('.tipsWrapper').css({display:'none'});
                }
              })
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            loadData:function(){
              let _this=this;
              if(_this.$route.params.id != 'default'){
                _this.read=true;
                _this.bottonbox.botton.splice(2,1,{class: 'erp_bt bt_modify',show:true, imgsrc: '../../../static/image/common/bt_modify.png',text: '修改'})
                this.$axios.gets('http://192.168.100.107:8085/api/services/app/TenantManagement/Get',{Id:_this.$route.params.id}).then(function(res){
                  _this.addData=res.result;
                  console.log(res)
                },function(res){
                    console.log('err'+res)
                })
              }
            },
            GetDateTime: function () {//获取当前时间
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
            btmlog:function(data){
                let _this=this;
                if(data=='新增保存'){
                    $('.tipsWrapper').css({display:'block'});
                  _this.$validate();
                  // _this.addData.adAreaId=parseInt(_this.addData.adAreaId) 
                    _this.$axios.posts('http://192.168.100.107:8085/api/services/app/TenantManagement/Create',_this.addData).then(function(res){
                        _this.$store.state.url='/tenant/tenantManagement/'+res.result.id;
                        _this.$router.push({path:_this.$store.state.url})//点击切换路由
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(){
                        _this.open('保存失败','el-icon-error','faildERP');
                    })   
                }else if(data=='修改' && _this.bottonbox.botton[4].text!="取消"){
                    _this.read=false;
                    _this.bottonbox.botton.splice(3,0,{class: 'erp_bt bt_save amend_save',show:true, imgsrc: '../../../static/image/common/bt_save.png',text: '保存'},{class: 'erp_bt bt_auxiliary cancel',show:true, imgsrc: '../../../static/image/common/u470.png',text: '取消'})
                }else if(data == '修改保存'){
                  _this.$validate();
                  _this.$axios.puts('http://192.168.100.107:8085/api/services/app/TenantManagement/Update',_this.addData).then(function(res){
                        _this.$store.state.url='/tenant/tenantManagement/'+res.result.id;
                        _this.$router.push({path:_this.$store.state.url})//点击切换路由
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(){
                        _this.open('保存失败','el-icon-error','faildERP');
                    });
                }else if(data == '取消'){
                  _this.read=true;
                  _this.loadData();
                  _this.bottonbox.botton.splice(3,2);
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
            Init(){//数据初始化
                this.isCancel=false;
                this.isUpdate=false;
                this.isAdd=false;
                this.updateArray=[];
                this.addArray=[];
                this.updateId="";
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSelectionChange(val) {//点击复选框选中的数据
            },
        },
        components:{
            Textbox,
            Tree
        }
    }
</script>

<style scoped>

.block{
    display: none;
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
.fixed{
    background-color: #fff;
}
.h4-title{
    background-color: #fff;
    padding: 20px 0 20px 15px;
}
.table-width{
    width: calc(100% - 200px);
}
.store-data-wrapper{
    width: 100%;
    height: auto;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt5{
    margin-top: 5px;
}
.mt10{
    margin-top: 10px;
}
.mt20{
    margin-top: 20px;
}

.ml10{
    margin-left: 10px;
}
.pl10{
    padding-left: 10px;
}
.pl15{
    padding-left: 15px;
}
.pt10{
    padding-top: 10px;
}
.pt5{
    padding-top: 5px;
}
.pt20{
    padding-top: 20px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.h30{
    height: 30px;
    line-height: 30px;
}
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.fs12{
    font-size: 12px;
}
.border1{
    border: 1px solid #999999;
    border-radius: 3px;
}
.btn{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: rgba(130, 170, 252, 1);
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
.rbtn{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: rgba(242, 242, 242, 1);
    border-radius: 3px;
    cursor: pointer;
}
.search-btn{
    display: inline-block;
    width: 87px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: #4A6997;
    color: white;
    cursor: pointer;
}
.open{
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
.cancel .btImg{
  top: 14px;
}
.tenant-manager-wrapper .redBorder .el-input__inner{
  border-color: #f66;
}
.tenant-manager-wrapper .smallBgcolor .el-input input{
  height: 33px!important;
}
.tenant-manager-wrapper .bgcolor{
    width: 100%; 
}
.tenant .el-tabs__nav-scroll{
    margin-left: 20px;
}
/* 重写checkbox */
/*.tenant-manager-wrapper .el-checkbox__inner{
    width: 24px;
    height: 24px;
    border-radius:50% !important; 
}
.tenant-manager-wrapper .el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 11px;
    left: 6px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 6px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}*/

/* 重写el-table样式 */
.tenant-manager-wrapper .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.tenant-manager-wrapper .el-table td{
    padding: 3px 0;
}
.tenant-manager-wrapper .el-table__body{
    text-align: center;
}
/* 重写el-pagination样式 */
</style>