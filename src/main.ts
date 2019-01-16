import Vue from 'vue';
import Wshlst from './Wshlst.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Wshlst)
}).$mount('#app');
