define("AccountFacebookSearchSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SearchTooltip: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430 \u0432 Facebook."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "AccountFacebookSearchSchema",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		SearchFacebookButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountFacebookSearchSchema",
				resourceItemName: "SearchFacebookButtonImage",
				hash: "ec03a6057074201cb090322259388188",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});