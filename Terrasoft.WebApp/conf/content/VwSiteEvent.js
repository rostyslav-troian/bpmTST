define("VwSiteEvent", ["terrasoft", "ext-base", "VwSiteEventResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSiteEvent", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSiteEvent",
			singleton: true,
			uId: "05d5c19a-1456-4783-ba8f-69ad2cf5c046",
			name: "VwSiteEvent",
			caption: resources.localizableStrings.VwSiteEventCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Source",
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
				EventDate: {
					uId: "5f2dfdd1-5ddb-4839-a83b-8d148e1cf3eb",
					name: "EventDate",
					caption: resources.localizableStrings.EventDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true
				},
				Contact: {
					uId: "f8f51db4-b012-4188-95c5-f45fae88386e",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
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
				Source: {
					uId: "1c056690-3783-4fad-b9cd-26354f4d2f0d",
					name: "Source",
					caption: resources.localizableStrings.SourceCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: " "
					},
					size: 250
				},
				Tag: {
					uId: "5bd488d1-8090-4458-9e7d-0b82c5b88358",
					name: "Tag",
					caption: resources.localizableStrings.TagCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				SiteEventType: {
					uId: "82ff1d2a-0f1d-4d23-9877-bf07d2a26238",
					name: "SiteEventType",
					caption: resources.localizableStrings.SiteEventTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SiteEventType",
					referenceSchema: {
						name: "SiteEventType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LeadType: {
					uId: "8ddbde42-34bb-4a31-8b08-9c4dcf9c55c0",
					name: "LeadType",
					caption: resources.localizableStrings.LeadTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "LeadType",
					referenceSchema: {
						name: "LeadType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				BpmSessionId: {
					uId: "4333c2b2-9461-4c1f-bb79-2634671b5368",
					name: "BpmSessionId",
					caption: resources.localizableStrings.BpmSessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Lead: {
					uId: "baf174ee-94ee-4ee5-914b-781e0687dcd7",
					name: "Lead",
					caption: resources.localizableStrings.LeadCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Lead",
					referenceSchema: {
						name: "Lead",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "LeadName"
					}
				}
			}
		});
		return Terrasoft.VwSiteEvent;
	});