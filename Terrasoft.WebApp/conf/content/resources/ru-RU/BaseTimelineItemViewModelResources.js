define("BaseTimelineItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EndDateLabel: "\u0414\u0430\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F",
		ResultLabel: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
		CommentLabel: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
		ToLabelCaption: "\u043A\u043E\u043C\u0443:",
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