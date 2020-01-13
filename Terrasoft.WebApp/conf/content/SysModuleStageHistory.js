define("SysModuleStageHistory", ["terrasoft", "ext-base", "SysModuleStageHistoryResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysModuleStageHistory", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysModuleStageHistory",
			singleton: true,
			uId: "493242eb-5334-46ee-a3f7-c608a885a80f",
			name: "SysModuleStageHistory",
			caption: resources.localizableStrings.SysModuleStageHistoryCaption,
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
				EntitySchemaUId: {
					uId: "df4e6f49-6917-4048-aa0a-035740953c15",
					name: "EntitySchemaUId",
					caption: resources.localizableStrings.EntitySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageSchemaUId: {
					uId: "272c4c88-f1ad-4480-b65d-341c488a37da",
					name: "StageSchemaUId",
					caption: resources.localizableStrings.StageSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistorySchemaUId: {
					uId: "732eb4fb-42b5-4864-8e47-3c28ec5d7c1b",
					name: "StageHistorySchemaUId",
					caption: resources.localizableStrings.StageHistorySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageColUId: {
					uId: "666989c9-b65b-4360-b148-3dc4b06f2559",
					name: "StageColUId",
					caption: resources.localizableStrings.StageColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				OwnerColUId: {
					uId: "31026a13-dfeb-4e04-8b54-60af3b63b785",
					name: "OwnerColUId",
					caption: resources.localizableStrings.OwnerColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageIsFinalColUId: {
					uId: "c7b00ac4-b62b-43fa-afcc-a3dcceddd1cf",
					name: "StageIsFinalColUId",
					caption: resources.localizableStrings.StageIsFinalColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageIsSuccessfulColUId: {
					uId: "26052881-9515-4347-980f-780982950ea5",
					name: "StageIsSuccessfulColUId",
					caption: resources.localizableStrings.StageIsSuccessfulColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageOrderColUId: {
					uId: "39c0a45f-b9d9-4c1f-8bb9-cc15923df224",
					name: "StageOrderColUId",
					caption: resources.localizableStrings.StageOrderColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryStartDateColUId: {
					uId: "bd40b5ee-8a97-4859-bbc6-22849c7f7a5b",
					name: "StageHistoryStartDateColUId",
					caption: resources.localizableStrings.StageHistoryStartDateColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryDueDateColUId: {
					uId: "6ea10b77-29bb-481a-a87c-bbdb8f79185b",
					name: "StageHistoryDueDateColUId",
					caption: resources.localizableStrings.StageHistoryDueDateColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryOwnerColUId: {
					uId: "711853bd-3110-4b7d-b2a4-049b3ee8ea8e",
					name: "StageHistoryOwnerColUId",
					caption: resources.localizableStrings.StageHistoryOwnerColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryHistoricalColUId: {
					uId: "01a6e3e6-e277-4450-b745-ce814f976650",
					name: "StageHistoryHistoricalColUId",
					caption: resources.localizableStrings.StageHistoryHistoricalColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryMainEntityColUId: {
					uId: "85a91fc1-d508-468e-872b-37be7defadb6",
					name: "StageHistoryMainEntityColUId",
					caption: resources.localizableStrings.StageHistoryMainEntityColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StageHistoryStageColUId: {
					uId: "70be97e5-1595-42a7-9d6b-f7596e23f4aa",
					name: "StageHistoryStageColUId",
					caption: resources.localizableStrings.StageHistoryStageColUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Active: {
					uId: "c23b55f9-8218-44ff-9c17-d8851dcc75c2",
					name: "Active",
					caption: resources.localizableStrings.ActiveCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysModuleStageHistory;
	});