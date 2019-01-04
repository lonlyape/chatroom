import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './common/js/config.js'
import './common/js/util.js'

import './common/style/resect.css'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')