export default{
    setDimensionName(state,name){//对应表格名称
        state.DimensionName=name;
    },
    Init_Dimension(state,data){//表格数据模型
        state[state.DimensionName+'Dimension']=data;
    },
    EACH_PUSH(state,data){
        state[state.DimensionName+'Dimension'].push(data);
    }
}