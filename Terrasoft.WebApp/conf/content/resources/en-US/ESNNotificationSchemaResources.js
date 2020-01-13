define("ESNNotificationSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CreatedOnDateFormat: "{0}, at {1}",
		EmptyResultTitle: "There were no recent activities in the feed.",
		EmptyResultMessage: "Learn more about feed notifications in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1578",
		HasNoRightForRead: "You do not have permission to read this record. Please contact your system administrator"
	};
	var localizableImages = {
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
				resourceItemName: "DefaultPhoto",
				hash: "e64a09b094aca1c4d2266bee33b5acf7",
				resourceItemExtension: ".png"
			}
		},
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
				resourceItemName: "EmptyResultImage",
				hash: "234cba72299aef2cb9ed7e0859506ec5",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
				resourceItemName: "DefaultRemindingIcon",
				hash: "fc25e15a25188b310d43e0d790d71956",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});