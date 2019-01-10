<template>
	<div id="room">
		<div class="bg">
			<div class="box">
				<div class="left">
					<left></left>
				</div>
				<div class="center">
					<div class="up"></div>
					<div class="dowm">
						<friends v-on:setChatFriend="setChatFriend"></friends>
					</div>
				</div>
				<div class="right">
					<div class="chat_box" v-for="one in chatFriends" v-bind:key="one.friend.id" v-show="one.select">
						<chat v-bind:friend="one.friend"></chat>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import roomLeft from '../components/control/room.left.vue'
import roomFriends from '../components/control/room.friends.vue'
import roomChat from '../components/control/room.chat.vue'
export default {
	data() {
		return {
			chatFriends: []
		}
	},
	components: {
		left: roomLeft,
		friends: roomFriends,
		chat: roomChat
	},
	methods: {
		setChatFriend(one) {
			var has = false;
			this.chatFriends.forEach((item, index) => {
				if (one.id == item.friend.id) {
					this.$set(item, 'select', true);
					has = true;
				} else {
					item.select = false;
				}
			});
			if (!has) {
				var obj = {
					select: true,
					friend: one
				}
				this.$set(this.chatFriends, this.chatFriends.length, obj);
			}
		}
	}
}

</script>
<style scoped lang="scss">
#room {
	.bg {
		background: #ffcccc;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		.box {
			background: #fff;
			width: 100%;
			max-width: 1000px;
			height: 100%;
			margin: auto;
			display: flex;

			.left {
				flex: 1;
				background: #332211;
			}

			.center {
				flex: 4;
				background: #ccc;
			}

			.right {
				flex: 8;
				background: #eee;

				.chat_box {
					height: 100%;
				}
			}
		}
	}
}

</style>
