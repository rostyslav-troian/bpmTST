Terrasoft.configuration.Structures["VwDcmLibSectionGridRowViewModel"] = {innerHierarchyStack: ["VwDcmLibSectionGridRowViewModel"]};
define("VwDcmLibSectionGridRowViewModel", ["ext-base", "VwDcmLibSectionGridRowViewModelResources",
	"BaseSectionGridRowViewModel"], function(Ext, resources) {

	Ext.define("Terrasoft.configuration.VwDcmLibSectionGridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.VwDcmLibSectionGridRowViewModel",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResources(resources.localizableStrings);
		}
	});

	return Terrasoft.VwDcmLibSectionGridRowViewModel;
});


