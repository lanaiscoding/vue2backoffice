import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import i18n from './i18n'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

Vue.prototype.$driver = new Driver();

Vue.use(ElementUI);
Vue.config.productionTip = false;


const vue = new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
  created() {
    store.commit('GET_SUBROUTER', router)
  }
}).$mount('#app')

export default vue