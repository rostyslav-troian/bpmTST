define("VwQueueItem", ["terrasoft", "ext-base", "VwQueueItemResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwQueueItem", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwQueueItem",
			singleton: true,
			uId: "aadf2fcd-684b-4414-8317-bf9879e97569",
			name: "VwQueueItem",
			caption: resources.localizableStrings.VwQueueItemCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Caption",
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
				Queue: {
					uId: "abcbbc92-a450-468f-8de0-7d1a067a9dfb",
					name: "Queue",
					caption: resources.localizableStrings.QueueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Queue",
					referenceSchema: {
						name: "Queue",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				EntityRecordId: {
					uId: "c4b1d2f2-528c-4e66-9440-67125f0707dd",
					name: "EntityRecordId",
					caption: resources.localizableStrings.EntityRecordIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysProcessDataId: {
					uId: "96eca8e1-84f2-4c9d-8b05-8c0d852211bf",
					name: "SysProcessDataId",
					caption: resources.localizableStrings.SysProcessDataIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Status: {
					uId: "55238bd8-7854-4777-b834-fe5df5b1f93b",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "QueueItemStatus",
					referenceSchema: {
						name: "QueueItemStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "2b341a1d-6fa1-4960-9c85-fef60d1bbcc4"
						}
					}
				},
				Operator: {
					uId: "e8f8b431-b576-4bdf-b4c0-3f8e996eb152",
					name: "Operator",
					caption: resources.localizableStrings.OperatorCaption,
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
				NextProcessingDate: {
					uId: "3f39d201-f351-4b7d-85e4-4fd9b5c98276",
					name: "NextProcessingDate",
					caption: resources.localizableStrings.NextProcessingDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				PostponesCount: {
					uId: "07ddc779-6d74-4ecc-ba07-7856ece4a869",
					name: "PostponesCount",
					caption: resources.localizableStrings.PostponesCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				NextProcessingDateOrder: {
					uId: "7c89df9b-ab26-4c93-a7a4-afe029892586",
					name: "NextProcessingDateOrder",
					caption: resources.localizableStrings.NextProcessingDateOrderCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Caption: {
					uId: "2569b65f-95d2-44e2-9934-212b07a1c7fe",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: "Queue item"
					},
					size: 250
				},
				Contact: {
					uId: "9e6ee389-2a71-4950-bf9e-a6b18b48ec1e",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Account: {
					uId: "7794b818-60e5-4cb9-99af-e7d43efc6f95",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Order: {
					uId: "b847392f-153d-466c-ac87-86b2126ebfc3",
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
				Case: {
					uId: "7f5f7e2d-cdc3-4308-a308-d365aa4af661",
					name: "Case",
					caption: resources.localizableStrings.CaseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Case",
					referenceSchema: {
						name: "Case",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				LastActivity: {
					uId: "91cb652b-5769-4210-afe5-d7145cc4687d",
					name: "LastActivity",
					caption: resources.localizableStrings.LastActivityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Activity",
					referenceSchema: {
						name: "Activity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title",
						primaryOrderColumnName: "StartDate"
					}
				}
			}
		});
		return Terrasoft.VwQueueItem;
	});