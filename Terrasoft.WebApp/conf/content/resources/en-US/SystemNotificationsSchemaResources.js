define("SystemNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "You do not have any notifications that require your attention",
		EmptyResultMessage: "Learn more about the notifications in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1581",
		ImportNotificationLinkCaption: "Open imported records",
		ImportNotificationLogLinkCaption: "Open data import log",
		ReportNotificationSubject: "Download the report",
		ReportNotificationHeaderTpl: "Generated the following report: {0}"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "SystemNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "46e5dc9be3ae1086304bef981f46208c",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "SystemNotificationsSchema",
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