define("SectionDesignerPageTypeModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecordTypePlaceholder: "\u0422\u0438\u043F \u0437\u0430\u043F\u0438\u0441\u0438",
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		RecordsTypeCaption: "\u0422\u0438\u043F\u044B \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		TypeColumnCaption: "\u041F\u043E\u043B\u0435, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0435\u0435 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0442\u0438\u043F\u0435 \u0437\u0430\u043F\u0438\u0441\u0438",
		DuplicatedTypeNames: "\u0422\u0438\u043F \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u0443\u0431\u043B\u0438\u0440\u0443\u0435\u0442\u0441\u044F",
		OnChangeTypeColumnMessage: "\u041F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u0442\u0438\u043F\u0430 \u0432\u0441\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u0443\u0442\u0435\u0440\u044F\u043D\u044B! \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
		CanNotDeleteMessage: "\u041D\u0435\u043B\u044C\u0437\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		EmptyPagesError: "\u0422\u0438\u043F\u044B \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u044B",
		UpCaption: "\u0412\u0432\u0435\u0440\u0445",
		DownCaption: "\u0412\u043D\u0438\u0437",
		SaveCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		AddNewMenuItemCaption: "\u041D\u043E\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C",
		CanNotAddNewMessage: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0434\u043B\u044F \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0022{0}\u0022  \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0438\u0437 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430",
		ExistingRecordsSeparatorCaption: "\u0421\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438"
	};
	var localizableImages = {
		ItemEditApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemEditApplyButtonImage",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		ItemEditCancelButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemEditCancelButtonImage",
				hash: "8ccffbc53ab650f34ac90614ea8ee82d",
				resourceItemExtension: ".png"
			}
		},
		ItemDeleteButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemDeleteButtonImage",
				hash: "1a061064dfd59f9c99821e6168630ee8",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});