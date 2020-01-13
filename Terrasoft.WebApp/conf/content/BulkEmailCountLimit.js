define("BulkEmailCountLimit", ["terrasoft", "ext-base", "BulkEmailCountLimitResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailCountLimit", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailCountLimit",
			singleton: true,
			uId: "635902af-649c-4b18-a2d3-d6abdf0a5b29",
			name: "BulkEmailCountLimit",
			caption: resources.localizableStrings.BulkEmailCountLimitCaption,
			administratedByRecords: false,
			administratedByOperations: false,
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
				MailingLimitCount: {
					uId: "165781e6-c772-469c-8dad-a597d5e734c9",
					name: "MailingLimitCount",
					caption: resources.localizableStrings.MailingLimitCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				MailingLimitPeriod: {
					uId: "df3ef0f1-42e5-42cb-8002-7d00ac9d8e8c",
					name: "MailingLimitPeriod",
					caption: resources.localizableStrings.MailingLimitPeriodCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				OverlimitResponse: {
					uId: "9c375abd-a5cd-494e-a611-a6088f8382f0",
					name: "OverlimitResponse",
					caption: resources.localizableStrings.OverlimitResponseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "BulkEmailResponse",
					referenceSchema: {
						name: "BulkEmailResponse",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "31aaed28-5789-43ff-9801-9ff6b5956b9b"
						}
					}
				},
				Title: {
					uId: "276dfd4d-44fd-4ba3-b8ec-2445871ce373",
					name: "Title",
					caption: resources.localizableStrings.TitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				EmailCategory: {
					uId: "f6372c2a-c23b-4fa4-a7b5-5abe231d7a2d",
					name: "EmailCategory",
					caption: resources.localizableStrings.EmailCategoryCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "BulkEmailCategory",
					referenceSchema: {
						name: "BulkEmailCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				EmailType: {
					uId: "164d10a5-9311-4605-a32e-033555ebc741",
					name: "EmailType",
					caption: resources.localizableStrings.EmailTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "BulkEmailType",
					referenceSchema: {
						name: "BulkEmailType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.BulkEmailCountLimit;
	});