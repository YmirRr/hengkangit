<template>
     <div class="importFile">
        <el-row  class="fixed">
             <el-col :span="24">
                <div class="btnGroup-box">
                      <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick'></buttonGroup>  
                </div> 
            </el-col>
        </el-row>
        <el-row>
             <el-col :span="24">
                 <el-table ref="multipleTable" v-loading="importLoading" @selection-change="importSelect" :data="tableData_update" border style="width: 100%" stripe>
                    <el-table-column fixed="left" type="selection"></el-table-column>
                    <el-table-column fixed="left" label="任务编码">
                        <template slot-scope="scope">
                            <el-button @click='goDetail(scope.row)'  type="text" size="small">{{scope.row.id}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="文件大小">
                        <template slot-scope="scope">
                            <span>{{Math.ceil(scope.row.size)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSuccess == 0">未执行</span>
                            <span v-else-if="scope.row.isSuccess == 1">成功</span>
                            <span v-else style="color:#FF6666">失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="执行数/总数">
                        <template slot-scope="scope">
                            <span>{{scope.row.importCount}}/{{scope.row.totalCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="进度">
                        <template slot-scope="scope">
                            <el-progress class="progressTable" :text-inside="true" :stroke-width="15" :percentage="parseInt(scope.row.progress)*100" color="#33cccc"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="创建时间">
                        <template slot-scope="scope">
                            <el-date-picker class="input-need" 
                            :class="[scope.$index%2==0?'input-bgw':'input-bgp']" 
                            v-model="scope.row.importStartDatetime" 
                            placeholder=""
                            :disabled="true"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            ></el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column prop="showFormat" label="操作">
                        <template slot-scope="scope">
                            <el-button @click='downLoad(scope.row)'  type="text" size="small">下载</el-button>
                            <el-button @click='goDetail(scope.row)'  type="text" size="small">查看</el-button>
                            <el-button @click='isDel(scope.row)'  type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                style="margin-top:20px;" 
                class="text-right" 
                background layout="total,prev, pager, next,jumper" 
                @current-change="CurrentChange"
                :current-page="pageIndex"
                :page-size="oneItem"
                :total="totalItem">
                </el-pagination>   
                <!-- <Table  :methodsUrl="httpUrl" :pluginSetting='pluginSetting' :queryParams="queryParams" :cols="column" :tableName="tableModel"  :command="command"></Table> -->
                <dialogBox :errorTips='errorTips' :dialogSetting='dialogSetting' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
             </el-col>
        </el-row>
    <!-- 点击查看弹框 -->
        <el-dialog :visible.sync="lookTableDetail" title="任务详情" class="lookTableDetails">
           <div class="stepWrapper importFileDetail">
                <div class="detailRow">
                    <span class="labelDetail">基本信息：</span>
                    <span>导入{{lookDialog.modeuleId_ModuleName}}文件{{lookDialog.size}},任务创建于：
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="lookDialog.createdTime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                    </span>
                </div>

                <div class="detailRow">
                    <span class="labelDetail">执行情况：</span>
                    <span>执行开始于
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="lookDialog.importStartDatetime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>，导入完成于：
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="lookDialog.importEndDatetime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                    </span>
                </div>

                <div class="detailRow">
                    <span class="labelDetail">操作对象：</span>
                    <span>用户{{lookDialog.createdBy}}导入数据至{{lookDialog.modeuleId_ModuleName}}中心</span>
                </div>
                <div class="detailRow">
                    <span class="labelDetail">备注：</span>
                    <span></span>
                </div>
                <div class="log">
                    <vue-scroll :ops="$store.state.option">  
                        <div>
                            <span class="labelDetail">执行日志：</span><br/>
                            <span v-html="lookDialog.messageInfo"></span>
                        </div>
                    </vue-scroll>
                </div>
            </div>
            <span slot="footer">
                <button class="StepBtn" @click="lookTableDetail=false">关闭</button>
            </span>
        </el-dialog>
<!-- 点击新增任务弹框 -->
        <el-dialog :visible.sync="importDialogVisible" class="addNewTask">
            <div class="stepWrapper">
                <el-steps :active="witchStep" finish-status="success" process-status="wait" align-center>
                    <el-step title="导入会员"></el-step>
                    <el-step title="导入结果"></el-step>
                </el-steps>
            </div>
            <div class="stepWrapper importFileDetail" v-if="witchStep==1 || witchStep==0">
                <span>注意事项：</span><br/>
                
                <span>1）先下载模板，严格按照模板文件里面的说明进行Excel内容整理 <span class="redColor">（单次最大导入记录数为50000）</span></span><br/>

                <span>2）点击浏览，选择整理好的EXCEL文件，点击“下一步”。</span><br/>

                <span>3）“检验数据”，验证要导入的数据是否有误。</span><br/>

                <span>4）点击“下一步”</span>
                
                <div class="downLoad">
                    <span>下载模板&nbsp;&nbsp;</span>
                    <button class="fileBtn" @click="getTemplate">下载会员模板</button>
                </div>
                <div class="exportFile">
                    <span>导入文件&nbsp;&nbsp;</span>
                    <button  class="fileBtn" @click="fileClick">选择文件</button>
                    <input 
                    name="file"
                    @change="uploadpic($event)" 
                    type="file" 
                   
                    class="upload_file" 
                    style="display: none"/>
                    <span>&nbsp;&nbsp;{{fileUrl}}</span>
                </div>
            </div>
           <div class="stepWrapper importFileDetail" v-if="witchStep==2">
                <h4 class="titleName">任务详情</h4>
                <div class="detailRow">
                    <span class="labelDetail">基本信息：</span>
                    <span>导入{{newAddRow.modeuleId_ModuleName}}文件{{newAddRow.size}},任务创建于：
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="newAddRow.createdTime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                    </span>
                </div>

                <div class="detailRow">
                    <span class="labelDetail">执行情况：</span>
                    <span>执行开始于
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="newAddRow.importStartDatetime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>，导入完成于：
                    <el-date-picker
                    class="lookDialogPicker"
                    v-model="newAddRow.importEndDatetime" 
                    placeholder=""
                    :disabled="true"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                    </span>
                </div>

                <div class="detailRow">
                    <span class="labelDetail">操作对象：</span>
                    <span>用户{{newAddRow.createdBy}}导入数据至{{newAddRow.modeuleId_ModuleName}}中心</span>
                </div>
                <div class="detailRow">
                    <span class="labelDetail">备注：</span>
                    <span></span>
                </div>
                <div class="log">
                    <vue-scroll :ops="$store.state.option">  
                        <div>
                            <span class="labelDetail">执行日志：</span>
                            <span v-html="newAddRow.messageInfo"></span>
                        </div>
                    </vue-scroll>
                </div>
            </div>
            <span slot="footer">
                <button class="StepBtn" v-if="witchStep==0 || witchStep==1" @click="nextStep" :disabled="!isStep1">下一步</button>
                <button class="StepBtn half" v-if="witchStep==2" @click="importAgain">重新导入</button>
                <button class="StepBtn half" v-if="witchStep==2" @click="closeImportFileDialog">关闭</button>
            </span>
        </el-dialog>
<!-- 点击新增任务弹框 -->
     </div>
</template>

<script>
import buttonGroup from '../../base/buttonGroup/buttonGroup'
import Table from '../../base/Table/Table'
import dialogBox from '../../base/dialog/dialog'
import './jquery.signalR.min.js'
export default{
    components:{
        buttonGroup,
        Table,
        dialogBox,
    },
    mounted() {//后台消息推送接收
        
        let _this=this;
        let hubUrl = 'http://192.168.100.107:8082/Importsignalr';
        let hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();   
        hubConnection.start().then(function () {//与后台链接成功
            console.log('success');
        }).catch(function () {
            console.log('filed');
        });
          hubConnection.on('UpdateProgress', data => {//后台推送数据，实时更新表格数据
          console.log(data);
              $.each(_this.tableData,function(index,value){
                  if(value.id==data[0].id){
                      value.messageInfo=data[0].messageInfo
                    //   value.modeuleId_ModuleName=data.modeuleId_ModuleName
                      value.oldExcelFilePath=data[0].oldExcelFilePath
                      value.progress=data[0].progress
                      value.progressValue=data[0].progressValue
                      value.isSuccess=data[0].isSuccess
                      value.totalCount=data[0].totalCount
                      value.importCount=data[0].importCount
                      value.importStartDatetime=data[0].importStartDatetime
                      value.size=Math.ceil(data[0].size)
                  }
              })
        });
    },
    computed:{
        tableData_update(){
            return this.tableData
        }
    },
    watch:{
        tableData:{
            handler:function(val,oldVal){
                console.log(val);
            },
            deep:true
        }
            
    },
    data(){
        return {
            buttonGroup:[{
                text:'返回',
                class:'bt_back',
                icon:'icon-fanhui',
                disabled:false,
            },{
                text:'新增任务',
                class:'bt_add',
                icon:'icon-xinzeng',
                disabled:false,
            },{
                text:'删除任务',
                class:'bt_del',
                icon:'icon-shanchu',
                disabled:false,
            }],
            // httpUrl:{
            //     view:'/menu/menuModify/',//查看详情
            //     delete:'/api/services/app/ModuleManagement/Delete',//单条删除
            //     query:'/api/services/app/ModuleManagement/GetListByCondition',//条件查询
            // },
            // queryParams:{//查询条件参数
            //     ModuleParentId:"",
            //     SearchKey:"",
            //     SkipCount:(this.$store.state.menuListCurrentPage-1)*this.$store.state.menuListEachPage,
            //     MaxResultCount:this.$store.state.menuListEachPage,
            // },
            // pluginSetting:{
            //     hasPagination:true,
            //     mutiSelect:true,//多选栏
            //     isDisable:true,
            // },
            // column: [{
            //     prop: 'systemId_SystemName',
            //     label: '系统',
            //     controls:'button',
            //     isDisable:true,
            //     sortable:false,
            //     isFix:'',
            //     }, {
            //     prop: 'moduleCode',
            //     label: '模块编码',
            //     controls:'button',
            //     isDisable:true,
            //     sortable:false,
            //     }, {
            //     prop: 'moduleName',
            //     label: '模块名称',
            //     controls:'text',
            //     isDisable:true,
            //     sortable:false,
            //     }, {
            //     prop: 'url',
            //     label: '路由地址',
            //     controls:'text',
            //     isDisable:true,
            //     sortable:false,
            //     },{
            //     prop: 'moduleParentId_ModuleName',
            //     label: '上级菜单',
            //     controls:'text',
            //     isDisable:true,
            //     sortable:false,
            //     }, {
            //     prop: 'status',
            //     label: '状态',
            //     controls:'classMapSelect',
            //     isDisable:true,
            //     sortable:false,
            //     dataSource:[],
            // }],
            // command:[{
            //     text:'查看',
            //     class:'green'
            // },{
            //     text:'删除',
            //     class:'blue'
            // }],
            errorTips:{//对话框 错误提示
                message:'',
                details:'',
            },
            dialogSetting:{
                message:'',//提示信息
                dialogName:'',//对话框名称
                dialogType:'',//对话框类型
            },
            dialogVisible:false,
            dialogCommand:[],
            // tableModel:"menuList",
            tableData:[],//表格数据
            pageIndex:1,//分页的当前页码
            totalPage:1,//当前分页总数
            totalItem:0,
            oneItem:10,//每页有多少条信息
            page:1,//当前页
            file:{},//纪录上传文件的数据
            newAddRow:{},//弹框点击下一步时，向表格插入的数据
            newAddRowId:'',
            importLoading:true,//表格加载数据中
            selectTableData:[],//表格选中数据
            lookTableDetail:false,//查看详情弹框控制
            delData:{},//纪录表格内点击删除按钮的数据
            fileUrl:'',//上传文件的绝对路径
            importDialogVisible:false,//控制点击新增任务弹出模态框
            witchStep:0,//纪录模态框是第几部
            isStep1:false,//是否是第一步，完成上传之后进入第一步
            lookDialog:{
                importStartDatetime:'',//导入开始时间
                importEndDatetime:'',//导入结束时间
                modeuleId_ModuleName:'',//
                createdBy:'',//创建者
                size:'',//文件大小
                messageInfo:'',//表格内的执行日志
                createdTime:'',//表格内的创建时间
            },
            // messageInfo:'',//表格内的执行日志
            // createdTime:'',//表格内的创建时间
            chatHub:'',
        }
    },
    watch: {
        witchStep(val){
            if(val==0){
               this.isStep1=false
            }else{
               this.isStep1=true 
            }
        },
        importDialogVisible(val){//弹框关闭时，初始化弹框数据
            if(!val){
                this.witchStep=0;//纪录模态框是第几部
                this.isStep1=false;//是否是第一步，完成上传之后进入第一步
                this.newAddRow={};//弹框点击下一步时，向表格插入的数据
                this.newAddRowId='';
                this.file={};
            }
        }
    },
    created () {
        let _this=this;
        _this.getTableData()
    },
    methods:{
        getTableData(){//获取表格数据
            let _this=this;
            _this.ajaxTable({MoudleeId:_this.$route.params.id,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem})
        },
        CurrentChange(val){
            let _this=this;
            _this.page=val;
            _this.ajaxTable({MoudleeId:_this.$route.params.id,SkipCount:(_this.page-1)*_this.oneItem,MaxResultCount:_this.oneItem})
        },
        ajaxTable(data){
            let _this=this;
            _this.$axios.gets('/api/services/app/ImportTaskManagement/GetAll',data)
            .then(function(res){
                // $.each(res.result.items,function(i,v){
                //     v.lookDialog=Math.ceil(100*v.importCount / v.totalCount)
                // })
                _this.importLoading=false;
                _this.totalItem=res.result.totalCount;
                _this.totalPage=Math.ceil(_this.totalItem/_this.oneItem);//有多少页
                _this.tableData=res.result.items
                // console.log(res)
            })
        },
        btnClick(btn){//按钮组点击事件
            let self = this;
            if(btn=="返回"){//
                self.back();
            }else if(btn=="新增任务"){//
                self.importDialogVisible=true
            }else if(btn=="删除任务"){//
                if(self.selectTableData.length>0){
                    self.isDelThese()
                }
            }
        },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message=message
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogVisible=true;
        },
        isDelThese(){
            let _this=this;
            _this.dialogSetting.dialogName='isDelThese'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogVisible=true;
        },
        dialogClick(data){//对话框按钮点击事件
            let _this=this;
            if(data.dialogName=='isDelThese'){
                if(data.dialogButton=='取消'){
                    _this.dialogVisible=false;
                }else if(data.dialogButton=='确定'){
                    _this.delThese()
                    
                }
            }else if(data.dialogName=='isDel'){
                if(data.dialogButton=='取消'){
                    _this.dialogVisible=false;
                }else if(data.dialogButton=='确定'){
                    _this.del()
                    
                }
            }else if(data.dialogName=='showErMsgDialog'){
                if(data.dialogButton=='取消'){
                    _this.dialogVisible=false;
                }else if(data.dialogButton=='确定'){
                    _this.dialogVisible=false;
                }  
            }  
        },
        delThese(){//删除表格选中项
            let _this=this;
            if(_this.selectTableData.length>0){
                let ids=[];
                // console.log(_this.selectTableData)
                $.each(_this.selectTableData,function(i,v){
                    ids.push(v.id)
                })
                let data={ids:ids}
                _this.$axios.posts('/api/services/app/ImportTaskManagement/BatchDelete',data)
                .then(function(res){
                    console.log(res)
                    _this.getTableData();
                    _this.dialogVisible=false;
                },function(res){
                    _this.showErMsgDialog(res.error.message,res.error.details)
                })
            }else{
                _this.dialogVisible=false;
            }
        },
        back(){
            let _this=this;
            let name=_this.$route.params.backRouterName
            _this.$store.state.url=name
            _this.$router.push({name:name,params:{id:'default'}})//点击切换路由
        },
        importSelect(val){//选中的表格数据
            let _this=this;
            _this.selectTableData=val;
        },
        goDetail(row){//表格点击查看详情
            let _this=this;
            console.log(row)
            _this.lookDialog.modeuleId_ModuleName=row.modeuleId_ModuleName
            _this.lookDialog.createdBy=row.createdBy
            _this.lookDialog.createdTime=row.createdTime
            _this.lookDialog.size=Math.ceil(row.size)
            _this.lookDialog.messageInfo=row.messageInfo
            _this.lookDialog.importStartDatetime=row.importStartDatetime
            _this.lookDialog.importEndDatetime=row.importEndDatetime
            _this.lookTableDetail=true
        },
        isDel(row){//表格内单条删除，弹框配置
           let _this=this
            _this.delData=row;
            _this.dialogSetting.dialogName='isDel'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogVisible=true;
        },
        del(){//表格删除条目
            let  _this=this;
           _this.$axios.deletes('/api/services/app/ImportTaskManagement/Delete',{Id:_this.delData.id})
            .then(function(res){
                _this.getTableData()
                _this.dialogVisible=false;
            },function(res){
               _this.showErMsgDialog(res.error.message,res.error.details)
            })
            
        },
        downLoad(row){//表格下载按钮
           let _this=this;
        //    console.log(row.oldExcelFilePath)
           let url=_this.$store.state.baseURL+'/'+row.oldExcelFilePath
           window.open(url)
        },
        // 关闭对话框
        dialogColse(){
            this.dialogVisible=false;
        }, 
//-----------新增任务--------------
        nextStep(){//下一步
            let _this=this;
            let param = new FormData()  // 创建form对象
            param.append('file', _this.file)  // 通过append向form对象添加数据
            param.append('ModuleId', _this.$route.params.id) // 添加form表单中其他数据
            _this.$axios.exportExcel('/api/services/app/ExcelImport/Import',param)
            .then(function(res){
                console.log(res);
                    // _this.getTableData()
                    _this.newAddRow=res.result;
                    _this.tableData.unshift(_this.newAddRow);
                    _this.tableData.pop()
                    _this.witchStep=2;
            },function(res){
                    _this.showErMsgDialog(res.error.message,res.error.details)
            })
            
        },
        importAgain(){//重新导入
            let _this=this;
            let id=_this.newAddRowId
            _this.$axios.deletes('/api/services/app/ImportTaskManagement/Delete',{Id:id})
            .then(function(res){
                // _this.tableData.splice(0,1)
                _this.getTableData()
                _this.witchStep=0
            },function(res){
               _this.showErMsgDialog(res.error.message,res.error.details)
            })
            // _this.tableData.splice(0,1)
            // _this.witchStep=0
        },
        closeImportFileDialog(){//关闭dialog,reset数据
            let _this=this;
            _this.importDialogVisible=false
            _this.fileUrl='';
            _this.witchStep=0
        },
//---------------上传功能------------------
         downloads(data,fileName) {
            var myFile=new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
            if(navigator.appVersion.toString().indexOf(".NET")>0){
                 window.navigator.msSaveBlob(myFile, fileName);
            }
            else{
                var a = document.createElement("a");
                a.href =window.URL.createObjectURL(myFile); 
                a.download = fileName; 
                a.click(); 
                document.body.appendChild(a);
            } 
         },

        getTemplate(){//下载模板
            let _this=this;
            _this.$axios.downLoad('/api/services/app/ExcelImport/GetTemplateExcel',{'ModuleId': _this.$route.params.id})
            .then(function(res){
                console.log(res)
               let fileName=decodeURI(res.headers['content-disposition'])
               let start=fileName.indexOf('8')+3
                _this.downloads(res.data,fileName.substr(start))
            })          
        },
        fileClick(e) {
           $(e.target).next('.upload_file').click()
        },
        uploadpic(e){//点击下一步生成数据，点击上一步删除数据
            var _this = this
            _this.fileUrl=$(e.target).val()
            // _this.progressShow=true;
            if($(e.target).val()!=''){
                // let item={lookDialog:0}
                _this.file = e.target.files[0]
                _this.witchStep=1
            }
        },
    }
}
</script>

<style scoped>
.importFile div,.importFile span{
    font-size: 12px;
}
 .importFile .el-row{
    background-color: #fff;
  }
  .StepBtn{
    display: block;
    width: 100%;
    height: 50px;
    background: #fff;
    border: none;
    border-top: 1px solid #e4e4e4;
    cursor: pointer;
    color: #33CCCC;
    font-size: 12px;
}
.half{
    width: 50%;
    float: left;
}
.half:first-child{
    border-right: 1px solid #e4e4e4;
}
.addNewTask .stepWrapper{
    width: 70%;
    margin: auto;
}
.addNewTask .importFileDetail{
    padding: 60px 0 0px 0;
    height: 330px;
}
.redColor{
    color: #FF6666
}
.downLoad{
  margin-top: 40px;
}
.exportFile{
   margin-top: 20px;
}
.fileBtn{
    width: 98px;
    height: 34px;
    background: #fff;
    border: 1px solid #33CCCC;
    cursor: pointer;
    color: #33CCCC;
    font-size: 12px;   
    border-radius: 3px;
}
.labelDetail{
    display: inline-block;
    width: 60px;
    text-align: right;
    font-weight: bold;
    color: #333333
}
.titleName{
    font-size: 18px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 55px;
}
.detailRow{
    line-height: 30px;
    padding: 0 20px;
}
.log{
    background-color: #f2f2f2;
    padding: 15px 20px;
    height: 140px;
}
</style>
<style>
 .importFile .addNewTask .el-dialog__header{
      border-bottom:none;
  }
.importFile .el-step__head.is-success {
    color: #1ABC9C;
    border-color: #1ABC9C;
}
.importFile .el-step__title{
    font-size: 13px;
    font-weight: 700;
}
.importFile .el-step__title.is-success{
    color: #1ABC9C;
}
.importFile .lookTableDetails .el-dialog__body{
   padding-top:0;
   height: 477px;
}
.importFile .progressTable .el-progress-bar__outer,
.importFile .progressTable .el-progress-bar__outer .el-progress-bar__inner{
    border-radius:0;
}
.importFile .progressTable .el-progress-bar__outer .el-progress-bar__inner{
    background-color:#33cccc;
}
.importFile .progressTable .el-progress-bar__outer .el-progress-bar__inner .el-progress-bar__innerText{
    color:#333333;
}
.importFile .lookDialogPicker.el-input.is-disabled .el-input__inner {
    height: auto;
    background-color: #fff;
    border-color: #fff;
    color: #606266;
    padding:0;
}
.importFile .lookDialogPicker.el-input.is-disabled .el-input__prefix{
    display: none;
}
.importFile .lookDialogPicker{
    width: 115px;
}
.StepBtn[disabled]{
    color:#ccc;
    cursor: not-allowed;
}
</style>
