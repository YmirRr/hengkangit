<template>
  <div class="online-detail">
    <!-- button组 -->
    <el-row>
      <el-col :span="24" class="fixed bg-white bb1">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>

        <span @click="ifShow = !ifShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
      </el-col>
    </el-row>
    <!-- 用户资料 -->
    <el-collapse-transition>
      <div v-show="ifShow">
        <el-row class="bg-white pt10">
          <el-col :span="24" class="getPadding">
            <!-- 错误提示 -->
            <div class="tipsWrapper">
              <div class="errorTips">
                <p class="msgDetail">
                  <span :class="{block : !validation.hasError('createOnlineParams.ouId')}">
                    业务组织{{ validation.firstError('createOnlineParams.ouId') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.shopCode')}">
                    店铺代码{{ validation.firstError('createOnlineParams.shopCode') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.shopName')}">
                    店铺名称{{ validation.firstError('createOnlineParams.shopName') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.platformId')}">
                    平台{{ validation.firstError('createOnlineParams.platformId') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.sellerName')}">
                    卖家昵称{{ validation.firstError('createOnlineParams.sellerName') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.sellerMobile')}">
                    卖家手机{{ validation.firstError('createOnlineParams.sellerMobile') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.sellerPhone')}">
                    卖家座机{{ validation.firstError('createOnlineParams.sellerPhone') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.commissionRate')}">
                    佣金比例{{ validation.firstError('createOnlineParams.commissionRate') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.status')}">
                    审核状态{{ validation.firstError('createOnlineParams.status') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.createShopTime')}">
                    开店日期{{ validation.firstError('createOnlineParams.createShopTime') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineParams.remark')}">
                    备注{{ validation.firstError('createOnlineParams.remark') }},
                  </span>

                  <span :class="{block : !validation.hasError('createOnlineAPIParams.authKey')}">
                    应用钥{{ validation.firstError('createOnlineAPIParams.authKey') }},
                  </span>
                  <span :class="{block : !validation.hasError('createOnlineAPIParams.authSecretKey')}">
                    应用秘钥{{ validation.firstError('createOnlineAPIParams.authSecretKey') }},
                  </span>
                  <span :class="{block : !validation.hasError('createOnlineAPIParams.authCode')}">
                    授权码{{ validation.firstError('createOnlineAPIParams.authCode') }},
                  </span>
                  <span :class="{block : !validation.hasError('createOnlineAPIParams.authUrl')}">
                    接口地址{{ validation.firstError('createOnlineAPIParams.authUrl') }},
                  </span>
                </p>
              </div>
            </div>
            <!-- 业务组织 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label><small>*</small>业务组织</label>
                <el-select v-model="createOnlineParams.ouId"
                           placeholder=""
                           class="ouId"
                           @focus="showErrprTipsSelect"
                           @change='Modify()'
                           :class="{redBorder : validation.hasError('createOnlineParams.ouId')}">
                  <el-input placeholder="搜索..." class="selectSearch" v-model="ouSearch"></el-input>
                  <el-tree :data="ouAr"
                           :props="selectOuProps"
                           node-key="id"
                           ref="outree"
                           highlight-current
                           :default-expanded-keys="ouExpandId"
                           :render-content="renderContentOu"
                           :filter-node-method="filterNode"
                           :expand-on-click-node="false"
                           @node-click="ouNodeClick">
                  </el-tree>
                  <el-option v-show="false"
                             v-for="item in ouSelectAr"
                             :key="item.id"
                             :label="item.ouName"
                             :value="item.id"
                             :date="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
              <!-- 店铺代码 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label><small>*</small>店铺代码</label>
                <el-input v-model="createOnlineParams.shopCode"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.shopCode')}"
                          class="shopCode">
                </el-input>
              </div>
            </el-col>
              <!-- 店铺名称 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label><small>*</small>店铺名称</label>
                <el-input v-model="createOnlineParams.shopName"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.shopName')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 平台 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label><small>*</small>平台</label>
                <el-select v-model="createOnlineParams.platformName"
                           placeholder=""
                           class="platformId"
                           @focus="showErrprTipsSelect"
                           @change='Modify()'
                           :class="{redBorder : validation.hasError('createOnlineParams.platformId')}">
                  <el-tree
                           :data="platformAr"
                           :props="selectPlatformProps"
                           :default-checked-keys="[2]"
                           node-key="itemValue"
                           ref="platformtree"
                           highlight-current
                           :render-content="renderContentPl"
                           :filter-node-method="filterNode"
                           @node-click="plNodeClick"
                           :expand-on-click-node="false">
                  </el-tree>
                  <el-option v-show="false"
                             :key="countPl.id"
                             :label="countPl.itemName"
                             :value="countPl.itemName"
                             id="pl_confirmSelect">
                  </el-option>
                </el-select>
              </div>
            </el-col>
              <!-- 对应仓库 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>对应仓库</label>
                <!--<el-select v-model="createOnlineParams.stockName"-->
                           <!--placeholder=""-->
                           <!--@change='Modify()'-->
                           <!--@focus="showErrprTipsSelect"-->
                           <!--class="stockId"-->
                           <!--:disabled="createOnlineParams.shopWorkPropertyid === 1"-->
                           <!--:class="{redBorder : validation.hasError('createOnlineParams.stockName')}">-->
                  <!--<el-option v-for="item in stockAr"-->
                             <!--:key="item.id"-->
                             <!--:label="item.stockName"-->
                             <!--:value="item.id">-->
                  <!--</el-option>-->
                <!--</el-select>-->
                  <!--<el-option-->
                    <!--v-for="item in stockAr"-->
                    <!--:key="item.id"-->
                    <!--:label="item.stockName"-->
                    <!--:value="item.id">-->
                    <!--<span style="float: right; font-size: 11px">{{ item.stockName }}</span>-->
                    <!--<span style="float: left; color: #8492a6; font-size: 11px">{{ item.stockCode }}</span>-->
                  <!--</el-option>-->

                <!--<el-select v-model="createOnlineParams.stockName"  filterable :filter-method="filterMethod" @focus="showErrprTipsSelect" @change='Modify()' clearable placeholder="请选择">-->
                <el-select v-model="createOnlineParams.stockId"   filterable :filter-method="filterMethod" @focus="showErrprTipsSelect" @change='Modify()' clearable placeholder="">
                  <el-option
                    v-for="item in stockList"
                    :key="item.id"
                    :label="item.stockName"
                    :value="item.id">
                    <span>{{ item.stockCode }}</span>
                    <span>{{ item.stockName }}</span>
                  </el-option>
                </el-select>
              </div>
            </el-col>
              <!-- 卖家昵称 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>卖家昵称</label>
                <el-input v-model="createOnlineParams.sellerName"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.sellerName')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 卖家手机 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>卖家手机</label>
                <el-input v-model="createOnlineParams.sellerMobile"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.sellerMobile')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 卖家座机 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>卖家座机</label>
                <el-input v-model="createOnlineParams.sellerPhone"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.sellerPhone')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 佣金比例 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>佣金比例</label>
                <el-input v-model="createOnlineParams.commissionRate"
                          placeholder=""
                          @focus="showErrprTips"
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.commissionRate')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 审核状态 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>审核状态</label>
                <el-input v-model="createOnlineParams.status"
                          :disabled="true"
                          placeholder=""
                          @change='Modify()'
                          :class="{redBorder : validation.hasError('createOnlineParams.status')}"
                          class="shopName">
                </el-input>
              </div>
            </el-col>
              <!-- 开店日期 -->
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
                <label>开店日期</label>
                <el-date-picker v-model="createOnlineParams.createShopTime"
                                type="date"
                                class="data-icon-none"
                                @focus="showErrprTips"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createOnlineParams.createShopTime')}"
                                placeholder="">
                </el-date-picker>
              </div>
            </el-col>
          </el-col>
          <!-- 备注 -->
          <el-col :span="24" class="getPadding">
            <div class="bgcolor online-remark">
              <label>备注</label>
              <el-input v-model="createOnlineParams.remark"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('createOnlineParams.remark')}"
                        @change='Modify()'>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!-- 网店授权 -->
    <el-row class="nopadding mt10">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white bb1 licensing">
            <div class="getPadding licensing-font">网店授权</div>
            <span @click="licensingShow = !licensingShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="licensingShow = !licensingShow" :class="{rotate : !licensingShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="licensingShow">
            <el-col :span="24" class="getPadding">
              <div class="bgcolor licensing-input">
                <label>应用钥</label>
                <el-input type="password"
                          placeholder=""
                          v-model="createOnlineAPIParams.authKey"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('createOnlineAPIParams.authKey')}"
                          @change='Modify()'></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="getPadding">
              <div class="bgcolor licensing-input">
                <label>应用密钥</label>
                <el-input type="password"
                          placeholder=""
                          v-model="createOnlineAPIParams.authSecretKey"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('createOnlineAPIParams.authSecretKey')}"
                          @change='Modify()'></el-input>
              </div>

            </el-col>
            <el-col :span="24" class="getPadding">
              <div class="bgcolor licensing-input">
                <label>授权码</label>
                <el-input type="password"
                          placeholder=""
                          @focus="showErrprTips"
                          v-model="createOnlineAPIParams.authCode"
                          :class="{redBorder : validation.hasError('createOnlineAPIParams.authCode')}"
                          @change='Modify()'></el-input>
              </div>

            </el-col>
            <el-col :span="24" class="getPadding">
              <div class="bgcolor licensing-input">
                <label>接口地址</label>
                <el-input type="text"
                          placeholder=""
                          @focus="showErrprTips"
                          v-model="createOnlineAPIParams.authUrl"
                          :class="{redBorder : validation.hasError('createOnlineAPIParams.authUrl')}"
                          @change='Modify()'></el-input>
              </div>
              <button class="online-text" @click="textClick()">接口测试</button>
            </el-col>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 网店地址库 -->
    <el-row class="nopadding mt10">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white bb1 licensing">
            <div class="getPadding address-font">网店地址库</div>
            <button class="online-down" @click="downAddress">下载地址库</button>
            <span @click="addressShow = !addressShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="addressShow = !addressShow" :class="{rotate : !addressShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="addressShow">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="发货地址" width="150">
                <template slot-scope="scope">
                  <el-radio v-model="radio1" label="tableData.isDeleted"></el-radio>
                  <span class="address-span">默认</span>
                </template>
              </el-table-column>
              <el-table-column label="退货地址" width="150">
                <template slot-scope="scope">
                  <el-radio v-model="radio2" label="tableData.isDelivery"></el-radio>
                  <span  class="address-span">默认</span>
                </template>
              </el-table-column>
              <el-table-column label="联系人" prop="contactPerson"></el-table-column>
              <el-table-column label="所在地区" prop="adAreaLevel3"></el-table-column>
              <el-table-column label="街道地址" prop="completeAddress"></el-table-column>
              <el-table-column label="邮政编码" prop="postCode"></el-table-column>
              <el-table-column label="联系电话" prop="mobile"></el-table-column>
              <el-table-column label="手机" prop="phone"></el-table-column>
            </el-table>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 审计信息 -->
    <el-row class="mt10">
      <el-col :span="22" class="auditInformation getPadding">
        <h4 class="h4">审计信息</h4>
        <div>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>创建人</label>
              <el-input v-model="auditInformation.createdBy" placeholder="" disabled="disabled"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>创建时间</label>
              <el-date-picker v-model="auditInformation.createdTime" type="date" placeholder="" disabled="disabled"></el-date-picker>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>修改人</label>
              <el-input v-model="auditInformation.modifiedBy" placeholder="" disabled="disabled"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>修改时间</label>
              <el-date-picker v-model="auditInformation.modifiedTime" type="date" placeholder="" disabled="disabled"></el-date-picker>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>审核人</label>
              <el-input v-model="auditInformation.auditBy" placeholder="" disabled="disabled"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>审核时间</label>
              <el-date-picker v-model="auditInformation.auditTime" type="date" placeholder="" disabled="disabled"></el-date-picker>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>

    <!-- dialog数据变动提示 -->
    <el-dialog :visible.sync="dialogUpdateConfirm" class="dialog_confirm_message" width="25%">
      <template slot="title">
        <span class="dialog_font">提示</span>
      </template>
      <el-col :span="24" style="position: relative;">
        <el-col :span="24">
          <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
          <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
        </el-col>
      </el-col>
      <!--  -->
        <span slot="footer">
            <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
            <button class="dialog_footer_bt dialog_font" @click="dialogUpdateConfirm = false">取 消</button>
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
            <vue-scroll :ops="option">
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
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->
  </div>
</template>
<script>
    import buttonGroup from '../../base/buttonGroup/buttonGroup'
    import dialogBox from '../../base/dialog/dialog'
    import {FILTER_MOTHED} from '../../common/common.js'
    export default{
        name:'onlineDetails',
        data(){
            return{
              value1:'',
              radio1: 'true',
              radio2: 'true',
              defaultOuId:'',// 默认ouid
              treeArray:[],
              // 表格组件说明
              queryParams: {
                 WebshopId:1,
                 SkipCount:1,
                 MaxResultCount:10
              },
              // 网店地址库
              tableData:[{
                 isDeleted:false,
                 isDelivery:false,
                 contactPerson:'',
                 adAreaLevel3:'',
                 completeAddress:'',
                 postCode:'',
                 mobile:'',
                 phone:''
              }],
              ifShow:true,
              licensingShow:true,
              addressShow:true,
              ifModify:false,// 判断信息是否修改过
              search:'',
              detailParentId:'',
              //--- 业务组织树形下拉 -----
              platformSearch:'',
              ouSearch:'',
              stockSearch:'',
              selectOuProps:{
                 children: 'childNodes',
                 label: 'moduleName',
                 id:'id'
              },

              ouItem:{
                 id:'',
                 ouFullname:'',
              },
              plItem:{
                 id:'',
                 itemName:'',
              },
              ouAr:[],// 所属组织下拉框
              ouExpandId:[],// 默认展开第一个树节点
              ouSelectAr:[],// 选择下拉
              expandId:[],
            //--- 平台树形下拉 -----
              selectPlatformProps: {
                 children: "childNodes",
                 label: "itemName",
                 id: 'itemValue'
              },
              platformAr:[],// 平台
              plExpandId:[],//默认展开树节点
              x:0,
              y:0,
              z:0,
              xrows:[],
              yrows:[],
              zrows:[],
              backId:'',
              textSuccess:false,
              //--- 普通下拉 ------------
              propertyAr:[],// 店铺性质下拉框
              stockAr:[],// 对应仓库
              gradeAr:[],// 店铺等级下拉框
              statusAr:[],// 状态下拉框
              ouData:[],// 组织数据列表，开始为空
              updataOuList:[],// 修改的组织信息
              addOuList:[],// 需要添加的组织信息
              update:false,
              activeName: 'contact',// tabs标签页默认激活name
              createOnlineParams:{
                  'shopId':1,
                  'groupId':0,
                  'ouId': 0, // 业务组织
                  'shopCode': "", // 店铺编码
                  'shopName': "", // 店铺名称
                  'stockId': 0, // 所属对应仓库Id
                  'stockName':"",// 所属对应仓库名称
                  'createShopTime': "", // 开店日期
                  'platformId':0, // 平台Id
                  'platformName':"",// 平台
                  'sellerName': "", // 卖家昵称
                  'sellerMobile': "", // 卖家手机
                  'sellerPhone': "", // 卖家座机
                  'commissionRate': 0,// 佣金比例
                  'status':"", // 审核状态
                  'remark': "", // 备注
                  'id':0
              },
              createOnlineAPIParams:{
                  'authKey': "",
                  'authSecretKey': "",
                  'authCode': "",
                  'authUrl': "",
              },
              // 对话框
              dialogSetting:{
                  message:'',// 提示信息
                  dialogName:'',// 对话框名称
                  dialogType:'',// 对话框类型
              },
              // 展开详情后具体错误提示信息
              errorTips:{message:'',detail:''},
              dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
              errorTips:{
                message:'',// 报错信息
                details:'',// 报错详情信息
              },
              dialogVisible:false, // 控制对话框是否可见
              dialogCommand:[],// 底部按钮组控制组
              dialogDelConfirm:false,// 用户删除保存提示信息
              dialogUserConfirm:false,// 信息更改提示控制
              delId:0,
              interfaceText:false, //接口测试
              dialogUpdateConfirm:false,
              //--- 错误提示框 ----------------
              option: {
                  vRail: {
                      width: '5px',
                      pos: 'right',
                      background: "#9093994d",
                  },
                  vBar: {
                      width: '5px',
                      pos: 'right',
                      background: '#9093994d',
                  },
                  hRail: {
                      height: '0',
                  },
              },
              errorMessage:false,
              detail_message_ifShow:false,
              isUpdate:false,
              changeTimes:0,
              filterKey:'',
              response:{
                  details:'',
                  message:'',
                  validationErrors:[],
              },
              buttonGroup:[{
                 text:'返回',
                 class:'bt_back',
                 icon:'icon-fanhui',
                 disabled:false
              },{
                 text:'新增',
                 class:'bt_codeNew',
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
                 disabled:false
              },{
                 text:'保存并新增',
                 class:'bt_saveAdd',
                 icon:'icon-baocun',
                 disabled:false
              },{
                 text:'审核',
                 class:'bt_auxiliary',
                 icon:'icon-shenhe',
                 disabled:true
              },{
                 text:'反审核',
                 class:'bt_saveAdd',
                 disabled:true
              },{
                 text:'下载线上资料',
                 class:'bt_save',
                 icon:'icon-xiazai',
                 disabled:false
              },{
                 text:'打印',
                 class:'bt_print',
                 icon:'icon-print',
                 disabled:false
              }],
              // 审计信息
              auditInformation:{
                createdTime:this.GetDateTime(),// 创建时间
                createdBy:this.$store.state.name,// 创建人
                modifiedTime:this.GetDateTime(),// 修改时间
                modifiedBy:this.$store.state.name,// 修改人
                auditTime:this.GetDateTime(),// 审核人
                auditBy:this.$store.state.name// 审核时间
              },
              A:false,
              B:false,
              C:false,
              selectData:{ //  下拉框的选项数据
                    Status001:[],//启用状态
                    upSupplierClass:[],// 上级供应商分类
              },
           }
        },
        validators: {
            'createOnlineParams.ouId': function (value) {// 业务组织
                return this.Validator.value(value).required();
            },
            'createOnlineParams.shopCode': function (value) {// 店铺代码
                return this.Validator.value(value).required().maxLength(50);
            },
            'createOnlineParams.shopName': function (value) {// 店铺名称
                return this.Validator.value(value).required().maxLength(50);
            },
            'createOnlineParams.platformId': function (value) {// 平台
                return this.Validator.value(value).required();
            },
            'createOnlineParams.sellerName': function (value) {// 卖家昵称
                return this.Validator.value(value);
            },
            'createOnlineParams.sellerMobile': function (value) {// 卖家手机
                return this.Validator.value(value).integer().maxLength(11);
            },
            'createOnlineParams.sellerPhone': function (value) {// 卖家座机
                return this.Validator.value(value).regex(/^0\d{2,3}-\d{7,8}$/,'必须为座机');
            },
            'createOnlineParams.commissionRate': function (value) {// 佣金比例
                return this.Validator.value(value).integer();
            },
            'createOnlineParams.status': function (value) {// 审核状态
                return this.Validator.value(value);
            },
            'createOnlineParams.createShopTime': function (value) {// 开店日期
                return this.Validator.value(value);
            },
            'createOnlineParams.remark':function (value) {// 备注
                return this.Validator.value(value).maxLength(50);
            },
            'createOnlineAPIParams.authKey':function (value) {// 应用钥
                return this.Validator.value(value).maxLength(50);
            },
            'createOnlineAPIParams.authSecretKey':function (value) {// 应用秘钥
                return this.Validator.value(value).maxLength(50);
            },
            'createOnlineAPIParams.authCode':function (value) {// 授权码
                return this.Validator.value(value).maxLength(50);
            },
            'createOnlineAPIParams.authUrl':function (value) {// 接口地址
                return this.Validator.value(value).maxLength(50);
            }
        },

        computed:{
            stockList: function () {//下拉数据自定义搜索过滤
                 return FILTER_MOTHED(this.filterKey,this.stockAr)
            },
            // 业务组织
            countOu () {
                return this.ouItem;
            },
            // 平台
            countPl () {
                return this.plItem;
            },
        },
        components:{
            buttonGroup,
            dialogBox
        },

        created () {
            let self=this;
            //显示默认平台
            self.createOnlineParams.platformName = self.$route.query.itemName;
            self.createOnlineParams.platformId = self.$route.query.itemValue;
            // 加载下拉
            self.loadSelect();
            // 初始化组织类型
            self.getAllOulength();
            // 网店地址库表格初始化
            self.getWebShopAddrBy();
            // 加载组织单元树
            self.loadOuTreeAll();
            self.loadTree();

        },
        mounted () {
            $('.data-icon-none>.el-input__prefix>.el-icon-date').remove('i');
            console.log(this)

        },
        watch:{
            ouSearch(val){
                this.$refs.outree.filter(val)
            },
            platformSearch(val) {
                this.$refs.platformtree.filter(val)
            },
            stockSearch(val) {
                this.$refs.stocktree.filter(val)
            },
            createOnlineParams:{
              handler: function (val, oldVal) {
                  this.changeTimes++
              },
              deep:true
            },
            createOnlineAPIParams:{
              handler: function (val, oldVal) {
                  this.changeTimes++
              },
              deep:true
            },
        },
        methods: {
           //仓库搜索功能
            filterMethod(query){
              this.filterKey=query;
            },
            getDefault(){// 获取默认值
                    let _this=this;
                    if(_this.$route.params.id!="default"){
                        _this.createOnlineParams.platformId=parseInt(_this.$route.params.id);
                    }
            },
            /*  loadTree(){//获取树形控件数据
                let _this=this;
                _this.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:2}).then(
                    rsp=>{
                    console.log(rsp);
                     _this.supplierClasTree=rsp;
                    // console.log(_this.supplierClasTree)
                    // _this.loadIcon();
                    _this.expandId=_this.defauleExpandTree(rsp,'id')
                    _this.loadCheckSelect('classParentId',_this.addData.classParentId)
               })
            },*/
             loadTree(){//获取树形控件数据
                    let _this=this;
                    _this.$axios.gets('/api/services/app/DataDictionary/GetDictItemTreeByDictName?dictCode=OMS_Platform').then(
                        res=>{
                        console.log(res);
                         _this.platformAr=res;
                        // console.log(_this.supplierClasTree)
                        // _this.loadIcon();
                        _this.loadCheckSelect('itemValue',1)
                   })
              },
              loadCheckSelect(selectName,key){//默认选中节点
                    let _this=this;
                    // console.log(selectName,key)
                    _this.$nextTick(function () {
                        // console.log($('.'+selectName+' .el-tree-node__label'))
                    $('.'+selectName+' .el-tree-node__label').each(function(){
                        if($(this).attr('data-id') == key){
                                $(this).click()
                                // console.log(1)
                            }
                        })
                    })
              },
              // 按钮组点击事件
              btnClick:function (btn) {
                  if(btn=="保存") {
                     this.save()
                  }else if(btn=="返回"){
                     if(this.$route.params.id =="default"&&this.changeTimes<=2){
                        this.goList();
                     }else{
                        this.dialogSetting.dialogName='cancelDialog'
                        this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                        this.dialogSetting.dialogType="confirm";
                        this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                        this.dialogVisible=true;
                     }
                  }else if(btn=="保存并新增"){
                        this.saveAdd();
                  }else if(btn=="下载线上资料") {
                        this.downData();
                  }else if(btn=="新增") {
                        this.newAdd();
                  }
              },
              goList() {
                this.$store.state.url='/onlineStore/onlineList/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
              },
              goModify: function(id) {
               this.$store.state.url = "/onlineStore/onlineModify/" + id;
               this.$router.push({ path: this.$store.state.url }); //点击切换路由
              },
              goDetail() {
                //点击新增跳转
                this.$store.state.url = "/onlineStore/onlineDetail/default";
                this.$router.push({ path: this.$store.state.url }); //点击切换路由
              },
              //新增
              newAdd(){
                 $('.tipsWrapper').css({display:'none'});
                 this.$store.state.url='/onlineStore/onlineDetails/default'
                 this.$router.push({path:this.$store.state.url})//点击切换路由
                 let _this = this;
                 _this.buttonGroup[1].disabled=true;
                 _this.buttonGroup[2].disabled=true;
                 _this.buttonGroup[3].disabled=false;
                 _this.buttonGroup[4].disabled=false;
              },
               //接口测试
              textClick:function() {
                  let self = this;
                  self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/APITesting',
                  {
                     authKey:self.createOnlineAPIParams.authKey,
                     authSecretKey:self.createOnlineAPIParams.authSecretKey,
                     authCode:self.createOnlineAPIParams.authCode,
                     authUrl:self.createOnlineAPIParams.authUrl
                  }).then(function(res){
                     self.$message({
                      type: 'success',
                      message: "接口测试联调成功啦!"
                     });
                     self.textSuccess = true

                  }).catch(function(res){
                     self.$message({
                      type: 'warning',
                      message: "接口测试联调失败,请重新输入"
                     });
                     self.textSuccess = false
                  });
              },
              showErrprTips(e){
                  $('.tipsWrapper').css({display:'none'})
              },
              showErrprTipsSelect(e){
                  $('.tipsWrapper').css({display:'none'})
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

              renderContentPl(h, { node, data, store }){// 平台
                  if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                      return (
                          <span class="el-tree-node__label" data-id={data.itemValue}>
                          <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                              {data.itemName}
                          </span>
                      );
                  }else{
                      return (
                          <span class="el-tree-node__label" data-id={data.itemValue}>
                          <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                              {data.itemName}
                          </span>
                      );
                  }
              },
              filterNode(value, data) {
                  console.log(data)
                  console.log(value)
                  if (!value) return true;
                  return data.ouName.indexOf(value) !== -1;
              },
              // 业务组织 树点击
              ouNodeClick:function(data,node,self){
                  let _this = this;
                  _this.ouItem.id = data.id;
                  _this.ouItem.ouFullname = data.ouFullname;
                  _this.$nextTick(function(){
                      $('#ou_confirmSelect').click()
                  });
                  // 点击所属组织，对应仓库跟着变动
                  _this.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:data.id,SkipCounnt:0}).then(function(res){
                      _this.stockAr = res.result.items;

                  },function(res){
                      console.log('err'+res)
                  });
                  $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                      if($(this).attr('date')==data.id){
                          $(this).click()
                      }
                  })
              },

              // 平台 树点击
              plNodeClick:function(data,node,self){
                  let _this = this;
                  if(data.itemValue == 0) {
                      return;
                  }else {
                      _this.createOnlineParams.platformId = data.itemValue;
                      _this.plItem.id = data.itemValue;
                      _this.plItem.itemName = data.itemName;
                      _this.$nextTick(function(){
                          $('#pl_confirmSelect').click()
                      });
                  }
              },
              Cancel:function(){
                let self = this;
                self.createOnlineParams = {
                    'shopId':1,
                    'groupId':1,
                    'ouId':1,
                    'shopCode':'',
                    'shopName':'',
                    'stockId':1,
                    'createShopTime':'',
                    'platformId':0,
                    'sellerName':'',
                    'sellerMobile':'',
                    'sellerPhone':'',
                    'commissionRate':0,
                    'isAudited':'',
                    'remark':'',
                    'id':''
                },
                self.createOnlineAPIParams = {
                    'authKey': "",
                    'authSecretKey': "",
                    'authCode': "",
                    'authUrl': "",
                }
              },
              // 保存
              save:function(){
                let self = this;
                  $('.tipsWrapper').css({display:'block'});
                  self.$validate().then(function(success){
                    console.log(success)
                    if(success){
                        let A = Object.assign(self.createOnlineParams,self.createOnlineAPIParams)
                        console.log(A);
                        $('.tipsWrapper').css({display:'none'})
                            self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/Create',A)
                            .then(function(res){
                                console.log(res);
                                //self.addData.id=res.result.id;
                                self.createOnlineParams.id=res.result.id;
                                self.$store.state.url='/onlineStore/onlineModify/'+res.result.id
                                self.$router.push({path:self.$store.state.url})
                                self.open('保存成功','el-icon-circle-check','successERP');
                                self.validation.reset();
                              //  $('.tipsWrapper').css({display:'none'});

                            }).catch(function(err){
                              console.log(err);
                               self.$message({
                                 type: 'warning',
                                 message: err.error.message
                               });
                            })
                    }
                  }).catch((err)=> {
                    console.log(err)
                  })
              },
              saveAdd:function(){
                let self = this;
                  $('.tipsWrapper').css({display:'block'});
                  self.$validate().then(function (success) {
                  let A = Object.assign(self.createOnlineParams,self.createOnlineAPIParams)
                      // console.log(success);
                      if (success) {
                          $('.tipsWrapper').css({display:'none'});
                          self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/Create',A).then(function(res){
                              self.open('保存成功','el-icon-circle-check','successERP');
                              self.Cancel();
                              self.$store.state.url='/onlineStore/onlineDetails/default'
                              self.$router.push({path:self.$store.state.url})
                              self.buttonGroup[1].disabled=false;
                              self.buttonGroup[2].disabled=true;
                              self.buttonGroup[3].disabled=true;
                              self.buttonGroup[4].disabled=true;
                              self.validation.reset();
                              //$('.tipsWrapper').css({display:'none'});
                              self.isUpdate=true;
                              //   self.firstModify=true;
                          }).catch(function(err){
                               self.$message({
                                 type: 'warning',
                                 message: err.error.message
                               });
                          })
                      }
                  })
            },
              Check:function() {
                  let _this = this;
                  let checkId = this.$route.params.id;
                  console.log(checkId);
                  _this.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/Check', {id:checkId}
                     ).then(function(res) {
                       _this.open('审核成功','el-icon-circle-check','successERP');
                     },function(res){
                       _this.dialogVisible = true;
                       _this.dialogSetting.dialogType = "submit";
                       _this.dialogSetting.dialogName = 'cancelDialog';
                       _this.dialogSetting.message = "信息提报有误";
                       _this.errorTips.message = res.error.message;
                       _this.errorTips.details = '';
                       _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
                  });
              },
              Modify:function(){// 判断主表是否修改过
                  this.isUpdate=true;
                  console.log(this.createOnlineParams)
              },
              isBack(){//是否返回
                  let _this=this;
                  if(_this.isUpdate){
                      _this.dialogUpdateConfirm=true;
                  }else{
                      _this.goList();
                  }
              },


              defauleExpandTree(data,key){
                 /*if(typeof(data[0])!='undefined'
                  && data[0]!=null
                  && typeof(data[0][key])!='undefined'
                  && data[0][key]!=null
                  && data[0][key]!=''){
                      return [data[0][key]]
                  }*/
              },
              loadSelect:function(){
                  let self = this;
                  // 所属组织
                  // api 获取上级业务单元的列表
                  self.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){
                      console.log(res);
                      self.ouSelectAr = res.result;
                  })
                  // api 获取完整树状数据
                  self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                      self.ouAr = res;
                      self.expandId=self.defauleExpandTree(res.result,'id')
                  },function(res){
                      console.log('err'+res)
                  });
                  // 平台
                  self.$axios.gets('/api/services/app/DataDictionary/GetDictItemTreeByDictName?dictCode=OMS_Platform').then(function(res){
                      //self.plItem.itemName = res.itemName;
                      self.platformAr = res;
                      self.loadIcon();
                  },function(res){
                      console.log('err'+res)
                  });
                  // 获取当前默认ouid
                  self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                      self.defaultOuId = res.result.id;
                      self.createOnlineParams.ouId = self.defaultOuId;
                      self.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:self.defaultOuId,SkipCount:0,MaxResultCount:10}).then(function(res){
                          self.stockAr = res.result.items;
                      },function(res){
                          console.log('err'+res)
                      });
                  },function(res){
                    console.log('err'+res)
                  });

              },
              // 初始化组织类型
              getAllOulength(){
                  let _this=this;
                  let x=0;
                  let y=0;
                  _this.$axios.gets('/api/services/app/OuManagement/GetAll',{OuType:1,SkipCount:0,MaxResultCount:1})
                  .then(function(res){
                      x=res.result.totalCount
                  })
                  _this.$axios.gets('/api/services/app/OuManagement/GetAll',{OuType:1,SkipCount:0,MaxResultCount:1})
                  .then(function(res){
                      y=res.result.totalCount
                      // console.log(res)
                  })
                  _this.allOuLength = x + y;
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
              // 加载组织单元树
              loadOuTreeAll(){
                  let _this=this;
                  _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{OuType:[1,2]})
                  .then(function(res){
                      _this.ouTreeDataRight=res.result;
                      _this.defauleExpandTree('','expandId_dialogOu',res.result,'ouId','children')
                  },function(res){
                      console.log('err'+res)
                  })
              },
              /*
              ouNodeClickRight(data){// 右侧树形节点点击
                  let _this=this;
                  _this.addOu=data.ouId;
              }, */
              // 创建时间
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
              dialogClick(parmas){
                if(parmas.dialogButton=="确定"){
                    this.$store.state.url='/onlineStore/onlineList/default'
                    this.$router.push({path:this.$store.state.url})//点击切换路由
                }else if(parmas.dialogButton=="取消"){
                    this.dialogVisible=false;
                }
            },
            // 对话框关闭回调事件
            dialogColse(){
                this.dialogVisible=false;
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
            // 网店地址库表格初始化
            getWebShopAddrBy: function() {
                  let _this=this;
                 if(this.$route.params.id!='default') {
                   _this.detailParentId = parseInt(this.$route.params.id);
                   _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebshopAddressManagement/GetWebShopAddrByWebshopId',{webshopId:_this.detailParentId,Sorting:"",SkipCount:0,MaxResultCount:10})
                   .then(function(res){
                       _this.tableData = res.result.items;
                  },function(res){
                     console.log("err"+res);
                  })
                 }
            },
            ouDialogSure(){//dialog点击确认
                let _this=this;
                _this.dialogOu=false;
                // console.log(_this.$refs.tree.getCheckedKeys())
                _this.ouCheckAll=_this.$refs.tree.getCheckedNodes();
                _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
                // console.log(_this.ouCheckAll)
            },
            sureDoing:function(){
                let self = this;
                self.$store.state.url='/onlineStore/onlineModify/default'
                self.$router.push({path:this.$store.state.url})//点击切换路由
            },
            open:function(tittle,iconClass,itemName) {
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:itemName
                });
            },
            // 点击下载地址库调用
            downAddress:function() {
                let _this=this;
                _this.$message({
                  type: 'warning',
                  message: "新增页不可下载地址库"
                });
                _this.textSuccess = false
            },
            // 下载线上资料
            downData:function() {
                let _this = this;
                _this.$message({
                  type: 'warning',
                  message: "新增页不可下载线上资料"
                });
                _this.textSuccess = false
            },
            handleCityFilter:function(val) {
                console.log(val)
            },
            handleSelectionChange:function(val){// 点击复选框选中的数据
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            handleSelectionChange2:function(val){// 点击复选框选中的数据
                this.multipleSelectionAdd = val;
            },
            handleSelectionChange3:function(val){// 点击复选框选中的数据
                this.multipleSelectionOu = val;
            }
          }
    }
</script>
<style scoped>
    .bgcolor {
      width:100%;
    }
    .block{
        display: none;
    }
    .bg-white{
        background: white;
    }
    .shop-detail{
        font-family: 'microsoft yahei';
    }
    .bb1{
        border-bottom: 1px solid #cccccc;
    }
    .pb5{
        padding-bottom: 5px;
    }
    .pt5{
        padding-top: 5px;
    }
    /*收起*/
    .online-detail .upBt{
        font-size: 12px;
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .online-detail .upBt i{
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        color:#cacaca;
        margin-left: 5px;
    }
    .online-detail .inline-block-need{
        display: inline-block;
    }
    .online-detail .upBt i.rotate{
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
    }

    .online-detail  .errorTips{
        margin-bottom: 10px;
    }
    .online-detail .el-row:first-child{
        padding:5px 0;
    }
    .online-detail .el-row{
        padding:15px 0;
        background-color: #fff;
    }
    .online-detail .el-row:last-child{
        border-bottom:none;
    }

    .online-detail .tabZoo{
        overflow: hidden;
        background-color: #fff;
    }
    .online-detail  .getPadding,.tabZoo .el-tabs__nav-scroll{
        padding: 0 10px;
    }
    .online-detail .tabZoo .auditInformation{
        margin-top: 15px;
    }

    .online-detail .tabZoo .erp_bt:first-child{
        margin-left: 0;
    }
    .online-detail .nopadding{
        padding-top: 0;
    }
    .online-detaill .el-table th {
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        text-align: left;
        padding: 5px 0;
        text-align: center;
        background-color: #ececec;
    }
    .online-detail .el-table td{
        padding: 3px 0;
    }
    .online-detail .el-table__body{
        text-align: center;
    }
    .online-detail .el-table .cell{
        padding-left:0px;
        padding-right:0px;
    }
    .mb10{
        margin-bottom: 10px;
    }
    .online-detail .el-input__inner{
        height:35px !important;
        border:1px solid white;
        /* border-color:white !important; */
    }
    .online-detail .all-table .el-input__inner{
        height:35px !important;
        text-align: center !important;
        border:none !important;
    }
    .online-detail .bgw .el-input__inner{
        background-color:white;
        text-align: center;
    }
    .online-detail .bgp .el-input__inner{
        background-color:#FAFAFA;
        text-align: center;
    }
    .online-detail .el-select-dropdown__item{
        text-align: center;
    }
    .online-detail .area{
        width:510px;
        margin-right:0px;
    }
    .el-select.areaDrop,.el-input.areaEntry{
        width: 136px;
    }
    .areaDrop input,.areaEntry input{
        border: none!important;
    }
    .areaDrop .el-input__inner,.areaEntry .el-input__inner{
        height: 32px!important;
    }
    .online-remark{
      width: 100% !important;
    }
    .licensing{
      height: 35px;
      line-height:33px;
      margin-bottom:8px;
    }
    .licensing .licensing-font{
      font-size: 15px;
      font-weight: 500;
      font-color:#000;
      border-bottom:2px solid #3cc;
      width:60px;
      margin-left:10px;
      display:inline-block;
    }
    .licensing .upBt{
     margin-top: 0px;
    }
    .licensing-input {
     width: 65% !important;
    }
    .online-text {
     background-color: #00c9c9;
     color: white;
     border:none;
     width:90px;
     height:35px;
     margin-left:10px;
     cursor:pointer
    }
    .address-font {
     font-size: 15px;
     font-weight: 500;
     font-color:#000;
     border-bottom:2px solid #3cc;
     width:75px;
     margin-left:10px;
     display:inline-block;
    }
    .online-down {
     background-color: #00c9c9;
     color: white;
     border:none;
     width:90px;
     height:33px;
     margin-left:10px;
     cursor:pointer
    }
    .address-table {
     height:60px;
    }
    .address-span {
     margin-left:5px;
    }
</style>