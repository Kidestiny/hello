import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store';
import myConfig from './config.js';

myConfig();
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
//自定义组件位置
// import myTipTop from './components/tipTop/tipTop.vue'
// Vue.component('myTipTop',myTipTop)
//自定义组件位置结束
const app = new Vue({
	store,
    ...App
})

app.$mount()
