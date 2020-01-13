define("MapsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Close: "Close",
		DataWithoutAddresses: "Addresses are not specified for the selected records",
		RouteNotFound: "Unable to create a route",
		RouteFound: "Route found",
		AddressesNotFound: "Selected addresses cannot be found due to the web mapping service error",
		AddressesFoundPartially: "{0} out of {1} addresses found. Some addresses could be missing.",
		BrowserRejectGeolocation: "Your browser does not support geolocation",
		GeolocationServiceFailed: "The Geolocation service failed",
		AddressesFoundFull: "All addresses found"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "MapsModule",
				resourceItemName: "CloseIcon",
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