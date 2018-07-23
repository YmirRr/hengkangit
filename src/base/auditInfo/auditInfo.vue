<template>
    <el-row :span="22" class="auditInformation getPadding">
            <h4 class="h4 mt5 ml10">审计信息</h4>
            <el-row  class="bg-white pb10">
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">   
                    <div class="bgcolor">
                        <label>创建人</label>
                        <el-input placeholder="" disabled="disabled" v-model="auditInfo.createdBy"></el-input>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                    <div class="bgcolor">
                        <label>创建时间</label>
                        <el-input v-model="auditInfo.createdTime" :disabled="true"></el-input>                      
                        <!-- <el-date-picker  type="date" placeholder="" disabled="disabled" v-model="repositoryData.createdTime"></el-date-picker> -->
                    </div>   
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">  
                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input placeholder="" disabled="disabled" v-model="auditInfo.modifiedBy"></el-input>
                    </div> 
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">   
                    <div class="bgcolor">
                        <label>修改时间</label>
                        <el-input v-model="auditInfo.modifiedTime" :disabled="true"></el-input>                                              
                        <!-- <el-date-picker type="date" placeholder="" disabled="disabled" v-model="repositoryData.modifiedTime"></el-date-picker> -->
                    </div>
                </el-col>
            </el-row>                            
    </el-row>
</template>
<script>
export default {
    props:{
        auditInformation:{
				default:{
                    createdBy:'123',
                    createTime:'',
                    modifiedBy:'wer',
                    modifyTime:'',
                }
		},
    }, 
		data(){
			return{
			}
        },
		created() {
	      console.log(this.auditInformation);
        },
        // watch:{
        //     auditInformation:{
        //         handler:function(val){
        //             this.auditInformation=val
        //         },
        //         deep:true
        //     }
        // },
        computed:{
            auditInfo(){
                return this.auditInformation
            }
        },
	    methods:{
	    	// GetDateTime: function () {
            //     var date = new Date();
            //     var seperator1 = "-";
            //     var seperator2 = ":";
            //     var month = date.getMonth() + 1;
            //     var strDate = date.getDate();
            //     if (month >= 1 && month <= 9) {
            //         month = "0" + month;
            //     }
            //     if (strDate >= 0 && strDate <= 9) {
            //         strDate = "0" + strDate;
            //     }
            //     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            //         + " " + date.getHours() + seperator2 + date.getMinutes()
            //         + seperator2 + date.getSeconds();
            //     return currentdate;
            // }
	    }
}
</script>
<style >
.auditInformation{
    background: #fff;
}
</style>


