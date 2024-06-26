// <!-- 页面路径：store/index.js -->
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"username": "foo",
		"age": 18
	},

	getters: {
		getTestValue: state => state.testData
	},

	mutations: {
		setTestValue(state, testValue) {
			state.testData = testValue
		}
	}
})
export default store
