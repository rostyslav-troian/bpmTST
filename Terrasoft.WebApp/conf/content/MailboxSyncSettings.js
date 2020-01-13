define("MailboxSyncSettings", ["terrasoft", "ext-base", "MailboxSyncSettingsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.MailboxSyncSettings", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.MailboxSyncSettings",
			singleton: true,
			uId: "5e487721-02e2-48ee-b755-dfa5160f5315",
			name: "MailboxSyncSettings",
			caption: resources.localizableStrings.MailboxSyncSettingsCaption,
			administratedByRecords: true,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "UserName",
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
				SysAdminUnit: {
					uId: "b238f1d8-39c2-4498-b0a1-d63f123309ea",
					name: "SysAdminUnit",
					caption: resources.localizableStrings.SysAdminUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUser"
					}
				},
				MailServer: {
					uId: "04423276-208b-4661-8602-6b6eadd409b9",
					name: "MailServer",
					caption: resources.localizableStrings.MailServerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "MailServer",
					referenceSchema: {
						name: "MailServer",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				UserName: {
					uId: "3490d31d-b9b4-4017-a5c4-3019416d0c0e",
					name: "UserName",
					caption: resources.localizableStrings.UserNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				UserPassword: {
					uId: "6f989bb4-4185-4531-87c8-62927005896b",
					name: "UserPassword",
					caption: resources.localizableStrings.UserPasswordCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				EnableMailSynhronization: {
					uId: "ead0a7dd-f3e3-4679-b766-d8a9f70b2b53",
					name: "EnableMailSynhronization",
					caption: resources.localizableStrings.EnableMailSynhronizationCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				AutomaticallyAddNewEmails: {
					uId: "1dd6b43d-22e9-49f5-9676-f4e93fffc0a5",
					name: "AutomaticallyAddNewEmails",
					caption: resources.localizableStrings.AutomaticallyAddNewEmailsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CyclicallyAddNewEmails: {
					uId: "5b147af6-5886-41cd-b7aa-2ba9a253aab5",
					name: "CyclicallyAddNewEmails",
					caption: resources.localizableStrings.CyclicallyAddNewEmailsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EmailsCyclicallyAddingInterval: {
					uId: "04e621fc-8584-4c36-b616-5e790d2d28ca",
					name: "EmailsCyclicallyAddingInterval",
					caption: resources.localizableStrings.EmailsCyclicallyAddingIntervalCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "MailboxSyncInterval"
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
				IsCustomFlagsNotSuported: {
					uId: "c8b179f9-5a7e-4c20-944e-b6930162b98f",
					name: "IsCustomFlagsNotSuported",
					caption: resources.localizableStrings.IsCustomFlagsNotSuportedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				LastSyncDate: {
					uId: "64ef7eb3-9995-497d-9c61-e4e09e951132",
					name: "LastSyncDate",
					caption: resources.localizableStrings.LastSyncDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsShared: {
					uId: "bd47456d-aeb5-4454-b2ce-f6dff54a7794",
					name: "IsShared",
					caption: resources.localizableStrings.IsSharedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SendEmailsViaThisAccount: {
					uId: "e727b47c-883f-4fdf-94aa-e85369c2f8f1",
					name: "SendEmailsViaThisAccount",
					caption: resources.localizableStrings.SendEmailsViaThisAccountCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsDefault: {
					uId: "2b8a9515-0fd9-40ea-84d2-ba1fa641e03e",
					name: "IsDefault",
					caption: resources.localizableStrings.IsDefaultCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LoadAllEmailsFromMailBox: {
					uId: "d52de6c0-104f-4d78-8e92-3376e97a8268",
					name: "LoadAllEmailsFromMailBox",
					caption: resources.localizableStrings.LoadAllEmailsFromMailBoxCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LoadEmailsFromDate: {
					uId: "705a60bf-aee9-4168-993d-ed634328174c",
					name: "LoadEmailsFromDate",
					caption: resources.localizableStrings.LoadEmailsFromDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDate"
					}
				},
				MailboxName: {
					uId: "06c19861-2ce5-4eb7-88b0-117c28deecf4",
					name: "MailboxName",
					caption: resources.localizableStrings.MailboxNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SenderEmailAddress: {
					uId: "1400f977-628f-4ebe-bcdb-9fbd661d4799",
					name: "SenderEmailAddress",
					caption: resources.localizableStrings.SenderEmailAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				MailSyncPeriod: {
					uId: "6c99d648-2324-4384-8330-b32cf258cb37",
					name: "MailSyncPeriod",
					caption: resources.localizableStrings.MailSyncPeriodCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MailSyncPeriod",
					referenceSchema: {
						name: "MailSyncPeriod",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "2d480351-94b7-4cad-b02f-885730c7eb3e"
						}
					}
				},
				IsAnonymousAuthentication: {
					uId: "f13ef65d-d5d7-4ef4-af7f-0091a818d68d",
					name: "IsAnonymousAuthentication",
					caption: resources.localizableStrings.IsAnonymousAuthenticationCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				ExchangeAutoSynchronization: {
					uId: "befec718-bb2e-4b77-95b3-f421c0a72196",
					name: "ExchangeAutoSynchronization",
					caption: resources.localizableStrings.ExchangeAutoSynchronizationCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				ExchangeSyncInterval: {
					uId: "d55aa1b5-9c33-4635-9aef-0e1d5a80f96e",
					name: "ExchangeSyncInterval",
					caption: resources.localizableStrings.ExchangeSyncIntervalCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "MailboxSyncInterval"
					}
				},
				ContactSyncInterval: {
					uId: "a08de309-02eb-45f1-84a0-d627fcfe054f",
					name: "ContactSyncInterval",
					caption: resources.localizableStrings.ContactSyncIntervalCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "MailboxSyncInterval"
					}
				},
				ExchangeAutoSyncActivity: {
					uId: "e4fe0282-0d7d-4eaf-8dd2-69edeab162d7",
					name: "ExchangeAutoSyncActivity",
					caption: resources.localizableStrings.ExchangeAutoSyncActivityCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SenderDisplayValue: {
					uId: "70615ebe-d19c-4f72-bc86-bfb4df3d0e7e",
					name: "SenderDisplayValue",
					caption: resources.localizableStrings.SenderDisplayValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Signature: {
					uId: "7a199eeb-e500-49fd-b0ad-9b67a46c2954",
					name: "Signature",
					caption: resources.localizableStrings.SignatureCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				UseSignature: {
					uId: "a1893376-351f-4313-ac3c-9cce40a90fb7",
					name: "UseSignature",
					caption: resources.localizableStrings.UseSignatureCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActualizeMessageRelations: {
					uId: "15fdc6ab-dabd-4cae-bd25-8a43e6b9e4e2",
					name: "ActualizeMessageRelations",
					caption: resources.localizableStrings.ActualizeMessageRelationsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				MessageLanguage: {
					uId: "3b904cdb-75c1-4c56-89ed-aaf18f956a91",
					name: "MessageLanguage",
					caption: resources.localizableStrings.MessageLanguageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysLanguage",
					referenceSchema: {
						name: "SysLanguage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LastError: {
					uId: "2c6db188-9b8b-4f1c-8be7-150749951df2",
					name: "LastError",
					caption: resources.localizableStrings.LastErrorCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ErrorCode: {
					uId: "286e13db-feea-4cb1-94eb-1243692da2b1",
					name: "ErrorCode",
					caption: resources.localizableStrings.ErrorCodeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SyncErrorMessage",
					referenceSchema: {
						name: "SyncErrorMessage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RetryCounter: {
					uId: "1117201b-9272-4977-b4bb-fb4e958c272b",
					name: "RetryCounter",
					caption: resources.localizableStrings.RetryCounterCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				OAuthTokenStorage: {
					uId: "ce5f1f0d-f5f9-42b6-b855-8ec26bc97177",
					name: "OAuthTokenStorage",
					caption: resources.localizableStrings.OAuthTokenStorageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OAuthTokenStorage",
					referenceSchema: {
						name: "OAuthTokenStorage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "UserAppLogin"
					}
				},
				SyncDateMinutesOffset: {
					uId: "6ddcc001-933c-4c78-8e0d-c9804c067489",
					name: "SyncDateMinutesOffset",
					caption: resources.localizableStrings.SyncDateMinutesOffsetCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 5
					}
				},
				SendWebsocketNotifications: {
					uId: "13a7f989-c37b-415d-a681-84d0f520eb87",
					name: "SendWebsocketNotifications",
					caption: resources.localizableStrings.SendWebsocketNotificationsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				PersonalMetrics: {
					uId: "fe0b3b4a-7029-4031-b6a8-1718944fc658",
					name: "PersonalMetrics",
					caption: resources.localizableStrings.PersonalMetricsCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SynchronizationStopped: {
					uId: "a5839346-f78d-43e6-964a-e108f8f129d8",
					name: "SynchronizationStopped",
					caption: resources.localizableStrings.SynchronizationStoppedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.MailboxSyncSettings;
	});