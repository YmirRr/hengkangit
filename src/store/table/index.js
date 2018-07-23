import actions from './actions.js';
import mutations from './mutations.js';
const state={
    commodityBrandQueryApi:'',//查询接口
    commodityBrandLoading:true,//表格加载动画
    commodityBrandTable:[],//品牌表格数据
    commodityBrandTableClone:[],//品牌表格数据clone
    commodityBrandQueryParams:"",//条件查询参数
    commodityBrandNewCol:'',
    commodityBrandNewColArray:[],//表格内新增数据集合
    commodityBrandUpdateColArray:[],//表格内修改数据集合
    commodityBrandSelection:[],//选中数据集合
    commodityBrandUpdateRow:'',//修改表格行数据
    commodityBrandUpdateRowId:'',//修改的表格行ID
    commodityBrandCurrentPage:1,
    commodityBrandTotalPagination:10,//总页数
    commodityBrandTotalCount:0,//总条数
    commodityBrandEachPage:10,//每页显示条数
}
export default{
    state,
    actions,
    mutations
}