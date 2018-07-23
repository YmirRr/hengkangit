<template>
 <div class="roleModify">
     <el-row class="fixed">
         <el-col :span="24" class="fixed bb1 bg-white">
             <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            <span @click="ifShow = !ifShow" class="upBt inline-block-need">收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}"></i></span>
        </el-col>
    </el-row>
 <el-collapse-transition>
     <div v-show="ifShow">   
        <el-row class="pt20">
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>角色编码</label>
                            <el-input 
                            
                            class="roleCode" 
                            :class="{redBorder : validation.hasError('addData.roleCode')}" 
                            v-model="addData.roleCode" 
                            placeholder=""></el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('addData.roleCode') }}</div>
                    </div>
                </el-col>

                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth"><label>
                            <small>*</small>角色名称</label>
                            <el-input 
                            
                            class="displayName" 
                            :class="{redBorder : validation.hasError('addData.displayName')}" 
                            v-model="addData.displayName" 
                            placeholder=""></el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('addData.displayName') }}</div>
                    </div>
                </el-col>
                
                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                        <label><small>*</small>所属组织</label>
                        <el-select clearable 
                        class="ouId" 
                        
                        placeholder=""
                        :class="{redBorder : validation.hasError('addData.ouId')}"
                        v-model="addData.ouId">
                            <!-- <el-option v-for="item in selectData.OUType" :key="item.id" :label="item.ouName" :value="item.id">
                            </el-option> -->
                            <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search_ou">
                            </el-input>
                            <el-tree
                             :default-expanded-keys="expand.expandId_addDataOu"
                            :render-content="renderContent_ou"
                            :highlight-current="true"
                            :data="selectTree_ou"
                            :props="selectProps_ou"
                            node-key="id"
                            ref="tree_ou"
                            :filter-node-method="filterNode_ou"
                            :expand-on-click-node="false"
                            @node-click="nodeClick_ou"
                            >
                            </el-tree>
                            <el-option v-show="false" :key="item_ou.id" :label="item_ou.ouName" :value="item_ou.id">
                            </el-option>
                            <!-- <el-option v-show="false" v-for="item in selectData.OUType" :key="item.id" :label="item.ouName" :value="item.id" :date="item.id">
                                </el-option> -->
                        </el-select>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('addData.ouId') }}</div>
                    </div>
                </el-col>

                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>状态</label>
                            <el-select clearable filterable  
                            class="status" 
                            
                            placeholder=""
                            :class="{redBorder : validation.hasError('addData.status')}"
                            v-model="addData.status">
                                <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('addData.status') }}</div>
                    </div>
                </el-col>

                <el-col :span="24">
                    <div class="bgMarginAuto">
                        <div class="bgcolor bgLongWidth">
                            <label>备注</label>
                            <el-input
                            
                            class="remark" 
                            :class="{redBorder : validation.hasError('addData.remark')}"
                            v-model="addData.remark"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            placeholder="">
                            </el-input>
                        </div>
                        <div class="error_tips_info">{{ validation.firstError('addData.remark') }}</div>
                    </div>
                </el-col>
        </el-row>
     </div>
 </el-collapse-transition>

    <el-row class="nopadding"> 
        <div class="tabZoo">
            <el-col :span="24">
               <el-tabs v-model="activeName" @tab-click="handleClick">
                   <!-- - - - - - - - - - - - - - - - - - - - 分配组织- - - - - - - - - - - - - - - - - - - - -  -->
                    <el-tab-pane label="管理组织" name="ou" class="getPadding" style="z-index:-1000">
                        <button class="erp_bt bt_add" @click="dialogOuIsShow">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_add.png">
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
                    :default-expanded-keys="expand.expandId_dialogOu"
                    :render-content="renderContent_ouTreeDataRight"
                    :data="ouTreeDataRight"
                    show-checkbox
                    node-key="ouId"
                    ref="tree"
                    :filter-node-method="filterNode"
                    :highlight-current="true"
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
                        v-loading="ouTableLoading"
                        :data="showPageTableOu" 
                        border 
                        style="width: 100%" 
                        stripe>

                            <el-table-column prop="ouCode" label="组织编码"></el-table-column>

                            <el-table-column prop="ouTypes" label="组织类型"></el-table-column>
                            <el-table-column prop="ouName" label="组织名称"></el-table-column>
                            <el-table-column prop="assignPerson" label="授权人"></el-table-column>

                            <el-table-column label="授权时间">
                                <template slot-scope="scope">
                                    <el-date-picker
                                    v-model="showPageTableOu[scope.$index].assignTime"
                                    format="yyyy.MM.dd"
                                    type="datetime" 
                                    readonly
                                    align="center"></el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                 <template slot-scope="scope">
                                     <el-button type="text" @click="delCheckOu(scope.row)">删除</el-button>
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
                    </el-tab-pane>
<!-- - - - - - - - - - - - - - - - - - - - 关联用户- - - - - - - - - - - - - - - - - - - - -  -->
                    <el-tab-pane label="关联用户" name="role" class="getPadding" style="z-index:-10">
                        <button class="erp_bt bt_add"  @click="dialogUser = true">
                            <div class="btImg">
                                <img src="../../../static/image/common/bt_add.png">
                            </div>
                            <span class="btDetail" @click="userInit()">选取</span>
                        </button>
                        <div class="search_input_group">
                            <div class="search_input_wapper" @keyup.enter="searchBottomUserTable">
                                <el-input
                                    v-model="searchBottomUser"
                                    placeholder="搜索..."
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
                       
    <!-- 关联用户 -->
<el-dialog :visible.sync="dialogUser" title="关联用户" class="transfer_dialog">
    <el-col :span="24">
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>已选</span>
                <div class="transfer_search" @keyup.enter="searchLeftUserTable">
                    <el-input
                        placeholder="搜索..."
                        v-model="searchLeftUser"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <!-- <el-autocomplete
                     v-model="searchLeftUser"
                    :fetch-suggestions="queryLesftUser"
                    class="search_input"
                    placeholder="搜索..."
                    >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-autocomplete> -->
                </div>    
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table 
                :data="showCheckedUser" 
                border 
                style="width: 100%" 
                stripe 
                @selection-change="checkedSelect" 
                ref="roleTableLeft">
                     <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userCode" label="用户编码"></el-table-column>
                    <el-table-column prop="displayName" label="用户名称"></el-table-column>
                    <el-table-column prop="ouName" label="所属组织"></el-table-column>
                </el-table>   
            </el-col>
            <el-col :span="24" class="transfer_footer">
                <div style="float:right">
                    <span>共{{totalPageLeftUser}}页</span>
                    <el-button class="el_transfer" :disabled="leftDownBtnUser" @click="pageDownLeftUser" type="primary" icon="el-icon-arrow-left" round></el-button>
                    <el-button class="el_transfer" :disabled="leftAddBtnUser" @click="pageAddLeftUser" type="primary" icon="el-icon-arrow-right" round></el-button>
                </div>
            </el-col>
        </el-col>
        <el-col :span="2" class="transfer_btns">
            <el-col :span="24" class="transfer_btn_wrapper">
                <el-button class="el_transfer" :disabled="is_user_nocheked" @click="noCheck_push_check_user" type="primary" icon="el-icon-arrow-left" round></el-button>
                <el-button class="el_transfer" :disabled="is_user_cheked" @click="check_push_noCheck_user" type="primary" icon="el-icon-arrow-right" round></el-button>
            </el-col>
        </el-col>
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>可选</span>
                <div class="transfer_search"  @keyup.enter="searchRightUserTable">
                    <el-input
                        placeholder="搜索..."
                        v-model="searchRightUser"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <!-- <el-autocomplete
                    class="search_input"
                    placeholder="搜索..."
                    >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-autocomplete> -->
                </div>
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table 
                :data="showNoCheckedUser" 
                border 
                style="width: 100%" 
                stripe 
                @selection-change="nocheckedSelect" 
                ref="roleTabRight">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userCode" label="用户编码"></el-table-column>
                    <el-table-column prop="displayName" label="用户名称"></el-table-column>
                    <el-table-column prop="ouName" label="所属组织"></el-table-column>
                </el-table>  
                
            </el-col>
            <el-col :span="24" class="transfer_footer">
                <div style="float:right">
                    <span>共{{totalPageRightUser}}页</span>
                    <el-button class="el_transfer" :disabled="rightDownBtnUser" @click="pageDownRightUser" type="primary" icon="el-icon-arrow-left" round></el-button>
                    <el-button class="el_transfer" :disabled="rightAddBtnUser" @click="pageAddRightUser" type="primary" icon="el-icon-arrow-right" round></el-button>
                </div>
            </el-col>
        </el-col>
    </el-col>
    <span slot="footer">
        <button class="transfer_footer_btn transfer_confirm" @click="dialogUserConfirmUser">确 认</button>
        <button class="transfer_footer_btn" @click="cancelPushUser">取 消</button>
    </span>
</el-dialog>
<!--dialog结束  -->
                        <el-table 
                        v-loading="userTableLoading"
                        :data="showCheckedUserTable" 
                        border 
                        style="width: 100%" 
                        stripe>
                            <el-table-column prop="userCode" label="用户编码"></el-table-column>

                            <el-table-column prop="displayName" label="用户名称"></el-table-column>

                            <el-table-column prop="ouName" label="所属组织"></el-table-column>

                             <el-table-column label="操作">
                                 <template slot-scope="scope">
                                     <el-button type="text"   @click="check_push_noCheck_userThis(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        style="margin-top:20px;" 
                        class="text-right" 
                        background layout="total,prev, pager, next,jumper" 
                        @current-change="userBottomPageChange"
                        :current-page="pageIndexBottomUser"
                        :page-size="oneItemBottomUser"
                        :total="totalItemBottomUser">
                        </el-pagination>   
                    </el-tab-pane>
<!-- - - - - - - - - - - - - - - - - - - - 分配功能- - - - - - - - - - - - - - - - - - - - -  -->
                    <el-tab-pane label="分配功能" name="fn" class="getPadding" style="z-index:-1000">
<!-- - - - - - - - - - - - - - - - - - - - 分配功能- - - - - - - - - - - - - - - - - - - - -  -->
                        <el-col :span="24" style="padding-bottom:20px;">
                            <el-button type="success" @click="TreeSearch"><img src="../../../static/image/common/bt_add.png">选取功能</el-button>
                        </el-col>
                        <!-- tree -->
                        <el-col :span="5">
                            <el-col :span="24" class="Fn_Tree_search">
                                <el-input
                                    placeholder="搜索..."
                                    class="search_input"
                                    v-model="filterTextFn"
                                    >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>   
                            </el-col>  
                            <el-col :span="24" class="fnTreeWrapper">
                                <vue-scroll :ops="$store.state.option">
                                    <el-tree
                                        :default-expanded-keys="expand.expandId_mmenu"
                                        :render-content="renderContent_Fn"
                                        v-loading="fnTreeLoading" 
                                        :highlight-current="true"
                                        :data="fnTreeData"
                                        :props="defaultProps"
                                        node-key="id"
                                        ref="tree_fn"
                                        :filter-node-method="filterNodeFn"
                                        @node-click="fnNodeClick"
                                        :expand-on-click-node="false">
                                    </el-tree>
                                </vue-scroll>
                            </el-col>
                        </el-col>
                        <!-- tree -->
                        <el-col :span="19">
                             <el-col :span="24" class="chooseFn">
                                <el-checkbox @change="CheckAllFn" v-model="checkAllFns">全选</el-checkbox>
                                <el-checkbox v-model="showCheckFns">查看已选</el-checkbox>
                                <i class="fa fa-cog" aria-hidden="true" @click="nextDivIsShow = !nextDivIsShow"></i>
                            </el-col>
                            <el-col :span="24" class="checkbox_group" v-show="nextDivIsShow">
                                <!-- <span v-for="(x,index) in showCheckedFnTable" :key="index">
                                    <span v-for="(i,inde) in x.children" :key="inde">
                                        <el-checkbox
                                        class="fnCheckBox"
                                        v-model="i.check" 
                                        @change="selectChangeFn(i.check,i.permissionName)"
                                        >
                                        {{i.displayName}}
                                        </el-checkbox>
                                    </span>
                                </span> -->
                                <span v-for="(i,index) in headerFn" :key="index">
                                    <el-checkbox
                                    class="fnCheckBox"
                                    v-model="i.check" 
                                    @change="selectHeaderFn(i)"
                                    >
                                    {{i.displayName}}
                                    </el-checkbox>
                                </span>
                            </el-col>   
                            <el-col :span="24">
                                <!-- table -->
                                <el-table 
                                :data="showCheckedFnTable" 
                                border 
                                class="fnTable"
                                style="width: 100%" 
                                stripe>
                                    <el-table-column prop="moduleName" label="名称" fixed="left" width="200"></el-table-column>
                                    <el-table-column label="功能" max-height="2500">
                                        <template slot-scope="scope">
                                            <el-checkbox class="fnCheckBox" v-for="(item,index) in showCheckedFnTable[scope.$index].children" :key="index" v-model="item.check" @change="selectChangeFn(item.check,item.permissionName)">{{item.moduleName}}{{item.displayName}}</el-checkbox>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                style="margin-top:20px;" 
                                class="text-right" 
                                 id="FnPagination"
                                background layout="total,prev, pager, next,jumper" 
                                @current-change="FnPageChange"
                                :current-page="pageIndexFn"
                                :page-size="oneItemFn"
                                :total="totalItemFn">
                                </el-pagination> 
                            </el-col>
                            
                        </el-col>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </div>
    </el-row>
 <el-row>
     
    <el-col :span="22" class="auditInformation getPadding">
        <h4 class="h4">审计信息</h4>
        <div>
            <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createdBy" disabled="disabled"></el-input></div>
            <div class="bgcolor">
                <label>创建时间</label>
                <el-date-picker 
                v-model="auditInformation.createdTime" 
                type="date" 
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" 
                disabled>
                </el-date-picker>
            </div>
            <div class="bgcolor"><label>修改人</label><el-input v-model="auditInformation.modifiedBy" disabled="disabled"></el-input></div>
            <div class="bgcolor">
                <label>修改时间</label>
                <el-date-picker 
                v-model="auditInformation.modifiedTime" 
                type="date" 
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" 
                disabled>
                </el-date-picker>
            </div>
        </div>                                  
    </el-col>
</el-row>     
<dialogBox @dialogColse="dialogUserConfirm = false" :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing"></dialogBox>  
  <!-- <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>    
                                                        -->
<classify v-bind:roleClassify="roleClassify" v-bind:roleClassifyArr="roleClassifyArr" v-on:childByValue="childByValue" v-on:childBybig="childBybig"></classify> 
</div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
import classify from './classify'
export default({
    data() {
        return{
            roleClassify:false,
            errorTips:{message:'',detail:''},
            roleClassifyArr:[],
            dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
            dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
            saveSuccess:false,
            firstModify:false,
            secondModify:false,
            thirdModify:false,
            forthModify:false,
            ifModify:false,
            title:'',
        // 错误信息提示开始
            // detail_message_ifShow:false,
            // errorMessage:false,
        // 错误信息提示结束
            // response:{
            //     details:'',
            //     message:'',
            // },
            dialogUserConfirm:false,//信息更改提示控制
            choseDoing:'',//存储点击按钮判断信息
            search_ou:'',
            selectTree_ou:[
            ],
            item_ou:{
                id:'',
                ouName:''
            },
            selectProps_ou: {
                children: 'children',
                label: 'ouName',
                id:'id'
            },

            selectData:{//select数据
                Status001:[],//启用状态
            },
            ifShow:true, 
            auditInformation:{//审计信息
                createdBy:"",
                createdTime:"",
                modifiedBy:"",
                modifiedTime:"",
            },

            customerNature:[{//客户性质
                value:'1',
                label: '选项1'
            }, {
                value:'2',
                label: '选项2'
            }, {
                value:'3',
                label: '选项3'
            }],

            activeName: 'ou',//tabs标签页默认激活name

            addData:{
                // "ouId": "",
                // "roleCode": "",
                // "displayName": "",
                // "status": 1,
                // "remark": "",
            },

// -------------分配组织-------------------

            nodeCheckTypes:[{//客户性质
                value:1,
                label: '包含所有下级'
            }, {
                value:2,
                label: '只包含当前选项'
            }],
            nodeCheckType:1, 
            dialogOu:false,
            storeCheckOu:[],
            allOuLength:0,//所有数据长度，判断是否全选
//-------------tree right---------------
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
//-------------tree left---------------
            ouTreeDataLeft:[],//
            ouDefaultPropsLeft:{
                children: 'children',
                label: 'ouName',
                id:'id'
            },
//-------------穿梭按钮-----------
            fromOuRight:true,
            fromOuLeft:true,
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
            // loadOuWhat:'getAllCheckOu',//分页时调用



// ------------关联用户dialog-------------
            dialogUser:false,//控制对话框
            checkedUserTable:[],//已选所有数据
            showCheckedUser:[],//右侧表格展示的数据
            // roleCodesCancel:[],//表格数据，用于取消操作
            nocheckedUserTable:[],//可选所有数据
            showNoCheckedUser:[],//左侧表格展示的数据
            allUsers:[],//所有数据
            selection_user_checked: [],//复选框选中数据
            selection_user_nochecked: [],//复选框选中数据
            is_user_nocheked:true,//可选
            is_user_cheked:true,//已选
//---------用户left表格-------------
            searchLeftUser:'',//搜索
            // timeout:null,//搜索
            // restaurantsLeftUser:[],//搜索
            pageIndexLeftUser:1,//分页的当前页码
            totalPageLeftUser:0,//当前分页总数
            oneItemLeftUser:10,//每页有多少条信息
            pageLeftUser:1,//当前页 
            totalItemLeftUser:0,//总共有多少条消息  
            leftDownBtnUser:true,//分页按钮是否显示
            leftAddBtnUser:true,//分页按钮是否显示
 //---------用户right表格-------------         
            searchRightUser:'',
            totalItemRightUser:0,//总共有多少条消息 
            pageIndexRightUser:1,//分页的当前页码
            totalPageRightUser:0,//当前分页总数
            oneItemRightUser:10,//每页有多少条信息
            pageRightUser:1,//当前页 
            rightDownBtnUser:true,//分页按钮是否显示
            rightAddBtnUser:true,//分页按钮是否显示            
//----------用户初始表格--------------
            userTableLoading:true,
            showCheckedUserTable:[],
            totalItemBottomUser:0,//总共有多少条消息 
            pageIndexBottomUser:1,//分页的当前页码
            totalPageBottomUser:0,//当前分页总数
            oneItemBottomUser:10,//每页有多少条信息
            pageBottomUser:1,//当前页   
            searchBottomUser:'',//搜索

//-----------关联权限---------------
            headerFn:[],//全选下面复选框
            nextDivIsShow:true,//按钮组显示隐藏
            filterTextFn:'',//树形搜索框值
            click:false,//分页判断
            clickTreeData:[],//点击树形缓存数据，用来分页
            // dialogFn:false,
            checked:[],//展示所有权限
            nochecked:[],//
            allNode:[],
            storeNodeClickData:[],//储存点击节点的所有数据{all:[],check:[],nochecked:[]}
            nowClickNode:'',//记录点击的树节点
            checkTable:[],//页面渲染的数据
            nocheckTable:[],//页面渲染的数据
            allTable:[],//页面渲染的数据
            clickFnTreeData:[
                // {moduleName:'',head:[{displayName:'',permissionName:''}]}
            ],//当前点击节点数据
            clickCheckBox:'',
            pageTable:[],//用于分页展示所有权限
// -------------tree-------------------
            fnTreeLoading:false,
            fnTreeData:[],
            result:[],
            defaultProps: {
                children: 'childNodes',
                label: 'moduleName',
                value:'id'
            },           
//-------------分页----------------------
            checkAllFns:false,//全选
            showCheckFns:false,//查看已选
            showCheckedFnTable:[],//表格展示数据
            totalItemFn:0,//总共有多少条消息 
            pageIndexFn:1,//分页的当前页码
            totalPageFn:0,//当前分页总数
            oneItemFn:10,//每页有多少条信息
            pageFn:1,//当前页   

            expand:{
                expandId_addDataOu:[],//默认下拉树形展开id
                isHere_addDataOu:false,//是否存在id于树形
                expandId_dialogOu:[],//默认dialog组织树形展开id
                expandId_mmenu:[],//默认分配功能树形展开id
            },
            //------------------------按钮组-------------
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
             }],
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
            isUpdate:false,//是否修改
            isAdd:false,
            changeTimes:0,
        }
    },
     validators: {
      'addData.roleCode': function (value) {//用户编码
         return this.Validator.value(value).required().maxLength(50)
      },
      'addData.displayName': function (value) {//用户名称
         return this.Validator.value(value).required().maxLength(50);
      },
      'addData.ouId': function (value) {//所属组织
          return this.Validator.value(value).required().integer();
      },
      'addData.status': function (value) {//状态
         return this.Validator.value(value).integer();
      },
      'addData.remark': function (value) {//备注
         return this.Validator.value(value).maxLength(200);
      },

    },
    created () {
        let _this=this;
        _this.getModifyData();//根据id获取数据
       
        _this.GetUsers();
        _this.getSelectData();//下拉列表

        // _this.loadOuTable();//分配组织表格分页数据
        _this.getAllCheckOu();//获取所有已关联组织数据
        _this.getAllOulength();//获取所有数据长度判断是否全选
        _this.loadOuTreeAll();//关联组织树形所有数据
        // _this.loadOuTreeLeft();////关联组织树形左侧已选数据
        // _this.getCheckFn();//获取已关联权限
        // _this.getAllFn();//获取所有权限
        _this.fnLoadTree();//分配权限树形

        //  _this.loadTree_ou();//下拉列表
    },
    
    watch: {
        search_ou(val) {
            this.$refs.tree_ou.filter(val);
        },
        filterTextOu(val) {
            this.$refs.tree.filter(val);
        },
        filterTextFn(val) {
            this.$refs.tree_fn.filter(val);
        },
        ifModify(val){
           if(val){
              this.buttonGroup[1].disabled=true;
              this.buttonGroup[2].disabled=true;
              this.buttonGroup[3].disabled=false;
              this.buttonGroup[4].disabled=false;
              this.buttonGroup[5].disabled=false;
           }else{
              this.buttonGroup[1].disabled=false;
              this.buttonGroup[2].disabled=false;
              this.buttonGroup[3].disabled=true;
              this.buttonGroup[4].disabled=true;
              this.buttonGroup[5].disabled=true;
           }
        },
        addData:{
            handler:function(val,oldVal){
                let _this=this;
                if(!_this.firstModify){
                    _this.firstModify=!_this.firstModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        // addData:{
        //        handler:function(val,oldVal){
        //         let _this=this;
        //         if(!_this.saveSuccess){
        //             if(!_this.firstModify){
        //                 _this.firstModify=!_this.firstModify;
        //             }else{
        //                 _this.ifModify=true
        //             }
        //         }else{
        //              _this.ifModify=true;
        //         }
        //     },
        //     deep:true,
        // },
    //     addData:{
    //         handler: function (val, oldVal) {
    //         this.changeTimes++
    //         if(this.changeTimes>=2){
    //             this.buttonGroup[1].disabled=true;
    //             this.buttonGroup[2].disabled=true;
    //             this.buttonGroup[3].disabled=false;
    //             this.buttonGroup[4].disabled=false;
    //             this.buttonGroup[5].disabled=false;
    //             }
    //         },
    //         deep:true
    //   },
        clickFnTreeData:{
            handler:function(val,oldVal){
                
                let _this=this;
                if(!_this.secondModify){ 
                    _this.secondModify=!_this.secondModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        showCheckedUserTable:{
            handler:function(val,oldVal){
                
                let _this=this;
                if(!_this.thirdModify){ 
                    _this.thirdModify=!_this.thirdModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        ouCheckAll:{
            handler:function(val,oldVal){
                
                let _this=this;
                if(!_this.forthModify){ 
                    _this.forthModify=!_this.forthModify;
                }else{
                    _this.ifModify=true
                }
            },
            deep:true,
        },
        showCheckFns(val){
            let _this=this;
            if(val){
               $('.fnCheckBox').each(function(){
                   if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                       $(this).css('display','none')
                   }
               })     
            }else{
                $('.fnCheckBox').each(function(){
                   if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                       $(this).css('display','block')
                   }
               }) 
            }
        },
    },
    methods:{
        // btnClick(btn){             
        //         if(btn=="取消"){//取消确认对话框
        //             if(this.$route.params.id=="default"&&this.changeTimes<2){//新增操作
        //                 this.$store.state.url='/role/roleList/default'
        //    		        this.$router.push({path:this.$store.state.url})//点击切换路由
        //             }else{
        //                 this.dialogSetting.dialogName='cancelDialog'
        //                 this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
        //                 this.dialogSetting.dialogType="confirm";
        //                 this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        //                 this.dialogVisible=true;
        //             }
        //         }else if(btn=="保存"){
        //             this.save();
        //         }else if(btn=="删除"){//删除确认对话框
        //             this.dialogSetting.dialogName='delDialog'
        //             this.dialogSetting.message="确定删除？";
        //             this.dialogSetting.dialogType="confirm";
        //             this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        //             this.dialogVisible=true;
        //         }else if(btn=="返回"){
        //             console.log(this.changeTimes)
        //             if(this.$route.params.id!=="default"&&this.changeTimes<2){//新增操作
        //                 this.$store.state.url='/role/roleList/default'
        //                 this.$router.push({path:this.$store.state.url})//点击切换路由
        //             }else if(this.$route.params.id!=="default"&&this.changeTimes>2){
        //                 this.$store.state.url='/role/roleList/default'
        //                 this.$router.push({path:this.$store.state.url})//点击切换路由
        //             }else{
        //                this.dialogSetting.dialogName='backDialog'
        //                 this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
        //                 this.dialogSetting.dialogType="confirm";
        //                 this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
        //                 this.dialogVisible=true;
        //             }
        //         }else if(btn=="保存并新增"){
        //            this.saveAdd();
        //         }else if(btn=="新增"){
        //             this.add();
        //         }
        //  },
        childBybig(){
            this.roleClassify = false;
        },
        childByValue(val){
            this.roleClassify = false;
            let ret = val.bigarr;
            let big = [];
            let bbb = [];
            if(ret.length==0){//则没有未全选项
                big=val.arr
            }else{//否则包含未选项
            
            }
            // for(let i=0;i<ret.length;i++){
            //     if(ret[i].tier == 0){
            //         ret[i].childNodes = []
            //         big.push(ret[i])
            //     }else if(ret[i].tier == 1){
            //         ret[i].childNodes = [];
            //         bbb.push(ret[i])
            //     }
            // }
            // for(let i=0;i<val.arr.length;i++){
            //     if(val.arr[i].tier == 1){//二级数据
            //         for(let j=0;j<big.length;j++){
            //             if(big[j].id == val.arr[i].moduleParentId){
            //                 big[j].childNodes.push(val.arr[i])
            //             } 
            //         }
            //     }else if(val.arr[i].tier == 2){//三级数据
            //         for(let j=0;j<bbb.length;j++){
            //             if(bbb[j].id == val.arr[i].moduleParentId){
            //                 bbb[j].childNodes.push(val.arr[i])
            //             } 
            //         }
            //     }
            // }
            // for(let i=0;i<bbb.length;i++){
            //     for(let j=0;j<big.length;j++){
            //         if(big[j].id == bbb[i].moduleParentId){
            //             big[j].childNodes.push(bbb[i])
            //         } 
            //     }
            // }
            this.fnTreeData=big;
            this.defauleExpandTree('','expandId_mmenu',big,'id','childNodes')
            // _this.loadIcon();
            this.getCheckFn();
            this.ifModify=true
        },
        TreeSearch(){
            this.roleClassify = true;
        },
        btnClick(btn){//按钮组点击事件
        let self = this;
        if(btn=="返回"){//
            self.isBack();
        }else if(btn=="新增"){//
            self.add()
        }else if(btn=="删除"){//
            self.isDelPage()
        }else if(btn=="保存"){//
            self.save();
        }else if(btn=="保存并新增"){//
            self.saveAdd();
        }else if(btn=="取消"){
            self.isCancel();
        }
        },
        getSelectData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){ 
            // 启用状态
            _this.selectData.Status001=res.result;
            })
        },
        getModifyData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/Role/GetPermissions',{Id:_this.$route.params.id})
            .then(function(res){
                console.log(res)
            })
             _this.$axios.gets('/api/services/app/Role/Get',{Id:_this.$route.params.id})
            .then(function(res){
                // _this.addData=res.result;

                _this.addData={
                    "ouId": res.result.ouId,
                    "roleCode": res.result.roleCode,
                    "displayName": res.result.displayName,
                    "status": res.result.status,
                    "remark": res.result.remark,
                    "id": res.result.id,
                    }
                _this.auditInformation={//审计信息
                    createdBy:res.result.createdBy,
                    createdTime:res.result.createdTime,
                    modifiedBy:res.result.modifiedBy,
                    modifiedTime:res.result.modifiedTime,
                }
                _this.item_ou.ouName=res.result.ouName
                _this.item_ou.id=res.result.ouId
                _this.firstModify=false;
                _this.loadTree_ou()
                },function(res){
            })
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
        isBack(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogSetting.dialogName='isBack'
                _this.dialogSetting.message='确定返回？'
                _this.dialogSetting.dialogType='confirm'
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                _this.dialogUserConfirm=true;
            }else{
                _this.back()
            }
        },
        isCancel(){
            let _this=this;
            if(_this.ifModify){
                _this.dialogSetting.dialogName='isCancel'
                _this.dialogSetting.message='确定取消？'
                _this.dialogSetting.dialogType='confirm'
                _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
                _this.dialogUserConfirm=true;
            }
        },
        // isDeleteThis(){
        //     let _this=this;
        //     _this.dialogUserConfirm=true;
        //     _this.title='确认删除？'
        //     _this.choseDoing='deleteThis'

        // },
        isDelPage(){
            let _this=this;
            _this.dialogSetting.dialogName='isDelPage'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogUserConfirm=true;
        },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message='错误提示'
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
            }else if(data.dialogName=='isCancel'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.Cancel()
                    _this.dialogUserConfirm=false;
                }
            }else if(data.dialogName=='isDelPage'){
                if(data.dialogButton=='取消'){
                    _this.dialogUserConfirm=false;
                }else if(data.dialogButton=='确定'){
                    _this.delPage()
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
        Cancel(){
            let _this=this
            _this.validation.reset();
            _this.getModifyData();
            _this.GetUsers();
            _this.getAllCheckOu();//关联组织树形所有数据
            // _this.loadOuTable();
            _this.fnLoadTree();//分配权限树形
            // _this.firstModify=false;
            // _this.secondModify=false;
            // _this.thirdModify=false;
            // _this.forthModify=false;
            _this.ifModify=false;
            // $('table').each(function(){
            //     $(this).css('width',$(this).parent('.el-table__header-wrapper').css('width'))
            //     $(this).next('el-table__empty-block').css('width',$(this).parent('.el-table__header-wrapper').css('width'))
            // })
        },
        // getErrorMessage(message,details,validationErrors){
        //     let _this=this;
        //     _this.response.message='';
        //     _this.response.details='';
        //     _this.response.validationErrors=[];
        //     if(details!=null && details){
        //         _this.response.details=details;
        //     }
        //     if(message!=null && message){
        //         _this.response.message=message;
        //     }
        //     if(message!=null && message){
        //         _this.response.validationErrors=validationErrors;
        //     }
        // },
        saveAdd(){
            let _this=this
            _this.saves('saveAdd')
        },
        save(){
            let _this=this
            _this.saves('save')
        },
        saves(type){
            let _this=this;
            _this.$validate()
            .then(function (success) {
                if (success) {
                    let permissions=[];//关联权限
                    $.each(_this.clickFnTreeData,function(index,val){
                        $.each(val.children,function(i,v){
                            if(v.check){
                                permissions.push(v.permissionName)
                            }
                        })
                    });
                    _this.addData.permissions=permissions;

                    let userCodes=[];//关联用户
                    $.each(_this.showCheckedUserTable,function(index,val){
                        userCodes.push(val.userCode)
                    });
                    _this.addData.userCodes=userCodes;

                    let ouAssigns=[];//关联组织
                    $.each(_this.ouCheckAll,function(index,val){
                        ouAssigns.push(val.ouId)
                    });
                    _this.addData.ouAssigns=ouAssigns;
                    let BrowseMoudleIds = [];
                    for(let i=0;i<_this.fnTreeData.length;i++){
                        if(_this.fnTreeData[i].childNodes.length > 0){
                            for(let j=0;j<_this.fnTreeData[i].childNodes.length;j++){
                                for(let k=0;k<_this.fnTreeData[i].childNodes[j].childNodes.length;k++){
                                    BrowseMoudleIds.push(_this.fnTreeData[i].childNodes[j].childNodes[k].id)
                                }
                                BrowseMoudleIds.push(_this.fnTreeData[i].childNodes[j].id)
                                
                            }
                        }
                        
                        BrowseMoudleIds.push(_this.fnTreeData[i].id)
                    }
                    Array.prototype.distinct = function(){
                        var arr = this;
                        let result = [];
                        
                        let len = arr.length;
                        for(let i = 0; i < len; i++){
                            for(let j = i + 1; j < len; j++){
                                if(arr[i] === arr[j]){
                                    j = ++i;
                                }
                            }
                            result.push(arr[i]);
                        }
                        return result;
                    }
                    BrowseMoudleIds = BrowseMoudleIds.distinct();
                    // $.each(_this.fnTreeData,function(index,val){
                    // //    console.log(val)
                    //     BrowseMoudleIds.push(val.id)

                    // });
                    _this.addData.browseMoudleIds = BrowseMoudleIds;
                    console.log(_this.addData);
                    //ajax
                    _this.$axios.puts('/api/services/app/Role/Update',_this.addData)
                    .then(function(res){
                        if(type=='save'){
                            _this.auditInformation={//审计信息
                                createdBy:res.result.createdBy,
                                createdTime:res.result.createdTime,
                                modifiedBy:res.result.modifiedBy,
                                modifiedTime:res.result.modifiedTime,
                            }
                            _this.ifModify=false;
                            // _this.buttonGroup[1].disabled=false;//新增按钮
                            // _this.buttonGroup[2].disabled=false;//删除按钮
                            // _this.buttonGroup[3].disabled=true;//保存按钮
                            // _this.buttonGroup[4].disabled=true;//保存并新增按钮
                            // _this.buttonGroup[5].disabled=true;//取消按钮 
                            // _this.changeTimes=1;
                        }else if(type=='saveAdd'){
                            _this.add()
                        }
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }
            });
        },
        // saveAdd(){
        //      let _this=this;
        //     _this.$validate()
        //     .then(function (success) {
        //         if (success) {
        //             let permissions=[];//关联权限
        //             $.each(_this.clickFnTreeData,function(index,val){
        //                 $.each(val.children,function(i,v){
        //                     if(v.check){
        //                         permissions.push(v.permissionName)
        //                     }
        //                 })
        //             });
        //             _this.addData.permissions=permissions;

        //             let userCodes=[];//关联用户
        //             $.each(_this.showCheckedUserTable,function(index,val){
        //                 userCodes.push(val.userCode)
        //             });
        //             _this.addData.userCodes=userCodes;

        //             let ouAssigns=[];//关联组织
        //             $.each(_this.ouCheckAll,function(index,val){
        //                 ouAssigns.push(val.ouId)
        //             });
        //             _this.addData.ouAssigns=ouAssigns;
                    
        //             //ajax
        //             _this.$axios.puts('/api/services/app/Role/Update',_this.addData)
        //             .then(function(res){
        //                 _this.add()
        //                 _this.open('保存成功','el-icon-circle-check','successERP');
        //             },function(res){
        //                 _this.showErMsgDialog(res.error.message,res.error.details)
        //             })
        //         }
        //     });
            
        // },
        back(){
             this.$store.state.url='/role/roleList/default'
             this.$router.push({path:this.$store.state.url})
        },
        add(){
            let _this=this;
            _this.$store.state.url='/role/roleDetail/default';
            _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
        },
        delPage(){
             let _this=this;
            _this.$axios.deletes('/api/services/app/Role/Delete',{id:_this.$route.params.id})
            .then(function(res){
                 _this.open('删除成功','el-icon-circle-check','successERP');
                _this.dialogUserConfirm=false;
                _this.back();
            },function(res){
                _this.showErMsgDialog(res.error.message,res.error.details)
            })
        },
        handleClick(tab, event){//点击标签页控制重置数据后表格的宽度
            let _this=this;
           $(tab.$el).find('table').css('width',$(tab.$el).find('.el-table__header-wrapper').css('width'))
            $(tab.$el).find('.el-table__empty-block').css('width',$(tab.$el).find('.el-table__header-wrapper').css('width'))
        },
        defauleExpandTree(model,expandName,response,responseKey,children){
            //model数据模型
            //expandName需要设置的默认展开树形建值_this.expand[expandName]
            //response,树形数据
            //responseKey需要与model匹配的唯一key
            //children，response[children]
            let _this=this;
            if(model!=''){//model为树形下拉默认值，即渲染数据。如果存在，递归tree
                $.each(response,function(index,val){
                    if(val[responseKey]==_this.addData[model]){
                        _this.expand[expandName]=[_this.addData[model]]
                    }else{
                        $.each(val[children],function(index1,val1){
                            if(val1[responseKey]==_this.addData[model]){
                                _this.expand[expandName]=[_this.addData[model]]
                            }else{
                                _this.defauleExpandTree(model,expandName,val1[children],responseKey,children)
                            }
                        })
                    }
                })
            }else{
                 $.each(response,function(index,value){
                    if(index==0){
                        if(typeof(value)!='undefined'&&value!=null&&value[responseKey]!=null&&value[responseKey]!=''&&typeof(value[responseKey])!='undefined'){
                            _this.expand[expandName]=[value[responseKey]]
                        }
                        
                    }
                })
   
            }
        },
        loadCheckSelect(selectName,key){
            let _this=this;
            _this.$nextTick(function () { 
                $('.'+selectName+' .el-tree-node__label').each(function(){
                     if($(this).attr('data-id')==key){
                        $(this).click()
                    }
                })
            })
        },
//-------------关联组织-----------
        getAllOulength(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAll',{SkipCount:0,MaxResultCount:1})
            .then(function(res){
                _this.allOuLength=res.result.totalCount
                // console.log(res)
            })
        },
        searchOuTable(){
            let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchTableOu);
            $.each(_this.ouCheckAll,function(index,val){
                let str=val.ouCode;
                
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
                _this.dialogOu=false
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
        dialogOuIsShow(){
            let _this=this;
            _this.dialogOu=true;
            // _this.loadIcon();
            setTimeout(function(){
                console.log(_this.ouCheckAll)
               _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
               _this.isCheckAllOu()
            },200)
            
        },
        ouNodeClickRight(data){//右侧树形节点点击
            let _this=this;
            _this.addOu=data.ouId;
        },
        getAllCheckOu(){//获取所有关联权限
             let _this=this;
             _this.ouTableLoading=true
            _this.$axios.gets('/api/services/app/Role/GetOuAssignList',{Id:_this.$route.params.id,SkipCount:0,MaxResultCount:1})
            .then(function(resp){ 
                if(resp.result.totalCount>0){
                    _this.$axios.gets('/api/services/app/Role/GetOuAssignList',{Id:_this.$route.params.id,SkipCount:(_this.ouPage-1)*_this.ouOneItem,MaxResultCount:resp.result.totalCount})
                    .then(function(res){ 
                        _this.ouCheckAll=res.result.items;
                        _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
                        _this.ouTableLoading=false;
                        _this.forthModify=false
                        })
                }else{
                    _this.ouCheckAll=[];
                    _this.showPageTableOu=_this.paginationOu(_this.ouCheckAll,_this.ouOneItem,_this.ouPage)
                    _this.ouTableLoading=false;
                    _this.forthModify=false
                }
    
            })
    
        },
        loadOuTreeAll(){
            let _this=this;
            _this.$axios.gets('/api/services/app/Role/GetOuAssignTree',{Id:_this.$route.params.id})
            .then(function(res){
                _this.ouTreeDataRight=res.result;
                _this.defauleExpandTree('','expandId_dialogOu',res.result,'ouId','children')
            },function(res){
            })
        },
        // loadOuTreeLeft(){
        //     let _this=this;
        //     _this.$axios.gets('/api/services/app/Role/GetOuAssignTree',{id:_this.$route.params.id})
        //     .then(function(res){
        //         _this.ouTreeDataLeft=res.result;
        //         // console.log(res.result)
        //         //  _this.treeLoading=false;
        //         _this.loadIcon()
        //     },function(res){
        //     //    _this.treeLoading=false;
        //     })
        // },
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
//---------------分配权限--------------
        CheckAllFn(){//全选
            let _this=this;
            if(_this.checkAllFns){
                $.each(_this.showCheckedFnTable,function(index,val){
                    $.each(val.children,function(i,v){
                        v.check=true;
                    })
                }) 
                $.each(_this.headerFn,function(index,value){
                    value.checkAll=true
                    value.check=value.checkAll
                })
                $('.fnCheckBox').each(function(){
                   if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                       $(this).css('display','block')
                   }
               })
            }else{
                $.each(_this.showCheckedFnTable,function(index,val){
                    $.each(val.children,function(i,v){
                        v.check=false;
                    })
                })
                $.each(_this.headerFn,function(index,value){
                    value.checkAll=false
                    value.check=value.checkAll
                })
                if(_this.showCheckFns){
                    setTimeout(function(){
                        $('.fnCheckBox').each(function(){
                            if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                                $(this).css('display','none')
                            }
                        })
                    },100)     
                }
            }
            
        },
        isCheckAllFn(){//是否全选
            let _this=this;
            let flag=true;
            $.each(_this.headerFn,function(index,value){
                // checkHeaderFn.push({displayName:value.displayName,check:true})
                value.checkAll=true
            })
            $.each(_this.showCheckedFnTable,function(index,val){
                $.each(val.children,function(i,v){
                    if(v.check==false){
                        flag=false
                    }
                    $.each(_this.headerFn,function(ind,value){
                        if(value.displayName==v.displayName){
                            if(!v.check){
                                value.checkAll=false
                            }
                        }
                    })
                })
            })
            if(flag){
                _this.checkAllFns=true
            }else{
                _this.checkAllFns=false
            }
            $.each(_this.headerFn,function(index,value){
                value.check=value.checkAll
            })
        },
        showCheckFn(){//查看已选
            let _this=this;
            if(_this.showCheckFns){
               $('.fnCheckBox').each(function(){
                   if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                       $(this).css('display','none')
                   }
               })     
            }else{
                $('.fnCheckBox').each(function(){
                   if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
                       $(this).css('display','block')
                   }
               }) 
            }
        },
        // showCheckFnReset(){//重置查看已选
        //     let _this=this;
        //     _this.showCheckFns=false;
        //     $('.fnCheckBox').each(function(){
        //            if(!$(this).find('.el-checkbox__input').hasClass('is-checked')){
        //                $(this).css('display','block')
        //            }
        //        }) 
        // },
        filterNodeFn(value, data) {
            if (!value) return true;
            return data.moduleName.indexOf(value) !== -1;
        },
        getCheckFn(){//获取关联权限
            let _this=this;
            _this.$axios.gets('/api/services/app/Role/GetPermissions',{Id:_this.$route.params.id})
            .then(function(res){
                _this.checked=res.result.items;
                _this.pageTable=res.result.items;
                _this.clickFnTreeData=[];
                $.each(_this.fnTreeData,function(index1,value1){
                    let item1={moduleName:value1.moduleName,children:[]}
                    if(typeof(value1.permissionDtos)!='undefined' && value1.permissionDtos!=null && value1.permissionDtos.length>0){
                        $.each(value1.permissionDtos,function(index2,value2){
                            let x1={check:false,permissionName:value2.permissionName,displayName:value2.displayName,moduleName:value2.moduleName}
                            item1.children.push(x1)
                            $.each(_this.checked,function(y1,val1){
                                if(value2.permissionName==val1.displayName){
                                    x1.check=true;
                                }
                            })
                        })
                    }
                    if(typeof(value1.childNodes)!='undefined' && value1.childNodes!=null && value1.childNodes.length>0){
                        $.each(value1.childNodes,function(index2,value2){
                            let item2={moduleName:value2.moduleName,children:[]}
                            if(typeof(value2.permissionDtos)!='undefined' && value2.permissionDtos!=null && value2.permissionDtos.length>0){
                                $.each(value2.permissionDtos,function(index3,value3){
                                    let x2={check:false,permissionName:value3.permissionName,displayName:value3.displayName,moduleName:value3.moduleName}
                                    item2.children.push(x2)
                                    $.each(_this.checked,function(y2,val2){
                                        if(value3.permissionName==val2.displayName){
                                            x2.check=true;
                                        }
                                    })
                                })
                            }
                            if(typeof(value2.childNodes)!='undefined' && value2.childNodes!=null && value2.childNodes.length>0){
                                $.each(value2.childNodes,function(index3,value3){
                                    let item3={moduleName:value3.moduleName,children:[]}
                                    // let head3=[];
                                    if(typeof(value3.permissionDtos)!='undefined' && value3.permissionDtos!=null && value3.permissionDtos.length>0){
                                        $.each(value3.permissionDtos,function(index4,value4){
                                            let x3={check:false,permissionName:value4.permissionName,displayName:value4.displayName,moduleName:value4.moduleName}
                                            item3.children.push(x3)
                                             $.each(_this.checked,function(y3,val3){
                                                if(value4.permissionName==val3.displayName){
                                                    x3.check=true;
                                                }
                                            })
                                        })
                                    }
                                    _this.clickFnTreeData.push(item3)
                                })
                            }
                            _this.clickFnTreeData.push(item2)
                        })
                    }
                    _this.clickFnTreeData.push(item1)
                })
                // $('#FnPagination').css('display','block')
                let x=_this.paginationUserSearch(_this.clickFnTreeData,_this.oneItemFn,_this.pageFn)
                _this.showCheckedFnTable=x.nowData
                _this.totalItemFn=x.TotalItem
                _this.totalPageFn=x.TotalPage
                _this.isCheckAllFn()
                _this.loadHeadCheckbox()
                _this.secondModify=false
                _this.click=false
                },function(res){
            })
        },
        loadHeadCheckbox(){//获取表格上方复选框
            let _this=this;
            _this.headerFn=[]
            $.each(_this.showCheckedFnTable,function(index,val){
                $.each(val.children,function(i,v){
                    let repeat3=false;
                    $.each(_this.headerFn,function(indexH,heads){
                        if(heads.displayName==v.displayName){
                            repeat3=true;
                            return false
                        }
                    })
                    if(!repeat3){
                        _this.headerFn.push({displayName:v.displayName,check:false,checkAll:true})
                    }
                })
            })
        },
        FnPageChange(val){//分页
            let _this=this;
            _this.pageFn=val;
            if(_this.click){
                let x=_this.paginationUserSearch(_this.clickTreeData,_this.oneItemFn,_this.pageFn)
                _this.showCheckedFnTable=x.nowData
                _this.totalItemFn=x.TotalItem
                _this.totalPageFn=x.TotalPage
            }else{
                let x=_this.paginationUserSearch(_this.clickFnTreeData,_this.oneItemFn,_this.pageFn)
                _this.showCheckedFnTable=x.nowData
                _this.totalItemFn=x.TotalItem
                _this.totalPageFn=x.TotalPage
            }
            _this.loadHeadCheckbox();
            _this.$nextTick(function(){
                _this.isCheckAllFn();
                _this.showCheckFn()
            })
        },
        fnLoadTree(){
            let _this=this;
            _this.fnTreeLoading=true;
            _this.$axios.gets('/api/services/app/ModuleManagement/GetModulesTree',{RoleId:_this.$route.params.id,IsAll:false,Id:0})
            .then(function(res){
                _this.fnTreeData=res;
                _this.roleClassifyArr = res;
                _this.fnTreeLoading=false;
                _this.defauleExpandTree('','expandId_mmenu',res,'id','childNodes')
                // _this.loadIcon();
                _this.getCheckFn();
            },function(res){
                _this.fnTreeLoading=false;
            })
        },
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
        selectHeaderFn(data){
            let _this=this;
            let checkAll=true;
            $.each(_this.showCheckedFnTable,function(index,val){
                    $.each(val.children,function(i,v){
                    if(data.displayName==v.displayName){ 
                        if(data.check){
                            v.check=true  
                        }else{
                            v.check=false
                        }
                    }
                })
            })
            $.each(_this.headerFn,function(index,value){
                value.checkAll=value.check
                if(!value.checkAll){
                    checkAll=false
                }
            })
            _this.checkAllFns=checkAll
        },
        selectChangeFn(x,permissionName){
            let _this=this;
            // if(x){//选中状态为true
            //     _this.checked.push({
            //         name:permissionName,
            //         displayName:permissionName,
            //         id:0,
            //         description:'',
            //     })
            // }else{//选中状态为false
            //     for(let i=0;i<_this.checked.length;i++){//移除已选
            //         if(permissionName==_this.checked[i].displayName){
            //             _this.checked.splice(i,1)
            //         }
            //     }
            // }
            _this.isCheckAllFn()
            // console.log(_this.checked)
        },
        fnNodeClick(data){//获取点击所有权限
            let _this=this;
            let flag=false
            let showCheckedFnTable=[]
            _this.click=true;//分页时需要
            $.each(_this.clickFnTreeData,function(index1,value1){
                if(data.moduleName==value1.moduleName){
                    flag=true
                    showCheckedFnTable.push(value1)
                    if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                        $.each(data.childNodes,function(index2,value2){
                            $.each(_this.clickFnTreeData,function(x1,val1){
                                if(value2.moduleName==val1.moduleName){
                                    showCheckedFnTable.push(val1)
                                }
                                 if(typeof(value2.childNodes)!='undefined' && value2.childNodes!=null && value2.childNodes.length>0){
                                    $.each(value1.childNodes,function(index3,value3){
                                         $.each(_this.clickFnTreeData,function(x2,val2){
                                            if(value3.moduleName==val2.moduleName){
                                                showCheckedFnTable.push(val2)
                                            }
                                         })
                                    })
                                }
                            })
                        })
                    }
                }

            })
            if(flag){
                _this.clickTreeData=showCheckedFnTable
                let x=_this.paginationUserSearch(_this.clickTreeData,_this.oneItemFn,_this.pageFn)
                _this.showCheckedFnTable=x.nowData
                _this.totalItemFn=x.TotalItem
                _this.totalPageFn=x.TotalPage
                _this.loadHeadCheckbox();
            }
            _this.$nextTick(function(){
                _this.isCheckAllFn();
                _this.showCheckFn()
            })

        },
        filterNode_ou(value, data) {
            if (!value) return true;
            return data.ouName.indexOf(value) !== -1;
        },
        loadTree_ou(){
            let _this=this;
            _this.$axios.gets('/api/services/app/OuManagement/GetAllTree')
            .then(function(res){
                _this.selectTree_ou=res;
               
                _this.defauleExpandTree('ouId','expandId_addDataOu',res,'id','children')
                if(_this.expand.expandId_addDataOu.length<1){
                    _this.expand.expandId_addDataOu=[_this.selectTree_ou[0].id]
                }
                _this.loadCheckSelect('ouId',_this.addData.ouId);
            },function(res){
            })
        },
        nodeClick_ou(data,node,self){
            let _this=this;
            _this.item_ou.id=data.id;
            _this.item_ou.ouName=data.ouName;
            _this.$nextTick(function(){
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
            })
            // $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
            //     if($(this).attr('date')==data.id){
            //         $(this).click()
            //     }
            // })
        },
// ----------关联用户--------------
        userInit(){
            this.searchLeftUserTable();
            this.searchRightUserTable();
        },
        searchLeftUserTable(){//左侧数据搜索
            let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchLeftUser);
            $.each(_this.checkedUserTable,function(index,val){
                let str=val.displayName;
                let result = patt1.test(str);
                if(result){
                    newJson.push(val)
                }
            })
            let x=_this.paginationUserSearch(newJson,_this.oneItemLeftUser,_this.pageLeftUser)
            _this.showCheckedUser=x.nowData
            _this.totalItemLeftUser=x.TotalItem
            _this.totalPageLeftUser=x.TotalPage

        },
        searchRightUserTable(){//右侧数据搜索
             let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchRightUser);
            $.each(_this.nocheckedUserTable,function(index,val){
                let str=val.displayName;
                let result = patt1.test(str);
                if(result){
                    newJson.push(val)
                }
            })
            let x=_this.paginationUserSearch(newJson,_this.oneItemRightUser,_this.pageRightUser)
            _this.showNoCheckedUser=x.nowData
            _this.totalItemRightUser=x.TotalItem
            _this.totalPageRightUser=x.TotalPage

        },
        searchBottomUserTable(){
            let _this=this;
            // _this.searchLeftUser
            let newJson=[];
            let patt1 = new RegExp(_this.searchBottomUser);
            $.each(_this.checkedUserTable,function(index,val){
                let str=val.displayName;
                
                let result = patt1.test(str)
                if(result){
                    newJson.push(val)
                }
            })
            let x=_this.paginationUserSearch(newJson,_this.oneItemBottomUser,_this.pageBottomUser)
            _this.showCheckedUserTable=x.nowData
            _this.totalItemBottomUser=x.TotalItem
            _this.totalPageBottomUser=x.TotalPage
        },
        editDialog(){
            let _this=this;
                _this.dialogUser=true;
            
        },
        paginationUserSearch(data,oneItem,thisPage){//数据分页
        //checkAllata分页数据
        //oneItem每页有多少条信息
        //thisPage当前页
            let _this=this;
            let x={}
            let nowData=[];
            // console.log(checkAllata)
            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
            let endIndex=startIndex + oneItem;
                if(data.length>0){
                    if(endIndex>data.length){
                        endIndex=data.length
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        // console.log(data[startIndex])
                        nowData.push(data[startIndex])
                    }
                }
            // _this.ouTotalItem=data.length;//总共多少条数据
            // _this.ouTotalPage=Math.ceil(data.length/oneItem);//有多少页
            x={TotalItem:data.length,TotalPage:Math.ceil(data.length/oneItem),nowData:nowData};
            return x
        },
        LeftbtnIsShow(){
            let _this=this;
            if(_this.pageLeftUser>1){
                _this.leftDownBtnUser=false;
            }else{
                _this.leftDownBtnUser=true;
            }
            
            if(_this.totalPageLeftUser>_this.pageLeftUser){
                _this.leftAddBtnUser=false;
            }else{
                _this.leftAddBtnUser=true;
            }
            
        },
        RightbtnIsShow(){
            let _this=this;
            if(_this.pageRightUser>1){
                _this.rightDownBtnUser=false;
            }else{
                _this.rightDownBtnUser=true;
            }
            if(_this.totalPageRightUser>_this.pageRightUser){
                _this.rightAddBtnUser=false;
            }else{
                _this.rightAddBtnUser=true;
            }
        },
        userLeftPageChange(val){//页码改变
            let _this=this;
            _this.pageLeftUser=val;
            _this.showCheckedUser=_this.pagination([],[],_this.oneItemLeftUser,_this.pageLeftUser,'left')
        },
        userBottomPageChange(val){//页码改变
            let _this=this;
            _this.pageBottomUser=val;
            let x=_this.paginationUserSearch(_this.checkedUserTable,_this.oneItemBottomUser,_this.pageBottomUser)
            _this.showCheckedUserTable=x.nowData
            _this.totalItemBottomUser=x.TotalItem
            _this.totalPageBottomUser=x.TotalPage
        },
        uniqueArray(array1, array2){//求差集
            var result = [];
            for(var i = 0; i < array1.length; i++){
                var item = array1[i];
                var repeat = false;
                for (var j = 0; j < array2.length; j++) {
                    if (array1[i].id == array2[j].id) {//唯一key
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
        pagination(addData,delData,oneItem,thisPage,LeftOrRight){//数据分页
            //data需要被分页的数据,类型为[{}]
            //addData被添加的数据数据,类型为[{}]
            //delData被移走的数据,类型为[{}]
            //totalItem总共有多少条消息  
            //pageIndex分页的当前页码
            //totalPages当前分页总数
            //oneItem每页有多少条信息
            //thisPage当前页
            
            let _this=this;
            let nowData=[];
            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
            let endIndex=startIndex + oneItem;
            if(LeftOrRight=='right'){
                if(addData.length>0){
                    _this.nocheckedUserTable=addData.concat(_this.nocheckedUserTable);
                }
                if(delData.length>0){
                    _this.nocheckedUserTable=_this.uniqueArray(_this.nocheckedUserTable,delData);
                }
                
                if(_this.nocheckedUserTable.length>0){
                    if(endIndex>_this.nocheckedUserTable.length){
                        endIndex=_this.nocheckedUserTable.length;
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        nowData.push(_this.nocheckedUserTable[startIndex])
                    }
                }
                
            }else if(LeftOrRight=='left'){
                if(addData.length>0){
                    _this.checkedUserTable=addData.concat(_this.checkedUserTable);
                }
                if(delData.length>0){
                    _this.checkedUserTable=_this.uniqueArray(_this.checkedUserTable,delData)
                }
                if(_this.checkedUserTable.length>0){
                    if(endIndex>_this.checkedUserTable.length){
                        endIndex=_this.checkedUserTable.length;
                    }
                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                        nowData.push(_this.checkedUserTable[startIndex])
                    }
                }
            }
            //左侧
            _this.totalItemLeftUser=_this.checkedUserTable.length;//左侧总共多少条数据
            _this.totalPageLeftUser=Math.ceil(_this.totalItemLeftUser/_this.oneItemLeftUser);//有多少页
            _this.LeftbtnIsShow()
            //右侧
            _this.totalItemRightUser=_this.nocheckedUserTable.length;//右侧总共多少条数据
            _this.totalPageRightUser=Math.ceil(_this.totalItemRightUser/_this.oneItemRightUser);//有多少页
            _this.RightbtnIsShow()
            return nowData
        },
       
        GetUsers(){//获取左侧表格数据
            let _this=this;
            _this.userTableLoading=true;
            _this.$axios.gets('/api/services/app/Role/GetUsers',{id:_this.$route.params.id,SkipCount:0,MaxResultCount:1})
            
           .then(function(response){//获取已选角色
                let totalCheckedAll=response.result.totalCount;//获取总共当前关联角色条数
                // console.log(response)
                if(totalCheckedAll>0){
                    _this.$axios.gets('/api/services/app/Role/GetUsers',{id:_this.$route.params.id,SkipCount:0,MaxResultCount:totalCheckedAll})
                    .then(function(resp){//获取已选角色
                        _this.checkedUserTable=resp.result.items;
                    
                        _this.showCheckedUserTable=resp.result.items;
                        let x=_this.paginationUserSearch(_this.checkedUserTable,_this.oneItemBottomUser,_this.pageBottomUser)
                         _this.showCheckedUserTable=x.nowData
                        _this.totalItemBottomUser=x.TotalItem
                        _this.totalPageBottomUser=x.TotalPage
                        _this.getAllUserData()//获取所有角色数据
                        _this.thirdModify=false
                    })
                }else{
                    _this.showCheckedUserTable=[]
                    _this.checkedUserTable=[]
                    _this.getAllUserData()//获取所有角色数据
                    _this.thirdModify=false
                }
                _this.userTableLoading=false;
           })
        },
        getAllUserData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/User/GetAll',{SkipCount:0,MaxResultCount:1})//获取所有角色
            .then(function(re){ 
                let totalAll=re.result.totalCount;//获取总共当前关联角色条数
                _this.$axios.gets('/api/services/app/User/GetAll',{SkipCount:0,MaxResultCount:totalAll})//获取所有角色
                .then(function(res){ 
                    _this.nocheckedUserTable=[]
                    _this.allUsers=res.result.items;
                    _this.totalItemRightUser=res.result.totalCount;
                    if(_this.checkedUserTable.length>0){//获取可选角色
                        _this.nocheckedUserTable=_this.uniqueArray(_this.allUsers,_this.checkedUserTable)
                        _this.showNoCheckedUser=_this.pagination([],[],_this.oneItemRightUser,_this.pageRightUser,'right')
                        _this.showCheckedUser=_this.pagination([],[],_this.oneItemLeftUser,_this.pageLeftUser,'left')
                    }else{
                        _this.nocheckedUserTable=_this.allUsers;
                        _this.showCheckedUser=[];
                        _this.showNoCheckedUser=_this.pagination([],[],_this.oneItemRightUser,_this.pageRightUser,'right')
                        
                    }
                    _this.userTableLoading=false;
                },function(res){
                    _this.userTableLoading=false;
                })
            })        
        },
        checkedSelect(val) {//dialogRole选中已选角色
            let _this=this;
            _this.selection_user_checked = val;
            if(val.length==0){
                _this.is_user_cheked=true
            }else{
                _this.is_user_cheked=false
            }
        },
        nocheckedSelect(val) {//dialogRole选中可选角色
            let _this=this;
            _this.selection_user_nochecked = val;
            if(val.length==0){
                _this.is_user_nocheked=true
            }else{
                _this.is_user_nocheked=false
            }
        },
        noCheck_push_check_user(){//从右往左添加数据
            let _this=this;
            _this.showCheckedUser=_this.pagination(_this.selection_user_nochecked,[],_this.oneItemLeftUser,_this.pageLeftUser,'left')
            _this.showNoCheckedUser=_this.pagination([],_this.selection_user_nochecked,_this.oneItemRightUser,_this.pageRightUser,'right')
        },
        check_push_noCheck_user(){//从左往右添加数据
            let _this=this;
            _this.showCheckedUser=_this.pagination([],_this.selection_user_checked,_this.oneItemLeftUser,_this.pageLeftUser,'left')
            _this.showNoCheckedUser=_this.pagination(_this.selection_user_checked,[],_this.oneItemRightUser,_this.pageRightUser,'right')
           
        },
        check_push_noCheck_userThis(val){//删除一个关联角色
                let json=[val]
                let _this=this;
                _this.checkedUserTable=_this.uniqueArray(_this.checkedUserTable,json);
                _this.showNoCheckedUser=_this.pagination(json,[],_this.oneItemRightUser,_this.pageRightUser,'right')
                _this.showCheckedUser=_this.pagination([],json,_this.oneItemLeftUser,_this.pageLeftUser,'left')

                _this.showCheckedUserTable=_this.uniqueArray(_this.showCheckedUserTable,json);
                let x=_this.paginationUserSearch(_this.checkedUserTable,_this.oneItemBottomUser,_this.pageBottomUser);
                _this.showCheckedUserTable=x.nowData
                _this.totalItemBottomUser=x.TotalItem
                _this.totalPageBottomUser=x.TotalPage
        },
        dialogUserConfirmUser(){//确认
            let _this=this;
            _this.dialogUser=false;
            _this.showCheckedUserTable=_this.checkedUserTable
            let x=_this.paginationUserSearch(_this.checkedUserTable,_this.oneItemBottomUser,_this.pageBottomUser)
             _this.showCheckedUserTable=x.nowData
            _this.totalItemBottomUser=x.TotalItem
            _this.totalPageBottomUser=x.TotalPage

        },
        cancelPushUser(){//取消
            let _this=this;
            _this.dialogUser=false;
        },
        pageDownLeftUser(){//左侧表格向左翻页
            let _this=this;
            if(_this.pageLeftUser>1){
                _this.pageLeftUser--
                
                _this.showCheckedUser=_this.pagination([],[],_this.oneItemLeftUser,_this.pageLeftUser,'left')
            }
        },
        pageAddLeftUser(){//左侧表格向右翻页
            let _this=this;
            if(_this.pageLeftUser<=_this.totalPageLeftUser){
                _this.pageLeftUser++
                _this.showCheckedUser=_this.pagination([],[],_this.oneItemLeftUser,_this.pageLeftUser,'left')
            }
        },
        pageDownRightUser(){//右侧表格向左翻页
            let _this=this;
            if(_this.pageRightUser>1){
                _this.pageRightUser--
                _this.showNoCheckedUser=_this.pagination([],[],_this.oneItemRightUser,_this.pageRightUser,'right')
            }    
        },
        pageAddRightUser(){//右侧表格向右翻页
            let _this=this;
            if(_this.pageRightUser<_this.totalPageRightUser){
                _this.pageRightUser++
                _this.showNoCheckedUser=_this.pagination([],[],_this.oneItemRightUser,_this.pageRightUser,'right')
            }
        },
    //      getCheckedNodes() {
    //          this.storeCheckOu=this.$refs.tree.getCheckedNodes()
    //     console.log(this.$refs.tree.getCheckedNodes());
    //   },
    //   getCheckedKeys() {
    //        this.storeCheckOu=this.$refs.tree.getCheckedKeys()
    //     console.log(this.$refs.tree.getCheckedKeys());
    //   },
    //   setCheckedNodes() {
    //       console.log(this.ouCheckAll)
    //     this.$refs.tree.setCheckedNodes(this.ouCheckAll);
    //   },
    //   setCheckedKey() {
    //       let _this=this;
    //       console.log(this.storeCheckOu)
    //         _this.$refs.tree.setCheckedKeys(this.storeCheckOu);
    //   },
    //   resetChecked() {
    //     this.$refs.tree.setCheckedKeys([]);
    //   },
    renderContent_Fn(h, { node, data, store }){
             if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label"  data-id={data.ouId}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.moduleName}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label"  data-id={data.ouId}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.moduleName}
                        </span>
                    );
                }
        },
        renderContent_ou(h, { node, data, store }){
             if(typeof(data.childItems)!='undefined' && data.childItems!=null && data.childItems.length>0){
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
    //     dialogClick(parmas){//对话框点击事件
    //             if(parmas.dialogButton=="确定"){
    //                 if(parmas.dialogName=="cancelDialog"){//取消操作确认操作
    //                     if(this.$route.params.id=="default"){
    //                         this.validation.reset();                 
    //                         this.$store.state.url='/role/roleList/default'
    //                         this.$router.push({path:this.$store.state.url})//点击切换路由
    //                     }else{
    //                         this.getModifyData();
    //                     }
    //                     this.changeTimes=0;
    //                     console.log(this.changeTimes);
    //                     this.buttonGroup[1].disabled=false;
    //                     this.buttonGroup[2].disabled=false;
    //                     this.buttonGroup[3].disabled=true;
    //                     this.buttonGroup[5].disabled=true;
    //                     this.buttonGroup[4].disabled=true;
    //                     this.dialogVisible=false; 
    //                 }else if(parmas.dialogName=="delDialog"){//删除确认操作
    //                     let _this=this;
    //                     _this.$axios.deletes('/api/services/app/Role/Delete',{Id:_this.$route.params.id}).then(function(res){
    //                         _this.$store.state.url='/role/roleList/default'
    //                         _this.$router.push({path:_this.$store.state.url})//点击切换路由
    //                         _this.open('删除成功','el-icon-circle-check','successERP'); 
    //                         _this.dialogVisible=false; 
    //                     }).catch(function(err){
    //                         _this.dialogVisible=false;  
    //                         _this.$message({
    //                             type: 'warning',
    //                             message: err.error.message
    //                         });
    //                     }) 
    //                 }else if(parmas.dialogName=="saveDialog"){//保存报错对话框
    //                     this.dialogVisible=false
    //                 }else if(parmas.dialogName=="backDialog"){//返回主页面对话框
    //                      this.$store.state.url='/role/roleList/default'
    //                      this.$router.push({path:this.$store.state.url})//点击切换路由
    //                 }
    //             }else{
    //                 this.dialogVisible=false; 
    //             }
    //         },
    //         dialogColse(){
    //             this.dialogVisible=false;
    //         },     
    },
    components: {
        buttonGroup,
        dialogBox,
        classify 
    }
    })
  </script>

  <style>
  .roleModify{
      font-family: 'microsoft yahei';
  }
  .roleModify .inline-block-need{
    display: inline-block;
}
  .chooseFn{
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
  }
   .chooseFn .fa-cog{
       cursor: pointer;
        color: #c9d1d1;
        float: right;
        line-height: 30px;
        font-size: 20px;
  }
  .roleModify .add{
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
 /*收起*/
 .checkBoxOuUser{
     height: 50px;
     background-color: #f2f2f2;
     line-height: 50px;
 }
 .roleModify .square_el{
       margin-right:5px;
       margin-left: 10px;
   }
   
 .roleModify .upBt{
     font-size: 12px;
     float: right;
     margin-right: 10px;
     margin-top: 10px;
     cursor: pointer;
 }
 .roleModify .upBt i{
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s; 
    color:#cacaca;
    margin-left: 5px;
 }
 .roleModify .upBt i.rotate{
     transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);	
 }

.roleModify  .errorTips{
    margin-bottom: 10px;
}  
  .roleModify .el-row{
     background-color: #fff;
  }

.roleModify .tabZoo{
     overflow: hidden;
     background-color: #fff;
 }

 .roleModify  .getPadding,.tabZoo .el-tabs__nav-scroll{
     padding: 0 10px;
 }
 .roleModify .tabZoo .auditInformation{
     margin-top: 15px;
 }

.roleModify .tabZoo .erp_bt:first-child{
    margin-left: 0;
}
.roleModify .nopadding{
    padding-top: 0;
}
.mb10{
    margin-bottom: 10px;
}
.bb1{
    border-bottom: 1px solid #e4e4e4;
    padding: 2px 0px;
    }
.bg-white{
    background-color:#fff;
}
.input-need{
    border:none;
    outline: none;
    width: 100%;
    height: 23px;
    line-height: 23px;
    text-align: center
}
.roleModify .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.show{
    display: block;
}
.fnTreeWrapper{
    height: 500px;
}
.checkbox_group{
  background-color: #f2f2f2;
  padding: 0 10px;
}
.checkbox_group .el-checkbox{
  margin-bottom: 5px;
  margin-top: 5px;
}
  </style>
  
  <style>
  .roleModify .el-tab-pane .bt_add{
      margin-bottom:15px;
  }
.roleModify .el-dialog__body{
  overflow: hidden;
}
.roleModify .el-tree-node__content{
    background-color: #F9F9F9;
}
.roleModify .search_input_group{
    margin-top:6px;
}
.roleModify .dialogOu .search_input_group{
    width:40%;
    position: absolute;
    top: 2px;
    right: 6%;
}
.roleModify .dialogOu .search_input_group .search_input_wapper{
    width:100%;
}

.roleModify .fnTable .el-table__row td:last-child .cell{
    text-align: left;
}
.roleModify .Fn_Tree_search .el-input__icon{
    line-height:30px
}
.fnCheckBox{
    float: left;
    margin-right:20px;
}
.fnCheckBox.el-checkbox+.el-checkbox{
     margin-left:0;
     
}
  </style>
