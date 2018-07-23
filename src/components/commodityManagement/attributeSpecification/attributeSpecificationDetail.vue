<template>
    <div class="at-sp-detail">
        <el-row class="bg-white h48 fixed">
            <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
        </el-row>
        <el-row class="bg-white">
            <el-col :span="5">
                <el-col class="h48 pl15 pr15" :span="24">
                    <el-input placeholder="搜索..."
                              v-model="searchKey"
                              class="bAreaSearch">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>

                <el-col :span="24" class="tree-container transfer_fixed">
                    <vue-scroll :ops='$store.state.option'>
                        <el-tree v-loading="treeLoading"
                                :data="componyTree"
                                :default-expanded-keys="expandId"
                                :props="defaultProps"
                                node-key="id"
                                :render-content="renderContent"
                                ref="tree"
                                :filter-node-method="filterNode"
                                :expand-on-click-node="false"
                                highlight-current
                                @node-click="nodeClick">
                        </el-tree>
                    </vue-scroll>
                </el-col>
            </el-col>

            <el-col :span="19" class="bg-gray">
                <el-row class="section-style bg-gray-in pl10">
                    <el-row>
                        <div class="bgcolor">
                            <label>商品类目</label>
                            <!-- <span>{{$store.state.option}}</span> -->
                            <el-input placeholder=""
                                      v-model="categoryName"
                                      :disabled="true"></el-input>
                        </div>

                        <div class="bgcolor">
                            <el-checkbox v-model="ifInherit" @change='mainChange'>规格属性继承到子类目</el-checkbox>
                        </div>
                    </el-row>
                    <el-row>
                        <div class="bgcolor">
                            <el-checkbox v-model="ifOne" @change='mainChange'>唯一码管理</el-checkbox>
                        </div>

                        <div class="bgcolor">
                            <el-checkbox v-model="ifBatch" @change='mainChange'>批次管理</el-checkbox>
                        </div>

                        <div class="bgcolor">
                            <el-checkbox v-model="ifPeriod" @change='mainChange'>保质期管理</el-checkbox>
                        </div>
                    </el-row>
                </el-row>

                <el-row class="section-style bg-gray-in mt20">
                    <el-col :span='24' class="pl10">
                        <span class="header-title">商品属性</span>
                        <div class="choose-add" @click="dialogAttributeShow">
                            <img src="../../../../static/image/common/bt_add_white.png">
                            <span class='choose-text'>选取</span>
                        </div>
                        <span class="showBtn" @click="attrShow = !attrShow">
                            收起
                            <i class="el-icon-arrow-down" :class="{rotate : !attrShow}"></i>
                        </span>
                    </el-col>
                    <el-collapse-transition>
                        <el-col :span="24" v-show="attrShow">
                            <el-table :data="attData" stripe border style="width: 100%" class="all-table">
                                <el-table-column prop="sex" label=" " width="180">
                                    <template slot-scope="scope" width='50'>
                                        <span>{{scope.$index+1}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="propertyCode" label="属性编码" width="180"></el-table-column>

                                <el-table-column prop="propertyName" label="属性名称" width="180"></el-table-column>

                                <el-table-column prop="statusTValue" label="状态" width="180"></el-table-column>

                                <el-table-column label='操作'>
                                    <template slot-scope="scope" >
                                        <el-button @click="handleAttDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-col>
                    </el-collapse-transition>
                </el-row>

                <el-row class="section-style bg-gray-in mt20">
                    <el-col :span='24' class="pl10">
                        <span class="header-title">商品规格</span>
                        <div class="choose-add" @click="dialogSpecShow">
                            <img src="../../../../static/image/common/bt_add_white.png">
                            <span class='choose-text'>选取</span>
                        </div>
                        <span class="showBtn" @click="specShow = !specShow">
                            收起
                            <i class="el-icon-arrow-down" :class="{rotate : !specShow}"></i>
                        </span>
                    </el-col>
                    <el-collapse-transition>
                        <el-col :span="24" v-show="specShow">
                            <el-table :data="specData" stripe border style="width: 100%" class="all-table">
                                <el-table-column prop="sex" label=" " width="180">
                                    <template slot-scope="scope" width='50'>
                                        <span>{{scope.$index+1}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="specCode" label="属性编码" width="180"></el-table-column>

                                <el-table-column prop="specName" label="属性名称" width="180"></el-table-column>

                                <el-table-column prop="statusTValue" label="状态" width="180"></el-table-column>

                                <el-table-column label='操作'>
                                    <template slot-scope="scope" >
                                        <el-button @click="handleSpecDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-collapse-transition>
                </el-row>
            </el-col>
        </el-row>

        <!-- 属性弹出层 开始 -->
        <el-dialog :visible.sync="dislogAttribute" title="商品属性" class="transfer_dialog">
            <el-col :span="24">
                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>已选</span>
                        <div class="transfer_search" @keyup.enter="searchLeftAttribute">
                            <el-input placeholder="搜索..."
                                      v-model="searchLeftAtt"
                                      class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="transfer_table">
                        <el-table :data="attLeftOnePageData" border style="width: 100%" stripe @selection-change="leftChoose" ref="roleTableLeft">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="propertyCode" label="属性编码"></el-table-column>
                            <el-table-column prop="propertyName" label="属性名称"></el-table-column>
                            <el-table-column prop="statusTValue" label="状态"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>共{{totalPageLeftAtt}}页</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="leftBackBtnAttr" @click="pageBackLeftAttr" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="leftNextBtnAttr" @click="pageNextLeftAttr" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>

                <el-col :span="2" class="transfer_btns">
                    <el-col :span="24" class="transfer_btn_wrapper">
                        <el-button class="el_transfer" :disabled="if_r_to_l_att" type="primary" icon="el-icon-arrow-left" round></el-button>
                        <el-button class="el_transfer" :disabled="if_l_to_r_att" type="primary" icon="el-icon-arrow-right" round></el-button>
                    </el-col>
                </el-col>

                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>可选</span>
                        <div class="transfer_search"  @keyup.enter="searchRightAttribute">
                            <el-input placeholder="搜索..."
                                      v-model="searchRightAtt"
                                      class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="transfer_table">
                        <el-table :data="attRightOnePageData" border style="width: 100%" stripe @selection-change="rightChoose" ref="roleTabRight">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="propertyCode" label="属性编码"></el-table-column>
                            <el-table-column prop="propertyName" label="属性名称"></el-table-column>
                            <el-table-column prop="statusTValue" label="状态"></el-table-column>
                        </el-table>

                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>共{{totalPageRightAtt}}页</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="rightBackBtnAttr" @click="pageBackRightAttr" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="rightNextBtnAttr" @click="pageNextRightAttr" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="surePushAttr">确 认</button>
                <button class="transfer_footer_btn" @click="cancelPushAttr">取 消</button>
            </span>
        </el-dialog>
        <!-- 属性弹出层 结束 -->

        <!-- 规格弹出层 开始 -->
        <el-dialog :visible.sync="dislogSpec" title="商品规格" class="transfer_dialog">
            <el-col :span="24">
                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>已选</span>
                        <div class="transfer_search" @keyup.enter="searchLeftSpecifications">
                            <el-input placeholder="搜索..."
                                      v-model="searchLeftSpec"
                                      class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="transfer_table">
                        <el-table :data="specLeftOnePageData" border style="width: 100%" stripe @selection-change="leftChooseSpec" ref="roleTableLeft">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="specCode" label="规格编码"></el-table-column>
                            <el-table-column prop="specName" label="规格名称"></el-table-column>
                            <el-table-column prop="statusTValue" label="状态"></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>共{{totalPageLeftSpec}}页</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="leftNextBtnSpec" @click="pageBackLeftSpec" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="leftBackBtnSpec" @click="pageNextLeftSpec" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>

                <el-col :span="2" class="transfer_btns">
                    <el-col :span="24" class="transfer_btn_wrapper">
                        <el-button class="el_transfer" :disabled="if_r_to_l_spec" @click="goLeftSpec" type="primary" icon="el-icon-arrow-left" round></el-button>
                        <el-button class="el_transfer" :disabled="if_l_to_r_spec" @click="goRightSpec" type="primary" icon="el-icon-arrow-right" round></el-button>
                    </el-col>
                </el-col>

                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>可选</span>
                        <div class="transfer_search"  @keyup.enter="searchRightSpecifications">
                            <el-input placeholder="搜索..."
                                      v-model="searchRightSpec"
                                      class="search_input">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="24" class="transfer_table">
                        <el-table :data="specRightOnePageData" border style="width: 100%" stripe @selection-change="rightChooseSpec" ref="roleTabRight">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="specCode" label="规格编码"></el-table-column>
                            <el-table-column prop="specName" label="规格名称"></el-table-column>
                            <el-table-column prop="statusTValue" label="状态"></el-table-column>
                        </el-table>

                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>共{{totalPageRightSpec}}页</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="rightBackBtnSpec" @click="pageBackRightSpec" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="rightNextBtnSpec" @click="pageNextRightSpec" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="surePushSpec">确 认</button>
                <button class="transfer_footer_btn" @click="cancelPushSpec">取 消</button>
            </span>
        </el-dialog>
        <!-- 规格弹出层 结束 -->
    </div>
</template>

<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
export default({
    name:'attributeSpecificationDetail',
    components:{
        buttonGroup
    },
    created () {
        let self = this;
        self.loadDefault();
        self.loadTree();
    },
    watch: {

        //---------------------------------------------------------------------------------
        searchKey:{
            handler:function(val,oldVal){
                console.log(123)
                this.$refs.tree.filter(val);
            },
            deep:true,
        },
        //-----------属性------------------------------------------------------------------
        attributeAllData:{//监听属性右侧列表的总数据变化
            handler:function(val,oldVal){
                let self = this;
                // console.log(self.attributeAllData.length)
                if(self.attributeAllData.length<=self.onePageShow){//当总数据小于10的
                    self.attRightOnePageData = self.attributeAllData;
                    self.rightBackBtnAttr = true;
                    self.rightNextBtnAttr = true;
                }else{
                    self.rightNextBtnAttr = false;
                    self.attRightOnePageData = [];
                    for(let i = (self.rightPageIndex-1)*self.onePageShow;i<self.rightPageIndex*self.onePageShow;i++){
                        self.attRightOnePageData.push(self.attributeAllData[i])
                    }

                }

            },
            deep: true,
        },

        rightPageIndex:{//监听属性右侧列表的下标变化
            handler:function(val,oldVal){
                let self = this;
                if(self.rightPageIndex<self.totalPageRightAtt){//当前页下标小于总页数（多页）
                    self.attRightOnePageData = [];
                    if(self.rightPageIndex == 1){
                        self.rightBackBtnAttr = true;
                        self.rightNextBtnAttr = false;
                        for(let i = (self.rightPageIndex-1)*self.onePageShow;i<self.rightPageIndex*self.onePageShow;i++){
                            self.attRightOnePageData.push(self.attributeAllData[i])
                        }
                    }else{
                        self.rightBackBtnAttr = false;
                        self.rightNextBtnAttr = false;
                        for(let i = (self.rightPageIndex-1)*self.onePageShow;i<self.rightPageIndex*self.onePageShow;i++){
                            self.attRightOnePageData.push(self.attributeAllData[i])
                        }
                    }

                }else if(self.rightPageIndex == self.totalPageRightAtt){//当前页下标等于总页数（只有一页/多页）
                    if(self.rightPageIndex == 1){//只有一页数据
                        self.attRightOnePageData = self.attributeAllData;
                        self.rightBackBtnAttr = true;
                        self.rightNextBtnAttr = true;
                    }else if(self.rightPageIndex>1){//在最后一页
                        self.attRightOnePageData = [];
                        self.rightNextBtnAttr = true;
                        self.rightBackBtnAttr = false;
                        for(let i = (self.rightPageIndex-1)*self.onePageShow;i<self.attributeAllData.length;i++){
                            self.attRightOnePageData.push(self.attributeAllData[i])
                        }
                    }
                }
            },
            deep:true,
        },
        attributeChooseData:{//监听属性左侧列表的总数据变化
            handler:function(val,oldVal){
                let self = this;
                // console.log(self.attributeChooseData.length)
                if(self.attributeChooseData.length<=self.onePageShow){
                    self.attLeftOnePageData = self.attributeChooseData;
                    self.leftBackBtnAttr = true;
                    self.leftNextBtnAttr = true;
                }else{
                    self.leftNextBtnAttr = false;
                    self.attLeftOnePageData = [];
                    for(let i = (self.leftPageIndex-1)*self.onePageShow;i<self.leftPageIndex*self.onePageShow;i++){
                        self.attLeftOnePageData.push(self.attributeChooseData[i])
                    }
                };
                // for(let i in self.attributeChooseData)
            },
            deep:true,
        },
        leftPageIndex:{//监听属性左侧列表的下标变化
            handler:function(){
                let self = this;
                console.log(self.leftPageIndex)
                if(self.leftPageIndex<self.totalPageLeftAtt){//当前页下标小于总页数（多页）
                    self.attLeftOnePageData = [];
                    if(self.leftPageIndex == 1){
                        self.leftBackBtnAttr = true;
                        self.leftNextBtnAttr = false;
                        for(let i = (self.leftPageIndex-1)*self.onePageShow;i<self.leftPageIndex*self.onePageShow;i++){
                            self.attLeftOnePageData.push(self.attributeChooseData[i])
                        }
                    }else{
                        self.leftBackBtnAttr = false;
                        self.leftNextBtnAttr = false;
                        for(let i = (self.leftPageIndex-1)*self.onePageShow;i<self.leftPageIndex*self.onePageShow;i++){
                            self.attLeftOnePageData.push(self.attributeChooseData[i])
                        }
                    }

                }else if(self.leftPageIndex == self.totalPageLeftAtt){//当前页下标等于总页数（只有一页/多页）
                    if(self.leftPageIndex == 1){//只有一页数据
                        self.attLeftOnePageData = self.attributeChooseData;
                        self.leftBackBtnAttr = true;
                        self.leftNextBtnAttr = true;
                    }else if(self.leftPageIndex>1){//在最后一页
                        self.attLeftOnePageData = [];
                        self.leftNextBtnAttr = true;
                        self.leftBackBtnAttr = false;
                        for(let i = (self.leftPageIndex-1)*self.onePageShow;i<self.attributeChooseData.length;i++){
                            self.attLeftOnePageData.push(self.attributeChooseData[i])
                        }
                    }
                }
            },
            deep:true,
        },
        // attData:{
        //     handler:function(){
        //         let self = this;
        //         self.attributeChooseData = self.attData;
        //     },
        //     deep:true,
        // },
        //-----------规格------------------------------------------------------------------
        specAllData:{//监听规格右侧列表的总数据变化
            handler:function(val,oldVal){
                let self = this;
                // console.log(self.attributeAllData.length)
                if(self.specAllData.length<=self.onePageShow){//当总数据小于10的
                    self.specRightOnePageData = self.specAllData;
                    self.rightBackBtnSpec = true;
                    self.rightNextBtnSpec = true;
                }else{
                    self.rightNextBtnSpec = false;
                    self.specRightOnePageData = [];
                    for(let i = (self.specRightPageIndex-1)*self.onePageShow;i<self.specRightPageIndex*self.onePageShow;i++){
                        self.specRightOnePageData.push(self.specAllData[i])
                    }

                }

            },
            deep: true,
        },
        specRightPageIndex:{//监听规格右侧列表的下标变化
            handler:function(val,oldVal){
                let self = this;
                if(self.specRightPageIndex<self.totalPageRightSpec){//当前页下标小于总页数（多页）
                    self.specRightOnePageData = [];
                    if(self.specRightPageIndex == 1){
                        self.rightBackBtnSpec = true;
                        self.rightNextBtnSpec = false;
                        for(let i = (self.specRightPageIndex-1)*self.onePageShow;i<self.specRightPageIndex*self.onePageShow;i++){
                            self.specRightOnePageData.push(self.specAllData[i])
                        }
                    }else{
                        self.rightBackBtnSpec = false;
                        self.rightNextBtnSpec = false;
                        for(let i = (self.specRightPageIndex-1)*self.onePageShow;i<self.specRightPageIndex*self.onePageShow;i++){
                            self.specRightOnePageData.push(self.specAllData[i])
                        }
                    }

                }else if(self.specRightPageIndex == self.totalPageRightSpec){//当前页下标等于总页数（只有一页/多页）
                    if(self.specRightPageIndex == 1){//只有一页数据
                        self.specRightOnePageData = self.specAllData;
                        self.rightBackBtnSpec = true;
                        self.rightNextBtnSpec = true;
                    }else if(self.specRightPageIndex>1){//在最后一页
                        self.specRightOnePageData = [];
                        self.rightNextBtnSpec = true;
                        self.rightBackBtnSpec = false;
                        for(let i = (self.specRightPageIndex-1)*self.onePageShow;i<self.specAllData.length;i++){
                            self.specRightOnePageData.push(self.specAllData[i])
                        }
                    }
                }
            },
            deep:true,
        },
        specChooseData:{//监听规格左侧列表的总数据变化
            handler:function(val,oldVal){
                let self = this;
                if(self.specChooseData.length<=self.onePageShow){
                    self.specLeftOnePageData = self.specChooseData;
                    self.leftBackBtnSpec = true;
                    self.leftNextBtnSpec = true;
                }else{
                    self.leftNextBtnSpec = false;
                    self.specLeftOnePageData = [];
                    for(let i = (self.specLeftPageIndex-1)*self.onePageShow;i<self.specLeftPageIndex*self.onePageShow;i++){
                        self.specLeftOnePageData.push(self.specChooseData[i])
                    }

                }
            },
            deep:true,
        },
        specLeftPageIndex:{//监听规格左侧列表的下标变化
            handler:function(){
                let self = this;
                if(self.specLeftPageIndex<self.totalPageLeftSpec){//当前页下标小于总页数（多页）
                    self.specLeftOnePageData = [];
                    if(self.specLeftPageIndex == 1){
                        self.leftBackBtnSpec = true;
                        self.leftNextBtnSpec = false;
                        for(let i = (self.specLeftPageIndex-1)*self.onePageShow;i<self.specLeftPageIndex*self.onePageShow;i++){
                            self.specLeftOnePageData.push(self.specChooseData[i])
                        }
                    }else{
                        self.leftBackBtnSpec = false;
                        self.leftNextBtnSpec = false;
                        for(let i = (self.specLeftPageIndex-1)*self.onePageShow;i<self.specLeftPageIndex*self.onePageShow;i++){
                            self.specLeftOnePageData.push(self.specChooseData[i])
                        }
                    }

                }else if(self.specLeftPageIndex == self.totalPageLeftSpec){//当前页下标等于总页数（只有一页/多页）
                    if(self.specLeftPageIndex == 1){//只有一页数据
                        self.specLeftOnePageData = self.specChooseData;
                        self.leftBackBtnSpec = true;
                        self.leftNextBtnSpec = true;
                    }else if(self.specLeftPageIndex>1){//在最后一页
                        self.specLeftOnePageData = [];
                        self.leftNextBtnSpec = true;
                        self.leftBackBtnSpec= false;
                        for(let i = (self.specLeftPageIndex-1)*self.onePageShow;i<self.specChooseData.length;i++){
                            self.specLeftOnePageData.push(self.specChooseData[i])
                        }
                    }
                }
            },
            deep:true,
        },
        // specData:{
        //     handler:function(){
        //         let self = this;
        //         self.specChooseData = self.specData;
        //     },
        //     deep:true,
        // },
    },
    data() {
        return{
            ifModify:false,
            searchKey:'',
            defaultGroupId:'',
            categoryId:'',
            categoryName:'',
            categoryFeatureId:'',//从表有数据的情况下的类目特征id
            ifInherit:false,//继承规格属性到子类目
            ifOne:false,//唯一码管理
            ifBatch:false,//批次管理
            ifPeriod:false,//保质期管理
            treeLoading:false,
            attrShow:true,
            specShow:true,
            submitData:{
                categoryFeature_MainTable: {
                    id: '0',
                    groupId: '',
                    categoryId: '',
                    uniqueCodeMgt: true,
                    lotMgt: true,
                    validityMgt: true,
                    attributeInherited: true
                },
                categoryFeatureItem_ChildTable: []
            },
            //---左侧树形--------
            componyTree:  [],
            defaultProps: {
                children: 'childNodes',
                label: 'categoryName',
                id:'id'
            },
            expandId:[],
            //-------------------

            //---父节点从表数据---
            ifFaInherit:false,//父节点是否有点击继承到子类目
            attFaData:[],
            specFaData:[],
            categoryFaId:'',//父节点类目id


            //---商品属性弹框-----
            onePageShow:10,
            attData:[],//生成的属性表格数据
            dislogAttribute:false,

            attributeChooseData:[],//弹窗内左侧表格总数据
            attributeAllData:[],//弹窗内右侧表格总数据

            attRightOnePageData:[],//弹窗内右侧表格一页数据
            attLeftOnePageData:[],//弹窗内左侧表格一页数据

            rightPageIndex:1,//右侧弹窗当前页下标
            leftPageIndex:1,//左侧弹窗当前页下标

            searchLeftAtt:'',//左侧搜索框值
            searchRightAtt:'',//右侧搜索框值

            totalPageLeftAtt:1,//左侧总页数
            totalPageRightAtt:1,//右侧总页数

            multipleSelection:[],//右侧选中数据
            multipleSelectionLeft:[],//左侧选中数据

            if_r_to_l_att:true,//右传左按钮
            if_l_to_r_att:true,//左传右按钮

            rightNextBtnAttr:false,//判定属性右侧向下翻页
            rightBackBtnAttr:true,//判定属性右侧向上翻页

            leftNextBtnAttr:true,//判定属性左侧向下翻页
            leftBackBtnAttr:true,//判定属性左侧向上翻页
            //-------------------

            //---商品规格弹框-----
            specData:[],//生成的规格表格数据
            dislogSpec:false,

            specChooseData:[],//弹窗内左侧表格总数据
            specAllData:[],//弹窗内右侧表格总数据

            specRightOnePageData:[],//弹窗内右侧表格一页数据
            specLeftOnePageData:[],//弹窗内左侧表格一页数据

            specRightPageIndex:1,//右侧弹窗当前页下标
            specLeftPageIndex:1,//左侧弹窗当前页下标

            searchLeftSpec:'',//左侧搜索框值
            searchRightSpec:'',//右侧搜索框值

            totalPageLeftSpec:1,//左侧总页数
            totalPageRightSpec:1,//右侧总页数

            multipleSelectionSpec:[],//右侧选中数据
            multipleSelectionLeftSpec:[],//左侧选中数据

            if_r_to_l_spec:true,//右传左按钮
            if_l_to_r_spec:true,//左传右按钮

            rightNextBtnSpec:false,//判定规格右侧向下翻页
            rightBackBtnSpec:true,//判定规格右侧向上翻页

            leftNextBtnSpec:true,//判定规格左侧向下翻页
            leftBackBtnSpec:true,//判定规格左侧向上翻页
            //-------------------

            buttonGroup:[{
                text:'保存',
                class:'bt_save',
                icon:'icon-baocun',
                disabled:true,
            },{
                text:'取消',
                class:'bt_cancel',
                icon:'icon-quxiao',
                disabled:true,
            },{
                text:'导出',
                class:'bt_out',
                icon:'icon-daochu',
                disabled:false,
            },{
                text:'启用',
                class:'bt_version',
                icon:'icon-qiyong',
                disabled:false,
            },{
                text:'停用',
                class:'bt_auxiliary',
                icon:'icon-tingyong',
                disabled:false,
            }],//按钮组
        }
    },
    methods:{
        //---获取默认数据-------------
        loadDefault:function(){
            let self=this;
            self.$axios.gets('/api/services/app/OuManagement/GetWithCurrentUser').then(function(res){
                console.log(res)
                self.defaultGroupId = res.result.groupId;
            },function(res){
                self.treeLoading=false;
            })
        },
        //---加载树形数据-------------
        loadTree:function(){
            let self=this;
            self.treeLoading=true;
            self.$axios.gets('/api/services/app/CategoryManagement/GetCategoryTree').then(function(res){
                console.log(res)
                self.componyTree = res;
                self.expandId = self.defauleExpandTree(res,'id')
                self.treeLoading=false;
            },function(res){
                self.treeLoading=false;
            })
        },

        //-------------------------

        //---加载表格数据-----------
        loadTableAtt:function(id1,id2){//属性表格已有数据
            let self = this;
            self.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{CategoryId:id1,ItemType:'1',CategoryFeatureId:id2}).then(function(res){
                console.log(res)
                if(res.result&&res.result.length>0){
                    let x = res.result;
                    for(let i in x){
                        self.attData.push({
                            id:x[i].id,
                            groupId:x[i].groupId,
                            itemSourceId:x[i].itemSourceId,
                            itemType:x[i].itemType,
                            categoryFeatureId:self.categoryFeatureId,
                            propertyCode:x[i].propertyCode,
                            propertyName:x[i].propertyName,
                            statusTValue:x[i].statusTValue

                        })
                    }
                    // self.attData = res.result;
                    self.attributeChooseData = self.attData;

                    let y = [];
                    for(let i in self.attributeAllData){
                        let flag = true;

                        for(let j in self.attData){
                            if(self.attributeAllData[i].itemSourceId == self.attData[j].itemSourceId){
                                flag = false
                            }
                        }

                        if(flag){
                            y.push(self.attributeAllData[i])
                        }
                    }
                    console.log(y)
                    self.attributeAllData = y;
                }
            },function(res){

            })
        },
        loadTableSpec:function(id1,id2){//规格表格已有数据
            let self = this;
            self.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{CategoryId:id1,ItemType:'2',CategoryFeatureId:id2}).then(function(res){
                console.log(res)
                if(res.result&&res.result.length>0){
                    let x = res.result;
                    for(let i in x){
                        self.specData.push({
                            id:x[i].id,
                            groupId:x[i].groupId,
                            itemSourceId:x[i].itemSourceId,
                            itemType:x[i].itemType,
                            categoryFeatureId:self.categoryFeatureId,
                            specCode:x[i].specCode,
                            specName:x[i].specName,
                            statusTValue:x[i].statusTValue
                        })
                    }
                    // self.specData = res.result;
                    self.specChooseData = self.specData;

                    let y = [];
                    for(let i in self.specAllData){
                        let flag = true;

                        for(let j in self.specData){
                            if(self.specAllData[i].itemSourceId == self.specData[j].itemSourceId){
                                flag = false;
                            }
                        }
                        if(flag){
                            y.push(self.specAllData[i])
                        }
                    }
                    self.specAllData = y;
                }
            },function(res){

            })
        },
        //-------------------------

        //---属性弹窗内右侧表格数据--
        loadAttribute:function(){//商品属性
            let self = this;
            // self.attributeAllData = [];
            self.$axios.gets('/api/services/app/PropertyManagement/GetAll',{MaxResultCount:'100',SkipCount:'0'}).then(function(res){
                console.log(res);
                let x = [];
                x = res.result.items;
                for(let i in x){
                    self.attributeAllData.push({
                        id:0,
                        groupId:x[i].groupId,
                        itemSourceId:x[i].id,
                        itemType:1,
                        categoryFeatureId:self.categoryFeatureId,
                        propertyCode:x[i].propertyCode,
                        propertyName:x[i].propertyName,
                        statusTValue:x[i].statusTValue,
                    })
                }

                self.totalPageRightAtt = Math.ceil(res.result.totalCount/self.onePageShow);
            },function(res){
                console.log('err'+res)
            });
        },
        //-------------------------

        //---规格弹窗内右侧表格数据--
        loadSpec:function(){//商品规格
            let self = this;
            self.$axios.gets('/api/services/app/SpecManagement/GetAll',{MaxResultCount:'100',SkipCount:'0'}).then(function(res){
                console.log(res);
                let x = [];
                x = res.result.items;
                for(let i in x){
                    self.specAllData.push({
                        id:0,
                        groupId:x[i].groupId,
                        itemSourceId:x[i].id,
                        itemType:2,
                        categoryFeatureId:self.categoryFeatureId,
                        specCode:x[i].specCode,
                        specName:x[i].specName,
                        statusTValue:x[i].statusTValue
                    })
                }

                self.totalPageRightSpec = Math.ceil(res.result.totalCount/self.onePageShow);
            },function(res){
                console.log('err'+res)
            });
        },
        //-------------------------

        //---保存------------------
        save:function(){
            // self.attData.push({propertyName:x[i].propertyName,propertyCode:x[i].propertyCode,itemSourceId:x[i].itemSourceId,itemType:x[i].itemType,statusTValue:x[i].statusTValue,id:x[i].id});
            let self = this;
            // console.log(self.defaultGroupId)
            self.submitData.categoryFeature_MainTable.groupId = self.defaultGroupId;
            self.submitData.categoryFeature_MainTable.categoryId = self.categoryId;
            self.submitData.categoryFeature_MainTable.uniqueCodeMgt = self.ifOne;
            self.submitData.categoryFeature_MainTable.lotMgt = self.ifBatch;
            self.submitData.categoryFeature_MainTable.validityMgt = self.ifPeriod;
            self.submitData.categoryFeature_MainTable.attributeInherited = self.ifInherit;

            if(self.ifFaInherit){
                let k = [];
                for(let i in self.attData){
                    let flag = true;
                    for(let j in self.attFaData){
                        if(self.attData[i].itemSourceId == self.attFaData[j].itemSourceId){
                            flag = false;
                        }
                    };
                    if(flag){
                        k.push(self.attData[i])
                    };

                };
                let w = [];
                for(let i in self.specData){
                    let flag = true;
                    for(let j in self.specFaData){
                        if(self.specData[i].itemSourceId == self.specFaData[j].itemSourceId){
                            flag = false;
                        }
                    };
                    if(flag){
                        w.push(self.specData[i])
                    };
                };
                let d = [];
                for(let i in k){
                    d.push({
                        id:k[i].id,
                        groupId:k[i].groupId,
                        categoryFeatureId:k[i].categoryFeatureId,
                        itemType:k[i].itemType,
                        itemSourceId:k[i].itemSourceId,
                    })
                };
                for(let i in w){
                    d.push({
                        id:w[i].id,
                        groupId:w[i].groupId,
                        categoryFeatureId:w[i].categoryFeatureId,
                        itemType:w[i].itemType,
                        itemSourceId:w[i].itemSourceId,
                    })
                }
                self.submitData.categoryFeatureItem_ChildTable = d;
            }else{
                let x = [];
                for(let i in self.attData){
                    x.push({
                        id:self.attData[i].id,
                        groupId:self.attData[i].groupId,
                        categoryFeatureId:self.attData[i].categoryFeatureId,
                        itemType:self.attData[i].itemType,
                        itemSourceId:self.attData[i].itemSourceId,
                    })
                }
                for(let i in self.specData){
                    x.push({
                        id:self.specData[i].id,
                        groupId:self.specData[i].groupId,
                        categoryFeatureId:self.specData[i].categoryFeatureId,
                        itemType:self.specData[i].itemType,
                        itemSourceId:self.specData[i].itemSourceId,
                    })
                }
                self.submitData.categoryFeatureItem_ChildTable = x;
            }



            // for(let i in self.attData){
                // self.submitData.categoryFeatureItem_ChildTable.push({itemSourceId:self.attData[i].id,
                // itemType:'1',
                // categoryFeatureId:self.submitData.categoryFeature_MainTable.id,
                // groupId:self.defaultGroupId})
            // }
            // console.log(self.submitData.categoryFeatureItem_ChildTable)
            //
            // for(let i in self.specData){
            //     self.submitData.categoryFeatureItem_ChildTable.push({itemSourceId:self.specData[i].id,
            //     itemType:'2',
            //     categoryFeatureId:self.submitData.categoryFeature_MainTable.id,
            //     groupId:self.defaultGroupId,
            //     id:self.specData[i].id})
            // }
            console.log(self.submitData)
            self.$axios.posts('/api/services/app/CategoryFeatureManagement/AggregateCreateOrUpdate',self.submitData).then(function(res){
                // console.log(res);
                self.open('保存成功','el-icon-circle-check','successERP');
            },function(res){
                console.log(res)
                // self.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)
                // self.errorMessage=true;
            });
        },
        //------------------------

        //---弹框显示隐藏----------
        dialogAttributeShow:function(){
            let self = this;
            self.dislogAttribute = true;
        },
        dialogSpecShow:function(){
            let self = this;
            self.dislogSpec = true;
        },
        //------------------------

        //---属性弹框搜索--------------
        searchLeftAttribute:function(){
            let self = this;
        },
        searchRightAttribute:function(){
            let self = this;
            let newJson = [];
            let keyWord = new RegExp(self.searchRightAtt);
            // $.each(self.attributeAllData)
        },
        //------------------------

        //---规格弹框搜索--------------
        searchLeftSpecifications:function(){
            let self = this;
        },
        searchRightSpecifications:function(){
            let self = this;
        },
        //------------------------

        //---属性弹窗内多选------------
        leftChoose:function(val){
            let self = this;
            self.multipleSelectionLeft = val;
            if(self.multipleSelectionLeft.length>0){
                self.if_l_to_r_att= false;
            }else{
                self.if_l_to_r_att= true;
            }
            self.goRightAtt();
        },
        rightChoose:function(val){
            let self = this;
            self.multipleSelection = val;
            if(self.multipleSelection.length>0){
                self.if_r_to_l_att= false;
            }else{
                self.if_r_to_l_att = true;
            }

            self.goLeftAtt();
        },
        //------------------------

        //---规格弹窗多选----------
        leftChooseSpec:function(val){
            let self = this;
            self.multipleSelectionLeftSpec = val;
            if(self.multipleSelectionLeftSpec.length>0){
                self.if_l_to_r_spec= false;
            }else{
                self.if_l_to_r_spec= true;
            }
        },
        rightChooseSpec:function(val){
            let self = this;
            self.multipleSelectionSpec = val;
            if(self.multipleSelectionSpec.length>0){
                self.if_r_to_l_spec= false;
            }else{
                self.if_r_to_l_spec = true;
            }
        },

        //---属性数据穿梭-------------
        goLeftAtt:function(){//从右往左
            let self = this;
            for(let i in self.multipleSelection){
                self.attributeChooseData.push(self.multipleSelection[i])
            }
            self.totalPageLeftAtt = Math.ceil(self.attributeChooseData.length/self.onePageShow);

            let x = [];
            for(let i in self.attributeAllData){
                let flag = true;
                for(let j in self.multipleSelection){
                    if(self.attributeAllData[i].itemSourceId == self.multipleSelection[j].itemSourceId){
                        flag = false;
                    }
                }

                if(flag){
                    x.push(self.attributeAllData[i])
                }
            }
            //  console.log(x)
            self.attributeAllData = x;
            self.if_r_to_l_att = true;
            self.totalPageRightAtt = Math.ceil(self.attributeAllData.length/self.onePageShow);

        },
        goRightAtt:function(){//从左往右
            let self = this;
            for(let i in self.multipleSelectionLeft){
                self.attributeAllData.push(self.multipleSelectionLeft[i])
            }
            self.totalPageRightAtt = Math.ceil(self.attributeAllData.length/self.onePageShow);

            let x = [];
            for(let i in self.attributeChooseData){
                let flag = true;
                for(let j in self.multipleSelectionLeft){
                    if(self.attributeChooseData[i].itemSourceId == self.multipleSelectionLeft[j].itemSourceId){
                        flag = false;
                    }
                }

                if(flag){
                    x.push(self.attributeChooseData[i])
                }
            }
            self.attributeChooseData = x;
            self.if_l_to_r_att = true;
            self.totalPageLeftAtt = Math.ceil(self.attributeChooseData.length/self.onePageShow);
        },
        //-----------------------

        //---规格数据穿梭---------
        goLeftSpec:function(){
            let self = this;
            for(let i in self.multipleSelectionSpec){
                self.specChooseData.push(self.multipleSelectionSpec[i])
            }
            self.totalPageLeftSpec = Math.ceil(self.specChooseData.length/self.onePageShow);

            let x = [];
            for(let i in self.specAllData){
                let flag = true;
                for(let j in self.multipleSelectionSpec){
                    if(self.specAllData[i].itemSourceId == self.multipleSelectionSpec[j].itemSourceId){
                        flag = false;
                    }
                }

                if(flag){
                    x.push(self.specAllData[i])
                }
            }
            //  console.log(x)
            self.specAllData = x;
            self.if_r_to_l_spec = true;
            self.totalPageRightSpec = Math.ceil(self.specAllData.length/self.onePageShow);
        },
        goRightSpec:function(){
            let self = this;
            for(let i in self.multipleSelectionLeftSpec){
                self.specAllData.push(self.multipleSelectionLeftSpec[i])
            }
            self.totalPageRightSpec = Math.ceil(self.specAllData.length/self.onePageShow);

            let x = [];
            for(let i in self.specChooseData){
                let flag = true;
                for(let j in self.multipleSelectionLeftSpec){
                    if(self.specChooseData[i].itemSourceId == self.multipleSelectionLeftSpec[j].itemSourceId){
                        flag = false;
                    }
                }

                if(flag){
                    x.push(self.specChooseData[i])
                }
            }
            self.specChooseData = x;
            self.if_l_to_r_spec = true;
            self.totalPageLeftSpec = Math.ceil(self.specChooseData.length/self.onePageShow);
        },
        //-----------------------

        //---属性翻页----------------
        pageNextRightAttr:function(){//属性的右侧向下翻页
            let self = this;
            if(self.rightPageIndex<self.totalPageRightAtt){
                self.rightPageIndex++;
            }else if(self.rightPageIndex==self.totalPageRightAtt){
                self.rightNextBtnAttr = true;
            }

        },
        pageBackRightAttr:function(){//属性的右侧向上翻页
            let self = this;
            if(self.rightPageIndex>1){
                self.rightPageIndex--;
            }else if(self.rightPageIndex==self.totalPageRightAtt){
                self.rightBackBtnAttr = true;
            }
        },
        pageNextLeftAttr:function(){//属性的左侧向下翻页
            let self = this;
            if(self.leftPageIndex<self.totalPageLeftAtt){
                self.leftPageIndex++;
            }else if(self.leftPageIndex == self.totalPageLeftAtt){
                self.leftNextBtnAttr = true;
            }
        },
        pageBackLeftAttr:function(){//属性的左侧向上翻页
            let self = this;
            if(self.leftPageIndex>1){
                self.leftPageIndex--;
            }else if(self.leftPageIndex==self.leftPageIndex){
                self.leftBackBtnAttr = true;
            }
        },
        //-----------------------

        //---规格翻页------------
        pageNextRightSpec:function(){//规格的右侧向下翻页
            let self = this;
            if(self.specRightPageIndex<self.totalPageRightSpec){
                self.specRightPageIndex++;
            }else if(self.specRightPageIndex==self.totalPageRightSpec){
                self.rightNextBtnSpec = true;
            }

        },
        pageBackRightSpec:function(){//规格的右侧向上翻页
            let self = this;
            if(self.specRightPageIndex>1){
                self.specRightPageIndex--;
            }else if(self.specRightPageIndex==self.totalPageRightSpec){
                self.rightBackBtnSpec = true;
            }
        },
        pageNextLeftSpec:function(){//规格的左侧向下翻页
            let self = this;
            if(self.specLeftPageIndex<self.totalPageLeftSpec){
                self.specLeftPageIndex++;
            }else if(self.leftPageIndex == self.totalPageLeftSpec){
                self.leftNextBtnSpec = true;
            }
        },
        pageBackLeftSpec:function(){//规格的左侧向上翻页
            let self = this;
            if(self.specLeftPageIndex>1){
                self.specLeftPageIndex--;
            }else if(self.specLeftPageIndex==self.leftPageIndex){
                self.leftBackBtnSpec = true;
            }
        },
        //-----------------------

        //---属性弹窗取消、确定----
        cancelPushAttr:function(){
            let self = this;
            self.dislogAttribute =false;
            self.buttonGroup[1].disabled = true;
        },
        surePushAttr:function(){
            let self = this;
            self.buttonGroup[0].disabled = false;
            let x = [];
            x = self.deepCopy(self.attributeChooseData);

            self.attData = [];
            for(let i in x){
                self.attData.push(x[i])
            }
            console.log(self.attData)

            self.dislogAttribute =false;

        },
        //-----------------------

        //---规格弹窗取消、确定----
        cancelPushSpec:function(){
            let self = this;
            self.dislogSpec =false;
            self.buttonGroup[1].disabled = true;
        },
        surePushSpec:function(){
            let self = this;
            self.buttonGroup[0].disabled = false;
            let x = [];
            x = self.deepCopy(self.specChooseData);

            self.specData = [];
            for(let i in x){
                self.specData.push(x[i])
            }
            self.dislogSpec =false;

        },
        //-----------------------

        //---控制删除-------------
        handleAttDelete:function(index,row){
            let self = this;
            self.attData.splice(index,1);
            // console.log(123)
            console.log(self.attData)
            // self.attributeChooseData.splice(index,1);
            self.attributeAllData.push(row);
        },
        handleSpecDelete:function(index,row){
            let self = this;
            self.specData.splice(index,1);
            // self.specChooseData.splice(index,1);
            self.specAllData.push(row);
        },
        //-----------------------
        //------------------------
        renderContent(h, { node, data, store }){//商品类目
            // console.log(data)
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
        //------------------------
        //---树通用---------------
        defauleExpandTree(data,key){
            if(typeof(data[0])!='undefined'
            && data[0]!=null
            && typeof(data[0][key])!='undefined'
            && data[0][key]!=null
            && data[0][key]!=''){
                return [data[0][key]]
            }
        },
        nodeClick:function(data){
            let self = this;
            self.ifModify = false;
            console.log(data)
            //---清空数据-----------
            self.clearData();
            //---保存上床值---------
            self.categoryId= data.id;//类目id
            self.categoryName = data.categoryName;
            self.categoryFaId = data.categoryParentid;
            //---获取主表数据-------
            self.$axios.gets('/api/services/app/CategoryFeatureManagement/GetCategoryFeature',{categoryID:data.id}).then(function(res){
                console.log(res)
                if(res&&res.result){
                    self.ifInherit = res.result.attributeInherited;
                    self.ifOne = res.result.uniqueCodeMgt;
                    self.ifBatch = res.result.lotMgt;
                    self.ifPeriod = res.result.validityMgt;
                    self.submitData.categoryFeature_MainTable.id = res.result.id;
                    self.categoryFeatureId = res.result.id;
                    //---获取弹出框的数据---
                    self.loadAttribute();
                    self.loadSpec();
                    //---获取从表数据-------
                    self.loadTableAtt(self.categoryId,res.result.id);
                    self.loadTableSpec(self.categoryId,res.result.id)
                }

            },function(res){
                console.log(self.submitData.categoryFeature_MainTable.id)
                self.submitData.categoryFeature_MainTable.id = 0;
                self.categoryFeatureId = self.submitData.categoryFeature_MainTable.id;

                //---获取弹出框的数据---
                self.loadAttribute();
                self.loadSpec();
            })
            //---查询点击的节点的父节点主表数据---
            self.$axios.gets('/api/services/app/CategoryFeatureManagement/GetCategoryFeature',{categoryID:data.categoryParentid}).then(function(res){
                console.log(res)
                self.ifFaInherit = res.result.attributeInherited;
                //加载从表数据
                self.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{CategoryId:self.categoryFaId,ItemType:'1',CategoryFeatureId:res.result.id}).then(function(res){
                    // console.log(res)
                    self.attFaData = res.result;//父节点属性数据
                },function(res){

                })

                self.$axios.gets('/api/services/app/CategoryFeatureItemManagement/GetAllItem',{CategoryId:self.categoryFaId,ItemType:'2',CategoryFeatureId:res.result.id}).then(function(res){
                    // console.log(res)
                    self.specFaData = res.result;//父节点属性数据
                },function(res){

                })

            },function(res){

            })

        },
        //------------------------

        //---清除数据-------------
        clearData:function(){
            let self = this;
            self.attData = [];
            self.specData = [];
            self.ifInherit = false;//继承规格属性到子类目
            self.ifOne = false;//唯一码管理
            self.ifBatch = false;//批次管理
            self.ifPeriod = false;//保质期管理
            self.attributeChooseData = [];
            self.attributeAllData = [];
            self.specChooseData = [];
            self.specAllData = [];
            // self.loadAttribute();
            // self.loadSpec();
        },
        //-----------------------
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="保存"){//
                // this.addCol();
                self.save();
            }else if(btn=="删除"){//
                // this.delBatch();
            }else if(btn=="保存"){//
                // this.save();
            }else if(btn=="取消"){//
                // this.cancel();
            }else if(btn=="启用"){
                // this.handleStatus(1);
            }else if(btn=="停用"){
                // this.handleStatus(0);
            }
        },

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
        //---open-----------
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
        filterNode(value, data) {
            if (!value) return true;
                return data.categoryName.indexOf(value) !== -1;
        },
        //------------------
        mainChange:function(){
            let self = this;
            self.buttonGroup[0].disabled = false;
            self.buttonGroup[1].disabled = false;
        },

    },


})
</script>

<style>
.bg-white{
    background: white;
    border-radius: 3px;
}
.bg-gray{
    background:#EDF0F4;
    padding:10px 0 0 10px;
}
.at-sp-detail .bg-gray-in{
    background:#F9F9F9;
}
.at-sp-detail .h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.pt5{
    padding-top: 5px;
}
.pb5{
    padding-bottom: 5px;
}
.pl10{
    padding-left:10px;
}
.mt20{
    margin-top: 20px;
}
.showBtn{
    display: inline-block;
    float:right;
    cursor: pointer;
    font-size: 12px;
    margin-right: 10px;
     margin-top: 10px;
}
.showBtn i{
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    color:#cacaca;
    margin-left: 5px;
}
.showBtn i.rotate{
    transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
}
.at-sp-detail .bgcolor{
    margin-bottom:0px;
    /* width:200px; */
}
.at-sp-detail .bgcolor>label{
    width: 50px;
}
.section-style{
    padding-top: 5px;
}
.at-sp-detail .header-title{
    font-size: 16px;
    display: inline-block;
    border-bottom: 3px solid #00CACA;
    padding: 5px 1px;
    float: left;
}
.choose-add{
    background:#00CACA;
    display: inline-block;
    padding:1px 10px;
    border-radius: 3px;
    line-height: 25px;
    margin-top: 4px;
    float: left;
    margin-left: 10px;
    cursor: pointer;
}
.choose-add img{
    display: inline-block;
    /* height: 25px; */
    float: left;
    margin-top: 5px;
}
.choose-text{
    color: white;
    display: inline-block;
    /* height:25px; */
    font-size: 12px;
    float: left;
    margin-left: 10px;
}
.at-sp-detail .bAreaSearch .el-input__inner{
    height: 30px;
    border-radius: 30px;
}
</style>



