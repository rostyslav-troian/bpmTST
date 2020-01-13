﻿define("ContactSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SynchronizeWithGoogleContactsAction: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C\u0438 Google",
		SynchronizeWithGoogleSyncResult: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430.{NewLine}\u0412 Creatio:{NewLine} - \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E {1} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 {2} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine}\u0412 Google Contacts:{NewLine} - \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {3} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E {4} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 {5} \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		CallbackFailed: "\u041F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \n\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043B\u043E\u0433",
		SettingsNotSet: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B",
		SyncProcessFail: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
		OpenGoogleSettingsPage: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0441 Google",
		DuplicatesAction: "\u041D\u0430\u0439\u0442\u0438 \u0434\u0443\u0431\u043B\u0438",
		FillContactWithSocialNetworksDataAction: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0438\u0437 \u0441\u043E\u0446. \u0441\u0435\u0442\u0435\u0439",
		OpenContactCardQuestion: "\u0414\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u0443\u0447\u0435\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u0441\u043E\u0446. \u0441\u0435\u0442\u044F\u0445. \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430?",
		ShowOnMap: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435",
		FolderNotSet: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B (\u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0430 \u0433\u0440\u0443\u043F\u043F\u0430 \u0434\u043B\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432)",
		SynchronizeContactsCaption: "C\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 Exchange",
		SyncSettingsNotFoundMessage: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u044B.",
		ReadSyncSettingsBadResponse: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});