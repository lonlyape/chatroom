<template>
	<div id="login">
		<div class="mask">
			<div class="box">
				<div class="input_box">
					<div class="left"><span>账号</span></div>
					<div class="right">
						<input type="text" placeholder="建议用你的手机号码" v-model="account">
					</div>
				</div>
				<div class="input_box">
					<div class="left"><span>密码</span></div>
					<div class="right">
						<input type="password" v-model="password">
					</div>
				</div>
				<div class="button_box">
					<div class="button" v-on:click="submit">
						<span>登录</span>
					</div>
				</div>
				<p class="bottom_text">
					<span v-on:click="linkToRegister()">未有账号，去注册</span>
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
			password: ''
		}
	},
	methods: {
		linkToRegister() {
			var url = '/register';
			window.util.jump(url);
		},
		submit() {
			if (/^\s*$/.test(this.account)) {
				window.alert('账号不能为空');
				return;
			}
			if (/^\s*$/.test(this.password)) {
				window.alert('账号不能为空');
				return;
			}
			var param = {
				account: this.account,
				password: this.password
			};
			var url = 'login';
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
#login {
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
					text-align: center;
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
