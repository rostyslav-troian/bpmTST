define("DuplicatesSearchParameter", ["terrasoft", "ext-base", "DuplicatesSearchParameterResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.DuplicatesSearchParameter", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.DuplicatesSearchParameter",
			singleton: true,
			uId: "01bff6c2-1ae4-4430-ba9f-1f77bade9c3a",
			name: "DuplicatesSearchParameter",
			caption: resources.localizableStrings.DuplicatesSearchParameterCaption,
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
				PerformSearchOnSave: {
					uId: "ed4d38f1-8201-4d23-8fdc-02b52528cf6c",
					name: "PerformSearchOnSave",
					caption: resources.localizableStrings.PerformSearchOnSaveCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PerformSheduledSearch: {
					uId: "ffd92a9f-638d-4ebf-87ac-13491fc06b6b",
					name: "PerformSheduledSearch",
					caption: resources.localizableStrings.PerformSheduledSearchCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SearchTime: {
					uId: "1c6bfa4f-0ac6-4408-b832-ea48841f7989",
					name: "SearchTime",
					caption: resources.localizableStrings.SearchTimeCaption,
					dataValueType: Terrasoft.DataValueType.TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SearchByModifiedOnly: {
					uId: "c4bd8f7c-c3be-4e95-a605-454497caf252",
					name: "SearchByModifiedOnly",
					caption: resources.localizableStrings.SearchByModifiedOnlyCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SearchByAll: {
					uId: "6a56afbb-1647-403c-ba34-9e208c491d87",
					name: "SearchByAll",
					caption: resources.localizableStrings.SearchByAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Days: {
					uId: "f9f0e6eb-dd6e-4894-af0e-f6654c51fbb0",
					name: "Days",
					caption: resources.localizableStrings.DaysCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SchemaToSearch: {
					uId: "f304f0b5-31de-4d89-b3bc-e7b617e264eb",
					name: "SchemaToSearch",
					caption: resources.localizableStrings.SchemaToSearchCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
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
				SchemaToSearchName: {
					uId: "9e03ae6d-244b-4439-98cc-01c71eb220a0",
					name: "SchemaToSearchName",
					caption: resources.localizableStrings.SchemaToSearchNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				}
			}
		});
		return Terrasoft.DuplicatesSearchParameter;
	});