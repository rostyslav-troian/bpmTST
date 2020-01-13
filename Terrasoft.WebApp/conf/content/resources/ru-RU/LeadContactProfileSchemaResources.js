define("LeadContactProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SimilarButtonNotFoundHintText: "\u041C\u044B \u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B, \u043A \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043D\u0435\u0441\u0442\u0438 \u044D\u0442\u043E\u0442 \u043B\u0438\u0434.",
		SimilarButtonFoundHintText: "\u041C\u044B \u043D\u0430\u0448\u043B\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B, \u043A \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043D\u0435\u0441\u0442\u0438 \u044D\u0442\u043E\u0442 \u043B\u0438\u0434. \u041D\u0430\u0436\u0430\u0432 \u043D\u0430 \u044D\u0442\u0443 \u043A\u043D\u043E\u043F\u043A\u0443, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0432 \u043F\u043E\u044F\u0432\u0438\u0432\u0448\u0435\u043C\u0441\u044F \u0441\u043F\u0438\u0441\u043A\u0435.",
		SimilarButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437 {0} \u043F\u043E\u0445\u043E\u0436\u0438\u0445"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "ca1ce7681de14eb36954a0e83a2a550c",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "ca1ce7681de14eb36954a0e83a2a550c",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});