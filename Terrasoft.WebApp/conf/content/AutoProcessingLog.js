define("AutoProcessingLog", ["terrasoft", "ext-base", "AutoProcessingLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.AutoProcessingLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.AutoProcessingLog",
			singleton: true,
			uId: "43f3ceca-feda-43a9-8f80-35f5bbad1c05",
			name: "AutoProcessingLog",
			caption: resources.localizableStrings.AutoProcessingLogCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "fd12fdff-1572-4128-b363-96157ec268fd",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Message: {
					uId: "c36736b0-e428-47fb-a133-6141cdc76597",
					name: "Message",
					caption: resources.localizableStrings.MessageCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ProcessingType: {
					uId: "9fa7c216-b224-46b2-ad51-82f2c204da8f",
					name: "ProcessingType",
					caption: resources.localizableStrings.ProcessingTypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ProcessingDate: {
					uId: "cdb4b4fa-cba8-48fa-9050-05ee3d5beef0",
					name: "ProcessingDate",
					caption: resources.localizableStrings.ProcessingDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.AutoProcessingLog;
	});