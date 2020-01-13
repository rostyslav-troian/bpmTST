define("RawWebHooks", ["terrasoft", "ext-base", "RawWebHooksResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.RawWebHooks", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.RawWebHooks",
			singleton: true,
			uId: "cc25f38e-a08b-41eb-95a9-57c6acbee09b",
			name: "RawWebHooks",
			caption: resources.localizableStrings.RawWebHooksCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "1159d54c-8b38-485c-b956-6338af9a1cd6",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				JsonData: {
					uId: "37a2ab22-0f14-4561-bd10-7233260dd44c",
					name: "JsonData",
					caption: resources.localizableStrings.JsonDataCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Failed: {
					uId: "045d0116-1d9b-4c2e-b60e-4a1e86c22d87",
					name: "Failed",
					caption: resources.localizableStrings.FailedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				Type: {
					uId: "bf271238-15f0-4f48-8ab5-7883fb44ae5f",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				}
			}
		});
		return Terrasoft.RawWebHooks;
	});