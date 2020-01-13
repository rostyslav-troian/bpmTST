define("BpmonlineCloudIntegrationPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageHeaderTemplate: "Bulk email settings",
		WebHooksCaption: "Domain to receive responses",
		ServiceIsUnavailable: "Creatio cloud service is unavailable",
		WrongApiKey: "Not valid api key",
		UnhandledErrorMessage: "Unhandled error: {0}",
		WebHooksInfoMessage: "Your Creatio application domain URL accessible from the Internet in the format: \u003Ca \u003Ehttp:\/\/yourdomain.com\u0022\u003C\/a\u003E. Creatio cloud email service will send responses to this URL:  \u003Ca \u003Ehttp:\/\/yourdomain.com\/0\/ServiceModel\/CESWebhooksService.svc\/HandleWebHooks\u003C\/a\u003E",
		UnreachableResource: "We were not able to connect to the specified address: {0}. Please check if you have set up your firewall to receive POST-requests from the Internet to your domain.",
		GeneralSettingsTabCaption: "General settings",
		SenderDomainsTabCaption: "Sender domains",
		SubscriptionManagementTabCaption: "Subscription management",
		SetupInstructionsCaptionTemplate: "Domain \u00AB{0}\u00BB: DKIM\/SPF setup instructions",
		SenderDomainsHelpTextCaption: "In order to send emails from your domain, you should ask your domain admins to modify the DNS record in your domain hosting. Use the following instructions for setup. For setup guides for the most popular hosting providers please visit our \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221495\u0022  \u003EAcademy\u003C\/a\u003E.\u003Cbr\u003E\u003Cbr\u003EInstructions for different domains are different. You have to add and select each domain to get different instructions.\u003Cbr\u003E\u003Cbr\u003E1. Add and select the domain from the list on this page. ",
		SPFTextLabelCaption: "2. SPF settings. In your domain\u0027s DNS settings create first TXT record for your SPF key. Copy and paste there the following text:",
		SPFFootnoteCaption: "*DNS settings should only have 1 SPF record. If there is an existing SPF record, just add the domain from \u0022include:\u0022 parameter above to the existing record. Make sure it is added before any IPs.",
		DKIMTextLabelCaption: "3. DKIM settings. In your domain\u0027s DNS settings create second TXT record with DKIM key. Copy and paste there the following text:",
		DKIMFootnoteCaption: "*DNS settings can have as many DKIM records as needed.",
		SPFScriptTemplate: "{0}",
		DKIMScriptTemplate: "_domainkey TXT o=~\nus._domainkey TXT k=rsa; p={0}",
		EmailSendSetupControlGroupCaption: "Sending email setup",
		ResponseReceiveSetupControlGroupCaption: "Email responses setup",
		CheckSettingsButtonCaption: "Check settings",
		EmailServiceProviderCaption: "Email service provider",
		ApiKeyCaption: "API key",
		ApiKeyInfoButtonCaption: "API key to access the Creatio cloud services",
		CloudConnectionUrlCaption: "Creatio cloud services connection URL",
		CloudConnectionUrlInfoButtonCaption: "Creatio cloud services address",
		ConnectionStatusCaption: "Connection status",
		AuthKeyCaption: "Auth key",
		WebHooksInfoButtonCaption: "Address of your Creatio site.\nFor on-site customers that address must be accessible for the data transfer.",
		AuthKeyInfoButtonCaption: "Authentication key to receive responses",
		ErrorMessageCaption: "Error message",
		ConnectedCaption: "Connection is active",
		DisconnectedCaption: "Connection error",
		WrongAuthKeyMessage: "Not valid auth key",
		WrongWebHookDomainMessage: "Domain to receive responses is unavaialble",
		SetupInstructionsDefaultCaption: "DKIM\/SPF setup instructions",
		MailingServiceInActive: "Cloud email service is not active",
		ResponsesParsingSettingsTabCaption: "Responses parsing settings",
		StopParsingWebhooksControlGroupCaption: "Time period to stop parsing bulk email responses",
		StopHandleWebHookProcessAt: "From",
		StartHandleWebHookProcessAt: "To",
		DMARCSettingCaption: "4. DMARC settings. In your domain\u0027s DNS settings create new TXT record with DMARC key. Copy and paste there the following text:",
		DMARCSettingHelpCaption: "*DMARC verification is added only after you add SPF and DKIM records",
		AdditionalSettingsCaption: "5. Additional settings. In your domain\u0027s DNS settings create new TXT record if you need to set up the following functions. For setup guides please visit our \u003Ca href=\u0022{0}\u0022 target=\u0022_blank\u0022 data-context-help-id=\u00221976\u0022  \u003EAcademy\u003C\/a\u003E.",
		AdditionalSettingsHelpCaption: "*Adding more records to the DNS is not required for verifying the sender domain. Add these entries only if you need to enable the special function.",
		SystemEmailControlGroupCaption: "Default ESP email",
		CheckEmailButtonCaption: "Check email",
		VerifyButtonCaption: "Verify",
		DefaultESPEmailCaption: "Default ESP email",
		DefaultESPEmailStateCaption: "Check status",
		DefaultESPEmailInfoMessage: "Email address for sending system messages to the ESP. Specify the real email of the corporate domain.",
		InvalidEmailErrorMessage: "Enter a valid email",
		EmailCheckedStatusCaption: "Checked",
		EmailCheckFailedStatusCaption: "Check failed",
		EmailWaitingForVerificationStatusCaption: "Waiting to confirm",
		FieldEmptyValidationMessage: "Enter a value",
		VerificationEmailSentMessage: "We just sent you an email to [{0}] to confirm this address. This step is required to start sending your emails from this address. Please click the confirmation link in the email you received, and try again.",
		IncorrectOrMissingEmailMessage: "Warning: current email \u0022{0}\u0022 is incorrect or does not exist."
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