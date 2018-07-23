<template>
  <div class="supplierList">
       <el-container>
           <!-- 头部功能搜索区域 -->
           <el-header class="supplierList-header">
               <el-row :gutter="20">
                    <el-col :span="16">
                        <el-button type="success" >新增</el-button>
                        <el-button type="success" >导入</el-button>
                        <div class="search">
                            <el-input placeholder="编码/名称" v-model="input4" clearable>
                                <template slot="append">搜索</template>
                            </el-input>
                        </div>
                        <el-button type="primary" >高级搜索</el-button>  
                    </el-col>
                    <el-col :span="8">
                        <el-button type="info" >打印</el-button>
                        <el-button type="info" >导出</el-button>
                    </el-col>
               </el-row>
           </el-header>
           <!-- 主体列表区域 -->
           <el-main class="supplierList-main">
               <el-table :data="tableData3" height="500" border style="width: 100%">
                <el-table-column prop="date" sortable label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button ref='updateBtn' :id='scope.row.menuid' type="text" size="small" :menuUrl="scope.row.url+'/'+scope.row.menuid" :menuname="scope.row.name" v-on:click="storageData(scope.row.url,scope.row.name,scope.row.menuid)">修改</el-button>
                        <el-button v-on:click="handleDelete(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
           </el-main>
           <!-- footer 分页汇总 -->
           <el-footer>
               <el-col :span="8">
                   <div>记录56,当前第一页，共四页</div>
               </el-col>
               <el-col :span="16">
                   <el-pagination class="fr" background layout="prev, pager, next" :total="1000"></el-pagination>
               </el-col>
           </el-footer>
       </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'1',
          tobarString:''
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'2',
          tobarString:''
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'3',
          tobarString:''
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'4',
          tobarString:''
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'1',
          tobarString:''
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'1',
          tobarString:''
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          url:'supplierEdit',
          menuid:'1',
          tobarString:''
        }],
    }
  },
   methods:{
        switch(){
            this.$router.push({path:this.$store.state.url})//点击切换路由
        },
        storageData(urlparam,nameparam,idparam){
            var flag=false;
            var slidbarData=this.$store.state.slidbarData;//储存页签数组
            var name=nameparam;
            var menuUrl=urlparam;
            if(slidbarData.length==0){//slidbarData为空
                flag=true;
            }else{//slidbarData不为空
                for(var i=0;i<slidbarData.length;i++){
                    if(slidbarData[i].name==name){//相同页签
                        flag=false;
                        break;
                    }else{
                      flag=true;
                    }
                }
            }
            //var pushItem={'name':name,'url':menuUrl+'/'+idparam};
            var pushItem={'name':name,'url':menuUrl,'params':idparam}
            this.$store.state.url='/'+menuUrl+'/'+idparam;//储存当前url
            if(flag){
                 slidbarData.push(pushItem);
            }
            if(slidbarData.length>=15){
                var r=confirm("您选择打开的窗口已达到15个，如需继续添加新的窗口，默认关闭第一个窗口");
                if (r==true)
                {
                    slidbarData.shift();
                }
            }
            this.switch();
            
        },
       handleEdit:function(index){
           this.isEdit=index;
       },
       finishEdit:function(index){
           this.isEdit=-1;
       },
       handleDelete:function(index){
           this.tableData3.splice(index,1);
       },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 头部搜索 */
.supplierList-header .search{
        display: inline-block;
        width: 300px;
}
/* 主体部分表格 */
.supplierList-main .el-table th{
    padding: 3px 0;
}
.supplierList-main .el-table td{
    padding: 2px 0;
}
.supplierList-main .el-table .cell{
    text-align: center;
}
</style>
