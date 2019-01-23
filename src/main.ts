import Vue from 'vue';
import Wshlst from './App.vue';
import store from './store';
import router from './router';
import apolloProvider from './apollo';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  apolloProvider,
  render: h => h(Wshlst)
}).$mount('#app');
