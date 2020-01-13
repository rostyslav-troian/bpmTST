﻿define("Portal_SysModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Portal_SysModuleCaption: "(\u0423\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0439)\u0420\u0430\u0437\u0434\u0435\u043B SSP",
		IdCaption: "Id",
		CreatedOnCaption: "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
		CreatedByCaption: "\u0421\u043E\u0437\u0434\u0430\u043B",
		ModifiedOnCaption: "\u0414\u0430\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		ModifiedByCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u043B",
		CaptionCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
		SysModuleEntityCaption: "\u041E\u0431\u044A\u0435\u043A\u0442 \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		Image16Caption: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 (16\u044516)",
		Image20Caption: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 (20\u044520)",
		FolderModeCaption: "\u0420\u0435\u0436\u0438\u043C \u0433\u0440\u0443\u043F\u043F \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		GlobalSearchAvailableCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432 \u043F\u043E\u0438\u0441\u043A\u0435",
		HasAnalyticsCaption: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443",
		HasActionsCaption: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		HasRecentCaption: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0433\u0440\u0443\u043F\u043F\u0443 \u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435",
		CodeCaption: "Code",
		HelpContextIdCaption: "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0439 \u0441\u043F\u0440\u0430\u0432\u043A\u0438",
		ProcessListenersCaption: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		ModuleHeaderCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043C\u043E\u0434\u0443\u043B\u044F",
		AttributeCaption: "\u0410\u0442\u0440\u0438\u0431\u0443\u0442",
		SysPageSchemaUIdCaption: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		CardSchemaUIdCaption: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0445\u0435\u043C\u044B \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		SectionModuleSchemaUIdCaption: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0445\u0435\u043C\u044B \u043C\u043E\u0434\u0443\u043B\u044F \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		SectionSchemaUIdCaption: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0445\u0435\u043C\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
		CardModuleUIdCaption: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0441\u0445\u0435\u043C\u044B \u043C\u043E\u0434\u0443\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		TypeColumnValueCaption: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 \u0442\u0438\u043F\u0430",
		Image32Caption: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 (32x32)",
		LogoCaption: "\u041B\u043E\u0433\u043E",
		SysModuleVisaCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		IsSystemCaption: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B",
		TypeCaption: "\u0422\u0438\u043F\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u0430"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});