Terrasoft.configuration.Structures["SysLanguageSectionGridRowViewModel"] = {innerHierarchyStack: ["SysLanguageSectionGridRowViewModel"]};
define("SysLanguageSectionGridRowViewModel", ["ext-base", "BaseSectionGridRowViewModel"], function(Ext) {

	/**
	 * @class Terrasoft.configuration.SysLanguageSectionGridRowViewModel
	 */
	Ext.define("Terrasoft.configuration.SysLanguageSectionGridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.SysLanguageSectionGridRowViewModel",

		/**
		 * @inheritdoc Terrasoft.BaseSectionGridRowViewModel#constructor
		 * Adds primary image value to language.
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			var image = this.get("Image");
			if (image && image.value) {
				var language = this.get("Language");
				language.primaryImageValue = image.value;
			}
		}
	});

	return Terrasoft.SysLanguageSectionGridRowViewModel;
});


