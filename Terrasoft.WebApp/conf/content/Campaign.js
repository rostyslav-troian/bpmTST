define("Campaign", ["terrasoft", "ext-base", "CampaignResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Campaign", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Campaign",
			singleton: true,
			uId: "1f9bb71a-eb9c-4220-a40e-9b623eacfec8",
			name: "Campaign",
			caption: resources.localizableStrings.CampaignCaption,
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
					uId: "64744600-327d-4490-9dd8-2ed70e4ecb16",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				CampaignStatus: {
					uId: "da323fb1-f216-4cb7-8a4c-e785dda94b8a",
					name: "CampaignStatus",
					caption: resources.localizableStrings.CampaignStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CampaignStatus",
					referenceSchema: {
						name: "CampaignStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "24b80784-2172-4903-94ad-ca1fddf368dd"
						}
					}
				},
				SegmentsStatus: {
					uId: "814b1db4-05bf-46a1-9dbf-78f4000f35e6",
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
					}
				},
				SchemaData: {
					uId: "5346e7fe-738c-4806-8fb5-131b63df3659",
					name: "SchemaData",
					caption: resources.localizableStrings.SchemaDataCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Notes: {
					uId: "6bfcc02e-0a48-450d-af48-78fb42719710",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TargetDescription: {
					uId: "fc244e14-7755-4afb-85bf-b52dee45082f",
					name: "TargetDescription",
					caption: resources.localizableStrings.TargetDescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				TargetPercent: {
					uId: "7f7bacd5-5a9f-4ba6-b189-f8ee9cad5bbc",
					name: "TargetPercent",
					caption: resources.localizableStrings.TargetPercentCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 20
					},
					size: 18,
					precision: 1
				},
				TargetTotal: {
					uId: "200745d2-e08f-4375-9510-a56f6ec2ef68",
					name: "TargetTotal",
					caption: resources.localizableStrings.TargetTotalCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				TargetAchieve: {
					uId: "ddaedc58-c72e-4027-b6a4-49e8e1779d18",
					name: "TargetAchieve",
					caption: resources.localizableStrings.TargetAchieveCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				StartDate: {
					uId: "42be20e4-c94e-49c8-b5aa-8ebd934e402d",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				EndDate: {
					uId: "ca4b78ea-def8-47f4-ab1a-5a886f374021",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				Owner: {
					uId: "d02e2ad3-6260-4fda-bdf7-6f36c8d72ee1",
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
				UtmCampaign: {
					uId: "e8bce7c6-2069-431b-9468-44d3bb0853c6",
					name: "UtmCampaign",
					caption: resources.localizableStrings.UtmCampaignCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				NextFireTime: {
					uId: "d5626c7f-75cd-4e01-8b4c-b87f18c0116c",
					name: "NextFireTime",
					caption: resources.localizableStrings.NextFireTimeCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				FirePeriod: {
					uId: "1e3155d5-4d30-4251-9702-c2e1f26604be",
					name: "FirePeriod",
					caption: resources.localizableStrings.FirePeriodCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CampaignSchemaUId: {
					uId: "9d8bfd00-c71e-4b1d-9c46-bf271d18ef8f",
					name: "CampaignSchemaUId",
					caption: resources.localizableStrings.CampaignSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Type: {
					uId: "876c6749-2c05-4861-856e-efd51b847904",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CampaignType",
					referenceSchema: {
						name: "CampaignType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "389eb587-52d4-4ab6-b4ad-e7e2f0d62eac"
						}
					}
				},
				InProgress: {
					uId: "6bb1e198-a9f2-44a7-a1eb-1ca3d38fc56c",
					name: "InProgress",
					caption: resources.localizableStrings.InProgressCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				},
				ScheduledStartMode: {
					uId: "056c8a67-d92e-419f-aa9c-66a9c951ecaa",
					name: "ScheduledStartMode",
					caption: resources.localizableStrings.ScheduledStartModeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignScheduledMode",
					referenceSchema: {
						name: "CampaignScheduledMode",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "229d71cf-80c8-4158-ae9d-b0da644ed6a8"
						}
					}
				},
				ScheduledStopMode: {
					uId: "e36a7fc0-326d-4dd8-ace7-78adc5fcd3bd",
					name: "ScheduledStopMode",
					caption: resources.localizableStrings.ScheduledStopModeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignScheduledMode",
					referenceSchema: {
						name: "CampaignScheduledMode",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "229d71cf-80c8-4158-ae9d-b0da644ed6a8"
						}
					}
				},
				ScheduledStartDate: {
					uId: "5b85977f-dfdb-4d0b-b273-b36934d188e0",
					name: "ScheduledStartDate",
					caption: resources.localizableStrings.ScheduledStartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ScheduledStopDate: {
					uId: "aa365456-c611-43df-9d05-12b828091983",
					name: "ScheduledStopDate",
					caption: resources.localizableStrings.ScheduledStopDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				PrevExecutedOn: {
					uId: "80b80b2f-8cae-4b3b-b449-a647a503f3a6",
					name: "PrevExecutedOn",
					caption: resources.localizableStrings.PrevExecutedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				}
			}
		});
		return Terrasoft.Campaign;
	});