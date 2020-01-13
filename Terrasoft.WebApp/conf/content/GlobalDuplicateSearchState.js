define("GlobalDuplicateSearchState", ["terrasoft", "ext-base", "GlobalDuplicateSearchStateResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.GlobalDuplicateSearchState", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.GlobalDuplicateSearchState",
			singleton: true,
			uId: "6f223270-b27e-4a02-8b6d-0ac1efd26857",
			name: "GlobalDuplicateSearchState",
			caption: resources.localizableStrings.GlobalDuplicateSearchStateCaption,
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
				EntityRowNumber: {
					uId: "ca2ab584-f24a-4ae3-96c1-89302f661118",
					name: "EntityRowNumber",
					caption: resources.localizableStrings.EntityRowNumberCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SchemaToSearchId: {
					uId: "f6096978-27ce-4210-bbe6-d4b50a8a2eac",
					name: "SchemaToSearchId",
					caption: resources.localizableStrings.SchemaToSearchIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessedCount: {
					uId: "5e6d4aa4-38db-4e40-8b0c-b0c9c1b44b52",
					name: "ProcessedCount",
					caption: resources.localizableStrings.ProcessedCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SearchStatus: {
					uId: "29fc039d-5b47-4fe9-926b-c6b51fdec44c",
					name: "SearchStatus",
					caption: resources.localizableStrings.SearchStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "GlobalDuplicateSearchStatus",
					referenceSchema: {
						name: "GlobalDuplicateSearchStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SearchStatusChangedOn: {
					uId: "126a0d15-0dcd-466f-b26a-33a66961dc78",
					name: "SearchStatusChangedOn",
					caption: resources.localizableStrings.SearchStatusChangedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TotalCount: {
					uId: "981bb725-a262-4f84-90b5-ddec2a6ac53f",
					name: "TotalCount",
					caption: resources.localizableStrings.TotalCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsManuallyTriggered: {
					uId: "57b20215-ddfb-4868-a89a-c46d62bfb42c",
					name: "IsManuallyTriggered",
					caption: resources.localizableStrings.IsManuallyTriggeredCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
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
					uId: "ff006596-ff26-41f8-b8b1-9f8ce31d6e40",
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
		return Terrasoft.GlobalDuplicateSearchState;
	});