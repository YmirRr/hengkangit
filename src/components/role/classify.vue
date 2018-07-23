<template>
	<el-dialog  :visible="roleClassify" class="role-classify transfer_dialog dialogOu" title="选取功能" :close-on-click-modal="false">
		<span slot="title">
            <span>选取功能</span>

            <!-- <div class="search_input_group">
                <div class="search_input_wapper">
                    <el-input
                        placeholder="搜索..."
                        v-model="filterTextOu"
                        class="search_input"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </div> -->
        </span>
        <el-col :span="24" class="transfer_warapper">
            <el-col :span="24" class="checkBoxOuUser">
                <el-checkbox @change="CheckAllTree" v-model="checkAllOu" class="square_el"></el-checkbox><span>全选</span>
                <el-checkbox @change="showCheckTree" v-model="showCheck" class="square_el"></el-checkbox><span>查看已选</span>
            </el-col>
            <el-col :span="24" class="transfer_table">
                <vue-scroll :ops="$store.state.option">
                    <el-tree
                    :render-content="renderContent_ouTreeDataRight"
                    :default-expanded-keys="expand.expandId_dialogOu"
                    :data="ouTreeDataRight"
                    show-checkbox
                    :highlight-current="true"
                    node-key="id"
                    ref="treeArr"
                    :filter-node-method="filterNode"
                    @node-click="ouNodeClickRight"
                    @check-change="isCheckAllOu"
                    :expand-on-click-node="false"
                    :props="ouDefaultPropsRight">
                    </el-tree>
                </vue-scroll>
            </el-col>
            <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
            <!-- <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKey">通过 key 设置</el-button> -->
        </el-col>
	    <span slot="footer">
	        <button class="transfer_footer_btn transfer_confirm" @click="ouDialogSure">确 认</button>
	        <button class="transfer_footer_btn" @click="ouDialogOff">取 消</button>
	    </span>
	</el-dialog>
</template>
<script type="text/javascript">
import {DEEP_CLONE} from '../../common/common.js'
	export default({
		props:{
	      	roleClassify:{//提示框是否可见
	            type:Boolean
	        },
	        roleClassifyArr:{//提示框是否可见
	            type:Array
	        }
	    },
		data(){
			return {
		       	expand:{
	                expandId_addDataOu:[],//默认下拉树形展开id
	                isHere_addDataOu:false,//是否存在id于树形
	                expandId_dialogOu:[],//默认dialog组织树形展开id
	                expandId_mmenu:[],//默认分配功能树形展开id
	            },
	            ouDefaultPropsRight:{
	                children: 'childNodes',
	                label: 'moduleName',
	                id:'id'
	            },
	            ouTreeDataRight:[],
	            checkAllOu:false,
	            showCheck:false,
	            iscc:false,
	            allOuLength:''
		    }
		},
		created () {
			this.loadTree();
		},
		watch:{
			ouTreeDataRight:{
				handler:function(val){
				},
				deep:true
			},
			roleClassify(){
				if(!this.iscc){
					this.iscc = true;
					let _this = this;
					setTimeout(()=>{
		  				$('.role-classify').find('.el-tree-node__expand-icon').eq(0).click();
		  				this.$refs.treeArr.setCheckedNodes(arr);
		  				$('.roleModify').find('.el-icon-close').click(function(){
		  					_this.$emit('childBybig',false);
		  				})
		  			},200)
		  			let arr = [];
		  			for(let i=0;i<this.roleClassifyArr.length;i++){
		  				if(this.roleClassifyArr[i].childNodes.length > 0){
		  					for(let j=0;j<this.roleClassifyArr[i].childNodes.length;j++){
		  						if(this.roleClassifyArr[i].childNodes[j].childNodes.length >0){
		  							for(let k=0;k<this.roleClassifyArr[i].childNodes[j].childNodes.length;k++){
		  								let obj = {label:this.roleClassifyArr[i].childNodes[j].childNodes[k].moduleName,id:this.roleClassifyArr[i].childNodes[j].childNodes[k].id}
		  								arr.push(obj)
		  							}
		  						}else{
		  							let obj = {label:this.roleClassifyArr[i].childNodes[j].moduleName,id:this.roleClassifyArr[i].childNodes[j].id}
		  							arr.push(obj)
		  						}
		  					}
		  				}else{
		  					let obj = {label:this.roleClassifyArr[i].moduleName,id:this.roleClassifyArr[i].id}
		  					arr.push(obj)
		  				}
		  			}

				}
			}
		},
		methods: {
			ouDialogOff(){
				this.$emit('childBybig',false);
			},
	      	CheckAllTree(){
	      		let _this=this;
	            let topNode=[]
	            // _this.$refs.treeArr.setCheckedKeys([]);
	            if(_this.checkAllOu){
	                // $.each(_this.ouTreeDataRight,function(index,val){
	                //     topNode.push(val)
	                // })
	                _this.$refs.treeArr.setCheckedNodes(_this.ouTreeDataRight);
	                 $('.el-tree-node__content').each(function(){
	                    $(this).css('display','block')
	                })
	                 console.log($('.transfer_table').find('.el-checkbox').length)
	            }else{
	                // _this.$refs.tree.setCheckedNodes(_this.ouCheckAll);
	                _this.$refs.treeArr.setCheckedNodes([])
	                setTimeout(function(){
	                    if(_this.showCheck){
	                        $('.el-checkbox__input').each(function(){
	                            if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
	                                $(this).parents('.el-tree-node__content').css('display','none')
	                            }
	                        })
	                    }
	                },100)
	            }
	      	},
	      	showCheckTree(){
	      		let _this=this;
	            if(_this.showCheck){
	                $('.el-checkbox__input').each(function(){
	                    if(!$(this).hasClass('is-indeterminate') && !$(this).hasClass('is-checked')){
	                        $(this).parents('.el-tree-node__content').css('display','none')
	                    }
	                })
	            }else{
	                $('.el-tree-node__content').each(function(){
	                    $(this).css('display','block')
	                })
	            }
	      	},
	      	ouDialogSure(){//dialog点击确认
	      		let a = this.$refs.treeArr.getCheckedNodes();
	      		let f = DEEP_CLONE(this.$refs.treeArr.getHalfCheckedNodes());
	      		let g = []
	      		// for(let i=0;i<f.length;i++){
	      		// 	let obj = {childNodes:[],id:f[i].id,moduleParentId:f[i].moduleParentId,moduleName:f[i].moduleName,tier:f[i].tier}
	      		// 	g.push(obj)
	      		// }
				//let c = this.paginationOu(a,10,1);
				for(let k in f){//循环取出未选中节点
					let selectARR=[];
					for(let j in a){
						if(f[k].moduleName==a[j].moduleParentId_ModuleName){
							selectARR.push(a[j]);
						}
					}
					f[k].childNodes=selectARR;
				}
				
				let c=a;
	            let d = [];
	            let b = []
	            for(let i=0;i<c.length;i++){//取出全选节点
	            	d.push(c[i]);
	            	if(c[i].moduleParentId == 0){
	            		b.push(c[i])
					}
					// else{
	            	// 	let agg = true;
	            	// 	for(let j=0;j<d.length;j++){
	            	// 		if(c[i].moduleParentId == d[j].id || c[i].bigTier == d[j].id){
	            	// 			agg = false;
	            	// 		}
	            	// 	}
	            	// 	if(agg){
	            	// 		b.push(c[i])
	            	// 	}
	            	// }
				}
				b=b.concat(f);//拼接未全选和全选节点
	            let onj = {arr:b,bigarr:g}
				this.$emit('childByValue',onj);
	        },
	        paginationOu(checkAllata,oneItem,thisPage){//数据分页
	        //checkAllata分页数据
	        //oneItem每页有多少条信息
	        //thisPage当前页
	            let _this=this;
	            let nowData=[];
	            // console.log(checkAllata)
	            let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
	            let endIndex=startIndex + oneItem;
	                if(checkAllata.length>0){
	                    if(endIndex>checkAllata.length){
	                        endIndex=checkAllata.length
	                    }
	                    for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
	                        // console.log(checkAllata[startIndex])
	                        nowData.push(checkAllata[startIndex])
	                    }
	                }
	            _this.ouTotalItem=checkAllata.length;//总共多少条数据
	            _this.ouTotalPage=Math.ceil(checkAllata.length/oneItem);//有多少页
	            return nowData
	        },
	      	loadTree(){
	      		this.$axios.gets('/api/services/app/ModuleManagement/GetModulesTree?id=0&IsAll=true').then((res)=>{
	      			this.ouTreeDataRight = res;
	      			let arr = res;
	      			let sum = 0;
	      			sum = sum + arr.length;
	      			for(let i=0;i<arr.length;i++){
	      				sum = sum + arr[i].childNodes.length;
	      				arr[i].tier = 0;
	      				for(let j=0;j<arr[i].childNodes.length;j++){
	      					sum = sum + arr[i].childNodes[j].childNodes.length;
	      					arr[i].childNodes[j].tier = 1;
	      					arr[i].childNodes[j].bigTier = '';
	      					for(let k=0;k<arr[i].childNodes[j].childNodes.length;k++){
	      						arr[i].childNodes[j].childNodes[k].tier = 2;
	      						arr[i].childNodes[j].childNodes[k].bigTier = arr[i].id;
	      					}
	      				}
	      			}
	      			this.allOuLength = sum;
           		})
	      	},
	      	defauleExpandTree(model,expandName,response,responseKey,children){
	            //model数据模型
	            //expandName需要设置的默认展开树形建值_this.expand[expandName]
	            //response,树形数据
	            //responseKey需要与model匹配的唯一key
	            //children，response[children]
	            let _this=this;
	            if(model!=''){//model为树形下拉默认值，即渲染数据。如果存在，递归tree
	                $.each(response,function(index,val){
	                    if(val[responseKey]==_this.addData[model]){
	                        _this.expand[expandName]=[_this.addData[model]]
	                    }else{
	                        $.each(val[children],function(index1,val1){
	                            if(val1[responseKey]==_this.addData[model]){
	                                _this.expand[expandName]=[_this.addData[model]]
	                            }else{
	                                _this.defauleExpandTree(model,expandName,val1[children],responseKey,children)
	                            }
	                        })
	                    }
	                })
	            }else{
	                 $.each(response,function(index,value){
	                    if(index==0){
	                        if(typeof(value)!='undefined'&&value!=null&&value[responseKey]!=null&&value[responseKey]!=''&&typeof(value[responseKey])!='undefined'){
	                            _this.expand[expandName]=[value[responseKey]]
	                        }

	                    }
	                })

	            }
	        },
	      	ouNodeClickRight(data){//右侧树形节点点击
	            let _this=this;
	            console.log(1)
	            // _this.addOu=data.ouId;
	        },
	        isCheckAllOu(){//是否全选
	            let _this=this;
	            // _this.checkAllOu=true
	            if(_this.$refs.treeArr.getCheckedNodes().length==_this.allOuLength){
	                _this.checkAllOu=true
	            }else{
	                _this.checkAllOu=false
	            }
	        },
	      	filterNode(value, data) {
	            if (!value) return true;
	            return data.ouName.indexOf(value) !== -1;
	        },

	        renderContent_ouTreeDataRight(h, { node, data, store }){
	             if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
	                    return (
	                        <span class="el-tree-node__label" data-id={data.id}>
	                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
	                            {data.moduleName}
	                        </span>
	                    );
	                }else{
	                    return (
	                        <span class="el-tree-node__label" data-id={data.id}>
	                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
	                            {data.moduleName}
	                        </span>
	                    );
	                }
	        },
	    }

	})
</script>
<style>
</style>
