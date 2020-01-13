﻿define("BpmonlineCloudIntegrationPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageHeaderTemplate: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 email-\u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A",
		WebHooksCaption: "\u0414\u043E\u043C\u0435\u043D \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432",
		ServiceIsUnavailable: "\u041E\u0431\u043B\u0430\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 Creatio \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D",
		WrongApiKey: "\u041D\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u044B\u0439 api \u043A\u043B\u044E\u0447",
		UnhandledErrorMessage: "\u041D\u0435\u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430: {0}",
		WebHooksInfoMessage: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0439 \u0438\u0437 Internet \u0434\u043E\u043C\u0435\u043D \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F Creatio \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 \u003Ca \u003Ehttp:\/\/yourdomain.com\u0022\u003C\/a\u003E. \u041E\u0431\u043B\u0430\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A Creatio \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u043E\u0442\u043A\u043B\u0438\u043A\u0438 \u043D\u0430 \u0430\u0434\u0440\u0435\u0441 \u003Ca \u003Ehttp:\/\/yourdomain.com\/0\/ServiceModel\/CESWebhooksService.svc\/HandleWebHooks\u003C\/a\u003E",
		UnreachableResource: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u043C\u0443 \u0430\u0434\u0440\u0435\u0441\u0443: {0}. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0432\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u043B\u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0430 \u044D\u0442\u043E\u0442 \u0430\u0434\u0440\u0435\u0441 \u0438\u0437 Internet.",
		GeneralSettingsTabCaption: "\u041E\u0431\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
		SenderDomainsTabCaption: "\u0414\u043E\u043C\u0435\u043D\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F",
		SubscriptionManagementTabCaption: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0438\u0441\u043A\u0430\u043C\u0438",
		SetupInstructionsCaptionTemplate: "\u0414\u043E\u043C\u0435\u043D \u00AB{0}\u00BB: \u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043F\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 DKIM\/SPF",
		SenderDomainsHelpTextCaption: "\u0414\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043F\u0438\u0441\u0435\u043C \u043E\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u043E\u043C\u0435\u043D\u0430, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0447\u0442\u043E\u0431\u044B \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u043F\u043E\u043C\u0435\u043D\u044F\u043B DNS \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u0445\u043E\u0441\u0442\u0438\u043D\u0433\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u043E\u043C\u0435\u043D\u0430. \n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438. \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u0434\u043B\u044F \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0445\u043E\u0441\u0442\u0438\u043D\u0433\u0430 \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0439\u0442\u0438 \u0432 \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221495\u0022  \u003E\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438\u003C\/a\u003E.\u003Cbr\u003E\u003Cbr\u003E\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043E\u0442\u043B\u0438\u0447\u0430\u044E\u0442\u0441\u044F \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u0434\u043E\u043C\u0435\u043D\u043E\u0432. \u0414\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0443 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0435\u0433\u043E \u0432 \u0441\u043F\u0438\u0441\u043A\u0435.\u003Cbr\u003E\u003Cbr\u003E1. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043E\u043C\u0435\u043D \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435.\n",
		SPFTextLabelCaption: "2. SPF \u0437\u0430\u043F\u0438\u0441\u044C. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0432 DNS \u0432\u0430\u0448\u0435\u0433\u043E \u0445\u043E\u0441\u0442\u0438\u043D\u0433\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043B\u044F \u043A\u043B\u044E\u0447\u0430 SPF. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0443\u0434\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0442\u0435\u043A\u0441\u0442:",
		SPFFootnoteCaption: "* \u0412 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 DNS \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E 1 SPF \u0437\u0430\u043F\u0438\u0441\u044C. \u0415\u0441\u043B\u0438 SPF \u0437\u0430\u043F\u0438\u0441\u044C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442, \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u043E\u043C\u0435\u043D \u0438\u0437 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430 \u0022include\u0022 \u0432\u044B\u0448\u0435 \u0432 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u043E\u043D \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0434\u043E \u043B\u044E\u0431\u044B\u0445 IP-\u0430\u0434\u0440\u0435\u0441\u043E\u0432.",
		DKIMTextLabelCaption: "3. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0432 DNS \u0432\u0442\u043E\u0440\u0443\u044E TXT \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043B\u044F \u043A\u043B\u044E\u0447\u0430 DKIM. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0443\u0434\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0442\u0435\u043A\u0441\u0442:",
		DKIMFootnoteCaption: "* \u0412 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 DNS  \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043D\u0435\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439 DKIM",
		SPFScriptTemplate: "{0}",
		DKIMScriptTemplate: "_domainkey TXT o=~\nus._domainkey TXT k=rsa; p={0}",
		EmailSendSetupControlGroupCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 email",
		ResponseReceiveSetupControlGroupCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432",
		CheckSettingsButtonCaption: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
		EmailServiceProviderCaption: "Email-\u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440",
		ApiKeyCaption: "API-\u043A\u043B\u044E\u0447",
		ApiKeyInfoButtonCaption: "\u041A\u043B\u044E\u0447 \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u043E\u0431\u043B\u0430\u0447\u043D\u044B\u043C \u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043C Creatio",
		CloudConnectionUrlCaption: "URL \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A \u043E\u0431\u043B\u0430\u0447\u043D\u044B\u043C \u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043C Creatio",
		CloudConnectionUrlInfoButtonCaption: "\u0410\u0434\u0440\u0435\u0441 \u043E\u0431\u043B\u0430\u0447\u043D\u044B\u0445 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 Creatio",
		ConnectionStatusCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
		AuthKeyCaption: "Auth-\u043A\u043B\u044E\u0447",
		WebHooksInfoButtonCaption: "\u0410\u0434\u0440\u0435\u0441 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 Creatio.\n\u0414\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 on-site \u0434\u0430\u043D\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0438\u0437\u0432\u043D\u0435 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0434\u0430\u043D\u043D\u044B\u0445.",
		AuthKeyInfoButtonCaption: "\u041A\u043B\u044E\u0447 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432",
		ErrorMessageCaption: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0448\u0438\u0431\u043A\u0438",
		ConnectedCaption: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E",
		DisconnectedCaption: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
		WrongAuthKeyMessage: "\u041D\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u044B\u0439 auth-\u043A\u043B\u044E\u0447",
		WrongWebHookDomainMessage: "\u0414\u043E\u043C\u0435\u043D \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D",
		SetupInstructionsDefaultCaption: "\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043F\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 DKIM\/SPF",
		MailingServiceInActive: "\u041E\u0431\u043B\u0430\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D",
		ResponsesParsingSettingsTabCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432",
		StopParsingWebhooksControlGroupCaption: "\u041F\u0435\u0440\u0438\u043E\u0434 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0440\u0430\u0437\u0431\u043E\u0440\u0430 \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432 \u043F\u043E \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430\u043C",
		StopHandleWebHookProcessAt: "\u0421",
		StartHandleWebHookProcessAt: "\u041F\u043E",
		DMARCSettingCaption: "4. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0432 DNS \u043D\u043E\u0432\u0443\u044E TXT-\u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 DMARC. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0443\u0434\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0442\u0435\u043A\u0441\u0442:",
		DMARCSettingHelpCaption: "* \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 DMARC \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0431\u044B\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B \u0437\u0430\u043F\u0438\u0441\u0438 SPF \u0438 DKIM",
		AdditionalSettingsCaption: "5. \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0432 DNS \u043D\u043E\u0432\u0443\u044E TXT \u0437\u0430\u043F\u0438\u0441\u044C, \u0432 \u0441\u043B\u0443\u0447\u0430\u0435, \u0435\u0441\u043B\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0439\u0442\u0438 \u0432 \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221976\u0022  \u003E\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438\u003C\/a\u003E.",
		AdditionalSettingsHelpCaption: "*\u0414\u043B\u044F \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0434\u043E\u043C\u0435\u043D\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u043D\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 DNS. \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u044D\u0442\u0438 \u0437\u0430\u043F\u0438\u0441\u0438, \u0442\u043E\u043B\u044C\u043A\u043E \u0435\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u0443\u044E \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u0443\u044E \u0444\u0443\u043D\u043A\u0446\u0438\u044E.",
		SystemEmailControlGroupCaption: "Email \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
		CheckEmailButtonCaption: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C email",
		VerifyButtonCaption: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		DefaultESPEmailCaption: "Email \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
		DefaultESPEmailStateCaption: "\u0421\u0442\u0430\u0442\u0443\u0441 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438",
		DefaultESPEmailInfoMessage: "Email \u0430\u0434\u0440\u0435\u0441 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0443 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A. \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 email \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0434\u043E\u043C\u0435\u043D\u0430",
		InvalidEmailErrorMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email",
		EmailCheckedStatusCaption: "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D",
		EmailCheckFailedStatusCaption: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0435 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430",
		EmailWaitingForVerificationStatusCaption: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F",
		FieldEmptyValidationMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		VerificationEmailSentMessage: "\u041C\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438 \u043F\u0438\u0441\u044C\u043C\u043E \u043D\u0430 \u0430\u0434\u0440\u0435\u0441 [{0}], \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0435\u0433\u043E. \u042D\u0442\u043E \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0434\u043B\u044F \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u043E\u0442 \u0438\u043C\u0435\u043D\u0438 \u044D\u0442\u043E\u0433\u043E \u0430\u0434\u0440\u0435\u0441\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0432 \u044D\u0442\u043E\u043C \u043F\u0438\u0441\u044C\u043C\u0435, \u0430 \u043F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0437\u0430\u043F\u0443\u0441\u043A \u0435\u0449\u0435 \u0440\u0430\u0437",
		IncorrectOrMissingEmailMessage: "\u041E\u0448\u0438\u0431\u043A\u0430: \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 email \u0022{0}\u0022 \u043D\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u043B\u0438 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BpmonlineCloudIntegrationPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});