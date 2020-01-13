define("EmployeeCareer", ["terrasoft", "ext-base", "EmployeeCareerResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.EmployeeCareer", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.EmployeeCareer",
			singleton: true,
			uId: "ae722ecf-3686-4a24-a3b6-0c2d798df738",
			name: "EmployeeCareer",
			caption: resources.localizableStrings.EmployeeCareerCaption,
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
				Employee: {
					uId: "10b4c663-af0f-45ba-83fb-f1357581f2c9",
					name: "Employee",
					caption: resources.localizableStrings.EmployeeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Employee",
					referenceSchema: {
						name: "Employee",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Account: {
					uId: "cfcc24ef-4b62-4d40-bdd8-2ea802b9b1ba",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				OrgStructureUnit: {
					uId: "96999841-abaf-443b-9f61-bbe15a5a77d3",
					name: "OrgStructureUnit",
					caption: resources.localizableStrings.OrgStructureUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OrgStructureUnit",
					referenceSchema: {
						name: "OrgStructureUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				EmployeeJob: {
					uId: "24e53dfb-546c-46be-89b0-e258928bb694",
					name: "EmployeeJob",
					caption: resources.localizableStrings.EmployeeJobCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EmployeeJob",
					referenceSchema: {
						name: "EmployeeJob",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				FullJobTitle: {
					uId: "b4946cf5-1b3e-4580-a8fc-a416accd6524",
					name: "FullJobTitle",
					caption: resources.localizableStrings.FullJobTitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				StartDate: {
					uId: "11899472-7e69-44b8-9ef9-1242e562b269",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DueDate: {
					uId: "ff98adaf-5bb0-4d34-83f5-6bcb57ce8f22",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsCurrent: {
					uId: "25543607-7543-4a60-9ca5-cba0edc1affe",
					name: "IsCurrent",
					caption: resources.localizableStrings.IsCurrentCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ProbationDueDate: {
					uId: "778c9d14-dfa3-4e73-9176-231545aae84a",
					name: "ProbationDueDate",
					caption: resources.localizableStrings.ProbationDueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ReasonForDismissal: {
					uId: "e164a462-4b52-4e50-b766-16fa1912624c",
					name: "ReasonForDismissal",
					caption: resources.localizableStrings.ReasonForDismissalCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "ReasonForLeaving",
					referenceSchema: {
						name: "ReasonForLeaving",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.EmployeeCareer;
	});