define("VwRemindingsCount", ["terrasoft", "ext-base", "VwRemindingsCountResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwRemindingsCount", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwRemindingsCount",
			singleton: true,
			uId: "848d92a5-e651-4e16-ab35-e5678ac704c3",
			name: "VwRemindingsCount",
			caption: resources.localizableStrings.VwRemindingsCountCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				RemindingsCount: {
					uId: "f1a3197e-feb0-48e9-8549-e462189c8176",
					name: "RemindingsCount",
					caption: resources.localizableStrings.RemindingsCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EmailsCount: {
					uId: "9191d2ea-1c14-4336-b7f0-fc2887ea24c9",
					name: "EmailsCount",
					caption: resources.localizableStrings.EmailsCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Contact: {
					uId: "04eac3b3-bdc6-4367-9cd1-bb6142eb63d3",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
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
				SysAdminUnit: {
					uId: "0da83a47-56af-4ec6-b764-40c9991a1ce5",
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
				Id: {
					uId: "aefeafec-74c2-49d4-9e22-49db62bed863",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				VisaCount: {
					uId: "76ff2948-f355-4b17-b70e-6b13a16c044d",
					name: "VisaCount",
					caption: resources.localizableStrings.VisaCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwRemindingsCount;
	});