<template>
	<div class="room_left">
		<div class="user_name">
			<p v-for="one in userNameList" v-bind:key="one" v-text="one"></p>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState(['userInfo']),
		userNameList: function() {
			var arr = [];
			if (this.userInfo.userName) {
				arr = this.userInfo.userName.split('');
			}
			return arr;
		},
	},
}

</script>
<style scoped lang="scss">
.room_left {
	color: #fff;
	padding: 30px 10px;
	text-align: center;

	.user_name {
		font-size: 16px;
	}
}

</style>
