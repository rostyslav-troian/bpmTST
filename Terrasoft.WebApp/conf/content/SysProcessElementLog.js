define("SysProcessElementLog", ["terrasoft", "ext-base", "SysProcessElementLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysProcessElementLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysProcessElementLog",
			singleton: true,
			uId: "ff6c1cb5-16bf-4f8c-adc8-64c0b7762151",
			name: "SysProcessElementLog",
			caption: resources.localizableStrings.SysProcessElementLogCaption,
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
						value: "SequentialGuid"
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
				SchemaElementUId: {
					uId: "d02aa4b5-5f3f-474e-8592-fb7d134b97fe",
					name: "SchemaElementUId",
					caption: resources.localizableStrings.SchemaElementUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				StartDate: {
					uId: "87877e35-e3cf-4c0a-b765-f25ee289c48e",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				CompleteDate: {
					uId: "12e6627d-0eea-4aca-bea0-48ec642ac0e6",
					name: "CompleteDate",
					caption: resources.localizableStrings.CompleteDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysProcess: {
					uId: "f7d0bbeb-f7cf-4e9b-b1e8-b3e1e85b02f4",
					name: "SysProcess",
					caption: resources.localizableStrings.SysProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysProcessLog",
					referenceSchema: {
						name: "SysProcessLog",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Status: {
					uId: "20ef8f7f-d262-41db-94ae-e4151f20f3e3",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysProcessStatus",
					referenceSchema: {
						name: "SysProcessStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Type: {
					uId: "38e1d692-5953-438d-92bf-8a1f3115ac44",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Caption: {
					uId: "157e504e-ae6d-40d5-b01c-f24268af8df3",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Owner: {
					uId: "c9bb53e6-4500-4979-ab28-3832d348081e",
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
				ErrorDescription: {
					uId: "7d3e42c3-9e10-4812-a2a6-0c2d45fee313",
					name: "ErrorDescription",
					caption: resources.localizableStrings.ErrorDescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DurationInMinutes: {
					uId: "5e6dde55-197b-4721-b435-993e53cbaddb",
					name: "DurationInMinutes",
					caption: resources.localizableStrings.DurationInMinutesCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				DurationInDays: {
					uId: "a79003a2-1325-4d0a-a369-b624b1576d9f",
					name: "DurationInDays",
					caption: resources.localizableStrings.DurationInDaysCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				DurationInHours: {
					uId: "c38f93e2-f875-4b50-86c5-aeac9aeeec88",
					name: "DurationInHours",
					caption: resources.localizableStrings.DurationInHoursCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				DurationInMilliseconds: {
					uId: "3907d26d-560b-4f9d-9e8a-ee3c34f495ef",
					name: "DurationInMilliseconds",
					caption: resources.localizableStrings.DurationInMillisecondsCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				NodeId: {
					uId: "0adf8286-cce9-4726-b533-29200b6f2c02",
					name: "NodeId",
					caption: resources.localizableStrings.NodeIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				}
			}
		});
		return Terrasoft.SysProcessElementLog;
	});