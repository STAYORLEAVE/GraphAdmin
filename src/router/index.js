import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import GraphList from '../components/graph/List.vue';
import Theta from '../components/chart/Theta.vue';
import Polar from '../components/chart/Polar.vue';

export default new VueRouter({
  routes: [
    {
      path: '/graph',
      component: GraphList
    },
    {
      path: '/theta',
      component: Theta
    },
    {
      path: '/polar',
      component: Polar
    },
    {
      path: '*',
      redirect: '/graph'
    },
  ]
})