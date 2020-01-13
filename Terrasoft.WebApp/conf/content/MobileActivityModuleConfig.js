Terrasoft.configuration.Structures["MobileActivityModuleConfig"] = {innerHierarchyStack: ["MobileActivityModuleConfig"]};
Terrasoft.sdk.RecordPage.setTitle("Activity", "create", "ActivityEditPageNewActivityTitle");

Terrasoft.sdk.RecordPage.configureColumn("Activity", "primaryColumnSet", "Title", {
	isMultiline: true
});

Terrasoft.sdk.RecordPage.configureColumn("Activity", "statusColumnSet", "DetailedResult", {
	isMultiline: true
});

Terrasoft.sdk.RecordPage.addColumn("Activity", {
	name: "ShowInScheduler",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.addColumn("Activity", {
	name: "ProcessElementId",
	hidden: true
});

Terrasoft.sdk.RecordPage.addColumn("Activity", {
	name: "Type",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.addColumn("Activity", {
	name: "AllowedResult",
	readOnly: true,
	disabled: true,
	hidden: true
}, "primaryColumnSet");

Terrasoft.sdk.RecordPage.configureColumn("Activity", "relationsColumnSet", "Account", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.RecordPage.configureColumn("Activity", "relationsColumnSet", "Contact", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.RecordPage.configureColumn("Activity", "ActivityParticipantDetailV2EmbeddedDetail", "Participant", {
	viewType: Terrasoft.ViewTypes.Preview
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Activity", "ActivityParticipantDetailV2EmbeddedDetail", {
	title: "ActivityRecordPageParticipantsDetailTitle",
	imageConfig: {
		column: "Participant.Photo",
		imageDataColumnName: "PreviewData",
		imageDisplayColumnName: "Name",
		defaultImageId: "MobileImageListDefaultContactPhotoEdit"
	},
	alwaysShowTitle: true,
	displaySeparator: true
});

Terrasoft.sdk.RecordPage.configureColumn("Activity", "ActivityParticipantDetailV2EmbeddedDetail", "Participant", {
	customPreviewConfig: {
		component: {
			label: null,
			cls: "x-field-without-label"
		}
	},
	customEditConfig: {
		label: null,
		cls: "x-field-without-label"
	},
	label: {
		pickerTitle: "ActivityRecordPageParticipantsDetailTitle"
	}
});

Terrasoft.sdk.RecordPage.addQueryConfigColumns("Activity", ["Role", "Participant.Photo.PreviewData"],
	"ActivityParticipantDetailV2EmbeddedDetail");

Terrasoft.sdk.GridPage.addColumns("Activity", ["Status.Finish", "Owner", "Contact", "ShowInScheduler", "Type", "Status",
	"AllowedResult", "ActivityCategory", "ProcessElementId", "DueDate", "StartDate", "Account", "Priority"]);

Terrasoft.sdk.GridPage.configureSubtitleColumn("Activity", "StartDate", {
	convertFunction: function(values) {
		var format = Terrasoft.Date.getDateTimeFormat();
		var startDate = Ext.Date.parse(values.StartDate, format);
		var dueDate = Ext.Date.parse(values.DueDate, format);
		if (Terrasoft.util.compareDate(startDate, dueDate)) {
			return Ext.Date.format(startDate, format) + " - " + Ext.Date.format(dueDate,
				Terrasoft.Date.getTimeFormat());
		} else {
			return Ext.Date.format(startDate, format) + " - " + Ext.Date.format(dueDate, format);
		}
	}
});

Terrasoft.sdk.GridPage.setOrderByColumns("Activity", [{
	column: "StartDate",
	orderType: Terrasoft.OrderTypes.ASC
}]);

Terrasoft.sdk.Module.addFilter("Activity", Ext.create("Terrasoft.Filter", {
	compareType: Terrasoft.ComparisonTypes.NotEqual,
	property: "Type",
	value: Terrasoft.GUID.ActivityTypeEmail
}));

Terrasoft.sdk.Actions.configure("Activity", "Terrasoft.ActionCopy", {
	isVisibleInGrid: true,
	isDisplayTitle: true
});

Terrasoft.sdk.GridPage.setAdditionalFilterModule("Activity", {
	type: Terrasoft.FilterModuleTypes.Period,
	name: "ActivityPeriodFilter",
	startDateColumnName: "StartDate",
	endDateColumnName: "DueDate",
	isVisibleInDetail: false
});

Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Activity", "ActivityParticipantDetailV2EmbeddedDetail", {
	pagingConfig: {
		top: 5
	}
});


