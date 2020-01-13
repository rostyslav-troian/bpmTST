define("VwSectionDesignerModuleInfo", ["terrasoft", "ext-base", "VwSectionDesignerModuleInfoResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSectionDesignerModuleInfo", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSectionDesignerModuleInfo",
			singleton: true,
			uId: "ad7b6c75-aaf9-4ff6-8ca8-03237a2a159c",
			name: "VwSectionDesignerModuleInfo",
			caption: resources.localizableStrings.VwSectionDesignerModuleInfoCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Code",
			columns: {
				Id: {
					uId: "59a1c101-5401-46bd-9e13-4d1e88dd48e5",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Code: {
					uId: "a545fe2f-27b0-4265-8d2d-476106d1c23d",
					name: "Code",
					caption: resources.localizableStrings.CodeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				WorkspaceId: {
					uId: "b70760e9-4339-4a29-8575-eaa72442771b",
					name: "WorkspaceId",
					caption: resources.localizableStrings.WorkspaceIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				WorkspaceName: {
					uId: "0c5c6c49-8b76-4aea-8c6a-f66358d47e18",
					name: "WorkspaceName",
					caption: resources.localizableStrings.WorkspaceNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				EntityId: {
					uId: "4a51ac48-8b52-4b1c-ae0c-1a5e97bf7cab",
					name: "EntityId",
					caption: resources.localizableStrings.EntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityName: {
					uId: "a0cc89ae-1f50-4f95-b69e-1f09f9d23278",
					name: "EntityName",
					caption: resources.localizableStrings.EntityNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SectionSchemaId: {
					uId: "a52b1710-b24c-41f6-b994-29c48c13e6a3",
					name: "SectionSchemaId",
					caption: resources.localizableStrings.SectionSchemaIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SectionSchemaName: {
					uId: "cd1d1076-fb22-453f-91f7-556030c96db3",
					name: "SectionSchemaName",
					caption: resources.localizableStrings.SectionSchemaNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				EntityFolderId: {
					uId: "3a969e87-3824-47b8-a8aa-3341191d632c",
					name: "EntityFolderId",
					caption: resources.localizableStrings.EntityFolderIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityFolderName: {
					uId: "a7622b91-eef7-40fe-b27e-c58f5d0564fa",
					name: "EntityFolderName",
					caption: resources.localizableStrings.EntityFolderNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				EntityInFolderId: {
					uId: "93ee0bee-7aa2-41e1-93b8-4dc55f16fe77",
					name: "EntityInFolderId",
					caption: resources.localizableStrings.EntityInFolderIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityInFolderName: {
					uId: "67834ea3-10ac-4e30-99cf-ced63d45b61d",
					name: "EntityInFolderName",
					caption: resources.localizableStrings.EntityInFolderNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				TypeColumnId: {
					uId: "5e4685c9-ec9d-496e-b305-e69be6f64e73",
					name: "TypeColumnId",
					caption: resources.localizableStrings.TypeColumnIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Caption: {
					uId: "af7d2a74-11bf-43bc-8bef-db1dac483353",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Header: {
					uId: "f2fb0d55-f54f-4bca-a1c7-815d8ecce6bf",
					name: "Header",
					caption: resources.localizableStrings.HeaderCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SysModuleEntityId: {
					uId: "14368a2e-840b-4adb-acde-8793a61ce775",
					name: "SysModuleEntityId",
					caption: resources.localizableStrings.SysModuleEntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysModuleCaptionLczId: {
					uId: "52f056e8-3d49-4ade-82e9-fd5e323bd0e4",
					name: "SysModuleCaptionLczId",
					caption: resources.localizableStrings.SysModuleCaptionLczIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysModuleHeaderLczId: {
					uId: "66973885-d226-4d6b-989b-4e8258ef9962",
					name: "SysModuleHeaderLczId",
					caption: resources.localizableStrings.SysModuleHeaderLczIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CultureId: {
					uId: "aef65b46-2cb4-4c29-bb31-8d4ae62b2976",
					name: "CultureId",
					caption: resources.localizableStrings.CultureIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Image32Id: {
					uId: "da14f2df-00dd-43d3-89d8-b246f4d13044",
					name: "Image32Id",
					caption: resources.localizableStrings.Image32IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SectionDetailId: {
					uId: "4d53f4ba-835f-4217-a09b-064b91fb4fb1",
					name: "SectionDetailId",
					caption: resources.localizableStrings.SectionDetailIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SectionDetailName: {
					uId: "fa66f065-207f-4ed7-9582-867fdd234e69",
					name: "SectionDetailName",
					caption: resources.localizableStrings.SectionDetailNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				LogoId: {
					uId: "bb55fbab-73aa-4276-8277-7a5a76e0e0ce",
					name: "LogoId",
					caption: resources.localizableStrings.LogoIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityTagId: {
					uId: "00ffcb6a-e106-4a4b-b13c-8ab24192b94b",
					name: "EntityTagId",
					caption: resources.localizableStrings.EntityTagIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityTagName: {
					uId: "6420a3c6-ecd5-4ec8-86af-581ebcdc9070",
					name: "EntityTagName",
					caption: resources.localizableStrings.EntityTagNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				EntityInTagId: {
					uId: "6a7c43be-5d00-4cb9-9132-69c24c20d13f",
					name: "EntityInTagId",
					caption: resources.localizableStrings.EntityInTagIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntityInTagName: {
					uId: "f7fbdf0d-f39e-4616-b661-f3a98e238b9f",
					name: "EntityInTagName",
					caption: resources.localizableStrings.EntityInTagNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				CaptionOld: {
					uId: "fd344ebc-1612-4a21-ab54-40fb85942852",
					name: "CaptionOld",
					caption: resources.localizableStrings.CaptionOldCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				HeaderOld: {
					uId: "2d41491a-38c7-4b40-b894-0ba0e88df1e7",
					name: "HeaderOld",
					caption: resources.localizableStrings.HeaderOldCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DefaultCaption: {
					uId: "e4432b07-7efa-4ac4-ba14-c6cd040bc29a",
					name: "DefaultCaption",
					caption: resources.localizableStrings.DefaultCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DefaultHeader: {
					uId: "8923828d-59c9-4961-b0b2-59dff2ac93fb",
					name: "DefaultHeader",
					caption: resources.localizableStrings.DefaultHeaderCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				}
			}
		});
		return Terrasoft.VwSectionDesignerModuleInfo;
	});