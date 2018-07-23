<template>
  <div id="workorderBuildList">
    <el-tabs class="el-tabs-box" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="制作拣货工单" name="build">
        <div>
          <build @changeTab="changeTab"></build>
        </div>
      </el-tab-pane>
      <el-tab-pane :disabled="isDisabled" label="制作结果" name="list">
        <div class="commodity">
          <list @changeTab="changeTab" :listData="listData"></list>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane v-if="isShow" label="库存差异明细" name="otherness">
        <div class="commodity">
          <otherness></otherness>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import build from "./build";
import list from "./list";
import otherness from "./otherness";
export default {
  name: "workorderBuildList",
  data() {
    return {
      activeName: "build",
      isDisabled: true,
      isShow: true,
      listData: ""
    };
  },
  methods: {
    changeTab(parm) {
        this.listData = parm[1];
        this.activeName = parm[0];
    },
    handleClick(tab, event) {
      if (tab.paneName == "list") {
        this.isShow = false;
        this.isDisabled = false;
      } else {
        this.isShow = true;
      }
    }
  },
  mounted: function() {
    let content1 = document.getElementById("workorderBuildList"); //设置高度为全屏
    let height1 = window.innerHeight - 123;
    content1.style.minHeight = height1 + "px";
    content1.style.background = "#ffffff";
    content1.style.overflow = "scroll";
  },
  components: {
    build,
    list,
    otherness
  }
};
</script>
<style scoped>
#workorderBuildList >>> .el-tabs__header{
  margin-bottom: 0px;
}
::-webkit-scrollbar {
  display: none;
}
#workorderBuildList >>> .el-tabs__nav-scroll {
  padding: 0 35px;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
}
#workorderBuildList >>> .bgwhite {
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
}
#workorderBuildList >>> .el-tabs-box {
  /* height: 60px;
  width: 100%;
  background: #fff;
  line-height: 60px; */
}
#workorderBuildList >>> .commodity {
  float: left;
  background: #fff;
  width: 100%;
}
#workorderBuildList >>> .el-table__header-wrapper {
  height: 45px;
  line-height: 45px;
}
</style>


