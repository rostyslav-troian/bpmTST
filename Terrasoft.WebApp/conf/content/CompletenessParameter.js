define("CompletenessParameter", ["terrasoft", "ext-base", "CompletenessParameterResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CompletenessParameter", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CompletenessParameter",
			singleton: true,
			uId: "2f64722b-a049-4e96-a95e-53b7f2b054af",
			name: "CompletenessParameter",
			caption: resources.localizableStrings.CompletenessParameterCaption,
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
				Completeness: {
					uId: "cd516d07-f502-4606-ac54-c721b5fd7f2d",
					name: "Completeness",
					caption: resources.localizableStrings.CompletenessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Completeness",
					referenceSchema: {
						name: "Completeness",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Name: {
					uId: "ce1827f9-db39-4ae9-bf8d-a389242bf4b7",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AttributeId: {
					uId: "e045700a-4d46-4394-bf48-9c044ae2d565",
					name: "AttributeId",
					caption: resources.localizableStrings.AttributeIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Percentage: {
					uId: "0fe2a233-d221-4849-b2b0-c6a229dc58d0",
					name: "Percentage",
					caption: resources.localizableStrings.PercentageCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				IsColumn: {
					uId: "0029abe7-0fe0-4eaa-aae4-bb9b84fc0e0e",
					name: "IsColumn",
					caption: resources.localizableStrings.IsColumnCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsDetail: {
					uId: "9e8282cb-eecd-48be-ad1c-8306e07ddf06",
					name: "IsDetail",
					caption: resources.localizableStrings.IsDetailCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ColumnName: {
					uId: "90b4a00c-7d86-4be9-95da-6ac1ecd7331c",
					name: "ColumnName",
					caption: resources.localizableStrings.ColumnNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				DetailEntityName: {
					uId: "d681fa67-895c-43cb-958a-79db23f0a56a",
					name: "DetailEntityName",
					caption: resources.localizableStrings.DetailEntityNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DetailColumn: {
					uId: "93aca6cc-e550-49c8-ae3c-4a04f7c23b54",
					name: "DetailColumn",
					caption: resources.localizableStrings.DetailColumnCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				MasterColumn: {
					uId: "22a62cf0-73bb-46d3-bf48-7a1196f8b8d0",
					name: "MasterColumn",
					caption: resources.localizableStrings.MasterColumnCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				TypeColumn: {
					uId: "120f702e-9f04-4d90-adeb-4650888893a9",
					name: "TypeColumn",
					caption: resources.localizableStrings.TypeColumnCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				TypeValue: {
					uId: "1091fbaf-5122-40b1-b2f1-832f82969070",
					name: "TypeValue",
					caption: resources.localizableStrings.TypeValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.CompletenessParameter;
	});