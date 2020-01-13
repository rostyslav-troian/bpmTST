define("CmpgnPrtcpntEmailTarget", ["terrasoft", "ext-base", "CmpgnPrtcpntEmailTargetResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CmpgnPrtcpntEmailTarget", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CmpgnPrtcpntEmailTarget",
			singleton: true,
			uId: "e521c31e-477e-4297-bb95-8ccf475cb11c",
			name: "CmpgnPrtcpntEmailTarget",
			caption: resources.localizableStrings.CmpgnPrtcpntEmailTargetCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "MandrillRecipientUId",
			columns: {
				MandrillRecipientUId: {
					uId: "97eef402-9812-43a4-ba42-04a367d411f3",
					name: "MandrillRecipientUId",
					caption: resources.localizableStrings.MandrillRecipientUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				CampaignParticipantId: {
					uId: "ccb81fc9-f79f-45f9-96fd-03d265f8ac90",
					name: "CampaignParticipantId",
					caption: resources.localizableStrings.CampaignParticipantIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				WasUsed: {
					uId: "71f330ca-e2d6-4e25-8298-d86830dbdc2d",
					name: "WasUsed",
					caption: resources.localizableStrings.WasUsedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				}
			}
		});
		return Terrasoft.CmpgnPrtcpntEmailTarget;
	});