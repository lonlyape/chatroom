<template>
	<div class="room_left">
		<div class="user_name">
			<p v-for="one in userNameList" v-bind:key="one" v-text="one"></p>
		</div>
		<div class="add">
			<span class="icon-yonghukaihu" v-on:click="friendAdd()"></span>
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
	methods:{
		friendAdd(){
			this.$emit('friendAdd');
		},
	},
}

</script>
<style scoped lang="scss">
.room_left {
	color: #fff;
	text-align: center;
	height: 100%;
	position: relative;

	.user_name {
	padding: 30px 10px;
		font-size: 16px;
	}
	.add{
		position: absolute;
		bottom:30px;
		text-align: center;
		width: 100%;
		span{
			font-size:28px;
			@extend .hand;
		}
	}
}

</style>
