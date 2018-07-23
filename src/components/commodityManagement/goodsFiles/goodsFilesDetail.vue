<template>
 <div class="goodsFilesDetail">
     <el-row class="fixed">
        <div class="btnGroup-box">
            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
        </div>
     </el-row>
<el-row class="nopadding elRow" >  
    <div class="tabZoo">   
<el-tabs v-model="activeName_first">    
    <el-tab-pane label="编辑商品" name="editGoods">                    
        <el-row class="elRow">
         <div class="tipsWrapper">
                    <div class="errorTips">
                        <p class="msgDetail">错误提示：
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.categoryId')}">
                            类目{{ validation.firstError('product_MainTable.categoryId') }},
                            </span>

                            <span 
                            :class="{block : !validation.hasError('product_MainTable.productCode')}">
                            商品编码{{ validation.firstError('product_MainTable.productCode') }},
                            </span>
                           <span 
                            :class="{block : !validation.hasError('product_MainTable.productName')}">
                            商品名称{{ validation.firstError('product_MainTable.productName') }},
                            </span>
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.brandId')}">
                            品牌{{ validation.firstError('product_MainTable.brandId') }}
                            </span>
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.unitId')}">
                            单位{{ validation.firstError('product_MainTable.unitId') }}
                            </span>
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.barcode')}">
                            商品条码{{ validation.firstError('product_MainTable.barcode') }},
                            </span>
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.mnemonic')}">
                            助记码{{ validation.firstError('product_MainTable.mnemonic') }},
                            </span> 
                             <span 
                            :class="{block : !validation.hasError('product_MainTable.saleDate')}">
                            上市时间{{ validation.firstError('product_MainTable.saleDate') }},
                            </span> 
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.remark')}">
                            备注{{ validation.firstError('product_MainTable.remark') }},
                            </span> 
                            <span 
                            :class="{block : !validation.hasError('product_MainTable.validDays')}">
                            保质天数{{ validation.firstError('product_MainTable.validDays') }},
                            </span>      
                        </p>
                    </div>
                </div>
  
         <el-col :span="24" class="getPadding">
            <div class="bgcolor" style="margin-bottom:0">
                <label><small>*</small>类目</label>
                <el-select clearable filterable  class="categoryId"
                @focus="showErrprTips"
                @change="changeCategoryId"
                :class="{redBorder : validation.hasError('product_MainTable.categoryId')}"
                placeholder=""
                v-model="product_MainTable.categoryId">
                    <el-input
                    placeholder="搜索..."
                    class="selectSearch"
                    v-model="search_categoryId">
                    </el-input>
                    <el-tree
                    :default-expanded-keys="expand_categoryId"
                    :render-content="renderContent_categoryId"
                    :data="selectTree_categoryId"
                    :highlight-current="true"
                    :props="selectProps_categoryId"
                    node-key="id"
                    ref="tree"
                    :filter-node-method="filterNode_categoryId"
                    :expand-on-click-node="false"
                    @node-click="nodeClick_categoryId"
                    >
                    </el-tree>
                    <el-option class="select_tree_option" :key="item_categoryId.id" :label="item_categoryId.categoryName" :value="item_categoryId.id">
                    </el-option>
                    <!-- <el-option v-show="false" v-for="item in selectData.ou" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id"> -->
                </el-select>
            </div>
         </el-col>
     </el-row>
 <!-- <el-collapse-transition>
     <div v-show="ifShow"> -->
        <el-row class="elRow">
            <el-col :span="24" class="getPadding">
                <div class="bgcolor" >
                    <label><small>*</small>商品编码</label>
                    <el-input class="productCode" 
                     @focus="showErrprTips"
                     :disabled="!isCategoryIdEmpty"
                    :class="{redBorder : validation.hasError('product_MainTable.productCode')}"
                    v-model="product_MainTable.productCode">
                    </el-input>
                </div>
                <div class="bgcolor">
                    <label><small>*</small>商品名称</label>
                    <el-input class="productName"
                    :disabled="!isCategoryIdEmpty"
                    @focus="showErrprTips"
                    :class="{redBorder : validation.hasError('product_MainTable.productName')}"
                     v-model="product_MainTable.productName" >
                     </el-input>
                </div>
                <div class="bgcolor">
                    <label>品牌</label>
                    <el-select clearable class="brandId"
                    :disabled="!isCategoryIdEmpty"
                    filterable
                    @focus="showErrprTips"
                    :class="{redBorder : validation.hasError('product_MainTable.brandId')}"
                    placeholder=""
                    v-model="product_MainTable.brandId"
                    :filter-method="filterMethod">
                        <el-option 
                        v-for="item in brand" 
                        :key="item.id" 
                        :label="item.brandName" 
                        :value="item.id">
                        <span>{{item.brandName}}</span>
                        <span>{{item.brandCode}}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor">
                    <label><small>*</small>单位</label>
                    <el-select clearable class="unitId"
                    :disabled="!isCategoryIdEmpty"
                    @change="getMoreUnitList"
                    @focus="showErrprTips"
                    :class="{redBorder : validation.hasError('product_MainTable.unitId')}"
                    placeholder=""
                    v-model="product_MainTable.unitId">
                        <el-input
                        placeholder="搜索..."
                        class="selectSearch"
                        v-model="search_unitId">
                        </el-input>
                        <el-tree
                        :default-expanded-keys="expand_unitId"
                        :render-content="renderContent_unitId"
                        :data="selectTree_unitId"
                        :highlight-current="true"
                        :props="selectProps_unitId"
                        node-key="id"
                        ref="tree"
                        :filter-node-method="filterNode_unitId"
                        :expand-on-click-node="false"
                        @node-click="nodeClick_unitId"
                        >
                        </el-tree>
                        <el-option class="select_tree_option" :key="item_unitId.id" :label="item_unitId.unitName" :value="item_unitId.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor">
                    <label>商品条码</label>
                     <el-input class="barcode" 
                     @focus="showErrprTips"
                     :disabled="!isCategoryIdEmpty"
                    :class="{redBorder : validation.hasError('product_MainTable.barcode')}"
                    v-model="product_MainTable.barcode">
                    </el-input>
                </div>
                <div class="bgcolor">
                    <label>助记码</label>
                     <el-input class="mnemonic" 
                    @focus="showErrprTips"
                    :disabled="!isCategoryIdEmpty"
                    :class="{redBorder : validation.hasError('product_MainTable.mnemonic')}"
                    v-model="product_MainTable.mnemonic">
                    </el-input>
                </div>
                <div class="bgcolor">
                    <label>上市时间</label>
                    <el-date-picker 
                    :disabled="!isCategoryIdEmpty"
                    @focus="showErrprTips"
                    :class="{redBorder : validation.hasError('product_MainTable.saleDate')}"
                    class="saleDate datepicker" 
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd" 
                    v-model="product_MainTable.saleDate" 
                    type="date" 
                    ></el-date-picker>
                </div>
                <el-col :span="24">
                    <div class="bgcolor longWidth">
                        <label>备注</label>
                        <el-input
                        
                        :disabled="!isCategoryIdEmpty"
                        @focus="showErrprTips"
                        :class="{redBorder : validation.hasError('product_MainTable.remark')}"
                        class="remark1" 
                        v-model="product_MainTable.remark"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        >
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgcolor longWidth">
                        <label></label>
                        <el-checkbox v-if="CategoryData.uniqueCodeMgt" :disabled="!isCategoryIdEmpty" @change="showErrprTips" v-model="product_MainTable.uniqueMgt">唯一码管理</el-checkbox>
                        <el-checkbox v-if="CategoryData.lotMgt" :disabled="!isCategoryIdEmpty" @change="showErrprTips" v-model="product_MainTable.lotMgt">批次管理</el-checkbox>
                        <el-checkbox v-if="CategoryData.validityMgt" :disabled="!isCategoryIdEmpty" @change="showErrprTips" v-model="product_MainTable.validityMgt">保质期管理</el-checkbox>
                    </div>
                    <div class="bgcolor" v-if="product_MainTable.validityMgt">
                        <label>保质天数</label>
                        <el-input class="validDays" 
                        @focus="showErrprTips"
                        :disabled="!isCategoryIdEmpty"
                        :class="{redBorder : validation.hasError('product_MainTable.validDays')}"
                        v-model="product_MainTable.validDays">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgcolor longWidth">
                        <label></label>
                        <el-checkbox :disabled="!isCategoryIdEmpty" @change="showErrprTips" v-model="product_MainTable.multiUnitEnabled">启用多单位</el-checkbox>
                        <el-checkbox :disabled="!isCategoryIdEmpty" @change="showErrprTips" v-model="product_MainTable.isSuite">是否套件</el-checkbox>
                    </div>
                </el-col>
            </el-col> 
        </el-row>
     <!-- </div>    
 </el-collapse-transition>   -->

<el-row class="nopadding elRow" >  
    <div class="tabZoo">
        <el-col :span="24">
            <el-tabs v-model="activeName_one">
<!-- - - - - - - - - - - - - - - - - - - - - - - - 商品价格 - - - - - - - - - - - - - - - - - - - - -  -->
                <el-tab-pane label="商品价格" name="goodsPrice">
                    <el-col :span="24" v-if="!product_MainTable.multiUnitEnabled">
                        <div class="bgcolor ">
                            <label>进货价</label>
                            <el-input 
                            
                            :disabled="!isCategoryIdEmpty"
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('product_MainTable.purchasePrice')}"
                            class="purchasePrice"
                            v-model="product_MainTable.purchasePrice"
                            ></el-input>
                        </div>
                        <div class="bgcolor ">
                            <label>批发价</label>
                            <el-input 
                            
                            :disabled="!isCategoryIdEmpty"
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('product_MainTable.wholePrice')}"
                            class="wholePrice"
                            v-model="product_MainTable.wholePrice"
                            ></el-input>
                        </div>
                        <div class="bgcolor ">
                            <label>会员价</label>
                            <el-input 
                            
                            :disabled="!isCategoryIdEmpty"
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('product_MainTable.vipPrice')}"
                            class="vipPrice"
                            v-model="product_MainTable.vipPrice"
                            ></el-input>
                        </div>
                        <div class="bgcolor ">
                            <label>零售价</label>
                            <el-input 
                            :disabled="!isCategoryIdEmpty"
                            
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('product_MainTable.retailPrice')}"
                            class="retailPrice"
                            v-model="product_MainTable.retailPrice"
                            ></el-input>
                        </div>
                        <div class="bgcolor ">
                            <label>折扣率</label>
                            <el-input 
                            
                            :disabled="!isCategoryIdEmpty"
                            @focus="showErrprTips"
                            :class="{redBorder : validation.hasError('product_MainTable.discount')}"
                            class="discount"
                            v-model="product_MainTable.discount"
                            ></el-input>
                        </div>
                    </el-col>
<!-- - - - - - - - - - - - - - - - - - - - - - - - 多单位 - - - - - - - - - - - - - - - - - - - - -  -->                    
                    <el-col :span="24" v-if="product_MainTable.multiUnitEnabled">
                         <el-table :data="productUnit_ChildTable" border style="width: 100%" stripe>
                            

                            <el-table-column prop="basicUnitName" label="单位类型"></el-table-column>

                            <el-table-column prop="unitName" label="单位">
                                <!-- <template slot-scope="scope">
                                    <span v-if="scope.$index==0">{{scope.row.unitId_UnitName}}</span>
                                    <span v-else>{{scope.row.destUnitId_UnitName}}</span>
                                </template> -->
                            </el-table-column>

                            <el-table-column prop="factor" label="系数"></el-table-column>

                            <el-table-column prop="purchasePrice" label="进货价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.purchasePrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                             <el-table-column prop="retailPrice" label="零售价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.retailPrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                             <el-table-column prop="wholePrice" label="批发价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.wholePrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                             <el-table-column prop="vipPrice" label="会员价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.vipPrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                             <el-table-column prop="discount" label="折扣率">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.discount" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isDefaultPurchase" label="默认采购单位">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isDefaultPurchase" :disabled="!isCategoryIdEmpty" @change="isDefaultChange(scope.row,'isDefaultPurchase',scope.$index)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isDefaultWhole" label="默认批发单位">
                                <template slot-scope="scope">
                                   <el-checkbox v-model="scope.row.isDefaultWhole" :disabled="!isCategoryIdEmpty" @change="isDefaultChange(scope.row,'isDefaultWhole',scope.$index)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isDefaultRetail" label="默认零售单位">
                                <template slot-scope="scope">
                                   <el-checkbox v-model="scope.row.isDefaultRetail" :disabled="!isCategoryIdEmpty" @change="isDefaultChange(scope.row,'isDefaultRetail',scope.$index)"></el-checkbox>
                                </template>
                            </el-table-column>

                        </el-table>     
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
 </el-row>

 <el-row class="nopadding elRow" >  
    <div class="tabZoo">
        <el-col :span="24">
            <el-tabs v-model="activeName_two">
                <el-tab-pane label="商品规格" name="goodsSize">
<!-- - - - - - - - - - - - - - - - - - - - - - - - 商品规格表格 - - - - - - - - - - - - - - - - - - - - -  -->
                        <el-table :data="productSpec_ChildTable" border style="width: 100%" stripe>
                            <el-table-column label="规格编码" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.specName}}</span>
                                    <button class="showGoodsDialog" @click="showGoodsDialog(scope.row)">···</button>
                                </template>
                            </el-table-column>
                            <el-table-column  label="规格组" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.basSpecgroupId_SpecgroupName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="spec" label="规格名称">
                                <template slot-scope="scope">
                                    <span v-for="(i,index) in scope.row.productSpecValue_GrandTable" :key="index" class="sizeNameWrapper">
                                        <span class="delSize" @click="delSize(index,scope.row)">×</span>
                                        <span class="sizeNameBtn">{{i.specValueName}}</span>
                                        <!-- <span class="sizeNameBtn" v-if="scope.row.specGroup.spec=='one'">{{i.specgroupId_SpecgroupName}}</span> -->
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table> 
                        
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
 </el-row>
 <el-row class="nopadding elRow" >  
    <div class="tabZoo">
        <el-col :span="24">
            <el-tabs v-model="activeName_three">
                <el-tab-pane label="SKU" name="SKU">
<!-- - - - - - - - - - - - - - - - - - - - - - - - SKU表格 - - - - - - - - - - - - - - - - - - - - -  -->
                        <!-- <button @click="buildSKU">生成sku</button> -->
                        <el-table :data="sku_ChildTable" border style="width: 100%" stripe v-if="!product_MainTable.multiUnitEnabled">
                            <!-- 未启用多单位 -->
                            <el-table-column prop="skuCode" label="SKU" ></el-table-column>   
                            <el-table-column prop="skuName" label="SKU名称" >
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.skuName" 
                                            type="text"/>
                                </template>
                            </el-table-column>

                            
                            <el-table-column prop="barcode" label="条码">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.barcode" 
                                            type="text"/>
                                </template>
                            </el-table-column>

                            <el-table-column v-for="(item,index) in skuTableHeader" :key="index" :label="item.specId_SpecName">
                                <template slot-scope="scope">
                                    <span v-for="(item1,index1) in scope.row.skuSpecValue_GrandTable" :key="index1" v-if="item.specId==item1.specId">{{item1.specValueName}}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="specId2" label="尺码"></el-table-column>
                            <el-table-column prop="specId3" label="单位"></el-table-column> -->

                            <el-table-column prop="purchasePrice" label="进货价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.purchasePrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="retailPrice" label="零售价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.retailPrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="wholePrice" label="批发价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.wholePrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="vipPrice" label="会员价">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.vipPrice" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="discount" label="折扣率">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.discount" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="允许使用">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isUse" @change="changeIsUse(scope.row)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注">
                                <template slot-scope="scope">
                                     <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.remark" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                     <el-button type="text" @click="delSKU(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table> 
                        <!-- 启用多单位表格 -->
                        <el-table :data="sku_ChildTable" border style="width: 100%" stripe v-if="product_MainTable.multiUnitEnabled">
                            
                            <el-table-column prop="skuCode" label="SKU"></el-table-column>   
                            <el-table-column prop="skuName" label="SKU名称">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.skuName" 
                                            type="text"/>
                                </template>
                            </el-table-column>

                            
                            <el-table-column prop="barcode" label="条码">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.barcode" 
                                            type="text"/>
                                </template>
                            </el-table-column>

                            <el-table-column v-for="(item,index) in skuTableHeader" :key="index" :label="item.specId_SpecName">
                                <template slot-scope="scope">
                                    <span v-for="(item1,index1) in scope.row.skuSpecValue_GrandTable" :key="index1" v-if="item.specId==item1.specId">{{item1.specValueName}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column prop="status" label="允许使用">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.isUse" @change="changeIsUse(scope.row)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注">
                                <template slot-scope="scope">
                                     <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.remark" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                        </el-table> 
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </div>
 </el-row>
 <el-row class="elRow">
    <el-col :span="24" class="getPadding">
        <h4 class="h4">审计信息</h4>
        <div>
            <div class="bgcolor"><label>创建人</label><el-input v-model="auditInfo.createdBy" disabled></el-input></div>
            <div class="bgcolor">
                <label>创建时间</label>
                <el-date-picker
                v-model="auditInfo.createdTime"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" 
                disabled
                placeholder="">
                </el-date-picker>
            </div>
            <div class="bgcolor"><label>修改人</label><el-input  v-model="auditInfo.modifiedBy" disabled></el-input></div>
            <div class="bgcolor">
                <label>修改时间</label>
                <el-date-picker
                v-model="auditInfo.modifiedTime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                disabled
                placeholder="">
                </el-date-picker>
            </div>
        </div>                                  
    </el-col>
</el-row>
</el-tab-pane>
<!-- - - - - - - - - - - - - - - - - - - - - - - - 商品属性 - - - - - - - - - - - - - - - - - - - - -  -->
            <el-tab-pane label="商品属性" name="property">
                <el-row class="elRow">
                    <div class="bgcolor" v-for="(item,index) in productProperty_ChildTable" :key="index">
                        <label>{{item.propertyId_PropertyName}}</label>
                        <el-input
                        @focus="showErrprTips"
                        v-model="item.propertyValueName" >
                        </el-input>
                    </div>
                </el-row>
            </el-tab-pane>
<!-- - - - - - - - - - - - - - - - - - - - - - - - 图片 - - - - - - - - - - - - - - - - - - - - -  -->
            <el-tab-pane label="图片" name="picture">
                <el-row class="elRow">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="precent" v-show="progressShow"></el-progress>
                    <el-col v-for="(item,index) in productPicture_ChildTable" :key="index">
                        <el-col :span="24" class="uploadHeader">
                            <div class="leftSpec">
                                <label>{{item.specId_SpecName}}:</label>
                                <span>{{item.specValueName}}</span>
                            </div>
                            <div class="batchUpload">
                                <span @click="fileClick">批量上传</span>
                                <input accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadpic($event,item)" type="file" multiple class="upload_file" style="display: none"/>
                            </div>
                        </el-col>
                        <el-col :span="24"  class="pictureWrapper">
                            <draggable v-model="item.productPicture" @end="onEnd">
                                <transition-group>
                                    <app-loadImg  v-for="(items,i) in item.productPicture" :key="i" :data="items"></app-loadImg>
                                 </transition-group>
                            </draggable>
                        
                        </el-col>
                    </el-col>   
                </el-row>
            </el-tab-pane>
<!-- - - - - - - - - - - - - - - - - - - - - - - - 使用组织 - - - - - - - - - - - - - - - - - - - - -  -->
                <el-tab-pane label="使用组织" name="useOu">
                    <el-row class="elRow">
                        <button class="erp_bt bt_add" @click="dialogOuIsShow" :disabled="!isCategoryIdEmpty">
                            <div class="btImg">
                                <img src="../../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail">选取</span>
                        </button>
                        <div class="search_input_group">
                            <div class="search_input_wapper" @keyup.enter="searchOuTable">
                                <el-input
                                    placeholder="搜索..."
                                    v-model="searchTableOu"
                                    class="search_input"
                                    >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                            <div class="search_button_wrapper" @click="dialogUserDefined = true">
                                <button class="userDefined">
                                    <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                                </button>
                            </div>
                        </div>
                                                 <!-- 分配组织 -->
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
                    :default-expanded-keys="expandId_dialogOu"
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
<!--dialog结束  -->   
                        <el-table 
                        :data="showPageTableOu" 
                        border 
                        style="width: 100%" 
                        stripe>

                            <el-table-column prop="ouId_OuName" label="业务组织"></el-table-column>
                            <el-table-column label="上市日期">
                                <template slot-scope="scope">
                                    <el-date-picker
                                    :disabled="!isCategoryIdEmpty"
                                    v-model="scope.row.saleDate"
                                    format="yyyy.MM.dd"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    align="center"></el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注">
                                <template slot-scope="scope">
                                    <input class="input-need" 
                                            :disabled="!isCategoryIdEmpty"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.remark" 
                                            type="text"/>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <el-checkbox :disabled="!isCategoryIdEmpty" v-model="scope.row.isUse" @change="changeIsUse(scope.row)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                 <template slot-scope="scope">
                                     <el-button :disabled="!isCategoryIdEmpty" type="text" @click="delCheckOu(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        style="margin-top:20px;" 
                        class="text-right" 
                        background layout="total,prev, pager, next,jumper" 
                        @current-change="ouHandleCurrentChange"
                        :current-page="ouPageIndex"
                        :page-size="ouOneItem"
                        :total="ouTotalItem">
                        </el-pagination>   
                    </el-row>
                </el-tab-pane>
</el-tabs>   
    </div>
</el-row> 
<!-- dialog尺码选择 -->
        <el-dialog :visible.sync="chooseSize" class="choose_size">
            <el-dialog
                class="add_size"
                width="30%"
                title="新增尺码"
                :visible.sync="innerVisible"
                append-to-body>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>规格值编码</label>
                            <el-input 
                            class="specValueCode" 
                            :class="{redBorder : validation.hasError('creatSize.specValueCode')}" 
                            v-model="creatSize.specValueCode" 
                            placeholder=""></el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('creatSize.specValueCode') }}</div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>规格值名称</label>
                            <el-input 
                            class="specValueName" 
                            :class="{redBorder : validation.hasError('creatSize.specValueName')}" 
                            v-model="creatSize.specValueName" 
                            placeholder=""></el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('creatSize.specValueName') }}</div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>状态</label>
                            <el-select clearable filterable  
                            class="status" 
                            placeholder=""
                            :class="{redBorder : validation.hasError('creatSize.status')}"
                            v-model="creatSize.status">
                                <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('creatSize.status') }}</div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>备注</label>
                            <el-input
                            class="remark" 
                            :class="{redBorder : validation.hasError('creatSize.remark')}"
                            v-model="creatSize.remark"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            placeholder="">
                            </el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('creatSize.remark') }}</div>
                    </div>
                </el-col>
                <el-col :span="24" slot="footer" class="add_size_footer">
                    <button class="transfer_footer_btn transfer_confirm" @click="createdSize">确 认</button>
                    <button class="transfer_footer_btn" @click="innerVisible = false">取 消</button>
                </el-col>
            </el-dialog>
<!--                   穿梭框- -尺码选择                   -->
            <el-dialog
                class="add_size transfer_dialog"
                width="40%"
                title="选择尺码"
                :visible.sync="innerVisible2"
                append-to-body>
                <el-col :span="24">

        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>已选</span>
                <!-- <div class="transfer_search" @keyup.enter="searchLeftUserTable">
                    <el-input
                        placeholder="搜索..."
                        v-model="searchLeftUser"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>     -->
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table 
                :data="leftTableData" 
                border 
                style="width: 100%" 
                stripe 
                max-height="400"
                @selection-change="leftSelect" 
                ref="roleTableLeft">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="specValueCode" label="规格编码"></el-table-column>
                    <el-table-column prop="specValueName" label="规格名称"></el-table-column>
                </el-table>   
            </el-col>
            <!-- <el-col :span="24" class="transfer_footer">
                <div style="float:right">
                    <span>共{{totalPageLeftUser}}页</span>
                    <el-button class="el_transfer" :disabled="leftDownBtnUser" @click="pageDownLeftUser" type="primary" icon="el-icon-arrow-left" round></el-button>
                    <el-button class="el_transfer" :disabled="leftAddBtnUser" @click="pageAddLeftUser" type="primary" icon="el-icon-arrow-right" round></el-button>
                </div>
            </el-col> -->
        </el-col>
        <el-col :span="2" class="transfer_btns">
            <el-col :span="24" class="transfer_btn_wrapper">
                <el-button class="el_transfer" :disabled="goLeftBtn" @click="goLeft" type="primary" icon="el-icon-arrow-left" round></el-button>
                <el-button class="el_transfer" :disabled="goRightBtn" @click="goRight" type="primary" icon="el-icon-arrow-right" round></el-button>
            </el-col>
        </el-col>
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>可选</span>
                <!-- <div class="transfer_search"  @keyup.enter="searchRightUserTable">
                    <el-input
                        placeholder="搜索..."
                        v-model="searchRightUser"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div> -->
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table 
                :data="rightTableData" 
                border 
                style="width: 100%" 
                stripe 
                 max-height="400"
                @selection-change="rightSelect" 
                ref="roleTabRight">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="specValueCode" label="规格编码"></el-table-column>
                    <el-table-column prop="specValueName" label="规格名称"></el-table-column>
                </el-table>  
                
            </el-col>
            <!-- <el-col :span="24" class="transfer_footer">
                <div style="float:right">
                    <span>共{{totalPageRightUser}}页</span>
                    <el-button class="el_transfer" :disabled="rightDownBtnUser" @click="pageDownRightUser" type="primary" icon="el-icon-arrow-left" round></el-button>
                    <el-button class="el_transfer" :disabled="rightAddBtnUser" @click="pageAddRightUser" type="primary" icon="el-icon-arrow-right" round></el-button>
                </div>
            </el-col> -->
        </el-col>
    </el-col>

                <el-col :span="24" slot="footer" class="add_size_footer">
                    <button class="transfer_footer_btn transfer_confirm" @click="chooseAllSize">确 认</button>
                    <button class="transfer_footer_btn" @click="innerVisible2 = false">取 消</button>
                </el-col>
            </el-dialog>

<!--                   外层dialog                   -->
            <template slot="title">
                <span>尺码选择</span>
                <div class="search_input_group">
                    <div class="search_input_wapper">
                        <el-input
                            placeholder="搜索..."
                            class="search_input"
                            >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                </div>
            </template>
            <el-col :span="24" class="_body">
                <el-col :span="6" class="_body_left">
                    <vue-scroll :ops="$store.state.option">
                        <p class="sizeName" @click="getDetailSize(0)" :class="{redColor : typeof(witchSpecgroup[witchDialog])!='undefined' && witchSpecgroup[witchDialog]['spec']=='all'}">全部</p>
                        <p class="sizeName" v-for="(item,index) in showSizeDialogData" :key="index" @click="getDetailSize(item)" :class="{redColor : item.check}">{{item.specgroupName}}</p>
                    </vue-scroll>
                </el-col>
                <el-col :span="18" class="_body_right">
                    <el-col :span="24" class="_right_body">
                        <el-checkbox class="show_size" v-for="(item,index) in sizeTableData" :key="index" v-model="item.check" :label="item.specValueName" border @change="isCheckSize(item)"></el-checkbox>
                        <span class="show_size addSize" @click="ifShowInnerDialog">
                            <span class="x"></span>
                            <span class="y"></span>
                        </span>
                    </el-col>
                    <el-col :span="24" class="_right_footer">
                        <div class="_footer_bt">
                            <button class="transfer_footer_btn transfer_confirm" @click="confirmCheckSize">确 认</button>
                            <button class="transfer_footer_btn" @click="chooseSize = false">取 消</button>
                        </div>
                        <div class="_footer_page transfer_footer">
                            <span>{{page}}</span>
                            <span>/</span>
                            <span>{{totalPage}}</span>
                            <el-button :disabled="leftDownBtn" class="_page_left el_transfer" type="primary" icon="el-icon-arrow-left" round @click="pageLeft"></el-button>
                            <el-button :disabled="leftAddBtn" class="_page_right el_transfer" type="primary" icon="el-icon-arrow-right" round @click="pageRight"></el-button>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
        </el-dialog>
        <!-- dialog -->  
        <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing" @dialogColse="dialogUserConfirm = false">></dialogBox>
                                
</div>
</template>

<script>
import loadImg from './loadImg'
import draggable from 'vuedraggable'//拖拽https://github.com/SortableJS/Vue.Draggable
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../../common/common.js'
export default {
    components: {
        'app-loadImg':loadImg,
        draggable,
        buttonGroup,
        dialogBox,
    },
    data() {
        return{
            errorTips:{message:'',detail:''},
            dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
            dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
            isCategoryIdEmpty:false,//类目是否选择
            // 错误信息提示结束
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
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'保存并新增',
                    class:'bt_saveAdd',
                    icon:'icon-baocunxinzeng',
                    disabled:false,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:false,
                }],
//--------------------类目树形---------------------
            search_categoryId:'',//类目树搜索
            selectTree_categoryId:[],//类目树数据
            selectProps_categoryId: {//类目树默认属性
                children: 'childNodes',
                label: 'categoryName',
                id:'id'
            },
            expand_categoryId:[],////类目树默认展开节点id
            item_categoryId:{//类目树选中节点
                id:'',
                categoryName:''
            },
//--------------------单位树形---------------------
            search_unitId:'',//类目树搜索
            selectTree_unitId:[],//类目树数据
            selectProps_unitId: {//类目树默认属性
                children: 'unitGroup',
                label: 'unitName',
                id:'id'
            },
            expand_unitId:[],////类目树默认展开节点id
            item_unitId:{//类目树选中节点
                id:'',
                unitName:''
            },

            ifShow:true,
            activeName_first:'editGoods',
            activeName_one: 'goodsPrice',
            activeName_two: "goodsSize",
            activeName_three: "SKU",
            auditInfo:{
                createdTime:this.GetDateTime(),//创建时间
                createdBy:this.$store.state.name,//创建人
                modifiedTime:this.GetDateTime(),//修改人
                modifiedBy:this.$store.state.name//修改时间
            },//审计信息
            "CategoryData":{},//当前类目的关联信息,批次管理，多单位管理，有效期管理
            "product_MainTable":{//商品档案主表
                'id':0,
                "groupId": 1,
                "categoryId": '',//类目ID 
                "brandId": '',//品牌
                "productCode": "",//商品编码
                "productName": "",//商品名称
                "mnemonic": "",//助记码
                "barcode": "",//条码(产品级，囯码) 
                "saleDate": "",//上市日期
                "unitId": '',//基本单位
                "uniqueMgt": false,//唯一码管理 
                "lotMgt": false,//批次管理 
                "validityMgt": false,//有效期管理 
                "validDays": 0,//保质天数 
                "multiUnitEnabled": false,//启用多单位 ,
                "isSuite": false,//是否套件
                "purchasePrice": 0,//进货价 
                "purchaseUnit": 0,//进货默认单位 
                "wholePrice": 0,//批发价
                "wholeUnit": 0,//批发默认单位
                "discount": 1,//折扣
                "vipPrice": 0,//会员价 
                "retailPrice": 0,//零售价
                "retailUnit": 0,//零售默认单位
                "remark": "",//备注
                "status": 1,//状态
            },
            "productProperty_ChildTable": [//属性从表
                // {
                // "id":0,
                // "groupId": 1,
                // "productId": '',//商品ID 
                // "propertyId": '',//属性ID
                // "propertyValueCode": "",//属性编码 如被引用则原属性值代码不能修改
                // "propertyValueName": "",//属性名称
                // }
            ],
            "productSpec_ChildTable": [//规格从表
                // {
                // "id": 0,
                // "groupId": 1,
                // "productId": '',//商品ID 
                // "basSpecgroupId": '',//规格组ID
                // "specId": '',//规格ID
                // }
            ],
            
            "productSpecValue_GrandTable": [//规格值孙表 
                // {
                // "id": 0,
                // "groupId": 1,
                // "productSpecId": '',//商品规格ID 
                // "specId": '',//规格ID
                // "specValueId": '',//属性ID
                //  "specValueCode": "",//规格值编码 ,
                //  "specValueName": ""//规格值名称
                // }
            ],
            "productUnit_ChildTable": [// 多单位从表
                // {
                // "id": 0,
                // "groupId": 1,
                // "productId": '',//商品ID
                // "isBasicUnit":true,//是否基本单位 ,
                // "unitId": '',//单位ID
                // "purchasePrice": 0,//进货价 
                // "wholePrice": 0,//批发价
                // "discount": 0,//折扣
                // "vipPrice": 0,//会员价
                // "retailPrice": 0,//零售价
                // "isDefaultPurchase": true,//默认采购单位
                // "isDefaultWhole": true,// 默认批发单位 
                // "isDefaultRetail": true,//默认零售单位 
                // "status": 1,
                // }
            ],
            "productOu_ChildTable": [//组织应用关系从表 
                // {
                // "id": 0,
                // "groupId": 1,
                // "productId": 0,//商品ID 
                // "ouId": 0,//组织单元ID
                // "remark": "",
                // "status": 1
                // }
            ],
            "productPicture_ChildTable": [//图片从表
                // {
                // "id": 0,
                // "groupId": 1,
                // "productId": '',//商品ID 
                // "specId": '',//规格ID 
                // "specValueId":'',
                // "pictureUrl": "",// 图片路径
                // "pictureCode": "",// 图片代码
                // "pictureName": "",//图片名
                // "isMain": true,//是否主图 
                // "seq": true
                // }
                // {
                //     "basSpecgroupId_SpecgroupName": '颜色',//颜色，尺码
                //     "specId":1,
                //     "groupId":1,
                //     "productId":0,
                //     "specId_SpecName":'红色',
                //     "productPicture":[{
                //     "id": 0,
                //     "groupId": 1,
                //     "productId": 0,
                //     "specId": 1,//规格ID 
                //     "specId_SpecName":'红色',
                //     "pictureUrl": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525769441&di=171e67c8af0810cea353f92d31798f45&src=http://www.gzlco.com/imggzl/214/1b6e6520ca474fe4bd3ff728817950717651.jpeg",// 图片路径
                //     "pictureCode": "",// 图片代码
                //     "pictureName": "",//图片名
                //     "isMain": true,//是否主图 
                //     "seq": 0
                //     },{
                //     "id": 0,
                //     "groupId": 1,
                //     "productId": 0,//商品ID 
                //     "specId": 1,//规格ID 
                //     "specId_SpecName":'红色',
                //     "pictureUrl": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525769441&di=171e67c8af0810cea353f92d31798f45&src=http://www.gzlco.com/imggzl/214/1b6e6520ca474fe4bd3ff728817950717651.jpeg",// 图片路径
                //     "pictureCode": "",// 图片代码
                //     "pictureName": "",//图片名
                //     "isMain": false,//是否主图 
                //     "seq": 1
                //     }],
                // },{
                //     "basSpecgroupId_SpecgroupName": '颜色',//颜色，尺码
                //     "specId":2,
                //     "groupId":1,
                //     "productId":0,
                //     "specId_SpecName":'黑色',
                //     "productPicture":[{
                //     "id": 0,
                //     "groupId": 1,
                //     "productId": 0,
                //     "specId": 2,//规格ID 
                //     "specId_SpecName":'黑色',
                //     "pictureUrl": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525769441&di=171e67c8af0810cea353f92d31798f45&src=http://www.gzlco.com/imggzl/214/1b6e6520ca474fe4bd3ff728817950717651.jpeg",// 图片路径
                //     "pictureCode": "",// 图片代码
                //     "pictureName": "",//图片名
                //     "isMain": false,//是否主图 
                //     "seq": 0
                //     },{
                //     "id": 0,
                //     "groupId": 1,
                //     "productId": 0,//商品ID 
                //     "specId": 2,//规格ID 
                //     "specId_SpecName":'黑色',
                //     "pictureUrl": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525769441&di=171e67c8af0810cea353f92d31798f45&src=http://www.gzlco.com/imggzl/214/1b6e6520ca474fe4bd3ff728817950717651.jpeg",// 图片路径
                //     "pictureCode": "",// 图片代码
                //     "pictureName": "",//图片名
                //     "isMain": true,//是否主图 
                //     "seq": 1
                //     }],
                // }
            ],
            "sku_ChildTable": [//SKU从表
                // {
                // "id": 0,
                // "groupId": 1,
                // "productId": '',//商品ID
                // "skuCode": "",//SKU商品编码
                // "skuName": "",//SKU商品名称
                // "barcode": "",//条码
                // "unitId": '',//基本单位 
                // "purchasePrice": '',//进货价
                // "wholePrice": '',//批发价 
                // "discount": '',//折扣 
                // "vipPrice": '',//会员价 
                // "retailPrice": '',//零售价 
                // "status": 1
                // "skuSpecValue_GrandTable": [//SKU规格值孙表
                     // {
                     // "id": 0,
                     // "groupId": 1,
                     // "skuId": '',//SKU ID
                     // "productId": '',// 商品ID 
                     // "specId": '',//规格ID
                     // "specValueCode": "string",//规格值编码
                     // "specValueName": "string",//规格值名称
                     // }
                //  ],
                // }
            ],
            skuTableHeader:[],//sku孙表的表头
            skuData:[],
            
            selectData:{//select数据
                Status001:[],//启用状态
                brand:[],//品牌
                unit:[],//单位
            },
//----------按钮操作--------------
        dialogUserConfirm:false,//信息更改提示控制
        update:false,
//---------------商品规格------------------
        chooseSize:false,//dialog选择尺码
        chooseSizeData:{
            // id:[{item1},{item2}]
        },//dialog选择尺码所有对应id规格组数据
        showSizeDialogData:[],//dialog左侧渲染数据
        innerVisible:false,//内层表格
        innerVisible2:false,
        witchSpecgroup:[],//纪录选中规格组
        witchDialog:0,//纪录当前点击的规格编码id
        allSpecGroupSize:[],//纪录规格组下面的规格
        //商品规格dialog,规格分页
        sizeTableData:[],
        pageIndex:1,//分页的当前页码
        totalPage:1,//当前分页总数
        oneItem:10,//每页有多少条信息
        page:1,//当前页
        leftDownBtn:false,//分页按钮是否显示
        leftAddBtn:false,//分页按钮是否显示
        // checkSize:[],//用户选中尺码
        //创建商品规格
        creatSize:{
            "groupId": 1,
            "specId": 0,//规格id
            "specValueCode": "",//规格值编码 
            "specValueName": "",//规格值名称 ,
            "seq": 0,
            "status": 1,
            "remark": ""
        },
// ------------内层穿梭dialog-------------
            leftTableData:[],//右侧表格展示的数据
            rightTableData:[],//左侧表格展示的数据

            leftSelectData: [],//复选框选中数据
            rightSelectData: [],//复选框选中数据

            goLeftBtn:true,//可选
            goRightBtn:true,//已选

            searchLeftUser:'',//搜索      
            searchRightUser:'',
//---------------SKU------------------
       
//---------------图片------------------

            progressShow:false,//图片上传进度条
            precent:100,

//----------------使用组织---------------
        dialogOu:false,
        expandId_dialogOu:[],//默认dialog组织树形展开id
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
        // productOu_ChildTable:[],//分配组织数据
        showPageTableOu:[],//展示分页后表格数据
        ouPageIndex:1,//分页的当前页码
        ouTotalPage:0,//当前分页总数
        ouOneItem:10,//每页有多少条信息
        ouPage:1,//当前页
        ouTotalItem:0,//总共有多少条消息
        filterKey:'',
    }
},
    validators: {
     'product_MainTable.categoryId': function (value) {//类目
        if(!this.innerVisible){
          return this.Validator.value(value).required().integer()
        }else{
          return this.Validator.value(value)
        }
      },
      'product_MainTable.productCode': function (value) {//商品编码
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).required().maxLength(50);
        }else{
            return this.Validator.value(value)
        }
         
      },
      'product_MainTable.productName': function (value) {//商品名称
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).required().maxLength(100);
         }else{
            return this.Validator.value(value)
        }
      },
      'product_MainTable.brandId': function (value) {//品牌
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).integer();
         }else{
            return this.Validator.value(value)
        }
      },
      'product_MainTable.unitId': function (value) {//单位
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).required().integer();
         }else{
            return this.Validator.value(value)
        }
      },
      'product_MainTable.barcode': function (value) {//商品条码
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).maxLength(50);
         }else{
            return this.Validator.value(value)
        }
      },
      'product_MainTable.mnemonic': function (value) {//助记码
        if(this.isCategoryIdEmpty && !this.innerVisible){
            return this.Validator.value(value).maxLength(50);
         }else{
            return this.Validator.value(value)
        }
      },
      'product_MainTable.saleDate': function (value) {//上市时间
          return this.Validator.value(value);
      },
      'product_MainTable.remark': function (value) {//备注
         return this.Validator.value(value)
      },
      'product_MainTable.validDays': function (value) {//保质天数

        if(typeof(value)!='undefined' && !this.innerVisible){
            return this.Validator.value(value).integer()
        }else{
            return this.Validator.value(value)
        }
         
      },
// -------------创建尺码--------------
      'creatSize.specValueCode': function (value) {//规格值编码
        if(this.innerVisible && this.witchSpecgroup[this.witchDialog].spec == 'all'){
            return this.Validator.value(value).required()
        }else{
            return this.Validator.value(value)
        }
         
      },
      'creatSize.specValueName': function (value) {//规格值名称
        if(this.innerVisible  && this.witchSpecgroup[this.witchDialog].spec == 'all'){
            return this.Validator.value(value).required()
        }else{
            return this.Validator.value(value)
        }
      },
      'creatSize.status': function (value) {//状态
        if(this.innerVisible  && this.witchSpecgroup[this.witchDialog].spec == 'all'){
            return this.Validator.value(value).integer()
        }else{
            return this.Validator.value(value)
        }
      },
      'creatSize.remark': function (value) {//备注
            return this.Validator.value(value)
      },

      

    },
    created:function(){
        let _this=this;
        _this.loadTree_categoryId();//类目树形
        _this.loadTree_unitId();//单位树形
        _this.getSelectData();

        _this.getAllOulength();//获取所有数据长度判断是否全选
        _this.loadOuTreeAll();//关联组织树形所有数据

    },  
     watch: {
      search_categoryId(val) {
        this.$refs.tree.filter(val);
      },
      search_unitId(val) {
        this.$refs.tree.filter(val);
      },
      filterTextOu(val) {
        this.$refs.tree.filter(val);
      },
      'product_MainTable.categoryId'(val){//类目值
          if(val!=''){
              this.isCategoryIdEmpty=true
          }else{
              this.isCategoryIdEmpty=false
          }
      },
      'product_MainTable.validityMgt'(val){//有效期管理
            if(!val){
                delete this.product_MainTable.validDays;//保质天数
            }
      },
      
    },
    computed:{
        brand: function () {//下拉数据自定义搜索过滤
            return FILTER_MOTHED(this.filterKey,this.selectData.brand)
            },
        },
    methods:{
        filterMethod(query){
                this.filterKey=query; 

            },
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
        getSelectData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
                // 启用状态
                _this.selectData.Status001=res.result;
            })
           _this.$axios.gets('/api/services/app/BrandManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){
                // 品牌
                if(res.result.totalCount>0){
                    _this.$axios.gets('/api/services/app/BrandManagement/GetAll',{SkipCount:0,MaxResultCount:res.result.totalCount})
                    .then(function(resp){
                        _this.selectData.brand=resp.result.items;
                    })
                }else{
                    _this.selectData.brand=[]
                }

            })
        },
        showErrprTips(e){
            $('.tipsWrapper').css({display:'none'})
        },
        filterNode_categoryId(value, data) {
            if (!value) return true;
            return data.categoryName.indexOf(value) !== -1;
        },
        filterNode_unitId(value, data) {
            if (!value) return true;
            return data.unitName.indexOf(value) !== -1;
        },
        loadTree_unitId(){//单位树形
            let _this=this;
            _this.$axios.gets('/api/services/app/UnitManagement/GetUnitTree')
            .then(function(res){
                // console.log(res)
                _this.selectTree_unitId=res;
                // _this.expand_unitId=[1]
                _this.expand_unitId=_this.defauleExpandTree(res,'id')
            },function(res){
            })
        },
        loadTree_categoryId(){//类目树形
            let _this=this;
            _this.$axios.gets('/api/services/app/CategoryManagement/GetCategoryTree')
            .then(function(res){
                _this.selectTree_categoryId=res;
                _this.expand_categoryId=_this.defauleExpandTree(res,'id')
            },function(res){
            })
        },
         nodeClick_categoryId(data,node,self){
            let _this=this;
            _this.item_categoryId.id=data.id;
            _this.item_categoryId.categoryName=data.categoryName;
            _this.$nextTick(function(){
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,}).click();
            })
            // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
            // if($(this).attr('date')==data.id){
            //     $(this).click()
            // }
        // })
            
        },
        nodeClick_unitId(data,node,self){
            let _this=this;
            _this.item_unitId.id=data.id;
            _this.item_unitId.unitName=data.unitName;
            _this.$nextTick(function(){
                // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').css({top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,}).click();
            })
            // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
            // if($(this).attr('date')==data.id){
            //     $(this).click()
            // }
        // })
        },
        back(){
            this.$store.state.url='/goodsFiles/goodsFilesList/default'
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
        goModify(){
             this.$store.state.url='/goodsFiles/goodsFilesModify/'+res.result.id
             this.$router.push({path:_this.$store.state.url})//点击切换路由
        },
        saveAdd(){
            let _this=this;
            _this.saves('saveAdd')
        },
        save(){
            let _this=this;
            _this.saves('save')
        },
        saves(btFn){
            let _this=this;
            // console.log(1)
            $('.tipsWrapper').css({display:'block'})
            _this.$validate()
            .then(function (success) {
                if (success) {
                    $('.tipsWrapper').css({display:'none'})
                    let product_MainTable=_this.product_MainTable;//商品档案主表
                    let productProperty_ChildTable=[];//属性
                    $.each(_this.productProperty_ChildTable,function(index,val){
                        productProperty_ChildTable.push({id:val.id,groupId:product_MainTable.groupId,productId:product_MainTable.id,propertyId:val.propertyId,propertyValueCode:val.propertyValueCode,propertyValueName:val.propertyValueName}) 
                    })
                    
                    let productSpec_ChildTable=[];//规格从表
                    let productSpecValue_GrandTable=[];//规格值孙表 
                    $.each(_this.productSpec_ChildTable,function(index,val){
                        productSpec_ChildTable.push({id:0,groupId:product_MainTable.groupId,productId:product_MainTable.id,basSpecgroupId:val.basSpecgroupId,specId:val.specId}) 
                        if(val.productSpecValue_GrandTable.length>0){
                            $.each(val.productSpecValue_GrandTable,function(i,v){
                                productSpecValue_GrandTable.push({id:v.id,groupId:product_MainTable.groupId,specValueCode:v.specValueCode,specValueName:v.specValueName,productSpecId:0,specValueId:v.specValueId,specId:v.specId})
                            })
                        }
                    })
                    let productUnit_ChildTable=[];// 多单位从表
                    $.each(_this.productUnit_ChildTable,function(index,val){
                        productUnit_ChildTable.push({id:val.id,groupId:product_MainTable.groupId,productId:product_MainTable.id,isBasicUnit:val.isBasicUnit,unitId:val.unitId,purchasePrice:val.purchasePrice,wholePrice:val.wholePrice,discount:val.discount,vipPrice:val.vipPrice,retailPrice:val.retailPrice,isDefaultPurchase:val.isDefaultPurchase,isDefaultWhole:val.isDefaultWhole,isDefaultRetail:val.isDefaultRetail,status:val.status}) 
                    })
                    let productOu_ChildTable=[];//组织应用关系从表 
                    $.each(_this.productOu_ChildTable,function(index,val){
                        let id=0
                        if(typeof(val.id)!='undefined'){
                            id=val.id
                        }
                        productOu_ChildTable.push({id:id,groupId:product_MainTable.groupId,productId:product_MainTable.id,ouId:val.ouId,remark:val.remark,status:val.status}) 
                    })
                    let productPicture_ChildTable=[];//图片从表
                    $.each(_this.productPicture_ChildTable,function(index,val){
                         $.each(val.productPicture,function(i,v){
                             let item={groupId:product_MainTable.groupId,id:v.id,isMain:v.isMain,pictureCode:v.pictureCode,pictureName:v.pictureName,pictureUrl:v.pictureUrl,productId:product_MainTable.id,seq:i,specId:v.specId,specValueId:v.specValueId}
                             productPicture_ChildTable.push(item)
                         })
                    })
                    let sku_ChildTable=[];////SKU从表
                    $.each(_this.sku_ChildTable,function(index,val){
                        let skuSpecValue_GrandTable=[];//SKU规格值孙表
                        $.each(val.skuSpecValue_GrandTable,function(i,v){
                            if(typeof(v.skuId)=='undefined'){v.skuId=0}
                            skuSpecValue_GrandTable.push({id:v.id,groupId:product_MainTable.groupId,skuId:v.skuId,productId:product_MainTable.id,specId:v.specId,specValueCode:v.specValueCode,specValueName:v.specValueName})
                        })
                        sku_ChildTable.push({id:val.id,groupId:product_MainTable.groupId,productId:product_MainTable.id,skuCode:val.skuCode,skuName:val.skuName,barcode:val.barcode,unitId:product_MainTable.unitId,purchasePrice:val.purchasePrice,wholePrice:val.wholePrice,discount:val.discount,vipPrice:val.vipPrice,retailPrice:val.retailPrice,status:val.status,skuSpecValue_GrandTable:skuSpecValue_GrandTable}) 
                    })
                    // console.log(product_MainTable)//商品档案主表
                    // console.log(productProperty_ChildTable)//属性
                    // console.log(productSpec_ChildTable)//规格从表
                    // console.log(productSpecValue_GrandTable)//规格值孙表 
                    // console.log(productUnit_ChildTable)// 多单位从表
                    // console.log(productOu_ChildTable)//组织应用关系从表 

                    // console.log(productPicture_ChildTable)//图片从表
                    // console.log(sku_ChildTable)//SKU从表
                    let data={
                        product_MainTable:product_MainTable,
                        productProperty_ChildTable:productProperty_ChildTable,
                        productSpec_ChildTable:productSpec_ChildTable,
                        productSpecValue_GrandTable:productSpecValue_GrandTable,
                        productUnit_ChildTable:productUnit_ChildTable,
                        productOu_ChildTable:productOu_ChildTable,
                        productPicture_ChildTable:productPicture_ChildTable,
                        sku_ChildTable:sku_ChildTable,
                    }
                    _this.$axios.posts('/api/services/app/ProductManagement/AggregateCreateOrUpdate',data).then(function(res){
                        _this.open('保存成功','el-icon-circle-check','successERP');
                        if(btFn=='save'){
                             _this.$store.state.url='/goodsFiles/goodsFilesModify/'+res.result.id
                             _this.$router.push({path:_this.$store.state.url})//点击切换路由
                        }else if(btFn=='saveAdd'){
                            _this.clearData()
                        }
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }
            });    
        },
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
//-------------按钮操作-----------
        isBack(){
            let _this=this;
            if(_this.update){
                _this.dialogSetting.dialogName='isBack'
                _this.dialogSetting.message='确定取消？'
                _this.dialogSetting.dialogType='confirm'
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                _this.dialogUserConfirm=true;
            }else{
                _this.back()
            }
        },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message=message
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogUserConfirm=true;
        },
        sureDoing(data){
            let _this=this;
            if(data.dialogName=='isBack'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.back()
                    _this.dialogUserConfirm=false;
                }
            }else if(data.dialogName=='showErMsgDialog'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.dialogUserConfirm=false;
                }
            }
        },
        clearData(){
            let _this=this;
             _this.product_MainTable={
                'id':0,
                "groupId": 1,
                "categoryId": '',//类目ID 
                "brandId": '',//品牌
                "productCode": "",//商品编码
                "productName": "",//商品名称
                "mnemonic": "",//助记码
                "barcode": "",//条码(产品级，囯码) 
                "saleDate": "",//上市日期
                "unitId": '',//基本单位
                "uniqueMgt": false,//唯一码管理 
                "lotMgt": false,//批次管理 
                "validityMgt": false,//有效期管理 
                "validDays": 0,//保质天数 
                "multiUnitEnabled": false,//启用多单位 ,
                "isSuite": false,//是否套件
                "purchasePrice": 0,//进货价 
                "purchaseUnit": 0,//进货默认单位 
                "wholePrice": 0,//批发价
                "wholeUnit": 0,//批发默认单位
                "discount": 1,//折扣
                "vipPrice": 0,//会员价 
                "retailPrice": 0,//零售价
                "retailUnit": 0,//零售默认单位
                "remark": "",//备注
                "status": 1,//状态
            };
            _this.isCategoryIdEmpty=false;
            _this.detail_message_ifShow=false;
            _this.errorMessage=false;
            _this.activeName_first='editGoods';
            _this.activeName_one= 'goodsPrice';
            _this.activeName_two= "goodsSize";
            _this.activeName_three= "SKU";
            _this.auditInfo={
                createdTime:this.GetDateTime(),//创建时间
                createdBy:this.$store.state.name,//创建人
                modifiedTime:this.GetDateTime(),//修改人
                modifiedBy:this.$store.state.name//修改时间
            };
            _this.CategoryData={};
            _this.productProperty_ChildTable=[];
            _this.productSpec_ChildTable=[];
            _this.productSpecValue_GrandTable=[];
            _this.productUnit_ChildTable=[];
            _this.productOu_ChildTable=[];
            _this.productPicture_ChildTable=[];
            _this.sku_ChildTable=[];
            _this.skuTableHeader=[];
            _this.skuData=[];
            _this.update=false;
            _this.chooseSizeData={};
            _this.showSizeDialogData=[];
            _this.witchSpecgroup=[];
            _this.witchDialog=0;
            _this.allSpecGroupSize=[];
            _this.sizeTableData=[];
            _this.pageIndex=1;
            _this.totalPage=1;
            _this.page=1;
            _this.leftDownBtn=false;
            _this.leftAddBtn=false;
            _this.creatSize={
                "groupId": 1,
                "specId": 0,//规格id
                "specValueCode": "",//规格值编码 
                "specValueName": "",//规格值名称 ,
                "seq": 0,
                "status": 1,
                "remark": ""
            };
            _this.leftTableData=[];
            _this.rightTableData=[];
            _this.leftSelectData=[];
            _this.rightSelectData=[];
            _this.goLeftBtn=true;
            _this.goRightBtn=true;
            _this.searchLeftUser='';
            _this.searchRightUser='';
            _this.showCheck=false;
            _this.checkAllOu=false;
            _this.filterTextOu='';
            _this.addOu='default';
            _this.searchTableOu='';
            _this.showPageTableOu=[];
            _this.ouPageIndex=1;
            _this.ouTotalPage=0;
            _this.ouPage=1;
            _this.ouTotalItem=0;
            _this.validation.reset();
        },
        changeCategoryId(){//类目改变
            let _this=this;
            _this.update=true;
            _this.CategoryData={};
            _this.witchSpecgroup=[];
            _this.chooseSizeData={};
            _this.showSizeDialogData=[];
            _this.witchDialog=0;
            _this.allSpecGroupSize=[];
            _this.sizeTableData=[],
            _this.pageIndex=1;
            _this.totalPage=1;
            _this.page=1;
            _this.leftDownBtn=false;
            _this.leftAddBtn=false;
            _this.skuTableHeader=[];//sku表头
            _this.productSpec_ChildTable=[];//规格从表
            _this.productSpecValue_GrandTable=[];//规格孙表
            _this.sku_ChildTable=[];//sku从表
            _this.productProperty_ChildTable=[];//属性从表
            _this.productPicture_ChildTable=[];//图片
            if(_this.product_MainTable.categoryId!=''){
           
                _this.$axios.gets('/api/services/app/CategoryFeatureManagement/GetCategoryFeature',{categoryID:_this.product_MainTable.categoryId})
                .then(function(res){
                    _this.CategoryData=res.result;//获取唯一码，批次保质期管理checkbox
                    _this.product_MainTable.uniqueMgt=false;
                    _this.product_MainTable.lotMgt=false;
                    _this.product_MainTable.validityMgt=false;
                    _this.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{categoryID:_this.product_MainTable.categoryId,ItemType:1,CategoryFeatureId:res.result.id})
                    .then(function(resp){//获取属性label值
                        $.each(resp.result,function(index,value){
                            value.propertyId_PropertyName=value.propertyName;
                            value.propertyValueName='';
                            value.propertyId=value.itemSourceId;
                            value.propertyValueCode=value.propertyCode;
                        })
                        _this.productProperty_ChildTable=resp.result
                    })

                    _this.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{categoryID:_this.product_MainTable.categoryId,ItemType:2,CategoryFeatureId:res.result.id})
                    .then(function(res){//获取规格
                        $.each(res.result,function(i,v){
                            v.basSpecgroupId_SpecgroupName='/';
                            v.productSpecValue_GrandTable=[];
                            v.basSpecgroupId=0;
                            v.specId=v.itemSourceId;
                        })
                            _this.productSpec_ChildTable=res.result
                            
                        },function(res){

                        })
                    },function(res){

                    })
                
                
            }

        },
//----------------------商品价格，多单位------------------
        getMoreUnitList(){//启用多单位根据单位获取到单位列表
             let _this=this;
            _this.productUnit_ChildTable=[]
            if(_this.product_MainTable.unitId!=''){
                //商品价格，多单位
                _this.$axios.gets('/api/services/app/UnitConvertManagement/GetDetail',{UnitId:_this.product_MainTable.unitId})
                .then(function(res){
                    $.each(res.result,function(i,v){
                        if(i==0){
                            v.basicUnitName='基本单位'
                            v.isDefaultPurchase=true
                            v.isDefaultWhole=true
                            v.isDefaultRetail=true
                        }else{
                            v.basicUnitName='多单位'
                            v.isDefaultPurchase=false
                            v.isDefaultWhole=false
                            v.isDefaultRetail=false
                        }
                        v.purchasePrice=0
                        v.wholePrice=0
                        v.discount=0
                        v.vipPrice=0
                        v.retailPrice=0
                    })
                    _this.productUnit_ChildTable=res.result;
                },function(res){
                })
            }
        },
        isDefaultChange(data,key,index){
            let _this=this;
            $.each(_this.productUnit_ChildTable,function(i,value){
                value[key]=false
            })
            data[key]=true
        },
//----------------------商品规格------------------
        uniqueArrayFn(array1, array2,array1Key,array2Key){//求差集
            var result = [];
            for(var i = 0; i < array1.length; i++){
                var item = array1[i];
                var repeat = false;
                for (var j = 0; j < array2.length; j++) {
                    if (array1[i][array1Key] == array2[j][array2Key]) {//唯一key
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
        paginationData(data,oneItem,thisPage){//数据分页
        //checkAllata分页数据
        //oneItem每页有多少条信息
        //thisPage当前页
        //who点击页码时，判断是哪个数据的分页
            let _this=this;
            let x={}
            let nowData=[];
            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
            let endIndex=startIndex + oneItem;
                if(data.length>0){
                    if(endIndex>data.length){
                        endIndex=data.length
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        nowData.push(data[startIndex])
                    }
                }
            x={TotalItem:data.length,TotalPage:Math.ceil(data.length/oneItem),nowData:nowData};
            return x
        },
    showGoodsDialog(data){//选中编辑规格组，显示dialog
        let _this=this;
        _this.witchDialog=data.itemSourceId;//纪录当前点击的规格编码id
        if(typeof(_this.allSpecGroupSize[_this.witchDialog])=='undefined'){
            _this.allSpecGroupSize[_this.witchDialog]=[];//初始化选中尺码值
        }
        if(typeof(_this.witchSpecgroup[_this.witchDialog])=='undefined'){
            _this.witchSpecgroup[_this.witchDialog]={spec:'all',id:_this.witchDialog,name:'/'}
            _this.getSpecSize({SpecId:_this.witchDialog},'all',true)
        }else{
            if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
                _this.getSpecSize({SpecId:_this.witchDialog},'all',true)
            }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                _this.getSpecSize({SpecId:_this.witchDialog,SpecgroupId:groupId},groupId,true)
                _this.getSpecSize({SpecId:_this.witchDialog},'all',false)//穿梭框初始化全部数据
            }
        }
        if(typeof(_this.chooseSizeData[_this.witchDialog])=='undefined'){
            _this.$axios.gets('/api/services/app/SpecgroupManagement/GetListByCondition',{SpecId:data.itemSourceId ,SkipCount:0,MaxResultCount:1})
            .then(function(resp){//获取左侧规格组
                if(resp.result.totalCount>0){
                    _this.$axios.gets('/api/services/app/SpecgroupManagement/GetListByCondition',{SpecId:data.itemSourceId ,SkipCount:0,MaxResultCount:resp.result.totalCount})
                    .then(function(res){
                        // _this.chooseSizeData[_this.witchDialog]=res.result.items;
                        $.each(res.result.items,function(index,val){//规格组是否选中
                            val.check=false
                            
                            if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                                // console.log(val.id+'=='+_this.witchSpecgroup[_this.witchDialog]['id'])
                                if(val.id==_this.witchSpecgroup[_this.witchDialog]['id']){
                                    val.check=true
                                }
                            }
                        })
                        _this.chooseSizeData[data.itemSourceId]=res.result.items;
                        _this.showSizeDialogData=_this.chooseSizeData[_this.witchDialog]
                        _this.chooseSize=true;
                    })
                }else{
                    _this.chooseSizeData[_this.witchDialog]=[];
                    _this.showSizeDialogData=_this.chooseSizeData[_this.witchDialog]
                    _this.chooseSize=true;
                }
                
            },function(res){

            })
        }else{
            _this.showSizeDialogData=_this.chooseSizeData[_this.witchDialog]
            if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
               
                 _this.page=_this.allSpecGroupSize[_this.witchDialog]['all'].page;
                _this.totalPage=_this.allSpecGroupSize[_this.witchDialog]['all'].totalPage;
                _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog]['all'].nowData
                _this.totalItem=_this.allSpecGroupSize[_this.witchDialog]['all'].totalItem;
                _this.btnIsShow()
            }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                 _this.page=_this.allSpecGroupSize[_this.witchDialog][groupId].page;
                _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][groupId].totalPage;
                _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].nowData;
                _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][groupId].totalItem;
                _this.btnIsShow()
            }
            _this.chooseSize=true;
        }
            
            
            
    },
        btnIsShow(){
            let _this=this;
            if(_this.page>1){
                _this.leftDownBtn=false;
            }else{
                _this.leftDownBtn=true;
            }
            if(_this.totalPage>_this.page){
                _this.leftAddBtn=false;
            }else{
                _this.leftAddBtn=true;
            }
        },
        pageLeft(){
            let _this=this;
             if(_this.page>1){
                _this.page--
                 if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
                        _this.allSpecGroupSize[_this.witchDialog]['all'].page=_this.page
                        let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog]['all'].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog]['all'].page)
                        _this.allSpecGroupSize[_this.witchDialog]['all'].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog]['all'].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog]['all'].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog]['all'].nowData
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog]['all'].totalItem;
                        _this.btnIsShow()
                }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                        let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                        _this.allSpecGroupSize[_this.witchDialog][groupId].page=_this.page
                        let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog][groupId].page)
                        _this.allSpecGroupSize[_this.witchDialog][groupId].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog][groupId].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][groupId].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].nowData;
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][groupId].totalItem;
                        _this.btnIsShow()
                }
            }else{
                return false
            }
        },
        pageRight(){
            let _this=this;
            if(_this.page<=_this.totalPage){
                _this.page++
                if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
                        _this.allSpecGroupSize[_this.witchDialog]['all'].page=_this.page
                        let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog]['all'].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog]['all'].page)
                        _this.allSpecGroupSize[_this.witchDialog]['all'].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog]['all'].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog]['all'].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog]['all'].nowData
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog]['all'].totalItem;
                        _this.btnIsShow()
                }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                        let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                        _this.allSpecGroupSize[_this.witchDialog][groupId].page=_this.page
                        let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog][groupId].page)
                        _this.allSpecGroupSize[_this.witchDialog][groupId].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog][groupId].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][groupId].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].nowData;
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][groupId].totalItem;
                        _this.btnIsShow()
                }
            }else{
                return false
            }
        },
        isCheckSize(data){//是否选择尺码
             let _this=this;
            //  console.log(data)
            //  data.check=!data.check
                //   if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
                //     //   _this.allSpecGroupSize[_this.witchDialog]['all'].allData
                //     console.log(_this.allSpecGroupSize[_this.witchDialog]['all'].allData)
                //   }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                //     let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                //     console.log(_this.allSpecGroupSize[_this.witchDialog][groupId].allData)
                //   }
        },
        delSize(index,row){
           let _this=this;
            if(_this.witchSpecgroup[row.itemSourceId].spec=='all'){
                row.productSpecValue_GrandTable.splice(index,1)
            }else if(_this.witchSpecgroup[row.itemSourceId].spec=='one'){
                row.productSpecValue_GrandTable.splice(index,1)
            }
            _this.buildSKU()
        },
        confirmCheckSize(){//dialog点击确认
            let _this=this;
            if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){//全部
                let data=[];
                $.each(_this.allSpecGroupSize[_this.witchDialog]['all'].allData,function(i,v){
                    if(v.check){
                        v.id=0
                        data.push(v)
                    }
                })
                $.each(_this.productSpec_ChildTable,function(index,value){
                    if(value.itemSourceId==_this.witchDialog){
                        value.productSpecValue_GrandTable=data;
                        value.basSpecgroupId=_this.witchSpecgroup[_this.witchDialog].id
                        value.basSpecgroupId_SpecgroupName=_this.witchSpecgroup[_this.witchDialog].name
                    }
                })
             }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){//具体规格组
                let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id  
                let data=[];
                $.each(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,function(i,v){//dialog规格数据
                    if(v.check){
                        v.id=0
                        data.push(v)
                    }
                
                }) 
                $.each(_this.productSpec_ChildTable,function(index,value){
                    if(value.itemSourceId==_this.witchDialog){
                        value.productSpecValue_GrandTable=data
                        value.basSpecgroupId=_this.witchSpecgroup[_this.witchDialog].id
                        value.basSpecgroupId_SpecgroupName=_this.witchSpecgroup[_this.witchDialog].name
                    }
                }) 
            
             }
             _this.buildSKU()
             _this.chooseSize=false;
        },
        getSpecSize(data,isAll,isPage){
            // data={SpecId:'',SpecgroupId:''}
            //isAll如果是全部isAll='all',如果是规格组isAll=规格组id
            //isPage，是否需要分页
            let _this=this;
            _this.$axios.gets('/api/services/app/SpecValueManagement/GetProductSpecValue',data)
            .then(function(res){
                if(res.result.length>0){
                    let allData=res.result
                    let page=1
                    $.each(allData,function(index,value){//初始化数据，都未被用户选中,需要判断初始加载项的选中
                        value.check=false;
                        value.specValueId=value.id;
                        value.skuId=0
                        value.specgroupId=0;
                        $.each(_this.productSpec_ChildTable,function(i,v){
                            if(v.itemSourceId==_this.witchDialog){
                                $.each(v.productSpecValue_GrandTable,function(index1,value1){
                                    if(value.specValueId==value1.specValueId){
                                        value.check=true
                                    }
                                })
                            }
                        })
                    })
                    let x=_this.paginationData(allData,_this.oneItem,page)
                        
                    _this.allSpecGroupSize[_this.witchDialog][isAll]={allData:allData,nowData:x.nowData,totalItem:x.TotalItem,totalPage:x.TotalPage,page:page};
                    if(isPage){
                        _this.page=1
                        _this.totalPage=x.TotalPage;
                        _this.sizeTableData=x.nowData
                        _this.totalItem=x.TotalItem;
                        _this.btnIsShow()
                    }
                }else{
                    _this.allSpecGroupSize[_this.witchDialog][isAll]={allData:[],nowData:[],totalItem:0,totalPage:0,page:0};
                    if(isPage){
                        _this.page=_this.allSpecGroupSize[_this.witchDialog][isAll].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][isAll].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][isAll].nowData;
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][isAll].totalItem;
                        _this.btnIsShow()
                    }
                    
                }
            })
        },
        getDetailSize(data){//dialog点击左侧规格组获取详细规格
            let _this=this;
            _this.page=1;
            $.each(_this.showSizeDialogData,function(index,val){
                val.check=false;
            })
            if(data==0){//点击全部
                   _this.witchSpecgroup[_this.witchDialog]={spec:'all',id:_this.witchDialog,name:'/'};
                    if(typeof(_this.allSpecGroupSize[_this.witchDialog]['all'])=='undefined'){
                        _this.getSpecSize({SpecId:_this.witchDialog},'all',true)
                    }else{
                        _this.page=_this.allSpecGroupSize[_this.witchDialog]['all'].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog]['all'].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog]['all'].nowData
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog]['all'].totalItem;
                        
                        _this.btnIsShow()
                    }
                
            }else{//非全部
                    data.check=true;
                    _this.witchSpecgroup[_this.witchDialog]={spec:'one',id:data.id,name:data.specgroupName};
                    let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                    if(typeof(_this.allSpecGroupSize[_this.witchDialog][groupId])=='undefined'){
                         _this.getSpecSize({SpecId:_this.witchDialog,SpecgroupId:groupId},groupId,true)
                    }else{
                        _this.page=_this.allSpecGroupSize[_this.witchDialog][groupId].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][groupId].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].nowData;
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][groupId].totalItem;
                        _this.btnIsShow()

                    }
            }
        },
        createdSize(){//创建尺码
             let _this=this;
            _this.$validate()
            .then(function (success) {
                if (success) {
                    _this.creatSize.specId=_this.witchSpecgroup[_this.witchDialog].id
                    // console.log(_this.creatSize)
                    _this.$axios.posts('/api/services/app/SpecValueManagement/Create',_this.creatSize)
                    .then(function(res){
                        // value.specgroupId=0;
                        res.result.check=false;
                        res.result.specgroupId=0;
                        res.result.skuId=0
                        _this.allSpecGroupSize[_this.witchDialog]['all'].allData.push(res.result)
                        let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog]['all'].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog]['all'].page)
                        _this.allSpecGroupSize[_this.witchDialog]['all'].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog]['all'].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog]['all'].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog]['all'].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog]['all'].nowData
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog]['all'].totalItem;
                        _this.btnIsShow()
                        _this.innerVisible=false;
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }
            });    
        },
//---------------内层穿梭框------------------
        ifShowInnerDialog(){//点击新增，判断是否是全部，发送不同请求
            let _this=this;
            // _this.innerVisible=true
            
            if(_this.witchSpecgroup[_this.witchDialog].spec=='all'){
                _this.innerVisible=true
            }else if(_this.witchSpecgroup[_this.witchDialog].spec=='one'){
                //生成穿梭框，调用聚合接口，拼接数据，求差集
                // _this.allSpecGroupSize[_this.witchDialog]['all'].initData=_this.allSpecGroupSize[_this.witchDialog][groupId].allData;//纪录打开内层穿梭框之前的当前规格组所有规格
                let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
                //判断是否获取全部数据
                // console.log(_this.allSpecGroupSize[_this.witchDialog]['all'])
                // console.log(_this.allSpecGroupSize[_this.witchDialog]['all'])
                let canChoose=_this.uniqueArrayFn(_this.allSpecGroupSize[_this.witchDialog]['all'].allData,_this.allSpecGroupSize[_this.witchDialog][groupId].allData,'specValueId','specValueId')
                // console.log(_this.allSpecGroupSize[_this.witchDialog]['all'].allData)
                // console.log(_this.allSpecGroupSize[_this.witchDialog][groupId].allData)
                _this.leftTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].allData;//左侧表格数据
                _this.rightTableData=canChoose;//右侧表格数据
                 _this.innerVisible2=true;
            }
        },
        chooseAllSize(){
             let _this=this;
             let groupId=_this.witchSpecgroup[_this.witchDialog]['id'];//当前用户组id
             let data={
               "createList": [
                //  {
                //    "groupId": 1,
                //    "specgroupId": groupId,
                //    "specValueId": 0,
                //    "seq": 0
                //  }
               ],
               "updateList": [],
               "deleteList": [
                //  {
                //    "id": 0
                //  }
               ]
             }
             
             $.each(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,function(index,value){
                var item = {"id": value.specValueId};
                var repeat = false;
                 $.each(_this.leftTableData,function(i,v){
                     if(v.id==value.id){
                        repeat = true;
                     }
                 })
                 if (!repeat) {//获取需要删除的数据
                    data.deleteList.push(item);
                }
             })
             let createdData=[];
             $.each(_this.leftTableData,function(index,value){
                var item = {"groupId": 1,"specgroupId": groupId,"specValueId": value.specValueId,"seq": 0,};
                var repeat = false;
                 $.each(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,function(i,v){
                     if(v.id==value.id){
                        repeat = true;
                     }
                 })
                 if (!repeat) {//获取需要添加的数据
                    data.createList.push(item);
                    createdData.push(value);//存储完整数据，请求成功后使用
                }
             })
             _this.$axios.posts('/api/services/app/SpecgroupContentManagement/CUDAggregate',data)
             .then(function(res){
                //  console.log(res)
                //删除需要删除规格
                if(typeof(res.result.deleteList)!='undefined' && res.result.deleteList.length>0 && res.result.deleteList!=null){
                    _this.allSpecGroupSize[_this.witchDialog][groupId].allData=_this.uniqueArrayFn(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,res.result.deleteList,'specValueId','id')
                }
                if(typeof(res.result.createList)!='undefined' && res.result.createList.length>0 && res.result.createList!=null){
                    $.each(res.result.createList,function(i,v){
                        v.check=false;
                        v.specValueName=v.specValueId_SpecValueName;
                        v.specValueCode=v.specValueId_SpecValueCode;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].allData.push(v);//添加数据
                    })

                } 
                if((typeof(res.result.deleteList)!='undefined' && res.result.deleteList.length>0 && res.result.deleteList!=null) || (typeof(res.result.createList)!='undefined' && res.result.createList.length>0 && res.result.createList!=null)){
                     //数据分页
                     let x=_this.paginationData(_this.allSpecGroupSize[_this.witchDialog][groupId].allData,_this.oneItem,_this.allSpecGroupSize[_this.witchDialog][groupId].page)
                        _this.allSpecGroupSize[_this.witchDialog][groupId].nowData=x.nowData;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalItem=x.TotalItem;
                        _this.allSpecGroupSize[_this.witchDialog][groupId].totalPage=x.TotalPage;

                        _this.page=_this.allSpecGroupSize[_this.witchDialog][groupId].page;
                        _this.totalPage=_this.allSpecGroupSize[_this.witchDialog][groupId].totalPage;
                        _this.sizeTableData=_this.allSpecGroupSize[_this.witchDialog][groupId].nowData;
                        _this.totalItem=_this.allSpecGroupSize[_this.witchDialog][groupId].totalItem;
                        _this.btnIsShow()
                }
                //  console.log(res)
                //  console.log(createdData)
                _this.innerVisible2=false;
             },function(res){
                 _this.showErMsgDialog(res.error.message,res.error.details)
             })
             
        },
        leftSelect(val) {//内层穿梭框选中已选
            let _this=this;
            _this.leftSelectData = val;
            if(val.length==0){
                _this.goRightBtn=true
            }else{
                _this.goRightBtn=false
            }
        },
        rightSelect(val) {//内层穿梭框选中可选
            let _this=this;
            _this.rightSelectData = val;
            if(val.length==0){
                _this.goLeftBtn=true
            }else{
                _this.goLeftBtn=false
            }
        },
        goLeft(){//从右往左添加数据
            let _this=this;
            _this.rightTableData=_this.uniqueArrayFn(_this.rightTableData,_this.rightSelectData,'id','id')
            _this.leftTableData=_this.rightSelectData.concat(_this.leftTableData)
            // console.log(_this.rightSelectData)
        },
        goRight(){//从左往右添加数据
            let _this=this;
            _this.leftTableData=_this.uniqueArrayFn(_this.leftTableData,_this.leftSelectData,'id','id')
            _this.rightTableData=_this.leftSelectData.concat(_this.rightTableData)
        },
//----------------------使用组织------------------
        searchOuTable(){
            let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchTableOu);
            $.each(_this.productOu_ChildTable,function(index,val){
                let str=val.ouName;
                
                let result = patt1.test(str)
                if(result){
                    newJson.push(val)
                }
            })
            let x=_this.paginationData(newJson,_this.ouOneItem,_this.ouPage)
            _this.showPageTableOu=x.nowData
            _this.ouTotalItem=x.TotalItem
            _this.ouTotalPage=x.TotalPage
        },
        getAllOulength(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{SkipCount:0,MaxResultCount:1})
            .then(function(res){
                _this.allOuLength=res.result.totalCount
                // console.log(res)
            })
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
        dialogOuIsShow(){//点击选取按钮
            let _this=this;
            _this.dialogOu=true;
            setTimeout(function(){
                // console.log(_this.storeCheckOu)
               _this.$refs.tree.setCheckedNodes(_this.productOu_ChildTable);
               _this.isCheckAllOu()
            },200)
            
        },
        ouNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            _this.addOu=data.ouId;
        },
        loadOuTreeAll(){//获取组织树形数据
            let _this=this;
            _this.$axios.gets('/api/services/app/Role/GetOuAssignTree',{Id:0})
            .then(function(res){
                _this.ouTreeDataRight=res.result;
                //默认展开第一个子节点
                _this.expandId_dialogOu=_this.defauleExpandTree(res.result,'ouId')
            },function(res){
            })
        },
        ouDialogSure(){//dialog点击确认
            let _this=this;
            _this.dialogOu=false;
            // console.log(_this.$refs.tree.getCheckedKeys())
            // _this.productOu_ChildTable=_this.$refs.tree.getCheckedNodes();
            $.each(_this.$refs.tree.getCheckedNodes(),function(index,val){
                val.remark='';
                val.status=0;
                val.productId=0;
                val.statusTValue='停用'
                val.ouId_OuName=val.ouName;
            })
            _this.productOu_ChildTable=_this.$refs.tree.getCheckedNodes();
            _this.showPageTableOu=_this.paginationOu(_this.productOu_ChildTable,_this.ouOneItem,_this.ouPage)
            // console.log(_this.productOu_ChildTable)
        },
        delCheckOu(row){//删除表格数据
            let _this=this;
            let indexs=null
            $.each(_this.productOu_ChildTable,function(index,val){
                if(val.ouId==row.ouId){
                    indexs=index
                }
            })
            if(indexs!=null){
                _this.productOu_ChildTable.splice(indexs,1)
            }
             _this.showPageTableOu=_this.paginationOu(_this.productOu_ChildTable,_this.ouOneItem,_this.ouPage)
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
                // _this.$refs.tree.setCheckedNodes(_this.productOu_ChildTable);
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
            _this.showPageTableOu=_this.paginationOu(_this.productOu_ChildTable,_this.ouOneItem,_this.ouPage)
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
//----------------------SKU-------------------
       combine(arr) {  
            var r = [];  
            (function f(t, a, n) {  
                if (n == 0) return r.push(t);  
                for (var i = 0; i < a[n-1].length; i++) {  
                    f(t.concat(a[n-1][i]), a, n - 1);  
                }  
            })([], arr, arr.length);  
            return r;  
        },
        delSKU(index){
            let _this=this;
            _this.sku_ChildTable.splice(index,1)
        },
        buildSKU(){//生成sku
            let _this=this;
            let buildSkuData=[]
            let productPicture_ChildTable=[]
            let firstPictureRowId=''
            _this.productPicture_ChildTable=[]
            _this.skuData=[]
            _this.skuTableHeader=[]
            _this.sku_ChildTable=[]
            let productName=_this.product_MainTable.productName;
            let productCode=_this.product_MainTable.productCode;
             $.each(_this.productSpec_ChildTable,function(index,value){//纪录规格孙表长度大于一首次出现的规格从表，用于生产图片
                 if(value.productSpecValue_GrandTable.length>0){
                    firstPictureRowId=value.specId
                    return false
                 }
             })
            //  console.log(firstPictureRowId)
            $.each(_this.productSpec_ChildTable,function(index,value){
                _this.skuTableHeader.push({specId:value.itemSourceId,specId_SpecName:value.specName});//获取表头数据
                if(value.productSpecValue_GrandTable.length>0){
                    buildSkuData.push(value.productSpecValue_GrandTable)
                }
                
            })
            _this.skuData=_this.combine(buildSkuData)
            
            $.each(_this.skuData,function(index,val){
                    let skuCode='';
                    let skuName='';
                    $.each(val,function(i,v){//sku编码，sku名称,条码
                    
                        skuCode=v.specValueCode.concat(skuCode);
                        skuName=v.specValueName.concat(skuCode);

                        if(v.specId==firstPictureRowId){//只有第一个规格才需要图片
                        // console.log(v.specId+'~'+v.specValueName+'~'+firstPictureRowId)
                            let pictureItem={
                                "specId_SpecName":v.specId_SpecName ,//颜色，尺码
                                "specId":v.specId,
                                'specValueId':v.specValueId,
                                "groupId":_this.product_MainTable.groupId,
                                "specValueName":v.specValueName,
                                "productId":0,
                                "productPicture":[],
                            }
                            // specValueId
                            let repeat=false
                            
                            $.each(productPicture_ChildTable,function(i1,v1){
                                if(v.specValueId==v1.specValueId){
                                    repeat=true
                                }
                            })
                            if(!repeat){
                                productPicture_ChildTable.push(pictureItem)
                            }
                            
                        }
                    })
                    if(val.length!=0){
                        let skuItem={//sku
                            barcode:productCode+skuCode,
                            discount:_this.product_MainTable.discount,
                            groupId:_this.product_MainTable.groupId,
                            id:0,
                            productId:0,
                            purchasePrice:_this.product_MainTable.purchasePrice,
                            retailPrice:_this.product_MainTable.retailPrice,
                            skuCode:productCode+skuCode,
                            skuName:productName+skuName,
                            skuSpecValue_GrandTable:val,
                            status:0,
                            statusTValue:'停用',
                            isUse:false,//允许使用
                            unitId:_this.product_MainTable.unitId,
                            vipPrice:_this.product_MainTable.vipPrice,
                            wholePrice:_this.product_MainTable.wholePrice,
                        }
                        _this.sku_ChildTable.push(skuItem)
                    }
                   
            })
            _this.productPicture_ChildTable=productPicture_ChildTable
            // console.log(_this.productPicture_ChildTable)
        },
        changeIsUse(data){
           let _this=this;
           if(data.isUse){
              data.status=1;
              data.statusTValue='启用'
           }else{
              data.status=0;
              data.statusTValue='停用'
           }
        },
//----------------------图片------------------
        onEnd(ev){
            // ev.newIndex
            // console.log(this.productPicture_ChildTable)
            console.log(ev.newIndex)
        },
        fileClick(e) {
          $(e.target).parents('.batchUpload').find('.upload_file').click()
        },
        uploadpic(e,item){
             var _this = this
            _this.progressShow=true;
            _this.precent=0
        if($(e.target).val()!=''){
            let file = e.target.files
            /* eslint-disable no-undef */
            let param = new FormData()  // 创建form对象
            $.each(file,function(index,val){
                param.append('files', val)
            })
            param.append('chunk', '0') // 添加form表单中其他数据
            _this.$axios.uploadPhoto('/Home/UploadImage', param,function(res){
            let loaded = res.loaded,
            total = res.total;
            _this.$nextTick(() =>{//进度条
              _this.precent = Math.ceil(loaded/total)* 100  ;//上传进度条
             })
            }).then(response => {
                let getBaseURL=_this.$axios.getBaseURL();
                if(response.result.length>0){
                    $.each(response.result,function(index,value){
                        if(value.isSuccess){
                            let isMain=false
                            let imagePath=value.imagePath;
                            $.each(item.productPicture,function(index,value){
                                if(value.isMain){
                                    isMain=true
                                    return false
                                }
                            })
                            let url=getBaseURL+imagePath;
                            let picture={
                                "id": 0,
                                "groupId":  item.groupId,
                                "productId": _this.product_MainTable.id,//商品ID 
                                "specId": item.specId,//规格ID 
                                "specValueId":item.specValueId,//规格值id
                                "specId_SpecName":item.specId_SpecName,
                                "pictureUrl": url,
                                "chooseImg":true,
                                "pictureCode": item.specValueName,// 图片代码
                                "pictureName": item.specValueName,//图片名
                                "isMain": !isMain,//是否主图 
                                "seq": 1
                            }
                            item.productPicture.push(picture)
                        }else{
                            alert('第'+index+'张图片上传失败')
                        }
                    })
                }else{
                    alert('上传失败')
                }
                $(e.target).val('')
                 _this.progressShow=false;
                 _this.precent=0
            },response => {
                alert('上传失败')
                $(e.target).val('')
                 _this.progressShow=false;
                 _this.precent=0
            })
        }
    },
       
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null 
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!==''){
                return [data[0][key]]
            }
        },
        renderContent_categoryId(h, { node, data, store }){
             if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.categoryName}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.categoryName}
                    </span>
                );
            }
        },
        renderContent_unitId(h, { node, data, store }){
             if(typeof(data.unitGroup)!='undefined' && data.unitGroup!=null && data.unitGroup.length>0){
                return (
                    <span class="el-tree-node__label">
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.unitName}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label">
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.unitName}
                    </span>
                );
            }
        },
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
    }
}   
  
  </script>

<style>
.goodsFilesDetail{
    font-family: 'microsoft yahei';
}
.goodsFilesDetail .bgcolor.longWidth{
    width: 505px;
    height:auto;
 }
.goodsFilesDetail .bgcolor.longWidth .el-textarea{
    width: calc(100% - 94px);
    font-size: 12px;
 } 
 .bgcolor.longWidth>label:first-child{
    width:84px;
    height: 35px;
 }
 .bgcolor.longWidth .el-checkbox+.el-checkbox{
     margin-left: 0;
 }
/*表单提示信息*/
.goodsFilesDetail  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}

.goodsFilesDetail .elRow{
    padding:15px 0;
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
}
.goodsFilesDetail .el-row:last-child{
      border-bottom:none;
  }
.goodsFilesDetail .fixed{
      padding:0;
      border-bottom:none;
      background-color: #fff;
  }
 .goodsFilesDetail .getPadding,.tabZoo .el-tabs__nav-scroll{
     padding: 0 10px;
 }
 /* .goodsFilesDetail .tabZoo .el-tabs__active-bar{
     width: 28px!important;
 } */

.goodsFilesDetail .nopadding{
    padding-top: 0;
    padding-bottom: 0;
}
.goodsFilesDetail .bgcolor .el-select .el-input input{
    height: 35px!important;
}
/* ---------dialog选择尺码---------- */
.add_size .add_size_footer{
    text-align: center;
    padding-bottom: 15px;
}
.goodsFilesDetail .choose_size .el-dialog,
.add_size .el-dialog{
    border-radius: 0!important;
}
.goodsFilesDetail .choose_size .el-dialog .el-dialog__body{
    padding: 0 20px;
}
.goodsFilesDetail ._body_left{
    border-right: 1px solid #e4e4e4;
    height: 500px;
}
.goodsFilesDetail ._body_right{
    height: 500px;
}
.goodsFilesDetail ._body_right ._right_body .show_size{
    width: 38px;
    height: 38px;
    border-radius: 3px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    display: block;
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    border-width: 1px;
    border-style: solid;
    /* border: 1px solid #e4e4e4; */
    cursor: pointer;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
}
.goodsFilesDetail ._body_right ._right_body .show_size.addSize{
    background-color: #e4e4e4;
}
.goodsFilesDetail ._body_right ._right_body .show_size.addSize .x,
.goodsFilesDetail ._body_right ._right_body .show_size.addSize .y{
    display: block;
    background: #999999;
    position: absolute;
    width: 1px;
    height:23px;
    left: 50%;
    top: 8px;
}
.goodsFilesDetail ._body_right ._right_body .show_size .y{
    transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -moz-transform:rotate(90deg); 
}
.goodsFilesDetail ._body_right ._right_body .show_size.addSize{
    font-size: 40px;
}
.goodsFilesDetail ._body_right ._right_body .show_size i.fa-check-square{
    position: absolute;
    color: #33cc66;
    top: -1px;
    left: -1px;
}
.goodsFilesDetail .showGoodsDialog{
    width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    cursor: pointer;
    text-align: center;
    background-color: #fff;
    border: 1px solid #c2cad8;
    border-radius: 3px;
    outline: none;
    float: right;
}
.goodsFilesDetail .showGoodsDialog:focus{
    outline: none;
}
.goodsFilesDetail .sizeNameBtn{
    display: block;
    width: 59px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    background-color: #e4e4e4;
    position: relative;
    border-radius: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.goodsFilesDetail .sizeNameWrapper{
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
    width: 59px;
    height: 22px;
    margin-right: 10px;
    float: left;
    position: relative;
    cursor: pointer;
}
.goodsFilesDetail .sizeNameWrapper:hover .delSize{
    display: block;
}
.goodsFilesDetail .sizeNameWrapper .delSize{
    display: none;
    width: 12px;
    height: 12px;
    position: absolute;
    top: -3px;
    right: -3px;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    line-height: 12px;
    cursor: pointer;
    border-radius: 50%;
    color: #fff;
    background-color: #f55e6e;
    z-index: 2;
}
.goodsFilesDetail ._body_right ._right_body .show_size:hover{
    border: 1px solid #33cc66;
}
.goodsFilesDetail ._body_right ._right_body{
    height: 450px;
}
.goodsFilesDetail ._body_right ._right_footer{
    line-height: 50px;
    height: 50px;
    padding-left: 15px;
}
.goodsFilesDetail ._body_right ._right_footer ._footer_bt{
    float: left;
}
.goodsFilesDetail ._body_right ._right_footer ._footer_page{
    float: right;
}
/* .goodsFilesDetail .el-tabs__header{
    margin: 0;
} */
.goodsFilesDetail .add{
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
.goodsFilesDetail .checkBoxOuUser{
     height: 50px;
     background-color: #f2f2f2;
     line-height: 50px;
 }
 /* .goodsFilesDetail .transfer_dialog .el-dialog__body{
     overflow: inherit;
 } */
 .goodsFilesDetail .show_size .el-checkbox__input{
    position: absolute;
    top: -1px;
    left: 0;
 }
 .goodsFilesDetail .show_size .el-checkbox__inner{
     width: 10px;
     height: 10px;
     border-radius: 0;
     border: none;
     
 }
 .goodsFilesDetail .show_size .el-checkbox__inner::after {
    left: 1px!important;
    top: -6px!important;
    border: 1px solid #fff;
}
.goodsFilesDetail .show_size .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #33cc66;
}
.goodsFilesDetail .show_size .el-checkbox__label{
    display: inline;
    padding: 0;
}
.goodsFilesDetail .show_size .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #33cc66;
}
.goodsFilesDetail .show_size.el-checkbox.is-bordered.is-checked{
    border-color:#33cc66;
}
.redColor{
    color: red;
}
.sizeName{
    cursor: pointer;
}
.goodsFilesDetail .uploadHeader{
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    background-color: #f1f4f7;
    padding:0 10px;
}
.goodsFilesDetail .uploadHeader .leftSpec{
    float: left;
}
.goodsFilesDetail .uploadHeader .leftSpec label{
    color: #999DA6;
}
.goodsFilesDetail .uploadHeader .leftSpec span{
    color: #333333;
}
.goodsFilesDetail .uploadHeader .batchUpload{
    float: right;
    cursor: pointer;
    color: #999DA6;
}
.goodsFilesDetail .uploadHeader .batchUpload:hover{
    color: #33CCCC;
}
.goodsFilesDetail .pictureWrapper{
    min-height: 141px;
}
</style>
  
