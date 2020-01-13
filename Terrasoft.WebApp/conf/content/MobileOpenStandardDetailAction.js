Terrasoft.configuration.Structures["MobileOpenStandardDetailAction"] = {innerHierarchyStack: ["MobileOpenStandardDetailAction"]};
/**
 * @class Terrasoft.configuration.action.OpenStandardDetail
 */
Ext.define("Terrasoft.configuration.action.OpenStandardDetail", {
	alternateClassName: "Terrasoft.configuration.OpenStandardDetailAction",
	extend: "Terrasoft.ActionBase",

	config: {

		/**
		 * @cfg {String} detailModelName Model name.
		 */
		detailModelName: null,

		/**
		 * @inheritdoc
		 */
		useMask: false

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	execute: function(record) {
		this.callParent(arguments);
		Terrasoft.util.openStandardDetail({
			detailModelName: this.getDetailModelName(),
			parentRecord: record
		});
		this.executionEnd(true);
	}

});


