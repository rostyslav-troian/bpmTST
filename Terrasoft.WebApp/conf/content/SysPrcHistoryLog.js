define("SysPrcHistoryLog", ["terrasoft", "ext-base", "SysPrcHistoryLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysPrcHistoryLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysPrcHistoryLog",
			singleton: true,
			uId: "c8cd120d-c91b-4104-bad0-88b1b892a49d",
			name: "SysPrcHistoryLog",
			caption: resources.localizableStrings.SysPrcHistoryLogCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			hierarchicalColumnName: "Parent",
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
				Name: {
					uId: "c9f2d733-fb0a-4f8e-ad91-1eb06891d2e6",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				StartDate: {
					uId: "03e35775-3e19-4a17-b038-5b927c2f14f3",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				CompleteDate: {
					uId: "453bcbc6-eae2-481f-b808-b7cfea46304b",
					name: "CompleteDate",
					caption: resources.localizableStrings.CompleteDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysSchema: {
					uId: "7be578a4-bc9a-4e7e-9d00-087de2a606bd",
					name: "SysSchema",
					caption: resources.localizableStrings.SysSchemaCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysSchema",
					referenceSchema: {
						name: "SysSchema",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				Parent: {
					uId: "1f85a957-c2b6-4aa1-afff-575ad9bd443e",
					name: "Parent",
					caption: resources.localizableStrings.ParentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysPrcHistoryLog",
					referenceSchema: {
						name: "SysPrcHistoryLog",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Status: {
					uId: "be00ec0f-14af-4063-ab36-ac4953e639a9",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysProcessStatus",
					referenceSchema: {
						name: "SysProcessStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Owner: {
					uId: "f4364fd0-8a42-425f-9771-9be6c83d8394",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
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
				SysWorkspace: {
					uId: "b35c48a0-6ab5-4e12-b151-e108bb20f1ea",
					name: "SysWorkspace",
					caption: resources.localizableStrings.SysWorkspaceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysWorkspace",
					referenceSchema: {
						name: "SysWorkspace",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DurationInMinutes: {
					uId: "05b79db3-54fc-4e67-8fd6-41f59a38e33c",
					name: "DurationInMinutes",
					caption: resources.localizableStrings.DurationInMinutesCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				DurationInDays: {
					uId: "44717a77-27dc-44c2-8a25-e70a0d21cf66",
					name: "DurationInDays",
					caption: resources.localizableStrings.DurationInDaysCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				DurationInHours: {
					uId: "e1f5dc62-8b1c-49c8-91e8-a05e448bc23e",
					name: "DurationInHours",
					caption: resources.localizableStrings.DurationInHoursCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					size: 18,
					precision: 1
				},
				PackageName: {
					uId: "b7eece49-2efb-4f58-8beb-b1608f7756c8",
					name: "PackageName",
					caption: resources.localizableStrings.PackageNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				Version: {
					uId: "18ff1712-3b16-487a-83c4-2195e7ba6c69",
					name: "Version",
					caption: resources.localizableStrings.VersionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				DurationInMilliseconds: {
					uId: "50ab25cc-d7e6-41f6-ab49-b3d46ceb53e2",
					name: "DurationInMilliseconds",
					caption: resources.localizableStrings.DurationInMillisecondsCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 1
				},
				ErrorDescription: {
					uId: "ed6a1546-fda3-48ca-bb6b-3a01d3529c0d",
					name: "ErrorDescription",
					caption: resources.localizableStrings.ErrorDescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysPrcHistoryLog;
	});