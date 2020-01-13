define("TimelineSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderDirectionCaption: "\u0414\u0430\u0442\u0430",
		EmptyInfoTitle: "\u0412 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.",
		EmptyInfoDescription: "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0432 Creatio \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u043E \u0434\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.",
		EmptyFilterTitle: "\u041F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u043C \u0444\u0438\u043B\u044C\u0442\u0440\u0435 \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.",
		EmptyFilterDescription: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0435 \u0444\u0438\u043B\u044C\u0442\u0440 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438."
	};
	var localizableImages = {
		OrderDirectionDescIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "OrderDirectionDescIcon",
				hash: "15d9b96d6eaa3c810de24a9f53861694",
				resourceItemExtension: ".svg"
			}
		},
		OrderDirectionAscIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "OrderDirectionAscIcon",
				hash: "ce0d4bd2e6d7cb7dbc0c3a984ed86197",
				resourceItemExtension: ".svg"
			}
		},
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "DefaultIcon",
				hash: "58c935fb0f9bff590454c247ae7006e8",
				resourceItemExtension: ".svg"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});