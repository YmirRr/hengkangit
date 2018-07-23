<template>
	<el-row class="pl10 pr10" style="margin-top:20px">                
        <el-col :span="6" v-for="item in data" :key="item">
            <el-row>
               <el-col :span="7" >
	                <div class="bgcolor smallBgcolor">
	                    <label><small>{{item.must}}</small>{{item.title}}</label>
	                </div>
	            </el-col>
	            <el-col :span="14" v-if="!item.options">
	                <div class="smallBgcolor">
	                    <el-input :placeholder="item.place"></el-input>
	                </div>
	            </el-col>
	            <el-col :span="14" v-else>
	                <div class="bgcolor smallBgcolor">
	                    <el-select  v-model="item.value" >
	                    <el-option  v-for="(item,index) in item.options" :key="index" :label="item.label" :value="item.value">
	                    </el-option>
	                    </el-select>
	                </div>
	            </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script type="text/javascript">
	export default{
		props:['data']
	}
</script>
<style scoped>
	.smallBgcolor .el-select{
	    width: 100% !important ;
	    margin-left: 10px;
	}
	.bgcolor label{
	    width: 100% !important ;
	    margin-right: 0; 
	}
	.smallBgcolor .el-input--suffix{
	    width: 100% !important ;
	}
	.smallBgcolor .el-input{
	    width: 100% !important ;
	    margin-left: 10px;
	}
	.input-need{
	    outline: none;
	    border:none;
	    width: 100%;
	    height: 28px;
	}
	.bgcolor{
	    overflow:  visible; 
	}
</style>
<style type="text/css">
	.bgcolor{
	    width: 100%; 
	}
</style>