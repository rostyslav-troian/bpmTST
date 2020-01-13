define("CmpgnPrtcpntEmailTargetOp", ["terrasoft", "ext-base", "CmpgnPrtcpntEmailTargetOpResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CmpgnPrtcpntEmailTargetOp", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CmpgnPrtcpntEmailTargetOp",
			singleton: true,
			uId: "db6ddc59-17bc-4017-984b-55d8c7895d61",
			name: "CmpgnPrtcpntEmailTargetOp",
			caption: resources.localizableStrings.CmpgnPrtcpntEmailTargetOpCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "MandrillRecipientUId",
			columns: {
				MandrillRecipientUId: {
					uId: "84ad9018-b52d-454d-821a-d30ed2a3d98d",
					name: "MandrillRecipientUId",
					caption: resources.localizableStrings.MandrillRecipientUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				CampaignParticipantId: {
					uId: "0c270820-432a-47af-9840-4b0496b336db",
					name: "CampaignParticipantId",
					caption: resources.localizableStrings.CampaignParticipantIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				}
			}
		});
		return Terrasoft.CmpgnPrtcpntEmailTargetOp;
	});