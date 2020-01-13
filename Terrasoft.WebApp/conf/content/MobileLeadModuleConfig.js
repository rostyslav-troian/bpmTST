Terrasoft.configuration.Structures["MobileLeadModuleConfig"] = {innerHierarchyStack: ["MobileLeadModuleConfig"]};
/* globals InformationSource: false */
Terrasoft.sdk.RecordPage.setTitle("Lead", "create", "LeadEditPageNewLeadTitle");

Terrasoft.sdk.RecordPage.addColumn("Lead", {
	name: "LeadName",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.addColumn("Lead", {
	name: "QualifyStatus",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.addColumn("Lead", {
	name: "LeadTypeStatus",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.configureColumn("Lead", "communicationColumnSet", "BusinesPhone", {
	viewType: Terrasoft.ViewTypes.Phone
});

Terrasoft.sdk.RecordPage.configureColumn("Lead", "communicationColumnSet", "MobilePhone", {
	viewType: Terrasoft.ViewTypes.Phone
});

Terrasoft.sdk.RecordPage.configureColumn("Lead", "communicationColumnSet", "Email", {
	viewType: Terrasoft.ViewTypes.Email
});

Terrasoft.sdk.RecordPage.configureColumn("Lead", "communicationColumnSet", "Website", {
	viewType: Terrasoft.ViewTypes.Url
});

Terrasoft.sdk.RecordPage.configureColumn("Lead", "addressColumnSet", "Address", {
	viewType: Terrasoft.ViewTypes.Map,
	typeConfig: {
		searchColumns: ["Address", "City", "Region", "Country"]
	}
});

Terrasoft.sdk.RecordPage.configureColumn("Lead", "secondaryColumnSet", "Commentary", {
	isMultiline: true
});

Terrasoft.sdk.GridPage.addColumns("Lead", ["Account", "Contact", "LeadType"]);

Terrasoft.sdk.RecordPage.setPreviewPageTitleConvertFunction("Lead",
	function(values) {
		var account = values.Account;
		var contact = values.Contact;
		var leadName = !Ext.isEmpty(account) ? account : "";
		leadName += (!Ext.isEmpty(leadName) && !Ext.isEmpty(contact)) ? ", " : "";
		leadName += !Ext.isEmpty(contact) ? contact : "";
		return leadName;
	}
);

Terrasoft.sdk.GridPage.setSearchColumn("Lead", "LeadName");

Terrasoft.sdk.GridPage.setOrderByColumns("Lead", {
	column: "LeadName",
	orderType: Terrasoft.OrderTypes.ASC
});

Terrasoft.sdk.Actions.add("Lead", {
	name: "Meeting",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionMeeting",
	title: "LeadActionMeetingTitle",
	defineTitle: function() {
		return null;
	},
	modelName: "Activity",
	sourceModelColumnNames: ["Id"],
	destinationModelColumnNames: ["Lead"],
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
			value: "f51c4643-58e6-df11-971b-001d60e938c6"
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
	]
});

Terrasoft.sdk.Actions.remove("Lead", "Terrasoft.ActionCopy");

if (Terrasoft.SysSettingsValue.getBooleanValue("UseMobileUIV2")) {
	Terrasoft.sdk.Actions.setOrder("Lead", {
		"Meeting": 0,
		"Terrasoft.ActionDelete": 1
	});
} else {
	Terrasoft.sdk.Actions.add("Lead", {
		name: "Phone",
		isVisibleInGrid: true,
		actionClassName: "Terrasoft.ActionPhone",
		title: "Sys.Action.Phone.Caption",
		columns: ["BusinesPhone", "Fax", "MobilePhone"],
		model: "Lead"
	});

	Terrasoft.sdk.Actions.add("Lead", {
		name: "Email",
		isVisibleInGrid: true,
		actionClassName: "Terrasoft.ActionEmail",
		title: "Sys.Action.Email.Caption",
		columns: ["Email"],
		model: "Lead"
	});

	Terrasoft.sdk.Actions.setOrder("Lead", {
		"Phone": 0,
		"Email": 1,
		"Meeting": 2,
		"Terrasoft.ActionDelete": 3
	});
}


