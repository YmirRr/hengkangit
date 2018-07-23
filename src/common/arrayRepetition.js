
export function ArrRepetition(arr){
	let allArr = [];//新数组
	for(var i=0;i<arr.length;i++){
	　　var flag = true;
	　　for(var j=0;j<allArr.length;j++){
	　　　　if(arr[i].id == allArr[j].id){
	　　　　　　flag = false;
				allArr[j].find = allArr[j].find.concat(arr[i].find);
	　　　　};
	　　}; 
	　　if(flag){
	　　　　allArr.push(arr[i]);
	　　};
	};
	return allArr;
}



function shop(){
	if(index === 0){//点击类目
    	if(this.ismultipleChoice !== 'multipleChoice0' && this.$refs['textName'+index +event][0].style.color != 'red'){
    		for(let i=0;i<arr.length;i++){
				this.$refs['textName'+index + i][0].style.color = '#606266';
			}
    	}
    	if(this.$refs['textName'+index +event][0].style.color == 'red'){
    		this.$refs['textName'+index + event][0].style.color = '#606266';
    		let str = ''+index+event;
    		let arr = []
    		for(let i=0;i<this.tableData.length;i++){
    			if(this.tableData[i].find.length == 1){
    				if(this.tableData[i].find[0] != str){
    					arr.push(this.tableData[i])
    				}
    			}else{
    				for(let j=0;j<this.tableData[i].find.length;j++){
    					if(this.tableData[i].find[j] == str){
    						this.tableData[i].find.splice(j,1)
    						arr.push(this.tableData[i])
    					}
    				}
    			}
    		}
    		this.tableData = arr;
    		this.iscategoryName = arr;
    	}else{
    		this.$refs['textName'+index +event][0].style.color = 'red';
    		this.$axios.gets('/api/services/app/ProductManagement/GetFilterProductList',{CategoryId:arr[event].id}).then((res)=>{
				let arr = res.result.items
    			for(let i=0;i<arr.length;i++){
    				arr[i].createdTime.substr(0,4);
    				let a = arr[i].createdTime;
    				arr[i].year = a.substr(0,4);
    				arr[i].find = [''+index+event];
    			}
				if(this.ismultipleChoice === 'multipleChoice0'){//类目更多激活
					if(!this.iscategoryfirst && this.iscategoryName.length == 0 && this.isbrandName.length == 0){
						this.tableData = arr;
						this.iscategoryfirst = true;
					}else{
						this.tableData = ArrRepetition(this.tableData.concat(arr));
						this.iscategoryName = this.tableData;
					}
				}else{//类目更多未激活
					this.iscategoryName = arr;//类目有数据
    				if(this.isbrandName.length > 0){//类目有数据
    					this.tableData = this.isbrandName;
    					this.tableData = ArrRepetition(this.tableData.concat(arr));
    				}else{//类目没有数据
    					this.tableData = arr
    				}
				}
			})
    	}
	}else if(index === 1){//点击品牌
		if(this.ismultipleChoice !== 'multipleChoice1' && this.$refs['textName'+index +event][0].style.color != 'red'){
    		for(let i=0;i<arr.length;i++){
				this.$refs['textName'+index + i][0].style.color = '#606266';
			}
    	}
    	if(this.$refs['textName'+index +event][0].style.color == 'red'){
    		this.$refs['textName'+index + event][0].style.color = '#606266';
    		let str = ''+index+event;
    		let arr = []
    		for(let i=0;i<this.tableData.length;i++){
    			if(this.tableData[i].find.length == 1){
    				if(this.tableData[i].find[0] != str){
    					arr.push(this.tableData[i])
    				}
    			}else{
    				for(let j=0;j<this.tableData[i].find.length;j++){
    					if(this.tableData[i].find[j] == str){
    						this.tableData[i].find.splice(j,1)
    						arr.push(this.tableData[i])
    					}
    				}
    			}
    		}
    		this.tableData = arr;
    		this.isbrandName = arr;
    	}else{
    		this.$refs['textName'+index +event][0].style.color = 'red';
			this.$axios.gets('/api/services/app/ProductManagement/GetFilterProductList',{BrandId:arr[event].id}).then((res)=>{
				let arr = res.result.items
    			for(let i=0;i<arr.length;i++){
    				arr[i].createdTime.substr(0,4);
    				let a = arr[i].createdTime;
    				arr[i].year = a.substr(0,4);
    				arr[i].find = [''+index+event];
    			}
    			console.log(arr)
    			if(this.ismultipleChoice === 'multipleChoice1'){//
    				if(!this.isbrandfirst && this.iscategoryName.length == 0 && this.isbrandName.length == 0){
						this.tableData = arr;
						this.isbrandfirst = true;
					}else{
						this.tableData = ArrRepetition(this.tableData.concat(arr));
						this.isbrandName = this.tableData;
					}
    			}else{
    				this.isbrandName = arr; //品牌有数据
    				if(this.iscategoryName.length > 0){//类目有数据
    					this.tableData = this.iscategoryName;
    					this.tableData = ArrRepetition(this.tableData.concat(arr));
    				}else{//类目没有数据
    					this.tableData = arr
    				}
    			}
    			
			})
    	}	
	}else if(index === 2){//点击年份
		for(let i=0;i<arr.length;i++){
			this.$refs['textName'+index + i][0].style.color = '#606266';
		}
		this.$refs['textName'+index +event][0].style.color = 'red';
	}	
}

