define("CallSectionGridRowViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StopCaption: "Stop",
		PlayCaption: "Play",
		PauseCaption: "Suspend",
		PlayErrorMessage: "Error while conversation playback. Error code: \u0027{0}\u0027"
	};
	var localizableImages = {
		PauseImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "PauseImage",
				hash: "8542d6c74bb13fef901c333419816f82",
				resourceItemExtension: ".png"
			}
		},
		PlayImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "PlayImage",
				hash: "a56a23515b7a789c47488108d2c4be6e",
				resourceItemExtension: ".png"
			}
		},
		StopImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "StopImage",
				hash: "41c86351c37b806a1ae7d4590505f7f0",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});