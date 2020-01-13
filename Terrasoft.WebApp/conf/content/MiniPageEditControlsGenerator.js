Terrasoft.configuration.Structures["MiniPageEditControlsGenerator"] = {innerHierarchyStack: ["MiniPageEditControlsGenerator"], structureParent: "ViewGeneratorV2"};
define("MiniPageEditControlsGenerator", ["ViewGeneratorV2"], function() {
	/**
	 * @class Terrasoft.configuration.MiniPageEditControlsGenerator
	 * Mini Page edit controls generator class.
	 */
	Ext.define("Terrasoft.configuration.MiniPageEditControlsGenerator", {
		extend: "Terrasoft.ViewGenerator",
		alternateClassName: "Terrasoft.MiniPageEditControlsGenerator",

		/**
		 * @inheritdoc Terrasoft.ViewGenerator#generateModelItem
		 * @protected
		 * @overridden
		 */
		generateModelItem: function(config, generateConfig) {
			this.viewModelClass = generateConfig.viewModelClass;
			delete config.generator;
			var generateModelItem = this.callParent(arguments);
			return generateModelItem;
		}
	});
	return Ext.create("Terrasoft.MiniPageEditControlsGenerator");
});


