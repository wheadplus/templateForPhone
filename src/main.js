import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/reset.css'
import './assets/css/border.css'
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Button);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
