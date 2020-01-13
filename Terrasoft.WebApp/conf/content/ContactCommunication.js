define("ContactCommunication", ["terrasoft", "ext-base", "ContactCommunicationResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ContactCommunication", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ContactCommunication",
			singleton: true,
			uId: "004a9121-21f8-4a1e-8918-45c0f756ea41",
			name: "ContactCommunication",
			caption: resources.localizableStrings.ContactCommunicationCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: true,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Number",
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
				CommunicationType: {
					uId: "12f1d73a-43c5-4a52-9bd6-3e0ecafd3fb4",
					name: "CommunicationType",
					caption: resources.localizableStrings.CommunicationTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
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
				Number: {
					uId: "02fcae57-fafa-4e4f-9367-b58317a6e2ec",
					name: "Number",
					caption: resources.localizableStrings.NumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Contact: {
					uId: "cf226458-c1c0-4d0c-afe5-41664f2d570e",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
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
					}
				},
				Position: {
					uId: "0c103353-496a-4ff9-a8eb-877dfed4af26",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				SocialMediaId: {
					uId: "c8c5a7d8-f9c8-420a-af2a-cdb3f130e16d",
					name: "SocialMediaId",
					caption: resources.localizableStrings.SocialMediaIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				SearchNumber: {
					uId: "44278aac-22bf-44eb-8b94-c5e9b3525027",
					name: "SearchNumber",
					caption: resources.localizableStrings.SearchNumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
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
				},
				NonActual: {
					uId: "ad63b6ff-8842-4d58-ba4a-8e4ff366964b",
					name: "NonActual",
					caption: resources.localizableStrings.NonActualCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				NonActualReason: {
					uId: "88fe3140-5c42-4b10-898a-95b988e40720",
					name: "NonActualReason",
					caption: resources.localizableStrings.NonActualReasonCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "NonActualReason",
					referenceSchema: {
						name: "NonActualReason",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DateSetNonActual: {
					uId: "dfed1095-db33-4c53-9a03-6fa884b9cc3f",
					name: "DateSetNonActual",
					caption: resources.localizableStrings.DateSetNonActualCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false
				},
				IsCreatedBySynchronization: {
					uId: "c93fe4de-6262-4a06-bd20-df27c2b7982c",
					name: "IsCreatedBySynchronization",
					caption: resources.localizableStrings.IsCreatedBySynchronizationCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExternalCommunicationType: {
					uId: "31c70950-bdc3-4d5d-86fe-0cce719c84dc",
					name: "ExternalCommunicationType",
					caption: resources.localizableStrings.ExternalCommunicationTypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				}
			}
		});
		return Terrasoft.ContactCommunication;
	});