<template>
  <div class="table">
    <div class="table-top">
      <Table border :columns="columns" :data="data1"></Table>
    </div>
    <div class="table-buttom">
      <Table border :columns="columns2" :data="data2"></Table>
    </div>
    <Cascader :data="data" v-model="value1" :render-format="format"></Cascader>
    <List header="Header" footer="Footer" border :split="false">
            <ListItem :split="false">This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
  </div>
</template>
<script>
export default {
  name: 'table',
  data() {
    return {
      // 上面表格数据
      columns: [
        {
          title: '虚拟鸡',
          render: (h, params) => {
            return h('a', {
              on: {
                click: (e) => {
                  this.columns2 = this.columnsJi
                  this.data2 = this.dataJi
                }
              }
            }, params.row.ji)
          }
          
        },
        {
          title: '裸金鼠',
          render: (h, params) => {
            return h('a', {
              on: {
                click: (e) => {
                  console.log(e)
                  this.columns2 = this.columnsShu
                  this.data2 = this.dataShu
                }
              }
            }, params.row.shu)
          }
        }
      ],
      data1: [
        {
          ji: 10,
          shu: 5
        }
      ],
      columns2: [],
      data2: [],
      columnsJi: [
        {
          title: '公鸡',
          key: 'gong'
        },
        {
          title: '母鸡',
          key: 'mu'
        }
      ],
      dataJi: [
        {
          gong: '一只公鸡',
          mu: '一只母鸡'
        },
        {
          gong: '两只公鸡',
          mu: '两只母鸡'
        },
        {
          gong: '三只公鸡',
          mu: '三只母鸡'
        },
        {
          gong: '四只公鸡',
          mu: '四只母鸡'
        },
        {
          gong: '五只公鸡',
          mu: '五只母鸡'
        },
        {
          gong: '六只公鸡',
          mu: '六只母鸡'
        },
        {
          gong: '七只公鸡',
          mu: '七只母鸡'
        },
        {
          gong: '八只公鸡',
          mu: '八只母鸡'
        },
        {
          gong: '九只公鸡',
          mu: '九只母鸡'
        },
        {
          gong: '十只公鸡',
          mu: '十只母鸡'
        }
      ],
      columnsShu: [
        {
          title: '大老鼠',
          key: 'bigShu'
        },
        {
          title: '小老鼠',
          key: 'smallShu'
        }
      ],
      dataShu: [
        {
          bigShu: '一只王大老鼠',
          smallShu: '一只王小老鼠'
        },
        {
          bigShu: '两只王大老鼠',
          smallShu: '两只王小老鼠'
        },
        {
          bigShu: '三只王大老鼠',
          smallShu: '三只王小老鼠'
        },
        {
          bigShu: '四只王大老鼠',
          smallShu: '四只王小老鼠'
        },
        {
          bigShu: '五只王大老鼠',
          smallShu: '五只王小老鼠'
        }
      ],
      value1: [],
      data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
              {
                  value: 'gugong',
                  label: '故宫'
              },
              {
                  value: 'tiantan',
                  label: '天坛'
              },
              {
                  value: 'wangfujing',
                  label: '王府井'
              }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
              {
                  value: 'nanjing',
                  label: '南京',
                  children: [
                      {
                          value: 'fuzimiao',
                          label: '夫子庙',
                      }
                  ]
              },
              {
                  value: 'suzhou',
                  label: '苏州',
                  children: [
                      {
                          value: 'zhuozhengyuan',
                          label: '拙政园',
                      },
                      {
                          value: 'shizilin',
                          label: '狮子林',
                      }
                  ]
              }
          ],
      }]
    }
  },
  methods: {
    format (labels, selectedData) {
      const index = labels.length - 1;
      const data = selectedData[index] || false;
      if (data && data.code) {
        return labels[index];
      }
      return labels[index];
    }
  }
}
</script>
<style lang="css">
.table-top {
  margin-bottom: 10px;
}
</style>