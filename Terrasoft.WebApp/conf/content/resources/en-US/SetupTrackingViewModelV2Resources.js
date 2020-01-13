define("SetupTrackingViewModelV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MaskMessage: "Checking",
		ServiceResponseFailMessage: "Unfortunately, we were not able to set up tracking and update your settings. If this problem appears again, please contact customer support for help.",
		ServiceResponseOk: "Congratulations! Website event tracking was successfully set up. Tracking is enabled for all the domains specified in the \u2018Tracking domains\u2019 lookup.",
		ServiceResponseApiKeyNotFound: "Website event tracking setup is not completed: you provided an invalid API key. If you don\u2019t know what your API key is, please contact customer support for help.",
		ServiceResponseSysSettingIsEmpty: "Unfortunately, we were not able to set up website events tracking: invalid values provided in system settings. If this problem appears again, please contact customer support for help.",
		ServiceResponseServiceUrlIsEmpty: "Unfortunately, we were not able to set up website event tracking. No tracking domains specified. Please list the website domains where you would like to track events in the \u2018Tracking domains\u2019 lookup and try again."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});