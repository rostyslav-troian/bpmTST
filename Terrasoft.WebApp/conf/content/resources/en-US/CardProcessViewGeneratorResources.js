define("CardProcessViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WhatCanIDoForYou: "What can I do for you?",
		SaveButtonCaption: "Save",
		ChangeButtonCaption: "Edit",
		DoLaterButtonCaption: "Fill in later",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		GotoButtonCaption: "Go to",
		ViewButtonCaption: "View",
		RightsButtonCaption: "Access rights",
		ShowAllButtonCaption: "Show all fields",
		EditPageCaption: "Page designer"
	};
	var localizableImages = {
		ContactPhoto: {
			source: 3,
			params: {
				schemaName: "CardProcessViewGenerator",
				resourceItemName: "ContactPhoto",
				hash: "d1293a4f081a67c25d4ec28ac2b211f7",
				resourceItemExtension: ".png"
			}
		},
		InfoImage: {
			source: 3,
			params: {
				schemaName: "CardProcessViewGenerator",
				resourceItemName: "InfoImage",
				hash: "37c45b194cacffdf205af13a78768056",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});