define("VwCampaignLog", ["terrasoft", "ext-base", "VwCampaignLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwCampaignLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwCampaignLog",
			singleton: true,
			uId: "bcf4752b-140d-4a7d-9c1b-8a3651dde04c",
			name: "VwCampaignLog",
			caption: resources.localizableStrings.VwCampaignLogCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "8ed01284-6cd0-4a87-89e6-1d6af46808f4",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				Campaign: {
					uId: "5866a432-2635-4695-8ba6-d571b4e99c44",
					name: "Campaign",
					caption: resources.localizableStrings.CampaignCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Campaign",
					referenceSchema: {
						name: "Campaign",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CampaignItem: {
					uId: "15c2d6ef-6442-4767-9978-e5256a8a2628",
					name: "CampaignItem",
					caption: resources.localizableStrings.CampaignItemCaption,
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
				Amount: {
					uId: "36e9e88a-c417-45e7-be15-7ba9d9f96189",
					name: "Amount",
					caption: resources.localizableStrings.AmountCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedOn: {
					uId: "6ad08566-b6a1-43b8-9509-01dbc7ac191a",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ScheduledDate: {
					uId: "5796ca82-e7c8-49a6-befc-03cfca63f3dd",
					name: "ScheduledDate",
					caption: resources.localizableStrings.ScheduledDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StartDate: {
					uId: "2ce41aed-f6a8-45f4-98c2-41061681af7d",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EndDate: {
					uId: "5f92d3ef-20d7-4b8d-a637-1621424cc9ed",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ErrorText: {
					uId: "b9d81e8a-f5c4-45a3-b7d3-79419fb35d06",
					name: "ErrorText",
					caption: resources.localizableStrings.ErrorTextCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				DurationSs: {
					uId: "b82382c5-9b64-44b5-8867-6eb115869bbd",
					name: "DurationSs",
					caption: resources.localizableStrings.DurationSsCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DurationMi: {
					uId: "962dcc52-d16e-4df8-9748-b5da1a5ca89b",
					name: "DurationMi",
					caption: resources.localizableStrings.DurationMiCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Status: {
					uId: "e32cee04-b297-40d0-83b2-a3e7d39fae43",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignLogStatus",
					referenceSchema: {
						name: "CampaignLogStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Action: {
					uId: "6b69b085-468b-423e-aade-db70d5dbdc13",
					name: "Action",
					caption: resources.localizableStrings.ActionCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CampaignLogItemType",
					referenceSchema: {
						name: "CampaignLogItemType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SessionId: {
					uId: "e88b7112-a762-43e5-bb15-52178aa314f7",
					name: "SessionId",
					caption: resources.localizableStrings.SessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwCampaignLog;
	});