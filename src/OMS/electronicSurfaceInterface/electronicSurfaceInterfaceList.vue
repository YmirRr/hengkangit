<template>
  <div id="electronicSurfaceInterfaceList" class="customer-infor-wrapper commodity">
    <el-row class="but-box">
      <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
      <div class="search_input_group inline-block-need">
        <div class="search_input_wapper">
          <el-input v-model="SearchStr" placeholder="搜索..." @keyup.native.enter="submitSearch" class="search_input">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="submitSearch"></i>
          </el-input>
        </div>
      </div>
    </el-row>
    <el-col :span="24">
      <Table @tableFunction="tableFunction" :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
    </el-col>
    <dialogBox :dialogSetting='dialogSetting' :errorTips='errorTips' :dialogVisible="dialogVisible" :dialogCommand='dialogCommand' @dialogClick="dialogClick" @dialogColse="dialogColse"></dialogBox>
    <!-- 新增弹出框 -->
    <el-dialog :visible.sync="dialogVisibleAdd" width="30%" center :before-close="handleClose">
      <div :rules="{ required: true, message: '平台不能为空'}" slot="title" class="dialog-title">
        <span>平台选择</span>
        <el-select style="width:80%" v-model="region" placeholder="">
          <el-option v-for="option in regionWatch" :key="option.itemValue" :label="option.itemName" :value="option.itemValue"></el-option>
        </el-select>
      </div>
      <!-- 弹出框表单开始 -->
      <!-- 淘宝 -->
      <el-form inline-message status-icon v-if="region == 0" ref="formTbAdd" :model="formTb" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formTb.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formTb.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formTb.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="appId" :rules="[{ required: true, message: '应用钥不能为空'}]" label="应用钥">
          <el-input style="width:60%" v-model="formTb.appId"></el-input>
        </el-form-item>
        <el-form-item prop="appKey" :rules="[{ required: true, message: '应用密钥不能为空'}]" label="应用密钥">
          <el-input style="width:60%" v-model="formTb.appKey"></el-input>
        </el-form-item>
        <el-form-item prop="authCode" :rules="[{ required: true, message: '授权码不能为空'}]" label="授权码">
          <el-input style="width:60%" v-model="formTb.authCode"></el-input>
        </el-form-item>
        <el-form-item prop="webshopId" :rules="[{ required: true, message: '店铺不能为空'}]" label="店铺">
          <el-select filterable style="width:60%" v-model="formTb.webshopId" @change="setOuid(formTb.webshopId)"  placeholder="">
            <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
                <span style="float: left; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
                <span style="float: right">{{ item.shopName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="weblogisticsCode" :rules="[{ required: true, message: '物流公司不能为空'}]" label="线上物流公司">
          <el-select filterable :disabled="formTb.webshopId ? false : true" style="width:60%" v-model="formTb.weblogisticsCode" @change="setWeblogisticsCode(formTb.webshopId,formTb.weblogisticsCode)" placeholder="">
            <el-option v-for="item in weblogistics" :key="item.id" :label="item.weblogisticsName" :value="item.weblogisticsCode">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.weblogisticsCode }}</span>
              <span style="float: right">{{ item.weblogisticsName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通网点">
          <el-select clearable filterable :disabled="formTb.weblogisticsCode ? false : true" style="width:60%" v-model="formTb.logisticsSiteId" placeholder="">
            <el-option v-for="item in logistics" :key="item.branchCode" :label="item.branchName" :value="item.id">
              <span style="float: right">{{ item.branchName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.branchCode }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoWaybillIiDtoByLogisticsCode(formTb.webshopId,formTb.weblogisticsCode)">刷新网点</span>
        </el-form-item>
        <el-form-item label="线上面单系统">
          <el-select clearable filterable :disabled="formTb.weblogisticsCode ? false : true" style="width:60%" v-model="formTb.eorderTemplateCode" placeholder="">
            <el-option v-for="item in eorderTemplate" :key="item.standardTemplateId" :label="item.standardTemplateName" :value="item.standardTemplateId">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.standardTemplateId }}</span>
              <span style="float: right">{{ item.standardTemplateName }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoCloudprintStdtemplatesDtoByLogisticsCode(formTb.webshopId,formTb.weblogisticsCode)">刷新模板</span>
        </el-form-item>
        <el-form-item prop="eorderStockapplyDtoList" :rules="[{ required: true, message: '至少选择一个仓库'}]" label="仓库">
          <div class="addZoo">
            <a class="addRole" :key="index" v-for="(tag,index) in formTb.eorderStockapplyDtoList">{{tag.stockName}}
              <i @click="handleClose2(tag)" class="el-icon-error"></i>
            </a>
          </div>
          <el-button class="button-new-tag" size="small" @click="showInput(formTb.eorderStockapplyDtoList)">＋</el-button>
        </el-form-item>
      </el-form>
      <!-- 京东 -->
      <el-form inline-message status-icon v-else-if="region == 1" ref="formJdAdd" :model="formJd" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formJd.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formJd.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formJd.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="appId" :rules="[{ required: true, message: '应用钥不能为空'}]" label="应用钥">
          <el-input style="width:60%" v-model="formJd.appId"></el-input>
        </el-form-item>
        <el-form-item prop="appKey" :rules="[{ required: true, message: '应用密钥不能为空'}]" label="应用密钥">
          <el-input style="width:60%" v-model="formJd.appKey"></el-input>
        </el-form-item>
        <el-form-item prop="authCode" :rules="[{ required: true, message: '授权码不能为空'}]" label="授权码">
          <el-input style="width:60%" v-model="formJd.authCode"></el-input>
        </el-form-item>
        <el-form-item prop="webshopId" :rules="[{ required: true, message: '店铺不能为空'}]" label="店铺">
          <el-select filterable style="width:60%" @change="setOuid(formJd.webshopId)" v-model="formJd.webshopId" placeholder="">
            <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
              <span style="float: right">{{ item.shopName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="weblogisticsCode" :rules="[{ required: true, message: '物流公司不能为空'}]" label="线上物流公司">
          <el-select filterable :disabled="formJd.webshopId ? false : true" style="width:60%" @change="setWeblogisticsCode(formJd.webshopId,formTb.weblogisticsCode)" v-model="formJd.weblogisticsCode" placeholder="">
            <el-option v-for="item in weblogistics" :key="item.id" :label="item.weblogisticsName" :value="item.weblogisticsCode">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.weblogisticsCode }}</span>
              <span style="float: right">{{ item.weblogisticsName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通网点">
          <el-select filterable clearable :disabled="formJd.weblogisticsCode ? false : true" style="width:60%" v-model="formJd.logisticsSiteId" placeholder="">
            <el-option v-for="item in logistics" :key="item.branchCode" :label="item.branchName" :value="item.id">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.branchCode }}</span>
              <span style="float: right">{{ item.branchName }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoWaybillIiDtoByLogisticsCode(formJd.webshopId,formJd.logisticsSiteId)">刷新网点</span>
        </el-form-item>
        <el-form-item prop="eorderStockapplyDtoList" :rules="[{ required: true, message: '至少选择一个仓库'}]" label="仓库">
          <div class="addZoo">
            <a class="addRole" :key="index" v-for="(tag,index) in formJd.eorderStockapplyDtoList">{{tag.stockName}}
              <i @click="handleClose2(tag)" class="el-icon-error"></i>
            </a>
          </div>
          <el-button class="button-new-tag" size="small" @click="showInput(formJd.eorderStockapplyDtoList)">＋</el-button>
        </el-form-item>
      </el-form>
      <!-- 顺丰 -->
      <el-form inline-message status-icon v-else-if="region == 2" ref="formSfAdd" :model="formSf" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formSf.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formSf.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formSf.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="expressTypeid" :rules="[{ required: true, message: '业务类型不能为空'}]" label="业务类型">
          <el-select filterable style="width:60%" v-model="formSf.expressTypeid" placeholder="">
            <el-option v-for="(item,index) in expressType" :key="index" :label="item.itemName" :value="item.itemValue">
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.itemCode }}</span>
              <span style="float: left">{{ item.itemName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="requestCode" :rules="[{ required: true, message: '接入编码不能为空'}]" label="接入编码">
          <el-input style="width:60%" v-model="formSf.requestCode"></el-input>
        </el-form-item>
        <el-form-item prop="monthCode" :rules="[{ required: true, message: '顾客编码不能为空'}]" label="顾客编码">
          <el-input style="width:60%" v-model="formSf.monthCode"></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode" :rules="[{ required: true, message: '校检码不能为空'}]" label="校检码">
          <el-input style="width:60%" v-model="formSf.verificationCode"></el-input>
        </el-form-item>
      </el-form>
      <!-- 里面仓库选择的弹出框 -->
      <el-dialog width="30%" title="仓库选择" center :visible.sync="innerVisible" append-to-body>
        <el-row style="width:100%">
          <div class="search_box">
            <el-input v-model="searchKey" placeholder="搜索代码仓库" @keyup.native.enter="submitSearchKey" class="search_input">
              <i slot="suffix" style="line-height: 31px;" class="el-input__icon el-icon-search" @click="submitSearchKey"></i>
            </el-input>
          </div>
        </el-row>
        <el-row class="search_box">
          <el-radio-group v-model="choice">
            <el-radio class="box" label="查看所有">查看所有</el-radio>
            <el-radio class="box" label="查看已选">查看已选</el-radio>
            <el-radio class="box" label="查看未选">查看未选</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>
          <span>共{{webStore.totalCount}}条数据</span>
        </el-row>
        <el-row class="pr">
          <el-table class="tableBox" stripe ref="multipleTable" :row-key="getRowKeys" v-loadmore="scrollLoadMore" v-loading='scrollLoading' @selection-change="handleSelectionChange" :data="selectedData" height="250" border>
            <el-table-column type="selection" :reserve-selection="isTrue" width="55">
            </el-table-column>
            <el-table-column prop="stockCode" label="代码">
            </el-table-column>
            <el-table-column prop="stockName" label="名称">
            </el-table-column>
          </el-table>
          <div class="transfer-layout pa">
            <div class="layout-circle mb10" @click="toTop('multipleTable')">
              <i class="iconfont icon-arrow-up"></i>
            </div>
            <div class="layout-circle mb10">
              <p class="font-orange">{{webStore.items.length}}</p>
              <i class="line"></i>
              <p>{{webStore.totalCount}}</p>
            </div>
          </div>
          <!-- 滚动加载表格 -->
          <!-- <ScrollTable :scrollBasicSetting='scrollBasicSetting' :scrollTableData="scrollTableData" @scrollLoadMore="scrollLoadMore" @handleSelectionChange="handleSelectionChange"></ScrollTable> -->
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="innerInsert">确 定</el-button>
          <el-button size="mini" @click="innerVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="insert">确 定</el-button>
        <el-button size="mini" @click="closeAdd">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 修改详情弹出框 -->
    <el-dialog class="addDialog" :visible.sync="dialogVisibleUp" width="30%" center :before-close="handleClose">
      <div slot="title" class="dialog-title">
        <span class="fl">{{regionName}}</span>
        <span class="fr">修改时间{{ modifiedTime}}</span>
      </div>
      <!-- 弹出框表单开始 -->
      <!-- 淘宝 -->
      <el-form v-loading="isLoading" inline-message status-icon v-if="region == 0" ref="formTbUp" :model="formTb" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formTb.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formTb.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formTb.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="appId" :rules="[{ required: true, message: '应用钥不能为空'}]" label="应用钥">
          <el-input style="width:60%" v-model="formTb.appId"></el-input>
        </el-form-item>
        <el-form-item prop="appKey" :rules="[{ required: true, message: '应用密钥不能为空'}]" label="应用密钥">
          <el-input style="width:60%" v-model="formTb.appKey"></el-input>
        </el-form-item>
        <el-form-item prop="authCode" :rules="[{ required: true, message: '授权码不能为空'}]" label="授权码">
          <el-input style="width:60%" v-model="formTb.authCode"></el-input>
        </el-form-item>
        <el-form-item prop="webshopId" :rules="[{ required: true, message: '店铺不能为空'}]" label="店铺">
          <el-select filterable style="width:60%" v-model="formTb.webshopId" @change="setOuid(formTb.webshopId)" placeholder="">
            <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
              <span style="float: right">{{ item.shopName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="weblogisticsCode" :rules="[{ required: true, message: '物流公司不能为空'}]" label="线上物流公司">
          <el-select filterable :disabled="formTb.webshopId ? false : true" style="width:60%" v-model="formTb.weblogisticsCode" @change="setWeblogisticsCode(formTb.webshopId,formTb.weblogisticsCode)" placeholder="">
            <el-option v-for="item in weblogistics" :key="item.id" :label="item.weblogisticsName" :value="item.weblogisticsCode">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.weblogisticsCode }}</span>
              <span style="float: right">{{ item.weblogisticsName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通网点">
          <el-select clearable filterable :disabled="formTb.weblogisticsCode ? false : true" style="width:60%" v-model="formTb.logisticsSiteId" placeholder="">
            <el-option v-for="item in logistics" :key="item.branchCode" :label="item.branchName" :value="item.id">
              <span style="float: right">{{ item.branchName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.branchCode }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoWaybillIiDtoByLogisticsCode(formTb.webshopId,formTb.weblogisticsCode)">刷新网点</span>
        </el-form-item>
        <el-form-item label="线上面单系统">
          <el-select clearable filterable :disabled="formTb.weblogisticsCode ? false : true" style="width:60%" v-model="formTb.eorderTemplateCode" placeholder="">
            <el-option v-for="item in eorderTemplate" :key="item.standardTemplateId" :label="item.standardTemplateName" :value="item.standardTemplateId">
              <span style="float: right">{{ item.standardTemplateName }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.standardTemplateId }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoCloudprintStdtemplatesDtoByLogisticsCode(formTb.webshopId,formTb.weblogisticsCode)">刷新模板</span>
        </el-form-item>
        <el-form-item prop="eorderStockapplyDtoList" :rules="[{ required: true, message: '至少选择一个仓库'}]" label="仓库">
          <div class="addZoo">
            <a class="addRole" :key="index" v-for="(tag,index) in formTb.eorderStockapplyDtoList">{{tag.stockName}}
              <i @click="handleClose2(tag)" class="el-icon-error"></i>
            </a>
          </div>
          <el-button class="button-new-tag" size="small" @click="showInput(formTb.eorderStockapplyDtoList)">＋</el-button>
        </el-form-item>
      </el-form>
      <!-- 京东 -->
      <el-form v-loading="isLoading" inline-message status-icon v-else-if="region == 1" ref="formJdUp" :model="formJd" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formJd.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formJd.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formJd.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="appId" :rules="[{ required: true, message: '应用钥不能为空'}]" label="应用钥">
          <el-input style="width:60%" v-model="formJd.appId"></el-input>
        </el-form-item>
        <el-form-item prop="appKey" :rules="[{ required: true, message: '应用密钥不能为空'}]" label="应用密钥">
          <el-input style="width:60%" v-model="formJd.appKey"></el-input>
        </el-form-item>
        <el-form-item prop="authCode" :rules="[{ required: true, message: '授权码不能为空'}]" label="授权码">
          <el-input style="width:60%" v-model="formJd.authCode"></el-input>
        </el-form-item>
        <el-form-item prop="webshopId" :rules="[{ required: true, message: '店铺不能为空'}]" label="店铺">
          <el-select filterable style="width:60%" @change="setOuid(formJd.webshopId)" v-model="formJd.webshopId" placeholder="">
            <el-option v-for="item in webshop" :key="item.id" :label="item.shopName" :value="item.shopId">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.shopCode}}</span>
              <span style="float: right">{{ item.shopName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="weblogisticsCode" :rules="[{ required: true, message: '物流公司不能为空'}]" label="线上物流公司">
          <el-select filterable :disabled="formJd.webshopId ? false : true" style="width:60%" @change="setWeblogisticsCode(formJd.webshopId,formTb.weblogisticsCode)" v-model="formJd.weblogisticsCode" placeholder="">
            <el-option v-for="item in weblogistics" :key="item.id" :label="item.weblogisticsName" :value="item.weblogisticsCode">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.weblogisticsCode }}</span>
              <span style="float: right">{{ item.weblogisticsName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通网点">
          <el-select filterable clearable :disabled="formJd.weblogisticsCode ? false : true" style="width:60%" v-model="formJd.logisticsSiteId" placeholder="">
            <el-option v-for="item in logistics" :key="item.branchCode" :label="item.branchName" :value="item.id">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.branchCode }}</span>
              <span style="float: right">{{ item.branchName }}</span>
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <span class="curpage" @click="getCainiaoWaybillIiDtoByLogisticsCode(formJd.webshopId,formJd.logisticsSiteId)">刷新网点</span>
        </el-form-item>
        <el-form-item prop="eorderStockapplyDtoList" :rules="[{ required: true, message: '至少选择一个仓库'}]" label="仓库">
          <div class="addZoo">
            <a class="addRole" :key="index" v-for="(tag,index) in formJd.eorderStockapplyDtoList">{{tag.stockName}}
              <i @click="handleClose2(tag)" class="el-icon-error"></i>
            </a>
          </div>
          <el-button class="button-new-tag" size="small" @click="showInput(formJd.eorderStockapplyDtoList)">＋</el-button>
        </el-form-item>
      </el-form>
      <!-- 顺丰 -->
      <el-form v-loading="isLoading" inline-message status-icon v-else-if="region == 2" ref="formSfUp" :model="formSf" label-width="30%">
        <el-form-item prop="apiCode" :rules="[{ required: true, message: '接口代码不能为空'}]" label="接口代码">
          <el-input style="width:60%" v-model="formSf.apiCode">
          </el-input>
        </el-form-item>
        <el-form-item prop="apiName" :rules="[{ required: true, message: '接口名称不能为空'}]" label="接口名称">
          <el-input style="width:60%" v-model="formSf.apiName">
          </el-input>
        </el-form-item>
        <el-form-item prop="status" :rules="[{ required: true, message: '是否启用不能为空'}]" label="启用">
          <el-select style="width:60%" v-model="formSf.status" placeholder="">
            <el-option v-for="(item,index) in Status" :key="index" :label="item.itemName" :value="item.itemValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="expressTypeid" :rules="[{ required: true, message: '业务类型不能为空'}]" label="业务类型">
          <el-select filterable style="width:60%" v-model="formSf.expressTypeid" placeholder="">
            <el-option v-for="(item,index) in expressType" :key="index" :label="item.itemName" :value="item.itemValue">
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.itemCode }}</span>
              <span style="float: right">{{ item.itemName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="requestCode" :rules="[{ required: true, message: '接入编码不能为空'}]" label="接入编码">
          <el-input style="width:60%" v-model="formSf.requestCode"></el-input>
        </el-form-item>
        <el-form-item prop="monthCode" :rules="[{ required: true, message: '顾客编码不能为空'}]" label="顾客编码">
          <el-input style="width:60%" v-model="formSf.monthCode"></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode" :rules="[{ required: true, message: '校检码不能为空'}]" label="校检码">
          <el-input style="width:60%" v-model="formSf.verificationCode"></el-input>
        </el-form-item>
      </el-form>
      <!-- 里面仓库选择的弹出框 -->
      <el-dialog width="30%" title="仓库选择" center :visible.sync="innerVisible" append-to-body>
        <el-row style="width:100%">
          <div class="search_box">
            <el-input v-model="searchKey" placeholder="搜索代码仓库" @keyup.native.enter="submitSearchKey" class="search_input">
              <i slot="suffix" style="line-height: 31px;" class="el-input__icon el-icon-search" @click="submitSearchKey"></i>
            </el-input>
          </div>
        </el-row>
        <el-row class="search_box">
          <el-radio-group v-model="choice">
            <el-radio class="box" label="查看所有">查看所有</el-radio>
            <el-radio class="box" label="查看已选">查看已选</el-radio>
            <el-radio class="box" label="查看未选">查看未选</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>
          <span>共{{webStore.totalCount}}条数据</span>
        </el-row>
        <el-row class="pr">
          <el-table class="tableBox" stripe ref="multipleTable" :row-key="getRowKeys" v-loadmore="scrollLoadMore" v-loading='scrollLoading' @selection-change="handleSelectionChange" :data="selectedData" height="250" border>
            <el-table-column type="selection" :reserve-selection="isTrue" width="55">
            </el-table-column>
            <el-table-column prop="stockCode" label="代码">
            </el-table-column>
            <el-table-column prop="stockName" label="名称">
            </el-table-column>
          </el-table>
          <div class="transfer-layout pa">
            <div class="layout-circle mb10" @click="toTop('multipleTable')">
              <i class="iconfont icon-arrow-up"></i>
            </div>
            <div class="layout-circle mb10">
              <p class="font-orange">{{webStore.items.length}}</p>
              <i class="line"></i>
              <p>{{webStore.totalCount}}</p>
            </div>
          </div>
          <!-- 滚动加载表格 -->
          <!-- <ScrollTable :scrollBasicSetting='scrollBasicSetting' :scrollTableData="scrollTableData" @scrollLoadMore="scrollLoadMore" @handleSelectionChange="handleSelectionChange"></ScrollTable> -->
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="innerInsert">确 定</el-button>
          <el-button size="mini" @click="innerVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 外面弹出框的确定以及取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="insert">确 定</el-button>
        <el-button size="mini" @click="closeUp">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 弹出框表单结束 -->
  </div>
</template>
<script>
import buttonGroup from "../../base/buttonGroup/buttonGroup";
import Table from "../../base/Table/Table";
import dialogBox from "../../base/dialog/dialog";
import ScrollTable from "../../base/scrollTable/scrollTable";
import config from "../../../static/config";
export default {
  name: "electronicSurfaceInterface",
  components: {
    buttonGroup,
    Table,
    dialogBox,
    ScrollTable
  },
  validators: {
    "formTb.apiCode": function(value) {
      return this.Validator.value(value).required();
    }
  },
  data() {
    return {
      // 滚动加载数据表格相关配置
      getRowKeys(row) {
        return row.id;
      },
      objData: "", //当前打开的数据，用来判断数据是否有做修改
      isLoading: false,
      scrollLoading: false,
      isTrue: true,
      webStore: { items: [] }, //仓库
      searchItems: [],
      Status: "", //状态（启用）
      modifiedTime: "", //修改时间
      OuId: null,
      choice: "查看所有", // 里面的弹框选择
      tableModel: "electronicSurfaceInterfaceList",
      // 初始化枚举数据，1.平台物流公司 2.线上物流公司 3.网点 4.线上面单系统 5.店铺 6.仓库
      upNameTittle: "", //详情弹出框名字
      weblogistics: [], // 线上物流公司枚举列表
      logistics: [], // 网点枚举列表
      eorderTemplate: [], // 线上面单系统枚举列表
      webshop: [], // 店铺枚举列表
      eorderStockapplyDto: "", // 仓库枚举列表
      expressType: "", // 业务类型枚举列表
      multipleSelection: [], // 复选框选中数据
      // selectedData: [], //仓库筛选数据
      innerVisible: false,
      // region: null, // 平台物流类型
      region: null, // 平台物流类型
      regionName: "", // 修改弹框名称
      regionWatch: [], // 平台物流类型枚举列表
      formTb: {
        // 淘宝
        apiCode: "",
        apiName: "",
        status: "",
        appId: "",
        appKey: "",
        authCode: "",
        webshopId: "",
        weblogisticsCode: "",
        logisticsSiteId: "",
        eorderTemplateCode: "",
        eorderStockapplyDtoList: []
      },
      formSf: {
        // 顺丰
        apiCode: "",
        apiName: "",
        status: "",
        expressTypeid: "",
        requestCode: "",
        monthCode: "",
        verificationCode: "",
        eorderStockapplyDtoList: []
      },
      formJd: {
        // 京东
        apiCode: "",
        apiName: "",
        status: "",
        appId: "",
        appKey: "",
        authCode: "",
        webshopId: "",
        weblogisticsCode: "",
        logisticsSiteId: "",
        eorderStockapplyDtoList: []
      },
      // ************************************************* 表格相关配置  ************************************
      searchKey: "", // 搜索框
      dialogVisibleAdd: false,
      dialogVisibleUp: false,
      httpUrl: {
        // 数据列表渲染用到的参数
        view: "/electronicSurfaceInterface/electronicSurfaceInterfaceDitail/", //查看详情
        query: `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsEorderApiManagement/GetSearchData`,
        delete: `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsEorderApiManagement/Delete`
      },
      pluginSetting: {
        hasPagination: true, // 包含分页栏
        mutiSelect: true, // 多选栏
        isDisable: true // 是否可编辑
      },
      SearchStr: "",
      SkipCount: 0,
      MaxResultCount: 10,
      currentPage: 1,
      queryParams: {
        //查询条件
        SearchStr: "", // 模糊查询参数
        Sorting: "id",
        SkipCount:
          (this.$store.state.electronicSurfaceInterfaceListCurrentPage - 1) *
          this.$store.state.electronicSurfaceInterfaceListEachPage, // 跳过第几行数据
        MaxResultCount: this.$store.state.electronicSurfaceInterfaceListEachPage
      },
      command: [
        {
          // 表示是否需要操作，比如“查看”和删除
          text: "详情",
          class: "blue"
        },
        {
          // 表示是否需要操作，比如“查看”和删除
          text: "删除",
          class: "blue"
        }
      ],
      column: [
        {
          prop: "apiCode", // 字段名称(后台返回)-平台ID
          label: "接口代码", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false // 是否排序
        },
        {
          prop: "apiName", // 字段名称(后台返回)-平台ID
          label: "接口名称", // 表头名称
          required: true,
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false // 是否排序
        },
        {
          prop: "logisticsPlatformName", // 字段名称(后台返回)-平台ID
          label: "物流平台类型", // 表头名称
          controls: "text", // 控件类型 （datetime、text、classMapSelect(下拉数据具有字体颜色区分)、select（下拉数据不具有字体颜色区分）、checkbox、button=>可行内点击查看详情）
          isDisable: true, // 是否可编辑
          sortable: false // 是否排序
          // isFix:'', // 是否为固定列,此参数为可选参数
        }
      ],
      // ************************************************* 对话框相关配置  *********************************************
      dialogSetting: {
        //对话框提示信息
        message: "", //提示信息
        dialogName: "", //对话框名称
        dialogType: "" //对话框类型
      },
      errorTips: {
        //对话框 错误提示
        message: "",
        details: ""
      },
      idArray: {
        ids: []
      },
      dialogCommand: [], //底部按钮组控制组
      SelectionChange: [], // 被选中的行数
      dialogVisible: false, //此参数用户控制对话框是否可见
      buttonGroup: [
        //按钮组设置
        {
          text: "新增",
          class: "bt_add",
          icon: "icon-xinzeng",
          disabled: false
        },
        {
          text: "删除",
          class: "bt_del",
          icon: "icon-shanchu",
          disabled: false
        },
        {
          text: "打印",
          class: "bt_print",
          icon: "icon-print",
          disabled: false
        },
        {
          text: "导出",
          class: "bt_out",
          icon: "icon-daochu",
          disabled: false
        }
      ]
    };
  },
  mounted: function() {
    let content1 = document.getElementById("electronicSurfaceInterfaceList"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1.style.minHeight = height1 + "px";
    content1.style.background = "#ffffff";
  },
  computed: {
    selectedData: function() {
      if (this.choice == "查看所有") {
        return this.webStore.items;
      } else if (this.choice == "查看已选") {
        return this.multipleSelection;
      } else if (this.choice == "查看未选") {
        let arr = [];
        this.webStore.items.forEach(row => {
          arr.push(row);
        });
        this.multipleSelection.forEach(row => {
          arr.splice(arr.indexOf(row), 1);
        });
        return arr;
      }
    }
  },
  watch: {
    innerVisible: function(params) {
      if (this.innerVisible == false) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    dialogVisibleAdd: function(params) {
      if (this.dialogVisibleAdd == false && this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
        this.currentPage = 1;
        this.searchKey = "";
      }
    },
    dialogVisibleUp: function(params) {
      if (this.dialogVisibleUp == false && this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
        this.currentPage = 1;
        this.searchKey = "";
      }
    },
    region: function(newValue, oldValue) {
      let _this = this;
      if (_this.region == "0") {
        _this.clearFormJd();
        _this.clearFormSf();
      } else if (_this.region == "1") {
        _this.clearFormTb();
        _this.clearFormSf();
      } else if (_this.region == "2") {
        _this.clearFormTb();
        _this.clearFormJd();
      } else {
        _this.clearFormTb();
        _this.clearFormJd();
        _this.clearFormSf();
      }
      _this.webStore = { items: [] };
    }
  },
  created() {
    // 初始化枚举数据，1.平台物流类型 2.线上物流公司 3.网点 4.线上面单系统 5.店铺 6.仓库 7.业务类型
    let _this = this;
    //状态值
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItem`, {
        dictName: "status001"
      })
      .then(function(res) {
        console.log("状态值列表：", res);
        _this.Status = res.result;
      });
    // 平台物流类型
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItem`, {
        dictName: "OMS_LogisticsPlatform"
      })
      .then(function(res) {
        console.log("平台选择：", res);
        _this.regionWatch = res.result;
      });
    // 店铺列表
    _this.$axios
      .gets(
        `${config.base.ip}:${
          config.base.omsPort
        }/api/services/app/OmsWebShopManagement/GetWebShopBySearch`,
        {
          SkipCount: 0,
          Status: 2,
          MaxResultCount: 999
        }
      )
      .then(function(res) {
        console.log("店铺列表:", res);
        _this.webshop = res.result.items;
      });
    // 业务类型枚举
    _this.$axios
      .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/DataDictionary/GetDictItem`, {
        dictName: "OMS_ExpressType"
      })
      .then(function(res) {
        console.log("业务类型：", res);
        _this.expressType = res.result;
      });
  },
  directives: {
    loadmore: {
      bind(el, binding) {
        // 获取element-ui table的dom节点
        const SELECTWRAP_DOM = el.querySelector(".el-table__body-wrapper");
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          let sign = 80; // 定义默认的向上滚于向下滚的边界
          const CONDITION =
            this.scrollHeight - this.scrollTop === this.clientHeight &&
            this.scrollTop > sign;
          sign = this.scrollTop;
          if (CONDITION) {
            binding.value();
          }
        });
      }
    }
  },
  methods: {
    toTop(ref) {
      //回到顶部
      this.$refs[ref].bodyWrapper.scrollTop = 0;
    },
    scrollLoadMore() {
      this.scrollLoading = true;
      let eachPage = 10;
      this.currentPage++;
      this.SkipCount = 0;
      this.MaxResultCount = eachPage * this.currentPage;
      if (
        this.MaxResultCount > this.webStore.totalCount &&
        this.webStore.totalCount < eachPage * (this.currentPage - 1)
      ) {
        this.scrollLoading = false;
        this.$message({
          message: "没有更多的数据了！",
          type: "success"
        });
      } else {
        let _this = this;
        _this.$axios
          .gets(
            `${config.base.ip}:${config.base.basicPort}/api/services/app/StockManagement/GetRepositoryListByNameOrCode`,
            {
              SkipCount: 0,
              MaxResultCount: _this.MaxResultCount,
              OuId: _this.OuId, //组织单元ID
              QueryStr: _this.searchKey
            }
          )
          .then(function(res) {
            _this.webStore.items = res.result.items;
            _this.webStore.totalCount = res.result.totalCount;
            _this.scrollLoading = false;
            _this.showInput();
          });
      }
    },
    clearFormTb() {
      this.formTb = {
        apiCode: "",
        apiName: "",
        status: "",
        appId: "",
        appKey: "",
        authCode: "",
        webshopId: "",
        weblogisticsCode: "",
        logisticsSiteId: "",
        eorderTemplateCode: "",
        eorderStockapplyDtoList: []
      };
    },
    clearFormJd() {
      this.formJd = {
        apiCode: "",
        apiName: "",
        status: "",
        appId: "",
        appKey: "",
        authCode: "",
        webshopId: "",
        weblogisticsCode: "",
        logisticsSiteId: "",
        eorderStockapplyDtoList: []
      };
    },
    clearFormSf() {
      this.formSf = {
        apiCode: "",
        apiName: "",
        status: "",
        expressTypeid: "",
        requestCode: "",
        monthCode: "",
        verificationCode: "",
        eorderStockapplyDtoList: []
      };
    },
    setOuid(parm) {
      if (parm <= 0) {
        return;
      }
      let _this = this;
      // 店铺改变发生变化，重新获取线上物流公司
      console.log("店铺的ID", parm);
      // 获取当前店铺对应的组织ID
      _this.$axios
        .gets(`${config.base.ip}:${config.base.basicPort}/api/services/app/ShopManagement/Get`, { Id: parm })
        .then(function(res) {
          _this.OuId = res.result.ouId;
          if(res.result.ouId){
            _this.getRepositoryList(_this.searchKey); //重新获取仓库列表，需传入组织单元ID
          }
        }).catch(function(err){
          console.log(err)
        });
      console.log(888);
      _this.formTb.weblogisticsCode = "";
      _this.formJd.weblogisticsCode = "";
      _this.formTb.logisticsSiteId = "";
      _this.formJd.logisticsSiteId = "";
      _this.formTb.eorderTemplateCode = "";
      _this.getSearchWeblogisticsData(parm); //参数1：店铺ID
    },
    setWeblogisticsCode(parm, parm2) {
      //线上物流公司发生变化，重新获取网点信息,线上面单系统
      let _this = this;
      _this.formTb.logisticsSiteId = "";
      _this.formJd.logisticsSiteId = "";
      if (parm && parm2) {
        _this.getCainiaoWaybillIiDtoByLogisticsCode(parm, parm2); //参数1：店铺ID  参数2:线上物流编码
        _this.getCainiaoCloudprintStdtemplatesDtoByLogisticsCode(parm, parm2); //参数1：店铺ID  参数2:线上物流编码
      }
    },
    closeAdd() {
      let _this = this;
      _this.dialogVisibleAdd = false;
      _this.region = null;
    },
    closeUp() {
      let _this = this;
      _this.dialogVisibleUp = false;
      _this.region = null;
    },
    submitSearchKey() {
      this.currentPage = 1;
      this.getRepositoryList(this.searchKey);
    },
    async submitSearch() {
      // 搜索框点击事件
      let _this = this;
      _this.queryParams.SearchStr = _this.SearchStr;
      _this.$store.commit("tableLoad_Complete", true);
      await _this.$axios
        .gets(
          `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsEorderApiManagement/GetSearchData`,
          _this.queryParams
        )
        .then(function(res) {
          _this.$store.commit("Init_Table", res.result.items); // 更新表格数据
          let TOTAL_PAGE = Math.ceil(
            res.result.totalCount /
              _this.$store.state.electronicSurfaceInterfaceListEachPage
          ); // 计算表格总页数
          _this.$store.commit("Init_pagination", TOTAL_PAGE); // 更新表格总页数
          _this.$store.commit("Init_TotalCount", res.result.totalCount); // 更新表格数据总条数
          _this.$store.commit("setCurrentPage", 1); // 设置当前页码为初始值1
        });
      _this.$store.commit("tableLoad_Complete", false);
    },
    getSearchWeblogisticsData(parm) {
      let _this = this;
      console.log("店铺的ID", parm);
      // 线上物流公司
      _this.$axios
        .gets(
          `${config.base.ip}:${
            config.base.omsPort
          }/api/services/app/OmsLogisticsMappingManagement/GetSearchWeblogisticsData`,
          {
            SkipCount: 0,
            MaxResultCount: 999,
            shopId: parm //所属店铺ID
          }
        )
        .then(function(res) {
          console.log("线上物流公司", res);
          _this.weblogistics = res.result.items;
        });
    },
    getCainiaoWaybillIiDtoByLogisticsCode(parm, parm2) {
      // 网点信息
      if (parm && parm2) {
        let _this = this;
        _this.$axios
          .gets(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsEorderApiManagement/GetCainiaoWaybillIiDtoByLogisticsCode`,
            {
              ShopId: parm, //店铺ID
              WeblogisticsCode: parm2 //线上物流公司编码
            }
          )
          .then(function(res) {
            _this.logistics = res.result;
            console.log("线上网点信息", res);
          });
      }
    },
    getCainiaoCloudprintStdtemplatesDtoByLogisticsCode(parm, parm2) {
      //请求、刷新模板(线上面单系统)
      if (parm && parm2) {
        let _this = this;
        _this.$axios
          .gets(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsEorderApiManagement/GetCainiaoCloudprintStdtemplatesDtoByLogisticsCode`,
            {
              ShopId: parm, //店铺ID
              WeblogisticsCode: parm2 //线上物流编码
            }
          )
          .then(function(res) {
            _this.eorderTemplate = res.result;
            console.log("线上面单", res.result);
          });
      }
    },
    getRepositoryList(parm) {
      // 获取仓库列表,parm为模糊搜索条件
      let _this = this;
      _this.$axios
        .gets(
          `${config.base.ip}:${config.base.basicPort}/api/services/app/StockManagement/GetRepositoryListByNameOrCode`,
          {
            SkipCount: 0,
            MaxResultCount: 10,
            OuId: _this.OuId, //组织单元ID
            QueryStr: parm ? parm : " "
          }
        )
        .then(function(res) {
          console.log("仓库列表", res.result);
          _this.webStore.totalCount = res.result.totalCount;
          _this.webStore.items = res.result.items;
        });
    },
    handleClose2(tag) {
      // 删除仓库
      console.log(tag);
      let _this = this;
      let parm;
      if (_this.region == "0") {
        parm = "Tb";
      } else if (_this.region == "1") {
        parm = "Jd";
      }
      console.log(_this["form" + parm].eorderStockapplyDtoList);
      _this["form" + parm].eorderStockapplyDtoList.splice(
        _this["form" + parm].eorderStockapplyDtoList.indexOf(tag),
        1
      );
    },
    innerInsert() {
      // 仓库选择确定按钮
      let _this = this;
      let parm;
      if (_this.region == "0") {
        parm = "Tb";
      } else if (_this.region == "1") {
        parm = "Jd";
      }
      let arr = [];
      for (let i = 0; i < _this.multipleSelection.length; i++) {
        arr.push({
          stockId: _this.multipleSelection[i].id,
          stockName: _this.multipleSelection[i].stockName
        });
      }
      _this["form" + parm].eorderStockapplyDtoList = arr;
      this.innerVisible = false;
    },
    showInput(parameter) {
      $(".tableBox").css({ height: "251px" }); // 处理滚动条异常
      let _this = this;
      let parm;
      if (_this.region == "0") {
        parm = "Tb";
      } else if (_this.region == "1") {
        parm = "Jd";
      }
      _this.choice = "查看所有";
      _this.innerVisible = true;
      _this.$nextTick(() => {
        if (_this["form" + parm].eorderStockapplyDtoList) {
          _this["form" + parm].eorderStockapplyDtoList.forEach(row => {
            _this.selectedData.forEach(element => {
              if (row.stockId == element.id) {
                _this.$refs.multipleTable.toggleRowSelection(element, true);
              }
            });
          });
        }
      }, 500);
    },
    onSubmit() {
      console.log("submit!");
    },
    // 点击新增按钮
    addCol() {
      this.dialogVisibleAdd = true;
    },
    open(tittle, iconClass, className) {
      //提示框
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: className
      });
    },
    async tableFunction(data) {
      // 同步选中的数据到详情弹出框
      let _this = this;
      if (data.button == "详情") {
        _this.isLoading = true;
        _this.region = data.row.logisticsPlatformId;
        _this.setOuid(data.row.webshopId);
        _this.modifiedTime = data.row.modifiedTime.split("T")[0];
        _this.dialogVisibleUp = true;
        await _this.$axios
          .gets(
            `${config.base.ip}:${
              config.base.omsPort
            }/api/services/app/OmsEorderApiManagement/GetDataById`,
            {
              Id: data.row.id
            }
          )
          .then(function(res) {
            console.log("选中数据详情", res.result);
            _this.objData = JSON.stringify(res.result);
            if (data.row.logisticsPlatformId == 0) {
              // 菜鸟
              _this.formTb = { ...res.result };
              _this.regionName = "菜鸟物流";
              console.log("菜鸟");
            } else if (data.row.logisticsPlatformId == 1) {
              // 京东
              _this.formJd = {
                ...res.result
              };
              _this.regionName = "京东无界";
              console.log("京东");
            } else if (data.row.logisticsPlatformId == 2) {
              // 顺丰
              _this.formSf = {
                ...res.result
              };
              _this.regionName = "顺丰快递";
              console.log("顺丰");
            }
          });
        _this.isLoading = false;
      }
    },
    insert() {
      // 新增添加数据(修改数据)
      if (this.region < 0) {
        return;
      }
      let _this = this;
      let parm;
      switch (_this.region) {
        case 0:
          parm = "Tb";
          break;
        case 1:
          parm = "Jd";
          break;
        case 2:
          parm = "Sf";
          _this.formSf.eorderStockapplyDtoList = [];
          break;
        default:
          _this.dialogVisibleAdd = false;
          break;
      }
      if (_this["form" + parm].id) {
        // 修改
        if (_this.objData == JSON.stringify(_this["form" + parm])) {
          // 判断数据有没有进行修改
          _this.dialogVisibleUp = false;
          _this.region = null;
          _this.objData = "";
          return;
        }
        this.$refs["form" + parm + "Up"].validate(valid => {
          if (valid) {
            //验证通过
            let upObject = _this["form" + parm];
            _this.$axios
              .posts(
                `${config.base.ip}:${
                  config.base.omsPort
                }/api/services/app/OmsEorderApiManagement/CreateOrUpdateEorderApi`,
                {
                  ...upObject
                }
              )
              .then(function(res) {
                _this.dialogVisibleUp = false;
                console.log("修改成功:", res);
                _this.$store.commit("setAddColArray", []); //置空新增集合
                _this.$store.commit("get_RowId", ""); //置空修改行id
                _this.$store.commit("setUpdateColArray", []); //置空修改集合
                _this.$store.dispatch("InitTable");
                _this.submitSearch();
                _this.open("修改成功", "el-icon-circle-check", "successERP");
                _this.region = null;
                _this.objData = "";
              })
              .catch(function(err) {
                console.log(err);
                _this.dialogSetting.dialogType = "submit";
                _this.dialogSetting.dialogName = "saveDialog";
                _this.dialogSetting.message = "信息提报有误";
                _this.errorTips.message = err.error.message;
                _this.errorTips.details = "";
                _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
                _this.region = null;
                _this.dialogVisibleUp = false;
                _this.dialogVisible = true;
              });
          }
        });
      } else {
        // 新增
        console.log({
          logisticsPlatformId: _this.region,
          id: 0,
          ..._this["form" + parm]
        });
        this.$refs["form" + parm + "Add"].validate(valid => {
          if (valid) {
            _this.$axios
              .posts(
                `${config.base.ip}:${
                  config.base.omsPort
                }/api/services/app/OmsEorderApiManagement/CreateOrUpdateEorderApi`,
                {
                  // createdTime: _this.GetDateTime(),
                  logisticsPlatformId: _this.region,
                  id: 0,
                  ..._this["form" + parm]
                }
              )
              .then(function(res) {
                _this.dialogVisibleAdd = false;
                _this.$store.commit("setAddColArray", []); //置空新增集合
                _this.$store.commit("get_RowId", ""); //置空修改行id
                _this.$store.commit("setUpdateColArray", []); //置空修改集合
                _this.$store.dispatch("InitTable");
                _this.submitSearch();
                _this.open("新增成功", "el-icon-circle-check", "successERP");
                _this.region = null;
              })
              .catch(function(err) {
                console.log(err);
                _this.dialogSetting.dialogType = "submit";
                _this.dialogSetting.dialogName = "saveDialog";
                _this.dialogSetting.message = "信息提报有误";
                _this.errorTips.message = err.error.message;
                _this.errorTips.details = "";
                _this.dialogCommand = [{ text: "确定", class: "btn-confirm" }];
                _this.region = null;
                _this.dialogVisibleAdd = false;
                _this.dialogVisible = true;
              });
          }
        });
      }
    },
    handleClose(done) {
      done();
      this.region = null;
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    // dialogClick() {
    //   alert("弹出框点击事件");
    // },
    dialogColse() {
      //对话框关闭回调事件
      this.dialogVisible = false;
    },
    dialogClick(parmas) {
      if (parmas.dialogButton == "确定") {
        if (parmas.dialogName == "delDialog") {
          //删除对话框
          this.SelectionChange = this.$store.state[
            this.tableModel + "Selection"
          ];
          for (var i in this.SelectionChange) {
            this.idArray.ids.push(this.SelectionChange[i].id);
          }
          let _this = this;
          if (_this.idArray.ids.indexOf(undefined) != -1) {
            _this.$message({
              type: "warning",
              message: "新增数据请在行内删除"
            });
            _this.dialogVisible = false;
            this.idArray.ids = [];
            return;
          }
          if (_this.idArray.ids.length > 0) {
            console.log("删除", _this.idArray.ids);
            let arry = _this.idArray.ids;
            let deleteList = [];
            for (let i = 0; i < arry.length; i++) {
              deleteList.push({ id: arry[i] });
            }
            _this.$axios
              .posts(
                `${config.base.ip}:${
                  config.base.omsPort
                }/api/services/app/OmsEorderApiManagement/BatchDelete`,
                { ids: arry }
              )
              .then(function(res) {
                _this.SearchStr = "";
                _this.submitSearch();
                _this.$store.commit("setTableSelection", []);
                _this.idArray.ids = [];
                _this.dialogVisible = false;
                _this.open("删除成功", "el-icon-circle-check", "successERP");
              });
          }
        } else if (parmas.dialogName == "saveDialog") {
          //保存提交对话框
          this.dialogVisible = false;
        } else if (parmas.dialogName == "cancelDialog") {
          //取消对话框
          this.isSave = false;
          this.dialogVisible = false; //关闭对话框
          this.$store.dispatch("InitTable");
          this.$store.commit("setAddColArray", []); //置空新增集合
          this.$store.commit("setUpdateColArray", []); //置空修改增集合
        }
      } else if (parmas.dialogButton == "取消") {
        if (parmas.dialogName == "delDialog") {
          //多选删除取消操作
          this.$store.commit("setTableSelection", []); //置空多选
        }
        this.dialogVisible = false;
      }
    },
    handleSelectionChange(val) {
      console.log("选中的数据", val);
      this.multipleSelection = val;
    },
    delBatch() {
      //批量删除
      this.SelectionChange = this.$store.state[this.tableModel + "Selection"];
      if (this.SelectionChange.length == 0) {
        this.$message({
          type: "info",
          message: "请勾选需要更改删除的数据！"
        });
      } else {
        this.dialogSetting.dialogName = "delDialog";
        this.dialogSetting.message = "确定删除？";
        this.dialogSetting.dialogType = "confirm";
        this.dialogCommand = [
          { text: "确定", class: "btn-confirm" },
          { text: "取消", class: "btn-cancel" }
        ];
        this.dialogVisible = true;
      }
    },
    open(tittle, iconClass, className) {
      //提示框
      this.$notify({
        position: "bottom-right",
        iconClass: iconClass,
        title: tittle,
        showClose: false,
        duration: 3000,
        customClass: className
      });
    },
    GetDateTime: function() {
      // 获取当前时间
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
      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    },
    btnClick(data) {
      //按钮组件的点击事件
      switch (data) {
        case "新增":
          this.addCol();
          break;
        case "删除":
          this.delBatch();
          break;
        case "打印":
          // this.cancel();
          break;
        case "保存":
          // this.save();
          break;
        case "打印":
          alert("打印");
          break;
        case "导出":
          // this.handleDownload();
          break;
          alert(data);
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.addRole {
  text-align: center;
  line-height: 35px;
  display: inline-block;
  padding: 0 10px;
  height: 35px;
  background-color: #fff;
  border: 1px solid #c9d1d1;
  border-radius: 5px;
  font-size: 12px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
}
.addRole i {
  position: absolute;
  right: -4px;
  top: -4px;
  color: #cccccc;
  background-color: #fff;
}
.addRole i:hover {
  color: red;
}
.el-form-item {
  margin-bottom: 10px;
}
.addDialog >>> .el-dialog__header {
  height: 27px;
  line-height: 40px;
}
.addDialog >>> .el-dialog__body {
  padding: 25px 0px 35px;
  overflow: inherit;
}
.bg-white {
  background: white;
  border-radius: 3px;
}
.but-box {
  margin: 10px 0px;
}
.pt5 {
  padding-top: 0px;
}
.input-need {
  outline: none;
  border: none;
  width: 100%;
  height: 28px;
  text-align: center;
}
.h48 {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e4e4e4;
}
.open-search {
  background-image: url(../../../static/image/common/btn-circle.png);
  background-repeat: no-repeat;
  background-position: center;
  color: #e3e3e3;
  font-size: 12px;
  width: 19px;
  float: right;
  margin-right: 10px;
}
.border-left {
  border-left: 1px solid #e4e4e4;
}
.fs12 {
  font-size: 12px;
}
.search-btn {
  display: inline-block;
  width: 87px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  background: #4a6997;
  color: white;
  cursor: pointer;
}
.open {
  display: inline-block;
  width: 49px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #cccccc;
  color: #cccccc;
  text-align: center;
  cursor: pointer;
}
.update-icon {
  position: absolute;
  left: -55px;
  top: 0px;
}
.Highlight {
  background: #4a6997;
}
.border-left.rightBox {
  width: calc(100% - 290px);
}
.border-left.newRight {
  width: 100%;
}
.search_box {
  margin-bottom: 15px;
}

.electronicSurfaceInterfaceList .el-radio__label {
  display: inline;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.electronicSurfaceInterfaceList >>> .el-radio__label {
  display: inline;
  font-size: 12px;
}
.box >>> .el-radio__label {
  display: inline;
  font-size: 12px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.curpage {
  cursor: pointer;
}
.search_input_group {
  margin-top: 0px;
}
.fl {
  float: left;
}
.fr {
  float: right;
  font-size: 12px;
  color: #999999;
}
.electronicSurfaceInterfaceList >>> .el-dialog__header {
  overflow: hidden;
  padding-top: 40px;
}

/* 滚动加载表格的相关设置 */
.transfer-layout {
  bottom: -5px;
  right: 0;
}
.layout-circle {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #d6d7d5;
  font-size: 13px;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
}
.layout-circle p {
  width: 100%;
  height: 17px;
  line-height: 17px;
  overflow: hidden;
}
i.line {
  display: block;
  width: 84%;
  border-bottom: 1px solid;
  margin: 0 auto;
}
.font-orange {
  color: #e26756;
}
.end-notice {
  position: absolute;
  top: 53%;
  left: 40%;
  background: #fdf6ec;
  padding: 10px 35px;
  border-radius: 8px;
  color: #e6a23c;
}
.pr {
  width: 100%;
}
.tableBox >>> .el-table__header,
.tableBox >>> .el-table__body {
  width: 100% !important;
}
</style>
<style>
#electronicSurfaceInterfaceList .el-input__inner {
  height: 28px !important;
}
#electronicSurfaceInterfaceList .el-dialog__header {
  padding-top: 35px;
}
#electronicSurfaceInterfaceList .el-dialog__footer {
  padding-bottom: 10px;
}
#electronicSurfaceInterfaceList .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
#electronicSurfaceInterfaceList .el-form-item__label {
  height: 28px;
  line-height: 28px;
}
#electronicSurfaceInterfaceList .el-input__icon {
  line-height: 28px;
}
#electronicSurfaceInterfaceList .el-form-item__content {
  line-height: 28px;
}
</style>
