Terrasoft.configuration.Structures["MobileOpportunityModuleConfig"] = {innerHierarchyStack: ["MobileOpportunityModuleConfig"]};
Terrasoft.sdk.RecordPage.setTitle("Opportunity", "create", "OpportunityEditPageNewOpportunityTitle");

Terrasoft.sdk.RecordPage.configureColumn("Opportunity", "primaryColumnSet", "Title", {
	isMultiline: true
});

Terrasoft.sdk.RecordPage.addColumn("Opportunity", {
	name: "Stage.MaxProbability",
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.configureColumn("Opportunity", "primaryColumnSet", "Account", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.RecordPage.configureColumn("Opportunity", "OpportunityProductDetailV2EmbeddedDetail", "Comment", {
	isMultiline: true
});

Terrasoft.sdk.GridPage.setOrderByColumns("Opportunity",	{
	column: "Title",
	orderType: Terrasoft.OrderTypes.ASC
});

Terrasoft.sdk.Actions.remove("Opportunity", "Terrasoft.ActionCopy");

Terrasoft.sdk.Actions.add("Opportunity", {
	name: "addOpportunityProduct",
	iconCls: "cf-action-add-product",
	type: "addEmbeddedDetailRecord",
	title: "OpportunityRecordPageActionAddProductCaption",
	detailName: "OpportunityProductDetailV2EmbeddedDetail",
	isQuickAction: true,
	useMask: false,
	position: 1
});

Terrasoft.sdk.Actions.add("Opportunity", {
	name: "addOpportunityContact",
	iconCls: "cf-action-add-contact",
	type: "addEmbeddedDetailRecord",
	title: "OpportunityRecordPageActionAddContactCaption",
	detailName: "OpportunityContactDetailV2EmbeddedDetail",
	isQuickAction: true,
	useMask: false,
	position: 2
});

Terrasoft.sdk.Actions.add("Opportunity", {
	name: "Meeting",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionMeeting",
	title: "Sys.Action.Meeting.Caption",
	defineTitle: "Sys.Action.Meeting.Title",
	modelName: "Activity",
	sourceModelColumnNames: ["Id", "Account"],
	destinationModelColumnNames: ["Opportunity", "Account"],
	evaluateModelColumnConfig: [
		{
			column: "Owner",
			value: {
				isMacros: true,
				value: Terrasoft.ValueMacros.CurrentUserContact
			}
		},
		{
			column: "Author",
			value: {
				isMacros: true,
				value: Terrasoft.ValueMacros.CurrentUserContact
			}
		},
		{
			column: "ActivityCategory",
			value: "42c74c49-58e6-df11-971b-001d60e938c6"
		},
		{
			column: "Priority",
			value: "ab96fa02-7fe6-df11-971b-001d60e938c6"
		},
		{
			column: "Status",
			value: "384d4b84-58e6-df11-971b-001d60e938c6"
		},
		{
			column: "Type",
			value: "fbe0acdc-cfc0-df11-b00f-001d60e938c6"
		}
	],
	position: 3
});

Terrasoft.sdk.Actions.configure("Opportunity", "Terrasoft.ActionDelete", {
	position: 4
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Opportunity", "OpportunityProductDetailV2EmbeddedDetail", {
	title: "OpportunityRecordPageOpportunityProductDetailTitle",
	displaySeparator: true
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Opportunity", "OpportunityContactDetailV2EmbeddedDetail", {
	title: "OpportunityRecordPageOpportunityContactDetailTitle",
	displaySeparator: true
});

Terrasoft.sdk.RecordPage.configureColumn("Opportunity", "OpportunityContactDetailV2EmbeddedDetail", "Contact", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.LookupGridPage.setOrderByColumns("OppContactLoyality", [{
	property: "Position",
	direction: "ASC"
}]);

