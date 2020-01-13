define("ProcessParametersMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyInfoTitle: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432",
		ProcessParametersGridCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		ProcessParametersNoRequiredParameters: "\u041D\u0435\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0433\u043E \u0442\u0438\u043F\u0430"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProcessParametersMappingPage",
				resourceItemName: "GridDataViewIcon"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});