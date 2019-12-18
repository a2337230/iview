<template>
  <div id="app">
    <Breadcrumb>
        <BreadcrumbItem :to="item.path" v-for="item in list" :key="item.path" :class="{current: path === item.path}">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
    <router-view/>
   

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      path: '',
      list: [
        {
          path: '/home',
          name: '首页'
        },
        {
          path: '/step',
          name: 'step'
        }
      ]
    }
  },
  watch: {
    $route(to,from){
      this.path = to.path
      console.log(to,from);
    }
  }
}
</script>
<style lang="css">
.ivu-breadcrumb>span:last-child {
  font-weight: normal;
}
.current a{
  color: pink;
}
</style>
