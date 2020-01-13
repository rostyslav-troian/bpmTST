define("ServiceOAuthAuthenticatorEndpointHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnableToProcessAuthorizationCode: "Unable to add a user. Please check connection settings and retry. More information is available at Creatio \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221907\u0022\u003EAcademy\u003C\/a\u003E.",
		RefreshTokenNotFound: "A \u201Crefresh token\u201D parameter necessary for obtaining long-term access was not passed when your user was added. It may cause this integration to stop working after a some time. More information is available at Creatio \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221907\u0022\u003EAcademy\u003C\/a\u003E."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});