define("SysModuleAnalyticsReportLczOld", ["terrasoft", "ext-base", "SysModuleAnalyticsReportLczOldResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysModuleAnalyticsReportLczOld", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysModuleAnalyticsReportLczOld",
			singleton: true,
			uId: "01909bb4-ae8c-4d3a-b199-079364f6a083",
			name: "SysModuleAnalyticsReportLczOld",
			caption: resources.localizableStrings.SysModuleAnalyticsReportLczOldCaption,
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
				Record: {
					uId: "6b414fa0-2b95-4f53-bef6-4d1234de71e0",
					name: "Record",
					caption: resources.localizableStrings.RecordCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysModuleAnalyticsReport",
					referenceSchema: {
						name: "SysModuleAnalyticsReport",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ColumnUId: {
					uId: "00fbb35a-18af-426e-9bc0-6a7ee6784a06",
					name: "ColumnUId",
					caption: resources.localizableStrings.ColumnUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysCulture: {
					uId: "22c1f20f-ee4c-4699-b988-238aaec3ff93",
					name: "SysCulture",
					caption: resources.localizableStrings.SysCultureCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysCulture",
					referenceSchema: {
						name: "SysCulture",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Value: {
					uId: "b8234209-35dc-4ca6-a959-e570754bfa1e",
					name: "Value",
					caption: resources.localizableStrings.ValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				}
			}
		});
		return Terrasoft.SysModuleAnalyticsReportLczOld;
	});