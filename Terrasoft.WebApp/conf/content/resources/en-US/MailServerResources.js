define("MailServerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MailServerCaption: "Email provider",
		IdCaption: "Id",
		CreatedOnCaption: "Created on",
		CreatedByCaption: "Created by",
		ModifiedOnCaption: "Modified on",
		ModifiedByCaption: "Modified by",
		NameCaption: "Name",
		AddressCaption: "Incoming mail server name or IP",
		PortCaption: "Port",
		UseSSLCaption: "Use SSL",
		ProcessListenersCaption: "Active processes",
		EmailProtocolCaption: "Connection protocol",
		AllowEmailDownloadingCaption: "Allow downloading emails",
		AllowEmailSendingCaption: "Allow sending emails",
		SMTPServerAddressCaption: "Outgoing mail server name or IP (SMTP)",
		SMTPPortCaption: "Port",
		SMTPServerTimeoutCaption: "Interval of waiting for server response when sending mail, seconds",
		UseSSLforSendingCaption: "Use SSL",
		ExchangeEmailAddressCaption: "Server address",
		IsExchengeAutodiscoverCaption: "Autodetect",
		IsStartTlsCaption: "Create encrypted connection (STARTTLS)",
		TypeCaption: "Mail service provider type",
		UseLoginCaption: "Enter login manually",
		LogoCaption: "Logo",
		UseUserNameAsLoginCaption: "Use user name as login",
		UseEmailAddressAsLoginCaption: "Use email address as login",
		StrategyCaption: "Strategy",
		OAuthApplicationCaption: "OAuth application identifier"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});