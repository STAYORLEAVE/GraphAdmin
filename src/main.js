import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import Viser from 'viser-vue';
import Antd from 'ant-design-vue';
import { FormModel } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(Viser);
Vue.use(FormModel);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
