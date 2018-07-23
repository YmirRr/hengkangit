<template>
    <div class="submitError-wrapper">
        <!-- 数据提交错误提示框 -->
        <el-dialog :visible.sync="submitData.submitErrorMessage" class="dialog_confirm_message" width="25%">
            <template slot="title">
                <span class="dialog_font">提示</span>
            </template>
            <el-col :span="24" class="detail_message_btnWapper">
                <span @click="submitData.detail_message_ifShow = !submitData.detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" @click="submitData.detail_message_ifShow = !submitData.detail_message_ifShow" :class="{rotate : !submitData.detail_message_ifShow}"></i></span>
            </el-col>
            <el-col :span="24" style="position: relative;">
                <el-col :span="24">
                    <p class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                    <p class="dialog_font dialog_body_message">{{submitData.response.message}}!</p>
                </el-col>
                <el-collapse-transition>
                    
                        <el-col :span="24" v-show="submitData.detail_message_ifShow" class="dialog_body_detail_message">
                            <vue-scroll :ops="option">
                                <span class="dialog_font">{{submitData.response.message}}</span>
                                <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                                <span class="dialog_font">{{submitData.response.details}}<br><span :key="index" v-for="(value,index) in submitData.response.validationErrors"><span :key="ind" v-for="(val,ind) in value.members">{{val}}</span><br></span></span>
                            </vue-scroll> 
                        </el-col>
                </el-collapse-transition>   
            </el-col>
            
            <span slot="footer">
                <button class="dialog_footer_bt dialog_font dialog_footer_bt_long" @click="submitData.submitErrorMessage = false">确 认</button>
                <!-- <button class="dialog_footer_bt dialog_font" @click="submitErrorMessage = false">取 消</button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'submitError',
        // props:['submitErrorMessage','response','detail_message_ifShow',],
        props:['submitData'],
        data(){
            return{
                option: {
                    vRail: {
                    width: "5px",
                    pos: "right",
                    background: "#9093994d"
                    },
                    vBar: {
                    width: "5px",
                    pos: "right",
                    background: "#9093994d"
                    },
                    hRail: {
                    height: "0"
                    }
                },
            }
        },
        methods:{
        },
        
    }
</script>

<style scoped>
.submitError-wrapper .dialog_confirm_message .el-dialog__footer .dialog_footer_bt:first-child {
    /* border-right: 1px solid #e4e4e4; */
    border-top: 1px solid #e4e4e4;
    width: 100%;
}
</style>