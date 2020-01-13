define("BaseCommunicationDetailResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DetailCaption: "\u0421\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0441\u0432\u044F\u0437\u0438",
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		PhoneMenuItem: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
		SocialNetworksMenuItem: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438",
		ValidationErrorTemplate: "\u041F\u043E\u043B\u0435 \u0022{0}\u0022: \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		ErrorTemplate: "\u0414\u0435\u0442\u0430\u043B\u044C {0}",
		DeleteMenuItemCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		NumberValidationErrorTemplate: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0442\u0438\u043F\u043E\u043C \u0022{1}\u0022.",
		CommunicationTypeValidationErrorTemplate: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0442\u0438\u043F \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0434\u043B\u044F \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0441\u0432\u044F\u0437\u0438."
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "DeleteIcon",
				hash: "2e4fa1864bb9b72bbd9f737c1bc74a10",
				resourceItemExtension: ".png"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "LookUpIcon",
				hash: "57863da6f1677afa7b6645da0602e9e8",
				resourceItemExtension: ".png"
			}
		},
		CallIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		FacebookLinkImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "FacebookLinkImage",
				hash: "bb4854d6e2bd0365da65973850f2672b",
				resourceItemExtension: ".png"
			}
		},
		TwitterLinkImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "TwitterLinkImage",
				hash: "3f434f54d75c08a2406dff80adbbde30",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});