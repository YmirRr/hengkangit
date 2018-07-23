<template>
	<div id="left-box" style="min-width:275px;width:275px;float:left">    
        <el-row class="bg-white">
            <el-col :span="24">
                <el-row class="h48 pl15">
                    <el-col :span="18">
                        <i class="el-icon-search"></i>
                        <span>查询</span>
                    </el-col>
                    <el-col :span="5">
                        <span class="fs12 open" @click="packUp">+ 收起</span>
                    </el-col>
                </el-row>
                <div style="margin-top:20px">
                    <el-row v-for="item in info.demand" :key="item.place">
                        <el-col :span="8" >
                            <div class="bgcolor smallBgcolor">
                                <label><small>{{item.must}}</small>{{item.title}}</label>
                            </div>
                        </el-col>
                        <el-col :span="14" v-if="!item.options">
                            <div class="smallBgcolor">
                                <el-input :placeholder="item.place" :v-model="item.model"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="14" v-else>
                            <div class="bgcolor smallBgcolor">
                                <el-select  :v-model="item.model" >
                                    <el-option  v-for="itemnode in item.options" :key="itemnode.value" :label="itemnode.label" :value="itemnode.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="8">&nbsp;</el-col>
                    <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                        <span class="search-btn" @click="search"  style="float:left;margin-left:10px;">查询</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
	export default{
        props: ['info'],
        data(){
            return{
                value: '',
                newinfo:null
            }
        },
        created(){
            this.newinfo=this.info
        },
        methods:{
            packUp(){
                let _this=this;
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="none";
                _this.data.up=true;
                this.$emit('listquery', _this.data.up)
            },
            search(){
                this.$emit(this.newinfo);
            }
        },
        created() {
          console.log(this.data)
        },
        
    }
</script>
<style scoped>
    .fs14{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.349019607843137);
    }
    .fs12{
        font-size: 12px;
    }
    .open{
        display: inline-block;
        width: 49px;
        height: 22px;
        line-height: 22px;
        border: 1px solid #cccccc;
        color: #cccccc;
        text-align: center;
        cursor: pointer;
    }
    .pl15{
        padding-left: 15px;
    }
    .search-btn{
        font-size: 12px;
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        background: #4A6997;
        color: white;
        cursor: pointer;
    }
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
	    margin-right: 10px;
	    margin-left: 10px;
	}
	.bgcolor{
	    overflow:  visible; 
	}
	.bg-white{
	    background: white;
	    border-radius: 3px;
	} 
	.h48{
	    height: 48px;
	    line-height: 48px;
	    border-bottom: 1px solid #E4E4E4;
	}
</style>
<style>
	.bgcolor{
	    width: 100%;
	}
</style>