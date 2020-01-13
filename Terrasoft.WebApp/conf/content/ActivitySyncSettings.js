define("ActivitySyncSettings", ["terrasoft", "ext-base", "ActivitySyncSettingsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ActivitySyncSettings", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ActivitySyncSettings",
			singleton: true,
			uId: "d21cff28-c251-48db-879f-ddc28b6f971d",
			name: "ActivitySyncSettings",
			caption: resources.localizableStrings.ActivitySyncSettingsCaption,
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
				MailboxSyncSettings: {
					uId: "7a995281-a224-4a68-b3cd-ec98b2e53471",
					name: "MailboxSyncSettings",
					caption: resources.localizableStrings.MailboxSyncSettingsCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MailboxSyncSettings",
					referenceSchema: {
						name: "MailboxSyncSettings",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "UserName"
					}
				},
				AppointmentLastSyncDate: {
					uId: "aa62b4a9-7302-44a2-ad1d-e51bd30ae100",
					name: "AppointmentLastSyncDate",
					caption: resources.localizableStrings.AppointmentLastSyncDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TaskLastSyncDate: {
					uId: "f5701335-549a-4f29-9669-a4546636a0a2",
					name: "TaskLastSyncDate",
					caption: resources.localizableStrings.TaskLastSyncDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportTasks: {
					uId: "1685ee06-d8b8-45e1-ac5a-728bf9757096",
					name: "ImportTasks",
					caption: resources.localizableStrings.ImportTasksCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportTasksAll: {
					uId: "8048efc0-43e0-419d-b81a-e19f7124ba1b",
					name: "ImportTasksAll",
					caption: resources.localizableStrings.ImportTasksAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportTasksFolders: {
					uId: "61c7bbc1-dbd5-491b-a95c-e8314c0b6902",
					name: "ImportTasksFolders",
					caption: resources.localizableStrings.ImportTasksFoldersCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportTasksFromFolders: {
					uId: "29fbab6f-a1e7-4359-bac8-a2d05351afec",
					name: "ImportTasksFromFolders",
					caption: resources.localizableStrings.ImportTasksFromFoldersCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportActivitiesFrom: {
					uId: "d243da1c-c3ab-4a4e-a04e-55fb436cf955",
					name: "ImportActivitiesFrom",
					caption: resources.localizableStrings.ImportActivitiesFromCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportAppointments: {
					uId: "d78cd932-b262-4db5-9e73-010c3894b458",
					name: "ImportAppointments",
					caption: resources.localizableStrings.ImportAppointmentsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportAppointmentsAll: {
					uId: "d5025910-712e-4275-bb72-1300117571ec",
					name: "ImportAppointmentsAll",
					caption: resources.localizableStrings.ImportAppointmentsAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImpAppointmentsFromCalendars: {
					uId: "b6bfc8a2-4a10-4cd4-bcfd-a5a0d7dcc5d5",
					name: "ImpAppointmentsFromCalendars",
					caption: resources.localizableStrings.ImpAppointmentsFromCalendarsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportAppointmentsCalendars: {
					uId: "20806819-3f4e-4db3-9de6-6a8c64d0ddd0",
					name: "ImportAppointmentsCalendars",
					caption: resources.localizableStrings.ImportAppointmentsCalendarsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivities: {
					uId: "d3299773-9e38-4034-ac93-457fe2da6b78",
					name: "ExportActivities",
					caption: resources.localizableStrings.ExportActivitiesCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivitiesAll: {
					uId: "9f1d8963-4a4a-480e-a7bf-e7723c9526a5",
					name: "ExportActivitiesAll",
					caption: resources.localizableStrings.ExportActivitiesAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivitiesSelected: {
					uId: "3fc55106-7296-44ae-984f-c1ddef99f5b3",
					name: "ExportActivitiesSelected",
					caption: resources.localizableStrings.ExportActivitiesSelectedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportAppointments: {
					uId: "18016e10-8202-4189-bbbf-fe5286a5568e",
					name: "ExportAppointments",
					caption: resources.localizableStrings.ExportAppointmentsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportTasks: {
					uId: "cd0071f2-a5ee-4d8a-bec4-d4e918a1fcf1",
					name: "ExportTasks",
					caption: resources.localizableStrings.ExportTasksCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivitiesFromScheduler: {
					uId: "c6db6e3c-3388-4192-bfba-d6ac57b622b4",
					name: "ExportActivitiesFromScheduler",
					caption: resources.localizableStrings.ExportActivitiesFromSchedulerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivitiesFromGroups: {
					uId: "4ceee3a7-2de8-4270-a608-cf2912395bc6",
					name: "ExportActivitiesFromGroups",
					caption: resources.localizableStrings.ExportActivitiesFromGroupsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportActivitiesGroups: {
					uId: "f060e414-53d7-4d1a-9185-8a46ac2b8a15",
					name: "ExportActivitiesGroups",
					caption: resources.localizableStrings.ExportActivitiesGroupsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActivitySyncPeriod: {
					uId: "ccdcca74-5560-493f-82ce-7c9892bfe7d5",
					name: "ActivitySyncPeriod",
					caption: resources.localizableStrings.ActivitySyncPeriodCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MailSyncPeriod",
					referenceSchema: {
						name: "MailSyncPeriod",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "2d480351-94b7-4cad-b02f-885730c7eb3e"
						}
					}
				}
			}
		});
		return Terrasoft.ActivitySyncSettings;
	});