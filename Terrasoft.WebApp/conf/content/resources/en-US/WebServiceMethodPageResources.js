define("WebServiceMethodPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MethodNameCaption: "Name",
		HttpMethodTypeCaption: "Request type",
		UriCaption: "Method address",
		RequestTimeoutCaption: "Response timeout, ms",
		ContentTypeCaption: "Content type",
		DuplicateNameMessage: "Method with this code already exists.",
		WrongPrefixMessage: "Code must contain prefix \u0022{0}\u0022",
		WrongNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \u003C\/br\u003E Symbol: 0-9 cannot be first.",
		CodeCaption: "Code",
		ResponseTabCaption: "Response parameters",
		RequestTabCaption: "Request parameters",
		OkButtonCaption: "",
		WrongUriMessage: "We found new parameter in \u0022Method address\u0022 field: {0}. It must be added to the \u0022Request parameters\u0022 list. Do you want to add it automatically?",
		WrongUrisMessage: "We found new parameters in \u0022Method address\u0022 field: {0}. They must be added to the \u0022Request parameters\u0022 list. \nDo you want to add them automatically?",
		AccessDeny: "The package of the web service cannot be modified or you do not have permission to edit this web service. Modify the \u0022Current package\u0022 system setting or obtain corresponding permissions.",
		FullUriCaption: "Complete address",
		CodeHint: "Used by developers for interacting with the web service in Creatio source code",
		AddressHint: "Method address parameters must be encompassed in curly braces {}. Complete web service call address has the following structure: \u0022Web service URI\u0022 \u002B \u0022Method address\u0022 \u002B \u0022?\u0022 \u002B \u0022A set of request parameters separated with \u0026\u0022",
		WrongUrisEmptyBracketsMessage: "This string contains curly braces \u0022{}\u0022 without text inside. Please write the address parameter code between braces, or delete the symbols combination \u0022{}\u0022.",
		WrongUrisBracketsMessage: "Missing an opening \u0022{\u0022 or closing \u0022}\u0022 curly braces, or there are nested braces like {{parameter}}.",
		MethodCaptionPrefix: "Method",
		WrongRequestTypeMessage: "To set method type as \u0022GET\u0022, request parameters must not contain parameters with type \u0022Body parameter\u0022. Please delete them or change their type and try again.",
		CancelButtonCaption: "Cancel",
		SaveButtonCaption: "Ok",
		DefaultParameterValue: "value",
		UseAuthInfoCaption: "Use authentication",
		QuickSetupEmptyUriMessage: "Parameters not found in \u0022Method address field\u0022. For successful setup method address parameters must be encompassed in curly braces {} or you can specify query parameters after \u0022?\u0022 symbol.",
		QuickSetupButtonCaption: "Quick setup",
		RequestExampleSeparatorCaption: "From request example",
		QuickSetupCurlButtonCaption: "Example in cURL",
		QuickSetupRawRequestButtonCaption: "Example in RAW",
		QuickSetupJsonRequestButtonCaption: "Example in JSON",
		QuickSetupUriButtonCaption: "From field \u0022Method address\u0022",
		ResponseExampleSeparatorCaption: "From Response example",
		QuickSetupRawResponseButtonCaption: "Example in RAW",
		QuickSetupJsonResponseButtonCaption: "Example in JSON"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceMethodPage",
				resourceItemName: "CloseIcon",
				hash: "563de164682be35ef981066b7287177c",
				resourceItemExtension: ".svg"
			}
		},
		WizardIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceMethodPage",
				resourceItemName: "WizardIcon",
				hash: "b60a2ec813def6ff992e7c7633d56887",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});