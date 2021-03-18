import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import GraphList from '../views/graph/List.vue';
import ModalManage from '../views/modal/Manage.vue';

export default new VueRouter({
  routes: [
    {
      path: '/graph/list',
      component: GraphList
    },
    {
      path: '/modal/manage',
      component: ModalManage
    },
    {
      path: '*',
      redirect: '/graph/list'
    },
  ]
})