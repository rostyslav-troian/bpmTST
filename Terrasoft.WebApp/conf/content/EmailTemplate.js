define("EmailTemplate", ["terrasoft", "ext-base", "EmailTemplateResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.EmailTemplate", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.EmailTemplate",
			singleton: true,
			uId: "93030575-f70f-4041-902e-c4badaf62c63",
			name: "EmailTemplate",
			caption: resources.localizableStrings.EmailTemplateCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
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
				Name: {
					uId: "ca53e2c8-0767-4f2c-8a18-2ee5821f134e",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				Object: {
					uId: "26bd9f25-0d50-4c47-829f-8b286576317c",
					name: "Object",
					caption: resources.localizableStrings.ObjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwSysSchemaInfo",
					referenceSchema: {
						name: "VwSysSchemaInfo",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				Recipient: {
					uId: "382c1794-3e8d-4895-91ce-02c9f5e3553e",
					name: "Recipient",
					caption: resources.localizableStrings.RecipientCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CopyRecipient: {
					uId: "085d7c7c-fdbc-443a-ad06-1f04ace34173",
					name: "CopyRecipient",
					caption: resources.localizableStrings.CopyRecipientCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				BlindCopyRecipient: {
					uId: "47e72ecd-b21c-4b09-933e-6c1263381425",
					name: "BlindCopyRecipient",
					caption: resources.localizableStrings.BlindCopyRecipientCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Subject: {
					uId: "2e7c35e3-0774-4a4a-bea5-6ce4c8de1465",
					name: "Subject",
					caption: resources.localizableStrings.SubjectCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				Priority: {
					uId: "feab52f3-9df5-4499-8425-855973838905",
					name: "Priority",
					caption: resources.localizableStrings.PriorityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ActivityPriority",
					referenceSchema: {
						name: "ActivityPriority",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Body: {
					uId: "54425b16-8b5b-40a1-baf1-3997560a6b0e",
					name: "Body",
					caption: resources.localizableStrings.BodyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsHtmlBody: {
					uId: "698c2960-3832-4ba4-ad56-8a6489b32ad4",
					name: "IsHtmlBody",
					caption: resources.localizableStrings.IsHtmlBodyCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Macros: {
					uId: "e6618002-83f7-419a-a866-63ea7599b123",
					name: "Macros",
					caption: resources.localizableStrings.MacrosCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SendIndividualEmail: {
					uId: "cf75d513-0d42-439c-b19f-8c7fe4234460",
					name: "SendIndividualEmail",
					caption: resources.localizableStrings.SendIndividualEmailCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EmailTemplateSendFlag",
					referenceSchema: {
						name: "EmailTemplateSendFlag",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "e75ac3fe-be9b-4a01-87db-c7dffd354f8c"
						}
					}
				},
				SaveAsActivity: {
					uId: "613d189f-c6a0-4ec4-b2b0-a43199cacef4",
					name: "SaveAsActivity",
					caption: resources.localizableStrings.SaveAsActivityCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ObjectFieldInActivity: {
					uId: "b1b8aa8c-787f-42e0-8af1-603d1761f75a",
					name: "ObjectFieldInActivity",
					caption: resources.localizableStrings.ObjectFieldInActivityCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ShowBeforeSending: {
					uId: "aa4c5784-7f68-47d8-b7bb-ee3f89221ac8",
					name: "ShowBeforeSending",
					caption: resources.localizableStrings.ShowBeforeSendingCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TemplateConfig: {
					uId: "b4972436-c042-4a3b-a025-f04575f10532",
					name: "TemplateConfig",
					caption: resources.localizableStrings.TemplateConfigCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ConfigType: {
					uId: "f73ea119-e10f-4db3-a89f-02b338f69444",
					name: "ConfigType",
					caption: resources.localizableStrings.ConfigTypeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				PreviewImage: {
					uId: "1fea7f02-7faa-4a8b-a1f9-ee4e05fef97d",
					name: "PreviewImage",
					caption: resources.localizableStrings.PreviewImageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysImage",
					referenceSchema: {
						name: "SysImage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.EmailTemplate;
	});