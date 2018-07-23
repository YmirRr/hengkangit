<template>
  <div class="supplier-modify">
    <!--第一收起个模块-->
    <el-row class="fixed">
      <el-col :span="24" class="bg-white">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
        <span @click="ifShow = !ifShow" class="upBt">{{packUp}}<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
        <div class="sealWapper">
          <div class="seal">
            <div class="seal1">
              <div class="seal2">
                <div class="seal3">
                  <span>已生效</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow">
        <el-row class="bg-white ft12 pr10 pt10">
          <el-col :span="24" class="getPadding">
            <!--错误提示-->
            <div class="tipsWrapper">
              <div class="errorTips">
                <p class="msgDetail">错误提示：
                  <span :class="{block : !validation.hasError('topDetailInfo.shopId')}">
                    店铺{{ validation.firstError('topDetailInfo.shopId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.logisticsId')}">
                    物流公司{{ validation.firstError('topDetailInfo.logisticsId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.waybillCode')}">
                    物流单号{{ validation.firstError('topDetailInfo.waybillCode')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.buyerNick')}">
                    买家昵称{{ validation.firstError('topDetailInfo.buyerNick')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.distributionModeid')}">
                    物流方式{{ validation.firstError('topDetailInfo.distributionModeid')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.deliveryShopId')}">
                    发货店铺{{ validation.firstError('topDetailInfo.deliveryShopId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.deliveryStockId')}">
                    发货仓库{{ validation.firstError('topDetailInfo.deliveryStockId')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.memberCode')}">
                    会员卡号{{ validation.firstError('topDetailInfo.memberCode')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.buyerMsg')}">
                    买家留言{{ validation.firstError('topDetailInfo.buyerMsg')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.salerNote')}">
                    卖家备注{{ validation.firstError('topDetailInfo.salerNote')}}
                  </span>
                  <!----------------------------------------------------------------------->
                  <span :class="{block : !validation.hasError('topDetailInfo.consignee')}">
                    收货人{{ validation.firstError('topDetailInfo.consignee')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.consigneeMobile')}">
                    手机{{ validation.firstError('topDetailInfo.consigneeMobile')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.consigneePhone')}">
                    座机{{ validation.firstError('topDetailInfo.consigneePhone')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.postCode')}">
                    邮编{{ validation.firstError('topDetailInfo.postCode')}}
                  </span>

                  <!--<span :class="{block : !validation.hasError('proIDT')}">-->
                    <!--收货地址/省{{ validation.firstError('proIDT') }}-->
                  <!--</span>-->
                  <!--<span :class="{block : !validation.hasError('cityIdT')}">-->
                    <!--收货地址/市{{ validation.firstError('cityIdT') }}-->
                  <!--</span>-->
                  <!--<span :class="{block : !validation.hasError('quIdT')}">-->
                    <!--收货地址/区{{ validation.firstError('quIdT') }}-->
                  <!--</span>-->

                  <span :class="{block : !validation.hasError('topDetailInfo.completeAddress')}">
                    详细地址{{ validation.firstError('topDetailInfo.completeAddress')}}
                  </span>
                  <!----------------------------------------------------------------------->
                  <span :class="{block : !validation.hasError('topDetailInfo.postage')}">
                    买家邮费{{ validation.firstError('topDetailInfo.postage')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.payamount')}">
                    订单结算金额{{ validation.firstError('topDetailInfo.payamount')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.actualPayamount')}">
                    线上实付金额{{ validation.firstError('topDetailInfo.actualPayamount')}}
                  </span>
                  <span :class="{block : !validation.hasError('topDetailInfo.preferentialAmount')}">
                    促销优惠金额{{ validation.firstError('topDetailInfo.preferentialAmount')}}
                  </span>
                </p>
              </div>
            </div>
            <!--显示的信息-->
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 单据号：</label>
                <div class="el-select topData">{{topDetailInfo.billCode}}</div><!--要走接口的，现在还没有，等待中-->
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 订单来源：</label>
                <div class="el-select topData">
                  <span>{{topDetailInfo.platformName}}</span>/
                  <span>{{topDetailInfo.createdTypeName}}</span>
                  <span style="display:none">{{topDetailInfo.platformId}}</span>
                  <span style="display:none">{{topDetailInfo.createdTypeId}}</span>
                </div>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 销售类型：</label>
                <div class="el-select topData">
                  <span>{{topDetailInfo.soTypeName}}</span>
                  <span style="display:none;">{{topDetailInfo.soTypeId}}</span>
                </div>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 未审原因：</label>
                <div class="el-select topData">{{topDetailInfo.unreviewedReason}}</div>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label>  交易类型：</label>
                <div class="el-select topData">
                  <span>{{topDetailInfo.transTypeName}}</span>
                  <span style="display:none;">{{topDetailInfo.transTypeId}}</span>
                </div>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 网店交易号：</label>
                <div class="el-select topData">{{topDetailInfo.transCode}}</div>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label> 支付交易号：</label>
                <div class="el-select topData">{{topDetailInfo.payCode}}</div>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor info" style="text-align:center;">
                <label>交易状态：</label>
                <div class="el-select topData">
                  <span>{{topDetailInfo.transStatusName}}</span>
                  <span style="display:none;">{{topDetailInfo.transStatus}}</span>
                </div>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>店铺</label>
                <el-select filterable
                           v-model="topDetailInfo.shopId"
                           :filter-method="filterMethod"
                           class="status"
                           @change='Modify()'
                           placeholder=""
                           @focus="showErrprTipsSelect"
                           :class="{redBorder : validation.hasError('topDetailInfo.shopId')}">
                  <el-option v-for="item in WebshopId1"
                             :key="item.shopId"
                             :label="item.shopName"
                             :value="item.shopId">
                    <span style="float: left">{{item.shopCode}}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
                  </el-option>
                </el-select>
              </div>
               </el-col>
               <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>物流公司</label>
                <el-select filterable
                           v-model="topDetailInfo.logisticsId"
                           :filter-method="filterlogisticMethod"
                           class="status"
                           @change='Modify()'
                           placeholder=""
                           @focus="showErrprTipsSelect"
                           :class="{redBorder : validation.hasError('topDetailInfo.logisticsId')}">
                  <el-option v-for="item in logisticsCompanyfilter"
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
                <div class="bgcolor">
                <label>物流单号</label>
                <el-input v-model="topDetailInfo.waybillCode"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.waybillCode')}"></el-input>
              </div>
               </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor" id="buyerNickName">
                <label>买家昵称</label>
                <el-input v-model="topDetailInfo.buyerNick"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.buyerNick')}"></el-input>
                <img class="nickNameImg" src="../../../../static/image/common/newstips.png"/>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label>物流方式</label>
                <el-select v-model="topDetailInfo.distributionModeid"
                           class="status"
                           @change='Modify()'
                           placeholder=""
                           @focus="showErrprTipsSelect"
                           :class="{redBorder : validation.hasError('topDetailInfo.distributionModeid')}">
                  <el-option v-for="item in logisticsWay"
                             :key="item.itemValue"
                             :label="item.itemName"
                             :value="item.itemValue"></el-option>
                </el-select>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label>发货店铺</label>
                <el-select v-model="topDetailInfo.deliveryShopId"
                           class="status"
                           :filter-method="filterStockMethod"
                           @change='Modify()'
                           placeholder=""
                           @focus="showErrprTipsSelect"
                           :class="{redBorder : validation.hasError('topDetailInfo.deliveryShopId')}">
                  <el-option v-for="item in sendShopfilter"
                             :key="item.id"
                             :label="item.shopName"
                             :value="item.id">
                    <span style="float: left">{{item.shopCode}}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
                  </el-option>
                </el-select>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>发货仓库</label>
                <el-select filterable v-model="topDetailInfo.deliveryStockId"
                           class="status"
                           :filter-method="filterStockshopMethod"
                           @change='Modify()'
                           placeholder=""
                           @focus="showErrprTipsSelect"
                           :class="{redBorder : validation.hasError('topDetailInfo.deliveryStockId')}">
                  <el-option v-for="item in stockfilter"
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
                <div class="bgcolor" id="cardNumber">
                <label>会员卡号</label>
                <el-input v-model="topDetailInfo.memberCode"
                          placeholder=""
                          class="regAddress"
                          @change='Modify()'
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.memberCode')}"></el-input>
                <img class="cardNumberImg" @click="cardNumberJump" src="../../../../static/image/common/right.png"/>
              </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                <label>买家留言</label>
                <el-input v-model="topDetailInfo.buyerMsg"
                          placeholder=""
                          @change='Modify()'
                          @focus="showErrprTips"
                          class="manager"
                          :class="{redBorder : validation.hasError('topDetailInfo.buyerMsg')}"></el-input>
              </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                <label>卖家备注</label>
                <el-input v-model="topDetailInfo.salerNote"
                          placeholder=""
                          @change='Modify()'
                          @focus="showErrprTips"
                          class="manager"
                          :class="{redBorder : validation.hasError('topDetailInfo.salerNote')}"></el-input>
              </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!--第2个收起个模块-->
    <el-row class="nopadding mt10">
      <div class="tabZoo inline-block-need">
        <el-col :span="24">
          <div class="sendInfo">发货信息</div>
        </el-col>
      </div>
      <span @click="ifShow3 = !ifShow3" class="upBt">{{packUp3}}<i class="el-icon-arrow-down" @click="ifShow3 = !ifShow3" :class="{rotate : !ifShow2}"></i></span>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow3">
        <el-row class="bg-white ft12 pr10 pt10">
          <el-col :span="24" class="getPadding">
            <!--下拉选择和输入框修改明细-->
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>收货人</label>
                <el-input v-model="topDetailInfo.consignee"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.consignee')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>手机</label>
                <el-input v-model="topDetailInfo.consigneeMobile"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.consigneeMobile')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label><small>*</small>座机</label>
                <el-input v-model="topDetailInfo.consigneePhone"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.consigneePhone')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor">
                <label>邮编</label>
                <el-input v-model="topDetailInfo.postCode"
                          placeholder=""
                          @change='Modify()'
                          @focus="showErrprTips"
                          class="manager"
                          :class="{redBorder : validation.hasError('topDetailInfo.postCode')}"></el-input>
              </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                <label><small>*</small>收货地区</label>
                <div class="areaBox">
                  <el-select v-model="proIDT" class="areaDrop" placeholder="选择省" @change='chooseProvinceT(proIDT)'>
                    <el-option v-for="item in areaProArray" :key="item.id" :label="item.areaName" :value="item.id">
                    </el-option>
                    <el-option v-show='false' label='无' :value="provinceValue">
                    </el-option>
                  </el-select>
                  <el-select v-model="cityIdT" class="areaDrop" placeholder="选择市"  @change='chooseCityT(cityIdT)'>
                    <el-option v-for="item in areaCityArray" :key="item.id" :label="item.areaName" :value="item.id">
                    </el-option>
                    <el-option v-show="false" label="无" :value="cityValue">
                    </el-option>
                  </el-select>
                  <el-select v-model="quIdT" class="areaDrop" placeholder="选择区" @change='chooseDisT(quIdT)'>
                    <el-option v-for="item in areaDisArray" :key="item.id" :label="item.areaName" :value="item.id">
                    </el-option>
                    <el-option v-show="false" label="无" :value="areaValue">
                    </el-option>
                  </el-select>
                </div>
              </div>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <div class="bgcolor area">
                <label><small>*</small>详细地址</label>
                <el-input v-model="topDetailInfo.completeAddress"
                          placeholder=""
                          @change='Modify()'
                          @focus="showErrprTips"
                          class="manager"
                          :class="{redBorder : validation.hasError('topDetailInfo.completeAddress')}"></el-input>
              </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!--第3个收起个模块-->
    <el-row class="nopadding mt10">
      <div class="tabZoo inline-block-need">
        <el-col :span="24">
          <div>订单金额信息</div>
        </el-col>
      </div>
      <span @click="ifShow5 = !ifShow5" class="upBt">{{packUp5}}<i class="el-icon-arrow-down" @click="ifShow5 = !ifShow5" :class="{rotate : !ifShow5}"></i></span>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow5">
        <el-row class="bg-white ft12 pr10 pt10">
          <el-col :span="24" class="getPadding">
            <!--显示的信息-->
            <!--下拉选择和输入框修改明细-->
            <el-row>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor orderAmount">
                <label><small>*</small>买家邮费</label>
                <el-input v-model="topDetailInfo.postage"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.postage')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor orderAmount">
                <label><small>*</small>订单结算金额</label>
                <el-input v-model="topDetailInfo.payamount"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.payamount')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor orderAmount">
                <label><small>*</small>线上实付金额</label>
                <el-input v-model="topDetailInfo.actualPayamount"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.actualPayamount')}"></el-input>
              </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                <div class="bgcolor orderAmount">
                <label>促销优惠金额</label>
                <el-input v-model="topDetailInfo.preferentialAmount"
                          placeholder=""
                          @change='Modify()'
                          class="regAddress"
                          @focus="showErrprTips"
                          :class="{redBorder : validation.hasError('topDetailInfo.preferentialAmount')}"></el-input>
              </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <!--第4个收起的模块-->
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
              <el-table-column prop="skuCode" label="sku" width="160">
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
              <el-table-column prop="productCode" label="商品编码" width="160">
                <template slot-scope="scope">
                  <div @click="InitTable(scope.$index,scope.row)">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.skuCode"
                           type="text"
                           @change="handleBankChange(scope.$index,scope.row)"/>
                    <img class="abimg2" src="../../../../static/image/common/search_btn.png"/>
                  </div>
                </template>
              </el-table-column>
              <!--商品名称-->
              <el-table-column prop="productName" label="商品名称" width="160"></el-table-column>
              <!--规格-->
              <el-table-column prop="productSpec" label="规格" width="160"></el-table-column>
              <!--数量-->
              <el-table-column prop="qty" label="数量" width="80">
                <template slot-scope="scope">
                  <input class="input-need"
                         :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                         v-model="scope.row.qty"
                         type="text"
                         @change="handleBankChange(scope.$index,scope.row)"/>
                </template>
              </el-table-column>
              <!--零售价-->
              <el-table-column prop="retailPrice" label="零售价" width="80"></el-table-column>
              <!--折扣-->
              <el-table-column prop="discount" label="折扣" width="80"></el-table-column>
              <!--结算价-->
              <el-table-column prop="payPrice" label="结算价" width="80">
                <template slot-scope="scope">
                  <input class="input-need"
                         :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                         v-model="scope.row.payPrice"
                         type="text"
                         @change="handleBankChange(scope.$index,scope.row)"/>
                </template>
              </el-table-column>

              <!--结算额-->
              <el-table-column prop="payamount" label="结算金额" width="100"></el-table-column>
              <!--交易状态-->
              <el-table-column prop="transStatus" label="交易状态" width="120"></el-table-column>
              <!--促销活动-->
              <el-table-column prop="activityNo" label="促销活动" width="120"></el-table-column>
              <!--网店交易号-->
              <el-table-column prop="webshopTransCode" label="网店交易号" width="120"></el-table-column>
              <!--网店子订单编号-->
              <el-table-column prop="transSubcode" label="网店子订单编号" width="120"></el-table-column>
              <!--备注-->
              <el-table-column prop="remark" label="备注" width="120"></el-table-column>
              <el-table-column fixed="right" label='操作'>
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
      <el-col :span="22" class="auditInformation" id="auditInformation ">
        <h4 class="h4">审计信息</h4>
        <div class="getPadding1">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>创建人</label>
            <el-input v-model="auditInformation.createdBy" placeholder="" disabled="disabled"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>创建时间</label>
            <el-input v-model="auditInformation.createdTime" :disabled="true"></el-input>
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
            <el-input v-model="auditInformation.modifiedTime" :disabled="true"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>审核人</label>
            <el-input v-model="auditInformation.createdBy" :disabled="true"></el-input>
          </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="bgcolor">
            <label>审核时间</label>
            <el-input v-model="auditInformation.modifiedTime" :disabled="true"></el-input>
          </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--点击退货按钮dialog-->
    <el-dialog :visible.sync="returnGoods" class="dialogUserDefined">
      <template  slot="title">
        <span>退货</span>
      </template>
      <el-table :data="returnGoodsData" stripe border style="width: 100%" @selection-change="handleSelectionChangeGoods" class="all-table">
        <el-table-column type="selection"></el-table-column>
        <!--sku-->
        <el-table-column prop="skuCode" label="sku"></el-table-column>
        <!--商品名称-->
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <!--数量 -->
        <el-table-column prop="qty" label="数量"></el-table-column>
        <!--已退数量-->
        <el-table-column prop="rtoQty" label="已退数量"></el-table-column>
        <!--退货数量-->
        <el-table-column prop="rtoDtlQty" label="退货数量">
          <template slot-scope="scope">
            <input class="input-need"
                   :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                   v-model="scope.row.rtoDtlQty"
                   @change="handleBankChange(scope.$index,scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureReturnGoods">确 定</el-button>
            <el-button @click="returnGoods=false">取 消</el-button>
        </span>
    </el-dialog>
    <!--点击退货按钮dialog结束-->
    <!-- 点击sku弹出的dialog -->
    <SearchGoods v-on:childByValue="childByValue" v-bind:SearchGoods1="SearchGoods1"></SearchGoods>
    <!-- 点击sku弹出的dialog结束 -->
    <!-- 点击商品编码弹出的二维表dialog -->
    <el-dialog :visible.sync="dialogUserDefined10" class="dialogUserDefined">
      <template slot="title">
        <span>商品规格</span>
      </template>
      <Dtable :Dimensiondata="Dimensiondata" :DimensionKey="DimensionKey" :DimensionName='DimensionName'></Dtable>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addProductSpecification">确 定</el-button>
            <el-button @click="dialogUserDefined10=false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 点击商品编码弹出的dialog结束 -->

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
    // name:'customerModify',
    name:'salesOrderDetails',
    Name:'',
    components:{
      buttonGroup,
      dialogBox,
      Dtable,
      SearchGoods
    },
    created:function(){
      let self = this;
      self.loadData();
      self.loadSelect();
    },
    watch:{
      allData:{
        handler: function (val, oldVal) {
          this.changeTimes++;
          if(this.changeTimes>=2){
            this.buttonGroup[1].disabled=true;//新增禁用
            this.buttonGroup[2].disabled=true;//删除禁用
            this.buttonGroup[3].disabled=false;//保存可用
            this.buttonGroup[4].disabled=false;//保存并新增可用
            this.buttonGroup[13].disabled=false;//取消可用
          }
        },
        deep:true
      },
      cuSearch(val){
        this.$refs.cutree.filter(val)
      },
      ouSearch(val){
        this.$refs.outree.filter(val)
      },
      opSearch(val){
        this.$refs.optree.filter(val)
      }
    },
    data() {
      return{
        url:config.base.ip+':'+config.base.basicPort,//8082
        url2:config.base.ip+':'+config.base.omsPort,//8099
        allData:'',//保存所有的数据
        returnGoods:false,//退货弹窗
        ifShow:true,
        ifShow1:true,
        ifShow2:false,
        ifShow3:true,
        ifShow4:false,
        ifShow5:true,
        firstModify:false,//进入页面数据改变一次
        ouModify:false,
        ifModify:false,//判断主表是否修改过
        ifDoModify:false,//判断从表是否修改过
        backCancel:'',//判断信息提示确定的点击事件
        dialogUserDefined:false,
        dialogUserDefined1:false,
        brand:[],
        changeTimes:0,
        SearchGoods1:false,//sku弹框开光
        // 二维表----------------
        dialogUserDefined10:false,//二维表弹窗
        DimensionName:'salesOrderModify',//二维表格数据模型前缀
        Dimensiondata:[],//二维表格数据集合
        DimensionKey:["size",'color','num'],//二维表格字段名称
        specification:[],//商品规格数组
        productCode:[],
        spec:[],
        specificationArr:[],//规格数组
        specificationArr1:[],//最终规格数组
        // 假数据
        dataItems1:[
          {
            groupId:1,
            rtoId:1,
            skuId:1,
            skuCode: 1,
            skuName: 1,
            qty: 1,
            retailPrice: 1,
            discount: 1,
            payPrice:1,
            payamount:1,
            webshopTransCode:1,
            id:1
          },
          {
            groupId:2,
            rtoId:2,
            skuId:2,
            skuCode: 2,
            skuName: 2,
            qty: 2,
            retailPrice: 2,
            discount: 2,
            payPrice:2,
            payamount:2,
            webshopTransCode:2,
            id:2
          },
          {
            groupId:3,
            rtoId:3,
            skuId:3,
            skuCode: 3,
            skuName: 3,
            qty: 3,
            retailPrice: 3,
            discount: 3,
            payPrice:3,
            payamount:3,
            webshopTransCode:3,
            id:3
          },
          {
            groupId:4,
            rtoId:4,
            skuId:4,
            skuCode: 4,
            skuName: 4,
            qty: 4,
            retailPrice: 4,
            discount: 4,
            payPrice:4,
            payamount:4,
            webshopTransCode:4,
            id:4
          }
        ],
        afterEditor:'',//编辑后表格的数据
        // ----------------------------
        returnGoodsData:[],//退货列表数据
        topData:{
          soCode:123,//单据号
          platformId:"",//平台
          createdType:{createdTypeid:2,createdTypetext:"手工新增"},// 新增类型 ,
          soType:{soTypeid:1,soTypetext:"正常销售"},//销售类型 ,
          unreviewedReason:"",//未审原因
          transType:{transTypeid:1,transTypetext:'一口价'},//交易类型
          transCode:'',//网店交易号
          payCode:'',//支付交易号
          transStatus:{transStatusid:2,transStatustext:'等待买家付款'},//交易状态
        },
        WebshopIdArr:[],//店铺下拉
        logisticsCompanyArr:[],//物流公司下拉
        logisticsWay:[],//物流方式
        sendShopArr:[],//发货店铺
        stockArr:[],//发货仓库
        returnStockSelect:[],//退货仓库
        distributionModeid:'',
        selectedShopId:'',//店铺选中所对应的平台id
        //上面的行政地区----------
        proIDT:'',
        cityIdT:'',
        quIdT:'',
        provinceValue:0,
        cityValue:0,
        areaValue:0,
        areaProArray:[],//行政地区(省)
        areaCityArray:[],//行政地区(市)
        areaDisArray:[],//行政地区(区)
        provinceName:'',//选中的省
        cityName:'',//选中的市
        areaName:'',//选中的区
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
        bankData:[],//根据groupId获得银行信息
        updataBankList:[],//需要修改的银行信息
        addBankList:[],//需要添加的银行信息
        x:0,
        y:0,
        z:0,
        xrows:[],
        yrows:[],
        zrows:[],
        multipleSelection:[],//需要删除的银行数组
        allBankDel:{
          ids:[]
        },
        idArrayBank:{//银行多项删除的id
          ids:[]
        },
        // createBankParams:{//创建的参数
        //   "groupId": '',
        //   "rtoId":'',
        //   "skuId": '',
        //   "skuCode": "",
        //   "skuName": "",
        //   "qty": '',
        //   "retailPrice": '',
        //   "discount": '',
        //   "payPrice":'',
        //   "payamount":'',
        //   "webshopTransCode":'',
        //   "id":0
        //   // "isDefault": true
        // },
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
          },
          {
            text:'新增',
            class:'bt_add',
            icon:'icon-xinzeng',
            disabled:false,
          },
          {
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
            text:'保存并新增',
            class:'bt_save',
            icon:'icon-baocun',
            disabled:false,
          },
          {
            text:'审核',
            class:'bt_in',
            icon:'',
            disabled:false,
          },{
            text:'反审核',
            class:'bt_in',
            icon:'',
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
            text:'退货',
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
        ],
        buttonGroup1:[//从表按钮
          {
            text:'增行',
            class:'bt_add',
            icon:'icon-zenghang',
            disabled:false,
          },{
            text:'删除',
            class:'bt_del',
            icon:'icon-shanchu',
            disabled:false,
          }],
        //---dialog---------------
        dialogCommand:[],//对话框按钮组控制组
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
        topDetailInfo:'',//顶部第一个收起框的信息和最下面审核人的信息
        tableDetail:[],//详情中的表格数据
        auditInformation:{//审计信息
          createdTime:this.GetDateTime(),//创建时间
          createdBy:this.$store.state.name,//创建人
          modifiedTime:this.GetDateTime(),//修改人
          modifiedBy:this.$store.state.name//修改时间
        },
        exchangeData:[],//选中要退货的数据
        hangUpArr:[],//挂起id数组
        solutionId:[],//解挂id数组
        filterKey:'',
        filterlogisticKey:'',
        filterStockKey:'',
        filterStockshopKey:'',
      }
    },
    // 验证
    validators:{
      'topDetailInfo.shopId': function (value) {//店铺
        return this.Validator.value(value).required().integer();
      },
      'topDetailInfo.logisticsId': function (value) {//物流公司
        return this.Validator.value(value).required().integer();
      },
      'topDetailInfo.waybillCode': function (value) {//物流单号
        return this.Validator.value(value).maxLength(50);
      },
      'topDetailInfo.buyerNick': function (value) {//买家昵称
        return this.Validator.value(value).maxLength(50);
      },
      'topDetailInfo.distributionModeid': function (value) {//物流方式
        return this.Validator.value(value).integer();
      },
      'topDetailInfo.deliveryShopId': function (value) {//发货店铺
        return this.Validator.value(value).integer();
      },
      'topDetailInfo.deliveryStockId': function (value) {//发货仓库
        return this.Validator.value(value).required().integer();
      },
      'topDetailInfo.memberCode': function (value) {//会员卡号
        return this.Validator.value(value).maxLength(50);
      },
      'topDetailInfo.buyerMsg': function (value) {//买家留言
        return this.Validator.value(value).maxLength(80);
      },
      'topDetailInfo.salerNote': function (value) {//卖家备注
        return this.Validator.value(value).maxLength(80);
      },
      // ------------------------------------------------------------------------
      'topDetailInfo.consignee': function (value) {//收货人
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.consigneeMobile': function (value) {//手机
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.consigneePhone': function (value) {//座机
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.postCode': function (value) {//邮编
        return this.Validator.value(value).maxLength(50);
      },

      // 'proIDT': function (value) {//收货地区/省
      //   return this.Validator.value(value).required().maxLength(50);
      // },
      // 'cityIdT': function (value) {//收货地区/市
      //   return this.Validator.value(value).required().maxLength(50);
      // },
      // 'quIdT': function (value) {//收货地区/区
      //   return this.Validator.value(value).required().maxLength(50);
      // },

      'topDetailInfo.completeAddress': function (value) {//详细地址
        return this.Validator.value(value).required().maxLength(50);
      },
      // ----------------------------------------------------------------------------------
      'topDetailInfo.postage': function (value) {//买家邮费
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.payamount': function (value) {//订单结算金额
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.actualPayamount': function (value) {//线上实付金额
        return this.Validator.value(value).required().maxLength(50);
      },
      'topDetailInfo.preferentialAmount': function (value) {//优惠金额
        return this.Validator.value(value).maxLength(50);
      }
    },
    computed:{
      // countCu () {
      //   return this.cuItem;
      // },
      // countFi () {
      //   return this.fiItem;
      // },
      // countOu () {
      //   return this.ouItem;
      // },
      // countOp () {
      //   return this.opItem;
      // },
      // countYw (){
      //   return this.ywItem;
      // }
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
      packUp3(){//收起或展开文字处理
        if(this.ifShow3==false){
          return '展开';
        }else{
          return '收起';
        }
      },
      packUp5(){//收起或展开文字处理
        if(this.ifShow5==false){
          return '展开';
        }else{
          return '收起';
        }
      },
      WebshopId1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterKey,this.WebshopIdArr)
      },
      logisticsCompanyfilter: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterlogisticKey,this.logisticsCompanyArr)
      },
      sendShopfilter: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockKey,this.sendShopArr)
      },
      stockfilter: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockshopKey,this.stockArr)
      },
    },
    methods:{
      filterMethod(query){
        this.filterKey=query;
      },
      filterlogisticMethod(query){
        this.filterlogisticKey=query;
      },
      filterStockMethod(query){
        this.filterStockKey=query;
      },
      filterStockshopMethod(query){//发货仓库
        this.filterStockshopKey=query;
      },
      // sku弹窗
      chooseProduct(index,row){
        this.SearchGoods1=true;
      },
      childByValue(childValue){//选取商品中选中的数据
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
          if(this.tableDetail[0].id==0){//把新增的空数据干掉
            this.tableDetail.splice(0,1)
          }
          childValue.forEach((item)=>{
            let itemObj = {};
            itemObj.id=item.id;
            itemObj.soId=item.groupId;//对应销售单Id ,
            itemObj.seq=item.groupId;// 序号
            itemObj.skuCode=item.groupId;//skuCode
            itemObj.skuId=item.groupId;//SKUID--- ,
            itemObj.productCode=item.productCode;//商品编码 ,
            itemObj.productName=item.productName;//商品名称 ,
            itemObj.productSpec=item.groupId;// 商品规格 ,
            itemObj.qty=item.groupId;//数量----- ,
            itemObj.retailPrice=item.retailPrice;//零售价
            itemObj.discount=item.discount;//折扣 ,
            itemObj.payPrice=item.groupId;//结算价---- ,
            itemObj.payamount=item.groupId;//结算额---- ,
            itemObj.isGift=item.groupId;//是否赠品 ,
            itemObj.transStatus=item.groupId;// 交易状态 ,
            itemObj.activityNo=item.groupId;// 促销活动 ,
            itemObj.transCode=item.groupId;//交易号---- ,
            itemObj.transSubcode=item.groupId;// 子交易号 ,
            itemObj.doQty=item.groupId;//已出库数量 ,
            itemObj.rtoQty=item.groupId;// 已退货数量 ,
            itemObj.remark=item.groupId;// 备注
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
      },
      //---获取数据--------------------------------------------
      loadData:function(){
        let self = this;
        self.buttonGroup[1].disabled = false;//新增按钮
        self.buttonGroup[2].disabled = false;//删除按钮
        self.buttonGroup[3].disabled = true;//保存按钮
        self.buttonGroup[4].disabled = true;//保存并新增按钮
        self.buttonGroup[13].disabled = true;//取消按钮
        if (self.$route.params.id != "default") {
            self.firstModify = false;

            //根据id获得的详情信息
          this.$axios.gets(self.url2+'/api/services/app/OmsSoManagement/GetWebsoMtrDataById',
            {id:self.$route.params.id}).then(function(res){
            console.log(res);
            self.allData=res.result;//所有
            self.topDetailInfo=res.result;//除表之外的数据
            self.tableDetail=res.result.websoDtlDtoList;//表
            // 地区赋值
            console.log(self.topDetailInfo.adAreaLevel1);
            console.log(self.topDetailInfo.adAreaLevel2);
            console.log(self.topDetailInfo.adAreaLevel3);
            self.proIDT=self.topDetailInfo.adAreaLevel1;//省
            self.cityIdT=self.topDetailInfo.adAreaLevel2;//市
            self.quIdT=self.topDetailInfo.adAreaLevel3;//区
            console.log(self.topDetailInfo.deliveryStockName);
            console.log(self.tableDetail);
            // if(self.tableDetail.length==0){
            //
            // }
            if(self.topDetailInfo.platformId==0){//原本等于1的，因为没有数据就暂时等于0，要改回来的
              self.topDetailInfo.platformName='淘宝';
            }else if(self.topDetailInfo.platformId==2){
              self.topDetailInfo.platformName="京东";
            }else if(self.topDetailInfo.platformId==3){
              self.topDetailInfo.platformName="唯品会";
            }
            if(self.topDetailInfo.createdTypeid==0){//原本等于1的，因为没有数据就暂时等于0，要改回来的
              self.topDetailInfo.createdTypeName='下载';
            }else if(self.topDetailInfo.createdTypeid==2){
              self.topDetailInfo.createdTypeName="手工新增";
            }else if(self.topDetailInfo.createdTypeid==3){
              self.topDetailInfo.createdTypeName="合并";
            }else if(self.topDetailInfo.createdTypeid==4){
              self.topDetailInfo.createdTypeName="拆分";
            }
            // self.createBankParams.rtoId = self.$route.params.id;
            self.allData = res.result;
            //银行数据
            self.bankData = self.tableDetail;
            console.log(self.bankData);
            self.InitBankData = self.deepCopy(self.tableDetail);
            for(let i in self.bankData){
              if(self.bankData[i].isDefault == true){
                self.checkedAr = self.bankData[i]
              }
            }
          });
        }
      },
      Modify:function(){//判断主表是否修改过
        let self = this;
        self.ifModify = true;
      },
      goodsSearch(){
        let self=this;
        self.dialogUserDefined=true;
        self.loadSelect();
      },
      moreSearch(){
        let self=this;
        self.ifShow2=!self.ifShow2;
      },
      cancelDialog(){
        let self=this;
        self.dialogUserDefined=false;
      },
      createFilter(queryString){
        return (areaPro) => {
          return (areaPro.areaName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      resdatetime:function(resdatetime){
        return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
      },
      Modify1(id){
        // 根据选中店铺所对应的platformId，
        // 然后切换判断platformName显示什么
        // platformName的值如下
        // 1。京东，
        // 2。淘宝
        // 3.唯品会
        //this.topDetailInfo.shopId就是选中的店铺id,
        // this.WebshopId.forEach((item)=>{
        //     if(item.id == this.tableDetailInfo.platformId){
        //       this.tableDetailInfo.platformName = item.webshopName;//店铺名字是哪个字段最后一个
        //     }
        //   // item.assign// 获取商铺的接口在哪
        // });
        // let self=this;
        // for(let i in self.webShopId){
        //   self.selectedShopId.push(self.webShopId[i].platformId);
        // }
        console.log(self.topDetailInfo.shopId);
        console.log(id);
      },

      //---弹框下拉的数据------------------------------------------
      loadSelect:function(){
        let self = this;
        // 店铺下拉数据
        self.$axios.gets(self.url2+"/api/services/app/OmsWebShopManagement/GetAll", {
          SkipCount:0,
          MaxResultCount:999
        }).then(function(res) {
          // 店铺
          self.WebshopIdArr = res.result.items;
          console.log( self.WebshopIdArr);
            //这里是获取店铺下拉的接口，每个店铺对应一个platformId，1.
          // 切换的方法在哪 不是id 店铺的名字什么的
          // for(let i in self.WebshopId){
          //   console.log(self.WebshopId[i].platformId);
          // }
        });
        self.$axios.gets(self.url+"/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_Distributionmode"
        }).then(function(res) {
          // 物流方式
          self.logisticsWay = res.result;
          console.log(self.logisticsWay);
        });
        //发货店铺
        self.$axios.gets(self.url+"/api/services/app/ShopManagement/GetAll",
          {
            ShopTypeid:'',
            OuId:'',
            AdAreaId:'',
            OpAreaId:'',
            ShopCode:'',
            ShopName:'',
            ShopWorkPropertyid:'',
            Sorting:'',
            SkipCount:0,
            MaxResultCount:1000
          }
        ).then(function(res) {
          self.sendShopArr = res.result.items;
          console.log(self.sendShopArr);
        });
        // 物流公司下拉
        self.$axios.gets(self.url+"/api/services/app/ContactManagement/GetListByConditionSupplier",
          {
            ContactWorkPropertyId:1,
            SkipCount: 0,
            MaxResultCount: 1000
          }).then(function(res) {
          self.logisticsCompanyArr = res.result.items;
        });
        // 发货仓库
        self.$axios.gets(self.url+"/api/services/app/StockManagement/GetRepositoryList",
          {
            OuId:0,
            StockCode:'',
            StockName:'',
            AreaCode:'',
            StockTypeId:'',
            Sorting:'',
            SkipCount: 0,
            MaxResultCount: 1000
          }).then(function(res) {
          self.stockArr = res.result.items;
          console.log( self.stockArr);
        });
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
          self.returnStockSelect = res.result.items;
        });
        // 发货信息物流公司下拉
        self.$axios.gets(self.url+"/api/services/app/ContactManagement/GetListByConditionSupplier",
          {
            ContactWorkPropertyId:1,
            SkipCount: 0,
            MaxResultCount: 1000
          }).then(function(res) {
          self.logisticsCompany1 = res.result.items;
        });
        //行政地区获取省
        self.$axios.gets(self.url+'/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
          //console.log(res);
          self.areaProArray = res.result;
          self.areaProArray1 = res.result;
          // self.loadIcon();
        },function(res){
          console.log('err'+res)
        });
      },
      //---选择省市区-----------------------------------------------
      chooseProvinceT:function(res){
        let self = this;
        self.$axios.gets(self.url+'/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:res}).then(function(res){
          //console.log(res);
          self.areaCityArray = res.result;
          self.cityIdT='';
          self.quIdT='';
          let obj={};
          obj = self.areaProArray.find((item)=>{
            return item.id === self.proIDT;
          });
          console.log(obj.areaName);//第一级省的名称
          self.provinceName=obj.areaName;//
          console.log(self.areaCityArray);
          console.log(self.proIDT);
          self.changeTimes++;
          if(self.changeTimes>=2){
            self.buttonGroup[1].disabled=true;//新增禁用
            self.buttonGroup[2].disabled=true;//删除禁用
            self.buttonGroup[3].disabled=false;//保存可用
            self.buttonGroup[4].disabled=false;//保存并新增可用
            self.buttonGroup[13].disabled=false;//取消可用
          }
        },function(res){
          console.log('err'+res)
        });
      },
      chooseCityT:function(res){
        let self = this;
        self.$axios.gets(self.url+'/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:res}).then(function(res){
          // console.log(res);
          self.areaDisArray = res.result;
          self.quIdT='';
          let obj={};
          obj = self.areaCityArray.find((item)=>{
            return item.id === self.cityIdT;
          });
          console.log(obj.areaName);//市的名称
          self.cityName=obj.areaName;//
          console.log(self.areaDisArray);
          console.log(self.cityIdT);
        },function(res){
          console.log('err'+res)
        })
      },
      chooseDisT:function(res){
        let self = this;
        let obj={};
        obj = self.areaDisArray.find((item)=>{
          return item.id === self.quIdT;
        });
        console.log(obj.areaName);//区的名称
        self.areaName=obj.areaName;//
        // self.queryParams.createWebsoConsigneeDto.adAreaLevel3=res;   //打印这些出来看看
        console.log(res);
        // console.log(self.queryParams.createWebsoConsigneeDto.adAreaLevel3);
        // console.log(self.createRepositoryParams.stock_MainTable.adAreaId)
      },
      // 二维表-------------------------------------------------------------------
      InitTable(index,row){
        let self=this;
        self.dialogUserDefined10=true;
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
          console.log(self.Dimensiondata);
        });
      },
      addProductSpecification(){//商品编码弹窗确定
        let self=this;
        // 这时应该走一个根据skuId来查询和底下那张列表的字段相同的接口
        self.afterEditor=self.$store.state.DimensionTable[this.DimensionName+'Dimension'];
        console.log(self.afterEditor);
        let addItem={
          groupId:"",
          rtoId:"",
          skuId:'',
          skuCode:'',
          skuName:'',
          qty:'',
          retailPrice:'',
          discount:'',
          payPrice:'',
          payamount:'',
          webshopTransCode:'',
          id:'',
        };
        self.dataItems1.forEach((item,index)=>{
          self.tableDetail.push(item);
        });
        // for(let i=0;i< self.dataItems1.length;i++){//self.dataItems.length二维表数据条数
        //   self.Dimensiondata.groupId=self.dataItems1[i].groupId;
        //   self.Dimensiondata.rtoId=self.dataItems1[i].rtoId;
        //   self.Dimensiondata.skuId=self.dataItems1[i].skuId;
        //   self.Dimensiondata.skuCode=self.dataItems1[i].skuCode;
        //   self.Dimensiondata.skuName=self.dataItems1[i].skuName;
        //   self.Dimensiondata.qty=self.dataItems1[i].qty;
        //   self.Dimensiondata.retailPrice=self.dataItems1[i].retailPrice;
        //   self.Dimensiondata.discount=self.dataItems1[i].discount;
        //   self.Dimensiondata.payPrice=self.dataItems1[i].payPrice;
        //   self.Dimensiondata.payamount=self.dataItems1[i].payamount;
        //   self.Dimensiondata.webshopTransCode=self.dataItems1[i].webshopTransCode;
        //   self.Dimensiondata.id=self.dataItems1[i].id;
        //   self.tableDetail.push(self.Dimensiondata);
        // };
        console.log(self.tableDetail);
        self.dialogUserDefined10=false;
        console.log(self.Dimensiondata);
      },
      // 二维表结束-------------------------------------------------------------------
      CheckAllTree(){//全选
        let _this=this;
        let topNode=[];
        if(_this.checkAllOu){
          console.log(_this.checkAllOu);
          // $.each(_this.ouTreeDataRight,function(index,val){
          //     topNode.push(val)
          // })
          console.log(_this.ouTreeDataRight);
          _this.$refs.fptree.setCheckedNodes(_this.ouTreeDataRight);
          $('.el-tree-node__content').each(function(){
            $(this).css('display','block')
          })
        }else{
          // _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
          console.log(_this.checkAllOu);
          _this.$refs.fptree.setCheckedNodes([]);
          setTimeout(function(){
            if(_this.showCheck){
              $('.el-checkbox__input').each(function(){
                if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
                  $(this).parents('.el-tree-node__content').css('display','none')
                }
              })
            }
          },100)
        }
      },
      isCheckAllOu(){//是否全选
        let _this=this;
        if(_this.$refs.fptree.getCheckedNodes().length==_this.allOuLength){
          _this.checkAllOu=true
        }else{
          _this.checkAllOu=false
        }
      },
      paginationOu(checkAllata,oneItem,thisPage){//数据分页
        let _this=this;//checkAllata分页数据//oneItem每页有多少条信息//thisPage当前页
        let nowData=[];
        // console.log(checkAllata)
        let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
        let endIndex=startIndex + oneItem;
        if(checkAllata.length>0){
          if(endIndex>checkAllata.length){
            endIndex=checkAllata.length
          }
          for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
            // console.log(checkAllata[startIndex])
            nowData.push(checkAllata[startIndex])
          }
        }
        _this.ouTotalItem=checkAllata.length;//总共多少条数据
        _this.ouTotalPage=Math.ceil(checkAllata.length/oneItem);//有多少页
        return nowData
      },
      showCheckTree(){//查看已选
        let _this=this;
        if(_this.showCheck){
          $('.el-checkbox__input').each(function(){
            if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
              $(this).parents('.el-tree-node__content').css('display','none')
            }
          })
        }else{
          $('.el-tree-node__content').each(function(){
            $(this).css('display','block')
          })
        }

      },
      ouHandleCurrentChange(val){//页码改变
        let _this=this;
        _this.ouPage=val;
        _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
      },
      //---保存、修改数据---------------------------------------------
      saveModify:function(){
        let self = this;
        self.saveCustomerModify();
      },
      saveCustomerModify:function(){//修改所有
        let self = this;
        $('.tipsWrapper').css({display:'block'});
        self.$validate().then(function(success) {
          console.log(success);
          if (success) {
            $('.tipsWrapper').css({display: 'none'});
            // 赋值
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel1 = self.proIDT;//省
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel2 = self.cityIdT;//市
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel3 = self.quIdT;//区
            for(let i in self.tableDetail){
              if(self.tableDetail[i].id==0){
                self.$message({
                      type: 'warning',
                      message: '请先编辑明细表的新增项'
                });
                return;
              }
            }
            let submit={
              soMtrDto:{
                id:self.topDetailInfo.id ,
                soCode:self.topDetailInfo.soCode ,
                platformId: self.topDetailInfo.platformId,
                createdTypeid:self.topDetailInfo.createdTypeid ,
                soTypeid:self.topDetailInfo.soTypeid ,
                soDate:self.topDetailInfo.soDate ,
                shopId: self.topDetailInfo.shopId,
                transCode:self.topDetailInfo.transCode,
                transStatus:self.topDetailInfo.transStatus ,
                transTypeid:self.topDetailInfo.transTypeid ,
                payCode:self.topDetailInfo.payCode ,
                payTime:self.topDetailInfo.payTime,
                unreviewedReason:self.topDetailInfo.unreviewedReason ,
                deliveryShopId:self.topDetailInfo.deliveryShopId ,
                deliveryStockId:self.topDetailInfo.deliveryStockId ,
                doStatus:self.topDetailInfo.doStatus ,
                logisticsId:self.topDetailInfo.logisticsId ,
                waybillCode:self.topDetailInfo.waybillCode ,
                distributionModeid:self.topDetailInfo.distributionModeid ,
                memberCode:self.topDetailInfo.memberCode ,
                buyerMsg: self.topDetailInfo.buyerMsg,
                salerNote:self.topDetailInfo.salerNote ,
                buyerNick:self.topDetailInfo.buyerNick,
                payamount: self.topDetailInfo.payamount,
                postage:self.topDetailInfo.postage ,
                actualPayamount: self.topDetailInfo.actualPayamount,
                preferentialAmount: self.topDetailInfo.preferentialAmount,
                effectiveTime:self.topDetailInfo.effectiveTime,
                isHided: true,
                remark:self.topDetailInfo.remark
            },
              soConsigneeDto:{
                id: self.topDetailInfo.id,
                soId: self.topDetailInfo.soId,
                consignee:self.topDetailInfo.consignee ,
                consigneeMobile:self.topDetailInfo.consigneeMobile ,
                consigneePhone:self.topDetailInfo.consigneePhone ,
                adAreaLevel1: self.provinceName|self.topDetailInfo.adAreaLevel1,//省,
                adAreaLevel2: self.cityName|self.topDetailInfo.adAreaLevel2,//市,
                adAreaLevel3:self.areaName|self.topDetailInfo.adAreaLevel3,//区 ,
                adAreaLevel4:'' ,
                completeAddress:self.topDetailInfo.completeAddress ,
                postCode:self.topDetailInfo.postCode
            },
              soDtlDtoList:self.tableDetail
          };
            console.log(submit);
            self.$axios.puts(self.url2 + '/api/services/app/OmsSoManagement/UpdateOmsWebsoMtr', submit).then(function (res) {
              console.log(res);
              self.open('修改成功', 'el-icon-circle-check', 'successERP');
              // 修改成功，点返回不弹出对话框
              self.ifModify = false;
              self.buttonGroup[1].disabled = false;//新增按钮
              self.buttonGroup[2].disabled = false;//删除按钮
              self.buttonGroup[3].disabled = true;//保存按钮
              self.buttonGroup[4].disabled = true;//保存并新增按钮
              self.buttonGroup[13].disabled = true;//取消按钮
              self.changeTimes = 1;

            }, function (res) {
              console.log(res);
              self.dialogVisible = true;
              self.dialogSetting.dialogType = "submit";
              self.dialogSetting.dialogName = 'saveDialog';
              self.dialogSetting.message = "信息提报有误";
              self.errorTips.message = res.error.message;
              self.errorTips.details = '';
              self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        });
      },
      cardNumberJump(){//会员卡跳页
        this.$store.state.url = "/memberInformation/memberInformationDetail/default/";
        this.$router.push({ path: this.$store.state.url }); //点击切换路由
      },
      saveAdd(){//保存并新增
        let self = this;
        $('.tipsWrapper').css({display:'block'});
        self.$validate().then(function(success) {
          // console.log(success);
          if (success) {
            $('.tipsWrapper').css({display: 'none'});
            // 赋值
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel1 = self.proIDT;//省
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel2 = self.cityIdT;//市
            // self.queryParams.createWebsoConsigneeDto.adAreaLevel3 = self.quIdT;//区
            self.queryParams.soMtrDto.distributionModeid = self.distributionModeid;//物流方式
            console.log(self.queryParams.soMtrDto.shopId);
            console.log(self.queryParams);

            let submit={
              soMtrDto:{
                id:self.topDetailInfo.id ,
                soCode:self.topDetailInfo.soCode ,
                platformId: self.topDetailInfo.platformId,
                createdTypeid:self.topDetailInfo.createdTypeid ,
                soTypeid:self.topDetailInfo.soTypeid ,
                soDate:self.topDetailInfo.soDate ,
                shopId: self.topDetailInfo.shopId,
                transCode:self.topDetailInfo.transCode,
                transStatus:self.topDetailInfo.transStatus ,
                transTypeid:self.topDetailInfo.transTypeid ,
                payCode:self.topDetailInfo.payCode ,
                payTime:self.topDetailInfo.payTime,
                unreviewedReason:self.topDetailInfo.unreviewedReason ,
                deliveryShopId:self.topDetailInfo.deliveryShopId ,
                deliveryStockId:self.topDetailInfo.deliveryStockId ,
                doStatus:self.topDetailInfo.doStatus ,
                logisticsId:self.topDetailInfo.logisticsId ,
                waybillCode:self.topDetailInfo.waybillCode ,
                distributionModeid:self.topDetailInfo.distributionModeid ,
                memberCode:self.topDetailInfo.memberCode ,
                buyerMsg: self.topDetailInfo.buyerMsg,
                salerNote:self.topDetailInfo.salerNote ,
                buyerNick:self.topDetailInfo.buyerNick,
                payamount: self.topDetailInfo.payamount,
                postage:self.topDetailInfo.postage ,
                actualPayamount: self.topDetailInfo.actualPayamount,
                preferentialAmount: self.topDetailInfo.preferentialAmount,
                effectiveTime:self.topDetailInfo.effectiveTime,
                isHided: true,
                remark:self.topDetailInfo.remark
              },
              soConsigneeDto:{
                id: self.topDetailInfo.id,
                soId: self.topDetailInfo.soId,
                consignee:self.topDetailInfo.consignee ,
                consigneeMobile:self.topDetailInfo.consigneeMobile ,
                consigneePhone:self.topDetailInfo.consigneePhone ,
                adAreaLevel1: self.provinceName|self.topDetailInfo.adAreaLevel1,//省,
                adAreaLevel2: self.cityName|self.topDetailInfo.adAreaLevel2,//市,
                adAreaLevel3:self.areaName|self.topDetailInfo.adAreaLevel3,//区 ,
                adAreaLevel4:'' ,
                completeAddress:self.topDetailInfo.completeAddress ,
                postCode:self.topDetailInfo.postCode
              },
              soDtlDtoList:self.tableDetail
            };
            self.$axios.puts(self.url2 + '/api/services/app/OmsSoManagement/UpdateOmsWebsoMtr', submit).then(function (res) {
              console.log(res);
              self.open('修改成功！', 'el-icon-circle-check', 'successERP');
              // 修改成功，点返回不弹出对话框
              self.ifModify = false;
              self.buttonGroup[1].disabled = false;//新增按钮
              self.buttonGroup[2].disabled = false;//删除按钮
              self.buttonGroup[3].disabled = true;//保存按钮
              self.buttonGroup[4].disabled = true;//保存并新增按钮
              self.buttonGroup[13].disabled = true;//取消按钮
              self.changeTimes = 1;
              self.$store.state.url='/salesOrder/salesOrderDetails/default';
              self.$router.push({path:self.$store.state.url})//点击切换路由
            }, function (res) {
              console.log(res);
              self.dialogVisible = true;
              self.dialogSetting.dialogType = "submit";
              self.dialogSetting.dialogName = 'saveDialog';
              self.dialogSetting.message = "信息提报有误";
              self.errorTips.message = res.error.message;
              self.errorTips.details = '';
              self.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        });
      },
      // 退货
      changeGoods(){
        let self=this;
        self.$axios.gets(self.url2+'/api/services/app/OmsRtoManagement/GetWebsoDtlDataByCode',
          {
            BillCode:self.topDetailInfo.billCode,//销售订单号
            GroupId:self.topDetailInfo.groupId,//集团id
            ShopId:self.topDetailInfo.shopId//店铺id
          }
        ).then(function(res){
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
      handleSelectionChangeGoods(val){//换货选中数据
        this.exchangeData=val;
        console.log(this.exchangeData);
      },
      sureReturnGoods(){//确定退货
        let self=this;
        console.log(self.returnGoods);
        if(self.exchangeData.length>0){
          for(let i in self.exchangeData){
            self.exchangeData[i].rtoDtlQty=parseInt(self.exchangeData[i].rtoDtlQty);
          }
          self.$axios.posts(self.url2+'/api/services/app/OmsRtoManagement/JumpToOmsWebrto',
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
            self.open('退货成功！','el-icon-circle-check','successERP');
            self.$store.state.url = "/returnNote/returnNoteList/default";
            self.$router.push({path:self.$store.state.url})//点击切换路由
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
      hangUp(){//挂起
          let self=this;
          self.hangUpArr.push(parseInt(self.$route.params.id));
          self.$axios.posts(self.url2+'/api/services/app/OmsSoManagement/SuspendWebsoMtr',
            self.hangUpArr
          ).then(function(res){//
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
      SolutionToHang(){//解挂
        let self=this;
        self.solutionId.push(parseInt(self.$route.params.id));
        self.$axios.posts(self.url2+'/api/services/app/OmsSoManagement/RelieveSuspendWebsoMtr',
          self.solutionId
        ).then(function(res){//
          self.open('解除挂起成功','el-icon-circle-check','successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
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

//----------------------------------------------------
      btnClick(btn){//按钮组点击事件
        let self = this;
        if(btn=="返回"){
          // self.isBack();
          if(self.$route.params.id!=="default"&&self.changeTimes<2){//新增操作
            self.back();
          }else if(this.$route.params.id!=="default"&&self.changeTimes>2){
            self.back();
          }else{
            self.dialogSetting.dialogName='backDialog';
            self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
            self.dialogSetting.dialogType="confirm";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            self.dialogVisible=true;
          }
        }else if(btn=="新增"){
          self.goDetail();
        }else if(btn=="删除"){
          self.delSupplie()
        }else if(btn=="退货"){
          self.changeGoods();
        }else if(btn=="保存"){
          self.saveModify();
        }else if(btn=="保存并新增"){
          self.saveAdd();
        }else if(btn=="审核"){
          self.checkOrder();
        }else if(btn=="反审核"){
          self.againstCheckOrder();
        }else if(btn=="挂起"){
          self.hangUp();
        }else if(btn=="解挂"){
          self.SolutionToHang()
        }else if(btn=="取消"){
          if(self.$route.params.id=="default"&&self.changeTimes<2){//新增操作
            self.back();
          }else{
            self.dialogSetting.dialogName='cancelDialog';
            self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
            self.dialogSetting.dialogType="confirm";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            self.dialogVisible=true;
          }
          // self.isBack();
        }
      },
      checkOrder(){//审核
        let self=this;
        self.$axios.posts(self.url2+"/api/services/app/OmsSoManagement/Check",
          {id:self.$route.params.id}
        ).then(function(res) {
          self.open('审核成功','el-icon-circle-check','successERP');
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
      againstCheckOrder(){//反审核
        let self=this;
        self.$axios.posts(self.url2+"/api/services/app/OmsSoManagement/InsteadCheck",
          {id:self.$route.params.id}
          ).then(function(res) {
          self.open('反审核成功','el-icon-circle-check','successERP');
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
      addColbank:function(){//明细增行
        let self = this;
        self.x++;
        let newCol = 'newCol'+self.x;
        self.xrows.newCol ={
          groupId: 1,
          soId: '',
          seq: '',
          sku: '',
          skuId: '',
          skuCode: '',
          productCode: '',
          productName: '',
          productSpec: '',
          qty:'',
          retailPrice:'',
          discount: '',
          payPrice: '',
          payamount: '',
          isGift: true,
          transStatus: '',
          activityNo: '',
          transCode: '',
          transSubcode: '',
          doQty: '',
          rtoQty: '',
          refundStatus:'',
          remark: '',
          isHided:'',
          soucreSoCode: '',
          soucreSoSeq:'',
          id: 0,
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

        // self.bankData.unshift(self.xrows.newCol);//向数组开头新添加一个或更多元素
          // self.addBankList.unshift(self.xrows.newCol);
          // console.log(self.bankData);
          // console.log(self.addBankList);

      },
      //---从表复选框---------------------------------------
      handleSelectionChange:function(val){//点击复选框选中的数据
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },

      //---从表单项删除-------------------------------------
      handleDelete:function(index,row,who){
        let self=this;
        self.tableDetail.splice(index,1);
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
      //-----------------------------------------------------------
      delSupplie:function(){//删除此页供应商资料
        let self = this;
        self.dialogVisible = true;
        self.dialogSetting.dialogType="confirm";
        self.dialogSetting.dialogName='delDialog';
        self.dialogSetting.message="确定删除？";
        self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
      },
      //---路由------open------------------------------------------
      back(){//返回路由切换
        this.$store.state.url = "/salesOrder/salesOrderList/default";
        this.$router.push({ path: this.$store.state.url }); //点击切换到list页面路由
      },
      goModify: function(id) {
        this.$store.state.url = "/salesOrder/salesOrderModify/" + id;
        this.$router.push({ path: this.$store.state.url }); //点击切换路由
      },
      goDetail() {
        //点击新增跳转
        this.$store.state.url = "/salesOrder/salesOrderDetails/default";
        this.$router.push({ path: this.$store.state.url }); //点击切换路由
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
      //------------------------------------------------------

      //---修改返回提示-----------------------------------------
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
      //-------------------------------------------------------------
      //----------------------------------------------------
      getType(obj){
        //tostring会返回对应不同的标签的构造函数
        var toString = Object.prototype.toString;
        var map = {
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
      dialogClick(parmas){//对话框点击事件
        let self = this;
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="delDialog"){//删除对话框
            self.$axios.deletes(self.url2+'/api/services/app/OmsSoManagement/DeleteOmsWebsoMtr',{id:self.$route.params.id}).then(function(res){
              self.open('删除成功','el-icon-circle-check','successERP');
              self.back();
            },function(res){
              // self.dialogVisible=true;
              self.dialogSetting.dialogType="confirm";
              self.dialogSetting.dialogName='delErrDialog';
              self.dialogSetting.message="删除失败!"+res.error.message;
              self.errorTips.message=res.error.message;
              self.errorTips.details='';
              self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
            })
          }else if(parmas.dialogName=="backDialog"){//返回
            self.back();
            self.dialogVisible=false;
          }else if(parmas.dialogName=="saveDialog"){//保存
            self.dialogVisible=false;
          }else if(parmas.dialogName=="cancelDialog"){//取消
            if(self.$route.params.id=="default"){
              self.validation.reset();
              self.goDetail()
            }else{
              self.loadData();
            }
            self.dialogVisible=false;
            self.changeTimes=0;
            self.buttonGroup[1].disabled=false;//新增按钮
            self.buttonGroup[2].disabled=false;//删除按钮
            self.buttonGroup[3].disabled=true;//保存按钮
            self.buttonGroup[4].disabled=true;//保存并新增按钮
            self.buttonGroup[13].disabled=true;//取消按钮
            // this.sureDoing();
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
      GetDateTime: function () {//审计信息时间转化拼接
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
        return currentdate;
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
    /*border-bottom: 1px solid #e4e4e4;*/
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
  }

  .supplier-modify .tabZoo .erp_bt:first-child{
    margin-left: 2px;
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
  .areaBox{
    height:33px;
    border:1px solid rgb(194, 202, 216);
    width: calc(100% - 96px);
  }
  .supplier-modify .el-input__inner{
    height:35px;
    border:1px solid white;
    /* border-color:white !important; */
  }
  .supplier-modify .all-table .el-input__inner{
    height:31px !important;
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
  .supplier-modify .area{
    width:100%!important;
    margin-right:0;
  }
  .el-select{
    height:31px;
  }
  .bgcolor .el-input {
    height:35px;
  }

  .el-select.areaDrop,.el-input.areaEntry{
    width: 136px;
  }
  .areaDrop input,.areaEntry input{
    border: none!important;
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
    /*text-indent:15px;*/
    text-align:center;
  }
  .supplier-modify #auditInformation{
    background:#fff !important;
    width:100% !important;
  }
  .supplier-modify .nopadding .inline-block-need{
    line-height:38px;
    border-bottom:2px solid #3cc;
  }
  .pt5 .bt_add {
    margin-left: 0;
  }

  /*新增*/
  input.input-need{
    width:70%;
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
  }
  .userDefined{
    height:27px;
  }
  .supplier-modify .el-row{
    border:none;
  }

  .bgcolor {
    height: 35px;
    font-size: 12px;
    margin-bottom:10px;
    width: 100%;
    float: left;
    overflow: hidden;
    margin-right: 5px;
  }
  .el-dialog__body{
    padding:10px 15px;
  }
  .el-dialog{
    width:50%;
  }
  .el-col-14{
    width:100%;
    text-align:center;
  }
  .el-dialog__footer{
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
  div.orderAmount{
    margin-left:0;
  }
  .supplier-modify .nopadding .inline-block-need{
    margin-left:10px;
  }
  .bg-white{
    /*height:50px;*/
    padding-top:10px;
  }
  /* 已生效 */
  .sealWapper{
    position: relative;
    overflow: visible;
    width: 45px;
    height: 40px;
    float: right;
    opacity: 0.5;
    margin-right:10px;
    /*margin-top:5px;*/
  }
  .seal,
  .seal1,
  .seal2,
  .seal3{
    position: absolute;
    background-repeat:no-repeat;
    background-position:center;
    top:0;
    left: 0;
    width: 45px;
    height: 45px;
  }
  .seal{
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    top: 0;
    left: 0;
    background-image: url(../../../../static/image/u1.png);
  }
  .seal1{
    background-image: url(../../../../static/image/u2.png);
  }
  .seal2{
    background-image: url(../../../../static/image/u3.png);
  }
  .seal3{
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    background-image: url(../../../../static/image/u4.png);
  }
  .seal3 span{
    font-family: 'microsoft yahei';
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 44px;
    color: #FF669B;
    transform: rotate(-90deg) scale(0.8);
    -ms-transform: rotate(-90deg) scale(0.8);
    -webkit-transform: rotate(-90deg) scale(0.8);
    -o-transform: rotate(-90deg) scale(0.8);
    -moz-transform: rotate(-90deg) scale(0.8);
  }
  #buyerNickName,#cardNumber{
    position:relative;
  }
  .nickNameImg,.cardNumberImg{
    position: absolute;
    top:7px;
    right:5px;
    width:20px;
    height:20px;
  }
  .nickNameImg{
    width:25px;
    height:25px;
    top:5px;
  }
  .supplier-modify .getPadding{
    padding:0;
  }
  .area{
    /*width: calc(100% - 96px);*/
  }
  h4.h4 {
    text-indent:10px;
    padding:10px 0 0 0;
  }
  .getPadding1{
    padding:10px 10px 0 0;
  }
  .auditInformation{
    width:100%;
  }
  .Search-Goods .el-dialog{
    width:100%!important;
    margin-right: auto!important;
    margin-bottom: 50px!important;
    margin-left: auto!important;
  }
  .Search-Goods{
    width:78%!important;
    margin:0 11%!important;
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
</style>
<style>
  .areaBox .areaDrop div.el-input .el-input__inner{
    height: 32px!important;
    border:none;
  }
  .Search-Goods .Goods-box {
    max-height: 550px;
    overflow: auto;
  }
</style>






