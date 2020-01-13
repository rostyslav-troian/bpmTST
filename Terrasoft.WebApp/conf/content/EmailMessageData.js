define("EmailMessageData", ["terrasoft", "ext-base", "EmailMessageDataResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.EmailMessageData", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.EmailMessageData",
			singleton: true,
			uId: "d586ebed-2570-4fc6-89b5-88f55402e04c",
			name: "EmailMessageData",
			caption: resources.localizableStrings.EmailMessageDataCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "MessageId",
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
				Activity: {
					uId: "593747ea-b4c5-497b-8f1e-0aecc9ba023b",
					name: "Activity",
					caption: resources.localizableStrings.ActivityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Activity",
					referenceSchema: {
						name: "Activity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title",
						primaryOrderColumnName: "StartDate"
					}
				},
				Owner: {
					uId: "4e8a7d7e-efd7-4cfd-83f8-7a141b736525",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
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
				Role: {
					uId: "29828f20-9dbf-4731-b12f-79111d4a6ed5",
					name: "Role",
					caption: resources.localizableStrings.RoleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ActivityParticipantRole",
					referenceSchema: {
						name: "ActivityParticipantRole",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Headers: {
					uId: "32d95dc9-9962-467c-907f-ea831d419c11",
					name: "Headers",
					caption: resources.localizableStrings.HeadersCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsNeedProcess: {
					uId: "27d93a81-5dad-4130-a748-b19eeb4e9612",
					name: "IsNeedProcess",
					caption: resources.localizableStrings.IsNeedProcessCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				MailboxSyncSettings: {
					uId: "d72d0bdd-f8f8-4a18-8812-fcd128bce85a",
					name: "MailboxSyncSettings",
					caption: resources.localizableStrings.MailboxSyncSettingsCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				MessageId: {
					uId: "d3e7065a-85fb-442f-8f45-54399af7a517",
					name: "MessageId",
					caption: resources.localizableStrings.MessageIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 450
				},
				InReplyTo: {
					uId: "9b6128d9-24ed-44ce-afaf-3d9588221b50",
					name: "InReplyTo",
					caption: resources.localizableStrings.InReplyToCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 450
				},
				ParentMessage: {
					uId: "324cddd2-7eab-4838-9bb8-4d2eac6f84ad",
					name: "ParentMessage",
					caption: resources.localizableStrings.ParentMessageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EmailMessageData",
					referenceSchema: {
						name: "EmailMessageData",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "MessageId"
					}
				},
				SyncSessionId: {
					uId: "8fd6f559-3d65-41e5-910d-f19e2c4aa633",
					name: "SyncSessionId",
					caption: resources.localizableStrings.SyncSessionIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ExchangeThreadId: {
					uId: "9ed2272f-1273-4c95-a1ac-3575806dc3a5",
					name: "ExchangeThreadId",
					caption: resources.localizableStrings.ExchangeThreadIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExchangeThreadPosition: {
					uId: "2720e24c-c065-4196-a5f1-b036efbf7ac7",
					name: "ExchangeThreadPosition",
					caption: resources.localizableStrings.ExchangeThreadPositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				References: {
					uId: "4ad47c60-a5c6-4f06-953a-a8ec16bb8712",
					name: "References",
					caption: resources.localizableStrings.ReferencesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ConversationId: {
					uId: "7ca7d624-5624-4414-8146-54d95b54e851",
					name: "ConversationId",
					caption: resources.localizableStrings.ConversationIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SendDate: {
					uId: "f8b6d415-7b35-4c3d-ab55-97f05f811d5c",
					name: "SendDate",
					caption: resources.localizableStrings.SendDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.EmailMessageData;
	});