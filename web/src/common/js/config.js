const config = {
	production: false,
	quePicUrl: 'http://47.106.200.71/ipmclient/ipm_pic/',
	baseUrl: 'http://localhost:8081',
	request: {
		register: '/user/register',
		login: '/user/login',
		getUserInfo: '/user/getUserInfo',
	},
};

window.config = config;
