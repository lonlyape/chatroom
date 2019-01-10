<template>
	<div class="friends">
		<ul>
			<li v-for="one in friends" v-bind:key="one.id" v-on:click="selectFriend(one)">
				<h3 v-text="one.userName">name</h3>
				<span v-text="one.sex">sex</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			friends: []
		}
	},
	created() {
		console.log('friendList');
		this.getFriends();
	},
	methods: {
		getFriends() {
			var url = 'frindeList';
			window.util.requestPost(url, {}, (data) => {
				data.forEach((one) => {
					one.sex = one.sex == 0 ? '男' : '女';
				});
				this.friends = data;
			});
		},
		selectFriend(one) {
			this.$emit('setChatFriend', one);
		}
	},
}

</script>
<style scoped lang="scss">
.friends {
	ul {
		li {
			font-size: 14px;
			padding: 10px;
			background: #ddd;
			border-bottom: 1px solid #c5c5c5;
			@extend .hand;

			&:hover {
				background: #e5e5e5;
			}
		}
	}
}

</style>
