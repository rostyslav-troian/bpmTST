define("MailboxRightsDetailRowResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		Cancel: "\u041E\u0442\u043C\u0435\u043D\u0430"
	};
	var localizableImages = {
		DeleteRowIcon: {
			source: 3,
			params: {
				schemaName: "MailboxRightsDetailRow",
				resourceItemName: "DeleteRowIcon",
				hash: "563de164682be35ef981066b7287177c",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});