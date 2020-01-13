﻿define("RemindingsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RemindingButtonCaption: "\u0414\u0440\u0443\u0433\u0438\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F ({0})",
		EmailButtonCaption: "E-mail ({0})",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
		DelayButtonCaption: "\u041E\u0442\u043B\u043E\u0436\u0438\u0442\u044C",
		CancelAllButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435",
		DelayAllButtonCaption: "\u041E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u0441\u0435",
		MenuItem5MinCaption: "5 \u043C\u0438\u043D\u0443\u0442",
		MenuItem10MinCaption: "10 \u043C\u0438\u043D\u0443\u0442",
		MenuItem30MinCaption: "30 \u043C\u0438\u043D\u0443\u0442",
		MenuItem1HourCaption: "1 \u0447\u0430\u0441",
		MenuItem2HourCaption: "2 \u0447\u0430\u0441\u0430",
		MenuItem1DayCaption: "1 \u0434\u0435\u043D\u044C",
		GoToButtonCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438",
		ReadAllButtonCaption: "\u041F\u043E\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u043A\u0430\u043A \u043F\u0440\u043E\u0447\u0442\u0435\u043D\u043D\u044B\u0435",
		ReplyButtonCaption: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C",
		ReadButtonCaption: "\u041F\u043E\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u043F\u0440\u043E\u0447\u0442\u0435\u043D\u043D\u043E\u0435",
		ForwardButtonCaption: "\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C",
		TitleCellCaption: "\u0422\u0435\u043C\u0430",
		StartDateCellCaption: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E",
		SenderCellCaption: "\u041E\u0442 \u043A\u043E\u0433\u043E",
		RemindingCellCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
		TimeCellCaption: "\u0412\u0440\u0435\u043C\u044F",
		SubjectCellCaption: "\u041E\u0431\u044A\u0435\u043A\u0442",
		CancelAllRemindingsQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F?",
		ModuleCaption: "\u0421\u043F\u0438\u0441\u043E\u043A \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439",
		ReadAllEmailQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043A\u0430\u043A \u043F\u0440\u043E\u0447\u0442\u0435\u043D\u043D\u044B\u0435?",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		DeleteEmailForUserQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E?",
		DelayAllRemindQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u0441\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F?",
		ReplyAllButtonCaption: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u043C",
		RemovedItemCaptionTemplate: "{0} \u0431\u044B\u043B \u0443\u0434\u0430\u043B\u0435\u043D",
		VisaButtonCaption: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u0430 \u0432\u0438\u0437\u0430 ({0})",
		NotRigth: " \u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0438\u0437\u044B",
		Objective: "\u0426\u0435\u043B\u044C \u0432\u0438\u0437\u044B",
		SetDate: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});