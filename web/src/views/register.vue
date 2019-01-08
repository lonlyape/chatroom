<template>
	<div id="register">
		<div class="mask">
			<div class="box">
				<div class="input_box">
					<div class="left"><span>账号</span></div>
					<div class="right">
						<input type="text" placeholder="建议用你的手机号码" v-model="account">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>用户名</span></div>
					<div class="right">
						<input type="text" v-model="userName">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>姓名</span></div>
					<div class="right">
						<input type="text" v-model="name">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>密码</span></div>
					<div class="right">
						<input type="password" v-model="password">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>确认密码</span></div>
					<div class="right">
						<input type="password" v-model="rePassword">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>性别</span></div>
					<div class="right">
						<label for=""><input type="radio" v-model="sex" value="0">男</label>
						<label for=""><input type="radio" v-model="sex" value="1">女</label>
					</div>
				</div>
				<div class="button_box">
					<div class="button" v-on:click="submit">
						<span>提交</span>
					</div>
				</div>
				<p class="bottom_text">
					<span v-on:click="linkToLogin">已有账号，去登录</span>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			account: '',
			userName: '',
			name: '',
			password: '',
			rePassword: '',
			sex: '0'
		}
	},
	methods: {
		linkToLogin() {
			var url = '/login';
			window.util.jump(url);
		},
		submit() {
			if (/^\s*$/.test(this.account)) {
				window.alert('账号不能为空');
				return;
			}
			if (/^\s*$/.test(this.userName)) {
				window.alert('账号不能为空');
				return;
			}
			if (/^\s*$/.test(this.password)) {
				window.alert('账号不能为空');
				return;
			}
			if (/^\s*$/.test(this.rePassword)) {
				window.alert('账号不能为空');
				return;
			}
			if (this.password !== this.rePassword) {
				window.alert('两次输入的密码不一致');
				return;
			}
			var param = {
				account: this.account,
				userName: this.userName,
				name: this.name,
				password: this.password,
				sex: this.sex
			};
			var url = 'register';
			window.util.requestPost(url, param, (data) => {
				var token = data.token;
				window.util.setStor('token', token);
				window.global.updateToken(token);
				window.util.jump('/room');
				this.$store.dispatch('updateUserInfo');
			});
		},
	},
}

</script>
<style scoped lang="scss">
#register {
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);

		.box {
			background: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 500px;
			margin-left: -300px;
			margin-top: -220px;
			padding: 50px;
			font-size: 16px;

			.input_box {
				display: flex;
				padding: 10px 20px 0 0;
				align-items: center;

				.left {
					vertical-align: middle;
					width: 120px;
				}

				.right {
					flex: 1;
					text-align: left;

					input {
						border: none;
						border-bottom: 1px solid #ccc;
						width: 100%;
						height: 30px;
						font-size: 18px;

						&[type=radio] {
							width: 50px;
							height: 20px;
							vertical-align: middle;
						}
					}
				}
			}

			.button_box {
				.button {
					width: 60%;
					color: #fff;
					margin: 30px auto;
					@extend .hand;
				}
			}

			.bottom_text {
				text-align: center;
				font-size: 14px;

				span {
					@extend .hand;
				}
			}
		}
	}
}

</style>
