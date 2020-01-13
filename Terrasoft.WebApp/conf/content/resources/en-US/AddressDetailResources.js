define("AddressDetailResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddressCaption: "Address",
		CountryCaption: "Country",
		RegionCaption: "State\/province",
		CityCaption: "City",
		ZipCaption: "ZIP\/postal code",
		ValidationFailedMessage: "Please, fill in either the \u0022Address\u0022, \u0022Country\u0022 or \u0022City\u0022 field"
	};
	var localizableImages = {
		LocationIcon: {
			source: 3,
			params: {
				schemaName: "AddressDetail",
				resourceItemName: "LocationIcon",
				hash: "cbb033a002df98c2f6ffac7483ed37b8",
				resourceItemExtension: ".png"
			}
		},
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "AddressDetail",
				resourceItemName: "DeleteIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});