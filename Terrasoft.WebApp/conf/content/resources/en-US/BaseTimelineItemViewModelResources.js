define("BaseTimelineItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EndDateLabel: "End date",
		ResultLabel: "Result",
		CommentLabel: "Comment",
		ToLabelCaption: "to:",
		DateTimeFormatTemplate: "{0} {1}",
		DateWithDayNameTemplate: "{0} {1}"
	};
	var localizableImages = {
		EntityIcon: {
			source: 3,
			params: {
				schemaName: "BaseTimelineItemViewModel",
				resourceItemName: "EntityIcon",
				hash: "58c935fb0f9bff590454c247ae7006e8",
				resourceItemExtension: ".svg"
			}
		},
		GroupIcon: {
			source: 3,
			params: {
				schemaName: "BaseTimelineItemViewModel",
				resourceItemName: "GroupIcon",
				hash: "1b0a1129d4a23496686cf3e25100e5af",
				resourceItemExtension: ".svg"
			}
		},
		GoToPageIcon: {
			source: 3,
			params: {
				schemaName: "BaseTimelineItemViewModel",
				resourceItemName: "GoToPageIcon",
				hash: "7f5bb5e989ae0fcfed7c65034615a0f1",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});