Terrasoft.configuration.Structures["MobileCaseMessageHistoryPreviewPage"] = {innerHierarchyStack: ["MobileCaseMessageHistoryPreviewPage"]};
/* globals VwMobileCaseMessageHistory: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "Terrasoft.configuration.CaseMessageHistoryPreviewPageController",
	viewXClass: "Terrasoft.configuration.CaseMessageHistoryPreviewPageView"
};

Ext.define("Terrasoft.configuration.view.CaseMessageHistoryPreviewPage", {
	extend: "Terrasoft.view.BasePreviewPage",
	alternateClassName: "Terrasoft.configuration.CaseMessageHistoryPreviewPageView",
	config: {
		id: "CaseMessageHistoryPreviewPage"
	}
});

Ext.define("Terrasoft.configuration.controller.CaseMessageHistoryPreviewPage", {
	extend: "Terrasoft.controller.BasePreviewPage",
	alternateClassName: "Terrasoft.configuration.CaseMessageHistoryPreviewPageController",

	statics: {
		Model: VwMobileCaseMessageHistory
	},

	config: {
		refs: {
			view: "#CaseMessageHistoryPreviewPage"
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onLoadRecord: function(loadedRecord) {
		var message = loadedRecord.get("Message");
		message = Ext.htmlDecode(message);
		var text = Terrasoft.String.getTextFromHtml(message);
		text = text.replace(/\n/g, "<br>");
		loadedRecord.set("Message", text);
		this.callParent(arguments);
	}

});


