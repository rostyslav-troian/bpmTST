define("CampaignPlanner", ["terrasoft", "ext-base", "CampaignPlannerResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CampaignPlanner", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CampaignPlanner",
			singleton: true,
			uId: "f193aa9c-3e39-442f-8028-f666a64b262a",
			name: "CampaignPlanner",
			caption: resources.localizableStrings.CampaignPlannerCaption,
			administratedByRecords: true,
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
					uId: "620b2989-d467-427c-a032-1273098ee48d",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Type: {
					uId: "686c7ad1-a2e5-4818-91b3-62a10485b039",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CampaignPlannerType",
					referenceSchema: {
						name: "CampaignPlannerType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "f0bdfa16-e362-44da-86e5-a8eb5da6faed"
						}
					}
				},
				Status: {
					uId: "58533759-0437-4aaf-810b-132c46959afb",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "CampaignPlannerStatus",
					referenceSchema: {
						name: "CampaignPlannerStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "84a02ae9-c11e-4011-8d5b-f87b6c3ce01d"
						}
					}
				},
				Owner: {
					uId: "7c063b51-5195-4093-a105-60cc671da79d",
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
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				PlannedBudget: {
					uId: "5c437791-3c1b-43b1-92f6-f835c9b4e2c2",
					name: "PlannedBudget",
					caption: resources.localizableStrings.PlannedBudgetCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				SpentBudget: {
					uId: "dd1939e7-727c-4e41-8d47-30875b33933b",
					name: "SpentBudget",
					caption: resources.localizableStrings.SpentBudgetCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				StartDate: {
					uId: "7a5e12c1-2743-44d8-a6ef-129b5da78e17",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				DueDate: {
					uId: "8112e3dd-bcc3-4a3b-b0c9-efe44cb61478",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				Notes: {
					uId: "38fe36ab-0d6b-4c9c-8d04-c4f74af75a1f",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Currency: {
					uId: "d9bab9f8-4bb8-499a-b523-3235eec0b919",
					name: "Currency",
					caption: resources.localizableStrings.CurrencyCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Currency",
					referenceSchema: {
						name: "Currency",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "PrimaryCurrency"
					}
				},
				CurrencyRate: {
					uId: "54d4522c-2619-4b8f-a7fb-64a40bdbff84",
					name: "CurrencyRate",
					caption: resources.localizableStrings.CurrencyRateCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 1
					},
					size: 20,
					precision: 2
				},
				PrimaryPlannedBudget: {
					uId: "a1537bb7-2c03-4d6a-99aa-761faacef067",
					name: "PrimaryPlannedBudget",
					caption: resources.localizableStrings.PrimaryPlannedBudgetCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimarySpentBudget: {
					uId: "95701e2a-9512-4155-850d-101fd2a82092",
					name: "PrimarySpentBudget",
					caption: resources.localizableStrings.PrimarySpentBudgetCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Brand: {
					uId: "1c1d864e-41a7-4647-a0b7-f08ff7f6e441",
					name: "Brand",
					caption: resources.localizableStrings.BrandCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Brand",
					referenceSchema: {
						name: "Brand",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.CampaignPlanner;
	});