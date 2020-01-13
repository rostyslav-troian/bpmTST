define("OsmMapsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DataWithoutAddresses: "Addresses are not specified for the selected records",
		AddressesFoundPartially: "{0} out of {1} addresses found. Some addresses could be missing.",
		AddressesFoundFull: "All addresses found",
		AddressesNotFound: "Selected addresses cannot be found due to the web mapping service error"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "OsmMapsModule",
				resourceItemName: "CloseIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		MarkerIcon: {
			source: 3,
			params: {
				schemaName: "OsmMapsModule",
				resourceItemName: "MarkerIcon",
				hash: "800f2b206a6c7bdb56e9d01c864e29ec",
				resourceItemExtension: ".png"
			}
		},
		MarkerShadow: {
			source: 3,
			params: {
				schemaName: "OsmMapsModule",
				resourceItemName: "MarkerShadow",
				hash: "f9e9f603864a304782c6d3aefaff0250",
				resourceItemExtension: ".png"
			}
		},
		MarkerIcon2x: {
			source: 3,
			params: {
				schemaName: "OsmMapsModule",
				resourceItemName: "MarkerIcon2x",
				hash: "339ae18a8a5b05de6da234c8fa954d37",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});