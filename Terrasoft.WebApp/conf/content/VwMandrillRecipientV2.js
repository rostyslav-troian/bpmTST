define("VwMandrillRecipientV2", ["terrasoft", "ext-base", "VwMandrillRecipientV2Resources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwMandrillRecipientV2", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwMandrillRecipientV2",
			singleton: true,
			uId: "aae86796-66f6-4430-9099-26c3b8e8ff8a",
			name: "VwMandrillRecipientV2",
			caption: resources.localizableStrings.VwMandrillRecipientV2Caption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				BulkEmail: {
					uId: "2a2d4805-f09a-4959-910d-56a95602efff",
					name: "BulkEmail",
					caption: resources.localizableStrings.BulkEmailCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "BulkEmail",
					referenceSchema: {
						name: "BulkEmail",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Contact: {
					uId: "02d6c691-72a6-494d-97f7-c43c7abb2b5c",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Id: {
					uId: "d78e81c1-a5b0-4d73-90d1-57eecfcb2fe3",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				}
			}
		});
		return Terrasoft.VwMandrillRecipientV2;
	});