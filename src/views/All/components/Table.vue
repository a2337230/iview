<template>
  <div class="container">
     <Tabs :value="defaultTab" @on-click="tabClick">
        <TabPane :label="item.label" :name="item.name" v-for="item in tabData" :key="item.id">
          <!-- 搜索框区域 -->
          <div class="search-container" v-if="searchBox">
            <div class="left-btn">
              <Button type="primary" v-if="searchBtn" @click="btnClick(item)">新建</Button>
            </div>
            <div class="right-search" v-if="isSearch">
              <Cascader :data="data3" :render-format="format" class="cascader"></Cascader>
              <Button type="primary" icon="ios-search">搜索</Button>
            </div>
          </div>
          <!-- 表格区域 -->
          <div class="table-container">
            <div class="table">
              <Table :columns="tableColumns" :data="item.data" v-if="item.data">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="show(row, item)">View</Button>
                  <Button type="error" size="small" @click="remove(row, item)">Delete</Button>
                </template>
              </Table>
            </div>
            <div class="table-page" v-if="isPage">
              <Page :total="item.total" show-elevator />
            </div>
          </div>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  name: 'isall',
  props: {
    // 是否显示搜索栏
    searchBox: {
      type: Boolean,
      default: true
    },
    // 是否显示按钮
    searchBtn: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索框
    isSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示分页器
    isPage: {
      type: Boolean,
      default: true
    },
    // 表头
    tableColumns: {
      type: Array,
      default: () => { return {} }
    },
    // 默认选中的tab
    defaultTab: {
      type: String,
      name: '2016'
    },
    tabData: {
      type: Array,
      default: () => { return []}
    }
  },
  data () {
      return {
          data3: [{
              value: 'zhejiang',
              label: '浙江',
              children: [{
                  value: 'hangzhou',
                  label: '杭州',
                  children: [{
                      value: 'xihu',
                      label: '西湖',
                      code: 310000
                  }]
              }]
          }, {
              value: 'jiangsu',
              label: '江苏',
              children: [{
                  value: 'nanjing',
                  label: '南京',
                  children: [{
                      value: 'zhonghuamen',
                      label: '中华门',
                      code: 210000
                  }]
              }]
          }],
          columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
          data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
          
      }
  },
  methods: {
      format (labels, selectedData) {
          const index = labels.length - 1;
          const data = selectedData[index] || false;
          this.$emit('change', labels[index])
          // console.log(labels[index])
          return labels[index];
      },
      show (row, tab) {
        this.$emit('showClick', row, tab)
      },
      remove (row, tab) {
        this.$emit('removeClick', row, tab)
      },
      // 点击新建
      btnClick (val) {
        this.$emit('btnClick', val)
      },
      tabClick (val) {
        this.$emit('tabClick', val)
        console.log(val)
      }
  }
}
</script>
<style lang="less" scoped>
.container {
  .search-container {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    .right-search {
      width: 300px;
      display: flex;
      justify-content: space-between;
      .cascader {
        width: 200px;
      }
    }
    
  }
  .table-container {
    .table {
      min-height: 200px;
    }
    .table-page {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>