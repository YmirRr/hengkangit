<template>
    <div>
      <Table   :pluginSetting='pluginSetting'  :cols="column" :tableName="tableModel"  :command="command"></Table>
    </div>
</template>

<script>
  import Table from '../../base/Table/Table'
    export default {
      name: "languageList",
      components:{Table},
      data(){
        return {
          tableModel:"languageList",
          pluginSetting:{
            hasPagination:true,
            mutiSelect:true,//多选栏
            isDisable:true,
          },
          command:[{
            text:'改变文本',
            class:'green'
          },{
            text:'设为默认语言',
            class:'blue'
          }],
          column: [{
            prop: 'systemId_SystemName',
            label: '名称',
            controls:'button',
            isDisable:true,
            sortable:false,
            isFix:'',
          }, {
            prop: 'moduleCode',
            label: '码',
            controls:'button',
            isDisable:true,
            sortable:false,
          }, {
            prop: 'moduleName',
            label: '模块名称',
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop: 'url',
            label: '默认*',
            controls:'text',
            isDisable:true,
            sortable:false,
          },{
            prop: 'moduleParentId_ModuleName',
            label: '创作时间',
            controls:'text',
            isDisable:true,
            sortable:false,
          }, {
            prop: 'status',
            label: '已启用',
            controls:'classMapSelect',
            isDisable:true,
            sortable:false,
            dataSource:[],
            optionsKey:{label:'itemName',value:'itemValue'}
          }],
        }
      }
    }
</script>

<style scoped>

</style>
