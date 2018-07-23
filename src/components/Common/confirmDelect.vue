<template>
    <div class="confirmDelect-wrpper">
         <!-- dialog是否删除提示(对话框控件) -->
        <el-dialog :visible.sync="confirmDelData.dialogDelectConfirm" class="dialog_confirm_message" width="25%">
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
                <button class="dialog_footer_bt dialog_font" @click="sureAjax">确 认</button>
                <button class="dialog_footer_bt dialog_font" @click="confirmDelData.dialogDelectConfirm = false">取 消</button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name:confirmDelect,
        props:['confirmDelData',],
        data(){
            return {
                
            }
        },
        methods:{
            sureAjax(){

            }
        },
        
    }
</script>

<style scoped>

</style>