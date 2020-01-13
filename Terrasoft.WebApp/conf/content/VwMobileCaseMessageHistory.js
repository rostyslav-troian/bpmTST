define("VwMobileCaseMessageHistory", ["terrasoft", "ext-base", "VwMobileCaseMessageHistoryResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwMobileCaseMessageHistory", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwMobileCaseMessageHistory",
			singleton: true,
			uId: "9f851290-67ae-4e38-ac05-3bd7ffe86821",
			name: "VwMobileCaseMessageHistory",
			caption: resources.localizableStrings.VwMobileCaseMessageHistoryCaption,
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
				OwnerName: {
					uId: "c5f64e2d-8e8b-4f52-973b-ddb7e9a11e5b",
					name: "OwnerName",
					caption: resources.localizableStrings.OwnerNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				OwnerPhoto: {
					uId: "a03c3851-f65a-463d-a793-cb6d2e609c24",
					name: "OwnerPhoto",
					caption: resources.localizableStrings.OwnerPhotoCaption,
					dataValueType: Terrasoft.DataValueType.IMAGELOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SysImage",
					referenceSchema: {
						name: "SysImage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Message: {
					uId: "db4ab965-c6bf-4477-93df-914b95ef81b7",
					name: "Message",
					caption: resources.localizableStrings.MessageCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				MessageNotifier: {
					uId: "93a4d10d-b00c-4476-9612-6a64fc8742b4",
					name: "MessageNotifier",
					caption: resources.localizableStrings.MessageNotifierCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MessageNotifier",
					referenceSchema: {
						name: "MessageNotifier",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RecordId: {
					uId: "016dd985-12b9-4baf-9ec4-4582d87afa5d",
					name: "RecordId",
					caption: resources.localizableStrings.RecordIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Case: {
					uId: "56c45e1f-5f3e-4e95-a3b7-55aea79e6726",
					name: "Case",
					caption: resources.localizableStrings.CaseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Case",
					referenceSchema: {
						name: "Case",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Recepient: {
					uId: "48deec8d-f2f4-4edf-ac78-f0c22088d1a7",
					name: "Recepient",
					caption: resources.localizableStrings.RecepientCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				HasAttachment: {
					uId: "54b06fa9-e4fd-4351-93ef-991cf2ba37cb",
					name: "HasAttachment",
					caption: resources.localizableStrings.HasAttachmentCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwMobileCaseMessageHistory;
	});