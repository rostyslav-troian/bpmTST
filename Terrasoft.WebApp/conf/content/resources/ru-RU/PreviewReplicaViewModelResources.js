﻿define("PreviewReplicaViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MacroTemplate: "[#{0}#]",
		FieldEmptyValidationMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		SenderMacroValidationMessage: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443: \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0437\u0430\u0434\u0430\u043D\u043E \u043B\u0438\u0431\u043E \u0441\u0442\u0440\u043E\u043A\u043E\u0439, \u043B\u0438\u0431\u043E \u043C\u0430\u043A\u0440\u043E\u0441\u043E\u043C.",
		SenderMacroInfoMessage: "\u041F\u0440\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u0432 \u0432\u0438\u0434\u0435 \u043C\u0430\u043A\u0440\u043E\u0441\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u0434\u043E\u043C\u0435\u043D\u043E\u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F. \u0414\u043B\u044F \u043D\u0435\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u0434\u043E\u043C\u0435\u043D\u043E\u0432 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430 \u0441 \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u043C \u201C\u041D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E (\u0414\u043E\u043C\u0435\u043D \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D)\u201D",
		IncorrectEmailMessage: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443, \u0442\u0430\u043A \u043A\u0430\u043A \u0443\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F.\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u044B\u0439 email.",
		ReplicaLabel: "\u0420\u0435\u043F\u043B\u0438\u043A\u0430",
		SenderEmailTemplate: "\u003C{0}\u003E"
	};
	var localizableImages = {
		MacrosIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "MacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		},
		RightArrowIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "RightArrowIcon",
				hash: "3574310abda235a6d7fcb1bdcde6209a",
				resourceItemExtension: ".svg"
			}
		},
		LetterIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "LetterIcon",
				hash: "6331900a11532b70bd90a35d72bae4e4",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});