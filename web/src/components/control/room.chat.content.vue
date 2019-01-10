<template>
	<div class="chat_content">
		<div>
			<div class="box">
				<div class="chat_item" v-for="one in chatList" v-bind:key="one.id+one.msg">
					<div class="friend" v-if="friend.id==one.from">
						<p v-text="friend.userName"></p>
						<div>
							<p v-text="one.msg"></p>
						</div>
					</div>
					<div class="user" v-if="userInfo.id==one.from">
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
}

</script>
<style scoped lang="scss">
.chat_content {
	>div {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.box {
			overflow-y: scroll;

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
