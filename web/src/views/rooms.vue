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
					<div class="chat_box" v-for="one in chatFriends" v-bind:key="one.id" v-show="one.select">
						<chat v-bind:friend="one" v-on:sendMsg="sendMsg"></chat>
					</div>
				</div>
				<div class="socket">
					<socket ref="socket"></socket>
				</div>
			</div>
		</div>
		<friend-add></friend-add>
	</div>
</template>
<script>
import roomLeft from '../components/control/room.left.vue'
import roomFriends from '../components/control/room.friends.vue'
import roomChat from '../components/control/room.chat.vue'
import roomSocket from '../components/control/room.socket.vue'
import roomFriendAdd from '../components/control/room.friend.add.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
			chatFriends: [],
			friend: {},
		}
	},
	components: {
		left: roomLeft,
		friendAdd: roomFriendAdd,
		friends: roomFriends,
		chat: roomChat,
		socket: roomSocket
	},
	computed: {
		...mapState(['userInfo', 'chatList']),
	},
	watch: {
		chatList: function(val) {
			if (val) {
				window.util.setStor('chatList', val);
				var unixTime = val[val.length - 1].createdTime;
				window.util.setStor('unixTime', Math.round(new Date(unixTime).getTime() / 1000));
			}
		}
	},
	created() {
		var chat = window.util.getStor('chatList');
		this.updateChatList();
		this.setChatList(chat);
	},
	methods: {
		...mapActions(['updateChatList']),
		...mapMutations(['setChatList']),
		setChatFriend(one) {
			var has = false;
			this.$set(this, 'friend', one);
			this.chatFriends.forEach((item, index) => {
				if (one.id == item.id) {
					this.$set(this.chatFriends, index, one);
					has = true;
				} else {
					item.select = false;
					this.$set(this.chatFriends, index, item);
				}
			});
			if (!has) {
				one.select = true;
				this.$set(this.chatFriends, this.chatFriends.length, one);
			}
		},
		sendMsg(msg) {
			if (msg) {
				var obj = {
					fromId: this.userInfo.id,
					toId: this.friend.id,
					msg
				}
				this.$refs.socket.sendMsg(obj);
				console.log(obj);
			}
		},
	}
}

</script>
<style scoped lang="scss">
#room {
	.bg {
		background: #dfdfdf;
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
				background: #ddd;
			}

			.right {
				flex: 8;
				background: #f5f5f5;

				.chat_box {
					height: 100%;
				}
			}

			.socket {
				position: absolute;
				right: 0;
			}
		}
	}
}

</style>
