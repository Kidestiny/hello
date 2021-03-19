import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store'
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
console.log = () => {}
const app = new Vue({
	store,
    ...App
})

app.$mount()
