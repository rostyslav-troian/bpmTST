define("EmailContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PreviewBlockCaption: "Blocks library",
		ExitMessage: "All changes will be lost. Continue?",
		SaveMessage: "All changes will be saved. Continue?",
		EmptyTemplateMessage: "Unable to save empty template. To set up your template, drag the blocks from the library area and configure the block contents using the designer."
	};
	var localizableImages = {
		DefaultBlockImage: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "DefaultBlockImage",
				hash: "6c304675aa81e38fa1b9ea8a1834b4f4",
				resourceItemExtension: ".png"
			}
		},
		SheetSettingsButton: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "SheetSettingsButton",
				hash: "339995a317aa2591e4d2909b009a2f99",
				resourceItemExtension: ".png"
			}
		},
		SettingsButtonIcon: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "SettingsButtonIcon",
				hash: "778171cce61f3693d0a8ea3f3b33f645",
				resourceItemExtension: ".png"
			}
		},
		SearchIcon: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "SearchIcon",
				hash: "c0960e5d98faf61a2a5532aba9a8ccd0",
				resourceItemExtension: ".svg"
			}
		},
		SearchUserBlockIcon: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "SearchUserBlockIcon",
				hash: "ef96400dd632c3b0ed257d5c577f05b2",
				resourceItemExtension: ".svg"
			}
		},
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "EmailContentBuilder",
				resourceItemName: "PropertiesPageIcon",
				hash: "738d5d03e8b8231882e0338b44d66fbc",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});