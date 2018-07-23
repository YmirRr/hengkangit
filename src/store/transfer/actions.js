import axios from 'axios'
export default{
    InitOptionalTransfer(context){//获取穿梭框可选数据
        axios.get(context.state[context.state.transferName+'TransferOptionalApi'],{
            params:context.state[context.state.transferName+'TransferOptionalParams']
        }).then(function(res){
            context.state.ceshiOptionalTotalCount=res.data.result.totalCount;//可选数据总条数
            context.commit('Init_TransferOptional',res.data.result.items);//可选数据
            context.state[context.state.transferName+'OptionalTableLoading']=false;
            }).catch(function(err){
                console.log(err)
            })
    },
    InitSelectedTransfer(context){//获取穿梭框已选数据
        axios.get(context.state[context.state.transferName+'TransferSelectedApi'],{
            params:context.state[context.state.transferName+'TransferSelectedParams']
        }).then(function(res){
            context.state.ceshiSelectedTotalCount=res.data.result.totalCount;//已选数据总条数
            context.commit('Init_TransferSelected',res.data.result.items);//已选数据
            context.state[context.state.transferName+'SelectedTableLoading']=false;
            }).catch(function(err){
                console.log(err)
        })
    },
}