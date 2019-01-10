<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	created() {
		console.log('created');
		window.global.updateToken();
		this.updateUserInfo();
	},
	watch: {
		userInfo: function(val, OldVal) {
			// console.log(val);
		}
	},
	computed: {
		...mapState(['userInfo']),
	},
	methods: {
		...mapActions(['updateUserInfo']),
	},
}

</script>
<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

</style>
