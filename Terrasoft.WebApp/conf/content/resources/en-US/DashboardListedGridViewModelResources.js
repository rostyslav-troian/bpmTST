define("DashboardListedGridViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MultiLineCaption: "Show as multi-line text",
		OneLineCaption: "Show as single line text",
		LoadMoreButtonCaption: "Show more",
		ExportToExcelCaption: "Export to Excel"
	};
	var localizableImages = {
		FullScreenImg: {
			source: 3,
			params: {
				schemaName: "DashboardListedGridViewModel",
				resourceItemName: "FullScreenImg",
				hash: "77c5f8c0e5f06fafa63383a812d8ed93",
				resourceItemExtension: ".svg"
			}
		},
		Settings: {
			source: 3,
			params: {
				schemaName: "DashboardListedGridViewModel",
				resourceItemName: "Settings",
				hash: "fe36cfab3b2a4678c406b8e54197a9b3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});