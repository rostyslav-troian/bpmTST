define("SysModuleReportTable", ["terrasoft", "ext-base", "SysModuleReportTableResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysModuleReportTable", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysModuleReportTable",
			singleton: true,
			uId: "fa05df4e-0361-4496-8198-5aa5b2dbe677",
			name: "SysModuleReportTable",
			caption: resources.localizableStrings.SysModuleReportTableCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
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
				Name: {
					uId: "dcbcf570-397b-4c65-bc5c-ffc91e6cc60a",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				MacrosList: {
					uId: "154371d2-7624-4a1b-8019-e5c202c2260d",
					name: "MacrosList",
					caption: resources.localizableStrings.MacrosListCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				SysModuleReport: {
					uId: "8501dbf4-1603-4e8b-b875-e1d9c8de5e8c",
					name: "SysModuleReport",
					caption: resources.localizableStrings.SysModuleReportCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysModuleReport",
					referenceSchema: {
						name: "SysModuleReport",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ReferenceColumn: {
					uId: "79a3fa68-aef2-4ed5-86d2-5fb4dc4a7ae3",
					name: "ReferenceColumn",
					caption: resources.localizableStrings.ReferenceColumnCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				Caption: {
					uId: "2f560358-9c67-4ddb-8ae8-e9507c0faab9",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Filter: {
					uId: "8f7d36c2-dbbb-4185-865c-ae22c23409f5",
					name: "Filter",
					caption: resources.localizableStrings.FilterCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ObjectId: {
					uId: "2f929142-c949-4965-822b-718d744291fa",
					name: "ObjectId",
					caption: resources.localizableStrings.ObjectIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ObjectColumnPath: {
					uId: "6e37e4a0-1c37-4475-83aa-dd218ff47173",
					name: "ObjectColumnPath",
					caption: resources.localizableStrings.ObjectColumnPathCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ObjectColumnCaption: {
					uId: "7ac8fc3b-9f5f-40d3-8918-3c18bc54cc23",
					name: "ObjectColumnCaption",
					caption: resources.localizableStrings.ObjectColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ReferenceColumnCaption: {
					uId: "1a6de7b4-2b63-4983-989c-e5f5ad91c559",
					name: "ReferenceColumnCaption",
					caption: resources.localizableStrings.ReferenceColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				IsEmptyTableHide: {
					uId: "b368f76c-1279-4700-8914-e821390edfdd",
					name: "IsEmptyTableHide",
					caption: resources.localizableStrings.IsEmptyTableHideCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysModuleReportTable;
	});