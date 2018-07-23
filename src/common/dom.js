
export function addCol(abc,item){//新增按钮
	let newArrayLength=abc.$store.state[abc.tableModel+'NewColArray'].length;
    if(newArrayLength>2){
        abc.$message({
            type: 'info',
            message: '请先编辑保存新增项'
        });
    }else{
        abc.isSave=false;
        abc.$store.dispatch('addCol',item);//表格行内新增
    } 
}

export function cancel(_this){//取消按钮
    ERRAY(_this,'cancelDialog',"此操作将忽略您的更改，是否继续？",'confirm')
}

export function delBatch(_this,item,text,sub){//删除按钮	
    if(item.length==0){
        _this.$message({
            type: 'info',
            message: text
        });
    }else{
    	ERRAY(_this,'delDialog',"确定删除？",sub)
    } 
}

export function save(_this,url){//保存按钮
	let newArray=_this.$store.state[_this.tableModel+'NewColArray'];
    let newArrayLength=_this.$store.state[_this.tableModel+'NewColArray'].length;
    let updateArray=_this.$store.state[_this.tableModel+'UpdateColArray'];
    let updateArrayLength=_this.$store.state[_this.tableModel+'UpdateColArray'].length;
    let tableData=_this.$store.state[_this.tableModel+'Table'];
    if(newArrayLength>0){
        _this.isSave=true;
        for(let i in newArray){
            if(newArray[i].specValueCode == "" || newArray[i].specValueCode==""){
                _this.$message({
                    message: '红色框内为必填项！',
                    type: 'error'
                });
                return;
            }
        }
    }
    if(newArrayLength>0||updateArrayLength>0){
        _this.$axios.posts(url,{createList:newArray,updateList:updateArray,}).then(function(res){
            _this.$store.commit('setAddColArray',[])//置空新增集合
            _this.$store.commit('get_RowId',"")//置空修改行id
            _this.$store.commit('setUpdateColArray',[])//置空修改集合
            _this.$store.dispatch('InitTable');
            _this.isSave=false;
            open(_this,'保存商品规格值成功','el-icon-circle-check','successERP');  
        }).catch(function(err){
            ERRAYTwo(_this,err.error.message,"submit",err.error.message)
        })   
    }  
}

export function handleStatus(_this,statu){//启用和停用按钮
	let handleArray = [];
    _this.SelectionChange = _this.$store.state[_this.tableModel+'Selection'];
    let tableData = _this.$store.state[_this.tableModel+'Table'];
    if(_this.SelectionChange.length>0){
        for(let o in _this.SelectionChange){
            _this.$store.commit('Add_UpdateArray',_this.SelectionChange[o])
            handleArray.push(_this.SelectionChange[o])
        }
        for(let i in handleArray){
            for(let j in tableData){
                if (handleArray[i].id == tableData[j].id){
                   tableData[j].status = statu;
                }
            }
        }
    }else if(_this.SelectionChange.length == 0){
        _this.$message({type: 'info',message: '请勾选需要更改状态的记录！' });
    }
}

export function treeclick(_this,url,data,page){
    _this.tableLoading=true;
    _this.$axios.gets(url,_this.queryParams).then(function(res){ 
        console.log(res)
    	_this.isClickTree = true;                    
        _this.$store.commit('Init_Table',res.result.items);
        let totalPage=Math.ceil(res.result.totalCount/page);
        _this.$store.commit('Init_pagination',totalPage);
        _this.$store.commit('Init_TotalCount',res.result.totalCount);
        _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1    
    })
}

export function treecancel(_this){//取消按钮
    ERRAY(_this,'treecancel',"此操作将忽略您的更改，是否继续？",'confirm')
}

export function GetDateTime(){
	let date=new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function loadData(_this,url){
	return _this.$axios.gets(url,{SkipCount:0,MaxResultCount:1}).then(function(res){ 
        let totalAll = res.result.totalCount;
        if(totalAll > 0){
            return _this.$axios.gets(url,{SkipCount:0,MaxResultCount:totalAll}).then(function(res){
                return Promise.resolve(res.result.items);
            })
        }   
    })   	
}

export function loadSelect(_this,url){
	return _this.$axios.gets(url,{dictName:'Status002'}).then(function(res){
        return Promise.resolve(res.result);
    })
}

export function loadOfSelect(_this,url,id,idname){
    return _this.$axios.gets(url,{idname:id}).then(function(res){
        return Promise.resolve(res.result);
    })
}

export function dialogOnClick(_this,parmas,url,isbull,id){
	_this.dialogVisible=false;
    if(isbull){
        if(parmas.dialogButton=="确定"){
            _this.$axios.deletes(url,{Id:id}).then((res)=>{
                open(_this,'删除成功','el-icon-circle-check','successERP'); 
                // _this.$store.commit('Init_Tree',res.result.items);
                 _this.$store.dispatch('InitTree');
            },(res)=>{
                ERRAYTwo(_this,res.error.message);
            })
        }else{
            return;
        }   
    }else{
        if(parmas.dialogButton=="确定"){
            if(parmas.dialogName == 'userPrompts'){//用户提示
                return ;
            }else if(parmas.dialogName=="delDialog"){//删除操作
                _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                for(var i in _this.SelectionChange){
                    _this.idArray.ids.push(_this.SelectionChange[i].id)
                }
                if(_this.idArray.ids.indexOf(undefined)!=-1){
                        _this.$message({
                            type: 'warning',
                            message: '新增数据请在行内删除'
                        });
                        _this.dialogVisible=false;
                        _this.idArray.ids=[];
                        return;
                }
                if(_this.idArray.ids.length>0){
                    _this.$axios.posts(url,_this.idArray).then(function(res){
                        _this.$store.dispatch('InitTable');
                        _this.$store.commit('setTableSelection',[])
                        _this.idArray.ids=[];
                        _this.dialogVisible=false;
                        open(_this,'删除成功','el-icon-circle-check','successERP');    
                    },function(res){
                        ERRAYTwo(_this,res.error.message)
                    })
                }
            }else if(parmas.dialogName=="cancelDialog"){//取消操作
                _this.isSave=false;
                _this.dialogVisible=false;//关闭对话框
                _this.$store.dispatch('InitTable');
                _this.$store.commit('setAddColArray',[])//置空新增集合
                _this.$store.commit('setUpdateColArray',[])//置空修改增集合
            }else if(parmas.dialogName=="treecancel"){
                _this.isClickTree = false;
                _this.isSave=false;
                _this.dialogVisible=false;//关闭对话框
                _this.$store.dispatch('InitTable');
                _this.$store.commit('setAddColArray',[])//置空新增集合
                _this.$store.commit('setUpdateColArray',[])//置空修改增集合
                loadCheckSelect(_this,'specification',_this.value.id);
            }
        }else{
            if(parmas.dialogName=="delDialog"){//多选删除取消操作
                _this.$store.commit('setTableSelection',[])//置空多选
            }else if(parmas.dialogName=="treecancel"){
                _this.isClickTree = true;
                loadCheckSelect(_this,'specification',_this.value1.id);
            }
            _this.dialogVisible=false;
        } 
    }
		
}

function loadCheckSelect(_this,selectName,key){
	_this.$nextTick(function () { 
	    $('.'+selectName+' .el-tree-node__label').each(function(){
	         if($(this).attr('data-id')==key){
	            $(this).click()
	        }
	    })
	})
}

function ERRAY(_this,Name,text,type,val,det){
	_this.dialogSetting.dialogName = Name
    _this.dialogSetting.message = text;
    _this.dialogSetting.dialogType = type;
    _this.errorTips.message = val;
    _this.errorTips.details = det;
    _this.dialogCommand = [{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
    _this.dialogVisible = true;
}

function ERRAYTwo(_this,text,type,val,det){
	_this.dialogSetting.dialogName = 'userPrompts'
    _this.dialogSetting.message = text;
    _this.dialogSetting.dialogType = type;
    _this.errorTips.message =  val;
    _this.errorTips.details = det;
    _this.dialogCommand = [{text:'确定',class:'btn-cancel'}];
    _this.dialogVisible = true;
}

function open(_this,tittle,iconClass,className){
	_this.$notify({
	    position: 'bottom-right',
	    iconClass:iconClass,
	    title: tittle,
	    showClose: false,
	    duration: 3000,
	    customClass:className
    });
}