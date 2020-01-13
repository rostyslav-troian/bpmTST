Terrasoft.configuration.Structures["PageDesignerViewModelGenerator"] = {innerHierarchyStack: ["PageDesignerViewModelGenerator"], structureParent: "ViewModelGeneratorV2"};
define("PageDesignerViewModelGenerator", ["ViewModelSchemaDesignerViewModelGenerator"], function() {

	/**
	 * Page designer view model generator.
	 */
	Ext.define("Terrasoft.configuration.PageDesignerViewModelGenerator", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerViewModelGenerator",
		alternateClassName: "Terrasoft.PageDesignerViewModelGenerator",

		// region Properties: Protected

		/**
		 * Flags that indicates whether designer is read only on not.
		 * @type {Boolean}
		 */
		isReadOnly: false

		// endregion

	});

	return Terrasoft.PageDesignerViewModelGenerator;
});


