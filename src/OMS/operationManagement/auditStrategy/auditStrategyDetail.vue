<template>
  <div class="auditStrategy-detail">
    <!-- button组 -->
    <el-row>
      <el-col :span="24" class="fixed bg-white pl20">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
      </el-col>
    </el-row>
    <!-- 用户资料 -->
    <el-row class="bg-white pt10">
      <el-col :span="24" class="getPadding">
        <!-- 错误提示 -->
        <div class="tipsWrapper">
          <div class="errorTips">
            <p class="msgDetail">
                  <span :class="{block : !validation.hasError('auditTacticDto.tacticCode')}">
                    代码{{ validation.firstError('auditTacticDto.tacticCode') }},
                  </span>

                  <span :class="{block : !validation.hasError('auditTacticDto.tacticName')}">
                    名称{{ validation.firstError('auditTacticDto.tacticName') }},
                  </span>

                  <span :class="{block : !validation.hasError('auditTacticDto.status')}">
                    状态{{ validation.firstError('auditTacticDto.status') }},
                  </span>

                  <span :class="{block : !validation.hasError('auditTacticDto.remark')}">
                    备注{{ validation.firstError('auditTacticDto.remark') }},
                  </span>
                  <span :class="{block : !validation.hasError('qtyInput')}">
                    数量范围{{ validation.firstError('qtyInput') }},
                  </span>
            </p>
          </div>
        </div>
        <!-- 代码 -->
        <el-row class="padding-remove">
          <el-col :span="12" class="getPadding">
            <div class="bgcolor online-remark">
              <label><small>*</small>代码</label>
              <el-input v-model="auditTacticDto.tacticCode"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('auditTacticDto.tacticCode')}"
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
              <el-input v-model="auditTacticDto.tacticName"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('auditTacticDto.tacticName')}"
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
                <el-select clearable filterable   v-model="auditTacticDto.status"
                           placeholder=""
                           :class="{redBorder : validation.hasError('auditTacticDto.status')}"
                           class="input-entry">
                  <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
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
              <el-input v-model="auditTacticDto.remark"
                        placeholder=""
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('auditTacticDto.remark')}"
                        @change='Modify()'>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 适用店铺 -->
    <el-row class="nopadding mt10">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white strategy">
            <span class="left-blue"></span>
            <div class="getPadding strategy-font">适用店铺</div>
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
                <div class="bgcolor bgLongWidth " style="overflow: visible;">
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
    <!-- 规则设置 -->
    <el-row class="nopadding mt10">
      <el-col class="tabZoo">
        <el-row>
          <el-col :span="24" class="bg-white strategy">
            <span class="left-blue"></span>
            <div class="getPadding address-font">规则设置</div>
            <span @click="ruleSettingShow = !ruleSettingShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                                  @click="ruleSettingShow = !ruleSettingShow"
                                                                                                  :class="{rotate : !ruleSettingShow}"></i></span>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="ruleSettingShow">
            <el-row :span="24"class="padding-remove">
              <div  @click="checkedRule(index)"  v-for="(item,index) in inforuleDtoShow" :key="index">
                <el-col :span="3" class="rule-setting" :id="'a'+item.infoitemid">{{item.infoitemName}}</el-col>
              </div>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <!-- 金额范围&&数量范围 -->
    <el-row :span="24" class="nopadding mt10 amount-number-scope">
      <el-col :span="12" class="nopadding tabZoo mr10  pl20 amount-number-width">
          <el-row>
            <el-col :span="24" class="bg-white strategy">
              <span class="left-blue"></span>
              <div class="getPadding address-font">金额范围</div>
            <span @click="amountScopeShow = !amountScopeShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                      @click="amountScopeShow = !amountScopeShow"
                                                                                      :class="{rotate : !amountScopeShow}"></i></span>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="amountScopeShow">
              <el-row :span="24" class="monery-search mb10 padding-remove" v-for="(content,index) in amountruleDtoList" :key="index">
                <el-col :span="22" class="search-input">
                  <el-input placeholder="请输入内容" v-model.number="content.amount" class="input-with-select" type="number" min="0" @change="handleAmountInput(content.amount,index)">
                    <el-select v-model="content.logicSignal" slot="prepend" class="show-option">
                      <el-option label=">" value=">"></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                    </el-select>
                  </el-input>
                </el-col>
                <i @click="del_amountScope_This(index)" class="el-icon-error middle-icon"></i>
              </el-row>
              <el-row :span="24" class="monery-search mb10 padding-remove">
                <el-col :span="22" class="search-input">
                  <el-input placeholder="请输入内容" v-model.number="amountInput" class="input-with-select" type="number" min="0">
                    <el-select v-model="amountSelect" slot="prepend" class="show-option">
                      <el-option label=">" value=">"></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                    </el-select>
                  </el-input>
                </el-col>
              </el-row>
              <el-row :span="5"  class="mb10 addScope">
                <div  @click="amountScope">
                  <span icon="el-icon-circle-plus-outline" class="new-add"></span>
                  <span class="add-font">新增金额范围</span>
                </div>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
      <el-col :span="12" class="tabZoo pl20 qtyScope-height">
        <el-row>
          <el-col :span="24" class="bg-white strategy">
            <span class="left-blue"></span>
            <div class="getPadding address-font">数量范围</div>
            <span @click="qtyScopeShow = !qtyScopeShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down"
                                                                                      @click="qtyScopeShow = !qtyScopeShow"
                                                                                      :class="{rotate : !qtyScopeShow}"></i></span>
          </el-col>

        </el-row>
        <el-collapse-transition>
          <div v-show="qtyScopeShow">
            <el-row :span="24" class="monery-search mb10 padding-remove" v-for="(content,index) in qtyruleDtoList" :key="index">
              <el-col :span="22" class="search-input">
                <el-input placeholder="请输入内容" v-model.number="content.qty" class="input-with-select" type="number" min="0"
                          @change = "verification(content.qty,index)"
                >
                  <el-select v-model="content.logicSignal" slot="prepend" class="show-option">
                    <el-option label=">" value=">"></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                  </el-select>
                </el-input>
              </el-col>
              <i @click="del_qtyScope_This(index)" class="el-icon-error middle-icon"></i>
            </el-row>

            <el-row :span="24" class="monery-search mb10 padding-remove">
              <el-col :span="22" class="search-input">
                <el-input placeholder="请输入内容"
                          v-model.number="qtyInput"
                          class="input-with-select"
                          :class="{redBorder : validation.hasError('qtyInput')}"
                          type="number" min="0"
                >
                  <el-select v-model="qtySelect" slot="prepend" class="show-option">
                    <el-option label=">" value=">"></el-option>
                    <el-option label=">=" value=">="></el-option>
                    <el-option label="<" value="<"></el-option>
                    <el-option label="<=" value="<="></el-option>
                  </el-select>
                </el-input>
              </el-col>
            </el-row>
            <el-row :span="5"  class="mb10 addScope">
              <div  @click="qtyScope">
                <span icon="el-icon-circle-plus-outline" class="new-add"></span>
                <span class="add-font">新增数量范围</span>
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
    <!-- dialog -->

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
              <el-table-column type="selection" fixed="left" class="transfer-selection"></el-table-column>
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
    export default{
        data(){
            return{
//---------------------- 策略基础信息 ------------------------------
                auditTacticDto:{
                    'tacticCode':'', // 策略编码
                    'tacticName':'', // 策略名称
                    'status':0, // 启用状态
                    'remark':'', // 备注
                },

//---------------------- 选取适用店铺 ------------------------------
                shopapplyDtoList:[],
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
                borderShow:false,
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
//---------------------- 规则设置 ------------------------------
                inforuleDtoShow:[],
                inforuleDtoList:[],
//---------------------- 数量范围 ------------------------------
                qtyInput: '',
                qtySelect: '',
                selectData: {//条件查询下拉数据
                    Status001:[],//宝贝状态
                },
                qtyScopeData:{
                    "groupId": 0,
                    "tacticId": 0,
                    "logicSignal": "",
                    "qty": 0
                },
                logisticsOrderrulesAr:[],
                qtyruleDtoList:[],
//---------------------- 金额范围 ------------------------------
                logisticsArearuleAr:[],
                ouCheckAll:[],//分配组织数据
                activeName2: 'first',
                radio: 'true',
                amountInput: '',
                amountSelect: '',
                amountruleDtoList:[],
                amountScopeData: {
                    "groupId": 0,
                    "tacticId": 0,
                    "logicSignal": "",
                    "amount": 0
                },
//---------------------- 展开收起 ------------------------------
                applicableShow:true, //选取店铺
                ruleSettingShow:true, //规则设置
                amountScopeShow:true, // 金额范围
                qtyScopeShow:true, // 数量范围
                detailParentId:'',
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
                dialogUserConfirm:false,// 信息更改提示控制
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
                changeTimes:1,
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
            'auditTacticDto.tacticCode': function (value) {// 代码
                return this.Validator.value(value).required().maxLength(50);
            },
            'auditTacticDto.tacticName': function (value) {// 名称
                return this.Validator.value(value).required().maxLength(50);
            },
            'auditTacticDto.status': function (value) {// 状态
                return this.Validator.value(value).required().maxLength(50);
            },
            'auditTacticDto.remark': function (value) {// 状态
                return this.Validator.value(value).maxLength(50);
            },
            'qtyInput': function (value) {// 状态
                return this.Validator.value(value).integer().maxLength(7);
            }
        },
        components:{
            buttonGroup,
            dialogBox
        },
        created () {
            let self=this;
            // 规则设置
            self.ruleSetting();
            // 加载状态下拉
            self.getSelectData();
            // 适用店铺表格
            self.getAllRoleData();
        },

        watch:{
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
                    this.changeTimes++
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
            auditTacticDto:{
              handler: function (val, oldVal) {
                  this.changeTimes++
                   console.log(this.changeTimes)
              },
              deep:true
            },
            inforuleDtoList:{
              handler: function (val, oldVal) {
                  this.changeTimes++
                   console.log(this.changeTimes)
              },
              deep:true
            },
            amountruleDtoList:{
              handler: function (val, oldVal) {
                  this.changeTimes++
                   console.log(this.changeTimes)
              },
              deep:true
            },
            qtyruleDtoList:{
              handler: function (val, oldVal) {
                  this.changeTimes++
                   console.log(this.changeTimes)
              },
              deep:true
            }
        },

        methods: {
              // 金额范围输入框限制
              handleAmountInput(name,index){
                  let _this = this;
                      //_this.amountruleDtoList[index].amount=String(name).replace(/[^\d\.]/g,'');
                     // _this.amountruleDtoList[index].amount=String(name).replace(/[^\d\.]/g,'');
                     //console.log(_this.amountruleDtoList[index].amount);
                     // _this.amountruleDtoList[index].amount = String(name).replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                     // _this.amountruleDtoList[index].amount = String(name).replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                     //  _this.amountruleDtoList[index].amount = String(name).replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                     // _this.amountruleDtoList[index].amount = String(name).replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                     _this.amountruleDtoList[index].amount= String(name).match(/\d+(\.\d{0,2})?/) ? String(name).match(/\d+(\.\d{0,2})?/)[0] : '';
                     if(_this.amountruleDtoList[index].amount.indexOf(".")< 0 && _this.amountruleDtoList[index].amount !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                          _this.amountruleDtoList[index].amount= parseFloat(_this.amountruleDtoList[index].amount);
                     }
              },
              verification(name,index) {
                  let _this = this;
                  _this.qtyruleDtoList[index].qty=String(name).replace(/[^\d\.]/g,'');
              },
             // 金额范围 删除当条
             del_amountScope_This(index) {
                let _this = this;
                _this.amountruleDtoList.splice(index,1)
             },
             // 数量范围 删除当条
             del_qtyScope_This(index) {
                let _this = this;
                _this.qtyruleDtoList.splice(index,1)
             },
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
                if(btn=="新增") {
                    this.$store.state.url='/auditStrategy/auditStrategyDetail/default'
                    this.$router.push({path:this.$store.state.url})//点击切换路由
                }else if(btn=="返回"){
                    console.log(this.changeTimes)
                     if(this.$route.params.id=="default"&&this.changeTimes<=2){//新增操作
                        this.$store.state.url='/auditStrategy/auditStrategyList/default'
                        this.$router.push({path:this.$store.state.url})//点击切换路由
                     }else{
                         this.dialogSetting.dialogName='backDialog'
                         this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                         this.dialogSetting.dialogType="confirm";
                         this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                         this.dialogVisible=true;
                     }
                }else if(btn=="删除"){
                      this.dialogSetting.dialogName='delDialog'
                      this.dialogSetting.message="确定删除？";
                      this.dialogSetting.dialogType="confirm";
                      this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                      this.dialogVisible=true;
                }else if(btn=="保存") {
                     this.save()
                }else if(btn=="保存并新增") {
                    this.saveAdd();
                }else if(btn=="取消") {
                     if(this.$route.params.id!=="default"&&this.changeTimes<=2){//新增操作
                        this.$store.state.url='/auditStrategy/auditStrategyDetail/default'
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
            filterNode(value, data) {
                if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
            },

            // 保存
            save:function(){
                let self = this;
                self.detailParentId = parseInt(this.$route.params.id);
                if(this.$route.params.id == 'default') {
                $('.tipsWrapper').css({display:'block'});
                self.$validate().then(function(success){
                    if(success){
                    let obj = {
                        auditTacticDto :  self.auditTacticDto,
                        shopapplyDtoList :self.shopapplyDtoList,
                        inforuleDtoList : self.inforuleDtoList,
                        qtyruleDtoList : self.qtyruleDtoList,
                        amountruleDtoList : self.amountruleDtoList
                    };
                        $('.tipsWrapper').css({display:'none'})
                        self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/CreateOmsTactic',obj)
                                .then(function(res){
                                    self.open('创建成功','el-icon-circle-check','successERP');
                                    self.$store.state.url='/auditStrategy/auditStrategyModify/'+res.result.auditTacticDto.id;
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
                }else {
                  self.modData();
                }
            },
            saveAdd:function(){
                let self = this;
                $('.tipsWrapper').css({display:'block'});
                self.$validate().then(function (success) {
                    let obj = {
                        auditTacticDto :  self.auditTacticDto,
                        shopapplyDtoList :self.shopapplyDtoList,
                        inforuleDtoList : self.inforuleDtoList,
                        qtyruleDtoList : self.qtyruleDtoList,
                        amountruleDtoList : self.amountruleDtoList
                    };
                    if (success) {
                        $('.tipsWrapper').css({display:'none'});
                        self.$axios.posts('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/CreateOmsTactic',obj).then(function(res){
                            //  self.addData=res.result;
                            self.open('保存成功','el-icon-circle-check','successERP');
                            self.clearData();
                            self.$store.state.url='/auditStrategy/auditStrategyDetail/default'
                            self.$router.push({path:self.$store.state.url})
                            self.changeTimes=1;
                            self.validation.reset();
                            self.update=false;
                            console.log(self.firstModify)
                        },function(err){
                             self.$message({
                                type: 'warning',
                                message: err.error.message
                             });
                        })
                    }
                });
            },
            Modify:function(){// 判断主表是否修改过
                let self = this;
                self.ifModify = true;
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
            dialogClick(parmas){//对话框按钮点击事件
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="delDialog"){
                       this.del_ThisData()
                    }else{
                       this.$store.state.url='/auditStrategy/auditStrategyList/default'
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
                self.$store.state.url='/auditStrategy/auditStrategyList/default'
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

            // 删除
            del_ThisData:function() {
                let _this = this;
                let detailParentId = parseInt(this.$route.params.id);
                if(this.$route.params.id!='default') {
                    _this.$axios.deletes('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/DeleteTacticById',{Id:detailParentId}).then(function(res) {
                        _this.clearData();
                        _this.$store.state.url='/auditStrategy/auditStrategyList/default'
                        _this.$router.push({path:_this.$store.state.url})//点击切换路由
                    }),function(res) {
                        _this.dialogSetting.dialogType="submit";
                        _this.dialogSetting.dialogName='saveDialog'
                        _this.dialogSetting.message=res.error.message;
                        _this.errorTips.details='';
                        _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        _this.dialogVisible=true;
                    }
                }
            },
            // 修改页面
            modData:function() {
                let _this = this;
                $('.tipsWrapper').css({display:'block'});
                _this.$validate().then(function (success) {
                  if(this.$route.params.id!='default') {
                      let obj = {
                          auditTacticDto :  _this.auditTacticDto,
                          shopapplyDtoList :_this.shopapplyDtoList,
                          inforuleDtoList : _this.inforuleDtoList,
                          qtyruleDtoList : _this.qtyruleDtoList,
                          amountruleDtoList : _this.amountruleDtoList
                      };
                      _this.$axios.puts('http://192.168.100.107:8099/api/services/app/OmsAuditTacticManagement/UpdateOmsTactic',obj)
                              .then(function(res){
                                  console.log(res);
                                  _this.open('修改成功','el-icon-circle-check','successERP');
                                  _this.$store.state.url='/auditStrategy/auditStrategyList/default'
                                  _this.$router.push({path:self.$store.state.url})
                              },function(res){
                                  _this.dialogSetting.dialogType="submit";
                                  _this.dialogSetting.dialogName='saveDialog'
                                  _this.dialogSetting.message="信息提报有误";
                                  _this.errorTips.details='';
                                  _this.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                                  _this.dialogVisible=true;
                              });


                  }
                  })
            },
            // 选取店铺
            searchLeftTable(){
                let _this=this;
                // checkTable
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft);
                $.each(_this.checkedTable,function(index,val){
                    console.log(index)
                    console.log(val)
                    let str=val.shopName;
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
            noCheck_push_check(){//从右往左添加数据
                let _this=this;
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.showChecked=_this.pagination(_this.selection_nochecked,[],_this.oneItemLeft,_this.pageLeft,'left')
                _this.showNoChecked=_this.pagination([],_this.selection_nochecked,_this.oneItemRight,_this.pageRight,'right')

                 // 获取到选中的店铺 传给后台
               // console.log(_this.showChecked);
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
                    obj = _this.showChecked[i];
                    arr.push(obj);
                };
                    _this.shopapplyDtoList = arr;
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
                            console.log(re)
                            let webShopAll=re.result.totalCount;
                            if(webShopAll>0){
                                _this.$axios.gets('http://192.168.100.107:8099/api/services/app/OmsWebShopManagement/GetWebShopBySearch',{SkipCount:0,MaxResultCount:webShopAll})//获取所有角色
                                        .then(function(res){
                                            console.log(res)
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
            // 新增金额范围
            amountScope:function() {
                 let _this=this;
                 if(_this.amountSelect=="" ||_this.amountInput == "") {
                    return;
                 }
                 _this.amountInput = _this.amountInput >=0?_this.amountInput:1;
                 _this.amountScopeData.logicSignal = _this.amountSelect;
                 _this.amountScopeData.amount = _this.amountInput;
                 console.log(_this.amountScopeData);
                let obj= {
                    'logicSignal':'',
                    'amount':'',
                    "groupId": 0,
                    "tacticId": 0
                }
                obj.logicSignal = _this.amountScopeData.logicSignal;
                obj.amount = _this.amountScopeData.amount;
                obj.groupId = _this.amountScopeData.groupId;
                obj.tacticId = _this.amountScopeData.tacticId;
                _this.amountruleDtoList.push(obj);
                console.log(_this.amountruleDtoList);
                _this.amountSelect = "";
                _this.amountInput = "";
            },
            // 数量范围
            qtyScope:function() {
                 let _this=this;
                 if(_this.qtySelect == ""||_this.qtyInput == ""){
                    return;
                 }
                 _this.qtyInput = parseInt(_this.qtyInput);
                 _this.qtyInput = _this.qtyInput >=0?_this.qtyInput:0;
                 _this.qtyScopeData.logicSignal = _this.qtySelect;
                 _this.qtyScopeData.qty = _this.qtyInput;

                let obj= {
                    'logicSignal':'',
                    'qty':'',
                    "groupId": 0,
                    "tacticId": 0
                }
                obj.logicSignal = _this.qtyScopeData.logicSignal;
                obj.qty = _this.qtyScopeData.qty;
                obj.groupId = _this.qtyScopeData.groupId;
                obj.tacticId = _this.qtyScopeData.tacticId;
                _this.qtyruleDtoList.push(obj);
                _this.qtySelect = "";
                _this.qtyInput = "";
            },
            // 规则设置
            ruleSetting() {
                let _this = this;
                _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem?dictName=OMS_AuditTacticInfoItem%20").then(function(res) {
                    // 启用状态
                    let arr = [];
                    for(let i=0; i<res.result.length; i++) {
                        let obj = {
                          infoitemid:'',
                          infoitemName:''
                        }
                    obj.infoitemid = res.result[i].itemValue;
                    obj.infoitemName = res.result[i].itemName;
                    _this.inforuleDtoShow.push(obj)
                    }
                });
            },
            //选中规则设置
            checkedRule:function(index) {
                let _this = this;
                $(event.target).toggleClass("rule-setting-change");
                // 取出名称
                let name = _this.inforuleDtoShow[index].infoitemName;
                // 记录索引
                let A = -1;
                for (let i = 0; i<_this.inforuleDtoList.length; i++){
                    if (_this.inforuleDtoList[i].infoitemName == name){
                        A = i;
                        break;
                    }
                }
                if (A != -1){
                     _this.inforuleDtoList.splice(A,1)

                } else {
                    let obj = {
                          infoitemid:'',
                          infoitemName:''
                    }
                    obj.infoitemName = _this.inforuleDtoShow[index].infoitemName;
                    obj.infoitemid = _this.inforuleDtoShow[index].infoitemid;
                    _this.inforuleDtoList.push(obj);
                    console.log(_this.inforuleDtoList);
                }
               //_this.inforuleDtoList.forEach(item=>{
               //   item.isSelected = (item.infoitemName == selectedTab.infoitemName)

               // })
               // console.log(item.infoitemName);
                //_this.ruleActive = _this.inforuleDtoList.infoitemName;

               /* let A = _this.inforuleDtoList.indexOf(_this.inforuleDtoShow[index]);
                if (A == -1){
                    let obj = {
                          infoitemid:'',
                          infoitemName:''
                    }
                    obj.infoitemName = _this.inforuleDtoShow[index].infoitemName;
                    obj.infoitemid = _this.inforuleDtoShow[index].infoitemid;
                    _this.inforuleDtoList.push(obj)
                }else {
                    _this.inforuleDtoList.splice(A,1)
                    console.log(_this.inforuleDtoList);
                }*/
            },
             clearData(){
                let self=this;
                self.auditTacticDto={
                    'tacticCode':'',
                    'tacticName':'',
                    'status':0,
                    'remark':''
                };
                self.qtyScopeData={
                    "groupId": 0,
                    "tacticId": 0,
                    "logicSignal": "",
                    "qty": 0
                },
                self.amountScopeData= {
                    "groupId": 0,
                    "tacticId": 0,
                    "logicSignal": "",
                    "amount": 0
                },
                self.checkedTable=[];
                for(let i=0; i<self.inforuleDtoShow.length;i++) {
                    let newId = '#a'+self.inforuleDtoShow[i].infoitemid;
                    $(newId).removeClass('rule-setting-change');
                }

                self.inforuleDtoList=[];
                self.shopapplyDtoList =[];
                self.qtyruleDtoList = [];
                self.amountruleDtoList =[];
                self.amountSelect = "";
                self.amountInput = "";
                self.qtySelect = "";
                self.qtyInput = "";
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
    .bb1 {
        border: 1px solid #cccccc;
    }
    .w400 {
        width:400px !important;
    }
    /*收起*/
    .auditStrategy-detail .upBt{
        font-size: 12px;
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .auditStrategy-detail .upBt i{
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        color:#cacaca;
        margin-left: 5px;
    }
    .auditStrategy-detail .inline-block-need{
        display: inline-block;
    }
    .auditStrategy-detail .upBt i.rotate{
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
    }

    .auditStrategy-detail  .errorTips{
        margin-bottom: 10px;
    }
    .auditStrategy-detail .el-row:first-child{
        padding:5px 0;
    }
    .auditStrategy-detail .el-row{
        padding:15px 0;
        background-color: #fff;
    }
    .auditStrategy-detail .el-row:last-child{
        border-bottom:none;
    }

    .auditStrategy-detail .tabZoo{
        overflow: hidden;
        background-color: #fff;
    }

    .auditStrategy-detail  .getPadding,.tabZoo .el-tabs__nav-scroll{
        padding: 0 10px;
    }
    .auditStrategy-detail .tabZoo .auditInformation{
        margin-top: 15px;
    }

    .auditStrategy-detail .tabZoo .erp_bt:first-child{
        margin-left: 0;
    }
    .auditStrategy-detail .nopadding{
        padding-top: 0;
    }
    .auditStrategy-detail .el-table th {
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        text-align: left;
        padding: 5px 0;
        text-align: center;
        background-color: #ececec;
    }
    .auditStrategy-detail .el-table td{
        padding: 3px 0;
    }
    .auditStrategy-detail .el-table__body{
        text-align: center;
    }
    .auditStrategy-detail .el-table .cell{
        padding-left:0px;
        padding-right:0px;
    }
    .mb10{
        margin-bottom: 10px;
    }
    .addScope {
        cursor:pointer;
        width:166px;
    }
    .auditStrategy-detail .bgw .el-input__inner{
        background-color:white;
        text-align: center;
    }
    .auditStrategy-detail .bgp .el-input__inner{
        background-color:#FAFAFA;
        text-align: center;
    }
    .auditStrategy-detail .el-select-dropdown__item{
        text-align: center;
    }
    .auditStrategy-detail .area{
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
        width: 800px !important;
    }
    .strategy{
        height: 35px;
        line-height:33px;
        margin-bottom:8px;
    }
    .strategy .strategy-font{
        font-size: 15px;
        font-weight: 500;
        font-color:#000;
        display:inline-block;
    }
    .strategy .upBt{
        margin-top: 0px;
    }
    .strategy-input {
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
    .new-add {
        display:inline-block;
        background-color:red;
        width:14px;
        height:14px;
        border-radius: 50%;
        margin:0px 8px 0px 8px;
    }
    .add-font {
        font-size:12px;
        color:#00c9c9;
    }
    .search-input {
        position:relative;
        margin:0px 10px 0px 10px;
    }
    .auditStrategy-detail .el-row {
        padding:0px 15px 0px 20px;

    }
    .userDetail  .errorTips{
        margin-bottom: 10px;
        margin-top: -10px;
    }
    .userDetail .el-row{
        background-color: #fff;
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
    .bgcolor.bgLongWidth label {
        width:0px;
    }
    .bgcolor {
        overflow:visible;
        width:100%;
    }
    .logistic-status {
        margin :0 auto;
        height:36px !important;
        box-sizing:border-box;

    }

    .status-font {
        text-align:right;



    }
    .status-logistics {
        padding-left:18px;
        line-height:30px;

    }
    .status-input {
        margin-left:9px;
        width:706px;

    }
    .show-option {
        width:100px;

    }
    .middle-icon {
      margin-top:9px;
      color:red;
    }
    .padding-remove {
        padding:0 !important;
    }
    .el-input--suffix .el-input__inner {
        padding-right:0 !important;
    }
    .rule-setting {
       display:inline-block;
       font-size:11px;
       border: 1px solid #ccc;
       text-align:center;
       height:40px;
       line-height:40px;
       margin-bottom:30px;
       border-radius:5px;
       margin-right:18px;
       overflow:hidden;
       cursor: pointer;
    }

    .rule-setting-change {
      overflow:hidden;
      color: #00c9c9;
      border: 1px solid #00c9c9 !important;
    }
    .el-icon-arrow-down {
      margin-right:15px;
    }
    .amount-number-scope {
      padding:0px !important;
      overflow: hidden;
      background-color: #eceff3 !important;
    }
    .amount-number-width {
      background-color:red;
      width:calc(50% - 5px);
      height:100%;
      overflow:hidden;
      margin-bottom:-10000px;
      padding-bottom:10000px;
    }
    .qtyScope-height {
      height:100%;
      width:calc(50% - 5px);
      overflow:hidden;
      margin-bottom:-10000px;
      padding-bottom:10000px;
    }
    .transfer_table {
       height: calc(100% + 50px);
    }
    .transfer-selection {
      height: calc(100% + 50px);

    }
    .auditStrategy-detail .el-row {
      padding:0px 15px 0px 20px;
    }

</style>
