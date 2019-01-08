import Vue from 'vue'
import VueResource from 'vue-resource'
import Store from '../../store.js'

Vue.use(VueResource);

Date.prototype.Format = function(fmt) {
	var o = {
		'M+': this.getMonth() + 1, //月份   
		'd+': this.getDate(), //日   
		'h+': this.getHours(), //小时   
		'm+': this.getMinutes(), //分   
		's+': this.getSeconds(), //秒   
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度   
		'S': this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
};

Math.stochastic = function(star, end) {
	var c = end - star + 1;
	return Math.random() * c + star;
}

const util = {
	//post 请求
	requestPost: function(interfaceName, param, callback, callback2) {
		param = param ? param : {};
		param.token = window.global.token;
		var url = interfaceName;
		if (/^(http)/.test(url)) {
			param = {};
		} else if (/^\//.test(url)) {
			url = window.config.baseUrl + interfaceName;
		} else {
			url = window.config.baseUrl + window.config.request[interfaceName];
		}

		var httpSet = {
			emulateJSON: true,
		};

		Vue.http.post(url, param, httpSet).then((res) => {
			var body = res.body;
			var data = body.data;
			if (body.code == 200) {
				callback(data);
			} else {
				if (callback2) {
					callback2(body);
				} else {
					window.alert(body.message);
				}
			}
		});
	},
	//get 请求
	requestGet: function(interfaceName, param, callback) {
		param = param ? param : {};
		var url = interfaceName;
		if (/^(http)/.test(url)) {
			param = {};
		} else if (/^\//.test(url)) {
			url = window.config.baseUrl + interfaceName;
		} else {
			url = window.config.baseUrl + window.config.request[interfaceName];
		}
		Vue.http.get(url, { params: param }).then((res) => {
			var body = res.body;
			callback(body);
		});
	},
	//请求拦截
	interceptor: function(fun) {
		Vue.http.interceptors.push(fun);
	},
	//页面跳转
	jump: function(url, param, b) {
		if (!url) {
			console.log('跳转url不能为空');
			return;
		}
		var search = '';
		if (param) {
			search = '?';
			param = JSON.stringify(param).replace(/\{|\}/g, '').replace(/:/g, '=').replace(/,/g, '&');
			if (!(/^\s*$/.test(param))) {
				search = '&' + param;
			}
		}
		if (/^(http)/.test(url)) {
			if (b) {
				location.replace(url)
			} else {
				location.href = url;
			}
		} else if (/^(www)/.test(url)) {
			url = 'http://' + url;
			if (b) {
				location.replace(url)
			} else {
				location.href = url;
			}
		} else {
			if (/^\//.test(url)) {
				url = '#' + url;
			} else if (!/^#/.test(url)) {
				url = '#/' + url;
			}
			url = location.origin + location.pathname + search + url;
		}
		if (b) {
			location.replace(url);
		} else {
			location.href = url;
		}
	},
	//获取链接 search 所带的参数
	getParam: function() {
		var q = location.search.substr(1);
		var qs = q.split('&');
		var arg = {};
		if (q && qs) {
			for (var i = 0; i < qs.length; i++) {
				arg[qs[i].substring(0, qs[i].indexOf('='))] = decodeURI(qs[i].substring(qs[i].indexOf('=') + 1)); //decodeURI 进行解码
			}
		}
		return arg;
	},
	//设置 title
	setTitle: function(title) {
		document.getElementsByTagName('title')[0].innerText = title;
	},
	//更改地址栏的请求地址面不刷新页面
	reHref: function(param, type, state) {
		var url = param;
		state = state ? state : {};
		if (!type || type === 'hash' || type === 0) {
			var href = location.href.replace(/#.*/, '');
			if (/^\//.test(url)) {
				url = '#' + url;
			} else if (/^\w*/.test(url)) {
				url = '#/' + url;
			}
			url = href + url;
		}
		try {
			window.history.replaceState(state, '', url);
		} catch (e) {
			console.error(e);
		}
	},
	//添加地址栏的请求地址面不刷新页面
	addHref: function(param, type, state) {
		var url = param;
		state = state ? state : {};
		if (!type || type === 'hash' || type === 0) {
			var href = location.href.replace(/#.*/, '');
			url = href + '#/' + param;
		}
		try {
			window.history.pushState(state, '', url);
		} catch (e) {
			console.error(e);
		}
	},
	//获取 localStorage 的缓存内容
	getStor: function(name) {
		var stor = localStorage.getItem(name);
		if (stor) {
			stor = JSON.parse(stor);
		}
		return stor;
	},
	//设置 localStorage 的缓存内容
	setStor: function(name, param) {
		var stor = JSON.stringify(param);
		localStorage.setItem(name, stor);
	},
	//删除 localStorage 的缓存内容
	removeStor: function(name) {
		localStorage.removeItem(name);
	},
	//判断浏览器的类型
	isBrowser: function(type) {
		var ua = navigator.userAgent.toLowerCase();
		var value;
		switch (type) {
			case 'ios':
				value = /iphone|ipad|ipod/.test(ua);
				break;
			case 'android':
				value = /android/.test(ua);
				break;
			case 'wx':
				value = /micromessenger/.test(ua);
				break;
		}
		return value;
	},
	//vue 全局混入
	vueMixin: function(obj) {
		Vue.mixin(obj);
	},
	//code 图片
	getImgUrl(code) {
		return window.config.quePicUrl + 'que_a/' + code + '.jpg';
	},
	comfirm: function(text, funT, funF) {
		var r = window.confirm(text);
		if (r) {
			funT && funT();
		} else {
			fimF && funF();
		}
	},
	showLoading: function(text) {
		var obj = {};
		if (text) {
			obj.text = text;
		}
		obj.show = true;
		Store.commit('setloadingmsg', obj);
	},
	hidenLoading: function() {
		var obj = {
			show: false
		};
		Store.commit('setloadingmsg', obj);
	},
}

window.util = util;
