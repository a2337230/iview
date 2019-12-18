<template>
  <Modal
    v-model="visiable"
    mask-closable: false
    :title="title"
    >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入姓名,最多8个字" maxlength="8"></Input>
        </FormItem>
        <FormItem label="手机号" prop="tel">
          <Input v-model="formValidate.tel" placeholder="请输入手机号" maxlength="11" type="tel"></Input>
        </FormItem>
    </Form>
    <div slot="footer">
      <div class="btn-group">
        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
        <Button @click="visiable = false">取消</Button>
      </div>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'Model',
  props: {
    title: {
      type: String,
      default: '新建弹窗'
    },
    name: {
      type: String,
      default: ''
    }
  },
  watch: {
    visiable (val) {
      if (val) {
       
        this.name ? this.formValidate.name = this.name : ''
      }
    }
  },
  data () {
    return {
      visiable: false,
      formValidate: {
        name: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formValidate.name)
          // 在这之前写请求逻辑
          this.visiable = false
          this.$Message.success('验证成功')
        } else {
          // this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>