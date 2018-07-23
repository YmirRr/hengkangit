<template>
    <div class="member-group-list commodity">
        <el-row>
            <el-col :span="24" v-loading="loading">
                    <el-card class="box-card"  v-for="item in userGroup">
                        <div slot="header" class="clearfix">
                            <span>{{item.mbgroupName}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goDetail(item.id)">{{item.createdTime}}</el-button>
                        </div>
                        <div class="text item">
                            <div id="main"><i class="icon-yuanhuan iconfont"><p><span>{{item.perInt}}</span><span class="mini">{{item.percentfloat}}</span>%</p></i></div>
                            <span class="fr"> 
                                <i class="el-icon-edit el-icon" @click="goDetail(item.id)"></i>
                                <i class="el-icon-delete el-icon" @click="deleteGroup(item.id)"></i>
                            </span>
                            <div class="member-info-content">
                                <p>用户数{{item.memberCount}};占比{{item.percentum}}</p>
                                <p>用户描述：{{item.remark}}</p>
                            </div>
                            <p @click="more(item.id)"class="more">更多>></p>

                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <div class="add-usergroup text item" @click="goAdd()">
                            <p><i class="el-icon-plus el-icon"></i>新增用户群</p>
                        
                        </div>
                    </el-card>         
            </el-col>
        </el-row>
        <div class="fr">
           <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange":current-page="currentPage":page-sizes="[5, 10, 15]":page-size="eachPage" layout="total, sizes, prev, pager, next, jumper":total="totalCount"></el-pagination>
        </div>
        <dialogBox :dialogSetting='dialogSetting'  :errorTips='errorTips' :dialogVisible="dialogVisible"  :dialogCommand='dialogCommand'  @dialogClick="dialogClick" @dialogColse='dialogColse'></dialogBox>
    </div>
</template>
<script>
import buttonGroup from '../../../base/buttonGroup/buttonGroup'
import dialogBox from '../../../base/dialog/dialog'
export default {
    name:'memberGroupList',
    components:{
        buttonGroup,
        dialogBox
    },
    watch:{
      
    },
  created () {
        this.loadUserGroup();
       
    },
    data(){
        return{
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
            userGroup:[],
            feiLei1:"",
            totalCount:0,
            createdTime:'',
            createdArr:[],
            currentPage:1,
            eachPage:5,//每页显示的条数s
            loading:true,
        }
    },
    methods:{
        //加载用户组
        loadUserGroup(){
            let _this=this;
            _this.$axios.gets('http://192.168.100.107:8092/api/services/app/CrmMemberGroupManagement/GetAll',{SkipCount:(_this.currentPage-1)*_this.eachPage,MaxResultCount:_this.eachPage}).then(function(res){
                _this.userGroup=res.result.items;
                 _this.loading=false;
                _this.totalCount=res.result.totalCount;
                for(let i=0;i<_this.userGroup.length;i++){
                  _this.userGroup[i].createdTime=(_this.userGroup[i].createdTime.substring(0,19).replace('T',' ')) 
                  _this.userGroup[i].percentum= _this.userGroup[i].percentum.toFixed(2);
                  _this.userGroup[i].perInt=parseInt(_this.userGroup[i].percentum);
                  _this.userGroup[i].percentfloat=_this.userGroup[i].percentum.substring(_this.userGroup[i].percentum.indexOf("."));
                  console.log( _this.userGroup[i].percentfloat,_this.userGroup[i].perInt)
                }
                
            
            },function(res){
                console.log('err'+res)
            });


        },
        handleCurrentChange(val) {
           this.currentPage = val;
           this.loading=true;
           this.loadUserGroup();
         },
        handleSizeChange(val) {
            this.eachPage= val;
            this.loading=true;
            this.loadUserGroup();

        },
        //新增
        goAdd(){
            this.$store.state.url='/memberGroup/memberGroupDetail/default'
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        // 修改
        goDetail(id){
            this.$store.state.url='/memberGroup/memberGroupModify/'+id
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        //更多
        more(id){
            this.$store.state.url='/memberGroup/memberGroupData/'+id
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        open(tittle, iconClass, className) {
            this.$notify({
            position: "bottom-right",
            iconClass: iconClass,
            title: tittle,
            showClose: false,
            duration: 3000,
            customClass: className
            });
        },
        isDelPage(){
            let _this=this;
            _this.dialogSetting.dialogName='isDelPage'
            _this.dialogSetting.message='确定删除？'
            _this.dialogSetting.dialogType='confirm'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'},{text:'取消',class:'btn-cancel'}]
            _this.dialogVisible=true;
        },
        showErMsgDialog(message,detail){
             let _this=this;
            _this.dialogSetting.dialogName='showErMsgDialog'
            _this.dialogSetting.message='错误提示'
            _this.dialogSetting.dialogType='submit'
            _this.dialogCommand=[{text:'确定',class:'btn-confirm'}]
            _this.errorTips.message=message
            _this.errorTips.details=detail
            _this.dialogVisible=true;
        },
        //删除
        deleteGroup(id){
            let _this=this;
            _this.$axios.deletes('http://192.168.100.107:8092/api/services/app/CrmMemberGroupManagement/Delete',{Id:id}).then(function(res){
                 _this.open('删除成功','el-icon-circle-check','successERP');
                _this.dialogVisible=false;
                _this.loadUserGroup();
            },function(res){
                _this.showErMsgDialog(res.error.message,res.error.details)
            })
        },
        //点击对话框
        dialogClick(parmas){
             if(parmas.dialogButton=="确定"){
                if(parmas.dialogName=="isDelPage"){
                    this.deleteGroup();
                    this.dialogVisible=false;
                    
                }else if(parmas.dialogName=="showErMsgDialog"){
                    this.dialogVisible=false;
                    
                }
            }else if(parmas.dialogButton=="取消"){
                this.dialogVisible=false;
            }

        },
        //关闭
        dialogColse(){//对话框关闭回调事件
            this.dialogVisible=false;
        },
 }
}
</script>

<style scoped>

</style>
<style>
.member-group-list .fr{
    float: right;
    margin-right:20px;
    margin-top:10px;
}
.member-group-list  .clearfix{
    display: block;
}
.member-group-list .text {
    font-size: 14px;
  }

.member-group-list  .item {
    margin-bottom: 18px;
  }

.member-group-list  .clearfix:before,
.member-group-list  .clearfix:after {
    display: table;
    content: "";
  }
.member-group-list  .clearfix:after {
    clear: both
  }

.member-group-list  .box-card {
    width: 480px;
    display:inline-block;
    margin:10px;
    height:200px;
  }
.member-group-list  .box-card .add-usergroup p{
    line-height:170px;
    text-align:center;
    cursor: pointer;
}
.member-group-list  .box-card .el-icon{
    font-size:22px;
    cursor: pointer;
}
.member-group-list .el-card__body{
    padding:0px;
}
.member-group-list  #main{
    display: inline-block;
}
.member-group-list .icon-yuanhuan{
    color:#F55E6E;
    font-size:100px!important;
    vertical-align:middle;
    position: relative;
}
.member-group-list .icon-yuanhuan p{
    font-size: 14px;
    position: absolute;
    top: 37px;
    left:26px;
    text-align: center;
    display:inline-block;
}
.member-group-list .icon-yuanhuan .mini{
    font-size:12px;
}
.member-group-list .member-info-content{
    display: inline-block;
}
.member-group-list .more{
    margin-right: 20px;
    color: #33CCCC;
    cursor: pointer;
    text-align: right;
}
</style>



