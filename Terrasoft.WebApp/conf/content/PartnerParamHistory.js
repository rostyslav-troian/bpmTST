define("PartnerParamHistory", ["terrasoft", "ext-base", "PartnerParamHistoryResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.PartnerParamHistory", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.PartnerParamHistory",
			singleton: true,
			uId: "488977f0-7923-47ae-ba50-d05c93101210",
			name: "PartnerParamHistory",
			caption: resources.localizableStrings.PartnerParamHistoryCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: true,
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
				PartnerParamCategory: {
					uId: "a8b3d081-45a1-4cd1-aa0f-b129c1104cab",
					name: "PartnerParamCategory",
					caption: resources.localizableStrings.PartnerParamCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
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
					uId: "6798596b-f967-4e78-a1e3-72d6c773937c",
					name: "Score",
					caption: resources.localizableStrings.ScoreCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				Partnership: {
					uId: "edf932a5-9b80-4be1-9f8c-17ff782e83c9",
					name: "Partnership",
					caption: resources.localizableStrings.PartnershipCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Partnership",
					referenceSchema: {
						name: "Partnership",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PartnershipParameterType: {
					uId: "f864e780-a6a7-4362-be29-4a6ff91ff769",
					name: "PartnershipParameterType",
					caption: resources.localizableStrings.PartnershipParameterTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "PartnershipParamType",
					referenceSchema: {
						name: "PartnershipParamType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ParameterType: {
					uId: "ee91e889-b5bd-4e7a-9773-3dccf95db043",
					name: "ParameterType",
					caption: resources.localizableStrings.ParameterTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
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
				PartnerLevel: {
					uId: "becc053f-4689-4c9f-a734-d50a7b7918e1",
					name: "PartnerLevel",
					caption: resources.localizableStrings.PartnerLevelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "PartnerLevel",
					referenceSchema: {
						name: "PartnerLevel",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StartDate: {
					uId: "2a24e7e0-4ac5-4077-8160-f7e69ede3e2c",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				EndDate: {
					uId: "b2cc7804-e355-4e23-9527-91cb2c08e533",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ParameterValueType: {
					uId: "fe29d48b-7375-4d8d-92fe-398d8d3e749e",
					name: "ParameterValueType",
					caption: resources.localizableStrings.ParameterValueTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
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
				CurrentValue: {
					uId: "08549aac-10a6-4502-8f99-3a7371534355",
					name: "CurrentValue",
					caption: resources.localizableStrings.CurrentValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.PartnerParamHistory;
	});