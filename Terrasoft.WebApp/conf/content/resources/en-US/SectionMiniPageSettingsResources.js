define("SectionMiniPageSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MiniPageSettingsCaption: "Mini page",
		MiniPageModesCaption: "When to use mini page?",
		AvailableMiniPageAddModeCaption: "Add record",
		AvailableMiniPageEditModeCaption: "Edit record",
		AvailableMiniPageViewModeCaption: "View record",
		SetupMiniPageButtonCaption: "Edit mini page",
		RequiredSetupSectionPage: "Set up section page before setting up mini page",
		RequiredSelectModes: "Specify when Creatio should open mini page in this section"
	};
	var localizableImages = {
		MiniPageIcon: {
			source: 3,
			params: {
				schemaName: "SectionMiniPageSettings",
				resourceItemName: "MiniPageIcon",
				hash: "e1c77ea72371c2a7fb4e125025bfa871",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});