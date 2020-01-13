define("SocialAccount", ["terrasoft", "ext-base", "SocialAccountResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SocialAccount", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SocialAccount",
			singleton: true,
			uId: "76e3d8e8-6c6b-48b5-9f43-3b361c368bff",
			name: "SocialAccount",
			caption: resources.localizableStrings.SocialAccountCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Login",
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
				Notes: {
					uId: "abc96728-faf6-451d-91f6-35bc53ea9745",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Login: {
					uId: "6a86e81d-86b2-4650-b1dc-fd775bd0a277",
					name: "Login",
					caption: resources.localizableStrings.LoginCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Public: {
					uId: "6287d2bd-93ac-4ca2-921f-3e87d81dc00b",
					name: "Public",
					caption: resources.localizableStrings.PublicCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				AccessToken: {
					uId: "14f15a6f-d70a-4c77-8f00-984f7bc1821f",
					name: "AccessToken",
					caption: resources.localizableStrings.AccessTokenCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				AccessSecretToken: {
					uId: "ef8d65a0-3f11-43ac-a259-a28a34494d23",
					name: "AccessSecretToken",
					caption: resources.localizableStrings.AccessSecretTokenCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ConsumerKey: {
					uId: "eee3f2c0-52b4-4d86-95bf-bf4d7fe00f24",
					name: "ConsumerKey",
					caption: resources.localizableStrings.ConsumerKeyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Type: {
					uId: "6be6d2f0-6c1c-463b-8daa-972f1687ec4f",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CommunicationType",
					referenceSchema: {
						name: "CommunicationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				User: {
					uId: "f22ba771-1414-4be2-9ff8-3028ce093bcf",
					name: "User",
					caption: resources.localizableStrings.UserCaption,
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
				SocialId: {
					uId: "72ef9eba-b06f-4bda-b9e1-4c04309aaf5e",
					name: "SocialId",
					caption: resources.localizableStrings.SocialIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				IsExpired: {
					uId: "e2a409c4-5ace-48d0-ac77-766ed29cb397",
					name: "IsExpired",
					caption: resources.localizableStrings.IsExpiredCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true
				},
				Name: {
					uId: "bbaf2034-8e52-432d-849c-9ddf83e19d6f",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
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
				}
			}
		});
		return Terrasoft.SocialAccount;
	});