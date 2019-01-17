import Vue from 'vue';
import Router from 'vue-router';
import Wshlst from './views/Wshlst.vue';
import New from './views/New.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home_default',
      component: Wshlst
    },
    {
      path: '/:user',
      name: 'home_admin',
      component: Wshlst
    },
    {
      path: '/:user/new',
      name: 'new',
      component: New
    }
  ]
});
