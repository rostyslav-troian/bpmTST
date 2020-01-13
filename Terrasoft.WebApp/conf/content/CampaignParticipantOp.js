define("CampaignParticipantOp", ["terrasoft", "ext-base", "CampaignParticipantOpResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CampaignParticipantOp", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CampaignParticipantOp",
			singleton: true,
			uId: "768ecc55-e80e-4df8-837f-085fb32e001f",
			name: "CampaignParticipantOp",
			caption: resources.localizableStrings.CampaignParticipantOpCaption,
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
				Campaign: {
					uId: "e0a882f3-eac1-46cb-91c9-d678e0723090",
					name: "Campaign",
					caption: resources.localizableStrings.CampaignCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Campaign",
					referenceSchema: {
						name: "Campaign",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Contact: {
					uId: "68b7f207-bd39-4ed1-b85c-309af28a6329",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
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
				Status: {
					uId: "5fd85758-dccd-4a3c-990d-d8d86a2d168d",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CmpgnParticipantStatus",
					referenceSchema: {
						name: "CmpgnParticipantStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "58b91b66-256b-48cf-a56a-a5b7036825e6"
						}
					}
				},
				CampaignItem: {
					uId: "10ce1ffe-4c46-4565-8ef2-14904fa77be9",
					name: "CampaignItem",
					caption: resources.localizableStrings.CampaignItemCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CampaignItem",
					referenceSchema: {
						name: "CampaignItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StepModifiedOn: {
					uId: "12d696f8-d572-4651-a7c8-f6732aefd884",
					name: "StepModifiedOn",
					caption: resources.localizableStrings.StepModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				StepCompletedOn: {
					uId: "fcb47eb0-d278-4a17-939c-c6df557d9a04",
					name: "StepCompletedOn",
					caption: resources.localizableStrings.StepCompletedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				StepCompleted: {
					uId: "9ec2aa9e-da21-4ebb-87bc-da31089b8054",
					name: "StepCompleted",
					caption: resources.localizableStrings.StepCompletedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				SessionId: {
					uId: "aaaacfa8-e963-4328-8eea-9505e11cda00",
					name: "SessionId",
					caption: resources.localizableStrings.SessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				IsReadyToSync: {
					uId: "60266941-88a3-49b0-9402-5e0374d8f483",
					name: "IsReadyToSync",
					caption: resources.localizableStrings.IsReadyToSyncCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				InitialCampaignItem: {
					uId: "8b71ab42-eae2-4ec6-8eb4-fb9ea747660a",
					name: "InitialCampaignItem",
					caption: resources.localizableStrings.InitialCampaignItemCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignItem",
					referenceSchema: {
						name: "CampaignItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CampaignParticipant: {
					uId: "3b685758-82b4-48b3-b4d7-76d8cb507607",
					name: "CampaignParticipant",
					caption: resources.localizableStrings.CampaignParticipantCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignParticipant",
					referenceSchema: {
						name: "CampaignParticipant",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				}
			}
		});
		return Terrasoft.CampaignParticipantOp;
	});