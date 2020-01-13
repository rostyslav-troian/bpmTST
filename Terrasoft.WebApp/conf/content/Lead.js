define("Lead", ["terrasoft", "ext-base", "LeadResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Lead", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Lead",
			singleton: true,
			uId: "41af89e9-750b-4ebb-8cac-ff39b64841ec",
			name: "Lead",
			caption: resources.localizableStrings.LeadCaption,
			administratedByRecords: true,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "LeadName",
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
				Notes: {
					uId: "abc96728-faf6-451d-91f6-35bc53ea9745",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Account: {
					uId: "85e56029-bf1f-46b8-9293-a6395e7f00f9",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Contact: {
					uId: "865eb25f-3941-423f-a4c0-c7834368a7af",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Title: {
					uId: "afdaca14-10c0-4767-b1f4-ed06946d37eb",
					name: "Title",
					caption: resources.localizableStrings.TitleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "ContactSalutationType",
					referenceSchema: {
						name: "ContactSalutationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				FullJobTitle: {
					uId: "4d0cc359-3e5f-481c-b8aa-117ca6b24c06",
					name: "FullJobTitle",
					caption: resources.localizableStrings.FullJobTitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Status: {
					uId: "9ad7b70c-f7cb-4877-8186-16c8dea584fa",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadStatus",
					referenceSchema: {
						name: "LeadStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				InformationSource: {
					uId: "243f2974-3fa5-4b78-93e9-7fc8c1bc2749",
					name: "InformationSource",
					caption: resources.localizableStrings.InformationSourceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "InformationSource",
					referenceSchema: {
						name: "InformationSource",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Industry: {
					uId: "2edaf1d4-f64e-4351-aa6b-c81a7ebfc108",
					name: "Industry",
					caption: resources.localizableStrings.IndustryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AccountIndustry",
					referenceSchema: {
						name: "AccountIndustry",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AnnualRevenue: {
					uId: "718683e1-7d00-48d6-ad3f-c882ee2ce79f",
					name: "AnnualRevenue",
					caption: resources.localizableStrings.AnnualRevenueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
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
					uId: "49508aa7-fa69-4ce3-aa4d-1eeb2c9d73a5",
					name: "EmployeesNumber",
					caption: resources.localizableStrings.EmployeesNumberCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AccountEmployeesNumber",
					referenceSchema: {
						name: "AccountEmployeesNumber",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Position"
					}
				},
				BusinesPhone: {
					uId: "94a3a853-08cb-485f-89f4-182878a5aaeb",
					name: "BusinesPhone",
					caption: resources.localizableStrings.BusinesPhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				MobilePhone: {
					uId: "40fef1d9-f9d9-4246-a90f-389e256aacd4",
					name: "MobilePhone",
					caption: resources.localizableStrings.MobilePhoneCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Email: {
					uId: "fee32d81-7e24-4a34-91c7-3083e4d4938f",
					name: "Email",
					caption: resources.localizableStrings.EmailCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Fax: {
					uId: "75485248-dedd-4fa5-ace4-787e2d097627",
					name: "Fax",
					caption: resources.localizableStrings.FaxCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				Website: {
					uId: "e753916c-14d1-4213-bb77-9334d5e6bf7f",
					name: "Website",
					caption: resources.localizableStrings.WebsiteCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				AddressType: {
					uId: "66852a75-b22e-4390-a8df-49814cdb0131",
					name: "AddressType",
					caption: resources.localizableStrings.AddressTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AddressType",
					referenceSchema: {
						name: "AddressType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Country: {
					uId: "d79b4d09-4791-4993-952b-e097088b55c6",
					name: "Country",
					caption: resources.localizableStrings.CountryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Country",
					referenceSchema: {
						name: "Country",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Region: {
					uId: "dce30e38-3b37-40b3-b9f5-08b790d93420",
					name: "Region",
					caption: resources.localizableStrings.RegionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Region",
					referenceSchema: {
						name: "Region",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				City: {
					uId: "4258b690-fe71-4b7a-8278-f0a7b9dd4780",
					name: "City",
					caption: resources.localizableStrings.CityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "City",
					referenceSchema: {
						name: "City",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Zip: {
					uId: "e1f35c38-67f2-4da3-a3f6-d4294aada246",
					name: "Zip",
					caption: resources.localizableStrings.ZipCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 50
				},
				Address: {
					uId: "76b846c6-6af5-40c2-9576-5c5dbc0d6200",
					name: "Address",
					caption: resources.localizableStrings.AddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				DoNotUseEmail: {
					uId: "89a00df1-3d34-4a63-b34c-2978dcf7e0ae",
					name: "DoNotUseEmail",
					caption: resources.localizableStrings.DoNotUseEmailCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				DoNotUsePhone: {
					uId: "7c2e8e89-aba1-46b1-b386-83480927dd78",
					name: "DoNotUsePhone",
					caption: resources.localizableStrings.DoNotUsePhoneCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				DoNotUseFax: {
					uId: "1e8e0db1-0507-47eb-97c7-ceb789403aad",
					name: "DoNotUseFax",
					caption: resources.localizableStrings.DoNotUseFaxCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				DoNotUseSMS: {
					uId: "48a0c461-b224-4faf-8ede-ce36d53af43e",
					name: "DoNotUseSMS",
					caption: resources.localizableStrings.DoNotUseSMSCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				DoNotUseMail: {
					uId: "54067cf3-13f5-42d1-8af9-90c6bddc7773",
					name: "DoNotUseMail",
					caption: resources.localizableStrings.DoNotUseMailCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				Commentary: {
					uId: "3875ae0d-ca52-4134-81df-2f67a88a3e78",
					name: "Commentary",
					caption: resources.localizableStrings.CommentaryCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				QualifiedContact: {
					uId: "ad490d58-054a-4d85-9246-dd8466eb3983",
					name: "QualifiedContact",
					caption: resources.localizableStrings.QualifiedContactCaption,
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
				QualifiedAccount: {
					uId: "32949ae4-ff13-48f5-9f5d-45a74558ea55",
					name: "QualifiedAccount",
					caption: resources.localizableStrings.QualifiedAccountCaption,
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
				LeadName: {
					uId: "d06ba9af-faf5-4741-a672-e154ae561a94",
					name: "LeadName",
					caption: resources.localizableStrings.LeadNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 500
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
				CountryStr: {
					uId: "dc75275f-426d-4f50-a4ec-dc7296c7d1cd",
					name: "CountryStr",
					caption: resources.localizableStrings.CountryStrCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				RegionStr: {
					uId: "eef401ef-dda7-4ba1-8a29-6adf42a527fb",
					name: "RegionStr",
					caption: resources.localizableStrings.RegionStrCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				CityStr: {
					uId: "a5f6978f-18e4-47c6-938d-9390b9386db6",
					name: "CityStr",
					caption: resources.localizableStrings.CityStrCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				WebForm: {
					uId: "9389d289-6386-48fc-9bd5-2c5872332662",
					name: "WebForm",
					caption: resources.localizableStrings.WebFormCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "GeneratedWebForm",
					referenceSchema: {
						name: "GeneratedWebForm",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadType: {
					uId: "5c696704-62e8-4503-86bf-ed66c3dd63d5",
					name: "LeadType",
					caption: resources.localizableStrings.LeadTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "LeadType",
					referenceSchema: {
						name: "LeadType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadTypeStatus: {
					uId: "9b279c76-0213-4f51-acd6-3936e1069bd4",
					name: "LeadTypeStatus",
					caption: resources.localizableStrings.LeadTypeStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadTypeStatus",
					referenceSchema: {
						name: "LeadTypeStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Value"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "5b3d1046-fc16-45c8-a5a1-298dfc857546"
						}
					}
				},
				LeadDisqualifyReason: {
					uId: "1970ed4a-c0ea-4d9d-97ab-68bc7ccc324a",
					name: "LeadDisqualifyReason",
					caption: resources.localizableStrings.LeadDisqualifyReasonCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadDisqualifyReason",
					referenceSchema: {
						name: "LeadDisqualifyReason",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AccountCategory: {
					uId: "a3200694-9a9a-42a6-824f-870d5b03e255",
					name: "AccountCategory",
					caption: resources.localizableStrings.AccountCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AccountCategory",
					referenceSchema: {
						name: "AccountCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AccountOwnership: {
					uId: "6a7045c5-ab82-4bf9-a929-9ac065c69343",
					name: "AccountOwnership",
					caption: resources.localizableStrings.AccountOwnershipCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "AccountOwnership",
					referenceSchema: {
						name: "AccountOwnership",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Department: {
					uId: "c7fb190e-51d8-4c65-a5db-c3714d3b0af7",
					name: "Department",
					caption: resources.localizableStrings.DepartmentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Department",
					referenceSchema: {
						name: "Department",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Gender: {
					uId: "257a1321-f45d-4868-bf44-e9f2297661d3",
					name: "Gender",
					caption: resources.localizableStrings.GenderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Gender",
					referenceSchema: {
						name: "Gender",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Job: {
					uId: "aa8c19b4-a8fb-4284-b969-8f15630a25ec",
					name: "Job",
					caption: resources.localizableStrings.JobCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Job",
					referenceSchema: {
						name: "Job",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DecisionRole: {
					uId: "4a577f44-6cf7-40d0-b1f8-81c2cf6539d1",
					name: "DecisionRole",
					caption: resources.localizableStrings.DecisionRoleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "ContactDecisionRole",
					referenceSchema: {
						name: "ContactDecisionRole",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				QualifyStatus: {
					uId: "bc0c2d60-5a3d-4840-aa4e-c60ea776e206",
					name: "QualifyStatus",
					caption: resources.localizableStrings.QualifyStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "QualifyStatus",
					referenceSchema: {
						name: "QualifyStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "d790a45d-03ff-4ddb-9dea-8087722c582c"
						}
					}
				},
				Dear: {
					uId: "ee7282d6-232b-449f-bf7b-1bd2e1f36a58",
					name: "Dear",
					caption: resources.localizableStrings.DearCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				QualificationProcessId: {
					uId: "9fb3dc53-b29b-46e2-ba98-ae587bf61fb2",
					name: "QualificationProcessId",
					caption: resources.localizableStrings.QualificationProcessIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false
				},
				Owner: {
					uId: "52817348-4c01-4015-a766-cb10c7b554c8",
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
				RemindToOwner: {
					uId: "279fe3e0-79c0-4f80-ba0f-f56df245f49c",
					name: "RemindToOwner",
					caption: resources.localizableStrings.RemindToOwnerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false
				},
				SalesOwner: {
					uId: "5c0fa796-b083-4126-ace9-cfddc25539a0",
					name: "SalesOwner",
					caption: resources.localizableStrings.SalesOwnerCaption,
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
				Budget: {
					uId: "882bf1d7-3d1f-4208-80ca-bf913c8d4f2f",
					name: "Budget",
					caption: resources.localizableStrings.BudgetCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 20,
					precision: 2
				},
				MeetingDate: {
					uId: "efc32501-4c3a-4500-8fa4-1d70c6bf26f9",
					name: "MeetingDate",
					caption: resources.localizableStrings.MeetingDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				DecisionDate: {
					uId: "4c3a6f1b-99d3-4baf-8954-076274d0675c",
					name: "DecisionDate",
					caption: resources.localizableStrings.DecisionDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				ShowDistributionPage: {
					uId: "11b61c8f-5920-4f71-8df0-d68b54efc8db",
					name: "ShowDistributionPage",
					caption: resources.localizableStrings.ShowDistributionPageCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				BpmHref: {
					uId: "33099014-9741-4d65-aec1-8f0fbe5da8b3",
					name: "BpmHref",
					caption: resources.localizableStrings.BpmHrefCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false
				},
				BpmRef: {
					uId: "80755b15-6dcc-400e-99ad-cfd9ac5a08a9",
					name: "BpmRef",
					caption: resources.localizableStrings.BpmRefCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				RegisterMethod: {
					uId: "087fc72c-7115-4275-965c-c100b7eabba1",
					name: "RegisterMethod",
					caption: resources.localizableStrings.RegisterMethodCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadRegisterMethod",
					referenceSchema: {
						name: "LeadRegisterMethod",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "240ab9c6-4d7c-4688-b380-af44dd147d7a"
						}
					}
				},
				LeadSource: {
					uId: "52e9a4db-31fd-4cec-8ad5-4f07143c900c",
					name: "LeadSource",
					caption: resources.localizableStrings.LeadSourceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadSource",
					referenceSchema: {
						name: "LeadSource",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadMedium: {
					uId: "6af59dc9-8eda-4550-b30a-00db9126349c",
					name: "LeadMedium",
					caption: resources.localizableStrings.LeadMediumCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "LeadMedium",
					referenceSchema: {
						name: "LeadMedium",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				OpportunityDepartment: {
					uId: "a40a64fa-a0ea-40e6-9476-a59c1dfbb93f",
					name: "OpportunityDepartment",
					caption: resources.localizableStrings.OpportunityDepartmentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OpportunityDepartment",
					referenceSchema: {
						name: "OpportunityDepartment",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				IdentificationPassed: {
					uId: "7dc3ed3f-ce06-4a75-8d38-9e0badcece6e",
					name: "IdentificationPassed",
					caption: resources.localizableStrings.IdentificationPassedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Campaign: {
					uId: "0c40a261-945a-41b7-8db3-8ea08c2a021a",
					name: "Campaign",
					caption: resources.localizableStrings.CampaignCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Campaign",
					referenceSchema: {
						name: "Campaign",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				BulkEmail: {
					uId: "7dd57d6b-5262-4c8c-a61a-41b83257b36f",
					name: "BulkEmail",
					caption: resources.localizableStrings.BulkEmailCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "BulkEmail",
					referenceSchema: {
						name: "BulkEmail",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Qualified: {
					uId: "f904f43e-672c-42f8-a5ed-e484d6d799ce",
					name: "Qualified",
					caption: resources.localizableStrings.QualifiedCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false
				},
				SaleParticipant: {
					uId: "2917b3c0-75e0-41d3-be64-764da1f5369a",
					name: "SaleParticipant",
					caption: resources.localizableStrings.SaleParticipantCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false
				},
				QualifiedPercent: {
					uId: "6e8ab674-b580-4620-912a-78cdc93ddc7f",
					name: "QualifiedPercent",
					caption: resources.localizableStrings.QualifiedPercentCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				SalePercent: {
					uId: "35c9d777-642d-455a-8011-0bf9fdf797fd",
					name: "SalePercent",
					caption: resources.localizableStrings.SalePercentCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				StartLeadManagementProcess: {
					uId: "ad34e929-02a6-4baf-88b5-4efbf982c577",
					name: "StartLeadManagementProcess",
					caption: resources.localizableStrings.StartLeadManagementProcessCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				SaleType: {
					uId: "bca817e3-756d-4098-8804-859940310d68",
					name: "SaleType",
					caption: resources.localizableStrings.SaleTypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: "Opportunity"
					},
					size: 50
				},
				Score: {
					uId: "7c4d10e3-5ace-4362-8b9c-73b858ba9fec",
					name: "Score",
					caption: resources.localizableStrings.ScoreCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				QualificationPassed: {
					uId: "d46a1b66-17a7-4603-b1ce-49313701da31",
					name: "QualificationPassed",
					caption: resources.localizableStrings.QualificationPassedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Event: {
					uId: "03e9e2ca-9168-4ae1-8ff3-a92c7bb85344",
					name: "Event",
					caption: resources.localizableStrings.EventCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Event",
					referenceSchema: {
						name: "Event",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				NextActualizationDate: {
					uId: "016f2995-d657-4704-a9a0-cd4deeca83b9",
					name: "NextActualizationDate",
					caption: resources.localizableStrings.NextActualizationDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				BpmSessionId: {
					uId: "63835aed-0d82-40d3-b102-75140767b1e5",
					name: "BpmSessionId",
					caption: resources.localizableStrings.BpmSessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Opportunity: {
					uId: "7cfff438-9ee8-4272-816d-5deb7d0c9d36",
					name: "Opportunity",
					caption: resources.localizableStrings.OpportunityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Opportunity",
					referenceSchema: {
						name: "Opportunity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				Order: {
					uId: "6dcd0304-ebd6-4e01-8d09-7e9eed95c8de",
					name: "Order",
					caption: resources.localizableStrings.OrderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Order",
					referenceSchema: {
						name: "Order",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Partner: {
					uId: "693f56bf-b9bb-4f39-bca2-1b307f60cca5",
					name: "Partner",
					caption: resources.localizableStrings.PartnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PartnerOwner: {
					uId: "becf8a84-8327-4864-97d3-209b2a7dc67e",
					name: "PartnerOwner",
					caption: resources.localizableStrings.PartnerOwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PredictiveScore: {
					uId: "f3735b14-5953-4b62-b5cd-23c5e4860a14",
					name: "PredictiveScore",
					caption: resources.localizableStrings.PredictiveScoreCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				MovedToFinalStateOn: {
					uId: "311e6ef0-7dad-4996-91ff-77977f17c2c4",
					name: "MovedToFinalStateOn",
					caption: resources.localizableStrings.MovedToFinalStateOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				PartnerType: {
					uId: "215eb46b-7973-42c0-bb8f-8b011a8fbd67",
					name: "PartnerType",
					caption: resources.localizableStrings.PartnerTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "PartnerType",
					referenceSchema: {
						name: "PartnerType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SalesChannel: {
					uId: "33cf5522-8fdc-4d80-ae7a-07c96cefebca",
					name: "SalesChannel",
					caption: resources.localizableStrings.SalesChannelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OpportunityType",
					referenceSchema: {
						name: "OpportunityType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "3c3865f2-ada4-480c-ac91-e2d39c5bbaf9"
						}
					}
				}
			}
		});
		return Terrasoft.Lead;
	});