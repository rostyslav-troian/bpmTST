define("UserCertificateListModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CertificatesListHeaderCaption: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B",
		CertificatesCreateButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		CertificatesEmptyInfoTitle: "\u0423 \u0412\u0430\u0441 \u043D\u0435\u0442 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0439",
		CertificatesEmptyInfoRecommendation: "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 {0}\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E{1}.",
		SignUpButtonCaption: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",
		SignUpPageAddress: " https:\/\/academy.terrasoft.ru\/trainings"
	};
	var localizableImages = {
		CertificatesEmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "UserCertificateListModule",
				resourceItemName: "CertificatesEmptyInfoImage"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});