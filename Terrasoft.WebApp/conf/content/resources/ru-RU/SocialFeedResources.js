define("SocialFeedResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortCreatedOn: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0434\u0430\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		SortLastActionOn: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0434\u0430\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		Publish: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C",
		SelectChannelHint: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u043D\u0430\u043B",
		WritePostHint: "\u041D\u0430\u0434 \u0447\u0435\u043C \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435?",
		ShowMoreThanOneNewSocialMessages: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C {0} \u043D\u043E\u0432\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
		ShowNewSocialMessage: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 1 \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
		WritePostMessage: "\u0414\u043B\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C",
		SelectChannelMessage: "\u0414\u043B\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u043D\u0430\u043B",
		CurrentChannelHint: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u0430\u043D\u0430\u043B",
		ConfigurationButtonHint: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043B\u0435\u043D\u0442\u0443"
	};
	var localizableImages = {
		Sort: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
				resourceItemName: "Sort",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		More: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
				resourceItemName: "More",
				hash: "ae1115e7aff85993009915dcbf9e87ee",
				resourceItemExtension: ".png"
			}
		},
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
				resourceItemName: "DefaultCreatedBy",
				hash: "b2f272c14dcf6738d8f57e99db37dcda",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});