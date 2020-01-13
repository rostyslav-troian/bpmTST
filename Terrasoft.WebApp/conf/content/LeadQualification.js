define("LeadQualification", ["terrasoft", "ext-base", "LeadQualificationResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.LeadQualification", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.LeadQualification",
			singleton: true,
			uId: "3e76137e-09bc-41af-9df2-38f840e14732",
			name: "LeadQualification",
			caption: resources.localizableStrings.LeadQualificationCaption,
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
				Name: {
					uId: "adec4cff-676d-480a-84ae-de304b48e31e",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ContactBusinessPhone: {
					uId: "7ea2f741-2f64-42e4-9e09-66b94809b40b",
					name: "ContactBusinessPhone",
					caption: resources.localizableStrings.ContactBusinessPhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ContactMobilePhone: {
					uId: "86f76e93-e58f-403d-aa6f-1ad66f2cea64",
					name: "ContactMobilePhone",
					caption: resources.localizableStrings.ContactMobilePhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ContactEmail: {
					uId: "93536b50-8c19-4a3d-8dd8-cf4cb990b197",
					name: "ContactEmail",
					caption: resources.localizableStrings.ContactEmailCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AccountBusinessPhone: {
					uId: "0bac8f96-dfc6-423c-b3ad-2b332ca627c8",
					name: "AccountBusinessPhone",
					caption: resources.localizableStrings.AccountBusinessPhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AccountFax: {
					uId: "3747c438-3102-496c-afb9-bdd5d8e1897e",
					name: "AccountFax",
					caption: resources.localizableStrings.AccountFaxCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AccountWebsite: {
					uId: "7219d5a6-f4ba-4f70-96bc-3349f411f997",
					name: "AccountWebsite",
					caption: resources.localizableStrings.AccountWebsiteCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Contact: {
					uId: "3c501455-ac07-4ad6-9c61-3f6373adebb8",
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
				Account: {
					uId: "ee1b6f6b-db50-43b2-9812-6f6d6ef1b970",
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
				Gender: {
					uId: "6af811c6-321b-48f9-93cb-b4d02fc33ee9",
					name: "Gender",
					caption: resources.localizableStrings.GenderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Gender",
					referenceSchema: {
						name: "Gender",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				FullJobTitle: {
					uId: "539a63aa-f994-4d59-bf52-bf329e334b98",
					name: "FullJobTitle",
					caption: resources.localizableStrings.FullJobTitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				LeadContactName: {
					uId: "c160addc-25c9-4a45-bf97-b192a65e1f9e",
					name: "LeadContactName",
					caption: resources.localizableStrings.LeadContactNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Job: {
					uId: "ad5e1fc8-64cf-4a3f-93b9-2c16c52dccff",
					name: "Job",
					caption: resources.localizableStrings.JobCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Job",
					referenceSchema: {
						name: "Job",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Department: {
					uId: "15f03c1f-ab9b-4390-94b0-4b0449eed22e",
					name: "Department",
					caption: resources.localizableStrings.DepartmentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Department",
					referenceSchema: {
						name: "Department",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Salutation: {
					uId: "1690674c-06b5-4f4e-b45e-fc8c048f824f",
					name: "Salutation",
					caption: resources.localizableStrings.SalutationCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ContactSalutationType",
					referenceSchema: {
						name: "ContactSalutationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Dear: {
					uId: "228c174e-2e73-4f0c-8722-fd6093935c3e",
					name: "Dear",
					caption: resources.localizableStrings.DearCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AnnualRevenue: {
					uId: "e66dba0d-528d-46ab-a608-76f5dec76e94",
					name: "AnnualRevenue",
					caption: resources.localizableStrings.AnnualRevenueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountAnnualRevenue",
					referenceSchema: {
						name: "AccountAnnualRevenue",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "FromBaseCurrency"
					}
				},
				EmployeesNumber: {
					uId: "525f41ee-8445-49a5-9d80-b354df7e807f",
					name: "EmployeesNumber",
					caption: resources.localizableStrings.EmployeesNumberCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountEmployeesNumber",
					referenceSchema: {
						name: "AccountEmployeesNumber",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Position"
					}
				},
				AccountCategory: {
					uId: "35fa4229-dfe1-45cb-be20-11cc92dbd524",
					name: "AccountCategory",
					caption: resources.localizableStrings.AccountCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountCategory",
					referenceSchema: {
						name: "AccountCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Industry: {
					uId: "e5b930e6-183c-438f-be32-3e479ca92ace",
					name: "Industry",
					caption: resources.localizableStrings.IndustryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountIndustry",
					referenceSchema: {
						name: "AccountIndustry",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Ownership: {
					uId: "f40c7e1f-cce7-49c6-8f74-bc3790aa33a9",
					name: "Ownership",
					caption: resources.localizableStrings.OwnershipCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountOwnership",
					referenceSchema: {
						name: "AccountOwnership",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountName: {
					uId: "156ecd82-0ac8-423e-97bc-b904c77c70db",
					name: "LeadAccountName",
					caption: resources.localizableStrings.LeadAccountNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				DecisionRole: {
					uId: "536d3ec5-2518-4e62-a288-653f794ce873",
					name: "DecisionRole",
					caption: resources.localizableStrings.DecisionRoleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ContactDecisionRole",
					referenceSchema: {
						name: "ContactDecisionRole",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadType: {
					uId: "4cd7638f-0a98-40d8-a352-dbb0e02e24ba",
					name: "LeadType",
					caption: resources.localizableStrings.LeadTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "LeadType",
					referenceSchema: {
						name: "LeadType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadTypeRipeness: {
					uId: "0049eef6-ce0b-4f05-b0c0-a907ef9e2331",
					name: "LeadTypeRipeness",
					caption: resources.localizableStrings.LeadTypeRipenessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "LeadTypeStatus",
					referenceSchema: {
						name: "LeadTypeStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Value"
					}
				},
				LeadContactAddressType: {
					uId: "fa13e4d5-1a96-492b-9d62-82adf61d4407",
					name: "LeadContactAddressType",
					caption: resources.localizableStrings.LeadContactAddressTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AddressType",
					referenceSchema: {
						name: "AddressType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadContactCountry: {
					uId: "f0824a2f-2203-4c7b-84b8-59c6c99cdeb5",
					name: "LeadContactCountry",
					caption: resources.localizableStrings.LeadContactCountryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Country",
					referenceSchema: {
						name: "Country",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadContactRegion: {
					uId: "fb588b33-2d32-4ad7-9368-3113a406689f",
					name: "LeadContactRegion",
					caption: resources.localizableStrings.LeadContactRegionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Region",
					referenceSchema: {
						name: "Region",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadContactCity: {
					uId: "203f6403-8d26-43a2-8712-e6f219853a8a",
					name: "LeadContactCity",
					caption: resources.localizableStrings.LeadContactCityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "City",
					referenceSchema: {
						name: "City",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadContactZip: {
					uId: "14bde4bb-07be-4c9a-9067-ea355c7d28f9",
					name: "LeadContactZip",
					caption: resources.localizableStrings.LeadContactZipCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				LeadContactAddress: {
					uId: "39b8a183-6b9c-4d52-b8bf-9449f8c06d06",
					name: "LeadContactAddress",
					caption: resources.localizableStrings.LeadContactAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LeadSource: {
					uId: "e1c5c9a6-d29a-4677-9e4a-303a72e7ffc8",
					name: "LeadSource",
					caption: resources.localizableStrings.LeadSourceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "InformationSource",
					referenceSchema: {
						name: "InformationSource",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountAddressType: {
					uId: "92a0fed9-0be8-4b28-a4df-b233d739f938",
					name: "LeadAccountAddressType",
					caption: resources.localizableStrings.LeadAccountAddressTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AddressType",
					referenceSchema: {
						name: "AddressType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountCountry: {
					uId: "1dd3d632-e3a3-4d94-b31e-3f9b2e3db2ae",
					name: "LeadAccountCountry",
					caption: resources.localizableStrings.LeadAccountCountryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Country",
					referenceSchema: {
						name: "Country",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountRegion: {
					uId: "2ff370de-eceb-4221-b205-8b0cf496bed3",
					name: "LeadAccountRegion",
					caption: resources.localizableStrings.LeadAccountRegionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Region",
					referenceSchema: {
						name: "Region",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountCity: {
					uId: "cf2a49d4-f276-4385-b78c-8c4ab585a223",
					name: "LeadAccountCity",
					caption: resources.localizableStrings.LeadAccountCityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "City",
					referenceSchema: {
						name: "City",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadAccountZip: {
					uId: "d807a758-752f-4fcc-af92-6c1b11462238",
					name: "LeadAccountZip",
					caption: resources.localizableStrings.LeadAccountZipCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				LeadAccountAddress: {
					uId: "fb788b38-65fb-4525-b9bc-2d8390375e8a",
					name: "LeadAccountAddress",
					caption: resources.localizableStrings.LeadAccountAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.LeadQualification;
	});