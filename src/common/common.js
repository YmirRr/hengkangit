import store from '../store'
/**
* Excel导入
* @paramthis=>this指向,excelCloum=>表头列名,excelDataName=>解析后装入json数据的模型名称,inputer=>dom节点
*@excelColumn:[{name:'品牌名称',Ename:'brandName'}]
* @authoryuhuan 2018/05/17
*/
export function IMPORT_EXCEL(_this,excelColumn,excelDataName,inputer){
    let inputDOM = inputer;
    // 通过DOM取文件数据
    _this.file = event.currentTarget.files[0];
    var rABS = false; //是否将文件读取为二进制字符串
    var f = _this.file;
    var reader = new FileReader();
    FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = _this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if(rABS) {
                wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                    type: 'base64'
                });
            } else {
                wb = XLSX.read(binary, {
                    type: 'binary'
                });
            }
            const headers = {};
            const data = [];
            const keys=Object.keys(wb.Sheets[wb.SheetNames[0]]);
            keys.filter(k => k[0] !== '!').forEach(k => {
                // 如 A11 中的 A
                let col = k.substring(0, 1);
                // 如 A11 中的 11
                let row = parseInt(k.substring(1));
                // 当前单元格的值
                let value = wb.Sheets[wb.SheetNames[0]][k].v;
                for(var i in excelColumn){
                    if(excelColumn[i].name==value){
                        value=excelColumn[i].Ename;
                    }
                }
                // 保存字段名
                if (row === 1) {
                    headers[col] = value;
                    return;
                }
                // 解析成 JSON
                if (!data[row]) {
                    data[row] = {};
                }
                data[row][headers[col]] = value;
            });
            _this[excelDataName]=data.splice(2,data.length-1);
            _this.$message({
                message: '导入成功',
                type: 'success'
            });
            // outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata为excel解析后的json对象
            // this.da = [...outdata]
            let para = {
                withList:_this[excelDataName]
            }                     
        }
        reader.readAsArrayBuffer(f);
    }
    if(rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}
/**
* Excel导出
* @paramthis=>this指向,dataList=>需要导出的数据源,HeaderName=>导出后的字段名,HeaderEname=>需要导出的数据字段名
* @authoryuhuan 2018/05/23
*/
export function EXPORT_EXCEL(_this,dataList,HeaderName,HeaderEname,excelName){
    _this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        EXPORT_TO_EXCEL(_this,HeaderName,HeaderEname,dataList,excelName)
    }).catch(() => {
    
    });
}
export function EXPORT_TO_EXCEL(_this,HeaderName,HeaderEname,dataList,excelName) {
    var that = this;
    require.ensure([], () => {
        const { export_json_to_excel } = require('./excel/Export2Excel'); //这里必须使用绝对路径
        const data =FORMAT_JSON(HeaderEname, dataList);
        export_json_to_excel(HeaderName, data, excelName);// 导出的表格名称，根据需要自己命名
    })
}
export function FORMAT_JSON(HeaderEname, jsonData) {
    // jsonData.map(function(k){
    //     console.log(k)
    //     HeaderEname.map(function(j){
    //         console.log(j);
    //     })
    // });
    return jsonData.map(v =>HeaderEname.map(j => v[j]))
}
/**
* 深度克隆数据
* @paramsource数据源
* @authoryuhuan 2018/05/23
*/
export function DEEP_CLONE(source){
    if(!source || typeof source !== 'object'){
        throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for(var keys in source){
        if(source.hasOwnProperty(keys)){
            if(source[keys] && typeof source[keys] === 'object'){
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = DEEP_CLONE(source[keys]);
            }else{
            targetObj[keys] = source[keys];
            }
        } 
    }
    return targetObj;
}
/**
* 新增页签
* @paramname页签菜单名称，menuUrl存放在store中的name
* @authoryuhuan 2018/06/20
*/
export function ADD_BOOKMARK(name,menuUrl,flag,param,_this){
    var slideArray= window.localStorage.getItem('ERP');
    var BookMarkArray=[];
    if(slideArray!=null){
        BookMarkArray= JSON.parse(slideArray)
    }else{
        BookMarkArray=_this.$store.state.temporary;
    }
    if(BookMarkArray.length==0){//temporary为空
        flag=true;
       // BookMarkArray=[];
    }else{//temporary不为空
        for(var i=0;i<BookMarkArray.length;i++){
            if(BookMarkArray[i].name==name){//相同页签
                flag=false;
                BookMarkArray[i].id=param;
                window.localStorage.setItem('ERP',JSON.stringify(BookMarkArray));
                _this.$store.commit('slidbarData');
                _this.$router.push({name:menuUrl,params:{id:param}});
                break;
            }else{
                flag=true;
            }   
        }
    }
    // var pushItem={'name':name,'url':menuUrl,'id':"default",routeID:param};
    var pushItem={'name':name,'url':menuUrl,'id':param};
    _this.$store.state.url=menuUrl;//储存当前url在router里的name
    if(flag){
        if(typeof(_this.$store.state.routes[menuUrl])!='undefined'){
            if(typeof(_this.$store.state.routes[menuUrl].url)!='undefined' && typeof(_this.$store.state.routes[_this.$store.state.routes[menuUrl].parent])!='undefined'){
                BookMarkArray.push(pushItem);
                window.localStorage.setItem('ERP',JSON.stringify(BookMarkArray));
                _this.$router.push({name:_this.$store.state.url,params:{id:param}});
            }else{
                _this.$message({
                    showClose: true,
                    message: '路由重定向出错!',
                    type: 'warning'
                });
            }
            
        }else{
            _this.$message({
                showClose: true,
                message: '路由重定向未定义!',
                type: 'warning'
            });
        }
    }
    if(_this.$route.fullPath=='/'){
        $.each(BookMarkArray,function(index,val){
            if(val.name==pushItem.name){
                BookMarkArray.splice(index,1)
            }
        })
        window.localStorage.setItem('ERP',JSON.stringify(BookMarkArray));
    }
    //_this.$router.push({name:_this.$store.state.url,params:{id:'default'},query:{name:param}});
     
}
/**
* 自定义搜索方法
* @paramfilterKey搜索关键字，filterArray搜索目标数组
* @authoryuhuan 2018/06/20
*/
export function FILTER_MOTHED(filterKey,filterArray){
    var query =String(filterKey)&&String(filterKey).toLowerCase()
            if (query) {
                return filterArray.filter(function (data) {
                    return Object.keys(data).some(function (key) {
                        return String(data[key]).toLowerCase().indexOf(query) > -1
                    })
                })
            }
    return filterArray;
}