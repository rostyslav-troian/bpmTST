define("DCRecipientOp", ["terrasoft", "ext-base", "DCRecipientOpResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.DCRecipientOp", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.DCRecipientOp",
			singleton: true,
			uId: "0da6b6d7-362d-4135-a5d9-7a7884ca328b",
			name: "DCRecipientOp",
			caption: resources.localizableStrings.DCRecipientOpCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "fad90b97-1ecf-4ad6-ab7d-a015c610cc80",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				EntityId: {
					uId: "0271e50d-07a0-4739-9048-02b00541f2d7",
					name: "EntityId",
					caption: resources.localizableStrings.EntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				GroupIndex: {
					uId: "2fc35ef9-598b-4ecb-8044-1634f1ee6b89",
					name: "GroupIndex",
					caption: resources.localizableStrings.GroupIndexCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				BlockIndex: {
					uId: "c3ff036e-fe55-40cf-a601-3846630e8472",
					name: "BlockIndex",
					caption: resources.localizableStrings.BlockIndexCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedOn: {
					uId: "ff5c7938-0b69-41c1-9f48-12e2f2845432",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				SessionId: {
					uId: "9b0e1c58-6390-4d11-adb2-9ec34dbce770",
					name: "SessionId",
					caption: resources.localizableStrings.SessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.DCRecipientOp;
	});