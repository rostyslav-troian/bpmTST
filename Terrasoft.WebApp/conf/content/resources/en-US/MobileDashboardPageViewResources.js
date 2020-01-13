define("MobileDashboardPageViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MobileDashboardPageTitle: "Dashboards",
		MobileDashboardPageNoDataLabelText: "Data in the section is available with Internet connection only",
		MobileDashboardPageNoDashboardsText: "No dashboards available"
	};
	var localizableImages = {
		IconArrowDownWhite: {
			source: 3,
			params: {
				schemaName: "MobileDashboardPageView",
				resourceItemName: "IconArrowDownWhite",
				hash: "bc8f2bfa2d42fab02e24f314d78073a1",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});