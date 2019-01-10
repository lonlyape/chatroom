<template>
	<div class="chat">
		<div class="top">
			<div v-text="friend.userName"></div>
		</div>
		<div class="center"></div>
		<div class="bottom">
			<div class="box" v-bind:class="{'focusbg':isFocus}">
				<div class="text_box">
					<textarea v-on:focus="focusStatus(true)" v-on:blur="focusStatus(false)" v-model="sendText"></textarea>
				</div>
				<div class="send" v-on:click="sendMsg()">
					<span>发送</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isFocus: false,
			sendText: ''
		}
	},
	components: {},
	props: {
		friend: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	methods: {
		focusStatus(b) {
			this.isFocus = b;
		},
		sendMsg() {
			var sendText = this.sendText;
			this.sendText = '';
			this.$emit('sendMsg', sendText);
		}
	}
}

</script>
<style scoped lang="scss">
.chat {
	display: flex;
	flex-direction: column;
	height: 100%;

	.top {
		line-height: 60px;
		padding: 0 30px;
		border-bottom: 1px solid $bordercolor;
		font-size: 16px;
	}

	.center {
		flex: 1;
	}

	.bottom {
		.box {
			border-top: 1px solid $bordercolor;
			height: 100px;
			position: relative;

			&.focusbg {
				background: #fff;
			}

			.text_box {
				position: absolute;
				top: 0;
				width: 100%;
				bottom: 30px;
				padding: 10px 2% 0;

				textarea {
					width: 96%;
					height: 100%;
					background: transparent;
					border: none;
					resize: none;

					&:focus {
						border: none;
					}
				}
			}

			.send {
				padding: 4px 10px;
				letter-spacing: 3px;
				font-size: 12px;
				border: 1px solid $bordercolor;
				position: absolute;
				bottom: 10px;
				right: 30px;
				background: #f5f5f5;
				@extend .hand;

				&:hover {
					background: #07e438;
					color: #fff;
				}
			}
		}
	}
}

</style>
