Terrasoft.configuration.Structures["SocialSearch"] = {innerHierarchyStack: ["SocialSearch"]};
define("SocialSearch", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.SocialSearch", {

		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.SocialSearch",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @overridden
		 */
		generateViewContainerId: false,

		/**
		 * @private
		 * @type {String}
		 */
		searchQuery: "",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
		 * @overridden
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			viewModel.set("Query", this.searchQuery);
			return viewModel;
		}
	});
	return Terrasoft.SocialSearch;
});


