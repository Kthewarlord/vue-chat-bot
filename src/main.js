import Vue from 'vue'
import App from './App.vue'

import Flicking from '@egjs/vue-flicking'
import '@egjs/vue-flicking/dist/flicking-inline.css'
Vue.use(Flicking)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
