 <template>
    <div class="count-wrapper" style="float:left;background:#fff;width:100%;height:100%;">
      <el-row class="bg-white">
        <!-- 左边树形控件 -->
        <el-col :span="5">
            <el-col class="h48 pl15 pr15" :span="24">
                <el-input placeholder="搜索..." v-model="filterText" class="search_input"> </el-input>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-col>
            <el-col :span='24' class="tree-container unitCode" >
                <vue-scroll :ops="$store.state.option">
                    <el-tree oncontextmenu="return false" ondragstart="return false" onselectstart="return false" onselect="document.selection.empty() " oncopy="document.selection.empty() " onbeforecopy="return false " style="-moz-user-select: none "
                    :data="countTree"
                    :highlight-current="true"
                    :props="defaultProps"
                    node-key="id"
                    default-expand-all
                    ref="tree"
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                    @node-click="nodeClick"
                    :render-content="renderContent_moduleParentId"
                    >
                    </el-tree>
                </vue-scroll>
            </el-col>
            
        </el-col>
        <!-- 右边列表部分 -->
        <el-col :span="19" class="borderLeft">
            <!-- 按钮组 -->
            <el-row class="h48 fixed colorWhite">
                <el-col class="pt5">
                    <button @click="add" class="erp_bt bt_add" :class="{erp_fb_bt:IsAdd}"      :disabled="IsAdd">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_add.png">
                        </div>
                        <span class="btDetail">新增</span>
                    </button>
                    <button class="erp_bt bt_del" @click="confirmDelNode"
                                    :class="{erp_fb_bt:IsDelete}"  :disabled="IsDelete">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_del.png">
                        </div>
                        <span class="btDetail">删除</span>
                    </button>
                    <button @click="save" class="erp_bt bt_save" :class="{erp_fb_bt:IsSave}"  :disabled="IsSave">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_save.png">
                        </div>
                        <span class="btDetail">保存</span>
                    </button>
                    <button @click="isCancel" :class="{erp_fb_bt:IsCancel}"  :disabled="IsCancel" class="erp_bt bt_cancel">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_cancel.png">
                        </div>
                        <span class="btDetail">取消</span>
                    </button>
                </el-col>
            </el-row>
            <!-- 表单验证的错误提示信息 -->
            <el-row>
                <el-col :span="24">
                    <div class="tipsWrapper">
                        <div class="errorTips">
                            <p class="msgDetail">错误提示：
                                <span :class="{block : !validation.hasError('formData.unit_MainTable.unitCode')}">
                                    单位编码{{ validation.firstError('formData.unit_MainTable.unitCode') }},
                                </span>
                                <span :class="{block : !validation.hasError('formData.unit_MainTable.unitName')}">
                                    单位名称{{ validation.firstError('formData.unit_MainTable.unitName') }},
                                </span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- 表单 -->
            <el-row>
               <div class="countForm-wrapper">
                    <el-col :span="24">
                        <div  class="bgMarginAuto">
                            <div class="bgcolor bgLongWidth">
                            <label><small>*</small>单位编码</label>
                                <el-input 
                                class="unitCode" 
                                :class="{redBorder : validation.hasError('formData.unit_MainTable.unitCode')}"
                                v-model="formData.unit_MainTable.unitCode"  @focus="showErrTips"></el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="bgMarginAuto">
                            <div class="bgcolor bgLongWidth">
                            <label><small>*</small>单位名称</label>
                                <el-input 
                                class="unitName" 
                                :class="{redBorder : validation.hasError('formData.unit_MainTable.unitName')}"
                                v-model="formData.unit_MainTable.unitName"  @focus="showErrTips"></el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="bgMarginAuto">
                            <div class="bgcolor bgLongWidth">
                                <label><small></small>状态</label>
                                <el-select  v-model="formData.unit_MainTable.status" placeholder="">
                                    <el-option label="未启用" :value="0"></el-option>
                                    <el-option label="启用" :value="1"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="bgMarginAuto">
                            <div class="bgcolor bgLongWidth">
                                <label style="height:1px"></label>
                                <el-checkbox  v-model="formData.unit_MainTable.isBase">基本单位</el-checkbox>
                            </div>
                        </div>
                    </el-col>
               </div>
            </el-row>
            <!-- 折叠面板 -->
            <el-row class="collapseBgc">
                <el-collapse v-model="activeNames">
                    <el-collapse-item  name="1" class="bgColor">
                        <template slot="title">
                            <button class="btnBorder">多单位</button>
                            <button class="btnRight">收起</button>

                        </template>
                        <!-- 按钮 -->
                        <el-row class="btnHeight bgColor">
                            <button class="erp_bt bt_save" @click="addRow">
                                <div class="btImg">
                                    <img src="../../../static/image/common/increment.png">
                                </div>
                                <span class="btDetail">增行</span>
                            </button>
                            <button class="erp_bt bt_cancel" @click="confirmDelRows">
                                <div class="btImg">
                                    <img src="../../../static/image/common/eraseline.png">
                                </div>
                                <span class="btDetail">删行</span>
                            </button>
                        </el-row>
                        <!-- 表格 -->
                        <el-row class="tableSize">
                            <el-table  class="bgColor" :data="formData.unitConvert_ChildTable" border @selection-change="handleSelectionChange" style="width: 100%">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="destUnitId" label="多单位">
                                    <template slot-scope="scope">
                                        <el-select @change="pullDown(scope.row)"    v-model="scope.row.destUnitId" :class="{errorclass:scope.row.destUnitId=='' && isSave1==true}" >
                                            <el-option v-for="item in tableSelectData"  :key="item.id" :label="item.unitName" :disabled="item.disabled" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="factor" label="系数" width="180">
                                    <template slot-scope="scope">
                                        <el-input  v-model="scope.row.factor" :class="{errorclass:scope.row.factor=='' && isSave1==true}"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="remark" label="备注" width="180">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.remark"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text"  @click="confirmDelThis(scope.row)" >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-collapse-item>                               
                </el-collapse>
            </el-row>
            <!-- 审计信息 -->
            <auditInfo :auditData='timeData'></auditInfo>
        </el-col>
        <!-- 数据提交有误 -->
        <submitError :submitData="submitData"></submitError>
        <!-- dialog -->
        <!-- 删除提示和数据变动提示 -->
        <el-dialog :visible.sync="dialogUpdateConfirm" class="dialog_confirm_message" width="25%">
                <template slot="title">
                    <span class="dialog_font">提示</span>
                </template>
                <el-col :span="24" style="position: relative;">
                    <el-col :span="24">
                        <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                        <p class="dialog_font dialog_body_message">{{dialogcontent}}</p>
                    </el-col>
                </el-col>
                <span slot="footer">
                    <button class="dialog_footer_bt dialog_font" @click="doCancel(dialogargument)">确 认</button>
                    <button class="dialog_footer_bt dialog_font" @click="doCanceloff(dialogargumentoff)">取 消</button>
                </span>
        </el-dialog>
        <!-- dialog -->
        
    
      </el-row>
    </div>
</template>
 <script>
    import auditInfo from '../Common/auditInfo';
    import submitError from '../Common/submitError';
    // import {getHeight,GetDateTime} from '../../common/dom.js'

    export default {
        name:'unitOfMeasurementList',
        data(){
            return {
                // ------------------------------------提示信息
                timeData:{//审计信息
                    "createdBy":this.$store.state.name,
                    "createdTime": '',
                    "modifiedBy": this.$store.state.name,
                    "modifiedTime": '',
                },
                submitData:{//数据提交有误提示框参数
                    submitErrorMessage:false,//数据提交有误提示框
                    detail_message_ifShow: false,//数据提交有误提示框详细信息
                    response: {
                        details: "",
                        message: "",
                        validationErrors: []
                    },
                }, 
                isSave1:false,
                dialogUpdateConfirm:false,//提示框
                dialogcontent:'确定是否删除此条数据',//提示框内容
                dialogargument: 0,//提示框参数
                dialogargumentoff: 0,//提示框参数
                choseAjax:'',//存储点击单个删除还是多项删除按钮判断信息
                activeNames:['1'],//折叠面板的默认激活状态
                // -------------------------------------树形控件数据
                countTree: [],//树形控件数据
                defaultProps: {
                    children: 'unitTypeGroup',
                    label: 'unitName',
                    id: 'id',
                },
                filterText:'',//过滤关键字
                // --------------------------控制按钮样式与禁用
                IsAdd:false,//新增
                IsDelete:false,//删除
                IsSave:true,//保存 
                IsCancel:true,//取消
                isEdit:false,//是否编辑状态
                firstModify:false,//数据第一次修改
                //----------------------------------- 新增所需参数
                addList:{//增加所需参数
                    "unit_MainTable": {
                        "id": 0,
                        "groupId": 0,
                        "unitCode": "",
                        "unitName": "",
                        "isBase": false,
                        "status": 1,
                    },
                    "unitConvert_ChildTable": []
                },
                //---------------- 默认数据列表
                formData:{
                    "unit_MainTable": {
                        "id": 0,
                        "groupId": 0,
                        "unitCode": "",
                        "unitName": "",
                        "isBase": true,
                        "status": 1,
                    },
                    "unitConvert_ChildTable": []
                },
                detailArr:[],
                tableSelectData:[],//列表多单位的下拉框数据
                nodeId: '',
                nodeId1: '',
                // ----------------------------列表数据
                multipleSelection: {},//复选框选中数据（id）
                multipleDel: {},//复选框选中数据值
                flag:false,//控制表格选项框的开关
                x:0,//增行的下标
                // delX:[],//删行的下标集合
                delIds:{//删除的表格数据的id
                    ids:[]
                },
                isOff:false
                // addRowArr:[],// 增行的数组
            }
        },
        validators: {
            'formData.unit_MainTable.unitCode': function (value) {//地区编码
                return this.Validator.value(value).required().maxLength(50)
            },
            'formData.unit_MainTable.unitName': function (value) {//地区名称
                return this.Validator.value(value).required().maxLength(50)
            },
        },
        created() {  
            this.loadTree(); 
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            formData:{
                handler:function(val,oldVal){
                    // console.log(1);
                    let _this = this;
                   
                    if(!_this.firstModify){
                        _this.firstModify = !_this.firstModify;
                    }else{
                        _this.IsAdd=true;//新增
                        _this.IsDelete=true;//删除
                        _this.IsSave=false;//保存
                        _this.IsCancel=false;//取消
                        _this.isEdit=true;//数据修改了
                    }
                },
                deep: true,
            },
            detailArr:{
                handler:function(val,oldVal){
                    let _this = this;
                    if(!_this.firstModify){
                        // console.log('3434');
                        _this.firstModify = !_this.firstModify;
                    }else{                     
                    }
                },
                deep: true,
            },
            

        },
        methods:{
            // -----------------------提示信息
            open(tittle, iconClass, className) { // 成功提示框
                this.$notify({
                    position: "bottom-right",
                    iconClass: iconClass,
                    title: tittle,
                    showClose: false,
                    duration: 3000,
                    customClass: className
                });
            },
            getErrorMessage(message,details,validationErrors){//获取提交错误的详细信息
                let _this=this;
                _this.submitData.response.message='';
                _this.submitData.response.details='';
                _this.submitData.response.validationErrors=[];
                if(details!=null && details){
                    _this.submitData.response.details=details;
                }
                if(message!=null && message){
                    _this.submitData.response.message=message;
                }
                if(message!=null && message){
                    _this.submitData.response.validationErrors=validationErrors;
                }
            },
            showErrTips(e){// 表单验证错误提示信息
                $('.tipsWrapper').css({display:'none'});
            },
            loadTree(){//获取计量单位树形控件数据
                let _this=this;
                _this.firstModify=false;
                _this.$axios.gets('/api/services/app/UnitManagement/GetUnitTree').then(
                    rsp=>{
                        _this.countTree = rsp;
                        let Obj = _this.countTree[0].unitTypeGroup
                        for(let i=0;i<Obj.length;i++){
                            Obj[i].unitName = Obj[i].itemName;
                           Obj[i].unitTypeGroup = Obj[i].unitTypeChild;
                        }
                       if (_this.nodeId != '' && _this.nodeId1 == '') {
                           // _this.nodeClick(_this.nodeId);
                       }else if(_this.nodeId1 != ''){
                            _this.loadCheckSelect('unitCode',_this.nodeId1);
                            _this.nodeId1 = '';
                       }else{
                            // _this.loadCheckSelect('unitCode',_this.countTree[0].children[0].id)
                       }
                       // getHeight();
                    },
                    rsp=>{
                       // getHeight();
                    })
            },
            doCanceloff(){
                let _this = this;
                _this.dialogUpdateConfirm = false;
                if(_this.isAdd){
                    // alert(1)
                    _this.loadCheckSelect('unitCode',0)
                }else{
                  _this.loadCheckSelect('unitCode',_this.nodeId.id)  
                }  
            },
            loadCheckSelect(selectName,key){
                let _this=this;
                _this.$nextTick(function () { 
                    $('.'+selectName+' .el-tree-node__label').each(function(){
                         if($(this).attr('data-id')==key){
                            $(this).click()

                        }
                    })
                })
            },
            filterNode(value, data) {// 输入框过滤节点
                if (!value) return true;
                return data.unitName.indexOf(value) !== -1;
            },
            doCancel(){
                let _this=this;
                // _this.getNodeMsg();
                _this.isEdit=false;
                _this.dialogUpdateConfirm=false;
                _this.loadCheckSelect('unitCode',_this.nodeId.id)    
            },
            nodeClick(data) {//树形控件节点被点击时的回调
                let _this=this;
                // if(data.id == _this.nodeId.id && _this.isEdit){
                //     _this.dialogUpdateConfirm=false;
                //     return ;
                // }else if(data.id == 0 && _this.isEdit){
                //     _this.dialogUpdateConfirm=false;
                //     return ;
                // }
                // // alert(_this.isOff)
                // if(_this.isEdit && !_this.isOff){
                //     _this.dialogUpdateConfirm=true;
                //     return ;
                // }
                // if(data.id != 0 ){
                //    _this.nodeId = data; 
                // }else{
                //     return;
                // }
                // if(!_this.IsCancel){
                //     _this.IsAdd=false;//新增
                //     _this.IsDelete=false;//删除
                //     _this.IsSave=true;//保存
                //     _this.IsCancel=true;//取消
                // }
                _this.isAdd=false;
                _this.getNodeMsg(_this.nodeId.id);
                _this.getNodeDetail(_this.nodeId.id);
            },
            getNodeMsg(id){//获取树形节点信息------form表单的显示信息
                let _this=this;
                _this.$axios.gets('/api/services/app/UnitManagement/Get',{Id:id}).then(
                    rsp=>{

                    // 数据回写时改变审计信息的值
                    _this.timeData.createdBy=rsp.result.createdBy;
                    _this.timeData.createdTime=rsp.result.createdTime
                    _this.timeData.modifiedBy=rsp.result.modifiedBy;
                    _this.timeData.modifiedTime=rsp.result.modifiedTime;
                    _this.firstModify=false;
                    _this.formData.unit_MainTable=rsp.result;
               });

            },
            getNodeDetail(id){//获取树形节点详细信息------列表数据
                let _this=this;
                _this.$axios.gets('/api/services/app/UnitConvertManagement/GetDetail',{UnitId:id}).then(
                    rsp=>{
                        _this.firstModify=false;
                        _this.formData.unitConvert_ChildTable=rsp.result;
                        _this.detailArr=_this.formData.unitConvert_ChildTable;
                        _this.$axios.gets('/api/services/app/UnitManagement/GetOtherUnit',{UnitId:id}).then(
                            rsp=>{       
                            _this.tableSelectData=rsp.result;
                            for(let i=0;i<_this.tableSelectData.length;i++){
                                for(let j=0;j<_this.detailArr.length;j++){
                                    if(_this.tableSelectData[i].id == _this.detailArr[j].destUnitId){
                                        _this.tableSelectData[i].disabled = true;
                                    }
                                }
                            }
                       })
                    });

            },
            pullDown(row){
                let _this = this;
                let arr = '';
                // arr.push(row);
                console.log(row.destUnitId_UnitName)
                for(let i=0;i<_this.tableSelectData.length;i++){
                    if(_this.tableSelectData[i].id == row.destUnitId){
                        _this.tableSelectData[i].disabled = true;
                        arr = _this.tableSelectData[i].unitName 
                    }
                    
                }
                for(let j=0;j<_this.tableSelectData.length;j++){
                    if(_this.tableSelectData[j].unitName === row.destUnitId_UnitName){
                        _this.tableSelectData[j].disabled = false;
                        row.destUnitId_UnitName = arr
                        return ;
                    }
                }                           
                
            },
            // -------------------按钮组功能
            add(){//新增
                let _this=this;
                _this.isAdd=true;
                _this.isEdit=false;
                _this.firstModify=false;
                _this.initData();
            },
            save(){//主表按钮保存------从表的操作对主表来说都是修改（传入id与新增区分）
                let _this=this;
                _this.isSave1=true;
                if (_this.isAdd || _this.isEdit) {//新增保存
                    $('.tipsWrapper').css({display:'block'});
                    _this.$validate().then(
                        function (success) { 
                            if (success) {
                                $('.tipsWrapper').css({display:'none'});
                                // console.log(_this.formData.unitConvert_ChildTable);
                                // _this.isRepeat(_this.formData.unitConvert_ChildTable);
                                if (_this.formData.unitConvert_ChildTable.length>1) {
                                        for(let i=0;i<_this.formData.unitConvert_ChildTable.length; i++){
                                            // console.log("i="+i);
                                            // alert('1')
                                            if (_this.formData.unitConvert_ChildTable[i].destUnitId=='' || _this.formData.unitConvert_ChildTable[i].factor=='') {
                                                // alert('多单位或系数必填');
                                                _this.$message({
                                                    message: '红色框内为必填项！',
                                                    type: 'error'
                                                });
                                                return;
                                            }
                                            for (let j = 0; j < i; j++) {
                                               if (_this.formData.unitConvert_ChildTable[i].destUnitId==_this.formData.unitConvert_ChildTable[j].destUnitId && i!=j) {
                                                    return;
                                                    alert('多单位不能重复');
                                                    // alert('多单位必须唯一');
                                                    // alert(`多单位${_this.formData.unitConvert_ChildTable[i].destUnitId}必须唯一`);
                                                    
                                                }
                                            }
                                            
                                            _this.addList=_this.formData;
                                            // console.log(_this.addList);
                                            if (i==_this.formData.unitConvert_ChildTable.length-1) {
                                                // console.log('i='+i);
                                                _this.addList.unitConvert_ChildTable=_this.formData.unitConvert_ChildTable;
                                                _this.addList.unit_MainTable=_this.formData.unit_MainTable;
                                                _this.doSave(_this.addList)
                                            }                        
                                    };
                                }else if(_this.formData.unitConvert_ChildTable.length==1){
                                   if (_this.formData.unitConvert_ChildTable[0].destUnitId!='' && _this.formData.unitConvert_ChildTable[0].factor!='') {
                                    //    console.log(_this.formData.unitConvert_ChildTable);
                                    //    alert('2.1')
                                            _this.addList.unitConvert_ChildTable=_this.formData.unitConvert_ChildTable;
                                            _this.addList.unit_MainTable=_this.formData.unit_MainTable;
                                            // console.log(_this.addList);
                                            _this.doSave(_this.addList);
                                   }else{
                                    //    alert('2')
                                       alert('多单位或系数必填');
                                       return;
                                   }
                                }else{
                                    _this.addList.unitConvert_ChildTable=_this.formData.unitConvert_ChildTable;
                                    _this.addList.unit_MainTable=_this.formData.unit_MainTable;
                                    _this.doSave(_this.addList)
                                }
                            }
                         }
                    )
                }
            },
            doSave(dataVal){
                let _this=this;
                console.log('xkk');
                // console.log(dataVal);
                _this.$axios.posts('/api/services/app/UnitManagement/AggregateCreateOrUpdate',dataVal).then(
                    rsp=>{//success
                        // console.log(rsp.result);
                        _this.isSave1 = false;
                        _this.nodeId1 = rsp.result
                        _this.addList.unit_MainTable.id=rsp.result;
                        _this.nodeId=rsp.result;
                        _this.isEdit=false;
                        _this.firstModify=true;
                        _this.IsAdd=false;//新增
                        _this.IsDelete=false;//删除
                        _this.IsSave=true;//保存
                        _this.IsCancel=true;//取消
                        _this.flag=false;//关闭开关
                        _this.loadTree();
                        _this.open('保存成功','el-icon-circle-check','successERP');
                    },
                    rsp=>{//error
                        if(rsp && rsp!=''){ 
                            _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                        };
                        _this.submitData.submitErrorMessage=true;
                    }
                )
            },
            // --------------删除功能(主表)
            confirmDelNode(){//确认删除节点
                let _this=this;
                _this.choseAjax='node';
                _this.dialogUserConfirm=true;
                // console.log('确认');
            },
            delSave(){//判断从表数据是否有删除，有删除则先删除，成功后再保存
                    let _this=this;   
                    if (_this.delIds.ids.length>0) {
                        // console.log('looklook1');
                        // console.log('先删除后保存');
                        _this.$axios.posts('/api/services/app/UnitConvertManagement/BatchDelete',_this.delIds).then(
                                rsp=>{//success
                                    console.log('success');
                                    _this.save();
                                    _this.delIds.ids = [];
                                },
                                rsp=>{//error
                                    console.log('从表数据删除失败error');
                                    if(rsp && rsp!=''){ 
                                        _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors)
                                    };
                                     _this.submitData.submitErrorMessage=true;
                                            }
                                        )
                    }else{
                        console.log('looklook1');
                        _this.save();
                    }             
            },
            delNode(){//删除节点
                let _this=this;
                if(_this.formData.unitConvert_ChildTable.length > 0){
                    let del = {
                        ids:[]
                    }
                    for(let i=0;i<_this.formData.unitConvert_ChildTable.length;i++){
                        del.ids.push(_this.formData.unitConvert_ChildTable[i].id)
                    }
                    _this.$axios.posts('/api/services/app/UnitConvertManagement/BatchDelete',del).then(rsp =>{
                        del.ids = [];
                         _this.$axios.deletes('/api/services/app/UnitManagement/Delete',{Id:_this.nodeId.id})
                        .then(
                            rsp=>{
                                _this.dialogUserConfirm=false;
                                _this.nodeId=0
                                _this.loadTree();
                                _this.isEdit=false;
                                _this.open('删除成功','el-icon-circle-check','successERP');
                            },
                            rsp=>{
                                _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors);
                                _this.dialogUserConfirm=false;
                                _this.submitData.submitErrorMessage=true;
                            }
                        )
                    },rsp =>{

                    })
                }else{
                    _this.$axios.deletes('/api/services/app/UnitManagement/Delete',{Id:_this.nodeId.id})
                    .then(
                        rsp=>{
                            _this.dialogUserConfirm=false;
                            _this.nodeId =0
                            _this.loadTree();
                            _this.isEdit=false;
                            _this.open('删除成功','el-icon-circle-check','successERP');
                        },
                        rsp=>{
                            _this.getErrorMessage(rsp.error.message,rsp.error.details,rsp.error.validationErrors);
                            _this.dialogUserConfirm=false;
                            _this.submitData.submitErrorMessage=true;
                        }
                    )
                }
                // _this.formData.unitConvert_ChildTable
                
            },
            sureAjax(){
                let _this=this;
                if(_this.choseAjax=='row'){
                    _this.delThis()
                }else if(_this.choseAjax=='rows'){
                    _this.delRow()
                }else if(_this.choseAjax=='node'){
                    _this.delNode()
                }
            },
            // -------------取消功能
            isCancel(){
                // _this.isEdit
                let _this =this;
                if(this.isEdit){
                    this.dialogUpdateConfirm=true;
                }else{
                    _this.IsAdd=false;//新增
                    _this.IsDelete=false;//删除
                    _this.IsSave=true;//保存
                    _this.IsCancel=true;//取消
                    this.loadCheckSelect('unitCode',_this.nodeId.id);
                    
                   // alert(_this.nodeId.id) 
                   // _this.loadTree();
                }
                
                
            },

            // 数据初始化----重置表单并设置值
            initData(){
                let _this=this;
                _this.formData={
                    "unit_MainTable": {
                        "id": 0,
                        "groupId": 0,
                        "unitCode": "",
                        "unitName": "",
                        "isBase": true,
                        "status": 1,
                    },
                    "unitConvert_ChildTable": []
                };
                _this.loadCheckSelect('unitCode',0);
                _this.IsAdd = true;//新增
                _this.IsDelete=true;//删除
                _this.IsSave=false;//保存
                _this.IsCancel=false;//取消
                _this.validation.reset();
                _this.timeData.createdBy=this.$store.state.name;
                _this.timeData.createdTime='';
                _this.timeData.modifiedBy=this.$store.state.name;
                _this.timeData.modifiedTime='';
            },
            // -----------------------------表格功能
            addRow(){//增行
                let _this=this;
                _this.x++;
                let array = {//增行的数据
                    "groupId": 0, 
                    "unitId": _this.nodeId.id,
                    "destUnitId":'',
                    "factor": '',
                    "remark": "",
                    // X: _this.x,//自定义一个序列号
                }
                _this.formData.unitConvert_ChildTable.unshift(array);
                console.log(_this.formData.unitConvert_ChildTable);
            },
            confirmDelThis(row){//表格内操作单项删除---------假删除
                console.log(row);
                let _this=this;
                // console.log('row111');
                if(row.id){
                    _this.delIds.ids.push(row.id);
                    for(let i=0;i<_this.formData.unitConvert_ChildTable.length;i++){
                        if(_this.formData.unitConvert_ChildTable[i].id == row.id ){
                            _this.formData.unitConvert_ChildTable.splice(i,1);
                        }
                    }
                }else{
                    for(let i=0;i<_this.formData.unitConvert_ChildTable.length;i++){
                        if(_this.formData.unitConvert_ChildTable[i]== row ){
                            _this.formData.unitConvert_ChildTable.splice(i,1);
                        }
                    }
                }
            },
            handleSelectionChange(value){//获取选择框选中的id
                let _this = this;
                    _this.multipleDel =value;
                    _this.multipleSelection.ids = [];
                    _this.multipleSelection.X = [];
                    for (let val of value) {
                        if (val.id){
                            _this.delIds.ids.push(val.id);
                        }else{
                            _this.multipleSelection.X.push(val.X);
                        }
                    }
                    // _this.delIds.ids=_this.multipleSelection.ids;
                    console.log(value)
                    _this.delX=_this.multipleSelection.X;
            },
            confirmDelRows(){//表格内操作多项删除---------表格内假删除
                let _this=this;
                // if (_this.delIds.ids.length>0) {
                    let arr1=[];
                    $.each(_this.formData.unitConvert_ChildTable,function(index,value) {
                        let flag1=false;
                        // console.log(value);
                        $.each(_this.multipleDel,function (i,val) {
                            if (value==val) {
                                // console.log(value);
                                // console.log(val);
                                flag1=true;
                            }
                        })
                        if (!flag1) {
                            console.log(1)
                        arr1.push(value)
                        }
                    })
                    _this.formData.unitConvert_ChildTable=arr1;
                    _this.flag=true;
            },
            // -------判断从表
            
            renderContent_moduleParentId(h, { node, data, store }){
                if(typeof(data.childNodes)!='undefined' && data.childNodes!=null && data.childNodes.length>0){
                    return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>
                            {data.unitName}
                        </span>
                    );
                }else{
                     return (
                        <span class="el-tree-node__label" data-id={data.id}>
                        <i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>
                            {data.unitName}
                        </span>
                    );
                }
            }, 
        },
        components:{
            auditInfo,
            submitError,

        },
    }
</script>

 <style scope>
 .errorclass{
   border: 1px solid #f98b8b!important 
}
    .colorWhite{
        background-color: #fff;
    }
    .count-wrapper{
        width: 100%;
        height: 100%;
    }
    .count-wrapper .borderLeft{
        border-left: 1px solid #ccc;
    }
    .bgWhite{
        background-color: #fff;
        height: 100%;
        
    }
    .bg-white{
        background: white;
        border-radius: 3px;
    }
    .topSearch {
        font-size: 18px;
    }
    .topSearch .pl10 {
        padding-left: 10px;
    }
    .h48 {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #e4e4e4;
    }
    .pl15{
        padding-left: 15px;
    }
    .pr15{
        padding-right: 15px;
    }
    .pt5{
        padding-top: 5px;
    }
    .circle {
        display: inline-block;
        height: 15px;
        width: 15px;
        font-weight: 900;
        color: rgb(161, 161, 161);
        border: 1px solid rgb(194, 202, 216);
        border-radius: 50%;
        vertical-align: middle;
        position: relative;
        float: right;
        margin-top: 16px;
        cursor: pointer;
    }
    .circle .circleContent {
        display: inline-block;
        position: absolute;
        top: 4%;
        left: 25%;
        height: 1px;
        width: 1px;
        line-height: 10px;
    }
    .bgColor{
        background-color: rgb(251, 252, 253);
    }
    .borderBtm{
        height: 42px;
        border-bottom: 1px solid #ccc;
        padding-left: 10px;
    }
    .bgcForm{
        background-color: #fff;
        padding: 10px;
    }
    .borderLeft .rightForm{
        width: 40%;
    }
    .borderLeft .rightForm .el-form-item__label{
        font-size: 12px;
        color: #000;
        width: 100px;
    }
    .borderLeft .rightForm .el-input__inner{
        font-size: 12px;        
    }
    .borderLeft .rightForm .el-input{
        height: 30px;
        width: calc(100% - 110px);
    }    
    .btnBorder{
        border: none;
        background-color: #fbfcfd;
        border-bottom: 3px solid #33cccc;
        height: 48px;
        cursor: pointer;
    }
    .btnRight{
        border: none;
        background: #fbfcfd;
        float: right;
        height: 30px;
        line-height: 30px;
        padding-top: 10px;
        font-size: 12px;
    }
    .borderBtm .pickUp{
        font-size: 12px;height: 42px;
        line-height: 42px;
        float: right;
        padding-right: 5px;
        cursor: pointer;
    }
    .btnHeight{
        padding: 10px;
    }
    .count-wrapper .tableSize .el-table th>.cell{
        color: #000;
        font-size: 12px;
    }
    .leftBox{
        border-left: 1px solid #ccc;
    }
    .count-wrapper .el-collapse-item.is-active .el-collapse-item__header {
        border-bottom-color: #ccc;
        background-color: rgb(251, 252, 253);
        padding-left: 10px;
    }
    /* 重写表单样式 */
    .count-wrapper .countForm-wrapper{
        margin-top: 10px;
    }
    .count-wrapper .countForm-wrapper .bgMarginAuto{
        margin:0;
    }
</style>


 <style>
    /* .count-wrapper .formWidth .el-input__inner{
        height:30px;
    } */
    /* .count-wrapper .formWidth .el-form-item__label{
        font-size:12px;
        color: #000;
    }
    .count-wrapper .formWidth .el-form-item{
        margin-bottom: 0px !important;
    }
    .count-wrapper .formWidth .el-button{
        background: #4a6997;
        color: #fff;
        font-size: 12px;
        padding: 10px 30px;
    } */
    .count-wrapper .bgcForm .el-select{
        display: block ;
    }
    .count-wrapper .tableSize .bgColor .el-input__inner {
        border:none;
        text-align: center;
    }
</style>


