﻿define("TestBulkEmailModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendButtonCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		BulkEmailCaption: "\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430",
		ContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		EmailCaption: "Email",
		PageCaption: "\u0422\u0435\u0441\u0442\u043E\u0432\u0430\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u0438\u0441\u044C\u043C\u0430",
		IncorrectEmailMessage: "\u0423\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 Email",
		FieldValidationError: "\u041F\u043E\u043B\u0435 \u0022{0}\u0022: {1}",
		SendTestBulkMessageFailMessage: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E.\n\n\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438.",
		SendTestBulkMessageSuccessMessage: "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E.",
		MaskMessage: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430",
		DemoDataMessage: "\u0412 \u0434\u0435\u043C\u043E-\u0432\u0435\u0440\u0441\u0438\u0438 Creatio marketing \u043D\u0435\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C email. \u0427\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E 30-\u0434\u043D\u0435\u0432\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E Creatio.",
		TryTrialButtonCaption: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "TestBulkEmailModule",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});