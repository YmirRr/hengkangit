/* 新增 + 修改 + 删除 */
export function terraceAdd(_this,item,url){
	return _this.$axios.posts(url,item).then((res)=>{
		_this.isterrace = false;
		_this.dialogAddCheck = false;
		open(_this,'保存成功','el-icon-circle-check','successERP');
		_this.$store.dispatch('InitTree');
		return Promise.resolve(res);
	},(res)=>{
		ERRAYTwo(_this,res.error.message,"submit",res.error.message,res.error.message);
		return Promise.resolve(res);
	})
}
// 修改
export function terraceUpdate(_this,item,url){
	return _this.$axios.puts(url,item).then((res)=>{
		_this.isterrace = false;
		_this.dialogAddCheck = false;
		open(_this,'保存成功','el-icon-circle-check','successERP');
		_this.$store.dispatch('InitTree');
		return Promise.resolve(res);
	},(res)=>{
		ERRAYTwo(_this,res.error.message,"submit",res.error.message,res.error.message);
		return Promise.resolve(res);
	})
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

function ERRAYTwo(_this,text,type,val,det){
	_this.dialogSetting.dialogName = 'showErMsgDialog'
    _this.dialogSetting.message = text;
    _this.dialogSetting.dialogType = type;
    _this.errorTips.message =  val;
    _this.errorTips.details = det;
    _this.dialogCommand = [{text:'确定',class:'btn-cancel'}];
    _this.dialogUserConfirm = true;
}