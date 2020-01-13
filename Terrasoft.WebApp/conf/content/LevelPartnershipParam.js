define("LevelPartnershipParam", ["terrasoft", "ext-base", "LevelPartnershipParamResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.LevelPartnershipParam", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.LevelPartnershipParam",
			singleton: true,
			uId: "3ecb12bd-fc78-4b4c-acb9-e846918c8a02",
			name: "LevelPartnershipParam",
			caption: resources.localizableStrings.LevelPartnershipParamCaption,
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
				StringValue: {
					uId: "8d363901-e536-4e02-82ef-7921ad3ad215",
					name: "StringValue",
					caption: resources.localizableStrings.StringValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IntValue: {
					uId: "985cfb03-dc38-4589-97e8-1663035e12cb",
					name: "IntValue",
					caption: resources.localizableStrings.IntValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				FloatValue: {
					uId: "1492aef9-5567-4ce2-b308-5b7d581aebb7",
					name: "FloatValue",
					caption: resources.localizableStrings.FloatValueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 3
				},
				BooleanValue: {
					uId: "43656d13-5970-40fa-a6cc-b9d34b1d3636",
					name: "BooleanValue",
					caption: resources.localizableStrings.BooleanValueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Specification: {
					uId: "6adaf528-b0c1-4e74-a20f-70933fc06ddd",
					name: "Specification",
					caption: resources.localizableStrings.SpecificationCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Specification",
					referenceSchema: {
						name: "Specification",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ListItemValue: {
					uId: "e81eee9a-1b68-4318-9a9f-20dadd47c823",
					name: "ListItemValue",
					caption: resources.localizableStrings.ListItemValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SpecificationListItem",
					referenceSchema: {
						name: "SpecificationListItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ParameterType: {
					uId: "a5778b0b-b937-41ac-a4d7-0c64ecc0f05a",
					name: "ParameterType",
					caption: resources.localizableStrings.ParameterTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ParameterType",
					referenceSchema: {
						name: "ParameterType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PartnerParamCategory: {
					uId: "d608765d-801d-4f7c-8c30-4d7ef78714f8",
					name: "PartnerParamCategory",
					caption: resources.localizableStrings.PartnerParamCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "PartnerParamCategory",
					referenceSchema: {
						name: "PartnerParamCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Score: {
					uId: "166fe5b5-da1f-468f-a10b-979518bacb54",
					name: "Score",
					caption: resources.localizableStrings.ScoreCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Name: {
					uId: "34e4df89-d84c-442e-ba6f-27bdca7e44f0",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				StartDate: {
					uId: "4115c82b-4097-425b-977d-72cd78a597d1",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				DueDate: {
					uId: "ca8ad119-a755-403c-b4aa-44040a467a8a",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PartnerLevel: {
					uId: "c63f6117-889a-4392-9f96-e3481b37bc80",
					name: "PartnerLevel",
					caption: resources.localizableStrings.PartnerLevelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "PartnerLevel",
					referenceSchema: {
						name: "PartnerLevel",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ParameterValueType: {
					uId: "238028dc-4139-48a6-82a8-9e862ec8cf28",
					name: "ParameterValueType",
					caption: resources.localizableStrings.ParameterValueTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SpecificationType",
					referenceSchema: {
						name: "SpecificationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RecordInactive: {
					uId: "e86949e7-1ee6-4277-8e20-982a9c673fdb",
					name: "RecordInactive",
					caption: resources.localizableStrings.RecordInactiveCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.LevelPartnershipParam;
	});