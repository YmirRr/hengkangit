<template>
  <div class="res-modify">
        <el-row class="bg-white bb1 fixed pb5">
            <el-col :span="14">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
                <div class="toggle-btn">
                    <span @click='ifShow = !ifShow'>收起</span>
                    <i class="el-icon-arrow-up"></i>
                </div>


        </el-row>

        <el-collapse-transition>
            <div v-show="ifShow" class="bb1">
                <el-row class="bg-white ft12 pr10 pt10">
                    <el-col :span="24">
                        <div class="tipsWrapper" name="ouId">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.ouId')}">
                                <p class="msgDetail">错误提示：所属组织{{ validation.firstError('repositoryData.ouId') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="stockCode">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.stockCode')}">
                                <p class="msgDetail">错误提示：编码{{ validation.firstError('repositoryData.stockCode') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="stockName">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.stockName')}">
                                <p class="msgDetail">错误提示：名称{{ validation.firstError('repositoryData.stockName') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="stockFullName">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.stockFullName')}">
                                <p class="msgDetail">错误提示：全称{{ validation.firstError('repositoryData.stockFullName') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="mnemonic">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.mnemonic')}">
                                <p class="msgDetail">错误提示：助记码{{ validation.firstError('repositoryData.mnemonic') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="stockTypeId">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.stockTypeId')}">
                                <p class="msgDetail">错误提示：仓库类型{{ validation.firstError('repositoryData.stockTypeId') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="opAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.opAreaId')}">
                                <p class="msgDetail">错误提示：业务地区{{ validation.firstError('repositoryData.opAreaId') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="adAreaId">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.adAreaId')}">
                                <p class="msgDetail">错误提示：行政地区{{ validation.firstError('repositoryData.adAreaId') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="manager">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.manager')}">
                                <p class="msgDetail">错误提示：负责人{{ validation.firstError('repositoryData.manager') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="phone">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.phone')}">
                                <p class="msgDetail">错误提示：电话{{ validation.firstError('repositoryData.phone') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="email">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.email')}">
                                <p class="msgDetail">错误提示：email{{ validation.firstError('repositoryData.email') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="fax">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.fax')}">
                                <p class="msgDetail">错误提示：传真{{ validation.firstError('repositoryData.fax') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="remark">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.remark')}">
                                <p class="msgDetail">错误提示：备注{{ validation.firstError('repositoryData.remark') }}</p>
                            </div>
                        </div>
                        <div class="tipsWrapper" name="status">
                            <div class="errorTips" :class="{block : !validation.hasError('repositoryData.status')}">
                                <p class="msgDetail">错误提示：状态{{ validation.firstError('repositoryData.status') }}</p>
                            </div>
                        </div>
                        <el-row>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>所属组织</label>
                                    <el-select v-model="repositoryData.ouId"
                                            :class="{redBorder : validation.hasError('repositoryData.ouId')}"
                                            class="ouId"
                                            @focus="showErrprTipsSelect"
                                            placeholder="">
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
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>编码</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.stockCode"
                                            @focus="showErrprTips"
                                            class="stockCode"
                                            :class="{redBorder : validation.hasError('repositoryData.stockCode')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>名称</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.stockName"
                                            @focus="showErrprTips"
                                            class="stockName"
                                            :class="{redBorder : validation.hasError('repositoryData.stockName')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>全称</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.stockFullName"
                                            @focus="showErrprTips"
                                            class="stockFullName"
                                            :class="{redBorder : validation.hasError('repositoryData.stockFullName')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>助记码</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.mnemonic"
                                            @focus="showErrprTips"
                                            class="mnemonic"
                                            :class="{redBorder : validation.hasError('repositoryData.mnemonic')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>仓库类型</label>
                                    <el-select v-model="repositoryData.stockTypeId"
                                            placeholder=""
                                            @focus="showErrprTipsSelect"
                                            :class="{redBorder : validation.hasError('repositoryData.stockTypeId')}"
                                            class="stockTypeId">
                                        <el-option v-for="item in stockType"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>业务地区</label>
                                    <el-select v-model="repositoryData.opAreaId"
                                            placeholder=""
                                            @focus="showErrprTipsSelect"
                                            :class="{redBorder : validation.hasError('repositoryData.opAreaId')}"
                                            class="opAreaId">
                                        <el-input placeholder="搜索..."
                                                class="selectSearch"
                                                v-model="opSearch"></el-input>
                                        <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" style="-moz-user-select: none"
                                                :data="opAr"
                                                :props="selectOpProps"
                                                node-key="id"
                                                default-expand-all
                                                ref="opTree"
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
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>负责人</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.manager"
                                            @focus="showErrprTips"
                                            class="manager"
                                            :class="{redBorder : validation.hasError('repositoryData.manager')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>电话</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.phone"
                                            @focus="showErrprTips"
                                            class="phone"
                                            :class="{redBorder : validation.hasError('repositoryData.phone')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>Email</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.email"
                                            @focus="showErrprTips"
                                            class="email"
                                            :class="{redBorder : validation.hasError('repositoryData.email')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>传真</label>
                                    <el-input v-model="repositoryData.fax"
                                            @focus="showErrprTips"
                                            placeholder=""
                                            class="fax"
                                            :class="{redBorder : validation.hasError('repositoryData.fax')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>地址</label>
                                    <el-input v-model="repositoryData.stockAddress"
                                            @focus="showErrprTips"
                                            placeholder=""
                                            class="stockAddress"
                                            :class="{redBorder : validation.hasError('repositoryData.stockAddress')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
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
                                        <el-select v-model="repositoryData.adAreaId" class="areaDrop" placeholder="选择区" @change='chooseDis()'>
                                            <el-option v-for="item in areaDisArray" :key="item.id" :label="item.areaName" :value="item.id">
                                            </el-option>
                                            <el-option v-show="false" label="无" :value="areaValue">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label>备注</label>
                                    <el-input placeholder=""
                                            v-model="repositoryData.remark"
                                            @focus="showErrprTips"
                                            class="remark"
                                            :class="{redBorder : validation.hasError('repositoryData.remark')}"></el-input>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                                <div class="bgcolor">
                                    <label><small>*</small>状态</label>
                                    <el-select v-model="repositoryData.status"
                                            placeholder=""
                                            @focus="showErrprTipsSelect"
                                            :class="{redBorder : validation.hasError('repositoryData.status')}"
                                            class="status">
                                        <el-option v-for="item in statusAr"
                                                :key="item.itemValue"
                                                :label="item.itemName"
                                                :value="item.itemValue"></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>

        <el-row class="ft12 pr10 pt10 br3 mt10 bg-white">
            <el-col :span='24' class="pl10 mb10 bb1">
                <span class="header-title">送货信息</span>
            </el-col>

            <el-col :span="24" class="bg-white pl10 mb10">
                <!-- <button class="erp_bt bt_add" @click='addCol'>
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_add.png">
                    </div>
                    <span class="btDetail">增行</span>
                </button>

                <button class="erp_bt bt_del" @click='delMore(2)'>
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_del.png">
                    </div>
                    <span class="btDetail">删除</span>
                </button>

                <button class="erp_bt bt_excel">
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_excel.png">
                    </div>
                    <span class="btDetail">Excel</span>
                </button>

                <button class="erp_bt bt_auxiliary" @click='test'>
                    <div class="btImg">
                        <img src="../../../static/image/common/bt_auxiliary.png">
                    </div>
                    <span class="btDetail">辅助功能</span>
                </button> -->
                <buttonGroup :buttonGroup="buttonGroup1" @btnClick='btnClick1' class="inline-block-need"></buttonGroup>

          </el-col>

              <el-table :data="repositoryAddressData" border style="width: 100%" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="contactPerson" label="联系人" >
                        <template slot-scope="scope">
                            <img v-show='redAr.indexOf(scope.row)>=0' class="abimg" src="../../../static/image/content/redremind.png"/>
                            <input class="input-need"
                                    :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                    v-model="scope.row.contactPerson"
                                    @change='handleChange(scope.$index,scope.row)'
                                    type="text"/>
                        </template>
                    </el-table-column>

                    <el-table-column prop="moblie" label="手机">
                        <template slot-scope="scope">
                            <input class="input-need"
                                    :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                    v-model="scope.row.moblie"
                                    @change='handleChange(scope.$index,scope.row)'
                                    type="text"/>
                        </template>
                    </el-table-column>

                    <el-table-column prop="phone" label="电话">
                        <template slot-scope="scope">
                            <input class="input-need"
                                    :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                    v-model="scope.row.phone"
                                    @change='handleChange(scope.$index,scope.row)'
                                    type="text"/>
                        </template>
                    </el-table-column>

                    <el-table-column prop="completeAddress" label="送货地址">
                        <template slot-scope="scope">
                            <input class="input-need"
                                    :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                    v-model="scope.row.completeAddress"
                                    @change='handleChange(scope.$index,scope.row)'
                                    type="text" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="transportMethodId" label="运输方式">
                        <template slot-scope="scope">
                            <el-select  v-model="scope.row.transportMethodId" :class="[scope.$index%2==0?'bgw':'bgp']" @change='handleChange(scope.$index,scope.row)'>
                                <el-option  v-for="item in transAr" :key="item.itemValue" :label="item.itemName" :value="item.itemValue" >
                                </el-option>
                                <el-option v-show="false" label="无" :value="TransValue">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="transportMethodId" label="物流公司">
                        <template slot-scope="scope">
                            <el-select  v-model="scope.row.logisticsCompanyId" :class="[scope.$index%2==0?'bgw':'bgp']" @change='handleChange(scope.$index,scope.row)'>
                                <el-option  v-for="item in logiAr" :key="item.itemValue" :label="item.itemName" :value="item.itemValue" >
                                </el-option>
                                <el-option v-show="false" label="无" :value="LogiValue">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="isDefault" label="默认">
                        <template slot-scope="scope">
                            <el-radio  :label="true"
                                        v-model="scope.row.isDefault"
                                        @change.native="getCurrentRow(scope.$index,scope.row)"
                                        @change="handleChange(scope.$index,scope.row)"></el-radio>
                        </template>
                    </el-table-column>

                    <el-table-column prop="remark" label="备注">
                        <template slot-scope="scope">
                            <input class="input-need"
                                    :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                    v-model="scope.row.remark"
                                    @change='handleChange(scope.$index,scope.row)'
                                    type="text"/>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button v-on:click="handleDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

        </el-row>

        <el-row class="ft12 pr10 pt10 br3">
            <auditInfo :auditInformation="repositoryData"></auditInfo>
            <!-- <el-row class="bg-white pl10 pt10 pb10">
                <span style="color:black;font-size:16px;font-weight:bolder;">审计信息</span>
            </el-row>
            <el-row  class="bg-white pb10">
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="repositoryData.createdBy"></el-input>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="repositoryData.createdTime" :disabled="true"></el-input>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="repositoryData.modifiedBy"></el-input>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="repositoryData.modifiedTime" :disabled="true"></el-input>
                    </div>
                </el-col>
            </el-row> -->
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
import auditInfo from '../../base/auditInfo/auditInfo'
    export default{
        name:'repositoryModify',
        created:function(){
        },
        components:{
            buttonGroup,
            dialogBox,
            auditInfo
        },
            mounted:function(){
            let self = this;
            self.loadData();
            self.loadSelect();
        },

        validators: {
            'repositoryData.ouId': function (value) {//所属组织
                return this.Validator.value(value).required().integer();
            },
            'repositoryData.stockCode': function (value) {//仓库编码
                return this.Validator.value(value).required().maxLength(50);
            },
            'repositoryData.stockName': function (value) {//仓库名称
                return this.Validator.value(value).required().maxLength(50);
            },
            'repositoryData.stockFullName': function (value) {//仓库全称
                return this.Validator.value(value).required().maxLength(50);
            },
            'repositoryData.mnemonic': function (value) {//助记码
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.stockTypeId': function (value) {//仓库类型
                return this.Validator.value(value).required().integer();
            },
            'repositoryData.opAreaId': function (value) {//业务地区
                return this.Validator.value(value).integer();
            },
            'repositoryData.adAreaId': function (value) {//行政地区
                return this.Validator.value(value).integer();
            },
            'repositoryData.manager': function (value) {//负责人
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.phone': function (value) {//电话
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.email': function (value) {//Email
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.fax': function (value) {//传真
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.stockAddress': function (value) {//地址
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.remark': function (value) {//备注
                return this.Validator.value(value).maxLength(50);
            },
            'repositoryData.status': function (value) {//状态
                return this.Validator.value(value).required().integer();
            },
        },
        data(){
            return {
                getOuId:'',//保存获取的ouid
                repositoryData:'',//根据仓库id查出的仓库信息
                repositoryAddressData:[],//根据仓库id查出的仓库地址信息
                getRepositoryAddressParams:{
                   id:'',
                },
                firstModify:false,//主表第一次修改
                firstAddModify:false,//从表第一次修改

                ifModify:false,//判断主表是否修改过
                ifShow:true,//控制折叠页面

                backCancel:'',//判断信息提示确定的点击事件  返回、取消

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
                ouExpandId:[],//默认打开第一个树节点
                //-----------------------
                dialogCommand:[],//底部按钮组控制组
                //dialogVisible:false,//对话框是否显示
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
                    text:'Excel',
                    class:'bt_excel',
                    icon:'icon-excel',
                    disabled:false,
                },{
                    text:'辅助功能',
                    class:'bt_auxiliary',
                    icon:'icon-fuzhugongneng',
                    disabled:false,
                }],

                //---行政地区树形下拉-----
                areaProArray:[],//行政地区(省)
                areaCityArray:[],//行政地区(市)
                areaDisArray:[],//行政地区(区)
                adSearch:'',//树形搜索框的
                selectAdProps:{
                    children: 'items',
                    label: 'areaName',
                    id:'id'
                },
                adItem:{
                    id:'',
                    areaName:'',
                },
                adAr:[],//行政地区下拉框
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

                //---普通下拉框-----------
                statusAr:[],//状态
                transAr:[],//运输方式
                logiAr:[],//物流公司
                //-----------------------
                stockType: [{//仓库类型
                    value:0,
                    label: '仓库'
                }, {
                    value:1,
                    label: '店铺'
                }],

                status: [],

                value: '',

                createParams:{//创建新的仓库地址
                    groupId:'1',//集团ID
                    stockId:'',//仓库ID
                    completeAddress:'',//详情地址
                    transportMethodId:'',//运输方式
                    contactPerson:'',//联系人
                    phone:'',//联系电话
                    logisticsCompanyId:'',//物流公司
                    isDefault:false,//是否默认
                    remark:'',//备注
                },
                x:0,//增行的下标
                rows:[],//增行的数组
                updateList:[],//更新上传的数组
                addList:[],//新增上传的数组
                multipleSelection:[],//需要删除的数组
                // falsemultipleSelection:[],
                allDelArray:{
                    ids:[]
                },
                idArray:{
                    ids:[]
                },//需要删除的数组id
                checkedAr:[],//加载时从表默认选择的数组

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
                //errorMessage:false,
                detail_message_ifShow:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                //-----------------------------
                //-----------------------------
                who:'',//删除的是谁以及是否是多项删除
                whoId:'',//单项删除的id
                whoIndex:'',//单项删除的index
                TransValue:0,
                LogiValue:0,
                provinceValue:0,
                cityValue:0,
                areaValue:0,
                proId:'',
                cityId:'',
                disId:'',
                //-----------------------------
                redAr:[],//显示小红标的数组
                InitAddData:[],//初始的从表数据

            }
        },
        computed:{
            countOu () {
                return this.ouItem;
            },
            countAd () {
                return this.adItem;
            },
            countOp () {
                return this.opItem;
            },
        },

        watch:{
            ifModify:{
                handler:function(){
                    let self = this;
                    if(self.ifModify == true){
                        self.buttonGroup[3].disabled = false;
                        self.buttonGroup[4].disabled = false;
                        self.buttonGroup[5].disabled = false;
                        self.buttonGroup[1].disabled = true;
                        self.buttonGroup[2].disabled = true;
                    }else{
                        self.buttonGroup[3].disabled = true;
                        self.buttonGroup[4].disabled = true;
                        self.buttonGroup[5].disabled = true;
                        self.buttonGroup[1].disabled = false;
                        self.buttonGroup[2].disabled = false;
                    }
                },
                deep:true,
            },
            repositoryData:{
                handler: function (val, oldVal) {
                    let self = this;
                    if(!self.firstModify){
                        self.firstModify = !self.firstModify;
                    }else{
                        self.ifModify = true;
                    }
                },
                deep: true,
            },

            repositoryAddressData:{
                handler:function(val,oldVal){
                    //console.log(val,oldVal)
                    let self = this;
                    if(!self.firstAddModify){
                        self.firstAddModify = !self.firstAddModify;
                    }else{
                        self.ifModify = true;
                    }
                    self.redAr=[]
                    for(let i in val){
                        let flag = true;
                        for(let j in self.InitAddData){
                            if(val[i].addressId == self.InitAddData[j].addressId&&
                               val[i].completeAddress == self.InitAddData[j].completeAddress&&
                               val[i].contactPerson == self.InitAddData[j].contactPerson&&
                               val[i].groupId == self.InitAddData[j].groupId&&
                               val[i].id == self.InitAddData[j].id&&
                               val[i].isDefault == self.InitAddData[j].isDefault&&
                               val[i].moblie == self.InitAddData[j].moblie&&
                               val[i].phone == self.InitAddData[j].phone&&
                               val[i].stockId == self.InitAddData[j].stockId&&
                               val[i].transportMethodId == self.InitAddData[j].transportMethodId){
                                   flag = false;
                               }
                        }
                        // console.log(flag)
                        if(flag){
                            self.redAr.push(val[i])
                        }

                    }
                    // console.log(self.redAr)
                },
                deep:true,
            },
            ouSearch(val){
                this.$refs.outree.filter(val)
            }
        },

        methods:{

            //---加载信息-----------------------------------------------
            loadData:function(){//根据id查找仓库信息和仓库地址信息
                let self = this;
                if(self.$route.params.id!='default'){
                    self.firstModify = false;
                    self.firstAddModify = false;
                    //根据仓库id获取仓库信息
                    self.$axios.gets('/api/services/app/StockManagement/Get',{id:self.$route.params.id}).then(function(res){
                        console.log(res)
                        self.repositoryData = res.result;
                        self.extraData = res.result;
                        self.getOuId = self.repositoryData.ouId;
                        self.repositoryData.createdTime=self.resdatetime(new Date(self.repositoryData.createdTime));
                        self.repositoryData.modifiedTime=self.resdatetime(new Date(self.repositoryData.modifiedTime));

                        //行政地区所有省
                        self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                            // console.log(res);
                            self.areaProArray = res.result;
                            // self.loadIcon();
                        },function(res){
                            console.log('err'+res)
                        });

                        //根据区id反向获得行政地区所有资料
                        self.$axios.gets('/api/services/app/AdAreaManagement/Get',{Id:res.result.adAreaId}).then(function(res){
                            console.log(res);
                            let ids = res.result.areaFullPathId;
                            let newid = ids.split('>')

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
                            self.repositoryData.adAreaId = 0;
                            // self.repositoryData.adAreaId = 0;
                            self.ifModify = false;
                            console.log('err'+res)
                        });



                        //业务地区
                        self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:self.getOuId}).then(function(res){
                            // console.log(res);
                            self.opAr = res.result;
                            self.loadIcon();
                        },function(res){
                            console.log('err'+res)
                        });

                        //加载完成拿回的下拉框的默认值
                        self.ouItem.ouName = self.repositoryData.ouId_OuName;
                        self.ouItem.id =  self.repositoryData.ouId;

                        self.adItem.areaName = self.repositoryData.adAreaId_AreaName;
                        self.adItem.id = self.repositoryData.adAreaId;

                        self.opItem.areaName = self.repositoryData.opAreaId_AreaName;
                        self.opItem.id = self.repositoryData.opAreaId;
                        // console.log(self.repositoryData);
                    });
                    // console.log(self.$route.params.id)
                    //根据仓库id获取仓库地址信息
                    self.createParams.stockId = self.$route.params.id;
                    self.getRepositoryAddressParams={
                        id:self.$route.params.id,
                    }
                    // console.log(self.getRepositoryAddressParams)
                    self.loadAddData();
                }
            },
            resdatetime:function(resdatetime){
                return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
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
            btnClick(btn){//按钮组点击事件
                let self = this;
                if(btn=="返回"){
                    self.isBack(1);
                }else if(btn=="新增"){
                    self.addNew();
                }else if(btn=="删除"){
                    self.delModify(3)
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
            dialogClick(parmas){
                if(parmas.dialogButton=="确定"){
                    if(parmas.dialogName=="delDialog"){//删除对话框
                        this.sureDel();
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="backDialog"){//返回
                        this.back();
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="saveDialog"){//保存
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="cancelDialog"){
                        this.dialogVisible=false;
                        this.sureDoing();
                    }
                }else if(parmas.dialogButton=="取消"){
                    this.dialogVisible=false;
                }

            },
            dialogColse(){//对话框关闭回调事件
                this.dialogVisible=false;
            },

            loadAddData:function(){
                let self = this;
                this.$axios.gets('/api/services/app/StockAddressManagement/GetAllByStockId',{id:self.$route.params.id}).then(function(res){
                        console.log(res);
                        self.repositoryAddressData = res.result.items;
                        self.InitAddData = self.deepCopy(res.result);
                        // $.each(res.result,function(index,v) {
                        //     self.InitAddData.push(v)
                        // })
                        // console.log(self.InitAddData)
                        for(let i in self.repositoryAddressData){
                            if(self.repositoryAddressData[i].isDefault == true){
                                self.checkedAr = self.repositoryAddressData[i]
                            }
                        }
                        // console.log(typeof(res.result[0].transportMethodId))
                        //运输方式
                        self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'TransportMethod'}).then(function(res){
                            // console.log(res);
                            self.transAr = res.result;
                        },function(res){
                            console.log('err'+res)
                        });

                    })
            },
            //---下拉的数据-
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



                //状态
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
                    // console.log(res);
                    self.statusAr = res.result;
                },function(res){
                    console.log('err'+res)
                });

                //物流公司
                self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'logisticsCompany'}).then(function(res){
                    // console.log(res);
                    self.logiAr = res.result;
                },function(res){
                    console.log('err'+res)
                });

            },
            //------------------------------------------------------------------

            //---修改完成保存----------------------------------------------
            saveModify:function(){//保存修改
                let self = this;
                if(self.ifModify){
                    let submitData = {};
                    submitData = {
                        stock_MainTable:self.repositoryData,
                        stockAddress_ChildTable:self.repositoryAddressData
                    }
                    self.sureDel();
                    console.log(submitData)
                    self.$axios.posts('/api/services/app/StockManagement/AggregateCreateOrUpdate',submitData).then(function(res){
                        console.log(res);
                        self.open('修改成功','el-icon-circle-check','successERP');
                        self.updateList = [];
                        self.redAr = [];
                        self.ifModify = false;
                    },function(err){
                        //self.errorMessage = true;
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;

                        //self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                    })
                }

            },

            saveAdd:function(){
                let self = this;


                if(self.updateList.length>0){
                    self.$axios.posts('/api/services/app/StockAddressManagement/CUDAggregate',{createList:[],updateList:self.updateList,deleteList:[]}).then(function(res){
                        console.log(res);
                        self.open('修改地址信息成功','el-icon-circle-check','successERP');
                        self.updateList = [];
                        self.goDetail();
                    },function(err){
                        // self.errorMessage = true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    })

                }

                if(self.ifModify){
                    self.$validate().then(function(success){
                        if(success){
                            self.$axios.puts('/api/services/app/StockManagement/UpdateRepository',self.repositoryData).then(function(res){
                                // console.log(res);
                                self.goDetail();
                                self.open('修改仓库信息成功','el-icon-circle-check','successERP');
                                self.ifModify = false;
                            },function(err){
                                // self.errorMessage = true;
                                // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                                self.dialogSetting.dialogType="submit";
                                self.dialogSetting.dialogName='saveDialog'
                                self.dialogSetting.message="信息提报有误";
                                self.errorTips.message=err.error.message;
                                self.errorTips.details='';
                                self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                                self.dialogVisible=true;
                            })
                        }
                    })
                }else{
                    //  self.open('没有需要保存的项目','el-icon-warning','noticERP');
                };


                if(self.addList.length>0){
                    self.createAddress();
                    self.goDetail();
                }
            },
            //------------------------------------------------------------



            //---表格编辑-------------------------------------------------
            addCol:function(){//增行
                let self = this;
                self.ifModify = true;
                self.x++;
                let newCol = 'newCol'+self.x;
                self.rows.newCol ={
                    groupId:'1',//集团ID
                    stockId:self.$route.params.id,//仓库ID
                    completeAddress:'',//详情地址
                    transportMethodId:'',//运输方式
                    contactPerson:'',//联系人
                    phone:'',
                    moblie:'',
                    logisticsCompanyId:'',//物流公司
                    isDefault:false,//是否默认
                    remark:'',//备注
                };
                self.repositoryAddressData.unshift(self.rows.newCol);
                self.addList.unshift(self.rows.newCol);
            },
            //---从表单项删除-------------------------------------
            handleDelete:function(index,row,who){//表格内删除操作
                let self = this;
                self.who = who;
                self.whoIndex = index;
                self.whoId = row.id;
                if(self.who ==1){
                    self.idArray.ids = [];
                    console.log(self.repositoryAddressData)
                    if(self.whoId>0){
                            self.repositoryAddressData.splice(self.whoIndex,1)
                    }else{
                        self.repositoryAddressData.splice(self.whoIndex,1);
                        self.addList.splice(self.whoIndex,1);
                    }
                }
                //self.dialogDelConfirm = true;
            },
            //---------------------------------------------------

            //---批量删除----------------------------------------
            delMore:function(num){
                let self=this;
                // self.who = 2;
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
                    if(self.who == 2){
                        let x = [];
                        $.each(self.repositoryAddressData,function(index,value){
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

                        self.repositoryAddressData = x;
                        self.addList = [];
                        for(let i in x){
                            if(x[i].id==''||x[i].id==undefined){
                                // console.log(x[i])
                                self.addList.push(x[i])
                                console.log(self.addList)
                            }
                        }


                    }

                } else{
                    self.$message({
                        type: 'info',
                        message: '请勾选需要删除的数据！'
                    });
                }

            },
            //--------------------------------------------------

            //---顶部删除按钮-----------------------------------------
            delModify:function(num){
                let self = this;
                if(!self.ifModify){
                    self.who = num
                    //self.dialogDelConfirm = true;
                    this.dialogSetting.dialogName='delDialog'
                    this.dialogSetting.message="确定删除？";
                    this.dialogSetting.dialogType="confirm";
                    this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                    this.dialogVisible=true;
                }

            },
            //-------------------------------------------------------

            //---确认删除--------------------------------------------
            sureDel:function(){
                let self = this;
                if(self.who ==1){
                    self.idArray.ids = [];
                    if(self.whoId>0){
                        self.$axios.deletes('/api/services/app/StockAddressManagement/Delete',{id:self.whoId}).then(function(res){
                            //self.open('删除地址成功','el-icon-circle-check','successERP');
                            // self.repositoryAddressData.splice(self.whoIndex,1)
                            // self.dialogDelConfirm = false;
                        },function(err){
                            // self.dialogDelConfirm = false;
                            // self.errorMessage = true;
                            // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                            self.dialogSetting.dialogType="submit";
                            self.dialogSetting.dialogName='saveDialog'
                            self.dialogSetting.message="信息提报有误";
                            self.errorTips.message=err.error.message;
                            self.errorTips.details='';
                            self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                            self.dialogVisible=true;
                        })
                    }else{
                        // self.repositoryAddressData.splice(self.whoIndex,1);
                        // self.addList.splice(self.whoIndex,1);
                        // self.dialogDelConfirm = false;
                        // self.open('删除新增行成功','el-icon-circle-check','successERP');
                    }

                }

                if(self.who == 2){
                    // let x = [];
                    // $.each(self.repositoryAddressData,function(index,value){
                    //     let flag = false;
                    //     $.each(self.multipleSelection,function(i,val){
                    //         if(value==val){
                    //             flag = true;
                    //         }
                    //     })
                    //     if(!flag){
                    //         x.push(value)
                    //     }
                    // })

                    // self.repositoryAddressData = x;
                    // self.addList = [];
                    // for(let i in x){
                    //     if(x[i].id==''||x[i].id==undefined){
                    //         // console.log(x[i])
                    //         self.addList.push(x[i])
                    //         console.log(self.addList)
                    //     }
                    // }

                    self.$axios.posts('/api/services/app/StockAddressManagement/BatchDelete',self.idArray).then(function(res){
                        //self.open('删除地址成功','el-icon-circle-check','successERP');
                        // self.loadAddData();
                        //self.dialogDelConfirm = false;
                    },function(err){
                        //self.dialogDelConfirm = false;
                        // self.errorMessage = true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    })

                    //self.dialogDelConfirm = false;


                }

                if(self.who == 3){
                    self.$axios.deletes('/api/services/app/StockManagement/Delete',{id:self.$route.params.id}).then(function(res){
                        self.open('删除仓库成功','el-icon-circle-check','successERP');
                        self.back();
                        self.dialogDelConfirm = false;
                    },function(err){
                        // self.dialogDelConfirm = false;
                        // self.errorMessage = true;
                        // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                        self.dialogSetting.dialogType="submit";
                        self.dialogSetting.dialogName='saveDialog'
                        self.dialogSetting.message="信息提报有误";
                        self.errorTips.message=err.error.message;
                        self.errorTips.details='';
                        self.dialogCommand=[{text:'确定',class:'btn-confirm'}];
                        self.dialogVisible=true;
                    })
                }

            },
            //------------------------------------------------------

            handleSelectionChange:function(val){//点击复选框选中的数据
                // console.log(val)
                this.multipleSelection = val;

                // if(val.id&&val.id>0){
                    // this.multipleSelection = val;
                // }
            },

            handleChange:function(index,row){
                let self = this;
                self.ifModify = true;
                let flag = false;
                if(self.updateList.length==0&&row.id>0){
                    flag = true;
                }else if(self.updateList.length>=1&&row.id>0){
                    for(let i in self.updateList){
                        if(row.id != self.updateList[i].id){
                            flag = true;
                            // console.log(flag)
                        }else{
                            flag= false;
                            break;
                        }
                    }
                };

                if(flag){
                    self.updateList.push(row);
                    console.log(self.updateList)
                }
            },
            getCurrentRow:function(index,row){//默认单选框
                let self = this;
                for(let i in self.repositoryAddressData){
                    self.repositoryAddressData[i].isDefault = false;
                }


                self.repositoryAddressData[index].isDefault = true;
                self.updateList.push(self.checkedAr)
            },

            // Modify:function(){
            //     let self = this;
            //     self.ifModify = true;
            // },
            //------------------------------------------------------

            //---修改返回\取消提示-----------------------------------------
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
                    // self.choseDoing='back'
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
            },
            sureDoing:function(){
                let self = this;
                if(self.backCancel ==1){
                    self.back();
                }else if(self.backCancel == 2){
                    self.loadData();
                    self.ifModify = false;
                    self.dialogUserConfirm=false;
                }

            },
            //-------------------------------------------------------

            //---选择省市区-----------------------------------------------
            chooseProvince:function(id){
                let self = this;
                // console.log(id)
                self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:id}).then(function(res){
                    // console.log(res);
                    self.cityId = '';
                    self.repositoryData.adAreaId = '';
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
                    self.repositoryData.adAreaId = '';
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

            //---open-------数据清除--------路由跳转-----------------------
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


            back(){
                this.$store.state.url='/repository/repositoryList/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            goDetail(){//点击新增跳转
                this.$store.state.url='/repository/repositoryData/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
            addNew:function(){
                let self = this;
                if(!self.ifModify){
                    this.$store.state.url='/repository/repositoryData/default'
                    this.$router.push({path:this.$store.state.url})//点击切换路由
                }
            },
            //------------------------------------------------------------
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
            //-----------------------------------------------------

            ouNodeClick:function(data){
                console.log(data)
                let self = this;
                self.repositoryData.opAreaId = '';
                self.opItem.areaName = '';

                self.ouItem.id = data.id;
                self.ouItem.ouName = data.ouName;
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
                    }

                },function(res){
                    console.log('err'+res)
                });
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
                self.opItem.id = data.id;
                self.opItem.areaName = data.areaName;
                self.$nextTick(function(){
                    $('#op_confirmSelect').click()
                })
            },
            ouFilterNode(value, data) {
                if (!value) return true;
                    return data.indexOf(value) !== -1;
            },
            opFilterNode(value, data) {
                console.log(value)
                console.log(data)
                // if (!value) return true;
                //     return data.areaName.indexOf(value) !== -1;
            },
            filterNode(value, data) {
                console.log(data)
                if (!value) return true;
                    return data.areaName.indexOf(value) !== -1;
            },
            //-----------------------------------------------------
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
                    if($(e.$el).hasClass($(this).attr('name'))){
                        $(this).addClass('display_block')
                    }else{
                        $(this).removeClass('display_block')
                    }
                })
            },
            showErrprTipsTextArea(e){
                    $('.tipsWrapper').each(function(){
                    if($(e.target).parent('.el-textarea').hasClass($(this).attr('name'))){
                        $(this).addClass('display_block')
                    }else{
                        $(this).removeClass('display_block')
                    }
                    })
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
            test:function(){
                let self = this;
                console.log(self.checkedAr)
                console.log(self.addList)
                console.log(self.updateList)
            },
        },


    }
</script>

<style scoped>
.res-modify{
    background: #EEF1F5;
    height: auto;
    width: 100%;
}
.bg-white{
    background: white;
}
.ft12{
    font-size: 14px;
}
.btn{
    display: inline-block;
    width: 100%;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: white;
    background: rgba(130, 170, 252, 1);
    cursor: pointer;
}
.br3{
    border-radius: 3px;
}
.h30{
    height: 32px;
    line-height: 30px;
}
.h35{
    height: 35px;
    line-height: 35px;
}
.input-need{
    border:none;
    outline: none;
    width: 100%;
    height: 23px;
    line-height: 23px;
}
.input-bgw{
    background: white;
    text-align: center;
}
.input-bgp{
    background: #FAFAFA;
    text-align: center;
}
.header-title{
    color: #333333;
    font-size: 16px;
    display: inline-block;
    border-bottom: 2px solid rgb(51, 204, 204);
    font-weight: bolder;
    padding: 5px 1px;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.b1{
    border: 1px solid #cccccc;
}
.fr{
    float: right;
}
.toggle-btn{
    cursor: pointer;
    font-size: 12px;
    float: right;
    margin-right: 20px;
    height: 36px;
    line-height: 36px;
}
.bgcolor{
    width: 100%;
}
.areaBox{
    width: calc(100% - 96px)
}

</style>
<style>
.res-modify .el-input__inner{
    height:35px !important;
}
.res-modify .bgw .el-input__inner{
    text-align:center;
    border:none;
    background-color:white;
}
.res-modify .bgp .el-input__inner{
    text-align:center;
    border:none;
    background-color:#FAFAFA;
}
.res-modify .display_block{
    margin-bottom:5px;
}
.el-select.areaDrop,.el-input.areaEntry{
    width: 33.3%;
}
.areaDrop input,.areaEntry input{
    border: none!important;
}
.areaDrop .el-input__inner,.areaEntry .el-input__inner{
    height: 32px!important;
}
</style>



