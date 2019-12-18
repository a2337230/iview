<template>
  <Form :model="formLeft" label-position="left" :label-width="80" ref="formLeft" :rules="ruleValidate">
      <FormItem label="姓名" prop="name">
          <Input v-model="formLeft.name" style="width: 200px"></Input>
      </FormItem>
     <FormItem label="City" prop="city">
            <Select v-model="formLeft.city" placeholder="Select your city">
                <Option v-for="(item,index) in list" value="item.name" :key="index">{{item.name}}</Option>
              
            </Select>
        </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'form1',
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      formLeft: {
        name: '',
        city: ''
      },
      list:[{
        name:"beijing"
      },{
      name:"shanghai"
      }

      ],
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
      city: [
          { required: true, message: 'Please select the city', }
        ],
      }
    }
  },
  methods: {
    handleSubmit (name) {
      let isNext = false
      this.$refs[name].validate((valid) => {
        if (valid) {
          isNext = true
        } else {
          isNext = false
        }
      })
      return isNext
    }
  },
  watch: {
    formLeft: {
      handler(val) {
        this.$emit('update', val, 1)
        this.$store.commit('getData', val)
      },
      deep: true
    }
  }
}
</script>