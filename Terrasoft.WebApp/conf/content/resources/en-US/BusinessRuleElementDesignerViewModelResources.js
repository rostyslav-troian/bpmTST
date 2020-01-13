define("BusinessRuleElementDesignerViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WrongColumnNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. Symbol: 0-9 cannot be first.",
		WrongColumnPathMask: "Field \u0027{0}\u0027 not found. Please check the field code. Also, please ensure that the page with the specified field has been saved in the Section wizard",
		WrongSysSettingMessageMask: "System setting \u0027{0}\u0027 not found. Please check the system setting code",
		SysSettingIsNotCacheable: "System setting \u0027{0}\u0027 doesn\u0027t have \u0027Cached\u0027 checkbox selected. Select it and try again"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});