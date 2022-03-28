import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from '../src/router/index'
import store from './store/index'
import vuetify from './plugins/vuetify'
import validation from './plugins/validation'
import YmapPlugin from 'vue-yandex-maps'
import directives from './plugins/direcctives'



const settings = {
  apiKey: "906b97b2-b060-449c-8fd7-56fec9383abf",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1"
};

Vue.use(YmapPlugin, settings);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(require('vue-moment'));
Vue.use(validation);
Vue.use(directives);



Vue.config.productionTip = false;

new Vue({
  store: store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
 