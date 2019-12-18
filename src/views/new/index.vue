<template>
  <div class="new">
    <!-- 一级tab -->
    <Tabs :value="value1" v-model="value1" class="tab-item" @on-click="tabClick1">
      <TabPane :label="item.tabName" :name="String(item.tabID)" v-for="item in tabs" :key="item.tabID"></TabPane>
    </Tabs>
    <!-- 二级tab -->
    <Tabs :value="value2" v-model="value2" class="tab-item" @on-click="tabClick2">
      <TabPane :label="item.twoTabName" :name="String(item.twoTabID)" v-for="item in tabs2" :key="item.twoTabID"></TabPane>
    </Tabs>
    <!-- 表格 -->
    <Table :columns="columns" :data="data" style="margin-top: 50px;"></Table>
  </div>
</template>
<script>
import { GetTabs, GetTable } from '@/api/index'
export default {
  name: 'new',
  data() {
    return {
      tabs: [],
      tabs2: [],
      // 默认一级tab
      value1: '',
      value2: '',
      // 表格数据
      columns: [],
      data: [],
      type: ''
    }
  },
  created () {
    // 获取tab
    this.getTab()
  },
  methods: {
    // 获取tab
    async getTab () {
      let result = await GetTabs()
      if (result.code === 200) {
        this.tabs = result.data
        // 设置默认tab
        this.value1 = String(result.data[0].tabID)
      }
    },
    // 请求表格
    async getTable () {
      let result = await GetTable({
        tabId: this.value1,
        tabID2: this.value2,
        type: this.type
      })
      result.data.columns.forEach((item, index) => {
        // console.log(item)
        item.render =  (h, params) => {
          return h('a', {
            on: {
              click: (e) => {
                console.log(params)
                if (params.column.title === '总计3') {
                  let tab = this.tabs.filter(item => item.tabID == this.value1)[0].Nodes.filter(item => item.twoTabName === '云主机')[0]
                  this.type = 3
                  this.value2 = String(tab.twoTabID)
                }
              }
            }
          }, params.row[item.key])
        }
      })
      
      this.columns = result.data.columns
      console.log(this.columns)
      this.data = result.data.data
    },
    // 一级tab点击
    tabClick1 (val) {
      this.value1 = val
    },
    tabClick2 (val) {
      this.type = ''
      this.value2 = val
    }
  },
  watch: {
    value1 (val) {
      this.value2 = ''
      this.tabs2 = this.tabs.filter(item => item.tabID == val)[0].Nodes
      this.value2 = String(this.tabs2[0].twoTabID)
    },
    value2 (val) {
      this.getTable()
    }
  }
}
</script>
<style lang="less" scoped>
.new {
  .tab-item {
    margin: 20px 0;
  }
}
</style>