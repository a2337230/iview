<template>
<div class="tabenmae">
   <Table border :columns="columns12" :data="data6" @on-selection-change="selectChange">
        <template slot-scope="{ row, index }" slot="action">
          <Form ref="formValidate" :model="row"  :label-width="0" v-if="editIndex === index">
              <FormItem label="" prop="id">
                  <Input v-model="row.id" placeholder="请输入ID" class="id-input" autofocus @on-blur="getRow(row)" @on-enter="getRow(row)"></Input>
              </FormItem>
          </Form>
          <Icon type="md-create" v-else @click="handleEdit(index)"/>
          
        </template>
    </Table>
</div>


</template>
<script>
export default{
  data(){
    return{
      editIndex: -1,
      currentTable:[],
      netTableData:{},
      chooseSinglelist: [],
      nameList: [],
      columns12: [
        {
          // type: 'selection',
          width: 60,
          align: 'center',
          render:(h,params)=>{
            return h('Checkbox',{
              props:{
                value:params.row._checked
              },
              on:{
                'on-change':(e)=>{
                  if(e){
                    let data = {
                      age: params.row.age,
                      address: params.row.address
                    }
                    // 保存姓名
                    this.nameList.push(params.row.name)
                    this.chooseSinglelist.push(data)
                  }else{
                    this.chooseSinglelist = this.chooseSinglelist.filter(item => item.age !== params.row.age)
                    this.nameList = this.nameList.filter(item => item !== params.row.name)
                  }
                  console.log(this.nameList)
                  // let parent = this.chooseSinglelist.map(item => item.age).join(',')
                  this.$emit('updateList', this.chooseSinglelist, this.nameList)
                }
              }
            })
          }

        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age',
            width: 100
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: 'Action',
            slot: 'action',
            width: 200,
            align: 'center'
        }
      ],
      data6: [
        {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            id: ''
        },
        {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            id: null
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            id: ''
        },
        {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            id: ''
        }
      ],
      }
  },
  methods:{
     selectChange (val) {
      let data = val.map(item => item.name).join(',')
      console.log(data)
     
      let arr = []
      val.forEach(item => {
        let bendan = {
          name: item.name,
          age: item.age
        }
        arr.push(bendan)
      })
      this.$emit('tablename',data);
      // let arr = JSON.parse(JSON.stringify(val))
      // arr.forEach(item => {
      //   delete item.address
      //   // delete item.id
      //   if (!item.id) {
      //     item.id = null
      //   }
      //   console.log(item.id)
      // })
     
    },
     handleEdit (index) {
      this.editIndex = index
      this.$nextTick(() => {
        document.querySelector('.id-input input').focus()
      })
    },
    getRow (row) {
      document.querySelector('.id-input input').blur()
      console.log(row);
      this.editIndex=-1;
    },
  }
}


</script>