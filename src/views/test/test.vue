<template>
  <div id="app">
    <Tabs name="tab1" @on-click="tabClick1">
      <TabPane :label="item.tabLable" :name="item.tabLable" tab="tab1" v-for="(item, index) in tabData1" :key="index">
        <Tabs :name="item.name" @on-click="tabClick">
          <TabPane :label="citem.label" :name="citem.label" :tab="item.name" v-for="(citem, cindex) in item.Nodes" :key="cindex">
            <Table border :row-class-name="citem.rowClassName" :columns="citem.columns" :data="citem.data1" :key="time"></Table>
          </TabPane>
        </Tabs>
      </TabPane>
        <!-- <tab-item :tabData='item' v-for="(item, index) in tabData" :key="index"></tab-item> -->
    </Tabs>
  </div>
</template>
<script>
import TabItem from '@/components/Tabs.vue'
export default{
    data(){
      return {
        // 所有列表数据,每一个选项中表头和内容都可以配置
        tabData: [
          {
            tabLable: '2016',
            name: 'tab-0',
            Nodes: [
              {
                label: '虚拟机',
                className: this.rowClassName,
              },
              {
                label: '裸金属',
                className: this.rowClassName,
              },
              {
                label: '安全终端',
                className: this.rowClassName,
              },
            ]
          },
          {
            tabLable: '2017',
            name: 'tab-1',
            Nodes: [
              {
                label: '虚拟机',
                className: this.rowClassName
              },
              {
                label: '裸金属',
                className: this.rowClassName
              },
              {
                label: '安全终端',
                className: this.rowClassName,
              },
            ]
          },
          {
            tabLable: '2018',
            name: 'tab-2',
            Nodes: [
              {
                label: '虚拟机',
                className: this.rowClassName,
              },
              {
                label: '裸金属',
                className: this.rowClassName,
              },
              {
                label: '安全终端',
                className: this.rowClassName,
              },
            ]
          },
          {
            tabLable: '2019',
            name: 'tab-3',
            Nodes: [
              {
                label: '虚拟机',
                className: this.rowClassName,
              },
              {
                label: '裸金属',
                className: this.rowClassName,
              },
              {
                label: '安全终端',
                className: this.rowClassName,
              },
            ]
          },
        ],
        tabData1: [],
        table: {
          columns: [
            {
              title: "虚拟鸡",
            key:"ji"
            },
            {
              title: "裸金鼠",
              key:"shu"
            }
          ],
          data1: [
            {
              ji: 10,
              shu: 5
            },
            {
              ji: 17,
              shu: 45
            },
            {
              ji: null,
              shu:75
            }
          ]
        },
        year: '',
        time: String(new Date().getTime())
      }
    },
    created () {
      this.GetTable()
    },
    methods: {
      tabClick1 (val) {
        this.year = val
      },
      // 获取tab
      GetTable () {
        this.tabData1 = this.tabData
        this.year = this.tabData1[0].tabLable
        // console.log(this.tabData1[0])
        this.tabClick(this.tabData1[0].Nodes[0].label)
      },
      tabClick (val) {
        this.time = String(new Date().getTime())
        console.log(val)
        let data = this.tabData1.filter(item => item.tabLable == this.year)[0].Nodes.filter(citem => citem.label == val)[0]
        data.columns = this.table.columns
        data.data1 = this.table.data1
        console.log(data)
      },
      rowClassName (row, index) {
        if (row.ji==null) {
            return 'demo-table-info-row';
        } 
      }
    },
    components: {
      TabItem
    }
}

</script>
<style>
 .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }

</style>
