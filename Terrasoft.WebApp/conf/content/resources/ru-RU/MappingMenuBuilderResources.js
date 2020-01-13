define("MappingMenuBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CurrentUserCaption: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
		CurrentUserContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
		CurrentUserAccountCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
		CurrentTimeAndDateSubMenuItemCaption: "\u0422\u0435\u043A\u0443\u0449\u0438\u0435 \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
		CurrentTimeSubMenuItemCaption: "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F",
		CurrentDateSubMenuItemCaption: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0434\u0430\u0442\u0430",
		FormulaItemCaption: "\u0424\u043E\u0440\u043C\u0443\u043B\u0430",
		ProcessParametersItemCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		SystemSettingsCaption: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430",
		LookupItemCaption: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430",
		DateTimeItemCaption: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
		BooleanItemCaption: "\u041B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		TrueBooleanSubItemCaption: "\u0414\u0430",
		FalseBooleanSubItemCaption: "\u041D\u0435\u0442",
		FalseBooleanDisplayValueCaption: "[#\u041B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435.\u041D\u0435\u0442#]",
		TrueBooleanDisplayValueCaption: "[#\u041B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435.\u0414\u0430#]",
		SelectionDateAndTimeCaption: "\u0412\u044B\u0431\u043E\u0440 \u0434\u0430\u0442\u044B \u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
		SelectionTimeCaption: "\u0412\u044B\u0431\u043E\u0440 \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
		SelectionDateCaption: "\u0412\u044B\u0431\u043E\u0440 \u0434\u0430\u0442\u044B",
		DcmParametersItemCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
		RecordColumnsDisplayValueCaption: "\u041A\u043E\u043B\u043E\u043D\u043A\u0430 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438",
		SourceColumnMenuCaption: "\u041A\u043E\u043B\u043E\u043D\u043A\u0430 \u0438\u0437 \u0432\u044B\u0431\u043E\u0440\u043A\u0438",
		ContactMenuItemCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		AccountMenuItemCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		EmailAddressMenuItemCaption: "Email \u0430\u0434\u0440\u0435\u0441"
	};
	var localizableImages = {
		ProcessParameterIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "ProcessParameterIcon",
				hash: "f4b7118afbb2fa93ebf323c3ab8cf8ca",
				resourceItemExtension: ".svg"
			}
		},
		BooleanIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "BooleanIcon",
				hash: "b2355a103cff09ae5f71c1c09dbb69d2",
				resourceItemExtension: ".svg"
			}
		},
		LookupIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "LookupIcon",
				hash: "3d61d3ffce74dd1540185e9c8f24397b",
				resourceItemExtension: ".svg"
			}
		},
		SystemSettingIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "SystemSettingIcon",
				hash: "9fc13768a28d33a7756447b65f73e9a2",
				resourceItemExtension: ".svg"
			}
		},
		DateAndTimeIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "DateAndTimeIcon",
				hash: "5481353cf2ddce1a12b47cd0f44b7ae6",
				resourceItemExtension: ".svg"
			}
		},
		NoTypeIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "NoTypeIcon",
				hash: "aaf048e67bea39d26bb136af864f530e",
				resourceItemExtension: ".svg"
			}
		},
		FormulaIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "FormulaIcon",
				hash: "795b189888ad527e0fc80f680ba990fc",
				resourceItemExtension: ".svg"
			}
		},
		AccountIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "AccountIcon",
				hash: "3eef2bb707727279c2b09f85170001c0",
				resourceItemExtension: ".svg"
			}
		},
		ContactIcon: {
			source: 3,
			params: {
				schemaName: "MappingMenuBuilder",
				resourceItemName: "ContactIcon",
				hash: "c94851c6b4ce65a0a57664356f13327f",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});