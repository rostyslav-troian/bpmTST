define("Activity", ["terrasoft", "ext-base", "ActivityResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Activity", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Activity",
			singleton: true,
			uId: "c449d832-a4cc-4b01-b9d5-8a12c42a9f89",
			name: "Activity",
			caption: resources.localizableStrings.ActivityCaption,
			administratedByRecords: true,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Title",
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
				Title: {
					uId: "4dcf0a31-7fd7-4dba-a004-e413b1753431",
					name: "Title",
					caption: resources.localizableStrings.TitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 450
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
				StartDate: {
					uId: "a12ca538-61b1-4907-9fdf-01969163d4dd",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				DueDate: {
					uId: "4038ce1f-15b2-4630-abb6-0c7377ab4c9b",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				Priority: {
					uId: "4248a634-bad1-4a20-a6af-4cd85fd24630",
					name: "Priority",
					caption: resources.localizableStrings.PriorityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ActivityPriority",
					referenceSchema: {
						name: "ActivityPriority",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "ab96fa02-7fe6-df11-971b-001d60e938c6"
						}
					}
				},
				Author: {
					uId: "60c813ae-ce04-4c50-9049-affa1ce6e7b8",
					name: "Author",
					caption: resources.localizableStrings.AuthorCaption,
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
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				RemindToAuthor: {
					uId: "0d677c6b-95fd-47e2-a8b1-eadea6767eff",
					name: "RemindToAuthor",
					caption: resources.localizableStrings.RemindToAuthorCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RemindToAuthorDate: {
					uId: "69e70c11-5851-467a-b74b-15d3505e4f57",
					name: "RemindToAuthorDate",
					caption: resources.localizableStrings.RemindToAuthorDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Owner: {
					uId: "f0736fa3-79d1-4760-ae69-96ec56993491",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
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
				RemindToOwner: {
					uId: "de2d9c7f-a8b4-4f28-85d3-ee2593ac0f00",
					name: "RemindToOwner",
					caption: resources.localizableStrings.RemindToOwnerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RemindToOwnerDate: {
					uId: "9917a146-aa6a-46d0-bd35-a9356c4d4992",
					name: "RemindToOwnerDate",
					caption: resources.localizableStrings.RemindToOwnerDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Type: {
					uId: "5491c33f-e927-4ca8-a579-d4810ea54c56",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ActivityType",
					referenceSchema: {
						name: "ActivityType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "fbe0acdc-cfc0-df11-b00f-001d60e938c6"
						}
					}
				},
				ActivityCategory: {
					uId: "c814fa71-e01b-4325-ac8d-8d4a293ed138",
					name: "ActivityCategory",
					caption: resources.localizableStrings.ActivityCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ActivityCategory",
					referenceSchema: {
						name: "ActivityCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "f51c4643-58e6-df11-971b-001d60e938c6"
						}
					}
				},
				ShowInScheduler: {
					uId: "ff2dec51-885c-428a-8e6a-80c0c14b1434",
					name: "ShowInScheduler",
					caption: resources.localizableStrings.ShowInSchedulerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Status: {
					uId: "c8d84f9c-b48b-479b-9ac6-4412f3436ca2",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ActivityStatus",
					referenceSchema: {
						name: "ActivityStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "384d4b84-58e6-df11-971b-001d60e938c6"
						}
					}
				},
				Result: {
					uId: "ae372cfa-a21f-47f0-8a64-17d137ebe966",
					name: "Result",
					caption: resources.localizableStrings.ResultCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "ActivityResult",
					referenceSchema: {
						name: "ActivityResult",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DetailedResult: {
					uId: "070b689f-c9d8-46e3-bb52-bcb1f430f5cf",
					name: "DetailedResult",
					caption: resources.localizableStrings.DetailedResultCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				TimeZone: {
					uId: "06ff3e76-36f0-44d2-8f07-ffb752ffde09",
					name: "TimeZone",
					caption: resources.localizableStrings.TimeZoneCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "TimeZone",
					referenceSchema: {
						name: "TimeZone",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Account: {
					uId: "fb0d6fd1-17a1-4a04-a155-a4b643c6d048",
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
				Contact: {
					uId: "bfaa9c7f-c368-4402-8310-a17660faf148",
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
				Sender: {
					uId: "52b16ed8-6a96-4c0d-9887-4ba8cbb953e9",
					name: "Sender",
					caption: resources.localizableStrings.SenderCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Recepient: {
					uId: "0cb5732f-80c0-41ab-a51a-8a509143a98b",
					name: "Recepient",
					caption: resources.localizableStrings.RecepientCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CopyRecepient: {
					uId: "b2e5a95e-72e6-4985-b9b2-af1c335ed333",
					name: "CopyRecepient",
					caption: resources.localizableStrings.CopyRecepientCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				BlindCopyRecepient: {
					uId: "a1502eb1-c06a-4e2e-8010-f51eed7315d4",
					name: "BlindCopyRecepient",
					caption: resources.localizableStrings.BlindCopyRecepientCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Body: {
					uId: "618e7503-83b1-452d-aa33-8f76792853b5",
					name: "Body",
					caption: resources.localizableStrings.BodyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Notes: {
					uId: "961b5183-9eff-4424-b7f8-ee5267b489b6",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Color: {
					uId: "b5b47ef8-e084-4cb0-bf59-19b3199014c7",
					name: "Color",
					caption: resources.localizableStrings.ColorCaption,
					dataValueType: Terrasoft.DataValueType.COLOR,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: "#405f97"
					},
					size: 250
				},
				SendDate: {
					uId: "6689a019-c904-4b25-a89d-d17f3f3767cc",
					name: "SendDate",
					caption: resources.localizableStrings.SendDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EmailSendStatus: {
					uId: "4935a122-b7bc-443c-a282-72bd82f76ec4",
					name: "EmailSendStatus",
					caption: resources.localizableStrings.EmailSendStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "EmailSendStatus",
					referenceSchema: {
						name: "EmailSendStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DurationInMinutes: {
					uId: "dd115e6f-5443-4238-97d5-3f9c36d8a9db",
					name: "DurationInMinutes",
					caption: resources.localizableStrings.DurationInMinutesCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ErrorOnSend: {
					uId: "5ff0586c-bedc-4c23-84f3-086402411dbb",
					name: "ErrorOnSend",
					caption: resources.localizableStrings.ErrorOnSendCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				DurationInMnutesAndHours: {
					uId: "487c8731-254d-4f2d-b152-9d823db2fc51",
					name: "DurationInMnutesAndHours",
					caption: resources.localizableStrings.DurationInMnutesAndHoursCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				AllowedResult: {
					uId: "7bb00970-c11a-4a5a-82e5-d0a613afde06",
					name: "AllowedResult",
					caption: resources.localizableStrings.AllowedResultCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 1,
					isInherited: false,
					isValueCloneable: false
				},
				CreatedByInvCRM: {
					uId: "c7636768-5007-4cb9-800f-0d729fcadf4f",
					name: "CreatedByInvCRM",
					caption: resources.localizableStrings.CreatedByInvCRMCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				MessageType: {
					uId: "af5a73d3-20ec-4419-819b-1575ce196bd2",
					name: "MessageType",
					caption: resources.localizableStrings.MessageTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EmailType",
					referenceSchema: {
						name: "EmailType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
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
				IsHtmlBody: {
					uId: "80fd1395-7e28-485e-a566-82fa964ba80b",
					name: "IsHtmlBody",
					caption: resources.localizableStrings.IsHtmlBodyCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				MailHash: {
					uId: "1c19adcd-d3b5-4403-b515-b5c2cc9e481c",
					name: "MailHash",
					caption: resources.localizableStrings.MailHashCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ProcessElementId: {
					uId: "ee2173fc-0840-4735-8c14-b58b6e3d9b99",
					name: "ProcessElementId",
					caption: resources.localizableStrings.ProcessElementIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				GlobalActivityID: {
					uId: "d480d73a-f329-47f2-a0a2-cac4e82a2a40",
					name: "GlobalActivityID",
					caption: resources.localizableStrings.GlobalActivityIDCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Case: {
					uId: "47c4dc47-8529-4d0e-a6fa-f298bb20cd13",
					name: "Case",
					caption: resources.localizableStrings.CaseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Case",
					referenceSchema: {
						name: "Case",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				UserEmailAddress: {
					uId: "024c7e3b-9ce7-4ec6-aaf5-bdedd07ac300",
					name: "UserEmailAddress",
					caption: resources.localizableStrings.UserEmailAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				IsNeedProcess: {
					uId: "004b1104-cc46-4865-b079-f23d2665c922",
					name: "IsNeedProcess",
					caption: resources.localizableStrings.IsNeedProcessCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActivityConnection: {
					uId: "2bbd4d7c-2727-47d6-bde1-311fdbbbb97e",
					name: "ActivityConnection",
					caption: resources.localizableStrings.ActivityConnectionCaption,
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
				Organizer: {
					uId: "734dfca1-2478-4719-8f3c-bfe3c6d1813d",
					name: "Organizer",
					caption: resources.localizableStrings.OrganizerCaption,
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
				IsNotPublished: {
					uId: "fe3732e9-7b58-4e30-afc3-b121bba13a8c",
					name: "IsNotPublished",
					caption: resources.localizableStrings.IsNotPublishedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Location: {
					uId: "be1d624b-b774-40ab-85cc-9364dacd6199",
					name: "Location",
					caption: resources.localizableStrings.LocationCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 500
				},
				CallDirection: {
					uId: "a3d9fc18-5ad2-486f-9efd-be29f0d4429a",
					name: "CallDirection",
					caption: resources.localizableStrings.CallDirectionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CallDirection",
					referenceSchema: {
						name: "CallDirection",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "1d96a65f-2131-4916-8825-2d142b1000b2"
						}
					}
				},
				HeaderProperties: {
					uId: "3f1f6edd-5b9c-45d5-9575-edcf22c54893",
					name: "HeaderProperties",
					caption: resources.localizableStrings.HeaderPropertiesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EnrchEmailData: {
					uId: "ace5b35d-0166-48ca-b2d4-20add837dbbd",
					name: "EnrchEmailData",
					caption: resources.localizableStrings.EnrchEmailDataCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EnrchEmailData",
					referenceSchema: {
						name: "EnrchEmailData",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Hash"
					}
				},
				EnrichStatus: {
					uId: "1c44eeca-97e9-4a02-a9a7-fff0eb8a4afb",
					name: "EnrichStatus",
					caption: resources.localizableStrings.EnrichStatusCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 50
				},
				ServiceProcessed: {
					uId: "1b3d86ae-616d-49c5-b738-63b2a25c9607",
					name: "ServiceProcessed",
					caption: resources.localizableStrings.ServiceProcessedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IsAutoSubmitted: {
					uId: "7737db5f-7bab-4188-9d8e-a89636a84370",
					name: "IsAutoSubmitted",
					caption: resources.localizableStrings.IsAutoSubmittedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SenderContact: {
					uId: "67551707-45c4-4d2b-a77b-683eb8aa5fe1",
					name: "SenderContact",
					caption: resources.localizableStrings.SenderContactCaption,
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
				Opportunity: {
					uId: "4684d4ba-4b6b-4d1a-93fb-70ec2afed57f",
					name: "Opportunity",
					caption: resources.localizableStrings.OpportunityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Opportunity",
					referenceSchema: {
						name: "Opportunity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				Lead: {
					uId: "d6e94162-4354-413a-bc84-e118df5e852e",
					name: "Lead",
					caption: resources.localizableStrings.LeadCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Lead",
					referenceSchema: {
						name: "Lead",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "LeadName"
					}
				},
				Contract: {
					uId: "8b9e6930-54d2-4533-ab94-865a0c5d7db7",
					name: "Contract",
					caption: resources.localizableStrings.ContractCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contract",
					referenceSchema: {
						name: "Contract",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Invoice: {
					uId: "8da997ed-5182-472b-8818-6d146ca6b156",
					name: "Invoice",
					caption: resources.localizableStrings.InvoiceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Invoice",
					referenceSchema: {
						name: "Invoice",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Project: {
					uId: "e2d77c79-645a-450c-b4bd-0bbf55588489",
					name: "Project",
					caption: resources.localizableStrings.ProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				FullProjectName: {
					uId: "a07b44ec-9d82-4c14-a5a6-a7bc4a1c9354",
					name: "FullProjectName",
					caption: resources.localizableStrings.FullProjectNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Order: {
					uId: "e6098162-2f14-42af-833f-a83c8ce8e78c",
					name: "Order",
					caption: resources.localizableStrings.OrderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Order",
					referenceSchema: {
						name: "Order",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Event: {
					uId: "00c2b73d-e1eb-4097-ab86-663735696f9b",
					name: "Event",
					caption: resources.localizableStrings.EventCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Event",
					referenceSchema: {
						name: "Event",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Document: {
					uId: "f6137557-741e-42f8-8bf6-69b2524a83f7",
					name: "Document",
					caption: resources.localizableStrings.DocumentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Document",
					referenceSchema: {
						name: "Document",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				QueueItem: {
					uId: "8235b9b7-a369-44f2-98e4-aa7d291da2c9",
					name: "QueueItem",
					caption: resources.localizableStrings.QueueItemCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwQueueItem",
					referenceSchema: {
						name: "VwQueueItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				Preview: {
					uId: "6bb4799d-c450-4d98-ae51-a92e9689c358",
					name: "Preview",
					caption: resources.localizableStrings.PreviewCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				}
			}
		});
		return Terrasoft.Activity;
	});