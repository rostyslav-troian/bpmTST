define("ContentHTMLElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Place for your html.",
		EditDataInputBoxCaption: "HTML edit"
	};
	var localizableImages = {
		ClearIcon: {
			source: 3,
			params: {
				schemaName: "ContentHTMLElementViewModel",
				resourceItemName: "ClearIcon",
				hash: "6919ee455762a70c3e9ae8eb0adcca2e",
				resourceItemExtension: ".png"
			}
		},
		EditIcon: {
			source: 3,
			params: {
				schemaName: "ContentHTMLElementViewModel",
				resourceItemName: "EditIcon",
				hash: "8f441a2b861d5114cbf2f5a753eff766",
				resourceItemExtension: ".png"
			}
		},
		UploadIcon: {
			source: 3,
			params: {
				schemaName: "ContentHTMLElementViewModel",
				resourceItemName: "UploadIcon",
				hash: "83de2204df57051bd7022fa0b2e93ccc",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});