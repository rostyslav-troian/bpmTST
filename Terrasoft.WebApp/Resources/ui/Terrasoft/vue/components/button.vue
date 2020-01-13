<template>
	<div class="button" v-on:click="onClick" :color="color" :disabled="disabled">
		<span>{{ caption }}</span>
	</div>
</template>
<style lang="less" scoped>
	.button {
		color: #fff;
		padding: 6px 12px;
		font-size: 14px;
		text-align: center;
		display: inline-block;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 2px;
		border: 1px solid transparent;
		line-height: 1.2em;

		&[color="green"] {
			background: #65ae39;

			&:hover {
				background: #74bc48;
			}
		}

		&[color="red"] {
			background-color: #ef7e63;

			&:hover {
				background: #ec7157;
			}
		}

		&[color][disabled="disabled"] {
			background: #f0f0f0;
			color: #aeaeae;
			cursor: default;

			&:hover {
				background: #f0f0f0;
			}
		}

		&:hover {
			 background: #74bc48;
		 }
	}
</style>
<script>
	export default {
		methods: {
			onClick: function() {
				if (this.disabled) {
					return;
				}
				this.clickFn();
			}
		},
		props: {
			caption: {
				type: String
			},
			clickFn: {
				type: Function
			},
			color: {
				type: String,
				default: "green"
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	}
</script>