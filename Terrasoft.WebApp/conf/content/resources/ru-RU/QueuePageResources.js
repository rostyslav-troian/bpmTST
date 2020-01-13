define("QueuePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortMenuCaption: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430",
		SetupQueueGridMenuCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
		RunProcessButtonCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C",
		NextRecordButtonCaption: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
		QueuePageGroupCaption: "\u041D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		AddEntityRecordCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		AddEntityFolderRecordCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443",
		AddedEntitiesMessage: "\u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B {0} \u0437\u0430\u043F\u0438\u0441\u0438",
		DeleteMenuCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		DeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B?"
	};
	var localizableImages = {
		PageToolsButton: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "PageToolsButton",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		DetailToolsButton: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "DetailToolsButton",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		AddQueueItemButtonImage: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "AddQueueItemButtonImage",
				hash: "6e4b403aef18ffd56bb550e455626d7e",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});