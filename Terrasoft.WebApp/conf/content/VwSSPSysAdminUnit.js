define("VwSSPSysAdminUnit", ["terrasoft", "ext-base", "VwSSPSysAdminUnitResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSSPSysAdminUnit", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSSPSysAdminUnit",
			singleton: true,
			uId: "f1216816-1e84-4057-8803-1710de78c14c",
			name: "VwSSPSysAdminUnit",
			caption: resources.localizableStrings.VwSSPSysAdminUnitCaption,
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				SysAdminUnitTypeValue: {
					uId: "ef7430aa-ef07-49b9-81f2-bbb571383276",
					name: "SysAdminUnitTypeValue",
					caption: resources.localizableStrings.SysAdminUnitTypeValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ParentRole: {
					uId: "80350a28-2287-47c7-b0e7-c8af5a248d4a",
					name: "ParentRole",
					caption: resources.localizableStrings.ParentRoleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwSSPSysAdminUnit",
					referenceSchema: {
						name: "VwSSPSysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Contact: {
					uId: "bc884e13-7c48-47c4-a7c3-cca07d49637c",
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
					uId: "cb5e30e1-88a5-4e56-bdf5-8ac5b923eb81",
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
					uId: "147f727d-8727-49c8-a8a8-7940e7d041de",
					name: "IsDirectoryEntry",
					caption: resources.localizableStrings.IsDirectoryEntryCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TimeZoneId: {
					uId: "152f4f27-7c72-4900-aec1-800c29c25054",
					name: "TimeZoneId",
					caption: resources.localizableStrings.TimeZoneIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				UserPassword: {
					uId: "84224e12-b439-4acc-a7bc-dfab0376499d",
					name: "UserPassword",
					caption: resources.localizableStrings.UserPasswordCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Active: {
					uId: "95a71407-8d12-4be1-b68a-0be00d656410",
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
				SynchronizeWithLDAP: {
					uId: "ac3048f6-5669-4cc0-aee1-d97ecd8b8c36",
					name: "SynchronizeWithLDAP",
					caption: resources.localizableStrings.SynchronizeWithLDAPCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LDAPEntry: {
					uId: "7ab8be01-fbeb-4349-9a58-862822584bcc",
					name: "LDAPEntry",
					caption: resources.localizableStrings.LDAPEntryCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				LDAPEntryId: {
					uId: "8a57f744-d0d8-4ed7-a6fb-33fe1a947949",
					name: "LDAPEntryId",
					caption: resources.localizableStrings.LDAPEntryIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				LDAPEntryDN: {
					uId: "88703249-cb90-48eb-84f3-bea0a61235ab",
					name: "LDAPEntryDN",
					caption: resources.localizableStrings.LDAPEntryDNCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				LoggedIn: {
					uId: "101cbc07-7abd-46dc-8753-3dd33f7b900f",
					name: "LoggedIn",
					caption: resources.localizableStrings.LoggedInCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysCulture: {
					uId: "ce54b0a2-0416-4960-8a29-b0a6bb5a1149",
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
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "PrimaryCulture"
					}
				},
				LoginAttemptCount: {
					uId: "079955c0-9132-4cde-b162-5c932c01ce67",
					name: "LoginAttemptCount",
					caption: resources.localizableStrings.LoginAttemptCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SourceControlLogin: {
					uId: "67f67dca-c733-4194-9226-4b07206b5729",
					name: "SourceControlLogin",
					caption: resources.localizableStrings.SourceControlLoginCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SourceControlPassword: {
					uId: "5208d7fa-179f-4db7-b674-434bbaed2c4e",
					name: "SourceControlPassword",
					caption: resources.localizableStrings.SourceControlPasswordCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				PasswordExpireDate: {
					uId: "08a549a5-cf3d-4931-9e93-db478f97046a",
					name: "PasswordExpireDate",
					caption: resources.localizableStrings.PasswordExpireDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				HomePage: {
					uId: "38c9ef28-0900-458c-849c-d38784445961",
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
					uId: "7796b084-9060-4d7b-b64e-f008508e6878",
					name: "ConnectionType",
					caption: resources.localizableStrings.ConnectionTypeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwSSPSysAdminUnit;
	});