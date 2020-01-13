define("BulkEmailInProgress", ["terrasoft", "ext-base", "BulkEmailInProgressResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailInProgress", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailInProgress",
			singleton: true,
			uId: "ab8ddf21-3930-472b-8724-d2b2bf8f8257",
			name: "BulkEmailInProgress",
			caption: resources.localizableStrings.BulkEmailInProgressCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "SessionId",
			columns: {
				SessionId: {
					uId: "f1f3a9b2-666b-4cb3-8331-d163079c0b62",
					name: "SessionId",
					caption: resources.localizableStrings.SessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true
				},
				BulkEmailId: {
					uId: "c812ddcd-8e0e-4db3-ac44-94f97402eb9d",
					name: "BulkEmailId",
					caption: resources.localizableStrings.BulkEmailIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				CreatedOn: {
					uId: "c4499e57-3833-472c-b6ea-9b481dc68a75",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				}
			}
		});
		return Terrasoft.BulkEmailInProgress;
	});