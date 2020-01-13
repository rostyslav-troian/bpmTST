define("CustomerAccessLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ColumnCaptionUrl: "Url",
		ColumnCaptionDescription: "Description",
		ColumnCaptionExpirationDate: "Expiration date",
		Title: "Login to client\u0027s site",
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		ServiceErrorMessage: "Error occurred while retrieving customer access list",
		ClientUriEmptyErrorMessage: "There\u0027s no URI for the selected access\u0027 client. Check client registration (ClientUri)"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "CustomerAccessLookupPage",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});