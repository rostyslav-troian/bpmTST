define("CheckWSConnectionMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TitlePopup: "Websockets are not working correctly",
		BodyPopup: "Please check your Internet connection and websocket settings.\nFor more information, please see the websockets setup article on the Creatio academy.",
		MoreLinkPopup: "",
		AcademyHelpId: "1631"
	};
	var localizableImages = {
		IconPopup: {
			source: 3,
			params: {
				schemaName: "CheckWSConnectionMixin",
				resourceItemName: "IconPopup",
				hash: "b549c91b5e19fe1d2d33e9a7d4ffe997",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});