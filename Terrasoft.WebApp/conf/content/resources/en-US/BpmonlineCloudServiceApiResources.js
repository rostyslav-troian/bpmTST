define("BpmonlineCloudServiceApiResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WrongApiKey: "Not valid api key",
		UnreachableResource: "Domain to receive responses is unavaialble",
		ServiceIsUnavailable: "Creatio cloud service is unavailable",
		UnhandledErrorMessage: "Unhandled error: {0}",
		Success: "Success",
		GettingDomainsError: "There was an error while getting the list of domains: {0}",
		AddingDomainError: "There was an error while adding domain: {0}",
		WrongAuthKey: "Not valid auth key"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});