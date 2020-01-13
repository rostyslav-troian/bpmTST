define("DayInCalendarMiniPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WorkingHoursCaption: "{0}: \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0447\u0435\u0435 \u0432\u0440\u0435\u043C\u044F",
		ValidationErrorFullMessage: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u043E\u0432.",
		ValidationErrorMessage: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u043E\u0432.",
		FromCaption: "c",
		ToCaption: "\u043F\u043E",
		StartFinishErrorMessage: "\u0412 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u043C \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0435 \u00AB{0}-{1}\u00BB \u0434\u0430\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u0430\u0442\u044B \u043D\u0430\u0447\u0430\u043B\u0430",
		EmptyIntervalErrorMessage: "\u0412 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u043C \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0435 \u0438\u043C\u0435\u044E\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0438\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F",
		IntersectIntervalErrorMessage: "\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u044B \u0022{0}-{1}\u0022 \u0438 \u0022{2}-{3}\u0022 \u043F\u0435\u0440\u0435\u0441\u0435\u043A\u0430\u044E\u0442\u0441\u044F. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0438\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F"
	};
	var localizableImages = {
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "AddButtonImage",
				hash: "c15d635407f524f3bbe4f1810b82d315",
				resourceItemExtension: ".png"
			}
		},
		OpenCurrentEntityPageImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "OpenCurrentEntityPageImage",
				hash: "857178d6a8f045a025f4455df129833c",
				resourceItemExtension: ".svg"
			}
		},
		OpenEditModeImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "OpenEditModeImage",
				hash: "f4851d37a323f17fc7a7036b77314b24",
				resourceItemExtension: ".svg"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "CloseButtonImage",
				hash: "240cebbe345223f2c270c01be7949519",
				resourceItemExtension: ".svg"
			}
		},
		SaveButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "SaveButtonImage",
				hash: "9d83c749eceae73dbe461501d5b8df55",
				resourceItemExtension: ".svg"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "CancelButtonImage",
				hash: "84b6270935b18aa084d202b7f50696b6",
				resourceItemExtension: ".svg"
			}
		},
		ConnectionsImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "ConnectionsImage",
				hash: "82a2caf9022ddbf42fc6455f36c3df03",
				resourceItemExtension: ".svg"
			}
		},
		AddConnectionIcon: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "AddConnectionIcon",
				hash: "dd20561c78ee86d5e1c4f3befac5cb48",
				resourceItemExtension: ".svg"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});