<template>
	<div id="add">
		<div class="mask">
			<div class="box">
				<div class="input_box">
					<input type="text">
				</div>
				<div class="ul_box" v-bind:class="{'scroll':hasScroll}">
					<ul>
						<li v-for="(one,key) in new Array(12)" v-bind:key="key">
							<div class="item">
								<div class="left">
									<p>小明</p>
									<span>男</span>
								</div>
								<div class="right">添加</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userList: [],
			hasScroll: false,
		}
	},
	watch: {
		userList: function(val) {
			this.scrollFun();
		}
	},
	created() {
		this.scrollFun();
	},
	methods: {
		scrollFun() {
			this.$nextTick(() => {
				var box = this.$el.querySelector('.ul_box');
				var clientHeight = box.clientHeight;
				var scrollHeight = box.scrollHeight;
				this.hasScroll = clientHeight < scrollHeight;
			});
		},
	},
}

</script>
<style scoped lang="scss">
#add {
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		.box {
			position: absolute;
			top: 200px;
			bottom: 200px;
			width: 40%;
			left: 30%;
			background: #fff;
			overflow: hidden;

			.input_box {
				padding: 30px;

				input {
					width: 94%;
					margin-left: -2px;
					line-height: 30px;
					padding: 0 3%;
				}
			}

			.ul_box {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 92px;
				overflow-y: scroll;

				&.scroll {
					right: -18px;
				}

				ul {
					padding: 30px;
					padding-top: 0;
					display: flex;
					flex-wrap: wrap;

					li {
						width: 50%;

						.item {
							margin: 10px;
							display: flex;
							background: #dfdfdf;
							align-items: center;

							.left {
								padding: 10px;
								flex: 1;

								p {
									font-size: 16px;
									margin-bottom: 4px;
								}
							}

							.right {
								width: 40px;
							}
						}
					}

				}
			}
		}
	}
}

</style>
