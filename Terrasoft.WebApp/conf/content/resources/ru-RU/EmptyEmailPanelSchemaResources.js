define("EmptyEmailPanelSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NoEmailsInFolder: "\u0412 \u0434\u0430\u043D\u043D\u043E\u0439 \u043F\u0430\u043F\u043A\u0435 \u043D\u0435\u0442 \u043F\u0438\u0441\u0435\u043C",
		EmptyMessagePart1: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435",
		EmptyMessagePart2: "\u0443\u0447\u0435\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C.",
		EmptyMessagePart3: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u043F\u043E\u0447\u0442\u043E\u0439 \u0432",
		NoMailboxes: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0441 \u043F\u043E\u0447\u0442\u043E\u0439 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0430",
		EmptyMessagePart4: "\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438."
	};
	var localizableImages = {
		EmailBubble: {
			source: 3,
			params: {
				schemaName: "EmptyEmailPanelSchema",
				resourceItemName: "EmailBubble",
				hash: "0b06bc6aa058b00b922fdcd5e8e631d3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});