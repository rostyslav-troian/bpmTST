Terrasoft.configuration.Structures["ESNConstants"] = {innerHierarchyStack: ["ESNConstants"]};
define("ESNConstants", [], function() {
	/**
	 * @class Terrasoft.configuration.ESNConstants
	 * ##### ESNConstants ######## ################ ######### ### ESN.
	 */
	Ext.define("Terrasoft.configuration.ESNConstants", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ESNConstants",

		ESN: {
			SocialChannelSchemaUId: "dd74c060-eb4b-4f15-b381-db91ca5ac483",
			SchemasWithPrimaryImageColumnCollection: {
				"dd74c060-eb4b-4f15-b381-db91ca5ac483": "SocialChannel",
				"16be3651-8fe2-4159-8dd0-a803d4683dd3": "Contact"
			},
			ShortName: "Esn"
		},

		LikedUsersModalBoxConfig: {
			minWidth: 10,
			minHeight: 10,
			maxWidth: 40,
			maxHeight: 50
		},

		WebSocketMessageHeader: {
			ESNNotification: "ESNNotification"
		},

		SysSchema: {
			CaseUId: "117d32f9-8275-4534-8411-1c66115ce9cd"
		},

		SchemaName: {
			SocialChannel: "SocialChannel"
		}

	});
	return Ext.create("Terrasoft.ESNConstants");
});


