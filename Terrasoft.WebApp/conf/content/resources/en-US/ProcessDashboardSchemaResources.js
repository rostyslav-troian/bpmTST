define("ProcessDashboardSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "There are no business process tasks for now",
		EmptyResultMessage: "Learn more about the business processes in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1839",
		FutureTaskFilter: "Show future tasks"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "EmptyResultImage",
				hash: "a202b80583e5d608faa21f55dadc7845",
				resourceItemExtension: ".svg"
			}
		},
		Default: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "Default",
				hash: "e43e33a3ae1d4c1a57e7e161d1b39dad",
				resourceItemExtension: ".svg"
			}
		},
		Filter: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "Filter",
				hash: "31bd325b9d223868893ac5b0a8617a62",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
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