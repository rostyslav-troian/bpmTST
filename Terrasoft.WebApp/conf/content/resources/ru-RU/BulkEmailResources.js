﻿define("BulkEmailResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BulkEmailCaption: "Email",
		IdCaption: "Id",
		CreatedOnCaption: "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
		CreatedByCaption: "\u0421\u043E\u0437\u0434\u0430\u043B",
		ModifiedOnCaption: "\u0414\u0430\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		ModifiedByCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u043B",
		ProcessListenersCaption: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		NameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		OwnerCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		TypeCaption: "\u0422\u0438\u043F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438",
		StatusCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
		StartDateCaption: "\u041D\u0430\u0447\u0430\u043B\u043E",
		SenderNameCaption: "\u0418\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F",
		SenderEmailCaption: "Email \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F",
		NotesCaption: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
		SendStartDateCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043D\u0430\u0447\u0430\u0442\u0430",
		SendDueDateCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
		ClicksCaption: "\u041F\u0435\u0440\u0435\u0445\u043E\u0434\u044B, %",
		OpensCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u0438\u044F, %",
		SoftBounceCaption: "Soft Bounce, %",
		HardBounceCaption: "Hard Bounce, %",
		UnsubscribeCaption: "\u041E\u0442\u043F\u0438\u0441\u043A\u0438, %",
		SpamCaption: "\u0421\u043F\u0430\u043C, %",
		ClicksCountCaption: "\u041F\u0435\u0440\u0435\u0445\u043E\u0434\u044B, \u043A\u043E\u043B-\u0432\u043E",
		OpensCountCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u0438\u044F, \u043A\u043E\u043B-\u0432\u043E",
		SoftBounceCountCaption: "Soft Bounce, \u043A\u043E\u043B-\u0432\u043E",
		HardBounceCountCaption: "Hard Bounce, \u043A\u043E\u043B-\u0432\u043E",
		UnsubscribeCountCaption: "\u041E\u0442\u043F\u0438\u0441\u043A\u0438, \u043A\u043E\u043B-\u0432\u043E",
		SpamCountCaption: "\u0421\u043F\u0430\u043C, \u043A\u043E\u043B-\u0432\u043E",
		SegmentsStatusCaption: "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432",
		RecipientCountCaption: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0438",
		LastActualizeDateCaption: "\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F",
		TemplateSubjectCaption: "\u0422\u0435\u043C\u0430",
		TemplateBodyCaption: "\u0422\u0435\u043A\u0441\u0442 \u0448\u0430\u0431\u043B\u043E\u043D\u0430",
		DeliveredCountCaption: "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E",
		NotDeliveredCountCaption: "\u041D\u0435 \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E",
		InQueueCountCaption: "\u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		CanceledCountCaption: "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E, \u043A\u043E\u043B-\u0432\u043E",
		BlankEmailCountCaption: "Email \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D ",
		IncorrectEmailCountCaption: "Incorrect email",
		UnreachableEmailCountCaption: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0439 email",
		DoNotUseEmailCountCaption: "Do not use email",
		DuplicateEmailCountCaption: "\u0414\u0443\u0431\u043B\u044C email\u0430",
		RejectedCountCaption: "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E, \u043A\u043E\u043B-\u0432\u043E",
		CommonErrorCountCaption: "\u041E\u0431\u0449\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430, \u043A\u043E\u043B-\u0432\u043E",
		InvalidAddresseeCountCaption: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441\u0430\u0442, \u043A\u043E\u043B-\u0432\u043E",
		PercentWeightCaption: "PercentWeight",
		PercentActiveWeightCaption: "PercentActiveWeight",
		PercentInactiveWeightCaption: "PercentInactiveWeight",
		SendCountCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E",
		CommunicationLimitCountCaption: "Cancelled (communication limit)",
		UtmSourceCaption: "utm_source",
		UtmMediumCaption: "utm_medium",
		UtmCampaignCaption: "utm_campaign",
		UtmTermCaption: "utm_term",
		UtmContentCaption: "utm_content",
		DomainsCaption: "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043C\u0435\u043D\u043E\u0432",
		UseUtmCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C UTM-\u043C\u0435\u0442\u043A\u0438",
		CampaignCaption: "\u041A\u0430\u043C\u043F\u0430\u043D\u0438\u044F",
		StatisticDateCaption: "StatisticDate",
		ResponseProcessingCompletedCaption: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
		SplitTestCaption: "\u0421\u043F\u043B\u0438\u0442-\u0442\u0435\u0441\u0442",
		CategoryCaption: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
		LaunchOptionCaption: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		TemplateConfigCaption: "\u041A\u043E\u043D\u0444\u0438\u0433 \u0448\u0430\u0431\u043B\u043E\u043D\u0430",
		DeliveryErrorCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0448\u0438\u0431\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",
		IsSystemEmailCaption: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430",
		TemplateNotFoundCountCaption: "\u0428\u0430\u0431\u043B\u043E\u043D \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442",
		SendersDomainNotVerifiedCountCaption: "\u0414\u043E\u043C\u0435\u043D \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D",
		SendersNameNotValidCountCaption: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0435 \u0438\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});