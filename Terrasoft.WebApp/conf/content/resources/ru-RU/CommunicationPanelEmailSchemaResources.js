define("CommunicationPanelEmailSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddEmailButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C e-mail",
		SynchronizeEmail: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0447\u0442\u0443",
		EmailBoxSettings: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0445 \u044F\u0449\u0438\u043A\u043E\u0432",
		MailboxSettingsEmpty: "\u0414\u043B\u044F \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u043F\u043E\u0447\u0442\u044B \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0441 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u043C \u044F\u0449\u0438\u043A\u043E\u043C",
		IncomingEmail: "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435",
		OutgoingEmail: "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435",
		DraftEmail: "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438",
		LoadingMessagesComplete: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0430\u0447\u0430\u0442\u0430. \u041C\u044B \u043F\u043E\u043A\u0430\u0436\u0435\u043C \u0432\u0430\u043C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435, \u043A\u043E\u0433\u0434\u0430 \u043E\u043D\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F.",
		EmailBoxNotProcessedCaption: "\u041D\u0435\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0435",
		EmailBoxIsProcessedCaption: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0435",
		EditExistingAccount: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
		NewEmailAccountCaption: "\u041D\u043E\u0432\u0430\u044F \u0443\u0447\u0435\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
		EmailboxSyncSettingsInsertedTooltipCaption: "\u0423\u0447\u0435\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C {0} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u003Ca data-context-mailserverid=\u0027{1}\u0027 href=\u0027#\u0027\u003E\u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C\u003C\/a\u003E \u0435\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.",
		OneNewMessage: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 1 \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
		MoreThanOneNewMessage: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C {0} \u043D\u043E\u0432\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
		AllMailboxesCaption: "\u0412\u0441\u0435 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0435 \u044F\u0449\u0438\u043A\u0438"
	};
	var localizableImages = {
		ActionsButtonImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "ActionsButtonImage",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		Processed: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "Processed",
				hash: "eb6af21888ad87565fda86e725d1d5bd",
				resourceItemExtension: ".png"
			}
		},
		NoProcessed: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "NoProcessed",
				hash: "fec42a65fad75072f41fb152949603cf",
				resourceItemExtension: ".png"
			}
		},
		RelationsImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "RelationsImage",
				hash: "3cd2e39c03c3eed8573af20616a74e49",
				resourceItemExtension: ".png"
			}
		},
		AddEmailImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "AddEmailImage",
				hash: "5fb18bcb50da33994f16caae1a48ba58",
				resourceItemExtension: ".png"
			}
		},
		More: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "More",
				hash: "ae1115e7aff85993009915dcbf9e87ee",
				resourceItemExtension: ".png"
			}
		},
		ActiveMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "ActiveMenuIcon",
				hash: "043707680993738938752364032b940a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});