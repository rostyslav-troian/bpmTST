﻿Terrasoft.configuration.Structures["SysProcessLogSectionV2GridRowViewModel"] = {innerHierarchyStack: ["SysProcessLogSectionV2GridRowViewModel"]};
define("SysProcessLogSectionV2GridRowViewModel", ["ext-base", "SysProcessLogSectionV2GridRowViewModelResources",
	"BaseSectionGridRowViewModel"], function(Ext, resources) {
	/**
	 * @class Terrasoft.configuration.SysWorkplaceSectionGridRowViewModel
	 */
	Ext.define("Terrasoft.configuration.SysProcessLogSectionV2GridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.SysProcessLogSectionV2GridRowViewModel",

		/**
		 * ############## #######.
		 * @overridden
		 * @inheritdoc Terrasoft.configuration.BaseGridRowViewModel#initResources
		 */
		initResources: function() {
			this.callParent();
			if (!resources.localizableStrings) {
				return;
			}
			Terrasoft.each(resources.localizableStrings, function(value, key) {
				this.set("Resources.Strings." + key, value);
			}, this);
		}
	});
	return Terrasoft.SysProcessLogSectionV2GridRowViewModel;
});


