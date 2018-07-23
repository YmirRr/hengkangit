<template>
    <div>
		<el-input
			v-show="treeEntrySearch"
			placeholder="搜索..."
			v-model="treeQuery"
			class="search_input mt5 mb5 tree-query"
			>
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input>
		<el-autocomplete
			v-show="treeSuggestSearch"
			v-model="treeQuery"
			:fetch-suggestions="querySearchAsync"
			class="search_input tree-query"
			placeholder="搜索..."
			>
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-autocomplete>
		<!-- 树节点操作 -->
		<div class="tree-function" v-show='treeFunction.length>0'>
			<div>
				<button v-for="item in treeFunction" :key="item.text" class="tree-button" @click="operatingTree(item.text)">{{item.text}}</button>
			</div>
			<div class="tree-tips">温馨提示：只对选中树节点操作</div>
		</div>
		<vue-scroll :ops="$store.state.option">
			<el-tree
			:render-content="renderContent_componyTree"
			v-loading="treeLoading"
			:highlight-current="true"
			:data="treeData"
			:props="defaultProps"
			:node-key="expandParams.expandId"
			:default-expanded-keys="expandParams.expandkey"
			ref="tree"
			:expand-on-click-node="false"
			:filter-node-method="filterNode"
			@node-click="nodeClick"
			>
			</el-tree>
		</vue-scroll>
    </div>
</template>
<script type="text/javascript">
	export default{
		//props: ['defaultProps','expandParams','treeSearch'],
		props:{
			defaultProps:{type:Object},
			// expandParams:{type:Object},
			treeEntrySearch:{type:Boolean},
			treeSuggestSearch:{type:Boolean},
			treeParams:{type:Object},
			treeFunction:{
				type:Array,
				default:()=>[]
			},
		},
		data(){
			return{
				//treeLoading:true,//加载动画
				treeQuery:'',//树节点过滤条件
				treeFetchSuggestions:[],//搜索输入建议列表
				expandParams:{//默认展开节点参数控制
                    expandId:this.defaultProps.id,
                    expandkey:[],
                },
			}
		},
		created() {
			this.$store.commit('setTreeName',this.treeParams.treeName)//传递具体数据模型名称
			this.$store.commit('setInitTreeApi',this.treeParams.treeApi)//初始化接口地址
			this.$store.dispatch('InitTree');//初始化树型数据
			// setTimeout(() => {
			// 	this.treeLoading=false;
			// 	//this.expandParams.expandId=this.$store.state[this.treeParams.treeName+'TreeData']
			// }, 800);
		},
		computed:{
			treeData(){
				let _this=this;
				// if(_this.$store.state[_this.treeParams.treeName+'TreeData'].length>0){
					
				// 	_this.expandParams.expandkey.push(_this.$store.state[_this.treeParams.treeName+'TreeData'][0][this.expandParams.expandId])
				// }
				$.each(_this.$store.state[_this.treeParams.treeName+'TreeData'],function(index,value){
					let ITEM={'value':value[_this.defaultProps.label],'id':value[_this.defaultProps.id]};
					_this.treeFetchSuggestions.push(ITEM)
				})
				return _this.$store.state[_this.treeParams.treeName+'TreeData']
			},
			treeLoading(){
				return this.$store.state[this.treeParams.treeName+'TreeLoading']
			}
		},
		watch:{
			treeQuery(val) {
                this.$refs.tree.filter(val);
			},
			expandParams:{
				handler:function(val,oldVal){
                        this.expandParams=val;
                },
                deep:true
			}
		},
	    methods:{
			filterNode(value, data) {//根据输入条件过滤树型
                if (!value) return true;
                 return data[this.defaultProps.label].indexOf(value) !== -1;
			},
			querySearchAsync(queryString, cb) {
                let TREE_FETCH_SUGGESTIONS = this.treeFetchSuggestions;
                var RESULTS = queryString ? TREE_FETCH_SUGGESTIONS.filter(this.createStateFilter(queryString)) : TREE_FETCH_SUGGESTIONS;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                cb(RESULTS);
                }, 100 * Math.random());
            },
			renderContent_componyTree(h, { node, data, store }){//添加树型文件夹图标
                if(typeof(data[this.defaultProps.children])!='undefined' && data[this.defaultProps.children]!=null && data[this.defaultProps.children].length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data[this.defaultProps.id]}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data[this.defaultProps.label]}
                        </span>
                    );
                }else{
                    return (
                        <span class="el-tree-node__label" data-id={data[this.defaultProps.id]}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data[this.defaultProps.label]}
                        </span>
                    );
                }
			},
			nodeClick(data){//树节点点击事件
				this.$emit('nodeClick',data);
			},
			operatingTree(text){
				this.$emit('operatingTree',text);
			}
	    }
	}
</script>
<style>
@import"//at.alicdn.com/t/font_561828_maf6xgd190be29.css";
.search_input .el-input__icon{
	line-height: 25px;
}
.tree-query{
	width: calc(100% - 10px);
    padding: 0 5px;
}
.tree-function{
	width: calc(100% - 10px);
    margin: 0 auto;
}
.tree-button{
	background: none;
    border: none;
    color: #33CCCC;
}
.tree-tips{
	font-size: 12px;
    text-indent: 5px;
    color: #AFAFB0;
}
</style>
