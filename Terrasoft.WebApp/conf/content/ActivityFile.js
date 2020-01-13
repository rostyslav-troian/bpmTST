define("ActivityFile", ["terrasoft", "ext-base", "ActivityFileResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ActivityFile", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ActivityFile",
			singleton: true,
			uId: "080c9917-7ec9-42e5-86ff-75a683d4f124",
			name: "ActivityFile",
			caption: resources.localizableStrings.ActivityFileCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: true,
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
				Name: {
					uId: "4a35bb09-6c8c-4de8-8773-4e9e3b3cf3b0",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Notes: {
					uId: "8f7c60c3-7d35-4de4-a234-6e18470eb34c",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				LockedBy: {
					uId: "6b37344b-b460-44c5-9fd7-a623689bba4c",
					name: "LockedBy",
					caption: resources.localizableStrings.LockedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LockedOn: {
					uId: "f906243b-8d5c-48f0-8220-89d5c9175806",
					name: "LockedOn",
					caption: resources.localizableStrings.LockedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Data: {
					uId: "73c5b07b-3c1a-44fc-953e-f2ce6cbb7420",
					name: "Data",
					caption: resources.localizableStrings.DataCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Type: {
					uId: "6255f70e-45c9-4346-8ee0-8d604459e7d8",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "FileType",
					referenceSchema: {
						name: "FileType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Version: {
					uId: "8d8676ce-6974-4157-9a96-841d4499fccb",
					name: "Version",
					caption: resources.localizableStrings.VersionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Size: {
					uId: "5d9d91dd-892d-4652-8da1-e7a53b96ba4a",
					name: "Size",
					caption: resources.localizableStrings.SizeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
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
					uId: "e579e0c7-e688-4dd2-8246-fdbebd280e60",
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
				CreatedByInvCRM: {
					uId: "abd11aa6-3deb-4fcb-ab6e-c4a6d024c9f7",
					name: "CreatedByInvCRM",
					caption: resources.localizableStrings.CreatedByInvCRMCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Uploaded: {
					uId: "6118d0d6-aaf7-42d8-b8d1-e7cd83431798",
					name: "Uploaded",
					caption: resources.localizableStrings.UploadedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				ErrorOnUpload: {
					uId: "d9222c5f-fde3-4339-9b92-dd09a65a5dc3",
					name: "ErrorOnUpload",
					caption: resources.localizableStrings.ErrorOnUploadCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ExternalStorageProperties: {
					uId: "4e02d938-dfb6-40ca-afe9-acb7b135983c",
					name: "ExternalStorageProperties",
					caption: resources.localizableStrings.ExternalStoragePropertiesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Inline: {
					uId: "f900065f-2607-472c-8010-2c2fa81d29e8",
					name: "Inline",
					caption: resources.localizableStrings.InlineCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				}
			}
		});
		return Terrasoft.ActivityFile;
	});