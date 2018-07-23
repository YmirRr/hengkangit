<template>
    <div class="classPropertyList" style="float:left;background:#fff;width:100%">
        <div id="left-box" style="min-width:275px;width:275px;float:left;">
            <el-row class="bg-white">
                    <el-row class="h48 pl15">
                        <el-col :span="18">
                            <i class="el-icon-search"></i>
                            <span>查询</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="fs12 open" >+ 收起</span>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                    <label>商品类目</label>
                           </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="smallBgcolor" style="margin-top:20px">
                            <el-input placeholder="请录入单号"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" >
                                    <label>继承到子类目</label>
                           </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" >
                                    <label>统一码管理</label>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" >
                                    <label>批次管理</label>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" >
                                    <label>保质期管理</label>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="bgcolor smallBgcolor" >
                                    <label>状态</label>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="bgcolor smallBgcolor">
                                <el-select  v-model="value" >
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>

                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">&nbsp;</el-col>
                        <el-col style="text-align:center;margin-bottom:20px;" :span="14">
                            <span class="search-btn" style="float:left;margin-left:10px;">查询</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>    
        </div>
        <div id="bgx">
            <el-row >
                <el-col :span="24" class="border-left" id="bg-white">
                       <btm :date="bottonbox" v-on:listbtm="btmlog" class="fixed bg-white"> </btm> 
                     <el-row class="shopclass">
                        <div style="min-width:200px;width:200px;float:left;">
                            <el-col :span='24' class="tree-container pl10 pt10">
                                <el-tree :data="componyTree" node-key="id" ></el-tree>
                            </el-col>
                        </div>
                        <el-row class="watch" style="background-color:rgba(238,241,245,1)">
                            <el-col :span='24' >
                                <el-row class="ml10">
                                    <el-col :span="3" :xl="3" :lg="4" :md="5" :sm="5" :xs="5" class="lh40">
                                        商品类目
                                    </el-col>
                                    <el-col :span="21" :xl="21" :lg="20" :md="19" :sm="19" :xs="19" class="lh40">
                                        宝宝食品
                                    </el-col>
                                    <el-col  :xl="9" :lg="9" :md="13" :sm="12" :xs="12" class="lh40">
                                        <el-checkbox v-model="checked" class="ab">规格属性继承到子类目</el-checkbox>
                                    </el-col>
                                    <el-col  :xl="5" :lg="5" :md="11" :sm="12" :xs="12" class="lh40">
                                        <el-checkbox v-model="checked">唯一码管理</el-checkbox>
                                    </el-col>
                                    <el-col  :xl="5" :lg="5" :md="13" :sm="12" :xs="12" class="lh40">
                                        <el-checkbox v-model="checked">批次管理</el-checkbox>
                                    </el-col>
                                    <el-col  :xl="5" :lg="5" :md="11" :sm="12" :xs="12" class="lh40">
                                        <el-checkbox v-model="checked">保质期管理</el-checkbox>   
                                    </el-col>
                                </el-row>
                                <div>  
                                    <el-row class="pb10" style="background-color:#fff">
                                        <el-row class="bm-pd10">
                                            <el-col :span="12">
                                                <span class="shop-title">
                                                    商品属性
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
                                                        
                                                        <el-button type="success"><i class="el-icon-plus" style="margin-right:5px;"></i>选取</el-button>
                                                    </div> 
                                                </el-col>
                                                <el-col :xl="6" :lg="8" :md="10" :sm="11" :xs="11" style="float:right">
                                                    <div class="right">
                                                        <el-input placeholder="" v-model="input4">
                                                        <template slot="append">查询</template>
                                                      </el-input> 
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%" class="text-center">
                                            <el-table-column prop="sequenceNumber" label="序号" width="60">
                                            </el-table-column>
                                            <el-table-column prop="AttributeEncoding" label="属性编码">
                                            </el-table-column>
                                            <el-table-column prop="attributeName" label="属性名称">
                                            </el-table-column>
                                            <el-table-column   prop="startUsing" label="启用">
                                                <template slot-scope="scope">
                                                    <el-checkbox  ></el-checkbox>
                                                </template>
                                            </el-table-column>
                                          </el-table> 
                                            </div>
                                        </el-collapse-transition>
                                    </el-row>
                                    <el-row class="pb10 mt10" style="background-color:#fff">
                                        <el-row class="bm-pd10 mt10">
                                            <el-col :span="12">
                                                <span class="shop-title">
                                                    商品规格
                                                </span>
                                            </el-col>
                                            <el-col :span="12" >
                                                <span class="shop-sq" @click="ifShow1 = !ifShow1">收起<i class="el-icon-arrow-down" @click="ifShow1 = !ifShow1" :class="{rotate : !ifShow1}" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                                            </el-col>
                                        </el-row>
                                        <el-collapse-transition> 
                                            <div v-show="ifShow1"> 
                                                <el-row class="pl10 pr10 pb10">
                                                    <el-col :span="12">
                                                        <div class="left">
                                                            
                                                            <el-button type="success"><i class="el-icon-plus" style="margin-right:5px;"></i>选取</el-button>

                                                        </div> 
                                                    </el-col>
                                                    <el-col :xl="6" :lg="8" :md="10" :sm="11" :xs="11" style="float:right">
                                                        <div class="right">
                                                            <el-input placeholder="" v-model="input4">
                                                            <template slot="append">查询</template>
                                                          </el-input> 
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-table :data="tableData" border style="width: 100%" class="text-center">
                                                <el-table-column prop="sequenceNumber1" label="序号" width="60">
                                                </el-table-column>
                                                <el-table-column prop="AttributeEncoding1" label="规格编码" >
                                                </el-table-column>
                                                <el-table-column prop="attributeName1" label="规格名称">
                                                </el-table-column>
                                                <el-table-column prop="startUsing1" label="启用">
                                                  <template slot-scope="scope">
                                                        <el-checkbox  ></el-checkbox>
                                                    </template>
                                                </el-table-column>
                                              </el-table> 
                                            </div>  
                                        </el-collapse-transition>
                                    </el-row>
                                    <el-row class="pb10 mt10" style="background-color:#fff">
                                        <el-row class="bm-pd10 mt10">
                                            <el-col :span="24">
                                                <span class="shop-title" style="border:none">
                                                    审计信息
                                                </span>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:30px;">
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="8">
                                                        <div class="bgcolor smallBgcolor">
                                                                <label>创建人</label>
                                                       </div>
                                                    </el-col>
                                                    <el-col :span="14">
                                                        <div class="smallBgcolor">
                                                        <el-input placeholder=""></el-input>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="8">
                                                        <div class="bgcolor smallBgcolor">
                                                                <label>创建时间</label>
                                                       </div>
                                                    </el-col>
                                                    <el-col :span="14">
                                                        <div class="smallBgcolor">
                                                        <el-input placeholder=""></el-input>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="8">
                                                        <div class="bgcolor smallBgcolor">
                                                                <label>修改人</label>
                                                       </div>
                                                    </el-col>
                                                    <el-col :span="14">
                                                        <div class="smallBgcolor">
                                                        <el-input placeholder=""></el-input>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="8">
                                                        <div class="bgcolor smallBgcolor">
                                                                <label>修改时间</label>
                                                       </div>
                                                    </el-col>
                                                    <el-col :span="14">
                                                        <div class="smallBgcolor">
                                                        <el-input placeholder=""></el-input>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-row>    
                                </div> 
                            </el-col> 
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
        </div>   
    </div>
</template>

<script>
import Query from '../../base/query/query'
import Btm from '../../base/btm/btm'
import Tree from '../../base/tree/tree'
    export default{
        name:'customerInfor',
        data(){
            return {
                ifShow:true,
                ifShow1:true,
                input4:'',
                checked: true,
                try:{
                "groupId": 2,
                "stockId": 1,
                "addressId": 8,
                "completeAddress": "str33ing",
                "transportMethodId": 1,
                "contactPerson": "stri55ng",
                "phone": "18200326666",
                "logisticsCompany": "str55ing",
                "isDefault": true,
                "remark": "st54ring"
                },
                bottonbox:{
                    url: '/commodityleimu/CommodityCategoriesDetails',
                   botton:[{
                    class: 'erp_bt bt_out',
                    imgsrc: '../../../static/image/common/bt_inOut.png',
                    text: '导出'
                },{
                    class: 'erp_bt bt_version',
                    imgsrc: '../../../static/image/common/bt_start.png',
                    text: '启用'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_stop.png',
                    text: '停用'
                },{
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/u470.png',
                    text: '取消'
                }]},
                options: [{
                    value: '选项1',
                    label: '仓库'
                    }, {
                    value: '选项2',
                    label: '地址'
                    }, {
                    value: '选项3',
                    label: '总部'
                    }, {
                    value: '选项4',
                    label: '总部2'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],

                value: '',
                tableData: [{
                      sequenceNumber: '1',
                      AttributeEncoding: '01',
                      attributeName: '类别',
                      startUsing: '',
                      sequenceNumber1: '1',
                      AttributeEncoding1: 'color',
                      attributeName1: '颜色',

                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '02',
                      attributeName: '系列',
                      startUsing: '',
                      sequenceNumber1: '2',
                      AttributeEncoding1: 'size',
                      attributeName1: '尺码',

                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '03',
                      attributeName: '项目',
                      startUsing: '',
                      sequenceNumber1: '3',
                      AttributeEncoding1: 'spec',
                      attributeName1: '型号',

                    }],
                    componyTree: [{
                        label: '商品类目',
                        children: [{
                            label: '鞋服',  
                        },
                        {
                            label: '母婴',  
                        },
                        {
                        label: '宝宝食品',
                            children: [{
                               label: '儿童玩具',  
                            },
                            {
                               label: '美容',  
                            },
                            {
                               label: '服务',  
                            }] 
                        }],
                        }],
            }
        },
        created:function(){       
            
        },
        mounted:function(){   
            let content1=document.getElementById('bg-white');//设置高度为全屏
            let height1=window.innerHeight-123;
            content1.style.minHeight=height1+'px';
        },
        methods:{
            handleSelectionChange(val) {//点击复选框选中的数据
               

            },
            btmlog:function(data){
                let oleftBox=document.getElementById('left-box');
                oleftBox.style.display="block";
                let ocate= document.getElementById('bgx')
                ocate.style.width="calc(100% - 275px)";
            },
            querylog:function(data){
                let _this=this;
                if(data){
                    let ocate= document.getElementById('bgx')
                    ocate.style.width="100%";
                    _this.bottonbox.botton.push({
                        class: 'erp_bt bt_auxiliary',
                        imgsrc: '../../../static/image/common/bt_stop.png',
                        text: '查询'
                    })
                }
            },
        },
        components:{
            Query,
            Btm,
            Tree
        }
        
    }
</script>

<style scoped>
.el-tree{
    background-color: transparent;
}   
.shopclass{
    background: rgba(251, 252, 253, 1);
}
.bg-white{
    background: white;
    border-radius: 3px;
}

.lh40{
    line-height: 40px;
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
.shop-sq{
    float: right;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #000;
    cursor: pointer;
}
.bm-pd10{
    border-bottom: 1px solid #e4e4e4;
    margin: 10px 0;
}
.pl10{
    padding-left: 10px;
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
.classPropertyList .fs14{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.349019607843137);
}
.classPropertyList .fs12{
    font-size: 12px;
}
.classPropertyList .open{
    display: inline-block;
    width: 49px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #cccccc;
    color: #cccccc;
    text-align: center;
    cursor: pointer;
}
.classPropertyList .pl15{
    padding-left: 15px;
}
.classPropertyList .search-btn{
    font-size: 12px;
    display: inline-block;
    width: 87px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    background: #4A6997;
    color: white;
    cursor: pointer;
}
.classPropertyList .smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;   
}
.classPropertyList .bgcolor label{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100% !important ;
    margin-right: 0; 
}
.classPropertyList .smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.classPropertyList .smallBgcolor .el-input{
    width: 100% !important ;
    margin-right: 10px;
    margin-left: 10px;
}
.classPropertyList .bgcolor{
    overflow:  visible; 
}
.classPropertyList .bg-white{
    background: white;
    border-radius: 3px;
} 
.classPropertyList .h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
}
</style>

<style>
.classPropertyList .smallBgcolor .el-input input{
    height: 32px !important;
}
.classPropertyList .bgcolor{
    width: 100%;
}
.watch{
    width: calc(100% - 200px);
    float: left;
}
#bgx{
    width: calc(100% - 275px);
    float: left;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #606266;
}
.el-input-group__append{
    background-color: rgb(51,204,204);
    color: #fff;
    cursor: pointer;
    border-color: rgb(51,204,204);
}
.el-input__inner{  
    height: 30px;
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
</style>