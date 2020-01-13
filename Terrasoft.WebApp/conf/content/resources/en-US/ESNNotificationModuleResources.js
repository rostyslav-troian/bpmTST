define("ESNNotificationModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NotMarkedNewNotificationsAsRead: "New notifications are not marked as read.",
		EmptyResultTitle: "There were no recent activities in the feed.",
		EmptyResultMessage: "Learn more about feed notifications in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1578",
		HasNoRightForRead: "You do not have permission to read this record. Please contact your system administrator"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ESNNotificationModule",
				resourceItemName: "EmptyResultImage",
				hash: "234cba72299aef2cb9ed7e0859506ec5",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});