define("SysPackageSchemaDataColumn", ["terrasoft", "ext-base", "SysPackageSchemaDataColumnResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysPackageSchemaDataColumn", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysPackageSchemaDataColumn",
			singleton: true,
			uId: "f40856c3-7dc4-4976-b674-e7f186b14b00",
			name: "SysPackageSchemaDataColumn",
			caption: resources.localizableStrings.SysPackageSchemaDataColumnCaption,
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				SysPackageSchemaData: {
					uId: "56258f1c-ce30-4624-a266-79672fbdeab1",
					name: "SysPackageSchemaData",
					caption: resources.localizableStrings.SysPackageSchemaDataCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysPackageSchemaData",
					referenceSchema: {
						name: "SysPackageSchemaData",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				PackageSchemaColumnUId: {
					uId: "041e1631-7ef2-40bd-ab9b-736d2265060f",
					name: "PackageSchemaColumnUId",
					caption: resources.localizableStrings.PackageSchemaColumnUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsForceUpdate: {
					uId: "5259213e-18d0-4855-8126-94d0d6384c2e",
					name: "IsForceUpdate",
					caption: resources.localizableStrings.IsForceUpdateCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsKey: {
					uId: "b92f1b4e-319d-4d63-b4fd-bb2f326dd17d",
					name: "IsKey",
					caption: resources.localizableStrings.IsKeyCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				ColumnName: {
					uId: "e387a65e-7daf-434d-ad66-c23712a1aa6e",
					name: "ColumnName",
					caption: resources.localizableStrings.ColumnNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DataValueTypeUId: {
					uId: "2e31d2fa-cf72-4f3b-9ecb-a2538c992a00",
					name: "DataValueTypeUId",
					caption: resources.localizableStrings.DataValueTypeUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysPackageSchemaDataColumn;
	});