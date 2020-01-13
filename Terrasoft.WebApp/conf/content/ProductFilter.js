define("ProductFilter", ["terrasoft", "ext-base", "ProductFilterResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ProductFilter", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ProductFilter",
			singleton: true,
			uId: "1762c40d-54a2-4312-a93a-d3f48c958fcb",
			name: "ProductFilter",
			caption: resources.localizableStrings.ProductFilterCaption,
			administratedByRecords: false,
			administratedByOperations: true,
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
				Position: {
					uId: "bd12ea8e-2bc2-42bf-925a-3ab766cc0b9f",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Name: {
					uId: "7c08467c-87c4-4147-af83-37665a501f97",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				Type: {
					uId: "8bd08717-6b65-4a00-80d9-79635a65686e",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ProductFilterType",
					referenceSchema: {
						name: "ProductFilterType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Specification: {
					uId: "a6202f2a-1d22-43a9-8317-d13d5ef8e23d",
					name: "Specification",
					caption: resources.localizableStrings.SpecificationCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Specification",
					referenceSchema: {
						name: "Specification",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ColumnPath: {
					uId: "1afcdffa-6c83-453b-8a1d-4b4c33e892b5",
					name: "ColumnPath",
					caption: resources.localizableStrings.ColumnPathCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ReferenceSchemaName: {
					uId: "94385fd4-8ada-4588-bddb-54237940630d",
					name: "ReferenceSchemaName",
					caption: resources.localizableStrings.ReferenceSchemaNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ColumnCaption: {
					uId: "8037dbff-8c5b-4098-abac-11f636bae1fe",
					name: "ColumnCaption",
					caption: resources.localizableStrings.ColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ProductType: {
					uId: "16ac06f7-cf6b-4c69-996b-4b10b986c633",
					name: "ProductType",
					caption: resources.localizableStrings.ProductTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ProductType",
					referenceSchema: {
						name: "ProductType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ColumnDataValueType: {
					uId: "04e82d78-89c8-4a9e-b24b-7520f5ec54cf",
					name: "ColumnDataValueType",
					caption: resources.localizableStrings.ColumnDataValueTypeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.ProductFilter;
	});