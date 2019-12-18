<template>
  <div class="container">
    <table-box :tabData="tabData" :tableColumns="columns" @btnClick="btnClick" @showClick="showClick" @removeClick="removeClick" @tabClick="tabClick" v-if="tabData.length"></table-box>
    <!-- <button>跳转</button> -->
    <!-- <iframe id="mainContent" src="https://www.baidu.com" width="100%" height="100%"></iframe> -->
  </div>
</template>
<script>
import TableBox from './components/Table'
export default {
  name: 'isall',
  data () {
    return {
      tabData: [],
      columns: [
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
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data2016: [
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
  created () {
    // 获取年份
    // 假如在这里请求和接口获取年份
    let result = ['2016','2017', '2018', '2019']
    result.forEach((item, index) => {
      let data = {
        id: index,
        label: item,
        name: item,
        data: [],
        total: 100
      }
      this.tabData.push(data)
    })
    this.tabClick(result[0])

    let data = [
      {
        code: 200,
        data: [
          {
            tabID: 1,
            tabName: '2017-2018',
            Nodes: [
              {
                twoTabID: 101,
                  twoTabName: '总计'
              },
              {
                twoTabID: 102,
                  twoTabName: '云主机'
              },
              {
                twoTabID: 103,
                  twoTabName: '安全终端'
              }
            ]
          },
          {
            tabID: 2,
            tabName: '2019',
            Nodes: [
              {
                twoTabID: 201,
                  twoTabName: '孙悟空'
              },
              {
                twoTabID: 202,
                  twoTabName: '猪八戒'
              },
              {
                twoTabID: 203,
                  twoTabName: '沙悟净'
              }
            ]
          },
          {
            tabID: 3,
            tabName: '2020',
            Nodes: [
              {
                twoTabID: 301,
                  twoTabName: '刘备'
              },
              {
                twoTabID: 302,
                  twoTabName: '关羽'
              },
              {
                twoTabID: 303,
                  twoTabName: '张飞'
              }
            ]
          },
        ]
      }
    ]
  },
  methods: {
    btnClick (val) {
      console.log(val)
      alert(val.label + '新建按钮点击')
    },
    showClick (val, tab) {
      alert(tab.label + '的' + val.name + '被点击')
    },
    removeClick (val, tab) {
      alert(tab.label + '的' + val.name + '被点击')
    },
    tabClick (val) {
      // console.log(val)
      let table = this.tabData.filter(item => item.name == val)
      console.log(table)
      setTimeout(() => {
        table[0].data = this.data2016
      }, 1000)
    }
  },
  components: {
    TableBox
  }
}
</script>
<style lang="less" scoped>
#mainContent {
  width: 100vw;
  height: 100vh;
}
</style>