import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
