<template>
    <div class="menuModify">
        <el-row  class="fixed">
            <el-col :span="24">
                <div class="btnGroup-box">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>
                </div>
            </el-col>
        </el-row>
        <el-row class="pt20">
          <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>菜单编码</label>
                        <el-input

                        class="moduleCode"
                        :class="{redBorder : validation.hasError('addData.moduleCode')}"
                        v-model="addData.moduleCode"
                        placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.moduleCode') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>菜单名称</label>
                        <el-input

                        class="moduleName"
                        :class="{redBorder : validation.hasError('addData.moduleName')}"
                        v-model="addData.moduleName"
                        placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.moduleName') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>子系统</label>
                        <el-select clearable filterable
                        class="systemId"

                        :class="{redBorder : validation.hasError('addData.systemId')}"
                        placeholder=""
                        v-model="addData.systemId">
                            <el-option v-for="item in selectData.systemId" :key="item.id" :label="item.systemName" :value="item.id">
                            </el-option>
                            <el-option v-show="false" :label="item_area_no.ouName" :value="item_area_no.id"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.systemId') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                    <label>上级菜单</label>
                    <el-select clearable
                        class="moduleParentId"
                        placeholder=""

                        :class="{redBorder : validation.hasError('addData.moduleParentId')}"
                        v-model="addData.moduleParentId"  >
                        <el-input
                            placeholder="搜索..."
                            class="selectSearch"
                            v-model="search">
                        </el-input>
                            <el-tree
                             :default-expanded-keys="expand.expandId_moduleParentId"
                            :data="selectTree"
                            :highlight-current="true"
                            :props="selectProps"
                            node-key="id"
                            ref="tree"
                            :filter-node-method="filterNode"
                            :expand-on-click-node="false"
                            @node-click="selectNodeClick"
                            :render-content="renderContent_moduleParentId"
                            >
                            </el-tree>
                            <!-- <el-option class="select_tree_option" :key="item.id" :label="item.moduleName" :value="item.id" :date="item.id">
                            </el-option> -->
                            <el-option  class="select_tree_option" v-for="item in selectData.menu" :key="item.id" :label="item.moduleName" :value="item.id" :date="item.id">
                            </el-option>
                            <el-option v-show="false" :label="item_area_no.ouName" :value="item_area_no.id"></el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.moduleParentId') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>状态</label>
                        <el-select clearable filterable

                        v-model="addData.status"
                        :class="{redBorder : validation.hasError('addData.status')}"
                        placeholder="">
                            <el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.status') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth" style="position: relative;">
                        <label>图标</label>
                        <!-- <el-input
                        class="ico"
                        :class="{redBorder : validation.hasError('addData.ico')}"
                        v-model="addData.ico"
                        placeholder=""></el-input> -->
                        <i :class="addData.ico" aria-hidden="true" style="position: absolute;right: 35px;z-index: 10;top: 6px;font-size: 25px;"></i>
                        <el-select clearable filterable
                        class="ico"

                        :class="{redBorder : validation.hasError('addData.ico')}"
                        placeholder=""
                        v-model="addData.ico">
                            <el-option v-for="item in $store.state.icon" :key="item.code" :label="item.code" :value="item.code">
                                {{item.code}}<i style="float:right;line-height:34px;" :class="item.code" aria-hidden="true"></i>
                            </el-option>
                        </el-select>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.ico') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>路由地址</label>
                        <el-input
                        class="url"

                        :class="{redBorder : validation.hasError('addData.url')}"
                        v-model="addData.url"
                        placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.url') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>排序</label>
                        <el-input
                        class="seq"
                        :class="{redBorder : validation.hasError('addData.seq')}"
                        v-model="addData.seq"
                        placeholder=""></el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.seq') }}</div>
                </div>
            </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>备注</label>
                        <el-input
                            type="textarea"
                            :class="{redBorder : validation.hasError('addData.remark')}"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            v-model="addData.remark"
                            placeholder="">
                        </el-input>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('addData.remark') }}</div>
                </div>
            </el-col>

          <el-col :span="24"  >
            <div class="bgMarginAuto">
              <div class="bgcolor bgLongWidth">
                <label>应用服务</label>
                <el-select clearable filterable

                           v-model="addData.appService"
                           :class="{redBorder : validation.hasError('addData.appService')}"
                           placeholder="">
                  <!--<el-option v-for="item in selectData.Status001" :key="item.itemValue" :label="item.itemName" :value="item.itemValue">-->
                  <!--</el-option>-->
                </el-select>
              </div>
              <div class="error_tips_info">{{ validation.firstError('addData.appService') }}</div>
            </div>
          </el-col>

            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label>DTO自定义配置</label>
                        <div class="addZoo">
                            <a class="add" href="javascript:;" @click="DTOdialog = true">+</a>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                 <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth" style="overflow:visible;">
                        <label class="h_35"></label>
                        <div class="rolesZoo">
                            <a class="addRole" :key="index" v-for="(x,index) in DTO_checkData" :dtoName="x.dtoName">{{x.dtoShowName}}<i  @click="del_DTO(x,index)" class="el-icon-error"></i></a>
                        </div>
                    </div>
                 </div>
            </el-col>
            <el-col :span="24"  >
                <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth">
                        <label><small>*</small>功能权限</label>
                        <div class="addZoo">
                            <a class="add" href="javascript:;" @click="dialogTableVisible = true">+</a>
                        </div>
                    </div>
                    <div class="error_tips_info">{{ validation.firstError('checked') }}</div>
                </div>
            </el-col>
            <el-col :span="24">
                 <div class="bgMarginAuto">
                    <div class="bgcolor bgLongWidth" style="overflow: visible;">
                        <label class="h_35"></label>
                        <div class="rolesZoo">
                            <a class="addRole"  v-for="(x,index) in permissionConfirm" :key="index" :permissionName="x.permissionName">{{x.moduleName}}{{x.displayName}}<i  @click="check_push_noCheck_FnThis(x,index)" class="el-icon-error"></i></a>
                        </div>
                    </div>
                 </div>
            </el-col>
            <el-col :span="24" class="getPadding">
                <h4 class="h4">审计信息</h4>
                <div>
                    <div class="bgcolor"><label>创建人</label><el-input v-model="auditInformation.createdBy" disabled></el-input></div>
                    <div class="bgcolor">
                        <label>创建时间</label>
                          <el-date-picker
                            v-model="auditInformation.createdTime"
                            type="date"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            disabled
                            placeholder="">
                         </el-date-picker>
                    </div>
                    <div class="bgcolor"><label>修改人</label><el-input  v-model="auditInformation.modifiedBy" disabled></el-input></div>
                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-date-picker
                            v-model="auditInformation.modifiedTime"
                            type="date"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            disabled
                            placeholder="">
                         </el-date-picker>
                    </div>
                </div>
            </el-col>
        </el-row>
            <!-- DTO自定义配置 -->
        <el-dialog :visible.sync="DTOdialog" class="DTO_dialog">
                <div slot="title">
                    <span>DTO自定义配置</span>
                    <el-select class="DTOselect" clearable filterable placeholder="" v-model="language" @change="getCurrentPageLanguage">
                        <el-option v-for="(item,index) in selectData.language" :key="index" :label="item.displayName" :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-col :span="24">
                            <el-input
			                placeholder="搜索..."
			                v-model="treeQuery"
			                class="search_input mt5 mb5 tree-query"
			                >
			                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <vue-scroll :ops="$store.state.option">
                                <el-tree
                                    :default-expanded-keys="expand.expandId_DTO"
                                    :data="DTO_tree"
                                    :highlight-current="true"
                                    :props="DTO_defaultProps"
                                    node-key="dtoName"
                                    @node-click="DTO_nodeClick"
                                    :expand-on-click-node="false"
                                    :render-content="renderContent_DTO">
                                </el-tree>
                            </vue-scroll>
                        </el-col>
                    </el-col>
                    <el-col :span="20">
                    <div class="tabZoo">

                        <el-tabs v-model="activeName_first"  @tab-click="DTO_tabClick">
                            <el-tab-pane  v-for="(item,index) in DTO_tabs" :key="index" :name="index.toString()" :FieldName='item.dtoName'>
                            <span slot="label">
                                <input v-if='haveLanguage' class="input-need" v-model="item.dtoShowName" type="text"/>
                                <span v-if='!haveLanguage'>{{item.dtoShowName}}</span>
                            </span>
                            </el-tab-pane>
                        </el-tabs>
                        <div class="dtoWrapper">
                            <div class="dtoBtnWrapper" v-show="haveTwoData">
                                <button @click="movePrev" class="dtoMove" :disabled="btDisable">前移 <i class="fa fa-angle-up" aria-hidden="true"></i></button><br/>
                                <button @click="moveNext" class="dtoMove"  :disabled="btDisable">后移 <i class="fa fa-angle-down" aria-hidden="true"></i></button>
                            </div>

                            <el-table ref="multipleTable" v-loading="DTO_load" @selection-change="custormSelect" :data="DTO_tableData" border style="width: 100%" stripe max-height="400">
                                    <el-table-column fixed="left" type="selection"></el-table-column>
                                    <el-table-column fixed="left" width="120" label="字段名">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            disabled
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.fieldName"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="left" width="130" label="标题字段">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.showName"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="默认值">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.default"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isShow" label="是否用户可见">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isShow"
                                              active-color="#13ce66"
                                              @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isShowAtList" label="是否在列表显示">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isShowAtList"
                                              active-color="#13ce66"
                                              @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isPrinting" label="是否打印">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isPrinting"
                                              active-color="#13ce66"
                                              @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isExport" label="是否导出">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isExport"
                                              active-color="#13ce66"
                                              @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isImport" label="是否导入">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isImport"
                                              active-color="#13ce66"
                                              @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isEmpty" label="是否必填">
                                        <template slot-scope="scope">
                                            <el-switch
                                              v-model="scope.row.isEmpty"
                                              active-color="#13ce66"
                                               @change="dtoChange()"
                                              inactive-color="#cccccc">
                                            </el-switch>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="validateRegular" label="认证方式">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.validateRegular"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="errorMessageKey" label="验证提示">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.errorMessageKey"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="showFormat" label="显示格式">
                                        <template slot-scope="scope">
                                            <input class="input-need"
                                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']"
                                            v-model="scope.row.showFormat"
                                            @change="dtoChange()"
                                            type="text"/>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        </div>
                    </div>
                    </el-col>
                </el-row>
                <span slot="footer">
                    <button class="transfer_footer_btn orange" @click="DTOsave">保 存</button>
                    <button class="transfer_footer_btn transfer_confirm" @click="DTOConfirm">确 认</button>
                    <button class="transfer_footer_btn" @click="DTOdialog = false">取 消</button>
                </span>
            </el-dialog>
        <el-dialog :visible.sync="dialogTableVisible" title="分配功能" class="transfer_dialog">
                <el-col :span="24">
                    <el-col :span="6">
                        <el-col :span="24" class="transfer_fixed">
                            <vue-scroll :ops="$store.state.option">
                                <el-tree
                                    :highlight-current="true"
                                    :data="componyTree"
                                    :props="defaultProps"
                                    node-key="id"
                                    default-expand-all
                                    @node-click="nodeClick"
                                    :render-content="renderContent_componyTree"
                                    :expand-on-click-node="false">
                                </el-tree>
                            </vue-scroll>
                        </el-col>
                    </el-col>
                    <el-col :span="18">
                        <el-col :span="11" class="transfer_warapper">
                            <el-col :span="24" class="transfer_header">
                                <span>已选</span>
                                <div class="transfer_search" @keyup.enter="searchLeftTable">
                                    <el-input
                                        placeholder="搜索..."
                                        v-model="searchTableLeft"
                                        class="search_input"
                                        >
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
                            </el-col>
                            <el-col :span="24" class="transfer_table">
                                <el-table
                                border
                                style="width: 100%"
                                stripe
                                max-height="450"
                                    @selection-change="leftFn_change"
                                :data="checkTable"
                                ref="roleTableLeft">
                                    <el-table-column type="selection"></el-table-column>
                                    <el-table-column prop="displayName" label="功能"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-col>
                        <el-col :span="2" class="transfer_btns">
                            <el-col :span="24" class="transfer_btn_wrapper">
                                <el-button class="el_transfer" :disabled="is_Fn_nocheked" @click="noCheck_push_check_Fn" type="primary" icon="el-icon-arrow-left" round></el-button>
                                <el-button class="el_transfer" :disabled="is_Fn_cheked" @click="check_push_noCheck_Fn" type="primary" icon="el-icon-arrow-right" round></el-button>
                            </el-col>
                        </el-col>
                        <el-col :span="11" class="transfer_warapper">
                            <el-col :span="24" class="transfer_header">
                                <span>可选</span>
                                <div class="transfer_search" @keyup.enter="searchRightTable">
                                    <el-input
                                        placeholder="搜索..."
                                        v-model="searchTableRight"
                                        class="search_input"
                                        >
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
                            </el-col>
                            <el-col :span="24" class="transfer_table">
                                <el-table
                                border
                                max-height="450"
                                :data="nocheckTable"
                                style="width: 100%"
                                stripe
                                @selection-change="rightFn_change"
                                ref="roleTabRight">
                                    <el-table-column type="selection"></el-table-column>
                                    <el-table-column prop="displayName" label="功能"></el-table-column>
                                </el-table>

                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>
                <span slot="footer">
                    <button class="transfer_footer_btn transfer_confirm" @click="permissionsConfirms">确 认</button>
                    <button class="transfer_footer_btn" @click="dialogTableVisible = false">取 消</button>
                </span>
            </el-dialog>
            <!--dialog结束  -->
            <dialogBox @dialogColse="dialogUserConfirm = false" :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogUserConfirm" :dialogCommand="dialogCommand" @dialogClick="sureDoing"></dialogBox>

    </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
import Tree from '../../base/tree/tree'
  export default({
    data(){
        return{
            errorTips:{message:'',detail:''},
            dialogSetting:{message:'确定取消？',dialogName:'isBack',dialogType:'confirm'},//dialog组件
            dialogCommand:[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}],//dialog组件
            firstModify:false,
            secondModify:false,
            thirdModify:false,
            ifModify:false,
            searchTableLeft:'',//搜索
            searchTableRight:'',//搜索
            dialogUserConfirm:false,//信息更改提示控制
             search:'',
            dialogTableVisible:false,//控制对话框
            addData:{
                // "moduleParentId": 0,
                // "moduleCode": "string",
                // "moduleName": "仓库管理",
                // "url": "string",
                // "ico": "string",
                // "systemId": 0,
                // "moduleIsBottom": true,
                // "moduleFullPathId": "string",
                // "moduleFullPathName": "string",
                // "seq": 0
            },
            componyTree:[],
            defaultProps: {
                children: 'no',
                label: 'displayName',
                value:'permissionName'
            },
            item:{
                id:"",
                moduleName:""
            },
            item_area_no:{
                id:0,
                ouName:' '
                },
            selectTree:[
            ],
            selectProps: {
                children: 'childNodes',
                label: 'moduleName',
                id:'id',
            },
            treeData:[],
            Props: {
                children: 'childNodes',
                value: 'id',
                label:'moduleName'
            },
            selectData:{//select数据
                Status001:[],//启用状态
                menu:[],//菜单
                systemId:[],//子系统
                language:[],
            },
//--------------DTOdialog----------------
            language:'',//语言
            haveLanguage:false,//判断语言是否为空，语言为空时无法保存tabs内容，使其无法编辑
            haveTwoData:false,//上移下移是否显示
            treeQuery:'',//DTO树形搜索框model
            DTO_checkData:[],//选中的DTO
            DTO_confirm:{},//点击树形，纪录当前点击的树形数据。点击确认按钮添加进DTO_checkData
            dialogDTO_treeClickData:{},//DTO树形点击生成的数据缓存
            DTO_tabs:[],//渲染的标签页数据
            click_DTO_name:'',//当前点击树节点的name
            click_tabs_name:'',//当前树节点下tabs的name
            DTO_tree:[],//DTO树形渲染数据
            DTOdialog:false,
            activeName_first:'0',//激活高亮的tab
            DTO_selectData:[],//复选框选中数据
            DTO_tableData:[],//表格数据
            moveBtnShow:true,//前移后移按钮是否disable
            canClick:false,//是否可以点击，需要选中数据退出动画队列
            btDisable:true,
            DTO_load:false,
            DTO_defaultProps:{
                children: 'chlidren',
                label: 'dtoShowName',
                value:'dtoName'
            },
//--------------dialog----------------
            moduleDtoItemDtos_init:null,//初始化选择的DTO
            permissionConfirm:[],//渲染的选中权限
            checked:[],//展示所有权限
            CancelChecked:[],//dialog取消按钮存储数据
            nochecked:[],//
            allNode:[],
            storeNodeClickData:[],//储存点击节点的所有数据{all:[],check:[],nochecked:[]}
            nowClickNode:'',//记录点击的树节点
            checkTable:[],//页面渲染的数据
            nocheckTable:[],//页面渲染的数据

            is_Fn_nocheked:true,//穿梭框按钮显示隐藏
            is_Fn_cheked:true,

            left_selectFn:[],//checkbox选中数据
            right_selectFn:[],
            expand:{
                expandId_moduleParentId:[],//默认上级菜单树形展开id
                expandId_Fn:[],//默认分配功能树形展开id
            },
            auditInformation:{//审计信息
                createdBy:"",
                createdTime:"",
                modifiedBy:"",
                modifiedTime:"",
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
             }],
            isSave:false,//是否可以保存
        }
    },
    validators: {
      'addData.moduleCode': function (value) {//菜单编码
         return this.Validator.value(value).required().maxLength(50)
      },
      'addData.moduleName': function (value) {//菜单名称
         return this.Validator.value(value).required().maxLength(50);
      },
      'addData.status': function (value) {//
         return this.Validator.value(value).required().integer();
      },
      'addData.ico': function (value) {//图标
         return this.Validator.value(value).maxLength(200);
      },
      'addData.systemId': function (value) {//子系统
         return this.Validator.value(value).required().integer();
      },
      'addData.moduleParentId': function (value) {//上级菜单
          return this.Validator.value(value).integer();
      },
      'addData.url': function (value) {//路由地址
         return this.Validator.value(value).required().maxLength(1000);
      },
      'addData.remark': function (value) {//
         return this.Validator.value(value).maxLength(200);
      },
      'addData.seq': function (value) {//排序
         return this.Validator.value(value).integer().custom(function () {
            if (value<0) {
                return '必须是正整数'
            }
        });
      },
      'checked': function (value) {//
            return this.Validator.value(value).custom(function () {
                if (value.length<1) {
                   return '必选'
                }
            });
        },
    },
    created:function(){
        let _this=this;
            _this.getSelectData();
            _this.loadTree();
            _this.loadParent();
            _this.getData();
        //    _this.getDTOtree();
    },
     watch: {
      treeQuery(val){
        let _this=this;
        if(val!=''){
            _this.$axios.gets('/api/services/app/ModuleDtoItem/GetAllDto',{name:val})
            .then(function(res){
                _this.DTO_tree=res.result
                if(_this.DTO_tree.length>0){//默认展开第一个节点
                    _this.expand.expandId_DTO=[_this.DTO_tree[0].dtoName]
                }
            })
        }else{
            _this.DTO_tree=[]
        }
      },
      DTO_tableData(val){
         if(val.length<2){
             this.haveTwoData=false
         }else{
             this.haveTwoData=true
         }
      },
      language(val){
         if(val!=''){
            this.haveLanguage=true
         }else{
            this.haveLanguage=false
         }
      },
      search(val) {
        this.$refs.tree.filter(val);
      },
      moveBtnShow(val){
          if(this.canClick){
              this.btDisable=this.canClick
          }else{
              this.btDisable=val
          }
      },
      canClick(val){
          this.btDisable=this.canClick
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
      checked:{
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
        DTO_checkData:{
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
     },
    methods:{
        btnClick(btn){//按钮组点击事件
        let self = this;
        if(btn=="返回"){//
            self.isBack();
        }else if(btn=="新增"){//
            self.newAdd()
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
        getData(){
            let _this=this;
             _this.$axios.gets('/api/services/app/ModuleManagement/Get',{id:_this.$route.params.id})
            .then(function(res){
                if(res.result.permissionDtos!=null&&res.result.permissionDtos.length>0){//关联权限
                    _this.checked=res.result.permissionDtos;
                    _this.permissionConfirm=_this.checked
                    _this.CancelChecked=res.result.permissionDtos;
                }else{
                    _this.checked=[]
                    _this.permissionConfirm=[]
                    _this.CancelChecked=[]
                }
                if(res.result.moduleDtoItemDtos!=null){//DTO自定义配置
                    _this.DTO_checkData=[res.result.moduleDtoItemDtos];
                    _this.moduleDtoItemDtos_init=_this.deepCopy(res.result.moduleDtoItemDtos)
                }else{
                    _this.DTO_checkData=[]
                    _this.moduleDtoItemDtos_init=null
                }
                _this.addData={
                    "id": res.result.id,
                    "moduleParentId": res.result.moduleParentId,
                    "moduleCode": res.result.moduleCode,
                    "moduleName": res.result.moduleName,
                    "url": res.result.url,
                    "ico": res.result.ico,
                    "systemId": res.result.systemId,
                    "moduleIsBottom": res.result.moduleIsBottom,
                    "moduleFullPathId": res.result.moduleFullPathId,
                    "moduleFullPathName": res.result.moduleFullPathName,
                    "seq": res.result.seq,
                    "remark":res.result.remark,
                    'status':res.result.status
                }
                  _this.auditInformation={//审计信息
                    createdBy:res.result.createdBy,
                    createdTime:res.result.createdTime,
                    modifiedBy:res.result.modifiedBy,
                    modifiedTime:res.result.modifiedTime,
                }
                _this.item.id=res.result.moduleParentId;
                _this.item.moduleName=res.result.moduleParentId_ModuleName;
                _this.loadPermission();
                _this.firstModify=false;
                _this.secondModify=false;
                _this.thirdModify=false;
            },function(res){
            })
        },
        getSelectData(){
            let _this=this;
            _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
            // 启用状态
            _this.selectData.Status001=res.result;
            })
            _this.$axios.gets('/api/services/app/ModuleManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){
            // 菜单
            _this.selectData.menu=res.result.items;
            })
            _this.$axios.gets('/api/services/app/SysSystemManagement/GetAllList').then(function(res){
            // 子系统
            _this.selectData.systemId=res.result;
            })
            _this.$axios.gets('/api/services/app/Language/GetLanguages').then(function(res){
            // 语言
            _this.selectData.language=res.result.items;
            })
        },
         filterNode(value, data) {
            if (!value) return true;
            return data.moduleName.indexOf(value) !== -1;
        },
      loadTree(){
            let _this=this;
            _this.$axios.gets('/api/services/app/ModuleManagement/GetModulesTree',{id:0})
            .then(function(res){
                _this.selectTree=res;
                _this.defauleExpandTree('moduleParentId','expandId_moduleParentId',res,'id','childNodes')
                _this.loadCheckSelect('moduleParentId',_this.addData.moduleParentId);
            },function(res){
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
        defauleExpandTree(model,expandName,response,responseKey,children){
            //model数据模型
            //expandName需要设置的默认展开树形建值_this.expand[expandName]
            //response,树形数据
            //responseKey需要与model匹配的唯一key
            //children，response[children]
            let _this=this;
            let flag=false;
            if(model!=''){//model为树形下拉默认值，即渲染数据。如果存在，递归tree
                $.each(response,function(index,val){
                    if(val[responseKey]==_this.addData[model]){
                        _this.expand[expandName]=[_this.addData[model]]
                        flag=true
                    }else{
                        $.each(val[children],function(index1,val1){
                            if(val1[responseKey]==_this.addData[model]){
                                _this.expand[expandName]=[_this.addData[model]]
                                flag=true
                            }else{
                                _this.defauleExpandTree(model,expandName,val1[children],responseKey,children)
                            }
                        })
                    }
                })
            }
            if(!flag){
                if(typeof(response[0])!='undefined'
                && response[0]!=null
                && typeof(response[0][responseKey])!='undefined'
                && response[0][responseKey]!=null
                && response[0][responseKey]!=''){
                    _this.expand[expandName]=[response[0][responseKey]]
                }
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
         selectNodeClick(data,dialogTableVisible,self){
            let _this=this;
            if(_this.addData.id==data.id){
                alert("上级菜单不能为菜单本身")
            }else{
                _this.item.id=data.id;
                _this.item.moduleName=data.moduleName;
                // _this.$nextTick(function(){
                //     $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').click();
                // })
                $(self.$el).parents('.el-select-dropdown__list').children('.el-select-dropdown__item').each(function(index){
                    if($(this).attr('date')==data.id){
                        $(this).css({
                            top:$(self.$el).offset().top-$(self.$el).parents('.el-select-dropdown__list').offset().top+26,
                        }).click()
                    }
                })
            }
        },
        loadParent(){
            let _this=this;
            _this.$axios.gets('/api/services/app/ModuleManagement/GetModulesTree')
            .then(function(res){
                _this.treeData=res
            },function(res){
            })
        },
        uniqueArray(array1, array2){//求差集
            var result = [];
            for(var i = 0; i < array1.length; i++){
                var item = array1[i];
                var repeat = false;
                for (var j = 0; j < array2.length; j++) {
                    if (array1[i].permissionName == array2[j].permissionName) {//唯一key
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
        loadPermission(){
            let _this=this;
            _this.$axios.gets('/api/services/app/PermissionManagement/GetPermissionTree')
            .then(function(res){
                _this.componyTree=res.items
                _this.nochecked=[]
            if(res.items.length>0){//获取所有的权限子节点，存储起来
                for(let i=0;i<res.items.length;i++){
                    if(res.items[i].children.length>0&&res.items[i].children!=null){
                        for(let x=0;x<res.items[i].children.length;x++){
                           _this.allNode.push(res.items[i].children[x])
                        }
                    }
                }
             }
            if(_this.allNode.length>0){//获取未选中权限
                _this.nochecked=_this.uniqueArray(_this.allNode,_this.checked);
            }else{
                _this.nochecked=_this.allNode
            }
            },function(res){
            })
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
        newAdd(){
            let _this=this;
            _this.$store.state.url='/menu/menuDetail/default';
            _this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
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
        delPage(){
             let _this=this;
            _this.$axios.deletes('/api/services/app/ModuleManagement/Delete',{id:_this.$route.params.id})
            .then(function(res){
                _this.dialogUserConfirm=false;
                _this.open('删除成功','el-icon-circle-check','successERP');
                _this.back();
            },function(res){
                _this.showErMsgDialog(res.error.message,res.error.details)
                // _this.open('删除失败','el-icon-error','faildERP');
            })
        },
        Cancel(){
            this.validation.reset();
            this.getData();
            this.ifModify=false;
        },
        CancelTree(){
            let _this=this;
            _this.dialogTableVisible=false;

            if(_this.allNode.length>0){//获取未选中权限
                _this.nochecked=_this.uniqueArray(_this.allNode,_this.CancelChecked);
                _this.checked=_this.CancelChecked;
                _this.permissionConfirm=_this.checked
            }else{
                _this.nochecked=_this.allNode
            }
            _this.checkTable=[];
            _this.nocheckTable=[];
            _this.storeNodeClickData=[]
        },
        back(){
            this.$store.state.url='/menu/menuList/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        goLanguage(){
            this.$store.state.url='/menu/addLangulage/default'
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
                    let permissions=[];
                    $.each(_this.permissionConfirm,function(index,value){
                        permissions.push(value.permissionName)
                    })
                    _this.addData.permissions=permissions;
                    let moduleDtoItemDtos={}
                    if(_this.DTO_checkData.length>0){
                        let x=_this.DTO_checkData[0]
                         moduleDtoItemDtos={
                            "dtoName": x.dtoName,
                            "systemName":x.systemName,
                            "moduleId": _this.addData.id,
                            "id": x.id
                         }
                    }
                    _this.addData.moduleDtoItemDtos=moduleDtoItemDtos;
                    // _this.addData.permissionDtos=_this.checked;//权限
                    _this.$axios.puts('/api/services/app/ModuleManagement/Update',_this.addData)
                    .then(function(res){
                        if(type=='save'){
                            _this.auditInformation={//审计信息
                                createdBy:res.result.createdBy,
                                createdTime:res.result.createdTime,
                                modifiedBy:res.result.modifiedBy,
                                modifiedTime:res.result.modifiedTime,
                            }
                            _this.ifModify=false;
                        }else if(type=='saveAdd'){
                            _this.newAdd()
                        }
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }
            })
        },
        // showDialog(){
        //     let _this=this;
        //     _this.dialogTableVisible = true;
        //     // _this.loadIcon();
        // },
        permissionsConfirms(){
            let _this=this;
            _this.permissionConfirm=_this.checked
            _this.dialogTableVisible = false;
        },
        rightFn_change(val){
            let _this=this;
            _this.right_selectFn=val;
            if(val.length==0){
                _this.is_Fn_nocheked=true

            }else{
                _this.is_Fn_nocheked=false
            }
        },
        leftFn_change(val){
            let _this=this;
            _this.left_selectFn=val;
            if(val.length==0){
                _this.is_Fn_cheked=true
            }else{
                _this.is_Fn_cheked=false
            }
        },
        noCheck_push_check_Fn(){//从右往左添加数据
            let _this=this;
            _this.storeNodeClickData[_this.nowClickNode].check=_this.right_selectFn.concat(_this.storeNodeClickData[_this.nowClickNode].check)
            _this.storeNodeClickData[_this.nowClickNode].nochecked=_this.uniqueArray(_this.storeNodeClickData[_this.nowClickNode].nochecked,_this.right_selectFn);
            _this.checkTable=_this.storeNodeClickData[_this.nowClickNode].check
            _this.nocheckTable=_this.storeNodeClickData[_this.nowClickNode].nochecked
            _this.checked=_this.right_selectFn.concat(_this.checked);
        },
        check_push_noCheck_Fn(){//从左往右添加数据
            let _this=this;
           _this.storeNodeClickData[_this.nowClickNode].check=_this.uniqueArray(_this.storeNodeClickData[_this.nowClickNode].check,_this.left_selectFn);
            _this.storeNodeClickData[_this.nowClickNode].nochecked=_this.left_selectFn.concat(_this.storeNodeClickData[_this.nowClickNode].nochecked)

            _this.checkTable=_this.storeNodeClickData[_this.nowClickNode].check
            _this.nocheckTable=_this.storeNodeClickData[_this.nowClickNode].nochecked
            _this.checked=_this.uniqueArray(_this.checked,_this.left_selectFn);
        },
        check_push_noCheck_FnThis(val,index){//删除一个关联角色
            let _this=this;
                let json=[val]
                if(_this.storeNodeClickData[val.moduleName]){
                    _this.storeNodeClickData[val.moduleName].check=_this.uniqueArray(_this.storeNodeClickData[_this.nowClickNode].check,json);
                    _this.storeNodeClickData[val.moduleName].nochecked=json.concat(_this.storeNodeClickData[_this.nowClickNode].nochecked)

                    _this.checkTable=_this.storeNodeClickData[_this.nowClickNode].check
                    _this.nocheckTable=_this.storeNodeClickData[_this.nowClickNode].nochecked
                }
                _this.checked=_this.uniqueArray(_this.checked,json);
                _this.permissionConfirm=_this.checked

        },
        nodeClick(data){
            // console.log(data)
            if(data.permissionName==""){
                let _this=this;
                let all=data.children;
                let checkClick=[];
                let nocheckedClick=[];
                _this.nowClickNode=data.displayName;
                if(!_this.storeNodeClickData[data.displayName]){
                    if(_this.checked.length>0){
                        for(let i=0;_this.checked.length>i;i++){
                            for(let x=0;all.length>x;x++){
                                if(_this.checked[i].permissionName==all[x].permissionName){
                                    checkClick.push(all[x])
                                }
                            }
                        }
                        nocheckedClick=_this.uniqueArray(all,checkClick)
                    }else{
                        nocheckedClick=all
                    }

                    _this.storeNodeClickData[data.displayName]={all:all,check:checkClick,nochecked:nocheckedClick}
                }
                _this.checkTable=_this.storeNodeClickData[data.displayName].check;
                _this.nocheckTable=_this.storeNodeClickData[data.displayName].nochecked;
            }
        },
        searchLeftTable(){
            let _this=this;
            // checkTable
            if(_this.nowClickNode!=""){
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft);
                $.each(_this.storeNodeClickData[_this.nowClickNode].check,function(index,val){
                    let str=val.displayName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val)
                    }
                })

                _this.storeNodeClickData[_this.nowClickNode].searchDataCheck=newJson;
                _this.checkTable=_this.storeNodeClickData[_this.nowClickNode].searchDataCheck;
            }

        },
        searchRightTable(){
            let _this=this;
            // nocheckTable
            if(_this.nowClickNode!=""){
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableRight);
                $.each(_this.storeNodeClickData[_this.nowClickNode].nochecked,function(index,val){
                    let str=val.displayName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val)
                    }
                })

                _this.storeNodeClickData[_this.nowClickNode].searchDataNoCheck=newJson;
                _this.nocheckTable=_this.storeNodeClickData[_this.nowClickNode].searchDataNoCheck;
            }
        },
//-------------DTO-----------
        dtoChange(){
            this.isSave=false;
        },
        DTOsave(){
            if(this.language==''){
                this.$message({
                    message: '请先选择语言！',
                    type: 'error'
                });
            }else{
                this.isSave=!this.isSave;
                if(this.isSave){
                    let _this=this;
                    let updateLangueText=[]
                    let updateList=[]
                    $.each(_this.DTO_tableData,function(i,v){
                        if(_this.language!=""){
                        let item={
                            "languageName": _this.language,
                            "sourceName": "HKERP",
                            "key": v.languageKey,
                            "value": v.showName
                        };
                        updateLangueText.push(item)
                        }
                        // let tableItem={
                        //     "id": v.id,
                        //     "isEmpty": v.isEmpty,
                        //     "tableName": v.tableName,
                        //     "fieldName": v.fieldName,
                        //     "validateRegular": v.validateRegular,
                        //     "isImport":v.isImport,
                        //     "isShow": v.isShow,
                        //     "isShowAtList": v.isShowAtList,
                        //     "isPrinting": v.isPrinting,
                        //     "showFormat": v.showFormat,
                        //     "isExport": v.isExport,
                        //     "onlyType": v.onlyType,
                        //     "sort":v.sort,
                        //     "languageKey": v.languageKey
                        //     }
                        //     updateList.push(tableItem)
                    })
                    if(_this.language!=""){
                    $.each(_this.DTO_tabs,function(i,v){
                        let item={
                            "languageName": _this.language,
                            "sourceName": "HKERP",
                            "key": v.dtoName,
                            "value": v.dtoShowName
                        };
                        updateLangueText.push(item)
                    })
                    }
                    let data={updateLangueText:updateLangueText,updateList:_this.DTO_tableData}
                    _this.$axios.posts('/api/services/app/DtoVaildate/BithUpdate',data)
                    .then(function(res){
                            _this.open('保存成功','el-icon-circle-check','successERP');
                    },function(res){
                        _this.showErMsgDialog(res.error.message,res.error.details)
                    })
                }else{
                    this.$message({
                        message: '目前暂无可保存项',
                        type: 'info'
                    });
                    this.isSave=true;
                }
                
            }

           
        },
        getCurrentPageLanguage(){
            let _this=this;
            let language=_this.language;
            let data={}
            let keys=new Array()

            // console.log(language)
            if(language!=''&& _this.DTO_tabs.length>0 && _this.DTO_tableData.length>0 ){
                $.each(_this.DTO_tabs,function(i,v){
                    keys.push(v.dtoName)
                    // [v.dtoName].concat(keys)
                })
                $.each(_this.DTO_tableData,function(i,v){
                    keys.push(v.languageKey)
                    // [v.languageKey].concat(keys)
                })
                // let data={"keys":keys,"cultureInfo":language}
                data.keys=keys;
                data.cultureInfo=language
                // console.log(data)

                _this.$axios.posts('/api/services/app/Localization/GetCurrentLanguageTexts',data)
                .then(function(res){
                    $.each(res.result,function(index,value){
                        $.each(_this.DTO_tabs,function(i,v){
                            if(v.dtoName==value.key){
                                v.dtoShowName=value.value
                            }
                        })
                        $.each(_this.DTO_tableData,function(i,v){
                            if(v.languageKey==value.key){
                                v.showName=value.value
                            }
                        })
                    })
                    _this.DTO_load=false;//loading
                })
            }else{
                _this.DTO_load=false;//loading
            }

        },
        del_DTO(item,index){//删除DTO
            let _this=this;
            _this.DTO_checkData.splice(index,1)
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
        DTOConfirm(){//dtoDialog确认
            let _this=this;
            // console.log(JSON.stringify(_this.DTO_confirm) == "{}")
            if(JSON.stringify(_this.DTO_confirm) != "{}"){
                if(_this.moduleDtoItemDtos_init==null){//如果不存在初始化，id=0，moduleId=菜单id
                    _this.DTO_checkData=[]
                    _this.DTO_checkData.push(_this.DTO_confirm)
                }else{//如果存在，id=初始化id
                    _this.DTO_checkData=[]
                    _this.DTO_checkData[0]={
                        "dtoName": _this.DTO_confirm.dtoName,
                        "dtoShowName":_this.DTO_confirm.dtoShowName,
                        "systemName":_this.DTO_confirm.systemName,
                        "moduleId": _this.moduleDtoItemDtos_init.moduleId,
                        "id":_this.moduleDtoItemDtos_init.id
                    }
                }
            }
            _this.DTOdialog=false
        },
        custormSelect(val){
            let _this=this;
            _this.DTO_selectData=val
            if(val.length>0){
                _this.moveBtnShow=false
            }else{
                _this.moveBtnShow=true
            }
        },
        DTO_nodeClick(data,event){//点击数节点获取标签页数据和初始表格数据，缓存
        // console.log(data)
            let _this=this;
            let dtoName=data.dtoName;
            _this.click_tabs_name='',//tabs的name
            _this.activeName_first='0'
            _this.click_DTO_name=dtoName;//缓存当前点击的树节点name
            _this.DTO_confirm=data
            _this.DTO_tableData=[];//表格数据情空
            // if(typeof(_this.dialogDTO_treeClickData[dtoName])!='object'){
                _this.DTO_load=true;//loading
                // _this.dialogDTO_treeClickData[dtoName]=[]
                _this.$axios.gets('/api/services/app/ModuleDtoItem/GetDtoByName',{DtoName:dtoName})
                .then(function(res){
                    // _this.dialogDTO_treeClickData[dtoName]['DTO_tabs']=res.result
                    // _this.DTO_tabs=_this.dialogDTO_treeClickData[dtoName]['DTO_tabs']
                    _this.DTO_tabs=res.result
                    if(_this.DTO_tabs.length>0){//获取第一个标签页的表格数据
                        let FieldName=_this.DTO_tabs[0].dtoName;
                        _this.click_tabs_name=FieldName
                        // console.log(FieldName)
                        _this.$axios.posts('/api/services/app/DtoVaildate/GetValidateByDtoName',[FieldName])
                        .then(function(resp){
                            // _this.dialogDTO_treeClickData[dtoName][FieldName]=resp.result
                            _this.DTO_tableData=resp.result
                            console.log(resp)
                            _this.$nextTick(function(){
                                let top=$('.dtoWrapper .el-table').height()/2 - $('.dtoWrapper .dtoBtnWrapper').height()/2 + 'px'
                                $('.dtoWrapper .dtoBtnWrapper').css({top:top})
                            })
                            _this.getCurrentPageLanguage()
                            // _this.DTO_tableData=_this.dialogDTO_treeClickData[dtoName][FieldName]

                        })
                    }else{
                        //没有标签页内容
                        _this.DTO_load=false;//loading
                    }
                })
            // }else{
            //     _this.DTO_tabs=_this.dialogDTO_treeClickData[data.dtoName]['DTO_tabs']
            //     if(_this.DTO_tabs.length>0){
            //         let FieldName=_this.DTO_tabs[0].dtoName;
            //         _this.click_tabs_name=FieldName
            //         _this.DTO_tableData=_this.dialogDTO_treeClickData[dtoName][FieldName]
            //     }else{
            //         _this.DTO_tableData=[]
            //     }
            // }
            // console.log(_this.dialogDTO_treeClickData)
        },
        // getDTOtree(){//获取dto树形数据
        //     let _this=this
        //     _this.$axios.gets('/api/services/app/ModuleDtoItem/GetAllDto')
        //     .then(function(res){
        //         // console.log(res)
        //         _this.DTO_tree=res.result
        //         if(_this.DTO_tree.length>0){//默认展开第一个节点
        //             _this.expand.expandId_DTO=[_this.DTO_tree[0].dtoName]
        //         }
        //     })
        // },
        DTO_tabClick(tab, event){//tab标签页点击
           let _this=this;
           let FieldName=tab.$attrs.FieldName
           let dtoName=_this.click_DTO_name;
           if(_this.click_tabs_name!=FieldName){

        //    if(typeof(_this.dialogDTO_treeClickData[dtoName][FieldName])!='object'){
                _this.DTO_load=true;//loading
            //    _this.dialogDTO_treeClickData[dtoName][FieldName]=[]
                _this.$axios.posts('/api/services/app/DtoVaildate/GetValidateByDtoName',[FieldName])
                .then(function(resp){
                    // _this.dialogDTO_treeClickData[dtoName][FieldName]=resp.result
                    _this.DTO_tableData=resp.result
                    _this.$nextTick(function(){
                        let top=$('.dtoWrapper .el-table').height()/2 - $('.dtoWrapper .dtoBtnWrapper').height()/2 + 'px'
                        $('.dtoWrapper .dtoBtnWrapper').css({top:top})
                    })
                    _this.getCurrentPageLanguage()
                    // _this.DTO_load=false;//loading
                })
           }
        //    }else{
        //        _this.DTO_tableData=_this.dialogDTO_treeClickData[dtoName][FieldName]
        //    }
            // console.log(_this.dialogDTO_treeClickData);
        },
        isSelect(item,array,key){
            let _this=this;
            let repeat=false;
            $.each(array,function(index,value){
                // console.log(value[key])
                if(value[key]==item[key]){
                    repeat=true
                }
            })
            return repeat
        },
        movePrev(){//前移
            let _this=this;
            _this.canClick=true;
            let dtoName=_this.click_DTO_name;
            let FieldName=_this.click_tabs_name;
            // let arr=_this.dialogDTO_treeClickData[dtoName][FieldName]
            let arr=_this.DTO_tableData
            let DTO_selectData=_this.DTO_selectData;
            let dto_select=_this.deepCopy(_this.DTO_selectData)
            let flag=false;

            $.each(arr,function(j,value){
                if(j>0){
                   if(_this.isSelect(arr[j],DTO_selectData,'id')&&!_this.isSelect(arr[j-1],DTO_selectData,'id')){
                        flag=true
                        var temp=arr[j-1];
                        arr[j-1]=arr[j];
                        arr[j]=temp;
                   }
                }
            })
            if(flag){//不可移动时
                _this.DTO_tableData=[];
                $.each(arr,function(index,val){
                   val.sort=index
                   _this.DTO_tableData.push(val)
                })
                $.each(_this.DTO_tableData,function(index,val){
                   $.each(dto_select,function(i,v){
                       if(val.id==v.id){
                           setTimeout(function(){
                               _this.$refs.multipleTable.toggleRowSelection(_this.DTO_tableData[index]);
                           },0.0001)
                       }
                   })
                })
            }
            setTimeout(function(){
              _this.canClick=false;
            },200)
        },
        moveNext(){//后移
            let _this=this;
            _this.canClick=true;
            let dtoName=_this.click_DTO_name;
            let FieldName=_this.click_tabs_name;
            // let arr=_this.dialogDTO_treeClickData[dtoName][FieldName]
            let arr=_this.DTO_tableData
            let DTO_selectData=_this.DTO_selectData;
            let dto_select=_this.deepCopy(_this.DTO_selectData)
            let flag=false;
            for(let j=arr.length-1;j>=0;j--){
                if(j<arr.length-1){
                   if(_this.isSelect(arr[j],DTO_selectData,'id')&&!_this.isSelect(arr[j+1],DTO_selectData,'id')){
                        flag=true
                        var temp=arr[j+1];
                        arr[j+1]=arr[j];
                        arr[j]=temp;
                   }
                }
            }
            if(flag){//不可移动时
                _this.DTO_tableData=[];
                $.each(arr,function(index,val){
                   val.sort=index
                   _this.DTO_tableData.push(val)
                })
                $.each(_this.DTO_tableData,function(index,val){
                   $.each(dto_select,function(i,v){
                       if(val.id==v.id){
                           setTimeout(function(){
                               _this.$refs.multipleTable.toggleRowSelection(_this.DTO_tableData[index]);
                           },0.0001)
                       }
                   })
                })
            }
            setTimeout(function(){
              _this.canClick=false;
            },200)
        },
        renderContent_DTO(h, { node, data, store }){
            if(typeof(data.chlidren)!='undefined' && data.chlidren!=null && data.chlidren.length>0){
                return (
                    <span class="el-tree-node__label">
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.dtoShowName}
                    </span>
                );
            }else{
                 return (
                    <span class="el-tree-node__label">
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.dtoShowName}
                    </span>
                );
            }
        },
        renderContent_moduleParentId(h, { node, data, store }){
            if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.moduleName}
                    </span>
                );
            }else{
                 return (
                    <span class="el-tree-node__label" data-id={data.id}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.moduleName}
                    </span>
                );
            }
        },
        renderContent_componyTree(h, { node, data, store }){
            if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                return (
                    <span class="el-tree-node__label" data-id={data.permissionName}>
                    <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                        {data.displayName}
                    </span>
                );
            }else{
                 return (
                    <span class="el-tree-node__label" data-id={data.permissionName}>
                    <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                        {data.displayName}
                    </span>
                );
            }
        },
       },
        components:{
            buttonGroup,
            dialogBox,
            Tree
    }
  })
</script>



<style scoped>
.search_input .el-input__icon {
    line-height: 25px;
}
.dtoWrapper{
   height: 400px;
   position: relative;
}
.dtoBtnWrapper{
    position: absolute;
    z-index: 5;
    top: calc(50% - 31px);
    right: 20px;
}
.menuModify  .errorTips{
    margin-bottom: 10px;
    margin-top: -10px;
}
 .menuModify .getPadding{
      padding: 0 10px;
  }


.dtoMove{
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    width: 55px;
    height: 26px;
    border-radius: 25px;
    background-color: #47d1d1c2;
    font-size: 12px;
}
.dtoMove:first-child{
    margin-bottom: 10px;
}
.dtoMove i{
    font-size: 15px;
}
.dtoMove:disabled{
    background-color: #7e7e7fad;
}


.mt_20{
    margin-top: 20px;
}

.h_35{
    height: 35px    ;
}



 .menuModify .el-row{
    background-color: #fff;
  }
</style>
<style>
.menuModify .el-tree-node__content{
    background-color:#F9F9F9;
}
.menuModify .el-dialog__header{
    overflow: hidden;
    line-height: 33px;
}
.menuModify .DTOselect{
    float: right;
    margin-right:40px;
}
.DTO_dialog .el-dialog{
    width:70%;
}
.DTO_dialog  .el-dialog__footer{
    text-align:center;
}
.DTO_dialog .vue-scroll{
    height: 445px!important;
}
.DTO_dialog .el-dialog__footer{
    padding: 10px 20px 20px;
}
</style>
