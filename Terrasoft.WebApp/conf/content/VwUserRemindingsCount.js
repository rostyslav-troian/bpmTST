define("VwUserRemindingsCount", ["terrasoft", "ext-base", "VwUserRemindingsCountResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwUserRemindingsCount", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwUserRemindingsCount",
			singleton: true,
			uId: "9a61795f-29dd-4f13-b3cd-5f4fa181df52",
			name: "VwUserRemindingsCount",
			caption: resources.localizableStrings.VwUserRemindingsCountCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "6a544324-59f5-4a7b-bb7f-1437b4a08acb",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				RemindingsCount: {
					uId: "d322fdf6-3f7f-4594-ab55-d668184340ed",
					name: "RemindingsCount",
					caption: resources.localizableStrings.RemindingsCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysAdminUnit: {
					uId: "911467ad-c977-417b-b5b0-4b93afad1fda",
					name: "SysAdminUnit",
					caption: resources.localizableStrings.SysAdminUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RemindTime: {
					uId: "6e105fbb-1592-4cef-8ee4-3b9627d876a7",
					name: "RemindTime",
					caption: resources.localizableStrings.RemindTimeCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TimeZoneId: {
					uId: "fdcfa94c-ed63-439b-a7ca-74dcd32d11d1",
					name: "TimeZoneId",
					caption: resources.localizableStrings.TimeZoneIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				}
			}
		});
		return Terrasoft.VwUserRemindingsCount;
	});