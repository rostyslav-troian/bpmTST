﻿define("CampaignTargetPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		ActionButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		ColumnFilterInvalidFormatException: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u044F \u043F\u043E \u043A\u043E\u043B\u043E\u043D\u043A\u0435 {0}",
		NewRecordPageCaptionSuffix: ": \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
		IncrementNumberSuffix: "LastNumber",
		DelayExecutionButtonCaption: "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E\u0437\u0436\u0435",
		ProcessEntryPointButtonCaption: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0443",
		CloseButtonCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		ViewOptionsButtonCaption: "\u0412\u0438\u0434",
		OpenSectionDesignerButtonCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		EditRightsCaption: "",
		FieldValidationError: "\u041F\u043E\u043B\u0435 \u0022{0}\u0022: {1}",
		PrintButtonCaption: "\u041F\u0435\u0447\u0430\u0442\u044C",
		WarningExistsContact: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C, \u0442\u0430\u043A \u043A\u0430\u043A \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0442\u0430\u043A\u0438\u043C email \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0438 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438",
		WarningChangeList: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C, \u0442\u0430\u043A \u043A\u0430\u043A \u0434\u0430\u043D\u043D\u0430\u044F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0022\u0412 \u043F\u043B\u0430\u043D\u0430\u0445\u0022 \u0438\u043B\u0438 \u0022\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430\u0022",
		IncorrectEmailMessage: "\u0423\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email",
		EmailNonActual: "Email {0} \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u043C.",
		OpenListSettingsCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0441\u043F\u0438\u0441\u043A\u0430",
		ContactUnsubscribeMessage: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C, \u0442\u0430\u043A \u043A\u0430\u043A \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u043E\u0442\u043F\u0438\u0441\u0430\u043D \u043E\u0442 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A \u0441 \u0442\u0438\u043F\u043E\u043C \u0022{0}\u0022",
		ProsessButtonCaption: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		BeginProcessButtonMenuItemCaption: "\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		ContinueProcessButtonMenuItemCaption: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});