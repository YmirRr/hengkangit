export default{
    // 穿梭框模块
    setTransferName(state,data){//设置穿梭框特定名称
        state.transferName=data;
    },
    setTransferOptionalApi(state,api){//设置穿梭框可选接口地址
        state[state.transferName+'TransferOptionalApi']=api;
    },
    setTransferOptionalParams(state,obj){//设置穿梭框可选接口参数
        state[state.transferName+'TransferOptionalParams']=obj;
    },
    setTransferSelectedApi(state,api){//设置穿梭框已选接口地址
        state[state.transferName+'TransferSelectedApi']=api;
    },
    setTransferSelectedParams(state,obj){//设置穿梭框已选接口参数
        state[state.transferName+'TransferSelectedParams']=obj;
    },
    Init_TransferOptional(state,array){//设置穿梭框可选表格数据
        state[state.transferName+'OptionalTable']=array;
    },
    Init_TransferSelected(state,array){//设置穿梭框已选表格数据
        state[state.transferName+'SelectedTable']=array;
    },
}