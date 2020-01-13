define("OPPEmailInitialStatus", ["terrasoft", "ext-base", "OPPEmailInitialStatusResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.OPPEmailInitialStatus", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.OPPEmailInitialStatus",
			singleton: true,
			uId: "73e2e6b7-6cb4-44cd-87c2-574a1db70375",
			name: "OPPEmailInitialStatus",
			caption: resources.localizableStrings.OPPEmailInitialStatusCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "MandrillId",
			columns: {
				BulkEmailId: {
					uId: "8112402a-a09e-4e26-9a73-992b9d473215",
					name: "BulkEmailId",
					caption: resources.localizableStrings.BulkEmailIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EmailAddress: {
					uId: "9474523f-be27-443c-b923-8dd08d0b9de8",
					name: "EmailAddress",
					caption: resources.localizableStrings.EmailAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				MandrillId: {
					uId: "0d048bc0-ced3-41e0-b8a9-ce13b005812b",
					name: "MandrillId",
					caption: resources.localizableStrings.MandrillIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EmailResponseId: {
					uId: "0839acab-38e4-46ec-b67d-ed88966266c0",
					name: "EmailResponseId",
					caption: resources.localizableStrings.EmailResponseIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.OPPEmailInitialStatus;
	});