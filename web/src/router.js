import Vue from 'vue'
import Router from 'vue-router'
import register from './views/register.vue'
import login from './views/login.vue'
import room from './views/rooms.vue'

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
	}, {
		path: '/room',
		name: 'room',
		component: room
	}]
})
