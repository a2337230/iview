<template>
  <div class="step-container">
    <!-- 步骤条 -->
    <div class="step">
      <Steps :current="step">
        <Step title="已完成" content=""></Step>
        <Step title="进行中" content=""></Step>
        <Step title="进行中1" content=""></Step>
        <Step title="进行中2" content=""></Step>
        <Step title="进行中3" content=""></Step>
      </Steps>
    </div>
    <!-- 表单 -->
    
    <div class="form-container">
      <div class="left item">
        <form-box1 @update="update" v-show="step === 0" :dataInfo="formData" ref="form1"></form-box1>
        <form-box2 @update="update" v-show="step === 1" :dataInfo="formData"></form-box2>
        <form-box3 @update="update" v-show="step === 2" :step="step"></form-box3>
        <form-box1 @update="update" v-show="step === 3" :dataInfo="formData" ref="form2"></form-box1>
        <form-box5 @update="update" @tablename="tablename" v-show="step === 4" :dataInfo="formData" @updateList="updateList"></form-box5>
      </div>
      <div class="right item">
        <ul>
          <li>
            姓名： {{formData.name}}
          </li>
          <li>
            年龄： {{formData.age}}
          </li>
          <li>
            性别： {{formData.sex}}
          </li>
          <li>
            地址： {{formData.address}}
          </li>
          <li>
            内存： {{formData.button1}}
          </li>
          <li>
            CPU： {{formData.button2}}
          </li>
          <li>
            规格： {{formData.button3}}
          </li>
          <li>
            容量： {{formData.button4}}
          </li>
          <li>
            已选中： <span>{{currentTable}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-container">
      <Button type="primary" @click="steps(false)" v-show ="step">上一步</Button>
      <Button type="primary" @click="steps(true)">{{text}}</Button>
    </div>

    <Form :model="formInfo" label-position="left" :label-width="200">
      <FormItem label="名称">
          <Input v-model="formInfo.name" style="width: 200px" @input="nameInput"></Input>
      </FormItem>
      <FormItem label="主机名">
          <Input v-model="formInfo.comname" style="width: 200px" @input="comnameInput"></Input>
      </FormItem>
      <FormItem label="其他输入框">
          <Input v-model="formInfo.pet" style="width: 200px"></Input>
      </FormItem>
      <FormItem label="只能输入1-10">
          <Input v-model="formInfo.num" style="width: 200px" type="number" @on-change="numFormat" :maxlength="3"></Input>
      </FormItem>
    </Form>

    <Table border  :columns="columns12" :data="data6" :row-class-name="rowClassName" @on-selection-change="selectChange" @on-row-click="singleclick" class="table1">
        <template slot-scope="{ row, index }" slot="action">
          <Form ref="formValidate" :model="row" :rules="ruleValidate" :label-width="0" v-if="editIndex === index">
              <FormItem label="" prop="id">
                  <Input v-model="row.id" placeholder="请输入ID" class="id-input" autofocus @on-blur="getRow(row)" @on-enter="getRow(row)"></Input>
              </FormItem>
          </Form>
          <Icon type="md-create" v-else @click="handleEdit(index)"/>
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
        </template>
    </Table>
     <Table border  :columns="columns12" :data="data7" :row-class-name="rowClassName" @on-selection-change="selectChange" class="table2" @on-row-click="singleclick">
        
     
    </Table>
  </div>
</template>
<script>
import FormBox1 from './component/Form1'
import FormBox2 from './component/Form2'
import FormBox3 from './component/Form3'
import FormBox5 from './component/Form5'
export default {
  name: 'step',
  data () {
    return {
      classIndex: -1,
      text:'',
      step: 0,
      formData: {
        name: '',
        age: '',
        sex: '',
        address: '',
        button1: '',
        button2: '',
        button3: '',
        button4: '',
      },
      formInfo: {
        name: '',
        comname: '',
        pet: '',
        num: ''
      },
      isDisable: true,
      aaa: [
        {
          disk: '4G',
          cpu: '2核',
          ram: '100G',
          pt: '普通'
        },
        {
          disk: '4G',
          cpu: '1核',
          ram: '50G',
          pt: '普通'
        },
        {
          disk: '2G',
          cpu: '2核',
          ram: '50G',
          pt: '普通'
        },
        {
          disk: '2G',
          cpu: '1核',
          ram: '20G',
          pt: '普通'
        },
        {
          disk: '8G',
          cpu: '8核',
          ram: '150G',
          pt: '普通'
        },
        {
          disk: '8G',
          cpu: '8核',
          ram: '200G',
          pt: '普通'
        },
      ],
      columns12: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
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
       data7: [
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
      ruleValidate: {
        id: [
          { required: true, message: '请输入ID', trigger: 'blur' }
        ]
      },
      editIndex: -1,
      currentTable: ''
    }
  },
  methods: {
    updateList (list, name) {
      console.log(list, '来自父组件接收的信息')
      this.currentTable = name.join(',')
    },
    tablename(val){
      this.currentTable=val;

    },
    numFormat () {
      this.$nextTick(()=>{
        this.formInfo.num =parseInt(this.formInfo.num)
          if (this.formInfo.num < 0) {
                  this.formInfo.num = 0
                } else if (this.formInfo.num > 10) {
                  this.formInfo.num = 10
                }
      })
      
   
    },
    selectChange (val) {
      let data = val.map(item => item.name).join(',')
      this.currentTable = data
      let arr = []
      val.forEach(item => {
        let bendan = {
          name: item.name,
          age: item.age
        }
        arr.push(bendan)
      })
      console.log(arr)
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
    steps (type) {
      this.text = this.step===4?'确定':'下一步'
      if (this.step == 0 || this.step == 3) {
        console.log(this.$refs)
        let next = ''
        if (!this.step) {
          next = this.$refs.form1.handleSubmit('formLeft')
        } else {
          next = this.$refs.form2.handleSubmit('formLeft')
        }
        
        if (!next) {
          return
        }
      }
      
      if (!type) {
        this.step--
      } else {
        this.step++
      }
      
      
    },
    update (val) {
      if (!this.step) {
        this.formData.name = val.name
        this.formData.age = val.age
      } else if (this.step === 1) {
        this.formData.sex = val.sex 
        this.formData.address = val.address
      } else if (this.step === 2) {
        console.log(val)
        this.formData.button1 = val.button1
        this.formData.button2 = val.button2
        this.formData.button3 = val.button3
        this.formData.button4 = val.button4
      } 
    },
    nameInput () {
      if (this.isDisable) {
        let data = this.formInfo.name.replace(/[^a-zA-Z0-9-]/g, '')
        // console.log(data.search(/[a-zA-Z]/))
        if (data.search(/[a-zA-Z]/) === -1) {
          data = ''
        } else {
          data = data.substring(data.search(/[a-zA-Z]/))
        }
        // console.log(data)
        // console.log(data.search(/[a-zA-Z]/))
        this.formInfo.comname = data
      }
    },
    comnameInput () {
      if (this.formInfo.comname !== this.formInfo.name.replace(/[^a-zA-Z0-9-]/g, '')) {
        this.isDisable = false
      }
    },
    num () {
      this.formInfo.num = parseInt(this.formInfo.num)
      if (isNaN(this.formInfo.num)) {
        this.formInfo.num = 1
      } else {
        if (this.formInfo.num >= 10) {
          this.formInfo.num = 10
        }
      }
    },
    rowClassName (row, index) {
        if (index === this.classIndex) {
            return 'ivu-table-row-hover';
        }
        return '';
    },
    singleclick(row,index){
      // console.log(row,index);
      // let text =a[0].name;
      // let _index = a[1];
      // let dom = document.querySelectorAll('.table2 tr');
      // let dom1 = document.querySelectorAll('.table1 tr');
      this.classIndex = index
      // this.data7.forEach((item, cindex)=>{
        // console.log(dom)
        // if(text==item.name){
          // this.rowClassName(arguments,cindex)

          // if(indexNum == 1){
          //   dom[cindex + 1].classList.add('ivu-table-row-hover')
          //   dom1[_index+1].classList.add('ivu-table-row-hover')
          // }else{
          //   dom[_index+1].classList.add('ivu-table-row-hover')
          //   dom1[cindex + 1].classList.add('ivu-table-row-hover')
          // }
      //   }
      // })
    },
    //  singleclick2(index){
    //   console.log(index);
    //   let text =index.name;
    //   this.data7.forEach((item, cindex)=>{
    //     let dom = document.querySelectorAll('.table1 tr')
    //     if(text==item.name){
    //       dom[cindex + 1].classList.add('ivu-table-row-hover')
    //     } else {
    //       dom[cindex + 1].classList.remove('ivu-table-row-hover')
    //     }
    //   })
    // }
  },
  components: {
    FormBox1,
    FormBox2,
    FormBox3,
    FormBox5,

  }
}
</script>
<style lang="css">

.red{
  background: blue;
}
.step-container {
  width: 800px;
  height: 800px;
  /* margin: 50px auto; */
}
.form-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.form-container .item {
  /* width: 40%; */
  border: 1px solid #000;
}
/* .step-container /deep/ input[type="number"]{
  -moz-appearance: textfield;
} */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
</style>