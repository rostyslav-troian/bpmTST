define("ContactCommunicationDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DetailCaption: "\u0421\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0441\u0432\u044F\u0437\u0438",
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		DoNotUseEmail: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C E-mail",
		DoNotUseCall: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
		DoNotUseSms: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C SMS",
		DoNotUseFax: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0444\u0430\u043A\u0441",
		DoNotUseMail: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0447\u0442\u0443",
		DoNotUseEmailCaption: "E-mail",
		DoNotUseCallCaption: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
		DoNotUseSmsCaption: "SMS",
		DoNotUseFaxCaption: "\u0424\u0430\u043A\u0441",
		DoNotUseMailCaption: "\u041F\u043E\u0447\u0442\u0430",
		DoNotUseCommunicationCaption: "\u0417\u0430\u043F\u0440\u0435\u0442 \u043D\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435",
		PhoneMenuItem: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
		SocialNetworksMenuItem: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438",
		ValidationErrorTemplate: "\u0414\u0435\u0442\u0430\u043B\u044C {0} \u043D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "DeleteIcon",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "LookUpIcon",
				hash: "57863da6f1677afa7b6645da0602e9e8",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});