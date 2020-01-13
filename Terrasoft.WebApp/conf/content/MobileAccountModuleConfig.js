Terrasoft.configuration.Structures["MobileAccountModuleConfig"] = {innerHierarchyStack: ["MobileAccountModuleConfig"]};
Terrasoft.sdk.RecordPage.setTitle("Account", "create", "AccountEditPage_navigationPanel_title_create");

Terrasoft.sdk.GridPage.addColumns("Account", ["GPSN", "GPSE", "Address"]);

Terrasoft.sdk.RecordPage.configureColumn("Account", "primaryColumnSet", "Name", {
	isMultiline: true
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "primaryColumnSet", "PrimaryContact", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.GridPage.setOrderByColumns("Account",	{
	column: "Name",
	orderType: Terrasoft.OrderTypes.ASC
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Account", "AccountCommunicationDetailEmbeddedDetail", {
	title: "AccountRecordPage_accountCommunicationsDetail_title",
	displaySeparator: false,
	orderByColumns: [
		{
			column: "CommunicationType",
			orderType: Terrasoft.OrderTypes.ASC
		}
	],
	isCollapsed: false,
	hideTitle: true,
	previewConfig: {
		valueColumn: "Number",
		label: {
			column: "CommunicationType"
		}
	},
	isInPlaceEditingMode: true
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "AccountCommunicationDetailEmbeddedDetail", "CommunicationType", {
	useAsLabel: true,
	label: {
		emptyText: "AccountRecordPage_accountCommunicationsDetail_CommunicationType_emptyText",
		pickerTitle: "AccountRecordPage_accountCommunicationsDetail_CommunicationType_label"
	}
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "AccountCommunicationDetailEmbeddedDetail", "Number", {
	hideLabel: true,
	viewType: {
		typeColumn: "CommunicationType"
	},
	placeHolder: "AccountRecordPage_accountCommunicationsDetail_Number_placeHolder"
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Account", "AccountAddressDetailV2EmbeddedDetail", {
	title: "AccountRecordPage_accountAddressesDetail_title",
	displaySeparator: true,
	orderByColumns: [
		{
			column: "Primary",
			orderType: Terrasoft.OrderTypes.DESC
		}
	],
	previewConfig: Terrasoft.Configuration.util.getAddressEmbeddedDetailPreviewConfig(),
	isInPlaceEditingMode: true,
	hideTitle: true
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "AccountAddressDetailV2EmbeddedDetail", "Address", {
	viewType: Terrasoft.ViewTypes.Map,
	typeConfig: {
		searchColumns: ["Address", "City", "Region", "Country"]
	},
	isMultiline: true
});

Terrasoft.sdk.RecordPage.addColumn("Account", {
	name: "Primary",
	hidden: true
}, "AccountAddressDetailV2EmbeddedDetail");

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Account", "AccountAnniversaryDetailV2EmbeddedDetail", {
	title: "AccountRecordPage_accountAnniversariesDetail_title",
	orderByColumns: [
		{
			column: "Date",
			orderType: Terrasoft.OrderTypes.ASC
		}
	],
	displaySeparator: false,
	previewConfig: {
		valueColumn: "Date",
		label: {
			column: "AnniversaryType"
		}
	},
	isInPlaceEditingMode: true
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "AccountAnniversaryDetailV2EmbeddedDetail", "AnniversaryType", {
	useAsLabel: true,
	label: {
		emptyText: "AccountRecordPage_accountAnniversariesDetail_AnniversaryType_emptyText",
		pickerTitle: "AccountRecordPage_accountAnniversariesDetail_AnniversaryType_label"
	}
});

Terrasoft.sdk.RecordPage.configureColumn("Account", "AccountAnniversaryDetailV2EmbeddedDetail", "Date", {
	hideLabel: true,
	viewType: {
		typeColumn: "AnniversaryType"
	},
	placeHolder: "AccountRecordPage_accountAnniversariesDetail_Date_placeHolder"
});

Terrasoft.sdk.Actions.add("Account", {
	name: "Meeting",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionMeeting",
	title: "AccountActionMeeting_title",
	defineTitle: function() {
		return null;
	},
	modelName: "Activity",
	sourceModelColumnNames: ["Id"],
	destinationModelColumnNames: ["Account"],
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

if (Terrasoft.SysSettingsValue.getBooleanValue("UseMobileUIV2")) {
	Terrasoft.sdk.Actions.add("Account", {
		name: "addAccountCommunication",
		type: "addEmbeddedDetailRecord",
		title: "AccountRecordPageActionAddContactCommunicationCaption",
		detailName: "AccountCommunicationDetailEmbeddedDetail",
		iconCls: Terrasoft.ActionIcons.Communication,
		isQuickAction: true,
		useMask: false
	});

	Terrasoft.sdk.Actions.add("Account", {
		name: "addAccountAddress",
		type: "addEmbeddedDetailRecord",
		title: "AccountRecordPageActionAddAddressCaption",
		detailName: "AccountAddressDetailV2EmbeddedDetail",
		iconCls: Terrasoft.ActionIcons.Address,
		isQuickAction: true,
		useMask: false
	});

	Terrasoft.sdk.Actions.add("Account", {
		name: "addAccountAnniversary",
		type: "addEmbeddedDetailRecord",
		title: "AccountRecordPageActionAddAnniversaryCaption",
		detailName: "AccountAnniversaryDetailV2EmbeddedDetail",
		iconCls: Terrasoft.ActionIcons.Activity,
		isQuickAction: true,
		useMask: false
	});

	Terrasoft.sdk.Actions.setOrder("Account", {
		"addAccountCommunication": 0,
		"addAccountAddress": 1,
		"addAccountAnniversary": 2,
		"Meeting": 3,
		"Terrasoft.ActionCopy": 4,
		"Terrasoft.ActionDelete": 5
	});
} else {
	Terrasoft.sdk.Actions.add("Account", {
		name: "Phone",
		isVisibleInGrid: true,
		actionClassName: "Terrasoft.ActionPhone",
		title: "Sys.Action.Phone.Caption",
		labelColumn: "CommunicationType",
		valueColumn: "Number",
		communication: {
			model: "AccountCommunication",
			filterColumn: "Account"
		}
	});

	Terrasoft.sdk.Actions.add("Account", {
		name: "Email",
		isVisibleInGrid: true,
		actionClassName: "Terrasoft.ActionEmail",
		title: "Sys.Action.Email.Caption",
		labelColumn: "CommunicationType",
		valueColumn: "Number",
		communication: {
			model: "AccountCommunication",
			filterColumn: "Account"
		}
	});

	Terrasoft.sdk.Actions.setOrder("Account", {
		"Phone": 0,
		"Email": 1,
		"Meeting": 2,
		"Terrasoft.ActionCopy": 3,
		"Terrasoft.ActionDelete": 4
	});
}

Terrasoft.sdk.Details.configure("Account", "ActivityDetailV2StandartDetail", {
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


