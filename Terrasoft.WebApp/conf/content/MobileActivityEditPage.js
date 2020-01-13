Terrasoft.configuration.Structures["MobileActivityEditPage"] = {innerHierarchyStack: ["MobileActivityEditPage"]};
/* globals Activity: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "Terrasoft.configuration.controller.ActivityEditPage",
	viewXType: "activityeditpageview"
};

Ext.define("Terrasoft.configuration.view.ActivityEditPage", {
	alternateClassName: "ActivityEditPage.View",
	extend: "Terrasoft.view.BaseEditPage",

	xtype: "activityeditpageview",

	config: {
		id: "ActivityEditPage"
	}

});

Ext.define("Terrasoft.configuration.controller.ActivityEditPage", {
	alternateClassName: "ActivityEditPage.Controller",
	extend: "Terrasoft.controller.BaseEditPage",

	statics: {
		Model: Activity
	},

	config: {
		refs: {
			view: "#ActivityEditPage"
		}
	},

	/**
	 * @obsolete
	 */
	refreshDirtyDataByColumns: Ext.emptyFn,

	/**
	 * @protected
	 * @overriden
	 */
	shouldOpenPreviewPageOnSave: function() {
		var pageHistoryItem = this.getPageHistoryItem();
		if (pageHistoryItem && pageHistoryItem.getParent()) {
			var gridPageController = Terrasoft.PageNavigator.getHistoryItemController(pageHistoryItem.getParent());
			if (gridPageController instanceof Terrasoft.configuration.controller.ActivityGridPage) {
				var gridMode = gridPageController.getActivityGridMode();
				if (gridMode === Terrasoft.Configuration.ActivityGridModeTypes.Schedule) {
					return false;
				}
			}
		}
		return this.callParent(arguments);
	}

});


