<template>
 <div class="shop-detail">
     <el-row> 
         <el-col :span="24"  class="fixed bg-white bb1">
             <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            
            <span @click="ifShow = !ifShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
        </el-col>
    </el-row>
    <el-collapse-transition>
        <div v-show="ifShow">   
            <el-row class="bg-white pt10">
                <el-col :span="24" class="getPadding"> 
                    <div class="tipsWrapper mb10">
                        <div class="errorTips">
                            <p class="msgDetail">错误提示：
                                <span :class="{block : !validation.hasError('createShopParams.ouId')}">
                                     所属组织{{ validation.firstError('createShopParams.ouId') }},
                                </span>
                                <!-- <span>{{'1'+createShopParams.contactCode}}</span> -->
                                <span :class="{block : !validation.hasError('createShopParams.shopCode')}">
                                     编码{{ validation.firstError('createShopParams.shopCode') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.shopName')}">
                                     名称{{ validation.firstError('createShopParams.shopName') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.shopFullname')}">
                                     全称{{ validation.firstError('createShopParams.shopFullname') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.mnemonic')}">
                                     助记码{{ validation.firstError('createShopParams.mnemonic') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.contactClassId')}">
                                     客户分类{{ validation.firstError('createShopParams.contactClassId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.contactWorkPropertyId')}">
                                     客户性质{{ validation.firstError('createShopParams.contactWorkPropertyId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.contactGradeId')}">
                                     客户等级{{ validation.firstError('createShopParams.contactGradeId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.contactTypeId')}">
                                     客户类型{{ validation.firstError('createShopParams.contactTypeId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.ficaOuId')}">
                                     对应财务组织{{ validation.firstError('createShopParams.ficaOuId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.taxCode')}">
                                     纳税登记号{{ validation.firstError('createShopParams.taxCode') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.opAreaId')}">
                                     业务地区{{ validation.firstError('createShopParams.opAreaId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.adAreaId')}">
                                     行政地区{{ validation.firstError('createShopParams.adAreaId') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.legalPerson')}">
                                     法人代表{{ validation.firstError('createShopParams.legalPerson') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.regAddress')}">
                                     注册地址{{ validation.firstError('createShopParams.regAddress') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.manager')}">
                                     负责人{{ validation.firstError('createShopParams.manager') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.phone')}">
                                     电话{{ validation.firstError('createShopParams.phone') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.remark')}">
                                     备注{{ validation.firstError('createShopParams.remark') }},
                                </span>

                                <span :class="{block : !validation.hasError('createShopParams.status')}">
                                     状态{{ validation.firstError('createShopParams.status') }},
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    

                    <div class="bgcolor">
                        <label><small>*</small>所属组织</label>
                        <el-select v-model="defaultOuId" 
                                    placeholder=""
                                    class="ouId"
                                    disabled
                                    @focus="showErrprTipsSelect"
                                    @change='Modify()'
                                    :class="{redBorder : validation.hasError('createShopParams.ouId')}">

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


                    <div class="bgcolor">
                        <label><small>*</small>编码</label>
                        <el-input v-model="createShopParams.shopCode" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createShopParams.shopCode')}"
                                class="shopCode"></el-input>
                    </div>


                    <div class="bgcolor">
                        <label><small>*</small>名称</label>
                        <el-input v-model="createShopParams.shopName" 
                                placeholder=""
                                @focus="showErrprTips" 
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createShopParams.shopName')}"
                                class="shopName"></el-input>
                    </div>


                    <div class="bgcolor">
                        <label><small>*</small>全称</label>
                        <el-input v-model="createShopParams.shopFullname" 
                                    placeholder=""
                                    @focus="showErrprTips" 
                                    @change='Modify()'
                                    :class="{redBorder : validation.hasError('createShopParams.shopFullname')}"
                                    class="shopFullname"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label><small>*</small>店铺性质</label>
                        <el-select v-model="createShopParams.shopWorkPropertyid"
                                    placeholder=""
                                    @change='Modify()'
                                    @focus="showErrprTipsSelect"
                                    class="shopWorkPropertyid"
                                    :class="{redBorder : validation.hasError('createShopParams.shopWorkPropertyid')}">
                            <el-option v-for="item in propertyAr" 
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor">
                        <label>对应仓库</label>
                            <el-select  v-model="createShopParams.stockId" :filter-method="filterStockMethod" clearable filterable>
                                <el-option
                                v-for="item in stockFilter"
                                :key="item.id"
                                :label="item.stockName"
                                :value="item.id"
                                @change='Modify()'
                                @focus="showErrprTipsSelect"
                                :class="{redBorder : validation.hasError('createShopParams.stockId')}"
                                :disabled="createShopParams.shopWorkPropertyid === 1"
                                >
                                <span style="float: left">{{ item.stockName }}</span>
                                <span style="float: right;">{{ item.stockCode }}</span>
                                </el-option>
                            </el-select>
                    </div>

                    <div class="bgcolor">
                        <label>店铺等级</label>
                        <el-select v-model="createShopParams.shopGradeid"
                                    placeholder=""
                                    @change='Modify()'
                                    @focus="showErrprTipsSelect"
                                    class="shopGradeid"
                                    :class="{redBorder : validation.hasError('createShopParams.shopGradeid')}">
                            <el-option v-for="item in gradeAr" 
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor">
                        <label>开店日期</label>
                        <el-date-picker v-model="createShopParams.openingDate" 
                                        type="date" 
                                        @focus="showErrprTips"
                                        class="openingDate"
                                        @change='Modify()'
                                        :class="{redBorder : validation.hasError('createShopParams.openingDate')}"
                                        placeholder=""></el-date-picker>
                    </div>

                    <div class="bgcolor">
                        <label>业务地区</label>
                        <el-select v-model="createShopParams.opAreaId"
                                    class="opAreaId"
                                    @change='Modify()'
                                    placeholder=""
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('createShopParams.opAreaId')}">
                            <el-input placeholder="搜索..."
                                      class="selectSearch"
                                      v-model="opSearch"></el-input>
                            <el-tree :data="opAr"
                                     :default-expanded-keys="expandOpId"
                                     :props="selectOpProps"
                                     :highlight-current="true"
                                     node-key="id"
                                     :render-content='renderContentOp'
                                     ref="opTree"
                                     :filter-node-method="opFilterNode"
                                     :expand-on-click-node="false"
                                     @node-click="opNodeClick"></el-tree>
                            <el-option v-show="false"
                                       v-for="item in opItem"
                                       :key="item.id" 
                                       :label="item.areaName" 
                                       :value="item.id"
                                       id="op_confirmSelect"></el-option>
                        </el-select>
                    </div>
                    
                    <div class="bgcolor area">
                        <label>行政地区</label>
                        <div class="areaBox">
                            <el-select v-model="proId" class="areaDrop" placeholder="选择省" @change='chooseProvince(proId)'>
                                <el-option v-for="item in areaProArray" :key="item.id" :label="item.areaName" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select  class="areaDrop" placeholder="选择市" v-model="cityId" @change='chooseCity(cityId)'>
                                <el-option v-for="item in areaCityArray" :key="item.id" :label="item.areaName" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select  class="areaDrop" placeholder="选择区" v-model="createShopParams.adAreaId" @change='chooseDis()'>
                                <el-option v-for="item in areaDisArray" :key="item.id" :label="item.areaName" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>


                    <div class="bgcolor">
                        <label>负责人</label>
                        <el-input v-model="createShopParams.manager" 
                                placeholder=""
                                class="manager"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createShopParams.manager')}"
                                @focus="showErrprTips"></el-input>
                    </div>
                    
                    <div class="bgcolor">
                        <label>电话</label>
                        <el-input v-model="createShopParams.phone" 
                                placeholder=""
                                @change='Modify()'
                                class="phone"
                                :class="{redBorder : validation.hasError('createShopParams.phone')}"
                                @focus="showErrprTips"></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>商圈</label>
                        <el-select v-model="createShopParams.tradingAreaid"
                                placeholder=""
                                @change='Modify()'
                                @focus="showErrprTipsSelect"
                                class="tradingAreaid"
                                :class="{redBorder : validation.hasError('createShopParams.tradingAreaid')}">
                            <el-option v-for="item in busAr" 
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor">
                        <label><small>*</small>状态</label>
                        <el-select v-model="createShopParams.status"
                                    class="status"
                                    placeholder=""
                                    @change='Modify()'
                                    @focus="showErrprTipsSelect"
                                    :class="{redBorder : validation.hasError('createShopParams.status')}">
                            <el-option v-for="item in statusAr"  
                                    :key="item.itemValue" 
                                    :label="item.itemName" 
                                    :value="item.itemValue"></el-option>
                        </el-select>
                    </div>

                    <div class="bgcolor">
                        <label>店铺地址</label>
                        <el-input v-model="createShopParams.shopAddress" 
                                placeholder=""
                                @focus="showErrprTips"
                                class="shopAddress"
                                :class="{redBorder : validation.hasError('createShopParams.shopAddress')}"
                                @change='Modify()'></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>经度</label>
                        <el-input v-model="createShopParams.longitude" 
                                placeholder=""
                                @focus="showErrprTips"
                                class="longitude"
                                :class="{redBorder : validation.hasError('createShopParams.longitude')}"
                                @change='Modify()'></el-input>
                    </div>

                    <div class="bgcolor">
                        <label>纬度</label>
                        <el-input v-model="createShopParams.latitude" 
                                placeholder=""
                                @focus="showErrprTips"
                                class="latitude"
                                :class="{redBorder : validation.hasError('createShopParams.latitude')}"
                                @change='Modify()'></el-input>
                    </div>
                    
                    <div class="bgcolor">
                        <label>备注</label>
                        <el-input v-model="createShopParams.remark" 
                                placeholder=""
                                class="remark"
                                @change='Modify()'
                                :class="{redBorder : validation.hasError('createShopParams.remark')}"
                                @focus="showErrprTips"></el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-collapse-transition>     

    <!-- 联系人bootTab标签页 -->
    <el-row class="nopadding mt10"> 
        <div class="tabZoo">
            <el-col :span="24">
               <el-tabs v-model="activeName">
                    <el-tab-pane label="联系人" name="contact" class="getPadding" style="z-index:-10">
                        <button class="erp_bt bt_add" @click="addCol">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail">新增</span>
                        </button>

                        <button class="erp_bt bt_excel mb10">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_excel.png">
                            </div>
                            <span class="btDetail">Excel</span>
                        </button>

                        <button class="erp_bt bt_del" @click='delMore(2)'>
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_del.png">
                            </div>
                            <span class="btDetail">删除</span>
                        </button>

                        <button class="erp_bt bt_auxiliary">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_auxiliary.png">
                            </div>
                            <span class="btDetail">辅助功能</span>
                        </button>
                        
                
                        <el-table :data="addList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            
                            <el-table-column prop="contactPerson" label="联系人" width="180">
                                <template slot-scope="scope">
                                    <img class="abimg" src="../../../static/image/content/redremind.png"/>
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
                                    <el-button v-on:click="handleDelete(scope.$index,scope.row,1)" type="text" size="small">删除</el-button>
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
                <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createName" placeholder="" disabled="disabled"></el-input></div>
                <div class="bgcolor"><label>创建时间</label><el-date-picker v-model="auditInformation.createTime" type="date" placeholder="" disabled="disabled"></el-date-picker></div>
                <div class="bgcolor"><label>修改人</label><el-input v-model="auditInformation.modifyName" placeholder="" disabled="disabled"></el-input></div>
                <div class="bgcolor"><label>修改时间</label><el-date-picker v-model="auditInformation.modifyTime" type="date" placeholder="" disabled="disabled"></el-date-picker></el-input></div>
            </div>                                  
        </el-col>
    </el-row>      

    <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    <!-- dialog -->                                                                  
</div>
</template>

<script>
import dialogBox from '../../base/dialog/dialog'
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import {FILTER_MOTHED} from '../../common/common.js'
export default({
    name:'shopDetail',
    components:{
        buttonGroup,
        dialogBox

    },
    created () {
        let self=this;
        self.loadSelect();
    },
    validators: {
        'createShopParams.ouId': function (value) {//所属组织
            return this.Validator.value(value).required().integer();
        },
        'createShopParams.shopCode': function (value) {//编码
            return this.Validator.value(value).required().maxLength(50);
        },
        'createShopParams.shopName': function (value) {//名称
            return this.Validator.value(value).required().maxLength(50);
        },
        'createShopParams.shopFullname': function (value) {//全称
            return this.Validator.value(value).required().maxLength(50);
        },
        'createShopParams.shopWorkPropertyid': function (value) {//店铺性质
            return this.Validator.value(value).integer();
        },
        'createShopParams.stockId': function (value) {//对应仓库
            return this.Validator.value(value).integer();
        },
        'createShopParams.shopGradeid': function (value) {//店铺等级
            return this.Validator.value(value).integer();
        },
        'createShopParams.openingDate': function (value) {//开店日期
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.opAreaId': function (value) {//业务地区
            return this.Validator.value(value).integer();
        },
        'createShopParams.adAreaId': function (value) {//行政地区
            return this.Validator.value(value).integer();
        },
        'createShopParams.manager': function (value) {//负责人
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.phone': function (value) {//电话
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.tradingAreaid': function (value) {//商圈
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.status': function (value) {//状态
            return this.Validator.value(value).required().integer();
        },
        'createShopParams.shopAddress': function (value) {//店铺地址
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.longitude': function (value) {//经度
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.latitude': function (value) {//纬度
            return this.Validator.value(value).maxLength(50);
        },
        'createShopParams.remark': function (value) {//备注
            return this.Validator.value(value).maxLength(200);
        },
    },
    
    watch: {
      ouSearch(val) {
        this.$refs.ouTree.filter(val);
      }
    },
    computed:{   
     stockFilter: function () {//下拉数据自定义搜索过滤 店铺
          return FILTER_MOTHED(this.filterStockKey,this.stockAr)
      },
    },
    methods:{
        filterStockMethod(query){
            this.filterStockKey=query
        },
        //---下拉的数据------------------------------------------------------
        loadSelect:function(){
            let self = this;
            //所属组织
            self.$axios.gets('/api/services/app/OuManagement/GetOuParentList').then(function(res){ 
                console.log(res)
                self.ouSelectAr = res.result;
            })
            self.$axios.gets('/api/services/app/OuManagement/GetAllTree').then(function(res){
                // console.log(res);
                self.ouAr = res;
                self.expandId=self.defauleExpandTree(res.result,'id')
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });
            //获取当前默认ouid
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                console.log(res);
                self.defaultOuId = res.result.id;
                // self.createShopParams.ouId = self.defaultOuId;
                self.createShopParams.ouId = 38;
                //加载完成拿回下拉的默认值
                // self.ouItem.ouName = res.result.ouName;
                // self.ouItem.id =  res.result.id;
                // console.log('222222222222')
                //业务地区
                self.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:self.defaultOuId}).then(function(res){
                    console.log(res);
                    if(res.result&&res.result.length>0){
                        self.opAr = res.result;
                        self.expendOpId = self.defauleExpandTree(res.result,'id')
                        // self.loadIcon();
                    }else{
                        self.opItem[0].areaName = '暂无业务地区'
                        console.log(self.opItem)
                    };
                },function(res){
                    console.log('err'+res)
                });

                //对应仓库
                self.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:self.defaultOuId,Start:0,Length:100}).then(function(res){
                    console.log(res);
                    self.stockAr = res.result.items;
                },function(res){
                    console.log('err'+res)
                });


            },function(res){
                console.log('err'+res)
            });

            //---获取行政地区省级下拉框--------
            self.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){
                // console.log(res);
                self.areaProArray = res.result;
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            });

            // //行政地区
            // self.$axios.gets('/api/services/app/AdAreaManagement/GetListByLevelNo',{LevelNo:1}).then(function(res){
            //     console.log(res);
            //     self.areaProArray = res.result;
            //     // self.loadIcon();
            // },function(res){
            //     console.log('err'+res)
            // });

            //店铺性质
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ShopWorkProperty'}).then(function(res){
                console.log(res);
                self.propertyAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //店铺等级
            self.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'ShopGrade'}).then(function(res){
                // console.log(res);
                self.gradeAr = res.result;
            },function(res){
                console.log('err'+res)
            });
            //行政地区*2
            // self.$axios.gets('/api/services/app/AreaManagement/GetAllDataTree',{AreaType:2}).then(function(res){
            //     // console.log(res);
            //     self.adAr = res.result;
            //     self.loadIcon();
            // },function(res){
            //     console.log('err'+res)
            // });
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
                // console.log(res);
                self.sexAr = res.result;
            },function(res){
                console.log('err'+res)
            });
        },
        //------------------------------------------------------------------

        //---跳转修改页------------------------------------------------
        goModify:function(id){//点击跳转修改页modify
            this.$store.state.url='/shop/shopModify/'+id;
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        //------------------------------------------------------------

        //---保存数据--------------------------------------------------       
        save:function(){//创建店铺
            let self = this;
            
            $('.tipsWrapper').css({display:'block'})
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'}) 
                    self.createShopParams.shopContacts = self.addList;
                    let push = false;
                    if(self.createShopParams.shopContacts.length>0){
                        for(let i in self.createShopParams.shopContacts){
                            if(self.createShopParams.shopContacts[i].contactPerson!=''){
                                push = true;
                            }
                        }
                        if(push){
                            self.$axios.posts('/api/services/app/ShopManagement/Create',self.createShopParams).then(function(res){
                                // console.log(res);
                                self.open('创建成功','el-icon-circle-check','successERP');
                                self.backId = res.result.id;

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
                        }else{
                            self.$message({
                                type: 'info',
                                message: '联系人必填'
                            });
                            $('.tipsWrapper').css({display:'none'})
                        }
                    }else{
                        self.$axios.posts('/api/services/app/ShopManagement/Create',self.createShopParams).then(function(res){
                            // console.log(res);
                            self.open('创建成功','el-icon-circle-check','successERP');
                            self.backId = res.result.id;

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
                    };

                    
                    
                }
            })

        },
        saveAdd:function(){
            let self = this;
            $('.tipsWrapper').css({display:'block'})
            self.$validate().then(function(success){
                if(success){
                    $('.tipsWrapper').css({display:'none'})
                    if(self.addList.length>0){
                        self.createShopParams.shopContacts = self.addList;
                        self.$axios.posts('/api/services/app/ShopManagement/Create',self.createShopParams).then(function(res){
                        console.log(res);
                        self.open('创建店铺资料成功','el-icon-circle-check','successERP');
                        self.Cancel();
                    },function(res){
                        // console.log(res)
                        // self.open('创建失败','el-icon-error','faildERP')
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
        addCol:function(){
            console.log(123)
            let self = this;
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
                self.addList.unshift(self.xrows.newCol)
                console.log(self.addList)
        },

        //-----------------------------------------------------

        //---确认删除-------------------------------------------
        sureDel:function(){
            let self = this;

            if(self.who == 1){//单项删除
                self.addList.splice(self.whoIndex,1);
                //self.dialogDelConfirm = false;
                //self.open('删除成功','el-icon-circle-check','successERP');
            };

            if(self.who == 2){//批量删除
                let x=[];
                $.each(self.addList,function(index,value){
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
                self.addList = x;
                // console.log(self.addList)
                //self.dialogDelConfirm = false;
            }

        },
        //-----------------------------------------------------
        
        //---从表表格内删除-------------------------------------------
        handleDelete:function(index,row,who){//表格内删除操作
            let self = this;
            self.who = who;
            self.whoIndex = index;
            self.sureDel();
            //self.dialogDelConfirm = true;
        },
        //-------------------------------------------------------

        //---从表多项删除-----------------------------------------
        delMore:function(num){
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
        //------------------------------------------------------

        //---默认-------------------------------------------------------
        
        getCurrentRow:function(index,row){//默认单选框
            let self = this;
            // for(let i in self.contactData){
            //     self.contactData[i].isDefault = false;
            // }
            // self.contactData[index].isDefault = true;

            for(let i in self.addList){
                self.addList[i].isDefault = false;
            }
            self.addList[index].isDefault = true;
            
        },
        //----------------------------------------------------------

        //---从表复选框---------------------------------------
        handleSelectionChange:function(val){//点击复选框选中的数据
                this.multipleSelection = val;
        },
        //---------------------------------------------------

        //---从表修改----------------------------------------
        handleChange:function(index,row){
            let self = this;
            self.ifModify = true;
        },
        //--------------------------------------------------

        //---判断是否有修改过的内容---------------------------
        Modify:function(){//判断主表是否修改过
            let self = this;
            self.ifModify = true;
        },
        Cancel:function(){
            let self = this;
            
            if(self.ifModify){
                self.dialogUserConfirm = true;
                self.backCancle = 1;//为1是取消
            }
            // console.log(self.backCancle)
        },
        
        //--------------------------------------------------

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
            this.$store.state.url='/shop/shopList/default'
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
        //------------------------------------------------

        //------------------------------------------------
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

        //---树通用----------------------------------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null 
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },
        //-------------------------------------------------

        //---树筛选----------------------------------------
        ouFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.ouName.indexOf(value) !== -1;
        },
        opFilterNode(value, data) {
            console.log(data)
            if (!value) return true;
                return data.areaName.indexOf(value) !== -1;
        },
        //-------------------------------------------------

        //---树点击----------------------------------------
        ouNodeClick:function(data,node,self){
            let _this = this;
            console.log(data)
            _this.createShopParams.stockId = '';
            _this.createShopParams.opAreaId = '';
            _this.opItem[0].areaName = '';
            // 点击所属组织，业务地区跟着变动
            _this.$axios.gets('/api/services/app/OpAreaManagement/GetTreeByOuId',{OuId:data.id}).then(function(res){
                console.log(res)
                if(res.result&&res.result.length>0){
                    _this.opAr = res.result;
                }else{
                    _this.opItem[0].areaName = '暂无业务地区';
                    _this.opItem[0].id = '';
                }
            },function(res){
                console.log('err'+res)
            });
            // 点击所属组织，对应仓库跟着变动
            _this.$axios.gets('/api/services/app/StockManagement/GetRepositoryList',{OuId:data.id,Start:0,Length:100}).then(function(res){
                // console.log(res);
                _this.stockAr = res.data;
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
            console.log(data)
            let self = this;
            console.log(data)
            self.opItem[0].id = data.id;
            self.opItem[0].areaName = data.areaName;
            // self.queryOp = data.id;
            self.$nextTick(function(){
                $('#op_confirmSelect').click()
            })
        },
        //-------------------------------------------------

        //---树render-content------------------------------
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
        renderContentOp(h, { node, data, store }){//业务地区
            if(typeof(data.children)!='undefined' && data.children!=null && data.children.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.areaName}
                    </span>
                );
            }else{
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.areaName}
                    </span>
                );
            }
        },
        //------------------------------------------------


        //---选择省市区-----------------------------------------
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
                
                self.areaDisArray = res.result;
                // self.loadIcon();
            },function(res){
                console.log('err'+res)
            })
        },
        chooseDis:function(){
            let self = this;
            console.log(self.createShopParams.adAreaId)
        },
        //-----------------------------------------------------
        //---提示错误-------------------------------------------
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
        getErrorMessage(message,details,validationErrors){
            let self=this;
            self.response.message='';
            self.response.details='';
            self.response.validationErrors=[];
            if(details!=null && details){
                self.response.details=details;
            }
            if(message!=null && message){
                self.response.message=message;
            }
            if(message!=null && message){
                self.response.validationErrors=validationErrors;
            }d
        },
        //-------------------------------------------------------------
        dialogClick(parmas){
            if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="backDialog"){//保存提交对话框
                    this.back();
                    this.dialogVisible=false;
                }else if(parmas.dialogName=="saveDialog"){
                    this.dialogVisible=false;
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
    },

    data() {
        return{
            // defaultOuId:'',
            defaultOuId:38,
            ifShow:true,
            ifModify:false,//判断信息是否修改过
            auditInformation:{//审计信息
                createName:"",
                createTime:"",
                modifyName:"",
                modifyTime:"",
                startTime:"",
                finishTime:"",
                finishName:"",
            },
            search:'',
            defaultProps: {
                children: 'items',
                label: 'areaName',
                id:'id'
            },  
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
            //-----------------------

            //---行政地区树形下拉-----
                areaProArray:[],//行政地区(省)
                areaCityArray:[],//行政地区(市)
                areaDisArray:[],//行政地区(区)
                proId:'',//省id
                cityId:'',//市id
            //-----------------------
            //---业务地区树形下拉-----
                opSearch:'',//树形搜索框的
                selectOpProps:{
                    children: 'childItems',
                    label: 'areaName',
                    id:'id'
                },
                opItem:[{
                    id:'',
                    areaName:'',
                }],
                opAr:[],//业务地区下拉框
                expandOpId:[],
            //-----------------------
            //---普通下拉------------
            propertyAr:[],//店铺性质下拉框
            stockAr:[],//对应仓库
            gradeAr:[],//店铺等级下拉框
            statusAr:[],//状态下拉框
            sexAr:[],//性别下拉
            busAr:[],//商圈下拉
            //-----------------------
            
            activeName: 'contact',//tabs标签页默认激活name

            createShopParams:{
                ouId: '',
                shopCode: "",
                shopName: "",
                shopFullname: "",
                shopWorkPropertyid: 0,
                opAreaId: '',
                stockId: '',
                mnemonic: "",
                shopGradeid: '',
                adAreaId: '',
                openingDate: "",
                manager: "",
                phone: "",
                tradingAreaid: '',
                shopAddress: "",
                longitude: '',
                latitude: '',
                remark: "",
                status:1,
                brandCodes: [],
                shopContacts: [
                    {
                    contactPerson: "",
                    mobile: "",
                    phone: "",
                    isDefault: false,
                    remark: "",
                    position: "",
                    sex: '',
                    id: 0
                    }
                ],
                id: 0
            },

            contactData:[],//银行数据列表，开始为空
            addList:[],//需要添加的联系人信息


            multipleSelection:[],//需要删除的银行数组

            contactIndex:[],

            x:0,
            xrows:[],
            backId:'',
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
            filterStockKey:'',//过滤字段
            //-----------------------------
            who:'',//删除的是谁以及是否是多项删除
            // whoId:'',//单项删除的id
            whoIndex:'',//单项删除的index
            //-------------------
            // 新增删除保存保持现状取消
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
       

  })
  </script>

  <style>
    .block{
        display: none;
    }
    .bg-white{
        background: white;
    }
    .shop-detail{
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
    .shop-detail .upBt{
        font-size: 12px;
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .shop-detail .upBt i{
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s; 
        color:#cacaca;
        margin-left: 5px;
    }
    .shop-detail .inline-block-need{
        display: inline-block;
    }
    .shop-detail .upBt i.rotate{
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg); 
    }

    .shop-detail  .errorTips{
        margin-bottom: 10px;
    }  
    .shop-detail .el-row:first-child{
        padding:5px 0;
    }
    .shop-detail .el-row{
        padding:15px 0;
        background-color: #fff;
    }
    .shop-detail .el-row:last-child{
        border-bottom:none;
    }

    .shop-detail .tabZoo{
        overflow: hidden;
        background-color: #fff;
    }

    .shop-detail  .getPadding,.tabZoo .el-tabs__nav-scroll{
        padding: 0 10px;
    }
    .shop-detail .tabZoo .auditInformation{
        margin-top: 15px;
    }

    .shop-detail .tabZoo .erp_bt:first-child{
        margin-left: 0;
    }
    .shop-detail .nopadding{
        padding-top: 0;
    }
    .shop-detail .el-table th {
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        text-align: left;
        padding: 5px 0;
        text-align: center;
        background-color: #ececec;
    }
    .shop-detail .el-table td{
        padding: 3px 0;
    }
    .shop-detail .el-table__body{
        text-align: center;
    }
    .shop-detail .el-table .cell{
        padding-left:0px;
        padding-right:0px;
    }
    .mb10{
        margin-bottom: 10px;
    }
    .shop-detail .el-input__inner{
        height:35px !important;
        border:1px solid white;
        /* border-color:white !important; */
    }
    .shop-detail .all-table .el-input__inner{
        height:35px !important;
        text-align: center !important;
        border:none !important;
    }
    .shop-detail .bgw .el-input__inner{
        background-color:white;
        text-align: center;
    }
    .shop-detail .bgp .el-input__inner{
        background-color:#FAFAFA;
        text-align: center;
    }
    .shop-detail .el-select-dropdown__item{
        text-align: center;
    }
    .shop-detail .area{
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
  </style>