<template>
  <div class="supplier-modify">
    <!--第一个收起模块-->
    <el-row class="fixed">
      <el-col :span="24" class="bg-white">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
        <span @click="ifShow=!ifShow" class="upBt">{{packUp}}<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow">
        <el-row class="bg-white ft12 pr10 pt10">
          <el-col :span="24" class="getPadding">
            <!--错误提示-->
            <div class="tipsWrapper" name="returnStockId">
              <div class="errorTips" :class="{block : !validation.hasError('customerData.returnStockId')}">
                <p class="msgDetail">
                  <!--退货仓{{ validation.firstError('customerData.returnStockId') }}-->
                  <span :class="{block : !validation.hasError('topDetailInfo.returnStockId')}">
                    退货仓{{ validation.firstError('topDetailInfo.returnStockId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.logisticsId')}">
                    物流公司{{ validation.firstError('topDetailInfo.logisticsId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.logisticsBillCode')}">
                    物流单号{{ validation.firstError('topDetailInfo.logisticsBillCode')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.buyerMsg')}">
                    买家留言{{ validation.firstError('topDetailInfo.buyerMsg')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.salerMsg')}">
                    卖家留言{{ validation.firstError('topDetailInfo.salerMsg')}}
                  </span>
                </p>
              </div>
            </div>
            <!--显示的信息-->
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                  <!--单据号：{{topDetailInfo.rtoCode}}-->
                  <label> 单据号：</label>
                  <div class="el-select topData">{{topDetailInfo.billCode}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                    <label>订单来源：</label>
                    <div class="el-select topData">
                      <span>{{topDetailInfo.platformName}}</span>/
                      <span>{{topDetailInfo.createdTypeName}}</span>
                      <span style="display:none;">{{topDetailInfo.platformId}}</span>
                      <span style="display:none;">{{topDetailInfo.createdTypeId}}</span>
                    </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                  <label>售后单号：</label>
                  <div class="el-select topData">{{topDetailInfo.serviceCode}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                  <label>生效日期：</label>
                  <div class="el-select topData">{{topDetailInfo.effectiveTime|date}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
               <div class="bgcolor info">
                  <label> 店铺：</label>
                  <div class="el-select topData">{{topDetailInfo.webshopId}}</div>
               </div>
             </el-col>
             <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                  <label>会员卡号：</label>
                  <div class="el-select topData">{{topDetailInfo.memberCardCode}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
                  <label>来源订单号：</label>
                  <div class="el-select topData">{{topDetailInfo.sourceOrderCode}}</div>
                 </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
              <label>来源交易号：</label>
              <div class="el-select topData">{{topDetailInfo.sourceTransCode}}</div>
            </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
              <label>买家昵称：</label>
              <div class="el-select topData">{{topDetailInfo.buyerNickname}}</div>
            </div>
               </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info">
              <label>买家电话：</label>
              <div class="el-select topData">{{topDetailInfo.buyerPhone}}</div>
            </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <div class="bgcolor info">
              <label> 退货入库单号：</label>
              <div class="el-select topData">{{topDetailInfo.invInOrderCode}}</div>
            </div>
               </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <div class="bgcolor info">
              <label>退货原因：</label>
              <div class="el-select topData">{{topDetailInfo.returnReason}}</div>
            </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <!--下拉选择和输入框修改明细-->
                <div class="bgcolor returnStock">
                  <label><small>*</small>退货仓</label>
                  <el-select  filterable  v-model="topDetailInfo.returnStockName"
                             class="status"
                              clearable
                              :filter-method="filterStockMethod"
                             @focus="showErrprTipsSelect"
                             :class="{redBorder : validation.hasError('topDetailInfo.returnStockId')}">
                    <el-option v-for="item in returnStockSelect1"
                               :key="item.id"
                               :label="item.stockName"
                               :value="item.id">
                      <span style="float: left">{{item.stockCode}}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockName}}</span>
                    </el-option>
                  </el-select>
            </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor logisticsCompany">
                  <label>物流公司</label>
                  <el-select
                    filterable
                    clearable
                    v-model="topDetailInfo.logisticsName"
                    :filter-method="filterlogisticMethod"
                    class="status"
                    placeholder=""
                    @focus="showErrprTipsSelect"
                    :class="{redBorder : validation.hasError('topDetailInfo.logisticsId')}">
                    <el-option v-for="item in logisticsCompanyArr1"
                               :key="item.id"
                               :label="item.contactName"
                               :value="item.id">
                      <span style="float: left">{{item.contactCode}}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contactName}}</span>
                    </el-option>
                  </el-select>
            </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor logisticsBillCode">
                  <label>物流单号</label>
                  <el-input v-model="topDetailInfo.logisticsBillCode"
                            placeholder=""
                            class="regAddress"
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('topDetailInfo.logisticsBillCode')}"></el-input>
            </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                  <label>买家留言</label>
                  <el-input v-model="topDetailInfo.buyerMsg"
                            placeholder=""
                            @focus="showErrprTips"
                            class="manager"
                            :class="{redBorder : validation.hasError('topDetailInfo.buyerMsg')}"></el-input>
            </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                  <label>卖家留言</label>
                  <el-input v-model="topDetailInfo.salerMsg"
                            placeholder=""
                            @focus="showErrprTips"
                            class="manager"
                            :class="{redBorder : validation.hasError('topDetailInfo.salerMsg')}"></el-input>
            </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!--第二个收起模块-->
    <el-row class="nopadding mt10">
      <div class="tabZoo inline-block-need">
        <el-col :span="24">
          <div>货品明细</div>
        </el-col>
      </div>
      <span @click="ifShow1 = !ifShow1" class="upBt">{{packUp1}}<i class="el-icon-arrow-down" @click="ifShow1 = !ifShow1" :class="{rotate : !ifShow1}"></i></span>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow1">
        <el-row class="bg-white ft12 pr10 pt10">
          <el-col :span="24" class="getPadding">
            <buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1'></buttonGroup>
            <el-table :data="tableDetail" stripe border style="width: 100%" @selection-change="handleSelectionChange" class="all-table">
              <el-table-column type="selection"></el-table-column>
              <!--sku-->
              <!--<el-table-column prop="skuId" label="sku" width="180">-->
                <!--<template slot-scope="scope">-->
                  <!--<div @click="goodsSearch(scope.$index,scope.row)">-->
                    <!--<img v-show='redBankAr.indexOf(scope.row)>=0' class="abimg" src="../../../../static/image/content/redremind.png"/>-->
                    <!--<input class="input-need"-->
                              <!--disabled="disabled"-->
                             <!--:class="[scope.$index%2==0?'input-bgw':'input-bgp']"-->
                             <!--v-model="scope.row.skuId"-->
                             <!--type="text"-->
                             <!--@change="handleBankChange(scope.$index,scope.row)"/>-->
                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                    <!--<img class="abimg1" src="../../../../static/image/common/search_btn.png"/>-->
                  <!--</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--------------------------------------------------------------------------------------->
              <!--sku-->
              <el-table-column prop="skuCode" label="sku" width="150">
                <template slot-scope="scope">
                  <div @click="chooseProduct(scope.$index,scope.row)">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.skuCode"
                           type="text"
                           @change="handleBankChange(scope.$index,scope.row)"/>
                    <img class="abimg2" src="../../../../static/image/common/search_btn.png"/>
                  </div>
                </template>
              </el-table-column>
              <!--商品编码 -->
              <el-table-column prop="productCode" label="商品编码" width="150">
                <template slot-scope="scope">
                  <div @click="InitTable(scope.$index,scope.row)">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.productCode"
                           type="text"
                           @change="handleBankChange(scope.$index,scope.row)"/>
                    <img class="abimg2" src="../../../../static/image/common/search_btn.png"/>
                  </div>
                </template>
              </el-table-column>
              <!--商品名称-->
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <!--规格-->
              <!--零售价-->
              <el-table-column prop="retailPrice" label="零售价" width="80"></el-table-column>
              <!--折扣率-->
              <el-table-column prop="discount" label="折扣" width="80"></el-table-column>
              <!--结算价-->
              <el-table-column prop="payPrice" label="结算价" width="120">
                <template slot-scope="scope">
                  <!--<div v-show="!downloadShow">{{scope.row.payPrice}}</div>-->
                  <input class="input-need"
                         :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                         v-model="scope.row.payPrice"
                         type="text"
                         @change="handleBankChange(scope.$index,scope.row)"/>
                </template>
              </el-table-column>
              <!--数量-->
              <el-table-column prop="qty" label="数量" width="120">
                <template slot-scope="scope">
                  <input class="input-need"
                         :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                         v-model="scope.row.qty"
                         type="text"
                         @change="handleBankChange(scope.$index,scope.row)"/>
                </template>
              </el-table-column>
              <!--结算金额-->
              <el-table-column prop="payamount" label="结算金额" width="80"></el-table-column>
              <!--网店交易号-->
              <el-table-column prop="transCode" label="网店交易号" width="120"></el-table-column>
              <!--网店子订单编号-->
              <el-table-column prop="subtransCode" label="网店子订单编号" width="120"></el-table-column>
              <!--备注-->
              <el-table-column prop="remark" label="备注" width="120"></el-table-column>
              <el-table-column label='操作' fixed="right">
                <template slot-scope="scope" >
                  <el-button @click="handleDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!--最后的审计信息-->
    <el-row class="mt10">
      <el-col :span="24" class="auditInformation getPadding" id="auditInformation ">
        <h4 class="h4">审计信息</h4>
        <div class="getPadding1">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>创建人</label>
            <el-input v-model="topDetailInfo.createdBy" placeholder="" disabled="disabled"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>创建时间</label>
            <el-input v-model="topDetailInfo.createdTime" :disabled="true"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>修改人</label>
            <el-input v-model="topDetailInfo.modifiedBy" placeholder="" disabled="disabled"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>修改时间</label>
            <el-input v-model="topDetailInfo.modifiedTime" :disabled="true"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>审核人</label>
            <el-input v-model="topDetailInfo.checker" :disabled="true"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>审核时间</label>
            <el-input v-model="topDetailInfo.checkTime" :disabled="true"></el-input>
          </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 点击sku弹出的dialog -->
    <SearchGoods v-on:childByValue="childByValue" v-bind:SearchGoods1="SearchGoods1"></SearchGoods>
    <!-- 点击sku弹出的dialog结束 -->
    <!-- 点击商品编码弹出的dialog -->
    <el-dialog :visible.sync="dialogUserDefined1" class="dialogUserDefined">
      <template slot="title">
        <span>商品规格</span>
      </template>
      <el-row>
        <el-col :span="24" class="specifications">
          <span>商品编码：</span><span>123</span>
        </el-col>
        <el-col :span="24" class="specifications">
          <span>商品名称：</span><span>123</span>
        </el-col>
      </el-row>
      <Dtable :Dimensiondata="Dimensiondata" :DimensionKey="DimensionKey" :DimensionName='DimensionName'></Dtable>
      <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addProductSpecification">确 定</el-button>
            <el-button @click="dialogUserDefined1=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 点击商品编码弹出的dialog结束 -->
    <!--换货dialog-->
    <el-dialog :visible.sync="returnGoods" class="dialogUserDefined">
      <template  slot="title">
        <span>换货</span>
      </template>
      <el-table v-loading="loading" :data="returnGoodsData" stripe border style="width: 100%" @selection-change="handleSelectionChangeGoods" class="all-table">
        <el-table-column type="selection"></el-table-column>
        <!--序号-->
        <el-table-column prop="seq" label="序号"></el-table-column>
        <!--sku-->
        <el-table-column prop="skuCode" label="sku"></el-table-column>
        <!--商品名称-->
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <!--数量 -->
        <el-table-column prop="qty" label="数量"></el-table-column>
        <!--已退数量-->
        <el-table-column prop="exchangeQty" label="已换数量"></el-table-column>
        <!--换货数量-->
        <el-table-column prop="qtyNeedExchange" label="换货数量" width="120">
          <template slot-scope="scope">
            <input class="input-need"
                   :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                   v-model="scope.row.qtyNeedExchange"
                   type="text"
                   @change="handleBankChange(scope.$index,scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="buttonFooter">
            <el-button type="primary" @click="sureReturnGoods">确 定</el-button>
            <el-button @click="returnGoods=false">取 消</el-button>
      </div>
    </el-dialog>
    <!--换货dialog结束-->
    <!-- dialog错误信息提示 -->
    <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->
  </div>
</template>
<script>
  import buttonGroup from '../../../base/buttonGroup/buttonGroup'
  import dialogBox from '../../../base/dialog/dialog'
  import Dtable from '../../../base/2DTable/2DTable'
  import SearchGoods from '../../../base/SearchGoods/SearchGoods'
  import {ADD_BOOKMARK} from '../../../common/common.js'
  import {FILTER_MOTHED} from '../../../common/common.js'
  import config from "../../../../static/config.js";
  export default({
    name:'returnNoteDetails',
    components:{
      buttonGroup,
      dialogBox,
      Dtable,
      SearchGoods
    },
    created:function(){
      let self = this;
      self.loadData();
      // self.loadSelect();
    },
    data() {
      return{
        // sku弹窗
        SearchGoods1:false,
        chooseProductData:[],//选中的商品数据
        // --------------------------------------------------
        DimensionName:'returnNoteDetails',//二维表格数据模型前缀
        Dimensiondata:[],//二维表格数据集合
        DimensionKey:["size",'color','num'],//二维表格字段名称
        afterEditor:'',//编辑后表格的数据
        specification:[],//商品规格数组
        productCode:[],
        spec:[],
        specificationArr:[],//规格数组
        specificationArr1:[],//最终规格数组
        url:config.base.ip+':'+config.base.basicPort,//8082
        url2:config.base.ip+':'+config.base.omsPort,//8099
        // url:"http://192.168.100.107:8099",//提取公用服务器地址
        allData:'',//保存所有的数据
        Name:'',
        loading:true,
        returnGoods:false,//退货弹窗
        downloadShow:false,
        checked: true,
        ifShow:true,
        ifShow1:true,
        ifShow2:false,
        firstModify:false,//进入页面数据改变一次
        ouModify:false,
        ifModify:false,//判断主表是否修改过
        ifDoModify:false,//判断从表是否修改过
        backCancel:'',//判断信息提示确定的点击事件\
        dialogUserDefined:true,
        dialogUserDefined1:false,
        brand:[],
        oldData:[],
        productType:[],
        returnStockSelectArr:[],//退货仓下拉
        logisticsCompanyArr:[],//物流公司下拉
        selectedData:{
          brand:'',
          year:'',
          productCode:'',
          type:''
        },
        queryParams:{
          ProductCode:'',
          CategoryId:'',
          BrandId:'',
          SkipCount:0,
          MaxResultCount:1000,
        },
        productArray:[],//查询商品的结果
        //-----------------------
        activeName: 'bank',//tabs标签页默认激活name
        customerData:{//根据id获得的供应商信息
          //审计信息
          createdBy:'',
          createdTime:'',
          modifiedBy:'',
          modifiedTime:'',
          checker:'',
          checkTime:'',

          returnStockId:'',
          logisticsId:'',
          logisticsBillCode:'',
          buyerMsg:'',
          salerMsg:''
        },
        bankData:[],//根据groupId获得从表信息
        updataBankList:[],//需要修改的从表信息
        addBankList:[],//需要添加的从表信息
        x:0,
        y:0,
        z:0,
        xrows:[],
        yrows:[],
        zrows:[],
        multipleSelection:[],//需要删除的从表数组
        // multipleSelection1:[],//弹框选中的sku
        allBankDel:{
          ids:[]
        },
        idArrayBank:{//从表多项删除的id
          ids:[]
        },
        createBankParams:{//创建从表的参数
          groupId: 0,
          rtoId:'',
          skuId: '',
          skuCode: "",
          skuName: "",
          qty: '',
          retailPrice: '',
          discount: '',
          payPrice:'',
          payamount:'',
          webshopTransCode:'',
          id:'',
          // "isDefault": true
        },
        checkedAr:[],//进来时数据选中的默认框
        checkedAdd:[],//地址的默认选项
        //---确认删除-----------------
        dialogDelConfirm:false,//用户删除保存提示信息
        //---信息修改提示框------------
        dialogUserConfirm:false,//信息更改提示控制
        //-----------------------------
        who:'',//删除的是谁以及是否是多项删除
        whoId:'',//单项删除的id
        whoIndex:'',//单项删除的index
        //-----------------------------
        redBankAr:[],//显示小红标的数组
        InitBankData:[],//初始的从表数据
        //---使用组织---------------------------
        dialogOu:false,
        expand:{
          expandId_dialogOu:[],//默认dialog组织树形展开id
        },
        ouTreeDataRight:[],//
        ouDefaultPropsRight:{
          children: 'children',
          label: 'ouName',
          id:'id'
        },
        oudel:false,//保存删除
        ouindex:'',
        showCheck:false,//查看已选
        checkAllOu:false,//全选
        filterTextOu:'',//搜索
        addOu:'default',
        //-------------table--------------
        searchTableOu:'',//搜索框值
        ouCheckAll:[],//分配组织数据
        showPageTableOu:[],//展示分页后表格数据
        ouPageIndex:1,//分页的当前页码
        ouTotalPage:0,//当前分页总数
        ouOneItem:10,//每页有多少条信息
        ouPage:1,//当前页
        ouTotalItem:0,//总共有多少条消息
        ouTableLoading:false,
        //-----------------------------
        buttonGroup:[
          {
          text:'返回',
          class:'bt_back',
          icon:'icon-fanhui',
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
          disabled:false,
        },{
          text:'审核',
          class:'bt_in',
          icon:'icon-shenhe',
          disabled:false,
        },{
            text:'反审核',
            class:'bt_in',
            icon:'icon-shenhe',
            disabled:false,
          },{
          text:'挂起',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
          text:'解挂',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
          text:'换货',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
          text:'联查',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
          text:'导出',
          class:'bt_out',
          icon:'icon-out',
          disabled:false,
        },{
            text:'打印',
            class:'bt_print',
            icon:'icon-print',
            disabled:false,
        },{
          text:'辅助信息',
          class:'bt_in',
          icon:'',
          disabled:false,
        },{
          text:'取消',
          class:'bt_cancel',
          icon:'icon-quxiao',
          disabled:false,
        }
        ],//按钮组
        buttonGroup1:[
          {
          text:'增行',
          class:'bt_add',
          icon:'icon-zenghang',
          disabled:false,
        }
        ,{
          text:'删除',
          class:'bt_del',
          icon:'icon-shanchu',
          disabled:false,
        }
        ],
        //---dialog---------------
        dialogCommand:[],//对话框按钮组控制组
        dialogVisible:false,
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        ouItem:{
          returnStockName:'',
          returnStockId:'',
        },
        cuItem:{
          logisticsName:'',
          logisticsId:'',
        },
        dialogSetting:{
          message:'',//提示信息
          dialogName:'',//对话框名称
          dialogType:'',//对话框类型
        },
        topDetailInfo:{},//顶部第一个收起框的信息和最下面审核人的信息
        tableDetail:[],//详情中的表格数据
        arr:[],
        arr1:[],
        returnGoodsData:[],//换货
        exchangeData:[],//选中要换货的数据
        dataModel:'',
        array:[],
        dataItems1:[
          {
            id:1,
            groupId:1,
            rtoId:1,
            skuId:1,
            skuCode: 1,
            productCode:1,
            productName:1,
            productSpec:1,
            qty: 1,
            retailPrice: 1,
            discount: 1,
            payPrice:1,
            payamount:1,
            transCode:1,
            subtransCode:1,
            remark:1
          },
          {
            id:2,
            groupId:2,
            rtoId:2,
            skuId:2,
            skuCode: 2,
            productCode:2,
            productName:2,
            productSpec:2,
            qty: 2,
            retailPrice: 2,
            discount: 2,
            payPrice:2,
            payamount:2,
            transCode:2,
            subtransCode:2,
            remark:2
          },
          {
            id:3,
            groupId:3,
            rtoId:3,
            skuId:3,
            skuCode: 3,
            productCode:3,
            productName:3,
            productSpec:3,
            qty: 3,
            retailPrice: 3,
            discount: 3,
            payPrice:3,
            payamount:3,
            transCode:3,
            subtransCode:3,
            remark:3
          },
          {
            id:4,
            groupId:4,
            rtoId:4,
            skuId:4,
            skuCode: 4,
            productCode:4,
            productName:4,
            productSpec:4,
            qty: 4,
            retailPrice: 4,
            discount: 4,
            payPrice:4,
            payamount:4,
            transCode:4,
            subtransCode:4,
            remark:4
          }
        ],
        returnStockId:'',
        logisticsId:'',
        logisticsBillCode:'',
        buyerMsg:'',
        salerMsg:'',
        hangUpArr:[],//挂起id数组
        changeTimes:0,//监听修改状态
        changeTimes1:0,
        filterStockKey:'',
        filterlogisticKey:'',
        arrIds:[],
      }
    },
    filters: {//时间过滤
      date: function (input){
        let d = new Date(input);
        let year = d.getFullYear();
        let month = d.getMonth() + 1<10 ? '0'+ d.getMonth() : '' +d.getMonth()+1;
        let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        let hour = d.getHours()<10 ? '0'+ d.getHours() :'' + d.getHours();
        let minutes = d.getMinutes()<10 ? '0'+ d.getMinutes() :'' +  d.getMinutes();
        let seconds = d.getSeconds()<10 ? '0'+ d.getSeconds() :'' +  d.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      }
    },
    validators: {
      'topDetailInfo.returnStockId': function (value) {//退货仓
        return this.Validator.value(value).required().integer();
      },
      'topDetailInfo.logisticsId': function (value) {//物流公司
        return this.Validator.value(value).integer();
      },
      'topDetailInfo.logisticsBillCode': function (value) {//物流单号
        return this.Validator.value(value).maxLength(50);
      },
      'topDetailInfo.buyerMsg': function (value) {//买家留言
        return this.Validator.value(value).maxLength(80);
      },
      'topDetailInfo.salerMsg': function (value) {//卖家留言
        return this.Validator.value(value).maxLength(80);
      }
    },
    computed:{

      returnStockSelect1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockKey,this.returnStockSelectArr)
      },
      logisticsCompanyArr1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterlogisticKey,this.logisticsCompanyArr)
      },
      packUp(){//收起或展开文字处理
        if(this.ifShow==false){
          return '展开';
        }else{
          return '收起';
        }
      },
      packUp1(){//收起或展开文字处理
        if(this.ifShow1==false){
          return '展开';
        }else{
          return '收起';
        }
      },

    },
    watch:{
      allData: {
        handler: function (val, oldVal) {
          this.changeTimes++;
          if(this.changeTimes>=2){
            this.buttonGroup[1].disabled=true;//删除禁用
            this.buttonGroup[2].disabled=false;//保存可用
            this.buttonGroup[12].disabled=false;//取消可用
          }
        },
        deep: true
      },
    },
    methods:{

      // sku弹窗
      chooseProduct(index,row){
        this.SearchGoods1=true;
      },
      childByValue(childValue){//选取商品中选中的数据确定添加
        if(childValue.length==0){
          this.$message({
            type: 'warning',
            message: "请先勾选！"
          });
        }else if(childValue==='跳转'){
          ADD_BOOKMARK('商品档案','goodsFilesDetail',true,'default',this)
        }else{
          this.SearchGoods1=false;
          console.log(childValue);
          console.log(this.tableDetail);
          // 这里
         if(this.tableDetail[0].id==0){
           this.tableDetail.splice(0,1)
         }
         childValue.forEach((item)=>{
            let itemObj = {};
            itemObj.id=item.id;
            itemObj.groupId=item.groupId;//集团id
            itemObj.seq=item.groupId;//序号
            itemObj.soId=item.groupId;//来源单ID ,
            itemObj.soSeq=item.groupId;//来源单货品序号 ,
            itemObj.skuId=item.groupId;//SKUID--- ,
            itemObj.skuCode=item.groupId;//SKUIcode---
            itemObj.productCode=item.productCode;//商品编码 ,
            itemObj.productName =item.productName;//商品名称 ,
            itemObj.productSpec=item.productName;//商品规格
            itemObj.qty=item.groupId;//数量----- ,
            itemObj.retailPrice=item.retailPrice;//零售价
            itemObj.discount=item.discount;//折扣 ,
            itemObj.payPrice=item.groupId;//结算价---- ,
            itemObj.payamount=item.groupId;//结算额---- ,
            itemObj.transCode=item.groupId;//交易号---- ,
            itemObj.subtransCode=item.groupId;//子交易号---- ,
            itemObj.remark=item.groupId;//备注----
            let flag=false;
            for(let i in this.tableDetail){
                if(item.productCode==this.tableDetail[i].productCode){
                  // alert("相同！不能添加进去")
                  flag=true;
                  break;
                }else{
                  flag=false
                }
            }
            if(!flag){
              this.tableDetail.push(itemObj);
            }
          });
          console.log(this.tableDetail);
        }
        console.log(this.tableDetail.length);
        // this.chooseProductData=childValue;
      },
      InitTable(index,row){//二维表
        let self=this;
        self.dialogUserDefined1=true;
        self.productCode=row;
        console.log(row);
        console.log(self.productCode.id);
        // 商品规格（尺码，数量,颜色）
        self.$axios.gets(self.url+"/api/services/app/SkuManagement/GetSKUList",
          {
            // productID:self.productCode.id,
            productID:10,
          }).then(function(res) {
          console.log(res.result.skuSpecValue_GrandTable);
          for(let i in res.result){
            self.specificationArr.push(res.result[i].skuSpecValue_GrandTable);
            // 这里是获取后台给你的数据
          }
          console.log(self.specificationArr);  //这里都获取了
          for(let b in self.specificationArr){
            let ddd = {
              "id": self.specificationArr[b][0].skuId,
              "num": 0,
              "color": self.specificationArr[b][1].specValueName,
              "size": self.specificationArr[b][0].specValueName,
            };
            self.Dimensiondata.push(ddd);
          }
        });
      },
      addProductSpecification(){//商品编码弹窗确定
        let self=this;
        // 这时应该走一个根据skuId来查询和底下那张列表的字段相同的接口
        self.bankData=[];
        self.afterEditor=self.$store.state.DimensionTable[self.DimensionName+'Dimension'];
        // console.log(self.afterEditor);
        //对编辑后的数据处理，只要数量不为0，就把id提取出来
        console.log(self.afterEditor);
        console.log(self.Dimensiondata);
        self.dataItems1.forEach((item,index)=>{
          self.tableDetail.push(item);
        });
        self.dialogUserDefined1=false;
        // if(self.afterEditor==undefined){//数量全部为0则不添加
        //   self.$message({
        //     type: 'warning',
        //     message: "请先添加数量！"
        //   });
        // }else{
        //   for(let m in self.afterEditor){
        //     if(self.afterEditor[m].num!=0){
        //       self.Dimensiondata.forEach((item)=>{
        //         self.afterEditor[m].id=item.id;
        //
        //       });
        //     }
        //   }
        // }
        // console.log(self.afterEditor);
        // console.log(self.arrIds);

      },
      createFilter(queryString){
        return (areaPro) => {
          return (areaPro.areaName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      resdatetime:function(resdatetime){

        return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
      },
      //---获取数据--------------------------------------------
      loadData:function(){
        let self = this;
        self.buttonGroup[1].disabled=false;//删除可用
        self.buttonGroup[2].disabled=true;//保存禁用
        self.buttonGroup[12].disabled=true;//取消禁用
        if(self.$route.params.id!='default'){
          self.firstModify = false;
          //根据id获得的信息
          this.$axios.gets(self.url2+'/api/services/app/OmsRtoManagement/GetDetailsById',
            {id:self.$route.params.id}).then(function(res){
            console.log(res);
            self.allData=res;
            self.topDetailInfo=res.result.webrtoForDetailDto;
            self.tableDetail=res.result.webrtoDtlDtoList;//列表
            console.log(typeof self.topDetailInfo);
            if(self.topDetailInfo.platformId==1){
              self.topDetailInfo.platformName='淘宝';
            }else if(self.topDetailInfo.platformId==2){
              self.topDetailInfo.platformName="京东";
            }else if(self.topDetailInfo.platformId==3){
              self.topDetailInfo.platformName="唯品会";
            }
            if(self.topDetailInfo.createdTypeId==1){
              self.topDetailInfo.createdTypeName='下载';
            }else if(self.topDetailInfo.createdTypeId==2){
              self.topDetailInfo.createdTypeName="手工新增";
            }else if(self.topDetailInfo.createdTypeId==3){
              self.topDetailInfo.createdTypeName="合并";
            }else if(self.topDetailInfo.createdTypeId==4){
              self.topDetailInfo.createdTypeName="拆分";
            }
            console.log(self.topDetailInfo);
            console.log(self.tableDetail);
            self.createBankParams.rtoId = self.$route.params.id;
            self.allData = res.result;
            // 退货仓库下拉
            self.$axios.gets(self.url+"/api/services/app/StockManagement/GetRepositoryList",
              {
                defaultOuId:'',
                StockCode:'',
                StockName:'',
                AreaCode:'',
                StockTypeId:'',
                SkipCount: 0,
                MaxResultCount: 10
            }).then(function(res) {
              self.returnStockSelectArr = res.result.items;
              console.log(self.returnStockSelectArr)
            });
            // 物流公司下拉
            self.$axios.gets(self.url+"/api/services/app/ContactManagement/GetListByConditionSupplier",
              {
                ContactWorkPropertyId:1,
                SkipCount: 0,
                MaxResultCount: 1000
              }).then(function(res) {
              self.logisticsCompanyArr = res.result.items;
              console.log(self.logisticsCompanyArr);
            });
            //审计信息时间
            self.topDetailInfo.createdTime=self.resdatetime(new Date(self.topDetailInfo.createdTime));
            self.topDetailInfo.modifiedTime=self.resdatetime(new Date(self.topDetailInfo.modifiedTime));
            self.topDetailInfo.checkTime=self.resdatetime(new Date(self.topDetailInfo.checkTime));
            //银行数据
            self.bankData = self.tableDetail;
            self.InitBankData = self.deepCopy(self.tableDetail);
            // for(let i in self.bankData){
            //   if(self.bankData[i].isDefault == true){
            //     self.checkedAr = self.bankData[i]
            //   }
            // }
            console.log(self.downloadShow);
            console.log(self.addBankList);
            if(self.addBankList.length>0){
              self.downloadShow=true;
              console.log(self.downloadShow);
            }
            //加载完成拿回的下拉框的默认值
            self.ouItem.returnStockName = self.topDetailInfo.returnStockName;
            self.ouItem.returnStockId =  self.topDetailInfo.returnStockId;

            self.cuItem.logisticsName = self.topDetailInfo.logisticsName;
            self.cuItem.logisticsId = self.topDetailInfo.logisticsId;
          })
        }
      },
      filterStockMethod(query){
        this.filterStockKey=query;
      },
      filterlogisticMethod(query){
        this.filterlogisticKey=query;
      },
      // goodsSearch(index,row){//表格sku点击
      //   let self=this;
      //   self.dialogUserDefined=true;
      //   self.oldData=row;//点击的那条数据
      //   console.log(self.oldData);
      //   self.loadSelect();
      //   self.searchProduct();
      // },
      // productCodeIcon(){
      //   let self=this;
      //   self.dialogUserDefined1=true;
      //   self.InitTable();
      // },
      // newAddProduct(){//新增商品的按钮
      //   let self=this;
      //   self.$store.state.url='goodsFiles/goodsFilesList/'+"default";
      //   self.$router.push({path:this.$store.state.url})//点击切换路由
      // },
      // searchProduct(){
      //   let self = this;
      //   //查询商品
      //   self.$axios.gets('/api/services/app/ProductManagement/GetFilterProductList',self.queryParams).then(function(res){
      //     console.log(res);
      //     self.productArray = res.result.items;
      //     console.log(self.productArray);
      //   },function(res){
      //     console.log('err'+res)
      //   });
      // },
      // comfirm(){//确定
      //   let self=this;
      //   console.log(self.multipleSelection1);
      //   console.log(self.oldData);
      //   for(let i in this.multipleSelection1){
      //     self.oldData.skuCode=self.multipleSelection1[i].productCode;//商品编码
      //     self.oldData.skuId=self.multipleSelection1[i].skuName;//skuid
      //     self.oldData.skuName=self.multipleSelection1[i].productName;//商品名称
      //   }
      //   self.dialogUserDefined=false;
      // },
      // moreSearch(){
      //   let self=this;
      //   self.ifShow2=!self.ifShow2;
      // },
      // cancelDialog(){
      //   let self=this;
      //   self.dialogUserDefined=false;
      // },
      //开始---弹框下拉的数据------------------------------------------
      // loadSelect:function(){
      //   let self = this;
      //   //品牌
      //   self.$axios.gets('/api/services/app/BrandManagement/GetListByCondition',
      //     {
      //       BrandCode:'',
      //       BrandName:'',
      //       BrandEname:'',
      //       Status:'',
      //       Sorting:'',
      //       SkipCount:0,
      //       MaxResultCount:1000
      //     }
      //     ).then(function(res){
      //     console.log(res);
      //     self.brand = res.result.items;
      //     console.log(self.brand);
      //   },function(res){
      //     console.log('err'+res)
      //   });
      //   //商品类目
      //   self.$axios.gets('/api/services/app/CategoryManagement/GetListByCondition',
      //     {
      //       CategoryId:'',
      //       CategoryCode:'',
      //       CategoryName:'',
      //       IsService:'',
      //       Status:'',
      //       Sorting:'',
      //       SkipCount:0,
      //       MaxResultCount:1000,
      //     }
      //     ).then(function(res){
      //     console.log(res);
      //     self.productType=res.result.items;
      //     console.log(self.productType);
      //   },function(res){
      //     console.log('err'+res)
      //   });
      // },
      // paginationOu(checkAllata,oneItem,thisPage){//数据分页
      //   let _this=this;//checkAllata分页数据//oneItem每页有多少条信息//thisPage当前页
      //   let nowData=[];
      //   // console.log(checkAllata)
      //   let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
      //   let endIndex=startIndex + oneItem;
      //   if(checkAllata.length>0){
      //     if(endIndex>checkAllata.length){
      //       endIndex=checkAllata.length
      //     }
      //     for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
      //       // console.log(checkAllata[startIndex])
      //       nowData.push(checkAllata[startIndex])
      //     }
      //   }
      //   _this.ouTotalItem=checkAllata.length;//总共多少条数据
      //   _this.ouTotalPage=Math.ceil(checkAllata.length/oneItem);//有多少页
      //   return nowData
      // },
      // ouHandleCurrentChange(val){//页码改变
      //   let _this=this;
      //   _this.ouPage=val;
      //   _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
      // },
      //结束 --------------------------------------------------------------------------------
      //---保存、修改数据---------------------------------------------
      saveModify:function(){
        let self = this;
        // if(self.ifModify){
          self.saveCustomerModify();
        // }
      },
      saveCustomerModify:function(){//修改所有
        let self = this;
        $('.tipsWrapper').css({display:'block'});
        //console.log(self.customerData)
        self.$validate().then(function(success){
          if(success){
            $('.tipsWrapper').css({display:'none'});
            for(let i in self.tableDetail){
              if(self.tableDetail[i].id==0){
                self.$message({
                  type: 'warning',
                  message: '请先编辑明细表的新增项'
                });
                return;
              }
            }
            let submitData = {
              //updateWebrtoDtlDtoList表格数据
              //updateWebrtoDto 审计信息和上面
              updateWebrtoDto:self.topDetailInfo,
              updateWebrtoDtlDtoList:self.bankData,
            };
            console.log(submitData);
            self.$axios.puts(self.url2+'/api/services/app/OmsRtoManagement/UpdateOmsWebrto',submitData).then(function(res){
              self.open('修改成功','el-icon-circle-check','successERP');
              self.ifModify = false;
              self.buttonGroup[1].disabled=false;//删除禁用
              self.buttonGroup[2].disabled=true;//保存可用
              self.buttonGroup[12].disabled=true;//取消可用
              self.changeTimes = 1;
            },function(res){
              self.dialogVisible = true;
              self.dialogSetting.dialogType = "submit";
              self.dialogSetting.dialogName = 'saveDialog';
              self.dialogSetting.message = "信息提报有误";
              self.errorTips.message = res.error.message;
              self.errorTips.details = '';
              self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            })
          }
        });

      },
      btnClick(btn){//按钮组点击事件
        let self = this;
        if(btn=="返回"){
          if(self.$route.params.id!=="default"&&self.changeTimes<2){//新增操作
            // alert('小于2');
            self.back();
          }else{
          // else if(this.$route.params.id!=="default"&&self.changeTimes>2){
          //   alert('大于2');
            self.dialogSetting.dialogName='backDialog';
            self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
            self.dialogSetting.dialogType="confirm";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            self.dialogVisible=true;
          }
        }else if(btn=="删除"){
          self.delSupplie()
        }else if(btn=="保存"){
          self.saveModify();
        }else if(btn=="取消"){
          if(self.$route.params.id=="default"&&self.changeTimes<2){//新增操作
            self.back();
          }else{
            self.dialogSetting.dialogName='backDialog';
            self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
            self.dialogSetting.dialogType="confirm";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            self.dialogVisible=true;
          }
        }else if(btn=="换货"){
          self.changeGoods();
        }else if(btn=="挂起"){
          self.hangUp()
        }else if(btn=="解挂"){
          self.relieveSuspendRto()
        }else if(btn=="审核"){
          self.checkOrder()
        }else if(btn=="反审核"){
          self.insteadCheck()
        }
      },
      btnClick1(btn){//从表按钮组点击事件
        let self = this;
        if(btn=="增行"){
          self.addColbank();
        }else if(btn=="删除"){
          self.delMoreBank();
        }else if(btn=="辅助功能"){

        }
      },
      //----------------------------------------------------
      //---从表增行--------------------------------------------
      addColbank:function(){//增行
        let self = this;
        self.x++;
        let newCol = 'newCol'+self.x;
        self.xrows.newCol ={
          id: 0,
          groupId: 0,
          seq: '',
          soId: '',
          soSeq: '',
          skuId: '',
          skuCode: '',
          productCode: '',
          productName: '',
          productSpec: '',
          qty: '',
          retailPrice: '',
          discount: '',
          payPrice: '',
          payamount: '',
          transCode: '',
          subtransCode: '',
          remark: '',
          index:self.x
        };
        if(self.tableDetail.length!==0){
          if(self.tableDetail[0].id==0){
            this.$message({
              type: 'warning',
              message: "请先编辑保存新增项！"
            });
            return
          }else{
            self.bankData.unshift(self.xrows.newCol);//向数组开头新添加一个或更多元素--列表所有的数据
            self.addBankList.unshift(self.xrows.newCol);//增行的
            console.log(self.bankData);
            console.log(self.addBankList);
          }
        }else{
          self.bankData.unshift(self.xrows.newCol);//向数组开头新添加一个或更多元素--列表所有的数据
          self.addBankList.unshift(self.xrows.newCol);//增行的
          console.log(self.bankData);
          console.log(self.addBankList);
        }

      },
      //---------------------------------------------------
      //---从表修改-----------------------------------------
      handleBankChange:function(index,row){
        let self = this;
        let flag = false;
        self.ifDoModify = true;
        if(self.updataBankList.length==0&&row.id>0){
          flag = true;
        }else if(self.updataBankList.length>=1&&row.id>0){
          for(let i in self.updataBankList){
            if(row.id != self.updataBankList[i].id){
              flag = true;
              // console.log(flag)
            }else{
              flag= false;
              break;
            }
          }
        };
        if(flag){
          self.updataBankList.push(row);
          // console.log(self.updataBankList)
        }
      },
      //---------------------------------------------------
      // 换货
      changeGoods(){
        let self=this;
        console.log(self.topDetailInfo.groupId);//
        console.log(self.topDetailInfo.shopId);//
        console.log(self.topDetailInfo.billCode);//
        self.$axios.gets(self.url2+'/api/services/app/OmsRtoManagement/GetWebrtoDtlExchange',
          {
            BillCode:self.topDetailInfo.billCode,//销售订单号
            GroupId:self.topDetailInfo.groupId,//集团id
            ShopId:self.topDetailInfo.shopId//店铺id
          }
        ).then(function(res){
          self.loading=false;
          self.returnGoods=true;
          self.returnGoodsData=res.result;
          console.log(res);
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      sureReturnGoods(){//确定换货
        let self=this;
        if(self.exchangeData.length>0){
          for(let i in self.exchangeData){
            self.exchangeData[i].qtyNeedExchange=parseInt(self.exchangeData[i].qtyNeedExchange);
          }
          self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/JumpToExchange',
            {
              jumpWebrtoDto:{
                billCode:self.topDetailInfo.billCode,//销售订单号
                groupId:self.topDetailInfo.groupId,//集团id
                shopId:self.topDetailInfo.shopId//店铺id
              },
              jumpWebrtoDtlDtoList:self.exchangeData
            }
          ).then(function(res){
            self.returnGoods=false;
            self.open('换货成功！','el-icon-circle-check','successERP');
          },function(res){
            self.returnGoods=false;
            self.dialogVisible = true;
            self.dialogSetting.dialogType = "submit";
            self.dialogSetting.dialogName = 'cancelDialog';
            self.dialogSetting.message = "信息提报有误";
            self.errorTips.message = res.error.message;
            self.errorTips.details = '';
            self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }else{
          self.$message({
            type: 'warning',
            message: "请先勾选！"
          });
        }
      },
      hangUp(){//挂起操作
        let self=this;
        self.hangUpArr.push(parseInt(self.$route.params.id));
        console.log(self.$route.params.id);
        console.log(self.hangUpArr);
        self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/SuspendRto', self.hangUpArr).then(function(res){//
          self.open('挂起成功','el-icon-circle-check','successERP');
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      relieveSuspendRto(){//解挂
        let self=this;
        let ids=[];
        ids.push(parseInt(self.$route.params.id));
        console.log(self.$route.params.id);
        console.log(self.ids);
        self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/RelieveSuspendRto', ids).then(function(res){//
          self.open('解挂成功！','el-icon-circle-check','successERP');
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      checkOrder(){//审核
        let self=this;
        let checkId=parseInt(self.$route.params.id);
        console.log();
        self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/Check',{id:checkId}).then(function(res){//
          self.open('审核成功！','el-icon-circle-check','successERP');
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      insteadCheck(){//反审核
        let self=this;
        let checkId=parseInt(self.$route.params.id);
        console.log(checkId);
        self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/InsteadCheck',{id:checkId}).then(function(res){
          self.open('反审核成功！','el-icon-circle-check','successERP');
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      //---从表复选框---------------------------------------
      handleSelectionChange:function(val){//点击复选框选中的数据
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleSelectionChange1(val){
        console.log(val);
        this.multipleSelection1 = val;
        console.log(this.multipleSelection1);
      },
      handleSelectionChangeGoods(val){//换货选中数据
        this.exchangeData=val;
        console.log(this.exchangeData);
      },
      //---从表单项删除-------------------------------------
      handleDelete:function(index,row,who){
        let self = this;
        self.who = who;
        self.whoIndex = index;
        self.whoId = row.id;
        if(self.who == 1){
          if(self.whoId>0){
            self.bankData.splice(self.whoIndex,1);
          }else{
            self.bankData.splice(self.whoIndex,1);
            self.addBankList.splice(self.whoIndex,1);
          }
        }
      },
      //---从表多项删除---------------------------------------------
      delMoreBank:function(){
        let self = this;
        console.log(self.multipleSelection);//选中的数据,
        console.log(self.tableDetail);
        if(self.multipleSelection.length==0){
          self.$message({
            type: 'warning',
            message: "请先勾选删除项！"
          });
        }else{
          for(let i=0;i<self.multipleSelection.length;i++){
            let index=self.tableDetail.indexOf(self.multipleSelection[i]);
            if(index<0){
              return
            }
            self.tableDetail.splice(index,1);
          }
        }
        console.log(self.bankData);
        console.log(self.tableDetail);
      },
      Modify:function(){//判断主表是否修改过
        let self = this;
        self.ifModify = true;
      },
      //-----------------------------------------------------------
      delSupplie:function(){//删除此页退货单页面
        let self = this;
        let deteleId=parseInt(self.$route.params.id);
        self.$axios.deletes(self.url2+'/api/services/app/OmsRtoManagement/DeleteOmsWebrto', {id:deteleId}).then(function(res){//
          self.open('删除成功','el-icon-circle-check','successERP');
          self.$store.state.url = "/returnNote/returnNoteList/default";
          self.$router.push({path:self.$store.state.url})//点击切换路由
        },function(res){
          self.dialogVisible = true;
          self.dialogSetting.dialogType = "submit";
          self.dialogSetting.dialogName = 'cancelDialog';
          self.dialogSetting.message = "信息提报有误";
          self.errorTips.message = res.error.message;
          self.errorTips.details = '';
          self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      //---路由------open------------------------------------------

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
      //------------------------------------------------------

      //---修改返回提示-----------------------------------------
      back(){//点击返回跳转
        this.$store.state.url = "/returnNote/returnNoteList/default";
        this.$router.push({path:this.$store.state.url})//点击切换路由
      },
      isBack(){
        let self=this;
        if(self.ifModify){
          self.dialogSetting.dialogName='backDialog';
          self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
          self.dialogSetting.dialogType="confirm";
          self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
          self.dialogVisible=true;
          self.backCancel = 1;
        }else{
          self.back()
        }
      },
      Cancel(){
        let self = this;
        if(self.ifModify){
          self.dialogSetting.dialogName='cancelDialog';
          self.dialogSetting.message="此操作将忽略您的更改，是否继续";
          self.dialogSetting.dialogType="confirm";
          self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
          self.dialogVisible=true;
          self.backCancel = 2;
          $('.tipsWrapper').css({display:'none'})
        }
      },
      sureDoing:function(){
        let self = this;
        if(self.backCancel ==1){
          self.back();
        }else if(self.backCancel == 2){
          self.loadData();
          self.ifModify = false;
          self.dialogVisible=false;
        }
      },
      //-------------------------------------------------------
      //---提示错误----------------------------------------------
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
        // $('.tipsWrapper').css({display:'none'})
        $('.tipsWrapper').each(function(){
          if($(e.target).parent('.el-input').parent('.el-select').hasClass($(this).attr('name'))){
            $(this).addClass('display_block')
          }else{
            $(this).removeClass('display_block')
          }
        })
      },
      showErrprTipsRangedate(e){
        // $('.tipsWrapper').css({display:'none'})
        $('.tipsWrapper').each(function(){
          if($(e.$el).hasClass($(this).attr('name'))){
            $(this).addClass('display_block')
          }else{
            $(this).removeClass('display_block')
          }
        })
      },
      showErrprTipsTextArea(e){
        // $('.tipsWrapper').css({display:'none'})
        $('.tipsWrapper').each(function(){
          if($(e.target).parent('.el-textarea').hasClass($(this).attr('name'))){
            $(this).addClass('display_block')
          }else{
            $(this).removeClass('display_block')
          }
        })
      },
      //----------------------------------------------------
      //----------------------------------------------------
      getType(obj){
        //tostring会返回对应不同的标签的构造函数
        let toString = Object.prototype.toString;
        let map = {
          '[object Boolean]'  : 'boolean',
          '[object Number]'   : 'number',
          '[object String]'   : 'string',
          '[object Function]' : 'function',
          '[object Array]'    : 'array',
          '[object Date]'     : 'date',
          '[object RegExp]'   : 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]'     : 'null',
          '[object Object]'   : 'object'
        };
        if(obj instanceof Element) {
          return 'element';
        }
        return map[toString.call(obj)];
      },
      deepCopy(data){
        let self = this;
        let type = self.getType(data);
        let obj;
        if(type === 'array'){
          obj = [];
        } else if(type === 'object'){
          obj = {};
        } else {
          //不再具有下一层次
          return data;
        }
        if(type === 'array'){
          for(let i = 0, len = data.length; i < len; i++){
            obj.push(self.deepCopy(data[i]));
          }
        } else if(type === 'object'){
          for(let key in data){
            obj[key] = self.deepCopy(data[key]);
          }
        }
        return obj;
      },
      dialogClick(parmas){//对话框点击
        let self = this;
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="delDialog"){//删除对话框
            self.$axios.deletes(self.url2+'/api/services/app/OMSWebrtoMangement/DeleteOmsWebrto',{id:self.$route.params.id}).then(function(res){
              self.open('删除成功','el-icon-circle-check','successERP');
              self.back();
            },function(res){
              // self.dialogVisible=true;
              self.dialogSetting.dialogType="confirm";
              self.dialogSetting.dialogName='delErrDialog';
              self.dialogSetting.message="删除失败";
              self.errorTips.message=res.error.message;
              self.errorTips.details='';
              self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
            })
          }else if(parmas.dialogName=="backDialog"){//返回
            self.back();
            self.dialogVisible=false;
          }else if(parmas.dialogName=="saveDialog"){//保存
            self.dialogVisible=false;
          }else if(parmas.dialogName=="cancelDialog"){
            self.dialogVisible=false;
            self.sureDoing();
          }else if(parmas.dialogName=="delErrDialog"){//
            self.dialogVisible=false;
          }
        }else if(parmas.dialogButton=="取消"){
          self.dialogVisible=false;
        }
      },
      dialogColse(){//对话框关闭回调事件
        this.dialogVisible=false;
      },
      //----------------------------------------------------
      test:function(){
        let self = this;
        console.log(self.checkedAr);
        console.log(self.addBankList);
        console.log(self.updataBankList)
      },
    }
    })
</script>

<style scoped>
  .supplier-modify{
    font-family: 'microsoft yahei';
  }
  /*收起*/
  .supplier-modify .upBt{
    font-size: 12px;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .supplier-modify .upBt i{
    transition: all 0.5s;
      -moz-transition: all 0.5s;
      -webkit-transition: all 0.5s;
      -o-transition: all 0.5s;
    color:#cacaca;
    margin-left: 5px;
  }
  .supplier-modify .upBt i.rotate{
    transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
  }

  .supplier-modify  .errorTips{
    margin-bottom: 10px;
  }

  .supplier-modify .el-row{
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
  }
  .supplier-modify .el-row:last-child{
    border-bottom:none;
  }

  .supplier-modify .tabZoo{
    overflow: hidden;
    background-color: #fff;
  }

  .supplier-modify  .getPadding,.tabZoo .el-tabs__nav-scroll{
    padding: 0 10px;
  }
  .supplier-modify .tabZoo .auditInformation{
    margin-top: 15px;
    background:#fff!important;
  }

  .supplier-modify .tabZoo .erp_bt:first-child{
    margin-left: 0;
  }
  .supplier-modify .nopadding{
    padding-top: 0;
  }
  .supplier-modify .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
  }
  .supplier-modify .el-table td{
    padding: 3px 0;
  }
  .supplier-modify .el-table__body{
    text-align: center;
  }
  .supplier-modify .el-table .cell{
    padding-left:0;
    padding-right:0;
  }
  .mb10{
    margin-bottom: 10px;
  }
  .input-bgw{
    background: white;
    text-align: center;
  }
  .input-bgp{
    background: #FAFAFA;
    text-align: center;
  }

  .supplier-modify .el-input__inner{
    height:35px !important;
    border:1px solid white;
  }
  .supplier-modify .all-table .el-input__inner{
    height:35px !important;
    text-align: center !important;
    border:none !important;
  }
  .supplier-modify .bgw .el-input__inner{
    background-color:white;
    text-align: center;
  }
  .supplier-modify .bgg .el-input__inner{
    background-color:#FAFAFA;
    text-align: center;
  }
  .supplier-modify .bgp .el-input__inner{
    background-color:#FAFAFA;
    text-align: center;
  }
  .supplier-modify .el-select-dropdown__item{
    text-align: center;
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
  .supplier-modify .checkBoxOuUser{
    height: 50px;
    background-color: #f2f2f2;
    line-height: 50px;
  }
  .supplier-modify .square_el{
    margin-right:5px;
    margin-left: 10px;
  }
  .supplier-modify .add{
    position: absolute;
    top: 6px;
    left: 18%;
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
  }
  .supplier-modify .search_input_group{
    margin-top:6px;
  }
  .supplier-modify .dialogOu .search_input_group{
    width:40%;
    position: absolute;
    top: 2px;
    right: 6%;
  }
  .supplier-modify .dialogOu .search_input_group .search_input_wapper{
    width:100%;
  }
  .supplier-modify .inline-block-need{
    display: inline-block;
  }
  /*新加*/
  .supplier-modify .text {
    margin-bottom: 15px;
    border:none;
  }
  .supplier-modify .text .el-col{
    text-align:center;
  }
  .supplier-modify .nopadding .inline-block-need{
    line-height:33px;
    margin-left:10px;
    border-bottom:2px solid #3cc;
  }
  .erp_bt:first-child{
    margin-left:0;
  }

  /*新增*/
  input.input-need{
    width:65%;
  }
  .abimg1,.abimg2{
    position: absolute;
    top:10px;
  }
  .addnewGoods{
    border:none;
    background:#3cc;
    color:#fff;
    padding:5px 6px;
    border-radius:4px;
  }
  .supplier-modify .el-input__inner{
    border: 1px solid  #dcdfe6;
    height:35px !important;
  }
  .userDefined{
    height:27px;
  }
  .supplier-modify .el-row{
    border-bottom:1px solid #CCC;
  }
  .bgcolor{
    width:100%;
    margin-bottom:10px;
  }

  .pt10{
    padding-top:0;
  }
  .info{
    margin:0!important;
    height:30px;
  }
  .info label{
    margin-right:0;
  }
  .info>label{
    width:94px!important;
    line-height:30px;
  }
  .info .el-select{
    height:30px;
    line-height:30px;
  }

  .el-dialog__body{
    padding:10px 15px;
  }
 .el-col-14{
    width:100%;
    text-align:center;
  }
  div.buttonFooter{
    text-align:center;
    padding-bottom:20px;
  }
  .el-button--primary{
    padding: 9px 20px;
  }
  .el-button--default{
    padding: 9px 20px;
  }
  div.topData{
    line-height:35px;
    text-align:left;
  }
  div.info{
    /*margin-bottom:0;*/
  }
  div.returnStock,div.logisticsCompany,div.logisticsBillCode{
    /*margin-top:10px;*/
  }
  .erp_bt:first-child{
    margin-left:2px;
  }
  .pt5 .bt_add{
    margin-left:0;
  }
  .mt10{
    height:100%;
  }
  .supplier-modify .el-row{
    border:none;
  }
  #wapper .el-input__inner{
    height:27px !important;
  }
  .search-btn{
    margin-bottom:10px;
    background:#3cc;
  }

  .el-dialog{
    width:60%;
  }
  .supplier-modify .el-input__inner{
    border:none;
  }
  .rangeDate .el-input__inner{
    width:100% !important;
  }
  .supplier-modify .getPadding{
    padding:0;
  }
  h4.h4 {
    text-indent:10px;
    padding:10px 0 0 0;
  }
  .getPadding1{
    padding:10px 10px 0 0;
  }
  .Search-Goods .el-dialog{
    width:78%!important;
    margin-right: auto!important;
    margin-bottom: 50px!important;
    margin-left: auto!important;
  }
  .Search-Goods{
    width:80%!important;
    margin:0 10%!important;
  }

  .el-dialog__body .dimension{
    width:100%!important;
  }
  .specifications{
    margin-bottom:10px;
  }
  div.dialog-footer{
    text-align: center;
    padding-bottom:20px;
  }
  .Search-Goods div.el-row{
    max-height:550px!important;
    overflow-y: auto!important;
    padding:0 20px!important;
  }
</style>
<style>
  .Search-Goods .Goods-box{
    max-height:550px;
    overflow: auto;
  }
</style>



