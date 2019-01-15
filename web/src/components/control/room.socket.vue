<template>
	<div class="socket">
		webSocket
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			ws: {},
		}
	},
	props: {
		url: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState(['userInfo', 'chatList']),
	},
	created() {
		this.socketCreate();
	},
	methods: {
		...mapMutations(['setChatList']),
		socketCreate() {
			var url = this.url || window.config.socketUrl;
			var ws = new WebSocket(url);
			var _this = this;


			ws.onopen = function(e) {
				console.log('webSocket created');
				var interval = setInterval(() => {
					var createdObj = {
						type: 'create',
						fromId: _this.userInfo.id
					}

					if (createdObj.fromId) {
						ws.send(JSON.stringify(createdObj));
						clearInterval(interval);
					}
				}, 10);
			}

			ws.onclose = function(e) {
				console.log('webSocket closed');
			}

			ws.onmessage = this.message;

			this.ws = ws;
		},
		message(msg) {
			console.log('socket : ', msg.data);
			this.chatList.push(JSON.parse(msg.data));
		},
		sendMsg(msg) {
			msg.type = 'chat';
			this.ws.send(JSON.stringify(msg));
			this.setChatList(msg);
		},

	},
}

</script>
