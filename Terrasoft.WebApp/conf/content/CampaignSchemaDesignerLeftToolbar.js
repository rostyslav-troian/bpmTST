Terrasoft.configuration.Structures["CampaignSchemaDesignerLeftToolbar"] = {innerHierarchyStack: ["CampaignSchemaDesignerLeftToolbar"]};
define("CampaignSchemaDesignerLeftToolbar", ["CampaignElementSchemaManager"], function() {
	Ext.define("Terrasoft.controls.CampaignSchemaDesignerLeftToolbar", {
		extend: "Terrasoft.ProcessSchemaDesignerLeftToolbar",
		alternateClassName: "Terrasoft.CampaignSchemaDesignerLeftToolbar",

		/**
		 * @inheritdoc Terrasoft.ProcessSchemaDesignerLeftToolbar#elementSchemaManager
		 * @overridden
		 */
		elementSchemaManager: Terrasoft.CampaignElementSchemaManager,

		/**
		 * @inheritdoc Terrasoft.ProcessSchemaDesignerLeftToolbar#initToolbarGroups
		 * @overridden
		 */
		initToolbarGroups: function() {
			Terrasoft.CampaignElementGroups.Items.each(function(item) {
				var controlGroup = Ext.create("Terrasoft.ControlGroup", {
					id: this.getGroupId(item.name),
					caption: item.caption,
					collapsed: false,
					toggleCollapsed: Terrasoft.emptyFn
				});
				this.add(controlGroup);
			}, this);
		}
	});
	return Terrasoft.CampaignSchemaDesignerLeftToolbar;
});


