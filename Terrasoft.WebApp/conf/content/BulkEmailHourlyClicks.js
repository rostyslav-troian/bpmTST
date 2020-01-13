define("BulkEmailHourlyClicks", ["terrasoft", "ext-base", "BulkEmailHourlyClicksResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailHourlyClicks", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailHourlyClicks",
			singleton: true,
			uId: "cba8f5af-c2cb-40e7-8ba0-024ab1a4d327",
			name: "BulkEmailHourlyClicks",
			caption: resources.localizableStrings.BulkEmailHourlyClicksCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "BulkEmailId",
			columns: {
				BulkEmailId: {
					uId: "21816c6d-9251-4843-91da-e84464ba552c",
					name: "BulkEmailId",
					caption: resources.localizableStrings.BulkEmailIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				DateMark: {
					uId: "773b2a1c-fa2f-44ce-9439-c35a27e9e18c",
					name: "DateMark",
					caption: resources.localizableStrings.DateMarkCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EventsCount: {
					uId: "e46f46e2-0bc1-43f6-8151-b02ff1e3da51",
					name: "EventsCount",
					caption: resources.localizableStrings.EventsCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.BulkEmailHourlyClicks;
	});