<template>
    <div class="list-wrapper">
        <el-row class="bg-white">
            <el-col :span="5" class="left-box">
                <el-col class="pl15 pr15" :span="24">
                      <el-select v-model="value" placeholder="请选择" class="width" @change="seletChange">
                        <el-option
                        v-for="item in options"
                        :key="item.itemValue"
                        :label="item.itemName"
                        :value="item.itemValue">
                        </el-option>
                    </el-select>
                    <el-input placeholder="搜索..."
                              v-model="searchLeft"

                              class="search_input width">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>

                <el-col :span='20' class="ml20 mt20">
                    <el-tree oncontextmenu="return false" ondragstart="return false"  onbeforecopy="return false" style="-moz-user-select: none"
                        :data="componyTree"
                        :props="defaultProps"
                        default-expand-all
                        ref="tree"
                        node-key="label"
                        :filter-node-method="filterNode"
                        highlight-current
                        :expand-on-click-node="false"
                        @node-click="TreeNodeClick">
                    </el-tree>
                </el-col>
            </el-col>
             <!-- dialog是否删除提示 -->
            <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
                <template slot="title">
                    <span class="dialog_font">提示</span>
                </template>
                <el-col :span="24" style="position: relative;">
                    <el-col :span="24">
                        <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                        <p class="dialog_font dialog_body_message">确认删除？</p>
                    </el-col>
                </el-col>

                <span slot="footer">
                    <button class="dialog_footer_bt dialog_font" @click="del">确 认</button>
                    <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
                </span>
            </el-dialog>
            <!-- dialog -->
            <!-- dialog修改结束时间大于开始时间提示 -->
            <el-dialog :visible.sync="dialogResetBeginDate" class="dialog_confirm_message" width="25%">
                <template slot="title">
                    <span class="dialog_font">提示</span>
                </template>
                <el-col :span="24" style="position: relative;">
                    <el-col :span="24">
                        <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                        <p class="dialog_font dialog_body_message">开始日期不能大于结束日期</p>
                    </el-col>
                </el-col>

                <span slot="footer">
                    <button class="dialog_footer_bt dialog_font" @click="dialogResetBeginDate = false">确 认</button>
                    <button class="dialog_footer_bt dialog_font" @click="dialogResetBeginDate = false">取 消</button>
                </span>
            </el-dialog>
            <!-- dialog -->


            <el-col :span='19' class="border-left">
                <el-row class="h48 pt5 fixed">
                    <button class="erp_bt bt_add" @click="add">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_add.png">
                        </div>
                        <span class="btDetail">新增</span>
                    </button>

                    <button class="erp_bt bt_del" @click="dialogConfirm" :class="{erp_fb_bt:ifData}">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_del.png">
                        </div>
                        <span class="btDetail">删除</span>
                    </button>
                    <button class="erp_bt bt_save" @click="save">
                        <div class="btImg">
                        <img src="../../../static/image/common/bt_save.png">
                        </div>
                        <span class="btDetail">保存</span>
                    </button>

                    <button class="erp_bt bt_saveAdd" @click="addSave">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_saveAdd.png">
                        </div>
                        <span class="btDetail">保存并新增</span>
                    </button>

                    <button class="erp_bt bt_out">
                        <div class="btImg">
                            <img src="../../../static/image/common/bt_inOut.png">
                        </div>
                        <span class="btDetail">导出</span>
                    </button>

                    <div class="t-btn">
                        <span @click='ifShow = !ifShow'>收起</span>
                        <i class="el-icon-arrow-up"></i>
                    </div>
                </el-row>

                <el-collapse-transition>
                    <div v-show="ifShow" class="mt10 bb1">
                        <el-row style="padding-top:48px;">
                            <div class="bgcolor">
                                <label><small>*</small>会计年份</label>
                                <el-input placeholder=""
                                        class="periodYear"
                                        v-model="periodYear"
                                        :class="{redBorder : validation.hasError('periodYear')}"
                                        @change="setDate"
                                        ></el-input>
                            </div>
                            <div class="error_tips_info">{{ validation.firstError('periodYear') }}</div>

                            <div class="bgcolor">
                                <label><small>*</small>期间个数</label>
                                <el-input placeholder=""
                                        class="periodNum"
                                        v-model="periodNum"
                                        :class="{redBorder : validation.hasError('periodNum')}"
                                        ></el-input>
                            </div>
                            <div class="error_tips_info">{{ validation.firstError('periodNum') }}</div>
                            <div class="time">
                                <label><small style="color:#FF669B;margin-right:2px">*</small>日期</label>
                                <el-date-picker v-model="chooseDate"
                                                type="daterange"
                                                unlink-panels
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                :class="{redBorder : validation.hasError('chooseDate')}"
                                                ></el-date-picker>
                            </div>
                            <div class="error_tips_info">{{ validation.firstError('chooseDate') }}</div>

                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <div class="bgcolor" style="width:506px;">
                                    <label>备注</label>
                                    <el-input placeholder=""
                                            class="remark"
                                            v-model="remark"
                                            ></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3" class="mt10 mb10 ml80">
                                <div>
                                    <span class="makeMonth" @click="createMonth">生成会计月份</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-transition>


                <el-row class="pb10 bg">
                    <el-col :span='24'>
                        <div class="pe-month">
                            <span>会计月份</span>
                        </div>

                        <div class="toggle-btn">
                            <span @click='ifShowTable = !ifShowTable'>收起</span>
                            <i class="el-icon-arrow-up"></i>
                        </div>
                    </el-col>
                </el-row>
                <el-collapse-transition>
                    <el-row v-show='ifShowTable'>
                        <el-col :span="24" >
                            <el-table class="normalTable" border :data="tableData" style="width: 100%">
                                <el-table-column prop="periodMonth" label="会计月份" width="180">
                                    <template slot-scope="scope" >
                                        <el-input class="noEdit" :disabled="true" v-model="scope.row.periodMonth"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="effectiveStart" label="开始时间" width="180">
                                    <template slot-scope="scope" >
                                        <el-input  class="noEdit" :disabled="true" v-model="scope.row.effectiveStart"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="effectiveEnd" label="结束时间">
                                    <template slot-scope="scope" >
                                        <el-input  class="noEdit" v-model="scope.row.effectiveEnd"  @change="resetBeginDate(scope.row)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="remark" label="备注">
                                    <template slot-scope="scope" >
                                        <el-input  class="noEdit" v-model="scope.row.remark"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="modifiedBy" label="修改人">
                                    <template slot-scope="scope" >
                                        <el-input  class="noEdit" :disabled="true" v-model="scope.row.modifiedBy"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="modifiedTime" label="修改时间">
                                    <template slot-scope="scope" >
                                        <el-input  class="noEdit" :disabled="true" v-model="scope.row.modifiedTime"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-collapse-transition>

                <el-row class="ft12 pr10 pt10 br3 bg">
                    <el-col :span='24' class="pl10 pt10 pb10">
                        <span>审计信息</span>
                    </el-col>

                    <el-col :span="24" class="pb10">
                        <el-row class="pl10">
                            <div>
                                <div class="bgcolor"><label>创建人</label><el-input v-model="creatBy" :disabled="true"></el-input></div>
                                <div class="bgcolor"><label>创建时间</label><el-input v-model="creatTime" :disabled="true"></el-input></div>
                                <div class="bgcolor"><label>修改人</label><el-input v-model="modifyBy" :disabled="true"></el-input></div>
                                <div class="bgcolor"><label>修改时间</label><el-input v-model="modifyTime" :disabled="true"></el-input></div>
                            </div>
                        </el-row>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <!-- <dialogBox :message="dialogMessage" :dialogVisible="dialogShow"  @confirm="del" @cancel="delCancel"></dialogBox>    -->
    </div>
</template>

<script>
import dialogBox from '../../base/dialog/dialog'
import Table from '../../base/Table/Table'

    export default{
        name:'currencyList',
        data(){
            return {
                list:[],//系统字典值表
                updateList:[],//修改的数据
                addList:[],//新增的数据
                ifShow:true,//控制折叠页面
                ifShowTable:true,//控制折叠页面
                periodYear:'',//会计年份
                periodNum:'',//会计月份
                chooseDate:[],//选择日期
                remark:'',//备注
                creatBy:'',//创建人
                creatTime:'',//创建时间
                modifyBy:'',//修改人
                modifyTime:'',//修改时间
                ifData:false,
                addData:{
                    "groupID": 1,
                    "ouID": '',
                    "accperiodSchemeID": '',
                    "periodYear":'' ,
                    "periodNum": '',
                    "beginDate":'',
                    "endDate":'',
                    "remark": '',
                    "isDeleted": false,
                    "deletedBy": '',
                    "deletedTime": '',
                    "modifiedBy": '',
                    "modifiedTime": '',
                    "createdBy": '',
                    "createdTime": '',
                    "id": 0 ,
                    "accperiodContents": [
                        // {
                        // "groupID": 0,
                        // "ouID": 0,
                        // "accperiodId": 0,
                        // "periodMonth": 0,
                        // "effectiveStart": '',
                        // "effectiveEnd": '',
                        // "remark": '',
                        // "id": 0
                        // }
                    ]
                   },
                options: [],
                value:'',
                searchLeft: '',
                componyTreeData:[],
                componyTree:[
                    {
                        label:'全部',
                        children:[]
                    }
                ],
                treeLoading:false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                ouid:'',
                accperiodSchemeID:'',
                treeData:[],
                flag:true,//list的
                treeFlag:true,
                id:'',//需要删除的ID
                saveflag:true,//判断年份是否重复
                dialogMessage:'',
                dialogUserConfirm:false,//是否删除弹框提示
                modifyflag:true,
                dialogResetBeginDate:false,
                createFlag:false,
                tableData:[],
            }
        },
        validators: {
          'periodYear': function (value) {//会计年份
             return this.Validator.value(value).required().maxLength(4)
          },
          'periodNum': function (value) {//会计期间
             return this.Validator.value(value).required().maxLength(2);
          },
          'chooseDate': function (value) {//日期
             return this.Validator.value(value).required();
          }
        },
        created:function(){
            this.loadList();
            this.loadOuId();
            this.loadIcon();
        },
        methods:{
        //---获取数据-------------------------------------------------------
            loadList(){//获取系统字典值表
                let _this = this;
                this.$axios.gets('/api/services/app/DictItemManagement/GetAll',{SkipCount:0,MaxResultCount:100}).then(function(res){
                    _this.list = res.result.items;
                    //console.log(_this.list)
                }).catch(function(err){
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                })
            },
            loadOuId(){//获取ouId
                let _this=this;
                _this.$axios.gets('/api/services/app/User/GetCurrentUser').then(function(res){
                    _this.ouid=res.result.ouId;
                    _this.addData.ouID=res.result.ouId;
                    //console.log(res)
                }).catch(function(err){
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                });
            },
            loadSelect(){//获取select
                let _this=this;
                _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'AccountScheme'}).then(function(res){
                    _this.value=res.result[0].itemValue;
                    _this.options=res.result;
                    //console.log(_this.list)
                    //调取默认数据
                    _this.seletChange();
                    //console.log(_this.treeData)
                    //console.log(_this.componyTree)
                    let l=_this.treeData.length;
                    var y=_this.treeData[l-1];
                    var x={'label':y}
                    _this.$refs.tree.setCurrentKey("2018");
                    //console.log(_this.chooseDate)
                    _this.TreeNodeClick(x);
                }),function(res){
                    console.log('err'+res)
                }
            },
            seletChange(){
                let _this=this;
                _this.loadList();
                _this.accperiodSchemeID=_this.value
                // $.each(_this.list,function(index,value){
                //     if(_this.list[index].itemName==_this.value){
                //         _this.accperiodSchemeID=_this.list[index].id;
                //     }
                // });
                _this.loadTree();
                //console.log(_this.treeData)
            },
            loadTree(){
                let _this=this;
                _this.treeLoading=true;
                //console.log(_this.ouid,_this.accperiodSchemeID)
                _this.$axios.gets('/api/services/app/Accperiod/GetByAccoperiodSchemeID',{OuId:_this.ouid,AccperiodSchemeID:_this.accperiodSchemeID}).then(function(res){
                    //console.log(_this.ouid,res)
                    _this.componyTreeData=res.result;
                    if(_this.componyTreeData.length==0){
                        _this.modifyflag=false;
                        _this.ifData=true;
                    }else{
                        _this.ifData=false;
                    }
                    _this.treeData=[];
                    _this.componyTree[0].children=[];
                    $.each(_this.componyTreeData,function(index,value){
                        _this.treeData.push(value.periodYear);
                        _this.treeData.sort(function (a, b) {
                            return a > b ? 1 : -1;
                        });
                        //console.log(_this.treeData)
                    })
                    $.each(_this.treeData,function(index,value){
                        var childrenData={label:value};
                        _this.componyTree[0].children.push(childrenData);
                    })
                     //console.log(_this.componyTree[0].children)
                    _this.treeLoading=false;
                    _this.loadIcon()
               }).catch(function(err){
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                })
            },
            loadIcon(){
                let _this=this;
                _this.$nextTick(function () {
                    $('.preNode').remove();
                    $('.el-tree-node__label').each(function(){
                        if($(this).parent('.el-tree-node__content').next('.el-tree-node__children').text()==''){
                            $(this).prepend('<i class="preNode fa fa-file" aria-hidden="true" style="color:#f1c40f;margin-right:5px"></i>')
                        }else{
                            $(this).prepend('<i aria-hidden="true" class="preNode fa fa-folder-open" style="color:#f1c40f;margin-right:5px"></i>')
                        }
                    })
                })
            },
            TreeNodeClick(data){
                let _this=this;
                _this.validation.reset();
                _this.modifyflag=true;
                _this.chooseDate=[];
                $.each(_this.componyTreeData,function(index,value){
                    if(value.periodYear==data.label){
                        _this.id=value.id;
                        _this.periodYear=value.periodYear;
                        _this.periodNum=value.periodNum;
                        _this.remark=value.remark;
                        _this.chooseDate.push(value.beginDate);
                        _this.chooseDate.push(value.endDate);
                        let rescreatTime = new Date(value.createdTime)
                        let resmodifyTime = new Date(value.modifiedTime);
                        _this.creatBy=value.createdBy;
                        _this.creatTime=_this.resdatetime(rescreatTime);
                        _this.modifyBy=value.modifiedBy;
                        _this.modifyTime=_this.resdatetime(resmodifyTime);
                        //_this.createMonth();
                    }
                })

            },
            detailList(){//请求点击树节点年份的详细信息
                let _this=this;
                _this.$axios.gets('/api/services/app/Accperiod/GetByID',{id:_this.id}).then(function(res){
                    console.log(res)
                    _this.addData.accperiodContents=res.result.accperiodContents;
                    _this.tableData=res.result.accperiodContents;
                    $.each( _this.tableData,function(index,value){
                        _this.tableData[index].effectiveEnd=_this.resdate(new Date(value.effectiveEnd))
                        _this.tableData[index].effectiveStart=_this.resdate(new Date(value.effectiveStart))
                        _this.tableData[index].modifiedBy=_this.modifyBy;
                        _this.tableData[index].modifiedTime=_this.modifyTime;
                    })
                    //console.log(res.result.accperiodContents)
                })

            },
            filterNode(value,data){
                if (!value) return true;
                return String(data.label).indexOf(value) !== -1;
            },
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
            //---增加-----------------------------------------------------------
            add(){
                let _this=this;
                _this.modifyflag=false;
                _this.periodYear='';
                _this.periodNum='';
                _this.chooseDate=[];
                _this.tableData=[];
                _this.remark='';
                let nowTime=new Date();
                _this.creatTime=_this.resdatetime(nowTime)
                _this.modifyTime=_this.resdatetime(nowTime)
                _this.validation.reset();
            },
            nowTime(){
                let _this=this;
                let nowTime=new Date();
                return _this.resdatetime(nowTime)
            },
            //---保存-----------------------------------------------------------

            save(){
                let _this=this;
                if(_this.modifyflag){
                    _this.modify();
                }else{
                    _this.$validate().then(function (success) {
                        $.each(_this.componyTreeData,function(index,value){
                            if(_this.periodYear==value.periodYear){
                                _this.saveflag=false;
                                _this.$alert('已有该年份', {
                                        confirmButtonText: '确定'
                                    }
                                );
                            }
                        })
                        //_this.createMonth();
                        if (success&&_this.saveflag&&_this.createFlag) {
                            _this.createFlag=false;
                            _this.addData.periodYear=_this.periodYear;
                            _this.addData.periodNum=_this.periodNum;
                            _this.addData.beginDate=_this.chooseDate[0];
                            _this.addData.endDate=_this.chooseDate[1];
                            _this.addData.remark=_this.remark;
                            _this.addData.accperiodSchemeID=_this.accperiodSchemeID;
                            let nowtime=_this.nowTime()
                            _this.addData.createdTime=nowtime;
                            _this.addData.modifiedTime=nowtime;
                            _this.$axios.posts('/api/services/app/Accperiod/Create',_this.addData).then(function(res){
                                console.log(res)
                                _this.seletChange();
                                _this.open('保存成功','el-icon-circle-check','successERP');
                            }).catch(function(err){
                                    _this.$message({
                                        type: 'warning',
                                        message: err.error.message
                                    });
                            })
                        }
                    });
                }


            },
            modify(){//修改保存
                let _this=this;
                //_this.createMonth();
                _this.createFlag=true;
                _this.$validate().then(function (success) {
                    if (success&&_this.saveflag&&_this.createFlag) {

                        _this.addData.periodYear=_this.periodYear;
                        _this.addData.periodNum=_this.periodNum;
                        _this.addData.beginDate=_this.chooseDate[0];
                        _this.addData.endDate=_this.chooseDate[1];
                        _this.addData.remark=_this.remark;
                        _this.addData.accperiodSchemeID=_this.accperiodSchemeID;
                        _this.addData.id=_this.id;
                        let nowtime=_this.nowTime()
                        _this.addData.createdTime=nowtime;
                        _this.addData.modifiedTime=nowtime;

                        console.log(_this.addData)
                        _this.$axios.puts('/api/services/app/Accperiod/Update',_this.addData).then(function(res){
                            _this.createFlag=false;
                            _this.seletChange();
                            _this.open('保存成功','el-icon-circle-check','successERP');
                        }).catch(function(err){
                                _this.$message({
                                    type: 'warning',
                                    message: err.error.message
                                });
                        })
                    }
                });
            },
            dialogConfirm(){
                let _this=this;
                //console.log(_this.ifData)
                if(_this.ifData){
                    _this.dialogUserConfirm=false;
                }else{
                    _this.dialogUserConfirm=true;
                }

            },
            del(){
                let _this=this;
                //console.log(_this.id)
                _this.$axios.deletes('/api/services/app/Accperiod/Delete',{id:_this.id})
                .then(function(res){
                    _this.dialogUserConfirm=false;
                    _this.loadTree();
                    _this.open('删除成功','el-icon-circle-check','successERP');
                }).catch(function(err){
                    _this.dialogUserConfirm=false;
                    _this.$message({
                        type: 'warning',
                        message: err.error.message
                    });
                })
            },
            addSave(){
                let _this=this;
                if(_this.modifyflag){
                    _this.modify();
                }else{
                    _this.$validate().then(function (success) {
                        $.each(_this.componyTreeData,function(index,value){
                            if(_this.periodYear==value.periodYear){
                                _this.$alert('已有该年份', {
                                        confirmButtonText: '确定'
                                    }
                                );
                            }
                        })
                        _this.createMonth();
                        if (success&&_this.saveflag&&_this.createFlag) {
                            _this.addData.periodYear=_this.periodYear;
                            _this.addData.periodNum=_this.periodNum;
                            _this.addData.beginDate=_this.chooseDate[0];
                            _this.addData.endDate=_this.chooseDate[1];
                            _this.addData.remark=_this.remark;
                            _this.addData.accperiodSchemeID=_this.accperiodSchemeID;
                            let nowtime=_this.nowTime()
                            _this.addData.createdTime=nowtime;
                            _this.addData.modifiedTime=nowtime;
                            _this.$axios.posts('/api/services/app/Accperiod/Create',_this.addData).then(function(res){
                                _this.createFlag=false;
                                _this.add();
                                _this.seletChange();
                                _this.open('保存成功','el-icon-circle-check','successERP');
                            }).catch(function(err){
                                    _this.$message({
                                        type: 'warning',
                                        message: err.error.message
                                    });
                            })
                        }
                    });
                }


            },
            setDate(){//输入会计年份时让日期范围默认设置
                let _this=this;
                _this.chooseDate=[_this.periodYear+"-01-01",_this.periodYear+"-12-31"];
                //console.log(_this.chooseDate)
            },
            resetBeginDate(data){
                let _this=this;
                if(new Date(_this.addData.accperiodContents[data.periodMonth].effectiveEnd.replace(/\-/g, "\/"))<=new Date(data.effectiveEnd.replace(/\-/g, "\/"))){
                    _this.dialogResetBeginDate=true;
                }else{
                    _this.addData.accperiodContents[data.periodMonth].effectiveStart=data.effectiveEnd;
                }
            },
            resday:function(resday){
                return resday.getDate()
            },
            resmonth:function(resmonth){
                return (resmonth.getMonth() + 1)
            },
            resyear:function(resyear){
                return resyear.getFullYear()
            },
            resdate:function(resdate){
                return resdate.getFullYear()+'-'+(resdate.getMonth()+1)+'-'+resdate.getDate()
            },
            resdatetime:function(resdatetime){
                return resdatetime.getFullYear()+'-'+(resdatetime.getMonth()+1)+'-'+resdatetime.getDate()+' '+resdatetime.getHours()+':'+resdatetime.getMinutes()+':'+resdatetime.getSeconds()
            },
            switchStartTime:function(m){
                if(m==1){
                    return '1-1'
                }else if(m==2){
                    return '2-1'
                }else if(m==3){
                    return '3-1'
                }else if(m==4){
                    return '4-1'
                }else if(m==5){
                    return '5-1'
                }else if(m==6){
                    return '6-1'
                }else if(m==7){
                    return '7-1'
                }else if(m==8){
                    return '8-1'
                }else if(m==9){
                    return '9-1'
                }else if(m==10){
                    return '10-1'
                }else if(m==11){
                    return '11-1'
                }else if(m==12){
                    return '12-1'
                }
            },
            switchEndTime:function(y,m){
                if(m==1){
                    return '1-31'
                }else if(m==2){
                    if (y%4==0&&y%100!=0){
                        return '2-29'
                    }else if (y%400==0){
                        return '2-29'
                    }
                    else{
                        return '2-28'
                    }
                }else if(m==3){
                    return '3-31'
                }else if(m==4){
                    return '4-30'
                }else if(m==5){
                    return '5-31'
                }else if(m==6){
                    return '6-30'
                }else if(m==7){
                    return '7-31'
                }else if(m==8){
                    return '8-31'
                }else if(m==9){
                    return '9-30'
                }else if(m==10){
                    return '10-31'
                }else if(m==11){
                    return '11-30'
                }else if(m==12){
                    return '12-31'
                }

            },
            createMonth(){

                let _this=this;
                _this.createFlag=true;
                _this.$validate().then(function (success) {
                var startdate = new Date(_this.chooseDate[0]);
                var enddate = new Date(_this.chooseDate[1]);
                var startmonth =_this.resmonth(startdate);
                var endmonth =_this.resmonth(enddate);
                var startyear=_this.resyear(startdate);
                var endYear=_this.resyear(enddate);
                var startday=_this.resday(startdate);
                if(_this.chooseDate[0]!=undefined&&startyear!=endYear){
                    _this.chooseDate=["",""];
                    _this.$alert('开始日期的年份需与结束日期年份相同', {
                            confirmButtonText: '确定'
                        }
                    );
                }else{
                    //日期范围相差月份
                    var diffMonth=(endmonth-startmonth)+1;
                    //判断期间个数与日期范围
                    if(diffMonth<_this.periodNum){
                            for(let j=0;j<diffMonth;j++){
                            var monthData={
                                periodMonth:'',
                                effectiveStart: '',
                                effectiveEnd: '',
                                remark:'',
                                modifiedBy:'',
                                modifiedTime:'',
                                groupID: 0,
                                ouID: 0,
                                accperiodId: 0,
                                id: 0
                            }
                            _this.addData.accperiodContents.length=j;
                            _this.addData.accperiodContents.push(monthData);
                            _this.addData.accperiodContents[j].periodMonth=j+1;
                            _this.addData.accperiodContents[j].effectiveStart=startyear+'-'+_this.switchStartTime(startmonth+j);
                            _this.addData.accperiodContents[0].effectiveStart=_this.resdate(startdate);
                            _this.addData.accperiodContents[j].effectiveEnd=startyear+'-'+_this.switchEndTime(startyear,startmonth+j);
                            _this.addData.accperiodContents[j].modifiedBy=_this.modifyBy;
                            _this.addData.accperiodContents[j].modifiedTime=_this.nowTime();
                        }
                        _this.addData.accperiodContents[diffMonth-1].effectiveEnd=_this.resdate(enddate);
                        _this.periodNum=diffMonth;
                        _this.tableData=_this.addData.accperiodContents
                        console.log(_this.addData.accperiodContents)

                    }else{
                        for(let i=0;i<_this.periodNum;i++){
                            var monthData={
                                periodMonth:'',
                                effectiveStart: '',
                                effectiveEnd: '',
                                remark:'',
                                modifiedBy:'',
                                modifiedTime:'',
                                groupID: 0,
                                ouID: 0,
                                accperiodId: 0,
                                id: 0
                            }
                            _this.addData.accperiodContents.length=i;
                            _this.addData.accperiodContents.push(monthData);
                            _this.addData.accperiodContents[i].periodMonth=i+1;
                            _this.addData.accperiodContents[i].effectiveStart=startyear+'-'+_this.switchStartTime(startmonth+i);
                            _this.addData.accperiodContents[0].effectiveStart=_this.resdate(startdate);
                            _this.addData.accperiodContents[i].effectiveEnd=startyear+'-'+_this.switchEndTime(startyear,startmonth+i);
                            _this.addData.accperiodContents[i].modifiedBy=_this.modifyBy;
                            _this.addData.accperiodContents[i].modifiedTime=_this.nowTime();
                        }
                        _this.addData.accperiodContents[_this.periodNum-1].effectiveEnd=_this.resdate(enddate);
                        diffMonth=_this.periodNum;
                        _this.tableData=_this.addData.accperiodContents
                        console.log(_this.tableData,_this.addData.accperiodContents)
                    }
                }


                })


            },
            //------------------------------------------------------------------
            // --------------open----------------------------------------------
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
        //------------------------------------------------------------------
    },
    watch:{
        list:function(val,oldVal){
            if(this.flag){
                 if(val!=''){
                    this.loadSelect();
                    this.flag=false;
                }
            }
        },
        treeData:function(val,oldVal){
            if(this.treeFlag){
                 if(val!=''){
                    this.loadSelect();
                    this.treeFlag=false;
                }
            }
        },
        searchLeft(val) {
            this.$refs.tree.filter(val);
        },
        id(val){
            if(val!=''){
                this.detailList();
            }
        }
    },
    mounted:function(){
        let _this=this;
        $(window).scroll(function(){
            if($(window).scrollTop()>61){
            if(!_this.$store.state.show){
                let w=$('.fixed').parent().width();
                $('.fixed').width(w);
                $('.fixed').css({
                "position":'fixed',
                "top":'93px',
                "z-index":'998'
                }).next('div').css({marginTop:'47px'})
            }else{
                let w=$('.fixed').parent().width();
                $('.fixed').width(w);
                $('.fixed').css({
                position:'fixed',
                top:'93px',
                zIndex:'998',
                transition: 'width 0s'
                }).next('div').css({marginTop:'47px'})
            }
            _this.$store.commit('go1');
            }else{
            $('.fixed').css({
                position:'relative',
                top:'0',
                transition: 'width 0s'
            }).next('div').css({marginTop:0})
            _this.$store.commit('go2');
            }
        })

    },
    components:{
        dialogBox,
        Table
    }
}
</script>

<style scoped>
    .fixed{
        background-color: white;
    }
    .left-box{
        width: 290px;
    }
    .t-btn{
        cursor: pointer;
        font-size: 12px;
        height: 36px;
        line-height: 36px;
        margin-left: 94%;
    }
	.noEdit .el-input__inner {
        border: none;
        height: 28px;
        text-align: center;
    }
    .noEdit.is-disabled .el-input__inner{
        color: #606266;
        background: #fff;
    }
    .update-icon{
        width:14px;
        height: 14px;
        position: absolute;
        left: -55px;
        top: 0px;
    }
   .normalTable .el-select input.el-input__inner[disabled] {
    background: #fff;
    height: 28px;
    border: 0;
    color: #606266;
    text-align: center;
}

.bg-white{
    background: white;
    border-radius: 3px;
}
.input-need{
    border:none;
    outline: none;
    width: 100%;
    height: 23px;
    line-height: 23px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt5{
    margin-top: 5px;
}
.mb10{
    margin-bottom: 10px;
}
.mt10{
    margin-top: 10px;
}
.mt20{
    margin-top: 20px;
}

.ml20{
    margin-left: 20px;
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
.border1{
    border: 1px solid #cccccc;
    border-radius: 3px;
}
.text-right{
    text-align: right;
}
.input-bgw{
    background: white;
    text-align: center;
}
.input-bgp{
    background: #FAFAFA;
    text-align: center;
}
.border-left{
    border-left: 1px solid #E4E4E4;
    min-height: 380px;
    width:calc(100% - 290px);
}
.pe-month{
    display: inline-block;
    height: 38px;
    line-height: 38px;
}
.pe-month span{
    display: inline-block;
    margin-left:5px;
    height:36px;
    border-bottom:2px solid rgb(9, 218, 218);
}
.toggle-btn{
    cursor: pointer;
    font-size: 12px;
    float: right;
    margin-right: 20px;
    height: 36px;
    line-height: 36px;
}
.bb1{
    border-bottom: 1px solid #cccccc;
}
.time{
    height: 35px;
    font-size: 12px;
    margin-bottom: 15px;
    float: left;
    overflow: hidden;
    margin-right: 5px;
}
.time label .small{
    color: #FF669B;
    margin-right: 2px;
}
.time label{
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    width: 72px;
    height: 100%;
    float: left;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal
}
.list-wrapper .only-remark{
    height: 35px;
    font-size: 12px;
    margin-bottom: 15px;
    width: 500px;
    float: left;
    overflow: hidden;
    margin-right: 5px;
}
.only-remark label{
    margin-right: 10px;
    text-align: right;
    line-height: 35px;
    display: block;
    width: 72px;
    height: 100%;
    float: left;
    color: #333333;
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal;
}
.makeMonth{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    background: #00CA7A;
    color: white;
    font-size: 14px;
    width: 100%;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
}
.ml80{
    margin-left: 96px;
}
.search_input{
    height: 25px;
    border-radius: 30px;
}
.width{
    margin:5px auto;
    width:90%;
}
.bg{
    background-color: #eef1f5
}


</style>

<style>
/* 重写checkbox */
.list-wrapper .el-checkbox__inner{
    width: 18px;
    height: 18px;
    border-radius:50% !important;
}
.list-wrapper .el-checkbox__inner::after{
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 11px;
    left: 6px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 6px;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}

/* 重写el-table样式 */
.list-wrapper .el-table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    padding: 5px 0;
    text-align: center;
    background-color: #ececec;
}
.list-wrapper .el-table td{
    padding: 3px 0;
}
.list-wrapper .el-table__body{
    text-align: center;
}
.list-wrapper .el-range-editor.el-input__inner{
    height:35px;
    line-height:30px;
}
.only-remark .remark .el-input__inner{
    display: block;
    float: left;
    height:35px;
}
</style>
