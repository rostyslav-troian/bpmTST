<template>
	<div class="editable">
		<input ref="input" :type="type || 'text'" :tabindex="tabIndex" :value="value" @input="emitValue()">
		<div class="error" v-if="errorMessage">{{ errorMessage }}</div>
	</div>
</template>
<style lang="less" scoped>
	.editable {
		border: 1px solid #c8c8c8;
		vertical-align: top;
		min-height: 28px;
		margin-top: 10px;
		width: 310px;
		position: relative;

		input {
			padding-left: 10px;
			padding-right: 10px;
			min-height: 25.97px;
			width: 100%;
			outline: none;
			border: 0;
			font-size: 14px;
		}

		.error {
			position: absolute;
			left: -1px;
			margin-top: 2px;
			background-color: #58aeda;
			color: #fff;
			font-size: 13px;
			padding: 0 5px 2px;
			z-index: 11;
			word-wrap: break-word;
			white-space: normal;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
	}
</style>
<script>
	export default {
		methods: {
			emitValue: function() {
				this.$emit('input', this.$refs.input.value);
			}
		},
		props: ["type", "tabIndex", "value", "errorMessage"]
	}
</script>