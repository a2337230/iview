import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formData: {
      name: '',
      age: '',
      sex: '',
      address: ''
    }
  },
  mutations: {
    getData: (state, data) => {
      state.formData['name'] = data['name'] || state.formData['name']
      state.formData['age'] = data['age'] || state.formData['age']
      state.formData['sex'] = data['sex'] || state.formData['sex']
      state.formData['address'] = data['address'] || state.formData['address']
    }
  }
})