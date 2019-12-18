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
      <li v-if="flag">存储池</li>
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
          disk: '4G',
          cpu: '4核',
          ram: '200G',
          pt: '普通'
        },
        {
          disk: '12G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
          disk: '4G',
          cpu: '2核',
          ram: '100G',
          pt: '高级'
        },
        {
          disk: '4G',
          cpu: '2核',
          ram: '200G',
          pt: '其他'
        },
        {
          disk: '8G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
          disk: '20G',
          cpu: '4核',
          ram: '500G',
          pt: '普通'
        },
        {
          disk: '12G',
          cpu: '4核',
          ram: '200G',
          pt: '普通'
        },
        {
          disk: '12G',
          cpu: '6核',
          ram: '1T',
          pt: '普通'
        },
        {
          disk: '20G',
          cpu: '6核',
          ram: '500G',
          pt: '普通'
        },
        {
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
      ]
    }
  },
  methods: {
    cpu (val) {
      // return !this.data.cpu.includes(val);
      return !Boolean(this.data.cpu.filter(item=>item===val).length)
    },
    pt (val) {
      // return !this.data.pt.includes(val)
        return !Boolean(this.data.pt.filter(item=>item===val).length)
    },
    ram (val) {
      // return !this.data.ram.includes(val)
        return !Boolean(this.data.ram.filter(item=>item===val).length)
    },
    
    radio1 (val) {
      this.clickForm.button2 = ''
      this.clickForm.button3 = ''
      this.clickForm.button4 = ''
      this.data.disk = val
      this.clickDisk = this.aaa.filter(item => item.disk === val)
      this.data.cpu = this.clickDisk.map(item => item.cpu)
    },
    radio2 (val) {
      this.data.pt = this.clickDisk.filter(item => item.cpu === val).map(item => item.pt)
      // console.log(this.data.ram)
    },
    radio3 (val) {
      if(val !== "普通"){
        this.flag=true;
      }else{
         this.flag=false;
      }
      this.data.ram = this.clickDisk.filter(item => item.pt === val).map(item => item.ram)
      // console.log(this.data.ram)
    }
  },
  computed:{

  },
  watch: {

    step (val) {
      if (val === 2 && !this.clickForm.button1) {
        // 第一排选中
        let disk = this.aaa.map(item => parseInt(item.disk))
        disk.sort((n1,n2) => {
          return parseInt(n1.disk) - parseInt(n2.disk) 
        })

        // disk.sort(function(){return Math.random()>0.5?-1:1;})
        this.clickForm.button1 = disk[0] + 'G'
        // 第二排选中
        this.radio1(this.clickForm.button1)
        this.clickForm.button2 = this.clickDisk.map(item => parseInt(item.cpu)).sort((n1,n2) => { return n1 - n2})[0] + '核'
        // this.button2 = this.clickDisk.map(item => parseInt(item.cpu)).sort(() => { return Math.random()>0.5?-1:1;})[0] + '核'
        // 第三排选中
        this.radio2(this.clickForm.button2)
        // let data = this.clickDisk.map(item => parseInt(item.ram)).sort((n1,n2) => { return n1 - n2})[0]
        this.clickForm.button4 = this.data.pt.sort(() => { return Math.random()>0.5?-1:1;})[0]
        this.radio3(this.clickForm.button4,true)
        this.clickForm.button3 = this.data.ram.sort((n1,n2) => { return parseInt(n1) - parseInt(n2)})[0]
      }
    },
    
    clickForm: {
      handler (val) {
        console.log(this.step)
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