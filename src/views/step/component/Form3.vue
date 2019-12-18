<template>
  <div>
    <ul>
      <li>
        <span>{{list[0].title}}</span>
        <RadioGroup type="button" v-model="clickForm.button1" @on-change="radio1">
          <Radio :label="item"  v-for="item in list[0].value" :key="item"></Radio>
        </RadioGroup>
      </li>
      <li>
        <span>{{list[1].title}}</span>
        <RadioGroup v-model="clickForm.button2" type="button" @on-change="radio2">
          <Radio :label="item" :disabled="cpu(item)" v-for="item in list[1].value" :key="item"></Radio>
        </RadioGroup>
      </li>
      <li>
        <span>{{list[3].title}}</span>
        <RadioGroup v-model="clickForm.button4" type="button" @on-change="radio3">
          <Radio :label="item" :disabled="pt(item)" v-for="item in list[3].value" :key="item"></Radio>
        </RadioGroup>
      </li>
      <li>
        <span>{{list[2].title}}</span>
        <RadioGroup v-model="clickForm.button3" type="button">
          <Radio :label="item" :disabled="ram(item)" v-for="item in list[2].value" :key="item"></Radio>
        </RadioGroup>
      </li>
      <li v-if="flag">
        存储池 ID: {{idArr.id}}
      </li>
      <li v-if="!flag">
        存储池 IP: {{idArr.ip}}
      </li>
    </ul>
   
  </div>
</template>
<script>
export default {
  name: 'form3',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag:false,
      aaa: [
        {
          id: 1,
          ip: '192.168.0.1',
          disk: '4G',
          cpu: '4核',
          ram: '200G',
          pt: '普通'
        },
        {
          id: 2,
          ip: '192.168.0.2',
          disk: '12G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
          id: 3,
          ip: '192.168.0.3',
          disk: '4G',
          cpu: '2核',
          ram: '100G',
          pt: '高级'
        },
        {
          id: 4,
          ip: '192.168.0.4',
          disk: '4G',
          cpu: '2核',
          ram: '200G',
          pt: '其他'
        },
        {
          id: 5,
          ip: '192.168.0.5',
          disk: '8G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
          id: 6,
          ip: '192.168.0.6',
          disk: '20G',
          cpu: '4核',
          ram: '500G',
          pt: '普通'
        },
        {
          id: 7,
          ip: '192.168.0.7',
          disk: '12G',
          cpu: '4核',
          ram: '200G',
          pt: '普通'
        },
        {
          id: 8,
          ip: '192.168.0.8',
          disk: '12G',
          cpu: '6核',
          ram: '1T',
          pt: '普通'
        },
        {
          id: 9,
          ip: '192.168.0.9',
          disk: '20G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
          id: 10,
          ip: '192.168.0.10',
          disk: '20G',
          cpu: '8核',
          ram: '1T',
          pt: '普通'
        },
      ],
      clickForm: {
        button1: '',
        button2: '',
        button3: '',
        button4: '',
      },
     
      data: {
        disk: '',
        cpu: [],
        ram: [],
        pt: []
      },
      clickDisk: [],
      list: [
        {
          title: '内存',
          value: ['4G', '8G', '12G', '20G']
        },
        {
          title: 'CPU',
          value: ['2核','4核','6核','8核']
        },
        {
          title: '容量',
          value: ['100G','200G','500G','1T']
        },
        {
          title: '规格',
          value: ['普通','高级','其他']
        }
      ],
      idArr: {}
    }
  },
  methods: {
    cpu (val) {
      return !Boolean(this.data.cpu.filter(item=>item===val).length)
    },
    pt (val) {
      return !Boolean(this.data.pt.filter(item=>item===val).length)
    },
    ram (val) {
      return !Boolean(this.data.ram.filter(item=>item===val).length)
    },
    radio1 (val) {
      this.data.disk = val
      this.clickDisk = this.aaa.filter(item => item.disk === val)
      this.data.cpu = this.clickDisk.map(item => item.cpu)
      // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // 当点中第一排自动选中第二排第一个
      this.clickForm.button2 = this.clickDisk.map(item => parseInt(item.cpu)).sort((n1,n2) => { return n1 - n2})[0] + '核'
      this.radio2(this.clickForm.button2)
    },
    radio2 (val) {
      this.data.pt = this.clickDisk.filter(item => item.cpu === val).map(item => item.pt)
      // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // 当点中第二排自动选中第三排第一个
      this.clickForm.button4 = this.data.pt[0]
      this.radio3(this.clickForm.button4)
    },
    radio3 (val) {
      // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // 当点中第三排自动选中第四排第一个
      this.data.ram = this.clickDisk.filter(item => item.pt === val).sort((n1,n2) => { return parseInt(n1.ram) - parseInt(n2.ram)})
      let ramFormat = this.data.ram.sort((n1,n2) => { return parseInt(n1) - parseInt(n2)})
      // 保存id
      // if (ramFormat.length >= 1) {
      //   if (ramFormat[0].ram === '1T') {
      //     // 如果第一位为1T
      //     id = ramFormat[1]
      //     ramFormat = ramFormat[1].ram
      //   } else {
      //     id = ramFormat[0]
      //     ramFormat = ramFormat[0].ram
      //   }
      // }
      this.idArr = ramFormat[0]
      ramFormat = ramFormat[0].ram
      // 设置选中值
      this.clickForm.button3 = ramFormat
      // 设置可选择按钮
      this.data.ram = this.clickDisk.filter(item => item.pt === val).map(item => item.ram)
      if(val !== "普通"){
        this.flag=true;
      }else{
         this.flag=false;
      }
      console.log(this.idArr)
      // 普通为空否则传值
      // let storageFlavorId = ''
      // let location = ''
      // if (this.clickForm.button4 !== '普通') {
      //   storageFlavorId = '你要传的值',
      //   location = '你要传的值',
      //   // num 1 禁用 0 启用  启用表示输入框可以输入的
      //   edableAdminPass = num === 1 ? 0 : 1
      // }
    }
  },
  watch: {
    step (val) {
      if (val === 2 && !this.clickForm.button1) {
        // 第一排选中
        this.radio1('4G')
        this.clickForm.button1 = '4G'
      }
    },
    clickForm: {
      handler (val) {
        if (this.step === 2) {
          this.$emit('update', val, 3)
        };
      },
      deep: true
    }
  }
}
</script>
<style lang="css">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 0 10px;
}
li {
  margin: 10px 0;
}
</style>