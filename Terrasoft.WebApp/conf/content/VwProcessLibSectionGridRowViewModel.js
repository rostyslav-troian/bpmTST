Terrasoft.configuration.Structures["VwProcessLibSectionGridRowViewModel"] = {innerHierarchyStack: ["VwProcessLibSectionGridRowViewModel"]};
define("VwProcessLibSectionGridRowViewModel", ["ext-base", "VwProcessLibSectionGridRowViewModelResources",
	"BaseSectionGridRowViewModel"], function(Ext, resources) {

	Ext.define("Terrasoft.configuration.VwProcessLibSectionGridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.VwProcessLibSectionGridRowViewModel",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResources(resources.localizableStrings);
		},

		/**
		 * Returns flag that indicates visible of run process button.
		 * @return {Boolean}
		 */
		getIsVisibleRunProcessButton: function() {
			return !this.get("isMultiSelectVisible") && this.get("Enabled");
		}
	});
	return Terrasoft.VwProcessLibSectionGridRowViewModel;
});


