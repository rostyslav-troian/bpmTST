Terrasoft.configuration.Structures["GlobalSearchModule"] = {innerHierarchyStack: ["GlobalSearchModule"]};
define("GlobalSearchModule", ["BaseSchemaModuleV2"], function() {
	/**
	 * @class Terrasoft.configuration.GlobalSearchModule
	 */
	Ext.define("Terrasoft.configuration.GlobalSearchModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.GlobalSearchModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @overridden
		 */
		init: function(callback, scope) {
			this.callParent([this.search.bind(this, callback, scope), this]);
		},

		/**
		 * Run global search by query.
		 * @protected
		 */
		search: function(callback, scope) {
			this.Ext.callback(callback, scope);
			this.viewModel.search();
		}
	});
	return Terrasoft.GlobalSearchModule;
});


