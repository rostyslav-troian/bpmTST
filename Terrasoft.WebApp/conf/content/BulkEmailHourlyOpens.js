define("BulkEmailHourlyOpens", ["terrasoft", "ext-base", "BulkEmailHourlyOpensResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailHourlyOpens", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailHourlyOpens",
			singleton: true,
			uId: "c6966308-17ab-4579-95fd-7db936d0e6c5",
			name: "BulkEmailHourlyOpens",
			caption: resources.localizableStrings.BulkEmailHourlyOpensCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "BulkEmailId",
			columns: {
				BulkEmailId: {
					uId: "790bce2d-3665-4c0a-b730-584a306bf11b",
					name: "BulkEmailId",
					caption: resources.localizableStrings.BulkEmailIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				DateMark: {
					uId: "fee14750-bc54-431b-9953-906fa1b6681d",
					name: "DateMark",
					caption: resources.localizableStrings.DateMarkCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EventsCount: {
					uId: "66124707-7e24-41ff-95a5-e25bb2a950b4",
					name: "EventsCount",
					caption: resources.localizableStrings.EventsCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.BulkEmailHourlyOpens;
	});