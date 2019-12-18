<template>
  <TabPane :label="tabData.tabLable" tab="tab1">
    <Tabs :name="tabData.name">
      <TabPane :label="item.label" :tab="tabData.name" v-for="(item, index) in tabData.Nodes" :key="index">
        <Table border :row-class-name="item.rowClassName" :columns="item.columns" :data="item.data1"></Table>
      </TabPane>
    </Tabs>
  </TabPane>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    tabData: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>