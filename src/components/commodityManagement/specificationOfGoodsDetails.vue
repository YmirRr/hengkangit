<template>
    <div class="specificationOfGoodsDetails commodity">
        <el-row >
            <el-col :span='24'>
                <div class="bg-white">
                    <div class="fixed">
                       <btm :date="bottonbox" v-on:listbtm="btmlog"> </btm> 
                    </div>
                    
                    <el-row class="pl10 pr10">
                        <el-col :span="24" style="margin-top:20px">
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>商品规格组</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                    <el-select clearable filterable  
                                            class="specId"
                                            placeholder=""
                                            v-model="addData.specgroup_MainTable.specId" :disabled="isDisabled">
                                        <el-option v-for="item in tableTree" :key="item.id" :label="item.specName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                <!-- <el-input placeholder="" v-model="addData.specId"
                                 ></el-input> -->
                                </div>
                            </el-col>
                            <!-- <div class="error_tips_info">{{ validation.firstError('addData.specCode') }}</div> -->
                        </el-col>
                    </el-row>
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>规格组编码</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" v-model="addData.specgroup_MainTable.specgroupCode" :class="{redBorder : validation.hasError('addData.specgroup_MainTable.specgroupCode')}"

                                 ></el-input>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.specgroup_MainTable.specgroupCode') }}</div>
                        </el-col>
                    </el-row>
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>规格组名称</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" v-model="addData.specgroup_MainTable.specgroupName" :class="{redBorder : validation.hasError('addData.specgroup_MainTable.specgroupName')}"
                                 ></el-input>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.specgroup_MainTable.specgroupName') }}</div>
                        </el-col>
                    </el-row>
                    <el-row class="pl10 pr10">
                        <el-col :span="24">
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label><small>*</small>类目</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                    <el-select clearable filterable  
                                            class="specId"
                                            placeholder=""
                                            v-model="addData.specgroup_MainTable.categoryId"
                                            :class="{redBorder : validation.hasError('addData.specgroup_MainTable.categoryId')}"
                                            >
                                        <el-option v-for="item in category" :key="item.id" :label="item.categoryName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <div class="error_tips_info">{{ validation.firstError('addData.specgroup_MainTable.categoryId') }}</div>
                        </el-col>
                    </el-row>
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label>状态</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                    <el-select  
                                            class="specId"
                                            placeholder=""
                                            v-model="addData.specgroup_MainTable.status">
                                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                <!-- <el-input placeholder="" v-model="addData.status"
                                 ></el-input> -->
                                </div>
                            </el-col>
                            <!-- <div class="error_tips_info">{{ validation.firstError('addData.specCode') }}</div> -->
                        </el-col>
                    </el-row>
                    <el-row class="pl10 pr10">
                        <el-col :span="24" >
                            <el-col :span="9">
                                <div class="bgcolor smallBgcolor" >
                                        <label>备注</label>
                               </div>
                            </el-col>
                            <el-col :span="5" >
                                <div class="smallBgcolor bgcolor" >
                                <el-input placeholder="" v-model="addData.specgroup_MainTable.remark"
                                 ></el-input>
                                </div>
                            </el-col>
                            <!-- <div class="error_tips_info">{{ validation.firstError('addData.specCode') }}</div> -->
                        </el-col>
                    </el-row>
                </div>
                <div class="mt10 pb10" style="background:rgb(249,249,249)">
                    <el-row class="bm-pd10">
                            <el-col :span="12">
                                <span class="shop-title">
                                    商品规格
                                </span>
                            </el-col>
                            <el-col :span="12" >
                                <span class="shop-sq" @click="ifShow = !ifShow" >收起<i class="el-icon-arrow-down" @click="ifShow = !ifShow" :class="{rotate : !ifShow}" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                            </el-col>
                    </el-row>
                    <el-collapse-transition>
                        <div v-show="ifShow">
                        <el-row class="pl10 pr10 pb10">
                            <el-col :span="12">
                                <div class="left">  
                                    <el-button type="success" @click="choose"><i class="el-icon-plus" style="margin-right:5px;" ></i>选取</el-button>
                                </div> 
                            </el-col>
                            <el-col :span="6" style="float:right">
                                <div class="right">
                                    <div class="transfer_search" style="width:100%">
                                        <el-input
                                            placeholder="搜索..."
                                            v-model="searchTableLeft1"
                                            class="search_input"
                                            >
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </div>
                                    <!-- <el-autocomplete
                                        v-model="searchLeft"
                                        :fetch-suggestions="querySearchAsync"
                                        class="search_input"
                                        placeholder="搜索..."
                                        >
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-autocomplete> -->
                                </div>
                            </el-col>
                        </el-row>
                        <div >
                            <el-table :data="showChecked"  border style="width: 100%" class="text-center transfer_table">
                                
                                <el-table-column prop="specValueCode" label="编码">
                                    <template slot-scope="scope">
                                        <el-button type="text"  >{{scope.row.specValueCode}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="specValueName" label="名称">
                                    <template slot-scope="scope">
                                        <el-button type="text"  >{{scope.row.specValueName}}</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="状态">
                                    <template slot-scope="scope">
                                        <el-select  v-model="scope.row.status"  disabled="disabled" 
                                        :class="'specId'+scope.row.status">
                                            <el-option  v-for="item in statusOptions1" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>

                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="名称">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="hangdel(scope.row)" >删除</el-button>
                                    </template>
                                </el-table-column>
                          </el-table> 
                        </div>
                        </div>
                    </el-collapse-transition>
                </div>
                <el-row class="pl10 pr10 pt10 pb10" style="background-color:#fff">
                    <el-col :span="24" style="margin-bottom:30px;">
                        <h4>审计信息</h4>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>创建人</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.specgroup_MainTable.createdBy" :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>创建时间</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.specgroup_MainTable.createdTime"  :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>修改人</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.specgroup_MainTable.modifiedBy" :disabled="isDisabled"></el-input>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="6">
                        <el-col :span="6">
                            <div class="bgcolor smallBgcolor" >
                                    <label><small></small>修改时间</label>
                           </div>
                        </el-col>
                        <el-col :span="13" >
                            <div class="smallBgcolor bgcolor" >
                            <el-input placeholder="" v-model="addData.specgroup_MainTable.modifiedTime" :disabled="isDisabled" ></el-input>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogTableVisible" title="商品规格值" class="transfer_dialog">
            <el-col :span="24">
                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>已选</span>
                        <div class="transfer_search" @keyup.enter="searchLeftTable">
                            <el-input
                                placeholder="搜索..."
                                v-model="searchTableLeft"
                                class="search_input"
                                >
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>    
                    </el-col>    
                    <el-col :span="24" class="transfer_table">
                        <el-table 
                        border 
                        style="width: 100%" 
                        stripe 
                        max-height="450"
                        @selection-change="leftFn_change"
                        :data="showChecked"
                        ref="roleTableLeft">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="specValueCode" label="规格编码">
                                <template slot-scope="scope">
                                    <el-button type="text"  >{{scope.row.specValueCode}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specValueName" label="规格名称">
                                <template slot-scope="scope">
                                    <el-button type="text"  >{{scope.row.specValueName}}</el-button>
                                </template>
                            </el-table-column>
                           <!--  <el-table-column prop="status" label="状态">
                                <template slot-scope="scope">
                                    <el-select  v-model="scope.row.status"  disabled="disabled" 
                                    :class="'specId'+scope.row.status">
                                        <el-option  v-for="item in statusOptions1" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>

                                    </el-select>
                                </template>
                            </el-table-column> -->
                        </el-table>   
                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>总共有{{totalItemLeft}}条数据</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="leftDownBtn" @click="pageDownLeft" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="leftAddBtn" @click="pageAddLeft" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="2" class="transfer_btns">
                    <el-col :span="24" class="transfer_btn_wrapper">
                        <el-button class="el_transfer" :disabled="is_Fn_nocheked" @click="noCheck_push_check_Fn" type="primary" icon="el-icon-arrow-left" round></el-button>
                        <el-button class="el_transfer" :disabled="is_Fn_cheked" @click="check_push_noCheck_Fn" type="primary" icon="el-icon-arrow-right" round></el-button>
                    </el-col>
                </el-col>
                <el-col :span="11" class="transfer_warapper">
                    <el-col :span="24" class="transfer_header">
                        <span>可选</span>
                        <div class="transfer_search" @keyup.enter="searchRightTable">
                            <el-input
                                placeholder="搜索..."
                                v-model="searchTableRight"
                                class="search_input"
                                >
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </el-col>    
                    <el-col :span="24" class="transfer_table">
                        <el-table 
                        border 
                        max-height="450"
                        :data="showNoChecked"
                        style="width: 100%" 
                        stripe 
                        @selection-change="rightFn_change"
                        ref="roleTabRight">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="specValueCode" label="规格编码">
                                <template slot-scope="scope">
                                    <el-button type="text"  >{{scope.row.specValueCode}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specValueName" label="规格名称">
                                <template slot-scope="scope">
                                    <el-button type="text"  >{{scope.row.specValueName}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
                                <template slot-scope="scope">
                                    <el-select  v-model="scope.row.status"  disabled="disabled" 
                                    :class="'specId'+scope.row.status">
                                        <el-option  v-for="item in statusOptions1" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>

                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>  
                        
                    </el-col>
                    <el-col :span="24" class="transfer_footer">
                        <el-col :span="18">
                            <span>总共有{{totalItemRight}}条数据</span>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="el_transfer" :disabled="rightDownBtn" @click="pageDownRight" type="primary" icon="el-icon-arrow-left" round></el-button>
                            <el-button class="el_transfer" :disabled="rightAddBtn" @click="pageAddRight" type="primary" icon="el-icon-arrow-right" round></el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
            <span slot="footer">
                <button class="transfer_footer_btn transfer_confirm" @click="dialogTableVisible = false">确 认</button>
                <button class="transfer_footer_btn" @click="CancelTree">取 消</button>
            </span>
        </el-dialog>
        <!--dialog结束  --> 
         <!-- dialog数据变动提示 -->
        <el-dialog :visible.sync="dialogUserConfirm" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-question"></i></p>
                    <p class="dialog_font dialog_body_message">此操作将忽略您的更改，是否继续？</p>
                </el-col>
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font" @click="sureDoing">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="dialogUserConfirm = false">取 消</button>
            </span>
        </el-dialog>
        <!-- dialog -->
         <!-- dialog错误信息提示 -->
        <el-dialog :visible.sync="errorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="detail_message_ifShow = !detail_message_ifShow" :class="{rotate : !detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">信息提报有误!</p>
                </el-col>
                <el-collapse-transition>
                    <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                        <vue-scroll :ops="$store.state.option">
                            <span class="dialog_font">{{response.message}}</span>
                            <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                            <span class="dialog_font">{{response.details}}<br><span :key="index" v-for="(value,index) in response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                        </vue-scroll> 
                    </el-col>
                </el-collapse-transition>   
            </el-col>
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="errorMessage = false">确 认</button>
            </span>
        </el-dialog>
        <!-- dialog --> 
    </div>
</template>

<script>
import Textbox from '../../base/textbox/textbox'
    export default{
        name:'customerInfor',
        data(){
            return{
                ifShow:true,
                ifShow1:true,
                input4:'',
                radio:'1',
                searchTableLeft:'',//搜索\
                searchTableLeft1:'',//搜索\
                isDisabled:true,
                searchTableRight:'',//搜索
                dialogUserConfirm:false,
                errorMessage:false,
                detail_message_ifShow:false,
                response:{
                    details:'',
                    message:'',
                    validationErrors:[],
                },
                dialogTableVisible:false,//控制对话框
                checkTable:[],
                nocheckedTable:[],
                checkedTable:[],
                pageIndexLeft:1,//分页的当前页码
                totalItemLeft:0,//总共有多少条消息 
                pageLeft:1,//当前页 
                pageRight:1,//当前页
                totalItemRight:0,//总共有多少条消息 
                pageIndexRight:1,//分页的当前页码
                is_Fn_nocheked:true,//穿梭框按钮显示隐藏
                is_Fn_cheked:true,
                leftDownBtn:true,//分页按钮是否显示
                leftAddBtn:true,//分页按钮是否显示
                rightDownBtn:true,//分页按钮是否显示
                oneItemLeft:10,//每页有多少条信息
                oneItemRight:10,//每页有多少条信息
                rightAddBtn:true,//分页按钮是否显示
                selection_checked: [],//复选框选中数据
                selection_nochecked: [],//复选框选中数据
                showChecked:[],//右侧表格展示的数据
                showNoChecked:[],//左侧表格展示的数据
                LeftWitchPage:"pagination",//分页判断条用函数
                RightWitchPage:"pagination",//分页判断条用函数
                textboxipt1:[{
                    must: '',
                    title: '创建人',
                    place: ''                
                },{
                    must: '',
                    title: '创建时间',
                    place: ''                 
                },{
                    must: '',
                    title: '修改人',
                    place: ''                                
                },{
                    must: '',
                    title: '修改时间',
                    place: ''                 
                }],
                bottonbox:{
                    url: '/specification/specificationOfGoodsList',
                   botton:[{
                    class: 'erp_bt bt_back',
                    imgsrc: '../../../static/image/common/bt_back.png',
                    text: '返回',
                    show:true,
                    update:false,
                    increased: true
                },{
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存',
                    show:true,
                    increased: true
                },{ class: 'erp_bt bt_auxiliary cancel',
                    show:true, 
                    imgsrc: '../../../static/image/common/u470.png',
                    text: '取消',
                    increased: true
                },{
                    class: 'erp_bt bt_save_add',
                    imgsrc: '../../../static/image/common/bt_save_add.png',
                    text: '保存并新增',
                    show:true,
                    increased: true
                },{
                    class: 'erp_bt bt_add abc',
                    imgsrc: '../../../static/image/common/bt_add.png',
                    text: '新增',
                    show:true,
                    increased: false
                },{
                    class: 'erp_bt bt_del',
                    imgsrc: '../../../static/image/common/bt_del.png',
                    text: '删除',
                    show:true,
                    increased: false
                }]},
                statusOptions1:[{
                    value: 0,
                    label: '未启用'
                },{
                    value: 1,
                    label: '启用'
                }],
                statusOptions: [{
                    value: 0,
                    label: '未启用'
                },{
                    value: 1,
                    label: '启用'
                }],
                value: '',
                allRoles:[],//所有数据
                firstModify:false,
                secondModify:false,
                category:[],//商品类目下拉列表数据   
                tableTree:[],//商品规格下拉列表数据
                tableData: [],
                array4:[],
                addData:{
                    specgroup_MainTable: {
                        "groupId": 1,
                        "specId": 0,
                        "categoryId": '',
                        "specgroupCode": "",
                        "specgroupName": "",
                        "seq": 0,
                        "remark": "",
                        "status": 0,
                        createdBy:this.$store.state.name,
                        createdTime: this.GetDateTime(),
                        modifiedBy:this.$store.state.name,
                        modifiedTime:this.GetDateTime(),
                    },
                    specgroupContent_ChildTable: [],
                    delete_IDs:[]
                },
                issecrh:false,
                eachPage:10,//每页有多少条信息
                page:1,//当前页
            }
        },
        validators: {
          'addData.specgroup_MainTable.specgroupCode': function (value) {//规格编码
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.specgroup_MainTable.specgroupName': function (value) {//用户编码
             return this.Validator.value(value).required().maxLength(50)
          },
          'addData.specgroup_MainTable.categoryId': function (value) {//用户编码
             return this.Validator.value(value).required().maxLength(50)
          },
        },
        created:function(){
            let _this=this;
            _this.loadTableData();
            _this.InitModify();
            _this.getAllRoleData();
        },
        watch:{
            addData:{
                handler:function(val,oldVal){
                    let _this=this;
                    if(!_this.firstModify){
                        _this.firstModify = !_this.firstModify;
                    }else{
                        _this.bottonbox.botton[0].update = true;
                    }
                },
                deep:true,
            },
            showNoChecked:{
                handler:function(val,oldVal){
                    let _this=this;
                    if(!_this.secondModify){
                        _this.secondModify = !_this.secondModify;
                    }else{
                        _this.bottonbox.botton[0].update = true;
                    }
                },
                deep:true,
            },
            searchTableLeft1:function(){
                let _this=this;
                
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft1);
                $.each(_this.checkedTable,function(index,val){
                    let str=val.specValueName || val.specValueId_SpecValueName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val)
                    }
                })
                _this.LeftWitchPage="searchLeftTable";
                _this.searchLeftDatas=newJson;
                _this.showChecked=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).nowData
                _this.totalItemLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalItem
                _this.totalPageLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalPage
            }
        },
        methods:{
            btmlog:function(data){
                let _this=this;
                if(data == '新增保存'){
                    _this.saveAndsaveadd('Modify',false);//跳转详情页
                }else if(data == '取消'){
                    if(_this.bottonbox.botton[0].update){
                        _this.dialogUserConfirm = true; 
                    }else{
                       _this.sureDoing();
                    }
                    
                }else if(data == '保存并新增'){
                    _this.saveAndsaveadd('Details',true);//跳转新增页
                }   
            },
            InitModify(){
                let _this=this;
                if(_this.$route.params.id!="default"){
                    _this.addData.specgroup_MainTable.specId = parseInt(_this.$route.params.id);
                }
            },
            loadTableData(){
                let _this=this;
                _this.$axios.gets('/api/services/app/CategoryManagement/GetAll?SkipCount=0&MaxResultCount=100').then(function(res){
                    _this.category = res.result.items
                })
                _this.$axios.gets('/api/services/app/SpecManagement/GetAll',{SkipCount:0,MaxResultCount:1}).then(function(res){
                    let concat1 = res.result.totalCount;
                    if(concat1 > 0){
                        _this.$axios.gets('/api/services/app/SpecManagement/GetAll',{SkipCount:0,MaxResultCount:concat1}).then(function(res){
                            for(let i=0;i<res.result.items.length;i++){
                                if(res.result.items[i].specgroupEnable == true){
                                    _this.tableTree.push(res.result.items[i]);
                                }
                            }
                        })
                    }
                    
                })  
            },
            getAllRoleData(){
                let _this=this;
                _this.checkedTable=[];
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.$axios.gets('/api/services/app/SpecValueManagement/GetSpecId',{SpecId:parseInt(_this.$route.params.id),SkipCount:0,MaxResultCount:1}).then(function(res){
                    let totalAll = res.result.totalCount;
                    if(totalAll>0){
                        _this.$axios.gets('/api/services/app/SpecValueManagement/GetSpecId',{SpecId:parseInt(_this.$route.params.id),SkipCount:0,MaxResultCount:totalAll}).then(function(res){
                            // console.log(res)
                            // _this.showNoChecked = res.result.items
                            _this.nocheckedTable=[];
                            _this.allRoles=res.result.items;
                            _this.totalItemRight=res.result.totalCount
                            if(_this.checkedTable.length>0){//获取可选角色
                                _this.nocheckedTable=_this.uniqueArray(_this.allRoles,_this.checkedTable)
                               
                                _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')
                                _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left')
                            }else{
                                _this.nocheckedTable=_this.allRoles;
                                _this.showChecked=[];
                                _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right')
                                
                            }
                        })
                    }
                })
            },
            searchLeftTable(){
                let _this=this;
                // checkTable
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableLeft);
                $.each(_this.checkedTable,function(index,val){
                    let str=val.specValueName || val.specValueId_SpecValueName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val)
                    }
                })
                _this.LeftWitchPage="searchLeftTable";
                _this.searchLeftDatas=newJson;
                _this.showChecked=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).nowData
                _this.totalItemLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalItem
                _this.totalPageLeft=_this.paginationUserSearch(newJson,_this.oneItemLeft,_this.pageLeft).TotalPage
            },
            leftFn_change(val){
                 let _this=this;
                _this.selection_checked = val;
                if(val.length==0){
                    _this.is_Fn_cheked=true
                }else{
                    _this.is_Fn_cheked=false
                }
            },
            check_push_noCheck_Fn(){//点击从右想左添加数据
                
                 let _this=this;
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.showChecked=_this.pagination([],_this.selection_checked,_this.oneItemLeft,_this.pageLeft,'left')
                _this.showNoChecked=_this.pagination(_this.selection_checked,[],_this.oneItemRight,_this.pageRight,'right')
            },
            noCheck_push_check_Fn(){//点击从左想右添加数据noCheck_push_check_Fn
                let _this=this;
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.array4 =_this.selection_nochecked
                _this.showChecked = _this.pagination(_this.selection_nochecked,[],_this.oneItemLeft,_this.pageLeft,'left')
                _this.showNoChecked=_this.pagination([],_this.selection_nochecked,_this.oneItemRight,_this.pageRight,'right')
                
            },
            hangdel(row){
                let _this=this;
                issecrh
                let json=[row]
                _this.LeftWitchPage="pagination";
                _this.RightWitchPage="pagination";
                _this.checkedTable=_this.uniqueArray(_this.checkedTable,json);
                _this.showNoChecked=_this.pagination(json,[],_this.oneItemRight,_this.pageRight,'right')
                _this.showChecked=_this.pagination([],json,_this.oneItemLeft,_this.pageLeft,'left')
            },
            sureDoing(){//信息变动确定
                let _this = this;
                _this.$store.state.url=`/specification/specificationOfGoodsList/default`
                _this.$router.push({path:_this.$store.state.url});
            },
            searchRightTable(){
                let _this=this;
                // nocheckTable
                let newJson=[];
                let patt1 = new RegExp(_this.searchTableRight);
                $.each(_this.nocheckedTable,function(index,val){

                    let str=val.specValueName || val.specValueId_SpecValueName;
                    let result = patt1.test(str);
                    if(result){
                        newJson.push(val)

                    }
                })
                _this.RightWitchPage="searchRightTable"
                _this.searchRightDatas=newJson;
                _this.showNoChecked=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).nowData
                _this.totalItemRight=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).TotalItem
                _this.totalPageRight=_this.paginationUserSearch(newJson,_this.oneItemRight,_this.pageRight).TotalPage
           
            },
            rightFn_change(val){
                let _this=this;
                _this.selection_nochecked = val;
                if(val.length==0){
                    _this.is_Fn_nocheked=true
                }else{
                    _this.is_Fn_nocheked=false
                }
                // console.log(val)
                // console.log(_this.selection_nochecked )
            },
            CancelTree(){
                let _this=this;
                _this.dialogTableVisible=false;
                _this.checkedTable=_this.uniqueArray(_this.checkedTable,_this.array4);
                _this.showNoChecked=_this.pagination(_this.array4,[],_this.oneItemRight,_this.pageRight,'right')
                _this.showChecked=_this.pagination([],_this.array4,_this.oneItemLeft,_this.pageLeft,'left')
                _this.dialogTableVisible=false;
            },
            choose(){
                this.dialogTableVisible = true;
            },
            LeftbtnIsShow(){
                let _this=this;
                if(_this.pageLeft>1){
                    _this.leftDownBtn=false;
                }else{
                    _this.leftDownBtn=true;
                }
                
                if(_this.totalPageLeft>_this.pageLeft){
                    _this.leftAddBtn=false;
                }else{
                    _this.leftAddBtn=true;
                }
                
            },
            saveAndsaveadd(isadd,isclear){
                let _this = this;
                _this.$validate().then(function(success){
                    if(success){
                        _this.addData.specgroupContent_ChildTable = [];
                        for(let i=0;i<_this.showChecked.length;i++){
                            let addDatacontent = {
                                id: 0,
                                "groupId": 0,
                                "specgroupId": 0,
                                "specValueId": '',
                                "seq": 0
                            }
                            addDatacontent.specValueId = _this.showChecked[i].id;//存入属性值的id
                           _this.addData.specgroupContent_ChildTable.push(addDatacontent);
                        }
                        _this.$axios.posts('/api/services/app/SpecgroupManagement/AggregateCreateOrUpdate',_this.addData).then(function(res){
                            _this.open('创建商品规格组成功','el-icon-circle-check','successERP');
                            _this.validation.reset(); 
                            _this.bottonbox.botton[0].update = false;
                            _this.secondModify = false;
                            _this.firstModify = false;
                            // console.log(_this.$store.state.url);
                            if(isclear){//清空数据
                                _this.getAllRoleData();
                                // alert(1)
                                _this.addData.specgroup_MainTable.categoryId = '';
                                _this.addData.specgroup_MainTable.specgroupCode = '';
                                _this.addData.specgroup_MainTable.specgroupName = '';
                                _this.addData.specgroup_MainTable.remark = '';
                                _this.$store.state.url=`/specification/specificationOfGoods${isadd}/`+_this.$route.params.id
                                _this.$router.push({path:_this.$store.state.url});
                            }else{
                                console.log(res)
                               _this.$store.state.url=`/specification/specificationOfGoods${isadd}/`+res.result;
                                _this.$router.push({path:_this.$store.state.url}); 
                            }
                        },function(res){
                            if(res && res!=''){ _this.getErrorMessage(res.error.message,res.error.details,res.error.validationErrors)};
                            _this.errorMessage=true;
                        })
                    }
                })   
            },
            RightbtnIsShow(){
                let _this=this;
                if(_this.pageRight>1){
                    _this.rightDownBtn=false;
                }else{
                    _this.rightDownBtn=true;
                }
                if(_this.totalPageRight>_this.pageRight){
                    _this.rightAddBtn=false;
                }else{
                    _this.rightAddBtn=true;
                }
            },
            pageDownLeft(){
                let _this=this;
                if(_this.pageLeft>1){
                    _this.pageLeft--
                    if(_this.LeftWitchPage=="pagination"){
                        _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left')
                    }else if(_this.LeftWitchPage=="searchLeftTable"){
                        _this.showChecked=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).nowData
                        _this.totalItemLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalItem
                        _this.totalPageLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalPage
                    }
                    
                }
            },
            pageAddLeft(){
                let _this=this;
                if(_this.pageLeft<=_this.totalPageLeft){
                    _this.pageLeft++
                    if(_this.LeftWitchPage=="pagination"){//穿梭分页
                        _this.showChecked=_this.pagination([],[],_this.oneItemLeft,_this.pageLeft,'left');
                    }else if(_this.LeftWitchPage=="searchLeftTable"){//搜索分页
                        _this.showChecked=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).nowData
                        _this.totalItemLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalItem
                        _this.totalPageLeft=_this.paginationUserSearch(_this.searchLeftDatas,_this.oneItemLeft,_this.pageLeft).TotalPage
                    }
                }
            },
            pageDownRight(){
                let _this=this;
                if(_this.pageRight>1){
                    _this.pageRight--
                    if(_this.RightWitchPage=="pagination"){
                        _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right');
                    }else if(_this.RightWitchPage=="searchRightTable"){//搜索分页
                        _this.showNoChecked=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).nowData
                        _this.totalItemRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalItem
                        _this.totalPageRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalPage
                    }
                }
            },
            pageAddRight(){
                let _this=this;
                if(_this.pageRight<_this.totalPageRight){
                    _this.pageRight++
                    if(_this.RightWitchPage=="pagination"){
                        _this.showNoChecked=_this.pagination([],[],_this.oneItemRight,_this.pageRight,'right');
                    }else if(_this.RightWitchPage=="searchRightTable"){//搜索分页
                        _this.showNoChecked=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).nowData
                        _this.totalItemRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalItem
                        _this.totalPageRight=_this.paginationUserSearch(_this.searchRightDatas,_this.oneItemRight,_this.pageRight).TotalPage
                    }
                }
            },
            pagination(addData,delData,oneItem,thisPage,LeftOrRight){//数据分页
                //data需要被分页的数据,类型为[{}]
                //addData被添加的数据数据,类型为[{}]
                //delData被移走的数据,类型为[{}]
                //totalItem总共有多少条消息  
                //pageIndex分页的当前页码
                //totalPages当前分页总数
                //oneItem每页有多少条信息
                //thisPage当前页  
                let _this=this;
                let nowData=[];
                let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
                let endIndex=startIndex + oneItem;
                if(LeftOrRight=='right'){ 
                    if(addData.length>0){
                        _this.nocheckedTable=addData.concat(_this.nocheckedTable);
                    }
                    if(delData.length>0){
                        _this.nocheckedTable=_this.uniqueArray(_this.nocheckedTable,delData);
                    }
                    if(_this.nocheckedTable.length>0){
                        if(endIndex>_this.nocheckedTable.length){
                            endIndex=_this.nocheckedTable.length;
                        }
                        for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                            nowData.push(_this.nocheckedTable[startIndex])
                        }
                    }
                }else if(LeftOrRight=='left'){
                    if(addData.length>0){
                        _this.checkedTable=addData.concat(_this.checkedTable);
                    }
                    if(delData.length>0){
                        _this.checkedTable=_this.uniqueArray(_this.checkedTable,delData)
                    }
                    if(_this.checkedTable.length>0){

                        if(endIndex>_this.checkedTable.length){
                            endIndex=_this.checkedTable.length;
                        }
                        for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                            nowData.push(_this.checkedTable[startIndex])
                        }
                    }
                }
                //左侧
                _this.totalItemLeft=_this.checkedTable.length;//左侧总共多少条数据
                _this.totalPageLeft=Math.ceil(_this.totalItemLeft/_this.oneItemLeft);//有多少页
                _this.LeftbtnIsShow()
                //右侧
                _this.totalItemRight=_this.nocheckedTable.length;//右侧总共多少条数据
                _this.totalPageRight=Math.ceil(_this.totalItemRight/_this.oneItemRight);//有多少页
                _this.RightbtnIsShow()
                
                
                return nowData
            },
            paginationUserSearch(data,oneItem,thisPage){//数据分页
            //checkAllata分页数据
            //oneItem每页有多少条信息
            //thisPage当前页
                let _this=this;
                let x={}
                let nowData=[];
                // console.log(checkAllata)
                let startIndex=(thisPage-1)*oneItem;//起始数据所在位置
                let endIndex=startIndex + oneItem;
                    if(data.length>0){
                        if(endIndex>data.length){
                            endIndex=data.length
                        }
                        for(startIndex;startIndex<endIndex;startIndex++){//获取当前页展示的oneItem条数据
                            nowData.push(data[startIndex])
                        }
                    }
                // _this.ouTotalItem=data.length;//总共多少条数据
                // _this.ouTotalPage=Math.ceil(data.length/oneItem);//有多少页
                x={TotalItem:data.length,TotalPage:Math.ceil(data.length/oneItem),nowData:nowData};
                return x
            },
             uniqueArray(array1, array2){//求差集
                var result = [];
                for(var i = 0; i < array1.length; i++){
                    var item = array1[i];
                    var repeat = false;
                    for (var j = 0; j < array2.length; j++) {
                        if (array1[i].id == array2[j].id) {//唯一key
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        result.push(item);
                    }
                }
                return result;
            },
            GetDateTime: function () {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var Hours = date.getHours();
                var Seconds = date.getSeconds();
                var Minutes = date.getMinutes();
                function dataTime(a){
                   if (a >= 1 && a <= 9) {
                        a = "0" + a;
                        return a
                    } 
                    return a
                }
                function datahous(a){
                   if (a < 10) {
                        a = "0" + a;
                        return a;
                    } 
                    return a ;
                }
                var currentdate = date.getFullYear() + seperator1 + dataTime(month) + seperator1 + dataTime(strDate) + ' ' + datahous(Hours) + seperator2 + datahous(Minutes) + seperator2 +  datahous(Seconds);
                return currentdate;
            },
            getErrorMessage(message,details,validationErrors){
                let _this=this;
                _this.response.message='';
                _this.response.details='';
                _this.response.validationErrors=[];
                if(details!=null && details){
                    _this.response.details=details;
                }
                if(message!=null && message){
                    _this.response.message=message;
                }
                if(message!=null && message){
                    _this.response.validationErrors=validationErrors;
                }
            },
            open(tittle,iconClass,className) {//提示框
                this.$notify({
                position: 'bottom-right',
                iconClass:iconClass,
                title: tittle,
                showClose: false,
                duration: 3000,
                customClass:className
                });
            },
        },
        components:{
            Textbox
        }
 }   
</script>

<style scoped>
.bg-white{
    background: white;
    border-radius: 3px;
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
.pb10{
    padding-bottom: 10px;
}
.pr10{
    padding-right: 10px;
}
.border-left{
    border-left: 1px solid #E4E4E4;
}
.smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;
}
.bgcolor label{
    width: 100% !important ;
    margin-right: 0; 
}
.bgcolor{
    overflow:  visible; 
}
.smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.smallBgcolor .el-input{
    width: 100% !important ;
    margin-left: 10px;
}
</style>

<style>
/*.specificationOfGoodsDetails .dialog_confirm_message .el-dialog__footer .dialog_footer_bt{
    width: 100%;
}*/
.specificationOfGoodsDetails .error_tips_info{
    margin-left: 20px;
}
.specificationOfGoodsDetails .specId0 .el-input__inner{
    color: rgb(255, 102, 102);
}
.specificationOfGoodsDetails .specId1 .el-input__inner{
    color: rgb(57, 202, 119);
}
.specificationOfGoodsDetails .transfer_table .el-input__inner{
    border: none;
    text-align: center;
}
.specificationOfGoodsDetails .transfer_table{
    height: auto;
}
.specificationOfGoodsDetails .transfer_table .el-input.is-disabled .el-input__inner{
    background-color: transparent;
}
.specificationOfGoodsDetails .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: transparent;
}
.specificationOfGoodsDetails .smallBgcolor .el-input input{
    height: 33px!important;
}
.el-button--success{
    background-color: rgb(51,204,204); 
    padding: 7px 10px;
    border-color: rgb(51,204,204);
}
.el-checkbox__inner{
    width: 18px;
    height: 18px;
    background: #f4f4f5;
}
.el-checkbox__inner::after{
    left: 4px;
    top: -2px;
}
.el-input__inner{
    
    height: 30px;
}
.el-input-group__append{
    background-color: rgb(51,204,204);
    color: #fff;
    cursor: pointer;
    border-color: rgb(51,204,204);
}
.bm-pd10{
    border-bottom: 1px solid #e4e4e4;
    margin: 10px 0;
}
.shop-sq{
    float: right;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #000;
    cursor: pointer;
}
.shop-title{
        float: left;
    height: 40px;
    line-height: 40px;
    margin: 0;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 3px solid rgb(51,204,204);
    color: #000;
    padding: 0 20px;
}
</style>