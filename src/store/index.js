import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router' //路由
import axiosMethods from '../axios/index.js' //ajax封装
import icon from './icon'
import routes from './routes'
import table from './table'
import DimensionTable from './2DTable'
import Transfer from './transfer'
import ScrollTable from './scrollTable'
import { Message } from 'element-ui'
import { DEEP_CLONE } from '../common/common.js'
Vue.use(vuex);
export default new vuex.Store({
  modules: {
    DimensionTable,
    Transfer,
    ScrollTable
  },
  state: {
    langEn:[],//多语言英文
    lang:'cn',//多语言类型
    icon:icon["icons"],
    routes,
    option: { //滚动条样式
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
        height: '5px',
        pos: 'bottom',
        background: "#9093994d",
      },
      hBar: {
        height: '5px',
        pos: 'bottom',
        background: "#9093994d",
      },
    },
    baseURL: 'http://192.168.100.107:8082', //根路径，导入模板页表格内下载调用
    slidbarHeight: 0,
    closeItem: [], //存储关闭页签
    Alive: true, //页面是否缓存
    alerts: true,
    temporaryLogin: [], //本地暂时存储用户名,tokten
    username: [], //存储session纪录的每条登录账号{'name':key,'accessToken':value} ,用于多账号登录
    name: '', //当前登录用户名
    accessToken: '', //当前登录token
    show: false, //控制slidebar显示隐藏
    fixed: false,
    url: '/', //当前页签
    temporary: [], //本地暂时存储页签
    slidbarData: [], //从localStorage读取页签
    token_freshtime:0,//token刷新时间
    token_fresh_flag:'',//token刷新标志
    tableData: [], //表格数据
    OuId: '', //组织单元ID
    tableName: '', //表格名称
    treeName: '', //树形名称
    // 登录信息
    client_id: 'HKERP2.0',
    client_secret: 'ClientKey',
    grant_type: 'password',
    user_name: '',
    pass_word: '',
    //菜单
    sideBarMenu: [],
    menuLoading: true,
    // 商品类目
    commodityClassHeadingQueryApi: '', //查询接口
    commodityClassHeadingTable: [], //商品类目表格数据
    commodityClassHeadingLoading: true, //表格加载动画
    commodityClassHeadingTreeApi: '', //初始化树型接口
    commodityClassHeadingTreeData: [], //树型数据集合
    commodityClassHeadingTreeLoading: true, //树加载动画
    commodityClassHeadingQueryParams: "", //条件查询参数
    commodityClassHeadingTotalCount: 0, //总条数
    commodityClassHeadingSelection: [], //选中数据集合
    commodityClassHeadingCurrentPage: 1, //当前分页
    commodityClassHeadingTotalPagination: 10, //总页数
    commodityClassHeadingEachPage: 10, //每页显示条数
    //商品品牌
    commodityBrandQueryApi: '', //查询接口
    commodityBrandLoading: true, //表格加载动画
    commodityBrandTable: [], //品牌表格数据
    commodityBrandTableClone: [], //品牌表格数据clone
    commodityBrandQueryParams: "", //条件查询参数
    commodityBrandNewCol: '',
    commodityBrandNewColArray: [], //表格内新增数据集合
    commodityBrandUpdateColArray: [], //表格内修改数据集合
    commodityBrandSelection: [], //选中数据集合
    commodityBrandUpdateRow: '', //修改表格行数据
    commodityBrandUpdateRowId: '', //修改的表格行ID
    commodityBrandCurrentPage: 1,
    commodityBrandTotalPagination: 10, //总页数
    commodityBrandTotalCount: 0, //总条数
    commodityBrandEachPage: 10, //每页显示条数
    commodityBrandDialogVisible: false, //对话框是否显示
    //商品属性
    commodityPropertyofGoodsTreeApi: '', //初始化树型接口
    commodityPropertyofGoodsTreeData: [], //树型数据集合
    commodityPropertyofGoodsQueryApi: '', //查询接口
    commodityPropertyofGoodsTable: [], //品牌表格数据
    commodityPropertyofGoodsTableClone: [], //品牌表格数据clone
    commodityPropertyofGoodsQueryParams: "", //条件查询参数
    commodityPropertyofGoodsNewCol: '',
    commodityPropertyofGoodsNewColArray: [], //表格内新增数据集合
    commodityPropertyofGoodsUpdateColArray: [], //表格内修改数据集合
    commodityPropertyofGoodsSelection: [], //选中数据集合
    commodityPropertyofGoodsUpdateRow: '', //修改表格行数据
    commodityPropertyofGoodsUpdateRowId: '', //修改的表格行ID
    commodityPropertyofGoodsCurrentPage: 1,
    commodityPropertyofGoodsTotalPagination: 10, //总页数
    commodityPropertyofGoodsTotalCount: 0, //总条数
    commodityPropertyofGoodsEachPage: 10, //每页显示条数
    commodityPropertyofGoodsDialogVisible: false, //对话框是否显示
    ceshiSelectedTableLoading: true, //穿梭框已选加载动画
    ceshiOptionalTableLoading: true, //穿梭框已选加载动画
    ceshiSelectedTable: [], // 穿梭框已选数据模型
    ceshiOptionalTable: [], // 穿梭框可选数据模型
    ceshiOptionalTotalCount: '', //穿梭框可选数据总条数
    ceshiTransferOptionalApi: '', // 穿梭框获取可选数据api
    ceshiTransferOptionalParams: '', // 穿梭框可选数据参数
    ceshiTransferSelectedApi: '', // 穿梭框获取已选数据api
    ceshiTransferSelectedParams: '', // 穿梭框已选数据参数
    ceshiSelectedTotalCount: '', //穿梭框已选数据总条数
    commodityBrandQueryApi: '', //查询接口
    commodityBrandLoading: true, //表格加载动画
    commodityBrandTable: [], //品牌表格数据
    //commodityBrandTableClone:[],//品牌表格数据clone
    commodityBrandQueryParams: "", //条件查询参数
    commodityBrandNewCol: '',
    commodityBrandNewColArray: [], //表格内新增数据集合
    commodityBrandUpdateColArray: [], //表格内修改数据集合
    commodityBrandSelection: [], //选中数据集合
    commodityBrandUpdateRow: '', //修改表格行数据
    commodityBrandUpdateRowId: '', //修改的表格行ID
    commodityBrandCurrentPage: 1,
    commodityBrandTotalPagination: 10, //总页数
    commodityBrandTotalCount: 0, //总条数
    commodityBrandEachPage: 10, //每页显示条数
    commodityBrandDialogVisible: false, //对话框是否显示
    // 物流对应
    logisticsCorrespondenceListQueryApi: '', //查询接口
    logisticsCorrespondenceListLoading: true, //表格加载动画
    logisticsCorrespondenceListTable: [], //物流表格数据
    logisticsCorrespondenceListTableClone: [], //品牌表格数据clone
    logisticsCorrespondenceListQueryParams: "", //条件查询参数
    logisticsCorrespondenceListNewCol: '',
    logisticsCorrespondenceListNewColArray: [], //表格内新增数据集合
    logisticsCorrespondenceListUpdateColArray: [], //表格内修改数据集合
    logisticsCorrespondenceListSelection: [], //选中数据集合
    logisticsCorrespondenceListUpdateRow: '', //修改表格行数据
    logisticsCorrespondenceListUpdateRowId: '', //修改的表格行ID
    logisticsCorrespondenceListCurrentPage: 1,
    logisticsCorrespondenceListTotalPagination: 10, //总页数
    logisticsCorrespondenceListTotalCount: 0, //总条数
    logisticsCorrespondenceListEachPage: 10, //每页显示条数
    logisticsCorrespondenceListDialogVisible: false, //对话框是否显示
    logisticsCorrespondenceListTreeApi: '', //初始化树型接口
    logisticsCorrespondenceListTreeData: [], //树型数据集合
    logisticsCorrespondenceListTreeLoading: true, //树加载动画
    // 电子面单接口
    electronicSurfaceInterfaceListQueryApi: '', //查询接口
    electronicSurfaceInterfaceListLoading: true, //表格加载动画
    electronicSurfaceInterfaceListTable: [], //表格数据
    //logisticsCorresTableClone:[],//品牌表格数据clone
    electronicSurfaceInterfaceListQueryParams: "", //条件查询参数
    electronicSurfaceInterfaceListNewCol: '',
    electronicSurfaceInterfaceListNewColArray: [], //表格内新增数据集合
    electronicSurfaceInterfaceListUpdateColArray: [], //表格内修改数据集合
    electronicSurfaceInterfaceListSelection: [], //选中数据集合
    electronicSurfaceInterfaceListUpdateRow: '', //修改表格行数据
    electronicSurfaceInterfaceListUpdateRowId: '', //修改的表格行ID
    electronicSurfaceInterfaceListCurrentPage: 1,
    electronicSurfaceInterfaceListTotalPagination: 10, //总页数
    electronicSurfaceInterfaceListTotalCount: 0, //总条数
    electronicSurfaceInterfaceListEachPage: 10, //每页显示条数
    electronicSurfaceInterfaceListDialogVisible: false, //对话框是否显示
    commodityBrandQueryApi: '', //查询接口
    commodityBrandLoading: true, //表格加载动画
    commodityBrandTable: [], //品牌表格数据
    commodityBrandTableClone: [], //品牌表格数据clone
    commodityBrandQueryParams: "", //条件查询参数
    commodityBrandNewCol: '',
    commodityBrandNewColArray: [], //表格内新增数据集合
    commodityBrandUpdateColArray: [], //表格内修改数据集合
    commodityBrandSelection: [], //选中数据集合
    commodityBrandUpdateRow: '', //修改表格行数据
    commodityBrandUpdateRowId: '', //修改的表格行ID
    commodityBrandCurrentPage: 1,
    commodityBrandTotalPagination: 10, //总页数
    commodityBrandTotalCount: 0, //总条数
    commodityBrandEachPage: 10, //每页显示条数
    commodityBrandDialogVisible: false, //对话框是否显示
    //商品规格
    specificationOfGoodsTreeApi: '', //初始化树型接口
    specificationOfGoodsTreeData: [], //树型数据集合
    specificationOfGoodsLoading: true, //表格加载动画
    specificationOfGoodsQueryApi: '', //查询接口
    specificationOfGoodsTable: [], //品牌表格数据
    specificationOfGoodsTableClone: [], //品牌表格数据clone
    specificationOfGoodsQueryParams: "", //条件查询参数
    specificationOfGoodsNewCol: '',
    specificationOfGoodsNewColArray: [], //表格内新增数据集合
    specificationOfGoodsUpdateColArray: [], //表格内修改数据集合
    specificationOfGoodsSelection: [], //选中数据集合
    specificationOfGoodsUpdateRow: '', //修改表格行数据
    specificationOfGoodsUpdateRowId: '', //修改的表格行ID
    specificationOfGoodsCurrentPage: 1,
    specificationOfGoodsTotalPagination: 10, //总页数
    specificationOfGoodsTotalCount: 0, //总条数
    specificationOfGoodsEachPage: 10, //每页显示条数
    specificationOfGoodsDialogVisible: false, //对话框是否显示
    //货币资料
    //currencyListQueryApi:'',//查询接口
    currencyListTable: [], //品牌表格数据
    currencyListLoading: true, //表格加载动画
    //currencyListTableClone:[],//品牌表格数据clone
    //currencyListQueryParams:"",//条件查询参数
    currencyListNewCol: '',
    currencyListNewColArray: [], //表格内新增数据集合
    currencyListUpdateColArray: [], //表格内修改数据集合
    currencyListSelection: [], //选中数据集合
    currencyListUpdateRow: '', //修改表格行数据
    currencyListUpdateRowId: '', //修改的表格行ID
    currencyListCurrentPage: 1,
    currencyListTotalPagination: 10, //总页数
    currencyListTotalCount: 0, //总条数
    currencyListEachPage: 10, //每页显示条数
    currencyListDialogVisible: false, //对话框是否显示
    //系统字典
    //dictionaryListQueryApi:'',//查询接口
    dictionaryListTreeData: [], //树型数据集合
    dictionaryListTable: [], //品牌表格数据
    dictionaryListLoading: true, //表格加载动画
    //dictionaryListTableClone:[],//品牌表格数据clone
    //dictionaryListQueryParams:"",//条件查询参数
    dictionaryListNewCol: '',
    dictionaryListNewColArray: [], //表格内新增数据集合
    dictionaryListUpdateColArray: [], //表格内修改数据集合
    dictionaryListSelection: [], //选中数据集合
    dictionaryListUpdateRow: '', //修改表格行数据
    dictionaryListUpdateRowId: '', //修改的表格行ID
    dictionaryListCurrentPage: 1,
    dictionaryListTotalPagination: 10, //总页数
    dictionaryListTotalCount: 0, //总条数
    dictionaryListEachPage: 10, //每页显示条数
    dictionaryListDialogVisible: false, //对话框是否显示
    //仓库
    repositoryListQueryApi: '', //查询接口
    repositoryListTable: [], //品牌表格数据
    repositoryListLoading: true, //表格加载动画
    repositoryListTableClone: [], //品牌表格数据clone
    repositoryListQueryParams: "", //条件查询参数
    repositoryListNewCol: '',
    repositoryListNewColArray: [], //表格内新增数据集合
    repositoryListUpdateColArray: [], //表格内修改数据集合
    repositoryListSelection: [], //选中数据集合
    repositoryListUpdateRow: '', //修改表格行数据
    repositoryListUpdateRowId: '', //修改的表格行ID
    repositoryListCurrentPage: 1,
    repositoryListTotalPagination: 10, //总页数
    repositoryListTotalCount: 0, //总条数
    repositoryListEachPage: 10, //每页显示条数
    repositoryListDialogVisible: false, //对话框是否显示
    //部门资料
    departmentListQueryApi: '', //查询接口
    departmentListTable: [], //品牌表格数据
    departmentListLoading: true, //表格加载动画
    departmentListTreeApi: '', //初始化树型接口
    departmentListTreeData: [], //树型数据集合
    QueryParams: "", //条件查询参数
    departmentListTableClone: [], //品牌表格数据clone
    departmentListQueryParams: "", //条件查询参数
    departmentListNewCol: '',
    departmentListNewColArray: [], //表格内新增数据集合
    departmentListUpdateColArray: [], //表格内修改数据集合
    departmentListSelection: [], //选中数据集合
    departmentListUpdateRow: '', //修改表格行数据
    departmentListUpdateRowId: '', //修改的表格行ID
    departmentListCurrentPage: 1,
    departmentListTotalPagination: 10, //总页数
    departmentListTotalCount: 0, //总条数
    departmentListEachPage: 10, //每页显示条数
    departmentListDialogVisible: false, //对话框是否显示

    //仓库资料列表演示
    storeHouseHttpApi: '', //接口
    storeHouseParams: '',
    storeHoseQueryParams: '', //查询参数
    storeHouseTable: [], //商品类目表格数据
    storeHouseLoading: true, //表格加载动画
    storeHouseTotalCount: 0, //总条数
    storeHouseSelection: [], //选中数据集合
    storeHouseCurrentPage: 1, //当前分页
    storeHouseTotalPagination: 10, //总页数
    storeHouseEachPage: 10, //每页显示条数
    //仓库资料详情
    storeHouseModifyHttpApi: '',
    storeHouseModifyHttpParams: '',
    storeHouseModifyTable: [], //商品类目表格数据
    storeHouseModifyLoading: true, //表格加载动画
    storeHouseModifySelection: [], //选中数据集合
    storeHouseModifySelection: [], //选中数据集合
    storeHouseModifyNewColArray: [], //表格内新增数据集合
    storeHouseModifyUpdateColArray: [], //表格内修改数据集合
    storeHouseModifyUpdateRow: '', //修改表格行数据
    storeHouseModifyUpdateRowId: '', //修改的表格行ID

    queryparams: {},
    tableLoading: true,
    totalPage: 10, //总页数
    eachPage: 10, //每页显示条数
    httpApi: '',
    //客户分类
    customerClassListQueryApi: '', //查询接口
    customerClassListTreeData: [], //树型数据集合
    customerClassListTable: [], //客户分类表格数据
    customerClassListLoading: true, //表格加载动画
    customerClassListCurrentPage: 1, //当前分页
    customerClassListTotalPagination: 10, //总页数
    customerClassListTotalCount: 0, //总条数
    customerClassListEachPage: 10, //每页显示条数
    customerClassListQueryParams: "", //条件查询参数
    customerClassListTreeApi: '', //初始化树型接口
    customerClassListSelection: [], //选中数据集合
    //用户组
    userGroupListQueryApi: '', //查询接口
    userGroupListTable: [], //用户组表格数据
    userGroupListLoading: true, //表格加载动画
    userGroupListTreeApi: '', //初始化树型接口
    userGroupListTreeData: [], //树型数据集合
    userGroupListQueryParams: "", //条件查询参数
    userGroupListTotalCount: 0, //总条数
    userGroupListSelection: [], //选中数据集合
    userGroupListCurrentPage: 1, //当前分页
    userGroupListTotalPagination: 10, //总页数
    userGroupListEachPage: 10, //每页显示条数
    //用户资料
    userListQueryApi: '', //查询接口
    userListTable: [], //用户资料表格数据
    userListLoading: true, //表格加载动画
    userListTreeApi: '', //初始化树型接口
    userListTreeData: [], //树型数据集合
    userListQueryParams: "", //条件查询参数
    userListTotalCount: 0, //总条数
    userListSelection: [], //选中数据集合
    userListCurrentPage: 1, //当前分页
    userListTotalPagination: 10, //总页数
    userListEachPage: 10, //每页显示条数
    //业务地区

    businessAreaListQueryApi: '', //查询接口
    businessAreaListTable: [], //业务地区表格数据
    businessAreaListLoading: true, //表格加载动画
    businessAreaListTreeApi: '', //初始化树型接口
    businessAreaListTreeData: [], //树型数据集合
    businessAreaListQueryParams: "", //条件查询参数
    businessAreaListTotalCount: 0, //总条数
    businessAreaListSelection: [], //选中数据集合
    businessAreaListCurrentPage: 1, //当前分页
    businessAreaListTotalPagination: 10, //总页数
    businessAreaListEachPage: 10, //每页显示条数
    //组织管理
    OuManageListQueryApi: '', //查询接口
    OuManageListTable: [], //组织管理表格数据
    OuManageListLoading: true, //表格加载动画
    OuManageListTreeApi: '', //初始化树型接口
    OuManageListTreeData: [], //树型数据集合
    OuManageListQueryParams: "", //条件查询参数
    OuManageListTotalCount: 0, //总条数
    OuManageListSelection: [], //选中数据集合
    OuManageListCurrentPage: 1, //当前分页
    OuManageListTotalPagination: 10, //总页数
    OuManageListEachPage: 10, //每页显示条数
    //角色资料
    roleListQueryApi: '', //查询接口
    roleListTable: [], //组织管理表格数据
    roleListLoading: true, //表格加载动画
    roleListTreeApi: '', //初始化树型接口
    roleListTreeData: [], //树型数据集合
    roleListQueryParams: "", //条件查询参数
    roleListTotalCount: 0, //总条数
    roleListSelection: [], //选中数据集合
    roleListCurrentPage: 1, //当前分页
    roleListTotalPagination: 10, //总页数
    roleListEachPage: 10, //每页显示条数
    //菜单管理
    menuListQueryApi: '', //查询接口
    menuListTable: [], //组织管理表格数据
    menuListLoading: true, //表格加载动画
    menuListTreeApi: '', //初始化树型接口
    menuListTreeLoading: true, //初始化树型接口
    menuListTreeData: [], //树型数据集合
    menuListQueryParams: "", //条件查询参数
    menuListTotalCount: 0, //总条数
    menuListSelection: [], //选中数据集合
    menuListCurrentPage: 1, //当前分页
    menuListTotalPagination: 10, //总页数
    menuListEachPage: 10, //每页显示条数


        //店铺资料
        shopListQueryApi: '', //查询接口
        shopListTable: [], //客户分类表格数据
        shopListLoading: true, //表格加载动画
        shopListCurrentPage: 1, //当前分页
        shopListTotalPagination: 10, //总页数
        shopListTotalCount: 0, //总条数
        shopListEachPage: 10, //每页显示条数
        shopListQueryParams: "", //条件查询参数
        shopListSelection: [], //选中数据集合
        //客户资料
        customerListQueryApi: '', //查询接口
        customerListTable: [], //客户分类表格数据
        customerListTable: [], //客户分类表格数据
        customerListCurrentPage: 1, //当前分页
        customerListTotalPagination: 10, //总页数
        customerListTotalCount: 0, //总条数
        customerListEachPage: 10, //每页显示条数
        customerListQueryParams: "", //条件查询参数
        customerListSelection: [], //选中数据集合
        //供应商资料
        supplierListQueryApi: '', //查询接口
        supplierListTable: [], //供应商表格数据
        supplierListLoading: true, //表格加载动画
        supplierListCurrentPage: 1, //当前分页
        supplierListTotalPagination: 10, //总页数
        supplierListTotalCount: 0, //
        supplierListEachPage: 10, //每页显示条数
        supplierListQueryParams: "", //条件查询参数
        supplierListSelection: [], //选中数据集合
      //供应商分类
      supplierClassifyListQueryApi: '', //查询接口
      supplierClassifyListTable: [], //客户分类表格数据
      supplierClassifyListLoading: true, //供应商加载动画
      supplierClassifyListCurrentPage: 1, //当前分页
      supplierClassifyListTotalPagination: 10, //总页数
      supplierClassifyListTotalCount: 0, //ruleCodeList
      supplierClassifyListEachPage: 10, //每页显示条数
      supplierClassifyListQueryParams: "", //条件查询参数
      supplierClassifyListSelection: [], //选中数据集合
      supplierClassifyListTreeApi:'',//初始化树型接口
      supplierClassifyListTreeData:[],//树型数据集合
      supplierClassifyListTreeLoading:true,//树加载动画
        //编码规则
        ruleCodeListQueryApi: '', //查询接口
        ruleCodeListTable: [], //编码规则表格数据
        ruleCodeListLoading: true, //表格加载动画
        ruleCodeListCurrentPage: 1, //当前分页
        ruleCodeListTotalPagination: 10, //总页数
        ruleCodeListTotalCount: 0, //总条数
        ruleCodeListEachPage: 10, //每页显示条数
        ruleCodeListQueryParams: "", //条件查询参数
        ruleCodeListSelection: [], //选中数据集合
        // 商品档案
        goodsFilesListQueryApi: '', //查询接口
        goodsFilesListTable: [], //编码规则表格数据
        goodsFilesListCurrentPage: 1, //当前分页
        goodsFilesListTotalPagination: 10, //总页数
        goodsFilesListTotalCount: 0, //总条数
        goodsFilesListEachPage: 10, //每页显示条数
        goodsFilesListQueryParams: "", //条件查询参数
        goodsFilesListSelection: [], //选中数据集合
        //会员等级
        memberLevelListQueryApi: '', //查询接口
        memberLevelListTable: [], //编码规则表格数据
        memberLevelListCurrentPage: 1, //当前分页
        memberLevelListTotalPagination: 10, //总页数
        memberLevelListTotalCount: 0, //总条数
        memberLevelListEachPage: 10, //每页显示条数
        memberLevelListQueryParams: "", //条件查询参数
        memberLevelListSelection: [], //选中数据集合
        memberLevelListLoading: true, //表格加载动画
        memberLevelListUpdateColArray: [],

    //店铺资料
    shopListQueryApi: '', //查询接口
    shopListTable: [], //客户分类表格数据
    shopListLoading: true, //表格加载动画
    shopListCurrentPage: 1, //当前分页
    shopListTotalPagination: 10, //总页数
    shopListTotalCount: 0, //总条数
    shopListEachPage: 10, //每页显示条数
    shopListQueryParams: "", //条件查询参数
    shopListSelection: [], //选中数据集合
    //客户资料
    customerListQueryApi: '', //查询接口
    customerListTable: [], //客户分类表格数据
    customerListTable: [], //客户分类表格数据
    customerListCurrentPage: 1, //当前分页
    customerListTotalPagination: 10, //总页数
    customerListTotalCount: 0, //总条数
    customerListEachPage: 10, //每页显示条数
    customerListQueryParams: "", //条件查询参数
    customerListSelection: [], //选中数据集合
    //供应商资料
    supplierListQueryApi: '', //查询接口
    supplierListTable: [], //供应商表格数据
    supplierListLoading: true, //表格加载动画
    supplierListCurrentPage: 1, //当前分页
    supplierListTotalPagination: 10, //总页数
    supplierListTotalCount: 0, //
    supplierListEachPage: 10, //每页显示条数
    supplierListQueryParams: "", //条件查询参数
    supplierListSelection: [], //选中数据集合
    //供应商分类
    supplierClassifyListQueryApi: '', //查询接口
    supplierClassifyListTable: [], //客户分类表格数据
    supplierClassifyListLoading: true, //供应商加载动画
    supplierClassifyListCurrentPage: 1, //当前分页
    supplierClassifyListTotalPagination: 10, //总页数
    supplierClassifyListTotalCount: 0, //ruleCodeList
    supplierClassifyListEachPage: 10, //每页显示条数
    supplierClassifyListQueryParams: "", //条件查询参数
    supplierClassifyListSelection: [], //选中数据集合
    //编码规则
    ruleCodeListQueryApi: '', //查询接口
    ruleCodeListTable: [], //编码规则表格数据
    ruleCodeListLoading: true, //表格加载动画
    ruleCodeListCurrentPage: 1, //当前分页
    ruleCodeListTotalPagination: 10, //总页数
    ruleCodeListTotalCount: 0, //总条数
    ruleCodeListEachPage: 10, //每页显示条数
    ruleCodeListQueryParams: "", //条件查询参数
    ruleCodeListSelection: [], //选中数据集合
    // 商品档案
    goodsFilesListQueryApi: '', //查询接口
    goodsFilesListTable: [], //编码规则表格数据
    goodsFilesListCurrentPage: 1, //当前分页
    goodsFilesListTotalPagination: 10, //总页数
    goodsFilesListTotalCount: 0, //总条数
    goodsFilesListEachPage: 10, //每页显示条数
    goodsFilesListQueryParams: "", //条件查询参数
    goodsFilesListSelection: [], //选中数据集合
    //会员等级
    memberLevelListQueryApi: '', //查询接口
    memberLevelListTable: [], //编码规则表格数据
    memberLevelListCurrentPage: 1, //当前分页
    memberLevelListTotalPagination: 10, //总页数
    memberLevelListTotalCount: 0, //总条数
    memberLevelListEachPage: 10, //每页显示条数
    memberLevelListQueryParams: "", //条件查询参数
    memberLevelListSelection: [], //选中数据集合
    memberLevelListLoading: true, //表格加载动画
    memberLevelListUpdateColArray: [],


    //网店资料
    onlineStoreListQueryApi: '', //查询接口
    onlineStoreListTreeApi: '', //初始化树型接口
    onlineStoreListTreeData: [], //树型数据集合
    onlineStoreListTable: [], //网店资料表格数据
    onlineStoreListTableClone: [], //网店资料表格数据clone
    onlineStoreListQueryParams: "", //条件查询参数
    onlineStoreListNewCol: '',
    onlineStoreListNewColArray: [], //表格内修改数据集合
    onlineStoreListSelection: [], //选中数据集合
    onlineStoreListUpdateRow: '', //修改表格行数据
    onlineStoreListUpdateRowId: '', //修改的表格行Id
    onlineStoreListLoading: true, //表格加载动画
    onlineStoreListCurrentPage: 1, //当前分页
    onlineStoreListTotalPagination: 10, //总页数
    onlineStoreListTotalCount: 0, //总条数
    onlineStoreListEachPage: 10, //每页显示条数
    onlineStoreListDialogVisible: false, //对话框是否显示



        //会员等级渠道弹框列表
        qudaoDialogListQueryApi: '', //查询接口
        qudaoDialogListTable: [], //表格数据
        qudaoDialogListCurrentPage: 1, //当前分页
        qudaoDialogListTotalPagination: 5, //总页数
        qudaoDialogListTotalCount: 0, //总条数
        qudaoDialogListEachPage: 5, //每页显示条数
        qudaoDialogListQueryParams: "", //条件查询参数
        qudaoDialogListSelection: [], //选中数据集合
        qudaoDialogListUpdateColArray: [],
        qudaoDialogListLoading: true,

        //卡券库
        cardListQueryApi: '', //查询接口
        cardListTable: [], //表格数据
        cardListCurrentPage: 1, //当前分页
        cardListTotalPagination: 10, //总页数
        cardListTotalCount: 0, //总条数
        cardListEachPage: 10, //每页显示条数
        cardListQueryParams: "", //条件查询参数
        cardListSelection: [], //选中数据集合
        cardListLoading: true, //表格加载动画
        cardListUpdateColArray: [],

    //会员等级渠道弹框列表
    qudaoDialogListQueryApi: '', //查询接口
    qudaoDialogListTable: [], //表格数据
    qudaoDialogListCurrentPage: 1, //当前分页
    qudaoDialogListTotalPagination: 5, //总页数
    qudaoDialogListTotalCount: 0, //总条数
    qudaoDialogListEachPage: 5, //每页显示条数
    qudaoDialogListQueryParams: "", //条件查询参数
    qudaoDialogListSelection: [], //选中数据集合
    qudaoDialogListUpdateColArray: [],
    qudaoDialogListLoading: true,


    //卡券库
    cardListQueryApi: '', //查询接口
    cardListTable: [], //表格数据
    cardListCurrentPage: 1, //当前分页
    cardListTotalPagination: 10, //总页数
    cardListTotalCount: 0, //总条数
    cardListEachPage: 10, //每页显示条数
    cardListQueryParams: "", //条件查询参数
    cardListSelection: [], //选中数据集合
    cardListLoading: true, //表格加载动画
    cardListUpdateColArray: [],

    //卡券发送
    cardSendListQueryApi: '', //查询接口
    cardSendListTable: [], //表格数据
    cardSendListCurrentPage: 1, //当前分页
    cardSendListTotalPagination: 10, //总页数
    cardSendListTotalCount: 0, //总条数
    cardSendListEachPage: 10, //每页显示条数
    cardSendListQueryParams: "", //条件查询参数
    cardSendListSelection: [], //选中数据集合
    cardSendListLoading: true, //表格加载动画
    cardSendListUpdateColArray: [],
    //积分记录
    integralRecordListQueryApi: '', //查询接口
    integralRecordListTable: [], //表格数据
    integralRecordListCurrentPage: 1, //当前分页
    integralRecordListTotalPagination: 10, //总页数
    integralRecordListTotalCount: 0, //总条数
    integralRecordListEachPage: 10, //每页显示条数
    integralRecordListQueryParams: "", //条件查询参数
    integralRecordListSelection: [], //选中数据集合
    integralRecordListLoading: true, //表格加载动画

    //多倍积分
    integralFactorListQueryApi: '', //查询接口
    integralFactorListTable: [], //表格数据
    integralFactorListCurrentPage: 1, //当前分页
    integralFactorListTotalPagination: 10, //总页数
    integralFactorListTotalCount: 0, //总条数
    integralFactorListEachPage: 10, //每页显示条数
    integralFactorListQueryParams: "", //条件查询参数
    integralFactorListSelection: [], //选中数据集合
    integralFactorListLoading: true, //表格加载动画

    //注册赠送
    regGiveListQueryApi: '', //查询接口
    regGiveListTable: [], //表格数据
    regGiveListCurrentPage: 1, //当前分页
    regGiveListTotalPagination: 10, //总页数
    regGiveListTotalCount: 0, //总条数
    regGiveListEachPage: 10, //每页显示条数
    regGiveListQueryParams: "", //条件查询参数
    regGiveListSelection: [], //选中数据集合
    regGiveListLoading: true, //表格加载动画

    //消费赠送
    consumeGiveListQueryApi: '', //查询接口
    consumeGiveListTable: [], //表格数据
    consumeGiveListCurrentPage: 1, //当前分页
    consumeGiveListTotalPagination: 10, //总页数
    consumeGiveListTotalCount: 0, //总条数
    consumeGiveListEachPage: 10, //每页显示条数
    consumeGiveListQueryParams: "", //条件查询参数
    consumeGiveListSelection: [], //选中数据集合
    consumeGiveListLoading: true, //表格加载动画

    //充值赠送
    rechargeGiveListQueryApi: '', //查询接口
    rechargeGiveListTable: [], //表格数据
    rechargeGiveListCurrentPage: 1, //当前分页
    rechargeGiveListTotalPagination: 10, //总页数
    rechargeGiveListTotalCount: 0, //总条数
    rechargeGiveListEachPage: 10, //每页显示条数
    rechargeGiveListQueryParams: "", //条件查询参数
    rechargeGiveListSelection: [], //选中数据集合
    rechargeGiveListLoading: true, //表格加载动画

    //升级赠送
    upgradeGiveListQueryApi: '', //查询接口
    upgradeGiveListTable: [], //表格数据
    upgradeGiveListCurrentPage: 1, //当前分页
    upgradeGiveListTotalPagination: 10, //总页数
    upgradeGiveListTotalCount: 0, //总条数
    upgradeGiveListEachPage: 10, //每页显示条数
    upgradeGiveListQueryParams: "", //条件查询参数
    upgradeGiveListSelection: [], //选中数据集合
    upgradeGiveListLoading: true, //表格加载动画

    //推荐赠送
    recoGiveListQueryApi: '', //查询接口
    recoGiveListTable: [], //表格数据
    recoGiveListCurrentPage: 1, //当前分页
    recoGiveListTotalPagination: 10, //总页数
    recoGiveListTotalCount: 0, //总条数
    recoGiveListEachPage: 10, //每页显示条数
    recoGiveListQueryParams: "", //条件查询参数
    recoGiveListSelection: [], //选中数据集合
    recoGiveListLoading: true, //表格加载动画

    //会员自定义属性
    memberAttributesListTreeApi: '', //初始化树型接口
    memberAttributesListTreeData: [], //树型数据集合

    //会员列表
    memberListQueryApi: '', //查询接口
    memberListTable: [], //编码规则表格数据
    memberListCurrentPage: 1, //当前分页
    memberListTotalPagination: 10, //总页数
    memberListTotalCount: 0, //总条数
    memberListEachPage: 10, //每页显示条数
    memberListQueryParams: "", //条件查询参数
    memberListSelection: [], //选中数据集合
    memberListLoading: true, //表格加载动画
    //充值面额
    rechargeDenominationListTreeApi: '', //初始化树型接口
    rechargeDenominationListTreeData: [], //树型数据集合
    //商品对应
    commodityCorrespondenceListQueryApi: '', //查询接口
    commodityCorrespondenceListTable: [], //商品对应表格数据
    commodityCorrespondenceListLoading: true, //表格加载动画
    commodityCorrespondenceListCurrentPage: 1, //当前分页
    commodityCorrespondenceListTotalPagination: 10, //总页数
    commodityCorrespondenceListTotalCount: 0, //总条数
    commodityCorrespondenceListEachPage: 10, //每页显示条数
    commodityCorrespondenceListQueryParams: "", //条件查询参数
    commodityCorrespondenceListNewColArray: [], //表格内新增数据集合
    commodityCorrespondenceListSelection: [], //选中数据集合
    commodityCorrespondenceListUpdateRow: '', //修改表格行数据
    commodityCorrespondenceListUpdateRowId: '', //修改的表格行ID
    commodityCorrespondenceListUpdateColArray: [], //表格内修改数据集合
    // commodityCorrespondenceListShopSelection:[],//选中店铺数据集合
    //订单管理--退货单
    returnNoteListQueryApi: '', //查询接口
    returnNoteListTable: [], //用户资料表格数据
    returnNoteListLoading: true, //表格加载动画
    returnNoteListTreeApi: '', //初始化树型接口
    returnNoteListTreeData: [], //树型数据集合
    returnNoteListQueryParams: "", //条件查询参数
    returnNoteListTotalCount: 0, //总条数
    returnNoteListSelection: [], //选中数据集合
    returnNoteListCurrentPage: 1, //当前分页
    returnNoteListTotalPagination: 10, //总页数
    returnNoteListEachPage: 10, //每页显示条数
    //订单管理--退款单
    refundOrderListQueryApi: '', //查询接口
    refundOrderListTable: [], //用户资料表格数据
    refundOrderListLoading: true, //表格加载动画
    refundOrderListTreeApi: '', //初始化树型接口
    refundOrderListTreeData: [], //树型数据集合
    refundOrderListQueryParams: "", //条件查询参数
    refundOrderListTotalCount: 0, //总条数
    refundOrderListSelection: [], //选中数据集合
    refundOrderListCurrentPage: 1, //当前分页
    refundOrderListTotalPagination: 10, //总页数
    refundOrderListEachPage: 10, //每页显示条数
    //订单管理--销售订单
    salesOrderListQueryApi: '', //查询接口
    salesOrderListTable: [], //组织管理表格数据
    salesOrderListLoading: true, //表格加载动画
    salesOrderListTreeApi: '', //初始化树型接口
    salesOrderListTreeData: [], //树型数据集合
    salesOrderListQueryParams: "", //条件查询参数
    salesOrderListTotalCount: 0, //总条数
    salesOrderListSelection: [], //选中数据集合
    salesOrderListCurrentPage: 1, //当前分页
    salesOrderListTotalPagination: 10, //总页数
    salesOrderListEachPage: 10, //每页显示条数
    // 配货单--拣货单管理

    workorderManageListHttpApi: '', //接口
    workorderManageListParams: '',
    workorderManageListQueryParams: '', //查询参数
    workorderManageListTable: [], //商品类目表格数据
    workorderManageListLoading: true, //表格加载动画
    workorderManageListTotalCount: 0, //总条数
    workorderManageListSelection: [], //选中数据集合
    workorderManageListCurrentPage: 1, //当前分页
    workorderManageListTotalPagination: 10, //总页数
    workorderManageListEachPage: 10, //每页显示条数
    //行政地区
    adminstrAreaListQueryApi: '', //查询接口
    adminstrAreaListTreeData: [], //树型数据集合
    adminstrAreaListTable: [], //行政地区表格数据
    adminstrAreaListLoading: true, //表格加载动画
    adminstrAreaListCurrentPage: 1, //当前分页
    adminstrAreaListTotalPagination: 10, //总页数
    adminstrAreaListTotalCount: 0, //总条数
    adminstrAreaListEachPage: 10, //每页显示条数
    adminstrAreaListQueryParams: "", //条件查询参数
    adminstrAreaListTreeApi: '', //初始化树型接口
    adminstrAreaListSelection: [], //选中数据集合
    //充值记录
    rechargeRecordListQueryApi: '', //查询接口
    rechargeRecordListTable: [], //用户组表格数据
    rechargeRecordListLoading: true, //表格加载动画
    rechargeRecordListQueryParams: "", //条件查询参数
    rechargeRecordListTotalCount: 0, //总条数
    rechargeRecordListSelection: [], //选中数据集合
    rechargeRecordListCurrentPage: 1, //当前分页
    rechargeRecordListTotalPagination: 10, //总页数
    rechargeRecordListEachPage: 10, //每页显示条数

    membershipRechargeListDialogVisible: false, //对话框是否显示
    //兑换策略
    convertibilityStrategyListQueryApi: '', //查询接口
    convertibilityStrategyListTable: [], //表格数据
    convertibilityStrategyListCurrentPage: 1, //当前分页
    convertibilityStrategyListTotalPagination: 10, //总页数
    convertibilityStrategyListTotalCount: 0, //总条数
    convertibilityStrategyListEachPage: 10, //每页显示条数
    convertibilityStrategyListQueryParams: "", //条件查询参数
    convertibilityStrategyListSelection: [], //选中数据集合
    convertibilityStrategyListLoading: true, //表格加载动画

    //兑换记录
    recordExchangeListQueryApi: '', //查询接口
    recordExchangeListTable: [], //用户组表格数据
    recordExchangeListLoading: true, //表格加载动画
    recordExchangeListQueryParams: "", //条件查询参数
    recordExchangeListTotalCount: 0, //总条数
    recordExchangeListSelection: [], //选中数据集合
    recordExchangeListCurrentPage: 1, //当前分页
    recordExchangeListTotalPagination: 10, //总页数
    recordExchangeListEachPage: 10, //每页显示条数
    //运营管理--审核策略
    auditStrategyListQueryApi: '', //查询接口
    auditStrategyListTable: [], //表格数据
    auditStrategyListTableClone: [], //表格数据clone
    auditStrategyListQueryParams: "", //条件查询参数
    auditStrategyListNewCol: '',
    auditStrategyListNewColArray: [], //表格内修改数据集合
    auditStrategyListSelection: [], //选中数据集合
    auditStrategyListUpdateRow: '', //修改表格行数据
    auditStrategyListUpdateRowId: '', //修改的表格行Id
    auditStrategyListLoading: true, //表格加载动画
    auditStrategyListCurrentPage: 1, //当前分页
    auditStrategyListTotalPagination: 10, //总页数
    auditStrategyListTotalCount: 0, //总条数
    auditStrategyListEachPage: 10, //每页显示条数
    auditStrategyListDialogVisible: false, //对话框是否显示
    //运营管理--物流策略
    logisticsStrategyListQueryApi: '', //查询接口
    logisticsStrategyListTable: [], //表格数据
    logisticsStrategyListTableClone: [], //表格数据clone
    logisticsStrategyListQueryParams: "", //条件查询参数
    logisticsStrategyListNewCol: '',
    logisticsStrategyListNewColArray: [], //表格内修改数据集合
    logisticsStrategyListSelection: [], //选中数据集合
    logisticsStrategyListUpdateRow: '', //修改表格行数据
    logisticsStrategyListUpdateRowId: '', //修改的表格行Id
    logisticsStrategyListLoading: true, //表格加载动画
    logisticsStrategyListCurrentPage: 1, //当前分页
    logisticsStrategyListTotalPagination: 10, //总页数
    logisticsStrategyListTotalCount: 0, //总条数
    logisticsStrategyListEachPage: 10, //每页显示条数
    logisticsStrategyListDialogVisible: false, //对话框是否显示
    //配货中心--出货单管理
    shippingOrderManagementListQueryApi: '', //查询接口
    shippingOrderManagementListTable: [], //表格数据
    shippingOrderManagementListTableClone: [], //表格数据clone
    shippingOrderManagementListQueryParams: "", //条件查询参数
    shippingOrderManagementListNewCol: '',
    shippingOrderManagementListNewColArray: [], //表格内修改数据集合
    shippingOrderManagementListSelection: [], //选中数据集合
    shippingOrderManagementListUpdateRow: '', //修改表格行数据
    shippingOrderManagementListUpdateRowId: '', //修改的表格行Id
    shippingOrderManagementListLoading: true, //表格加载动画
    shippingOrderManagementListCurrentPage: 1, //当前分页
    shippingOrderManagementListTotalPagination: 10, //总页数
    shippingOrderManagementListTotalCount: 0, //总条数
    shippingOrderManagementListEachPage: 10, //每页显示条数
    shippingOrderManagementListDialogVisible: false, //对话框是否显示

    // 出货单明细关联数据

    DoRelationDataQueryApi: '', //查询接口
    DoRelationDataLoading: true, //表格加载动画
    DoRelationDataTable: [], //品牌表格数据
    DoRelationDataTableClone: [], //品牌表格数据clone
    DoRelationDataQueryParams: "", //条件查询参数
    DoRelationDataNewCol: '',
    DoRelationDataNewColArray: [], //表格内新增数据集合
    DoRelationDataUpdateColArray: [], //表格内修改数据集合
    DoRelationDataSelection: [], //选中数据集合
    DoRelationDataUpdateRow: '', //修改表格行数据
    DoRelationDataUpdateRowId: '', //修改的表格行ID
    DoRelationDataCurrentPage: 1,
    DoRelationDataTotalPagination: 10, //总页数
    DoRelationDataTotalCount: 0, //总条数
    DoRelationDataEachPage: 10, //每页显示条数
    DoRelationDataDialogVisible: false, //对话框是否显示


    // 订单下载
    orderDownloadListQueryApi: '', //查询接口
    orderDownloadListLoading: true, //表格加载动画
    orderDownloadListTable: [], //表格数据
    orderDownloadListTableClone: [], //品牌表格数据clone
    orderDownloadListQueryParams: "", //条件查询参数
    orderDownloadListNewCol: '',
    orderDownloadListNewColArray: [], //表格内新增数据集合
    orderDownloadListUpdateColArray: [], //表格内修改数据集合
    orderDownloadListSelection: [], //选中数据集合
    orderDownloadListUpdateRow: '', //修改表格行数据
    orderDownloadListUpdateRowId: '', //修改的表格行ID
    orderDownloadListCurrentPage: 1,
    orderDownloadListTotalPagination: 10, //总页数
    orderDownloadListTotalCount: 0, //总条数
    orderDownloadListEachPage: 10, //每页显示条数
    orderDownloadListDialogVisible: false, //对话框是否显示
    orderDownloadListTreeApi: '', //初始化树型接口
    orderDownloadListTreeData: [], //树型数据集合
    orderDownloadListTreeLoading: true, //树加载动画


    // 库存策略
    inventoryStrategyListQueryApi: '', //查询接口
    inventoryStrategyListLoading: true, //表格加载动画
    inventoryStrategyListTable: [], //表格数据
    inventoryStrategyListQueryParams: "", //条件查询参数
    inventoryStrategyListNewCol: '',
    inventoryStrategyListNewColArray: [], //表格内新增数据集合
    inventoryStrategyListUpdateColArray: [], //表格内修改数据集合
    inventoryStrategyListSelection: [], //选中数据集合
    inventoryStrategyListUpdateRow: '', //修改表格行数据
    inventoryStrategyListUpdateRowId: '', //修改的表格行ID
    inventoryStrategyListCurrentPage: 1,
    inventoryStrategyListTotalPagination: 10, //总页数
    inventoryStrategyListTotalCount: 0, //总条数
    inventoryStrategyListEachPage: 10, //每页显示条数
    inventoryStrategyListDialogVisible: false, //对话框是否显示


    // 退货入库
    tabrkthListQueryApi: '', //查询接口
    tabrkthListLoading: true, //表格加载动画
    tabrkthListTable: [], //表格数据
    tabrkthListTableClone: [], //品牌表格数据clone
    tabrkthListQueryParams: "", //条件查询参数
    tabrkthListNewCol: '',
    tabrkthListNewColArray: [], //表格内新增数据集合
    tabrkthListUpdateColArray: [], //表格内修改数据集合
    tabrkthListSelection: [], //选中数据集合
    tabrkthListUpdateRow: '', //修改表格行数据
    tabrkthListUpdateRowId: '', //修改的表格行ID
    tabrkthListCurrentPage: 1,
    tabrkthListTotalPagination: 10, //总页数
    tabrkthListTotalCount: 0, //总条数
    tabrkthListEachPage: 10, //每页显示条数
    tabrkthListDialogVisible: false, //对话框是否显示
    tabrkthListTreeApi: '', //初始化树型接口
    tabrkthListTreeData: [], //树型数据集合
    tabrkthListTreeLoading: true, //树加载动画

    //职员资料
    staffListQueryApi:'',//查询接口
    staffListLoading:true,//表格加载动画
    staffListTable:[],//品牌表格数据
    staffListTableClone:[],//品牌表格数据clone
    staffListQueryParams:"",//条件查询参数
    staffListNewCol:'',
    staffListNewColArray:[],//表格内新增数据集合
    staffListUpdateColArray:[],//表格内修改数据集合
    staffListSelection:[],//选中数据集合
    staffListUpdateRow:'',//修改表格行数据
    staffListUpdateRowId:'',//修改的表格行ID
    staffListCurrentPage:1,
    staffListTotalPagination:10,//总页数
    staffListTotalCount:0,//总条数
    staffListEachPage:10,//每页显示条数
    //语言切换
    languageListQueryApi: '', //查询接口
    languageListTable: [], //组织管理表格数据
    languageListLoading: true, //表格加载动画
    languageListTreeApi: '', //初始化树型接口
    languageListTreeData: [], //树型数据集合
    languageListQueryParams: "", //条件查询参数
    languageListTotalCount: 0, //总条数
    languageListSelection: [], //选中数据集合
    languageListCurrentPage: 1, //当前分页
    languageListTotalPagination: 10, //总页数
    languageListEachPage: 10, //每页显示条数

  },
  mutations: {
    go(state) { //控制slidebar显示隐藏
      state.show = !state.show
    },
    slidbarData(state) {
      if (window.localStorage.getItem('ERP') != '') {
        state.slidbarData = JSON.parse(window.localStorage.getItem('ERP'))
      }
    }, //页签数组
    username(state) {
      if (window.localStorage.getItem('_ERP') != '') {
        state.username = JSON.parse(window.sessionStorage.getItem('_ERP'))
      }
    },
    go1(state) {
      state.fixed = true;
    },
    go2(state) {
      state.fixed = false;
    },
    // 穿梭框模块
    setTransferName(state, data) { //设置穿梭框特定名称
      state.transferName = data;
    },
    setTransferOptionalApi(state, api) { //设置穿梭框可选接口地址
      state[state.transferName + 'TransferOptionalApi'] = api;
    },
    setTransferOptionalParams(state, obj) { //设置穿梭框可选接口参数
      state[state.transferName + 'TransferOptionalParams'] = obj;
    },
    setTransferSelectedApi(state, api) { //设置穿梭框已选接口地址
      state[state.transferName + 'TransferSelectedApi'] = api;
    },
    setTransferSelectedParams(state, obj) { //设置穿梭框已选接口参数
      state[state.transferName + 'TransferSelectedParams'] = obj;
    },
    Init_TransferOptional(state, array) { //设置穿梭框可选表格数据
      state[state.transferName + 'OptionalTable'] = array;
    },
    Init_TransferSelected(state, array) { //设置穿梭框已选表格数据
      state[state.transferName + 'SelectedTable'] = array;
    },

    // 表格模块
    setTableName(state, name) { //对应表格名称
      state.tableName = name;
    },
    setQueryParams(state, params) { //查询请求参数
      state[state.tableName + 'QueryParams'] = params;
    },
    Init_Table(state, data) { //表格数据模型
      state[state.tableName + 'Table'] = data;
    },
    Init_TableClone(state, data) {
      state[state.tableName + 'TableClone'] = data;
    },
    setQueryApi(state, api) { //查询api地址
      state[state.tableName + 'QueryApi'] = api;
    },
    tableLoad_Complete(state, data) { //加载动画
      state[state.tableName + 'Loading'] = data;
    },
    Init_pagination(state, data) { //页码总数
      state[state.tableName + 'TotalPagination'] = data
    },
    Init_TotalCount(state, data) { //总条数
      state[state.tableName + 'TotalCount'] = data
    },
    setCurrentPage(state, page) { //当前页码
      state[state.tableName + 'CurrentPage'] = page;
    },
    setEachPage(state, page) { //设置每页显示条数
      state[state.tableName + 'EachPage'] = page;
    },
    setAddColArray(state, array) { //重置行内新增集合
      state[state.tableName + 'NewColArray'] = array;
    },
    setUpdateColArray(state, array) { //重置行内修改集合
      state[state.tableName + 'UpdateColArray'] = array;
    },
    setTableSelection(state, array) { //设置表格多选集合
      state[state.tableName + 'Selection'] = array;
    },
    add_col(state, data) { //表格行内新增
      state[state.tableName + 'Table'].unshift(data);
      state[state.tableName + 'NewColArray'].unshift(data);
    },
    Add_UpdateArray(state, data) { //行内修改集合
      state[state.tableName + 'UpdateColArray'].push(data);
    },
    get_RowId(state, data) { //行id
      state[state.tableName + 'UpdateRowId'] = data;
    },
    Init_OuId(state, data) {
      state.OuId = data;
    },
    //树形模块
    Init_Tree(state, data) { //树型数据
      state[state.treeName + 'TreeData'] = data;
    },
    setTreeName(state, data) { //设置树形组件数据模型名称
      state.treeName = data;
    },
    setInitTreeApi(state, api) { //初始化树节点接口地址
      state[state.treeName + 'TreeApi'] = api;
    },
    treeLoad_Complete(state, data) { //加载动画
      state[state.tableName + 'TreeLoading'] = data;
    },
    setTreeQueryParams(state, params) { //查询树节点请求参数
      state[state.tableName + 'TreeQueryParams'] = params;
    },

    setDialogVisible(state, boolean) { //设置对话框是否显示
      state[state.tableName + 'DialogVisible'] = boolean;
    },
    Init_userName(state, data) { //登录用户名
      state.user_name = data;
    },
    Init_passWord(state, data) { //登录密码
      state.pass_word = data;
    },
    Init_menu(state, data) { //菜单
      state.sideBarMenu = data;
    },
    menu_loading(state, data) { //菜单加载
      state.menuLoading = data;
    },
    reset_accessToken(state, data) { //token
      state.accessToken = data;
    },
    TOKEN_FRESHTIME(state, data){//TOKEN刷新时间
      state.token_freshtime = data;
    },
    TOKEN_FRESH_FLAG(state, data){//TOKEN刷新标志
      state.token_fresh_flag = data;
    },
    //多语言
    set_lang(state, data) {
      state.lang = data;
    },
    //多语言包
    set_langEn(state, data){
      state.langEn = data;
    }
  },
  actions: {
    userLogin(context, data) { //用户登录
      axiosMethods.instancePosts('/connect/token', data)
        .then(function(res) {
          let flag = false;
          if (context.state.username) {
            context.state.temporaryLogin = context.state.username;
          }
          let temporaryLogin = context.state.temporaryLogin;
          if (temporaryLogin.length == 0) { //temporary为空
            flag = true;
          } else { //temporary不为空
            for (var i = 0; i < temporaryLogin.length; i++) {
              if (temporaryLogin[i].name == 'admin') { //相同用户登录
                flag = false;
                break;
              } else {
                flag = true;
              }
            }
          }
          window.sessionStorage.setItem('Token','Bearer '+res.access_token);
          context.commit('reset_accessToken',res.access_token);
          if(flag){
            let pushItem={'name':'admin','accessToken':'Bearer '+res.access_token};
            temporaryLogin.push(pushItem);
          }
          window.sessionStorage.setItem('_ERP',JSON.stringify(temporaryLogin));
          context.commit('username');
          context.state.alerts=true;
          window.localStorage.removeItem('ERP');
          context.state.url='/home';
          router.push(context.state.url);
          window.sessionStorage.setItem('TOKEN_FRESHTIME',res.expires_in);//刷新时间
          window.sessionStorage.setItem('TOKEN_FRESH_FLAG',res.refresh_token);//刷新标志
          // var TIME=res.expires_in;
          // let REFRESH_TOKEN=res.refresh_token;

        }).catch((err)=>{
        console.log(err);
        Message({
          message:'登录失败，请检查用户名和密码是否正确！',
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    InitMenu(context) { //获取菜单数据
      axios.get('/api/services/app/ModuleManagement/GetModulesTree', { id: 0, sorting: 'seq asc' }).then(function(res) {
        context.commit('Init_menu', res.data);
        context.commit('menu_loading', false);
      })
    },
    InitTable(context) { //表格初始化
      console.log(context)
      axios.get(context.state[context.state.tableName + 'QueryApi'], {
        params: context.state[context.state.tableName + 'QueryParams']
      }).then(function(res) {
        let table = DEEP_CLONE(res.data.result.items);
        context.commit('Init_TableClone', table);
        context.commit('Init_Table', res.data.result.items);
        console.log(res.data.result.items);
        context.commit('tableLoad_Complete', false);
        context.commit('Init_TotalCount', Number(res.data.result.totalCount));
        let totalPage = Math.ceil(res.data.result.totalCount / context.state[context.state.tableName + 'EachPage']);
        context.commit('Init_pagination', totalPage);
      }).catch(function(err) {
        Message({
          message: err.error.message,
          type: 'error',
          duration: 5 * 1000
        })
        context.commit('tableLoad_Complete', false);
      })
    },
    InitTree(context) { //树型初始化
      axios.get(context.state[context.state.treeName + 'TreeApi']).then(function(res) {
        context.commit('Init_Tree', res.data);
        context.commit('treeLoad_Complete', false);
      }).catch(function(err) {
        Message({
          message: "数据加载失败！",
          type: 'error',
          duration: 5 * 1000
        })
      })
    },

    InitOptionalTransfer(context) { //获取穿梭框可选数据
      axios.get(context.state[context.state.transferName + 'TransferOptionalApi'], {
        params: context.state[context.state.transferName + 'TransferOptionalParams']
      }).then(function(res) {
        context.state.ceshiOptionalTotalCount = res.data.result.totalCount; //可选数据总条数
        context.commit('Init_TransferOptional', res.data.result.items); //可选数据
        context.state[context.state.transferName + 'OptionalTableLoading'] = false;
      }).catch(function(err) {
        Message({
          message: "数据加载失败！",
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    InitSelectedTransfer(context) { //获取穿梭框已选数据
      axios.get(context.state[context.state.transferName + 'TransferSelectedApi'], {
        params: context.state[context.state.transferName + 'TransferSelectedParams']
      }).then(function(res) {
        context.state.ceshiSelectedTotalCount = res.data.result.totalCount; //已选数据总条数
        context.commit('Init_TransferSelected', res.data.result.items); //已选数据
        context.state[context.state.transferName + 'SelectedTableLoading'] = false;
      }).catch(function(err) {
        Message({
          message: "数据加载失败！！",
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    addCol(context, item) { //添加行
      //通过参数传递
      context.commit('add_col', item)
    },
    AddUpdateArray(context, updateRow) {
      let repeat = false;
      for (let i in context.state[context.state.tableName + 'UpdateColArray']) {
        if (updateRow.id == context.state[context.state.tableName + 'UpdateColArray'][i].id) {
          repeat = true
        } else {
          repeat = false;
        }
      }
      if (!repeat) {
        context.commit('Add_UpdateArray', updateRow)
      }
    },
    queryTable(context) {

    }
  }
})
