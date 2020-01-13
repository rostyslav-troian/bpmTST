﻿define("VisaHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WarningBeforeRejecting: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0443?",
		Approve: "\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		Comments: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0432\u0438\u0437\u0435",
		Reject: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C",
		WarningBeforeApprove: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0432\u0438\u0437\u0443?",
		ChangeVisaOwner: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E",
		NotRigth: "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0438\u0437\u044B",
		IsAllowedToDelegate: "\u0414\u0435\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u043E\u0439 \u0432\u0438\u0437\u044B \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043E",
		SendToVisaCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		SendToVisaSysSettingNotExistsError: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u043D\u0435 \u0431\u044B\u043B\u0430 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
		VisaLookupCaption: "\u0412\u044B\u0431\u043E\u0440: \u0413\u0440\u0443\u043F\u043F\u0430\/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
		ApproveButtonCaption: "\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		RejectButtonAction: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C",
		NotAllowedDelegateCurrentUserError: "\u0414\u0435\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0438\u0437\u044B \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u0432\u044B \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0435\u0441\u044C \u043F\u0435\u0440\u0432\u043E\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u043C \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0438\u043C"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});