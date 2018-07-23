<template>
    <div>
        <table class="el-table__body el-table__footer el-table__header dimension" >
            <thead class="el-table thead">
                <tr>
                    <th><div class="cell"></div></th>
                    <th v-for="item in headList" :key="item"><div class="cell">{{item}}</div></th>
                </tr>
                <tr v-for="item in rowHeaders" :key="item">
                    <td>{{item}}</td>
                    <template v-for='vertical in headList'>
                        <td :key="vertical">
                            <template>
                                <el-input-number @change="handleChange" :step="1" size="small" v-model.number="list[item][vertical]" :min="0"  ></el-input-number>
                            </template>
                        </td>                   
                    </template>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>   
</template>

<script type="text/javascript">
    import Vue from 'vue'
	export default{
        props:['Dimensiondata','DimensionKey','DimensionName'],
		data(){
			return{
                list: {},
                rowHeaders:[],
                headList: [],
			}
		},
		created() {
	      this.$store.commit('setDimensionName',this.DimensionName)//传递具体数据模型名称
        },
        watch:{
            Dimensiondata:{
                handler:function(val,oldVal){
                    this.Dimensiondata=val
                    this.init(this.DimensionKey[0],this.DimensionKey[1],this.DimensionKey[2]);
                },
                deep:true
            }
        },
	    methods:{  
            init: function(colKey, rowKey, valKey) {
				for(var i=0; i<this.Dimensiondata.length; i++){
					var colName=this.Dimensiondata[i][colKey];
					var rowName=this.Dimensiondata[i][rowKey];
					//var colId=this.dataItems[i][Id];
					if(this.headList.indexOf(colName)<0){
						this.headList.push(colName);  //横向表头数组
					}
					if(this.rowHeaders.indexOf(rowName)<0){
						this.rowHeaders.push(rowName); //纵向表头数组
					}
                    if(!this.list[rowName]) 
                    Vue.set(this.list,rowName,{}) 
                    Vue.set(this.list[rowName],colName,{}) 
                    this.list[rowName][colName]=this.Dimensiondata[i][valKey]//对应赋值
				}
				this.headList=this.headList.sort();
                this.rowHeaders=this.rowHeaders.sort();	
            },
            handleChange(){
                this.UPDATE_ARRAY(this.DimensionKey[0],this.DimensionKey[1],this.DimensionKey[2]);
            },
            UPDATE_ARRAY(colKey, rowKey, valKey){
                //let array=[]; 
                this.$store.commit('Init_Dimension',[]);
                 setTimeout(() => {  
                    for(let k in this.list){
                        for(let j in this.list[k])
                        {
                            let item={};
                            item[colKey]=j;
                            item[rowKey]=k;
                            item[valKey]=this.list[k][j];
                            if(typeof(this.list[k][j])!="undefined"){
                                this.$store.commit('EACH_PUSH',item);
                            }
                        }
                    }
                }, 0);    
            },
        }  
	}
</script>
<style scoped>  
.dimension{
    width: 80%;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 5px;
}
.dimension th{
    padding: 8px;
}
.dimension .el-table td{
    border-right: 1px solid #eee;
}
</style>