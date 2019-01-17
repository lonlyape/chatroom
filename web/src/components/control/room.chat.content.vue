<template>
	<div class="chat_content">
		<div>
			<div class="box">
				<div class="chat_item" v-for="one in chatList" v-bind:key="one.createdTime">
					<div class="friend" v-if="friend.id==one.fromId">
						<p v-text="friend.userName"></p>
						<div>
							<p v-text="one.msg"></p>
						</div>
					</div>
					<div class="user" v-if="userInfo.id==one.fromId && friend.id==one.toId">
						<p v-text="userInfo.userName"></p>
						<div>
							<p v-text="one.msg"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	props: {
		friend: {
			type: Object,
			default () { return {} }
		}
	},
	computed: {
		...mapState(['userInfo', 'chatList']),
	},
	watch: {
		chatList: function(val) {
			var box = this.$el.querySelector('.box');
			var clientHeight = box.clientHeight;
			var scrollHeight = box.scrollHeight;
			var scrollTop = box.scrollTop;
			if (scrollHeight - clientHeight <= scrollTop) {
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			}
		}
	},
	created() {
		this.$nextTick(() => {
			this.scrollToBottom();
		});
	},
	methods: {
		scrollToBottom() {
			var box = this.$el.querySelector('.box');
			var clientHeight = box.clientHeight;
			var scrollHeight = box.scrollHeight;
			box.scrollTo(0, scrollHeight - clientHeight);
		},
	}
}

</script>
<style scoped lang="scss">
.chat_content {
	height: 100%;
	margin-right: -18px;

	>div {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.box {
			overflow-y: scroll;
			height: 100%;

			.chat_item {
				margin: 20px $side;

				.friend,
				.user {
					>div {
						margin-top: 6px;
						background: #fff;
						display: inline-block;
						padding: 10px;
						max-width: 200px;
					}
				}

				.friend {}

				.user {
					text-align: right;

					>div {

						p {
							text-align: left;
						}
					}
				}
			}
		}
	}
}

</style>
