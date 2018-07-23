
<template>
    <el-dialog :visible="dialogVisible" class="dialog_confirm_message" width="25%" title="提示" @close='close'>
        <el-col :span="24" class="detail_message_btnWapper" :visible="dialogSetting.dialogType=='submit'">
            <span v-show="dialogSetting.dialogType=='submit'" @click="detail_message_ifShow = !detail_message_ifShow" class="upBt">详情<i class="el-icon-arrow-down" :class="{rotate : !detail_message_ifShow}"></i></span>
        </el-col>
        <el-col :span="24" style="position: relative;">
            <el-col :span="24">
                <!-- 确认对话框icon -->
                <p v-show="dialogSetting.dialogType=='confirm'" class="dialog_body_icon"><i class="el-icon-question"></i></p>
                <!-- 提交错误对话框icon -->
                <p v-show="dialogSetting.dialogType=='submit'" class="dialog_body_icon"><i class="el-icon-warning"></i></p>
                <!-- 提示显示信息 -->
                <p class="dialog_font dialog_body_message">{{dialogSetting.message}}</p>
            </el-col>
            <!-- 提交错误详细信息 -->
            <el-collapse-transition v-show="dialogSetting.dialogType=='submit'">
                <el-col :span="24" v-show="detail_message_ifShow" class="dialog_body_detail_message">
                    <vue-scroll :ops="option">
                        <span class="dialog_font">{{errorTips.message}}</span>
                        <h4 class="dialog_font dialog_font_bold">其他信息:</h4>
                        <span class="dialog_font">{{errorTips.details}}<br></span>
                    </vue-scroll> 
                </el-col>
            </el-collapse-transition>
        </el-col>
        <span slot="footer">
            <button v-for="item in dialogCommand" :class="{dialog_footer_bt_long:dialogCommand.length==1}" :key="item.text" class="dialog_footer_bt dialog_font"  @click="dialogClick(item)">{{item.text}}</button>
        </span>
    </el-dialog>
</template>
<script type="text/javascript">
	export default{
        props:{
            
            dialogVisible:{//提示框是否可见
                type:Boolean
            },
            dialogSetting:{
                type:Object//对话框配置
            },
            dialogCommand:{//按钮组
                type:Array
            },
            errorTips:{//错误提示
                type:Object,
            }
        },
		data(){
			return{
                detail_message_ifShow:false,
                option: {
                    vRail: {
                        width: '5px',
                        pos: 'right',
                        background: "#9093994d",
                    },
                    vBar: {
                        width: '5px',
                        pos: 'right',
                        background: '#9093994d',
                    },
                    hRail: {
                        height: '0',
                    },
                },
			}
		},
		created() {
        },
        watch: {
            dialogVisible(val){
                this.dialogVisible=val;
            },
            dialogSetting:{
                handler:function(val,oldVal){
                    this.dialogSetting=val;
                },
                deep:true
            }
        },
	    methods:{
	    	dialogClick(item){
                let param={
                    dialogName:this.dialogSetting.dialogName,
                    dialogButton:item.text
                }
                this.$emit('dialogClick',param);
            },
            close(){
                this.$emit('dialogColse');
                this.detail_message_ifShow=false;
            }
	    }
	}
</script>
<style scoped>

</style>