define("ServiceItem", ["terrasoft", "ext-base", "ServiceItemResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ServiceItem", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ServiceItem",
			singleton: true,
			uId: "c6c44f0a-193e-4b5c-b35e-220a60c06898",
			name: "ServiceItem",
			caption: resources.localizableStrings.ServiceItemCaption,
			administratedByRecords: true,
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
				Name: {
					uId: "58aa36e4-8c91-4f2d-abdf-bc0b293db336",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Status: {
					uId: "08272f0d-1d32-40fb-93fa-8f26e83f065f",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ServiceStatus",
					referenceSchema: {
						name: "ServiceStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "ServiceItemStatusDef"
					}
				},
				ReactionTimeValue: {
					uId: "96b666c6-1aee-4a64-bbd8-3e0784e98ad7",
					name: "ReactionTimeValue",
					caption: resources.localizableStrings.ReactionTimeValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				ReactionTimeUnit: {
					uId: "0f639a8f-2578-4559-9241-2b3fb8c3e25c",
					name: "ReactionTimeUnit",
					caption: resources.localizableStrings.ReactionTimeUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "TimeUnit",
					referenceSchema: {
						name: "TimeUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SolutionTimeValue: {
					uId: "0442e7ab-87f5-4110-840b-885efd5cc394",
					name: "SolutionTimeValue",
					caption: resources.localizableStrings.SolutionTimeValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				SolutionTimeUnit: {
					uId: "bdb8cb94-0dc8-402d-91e2-566c26baf6d8",
					name: "SolutionTimeUnit",
					caption: resources.localizableStrings.SolutionTimeUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "TimeUnit",
					referenceSchema: {
						name: "TimeUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CaseCategory: {
					uId: "6d363bd0-0b58-4887-921c-a1506b3d27dc",
					name: "CaseCategory",
					caption: resources.localizableStrings.CaseCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CaseCategory",
					referenceSchema: {
						name: "CaseCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Notes: {
					uId: "2bdaed40-2269-4558-98d9-c7b7332c62fa",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ReactionTime: {
					uId: "c9da4510-b44e-4d90-8027-57f08c93daa1",
					name: "ReactionTime",
					caption: resources.localizableStrings.ReactionTimeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SolutionTime: {
					uId: "d80d5977-22ac-4c50-b1aa-a93b4d7ec652",
					name: "SolutionTime",
					caption: resources.localizableStrings.SolutionTimeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Owner: {
					uId: "97852225-890c-4eba-ab9e-12de2129863a",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Calendar: {
					uId: "ecba8517-ce27-4d3a-b8f1-27acf4774fc3",
					name: "Calendar",
					caption: resources.localizableStrings.CalendarCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Calendar",
					referenceSchema: {
						name: "Calendar",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.ServiceItem;
	});