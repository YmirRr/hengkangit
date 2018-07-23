<template>
	<el-dialog :visible="SearchGoods1" class="Search-Goods" title="收货地址" :close-on-click-modal="false">
		<div class="header1" >
			<el-col :span="3" class="title-Search">
				<h4>商品搜索</h4>
			</el-col>
			<el-col :span="2" >
				<el-button type="success" class="new-button" @click="newShoping">新增商品</el-button>
			</el-col>
			<el-col :span="9" style="height:1px"></el-col>
			<el-col :span="7" class="Search-ipt">
				<div  class="int-div">
					<el-input  placeholder="编码、名称、SKU" class="int" v-model="obscureSeek"></el-input>
					<i class="el-input__icon el-icon-search"></i>
					<button @click="Seek(obscureSeek)">搜索</button>
				</div>
				
			</el-col>
			<el-col :span="2" class="more-box">
				<el-button type="success" @click="moreSearch" :class="activeName">更多查询</el-button>
			</el-col>
			<el-col :span="1" class="close">
				<i class="el-dialog__close el-icon el-icon-close" @click="bigOff"></i>
			</el-col>
		</div>
		<el-row class="Goods-box">
			<el-row class="" style="max-height:600px;overflow:auto;">

			<el-col :span="24" class="more-big">
				<el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="更多查询" name="first">
				    	<el-row class="increase-data">
				    		<div class="list" v-for="(item,index) in clickData" @click="removeData(clickData,index)">
				    			{{item.name}}：<span>{{item.value}}<i class="el-icon-close" ></i></span>		
				    		</div>
				    	</el-row>
				    	<el-row v-for="(item,index) in  data" :key="index" :class="item.class">
				    		<el-col :span="21" class="left-more">
			    				<el-col :span="2" class="title-more-big">{{item.title}}</el-col>
				    			<el-col :span="21" class="max-height add-sty">
				    				 <el-col :span="3" v-if="!item.select && !item.button" class="text-big" :class="item.border ? 'bor-cen' : ''" v-for="(iten,idx) in item.text">
				    					<span class="col-red" @click="clickName(idx,item.text,index)" :ref="'textName' +index+ idx">{{iten.name}}</span>
				    				</el-col> 
				    				<el-col :span="3" v-if="!item.multiple && !item.select && !item.border" class="text-big" :class="item.border ? 'bor-cen' : ''" v-for="(iten,idx) in item.text">
				    					
				    					<el-checkbox v-model="iten.checked">{{iten.name}}</el-checkbox>
				    				</el-col> 
				    				<div  v-if="item.select" class="text-big advanced" :class="item.border ? 'bor-cen' : ''" v-for="(iten,idx) in item.text" style="" :ref="'minWidth'+idx" @mouseover="putIn(idx,item.text)" :data-id="`${iten.button}`" @mouseout="leave(idx,item.text)">
				    					<div class="el-submenu__title advanced-a" >
				    						{{iten.name}}<i class="el-icon-arrow-down" ></i>
				    					</div>
				    					<ul  class="el-submenu__title-left" v-if="iten.show">
				    						<li v-for="(son,inx) in iten.arr" @click="proName(inx,iten.arr,idx,item.text)"  v-if="iten.button" :class="son.class ? 'color-red':''">
				    						{{son.propertyValueName}}
				    						</li>
				    						<li v-for="(son,inx) in iten.arr" v-if="!iten.button">
				    							<el-col :span="24">
				    								<el-checkbox v-model="son.abc" >{{son.propertyValueName}}</el-checkbox>
				    							</el-col>
				    						</li>
				    						<li style="float:right;" v-if="iten.button">
				    							<button type="success"  @click="propertyChoice(idx,iten.arr,item.text)">多选</button>
				    						</li>
				    						<li class="el-submenu__title-left-button" v-if="!iten.button" :data-id="`${iten.button}`">
				    							<button class="btn1" :class="iten.isMakeSure ? 'bg-color':''" @click="advancedShow(iten.arr,idx,item.text)" >确定</button>
											<button  class="btn2" @click="advancedOff(iten.arr,idx,item.text)" >取消</button>
				    						</li>
				    					</ul>
				    				</div>
				    				
				    			 </el-col>
				    			<el-col v-if="item.button" :span="24" class="shopEnsure-box">
			    					<button class="shopEnsure"  @click="shopEnsure(index)" :class="isMakeSure ? 'bg-color':''">确定</button>
			    					<button  @click="shopAbrogate(index)" class="shopAbrogate">取消</button>
			    				</el-col>
				    		</el-col>
				    		<el-col :span="3" class="right-more" >
				    			<el-col :span="11" class="tex" v-if="item.more"><button type="success" @click="loadMore(index)">更多</button></el-col>
				    			<el-col :span="2" style="height:1px"></el-col>
				    			<el-col :span="11" class="tex1" v-if="item.multiple"><button type="success" :ref="'choice'+index" @click="multipleChoice(index,data)">多选</button></el-col>
				    		</el-col> 
				    	</el-row>
				    </el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="24" class="tableData-box">
				<el-table
				    :data="tableData"
				    border height="350"
				    style="width: 100%" v-loadmore="scrollTable" @selection-change="handleSelectionChange" ref="elTable1">
				    <el-table-column type="selection" label="" width="50" >
            		</el-table-column>
				    <el-table-column v-for="(item,index) in data1" :prop="item.prop" :label="item.label"  ></el-table-column>
				</el-table>
			</el-col>
			</el-row>
			<el-col :span="24" style="padding:20px">
				<el-button type="success" @click="affirm">确认</el-button>
				<el-button type="info" @click="bigOff">取消</el-button>
			</el-col>
			
		</el-row>
		
	</el-dialog>
</template>
<script>

  export default {
  	props:{
      	SearchGoods1:{//提示框是否可见
            type:Boolean
        },   
    },
    data() {
      return {
      	activeIndex: '2',
        activeName: '1',
        data:[{
        	title:'类目',
        	text:[],
        	more:true,
        	multiple:true,
        	class:'',
        	border:false,
        	button:false,
        	select:false
        },{
        	title:'品牌',
        	text:[],
        	class:'',
        	more:true,
        	multiple:true,
        	border:false,
        	button:false,
        	select:false
        },
        // {
        // 	title:'年份',
        // 	text:[{name:'2018',id:2018,checked:''}],
        // 	more:false,
        // 	class:'',
        // 	multiple:false,
        // 	border:true,
        // 	button:false,
        // 	select:false
        // },
        {
        	title:'高级选项',
        	text:[],
        	more:false,
        	multiple:false,
        	class:'',
        	border:false,
        	button:false,
        	select:true
        }],
        data1:[{
        	label:'商品编码',
        	prop:'productCode',
        	width:'auto'
        },{
        	label:'商品名称',
        	prop:'productName',
        	width:'auto'
        },{
        	label:'SKU',
        	prop:'skuName',
        	width:'auto'
        },{
        	label:'规格',
        	prop:'specValueName',
        	width:'auto'
        },{
        	label:'类目',
        	prop:'categoryId_CategoryName',
        	width:'auto'
        },{
        	label:'品牌',
        	prop:'brandId_BrandName',
        	width:'auto'
        },{
        	label:'单位',
        	prop:'unitId_UnitName',
        	width:'auto'
        },{
        	label:'库存',
        	prop:'date',
        	width:'auto'
        },{
        	label:'年份',
        	prop:'year',
        	width:'auto'
        },{
        	label:'常用商品',
        	prop:'date',
        	width:'auto'
        }],
        CategoryManagement:{
        	SkipCount:0,
        	MaxResultCount:10,
        },
        CategoryManagement1:{//商品类目
        	SkipCount:0,
        	MaxResultCount:8,
        },
        CategoryManagement2:{//商品品牌
        	SkipCount:0,
        	MaxResultCount:8,
        },
        tableData: [],
        isbrand:true,//品牌加载更多判断
        iscategory:true,//类目加载更多判断
        active: '',//更多激活状态
        ismultipleChoice: '',//更多是否激活
        isscrollload:false,
        obscureSeek:'',//编码SKU名称的值
        isaffirm:[],//传给父元素的数据
        dataModel:{//多项查询
        	Info:"",
        	categoryId:[],
        	brandId:[],
        	Sorting:'',
        	propertyIdGroup:[],
        	skipCount: 0,
  			maxResultCount: 10
        },
        isLoadData:false,//加载更多查询数据
        timeId:'',//鼠标移入控制
        clickData:[],//点击获取的数据
        recordData:[],//点击取消是否储存之前的数据
        isMakeSure:false
      }
    },
    created:function(){
        setTimeout(() =>{
            this.loadTableData();
        },20);  
    },
    watch:{
    	dataModel:{
    		handler: function (val, oldVal) { 
    			if(!this.isLoadData){
    				this.isLoadData = !this.isLoadData; 
    			}
    			
    		},
		    deep: true,
		    immediate: true
    	},
    	data:{
    		handler:function(val, oldVal){
    			this.isMakeSure = false;
    			if(val[0].multiple == false){
    				for(let i=0;i<val[0].text.length;i++){
    					if(val[0].text[i].checked == true){
    						this.isMakeSure = true;
    						return;
    					}else{
    						this.isMakeSure = false;
    					}
    				}
    			}else if(val[1].multiple == false){
    				for(let i=0;i<val[1].text.length;i++){
    					if(val[1].text[i].checked == true){
    						this.isMakeSure = true;
    						return;
    					}else{
    						this.isMakeSure = false;
    					}
    				}
    			}
				for(let i=0;i<val[2].text.length;i++){
					if(val[2].text[i].show == true){
						let ab = '';
						for(let j=0;j<val[2].text[i].arr.length;j++){
							if(val[2].text[i].arr[j].abc == true){
								ab = j;
							}
						}
						if(ab !== ''){
							val[2].text[i].isMakeSure = true;
						}else{
							val[2].text[i].isMakeSure = false;
						}
					}

				}
    			
    		},
    		deep: true,
		    immediate: true
    	}
    },
    directives:{
    	loadmore:{
    		bind(el,bindimg){
    			let obj1 = el.children[2];
				obj1.addEventListener('scroll',(e)=>{
					let event = e || event;
					let y = event.target.scrollTop;
					let bad = event.target.scrollHeight - (event.target.clientHeight+30);//滚动的最大高度
					if(y > bad ){
						bindimg.value()
					}
				})
    		}
    	}
    },
    methods: {
      	handleClick(tab, event) {
      	},
      	bigOff(){
      		this.$emit('childByValue',false);
      	},
      	affirm(){
      		this.$emit('childByValue',this.isaffirm);
      	},
      	newShoping(){
      		this.$emit('childByValue','跳转');
      	},
      	advancedShow(arr,index,bigarr){//高级确定iten.arr,idx,item.text
      		if(!bigarr[index].isMakeSure){return;}
      		let att = this.data[2].text[index].arr;
      		let id = this.data[2].text[index].id
      		let acc = [];
      		// this.clickData = [];
      		let add = [];
      		for(let i=0;i<this.clickData.length;i++){
      			if(this.clickData[i].name !== this.data[2].text[index].name){
      				add.push(this.clickData[i])
      			}
      		}
      		this.clickData = add;
      		for(let i=0;i<att.length;i++){
      			if(att[i].abc){
      				acc.push(att[i].id);
      				let obj = {name:this.data[2].text[index].name,value:att[i].propertyValueName,index:index,indexChild:i,id:att[i].id,distinguish:2};
      				this.clickData.push(obj);
      				this.data[2].text[index].arr[i].class = true;
      			}else{
      				this.data[2].text[index].arr[i].class = false;
      			}
      		}
      		if(this.dataModel.propertyIdGroup.length > 0){//当前有数据
    			let auu = false;
				for(let i=0;i<this.dataModel.propertyIdGroup.length;i++){
					if(this.dataModel.propertyIdGroup[i].propertyId == bigarr[index].id){
						this.dataModel.propertyIdGroup[i].propertyValueId = acc;
						auu = true;
					}
				}
				if(!auu){
					this.dataModel.propertyIdGroup.push({propertyId:bigarr[index].id,propertyValueId:acc});
				}
			}else{
				this.dataModel.propertyIdGroup = [{propertyId:bigarr[index].id,propertyValueId:acc}];
			}
      		this.data[2].text[index].button = true;
      		this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
				let arr1 = res.result.items;
    			for(let i=0;i<arr1.length;i++){
    				let a = arr1[i].createdTime;
    				arr1[i].year = a;
    			}
    			this.tableData = arr1;
    			this.isscrollload = false;

			})
      	},
      	advancedOff(arr,index,bigarr){//高级取消
      		this.data[2].text[index].button = true;
      	},
      	handleSelect(key, keyPath) {
     	},
      	handleSelectionChange(val){//多选操作
        	this.isaffirm = val;
    	},
    	proName(index,arr1,ind,bigarr){//高级选项点击名字
    		// console.log(this.data[2].text[ind].arr[i].class)
    		if(!this.data[2].text[ind].arr[index].class){
    			for(let i=0;i<arr1.length;i++){
	    			this.data[2].text[ind].arr[i].class = false;
	    		}
    		}
    		this.data[2].text[ind].arr[index].class = !this.data[2].text[ind].arr[index].class;
    		let add = [];
      		for(let i=0;i<this.clickData.length;i++){
      			if(this.clickData[i].name !== this.data[2].text[ind].name){
      				add.push(this.clickData[i])
      			}
      		}
    		if(this.data[2].text[ind].arr[index].class === true){
    			this.clickData = add;
    			this.clickData.push({name:this.data[2].text[ind].name,value:arr1[index].propertyValueName,index:ind,indexChild:index,id:arr1[index].id,distinguish:2})

    		}else{
    			for(let i=0;i<this.clickData.length;i++){
	      			if(this.clickData[i].name === this.data[2].text[ind].name && this.clickData[i].value === arr1[index].propertyValueName){
	      				this.clickData.splice(i,1);
	      			}
	      		}
    		}
    		if(this.dataModel.propertyIdGroup.length > 0){//当前有数据
    			let auu = false;
				for(let i=0;i<this.dataModel.propertyIdGroup.length;i++){
					if(this.dataModel.propertyIdGroup[i].propertyId == bigarr[ind].id){
						auu = true;
						let aii = false;
						for(let j=0;j<this.dataModel.propertyIdGroup[i].propertyValueId.length;j++){
							if(this.dataModel.propertyIdGroup[i].propertyValueId[j] == arr1[index].id){//属性值id相等
								this.dataModel.propertyIdGroup[i].propertyValueId.splice(j,1);
								aii = true;
							}
						}
						if(aii){
							if(this.dataModel.propertyIdGroup[i].propertyValueId.length == 0){
								this.dataModel.propertyIdGroup.splice(i,1)
							}
						}else{
							this.dataModel.propertyIdGroup[i].propertyValueId = [arr1[index].id];//属性值id不相等
						}
					}
				}
				if(!auu){
					this.dataModel.propertyIdGroup.push({propertyId:bigarr[ind].id,propertyValueId:[arr1[index].id]});
				}
			}else{
				this.dataModel.propertyIdGroup = [{propertyId:bigarr[ind].id,propertyValueId:[arr1[index].id]}];
			}
			let o = {
				Info:"",
				Sorting:"",
				brandId:[],
				categoryId:[],
				maxResultCount:10,
				propertyIdGroup:[{propertyId:1,propertyValueId:[6]}],
				skipCount:0
			}
    		this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
				let arr1 = res.result.items;
    			for(let i=0;i<arr1.length;i++){
    				let a = arr1[i].createdTime;
    				arr1[i].year = a;
    			}
    			this.tableData = arr1;
    			this.isscrollload = false;

			})

    	},
    	propertyChoice(index,arr,arr1){//高级选项多选
    		for(let i=0;i<arr.length;i++){
    			
    			if(arr[i].class == true){
    				arr[i].abc = true;
    			}else{
    				arr[i].abc = false;
    			}
    		}
    		console.log(arr)
    		this.data[2].multiple = false;
    		arr1[index].button = false
    	},
    	removeData(arr,index){//删除选择数据
    		if(arr[index].distinguish === 0){
    			for(let i=0;i<this.dataModel.categoryId.length;i++){
    				if(this.dataModel.categoryId[i] === arr[index].id){
    					this.dataModel.categoryId.splice(i,1);
    				}
    			}
    			this.$refs['textName'+arr[index].index + arr[index].indexChild][0].style.color = '#606266';
    			this.clickData.splice(index,1);
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    				let arr1 = res.result.items
	    			for(let i=0;i<arr1.length;i++){
	    				let a = arr1[i].createdTime;
	    				arr1[i].year = a;
	    			}
	    			this.tableData = arr1;
	    			this.isscrollload = false;

    			})
    		}else if(arr[index].distinguish === 1){
    			for(let i=0;i<this.dataModel.brandId.length;i++){
    				if(this.dataModel.brandId[i] === arr[index].id){
    					this.dataModel.brandId.splice(i,1);
    				}
    			}
    			this.$refs['textName'+arr[index].index + arr[index].indexChild][0].style.color = '#606266';
    			this.clickData.splice(index,1);
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    				let arr1 = res.result.items
	    			for(let i=0;i<arr1.length;i++){
	    				let a = arr1[i].createdTime;
	    				arr1[i].year = a;
	    			}
	    			this.tableData = arr1;
	    			this.isscrollload = false;

    			})
    		}else if(arr[index].distinguish === 2){
    			let id = arr[index].indexChild;

    			this.data[2].text[arr[index].index].arr[id].class = false;
    			// 
    			// this.clickData.splice(index,1);
				for(let i=0;i<this.dataModel.propertyIdGroup.length;i++){
					if(this.dataModel.propertyIdGroup[i].propertyId == this.data[2].text[arr[index].index].id){
						for(let j=0;j<this.dataModel.propertyIdGroup[i].propertyValueId.length;j++){
							if(this.dataModel.propertyIdGroup[i].propertyValueId[j] == this.data[2].text[arr[index].index].arr[id].id){//属性值id相等

								this.dataModel.propertyIdGroup[i].propertyValueId.splice(j,1);
							}
						}
						if(this.dataModel.propertyIdGroup[i].propertyValueId.length == 0){
							this.dataModel.propertyIdGroup.splice(i,1);
						}
						
					}
				}
				console.log(this.dataModel)

				this.clickData.splice(index,1)
    			// this.dataModel.Year = '';
    			// this.$refs['textName'+arr[index].index + arr[index].indexChild][0].style.color = '#606266';
    			// this.clickData.splice(index,1);
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    				let arr1 = res.result.items
	    			for(let i=0;i<arr1.length;i++){
	    				let a = arr1[i].createdTime;
	    				arr1[i].year = a;
	    			}
	    			this.tableData = arr1;
	    			this.isscrollload = false;
    			})
    		}
    	},
    	shopEnsure(e){//确定
    		if(!this.isMakeSure){return;}
    		this.data[e].multiple = true;
    		this.data[e].button = false;
    		this.data[e].class = '';
    		if(e === 0){
    			this.dataModel.categoryId = [];
    			let ad = []
    			for(let i=0;i<this.clickData.length;i++){
    				if(this.clickData[i].name != '类目'){
    					ad.push(this.clickData[i])
    				}
    			}
    			this.clickData = ad;
    			let arr = []
    			for(let i=0;i<this.data[e].text.length;i++){
    				if(this.data[e].text[i].checked == true){
						this.dataModel.categoryId.push(this.data[e].text[i].id);
						arr.push(i)
						this.clickData.push({name:'类目',value:this.data[e].text[i].name,index:e,indexChild:i,id:this.data[e].text[i].id,distinguish:1})
    				}
    			}
    			setTimeout(()=>{
    				for(let i=0;i<arr.length;i++){
    					this.$refs['textName'+e +arr[i]][0].style.color = 'red';
    				}
    			},20)
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    				let arr1 = res.result.items
	    			for(let i=0;i<arr1.length;i++){
	    				let a = arr1[i].createdTime;
	    				arr1[i].year = a;
	    			}
	    			this.tableData = arr1;
	    			this.isscrollload = false;
    			})
    		}else if(e === 1){
    			this.dataModel.brandId = [];
    			let ad = []
    			for(let i=0;i<this.clickData.length;i++){
    				if(this.clickData[i].name != '品牌'){
    					ad.push(this.clickData[i])
    				}
    			}
    			this.clickData = ad;
    			let arr = []
    			for(let i=0;i<this.data[e].text.length;i++){
    				if(this.data[e].text[i].checked == true){
						this.dataModel.brandId.push(this.data[e].text[i].id);
						arr.push(i)
						this.clickData.push({name:'品牌',value:this.data[e].text[i].name,index:e,indexChild:i,id:this.data[e].text[i].id,distinguish:1})
    				}
    			}
    			setTimeout(()=>{
    				for(let i=0;i<arr.length;i++){
    					this.$refs['textName'+e +arr[i]][0].style.color = 'red';
    				}
    			},20)
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    				let arr1 = res.result.items
	    			for(let i=0;i<arr1.length;i++){
	    				let a = arr1[i].createdTime;
	    				arr1[i].year = a;
	    			}
	    			this.tableData = arr1;
	    			this.isscrollload = false;
    			})
    		}
    	},
    	shopAbrogate(e){//取消
    		this.data[e].multiple = true;
    		this.data[e].button = false;
    		this.data[e].class = '';
    		setTimeout(()=>{
    			if(this.recordData.length>0){
    				for(let i=0;i<this.recordData.length;i++){
    					this.$refs['textName'+e +this.recordData[i]][0].style.color = 'red'
    				}
    				
    			}
    		},100)
    	},
    	Seek(e){//查询条件数据
			this.dataModel.Info = e;
			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
    			let arr = res.result.items
    			for(let i=0;i<arr.length;i++){
    				let a = arr[i].createdTime;
    				arr[i].year = a;
    			}
    			this.tableData = arr;
    			this.isscrollload = false;
    		})	
    	},
    	scrollTable(){//滚动加载数据
    		if(!this.isscrollload && !this.isLoadData){
    			this.isscrollload = true;
				this.CategoryManagement.SkipCount = this.CategoryManagement.SkipCount + 10;
				this.loadTableData();
    		}else if(!this.isscrollload && this.isLoadData){
    			this.isscrollload = true;
    			this.dataModel.skipCount = this.dataModel.skipCount + 10;
    			this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
	    			let arr = res.result.items
	    			for(let i=0;i<arr.length;i++){
	    				let a = arr[i].createdTime;
	    				arr[i].year = a;
	    				this.tableData.push(arr[i])
	    			}
	    		})	
    		}
    	},
    	tabonscroll(){
    					
    	},
    	loadTableData(){
    		this.$axios.gets('/api/services/app/ProductManagement/GetListByCondition',this.CategoryManagement).then((res)=>{
    			let arr = res.result.items
    			if(arr.length !== 0){
    				for(let i=0;i<arr.length;i++){
	    				let a = arr[i].createdTime
	    				arr[i].year = a;
	    				this.tableData.push(arr[i]);
	    			}
	    			setTimeout(()=>{
	    				this.isscrollload = false;
	    			},20)
    			}
    		})
    	},
    	loadMore(event){//加载更多
    		if(event === 0){//点击类目加载更多
    			this.CategoryManagement1.SkipCount = this.CategoryManagement1.SkipCount + 8
    			this.$axios.gets('/api/services/app/CategoryManagement/GetListByCondition',this.CategoryManagement1).then((res)=>{//加载商品类目
	    			let arr = res.result.items;
	    			for(let i=0;i<arr.length;i++){
	    				let obj1 = {id:'',name:'',checked:''};
	    				obj1.id = arr.id;
	    				obj1.name = arr[i].categoryName
	    				this.data[0].text.push(obj1)
	    			}
	    		})
    		}else if(event === 1){//点击品牌加载更多
    			this.CategoryManagement2.SkipCount = this.CategoryManagement2.SkipCount + 8
    			this.$axios.gets('/api/services/app/BrandManagement/GetListByCondition',this.CategoryManagement2).then((res)=>{//加载商品品牌
	    			let arr1 = res.result.items;
	    			for(let i=0;i<arr1.length;i++){
	    				let obj = {id:'',name:'',checked:''};
	    				obj.id = arr1.id;
	    				obj.name = arr1[i].brandName
	    				this.data[1].text.push(obj)
	    			}
	    		})
    		}	
    	},
    	multipleChoice(event,data){//多选
    		this.recordData = [];
    		for(let i=0;i<data[event].text.length;i++){
    			if(this.$refs['textName'+event +i][0].style.color == 'red'){
    				data[event].text[i].checked = true;
    				this.recordData.push(i)
    			}else{
    				data[event].text[i].checked = false;
    			}
    		}
    		this.data[event].multiple = false;
    		this.data[event].button = true;
    		this.data[event].class = 'active';
    	},
    	clickName(event,arr,index){//点击名称查找数据
    	    if(index === 0){//点击类目
    	    	if(this.data[index].multiple && this.$refs['textName'+index +event][0].style.color != 'red'){
    	    		for(let i=0;i<arr.length;i++){
	    				this.$refs['textName'+index + i][0].style.color = '#606266';
	    			}
	    			this.dataModel.categoryId = [arr[event].id];
    	    	}
    	    	let ac = []
	    		for(let i=0;i<this.clickData.length;i++){
    				if(this.clickData[i].name != '类目'){
    					ac.push(this.clickData[i])
    				}
    			}
    	    	if(this.data[index].multiple){
    	    		if(this.$refs['textName'+index +event][0].style.color == 'red'){
	    	    		this.$refs['textName'+index + event][0].style.color = '#606266';
                        for(let j=0;j<this.dataModel.categoryId.length;j++){
                            if(this.dataModel.categoryId[j] == arr[event].id){
                                this.dataModel.categoryId.splice(j,1)
                            }
                            
                        }
	    	    		for(let i=0;i<this.clickData.length;i++){
		    				if(this.clickData[i].name == '类目' && this.clickData[i].value === arr[event].name){
		    					this.clickData.splice(i,1);
		    				}
		    			}
	    	    	}else{
	    	    		this.$refs['textName'+index +event][0].style.color = 'red';
	    	    		this.clickData = ac.concat([{name:'类目',value:arr[event].name,index:index,indexChild:event,id:arr[event].id,distinguish:0}])
	    	    	}
	    	    	this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
	    				let arr1 = res.result.items
		    			for(let i=0;i<arr1.length;i++){
		    				let a = arr1[i].createdTime;
		    				arr1[i].year = a;
		    			}
		    			this.tableData = arr1;
		    			this.isscrollload = false;
	    			})
    	    	}
    		}else if(index === 1){//点击品牌
    			if(this.data[index].multiple && this.$refs['textName'+index +event][0].style.color != 'red'){
    	    		for(let i=0;i<arr.length;i++){
	    				this.$refs['textName'+index + i][0].style.color = '#606266';
	    			}
	    			this.dataModel.brandId = [arr[event].id];
    	    	}
    	    	let ac = []
	    		for(let i=0;i<this.clickData.length;i++){
    				if(this.clickData[i].name != '品牌'){
    					ac.push(this.clickData[i])
    				}
    			}
    	    	if(this.data[index].multiple){
    	    		if(this.$refs['textName'+index +event][0].style.color == 'red'){
	    	    		this.$refs['textName'+index + event][0].style.color = '#606266';
	    	    		for(let j=0;j<this.dataModel.brandId.length;j++){
                            if(this.dataModel.brandId[j] == arr[event].id){
                                this.dataModel.brandId.splice(j,1)
                            }
                            
                        }
	    	    		for(let i=0;i<this.clickData.length;i++){
		    				if(this.clickData[i].name == '品牌' && this.clickData[i].value == arr[event].name){
		    					console.log(arr[event].name)
		    					this.clickData.splice(i,1);
		    				}
		    			}
	    	    	}else{
	    	    		this.$refs['textName'+index +event][0].style.color = 'red';
	    	    		this.clickData = ac.concat([{name:'品牌',value:arr[event].name,index:index,indexChild:event,id:arr[event].id,distinguish:0}])
	    	    	}
	    	    	this.$axios.posts('/api/services/app/ProductManagement/GetFilterProductList',this.dataModel).then((res)=>{
	    				let arr1 = res.result.items
		    			for(let i=0;i<arr1.length;i++){
		    				let a = arr1[i].createdTime;
		    				arr1[i].year = a;
		    			}
		    			this.tableData = arr1;
		    			this.isscrollload = false;
	    			})	
    	    	}
    		}else if(index === 2){//点击年份
    		}	
    	},
    	putIn(e,arr){//鼠标移入
    		clearInterval(this.timeId)	
    		if(!arr[e].show){
    			for(let i=0;i<arr.length;i++){
	    			this.$refs['minWidth'+i][0].children[0].style.borderBottom = '1px solid #e4e4e4'
		    		this.$refs['minWidth'+i][0].children[0].style.zIndex = '0'
		    		// this.$refs['minWidth'+i][0].children[0].style.display = 'block';
		    		arr[i].show = false;
	    		}
	    		this.$refs['minWidth'+e][0].children[0].style.borderBottom = 'none'
	    		this.$refs['minWidth'+e][0].children[0].style.zIndex = '999'
	    		arr[e].show = true;
	    		// this.$refs['minWidth'+e][0].children[1].style.display = 'block';
	    		if(arr[e].arr.length  == 0){
	    			this.$axios.gets('/api/services/app/PropertyValueManagement/GetPropertyId',{PropertyId:arr[e].id}).then((res)=>{
						 
						let arr1 = res.result.items;
						let obj = [];
						for(let i=0;i<arr1.length;i++){
							let obj1 = {propertyValueName:'',id:'',class:false,abc:false}
							obj1.propertyValueName = arr1[i].propertyValueName;
							obj1.id = arr1[i].id;
							obj.push(obj1)
						}
						this.data[2].text[e].arr = obj;
					})
	    		} 
    		}
    		
    		

    	},
    	leave(e,arr){//鼠标移除
    		this.timeId = setTimeout(()=>{
    			arr[e].show = false;
    			this.$refs['minWidth'+e][0].children[0].style.borderBottom = '1px solid #e4e4e4'
	    		this.$refs['minWidth'+e][0].children[0].style.zIndex = '0'
	    		// this.$refs['minWidth'+e][0].children[1].style.display = 'none';
    		},400)
    	},
    	moreSearch(){
    		if(this.activeName === '1'){
    			this.activeName = 'first'
    		}else{
    			this.activeName = '1'
    		}
    		if(this.isbrand && this.iscategory){//只加载一次数据
    			this.isbrand = false;
    			this.iscategory = false;
    			this.$axios.gets('/api/services/app/CategoryManagement/GetListByCondition',this.CategoryManagement1).then((res)=>{//加载商品类目
	    			let arr = res.result.items;
	    			
	    			let a = []
	    			for(let i=0;i<arr.length;i++){
	    				let obj1 = {id:'',name:'',checked:''};
	    				obj1.id = arr[i].id;
	    				obj1.name = arr[i].categoryName
	    				a.push(obj1)
	    			}
	    			this.data[0].text = a
	    			// console.log(a)
	    		})
	    		this.$axios.gets('/api/services/app/BrandManagement/GetListByCondition',this.CategoryManagement1).then((res)=>{//加载商品品牌
	    			let arr1 = res.result.items;
	    			let b = []
	    			for(let i=0;i<arr1.length;i++){
	    				let obj = {id:'',name:'',checked:''};
	    				obj.id = arr1[i].id;
	    				obj.name = arr1[i].brandName
	    				b.push(obj)
	    			}
	    			this.data[1].text = b
	    		})
	    		this.$axios.gets('/api/services/app/PropertyManagement/GetListByCondition',this.CategoryManagement1).then((res)=>{//加载商品属性
	    			let arr2 = res.result.items;
	    			let c = []
	    			for(let i=0;i<arr2.length;i++){
	    				let obj = {id:'',name:'',arr:[],checked:'',button:true,isMakeSure:false,show:false};
	    				obj.id = arr2[i].id;
	    				obj.name = arr2[i].propertyName
	    				c.push(obj)
	    			}
	    			this.data[2].text = c;
	    		})
    		}
    	}

    }
  };
</script>
<style scoped>

.el-menu--horizontal .el-menu-item{float: left;font-size: 14px}

</style>
<style type="text/css">
/*body .el-menu--horizontal{display: block!important;}*/
.Search-Goods{width: 1200px;text-align: center;margin-left: 340px;overflow: visible;}
.Search-Goods .el-dialog{width: 100%;    margin: 0;}
.Search-Goods .el-dialog__header{display: none;}
.Search-Goods .el-dialog__body{padding: 0}
.Search-Goods .Goods-box{padding: 0 35px 0;}
.Search-Goods .header1{padding:15px;height: 40px;line-height: 40px;border-bottom: 1px solid #e4e4e4}
.Search-Goods .header1 .title-Search h4{font-size: 24px}
.Search-Goods .header1 .new-button {padding: 8px 10px;}
.Search-Goods .header1 .Search-ipt .int-div{position: relative;float: right;width: 80%;text-align: right;}
.Search-Goods .header1 .Search-ipt .int{width: 80%;}
.Search-Goods .header1 .Search-ipt .int input{    height: 30px;border-radius: 15px;    text-indent: 20px;}
.Search-Goods .header1 .Search-ipt button{padding: 6px 10px;border: none;background: green;color: #fff;border-radius: 17px;position: absolute;    top: 5px;right:1px;}
.Search-Goods .header1 .Search-ipt i{    font-size: 20px;
    position: absolute;
    top: 0;
    left: 61px;}
.Search-Goods .header1 .more-box .el-button{padding: 7px 10px;    border-radius: 15px;
    color: #e4e4e4;
    background: #fff;
    border-color: #e4e4e4;}
.Goods-box .tableData-box .el-table td{    padding: 7px 0;}
.Search-Goods .header1 .more-box .first{color: red}
.Search-Goods .el-dialog__body{    padding-bottom: 20px;border-radius: 20px;}
.Search-Goods .header1 .close{line-height: 40px;}
.Search-Goods .header1 .close i{    font-size: 30px;}
.Goods-box .more-big{padding-bottom: 30px;}
.Goods-box .more-big .active{border:1px solid #e4e4e4;}
.Goods-box .more-big .el-tabs__header{display: none;}
.Goods-box .more-big .title-more-big{font-weight: 600; text-align: right;margin-right: 15px}
.Goods-box .more-big .text-big{text-align: left;}
.Goods-box .more-big .increase-data{text-align: left;padding:6px}
.Goods-box .more-big .increase-data .list{display:inline-block;background: #f3f3f3;border: 1px solid #DDD;margin:0 5px 5px 0;cursor:pointer;    padding: 3px 29px 3px 6px;    position: relative;}
.Goods-box .more-big .increase-data .list span{color: red}
.Goods-box .more-big .increase-data .list i{position: absolute;right: 0;
    top: 0;
    font-size: 16px;
    padding: 0 5px;
    line-height: 26px;}

.Goods-box .more-big .increase-data .list:hover{border: 1px solid red;}
.Goods-box .more-big .increase-data .list:hover i{background-color: red;color: #fff;}

.Goods-box .more-big .advanced{height:30px;display:inline-block;margin-right:15px;}
.Goods-box .more-big .advanced .advanced-a i{margin-left: 3px}
.Goods-box .more-big .advanced .el-submenu__title-left{position: absolute;left: 0px; top: 31px;width: 98%; background: #fff; border: 1px solid #e4e4e4; z-index: 9;display:none;    padding: 10px;min-height:40px;display: block;}
.Goods-box .more-big .advanced .el-submenu__title-left .el-submenu__title-left-button{float:none;clear: both;text-align: center;padding-top: 10px;}
.Goods-box .more-big .advanced .el-submenu__title-left .el-submenu__title-left-button .btn1{padding: 4px 13px 5px;
										    background: #FFF;
										    color: #CCC;
										    border: 1px solid #DDD;    margin-right: 8px;}
.Goods-box .more-big .advanced .el-submenu__title-left .el-submenu__title-left-button .btn2{border: 1px solid #DDD;
										    padding: 4px 13px 5px;
										    color: #666;
										    background-color: #f7f7f7;}
.Goods-box .more-big .advanced .el-submenu__title-left li{line-height:35px;    float: left;    margin-bottom: 4px;margin-right: 50px;}
.Goods-box .more-big .text-big .el-menu--horizontal{border:none;position: absolute;}
.Goods-box .more-big .text-big  .el-submenu__title{height: 30px;
    border: 1px solid #e4e4e4;
    line-height: 30px;
    padding: 0 10px;
    display: inline-block;border-bottom-color: #e4e4e4!important;background: #fff;}
.Goods-box .more-big .left-more .bor-cen span{border: 1px solid #e4e4e4;display: inline-block;padding:0px 13px;height: 25px;line-height: 25px}
.Goods-box .more-big .left-more .max-height{max-height: 140px;overflow:auto}
.Goods-box .more-big .left-more .add-sty{text-align:left;overflow: visible;}
.Goods-box .more-big .left-more .shopEnsure-box .shopEnsure{padding: 4px 13px 5px;
    background: #FFF;
    color: #CCC;
    border: 1px solid #DDD;    margin-right: 8px;}
.Goods-box .more-big .left-more .shopEnsure-box{text-align: center;    padding: 10px 0 5px 0;}
.Goods-box .more-big .left-more .shopEnsure-box .shopAbrogate{    border: 1px solid #DDD;
    padding: 4px 13px 5px;
    color: #666;
    background-color: #f7f7f7;}

.Goods-box .more-big .left-more .add-sty .col-red{cursor: pointer;}
.Goods-box .more-big .left-more .add-sty .col-red:hover{color: red;}
.Goods-box .more-big .left-more{min-height: 35px;line-height: 35px}
.Goods-box .more-big .right-more{line-height: 35px}
.Goods-box .more-big .right-more .tex{text-align: right;}
.Goods-box .more-big .right-more .tex1{text-align: left;}
.Goods-box .more-big .right-more button{background: #fff;
    border: 1px solid #e4e4e4;
    padding: 3px 15px;}
/*.el-menu--horizontal{width: 1000px}*/
.el-tabs__content{overflow: visible;}
.bg-color{background-color: red!important;color: #fff!important;}
.color-red{color: red}
</style>