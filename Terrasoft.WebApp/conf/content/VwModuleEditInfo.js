define("VwModuleEditInfo", ["terrasoft", "ext-base", "VwModuleEditInfoResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwModuleEditInfo", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwModuleEditInfo",
			singleton: true,
			uId: "4f23352c-e046-4fb8-b637-885559863856",
			name: "VwModuleEditInfo",
			caption: resources.localizableStrings.VwModuleEditInfoCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			columns: {
				Id: {
					uId: "0882e7f4-1085-44ae-9965-de23bbdcfd2b",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ModuleCode: {
					uId: "8659b4a3-5d9e-4ada-b0e0-dccfc1651cc3",
					name: "ModuleCode",
					caption: resources.localizableStrings.ModuleCodeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				TypeColumnValue: {
					uId: "6fa45ba1-8ee1-4ef4-ada3-1543e25bfaa4",
					name: "TypeColumnValue",
					caption: resources.localizableStrings.TypeColumnValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Name: {
					uId: "e9893dd0-1b12-472f-a376-d05b5819bbe8",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Position: {
					uId: "fb70c81c-8174-4b2e-96f3-8df1e8d77b15",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				WorkspaceId: {
					uId: "b275afd8-5088-4ed6-9662-d1446c623918",
					name: "WorkspaceId",
					caption: resources.localizableStrings.WorkspaceIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RecordId: {
					uId: "5895f30b-5a47-4f05-8f79-115c3ec02289",
					name: "RecordId",
					caption: resources.localizableStrings.RecordIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActionKindCaptionLczId: {
					uId: "e1e9611c-2577-42c1-ada9-c0774b0870b0",
					name: "ActionKindCaptionLczId",
					caption: resources.localizableStrings.ActionKindCaptionLczIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PageCaptionLczId: {
					uId: "af4eea3a-6b29-4660-b210-5741aa0b432c",
					name: "PageCaptionLczId",
					caption: resources.localizableStrings.PageCaptionLczIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CultureId: {
					uId: "0200b64c-bd50-430d-91c6-7d8b5d68812c",
					name: "CultureId",
					caption: resources.localizableStrings.CultureIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PageCaptionLcz: {
					uId: "71f4df89-250e-4d61-a538-edf9301ef880",
					name: "PageCaptionLcz",
					caption: resources.localizableStrings.PageCaptionLczCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				PageCaptionLczOld: {
					uId: "98bc6c48-5298-493b-b45e-bcb328910139",
					name: "PageCaptionLczOld",
					caption: resources.localizableStrings.PageCaptionLczOldCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DefaultPageCaption: {
					uId: "9b876e95-b332-45ff-8153-b3e41d8932e9",
					name: "DefaultPageCaption",
					caption: resources.localizableStrings.DefaultPageCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ModifiedOn: {
					uId: "61e2b1cd-456e-4725-82d5-f074ef3912b4",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwModuleEditInfo;
	});