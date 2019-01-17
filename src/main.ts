import Vue from 'vue';
import Wshlst from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(Wshlst)
}).$mount('#app');
