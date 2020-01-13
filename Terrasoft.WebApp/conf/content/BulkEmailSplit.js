define("BulkEmailSplit", ["terrasoft", "ext-base", "BulkEmailSplitResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailSplit", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailSplit",
			singleton: true,
			uId: "9682719a-2ac0-47c8-af3a-f988a778988b",
			name: "BulkEmailSplit",
			caption: resources.localizableStrings.BulkEmailSplitCaption,
			administratedByRecords: true,
			administratedByOperations: false,
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
					uId: "25d18b21-5fab-495b-9d87-ae1e77b0cf5d",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Owner: {
					uId: "70300a2a-9336-4ab4-b5b2-123e2fcdba48",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
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
				Status: {
					uId: "b7de60f6-5855-4b2d-9f37-98cb233d172b",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "BulkEmailSplitStatus",
					referenceSchema: {
						name: "BulkEmailSplitStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "cb26ed70-e6f7-4e48-bc7b-560b2676fcc6"
						}
					}
				},
				RecipientPercent: {
					uId: "7b9b5074-5977-4828-af78-0e3f7d875b87",
					name: "RecipientPercent",
					caption: resources.localizableStrings.RecipientPercentCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 10
					},
					size: 18,
					precision: 1
				},
				StartDate: {
					uId: "04fe72a0-74a7-4db5-8f79-f09f8c948b17",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StartManual: {
					uId: "7401d97d-7cd1-444d-9fa3-8b9ef05158e0",
					name: "StartManual",
					caption: resources.localizableStrings.StartManualCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				RecipientCount: {
					uId: "d5547418-fc48-4247-a834-6b32804729d3",
					name: "RecipientCount",
					caption: resources.localizableStrings.RecipientCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false
				},
				SegmentsStatus: {
					uId: "13707fcb-75aa-4331-82ce-3887cbc7e5b3",
					name: "SegmentsStatus",
					caption: resources.localizableStrings.SegmentsStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SegmentStatus",
					referenceSchema: {
						name: "SegmentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "fa360d2c-1658-49ad-9152-22479fdc0c12"
						}
					}
				},
				Notes: {
					uId: "6d87fe1f-9b88-42c3-bb8b-b363857d6343",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TransferTableName: {
					uId: "972d17af-31c3-4843-8e5b-be8abad1b3af",
					name: "TransferTableName",
					caption: resources.localizableStrings.TransferTableNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					size: 50
				},
				TestRecipientCount: {
					uId: "92fa8c67-605e-4724-9e3e-0afe9ee9ed81",
					name: "TestRecipientCount",
					caption: resources.localizableStrings.TestRecipientCountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				}
			}
		});
		return Terrasoft.BulkEmailSplit;
	});