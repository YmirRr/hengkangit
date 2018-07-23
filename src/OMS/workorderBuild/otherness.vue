<template>
  <el-row>
      <Table :methodsUrl="httpUrl" :pluginSetting="pluginSetting" :cols="column" :queryParams="queryParams" :tableName="tableModel" :command="command"></Table>
  </el-row>
</template>
<script>
import Table from "../../base/Table/Table";
export default {
  name: "otherness",
  data() {
    return {
      tableModel: "commodityBrand",
      httpUrl: {
        delete: "/api/services/app/BrandManagement/Delete", //行内删除
        query: "/api/services/app/BrandManagement/GetListByCondition" //条件查询
      },
      pluginSetting: {
        hasPagination: true, //是否包含分页
        mutiSelect: false, //多选栏
        isDisable: true //整表是否可编辑
      },
      command: [
        // {
        //   text: "删除",
        //   class: "blue"
        // }
      ],
      queryParams: {
        BrandCode: "", //品牌编码
        BrandName: "", //品牌名称
        BrandEname: "", //品牌名称(英文)
        Status: "", //状态
        SkipCount:
          (this.$store.state.commodityBrandCurrentPage - 1) *
          this.$store.state.commodityBrandEachPage,
        MaxResultCount: this.$store.state.commodityBrandEachPage
      },
      column: [
        {
          prop: "brandCode",
          label: "订单号",
          controls: "text",
          required: true,
          flag: true, //更改标识
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "brandName",
          label: "商品编码",
          controls: "text",
          required: true,
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "brandEname",
          label: "规格",
          controls: "text",
          required: true,
          width: "auto",
          isDisable: true,
          sortable: false
        },
        {
          prop: "remark",
          label: "数量",
          controls: "text",
          width: "auto",
          isDisable: true,
          sortable: false
        }
      ]
    };
  },
  components: {
    Table
  }
};
</script>
