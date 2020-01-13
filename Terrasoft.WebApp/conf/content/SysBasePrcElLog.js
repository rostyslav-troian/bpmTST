define("SysBasePrcElLog", ["terrasoft", "ext-base", "SysBasePrcElLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysBasePrcElLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysBasePrcElLog",
			singleton: true,
			uId: "293f3c3a-0dfb-4677-aa00-ac2a2628eaab",
			name: "SysBasePrcElLog",
			caption: resources.localizableStrings.SysBasePrcElLogCaption,
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
				StartDate: {
					uId: "7472633c-2503-4be4-a591-2f327fb1557d",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CompleteDate: {
					uId: "66d0971c-b74a-4ebe-94ee-401045e30b39",
					name: "CompleteDate",
					caption: resources.localizableStrings.CompleteDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Status: {
					uId: "3a6983b4-5bc5-43b9-874e-fbc481508766",
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
					uId: "881806ee-3862-43db-9565-0b892626309e",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Caption: {
					uId: "4d75680c-5d85-487d-b139-55662984a1a7",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Owner: {
					uId: "6584189d-2dfc-41f8-8d17-c87333a8a942",
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
					uId: "5829e56c-13c3-4b6e-af7f-a65b35234078",
					name: "ErrorDescription",
					caption: resources.localizableStrings.ErrorDescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DurationInMinutes: {
					uId: "49d53787-ba75-498b-9f33-0b76024b1837",
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
					uId: "c767ce04-54ef-4b9c-9bb4-4ace46c75bde",
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
					uId: "5a62ac33-6d83-4f1f-9d89-3e8a4dcd0652",
					name: "DurationInHours",
					caption: resources.localizableStrings.DurationInHoursCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				SchemaElementUId: {
					uId: "23c0a56c-ad99-454a-b521-0b943cef4fd2",
					name: "SchemaElementUId",
					caption: resources.localizableStrings.SchemaElementUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DurationInMilliseconds: {
					uId: "db2066ef-6e51-4c73-a626-f448251d9394",
					name: "DurationInMilliseconds",
					caption: resources.localizableStrings.DurationInMillisecondsCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 1
				},
				NodeId: {
					uId: "0e312911-0169-4700-8f07-9a9a88b62f48",
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
		return Terrasoft.SysBasePrcElLog;
	});