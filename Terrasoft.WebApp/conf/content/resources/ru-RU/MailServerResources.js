﻿define("MailServerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MailServerCaption: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440",
		IdCaption: "Id",
		CreatedOnCaption: "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
		CreatedByCaption: "\u0421\u043E\u0437\u0434\u0430\u043B",
		ModifiedOnCaption: "\u0414\u0430\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		ModifiedByCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u043B",
		NameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		AddressCaption: "\u0418\u043C\u044F \u0438\u043B\u0438 IP-\u0430\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u0432\u0445\u043E\u0434\u044F\u0449\u0435\u0439 \u043F\u043E\u0447\u0442\u044B",
		PortCaption: "\u041F\u043E\u0440\u0442",
		UseSSLCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B SSL \u0434\u043B\u044F \u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
		ProcessListenersCaption: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		EmailProtocolCaption: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
		AllowEmailDownloadingCaption: "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443 e-mail \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
		AllowEmailSendingCaption: "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 e-mail \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
		SMTPServerAddressCaption: "\u0418\u043C\u044F \u0438\u043B\u0438 IP-\u0430\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0435\u0439 \u043F\u043E\u0447\u0442\u044B (SMTP)",
		SMTPPortCaption: "\u041F\u043E\u0440\u0442",
		SMTPServerTimeoutCaption: "\u0412\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u043F\u043E\u0447\u0442\u044B, \u0441\u0435\u043A\u0443\u043D\u0434",
		UseSSLforSendingCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B SSL \u0434\u043B\u044F \u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435",
		ExchangeEmailAddressCaption: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
		IsExchengeAutodiscoverCaption: "\u0410\u0432\u0442\u043E\u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u0435",
		IsStartTlsCaption: "\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0437\u0430\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 (STARTTLS)",
		TypeCaption: "\u0422\u0438\u043F \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430",
		UseLoginCaption: "\u0412\u0432\u043E\u0434\u0438\u0442\u044C \u043B\u043E\u0433\u0438\u043D \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
		LogoCaption: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F",
		UseUserNameAsLoginCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0438\u043C\u044F \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u0433\u043E \u044F\u0449\u0438\u043A\u0430 \u043A\u0430\u043A \u043B\u043E\u0433\u0438\u043D",
		UseEmailAddressAsLoginCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C email \u043A\u0430\u043A \u043B\u043E\u0433\u0438\u043D",
		StrategyCaption: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F",
		OAuthApplicationCaption: "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 OAuth \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});