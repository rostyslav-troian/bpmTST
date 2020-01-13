define("AnniversaryNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BodyTemplate: "{0} {1} ({2} {3})",
		CreateActivity: "Create activity",
		EmptyResultTitle: "The system will notify you about the noteworthy events of the contacts and accounts",
		EmptyResultMessage: "Learn more about the noteworthy events in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1580",
		ActivityTitle: "Say Happy Birthday!",
		ContactCaption: "Birthday {0} {1}",
		AccountCaption: "Company anniversary {0} {1}",
		SubjectDelimiter: "",
		YearsTemplate: "({0})"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "AnniversaryNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "d4e662d4b712ee76e80ca7f12ec81e13",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "AnniversaryNotificationsSchema",
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