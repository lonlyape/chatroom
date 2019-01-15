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
		setChatList(state, chat) {
			if (chat instanceof Array) {
				chat.forEach((item) => {
					if (!item.createdTime) {
						item.createdTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
					}
				});
			} else if (chat instanceof Object) {
				if (!chat.createdTime) {
					chat.createdTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
				}
				chat = [chat];
			}
			state.chatList = state.chatList.concat(chat || []);
		}
	},
	actions: {
		updateUserInfo({ commit }) {
			if (window.util.getStor('token')) {
				var url = 'getUserInfo';
				window.util.requestPost(url, {}, (data) => {
					commit('setUserInfo', data || {});
				});
			}
		},
		updateChatList({ commit }) {
			var chatList = this.chatList;
			var url = 'getChatList';
			var param = {
				fromTime: window.util.getStor('unixTime') || 0
			}
			window.util.requestPost(url, param, (data) => {
				commit('setChatList', data || []);
			});
		},
	}
})
