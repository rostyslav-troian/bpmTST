define("Event", ["terrasoft", "ext-base", "EventResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Event", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Event",
			singleton: true,
			uId: "5b4fdfc7-12b6-4b4f-a9bd-b6f1b6e4447f",
			name: "Event",
			caption: resources.localizableStrings.EventCaption,
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
					uId: "a29c8526-f618-4151-9ee7-ba8c7135ae5a",
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
					uId: "681ae3d8-644e-4c88-9f55-752ee45dd4a4",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "EventType",
					referenceSchema: {
						name: "EventType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "c5822cf8-1e61-45bf-bb76-3b90e68d75f5"
						}
					}
				},
				Owner: {
					uId: "611dd225-b1b2-4fe9-a9ae-8e17947b30ce",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
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
					uId: "3284033b-d83d-4f37-b7a9-b89bef88a8af",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "EventStatus",
					referenceSchema: {
						name: "EventStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "02d383fb-ce9b-4c5a-8c5a-c3e0f2989251"
						}
					}
				},
				StartDate: {
					uId: "74338ff9-e309-436d-a2a0-25d19313523e",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EndDate: {
					uId: "6abd0ec9-8a6d-4060-b6b8-948d16a547f4",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Goal: {
					uId: "11aaba7b-60c1-4ff7-b612-8fa0fb3323be",
					name: "Goal",
					caption: resources.localizableStrings.GoalCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Territory: {
					uId: "82c6a0b8-0cc6-483b-8177-2d6d3eab0d73",
					name: "Territory",
					caption: resources.localizableStrings.TerritoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Territory",
					referenceSchema: {
						name: "Territory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Industry: {
					uId: "f209390f-73a2-47ae-97b9-fcd541bfd5dc",
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
				ActualResponse: {
					uId: "998e902d-a9d5-49e5-bd1f-30981c8da5f3",
					name: "ActualResponse",
					caption: resources.localizableStrings.ActualResponseCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				PrimaryBudgetedCost: {
					uId: "caab7f9b-9c25-462d-802b-9a6d2c5d4fc1",
					name: "PrimaryBudgetedCost",
					caption: resources.localizableStrings.PrimaryBudgetedCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				PrimaryExpectedRevenue: {
					uId: "4b1d344a-e187-4afb-8908-a7afcbbd175f",
					name: "PrimaryExpectedRevenue",
					caption: resources.localizableStrings.PrimaryExpectedRevenueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				PrimaryActualCost: {
					uId: "e6a3cb4a-643f-4d3e-a220-d41b28eb8505",
					name: "PrimaryActualCost",
					caption: resources.localizableStrings.PrimaryActualCostCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				PrimaryActualRevenue: {
					uId: "c14a5743-28b5-4fdf-93af-d34708923ef5",
					name: "PrimaryActualRevenue",
					caption: resources.localizableStrings.PrimaryActualRevenueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				Notes: {
					uId: "645eabb6-dace-4ed4-b41f-01ef4469a857",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActualizeStatus: {
					uId: "72cf8359-d4a2-4f5a-b969-4f465d737aa3",
					name: "ActualizeStatus",
					caption: resources.localizableStrings.ActualizeStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SegmentStatus",
					referenceSchema: {
						name: "SegmentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LastActualizeDate: {
					uId: "2110bf6a-b8ef-4d49-899a-512a263da248",
					name: "LastActualizeDate",
					caption: resources.localizableStrings.LastActualizeDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				RecipientCount: {
					uId: "64dc54f1-ff40-49fe-9a43-6d5f7baa2bda",
					name: "RecipientCount",
					caption: resources.localizableStrings.RecipientCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				SegmentsStatus: {
					uId: "00650465-f72d-4313-a6d4-535bdcb0d4ce",
					name: "SegmentsStatus",
					caption: resources.localizableStrings.SegmentsStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SegmentStatus",
					referenceSchema: {
						name: "SegmentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "fa360d2c-1658-49ad-9152-22479fdc0c12"
						}
					}
				},
				Campaign: {
					uId: "6a45e8e7-bc96-493b-9876-226000f5ef6e",
					name: "Campaign",
					caption: resources.localizableStrings.CampaignCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Campaign",
					referenceSchema: {
						name: "Campaign",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.Event;
	});