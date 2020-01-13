define("UserCasesListModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ListHeaderCaption: "My cases",
		CreateButtonCaption: "New",
		EmptyInfoTitle: "You do not have any cases",
		EmptyInfoRecommendation: "Create a {0}new case{1}."
	};
	var localizableImages = {
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "UserCasesListModule",
				resourceItemName: "EmptyInfoImage",
				hash: "422274c89a26eb8896da446f9edfac30",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});