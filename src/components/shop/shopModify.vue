<template>
    <div class="shop-modify">
        <el-row class="fixed">
            <el-col :span="24" class="bg-white">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
                <span @click="ifShow = !ifShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
            </el-col>
        </el-row>
        
        <el-collapse-transition>
            <div v-show="ifShow">   
                <el-row class="bg-white ft12 pr10 pt10">
                    <el-col :span="24" class="getPadding"> 
                        <div class="tipsWrapper" name="ouId">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.ouId')}">
                                <p class="msgDetail">错误提示：所属组织{{ validation.firstError('shopData.ouId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopCode">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopCode')}">
                                <p class="msgDetail">编码{{ validation.firstError('shopData.shopCode') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopName">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopName')}">
                                <p class="msgDetail">名称{{ validation.firstError('shopData.shopName') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopFullname">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopFullname')}">
                                <p class="msgDetail">全称{{ validation.firstError('shopData.shopFullname') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopWorkPropertyid">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopWorkPropertyid')}">
                                <p class="msgDetail">店铺性质{{ validation.firstError('shopData.shopWorkPropertyid') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="stockId">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.stockId')}">
                                <p class="msgDetail">对应仓库{{ validation.firstError('shopData.stockId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopGradeId">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopGradeId')}">
                                <p class="msgDetail">店铺等级{{ validation.firstError('shopData.shopGradeId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="openingDate">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.openingDate')}">
                                <p class="msgDetail">开店日期{{ validation.firstError('shopData.openingDate') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="opAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.opAreaId')}">
                                <p class="msgDetail">业务地区{{ validation.firstError('shopData.opAreaId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="adAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.adAreaId')}">
                                <p class="msgDetail">行政地区{{ validation.firstError('shopData.adAreaId') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="manager">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.manager')}">
                                <p class="msgDetail">负责人{{ validation.firstError('shopData.manager') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="phone">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.phone')}">
                                <p class="msgDetail">电话{{ validation.firstError('shopData.phone') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="tradingAreaid">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.tradingAreaid')}">
                                <p class="msgDetail">商圈{{ validation.firstError('shopData.tradingAreaid') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="status">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.status')}">
                                <p class="msgDetail">状态{{ validation.firstError('shopData.status') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="shopAddress">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.shopAddress')}">
                                <p class="msgDetail">店铺地址{{ validation.firstError('shopData.shopAddress') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="longitude">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.longitude')}">
                                <p class="msgDetail">经度{{ validation.firstError('shopData.longitude') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="latitude">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.latitude')}">
                                <p class="msgDetail">纬度{{ validation.firstError('shopData.latitude') }}</p>
                            </div>
                        </div>

                        <div class="tipsWrapper" name="remark">
                            <div class="errorTips" :class="{block : !validation.hasError('shopData.remark')}">
                                <p class="msgDetail">备注{{ validation.firstError('shopData.remark') }}</p>
                            </div>
                        </div>
                                

                        <div class="bgcolor">
                            <label><small>*</small>所属组织</label>
                            <el-select v-model="shopData.ouId"
                                    placeholder=""
                                    class="ouId"
                                    @focus="showErrprTipsSelect"
                                    @change='Modify()'
                                    :class="{redBorder : validation.hasError('shopData.ouId')}">

                                <el-input placeholder="搜索..."
                                            class="selectSearch"
                                            v-model="ouSearch"></el-input>  

                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                            :data="ouAr"
                                            :props="selectOuProps"
                                            node-key="id"
                                            ref="outree"
                                            :filter-node-method="ouFilterNode"
                                            highlight-current
                                            :render-content="renderContentOu"
                                            :default-expanded-keys="ouExpandId"
                                            :expand-on-click-node="false"
                                            @node-click="ouNodeClick"></el-tree> 

                                <el-option v-show="false"
                                            :key="countOu.id" 
                                            :label="countOu.ouName" 
                                            :value="countOu.id"
                                            id="ou_confirmSelect"></el-option>
                            </el-select>
                        </div> 


                        <div class="bgcolor">
                            <label><small>*</small>编码</label>
                            <el-input v-model="shopData.shopCode" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('shopData.shopCode')}"
                                    class="shopCode"
                                    @change='Modify()'></el-input>
                        </div>


                        <div class="bgcolor">
                            <label><small>*</small>名称</label>
                            <el-input v-model="shopData.shopName" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('shopData.shopName')}"
                                    class="shopName"
                                    @change='Modify()'></el-input>
                        </div>


                        <div class="bgcolor">
                            <label><small>*</small>全称</label>
                            <el-input v-model="shopData.shopFullname" 
                                    placeholder=""
                                    @focus="showErrprTips"
                                    :class="{redBorder : validation.hasError('shopData.shopFullname')}"
                                    class="shopFullname" 
                                    @change='Modify()'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label><small>*</small>店铺性质</label>
                            <el-select v-model="shopData.shopWorkPropertyid"
                                    placeholder=""
                                    @change='Modify()'
                                    @focus="showErrprTipsSelect"
                                    class="shopWorkPropertyid"
                                    :class="{redBorder : validation.hasError('shopData.shopWorkPropertyid')}">
                                <el-option v-for="item in propertyAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label>对应仓库</label>
                            <el-select  v-model="shopData.stockId" :filter-method="filterStockMethod" clearable filterable>
                                <el-option
                                v-for="item in stockFilter"
                                :key="item.id"
                                :label="item.stockName"
                                :value="item.id"
                                @change='Modify()'
                                @focus="showErrprTipsSelect"
                                :class="{redBorder : validation.hasError('createShopParams.stockId')}"
                                :disabled="shopData.shopWorkPropertyid === 1"
                                >
                                <span style="float: left">{{ item.stockName }}</span>
                                <span style="float: right;">{{ item.stockCode }}</span>
                                </el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label>店铺等级</label>
                            <el-select v-model="shopData.shopGradeid"
                                    placeholder=""
                                    @change='Modify()'
                                    @focus="showErrprTipsSelect"
                                    class="shopGradeid"
                                    :class="{redBorder : validation.hasError('shopData.shopGradeid')}">
                                <el-option v-for="item in gradeAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>
                        
                        <div class="bgcolor">
                            <label>开店日期</label>
                            <el-date-picker v-model="shopData.openingDate" 
                                            type="date" 
                                            @focus="showErrprTips"
                                            class="openingDate"
                                            @change='Modify()'
                                            :class="{redBorder : validation.hasError('shopData.openingDate')}"
                                            placeholder=""></el-date-picker>
                        </div>

                        <div class="bgcolor">
                            <label>业务地区</label>
                            <el-select v-model="shopData.opAreaId"
                                        class="opAreaId"
                                        @focus="showErrprTipsSelect"
                                        placeholder=""
                                        @change='Modify()'
                                        :class="{redBorder : validation.hasError('shopData.opAreaId')}">
                                <el-input placeholder="搜索..."
                                        class="selectSearch"
                                        v-model="opSearch"></el-input>
                                <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none" 
                                            :data="opAr"
                                            :props="selectOpProps"
                                            node-key="id"
                                            default-expand-all
                                            ref="tree"
                                            :filter-node-method="filterNode"
                                            :expand-on-click-node="false"
                                            @node-click="opNodeClick"></el-tree>
                                <el-option v-show="false"
                                            :key="countOp.id" 
                                            :label="countOp.areaName" 
                                            :value="countOp.id"
                                            id="op_confirmSelect"></el-option>
                                <!-- <el-option v-show='false' label=''></el-option> -->
                            </el-select>
                        </div>

                        <!-- <div class="bgcolor area">
                            <label>行政地区</label>
                            <div class="areaBox">
                                <el-select v-model="shopData.adAreaId" class="areaDrop" placeholder="选择省">
                                    <el-option v-for="item in areaProArray" :key="item.id" :label="item.areaName" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="shopData.adAreaId" class="areaDrop" placeholder="选择市">
                                    <el-option v-for="item in areaCityArray" :key="item.basOuTypes" :label="item.label" :value="item.basOuTypes">
                                    </el-option>
                                </el-select>
                                <el-select v-model="shopData.adAreaId" class="areaDrop" placeholder="选择区">
                                    <el-option v-for="item in areaDisArray" :key="item.basOuTypes" :label="item.label" :value="item.basOuTypes">
                                    </el-option>
                                </el-select>
                                <el-input class="areaEntry" placeholder="街道办地址"></el-input>
                            </div>

                        </div> -->

                        <div class="bgcolor area">
                            <label>行政地区</label>
                            <div class="areaBox">
                                <el-select v-model="proId" class="areaDrop" placeholder="选择省" @change='chooseProvince(proId)'>
                                    <el-option v-for="item in areaProArray" :key="item.id" :label="item.areaName" :value="item.id">
                                    </el-option>
                                    <el-option v-show="false" label="无" :value="provinceValue">
                                    </el-option>
                                </el-select>
                                <el-select v-model="cityId" class="areaDrop" placeholder="选择市" @change='chooseCity(cityId)'>
                                    <el-option v-for="item in areaCityArray" :key="item.id" :label="item.areaName" :value="item.id">
                                    </el-option>
                                    <el-option v-show="false" label="无" :value="cityValue">
                                    </el-option>
                                </el-select>
                                <el-select v-model="shopData.adAreaId" class="areaDrop" placeholder="选择区" @change='chooseDis()'>
                                    <el-option v-for="item in areaDisArray" :key="item.id" :label="item.areaName" :value="item.id">
                                    </el-option>
                                    <el-option v-show="false" label="无" :value="areaValue">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                        <div class="bgcolor">
                            <label>负责人</label>
                            <el-input v-model="shopData.manager" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="manager"
                                        :class="{redBorder : validation.hasError('shopData.manager')}"
                                        @change='Modify()'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>电话</label>
                            <el-input v-model="shopData.phone" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="phone"
                                        :class="{redBorder : validation.hasError('shopData.phone')}"
                                        @change='Modify()'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>商圈</label>
                            <el-select v-model="shopData.tradingAreaid"
                                        placeholder=""
                                        @change='Modify()'
                                        @focus="showErrprTipsSelect"
                                        class="tradingAreaid"
                                        :class="{redBorder : validation.hasError('shopData.tradingAreaid')}">
                                <el-option v-for="item in busAr" 
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>  

                        <div class="bgcolor">
                            <label>状态</label>
                            <el-select v-model="shopData.status"
                                        class="status"
                                        placeholder=""
                                        @change='Modify()'
                                        @focus="showErrprTipsSelect"
                                        :class="{redBorder : validation.hasError('shopData.status')}">
                                <el-option v-for="item in statusAr"  
                                        :key="item.itemValue" 
                                        :label="item.itemName" 
                                        :value="item.itemValue"></el-option>
                            </el-select>
                        </div>

                        <div class="bgcolor">
                            <label>店铺地址</label>
                            <el-input v-model="shopData.shopAddress" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="shopAddress"
                                        :class="{redBorder : validation.hasError('shopData.shopAddress')}"
                                        @change='Modify()'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>经度</label>
                            <el-input v-model="shopData.longitude" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="longitude"
                                        :class="{redBorder : validation.hasError('shopData.longitude')}"
                                        @change='Modify()'></el-input>
                        </div>

                        <div class="bgcolor">
                            <label>纬度</label>
                            <el-input v-model="shopData.latitude" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="latitude"
                                        :class="{redBorder : validation.hasError('shopData.latitude')}"
                                        @change='Modify()'></el-input>
                        </div>
                        
                        <div class="bgcolor">
                            <label>备注</label>
                            <el-input v-model="shopData.remark" 
                                        placeholder=""
                                        @focus="showErrprTips"
                                        class="remark"
                                        :class="{redBorder : validation.hasError('shopData.remark')}"
                                        @change='Modify()'></el-input>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>     

        <!-- bootTab标签页 -->
        <el-row class="nopadding mt10"> 
            <div class="tabZoo">
                <el-col :span="24">
                <el-tabs v-model="activeName">
                        <el-tab-pane label="联系人" name="contact" class="getPadding" style="z-index:-10">
                            <!-- <button class="erp_bt bt_add" @click="addCol">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_add.png">
                                </div>
                                <span class="btDetail">增行</span>
                            </button>
                            
                            <button class="erp_bt bt_del" @click="delMore(2)">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_del.png">
                                </div>
                                <span class="btDetail">删除</span>
                            </button>

                            <button class="erp_bt bt_auxiliary mb10">
                                <div class="btImg">
                                    <img src="../../../static/image/common/bt_auxiliary.png">
                                </div>
                                <span class="btDetail">辅助功能</span>
                            </button> -->
                            <buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1'></buttonGroup>
                            
                    
                            <el-table :data="contactData" stripe border style="width: 100%" @selection-change="handleSelectionChange" class="all-table mt5">
                                <el-table-column type="selection"></el-table-column>

                                <el-table-column prop="contactPerson" label="联系人" width="180">
                                    <template slot-scope="scope">
                                        <img v-show='redAr.indexOf(scope.row)>=0' class="abimg" src="../../../static/image/content/redremind.png"/>
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.contactPerson" 
                                            type="text"
                                            @change="handleChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="sex" label="性别" width="180">
                                    <template slot-scope="scope">
                                        <el-select  v-model="scope.row.sex" :class="[scope.$index%2==0?'bgw':'bgp']">
                                            <el-option  v-for="item in sexAr" :key="item.itemValue" :label="item.itemName" :value="item.itemValue" >
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="position" label="职位" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.position" 
                                            type="text"    
                                            @change="handleChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column prop="mobile" label="手机" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.mobile" 
                                            type="text"    
                                            @change="handleChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                
                                <el-table-column prop="isDefault" label="默认" >
                                    <template slot-scope="scope">
                                        <el-radio  :label="true" 
                                                    v-model="scope.row.isDefault" 
                                                    @change.native="getCurrentRow(scope.$index,scope.row)" 
                                                    @change="handleChange(scope.$index,scope.row)"></el-radio>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="remark" label="备注" width="180">
                                    <template slot-scope="scope">
                                        <input class="input-need" 
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                                            v-model="scope.row.remark" 
                                            type="text"   
                                            @change="handleChange(scope.$index,scope.row)"/> 
                                    </template>
                                </el-table-column>

                                <el-table-column label='操作'>
                                    <template slot-scope="scope" >
                                        <el-button @click="handleDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
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
                        <el-input v-model="shopData.createdBy" placeholder="" disabled="disabled"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="shopData.createdTime" :disabled="true"></el-input>                             
                        <!-- <el-date-picker v-model="shopData.createdTime" type="date" placeholder="" disabled="disabled"></el-date-picker> -->
                    </div>

                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input v-model="shopData.modifiedBy" placeholder="" disabled="disabled"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="shopData.modifiedTime" :disabled="true"></el-input>                                                     
                        <!-- <el-date-picker v-model="shopData.modifiedTime" type="date" placeholder="" disabled="disabled"></el-date-picker> -->
                    </div>
                </div>                                  
            </el-col>
        </el-row>

        <!-- dialog数据变动提示 -->
        <!-- <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog> -->
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
        <!-- <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
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
        </el-dialog> -->
        <!-- dialog -->   
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
                                                                     
    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
import {FILTER_MOTHED} from '../../common/common.js'
export default({
    name:'shopModify',
    components:{
        buttonGroup,
        dialogBox
    },
    created:function(){
        let self = this;
        self.loadData();
        self.loadSelect();
    },
    data() {
        return{
            getOuId:'',//进入页面获取的ouid
            ifShow:true,
            radio:'',
            firstModify:false,//
            firstChildModify:false,
            ifModify:false,//判断主表是否修改过
            // ifDoModify:false,//判断从表是否修改过
            backCancel:'',
            c:false,//判断从表是否修改过
            ifUp:false,//判断从表是否为修改
            //---所属组织树形下拉-----
                ouSearch:'',
                selectOuProps:{
                    children: 'children',
                    label: 'ouName',
                    id:'id'
                },
                ouItem:{
                    id:'',
                    ouName:'',
                },
                ouAr:[],//所属组织下拉框
                ouExpandId:[],//默认展开第一个树节点
            //-----------------------

            //---行政地区树形下拉-----
                areaProArray:[],//行政地区(省)
                areaCityArray:[],//行政地区(市)
                areaDisArray:[],//行政地区(区)
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
            //-----------------------
            //---普通下拉------------
            propertyAr:[],//店铺性质下拉框
            stockAr:[],//对应仓库
            stockIdValue:'',//获取的对应仓库不存在时，保存为0
            gradeAr:[],//店铺等级下拉框
            statusAr:[],//状态下拉框
            sexAr:[],//性别下拉
            busAr:[],//商圈下拉
            //-----------------------
  
            activeName: 'contact',//tabs标签页默认激活name

            shopData:'',//根据id获得的店铺信息
            contactData:[],//从表数据
            addList:[],//新增联系人
            
            x:0,
            xrows:[],

            multipleSelection:[],//需要删除的数组
            

            idArray:{//银行多项删除的id
                ids:[]
            },
            allDelArray:{
                ids:[]
            },

            // checkedAr:[],//进来时数据选中的默认框
            //---确认删除-----------------               
            dialogDelConfirm:false,//用户删除保存提示信息
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
            whoId:'',//单项删除的id
            whoIndex:'',//单项删除的index
            provinceValue:0,
            cityValue:0,
            areaValue:0,
            proId:'',
            cityId:'',
            disId:'',
            filterStockKey:'',
            //-----------------------------
            redAr:[],//显示小红标的数组
            InitData:[],//初始的从表数据
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
            //---dialog------------
            dialogSetting:{
                message:'',//提示信息
                dialogName:'',//对话框名称
                dialogType:'',//对话框类型
            },
            errorTips:{//对话框 错误提示
                message:'',
                details:'',
            },
            dialogVisible:false,
            dialogCommand:[],//底部按钮组控制组

        }
    },
    validators: {
        'shopData.ouId': function (value) {//所属组织
            return this.Validator.value(value).required().integer();
        },
        'shopData.shopCode': function (value) {//编码
            return this.Validator.value(value).required().maxLength(50);
        },
        'shopData.shopName': function (value) {//名称
            return this.Validator.value(value).required().maxLength(50);
        },
        'shopData.shopFullname': function (value) {//全称
            return this.Validator.value(value).required().maxLength(50);
        },
        'shopData.shopWorkPropertyid': function (value) {//店铺性质
            return this.Validator.value(value).integer();
        },
        'shopData.stockId': function (value) {//对应仓库
            return this.Validator.value(value).integer();
        },
        'shopData.shopGradeid': function (value) {//店铺等级
            return this.Validator.value(value).integer();
        },
        'shopData.openingDate': function (value) {//开店日期
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.opAreaId': function (value) {//业务地区
            return this.Validator.value(value).integer();
        },
        'shopData.adAreaId': function (value) {//行政地区
            return this.Validator.value(value).integer();
        },
        'shopData.manager': function (value) {//负责人
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.phone': function (value) {//电话
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.tradingAreaid': function (value) {//商圈
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.status': function (value) {//状态
            return this.Validator.value(value).integer();
        },
        'shopData.shopAddress': function (value) {//店铺地址
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.longitude': function (value) {//经度
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.latitude': function (value) {//纬度
            return this.Validator.value(value).maxLength(50);
        },
        'shopData.remark': function (value) {//备注
            return this.Validator.value(value).maxLength(200);
        },
        
    },
    computed:{
        countOu () {
            return this.ouItem;
        },
        countOp () {
            return this.opItem;
        },
        stockFilter: function () {//下拉数据自定义搜索过滤 店铺
            console.log(this.filterStockKey)
            return FILTER_MOTHED(this.filterStockKey,this.stockAr)
        },

    }, 
    watch:{
        ifModify:{
            handler:function(){
                let self = this;
                if(self.ifModify == true){
                    self.buttonGroup[1].disabled = true;
                    self.buttonGroup[2].disabled = true;
                    self.buttonGroup[3].disabled = false;
                    self.buttonGroup[4].disabled = false;
                    self.buttonGroup[5].disabled = false;
                }else{
                    self.buttonGroup[1].disabled = false;
                    self.buttonGroup[2].disabled = false;
                    self.buttonGroup[3].disabled = true;
                    self.buttonGroup[4].disabled = true;
                    self.buttonGroup[5].disabled = true;
                }
            },
            deep:true,
        },
        shopData:{
            handler:function(val,oldVal){
                let self = this;
                if(!self.firstModify){
                    self.firstModify = !self.firstModify;
                }else{
                    self.ifModify = true;
                } 
                    
            },
            deep: true,
        },
        contactData:{
            handler:function(val,oldVal){
                let self = this;
                if(!self.firstChildModify){
                    self.firstChildModify = !self.firstChildModify;
                }else{
                    self.ifModify = true;
                }
                
                self.redAr = [];
                for(let i in val){
                    let flag= true;
                    for(let j in self.InitData){
                        if(val[i].contactPerson  == self.InitData[j].contactPerson &&
                            val[i].mobile  == self.InitData[j].mobile &&
                            val[i].phone == self.InitData[j].phone&&
                            val[i].isDefault  == self.InitData[j].isDefault &&
                            val[i].remark  == self.InitData[j].remark &&
                            val[i].position  == self.InitData[j].position &&
                            val[i].phone == self.InitData[j].phone&&
                            val[i].sex  == self.InitData[j].sex &&
                            val[i].id  == self.InitData[j].id ){
                                flag = false;
                            }
                    } 
                    if(flag){
                        console.log(val[i])
                        self.redAr.push(val[i])
                    }
                }
                console.log(self.redAr)
            },
            deep: true,
        },
        
    },
    methods:{
        filterStockMethod(query){
            this.filterStockKey=query
        },
        //---获取数据--------------------------------------------
        loadData:function(){
            let self = this;
            if(self.$route.params.id!='default'){
                //根据id获得的客户信息
                this.$axios.gets('/api/services/app/ShopManagement/Get',{id:self.$route.params.id}).then(function(res){
                    console.log(res)
                    //---对返回数据进行保存------------
                    self.shopData = res.result;
                    self.contactData = res.result.shopContacts;
                    self.InitData = self.deepCopy(res.result.shopContacts);
                    self.getOuId = self.shopData.ouId;//保存加载时获取的ouid
                    
                    //-------------------------------
                    self.shopData.createdTime=self.resdatetime(new Date(self.shopData.createdTime));
                    self.shopData.modifiedTime=self.resdatetime(new Date(self.shopData.modifiedTime));    
                    self.ifModify = false;                    



                    //---处理经纬度返回为0-------
                    if(self.shopData.longitude==0){
                        self.shopData.longitude = '';
                        self.ifModify = false;
                    }
                    if(self.shopData.latitude==0){
                        self.shopData.latitude = '';
                        self.ifModify = false;
                    }
                    //--------------------------

                    //---业务地区返回为0或者为数字||业务地区下拉框无数据-----
                    self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:self.getOuId}).then(function(res){
                        console.log(res);
                        if(res.result&&res.result.length>0){
                            self.opAr = res.result;
                            self.loadIcon();
                        }else{
                            // console.log("heheheheheheh")
                            self.shopData.opAreaId = '';
                            self.opItem.areaName = '无';
                            self.opItem.id = '';
                            self.ifModify = false;
                        }
                        
                    },function(res){
                        // console.log('xixixixixixi')
                        self.shopData.opAreaId = '';
                        self.opItem.areaName = '无';
                        self.opItem.id = '';
                        self.ifModify = false;
                    });

                    if(self.shopData.opAreaId == 0){
                        // console.log('hahahahahh')
                        self.shopData.opAreaId = '';
                        self.opItem.areaName = '无';
                        self.opItem.id = '';
                        self.ifModify = false;
                    }
                    //-------------------------------

                    //--店铺等级返回为0---------------
                    if(self.shopData.shopGradeid == 0){
                        self.shopData.shopGradeid = '';
                        self.ifModify = false;
                    }
                    //------------------------------

                    //---开店日期扯淡----------------
                    if(self.shopData.openingDate.indexOf('3000')!= -1||self.shopData.openingDate.indexOf('3001')!= -1){
                        self.shopData.openingDate = '';
                        self.ifModify = false;
                    }
                    //------------------------------


                    //---处理仓库id返回查不到仓库，显示为数字的情况---
                    self.$axios.gets('/api/services/app/StockManagement/Get',{Id:res.result.stockId}).then(function(res){
                        console.log(res);
                        // self.stockAr = res.result.items;
                    },function(res){
                        console.log('err'+res)
                        self.stockIdValue = 0;
                        self.shopData.stockId = 0;
                    });
                    //--------------------------------------------

                    //---从表性别为0------------------
                    for(let i in self.contactData){
                        if(self.contactData[i].sex == 0){
                            self.contactData[i].sex = '';
                        }
                    }
                    //-------------------------------
                    
                    //---获取行政地区省级下拉框--------
                    self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                        // console.log(res);
                        self.areaProArray = res.result;
                        // self.loadIcon();
                    },function(res){
                        console.log('err'+res)
                    });
                    //------------------------------

                    //---根据区id反向获得行政地区所有资料
                    self.$axios.gets('/api/services/app/AdAreaManagement/Get',{Id:res.result.adAreaId}).then(function(res){
                        //console.log(res);
                        let ids = res.result.areaFullPathId;
                        let newid = ids.split('>')
                        //---保存获取的省市区id
                        self.proId = parseInt(newid[0]);
                        self.cityId = parseInt(newid[1]);
                        self.disId = parseInt(newid[2]);

                        //根据省获得市
                        self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:self.proId}).then(function(res){
                            // console.log(res);
                            self.areaCityArray = res.result;
                        },function(res){
                            console.log('err'+res)
                        });

                        //根据市获得区
                        self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:self.cityId}).then(function(res){
                            console.log(res);
                            self.areaDisArray = res.result;
                        },function(res){
                            console.log('err'+res)
                        });
                    },function(res){
                        self.proId = 0;
                        self.cityId = 0;
                        self.shopData.adAreaId = 0;
                        // self.repositoryData.adAreaId = 0;
                        self.ifModify = false;
                        console.log('err'+res)
                    });

                    //---对应仓库--------------
                    self.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:self.getOuId,Start:0,Length:100}).then(function(res){
                        console.log(res);
                        self.stockAr = res.result.items;
                    },function(res){
                        console.log('err'+res)
                    });

                    


                    //---加载完成拿回的下拉框的默认值---
                    self.ouItem.ouName = self.shopData.ouFullname;
                    self.ouItem.id =  self.shopData.ouId;

                    self.opItem.areaName = self.shopData.opAreaFullName;
                    self.opItem.id = self.shopData.opAreaId;
                })
                
            }
        },
        
        //------------------------------------------------------
        resdatetime:function(resdatetime){
            return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
        },   
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
            //店铺性质
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ShopWorkProperty'}).then(function(res){
                // console.log(res);
                self.propertyAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            
            //店铺等级
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ShopGrade'}).then(function(res){
                console.log(res);
                self.gradeAr = res.result;
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

            //商圈
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'TradingArea'}).then(function(res){
                // console.log(res);
                self.busAr = res.result;
            },function(res){
                console.log('err'+res)
            });

            //性别
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Sex'}).then(function(res){
                console.log(res);
                self.sexAr = res.result;
            },function(res){
                console.log('err'+res)
            });

        },
        //------------------------------------------------------------------

        //---树-------------------------------------------------------------
        loadIcon(){
            let self=this;
            self.$nextTick(function () {
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
        ouFilterNode(value,data){
            if (!value) return true;
                return data.ouFullname.indexOf(value) !== -1;
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
        ouNodeClick:function(data){
            
            let self = this;
            // console.log(self.ouItem.ouName)
            // console.log(data.ouName)
            self.shopData.stockId = '';
            self.shopData.opAreaId = '';
            self.ouItem.id = data.id;
            self.ouItem.ouName = data.ouName;
            // console.log(self.ouItem.ouName)
            self.$nextTick(function(){
                $('#ou_confirmSelect').click()
            })
            //点击所属组织，业务地区跟着变动
            self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:data.id}).then(function(res){
                console.log(res);
                if(res.result.length>0){
                    self.opAr = res.result;
                    self.loadIcon();
                }else{
                    self.opItem.areaName = '暂无业务地区';
                    self.opItem.id = '';
                }
            },function(res){
                console.log('err'+res)
            });

            //点击所属组织，对应仓库跟着变动
            self.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:self.defaultOuId,Start:0,Length:100}).then(function(res){
                // console.log(res);
                self.stockAr = res.data;
            },function(res){
                console.log('err'+res)
            });
        },
        opNodeClick:function(data){
            let self = this;
            self.opItem.id = data.id;
            self.opItem.areaName = data.areaName;
            self.$nextTick(function(){
                $('#op_confirmSelect').click()
            })
        },
        //----------------------------------------------------------------

        //---保存、修改数据---------------------------------------------
        saveModify:function(){
            let self = this;
            if(self.ifModify){
                self.shopData.shopContacts = self.contactData;
                $('.tipsWrapper').css({display:'block'});
                self.$validate().then(function(success){
                    if(success){
                        self.sureDel();
                        $('.tipsWrapper').css({display:'none'});
                        self.$axios.puts('/api/services/app/ShopManagement/Update',self.shopData).then(function(res){
                            self.open('修改店铺信息成功','el-icon-circle-check','successERP');
                            self.loadData()
                        },function(res){
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=res.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;
                            // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                            // self.errorMessage=true;
                        })
                    }
                });
            }

            
            
        },
        saveAdd:function(){
            let self = this;
            if(self.ifModify){
                self.shopData.shopContacts = self.contactData;
                $('.tipsWrapper').css({display:'block'});
                self.$validate().then(function(success){
                    if(success){
                        self.sureDel();
                        $('.tipsWrapper').css({display:'none'});
                        self.$axios.puts('/api/services/app/ShopManagement/Update',self.shopData).then(function(res){
                            self.$store.state.url='/shop/shopDetail/default'
                            self.$router.push({path:self.$store.state.url})//点击切换路由
                            self.open('修改店铺信息成功','el-icon-circle-check','successERP');
                        },function(res){
                            // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                            // self.errorMessage=true;
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=res.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;

                        })
                    }
                });
            }


        },
        
        //-------------------------------------------------------

        // ---主表修改----------------------------------------
        Modify:function(){//判断主表是否修改过
            let self = this;
            //self.ifModify = true;
        },
        //---------------------------------------------------
        //---从表修改-----------------------------------------
        handleChange:function(index,row){//判断联系人是否修改
            let self = this;
            self.ifDoModify = true;
            if(row.id>0){
                self.ifUp = true;
            }
            
        },
        //---------------------------------------------------
        //---从表增行--------------------------------------------
        addCol:function(){//银行增行
            let self = this;
            self.ifModify = true;
            self.x++;
            let newCol = 'newCol'+self.x;
            self.xrows.newCol ={
                contactPerson: "",
                mobile: "",
                phone: "",
                isDefault: false,
                remark: "",
                position: "",
                sex: '',
                id: 0
            };
            self.contactData.unshift(self.xrows.newCol);
            self.addList.unshift(self.xrows.newCol)
        },
        //---------------------------------------------------

        

        //---从表默认单选框-----------------------------------
        getCurrentRow:function(index,row){//默认单选框
            let self = this;
            for(let i in self.contactData){
                self.contactData[i].isDefault = false;
            }
            self.contactData[index].isDefault = true;
            
        },
        //---------------------------------------------------

        //---从表复选框---------------------------------------
        handleSelectionChange:function(val){//点击复选框选中的数据
                this.multipleSelection = val;
        },
        //---------------------------------------------------

        

        //---确认删除-----------------------------------------
        sureDel:function(){

            let self = this;
            console.log(9999999)
            if(self.who == 1){//单项删除
                self.idArray.ids = [];
                if(self.whoId>0){
                    self.$axios.puts('/api/services/app/ShopManagement/Update',self.shopData).then(function(res){
                        self.open('删除联系人成功','el-icon-circle-check','successERP');
                        self.ifModify = false;
                    },function(res){
                        // self.errorMessage=true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=res.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    })
                }else{
                    
                   
                    self.ifModify = false;
                }
            }

            if(self.who == 2){//多项删除  

                self.$axios.puts('/api/services/app/ShopManagement/Update',self.shopData).then(function(res){
                    self.loadData();
                },function(res){
                    // self.errorMessage = true;
                    // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    self.dialogSetting.dialogType="submit";
                    self.dialogSetting.dialogName='saveDialog'
                    self.dialogSetting.message="信息提报有误";
                    self.errorTips.message=res.error.message;
                    self.errorTips.details='';
                    self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                    self.dialogVisible=true;
                })    
            }

            if(self.who == 3){//删除
                self.$axios.deletes('/api/services/app/ShopManagement/Delete',{id:self.$route.params.id}).then(function(res){
                    self.open('删除店铺成功','el-icon-circle-check','successERP');
                    self.back();
                    self.dialogDelConfirm = false;
                },function(res){
                    // self.dialogDelConfirm = false;
                    // self.errorMessage = true;
                    // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    self.dialogSetting.dialogType="submit";
                    self.dialogSetting.dialogName='saveDialog'
                    self.dialogSetting.message="信息提报有误";
                    self.errorTips.message=res.error.message;
                    self.errorTips.details='';
                    self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                    self.dialogVisible=true;
                }) 
            }

            console.log(self.ifModify)
        },
        //---------------------------------------------------

        //---从表单项删除-------------------------------------

        handleDelete:function(index,row,who){//表格内删除操作
            let self = this;
            console.log(row)
            self.who = who;
            self.whoIndex = index;
            self.whoId = row.id;
            if(self.who == 1){//单项删除
                self.idArray.ids = [];
                if(self.whoId>0){
                    self.contactData.splice(self.whoIndex,1);
                    self.shopData.shopContacts = self.contactData;
                }else{
                  
                    self.contactData.splice(self.whoIndex,1);
                    self.addList.splice(self.whoIndex,1);
                    self.ifModify = false;
                }
            }
            //self.dialogDelConfirm = true;
        },
        //---------------------------------------------------
        
        
        //---从表多项删除---------------------------------------------
        delMore:function(num){//多项删除
            let self = this;
           
            for(let i in self.multipleSelection){
                self.allDelArray.ids.push(self.multipleSelection[i].id)
            }
            
            for(let i in self.multipleSelection){
                if(self.multipleSelection[i].id>0){
                    self.idArray.ids.push(self.multipleSelection[i].id)
                }
            }
            if(self.allDelArray.ids.length>0){
                //self.dialogDelConfirm = true;   
                self.who = num;
                if(self.who == 2){//多项删除  
                    let x=[];
                    $.each(self.contactData,function(index,value){
                        let flag=false;
                        $.each(self.multipleSelection,function(i,val){
                            if(value==val){
                                flag=true
                            }
                        })
                        if(!flag){
                            x.push(value)
                        }
                    })
            
                    self.contactData = x; 
                    //console.log(self.shopContacts)
                   
                }

            } else{
                self.$message({
                    type: 'info',
                    message: '请勾选需要删除的数据！'
                });
            }
            
            
        },
        
        delShop:function(num){//删除此页店铺
            let self = this;
            self.who = num;
            //self.dialogDelConfirm = true;  
            self.dialogSetting.dialogName='delDialog'
            self.dialogSetting.message="确定删除？";
            self.dialogSetting.dialogType="confirm";
            self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            self.dialogVisible=true;

        },
        
        //-----------------------------------------------------------

        //---路由------open------------------------------------------
        back(){//点击新增跳转
            this.$store.state.url='/shop/shopList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goDetail(){//点击新增跳转
            this.$store.state.url='/shop/shopDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        addNew:function(){
            let self = this;
            self.$store.state.url='/shop/shopDetail/default'
            self.$router.push({path:this.$store.state.url})//点击切换路由
            
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
                //self.dialogUserConfirm=true;
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
                //self.dialogUserConfirm=true;
                self.dialogSetting.dialogName='cancelDialog'
                self.dialogSetting.message="此操作将忽略您的更改，是否继续";
                self.dialogSetting.dialogType="confirm";
                self.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                self.dialogVisible=true;
                self.backCancel = 2;
                $('.tipsWrapper').css({display:'none'})
            }
            // self.loadData();
            // self.ifModify = false;
            // self.ifDoModify = false;
            // $('.tipsWrapper').css({display:'none'})
        },
        sureDoing:function(){
            let self = this;
            if(self.backCancel ==1){
                self.back();
            }else if(self.backCancel == 2){
                self.loadData();
                // self.firstChildModify=false;
                // self.ifModify = false;
                //self.dialogUserConfirm=false;
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
            $('.tipsWrapper').each(function(){
                if($(e.target).parent('.el-input').parent('.el-select').hasClass($(this).attr('name'))){
                    $(this).addClass('display_block')
                }else{
                    $(this).removeClass('display_block')
                }
            })
        },
        showErrprTipsRangedate(e){
            $('.tipsWrapper').each(function(){
            if($(e.target).parent('.el-textarea').hasClass($(this).attr('name'))){
                $(this).addClass('display_block')
            }else{
                $(this).removeClass('display_block')
            }
            })
        },
        showErrprTipsTextArea(e){
            $('.tipsWrapper').css({display:'none'})
            
        },
        // getErrorMessage(message,details,validationErrors){
        //     let self=this;
        //     self.response.message='';
        //     self.response.details='';
        //     self.response.validationErrors=[];
        //     if(details!=null && details){
        //         self.response.details=details;
        //     }
        //     if(message!=null && message){
        //         self.response.message=message;
        //     }
        //     if(message!=null && message){
        //         self.response.validationErrors=validationErrors;
        //     }
        // },
        //--------------------------------------------------------
        //---选择省市区-----------------------------------------------
        chooseProvince:function(id){
            let self = this;
            // console.log(id)
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:id}).then(function(res){
                // console.log(res);
                self.areaCityArray = res.result;
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });

        },
        chooseCity:function(id){
            let self = this;
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:id}).then(function(res){
                // console.log(res);
                self.shopData.adAreaId = '';
                self.areaDisArray = res.result;
                

                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            })
        },
        chooseDis:function(){
            let self = this;
            // console.log(self.createRepositoryParams.stock_MainTable.adAreaId)
        },
        //-----------------------------------------------------------
        //------------------------------------------------------
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
        //------------------------------------------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){
                self.isBack(1);
            }else if(btn=="新增"){
                self.addNew();
            }else if(btn=="删除"){
                self.delShop(3)
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
                self.addCol();
            }else if(btn=="删除"){
                self.delMore(2);
            }else if(btn=="辅助功能"){
                
            }
        },
        //-------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="delDialog"){//删除对话框
                    this.sureDel();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="backDialog"){//返回
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){
                    this.dialogVisible=false; 
                }else if(parmas.dialogName=="cancelDialog"){//取消对话框
                    this.sureDoing();
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
  .shop-modify{
      font-family: 'microsoft yahei';
  }
 /*收起*/
 .shop-modify .upBt{
     font-size: 12px;
     float: right;
     margin-right: 10px;
     margin-top: 10px;
     cursor: pointer;
 }
 .shop-modify .upBt i{
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s; 
    color:#cacaca;
    margin-left: 5px;
 }
 .shop-modify .upBt i.rotate{
     transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);	
 }

.shop-modify  .errorTips{
    margin-bottom: 10px;
}  
  .shop-modify .el-row{
     border-bottom: 1px solid #e4e4e4;
     background-color: #fff;
  }
  .shop-modify .el-row:last-child{
      border-bottom:none;
  }

.shop-modify .tabZoo{
     overflow: hidden;
     background-color: #fff;
 }

 .shop-modify  .getPadding,.tabZoo .el-tabs__nav-scroll{
     padding: 0 10px;
 }
 .shop-modify .tabZoo .auditInformation{
     margin-top: 15px;
 }

.shop-modify .tabZoo .erp_bt:first-child{
    margin-left: 0;
}
.shop-modify .nopadding{
    padding-top: 0;
}
.shop-modify .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.shop-modify .el-table td{
    padding: 3px 0;
}
.shop-modify .el-table__body{
    text-align: center;
}
.shop-modify .el-table .cell{
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

.shop-modify .el-input__inner{
    height:35px !important;
    border:1px solid white;
    /* border-color:white !important; */
}
.shop-modify .all-table .el-input__inner{
    height:35px !important;
    text-align: center !important;
    border:none !important;
}
.shop-modify .bgw .el-input__inner{
    background-color:white;
}
.shop-modify .bgg .el-input__inner{
    background-color:#FAFAFA;
}
.shop-modify .el-select-dropdown__item{
    text-align: center;
}
.shop-modify .area{
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
.shop-modify .inline-block-need{
    display: inline-block;
}
.shop-modify .el-tabs__header{
    margin: 0px;
}
.mt5{
    margin-top: 5px;
}
.shop-modify .tabZoo .el-tabs__active-bar{
    width: 48px !important;
}
  </style>
  
