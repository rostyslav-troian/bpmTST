Terrasoft.configuration.Structures["DcmDesignerFilterEditFilter"] = {innerHierarchyStack: ["DcmDesignerFilterEditFilter"]};
define("DcmDesignerFilterEditFilter", ["ProcessDesignerFilterEditFilter"], function() {
	/**
	 * Class for item of filter edit control for Process designer.
	 */
	Ext.define("Terrasoft.controls.DcmDesignerFilterEditFilter", {
		extend: "Terrasoft.ProcessDesignerFilterEditFilter",
		alternateClassName: "Terrasoft.DcmDesignerFilterEditFilter",

		/**
		 * @inheritdoc Terrasoft.ProcessDesignerFilterEditFilter#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
		},

		/**
		 * Returns menu item for process parameter right expression menu.
		 * @private
		 * @return {Object} Menu item config.
		 */
		applyMenuItems: function(menuItems) {
			this.callParent(arguments);
			var dcmMainRecordMenuItem = this._getDcmMainRecordMenuItem();
			menuItems.unshift(dcmMainRecordMenuItem);
		},

		/**
		 * Returns menu item for main record right expression menu.
		 * @private
		 * @return {Object} Menu item config.
		 */
		_getDcmMainRecordMenuItem: function() {
			return {
				caption: this.translate.SELECT_MAIN_RECORD,
				handler: function() {
					this.filterEdit.fireEvent("prepareMainRecordModalBox", null,
						this._onMainRecordColumnSelected.bind(this, this.instance));
				}.bind(this)
			};
		}
	});
}
);


