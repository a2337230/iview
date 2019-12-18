<template>
  <div class="home">
    <!-- 新建 -->
    <div class="btn-group">
      <div class="add-box">
        <Button type="primary" @click="add">新建</Button>
      </div>
      <div class="add-box">
        <Button type="primary" @click="edit">编辑</Button>
      </div>
      <div class="add-box">
        <Button type="primary" @click="pop">弹窗</Button>
      </div>
    </div>
    <div class="table">
      <p>假如这是一个表格，数据十秒钟变一次</p>
      <ul>
        <li v-for="item in tableList" :key="item.title">{{item.title}}</li>
      </ul>
    </div>
    <div class="input-box">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
        <FormItem label="一个特别可爱的输入框" prop="name">
            <Input v-model="formValidate.name" placeholder="一个特别可爱的输入框" :style="{width: value1 * 10 - 200 + 'px'}"></Input>
        </FormItem>
      </Form>
      <Input v-model="value" placeholder="一个可爱的输入框" :style="{width: value1 * 10 + 'px'}" />
      <!-- 调整滑块大小 -->
      <p>设置输入框大小</p>
      <Slider v-model="value1" style="width: 100%"></Slider>
    </div>
    <!-- 模态框 -->
    <model-box ref="model" :title="title" :name="name"></model-box>
    <!-- 父组件 -->
    <ul>
      <li></li>
    </ul>
    <div class="city">
      <cascader-box @change="changeCity"></cascader-box>
      <p>波波小美女当前选择的是：{{currentCity}}</p>
    </div>
    <tab1></tab1>
    <tab2></tab2>
    <table></table>
  </div>
</template>
<script>
import CascaderBox from '@/components/CascaderBox'
export default {
  name: 'home1',
  data () {
    return {
      title: '',
      // 控制按钮点击
      btnClick: true,
      tableList: [
        {
          title: 1
        },
        {
          title: 2
        },
        {
          title: 3
        },
        {
          title: 4
        }
      ],
      timer: '',
      value: '',
      value1: 0,
      formValidate: {
        name: ''
      },
      ruleValidate: {

      },
      name: '123',
      currentCity: ''
    }
  },
  mounted () {
    this.count10()
  },
  methods: {
    changeCity (val) {
      this.currentCity = val
    },
    // 十秒
    count10 () {
      this.timer = setInterval(() => {
        // 这里换成发送的请求
        this.tableList.forEach(item => item.title += 1)
      }, 1000);
    },
    add () {
      this.title = "新建弹窗"
      this.name = ""
      this.$refs.model.visiable = true
    },
    edit () {
      this.title = "编辑弹窗"
      this.name = '123'
      this.$refs.model.visiable = true
    },
    pop () {
      if (!this.btnClick) {
        return
      }
      this.btnClick = false
      this.$Message.info({
          content: '一个可爱的提示框',
          duration: 10,
          onClose: () => {
            this.btnClick = true
          }
      })
    }
  },
  components: {
    ModelBox: () => import('@/components/ModelBox'),
    CascaderBox
  }
}
</script>
<style lang="css">
.btn-group {
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 100px auto;
}
.table {
  width: 880px;
  margin: 20px auto;
  border: 1px solid #000;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.input-box {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.city {
  width: 300px;
  margin: 0 auto;
}
.city p {
  padding: 30px 0;
}
</style>
