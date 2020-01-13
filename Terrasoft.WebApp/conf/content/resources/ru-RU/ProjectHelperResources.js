﻿define("ProjectHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProjectColumnContainerCaption: "\u041F\u0440\u043E\u0435\u043A\u0442"
	};
	var localizableImages = {
		LookupImage: {
			source: 3,
			params: {
				schemaName: "ProjectHelper",
				resourceItemName: "LookupImage",
				hash: "163310210abf0c2c13394dc3a1f978f4",
				resourceItemExtension: ".png"
			}
		},
		InfoImage: {
			source: 3,
			params: {
				schemaName: "ProjectHelper",
				resourceItemName: "InfoImage",
				hash: "eb22f50c8b80f29b6ba2657cd5c1f379",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});