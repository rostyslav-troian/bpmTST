define("Project", ["terrasoft", "ext-base", "ProjectResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Project", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Project",
			singleton: true,
			uId: "a11d7fa4-9946-494c-ae41-2169844d29be",
			name: "Project",
			caption: resources.localizableStrings.ProjectCaption,
			administratedByRecords: true,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			hierarchicalColumnName: "ParentProject",
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
					uId: "aaec4bf5-a07d-4f79-b45d-8c7eeead3fad",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Account: {
					uId: "62a1bf12-279e-48d8-8a28-041be01c5003",
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
					uId: "1b4c54b0-33fc-4aeb-9f48-acddb453fe5b",
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
				ProjectEntryType: {
					uId: "41e82ce8-a31c-48a0-b6a5-b90660c83759",
					name: "ProjectEntryType",
					caption: resources.localizableStrings.ProjectEntryTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ProjectEntryType",
					referenceSchema: {
						name: "ProjectEntryType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Type: {
					uId: "e0d39946-16ca-4649-b6fb-1be29312f709",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ProjectType",
					referenceSchema: {
						name: "ProjectType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Owner: {
					uId: "532d4f22-8b39-4860-8e62-60b678c9193a",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
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
				Status: {
					uId: "e1829b39-9b37-4a34-9e33-18fc056fdcbd",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ProjectStatus",
					referenceSchema: {
						name: "ProjectStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "ProjectStateDef"
					}
				},
				StartDate: {
					uId: "8f11337c-f8fe-4e3c-9576-b26554359fd7",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDate"
					}
				},
				EndDate: {
					uId: "470aee83-6564-4676-b0c7-44e8374664d5",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Duration: {
					uId: "e8cb5416-f527-45fa-ab0d-625b915c088c",
					name: "Duration",
					caption: resources.localizableStrings.DurationCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Deadline: {
					uId: "f78cd4b2-fd18-4053-894d-b255fd197b62",
					name: "Deadline",
					caption: resources.localizableStrings.DeadlineCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Supplier: {
					uId: "88bc4b97-11f8-448f-9d43-3c801f60790e",
					name: "Supplier",
					caption: resources.localizableStrings.SupplierCaption,
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
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserAccount"
					}
				},
				Opportunity: {
					uId: "32044112-504d-4450-9d02-bd669f4c4f01",
					name: "Opportunity",
					caption: resources.localizableStrings.OpportunityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Opportunity",
					referenceSchema: {
						name: "Opportunity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				ParentProject: {
					uId: "1e08e1e5-e00b-4abb-8022-43a6b913d48f",
					name: "ParentProject",
					caption: resources.localizableStrings.ParentProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				ActualCompletion: {
					uId: "66e7067f-6bcd-431f-bc33-93a89d748ad6",
					name: "ActualCompletion",
					caption: resources.localizableStrings.ActualCompletionCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				IsAutoCalcCompletion: {
					uId: "99967435-03c4-41e2-ac57-e1313ee1aac1",
					name: "IsAutoCalcCompletion",
					caption: resources.localizableStrings.IsAutoCalcCompletionCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PlanIncome: {
					uId: "d3a36229-802e-4ca7-8136-991aedd18274",
					name: "PlanIncome",
					caption: resources.localizableStrings.PlanIncomeCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactIncome: {
					uId: "486f48f4-375e-4a21-aa9f-b0cf7dfef749",
					name: "FactIncome",
					caption: resources.localizableStrings.FactIncomeCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				IncomeDev: {
					uId: "ae3fe8ec-0c11-4db9-891b-0a3a97f7e4be",
					name: "IncomeDev",
					caption: resources.localizableStrings.IncomeDevCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				IncomeDevPerc: {
					uId: "1e0cfd57-b456-4e2c-af46-e9161c3f7aff",
					name: "IncomeDevPerc",
					caption: resources.localizableStrings.IncomeDevPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanExternalCost: {
					uId: "19c7568e-fa60-4afe-a1b4-5b63f75bffb4",
					name: "PlanExternalCost",
					caption: resources.localizableStrings.PlanExternalCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactExternalCost: {
					uId: "48f4cd4f-df8a-4894-a574-f04c5c7760f2",
					name: "FactExternalCost",
					caption: resources.localizableStrings.FactExternalCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				ExternalCostDev: {
					uId: "a3ee342c-2693-4946-8923-dfae5a31758a",
					name: "ExternalCostDev",
					caption: resources.localizableStrings.ExternalCostDevCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanExternalDevPerc: {
					uId: "a1d3575a-66fd-41f9-ba98-5f6db0a378e0",
					name: "PlanExternalDevPerc",
					caption: resources.localizableStrings.PlanExternalDevPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanExpense: {
					uId: "4d54a487-00a3-4365-89b2-1c1db30cd74b",
					name: "PlanExpense",
					caption: resources.localizableStrings.PlanExpenseCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactExpense: {
					uId: "5409edce-b74d-43d1-b2bc-809d3e704441",
					name: "FactExpense",
					caption: resources.localizableStrings.FactExpenseCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				ExpenseDev: {
					uId: "61c108ff-dde2-481a-862c-aefbf5c427a8",
					name: "ExpenseDev",
					caption: resources.localizableStrings.ExpenseDevCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				ExpenseDevPerc: {
					uId: "b81af69b-d44c-413a-ab0f-e92d747f98b0",
					name: "ExpenseDevPerc",
					caption: resources.localizableStrings.ExpenseDevPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanInternalCost: {
					uId: "9da8c8a1-94c2-43bd-b3d3-110811d7cebf",
					name: "PlanInternalCost",
					caption: resources.localizableStrings.PlanInternalCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactInternalCost: {
					uId: "76578c06-52ea-4daf-9fc7-cb311960a9d4",
					name: "FactInternalCost",
					caption: resources.localizableStrings.FactInternalCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				InternalCostDev: {
					uId: "d0c0c991-79b5-4c4d-a023-c21247ac055f",
					name: "InternalCostDev",
					caption: resources.localizableStrings.InternalCostDevCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanInternalDevPerc: {
					uId: "5ca01a2f-a281-4f2c-9683-bed1debf6499",
					name: "PlanInternalDevPerc",
					caption: resources.localizableStrings.PlanInternalDevPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanMargin: {
					uId: "49fdaaf1-5d6d-4733-9db3-d91072236648",
					name: "PlanMargin",
					caption: resources.localizableStrings.PlanMarginCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				PlanMarginPerc: {
					uId: "caca0f15-0494-47c7-a6e9-d6e2ff54fa5a",
					name: "PlanMarginPerc",
					caption: resources.localizableStrings.PlanMarginPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactMargin: {
					uId: "e4e98bdc-f728-41a4-89b9-7c70ff75def5",
					name: "FactMargin",
					caption: resources.localizableStrings.FactMarginCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				FactMarginPerc: {
					uId: "2a15bb6d-441c-4b2a-b8fd-a4d0d1bfe4ff",
					name: "FactMarginPerc",
					caption: resources.localizableStrings.FactMarginPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				MarginDev: {
					uId: "3c28c5e9-a73f-4a49-bf98-59634c5310c9",
					name: "MarginDev",
					caption: resources.localizableStrings.MarginDevCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				MarginDevPerc: {
					uId: "a95be56a-d10a-4921-bfe4-faea45cf0db2",
					name: "MarginDevPerc",
					caption: resources.localizableStrings.MarginDevPercCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 2
				},
				Position: {
					uId: "07b548e1-64fe-41bd-ae88-0f4927be9c65",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.Project;
	});