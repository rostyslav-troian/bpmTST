define("WebitelCtiProviderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SettingsMissedMessage: "Webitel account parameters are not set. Add an account in the \u0022Webitel users\u0022 section",
		AudioDeviceNotFoundMessage: "You cannot make calls without a microphone connected",
		VideoDeviceNotFoundMessage: "You cannot make calls without a webcam connected. To make a call, select the \u0022Use video\u0022 option in the user profile"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});