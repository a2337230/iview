<template>
  <Form :model="formLeft" label-position="left" :label-width="50">
      <FormItem label="性别">
          <Input v-model="formLeft.sex" style="width: 200px"></Input>
      </FormItem>
      
      <FormItem label="地址">
          <Input v-model="formLeft.address" style="width: 200px"></Input>
      </FormItem>
      <FormItem label="第一步名字">
          <Input v-model="dataInfo.name" style="width: 200px"></Input>
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
        sex: '',
        address: ''
      }
    }
  },
  watch: {
    formLeft: {
      handler(val) {
        this.$emit('update', val, 2)
        this.$store.commit('getData', val)
      },
      deep: true
    }
  }
}
</script>