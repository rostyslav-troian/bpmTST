Terrasoft.configuration.Structures["ProcessEmailContentBuilderHelper"] = {innerHierarchyStack: ["ProcessEmailContentBuilderHelper"]};
define("ProcessEmailContentBuilderHelper", ["EmailContentBuilder", "ProcessEmailContentTextElementViewModel"],
		function() {
	Ext.define("Terrasoft.ContentBuilder.ProcessEmailContentBuilderHelper", {
		extend: "Terrasoft.ContentBuilderHelper",
		alternateClassName: "Terrasoft.ProcessEmailContentBuilderHelper",

		/**
		 * User task invoker uid of the mapping page.
		 * @private
		 * @type {String}
		 */
		invokerUId: null,

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#textToViewModel
		 * @protected
		 * @overridden
		 */
		textToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.textElementProperties});
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ProcessEmailContentTextElementViewModel", {
				values: config,
				sandbox: this.sandbox,
				invokerUId: this.invokerUId
			}, true);
		}

	});
});


