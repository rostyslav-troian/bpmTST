define("VwSysAdminUnit", ["terrasoft", "ext-base", "VwSysAdminUnitResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSysAdminUnit", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSysAdminUnit",
			singleton: true,
			uId: "d5d01fcd-6d8c-4b29-9e58-cca3ffe62364",
			name: "VwSysAdminUnit",
			caption: resources.localizableStrings.VwSysAdminUnitCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			hierarchicalColumnName: "ParentRole",
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
				Name: {
					uId: "736c30a7-c0ec-4fa9-b034-2552b319b633",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Description: {
					uId: "9e53fd7c-dde4-4502-a64c-b9e34148108b",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				SysAdminUnitType: {
					uId: "3b1b6e4c-aa09-413c-9ded-a6ad81bb93c1",
					name: "SysAdminUnitType",
					caption: resources.localizableStrings.SysAdminUnitTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnitType",
					referenceSchema: {
						name: "SysAdminUnitType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ParentRole: {
					uId: "3678b2d1-343e-4e0c-8a93-f082143be510",
					name: "ParentRole",
					caption: resources.localizableStrings.ParentRoleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwSysAdminUnit",
					referenceSchema: {
						name: "VwSysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Contact: {
					uId: "328f73e7-ebde-432f-9052-a0365b3105e8",
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
				Account: {
					uId: "45d5d808-1ad8-42bf-aaf2-177dcd2079c7",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				IsDirectoryEntry: {
					uId: "72a7351e-36cf-40f9-b334-0a7563bd60fb",
					name: "IsDirectoryEntry",
					caption: resources.localizableStrings.IsDirectoryEntryCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TimeZone: {
					uId: "8280981b-5189-40a1-b700-6a35c572dba2",
					name: "TimeZone",
					caption: resources.localizableStrings.TimeZoneCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "TimeZone",
					referenceSchema: {
						name: "TimeZone",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "DefaultTimeZone"
					}
				},
				UserPassword: {
					uId: "a07a30ff-b3df-45db-a83c-bf89027250d8",
					name: "UserPassword",
					caption: resources.localizableStrings.UserPasswordCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Active: {
					uId: "a986b074-459c-40b1-b4b6-0e286b3ef123",
					name: "Active",
					caption: resources.localizableStrings.ActiveCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				LoggedIn: {
					uId: "937f2044-f446-4975-9caf-de9e7c972fb9",
					name: "LoggedIn",
					caption: resources.localizableStrings.LoggedInCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LDAPEntry: {
					uId: "2e25fe29-ea38-4db2-84d5-03a8db9b2491",
					name: "LDAPEntry",
					caption: resources.localizableStrings.LDAPEntryCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SynchronizeWithLDAP: {
					uId: "184336ef-e07a-4f5a-9850-8d4ccaff520f",
					name: "SynchronizeWithLDAP",
					caption: resources.localizableStrings.SynchronizeWithLDAPCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LDAPEntryId: {
					uId: "c2748d54-0f48-4251-bfc0-ff6e2478348d",
					name: "LDAPEntryId",
					caption: resources.localizableStrings.LDAPEntryIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				LDAPEntryDN: {
					uId: "e161e2fc-4fac-4ae0-ba3c-e9f70d52ecb4",
					name: "LDAPEntryDN",
					caption: resources.localizableStrings.LDAPEntryDNCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
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
				SysCulture: {
					uId: "9eb0071c-72bd-48e1-b9e7-36c81e6aa232",
					name: "SysCulture",
					caption: resources.localizableStrings.SysCultureCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysCulture",
					referenceSchema: {
						name: "SysCulture",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PasswordExpireDate: {
					uId: "088ae956-eb2f-4df7-ad9c-1fb9a6596a9f",
					name: "PasswordExpireDate",
					caption: resources.localizableStrings.PasswordExpireDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				HomePage: {
					uId: "5f009f32-31e0-41c2-9506-a9aa73ed64ae",
					name: "HomePage",
					caption: resources.localizableStrings.HomePageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysModule",
					referenceSchema: {
						name: "SysModule",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ConnectionType: {
					uId: "4acc2d13-7573-41ec-9a30-e20696bf0314",
					name: "ConnectionType",
					caption: resources.localizableStrings.ConnectionTypeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ForceChangePassword: {
					uId: "a3c751b9-544a-420b-8df0-dc3a0e3bc147",
					name: "ForceChangePassword",
					caption: resources.localizableStrings.ForceChangePasswordCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LDAPElement: {
					uId: "84e7273c-fa59-4025-a99f-0ed3948c7d47",
					name: "LDAPElement",
					caption: resources.localizableStrings.LDAPElementCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "LDAPElement",
					referenceSchema: {
						name: "LDAPElement",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				UserConnectionType: {
					uId: "57235d0d-5e90-4767-89dd-6ca3f1ba24c6",
					name: "UserConnectionType",
					caption: resources.localizableStrings.UserConnectionTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ConnectionType",
					referenceSchema: {
						name: "ConnectionType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DateTimeFormat: {
					uId: "057c3dcc-44e5-4f9d-ae7f-a78e24f255bf",
					name: "DateTimeFormat",
					caption: resources.localizableStrings.DateTimeFormatCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysLanguage",
					referenceSchema: {
						name: "SysLanguage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SysAdminUnit: {
					uId: "812c55bd-f398-4747-af46-3fa83c335c9d",
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
				SessionTimeout: {
					uId: "2e74086a-2d4c-48d1-80da-b0d2467597fb",
					name: "SessionTimeout",
					caption: resources.localizableStrings.SessionTimeoutCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwSysAdminUnit;
	});