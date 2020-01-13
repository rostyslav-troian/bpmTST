define("VwOpportFunnelData", ["terrasoft", "ext-base", "VwOpportFunnelDataResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwOpportFunnelData", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwOpportFunnelData",
			singleton: true,
			uId: "ba736afe-2a21-4117-b8f7-e90b25388daa",
			name: "VwOpportFunnelData",
			caption: resources.localizableStrings.VwOpportFunnelDataCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "cbd8ed42-0210-476f-b65d-9397658b1076",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				Opportunity: {
					uId: "9d57f132-3483-4f5b-804a-79abfa449807",
					name: "Opportunity",
					caption: resources.localizableStrings.OpportunityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Opportunity",
					referenceSchema: {
						name: "Opportunity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				fStage: {
					uId: "1e4dd6eb-af77-465a-9afc-4d3085c22bda",
					name: "fStage",
					caption: resources.localizableStrings.fStageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OpportunityStage",
					referenceSchema: {
						name: "OpportunityStage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				fStageNumber: {
					uId: "50b3e0e1-f768-4766-bcc0-455aac0c92c8",
					name: "fStageNumber",
					caption: resources.localizableStrings.fStageNumberCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				fStartDate: {
					uId: "7967257c-cbce-4268-ad0c-e9f7b4b9f22d",
					name: "fStartDate",
					caption: resources.localizableStrings.fStartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				fDueDate: {
					uId: "c7e5f584-2086-4582-a156-35319170a4dc",
					name: "fDueDate",
					caption: resources.localizableStrings.fDueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				fCreatedOn: {
					uId: "51df5b33-d238-4c5d-83b7-a0014b95ac13",
					name: "fCreatedOn",
					caption: resources.localizableStrings.fCreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				lStage: {
					uId: "88cac6ef-d24d-4056-a5bb-bfde1bf947cd",
					name: "lStage",
					caption: resources.localizableStrings.lStageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OpportunityStage",
					referenceSchema: {
						name: "OpportunityStage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				lStageNumber: {
					uId: "916a303a-3a9e-419f-af95-7252e31eed21",
					name: "lStageNumber",
					caption: resources.localizableStrings.lStageNumberCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				lStartDate: {
					uId: "f4f332d1-d5ea-4db6-af91-d3cbdb133aec",
					name: "lStartDate",
					caption: resources.localizableStrings.lStartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				lDueDate: {
					uId: "9577abd6-c30d-475f-a3c8-218b37fd752b",
					name: "lDueDate",
					caption: resources.localizableStrings.lDueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				lCreatedOn: {
					uId: "ecc69141-66a8-481e-85d1-379c63b1605f",
					name: "lCreatedOn",
					caption: resources.localizableStrings.lCreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsInStageConversion: {
					uId: "ac495622-592c-4259-a9f2-e6bda7f59cee",
					name: "IsInStageConversion",
					caption: resources.localizableStrings.IsInStageConversionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwOpportFunnelData;
	});