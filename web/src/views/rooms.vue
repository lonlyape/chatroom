<template>
	<div id="room">
		<div class="bg">
			<div class="box">
				<div class="left">
					<left></left>
				</div>
				<div class="center">
					<div class="up"></div>
					<div class="dowm"></div>
				</div>
				<div class="right"></div>
			</div>
		</div>
	</div>
</template>
<script>
import roomLeft from '../components/control/room.left.vue'
export default {
	components: {
		left: roomLeft,
	},
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
			}
		}
	}
}

</style>
