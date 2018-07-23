<template>
    <el-row class="transfer">
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>可选</span>
                <div class="transfer_search" @keyup.enter="searchOptional">
                    <el-input
                        placeholder="搜索..."
                        v-model="queryOptional"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>    
            <el-col :span="24" class="transfer_table pr">
                <!-- <vue-scroll :ops="$store.state.option" @handle-scroll="handleScroll">  -->
                    <el-table ref="OptionsTable" v-loading="OptionalLoading"  v-loadmore="loadMoreOptional" :data="OptionalTableFilter" @selection-change="handleOptional" height="250" border >
                        <el-table-column type="selection" label="" width="50">
                        </el-table-column>
                        <el-table-column v-for="item in transferlCols" :key="item.prop" :label="item.label" :prop="item.prop" >
                        </el-table-column>
                    </el-table>
                    <div class="transfer-layout pa">
                        <div class="layout-circle mb10" @click="toTop('OptionsTable')">
                            <i class="iconfont icon-arrow-up"></i>
                        </div>
                        <div class="layout-circle mb10">
                            <p class="font-orange">{{OptionalTableFilter.length}}</p>
                            <i class="line"></i>
                            <p>200</p>
                        </div>
                    </div>
                <!-- </vue-scroll> -->
            </el-col>
        </el-col>
        <el-col :span="2" class="transfer_btns">
            <el-col :span="24" class="transfer_btn_wrapper">
                <div class="transfer-icon">
                    <i class="iconfont icon-arrow-right"></i>
                </div>
                <div class="transfer-icon mt20">
                    <i class="iconfont icon-arrow-left"></i>
                </div>
            </el-col>
        </el-col>
        <el-col :span="11" class="transfer_warapper">
            <el-col :span="24" class="transfer_header">
                <span>已选</span>
                <div class="transfer_search" @keyup.enter="searchSelected">
                    <el-input
                        placeholder="搜索..."
                        v-model="querySelected"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>    
            </el-col>    
            <el-col :span="24" class="transfer_table">
                <el-table ref="selectTable" v-loadmore="loadMoreSelected" v-loading="SelectedLoading" :data="SelectedTableFilter" @selection-change="handleSelected" border height="250">
                    <el-table-column type="selection" label="" width="50">
                    </el-table-column>
                    <el-table-column v-for="item in transferlCols" :key="item.prop" :label="item.label" :prop="item.prop" >
                    </el-table-column>
                </el-table>
                <div class="transfer-layout pa">
                    <div class="layout-circle mb10" @click="toTop('selectTable')">
                        <i class="iconfont icon-arrow-up"></i>
                    </div>
                    <div class="layout-circle mb10">
                        <p class="font-orange">{{SelectedTableFilter.length}}</p>
                        <i class="line"></i>
                        <p>200</p>
                    </div>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>
<script type="text/javascript">
	export default{
        props: {transferHttpSetting:{type:Object},
			// expandParams:{type:Object},
			transferlCols:{type:Array}}, 
		data(){
			return{
                querySelected:'',//已选搜索
                queryOptional:'',//可选搜索
                OptionalHandle:[],//可选项勾选数据
                OptionalTotalPage:0,//可选表格分页总数
                selectedHanled:[],//已选项勾选数据
                OptionalPre:true,//可选上一页
                OptionalNext:true,//可选下一页
                OptionalCurrentPage:1,//当前页
                //selectedTable:[],//已选表格数据模型
                OptionalPagination:[],
                SelectedCurrentPage:1,//已选表格当前页
                SelectedTotalPage:0,
                toOptionalBtn:true,
                toSeletedBtn:true,
                SelectedPre:true,//可选上一页
                SelectedNext:true,//可选下一页
                SelectedPagination:[],
                EachPage:10,//表格每页显示多少条数据
                StartCount:0,//显示多少条
                EndCount:0,//跳过几条
                page:0,
                loadSign:true,
			}
		},
		created() {
            this.$store.commit('setTransferName',this.transferHttpSetting.transferName)
            this.$store.commit('setTransferOptionalApi',this.transferHttpSetting.transferOptionalApi)//可选接口
            this.$store.commit('setTransferOptionalParams',this.transferHttpSetting.transferOptionalParams)//可选参数
            this.$store.commit('setTransferSelectedApi',this.transferHttpSetting.tansferSelectedApi)//已选接口
            this.$store.commit('setTransferSelectedParams',this.transferHttpSetting.transferSelectedParams)//已选参数
            this.$store.dispatch('InitOptionalTransfer');//初始化可选表格数据
            this.$store.dispatch('InitSelectedTransfer');//初始化已选表格数据
        },
        directives:{
            loadmore:{
                bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
                SELECTWRAP_DOM.addEventListener('scroll', function() {
                    /*
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
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
        watch:{
            queryOptional:function(val){//可选项
                let filterKey=val;
                let modelName="SelectedTable";
                if(this.filterData(filterKey,modelName).length>0){//若已选列表中包含了可选搜索条件的数据

                }else{//若为包含，调用接口查询

                    this.OptionalTableFilter.unshift();
                }

            },
        },
        computed:{
            OptionalLoading(){//可选加载动画
                return this.$store.state.Transfer[this.transferHttpSetting.transferName+'OptionalTableLoading']
            },
            SelectedLoading(){//可选加载动画
                return this.$store.state.Transfer[this.transferHttpSetting.transferName+'SelectedTableLoading']
            },
            OptionalTable:{
                get: function () {
                    return this.$store.state.Transfer[this.transferHttpSetting.transferName+'OptionalTable']; 
                    },
                set: function (newValue) {
                    
                }  
            },
            SelectedTable:{
                get: function () {
                    return this.$store.state.Transfer[this.transferHttpSetting.transferName+'SelectedTable']; 
                    },
                set: function (newValue) {
                } 
            },
            OptionalTableFilter: function () {//已选表格数据过滤
                var filterKey = this.queryOptional && this.queryOptional.toLowerCase()
                if (filterKey) {
                    return this.OptionalTable.filter(function (data) {
                        return Object.keys(data).some(function (key) {
                            return String(data[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                return this.OptionalTable;
            },
            SelectedTableFilter: function () {//已选表格数据过滤
                var filterKey = this.querySelected && this.querySelected.toLowerCase()
                if (filterKey) {
                    return this.SelectedTable.filter(function (data) {
                        return Object.keys(data).some(function (key) {
                            return String(data[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                return this.SelectedTable;
            },
        },
	    methods:{
            filterData(filterKey,model){
                if (filterKey) {
                    return this[model].filter(function (data) {
                        return Object.keys(data).some(function (key) {
                            return String(data[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
            },
            handleSelected(val){//已选到可选
                if(val.length==0){
                    return
                }
                this.OptionalTable.unshift(val[0]);
                this.$store.commit('Init_TransferSelected',this.array_diff(val,this.SelectedTable));//重置已选列表
            },
            handleOptional(val){//可选到已选
                if(val.length==0){
                    return
                }
                this.SelectedTable.unshift(val[0]);
                this.$store.commit('Init_TransferOptional',this.array_diff(val,this.OptionalTable));//重置已选列表
            },
            loadMoreOptional() {//可选表格加载更多
                let eachPage=10;
                this.OptionalCurrentPage++;
                this.transferHttpSetting.transferOptionalParams.SkipCount=0;
                this.transferHttpSetting.transferOptionalParams.MaxResultCount=eachPage*this.OptionalCurrentPage;
                if(this.transferHttpSetting.transferOptionalParams.MaxResultCount>this.$store.state.Transfer[this.transferHttpSetting.transferName+'OptionalTotalCount']){
                    this.$message({
                        message: '没有更多的数据了！',
                        type: 'success'
                    });
                }else{
                    this.$store.commit('setTransferOptionalParams', this.transferHttpSetting.transferOptionalParams);
                    this.$store.state.Transfer[this.transferHttpSetting.transferName+'OptionalTableLoading']=true;
                    this.$store.dispatch('InitOptionalTransfer');
                }
                
            },
            loadMoreSelected(){//已选表格加载更多
                let eachPage=10;
                this.SelectedCurrentPage++;
                this.transferHttpSetting.transferSelectedParams.SkipCount=0;
                this.transferHttpSetting.transferSelectedParams.MaxResultCount=eachPage*this.SelectedCurrentPage;
                if(this.transferHttpSetting.transferSelectedParams.MaxResultCount>this.$store.state.Transfer[this.transferHttpSetting.transferName+'SelectedTotalCount']){
                    this.$message({
                        message: '没有更多的数据了！',
                        type: 'success'
                    });
                }else{
                    this.$store.commit('setTransferSelectedParams', this.transferHttpSetting.transferSelectedParams);
                    this.$store.state.Transfer[this.transferHttpSetting.transferName+'SelectedTableLoading']=true;
                    this.$store.dispatch('InitSelectedTransfer');
                }
            },
            toTop(ref){
                this.$refs[ref].bodyWrapper.scrollTop =0;
            },
            array_diff(a, b) {//去重
                return diff(a, b).concat( diff(b, a) );
                function diff(a, b) {
                    var c = {};
                    b.forEach(function(o){ c[ JSON.stringify(o) ] = 0 });
                    a.forEach(function(o){ delete c[ JSON.stringify(o) ]; });
                    return Object.keys(c).map(JSON.parse);
                }
            }
	    }
	}
</script>
<style>
@import"//at.alicdn.com/t/font_561828_maf6xgd190be29.css";
button.erp_bt[disabled] {
    cursor: not-allowed;
    background: #ccc;
}
.transfer .el-button--primary.is-disabled,.transfer .el-button--primary.is-disabled:hover{
    color: #A6ACC2;
    background-color: rgba(255,255,255,.5);
    border-color: #C9D1D1;
}
.transfer-icon {
    width: 100%;
    text-align: center;
}
.transfer-icon .iconfont{
    color: #9E9E9C;
    font-size: 20px!important;
}
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