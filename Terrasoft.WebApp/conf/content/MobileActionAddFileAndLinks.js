Terrasoft.configuration.Structures["MobileActionAddFileAndLinks"] = {innerHierarchyStack: ["MobileActionAddFileAndLinks"]};
Ext.define("Terrasoft.configuration.ActionAddFileAndLinks", {
	extend: "Terrasoft.ActionBase",

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	execute: function(record, pageConfig) {
		this.callParent(arguments);
		var config = this.config;
		var embeddedDetailId = Terrasoft.util.getColumnSetId(record.modelName, config.detailName, pageConfig.viewMode);
		var embeddedDetail = Ext.getCmp(embeddedDetailId);
		embeddedDetail.setIsCollapsed(false);
		embeddedDetail.fireEvent("additem", embeddedDetail);
		this.executionEnd(true);
	}

});


