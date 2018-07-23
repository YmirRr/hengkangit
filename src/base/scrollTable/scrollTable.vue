<template>
    <div class="pr">
        <el-table @row-click="rowClick" @select='handleSelect' :ref="scrollBasicSetting.tableName" v-loadmore="scrollLoadMore" v-loading='scrollBasicSetting.scrollLoading' :data="scrollTableData" @selection-change="handleSelectionChange" border height="250">
            <el-table-column type="selection" width="50" v-if="scrollBasicSetting.mutiSelect">
            </el-table-column>
            <el-table-column v-for="item in scrollBasicSetting.tableCols" :key="item.prop" :label="item.label" :sortable="item.sortable" :prop="item.prop" :filters="item.filterArray" :filter-method="item.filtermethod">
            </el-table-column>
        </el-table>
        <div class="transfer-layout pa">
            <div class="layout-circle mb10" @click="toTop(scrollBasicSetting.tableName)">
                <i class="iconfont icon-arrow-up"></i>
            </div>
            <div class="layout-circle mb10">
                <p class="font-orange">{{scrollTableData.length}}</p>
                <i class="line"></i>
                <p>{{scrollBasicSetting.totalCount}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['scrollTableData','scrollBasicSetting','mutilSeletions'],
    data(){
        return{
            loadFlag:false,
        }
    },
    directives:{
        loadmore:{
                bind(el, binding) {
                // 获取element-ui table的dom节点
                const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
                SELECTWRAP_DOM.addEventListener('scroll', function() {
                        let sign = 80; // 定义默认的向上滚于向下滚的边界
                        const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) && this.scrollTop > sign)
                        sign = this.scrollTop;
                        if(CONDITION) {
                            binding.value();
                        }
                    });
                }
        }
    },
    mounted(){

    },
    created:function(){
    },
    updated(){

    },
    watch:{
        scrollTableData:{
            handler:function(val,oldVal){
                this.scrollTableData=val;
            },
            deep:true
        },
        scrollBasicSetting:{
            handler:function(val,oldVal){
                this.scrollBasicSetting=val;
            },
            deep:true
        },
        mutilSeletions:{
            handler:function(val,oldVal){
                if(typeof(oldVal)=='undefined'){
                    return
                }else{
                    this.$refs[this.scrollBasicSetting.tableName].clearSelection();
                    if (val.array) {
                        val.array.forEach(row => {
                            for(let i in this.scrollTableData){
                                if(this.scrollTableData[i][this.mutilSeletions.key]==row[this.mutilSeletions.key]){
                                    this.$refs[this.scrollBasicSetting.tableName].toggleRowSelection(this.scrollTableData[i],true);
                                }
                            }
                        });
                    }
                }
            },
            deep:true
        },
    },
    computed:{
        scrollLoading(){
            return this.$store.state.ScrollTable[this.scrollBasicSetting.tablePreFix+'ScrollTableLoading']
        },
    },
    methods:{
        handleSelect(row){
            console.log(row);
            this.$emit('handleSelect',row);
        },
        toTop(ref){ //回到顶部
            this.$refs[ref].bodyWrapper.scrollTop =0;
        },
        scrollLoadMore(){
            this.$emit('scrollLoadMore',this.scrollBasicSetting.tableName);
        },
        handleSelectionChange(val){
             this.$emit('handleSelectionChange',val);
        },
        rowClick(row){
            this.$emit('rowClick',row);
        }
    }

}
</script>
<style>
.transfer-layout{
    bottom: 0;
    right: 30px;
}
.layout-circle{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    color: #D6D7D5;
    font-size: 13px;
    text-align: center;
    background: rgba(0,0,0,0.4);
}
.layout-circle p {
    width: 100%;
    height: 17px;
    line-height: 17px;
    overflow: hidden;
}
i.line {
    display: block;
    width: 84%;
    border-bottom: 1px solid;
    margin: 0 auto;
}
.font-orange{
    color: #E26756;
}
.end-notice{
    position: absolute;
    top: 53%;
    left: 40%;
    background: #FDF6EC;
    padding: 10px 35px;
    border-radius: 8px;
    color: #E6A23C;
}
</style>

