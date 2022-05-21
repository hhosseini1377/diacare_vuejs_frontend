import Vue from 'vue'
import App from './App.vue'

//import vue-router, vuex, vuetify
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {cookies} from './plugins/cookies'
import './plugins/moment'
import './plugins/datepicker'

//import global css
import './assets/fonts/iransans/css/fontiran.css'
import './assets/fonts/materialicons/mdi.css'

//env
import {env} from '../public/env'
Vue.prototype.$env = env

//config
Vue.config.productionTip = false

Vue.config.devtools = true //set to false in prod mode

//vue instance
new Vue({
  router,
  store,
  vuetify,
  cookies,
  render: h => h(App),
}).$mount('#app')
