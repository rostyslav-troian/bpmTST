define("VwSysModuleEdit", ["terrasoft", "ext-base", "VwSysModuleEditResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSysModuleEdit", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSysModuleEdit",
			singleton: true,
			uId: "af1d238e-f551-4878-b4c3-d52aa8495adb",
			name: "VwSysModuleEdit",
			caption: resources.localizableStrings.VwSysModuleEditCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "PageCaption",
			columns: {
				Id: {
					uId: "ae0e45ca-c495-4fe7-a39d-3ab7278e1617",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				CreatedOn: {
					uId: "e80190a5-03b2-4095-90f7-a193a960adee",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				CreatedBy: {
					uId: "ebf6bb93-8aa6-4a01-900d-c6ea67affe21",
					name: "CreatedBy",
					caption: resources.localizableStrings.CreatedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				ModifiedOn: {
					uId: "9928edec-4272-425a-93bb-48743fee4b04",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				ModifiedBy: {
					uId: "3015559e-cbc6-406a-88af-07f7930be832",
					name: "ModifiedBy",
					caption: resources.localizableStrings.ModifiedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				SysModuleEntity: {
					uId: "f7b189f1-06c6-4b54-bb04-eaf91625177f",
					name: "SysModuleEntity",
					caption: resources.localizableStrings.SysModuleEntityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysModuleEntity",
					referenceSchema: {
						name: "SysModuleEntity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				TypeColumnValue: {
					uId: "56c33b79-2d9a-4b49-adb4-79df03d178e9",
					name: "TypeColumnValue",
					caption: resources.localizableStrings.TypeColumnValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				UseModuleDetails: {
					uId: "c53035ba-426a-4b98-a5fa-2d2966b2c908",
					name: "UseModuleDetails",
					caption: resources.localizableStrings.UseModuleDetailsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				Position: {
					uId: "ca35057b-1338-4316-9d6f-8c35f98f5db5",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Caption: {
					uId: "011f15ec-018b-488c-8c6f-99158f82b08a",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				HelpContextId: {
					uId: "a90e57e9-5e2c-40e8-80e2-3ac8b48f9619",
					name: "HelpContextId",
					caption: resources.localizableStrings.HelpContextIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				SysPageSchemaUId: {
					uId: "ae683a77-0faf-4743-a1c2-abadf29f6e98",
					name: "SysPageSchemaUId",
					caption: resources.localizableStrings.SysPageSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysWorkspace: {
					uId: "cab746bc-e566-4366-a425-c2b643e628f9",
					name: "SysWorkspace",
					caption: resources.localizableStrings.SysWorkspaceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysWorkspace",
					referenceSchema: {
						name: "SysWorkspace",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CardSchemaUId: {
					uId: "fcd5ccc3-2a7a-4a9d-b8b8-e78f76efe747",
					name: "CardSchemaUId",
					caption: resources.localizableStrings.CardSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				ActionKindCaption: {
					uId: "a19bf4bf-e22b-49b5-b6e0-918ff6290020",
					name: "ActionKindCaption",
					caption: resources.localizableStrings.ActionKindCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				ActionKindName: {
					uId: "f14f9a76-5ad3-47f9-b175-b7648b7bd340",
					name: "ActionKindName",
					caption: resources.localizableStrings.ActionKindNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				PageCaption: {
					uId: "55132174-2b96-4e0a-830c-b8e952b12c45",
					name: "PageCaption",
					caption: resources.localizableStrings.PageCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				MiniPageSchemaUId: {
					uId: "350ddc16-b017-4661-ae25-33482662a8d2",
					name: "MiniPageSchemaUId",
					caption: resources.localizableStrings.MiniPageSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SearchRowSchemaUId: {
					uId: "9cf420d8-04d4-4c81-ac33-8d00dc0704b9",
					name: "SearchRowSchemaUId",
					caption: resources.localizableStrings.SearchRowSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				MiniPageModes: {
					uId: "a4fcaa97-6bfa-4e5e-a130-6a9515254107",
					name: "MiniPageModes",
					caption: resources.localizableStrings.MiniPageModesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 50
				}
			}
		});
		return Terrasoft.VwSysModuleEdit;
	});