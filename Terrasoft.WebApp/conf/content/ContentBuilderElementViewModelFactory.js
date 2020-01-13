Terrasoft.configuration.Structures["ContentBuilderElementViewModelFactory"] = {innerHierarchyStack: ["ContentBuilderElementViewModelFactory"]};
define("ContentBuilderElementViewModelFactory", ["terrasoft", "ContentBuilderBlockViewModel",
		"ContentBuilderSeparatorElementViewModel", "ContentBuilderButtonElementViewModel",
		"ContentBuilderHtmlElementViewModel", "ContentBuilderImageElementViewModel",
		"ContentBuilderTextElementViewModel", "ContentBuilderNavbarElementViewModel",
		"ContentBuilderSpacerElementViewModel", "ContentBuilderConstants"],
	function() {

	/**
	 * @class Terrasoft.ContentBuilderElementViewModelFactory
	 */
	Ext.define("Terrasoft.ContentBuilderElementViewModelFactory", {

		// #region Methods: Public

		/**
		 * Returns list of default (predefined) grid elements.
		 * @public
		 * @return {Terrasoft.BaseViewModelCollection} Content block.
		 */
		getPredefinedElements: function() {
			var elements = new Terrasoft.BaseViewModelCollection();
			elements.add(Ext.create("Terrasoft.ContentBuilderBlockViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderImageElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderTextElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderButtonElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderHtmlElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderSeparatorElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderNavbarElementViewModel"));
			elements.add(Ext.create("Terrasoft.ContentBuilderSpacerElementViewModel"));
			return elements;
		}

		// #endregion

	});
});


