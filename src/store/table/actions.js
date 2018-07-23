import axios from 'axios'
export default {
    InitTable(context){//表格初始化
        axios.get(context.state[context.state.tableName+'QueryApi'],{
            params:context.state[context.state.tableName+'QueryParams']
        }).then(function(res){
            context.commit('Init_Table',res.data.result.items);
            console.log(res.data.result.items);
            context.commit('tableLoad_Complete',false);
            context.commit('Init_TotalCount',Number(res.data.result.totalCount));
            let totalPage=Math.ceil(res.data.result.totalCount/context.state[context.state.tableName+'EachPage']);
            context.commit('Init_pagination',totalPage);
            }).catch(function(err){
                console.log(err)
            })
    },
}