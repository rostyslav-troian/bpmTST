Terrasoft.configuration.Structures["MobileCaseModuleConfig"] = {innerHierarchyStack: ["MobileCaseModuleConfig"]};
Terrasoft.Configuration.SysSchemasUIds = Terrasoft.Configuration.SysSchemasUIds || {};
Terrasoft.Configuration.SysSchemasUIds.Case = "117d32f9-8275-4534-8411-1c66115ce9cd";

Terrasoft.sdk.RecordPage.configureColumnSet("Case", "DescriptionColumnSet", {
	alwaysShowTitle: true,
	collapsible: true,
	isCollapsed: true,
	customEditConfig: {
		isCollapsed: false
	}
});

Terrasoft.sdk.RecordPage.configureColumnSet("Case", "CaseProfileColumnSet", {
	alwaysShowTitle: true,
	collapsible: true,
	isCollapsed: true,
	customEditConfig: {
		isCollapsed: false
	}
});

Terrasoft.sdk.RecordPage.configureColumn("Case", "DescriptionColumnSet", "Symptoms", {
	isMultiline: true,
	customPreviewConfig: {
		label: null
	},
	customEditConfig: {
		label: null
	},
	placeHolder: "CaseRecordPageSymptomsPlaceHolder"
});

Terrasoft.sdk.RecordPage.configureColumn("Case", "primaryColumnSet", "Number", {
	readOnly: true,
	customEditConfig: {
		hidden: true
	}
});

Terrasoft.sdk.RecordPage.configureColumn("Case", "primaryColumnSet", "Status", {
	readOnly: true
});

Terrasoft.sdk.RecordPage.configureColumn("Case", "primaryColumnSet", "RegisteredOn", {
	readOnly: true
});

Terrasoft.sdk.RecordPage.configureColumn("Case", "primaryColumnSet", "Subject", {
	isMultiline: true
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Case", "CaseFilesDetail", {
	alwaysShowTitle: true,
	collapsible: true,
	isCollapsed: true,
	customEditConfig: {
		isCollapsed: false
	}
});

Terrasoft.sdk.Actions.add("Case", {
	name: "CaseFilesDetailActionAddFileAndLinks",
	detailName: "CaseFilesDetail",
	title: "MobileConstantsActionAddFileAndLinksTitle",
	isVisibleInGrid: false,
	isVisibleInPreview: true,
	isDisplayTitle: true,
	iconCls: "cf-action-add-file-and-links",
	position: 1,
	actionClassName: "Terrasoft.configuration.ActionAddFileAndLinks"
});

Terrasoft.sdk.Actions.add("Case", {
	name: "CaseOpenFeedDetailAction",
	detailModelName: "SocialMessage",
	title: "CaseOpenFeedDetailActionTitle",
	isVisibleInGrid: true,
	isRecordAction: true,
	isVisibleInPreview: true,
	isDisplayTitle: true,
	iconCls: "cf-action-feed-icon",
	position: 2,
	actionClassName: "Terrasoft.configuration.OpenStandardDetailAction"
});

Terrasoft.sdk.Actions.add("Case", {
	name: "OpenPortalMessagePublisherPageAction",
	title: "CaseOpenPortalMessagePublisherPageActionTitle",
	isVisibleInGrid: false,
	isRecordAction: true,
	isVisibleInPreview: true,
	isDisplayTitle: true,
	iconCls: "cf-action-portal-message-icon",
	position: 3,
	actionClassName: "Terrasoft.configuration.OpenPortalMessagePublisherPageAction",
	entitySchemaUId: Terrasoft.Configuration.SysSchemasUIds.Case
});

Terrasoft.sdk.Actions.configure("Case", "Terrasoft.ActionCopy", {
	position: 8
});

Terrasoft.sdk.Actions.configure("Case", "Terrasoft.ActionDelete", {
	position: 9
});

Terrasoft.sdk.GridPage.configureGroupColumn("Case", "Symptoms", {
	isMultiline: true,
	label: ""
});

Terrasoft.sdk.GridPage.addColumns("Case", ["Priority.Image.Data"]);

Terrasoft.sdk.GridPage.configureSubtitleColumn("Case", "Priority", {
	convertFunction: function(values) {
		var data = values["Priority.Image.Data"];
		if (data) {
			var url = Terrasoft.util.formatUrlForBackgroundImage(data, true);
			var style = Terrasoft.util.getImageStyleByUrl(url);
			return Ext.String.format("<div style=\"{0}\" class=\"cf-list-case-priority-icon\"></div>", style);
		}
		return null;
	}
});

Terrasoft.sdk.Details.setChangeModes("Case", "CaseMessageHistoryStandardDetail", [Terrasoft.ChangeModes.Read]);

Terrasoft.sdk.Details.configure("Case", "ActivityDetailV2StandardDetail", {
	filters: Ext.create("Terrasoft.Filter", {
		type: Terrasoft.FilterTypes.Group,
		subfilters: [
			Ext.create("Terrasoft.Filter", {
				compareType: Terrasoft.ComparisonTypes.NotEqual,
				property: "Type",
				value: Terrasoft.GUID.ActivityTypeEmail
			})
		]
	})
});

Terrasoft.sdk.GridPage.setOrderByColumns("Case", [{
	column: "RegisteredOn",
	orderType: Terrasoft.OrderTypes.DESC
}]);


