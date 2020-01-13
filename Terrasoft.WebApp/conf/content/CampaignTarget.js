define("CampaignTarget", ["terrasoft", "ext-base", "CampaignTargetResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CampaignTarget", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CampaignTarget",
			singleton: true,
			uId: "8643c3cf-f6be-43f4-9b93-fe14ba3b9123",
			name: "CampaignTarget",
			caption: resources.localizableStrings.CampaignTargetCaption,
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
					uId: "373a994c-09db-47cc-9953-57f8ba5a9fa8",
					name: "Campaign",
					caption: resources.localizableStrings.CampaignCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
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
					uId: "b1866cfa-30c5-4016-b11e-f6a3df6d1837",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CampaignTargetStatus: {
					uId: "a3d475bc-ae39-45d9-9ea2-c3e391d797b0",
					name: "CampaignTargetStatus",
					caption: resources.localizableStrings.CampaignTargetStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignTargetStatus",
					referenceSchema: {
						name: "CampaignTargetStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "7d7ef797-cda6-4bd8-be03-bac67fbf73d7"
						}
					}
				},
				IsFromGroup: {
					uId: "55fe2b63-fa1f-4427-a2e1-8595019dcb07",
					name: "IsFromGroup",
					caption: resources.localizableStrings.IsFromGroupCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				CurrentStep: {
					uId: "69e4019d-d797-4d93-ab91-ba2a63d19935",
					name: "CurrentStep",
					caption: resources.localizableStrings.CurrentStepCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignStep",
					referenceSchema: {
						name: "CampaignStep",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				NextStep: {
					uId: "8e52df9c-1881-4c74-8fc6-1fe051ddf153",
					name: "NextStep",
					caption: resources.localizableStrings.NextStepCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignStep",
					referenceSchema: {
						name: "CampaignStep",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				PassedStep: {
					uId: "477f1784-e46b-4626-a4f6-de520a1322ac",
					name: "PassedStep",
					caption: resources.localizableStrings.PassedStepCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignStep",
					referenceSchema: {
						name: "CampaignStep",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				}
			}
		});
		return Terrasoft.CampaignTarget;
	});