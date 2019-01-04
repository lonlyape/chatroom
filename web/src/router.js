import Vue from 'vue'
import Router from 'vue-router'
import register from './views/register.vue'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		redirect: '/register'
	}, {
		path: '/register',
		name: 'register',
		component: register
	}, {
		path: '/login',
		name: 'login',
		component: login
	}]
})
