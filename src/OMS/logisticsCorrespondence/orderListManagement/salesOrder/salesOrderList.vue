<template>
  <div class="menu-list commodity">
    <el-row class="bg-white">
      <el-col :span="4" class="max-height left-box">
        <el-col :span='24' class="tree-container menulist-tree">
          <!--植树-->
          <el-input class="searchInput" placeholder="搜索..." v-model="filterText1"></el-input>
          <el-tree
            class="filter-tree"
            :data="data1"
            :render-content="renderContentOu1"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode1"
            @node-click="handleNodeClick"
            ref="tree1">
          </el-tree>
        </el-col>
      </el-col>
      <el-col :span='20' class="border-left min-height">
        <el-row class="h48 fixed">
          <el-col :span="24">
            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
          </el-col>
        </el-row>
        <el-row class="nopadding mt10">
                <ul class="navBar">
                  <li :class="{active: isActive2}" @click="timeAbout">时间相关</li>
                  <li :class="{active: isActive}" @click="receiving">收发货相关</li>
                  <li :class="{active: isActive1}" @click="others">其他相关</li>
                </ul>
                <div>
                  <el-row class="bg-white ft12 pr10 pt10">
                    <el-col :span="24" class="getPadding">
                      <el-row>
                      <!--显示的信息-->
                      <!--单号/交易号-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>单号/交易号</label>
                        <el-input v-model="queryParams.SoCodeOrTransCode"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--店铺-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>店铺</label>
                        <el-select filterable
                                    clearable
                                   :filter-method="filterMethod"
                                   v-model="queryParams.ShopId"
                                   class="status"
                                   placeholder="">
                          <el-option v-for="item in webshop1"
                                     :key="item.shopId"
                                     :label="item.shopName"
                                     :value="item.shopId">
                            <span style="float: left">{{item.shopCode}}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.shopName}}</span>
                          </el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--发货仓库-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                      <label>发货仓库</label>
                        <el-select filterable
                                   clearable
                                   v-model="queryParams.DeliveryStockId"
                                   :filter-method="filterStockMethod"
                                   class="status"
                                   placeholder="">
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
                      <!--交易状态-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                      <label>交易状态</label>
                        <el-select v-model="queryParams.TransStatus"
                                   class="status"
                                   clearable
                                   placeholder="">
                          <el-option v-for="item in selectedData.transactionStatus"
                                     :key="item.itemValue"
                                     :label="item.itemName"
                                     :value="item.itemValue"></el-option>
                        </el-select>
                    </div>
                        </el-col>
                      <!--商品编码-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>商品编码</label>
                        <el-input v-model="queryParams.SkuCode"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--sku/条码-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>sku/条码</label>
                        <el-input v-model="queryParams.SkuId"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--卖家昵称-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>卖家昵称</label>
                        <el-input v-model="queryParams.BuyerNickname"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--创建日期-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor">
                        <label>创建日期</label>
                          <div class="rangeDate">
                            <el-date-picker
                              v-model="creatRange"
                              class="creatdateRange"
                              type="daterange"
                              @change="getCreatTime"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </div>
                      </div>
                        </el-col>
                      <!--生效日期-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="firstRow">
                        <label>生效日期</label>
                        <div class="rangeDate">
                          <el-date-picker
                            v-model="effectiveRange"
                            class="dateRange"
                            type="daterange"
                            @change="getEffectTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </div>
                      </div>
                        </el-col>
                      <!--支付时间-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="firstRow">
                        <label>支付时间</label>
                        <div class="rangeDate">
                          <el-date-picker
                            v-model="dateRange"
                            class="dateRange"
                            type="daterange"
                            @change="getTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </div>
                      </div>
                        </el-col>
                      <!--第二行-->
                      <!--收货人姓名-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="secondRow">
                        <label>收货人姓名</label>
                        <el-input v-model="queryParams.Consignee"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div></el-col>
                      <!--收货人电话-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="secondRow">
                        <label>收货人电话</label>
                        <el-input v-model="queryParams.ConsigneeMobileOrPhone"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--收货人地址-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="secondRow">
                        <label>收货人地址</label>
                        <el-input v-model="queryParams.ConsigneeAddress"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--物流公司-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="secondRow">
                        <label>物流公司</label>
                        <el-select filterable
                                   clearable
                                   :filter-method="filterlogisticMethod"
                                   v-model="queryParams.LogisticsId"
                                   class="status"
                                   placeholder="">
                          <el-option v-for="item in LogisticsCompanyfilter"
                                     :key="item.id"
                                     :label="item.contactName"
                                     :value="item.id">
                            <span style="float: left">{{item.contactCode}}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contactName}}</span>
                          </el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--物流单号-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor" v-show="secondRow">
                        <label>物流单号</label>
                        <el-input v-model="queryParams.LogisticsBillCode"
                                  placeholder=""
                                  class="manager"></el-input>
                      </div>
                        </el-col>
                      <!--第三行-->
                      <!--金额范围-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>金额范围</label>
                        <div id="rangMoney" class="el-date-editor el-range-editor el-input__inner dateRange el-date-editor--daterange">
                          <input  class="el-range-input moneyMin" v-model="queryParams.MinAmount">
                          <span class="el-range-separator">至</span>
                          <input  class="el-range-input moneyMax" v-model="queryParams.MaxAmount">
                        </div>
                      </div>
                        </el-col>
                      <!--数量范围-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>数量范围</label>
                        <div id="rangMoney1" class="el-date-editor el-range-editor el-input__inner dateRange el-date-editor--daterange">
                          <input  class="el-range-input moneyMin" v-model="queryParams.MinCountQty">
                          <span class="el-range-separator">至</span>
                          <input  class="el-range-input moneyMax" v-model="queryParams.MaxCountQty">
                        </div>
                      </div>
                        </el-col>
                      <!--是否拆单-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>是否拆单</label>
                        <el-select v-model="queryParams.CreatedTypeid"
                                   class="status"
                                   placeholder="">
                          <el-option v-for="item in selectedData.isSplit"
                                     :key="item.id"
                                     :label="item.value"
                                     :value="item.id"></el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--卖家备注-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>卖家备注</label>
                        <el-select v-model="queryParams.SalerMsg"
                                   class="status"
                                   placeholder="">
                          <el-option v-for="item in selectedData.sellerMsg"
                                     :key="item.id"
                                     :label="item.value"
                                     :value="item.id"></el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--业务组织-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>业务组织</label>
                        <el-select v-model="queryParams.ouId"
                                   placeholder=""
                                   class="ouId">
                          <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="ouSearch"></el-input>
                          <el-tree :data="ouAr"
                                   :default-expanded-keys="expandId"
                                   :props="selectOuProps"
                                   :highlight-current="true"
                                   node-key="id"
                                   :render-content="renderContentOu"
                                   ref="ouTree"
                                   :filter-node-method="ouFilterNode"
                                   :expand-on-click-node="false"
                                   @node-click="ouNodeClick"></el-tree>
                          <el-option v-show="false"
                                     v-for="item in ouSelectAr"
                                     :key="item.id"
                                     :label="item.ouName"
                                     :value="item.id"
                                     :date="item.id"></el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--标签名称-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>标签名称</label>
                        <el-select v-model="queryParams.billingCode"
                                   class="status"
                                   placeholder="">
                          <el-option v-for="item in selectedData.label"
                                     :key="item.itemValue"
                                     :label="item.itemName"
                                     :value="item.itemValue"></el-option>
                        </el-select>
                      </div>
                        </el-col>
                      <!--买家留言-->
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                            <div class="bgcolor"  v-show="thirdRow">
                        <label>买家留言</label>
                        <el-select v-model="queryParams.BuyerMsg"
                                   class="status"
                                   clearable
                                   placeholder="">
                          <el-option v-for="item in selectedData.buyersMsg"
                                     :key="item.id"
                                     :label="item.value"
                                     :value="item.id"></el-option>
                        </el-select>
                      </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="24" class="searchBtn">
                      <span class="search-btn" @click="SimpleSearch">查询</span>
                    </el-col>
                  </el-row>
                </div>
              <!--表格-->
              <el-table
                v-loading="loading"
                :data="tablelist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                style="width: 100%"
                stripe
                row-key="id"
                :expand-row-keys="expands"
                @row-click="rowClick"
                :row-key="getRowKeys"
                @selection-change="handleSelectionChange1"
                ref="multipleTable">
                <!--展开部分-->
                <el-table-column type="expand" fixed="left">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-table
                        :data="saleOrderDetail"
                        border
                        style="width: 100%"
                        stripe
                        ref="multipleTable">
                        <!--<el-table-column type="selection" width="50"></el-table-column>-->
                        <el-table-column prop="skuId" label="SKU"></el-table-column>
                        <el-table-column prop="skuCode" label="商品编码"></el-table-column>
                        <el-table-column prop="skuName" label="商品名称"></el-table-column>
                        <el-table-column prop="address" label="规格"></el-table-column>
                        <el-table-column prop="payPrice" label="结算价"></el-table-column>
                        <el-table-column prop="qty" label="数量"></el-table-column>
                        <el-table-column prop="payamount" label="结算额"></el-table-column>
                      </el-table>
                    </el-form>
                    <buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1'></buttonGroup>
                  </template>
                </el-table-column>
                <!--展开部分-->

                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="date" label="标签"></el-table-column>
                <el-table-column prop="billCode" label="单据号"></el-table-column>
                <el-table-column prop="shopName" label="店铺"></el-table-column>
                <el-table-column prop="transCode" label="网店交易单号"></el-table-column>
                <el-table-column prop="soDate" label="开单日期"></el-table-column>
                <el-table-column prop="address" label="单据状态"></el-table-column>
                <el-table-column prop="deliveryStockName" label="发货仓库"></el-table-column>
                <el-table-column prop="buyerMsg" label="买家留言"></el-table-column>
                <el-table-column prop="salerNote" label="卖家备注"></el-table-column>
                <el-table-column prop="payTime" label="支付时间"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="address" label="补拍订单"></el-table-column>
                <el-table-column prop="transStatus" label="交易状态"></el-table-column>
                <el-table-column prop="logisticsName" label="物流公司"></el-table-column>
                <el-table-column prop="waybillCode" label="物流单号"></el-table-column>
                <el-table-column prop="doStatus" label="配货状态"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="auto">
                  <template slot-scope="scope">
                    <el-button  @click="view(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="delOrder(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <buttonGroup :buttonGroup="buttonGroup2" @btnClick='btnClick2'></buttonGroup>
              <!--分页-->
              <div>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalItem">
                </el-pagination>
              </div>
              <!--明细表-->
              <el-collapse-transition>
                <div v-show="ifShow3">
                  <!--<el-table-->
                    <!--:data="saleOrderDetail"-->
                    <!--border-->
                    <!--style="width: 100%"-->
                    <!--stripe-->
                    <!--@selection-change="handleSelectionChange2"-->
                    <!--ref="multipleTable">-->
                    <!--&lt;!&ndash;<el-table-column type="selection" width="50"></el-table-column>&ndash;&gt;-->
                    <!--<el-table-column prop="skuId" label="SKU"></el-table-column>-->
                    <!--<el-table-column prop="skuCode" label="商品编码"></el-table-column>-->
                    <!--<el-table-column prop="skuName" label="商品名称"></el-table-column>-->
                    <!--<el-table-column prop="address" label="规格"></el-table-column>-->
                    <!--<el-table-column prop="payPrice" label="结算价"></el-table-column>-->
                    <!--<el-table-column prop="qty" label="数量"></el-table-column>-->
                    <!--<el-table-column prop="payamount" label="结算额"></el-table-column>-->
                  <!--</el-table>-->

                  <!--<buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1'></buttonGroup>-->
                </div>
              </el-collapse-transition>
        </el-row>

        <!--<el-row>-->
          <!--<el-col :span='24'>-->
            <!--<Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--修改仓库-->
        <el-dialog title="修改仓库" :visible.sync="dialogFormVisible3">
          <el-form>
            <el-form-item label="仓库" :label-width="formLabelWidth" class="modifyStock">
              <el-select v-model="modifyStockId"
                         filterable
                         :filter-method='filterModifyStockMethod'
                         class="status"
                         @change="selectGet"
                         placeholder="">
                <el-option v-for="item in modifyStockFilter"
                           :key="item.id"
                           :label="item.stockName"
                           :value="item.id">
                        <span style="float: left">{{item.stockCode}}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer footerButton">
            <el-button type="primary" @click="modifySure">确 定</el-button>
            <el-button @click="dialogFormVisible3=false" class="cancelModifyButton">取 消</el-button>
          </div>
        </el-dialog>
        <!--详情修改仓库-->
        <el-dialog title="修改仓库" :visible.sync="dialogFormVisible5">
          <el-form>
            <el-form-item label="仓库" :label-width="formLabelWidth">
              <el-select v-model="modifyStockId1"
                         class="status"
                         filterable
                         :filter-method='filterModifyStockMethod1'
                         @change="selectGet3"
                         placeholder="">
                <el-option v-for="item in modifyStockFilter1"
                           :key="item.id"
                           :label="item.stockName"
                           :value="item.id">
                  <span style="float: left">{{item.stockCode}}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.stockName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer footerButton">
            <el-button type="primary" @click="modifySure1">确 定</el-button>
            <el-button @click="dialogFormVisible5=false" class="cancelModifyButton1">取 消</el-button>
          </div>
        </el-dialog>
        <!--修改物流公司-->
        <el-dialog title="修改物流公司" :visible.sync="dialogFormVisible4">
          <el-form>
            <el-form-item label="物流公司" :label-width="formLabelWidth">
              <el-select v-model="Logisticsid"
                         class="status"
                         :filter-method='filtermodifyLogisticsMethod'
                         @change="selectGet1"
                         placeholder="">
                <el-option v-for="item in modifyLogisticfilter"
                           :key="item.id"
                           :label="item.contactName"
                           :value="item.id">
                  <span style="float: left">{{item.contactCode}}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contactName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer footerButton">
            <el-button type="primary" @click="modifyLogisticsidSure">确 定</el-button>
            <el-button @click="dialogFormVisible4=false" class="cancelButtonLogistic">取 消</el-button>
          </div>
        </el-dialog>
        <!--详情修改物流公司-->
        <el-dialog title="修改物流公司" :visible.sync="dialogFormVisible6">
          <el-form>
            <el-form-item label="物流公司" :label-width="formLabelWidth">
              <el-select v-model="Logisticsid1"
                         class="status"
                         filterable
                         :filter-method='filtermodifyLogisticsMethod1'
                         @change="selectGet4"
                         placeholder="">
                <el-option v-for="item in modifyLogisticfilter1"
                           :key="item.id"
                           :label="item.contactName"
                           :value="item.id">
                  <span style="float: left">{{item.contactCode}}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contactName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer footerButton">
            <el-button type="primary" @click="modifyLogisticsidSure1">确 定</el-button>
            <el-button @click="dialogFormVisible6=false" class="cancelButtonLogistic1">取 消</el-button>
          </div>
        </el-dialog>
        <!--拆分订单-->
        <el-dialog title="拆分订单" :visible.sync="dialogFormVisible7">
          <el-table
          :data="saleOrderDetail1"
          border
          style="width: 100%"
          stripe
          ref="multipleTable">
            <el-table-column prop="skuId" label="SKU"></el-table-column>
            <el-table-column prop="skuName" label="商品名称"></el-table-column>
            <el-table-column prop="qty" label="数量"></el-table-column>
            <el-table-column prop="activityNo" label="库存"></el-table-column>
            <el-table-column prop="discount" label="拆出数量">
              <template slot-scope="scope">
                <input class="input-need"
                       :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                       v-model="scope.row.discount"
                       type="text"
                       @change="handleBankChange(scope.$index,scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer footerButton">
            <el-button type="primary" @click="splitOrder">确 定</el-button>
            <el-button @click="dialogFormVisible7=false"  class="cancelSplit">取 消</el-button>
          </div>
        </el-dialog>
        <!--拆分订单-->
        <!--详情拆分订单-->
        <el-dialog title="拆分订单" :visible.sync="dialogFormVisible8">
          <el-table
            :data="saleOrderDetail2"
            border
            style="width: 100%"
            stripe
            ref="multipleTable">
            <el-table-column prop="skuId" label="SKU"></el-table-column>
            <el-table-column prop="skuName" label="商品名称"></el-table-column>
            <el-table-column prop="qty" label="数量"></el-table-column>
            <el-table-column prop="activityNo" label="库存"></el-table-column>
            <el-table-column prop="discount" label="拆出数量">
              <template slot-scope="scope">
                <input class="input-need"
                       :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                       v-model="scope.row.discount"
                       type="text"
                       @change="handleBankChange(scope.$index,scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="splitOrder1">确 定</el-button>
            <el-button @click="dialogFormVisible7=false">取 消</el-button>
          </div>
        </el-dialog>
        <!--详情拆分订单-->
        <!--<div class="bottomButton">-->
          <!--<buttonGroup :buttonGroup="buttonGroup2" @btnClick='btnClick2'></buttonGroup>-->
        <!--</div>-->
      </el-col>
    </el-row>
    <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->

  </div>

</template>
<script>
  import buttonGroup from '../../../base/buttonGroup/buttonGroup'
  import Table from '../../../base/Table/Table'
  import dialogBox from '../../../base/dialog/dialog'
  import Tree from '../../../base/tree/tree'
  import {FILTER_MOTHED} from '../../../common/common.js'
  export default{
    name:'customerInfor',
    data(){
      return {
        filterText1: '',
        data1: [{
          id: 1,
          label: '销售订单',
          children: [
            {
              id: 2,
              label: '换货订单'
            },{
              id: 3,
              label: '未审核订单'
            },{
              id: 4,
              label: '缺货订单'
            },{
              id: 5,
              label: '挂起订单'
            },{
              id: 6,
              label: '待拣货订单'
            },{
              id: 7,
              label: '已通知拣货订单'
            },{
              id: 8,
              label: '已出库订单'
            }
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // 分页
        currentPage:1,//分页的当前页码
        totalPage:0,//当前分页总数
        pagesize:5,//一页有多少条消息
        totalItem:0,//总共有多少条消息
        //---所属组织树形下拉-----
        ouSearch:'',
        selectOuProps:{
          children: 'children',
          label: 'ouName',
          id:'id'
        },
        ouAr:[],//所属组织下拉框
        ouSelectAr:[],//选择下拉
        expandId:[],
        expands: [],// 要展开的行，数值的元素是row的key值
        //-----------------------
// 新加-----------------------
        url:"http://192.168.100.107:8099",//提取公用服务器地址
        loading: true,
        ifShow3:false,
        firstRow:false,
        secondRow:false,
        thirdRow:false,
        isActive:false,
        isActive1:false,
        isActive2:false,
        activeName: 'time',
        singleDeleteId:'',//单项删除的id
        selectedData:{
          webshopArr:[],//店铺
          stockArr:[],//发货仓
          modifyStockArr:[],//修改仓库
          modifyStockArr1:[],//详情修改仓库
          label:[],//标签
          transactionStatus:[],//交易状态
          LogisticsCompanyArr:[],//物流公司
          modifyLogisticsCompanyArr:[],//修改物流公司
          modifyLogisticsCompanyArr1:[],//详情修改物流公司
          isSplit:[{id:1,value:"是"},{id:2,value:"否"}],
          buyersMsg:[{id:1,value:"是"},{id:2,value:"否"}],
          sellerMsg:[{id:1,value:"是"},{id:2,value:"否"}],
        },
        checkId:'',//选中的id
        againstCheckId:'',//
        formLabelWidth: '120px',
        splitId:'',//拆分id
        tablelist:[],//列表数据
        saleOrderDetail:[],//根据表中的某一条查询某一条详情数据
        saleOrderDetail1:[],//
        saleOrderDetail2:[],//
        dateRange:[],
        creatRange:[],
        effectiveRange:[],
        multipleSelection1: [],
        multipleSelection2:[],
        buttonGroup:[
          {
            text:'新增',
            class:'bt_add',
            icon:'icon-xinzeng',
            disabled:false,
          },{
            text:'删除',
            class:'bt_del',
            icon:'icon-shanchu',
            disabled:false,
          },{
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
            text:'导出',
            class:'bt_out',
            icon:'icon-daochu',
            disabled:false,
          },{
            text:'打印',
            class:'bt_print',
            icon:'icon-print',
            disabled:false,
          }
        ],
        buttonGroup1:[
          {
            text:'审核',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'反审核',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'作废',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'挂起',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'解挂',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'拆分订单',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'修改仓库',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'修改物流公司',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
            text:'撤销物流',
            class:'bt_in',
            icon:'',
            disabled:false,
          },
          {
          text:'重传物流',
          class:'bt_in',
          icon:'',
          disabled:false,
        }
        ],
        buttonGroup2:[
          {
            text:'挂起',
            class:'bt_add',
            icon:'',
            disabled:false,
          },{
            text:'解挂',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'合并订单',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'撤销订单',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'拆分订单',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'撤销拆分',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'修改仓库',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'修改物流公司',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'撤销物流',
            class:'bt_print',
            icon:'',
            disabled:false,
          },{
            text:'重传物流',
            class:'bt_print',
            icon:'',
            disabled:false,
          }
        ],
        // 新加结束--------------------
        // 错误信息提示开始
        detail_message_ifShow:false,
        errorMessage:false,
        // 错误信息提示结束
//--------------确认删除开始-----------------
        dialogUserConfirm:false,//用户删除保存提示信息
        row:{},//存储用户点击删除条目数据
        choseAjax:'',//存储点击单个删除还是多天删除按钮判断信息
        multipleSelection: [],//复选框选中数据
        idArray: {
          ids: []
        },
//--------------确认删除开始-----------------
        searchLeft:'',
        timeout:null,
        restaurants:[],

        tableData:[],
        dialogData:{},

        componyTree:  [],
        expandId:[],//默认展开
        treeEntrySearch:true,//是否包含树节点过滤功能
        treeSuggestSearch:false,//是否包含树节点建议过滤功能
        defaultProps1:{
          children: 'childNodes',
          label: 'moduleName',
          id:'id',
        },
        treeParams:{
          treeName:'menuList',//树节点名称
          treeApi:'/api/services/app/ModuleManagement/GetModulesTree?id=0'//接口地址
        },

        treeCheck:[],
        isClick:[],
        load:'loadTableData',

        tableLoading:true,
        treeLoading:true,
        Sorting:'',//table搜索
        dialogFormVisible:false,
        tittle:'',
        dialogUserDefined:false,//dialog
        dialogFormVisible3:false,//修改仓库
        dialogFormVisible5:false,//详情修改仓库
        dialogFormVisible4:false,//修改物流公司
        dialogFormVisible6:false,//详情修改物流公司
        dialogFormVisible7:false,//拆分订单
        dialogFormVisible8:false,//详情拆分订单
        detailParentId:'default',//tree节点点击获取前往detail新增页上级菜单ID
        detailParentName:'default',//tree节点点击获取前往detail新增页上级菜单name

        response:{
          details:'',
          message:'',
          validationErrors:[],
        },
        SearchKey:'',//右上搜索
        tableModel:"menuList",

        // httpUrl:{
        //   view:'/menu/menuModify/',//查看详情
        //   delete:'/api/services/app/ModuleManagement/Delete',//单条删除
        //   query:'/api/services/app/ModuleManagement/GetListByCondition',//条件查询
        // },
        queryParams:{//查询条件参数
          groupId:'',//选中业务组织的groupId--业务组织,
          stockId: '',
          opAreaId:'',


          SoCodeOrTransCode:'',//单据号/交易号
          ShopId:'',//店铺ID
          DeliveryStockId:'',//发货仓库Id
          TransStatus:'',//交易状态
          SkuCode:'',//商品编码
          SkuId:'',//skuId
          BuyerNickname:'',// 买家昵称
          StartSoDate:'',// 开单日期-开始
          EndSoDate:'',// 开单日期-结束
          StartEffectiveTime:'',// 生效日期-开始
          EndEffectiveTime:'',// 生效日期-结束
          PayTimeStart:'',//支付时间-开始
          PayTimeEnd:'',//支付时间-结束
          Consignee:'',// 收货人
          ConsigneeMobileOrPhone:'',// 收货人手机或电话
          ConsigneeAddress:'', // 收货人地址(都需要模糊查询省市区和详细地址)
          LogisticsId:'',// 物流公司ID (客户/供应商ID)
          LogisticsBillCode:'',// 物流单号
          MinAmount:'',// 搜索最小金额
          MaxAmount:'',// 搜索最大金额
          MinCountQty:'',// 最小数量
          MaxCountQty:'',// 最大数量
          CreatedTypeid:'',// 新增类型
          IsDismantling:'',// 是否拆单
          SoType:'',// 销售类型
          BuyerMsg:'',// 买家留言
          SalerMsg:'',// 卖家备注
          Sorting:'',
          SkipCount:(this.$store.state.menuListCurrentPage-1)*this.$store.state.menuListEachPage,
          MaxResultCount:this.$store.state.menuListEachPage,
        },
        modifyStockId:'',//修改仓库Id
        chooseModifyStockId:'',//选择要变成的仓库id
        modifyStockId1:'',//修改仓库Id
        chooseModifyStockId1:'',//选择要变成的仓库id
        Logisticsid:'',//修改物流公司的id
        chooseModifyLogisticsid:'',//选择要变成的物流公司id
        Logisticsid1:'',//修改物流公司的id
        chooseModifyLogisticsid1:'',//选择要变成的物流公司id
        column: [
          {
          prop: 'systemId_SystemName',
          label: '系统',
          controls:'button',
          isDisable:true,
          sortable:false,
          isFix:'',
        }, {
          prop: 'moduleCode',
          label: '模块编码',
          controls:'button',
          isDisable:true,
          sortable:false,
        }, {
          prop: 'moduleName',
          label: '模块名称',
          controls:'text',
          isDisable:true,
          sortable:false,
        }, {
          prop: 'url',
          label: '路由地址',
          controls:'text',
          isDisable:true,
          sortable:false,
        },{
          prop: 'moduleParentId_ModuleName',
          label: '上级菜单',
          controls:'text',
          isDisable:true,
          sortable:false,
        }, {
          prop: 'status',
          label: '状态',
          controls:'classMapSelect',
          isDisable:true,
          sortable:false,
          dataSource:[],
        }],
        dialogVisible:false,
        dialogCommand:[],
        pluginSetting:{
          hasPagination:true,
          mutiSelect:true,//多选栏
          isDisable:true,
        },
        command:[
          {
          text:'查看',
          class:'green'
        },{
          text:'删除',
          class:'blue'
        }],
        delAarry:{//删除数组
          ids:[]
        },
        errorTips:{//对话框 错误提示
          message:'',
          details:'',
        },
        dialogSetting:{
          message:'',//提示信息
          dialogName:'',//对话框名称
          dialogType:'',//对话框类型
        },
        hangUpArr:'',
        detailId:{},//某条数据的具体id
        detailId1:[],
        hangUpArr1:[],
        flag1:false,
        filterKey:'',
        filterStockKey:'',
        filterlogisticKey:'',
        filterModifyStockKey:'',
        filterModifyLogisticsKey:'',
        filterModifyStockKey1:'',
        filterModifyLogisticsKey1:'',
      }
    },
    created:function(){
      let _this=this;
      _this.loadSelectData();
      // _this.getTable();
      _this.loadTree();
      // _this.InitStatus();
    },
    watch: {
      filterText1(val) {
        this.$refs.tree1.filter(val);
        console.log(val)
      },
      ouSearch(val) {//业务组织
        this.$refs.ouTree.filter(val);
      },

      // searchLeft(val) {
      //   this.$refs.tree.filter(val);
      // },
      queryParams:{
        handler:function(val,oldVal){
        },
        deep:true
      },
    },
    computed:{
      webshop1: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterKey,this.selectedData.webshopArr)
      },
      stockfilter: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterStockKey,this.selectedData.stockArr)
      },
      LogisticsCompanyfilter: function () {//下拉数据自定义搜索过滤
        return FILTER_MOTHED(this.filterlogisticKey,this.selectedData.LogisticsCompanyArr)
      },
      modifyStockFilter:function(){
        return FILTER_MOTHED(this.filterModifyStockKey,this.selectedData.modifyStockArr)
      },
      modifyStockFilter1:function(){
        return FILTER_MOTHED(this.filterModifyStockKey1,this.selectedData.modifyStockArr1)
      },
      modifyLogisticfilter:function(){
        return FILTER_MOTHED(this.filterModifyLogisticsKey,this.selectedData.modifyLogisticsCompanyArr)
      },
      modifyLogisticfilter1:function(){
        return FILTER_MOTHED(this.filterModifyLogisticsKey1,this.selectedData.modifyLogisticsCompanyArr1)
      },
    },
    methods:{
      loadSelectData(){
        let _this = this;
        _this.$axios.gets(_this.url+"/api/services/app/OmsWebShopManagement/GetAll", {
          SkipCount:0,
          MaxResultCount:999
        }).then(function(res) {
          // 店铺
          _this.selectedData.webshopArr = res.result.items;
        });
        // 物流公司下拉
        _this.$axios.gets("/api/services/app/ContactManagement/GetListByConditionSupplier",
          {
            ContactWorkPropertyId:1,
            SkipCount: 0,
            MaxResultCount: 1000
          }).then(function(res) {
          _this.selectedData.LogisticsCompanyArr = res.result.items;
          _this.selectedData.modifyLogisticsCompanyArr= res.result.items;
          _this.selectedData.modifyLogisticsCompanyArr1= res.result.items;
          console.log(_this.selectedData.LogisticsCompanyArr);
        });
        // 发货仓库
        _this.$axios.gets("/api/services/app/StockManagement/GetRepositoryList",
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
          _this.selectedData.stockArr = res.result.items;
          _this.selectedData.modifyStockArr = res.result.items;
          _this.selectedData.modifyStockArr1 = res.result.items;
          console.log( _this.selectedData.stockArr);
        });
        //交易状态
        _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_TransStatus"
        }).then(function(res) {
          console.log(res.result);
          _this.selectedData.transactionStatus = res.result;
          console.log( _this.selectedData.transactionStatus);
        });
        //标签
        _this.$axios.gets("/api/services/app/DataDictionary/GetDictItem", {dictName: "OMS_SOTag"
        }).then(function(res) {
          console.log(res.result);
          _this.selectedData.label = res.result;
          console.log( _this.selectedData.label);
        });
        //列表数据
        _this.$axios.gets(_this.url+"/api/services/app/OmsSoManagement/GetWebsoMtrData",_this.queryParams).then(function(res) {
          _this.loading=false;
          _this.tablelist = res.result.items;
          _this.totalItem=res.result.items.length;
          console.log(_this.tablelist);
        });
        // 业务组织
        //所属组织
        _this.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){
          console.log(res);
          _this.ouSelectAr = res.result;
        });
        _this.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
          // console.log(res);
          _this.ouAr = res;
          _this.expandId=_this.defauleExpandTree(res.result,'id')
          // self.loadIcon();
        },function(res){
          console.log('err'+res)
        });
      },
      filtermodifyLogisticsMethod(query){//修改物流
        this.filterModifyLogisticsKey=query;
      },
      filtermodifyLogisticsMethod1(query){//修改物流
        this.filterModifyLogisticsKey1=query;
      },
      filterModifyStockMethod(query){//修改仓库
        this.filterModifyStockKey=query;
      },
      filterModifyStockMethod1(query){//修改仓库
        this.filterModifyStockKey1=query;
      },
      filterMethod(query){//搜索代码和名称--店铺
        this.filterKey=query;
      },
      filterStockMethod(query){//搜索代码和名称--发货仓
        this.filterStockKey=query;
      },
      filterlogisticMethod(query){//搜索代码和名称--发货仓
        this.filterlogisticKey=query;
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        if(data.label =="换货订单"){//判断点击节点，choose the node you clicked
            alert('换货订单!数据缺失和不完整导致左侧树形暂不能查询！');
        }
        console.log(data.label);
        console.log(data)
      },
      // 分页
      handleSizeChange(val) {
        let _this=this;
        _this.pagesize = val;
      },
      handleCurrentChange(val){//改变页码
        let _this=this;
        _this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      //业务组织

      // 增加和减少查询条件
      timeAbout(){
        let _this=this;
        _this.isActive2=!_this.isActive2;
        _this.firstRow=!_this.firstRow;
      },
      receiving(){
        let _this=this;
        _this.isActive=!_this.isActive;
        _this.secondRow=!_this.secondRow;
      },
      others(){
        let _this=this;
        _this.isActive1=!_this.isActive1;
        _this.thirdRow=!_this.thirdRow;
      },
      getRowKeys(row) {
        return row.id;
        console.log(row.id);
      },

      //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="id"
      rowClick(row, event, column) {
        let _this=this;
        _this.expands = [];
        _this.expands.push(row.id);
        console.log(_this.expands);
        console.log(row.id);
        _this.detailId=row.id;
        console.log(_this.detailId);
        _this.detailId1.push(_this.detailId);
        console.log(_this.detailId1);
        //查询列表中某一条的详情
        _this.$axios.gets(_this.url+"/api/services/app/OmsSoManagement/GetWebsoMtrDataById",
          {
            id:row.id
          }).then(function(res){
          _this.saleOrderDetail = res.result.websoDtlDtoList ;
          console.log(_this.saleOrderDetail);
        });
      },
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
        let ids = [];
        this.multipleSelection1.map((item)=> {
          ids.push(item.id)
        });
        this.hangUpArr=ids;
        console.log(ids);
        console.log(this.hangUpArr);
      },
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      view(row){//表格查看按钮
        let _this=this;
        _this.$store.state.url = "/salesOrder/salesOrderModify/"+row.id;
        _this.$router.push({ path: _this.$store.state.url }); //点击切换路由
      },
      delOrder(row){//单条删除销售订单
        let _this=this;
        _this.singleDeleteId=row.id;
        console.log(_this.singleDeleteId);
        _this.dialogSetting.dialogName='delDialog';
        _this.dialogSetting.message="确定删除？";
         _this.dialogSetting.dialogType="confirm";   //这里都赋值了所以直接走了
        _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        _this.dialogVisible=true;
      },
      getTime(date){
        this.time = date;
        this.dateRange=this.time;
        console.log(this.dateRange);
      },
      getEffectTime(date){
        this.time = date;
        this.effectiveRange=this.time;
        console.log(this.effectiveRange);
      },
      getCreatTime(date){//创建时间转化
        this.time = date;
        this.creatRange=this.time;
        console.log(this.creatRange);
      },

      btnClick:function(data){
        let _this=this;
        if(data=="新增"){
          _this.goDetail();
        }else if(data=="删除"){
          _this.dialogSetting.dialogName='batchdelDialog';
          _this.dialogSetting.message="确定删除？";
          _this.dialogSetting.dialogType="confirm";
          _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
          _this.dialogVisible=true;
        }else if(data=="审核"){
          _this.checkOrder();
        }else if(data=="反审核"){
          _this.againstCheckOrder();
        }else if(data=="导入"){
          let name='menuImportFile';//具体菜单页面下的导入模板路由name
          let backRouterName='menuList';//导入模板里面的返回前一页功能需要传入的前一页的路由name
          let id='default';//key
          _this.$store.state.url=name;
          _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
        }
      },
      checkOrder(){//审核
        let _this=this;
        if(_this.multipleSelection1.length==0){
          this.$message({
            type: 'warning',
            message: '请勾选需要审核的项！'
          });
        }else if(_this.multipleSelection1.length>1){
          this.$message({
            type: 'warning',
            message: '一次只能审核一条！'
          });
        }else{
          for(let i in _this.multipleSelection1){
            _this.checkId=_this.multipleSelection1[i].id
          }
          _this.$axios.posts(_this.url+"/api/services/app/OmsSoManagement/Check", {id:_this.checkId}
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
        }
      },
      againstCheckOrder(){//反审核
        let _this=this;
        if(_this.multipleSelection1.length==0){
          this.$message({
            type: 'warning',
            message: '请勾选需要反审核的项！'
          });
        }else if(_this.multipleSelection1.length>1){
          this.$message({
            type: 'warning',
            message: '一次只能反审核一条！'
          });
        }else{
          for(let i in _this.multipleSelection1){
            _this.againstCheckId=_this.multipleSelection1[i].id
          }
          _this.$axios.posts(_this.url+"/api/services/app/OmsSoManagement/InsteadCheck", {id:_this.againstCheckId}
          ).then(function(res) {
            _this.open('反审核成功','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'cancelDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }
      },
      handleBankChange:function(index,row){},//银行修改
      btnClick2:function(data){
        if(data=="挂起"){
          let _this=this;
          console.log(_this.hangUpArr);
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else{
            _this.$axios.posts(_this.url+'/api/services/app/OmsSoManagement/SuspendWebsoMtr',
               _this.hangUpArr
            ).then(function(res){//
              _this.open('挂起成功','el-icon-circle-check','successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="解挂"){
          let _this=this;
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else{
            _this.$axios.posts(_this.url+'/api/services/app/OmsSoManagement/RelieveSuspendWebsoMtr',
              _this.hangUpArr
            ).then(function(res){//
              _this.open('解除挂起成功','el-icon-circle-check','successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="拆分订单"){
          let _this=this;
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else if(_this.hangUpArr.length>1){
            _this.$message({
              type: 'warning',
              message: "一次只能拆分一个销售订单！"
            });
          }else {
            _this.dialogFormVisible7=true;
            for(let i in _this.multipleSelection1){
              _this.splitId=_this.multipleSelection1[i].id
            }
            console.log(_this.splitId);
            _this.$axios.gets(_this.url+"/api/services/app/OmsSoManagement/GetWebsoMtrDataById",
              {
                id:_this.splitId
              }).then(function(res){
              _this.saleOrderDetail1 = res.result.websoDtlDtoList ;
              console.log(_this.saleOrderDetail1);
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="合并订单"){
          let _this=this;
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else if(_this.hangUpArr.length==1){
            _this.$message({
              type: 'warning',
              message: "两条或以上才能合并！"
            });
          }else {
            _this.$axios.posts(_this.url + '/api/services/app/OmsSoManagement/WebsoMtrMerge',
              _this.hangUpArr
            ).then(function (res) {//
              _this.open('合并成功', 'el-icon-circle-check', 'successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(data=="修改仓库"){
          let _this=this;
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else if(_this.hangUpArr.length>0){
            _this.dialogFormVisible3=true;
          }
        }else if(data=="修改物流公司"){
          let _this=this;
          if(_this.hangUpArr.length==0){
            _this.$message({
              type: 'warning',
              message: "请先勾选销售订单！"
            });
          }else if(_this.hangUpArr.length>0){
            _this.dialogFormVisible4=true;
          }
        } else if(data=="导入"){
          // let _this=this;
          // let name='menuImportFile';//具体菜单页面下的导入模板路由name
          // let backRouterName='menuList';//导入模板里面的返回前一页功能需要传入的前一页的路由name
          // let id='default';//key
          // _this.$store.state.url=name;
          // _this.$router.push({name:name,params:{id:id,backRouterName:backRouterName}})//点击切换路由
        }
      },
      btnClick1:function(data){
        if(data=="挂起"){
          let _this=this;
            _this.$axios.posts(_this.url+'/api/services/app/OmsSoManagement/SuspendWebsoMtr',
               _this.detailId1
            ).then(function(res){
              _this.open('挂起成功','el-icon-circle-check','successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'sureDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
        }else if(data=="解挂"){
          let _this=this;
          _this.$axios.posts(_this.url+'/api/services/app/OmsSoManagement/RelieveSuspendWebsoMtr',
            _this.detailId1
          ).then(function(res){
            _this.open('解除挂起成功','el-icon-circle-check','successERP');
          },function(res){
            _this.dialogVisible = true;
            _this.dialogSetting.dialogType = "submit";
            _this.dialogSetting.dialogName = 'sureDialog';
            _this.dialogSetting.message = "信息提报有误";
            _this.errorTips.message = res.error.message;
            _this.errorTips.details = '';
            _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
          });
        }else if(data=="修改仓库"){
          let _this=this;
          _this.dialogFormVisible5=true;
        }else if(data=="修改物流公司"){
          let _this=this;
          _this.dialogFormVisible6=true;
        }else if(data=="拆分订单"){
          let _this=this;
          // if(_this.hangUpArr.length==0){
          //   _this.$message({
          //     type: 'warning',
          //     message: "请先勾选销售订单！"
          //   });
          // }else if(_this.hangUpArr.length>1){
          //   _this.$message({
          //     type: 'warning',
          //     message: "一次只能拆分一个销售订单！"
          //   });
          // }else {}
            _this.dialogFormVisible8=true;
            // for(let i in _this.multipleSelection1){
            //   _this.splitId=_this.multipleSelection1[i].id
            // }
            _this.$axios.gets(_this.url+"/api/services/app/OmsSoManagement/GetWebsoMtrDataById",
              {
                id: _this.detailId
              }).then(function(res){
              _this.saleOrderDetail2 = res.result.websoDtlDtoList ;
              console.log(_this.saleOrderDetail2);
            });

        }
      },
      goDetail(){
        let _this=this;
        _this.$store.state.url = "/salesOrder/salesOrderDetails/default";
        _this.$router.push({ path: _this.$store.state.url }); //点击切换路由
      },
      selectGet(vId){//这个vId也就是仓库id值
        this.chooseModifyStockId=vId;
      },
      selectGet3(vId){//这个vId也就是仓库id值
        this.chooseModifyStockId1=vId;
      },
      selectGet1(vId){//这个vId也就是物流id值
        this.chooseModifyLogisticsid=vId;
      },
      selectGet4(vId){//这个vId也就是物流id值
        this.chooseModifyLogisticsid1=vId;
      },
      splitOrder(){//拆分订单确定按钮
        let _this=this;
        this.dialogFormVisible7=false;
        console.log(_this.saleOrderDetail1);
        _this.$axios.posts(_this.url + '/api/services/app/OmsSoManagement/WebsoMtrSplit',
          {
            soId:_this.splitId,
            dtlList:_this.saleOrderDetail1
          }
        ).then(function (res) {//
          _this.open('拆分订单成功', 'el-icon-circle-check', 'successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
        },function(res){
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = 'sureDialog';
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = res.error.message;
          _this.errorTips.details = '';
          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      splitOrder1(){//详情拆分订单确定按钮
        let _this=this;
        this.dialogFormVisible8=false;
        console.log(_this.saleOrderDetail2);
        _this.$axios.posts(_this.url + '/api/services/app/OmsSoManagement/WebsoMtrSplit',
          {
            soId:_this.detailId,
            dtlList:_this.saleOrderDetail2
          }
        ).then(function (res) {//
          _this.open('拆分订单成功', 'el-icon-circle-check', 'successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
        },function(res){
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = 'sureDialog';
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = res.error.message;
          _this.errorTips.details = '';
          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      modifyLogisticsidSure(){//修改物流公司确定按钮
        let _this=this;
        this.dialogFormVisible4=false;
        _this.$axios.puts(_this.url+'/api/services/app/OmsSoManagement/UpdateStockId',
          {
            logisticsId:_this.chooseModifyLogisticsid,
            soIdArr:_this.hangUpArr,
          }
        ).then(function(res){//
          _this.open('修改物流公司成功','el-icon-circle-check','successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
        },function(res){
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = 'sureDialog';
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = res.error.message;
          _this.errorTips.details = '';
          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      modifyLogisticsidSure1(){//详情修改物流公司确定按钮
        let _this=this;
        this.dialogFormVisible6=false;
        _this.$axios.puts(_this.url+'/api/services/app/OmsSoManagement/UpdateStockId',
          {
            logisticsId:_this.chooseModifyLogisticsid1,
            soIdArr:_this.detailId1,
          }
        ).then(function(res){//
          _this.open('修改物流公司成功','el-icon-circle-check','successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
        }).catch(function(err){
          _this.$message({
            type: 'warning',
            message: err.error.message
          });
        });
      },
      modifySure(){//修改仓库确定按钮
        let _this=this;
        this.dialogFormVisible3=false;
        console.log(_this.hangUpArr);
        _this.$axios.puts(_this.url+'/api/services/app/OmsSoManagement/UpdateStockId',
          {
            stockId:_this.chooseModifyStockId,
            soIdArr:_this.hangUpArr,
          }
        ).then(function(res){//
          _this.open('修改仓库成功','el-icon-circle-check','successERP');
        },function(res){
          _this.dialogVisible = true;
          _this.dialogSetting.dialogType = "submit";
          _this.dialogSetting.dialogName = 'sureDialog';
          _this.dialogSetting.message = "信息提报有误";
          _this.errorTips.message = res.error.message;
          _this.errorTips.details = '';
          _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
        });
      },
      modifySure1(){//修改详情仓库确定按钮
        let _this=this;
        this.dialogFormVisible5=false;
        _this.$axios.puts(_this.url+'/api/services/app/OmsSoManagement/UpdateStockId',
          {
            stockId:_this.chooseModifyStockId1,
            soIdArr:_this.detailId1,
          }
        ).then(function(res){//
          _this.open('修改仓库成功','el-icon-circle-check','successERP');
          // _this.loadSelectData();
          // _this.loadTableData();
        }).catch(function(err){
          _this.$message({
            type: 'warning',
            message: err.error.message
          });
        });
      },
      query(){//条件查询
        let _this=this;
        _this.$axios.gets('/api/services/app/ModuleManagement/GetListByCondition',_this.queryParams).then(function(res){//查询表格数据
          // _this.queryParams.CategoryId="";
          _this.$store.commit('setQueryParams',_this.queryParams);
          _this.$store.commit('Init_Table',res.result.items);
          let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.menuListEachPage);
          _this.$store.commit('Init_pagination',totalPage);
          _this.$store.commit('Init_TotalCount',res.result.totalCount);
          _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        })
      },
      // InitStatus(){
      //   let _this=this;
      //   _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status002'}).then(function(res){
      //     _this.column[5].dataSource=res.result;
      //   })
      // },
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



      // 表格数据格式化------------------------------------

      SimpleSearch(){//简单搜索
        let _this=this;
        console.log(typeof(_this.creatRange));
        console.log(typeof(_this.effectiveRange));
        console.log(typeof(_this.dateRange));
        if(!_this.creatRange){
          if(!_this.effectiveRange){
            if(!_this.dateRange){
              _this.queryParams.StartSoDate='';//创建日期
              _this.queryParams.EndSoDate='';
              _this.queryParams.StartEffectiveTime='';//生效日期
              _this.queryParams.EndEffectiveTime='';
              _this.queryParams.PayTimeStart='';//支付日期
              _this.queryParams.PayTimeStart='';
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }else{
              _this.queryParams.StartSoDate='';//创建日期
              _this.queryParams.EndSoDate='';
              _this.queryParams.StartEffectiveTime='';//生效日期
              _this.queryParams.EndEffectiveTime='';
              _this.queryParams.PayTimeStart=_this.dateRange[0];//支付日期
              _this.queryParams.PayTimeStart=_this.dateRange[1];
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }
          }else{
            if(!_this.dateRange){
              _this.queryParams.StartSoDate='';//创建日期
              _this.queryParams.EndSoDate='';
              _this.queryParams.StartEffectiveTime=_this.effectiveRange[0];//生效日期
              _this.queryParams.EndEffectiveTime=_this.effectiveRange[1];
              _this.queryParams.PayTimeStart='';//支付日期
              _this.queryParams.PayTimeStart='';
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }else{
              _this.queryParams.StartSoDate='';//创建日期
              _this.queryParams.EndSoDate='';
              _this.queryParams.StartEffectiveTime=_this.effectiveRange[0];//生效日期
              _this.queryParams.EndEffectiveTime=_this.effectiveRange[1];
              _this.queryParams.PayTimeStart=_this.dateRange[0];//支付日期
              _this.queryParams.PayTimeStart=_this.dateRange[1];
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }

          }
        }else{
          if(!_this.effectiveRange){
            if(!_this.dateRange){
              _this.queryParams.StartSoDate=_this.creatRange[0];//创建日期
              _this.queryParams.EndSoDate=_this.creatRange[1];
              _this.queryParams.StartEffectiveTime='';//生效日期
              _this.queryParams.EndEffectiveTime='';
              _this.queryParams.PayTimeStart='';//支付日期
              _this.queryParams.PayTimeStart='';
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }else{
              _this.queryParams.StartSoDate=_this.creatRange[0];//创建日期
              _this.queryParams.EndSoDate=_this.creatRange[1];
              _this.queryParams.StartEffectiveTime='';//生效日期
              _this.queryParams.EndEffectiveTime='';
              _this.queryParams.PayTimeStart=_this.dateRange[0];//支付日期
              _this.queryParams.PayTimeStart=_this.dateRange[1];
              console.log(_this.queryParams);
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }
          }else{
            if(!_this.dateRange){
              _this.queryParams.StartSoDate=_this.creatRange[0];//创建日期
              _this.queryParams.EndSoDate=_this.creatRange[1];
              _this.queryParams.StartEffectiveTime=_this.effectiveRange[0];//生效日期
              _this.queryParams.EndEffectiveTime=_this.effectiveRange[1];
              _this.queryParams.PayTimeStart='';//支付日期
              _this.queryParams.PayTimeStart='';
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }else{
              _this.queryParams.StartSoDate=_this.creatRange[0];//创建日期
              _this.queryParams.EndSoDate=_this.creatRange[1];
              _this.queryParams.StartEffectiveTime=_this.effectiveRange[0];//生效日期
              _this.queryParams.EndEffectiveTime=_this.effectiveRange[1];
              _this.queryParams.PayTimeStart=_this.dateRange[0];//支付日期
              _this.queryParams.PayTimeStart=_this.dateRange[1];
              console.log(_this.queryParams);
              _this.$axios.gets(_this.url+'/api/services/app/OmsSoManagement/GetWebsoMtrData',
                _this.queryParams).then(function(res){
                _this.tablelist = res.result.items;
              },function(res){
                console.log('err'+res)
              });
            }
          }
        }
      },
      // 树通用----------------------
      defauleExpandTree(data,key){
        if(typeof(data[0])!='undefined'
          && data[0]!=null
          && typeof(data[0][key])!='undefined'
          && data[0][key]!=null
          && data[0][key]!=''){
          return [data[0][key]]
        }
      },
      //---树筛选----------------------------------------
      ouFilterNode(value, data) {
        console.log(data);
        if (!value) return true;
        return data.ouName.indexOf(value) !== -1;
      },
      opFilterNode(value, data) {
        console.log(data);
        if (!value) return true;
        return data.areaName.indexOf(value) !== -1;
      },
      //---业务组织树点击----------------------------------------
      ouNodeClick:function(data,node,self){
        let _this = this;
        console.log(data);
        console.log(data.groupId);
        _this.queryParams.groupId=data.groupId;
        // 点击所属组织，业务地区跟着变动
        _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:data.id}).then(function(res){
          console.log(res);
        },function(res){
          console.log('err'+res)
        });
        // 点击所属组织，对应仓库跟着变动
        _this.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:data.id,Start:0,Length:100}).then(function(res){

        },function(res){
          console.log('err'+res)
        });
        $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
          if($(this).attr('date')==data.id){
            $(this).click()
          }
        })
      },

      opNodeClick:function(data){
        console.log(data);
        let self = this;
        console.log(data);
        self.$nextTick(function(){
          $('#op_confirmSelect').click()
        })
      },
      //---树render-content换掉小图标------------------------------
      renderContentOu(h, { node, data, store }){//所属组织
        if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
          return (
            <span class="el-tree-node__label" data-id={data.id}>
        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
          {data.ouName}
        </span>
        );
        }else{
          return (
            <span class="el-tree-node__label" data-id={data.id}>
        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
          {data.ouName}
        </span>
        );
        }
      },
      renderContentOu1(h, { node, data, store }){//所属组织
        if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
          return (
            <span class="el-tree-node__label" data-id={data.id}>
        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
          {data.label}
        </span>
        );
        }else{
          return (
            <span class="el-tree-node__label" data-id={data.id}>
        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
          {data.label}
        </span>
        );
        }
      },
      // -----------------------------------
      loadTree(){
        let _this=this;
        _this.treeLoading=true;
        _this.$axios.gets('/api/services/app/ModuleManagement/GetModulesTree',{id:0})
          .then(function(res){
            // _this.componyTree=res;
            _this.componyTree=_this.data;
            console.log(_this.componyTree);
            _this.treeLoading=false;
            _this.expandId=_this.defauleExpandTree(res,'id')
          },function(res){
            _this.treeLoading=false;
          })
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
      handleSelectionChange(val) {//点击复选框选中的数据
        this.multipleSelection = val;
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
      TreeNodeClick(data){//树节点点击回调
        let _this=this;
        _this.detailParentId=data.id;//
        _this.detailParentName=data.moduleName;
        _this.queryParams.ModuleParentId=_this.detailParentId;
        _this.$axios.gets('/api/services/app/ModuleManagement/GetListByCondition',_this.queryParams).then(function(res){
          _this.$store.commit('setQueryParams',_this.queryParams);
          _this.$store.commit('Init_Table',res.result.items);
          let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.menuListEachPage);
          _this.$store.commit('Init_pagination',totalPage);
          _this.$store.commit('Init_TotalCount',res.result.totalCount);
          _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
        })
      },
      modify(row){
        this.$store.state.url='/menu/menuModify/'+row.id;
        this.$router.push({path:this.$store.state.url})
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.moduleName.indexOf(value) !== -1;
      },
      clearTreeData(){
        let _this=this;
        _this.dialogData={}
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 100 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // submitSearch(){
      //   let self=this;
      //   self.queryParams.SearchKey=self.SearchKey;
      //   self.$axios.gets("/api/services/app/ModuleManagement/GetListByCondition", {SearchKey:self.SearchKey,ContactOwner:self.ContactOwner,SkipCount: (self.page - 1) * self.oneItem,MaxResultCount: self.oneItem}).then(res => {
      //     self.$store.commit('setQueryParams',self.queryParams);
      //     self.$store.commit('Init_Table',res.result.items);
      //     let totalPage=Math.ceil(res.result.totalCount/self.$store.state.menuListEachPage);
      //     self.$store.commit('Init_pagination',totalPage);
      //     self.$store.commit('Init_TotalCount',res.result.totalCount);
      //     self.$store.commit('setCurrentPage',1)//设置当前页码为初始值1
      //   });
      //
      // },
      // renderContent_componyTree(h, { node, data, store }){
      //   if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
      //     return (
      //       <span class="el-tree-node__label" data-id={data.id}>
      //   <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
      //     {data.moduleName}
      //   </span>
      //   );
      //   }else{
      //     return (
      //       <span class="el-tree-node__label" data-id={data.id}>
      //   <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
      //     {data.moduleName}
      //   </span>
      //   );
      //   }
      // },
      dialogClick(parmas){//对话框按钮点击事件   就是这个按钮是确定时走的
        let _this=this;
        if(parmas.dialogButton=="确定"){
          if(parmas.dialogName=="delDialog"){
              _this.dialogVisible=false;
              _this.$axios.deletes(_this.url+'/api/services/app/OmsSoManagement/DeleteOmsWebsoMtr',{id:_this.singleDeleteId}).then(function(res){//查询表格数据
                _this.open('删除成功','el-icon-circle-check','successERP');
              },function(res){
                _this.dialogVisible = true;
                _this.dialogSetting.dialogType = "submit";
                _this.dialogSetting.dialogName = 'sureDialog';
                _this.dialogSetting.message = "信息提报有误";
                _this.errorTips.message = res.error.message;
                _this.errorTips.details = '';
                _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
                _this.dialogUserConfirm=false;
                _this.errorMessage=true;
              })
          }else if(parmas.dialogName=="cancelDialog"){
            _this.dialogVisible=false;
          }else if(parmas.dialogName=="sureDialog"){
            _this.dialogVisible=false;
          }else if(parmas.dialogName=='batchdelDialog'){//批量删除
            _this.$axios.posts(_this.url+"/api/services/app/OmsSoManagement/BatchDeleteOmsSo", {id:_this.this.hangUpArr}
            ).then(function(res) {
              _this.open('删除成功！','el-icon-circle-check','successERP');
            },function(res){
              _this.dialogVisible = true;
              _this.dialogSetting.dialogType = "submit";
              _this.dialogSetting.dialogName = 'cancelDialog';
              _this.dialogSetting.message = "信息提报有误";
              _this.errorTips.message = res.error.message;
              _this.errorTips.details = '';
              _this.dialogCommand = [{text: '确定', class: 'btn-confirm'}];
            });
          }
        }else if(parmas.dialogButton=="取消"){
          _this.dialogVisible=false;
        }
      },
      // 关闭对话框
      dialogColse(){
        this.dialogVisible=false;
      },
    },
    components:{
      buttonGroup,
      Table,
      dialogBox,
      Tree
    }
  }
</script>

<style scoped>
  .dialogBtn{
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    /*background-color: #fff;*/
    color: #c9c9c9;
    border: none;
    border-top: 1px solid #c9c9c9;
    outline: none;
    cursor: pointer;
  }
  .dialogBtn:focus{
    outline: none;
  }
  .dialog-footer .dialogBtn:first-child{
    border-right: 1px solid #c9c9c9;
  }
  .dialog-footer{
    padding:0;
    height: 50px;
  }
  .dialogBtn:hover{
    color: #6699FF;
  }
  .formSearch{
    float: right;
  }
  .bg-white{
    background: white;
    border-radius: 3px;
  }
  .h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
  }
  .pl15{
    padding-left: 15px;
  }
  .pr15{
    padding-right: 15px;
  }
  .pt5{
    padding-top: 5px;
  }
  .el-input{
    border-bottom:1px solid #E4E4E4
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width:100%;
  }
</style>
<style>
  .max-height{
    max-height:450px;
  }
  .tree-container{
    height: 440px;
  }
  .tree-container>div{
    height: 47px!important;
  }
  .menulist-tree .el-input .el-input__inner{
    height: 35px!important;
    border-radius: 30px;
    width: calc(100% - 30px);
    margin: 6px 15px 8px;
  }
  .menu-list .el-button+.el-button{
    margin-left: 0;
  }
  .menu-list .el-dialog__footer{
    padding:0;
  }
  .menu-list .areaDialog .bgcolor:first-child{
    margin-top:15px;
  }
  .menu-list .border-left{
    width: calc(100% - 260px);
    border-left:1px solid #E4E4E4;
  }
  .menulist-tree .search_input{
    border-bottom: 1px solid #E4E4E4! important;
  }

  .menulist-tree .el-input__prefix{
    left: 20px;
  }

  /*新增*/
  .el-input__inner{
    border:1px solid rgb(194, 202, 216);
  }
  .commodity .bgcolor {
    height: 35px;
    font-size: 12px;
    /*margin-bottom: 10px;*/
    width: 100%;
    float: left;
    overflow: hidden;
    margin-right: 5px;
  }
  .commodity .bgcolor>label {
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
  .commodity .bgcolor .el-select {
    width: calc(100% - 94px);
  }
  #rangMoney,#rangMoney1{
    width:calc(100% - 94px);
    height:35px;
    padding:0
  }
  #rangMoney .el-range-separator,#rangMoney1 .el-range-separator{
    padding:0;
    width:20px;
    background-color: rgb(194, 202, 216);
    height: 100%;
    display: inline-block;
    margin: 0;
    line-height: 35px;
    font-size: 12px;
  }
  #rangMoney .moneyMin,#rangMoney .moneyMax,#rangMoney1 .moneyMin,#rangMoney1 .moneyMax{
    width: calc(50% - 8px);
    top: -1px;
    height: 31px;
    position: relative;
    margin: 0;
    padding: 0;
    font-size: 12px;
    border-radius: 5px;
  }
  .pt10{
    padding-top:0;
  }
  .navBar{
    width:100%;
    height:40px;
    line-height:40px;
    font-size:14px;
    font-weight:normal;
  }
  .navBar li{
    float:left;
    margin-left:20px;
    cursor:pointer;
  }
  .searchBtn{
    text-align:center;
    margin-bottom:10px;
  }
  .active{
    color:#3cc;
  }
  .bottomButton{
    position: fixed;
    bottom:10px;
  }


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-pagination{
    text-align:right;
    margin-top:45px;
    padding-bottom:10px;
  }
  .dialog-footer{
    text-align: center;
  }
  .el-button {
    margin-right:0;
  }
  div.rangeDate{
    /*width:156px;*/
  }
  .el-table__expanded-cell[class*=cell]{
    padding:0;
  }
  .el-dialog{
    width:33%;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev, .el-pagination .el-pager li {
    border-radius: 50%!important;
    background-color: #f4f4f5;
    min-width:30px;
    margin:0 5px;
  }
  .el-pagination button.btn-next, .el-pagination button.btn-prev{
    background-color: #f4f4f5;
    border-radius: 50%!important;
    padding:0;
  }
  .el-pagination.is-background {
    color: #c0c4cc;
  }
  .el-pager li.active {
    color: #fff;
    background:#409EFF;
    cursor: default;
  }
  .el-tree-node:focus>.el-tree-node__content{
    background:#39ca7757;
  }
  .el-date-editor{
    /*width:156px!important;*/
  }
  .commodity .left-box {
    min-width: 260px;
    width: 260px;
    float: left;
  }
  .menu-list .border-left {
    width: calc(100% - 260px);
    border-left: 1px solid #E4E4E4;
  }
.footerButton button{
  padding:9px 20px;
}
.footerButton .cancelSplit,.cancelModifyButton,.cancelModifyButton1,.cancelButtonLogistic1,.cancelButtonLogistic{
    margin-left:20px!important;
  }
  /*.el-table__expand-icon i{*/
    /*display: none;*/
  /*}*/
  /*.el-table__expand-icon{*/
    /*background-image: url(../../../../static/image/common/bt_add.png);*/
  /*}*/
  .modifyStock .el-select-dropdown__list{
    max-height:76px;
    overflow: auto;
  }
</style>
