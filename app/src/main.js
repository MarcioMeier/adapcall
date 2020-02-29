import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';

import importComponent from './plugin/importComponent';

import App from './App.vue';
import router from './router';

Vue.use(importComponent);

global.axios = axios;
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
