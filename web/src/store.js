import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {},
		chatList: [],
	},
	mutations: {
		setUserInfo(state, info) {
			state.userInfo = { ...info }
		},
	},
	actions: {
		updateUserInfo({ commit }) {
			if (window.util.getStor('token')) {
				var url = 'getUserInfo';
				window.util.requestPost(url, {}, (data) => {
					commit('setUserInfo', data || {});
				});
			}
		}
	}
})
