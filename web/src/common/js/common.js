window.global = {
	token: '',
	updateToken(t) {
		var token = t ? t : window.util.getStor('token');
		if (!token) {
			window.util.jump('/login');
		}
		this.token = token;
	},
	setToken(token) {
		this.token = token;
	},
}
