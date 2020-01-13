define("BaseProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ClearButtonCaption: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0443",
		SetActionCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0432\u044F\u0437\u044C",
		AddRecordButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		ErrorOnSaveMessage: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C. \u0417\u0430 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443.",
		SearchButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "4c80007219dc08f0c626835219a12963",
				resourceItemExtension: ".png"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "BaseProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});