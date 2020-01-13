define("SysModuleEditDetailParentAssc", ["terrasoft", "ext-base", "SysModuleEditDetailParentAsscResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysModuleEditDetailParentAssc", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysModuleEditDetailParentAssc",
			singleton: true,
			uId: "8277c52b-59f5-4b21-bba7-040338617d3a",
			name: "SysModuleEditDetailParentAssc",
			caption: resources.localizableStrings.SysModuleEditDetailParentAsscCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
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
				SysModuleEditDetail: {
					uId: "faf73ea8-732f-4436-9d3f-9857f23a01bd",
					name: "SysModuleEditDetail",
					caption: resources.localizableStrings.SysModuleEditDetailCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysModuleEditDetail",
					referenceSchema: {
						name: "SysModuleEditDetail",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ColumnMetaPath: {
					uId: "6af1be87-97b9-498d-b0c9-441ba18c2b3c",
					name: "ColumnMetaPath",
					caption: resources.localizableStrings.ColumnMetaPathCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ParentColumnMetaPath: {
					uId: "2d213e2b-eb19-409c-8ae7-c4a201450b6d",
					name: "ParentColumnMetaPath",
					caption: resources.localizableStrings.ParentColumnMetaPathCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SysParentAssociationType: {
					uId: "5496a66e-1111-4cac-adeb-1d642f0b7da6",
					name: "SysParentAssociationType",
					caption: resources.localizableStrings.SysParentAssociationTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysParentAssociationType",
					referenceSchema: {
						name: "SysParentAssociationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ColumnCaption: {
					uId: "ee884f22-3946-4845-91ad-194bd1ed0432",
					name: "ColumnCaption",
					caption: resources.localizableStrings.ColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ParentColumnCaption: {
					uId: "d571134c-8c5e-4eec-9c05-6bf253d8311b",
					name: "ParentColumnCaption",
					caption: resources.localizableStrings.ParentColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysModuleEditDetailParentAssc;
	});