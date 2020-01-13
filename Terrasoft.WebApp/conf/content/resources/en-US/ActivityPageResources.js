define("ActivityPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StatusGroupCaption: "Status",
		RemindingGroupCaption: "Reminders",
		BoundGroupCaption: "Connected to",
		StartDateGreaterDueDate: "The value in the \u0022Due\u0022 field should be greater than the value in the \u0022Start\u0022 field",
		RemindToOwnerCaption: "Remind owner",
		RemindToAuthorCaption: "Remind author",
		ActivityParticipantDetailCaption: "Participants",
		ResultGroupCaption: "Result",
		OkResultButtonCaption: "Save",
		CancelResultButtonCaption: "Cancel",
		DetailedResultCaption: "Result details"
	};
	var localizableImages = {
		greenResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "greenResultIcon",
				hash: "b76c66a0efb7d88d836ebc0bc9812bd6",
				resourceItemExtension: ".png"
			}
		},
		greyResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "greyResultIcon",
				hash: "d50b4187a3f3b2a6126cb51b42fd0fea",
				resourceItemExtension: ".png"
			}
		},
		redResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "redResultIcon",
				hash: "bd6a921bb73a52dc777393df827f0853",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});