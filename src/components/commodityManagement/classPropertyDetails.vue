<template>
    <div class="classPropertyDetails">
        <el-row >
            <el-col :span='24' >
                <div style="margin-bottom:15px" class="bg-white">
                    <btm :date="bottonbox" class="fixed bg-white" > </btm>
                    <el-row> 
                        <el-col :span="6">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                            <label><small>*</small>上级类目</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="smallBgcolor" style="margin-top:20px">
                                    <el-input placeholder=""></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6" style="margin-top:20px">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor" >
                                            <label><small>*</small>类目编码</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="smallBgcolor">
                                    <el-input placeholder=""></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6" style="margin-top:20px">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor" >
                                            <label><small>*</small>属性名称</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="smallBgcolor">
                                    <el-input placeholder=""></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                            <label>助记码</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="bgcolor smallBgcolor" style="margin-top:20px">
                                        <el-select  v-model="value" >
                                        <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>

                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor">
                                            <label>修改人</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="smallBgcolor">
                                    <el-input placeholder=""></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <el-row>
                                <el-col :span="7">
                                    <div class="bgcolor smallBgcolor">
                                            <label>备注</label>
                                   </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="smallBgcolor">
                                    <el-input placeholder=""></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                 <el-row class="">
                    <el-col :span='24' class=" " style="">  
                    <div style="background:rgb(249,249,249)" class="pb10">
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
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column prop="sequenceNumber" label="序号" width="60">
                                    </el-table-column>
                                    <el-table-column prop="AttributeEncoding" label="属性编码">
                                    </el-table-column>
                                    <el-table-column prop="attributeName" label="属性名称">
                                    </el-table-column>
                                    <el-table-column prop="startUsing" label="启用">
                                        <template scope="scope">
                                            <el-checkbox  ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                </el-table> 
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div style="background:rgb(249,249,249)" class="pb10">    
                        <el-row class="bm-pd10 mt10">
                            <el-col :span="12">
                                <span class="shop-title">
                                    商品属性
                                </span>
                            </el-col>
                            <el-col :span="12" >
                                <span class="shop-sq" @click="ifShow1 = !ifShow1">收起<i class="el-icon-arrow-down" @click="ifShow1 = !ifShow1" :class="{rotate : !ifShow1}" style="width:15px;height:15px;margin-left:10px;color:#888;"></i></span>
                            </el-col>
                        </el-row>
                        <el-collapse-transition>
                            <div  v-show="ifShow1">
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
                            <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="sequenceNumber" label="序号" width="60">
                            </el-table-column>
                            <el-table-column prop="AttributeEncoding" label="属性编码" >
                            </el-table-column>
                            <el-table-column prop="attributeName" label="属性名称">
                            </el-table-column>
                            <el-table-column prop="startUsing" label="启用">
                                <template scope="scope">
                                    <el-checkbox  ></el-checkbox>
                                </template>
                            </el-table-column>
                          </el-table> 
                          </div>
                        </el-collapse-transition>
                    </div>
                    <div style="background:rgb(249,249,249)" class="pb10">
                        <el-row class="bm-pd10 mt10" style="margin-bottom:30px">
                            <el-col :span="24">
                                <span class="shop-title" style="border:none;">
                                    审计信息
                                </span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
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
                            <el-col :span="6">
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
                            <el-col :span="6">
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
                            <el-col :span="6">
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
                    </div> 
                    </el-col> 
                </el-row>

            </el-col>
        </el-row>   
    </div>
</template>

<script>
import Btm from '../../base/btm/btm'
import Textbox from '../../base/textbox/textbox'
    export default{
        name:'customerInfor',
        data(){
            return {
                ifShow:true,
                ifShow1:true,
                input4:'',
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
                    url: '/Property/classProperty',
                   botton:[{
                    class: 'erp_bt bt_back',
                    imgsrc: '../../../static/image/common/bt_back.png',
                    text: '返回'
                },{
                    class: 'erp_bt bt_save',
                    imgsrc: '../../../static/image/common/bt_save.png',
                    text: '保存'
                },{
                    class: 'erp_bt bt_auxiliary',
                    imgsrc: '../../../static/image/common/bt_audit.png',
                    text: '审核'
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
                tableData: [
                {
                      sequenceNumber: '1',
                      AttributeEncoding: '01',
                      attributeName: '类别',
                      startUsing: ''
                    }, {
                      sequenceNumber: '2',
                      AttributeEncoding: '02',
                      attributeName: '系列',
                      startUsing: ''
                    }, {
                      sequenceNumber: '3',
                      AttributeEncoding: '03',
                      attributeName: '项目',
                      startUsing: ''
                    }
                ],

            }
        },
        created:function(){  
                
        },
        methods:{
        
        },
        components:{
            Btm,
            Textbox
        }
    }
</script>

<style scoped>

.bg-white{
    background: white;
    border-radius: 3px;
}
.shopclass{
    background: #888;
}
.lh40{
    line-height: 40px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
}
.shop-title{
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 3px solid #409eff;
    color: #000;
    padding: 0 20px;
}
.bt_save_add{
    background-color: rgb(22,155,213);
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
.h48{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #E4E4E4;
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
.smallBgcolor .el-select{
    width: 100% !important ;
    margin-left: 10px;
}
.bgcolor label{
    width: 100% !important ;
    margin-right: 0; 
}
.smallBgcolor .el-input--suffix{
    width: 100% !important ;
}
.smallBgcolor .el-input{
    width: 100% !important ;
    margin-left: 10px;
}
.input-need{
    outline: none;
    border:none;
    width: 100%;
    height: 28px;
}
.bgcolor{
    overflow:  visible; 
}
</style>

<style>
.classPropertyDetails .smallBgcolor .el-input input{
    height: 33px!important;
}
.classPropertyDetails .bgcolor{
    width: 100%; 
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