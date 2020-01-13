define("CheckedCommunicationViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NonActualCaption: "(\u043D\u0435\u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0439)",
		NoSynchronizationAccont: "\u0423 \u0432\u0430\u0441 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0443\u0447\u0435\u0442\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C {0}. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443.",
		DeleteCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C ",
		WrongEmailFormat: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 Email",
		CommunicationTypePlaceholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F",
		WrongSkypeFormat: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 Skype",
		WrongPhoneFormat: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442",
		CommunicationAlreadyExist: "\u042D\u0442\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u043E \u0441\u0432\u044F\u0437\u0438 \u0443\u0436\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E"
	};
	var localizableImages = {
		CheckboxIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "CheckboxIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		CallIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		WebIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "WebIcon",
				hash: "88b3c8aa23dae1d8d33fb0c5946371f2",
				resourceItemExtension: ".png"
			}
		},
		EmailIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "EmailIcon",
				hash: "a6211f1892ba40a5dd9cc375b9d09cf3",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});