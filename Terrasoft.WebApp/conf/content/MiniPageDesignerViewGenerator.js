Terrasoft.configuration.Structures["MiniPageDesignerViewGenerator"] = {innerHierarchyStack: ["MiniPageDesignerViewGenerator"]};
define("MiniPageDesignerViewGenerator", ["MiniPageDesignerViewGeneratorResources",
	"ViewModelSchemaDesignerViewGenerator"], function() {

	/**
	 * Min page designer view generator.
	 */
	Ext.define("Terrasoft.configuration.MiniPageDesignerViewGenerator", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator",
		alternateClassName: "Terrasoft.MiniPageDesignerViewGenerator",

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator#generateContainer
		 * @override
		 */
		generateContainer: function(config) {
			if (config.showOverlay) {
				delete config.showOverlay;
			}
			if (config.name === "AlignableMiniPageContainer") {
				config.items = Terrasoft.filter(config.items, function(item) {
					return item.name === "MiniPageContentContainer";
				}, this);
			}
			if (config.name === "MiniPageContentContainer") {
				config.items = Terrasoft.filter(config.items, function(item) {
					return item.name === "MiniPage";
				}, this);
			}
			return this.callParent(arguments);
		}

		// endregion

	});

	return Terrasoft.MiniPageDesignerViewGenerator;
});


