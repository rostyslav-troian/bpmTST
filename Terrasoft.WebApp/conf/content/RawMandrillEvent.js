define("RawMandrillEvent", ["terrasoft", "ext-base", "RawMandrillEventResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.RawMandrillEvent", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.RawMandrillEvent",
			singleton: true,
			uId: "0806fb23-ad70-4e20-86cc-f48306bf4bcc",
			name: "RawMandrillEvent",
			caption: resources.localizableStrings.RawMandrillEventCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "f271f2ab-e555-4ca7-b2a6-2afba1c7425a",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				JsonData: {
					uId: "e05e8c5a-ccee-466c-9970-cffee53d9667",
					name: "JsonData",
					caption: resources.localizableStrings.JsonDataCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.RawMandrillEvent;
	});