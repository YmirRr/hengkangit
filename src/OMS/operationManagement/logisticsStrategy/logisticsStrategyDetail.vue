<template>
  <div class="online-detail">
    <!-- button组 -->
    <el-row :span="24" class="fixed bg-white bb1">
      <el-col >
          <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
      </el-col>
    </el-row>
    <!-- 物流策略基础信息 -->
    <el-row class="bg-white pt10">
      <el-col :span="24" class="getPadding">
        <!-- 错误提示 -->
        <div class="tipsWrapper">
          <div class="errorTips">
            <p class="msgDetail">
                  <span :class="{block : !validation.hasError('tactic.tacticCode')}">
                    代码{{ validation.firstError('tactic.tacticCode') }},
                  </span>

                  <span :class="{block : !validation.hasError('tactic.tacticName')}">
                    名称{{ validation.firstError('tactic.tacticName') }},
                  </span>

                  <span :class="{block : !validation.hasError('tactic.status')}">
                    状态{{ validation.firstError('tactic.status') }},
                  </span>

                  <span :class="{block : !validation.hasError('tactic.remark')}">
                    备注{{ validation.firstError('tactic.remark') }},
                  </span>
                  <span :class="{block : !validation.hasError('tactic.remark')}">
                    订单金额结算{{ validation.firstError('input5') }},
                  </span>
            </p>
          </div>
        </div>
        <!-- 代码 -->
        <el-row class="padding-remove">
          <el-col :span="12" class="getPadding">
            <div class="bgcolor online-remark">
              <label><small>*</small>代码</label>
              <el-input v-model="tactic.tacticCode"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('tactic.tacticCode')}"
                        @change='Modify()'>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 名称 -->
        <el-row class="padding-remove">
          <el-col :span="12" class="getPadding">
            <div class="bgcolor online-remark">
              <label><small>*</small>名称</label>
              <el-input v-model="tactic.tacticName"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('tactic.tacticName')}"
                        @change='Modify()'>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 状态 -->
        <el-row class="padding-remove">
          <el-col :span="12" class="getPadding">
            <div class="bgcolor online-remark status-logistics">
              <el-col :span="2" class="status-font">
                <label>状态</label>
              </el-col>
              <el-col :span="15" class="status-input">
                <el-select clearable filterable
                           v-model="tactic.status"
                           placeholder=""
                           :class="{redBorder : validation.hasError('tactic.status')}"
                           class="input-entry">
                  <el-option v-for="item in selectData.Status001"
                             :key="item.itemValue"
                             :label="item.itemName"
                             :value="item.itemValue">
                  </el-option>
                </el-select>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row class="padding-remove">
          <el-col :span="12" class="getPadding">
            <div class="bgcolor online-remark">
              <label>备注</label>
              <el-input v-model="tactic.remark"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('tactic.remark')}"
                        @change='Modify()'>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 适用店铺 -->
    <el-row class="nopadding mt10 strategy-ml">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white licensing">
            <span class="left-blue"></span>
            <div class="getPadding licensing-font">适用店铺</div>
            <button class="bt_add btn-select"  @click="editDialog()">
              <div class="btImg">
                <img src="../../../../static/image/common/bt_add.png">
              </div>
              <span class="btDetail select-font">选取</span>
            </button>
            <span @click="applicableShow = !applicableShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                                @click="applicableShow = !applicableShow"
                                                                                                :class="{rotate : !applicableShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="applicableShow">
            <el-col :span="24">
              <div>
                <div class="bgcolor bgLongWidth" style="overflow: visible;">
                  <label>&nbsp;</label>
                  <div class="addZoo">
                    <a class="addRole" :key="x.id"  v-for="x in checkedTable">{{x.shopName}}<i @click="check_push_noCheckThis(x)" class="el-icon-error"></i></a>
                  </div>
                </div>
              </div>
            </el-col>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 支持时间选择 -->
    <el-row class="nopadding mt10 strategy-ml">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white licensing">
            <span class="left-blue"></span>
            <div class="getPadding address-font">支持时间选择</div>
            <span @click="supportTimeShow = !supportTimeShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                                  @click="supportTimeShow = !supportTimeShow"
                                                                                                  :class="{rotate : !supportTimeShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="supportTimeShow">
            <el-row :span="24" class="padding-remove"  v-for="(data,index) in timeArray" :key="index">
              <el-col :span="10">
                <el-date-picker
                  class="dateRange b1 time-change w95"
                  disabledDate="false"
                  v-model="data.time"
                  type="datetimerange"
                  @change="getChangeTime(index,data.time)"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="5" >
                <div class="bgcolor checked-logistics">
                  <el-select v-model="data.back.logisticsName"
                             placeholder="选择物流"
                             @change='Modify()'
                             class="contactWorkPropertyId"
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsTimeruleAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                  <i @click="del_Timerule_This(index)" class="el-icon-error middle-icon"></i>
                </div>
              </el-col>
            </el-row>
            <el-row :span="24" class="padding-remove">
              <el-col :span="10">
                <el-date-picker
                  v-model="value5"
                  class="dateRange b1 time-change w95"
                  type="datetimerange"
                  @change="getBillingTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="5">
                <div class="bgcolor checked-logistics">
                  <el-select v-model="createTacticTimeruleParams.logisticsName"
                             placeholder="选择物流"
                             @change="Modify()"
                             class="contactWorkPropertyId"
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsTimeruleAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :span="5" class="mb10">
              <div  @click="addTime">
                <span icon="el-icon-circle-plus-outline" class="new-add"></span>
                <span class="add-font">新增时间段</span>
              </div>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 订单金额结算 -->
    <el-row class="nopadding mt10 strategy-ml">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white licensing">
            <span class="left-blue"></span>
            <div class="getPadding address-font">订单金额结算</div>
            <span @click="orderShow = !orderShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                      @click="orderShow = !orderShow"
                                                                                      :class="{rotate : !orderShow}"></i></span>
          </el-col>
        </el-row>

        <el-collapse-transition>
          <div v-show="orderShow">
            <el-row :span="24" class="monery-search padding-remove" v-for="(content,index) in tacticOrderruleList" :key="index">
              <el-col :span="18" class="search-input">
                <el-input placeholder="请输入内容" v-model="content.amount" class="input-with-select" type="number" min="0" @change="handleAmountInput(content.amount,index)">
                  <el-select v-model="content.logicSignal" slot="prepend" class="show-option">
                    <el-option label=">" value=">"></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                  </el-select>
                </el-input>
              </el-col>
              <el-col :span="5">
                <div class="bgcolor checked-logistics">
                  <el-select v-model="content.logisticsName"
                             placeholder="选择物流"
                             @change='Modify()'
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsOrderrulesAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                  <i @click="del_Orderrule_This(index)" class="el-icon-error middle-icon"></i>
                </div>
              </el-col>
            </el-row>
            <el-row :span="24" class="monery-search padding-remove">
              <el-col :span="18" class="search-input">
                <el-input placeholder="请输入内容"
                          v-model.number="input5"
                          class="input-with-select"
                          :class="{redBorder : validation.hasError('input5')}"
                          type="number"
                          min="0"
                >
                  <el-select v-model="select" slot="prepend" class="show-option">
                    <el-option label=">" value=">"></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                  </el-select>
                </el-input>
              </el-col>
              <el-col :span="5">
                <div class="bgcolor checked-logistics">
                  <el-select v-model="createTacticOrderruleParams.logisticsName"
                             placeholder="选择物流"
                             @change='Modify()'
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsOrderrulesAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :span="5"  class="mb10">
              <div @click="addMoney">
                <span icon="el-icon-circle-plus-outline" class="new-add"></span>
                <span class="add-font">新增订单金额结算</span>
              </div>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 收货地区 -->
    <el-row class="nopadding mt10 strategy-ml">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white licensing area-style">
            <span class="left-blue"></span>
            <div class="getPadding address-font">收货地区</div>
            <span @click="areaShow = !areaShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                    @click="areaShow = !areaShow"
                                                                                    :class="{rotate : !areaShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="areaShow">
            <el-row :span="24" class="mt10 areaLogistics-relative" :class="'b'+ListIndex" v-for="(AreaLogistice,ListIndex) in tacticArearuleArrShow" :key="ListIndex">
              <el-col :span="18" class="search-input zone-input-show" :class="'a'+ListIndex">
                  <div class="bgcolor bgLongWidth zone-height" :class="{active:ShowActive}">
                    <label>&nbsp;</label>
                    <div class="addZoo">
                      <a class="addRole"  v-for="(x,index) in AreaLogistice.tacticArearuleShow" :key="index">{{x.name}}<i @click="delThis(ListIndex,index)" class="el-icon-error"></i></a>
                    </div>
                  </div>
                  <span class="zone-btn" @click="CheckArea(ListIndex)" >…</span>
              </el-col>
              <el-col :span="5" class="zone-right">
                <div class="bgcolor">
                  <el-select v-model="AreaLogistice.logisticsName"
                             placeholder="选择物流"
                             @change='Modify()'
                             class="contactWorkPropertyId zone-logistics"
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsArearuleAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                  <i @click="del_Arearule_This(ListIndex)" class="el-icon-error middle-icon"></i>
                </div>
              </el-col>
            </el-row>

            <el-row :span="24" class="mt10 areaAdd-input">
              <el-col :span="18" class="search-input zone-input">
                <div class="bgcolor bgLongWidth zone-height" :class="{active:isActive}" >
                  <label>&nbsp;</label>
                  <div class="addZoo">
                    <a class="addRole"  v-for="(y,CurrentIndex) in TacticRegion" :key="CurrentIndex">{{y.name}}<i @click="delCurrentThis(CurrentIndex)" class="el-icon-error"></i></a>
                  </div>
                </div>
                <span class="zone-btn" @click="selectZone">…</span>
              </el-col>
              <el-col :span="5" class="areaAdd-input-right">
                <div class="bgcolor">
                  <el-select v-model="createTacticArearuleListParams.logisticsName"
                             placeholder="选择物流"
                             @change='Modify()'
                             class="contactWorkPropertyId"
                             @focus="showErrprTipsSelect">
                    <el-option v-for="item in logisticsArearuleAr"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.contactName"></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :span="5"  class="mb10">
              <div @click="addZone">
                <span icon="el-icon-circle-plus-outline" class="new-add"></span>
                <span class="add-font">新增收货地区</span>
              </div>
            </el-row>
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
              <el-date-picker v-model="auditInformation.createdTime" type="date" placeholder=""
                              disabled="disabled"></el-date-picker>
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
              <el-date-picker v-model="auditInformation.modifiedTime" type="date" placeholder=""
                              disabled="disabled"></el-date-picker>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>审核人</label>
              <el-input v-model="auditInformation.modifiedBy" placeholder="" disabled="disabled"></el-input>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <div class="bgcolor">
              <label>审核时间</label>
              <el-date-picker v-model="auditInformation.modifiedTime" type="date" placeholder=""
                              disabled="disabled"></el-date-picker>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!-- 收货地区弹框 -->
    <el-dialog :visible.sync="dialogShowCheckArea" class="dialogShowCheckArea dialog-width">
      <template slot="title">
        <span>选择区域</span>
      </template>
      <el-row :span="24" class="margin-remove-top">
        <el-row :span="24"  class="zone-row">
          <el-col :span='8' class="tree-container">
            <el-tree
                :highlight-current="true"
                show-checkbox
                :data="Region"
                :props="defaultProps"
                node-key="id"
                ref="tree"
                @check-change="handleCheckChange"
            >
            </el-tree>
          </el-col>
        </el-row>
      </el-row>
      <!--确定/取消按钮 -->
      <span slot="footer" class="dialog-footer">
            <el-button @click="cancelShowCheckAreaDialog">确定</el-button>
            <el-button @click="cancelShowCheckAreaDialog">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogUserDefined" class="dialogUserDefined dialog-width">
      <template slot="title">
        <span>选择区域</span>
      </template>
      <el-row :span="24" class="margin-remove-top">
        <el-row :span="24" class="zone-row">
          <el-col :span='8' class="tree-container">
            <el-tree
              :highlight-current="true"
              show-checkbox
              :data="Region"
              :props="defaultProps"
              node-key="id"
              ref="tree"
            >
            </el-tree>
          </el-col>
        </el-row>
      </el-row>
      <!--确定/取消按钮 -->
      <span slot="footer" class="dialog-footer">
            <el-button  @click="CheckedNodes()">确定</el-button>
            <el-button @click="cancelDialog">取 消</el-button>
      </span>
    </el-dialog>
    <!-- dialog数据变动提示 -->
    <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
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
            <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
        </span>
    </el-dialog>
    <!-- 关联角色 -->
    <el-dialog :visible.sync="dialogTableVisible" title="选取店铺" class="transfer_dialog">
      <el-col :span="24">
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
              <el-table-column prop="shopId" label="店铺编码"></el-table-column>
              <el-table-column prop="shopName" label="店铺名称"></el-table-column>
              <el-table-column prop="platformName" label="平台"></el-table-column>
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
        <el-col :span="2" class="transfer_btns">
          <el-col :span="24" class="transfer_btn_wrapper">
            <el-button class="el_transfer" :disabled="is_nocheked" @click="noCheck_push_check" type="primary" icon="el-icon-arrow-right" round></el-button>
            <el-button class="el_transfer" :disabled="is_cheked" @click="check_push_noCheck" type="primary" icon="el-icon-arrow-left" round></el-button>
          </el-col>
        </el-col>
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
              <el-table-column prop="shopId" label="店铺编码"></el-table-column>
              <el-table-column prop="shopName" label="店铺名称"></el-table-column>
              <el-table-column prop="platformName" label="平台"></el-table-column>
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
      </el-col>
        <span slot="footer">
            <button class="transfer_footer_btn transfer_confirm" @click="dialogTableVisible = false">确 认</button>
            <button class="transfer_footer_btn" @click="cancelPush">取 消</button>
        </span>
    </el-dialog>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible"
               :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->
  </div>
</template>
<script>
    import buttonGroup from '../../../base/buttonGroup/buttonGroup'
    import dialogBox from '../../../base/dialog/dialog'
    import Tree from '../../../base/tree/tree'
    export default{
        data(){
            return{
//---------------------- 策略基础信息 ------------------------------
                "tactic":{
                    'tacticCode':'', // 策略编码
                    'tacticName':'', // 策略名称
                    'status':0, // 启用状态
                    'remark':'' // 备注
                },
//---------------------- 选取适用店铺 ------------------------------
                createTacticShopapplyParams:{
                    'platformId':'', // 平台Id
                    'shopId':'' // 适用店铺Id
                },
                isActive:false,
                ShowActive:false,
                tacticShopapplyList:[],
                //---------选取店铺-------------
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
                searchTableLeft:'',//搜索
                searchTableRight:'',//搜索

                errorTips:{message:'',detail:''},
                dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
                dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
                firstModify:false,
                secondModify:false,
                ifModify:false,// 判断信息是否修改过

                leftDownBtn:true,//分页按钮是否显示
                leftAddBtn:true,//分页按钮是否显示
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
//---------------------- 新增时间段 ------------------------------
                createTacticTimeruleParams:{
                    'startTime':'', // 开始时间
                    'endTime':'',
                    'logisticsName':'',
                    'logisticsId':0
                },

                value5: [],
                timeArray:[],
                tacticTimeruleList:[],
                logisticsTimeruleAr:[],
                timeSelection:[],

//---------------------- 新增订单金额 ------------------------------
                input5: '',
                select: '',
                selectData: {//条件查询下拉数据
                    Status001:[],//宝贝状态
                },
                createTacticOrderruleParams:{
                    'logicSignal':'', // 对应的运算符
                    'amount':'', // 规则金额
                    'logisticsName':'', //对应物流名称
                    'logisticsId':0 // 对应的物流公司Id
                },
                logisticsOrderrulesAr:[],
                tacticOrderruleList:[],
                selectList:[],
                input5List:[],
//---------------------- 新增收货地区 ------------------------------
                defaultProps: {
                  children: "childItems",
                  label: "areaName",
                  id: 'id'
                },
                ResProvice:[],
                checkAll: false,
                createTacticArearuleArrParams:{
                    'ruleId':'',// 地址规则对象
                },

                //地区
                createTacticregionParams:{
                    'region':''
                },
                createTacticArearuleListParams:{
                    "logisticsId":0,
                    "logisticsName":''
                },
                TacticRegion:[],
                checkedCities:[],
                Region:[],
                // 省市
                logisticsArearuleAr:[],
                tacticArearuleArr:[],
                tacticArearuleList:[],
                tacticAreaShow:[],
                tacticArearuleArrShow:[],
                tacticArearuleShow:[],
                /*"tacticArearuleArr": [
                 {
                 "tacticArearuleList": [
                 {
                 "adAreaLevel1": "",// 省名
                 "adAreaLevel2": "",// 市名
                 "logisticsId": 0,// 对应物流公司Id
                 'logisticsName':'', //对应物流名称
                 }
                 ],
                 "ruleId": 0
                 }
                 ],*/
                checkZoneList:[],//区域选中
                checkProviceList:[],//市选中
                ouCheckAll:[],//分配组织数据
                activeName2: 'first',
                radio: 'false',

                dialogUserDefined: false, //下载店铺宝贝dialog
                dialogShowCheckArea:false,
                defaultOuId:'',// 默认ouid
                treeArray:[],
                // 表格组件说明
                queryParams: {
                    WebshopId:1,
                    SkipCount:1,
                    MaxResultCount:10
                },
                ifShow:true,
                applicableShow:true,
                supportTimeShow:true,
                orderShow:true,
                areaShow:true,
                search:'',
                detailParentId:'',
                //--- 业务组织树形下拉 -----
                platformSearch:'',
                ouSearch:'',
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
                startTime: '',
                endTime: '',
                expandId:[],
                checked2: false,
                checked3: false,
                checked4: false,
                checked5: false,
                checked6: false,
                checked7: false,
                checked8: false,

                //--- 平台树形下拉 -----
                selectPlatformProps: {
                    children: "childNodes",
                    label: "itemName",
                    id: 'itemValue'
                },
                platformAr:[],// 平台
                x:0,
                y:0,
                z:0,
                xrows:[],
                yrows:[],
                zrows:[],
                backId:'',
                textSuccess:false,
                typeAr:[],//客户类型下拉框
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
                // 对话框
                dialogSetting:{
                    message:'',// 提示信息
                    dialogName:'',// 对话框名称
                    dialogType:'',// 对话框类型
                },
                // 展开详情后具体错误提示信息
                errorTips:{
                    message:'',// 报错信息
                    details:'',// 报错详情信息
                },
                dialogVisible:false, // 控制对话框是否可见
                dialogCommand:[],// 底部按钮组控制组
                dialogDelConfirm:false,// 用户删除保存提示信息
                dialogUserConfirm:false,// 信息更改提示控制
                changeTimes:0,
                delId:0,
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
                    text:'取消',
                    class:'bt_auxiliary',
                    icon:'icon-shenhe',
                    disabled:false
                }],
                // 审计信息
                auditInformation:{
                    createdTime:this.GetDateTime(),// 创建时间
                    createdBy:this.$store.state.name,// 创建人
                    modifiedTime:this.GetDateTime(),// 修改时间
                    modifiedBy:this.$store.state.name// 修改人
                },
                A:false,
                B:false,
                C:false,
            }
        },
        validators: {
            'tactic.tacticCode': function (value) {// 代码
                return this.Validator.value(value).required().maxLength(50);
            },
            'tactic.tacticName': function (value) {// 名称
                return this.Validator.value(value).required().maxLength(50);
            },
            'tactic.status': function (value) {// 状态
                return this.Validator.value(value).required().maxLength(50);
            },
            'tactic.remark': function (value) {// 备注
                return this.Validator.value(value).maxLength(50);
            },
            'input5': function (value) {// 订单金额结算
                return this.Validator.value(value).maxLength(7);
            }
        },
        computed:{
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
            dialogBox,
        },
        created () {
            let self=this;
            // 加载地区列表
            self.loadRegion();
            // 加载下拉
            self.loadSelect();

            // 初始化组织类型
            self.getAllOulength();
            //self.InitStatus();
            self.getSelectData();
            // 适用店铺表格
            self.getAllRoleData();
            //$('.a0')
             //console.log($('.a0'));

        },
        updated(){
            let _this=this;
             // 收货地区高度
             // let InputHeight = $('.b0 .a0').height()
             // $(".b0 .zone-right").height(InputHeight);
             //$('.areaLogistics-relative').length
             console.log(_this.tacticArearuleArrShow.length);
             for(let i=0;i<_this.tacticArearuleArrShow.length;i++){
                let InputHeight = $('.b'+i+'>.a'+i).height()
                $(".b"+i+">.zone-right").height(InputHeight);
             }
             let AreaHeight = $('.areaAdd-input .search-input').height();
             $(".areaAdd-input-right").height(AreaHeight);
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
                    this.changeTimes++;
                    console.log(this.changeTimes)
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
            tactic:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    console.log(this.changeTimes)
                },
                deep:true
            },
            tacticShopapplyList:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    console.log(this.changeTimes)
                },
                deep:true
            },
            tacticArearuleArr:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    console.log(this.changeTimes)
                },
                deep:true
            },
            tacticOrderruleList:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    console.log(this.changeTimes)
                },
                deep:true
            },
            tacticTimeruleList:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    console.log(this.changeTimes)
                },
                deep:true
            },

        },

        methods: {
             handleAmountInput(name,index){
                  let _this = this;
                  _this.tacticOrderruleList[index].amount= String(name).match(/\d+(\.\d{0,2})?/) ? String(name).match(/\d+(\.\d{0,2})?/)[0] : '';
                  if(_this.tacticOrderruleList[index].amount.indexOf(".")< 0 && _this.tacticOrderruleList[index].amount !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                       _this.tacticOrderruleList[index].amount= parseFloat(_this.tacticOrderruleList[index].amount);
                  }
             },
            // 订单金额 删除当条
            del_Orderrule_This(index) {
                let _this = this;
                _this.tacticOrderruleList.splice(index,1);
            },


            // 支持时间选择 删除当条
            del_Timerule_This(index) {
                let _this = this;
                _this.timeArray.splice(index,1);
                _this.tacticTimeruleList.splice(index,1)
            },
            //选择地区 删除当条
            del_Arearule_This(ListIndex){
                let _this = this;
                _this.tacticArearuleArrShow.splice(ListIndex,1)
                _this.tacticArearuleArr.splice(ListIndex,1)
            },
            //删除地区标签
            delThis(ListIndex,index){
                let _this = this;
                _this.tacticArearuleArrShow[ListIndex].tacticArearuleShow.splice(index,1);
                _this.tacticArearuleArr[ListIndex].tacticArearuleList.splice(index+1,1);
            },

            selectGet(vId){//这个vId也就是value值
                let _this = this;
                let obj = {};
                obj = _this.options.find((item)=>{//这里的userList就是上面遍历的数据源
                            return item.id === vId;//筛选出匹配数据
            });
                console.log(obj.label);//我这边的name就是对应label的
            },


            /* handleCheckedCitiesChange(event,val,value) {
             let _this = this;
             //  console.log($(event));
             console.log(val);

             _this.checkedCities.push(val);
             console.log(event);
             let obj =  {
             "adAreaLevel1": val,// 省名
             "adAreaLevel2": value,// 市名
             "logisticsId": 0,// 对应物流公司Id
             'logisticsName':'', //对应物流名称
             }
             _this.tacticArearuleArr[0].tacticArearuleList.push(obj);

             },*/


            // 状态下拉
            getSelectData() {
                let _this = this;
                _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "Status001"
                }).then(function(res) {
                    // 启用状态
                    _this.selectData.Status001 = res.result;
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 按钮组点击事件
            btnClick:function (btn) {
                if(btn=="保存") {
                    this.save()
                }else if(btn=="返回"){
                     console.log(this.changeTimes)
                     if(this.$route.params.id=="default"&&this.changeTimes<=1){//新增操作
                        this.$store.state.url='/logisticsStrategy/logisticsStrategyList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                     }else{
                         this.dialogSetting.dialogName='backDialog'
                         this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                         this.dialogSetting.dialogType="confirm";
                         this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                         this.dialogVisible=true;
                     }
                }else if(btn=="保存并新增"){
                    this.saveAdd();
                }else if(btn=="新增") {
                    this.$store.state.url='/logisticsStrategy/logisticsStrategyDetail/default'
                    this.$router.push({path:this.$store.state.url})//点击切换路由
                }else if(btn=="删除") {
                      this.dialogSetting.dialogName='delDialog'
                      this.dialogSetting.message="确定删除？";
                      this.dialogSetting.dialogType="confirm";
                      this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                      this.dialogVisible=true;
                }else if(btn=="取消") {
                     if(this.$route.params.id!=="default"&&this.changeTimes<=1){//新增操作
                        this.$store.state.url='/logisticsStrategy/logisticsStrategyDetail/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                     }else{
                         this.dialogSetting.dialogName='backDialog'
                         this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                         this.dialogSetting.dialogType="confirm";
                         this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                         this.dialogVisible=true;
                     }
                }
            },
            showErrprTips(e){
                $('.tipsWrapper').css({display:'none'})
            },
            showErrprTipsSelect(e){
                $('.tipsWrapper').css({display:'none'})
            },
            //filterNode(value, data) {
            //    if (!value) return true;
              //  return data.ouName.indexOf(value) !== -1;
            //},
            //--- 树通用 ----------------------------------------------
            saveAdd:function(){
                let self = this;
                $('.tipsWrapper').css({display:'block'});
                self.$validate().then(function (success) {
                    let obj = {
                        tactic : self.tactic,
                        tacticShopapplyList : self.tacticShopapplyList,
                        tacticTimeruleList : self.tacticTimeruleList,
                        tacticOrderruleList : self.tacticOrderruleList,
                        tacticArearuleArr : self.tacticArearuleArr
                    };
                    if (success) {
                        $('.tipsWrapper').css({display:'none'});
                        self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsLogisticsTacticManagement/CreateOmsTactic',obj).then(function(res){
                            //  self.addData=res.result;
                            self.open('保存成功','el-icon-circle-check','successERP');
                            self.$store.state.url='/logisticsStrategy/logisticsStrategyDetail/default'
                            self.$router.push({path:self.$store.state.url})
                            self.clearData();
                            self.validation.reset();
                            self.update=false;
                        },function(res){
                            // self.open('保存失败','el-icon-error','faildERP');
                            self.$message({
                                type: 'warning',
                                message: res.error.message
                            });
                        })
                    }
                });
            },
            Modify:function(){// 判断主表是否修改过
                let self = this;
                self.ifModify = true;
            },
            provinceShow:function(event) {
                console.log(event)



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
            cancelDialog(){
                let self = this;
                self.dialogUserDefined=false;
            },
            cancelShowCheckAreaDialog(){
                let self = this;
                // 关闭蒙版
                self.dialogShowCheckArea=false;
            },
            dialogClick(parmas){//对话框按钮点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="delDialog"){
                       this.del_ThisData()
                    }else{
                       this.$store.state.url='/logisticsStrategy/logisticsStrategyList/default'
                       this.$router.push({path:this.$store.state.url})//点击切换路由
                    }
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
            //区域点击
            checkedRule(name) {
                console.log(name);

            },


           // ouDialogSure(){//dialog点击确认
             //   let _this=this;
            //    _this.dialogOu=false;
                // console.log(_this.$refs.tree.getCheckedKeys())
           //     _this.ouCheckAll=_this.$refs.tree.getCheckedNodes();
           //     _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
                // console.log(_this.ouCheckAll)
          //  },
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
            editDialog(){
                let _this=this;
                if(!_this.isEdit){
                    _this.dialogTableVisible=true;
                }else{
                    return false;
                }
            },

            // 删除门店详情
            del_ThisData:function() {
                let _this = this;
                let detailParentId = parseInt(this.$route.params.id);
                if(this.$route.params.id!='default') {
                    _this.$axios.deletes('http://192.168.100.107:8099/api/services/app/OmsLogisticsTacticManagement/DeleteTacticById',{Id:detailParentId}).then(function(res) {
                        console.log(res);
                        _this.clearData();
                        _this.$store.state.url='/logisticsStrategy/logisticsStrategyList/default'
                        _this.$router.push({path:_this.$store.state.url})//点击切换路由

                    }),function(res) {
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message="删除失败";
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;
                    }
                }
            },

            // 获取物流下拉框
            loadSelect:function(){
                let self = this;
                self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                    self.defaultOuId = res.result.id;
                    self.createTacticTimeruleParams.logisticsId = self.defaultOuId;
                    self.$axios.gets('/api/services/app/ContactManagement/GetListByConditionSupplier',{OuId:self.defaultOuId,SkipCount:0,MaxResultCount:10}).then(function(res){
                        self.logisticsTimeruleAr = res.result.items;
                        self.logisticsArearuleAr = res.result.items;
                        self.logisticsOrderrulesAr = res.result.items;
                    },function(res){
                        console.log('err'+res)
                    });
                },function(res){
                    console.log('err'+res)
                });
            },

            // 选取店铺
            searchLeftTable(){
                let _this=this;
                // checkTable
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft);
                $.each(_this.checkedTable,function(index,val){
                    let str = val.shopName;
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
            searchRightTable(){
                let _this=this;
                // nocheckTable
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableRight);
                $.each(_this.nocheckedTable,function(index,val){
                    let str=val.shopName;
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
            noCheck_push_check(){//从左往右添加数据
                let _this=this;
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.showChecked=_this.pagination(_this.selection_nochecked,[],_this.oneItemLeft,_this.pageLeft,'left')
                _this.showNoChecked=_this.pagination([],_this.selection_nochecked,_this.oneItemRight,_this.pageRight,'right')

                // 获取到选中的店铺 传给后台
                console.log(_this.showChecked);
                let arr=[];
                for (let i=0;i<_this.showChecked.length; i++) {
                    let obj = {
                        'tacticId':0,
                        'platformId':0,
                        'platformName':'',
                        'shopId':0,
                        'shopName':'',
                        'id':0
                    };
                    obj = _this.createTacticShopapplyParams = _this.showChecked[i];
                    arr.push(obj);
                };
                _this.tacticShopapplyList = arr;
                console.log(_this.tacticShopapplyList)


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
            checkedSelect(val) {//dialogRole选中已选角色
                console.log(val);
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
            cancelPush(){//取消
                let _this=this;
                _this.dialogTableVisible=false;
                _this.getAllRoleData();
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
            // 获取适用店铺数据
            getAllRoleData(){
                let _this=this;
                _this.checkedTable=[]
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                // 获取所有适用店铺条数
                _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch',{SkipCount:0,MaxResultCount:1})//获取所有角色
                        .then(function(re){
                            let webShopAll=re.result.totalCount;
                            if(webShopAll>0){
                                _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch',{SkipCount:0,MaxResultCount:webShopAll})//获取所有角色
                                        .then(function(res){
                                            // nocheckedTalbe 可选适用店铺
                                            _this.nocheckedTable=[]
                                            // 所有可选数据
                                            _this.allRoles=res.result.items;
                                            // 可选数据条数
                                            _this.totalItemRight=res.result.totalCount
                                            if(_this.checkedTable.length>0){//获取可选角色
                                                _this.nocheckedTable=_this.uniqueArray(_this.allRoles,_this.checkedTable)
                                                console.log(_this.nocheckedTable)
                                                _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')
                                                console.log(_this.showNoChecked)
                                                _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left')
                                                console.log(_this.showChecked)
                                            }else{
                                                _this.nocheckedTable=_this.allRoles;
                                                _this.showChecked=[];
                                                _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')

                                            }
                                        })
                            }
                        })
            },

            // 支持时间选择
            addTime:function(){
                let _this = this;
                if(_this.value5==""||_this.createTacticTimeruleParams.logisticsName == "") {
                    return;
                }
                _this.createTacticTimeruleParams.endTime = _this.value5[1];
                _this.createTacticTimeruleParams.startTime = _this.value5[0];
                let tacticTimer = {
                    'logisticsId':0,
                    'logisticsName':'',
                    'endTime':'',
                    'startTime':''
                };
                let obj = {
                    'endTime':'',
                    'startTime':'',
                    'logisticsId':0,
                    'logisticsName':'',
                };
                // 获取后台需要的数据
                tacticTimer.logisticsId = _this.createTacticTimeruleParams.logisticsId;
                tacticTimer.logisticsName = _this.createTacticTimeruleParams.logisticsName;
                tacticTimer.endTime = _this.createTacticTimeruleParams.endTime;
                tacticTimer.startTime = _this.createTacticTimeruleParams.startTime;
                _this.tacticTimeruleList.push(tacticTimer);
                console.log(_this.tacticTimeruleList);

                // 获取需要展示的数据
                let test={
                    time:[],
                    back:{}
                }
                obj.startTime = _this.createTacticTimeruleParams.startTime;
                obj.endTime = _this.createTacticTimeruleParams.endTime;
                obj.logisticsId = _this.createTacticTimeruleParams.logisticsId;
                obj.logisticsName = _this.createTacticTimeruleParams.logisticsName;
                test.back = obj;
                test.time = _this.value5;
                _this.timeArray.push(test);


                //添加后清空输入框
                _this.value5 = '';
                _this.createTacticTimeruleParams.logisticsName = '';
                console.log(_this.timeArray);
            },

            // 新增订单金额
            addMoney:function() {
                let _this=this;
                if(_this.select==""||_this.input5==""||_this.createTacticOrderruleParams.logisticsName=="") {
                    return;
                }
                _this.createTacticOrderruleParams.logicSignal = _this.select;
                _this.createTacticOrderruleParams.amount = _this.input5;
                console.log(_this.createTacticOrderruleParams);
                let obj= {
                    'logicSignal':'',
                    'amount':'',
                    'logisticsId':0,
                    'logisticsName':'',
                }
                // 获取数据后保存在数组里
                obj.logicSignal = _this.createTacticOrderruleParams.logicSignal;
                obj.amount = _this.createTacticOrderruleParams.amount;
                obj.logisticsId = _this.createTacticOrderruleParams.logisticsId;
                obj.logisticsName = _this.createTacticOrderruleParams.logisticsName;
                _this.tacticOrderruleList.push(obj);
                console.log(_this.tacticOrderruleList);

                // 清空输入框
                _this.select = "";
                _this.input5 = "";
                _this.createTacticOrderruleParams.logisticsName = "";

            },
            selectZone() {
                let _this = this;
                _this.dialogUserDefined = true;
            },
            // 默认勾选已选标签
            CheckArea(ListIndex) {
                let _this = this;
                _this.checkedCities = [];
                // 遍历到当前已选的标签, 获取id,装到另一个数组内
                for(let j=0; j<_this.tacticArearuleArrShow[ListIndex].tacticArearuleShow.length;j++){
                   _this.checkedCities.push(_this.tacticArearuleArrShow[ListIndex].tacticArearuleShow[j].id);
                }
                // 根据数组内id  勾选标签
                this.$refs.tree.setCheckedKeys(_this.checkedCities);
                // 显示蒙版
                _this.dialogShowCheckArea = true;
            },
            handleCheckChange(data, checked, indeterminate) {
                //1.属性的数组中该节点所对应的对象,2.节点本身是否被选中,3.节点的子树中是否有被选中的节点
                //监听树节点选中状态发生改变
                //遍历数组中的值,如果等于data, 判断当前的checked状态,来添加或删除当前的值
                let _this = this;
                console.log(data, checked, indeterminate);
                let objList = {};
                let obj = {};
                let  temp = [];
                let temparray = [];
                console.log(_this.tacticArearuleArrShow);
                if(checked == false) {
                    //页面标签
                 if(data.levelNo == 1)  {
                    for(let i=0; i< data.childItems.length;i++) {
                        temp[data.childItems[i]] = true;
                    }
                    for(let i = 0; i<_this.tacticArearuleArrShow.length; i++) {
                       for(let j = 0; j < _this.tacticArearuleArrShow[i].tacticArearuleShow.length;j++){
                         if (!temp[_this.tacticArearuleArrShow[i].tacticArearuleShow[j]]) {
                              continue;
                         }else {
                            _this.tacticArearuleArrShow[i].tacticArearuleShow.splice(j,1);
                         }
                       }
                    }
                    // 后台需要的值
                    for(let x = 0; x < _this.tacticArearuleArr.length; x++) {
                       for(let z = 0; z < _this.tacticArearuleArr[x].tacticArearuleList.length;z++){
                          if(!temp[_this.tacticArearuleArr[x].tacticArearuleList[z]]) {
                               continue;
                           }else {
                               _this.tacticArearuleArr[x].tacticArearuleList.splice(z,1);
                           }
                       }
                    }
                 }else if (data.levelNo == 2) {
                    for(let i = 0; i<_this.tacticArearuleArrShow.length; i++) {
                       for(let j = 0; j < _this.tacticArearuleArrShow[i].tacticArearuleShow.length;j++){
                          if(_this.tacticArearuleArrShow[i].tacticArearuleShow[j].id == data.childItems.id) {
                               let index = j;
                               _this.tacticArearuleArrShow[i].tacticArearuleShow.splice(index,1);
                               break;
                           }else {
                               continue;
                           }

                       }
                    }
                    // 后台需要的值
                    for(let x = 0; x < _this.tacticArearuleArr.length; x++) {
                       for(let z = 0; z < _this.tacticArearuleArr[x].tacticArearuleList.length;z++){
                          if(_this.tacticArearuleArr[x].tacticArearuleList[z].adAreaLevel2 == data.childItems.areaName) {
                               let index = z;
                               _this.tacticArearuleArr[x].tacticArearuleList.splice(index,1);
                           }else {
                               continue;
                           }
                       }
                    }
                 }
                  /*  if(data.levelNo == 1) {

                       for(let i = 0; i<_this.tacticArearuleArrShow.length; i++) {
                          for(let j = 0; j < _this.tacticArearuleArrShow[i].tacticArearuleShow.length;j++){
                             if(_this.tacticArearuleArrShow[i].tacticArearuleShow[j].id == data.childItems.id) {
                                  let index = j;
                                  _this.tacticArearuleArrShow[i].tacticArearuleShow.splice(index,1);
                                  break;
                              }else {
                                  continue;
                              }

                          }
                       }
                       // 后台需要的值
                       for(let x = 0; x < _this.tacticArearuleArr.length; x++) {
                          for(let z = 0; z < _this.tacticArearuleArr[x].tacticArearuleList.length;z++){
                             if(_this.tacticArearuleArr[x].tacticArearuleList[z].adAreaLevel2 == data.childItems.areaName) {
                                  let index = z;
                                  _this.tacticArearuleArr[x].tacticArearuleList.splice(index,1);
                              }else {
                                  continue;
                              }
                          }
                       }
                    }*/
                }else if(checked == true){
                  // 显示的标签
                  for(let i = 0; i<_this.tacticArearuleArrShow.length; i++) {
                    for(let j = 0; j < _this.tacticArearuleArrShow[i].tacticArearuleShow.length;j++){
                        if(_this.tacticArearuleArrShow[i].tacticArearuleShow[j].id != data.id) {
                            if(data.levelNo == 1) {
                                for(let a=0;a<data.childItems.length; a++) {
                                    let showObj ={}
                                    showObj.name = data.childItems[a].areaName;
                                    showObj.id = data.childItems[a].id;
                                    _this.tacticArearuleArrShow[i].tacticArearuleShow.push(showObj);
                                }
                            }else if(data.levelNo == 2){
                              obj.name = data.areaName;
                              obj.id = data.id;
                              _this.tacticArearuleArrShow[i].tacticArearuleShow.push(obj);
                            }else {
                              continue;
                            }
                            break;
                        }else {
                            continue;
                        }
                        console.log( _this.tacticArearuleArrShow)
                    }
                 }
                // 需要给后台传的值
                for(let x = 0; x < _this.tacticArearuleArr.length; x++) {
                    for(let z = 0; z < _this.tacticArearuleArr[x].tacticArearuleList.length;z++){
                       if(_this.tacticArearuleArr[x].tacticArearuleList[z].adAreaLevel2 != data.areaName) {
                            console.log(data);
                            if(data.levelNo == 1) {
                               for(let a=0;a<data.childItems.length; a++) {
                                 let backStage = {};
                                 backStage.adAreaLevel1 = data.childItems[a].areaName;
                                 backStage.adAreaLevel2 = data.childItems[a].parentName;
                                  _this.tacticArearuleArr[x].tacticArearuleList.push(backStage);
                               }
                            }else if(data.levelNo == 2){
                              objList.adAreaLevel1 = data.areaName;
                              objList.adAreaLevel2 = data.parentName;
                               _this.tacticArearuleArr[x].tacticArearuleList.push(objList);
                            }else {
                              continue;
                            }
                            //objList.adAreaLevel2 = data.id;
                            break;
                        }else {
                            continue;
                        }
                    }
                  }
                }
                console.log(_this.tacticArearuleArrShow);
               /*for(let i = 0; i<_this.tacticArearuleArrShow.length; i++) {
                  for(let j = 0; j < _this.tacticArearuleArrShow[i].tacticArearuleShow.length;j++){
                     if(checked == false) {
                          if(_this.tacticArearuleArrShow[i].tacticArearuleShow[j].id == data.id) {
                            let index = j;
                            _this.tacticArearuleArrShow[i].tacticArearuleShow.splice(index,1);
                            break;
                          }else {
                            continue;
                          }
                      }else if(checked == true) {
                             let obj = {
                                name :'',
                                id:0
                             }
                             obj.name = data.areaName;
                             obj.id = data.id;
                             _this.tacticArearuleArrShow[i].tacticArearuleShow.push(obj);
                          }

                  }
               }*/
               //console.log(_this.tacticArearuleArrShow);
              // console.log(_this.tacticArearuleArr);
             },
            //选择地区
            CheckedNodes:function(){
                 let _this = this;
                 _this.tacticAreaShow =[];
                 _this.tacticArearuleList =[];
                 _this.ResProvice = this.$refs.tree.getCheckedNodes();
                 _this.dialogUserDefined=false;
                 //点击后获取到所有选中的内容,
                 //遍历,判断ResProvice中levelNo==1存为省,
                 //遍历,判断ResProvice中的levelNo==2存为市,根据市找到当前的省,存为obj={area1:'',area2:''};
                 //把所有的对象装在后台需要返回的数据里,
                 //再把所有的数据装在一个数组里用来显示
                for(let i=0;i<_this.ResProvice.length;i++){
                   if(_this.ResProvice[i].levelNo==1) {
                       let obj = {
                         adAreaLevel1:"",
                         adAreaLevel2:"",
                         id:0
                       }
                       let Showobj1 = {
                         adAreaLevel1:"",
                         adAreaLevel2:"",
                         id:0
                       }

                       obj.adAreaLevel1 = _this.ResProvice[i].areaName;
                       _this.tacticArearuleList.push(obj);

                       Showobj1.adAreaLevel1 = _this.ResProvice[i].areaName;
                       Showobj1.id = _this.ResProvice[i].id;
                       _this.tacticAreaShow.push(Showobj1);
                   }else if(_this.ResProvice[i].levelNo==2){
                       let obj2 = {
                         adAreaLevel1:"",
                         adAreaLevel2:"",
                         id:0
                       }
                       let Showobj2 = {
                         adAreaLevel1:"",
                         adAreaLevel2:"",
                         id:0
                       }
                       obj2.adAreaLevel2 = _this.ResProvice[i].areaName;
                       obj2.adAreaLevel1 = _this.ResProvice[i].parentName;
                       _this.tacticArearuleList.push(obj2);

                       Showobj2.adAreaLevel2 = _this.ResProvice[i].areaName;
                       Showobj2.adAreaLevel1 = _this.ResProvice[i].parentName;
                       Showobj2.id = _this.ResProvice[i].id;
                       _this.tacticAreaShow.push(Showobj2);
                   }

                }
                let tacticAreaShowObj = {
                    "tacticArearuleShow":[],
                     "tacticId":0,
                     "logisticsId":0,
                     "logisticsName":"",
                     "ruleId":0
                }
                // 需要显示的标签
                for(let i=0;i<_this.tacticAreaShow.length;i++){
                    let AreaNameShowObj = {
                          name:'',
                          id:0
                    };
                    if(_this.tacticAreaShow[i].adAreaLevel2==""){
                        continue;
                    }else if(_this.tacticAreaShow[i].adAreaLevel2!="") {
                        AreaNameShowObj.name =_this.tacticAreaShow[i].adAreaLevel2;
                        AreaNameShowObj.id =_this.tacticAreaShow[i].id;
                    }
                    tacticAreaShowObj.tacticArearuleShow.push(AreaNameShowObj)
                }
                 _this.TacticRegion = tacticAreaShowObj.tacticArearuleShow;

                 if(_this.TacticRegion != ""){
                   _this.isActive = true;
                 }else {
                   _this.isActive = false;
                 }
            },
            // 删除单个地区标签
            delCurrentThis(CurrentIndex){
                let _this = this;
                console.log(_this.TacticRegion[CurrentIndex]);
                _this.TacticRegion.splice(CurrentIndex,1);
            },
            // 点击新增收货地区
            addZone() {
                let _this = this;
                if(_this.tacticArearuleList==[]||_this.createTacticArearuleListParams.logisticsName == "") {
                    return;
                }
                let tacticArearuleObj = {
                     "tacticArearuleList":[],
                     "tacticId":0,
                     "logisticsId":0,
                     "logisticsName":"",
                     "ruleId":0
                }
                tacticArearuleObj.tacticArearuleList = _this.tacticArearuleList;
                tacticArearuleObj.logisticsId=_this.createTacticArearuleListParams.logisticsId;
                tacticArearuleObj.logisticsName=_this.createTacticArearuleListParams.logisticsName;
                _this.tacticArearuleArr.push(tacticArearuleObj);
                // console.log(_this.tacticArearuleArr);
                let tacticAreaShowObj = {
                      "tacticArearuleShow":[],
                       "tacticId":0,
                       "logisticsId":0,
                       "logisticsName":"",
                       "ruleId":0
                   }
                // 需要显示的标签
                    tacticAreaShowObj.tacticArearuleShow = _this.TacticRegion;
                    tacticAreaShowObj.logisticsId=_this.createTacticArearuleListParams.logisticsId;
                    tacticAreaShowObj.logisticsName=_this.createTacticArearuleListParams.logisticsName;
                    _this.tacticArearuleArrShow.push(tacticAreaShowObj);
                    // console.log(_this.tacticArearuleArrShow);
                    if(_this.tacticArearuleArrShow.tacticArearuleShow != ""){
                        _this.ShowActive = true;
                    }else {
                        _this.ShowActive = false;
                    }
                    _this.createTacticArearuleListParams.logisticsName="";
                    _this.$refs.tree.setCheckedKeys([]);
                    _this.TacticRegion = [];
                    _this.isActive = false;
            },
            // 保存
            save:function(){
                let self = this;
                self.detailParentId = parseInt(this.$route.params.id);
                    $('.tipsWrapper').css({display:'block'});
                    self.$validate().then(function(success){
                        if(success){
                            $('.tipsWrapper').css({display:'none'})
                            let obj = {
                                tactic :  self.tactic,
                                tacticShopapplyList :self.tacticShopapplyList,
                                tacticTimeruleList : self.tacticTimeruleList,
                                tacticOrderruleList : self.tacticOrderruleList,
                                tacticArearuleArr : self.tacticArearuleArr
                            };
                            self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsLogisticsTacticManagement/CreateOmsTactic',obj)
                                    .then(function(res){
                                        // console.log(res);
                                        self.open('创建成功','el-icon-circle-check','successERP');
                                        self.$store.state.url='/logisticsStrategy/logisticsStrategyModify/'+res.result.tactic.id;
                                        self.$router.push({path:self.$store.state.url})//点击切换路由
                                        self.changeTimes=1;
                                    },function(res){
                                        self.$message({
                                           type: 'warning',
                                           message: res.error.message
                                        });
                                    });
                        }
                    })
            },
            // 转换时间
            getBillingTime(date){
                let _this=this;
                _this.time = date;
                _this.value5=_this.time;
            },
            getChangeTime(index,date){
                let _this=this;
                _this.tacticTimeruleList[index].startTime = date[0];
                _this.tacticTimeruleList[index].endTime = date[1];
                // console.log(_this.tacticTimeruleList);
            },
            // 初始化地区列表
            loadRegion:function() {
                let self = this;
                self.$axios.gets('http://192.168.100.107:8082/api/services/app/AdAreaManagement/GetClassTreeAllChildren').then(function(res){
                    // console.log(res);
                    self.Region = res;
                    // 获取省
                },function(res){
                    console.log('err'+res)
                });
            },



            //getProvices(name){
            //  console.log(name)
              //console.log($('.province-border'))
             // console.log($(this));
         // },




            // 点击区
           // checkedArea(name){
                //console.log(name);
              //  console.log($(event.target).text());
                /* let dialogWidth = $('.dialog-width .el-dialog').clientWidth;
                 let dialogHeight = $('.dialog-width .el-dialog').clientHeight;
                 console.log(dialogWidth);
                 let childWidth = $(event.target).children.offsetWidth;
                 let childHeight = $(event.target).children.offsetHeight;
                 console.log(childWidth)
                 console.log(childHeight)
                 let provinceLeft = $(event.target).offsetLeft;
                 let provinceTop = $(event.target).offsetTop;
                 if(childWidth+provinceLeft>dialogWidth){
                 console.log(999)
                 $(event.target).children.style.left = -(childWidth+provinceLeft-dialogWidth+10)+'px';
                 }*/
               /* let _this = this;
                console.log($(event.target));
                console.log($(event.target).text());

                let obj = {
                    adAreaLevel1:''
                }
                obj.adAreaLevel1 = $(event.target).text();
                _this.tacticArearuleList.push(obj);
                console.log(_this.tacticArearuleList)*/

           // },

            // 提交后清除数据
            clearData(){
                let self=this;
                self.createTacticTimeruleParams={
                    'logisticsName':'',
                };
                self.createTacticOrderruleParams={
                    'logisticsName': '',
                };
                self.tactic={
                    'tacticCode':'', // 策略编码
                    'tacticName':'', // 策略名称
                    'status':'', // 启用状态
                    'remark':'' // 备注
                };
                self.tacticOrderruleList =[];
                self.timeArray =[];
                self.checkedTable=[];
                self.value5 = '';
                self.select = "";
                self.input5 = "";
                self.showChecked = '';
                self.validation.reset();

            }
        }
    }

</script>
<style scoped>
    .block{
        display: none;
    }
    .bg-white{
        background: white;
    }
    .w95 {
        width:95% !important;
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
    .online-detail .zone-row:first-child{
        padding:5px 0;
    }
    .online-detail .el-row{
        padding:15px 0;
        background-color: #fff;
    }
    .online-detail .tabZoo{
        margin:5px 0px;
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
        cursor:pointer;
        width:166px;

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

    .online-remark{
        width: 800px !important;
    }
    .licensing{
        height: 35px;
        line-height:35px;
        margin-bottom:8px;
    }
    .area-style {
        margin-bottom:-3px;
    }
    .licensing .licensing-font{
        font-size: 15px;
        font-weight: 500;
        font-color:#000;
        display:inline-block;
    }
    .licensing .upBt{
        margin-top: 0px;
    }
    .licensing-input {
        width: 65% !important;
    }
    .online-text {
        background-color: #169ad4;
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
        width:100px;
        display:inline-block;
    }
    .online-down {
        background-color: #169ad4;
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
    .left-blue {
        margin-left:6px;
        border-left:3px solid #3cc;

    }
    .btn-select {
        height:25px;
        line-height:25px;
        width:70px;
        margin-left:0px;
        border:none;
    }
    .btn-select .btImg {
        width:20px !important;
        display:inline-block;
        margin:0px !important;
        margin-left:-5px;

    }
    .btn-select .select-font {
        color:white;
        font-size:12px;

    }
    .module-font {
        position: relative;
    }
    .module-font .option-font {
        width:100%;
        height:100%;
        border-radius: 3px;
        margin-left:16px;
        border:1px solid #ccc;
        height:35px;
        line-height:35px;
        text-align: center;
        overflow: hidden;

    }
    .option-font .option-one {
        display:inline-block;
        font-size:11px;
    }
    .option-close {
        width:14px;
        height:14px;
        border-radius: 50%;
        position:absolute;
        right:-14px;
        top:-7px;
        z-index:10;
    }
    .option-close img{
        width:14px;
        height:14px;
        border-radius: 50%;

    }
    .opt-time {
        border:1px solid #ccc !important;
        margin-left:20px;
    }
    .time-change {
        height:35px;
        margin-left:10px;
        border:1px solid #ccc !important;

    }
    .new-add {
        display:inline-block;
        background-color:red;
        width:14px;
        height:14px;
        border-radius: 50%;
        margin:0px 8px 0px 8px;
    }
    .add-font {
        width:96px;
        height:100%;
        font-size:8px;
        color:#00c9c9;
        display: inline-block;
    }
    .search-input {
        height:35px !important;
        position:relative;
        margin:0px 10px 0px 10px;
    }
    .zone-input {
        border:1px solid #DADDE4;
        height:100% !important;
        border-radius:4px;
        position:relative;
        margin-bottom:17px;
    }
    .zone-input-show {
        border:1px solid #DADDE4;
        height:100% !important;
        border-radius:3px;
        position:relative;
    }
    .input-with-select .el-input {
        height:35px !important;
    }
    .zone-btn {
        display:inline-block;
        width: 18px;
        height:18px;
        line-height:10px;
        margin:-10px 9px 9px 9px;
        position:absolute;
        right:0px;
        top:50%;
        text-align: center;
        border:1px solid #ccc;
        border-radius: 3px;
        color:#ccc;
        cursor:pointer;
    }

    .zone-row {
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:flex-start;
        align-items:center;
        line-height:33px;
        padding:8px 15px 8px 20px;
        margin-bottom:5px;
        box-sizing:border-box;
    }
    .online-detail .el-row {
        padding:0px 15px 0px 20px;
    }
    .zone-row:nth-of-type(2n-1) {
        padding:8px 15px 8px 20px !important;
        background-color: #f1f1f1;
    }
    .el-checkbox.is-bordered:hover{
        border:1px solid #00c9c9;
    }

    .userDetail  .errorTips{
        margin-bottom: 10px;
        margin-top: -10px;
    }
    .userDetail .el-row{
        background-color: #fff;
    }
    .bgcolor {
        overflow:visible;
        position:relative;
        width:100%;
    }

    .userDetail .bgcolor .isGive{
        display: block;
        float: left;
        height: 100%;
        line-height: 35px;
    }
    /* 适用店铺 */
    .bgcolor.bgLongWidth {
        width:100%;
        height:100%;

    }

    .zone-height {
        overflow:visible;
        margin-bottom:0px;
    }
    .active {
        padding-top:10px;
    }
    .bgcolor.bgLongWidth label {
        width:10px;
    }



    .logistic-status {
        margin :0 auto;
        height:36px !important;
        box-sizing:border-box;

    }

    .status-font {
        text-align:right;
        margin-right:2px;
    }
    .status-logistics {
        padding-left:18px;
        line-height:30px;

    }
    .status-input {
        margin-left:6px;
        width:706px;

    }
    .show-option {
        width:100px;

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
    .margin-remove-top {
        margin-top:-20px;
    }
    .dialog-width .el-dialog{
        width:75%;
    }
    .el-input--suffix .el-input__inner {
        padding-right:0 !important;
    }
    .prefix-icon {
        display:none;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .bgcolor .el-input--suffix {
        height:42px !important;
    }
    .checked-logistics {
        height:42px !important;

    }
    .bgcolor .el-input--suffix{
        height:40px !important;
    }
    /*  .zone-border {
     background-color: white !important;
     border: 1px solid #cccccc;
     padding:0px 10px;
     border-radius:5px;
     margin:3px 3px 3px 3px;
  }
    .province-border {
     background-color: white !important;
     border: 1px solid #cccccc;
     padding:0px 5px;
     border-radius:5px;
     margin:8px 0px 0px 8px !important;
     position:relative;
     top:0px;
     left:0px;
  }*/

    .province-border {
        position:relative;
        top:0;
        left:0;
    }
    .show-zone {
        width:500%;
        background-color: #f8f8f8;
        padding-left:15px;
        position: absolute;
        top:26px;
        left:-1px;
        border: 1px solid #00c9c9;
        display:none;
    }
    .province-border:hover {
        position:relative;
        top:0;
        left:0;
        z-index:9999;
        background-color:white;
        border: 1px solid #00c9c9;
        border-bottom:none !important;
    }
    .province-border:hover .show-zone {
        position: absolute;
        top:26px;
        left:-1px;
        display:none;
        border: 1px solid #00c9c9;
        z-index:9998;
        display:block;
    }

    .show-city {
        width:75%;
        z-index:999;
        background-color: white !important;
        border: 1px solid #cccccc;
        position: absolute;
        top:115px;
        left:128px;
    }
    .rule-setting {
        display:inline-block;
        font-size:13px;
        border: 1px solid #ccc;
        text-align:center;
        height:30px;
        background-color:white;
        line-height:30px;
        margin-top:5px;
        margin-bottom:5px;
        border-radius:3px;
        margin-right:10px;
        padding:0px 5px;
        cursor: pointer;
    }
    .rule-setting-change {
        color: #00c9c9;
        border: 1px solid #00c9c9 !important;

    }
    .areaLogistics-relative {
        position:relative;

    }
    .online-detail .strategy-ml{
        padding:0px 15px 0px 0px
    }

</style>
<style >
    .search-input .input-with-select .el-input__inner {
        height: 35px !important;

    }
    .areaAdd-input-right {
        height:35px;
    }
    .areaAdd-input-right .bgcolor {
        height:100%;
    }

    .areaAdd-input-right .bgcolor .el-select {
        height:100%;
    }
    .areaAdd-input-right .bgcolor .el-input {
        height:100%;
    }
    .areaAdd-input-right .bgcolor .el-input input {
        height:100%;
    }

    .bgcolor .middle-icon {
        margin-left:8px;
        margin-top:-9px;
        color:red;
        cursor:pointer;
        position:absolute;
        top:50%;

    }
    .zone-height .addZoo .addRole i {
        opacity:0;
        transition: all 0.8s;
        -webkit-transition: all 0.8s;
    }
    .zone-height .addZoo .addRole:hover i {
        opacity:1;
    }
    .zone-height .addZoo .addRole {
        border:none;
        background-color:#E2E2E2;
    }
    .zone-right .bgcolor .el-input input{
        height:100% !important;
    }
    .zone-right .bgcolor .el-input {
        height:100% !important;
    }
    .zone-right .bgcolor .el-select {
        height:100% !important;
    }
    .zone-right .bgcolor {
        height:100% !important;
    }
</style>
