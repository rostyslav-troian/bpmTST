define("VwLastActivityByQueue", ["terrasoft", "ext-base", "VwLastActivityByQueueResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwLastActivityByQueue", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwLastActivityByQueue",
			singleton: true,
			uId: "ce66001d-bc56-490b-af77-c72b17362148",
			name: "VwLastActivityByQueue",
			caption: resources.localizableStrings.VwLastActivityByQueueCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "76d60c1c-d6ad-4cc3-947a-a3aa95ebc5e4",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Activity: {
					uId: "9138b068-e0ae-4301-a68b-b65f541196a2",
					name: "Activity",
					caption: resources.localizableStrings.ActivityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Activity",
					referenceSchema: {
						name: "Activity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title",
						primaryOrderColumnName: "StartDate"
					}
				},
				QueueItem: {
					uId: "856864eb-3844-4f76-8dfe-0e3e7602f881",
					name: "QueueItem",
					caption: resources.localizableStrings.QueueItemCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "QueueItem",
					referenceSchema: {
						name: "QueueItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				}
			}
		});
		return Terrasoft.VwLastActivityByQueue;
	});