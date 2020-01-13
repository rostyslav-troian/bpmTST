<template>
	<div :class="rootCls">
		<div class='grid-captions'>
			<div v-for="column in columns" :class='columnWidthCls(column)'>
				<label>{{ column.caption || column.name }}</label>
			</div>
		</div>
		<div v-for="item in data"
			 :class="dataRowCls(item)">
			<div v-if='isMultiSelect' class="grid-fixed-col">
				<span :class="getCheckboxCls(item)">
					<input v-model="item._selected"
						   class="t-checkboxedit" type="checkbox" :disabled="item._disabled">
				</span>
			</div>
			<div v-for="column in columns" :class='columnWidthCls(column)'>
				{{ item[column.name] }}
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.grid {
		.grid-listed-row {
			.grid-fixed-col {
				margin-left: 3px;
			}
		}

		.row-disabled {
			background-color: #f7f7f7;
			color: #aeaeae;
		}
	}
</style>
<script>
	export default {
		data: function() {
			return {
				rowWidth: 24
			};
		},
		computed: {
			rootCls: function() {
				return {
					"grid": true,
					"grid-listed": true,
					"grid-listed-zebra": this.isListedZebra
				};
			}
		},
		methods: {

			getCheckboxCls: function(item) {
				const clsList = ["t-checkboxedit-wrap", "grid-listed-row-control"];
				if (item._selected) {
					clsList.push("t-checkboxedit-checked");
				}
				return clsList;
			},

			columnWidthCls: function(column) {
				const columnsLength = this.columns.length;
				let columnWidth = column.width || Math.floor(this.rowWidth / columnsLength);
				const cls = `grid-cols-${columnWidth}`;
				return cls;
			},

			dataRowCls: function(item) {
				return {
					"grid-listed-row": true,
					"row-disabled": item._disabled,
					"grid-row-selected": item._selected
				};
			}
		},
		props: {
			columns: {
				required: true,
				type: Array
			},
			data: {
				required: true,
				type: Array
			},
			isListedZebra: {
				type: Boolean,
				default: false
			},
			isMultiSelect: {
				type: Boolean,
				default: false
			}
		}
	}
</script>