define("ContactSyncSettings", ["terrasoft", "ext-base", "ContactSyncSettingsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ContactSyncSettings", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ContactSyncSettings",
			singleton: true,
			uId: "9aba4e21-c6b8-46bc-8277-61daf4beac1a",
			name: "ContactSyncSettings",
			caption: resources.localizableStrings.ContactSyncSettingsCaption,
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
				ImportContacts: {
					uId: "1857d6cc-4dd8-4fe7-bb6c-764e36fbd401",
					name: "ImportContacts",
					caption: resources.localizableStrings.ImportContactsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportContactsAll: {
					uId: "3f303942-6360-4c68-be30-8e4dcdcd50ab",
					name: "ImportContactsAll",
					caption: resources.localizableStrings.ImportContactsAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportContactsFromFolders: {
					uId: "fe5bb4b5-83d5-4bfa-9da3-b763d463e3f6",
					name: "ImportContactsFromFolders",
					caption: resources.localizableStrings.ImportContactsFromFoldersCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportContactsFromCategories: {
					uId: "8f2584c3-7d7d-41b1-afef-7c728f86d0af",
					name: "ImportContactsFromCategories",
					caption: resources.localizableStrings.ImportContactsFromCategoriesCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LinkContactToAccount: {
					uId: "0f19e212-b9f1-46ed-b867-65c019df259d",
					name: "LinkContactToAccount",
					caption: resources.localizableStrings.LinkContactToAccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "LinkContactToAccount",
					referenceSchema: {
						name: "LinkContactToAccount",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "3f59b466-3535-4bb2-b9b4-bca48b43fd38"
						}
					}
				},
				ExportContactsAll: {
					uId: "cd22b101-75d7-4647-b6cc-8dacb7487f68",
					name: "ExportContactsAll",
					caption: resources.localizableStrings.ExportContactsAllCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsSelected: {
					uId: "2e26864f-596a-49bb-8d41-c927410a2e39",
					name: "ExportContactsSelected",
					caption: resources.localizableStrings.ExportContactsSelectedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsEmployers: {
					uId: "311dc25b-258c-47af-8aff-949acd7eaf98",
					name: "ExportContactsEmployers",
					caption: resources.localizableStrings.ExportContactsEmployersCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsCustomers: {
					uId: "0dd336e9-cad5-41b4-a02b-a605ff86c2d9",
					name: "ExportContactsCustomers",
					caption: resources.localizableStrings.ExportContactsCustomersCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsOwner: {
					uId: "5133841f-df33-4778-affd-3a28294aa539",
					name: "ExportContactsOwner",
					caption: resources.localizableStrings.ExportContactsOwnerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsFromGroups: {
					uId: "3c4eae93-35b3-45fb-b1e0-60f5e40d3d10",
					name: "ExportContactsFromGroups",
					caption: resources.localizableStrings.ExportContactsFromGroupsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				MailboxSyncSettings: {
					uId: "8ecdb25f-287e-4e55-9a71-02a4a9a448fa",
					name: "MailboxSyncSettings",
					caption: resources.localizableStrings.MailboxSyncSettingsCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MailboxSyncSettings",
					referenceSchema: {
						name: "MailboxSyncSettings",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "UserName"
					}
				},
				LastSyncDate: {
					uId: "611c2f35-57df-4470-bce4-65e53971899f",
					name: "LastSyncDate",
					caption: resources.localizableStrings.LastSyncDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LoadContactsFromDate: {
					uId: "9f5569be-0c50-43b3-926e-8dbb620d7ff4",
					name: "LoadContactsFromDate",
					caption: resources.localizableStrings.LoadContactsFromDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContacts: {
					uId: "9dcb834a-5305-4d3d-89e6-b3542a13c37b",
					name: "ExportContacts",
					caption: resources.localizableStrings.ExportContactsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportContactsFolders: {
					uId: "be18b76d-8843-4d5d-9dfd-9f47e3219a73",
					name: "ImportContactsFolders",
					caption: resources.localizableStrings.ImportContactsFoldersCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportContactsCategories: {
					uId: "706e6b49-ac4e-45f4-8fe7-fc6831bbbfcb",
					name: "ImportContactsCategories",
					caption: resources.localizableStrings.ImportContactsCategoriesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExportContactsGroups: {
					uId: "a1c38f1d-7ab1-4d2d-be76-ea8113437464",
					name: "ExportContactsGroups",
					caption: resources.localizableStrings.ExportContactsGroupsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.ContactSyncSettings;
	});