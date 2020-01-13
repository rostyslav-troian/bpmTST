define("BaseCase", ["terrasoft", "ext-base", "BaseCaseResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BaseCase", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BaseCase",
			singleton: true,
			uId: "7d80c5f8-f594-44e3-b87e-31b7f7432c4c",
			name: "BaseCase",
			caption: resources.localizableStrings.BaseCaseCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Number",
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
				Number: {
					uId: "7b8ce6b4-29ca-40c7-bea1-b5bf7b7c404a",
					name: "Number",
					caption: resources.localizableStrings.NumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 50
				},
				RegisteredOn: {
					uId: "c91a9a6f-008d-4b2e-83d5-03868ad68c99",
					name: "RegisteredOn",
					caption: resources.localizableStrings.RegisteredOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true
				},
				Subject: {
					uId: "ffe8526d-044f-4222-a1ef-fca83a0772d8",
					name: "Subject",
					caption: resources.localizableStrings.SubjectCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				Symptoms: {
					uId: "6f9b3e63-5998-4c16-b1b0-cd712516ad18",
					name: "Symptoms",
					caption: resources.localizableStrings.SymptomsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Owner: {
					uId: "70620d00-e4ea-48d1-9fdc-4572fcd8d41b",
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
				ResponseDate: {
					uId: "25280121-c075-441f-b4f8-feeb6cc7ca38",
					name: "ResponseDate",
					caption: resources.localizableStrings.ResponseDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SolutionDate: {
					uId: "624839d1-3bd0-45e0-95d1-28326703f19c",
					name: "SolutionDate",
					caption: resources.localizableStrings.SolutionDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				Status: {
					uId: "a71adaea-3464-4dee-bb4f-c7a535450ad7",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CaseStatus",
					referenceSchema: {
						name: "CaseStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "CaseStatusDef"
					}
				},
				Notes: {
					uId: "4bc0db67-0abe-4fbd-a70a-54d0bee0c42d",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Priority: {
					uId: "6a2e8ee8-f1cb-45ad-a731-6b082109d507",
					name: "Priority",
					caption: resources.localizableStrings.PriorityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CasePriority",
					referenceSchema: {
						name: "CasePriority",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "CasePriorityDef"
					}
				},
				Origin: {
					uId: "a93cb111-ce30-4da4-89ec-d2a2f3dd71c4",
					name: "Origin",
					caption: resources.localizableStrings.OriginCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CaseOrigin",
					referenceSchema: {
						name: "CaseOrigin",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "CaseOriginDef"
					}
				},
				Account: {
					uId: "b15302c9-b5c4-4d94-afd5-3d409f9adfe1",
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
				Contact: {
					uId: "6396f46e-c49f-4fb1-850d-824869ff04b3",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
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
				Group: {
					uId: "9147230c-ab53-4eb4-b0b4-ac78be6f8326",
					name: "Group",
					caption: resources.localizableStrings.GroupCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RespondedOn: {
					uId: "02612dc8-7243-4acb-b0bd-abbd19e24136",
					name: "RespondedOn",
					caption: resources.localizableStrings.RespondedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				FirstSolutionProvidedOn: {
					uId: "c0b67cd6-c592-4f3e-9efe-12e783c4d396",
					name: "FirstSolutionProvidedOn",
					caption: resources.localizableStrings.FirstSolutionProvidedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SolutionProvidedOn: {
					uId: "81552f0a-fd92-4865-9533-f4c3ab2861a7",
					name: "SolutionProvidedOn",
					caption: resources.localizableStrings.SolutionProvidedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				ClosureDate: {
					uId: "e12191ff-2811-430d-aeca-7a4435e4b1b9",
					name: "ClosureDate",
					caption: resources.localizableStrings.ClosureDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				ClosureCode: {
					uId: "d2fb7a30-8a2e-462b-963a-b88ff1f52f0e",
					name: "ClosureCode",
					caption: resources.localizableStrings.ClosureCodeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "ClosureCode",
					referenceSchema: {
						name: "ClosureCode",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Solution: {
					uId: "aafda194-dbd6-4337-923a-b19a456eeea9",
					name: "Solution",
					caption: resources.localizableStrings.SolutionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SatisfactionLevel: {
					uId: "ccfc5fbf-4dc9-47e4-91f3-54ea9251ab18",
					name: "SatisfactionLevel",
					caption: resources.localizableStrings.SatisfactionLevelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SatisfactionLevel",
					referenceSchema: {
						name: "SatisfactionLevel",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Category: {
					uId: "af280321-e749-41dd-98e5-383906747e29",
					name: "Category",
					caption: resources.localizableStrings.CategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CaseCategory",
					referenceSchema: {
						name: "CaseCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ResponseOverdue: {
					uId: "1ed4e080-0bf8-4f4f-97e8-b3e22f3240a0",
					name: "ResponseOverdue",
					caption: resources.localizableStrings.ResponseOverdueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SolutionOverdue: {
					uId: "0fa66efc-d2d0-47b9-abab-9e3ad2ea82d3",
					name: "SolutionOverdue",
					caption: resources.localizableStrings.SolutionOverdueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SatisfactionLevelComment: {
					uId: "e66437f6-089c-4f5c-b4ba-d1f8c71506d0",
					name: "SatisfactionLevelComment",
					caption: resources.localizableStrings.SatisfactionLevelCommentCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SolutionRemains: {
					uId: "fce13454-f217-4c5e-af89-35e4d8ebdda3",
					name: "SolutionRemains",
					caption: resources.localizableStrings.SolutionRemainsCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				}
			}
		});
		return Terrasoft.BaseCase;
	});