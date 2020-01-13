define("WebServiceV2PageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "Code",
		DescriptionCaption: "Description",
		BaseUriCaption: "Web service URI",
		TypeCaption: "Type",
		PackageNameCaption: "Package",
		RetryCountCaption: "Retries on call failure",
		CaptionCaption: "Name",
		SchemaLocalizableString1: "",
		DuplicateNameMessage: "Service with this code already exists.",
		WrongNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \u003C\/br\u003E Symbol: 0-9 cannot be first.",
		WrongPrefixMessage: "Code must contain prefix \u0022{0}\u0022",
		MethodsTabCaption: "Methods",
		NoAvailablePackages: "No packages available. Create a package in the \u0022Advanced settings\u0022 section where this web service will be saved.",
		OpenAdvancedSettings: "Open advanced settings",
		CodeHint: "Used by developers for interacting with the web service in Creatio source code",
		UriHint: "Complete address for calling the web service will consist of this URI and settings specified in the method setup page",
		RetiresHint: "If the response from the web service contains an error code or response has timed out, the request will be repeated specified number of times",
		PackageHint: "Creatio configuration package that stores the web service. You can add a custom package available for modification for new web services",
		EmptyGrid: "",
		DenyAccess: "The package of the web service cannot be modified or you do not have permission to edit this web service. Copy this web service or modify the \u0022Current package\u0022 system setting, or obtain corresponding permissions.",
		ChangeURIButtonCaption: "",
		AuthTypeNoneCaption: "None",
		AuthTypeBasicCaption: "Basic",
		AuthTypeDigestCaption: "Digest",
		AuthCaption: "Authentication"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		EditIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "EditIcon",
				hash: "b43eaf2b32207bff6675b0055ba9bca2",
				resourceItemExtension: ".png"
			}
		},
		SettingIcon: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
				resourceItemName: "SettingIcon",
				hash: "b465d6addc6086cf88b6dc35692dd43d",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "WebServiceV2Page",
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