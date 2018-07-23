<template>
  <div class="customerBasicForm">
    <el-row>
      <el-col :span="24"  class="fixed bg-white bb1">
        <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
        <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="ifShow">
        <el-row>
          <el-col :span="24" class="getPadding">
            <div class="tipsWrapper">
              <div class="errorTips">
                <p class="msgDetail">
                                <span :class="{block : !validation.hasError('createContactParams.ouId')}">
                                     所属组织{{ validation.firstError('createContactParams.ouId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactCode')}">
                                     编码{{ validation.firstError('createContactParams.contactCode') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactName')}">
                                     名称{{ validation.firstError('createContactParams.contactName') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactFullName')}">
                                     全称{{ validation.firstError('createContactParams.contactFullName') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.mnemonic')}">
                                     助记码{{ validation.firstError('createContactParams.mnemonic') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactClassId')}">
                                     客户分类{{ validation.firstError('createContactParams.contactClassId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactWorkPropertyId')}">
                                     客户性质{{ validation.firstError('createContactParams.contactWorkPropertyId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactGradeId')}">
                                     客户等级{{ validation.firstError('createContactParams.contactGradeId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.contactTypeId')}">
                                     客户类型{{ validation.firstError('createContactParams.contactTypeId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.ficaOuId')}">
                                     对应财务组织{{ validation.firstError('createContactParams.ficaOuId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.taxCode')}">
                                     纳税登记号{{ validation.firstError('createContactParams.taxCode') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.opAreaId')}">
                                     业务地区{{ validation.firstError('createContactParams.opAreaId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.adAreaId')}">
                                     行政地区{{ validation.firstError('createContactParams.adAreaId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.legalPerson')}">
                                     法人代表{{ validation.firstError('createContactParams.legalPerson') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.regAddress')}">
                                     注册地址{{ validation.firstError('createContactParams.regAddress') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.manager')}">
                                     负责人{{ validation.firstError('createContactParams.manager') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.phone')}">
                                     电话{{ validation.firstError('createContactParams.phone') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.remark')}">
                                     备注{{ validation.firstError('createContactParams.remark') }},
                                </span>

                                <span :class="{block : !validation.hasError('createContactParams.status')}">
                                     状态{{ validation.firstError('createContactParams.status') }},
                                </span>
                            </p>
                        </div>
                    </div>                  
                    <div class="bgcolor">
                        <label><small>*</small>所属组织</label>
                        <el-select v-model="createContactParams.ouId" 
                                    placeholder=""
                                    class="ouId"
                                    @focus="showErrprTipsSelect"
                                    @change='Modify()'
                                    :class="{redBorder : validation.hasError('createContactParams.ouId')}">

                            <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="ouSearch"></el-input> 
                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                    :data="ouAr"
                                    :props="selectOuProps"
                                    node-key="id"
                                    ref="outree"
                                    highlight-current
                                    :default-expanded-keys="ouExpandId"
                                    :render-content="renderContentOu"
                                    :filter-node-method="filterNode"
                                    :expand-on-click-node="false"
                                    @node-click="ouNodeClick"></el-tree> 
                            <el-option v-show="false"
                                    :key="countOu.id" 
                                    :label="countOu.ouFullname" 
                                    :value="countOu.id"
                                    id="ou_confirmSelect"></el-option>
                        </el-select>
                    </div>


                    <div class="bgcolor">
                        <label><small>*</small>编码</label>
                        <el-input v-model="createContactParams.contactCode" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.contactCode')}"
                                class="contactCode"></el-input>
                    </div>


                    <div class="bgcolor">
                        <label><small>*</small>名称</label>
                        <el-input v-model="createContactParams.contactName" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='editName'
                                :class="{redBorder : validation.hasError('createContactParams.contactName')}"
                                class="contactName"></el-input>
                    </div>


                    <div class="bgcolor">
                        <label><small>*</small>全称</label>
                        <el-input v-model="createContactParams.contactFullName" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='editFullName'
                                :class="{redBorder : validation.hasError('createContactParams.contactFullName')}"
                                class="contactFullName"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>助记码</label>
                        <el-input v-model="createContactParams.mnemonic" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.mnemonic')}"
                                class="mnemonic"></el-input>
                    </div>
                        
                    <div class="bgcolor">
                        <label><small>*</small>客户分类</label>
                        <el-select v-model="createContactParams.contactClassId" 
                                placeholder=""
                                class="contactClassId"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.contactClassId')}"
                                @focus="showErrprTipsSelect">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="cuSearch"></el-input>

                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                     :data="cuAr"
                                     :props="selectCuProps"
                                     node-key="id"
                                     ref="cutree"
                                     :render-content="renderContentCu"
                                     :default-expanded-keys="cuExpandId"
                                     :filter-node-method="filterNode"
                                     :expand-on-click-node="false"
                                     highlight-current
                                     @node-click="cuNodeClick"></el-tree>

                            <el-option v-show="false"
                                       :key="countCu.id" 
                                       :label="countCu.cuFullname" 
                                       :value="countCu.id"
                                       id="cu_confirmSelect"></el-option>
                        </el-select>
                    </div>
                                
                    <div class="bgcolor">
                        <label><small>*</small>客户性质</label>
                        <el-select v-model="createContactParams.contactWorkPropertyId" 
                                    placeholder=""
                                    @change='Modify()'
                                    class="contactWorkPropertyId"
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('createContactParams.contactWorkPropertyId')}">
                                <!--  -->
                            <el-option v-for="item in typeAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor">
                        <label>客户等级</label>
                        <el-select v-model="createContactParams.contactGradeId" 
                                placeholder=""
                                @change='Modify()'
                                class="contactGradeId"
                                @focus="showErrprTipsSelect"
                                :class="{redBorder : validation.hasError('createContactParams.contactGradeId')}">
                            <el-option v-for="itema in gradeAr" 
                                        :key="itema.itemValue" 
                                        :label="itema.itemName" 
                                        :value="itema.itemValue"></el-option>
                        </el-select>
                    </div>
                    <div class="bgcolor">
                        <label><small>*</small>客户类型</label>
                        <el-select v-model='createContactParams.contactTypeId'
                                placeholder=""
                                @change='Modify()'
                                class="contactTypeId"
                                @focus="showErrprTipsSelect"
                                :class="{redBorder : validation.hasError('createContactParams.contactTypeId')}">
                            <el-option v-for="itemb in propertyAr" 
                                        :key="itemb.itemValue" 
                                        :label="itemb.itemName" 
                                        :value="itemb.itemValue"></el-option>
                        </el-select>
                    </div>   
                    <div class="bgcolor">
                        <label><small v-show='createContactParams.contactTypeId != 0'>*</small>对应财务组织</label>
                        <el-select v-model="createContactParams.ficaOuId" 
                                placeholder=""
                                :disabled="createContactParams.contactTypeId === 0"
                                @change='Modify()'
                                @focus="showErrprTipsSelect"
                                class="ficaOuId"
                                :class="{redBorder : validation.hasError('createContactParams.ficaOuId')}">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="fiSearch"></el-input>
                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                     :data="fiAr"
                                     :props="selectFiProps"
                                     node-key="id"
                                     default-expand-all
                                     ref="tree"
                                     :filter-node-method="filterNode"
                                     :expand-on-click-node="false"
                                     @node-click="fiNodeClick"></el-tree>
                            <el-option v-show="false"
                                    :key="countFi.id" 
                                    :label="countFi.fiFullname" 
                                    :value="countFi.id"
                                    id="fi_confirmSelect"></el-option>
                        </el-select>
                    </div>
                    <div class="bgcolor">
                        <label>纳税登记号</label>
                        <el-input v-model="createContactParams.taxCode" 
                                placeholder=""
                                @change='Modify()'
                                class="taxCode"
                                @focus="showErrprTips"
                                :class="{redBorder : validation.hasError('createContactParams.taxCode')}"></el-input>
                    </div>
                    <div class="bgcolor">
                        <label>业务地区</label>
                        <el-select v-model="createContactParams.opAreaId"
                                class="opAreaId"
                                @focus="showErrprTipsSelect"
                                placeholder="">
                            <el-input placeholder="搜索..."
                                    class="selectSearch"
                                    v-model="opSearch"></el-input>
                            <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                        :data="opAr"
                                        :props="selectOpProps"
                                        node-key="id"
                                        ref="optree"
                                        :render-content="renderContentOp"
                                        :default-expanded-keys="expandOpId"
                                        highlight-current
                                        :filter-node-method="opFilterNode"
                                        :expand-on-click-node="false"
                                        @node-click="opNodeClick"></el-tree>
                            <el-option v-show="false"
                                        :key="countOp.id" 
                                        :label="countOp.areaName" 
                                        :value="countOp.id"
                                        id="op_confirmSelect"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor area">
                        <label>行政地区</label>
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

                    <div class="bgcolor">
                        <label>法人代表</label>
                        <el-input v-model="createContactParams.legalPerson" 
                                placeholder=""
                                @focus="showErrprTips"
                                @change='Modify()'
                                class="legalPerson"
                                :class="{redBorder : validation.hasError('createContactParams.legalPerson')}"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>注册地址</label>
                        <el-input v-model="createContactParams.regAddress" 
                                placeholder=""
                                class="regAddress"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.regAddress')}"
                                @focus="showErrprTips"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>负责人</label>
                        <el-input v-model="createContactParams.manager" 
                                placeholder=""
                                class="manager"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.manager')}"
                                @focus="showErrprTips"></el-input>
                    </div>
                    
                    <div class="bgcolor">
                        <label>电话</label>
                        <el-input v-model="createContactParams.phone" 
                                placeholder=""
                                @change='Modify()'
                                class="phone"
                                :class="{redBorder : validation.hasError('createContactParams.phone')}"
                                @focus="showErrprTips"></el-input>
                    </div>
                    
                    <div class="bgcolor">
                        <label>备注</label>
                        <el-input v-model="createContactParams.remark" 
                                placeholder=""
                                class="remark"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createContactParams.remark')}"
                                @focus="showErrprTips"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label><small>*</small>状态</label>
                        <el-select v-model="createContactParams.status"
                                   class="status"
                                   @change='Modify()'
                                   placeholder=""
                                   @focus="showErrprTipsSelect"
                                   :class="{redBorder : validation.hasError('createContactParams.status')}">
                            <el-option v-for="itemc in statusAr"  
                                       :key="itemc.itemValue" 
                                       :label="itemc.itemName" 
                                       :value="itemc.itemValue"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-collapse-transition>     
<el-row>
    <el-col :span="2" :offset="1"><el-checkbox v-model="supplier">同为供应商</el-checkbox></el-col>
    <el-col :span="2"><el-checkbox v-model="createContactParams.creditMgt">信用管理</el-checkbox></el-col>   
</el-row>

    <!-- 公司业务财务bootTab标签页 -->
    <el-row class="nopadding mt10">
      <div class="tabZoo">
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="银行信息" name="bank" class="getPadding" style="z-index:-10">
              <button class="erp_bt bt_add" @click="addColbank">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_add.png">
                </div>
                <span class="btDetail">新增</span>
              </button>

              <button class="erp_bt bt_del" @click='delMoreBank(4)'>
                <div class="btImg">
                  <img src="../../../static/image/common/bt_del.png">
                </div>
                <span class="btDetail">删除</span>
              </button>

              <button class="erp_bt bt_excel mb10">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_excel.png">
                </div>
                <span class="btDetail">Excel</span>
              </button>

              <button class="erp_bt bt_auxiliary">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_auxiliary.png">
                </div>
                <span class="btDetail">辅助功能</span>
              </button>


              <el-table :data="bankData" stripe border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="settlementCurrencyId" label="结算币种" width="180">
                  <template slot-scope="scope">
                    <img class="abimg" src="../../../static/image/content/redremind.png"/>
                    <el-select  v-model="scope.row.settlementCurrencyId" :class="[scope.$index%2==0?'bgw':'bgg']">
                      <el-option  v-for="item in curencyAr" :key="item.id" :label="item.currencyName" :value="item.id" >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column prop="accountNo" label="银行账号" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.accountNo"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="accountName" label="银行账户" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.accountName"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="openingBank" label="开户银行" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.openingBank"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="contactPerson" label="联系人" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.contactPerson"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="phone" label="联系电话" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.phone"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="isDefault" label="默认">
                  <template slot-scope="scope">
                    <!-- <el-checkbox v-model="bankData[scope.$index].ifDefault"></el-checkbox> -->
                    <el-radio  :label="true"
                               v-model="scope.row.isDefault"
                               @change.native="getCurrentRow(scope.$index,scope.row)"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column label='操作'>
                  <template slot-scope="scope" >
                    <el-button v-on:click="handleBankDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="送货地址" name="address" class="getPadding" style="z-index:-1000">
              <button class="erp_bt bt_add mb10" @click="addColAddress">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_add.png">
                </div>
                <span class="btDetail">增行</span>
              </button>

              <button class="erp_bt bt_del" @click="delMoreAdd(5)">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_del.png">
                </div>
                <span class="btDetail">删除</span>
              </button>

              <button class="erp_bt bt_excel mb10">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_excel.png">
                </div>
                <span class="btDetail">Excel</span>
              </button>

              <button class="erp_bt bt_auxiliary">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_auxiliary.png">
                </div>
                <span class="btDetail">辅助功能</span>
              </button>


              <el-table :data="addressData" stripe border style="width: 100%" @selection-change="handleSelectionChange2" class="all-table">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="completeAddress" label="供货地址" width="180">
                  <template slot-scope="scope">
                    <img class="abimg" src="../../../static/image/content/redremind.png"/>
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.completeAddress"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="adAreaLevel1" label="省" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.adAreaLevel1" class="areaDrop" placeholder="选择省" @change='chooseProvince(scope.row)'>
                      <el-option v-for="item in areaProArray1" :key="item.id" :label="item.areaName" :value="item.id">
                      </el-option>
                      <el-option v-show="false" label="无" :value="provinceValue">
                      </el-option>
                    </el-select>
                  </template>

                </el-table-column>

                <el-table-column prop="adAreaLevel2" label="市" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.adAreaLevel2" class="areaDrop" placeholder="选择市" @change='chooseCity(scope.row)'>
                      <el-option v-for="item in areaCityArray2" :key="item.id" :label="item.areaName" :value="item.id">
                      </el-option>
                      <el-option v-show="false" label="无" :value="cityValue">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column prop="adAreaLevel3" label="区" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.adAreaLevel3" class="areaDrop" placeholder="选择区" @change='chooseDis(scope.row)'>
                      <el-option v-for="item in areaDisArray3" :key="item.id" :label="item.areaName" :value="item.id">
                      </el-option>
                      <el-option v-show="false" label="无" :value="areaValue">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>


                <el-table-column prop="contactPerson" label="联系人" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.contactPerson"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="phone" label="联系电话" width="180">
                  <template slot-scope="scope">
                    <input class="input-need"
                           :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                           v-model="scope.row.phone"
                           type="text"/>
                  </template>
                </el-table-column>

                <el-table-column prop="isDefault" label="默认">
                  <template slot-scope="scope">
                    <el-checkbox v-model="addressData[scope.$index].ifDefault"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label='操作'>
                  <template slot-scope="scope" >
                    <el-button v-on:click="handleAddDelete(scope.$index,scope.row,2)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="使用组织" name="organization" class="getPadding" style="z-index:-1000">
              <!-- <button class="erp_bt bt_add mb10" @click="addColOu">
                  <div class="btImg">
                      <img src="../../../static/image/common/bt_add.png">
                  </div>
                  <span class="btDetail">增行</span>
              </button> -->

              <button class="erp_bt bt_add" @click="dialogOuIsShow">
                <div class="btImg">
                  <img src="../../../static/image/common/bt_add.png">
                </div>
                <span class="btDetail">选取</span>
              </button>

              <!-- <button class="erp_bt bt_del" @click='delMoreOu(6)'>
                  <div class="btImg">
                      <img src="../../../static/image/common/bt_del.png">
                  </div>
                  <span class="btDetail">删除</span>
              </button>

              <button class="erp_bt bt_excel mb10">
                  <div class="btImg">
                      <img src="../../../static/image/common/bt_excel.png">
                  </div>
                  <span class="btDetail">Excel</span>
              </button> -->

              <!-- <button class="erp_bt bt_auxiliary">
                  <div class="btImg">
                      <img src="../../../static/image/common/bt_auxiliary.png">
                  </div>
                  <span class="btDetail">辅助功能</span>
              </button> -->


              <el-table :data="showPageTableOu" stripe border style="width: 100%" @selection-change="handleSelectionChange3">

                <el-table-column type="selection"></el-table-column>

                <el-table-column prop="ouName" label="业务组织" width="540">
                  <!-- <template slot-scope="scope">
                      <img class="abimg" src="../../../static/image/content/redremind.png"/>
                      <el-select v-model="scope.row.ouId"
                              placeholder=""
                              @change='Modify()'>

                          <el-input placeholder="搜索..."
                                  class="selectSearch"
                                  v-model="ouSearch"></el-input>
                          <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"
                                  :data="ywAr"
                                  :props="selectYwProps"
                                  node-key="id"
                                  default-expand-all
                                  ref="tree"
                                  :filter-node-method="filterNode"
                                  :expand-on-click-node="false"
                                  @node-click="ywNodeClick"></el-tree>
                          <el-option v-show="false"
                                  :key="countYw.id"
                                  :label="countYw.ouName"
                                  :value="countYw.id"
                                  id="yw_confirmSelect"></el-option>
                      </el-select>
                  </template> -->
                </el-table-column>

                <el-table-column prop="transportMethodId" label="运输方式" width="540">
                  <template slot-scope="scope">
                    <el-select  v-model="scope.row.transportMethodId"
                                :class="[scope.$index%2==0?'bgw':'bgp']">
                      <el-option  v-for="item in tranAr" :key="item.itemValue" :label="item.itemName" :value="item.itemValue" >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>


                <el-table-column label='操作'>
                  <template slot-scope="scope" >
                    <el-button type="text" @click="delCheckOu(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="margin-top:20px;"
                             class="text-right"
                             background layout="total,prev, pager, next,jumper"
                             @current-change="ouHandleCurrentChange"
                             :current-page="ouPageIndex"
                             :page-size="ouOneItem"
                             :total="ouTotalItem"></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
    </el-row>

    <el-row class="mt10">
      <el-col :span="22" class="auditInformation getPadding">
        <h4 class="h4">审计信息</h4>
        <div>
          <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createName" placeholder="" disabled="disabled"></el-input></div>
          <div class="bgcolor"><label>创建时间</label><el-date-picker v-model="auditInformation.createTime" type="date" placeholder="" disabled="disabled"></el-date-picker></div>
          <div class="bgcolor"><label>修改人</label><el-input v-model="auditInformation.modifyName" placeholder="" disabled="disabled"></el-input></div>
          <div class="bgcolor"><label>修改时间</label><el-date-picker v-model="auditInformation.modifyTime" type="date" placeholder="" disabled="disabled"></el-date-picker></div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogOu"  class="transfer_dialog dialogOu" width="30%">
        <span slot="title">
            <span>分配组织</span>
            <a  href="javascript:;" class="add" @click="addNewOu">+</a>
            <div class="search_input_group">
                <div class="search_input_wapper">
                    <el-input
                      placeholder="搜索..."
                      v-model="filterTextOu"
                      class="search_input"
                    >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div>
        </span>
      <el-col :span="24" class="transfer_warapper">
        <el-col :span="24" class="checkBoxOuUser">
          <el-checkbox @change="CheckAllTree" v-model="checkAllOu" class="square_el"></el-checkbox><span>全选</span>
          <el-checkbox @change="showCheckTree" v-model="showCheck" class="square_el"></el-checkbox><span>查看已选</span>
        </el-col>
        <el-col :span="24" class="transfer_table">
          <vue-scroll :ops="$store.state.option">
            <el-tree
              :render-content="renderContent_ouTreeDataRight"
              :default-expanded-keys="expand.expandId_dialogOu"
              :data="ouTreeDataRight"
              show-checkbox
              :highlight-current="true"
              node-key="ouId"
              ref="tree"
              :filter-node-method="filterNode"
              @node-click="ouNodeClickRight"
              @check-change="isCheckAllOu"
              :expand-on-click-node="false"
              :props="ouDefaultPropsRight">
            </el-tree>
          </vue-scroll>
        </el-col>
        <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
        <!-- <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKey">通过 key 设置</el-button> -->
      </el-col>
        <span slot="footer">
            <button class="transfer_footer_btn transfer_confirm" @click="ouDialogSure">确 认</button>
            <button class="transfer_footer_btn" @click="dialogOu = false">取 消</button>
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
    <!-- dialog -->

    <!-- dialog是否删除提示 -->
    <!-- <el-dialog :visible.sync="dialogDelConfirm" class="dialog_confirm_message" width="25%">
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
            <button class="dialog_footer_bt dialog_font" @click="sureDel">确 认</button>
            <button class="dialog_footer_bt dialog_font" @click="dialogDelConfirm = false">取 消</button>
        </span>
    </el-dialog> -->
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
    <!-- dialog -->
    <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>

  </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
export default({
    name:'customerDetail',
    components:{
        buttonGroup,
        dialogBox
    },
    data() {
        return{
            defaultOuId:'',//默认ouid
            ifShow:true,
            ifModify:false,//判断信息是否修改过
            backCancle:'',//判断是返回还是取消
            auditInformation:{//审计信息
                createName:"",
                createTime:"",
                modifyName:"",
                modifyTime:"",
                startTime:"",
                finishTime:"",
                finishName:"",
            },
            //---所属组织树形下拉-----
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouFullname:'',
                },
                ouAr:[],//所属组织下拉框
                ouExpandId:[],//默认展开第一个树节点
            //-----------------------

            //---客户分类树形下拉-----
                cuSearch:'',
                selectCuProps:{
                    children: 'childNodes',
                    label: 'className',
                    id:'id'
                },
                cuItem:{
                    id:'',
                    cuName:'',
                },
                cuAr:[],//客户分类下拉框
                cuExpandId:[],
             //-----------------------

            //---财务组织树形下拉-----
                fiSearch:'',
                selectFiProps:{
                    children: 'children',
                    label: 'ouFullname',
                    id:'id'
                },
                fiItem:{
                    id:'',
                    fiFullname:'',
                },
                fiAr:[],//财务组织下拉框
            //-----------------------
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

            //---行政地区树形下拉-----
                areaProArray1:[],//行政地区(省)
                areaCityArray2:[],//行政地区(市)
                areaDisArray3:[],//行政地区(区)
                proId:'',//省id
                cityId:'',//市id
            //-----------------------
            //---业务地区树形下拉-----
                opSearch:'',//树形搜索框的
                selectOpProps:{
                    children: 'childItems',
                    label: 'name',
                    id:'id'
                },
                opItem:{
                    id:'',
                    name:'',
                },
                opAr:[],//业务地区下拉框
                expandOpId:[],
            //-----------------------
            //---业务组织-------------
            selectYwProps:{
                children: 'children',
                label: 'ouName',
                id:'id'
            },
            ywItem:{
                id:'',
                ouName:'',
            },
            ywAr:[],//业务组织
            //-----------------------
            //---普通下拉------------
            propertyAr:[],//客户性质下拉框
            gradeAr:[],//客户等级下拉框
            typeAr:[],//客户类型下拉框
            statusAr:[],//状态下拉框
            curencyAr:[],//币种下拉
            addAr:[],//地址类型下拉
            tranAr:[],//运输方式下拉
            //-----------------------


            activeName: 'bank',//tabs标签页默认激活name
            supplier:true,//同为供应商

            createContactParams:{//创建客户资料
                id: 0,
                ouId: '',
                contactCode: "",
                contactName: "",
                contactFullName: "",
                contactTypeId: 0,
                contactClassId: '',
                contactWorkPropertyId: 0,
                status: 1,
                ficaOuId: '',
                mnemonic: "",
                contactGradeId: '',
                isSupplier: 1,
                isCustomer: 1,
                taxCode: "",
                opAreaId: '',
                adAreaId: '',
                legalPerson: "",
                regAddress: "",
                manager: "",
                phone: "",
                remark: "",
                creditMgt: true
            },

            createBankParams:{//创建银行的参数
                id: 0,
                contactId: 0,
                settlementCurrencyId: '',
                accountNo: "",
                accountName: "",
                openingBank: "",
                contactPerson: "",
                phone: "",
                isDefault: false
            },

            createAddressParams:{//创建地址的参数
                id: 0,
                contactId: 0,
                completeAddress: "",
                addressType: '',
                addressId: 0,
                contactPerson: "",
                phone: "",
                isDefault: false
            },

            createOuParams:{//创建组织参数
                id: 0,
                contactId: 0,
                ouId: '',
                transportMethodId: '',
                isDefault: false
            },
            bankData:[],//银行数据列表，开始为空
            addBankList:[],//需要添加的银行信息

            addressData:[],//地址数据列表，开始为空
            addAddressList:[],//需要添加的地址信息

            ouData:[],//组织数据列表，开始为空
            updataOuList:[],//修改的组织信息
            addOuList:[],//需要添加的组织信息

            multipleSelection:[],//需要删除的银行数组
            multipleSelectionAdd:[],//需要删除的地址数组
            multipleSelectionOu:[],//需要删除的组织数组

            bankIndex:[],
            addIndex:[],
            ouIndex:[],

            x:0,
            y:0,
            z:0,
            xrows:[],
            yrows:[],
            zrows:[],
            backId:'',
            //---确认删除-----------------
            //dialogDelConfirm:false,//用户删除保存提示信息
            // row:{},//存储用户点击删除条目数据
            // choseAjax:'',//存储点击单个删除还是多天删除按钮判断信息
            //--------------------

            //---信息修改提示框------------
            dialogUserConfirm:false,//信息更改提示控制
            //----------------------------
            //---错误提示框----------------
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
            //-----------------------------
            who:'',//删除的是谁以及是否是多项删除
            // whoId:'',//单项删除的id
            whoIndex:'',//单项删除的index
            //-----------------------------
            nameWithFull:false,
            //-------------------------------
            A:false,
            B:false,
            C:false,
            //---使用组织---------------------------
            dialogOu:false,
            expand:{
                expandId_dialogOu:[],//默认dialog组织树形展开id
            },
            ouTreeDataRight:[],//
            ouDefaultPropsRight:{
                children: 'children',
                label: 'ouName',
                id:'ouId'
            },
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
            //-------------弹框--------------------
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
            //-----------按钮----------------------
            buttonGroup:[{
                text:'返回',
                class:'bt_back',
                icon:'icon-fanhui',
                disabled:false,
            },{
                text:'新增',
                class:'bt_add',
                icon:'icon-xinzeng',
                disabled:true,
            },{
                text:'删除',
                class:'bt_del',
                icon:'icon-shanchu',
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
            }],//按钮组
        }
    },
    validators: {
        'createContactParams.ouId': function (value) {//所属组织
            return this.Validator.value(value).required().integer();
        },
        'createContactParams.contactCode': function (value) {//编码
            return this.Validator.value(value).required().maxLength(50);
        },
        'createContactParams.contactName': function (value) {//名称
            return this.Validator.value(value).required().maxLength(50);
        },
        'createContactParams.contactFullName': function (value) {//全称
            return this.Validator.value(value).required().maxLength(50);
        },
        'createContactParams.mnemonic': function (value) {//助记码
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.contactClassId': function (value) {//客户分类
            return this.Validator.value(value).required().integer();
        },
        'createContactParams.contactWorkPropertyId': function (value) {//客户性质
            return this.Validator.value(value).required().integer();
        },
        'createContactParams.contactGradeId': function (value) {//客户等级
            return this.Validator.value(value).integer();
        },
        'createContactParams.contactTypeId': function (value) {//客户类型
            return this.Validator.value(value).required().integer();
        },
        'createContactParams.ficaOuId': function (value) {//对应财务组织
            let self = this;
            if(self.createContactParams.contactTypeId == 1){
                return this.Validator.value(value).required().integer();
            }
        },
        'createContactParams.taxCode': function (value) {//纳税登记号
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.opAreaId': function (value) {//业务地区区号
            return this.Validator.value(value).integer();
        },
        'createContactParams.adAreaId': function (value) {//行政地区
            return this.Validator.value(value).integer();
        },
        'createContactParams.legalPerson': function (value) {//法人代表
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.regAddress': function (value) {//注册地址
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.manager': function (value) {//负责人
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.phone': function (value) {//电话
            return this.Validator.value(value).maxLength(50);
        },
        'createContactParams.remark': function (value) {//备注
            return this.Validator.value(value).maxLength(200);
        },
        'createContactParams.status': function (value) {//状态
            return this.Validator.value(value).required().integer();
        },
    },
    computed:{
            countCu () {
                return this.cuItem;
            },
            countFi () {
                return this.fiItem;
            },
            countOu () {
                return this.ouItem;
            },
            countAd () {
                return this.adItem;
            },
            countOp () {
                return this.opItem;
            },
            countYw (){
                return this.ywItem;
            }
        },
    created () {
        let self=this;
        self.loadSelect();
        self.getAllOulength();
        self.loadOuTreeAll();
    },
    watch: {
    //   search(val) {
    //     this.$refs.tree.filter(val);
    //   }
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
    methods:{
        //---下拉的数据------------------------------------------------------
        loadSelect:function(){
            let self = this;
            //所属组织
            self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                // console.log(res);
                self.ouAr = res;
                self.ouExpandId=self.defauleExpandTree(res.result,'id')
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            //获取当前默认ouid
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                // console.log(res);
                self.defaultOuId = res.result.id;
                self.createContactParams.ouId = self.defaultOuId;
                // self.createOuParams.ouId = self.defaultOuId;
                //加载完成拿回下拉的默认值
                self.ouItem.ouFullname = res.result.ouFullname;
                self.ouItem.id =  res.result.id;
            },function(res){
                console.log('err'+res)
            });

            //业务地区
            self.$axios.gets('/api/services/app/OpAreaManagement/GetTree').then(function(res){
                console.log(res);
                self.opAr = res.result;
                self.expandOpId=self.defauleExpandTree(res.result,'id')
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            })


            //客户分类
            self.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:1}).then(function(res){
                // console.log(res[0]);
                self.cuAr = res;
                //console.log(self.cuAr)
                self.cuExpandId=self.defauleExpandTree(res,'id')
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });

            //对应财务组织
            self.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:3}).then(function(res){
                console.log(res);
                self.fiAr = res.result;
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            //客户性质
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerWorkProperty'}).then(function(res){
                // console.log(res);
                self.propertyAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //客户等级
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerGrade'}).then(function(res){
                console.log(res);
                self.gradeAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //客户类型
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerType'}).then(function(res){
                // console.log(res);
                self.typeAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //行政地区获取省
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                //console.log(res);
                self.areaProArray = res.result;
                self.areaProArray1 = res.result;
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });

            //状态
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                // console.log(res);
                self.statusAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //币种
            self.$axios.gets('/api/services/app/CurrencyManagement/GetAll',{SkipCount:'0',MaxResultCount:'100'}).then(function(res){
                // console.log(res);
                self.curencyAr = res.result.items;
            },function(res){
                console.log('err'+res)
            });
            //地址类型
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'AddressType'}).then(function(res){
                // console.log(res);
                self.addAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //运输方式
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'TransportMethod'}).then(function(res){
                // console.log(res);
                self.tranAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //业务组织、2是业务组织
            self.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:'2'}).then(function(res){
                console.log(res);
                self.ywAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
        //------------------------------------------------------------------

        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            // this.$store.state.url='/customer/customerModify/default'
            this.$store.state.url='/customer/customerModify/'+id;
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        //------------------------------------------------------------

        //---保存数据--------------------------------------------------
        save:function(){//点击保存创建客户资料
            let self = this;
            console.log(self.ouTreeDataRight)
            $('.tipsWrapper').css({display:'block'});
            $.each(self.ouCheckAll,function(index,value){
                    let oudetail={
                        "id": 0,
                        "contactId": 0,
                        "ouId": '',
                        "transportMethodId": '',
                        "isDefault": true
                    }
                    self.ouData.push(oudetail);
                    self.ouData[index].transportMethodId=self.showPageTableOu[index].transportMethodId
                    self.ouData[index].ouId=value.id;
            })
            console.log(self.ouCheckAll,self.ouData)
            let submitData = {};
            submitData = {
                contact_MainTable:self.createContactParams,
                contactBanks_ChildTable:self.bankData,
                contactAddress_ChildTable:self.addressData,
                contactOu_ChildTable:self.ouData
            };

            self.$validate().then(function(success){
                if(success){
                    console.log(submitData)
                    $('.tipsWrapper').css({display:'none'})

                    if(self.bankData.length>0){
                        for(let i in self.bankData){
                            if(self.bankData[i].settlementCurrencyId!=''){
                                self.A = true
                            }else{
                                // self.$message({
                                //     type: 'info',
                                //     message: '结算币种必选'
                                // });
                                $('.tipsWrapper').css({display:'none'})
                            }
                        }
                    }else{
                        self.A = true;
                    }
                    // console.log(self.A)
                    if(self.addressData.length>0){
                        for(let i in self.addressData){
                            if(self.addressData[i].completeAddress!=''){
                                self.B = true
                            }else{
                                self.$message({
                                    type: 'info',
                                    message: '供货地址必填'
                                });
                                $('.tipsWrapper').css({display:'none'})
                            }
                        }
                    }else{
                        self.B = true
                    }
                    // console.log(self.B)
                    if(self.ouData.length>0){
                        for(let i in self.ouData){
                            if(self.ouData[i].ouId!=''){
                                self.C = true
                            }else{
                                self.$message({
                                    type: 'info',
                                    message: '业务组织必选'
                                });
                                $('.tipsWrapper').css({display:'none'})
                            }
                        }
                    }else{
                        self.C = true
                    }
                    // console.log(self.A)
                    // console.log(self.B)
                    // console.log(self.C)
                    if(self.A == true || self.B == true || self.C == true){
                        // console.log(999)
                        self.$axios.posts('/api/services/app/ContactManagement/AggregateCreate',submitData).then(function(res){
                            console.log(res);
                            self.open('创建成功','el-icon-circle-check','successERP');
                            self.backId = res.result;
                            self.goModify(self.backId);
                        },function(res){
                            // console.log(res)
                            // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                            // self.errorMessage=true;
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=res.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;

                        });
                    }
                }
            })

        },
        //---------------------------------------------------------

        //---从表增行--------------------------------------------
        addColbank:function(){//银行增行
            let self = this;
                self.x++;
                let newCol = 'newCol'+self.x;
                self.xrows.newCol ={
                    id: 0,
                    contactId: 0,
                    settlementCurrencyId: '',
                    accountNo: "",
                    accountName: "",
                    openingBank: "",
                    contactPerson: "",
                    phone: "",
                    isDefault: false,
                    index:self.x,
                };
                self.bankData.unshift(self.xrows.newCol);
                self.addBankList.unshift(self.xrows.newCol)
        },

        addColAddress:function(){//地址增行
            let self = this;
                self.y++;
                let newCol = 'newCol'+self.y;
                self.yrows.newCol ={
                    "groupId": 1,
                    "contactId": self.createAddressParams.contactId,
                    "addressType": '2',
                    "addressId": '3',
                    "completeAddress": "",
                    "contactPerson": "",
                    "phone": "",
                    "isDefault": false,
                    "adAreaLevel1":'',
                    "adAreaLevel2":'',
                    "adAreaLevel3":''
                };
                self.addressData.unshift(self.yrows.newCol);
                self.addAddressList.unshift(self.yrows.newCol)
        },

        // addColOu:function(){//组织增行
        //     let self = this;
        //     self.z++;
        //     let newCol = 'newCol'+self.z;
        //     self.zrows.newCol ={
        //         id: 0,
        //         contactId: 0,
        //         ouId: '',
        //         transportMethodId: '',
        //         isDefault: false
        //     };
        //     self.ouData.unshift(self.zrows.newCol)
        //     self.addOuList.unshift(self.zrows.newCol)
        // },

        //-----------------------------------------------------

        //---确认删除-------------------------------------------
        sureDel:function(){
            let self = this;

            if(self.who == 1){//银行单项删除
                self.bankData.splice(self.whoIndex,1);
                self.addBankList.splice(self.whoIndex,1);
                //self.dialogDelConfirm = false;
            };
            if(self.who == 2){//地址单项删除
                self.addressData.splice(self.whoIndex,1);
                self.addAddressList.splice(self.whoIndex,1)
                //self.dialogDelConfirm = false;
            };
            // if(self.who == 3){//组织单项删除
            //     self.ouData.splice(self.whoIndex,1);
            //     self.addOuList.splice(self.whoIndex,1);
            //     //self.dialogDelConfirm = false;
            // }
            if(self.who == 4){//银行批量删
                let x = [];
                $.each(self.bankData,function(index,value){
                    let flag = false;
                    $.each(self.multipleSelection,function(i,val){
                        if(value==val){
                            flag = true;
                        }
                    })
                    if(!flag){
                        x.push(value)
                    }
                })
                self.bankData = x;
                self.addBankList = [];
                for(let i in x){
                    if(x[i].id==''||x[i].id==undefined){
                        // console.log(x[i])
                        self.addBankList.push(x[i])
                        console.log(self.addBankList)
                    }
                }
            }
            if(self.who == 5){//地址多项删除
                let x = [];
                $.each(self.addressData,function(index,value){
                    let flag = false;
                    $.each(self.multipleSelectionAdd,function(i,val){
                        if(value==val){
                            flag = true;
                        }
                    })
                    if(!flag){
                        x.push(value)
                    }
                })
                self.addressData = x;
                self.addAddressList = [];
                for(let i in x){
                    if(x[i].id==''||x[i].id==undefined){
                        // console.log(x[i])
                        self.addAddressList.push(x[i])
                        console.log(self.addAddressList)
                    }
                }
            }
            // if(self.who == 6){//使用组织多项删除
            //     let x = [];
            //     $.each(self.ouData,function(index,value){
            //         let flag = false;
            //         $.each(self.multipleSelectionOu,function(i,val){
            //             if(value==val){
            //                 flag = true;
            //             }
            //         })
            //         if(!flag){
            //             x.push(value)
            //         }
            //     })
            //     self.ouData = x;
            //     self.addOuList = [];
            //     for(let i in x){
            //         if(x[i].id==''||x[i].id==undefined){
            //             // console.log(x[i])
            //             self.addOuList.push(x[i])
            //             console.log(self.addOuList)
            //         }
            //     }
            // }

            // if(self.who == 4){//银行批量删
            //     let x = [];
            //     $.each(self.addBankList,function(index,value){
            //         let flag = false;
            //         $.each(self.multipleSelection,function(i,val){
            //             if(value == val){
            //                 flag = true;
            //             }
            //         })
            //         if(!flag){
            //             x.push(value)
            //         }
            //     })
            //     self.addBankList = x;
            //     self.bankData = x;
            //     //self.dialogDelConfirm = false;
            // }
            // if(self.who == 5){//地址批量删
            //     let x = [];
            //     $.each(self.addAddressList,function(index,value){
            //         let flag = false;
            //         $.each(self.multipleSelectionAdd,function(i,val){
            //             if(value == val){
            //                 flag = true;
            //             }
            //         })
            //         if(!flag){
            //             x.push(value)
            //         }
            //     })
            //     self.addAddressList = x;
            //     self.addressData = x;
            //     //self.dialogDelConfirm = false;
            // }
            // if(self.who == 6){//地址批量删
            //     let x = [];
            //     $.each(self.addOuList,function(index,value){
            //         let flag = false;
            //         $.each(self.multipleSelectionOu,function(i,val){
            //             if(value == val){
            //                 flag = true;
            //             }
            //         })
            //         if(!flag){
            //             x.push(value)
            //         }
            //     })
            //     self.addOuList = x;
            //     self.ouData = x;
            //     //self.dialogDelConfirm = false;
            // }

        },
        //-----------------------------------------------------

        //---从表表格内删除-------------------------------------------
        handleBankDelete:function(index,row,who){//表格内删除操作 who:1银行 2地址 3使用组织
            let self = this;
            self.who = who;
            self.whoIndex = index;
            self.sureDel();
            //self.dialogDelConfirm = true;
        },
        handleAddDelete:function(index,row,who){//表格内删除操作 who:1银行 2地址 3使用组织
            let self = this;
            self.who = who;
            self.whoIndex = index;
            self.sureDel();
            //self.dialogDelConfirm = true;
        },
        handleOuDelete:function(index,row,who){//表格内删除操作 who:1银行 2地址 3使用组织
            let self = this;
            self.who = who;
            self.whoIndex = index;
            self.sureDel();
            //self.dialogDelConfirm = true;
        },

        //-------------------------------------------------------

        //---从表多项删除-----------------------------------------
        delMoreBank:function(num){
            let self = this;
            if(self.multipleSelection.length>0){
                self.who = num;
                self.sureDel();
                //self.dialogDelConfirm = true;
            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
        },
        delMoreAdd:function(num){
            let self = this;
            if(self.multipleSelectionAdd.length>0){
                self.who = num;
                self.sureDel();
                //self.dialogDelConfirm = true;
            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
        },
        delMoreOu:function(num){
            let self = this;
            if(self.multipleSelectionOu.length>0){
                self.who = num;
                self.sureDel();
                //self.dialogDelConfirm = true;
            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
        },
        //------------------------------------------------------

        //----------------------------------------------------------

        getCurrentRow:function(index,row){//银行默认单选框
            let self = this;
            for(let i in self.bankData){
                self.bankData[i].isDefault = false;
            }
            self.bankData[index].isDefault = true;
            for(let i in addBankList){
                self.addBankList[i].isDefault = false;
            }
            self.addBankList[index].isDefault = true;

        },
        //----------------------------------------------------------

        //---从表复选框---------------------------------------
        handleSelectionChange:function(val){//点击复选框选中的数据
                this.multipleSelection = val;
                console.log(this.multipleSelection)
        },
        handleSelectionChange2:function(val){//点击复选框选中的数据
                this.multipleSelectionAdd = val;
        },
        handleSelectionChange3:function(val){//点击复选框选中的数据
                this.multipleSelectionOu = val;
        },
        //---------------------------------------------------


        //---判断是否有修改过的内容---------------------------
        Modify:function(){//判断主表是否修改过
            let self = this;
            self.ifModify = true;
        },
        Cancel:function(){
            let self = this;
            self.createContactParams = {//创建客户资料参数
                'groupId':1,//集团Id
                'ouId':'',//组织单元id
                'contactCode':'',//客户编码
                'contactName':'',//客户名称
                'contactFullName':'',//客户全称
                'mnemonic':'',//助记码
                'contactClassId':'',//客户分类
                'contactTypeId':0,//客户类型
                'contactWorkPropertyId':0,//客户性质
                'contactGradeId':'',//客户等级ID,
                'isSupplier':'1',//是否为供应商
                'isCustomer':'1',//是否客户
                'ficaOuId':'',//财务组织单元 ID
                'taxCode':'',//纳税登记号
                'opAreaId':'',//业务地区
                'adAreaId':'1',//行政地区
                'legalPerson':'',//法人代表
                'regAddress':'',// 注册地址
                'manager':'',//负责人
                'phone':'',//电话
                'remark':'',//备注
                'creditMgt':true,//信用管理
                'status':'未启用',//状态
            }
        },
        //--------------------------------------------------

        //---修改返回提示-----------------------------------------
        isBack(num){
            let self=this;
            if(self.ifModify){
                //self.dialogUserConfirm=true;
                self.dialogSetting.dialogName='backDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
            }else{
                self.back()
            }
        },
        sureDoing:function(){
            let self = this;
            self.back();
        },
        //-------------------------------------------------------

        //---控制跳转------------------------------------------------
        back(){//点击新增跳转
            this.$store.state.url='/customer/customerList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
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
        //----------------------------------------------------------

        //---选择省市区-----------------------------------------------
            chooseProvinceT:function(res){
                let self = this;
                self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:res}).then(function(res){
                    //console.log(res);
                    self.areaCityArray = res.result;
                    self.cityIdT='';
                    self.quIdT='';
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                });

            },
            chooseCityT:function(res){
                let self = this;
                self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:res}).then(function(res){
                    // console.log(res);
                    self.areaDisArray = res.result;
                    self.quIdT='';
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
            },
            chooseDisT:function(res){
                let self = this;
                self.createContactParams.adAreaId=res;
                // console.log(self.createRepositoryParams.stock_MainTable.adAreaId)
            },


            chooseProvince:function(result){
                let self = this;
                console.log(result)
                self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:result.adAreaLevel1}).then(function(res){
                    self.areaCityArray2 = res.result;
                    console.log(self.addressData)

                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                });

            },
            chooseCity:function(result){
                let self = this;
                self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:result.adAreaLevel2}).then(function(res){
                    // console.log(res);
                    self.areaDisArray3 = res.result;
                    // self.loadIcon();
                },function(res){
                    console.log('err'+res)
                })
            },
            chooseDis:function(res){
                let self = this;
            },
            //-----------------------------------------------------------

        //---树-------------------------------------------------------------
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
        opFilterNode(value, data) {
            if (!value) return true;
                return data.name.indexOf(value) !== -1;
        },
        //---树render-content----------------------------------
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
        renderContentCu(h, { node, data, store }){//客户分类
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.className}
                    </span>
                );
            }
        },
        renderContentOp(h, { node, data, store }){//业务地区
            if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.name}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.name}
                    </span>
                );
            }
        },
        //---树通用----------------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },
        //-----------------------------------------------------
        cuNodeClick:function(data){
            let self = this;
            self.cuItem.id = data.id;
            self.cuItem.cuFullname = data.className;
            self.$nextTick(function(){
                $('#cu_confirmSelect').click()
            })
        },
        ouNodeClick:function(data){
            let self = this;
            self.createContactParams.opAreaId = '';
            self.opItem.name = '';
            self.opAr = [];

            self.ouItem.id = data.id;
            self.ouItem.ouFullname = data.ouFullname;
            self.$nextTick(function(){
                $('#ou_confirmSelect').click()
            })
            //点击所属组织，业务地区跟着变动
            self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:data.id}).then(function(res){
                console.log(res);
                if(res.result&&res.result.length>0){
                    self.opAr = res.result;
                    self.expandOpId=self.defauleExpandTree(res,'id')
                    // self.loadIcon();
                }else{
                    self.opItem.name = '暂无业务地区';
                    self.opItem.id = '';
                }
            },function(res){
                console.log('err'+res)
            });
        },
        fiNodeClick:function(data){
            let self = this;
            self.fiItem.id = data.id;
            self.fiItem.fiFullname = data.ouFullname;
            self.$nextTick(function(){
                $('#fi_confirmSelect').click()
            })
        },
        adNodeClick:function(data){
            let self = this;
            self.adItem.id = data.id;
            self.adItem.areaName = data.areaName;
            self.$nextTick(function(){
                $('#ad_confirmSelect').click()
            })
        },
        opNodeClick:function(data){
            let self = this;
            console.log(data)
            self.opItem.id = data.id;
            self.opItem.name = data.name;
            self.$nextTick(function(){
                $('#op_confirmSelect').click()
            })
        },
        ywNodeClick:function(data){//从表业务组织
            console.log(data)
            let self = this;
            self.ywItem.id = data.id;
            self.ywItem.ouName = data.ouName;
            self.$nextTick(function(){
                $('#yw_confirmSelect').click()
            })
        },
        //-----------------------------------------------------
        //---提示错误----------------------------------------------
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
            // $('.tipsWrapper').each(function(){
            //     if($(e.target).parent('.el-input').hasClass($(this).attr('name'))){
            //         $(this).addClass('display_block')
            //     }else{
            //         $(this).removeClass('display_block')
            //     }
            // })
        },
        showErrprTipsSelect(e){
            $('.tipsWrapper').css({display:'none'})
            // $('.tipsWrapper').each(function(){
            //     if($(e.target).parent('.el-input').parent('.el-select').hasClass($(this).attr('name'))){
            //         $(this).addClass('display_block')
            //     }else{
            //         $(this).removeClass('display_block')
            //     }
            // })
        },
        showErrprTipsRangedate(e){
            $('.tipsWrapper').css({display:'none'})
            // $('.tipsWrapper').each(function(){
            //     if($(e.$el).hasClass($(this).attr('name'))){
            //         $(this).addClass('display_block')
            //     }else{
            //         $(this).removeClass('display_block')
            //     }
            // })
        },
        showErrprTipsTextArea(e){
            $('.tipsWrapper').css({display:'none'})
            // $('.tipsWrapper').each(function(){
            // if($(e.target).parent('.el-textarea').hasClass($(this).attr('name'))){
            //     $(this).addClass('display_block')
            // }else{
            //     $(this).removeClass('display_block')
            // }
            // })
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
        //-------------------------------------------------------------

        //---编辑名称，全称跟着改变-------------------------------------
        editName:function(){
            let self = this;
            self.Modify();
            if(!self.nameWithFull&&self.createContactParams.contactFullName == ''){
                self.createContactParams.contactFullName = self.createContactParams.contactName;
            }
        },
        editFullName:function(){
            let self = this;
            self.Modify();
            self.nameWithFull = true;
        },
        //------------------------------------------------------------

        //---使用组织fuck---------------------------------------------
        searchOuTable(){
            let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchTableOu);
            $.each(_this.ouCheckAll,function(index,val){
                let str=val.ouName;

                let result = patt1.test(str)
                if(result){
                    newJson.push(val)
                }
            })
            let x=_this.paginationUserSearch(newJson,_this.ouOneItem,_this.ouPage)
            _this.showPageTableOu=x.nowData
            _this.ouTotalItem=x.TotalItem
            _this.ouTotalPage=x.TotalPage
        },
        getAllOulength(){
            let _this=this;
            let x= 0;
            let y = 0;
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{OuType:1,SkipCount:0,MaxResultCount:1})
            .then(function(res){
                x=res.result.totalCount
                // console.log(res)
            })
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{OuType:1,SkipCount:0,MaxResultCount:1})
            .then(function(res){
                y=res.result.totalCount
                // console.log(res)
            })
            _this.allOuLength = x +y;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
        },
        addRouterButton(name,url){//添加router页签
            let _this=this;
            var flag=false;
                if(_this.$store.state.slidbarData){
                    _this.$store.state.temporary=_this.$store.state.slidbarData;
                }
                var temporary=_this.$store.state.temporary;
                var name=name;
                var menuUrl=url;
                if(temporary.length==0){//temporary为空
                    flag=true;
                }else{//temporary不为空
                    for(var i=0;i<temporary.length;i++){
                        if(temporary[i].name==name){//相同页签
                            flag=false;
                            break;
                        }else{
                        flag=true;
                        }
                    }
                }
                var pushItem={'name':name,'url':menuUrl};

                _this.$store.state.url=menuUrl;//储存当前url在router里的name
                // this.$store.state.url='/'+menuUrl+'/'+'default';//储存当前url

                if(flag){
                    temporary.push(pushItem);
                }
                window.localStorage.setItem('ERP',JSON.stringify(temporary));
                _this.$router.push({name:this.$store.state.url})
        },
        addNewOu(){//新增组织
            let _this=this;
            // let data=_this.$refs.tree.getCheckedNodes();
                _this.$store.state.routes.OuManage.url='/OuManage/OuManageDetail/'+_this.addOu;//路由重定向
                _this.addRouterButton('组织管理','OuManage')
                _this.dialogOu=false;
                _this.activeName_first='useOu'
        },
        dialogOuIsShow(){
            let _this=this;
            _this.dialogOu=true;
            setTimeout(function(){
                // console.log(_this.storeCheckOu)
               _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
               _this.isCheckAllOu()
            },200)

        },
        ouNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            _this.addOu=data.ouId;
        },
        loadOuTreeAll(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{OuType:[1,2]})
            .then(function(res){
                console.log(res)
                _this.ouTreeDataRight=res.result;
                _this.defauleExpandTree('','expandId_dialogOu',res.result,'ouId','children')
            },function(res){
            })
        },
        ouDialogSure(){//dialog点击确认
            let _this=this;
            _this.dialogOu=false;
            // console.log(_this.$refs.tree.getCheckedKeys())
            _this.ouCheckAll=_this.$refs.tree.getCheckedNodes();
            _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
            // console.log(_this.ouCheckAll)
        },
        delCheckOu(row){//删除表格数据
            let _this=this;
            let indexs=null
            $.each(_this.ouCheckAll,function(index,val){
                if(val.ouId==row.ouId){
                    indexs=index
                }
            })
            if(indexs!=null){
                _this.ouCheckAll.splice(indexs,1)
            }
             _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
        },
        CheckAllTree(){//全选
            let _this=this;
            let topNode=[]
            if(_this.checkAllOu){
                // $.each(_this.ouTreeDataRight,function(index,val){
                //     topNode.push(val)
                // })
                _this.$refs.tree.setCheckedNodes(_this.ouTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                // _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
                _this.$refs.tree.setCheckedNodes([])
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
            if(_this.$refs.tree.getCheckedNodes().length==_this.allOuLength){
                _this.checkAllOu=true
            }else{
                _this.checkAllOu=false
            }
        },
        paginationOu(checkAllata,oneItem,thisPage){//数据分页
        //checkAllata分页数据
        //oneItem每页有多少条信息
        //thisPage当前页
            let _this=this;
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
        renderContent_ouTreeDataRight(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data.ouId}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.ouName}
                        </span>
                    );
                }
        },
        //-----------------------------------------------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){//
                self.isBack();
            }else if(btn=="新增"){//

            }else if(btn=="删除"){//

            }else if(btn=="保存"){//
                self.save();
            }else if(btn=="保存并新增"){//
                self.saveAdd();
            }else if(btn=="取消"){
                self.isBack();
            }
        },
        //------------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                 if(parmas.dialogName=="backDialog"){//保存提交对话框
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){
                    this.back();
                    this.dialogVisible=false;
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },

    }


  })
  </script>

<style>
  .block{
    display: none;
    }
    .bg-white{
        background: white;
    }
  .customerBasicForm{
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
 .customerBasicForm .upBt{
     font-size: 12px;
     float: right;
     margin-right: 10px;
     margin-top: 10px;
     cursor: pointer;
 }
 .customerBasicForm .upBt i{
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    color:#cacaca;
    margin-left: 5px;
 }
 .customerBasicForm .upBt i.rotate{
     transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
 }

.customerBasicForm  .errorTips{
    margin-bottom: 10px;
}
.customerBasicForm .el-row:first-child{
      padding:5px 0;
}
  .customerBasicForm .el-row{
     padding:15px 0;
     background-color: #fff;
  }
  .customerBasicForm .el-row:last-child{
      border-bottom:none;
  }

.customerBasicForm .tabZoo{
     overflow: hidden;
     background-color: #fff;
 }

 .customerBasicForm  .getPadding,.tabZoo .el-tabs__nav-scroll{
     padding: 0 10px;
 }
 .customerBasicForm .tabZoo .auditInformation{
     margin-top: 15px;
 }

.customerBasicForm .tabZoo .erp_bt:first-child{
    margin-left: 0;
}
.customerBasicForm .nopadding{
    padding-top: 0;
}
.customerBasicForm .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.customerBasicForm .el-table td{
    padding: 3px 0;
}
.customerBasicForm .el-table__body{
    text-align: center;
}
.customerBasicForm .el-table .cell{
    padding-left:0px;
    padding-right:0px;
}
.mb10{
    margin-bottom: 10px;
}

.customerBasicForm .el-input__inner{
    height:35px !important;
    /* border:1px solid white; */
    /* border-color:white !important; */
}
.customerBasicForm .all-table .el-input__inner{
    height:35px !important;
    text-align: center !important;
    border:none !important;
}
.customerBasicForm .bgw .el-input__inner{
    background-color:white;
    text-align: center;
    border:1px solid white;
}
.customerBasicForm .bgg .el-input__inner{
    background-color:#FAFAFA;
    text-align: center;
    border:1px solid white;
}
.customerBasicForm .bgp .el-input__inner{
    background-color:#FAFAFA;
    text-align: center;
}
.customerBasicForm .el-select-dropdown__item{
    text-align: center;
}
.customerBasicForm .area{
    width:510px;
    margin-right:0px;
}
.customerBasicForm .el-select.areaDrop,.el-input.areaEntry{
    width: 136px;
}
.areaDrop input,.areaEntry input{
    border: none!important;
}
.areaDrop .el-input__inner,.areaEntry .el-input__inner{
    height: 32px!important;
}
.customerBasicForm .checkBoxOuUser{
    height: 50px;
    background-color: #f2f2f2;
    line-height: 50px;
}
.customerBasicForm .square_el{
    margin-right:5px;
    margin-left: 10px;
}
.customerBasicForm .add{
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
.customerBasicForm .search_input_group{
    margin-top:6px;
}
.customerBasicForm .dialogOu .search_input_group{
    width:40%;
    position: absolute;
    top: 2px;
    right: 6%;
}
.customerBasicForm .dialogOu .search_input_group .search_input_wapper{
    width:100%;
}
.customerBasicForm .inline-block-need{
        display: inline-block;
    }
  </style>

