define("BaseProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ClearButtonCaption: "Clear column",
		SetActionCaption: "Add relationship",
		AddRecordButtonCaption: "New",
		ErrorOnSaveMessage: "An error occurred while saving. Please contact your system administrator for more information.",
		SearchButtonCaption: "Search"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "4c80007219dc08f0c626835219a12963",
				resourceItemExtension: ".png"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});