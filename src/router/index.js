import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/new'
    },
    {
      path: '/home',
      name: '首页',
      component: () => import('@/views/Home')
    },
    {
      path: '/step',
      name: '步骤条',
      component: () => import('@/views/step/index')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/test')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/views/Table/Table')
    },
    {
      path: '/all',
      name: '全套封装',
      component: () => import('@/views/All/index')
    },
    {
      path: '/new',
      component: () => import('@/views/new/index')
    }
  ]
})
