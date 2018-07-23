 <template>
    <!-- 我是审计信息 -->
   
       <el-row id="auditInfo-wrapper">
            <el-col :span="24" >
                <h4>审计信息</h4>
                <div>
                    <div class="bgcolor"><label>创建人</label><el-input v-model="timeFormate.createdBy" disabled></el-input></div>
                    <div class="bgcolor">
                        <label>创建时间</label>                      
                        <!-- <el-input v-model="timeFormate.createdTime"  disabled></el-input> -->
                        <el-date-picker 
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss" 
                            v-model="timeFormate.createdTime" 
                            type="datetime" 
                            readonly
                            disabled>
                        </el-date-picker>
                    </div>
                    <div class="bgcolor">
                        <label>修改人</label>
                        <el-input  v-model="timeFormate.modifiedBy" disabled></el-input>
                    </div>
                    <div class="bgcolor">
                        <label>修改时间</label> 
                      <!-- <el-input v-model="timeFormate.modifiedTime"  disabled></el-input> -->
                      <el-date-picker 
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss" 
                            v-model="timeFormate.modifiedTime" 
                            type="datetime" 
                            readonly
                            disabled>
                        </el-date-picker>
                    </div>
                </div> 


              
            </el-col>
        </el-row>
    
</template>

 <script>
    export default {
        props:['auditData',],
        data(){
            return{
                timeFormate:this.auditData,
            }
        },
        methods:{
        },
        created(){
            
        },
        methods:{
          
        },
        
    }
</script>

<style scope>
    #auditInfo-wrapper{
        padding: 10px;
        border-top:1px solid #e4e4e4;
    }
    #auditInfo-wrapper h4{
        padding: 5px 0 0px 5px;
        margin-bottom: 30px;
    }
</style>

<style>
 /* 重新设置表单宽度 */
    #auditInfo-wrapper .bgcolor.bgLongWidth label{
        width: 60px;
    }
    #auditInfo-wrapper .bgcolor.bgLongWidth .el-input{
        width: calc(100% - 200px);
        text-align: center;
    }
    #auditInfo-wrapper .el-input.is-disabled .el-input__inner {
        text-align: left;
    }
</style>