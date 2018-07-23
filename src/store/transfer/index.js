import actions from './actions.js';
import mutations from './mutations.js';
const state = {
    transferName: '', //穿梭框名称
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
}
export default {
    state,
    actions,
    mutations
}