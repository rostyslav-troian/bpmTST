define("Queue", ["terrasoft", "ext-base", "QueueResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Queue", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Queue",
			singleton: true,
			uId: "c434cf4e-85f5-48e3-b545-bd3fe9c882ab",
			name: "Queue",
			caption: resources.localizableStrings.QueueCaption,
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
					uId: "6cae06b4-b7bc-4c70-a5b3-f3d43c046206",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				EntitySchemaUId: {
					uId: "3f9570b5-7586-4d30-8fd9-270b48f119e5",
					name: "EntitySchemaUId",
					caption: resources.localizableStrings.EntitySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Priority: {
					uId: "221254af-1f3e-4307-afae-07b0b4ea6fa8",
					name: "Priority",
					caption: resources.localizableStrings.PriorityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "QueuePriority",
					referenceSchema: {
						name: "QueuePriority",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Status: {
					uId: "0ed6afd7-e32c-4c37-b56b-b7ad5fac5ab6",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "QueueStatus",
					referenceSchema: {
						name: "QueueStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ProcessSchemaUId: {
					uId: "cc67082f-423a-4ba1-9725-697be295287c",
					name: "ProcessSchemaUId",
					caption: resources.localizableStrings.ProcessSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				EntitySchemaCaption: {
					uId: "a61a55d4-1145-40f6-bf9b-cd8782490b70",
					name: "EntitySchemaCaption",
					caption: resources.localizableStrings.EntitySchemaCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ProcessSchemaCaption: {
					uId: "20947e38-8e7c-4aec-b9eb-2423f68a902c",
					name: "ProcessSchemaCaption",
					caption: resources.localizableStrings.ProcessSchemaCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				FilterData: {
					uId: "b4d49d9d-6e66-4713-bf29-50636fc8a992",
					name: "FilterData",
					caption: resources.localizableStrings.FilterDataCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				FilterEditData: {
					uId: "d3081b72-5be4-42aa-8416-d3b9a39b7395",
					name: "FilterEditData",
					caption: resources.localizableStrings.FilterEditDataCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsManuallyFilling: {
					uId: "942e7c5a-29da-4ea8-ad7c-17ebb1222459",
					name: "IsManuallyFilling",
					caption: resources.localizableStrings.IsManuallyFillingCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				QueueEntitySchema: {
					uId: "c303a54e-e7fc-4836-854f-82757798e1d5",
					name: "QueueEntitySchema",
					caption: resources.localizableStrings.QueueEntitySchemaCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "VwQueueSysSchema",
					referenceSchema: {
						name: "VwQueueSysSchema",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				BusinessProcessSchema: {
					uId: "786afe14-f0ad-425b-990a-a4dda251099f",
					name: "BusinessProcessSchema",
					caption: resources.localizableStrings.BusinessProcessSchemaCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "VwQueueSysProcess",
					referenceSchema: {
						name: "VwQueueSysProcess",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				QueueUpdateFrequency: {
					uId: "621442f1-3fb1-4ea0-ba1d-7f00029c93b2",
					name: "QueueUpdateFrequency",
					caption: resources.localizableStrings.QueueUpdateFrequencyCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "QueueUpdateFrequency",
					referenceSchema: {
						name: "QueueUpdateFrequency",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "b5f98e01-f990-4226-a012-13d5586d4fe6"
						}
					}
				}
			}
		});
		return Terrasoft.Queue;
	});