define("SysUserSession", ["terrasoft", "ext-base", "SysUserSessionResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysUserSession", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysUserSession",
			singleton: true,
			uId: "43e6cdb7-e6fd-4218-bd45-278a1ce03339",
			name: "SysUserSession",
			caption: resources.localizableStrings.SysUserSessionCaption,
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
				SysUser: {
					uId: "61b6df7e-99db-458f-980d-68308d2dd08c",
					name: "SysUser",
					caption: resources.localizableStrings.SysUserCaption,
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
				SessionId: {
					uId: "f443b1a3-3c1c-4a25-8add-b3255ea19099",
					name: "SessionId",
					caption: resources.localizableStrings.SessionIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 50
				},
				SessionStartDate: {
					uId: "a3557536-73b8-4621-8374-8f2c77fc1abd",
					name: "SessionStartDate",
					caption: resources.localizableStrings.SessionStartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				SessionEndDate: {
					uId: "86a0a1f4-7d2d-45da-b313-8f96c983215c",
					name: "SessionEndDate",
					caption: resources.localizableStrings.SessionEndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SessionEndMethod: {
					uId: "6ee436a9-5490-4cf4-a2e0-d79f6cdb901c",
					name: "SessionEndMethod",
					caption: resources.localizableStrings.SessionEndMethodCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
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
				ClientIP: {
					uId: "ac2b69b9-8448-4b1d-b095-d2410c2b7321",
					name: "ClientIP",
					caption: resources.localizableStrings.ClientIPCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				Agent: {
					uId: "ac479e55-e8d2-408e-9284-0354087f213a",
					name: "Agent",
					caption: resources.localizableStrings.AgentCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ExternalAccess: {
					uId: "69fb32b0-1fcf-4310-86be-7db7212fe4a8",
					name: "ExternalAccess",
					caption: resources.localizableStrings.ExternalAccessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "ExternalAccess",
					referenceSchema: {
						name: "ExternalAccess",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "AccessReason"
					}
				}
			}
		});
		return Terrasoft.SysUserSession;
	});