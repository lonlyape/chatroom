const config = {
	production: false,
	quePicUrl: 'http://47.106.200.71/ipmclient/ipm_pic/',
	socketUrl: 'ws://localhost:8082',
	baseUrl: 'http://localhost:8081',
	request: {
		register: '/user/register',
		login: '/user/login',
		getUserInfo: '/user/getUserInfo',
		friendList: '/user/friendList',
		friendApply: '/user/friend/apply',
		seachByUserName: '/user/seach/username',
		temporaryChat: '/chat/temporary',
		temporaryChatDelete: '/chat/temporary/delete',
		getChatList: '/chat/getChatList',
	},
};

window.config = config;
