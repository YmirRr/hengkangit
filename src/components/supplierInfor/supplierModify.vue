<template>
    <div class="supplier-modify">
        <el-row class="fixed">
            <el-col :span="24" class="bg-white">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                <span @click="ifShow = !ifShow" class="upBt">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
            </el-col>
        </el-row>
        
        <el-collapse-transition>
            <div v-show="ifShow">   
                <el-row class="bg-white ft12 pr10 pt10">
                    <el-col :span="24" class="getPadding"> 
                        <div class="tipsWrapper" name="ouId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.ouId')}">
                                <p class="msgDetail">错误提示：所属组织{{ validation.firstError('customerData.ouId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactCode">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactCode')}">
                                <p class="msgDetail">编码{{ validation.firstError('customerData.contactCode') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactName">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactName')}">
                                <p class="msgDetail">名称{{ validation.firstError('customerData.contactName') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactFullName">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactFullName')}">
                                <p class="msgDetail">全称{{ validation.firstError('customerData.contactFullName') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="mnemonic">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.mnemonic')}">
                                <p class="msgDetail">助记码{{ validation.firstError('customerData.mnemonic') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactClassId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactClassId')}">
                                <p class="msgDetail">供应商分类{{ validation.firstError('customerData.contactClassId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactWorkPropertyId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactWorkPropertyId')}">
                                <p class="msgDetail">供应商性质{{ validation.firstError('customerData.contactWorkPropertyId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactGradeId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactGradeId')}">
                                <p class="msgDetail">供应商等级{{ validation.firstError('customerData.contactGradeId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="contactTypeId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.contactTypeId')}">
                                <p class="msgDetail">供应商类型{{ validation.firstError('customerData.contactTypeId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="ficaOuId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.ficaOuId')}">
                                <p class="msgDetail">对应财务组织{{ validation.firstError('customerData.ficaOuId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="taxCode">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.taxCode')}">
                                <p class="msgDetail">纳税登记号{{ validation.firstError('customerData.taxCode') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="opAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.opAreaId')}">
                                <p class="msgDetail">业务地区{{ validation.firstError('customerData.opAreaId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="adAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.adAreaId')}">
                                <p class="msgDetail">行政地区{{ validation.firstError('customerData.adAreaId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="legalPerson">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.legalPerson')}">
                                <p class="msgDetail">法人代表{{ validation.firstError('customerData.legalPerson') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="regAddress">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.regAddress')}">
                                <p class="msgDetail">注册地址{{ validation.firstError('customerData.regAddress') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="manager">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.manager')}">
                                <p class="msgDetail">负责人{{ validation.firstError('customerData.manager') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="phone">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.phone')}">
                                <p class="msgDetail">电话{{ validation.firstError('customerData.phone') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="remark">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.remark')}">
                                <p class="msgDetail">备注{{ validation.firstError('customerData.remark') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="status">
                            <div class="errorTips" :class="{block : !validation.hasError('customerData.status')}">
                                <p class="msgDetail">状态{{ validation.firstError('customerData.status') }}</p>
                            </div>
                        </div>
                        

                        <div class="bgcolor">
                            <label><small>*</small>所属组织</label>
                            <el-select v-model="customerData.ouId"
                                    placeholder=""
                                    class="ouId"
                                    disabled
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('customerData.ouId')}">

                                <el-input placeholder="搜索..."
                                            class="selectSearch"
                                            v-model="ouSearch"></el-input>  

                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                        :data="ouAr"
                                        :props="selectOuProps"
                                        node-key="id"
                                        ref="outree"
                                        :default-expanded-keys="ouExpandId"
                                        :filter-node-method="ouFilterNode"
                                        :render-content="renderContentOu"
                                        highlight-current
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
                            <el-input v-model="customerData.contactCode" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.contactCode')}"
                                    class="contactCode"></el-input>
                        </div>


                        <div class="bgcolor">
                            <label><small>*</small>名称</label>
                            <el-input v-model="customerData.contactName" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.contactName')}"
                                    class="contactName"></el-input>
                        </div>


                        <div class="bgcolor">
                            <label><small>*</small>全称</label>
                            <el-input v-model="customerData.contactFullName" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.contactFullName')}"
                                    class="contactFullName"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>助记码</label>
                            <el-input v-model="customerData.mnemonic" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.mnemonic')}"
                                    class="mnemonic"></el-input>
                        </div>
                            


                        <div class="bgcolor">
                            <label><small>*</small>供应商分类</label>
                            <el-select v-model="customerData.contactClassId"
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    class="contactClassId"
                                    :class="{redBorder : validation.hasError('customerData.contactClassId')}">
                                <el-input placeholder="搜索..."
                                            class="selectSearch"
                                            v-model="cuSearch"></el-input>

                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                            :data="cuAr"
                                            :props="selectCuProps"
                                            node-key="id"
                                            ref="cutree"
                                            :filter-node-method="cuFilterNode"
                                            :default-expanded-keys="cuExpandId"
                                            :render-content="renderContentCu"
                                            :expand-on-click-node="false"
                                            highlight-current
                                            @node-click="cuNodeClick"></el-tree>

                                <el-option v-show="false"
                                            :key="countCu.id" 
                                            :label="countCu.cuName" 
                                            :value="countCu.id"
                                            id="cu_confirmSelect"></el-option>
                            </el-select>
                        </div>
                        
                        
                        
                        <div class="bgcolor">
                            <label>供应商性质</label>
                            <el-select v-model="customerData.contactWorkPropertyId"
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    class="contactWorkPropertyId"
                                    :class="{redBorder : validation.hasError('customerData.contactWorkPropertyId')}">
                                <el-option v-for="item in propertyAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label>供应商等级</label>
                            <el-select v-model="customerData.contactGradeId"
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    class="contactGradeId"
                                    :class="{redBorder : validation.hasError('customerData.contactGradeId')}">
                                <el-option v-for="item in gradeAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>供应商类型</label>
                            <el-select v-model="customerData.contactTypeId"
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    class="contactTypeId"
                                    :class="{redBorder : validation.hasError('customerData.contactTypeId')}">
                                <el-option v-for="item in typeAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>   

                        <div class="bgcolor">
                            <label><small v-show='customerData.contactTypeId != 0'>*</small>对应财务组织</label>
                            <el-select v-model="customerData.ficaOuId"
                                    placeholder=""
                                    class="ficaOuId"
                                    :disabled="customerData.contactTypeId === 0"
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('customerData.ficaOuId')}">
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
                            <el-input v-model="customerData.taxCode" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    class="taxCode"
                                    :class="{redBorder : validation.hasError('customerData.taxCode')}"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>业务地区</label>
                            <el-select v-model="customerData.opAreaId"
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
                            <el-input v-model="customerData.legalPerson" 
                                    placeholder=""
                                    class="legalPerson"
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.legalPerson')}"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>注册地址</label>
                            <el-input v-model="customerData.regAddress" 
                                    placeholder=""
                                    class="regAddress"
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('customerData.regAddress')}"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>负责人</label>
                            <el-input v-model="customerData.manager" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    class="manager"
                                    :class="{redBorder : validation.hasError('customerData.manager')}"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>电话</label>
                            <el-input v-model="customerData.phone" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    class="phone"
                                    :class="{redBorder : validation.hasError('customerData.phone')}"></el-input>
                        </div>
                        
                        <div class="bgcolor">
                            <label>备注</label>
                            <el-input v-model="customerData.remark" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    class="remark"
                                    :class="{redBorder : validation.hasError('customerData.remark')}"></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>状态</label>
                            <el-select v-model="customerData.status"
                                    class="status"
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('customerData.status')}">
                                <el-option v-for="item in statusAr"  
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>     
        
        <el-row>
            <el-col :span="2" :offset="1"><el-checkbox v-model="supplier">同为客户</el-checkbox></el-col>
        </el-row>

        <!-- 公司业务财务bootTab标签页 -->
        <el-row class="nopadding mt10"> 
            <div class="tabZoo">
                <el-col :span="24">
                <el-tabs v-model="activeName">
                        <el-tab-pane label="银行信息" name="bank" class="getPadding" style="z-index:-10">
                            
                            <buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1'></buttonGroup>
                    
                            <el-table :data="bankData" stripe border style="width: 100%" @selection-change="handleSelectionChange" class="all-table">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="settlementCurrencyId" label="结算币种" width="180">
                                    <template slot-scope="scope">
                                        <img v-show='redBankAr.indexOf(scope.row)>=0' class="abimg" src="../../../static/image/content/redremind.png"/>
                                        <el-select  v-model="scope.row.settlementCurrencyId" :class="[scope.$index%2==0?'bgw':'bgp']">
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
                                            type="text"
                                            @change="handleBankChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="accountName" label="银行账户" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.accountName" 
                                            type="text"    
                                            @change="handleBankChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="openingBank" label="开户银行" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.openingBank" 
                                            type="text"    
                                            @change="handleBankChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="contactPerson" label="联系人" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.contactPerson" 
                                            type="text"   
                                            @change="handleBankChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="phone" label="联系电话" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.phone" 
                                            type="text"    
                                            @change="handleBankChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="isDefault" label="默认">
                                    <template slot-scope="scope">
                                        <el-radio  :label="true" 
                                                    v-model="scope.row.isDefault" 
                                                    @change.native="getCurrentRow(scope.$index,scope.row)" 
                                                    @change="handleBankChange(scope.$index,scope.row)"></el-radio>
                                    </template>
                                </el-table-column>

                                <el-table-column label='操作'>
                                    <template slot-scope="scope" >
                                        <el-button @click="handleDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="送货地址" name="address" class="getPadding" style="z-index:-1000">
                            
                            <buttonGroup :buttonGroup="buttonGroup2" @btnClick='btnClick2'></buttonGroup>
                            
                    
                            <el-table :data="addressData" stripe border style="width: 100%;" @selection-change="handleSelectionChange2" class="all-table">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="completeAddress" label="供货地址" width="180">
                                    <template slot-scope="scope">
                                        <img v-show='redAddAr.indexOf(scope.row)>=0' class="abimg" src="../../../static/image/content/redremind.png"/>
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.completeAddress" 
                                            type="text"    
                                            @change="handleAddressChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>
                                <el-table-column prop="adAreaLevel1" label="省" width="180">
                                    <template  slot-scope="scope">
                                        <el-select v-model="scope.row.adAreaLevel1" clearable placeholder="请选择"  @change="chooseProvince(scope.row)">
                                            <el-option
                                            v-for="item in areaProArray1"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                            </el-option>
                                        </el-select>

                                    </template>
                                </el-table-column>
                                <el-table-column prop="adAreaLevel2" label="市" width="180">
                                    <template  slot-scope="scope">
                                        <el-select v-model="scope.row.adAreaLevel2" clearable placeholder="请选择" @change="chooseCity(scope.row)" @focus='selectCityData(scope.row)'>
                                            <el-option
                                            v-for="item in areaCityArray2"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                            </el-option>
                                        </el-select>

                                    </template>

                                </el-table-column>

                                <el-table-column prop="adAreaLevel3" label="区" width="180">
                                    <template  slot-scope="scope">
                                        <el-select v-model="scope.row.adAreaLevel3" clearable placeholder="请选择" @focus="selectDisData(scope.row)">
                                            <el-option
                                            v-for="item in areaDisArray3"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                            </el-option>
                                        </el-select>

                                    </template>
                                </el-table-column>

                                <el-table-column prop="contactPerson" label="联系人" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.contactPerson" 
                                            type="text"    
                                            @change="handleAddressChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="phone" label="联系电话" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.phone" 
                                            type="text"    
                                            @change="handleAddressChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="isDefault" label="默认">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="addressData[scope.$index].isDefault"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label='操作'>
                                    <template slot-scope="scope" >
                                        <el-button v-on:click="handleDelete(scope.$index,scope.row,2)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="使用组织" name="organization" class="getPadding" style="z-index:-1000">
                            

                            <button class="erp_bt bt_add" @click="dialogOuIsShow">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_add.png">
                                </div>
                                <span class="btDetail">选取</span>
                            </button>

                            <el-table :data="showPageTableOu" stripe border style="width: 100%" @selection-change="handleSelectionChange3">
                                
                                <el-table-column type="selection"></el-table-column>
                                
                                <el-table-column prop="ouName" label="业务组织" width="540">
                                    
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
                                            :total="ouTotalItem">
                            </el-pagination>  

                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>
        </el-row>   

        <el-row class="mt10">  
            <el-col :span="22" class="auditInformation getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input v-model="customerData.createdBy" placeholder="" disabled="disabled"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="customerData.createdTime" :disabled="true"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input v-model="customerData.modifiedBy" placeholder="" disabled="disabled"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="customerData.modifiedTime" :disabled="true"></el-input>                       
                    </div>
                    
                </div>                                  
            </el-col>
        </el-row>
        <!-- 使用组织弹框 -->
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
                        node-key="id"
                        ref="fptree"
                        :filter-node-method="filterNode"
                        @node-click="ouNodeClickRight"
                        @check-change="isCheckAllOu"
                        :expand-on-click-node="false"
                        :props="ouDefaultPropsRight">
                        </el-tree>
                    </vue-scroll>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="ouDialogSure">确 认</button>
                <button class="transfer_footer_btn" @click="dialogOu = false">取 消</button>
            </span>
        </el-dialog>

        <!-- dialog错误信息提示 -->
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
        <!-- dialog -->                                                                        
    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
export default({
    name:'customerModify',
    components:{
        buttonGroup,
        dialogBox
    },
    created:function(){
        let self = this;
        self.loadData();
        self.loadSelect();
        self.getAllOulength();
        self.loadOuTreeAll();
    },
    watch:{
        ifModify:{
            handler:function(){
                let self = this;
                if(self.ifModify == true){
                    self.buttonGroup[3].disabled = false;
                    self.buttonGroup[4].disabled = false;
                    self.buttonGroup[5].disabled = false;
                }else{
                    self.buttonGroup[1].disabled = true;
                    self.buttonGroup[2].disabled = true;
                }
            },
            deep:true,
        },
        allData:{
            handler:function(val,oldVal){
                let self = this;
                // console.log(self.ifModify)
                if(!self.firstModify){
                    self.firstModify = !self.firstModify;
                }else{
                    self.ifModify = true;
                }
            },
            deep:true,
        },
        showPageTableOu:{
            handler:function(val,oldVal){
                let self = this;
                
                if(!self.ouModify){
                    self.ouModify = true;
                    
                }else{
                    self.ifModify = true;
                }
                console.log(self.ouModify)
                
            }     
        },
        
        bankData:{
            handler: function (val, oldVal) {
                let self = this;
                self.redBankAr = [];
                for(let i in val){
                    let flag = true;
                    for(let j in self.InitBankData){
                        if(val[i].groupId == self.InitBankData[j].groupId&&
                           val[i].contactId == self.InitBankData[j].contactId&&
                           val[i].settlementCurrencyId == self.InitBankData[j].settlementCurrencyId&&
                           val[i].accountNo == self.InitBankData[j].accountNo&&
                           val[i].openingBank == self.InitBankData[j].openingBank&&
                           val[i].contactPerson == self.InitBankData[j].contactPerson&&
                           val[i].phone == self.InitBankData[j].phone&&
                           val[i].isDefault == self.InitBankData[j].isDefault&&
                           val[i].isDeleted == self.InitBankData[j].isDeleted&&
                           val[i].deletedBy == self.InitBankData[j].deletedBy&&
                           val[i].deletedTime == self.InitBankData[j].deletedTime&&
                           val[i].modifiedBy == self.InitBankData[j].modifiedBy&&
                           val[i].modifiedTime == self.InitBankData[j].modifiedTime&&
                           val[i].createdBy == self.InitBankData[j].createdBy&&
                           val[i].createdTime == self.InitBankData[j].createdTime&&
                           val[i].id == self.InitBankData[j].id){
                               flag = false;
                           }
                    }
                    if(flag){
                        self.redBankAr.push(val[i])
                    }
                }
            },
            deep: true,
        },
        addressData:{
            handler: function (val, oldVal) {
                let self = this;
                self.redAddAr = [];
                for(let i in val){
                    let flag = true;
                    for(let j in self.InitAddData){
                        if(val[i].groupId == self.InitAddData[j].groupId&&
                           val[i].contactId == self.InitAddData[j].contactId&&
                           val[i].addressType == self.InitAddData[j].addressType&&
                           val[i].addressId == self.InitAddData[j].addressId&&
                           val[i].completeAddress == self.InitAddData[j].completeAddress&&
                           val[i].contactPerson == self.InitAddData[j].contactPerson&&
                           val[i].phone == self.InitAddData[j].phone&&
                           val[i].isDefault == self.InitAddData[j].isDefault&&
                           val[i].isDeleted == self.InitAddData[j].isDeleted&&
                           val[i].deletedBy == self.InitAddData[j].deletedBy&&
                           val[i].deletedTime == self.InitAddData[j].deletedTime&&
                           val[i].modifiedBy == self.InitAddData[j].modifiedBy&&
                           val[i].modifiedTime == self.InitAddData[j].modifiedTime&&
                           val[i].createdBy == self.InitAddData[j].createdBy&&
                           val[i].createdTime == self.InitAddData[j].createdTime&&
                           val[i].id == self.InitAddData[j].id){
                               flag = false;
                           }
                    }
                    if(flag){
                        self.redAddAr.push(val[i])
                    }
                }
            },
            deep: true,
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
            allData:'',//保存所有的数据
            getOuId:'',//保存获取的ouid
            ifShow:true,
            radio:'',
            firstModify:false,//进入页面数据改变一次
            ouModify:false,
            ifModify:false,//判断主表是否修改过
            ifDoModify:false,//判断从表是否修改过
            backCancel:'',//判断信息提示确定的点击事件
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
                ouExpandId:[],//默认打开第一个树节点
            //-----------------------

            //---供应商分类树形下拉-----
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
                cuAr:[],//供应商分类下拉框
                cuExpandId:[],//默认打开第一个树节点
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

            //---行政地区树形下拉-----
                areaProArray:[],//行政地区(省)
                areaCityArray:[],//行政地区(市)
                areaDisArray:[],//行政地区(区)
            //-----------------------
            //---从表行政地区树形下拉-----
                areaProArray1:[],//行政地区(省)
                areaCityArray2:[],//行政地区(市)
                areaDisArray3:[],//行政地区(区)

            //-----------------------

            //---业务地区树形下拉-----
                opSearch:'',//树形搜索框的
                selectOpProps:{
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                opItem:{
                    id:'',
                    areaName:'',
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
            propertyAr:[],//供应商性质下拉框
            gradeAr:[],//供应商等级下拉框
            typeAr:[],//供应商类型下拉框
            statusAr:[],//状态下拉框
            curencyAr:[],//币种下拉
            addAr:[],//地址类型下拉
            tranAr:[],//运输方式下拉
            //-----------------------
            //上面的行政地区----------
            proIDT:'',
            cityIdT:'',
            quIdT:'',
            proId:'',
            cityId:'',
            //-----------------------
            activeName: 'bank',//tabs标签页默认激活name
            
            supplier:true,//同为客户

            customerData:'',//根据id获得的供应商信息
            bankData:[],//根据groupId获得银行信息
            addressData:[],//获取的所有地址信息/也可以根据contactId获得地址信息
            ouData:[],//

            updataBankList:[],//需要修改的银行信息
            updataAddressList:[],//需要修改的地址信息
            updataOuList:[],//需要修改的组织信息

            addBankList:[],//需要添加的银行信息
            addAddressList:[],//需要添加的地址信息
            addOuList:[],//需要添加的组织信息
            x:0,
            y:0,
            z:0,
            xrows:[],
            yrows:[],
            zrows:[],

            multipleSelection:[],//需要删除的银行数组
            multipleSelectionAdd:[],//需要删除的地址数组
            multipleSelectionOu:[],//需要删除的组织数组
            allBankDel:{
                ids:[]
            },
            allAddDel:{
                ids:[]
            },
            allOuDel:{
                ids:[]
            },

            idArrayBank:{//银行多项删除的id
                ids:[]
            },
            idArrayAdd:{//地址多项删除的id
                ids:[]
            },
            idArrayOu:{//组织多项删除的id
                ids:[]
            },

            createBankParams:{//创建银行的参数
                "groupId": 1,
                "contactId":'',
                "settlementCurrencyId": '',
                "accountNo": "",
                "accountName": "",
                "openingBank": '',
                "contactPerson": '',
                "phone": '',
                "isDefault": true
            },
            createAddressParams:{//创建地址的参数
                "groupId": 1,
                "contactId": '',
                "addressType": '2',
                "addressId": '3',
                "completeAddress": "",
                "contactPerson": "",
                "phone": "",
                "adAreaLevel1":"",
                "adAreaLevel2":"",
                "adAreaLevel3":"",
                "isDefault": true
            },
            ProIdB:'',
            createOuParams:{//创建组织参数
                "groupId": 1,
                "contactId": '',
                "ouId": '',
                "transport_method_id": '',
                "is_default": true
            },
            checkedAr:[],//进来时数据选中的默认框
            checkedAdd:[],//地址的默认选项
            //---确认删除-----------------               
            dialogDelConfirm:false,//用户删除保存提示信息
            //--------------------  

            //---信息修改提示框------------
            dialogUserConfirm:false,//信息更改提示控制
            //----------------------------
            
            //-----------------------------
            who:'',//删除的是谁以及是否是多项删除
            whoId:'',//单项删除的id
            whoIndex:'',//单项删除的index
            provinceValue:0,
            cityValue:0,
            areaValue:0,
            //-----------------------------
            redBankAr:[],
            redAddAr:[],
            redOuAr:[],

            InitBankData:[],
            InitAddData:[],
            InitOuData:[],
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
            buttonGroup:[{
                text:'返回',
                class:'bt_back',
                icon:'icon-fanhui',
                disabled:false,
            },{
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
                text:'保存',
                class:'bt_save',
                icon:'icon-baocun',
                disabled:true,
            },{
                text:'保存并新增',
                class:'bt_saveAdd',
                icon:'icon-baocunxinzeng',
                disabled:true,
            },{
                text:'取消',
                class:'bt_cancel',
                icon:'icon-quxiao',
                disabled:true,
            }],//按钮组

            buttonGroup1:[{
                text:'增行',
                class:'bt_add',
                icon:'icon-zenghang',
                disabled:false,
            },{
                text:'删除',
                class:'bt_del',
                icon:'icon-shanchu',
                disabled:false,
            },{
                text:'辅助功能',
                class:'bt_auxiliary',
                icon:'icon-fuzhugongneng',
                disabled:false,
            }],

            buttonGroup2:[{
                text:'增行',
                class:'bt_add',
                icon:'icon-zenghang',
                disabled:false,
            },{
                text:'删除',
                class:'bt_del',
                icon:'icon-shanchu',
                disabled:false,
            },{
                text:'辅助功能',
                class:'bt_auxiliary',
                icon:'icon-fuzhugongneng',
                disabled:false,
            }],
            //---dialog---------------
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
        }
    },
    validators: {
        'customerData.ouId': function (value) {//所属组织
            return this.Validator.value(value).required().integer();
        },
        'customerData.contactCode': function (value) {//编码
            return this.Validator.value(value).required().maxLength(50);
        },
        'customerData.contactName': function (value) {//名称
            return this.Validator.value(value).required().maxLength(50);
        },
        'customerData.contactFullName': function (value) {//全称
            return this.Validator.value(value).required().maxLength(50);
        },
        'customerData.mnemonic': function (value) {//助记码
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.contactClassId': function (value) {//供应商分类
            return this.Validator.value(value).required().integer();
        },
        'customerData.contactWorkPropertyId': function (value) {//供应商性质
            return this.Validator.value(value).required().integer();
        },
        'customerData.contactGradeId': function (value) {//供应商等级
            return this.Validator.value(value).integer();
        },
        'customerData.contactTypeId': function (value) {//供应商类型
            return this.Validator.value(value).required().integer();
        },
        'customerData.ficaOuId': function (value) {//对应财务组织
            let self = this;
            if(self.customerData.contactTypeId == 1){
                return this.Validator.value(value).required().integer();
            }
        },
        'customerData.taxCode': function (value) {//纳税登记号 
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.opAreaId': function (value) {//业务地区区号
            return this.Validator.value(value).integer();
        },
        'customerData.adAreaId': function (value) {//行政地区
            return this.Validator.value(value).integer();
        },
        'customerData.legalPerson': function (value) {//法人代表
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.regAddress': function (value) {//注册地址
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.manager': function (value) {//负责人
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.phone': function (value) {//电话
            return this.Validator.value(value).maxLength(50);
        },
        'customerData.remark': function (value) {//备注
            return this.Validator.value(value).maxLength(200);
        },
        'customerData.status': function (value) {//状态
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
            countOp () {
                return this.opItem;
            },
            countYw (){
                return this.ywItem;
            }
        }, 
    methods:{
        //---获取数据--------------------------------------------
        loadData:function(){
            let self = this;
            if(self.$route.params.id!='default'){
                self.firstModify = false;
                // self.firstAddModify = false;
                //根据id获得的供应商信息
                self.$axios.gets('/api/services/app/ContactManagement/GetContactDetailSupplier',{id:self.$route.params.id}).then(function(res){
                    console.log(res)
                    self.allData = res.result;
                    self.customerData = res.result.contact_MainTable;
                    if(self.customerData.isCustomer == 1){
                        self.supplier == true;
                    }else{
                        self.supplier == false;
                    }
                    //console.log(self.customerData)
                    self.getOuId = res.result.ouId;
                    self.createBankParams.contactId = self.$route.params.id;
                    self.createAddressParams.contactId = self.$route.params.id;
                    self.createOuParams.contactId = self.$route.params.id;
                    if(self.customerData.adAreaId_AreaFullPathName){
                        self.proIDT=self.customerData.adAreaId_AreaFullPathName.split(">")[0];
                        self.cityIdT=self.customerData.adAreaId_AreaFullPathName.split(">")[1];
                        self.quIdT=self.customerData.adAreaId_AreaFullPathName.split(">")[2];
                    };
                    if(self.customerData.adAreaId_AreaFullPathId){
                        self.proId=self.customerData.adAreaId_AreaFullPathId.split(">")[0];
                        self.cityId=self.customerData.adAreaId_AreaFullPathId.split(">")[1];
                    };
                    
                    //根据省获得市（主表行政地区）
                    self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:self.proId}).then(function(res){
                        // console.log(res);
                        self.areaCityArray = res.result;
                    },function(res){
                        console.log('err'+res)
                    });

                    //根据市获得区（主表行政地区）
                    self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:self.cityId}).then(function(res){
                        // console.log(res);
                        self.areaDisArray = res.result;
                    },function(res){
                        console.log('err'+res)
                    });

                    //审计信息时间
                    self.customerData.createdTime=self.resdatetime(new Date(self.customerData.createdTime));
                    self.customerData.modifiedTime=self.resdatetime(new Date(self.customerData.modifiedTime));
                    //银行数据
                    self.bankData = res.result.contactBanks_ChildTable;
                    console.log(self.bankData);
                    self.InitBankData = self.deepCopy(res.result.contactBanks_ChildTable);
                    for(let i in self.bankData){
                        if(self.bankData[i].isDefault == true){
                            self.checkedAr = self.bankData[i]
                        }
                    }
                    //地址数据
                    self.addressData = res.result.contactAddresses_ChildTable;
                    self.InitAddData = self.deepCopy(res.result.contactAddresses_ChildTable);
                    for(let i in self.addressData){
                        if(self.addressData[i].isDefault == true){
                            self.checkedAdd = self.addressData[i]
                        }
                    }     
                    //加载使用组织数据
                    //self.ouData = res.result.contactOu_ChildTable;
                    if(res.result.contactOu_ChildTable.length!=0){
                        $.each(res.result.contactOu_ChildTable,function(index,value){
                              let ss={
                                    groupId:'',
                                    id:'',
                                    ouFullname:"",
                                    ouFullpathId:"",
                                    ouFullpathName:"",
                                    ouName:"",
                                    ouParentid:'',
                                    transportMethodId:'',
                                    contactId:'',
                                    delid:''
                                }
                                self.showPageTableOu.push(ss)
                                self.showPageTableOu[index].groupId=value.groupId;
                                self.showPageTableOu[index].id=value.ouId;
                                self.showPageTableOu[index].delid=value.id;
                                self.showPageTableOu[index].transportMethodId=value.transportMethodId;
                                self.showPageTableOu[index].contactId=value.contactId;
                            self.$axios.gets('/api/services/app/OuManagement/Get',{id:value.ouId})
                            .then(function(res){
                                self.showPageTableOu[index].ouFullname=res.result.ouFullname;
                                self.showPageTableOu[index].ouName=res.result.ouName;
                                
                            },function(res){
                            })
                        })
                    }
                    //self.showPageTableOu = res.result.contactOu_ChildTable;
                    //console.log(self.ouData)
                    self.InitOuData = self.deepCopy(res.result.contactOu_ChildTable);
                    self.ywItem.id = res.result.contactOu_ChildTable.ouId;
                    self.ywItem.ouName = res.result.contactOu_ChildTable.ouId_OuName;
                    //业务组织、2是业务组织
                    self.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:'2'}).then(function(res){
                        console.log(res);
                        self.ywAr = res.result;
                    },function(res){
                        console.log('err'+res)
                    });    


                    //行政地区获取省
                    self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                        //console.log(res);
                        self.areaProArray = res.result;
                        self.areaProArray1=res.result;
                        //console.log(self.areaProArray)
                        // self.loadIcon();
                    },function(res){
                        console.log('err'+res)
                    });        

                    //送货地址行政地区获取区
                    self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentName:self.addressData.adAreaLevel2}).then(function(res){
                        //console.log(res);
                        self.areaDisArray3=res.result;
                        //console.log(self.areaProArray)
                        // self.loadIcon();
                    },function(res){
                        console.log('err'+res)
                    });   
                    
                    //业务地区
                    console.log(res.result.ouId)
                    self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:res.result.contact_MainTable.ouId}).then(function(res){
                        console.log(res);
                        self.opAr = res.result;
                        self.expandOpId=self.defauleExpandTree(res.result,'id')
                    },function(res){
                        console.log('err'+res)
                    });

                    //加载完成拿回的下拉框的默认值
                    self.ouItem.ouFullname = self.customerData.ouId_OuName;
                    self.ouItem.id =  self.customerData.ouId;

                    self.cuItem.id = self.customerData.contactClassId;
                    self.cuItem.cuName = self.customerData.contactClassId_ClassName;

                    // self.adItem.areaName = self.customerData.adAreaId_AreaName;
                    // self.adItem.id = self.customerData.adAreaId;

                    self.opItem.areaName = self.customerData.opAreaId_AreaName;
                    self.opItem.id = self.customerData.opAreaId;

                    self.fiItem.fiFullname = self.customerData.ficaOuId_OuName;
                    self.fiItem.id = self.customerData.ficaOuId;
                })        

            }
        },
        createFilter(queryString) {
            return (areaPro) => {     
            return (areaPro.areaName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        selectCityData(name){
            console.log(name)
            let self=this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentName:name.adAreaLevel1}).then(function(res){
                
                console.log(res);
                self.areaCityArray2=res.result;
                //console.log(self.areaProArray)
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });            
        },
        selectDisData(name){
            let self=this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentName:name.adAreaLevel2}).then(function(res){
                console.log(res);
                self.areaDisArray3=res.result;
                //console.log(self.areaProArray)
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });  

        },
        handleSelectCity(item) {
            this.chooseCity(item.id)
        }, 
        querySearchDis(queryString,cb) {
            let _this=this;
            var results = _this.areaDisArray3;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },    
        handleSelectDis(item) {
            //console.log(item.id);
        },            

        resdatetime:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
        },        
     
        //------------------------------------------------------

        //---下拉的数据------------------------------------------
        loadSelect:function(){
            let self = this;
            //供应商分类
            self.$axios.gets('/api/services/app/ContactClassManagement/GetTreeList',{Ower:1}).then(function(res){
                console.log(res);
                self.cuAr = res;
                self.cuExpandId=self.defauleExpandTree(res,'id')
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            //所属组织
            self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                console.log(res);
                self.ouAr = res;
                self.ouExpandId=self.defauleExpandTree(res.result,'id')
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            //对应财务组织
            self.$axios.gets('/api/services/app/OuManagement/GetTreeWithOuType',{ouType:3}).then(function(res){
                // console.log(res);
                self.fiAr = res.result;
                self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            
            //供应商性质
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerWorkProperty'}).then(function(res){
                // console.log(res);
                self.propertyAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //供应商等级SupplierGrade 
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'SupplierGrade'}).then(function(res){
                console.log(res);
                self.gradeAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //供应商类型
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'CustomerType'}).then(function(res){
                // console.log(res);
                self.typeAr = res.result;
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
            

        },

            
        //---选择省市区-----------------------------------------------
        chooseProvinceT:function(res){
            let self = this;
            console.log(res)
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:res}).then(function(res){
                // console.log(res);
                self.areaCityArray = res.result;
                self.cityIdT = '';
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
            //console.log(res)
            let self = this;
            self.customerData.adAreaId=res;
            // console.log(self.createRepositoryParams.stock_MainTable.adAreaId)
        },
        //-----------------------------------------------------------
        //送货地址选择省市区-----------------------------------------
        chooseProvince:function(name){
            let self = this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentName:name.adAreaLevel1}).then(function(res){
                // console.log(res);
                self.areaCityArray2 = res.result;
                console.log(name,self.addressData)
                $.each(self.addressData,function(i,val){
                    if(val.id==name.id){
                        self.addressData[i].adAreaLevel2='';
                        self.addressData[i].adAreaLevel3='';   
                    }
                })
             
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });

        },
        chooseCity:function(name){
            let self = this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentName:name.adAreaLevel2}).then(function(res){
                // console.log(res);
                self.areaDisArray3 = res.result;
                $.each(self.addressData,function(i,val){
                    if(val.id==name.id){
                        self.addressData[i].adAreaLevel3='';   
                    }
                })                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            })
        },
        chooseDis:function(res){
            //console.log(res)
            let self = this;
            self.customerData.adAreaId=res;
            // console.log(self.createRepositoryParams.stock_MainTable.adAreaId)
        },        

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
        filterNode(value, data) {
            // console.log(data)
            if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
        },

        getAllOulength(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{SkipCount:0,MaxResultCount:1})
            .then(function(res){
                _this.allOuLength=res.result.totalCount
                console.log(res)
            })
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
               _this.$refs.fptree.setCheckedNodes(_this.showPageTableOu);
               _this.isCheckAllOu()
            },200)
            
        },
        ouNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            console.log(data)
            _this.addOu=data.id;
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
            _this.ifModify = true;

            _this.ouCheckAll=_this.$refs.fptree.getCheckedNodes();
            let dialogSuredata=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)//dialog点击确认后获取的数据
            $.each(dialogSuredata,function(index,value){
                $.each(_this.showPageTableOu,function(i,val){
                    if(val.id==value.id){
                        value.contactId=_this.$route.params.id; 
                        value.transportMethodId=val.transportMethodId;
                        value.delid=val.delid;
                        console.log(index)
                        //delete dialogSuredata[index] 
                    }else{
                         //_this.showPageTableOu.push(value);
                    }
                })
               
            }) 

            _this.showPageTableOu=dialogSuredata;
            $.each(_this.showPageTableOu,function(i,val){
                    if(val.delid){
                        //console.log(val.delid)
                    }else{
                        val.delid=0;
                        val.contactId=_this.$route.params.id;                        
                    }
            })
        },
        delCheckOu(row){//删除表格数据
            let _this=this;
            let indexs=null;
            console.log(_this.showPageTableOu,row.id)
            $.each(_this.showPageTableOu,function(index,val){
                if(val.id==row.id){
                    indexs=index;
                    _this.ouindex=val.delid;
                    _this.idArrayOu.ids.push(val.delid)
                    console.log(val.delid)
                }
            })
            if(indexs!=null){
                
                _this.showPageTableOu.splice(indexs,1);
                _this.oudel=true;
            }
             //_this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
        }, 
        CheckAllTree(){//全选
            let _this=this;
            let topNode=[];
            if(_this.checkAllOu){
                console.log(_this.checkAllOu)
                // $.each(_this.ouTreeDataRight,function(index,val){
                //     topNode.push(val)
                // })
                console.log(_this.ouTreeDataRight)
                _this.$refs.fptree.setCheckedNodes(_this.ouTreeDataRight);
                 $('.el-tree-node__content').each(function(){
                    $(this).css('display','block')
                })
            }else{
                // _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
                console.log(_this.checkAllOu)
                _this.$refs.fptree.setCheckedNodes([])
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


        cuFilterNode(value,data){
            if (!value) return true;
                return data.className.indexOf(value) !== -1;
        },
        ouFilterNode(value,data){
            if (!value) return true;
                return data.ouFullname.indexOf(value) !== -1;
        },
        opFilterNode(value,data){
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
        renderContentCu(h, { node, data, store }){//供应商分类
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
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
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
            self.cuItem.cuName = data.className;
            self.$nextTick(function(){
                $('#cu_confirmSelect').click()
            })
        },

        ouNodeClick:function(data){
            let self = this;
            console.log(data)
            self.customerData.opAreaId = '';
            self.opItem.areaName = '';

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
                    self.loadIcon();
                }else{
                    self.opItem.areaName = '暂无业务地区';
                    self.opItem.id = '';
                    self.opAr = [];
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
        opNodeClick:function(data){
            let self = this;
            self.opItem.id = data.id;
            self.opItem.areaName = data.areaName;
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

        //---保存、修改数据---------------------------------------------
        saveModify:function(){
            let self = this;
            if(self.ifModify){
                self.saveCustomerModify();
            }
        },
        saveCustomerModify:function(){//修改所有
            let self = this;
            $('.tipsWrapper').css({display:'block'});
            //console.log(self.customerData)
            self.$validate().then(function(success){
               
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    $.each(self.showPageTableOu,function(index,value){
                            let oudetail={
                                "id": 0,
                                "contactId": 0,
                                "ouId": '',
                                "transportMethodId": '',
                                "isDefault": true
                            }
                            oudetail.contactId=value.contactId;
                            self.ouData.push(oudetail);
                            if(value.transportMethodId!=''||value.transportMethodId!=undefined){
                                self.ouData[index].transportMethodId=value.transportMethodId;
                                self.ouData[index].id=value.delid;                              
                            }else{
                                self.ouData[index].transportMethodId='';
                            }
                            self.ouData[index].ouId=value.id;

                    })
                    let submitData = {};
                    submitData = {
                        contact_MainTable:self.customerData,
                        contactBanks_ChildTable:self.bankData,
                        contactAddress_ChildTable:self.addressData,
                        contactOu_ChildTable:self.ouData,
                    }
                    console.log(submitData)
                    self.$axios.posts('/api/services/app/ContactManagement/AggregateCreate',submitData).then(function(res){
                        self.open('修改成功','el-icon-circle-check','successERP');
                        self.ifModify = false;
                        self.redBankAr = [];
                        self.redOuAr = [];
                        self.redAddAr = [];
                    },function(err){
                        self.dialogVisible=true;
                        self.dialogSetting.dialogName='cancelDialog'
                        self.dialogSetting.message=err.error.message;
                        self.dialogSetting.dialogType="submit";
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                
                    })
                    // self.sureDel();
                }
            });
            
        },
        saveAdd(){//保存并新增
            let self = this;
            $('.tipsWrapper').css({display:'block'});
            //console.log(self.customerData)
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'});
                    $.each(self.showPageTableOu,function(index,value){
                            let oudetail={
                                "id": 0,
                                "contactId": 0,
                                "ouId": '',
                                "transportMethodId": '',
                                "isDefault": true
                            }
                            oudetail.contactId=value.contactId;
                            self.ouData.push(oudetail);
                            if(value.transportMethodId!=''||value.transportMethodId!=undefined){
                                self.ouData[index].transportMethodId=value.transportMethodId;
                                self.ouData[index].id=value.delid;                              
                            }else{
                                self.ouData[index].transportMethodId='';
                            }
                            self.ouData[index].ouId=value.id;
                    })
                    let submitData = {};
                    submitData = {
                        contact_MainTable:self.customerData,
                        contactBanks_ChildTable:self.bankData,
                        contactAddress_ChildTable:self.addressData,
                        contactOu_ChildTable:self.ouData,
                    }
                    self.$axios.posts('/api/services/app/ContactManagement/AggregateCreate',submitData).then(function(res){
                        self.open('修改成功','el-icon-circle-check','successERP');
                        self.$store.state.url='/customer/customerDetail/default'
                        self.$router.push({path:self.$store.state.url})//点击切换路由
                        self.ifModify = false;
                    },function(res){
                        self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.errorMessage=true;
                    })
                    self.sureDel();
                }
            });


        },
        //-------------------------------------------------------

        //---从表增行--------------------------------------------
        addColbank:function(){//银行增行
            let self = this;
                self.x++;
                let newCol = 'newCol'+self.x;
                self.xrows.newCol ={
                    "groupId": 1,
                    "contactId":self.createBankParams.contactId,
                    "settlementCurrencyId": '',
                    "accountNo": "",
                    "accountName": "",
                    "openingBank": '',
                    "contactPerson": '',
                    "phone": '',
                    "isDefault": false
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
            self.addressData.unshift(self.yrows.newCol)
            self.addAddressList.unshift(self.yrows.newCol)
        },

        addColOu:function(){//组织增行
            let self = this;
            self.z++;
            let newCol = 'newCol'+self.z;
            self.zrows.newCol ={
                "groupId": 1,
                "contactId": self.createOuParams.contactId,
                "ouId": '',
                "transport_method_id": '',
                "is_default": false
            };
            self.ouData.unshift(self.zrows.newCol)
            self.addOuList.unshift(self.zrows.newCol)
        },  
        //---------------------------------------------------

        //---从表修改-----------------------------------------
        handleBankChange:function(index,row){//银行修改
            // console.log(index)
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
        handleAddressChange:function(index,row){//地址修改
            let self = this;
            let flag = false;
            self.ifDoModify = true;
            if(self.updataAddressList.length==0){
                flag = true;
            }else if(self.updataAddressList.length>=1){
                for(let i in self.updataAddressList){
                    if(row.id != self.updataAddressList[i].id){
                        flag = true;
                        // console.log(flag) 
                    }else{
                        flag= false;
                        break;        
                    }
                }
            };

            if(flag){
                self.updataAddressList.push(row);
                // console.log(self.updataAddressList)
            }
        },
        handleOuChange:function(index,row){//使用组织修改
            let self = this;
            let flag = false;
            self.ifDoModify = true;
            if(self.updataOuList.length==0){
                flag = true;
            }else if(self.updataOuList.length>=1){
                for(let i in self.updataOuList){
                    if(row.id != self.updataOuList[i].id){
                        flag = true;
                        // console.log(flag) 
                    }else{
                        flag= false;
                        break;        
                    }
                }
            };

            if(flag){
                self.updataOuList.push(row);
                // console.log(self.updataOuList)
            }
        },
        //---------------------------------------------------

        //---从表默认单选框-----------------------------------
        getCurrentRow:function(index,row){//银行默认单选框
            let self = this;
            for(let i in self.bankData){
                self.bankData[i].isDefault = false;
            }
            self.bankData[index].isDefault = true;
            self.updataBankList.push(self.checkedAr)
            
        },
        //---------------------------------------------------

        //---从表复选框---------------------------------------
        handleSelectionChange:function(val){//点击复选框选中的数据
                this.multipleSelection = val;
                console.log(this.multipleSelection)
        },
        handleSelectionChange2:function(val){//点击复选框选中的数据
                this.multipleSelectionAdd = val;
                console.log(this.multipleSelectionAdd)
        },
        handleSelectionChange3:function(val){//点击复选框选中的数据
                this.multipleSelectionOu = val;
                console.log(this.multipleSelectionOu)
        },
        //---------------------------------------------------

        //---从表单项删除-------------------------------------

        handleDelete:function(index,row,who){    
            let self = this;
            self.who = who;
            self.whoIndex = index;
            self.whoId = row.id;
            //self.dialogDelConfirm = true;
            if(self.who == 1){//银行单项删除
                if(self.whoId>0){
                    self.bankData.splice(self.whoIndex,1);
                }else{
                    self.bankData.splice(self.whoIndex,1);
                    self.addBankList.splice(self.whoIndex,1);
                }            
            }else if(self.who == 2){//地址单项删除
            
                if(self.whoId>0){
                        self.addressData.splice(self.whoIndex,1);                       
                }else{
                    self.addressData.splice(self.whoIndex,1);
                    self.addAddressList.splice(self.whoIndex,1);
                }
            }else if(self.who == 3){//使用组织单项删除
                if(self.whoId>0){
                        self.ouData.splice(self.whoIndex,1);
                }else{
                    self.ouData.splice(self.whoIndex,1);
                    self.addOuList.splice(self.whoIndex,1);
                }

            }
        },
        //---------------------------------------------------

        //---确认删除-----------------------------------------
        // sureDel:function(){
        //     let self = this;
        //     console.log(self.who)
        //     if(self.who == 1){//银行单项删除
        //         if(self.whoId>0){
        //             self.$axios.deletes('/api/services/app/ContactBankManagement/Delete',{id:self.whoId}).then(function(res){
        //                 console.log(self.dialogDelConfirm)
        //             },function(res){
        //                 self.dialogSetting.dialogType="submit";
        //                 self.dialogSetting.dialogName='saveDialog'
        //                 self.dialogSetting.message="信息提报有误";
        //                 self.errorTips.message=res.error.message;
        //                 self.errorTips.details='';
        //                 self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
        //                 self.dialogVisible=true;
        //             })
        //         }else{
                    
        //         }
        //     }

        //     if(self.who == 2){//地址单项删除
        //         if(self.whoId>0){
        //             self.$axios.deletes('/api/services/app/ContactAddressManagement/Delete',{id:self.whoId}).then(function(res){
        //                 // self.open('删除地址资料成功','el-icon-circle-check','successERP');
        //                 // self.addressData.splice(self.whoIndex,1);
        //                 //self.dialogDelConfirm = false;
        //             },function(res){
        //                 //self.open('删除地址资料失败','el-icon-error','faildERP');
        //                 //self.dialogDelConfirm = false;
        //                 self.errorMessage=true;
        //                 self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        
        //             })
        //         }else{
        //             //self.addressData.splice(self.whoIndex,1);
        //             //self.addAddressList.splice(self.whoIndex,1);
        //             //self.dialogDelConfirm = false;
        //             //self.open('删除新增行成功','el-icon-circle-check','successERP');
        //         }
        //     }

        //     if(self.oudel==true){//使用组织单项删除
        //     //console.log(self.idArrayOu.ids)
        //         if(self.idArrayOu.ids.length==1){
        //             console.log(self.ouindex)
        //             self.$axios.deletes('/api/services/app/ContactOuManagement/Delete',{id:self.ouindex}).then(function(res){
        //                 //self.open('删除使用组织成功','el-icon-circle-check','successERP');
        //                 // self.ouData.splice(self.whoIndex,1);
        //                 // self.dialogDelConfirm = false;
        //             },function(res){
        //                 // self.dialogDelConfirm = false;
        //                 self.errorMessage=true;
        //                 self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //             })
        //         }
        //         if(self.idArrayOu.ids.length>1){
        //             console.log(self.idArrayOu)
        //             self.$axios.posts('/api/services/app/ContactOuManagement/BatchDelete',self.idArrayOu).then(function(res){
        //                 //self.open('删除使用组织成功','el-icon-circle-check','successERP');
        //                 // self.loadOuData();
        //                 //self.dialogDelConfirm = false;
        //             },function(res){
        //                 //self.dialogDelConfirm = false;
        //                 self.errorMessage = true;
        //                 self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //             })                      
        //         }
        //     }

        //     if(self.who == 4){//银行多项删除  
        //         // let x = [];
        //         // $.each(self.bankData,function(index,value){
        //         //     let flag = false;
        //         //     $.each(self.multipleSelection,function(i,val){
        //         //         if(value==val){
        //         //             flag = true;
        //         //         }
        //         //     })
        //         //     if(!flag){
        //         //         x.push(value)
        //         //     }
        //         // })
        //         // self.bankData = x;
        //         // self.addBankList = [];
        //         // for(let i in x){
        //         //     if(x[i].id==''||x[i].id==undefined){
        //         //         // console.log(x[i])
        //         //         self.addBankList.push(x[i])
        //         //         console.log(self.addBankList)
        //         //     }
        //         // }
        //         self.$axios.posts('/api/services/app/ContactBankManagement/BatchDelete',self.idArrayBank).then(function(res){
        //             //self.open('删除银行资料成功','el-icon-circle-check','successERP');
        //             // self.loadBankData();
        //             //self.dialogDelConfirm = false;
        //         },function(res){
        //             // self.dialogDelConfirm = false;
        //             self.errorMessage = true;
        //             self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //         })    
        //     }

        //     if(self.who == 5){//地址多项删除
        //         // let x = [];
        //         // $.each(self.addressData,function(index,value){
        //         //     let flag = false;
        //         //     $.each(self.multipleSelectionAdd,function(i,val){
        //         //         if(value==val){
        //         //             flag = true;
        //         //         }
        //         //     })
        //         //     if(!flag){
        //         //         x.push(value)
        //         //     }
        //         // })
        //         // self.addressData = x;
        //         // self.addAddressList = [];
        //         // for(let i in x){
        //         //     if(x[i].id==''||x[i].id==undefined){
        //         //         // console.log(x[i])
        //         //         self.addAddressList.push(x[i])
        //         //         console.log(self.addAddressList)
        //         //     }
        //         // }  
        //         self.$axios.posts('/api/services/app/ContactAddressManagement/BatchDelete',self.idArrayAdd).then(function(res){
        //             //self.open('删除地址成功','el-icon-circle-check','successERP');
        //             // self.loadAddData();
        //             self.dialogDelConfirm = false;
        //         },function(res){
        //             self.dialogDelConfirm = false;
        //             self.errorMessage = true;
        //             self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //         })    
        //     }

        //     if(self.who == 6){//使用组织多项删除 
        //         // let x = [];
        //         // $.each(self.ouData,function(index,value){
        //         //     let flag = false;
        //         //     $.each(self.multipleSelectionOu,function(i,val){
        //         //         if(value==val){
        //         //             flag = true;
        //         //         }
        //         //     })
        //         //     if(!flag){
        //         //         x.push(value)
        //         //     }
        //         // })
        //         // self.ouData = x;
        //         // self.addOuList = [];
        //         // for(let i in x){
        //         //     if(x[i].id==''||x[i].id==undefined){
        //         //         // console.log(x[i])
        //         //         self.addOuList.push(x[i])
        //         //         console.log(self.addOuList)
        //         //     }
        //         // }  
        //         self.$axios.posts('/api/services/app/ContactOuManagement/BatchDelete',self.idArrayOu).then(function(res){
        //             //self.open('删除使用组织成功','el-icon-circle-check','successERP');
        //             // self.loadOuData();
        //             //self.dialogDelConfirm = false;
        //         },function(res){
        //             //self.dialogDelConfirm = false;
        //             self.errorMessage = true;
        //             self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
        //         })    
        //     }


        // },
        //---------------------------------------------------
        
        
        //---从表多项删除---------------------------------------------
        delMoreBank:function(){//银行多项删除
            let self = this;
            console.log(self.multipleSelection)
            for(let i in self.multipleSelection){
                self.allBankDel.ids.push(self.multipleSelection[i].id)
            }
            for(let i in self.multipleSelection){
                if(self.multipleSelection[i].id>0){
                    self.idArrayBank.ids.push(self.multipleSelection[i].id)
                }
            }
            if(self.allBankDel.ids.length>0){
                //self.dialogDelConfirm = true;   
                // self.who = num;
                // if(self.who == 4){
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
                // }

            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
            
        },

        delMoreAdd:function(){
            let self = this;
            for(let i in self.multipleSelectionAdd){
                self.allAddDel.ids.push(self.multipleSelectionAdd[i].id)
            }
            for(let i in self.multipleSelectionAdd){
                if(self.multipleSelectionAdd[i].id>0){
                    self.idArrayAdd.ids.push(self.multipleSelectionAdd[i].id)
                }
            }
            if(self.allAddDel.ids.length>0){
                //self.dialogDelConfirm = true;   
                // self.who = num;
                // if(self.who == 5){//地址多项删除
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
                // }  
                
            }else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
        },
        
        delSupplie:function(){//删除此页供应商资料
            let self = this;
            // self.who = num;
            self.dialogVisible = true;  
            self.dialogSetting.dialogType="confirm";
            self.dialogSetting.dialogName='delDialog'
            self.dialogSetting.message="确定删除？";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        },
        //-----------------------------------------------------------

        //---路由------open------------------------------------------
        back(){//点击新增跳转
            this.$store.state.url='/supplier/supplierList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){//点击新增跳转
            this.$store.state.url='/supplier/supplierDetail/default'
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
        //------------------------------------------------------

        //---修改返回提示-----------------------------------------
        isBack(){
            let self=this;
            if(self.ifModify){
                self.dialogSetting.dialogName='backDialog'
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
                self.dialogSetting.dialogName='cancelDialog'
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
            // $('.tipsWrapper').css({display:'none'})
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
            var type = self.getType(data);
            var obj;
            if(type === 'array'){
                obj = [];
            } else if(type === 'object'){
                obj = {};
            } else {
                //不再具有下一层次
                return data;
            }
            if(type === 'array'){
                for(var i = 0, len = data.length; i < len; i++){
                    obj.push(self.deepCopy(data[i]));
                }
            } else if(type === 'object'){
                for(var key in data){
                    obj[key] = self.deepCopy(data[key]);
                }
            }
            return obj;
        },
        //----------------------------------------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){
                self.isBack();
            }else if(btn=="新增"){
                self.goDetail();
            }else if(btn=="删除"){
                self.delSupplie()
            }else if(btn=="保存"){
                self.saveModify();
            }else if(btn=="保存并新增"){
                self.saveAdd();
            }else if(btn=="取消"){
                self.Cancel(2);
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
        btnClick2(btn){//从表按钮组点击事件
            let self = this;
            if(btn=="增行"){
                self.addColAddress();
            }else if(btn=="删除"){
                self.delMoreAdd();
            }else if(btn=="辅助功能"){
                
            }
        },
        //----------------------------------------------------
        
        dialogClick(parmas){
            let self = this;
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    self.$axios.deletes('/api/services/app/ContactManagement/Delete',{id:self.$route.params.id}).then(function(res){
                        self.open('删除成功','el-icon-circle-check','successERP');
                        self.back();
                    },function(res){
                        // self.dialogVisible=true;
                        self.dialogSetting.dialogType="confirm";
                        self.dialogSetting.dialogName='delErrDialog'
                        self.dialogSetting.message="删除失败";
                        self.errorTips.message=res.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                    }) 
                    // self.dialogVisible=false;
                }else if(parmas.dialogName=="backDialog"){//返回
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){//保存
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="cancelDialog"){
                    this.dialogVisible=false;
                    this.sureDoing();
                }else if(parmas.dialogName=="delErrDialog"){//
                    this.dialogVisible=false;
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }
        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
        //----------------------------------------------------
        test:function(){
            let self = this;
            console.log(self.checkedAr)
            console.log(self.addBankList)
            console.log(self.updataBankList)
        },
    }
       

    })
  </script>

  <style>
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
    text-align: left;
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
    padding-left:0px;
    padding-right:0px;
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
    /* border-color:white !important; */
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
.supplier-modify .area{
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
  </style>
  
