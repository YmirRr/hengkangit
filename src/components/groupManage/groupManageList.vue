<template>
    <div class="groupList">
        <el-row class="h48 bg-white fixed" >
            <!-- <button v-on:click="Update()" class="erp_bt bt_modify"><div class="btImg"><img src="../../../static/image/common/bt_modify.png"></div><span class="btDetail">修改</span></button>            -->
            <!-- <button v-on:click="Save()"  class="erp_bt bt_save"><div class="btImg"><img src="../../../static/image/common/bt_save.png"></div><span class="btDetail">保存</span></button>
            <button v-on:click="Cancel()" :disabled="isCancel" class="erp_bt bt_cancel"><div class="btImg"><img src="../../../static/image/common/bt_cancel.png"></div><span class="btDetail">取消</span></button>
            <button class="erp_bt bt_print"><div class="btImg"><img src="../../../static/image/common/bt_print.png"></div><span class="btDetail">打印</span></button>  -->
             <!-- <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>     -->
                <div class="btnGroup-box">
                    <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>   
                </div>
        </el-row>
        
        <el-row class="bg-white pt20" :ifSave="isSave">
                <div class="bgcolor reset">
                    <label>集团编码</label><el-input v-model="entryItem.groupCode"></el-input>
                </div>
                <div class="bgcolor reset">
                    <label>集团名称</label><el-input v-model="entryItem.groupName" ></el-input>
                    </div>
                <div class="bgcolor reset">
                    <label>集团全称</label><el-input v-model="entryItem.groupFullname" ></el-input>
                </div>
                <div class="bgcolor reset">
                    <label>会计方案</label>
                    <el-select clearable v-model="entryItem.accSchemeId"  @change="seletChange">
                        <el-option v-for="item in accSchemeIdOptions"  :key="item.itemValue" :label="item.itemName" :value="item.itemValue">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor area">
                    <label>行政地区</label>
                    <div class="areaBox">
                        <el-select v-model="entryItem.areaProId" class="areaDrop" placeholder="选择省"   @change="ChoosePro()">
                            <el-option v-for="item in areaProArray" :key="item.id" :label="item.areaName" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-show="areaCity" v-model="entryItem.areaCityId" class="areaDrop" placeholder="选择市"  @change="ChooseCity()"  >
                            <el-option v-for="item in areaCityArray" :key="item.id" :label="item.areaName" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-show="areaDis" v-model="entryItem.areaDisId" class="areaDrop" placeholder="选择区"  @change="ChooseDis()" >
                            <el-option v-for="item in areaDisArray" :key="item.id" :label="item.areaName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="bgcolor reset">
                    <label>启用会计月份</label>
                    <el-select  v-model="entryItem.basAccperiodContentId" >
                        <el-option v-for="item in accountYearOptions" :key="item.accperiodContentId" :label="item.accountYear" :value="item.accperiodContentId">
                        </el-option>

                    </el-select>
                </div>
                <div class="bgcolor reset">
                    <label>本位币种</label>
                    <el-select  v-model="entryItem.localCurrencyId" >
                        <el-option v-for="item in currencyOptions" :key="item.id" :label="item.currencyName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="bgcolor reset"><label>所属行业</label><el-input v-model="entryItem.industry" ></el-input></div>
                <div class="bgcolor reset"><label>电话</label><el-input v-model="entryItem.phone" ></el-input></div>
                <div class="bgcolor reset"><label>传真</label><el-input v-model="entryItem.fax" ></el-input></div>
                <div class="bgcolor reset"><label>总部地址</label><el-input v-model="entryItem.address" ></el-input></div>
                <div class="bgcolor reset"><label>备注</label><el-input v-model="entryItem.remark"></el-input></div>
                <div class="bgcolor reset"><label>时区</label>
                     <el-select  v-model="entryItem.timeZoneId" >
                        <el-option v-for="item in timeZoneOptions" 
                                       :key="item.itemValue" 
                                       :label="item.itemName" 
                                       :value="item.itemValue">
                        </el-option>
                     </el-select>
                </div>
        </el-row>
        <el-row class="bg-white">
            <el-col :span='24' >
                <el-row class="pl10 pt10 pr10 pb10 border-bottom">
                    <el-col :span='24' class="ml10 border-left">
                        <el-table :data="tableData"  style="width: 100%" stripe @selection-change="handleSelectionChange" >
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-table :data="tableData5" :show-header="ifHeaderShow">
                                        <el-table-column  prop="id">
                                        </el-table-column>
                                        <el-table-column>
                                        </el-table-column>
                                        <el-table-column>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column  label="系统&模块"></el-table-column>
                            <el-table-column prop="effectiveStart" label="启用时间"></el-table-column>
                            <el-table-column prop="effectiveEnd" label="生效时间"></el-table-column>
                        </el-table>  
                        <el-pagination
                        style="margin-top:20px;" 
                        class="text-right" 
                        background layout="total, prev, pager, next" 
                        @current-change="handleCurrentChange"
                        :page-count="totalPage" >
                        </el-pagination>   
                    </el-col>
                </el-row>
            </el-col>
        </el-row> 
          <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>     
    </div>
</template>
	
<script> 
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import dialogBox from '../../base/dialog/dialog'
    export default{
        name:'customerInfor',
        data(){
            return {
                ifHeaderShow:false,//是否显示表头
                isEdit:true,//是否可编辑
                entryItem:{
                    groupCode:'',//集团编码
                    groupName:'',//集团名称,
                    groupFullname:'',//集团全称
                    localCurrencyId:'',//本位币种
                    accSchemeId :'',
                    basAccperiodContentId:'',//启用月份
                    areaProId:'',//行政地区(省)
                    areaCityId:'',//行政地区(市)
                    areaDisId:'',//行政地区(区)
                    industry:'',//所属行业
                    address:'',//地址
                    phone:'',//电话
                    fax:'',//传真
                    remark:'',//备注
                    status:'',//启用状态
                    id:'',//id
                    areaId:'',
                    timeZoneId:''
                },
                accountYearItem:{
                    accountYear:'',
                },
                accSchemeIdItem:{
                     accSchemeId:''
                },
                accountYearOptions: [],
                currencyOptions: [],
                accSchemeIdOptions:[],
                list:[],//系统字典值表
                tableData:[],
                componyTree:  [{
                    treeId: 1,
                    label: 'HKERP',
                    children:[{
                            treeId: 2,
                            label: '系统管理',
                            children:[]
                        },{
                            treeId: 3,
                            label: '采购管理',
                            children:[]
                        },{
                            treeId: 4,
                            label: '零售管理',
                            children:[]
                        },
                    ]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                 item_area_no:{
                    id:0,
                    ouName:' '
                },
                buttonGroup:[{
                    text:'保存',
                    class:'bt_save',
                    icon:'icon-baocun',
                    disabled:false,
                },{
                    text:'取消',
                    class:'bt_cancel',
                    icon:'icon-quxiao',
                    disabled:true,
                },{
                    text:'打印',
                    class:'bt_print',
                    icon:'icon-print',
                    disabled:false,
                }],//按钮组\
                dialogCommand:[],//底部按钮组控制组
                //dialogVisible:false,//对话框是否显示
                dialogVisible:false,
                errorTips:{//对话框 错误提示
                    message:'',
                    details:'',
                },
                dialogSetting:{
                    message:'',//提示信息
                    dialogName:'',//对话框名称
                    dialogType:'',//对话框类型
                },
                isSave:false,
                ifWidth:true,
                areaCity:true,
                areaDis:true,
                areaStr:true,
                areaProArray:[],//行政地区(省)
                areaCityArray:[],//行政地区(市)
                areaDisArray:[],//行政地区(区)
                accSchemeArray:[],
                timeZoneOptions:[],
                pageIndex:-1,//分页的当前页码
                totalPage:0,//当前分页总数
                oneItem:10,//每页有多少条信息
                multipleSelection: [],//复选框选中数据
                page:1,//当前页
                treeCheck:[],
                isClick:[],
                isCancel:true,//是否显示取消按钮
                entryChangeTimes:0,
                areaFullPathName:'',
                areaFullPathArray:[],
                ouid:'',
                accperiodSchemeID:'',
                // updateAccSchemeId:'',//修改时会计制度id
                changeTimes:0,
            }
        },
        watch:{
            entryItem:{
                handler: function (val, oldVal) {
                    this.changeTimes++
                    if(this.changeTimes>=2){
                        this.buttonGroup[1].disabled=false;
                        // this.buttonGroup[2].disabled=true;
                        // this.buttonGroup[3].disabled=false;
                        // this.buttonGroup[4].disabled=false;
                        // this.buttonGroup[5].disabled=false;
                    }
                },
                deep:true
            },
            // entryItem:{
            //     handler(val, oldVal){
            //        this.entryChangeTimes++
            //        if(this.entryChangeTimes>=2){
            //            this.isCancel=false;
            //        }else{
            //            this.isCancel=true;
            //        }
            //     },
            //     deep:true
            // },
             accountYearItem:{
                  handler(val, oldVal){
                   this.entryChangeTimes++
                   if(this.entryChangeTimes>=2){
                       this.isCancel=false;
                   }else{
                       this.isCancel=true;
                   }
                },
                deep:true
        },
         accSchemeIdItem:{
                  handler(val, oldVal){
                   this.entryChangeTimes++
                   if(this.entryChangeTimes>=2){
                       this.isCancel=false;
                   }else{
                       this.isCancel=true;
                   }
                },
                deep:true
        },
        isCancel:function(val,oldVal){//监听是否修改或新增数据
                if(!val){
                    this.buttonGroup[1].disabled=false
                }else{
                    this.buttonGroup[1].disabled=true
                }
            },
        },
        created:function(){       
                let _this=this; 
                _this.loadTableData();
                _this.loadArea();
                _this.loadCurrency();
                _this.loadOuId();
                _this.loadaccScheme();
                _this.loadTimeZone()
             },
        methods:{         
             open(tittle,iconClass,className) {
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
            btnClick(btn){//按钮组点击事件
                if(btn=="保存"){//保存事件
                   this.Save();
                }else if(btn=="取消"){//取消事件
                    this.cancel();
                }else if(btn=="打印"){//打印事件
                   this.print();
                }
            },
            cancel(){//数据恢复到初始化状态 取消
                this.dialogSetting.dialogName='cancelDialog'
                this.dialogSetting.message="此操作将忽略您的更改，是否继续？";
                this.dialogSetting.dialogType="confirm";
                this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
                this.dialogVisible=true;
            },
          JsonDistinct:function(json, key) {
                var res = [json[0]];
                for (var i = 1; i < json.length; i++) {
                    var repeat = false;
                    for (var j = 0; j < res.length; j++) {
                        if (json[i][key] == res[j][key]) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        res.push(json[i]);
                    }
                }
                return res;
            },
             loadOuId(){//获取ouId
                let _this=this;               
                _this.$axios.gets('/api/services/app/User/GetCurrentUser').then(function(res){
                    _this.ouid=res.result.ouId;
                    //console.log(res)
                }).catch(function(err){
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                });
            },
            //获取年月
            loadbeginDate(data){
                let _this=this;
                _this.$axios.gets('/api/services/app/Accperiod/GetAccountYear',{OuId:_this.ouid,AccperiodShemeId:data}).then(function(res){
                _this.accountYearOptions=res.result;
                if(_this.accountYearOptions.length==0){
                    _this.entryItem.basAccperiodContentId='';
                }
                },function(res){
                })
            },
            loadTableData(){//表格
                 let _this=this;
                _this.$axios.gets('/api/services/app/GroupManagement/Get',{SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem}).then(function(res){
                    _this.areaFullPathName=res.result.areaId_AreaFullPathName;
                    _this.areaFullPathArray=_this.areaFullPathName.split(">");
                    _this.entryItem.areaProId=_this.areaFullPathArray[0];
                    _this.entryItem.areaCityId=_this.areaFullPathArray[1];
                    _this.entryItem.areaDisId=_this.areaFullPathArray[2];
                    _this.entryItem.groupCode=res.result.groupCode;
                    _this.entryItem.groupName=res.result.groupName;
                    _this.entryItem.groupFullname=res.result.groupFullname;
                    _this.entryItem.localCurrencyId=res.result.localCurrencyId;
                    _this.entryItem.timeZoneId=res.result.timeZoneId;
                    _this.entryItem.accSchemeId=res.result.accSchemeId          
                   _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'AccountScheme'}).then(function(response){
                        _this.list = response.result;
                            for(let j in _this.list){
                                if(_this.list[j].itemValue==res.result.accSchemeId){
                                    _this.loadbeginDate(res.result.accSchemeId)
                                }
                            }
                    });
                    // console.log(res.result.accSchemeId);
                    _this.entryItem.basAccperiodContentId=res.result.basAccperiodContentId;
                    _this.entryItem.areaId=res.result.areaId;
                    _this.entryItem.industry=res.result.industry;
                    _this.entryItem.address=res.result.address;
                    _this.entryItem.phone=res.result.phone;
                    _this.entryItem.fax=res.result.fax;
                    _this.entryItem.remark=res.result.remark;
                    _this.entryItem.status=res.result.status;
                    _this.entryItemBak=_this.entryItem;
                    _this.totalPage=Math.ceil(res.result.totalCount/_this.oneItem);
                    },function(res){
                })
            },     
            
            loadCurrency(){
                let _this=this;
                _this.$axios.gets('/api/services/app/CurrencyManagement/GetAll').then(function(res){
                    _this.currencyOptions=res.result.items;
                })
            },
            loadArea(){
                let _this=this;
                _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:0}).then(function(res){ 
                    _this.areaProArray=res.result;
                  },function(res){
                })
            },
            loadaccScheme(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'AccountScheme'}).then(function(res){ 
                    _this.accSchemeIdOptions=res.result;
                  },function(res){
                })
            },
          
             seletChange(val){
                 let _this=this;
                _this.entryItem.basAccperiodContentId='';
                _this.loadbeginDate(val)
            },
            loadTimeZone(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'TimeZone'}).then(function(res){ 
                    _this.timeZoneOptions=res.result;
                  },function(res){
                })
            },

            JsonDistinct:function(json, key) {
                var res = [json[0]];
                for (var i = 1; i < json.length; i++) {
                    var repeat = false;
                    for (var j = 0; j < res.length; j++) {
                        if (json[i][key] == res[j][key]) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        res.push(json[i]);
                      
                    }
                }
                return res;
            },   
            EachBeginDateOptions:function(json){
               for (var i = 0; i < json.length; i++) {
                   return json[i]
                 
               }
            },
             
            ChoosePro(){//选择省份
                let _this=this;
                this.areaDis=false;
                this.areaStr=false;
                _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:_this.entryItem.areaProId}).then(function(res){ 
                    _this.areaCityArray=res.result;
                    _this.entryItem.areaCityId="";
                    _this.entryItem.areaDisId="";
                  },function(res){
                })
            },
            ChooseCity(){//选择市
                let _this=this;
                if(_this.areaCityArray.length==0){
                    this.$message({
                        type: 'info',
                        message: '请先选择省份！'
                    });
                }else{
                    _this.$axios.gets('/api/services/app/AdAreaManagement/GetListByAdAreaId',{ParentId:_this.entryItem.areaCityId}).then(function(res){ 
                        _this.areaDisArray=res.result;
                        _this.entryItem.areaDisId="";
                        _this.areaDis=true;
                    },function(res){
                    })
                } 
            },
            ChooseDis(){//选择区
                
            },
            dialogClick(parmas){
                if(parmas.dialogButton=="确定"){
                  if(parmas.dialogName=="saveDialog"){//保存提交对话框
                        this.dialogVisible=false;
                    }else if(parmas.dialogName=="cancelDialog"){//取消对话框
                        // this.isCancel=true;
                       
                        this.dialogVisible=false;//关闭对话框
                        this.loadTableData();
                        this.changeTimes=0;
                        this.buttonGroup[1].disabled=true;//新增按钮
                    }
                }else if(parmas.dialogButton=="取消"){
                    if(parmas.dialogName=="delDialog"){//多选删除取消操作
                        this.$store.commit('setTableSelection',[])//置空多选
                    }
                    this.dialogVisible=false;
                }

            },
            Save(){
                let _this=this;
                let updateItem={
                    groupName: _this.entryItem.groupName,
                    groupFullname:_this.entryItem.groupFullname,
                    localCurrencyId: _this.entryItem.localCurrencyId,
                    accSchemeId:_this.entryItem.accSchemeId,
                    // basAccperiodContentId: _this.entryItem.basAccperiodContentId,
                    areaId: 0,
                    industry: _this.entryItem.industry,
                    phone: _this.entryItem.phone,
                    fax: _this.entryItem.fax,
                    remark:_this.entryItem.remark,
                    status: _this.entryItem.status,
                    basAccperiodContentId:_this.entryItem.basAccperiodContentId,
                    timeZoneId:this.entryItem.timeZoneId,
                }
                if(_this.entryItem.areaDisId!=""&&typeof(_this.entryItem.areaDisId)!="string"){
                    updateItem.areaId=_this.entryItem.areaDisId
                }else if(_this.entryItem.areaDisId==""&&_this.entryItem.areaCityId!=""&&typeof(_this.entryItem.areaCityId)!="string"){
                    updateItem.areaId=_this.entryItem.areaCityId
                }else if(_this.entryItem.areaProId!=""&&_this.entryItem.areaCityId==""&&typeof(_this.entryItem.areaProId)!="string"){
                    updateItem.areaId=_this.entryItem.areaProId
                }else if(typeof(this.entryItem.areaDisId)=="string"&&typeof(_this.entryItem.areaCityId)=="string"&&typeof(_this.entryItem.areaProId)=="string"){
                    updateItem.areaId=_this.entryItem.areaId
                }
                // console.log(updateItem);
             
                if(!_this.isCancel){
                    _this.$axios.puts('/api/services/app/GroupManagement/Update',updateItem).then(function(res){ 
                        _this.isSave=true;
                        _this.isCancel=true;
                        _this.open('修改成功','el-icon-circle-check','successERP');
                        _this.isEdit=!_this.isEdit;
                        _this.buttonGroup[1].disabled=true;
                        },function(res){
                        _this.open('修改失败','el-icon-error','faildERP');
                    });
                   
                 
                }else{
                    _this.open('没有需要保存的项目','el-icon-warning','noticERP');
                }
            },
            dialogColse(){//对话框关闭回调事件
                this.dialogVisible=false;
            }, 
            loadTree(){
                let _this=this;
                _this.$axios.gets('/api/services/app/DeptManagement/GetAllByOuId',{id:1})
                .then(function(res){
                    // console.log(res)
                    let children=[];
                    if(res.result.length>0){
                        for(let i=0;i<res.result.length;i++){
                            let label=res.result[i].deptName;
                            let treeId=res.result[i].id;
                            let child={'treeId':treeId,'label':label,children:[]}
                            children.push(child)
                        }     
                    }
                    _this.componyTree=[{
                        treeId: 1,
                        label: '集团名',
                        children:children
                        }]
               })
            },
            handleCurrentChange(val) {//页码改变
                let _this=this;
                _this.page=val;
                _this.loadTableData();
            },
            SimpleSearch(){//简单搜索
                 let _this=this;
                _this.$axios.gets('/api/services/app/OuManagement/SimpleSearch',_this.searchData)
                .then(function(res){
                    console.log(res);
                },function(res){
                    console.log('err:'+res)
                })
            },
            goDetail(){
                this.$store.state.url='/OuManage/OuManageDetail/default'
                this.$router.push({path:this.$store.state.url})//点击切换路由
            },
             handleSelectionChange(val) {//点击复选框选中的数据
                this.multipleSelection = val;
                //console.log(val)
            },
            delRow(){
                let _this=this;
                if(_this.multipleSelection.length>0){//表格
                    for(let i=0;i<_this.multipleSelection.length;i++){
                        _this.$axios.deletes('/api/services/app/OuManagement/Delete',{id:_this.multipleSelection[i].id})
                        .then(function(res){
                            _this.loadTableData();
                            _this.open('删除成功','el-icon-circle-check','successERP');
                        },function(res){
                            _this.open('删除失败','el-icon-error','faildERP');
                            //console.log('err:'+res)
                        })
                    }
                };
            },
            nodeClick(data){
                 let _this=this;
                 let flag=false;
                 if(_this.isClick.length>0){
                     for(let i=0;i<_this.isClick.length;i++){
                        if(_this.isClick[i]==data.treeId){
                            flag=false
                            break;
                        }else{
                            flag=true;
                        }
                    }
                 }else{
                     flag=true;
                 }
                 
                //  console.log(flag)
                 if(data.treeId!=1&&flag){
                     _this.$axios.gets('/api/services/app/DeptManagement/GetAllByOuId',{id:data.treeId})
                    .then(function(res){
                        _this.isClick.push(data.treeId);
                        //console.log(res)
                        if(res.result.length>0){
                            for(let i=0;i<res.result.length;i++){
                                let label=res.result[i].deptName;
                                let treeId=res.result[i].id;
                                let child={'treeId':treeId,'label':label,children:[]}
                                data.children.push(child)
                            }
                        }
                    })
                 }
                
            },
            modify(row){
                this.$store.state.url='/OuManage/OuManageModify/'+row.id
                this.$router.push({path:this.$store.state.url})//点击切换路由OuManage
            },
          
        },
          components:{
            dialogBox,
            buttonGroup,    
        }
    }
</script>

<style scoped>
 @import '//at.alicdn.com/t/font_561828_j9pvj2d16altmx6r.css';
.lh-28{
    line-height: 28px;
}
.w-auto{
    width: auto;
}
.store-data-wrapper{
    width: 100%;
    height: auto;
}
.bg-white{
    background: white;
    border-radius: 3px;
}
.border-bottom{
    border: 1px solid #ececec;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt5{
    margin-top: 5px;
}
.mt10{
    margin-top: 10px;
}
.mt20{
    margin-top: 20px;
}

.ml10{
    margin-left: 10px;
}
.pl10{
    padding-left: 10px;
}
.pl15{
    padding-left: 15px;
}
.pt10{
    padding-top: 10px;
}
.pt5{
    padding-top: 5px;
}
.pt20{
    padding-top: 20px;
}
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.h30{
    height: 30px;
    line-height: 30px;
}
.fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.fs12{
    font-size: 12px;
}
.border1{
    border: 1px solid #999999;
    border-radius: 3px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 670px;
}
.btn{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: rgba(130, 170, 252, 1);
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
.rbtn{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: rgba(242, 242, 242, 1);
    border-radius: 3px;
    cursor: pointer;
}
.search-btn{
    font-size: 12px;
    display: inline-block;
    width: 87px;
    height: 28px;
    line-height: 28px;
    border-radius: 3px;
    background: #4A6997;
    color: white;
    cursor: pointer;
    text-align: center; 
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
</style>

<style>
.tenant-management-wrapper .el-input input{
    border:none;
    height: 30px;
    line-height: 30px;
    padding-left: 0;
}
.groupList .el-button+.el-button{
    margin-left: 0;
}
/* 重写checkbox */
.tree-container .el-checkbox__inner {
    width: 18px;
    height: 18px;
        border-radius: 0;
    }   
   .tree-container .el-checkbox__inner::after{
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 8px;
        left: 3px;
        position: absolute;
        top: 0px;
        width: 4px;
    }

/* 重写el-table样式 */
.groupList .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.groupList .el-table td{
    padding: 3px 0;
}
.groupList .el-table__body{
    text-align: center;
}
.reset{
    width:250px!important;
}
.reset .el-input input{
    height: 35px;
}
.reset .el-input__inner{
    height: 35px!important
}
.area{
    width: 500px;
}
.areaBox {
    height: 32px;
    width:calc(100% - 96px);
    float: left;
    border: 1px solid #e4e7ed;
}
.el-select.areaDrop,.el-input.areaEntry{
    width: 134px;
}
.areaDrop input,.areaEntry input{
    border: none!important;
}
.areaDrop .el-input__inner,.areaEntry .el-input__inner{
    height: 32px!important;
}
button.erp_bt[disabled] {
    cursor: not-allowed;
    background: #ccc;
}
</style>