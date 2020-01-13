/**
 */
Ext.define("Terrasoft.controls.GridLayoutTableEditItem", {
	alternateClassName: "Terrasoft.GridLayoutTableEditItem",
	extend: "Terrasoft.GridLayoutEditItem",

	/**
	 * @inheritdoc Terrasoft.GridLayoutEditItem#tplConfig
	 */
	gridLayoutTableEditTplConfig: {
		classes: {
			wrapClasses: ["grid-layout-table-edit-item-wrap"],
			textWrapClasses: ["grid-layout-table-edit-item-content-text-wrap"],
			imageWrapClasses: ["grid-layout-table-edit-item-content-image-wrap"]
		},
		selectorSuffixes: {
			gridCell: "grid-layout-table-edit-grid-cell",
			gridTable: "grid-layout-table-edit-grid"
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.mergeTplConfigs(this.gridLayoutTableEditTplConfig);
	},

	/**
	 * Merges current object tpl config with the base tpl config.
	 * Designed for construction of the tpl configs inheritance.
	 * For detatils, see Ext.Object#merge
	 * @protected
	 * @param selfTplConfig {Object}
	 */
	mergeTplConfigs: function(selfTplConfig) {
		this.tplConfig = Ext.merge(this.tplConfig, selfTplConfig);
	},

	/**
	 * @inheritdoc Terrasoft.GridLayoutEditItem#getTop
	 * @override
	 */
	getTop: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		var topIndent = (this.row * gridLayoutEdit.cellHeight);
		return Ext.String.format("calc({0}em + {1}px)", topIndent, this.cellBorderLineSize);
	}
});
