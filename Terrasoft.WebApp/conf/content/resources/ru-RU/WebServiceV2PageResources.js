﻿define("WebServiceV2PageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "\u041A\u043E\u0434",
		DescriptionCaption: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
		BaseUriCaption: "URI \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
		TypeCaption: "\u0422\u0438\u043F",
		PackageNameCaption: "\u041F\u0430\u043A\u0435\u0442",
		RetryCountCaption: "\u041F\u043E\u0432\u0442\u043E\u0440\u043E\u0432 \u0432\u044B\u0437\u043E\u0432\u0430 \u043F\u0440\u0438 \u043E\u0448\u0438\u0431\u043A\u0430\u0445",
		CaptionCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		SchemaLocalizableString1: "",
		DuplicateNameMessage: "\u0421\u0435\u0440\u0432\u0438\u0441 \u0441 \u0442\u0430\u043A\u0438\u043C \u043A\u043E\u0434\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
		WrongNameMessage: "\u0412\u0432\u0435\u0434\u0435\u043D\u043E \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B: a-z, A-Z, 0-9. \u003C\/br\u003E \u0421\u0438\u043C\u0432\u043E\u043B: 0-9 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0435\u0440\u0432\u044B\u043C.",
		WrongPrefixMessage: "\u041A\u043E\u0434 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u0440\u0435\u0444\u0438\u043A\u0441 \u0022{0}\u0022",
		MethodsTabCaption: "\u041C\u0435\u0442\u043E\u0434\u044B",
		NoAvailablePackages: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043F\u0430\u043A\u0435\u0442\u043E\u0432 \u0434\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0430\u043A\u0435\u0442, \u0432 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u0022\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0435\u0439\u0022",
		OpenAdvancedSettings: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044E",
		CodeHint: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430\u043C\u0438 \u0434\u043B\u044F \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C \u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u043C \u043A\u043E\u0434\u0435 Creatio",
		UriHint: "\u041F\u043E\u043B\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u0432\u044B\u0437\u043E\u0432\u0430 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441\u043E\u0441\u0442\u043E\u044F\u0442\u044C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E URI \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043C\u0435\u0442\u043E\u0434\u0430",
		RetiresHint: "\u0415\u0441\u043B\u0438 \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u043F\u0440\u0438\u0448\u0435\u043B \u0441 \u043A\u043E\u0434\u043E\u043C \u043E\u0448\u0438\u0431\u043A\u0438 \u0438\u043B\u0438 \u0438\u0441\u0442\u0435\u043A \u0442\u0430\u0439\u043C-\u0430\u0443\u0442 \u043E\u0442\u0432\u0435\u0442\u0430, \u0437\u0430\u043F\u0440\u043E\u0441 \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0430\u0437",
		PackageHint: "\u041F\u0430\u043A\u0435\u0442 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 Creatio, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441. \u0414\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043F\u0430\u043A\u0435\u0442, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0439 \u0434\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		EmptyGrid: "",
		DenyAccess: "\u041F\u0430\u043A\u0435\u0442, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441, \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0443 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u044D\u0442\u043E\u0433\u043E \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043A\u043E\u043F\u0438\u044E \u044D\u0442\u043E\u0433\u043E \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u0443\u044E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u0022\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u043A\u0435\u0442\u0022, \u0438\u043B\u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430.",
		ChangeURIButtonCaption: "",
		AuthTypeNoneCaption: "\u041D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F",
		AuthTypeBasicCaption: "Basic",
		AuthTypeDigestCaption: "Digest",
		AuthCaption: "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F"
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