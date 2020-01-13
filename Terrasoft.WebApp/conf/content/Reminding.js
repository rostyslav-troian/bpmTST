define("Reminding", ["terrasoft", "ext-base", "RemindingResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Reminding", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Reminding",
			singleton: true,
			uId: "ae7a5bc6-115f-4ed2-97c5-13f5c5142c37",
			name: "Reminding",
			caption: resources.localizableStrings.RemindingCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "SubjectCaption",
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
				Author: {
					uId: "29447fd8-0545-41f3-a9cb-e8d0a36f2a8f",
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
					}
				},
				Contact: {
					uId: "401431cd-1d52-4419-a1f1-7667a3544d2c",
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
				Source: {
					uId: "afe1fb47-e911-4236-b7d7-54bd55871983",
					name: "Source",
					caption: resources.localizableStrings.SourceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "RemindingSource",
					referenceSchema: {
						name: "RemindingSource",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RemindTime: {
					uId: "ce7f9708-5cbd-4316-ba39-496e33195324",
					name: "RemindTime",
					caption: resources.localizableStrings.RemindTimeCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Description: {
					uId: "7f4c5e97-b69b-4a81-ac70-5f73d2633b13",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				SubjectId: {
					uId: "051943fd-8798-43e2-bc43-cfb70fb42804",
					name: "SubjectId",
					caption: resources.localizableStrings.SubjectIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysEntitySchema: {
					uId: "e6fef746-fa59-400e-8769-444734b1a203",
					name: "SysEntitySchema",
					caption: resources.localizableStrings.SysEntitySchemaCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwSysModuleEntity",
					referenceSchema: {
						name: "VwSysModuleEntity",
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
				SubjectCaption: {
					uId: "f80d917a-4f9a-4617-b6d7-afffab1b9d57",
					name: "SubjectCaption",
					caption: resources.localizableStrings.SubjectCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				TypeCaption: {
					uId: "ee738b36-5182-42c7-9ffe-937b371f40fd",
					name: "TypeCaption",
					caption: resources.localizableStrings.TypeCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				PopupTitle: {
					uId: "a6f05909-7c06-47e6-b75e-27a23dc94154",
					name: "PopupTitle",
					caption: resources.localizableStrings.PopupTitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Hash: {
					uId: "86f8371c-ea23-4e99-9505-d424d8b6abd3",
					name: "Hash",
					caption: resources.localizableStrings.HashCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsRead: {
					uId: "57a5c5da-e5bd-4e78-a212-459ecb9a3356",
					name: "IsRead",
					caption: resources.localizableStrings.IsReadCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				NotificationType: {
					uId: "04821e69-0db1-4ef8-a967-22239620a1e1",
					name: "NotificationType",
					caption: resources.localizableStrings.NotificationTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "NotificationType",
					referenceSchema: {
						name: "NotificationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "685e7149-c015-4a4d-b4a6-2e5625a6314c"
						}
					}
				},
				Loader: {
					uId: "97932595-fb5b-4eac-8639-8b1a0e523827",
					name: "Loader",
					caption: resources.localizableStrings.LoaderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwSysModuleEntity",
					referenceSchema: {
						name: "VwSysModuleEntity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SenderId: {
					uId: "c01085ea-f81e-461c-962b-d5df12f47e69",
					name: "SenderId",
					caption: resources.localizableStrings.SenderIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsNeedToSend: {
					uId: "33e7d87a-b17f-4590-8ee4-69e19f2e82ba",
					name: "IsNeedToSend",
					caption: resources.localizableStrings.IsNeedToSendCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				AnniversaryDate: {
					uId: "e09a2804-1d9d-4eae-8eb4-2a53134f337f",
					name: "AnniversaryDate",
					caption: resources.localizableStrings.AnniversaryDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Config: {
					uId: "a1f17207-ceb7-4b10-bcb8-078494f05b21",
					name: "Config",
					caption: resources.localizableStrings.ConfigCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.Reminding;
	});