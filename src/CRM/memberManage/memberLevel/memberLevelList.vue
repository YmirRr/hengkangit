<template>
  <div class="memberLevelList member-list">
      <el-row class="bg-white pb5">
            <el-col :span="15">
                <buttonGroup :buttonGroup="buttonGroup" @btnClick='btnClick' class="inline-block-need"></buttonGroup>
            </el-col>
        
            <el-col :span="9" class="pt5">
                <div class="search-input-member">
                    <div class="search-wapper">
                        <input type="text" placeholder="等级名称\编号"  @keyup="doSearch" v-model="queryParams.Info"/> <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        <button class="mem-search-btn" @click="doSearch">搜索</button>
                    </div>
                    <div style="float:right">
                        <div class="search_advance">
                            <button class="userDefined advanced-query">
                                <i class="fa fa-cogs" aria-hidden="true"></i>自定义
                            </button>
                        </div>
                    </div>
                </div>
            </el-col>  
     
      </el-row>
      <el-row>
          <el-col :span="24">
                <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :queryParams="queryParams" :cols="column" :tableName="tableModel" :command="command"></Table>
          </el-col>
      </el-row>
      <!-- dialog -->  
      <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>        


  </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import Table from '../../../base/Table/Table'
import dialogBox from '../../../base/dialog/dialog'
import config from '../../../../static/config'
export default {
  name:'memberLevelList',
  data(){
      return{
        //----------按钮组--------------------
        buttonGroup:[{
            text:'新增',
            class:'bt_add',
            icon:'icon-xinzeng',
            disabled:false,
        },{
            text:'删除',
            class:'bt_del',
            icon:'icon-shanchu',
            disabled:false,
        },{
            text:'导入',
            class:'bt_in',
            icon:'icon-daoru',
            disabled:false,
        },{
            text:'导出',
            class:'bt_out',
            icon:'icon-daochu',
            disabled:false,
        },{
            text:'启用',
            class:'bt_version',
            icon:'icon-qiyong',
            disabled:false,
        },{
            text:'停用',
            class:'bt_auxiliary',
            icon:'icon-tingyong',
            disabled:false,
        }],
        Name:'',//右上角模糊查询
        dialogUserDefined:false,//dialog
        column: [{
            prop: 'gradeCode',
            label: '等级编码',
            controls:'button',
            flag:true,//更改标识
            isDisable:true,
            }, {
            prop: 'gradeName',
            label: '等级名称',
            controls:'button',
            isDisable:true,
            }, {
            prop: 'effectiveEnd',
            label: '有效期',
            controls:'text',
            isDisable:true,
            },{
            prop: 'discount',
            label: '消费折扣',
            controls:'text',
            isDisable:true,
            }, {
            prop: 'isDefault',
            label: '注册默认等级',
            controls:'checkbox',
            isDisable:true,
            }, {
            prop: 'updownEnable',
            label: '允许升降级',
            controls:'checkbox',
            isDisable:true,
            }, {
            prop: 'status',
            label: '状态',
            controls:'classMapSelect',
            isDisable:true,
            dataSource:[],
            optionsKey:{label:'itemName',value:'itemValue'}
            }, {
            prop: 'remark',
            label: '备注',
            controls:'text',
            isDisable:true,
            }],
        tableModel:'memberLevelList',
        httpUrl:{
            view:'/memberLevel/memberLevelModify/',
            delete:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/Delete',//行内删除
            query:config.base.ip+':'+config.base.crmPort+'/api/services/app/MemberGradeManagement/GetListByCondition',//条件查询
        },
        queryParams:{
            Info:'',
            SkipCount:(this.$store.state.memberLevelListCurrentPage-1)*this.$store.state.memberLevelListEachPage,
            MaxResultCount:this.$store.state.memberLevelListEachPage
        }, 
        pluginSetting:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
        },
        command:[{
            text:'查看',
            class:'blue'
        },{
            text:'删除',
            class:'blue'
        }],
        //---dialog-------------
        dialogSetting:{
            message:'',//提示信息
            dialogName:'',//对话框名称
            dialogType:'',//对话框类型
        },
        errorTips:{//对话框 错误提示
            message:'',
            details:'',
        },
        dialogVisible:false,
        dialogCommand:[],//底部按钮组控制组
        idArray:{
            "ids": []
        }


    }
       
  },
  created(){
      this.loadStatus();
  },
  methods:{
      loadStatus(){
          let _this=this;
        _this.$axios.gets('/api/services/app/DataDictionary/GetDictItem',{dictName:'Status001'}).then(function(res){
            //console.log(res);
            _this.column[6].dataSource = res.result;
        },function(res){
            console.log('err'+res)
        });

      },
    //按钮组点击事件---------------------------
    btnClick(btn){
        if(btn=="新增"){//新增事件
            this.$store.state.url='/memberLevel/memberLevelDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        }else if(btn=="删除"){//删除事件
            this.delBatch();
        }else if(btn=="启用"){
            this.handleStatus(1);
        }else if(btn=="停用"){
            this.handleStatus(0);
        }
    },
    //根据编码或名称搜索
    doSearch:function(){
        let _this = this;
        _this.$axios.gets('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/GetListByCondition',_this.queryParams).then(function(res){
            _this.$store.commit('Init_Table',res.result.items);
            let totalPage=Math.ceil(res.result.totalCount/_this.$store.state.repositoryListEachPage);
            _this.$store.commit('Init_pagination',totalPage);
            _this.$store.commit('Init_TotalCount',res.result.totalCount);
            _this.$store.commit('setCurrentPage',1)//设置当前页码为初始值1  
        })
        
    },

    handleStatus(statu){
        let HANDLE_ARRAY=[];// 定义操作数据集合
        this.SelectionChange= this.$store.state[this.tableModel+'Selection']; 
        let TABLE_DATA=this.$store.state[this.tableModel+'Table'];
        if(this.SelectionChange.length>0){// 将勾选项push到修改的数据集合中
            for(let o in this.SelectionChange){
                this.$store.commit('Add_UpdateArray',this.SelectionChange[o]);
                HANDLE_ARRAY.push(this.SelectionChange[o]);
                var modifyData={
                                "memberGrade_MainTable": {
                                    "id": 0,
                                    "groupId": 0,
                                    "gradeCode": "string",
                                    "gradeName": "string",
                                    "memberLevelid": 0,
                                    "memberGradeValid": 0,
                                    "effectiveValue": 0,
                                    "ico": "string",
                                    "expdAmount": 0,
                                    "expdPresentIntegral": 0,
                                    "depositAmount": 0,
                                    "depositPresentIntegral": 0,
                                    "discount": 0,
                                    "updownEnable": true,
                                    "isDefault": true,
                                    "applyAllOu": true,
                                    "applyAllArea": true,
                                    "applyAllChannel": true,
                                    "status": 0,
                                    "remark": "string"
                                },
                                "ouapply_ChildTable":[]
                            }
                modifyData.memberGrade_MainTable.id=this.SelectionChange[o].id;
                modifyData.memberGrade_MainTable.groupId=this.SelectionChange[o].groupId;
                modifyData.memberGrade_MainTable.gradeCode=this.SelectionChange[o].gradeCode;
                modifyData.memberGrade_MainTable.gradeName=this.SelectionChange[o].gradeName;
                modifyData.memberGrade_MainTable.memberLevelid=this.SelectionChange[o].memberLevelid;
                modifyData.memberGrade_MainTable.memberGradeValid=this.SelectionChange[o].memberGradeValid;
                modifyData.memberGrade_MainTable.effectiveValue=this.SelectionChange[o].effectiveValue;
                modifyData.memberGrade_MainTable.ico=this.SelectionChange[o].ico;
                modifyData.memberGrade_MainTable.expdAmount=this.SelectionChange[o].expdAmount;
                modifyData.memberGrade_MainTable.expdPresentIntegral=this.SelectionChange[o].expdPresentIntegral;
                modifyData.memberGrade_MainTable.depositAmount=this.SelectionChange[o].depositAmount;
                modifyData.memberGrade_MainTable.depositPresentIntegral=this.SelectionChange[o].depositPresentIntegral;
                modifyData.memberGrade_MainTable.discount=this.SelectionChange[o].discount;
                modifyData.memberGrade_MainTable.updownEnable=this.SelectionChange[o].updownEnable;
                modifyData.memberGrade_MainTable.isDefault=this.SelectionChange[o].isDefault;
                modifyData.memberGrade_MainTable.applyAllOu=this.SelectionChange[o].applyAllOu;
                modifyData.memberGrade_MainTable.applyAllArea=this.SelectionChange[o].applyAllArea;
                modifyData.memberGrade_MainTable.applyAllOu=this.SelectionChange[o].applyAllOu;
                modifyData.memberGrade_MainTable.applyAllChannel=this.SelectionChange[o].applyAllChannel;
                modifyData.memberGrade_MainTable.status=statu;
                modifyData.memberGrade_MainTable.remark=this.SelectionChange[o].remark;
                if(this.SelectionChange[o].ouapply_ChildTable==null){
                    modifyData.ouapply_ChildTable=[];
                }else{
                    modifyData.ouapply_ChildTable=this.SelectionChange[o].ouapply_ChildTable;
                }
                this.$axios.posts('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/AggregateCreateOrUpdate',modifyData).then(function(res){})
            }
            for(let i in HANDLE_ARRAY){// 遍历勾选项比对修改勾选项的状态
                for(let j in TABLE_DATA){
                    if (HANDLE_ARRAY[i].id==TABLE_DATA[j].id){
                        TABLE_DATA[j].status=statu;
                    }
                }
            }
            console.log(this.SelectionChange)



        }else if(this.SelectionChange.length==0){
            this.$message({
                type: 'info',
                message: '请勾选需要更改状态的记录！'
            });
        }
        
    },
    //批量删除------------------------------------
    delBatch(){
        this.SelectionChange= this.$store.state[this.tableModel+'Selection'];
        if(this.SelectionChange.length==0){
            this.$message({
                type: 'info',
                message: '请勾选需要更改删除的记录！'
            });
        }else{
            this.dialogSetting.dialogName='delDialog'
            this.dialogSetting.message="确定删除？";
            this.dialogSetting.dialogType="confirm";
            this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}];
            this.dialogVisible=true;
        }                
    },
    //弹框----------------------------------------------------
    dialogClick(parmas){
        if(parmas.dialogButton=="确定"){
            if(parmas.dialogName=="delDialog"){//删除对话框
                let _this=this;
                _this.SelectionChange= _this.$store.state[_this.tableModel+'Selection'];
                for(var i in _this.SelectionChange){
                    _this.idArray.ids.push(_this.SelectionChange[i].id)
                }
                console.log(_this.idArray)
                if(_this.idArray.ids.length>0){
                    _this.$axios.posts('http://192.168.100.107:8092/api/services/app/MemberGradeManagement/BatchDelete',_this.idArray).then(function(res){
                        _this.$store.dispatch('InitTable');
                        _this.$store.commit('setTableSelection',[])
                        _this.idArray.ids=[];
                        _this.dialogVisible=false;
                        _this.open('删除成功','el-icon-circle-check','successERP');    
                    },function(res){
                        console.log(res)
                    })
                }
            }
        }else if(parmas.dialogButton=="取消"){
            if(parmas.dialogName=="delDialog"){//多选删除取消操作
                this.$store.commit('setTableSelection',[])//置空多选
            }
            this.dialogVisible=false;
        }

    },
    dialogColse(){//对话框关闭回调事件
        this.dialogVisible=false;
    },  




  },
  components:{
      buttonGroup,
      Table,
      dialogBox
  }
}
</script>
<style scoped>
.bg-white{
    background: white;
    border-radius: 3px;
}
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
.mt20{
    margin-top: 20px;
}
.pl15{
    padding-left: 15px;
}
.pt5{
    padding-top: 5px;
}
.fs12{
    font-size: 12px;
}
</style>


