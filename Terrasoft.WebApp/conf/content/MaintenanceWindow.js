define("MaintenanceWindow", ["terrasoft", "ext-base", "MaintenanceWindowResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.MaintenanceWindow", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.MaintenanceWindow",
			singleton: true,
			uId: "067014b3-8727-46f0-8453-c2aaa60e4e6a",
			name: "MaintenanceWindow",
			caption: resources.localizableStrings.MaintenanceWindowCaption,
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
				DayOfWeek: {
					uId: "8c613c26-cf75-488f-b17d-593ee545692f",
					name: "DayOfWeek",
					caption: resources.localizableStrings.DayOfWeekCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "DayOfWeek",
					referenceSchema: {
						name: "DayOfWeek",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StartTime: {
					uId: "b2a6002c-d5d4-49de-9f0b-796576c02aab",
					name: "StartTime",
					caption: resources.localizableStrings.StartTimeCaption,
					dataValueType: Terrasoft.DataValueType.TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				EndTime: {
					uId: "b6127cf7-2b95-4630-b118-f1935132a7b9",
					name: "EndTime",
					caption: resources.localizableStrings.EndTimeCaption,
					dataValueType: Terrasoft.DataValueType.TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				}
			}
		});
		return Terrasoft.MaintenanceWindow;
	});