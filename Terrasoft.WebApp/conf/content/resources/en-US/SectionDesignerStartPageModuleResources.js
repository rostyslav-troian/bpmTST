define("SectionDesignerStartPageModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		moduleExistsMessage: "Object \u0022{0}\u0022 already exists in the current workspace.\nUse it as the section object?",
		moduleCaptionValue: "Entity 1",
		moduleCaptionLabel: "Title",
		moduleCodeLabel: "Section code",
		SimplePageButtonCaption: "One edit page",
		MultiPageButtonCaption: "Several edit pages",
		Header: "General section properties",
		SimplePageHint: "One page will be used for viewing and editing all section records",
		MultiPageHint: "A separate page will be used for viewing and editing section records of each type",
		SchemaExistsMessage: "Schema {0} already exists. Use it as the section schema?",
		SysSchemaExists: "System schemas for section with name {0} found. Cannot continue",
		OnMultiPageChangeMessage: "Changes will be lost. Continue?",
		moduleWorkplaceLabel: "Workplace",
		MenuCaption: "Menu icon",
		LogoCaption: "Feed"
	};
	var localizableImages = {
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "SectionDesignerStartPageModule",
				resourceItemName: "DefaultIcon",
				hash: "82ac3de73c8bed52dee9345eba13ca71",
				resourceItemExtension: ".png"
			}
		},
		DefaultLogo: {
			source: 3,
			params: {
				schemaName: "SectionDesignerStartPageModule",
				resourceItemName: "DefaultLogo",
				hash: "af141726a4fd04ea87d74b6222feffcb",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});