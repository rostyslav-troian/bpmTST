define("WelcomeScreenResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AcademyButtonCaption: "Go to Academy",
		WelcomeTextStartLabel: "Welcome to ",
		AcademyHintLabel: "Visit Creatio academy to learn more about the system features"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "WelcomeScreen",
				resourceItemName: "CloseButtonImage",
				hash: "8bce9706d58258477be7010e627ce862",
				resourceItemExtension: ".png"
			}
		},
		PlayButtonImage: {
			source: 3,
			params: {
				schemaName: "WelcomeScreen",
				resourceItemName: "PlayButtonImage",
				hash: "feb8893002e2f87c6f859bf60fb54409",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});