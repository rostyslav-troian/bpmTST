define("LookupEditPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SysEntitySchemaUIdLabel: "\u041E\u0431\u044A\u0435\u043A\u0442",
		SysPageSchemaUIdLabel: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0440\u0435\u0435\u0441\u0442\u0440\u0430",
		SysEditPageSchemaUIdLabel: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
		SysEntitySchemaUIdLookupHeader: "\u0412\u044B\u0431\u043E\u0440: \u041E\u0431\u044A\u0435\u043A\u0442",
		SysPageSchemaUIdLookupHeader: "\u0412\u044B\u0431\u043E\u0440: \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0440\u0435\u0435\u0441\u0442\u0440\u0430",
		SysEditPageSchemaUIdLookupHeader: "\u0412\u044B\u0431\u043E\u0440: \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
		LookupPropertiesPageHeader: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u0430 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430",
		PageHeaderTemplate: "{0} \/ {1}"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LookupEditPage",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});